import { Botella } from "./Botella";
import { BloqueoGrupo } from "./BloqueoGrupo";
export declare class Bloqueo {
    idbloqueo: number;
    nombre: string;
    tipo: string | null;
    bloquea: string | null;
    desbloquea: string | null;
    entrada: string;
    salida: string;
    vista: string;
    css: string;
    botellas: Botella[];
    bloqueoGrupos: BloqueoGrupo[];
}
