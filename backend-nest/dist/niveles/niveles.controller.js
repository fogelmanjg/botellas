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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelesController = void 0;
const common_1 = require("@nestjs/common");
const niveles_service_1 = require("./niveles.service");
let NivelesController = class NivelesController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(idjuego) {
        return this.service.findAll(idjuego ? Number(idjuego) : undefined);
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
    create(body) {
        return this.service.create(body);
    }
    update(id, body) {
        return this.service.update(Number(id), body);
    }
    remove(id) {
        return this.service.remove(Number(id));
    }
    resolver(id, asyncMode) {
        return this.service.resolver(Number(id), asyncMode === "true");
    }
    solucion(id) {
        return this.service.solucion(Number(id));
    }
    getDescubrimientos(id) {
        return this.service.getDescubrimientos(Number(id));
    }
    addDescubrimiento(id, body) {
        return this.service.addDescubrimiento(Number(id), body);
    }
};
exports.NivelesController = NivelesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("idjuego")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/resolver"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("async")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "resolver", null);
__decorate([
    (0, common_1.Get)(":id/solucion"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "solucion", null);
__decorate([
    (0, common_1.Get)(":id/descubrimientos"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "getDescubrimientos", null);
__decorate([
    (0, common_1.Post)(":id/descubrimientos"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NivelesController.prototype, "addDescubrimiento", null);
exports.NivelesController = NivelesController = __decorate([
    (0, common_1.Controller)("niveles"),
    __metadata("design:paramtypes", [niveles_service_1.NivelesService])
], NivelesController);
//# sourceMappingURL=niveles.controller.js.map