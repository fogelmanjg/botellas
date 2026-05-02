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
exports.BloqueoGrupo = void 0;
const typeorm_1 = require("typeorm");
const Grupo_1 = require("./Grupo");
const Bloqueo_1 = require("./Bloqueo");
let BloqueoGrupo = class BloqueoGrupo {
    idbloqueogrupo;
    grupo;
    bloqueo;
};
exports.BloqueoGrupo = BloqueoGrupo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "idbloqueogrupo" }),
    __metadata("design:type", Number)
], BloqueoGrupo.prototype, "idbloqueogrupo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grupo_1.Grupo, (g) => g.bloqueoGrupos),
    (0, typeorm_1.JoinColumn)({ name: "idgrupo" }),
    __metadata("design:type", Grupo_1.Grupo)
], BloqueoGrupo.prototype, "grupo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Bloqueo_1.Bloqueo, (b) => b.bloqueoGrupos),
    (0, typeorm_1.JoinColumn)({ name: "idbloqueo" }),
    __metadata("design:type", Bloqueo_1.Bloqueo)
], BloqueoGrupo.prototype, "bloqueo", void 0);
exports.BloqueoGrupo = BloqueoGrupo = __decorate([
    (0, typeorm_1.Entity)("bloqueogrupo")
], BloqueoGrupo);
//# sourceMappingURL=BloqueoGrupo.js.map