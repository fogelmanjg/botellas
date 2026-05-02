import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from "@nestjs/common";
import { JuegosService } from "./juegos.service";

@Controller("juegos")
export class JuegosController {
  constructor(private service: JuegosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { nombre: string; editor?: string }) {
    return this.service.create(body.nombre, body.editor);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: { nombre?: string; editor?: string }) {
    return this.service.update(Number(id), body.nombre, body.editor);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
