"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nivel = void 0;
const typeorm_1 = require("typeorm");
const Juego_1 = require("./Juego");
const Grupo_1 = require("./Grupo");
const Solucion_1 = require("./Solucion");
let Nivel = class Nivel {
    idnivel;
    juego;
    numeronivel;
    capacidadextra;
    estadohash;
    validado;
    subidopor;
    grupos;
    solucion;
};
exports.Nivel = Nivel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idnivel" }),
    __metadata("design:type", Number)
], Nivel.prototype, "idnivel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Juego_1.Juego, (j) => j.niveles, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "idjuego" }),
    __metadata("design:type", Juego_1.Juego)
], Nivel.prototype, "juego", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "numeronivel" }),
    __metadata("design:type", Number)
], Nivel.prototype, "numeronivel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "capacidadextra", default: 0 }),
    __metadata("design:type", Number)
], Nivel.prototype, "capacidadextra", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "estadohash", type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Nivel.prototype, "estadohash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "N" }),
    __metadata("design:type", String)
], Nivel.prototype, "validado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Nivel.prototype, "subidopor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Grupo_1.Grupo, (g) => g.nivel),
    __metadata("design:type", Array)
], Nivel.prototype, "grupos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Solucion_1.Solucion, (s) => s.nivel),
    __metadata("design:type", Object)
], Nivel.prototype, "solucion", void 0);
exports.Nivel = Nivel = __decorate([
    (0, typeorm_1.Entity)("nivel"),
    (0, typeorm_1.Unique)("nivel_idjuego_numeronivel_uidx", ["juego", "numeronivel"])
], Nivel);
//# sourceMappingURL=Nivel.js.map