import React,{useState,useRef,useCallback,useLayoutEffect} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {AbsoluteFill,Audio,delayRender,continueRender,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {ICUPatient3D} from '../scenes/ICUPatient3D';
import {ICUEquipment3D} from '../scenes/ICUEquipment3D';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

const CameraRig:React.FC<{time:number}>=({time:t})=> {
 const {camera,gl,scene}=useThree();
 useLayoutEffect(()=>{
  const d=interpolate(t,[0,4.6,8.4],[1,.87,.93],cl);
  camera.up.set(0,0,1);camera.position.set((6.8-t*.10)*d,-16.8*d,15.0*d);camera.lookAt(0,.9,.7);camera.updateProjectionMatrix();scene.updateMatrixWorld(true);gl.render(scene,camera);
 },[t,camera,gl,scene]);return null;
};
export const ICUOpening3DProof:React.FC=()=> {
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),t=frame/fps;
 const [handle]=useState(()=>delayRender('Loading licensed patient surface and articulated hand'));
 const ready=useRef(new Set<string>()),done=useRef(false);
 const finish=useCallback((name:string)=>{ready.current.add(name);if(ready.current.size===2&&!done.current){done.current=true;continueRender(handle);}},[handle]);
 const onSurfaces=useCallback(()=>finish('surfaces'),[finish]),onHand=useCallback(()=>finish('hand'),[finish]);
 const label=t<2?'PACIENTE EN UCI':t<5.5?'PERFUSIÓN DISTAL':'MEDISHORT360';
 return <AbsoluteFill style={{fontFamily:'Arial, sans-serif',background:'#284b59'}}>
  <ThreeCanvas width={width} height={height} shadows camera={{position:[6.8,-16.8,15.0],fov:43,near:.1,far:100}} gl={{antialias:true,alpha:false,preserveDrawingBuffer:true}}>
   <color attach="background" args={['#294f5c']}/><fog attach="fog" args={['#294f5c',24,43]}/>
   <ambientLight intensity={.8}/><directionalLight castShadow position={[-4,-1,13]} intensity={2.4} color="#ffead4" shadow-mapSize={[1024,1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-bias={-.001}/>
   <pointLight position={[5,4,6]} intensity={85} color="#7ac6c4"/>
   {/* Room surfaces and architectural context in three dimensions. */}
   <mesh receiveShadow position={[0,0,-2.0]}><boxGeometry args={[22,25,.2]}/><meshStandardMaterial color="#779696" roughness={.95}/></mesh>
   {Array.from({length:11},(_,i)=><mesh key={i} position={[-10+i*2,0,-1.88]}><boxGeometry args={[.015,24,.008]}/><meshStandardMaterial color="#5e8086"/></mesh>)}
   {Array.from({length:12},(_,i)=><mesh key={`r${i}`} position={[0,-11+i*2,-1.88]}><boxGeometry args={[22,.015,.008]}/><meshStandardMaterial color="#5e8086"/></mesh>)}
   <mesh position={[0,7.6,2.3]} receiveShadow><boxGeometry args={[22,.25,8.4]}/><meshStandardMaterial color="#a9bdb7" roughness={.9}/></mesh>
   <mesh position={[0,7.42,.4]}><boxGeometry args={[22,.1,2.3]}/><meshStandardMaterial color="#417d89" roughness={.8}/></mesh>
   <mesh position={[-5.7,2.2,2.3]}><boxGeometry args={[.24,10.5,8.4]}/><meshStandardMaterial color="#b7c8c0" roughness={.85}/></mesh>
   <mesh position={[-5.52,2.8,3.2]}><boxGeometry args={[.06,4.2,2.3]}/><meshStandardMaterial color="#c4e8e3" emissive="#7ab6b5" emissiveIntensity={.25}/></mesh>
   <mesh position={[0,7.12,2.1]}><boxGeometry args={[9,.28,.40]}/><meshStandardMaterial color="#d5dbd1" metalness={.2}/></mesh>
   {[-2.5,-1.5,.8,1.7].map((x,i)=><mesh key={x} position={[x,6.93,2.1]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.12,16]}/><meshStandardMaterial color={i%2?'#d1b074':'#83b9b3'}/></mesh>)}
   <ICUPatient3D time={t} onSurfaces={onSurfaces} onHand={onHand}/>
   <ICUEquipment3D time={t}/>
   <CameraRig time={t}/>
  </ThreeCanvas>
  <div style={{position:'absolute',left:48,top:48,color:'#eef5e9',fontSize:25,fontWeight:700,letterSpacing:3,textShadow:'0 2px 8px #183745'}}>MEDISHORT360</div>
  <div style={{position:'absolute',left:48,right:48,top:140,fontSize:37,letterSpacing:2,color:'#ffe2ac',fontWeight:700,textShadow:'0 3px 12px #193c49'}}>{label}</div>
  <div style={{position:'absolute',left:150,right:70,bottom:145,padding:'18px 24px',borderRadius:18,background:'rgba(21,49,61,.87)',color:'#fff2dd',fontSize:30,lineHeight:1.25}}>{t<2.1?'¿Por qué algunos pacientes en UCI':t<3.8?'tienen las manos y los pies morados':t<5.6?'cuando reciben vasopresores?':t<7.95?'¡Hola, hijos de Florence Nightingale!':''}</div>
  <Audio src={staticFile('audio/vasopresores-original.mp3')}/>
 </AbsoluteFill>;
};
