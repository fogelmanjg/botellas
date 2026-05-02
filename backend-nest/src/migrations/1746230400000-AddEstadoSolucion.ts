import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEstadoSolucion1746230400000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // R=resolviendo, S=resuelta, X=sin solución
    // Las filas existentes son soluciones guardadas -> default 'S'
    await queryRunner.query(`
      ALTER TABLE solucion
        ADD COLUMN estado char(1) NOT NULL DEFAULT 'S'
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE solucion DROP COLUMN estado`);
  }
}
