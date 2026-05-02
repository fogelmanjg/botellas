import { Repository } from "typeorm";
import { Juego } from "../entity/Juego";
export declare class JuegosService {
    private repo;
    constructor(repo: Repository<Juego>);
    findAll(): Promise<Juego[]>;
    findOne(id: number): Promise<Juego>;
    create(nombre: string, editor?: string): Promise<Juego>;
    update(id: number, nombre?: string, editor?: string): Promise<Juego>;
    remove(id: number): Promise<Juego>;
}
