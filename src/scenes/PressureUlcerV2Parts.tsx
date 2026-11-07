import React from 'react';
import {theme} from '../styles/theme';
import {BodyOnBed} from '../anatomy/PressureTissue';
import type {SceneProps} from './types';

const c=theme.colors,a=theme.anatomy;
export type Site='sacro'|'talon';
export const smooth=(x:number)=>{const p=Math.max(0,Math.min(1,x));return p*p*(3-2*p);};

export const HospitalRoomArt:React.FC<{t:number;pressure:number;turn?:number;site?:Site;backgroundBlur?:number}>=({t,pressure,turn=0,site='sacro',backgroundBlur=0})=><g>
 <defs>
  <linearGradient id="room-wall" x2="1" y2="1"><stop stopColor={c.bg}/><stop offset="1" stopColor={c.panelDeep}/></linearGradient>
  <linearGradient id="bed-volume" x2="0" y2="1"><stop stopColor={a.paper}/><stop offset="1" stopColor={c.mint}/></linearGradient>
 </defs>
 <rect width="1000" height="1300" rx="35" fill="url(#room-wall)"/>
 <g style={{filter:backgroundBlur>0?`blur(${backgroundBlur}px)`:undefined}}>
 <g transform={`translate(${Math.sin(t*.45)*4} 0)`}>
  <rect x="35" y="25" width="430" height="455" rx="35" fill={c.panel}/>
  <rect x="65" y="55" width="370" height="395" rx="25" fill={c.mint} opacity=".22"/>
  <path d="M250 65 V450 M70 255 H430" stroke={c.mint} strokeWidth="14" opacity=".45"/>
  <path d="M500 0 V500 M550 0 V500 M600 0 V500" stroke={a.vein} strokeWidth="28" opacity=".12"/>
 </g>
 <g transform={`translate(610 ${Math.sin(t*.7)*2})`}>
  <rect x="0" y="40" width="300" height="240" rx="30" fill={c.panelDeep} stroke={c.mint} strokeWidth="8"/>
  <svg x="12" y="65" width="275" height="150" viewBox="0 0 300 160"><path d={`M${-((t*60)%140)} 90 h90 l15 -20 15 20 12 -65 18 120 20 -55 h90 l15 -20 15 20 12 -65 18 120 20 -55 h90`} fill="none" stroke={c.mintBright} strokeWidth="9"/></svg>
  <path d="M150 280 V370 M80 370 H220" stroke={a.stone} strokeWidth="18"/>
 </g>
 <g transform="translate(875 330)">
  <path d="M45 -70 V650 M-15 580 L45 540 105 580 M-15 -60 H115" stroke={c.mint} strokeWidth="12" fill="none"/>
  <rect x="-50" y="-30" width="130" height="190" rx="30" fill={a.paper} stroke={a.vein} strokeWidth="8"/>
  <rect x="-37" y="40" width="104" height="105" rx="20" fill={c.mintBright} opacity=".55"/>
  <path d="M15 160 V230 Q-80 400 -180 590" stroke={c.mint} strokeWidth="10" fill="none"/>
  <ellipse cx="15" cy={172+(t*50)%65} rx="9" ry="15" fill={c.mintBright}/>
 </g>
 </g><rect x="10" y="1010" width="980" height="170" rx="55" fill="url(#bed-volume)"/>
 <path d="M85 1160 V1260 M905 1160 V1260" stroke={a.stone} strokeWidth="30"/>
 <g transform="translate(0 180)"><BodyOnBed t={t} pressure={pressure} turn={turn}/></g>
 <ellipse cx={site==='sacro'?550:927} cy={site==='sacro'?795:827} rx="65" ry="35" fill="none" stroke={c.mintBright} strokeWidth="9" opacity={.6+Math.sin(t*3)*.2}/>
</g>;

export type LabelProps={text:string;x:number;y:number;toX:number;toY:number;t:number;at:number;color?:string;fontSize?:number};
export const StructureLabelArt:React.FC<LabelProps>=({text,x,y,toX,toY,t,at,color=c.mintBright,fontSize=40})=>{
 if(t<at)return null;
 const p=smooth((t-at)/.3),width=text.length*fontSize*.56+58;
 return <g data-structure-label={text}>
  <path d={`M${x+20} ${y+4} L${toX} ${toY}`} fill="none" stroke={color} strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
  <circle cx={toX} cy={toY} r={22+Math.sin(t*3)*3} fill="none" stroke={color} strokeWidth="4" opacity=".65"/>
  <rect x={x-12} y={y-fontSize-9} width={width} height={fontSize+27} rx="16" fill={c.panelDeep} stroke={color} strokeWidth="2"/>
  <circle cx={x+9} cy={y-fontSize*.35} r="7" fill={color}/>
  <text x={x+27} y={y} fill={a.maskWhite} fontFamily={theme.font.family} fontSize={fontSize} fontWeight="700">{text}</text>
 </g>;
};

/** Metáfora animada solicitada; no representa un fenómeno biológico. */
export const CellSoulArt:React.FC<{t:number;from:number;to:number}>=({t,from,to})=><g data-cell-soul="metafora">
 <g transform={`translate(500 ${125+Math.sin(t)*5})`}>
  <path d="M-165 10 Q-190 -65 -115 -70 Q-95 -150 -10 -110 Q85 -150 115 -75 Q195 -65 165 15Z" fill={a.paper} stroke={c.mint} strokeWidth="8"/>
 </g>
 {[0,1,2].map(i=>{
  const start=from+i*(to-from)*.065,travel=(to-from)*.72,p=smooth((t-start)/travel);
  if(t<start)return null;
  const x=150+i*350+(500-(150+i*350))*p+Math.sin(t*3+i)*20*p,y=390-225*p;
  const alpha=p<.94?.64:Math.max(0,(1-p)/.06)*.64;
  return <g key={i}>
   <ellipse cx={150+i*350} cy="260" rx="74" ry="20" fill="none" stroke={c.amber} strokeWidth="9" opacity={1-p}/>
   <g transform={`translate(${x} ${y})`} opacity={alpha}>
    <path d="M-70 4 Q-175 -105 -180 -25 Q-150 50 -80 46 M70 4 Q175 -105 180 -25 Q150 50 80 46" fill={a.paper} stroke={c.mint} strokeWidth="5"/>
    <ellipse rx="80" ry="90" fill={c.mint} stroke={a.paper} strokeWidth="7"/>
    <ellipse rx="23" ry="28" fill={a.paper}/>
    <ellipse cy="-115" rx="60" ry="18" fill="none" stroke={c.amber} strokeWidth="9"/>
   </g>
   {[0,1,2,3].map(j=><path key={j} d="M0 -11 L8 0 0 11 -8 0Z" stroke={c.amber} strokeWidth="5" transform={`translate(${x+Math.sin(j*2+i)*100} ${y+55+j*25})`} opacity={alpha*.8}/>)}
   {p>.8&&<circle cx={500+(i-1)*60} cy="135" r={30+(p-.8)*150} fill={a.paper} opacity={(1-p)*3}/>}
  </g>;
 })}
</g>;

// Adaptadores con SceneProps: se pueden previsualizar por separado sin contratos ficticios.
export const HospitalRoom:React.FC<SceneProps>=({t,props})=><svg viewBox="0 0 1000 1300" width="100%" height="100%"><HospitalRoomArt t={t} pressure={typeof props.pressure==='number'?props.pressure:1} site={props.site==='talon'?'talon':'sacro'}/></svg>;
export const CellSoul:React.FC<SceneProps>=({t,props})=><svg viewBox="0 0 1000 1100" width="100%" height="100%"><CellSoulArt t={t} from={typeof props.from==='number'?props.from:0} to={typeof props.to==='number'?props.to:3}/></svg>;
export const StructureLabel:React.FC<SceneProps>=({t,props})=><svg viewBox="0 0 1080 1920" width="100%" height="100%"><StructureLabelArt text={typeof props.text==='string'?props.text:'Célula'} x={80} y={500} toX={540} toY={950} at={0} t={t}/></svg>;
