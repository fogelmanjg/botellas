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
exports.Bloqueo = void 0;
const typeorm_1 = require("typeorm");
const Botella_1 = require("./Botella");
const BloqueoGrupo_1 = require("./BloqueoGrupo");
let Bloqueo = class Bloqueo {
    idbloqueo;
    nombre;
    tipo;
    bloquea;
    desbloquea;
    entrada;
    salida;
    vista;
    css;
    botellas;
    bloqueoGrupos;
};
exports.Bloqueo = Bloqueo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idbloqueo" }),
    __metadata("design:type", Number)
], Bloqueo.prototype, "idbloqueo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Bloqueo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", Object)
], Bloqueo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Bloqueo.prototype, "bloquea", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true, default: "N" }),
    __metadata("design:type", Object)
], Bloqueo.prototype, "desbloquea", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "N" }),
    __metadata("design:type", String)
], Bloqueo.prototype, "entrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "N" }),
    __metadata("design:type", String)
], Bloqueo.prototype, "salida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "N" }),
    __metadata("design:type", String)
], Bloqueo.prototype, "vista", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "S" }),
    __metadata("design:type", String)
], Bloqueo.prototype, "css", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Botella_1.Botella, (b) => b.bloqueo),
    __metadata("design:type", Array)
], Bloqueo.prototype, "botellas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BloqueoGrupo_1.BloqueoGrupo, (bg) => bg.bloqueo),
    __metadata("design:type", Array)
], Bloqueo.prototype, "bloqueoGrupos", void 0);
exports.Bloqueo = Bloqueo = __decorate([
    (0, typeorm_1.Entity)("bloqueo")
], Bloqueo);
//# sourceMappingURL=Bloqueo.js.map