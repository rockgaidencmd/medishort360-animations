import hashlib,json,math
from pathlib import Path
P=Path('projects/ulcera-por-presion')
read=lambda f:json.loads((P/f).read_text(encoding='utf-8'))
t=read('transcript.json');raw=read('transcript.whisper-original.json')
words=[w for s in t['segments'] for w in s['words']]
original=[w for s in raw['segments'] for w in s['words']]
assert [(w['start'],w['end']) for w in words]==[(w['start'],w['end']) for w in original]
assert all(w['start']<=w['end'] for w in words)
events=read('event-map.json')
for ev in events:
 assert words[ev['wordIndex']]['start']==ev['start']==ev['visualStart']
 assert 0<=ev['start']-ev['visualStart']<=.15
 assert ev['frame']==math.ceil(ev['start']*30-1e-8)
scenes=read('scenes.json')['scenes'];assert scenes[0]['from']==0 and scenes[-1]['to']==t['durationSec']
assert all(a['to']==b['from'] for a,b in zip(scenes,scenes[1:]))
meta=read('audio-metadata.json')
assert hashlib.sha256(Path(meta['file']).read_bytes()).hexdigest()==meta['sha256']
plan=read('capture-plan.json');assert len(plan)==16
assert all(r['frame'] is None and r['second'] is None for r in plan if r['status']=='absent-in-audio')
facts=read('facts.json')['facts'];assert all(f['source'] is None and f['reviewedBy'] is None for f in facts)
screen={'persistent':[{'text':'MEDISHORT360','reason':'Marca fija, fuera de cámara, todos los fotogramas','fontPx':40}],
 'title':[{'text':'ÚLCERAS POR PRESIÓN','reason':'Identifica el tema sin sonido desde cero hasta después del saludo','from':0,'to':read('events.json')['body'],'fontPx':58}],
 'labels':['Piel','Grasa','Músculo','Hueso','Capilares','NECROSIS','Necrosis'],
 'labelsReason':'Identificación anatómica en el corte; capilares y necrosis disparados por sus palabras. Grasa y Músculo identifican capas, no se atribuyen a palabras ausentes.',
 'subtitles':[w['word'] for w in words],
 'subtitlesReason':'Palabra por palabra del ASR small, en franja inferior, 48 px; se conservan intervalos y división ASR de MediShort / 360.',
 'omitted':['Ampolla','Herida abierta','eslogan de Outro','porcentajes','cifras de reloj','tarjetas de fase'],
 'omittedReason':'No están en la narración o no están permitidos por el encargo.'}
(P/'screen-texts.json').write_text(json.dumps(screen,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
result={'wordIntervalsUnchanged':True,'eventCount':len(events),'source':'Whisper small sobre MP3 original','maxVisualLeadSec':0,'maxFrameRoundingDelaySec':max(e['frame']/30-e['start'] for e in events),'continuity':True,'audioHashMatches':True,'captureSlots':16,'actualCaptureWords':sum(r['frame'] is not None for r in plan),'absentWords':[r['requested'] for r in plan if r['frame'] is None]}
(P/'sync-check.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
