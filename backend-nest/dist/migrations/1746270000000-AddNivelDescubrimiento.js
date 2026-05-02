"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNivelDescubrimiento1746270000000 = void 0;
class AddNivelDescubrimiento1746270000000 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS nivel_descubrimiento`);
    }
}
exports.AddNivelDescubrimiento1746270000000 = AddNivelDescubrimiento1746270000000;
//# sourceMappingURL=1746270000000-AddNivelDescubrimiento.js.map