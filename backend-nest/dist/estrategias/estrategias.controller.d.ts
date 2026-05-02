import { EstrategiasService } from "./estrategias.service";
export declare class EstrategiasController {
    private service;
    constructor(service: EstrategiasService);
    findAll(): Promise<import("../entity/Estrategia").Estrategia[]>;
    findOne(id: string): Promise<import("../entity/Estrategia").Estrategia>;
    create(body: any): Promise<import("../entity/Estrategia").Estrategia>;
    update(id: string, body: any): Promise<import("../entity/Estrategia").Estrategia>;
    remove(id: string): Promise<import("../entity/Estrategia").Estrategia>;
}
