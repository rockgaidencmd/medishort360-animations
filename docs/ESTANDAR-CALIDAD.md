# Estándar de calidad de producción

Este es el estándar para nuevas producciones. La referencia visual es `Preview-MasterHealing`; la referencia de montaje con audio es `projects/cicatrizacion-herida/`. Una pieza existente no queda automáticamente aprobada para otro contenido clínico.

## REGLA DE GANCHO — todos los videos

Esta regla se aplica a todos los tipos de video y a sus recetas específicas.

- **0–3 s: impacto visual.** Mostrar un fenómeno o una complicación visible que enfermería reconozca, con una pregunta corta en pantalla. El gancho debe entenderse incluso sin sonido.
- **3–8 s: saludo y contexto.** Decir «¡Hola, hijos de Florence Nightingale!» después del gancho, sin detener la acción visual.
- Nunca abrir con «Hoy hablaremos de...».
- Después del saludo y contexto, desarrollar la explicación animada con zoom anatómico; al final, presentar los cuidados de enfermería y una conclusión que responda la pregunta inicial.
- Cada escena debe explicar algo nuevo.
- Todo texto de impacto, como «PRECIPITA», debe permanecer en pantalla el tiempo suficiente para leerse y estar respaldado por una fuente identificable. Registrar la referencia en el índice de afirmaciones del guion y, en Fase 2, en `facts.json`, vinculada a la escena mediante `factIds`.

## Formato y duración

- Vertical: 1080 × 1920, 30 fps. Objetivo de guion sin audio: 40 a 50 segundos.
- Con MP3, el audio manda aunque exceda cincuenta segundos: informar la diferencia y conservar la voz completa a velocidad original. No recortar ni acelerar para forzar la meta.
- El borrador puede salir a media resolución (540 × 960); las medidas de diseño y las capturas de tamaños se comprueban a 1080 × 1920. No presentar un borrador como render final.

## Tamaño y legibilidad

- El objeto principal ocupa al menos el 90 % del ancho de su zona útil.
- Mínimos de tipografía: títulos de fase 64 px, etiquetas 36 px, apoyo 30 px y cifras 72 px. Usar peso grueso, contorno o sombra sin tapar anatomía.
- Nada decorativo menor de 40 px. Evitar detalles minúsculos como explicación principal. Las partículas sutiles pueden ser grandes, suaves y poco opacas.
- Sin zonas vacías grandes: degradado, viñeta y partículas sutiles que acompañen la lectura.
- No confundir tamaño del SVG con tamaño de su dibujo: medir el cuerpo visible y considerar cualquier escala del padre. Un SVG de doscientos píxeles puede contener una célula mucho menor.

## Pantalla dividida cuando haya un proceso interno

| Zona | Contenido |
|---|---|
| y 0–820 | Vista externa, objeto grande y acercamiento a la zona |
| y 820–980 | Tarjeta de fase, contador, barra por etapas y porcentaje |
| y 980–1720 | Vista microscópica, zoom 6×–10×, ventana redondeada de casi todo el ancho; referencia interior actual: 992 px |
| y 1720–1920 | Reserva para subtítulos y marca; respetar márgenes de `src/styles/theme.ts` y evitar superposiciones |

Una lupa luminosa marca la zona externa y se conecta por dos líneas en cono con la ventana inferior. La lupa sigue la zona observada. Al cambiar de fase, cono y ventana destellan. Si no existe un mecanismo interno en la fuente, no inventar uno para rellenar esta distribución.

## Zoom y movimiento anatómico

- Zoom real: plano general → zona (2×–3×) → detalle (3×–4×) → macro. Para macro, cruzar a una escena con células u objetos dibujados grandes; escalar un dibujo pequeño no añade detalle.
- Sistema de planos: `src/motion/shots.ts`, con `from`, `to`, `zoom`, `focusX`, `focusY`, `ease` y `blurBackground`. `shotAt` devuelve valores: el consumidor debe aplicarlos; declarar la prop por sí solo no mueve ni desenfoca nada.
- Añadir parallax entre capas, respiración sutil y desenfoque del fondo cuando el foco pasa al objeto protagonista. Todo depende del fotograma.
- Rango de diseño macro: objetos de 80–260 px; para aprobar, la célula visible menor no puede ser de menos de 100 px. Por tanto, no entregar los diseños de 80–99 px. Preferir 120–260 px, como la biblioteca macro de referencia.
- Células u objetos recorren 50–300 px con inicio, acción y final visibles. Cada uno tiene etiqueta, flecha, estela y destello al completar su acción.
- Si una fase narrada dura más que la acción, ampliar el recorrido o mantener movimiento natural interno; no congelar el último fotograma ni repetir un evento clínico como si ocurriera de nuevo sin sustento.
- Sangre ilustrada, nunca gore. Estilo amable, didáctico y anatómicamente revisable. Para la caída del niño, representar un raspón superficial, no una cortada profunda.

## Avance y motion graphics

- Barra de progreso y porcentaje, contador pertinente a la fuente, textos de estado que cambian y checks por etapa; check grande al completar el proceso.
- Texto cinético con `spring` en palabras clave, tarjeta de fase animada, flechas, líneas guía que se dibujan, anillos de pulso, barridos y destellos.
- La palabra clave dispara la aparición o acción y su etiqueta. No mostrar células o resultados antes de nombrarlos, salvo el adelanto autorizado de hasta 0.15 s.
- Un porcentaje es avance narrativo ilustrativo; no presentarlo como una medida clínica real sin fuente. Los rangos de días tampoco son universales.

## Procedimientos con instrumento

La jeringa u otro instrumento protagonista ocupa al menos el 60 % de la pantalla. Dibujarlo a escala con marcas legibles. El valor aparece cuando se dice y procede de la fuente o de una indicación expresa del usuario. No deducir dosis, diluciones ni unidades ausentes.

## Técnica

- Solo SVG y código para nuevos materiales; sin emojis como texto y sin MP4 prerenderizados como escenas. El MP3 original sí se conserva.
- React/Remotion ya cubren los motion graphics. No añadir dependencias para resolver algo que puede hacer la biblioteca existente.
- Movimiento determinista con `useCurrentFrame()` y `fps`, o `t` derivado de ellos. Prohibidos `Math.random`, `Date.now`, animaciones CSS temporizadas, `setTimeout` y `requestAnimationFrame` como motores visuales. Usar semilla fija y `useMemo` cuando proceda.
- Colores desde `src/styles/theme.ts`. No introducir colores sueltos en piezas nuevas.
- Subtítulos palabra por palabra, con los tiempos reales del transcript. Reservar su zona sin tapar etiquetas.
- Toda escena de anatomía tiene movimiento interno; rótulos, zoom o fundidos solos no cuentan. Nada estático como sustituto de una animación.
- El código histórico conserva 3D, colores literales y la escena `Clip`; se inventaría tal como existe, pero no se replica ese patrón en un nuevo video ni se modifica un proyecto anterior sin encargo.

## Verificación con números

Para ocho a diez capturas de palabras clave, registrar palabra, tiempo de Whisper, inicio visual, fotograma real capturado, evento visible y coincidencia. Capturar el primer fotograma en o después de la palabra usando una tolerancia numérica mínima antes de `ceil`, para no añadir un fotograma por error de coma flotante.

Además, por captura, registrar zoom inferior aplicado, menor dimensión del cuerpo de la célula más pequeña y menor `font-size` efectivo tras escalas. Distinguir medidas SVG de altura rasterizada del glifo. No contar orgánulos como células independientes ni inventar números si no se pudieron medir.

**No está terminado** si el zoom inferior es menor que seis, la célula menor que cien píxeles o aparece una fuente menor que veintiocho píxeles. Pasar esos pisos no sustituye los objetivos de 64/36/30/72 px. En caída o cierre a pantalla completa, indicar «no aplica» para microscopio y células, con motivo.

La composición toma su duración de `transcript.durationSec`. Las escenas comienzan en cero, son contiguas y terminan exactamente allí. A fps fijo, el video se cuantiza a fotogramas: informar duración de audio, duración medida del MP4 y diferencia, sin prometer igualdad subfotograma. Comprobar padding del códec si la diferencia supera un fotograma.

Ejecutar `sync`, `validate`, `typecheck`, render de borrador y QA. Verificar pistas de voz, duración, fps, resolución, códecs, ausencia de negro y congelación; revisar capturas. La escucha fonética humana y la revisión clínica son verificaciones distintas del QA técnico. Si no se hicieron, decirlo. No abrir navegador ni Studio: usar `npx remotion still`.
