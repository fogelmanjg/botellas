"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTipoBloqueo1745553600000 = void 0;
class AddTipoBloqueo1745553600000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE bloqueo ADD COLUMN tipo VARCHAR(20)`);
        await queryRunner.query(`UPDATE bloqueo SET tipo = 'lona_color' WHERE idbloqueo = 1`);
        await queryRunner.query(`UPDATE bloqueo SET tipo = 'lona'       WHERE idbloqueo = 2`);
        await queryRunner.query(`UPDATE bloqueo SET tipo = 'barrera'    WHERE idbloqueo = 3`);
        await queryRunner.query(`UPDATE bloqueo SET tipo = 'traba'      WHERE idbloqueo = 4`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE bloqueo DROP COLUMN tipo`);
    }
}
exports.AddTipoBloqueo1745553600000 = AddTipoBloqueo1745553600000;
//# sourceMappingURL=1745553600000-AddTipoBloqueo.js.map