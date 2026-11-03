import React,{useId} from 'react';
import {interpolateColors} from 'remotion';
import {theme} from '../styles/theme';
import {clamp,smooth,type WoundDepth} from './healing';
// REVISAR: progresión visual esquemática, no predicción temporal clínica.
const c=theme.anatomy;
export type ArmSurfaceProps={healing?:number;woundWidth?:number;woundDepth?:WoundDepth;t?:number};
export const ArmSurface:React.FC<ArmSurfaceProps>=({healing=0,woundWidth=270,woundDepth='superficial',t=0})=>{
 const id=useId().replace(/:/g,'');const h=clamp(healing);const width=clamp(woundWidth,80,440);const rx=width/2;const ry=woundDepth==='profunda'?68:47;
 const inflammation=smooth(0,.12,h)*(1-smooth(.25,.5,h));const scab=smooth(.03,.24,h)*(1-smooth(.74,.91,h));const lift=smooth(.55,.83,h);const fresh=1-smooth(.82,1,h);
 const color=interpolateColors(h,[0,.1,.3,.6,.8,1],[c.wound,c.clot,c.scab,c.scabLight,c.newSkin,c.skin]);
 return <svg viewBox="0 0 1000 600" width="100%" height="100%" aria-label="Antebrazo y evolución de la herida">
 <defs><linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={c.skinShade}/><stop offset=".35" stopColor={c.skinLight}/><stop offset=".7" stopColor={c.skin}/><stop offset="1" stopColor={c.skinShade}/></linearGradient><radialGradient id={`${id}-red`}><stop stopColor={c.wound} stopOpacity=".3"/><stop offset="1" stopColor={c.wound} stopOpacity="0"/></radialGradient></defs>
 <g transform={`translate(0 ${Math.sin(t)*1.5})`}>
 <ellipse cx="480" cy="432" rx="390" ry="28" fill={c.ink} opacity=".08"/>
 <path d="M55 216 Q170 183 300 215 L690 239 Q751 196 795 218 L917 265 Q954 282 943 300 Q935 312 911 304 L842 280 Q827 275 833 288 L922 323 Q950 341 936 356 Q925 369 903 356 L823 325 903 369 Q921 384 906 397 Q893 407 873 395 L797 354 854 394 Q872 414 855 425 Q841 434 822 419 L744 370 Q718 353 684 364 L290 406 Q148 424 55 392Z" fill={`url(#${id}-skin)`} stroke={c.skinShade} strokeWidth="3"/>
 <path d="M713 260 Q685 280 698 329 M746 280 L767 300" fill="none" stroke={c.skinShade} strokeWidth="3" opacity=".5"/>
 <ellipse cx="435" cy="301" rx={rx+42+inflammation*5} ry={ry+35+inflammation*4} fill={`url(#${id}-red)`} opacity={inflammation}/>
 <ellipse cx="435" cy="301" rx={rx} ry={ry} fill={c.newSkin} opacity={fresh}/>
 <path d={`M${435-rx} 301 Q${435-rx*.8} ${301-ry} 435 ${301-ry*.85} Q${435+rx*.9} ${301-ry*1.1} ${435+rx} 301 Q${435+rx*.6} ${301+ry} 435 ${301+ry*.83} Q${435-rx*.8} ${301+ry*1.2} ${435-rx} 301Z`} fill={color} opacity={fresh*(1-smooth(.68,.86,h))}/>
 {[0,1,2,3].map(i=><ellipse key={i} cx={390+i*29} cy={296+Math.sin(i*3)*14} rx={4+Math.sin(t*1.4+i)*.3} ry="3" fill={c.wound} opacity={(1-smooth(0,.12,h))*.8}/>)}
 <g opacity={scab}><path d={`M${435-rx+8} 301 Q435 ${301-ry-5} ${435+rx-8} 301 Q435 ${301+ry-3} ${435-rx+8} 301Z`} fill={c.scab}/>{[0,1,2,3,4].map(i=><path key={i} d={`M${435-rx+22+i*rx*.34} ${285+i%2*8} l15 15 -7 16`} stroke={c.scabLight} strokeWidth="2" fill="none"/>)}<path d={`M${435-rx+8} 301 Q${435-rx+10} ${280-lift*22} ${435-rx+36} ${285-lift*15}`} fill="none" stroke={c.scabLight} strokeWidth="9" strokeLinecap="round"/><path d={`M${435+rx-8} 301 q${lift*14} ${-lift*25} -20 -18`} fill="none" stroke={c.scabLight} strokeWidth="8"/></g>
 </g></svg>;
};
