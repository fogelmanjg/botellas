import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Juego } from "../entity/Juego";
import { JuegosController } from "./juegos.controller";
import { JuegosService } from "./juegos.service";

@Module({
  imports: [TypeOrmModule.forFeature([Juego])],
  controllers: [JuegosController],
  providers: [JuegosService],
})
export class JuegosModule {}
