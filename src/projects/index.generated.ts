// AUTO-GENERADO por scripts/sync-projects.ts — no editar a mano.
import {parseProjectSafe} from '../pipeline/load';
import type {Project} from '../pipeline/schema';
import m0 from '../../projects/cicatrizacion-herida/manifest.json';
import s0 from '../../projects/cicatrizacion-herida/scenes.json';
import t0 from '../../projects/cicatrizacion-herida/transcript.json';
import f0 from '../../projects/cicatrizacion-herida/facts.json';
import m1 from '../../projects/vasopresores/manifest.json';
import s1 from '../../projects/vasopresores/scenes.json';
import t1 from '../../projects/vasopresores/transcript.json';
import f1 from '../../projects/vasopresores/facts.json';

export const projects: Project[] = [
  parseProjectSafe('cicatrizacion-herida', {manifest: m0, scenes: s0, transcript: t0, facts: f0}),
  parseProjectSafe('vasopresores', {manifest: m1, scenes: s1, transcript: t1, facts: f1}),
].filter((p): p is Project => p !== null);
