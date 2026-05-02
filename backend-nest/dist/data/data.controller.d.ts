import { DataService } from "./data.service";
export declare class DataController {
    private service;
    constructor(service: DataService);
    export(): Promise<{
        juegos: any;
        niveles: any;
        grupos: any;
        botellas: any;
        bloqueos: any;
        bloqueoGrupos: any;
        estrategias: any;
        soluciones: any;
    }>;
    import(body: any): Promise<{
        ok: boolean;
    }>;
}
