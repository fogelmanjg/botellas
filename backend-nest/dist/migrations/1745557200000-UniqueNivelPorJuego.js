"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueNivelPorJuego1745557200000 = void 0;
class UniqueNivelPorJuego1745557200000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE UNIQUE INDEX nivel_idjuego_numeronivel_uidx
        ON nivel(idjuego, numeronivel)
        WHERE idjuego IS NOT NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS nivel_idjuego_numeronivel_uidx`);
    }
}
exports.UniqueNivelPorJuego1745557200000 = UniqueNivelPorJuego1745557200000;
//# sourceMappingURL=1745557200000-UniqueNivelPorJuego.js.map