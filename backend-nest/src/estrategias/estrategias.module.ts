import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estrategia } from "../entity/Estrategia";
import { EstrategiasController } from "./estrategias.controller";
import { EstrategiasService } from "./estrategias.service";

@Module({
  imports: [TypeOrmModule.forFeature([Estrategia])],
  controllers: [EstrategiasController],
  providers: [EstrategiasService],
})
export class EstrategiasModule {}
