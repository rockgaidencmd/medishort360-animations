import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {durationOf, parseFraction, probe} from './lib/ff';

const root = process.cwd();
const args = process.argv.slice(2);
const project = args.find((a) => !a.startsWith('--'));
const draft = args.includes('--draft');
if (!project) {
  console.error('Uso: npx tsx scripts/qa.ts <proyecto> [archivo.mp4] [--draft]');
  process.exit(1);
}
const file = args.filter((a) => !a.startsWith('--'))[1] ?? join('output', `${project}${draft ? '-draft' : ''}.mp4`);

type Check = {name: string; ok: boolean; level: 'fail' | 'warn'; detail: string};
const checks: Check[] = [];
const add = (name: string, ok: boolean, detail: string, level: 'fail' | 'warn' = 'fail') => checks.push({name, ok, level, detail});

const dir = join(root, 'projects', project);
const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8')) as {fps?: number; width?: number; height?: number; audio: string};
const transcript = JSON.parse(readFileSync(join(dir, 'transcript.json'), 'utf8')) as {durationSec: number};
const fps = manifest.fps ?? 30;
const scale = draft ? 0.5 : 1;
const wantW = Math.round((manifest.width ?? 1080) * scale);
const wantH = Math.round((manifest.height ?? 1920) * scale);

if (!existsSync(file)) {
  console.error(`✖ no existe ${file}`);
  process.exit(1);
}

const p = probe(file);
if (!p) {
  console.error('✖ ffprobe no pudo leer el archivo (¿ffmpeg instalado?)');
  process.exit(1);
}
const v = p.streams.find((s) => s.codec_type === 'video');
const a = p.streams.find((s) => s.codec_type === 'audio');

add('video presente', !!v, v ? 'ok' : 'sin pista de video');
add('audio presente', !!a, a ? 'ok' : 'sin pista de audio');
if (v) {
  add('códec H.264', v.codec_name === 'h264', `códec: ${v.codec_name}`);
  add('pixel format yuv420p (compatibilidad Android/iOS)', v.pix_fmt === 'yuv420p', `pix_fmt: ${v.pix_fmt}`);
  add('resolución', v.width === wantW && v.height === wantH, `${v.width}x${v.height} (esperado ${wantW}x${wantH})`);
  const rate = parseFraction(v.r_frame_rate);
  add('fps', Math.abs(rate - fps) < 0.01, `${rate.toFixed(2)} (esperado ${fps})`);
}
if (a) add('audio AAC', a.codec_name === 'aac', `códec: ${a.codec_name}`);

const dur = durationOf(file) ?? 0;
add('duración = audio original', Math.abs(dur - transcript.durationSec) <= 0.15, `${dur.toFixed(2)} s vs ${transcript.durationSec} s`);

const audioSrc = join(root, 'public', manifest.audio);
if (existsSync(audioSrc)) {
  const ad = durationOf(audioSrc);
  if (ad !== null) add('duración = archivo de audio', Math.abs(dur - ad) <= 0.15, `${dur.toFixed(2)} s vs ${ad.toFixed(2)} s`);
}

// Cuadros negros y tramos congelados (una sola pasada)
const r = spawnSync(
  'ffmpeg',
  ['-hide_banner', '-nostats', '-i', file, '-vf', 'blackdetect=d=0.1:pix_th=0.10,freezedetect=n=-60dB:d=1.0', '-an', '-f', 'null', '-'],
  {encoding: 'utf8'},
);
const log = r.stderr ?? '';
const blacks = [...log.matchAll(/black_start:([\d.]+)\s+black_end:([\d.]+)\s+black_duration:([\d.]+)/g)];
add('sin cuadros negros', blacks.length === 0, blacks.length === 0 ? 'ok' : blacks.map((m) => `${m[1]}–${m[2]} s`).join(', '));

const fStarts = [...log.matchAll(/freeze_start: ([\d.]+)/g)].map((m) => m[1]);
const fDurs = [...log.matchAll(/freeze_duration: ([\d.]+)/g)].map((m) => m[1]);
add(
  'sin tramos congelados > 1 s',
  fStarts.length === 0,
  fStarts.length === 0 ? 'ok' : fStarts.map((s, i) => `desde ${s} s durante ${fDurs[i] ?? '?'} s`).join('; ') + ' (revisar: ¿clip más corto que la escena?)',
  'warn',
);

let failed = 0;
for (const c of checks) {
  const mark = c.ok ? '✔' : c.level === 'fail' ? '✖' : '⚠';
  if (!c.ok && c.level === 'fail') failed++;
  console.log(`${mark} ${c.name}: ${c.detail}`);
}
mkdirSync('output', {recursive: true});
writeFileSync(join('output', `${project}${draft ? '-draft' : ''}-qa.json`), JSON.stringify({file, checkedAt: new Date().toISOString(), checks}, null, 2));
console.log(failed === 0 ? '\nQA técnico: APROBADO (falta revisión humana de anatomía y sincronía)' : `\nQA técnico: ${failed} fallo(s)`);
process.exit(failed === 0 ? 0 : 1);
