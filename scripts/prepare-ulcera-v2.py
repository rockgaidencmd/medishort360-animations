import json,hashlib,math
from pathlib import Path
from ulcera_words import normalize,find
P=Path('projects/ulcera-por-presion')
read=lambda n:json.loads((P/n).read_text(encoding='utf-8'))
def write(n,v):(P/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
t=read('transcript.json');words=[w for s in t['segments'] for w in s['words']]
assert normalize('¡OXÍGENO!')=='oxigeno'
assert find(words,'OXIGENO')['start']==15.6
assert find(words,'MEDISHORT360')['start']==41.86
assert find(words,'NO PALIDECE')['start']==27.26
diagnostic=[]
for q in ['superficie','Después','ampollas','herida abierta','vivo','no palidece','MediShort360']:
 hit=find(words,q);diagnostic.append({'requested':q,'literalFound':hit is not None,'match':hit,'cause':'fragmentación resuelta' if q=='MediShort360' else ('presencia literal' if hit else 'ausencia real; no es un fallo de acentos, mayúsculas o signos')})
write('search-diagnostic-v2.json',diagnostic)
table=['# Transcript completo, sin modificar intervalos','','| Inicio | Fin | Palabra |','|---:|---:|---|']
table += [f"| {w['start']:.3f} | {w['end']:.3f} | {w['word']} |" for w in words]
(P/'transcript-words.md').write_text('\n'.join(table)+'\n',encoding='utf-8')
e=read('events.json');original=e.copy()
hit=lambda q,n=0:find(words,q,n)
e.update({'openingEnd':hit('piel intacta')['end'],'evolution':hit('Si la presión continúa')['start'],'blister':hit('continúa')['end'],'deathEnd':hit('mueren')['end'],'necrosisEnd':hit('necrosis')['end'],'surfaceClosed':hit('junto al hueso')['end'],'viable':hit('salva el tejido')['start']})
assert all(e[k]==v for k,v in original.items())
write('events-v2.json',e)
scenes=read('scenes.json');controls=scenes['scenes'][0]['props'];controls.update({'events':e,'site':'sacro','captionHighContrast':True,'captionFontSize':50,'watermarkFontSize':44})
write('scenes.json',scenes)
specs=[
 ('Paciente en cama','Cómo','start','Plano general'),
 ('Push-in','puede', 'push','Acercamiento derivado del tramo de apertura'),
 ('Región sacra y lupa','piel intacta','end','Región de apoyo mostrada por cámara'),
 ('Hueso','hueso','mid','Literal'),
 ('Capilares comprimidos','capilares','mid','Literal'),
 ('Sangre detenida','deja de llegar','end','Frase real'),
 ('Oxígeno','oxígeno','mid','Literal'),
 ('Célula lesionada','debilitan','mid','Variante de guion: el audio dice debilitan, no lesionan'),
 ('Cielito, desprendimiento','mueren','end','Metáfora visual pedida; no afirmación biológica'),
 ('Cielito, ascenso','necrosis','end','Metáfora visual pedida; no palabra del audio'),
 ('Necrosis','necrosis','hold','Sostén entre fin de palabra y siguiente frase'),
 ('Superficie','junto al hueso','end','Ausencia literal de superficie; corte con piel cerrada'),
 ('Después con reloj','Por fuera','end','Ausencia literal de Después; transición real a vista externa'),
 ('No palidece','presionarla','end','Frase completa no palidece al presionarla'),
 ('Ampolla','oscurece','mid','Ausencia literal de ampollas; ilustración adicional expresamente solicitada en v2'),
 ('Herida abierta','úlcera','mid','Ausencia literal; referencia real a se rompe y úlcera'),
 ('Posición','posición','mid','Literal'),
 ('Descarga','descarga','mid','Literal'),
 ('Tejido vivo','tejido','mid','Ausencia literal de vivo; segunda aparición de tejido: salva el tejido'),
 ('MediShort360','MediShort360','mid','Dos tokens reales, unidos solo para la búsqueda')]
plan=[]
for title,q,sample,reason in specs:
 m=hit(q,1 if title=='Tejido vivo' else 0)
 if not m:raise ValueError('Sin ancla real: '+q)
 second=m['start'] if sample=='start' else m['end']-1/30 if sample=='end' else (m['start']+m['end'])/2
 if sample=='push':second=(hit('puede')['start']+e['openingEnd'])/2
 if sample=='hold':second=(m['end']+e['deep'])/2
 frame=max(0,math.ceil(second*30-1e-8));second=frame/30
 plan.append({'title':title,'anchor':m,'second':second,'frame':frame,'reason':reason})
assert len(plan)==20 and all(x['frame'] is not None for x in plan)
write('capture-plan-v2.json',plan)
write('time-integrity-v2.json',{'transcriptSha256':hashlib.sha256((P/'transcript.json').read_bytes()).hexdigest(),'audioSha256':hashlib.sha256(Path('public/audio/ulcera-por-presion-original.mp3').read_bytes()).hexdigest(),'originalEventTimesUnchanged':True,'scenes8_9_10_12':{'8':{'anchor':'El daño / junto al hueso','start':e['deep']},'9':{'anchor':'Por fuera / no palidece','start':e['outside']},'10':{'anchor':'Si la presión continúa / se rompe / úlcera','start':e['evolution']},'12':{'anchor':'salva el tejido','start':e['viable']}},'ampolla':'Ilustración pedida en v2, anclada al tramo real continúa/oscurece; no se afirma que el audio diga ampolla.'})
print(json.dumps(diagnostic,ensure_ascii=True,indent=2))
