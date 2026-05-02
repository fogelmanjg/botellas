import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Nivel } from "./Nivel";
import { Botella } from "./Botella";

@Entity("nivel_descubrimiento")
@Unique(["idbotella", "posicion"])
export class NivelDescubrimiento {
  @PrimaryColumn()
  idnivel!: number;

  @PrimaryColumn()
  orden!: number;

  @Column()
  idbotella!: number;

  @Column()
  posicion!: number;

  @Column({ name: "color_real", type: "char", length: 1 })
  colorReal!: string;

  @ManyToOne(() => Nivel)
  @JoinColumn({ name: "idnivel" })
  nivel!: Nivel;

  @ManyToOne(() => Botella)
  @JoinColumn({ name: "idbotella" })
  botella!: Botella;
}
