"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Nivel_1 = require("../entity/Nivel");
const Juego_1 = require("../entity/Juego");
const NivelDescubrimiento_1 = require("../entity/NivelDescubrimiento");
const niveles_controller_1 = require("./niveles.controller");
const niveles_service_1 = require("./niveles.service");
let NivelesModule = class NivelesModule {
};
exports.NivelesModule = NivelesModule;
exports.NivelesModule = NivelesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Nivel_1.Nivel, Juego_1.Juego, NivelDescubrimiento_1.NivelDescubrimiento])],
        controllers: [niveles_controller_1.NivelesController],
        providers: [niveles_service_1.NivelesService],
    })
], NivelesModule);
//# sourceMappingURL=niveles.module.js.map