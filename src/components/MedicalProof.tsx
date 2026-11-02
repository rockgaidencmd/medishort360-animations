import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const RBC = ({x, y, delay, frame}: {x:number; y:number; delay:number; frame:number}) => {
  const move = ((frame * 2.2 + delay) % 1160) - 80;
  return <g transform={`translate(${x + move},${y})`}>
    <ellipse rx="25" ry="13" fill="#9e2839" stroke="#ff9c91" strokeWidth="2"/>
    <ellipse rx="10" ry="5" fill="#e66b66" opacity=".9"/>
    <path d="M-20 -3 Q0 -12 20 -3" fill="none" stroke="#ffd4cb" strokeWidth="2" opacity=".7"/>
  </g>;
};

export const MedicalProof: React.FC<{audio?: boolean}> = ({audio = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const sceneA = interpolate(t,[0,1.2,2.6],[1,1,.05],clamp);
  const handOpacity = interpolate(t,[1.0,1.8,4.1,4.9],[0,1,1,0],clamp);
  const vesselOpacity = interpolate(t,[3.6,4.8,9],[0,1,1],clamp);
  const handScale = interpolate(t,[1.5,4.7],[.78,2.35],clamp);
  const handX = interpolate(t,[1.5,4.7],[111,-572],clamp);
  const handY = interpolate(t,[1.5,4.7],[1127,578],clamp);
  const constrict = interpolate(t,[4.8,7.0,8.6],[0,1,.82],clamp);
  const vesselHeight = 320 - constrict * 145;
  const top = 960 - vesselHeight/2;
  const bottom = 960 + vesselHeight/2;
  const title = t < 1.2 ? 'NOREPINEFRINA' : t < 4.8 ? 'VASOCONSTRICCIÓN' : 'ARTERIOLAS MÁS ESTRECHAS';

  return <AbsoluteFill style={{background:'#0d2635',fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
      <defs>
        <linearGradient id="bg" x2=".8" y2="1"><stop stopColor="#183e50"/><stop offset=".52" stopColor="#101f34"/><stop offset="1" stopColor="#251e3b"/></linearGradient>
        <radialGradient id="glow"><stop stopColor="#70d4d7" stopOpacity=".28"/><stop offset="1" stopColor="#70d4d7" stopOpacity="0"/></radialGradient>
        <linearGradient id="skin" x2=".2" y2="1"><stop stopColor="#e4ad89"/><stop offset=".55" stopColor="#c98468"/><stop offset="1" stopColor="#9e605d"/></linearGradient>
        <linearGradient id="cyanosis" x2="0" y2="1"><stop stopColor="#4d5c9c" stopOpacity=".78"/><stop offset=".35" stopColor="#53639c" stopOpacity=".64"/><stop offset=".72" stopColor="#6572a1" stopOpacity=".30"/><stop offset="1" stopColor="#6572a1" stopOpacity="0"/></linearGradient>
        <linearGradient id="vessel" x2="0" y2="1"><stop stopColor="#9e3c48"/><stop offset=".19" stopColor="#501d35"/><stop offset=".5" stopColor="#35172f"/><stop offset=".82" stopColor="#591d36"/><stop offset="1" stopColor="#a4474a"/></linearGradient>
        <linearGradient id="light" x2="0" y2="1"><stop stopColor="#ffb4a2" stopOpacity=".55"/><stop offset="1" stopColor="#ffb4a2" stopOpacity="0"/></linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="45"/></filter>
        <filter id="shadow"><feGaussianBlur stdDeviation="25"/></filter>
        <clipPath id="handclip"><path d="M337 350 C325 327 323 280 319 237 C317 207 324 186 339 184 C356 182 365 199 368 222 L378 292 L383 176 C384 148 396 131 414 132 C434 133 439 151 438 179 L434 291 L450 164 C454 137 469 124 487 128 C506 132 509 151 504 180 L482 300 L512 205 C521 180 537 171 554 180 C571 190 568 211 559 236 L527 344 C518 374 499 398 469 414 L434 433 C405 448 378 442 356 425 L311 394 C291 381 284 363 296 350 C308 337 328 346 349 370 Z"/></clipPath>
        <clipPath id="zoomTunnel"><circle cx="450" cy="1400" r={interpolate(t,[3.45,5.5],[4,1900],clamp)}/></clipPath>
      </defs>
      <rect width="1080" height="1920" fill="url(#bg)"/>
      <circle cx="200" cy="330" r="420" fill="url(#glow)"/>
      <circle cx="1000" cy="1540" r="500" fill="#70447a" opacity=".16" filter="url(#soft)"/>
      <g opacity=".28" fill="none" stroke="#a9d8dc">
        <path d="M-40 430 C220 340 340 520 520 435 S850 280 1120 390" strokeWidth="2"/>
        <path d="M-60 1460 C200 1360 380 1550 570 1460 S850 1320 1150 1440" strokeWidth="2"/>
      </g>
      {/* ICU depth layers */}
      <g opacity={sceneA}>
        <rect x="690" y="260" width="290" height="360" rx="28" fill="#101c2a" stroke="#5d8991" strokeWidth="5"/>
        <rect x="720" y="292" width="230" height="210" rx="14" fill="#09232e"/>
        <path d="M735 399 L765 399 L782 355 L802 447 L823 380 L845 400 L872 400 L891 365 L913 400 L943 400" fill="none" stroke="#60e4bd" strokeWidth="6"/>
        <text x="738" y="550" fill="#a3d5d6" fontSize="25" letterSpacing="2">MONITORIZACIÓN</text>
        <path d="M100 1220 H998 V1500 H100 Z" fill="#dce8ee" opacity=".17"/>
        <path d="M88 1210 Q170 1160 308 1184 L720 1190 Q830 1192 930 1245 L980 1370 H140 Z" fill="#d8e6e9" opacity=".82"/>
        <path d="M145 1190 Q220 1090 388 1100 Q560 1104 675 1180 L660 1290 H170 Z" fill="#d0a38d"/>
        <path d="M342 1192 C370 1180 400 1187 430 1200 L543 1296 C568 1318 567 1354 544 1370 C523 1385 491 1368 468 1350 L355 1284 C327 1266 319 1214 342 1192Z" fill="url(#skin)" stroke="#f2c1a0" strokeWidth="5"/>
        <ellipse cx="542" cy="1360" rx="132" ry="36" fill="#191d32" opacity=".45" filter="url(#shadow)"/>
        <g transform={`translate(0 ${Math.sin(frame*.09)*5})`}>
          <path d="M260 1360 C330 1310 410 1308 504 1344 C553 1363 584 1406 578 1450 C573 1490 532 1516 479 1508 L322 1480 C272 1471 237 1410 260 1360Z" fill="#c9886d" stroke="#efb89a" strokeWidth="5"/>
        </g>
        <path d="M780 688 H875 V850 H780 Q766 850 766 836 V702 Q766 688 780 688Z" fill="#f5f2e8" stroke="#8da8b3" strokeWidth="4"/>
        <text x="780" y="733" fill="#203746" fontSize="16" fontWeight="700">NOREPINEFRINA</text>
        <text x="795" y="762" fill="#415966" fontSize="15">IV · PERFUSIÓN</text>
        <path d="M820 850 V872" stroke="#c8dae0" strokeWidth="6"/>
        <rect x="875" y="840" width="88" height="250" rx="18" fill="#0d1726" stroke="#8da8b3" strokeWidth="4"/>
        <rect x="887" y="862" width="64" height="66" rx="7" fill="#173d45"/>
        <path d="M898 899 h14 l8 -18 l9 36 l7 -18 h10" fill="none" stroke="#7be4be" strokeWidth="3"/>
        <path d="M919 1090 v280 M875 1370 h88" stroke="#a5bbc5" strokeWidth="8"/>
        <path d="M919 1370 v145 M889 1515 h60" stroke="#a5bbc5" strokeWidth="8"/>
      </g>
      {/* Anatomical hand becomes the camera target */}
      <g opacity={handOpacity} transform={`translate(${handX} ${handY}) scale(${handScale})`}>
        <path d="M337 350 C325 327 323 280 319 237 C317 207 324 186 339 184 C356 182 365 199 368 222 L378 292 L383 176 C384 148 396 131 414 132 C434 133 439 151 438 179 L434 291 L450 164 C454 137 469 124 487 128 C506 132 509 151 504 180 L482 300 L512 205 C521 180 537 171 554 180 C571 190 568 211 559 236 L527 344 C518 374 499 398 469 414 L434 433 C405 448 378 442 356 425 L311 394 C291 381 284 363 296 350 C308 337 328 346 349 370 Z" fill="url(#skin)" stroke="#f0b69a" strokeWidth="8"/>
        <g clipPath="url(#handclip)">
          <path d="M300 130 H585 V461 H296 Z" fill="url(#cyanosis)" opacity={interpolate(t,[1.8,3.3,5.8],[.8,1,1],clamp)}/>
          <path d="M330 268 C390 242 444 280 494 258 S553 275 571 304 M337 311 C393 291 420 327 469 310 S541 322 558 350 M344 355 C392 337 427 365 465 352 S524 368 536 390" fill="none" stroke="#7d719d" strokeWidth="5" opacity=".55"/>
          <path d="M365 197 Q376 294 410 356 M420 144 Q427 266 440 355 M489 140 Q474 257 467 353 M548 190 Q509 273 491 365" fill="none" stroke="#ffdbc2" strokeWidth="3" opacity=".43"/>
        </g>
        <path d="M350 217 Q342 209 337 216 M397 160 Q407 153 418 160 M466 156 Q478 150 490 158 M535 199 Q545 198 551 207" fill="none" stroke="#f7d8c2" strokeWidth="6" strokeLinecap="round"/>
        <path d="M362 402 Q404 425 449 411" fill="none" stroke="#965f5b" strokeWidth="4" opacity=".55"/>
        <path d="M337 210 Q342 201 350 207 L352 221 Q344 226 338 219Z M399 154 Q408 147 417 154 L417 168 Q407 171 399 166Z M470 150 Q480 145 489 154 L486 168 Q475 170 469 162Z M535 193 Q544 188 551 197 L545 211 Q536 210 532 202Z" fill="#e9c7b5" stroke="#b78373" strokeWidth="2"/>
        <path d="M323 275 C345 260 362 280 371 298 M448 324 C461 306 478 310 492 320" fill="none" stroke="#94615f" strokeWidth="4" opacity=".5"/>
      </g>
      {/* continuous anatomical tunnel, vessel opens as the camera arrives */}
      <g opacity={vesselOpacity} clipPath="url(#zoomTunnel)" transform={`translate(0 ${Math.sin(frame*.04)*8})`}>
        <rect width="1080" height="1920" fill="#101b31" opacity=".96"/>
        <ellipse cx="540" cy="960" rx="590" ry="760" fill="#5d263b" opacity=".34"/>
        <path d={`M0 ${top-180} C260 ${top-230} 370 ${top-92} 540 ${top-70} C710 ${top-92} 820 ${top-230} 1080 ${top-180} L1080 ${bottom+180} C820 ${bottom+230} 710 ${bottom+92} 540 ${bottom+70} C370 ${bottom+92} 260 ${bottom+230} 0 ${bottom+180}Z`} fill="url(#vessel)" stroke="#e07a73" strokeWidth="18"/>
        <path d={`M0 ${top+26} C260 ${top-25} 370 ${top+55} 540 ${top+70} C710 ${top+55} 820 ${top-25} 1080 ${top+26} L1080 ${bottom-26} C820 ${bottom+25} 710 ${bottom-55} 540 ${bottom-70} C370 ${bottom-55} 260 ${bottom+25} 0 ${bottom-26}Z`} fill="#36182f" stroke="#be5b61" strokeWidth="7"/>
        <path d={`M0 ${top-150} C240 ${top-180} 380 ${top-68} 540 ${top-52} C710 ${top-68} 840 ${top-180} 1080 ${top-150}`} fill="none" stroke="url(#light)" strokeWidth="34"/>
        <g opacity={interpolate(t,[6,6.5],[0,1],clamp)}>
          {Array.from({length:13},(_,i)=><RBC key={i} x={i*95-100} y={960 + Math.sin(i*1.7)*Math.max(8,vesselHeight*.15)} delay={i*91} frame={frame}/>) }
        </g>
        <path d="M220 615 Q540 540 860 615" fill="none" stroke="#f3c46e" strokeWidth="6" strokeDasharray="14 18" opacity={constrict*.8}/>
        <path d="M220 1305 Q540 1380 860 1305" fill="none" stroke="#f3c46e" strokeWidth="6" strokeDasharray="14 18" opacity={constrict*.8}/>
        <path d={`M540 ${top-120} V${top-35}`} stroke="#ffd782" strokeWidth="8" markerEnd="url(#arrow)" opacity={constrict}/>
        <path d={`M540 ${bottom+120} V${bottom+35}`} stroke="#ffd782" strokeWidth="8" markerEnd="url(#arrow)" opacity={constrict}/>
        <text x="72" y="1510" fill="#b8dfe2" fontSize="34" letterSpacing="5" opacity=".8">MICROCIRCULACIÓN DISTAL</text>
      </g>
      <g opacity={vesselOpacity}>
        <defs><marker id="arrow" markerWidth="12" markerHeight="12" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ffd782"/></marker></defs>
      </g>
    </svg>
    <div style={{position:'absolute',top:110,left:68,right:68,display:'flex',alignItems:'center',gap:18}}>
      <div style={{width:12,height:62,borderRadius:8,background:'#f2c56b',boxShadow:'0 0 22px #f2c56b'}}/>
      <div style={{color:'#f5f7f6',fontWeight:800,fontSize:48,letterSpacing:2,textShadow:'0 3px 15px #07121e'}}>{title}</div>
    </div>
    <div style={{position:'absolute',top:202,left:68,color:'#b8dfe2',fontSize:23,letterSpacing:3,opacity:interpolate(t,[0,1],[.7,.3],clamp)}}>UCI · PERFUSIÓN PERIFÉRICA</div>
    <div style={{position:'absolute',right:48,bottom:60,color:'#ffffff',fontSize:24,fontWeight:700,letterSpacing:4,opacity:.68}}>MEDISHORT360</div>
    {audio && <Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={Math.round(8.34 * fps)} volume={0.94}/>}
  </AbsoluteFill>;
};
