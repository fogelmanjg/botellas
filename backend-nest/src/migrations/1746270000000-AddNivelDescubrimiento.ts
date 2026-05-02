import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNivelDescubrimiento1746270000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE nivel_descubrimiento (
        idnivel    INT     NOT NULL REFERENCES nivel(idnivel),
        orden      INT     NOT NULL,
        idbotella  INT     NOT NULL,
        posicion   INT     NOT NULL CHECK (posicion BETWEEN 2 AND 4),
        color_real CHAR(1) NOT NULL,
        PRIMARY KEY (idnivel, orden),
        UNIQUE (idbotella, posicion)
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS nivel_descubrimiento`);
  }
}
