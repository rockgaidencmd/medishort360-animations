import React,{useId} from 'react';
import {theme} from '../styles/theme';
import {clamp,smooth} from './healing';
const c=theme.anatomy;
export type ChildRigProps={state?:'walk'|'trip'|'fall';tripAt?:number;impactAt?:number;t?:number;shake?:boolean};
const turn=(x:number,y:number,a:number)=>{const r=a*Math.PI/180;return {x:x*Math.cos(r)-y*Math.sin(r),y:x*Math.sin(r)+y*Math.cos(r)};};
export const childPose=({state='fall',tripAt=2,impactAt=3.2,t=0}:ChildRigProps)=>{
 const impact=Math.max(tripAt+.25,impactAt);const q=state==='walk'?0:Math.min(state==='trip'?.45:1,smooth(tripAt,impact,t));
 const cycle=t*5;const walk=1-smooth(0,.55,q);const bounce=t<impact?0:Math.sin((t-impact)*17)*Math.exp(-(t-impact)*10)*9;
 const rotation=q*82;const scale=1.65-q*.5;const x=340+Math.min(t,tripAt)*65+q*30;const y=1030+q*420+bounce+Math.abs(Math.sin(cycle))*5*walk+Math.sin(t*1.4)*q;
 const shoulder=turn(60,-205,rotation);const upper=turn(0,118,-110*q+Math.sin(cycle)*20*walk);const lower=turn(0,53,-110*q+Math.sin(cycle)*20*walk-62*q);
 const arm=turn(upper.x+lower.x,upper.y+lower.y,rotation);
 return {q,walk,cycle,rotation,scale,x,y,impact,forearm:{x:x+(shoulder.x+arm.x)*scale,y:y+(shoulder.y+arm.y)*scale}};
};
export const ChildRig:React.FC<ChildRigProps>=({state='walk',tripAt=2,impactAt=3.2,t=0,shake=true})=>{
 const id=useId().replace(/:/g,'');const p=childPose({state,tripAt,impactAt,t});const {q,walk,cycle}=p;
 const tripCycle=tripAt*5;const tripAngle=Math.sin(tripCycle)*25;const tripKnee=Math.max(0,Math.sin(tripCycle))*44;
 const footA=turn(0,154,tripAngle),footB=turn(14,197,tripAngle+tripKnee);
 const stoneX=340+tripAt*65+(-33+footA.x+footB.x)*1.65;
 const elapsed=t-p.impact;const tremor=shake&&state==='fall'&&elapsed>=0&&elapsed<.38?Math.sin(elapsed*95)*5*(1-elapsed/.38):0;
 const settle=smooth(p.impact,p.impact+1,t)*q;
 const leg=(side:number)=>{const a=Math.sin(cycle+side*Math.PI)*25*walk-q*side*12*(1-settle)-settle*14;const knee=Math.max(0,Math.sin(cycle+side*Math.PI))*44*walk+q*45*(1-settle);return <g transform={`translate(${side?33:-33} 0) rotate(${a} 0 0)`}><path d="M-29 -12 Q0 -27 29 -10 L24 163 Q0 180 -23 163Z" fill={side?c.pants:c.ink}/><g transform={`translate(0 154) rotate(${knee} 0 0)`}><path d="M-23 -10 Q0 -19 24 -10 L20 172 H-19Z" fill={c.pants}/><g transform={`rotate(${-p.rotation-a-knee} 0 173)`}><path d="M-22 161 Q7 154 26 172 L53 180 Q64 198 39 200 H-28Z" fill={c.shoe}/><path d="M-28 197 H49" stroke={c.hair} strokeWidth="7" strokeLinecap="round"/><path d="M5 174 l14 0 m-11 8 h18" stroke={c.paper} strokeWidth="3"/></g></g></g>;};
 const arm=(side:number)=>{const angle=(side?-1:1)*Math.sin(cycle)*20*walk-110*q;return <g transform={`translate(${side?60:-60} -205) rotate(${angle} 0 0)`}><path d="M-23 -4 Q-32 -25 0 -27 Q29 -27 25 10 L22 47 H-22Z" fill={c.shirtShade}/><path d="M-19 42 H19 L17 119 Q0 138 -17 119Z" fill={`url(#${id}-skin)`}/><g transform={`translate(0 118) rotate(${-62*q} 0 0)`}><path d="M-17 -8 Q0 -15 17 -8 L14 88 Q28 111 14 122 Q0 132 -14 117 L-14 82Z" fill={`url(#${id}-skin)`}/>{[0,1,2].map(i=><path key={i} d={`M${-6+i*7} 101 v16`} stroke={c.skinShade} strokeWidth="1.7" strokeLinecap="round"/>)}<ellipse cx="5" cy="53" rx="8" ry="16" fill={c.wound} opacity={side?q*.7:0}/></g></g>;};
 const blink=Math.pow(Math.max(0,Math.cos(t*1.2)),36);const eyeHeight=1-.87*blink;
 return <svg viewBox="0 0 1080 1920" width="100%" height="100%" aria-label="Niño articulado en escenario de caída">
 <defs><linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor={c.sky}/><stop offset="1" stopColor={c.paper}/></linearGradient><linearGradient id={`${id}-skin`}><stop stopColor={c.skinShade}/><stop offset=".45" stopColor={c.skinLight}/><stop offset="1" stopColor={c.skin}/></linearGradient><linearGradient id={`${id}-shirt`}><stop stopColor={c.shirtShade}/><stop offset=".5" stopColor={c.shirt}/><stop offset="1" stopColor={c.shirtShade}/></linearGradient></defs>
 <g transform={`translate(${tremor} ${tremor*.4})`}>
 <rect width="1080" height="1920" fill={`url(#${id}-sky)`}/>
 <g opacity=".35" fill={c.ground}><path d={`M0 1430 Q250 ${1320+Math.sin(t)*3} 540 1430 T1080 1410 V1700 H0Z`}/><path d="M0 1490 Q300 1360 700 1470 T1080 1460 V1700 H0Z"/></g>
 <rect y="1615" width="1080" height="305" fill={c.ground}/><path d="M0 1615 H1080" stroke={c.groundDeep} strokeWidth="6"/>
 <ellipse cx={p.x+q*160} cy="1617" rx={140+q*160} ry="24" fill={c.ink} opacity=".12"/>
 <path d={`M${stoneX} 1614 l12 -22 q20 -15 38 2 l14 20Z`} fill={c.stone}/>
 <g transform={`translate(${p.x} ${p.y}) scale(${p.scale}) rotate(${p.rotation} 0 0)`}>
 {leg(0)}{arm(0)}{leg(1)}
 <path d="M-62 -218 Q0 -246 62 -218 L64 -11 Q0 15 -64 -11Z" fill={`url(#${id}-shirt)`}/>
 <path d="M-62 -172 Q0 -155 62 -172 V-139 Q0 -122 -62 -139Z M-63 -91 Q0 -75 63 -91 V-58 Q0 -42 -63 -58Z" fill={c.paper}/>
 <path d="M-22 -275 H23 L27 -227 Q0 -207 -27 -227Z" fill={`url(#${id}-skin)`}/>
 <g transform={`rotate(${-q*15+Math.sin(t)*1.2} 0 -290)`}>
 <ellipse cx="0" cy="-361" rx="79" ry="99" fill={c.hair}/><ellipse cx="-73" cy="-342" rx="16" ry="25" fill={c.skin}/><ellipse cx="73" cy="-342" rx="16" ry="25" fill={c.skin}/>
 <path d="M-70 -392 Q-67 -455 6 -451 Q80 -450 73 -379 L70 -325 Q60 -266 0 -263 Q-61 -269 -71 -327Z" fill={`url(#${id}-skin)`}/>
 <path d="M-74 -387 Q-82 -444 -20 -458 Q40 -482 76 -420 L76 -368 Q59 -388 42 -424 Q-6 -399 -74 -387Z" fill={c.hair}/><path d="M-62 -417 Q-12 -453 40 -435" stroke={c.hairLight} strokeWidth="8" fill="none" strokeLinecap="round"/>
 {[-1,1].map(side=><g key={side} transform={`translate(${side*30} -354)`}><path d="M-17 -21 Q0 -31 17 -22" fill="none" stroke={c.hair} strokeWidth="6" strokeLinecap="round"/><g transform={`scale(1 ${eyeHeight})`}><ellipse rx="17" ry="20" fill={c.paper}/><ellipse cx="3" cy="2" rx="10" ry="13" fill={c.eye}/><circle cx="6" cy="-4" r="4" fill={c.paper}/></g></g>)}
 <path d="M3 -348 Q-10 -324 4 -322" fill="none" stroke={c.skinShade} strokeWidth="4" strokeLinecap="round"/>
 <path d={q>.3?'M-19 -296 Q0 -310 19 -296':'M-23 -305 Q0 -284 24 -305'} fill="none" stroke={c.skinShade} strokeWidth="4" strokeLinecap="round"/>
 </g>{arm(1)}</g></g></svg>;
};
