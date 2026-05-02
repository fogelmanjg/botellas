import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Juego } from "../entity/Juego";

@Injectable()
export class JuegosService {
  constructor(@InjectRepository(Juego) private repo: Repository<Juego>) {}

  findAll() {
    return this.repo.find({ order: { nombre: "ASC" } });
  }

  async findOne(id: number) {
    const juego = await this.repo.findOne({
      where: { idjuego: id },
      relations: ["niveles"],
      order: { niveles: { numeronivel: "ASC" } },
    });
    if (!juego) throw new NotFoundException("Juego no encontrado");
    return juego;
  }

  create(nombre: string, editor?: string) {
    const juego = this.repo.create({ nombre: nombre.trim(), editor: editor?.trim() ?? null });
    return this.repo.save(juego);
  }

  async update(id: number, nombre?: string, editor?: string) {
    const juego = await this.findOne(id);
    if (nombre) juego.nombre = nombre.trim();
    if (editor !== undefined) juego.editor = editor?.trim() ?? null;
    return this.repo.save(juego);
  }

  async remove(id: number) {
    const juego = await this.findOne(id);
    return this.repo.remove(juego);
  }
}
