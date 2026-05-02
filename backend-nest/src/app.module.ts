import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JuegosModule } from "./juegos/juegos.module";
import { NivelesModule } from "./niveles/niveles.module";
import { BloqueosModule } from "./bloqueos/bloqueos.module";
import { EstrategiasModule } from "./estrategias/estrategias.module";
import { DataModule } from "./data/data.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("DB_HOST", "postgres"),
        port: config.get<number>("DB_PORT", 5432),
        username: config.get("DB_USER"),
        password: config.get("DB_PASS"),
        database: config.get("DB_NAME"),
        entities: [__dirname + "/entity/*.{ts,js}"],
        migrations: [__dirname + "/migrations/*.{ts,js}"],
        synchronize: config.get("NODE_ENV") !== "production",
        migrationsRun: false,
      }),
    }),
    JuegosModule,
    NivelesModule,
    BloqueosModule,
    EstrategiasModule,
    DataModule,
  ],
})
export class AppModule {}
