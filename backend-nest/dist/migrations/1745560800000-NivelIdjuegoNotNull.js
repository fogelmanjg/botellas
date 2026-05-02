"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelIdjuegoNotNull1745560800000 = void 0;
class NivelIdjuegoNotNull1745560800000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE nivel ALTER COLUMN idjuego SET NOT NULL`);
        await queryRunner.query(`
      ALTER TABLE nivel
        DROP CONSTRAINT nivel_idjuego_fkey,
        ADD  CONSTRAINT nivel_idjuego_fkey
             FOREIGN KEY (idjuego) REFERENCES juego(idjuego) ON DELETE RESTRICT
    `);
        await queryRunner.query(`DROP INDEX IF EXISTS nivel_idjuego_numeronivel_uidx`);
        await queryRunner.query(`
      CREATE UNIQUE INDEX nivel_idjuego_numeronivel_uidx ON nivel(idjuego, numeronivel)
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS nivel_idjuego_numeronivel_uidx`);
        await queryRunner.query(`
      ALTER TABLE nivel
        DROP CONSTRAINT nivel_idjuego_fkey,
        ADD  CONSTRAINT nivel_idjuego_fkey
             FOREIGN KEY (idjuego) REFERENCES juego(idjuego) ON DELETE SET NULL
    `);
        await queryRunner.query(`ALTER TABLE nivel ALTER COLUMN idjuego DROP NOT NULL`);
        await queryRunner.query(`
      CREATE UNIQUE INDEX nivel_idjuego_numeronivel_uidx
        ON nivel(idjuego, numeronivel)
        WHERE idjuego IS NOT NULL
    `);
    }
}
exports.NivelIdjuegoNotNull1745560800000 = NivelIdjuegoNotNull1745560800000;
//# sourceMappingURL=1745560800000-NivelIdjuegoNotNull.js.map