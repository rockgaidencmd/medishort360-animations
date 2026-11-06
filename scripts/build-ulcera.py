"""Mapa verificable desde palabras reales del MP3; no contiene tiempos narrativos manuales."""
import json, math, re, shutil, subprocess, hashlib, difflib
from pathlib import Path
P=Path('projects/ulcera-por-presion')
def write(name,data): (P/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
raw=P/'transcript.whisper-original.json'
if not raw.exists(): shutil.copyfile(P/'transcript.json',raw)
t=json.loads(raw.read_text(encoding='utf-8'))
words=[w for s in t['segments'] for w in s['words']]
def norm(s): return re.sub(r'[^\wáéíóúñ]','',s.lower())
def lookup(phrase,n=0):
 q=[norm(x) for x in phrase.split()]; hits=[]
 for i in range(len(words)-len(q)+1):
  if [norm(w['word']) for w in words[i:i+len(q)]]==q: hits.append((i,words[i],words[i+len(q)-1]))
 if len(hits)<=n: raise ValueError('Palabra ausente, sin tiempo de reserva: '+phrase)
 return hits[n]
queries={'hookDeath':'morir','greeting':'Hola','body':'Todo empieza','bone':'hueso','compression':'aplasta','capillaries':'capilares','blood':'sangre','oxygen':'oxígeno','nutrients':'nutrientes','cells':'células','injury':'debilitan','death':'mueren','necrosis':'necrosis','deep':'El daño','outside':'Por fuera','red':'enrojece','blanch':'no palidece','finger':'presionarla','dark':'oscurece','rupture':'rompe','ulcer':'úlcera','care':'Por eso','turn':'posición','release':'descarga','reflow':'Devolver','protect':'salva','outro':'Síguenos','brand':'MediShort'}
events={}; audit=[]
for key,query in queries.items():
 i,w,last=lookup(query)
 events[key]=w['start']
 audit.append(dict(event=key,query=query,wordIndex=i,start=w['start'],end=last['end'],visualStart=w['start'],frame=math.ceil(w['start']*30-1e-8),leadSec=0))
events['greetingEnd']=lookup('Nightingale')[2]['end']
audio=Path('public/audio/ulcera-por-presion-original.mp3')
probe=json.loads(subprocess.check_output(['C:/FFmpeg/bin/ffprobe.exe','-v','error','-show_format','-show_streams','-of','json',str(audio)]))
duration=float(probe['format']['duration']);events['end']=duration
t['durationSec']=duration
# La marca está dividida en dos tokens por ASR. Se corrige grafía sin mover ningún intervalo.
corrections=[]
for seg in t['segments']:
 for w in seg['words']:
  if norm(w['word'])=='medishort':
   corrections.append(dict(original=w['word'],corrected='MediShort',start=w['start'],end=w['end'],reason='Grafía de marca; se conserva el segundo token 360 y todos los tiempos.'))
   w['word']='MediShort'
write('transcript.json',t);write('events.json',events);write('event-map.json',audit);write('transcript-corrections.json',corrections)
write('audio-metadata.json',{'file':str(audio),'sha256':hashlib.sha256(audio.read_bytes()).hexdigest(),'durationSec':duration,'whisperDurationSec':json.loads(raw.read_text(encoding='utf-8'))['durationSec'],'probe':probe})
facts=[]
for i,seg in enumerate(t['segments']):
 if i in (0,1,len(t['segments'])-1): continue
 facts.append(dict(id=f'f{i}',text=seg['text'],source=None,reviewedBy=None,reviewedAt=None))
write('facts.json',{'facts':facts})
write('scenes.json',{'scenes':[dict(id='ulcera-audio',from_=0)]}) if False else None
write('scenes.json',{'scenes':[{'id':'ulcera-audio','from':0,'to':duration,'kind':'anatomy','component':'PressureUlcer','props':{'events':events,'internalBrand':False,'internalLabel':True,'wordCaptions':True,'captionBottom':20,'captionFontSize':48,'watermarkFontSize':40},'structures':['piel','tejido subcutáneo','músculo','hueso','capilares','células'],'action':'Compresión tisular, reducción del flujo, lesión y necrosis; cambios cutáneos y descarga que conserva el tejido viable.','camera':'static','cameraIntensity':0,'transitionIn':0,'factIds':[f['id'] for f in facts],'assetIds':[]}]})
write('render-options.json',{'entry':'src/index.tsx','normalizeDraftRange':True})
actual=' '.join(s['text'] for s in t['segments'])
reference=Path('docs/guiones/lote-1.md').read_text(encoding='utf-8').split('```text\n')[1].split('\n```')[0]
diff='\n'.join(difflib.ndiff(reference.split(),actual.split()))
(P/'audio-vs-reference.md').write_text('# Audio frente al texto adjunto\n\n## ASR small del audio real\n\n'+actual+'\n\n## Diferencias por palabra\n\n```diff\n'+diff+'\n```\n\n## Limitaciones\n\nEl MP3 es una versión anterior: no nombra úlceras por presión, ampollas, herida abierta, Después, superficie ni vivo. No se inventan sus tiempos. Se representan los eventos realmente dichos. «Devolver la sangre salva el tejido» no se dibuja reviviendo necrosis. La secuencia superficial no constituye clasificación universal; revisión clínica pendiente.\n',encoding='utf-8')
captions=['piel intacta','hueso','capilares','sangre','oxígeno','células','necrosis','superficie','Después','no palidece','ampollas','herida abierta','posición','descarga','vivo','MediShort360']
captures=[]
for query in captions:
 try:
  real='MediShort' if query=='MediShort360' else query
  _,w,last=lookup(real)
  captures.append(dict(requested=query,actual=real,second=w['start'],frame=math.ceil(w['start']*30-1e-8),status='present'))
 except ValueError: captures.append(dict(requested=query,actual=None,second=None,frame=None,status='absent-in-audio'))
write('capture-plan.json',captures)
Path('docs/guiones/ulcera-por-presion.md').write_text('# Úlcera por presión — audio recibido\n\nDuración medida: '+str(duration)+' s. El audio manda; no regenerar ni recortar.\n\n```text\n'+actual+'\n```\n\nPlan y discrepancias: `projects/ulcera-por-presion/audio-vs-reference.md`. Diseño solicitado conservado en `production-request.txt`; las palabras ausentes no reciben tiempos inventados.\n',encoding='utf-8')
print('Generados proyecto, eventos reales y plan de capturas:',duration,'s;',len(words),'tokens')
