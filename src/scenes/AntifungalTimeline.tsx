import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../styles/theme';
import type {SceneProps} from './types';

type Stage = 'opening' | 'fungi' | 'mechanism' | 'renal' | 'preparation' | 'premedication' | 'reactions' | 'labs';
type Props = SceneProps['props'] & {stage?: Stage; cues?: Record<string, number>; extraText?: string[]};
const C = theme.colors;

const Pill: React.FC<{x: number; y: number; children: React.ReactNode; color?: string; size?: number}> = ({x, y, children, color = C.text, size = 31}) => (
  <text x={x} y={y} textAnchor="middle" fill={color} fontFamily={theme.font.family} fontSize={size} fontWeight={700}>{children}</text>
);

const Panel: React.FC<{x?: number; y?: number; width?: number; height?: number; children: React.ReactNode}> = ({x = 70, y = 460, width = 940, height = 970, children}) => (
  <g>
    <rect x={x} y={y} width={width} height={height} rx="42" fill={C.panelDeep} opacity="0.58" stroke={C.mint} strokeOpacity="0.42" strokeWidth="3" />
    {children}
  </g>
);

const Kidney: React.FC<{x: number; y: number; scale?: number; damage: number; phase: number; flip?: boolean}> = ({x, y, scale = 1, damage, phase, flip = false}) => {
  const beat = 1 + 0.018 * Math.sin(phase * 0.075);
  const red = interpolate(damage, [0, 1], [0, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const vesselShift = (phase * 0.7) % 32;
  return <g transform={`translate(${x} ${y}) scale(${scale * beat * (flip ? -1 : 1)} ${scale * beat})`}>
    {/* Bean-shaped kidney with a medial hilum and a cutaway to show the cortex, pyramids and pelvis. */}
    <path d="M-13,-151 C-84,-163 -147,-101 -151,-27 C-156,43 -119,121 -57,146 C-20,161 13,140 35,111 C50,91 51,70 40,48 C27,22 48,6 82,4 C117,2 132,-19 117,-43 C102,-68 70,-74 52,-95 C43,-124 20,-145 -13,-151Z" fill="url(#kidney-shell)" stroke={C.kidneyCortex} strokeWidth="8" />
    <path d="M-13,-127 C-69,-137 -122,-84 -126,-25 C-131,32 -100,95 -51,118 C-25,130 -5,112 12,91 C27,71 29,55 18,35 C4,9 21,-11 55,-17 C78,-21 93,-31 82,-48 C72,-63 48,-70 34,-91 C28,-111 12,-124 -13,-127Z" fill="url(#kidney-cut)" stroke={C.kidneyCortex} strokeWidth="4" />
    {/* Renal medulla: tapered pyramids point toward the collecting pelvis. */}
    <path d="M-83,-94 Q-52,-102 -30,-82 L19,-20 Q-10,-32 -43,-28Z" fill="url(#medulla)" stroke={C.kidneyMedullaStroke} strokeWidth="3" />
    <path d="M-109,-37 Q-78,-55 -46,-30 L19,-8 Q-18,-4 -59,8Z" fill="url(#medulla)" stroke={C.kidneyMedullaStroke} strokeWidth="3" />
    <path d="M-102,18 Q-69,-1 -42,12 L22,5 Q-12,22 -54,47Z" fill="url(#medulla)" stroke={C.kidneyMedullaStroke} strokeWidth="3" />
    <path d="M-75,76 Q-53,48 -25,45 L25,15 Q8,47 -31,88Z" fill="url(#medulla)" stroke={C.kidneyMedullaStroke} strokeWidth="3" />
    <path d="M-31,-107 Q-5,-113 12,-91 L37,-42 Q18,-22 19,5 Q20,20 42,29 Q26,45 18,66 Q11,82 -3,96" fill="none" stroke={C.kidneyPelvis} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
    {/* Renal artery, vein and ureter enter at the hilum. Flow dashes move deterministically with the frame. */}
    <path d="M151,-27 C118,-29 91,-28 68,-18 C51,-11 45,-2 30,4 M77,-21 C67,-39 53,-53 38,-63 M58,-14 C43,-28 28,-33 10,-35" fill="none" stroke={C.vesselArtery} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M151,7 C119,7 91,8 70,13 C53,17 43,18 28,17 M76,11 C62,27 52,39 43,52" fill="none" stroke={C.vesselVein} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40,22 C43,54 32,74 24,94 C18,109 20,129 27,151" fill="none" stroke={C.kidneyPelvis} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M151,-27 C118,-29 91,-28 68,-18 C51,-11 45,-2 30,4 M151,7 C119,7 91,8 70,13 C53,17 43,18 28,17" fill="none" stroke={C.text} strokeOpacity=".8" strokeWidth="3" strokeDasharray="10 24" strokeDashoffset={-vesselShift} strokeLinecap="round" />
    {damage > 0.03 && <g opacity={red}>
      <path d="M-116,-73 C-99,-104 -72,-114 -53,-99 C-42,-89 -46,-72 -63,-61 C-83,-50 -104,-55 -116,-73Z" fill={C.kidneyInjury} opacity=".63" />
      <path d="M-77,76 C-57,52 -36,55 -28,73 C-22,87 -41,103 -58,101 C-74,98 -85,90 -77,76Z" fill={C.kidneyInjury} opacity=".65" />
      <path d="M-104,-73 C-73,-99 -49,-86 -25,-66 M-83,83 C-52,68 -28,67 -5,57" fill="none" stroke={C.danger} strokeWidth="8" strokeDasharray="7 9" strokeLinecap="round" />
      <circle cx="-82" cy="-82" r={8+3*Math.sin(phase*.2)} fill={C.danger} />
    </g>}
    <path d="M-91,-114 Q-54,-148 -15,-138" fill="none" stroke="#fff1e8" strokeOpacity=".55" strokeWidth="8" strokeLinecap="round" />
  </g>;
};

const Bag: React.FC<{x: number; y: number; label: string; fill: string; bad?: boolean; pulse: number; precipitate?: number}> = ({x, y, label, fill, bad, pulse, precipitate = 0}) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-72,-130 h144 v245 q0,24 -22,24 h-100 q-22,0 -22,-24Z" fill="#dff7ed" fillOpacity="0.13" stroke={C.text} strokeWidth="7" />
    <path d={`M-65,${25 + Math.sin(pulse * .05) * 4} h130 v84 q0,20 -22,20 h-86 q-22,0 -22,-20Z`} fill={bad ? C.precipitateSediment : fill} fillOpacity={bad ? .76 : .72} />
    {bad && precipitate > 0 && <g opacity={precipitate}>
      <path d={`M-62,${38+Math.sin(pulse*.07)*4} Q-24,${22+Math.sin(pulse*.09)*5} 4,${45+Math.cos(pulse*.08)*5} T62,${39+Math.sin(pulse*.06)*4} V108 Q0,142 -62,109Z`} fill={C.precipitate} fillOpacity=".8" />
      {Array.from({length:16},(_,i)=>{
        const a=i*2.399963+ pulse*.035;
        const cx=Math.cos(a)*(18+(i%4)*9);
        const cy=43+((i*23+pulse*1.4)%72);
        return <circle key={i} cx={cx} cy={cy} r={3+(i%3)*1.5} fill={i%2?C.text:C.precipitateSediment} opacity=".85"/>;
      })}
      <path d={`M-54,${115+3*Math.sin(pulse*.1)} Q0,${101+4*Math.cos(pulse*.09)} 54,${115+3*Math.sin(pulse*.1)}`} fill="none" stroke={C.precipitateSediment} strokeWidth="8" strokeLinecap="round"/>
    </g>}
    <path d="M-22,-130 v-32 h44 v32 M0,139 v50" fill="none" stroke={C.text} strokeWidth="7" strokeLinecap="round" />
    <circle cx="0" cy="-40" r="23" fill={bad ? C.precipitate : C.text} fillOpacity="0.5" />
    <Pill x={0} y={225} size={30} color={bad ? C.danger : C.mintBright}>{label}</Pill>
    {bad ? <g stroke={C.danger} strokeWidth="15" strokeLinecap="round"><path d="M-28,-74 L28,-18 M28,-74 L-28,-18"/><path d="M-38,46 Q0,20 38,46 M-35,67 Q0,42 35,67" fill="none"/></g> : <path d="M-30,-44 l22,24 44,-52" fill="none" stroke={C.mintBright} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>}
  </g>
);

const Vial: React.FC<{x: number; y: number; phase: number; dissolve?: number}> = ({x, y, phase, dissolve = 0}) => (
  <g transform={`translate(${x} ${y + Math.sin(phase * .06) * 8})`}>
    <rect x="-53" y="-182" width="106" height="55" rx="10" fill="#dce8e1" stroke={C.text} strokeWidth="6" />
    <path d="M-39,-127 v32 l-50,43 v198 q0,24 25,24 h128 q25,0 25,-24 V-52 l-50,-43 v-32Z" fill="#d9eee0" fillOpacity=".22" stroke={C.text} strokeWidth="8" />
    <path d={`M-76,${70 + Math.sin(phase * .08) * 3} h152 v75 q0,24 -25,24 h-102 q-25,0 -25,-24Z`} fill="#e7ce82" fillOpacity={interpolate(dissolve, [0,1],[.45,.82],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/>
    <rect x="-65" y="-18" width="130" height="55" rx="10" fill={C.panelDeep} opacity=".86" />
    <Pill x={0} y={17} size={22}>AmB liposomal</Pill>
  </g>
);

const Fungi: React.FC<{kind: 'candida'|'aspergillus'|'crypto'; x: number; y: number; phase: number; visible: number}> = ({kind,x,y,phase,visible}) => {
  const bob=Math.sin(phase*.1)*8;
  const body=kind==='candida' ? <g>
    <ellipse cx="0" cy="0" rx="59" ry="75" fill="#edc17f" stroke={C.label} strokeWidth="7"/>
    <ellipse cx="63" cy="-48" rx="31" ry="40" fill="#e2a96c" stroke={C.label} strokeWidth="6"/>
    <ellipse cx="-8" cy="-3" rx="16" ry="22" fill="#8c5361" opacity=".82"/>
    <path d="M-27,39 Q0,60 28,35" fill="none" stroke="#fff2dd" strokeWidth="6" strokeLinecap="round"/>
  </g> : kind==='aspergillus' ? <g fill="none" stroke={C.amber} strokeWidth="11" strokeLinecap="round">
    <path d="M0,75 C2,20 -2,-34 0,-98 M0,-36 C-26,-53 -43,-74 -56,-99 M0,-56 C24,-68 40,-92 52,-113 M-28,-60 L-68,-65 M27,-75 L66,-80"/>
    <circle cx="0" cy="-121" r="24" fill="#efb47d" stroke={C.label} strokeWidth="6"/>
    {Array.from({length:9},(_,i)=>{const a=i*Math.PI*2/9;return <circle key={i} cx={Math.cos(a)*42} cy={-121+Math.sin(a)*42} r="9" fill={C.rose} stroke="none"/>})}
  </g> : <g>
    <circle cx="0" cy="0" r="63" fill="#bd8ec0" stroke={C.label} strokeWidth="7"/>
    <circle cx="0" cy="0" r="82" fill="none" stroke="#d8c1e4" strokeWidth="9" strokeDasharray="15 12" opacity=".9"/>
    <circle cx="-13" cy="-8" r="17" fill="#70466f"/>
    <path d="M-23,30 Q0,47 24,24" fill="none" stroke="#fff2dd" strokeWidth="5" strokeLinecap="round"/>
  </g>;
  return <g opacity={visible} transform={`translate(${x} ${y+bob}) scale(${1+0.035*Math.sin(phase*.13)})`}>{body}</g>;
};

const TextTag: React.FC<{x:number;y:number;text:string;shown:boolean;phase:number;color?:string}> = ({x,y,text,shown,phase,color=C.label}) => <g opacity={shown?1:0}>
  <rect x={x-150} y={y-43+Math.sin(phase*.05)*2} width="300" height="56" rx="24" fill={C.panel} stroke={color} strokeOpacity=".72" strokeWidth="2"/>
  <Pill x={x} y={y-4} size={26} color={color}>{text}</Pill>
</g>;

const BackdropEnvironment: React.FC<{stage: Stage; phase: number}> = ({stage,phase}) => {
  const pulse=.5+.5*Math.sin(phase*.09);
  return <g opacity=".76">
    {/* Depth cues for a clinical treatment room: wall panels, ceiling lights, monitor, IV pole, bed and floor. */}
    <path d="M0,230 Q540,190 1080,230 M0,445 Q540,425 1080,445" fill="none" stroke={C.mint} strokeOpacity=".22" strokeWidth="5"/>
    {[115,360,720,965].map((x,i)=><g key={`ceiling-${i}`} opacity={.22+.12*pulse}>
      <path d={`M${x-62},225 h124 l-16,27 h-92Z`} fill={C.label}/>
      <path d={`M${x-70},257 h140`} stroke={C.text} strokeOpacity=".32" strokeWidth="3"/>
    </g>)}
    <g opacity=".28">
      <rect x="42" y="290" width="240" height="150" rx="8" fill={C.panelDeep} stroke={C.mint} strokeWidth="5"/>
      <path d="M162,292 v146 M44,365 h236" stroke={C.mint} strokeOpacity=".46" strokeWidth="4"/>
      <path d="M55,425 Q110,360 166,416 T270,395" fill="none" stroke={C.label} strokeOpacity=".65" strokeWidth="4"/>
    </g>
    <g transform={`translate(850 300)`} opacity={.3+.12*pulse}>
      <rect x="0" y="0" width="180" height="130" rx="17" fill={C.panelDeep} stroke={C.mint} strokeWidth="5"/>
      <path d={`M16,76 h35 l18,-35 26,66 20,-38 h48`} fill="none" stroke={C.mintBright} strokeWidth="5" strokeDasharray="14 8" strokeDashoffset={-phase*1.1}/>
      <circle cx="153" cy="25" r={6+3*pulse} fill={C.danger}/>
    </g>
    <g transform={`translate(1010 ${465+5*Math.sin(phase*.05)})`} opacity=".38">
      <path d="M0,0 v870 M-36,80 h36 M-36,345 h36" stroke={C.text} strokeWidth="7"/>
      <path d="M-57,55 h82 v148 q0,22 -22,22 h-38 q-22,0 -22,-22Z" fill={C.mint} fillOpacity=".13" stroke={C.text} strokeWidth="5"/>
      <path d={`M-49,150 h66 v50 q0,16 -18,16 h-30 q-18,0 -18,-16Z`} fill={C.mintBright} fillOpacity={.27+.12*pulse}/>
      <path d="M-14,227 v38" stroke={C.text} strokeWidth="5"/>
    </g>
    <g opacity=".27">
      <path d="M25,1540 h410 q40,0 52,34 l42,105 H48Z" fill={C.panelDeep} stroke={C.mint} strokeWidth="5"/>
      <path d="M70,1538 v-72 h280 q40,0 60,38 l34,44 M90,1680 v63 M465,1680 v63" fill="none" stroke={C.text} strokeWidth="8" strokeLinecap="round"/>
      <path d="M480,1573 Q560,1530 640,1573" fill="none" stroke={C.rose} strokeWidth="9" strokeLinecap="round"/>
      <path d="M0,1760 Q540,1715 1080,1760 M0,1820 Q540,1775 1080,1820" fill="none" stroke={C.text} strokeOpacity=".18" strokeWidth="4"/>
    </g>
    {stage==='fungi' && <g opacity=".26">
      <circle cx="535" cy="930" r={420+8*Math.sin(phase*.025)} fill="none" stroke={C.rose} strokeWidth="14"/>
      <circle cx="535" cy="930" r="375" fill="none" stroke={C.label} strokeOpacity=".5" strokeWidth="4" strokeDasharray="18 26" strokeDashoffset={-phase}/>
      <path d={`M90,1000 C230,${820+12*Math.sin(phase*.04)} 260,${1160+12*Math.cos(phase*.04)} 415,950 S650,${790+10*Math.sin(phase*.05)} 800,1000 S940,${1120+10*Math.cos(phase*.04)} 1015,905`} fill="none" stroke={C.rose} strokeWidth="9" strokeLinecap="round"/>
      {Array.from({length:12},(_,i)=>{const a=i*2.4+phase*.012;return <circle key={`spore-${i}`} cx={535+300*Math.cos(a)} cy={930+300*Math.sin(a)} r={7+(i%3)*3} fill={C.label} opacity={.45+.25*pulse}/>})}
    </g>}
    {stage==='mechanism' && <g opacity=".2">
      <path d={`M-20,680 Q200,620 420,680 T860,680 T1100,660 M-20,1070 Q200,1130 420,1070 T860,1070 T1100,1090`} fill="none" stroke={C.amber} strokeWidth="20"/>
      <circle cx={170+12*Math.sin(phase*.03)} cy="855" r="135" fill="none" stroke={C.mintBright} strokeWidth="10" strokeDasharray="20 18" strokeDashoffset={phase*1.4}/>
      <circle cx={900+10*Math.cos(phase*.025)} cy="850" r="175" fill="none" stroke={C.label} strokeWidth="7"/>
    </g>}
    {stage==='renal' && <g opacity=".24">
      <path d="M535,530 C520,800 550,1090 535,1360 M585,530 C570,800 600,1090 585,1360" fill="none" stroke={C.vesselArtery} strokeWidth="32"/>
      <path d="M535,840 C420,820 330,800 210,855 M535,840 C650,820 750,800 870,855 M585,900 C450,910 335,930 205,970 M585,900 C720,910 825,930 890,970" fill="none" stroke={C.vesselVein} strokeWidth="13" strokeDasharray="12 20" strokeDashoffset={-phase}/>
    </g>}
    {stage==='preparation' && <g opacity=".32">
      <path d="M0,1430 Q540,1388 1080,1430 V1510 Q540,1468 0,1510Z" fill={C.amber} fillOpacity=".12"/>
      <path d="M0,1430 Q540,1388 1080,1430" fill="none" stroke={C.label} strokeOpacity=".5" strokeWidth="5"/>
      <path d="M585,1480 v-180 M570,1300 h30 M900,1490 v-210 M885,1280 h30" stroke={C.text} strokeOpacity=".45" strokeWidth="6"/>
      <path d="M560,1325 h50 v88 q0,12 -12,12 h-26 q-12,0 -12,-12Z M875,1305 h50 v100 q0,12 -12,12 h-26 q-12,0 -12,-12Z" fill={C.mint} fillOpacity=".18" stroke={C.text} strokeOpacity=".44" strokeWidth="4"/>
    </g>}
    {stage==='reactions' && <g opacity=".35">
      <path d={`M55,700 h50 l18,-${45+10*pulse} 28,${92+14*pulse} 32,-55 h74`} fill="none" stroke={C.danger} strokeWidth="8" strokeDasharray="15 12" strokeDashoffset={phase*1.8}/>
      <circle cx="550" cy="1290" r={155+8*Math.sin(phase*.08)} fill="none" stroke={C.rose} strokeWidth="7" strokeDasharray="24 19"/>
      <path d="M360,1480 h380 M400,1510 h300" stroke={C.text} strokeOpacity=".48" strokeWidth="7" strokeLinecap="round"/>
    </g>}
    {stage==='labs' && <g opacity=".32">
      <path d="M38,1450 H1040 v110 H38Z" fill={C.panelDeep} stroke={C.mint} strokeWidth="5"/>
      {[100,160,220,280,340,740,800,860,920].map((x,i)=><g key={`tube-${i}`} transform={`translate(${x} 1370)`}>
        <path d="M-17,0 h34 v85 q0,20 -17,20 q-17,0 -17,-20Z" fill={C.text} fillOpacity=".13" stroke={C.text} strokeOpacity=".55" strokeWidth="4"/>
        <path d={`M-12,${59+4*Math.sin(phase*.07+i)} h24 v25 q0,12 -12,12 q-12,0 -12,-12Z`} fill={i%2?C.amber:C.rose} fillOpacity=".7"/>
      </g>)}
      <path d="M50,1575 H1035 M80,1608 H1000" stroke={C.text} strokeOpacity=".2" strokeWidth="4"/>
    </g>}
  </g>;
};

/** All scene motion is derived from Remotion's frame. cue times are transcript offsets passed in scenes.json. */
export const AntifungalTimeline: React.FC<SceneProps> = ({t, props: raw}) => {
  const props=raw as Props;
  const stage=props.stage ?? 'opening';
  const cues=props.cues ?? {};
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const phase=frame;
  const cue=(name:string)=>Number.isFinite(cues[name])?cues[name]:0;
  const shown=(name:string)=>t>=cue(name);
  const fade=(name:string)=>interpolate(t,[cue(name),cue(name)+.28],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const pulse=1+.02*Math.sin(phase*.11);
  const bg=theme.sceneBackgrounds[stage];
  const bgId=`scene-bg-${stage}`;
  const glowId=`scene-glow-${stage}`;
  const bgScale=1+.025*Math.sin(phase*.12);
  return <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1"><stop stopColor={bg.deep}/><stop offset=".55" stopColor={bg.middle}/><stop offset="1" stopColor={bg.deep}/></linearGradient>
      <radialGradient id={glowId}><stop stopColor={bg.glow} stopOpacity=".55"/><stop offset="1" stopColor={bg.glow} stopOpacity="0"/></radialGradient>
      <radialGradient id="liposome"><stop stopColor="#f8e1aa" stopOpacity=".24"/><stop offset=".7" stopColor="#81e5d3" stopOpacity=".55"/><stop offset="1" stopColor="#c5f4e9" stopOpacity=".9"/></radialGradient>
      <linearGradient id="membrane" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#efb47d"/><stop offset=".5" stopColor="#f7dba6"/><stop offset="1" stopColor="#bf7390"/></linearGradient>
      <linearGradient id="kidney-shell" x1="0" y1="0" x2="1" y2="1"><stop stopColor={C.kidneyShellHighlight}/><stop offset=".38" stopColor={C.rose}/><stop offset=".72" stopColor={C.kidneyShell}/><stop offset="1" stopColor={C.bloodDeep}/></linearGradient>
      <linearGradient id="kidney-cut" x1="0" y1="0" x2="1" y2="1"><stop stopColor={C.skin}/><stop offset=".52" stopColor={C.kidneyCortex}/><stop offset="1" stopColor={C.rose}/></linearGradient>
      <linearGradient id="medulla" x1="0" y1="0" x2="1" y2="1"><stop stopColor={C.rose}/><stop offset=".55" stopColor={C.kidneyMedulla}/><stop offset="1" stopColor={C.bloodDeep}/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="13" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id={`ambient-${stage}`}><feGaussianBlur stdDeviation="48"/></filter>
    </defs>
    <rect width="1080" height="1920" fill={`url(#${bgId})`}/>
    <ellipse cx={220+100*Math.sin(phase*.018)} cy={600+90*Math.cos(phase*.022)} rx={310*bgScale} ry={520*bgScale} fill={`url(#${glowId})`} opacity=".42" filter={`url(#ambient-${stage})`}/>
    <ellipse cx={930+80*Math.cos(phase*.015)} cy={1320+110*Math.sin(phase*.02)} rx={340*bgScale} ry={460*bgScale} fill={`url(#${glowId})`} opacity=".34" filter={`url(#ambient-${stage})`}/>
    <path d={`M-40 ${430+15*Math.sin(phase*.027)} Q280 ${360+22*Math.sin(phase*.02)} 560 ${425+18*Math.cos(phase*.025)} T1120 ${390+20*Math.sin(phase*.018)}`} fill="none" stroke={bg.glow} strokeOpacity=".28" strokeWidth="5" strokeDasharray="22 28" strokeDashoffset={-phase*1.1}/>
    <path d={`M-20 ${1510+20*Math.sin(phase*.02)} Q360 ${1420+18*Math.cos(phase*.019)} 680 ${1500+16*Math.sin(phase*.023)} T1100 ${1440+15*Math.cos(phase*.017)}`} fill="none" stroke={bg.glow} strokeOpacity=".18" strokeWidth="4" strokeDasharray="14 34" strokeDashoffset={phase*.75}/>
    {Array.from({length:18},(_,i)=>{
      const x=(i*173+((i%4)*49))%1080;
      const y=((i*137+phase*(.35+(i%4)*.16))%2050)-65;
      const radius=3+(i%3)*2;
      return <circle key={`dust-${stage}-${i}`} cx={x} cy={y} r={radius} fill={i%3===0?C.label:bg.glow} opacity={.10+(i%4)*.035}/>;
    })}
    <BackdropEnvironment stage={stage} phase={phase}/>
    <text x="540" y="175" textAnchor="middle" fill={C.label} fontFamily={theme.font.family} fontWeight="800" fontSize="37" letterSpacing="5">MEDISHORT360</text>
    {stage==='opening' && <g>
      <text x="540" y="325" textAnchor="middle" fill={C.text} fontFamily={theme.font.family} fontWeight="800" fontSize="54">¡Hola, hijos de Florence</text>
      <text x="540" y="390" textAnchor="middle" fill={C.text} fontFamily={theme.font.family} fontWeight="800" fontSize="54">Nightingale!</text>
      <Panel y={470} height={1040}>
        <ellipse cx="540" cy="870" rx={220*pulse} ry={220*pulse} fill="url(#liposome)" stroke={C.mintBright} strokeWidth="12" filter="url(#glow)" opacity={shown('liposomal')?.9:.35}/>
        {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6+phase*.018;return <circle key={i} cx={540+184*Math.cos(a)} cy={870+184*Math.sin(a)} r="11" fill={C.label} opacity=".8"/>})}
        <Vial x={540} y={900} phase={phase}/>
        <g opacity={fade('anfotericina')}><Pill x={540} y={1295} size={40}>Anfotericina B liposomal</Pill><path d={`M540,${1225+6*Math.sin(phase*.07)} v-74`} stroke={C.mintBright} strokeWidth="6" strokeDasharray="10 12"/></g>
      </Panel>
    </g>}
    {stage==='fungi' && <g>
      <Pill x={540} y={345} size={43}>Micosis graves</Pill>
      <Panel>
        {(['candida','aspergillus','crypto'] as const).map((kind,i)=>{
          const names=['Candida','Aspergillus','Cryptococcus'];const keys=['candida','aspergillus','cryptococcus'];
          const x=[250,540,830][i];const vis=fade(keys[i]);
          return <g key={kind}><Fungi kind={kind} x={x} y={850} phase={phase+i*31} visible={vis}/><TextTag x={x} y={1110} text={names[i]} shown={shown(keys[i])} phase={phase}/></g>;
        })}
        <path d={`M150,1270 Q540,${1235+12*Math.sin(phase*.04)} 930,1270`} fill="none" stroke={C.mint} strokeWidth="4" strokeOpacity=".5"/>
      </Panel>
    </g>}
    {stage==='mechanism' && <g>
      <Pill x={540} y={345} size={42}>Mecanismo de acción</Pill>
      <Panel>
        <rect x="145" y="680" width="790" height="340" rx="80" fill="url(#membrane)" opacity=".7" stroke={C.label} strokeWidth="7"/>
        <path d="M160,740 Q290,700 400,742 T640,738 T920,742 M160,960 Q290,1000 400,958 T640,962 T920,958" fill="none" stroke="#f7e4bf" strokeWidth="18" opacity=".8"/>
        {Array.from({length:9},(_,i)=>{const x=205+i*82;const y=850+Math.sin(phase*.075+i)*15;return <g key={i} opacity={fade('ergosterol')}><circle cx={x} cy={y} r="18" fill="#ed5166" stroke="#fff2dd" strokeWidth="5"/><path d={`M${x-12},${y-15} l-18,-32 m42,32 l18,-32`} stroke="#ed5166" strokeWidth="7"/><circle cx={x} cy={y} r="31" fill="none" stroke="#ffe082" strokeWidth="3" opacity=".7"/></g>})}
        <g opacity={fade('dana')} transform={`translate(${interpolate(t,[cue('dana'),cue('ergosterol')+0.5],[120,490],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} ${790+14*Math.sin(phase*.09)})`}>
          <circle r="94" fill="url(#liposome)" stroke={C.mintBright} strokeWidth="9"/><circle r="57" fill="none" stroke={C.label} strokeWidth="5" strokeDasharray="11 12"/>
          {Array.from({length:7},(_,i)=>{const a=i*Math.PI*2/7+phase*.035;return <circle key={i} cx={70*Math.cos(a)} cy={70*Math.sin(a)} r="8" fill={C.label}/>})}
        </g>
        <path d={`M550,850 C650,${790+8*Math.sin(phase*.12)} 740,${770+12*Math.cos(phase*.1)} 825,720`} fill="none" stroke="#fff1b2" strokeWidth="8" strokeDasharray="16 14" opacity={t>cue('membrana')?.9:.15}/>
        <g opacity={fade('membrana')}>
          {Array.from({length:10},(_,i)=>{const a=i*2.4+phase*.07;const r=70+(i%3)*35+(phase%100)*.25;return <circle key={i} cx={730+Math.cos(a)*r} cy={850+Math.sin(a)*r} r="10" fill={i%2?C.mintBright:C.label} opacity=".8"/>})}
          <path d="M164,815 Q280,780 390,817 T620,811 T920,818 M165,895 Q280,934 390,895 T620,899 T920,892" fill="none" stroke="#fb6570" strokeWidth="18" strokeDasharray="24 20" opacity={t>cue('membrana')+1?.28:.6}/>
        </g>
        <Pill x={540} y={1195} size={30}>Ergosterol resaltado · membrana permeable</Pill>
        <Pill x={540} y={1360} size={28} color={C.amber}>Esquema ilustrativo</Pill>
      </Panel>
    </g>}
    {stage==='renal' && <g>
      <Pill x={540} y={345} size={43}>Vigilancia renal</Pill>
      <Panel>
        <g opacity=".9">
          <path d="M535,680 C532,790 538,910 535,1030" fill="none" stroke={C.vesselArtery} strokeWidth={42+2*Math.sin(phase*.08)} strokeLinecap="round"/>
          <path d="M585,680 C582,790 588,910 585,1030" fill="none" stroke={C.vesselVein} strokeWidth="35" strokeLinecap="round"/>
          <path d="M535,829 C500,829 475,830 441,829 M535,829 C575,829 605,830 639,829" fill="none" stroke={C.vesselArtery} strokeWidth="18" strokeLinecap="round"/>
          <path d="M585,862 C540,862 493,862 441,862 M585,862 C630,862 639,862 639,862" fill="none" stroke={C.vesselVein} strokeWidth="16" strokeLinecap="round"/>
        </g>
        <Kidney x={290} y={855} scale={1} damage={shown('convencional')?1:0} phase={phase}/>
        <Kidney x={790} y={855} scale={1} damage={shown('pero')?.14+.12*(.5+.5*Math.sin((t-cue('pero'))*13)):0} phase={phase+22} flip/>
        <Pill x={290} y={1120} size={28}>Convencional</Pill><Pill x={790} y={1120} size={28}>Liposomal</Pill>
        <g opacity={fade('convencional')}><path d="M160,680 L220,750 M220,680 L160,750" stroke={C.danger} strokeWidth="18" strokeLinecap="round"/><Pill x={290} y={1240} color={C.danger} size={27}>Daño más marcado</Pill></g>
        <g opacity={fade('pero')}><circle cx={790} cy={760} r={50+12*Math.sin(phase*.18)} fill="none" stroke={C.amber} strokeWidth="8"/><Pill x={790} y={1240} color={C.label} size={27}>Puede afectar</Pill></g>
        <text x="540" y="1360" textAnchor="middle" fill={C.mintBright} fontSize="29" fontFamily={theme.font.family}>Verifica: liposomal ≠ convencional</text>
        <path d={`M380,1430 Q540,${1408+10*Math.sin(phase*.05)} 700,1430`} stroke={C.mint} strokeWidth="5" fill="none"/>
      </Panel>
    </g>}
    {stage==='preparation' && <g>
      <Pill x={540} y={345} size={43}>Preparación y dilución</Pill>
      <Panel>
        <Vial x={275} y={850} phase={phase} dissolve={shown('agua')?Math.min(1,(t-cue('agua'))*1.8):0}/>
        <g opacity={fade('agua')} transform={`translate(510 ${700+Math.sin(phase*.08)*6}) rotate(-18)`}>
          <rect x="-20" y="-110" width="40" height="170" rx="8" fill="#dcebe5" stroke={C.text} strokeWidth="5"/><path d="M-11,-100 h22 M0,60 v80" stroke={C.text} strokeWidth="6"/><path d="M0,140 Q-10,170 0,177 Q10,170 0,140" fill="#9cdbd2"/>
        </g>
        <Pill x={280} y={1125} size={27}>Agua estéril</Pill>
        <path d="M550,900 H630" stroke={C.mintBright} strokeWidth="8" strokeDasharray="12 12" opacity={fade('glucosa')}/>
        <g opacity={fade('glucosa')}><Bag x={770} y={850} label="SG 5 %" fill="#bce4dc" pulse={phase}/></g>
        <g transform={`translate(770 570) scale(${1+.035*Math.sin(phase*.17)})`}>
          <rect x="-176" y="-53" width="352" height="78" rx="28" fill={C.danger} fillOpacity=".15" stroke={C.danger} strokeOpacity=".9" strokeWidth="4"/>
          <path d={`M-145,-14 H${-124+10*Math.sin(phase*.22)} M145,-14 H${124+10*Math.cos(phase*.2)}`} stroke={C.danger} strokeWidth="7" strokeLinecap="round"/>
          <text x="0" y="4" textAnchor="middle" fill={C.danger} fontFamily={theme.font.family} fontWeight="900" fontSize="48" letterSpacing="3">PRECIPITA</text>
        </g>
        <g opacity={fade('nunca')} transform={`rotate(${1.2*Math.sin(phase*.22)} 770 1165)`}>
          <Bag x={770} y={1165} label="Solución salina" fill={C.precipitate} bad pulse={phase} precipitate={fade('salina')}/>
        </g>
        <g opacity={fade('salina')}>
          <path d={`M770,1360 C${730+8*Math.sin(phase*.18)},1410 ${820+8*Math.cos(phase*.16)},1410 770,1450`} fill="none" stroke={C.danger} strokeWidth="7" strokeDasharray="12 11" strokeDashoffset={-phase*1.8}/>
        </g>
        <Pill x={275} y={1405} size={26} color={C.amber}>Reconstituir</Pill>
      </Panel>
    </g>}
    {stage==='premedication' && <g>
      <Pill x={540} y={345} size={41}>Premedicación según protocolo</Pill>
      <Panel>
        <path d="M170,790 H910" stroke={C.mint} strokeWidth="12" strokeLinecap="round"/>
        <circle cx={170+Math.min(660,Math.max(0,(t-cue('premedica'))*120))} cy={790+5*Math.sin(phase*.15)} r={26+4*Math.sin(phase*.18)} fill={C.mintBright} stroke={C.text} strokeWidth="4"/>
        <Pill x={170} y={710} size={26}>Antes de la 1.ª dosis</Pill>
        {[
          {key:'paracetamol',x:360,label:'Paracetamol',sub:'según protocolo',color:C.amber},
          {key:'antihistaminico',x:585,label:'Antihistamínico',sub:'según protocolo',color:C.rose},
          {key:'hidrocortisona',x:810,label:'Hidrocortisona',sub:'a veces / según protocolo',color:C.mintBright},
        ].map((m,i)=> <g key={m.key} opacity={fade(m.key)} transform={`translate(${m.x} ${790+Math.sin(phase*.08+i)*7})`}>
          <circle r="82" fill={m.color} fillOpacity=".24" stroke={m.color} strokeWidth="6"/>
          <rect x="-42" y="-22" width="84" height="44" rx="22" fill={m.color} transform={`rotate(${phase*.12+i*27})`}/>
          <text x="0" y="135" textAnchor="middle" fill={C.text} fontFamily={theme.font.family} fontWeight="700" fontSize="24">{m.label}</text>
          <text x="0" y="174" textAnchor="middle" fill={m.color} fontFamily={theme.font.family} fontSize="20">{m.sub}</text>
        </g>)}
        <g opacity={fade('protocolo')}>
          <path d={`M270,1120 Q540,${1080+12*Math.sin(phase*.04)} 810,1120`} fill="none" stroke={C.amber} strokeWidth="5" strokeDasharray="10 14"/>
          <Pill x={540} y={1210} size={31}>Para reducir reacciones a la infusión</Pill>
        </g>
      </Panel>
    </g>}
    {stage==='reactions' && <g>
      <Pill x={540} y={345} size={42}>Vigila durante la infusión</Pill>
      <Panel>
        <g opacity={fade('fiebre')} transform={`translate(255 760)`}>
          <rect x="-30" y="-115" width="60" height="210" rx="28" fill="#fff0db" stroke={C.text} strokeWidth="7"/><circle cx="0" cy="103" r="48" fill="#f35a62"/><path d={`M0,55 V${-30+15*Math.sin(phase*.12)}`} stroke="#f35a62" strokeWidth="14" strokeLinecap="round"/>
          <Pill x={0} y={210} size={27} color="#ff7780">Fiebre</Pill>
        </g>
        <g opacity={fade('escalofrios')} transform={`translate(535 800)`}>
          <circle cy="-75" r="43" fill={C.skin} stroke={C.text} strokeWidth="5"/>
          <path d={`M0,-28 l${-9+12*Math.sin(phase*.35)},85 -65,80 m65,-80 72,80 m-72,-48 -58,98 m58,-98 58,98`} fill="none" stroke={C.skin} strokeWidth="20" strokeLinecap="round"/>
          <path d={`M-120,-20 h-30 m270,0 h30 M-130,42 h-30 m290,0 h30`} stroke={C.mintBright} strokeWidth="7"/>
          <Pill x={0} y={230} size={26}>Escalofríos</Pill>
        </g>
        <g opacity={fade('hipotension')} transform={`translate(825 770)`}>
          <rect x="-112" y="-104" width="224" height="170" rx="18" fill="#132a35" stroke={C.mint} strokeWidth="7"/>
          <path d={`M-92,0 H-55 l25,-50 30,87 34,-55 h52`} fill="none" stroke="#ff626c" strokeWidth="9" strokeDasharray="${t>cue('hipotension')?6:0} 0"/>
          <text x="0" y="-52" textAnchor="middle" fill="#ff7b7d" fontSize="30" fontWeight="700" fontFamily={theme.font.family}>{Math.max(65,108-Math.floor(Math.max(0,t-cue('hipotension'))*15))}/{Math.max(40,70-Math.floor(Math.max(0,t-cue('hipotension'))*9))}</text>
          <Pill x={0} y={130} size={27}>Hipotensión</Pill>
        </g>
        <g opacity={fade('dificultad')} transform={`translate(540 1240) scale(${pulse})`}>
          <path d="M-5,-100 v80 M-5,-20 C-40,-52 -124,-67 -138,20 C-149,91 -115,115 -75,96 C-38,78 -30,30 -5,8 M5,-20 C40,-52 124,-67 138,20 C149,91 115,115 75,96 C38,78 30,30 5,8" fill="#bd7891" stroke={C.label} strokeWidth="7"/>
          <path d={`M-85,20 Q-45,${-5+12*Math.sin(phase*.45)} -15,24 M15,24 Q45,${-5+12*Math.sin(phase*.45)} 85,20`} fill="none" stroke="#f3c8c3" strokeWidth="7"/>
          <Pill x={0} y={180} size={25}>Dificultad respiratoria</Pill>
        </g>
        <text x="540" y="1520" textAnchor="middle" fill={C.mintBright} fontSize="28" fontFamily={theme.font.family}>Constantes cada 15-30 min en la 1.ª infusión</text>
      </Panel>
    </g>}
    {stage==='labs' && <g>
      <Pill x={540} y={345} size={42}>Controla función renal y electrolitos</Pill>
      <Panel>
        <Kidney x={270} y={800} scale={.9} damage={.35} phase={phase}/>
        <g opacity={fade('creatinina')}>
          <path d="M420,1000 V620" stroke={C.text} strokeWidth="12" strokeLinecap="round"/><path d="M420,1000 H530" stroke={C.text} strokeWidth="8"/>
          <path d={`M405,${965-Math.min(300,Math.max(0,t-cue('creatinina'))*120)} h30`} stroke="#ff696e" strokeWidth="18" strokeLinecap="round"/>
          <Pill x={470} y={1090} size={27} color="#ff8185">Creatinina</Pill>
        </g>
        <g opacity={fade('potasio')}>
          <rect x="595" y="650" width="135" height="390" rx="38" fill="#102c37" stroke={C.text} strokeWidth="6"/>
          <rect x="612" y={700+Math.min(275,Math.max(0,t-cue('potasio'))*120)} width="101" height={300-Math.min(260,Math.max(0,t-cue('potasio'))*120)} rx="24" fill={C.amber}/>
          <Pill x={662} y={1090} size={25}>Potasio</Pill>
        </g>
        <g opacity={fade('magnesio')}>
          <rect x="790" y="650" width="135" height="390" rx="38" fill="#102c37" stroke={C.text} strokeWidth="6"/>
          <rect x="807" y={700+Math.min(275,Math.max(0,t-cue('magnesio'))*120)} width="101" height={300-Math.min(260,Math.max(0,t-cue('magnesio'))*120)} rx="24" fill={C.mintBright}/>
          <Pill x={857} y={1090} size={25}>Magnesio</Pill>
        </g>
        <path d={`M240,1210 Q540,${1184+10*Math.sin(phase*.05)} 840,1210`} fill="none" stroke={C.mint} strokeWidth="5" strokeDasharray="12 14"/>
        <g opacity={fade('siguenos')}>
          <text x="540" y="1360" textAnchor="middle" fill={C.label} fontFamily={theme.font.family} fontWeight="800" fontSize="42">Síguenos en</text>
          <text x="540" y="1430" textAnchor="middle" fill={C.mintBright} fontFamily={theme.font.family} fontWeight="900" fontSize="56" letterSpacing="4">MEDISHORT360</text>
          <circle cx={540+Math.cos(phase*.07)*220} cy="1390" r="12" fill={C.label}/>
        </g>
      </Panel>
    </g>}
  </svg>;
};
