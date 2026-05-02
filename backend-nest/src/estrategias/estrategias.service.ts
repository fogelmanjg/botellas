import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estrategia } from "../entity/Estrategia";

@Injectable()
export class EstrategiasService {
  constructor(@InjectRepository(Estrategia) private repo: Repository<Estrategia>) {}

  findAll() {
    return this.repo.find({ order: { peso: "ASC", nombre: "ASC" } });
  }

  async findOne(id: number) {
    const e = await this.repo.findOneBy({ idestategia: id });
    if (!e) throw new NotFoundException("Estrategia no encontrada");
    return e;
  }

  create(body: any) {
    if (typeof body.nombre !== "string" || body.nombre.trim() === "")
      throw new BadRequestException("nombre es requerido");
    const e = this.repo.create({
      nombre: body.nombre.trim(),
      descripcion: body.descripcion?.trim() || null,
      peso: typeof body.peso === "number" ? body.peso : 999,
      activa: body.activa === "N" ? "N" : "S",
    });
    return this.repo.save(e);
  }

  async update(id: number, body: any) {
    const e = await this.findOne(id);
    if (typeof body.nombre === "string") e.nombre = body.nombre.trim();
    if ("descripcion" in body) e.descripcion = body.descripcion?.trim() || null;
    if (typeof body.peso === "number") e.peso = body.peso;
    if ("activa" in body) e.activa = body.activa === "N" ? "N" : "S";
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    return this.repo.remove(e);
  }
}
