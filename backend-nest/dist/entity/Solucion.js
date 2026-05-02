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
exports.Solucion = void 0;
const typeorm_1 = require("typeorm");
const Nivel_1 = require("./Nivel");
let Solucion = class Solucion {
    idnivel;
    nivel;
    pasos;
    estado;
    fechacalculo;
};
exports.Solucion = Solucion;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "idnivel" }),
    __metadata("design:type", Number)
], Solucion.prototype, "idnivel", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Nivel_1.Nivel, (n) => n.solucion),
    (0, typeorm_1.JoinColumn)({ name: "idnivel" }),
    __metadata("design:type", Nivel_1.Nivel)
], Solucion.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], Solucion.prototype, "pasos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, default: "S" }),
    __metadata("design:type", String)
], Solucion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fechacalculo", type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Solucion.prototype, "fechacalculo", void 0);
exports.Solucion = Solucion = __decorate([
    (0, typeorm_1.Entity)("solucion")
], Solucion);
//# sourceMappingURL=Solucion.js.map