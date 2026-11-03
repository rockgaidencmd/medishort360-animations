import React,{useMemo,useLayoutEffect,Suspense} from 'react';
import {useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {staticFile} from 'remotion';
import {PerfusedHand3D} from '../anatomy/PerfusedHand3D';

const Surfaces:React.FC<{time:number;onReady:()=>void}>=({time:t,onReady})=> {
 const loaded=useLoader(GLTFLoader,[staticFile('models/patient-head-surface.glb'),staticFile('models/patient-feet-surface.glb')]);
 const parts=useMemo(()=>loaded.map(g=>g.scene.clone(true)),[loaded]);
 useLayoutEffect(()=>onReady(),[onReady,parts]);
 const blink=Math.pow(Math.max(0,Math.cos((t-2.3)*Math.PI*1.6)),28)*.97;
 return <group>
  <group position={[0,4.15,.75]} rotation={[-.07,0,Math.sin(t*.6)*.012]}>
   <primitive object={parts[0]}/>
   {[-.3078,.3078].map(x=><mesh key={x} visible={blink>.04} position={[x*.62,(7.2842-7.35)*.62,(1.425-.4)*.62]} scale={[.12,.069*blink,.018]}>
    <sphereGeometry args={[1,28,16]}/><meshStandardMaterial color="#d7a181" roughness={.7}/>
   </mesh>)}
  </group>
  <primitive object={parts[1]} position={[0,.1,.65]}/>
 </group>;
};

function blanketGeometry(){
 const n=64,m=90,p:number[]=[],ix:number[]=[];
 for(let j=0;j<=m;j++){const y=-4.10+j/m*6.25;for(let i=0;i<=n;i++){
  const x=-1.68+i/n*3.36;
  const torso=.75*Math.exp(-Math.pow((y-1.45)/1.8,2))*Math.exp(-Math.pow(x/1.15,4));
  const legs=.38*Math.exp(-Math.pow((y+2.1)/1.9,4))*(Math.exp(-Math.pow((x-.46)/.37,2))+Math.exp(-Math.pow((x+.46)/.37,2)));
  const folds=.034*Math.sin(x*11+y*4.3)+.024*Math.sin(y*15+x*2.4);
  p.push(x,y,.55+torso+legs+folds);
 }}
 for(let j=0;j<m;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+1,c=b+n+1,d=a+n+1;ix.push(a,b,c,a,c,d);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(ix);g.computeVertexNormals();return g;
}
export const ICUPatient3D:React.FC<{time:number;onSurfaces:()=>void;onHand:()=>void}>=({time:t,onSurfaces,onHand})=> {
 const blanket=useMemo(blanketGeometry,[]),breath=Math.sin(t*2.0)*.018;
 return <group>
  <mesh receiveShadow position={[0,0,.10]}><boxGeometry args={[3.8,11.2,.62]}/><meshStandardMaterial color="#d0dddd" roughness={.95}/></mesh>
  <mesh position={[0,4.0,.55]} rotation={[.05,0,0]} scale={[1.28,.83,.27]}><sphereGeometry args={[1,36,24]}/><meshStandardMaterial color="#e5e4d5" roughness={.95}/></mesh>
  <Suspense fallback={null}><Surfaces time={t} onReady={onSurfaces}/></Suspense>
  <mesh position={[-1.05,2.7,1.05]} scale={[.55,.45,.30]}><sphereGeometry args={[1,30,20]}/><meshStandardMaterial color="#719da8" roughness={.8}/></mesh>
  <group scale={[1,1,1+breath]}>
   <mesh position={[0,2.12,.70]} scale={[1.18,1.18,.40]}><sphereGeometry args={[1,40,28]}/><meshStandardMaterial color="#719da8" roughness={.8}/></mesh>
   <mesh geometry={blanket} castShadow receiveShadow><meshStandardMaterial color="#568695" roughness={.9} side={THREE.DoubleSide}/></mesh>
  </group>
  <group position={[-1.27,.7,1.22]} scale={.25} rotation={[0,0,Math.PI-.12]}>
   <Suspense fallback={null}><PerfusedHand3D time={t} distalTone={.86} mottling={.82} onReady={onHand}/></Suspense>
  </group>
  {/* Bed frame, side rails and wheels are separate objects. */}
  <mesh position={[0,0,-.50]} castShadow><boxGeometry args={[3.95,11.4,.35]}/><meshStandardMaterial color="#6b8d97" metalness={.35} roughness={.4}/></mesh>
  {[-2.12,2.12].map(x=><group key={x}>
   <mesh position={[x,.25,1.0]}><cylinderGeometry args={[.045,.045,5.8,18]}/><meshStandardMaterial color="#bdcdd0" metalness={.75} roughness={.35}/></mesh>
   {[-2,0,2.5].map(y=><mesh key={y} position={[x,y,.4]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.035,.035,1.2,14]}/><meshStandardMaterial color="#bdcdd0" metalness={.7} roughness={.35}/></mesh>)}
  </group>)}
  {[-1.5,1.5].flatMap(x=>[-4.0,4.0].map(y=><group key={`${x},${y}`}>
   <mesh position={[x,y,-1.0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.08,.11,1.0,16]}/><meshStandardMaterial color="#8aa3aa" metalness={.6}/></mesh>
   <mesh position={[x,y,-1.65]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.24,.085,10,20]}/><meshStandardMaterial color="#253c49" roughness={.8}/></mesh>
  </group>))}
 </group>;
};
