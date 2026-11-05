"""Construye escenas y fotogramas seleccionados a partir del transcript real. Sin tiempos repartidos artificialmente."""
import json,re,unicodedata
from pathlib import Path
p=Path('projects/ecv-isquemico-hemorragico');j=json.loads((p/'transcript.json').read_text());ws=[w for s in j['segments'] for w in s['words']]
def clean(s):return re.sub('[^a-z0-9]','',unicodedata.normalize('NFD',s.lower()).encode('ascii','ignore').decode())
def cue(word,n=0):return [w['start'] for w in ws if clean(w['word'])==clean(word)][n]
starts=[0,6.58,cue('trombo'),cue('émbolo'),cue('bloquearla'),cue('después'),cue('Disminuye'),cue('neuronas'),cue('gris'),cue('ámbar'),j['segments'][11]['start'],cue('sangre'),38.5,cue('alrededor'),cue('Comparemos'),j['segments'][20]['start'],64.42,cue('Comunica'),76.34,cue('Reconoce'),cue('Síguenos')]
names=['gancho','arteria','trombo','embolo','bloqueo','eritrocitos','flujo','neuronas','dano','riesgo','rotura','sangre','hematoma','subaracnoideo','comparacion','signos','valoracion','comunicacion','reloj','cierre','marca']
actions=['Dos vasos: oclusión y rotura en cerebro grande','Lupa cerebral conecta con tejido y arteria','Trombo crece adherido a pared','Émbolo viaja con estela: ejemplo alternativo','Coágulo bloquea luz arterial','Eritrocitos frenan ante bloqueo','Flechas de flujo se atenúan','Actividad y brillo neuronal disminuyen','Núcleo gris aumenta','Halo ámbar pulsa con reloj pedagógico','Pared se abre al decir rompe','Eritrocitos salen al tejido en pulsos','Hematoma aumenta y deforma neuronas vecinas','Sangre ocupa espacio subaracnoideo en corte meníngeo','Divisor revela oclusión y rotura animadas','Cara, brazo y habla cambian al nombrarlos','Pupila se contrae con luz, respiración y equipo animados','Aviso se activa al decir comunica','Reloj grande con tejido que pierde actividad','Reconoce, comunica y vigila se iluminan','Cierre conserva reloj y tejido activo']
facts=[];scenes=[]
for i,(a,n,act) in enumerate(zip(starts,names,actions)):
 b=starts[i+1] if i+1<len(starts) else j['durationSec'];fid='audio-'+n
 texts=' '.join(w['word'] for w in ws if a<=w['start']<b)
 facts.append(dict(id=fid,text=texts or act,source='Audio original suministrado por el usuario; ver transcript.json. Revisión clínica independiente pendiente.',reviewedBy=None,reviewedAt=None))
 scenes.append(dict(id=n,**{'from':a,'to':b},kind='anatomy',component='ECVRedesign',props={'absoluteStart':a},action=act,structures=['cerebro','arteria','tejido cerebral'] if i<15 else ['paciente','pupilas','neuronas'],camera='static',cameraIntensity=0,transitionIn=0,factIds=[fid],assetIds=[]))
(p/'scenes.json').write_text(json.dumps({'scenes':scenes},ensure_ascii=False,indent=2)+'\n')
(p/'facts.json').write_text(json.dumps({'facts':facts},ensure_ascii=False,indent=2)+'\n')
items=[(9.0,'trombo'),(11.4,'émbolo'),(16.7,'glóbulos detenidos'),(27.5,'núcleo gris'),(29.6,'zona ámbar'),(33.95,'rotura'),(41.8,'hematoma'),(47.2,'subaracnoideo'),(51.9,'comparación'),(60.5,'cara'),(62.1,'brazo'),(63.6,'habla'),(66.8,'pupilas'),(70.8,'presión arterial'),(78.2,'reloj'),(81.9,'cierre')]
frames=[]
for t,name in items:
 frame=round(t*30);t=frame/30
 w=next((w['word'] for w in ws if w['start']<=t<w['end']),'pausa')
 zoom='8× esquemático' if 6.58<=t<cue('Comparemos') else '8× por panel' if t<j['segments'][20]['start'] else 'No aplica'
 cell=80 if t<j['segments'][20]['start'] else 108 if t>=76.34 else None
 frames.append(dict(frame=frame,second=round(t,3),event=name,word=w,zoom=zoom,minCellPx=cell,minLabelPx=36,minCaptionPx=52))
(p/'contact-frames.json').write_text(json.dumps(frames,ensure_ascii=False,indent=2)+'\n')
