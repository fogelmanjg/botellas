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
exports.BloqueosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Bloqueo_1 = require("../entity/Bloqueo");
let BloqueosService = class BloqueosService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { nombre: "ASC" } });
    }
    async findOne(id) {
        const bloqueo = await this.repo.findOneBy({ idbloqueo: id });
        if (!bloqueo)
            throw new common_1.NotFoundException("Bloqueo no encontrado");
        return bloqueo;
    }
    create(body) {
        if (typeof body.nombre !== "string" || body.nombre.trim() === "")
            throw new common_1.BadRequestException("nombre es requerido");
        const bloqueo = this.repo.create({
            nombre: body.nombre.trim(),
            tipo: body.tipo ?? null,
            bloquea: body.bloquea?.trim() || null,
            desbloquea: body.desbloquea ?? "N",
            entrada: body.entrada ?? "N",
            salida: body.salida ?? "N",
            vista: body.vista ?? "N",
            css: body.css ?? "S",
        });
        return this.repo.save(bloqueo);
    }
    async update(id, body) {
        const bloqueo = await this.findOne(id);
        if (typeof body.nombre === "string")
            bloqueo.nombre = body.nombre.trim();
        if ("tipo" in body)
            bloqueo.tipo = body.tipo ?? null;
        if ("bloquea" in body)
            bloqueo.bloquea = body.bloquea?.trim() || null;
        if ("desbloquea" in body)
            bloqueo.desbloquea = body.desbloquea ?? "N";
        if ("entrada" in body)
            bloqueo.entrada = body.entrada ?? "N";
        if ("salida" in body)
            bloqueo.salida = body.salida ?? "N";
        if ("vista" in body)
            bloqueo.vista = body.vista ?? "N";
        if ("css" in body)
            bloqueo.css = body.css ?? "S";
        return this.repo.save(bloqueo);
    }
    async remove(id) {
        const bloqueo = await this.findOne(id);
        return this.repo.remove(bloqueo);
    }
};
exports.BloqueosService = BloqueosService;
exports.BloqueosService = BloqueosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Bloqueo_1.Bloqueo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BloqueosService);
//# sourceMappingURL=bloqueos.service.js.map