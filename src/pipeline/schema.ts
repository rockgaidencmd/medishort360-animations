import {z} from 'zod';
import {SCENE_COMPONENT_NAMES} from '../scenes/names';

export const CAMERA_MOVES = ['static', 'push-in', 'pull-out', 'pan-left', 'pan-right', 'drift'] as const;
/** anatomy = estructura anatómica con movimiento propio; environment = entorno/escenario; graphic = solo motion graphics; brand = marca. */
export const SCENE_KINDS = ['anatomy', 'environment', 'graphic', 'brand'] as const;

export const ManifestSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'solo minúsculas, números y guiones'),
  title: z.string().min(1),
  /** Ruta relativa a public/, p. ej. "audio/vasopresores-original.mp3". El audio original NO se regenera. */
  audio: z.string().min(1),
  fps: z.number().int().positive().default(30),
  width: z.number().int().positive().default(1080),
  height: z.number().int().positive().default(1920),
  brand: z.string().default('MEDISHORT360'),
  /** Si es true, ningún recurso con commercialUse=false puede usarse. */
  commercial: z.boolean().default(true),
});

export const WordSchema = z.object({
  word: z.string(),
  start: z.number().min(0),
  end: z.number().min(0),
  confidence: z.number().min(0).max(1).optional(),
});

export const SegmentSchema = z.object({
  id: z.number().int().min(0),
  start: z.number().min(0),
  end: z.number().min(0),
  text: z.string(),
  confidence: z.number().min(0).max(1).optional(),
  words: z.array(WordSchema).optional(),
});

export const TranscriptSchema = z.object({
  /** whisper = generado por scripts/transcribe.py; manual-cues = migrado a mano (sin tiempos por palabra). */
  source: z.enum(['whisper', 'manual-cues']),
  language: z.string().default('es'),
  model: z.string().optional(),
  durationSec: z.number().positive(),
  segments: z.array(SegmentSchema).min(1),
});

export const SceneSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  from: z.number().min(0),
  to: z.number().positive(),
  kind: z.enum(SCENE_KINDS),
  component: z.enum(SCENE_COMPONENT_NAMES),
  props: z.record(z.string(), z.unknown()).default({}),
  /** Acción visible en pantalla en esta escena (obligatorio). Un rótulo o un zoom no cuentan. */
  action: z.string().min(1),
  /** Estructuras anatómicas que aparecen (obligatorio si kind = anatomy). */
  structures: z.array(z.string()).default([]),
  camera: z.enum(CAMERA_MOVES).default('static'),
  cameraIntensity: z.number().min(0).max(1).default(0.5),
  label: z.string().optional(),
  callout: z.string().optional(),
  /** Frames de fundido de entrada (se ignora en la primera escena). */
  transitionIn: z.number().int().min(0).max(60).default(10),
  factIds: z.array(z.string()).default([]),
  assetIds: z.array(z.string()).default([]),
});

export const ScenesFileSchema = z.object({scenes: z.array(SceneSchema).min(1)});

export const FactSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  source: z.string().nullable().default(null),
  reviewedBy: z.string().nullable().default(null),
  reviewedAt: z.string().nullable().default(null),
});
export const FactsFileSchema = z.object({facts: z.array(FactSchema)});

export const AssetSchema = z.object({
  id: z.string(),
  /** Ruta desde la raíz del repo, p. ej. "public/models/mano.glb". */
  file: z.string(),
  source: z.string(),
  license: z.string().min(1),
  attribution: z.string(),
  commercialUse: z.boolean(),
  approvedBy: z.string().nullable().default(null),
});
export const AssetsFileSchema = z.object({assets: z.array(AssetSchema)});

export type Manifest = z.infer<typeof ManifestSchema>;
export type Transcript = z.infer<typeof TranscriptSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type Fact = z.infer<typeof FactSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type CameraMove = (typeof CAMERA_MOVES)[number];

export type Project = {
  manifest: Manifest;
  scenes: Scene[];
  transcript: Transcript;
  facts: Fact[];
};
