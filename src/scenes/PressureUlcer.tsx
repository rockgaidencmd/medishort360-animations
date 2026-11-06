import React from 'react';
import {AbsoluteFill,interpolate,spring,useVideoConfig} from 'remotion';
import {BodyOnBed,TissueCrossSection,PressureForce,CapillaryCompression,OxygenParticles,CellDeath,BlanchTest,BlisterWound,PatientTurn,TimeClock} from '../anatomy/PressureTissue';
import {shotAt,type Shot} from '../motion/shots';
import {theme} from '../styles/theme';
import {Outro} from './Outro';
import type {SceneProps} from './types';

const c=theme.colors,a=theme.anatomy;
export const ramp=(t:number,start:number,end:number)=>{const p=Math.max(0,Math.min(1,(t-start)/Math.max(.001,end-start)));return p*p*(3-2*p);};
type Events=Record<string,number>;
const modes=['hook','body','compression','capillary','oxygen','cells','necrosis','deep','skin','wound','care','outro'] as const;

/** Datos de medición del diseño; las capturas deben contrastar los cuerpos visibles. */
export const pressureMetrics=(t:number,e:Events)=>{
 const macro=(t>=e.capillaries&&t<e.deep)||(t>=e.care&&t<e.outro);
 const cells=macro&&t>=e.cells;
 return {macroZoom:macro?8:null,minCellBodyPx:cells?172:null,minRedCellBodyPx:macro?120:null,minFontPx:40,watermark:true,reason:macro?null:'Vista externa, corte general o cierre; no hay microscopio activo.'};
};

export const PressureUlcer:React.FC<SceneProps>=({t:raw,props})=>{
 const t=Math.max(0,raw),{fps}=useVideoConfig(),e=props.events as Events;
 const starts=[0,e.body,e.compression,e.capillaries,e.oxygen,e.cells,e.necrosis,e.deep,e.outside,e.dark,e.care,e.outro];
 let active=0;starts.forEach((s,i)=>{if(t>=s)active=i;});
 const fade=.6;
 const opacity=(i:number)=>i===active?(active===0?1:ramp(t,starts[active]-.12,starts[active]+fade-.12)):(i===active-1?1:0);
 const pressure=ramp(t,e.compression,e.capillaries)*(1-ramp(t,e.release,e.reflow));
 const death=ramp(t,e.injury,e.necrosis),necrosis=t>=e.necrosis;
 const turn=ramp(t,e.turn,e.release),recovery=ramp(t,e.protect,e.outro);
 // Flujo integrado de la presión: continuo al detenerse y al recuperar perfusión.
 const flowTime=t<e.capillaries? t : e.capillaries+(t>e.release?(t-e.release)*ramp(t,e.release,e.reflow):0);
 const shots:Shot[]=[{from:0,to:e.body,zoom:1,focusX:500,focusY:500},{from:e.body,to:e.bone,zoom:1,focusX:500,focusY:500},{from:e.bone,to:e.compression,zoom:1.1,focusX:500,focusY:500,blurBackground:1.5}];
 const shot=shotAt(t,shots);
 const Tag=({text,x,y,toX,toY,at}: {text:string;x:number;y:number;toX:number;toY:number;at:number})=>t>=at?<g>
  <path d={`M${x} ${y+12} L${toX} ${toY}`} fill="none" stroke={c.text} strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(t,at,at+.35)}/>
  <rect x={x-10} y={y-43} width={text.length*25+24} height="59" rx="12" fill={c.panelDeep}/>
  <text x={x} y={y} fill={c.text} fontSize="42" fontWeight="700">{text}</text>
 </g>:null;
 const Section=({small=false,damage=death}: {small?:boolean;damage?:number})=><g transform={small?'translate(50 255) scale(.98 .52)':'translate(40 330)'}>
  <TissueCrossSection t={t} pressure={pressure} damage={damage}/><PressureForce pressure={pressure} t={t}/>
 </g>;
 const Micro=({full=false,dy=0}:{full?:boolean;dy?:number})=><g>
  <rect x="40" y={full?300:980} width="1000" height={full?1320:740} rx="55" fill={c.panelDeep}/>
  <svg x="40" y={(full?420:970)+dy} width="1000" height={full?1100:750} viewBox={full?'0 0 1000 1000':'0 160 1000 750'} overflow="hidden">
   <g transform="scale(8)">
    {t>=e.capillaries&&<CapillaryCompression t={t} pressure={pressure} flowTime={flowTime}/>}
    {t>=e.oxygen&&t<e.deep&&<OxygenParticles t={t} loss={ramp(t,e.oxygen,e.cells)} nutrientLoss={ramp(t,e.nutrients,e.cells)}/>}
    {t>=e.cells&&<CellDeath t={t} damage={death} necrosis={necrosis} recovery={recovery}/>}
   </g>
  </svg>
  {!full&&<><path d="M560 670 L70 995 M660 670 L1010 995" stroke={c.mint} strokeWidth="5" fill="none" opacity=".65"/><ellipse cx="610" cy="650" rx="90" ry="40" fill="none" stroke={c.mintBright} strokeWidth="10"/></>}
  {t>=e.capillaries&&<Tag text="Capilares" x={75} y={full?370:935} toX={210} toY={full?700:1090} at={e.capillaries}/>}
 </g>;
 const layers=modes.map((mode,i)=>{
  const op=opacity(i);if(op<=0)return null;
  const transition=ramp(t,starts[i]-.12,starts[i]+.48);
  return <g key={mode} opacity={op} clipPath={i>0?`url(#pressure-transition-${i})`:undefined} style={{filter:mode==='deep'?`blur(${(1-transition)*3}px)`:undefined}}>
   <rect width="1080" height="1720" fill="url(#pressure-bg)"/>
   {mode==='hook'&&<>
    <g transform="translate(40 330)"><BlanchTest t={t} redness={0} press={0} showFinger={false}/></g>
    <g opacity={ramp(t,e.hookDeath,e.hookDeath+.6)} transform="translate(85 1010) scale(.9 .5)"><TissueCrossSection t={t} pressure={.3} damage={ramp(t,e.hookDeath,e.greeting)}/></g>
    <ellipse cx="620" cy="1040" rx={220+Math.sin(t)*8} ry="160" fill="none" stroke={c.mintBright} strokeWidth="12"/>
   </>}
   {mode==='body'&&<>
    <g opacity={1-ramp(t,e.bone-.12,e.bone+.48)} transform={`translate(40 280) scale(${shot.zoom})`}><BodyOnBed t={t} pressure={1}/></g>
    {t>=e.bone-.12&&<g opacity={ramp(t,e.bone-.12,e.bone+.48)}><Section damage={0}/></g>}
    <Tag text="Hueso" x={780} y={1220} toX={710} toY={1125} at={e.bone}/>
   </>}
   {(mode==='compression'||mode==='deep')&&<>
    <Section damage={mode==='deep'?1:0}/>
    <Tag text="Piel" x={75} y={450} toX={280} toY={530+pressure*150} at={e.bone}/>
    <Tag text="Grasa" x={790} y={650} toX={730} toY={730+pressure*85} at={e.bone}/>
    <Tag text="Músculo" x={55} y={940} toX={350} toY={935} at={e.bone}/>
    <Tag text="Hueso" x={780} y={1220} toX={710} toY={1125} at={e.bone}/>
    {mode==='deep'&&<Tag text="Necrosis" x={390} y={1470} toX={520} toY={1000} at={e.necrosis}/>}
   </>}
   {(mode==='capillary'||mode==='oxygen')&&<><Section small damage={0}/><Micro/></>}
   {(mode==='cells'||mode==='necrosis')&&<>
    <Micro full/>
    {mode==='necrosis'&&<g transform={`translate(330 1540) scale(${.92+.08*spring({frame:(t-e.necrosis)*fps,fps,config:{damping:16}})})`}>
     <text fontSize="64" fontWeight="800" fill={c.text}>NECROSIS</text><path d="M0 20 H370" stroke={c.amber} strokeWidth="10"/>
    </g>}
   </>}
   {mode==='skin'&&<>
    <g transform="translate(40 430)"><BlanchTest t={t} redness={ramp(t,e.red,e.blanch)} press={t>=e.finger?Math.sin(Math.min(1,(t-e.finger)/(e.dark-e.finger))*Math.PI):0}/><TimeClock t={t} progress={ramp(t,e.outside,e.dark)}/></g>
   </>}
   {mode==='wound'&&<>
    <g transform="translate(40 380)"><BlisterWound dark={ramp(t,e.dark,e.rupture)} open={ramp(t,e.rupture,e.ulcer)} blister={0}/><TimeClock t={t} progress={ramp(t,e.dark,e.care)}/></g>
   </>}
   {mode==='care'&&<>
    <g transform="translate(50 250) scale(.98 .65)"><PatientTurn t={t} pressure={pressure} turn={turn}/></g><Micro/>
    {t>=e.protect&&<path d="M830 1530 L880 1580 985 1460" fill="none" stroke={c.mintBright} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-recovery}/>}
   </>}
  </g>;
 });
 return <AbsoluteFill style={{fontFamily:theme.font.family}}>
  <svg width="100%" height="100%" viewBox="0 0 1080 1920">
   <defs>
    <radialGradient id="pressure-bg"><stop stopColor={c.bg}/><stop offset="1" stopColor={c.panelDeep}/></radialGradient>
    {modes.map((mode,i)=>{
     const p=ramp(t,starts[i]-.12,starts[i]+.48);
     return <clipPath id={`pressure-transition-${i}`} key={mode}>
      {['body','compression','cells','skin'].includes(mode)?<circle cx="540" cy="960" r={Math.max(1,p*2300)}/>:
       mode==='capillary'?<rect x="0" y={1920*(1-p)} width="1080" height="1920"/>:
       mode==='care'?<rect x={1080*(1-p)} y="0" width="1080" height="1920"/>:
       <rect x="0" y="0" width="1080" height="1920"/>}
     </clipPath>;
    })}
   </defs>
   <rect width="1080" height="1920" fill="url(#pressure-bg)"/>
   {layers}
   {Array.from({length:7},(_,i)=><circle key={i} cx={60+i*155+Math.sin(t*.5+i)*15} cy={280+(i*167+t*12)%1380} r="22" fill={c.mint} opacity=".06"/>)}
   {t<=e.body&&<g><rect x="40" y="140" width="1000" height="120" rx="30" fill={c.panelDeep}/><text x="540" y="218" textAnchor="middle" fontSize="58" fontWeight="800" fill={c.label}>ÚLCERAS POR PRESIÓN</text></g>}
   {t>=e.greeting&&t<e.body&&<g opacity={Math.sin(Math.PI*ramp(t,e.greeting,e.body))} transform="translate(890 350)"><circle r="90" fill={c.panelDeep} stroke={c.mintBright} strokeWidth="9"/><path d="M-55 0 H-20 L0 -38 18 38 35 0 H60" stroke={c.mintBright} strokeWidth="10" fill="none"/></g>}
  </svg>
  {t>=e.outro&&<AbsoluteFill style={{opacity:ramp(t,e.outro,e.outro+.6)}}><Outro t={t-e.outro} durationSec={e.end-e.outro} props={{brand:'',tagline:''}}/></AbsoluteFill>}
 </AbsoluteFill>;
};
