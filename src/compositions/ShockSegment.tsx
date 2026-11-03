import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const fade=(f:number,a:number,b:number)=>interpolate(f,[a,a+10,b-10,b],[0,1,1,0],clamp);

const ShockCell:React.FC<{f:number;x:number;y:number;delay:number;rate:number}> = ({f,x,y,delay,rate})=>{
  const p=((f*rate+delay)%700)-90;
  return <g transform={`translate(${x+p} ${y+Math.sin(f*.035+delay)*4})`}>
    <ellipse rx="24" ry="14" fill="url(#cell)" stroke="#ffb1aa" strokeWidth="3"/>
    <ellipse rx="10" ry="5.5" fill="#64253d"/><ellipse rx="5" ry="2.5" fill="#d86a76"/>
    <path d="M-18 -3Q0 -10 18 -3" fill="none" stroke="#ffd9cf" strokeWidth="2" opacity=".75"/>
  </g>;
};

export const ShockSegment:React.FC=()=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const t=f/fps;
  const wide=fade(f,0,68), hand=fade(f,42,108), micro=fade(f,100,178), back=fade(f,166,192);
  const approach=interpolate(f,[35,83],[0,1],clamp);
  const zoom=interpolate(f,[25,74,105,160,190],[1,1.35,2.7,1.35,1],clamp);
  const shift=interpolate(f,[25,74,105,160,190],[0,-80,-170,-80,0],clamp);
  const caption=t<3.15?'EL SHOCK ALTERA LA MICROCIRCULACIÓN':'NO ES SOLO EL MEDICAMENTO';

  return <AbsoluteFill style={{background:'#211333',fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
      <defs>
        <linearGradient id="room" x2=".85" y2="1"><stop stopColor="#53306f"/><stop offset=".45" stopColor="#30204d"/><stop offset="1" stopColor="#143d52"/></linearGradient>
        <radialGradient id="roomGlow"><stop stopColor="#e19cf0" stopOpacity=".48"/><stop offset="1" stopColor="#a652cf" stopOpacity="0"/></radialGradient>
        <linearGradient id="skin" x2=".2" y2="1"><stop stopColor="#f2c5a2"/><stop offset=".55" stopColor="#d99a7d"/><stop offset="1" stopColor="#b97873"/></linearGradient>
        <linearGradient id="sheet" x2="0" y2="1"><stop stopColor="#ebf1fa"/><stop offset="1" stopColor="#aebbd1"/></linearGradient>
        <linearGradient id="cell" x2="0" y2="1"><stop stopColor="#f68c96"/><stop offset=".5" stopColor="#c83e59"/><stop offset="1" stopColor="#7d203e"/></linearGradient>
        <linearGradient id="mottledTone" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5966a5" stopOpacity=".72"/><stop offset=".48" stopColor="#776aa7" stopOpacity=".43"/><stop offset="1" stopColor="#776aa7" stopOpacity="0"/></linearGradient>
        <linearGradient id="tissue" x2="0" y2="1"><stop stopColor="#e8b2c0"/><stop offset=".3" stopColor="#aa5478"/><stop offset="1" stopColor="#533050"/></linearGradient>
        <clipPath id="dorsal"><path d="M295 1085C261 1040 253 970 260 912L278 730C281 689 307 663 336 671C366 679 369 711 365 760L350 874L375 660C380 620 408 599 439 610C472 622 472 657 465 698L439 873L478 686C486 647 513 631 543 643C571 654 572 688 561 727L521 890L568 761C581 726 611 714 637 730C667 748 656 785 641 824L590 977C572 1034 538 1072 487 1097L421 1129C375 1151 332 1134 295 1085Z"/></clipPath>
        <clipPath id="microView"><rect x="0" y="0" width="1080" height="1920" rx="0"/></clipPath>
        <filter id="soft"><feGaussianBlur stdDeviation="35"/></filter>
      </defs>
      <rect width="1080" height="1920" fill="url(#room)"/>
      <ellipse cx="170" cy="580" rx="460" ry="540" fill="url(#roomGlow)"/>
      <g opacity=".28" fill="none" stroke="#d7b7eb" strokeWidth="3"><path d="M0 410H1080M0 1540H1080"/><path d="M95 410V1540M985 410V1540" opacity=".5"/></g>
      {/* Enlarge the continuous scene content to use the vertical frame more fully. */}
      <g transform="translate(540 960) scale(1.06) translate(-540 -960)">
      {/* UCI bedside, monitor and patient establish that the finding occurs in shock */}
      <g opacity={wide}>
        <rect x="685" y="420" width="310" height="285" rx="27" fill="#19182e" stroke="#c8a0e1" strokeWidth="7"/>
        <rect x="715" y="450" width="250" height="172" rx="12" fill="#102d38"/>
        <path d="M730 540h34l19-45 25 86 27-55h47l20-33 23 47h28" fill="none" stroke="#65e2c0" strokeWidth="7"/>
        <text x="733" y="670" fill="#f5d9ea" fontSize="29" fontWeight="700">PAM BAJA · SHOCK</text>
        <rect x="77" y="1055" width="930" height="410" rx="35" fill="url(#sheet)" stroke="#f5f1ff" strokeWidth="8"/>
        <path d="M80 1376h930v98H80z" fill="#8f9cb5" opacity=".8"/>
        <path d="M92 1450v136m896-136v136" stroke="#ced8e6" strokeWidth="16"/>
        <ellipse cx="349" cy="1147" rx="128" ry="111" fill="url(#skin)"/>
        <path d="M224 1143q-8-116 123-122 129 8 131 139l-31 58H255z" fill="#322440"/>
        <path d="M292 1140q20-22 43 0m42 0q22-22 45 0" fill="none" stroke="#694348" strokeWidth="6" strokeLinecap="round"/>
        <path d="M300 1190q45 21 82 0" fill="none" stroke="#a35f5c" strokeWidth="5" strokeLinecap="round"/>
        <path d="M244 1241q155-78 325 0l79 172H182z" fill="#60b5bd" stroke="#d3f2ef" strokeWidth="7"/>
        <path d="M504 1295q78 35 157 49l98 20q52 10 43 51-10 43-61 33l-126-23q-128-22-161-74z" fill="url(#skin)" stroke="#f1c6a7" strokeWidth="7"/>
        <path d="M714 1413q57-46 148-13l52 27q28 19 14 53-15 32-52 20l-127-32q-34-9-35-55z" fill="url(#skin)" stroke="#f0c3a4" strokeWidth="6"/>
        <path d="M839 1420q44-20 83-3l-8 55q-39 11-74-8z" fill="#6677ae" opacity=".86"/>
        <path d="M835 1428q26 20 61 5m-62 22q28 20 65 4" fill="none" stroke="#8f8cc0" strokeWidth="5" opacity=".9"/>
      </g>
      {/* Continuous camera move: the distal hand grows into view; mottling is a branching vascular reticulum in the skin */}
      <g opacity={hand} transform={`translate(${shift} 0) translate(540 950) scale(${zoom}) translate(-540 -950)`}>
        <path d="M295 1085C261 1040 253 970 260 912L278 730C281 689 307 663 336 671C366 679 369 711 365 760L350 874L375 660C380 620 408 599 439 610C472 622 472 657 465 698L439 873L478 686C486 647 513 631 543 643C571 654 572 688 561 727L521 890L568 761C581 726 611 714 637 730C667 748 656 785 641 824L590 977C572 1034 538 1072 487 1097L421 1129C375 1151 332 1134 295 1085Z" fill="url(#skin)" stroke="#ffdfc6" strokeWidth="9"/>
        <g clipPath="url(#dorsal)">
          <path d="M245 610H665V1160H245Z" fill="url(#mottledTone)" opacity=".72"/>
          {/* Irregular branching reticulum integrated with skin tone, not dark circular spots. */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M260 1032C302 1004 324 973 342 944S374 907 404 889 438 862 456 827 489 788 520 767 559 728 574 695M341 944C325 912 308 893 282 880M374 907C370 877 383 852 406 830M404 889C430 908 452 926 482 936S535 947 562 973M456 827C442 797 437 770 445 739M489 788C520 801 547 814 572 836M520 767C541 749 551 725 548 700" stroke="#525d9e" strokeWidth="15" opacity=".56"/>
            <path d="M260 1032C302 1004 324 973 342 944S374 907 404 889 438 862 456 827 489 788 520 767 559 728 574 695M341 944C325 912 308 893 282 880M374 907C370 877 383 852 406 830M404 889C430 908 452 926 482 936S535 947 562 973M456 827C442 797 437 770 445 739M489 788C520 801 547 814 572 836M520 767C541 749 551 725 548 700" stroke="#a28ad0" strokeWidth="5" opacity=".76"/>
            <path d="M283 995C322 970 348 941 369 916M429 872C416 840 416 812 427 782M478 810C485 843 497 870 523 887M326 967C310 946 293 930 268 924M502 780C529 775 550 760 564 737" stroke="#7770b1" strokeWidth="10" opacity=".55"/>
          </g>
        </g>
        <path d="M302 734q16-24 39-11l-7 39q-22 9-34-8zm105-96q20-18 39-4l-7 39q-24 6-36-7zm104 33q18-20 38-5l-8 39q-23 7-35-8zm106 73q20-12 37 7l-16 36q-23-1-31-17z" fill="#efc6b5" stroke="#ae7c75" strokeWidth="3"/>
      </g>
      {/* Dermal capillary bed: branching channels show patchy, unequal transit rather than a total stop */}
      <g opacity={micro} clipPath="url(#microView)">
        <rect width="1080" height="1920" fill="#201538"/>
        <ellipse cx="536" cy="1000" rx="650" ry="760" fill="url(#roomGlow)" opacity=".45"/>
        <path d="M0 590q270 55 540 0t540 0v720q-270-55-540 0t-540 0z" fill="url(#tissue)" stroke="#efb3c4" strokeWidth="10"/>
        <path d="M0 760q270 50 540 0t540 0M0 1160q270 50 540 0t540 0" fill="none" stroke="#ffd1d5" strokeWidth="8" opacity=".65"/>
        <g fill="none" strokeLinecap="round">
          <path d="M-30 920C130 858 214 973 330 917s188-68 272 4 141 112 241 55 157-50 275 7" stroke="#8e2e52" strokeWidth="40"/>
          <path d="M-30 920C130 858 214 973 330 917s188-68 272 4 141 112 241 55 157-50 275 7" stroke="#f2778b" strokeWidth="20"/>
          <path d="M190 914q-20-142 93-212t190 21m-89 195q31 130 129 170t195-34M424 921q-50-102 7-174m181 175q61-85 155-78m-265 108q-20 100-125 134" stroke="#8e2e52" strokeWidth="24"/>
          <path d="M190 914q-20-142 93-212t190 21m-89 195q31 130 129 170t195-34M424 921q-50-102 7-174m181 175q61-85 155-78m-265 108q-20 100-125 134" stroke="#e96e82" strokeWidth="11"/>
          <path d="M-30 920C130 858 214 973 330 917s188-68 272 4 141 112 241 55 157-50 275 7" stroke="#ffd0d0" strokeWidth="4" opacity=".85"/>
        </g>
        {Array.from({length:9},(_,i)=><ShockCell key={i} f={f} x={-25+i*125} y={922+Math.sin(i*2)*25} delay={i*91} rate={i%3===0?1.8:i%3===1?.75:1.25}/>)}
        <text x="540" y="1515" fill="#fff" textAnchor="middle" fontSize="37" fontWeight="700" letterSpacing="3">FLUJO MICROVASCULAR HETEROGÉNEO</text>
      </g>
      <g opacity={back} transform={`translate(${shift} 0) translate(540 950) scale(${zoom}) translate(-540 -950)`}>
        <path d="M295 1085C261 1040 253 970 260 912L278 730C281 689 307 663 336 671C366 679 369 711 365 760L350 874L375 660C380 620 408 599 439 610C472 622 472 657 465 698L439 873L478 686C486 647 513 631 543 643C571 654 572 688 561 727L521 890L568 761C581 726 611 714 637 730C667 748 656 785 641 824L590 977C572 1034 538 1072 487 1097L421 1129C375 1151 332 1134 295 1085Z" fill="url(#skin)" stroke="#ffdfc6" strokeWidth="9"/>
        <g clipPath="url(#dorsal)"><path d="M245 886C290 848 322 867 345 905S393 946 427 911s64-31 90 6 58 51 98 16M252 962c39-35 77-28 101 10s63 44 93 12 69-38 96-3 59 45 96 9M270 1022c38-25 64-14 90 13s52 35 78 14 51-45 85-25 58 45 102 17" fill="none" stroke="#695eaa" strokeWidth="14" opacity=".68"/></g>
      </g>
      </g>
    </svg>
    <div style={{position:'absolute',top:46,left:54,color:'#f7e9ff',fontWeight:750,fontSize:21,letterSpacing:3,background:'rgba(22,12,38,.55)',padding:'10px 18px',borderRadius:24,border:'1px solid rgba(226,190,245,.35)'}}>MEDISHORT360 · UCI</div>
    <div style={{position:'absolute',top:132,left:72,right:72,padding:'15px 22px',borderRadius:22,textAlign:'center',color:'#fff',fontSize:32,fontWeight:850,lineHeight:1.08,letterSpacing:.4,background:'rgba(23,12,40,.72)',border:'1px solid rgba(230,199,255,.35)',boxShadow:'0 12px 32px rgba(6,2,18,.26)'}}>{caption}</div>
    <div style={{position:'absolute',right:44,bottom:50,color:'#fff',fontSize:22,fontWeight:700,letterSpacing:4,opacity:.7}}>MEDISHORT360</div>
    <Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={948} endAt={1140} volume={.96}/>
  </AbsoluteFill>;
};
