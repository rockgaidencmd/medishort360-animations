import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
const scale=process.argv.includes('--final')?'1':'0.6666666666666666';
fs.mkdirSync('public/renders',{recursive:true});
const jobs=[['ICUOpening3DProof','public/renders/icu.mp4'],['Arteriole3DProof','public/renders/arteriole.mp4'],['HandPerfusion3DProof','public/renders/hand.mp4'],['ICUInfusionBridge','public/renders/infusion.mp4'],['NursingReview','public/renders/nursing.mp4'],['Vasopresores3DReview','output/vasopresores-revision-completa-3d-v1.mp4']];
for(const [id,out] of jobs)execFileSync(process.execPath,['-r','./scripts/node-network-shim.cjs','node_modules/@remotion/cli/remotion-cli.js','render','src/index.tsx',id,out,'--codec','h264','--audio-codec','aac','--gl=swangle','--concurrency','2','--scale',scale],{stdio:'inherit'});
