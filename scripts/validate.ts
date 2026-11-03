import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
import {parseProject} from '../src/pipeline/load';
import {AssetsFileSchema, type Asset} from '../src/pipeline/schema';
import {validateProject, type Issue} from '../src/pipeline/validate';
import {durationOf, hasFfmpeg} from './lib/ff';

const root = process.cwd();
const args = process.argv.slice(2);
const final = args.includes('--final');
const names = args.includes('--all')
  ? readdirSync(join(root, 'projects')).filter((n) => existsSync(join(root, 'projects', n, 'manifest.json')))
  : args.filter((a) => !a.startsWith('--'));

if (names.length === 0) {
  console.error('Uso: npx tsx scripts/validate.ts <proyecto|--all> [--final]');
  process.exit(1);
}

const readJson = (p: string): unknown => JSON.parse(readFileSync(p, 'utf8'));
const MODEL_EXT = /\.(glb|gltf|obj|fbx|stl)$/i;

const walk = (dir: string): string[] =>
  !existsSync(dir)
    ? []
    : readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        return statSync(p).isDirectory() ? walk(p) : [p];
      });

let errors = 0;
const print = (scope: string, issues: Issue[]) => {
  for (const i of issues) {
    if (i.level === 'error') errors++;
    console.log(`${i.level === 'error' ? '✖' : '⚠'} [${scope}] ${i.where}: ${i.message}`);
  }
};

// --- Recursos 3D: todo modelo en public/models debe estar registrado con licencia ---
const assetsPath = join(root, 'public', 'models', 'assets.json');
const assets: Asset[] = existsSync(assetsPath) ? AssetsFileSchema.parse(readJson(assetsPath)).assets : [];
const registered = new Set(assets.map((a) => a.file.replace(/\\/g, '/')));
const globalIssues: Issue[] = [];
for (const f of walk(join(root, 'public', 'models'))) {
  const rel = relative(root, f).replace(/\\/g, '/');
  if (MODEL_EXT.test(rel) && !registered.has(rel)) {
    globalIssues.push({level: 'error', where: rel, message: 'modelo sin registro de fuente/licencia en public/models/assets.json'});
  }
}
for (const a of assets) {
  if (!existsSync(join(root, a.file))) {
    globalIssues.push({level: 'warn', where: `asset ${a.id}`, message: `archivo no encontrado: ${a.file}`});
  }
}
print('recursos', globalIssues);

const ffOk = hasFfmpeg();
if (!ffOk) console.log('⚠ [entorno] ffprobe no disponible: se omiten chequeos de duración de audio/clips');

for (const name of names) {
  const dir = join(root, 'projects', name);
  let project;
  try {
    project = parseProject({
      manifest: readJson(join(dir, 'manifest.json')),
      scenes: readJson(join(dir, 'scenes.json')),
      transcript: readJson(join(dir, 'transcript.json')),
      facts: readJson(join(dir, 'facts.json')),
    });
  } catch (e) {
    const issues = (e as {issues?: {path: (string | number)[]; message: string}[]}).issues;
    console.log(`✖ [${name}] JSON inválido:`);
    for (const i of issues ?? [{path: [], message: String(e)}]) console.log(`    ${i.path.join('.')}: ${i.message}`);
    errors++;
    continue;
  }

  const issues = validateProject(project, assets, {final});

  // Audio original
  const audioFile = join(root, 'public', project.manifest.audio);
  if (!existsSync(audioFile)) {
    issues.push({level: 'error', where: 'audio', message: `no existe public/${project.manifest.audio}`});
  } else if (ffOk) {
    const d = durationOf(audioFile);
    if (d !== null && Math.abs(d - project.transcript.durationSec) > 0.25) {
      issues.push({level: 'error', where: 'audio', message: `el audio dura ${d.toFixed(2)} s pero transcript.durationSec = ${project.transcript.durationSec}`});
    }
  }

  // Clips prerenderizados
  for (const s of project.scenes) {
    if (s.component !== 'Clip' || typeof s.props.src !== 'string') continue;
    const f = join(root, 'public', s.props.src);
    if (!existsSync(f)) {
      issues.push({level: 'error', where: `escena ${s.id}`, message: `no existe public/${s.props.src}`});
      continue;
    }
    if (!ffOk) continue;
    const clipDur = typeof s.props.clipDurationSec === 'number' ? s.props.clipDurationSec : durationOf(f);
    const layerSec = s.to - s.from + (s.transitionIn / project.manifest.fps);
    if (clipDur !== null) {
      const rate = clipDur / layerSec;
      if (typeof s.props.clipDurationSec !== 'number' && clipDur < layerSec - 0.3) {
        issues.push({level: 'error', where: `escena ${s.id}`, message: `el clip dura ${clipDur.toFixed(2)} s y la escena ${layerSec.toFixed(2)} s: quedará congelado al final. Pon props.clipDurationSec = ${clipDur.toFixed(2)} o regenera el clip`});
      } else if (rate < 0.85 || rate > 1.15) {
        issues.push({level: 'warn', where: `escena ${s.id}`, message: `playbackRate implícito ${rate.toFixed(2)}: la velocidad se nota; mejor ajustar la duración en la escena origen`});
      }
    }
  }

  print(name, issues);
  const n = issues.filter((i) => i.level === 'error').length;
  console.log(n === 0 ? `✔ [${name}] sin errores${final ? ' (modo final)' : ''}` : `✖ [${name}] ${n} error(es)`);
}

process.exit(errors > 0 ? 1 : 0);
