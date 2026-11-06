from pathlib import Path
import json,subprocess
import av,numpy as np
P=Path('projects/ulcera-por-presion')
meta=json.loads((P/'audio-metadata.json').read_text(encoding='utf-8'))
video='output/ulcera-por-presion-draft.mp4'
probe=json.loads(subprocess.check_output(['C:/FFmpeg/bin/ffprobe.exe','-v','error','-show_format','-show_streams','-of','json',video]))
counts=[]
with av.open(video) as clip:
 for frame in clip.decode(video=0):
  img=frame.to_ndarray(format='rgb24')
  mark=img[25:48,22:210]
  counts.append(int(np.sum((mark[:,:,0]>185)&(mark[:,:,1]>185)&(mark[:,:,2]>165))))
watermark={'framesDecoded':len(counts),'minBrightPixelsInFixedWatermarkRegion':min(counts),'allFramesHaveMarkRegion':all(n>400 for n in counts),'method':'Decodificación completa y recuento de píxeles claros en la región fija de marca del borrador; complementa la revisión visual de capturas.'}
assert watermark['allFramesHaveMarkRegion']
(P/'watermark-check.json').write_text(json.dumps(watermark,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
rows=json.loads((P/'capture-report.json').read_text(encoding='utf-8'))
lines=['# Verificación del borrador — úlcera por presión','',
 f"Audio original: **{meta['durationSec']:.6f} s**. MP4: **{float(probe['format']['duration']):.6f} s**. Diferencia: **{float(probe['format']['duration'])-meta['durationSec']:.6f} s**, inferior a un fotograma a treinta fps. Voz conservada, sin recortar ni acelerar.",'',
 'Borrador: 540 × 960, H.264/AAC, treinta fps, yuv420p. Capturas de diseño: 1080 × 1920. Los tamaños de la tabla son de diseño a resolución completa; el borrador los reduce a la mitad. No equivalen a la altura rasterizada de glifos.','',
 '## Capturas solicitadas','',
 '| Palabra solicitada | Segundo ASR | Frame | Zoom macro | Célula menor | Eritrocito menor | Fuente menor | Marca |',
 '|---|---:|---:|---:|---:|---:|---:|---|']
for row in rows:
 if row['frame'] is None:
  lines.append(f"| {row['requested']} | No se dice | — | — | — | — | — | No hay captura |")
 else:
  def val(k): return row.get(k) if row.get(k) is not None else 'No aplica'
  lines.append(f"| {row['requested']} | {row['second']:.3f} | {row['frame']} | {val('macroZoom')} | {val('minCellBodyPx')} | {val('minRedCellBodyPx')} | {row['minFontPx']} px | Visible |")
lines+=['', 'No aplica para zoom/células: vistas externas, paciente o cierre sin microscopio activo. Antes de «células» se muestra flujo capilar pero no el conjunto celular. El zoom macro aplica escala ocho sobre el espacio de detalle normalizado; las cotas de cuerpos se deducen de geometría SVG y transformaciones, no de ancho nominal de un componente.', '',
 'Las capturas en la palabra prueban el comienzo, no la finalización. Hay capturas adicionales de necrosis estable, cambio de postura, tejido viable, primer y último fotogramas.', '',
 '## Textos del video y motivo','',
 '- MEDISHORT360: marca fija arriba a la izquierda, fuera de la cámara, en todos los fotogramas.',
 '- ÚLCERAS POR PRESIÓN: identifica el tema desde cero hasta después del saludo.',
 '- Piel, Grasa, Músculo y Hueso: identifican las capas del corte. Grasa y Músculo no se atribuyen a palabras que no existen en la voz.',
 '- Capilares: identifica los tubos al nombrarlos y durante sus vistas ampliadas.',
 '- NECROSIS / Necrosis: identifica las células muertas y la zona negra al decir necrosis y en su vista de contexto.',
 '- Subtítulos: cada token real del audio, 48 px, en la franja inferior. Lista exhaustiva en screen-texts.json. La marca narrada conserva los tokens ASR «MediShort» y «360.».',
 '- No se muestran Ampolla ni Herida abierta como rótulos; tampoco eslogan, porcentajes, cifras de reloj ni tarjetas de fase.', '',
 '## Verificado y pendiente','',
 '- Transcripción real Whisper small; ASR original conservado. Todos los intervalos por palabra coinciden con el original. Sin tiempos manuales de reserva.',
 '- Veintiocho eventos obtenidos por búsqueda de palabras/frases. Máximo desfase por cuantización: 0,026667 s. Una escena contigua desde cero hasta la duración medida, con fases internas y fundidos.',
 f"- Marca: {watermark['framesDecoded']} fotogramas decodificados; mínimo {watermark['minBrightPixelsInFixedWatermarkRegion']} píxeles claros en su zona fija. Presencia visual comprobada además en las capturas.",
 '- Sync, validate y typecheck aprobados. Validate conserva advertencias de hechos sin fuente/revisor y dos modelos históricos ausentes que este proyecto SVG no usa.',
 '- Render de borrador y QA técnico aprobados: códecs, resolución, duración, fps, ausencia de cuadros negros y congelaciones. No se ejecutó render final.',
 '- El MP3 difiere del texto adjunto: usa una versión anterior, no menciona el nombre del tema ni ampollas, herida abierta, Después, superficie o vivo. El título visual identifica el tema. Esas cinco entradas ausentes se señalan en la hoja; no pueden tener captura por palabra.',
 '- Adaptaciones al audio: se omiten ampolla y su rotura; el reloj acompaña «Por fuera» y «Si la presión continúa»; la herida corresponde a «se rompe» y «úlcera». No se asignan esas alternativas a las palabras ausentes.',
 '- La frase «Devolver la sangre salva el tejido» solo recupera brillo y perfusión de tejido viable; las células necróticas siguen negras. La progresión clínica narrada permanece pendiente de revisión y no es una regla universal.',
 '- Transiciones de seis décimas con revelado circular, divisor deslizante, desenfoque suave al recuperar contexto y barrido lateral al descargar, combinados con fundidos. El reloj es nuevo: TimeClock no existía en el inventario leído.',
 '- Diseño pendiente de revisión humana de anatomía, sincronía perceptiva y calidad. No se realizó escucha fonética humana ni validación clínica integral. Sources y reviewedBy permanecen null como se solicitó.',
 '- No afirmar que hay dieciséis capturas reales: hay once palabras presentes y cinco casillas de ausencia.','']
(P/'verification.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps(watermark,ensure_ascii=False))
