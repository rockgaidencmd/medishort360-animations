import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const reveal = (t:number,start:number,end:number,fade=.45) => interpolate(t,[start,start+fade,end-fade,end],[0,1,1,0],clamp);

const RedCell:React.FC<{x:number;y:number;frame:number;speed?:number;delay?:number;scale?:number}> = ({x,y,frame,speed=2,delay=0,scale=1}) => {
  const position=((frame*speed+delay)%1260)-90;
  return <g transform={`translate(${x+position} ${y}) scale(${scale})`}>
    <ellipse rx="27" ry="15" fill="#a5263d" stroke="#ff9f9d" strokeWidth="2.5"/>
    <ellipse rx="11" ry="5.5" fill="#e96e75" opacity=".95"/>
    <path d="M-21 -3 Q0 -12 21 -3" fill="none" stroke="#ffd1cc" strokeWidth="2" opacity=".72"/>
  </g>;
};

const KineticCaption:React.FC<{t:number;frame:number;fps:number}> = ({t,frame,fps}) => {
  const lines=[
    {start:0,end:5.4,words:['¿Por','qué','manos','y','pies','MORADOS?'],key:5,color:'#ffdf67'},
    {start:5.96,end:7.86,words:['¡Hola,','hijos','de','Florence','Nightingale!'],key:4,color:'#69e7ef'},
    {start:8.34,end:10.46,words:['Medicamentos','como','la','NOREPINEFRINA'],key:3,color:'#69e7ef'},
    {start:10.46,end:13.8,words:['producen','VASOCONSTRICCIÓN','para','elevar','la','presión','arterial'],key:1,color:'#ffdf67'},
    {start:14.28,end:14.72,words:['OBSERVA'],key:0,color:'#ffdf67'},
    {start:15.22,end:17.14,words:['Las','arterias','pequeñas','se','estrechan'],key:2,color:'#69e7ef'},
    {start:17.56,end:22.44,words:['Aumenta','la','resistencia','vascular','y','puede','bajar','el','flujo','distal'],key:8,color:'#ffdf67'},
    {start:23.04,end:25.22,words:['Si','la','perfusión','es','insuficiente…'],key:2,color:'#ffdf67'},
    {start:25.22,end:27.22,words:['MENOS','OXÍGENO','EN','LOS','TEJIDOS'],key:1,color:'#69e7ef'},
    {start:27.22,end:31.3,words:['Frialdad,','coloración','violácea','o','piel','moteada'],key:2,color:'#ffdf67'},
    {start:31.82,end:36.62,words:['El','shock','también','puede','alterar','la','microcirculación'],key:1,color:'#69e7ef'},
    {start:36.62,end:37.84,words:['No','solo','el','medicamento'],key:3,color:'#ffdf67'},
    {start:38.4,end:41.46,words:['Valora','coloración','y','temperatura'],key:1,color:'#69e7ef'},
    {start:41.46,end:45.04,words:['Relleno','capilar','y','pulsos','periféricos'],key:1,color:'#ffdf67'},
    {start:45.04,end:48.2,words:['Comunica','de','inmediato','cualquier','deterioro'],key:4,color:'#ffdf67'},
    {start:48.2,end:50.15,words:['Síguenos','en','MEDISHORT360'],key:2,color:'#69e7ef'}
  ];
  const line=lines.find((item)=>t>=item.start && t<item.end);
  if(!line)return null;
  return <div style={{position:'absolute',top:138,left:58,right:58,minHeight:104,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'5px 12px',textAlign:'center',fontSize:43,lineHeight:1.08,fontWeight:850,letterSpacing:.2,textShadow:'0 4px 20px rgba(14,3,37,.9)'}}>
    {line.words.map((word,index)=>{
      const age=frame-Math.round(line.start*fps)-index*2;
      const opacity=interpolate(age,[0,6],[0,1],clamp);
      const y=interpolate(age,[0,6],[24,0],clamp);
      const key=index===line.key;
      return <span key={`${line.start}-${index}`} style={{display:'inline-block',opacity,transform:`translateY(${y}px) scale(${key?1.04:1})`,color:key?line.color:'#fff',textShadow:key?`0 0 20px ${line.color}88, 0 4px 18px rgba(14,3,37,.92)`:'0 4px 18px rgba(14,3,37,.92)'}}>{word}</span>;
    })}
  </div>;
};

export const VasopresoresFull:React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const t=frame/fps;
  const constriction=interpolate(t,[14.5,17.2,22.5],[0,1,.92],clamp);
  const lumen=310-155*constriction;
  const top=960-lumen/2;
  const bottom=960+lumen/2;
  const patientOpacity=Math.max(reveal(t,0,14.25,.16),reveal(t,31.7,48.25,.6));
  const greetingOpacity=reveal(t,5.82,8.2,.35);
  const drugOpacity=reveal(t,8.2,15,.5);
  const vesselOpacity=reveal(t,14.1,23.1,.55);
  const tissueOpacity=reveal(t,22.8,31.65,.55);
  const handOpacity=reveal(t,1.6,5.8,.3);
  const symptomHandOpacity=reveal(t,26.8,31.7,.4);
  const nursingOpacity=reveal(t,38,48.25,.45);
  const outroOpacity=reveal(t,48.08,50.834,.3);
  const flowSpeed=interpolate(t,[15.5,18.5,22.5],[2.3,1.25,1.1],clamp);

  return <AbsoluteFill style={{background:'#241441',fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
      <defs>
        <linearGradient id="fullBg" x2=".8" y2="1"><stop stopColor="#341653"/><stop offset=".52" stopColor="#241541"/><stop offset="1" stopColor="#4a1d6c"/></linearGradient>
        <radialGradient id="violetGlow"><stop stopColor="#cb6fe8" stopOpacity=".48"/><stop offset="1" stopColor="#cb6fe8" stopOpacity="0"/></radialGradient>
        <radialGradient id="cyanGlow"><stop stopColor="#44d9df" stopOpacity=".34"/><stop offset="1" stopColor="#44d9df" stopOpacity="0"/></radialGradient>
        <linearGradient id="skinFull" x2=".2" y2="1"><stop stopColor="#edbd9d"/><stop offset=".55" stopColor="#cb8b71"/><stop offset="1" stopColor="#a36462"/></linearGradient>
        <linearGradient id="distalBlue" x2="0" y2="1"><stop stopColor="#5362a6" stopOpacity=".83"/><stop offset=".38" stopColor="#645c9f" stopOpacity=".62"/><stop offset=".78" stopColor="#6f6ba5" stopOpacity=".24"/><stop offset="1" stopColor="#706da3" stopOpacity="0"/></linearGradient>
        <linearGradient id="wallFull" x2="0" y2="1"><stop stopColor="#f18b92"/><stop offset=".16" stopColor="#8b3858"/><stop offset=".5" stopColor="#562448"/><stop offset=".84" stopColor="#8b3858"/><stop offset="1" stopColor="#f18b92"/></linearGradient>
        <linearGradient id="lumenFull" x2="0" y2="1"><stop stopColor="#542039"/><stop offset=".5" stopColor="#30182f"/><stop offset="1" stopColor="#642943"/></linearGradient>
        <radialGradient id="tissueCell"><stop stopColor="#f3a7c1"/><stop offset=".72" stopColor="#bd5e91"/><stop offset="1" stopColor="#74346e"/></radialGradient>
        <filter id="blurFull"><feGaussianBlur stdDeviation="48"/></filter>
        <filter id="shadowFull"><feGaussianBlur stdDeviation="18"/></filter>
        <clipPath id="fullHandClip"><path d="M337 350 C325 327 323 280 319 237 C317 207 324 186 339 184 C356 182 365 199 368 222 L378 292 L383 176 C384 148 396 131 414 132 C434 133 439 151 438 179 L434 291 L450 164 C454 137 469 124 487 128 C506 132 509 151 504 180 L482 300 L512 205 C521 180 537 171 554 180 C571 190 568 211 559 236 L527 344 C518 374 499 398 469 414 L434 433 C405 448 378 442 356 425 L311 394 C291 381 284 363 296 350 C308 337 328 346 349 370 Z"/></clipPath>
        <clipPath id="zoomVessel"><circle cx="530" cy="1040" r={interpolate(t,[13.75,15.1],[6,1750],clamp)}/></clipPath>
      </defs>
      <rect width="1080" height="1920" fill="url(#fullBg)"/>
      <circle cx="150" cy="420" r="520" fill="url(#violetGlow)"/>
      <circle cx="1000" cy="1470" r="560" fill="url(#cyanGlow)"/>
      <g fill="#f3d8ff" opacity=".18">
        {Array.from({length:26},(_,i)=>{const x=(i*173+91)%1080;const y=(i*281+117)%1800;return <circle key={i} cx={x+Math.sin(frame*.018+i)*13} cy={y+Math.cos(frame*.021+i)*11} r={2+(i%4)} opacity={.35+(i%3)*.15}/>})}
      </g>
      <g fill="none" stroke="#c99ae8" opacity=".25"><path d="M-50 510 C190 430 330 560 525 485 S870 380 1130 475" strokeWidth="2"/><path d="M-50 1510 C170 1430 350 1550 540 1490 S890 1390 1130 1480" strokeWidth="2"/></g>

      {/* Hyperframe 1 and return: ICU patient, monitor and infusion system */}
      <g opacity={patientOpacity}>
        <path d="M90 1040 H1018 V1560 H90Z" fill="#dfe7f4" opacity=".13"/>
        <rect x="118" y="1045" width="860" height="350" rx="34" fill="#d9e4f1" stroke="#f7f4ff" strokeWidth="8" opacity=".92"/>
        <path d="M90 1390 H1010 V1480 H90Z" fill="#aebbd1" opacity=".78"/>
        <path d="M115 1470 V1595 M965 1470 V1595" stroke="#c8d4e5" strokeWidth="16"/>
        <ellipse cx="376" cy="1150" rx="164" ry="114" fill="#d4a087"/>
        <path d="M239 1140 Q244 1028 372 1035 Q485 1045 505 1164 L464 1215 H272Z" fill="#3a243c"/>
        <path d="M280 1142 Q289 1069 374 1070 Q449 1078 456 1154 Q447 1216 369 1227 Q290 1215 280 1142Z" fill="url(#skinFull)"/>
        <path d="M308 1115 Q376 1050 439 1112 L455 1150 Q400 1121 366 1131 Q330 1140 285 1160Z" fill="#2a2035"/>
        <path d="M318 1153 Q336 1144 348 1154 M397 1151 Q412 1144 427 1153" stroke="#5c3944" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M353 1194 Q375 1203 399 1190" stroke="#945b5b" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M296 1178 C241 1194 200 1255 206 1343 L259 1400 H750 L702 1250 Q625 1170 508 1177Z" fill="#d8e0eb" stroke="#f6efff" strokeWidth="6"/>
        <path d="M310 1193 Q402 1226 506 1192 L565 1370 H272Z" fill="#8fc6d0" opacity=".62"/>
        <path d="M468 1247 C528 1274 573 1328 626 1345 L733 1355 C768 1359 778 1387 753 1407 C730 1428 685 1410 625 1401 L525 1384 C477 1375 439 1300 468 1247Z" fill="url(#skinFull)" stroke="#efc4aa" strokeWidth="5"/>
        {/* distal foot visible under sheet */}
        <path d="M695 1415 C748 1389 828 1394 892 1412 Q934 1424 931 1460 Q925 1489 877 1486 L743 1479 Q692 1475 695 1415Z" fill="url(#skinFull)" stroke="#eab69b" strokeWidth="5"/>
        <path d="M848 1417 Q891 1414 922 1432 L923 1466 Q890 1479 855 1465Z" fill="#58639e" opacity={interpolate(t,[1.1,3.4,7.4],[.25,.72,.6],clamp)}/>
        <g opacity=".68" fill="none" stroke="#8190bd" strokeWidth="4"><path d="M865 1430 Q885 1443 907 1431 M862 1450 Q885 1464 914 1450"/></g>
        {/* cardiac monitor */}
        <rect x="716" y="380" width="286" height="294" rx="26" fill="#211a39" stroke="#bd92df" strokeWidth="6"/>
        <rect x="740" y="405" width="238" height="188" rx="12" fill="#102d38"/>
        <path d="M755 500 H786 L803 458 L825 551 L849 478 L873 501 H913 L936 465 L960 500" fill="none" stroke="#61e6c1" strokeWidth="7"/>
        <text x="764" y="632" fill="#e2dbef" fontSize="25">PAM</text><text x="842" y="632" fill="#8df0d2" fontSize="34" fontWeight="700">65</text>
        {/* infusion bag and pump */}
        <circle cx="856" cy="838" r="204" fill="url(#cyanGlow)" opacity={drugOpacity*.92}/>
        <path d="M760 737 H869 V909 Q869 930 849 930 H780 Q760 930 760 909Z" fill="#f5f2ea" stroke="#d6c9e5" strokeWidth="5"/>
        <path d="M773 790 H856 V907 H773Z" fill="#d4edeb" opacity=".8"/>
        <path d="M815 930 V994" stroke="#d8d8ea" strokeWidth="7"/>
        <text x="775" y="770" fill="#34263e" fontSize="15" fontWeight="700">NOREPINEFRINA</text>
        <text x="783" y="825" fill="#52606b" fontSize="15">PERFUSIÓN IV</text>
        <rect x="874" y="812" width="122" height="224" rx="22" fill="#1d1c38" stroke="#bd92df" strokeWidth="5"/>
        <rect x="893" y="835" width="84" height="59" rx="8" fill="#0e3441"/>
        <path d="M903 867 H917 L925 850 L935 882 L946 863 H966" fill="none" stroke="#68e6c3" strokeWidth="4"/>
        <circle cx="912" cy="930" r="8" fill="#e2c4ff"/><circle cx="944" cy="930" r="8" fill="#f2d464"/>
        <path d="M936 1037 V1460" stroke="#d6d7e9" strokeWidth="8"/><path d="M893 1460 H981" stroke="#d6d7e9" strokeWidth="8"/>
      </g>

      {/* Greeting: nurse enters the ICU frame */}
      <g opacity={greetingOpacity} transform={`translate(${interpolate(t,[5.8,6.5],[150,0],clamp)} 0)`}>
        <ellipse cx="870" cy="1440" rx="126" ry="34" fill="#16112d" opacity=".45" filter="url(#shadowFull)"/>
        <path d="M754 1430 Q750 1280 792 1242 Q839 1208 899 1248 Q943 1280 950 1430Z" fill="#55b6bf" stroke="#b9f0ed" strokeWidth="6"/>
        <ellipse cx="850" cy="1168" rx="84" ry="100" fill="url(#skinFull)" stroke="#f0c8aa" strokeWidth="5"/>
        <path d="M770 1176 Q760 1062 854 1060 Q949 1062 936 1185 L911 1155 Q874 1129 840 1145 Q804 1161 770 1176Z" fill="#31213c"/>
        <path d="M804 1160 Q818 1150 829 1161 M868 1161 Q880 1152 894 1160" stroke="#563a4a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M827 1202 Q852 1210 876 1200" stroke="#985d5a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M904 1324 Q960 1278 991 1233" fill="none" stroke="#55b6bf" strokeWidth="34" strokeLinecap="round"/>
        <path d="M983 1242 L1008 1148" stroke="url(#skinFull)" strokeWidth="25" strokeLinecap="round"/>
        <path d="M742 1325 Q703 1278 684 1240" fill="none" stroke="#55b6bf" strokeWidth="34" strokeLinecap="round"/>
        <path d="M683 1248 L680 1165" stroke="url(#skinFull)" strokeWidth="24" strokeLinecap="round"/>
        <path d="M814 1063 Q850 1022 898 1063" fill="none" stroke="#e8f5f0" strokeWidth="12"/>
      </g>

      {/* Enlarged hand and distal perfusion cue */}
      <g opacity={handOpacity} transform={`translate(${interpolate(t,[1.8,4.8],[210,-400],clamp)} ${interpolate(t,[1.8,4.8],[900,480],clamp)}) scale(${interpolate(t,[1.8,4.8],[.9,2.2],clamp)})`}>
        <path d="M337 350 C325 327 323 280 319 237 C317 207 324 186 339 184 C356 182 365 199 368 222 L378 292 L383 176 C384 148 396 131 414 132 C434 133 439 151 438 179 L434 291 L450 164 C454 137 469 124 487 128 C506 132 509 151 504 180 L482 300 L512 205 C521 180 537 171 554 180 C571 190 568 211 559 236 L527 344 C518 374 499 398 469 414 L434 433 C405 448 378 442 356 425 L311 394 C291 381 284 363 296 350 C308 337 328 346 349 370 Z" fill="url(#skinFull)" stroke="#ffe0c6" strokeWidth="8"/>
        <g clipPath="url(#fullHandClip)">
          <path d="M290 120 H590 V470 H285Z" fill="url(#distalBlue)" opacity={interpolate(t,[1.2,3.6,8],[.58,.92,.72],clamp)}/>
          <path d="M325 232 C356 210 372 240 392 278 S423 315 447 283 S497 242 524 271 M322 283 C353 266 370 303 397 332 S442 352 466 321 S516 298 547 323 M322 337 C350 316 380 355 410 378 S466 386 488 357 S522 346 540 366" fill="none" stroke="#7275b1" strokeWidth="4" opacity=".72"/>
          <path d="M366 206 Q375 286 410 358 M420 146 Q427 263 440 355 M489 141 Q474 255 467 350 M548 194 Q509 267 491 358" fill="none" stroke="#ffe3c8" strokeWidth="3" opacity=".5"/>
        </g>
        <path d="M350 217 Q342 209 337 216 M397 160 Q407 153 418 160 M466 156 Q478 150 490 158 M535 199 Q545 198 551 207" fill="none" stroke="#f8dfcc" strokeWidth="6" strokeLinecap="round"/>
        <path d="M337 210 Q342 201 350 207 L352 221 Q344 226 338 219Z M399 154 Q408 147 417 154 L417 168 Q407 171 399 166Z M470 150 Q480 145 489 154 L486 168 Q475 170 469 162Z M535 193 Q544 188 551 197 L545 211 Q536 210 532 202Z" fill="#f2d2be" stroke="#b78373" strokeWidth="2"/>
        <path d="M362 402 Q404 425 449 411" fill="none" stroke="#8c5757" strokeWidth="4" opacity=".62"/>
      </g>

      {/* Hyperframe: zoom into arterioles; the lumen narrows but cells keep moving */}
      <g opacity={vesselOpacity} clipPath="url(#zoomVessel)">
        <rect width="1080" height="1920" fill="#311645"/>
        <circle cx="540" cy="960" r="820" fill="url(#violetGlow)" opacity=".58"/>
        <path d={`M0 ${top-190} C250 ${top-225} 350 ${top-75} 540 ${top-64} C730 ${top-75} 830 ${top-225} 1080 ${top-190} L1080 ${bottom+190} C830 ${bottom+225} 730 ${bottom+75} 540 ${bottom+64} C350 ${bottom+75} 250 ${bottom+225} 0 ${bottom+190}Z`} fill="url(#wallFull)" stroke="#ffc2c1" strokeWidth="15"/>
        <path d={`M0 ${top+18} C250 ${top-28} 350 ${top+47} 540 ${top+55} C730 ${top+47} 830 ${top-28} 1080 ${top+18} L1080 ${bottom-18} C830 ${bottom+28} 730 ${bottom-47} 540 ${bottom-55} C350 ${bottom-47} 250 ${bottom+28} 0 ${bottom-18}Z`} fill="url(#lumenFull)" stroke="#f17683" strokeWidth="7"/>
        <path d={`M0 ${top-155} C250 ${top-180} 360 ${top-65} 540 ${top-48} C730 ${top-65} 840 ${top-180} 1080 ${top-155}`} fill="none" stroke="#ffd1c5" strokeWidth="25" opacity=".55"/>
        {Array.from({length:15},(_,i)=><RedCell key={i} x={i*91-100} y={960+Math.sin(i*1.6)*Math.min(22,lumen*.14)} frame={frame} speed={flowSpeed} delay={i*71} scale={.83}/>) }
        <path d={`M270 ${top-80} Q540 ${top-185} 810 ${top-80}`} fill="none" stroke="#ffe073" strokeWidth="8" markerEnd="url(#inArrow)" opacity={constriction}/>
        <path d={`M270 ${bottom+80} Q540 ${bottom+185} 810 ${bottom+80}`} fill="none" stroke="#ffe073" strokeWidth="8" markerEnd="url(#inArrow)" opacity={constriction}/>
        <text x="106" y="1430" fill="#f1d7fc" fontSize="35" letterSpacing="5" opacity=".86">MICROCIRCULACIÓN DISTAL</text>
      </g>

      {/* Hyperframe: perfusion, oxygen exchange and viable tissue */}
      <g opacity={tissueOpacity}>
        <rect width="1080" height="1920" fill="#392050" opacity=".96"/>
        <circle cx="240" cy="790" r="430" fill="url(#violetGlow)" opacity=".54"/>
        <path d="M0 840 C175 765 286 890 425 835 S700 770 1080 842 L1080 1080 C760 1146 634 1045 465 1090 S170 1135 0 1064Z" fill="url(#wallFull)" stroke="#f5a7b2" strokeWidth="14"/>
        <path d="M0 896 C185 833 295 942 435 892 S732 833 1080 899 L1080 1021 C767 1085 635 1006 469 1045 S165 1087 0 1028Z" fill="url(#lumenFull)" stroke="#ee7885" strokeWidth="7"/>
        {Array.from({length:8},(_,i)=><RedCell key={i} x={i*145-110} y={958+Math.sin(i*2)*18} frame={frame} speed={1.55} delay={i*83} scale={.72}/>) }
        {/* oxygen molecules leave the capillary gradually */}
        {Array.from({length:8},(_,i)=>{
          const p=(frame*1.35+i*51)%570;
          return <g key={i} transform={`translate(${120+(i%4)*215} ${1050+p*.62})`} opacity={interpolate(t,[24.5,27,31],[.9,.45,.35],clamp)}>
            <circle r="13" fill="#58dce5" stroke="#d1ffff" strokeWidth="3"/><text x="-8" y="6" fill="#1b3152" fontSize="14" fontWeight="700">O₂</text>
          </g>;
        })}
        {Array.from({length:10},(_,i)=>{
          const x=85+(i%5)*215, y=1430+Math.floor(i/5)*190;
          return <g key={i} transform={`translate(${x} ${y}) scale(${1+Math.sin(frame*.04+i)*.035})`}>
            <circle r="72" fill="url(#tissueCell)" stroke="#f1a8cb" strokeWidth="6" opacity={.78}/>
            <circle r="27" fill="#714078" stroke="#dc9ac6" strokeWidth="4" opacity={.88}/>
            <path d="M-48 -23 Q-18 -56 5 -53 M28 37 Q50 16 53 -11" fill="none" stroke="#ffd1e7" strokeWidth="4" opacity=".55"/>
          </g>;
        })}
        <path d="M80 1205 C180 1160 256 1218 314 1184 M520 1206 C602 1162 690 1223 747 1180 M820 1200 C900 1160 980 1212 1050 1170" fill="none" stroke="#e377b2" strokeWidth="14" opacity=".55"/>
        <text x="76" y="1780" fill="#ead8f4" fontSize="29" letterSpacing="4">OXÍGENO QUE LLEGA AL TEJIDO</text>
      </g>

      {/* Return from tissue to the visible distal sign */}
      <g opacity={symptomHandOpacity} transform={`translate(-390 560) scale(2.08)`}>
        <path d="M337 350 C325 327 323 280 319 237 C317 207 324 186 339 184 C356 182 365 199 368 222 L378 292 L383 176 C384 148 396 131 414 132 C434 133 439 151 438 179 L434 291 L450 164 C454 137 469 124 487 128 C506 132 509 151 504 180 L482 300 L512 205 C521 180 537 171 554 180 C571 190 568 211 559 236 L527 344 C518 374 499 398 469 414 L434 433 C405 448 378 442 356 425 L311 394 C291 381 284 363 296 350 C308 337 328 346 349 370 Z" fill="url(#skinFull)" stroke="#ffe0c6" strokeWidth="8"/>
        <g clipPath="url(#fullHandClip)"><path d="M290 120 H590 V470 H285Z" fill="url(#distalBlue)" opacity=".9"/><path d="M325 232 C356 210 372 240 392 278 S423 315 447 283 S497 242 524 271 M322 283 C353 266 370 303 397 332 S442 352 466 321 S516 298 547 323 M322 337 C350 316 380 355 410 378 S466 386 488 357 S522 346 540 366" fill="none" stroke="#7778ba" strokeWidth="4" opacity=".76"/></g>
        <path d="M337 210 Q342 201 350 207 L352 221 Q344 226 338 219Z M399 154 Q408 147 417 154 L417 168 Q407 171 399 166Z M470 150 Q480 145 489 154 L486 168 Q475 170 469 162Z M535 193 Q544 188 551 197 L545 211 Q536 210 532 202Z" fill="#f2d2be" stroke="#b78373" strokeWidth="2"/>
      </g>

      {/* Hyperframe: systemic shock is a competing cause, not only the drug */}
      <g opacity={reveal(t,31.55,38.15,.55)}>
        <rect width="1080" height="1920" fill="#292044" opacity=".55"/>
        <ellipse cx="504" cy="1170" rx="275" ry="426" fill="#edb99d" opacity=".18" stroke="#ffd7bf" strokeWidth="6"/>
        <path d="M440 790 C390 910 420 1070 510 1148 C592 1230 574 1410 668 1510" fill="none" stroke="#ed6e82" strokeWidth="30" opacity=".85"/>
        <path d="M508 1100 C400 1190 330 1310 300 1470 M530 1110 C640 1160 742 1280 785 1455" fill="none" stroke="#4389b0" strokeWidth="21" opacity=".9"/>
        <path d="M471 954 C520 910 580 946 578 1006 C577 1067 513 1098 478 1050 C452 1018 447 978 471 954Z" fill="#a82b4b" stroke="#ffb6ae" strokeWidth="6"/>
        <path d="M414 1220 Q480 1183 547 1220 L555 1306 Q480 1350 414 1306Z" fill="#6d3779" stroke="#d18bdb" strokeWidth="6"/>
        <path d="M764 560 L916 560 L916 690 L764 690Z" fill="#281b43" stroke="#cf9bdf" strokeWidth="5"/>
        <path d="M786 622 H814 L831 580 L849 657 L872 605 H896" fill="none" stroke="#f0738b" strokeWidth="6"/>
        <text x="775" y="724" fill="#f3dce8" fontSize="23">SHOCK · ALTERACIÓN GLOBAL</text>
      </g>

      {/* Hyperframe: active nursing assessment */}
      <g opacity={nursingOpacity}>
        <rect x="35" y="480" width="1010" height="1270" rx="50" fill="#342050" opacity=".4" stroke="#b984d6" strokeWidth="4"/>
        <path d="M95 1110 H985 V1510 H95Z" fill="#dfe7ef" opacity=".5"/>
        <path d="M125 1090 Q225 1010 381 1030 L720 1030 Q830 1040 938 1112 L960 1375 H128Z" fill="#dbe5ed" opacity=".88"/>
        <path d="M360 1090 C419 1070 468 1093 496 1145 L607 1310 C632 1350 614 1381 581 1392 C550 1403 524 1376 500 1342 L390 1203 C358 1162 337 1114 360 1090Z" fill="url(#skinFull)" stroke="#f1c4a8" strokeWidth="6"/>
        {/* assessment hand and capillary refill press */}
        <g transform={`translate(${interpolate(t,[38.2,40.3,43.8],[160,30,-35],clamp)} ${interpolate(t,[38.2,40.3,43.8],[1050,960,960],clamp)}) scale(${interpolate(t,[38.2,40.3],[.75,1.05],clamp)})`}>
          <path d="M337 350 C325 327 323 280 319 237 C317 207 324 186 339 184 C356 182 365 199 368 222 L378 292 L383 176 C384 148 396 131 414 132 C434 133 439 151 438 179 L434 291 L450 164 C454 137 469 124 487 128 C506 132 509 151 504 180 L482 300 L512 205 C521 180 537 171 554 180 C571 190 568 211 559 236 L527 344 C518 374 499 398 469 414 L434 433 C405 448 378 442 356 425 L311 394 C291 381 284 363 296 350 C308 337 328 346 349 370 Z" fill="url(#skinFull)" stroke="#ffe0c6" strokeWidth="8"/>
          <g clipPath="url(#fullHandClip)"><path d="M290 120 H590 V470 H285Z" fill="url(#distalBlue)" opacity=".42"/></g>
          <path d="M337 210 Q342 201 350 207 L352 221 Q344 226 338 219Z M399 154 Q408 147 417 154 L417 168 Q407 171 399 166Z M470 150 Q480 145 489 154 L486 168 Q475 170 469 162Z M535 193 Q544 188 551 197 L545 211 Q536 210 532 202Z" fill={t>41.5&&t<43.5?'#b54e72':'#f2d2be'} stroke="#b78373" strokeWidth="2"/>
        </g>
        {/* gloved finger presses a nail, then lifts */}
        <path d={`M${interpolate(t,[41.8,42.2,42.55,42.9],[620,605,605,620],clamp)} ${interpolate(t,[41.8,42.2,42.55,42.9],[1190,1120,1120,1190],clamp)} Q660 1050 701 1080 L718 1130 Q670 1160 622 1145Z`} fill="#eef7ff" stroke="#75bfd3" strokeWidth="6"/>
        <path d="M784 988 Q820 950 863 976 L885 1010 Q839 1036 795 1022Z" fill="#d7e1eb" stroke="#a988cd" strokeWidth="5" opacity={reveal(t,43.35,44.7,.2)}/>
        {/* four nursing cues appear one at a time, tied to the voice */}
        <g opacity={reveal(t,40.35,41.45,.2)}><rect x="94" y="610" width="360" height="84" rx="42" fill="#382359" stroke="#e8b8e4" strokeWidth="4"/><circle cx="143" cy="652" r="17" fill="#d98099"/><text x="181" y="665" fill="#fff" fontSize="29" fontWeight="700">COLORACIÓN</text></g>
        <g opacity={reveal(t,41.4,42.15,.2)}><rect x="608" y="610" width="360" height="84" rx="42" fill="#382359" stroke="#8ee1e5" strokeWidth="4"/><path d="M652 632 V672 M642 642 H662" stroke="#8ee1e5" strokeWidth="7" strokeLinecap="round"/><text x="684" y="665" fill="#fff" fontSize="29" fontWeight="700">TEMPERATURA</text></g>
        <g opacity={reveal(t,42.35,43.3,.2)}><rect x="94" y="720" width="410" height="84" rx="42" fill="#382359" stroke="#ffdd72" strokeWidth="4"/><circle cx="144" cy="762" r="20" fill="none" stroke="#ffdd72" strokeWidth="5"/><path d="M144 762 L154 747" stroke="#ffdd72" strokeWidth="5"/><text x="183" y="775" fill="#fff" fontSize="28" fontWeight="700">RELLENO CAPILAR</text></g>
        <g opacity={reveal(t,43.25,44.55,.2)}><rect x="570" y="720" width="398" height="84" rx="42" fill="#382359" stroke="#ff9e88" strokeWidth="4"/><path d="M615 770 Q633 737 651 770 T687 770" fill="none" stroke="#ff9e88" strokeWidth="6"/><text x="711" y="775" fill="#fff" fontSize="28" fontWeight="700">PULSOS PERIFÉRICOS</text></g>
        <g opacity={reveal(t,45,47.9,.3)}><path d="M794 1210 L902 1318 M902 1210 L794 1318" stroke="#ff657e" strokeWidth="18" strokeLinecap="round"/><circle cx="848" cy="1264" r="89" fill="none" stroke="#ff657e" strokeWidth="8" opacity=".8"/></g>
      </g>

      {/* End-card uses the same visual language, with animated pulse */}
      <g opacity={outroOpacity}>
        <rect width="1080" height="1920" fill="#261443" opacity=".96"/>
        <circle cx="540" cy="900" r={270+Math.sin(frame*.1)*15} fill="none" stroke="#be79e8" strokeWidth="7" opacity=".55"/>
        <circle cx="540" cy="900" r="190" fill="#3f2168" stroke="#78e0e7" strokeWidth="8"/>
        <path d="M360 908 H435 L468 836 L510 984 L554 873 L588 908 H719" fill="none" stroke="#7de7d5" strokeWidth="14" strokeLinejoin="round"/>
        <text x="540" y="1190" fill="#fff" fontSize="56" textAnchor="middle" fontWeight="800" letterSpacing="4">MEDISHORT360</text>
      </g>

      <defs><marker id="inArrow" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto"><path d="M0 0L11 5L0 10Z" fill="#ffe073"/></marker></defs>
    </svg>
    <div style={{position:'absolute',top:52,left:58,padding:'10px 18px',borderRadius:24,background:'rgba(27,14,48,.66)',border:'1px solid rgba(197,157,235,.42)',color:'#eadff4',fontWeight:700,fontSize:21,letterSpacing:2}}>MEDISHORT360 · UCI</div>
    <KineticCaption t={t} frame={frame} fps={fps}/>
    <div style={{position:'absolute',right:44,bottom:50,color:'#fff',fontSize:22,fontWeight:700,letterSpacing:4,opacity:.68}}>MEDISHORT360</div>
    <Audio src={staticFile('audio/vasopresores-original.mp3')} volume={0.96}/>
  </AbsoluteFill>;
};
