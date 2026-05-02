"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEstadoSolucion1746230400000 = void 0;
class AddEstadoSolucion1746230400000 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE solucion
        ADD COLUMN estado char(1) NOT NULL DEFAULT 'S'
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE solucion DROP COLUMN estado`);
    }
}
exports.AddEstadoSolucion1746230400000 = AddEstadoSolucion1746230400000;
//# sourceMappingURL=1746230400000-AddEstadoSolucion.js.map