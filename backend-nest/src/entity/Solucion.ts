import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Nivel } from "./Nivel";

@Entity("solucion")
export class Solucion {
  @PrimaryColumn({ name: "idnivel" })
  idnivel!: number;

  @OneToOne(() => Nivel, (n: Nivel) => n.solucion)
  @JoinColumn({ name: "idnivel" })
  nivel!: Nivel;

  @Column({ type: "jsonb", nullable: true })
  pasos!: object | null;

  // R=resolviendo, S=resuelta, X=sin solución
  @Column({ type: "char", length: 1, default: "S" })
  estado!: string;

  @Column({ name: "fechacalculo", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fechacalculo!: Date;
}
