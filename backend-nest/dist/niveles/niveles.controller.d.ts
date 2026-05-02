import { NivelesService } from "./niveles.service";
export declare class NivelesController {
    private service;
    constructor(service: NivelesService);
    findAll(idjuego?: string): Promise<import("../entity/Nivel").Nivel[]>;
    findOne(id: string): Promise<{
        idnivel: number;
        numeronivel: number;
        capacidadextra: number;
        estadohash: string | null;
        validado: string;
        subidopor: string | null;
        juego: import("../entity/Juego").Juego;
        grupos: {
            idgrupo: number;
            numerogrupo: number;
            entrada: number;
            bloqueo: import("../entity/Bloqueo").Bloqueo;
            botellas: {
                idbotella: number;
                numerobotella: number;
                color: string | null;
                bloqueo: import("../entity/Bloqueo").Bloqueo | null;
                espacios: (string | null)[];
            }[];
        }[];
    }>;
    create(body: any): Promise<{
        idnivel: number;
    }>;
    update(id: string, body: any): Promise<{
        idnivel: number;
    }>;
    remove(id: string): Promise<void>;
    resolver(id: string, asyncMode?: string): Promise<any>;
    solucion(id: string): Promise<any>;
    getDescubrimientos(id: string): Promise<import("../entity/NivelDescubrimiento").NivelDescubrimiento[]>;
    addDescubrimiento(id: string, body: any): Promise<import("../entity/NivelDescubrimiento").NivelDescubrimiento>;
}
