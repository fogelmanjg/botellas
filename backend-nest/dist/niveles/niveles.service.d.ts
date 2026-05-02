import { Repository, DataSource } from "typeorm";
import { Nivel } from "../entity/Nivel";
import { Juego } from "../entity/Juego";
import { Bloqueo } from "../entity/Bloqueo";
import { NivelDescubrimiento } from "../entity/NivelDescubrimiento";
export declare class NivelesService {
    private nivelRepo;
    private juegoRepo;
    private descRepo;
    private dataSource;
    constructor(nivelRepo: Repository<Nivel>, juegoRepo: Repository<Juego>, descRepo: Repository<NivelDescubrimiento>, dataSource: DataSource);
    findAll(idjuego?: number): Promise<Nivel[]>;
    findOne(id: number): Promise<{
        idnivel: number;
        numeronivel: number;
        capacidadextra: number;
        estadohash: string | null;
        validado: string;
        subidopor: string | null;
        juego: Juego;
        grupos: {
            idgrupo: number;
            numerogrupo: number;
            entrada: number;
            bloqueo: Bloqueo;
            botellas: {
                idbotella: number;
                numerobotella: number;
                color: string | null;
                bloqueo: Bloqueo | null;
                espacios: (string | null)[];
            }[];
        }[];
    }>;
    create(body: any): Promise<{
        idnivel: number;
    }>;
    update(id: number, body: any): Promise<{
        idnivel: number;
    }>;
    remove(id: number): Promise<void>;
    resolver(id: number, asyncMode: boolean): Promise<any>;
    solucion(id: number): Promise<any>;
    getDescubrimientos(idnivel: number): Promise<NivelDescubrimiento[]>;
    addDescubrimiento(idnivel: number, body: any): Promise<NivelDescubrimiento>;
    private validarGrupos;
    private crearGrupos;
}
