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
exports.Estrategia = void 0;
const typeorm_1 = require("typeorm");
let Estrategia = class Estrategia {
    idestategia;
    nombre;
    descripcion;
    peso;
    activa;
};
exports.Estrategia = Estrategia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idestategia" }),
    __metadata("design:type", Number)
], Estrategia.prototype, "idestategia", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Estrategia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Estrategia.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 999 }),
    __metadata("design:type", Number)
], Estrategia.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, default: "S" }),
    __metadata("design:type", String)
], Estrategia.prototype, "activa", void 0);
exports.Estrategia = Estrategia = __decorate([
    (0, typeorm_1.Entity)("estrategia")
], Estrategia);
//# sourceMappingURL=Estrategia.js.map