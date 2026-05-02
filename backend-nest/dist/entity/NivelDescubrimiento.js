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
exports.NivelDescubrimiento = void 0;
const typeorm_1 = require("typeorm");
const Nivel_1 = require("./Nivel");
const Botella_1 = require("./Botella");
let NivelDescubrimiento = class NivelDescubrimiento {
    idnivel;
    orden;
    idbotella;
    posicion;
    colorReal;
    nivel;
    botella;
};
exports.NivelDescubrimiento = NivelDescubrimiento;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NivelDescubrimiento.prototype, "idnivel", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NivelDescubrimiento.prototype, "orden", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NivelDescubrimiento.prototype, "idbotella", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NivelDescubrimiento.prototype, "posicion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "color_real", type: "char", length: 1 }),
    __metadata("design:type", String)
], NivelDescubrimiento.prototype, "colorReal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Nivel_1.Nivel),
    (0, typeorm_1.JoinColumn)({ name: "idnivel" }),
    __metadata("design:type", Nivel_1.Nivel)
], NivelDescubrimiento.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Botella_1.Botella),
    (0, typeorm_1.JoinColumn)({ name: "idbotella" }),
    __metadata("design:type", Botella_1.Botella)
], NivelDescubrimiento.prototype, "botella", void 0);
exports.NivelDescubrimiento = NivelDescubrimiento = __decorate([
    (0, typeorm_1.Entity)("nivel_descubrimiento"),
    (0, typeorm_1.Unique)(["idbotella", "posicion"])
], NivelDescubrimiento);
//# sourceMappingURL=NivelDescubrimiento.js.map