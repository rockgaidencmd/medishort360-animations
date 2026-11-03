import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {CameraMove} from '../pipeline/schema';
import {clamp} from './util';

/**
 * Cámara 2D determinista (depende solo del fotograma). Debe usarse DENTRO de un <Sequence>:
 * el fotograma es local a la escena. Para escenas 3D en vivo usa camera: "static" y mueve la cámara de Three.js.
 */
export const Camera: React.FC<{
  type: CameraMove;
  intensity: number;
  lengthFrames: number;
  children: React.ReactNode;
}> = ({type, intensity, lengthFrames, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = interpolate(frame, [0, Math.max(1, lengthFrames - 1)], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  const sec = frame / fps;
  let scale = 1;
  let x = 0;
  let y = 0;
  let rot = 0;

  switch (type) {
    case 'push-in':
      scale = 1 + 0.12 * intensity * e;
      break;
    case 'pull-out':
      scale = 1 + 0.12 * intensity * (1 - e);
      break;
    case 'pan-left':
      scale = 1.08;
      x = interpolate(e, [0, 1], [2.5 * intensity, -2.5 * intensity]);
      break;
    case 'pan-right':
      scale = 1.08;
      x = interpolate(e, [0, 1], [-2.5 * intensity, 2.5 * intensity]);
      break;
    case 'drift':
      scale = 1.05;
      x = Math.sin(sec * 0.5) * 1.2 * intensity;
      y = Math.cos(sec * 0.4) * 1.0 * intensity;
      rot = Math.sin(sec * 0.3) * 0.6 * intensity;
      break;
    case 'static':
    default:
      break;
  }

  return (
    <AbsoluteFill style={{transform: `translate(${x}%, ${y}%) scale(${scale}) rotate(${rot}deg)`}}>
      {children}
    </AbsoluteFill>
  );
};
