from pathlib import Path
import json
from PIL import Image,ImageDraw,ImageFont
rows=json.loads(Path('projects/ulcera-por-presion/capture-report-v2.json').read_text(encoding='utf-8'))
assert len(rows)==20 and all(r.get('path') for r in rows)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',22)
small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',19)
sheet=Image.new('RGB',(1800,4400),'#15313d');d=ImageDraw.Draw(sheet)
for i,row in enumerate(rows):
 x=i%4*450;y=i//4*880
 im=Image.open(row['path']).convert('RGB').resize((450,800),Image.Resampling.LANCZOS);sheet.paste(im,(x,y))
 d.text((x+10,y+808),f"{i+1}. {row['title']} · {row['second']:.3f} s",font=font,fill='white')
 actual=row['anchor']['actual']
 if len(actual)>35:actual=actual[:32]+'…'
 d.text((x+10,y+842),f'Audio: {actual}',font=small,fill='#bce4dc')
sheet.save('output/previews/hoja-contacto-v2.png')
print('Hoja v2: 1800 x 4400; veinte capturas reales, ninguna casilla de relleno.')
