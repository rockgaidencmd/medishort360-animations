import React from 'react';
import {interpolateColors} from 'remotion';
import {RedBloodCell} from './Cells';
import {theme} from '../styles/theme';

const a=theme.anatomy,c=theme.colors;
const limit=(x:number)=>Math.max(0,Math.min(1,x));
export type PressureProps={t:number;pressure:number;damage?:number};

/** REVISAR: esquema educativo de compresión, no clasificación ni escala histológica. */
export const TissueCrossSection:React.FC<PressureProps>=({t,pressure,damage=0})=>{
 const squash=1-.28*pressure;
 return <g>
  <rect x="20" y="720" width="960" height="155" rx="65" fill={a.paper}/>
  <path d="M40 806 Q500 760 960 806" stroke={a.fatOutline} strokeWidth="16" fill="none"/>
  <g transform={`translate(0 ${715*(1-squash)}) scale(1 ${squash})`}>
   <path d="M20 170 Q250 125 500 170 T980 170 V710 H20Z" fill={a.dermis}/>
   <path d="M20 170 Q250 125 500 170 T980 170 V245 H20Z" fill={a.epidermis}/>
   <path d="M20 290 H980 V500 H20Z" fill={a.fat}/>
   {Array.from({length:12},(_,i)=><ellipse key={i} cx={70+i%6*170} cy={345+Math.floor(i/6)*100} rx="62" ry={38+Math.sin(t+i)*2} fill={a.fatOutline} opacity=".5"/>)}
   <path d="M20 520 H980 V715 H20Z" fill={a.wound}/>
   {Array.from({length:7},(_,i)=><path key={i} d={`M30 ${540+i*25} Q500 ${560+i*25+Math.sin(t+i)*3} 970 ${540+i*25}`} stroke={a.dermis} strokeWidth="9" fill="none"/>)}
   <path d="M30 270 Q280 245 500 280 T970 270" stroke={a.capillary} strokeWidth={35-pressure*23} fill="none"/>
   {Array.from({length:8},(_,i)=><ellipse key={i} cx={35+((i*130+t*65*(1-pressure))%920)} cy={270+Math.sin(i+t)*8} rx="25" ry={16-pressure*8} fill={c.bloodDeep}/>)}
   {damage>0&&<path d="M330 710 Q240 610 380 550 Q480 470 630 570 Q760 650 690 715Z" transform={`translate(500 710) scale(${.3+.7*damage}) translate(-500 -710)`} fill={a.maskBlack} opacity={damage*.95}/>}
  </g>
 </g>;
};

export const PressureForce:React.FC<{pressure:number;t:number}>=({pressure,t})=><g opacity={pressure} stroke={c.amber} fill={c.amber} strokeWidth="15" strokeLinecap="round">
 {[190,500,810].map(x=><g key={x} transform={`translate(${x} ${Math.sin(t*2)*4})`}><path d="M0 15 V115 M-22 88 L0 115 22 88" fill="none"/><path d="M0 945 V865 M-22 892 L0 865 22 892" fill="none"/></g>)}
 <rect x="345" y="22" width="310" height="58" rx="20" stroke="none"/>
</g>;

export const BodyOnBed:React.FC<PressureProps & {turn?:number}>=({t,pressure,turn=0})=><g>
 <rect x="15" y="620" width="970" height="205" rx="65" fill={a.paper}/><path d="M20 770 H980" stroke={a.groundDeep} strokeWidth="20"/>
 <g transform={`translate(0 ${Math.sin(t*1.2)*3}) rotate(${-turn*8} 500 570)`}>
  <ellipse cx="175" cy="420" rx="105" ry="120" fill={a.skinLight}/><path d="M90 385 Q150 285 250 350 L266 410 Q200 340 90 385" fill={a.hair}/>
  <path d="M275 390 Q425 350 550 450 L640 540 L535 630 Q410 595 290 575Z" fill={a.shirt}/>
  <path d="M510 530 Q640 480 735 555 L830 610 L950 600 Q985 630 950 660 L805 680 650 620 540 640Z" fill={a.skin}/>
  <path d="M345 400 Q445 470 515 520 L640 545" stroke={a.skinLight} strokeWidth="65" strokeLinecap="round" fill="none"/>
  <path d="M140 435 Q168 446 192 434" stroke={a.ink} strokeWidth="6" fill="none"/>
 </g>
 <g transform={`translate(780 ${700-turn*90})`} opacity={turn}><ellipse rx="170" ry="75" fill={c.mint}/><path d="M-140 0 Q0 -30 140 0" stroke={a.maskWhite} strokeWidth="9" fill="none"/></g>
 {[{x:550,y:615},{x:927,y:647}].map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={48+(Math.sin(t*3+i)+1)*16} fill="none" stroke={c.amber} strokeWidth="9" opacity={pressure*.8}/>)}
</g>;

export const CapillaryCompression:React.FC<PressureProps & {flowTime:number}>=({t,pressure,flowTime})=>{
 const gap=260-pressure*100;
 return <g transform="scale(0.125)">
  <path d={`M20 ${290-gap/2} Q500 ${265-gap/2} 980 ${290-gap/2} V${290+gap/2} Q500 ${265+gap/2} 20 ${290+gap/2}Z`} fill={a.newSkin} stroke={a.capillary} strokeWidth="22"/>
  {Array.from({length:6},(_,i)=>{
   const normal=40+((i*170+flowTime*115)%900),packed=80+i*112;
   const x=normal*(1-pressure)+packed*pressure;
   return <g key={i} transform={`translate(${x-145} ${145+Math.sin(t+i)*5}) scale(1 ${1-pressure*.10})`}><path d="M70 130 H10" stroke={c.rose} strokeWidth="7" opacity=".5"/><RedBloodCell size={290} t={t} seed={i+3}/></g>;
  })}
 </g>;
};

export const OxygenParticles:React.FC<{t:number;loss:number;nutrientLoss?:number}>=({t,loss,nutrientLoss=loss})=><g transform="scale(0.125)">
 {Array.from({length:12},(_,i)=>{const p=(t*.18+i/12)%1;return <g key={i} opacity={limit(1-(i%2?nutrientLoss:loss)-(i%4)*.08)} transform={`translate(${80+i%6*165} ${350+p*270})`}>
  {i%2?<path d="M0 -21 L22 0 0 21 -22 0Z" fill={a.fat}/>:<circle r="21" fill={c.mintBright}/>}
 </g>;})}
</g>;

export const CellDeath:React.FC<{t:number;damage:number;recovery?:number;necrosis?:boolean}>=({t,damage,recovery=0,necrosis=false})=><g transform="scale(0.125)">
 {Array.from({length:6},(_,i)=>{
  const dead=i<3?damage:damage*.12;
  const x=180+i%3*320,y=530+Math.floor(i/3)*210;
  const fill=interpolateColors(dead,[0,.5,1],[a.dermis,a.stone,necrosis?a.maskBlack:a.ink]);
  const r=88+Math.sin(t*1.1+i)*2+dead*12;
  return <g key={i} transform={`translate(${x} ${y})`}>
   {recovery>0&&i>=3&&<circle r={r+22+Math.sin(t*2)*5} fill="none" stroke={c.mintBright} strokeWidth="12" opacity={recovery*.7}/>}
   <circle r={r} fill={fill} stroke={a.newSkin} strokeWidth="7"/>
   <ellipse rx="30" ry="38" fill={dead>.7?a.maskBlack:a.nucleus}/>
   {dead>.25&&<path d="M-68 -15 L-28 3 -43 40 M48 -58 L19 -20 43 5" stroke={a.ink} strokeWidth="9" fill="none" opacity={dead}/>}
  </g>;
 })}
</g>;

export const NecrosisZone:React.FC<{growth:number;t:number}>=({growth,t})=><path d="M265 635 Q280 480 420 465 Q560 375 675 510 Q810 600 690 760 Q505 825 345 755Z" fill={a.maskBlack} opacity={growth*.9} transform={`translate(500 650) scale(${.5+.5*growth+Math.sin(t)*.005}) translate(-500 -650)`}/>;

export const BlanchTest:React.FC<{t:number;redness:number;press:number;showFinger?:boolean}>=({t,redness,press,showFinger=true})=><g>
 <path d="M60 190 Q280 50 690 210 Q980 320 920 650 Q875 820 605 850 L230 825 Q50 770 60 600Z" fill={a.skinLight} stroke={a.skinShade} strokeWidth="14"/>
 <ellipse cx="570" cy={580+press*10} rx="235" ry={190-press*35} fill={a.wound} opacity={redness*.75}/>
 <ellipse cx="480" cy="310" rx="230" ry="50" fill={a.maskWhite} opacity=".16"/>
 {showFinger&&<g transform={`translate(${600+Math.sin(t)*2} ${150+press*205})`}><path d="M-80 -230 H65 V130 Q65 210 -10 210 Q-85 205 -80 130Z" fill={a.skin} stroke={a.skinShade} strokeWidth="10"/><rect x="-57" y="70" width="95" height="82" rx="35" fill={a.newSkin}/></g>}
</g>;

/** Solo mostrar ampolla si la narración realmente la nombra. */
export const BlisterWound:React.FC<{open:number;dark:number;blister?:number}>=({open,dark,blister=0})=><g>
 <ellipse cx="520" cy="640" rx="380" ry="235" fill={a.skinLight}/>
 <ellipse cx="520" cy="640" rx={120+dark*125} ry={80+dark*85} fill={a.maskBlack} opacity={dark}/>
 {blister>0&&<ellipse cx="520" cy="530" rx="180" ry={100*blister} fill={a.fat} stroke={a.paper} strokeWidth="10" opacity=".8"/>}
 <path d="M300 640 Q390 390 520 540 Q660 420 760 640 Q660 855 520 760 Q375 830 300 640Z" transform={`translate(520 640) scale(${open}) translate(-520 -640)`} fill={a.maskBlack} stroke={a.wound} strokeWidth="30"/>
</g>;

export const PatientTurn:React.FC<PressureProps & {turn:number}>=p=><BodyOnBed {...p}/>;

export const TimeClock:React.FC<{t:number;progress:number}>=({t,progress})=><g transform="translate(825 195)">
 <circle r="105" fill={c.panelDeep} stroke={c.mint} strokeWidth="10"/>
 {[0,1,2,3].map(i=><path key={i} d="M0 -75 V-90" transform={`rotate(${i*90})`} stroke={c.text} strokeWidth="9"/>)}
 <path d="M0 12 V-72" stroke={c.amber} strokeWidth="12" strokeLinecap="round" transform={`rotate(${progress*240+Math.sin(t)*2})`}/><circle r="12" fill={c.text}/>
</g>;
