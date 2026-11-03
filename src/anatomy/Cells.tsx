import React from 'react';
import {theme} from '../styles/theme';
import {sample} from './healing';
const c=theme.anatomy;
export type CellProps = {size?: number; t?: number; seed?: number};
type Kind='platelet'|'fibrin'|'red'|'neutrophil'|'macrophage'|'fibroblast'|'collagen'|'capillary'|'keratinocyte';
const Cell: React.FC<CellProps & {kind: Kind}> = ({size=50,t=0,seed=1,kind}) => {
 const phase=sample(seed)*Math.PI*2;const sway=Math.sin(t*1.6+phase);
 return <svg width={size} height={size} viewBox="-52 -52 104 104" overflow="visible" aria-label={kind}>
 <g transform={`translate(${sway*2} ${Math.cos(t+phase)*3}) rotate(${sway*4}) scale(${1+sway*.025} ${1-sway*.025})`}>
 {kind==='red' && <><ellipse rx="36" ry="25" fill={c.wound}/><ellipse rx="22" ry="13" fill={c.clot}/><path d="M-24 -9 Q0 -24 24 -9" fill="none" stroke={c.newSkin} strokeWidth="4" opacity=".7"/></>}
 {kind==='platelet' && <><path d="M0 -29 L10 -18 27 -20 22 -3 33 10 15 16 9 32 -5 23 -22 28 -22 9 -34 0 -19 -11 -17 -28Z" fill={c.platelet} stroke={c.clot} strokeWidth="2"/>{[0,1,2,3].map(i=><circle key={i} cx={sample(seed,i+2)*28-14} cy={sample(seed,i+7)*28-14} r="3" fill={c.nucleus}/>)}</>}
 {(kind==='neutrophil'||kind==='macrophage'||kind==='keratinocyte') && <><path d="M-36 0 C-44 -23 -17 -41 4 -36 C33 -43 43 -13 34 8 C37 35 7 42 -13 32 C-34 34 -44 16 -36 0Z" fill={kind==='neutrophil'?c.neutrophil:kind==='macrophage'?c.macrophage:c.skinLight} stroke={c.paper} strokeWidth="2"/>{kind==='neutrophil'?<path d="M-20 -2 C-30 -23 -7 -25 -5 -7 C2 -30 21 -24 16 -6 C36 -1 19 22 7 12 C-8 29 -24 17 -20 -2Z" fill={c.nucleus}/>:<ellipse cx="-4" rx="16" ry="21" fill={c.nucleus} transform="rotate(25)"/>}</>}
 {kind==='fibroblast' && <><path d="M-48 20 Q-22 -6 -10 -14 Q10 -30 46 -23 Q24 -8 10 9 Q-8 27 -48 20" fill={c.fibroblast}/><ellipse rx="14" ry="7" transform="rotate(-25)" fill={c.nucleus}/></>}
 {(kind==='fibrin'||kind==='collagen') && Array.from({length:kind==='fibrin'?7:5},(_,i)=><path key={i} d={kind==='fibrin'?`M-43 ${-35+i*12} Q0 ${20-i*7} 43 ${-25+i*10} M${-36+i*12} -40 L${24-i*8} 40`:`M-46 ${-24+i*12} C-20 ${-40+i*12+sway*2} 10 ${-8+i*12} 46 ${-24+i*12}`} fill="none" stroke={kind==='fibrin'?c.fibrin:c.collagen} strokeWidth={kind==='fibrin'?2.5:5} strokeLinecap="round"/>)}
 {kind==='capillary' && <><path d="M-30 40 V0 Q-30 -35 0 -35 Q30 -35 30 0 V40" fill="none" stroke={c.capillary} strokeWidth="12"/><path d="M-30 40 V0 Q-30 -35 0 -35 Q30 -35 30 0 V40" fill="none" stroke={c.newSkin} strokeWidth="4"/>{[0,1,2].map(i=><circle key={i} cx={-30+30*i} cy={i===1?-35:20+Math.sin(t*2+i)*10} r="4" fill={c.wound}/>)}</>}
 </g></svg>;
};
export const Platelet: React.FC<CellProps> = p=><Cell {...p} kind="platelet"/>;
export const FibrinMesh: React.FC<CellProps> = p=><Cell {...p} kind="fibrin"/>;
export const RedBloodCell: React.FC<CellProps> = p=><Cell {...p} kind="red"/>;
export const Neutrophil: React.FC<CellProps> = p=><Cell {...p} kind="neutrophil"/>;
export const Macrophage: React.FC<CellProps> = p=><Cell {...p} kind="macrophage"/>;
export const Fibroblast: React.FC<CellProps> = p=><Cell {...p} kind="fibroblast"/>;
export const CollagenFibers: React.FC<CellProps> = p=><Cell {...p} kind="collagen"/>;
export const NewCapillary: React.FC<CellProps> = p=><Cell {...p} kind="capillary"/>;
export const Keratinocyte: React.FC<CellProps> = p=><Cell {...p} kind="keratinocyte"/>;
/** Only a visual name-to-component mapping; phase membership comes exclusively from JSON. */
export const cellComponents: Record<string, React.FC<CellProps>> = {plaquetas:Platelet,fibrina:FibrinMesh,eritrocitos:RedBloodCell,neutrofilos:Neutrophil,macrofagos:Macrophage,fibroblastos:Fibroblast,colageno:CollagenFibers,capilares_nuevos:NewCapillary,queratinocitos:Keratinocyte};
