import data from './data/healing-phases.json';
export type WoundDepth = 'superficial' | 'profunda';
export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const smooth = (a: number, b: number, v: number) => {const x=clamp((v-a)/(b-a)); return x*x*(3-2*x);};
export const phaseAt = (healing: number) => data.phases.find(p => clamp(healing) >= p.healingDesde && clamp(healing) < p.healingHasta) ?? data.phases[data.phases.length-1];
/** Seeded, stateless sample: stable during seeking and rendering. */
export const sample = (seed: number, index = 0) => {let n=(seed+index*374761393)|0;n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967296;};
