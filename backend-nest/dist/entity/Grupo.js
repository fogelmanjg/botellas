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
exports.Grupo = void 0;
const typeorm_1 = require("typeorm");
const Nivel_1 = require("./Nivel");
const Botella_1 = require("./Botella");
const BloqueoGrupo_1 = require("./BloqueoGrupo");
let Grupo = class Grupo {
    idgrupo;
    nivel;
    numerogrupo;
    entrada;
    botellas;
    bloqueoGrupos;
};
exports.Grupo = Grupo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idgrupo" }),
    __metadata("design:type", Number)
], Grupo.prototype, "idgrupo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Nivel_1.Nivel, (n) => n.grupos),
    (0, typeorm_1.JoinColumn)({ name: "idnivel" }),
    __metadata("design:type", Nivel_1.Nivel)
], Grupo.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "numerogrupo" }),
    __metadata("design:type", Number)
], Grupo.prototype, "numerogrupo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Grupo.prototype, "entrada", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Botella_1.Botella, (b) => b.grupo),
    __metadata("design:type", Array)
], Grupo.prototype, "botellas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BloqueoGrupo_1.BloqueoGrupo, (bg) => bg.grupo),
    __metadata("design:type", Array)
], Grupo.prototype, "bloqueoGrupos", void 0);
exports.Grupo = Grupo = __decorate([
    (0, typeorm_1.Entity)("grupo")
], Grupo);
//# sourceMappingURL=Grupo.js.map