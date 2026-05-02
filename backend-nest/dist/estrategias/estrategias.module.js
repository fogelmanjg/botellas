"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrategiasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Estrategia_1 = require("../entity/Estrategia");
const estrategias_controller_1 = require("./estrategias.controller");
const estrategias_service_1 = require("./estrategias.service");
let EstrategiasModule = class EstrategiasModule {
};
exports.EstrategiasModule = EstrategiasModule;
exports.EstrategiasModule = EstrategiasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Estrategia_1.Estrategia])],
        controllers: [estrategias_controller_1.EstrategiasController],
        providers: [estrategias_service_1.EstrategiasService],
    })
], EstrategiasModule);
//# sourceMappingURL=estrategias.module.js.map