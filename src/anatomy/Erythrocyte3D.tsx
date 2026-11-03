import * as THREE from 'three';

/** Biconcave profile revolved into a true 3D disc. Schematic, fixed cell size. */
export function createErythrocyteGeometry() {
  const points=Array.from({length:65},(_,i)=> {
    const a=Math.PI*(1-i/64), r=Math.sin(a);
    return new THREE.Vector2(r*.32,Math.cos(a)*.14*(.28+.72*r*r));
  });
  return new THREE.LatheGeometry(points,40);
}
