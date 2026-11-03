import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ArmSurface} from '../anatomy/ArmSurface';
import {SkinSection} from '../anatomy/SkinSection';
import {clamp,phaseAt,type WoundDepth} from '../anatomy/healing';
import {theme} from '../styles/theme';
import type {SceneProps} from './types';
export type HealingViewProps={healing?:number;view?:'section'|'surface'|'both';woundWidth?:number;woundDepth?:WoundDepth;showCells?:boolean;showLabels?:boolean;t?:number};
export const HealingView:React.FC<HealingViewProps>=({healing=0,view='both',woundWidth=270,woundDepth='superficial',showCells=true,showLabels=true,t=0})=>{
 const phase=phaseAt(healing);const shared={healing,woundWidth,woundDepth,t};
 return <AbsoluteFill style={{background:theme.anatomy.paper,fontFamily:theme.font.family,color:theme.anatomy.ink,padding:'140px 42px 100px',boxSizing:'border-box'}}>
 <div style={{fontSize:24,letterSpacing:5}}>BIBLIOTECA ANATÓMICA</div><div style={{fontSize:68,fontWeight:700,marginTop:24}}>{phase.nombre}</div>
 <div style={{fontSize:25,marginTop:18,opacity:.65}}>MEDISHORT360 · VISTA DE REVISIÓN</div>
 <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:10}}>
 {view!=='section'&&<div style={{height:view==='both'?570:1000}}><ArmSurface {...shared}/></div>}
 {view!=='surface'&&<div style={{height:view==='both'?670:1050}}><SkinSection {...shared} showCells={showCells} showLabels={showLabels}/></div>}
 </div><div style={{height:8,background:theme.anatomy.ground,borderRadius:8}}><div style={{width:`${clamp(healing)*100}%`,height:8,background:theme.anatomy.shirt,borderRadius:8}}/></div>
 <div style={{fontSize:22,marginTop:22,opacity:.6}}>Esquema didáctico · fases pendientes de revisión</div>
 </AbsoluteFill>;
};
export const WoundHealing:React.FC<SceneProps>=({t,durationSec,props})=>{
 const from=typeof props.healingFrom==='number'?props.healingFrom:0;const to=typeof props.healingTo==='number'?props.healingTo:1;
 const view=props.view==='section'||props.view==='surface'?props.view:'both';
 return <HealingView t={t} healing={clamp(from+(to-from)*clamp(t/Math.max(durationSec-1/30,1/30)))} view={view} woundWidth={typeof props.woundWidth==='number'?props.woundWidth:270} woundDepth={props.woundDepth==='profunda'?'profunda':'superficial'} showCells={props.showCells!==false} showLabels={props.showLabels!==false}/>;
};
