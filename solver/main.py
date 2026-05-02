"""FastAPI solver service."""

import threading
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import cargar_nivel, cargar_descubrimientos, guardar_solucion, marcar_resolviendo
from state import Estado, estado_desde_nivel
from engine import resolver
from reveal import caminos_revelacion

app = FastAPI(title="Botellas Solver", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/resolver/{idnivel}")
def resolver_nivel(idnivel: int, async_mode: bool = False):
    """
    Resuelve un nivel y guarda la solución en la DB.

    Si el nivel tiene piezas ocultas (x) sin descubrir, retorna
    recomendaciones de revelación en lugar de una solución completa.

    - async_mode=false (default): bloquea hasta tener resultado.
    - async_mode=true: inicia en background (solo para niveles sin x's).
    """
    try:
        nivel_data = cargar_nivel(idnivel)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Nivel no encontrado: {e}")

    descubrimientos = cargar_descubrimientos(idnivel)
    estado = estado_desde_nivel(nivel_data, descubrimientos)

    tiene_x = any(
        e == "x"
        for b in estado.botellas
        for e in b.espacios
        if e is not None
    )

    if tiene_x:
        # Reveal mode: siempre sincrónico
        return _ejecutar_revelacion(idnivel, estado)

    if async_mode:
        marcar_resolviendo(idnivel)
        t = threading.Thread(target=_resolver_bg, args=(idnivel, estado), daemon=True)
        t.start()
        return {"status": "resolviendo", "idnivel": idnivel}

    return _ejecutar_solver(idnivel, estado)


def _resolver_bg(idnivel: int, estado: Estado):
    try:
        _ejecutar_solver(idnivel, estado)
    except Exception:
        guardar_solucion(idnivel, [], "X")


def _ejecutar_revelacion(idnivel: int, estado: Estado) -> dict:
    recomendaciones = caminos_revelacion(estado)
    guardar_solucion(idnivel, [], "X")
    return {
        "status": "revelacion",
        "idnivel": idnivel,
        "recomendaciones": recomendaciones,
    }


def _ejecutar_solver(idnivel: int, estado: Estado) -> dict:
    marcar_resolviendo(idnivel)
    solucion, timed_out = resolver(estado)

    if solucion is None:
        guardar_solucion(idnivel, [], "X")
        status = "timeout" if timed_out else "sin_solucion"
        return {"status": status, "idnivel": idnivel, "pasos": 0}

    pasos_limpios = [
        {k: v for k, v in mov.items() if not k.startswith("_")}
        for mov in solucion
    ]
    guardar_solucion(idnivel, pasos_limpios, "S")
    return {
        "status": "resuelto",
        "idnivel": idnivel,
        "pasos": len(pasos_limpios),
        "solucion": pasos_limpios,
    }


@app.get("/solucion/{idnivel}")
def obtener_solucion(idnivel: int):
    """Consulta la solución guardada para un nivel."""
    import psycopg2.extras
    from db import get_conn
    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cur.execute("SELECT * FROM solucion WHERE idnivel = %s", (idnivel,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Sin solución guardada")
        return dict(row)
    finally:
        cur.close()
        conn.close()
