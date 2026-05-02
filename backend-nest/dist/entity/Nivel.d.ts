import { Juego } from "./Juego";
import { Grupo } from "./Grupo";
import { Solucion } from "./Solucion";
export declare class Nivel {
    idnivel: number;
    juego: Juego;
    numeronivel: number;
    capacidadextra: number;
    estadohash: string | null;
    validado: string;
    subidopor: string | null;
    grupos: Grupo[];
    solucion: Solucion | null;
}
