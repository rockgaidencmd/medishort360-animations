import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const map=JSON.parse(fs.readFileSync('projects/cicatrizacion-herida/events.json','utf8'));
const keys=['blood','platelets','fibrin','neutrophils','macrophage','fibroblasts','capillary','keratinocytes','scabDrop','recovered'];
const labels={blood:'sangra',platelets:'plaquetas',fibrin:'fibrina',neutrophils:'neutrofilos',macrophage:'macrofago',fibroblasts:'fibroblastos',capillary:'capilar',keratinocytes:'queratinocitos',scabDrop:'costra-se-desprende',recovered:'piel-recuperada'};
const rows=[];
for(const key of keys){const e=map.events.find(e=>e.key===key);if(!e)throw Error(`Falta ${key}`);const file=`output/previews/audio-${labels[key]}-${e.wordStart.toFixed(3)}s.png`;
 const r=spawnSync('npx',['remotion','still','src/index.tsx','cicatrizacion-herida',file,`--frame=${e.captureFrame}`,'--overwrite'],{stdio:'inherit',shell:process.platform==='win32'});
 if(r.status!==0)process.exit(r.status??1);
 rows.push({...e,file,videoFrameTime:e.captureFrame/map.fps,frameQuantizationSec:e.captureFrame/map.fps-e.wordStart});
}
fs.writeFileSync('projects/cicatrizacion-herida/sync-captures.json',JSON.stringify({source:'Whisper word start; first frame at or after the word, never an estimated timeline.',captures:rows},null,2)+'\n');
