import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bloqueo } from "../entity/Bloqueo";

@Injectable()
export class BloqueosService {
  constructor(@InjectRepository(Bloqueo) private repo: Repository<Bloqueo>) {}

  findAll() {
    return this.repo.find({ order: { nombre: "ASC" } });
  }

  async findOne(id: number) {
    const bloqueo = await this.repo.findOneBy({ idbloqueo: id });
    if (!bloqueo) throw new NotFoundException("Bloqueo no encontrado");
    return bloqueo;
  }

  create(body: any) {
    if (typeof body.nombre !== "string" || body.nombre.trim() === "")
      throw new BadRequestException("nombre es requerido");
    const bloqueo = this.repo.create({
      nombre: body.nombre.trim(),
      tipo: body.tipo ?? null,
      bloquea: body.bloquea?.trim() || null,
      desbloquea: body.desbloquea ?? "N",
      entrada: body.entrada ?? "N",
      salida: body.salida ?? "N",
      vista: body.vista ?? "N",
      css: body.css ?? "S",
    });
    return this.repo.save(bloqueo);
  }

  async update(id: number, body: any) {
    const bloqueo = await this.findOne(id);
    if (typeof body.nombre === "string") bloqueo.nombre = body.nombre.trim();
    if ("tipo"       in body) bloqueo.tipo       = body.tipo ?? null;
    if ("bloquea"    in body) bloqueo.bloquea    = body.bloquea?.trim() || null;
    if ("desbloquea" in body) bloqueo.desbloquea = body.desbloquea ?? "N";
    if ("entrada"    in body) bloqueo.entrada    = body.entrada ?? "N";
    if ("salida"     in body) bloqueo.salida     = body.salida  ?? "N";
    if ("vista"      in body) bloqueo.vista      = body.vista   ?? "N";
    if ("css"        in body) bloqueo.css        = body.css     ?? "S";
    return this.repo.save(bloqueo);
  }

  async remove(id: number) {
    const bloqueo = await this.findOne(id);
    return this.repo.remove(bloqueo);
  }
}
