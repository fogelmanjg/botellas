# Botellas — Water Sort Puzzle MFE

App de resolución del water sort puzzle. Funciona tanto standalone como MFE dentro de la federación ETER personal.

## Mecánicas del juego

**Botellas normales:** 4 espacios. espacio1=fondo, espacio4=tope. Solo interacción por el tope.

**Botella extra:** capacidad variable, definida por nivel. Reglas de llenado distintas.

**Piezas ocultas (x):** un espacio puede tener color desconocido. Se revela cuando queda expuesto (piezas arriba removidas). Son determinísticas: mismo color en cada partida.

**Auto-relleno:** si botella vacía + extra tiene piezas → juego pone pieza del extra automáticamente. Invariante: no puede existir botella vacía mientras el extra tenga piezas.

**Bloqueos:**
- Lona color (agrupa=false): oculta botella, se levanta al llenar botella del color específico
- Lona (agrupa=true): grupo, se levanta una por cada botella llena
- Barrera (agrupa=true): grupo, no permite sacar piezas, se desbloquea cuando cualquiera se llena
- Traba (agrupa=false): individual permanente, solo entrada

## Solver Python (solver/)

Arquitectura Rule-Directed Search:
- Fase 1: estrategias deterministas (reconocen patrones)
- Fase 2: fallback DFS con backtracking
- Timeout de 5s: si hay x's sin revelar → modo revelación

**Archivos:**
- state.py — Estado, Botella (idx, espacios, bloqueo, idbotella)
- rules.py — movimientos válidos caso 1 (sin extra) y caso 2 (con extra)
- engine.py — DFS con timeout, retorna (pasos, timed_out)
- reveal.py — BFS para encontrar caminos que exponen piezas ocultas
- db.py — cargar_nivel(), cargar_descubrimientos(), guardar_solucion()
- main.py — FastAPI: /resolver/:id, /solucion/:id
- strategies/ — módulos de estrategias (peso 10/20/30...)

**Respuesta /resolver/:id:**
- status=resuelto: { solucion: [...pasos] }
- status=revelacion: { recomendaciones: [{idbotella, posicion, costo, pasos}] }
- status=sin_solucion / timeout

**nivel_descubrimiento:** tabla que acumula piezas ocultas descubiertas por el usuario.
POST /niveles/:id/descubrimientos → { idbotella, posicion, color_real }

## Backend NestJS (backend-nest/)

- Entidades: Juego, Nivel, Grupo, Botella, Bloqueo, BloqueoGrupo, Solucion, NivelDescubrimiento, Estrategia
- synchronize: true en dev (pero SIEMPRE crear migration explícita también)
- Migrations en src/migrations/ con timestamp en nombre

## Frontend Angular MFE (frontend/)

- Expone ./Routes via Native Federation
- API service en src/app/services/api.ts apunta a botellas-api.fogelmanjg.duckdns.org
- Páginas: Niveles, Juegos, Bloqueos, Estrategias, Editor, Exportar, Importar

## DB

- PostgreSQL en docker-compose de backend-nest
- schema en db/schema.sql, datos en db/data.json, restore con db/restore.py

## Pendiente

- Frontend: modo revelación (mostrar recomendaciones cuando status=revelacion)
- Frontend: botón Ejecuté este camino → color picker → POST descubrimientos → re-resolver
- Filas del tablero: campo fila en botella, editor por filas, lona sin color como lona con agrupa=true
