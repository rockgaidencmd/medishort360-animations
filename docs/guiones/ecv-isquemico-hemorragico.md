# ECV isquémico vs hemorrágico — Fase 1
Versión vigente: reemplaza propuestas anteriores del mismo video. Sin audio, sin render final, sin merge.

## Guion para ElevenLabs
¡Hola, hijos de Florence Nightingale! El cerebro necesita recibir sangre constantemente. Comparemos un vaso tapado con uno roto. En el isquémico, un trombo se forma en una arteria cerebral o un émbolo llega y la obstruye. Disminuye el flujo hacia el tejido. Sin oxígeno ni energía, las neuronas dejan de funcionar. Aparece una zona dañada y otra en riesgo, potencialmente recuperable. El daño puede avanzar. En el hemorrágico, un vaso se rompe. La sangre sale al tejido cerebral o al espacio subaracnoideo. Dentro del tejido puede formar un hematoma que comprime estructuras. El sangrado puede elevar la presión intracraneal y comprometer la perfusión. Uno obstruye; el otro sangra. Pueden producir signos parecidos. La neuroimagen permite diferenciarlos; el manejo depende del tipo. En UCI, reconoce cambios repentinos en cara, brazo o habla. El tiempo es cerebro. Valora conciencia, pupilas y fuerza. Vigila respiración, oxigenación y presión arterial. Comunica inmediatamente cualquier deterioro al equipo responsable. Registra cuándo estuvo bien por última vez. Reconocer, comunicar y vigilar protege el cerebro. Síguenos en MediShort360.

170 palabras; 85 segundos a dos palabras por segundo, sin contar pausas. Objetivo real: 90–100 s. Los tiempos son estimaciones, NO alineación de audio.

## Eventos visuales
| Segundo estimado | Qué se ve | Frase | Palabras |
|---|---|---|---|
| 0–9 | UCI → cerebro; doble conflicto | ¡Hola, hijos de Florence Nightingale! El cerebro necesita recibir sangre constantemente. Comparemos un vaso tapado con uno roto. | 18 |
| 9–18 | Carótida interna → cerebral media; trombo local | En el isquémico, un trombo se forma en una arteria cerebral o un émbolo llega y la obstruye. | 18 |
| 18–25.5 | Lupa vascular; flujo detenido; tejido pálido | Disminuye el flujo hacia el tejido. Sin oxígeno ni energía, las neuronas dejan de funcionar. | 15 |
| 25.5–32.5 | Núcleo gris violáceo y penumbra ámbar | Aparece una zona dañada y otra en riesgo, potencialmente recuperable. El daño puede avanzar. | 14 |
| 32.5–41 | Vaso roto; extravasación | En el hemorrágico, un vaso se rompe. La sangre sale al tejido cerebral o al espacio subaracnoideo. | 17 |
| 41–51.5 | Hematoma intraparenquimatoso; desplazamiento | Dentro del tejido puede formar un hematoma que comprime estructuras. El sangrado puede elevar la presión intracraneal y comprometer la perfusión. | 21 |
| 51.5–60.5 | Comparación vertical; filas con spring | Uno obstruye; el otro sangra. Pueden producir signos parecidos. La neuroimagen permite diferenciarlos; el manejo depende del tipo. | 18 |
| 60.5–67.5 | UCI; cara asimétrica, brazo que cae, habla alterada | En UCI, reconoce cambios repentinos en cara, brazo o habla. El tiempo es cerebro. | 14 |
| 67.5–76.5 | Enfermería valora pupilas y conciencia; monitor | Valora conciencia, pupilas y fuerza. Vigila respiración, oxigenación y presión arterial. Comunica inmediatamente cualquier deterioro al equipo responsable. | 18 |
| 76.5–85 | Reloj sin cifras; enfermería comunica; cierre | Registra cuándo estuvo bien por última vez. Reconocer, comunicar y vigilar protege el cerebro. Síguenos en MediShort360. | 17 |

Los bloques de dieciocho y veinticuatro palabras se subdividen visualmente a los ocho segundos; ningún visual principal supera diez segundos. Subdividir el hematoma en formación y compresión. El primer fotograma ya muestra obstrucción y extravasación en una ventana anatómica sobre la UCI. El saludo no retrasa el conflicto.

## Dirección visual
UCI coherente con cama, paciente, monitor ECG, bomba y enfermería. Paleta marfil, petróleo, turquesa y cálidos; evitar fondo azul uniforme. Zoom hacia cerebro, hemisferios, carótida interna y cerebral media. Arterias rojas; venas azules; hematoma rojo oscuro; penumbra ámbar y núcleo gris violáceo. Los cambios de color son convenciones didácticas, no apariencia real ni diagnóstico por color. No animar una arteriola como si fuera la cerebral media.
Arriba cerebro y abajo sección vascular ampliada; lupa y cono conectan ambos. Ampliación visual aproximada 6–10x, no escala anatómica calibrada. Células 80–260 px, proporciones no literales. Eritrocitos upstream se frenan sin atravesar la oclusión; no representar un atasco de eritrocitos como origen del trombo. Trombo local; émbolo en tránsito. Rotura localizada, extravasación pulsátil estilizada y colección con efecto de masa; la HSA se muestra por separado alrededor del cerebro, sin hematoma intraparenquimatoso obligatorio.
Etiquetas ≥36 px; líneas se dibujan al nombrar la estructura. Las denominaciones largas que no están en la locución son etiquetas de orientación, no sincronía verbal inventada. Comparación superior isquémico/inferior hemorrágico; filas causa, mecanismo y esquema anatómico (no simular una TC diagnóstica). Texto cinético, tarjetas, pulso, barridos y progreso deterministas. Reloj sin cifras ni relación lineal con muerte neuronal. La penumbra no se pierde a una velocidad universal.
Subtítulos palabra por palabra usando Captions DESPUÉS de recibir el MP3 y verificar sus tiempos. No inventar transcript ni voz. Vista previa de piezas sin audio: no equivale a video terminado.

## Piezas
Reutilizar Camera, Captions, Overlays/Outro y equipo/paciente UCI existentes. MicroperfusionLens sirve de referencia de composición, pero su capilar no sustituye arterias cerebrales. Erythrocyte3D y VesselWall3D disponibles para integración posterior; no afirmar que ya se integraron. Brain, CerebralArteries, Clot, Hematoma, VesselSection, TimeClock, ComparisonTable y SignIcons: prototipos SVG parametrizables en src/anatomy/ECV.tsx; escena ECVPreview registrada. Capturas en output/previews/ecv-*.png. Las piezas requieren revisión anatómica antes de producción definitiva.

## Datos a confirmar
[REVISAR] Neuroimagen y ruta local de diferenciación; no añadir decisiones terapéuticas sin revisión.
[REVISAR] Escala y frecuencia de valoración neurológica, objetivos y umbrales de presión/oxigenación, responsables y activación de código ictus, registro de última vez conocido sano: contrastar con protocolo UCI. No hay cifras ni dosis en la narración.
[REVISAR] Si se añaden reperfusión, ventanas, fármacos o reversión: confirmar elegibilidad, contraindicaciones y protocolo con la guía específica. No tratar isquemia y hemorragia como si compartieran tratamiento.
Cara/brazo/habla son ejemplos, no lista exhaustiva. En paciente sedado/intubado la exploración debe adaptarse; no representar evaluación del habla en intubación. La zona recuperable no garantiza recuperación y la presión intracraneal no sube en toda hemorragia.

## Fuentes que consultar
- AHA/ASA, isquémico 2026: https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke
- AHA/ASA, hemorragia intracerebral 2022: https://professional.heart.org/en/science-news/2022-guideline-for-the-management-of-patients-with-spontaneous-intracerebral-hemorrhage
- AHA/ASA, HSA aneurismática 2023: https://professional.heart.org/en/science-news/2023-guideline-for-the-management-of-patients-with-aneurysmal-subarachnoid-hemorrhage
- Protocolo vigente de código ictus y vigilancia neurológica de la institución: pendiente de proporcionar.

## Verificación de Fase 1
TypeScript: correcto. Tres PNG de piezas renderizados e inspeccionados; se corrigieron título sin contraste y tabla desbordada. No se ha producido el escenario UCI completo ni sincronía final. El validador de producción no pasa en esta fase: falta projects/ecv-isquemico-hemorragico/manifest.json y audio/transcript real; no se simulan esos archivos para fingir validación. Los PNG son inspección de componentes, no storyboard final.

## Continuación autorizada
Video de revisión sin voz: 92 s, once bloques de 8–9 s, 540×960, 30 fps, H.264. Entrada de render src/ecv-preview.tsx, composición ECV-Film. UCI SVG con cama, monitor animado, bomba, paciente con respiración y valoración; comparación vertical, HSA separada de hematoma. No contiene la palabra «prototipo» en pantalla. La locución, subtítulos temporizados y exportación final 1080×1920 quedan pendientes del audio. Esta revisión esquemática no equivale todavía a la calidad anatómica final solicitada.

## Audio recibido y rediseño — versión vigente
Audio original ElevenLabs: 85,472625 s, copiado sin regenerar ni estirar. La transcripción de Fase 2 en projects/ecv-isquemico-hemorragico/transcript.json sustituye TODOS los tiempos estimados de este documento. Se han corregido en el reconocimiento «subaracnoideo» y «un hematoma» conforme al texto aportado, conservando los tiempos y la confianza de Whisper. No se presenta el texto previo de Fase 1 como versión del audio recibido.

Plan autorizado: gancho cerebral grande; lupa a tejido con trombo local y émbolo alternativo; detención de eritrocitos; pérdida de actividad neuronal; gris y ámbar; rotura, extravasación y compresión; corte subaracnoideo; comparación lateral animada; cara/brazo/habla; valoración y vigilancia; comunicación; reloj y cierre. El JSON de escenas detalla acciones y límites reales. Capturas, escala y pendientes: docs/ecv-audio-qa.md.
