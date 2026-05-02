"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Nivel_1 = require("../entity/Nivel");
const Juego_1 = require("../entity/Juego");
const Grupo_1 = require("../entity/Grupo");
const Botella_1 = require("../entity/Botella");
const Bloqueo_1 = require("../entity/Bloqueo");
const BloqueoGrupo_1 = require("../entity/BloqueoGrupo");
const NivelDescubrimiento_1 = require("../entity/NivelDescubrimiento");
function validarEspacio(v) {
    if (v === null || v === undefined)
        return null;
    const s = String(v).trim();
    if (s === "")
        return null;
    if (s === "x")
        return "x";
    if (/^[A-Z]$/.test(s))
        return s;
    if (/^[a-z]$/.test(s))
        return s.toUpperCase();
    return undefined;
}
function serializarGrupo(g) {
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
let NivelesService = class NivelesService {
    nivelRepo;
    juegoRepo;
    descRepo;
    dataSource;
    constructor(nivelRepo, juegoRepo, descRepo, dataSource) {
        this.nivelRepo = nivelRepo;
        this.juegoRepo = juegoRepo;
        this.descRepo = descRepo;
        this.dataSource = dataSource;
    }
    findAll(idjuego) {
        const where = idjuego ? { juego: { idjuego } } : {};
        return this.nivelRepo.find({ where, relations: ["juego"], order: { numeronivel: "ASC" } });
    }
    async findOne(id) {
        const nivel = await this.nivelRepo.findOne({
            where: { idnivel: id },
            relations: ["juego", "grupos", "grupos.botellas", "grupos.botellas.bloqueo", "grupos.bloqueoGrupos", "grupos.bloqueoGrupos.bloqueo"],
            order: { grupos: { numerogrupo: "ASC" } },
        });
        if (!nivel)
            throw new common_1.NotFoundException("Nivel no encontrado");
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
    async create(body) {
        const { idjuego, numeronivel, capacidadextra = 0, grupos: gruposInput } = body;
        if (idjuego == null)
            throw new common_1.BadRequestException("idjuego es requerido");
        if (typeof numeronivel !== "number")
            throw new common_1.BadRequestException("numeronivel debe ser un número");
        this.validarGrupos(gruposInput);
        return this.dataSource.transaction(async (em) => {
            const juego = await em.getRepository(Juego_1.Juego).findOneBy({ idjuego: Number(idjuego) });
            if (!juego)
                throw new common_1.NotFoundException("Juego no encontrado");
            const nivel = em.getRepository(Nivel_1.Nivel).create({ juego, numeronivel, capacidadextra });
            await em.getRepository(Nivel_1.Nivel).save(nivel);
            await this.crearGrupos(em, nivel, gruposInput);
            return { idnivel: nivel.idnivel };
        }).catch((err) => {
            if (err.code === "23505")
                throw new common_1.ConflictException("Ya existe un nivel con ese número en este juego");
            throw err;
        });
    }
    async update(id, body) {
        const gruposInput = Array.isArray(body.grupos) ? body.grupos : null;
        if (gruposInput)
            this.validarGrupos(gruposInput);
        return this.dataSource.transaction(async (em) => {
            const nivel = await em.getRepository(Nivel_1.Nivel).findOne({
                where: { idnivel: id },
                relations: ["juego", "grupos", "grupos.botellas", "grupos.bloqueoGrupos"],
            });
            if (!nivel)
                throw new common_1.NotFoundException("Nivel no encontrado");
            if (typeof body.numeronivel === "number")
                nivel.numeronivel = body.numeronivel;
            if (typeof body.capacidadextra === "number")
                nivel.capacidadextra = body.capacidadextra;
            if ("idjuego" in body) {
                const juego = await em.getRepository(Juego_1.Juego).findOneBy({ idjuego: Number(body.idjuego) });
                if (!juego)
                    throw new common_1.NotFoundException("Juego no encontrado");
                nivel.juego = juego;
            }
            await em.getRepository(Nivel_1.Nivel).save(nivel);
            if (gruposInput) {
                for (const g of nivel.grupos) {
                    if (g.botellas?.length)
                        await em.getRepository(Botella_1.Botella).remove(g.botellas);
                    if (g.bloqueoGrupos?.length)
                        await em.getRepository(BloqueoGrupo_1.BloqueoGrupo).remove(g.bloqueoGrupos);
                }
                if (nivel.grupos.length)
                    await em.getRepository(Grupo_1.Grupo).remove(nivel.grupos);
                await this.crearGrupos(em, nivel, gruposInput);
            }
            return { idnivel: nivel.idnivel };
        }).catch((err) => {
            if (err.code === "23505")
                throw new common_1.ConflictException("Ya existe un nivel con ese número en este juego");
            throw err;
        });
    }
    async remove(id) {
        const nivel = await this.nivelRepo.findOne({
            where: { idnivel: id },
            relations: ["grupos", "grupos.botellas", "grupos.bloqueoGrupos"],
        });
        if (!nivel)
            throw new common_1.NotFoundException("Nivel no encontrado");
        await this.dataSource.transaction(async (em) => {
            for (const g of nivel.grupos ?? []) {
                if (g.botellas?.length)
                    await em.getRepository(Botella_1.Botella).remove(g.botellas);
                if (g.bloqueoGrupos?.length)
                    await em.getRepository(BloqueoGrupo_1.BloqueoGrupo).remove(g.bloqueoGrupos);
            }
            if (nivel.grupos?.length)
                await em.getRepository(Grupo_1.Grupo).remove(nivel.grupos);
            await em.getRepository(Nivel_1.Nivel).remove(nivel);
        });
    }
    async resolver(id, asyncMode) {
        const nivel = await this.nivelRepo.findOneBy({ idnivel: id });
        if (!nivel)
            throw new common_1.NotFoundException("Nivel no encontrado");
        const base = process.env['SOLVER_URL'] ?? 'http://localhost:8001';
        const url = `${base}/resolver/${id}${asyncMode ? "?async_mode=true" : ""}`;
        const resp = await fetch(url, { method: "POST" }).catch(() => { throw new Error("Solver no disponible"); });
        return resp.json();
    }
    async solucion(id) {
        const base = process.env['SOLVER_URL'] ?? 'http://localhost:8001';
        const resp = await fetch(`${base}/solucion/${id}`).catch(() => { throw new Error("Solver no disponible"); });
        if (resp.status === 404)
            throw new common_1.NotFoundException("Sin solución guardada");
        return resp.json();
    }
    async getDescubrimientos(idnivel) {
        return this.descRepo.find({
            where: { idnivel },
            order: { orden: "ASC" },
        });
    }
    async addDescubrimiento(idnivel, body) {
        const { idbotella, posicion, color_real } = body;
        if (!idbotella || !posicion || !color_real)
            throw new common_1.BadRequestException("idbotella, posicion y color_real son requeridos");
        if (posicion < 2 || posicion > 4)
            throw new common_1.BadRequestException("posicion debe ser 2, 3 o 4");
        if (!/^[A-Za-z]$/.test(color_real))
            throw new common_1.BadRequestException("color_real debe ser una letra");
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
        }
        catch (err) {
            if (err.code === "23505")
                throw new common_1.ConflictException("Esa posición ya fue descubierta");
            throw err;
        }
    }
    validarGrupos(grupos) {
        if (!Array.isArray(grupos) || grupos.length === 0)
            throw new common_1.BadRequestException("grupos debe ser un array no vacío");
        for (const [i, g] of grupos.entries()) {
            if (typeof g.numerogrupo !== "number")
                throw new common_1.BadRequestException(`grupos[${i}].numerogrupo debe ser un número`);
            if (typeof g.entrada !== "number" || g.entrada < 1 || g.entrada > 4)
                throw new common_1.BadRequestException(`grupos[${i}].entrada debe ser 1, 2, 3 o 4`);
            if (!Array.isArray(g.botellas) || g.botellas.length === 0)
                throw new common_1.BadRequestException(`grupos[${i}].botellas debe ser un array no vacío`);
            for (const [j, b] of g.botellas.entries()) {
                if (typeof b.numerobotella !== "number")
                    throw new common_1.BadRequestException(`grupos[${i}].botellas[${j}].numerobotella debe ser un número`);
            }
        }
    }
    async crearGrupos(em, nivel, gruposInput) {
        for (const g of gruposInput) {
            const grupo = em.getRepository(Grupo_1.Grupo).create({ nivel, numerogrupo: g.numerogrupo, entrada: g.entrada });
            await em.getRepository(Grupo_1.Grupo).save(grupo);
            if (g.idbloqueo != null) {
                const bloqueo = await em.getRepository(Bloqueo_1.Bloqueo).findOneBy({ idbloqueo: Number(g.idbloqueo) });
                if (!bloqueo)
                    throw new common_1.NotFoundException("Bloqueo no encontrado");
                await em.getRepository(BloqueoGrupo_1.BloqueoGrupo).save(em.getRepository(BloqueoGrupo_1.BloqueoGrupo).create({ grupo, bloqueo }));
            }
            for (const b of g.botellas) {
                let bloqueo = null;
                if (b.idbloqueo != null) {
                    bloqueo = await em.getRepository(Bloqueo_1.Bloqueo).findOneBy({ idbloqueo: Number(b.idbloqueo) });
                    if (!bloqueo)
                        throw new common_1.NotFoundException("Bloqueo no encontrado");
                }
                await em.getRepository(Botella_1.Botella).save(em.getRepository(Botella_1.Botella).create({
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
};
exports.NivelesService = NivelesService;
exports.NivelesService = NivelesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Nivel_1.Nivel)),
    __param(1, (0, typeorm_1.InjectRepository)(Juego_1.Juego)),
    __param(2, (0, typeorm_1.InjectRepository)(NivelDescubrimiento_1.NivelDescubrimiento)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], NivelesService);
//# sourceMappingURL=niveles.service.js.map