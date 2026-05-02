import { JuegosService } from "./juegos.service";
export declare class JuegosController {
    private service;
    constructor(service: JuegosService);
    findAll(): Promise<import("../entity/Juego").Juego[]>;
    findOne(id: string): Promise<import("../entity/Juego").Juego>;
    create(body: {
        nombre: string;
        editor?: string;
    }): Promise<import("../entity/Juego").Juego>;
    update(id: string, body: {
        nombre?: string;
        editor?: string;
    }): Promise<import("../entity/Juego").Juego>;
    remove(id: string): Promise<import("../entity/Juego").Juego>;
}
