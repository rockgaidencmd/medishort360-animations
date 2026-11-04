import './map-cicatrizacion-events.mjs';
import fs from 'node:fs';
const dir='projects/cicatrizacion-herida';
const timing=JSON.parse(fs.readFileSync(`${dir}/timing-props.json`,'utf8'));
const transcript=JSON.parse(fs.readFileSync(`${dir}/transcript.json`,'utf8'));
const e=timing.eventTimes;
const controls={internalLabel:true,internalBrand:true,wordCaptions:true,captionBottom:16};
const facts=[
 ['hemostasia-sangrado','El sangrado cede y se forma un coágulo.','hemostasia.superficie'],
 ['hemostasia-tapon','Las plaquetas forman un tapón y la fibrina lo refuerza.','hemostasia.corte'],
 ['inflamacion-limpieza','Los neutrófilos limpian bacterias y residuos y luego llegan los macrófagos.','inflamacion.corte'],
 ['costra','La costra se forma y oscurece.','inflamacion.superficie'],
 ['colageno','Los fibroblastos fabrican colágeno.','proliferacion.corte'],
 ['capilar','Brotan capilares nuevos.','proliferacion.corte'],
 ['queratinocitos','Los queratinocitos migran bajo la costra para cerrar la herida.','proliferacion.corte'],
 ['remodelacion','El colágeno se reorganiza y refuerza el tejido; disminuyen los capilares nuevos.','remodelacion.corte'],
 ['piel-recuperada','La costra cae y la piel se va normalizando.','remodelacion.superficie'],
].map(([id,text,origin])=>({id,text,source:null,reviewedBy:null,reviewedAt:null,origin:`src/anatomy/data/healing-phases.json#${origin}`}));
const scenes=[
 {id:'caida',from:0,to:e.armAt,kind:'environment',component:'ChildFall',structures:['niño','antebrazo'],action:'El niño camina, tropieza y cae apoyando el antebrazo, con temblor del impacto y acercamiento a la zona.',label:'Caída y herida',factIds:[],props:{...controls,tripAt:e.tripAt,impactAt:e.impactAt}},
 {id:'cicatrizacion',from:e.armAt,to:e.brand,kind:'anatomy',component:'WoundHealing',structures:['antebrazo','epidermis','dermis','plaquetas','fibrina','eritrocitos','neutrófilos','macrófago','fibroblasto','colágeno','capilar','queratinocitos'],action:'Sangra la herida; las células migran, forman una malla, limpian residuos, depositan fibras, reconstruyen piel y reorganizan el tejido siguiendo cada palabra del MP3.',label:'Cicatrización de la herida',factIds:facts.map(f=>f.id),props:{...timing,...controls,view:'split',timelineOffset:e.armAt}},
 {id:'marca',from:e.brand,to:transcript.durationSec,kind:'brand',component:'Outro',structures:[],action:'Las partículas y los anillos de marca se mueven durante la llamada a seguir MediShort360.',label:'MEDISHORT360',factIds:[],props:{...controls,brand:'MEDISHORT360',tagline:'SÍGUENOS EN MEDISHORT360'}},
].map(s=>({...s,camera:'static',cameraIntensity:0,transitionIn:0,assetIds:[]}));
for(let i=0;i<scenes.length;i++){if(scenes[i].from!==(i?scenes[i-1].to:0))throw Error('Hueco o solape');}
if(scenes.at(-1).to!==transcript.durationSec)throw Error('Duración no coincide');
fs.writeFileSync(`${dir}/scenes.json`,JSON.stringify({scenes},null,2)+'\n');
fs.writeFileSync(`${dir}/facts.json`,JSON.stringify({facts},null,2)+'\n');
console.log(`Escenas contiguas: 0 → ${e.armAt} → ${e.brand} → ${transcript.durationSec}`);
