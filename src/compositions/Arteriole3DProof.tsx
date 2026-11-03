import React, {useMemo} from 'react';
import * as THREE from 'three';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

// Open longitudinal cutaway. All wall layers share the same changing radius.
function wallGeometry(inner: number, outer: number) {
  const p: number[] = [], ids: number[] = [];
  const n = 84, start = .83, end = Math.PI * 2 - .83;
  const vertex = (x: number, r: number, a: number) => {p.push(x, Math.sin(a)*r, Math.cos(a)*r); return p.length / 3 - 1;};
  const quad = (a: number,b: number,c: number,d: number) => ids.push(a,b,c,a,c,d);
  for(let j=0;j<n;j++) {
    const a=start+(end-start)*j/n,b=start+(end-start)*(j+1)/n;
    // Outer surface, lumen, and annular end faces.
    quad(vertex(-4.5,outer,a),vertex(4.5,outer,a),vertex(4.5,outer,b),vertex(-4.5,outer,b));
    quad(vertex(-4.5,inner,b),vertex(4.5,inner,b),vertex(4.5,inner,a),vertex(-4.5,inner,a));
    for(const x of [-4.5,4.5]) quad(vertex(x,inner,a),vertex(x,outer,a),vertex(x,outer,b),vertex(x,inner,b));
  }
  for(const a of [start,end]) quad(vertex(-4.5,inner,a),vertex(4.5,inner,a),vertex(4.5,outer,a),vertex(-4.5,outer,a));
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(ids);g.computeVertexNormals();return g;
}

const Wall: React.FC<{inner: number; outer: number; color: string}> = ({inner,outer,color}) => {
  const geometry=useMemo(()=>wallGeometry(inner,outer),[inner,outer]);
  return <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.58} side={THREE.DoubleSide}/></mesh>;
};

export const Arteriole3DProof: React.FC = () => {
  const frame=useCurrentFrame(), {fps,width,height}=useVideoConfig(), t=frame/fps;
  const contraction=interpolate(t,[.95,2.85],[0,1],clamp);
  const radius=1.12-.35*contraction + Math.sin(t*6.7)*.014;
  // Continuous integral of velocity: no position jumps when speed changes.
  const travel=t<2.85 ? t*1.55 : 2.85*1.55+(t-2.85)*.88;
  const cellGeometry=useMemo(()=> {
    const points=Array.from({length:65},(_,i)=>{const a=Math.PI*(1-i/64),r=Math.sin(a);return new THREE.Vector2(r*.32,Math.cos(a)*.14*(.28+.72*r*r));});
    return new THREE.LatheGeometry(points,40);
  },[]);
  const cameraAngle=interpolate(t,[0,8.4],[-.11,.11],clamp);
  const term=t<3.15?'VASOCONSTRICCIÓN':'PERFUSIÓN PERIFÉRICA';
  return <AbsoluteFill style={{background:'#352d42',fontFamily:'Arial, sans-serif'}}>
    <ThreeCanvas width={width} height={height} camera={{position:[1.4,2.7,13.5],fov:43}} gl={{antialias:true,alpha:false,preserveDrawingBuffer:true}}>
      <color attach="background" args={['#46394c']}/><fog attach="fog" args={['#46394c',15,25]}/>
      <ambientLight intensity={.9}/><directionalLight position={[0,7,9]} intensity={2.7} color="#ffe2bd"/>
      <pointLight position={[-5,-3,5]} intensity={32} color="#7ddcd1"/><pointLight position={[5,3,-3]} intensity={40} color="#d68cae"/>
      {/* Tissue context: cells and connective fibres in depth, all drawn as geometry. */}
      {Array.from({length:48},(_,i)=><mesh key={`t${i}`} position={[Math.sin(i*2.4)*7,Math.cos(i*1.7)*7,-3-(i%4)*.4]} rotation={[i*.3,i*.7,t*.035+i]} scale={[.6+(i%3)*.15,.28,.3]}>
        <sphereGeometry args={[1,20,14]}/><meshStandardMaterial color={['#a86383','#be826e','#8e7096','#bd8a8f'][i%4]} roughness={.8}/>
      </mesh>)}
      {Array.from({length:8},(_,i)=><mesh key={`f${i}`} position={[(i%6-2.5)*2.1,Math.sin(i*2.2)*4,-2.8]} rotation={[.2,.3,i*.44+t*.008]} scale={[.025,5,.025]}>
        <sphereGeometry args={[1,12,12]}/><meshStandardMaterial color="#d0a18c" roughness={.75}/>
      </mesh>)}
      <group scale={.65} rotation={[0,cameraAngle,-.13]} position={[0,.2,0]}>
        <Wall inner={radius} outer={radius+.07} color="#c9747d"/>
        <Wall inner={radius+.07} outer={radius+.36} color="#b95770"/>
        <Wall inner={radius+.36} outer={radius+.48} color="#d39c86"/>
        {/* Circumferential muscle bundles, attached to the changing wall. */}
        {Array.from({length:30},(_,i)=><mesh key={`m${i}`} position={[-4.35+i*.3,0,0]} rotation={[0,Math.PI/2,Math.PI+.83]}>
          <torusGeometry args={[radius+.27,.038,8,64,Math.PI*2-1.66]}/><meshStandardMaterial color={i%2?'#ed9b8d':'#7e3859'} roughness={.7} side={THREE.DoubleSide}/>
        </mesh>)}
        {/* Biconcave erythrocytes keep their size during vasoconstriction. */}
        {Array.from({length:20},(_,i)=> {
          const x=((i*.61+travel)%8.2)-4.1;
          return <mesh key={`r${i}`} geometry={cellGeometry} position={[x,Math.sin(i*2.7+t*.7)*radius*.4,Math.cos(i*1.9+t*.4)*radius*.45]} rotation={[.7+Math.sin(t+i)*.45,i*.8+t*.4,t*.6+i*.4]}>
            <meshStandardMaterial color={i%3?'#ba2749':'#dc5262'} roughness={.36} metalness={.05}/>
          </mesh>;
        })}
      </group>
    </ThreeCanvas>
    <div style={{position:'absolute',top:60,left:52,right:52,color:'#f6eee7',letterSpacing:3,fontSize:25,fontWeight:700}}>MEDISHORT360</div>
    <div style={{position:'absolute',top:160,left:52,right:52,color:t<3.15?'#ffd395':'#a9eee1',fontSize:38,fontWeight:700,letterSpacing:2}}>{term}</div>
    <div style={{position:'absolute',top:223,left:52,right:52,color:'#efdbdf',fontSize:25}}>Corte longitudinal · representación didáctica</div>
    <div style={{position:'absolute',bottom:210,left:150,right:65,padding:'22px 28px',borderRadius:18,background:'rgba(45,29,49,.85)',color:'#fff0e2',fontSize:32,lineHeight:1.3}}>{t<.85?'Observa':t<3.15?'Las arterias pequeñas se estrechan':t<5.3?'Aumenta la resistencia vascular':'Puede disminuir el flujo hacia las extremidades'}</div>
    <Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={Math.round(14.28*fps)}/>
  </AbsoluteFill>;
};
