from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont
data=json.loads(Path('projects/ulcera-por-presion/capture-report.json').read_text(encoding='utf-8'))
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',24)
bold=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',28)
sheet=Image.new('RGB',(1800,3440),'#15313d'); d=ImageDraw.Draw(sheet)
for i,row in enumerate(data):
 x=(i%4)*450;y=(i//4)*860
 if row.get('path'):
  im=Image.open(row['path']).convert('RGB').resize((450,800),Image.Resampling.LANCZOS);sheet.paste(im,(x,y))
  caption=f"{row['requested']} · {row['second']:.3f} s"
 else:
  d.rectangle((x+10,y+10,x+440,y+790),outline='#5fe1c1',width=3)
  d.text((x+35,y+300),row['requested'],font=bold,fill='white')
  d.text((x+35,y+355),'NO SE DICE EN EL MP3',font=font,fill='#efb47d')
  d.text((x+35,y+400),'Sin tiempo inventado',font=font,fill='white')
  caption=row['requested']+' · sin tiempo'
 d.text((x+12,y+812),caption,font=font,fill='white')
sheet.save('output/previews/hoja-contacto.png')
print('Hoja de contacto: 1800 x 3440, 16 casillas; las ausencias están identificadas.')
