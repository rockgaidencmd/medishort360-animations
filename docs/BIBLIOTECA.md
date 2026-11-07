# Biblioteca de piezas existentes

Inventario obtenido de las exportaciones, props, imports, registro de escenas y proyectos del árbol heredado de `feat/anatomia-herida` en `44fa8e6`. Actualizar esta tabla cuando se añada o conecte una pieza. «Usado» significa una referencia local comprobada, no aprobación clínica ni certificación de calidad.

## Cómo elegir y reutilizar

- Priorizar SVG de cicatrización y el sistema de tiempo por palabra. Los tamaños finales se miden en la composición, no se deducen del nombre de una prop.
- Nueve escenas están registradas en `src/scenes/names.ts` y `src/scenes/registry.ts`: `Clip`, `ShockMicrocirculation`, `Outro`, `ChildFall`, `WoundHealing`, `PressureUlcer`, `HospitalRoom`, `CellSoul` y `StructureLabel`.
- Un componente anatómico no recibe necesariamente `SceneProps`. Para usarlo en `scenes.json`, crear/reutilizar una escena adaptadora y registrarla en ambos archivos; no pasar a ciegas el nombre de cualquier exportación.
- `src/scenes/types.ts` define `SceneProps`: `t` local en segundos, `durationSec` y `props`. En un proyecto con relojes globales, sumar el `timelineOffset` y considerar el redondeo del inicio de la secuencia.
- Hay componentes históricos 3D y piezas con colores literales o texto pequeño. Su presencia no demuestra cumplimiento del nuevo estándar. No modificar los proyectos antiguos para hacerlos pasar; adaptar el uso nuevo sin cambiar sus valores por defecto.

## Anatomía SVG y fisiología

| Pieza y archivo | Qué dibuja/hace | Props principales | Uso comprobado |
|---|---|---|---|
| `ChildRig` — `src/anatomy/ChildRig.tsx` | Niño articulado, marcha, tropiezo y caída | `state: walk/trip/fall`, `tripAt`, `impactAt`, `t`, `shake` | `ChildFall`, `Preview-ChildRig`, `Preview-MasterHealing`; proyecto `cicatrizacion-herida` |
| `childPose` — mismo archivo | Calcula pose y posición del antebrazo; no dibuja por sí solo | Mismos parámetros de pose | Cámara de `ChildFall` |
| `ArmSurface` — `src/anatomy/ArmSurface.tsx` | Antebrazo/mano, lesión, inflamación, costra y piel nueva | `healing`, `woundWidth`, `woundDepth: superficial/profunda`, `t` | `HealingView`, `MasterHealing`, `Preview-ArmSurface`, `cicatrizacion-herida` |
| `SkinSection` — `src/anatomy/SkinSection.tsx` | Corte de piel con capas, herida, vasos y células pequeñas | `healing`, `woundWidth`, `woundDepth`, `showCells`, `showLabels`, `t` | `HealingView`, `Preview-SkinSection`, `Preview-HealingTimeline`; no es la escena macro del montaje final |
| `MacroHealing` — `src/anatomy/MacroHealing.tsx` | Cuatro coreografías grandes: hemostasia, limpieza, reconstrucción y remodelación | `phaseIndex`, `local`, `t`, `zoom`, `eventTimes?`, `phaseEnd?` | `MasterHealing`, `WoundHealing` dividido y `cicatrizacion-herida` |
| `Arteriole` — `src/anatomy/Arteriole.tsx` | Corte longitudinal de arteriola, contracción y eritrocitos en flujo | `frame`, `constrict` | Sin import consumidor detectado en el árbol actual; no atribuirlo al video activo por su nombre |
| `HandAnatomy` — `src/anatomy/Hand.tsx` | Mano dorsal ilustrada con capas de cianosis | `x`, `y`, `scale`, `cyanosis` | Sin import consumidor detectado en el árbol actual |
| `SkinLayers` — `src/anatomy/SkinLayers.tsx` | Epidermis, dermis, tejido subcutáneo y flujo capilar | `frame` | Sin import consumidor detectado en el árbol actual |

`MacroHealing` tiene `Cell`, `Tag`, `Arrow` y `Spark` **privados**, no exportados. Para reutilizar su actuación se usa la escena macro completa; no asumir que esos nombres se importan desde el módulo. En modo con audio, cada actor y etiqueta tiene su propia puerta temporal. Sus valores mínimos de cuerpo celular por fase están en `MACRO_MIN_CELL_PX`.

### Nueve piezas celulares y de tejido

Todas las siguientes se exportan de **`src/anatomy/Cells.tsx`**. Contrato común: `size`, `t`, `seed`; valores por defecto `50`, `0`, `1`. `size` es tamaño del lienzo SVG, no la medida garantizada del cuerpo. Los exports se agrupan en `cellComponents` con los nombres del JSON. Uso comprobado: `SkinSection`, `Preview-Cells` y las vistas simples de sanación. La escena `MacroHealing` usa sus propios actores grandes, no importa estos nueve componentes.

| Pieza | Qué representa | Clave de `cellComponents` | Props y uso |
|---|---|---|---|
| `Platelet` | Plaqueta esquemática | `plaquetas` | `size/t/seed`; fase de hemostasia en el corte y preview |
| `FibrinMesh` | Malla de fibrina | `fibrina` | `size/t/seed`; hemostasia y preview |
| `RedBloodCell` | Eritrocito bicóncavo ilustrado | `eritrocitos` | `size/t/seed`; hemostasia y preview |
| `Neutrophil` | Neutrófilo con núcleo lobulado | `neutrofilos` | `size/t/seed`; inflamación y preview |
| `Macrophage` | Macrófago esquemático | `macrofagos` | `size/t/seed`; inflamación y preview |
| `Fibroblast` | Fibroblasto fusiforme | `fibroblastos` | `size/t/seed`; proliferación y preview |
| `CollagenFibers` | Fibras de colágeno | `colageno` | `size/t/seed`; proliferación/remodelación y preview |
| `NewCapillary` | Asa de capilar nuevo con flujo | `capilares_nuevos` | `size/t/seed`; proliferación y preview |
| `Keratinocyte` | Queratinocito | `queratinocitos` | `size/t/seed`; proliferación y preview |

### Datos y utilidades de sanación

| Archivo/exportación | Función | Parámetros | Uso |
|---|---|---|---|
| `src/anatomy/data/healing-phases.json` | Nombres, límites de healing, días, participantes y descripciones | `healingDesde/Hasta`, `dayFrom/To`, `celulas`, `superficie`, `corte` | `SkinSection`, `HealingView`, `MacroHealing`, `MasterHealing` |
| `src/anatomy/healing.ts`: `phaseAt` | Elige fase desde el JSON | `healing` | Corte y vistas de sanación |
| Mismo archivo: `clamp`, `smooth` | Límites numéricos y progresión suave | `v/lo/hi`; `a/b/v` | Anatomía, caída y cámara |
| Mismo archivo: `sample` | Muestreo determinista sin estado | `seed`, `index` | Piezas celulares, distribución y fondo |
| Mismo archivo: `WoundDepth` | Tipo `superficial` o `profunda`; no dibuja | Tipo de profundidad | Props de brazo/corte |

El JSON conserva `fuentes: null`, `revisar: true`: no usar sus tiempos o afirmaciones como fuente médica aprobada. Para la caída elegir el raspón superficial; que exista la opción profunda no autoriza usarla.

## Anatomía 3D histórica

Estas piezas usan Three.js/R3F y, algunas, GLB. Son referencias existentes; la nueva producción solicitada es SVG/código, sin clips prerenderizados.

| Pieza y archivo | Qué dibuja/hace | Props principales | Uso comprobado |
|---|---|---|---|
| `PerfusedHand3D` — `src/anatomy/PerfusedHand3D.tsx` | Mano GLB, antebrazo, color distal, moteado y blanqueamiento | `time`, `distalTone`, `mottling`, `blanch`, `onReady` | `HandPerfusion3DProof`, `NursingReview`, mano de `ICUPatient3D`, revisiones de vasopresores |
| `createErythrocyteGeometry` — `src/anatomy/Erythrocyte3D.tsx` | Geometría de disco bicóncavo por revolución | Sin argumentos; devuelve geometría | `Arteriole3DProof`, usado por `Vasopresores3DReview` |
| `wallGeometry` — `src/anatomy/VesselWall3D.tsx` | Geometría de pared vascular con corte abierto | `inner`, `outer` | `Wall` |
| `Wall` — mismo archivo | Malla y material de una capa de pared | `inner`, `outer`, `color` | `Arteriole3DProof` y revisión de vasopresores |

Las superficies no son anatomía clínica validada por ser modelos tridimensionales. Comprobar `public/models/assets.json`, `manifest.json` y las licencias; no cambiar `approvedBy` sin revisión.

## Escenas

| Escena y archivo | Qué hace | Props principales dentro de `props` | Uso comprobado/estado |
|---|---|---|---|
| `ChildFall` — `src/scenes/ChildFall.tsx` | Caída con zoom al antebrazo tras el impacto | `tripAt`, `impactAt` | Registrada; escena `caida` de `cicatrizacion-herida` |
| `WoundHealing` — `src/scenes/WoundHealing.tsx` | Sanación externa, corte o montaje dividido | `view: section/surface/both/split`, `healingFrom/To`; herida/visibilidad en modos simples; en split, controles de `MasterHealing` | Registrada; escena `cicatrizacion` del proyecto narrado |
| `HealingView` — mismo archivo | Composición simple de brazo y/o corte | `healing`, `view: section/surface/both`, `woundWidth`, `woundDepth`, `showCells`, `showLabels`, `t` | `Preview-HealingTimeline` y modos simples de `WoundHealing`; no se selecciona directamente en el registro |
| `ShockMicrocirculation` — `src/scenes/ShockMicrocirculation.tsx` | Tejido y trayectorias de flujo heterogéneo | `title`, `caption`, `note`; `t` de `SceneProps` | Registrada; `projects/vasopresores/scenes.json` |
| `Outro` — `src/scenes/Outro.tsx` | Cierre SVG con partículas, anillos, curva y marca | `brand`, `tagline`; `t` local | Registrada; cierres de `cicatrizacion-herida` y `vasopresores` |
| `Clip` — `src/scenes/Clip.tsx` | Reproduce MP4 externo silenciado y ajusta velocidad | `src`, `clipDurationSec`, `durationSec` | Registrada e histórica; usada por `vasopresores`. No usar para nuevos videos bajo el estándar SVG/código |
| `ICUPatient3D` — `src/scenes/ICUPatient3D.tsx` | Paciente 3D con respiración, parpadeo y superficies de cabeza/pies/mano | `time`, `onSurfaces`, `onHand` | No registrada como `SceneProps`; usada en `ICUOpening3DProof` y `ICUInfusionBridge` |
| `ICUEquipment3D` — `src/scenes/ICUEquipment3D.tsx` | Monitor con tres trazos, soporte, bolsa, bomba, tubo y flujo | Solo `time`; posiciones y diseños integrados | No registrada como `SceneProps`; usada en `ICUOpening3DProof`/`ICUInfusionBridge`, revisión de vasopresores |

`ICUEquipment3D` contiene el helper privado `Tube` (`curve`, `radius`, `color`). La bolsa, bomba y monitor son partes del conjunto, no exports independientes con sus propias escalas, unidades o cifras. No contarlos como instrumentos SVG listos para un procedimiento. El paciente contiene helpers privados de superficie/manta, tampoco escenas autónomas.

No confundir la escena registrada `ShockMicrocirculation` con un componente local del mismo nombre dentro de `Vasopresores3DReview.tsx`.

## Movimiento y rotulación

| Pieza/archivo | Qué hace | Props o entradas | Uso comprobado |
|---|---|---|---|
| `Camera` — `src/motion/Camera.tsx` | Cámara 2D determinista: static, push-in, pull-out, pan-left, pan-right, drift | `type`, `intensity`, `lengthFrames`, `children` | `ProjectVideo`, por escena; `static` cuando la escena controla su cámara |
| `Shot`, `shotAt` — `src/motion/shots.ts` | Describe planos e interpola zoom, foco y desenfoque | `t`, lista de `{from,to,zoom,focusX,focusY,ease,blurBackground}` | `MasterHealing`; los campos calculados necesitan aplicación por el consumidor |
| `Captions` — `src/motion/Captions.tsx` | Subtítulos con palabra activa y animación | `transcript`, `wordByWord`, `bottom` | `ProjectVideo`; modo de palabra única activado en `cicatrizacion-herida` |
| `buildChunks` — mismo archivo | Agrupa hasta cuatro palabras o usa frase si faltan palabras | `transcript` | Modo histórico de `Captions`; no inventa tiempos ausentes |
| `LabelBar` — `src/motion/Overlays.tsx` | Barra de título con entrada spring | `text`, `frame` | Capas de `ProjectVideo`, salvo `internalLabel` |
| `Callout` — mismo archivo | Tarjeta de apoyo con entrada | `text`, `frame` | Escenas que declaran `callout` |
| `Watermark` — mismo archivo | Marca superpuesta | `text` | `ProjectVideo`, salvo que `internalBrand` indique marca integrada |
| `clamp` — `src/motion/util.ts` | Opciones de extrapolación para `interpolate`; no es la función numérica de `anatomy/healing.ts` | Objeto `extrapolateLeft/Right` | Cámara, subtítulos y cierres |

Los tamaños históricos de `Overlays`/`Preview-Cells` pueden ser menores que el estándar nuevo. La tipografía de referencia está en `theme.master` de `src/styles/theme.ts`. No rebajar un título grande para que quepa: reorganizar la distribución.

## Composiciones y cableado de referencia

- `src/compositions/MasterHealing.tsx`: `MasterHealing`, `MasterHealingView`, `masterHealingAt`, `masterSchema`, `masterDefaults`. Props: `appearAt`, `tripAt`, `impactAt`, `splitAt`, `healingAt`, `healedAt`, `closeAt`, `healingFrom`, `healingTo`, `zoomTop`, `zoomBottom`, `showDayCounter`; modo por audio añade `eventTimes` y `timelineOffset`. `masterSchema` expone los controles del preview; los relojes del proyecto provienen del generador, no de editar esos controles a mano.
- `src/compositions/ProjectVideo.tsx`: arma secuencias, audio y subtítulos. Props de control en la primera escena: `wordCaptions`, `captionBottom`, `internalBrand`; cada escena puede declarar `internalLabel` para evitar duplicar su tarjeta. La escena dividida conserva el reloj absoluto mediante `timelineOffset`.
- `src/compositions/projectCompositions.tsx`: duración desde `ceil(transcript.durationSec × fps)`; no asumir duración de un preview como duración del audio.
- `src/compositions/previews.tsx`: `Preview-ChildRig`, `Preview-SkinSection`, `Preview-ArmSurface`, `Preview-Cells`, `Preview-HealingTimeline`. Son pruebas de piezas, no todas cumplen los tamaños del master actual.
- `src/Root.tsx`: registra `Preview-MasterHealing` (45 s) y proyectos, además de composiciones históricas de vasopresores. El proyecto narrado `cicatrizacion-herida` dura lo medido en su transcript, no cuarenta y cinco segundos.
- Capturas de referencia: `output/previews/master-*.png` y `output/previews/audio-*.png`. La prueba actual está en `projects/cicatrizacion-herida/sync-proof.md` y `sync-captures.json`.
- Generadores específicos de cicatrización: `scripts/map-cicatrizacion-events.mjs`, `build-cicatrizacion-project.mjs`, `capture-cicatrizacion-sync.mjs` y `check-cicatrizacion-sync.ts`. Reutilizar su patrón de búsqueda/validación; contienen rutas y claves de este tema y deben parametrizarse antes de usarlos para otro.

## Piezas pendientes para temas probables

| Pieza | Estado real y trabajo que falta |
|---|---|
| Jeringa de insulina | No se encontró un componente dedicado. Crear SVG parametrizable con escala/marcas legibles y valores sustentados; no deducir equivalencias de una jeringa genérica |
| Bolsa de infusión | Existe solo como parte del conjunto `ICUEquipment3D`; falta una pieza SVG independiente, grande, con controles de volumen, nivel, gotas y tiempos según la fuente |
| Monitor de signos vitales | Existe un monitor de trazos dentro de `ICUEquipment3D`; falta SVG independiente con parámetros y cifras sincronizadas, sin inventar lecturas |
| Riñón | No se encontró pieza dedicada. Crear vista externa y mecanismo interno solo para el tema documentado |
| Pulmón | No se encontró pieza dedicada. Crear geometría/actuación parametrizable y revisión anatómica |
| Corazón | No se encontró pieza dedicada. Los trazos de monitor no equivalen a una pieza de corazón; falta órgano y actuación revisable |

## Úlcera por presión — piezas SVG iniciales (v1)

Proyecto: `projects/ulcera-por-presion/`; escena registrada `PressureUlcer` en `src/scenes/PressureUlcer.tsx`, `names.ts` y `registry.ts`. Sus eventos proceden de `events.json`, generado desde palabras reales por `scripts/build-ulcera.py`. No es un generador universal ni una aprobación clínica.

Todas las piezas siguientes se exportan de `src/anatomy/PressureTissue.tsx`; se integran mediante la escena adaptadora `PressureUlcer`, no se registran directamente como si aceptaran `SceneProps`.

| Pieza | Parámetros y actuación |
|---|---|
| `BodyOnBed` | `t`, `pressure`, `turn`: paciente de lado, cama, puntos de apoyo |
| `PressureForce` | `t`, `pressure`: peso y flechas opuestas |
| `TissueCrossSection` | `t`, `pressure`, `damage`: piel, grasa, músculo, hueso y deformación; sustituto específico porque `SkinSection` representa cicatrización y carece de este mecanismo óseo |
| `CapillaryCompression` | `t`, `pressure`, `flowTime`: lumen comprimido y eritrocitos; reutiliza `RedBloodCell` de `Cells.tsx` |
| `OxygenParticles` | `t`, `loss`: desaparición de aportes antes de alcanzar células |
| `CellDeath` | `t`, `damage`, `necrosis`, `recovery`: lesión, oscurecimiento y células viables separadas; no recupera células necróticas |
| `NecrosisZone` | `t`, `growth`: mancha esquemática; export disponible, no consumido por este montaje (la zona se integra en el corte) |
| `BlanchTest` | `t`, `redness`, `press`, `showFinger`: piel roja persistente y presión del dedo |
| `BlisterWound` | `open`, `dark`, `blister`: herida esquemática; en este audio `blister=0`, porque no dice ampolla |
| `PatientTurn` | `t`, `pressure`, `turn`: giro y almohada con descarga |
| `TimeClock` | `t`, `progress`: reloj de avance conceptual sin cifras; no existía en el inventario previo |

Reutiliza `shotAt`, `RedBloodCell`, `Outro`, `Captions` y `Watermark`. El cierre usa `Outro` sin eslogan ni marca central, manteniendo la marca fija externa. Los nuevos tamaños opcionales de `Captions` y `Watermark` conservan los defaults antiguos. Capturas y mediciones: `projects/ulcera-por-presion/capture-report.json`, `verification.md`, `output/previews/hoja-contacto.png`. El zoom ocho corresponde al espacio macro normalizado y debe contrastarse con el tamaño final del cuerpo; no es una escala histológica certificada.

## Úlcera por presión — revisión v2

La escena registrada `PressureUlcer` usa ahora `src/scenes/PressureUlcerV2.tsx`. La implementación v1 se conserva como referencia; los tiempos correctos del transcript y `events.json` no se alteran. `scripts/prepare-ulcera-v2.py` añade anclas reales y configura la escena con `events-v2.json`.

| Pieza nueva | Archivo / contrato | Uso real |
|---|---|---|
| `HospitalRoom` / `HospitalRoomArt` | `src/scenes/PressureUlcerV2Parts.tsx`; adaptador `SceneProps` registrado y vista SVG parametrizable (`site: sacro/talon`, `pressure`, `turn`, `backgroundBlur`) | Habitación, cama, paciente, monitor sin cifras, suero y paralaje; apertura con cámara aplicada y fondo desenfocado |
| `CellSoul` / `CellSoulArt` | Mismo archivo; adaptador registrado y vista con `t/from/to` | Metáfora pedida: tres siluetas que se desprenden, ascienden y llegan a una nube; cuerpos muertos permanecen en su sitio |
| `StructureLabel` / `StructureLabelArt` | Mismo archivo; adaptador registrado y vista con texto, coordenadas, punto objetivo, inicio, color y fuente | Nombres a cuarenta píxeles con punto, guía trazada y anillo; máximo cuatro etiquetas simultáneas |

`CellDeath` admite `large`, `volume` y `nucleusLoss`: macro con nueve células (tres muertas y seis viables) y supresión del núcleo al morir. Conserva los valores por defecto anteriores. `TissueCrossSection` y `CapillaryCompression` admiten volumen opcional con degradados y brillo. `Captions` añade `highContrast` opcional: blanco, contorno oscuro y opacidad completa sin alterar los defaults antiguos.

Un solo valor `pressure` gobierna giro, almohada, flechas, lumen, flujo y recuperación del tejido viable. La necrosis no se revierte. La ampolla y los iconos de evolución se muestran por la petición expresa de v2, anclados a «Si la presión continúa»/«oscurece»; no se atribuye al MP3 la palabra ampolla ni se considera una progresión universal.

Hoja: `output/previews/hoja-contacto-v2.png`, veinte fotogramas reales. Diagnóstico y tamaños: `projects/ulcera-por-presion/verification-v2.md` y `capture-report-v2.json`. No inventar marcas temporales para títulos de escena que no se pronuncian.
