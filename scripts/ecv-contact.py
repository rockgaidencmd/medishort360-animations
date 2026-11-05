"""Hoja de contacto del MP4 con marcas del transcript y medidas de geometría SVG.
Las medidas se expresan en la composición 1080x1920, antes de reducir la hoja.
Célula = cuerpo completo, no núcleo ni prolongaciones; excluye cuerpos cortados por borde.
"""
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json,subprocess,io,math
root=Path.cwd();p=root/'projects/ecv-isquemico-hemorragico';items=json.loads((p/'contact-frames.json').read_text());video=root/'output/ecv-isquemico-hemorragico-audio-draft.mp4'
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
small=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
sheet=Image.new('RGB',(2000,3820),'#eee9df');draw=ImageDraw.Draw(sheet)
def extent_ellipse(rx,ry,ang,sx=1,sy=1):
 a=math.radians(ang)
 return min(2*sx*math.sqrt((rx*math.cos(a))**2+(ry*math.sin(a))**2),2*sy*math.sqrt((rx*math.sin(a))**2+(ry*math.cos(a))**2))
def cell_min(t):
 if t>=57.82 and t<76.34:return None
 if t>=76.34:return math.floor(min(2*(56+math.sin(t*3)*2) for _ in [0]))
 if 44.36<=t<48.02:return 91
 compare=t>=48.02;sx=.48 if compare else 1;sy=.9 if compare else 1
 rbcw=228 if compare else 120
 vals=[extent_ellipse(rbcw/2,rbcw*.38,math.sin(t+i)*15,sx,sy) for i in range(7)]
 poly=[(-35,-20),(-8,-40),(30,-30),(42,0),(20,36),(-20,40),(-40,5)]
 for i in range(3):
  a=math.radians(t*15+i*35);scale=2.5 if compare else 1.2
  points=[(scale*(x*math.cos(a)-y*math.sin(a))*sx,scale*(x*math.sin(a)+y*math.cos(a))*sy) for x,y in poly]
  vals.append(min(max(v[0] for v in points)-min(v[0] for v in points),max(v[1] for v in points)-min(v[1] for v in points)))
 bleed=t>=32.34;h=(.65+.1*math.sin(t)) if compare else min(1,max(0,(t-34.76)/7))
 for i in range(6):
  r=56+math.sin((t+i)*3)*2;compression=h if bleed and i>=4 else 0;size=1.9 if compare else 1
  vals.append(2*r*size*min(sx*(1-compression*.22),sy*(1+compression*.12)))
 if bleed:
  vals += [extent_ellipse(rbcw/2,rbcw*.38,((t*1.3+i*.2)%1)*70,sx,sy) for i in range(5)]
 return math.floor(min(vals))
for i,item in enumerate(items):
 frame=item['frame'];t=frame/30
 data=subprocess.check_output(['ffmpeg','-v','error','-ss',f'{t:.6f}','-i',str(video),'-frames:v','1','-f','image2pipe','-vcodec','png','-'])
 im=Image.open(io.BytesIO(data)).convert('RGB');im=im.resize((480,853),Image.Resampling.LANCZOS)
 x=(i%4)*500+10;y=(i//4)*950+10;sheet.paste(im,(x,y))
 draw.text((x+2,y+860),f"{t:05.2f} s · «{item['word']}»",font=font,fill='#172b3b')
 draw.text((x+2,y+896),item['event'],font=small,fill='#354d58')
 item['minCellPx']=cell_min(t)
 item['minCellContactPx']=None if item['minCellPx'] is None else round(item['minCellPx']*480/1080,1)
 item['minLabelContactPx']=16
out=root/'output/previews/hoja-contacto.png';sheet.quantize(colors=224).save(out,optimize=True)
(p/'contact-frames.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
md=['# QA ECV con audio original','',f"Audio: 85.472625 s; MP4: 2565 fotogramas, 30 fps, borrador 540×960. Hoja: 2000×3820, 16 cuadros.",'','Las medidas siguientes pertenecen al diseño 1080×1920. En el borrador se reducen al 50 %. En la hoja, cada cuadro mide 480×853 y reduce las medidas al 44,44 %. El zoom 8× es esquemático, no una escala anatómica calibrada. Célula: dimensión menor del cuerpo SVG, excluyendo núcleo, prolongaciones y recorte de borde. Los tamaños se calculan desde la geometría y sus transformaciones en cada fotograma.','', '| Segundo | Palabra | Evento | Zoom | Célula mínima (px) | Letra mínima / subtítulo (px) |','|---|---|---|---|---:|---|']
for it in items:md.append(f"| {it['second']:.2f} | {it['word']} | {it['event']} | {it['zoom']} | {it['minCellPx'] if it['minCellPx'] else '—'} | 36 / 52 |")
md+=['','Letras mínimas en la hoja: 16 px dentro de las capturas; subtítulos: 23,1 px. Rótulo bajo cada cuadro: 22 px; descripción: 18 px.','', 'Control pendiente: Whisper señaló baja confianza en «La» (54,34 s) y «Cara» (59,90 s). Texto contrastado con el guion aportado; no se ha inventado la confianza ni sustituido por una alineación uniforme. La revisión auditiva humana sigue siendo necesaria.','', 'Las etiquetas de orientación carótida/cerebral media y meninges no tienen equivalente hablado en este audio. Se muestran como orientación anatómica. No se añaden dosis, ventanas, objetivos clínicos ni cifras al audio.','', 'La revisión clínica no está firmada. validate es de borrador; --final exige fuente científica y revisor. Sin merge.']
(root/'docs/ecv-audio-qa.md').write_text('\n'.join(md)+'\n')
print(out, out.stat().st_size)
