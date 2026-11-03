import type {Asset, Project} from './schema';

export type Issue = {level: 'error' | 'warn'; where: string; message: string};

const GAP_TOLERANCE = 0.04;
const END_TOLERANCE = 0.1;

/** Validación pura (sin acceso a disco). Los chequeos de archivos están en scripts/validate.ts. */
export const validateProject = (project: Project, assets: Asset[], opts: {final: boolean}): Issue[] => {
  const issues: Issue[] = [];
  const add = (level: Issue['level'], where: string, message: string) => issues.push({level, where, message});
  const {scenes, transcript, manifest, facts} = project;
  const factIds = new Set(facts.map((f) => f.id));
  const assetById = new Map(assets.map((a) => [a.id, a]));
  const seen = new Set<string>();
  const usedFacts = new Set<string>();
  let anatomySeconds = 0;

  scenes.forEach((s, i) => {
    const w = `escena ${s.id}`;
    if (seen.has(s.id)) add('error', w, 'id repetido');
    seen.add(s.id);
    if (s.to <= s.from) add('error', w, '"to" debe ser mayor que "from"');

    if (i === 0 && Math.abs(s.from) > 0.01) add('error', w, 'la primera escena debe empezar en 0');
    if (i > 0) {
      const gap = s.from - scenes[i - 1].to;
      if (gap > GAP_TOLERANCE) add('error', w, `hueco de ${gap.toFixed(2)} s respecto a la escena anterior`);
      if (gap < -GAP_TOLERANCE) add('error', w, `se solapa ${(-gap).toFixed(2)} s con la anterior (los fundidos ya se manejan con transitionIn)`);
    }

    if (s.kind === 'anatomy') {
      anatomySeconds += s.to - s.from;
      if (s.structures.length === 0) add('error', w, 'escena anatómica sin "structures" declaradas');
    }
    if (s.component === 'Clip' && typeof s.props.src !== 'string') add('error', w, 'Clip requiere props.src (ruta dentro de public/)');
    if (s.transitionIn / manifest.fps > s.to - s.from) add('error', w, 'transitionIn dura más que la escena');

    s.factIds.forEach((id) => {
      usedFacts.add(id);
      if (!factIds.has(id)) add('error', w, `factId "${id}" no existe en facts.json`);
    });
    s.assetIds.forEach((id) => {
      const a = assetById.get(id);
      if (!a) {
        add('error', w, `assetId "${id}" no existe en public/models/assets.json`);
        return;
      }
      if (manifest.commercial && !a.commercialUse) add('error', w, `recurso "${id}" no permite uso comercial`);
      if (!a.approvedBy) add(opts.final ? 'error' : 'warn', w, `recurso "${id}" sin aprobar (approvedBy)`);
    });
  });

  const last = scenes[scenes.length - 1];
  if (Math.abs(last.to - transcript.durationSec) > END_TOLERANCE) {
    add('error', 'timeline', `la última escena termina en ${last.to}s pero el audio dura ${transcript.durationSec}s`);
  }
  if (anatomySeconds / transcript.durationSec < 0.4) {
    add('warn', 'timeline', 'menos del 40 % del video son escenas anatómicas; rótulos, zoom y fundidos no cuentan como escena anatómica');
  }

  facts.forEach((f) => {
    if (!usedFacts.has(f.id)) add('warn', `dato ${f.id}`, 'ninguna escena lo referencia');
    if (!f.source || !f.reviewedBy) add(opts.final ? 'error' : 'warn', `dato ${f.id}`, 'falta fuente o revisión (source / reviewedBy)');
  });

  transcript.segments.forEach((seg, i) => {
    if (seg.end <= seg.start) add('error', `transcript #${i}`, 'segmento con end <= start');
    if (i > 0 && seg.start < transcript.segments[i - 1].start) add('error', `transcript #${i}`, 'segmentos desordenados');
    const low = seg.words?.filter((w) => (w.confidence ?? 1) < 0.5).length ?? 0;
    if (low > 0) add('warn', `transcript #${i}`, `${low} palabra(s) con confianza < 0.5: revisar alineación`);
  });
  if (transcript.source === 'manual-cues') {
    add('warn', 'transcript', 'tiempos migrados a mano (sin palabras); ejecuta scripts/transcribe.py para subtítulos palabra por palabra');
  }
  return issues;
};
