import React from 'react';
import {ecvTheme as C} from '../styles/theme';
import {LargeClock,Neuron,phase,Tag} from './ECVTissue';
export const NursingPatient=({t,cues}:{t:number;cues:Record<string,number>})=>{
const face=phase(t,cues.face,.6),arm=phase(t,cues.arm,.9),speech=phase(t,cues.speech,.5),pupil=phase(t,cues.pupils,.8);const breathing=Math.sin(t*2.4)*7;
const checks=[['Conciencia',cues.consciousness],['Pupilas',cues.pupils],['Fuerza',cues.strength],['Respiración',cues.breathing],['Oxigenación',cues.oxygen],['Presión arterial',cues.pressure]] as const;
return <g>
<rect x="0" y="0" width="1000" height="1320" rx="35" fill={C.panel}/><path d="M0 150H1000M0 800H1000" stroke={C.bed} strokeOpacity=".15" strokeWidth="6"/>
<rect x="85" y="400" width="830" height="680" rx="90" fill={C.bed}/><rect x="170" y="110" width="660" height="390" rx="100" fill={C.text}/>
<path d={`M245 600Q500 ${550-breathing} 755 600L850 1040H150Z`} fill={C.uniform}/>
<g transform="translate(500 363)"><ellipse rx="175" ry="202" fill={C.skin}/><path d="M-174-15Q-210-250-35-205Q165-245 176-5L130-95Q-25-85-110-115Z" fill={C.hair}/><path d={`M-112-20H-65M65 ${-20+face*25}H112`} stroke={C.ink} strokeWidth="11" strokeLinecap="round"/>
<path d={`M-80 98Q0 ${110+face*12} 80 ${98+face*65}`} stroke={C.bloodCore} strokeWidth="10" fill="none"/><path d="M0-10L-15 58H15" stroke={C.bloodCore} strokeWidth="6" fill="none"/>
{t>=cues.pupils&&<g><ellipse cx="-88" cy="-20" rx="48" ry="28" fill={C.white}/><circle cx="-88" cy="-20" r={21-pupil*12} fill={C.ink}/><path d="M-230-55L-80-40-80 5Z" fill={C.risk} fillOpacity=".45"/><path d="M-300-65L-228-55" stroke={C.muted} strokeWidth="35"/><circle cx="-230" cy="-55" r="20" fill={C.risk}/></g>}</g>
<g stroke={C.skin} strokeWidth="65" strokeLinecap="round" fill="none"><path d="M270 620L125 755 210 845"/><g transform={`rotate(${arm*52} 710 620)`}><path d="M710 620L860 540 910 405"/></g></g>
{speech>0&&<g opacity={speech}><path d="M650 30H960V195H850L760 255V195H650Z" fill={C.background} stroke={C.risk} strokeWidth="5"/>{[0,1,2].map(i=><path key={i} d={`M${690+i*75} 100q18 ${Math.sin(t*7+i)*40} 42 0`} fill="none" stroke={C.risk} strokeWidth="7"/>)}</g>}
{t<cues.consciousness?<><Tag x={35} y={1145} text="Cara" t={face}/><Tag x={350} y={1145} text="Brazo" t={arm}/><Tag x={690} y={1145} text="Habla" t={speech}/><g transform="translate(70 1215)" stroke={C.risk} strokeWidth="6" fill="none"><path d="M0 0H850L825-18M850 0L825 18"/></g></>:<g>{checks.map(([label,start],i)=>{const show=phase(t,start,.25);const col=i%2,row=Math.floor(i/2);return <g key={label} transform={`translate(${30+col*480} ${875+row*135+(1-show)*30})`} opacity={show}><rect width="460" height="108" rx="18" fill={C.background}/><path d="M25 52L42 70 75 34" fill="none" stroke={C.neuron} strokeWidth="8"/><text x="95" y="65" fontSize="36" fill={C.text}>{label}</text></g>;})}</g>}
{t>=cues.breathing&&<g transform="translate(350 615)" stroke={C.neuron} strokeWidth="6" fill="none"><path d={`M0 0Q40 ${-45-breathing} 75 0M100 0Q140 ${-45-breathing} 175 0`}/></g>}
{t>=cues.consciousness&&t<cues.pupils&&<g><path d="M285 335Q320 300 350 335M285 355Q320 320 350 355" fill="none" stroke={C.risk} strokeWidth="6"/></g>}
{t>=cues.strength&&<path d="M270 680L220 780M220 780L210 745M220 780L250 760" stroke={C.risk} strokeWidth="8" fill="none"/>}
{t>=cues.oxygen&&<g transform="translate(765 740)"><rect width="120" height="80" rx="15" fill={C.background} stroke={C.neuron} strokeWidth="5"/><path d={`M10 48Q30 ${30+Math.sin(t*4)*10} 50 40T110 35`} fill="none" stroke={C.neuron} strokeWidth="5"/></g>}
{t>=cues.pressure&&<g transform="translate(210 750) rotate(20)"><rect x="-65" y="-55" width="130" height="100" rx="15" fill={C.ink}/><path d="M60 0Q150-30 170 70" stroke={C.muted} strokeWidth="7" fill="none"/></g>}
{t>=cues.communicate&&<g opacity={phase(t,cues.communicate)}><rect x="200" y="1200" width="600" height="85" rx="20" fill={C.uniform}/><path d="M240 1240H290M265 1215V1265" stroke={C.text} strokeWidth="7"/><text x="315" y="1255" fontSize="40" fill={C.background}>Comunica al equipo</text></g>}
</g>};
export const ClosingBrain=({t,elapsed}:{t:number;elapsed:number})=><g><rect width="1000" height="1320" rx="35" fill={C.panel}/><g transform="translate(500 250)"><LargeClock t={elapsed} size={390}/></g><g transform="translate(0 500)"><ellipse cx="500" cy="220" rx={350} ry="200" fill={C.risk} fillOpacity={.18+.08*Math.sin(t*4)}/><ellipse cx="570" cy="220" rx={40+phase(elapsed,0,6)*190} ry={30+phase(elapsed,0,6)*140} fill={C.injury}/>{[220,500,780].map((x,i)=><Neuron key={x} x={x} y={220} t={t} injury={phase(elapsed,i*1.5,5)}/>)}</g><text x="500" y="1020" textAnchor="middle" fontSize="64" fontWeight="bold" fill={C.risk}>TIEMPO ES CEREBRO</text></g>;
