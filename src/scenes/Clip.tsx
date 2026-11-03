import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';
import type {SceneProps} from './types';

/**
 * Reproduce un MP4 prerenderizado de public/. Si pasas props.clipDurationSec (duración real del clip),
 * se ajusta playbackRate para que llene exactamente la escena y no quede congelado ni se corte.
 * scripts/validate.ts sugiere el valor cuando hay desajuste.
 */
export const Clip: React.FC<SceneProps> = ({durationSec, props}) => {
  const src = String(props.src);
  const clipDur = typeof props.clipDurationSec === 'number' ? props.clipDurationSec : undefined;
  const rate = clipDur ? Math.min(2, Math.max(0.5, clipDur / durationSec)) : 1;
  return (
    <OffthreadVideo
      src={staticFile(src)}
      muted
      playbackRate={rate}
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
  );
};
