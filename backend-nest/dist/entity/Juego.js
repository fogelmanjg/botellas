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
exports.Juego = void 0;
const typeorm_1 = require("typeorm");
const Nivel_1 = require("./Nivel");
let Juego = class Juego {
    idjuego;
    nombre;
    editor;
    niveles;
};
exports.Juego = Juego;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idjuego" }),
    __metadata("design:type", Number)
], Juego.prototype, "idjuego", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Juego.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", Object)
], Juego.prototype, "editor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Nivel_1.Nivel, (n) => n.juego),
    __metadata("design:type", Array)
], Juego.prototype, "niveles", void 0);
exports.Juego = Juego = __decorate([
    (0, typeorm_1.Entity)("juego")
], Juego);
//# sourceMappingURL=Juego.js.map