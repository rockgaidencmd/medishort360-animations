# Biblioteca anatómica de herida del antebrazo

Piezas originales SVG/React, sin medios externos ni dependencias nuevas. Rama `feat/anatomia-herida`, base `feat/scene-pipeline-kit`. No hay audio, montaje final ni merge.

## Archivos y controles

| Archivo | Props y valores iniciales |
| --- | --- |
| `src/anatomy/ChildRig.tsx` | `state='walk'`: marcha; `trip`: inicia el tropiezo; `fall`: secuencia completa. `tripAt=2`, `impactAt=3.2`, segundos desde inicio. El impacto se limita internamente a al menos 0.25 s tras el tropiezo. `t=0`: tiempo en segundos. `shake=true`: temblor breve tras impacto, se extingue en 0.38 s. |
| `src/anatomy/SkinSection.tsx` | `healing=0`: abierta, `1`: cerrada. `woundWidth=270`: ancho SVG, limitado a 80–440. `woundDepth='superficial'` o `'profunda'`: profundidad esquemática. `showCells=true`, `showLabels=true`, `t=0` (segundos). Solo `healing` controla la reparación; `t` mueve células y flujo, y revela etiquetas. |
| `src/anatomy/ArmSurface.tsx` | `healing=0`, `woundWidth=270`, `woundDepth='superficial'`, `t=0`, sincronizables con el corte. Costra independiente de la piel rosada inferior; color, bordes levantados e inflamación cambian con `healing`. |
| `src/anatomy/Cells.tsx` | Nueve componentes exportados; todos aceptan `size=50`, `t=0`, `seed=1`. El tamaño se expresa en unidades de presentación SVG. Cada semilla produce una fase estable de flotación y deformación. |
| `src/anatomy/healing.ts` | `phaseAt()` lee exclusivamente el JSON. Intervalos cerrados por izquierda y abiertos por derecha; `1` pertenece a remodelación. Muestreo determinista sin estado. |
| `src/anatomy/data/healing-phases.json` | Fuente única de fases, nombres, rangos y pertenencia celular. Todos conservan `fuentes:null` y `revisar:true`. Se sustituyó «firma» por «firme» exactamente como se pidió. |
| `src/scenes/ChildFall.tsx` | Contrato `SceneProps`: `props.tripAt=2`, `props.impactAt=3.2`. Acerca la vista al antebrazo después del impacto. |
| `src/scenes/WoundHealing.tsx` | `props.healingFrom=0`, `props.healingTo=1`, `props.view='both'` (`section`/`surface`/`both`), y opciones de herida/visibilidad. Progreso lineal, llega al valor final en el último fotograma a 30 fps. |
| `src/compositions/previews.tsx` | Cinco composiciones a 1080×1920, 30 fps; controles Zod numéricos, selectores y booleanos. `previewCompositions()` se añade junto a `projectCompositions()` en `src/Root.tsx`; `src/index.tsx` solo registra Root. |

Los colores nuevos se encuentran en `theme.anatomy` en `src/styles/theme.ts`.

## Vistas previas

Ejecuta `npm run start`. Selecciona `Preview-ChildRig`, `Preview-SkinSection`, `Preview-ArmSurface`, `Preview-Cells` o `Preview-HealingTimeline`.

En la línea temporal, `animate=true` recorre `healingFrom=0` → `healingTo=1` en 20 s (600 fotogramas). Desactiva `animate` para usar el deslizador `healing`. `view='both'` comparte exactamente el mismo valor entre superficie y corte, y muestra el nombre leído del JSON.

Las piezas reciben `t` explícito: sus padres usan `useCurrentFrame()/fps`. No usan reloj real, animación CSS ni aleatoriedad variable.

```bash
npm run typecheck
npx remotion still src/index.tsx Preview-HealingTimeline output/previews/healing-0.35.png --frame=30 --props='{"animate":false,"healing":0.35}'
```

En el entorno de trabajo, si Node no puede consultar interfaces de red, el equivalente es:

```bash
node -r ./scripts/node-network-shim.cjs node_modules/@remotion/cli/remotion-cli.js still src/index.tsx Preview-HealingTimeline output/previews/healing-0.35.png --frame=30 --props='{"animate":false,"healing":0.35}'
```

## Pendiente de revisión

- REVISAR: confirmar rangos de días y descripciones con fuentes; no representan un reloj clínico ni una predicción para un paciente.
- REVISAR: geometría y distribución celular son esquemáticas, no medidas histológicas; la opción profunda solo cambia la representación geométrica.
- El personaje es una interpretación vectorial original, inspirada en proporciones infantiles, camiseta a rayas y rasgos generales de las referencias. No es una reproducción tridimensional ni una transferencia fotográfica del rostro.
- La biblioteca queda lista para usar en futuros `scenes.json`. No se crea un proyecto narrado sin audio.
