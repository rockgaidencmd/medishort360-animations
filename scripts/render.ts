import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const argv = process.argv.slice(2);
const project = argv.find((a) => !a.startsWith('--'));
const rest = argv.filter((a) => a.startsWith('--'));
if (!project) {
  console.error('Uso: npx tsx scripts/render.ts <proyecto> [--final]   (sin --final = borrador a media resolución)');
  process.exit(1);
}
const final = rest.includes('--final');
const entry = process.env.REMOTION_ENTRY ?? 'src/index.ts';

const run = (cmd: string, args: string[]) => {
  console.log(`\n$ ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, {stdio: 'inherit', shell: process.platform === 'win32'});
  if (r.status !== 0) process.exit(r.status ?? 1);
};

mkdirSync('output', {recursive: true});
run('npx', ['tsx', 'scripts/sync-projects.ts']);
run('npx', ['tsx', 'scripts/validate.ts', project, ...(final ? ['--final'] : [])]);

const out = `output/${project}${final ? '' : '-draft'}.mp4`;
const flags = final
  ? ['--crf=18', '--pixel-format=yuv420p', '--audio-codec=aac']
  : ['--scale=0.5', '--crf=30', '--pixel-format=yuv420p', '--audio-codec=aac'];
// Render 3D por software: ajusta con GL=swangle / GL=angle-egl según tu servidor; GL="" para omitir.
const gl = process.env.GL ?? 'angle';
if (gl) flags.push(`--gl=${gl}`);

run('npx', ['remotion', 'render', entry, project, out, '--codec=h264', ...flags]);
run('npx', ['tsx', 'scripts/qa.ts', project, out, ...(final ? [] : ['--draft'])]);
