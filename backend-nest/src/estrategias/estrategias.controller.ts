import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from "@nestjs/common";
import { EstrategiasService } from "./estrategias.service";

@Controller("estrategias")
export class EstrategiasController {
  constructor(private service: EstrategiasService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(":id")
  findOne(@Param("id") id: string) { return this.service.findOne(Number(id)); }

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) { return this.service.update(Number(id), body); }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) { return this.service.remove(Number(id)); }
}
