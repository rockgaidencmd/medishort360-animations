import React,{useMemo} from 'react';
import * as THREE from 'three';

const Tube:React.FC<{curve:THREE.Curve<THREE.Vector3>;radius:number;color:string}>=({curve,radius,color})=> {
 const geometry=useMemo(()=>new THREE.TubeGeometry(curve,80,radius,10,false),[curve,radius]);
 return <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.35}/></mesh>;
};
export const ICUEquipment3D:React.FC<{time:number}>=({time:t})=> {
 const iv=useMemo(()=>new THREE.CatmullRomCurve3([
  new THREE.Vector3(-2.8,2.7,4.5),new THREE.Vector3(-2.8,2.6,3.3),new THREE.Vector3(-2.7,2.3,2.4),new THREE.Vector3(-2.2,1.2,1.2),new THREE.Vector3(-.65,2.1,1.6),new THREE.Vector3(-.4,2.9,1.2),
 ]),[]);
 const traces=useMemo(()=>Array.from({length:3},(_,row)=> {
  const points=Array.from({length:180},(_,i)=>{
   const x=-1.15+i/179*2.25,p=((i/179)*3.3+t*.9)%1;
   const spike=Math.exp(-Math.pow((p-.43)/.026,2))*.43-Math.exp(-Math.pow((p-.39)/.022,2))*.13-Math.exp(-Math.pow((p-.48)/.03,2))*.24;
   const y=row===0?.36+spike:row===1?-.03+Math.sin(p*Math.PI*2)*.11:-.42+Math.sin(p*Math.PI*2)*.065;
   return new THREE.Vector3(x,y,.18);
  });
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:['#65f0b6','#79dce4','#f1c78a'][row]}));
 }),[t]);
 return <group>
  {/* Monitor on a wheeled support. The waveforms change every frame. */}
  <mesh position={[3,2.8,.25]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.06,.09,4,16]}/><meshStandardMaterial color="#a1b8bf" metalness={.65} roughness={.35}/></mesh>
  <group position={[3,2.6,2.65]} rotation={[Math.PI/3,0,-.08]}>
   <mesh castShadow><boxGeometry args={[2.75,1.85,.27]}/><meshStandardMaterial color="#b2c3c5" roughness={.5}/></mesh>
   <mesh position={[0,0,.145]}><boxGeometry args={[2.5,1.57,.015]}/><meshBasicMaterial color="#102b34"/></mesh>
   {traces.map((line,i)=><primitive key={i} object={line}/>)}
   <mesh position={[1.22,-.78,.17]}><sphereGeometry args={[.065,16,12]}/><meshBasicMaterial color="#8cf8d0"/></mesh>
  </group>
  {/* IV pole, bag, volumetric pump, and continuous fluid trajectory. */}
  <mesh position={[-2.8,2.8,1.3]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.045,.06,6.2,18]}/><meshStandardMaterial color="#b6c8ca" metalness={.75} roughness={.3}/></mesh>
  <mesh position={[-2.45,2.8,4.8]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.035,.035,.8,12]}/><meshStandardMaterial color="#a1bcc1" metalness={.5}/></mesh>
  <mesh position={[-2.8,2.75,4.15]}><boxGeometry args={[.68,.24,1.12]}/><meshPhysicalMaterial color="#c4ece4" transparent opacity={.52} roughness={.15}/></mesh>
  <mesh position={[-2.8,2.75,3.98]}><boxGeometry args={[.56,.16,.66]}/><meshStandardMaterial color="#97ccc8" transparent opacity={.65}/></mesh>
  <group position={[-2.8,2.1,2.6]} rotation={[Math.PI/3,0,.12]}>
   <mesh castShadow><boxGeometry args={[1.15,1.28,.5]}/><meshStandardMaterial color="#ecebdc" roughness={.5}/></mesh>
   <mesh position={[0,.20,.26]}><boxGeometry args={[.85,.48,.025]}/><meshBasicMaterial color="#2b666c"/></mesh>
   {[0,1,2].map(i=><mesh key={i} position={[-.27+i*.27,-.35,.27]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,.035,16]}/><meshStandardMaterial color={i===2?'#64b9aa':'#90b4bb'}/></mesh>)}
   <mesh position={[.40,.49,.28]}><sphereGeometry args={[.043,12,10]}/><meshBasicMaterial color={Math.sin(t*4)>0?'#a8edbd':'#4d957a'}/></mesh>
  </group>
  <Tube curve={iv} radius={.025} color="#8db9bb"/>
  {Array.from({length:7},(_,i)=>{const p=iv.getPointAt((t*.15+i/7)%1);return <mesh key={i} position={p}><sphereGeometry args={[.044,12,10]}/><meshBasicMaterial color="#d0fff1"/></mesh>;})}
 </group>;
};
