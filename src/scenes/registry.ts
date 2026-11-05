import {ECVRedesign} from './ECVAudioFilm';
import {ECVFilm} from './ECVFilm';
import {ECVPreview} from './ECVPreview';
import type React from 'react';
import {Clip} from './Clip';
import {Outro} from './Outro';
import {ShockMicrocirculation} from './ShockMicrocirculation';
import {AntifungalTimeline} from './AntifungalTimeline';
import type {SceneComponentName} from './names';
import type {SceneProps} from './types';

/**
 * Cada nombre de names.ts debe estar aquí (TypeScript lo exige).
 *
 * Para pasar una prueba 3D de MP4 prerenderizado a escena en vivo:
 *   1) crea un componente (p. ej. src/scenes/Arteriole.tsx) que reciba SceneProps y lea props.constriction, etc.
 *   2) agrega 'Arteriole' a names.ts y aquí.
 *   3) en scenes.json cambia component: "Clip" -> "Arteriole" y pon los props.
 */
export const sceneRegistry: Record<SceneComponentName, React.FC<SceneProps>> = {
  ECVRedesign,
  ECVFilm,
  ECVPreview,
  Clip,
  ShockMicrocirculation,
  Outro,
  AntifungalTimeline,
};
