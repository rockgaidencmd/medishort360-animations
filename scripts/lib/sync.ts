import {existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const FILES = ['manifest', 'scenes', 'transcript', 'facts'] as const;
const PREFIX = {manifest: 'm', scenes: 's', transcript: 't', facts: 'f'} as const;

/** Genera src/projects/index.generated.ts con todos los proyectos que tengan sus 4 JSON. */
export const syncProjects = (root: string): string[] => {
  const dir = join(root, 'projects');
  const ids = existsSync(dir)
    ? readdirSync(dir)
        .filter((n) => FILES.every((f) => existsSync(join(dir, n, `${f}.json`))))
        .sort()
    : [];

  const imports = ids.flatMap((id, i) => FILES.map((f) => `import ${PREFIX[f]}${i} from '../../projects/${id}/${f}.json';`));
  const entries = ids.map(
    (id, i) => `  parseProjectSafe('${id}', {manifest: m${i}, scenes: s${i}, transcript: t${i}, facts: f${i}}),`,
  );

  const body = `// AUTO-GENERADO por scripts/sync-projects.ts — no editar a mano.
import {parseProjectSafe} from '../pipeline/load';
import type {Project} from '../pipeline/schema';
${imports.join('\n')}

export const projects: Project[] = [
${entries.join('\n')}
].filter((p): p is Project => p !== null);
`;
  mkdirSync(join(root, 'src', 'projects'), {recursive: true});
  writeFileSync(join(root, 'src', 'projects', 'index.generated.ts'), body);
  return ids;
};
