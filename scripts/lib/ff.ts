import {spawnSync} from 'node:child_process';

export type Stream = {
  codec_type?: string;
  codec_name?: string;
  width?: number;
  height?: number;
  pix_fmt?: string;
  r_frame_rate?: string;
  duration?: string;
};
export type Probe = {streams: Stream[]; format: {duration?: string}};

export const hasFfmpeg = (): boolean => spawnSync('ffprobe', ['-version']).status === 0;

export const probe = (file: string): Probe | null => {
  const r = spawnSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file], {encoding: 'utf8'});
  if (r.status !== 0) return null;
  return JSON.parse(r.stdout) as Probe;
};

export const durationOf = (file: string): number | null => {
  const d = Number(probe(file)?.format?.duration);
  return Number.isFinite(d) ? d : null;
};

export const parseFraction = (s: string | undefined): number => {
  if (!s) return NaN;
  const [a, b] = s.split('/').map(Number);
  return b ? a / b : a;
};
