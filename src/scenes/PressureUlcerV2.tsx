import React from 'react';
import {AbsoluteFill,spring,useVideoConfig} from 'remotion';
import {TissueCrossSection,PressureForce,CapillaryCompression,OxygenParticles,CellDeath,BlanchTest,BlisterWound,PatientTurn,TimeClock} from '../anatomy/PressureTissue';
import {HospitalRoomArt,CellSoulArt,StructureLabelArt,type LabelProps,type Site} from './PressureUlcerV2Parts';
import {shotAt,type Shot} from '../motion/shots';
import {theme} from '../styles/theme';
import {Outro} from './Outro';
import type {SceneProps} from './types';
const c=theme.colors,a=theme.anatomy;
const ramp=(t:number,start:number,end:number)=>{const p=Math.max(0,Math.min(1,(t-start)/Math.max(.001,end-start)));return p*p*(3-2*p);};
type Events=Record<string,number>;
const modes=['hook','body','compression','capillary','oxygen','cells','necrosis','deep','skin','wound','care','outro'] as const;
export const pressureMetricsV2=(t:number,e:Events)=>{const macro=(t>=e.capillaries&&t<e.deep)||(t>=e.care&&t<e.outro),full=t>=e.cells&&t<e.deep;return {macroZoom:macro?8:null,minCellBodyPx:macro?(full?216:172):null,minRedCellBodyPx:macro&&!full?122:null,minFontPx:36,watermark:true};};

export const PressureUlcer:React.FC<SceneProps>=({t:raw,props})=>{
 const t=Math.max(0,raw),{fps}=useVideoConfig(),e=props.events as Events,site:Site=props.site==='talon'?'talon':'sacro';
 const starts=[0,e.body,e.compression,e.capillaries,e.oxygen,e.cells,e.necrosis,e.deep,e.outside,e.evolution,e.care,e.outro];
 let active=0;starts.forEach((s,i)=>{if(t>=s)active=i;});const mode=modes[active],cleanCells=mode==='cells'||mode==='necrosis';
 const pressure=ramp(t,e.compression,e.capillaries)*(1-ramp(t,e.turn,e.reflow));
 const death=ramp(t,e.injury,e.necrosis),turn=1-pressure,recovery=(1-pressure)*ramp(t,e.viable,e.outro);
 const flowTime=t<e.capillaries?t:e.capillaries+(t>e.turn?(t-e.turn)*(1-pressure):0);
 const focusX=site==='sacro'?550:900,focusY=site==='sacro'?795:827;
 const shots:Shot[]=[{from:0,to:0,zoom:1,focusX:500,focusY:650},{from:0,to:e.openingEnd,zoom:2.2,focusX,focusY,ease:'smooth',blurBackground:1.2},{from:e.openingEnd,to:e.body,zoom:2.2,focusX,focusY}];
 const camera=shotAt(t,shots);
 const label=(text:string,x:number,y:number,toX:number,toY:number,at:number,color?:string):LabelProps=>({text,x,y,toX,toY,at,t,color});
 let labels:LabelProps[]=[];
 if(mode==='hook'){
  const project=(x:number,y:number)=>({x:540+(x-camera.focusX)*camera.zoom,y:940+(y-camera.focusY)*camera.zoom});
  const s=project(550,795),heel=project(927,827);labels=[label(site==='sacro'?'Región sacra':'Talones',65,420,site==='sacro'?s.x:heel.x,site==='sacro'?s.y:heel.y,0)];
  if(site==='sacro'&&camera.zoom<1.35)labels.push(label('Talones',700,1550,heel.x,heel.y,0,c.amber));
 }else if(mode==='body')labels=t>=e.bone?[label('Epidermis',65,405,300,560,e.bone),label('Dermis',730,590,720,650,e.bone),label('Tejido graso',65,900,360,880,e.bone),label('Hueso',760,1510,740,1420,e.bone)]:[label('Región sacra',65,400,590,1080,e.body),label('Talones',720,1500,950,1125,e.body,c.amber)];
 else if(mode==='compression')labels=[label('Músculo',65,1170,380,1150,e.compression,c.rose),label('Hueso',760,1520,740,1420,e.bone),label('Capilar',65,600,350,700,e.compression,c.rose)];
 else if(mode==='capillary')labels=[label('Capilar',65,930,215,1075,e.capillaries,c.rose),label('Glóbulos rojos',630,1015,650,1120,e.capillaries,c.rose),label('Célula',65,1670,220,1490,e.capillaries),label('Núcleo',740,1690,860,1550,e.capillaries,a.nucleus)];
 else if(mode==='oxygen')labels=[label('Capilar',65,930,215,1075,e.capillaries,c.rose),label('Célula',65,1660,220,1490,e.capillaries),label('Oxígeno',65,1230,220,1280,e.oxygen),...(t>=e.nutrients?[label('Nutrientes',710,1230,800,1290,e.nutrients,c.amber)]:[])];
 else if(cleanCells)labels=[label('Célula',65,1540,180,1300,e.cells),label('Núcleo',720,1560,890,1310,e.cells,a.nucleus)];
 else if(mode==='deep')labels=[label('Tejido graso',65,850,360,880,e.deep,c.amber),label('Músculo',65,1120,350,1130,e.deep,c.rose),label('Hueso',760,1510,740,1420,e.deep),label('Necrosis',390,1600,550,1250,e.deep,c.amber)];
 else if(mode==='wound'&&t>=e.blister)labels=[t<e.rupture?label('Ampolla',65,450,545,725,e.blister,c.amber):label('Herida abierta',65,450,545,855,e.rupture,c.rose)];
 else if(mode==='care')labels=[label('Capilar',65,930,215,1075,e.care,c.rose),label('Glóbulos rojos',620,1010,650,1120,e.care,c.rose),label('Célula',65,1680,220,1490,e.care)];
 const section=(small=false,damage=death)=><g transform={small?'translate(40 210) scale(1 .69)':'translate(40 280) scale(1 1.42)'}><TissueCrossSection volume t={t} pressure={pressure} damage={damage}/><PressureForce t={t} pressure={pressure}/></g>;
 const micro=(full=false)=><g>
  <rect x="40" y={full?285:920} width="1000" height={full?1430:800} rx="45" fill={c.panelDeep} stroke={c.mint} strokeWidth="3"/>
  <svg x="40" y={full?300:920} width="1000" height={full?1300:800} viewBox={full?'0 0 1000 1300':'0 120 1000 800'} overflow="hidden">
   {full&&<CellSoulArt t={t} from={e.death} to={e.deep}/>}
   {!full&&<g transform="scale(8)"><CapillaryCompression volume t={t} pressure={pressure} flowTime={flowTime}/><OxygenParticles t={t} loss={ramp(t,e.oxygen,e.cells)} nutrientLoss={ramp(t,e.nutrients,e.cells)}/></g>}
   {full&&t>=e.necrosis&&<path d="M40 550 Q150 400 325 490 Q500 390 675 490 Q850 400 960 550 Q890 690 680 635 Q500 710 320 635 Q100 690 40 550Z" transform="translate(0 -160)" fill={a.maskBlack} opacity={ramp(t,e.necrosis,e.deep)}/>}
   <g transform="scale(8)"><CellDeath volume t={t} damage={death} necrosis={t>=e.necrosis} recovery={recovery} large={full} nucleusLoss={ramp(t,e.death,e.deathEnd)}/></g>
  </svg>
  {!full&&<><path d="M560 710 L70 930 M660 710 L1010 930" stroke={c.mint} strokeWidth="5" fill="none" opacity=".7"/><ellipse cx="610" cy="690" rx="90" ry="40" fill="none" stroke={c.mintBright} strokeWidth="9"/></>}
 </g>;
 const timeline=()=>{
  const progress=ramp(t,e.evolution,e.ulcer);
  return <g>
   <rect x="40" y="1260" width="1000" height="450" rx="35" fill={c.panelDeep}/><path d="M180 1430 H880" stroke={c.mint} strokeWidth="9" strokeDasharray="14 18"/>
   {[150,500,850].map((x,i)=><g key={x} transform={`translate(${x} 1420)`}><circle r="88" fill={c.panel} stroke={progress*3>=i?c.amber:c.mint} strokeWidth="8"/>
    {i===0?<ellipse rx="52" ry="38" fill={a.wound}/>:i===1?<><ellipse rx="55" ry="33" fill={a.skinLight}/><ellipse cy="-23" rx="43" ry="38" fill={a.fat} stroke={a.paper} strokeWidth="5"/></>:<path d="M-55 0 Q-15 -70 10 -25 Q55 -55 62 10 Q15 70 -10 30 Q-45 55 -55 0" fill={a.maskBlack} stroke={a.wound} strokeWidth="9"/>}
   </g>)}
   {['Piel roja','Ampolla','Herida abierta'].map((text,i)=><text key={text} x={[150,500,850][i]} y="1580" textAnchor="middle" fontSize="36" fontWeight="700" fill={a.maskWhite} data-structure-label={text}>{text}</text>)}
  </g>;
 };
 const layers=modes.map((m,i)=>{
  if(i!==active&&i!==active-1)return null;if(cleanCells&&i!==active)return null;
  const p=ramp(t,starts[i]-.12,starts[i]+.48),op=i===active?(cleanCells||i===0?1:p):1;
  return <g key={m} opacity={op} style={{filter:m==='deep'?`blur(${(1-p)*2}px)`:undefined}} clipPath={i>0?`url(#pressure-v2-${i})`:undefined}>
   <rect width="1080" height="1720" fill="url(#pressure-bg-v2)"/>
   {m==='hook'&&<>
    <svg x="40" y="280" width="1000" height="1390" viewBox="0 0 1000 1390" overflow="hidden"><g transform={`translate(500 660) scale(${camera.zoom}) translate(${-camera.focusX} ${-camera.focusY})`}><HospitalRoomArt t={t} pressure={1} site={site} backgroundBlur={camera.blurBackground}/></g></svg>
    {t>=e.hookDeath&&<g opacity={ramp(t,e.hookDeath,e.hookDeath+.35)}><circle cx="680" cy="1160" r={240+Math.sin(t)*4} fill={c.panelDeep} stroke={c.mintBright} strokeWidth="12"/>
     <svg x="445" y="925" width="470" height="470" viewBox="0 0 1000 1000" style={{clipPath:'circle(49%)'}}><TissueCrossSection volume t={t} pressure={.6} damage={ramp(t,e.hookDeath,e.openingEnd)}/></svg><path d="M840 1330 L965 1460" stroke={c.mintBright} strokeWidth="28" strokeLinecap="round"/></g>}
   </>}
   {m==='body'&&<><svg x="40" y="280" width="1000" height="1300" viewBox="0 0 1000 1300" opacity={1-ramp(t,e.bone-.12,e.bone+.48)}><HospitalRoomArt t={t} pressure={1} site={site} backgroundBlur={camera.blurBackground}/></svg><g opacity={ramp(t,e.bone-.12,e.bone+.48)}>{section(false,0)}</g></>}
   {(m==='compression'||m==='deep')&&section(false,m==='deep'?1:0)}
   {(m==='capillary'||m==='oxygen')&&<>{section(true,0)}{micro()}</>}
   {(m==='cells'||m==='necrosis')&&<>{micro(true)}{m===mode&&t>=e.necrosis&&<g transform={`translate(320 1660) scale(${.96+.04*spring({frame:(t-e.necrosis)*fps,fps,config:{damping:20}})})`}><rect x="-35" y="-65" width="485" height="92" rx="22" fill={c.panelDeep} stroke={c.amber} strokeWidth="3"/><text fontSize="64" fontWeight="800" fill={a.maskWhite}>NECROSIS</text></g>}</>}
   {m==='skin'&&<><g transform="translate(-70 330) scale(1.18)"><BlanchTest t={t} redness={ramp(t,e.red,e.blanch)} press={Math.sin(Math.PI*ramp(t,e.blanch,e.evolution))} showFinger={t>=e.blanch}/></g><g transform="translate(0 120)"><TimeClock t={t} progress={ramp(t,e.outside,e.ulcer)}/></g></>}
   {m==='wound'&&<><g transform="translate(-70 100) scale(1.18)">{t<e.blister?<BlanchTest t={t} redness={1} press={0} showFinger={false}/>:<BlisterWound dark={ramp(t,e.dark,e.rupture)} open={ramp(t,e.rupture,e.ulcer)} blister={ramp(t,e.blister,e.dark)*(1-ramp(t,e.rupture,e.ulcer))}/>}</g><g transform="translate(0 120)"><TimeClock t={t} progress={ramp(t,e.outside,e.ulcer)}/></g>{m===mode&&timeline()}</>}
   {m==='care'&&<><g transform="translate(40 120) scale(1 .76)"><PatientTurn t={t} pressure={pressure} turn={turn}/><g opacity={pressure} fill="none" stroke={c.amber} strokeWidth="14" strokeLinecap="round">{[550,927].map(x=><path key={x} d={`M${x} 410 V570 M${x-22} 545 L${x} 570 ${x+22} 545`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(t,e.care,e.turn)}/>)}</g></g>{micro()}{t>=e.viable&&<path d="M795 1370 L870 1440 995 1275" stroke={c.mintBright} strokeWidth="24" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-recovery}/>}</>}
  </g>;
 });
 return <AbsoluteFill style={{fontFamily:theme.font.family}}><svg width="100%" height="100%" viewBox="0 0 1080 1920" data-ulcera-v2="true">
  <defs><radialGradient id="pressure-bg-v2"><stop stopColor={c.bg}/><stop offset="1" stopColor={c.panelDeep}/></radialGradient>{modes.map((m,i)=>{const p=ramp(t,starts[i]-.12,starts[i]+.48);return <clipPath key={m} id={`pressure-v2-${i}`}>{['body','compression','cells','skin'].includes(m)?<circle cx="540" cy="960" r={Math.max(1,p*2300)}/>:m==='capillary'?<rect x="0" y={1920*(1-p)} width="1080" height="1920"/>:m==='care'?<rect x={1080*(1-p)} width="1080" height="1920"/>:<rect width="1080" height="1920"/>}</clipPath>;})}</defs>
  <rect width="1080" height="1920" fill="url(#pressure-bg-v2)"/>{layers}
  {!cleanCells&&Array.from({length:6},(_,i)=><circle key={i} cx={65+i*170+Math.sin(t*.5+i)*10} cy={300+(i*167+t*12)%1360} r="22" fill={c.mint} opacity=".045"/>)}
  {labels.slice(0,4).map(l=><StructureLabelArt key={l.text} {...l}/>)}
  {t<=e.body&&<g><rect x="40" y="140" width="1000" height="112" rx="28" fill={c.panelDeep}/><text x="540" y="216" textAnchor="middle" fontSize="58" fontWeight="800" fill={c.label}>ÚLCERAS POR PRESIÓN</text></g>}
 </svg>{t>=e.outro&&<AbsoluteFill style={{opacity:ramp(t,e.outro,e.outro+.6)}}><Outro t={t-e.outro} durationSec={e.end-e.outro} props={{brand:'',tagline:''}}/></AbsoluteFill>}</AbsoluteFill>;
};
