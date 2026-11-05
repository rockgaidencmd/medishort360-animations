# AGENTS.md — MediShort360 Animations

Este archivo lo leen Codex y Claude Code (`CLAUDE.md` solo contiene `@AGENTS.md`). Reemplaza al AGENTS.md anterior de estilo "cartoon plano": el estilo vigente es el de MediShort360 (anatomía 3D/SVG con degradados, ver `src/styles/theme.ts`).

## Objetivo
Videos verticales (1080x1920, 30 fps) de enfermería: el audio original define duración y acciones visuales. Todo se hace con CÓDIGO (Remotion + React + SVG + Three.js/R3F). Nada de diapositivas ni imágenes estáticas.

## Reglas inamovibles
- El audio original (ElevenLabs) se conserva. NO regenerar voz.
- NO contratar ni activar servicios de pago sin autorización.
- NO inventar contenido clínico. Si el audio no lo dice, no se dibuja como hecho. Dudas → `// REVISAR:` en el código y avisarme.
- Rótulos, zoom y fundidos NO cuentan como escena anatómica. Toda escena `anatomy` debe tener movimiento interno visible (flujo, deformación, articulación, cambio de color).
- Render determinista: todo movimiento depende de `useCurrentFrame()`. Prohibido `Math.random`, `Date.now`, animaciones CSS, `setTimeout`, `requestAnimationFrame`.
- Una dependencia nueva solo si resuelve una necesidad concreta, tiene licencia compatible, renderiza de forma determinista y funciona en el servidor. Se prueba primero con una escena corta.
- No copiar personajes, logos ni marcas de otros creadores.

## Flujo (en este orden, esperar mi aprobación en el paso 3)
1. `npx tsx scripts/new-project.ts <id> "<Título>"` y copiar el audio a `public/audio/<id>-original.mp3`.
2. `python3 scripts/transcribe.py <id>` → `projects/<id>/transcript.json` (revisar alineación y nombres de fármacos).
3. Proponer el plan de escenas (lista corta) y esperar aprobación.
4. Escribir `projects/<id>/scenes.json` y `facts.json`. Reutilizar componentes de `src/anatomy/` y `src/scenes/`; si falta uno, crearlo ahí (no dentro de la escena), registrarlo en `src/scenes/names.ts` y `src/scenes/registry.ts`.
5. `npx tsx scripts/sync-projects.ts` y `npx tsx scripts/validate.ts <id>` hasta que no haya errores.
6. `npm run render:draft -- <id>` (media resolución) → revisar conmigo.
7. `npm run render:final -- <id>` solo cuando yo lo pida. Exige datos médicos con fuente y revisor, y recursos aprobados.

## Formato de `scenes.json`
```json
{ "scenes": [{
  "id": "arteriola",
  "from": 14.28, "to": 23.04,
  "kind": "anatomy",
  "component": "Clip",
  "props": { "src": "renders/arteriole.mp4", "clipDurationSec": 8.76 },
  "action": "La arteriola se estrecha y los eritrocitos fluyen con más resistencia",
  "structures": ["arteriola", "endotelio", "eritrocitos"],
  "camera": "static", "cameraIntensity": 0.5,
  "label": "VASOCONSTRICCIÓN",
  "callout": "texto opcional",
  "transitionIn": 10,
  "factIds": ["f1", "f2"],
  "assetIds": ["webxr-hand"]
}]}
```
- Las escenas son contiguas: `from` = `to` de la anterior; la primera empieza en 0; la última termina en `transcript.durationSec`. Los fundidos se hacen con `transitionIn`, no con solapes.
- `kind`: `anatomy` | `environment` | `graphic` | `brand`. Al menos 40 % del video debe ser `anatomy`.
- `camera`: `static` | `push-in` | `pull-out` | `pan-left` | `pan-right` | `drift`. En escenas 3D en vivo usar `static` y mover la cámara de Three.js.
- Cada afirmación clínica del audio va en `facts.json` con `source` y, tras revisión, `reviewedBy` y `reviewedAt`. Una escena referencia sus datos en `factIds`.

## Estructura
```
projects/<id>/   manifest.json, transcript.json, scenes.json, facts.json
src/pipeline/    schema.ts (zod), load.ts, validate.ts
src/anatomy/     geometrías, materiales, rigs y deformaciones reutilizables (arteriola, eritrocito, mano…)
src/scenes/      componentes de escena (Clip, ShockMicrocirculation, Outro…) + names.ts + registry.ts
src/motion/      Camera, Captions (palabra por palabra), Overlays (rótulo, callout, marca)
src/compositions/ ProjectVideo (genérico, lee scenes.json) y projectCompositions
src/styles/      theme.ts (única fuente de colores y tipografía)
public/models/   modelos aprobados + assets.json (fuente, licencia, atribución, uso comercial, aprobador)
public/audio/    audio de trabajo (fuera de Git)   |   output/  MP4 y reportes (fuera de Git)
scripts/         transcribe.py, validate.ts, render.ts, qa.ts, new-project.ts, sync-projects.ts
```

## Recursos anatómicos y licencias
- Todo modelo en `public/models/` debe estar en `public/models/assets.json` con fuente, licencia y atribución. `validate` falla si falta.
- Nada con licencia no comercial entra a material comercial sin permiso (`commercialUse: false` bloquea el render).
- Arteriolas, eritrocitos y microcirculación requieren componentes propios revisados. Ninguna biblioteca garantiza anatomía perfecta.

## Estilo de trabajo
- Responder en español. Plan de escenas antes de escribir código. Iterar por escena, sin reescribir todo.
- Tras cada cambio: `npx tsc --noEmit` y `npx tsx scripts/validate.ts <id>`.
- El QA automático no sustituye mi revisión de anatomía y sincronía.

## MODO PRODUCCIÓN
### Fase 1 — sin audio
Si el usuario pide crear el guion sin archivo: redactar guion y eventos estimados, revisar fuentes y marcar datos pendientes, inventariar biblioteca y crear prototipos de piezas faltantes con capturas. Guardar en docs/guiones/<id>.md y rama video/<id>. No inventar audio ni transcripción. La petición explícita de piezas autoriza sus prototipos en esta fase. No renderizar video completo ni hacer merge. Tras recibir MP3, verificar sincronía y continuar el flujo de revisión previo.

### Fase 2 — audio recibido
Aplicar las indicaciones explícitas del usuario para esta fase: conservar MP3 original, transcribir con tiempos por palabra reales y revisar errores de reconocimiento. El audio define la duración y los disparadores de acción. No repartir palabras uniformemente ni inventar tiempos. Implementar el plan autorizado con componentes parametrizables, colores desde theme.ts y animación determinista. Ejecutar typecheck y validate; distinguir sus resultados de una revisión médica. Renderizar borrador, comprobar decodificación, revisar fotogramas y generar hoja de contacto con sus marcas reales. Informar escala esquemática, tamaños en resolución de diseño y tamaños tras reducción. Commit y publicación de rama cuando estén solicitados; nunca merge sin instrucción expresa.
