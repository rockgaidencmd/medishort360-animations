# Lecciones de producción

Memoria operativa del repositorio. Consultar antes de cada video y actualizar al terminar con evidencia del proyecto; no depender del historial de chats. Una observación de una máquina o voz no se presenta como garantía universal.

## Lecciones permanentes

1. **El audio manda.** Los tiempos salen de `transcript.json`. Una diferencia con el guion se registra; la voz no se regenera, acelera ni recorta para sostener un plan anterior.
2. **Escalar un dibujo pequeño no es zoom anatómico.** Cruzar a una escena macro con elementos grandes y detalle propio. Declarar `zoom` sin aplicarlo no prueba nada.
3. **Los movimientos pequeños no se perciben en el celular.** Preferir trayectorias de cincuenta a trescientos píxeles, inicio/acción/final claros, flechas y destellos.
4. **Los emojis como texto fallan en el servidor de render.** Dibujar checks, íconos y marcas con SVG.
5. **La voz actual ronda dos palabras por segundo.** Planificar ochenta y cinco a cien palabras. La calibración aportada por el usuario fue ciento ocho palabras en cincuenta y uno coma seis segundos. No seguir usando dos coma cinco como supuesto para esta voz.
6. **El navegador de Codex falla en este entorno.** Verificar con `npx remotion still`; no abrir navegador ni Studio como paso de producción.
7. **La herida de la caída se representa como raspón o abrasión superficial.** No dibujar una cortada profunda como sustituto. Confirmar con la fuente el caso concreto antes de añadir otro tipo de lesión.

## Observación sobre el gancho

El video de vasopresores abrió con un fenómeno visible y funcionó mejor que el de anfotericina, que abrió con un saludo y 'Hoy hablaremos de...'. Es una hipótesis, no una conclusión.

## Evidencia del proyecto de cicatrización

- `projects/cicatrizacion-herida/audio-metadata.json`: MP3 original de **54.752625 s**. Whisper produjo **54.753 s**, redondeado a milisegundos, y ciento once tokens con tiempo; el guion escrito contaba la marca como una sola palabra. No confundir estos conteos ni sustituirlos por la calibración anterior del usuario.
- La meta inicial de cuarenta y cinco segundos no predijo la duración real. La narración final conservó frases más largas y expresiones distintas a la referencia. Ver `audio-vs-reference.md`.
- `transcript.whisper-original.json` conserva el ASR. Se corrigieron «Hemostacia», «keratinocitos» y «alinia» sin mover ningún `start`/`end`. Ver `transcript-corrections.json`.
- `scripts/map-cicatrizacion-events.mjs` obtiene veintiséis eventos por búsqueda de palabras/frases reales. No sustituye una frase ausente por un tiempo supuesto. El evento «costra cae» usa la frase real «costra se desprende».
- `scripts/check-cicatrizacion-sync.ts` comprueba conservación de tiempos, huella del transcript, adelantos, continuidad de escenas y progreso monotónico. El mayor adelanto visual efectivo medido fue **0.106667 s**, dentro del máximo de 0.15 s.
- El último borrador mide **54.766667 s** a treinta fps; diferencia de **0.014042 s** frente al MP3. No prometer igualdad subfotograma a fps fijo. Revisar también el padding AAC: medir contenedor y pistas, no solo el número de frames.
- Las diez capturas de `sync-captures.json` prueban el **inicio** de las acciones, no que una acción entera termine en la primera sílaba. Capturar en el primer frame en o después de la palabra; evitar `ceil` incorrecto por coma flotante.
- Alinear todas las fases con una sola escala temporal no basta: plaquetas, fibrina y glóbulos pueden nombrarse en un orden distinto al de una coreografía anterior. Cada actor y etiqueta necesita su propia puerta temporal; las fases usan sus límites de palabra reales.
- Un `strokeDasharray` mayor que la longitud del trazo puede ocultar el brote aunque el reloj ya haya empezado. En modo por audio se normalizó el trazado con `pathLength` y un primer tramo visible; ver `MacroHealing.tsx`. No adelantar la etiqueta sin que empiece la acción.
- El contador y «Remodelación» desbordaban juntos la tarjeta. Mover el contador grande a su propia zona resolvió el problema sin reducir letras. Revisar textos más largos, no solo la fase con nombre corto.
- Mantener el brillo húmedo de la herida al sincronizar cambios de color. Cambiar un reloj no debe degradar el dibujo aprobado.
- Una captura de control de `Preview-MasterHealing` a doce segundos coincidió byte por byte tras la adaptación. Ver `visual-regression.json`; es una comprobación concreta, no una prueba de todos los fotogramas de todos los videos.
- Whisper da alineación automática del audio real; no equivale a una escucha fonética humana ni a aprobación clínica. Mantener esos pendientes explícitos.

## Entorno y herramientas

- Se necesita Node LTS **completo con npm**; el Node integrado puede carecer de npm. Comprobar ejecutables y versiones, y usar `npm.cmd`/rutas completas en Windows si hace falta. Obtener Node de la fuente oficial; no desactivar protecciones de Windows ni inventar un éxito de instalación.
- La transcripción usa Faster-Whisper local. Si no se puede obtener/cargar un modelo, guardar el error completo y detener el trabajo que requiere tiempos. No fabricar `transcript.json`, no repartir palabras de forma uniforme ni usar el guion como si fuese ASR.
- El entry real es `src/index.tsx`. `render.ts` permite `render-options.json` por proyecto; no asumir que su fallback histórico `src/index.ts` existe.
- En cicatrización, JPEG condujo a MP4 `yuvj420p` y QA falló. La normalización a `yuv420p` y rango limitado quedó activada solo en `projects/cicatrizacion-herida/render-options.json`; el script conserva el render anterior y copia AAC sin recodificar. La orden completa `render:draft` acabó con QA aprobado. No asumir que la corrección está activada para otro id: revisar configuración y rutas del helper.
- El registro global de modelos bloqueó la validación aunque el nuevo video era SVG. Se añadieron las rutas reales a `assets.json` solo después de contrastar SHA-256 con `public/models/manifest.json` y las licencias ya conservadas. No inventar procedencia ni aprobar un recurso por haberlo encontrado en disco.
- El MP3 permanece local, bajo `public/audio/`, excluido de Git. Confirmar el hash de la copia. Las capturas necesarias también están ignoradas por defecto en `output/`: añadir **solo las seleccionadas** con `git add -f -- <archivos>`, sin publicar accidentalmente todos los medios.
- `npm run qa` necesita id y modo de borrador: `npm run qa -- <id> --draft`. El renderer también llama QA. No interpretar la falta de argumentos como fallo de la animación.
- `npm run new` no sobrescribe un proyecto existente. Si el id ya existe, revisar su manifiesto, audio y rama, y continuar el mismo proyecto sin recrearlo ni borrar versiones.
- Los scripts `map-cicatrizacion-events`, `build-cicatrizacion-project`, `capture-cicatrizacion-sync` y el comprobador contienen rutas/vocabulario de ese proyecto. Son referencias de implementación, **no un generador universal por id**. Adaptar y parametrizar antes de usarlos en otro video.

## Registro para cada video futuro

Añadir al finalizar: id y commit de referencia, fuente y estado de revisión, duración medida de audio/video, conteo y ritmo observados, piezas reutilizadas/nuevas con rutas, diferencias de voz, fallos completos y solución, comandos realmente ejecutados, QA/capturas y verificaciones pendientes. No sustituir lecciones anteriores sin conservar el contexto de su medición.

## Evidencia de úlcera por presión

- MP3 recibido como `necrosis guion.mp3`, copiado sin cambios a `public/audio/ulcera-por-presion-original.mp3`. SHA-256: `4a34d89e5a493ac996f13ada88107fce8a1c035b4eb2e5bcd0da5032b55b6a59`. Duración medida: 44.042438 s, no la estimada desde el texto.
- El MP3 usa una versión anterior al texto del encargo: «Todo empieza con presión sostenida…» y «Devolver la sangre salva el tejido». No dice «superficie», «Después», «ampollas», «herida abierta» ni «vivo». No asignar tiempos manuales a esas palabras ni crear la ampolla por inercia del plan.
- Faster-Whisper base produjo errores de segmentación como «presiona plasta» y «Si no exigen o ni no trientes». Se conservó en `transcript.base-original.json`; una nueva transcripción real con small reconoció correctamente presión/aplasta y oxígeno/nutrientes. El ASR small original también se conserva. No se editaron tiempos para hacer encajar el guion.
- `scripts/build-ulcera.py` busca veintiocho eventos en el transcript; `scripts/check-ulcera.py` verifica intervalos ASR, continuidad, hash y ausencia de tiempos inventados. Cuantización máxima de inicio a treinta fps: 0.026667 s.
- El modelo base ya estaba local y small estaba en caché. El entorno habitual de ejecución falló por acceso denegado; se continuó con la ejecución autorizada. npm necesitó caché dentro del espacio de trabajo, y el Node instalado necesitó un shim local para `os.userInfo`/interfaces de red en este entorno. No se añadieron dependencias al repositorio.
- El Python de Whisper carece de Pillow. Para la hoja de contacto se usó el entorno existente `2026-10-30/.../work/animacion-env`; no asumir que todos los Python locales tienen las mismas bibliotecas.
- Se detectó y corrigió el recorte de la segunda fila celular en la vista dividida. Comprobar cuerpos visibles completos y la reserva inferior de subtítulos, no solo tamaños nominales.
- La marca se coloca fuera de cámara y se inspecciona en la región fija de todos los fotogramas decodificados. La revisión por píxeles complementa, pero no sustituye, comprobar la palabra legible en las capturas.
- La necrosis queda negra al retirar presión. El retorno de sangre solo se representa como protección de tejido viable; la frase del audio no valida una reversión de necrosis. Fuentes y revisión clínica permanecen pendientes como pide el encargo.
- Borrador cuantizado a 1322 fotogramas, 44.066667 s: diferencia 0.024229 s respecto al archivo. `render:draft` normaliza yuv420p y copia AAC, conservando el render previo. Ver reporte de QA y `verification.md` para la medición de la entrega actual. Sin render final ni merge.

## Revisión v2 de úlcera por presión

- «Superficie», «Después», «ampollas», «herida abierta» y «vivo» están ausentes del MP3 recibido, incluso tras normalizar mayúsculas, signos y diacríticos. «No palidece» está en 27.260–28.000 s. «MediShort360» corresponde a dos tokens ASR y se encuentra al unirlos solo para buscar, sin cambiar sus intervalos.
- La nueva búsqueda `scripts/ulcera_words.py` no confunde una ilustración solicitada con una palabra encontrada. `search-diagnostic-v2.json` conserva la causa de cada ausencia; `transcript-words.md` imprime todo el transcript por palabra. Los tests verifican que el transcript completo siga idéntico al commit v1 y que todos los tiempos correctos permanezcan intactos.
- En v2 el usuario pidió expresamente la ampolla, la evolución en iconos y el cielito. Se autoriza su representación ilustrativa; no cambia el texto del audio ni convierte esas imágenes o la metáfora en hechos clínicos revisados. Este contexto actualiza la decisión de omitir la ampolla de v1.
- Para evitar rellenos, las veinte capturas usan instantes derivados de palabras o pausas reales. «Superficie» se muestra en el corte de «junto al hueso»; «Después» corresponde al cambio de «Por fuera»; la herida a «se rompe»/«úlcera»; el tejido viable a «salva el tejido». La hoja indica debajo de cada imagen el audio real que sirve de ancla.
- El fade de subtítulos de v1 apagaba el primer fotograma de cada palabra. El modo `highContrast` del proyecto elimina esa transparencia, usa blanco con contorno y conserva cincuenta píxeles; las etiquetas quedan fuera de la cámara.
- No dejar la capa anterior semitransparente ni partículas ambientales detrás de la muerte celular. El macro v2 muestra nueve células grandes para llenar mejor el cuadro, conserva tres cuerpos muertos y distingue la silueta metafórica de la célula biológica.
- El giro y la reapertura no deben usar relojes de progreso independientes. V2 deriva ambas mitades de `pressure`, desde la palabra «posición» hasta el retorno del flujo, conservando esos tiempos del audio.
- El primer render v2 no pudo leer `remotion.config.ts` por permisos del entorno; se guardó el error completo en `render-v2-initial-error.log`. El reintento autorizado completó el borrador y el QA sin errores. No se cambió configuración clínica ni se instalaron dependencias.
- Medición y QA definitivos: `verification-v2.md`, `qa-draft-v2.json`, `watermark-check-v2.json`. Solo borrador; no hubo render final ni merge. La revisión humana de anatomía y de la metáfora sigue pendiente.
