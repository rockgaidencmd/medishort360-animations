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
export const Vasopresores3DReview:React.FC=()=>{
 const frame=useCurrentFrame(),t=frame/30;
 const label=t<8.34?'PACIENTE EN UCI':t<14.28?'NOREPINEFRINA':t<23.04?'VASOCONSTRICCIÓN':t<31.82?'PERFUSIÓN DISTAL':t<38.4?'EL SHOCK TAMBIÉN INFLUYE':t<48.2?'VALORACIÓN DE ENFERMERÍA':'MEDISHORT360';
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
  <Layer start={946} end={1162}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted src={staticFile('renders/icu.mp4')}/></Layer>
  <Layer start={1144} end={1456}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted src={staticFile('renders/nursing.mp4')}/></Layer>
  <Layer start={1438} end={1525}><OffthreadVideo style={{width:'100%',height:'100%',objectFit:'cover'}} muted src={staticFile('renders/icu.mp4')}/></Layer>
  {t>=31.82&&t<38.4&&<FlowMap time={t-31.82}/>}
  {t>=38.4&&t<48.2&&<div style={{position:'absolute',left:70,right:70,top:290,padding:22,borderRadius:22,background:'rgba(25,62,76,.88)',color:'#c4ede0',fontSize:29}}>Color · temperatura · relleno capilar · pulsos</div>}
  <div style={{position:'absolute',left:48,top:50,color:'#ecf6e9',fontWeight:700,fontSize:25,letterSpacing:3,textShadow:'0 2px 8px #163444'}}>MEDISHORT360</div>
  <div style={{position:'absolute',left:48,right:48,top:132,padding:'20px',height:110,background:'#244453',color:'#ffe0a9',fontWeight:700,fontSize:35,textShadow:'0 2px 8px #163444'}}>{label}</div>
  <div style={{position:'absolute',left:150,right:70,bottom:130,height:130,padding:'18px 24px',borderRadius:18,background:'rgba(21,49,61,.88)',color:'#fff2dd',fontSize:30,lineHeight:1.25}}>{caption}</div>
  <Audio src={staticFile('audio/vasopresores-original.mp3')}/>
 </AbsoluteFill>;
};
