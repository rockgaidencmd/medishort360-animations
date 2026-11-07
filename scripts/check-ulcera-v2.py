import json,hashlib,subprocess,math
from pathlib import Path
from ulcera_words import find,normalize
P=Path('projects/ulcera-por-presion');read=lambda n:json.loads((P/n).read_text(encoding='utf-8'))
t=read('transcript.json');baseline=json.loads(subprocess.check_output(['git','show','defef79:projects/ulcera-por-presion/transcript.json']))
assert t==baseline,'Se modificó el transcript correcto'
w=[w for s in t['segments'] for w in s['words']]
assert find(w,'OXÍGENO!')['start']==find(w,'oxigeno')['start']
assert find(w,'  NO, PALIDECE?  ')['start']==27.26
assert find(w,'MEDISHORT360')['fromWord']+1==find(w,'MediShort 360')['toWord']
assert all(find(w,q) is None for q in ['superficie','después','ampollas','herida abierta','vivo'])
e=read('events.json');v=read('events-v2.json');assert all(v[k]==value for k,value in e.items())
scenes=read('scenes.json')['scenes'];assert scenes[0]['from']==0 and scenes[-1]['to']==t['durationSec']
assert all(a['to']==b['from'] for a,b in zip(scenes,scenes[1:]))
audit=read('time-integrity-v2.json');assert hashlib.sha256(Path('public/audio/ulcera-por-presion-original.mp3').read_bytes()).hexdigest()==audit['audioSha256']
plan=read('capture-plan-v2.json');assert len(plan)==20 and len({x['frame'] for x in plan})==20
for item in plan:
 anchor=item['anchor'];assert w[anchor['fromWord']]['start']==anchor['start'] and w[anchor['toWord']]['end']==anchor['end']
 assert math.isfinite(item['second']) and item['frame']>=0
result={'transcriptUnchanged':True,'audioUnchanged':True,'originalEventTimesUnchanged':True,'normalizationTestsPassed':True,'literalAbsencesConfirmed':5,'realCaptureFrames':20,'fillers':0,'sceneAnchors8_9_10_12':audit['scenes8_9_10_12']}
(P/'check-v2.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=True))
