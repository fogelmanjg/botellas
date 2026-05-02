import { Repository } from "typeorm";
import { Estrategia } from "../entity/Estrategia";
export declare class EstrategiasService {
    private repo;
    constructor(repo: Repository<Estrategia>);
    findAll(): Promise<Estrategia[]>;
    findOne(id: number): Promise<Estrategia>;
    create(body: any): Promise<Estrategia>;
    update(id: number, body: any): Promise<Estrategia>;
    remove(id: number): Promise<Estrategia>;
}
