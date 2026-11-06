# Verificación del borrador — úlcera por presión

Audio original: **44.042438 s**. MP4: **44.066667 s**. Diferencia: **0.024229 s**, inferior a un fotograma a treinta fps. Voz conservada, sin recortar ni acelerar.

Borrador: 540 × 960, H.264/AAC, treinta fps, yuv420p. Capturas de diseño: 1080 × 1920. Los tamaños de la tabla son de diseño a resolución completa; el borrador los reduce a la mitad. No equivalen a la altura rasterizada de glifos.

## Capturas solicitadas

| Palabra solicitada | Segundo ASR | Frame | Zoom macro | Célula menor | Eritrocito menor | Fuente menor | Marca |
|---|---:|---:|---:|---:|---:|---:|---|
| piel intacta | 2.000 | 60 | No aplica | No aplica | No aplica | 40 px | Visible |
| hueso | 8.580 | 258 | No aplica | No aplica | No aplica | 40 px | Visible |
| capilares | 12.440 | 374 | 8 | No aplica | 122 | 40 px | Visible |
| sangre | 13.560 | 407 | 8 | No aplica | 122 | 40 px | Visible |
| oxígeno | 15.600 | 468 | 8 | No aplica | 122 | 40 px | Visible |
| células | 17.540 | 527 | 8 | 172 | 122 | 40 px | Visible |
| necrosis | 20.300 | 609 | 8 | 172 | 122 | 40 px | Visible |
| superficie | No se dice | — | — | — | — | — | No hay captura |
| Después | No se dice | — | — | — | — | — | No hay captura |
| no palidece | 27.260 | 818 | No aplica | No aplica | No aplica | 40 px | Visible |
| ampollas | No se dice | — | — | — | — | — | No hay captura |
| herida abierta | No se dice | — | — | — | — | — | No hay captura |
| posición | 35.960 | 1079 | 8 | 172 | 122 | 40 px | Visible |
| descarga | 36.760 | 1103 | 8 | 172 | 122 | 40 px | Visible |
| vivo | No se dice | — | — | — | — | — | No hay captura |
| MediShort360 | 41.860 | 1256 | No aplica | No aplica | No aplica | 40 px | Visible |

No aplica para zoom/células: vistas externas, paciente o cierre sin microscopio activo. Antes de «células» se muestra flujo capilar pero no el conjunto celular. El zoom macro aplica escala ocho sobre el espacio de detalle normalizado; las cotas de cuerpos se deducen de geometría SVG y transformaciones, no de ancho nominal de un componente.

Las capturas en la palabra prueban el comienzo, no la finalización. Hay capturas adicionales de necrosis estable, cambio de postura, tejido viable, primer y último fotogramas.

## Textos del video y motivo

- MEDISHORT360: marca fija arriba a la izquierda, fuera de la cámara, en todos los fotogramas.
- ÚLCERAS POR PRESIÓN: identifica el tema desde cero hasta después del saludo.
- Piel, Grasa, Músculo y Hueso: identifican las capas del corte. Grasa y Músculo no se atribuyen a palabras que no existen en la voz.
- Capilares: identifica los tubos al nombrarlos y durante sus vistas ampliadas.
- NECROSIS / Necrosis: identifica las células muertas y la zona negra al decir necrosis y en su vista de contexto.
- Subtítulos: cada token real del audio, 48 px, en la franja inferior. Lista exhaustiva en screen-texts.json. La marca narrada conserva los tokens ASR «MediShort» y «360.».
- No se muestran Ampolla ni Herida abierta como rótulos; tampoco eslogan, porcentajes, cifras de reloj ni tarjetas de fase.

## Verificado y pendiente

- Transcripción real Whisper small; ASR original conservado. Todos los intervalos por palabra coinciden con el original. Sin tiempos manuales de reserva.
- Veintiocho eventos obtenidos por búsqueda de palabras/frases. Máximo desfase por cuantización: 0,026667 s. Una escena contigua desde cero hasta la duración medida, con fases internas y fundidos.
- Marca: 1322 fotogramas decodificados; mínimo 1039 píxeles claros en su zona fija. Presencia visual comprobada además en las capturas.
- Sync, validate y typecheck aprobados. Validate conserva advertencias de hechos sin fuente/revisor y dos modelos históricos ausentes que este proyecto SVG no usa.
- Render de borrador y QA técnico aprobados: códecs, resolución, duración, fps, ausencia de cuadros negros y congelaciones. No se ejecutó render final.
- El MP3 difiere del texto adjunto: usa una versión anterior, no menciona el nombre del tema ni ampollas, herida abierta, Después, superficie o vivo. El título visual identifica el tema. Esas cinco entradas ausentes se señalan en la hoja; no pueden tener captura por palabra.
- Adaptaciones al audio: se omiten ampolla y su rotura; el reloj acompaña «Por fuera» y «Si la presión continúa»; la herida corresponde a «se rompe» y «úlcera». No se asignan esas alternativas a las palabras ausentes.
- La frase «Devolver la sangre salva el tejido» solo recupera brillo y perfusión de tejido viable; las células necróticas siguen negras. La progresión clínica narrada permanece pendiente de revisión y no es una regla universal.
- Transiciones de seis décimas con revelado circular, divisor deslizante, desenfoque suave al recuperar contexto y barrido lateral al descargar, combinados con fundidos. El reloj es nuevo: TimeClock no existía en el inventario leído.
- Diseño pendiente de revisión humana de anatomía, sincronía perceptiva y calidad. No se realizó escucha fonética humana ni validación clínica integral. Sources y reviewedBy permanecen null como se solicitó.
- No afirmar que hay dieciséis capturas reales: hay once palabras presentes y cinco casillas de ausencia.

## Lista exhaustiva de subtítulos por token

¿Cómo · puede · morir · tejido · bajo · una · piel · intacta? · ¡Hola, · hijos · de · Florence · Nightingale! · Todo · empieza · con · presión · sostenida · sobre · un · hueso, · como · el · talón · o · el · sacro. · La · presión · aplasta · los · capilares · y · la · sangre · deja · de · llegar. · Sin · oxígeno · ni · nutrientes, · las · células · se · debilitan · y · mueren. · Es · la · necrosis. · El · daño · suele · empezar · en · profundidad, · junto · al · hueso. · Por · fuera, · la · piel · se · enrojece · y · no · palidece · al · presionarla. · Si · la · presión · continúa, · se · oscurece, · se · rompe · y · se · forma · la · úlcera. · Por · eso, · enfermería · cambia · la · posición · y · descarga · el · apoyo. · Devolver · la · sangre · salva · el · tejido. · Síguenos · en · MediShort · 360.
