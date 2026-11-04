import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='projects/cicatrizacion-herida';
const raw=fs.readFileSync(`${dir}/transcript.json`,'utf8');
const transcript=JSON.parse(raw);const manifest=JSON.parse(fs.readFileSync(`${dir}/manifest.json`,'utf8'));
const words=transcript.segments.flatMap(s=>s.words??[]);
const norm=s=>s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const normalized=words.map(w=>norm(w.word));
const lead=.1;
const match=(phrase,after=0)=>{const target=phrase.split(' ').map(norm);for(let i=0;i<=words.length-target.length;i++){if(words[i].start>=after&&target.every((v,j)=>normalized[i+j]===v))return {phrase,wordIndices:Array.from({length:target.length},(_,j)=>i+j),wordStart:words[i].start,wordEnd:words[i+target.length-1].end};}throw Error(`No se encontró en el audio: ${phrase} después de ${after}`);};
const phases=['Hemostasia','Inflamación','Proliferación','Remodelación'].map(p=>match(p));
const queries={tripAt:['tropieza'],impactAt:['cae'],armAt:['antebrazo'],blood:['sangra'],hemostasis:['Hemostasia'],inflammation:['Inflamación'],proliferation:['Proliferación'],remodeling:['Remodelación'],platelets:['plaquetas'],fibrin:['fibrina'],redCells:['glóbulos rojos'],clot:['coágulo'],neutrophils:['neutrófilos'],macrophage:['macrófago'],scabDark:['costra se oscurece'],fibroblasts:['fibroblastos'],collagen:['colágeno',phases[2].wordStart],capillary:['capilar nuevo'],keratinocytes:['queratinocitos'],closeWound:['cierran'],alignCollagen:['colágeno se alinea',phases[3].wordStart],retreatCapillary:['disminuyen los capilares',phases[3].wordStart],scabDrop:['costra se desprende',phases[3].wordStart],skinNew:['piel nueva',phases[3].wordStart],recovered:['Piel recuperada'],brand:['Síguenos en MediShort 360']};
const events=Object.entries(queries).map(([key,[phrase,after]])=>{const found=match(phrase,after??0);const visualStart=Math.max(0,Math.round((found.wordStart-lead)*1000)/1000);return {key,...found,visualStart,leadSec:Math.round((found.wordStart-visualStart)*1000)/1000,captureFrame:Math.ceil((found.wordStart-1e-9)*manifest.fps)};});
const times=Object.fromEntries(events.map(e=>[e.key,e.visualStart]));
const ends=Object.fromEntries(events.map(e=>[e.key+'End',e.wordEnd]));
const data={source:'whisper-word-timestamps',transcriptSha256:crypto.createHash('sha256').update(raw).digest('hex'),durationSec:transcript.durationSec,fps:manifest.fps,advanceSec:lead,events};
fs.writeFileSync(`${dir}/events.json`,JSON.stringify(data,null,2)+'\n');
const props={sync:'transcript',appearAt:0,tripAt:times.tripAt,impactAt:times.impactAt,splitAt:times.armAt,healingAt:times.hemostasis,healedAt:times.recovered,closeAt:times.recovered,healingFrom:0,healingTo:1,zoomTop:2.5,zoomBottom:8,showDayCounter:true,eventTimes:{...times,...ends},internalLabel:true};
fs.writeFileSync(`${dir}/timing-props.json`,JSON.stringify(props,null,2)+'\n');
for(const event of events){if(event.leadSec<0||event.leadSec>.15)throw Error(`Adelanto inválido ${event.key}`);}
console.table(events.map(({key,phrase,wordStart,visualStart})=>({key,phrase,wordStart,visualStart})));

