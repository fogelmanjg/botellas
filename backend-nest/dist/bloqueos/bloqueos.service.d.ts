import { Repository } from "typeorm";
import { Bloqueo } from "../entity/Bloqueo";
export declare class BloqueosService {
    private repo;
    constructor(repo: Repository<Bloqueo>);
    findAll(): Promise<Bloqueo[]>;
    findOne(id: number): Promise<Bloqueo>;
    create(body: any): Promise<Bloqueo>;
    update(id: number, body: any): Promise<Bloqueo>;
    remove(id: number): Promise<Bloqueo>;
}
