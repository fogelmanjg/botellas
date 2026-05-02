"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAgrupaBloqueoPropiedades1745546400000 = void 0;
class AddAgrupaBloqueoPropiedades1745546400000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE bloqueo ADD COLUMN agrupa BOOLEAN NOT NULL DEFAULT FALSE`);
        await queryRunner.query(`ALTER TABLE botella ADD COLUMN propiedades_bloqueo JSONB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE botella DROP COLUMN propiedades_bloqueo`);
        await queryRunner.query(`ALTER TABLE bloqueo DROP COLUMN agrupa`);
    }
}
exports.AddAgrupaBloqueoPropiedades1745546400000 = AddAgrupaBloqueoPropiedades1745546400000;
//# sourceMappingURL=1745546400000-AddAgrupaBloqueoPropiedades.js.map