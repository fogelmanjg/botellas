import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common";
import { InjectRepository, InjectDataSource } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Nivel } from "../entity/Nivel";
import { Juego } from "../entity/Juego";
import { Grupo } from "../entity/Grupo";
import { Botella } from "../entity/Botella";
import { Bloqueo } from "../entity/Bloqueo";
import { BloqueoGrupo } from "../entity/BloqueoGrupo";
import { NivelDescubrimiento } from "../entity/NivelDescubrimiento";

function validarEspacio(v: unknown): string | null | undefined {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (s === "") return null;
  if (s === "x") return "x";
  if (/^[A-Z]$/.test(s)) return s;
  if (/^[a-z]$/.test(s)) return s.toUpperCase();
  return undefined;
}

function serializarGrupo(g: Grupo) {
  return {
    idgrupo: g.idgrupo,
    numerogrupo: g.numerogrupo,
    entrada: g.entrada,
    bloqueo: g.bloqueoGrupos?.[0]?.bloqueo ?? null,
    botellas: (g.botellas ?? [])
      .sort((a, b) => a.numerobotella - b.numerobotella)
      .map((b) => ({
        idbotella: b.idbotella,
        numerobotella: b.numerobotella,
        color: b.color,
        bloqueo: b.bloqueo,
        espacios: [b.espacio1, b.espacio2, b.espacio3, b.espacio4],
      })),
  };
}

@Injectable()
export class NivelesService {
  constructor(
    @InjectRepository(Nivel) private nivelRepo: Repository<Nivel>,
    @InjectRepository(Juego) private juegoRepo: Repository<Juego>,
    @InjectRepository(NivelDescubrimiento) private descRepo: Repository<NivelDescubrimiento>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  findAll(idjuego?: number) {
    const where = idjuego ? { juego: { idjuego } } : {};
    return this.nivelRepo.find({ where, relations: ["juego"], order: { numeronivel: "ASC" } });
  }

  async findOne(id: number) {
    const nivel = await this.nivelRepo.findOne({
      where: { idnivel: id },
      relations: ["juego", "grupos", "grupos.botellas", "grupos.botellas.bloqueo", "grupos.bloqueoGrupos", "grupos.bloqueoGrupos.bloqueo"],
      order: { grupos: { numerogrupo: "ASC" } },
    });
    if (!nivel) throw new NotFoundException("Nivel no encontrado");
    return {
      idnivel: nivel.idnivel,
      numeronivel: nivel.numeronivel,
      capacidadextra: nivel.capacidadextra,
      estadohash: nivel.estadohash,
      validado: nivel.validado,
      subidopor: nivel.subidopor,
      juego: nivel.juego,
      grupos: nivel.grupos.sort((a, b) => a.numerogrupo - b.numerogrupo).map(serializarGrupo),
    };
  }

  async create(body: any) {
    const { idjuego, numeronivel, capacidadextra = 0, grupos: gruposInput } = body;
    if (idjuego == null) throw new BadRequestException("idjuego es requerido");
    if (typeof numeronivel !== "number") throw new BadRequestException("numeronivel debe ser un número");
    this.validarGrupos(gruposInput);

    return this.dataSource.transaction(async (em) => {
      const juego = await em.getRepository(Juego).findOneBy({ idjuego: Number(idjuego) });
      if (!juego) throw new NotFoundException("Juego no encontrado");
      const nivel = em.getRepository(Nivel).create({ juego, numeronivel, capacidadextra });
      await em.getRepository(Nivel).save(nivel);
      await this.crearGrupos(em, nivel, gruposInput);
      return { idnivel: nivel.idnivel };
    }).catch((err: any) => {
      if (err.code === "23505") throw new ConflictException("Ya existe un nivel con ese número en este juego");
      throw err;
    });
  }

  async update(id: number, body: any) {
    const gruposInput = Array.isArray(body.grupos) ? body.grupos : null;
    if (gruposInput) this.validarGrupos(gruposInput);

    return this.dataSource.transaction(async (em) => {
      const nivel = await em.getRepository(Nivel).findOne({
        where: { idnivel: id },
        relations: ["juego", "grupos", "grupos.botellas", "grupos.bloqueoGrupos"],
      });
      if (!nivel) throw new NotFoundException("Nivel no encontrado");
      if (typeof body.numeronivel === "number") nivel.numeronivel = body.numeronivel;
      if (typeof body.capacidadextra === "number") nivel.capacidadextra = body.capacidadextra;
      if ("idjuego" in body) {
        const juego = await em.getRepository(Juego).findOneBy({ idjuego: Number(body.idjuego) });
        if (!juego) throw new NotFoundException("Juego no encontrado");
        nivel.juego = juego;
      }
      await em.getRepository(Nivel).save(nivel);
      if (gruposInput) {
        for (const g of nivel.grupos) {
          if (g.botellas?.length) await em.getRepository(Botella).remove(g.botellas);
          if (g.bloqueoGrupos?.length) await em.getRepository(BloqueoGrupo).remove(g.bloqueoGrupos);
        }
        if (nivel.grupos.length) await em.getRepository(Grupo).remove(nivel.grupos);
        await this.crearGrupos(em, nivel, gruposInput);
      }
      return { idnivel: nivel.idnivel };
    }).catch((err: any) => {
      if (err.code === "23505") throw new ConflictException("Ya existe un nivel con ese número en este juego");
      throw err;
    });
  }

  async remove(id: number) {
    const nivel = await this.nivelRepo.findOne({
      where: { idnivel: id },
      relations: ["grupos", "grupos.botellas", "grupos.bloqueoGrupos"],
    });
    if (!nivel) throw new NotFoundException("Nivel no encontrado");
    await this.dataSource.transaction(async (em) => {
      for (const g of nivel.grupos ?? []) {
        if (g.botellas?.length) await em.getRepository(Botella).remove(g.botellas);
        if (g.bloqueoGrupos?.length) await em.getRepository(BloqueoGrupo).remove(g.bloqueoGrupos);
      }
      if (nivel.grupos?.length) await em.getRepository(Grupo).remove(nivel.grupos);
      await em.getRepository(Nivel).remove(nivel);
    });
  }

  async resolver(id: number, asyncMode: boolean) {
    const nivel = await this.nivelRepo.findOneBy({ idnivel: id });
    if (!nivel) throw new NotFoundException("Nivel no encontrado");
    const base = process.env['SOLVER_URL'] ?? 'http://localhost:8001';
    const url = `${base}/resolver/${id}${asyncMode ? "?async_mode=true" : ""}`;
    const resp = await fetch(url, { method: "POST" }).catch(() => { throw new Error("Solver no disponible"); });
    return resp.json();
  }

  async solucion(id: number) {
    const base = process.env['SOLVER_URL'] ?? 'http://localhost:8001';
    const resp = await fetch(`${base}/solucion/${id}`).catch(() => { throw new Error("Solver no disponible"); });
    if (resp.status === 404) throw new NotFoundException("Sin solución guardada");
    return resp.json();
  }

  async getDescubrimientos(idnivel: number) {
    return this.descRepo.find({
      where: { idnivel },
      order: { orden: "ASC" },
    });
  }

  async addDescubrimiento(idnivel: number, body: any) {
    const { idbotella, posicion, color_real } = body;

    if (!idbotella || !posicion || !color_real)
      throw new BadRequestException("idbotella, posicion y color_real son requeridos");
    if (posicion < 2 || posicion > 4)
      throw new BadRequestException("posicion debe ser 2, 3 o 4");
    if (!/^[A-Za-z]$/.test(color_real))
      throw new BadRequestException("color_real debe ser una letra");

    const ultimo = await this.descRepo
      .createQueryBuilder("d")
      .select("MAX(d.orden)", "max")
      .where("d.idnivel = :idnivel", { idnivel })
      .getRawOne();

    const orden = (ultimo?.max ?? 0) + 1;

    try {
      const descubrimiento = this.descRepo.create({
        idnivel,
        orden,
        idbotella,
        posicion,
        colorReal: color_real.toUpperCase(),
      });
      return await this.descRepo.save(descubrimiento);
    } catch (err: any) {
      if (err.code === "23505")
        throw new ConflictException("Esa posición ya fue descubierta");
      throw err;
    }
  }

  private validarGrupos(grupos: unknown[]) {
    if (!Array.isArray(grupos) || grupos.length === 0)
      throw new BadRequestException("grupos debe ser un array no vacío");
    for (const [i, g] of (grupos as any[]).entries()) {
      if (typeof g.numerogrupo !== "number")
        throw new BadRequestException(`grupos[${i}].numerogrupo debe ser un número`);
      if (typeof g.entrada !== "number" || g.entrada < 1 || g.entrada > 4)
        throw new BadRequestException(`grupos[${i}].entrada debe ser 1, 2, 3 o 4`);
      if (!Array.isArray(g.botellas) || g.botellas.length === 0)
        throw new BadRequestException(`grupos[${i}].botellas debe ser un array no vacío`);
      for (const [j, b] of (g.botellas as any[]).entries()) {
        if (typeof b.numerobotella !== "number")
          throw new BadRequestException(`grupos[${i}].botellas[${j}].numerobotella debe ser un número`);
      }
    }
  }

  private async crearGrupos(em: any, nivel: Nivel, gruposInput: any[]) {
    for (const g of gruposInput) {
      const grupo = em.getRepository(Grupo).create({ nivel, numerogrupo: g.numerogrupo, entrada: g.entrada });
      await em.getRepository(Grupo).save(grupo);
      if (g.idbloqueo != null) {
        const bloqueo = await em.getRepository(Bloqueo).findOneBy({ idbloqueo: Number(g.idbloqueo) });
        if (!bloqueo) throw new NotFoundException("Bloqueo no encontrado");
        await em.getRepository(BloqueoGrupo).save(em.getRepository(BloqueoGrupo).create({ grupo, bloqueo }));
      }
      for (const b of g.botellas) {
        let bloqueo: Bloqueo | null = null;
        if (b.idbloqueo != null) {
          bloqueo = await em.getRepository(Bloqueo).findOneBy({ idbloqueo: Number(b.idbloqueo) });
          if (!bloqueo) throw new NotFoundException("Bloqueo no encontrado");
        }
        await em.getRepository(Botella).save(em.getRepository(Botella).create({
          grupo,
          numerobotella: b.numerobotella,
          color: b.color != null ? String(b.color).trim().toUpperCase() : null,
          bloqueo,
          espacio1: validarEspacio(b.espacio1) ?? null,
          espacio2: validarEspacio(b.espacio2) ?? null,
          espacio3: validarEspacio(b.espacio3) ?? null,
          espacio4: validarEspacio(b.espacio4) ?? null,
        }));
      }
    }
  }
}
