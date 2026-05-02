"""
Modo revelación: encuentra caminos cortos para exponer piezas ocultas (x's).

Cuando el solver normal no puede completar el nivel por piezas desconocidas,
calcula las 3 mejores opciones para que el usuario descubra al menos una x,
ordenadas por uso pico de la botella extra (menor = más barato).
"""
from __future__ import annotations
import time
from collections import deque
from state import Estado
from rules import movimientos_validos, aplicar_movimiento

MAX_PASOS_REVEAL = 20
TIMEOUT_POR_X = 1.5
TIMEOUT_TOTAL = 4.0
MAX_RECOMENDACIONES = 3


def caminos_revelacion(estado_inicial: Estado) -> list[dict]:
    """
    Retorna hasta 3 recomendaciones para revelar piezas ocultas.
    Cada recomendación:
      { idbotella, posicion (1-based DB), costo (pico extra), pasos: [...] }
    """
    recomendaciones = []
    deadline_total = time.monotonic() + TIMEOUT_TOTAL

    objetivos = _encontrar_xs(estado_inicial)

    for (bot_idx, pos_idx, idbotella) in objetivos:
        tiempo_restante = deadline_total - time.monotonic()
        if tiempo_restante <= 0:
            break

        resultado = _buscar_revelacion(
            estado_inicial, bot_idx, pos_idx,
            timeout_s=min(tiempo_restante, TIMEOUT_POR_X),
        )
        if resultado is None:
            continue

        camino, pico_extra = resultado
        pasos_limpios = [
            {k: v for k, v in m.items() if not k.startswith("_")}
            for m in camino
        ]
        recomendaciones.append({
            "idbotella": idbotella,
            "posicion": pos_idx + 1,   # convertir a 1-based (DB)
            "costo": pico_extra,
            "pasos": pasos_limpios,
        })

    recomendaciones.sort(key=lambda r: r["costo"])
    return recomendaciones[:MAX_RECOMENDACIONES]


def _encontrar_xs(estado: Estado) -> list[tuple[int, int, int]]:
    """
    Devuelve lista de (bot_idx, pos_idx, idbotella) para cada x en el estado.
    Ordenados de mayor a menor pos_idx (las x más cerca del tope primero,
    ya que son más baratas de revelar).
    """
    xs = []
    for b in estado.botellas:
        for pos_idx in range(4):
            if b.espacios[pos_idx] == "x":
                xs.append((b.idx, pos_idx, b.idbotella))
    xs.sort(key=lambda t: -t[1])
    return xs


def _es_tope(estado: Estado, bot_idx: int, pos_idx: int) -> bool:
    """True si pos_idx es el tope actual de la botella bot_idx."""
    b = estado.botellas[bot_idx]
    if b.espacios[pos_idx] is None:
        return False
    return all(b.espacios[j] is None for j in range(pos_idx + 1, 4))


def _buscar_revelacion(
    estado_inicial: Estado,
    bot_idx: int,
    pos_idx: int,
    timeout_s: float = TIMEOUT_POR_X,
) -> tuple[list[dict], int] | None:
    """
    BFS para encontrar el camino más corto que deja pos_idx como tope de bot_idx.
    Retorna (camino, pico_extra) o None si no encuentra en tiempo.
    """
    if _es_tope(estado_inicial, bot_idx, pos_idx):
        return [], 0

    deadline = time.monotonic() + timeout_s
    # Cada nodo: (estado, camino, pico_extra)
    queue: deque[tuple[Estado, list[dict], int]] = deque()
    queue.append((estado_inicial, [], 0))
    visitados: set[str] = {estado_inicial.hash()}

    while queue:
        if time.monotonic() > deadline:
            return None

        estado, camino, pico = queue.popleft()

        if len(camino) >= MAX_PASOS_REVEAL:
            continue

        for mov in movimientos_validos(estado):
            nuevo = aplicar_movimiento(estado, mov)
            h = nuevo.hash()
            if h in visitados:
                continue
            visitados.add(h)

            nuevo_pico = max(pico, sum(1 for e in nuevo.extra if e is not None))
            nuevo_camino = camino + [mov]

            if _es_tope(nuevo, bot_idx, pos_idx):
                return nuevo_camino, nuevo_pico

            queue.append((nuevo, nuevo_camino, nuevo_pico))

    return None
