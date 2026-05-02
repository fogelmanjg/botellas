"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefactorBloqueoFields1745550000000 = void 0;
class RefactorBloqueoFields1745550000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE bloqueo ADD COLUMN bloquea TEXT`);
        await queryRunner.query(`ALTER TABLE bloqueo ADD COLUMN desbloquea TEXT`);
        await queryRunner.query(`
      UPDATE bloqueo
      SET
        bloquea   = propiedades->>'bloqueo',
        desbloquea = propiedades->>'desbloqueo'
      WHERE propiedades IS NOT NULL
    `);
        await queryRunner.query(`UPDATE bloqueo SET agrupa = TRUE WHERE nombre = 'barrera'`);
        await queryRunner.query(`ALTER TABLE bloqueo DROP COLUMN propiedades`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE bloqueo ADD COLUMN propiedades JSONB`);
        await queryRunner.query(`ALTER TABLE bloqueo DROP COLUMN desbloquea`);
        await queryRunner.query(`ALTER TABLE bloqueo DROP COLUMN bloquea`);
    }
}
exports.RefactorBloqueoFields1745550000000 = RefactorBloqueoFields1745550000000;
//# sourceMappingURL=1745550000000-RefactorBloqueoFields.js.map