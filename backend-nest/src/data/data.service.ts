import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class DataService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async export() {
    const q = (sql: string) => this.dataSource.query(sql);
    return {
      juegos:       await q("SELECT * FROM juego"),
      niveles:      await q("SELECT * FROM nivel"),
      grupos:       await q("SELECT * FROM grupo"),
      botellas:     await q("SELECT * FROM botella"),
      bloqueos:     await q("SELECT * FROM bloqueo"),
      bloqueoGrupos: await q("SELECT * FROM bloqueogrupo"),
      estrategias:  await q("SELECT * FROM estrategia"),
      soluciones:   await q("SELECT * FROM solucion"),
    };
  }

  async import(payload: any) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.query("DELETE FROM solucion");
      await qr.query("DELETE FROM bloqueogrupo");
      await qr.query("DELETE FROM botella");
      await qr.query("DELETE FROM grupo");
      await qr.query("DELETE FROM nivel");
      await qr.query("DELETE FROM juego");
      await qr.query("DELETE FROM bloqueo");
      await qr.query("DELETE FROM estrategia");

      for (const b of payload.bloqueos ?? [])
        await qr.query(
          "INSERT INTO bloqueo (idbloqueo,nombre,tipo,bloquea,desbloquea,entrada,salida,vista,css) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
          [b.idbloqueo, b.nombre, b.tipo??null, b.bloquea??null, b.desbloquea??null, b.entrada??null, b.salida??null, b.vista??null, b.css??null]
        );

      for (const e of payload.estrategias ?? [])
        await qr.query(
          "INSERT INTO estrategia (idestategia,nombre,descripcion,peso,activa) VALUES ($1,$2,$3,$4,$5)",
          [e.idestategia, e.nombre, e.descripcion??null, e.peso??null, e.activa??"S"]
        );

      for (const j of payload.juegos ?? [])
        await qr.query(
          "INSERT INTO juego (idjuego,nombre,editor) VALUES ($1,$2,$3)",
          [j.idjuego, j.nombre, j.editor??null]
        );

      for (const n of payload.niveles ?? [])
        await qr.query(
          "INSERT INTO nivel (idnivel,numeronivel,capacidadextra,estadohash,validado,subidopor,idjuego) VALUES ($1,$2,$3,$4,$5,$6,$7)",
          [n.idnivel, n.numeronivel, n.capacidadextra??0, n.estadohash??null, n.validado??"N", n.subidopor??null, n.idjuego]
        );

      for (const g of payload.grupos ?? [])
        await qr.query(
          "INSERT INTO grupo (idgrupo,numerogrupo,entrada,idnivel) VALUES ($1,$2,$3,$4)",
          [g.idgrupo, g.numerogrupo, g.entrada, g.idnivel]
        );

      for (const b of payload.botellas ?? [])
        await qr.query(
          "INSERT INTO botella (idbotella,numerobotella,color,espacio1,espacio2,espacio3,espacio4,idgrupo,idbloqueo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
          [b.idbotella, b.numerobotella, b.color??null, b.espacio1??null, b.espacio2??null, b.espacio3??null, b.espacio4??null, b.idgrupo, b.idbloqueo??null]
        );

      for (const bg of payload.bloqueoGrupos ?? [])
        await qr.query(
          "INSERT INTO bloqueogrupo (idbloqueogrupo,idgrupo,idbloqueo) VALUES ($1,$2,$3)",
          [bg.idbloqueogrupo, bg.idgrupo, bg.idbloqueo]
        );

      for (const s of payload.soluciones ?? [])
        await qr.query(
          "INSERT INTO solucion (idnivel,pasos,fechacalculo) VALUES ($1,$2,$3)",
          [s.idnivel, JSON.stringify(s.pasos??null), s.fechacalculo??null]
        );

      await qr.commitTransaction();

      const seqs = [
        { name: "juego_idjuego_seq",               table: "juego",        col: "idjuego" },
        { name: "nivel_idnivel_seq",               table: "nivel",        col: "idnivel" },
        { name: "grupo_idgrupo_seq",               table: "grupo",        col: "idgrupo" },
        { name: "botella_idbotella_seq",           table: "botella",      col: "idbotella" },
        { name: "bloqueo_idbloqueo_seq",           table: "bloqueo",      col: "idbloqueo" },
        { name: "bloqueogrupo_idbloqueogrupo_seq", table: "bloqueogrupo", col: "idbloqueogrupo" },
        { name: "estrategia_idestategia_seq",      table: "estrategia",   col: "idestategia" },
      ];
      for (const s of seqs)
        await qr.query(`SELECT setval('${s.name}', COALESCE((SELECT MAX(${s.col}) FROM ${s.table}), 1))`);

      return { ok: true };
    } catch (err) {
      await qr.rollbackTransaction();
      throw err;
    } finally {
      await qr.release();
    }
  }
}
