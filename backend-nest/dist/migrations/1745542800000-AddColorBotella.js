"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColorBotella1745542800000 = void 0;
class AddColorBotella1745542800000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE botella ADD COLUMN color CHAR(1)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE botella DROP COLUMN color`);
    }
}
exports.AddColorBotella1745542800000 = AddColorBotella1745542800000;
//# sourceMappingURL=1745542800000-AddColorBotella.js.map