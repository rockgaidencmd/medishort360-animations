import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {syncProjects} from './lib/sync';

const [id, ...titleParts] = process.argv.slice(2);
if (!id || !/^[a-z0-9-]+$/.test(id)) {
  console.error('Uso: npx tsx scripts/new-project.ts <id-en-minusculas> "<Título>"');
  process.exit(1);
}
const root = process.cwd();
const dir = join(root, 'projects', id);
if (existsSync(dir)) {
  console.error(`Ya existe projects/${id}`);
  process.exit(1);
}
mkdirSync(dir, {recursive: true});
const title = titleParts.join(' ') || id;
writeFileSync(
  join(dir, 'manifest.json'),
  JSON.stringify({id, title, audio: `audio/${id}-original.mp3`, fps: 30, width: 1080, height: 1920, brand: 'MEDISHORT360', commercial: true}, null, 2) + '\n',
);
writeFileSync(join(dir, 'facts.json'), JSON.stringify({facts: []}, null, 2) + '\n');

console.log(`Creado projects/${id}/ (manifest.json, facts.json).
Siguientes pasos:
  1. Copia el audio original a public/audio/${id}-original.mp3
  2. python3 scripts/transcribe.py ${id}        -> projects/${id}/transcript.json
  3. Pídele a la IA que cree projects/${id}/scenes.json y facts.json (ver AGENTS.md)
  4. npx tsx scripts/sync-projects.ts            -> registra el proyecto en Remotion
  5. npm run render:draft -- ${id}`);
syncProjects(root);
