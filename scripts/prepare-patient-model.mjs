import fs from 'node:fs';
import crypto from 'node:crypto';
import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
globalThis.FileReader=class {readAsArrayBuffer(blob){blob.arrayBuffer().then(b=>{this.result=b;this.onloadend?.();});}};

const source=process.argv[2];
if(!source)throw new Error('Usage: node scripts/prepare-patient-model.mjs /path/to/MakeHuman/base.obj');
const raw=fs.readFileSync(source,'utf8'),vertices=[],faces=[];
let group='';
for(const line of raw.split(/\r?\n/)){
 if(line.startsWith('v '))vertices.push(line.split(/\s+/).slice(1,4).map(Number));
 else if(line.startsWith('g '))group=line.slice(2);
 else if(line.startsWith('f ')&&group==='body')faces.push(line.split(/\s+/).slice(1).map(x=>Number(x.split('/')[0])-1));
}
function geometry(predicate,origin=[0,0,0],expand=1){
 const p=[],ix=[],map=new Map();
 for(const face of faces){if(!face.every(i=>predicate(vertices[i])))continue;const ids=face.map(i=>{if(!map.has(i)){map.set(i,p.length/3);const v=vertices[i];p.push(...v.map((x,k)=>(x-origin[k])*.62*expand));}return map.get(i);});for(let k=1;k<ids.length-1;k++)ix.push(ids[0],ids[k],ids[k+1]);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(ix);g.computeVertexNormals();return g;
}
const headOrigin=[0,7.35,.4],head=new THREE.Group();head.name='MakeHumanHeadSurface';
const skin=new THREE.MeshStandardMaterial({color:'#d7a181',roughness:.67});
head.add(new THREE.Mesh(geometry(v=>v[1]>5.35&&Math.abs(v[0])<1.15,headOrigin),skin));
const hair=new THREE.Mesh(geometry(v=>v[1]>(v[2]>.6?7.86:7.50),headOrigin,1.012),new THREE.MeshStandardMaterial({color:'#332a2c',roughness:.98}));head.add(hair);
const eyeMaterial=new THREE.MeshStandardMaterial({color:'#e4ddd0',roughness:.48});
for(const x of [-.3078,.3078]){
 const center=new THREE.Vector3(x,7.2842,1.2453).sub(new THREE.Vector3(...headOrigin)).multiplyScalar(.62);
 const eye=new THREE.Mesh(new THREE.SphereGeometry(.177*.62,32,20),eyeMaterial);eye.position.copy(center);head.add(eye);
 const iris=new THREE.Mesh(new THREE.SphereGeometry(1,28,16),new THREE.MeshStandardMaterial({color:'#63513a',roughness:.5}));iris.scale.set(.058*.62,.058*.62,.014*.62);iris.position.copy(center).add(new THREE.Vector3(0,0,.172*.62));head.add(iris);
 const pupil=new THREE.Mesh(new THREE.SphereGeometry(1,20,12),new THREE.MeshStandardMaterial({color:'#161d22',roughness:.4}));pupil.scale.set(.027*.62,.027*.62,.009*.62);pupil.position.copy(center).add(new THREE.Vector3(0,0,.183*.62));head.add(pupil);
 const browPoints=Array.from({length:17},(_,i)=>new THREE.Vector3(x-.20+i*.025,7.48+Math.sin(i/16*Math.PI)*.043,1.40).sub(new THREE.Vector3(...headOrigin)).multiplyScalar(.62));
 head.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(browPoints),24,.018*.62,6,false),new THREE.MeshStandardMaterial({color:'#5e4136',roughness:.95})));
}
const feet=new THREE.Group();feet.name='MakeHumanFeetSurface';
const footGeo=geometry(v=>v[1]<-6.7);
const colors=[];const c1=new THREE.Color('#d7a181'),c2=new THREE.Color('#8272a8');
for(let i=0;i<footGeo.attributes.position.count;i++){const z=footGeo.attributes.position.getZ(i)/.62;const amount=THREE.MathUtils.smoothstep(z,.9,2.8)*.72;colors.push(...c1.clone().lerp(c2,amount).toArray());}
footGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));feet.add(new THREE.Mesh(footGeo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.65})));
fs.mkdirSync('public/models',{recursive:true});
const exporter=new GLTFExporter();
fs.writeFileSync('public/models/patient-head-surface.glb',Buffer.from(await exporter.parseAsync(head,{binary:true})));
fs.writeFileSync('public/models/patient-feet-surface.glb',Buffer.from(await exporter.parseAsync(feet,{binary:true})));
console.log(JSON.stringify({sourceSha256:crypto.createHash('sha256').update(raw).digest('hex'),headVertices:head.children[0].geometry.attributes.position.count,footVertices:footGeo.attributes.position.count}));
