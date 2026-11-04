# Guion de <título> — <id>

Plantilla de Fase 1: completar a partir de la fuente, no pegarla como si ya fuera un guion terminado. Usar la rama `video/<id>`. Leer antes `../../AGENTS.md` y los cuatro documentos de producción.

## Ficha y fuentes

- Tipo: medicamento | enfermedad | procedimiento | tip | proceso fisiológico.
- Tema y público: estudiantes de enfermería; concretar contexto documentado.
- Rama y base comprobada: <rama> / <commit>.
- Fuente adjunta: <archivo, huella y versión/fecha si constan>.
- Localización de cada dato: <página/sección o ruta del campo>.
- Estado: [REVISAR] hasta completar la trazabilidad. Si no hay fuente, no inventar hechos ni presentarlo como confirmado.
- Referencias a consultar: <fuentes primarias pertinentes al tipo; no enlaces fabricados>.

## 1. GUIÓN FINAL — bloque limpio para ElevenLabs

Intercalar entre el saludo y el cierre las frases documentadas; borrar esta instrucción al completar. No introducir marcadores, tiempos, emojis, números en cifras, SSML ni acotaciones dentro del bloque. La grafía MediShort360 se conserva por petición del usuario. Si hay afirmaciones pendientes, indicarlas fuera del bloque y no declarar la narración lista para generar.

```text
¡Hola, hijos de Florence Nightingale!
Síguenos en MediShort360.
```

## 2. Plan de tiempos estimados

Estos tiempos solo sirven para planificar sin audio. No usarlos en Fase 2.

| Segundo estimado: inicio–fin | Qué se ve y qué se mueve | Frase exacta del guion | Palabras | Afirmación/fuente y estado |
|---|---|---|---:|---|
| <inicio–fin> | <evento, tamaño, actor y acción> | <frase> | <conteo> | <localización o [REVISAR]> |

- Total: <85–100 palabras, incluidos saludo y cierre>.
- Duración estimada: <total / dos palabras por segundo, más pausas>; objetivo 40–50 s.
- Distribución por tramo: <palabras / segundos>; señalar términos que necesitan revisar pronunciación.
- Si no cabe: proponer el recorte y no aplicarlo sin informar. No quitar datos esenciales por esconder un problema de tiempo.

## 3. Plan de piezas

| REUTILIZAR o CREAR | Pieza, ruta y escena adaptadora | Props y estados requeridos | Acción visible | Captura prevista |
|---|---|---|---|---|
| <decisión> | <componente real de BIBLIOTECA o pieza faltante> | <parámetros, no tiempos de audio inventados> | <inicio–acción–final> | <Preview/fotograma/ruta> |

- Explicar cómo la vista externa se conecta con la macro cuando el mecanismo lo requiere.
- Anotar encuadre, zoom aplicado, tamaño del objeto/célula menor y fuente menor.
- Crear piezas parametrizables en `src/anatomy/` y adaptadores `SceneProps` en `src/scenes/`; registrar escenas en `names.ts` y `registry.ts`, y añadir un preview.
- Generar capturas en `output/previews/` y actualizar el inventario. No atribuir un render o una prueba que no se ejecutó.

## 4. Datos por confirmar con fuente

| Id provisional | Afirmación del guion | Fuente/localización exacta | Estado y pregunta para revisión |
|---|---|---|---|
| <f1> | <afirmación> | <archivo/campo/referencia; null si falta> | [REVISAR] <qué falta confirmar> |

Mantener `reviewedBy: null` hasta revisión del usuario. Datos faltantes, rangos de días, unidades, presentación, población e indicación no se completan por memoria. En medicamento no añadir dosis salvo petición explícita y fuente pertinente.

## 5. Estado y siguiente disparador

- Piezas nuevas creadas y registradas: <rutas>.
- Verificaciones realmente ejecutadas y resultados: <comandos/archivos/capturas>.
- Pendientes: <fuente, pronunciación, revisión visual>.
- Commit y push: <hash, rama, resultado real o error completo>.
- Esperar el MP3 con `AUDIO LISTO: proyecto <id>`. Entonces medir/transcribir y sustituir el plan estimado por tiempos reales; el audio manda. No abrir Studio ni hacer merge ni render final.
