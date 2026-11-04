import {MacroHealing} from '../anatomy/MacroHealing';
import React,{useMemo} from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {z} from 'zod';
import {ChildRig} from '../anatomy/ChildRig';
import {ArmSurface} from '../anatomy/ArmSurface';
import {cellComponents} from '../anatomy/Cells';
import {clamp,sample,smooth,phaseAt} from '../anatomy/healing';
import data from '../anatomy/data/healing-phases.json';
import {theme} from '../styles/theme';
import {shotAt} from '../motion/shots';
const c=theme.anatomy;
export const masterSchema=z.object({appearAt:z.number().min(0),tripAt:z.number().min(0),impactAt:z.number().min(0),splitAt:z.number().min(0),healingAt:z.number().min(0),healedAt:z.number().min(0),closeAt:z.number().min(0),healingFrom:z.number().min(0).max(1),healingTo:z.number().min(0).max(1),zoomTop:z.number().min(2).max(3),zoomBottom:z.number().min(6).max(10),showDayCounter:z.boolean()});
export type MasterProps=z.infer<typeof masterSchema>;
export const masterDefaults:MasterProps={appearAt:0,tripAt:2,impactAt:3.2,splitAt:6,healingAt:10,healedAt:42,closeAt:42,healingFrom:0,healingTo:1,zoomTop:2.5,zoomBottom:8,showDayCounter:true};
const label:Record<string,string>={plaquetas:'Plaquetas',fibrina:'Fibrina',eritrocitos:'Glóbulos rojos',neutrofilos:'Neutrófilos',macrofagos:'Macrófago',fibroblastos:'Fibroblastos',colageno:'Colágeno',capilares_nuevos:'Capilar nuevo',queratinocitos:'Queratinocitos'};
export const masterHealingAt=(t:number,p:MasterProps)=>{const progress=clamp((t-p.healingAt)/Math.max(.1,p.healedAt-p.healingAt));const segment=Math.min(3,Math.floor(progress*4));const phase=data.phases[segment];const h=phase.healingDesde+(phase.healingHasta-phase.healingDesde)*clamp(progress*4-segment);return clamp(p.healingFrom+(p.healingTo-p.healingFrom)*h);};
export const MasterHealing:React.FC<MasterProps>=p=>{const f=useCurrentFrame();return <MasterHealingView {...p} t={f/useVideoConfig().fps}/>;};
// REVISAR: coreografía didáctica; las fases y días proceden del JSON pendiente de revisión clínica.
export const MasterHealingView:React.FC<MasterProps&{t:number}>=p=>{
 const {t}=p;const h=masterHealingAt(t,p);const phase=phaseAt(h);const phaseIndex=data.phases.indexOf(phase);const phaseStart=p.healingAt+phaseIndex*(p.healedAt-p.healingAt)/4;const local=Math.max(0,t-phaseStart);const {fps}=useVideoConfig();const pop=spring({frame:Math.max(0,local*fps),fps,config:{damping:17}});const open=smooth(p.splitAt,p.healingAt,t);const closing=smooth(p.closeAt,p.closeAt+1,t);const flash=(1-smooth(0,.65,local))*Number(t>=p.healingAt);const blood=1-smooth(.02,.12,h);const shrink=1-smooth(0,.96,h);const status=h===1?'Sanada':h<.04?'Sangrando':h<.12?'Coagulando':h<.35?'Limpiando':'Reconstruyendo';
 const dust=useMemo(()=>Array.from({length:18},(_,i)=>({x:sample(42,i)*1080,y:sample(72,i)*1720,r:2+sample(9,i)*5})),[]);
 const shot=shotAt(t,[{from:0,to:p.splitAt,zoom:1,focusX:435,focusY:301},{from:p.splitAt,to:p.healingAt,zoom:p.zoomTop,focusX:435,focusY:301,ease:'smooth',blurBackground:3}]);
 const phaseCells=phase.celulas;const repair=smooth(.35,.95,h);const woundColor=h<.12?c.wound:h<.75?c.scab:c.newSkin;
 return <AbsoluteFill style={{background:`radial-gradient(ellipse at 50% 45%,${c.paper},${c.sky} 70%,${c.ground})`,fontFamily:theme.font.family,color:c.ink,fontWeight:800,opacity:smooth(p.appearAt,p.appearAt+.25,t)}}>
 <svg width="1080" height="1720" style={{position:'absolute'}}>{dust.map((d,i)=><circle key={i} cx={d.x+Math.sin(t+i)*12} cy={(d.y-t*12+17200)%1720} r={d.r} fill={c.shirt} opacity=".12"/>)}</svg>
 {open<1&&<AbsoluteFill style={{opacity:1-open,transform:`translate(${t>p.impactAt&&t<p.impactAt+.4?Math.sin(t*90)*10*(1-smooth(p.impactAt,p.impactAt+.4,t)):0}px)`}}><ChildRig t={t} state="fall" tripAt={p.tripAt} impactAt={p.impactAt} shake/><div style={{position:'absolute',top:100,left:54,fontSize:64}}>Una pequeña herida</div></AbsoluteFill>}
 <AbsoluteFill style={{opacity:open,transform:`translateY(${(1-open)*120}px)`}}>
 <div style={{position:'absolute',top:24,left:54,fontSize:40}}>MEDISHORT360 · VERSIÓN VIGENTE</div>
 <div style={{position:'absolute',left:0,top:80,width:1080,height:650,overflow:'hidden'}}>
 <div style={{width:1080,height:648,transform:`translate(80px,80px) scale(${shot.zoom*(1+.012*Math.sin(t*1.5))})`,transformOrigin:'43.5% 50.2%'}}><ArmSurface t={t} healing={1} woundWidth={8}/></div>
 <svg width="1080" height="650" style={{position:'absolute',top:0}}>
 <defs><radialGradient id="wet"><stop stopColor={c.newSkin}/><stop offset=".35" stopColor={c.wound}/><stop offset="1" stopColor={c.clot}/></radialGradient></defs>
 <g transform="translate(550 400)"><path d={`M${-170*shrink} 0 Q-110 ${-65*shrink} 0 ${-48*shrink} Q160 ${-70*shrink} ${170*shrink} 0 Q100 ${70*shrink} 0 ${55*shrink} Q-155 ${70*shrink} ${-170*shrink} 0`} fill={h<.12?'url(#wet)':woundColor} opacity={1-smooth(.88,1,h)}/>
 {Array.from({length:6},(_,i)=>{const q=(t*1.1+i*.19)%1;return <path key={i} d="M0 -20 C-22 6 -20 30 0 32 C22 30 22 6 0 -20" fill={c.wound} stroke={c.newSkin} strokeWidth="2" transform={`translate(${-115+i*45} ${35+q*q*160}) scale(${blood*(1-q)})`}/>;})}
 <path d="M-30 12 Q20 70 -10 120 T20 180" fill="none" stroke={c.wound} strokeWidth={blood*16} strokeLinecap="round"/>
 <ellipse rx={180*shrink+12} ry={75*shrink+8} fill="none" stroke={c.shirt} strokeWidth="8" opacity={repair*(.5+.4*Math.sin(t*4))}/>
 <circle r={145+Math.sin(t*3)*7} fill="none" stroke={theme.colors.mintBright} strokeWidth="9" opacity=".8"/>
 </g></svg>
 </div>
 <div style={{position:'absolute',left:54,top:700,fontSize:56}}>{status}<span style={{fontSize:36,marginLeft:30}}>Zoom ×{p.zoomTop.toFixed(1)}</span></div>
 <svg width="1080" height="1720" style={{position:'absolute',top:0,pointerEvents:'none'}}><path d="M425 560 L60 1020 M675 560 L1020 1020" stroke={theme.colors.mintBright} strokeWidth={4+flash*7} opacity={.3+flash*.5} fill="none"/></svg>
 <div style={{position:'absolute',top:820,left:30,width:1020,height:160,background:c.ink,borderRadius:30,color:c.paper,display:'flex',alignItems:'center',padding:'14px 26px',boxSizing:'border-box',gap:22,transform:`scale(${.98+pop*.02})`,boxShadow:`0 0 ${flash*40}px ${theme.colors.mintBright}`}}>
 <div style={{flex:1}}><div style={{fontSize:64,lineHeight:1.05}}>{phase.nombre}</div><div style={{fontSize:30,marginTop:8}}>{phase.dias}</div></div>
 {p.showDayCounter&&<div style={{fontSize:72}}>Día {h>=1?'21+':Math.floor(h*21)}</div>}<div style={{fontSize:72}}>{Math.round(h*100)}%</div>
 </div>
 <div style={{position:'absolute',left:54,top:987,width:972,display:'flex',gap:12}}>{data.phases.map((q,i)=><div key={q.id} style={{height:12,flex:1,borderRadius:8,background:i<=phaseIndex?c.shirt:c.ground}}/>)}</div>
 <div style={{position:'absolute',top:1020,left:36,width:1008,height:680,borderRadius:48,overflow:'hidden',background:c.dermis,border:`8px solid ${c.shirt}`,boxSizing:'border-box',boxShadow:`0 0 ${flash*65}px ${theme.colors.mintBright}`}}>
 <MacroHealing phaseIndex={phaseIndex} local={local} t={t} zoom={p.zoomBottom}/>
 </div>
 <div style={{position:'absolute',top:1730,left:54,fontSize:30}}>MEDISHORT360</div>
 </AbsoluteFill>
 {closing>0&&<AbsoluteFill style={{background:c.paper,opacity:closing,justifyContent:'center',alignItems:'center',gap:30}}><svg width="320" height="320" viewBox="0 0 320 320"><circle cx="160" cy="160" r={140+Math.sin(t*2)*3} fill={c.macrophage}/><path d="M75 160 L140 220 250 95" fill="none" stroke={c.shirt} strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="300" strokeDashoffset={(1-closing)*300}/></svg><div style={{fontSize:80}}>Piel recuperada</div><div style={{fontSize:48}}>MEDISHORT360</div></AbsoluteFill>}
 </AbsoluteFill>;
};





