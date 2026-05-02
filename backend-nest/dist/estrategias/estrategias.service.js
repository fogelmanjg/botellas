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
exports.EstrategiasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Estrategia_1 = require("../entity/Estrategia");
let EstrategiasService = class EstrategiasService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { peso: "ASC", nombre: "ASC" } });
    }
    async findOne(id) {
        const e = await this.repo.findOneBy({ idestategia: id });
        if (!e)
            throw new common_1.NotFoundException("Estrategia no encontrada");
        return e;
    }
    create(body) {
        if (typeof body.nombre !== "string" || body.nombre.trim() === "")
            throw new common_1.BadRequestException("nombre es requerido");
        const e = this.repo.create({
            nombre: body.nombre.trim(),
            descripcion: body.descripcion?.trim() || null,
            peso: typeof body.peso === "number" ? body.peso : 999,
            activa: body.activa === "N" ? "N" : "S",
        });
        return this.repo.save(e);
    }
    async update(id, body) {
        const e = await this.findOne(id);
        if (typeof body.nombre === "string")
            e.nombre = body.nombre.trim();
        if ("descripcion" in body)
            e.descripcion = body.descripcion?.trim() || null;
        if (typeof body.peso === "number")
            e.peso = body.peso;
        if ("activa" in body)
            e.activa = body.activa === "N" ? "N" : "S";
        return this.repo.save(e);
    }
    async remove(id) {
        const e = await this.findOne(id);
        return this.repo.remove(e);
    }
};
exports.EstrategiasService = EstrategiasService;
exports.EstrategiasService = EstrategiasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Estrategia_1.Estrategia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstrategiasService);
//# sourceMappingURL=estrategias.service.js.map