// AUTO-GENERADO por scripts/sync-projects.ts — no editar a mano.
import {parseProjectSafe} from '../pipeline/load';
import type {Project} from '../pipeline/schema';
import m0 from '../../projects/vasopresores/manifest.json';
import s0 from '../../projects/vasopresores/scenes.json';
import t0 from '../../projects/vasopresores/transcript.json';
import f0 from '../../projects/vasopresores/facts.json';

export const projects: Project[] = [
  parseProjectSafe('vasopresores', {manifest: m0, scenes: s0, transcript: t0, facts: f0}),
].filter((p): p is Project => p !== null);
