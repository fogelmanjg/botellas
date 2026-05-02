import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode } from "@nestjs/common";
import { NivelesService } from "./niveles.service";

@Controller("niveles")
export class NivelesController {
  constructor(private service: NivelesService) {}

  @Get()
  findAll(@Query("idjuego") idjuego?: string) {
    return this.service.findAll(idjuego ? Number(idjuego) : undefined);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }

  @Post(":id/resolver")
  resolver(@Param("id") id: string, @Query("async") asyncMode?: string) {
    return this.service.resolver(Number(id), asyncMode === "true");
  }

  @Get(":id/solucion")
  solucion(@Param("id") id: string) {
    return this.service.solucion(Number(id));
  }

  @Get(":id/descubrimientos")
  getDescubrimientos(@Param("id") id: string) {
    return this.service.getDescubrimientos(Number(id));
  }

  @Post(":id/descubrimientos")
  addDescubrimiento(@Param("id") id: string, @Body() body: any) {
    return this.service.addDescubrimiento(Number(id), body);
  }
}
