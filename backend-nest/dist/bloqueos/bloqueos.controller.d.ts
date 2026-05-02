import { BloqueosService } from "./bloqueos.service";
export declare class BloqueosController {
    private service;
    constructor(service: BloqueosService);
    findAll(): Promise<import("../entity/Bloqueo").Bloqueo[]>;
    findOne(id: string): Promise<import("../entity/Bloqueo").Bloqueo>;
    create(body: any): Promise<import("../entity/Bloqueo").Bloqueo>;
    update(id: string, body: any): Promise<import("../entity/Bloqueo").Bloqueo>;
    remove(id: string): Promise<import("../entity/Bloqueo").Bloqueo>;
}
