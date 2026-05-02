import { Nivel } from "./Nivel";
import { Botella } from "./Botella";
import { BloqueoGrupo } from "./BloqueoGrupo";
export declare class Grupo {
    idgrupo: number;
    nivel: Nivel;
    numerogrupo: number;
    entrada: number;
    botellas: Botella[];
    bloqueoGrupos: BloqueoGrupo[];
}
