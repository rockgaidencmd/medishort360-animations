import React from 'react';
import {AbsoluteFill,Audio,OffthreadVideo,Sequence,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {ICUOpening3DProof} from './ICUOpening3DProof';
import {Arteriole3DProof} from './Arteriole3DProof';
import {HandPerfusion3DProof} from './HandPerfusion3DProof';

const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const Layer:React.FC<{start:number;end:number;children:React.ReactNode}>=({start,end,children})=>{
 const f=useCurrentFrame();const opacity=start===0?interpolate(f,[end-10,end],[1,0],cl):end===1525?interpolate(f,[start,start+10],[0,1],cl):interpolate(f,[start,start+10,end-10,end],[0,1,1,0],cl);
 return <Sequence from={start} durationInFrames={end-start}><AbsoluteFill style={{opacity}}>{children}</AbsoluteFill></Sequence>;
};
const FlowMap:React.FC<{time:number}>=({time:t})=><svg width="1080" height="1920" style={{position:'absolute',inset:0}} viewBox="0 0 1080 1920">
 <rect x="100" y="580" width="880" height="600" rx="60" fill="#244453" opacity=".94" stroke="#9ed5cf" strokeWidth="3"/>
 <text x="160" y="660" fill="#ffdfa8" fontSize="32" fontWeight="700">SHOCK · MICROCIRCULACIÓN</text>
 {[0,1,2].map(i=><g key={i}>
  <path d={`M160 880 Q420 ${690+i*190} 900 ${730+i*170}`} fill="none" stroke={['#c87c91','#b991ac','#c2748a'][i]} strokeWidth="23"/>
  {Array.from({length:5},(_,k)=>{const p=(t*[.23,.12,.18][i]+k/5)%1;return <ellipse key={k} cx={160+740*p} cy={(1-p)*(1-p)*880+2*(1-p)*p*(690+i*190)+p*p*(730+i*170)} rx="16" ry="11" fill="#f2c1ab"/>;})}
 </g>)}
 <text x="160" y="1120" fill="#e3efe3" fontSize="27">Flujo heterogéneo · esquema ilustrativo</text>
</svg>;
/** Animated, illustrative shock microcirculation cutaway; flow remains present but heterogeneous. */
const ShockMicrocirculation:React.FC<{time:number}>=({time:t})=>{
 const paths=['M110 875 C300 820 360 670 525 680 S790 900 970 820','M110 875 C300 900 380 1080 540 1030 S800 850 970 990','M110 875 C330 850 400 850 550 850 S800 840 970 875'];
 const colors=['#d8778d','#bf7390','#da8c86'];
 return <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
  <defs>
   <radialGradient id="shockBg"><stop stopColor="#8d596f"/><stop offset=".52" stopColor="#59475f"/><stop offset="1" stopColor="#263f4f"/></radialGradient>
   <linearGradient id="shockVessel" x2="0" y2="1"><stop stopColor="#f0b79e"/><stop offset=".4" stopColor="#c76f84"/><stop offset=".58" stopColor="#732c50"/><stop offset="1" stopColor="#a95470"/></linearGradient>
   <radialGradient id="shockCell"><stop stopColor="#e6aa91"/><stop offset="1" stopColor="#a65d76"/></radialGradient>
   <filter id="shockGlow"><feGaussianBlur stdDeviation="16"/></filter>
   <filter id="shockShadow"><feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#142c3a" floodOpacity=".55"/></filter>
   <clipPath id="shockCrop"><rect x="50" y="590" width="980" height="720" rx="150"/></clipPath>
  </defs>
  <rect width="1080" height="1920" fill="url(#shockBg)"/>
  <g opacity=".14" fill="none" stroke="#e6bdab">{Array.from({length:12},(_,i)=><path key={i} d={`M${-180+i*120} 560 Q${70+i*55} 1030 ${-80+i*118} 1400`} strokeWidth="3"/> )}</g>
  <g clipPath="url(#shockCrop)" filter="url(#shockShadow)">
   <rect x="50" y="590" width="980" height="720" fill="#543d59"/>
   {Array.from({length:10},(_,i)=><g key={i} transform={`translate(${135+(i%5)*205},${680+Math.floor(i/5)*280+Math.sin(t*.6+i)*7})`}>
     <ellipse rx="99" ry="84" fill="url(#shockCell)" stroke="#efb49f" strokeWidth="5" opacity=".9"/><ellipse rx="30" ry="26" fill="#80506b" opacity=".8"/>
     <path d="M-65-34 Q-18-66 31-48" fill="none" stroke="#ffd6b6" strokeWidth="7" opacity=".25"/>
   </g>)}
   {paths.map((d,i)=><g key={d}>
    <path d={d} fill="none" stroke={colors[i]} strokeWidth="70" strokeLinecap="round" opacity=".28" filter="url(#shockGlow)"/>
    <path d={d} fill="none" stroke="url(#shockVessel)" strokeWidth="54" strokeLinecap="round"/>
    <path d={d} fill="none" stroke="#642b4c" strokeWidth="27" strokeLinecap="round"/>
    {Array.from({length:5},(_,k)=>{const p=(t*[.16,.095,.13][i]+k/5)%1;const q=1-p;const x=q*q*110+2*q*p*(i===0?300:i===1?300:330)+p*p*970;const y=q*q*875+2*q*p*(i===0?820:i===1?900:850)+p*p*(i===0?820:i===1?990:875);const flow=i===1?.46:1;return <g key={k} transform={`translate(${x} ${y}) rotate(${Math.sin(t+k+i)*12})`} opacity={flow}><ellipse rx="22" ry="14" fill="#b73e5b" stroke="#ffc2a6" strokeWidth="3"/><ellipse rx="9" ry="5" fill="#742b49" opacity=".75"/></g>})}
   </g>)}
   {Array.from({length:14},(_,i)=>{const p=(t*.11+i/14)%1,x=145+(i%7)*132+(p-.5)*22,y=1060+Math.floor(i/7)*110+Math.sin(t+i)*6;return <circle key={i} cx={x} cy={y} r={5+Math.sin(t*2+i)*1.5} fill="#a8e7d7" opacity={.28+Math.sin(t+i)*.12}/>})}
  </g>
  <rect x="50" y="590" width="980" height="720" rx="150" fill="none" stroke="#e8c9ba" strokeWidth="5" opacity=".7"/>
  <text x="90" y="500" fill="#f7d8bd" fontSize="34" fontWeight="700" letterSpacing="3">SHOCK · MICROCIRCULACIÓN</text>
  <text x="90" y="1400" fill="#ecf0e4" fontSize="29">La alteración circulatoria también puede afectar la perfusión.</text>
  <text x="90" y="1450" fill="#bce4dc" fontSize="24">Esquema ilustrativo · el flujo no desaparece por completo</text>
  <path d={`M90 1530 H${90+Math.min(t,5.8)*130}`} stroke="#e6aa91" strokeWidth="7" strokeLinecap="round" opacity=".8"/>
 </svg>;
};
const AnimatedOutro:React.FC<{time:number}>=({time:t})=><svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
 <defs><radialGradient id="outroBg"><stop stopColor="#416b72"/><stop offset="1" stopColor="#193845"/></radialGradient><linearGradient id="outroLine"><stop stopColor="#5fe1c1"/><stop offset="1" stopColor="#efb47d"/></linearGradient><filter id="outroGlow"><feGaussianBlur stdDeviation="20"/></filter></defs>
 <rect width="1080" height="1920" fill="url(#outroBg)"/>
 {Array.from({length:9},(_,i)=><circle key={i} cx={540+Math.cos(i*Math.PI*2/9+t*.16)*330} cy={850+Math.sin(i*Math.PI*2/9+t*.16)*330} r={18+Math.sin(t+i)*4} fill={i%2?'#77d8cb':'#efb47d'} opacity=".35"/>)}
 <circle cx="540" cy="850" r="270" fill="none" stroke="#b9e5d8" strokeOpacity=".18" strokeWidth="3"/>
 <circle cx="540" cy="850" r="225" fill="none" stroke="#b9e5d8" strokeOpacity=".28" strokeWidth="2" strokeDasharray="12 18" transform={`rotate(${t*24} 540 850)`}/>
 <path d="M220 1050 C360 980 380 730 540 790 S730 1030 860 680" fill="none" stroke="#62dbc2" strokeWidth="18" opacity=".24" filter="url(#outroGlow)"/>
 <path d="M220 1050 C360 980 380 730 540 790 S730 1030 860 680" fill="none" stroke="url(#outroLine)" strokeWidth="7" strokeLinecap="round"/>
 {[0,1,2,3,4].map(i=>{const p=(t*.17+i/5)%1,q=1-p,x=q*q*220+2*q*p*360+p*p*540,y=q*q*1050+2*q*p*980+p*p*790;return <g key={i} transform={`translate(${x} ${y})`}><ellipse rx="20" ry="12" fill="#c74862" stroke="#ffc4a5" strokeWidth="3"/><ellipse rx="8" ry="5" fill="#792d4d"/></g>})}
 <text x="540" y="1250" textAnchor="middle" fill="#f5e8d1" fontSize="69" fontWeight="700" letterSpacing="7" opacity={interpolate(t,[.2,.8],[0,1],cl)}>MEDISHORT360</text>
 <text x="540" y="1320" textAnchor="middle" fill="#bfe8dc" fontSize="28" letterSpacing="4">CIENCIA QUE SE VE · CUIDADOS QUE TRANSFORMAN</text>
 <path d={`M${540-Math.min(t,1.3)*170} 1380 H${540+Math.min(t,1.3)*170}`} stroke="#e9b887" strokeWidth="4" strokeLinecap="round"/>
 </svg>;
export const Vasopresores3DReview:React.FC=()=>{
 const frame=useCurrentFrame(),t=frame/30;
 const label=t<8.34?'PACIENTE EN UCI':t<14.28?'NOREPINEFRINA':t<23.04?'VASOCONSTRICCIÓN':t<31.82?'PERFUSIÓN DISTAL':t<38.4?'EL SHOCK TAMBIÉN INFLUYE':t<48.2?'VALORACIÓN DE ENFERMERÍA':'SIGUE APRENDIENDO';
 const cues:[[number,number,string],...Array<[number,number,string]>]=[
 [0,5.4,'¿Por qué algunos pacientes presentan manos y pies morados?'],[5.96,7.86,'¡Hola, hijos de Florence Nightingale!'],
 [8.34,10.45,'Medicamentos como la norepinefrina'],[10.45,13.8,'Producen vasoconstricción para elevar la presión arterial'],
 [14.28,14.75,'Observa'],[15.22,17.14,'Las arterias pequeñas se estrechan'],[17.56,19.6,'Aumenta la resistencia vascular'],[19.6,22.44,'Puede disminuir el flujo hacia las extremidades'],
 [23.04,25.0,'Cuando la perfusión es insuficiente'],[25,27.2,'Los tejidos reciben menos oxígeno'],[27.2,31.3,'Pueden aparecer frialdad, coloración violácea o piel moteada'],
 [31.82,34.0,'Pero cuidado'],[34,37.84,'También puede deberse al propio shock; no solo al medicamento'],
 [38.4,40.35,'Como enfermeros debemos vigilar'],[40.35,41.4,'Coloración'],[41.4,42.35,'Temperatura'],[42.35,43.25,'Relleno capilar'],[43.25,44.55,'Pulsos periféricos'],[44.55,47.84,'Comunicar inmediatamente cualquier deterioro'],[48.2,50.15,'Síguenos en MediShort360']];
 const caption=cues.find(([a,b])=>t>=a&&t<b)?.[2]??'';
 return <AbsoluteFill style={{background:'#284b59',fontFamily:'Arial, sans-serif'}}>
  <Layer start={0} end={260}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted src={staticFile('renders/icu.mp4')}/></Layer>
  <Layer start={250} end={438}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted src={staticFile('renders/infusion.mp4')}/></Layer>
  <Layer start={420} end={702}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted playbackRate={.9} src={staticFile('renders/arteriole.mp4')}/></Layer>
  <Layer start={684} end={964}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted playbackRate={.9} src={staticFile('renders/hand.mp4')}/></Layer>
  <Layer start={946} end={1162}><ShockMicrocirculation time={t-31.82}/></Layer>
  <Layer start={1144} end={1456}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted src={staticFile('renders/nursing.mp4')}/></Layer>
  <Layer start={1438} end={1525}><AnimatedOutro time={t-48.2}/></Layer>
  {t>=38.4&&t<48.2&&<div style={{position:'absolute',left:70,right:70,top:290,padding:22,borderRadius:22,background:'rgba(25,62,76,.88)',color:'#c4ede0',fontSize:29}}>Color · temperatura · relleno capilar · pulsos</div>}
  <div style={{position:'absolute',left:48,top:50,color:'#ecf6e9',fontWeight:700,fontSize:25,letterSpacing:3,textShadow:'0 2px 8px #163444'}}>MEDISHORT360</div>
  <div style={{position:'absolute',left:48,right:48,top:132,padding:'20px',height:110,background:'#244453',color:'#ffe0a9',fontWeight:700,fontSize:35,textShadow:'0 2px 8px #163444'}}>{label}</div>
  <div style={{position:'absolute',left:150,right:70,bottom:130,height:130,padding:'18px 24px',borderRadius:18,background:'#15313d',color:'#fff2dd',fontSize:30,lineHeight:1.25}}>{caption}</div>
  <Audio src={staticFile('audio/vasopresores-original.mp3')}/>
 </AbsoluteFill>;
};
