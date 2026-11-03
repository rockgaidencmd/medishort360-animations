import {FactsFileSchema, ManifestSchema, ScenesFileSchema, TranscriptSchema, type Project} from './schema';

export type RawProject = {manifest: unknown; scenes: unknown; transcript: unknown; facts: unknown};

export const parseProject = (raw: RawProject): Project => ({
  manifest: ManifestSchema.parse(raw.manifest),
  scenes: ScenesFileSchema.parse(raw.scenes).scenes,
  transcript: TranscriptSchema.parse(raw.transcript),
  facts: FactsFileSchema.parse(raw.facts).facts,
});

/** Un proyecto roto no debe tumbar el Studio de los demás: se registra el error y se omite. */
export const parseProjectSafe = (id: string, raw: RawProject): Project | null => {
  try {
    return parseProject(raw);
  } catch (error) {
    console.error(`[medishort] proyecto "${id}" inválido:`, error);
    return null;
  }
};
