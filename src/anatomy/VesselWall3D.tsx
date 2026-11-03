import React, {useMemo} from 'react';
import * as THREE from 'three';

// Open longitudinal cutaway. All wall layers share the same changing radius.
export function wallGeometry(inner: number, outer: number) {
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

export const Wall: React.FC<{inner: number; outer: number; color: string}> = ({inner,outer,color}) => {
  const geometry=useMemo(()=>wallGeometry(inner,outer),[inner,outer]);
  return <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.58} side={THREE.DoubleSide}/></mesh>;
};

