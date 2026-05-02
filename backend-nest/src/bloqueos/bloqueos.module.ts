import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bloqueo } from "../entity/Bloqueo";
import { BloqueosController } from "./bloqueos.controller";
import { BloqueosService } from "./bloqueos.service";

@Module({
  imports: [TypeOrmModule.forFeature([Bloqueo])],
  controllers: [BloqueosController],
  providers: [BloqueosService],
})
export class BloqueosModule {}
