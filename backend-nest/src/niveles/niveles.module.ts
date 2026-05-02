import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nivel } from "../entity/Nivel";
import { Juego } from "../entity/Juego";
import { NivelDescubrimiento } from "../entity/NivelDescubrimiento";
import { NivelesController } from "./niveles.controller";
import { NivelesService } from "./niveles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Nivel, Juego, NivelDescubrimiento])],
  controllers: [NivelesController],
  providers: [NivelesService],
})
export class NivelesModule {}
