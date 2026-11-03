import {syncProjects} from './lib/sync';

const ids = syncProjects(process.cwd());
console.log(`Proyectos registrados (${ids.length}): ${ids.join(', ') || '—'}`);
