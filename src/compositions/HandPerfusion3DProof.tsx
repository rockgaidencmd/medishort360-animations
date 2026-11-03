import React, {Suspense,useState,useCallback} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill,Audio,delayRender,continueRender,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {MicroperfusionLens} from '../components/MicroperfusionLens';
import {PerfusedHand3D} from '../anatomy/PerfusedHand3D';

const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
export const HandPerfusion3DProof:React.FC<{audio?:boolean;overlays?:boolean;assessment?:boolean}>=({audio=true,overlays=true,assessment=false})=> {
  const [handle]=useState(()=>delayRender('Loading skinned hand model'));
  const onReady=useCallback(()=>continueRender(handle),[handle]);
  const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),t=frame/fps;
  const tone=assessment?.86:interpolate(t,[5.0,6.7],[0,1],cl),mottle=assessment?.65:interpolate(t,[6.7,8.2],[0,1],cl);
  return <AbsoluteFill style={{background:'#263f49',fontFamily:'Arial, sans-serif'}}>
    <ThreeCanvas width={width} height={height} shadows camera={{position:[0,0,12],fov:42}} gl={{antialias:true,alpha:false,preserveDrawingBuffer:true}}>
      <color attach="background" args={['#2e505a']}/>
      <ambientLight intensity={.9}/><directionalLight castShadow position={[-3,5,8]} intensity={2.5} color="#ffe4cb" shadow-mapSize={[1024,1024]}/>
      <pointLight position={[5,-1,4]} intensity={30} color="#98cfd0"/>
      <group rotation={[0,-.07+t*.025,-.08+Math.sin(t*.32)*.012]}>
        {/* Close-up of a hospital mattress, linen and bed rails; all geometric. */}
        <mesh position={[0,0,-1.4]} receiveShadow><boxGeometry args={[4.85,11,.65]}/><meshStandardMaterial color="#b7cccd" roughness={.95}/></mesh>
        <mesh position={[0,-2.85,-.9]} receiveShadow rotation={[.06,0,0]}><boxGeometry args={[4.8,4.1,.5,12,12,2]}/><meshStandardMaterial color="#79a8b2" roughness={.9}/></mesh>
        {[-2.65,2.65].map(x=><mesh key={x} position={[x,0,-1]}><cylinderGeometry args={[.10,.10,11,16]}/><meshStandardMaterial color="#bcc9d0" roughness={.3} metalness={.65}/></mesh>)}
        <group position={[.12,-.5,-.13]} rotation={[.04,Math.sin(t*.55)*.018,0]}>
          <Suspense fallback={null}><PerfusedHand3D time={t} distalTone={tone} mottling={mottle} blanch={assessment?interpolate(t,[3.7,3.95,4.45,7.5],[0,1,1,0],cl):0} onReady={onReady}/></Suspense>
        </group>
      </group>
      {assessment && t>3.1 && t<5.4 && <group position={[interpolate(t,[3.1,3.95,4.45,5.4],[4,0,0,4],cl),0,0]}>
        <mesh position={[1.15,2.02,interpolate(t,[3.1,3.95,4.45,4.85],[1.8,.84,.84,1.8],cl)]} rotation={[0,.22,-Math.PI/2]} scale={[.17,.65,.14]}><capsuleGeometry args={[1,2,8,20]}/><meshStandardMaterial color="#92d0d4" roughness={.65}/></mesh>
      </group>}
    </ThreeCanvas>
    {!assessment && <MicroperfusionLens time={t}/>}
    <svg width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:assessment?0:interpolate(t,[4.0,4.3,5.2,5.6],[0,1,1,0],cl)}}>
      <g transform="translate(900 410)">
       <rect x="-46" y="-25" width="92" height="235" rx="35" fill="#1c4e60" opacity=".9"/>
       <path d="M-10 8 V127 A25 25 0 1 0 10 127 V8 Q0-3-10 8Z" fill="#d7efed" stroke="#a4d8df" strokeWidth="3"/>
       <circle cy="150" r="16" fill="#79bfd6"/>
       <path d={`M0 145 V${interpolate(t,[4.1,5.3],[25,110],cl)}`} stroke="#79bfd6" strokeWidth="11" strokeLinecap="round"/>
       <text y="196" textAnchor="middle" fill="#d7efed" fontSize="23">↓</text>
      </g>
    </svg>
    {overlays && <><div style={{position:'absolute',left:48,top:55,fontSize:25,fontWeight:700,letterSpacing:3,color:'#eaf6ed'}}>MEDISHORT360</div>
    <div style={{position:'absolute',left:48,top:160,right:48,fontSize:36,fontWeight:700,color:'#ffe0ab'}}>{t<3.5?'PERFUSIÓN DISTAL':t<6.7?'COLORACIÓN VIOLÁCEA':'MOTEADO CUTÁNEO'}</div>
    <div style={{position:'absolute',left:150,right:65,bottom:180,padding:'20px 24px',borderRadius:18,background:'rgba(19,43,53,.85)',fontSize:30,lineHeight:1.3,color:'#f8f2df'}}>{t<2?'Cuando la perfusión es insuficiente':t<4.2?'Los tejidos reciben menos oxígeno':t<5.3?'Puede aparecer frialdad':t<6.7?'Coloración violácea':'O piel moteada'}</div>
    </>}{audio && <Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={Math.round(23.04*fps)}/>}
  </AbsoluteFill>;
};
