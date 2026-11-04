import React from 'react';
import {theme} from '../styles/theme';
import {clamp, smooth} from './healing';
import phases from './data/healing-phases.json';
const c=theme.anatomy;
export type MacroProps={phaseIndex:number;local:number;t:number;zoom:number};
export const MACRO_MIN_CELL_PX=[120,200,140,160] as const;
/** All visible cell membranes have explicit output-pixel bounds. Organelles and fibrin are not cells. */
const Cell:React.FC<{x:number;y:number;size:number;kind:'platelet'|'red'|'neutrophil'|'macrophage'|'fibroblast'|'keratinocyte';t:number}>=({x,y,size,kind,t})=>{
 const r=size/2;const color={platelet:c.platelet,red:c.wound,neutrophil:c.neutrophil,macrophage:c.macrophage,fibroblast:c.fibroblast,keratinocyte:c.skinLight}[kind];
 return <g data-cell={kind} data-width={kind==='fibroblast'?240:size} data-height={kind==='fibroblast'?140:size} transform={`translate(${x} ${y+Math.sin(t*2+x)*2})`}>
 {kind==='fibroblast'?<path d="M-120 70 Q-70 -70 0 -70 Q70 -70 120 -70 Q70 70 0 70Z" fill={color} stroke={c.ink} strokeWidth="3"/>:<circle r={r} fill={color} stroke={c.ink} strokeWidth="3"/>}
 {kind==='red'?<><ellipse rx={r*.61} ry={r*.43} fill={c.clot}/><path d={`M${-r*.7} ${-r*.3} Q0 ${-r*.9} ${r*.7} ${-r*.3}`} fill="none" stroke={c.newSkin} strokeWidth="9"/></>:kind==='platelet'?<>{[0,1,2,3].map(i=><circle key={i} cx={Math.cos(i*1.7)*r*.4} cy={Math.sin(i*1.7)*r*.4} r="9" fill={c.nucleus}/>)}</>:kind==='neutrophil'?<path d="M-60 -5 C-72 -56 -20 -66 -14 -22 C18 -64 55 -40 33 -5 C78 20 35 64 5 35 C-40 70 -72 35 -60 -5" fill={c.nucleus}/>:<ellipse rx={kind==='fibroblast'?45:r*.4} ry={kind==='fibroblast'?22:r*.5} fill={c.nucleus} transform="rotate(-20)"/>}
 <path d={`M${-r*.55} ${-r*.6} Q0 ${-r*.9} ${r*.4} ${-r*.6}`} stroke={c.paper} strokeWidth="6" fill="none" opacity=".55"/>
 </g>;
};
const Tag:React.FC<{x:number;y:number;children:React.ReactNode}>=({x,y,children})=><g transform={`translate(${x} ${y})`}><rect x="-8" y="-35" width={String(children).length*21+20} height="47" rx="12" fill={c.paper} opacity=".96"/><text fontSize="36" fontWeight="800" fill={c.ink}>{children}</text></g>;
const Arrow:React.FC<{d:string;progress:number}>=({d,progress})=><path d={d} fill="none" stroke={c.shirt} strokeWidth="7" strokeDasharray="12 11" strokeDashoffset={-progress*100} markerEnd="url(#macro-arrow)"/>;
const Spark:React.FC<{x:number;y:number;at:number;local:number}>=({x,y,at,local})=>{const q=clamp((local-at)/.75);return <g opacity={local>=at?1-q:0}><circle cx={x} cy={y} r={28+q*80} fill="none" stroke={theme.colors.mintBright} strokeWidth="12"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M${x+Math.cos(i)*45} ${y+Math.sin(i)*45} l${Math.cos(i)*q*80} ${Math.sin(i)*q*80}`} stroke={c.paper} strokeWidth="9"/>)}</g>;};
export const MacroHealing:React.FC<MacroProps>=({phaseIndex,local,t,zoom})=>{
 const phase=phases.phases[phaseIndex];const travel=(at:number,duration:number)=>smooth(at,at+duration,local);const a=travel(0,1.6);const clean=travel(2,3);const build=travel(1,6);const align=travel(0,6);
 // Zoom is a true SVG viewBox magnification (8 logical units become 1 output unit at ×8).
 // Counter-scale physical cell dimensions so every allowed zoom preserves legible 120–260 px membranes.
 return <svg width="992" height="664" viewBox={`0 0 ${992/zoom} ${664/zoom}`} aria-label={`Microscopio: ${phase.nombre}`} data-zoom={zoom}>
 <g transform={`scale(${1/zoom})`}>
 <defs><marker id="macro-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 0 10Z" fill={c.shirt}/></marker><linearGradient id="macro-tissue" x2="0" y2="1"><stop stopColor={c.newSkin}/><stop offset="1" stopColor={c.dermis}/></linearGradient></defs>
 <rect width="992" height="664" fill="url(#macro-tissue)"/>
 <path d="M0 105 Q250 80 496 105 T992 105 V165 H0Z" fill={c.epidermis}/><path d="M0 91 Q250 66 496 91 T992 91" fill="none" stroke={c.corneum} strokeWidth="24"/>
 <path d="M0 591 Q220 553 480 586 T992 580 V664 H0Z" fill={c.fat}/>
 <path d="M10 505 H330 M660 505 H985" stroke={c.capillary} strokeWidth={phaseIndex===1?42:30} fill="none"/>
 <text x="28" y="48" fontSize="36" fontWeight="800" fill={c.ink}>MICROSCOPIO · ×{zoom}</text>
 {phaseIndex===0&&<>
 <path d="M405 90 L430 300 Q496 355 562 300 L590 90" fill={c.wound}/>
 <Arrow d="M160 160 Q245 70 405 180" progress={t}/><Arrow d="M815 335 Q730 225 610 240" progress={t}/>
 <Cell x={180+a*250} y={205+Math.sin(a*Math.PI)*65} size={120} kind="platelet" t={t}/>
 <Cell x={760-a*210} y={260-Math.sin(a*Math.PI)*45} size={120} kind="platelet" t={t+.8}/>
 <Tag x={80} y={365}>{'Plaquetas'}</Tag><Tag x={630} y={365}>{'Fibrina'}</Tag>
 {[0,1,2,3,4,5].map(i=><path key={i} d={`M${340+i*35} 155 Q${650-i*35} 290 ${350+i*40} 400 M345 ${165+i*40} L645 ${345-i*30}`} stroke={c.fibrin} strokeWidth="8" fill="none" strokeDasharray="600" strokeDashoffset={(1-travel(1.2,3))*600}/>)}
 <Cell x={175+travel(.5,2)*230} y={485-travel(.5,2)*90} size={140} kind="red" t={t}/><Cell x={820-travel(1.3,2.5)*225} y={490-travel(1.3,2.5)*100} size={140} kind="red" t={t+.6}/>
 <Tag x={330} y={585}>{'Glóbulos rojos atrapados'}</Tag><Spark x={495} y={270} at={1.6} local={local}/><Spark x={495} y={370} at={4.2} local={local}/>
 </>}
 {phaseIndex===1&&<>
 <Arrow d="M165 445 Q160 270 375 230" progress={t}/><Arrow d="M840 480 Q850 350 680 300" progress={t}/>
 {[0,1,2,3,4].map(i=><g key={i} opacity={1-travel(1+i*.45,1.1)} transform={`translate(${400+i*38} ${220+(i%2)*80})`}><path d="M-10 -20 Q25 -25 20 5 T-15 20Z" fill={c.ink}/><path d="M-18 -22 l-10 -10 M20 12 l13 15" stroke={c.ink} strokeWidth="5"/></g>)}
 <Cell x={165+travel(0,3)*240} y={400-travel(0,3)*135} size={200} kind="neutrophil" t={t}/>
 <Cell x={815-clean*200} y={440-clean*120} size={240} kind="macrophage" t={t}/>
 <Tag x={95} y={570}>{'Neutrófilo'}</Tag><Tag x={635} y={570}>{'Macrófago'}</Tag>
 <path d={`M${425+Math.sin(t*2)*8} 230 Q490 ${180+clean*80} 550 270`} fill="none" stroke={c.macrophage} strokeWidth={12+clean*24} opacity={clean}/>
 <Spark x={420} y={250} at={3} local={local}/><Spark x={600} y={310} at={5} local={local}/>
 </>}
 {phaseIndex===2&&<>
 {[0,1,2,3,4].map(i=><path key={i} d={`M180 ${330+i*29} Q400 ${265+i*33+Math.sin(t+i)*4} 620 ${340+i*24}`} fill="none" stroke={c.collagen} strokeWidth="9" strokeDasharray="600" strokeDashoffset={(1-build)*600}/>)}
 <Arrow d="M150 300 Q330 220 430 340" progress={t}/><Cell x={165+build*190} y={290+Math.sin(build*Math.PI)*35} size={240} kind="fibroblast" t={t}/><Tag x={50} y={450}>{'Fibroblasto'}</Tag>
 <path d="M680 530 V350 Q680 240 760 240 T840 350 V530" stroke={c.capillary} strokeWidth="25" fill="none" strokeDasharray="800" strokeDashoffset={(1-travel(.5,5))*800}/><Tag x={615} y={590}>{'Capilar nuevo'}</Tag>
 <Cell x={160+travel(2,5)*255} y={160} size={160} kind="keratinocyte" t={t}/><Cell x={815-travel(2,5)*240} y={160} size={160} kind="keratinocyte" t={t+.6}/>
 <Tag x={330} y={85}>{'Queratinocitos'}</Tag><Arrow d="M255 162 H365" progress={t}/><Arrow d="M725 162 H620" progress={t}/>
 <Tag x={335} y={520}>{'Colágeno'}</Tag><Spark x={490} y={160} at={6.5} local={local}/><Spark x={760} y={310} at={5.5} local={local}/>
 </>}
 {phaseIndex===3&&<>
 {[0,1,2,3,4,5].map(i=><path key={i} d={`M90 ${245+i*36} C300 ${160+i*50+(245+i*36-(160+i*50))*align} 650 ${370+i*15+(245+i*36-(370+i*15))*align} 915 ${245+i*36}`} fill="none" stroke={c.collagen} strokeWidth="12"/>)}
 <path d="M735 530 V360 Q735 265 820 265 T900 360 V530" stroke={c.capillary} strokeWidth={24*(1-align)} fill="none" opacity={1-align}/>
 <path d={`M320 ${118-local*8} Q495 ${80-local*8} 670 ${118-local*8}`} stroke={c.scab} strokeWidth="24" fill="none" opacity={1-travel(0,4)} transform={`rotate(${local*4} 495 110)`}/>
 <Cell x={190+align*230} y={480-Math.sin(align*Math.PI)*30} size={160} kind="keratinocyte" t={t}/><Tag x={50} y={590}>{'Piel nueva'}</Tag>
 <Arrow d="M250 190 H740" progress={t}/><Tag x={310} y={85}>{'Colágeno alineado'}</Tag><Spark x={500} y={325} at={5} local={local}/>
 </>}
 </g></svg>;
};
