import React, {useMemo,useLayoutEffect} from 'react';
import {useLoader,useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {staticFile} from 'remotion';

/** Surface visualization model, not a patient-specific anatomical dataset. */
export const PerfusedHand3D: React.FC<{time:number; distalTone:number; mottling:number; onReady:()=>void}> = ({time,distalTone,mottling,onReady}) => {
  const gltf=useLoader(GLTFLoader,staticFile('models/hand-right-webxr.glb'));
  const hand=useMemo(()=>clone(gltf.scene),[gltf.scene]);
  const {gl,scene,camera}=useThree();
  useLayoutEffect(()=>{scene.updateMatrixWorld(true);gl.render(scene,camera);onReady();},[hand,onReady,gl,scene,camera,time]);
  const forearm=useMemo(()=> {
    let source:THREE.BufferGeometry|undefined;
    hand.traverse(o=>{if((o as THREE.Mesh).isMesh)source=(o as THREE.Mesh).geometry;});
    if(!source)throw new Error('Hand mesh is missing');
    const pos=source.getAttribute('position');const points:THREE.Vector3[]=[];const seen=new Set<string>();
    for(let i=0;i<pos.count;i++)if(pos.getY(i)>.065){const p=new THREE.Vector3().fromBufferAttribute(pos,i);const k=`${p.x.toFixed(6)},${p.z.toFixed(6)}`;if(!seen.has(k)){seen.add(k);points.push(p);}}
    points.sort((a,b)=>a.x-b.x||a.z-b.z);
    const cross=(a:THREE.Vector3,b:THREE.Vector3,c:THREE.Vector3)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
    const lower:THREE.Vector3[]=[],upper:THREE.Vector3[]=[];
    for(const p of points){while(lower.length>=2&&cross(lower.at(-2)!,lower.at(-1)!,p)<=0)lower.pop();lower.push(p);}
    for(const p of [...points].reverse()){while(upper.length>=2&&cross(upper.at(-2)!,upper.at(-1)!,p)<=0)upper.pop();upper.push(p);}
    const ring=[...lower.slice(0,-1),...upper.slice(0,-1)];const center=ring.reduce((a,p)=>a.add(p),new THREE.Vector3()).divideScalar(ring.length);
    const vertices:number[]=[],indices:number[]=[];const count=ring.length;
    for(let k=0;k<=8;k++){const t=k/8;for(const p of ring)vertices.push(center.x+(p.x-center.x)*(1+t*.28),p.y+t*.16,center.z+(p.z-center.z)*(1+t*.28));}
    for(let k=0;k<8;k++)for(let i=0;i<count;i++){const a=k*count+i,b=k*count+(i+1)%count,c=(k+1)*count+(i+1)%count,d=(k+1)*count+i;indices.push(a,c,b,a,d,c);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();return g;
  },[hand]);
  const uniforms=useMemo(()=>({uDistal:{value:0},uMottling:{value:0}}),[]);
  const material=useMemo(()=> {
    const m=new THREE.MeshStandardMaterial({color:'#d7a181',roughness:.64,metalness:0});
    m.onBeforeCompile=(shader)=> {
      Object.assign(shader.uniforms,uniforms);
      shader.vertexShader='varying vec3 vHandPoint;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvHandPoint = position;');
      shader.fragmentShader='varying vec3 vHandPoint;\nuniform float uDistal;\nuniform float uMottling;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        float tips=distance(vHandPoint,vec3(.027,-.114,-.010));
        tips=min(tips,distance(vHandPoint,vec3(.030,-.122,.016)));
        tips=min(tips,distance(vHandPoint,vec3(.024,-.108,.045)));
        tips=min(tips,distance(vHandPoint,vec3(.017,-.082,.061)));
        tips=min(tips,distance(vHandPoint,vec3(-.010,-.036,-.069)));
        float distal=1.0-smoothstep(.018,.069,tips);
        vec3 p=vHandPoint*400.0;
        float field=sin(p.y+1.9*sin(p.z*.72)+.7*sin(p.x*1.3))+.65*sin(p.z*1.45+sin(p.y*.83))+.35*sin((p.y+p.z)*2.15);
        float branches=1.0-smoothstep(.10,.34,abs(field));
        float skinRelief=.99+.01*sin(p.y*1.2+sin(p.z*.9))*sin(p.z*1.5+sin(p.y*.7));
        diffuseColor.rgb*=skinRelief;
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.245,.17,.38),distal*uDistal*.76);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.32,.20,.38),branches*uMottling*.24);
      `);
    };
    m.customProgramCacheKey=()=> 'medishort360-hand-perfusion-1';
    return m;
  },[uniforms]);
  uniforms.uDistal.value=distalTone;uniforms.uMottling.value=mottling;
  hand.traverse(o=> {
    if((o as THREE.Mesh).isMesh){const mesh=o as THREE.Mesh;mesh.material=material;mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=false;}
    if((o as THREE.Bone).isBone && o.name.includes('phalanx-proximal')) {
      if(!o.userData.restQuaternion)o.userData.restQuaternion=o.quaternion.clone();
      o.quaternion.copy(o.userData.restQuaternion as THREE.Quaternion);
      o.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.sin(time*.85)*.012));
    }
  });
  // Reorient the bind geometry: fingers up, dorsal surface towards the camera.
  return <group quaternion={[Math.SQRT1_2,0,Math.SQRT1_2,0]} scale={24}>
    <primitive object={hand}/>
    {/* Forearm continues into the linen; fingertips and nails remain individual objects. */}
    <mesh geometry={forearm} material={material} castShadow/>
    {[[.0343,-.105,-.011],[.0371,-.114,.016],[.0323,-.100,.044],[.0253,-.076,.060],[.0048,-.032,-.065]].map((p,i)=><mesh key={i} position={p as [number,number,number]} scale={[.0004,i===4?.0055:.006,.0042]}>
      <sphereGeometry args={[1,24,16]}/><meshStandardMaterial color={new THREE.Color('#eac5b0').lerp(new THREE.Color('#8a6f98'),distalTone*.6)} roughness={.4}/>
    </mesh>)}
  </group>;
};
