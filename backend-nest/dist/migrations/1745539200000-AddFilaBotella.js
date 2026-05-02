"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFilaBotella1745539200000 = void 0;
class AddFilaBotella1745539200000 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE botella ADD COLUMN fila INT NOT NULL DEFAULT 1
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE botella DROP COLUMN fila`);
    }
}
exports.AddFilaBotella1745539200000 = AddFilaBotella1745539200000;
//# sourceMappingURL=1745539200000-AddFilaBotella.js.map