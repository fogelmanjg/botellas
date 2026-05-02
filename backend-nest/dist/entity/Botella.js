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
exports.Botella = void 0;
const typeorm_1 = require("typeorm");
const Grupo_1 = require("./Grupo");
const Bloqueo_1 = require("./Bloqueo");
let Botella = class Botella {
    idbotella;
    grupo;
    numerobotella;
    bloqueo;
    color;
    espacio1;
    espacio2;
    espacio3;
    espacio4;
};
exports.Botella = Botella;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idbotella" }),
    __metadata("design:type", Number)
], Botella.prototype, "idbotella", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grupo_1.Grupo, (g) => g.botellas),
    (0, typeorm_1.JoinColumn)({ name: "idgrupo" }),
    __metadata("design:type", Grupo_1.Grupo)
], Botella.prototype, "grupo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "numerobotella" }),
    __metadata("design:type", Number)
], Botella.prototype, "numerobotella", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Bloqueo_1.Bloqueo, (bl) => bl.botellas, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "idbloqueo" }),
    __metadata("design:type", Object)
], Botella.prototype, "bloqueo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, nullable: true }),
    __metadata("design:type", Object)
], Botella.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, nullable: true }),
    __metadata("design:type", Object)
], Botella.prototype, "espacio1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, nullable: true }),
    __metadata("design:type", Object)
], Botella.prototype, "espacio2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, nullable: true }),
    __metadata("design:type", Object)
], Botella.prototype, "espacio3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 1, nullable: true }),
    __metadata("design:type", Object)
], Botella.prototype, "espacio4", void 0);
exports.Botella = Botella = __decorate([
    (0, typeorm_1.Entity)("botella")
], Botella);
//# sourceMappingURL=Botella.js.map