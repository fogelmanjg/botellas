"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Juego_1 = require("../entity/Juego");
const juegos_controller_1 = require("./juegos.controller");
const juegos_service_1 = require("./juegos.service");
let JuegosModule = class JuegosModule {
};
exports.JuegosModule = JuegosModule;
exports.JuegosModule = JuegosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Juego_1.Juego])],
        controllers: [juegos_controller_1.JuegosController],
        providers: [juegos_service_1.JuegosService],
    })
], JuegosModule);
//# sourceMappingURL=juegos.module.js.map