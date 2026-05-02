import { DataSource } from "typeorm";
export declare class DataService {
    private dataSource;
    constructor(dataSource: DataSource);
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
    import(payload: any): Promise<{
        ok: boolean;
    }>;
}
