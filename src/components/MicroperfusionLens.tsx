import React from 'react';
import {interpolate} from 'remotion';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

/** Animated, schematic magnification of oxygen delivery; not a quantitative model. */
export const MicroperfusionLens: React.FC<{time:number}> = ({time:t}) => {
 const reveal=interpolate(t,[0,.4,3.9,4.5],[0,1,1,0],cl);
 const oxygen=interpolate(t,[.5,3.5],[1,.35],cl);
 return <div style={{position:'absolute',top:560,left:110,width:860,height:650,opacity:reveal,transform:`scale(${interpolate(t,[0,4.5],[.92,1.04],cl)})`,transformOrigin:'50% 60%',filter:'drop-shadow(0 16px 30px rgba(8,33,43,.45))'}}>
  <svg width="860" height="650" viewBox="0 0 860 650">
   <defs>
    <radialGradient id="lensTissue"><stop stopColor="#965f77"/><stop offset="1" stopColor="#493c59"/></radialGradient>
    <linearGradient id="capWall" x2="0" y2="1"><stop stopColor="#f0b29a"/><stop offset=".5" stopColor="#ba6478"/><stop offset="1" stopColor="#8c425e"/></linearGradient>
    <radialGradient id="tissueCell"><stop stopColor="#e2a18c"/><stop offset=".7" stopColor="#bd7882"/><stop offset="1" stopColor="#83536f"/></radialGradient>
    <radialGradient id="rbcLens"><stop stopColor="#8d294d"/><stop offset=".55" stopColor="#bc3b58"/><stop offset=".8" stopColor="#ee7b82"/><stop offset="1" stopColor="#b83150"/></radialGradient>
    <clipPath id="lensClip"><rect x="12" y="12" width="836" height="566" rx="110"/></clipPath>
    <clipPath id="capClip"><path d="M0 165 Q215 125 430 165 T860 165 L860 275 Q645 235 430 275 T0 275Z"/></clipPath>
   </defs>
   <g clipPath="url(#lensClip)">
    <rect width="860" height="590" fill="url(#lensTissue)"/>
    <path d="M0 137 Q215 97 430 137 T860 137 L860 305 Q645 265 430 305 T0 305Z" fill="url(#capWall)" stroke="#e7b99e" strokeWidth="5"/>
    <path d="M0 165 Q215 125 430 165 T860 165 L860 275 Q645 235 430 275 T0 275Z" fill="#642940"/>
    <g clipPath="url(#capClip)">
     {Array.from({length:8},(_,i)=>{const x=((i*131+t*72)%1030)-80;return <g key={i} transform={`translate(${x},${214+Math.sin(t+i)*13}) rotate(${Math.sin(t*1.2+i)*22})`}><ellipse rx="35" ry="22" fill="url(#rbcLens)" stroke="#f8a597" strokeWidth="2"/><ellipse rx="14" ry="8" fill="#9a3c58" opacity=".6"/></g>;})}
    </g>
    {Array.from({length:5},(_,i)=>{
     const p=(t*.68+i*.21)%1;
     return <g key={i} transform={`translate(${105+i*160+Math.sin(p*5+i)*12},${274+p*140})`} opacity={Math.sin(p*Math.PI)*oxygen}>
      <circle r="15" fill="#a2eddb"/><circle r="24" fill="#8edbcc" opacity=".15"/><text textAnchor="middle" y="6" fontSize="17" fill="#174a56" fontWeight="700">O₂</text>
     </g>;
    })}
    {Array.from({length:5},(_,i)=><g key={i} transform={`translate(${90+i*172},${471+Math.sin(t*.9+i)*6}) scale(${1+Math.sin(t*1.1+i)*.025})`}>
     <ellipse rx="68" ry="63" fill="url(#tissueCell)" stroke="#e8acac" strokeWidth="3"/>
     <ellipse rx="22" ry="25" fill="#864d71" stroke="#c48aab" strokeWidth="3"/>
     <path d="M-45-20 Q-15-49 19-37" stroke="#f1bfa4" strokeWidth="4" fill="none" opacity={.25+oxygen*.5}/>
    </g>)}
    <text x="55" y="85" fill="#f3dcc0" fontSize="27" fontWeight="700" letterSpacing="2">MICROCIRCULACIÓN · ESQUEMA</text>
    <g transform="translate(680 70)"><text fill="#a2eddb" fontSize="30" fontWeight="700">O₂ ↓</text></g>
   </g>
   <rect x="12" y="12" width="836" height="566" rx="110" fill="none" stroke="#c5e4d7" strokeWidth="5"/>
   <path d="M430 579 V625" stroke="#c5e4d7" strokeWidth="4" strokeDasharray="6 8"/>
   <circle cx="430" cy="633" r="7" fill="#ffdc9e"/>
  </svg>
 </div>;
};
