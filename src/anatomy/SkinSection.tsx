import React,{useId} from 'react';
import {interpolateColors} from 'remotion';
import {theme} from '../styles/theme';
import {cellComponents} from './Cells';
import {clamp,phaseAt,smooth,sample,type WoundDepth} from './healing';
// REVISAR: geometría y distribución esquemáticas; pendientes de revisión histológica.
const c=theme.anatomy;
export type SkinSectionProps={healing?:number;woundWidth?:number;woundDepth?:WoundDepth;showCells?:boolean;showLabels?:boolean;t?:number};
export const SkinSection:React.FC<SkinSectionProps>=({healing=0,woundWidth=270,woundDepth='superficial',showCells=true,showLabels=true,t=0})=>{
 const id=useId().replace(/:/g,'');const h=clamp(healing);const phase=phaseAt(h);
 const width=clamp(woundWidth,80,440)*(1-smooth(.35,.88,h));const depth=(woundDepth==='profunda'?200:83)*(1-smooth(.35,.9,h));
 const left=440-width/2,right=440+width/2;
 const cavity=`M${left} 130 Q${left+12} ${130+depth} 440 ${130+depth} Q${right-12} ${130+depth} ${right} 130Z`;
 const scar=1-smooth(.82,1,h);const scab=smooth(.04,.22,h)*(1-smooth(.74,.92,h));
 return <svg viewBox="0 0 1000 670" width="100%" height="100%" aria-label="Corte transversal de piel">
 <defs><mask id={`${id}-tissue`}><rect width="1000" height="670" fill={c.maskWhite}/><path d={cavity} fill={c.maskBlack}/></mask><linearGradient id={`${id}-dermis`} x2="0" y2="1"><stop stopColor={c.dermis}/><stop offset="1" stopColor={c.newSkin}/></linearGradient></defs>
 <g transform={`translate(0 ${Math.sin(t*.8)*1.5})`}>
 <g mask={`url(#${id}-tissue)`}>
 <rect x="40" y="130" width="800" height="70" rx="12" fill={c.epidermis}/>
 <path d="M40 147 Q100 137 160 147 T280 147 T400 147 T520 147 T640 147 T760 147 L840 147 V130 H40Z" fill={c.corneum}/>
 <path d="M40 194 Q80 211 120 194 T200 194 T280 194 T360 194 T440 194 T520 194 T600 194 T680 194 T760 194 L840 194 V420 H40Z" fill={`url(#${id}-dermis)`}/>
 <rect x="40" y="420" width="800" height="180" rx="18" fill={c.fat}/>
 {Array.from({length:24},(_,i)=><ellipse key={i} cx={65+(i%8)*103} cy={450+Math.floor(i/8)*57} rx={38+Math.sin(t+i)*.8} ry="25" fill={c.fat} stroke={c.fatOutline} strokeWidth="2"/>)}
 {Array.from({length:7},(_,i)=>{const x=95+i*112;const dilation=.75+.25*smooth(0,.12,h)+Math.sin(Math.PI*clamp((h-.12)/.23))*.16;return <g key={i}><path d={`M${x-36} 410 V310 Q${x-36} 210 ${x} 210 Q${x+36} 210 ${x+36} 310 V410`} fill="none" stroke={c.capillary} strokeWidth={9*dilation}/>{[0,1,2].map(j=><ellipse key={j} cx={x-36} cy={300+((t*22+j*38+i*9)%105)} rx="5" ry="7" fill={c.clot}/>)}<path d={`M${x+45} 420 Q${x+24} 355 ${x+47} 300 l-14 -20 m14 20 18 -24`} fill="none" stroke={c.nerve} strokeWidth="4"/></g>;})}
 </g>
 <path d={cavity} fill={interpolateColors(h,[0,.12,.35,.8,1],[c.wound,c.clot,c.dermis,c.newSkin,c.epidermis])} opacity={scar}/>
 <path d={`M${left-6} 132 Q440 ${116-9*scab} ${right+6} 132`} fill="none" stroke={c.scab} strokeWidth={12*scab} opacity={scab}/>
 {showCells&&phase.celulas.map((name,i)=>{const Cell=cellComponents[name];return Cell?<g key={name} transform={`translate(${440+(i-(phase.celulas.length-1)/2)*Math.max(45,width/(phase.celulas.length+1))+Math.sin(t*.5+i)*5} ${name==='colageno'||name==='fibroblastos'||name==='capilares_nuevos'?250+sample(i+4)*35:148+depth*.38+sample(i+4)*14})`}><Cell t={t} seed={i+31} size={name==='colageno'?130:name==='plaquetas'?32:48}/></g>:null;})}
 <path d={`M${left} 131 Q440 ${130+depth} ${right} 131`} fill="none" stroke={c.newSkin} strokeWidth={7*smooth(.35,.78,h)} opacity={1-smooth(.87,1,h)}/>
 {showLabels&&<g fontFamily={theme.font.family} fontSize="23" fill={c.ink} opacity={smooth(0,.5,t)}>{[['Capa córnea',140],['Epidermis',184],['Dermis',360],['Tejido subcutáneo',560]].map(([label,y])=><g key={label}><path d={`M800 ${y} H860`} stroke={c.ink} opacity=".5"/><text x="850" y={Number(y)+7} fontSize={label==='Tejido subcutáneo'?14:20}>{label}</text></g>)}</g>}
 </g></svg>;
};
