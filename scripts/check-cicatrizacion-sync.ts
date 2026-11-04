import {strict as assert} from 'node:assert';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {masterDefaults,masterHealingAt} from '../src/compositions/MasterHealing';
const dir='projects/cicatrizacion-herida';
const raw=readFileSync(`${dir}/transcript.json`,'utf8');const transcript=JSON.parse(raw);const original=JSON.parse(readFileSync(`${dir}/transcript.whisper-original.json`,'utf8'));const map=JSON.parse(readFileSync(`${dir}/events.json`,'utf8'));const props=JSON.parse(readFileSync(`${dir}/timing-props.json`,'utf8'));const scenes=JSON.parse(readFileSync(`${dir}/scenes.json`,'utf8')).scenes;
const words=transcript.segments.flatMap((s:any)=>s.words);const before=original.segments.flatMap((s:any)=>s.words);
assert.deepEqual(words.map((w:any)=>[w.start,w.end]),before.map((w:any)=>[w.start,w.end]));
assert.equal(createHash('sha256').update(raw).digest('hex'),map.transcriptSha256);
for(const w of words){assert(w.start<w.end);assert(w.end<=transcript.durationSec);}
const fps=map.fps;const wound=scenes.find((s:any)=>s.component==='WoundHealing');const clockOffset=wound.from-Math.round(wound.from*fps)/fps;
let maxLead=0;
for(const event of map.events){assert.equal(event.wordStart,words[event.wordIndices[0]].start);assert.equal(event.visualStart,props.eventTimes[event.key]);assert(event.leadSec<=.15&&event.leadSec>=0);assert(event.captureFrame/fps>=event.wordStart-1e-9);assert(event.captureFrame/fps-event.wordStart<1/fps+1e-9);
 const isChild=['tripAt','impactAt'].includes(event.key);const quantizedStart=Math.ceil((event.visualStart-(isChild?0:clockOffset))*fps-1e-8)/fps;const lead=event.wordStart-quantizedStart;assert(lead<=.15+1e-9&&lead>=-1/fps);maxLead=Math.max(maxLead,lead);
}
const starts=['hemostasis','inflammation','proliferation','remodeling','recovered'];const expected=[0,.12,.35,.8,1];for(let i=0;i<starts.length;i++)assert(Math.abs(masterHealingAt(props.eventTimes[starts[i]],props)-expected[i])<1e-8);
let previous=0;for(let frame=0;frame<Math.ceil(transcript.durationSec*fps);frame++){const h=masterHealingAt(frame/fps,props);assert(h>=previous-1e-9&&h>=0&&h<=1);previous=h;}
for(let i=0;i<scenes.length;i++)assert.equal(scenes[i].from,i?scenes[i-1].to:0);assert.equal(scenes.at(-1).to,transcript.durationSec);
assert(Math.abs(masterHealingAt(12,masterDefaults)-.03)<1e-9);
const srtTime=(seconds:number)=>{const ms=Math.round(seconds*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
writeFileSync(`${dir}/subtitles-word.srt`,words.map((w:any,i:number)=>`${i+1}\n${srtTime(w.start)} --> ${srtTime(w.end)}\n${w.word}\n`).join('\n'));
const report={passed:true,wordCount:words.length,eventCount:map.events.length,asrTimesUnchanged:true,allEventsDerivedFromWords:true,maxEarlyVisualStartSec:maxLead,maximumCaptureQuantizationSec:Math.max(...map.events.map((e:any)=>e.captureFrame/fps-e.wordStart)),contiguousScenes:true,monotonicHealing:true,phaseBoundariesFromAudio:true,frames:Math.ceil(transcript.durationSec*fps),transcriptDurationSec:transcript.durationSec,frameDurationSec:Math.ceil(transcript.durationSec*fps)/fps};
writeFileSync(`${dir}/sync-checks.json`,JSON.stringify(report,null,2)+'\n');console.log(report);
