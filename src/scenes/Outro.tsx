import React from 'react';
import {interpolate} from 'remotion';
import {clamp} from '../motion/util';
import type {SceneProps} from './types';

export const Outro: React.FC<SceneProps> = ({t: rawT, props}) => {
  const t = Math.max(0, rawT);
  const brand = typeof props.brand === 'string' ? props.brand : 'MEDISHORT360';
  const tagline = typeof props.tagline === 'string' ? props.tagline : 'CIENCIA QUE SE VE · CUIDADOS QUE TRANSFORMAN';
  const curve = 'M220 1050 C360 980 380 730 540 790 S730 1030 860 680';

  return (
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id="outroBg">
          <stop stopColor="#416b72" />
          <stop offset="1" stopColor="#193845" />
        </radialGradient>
        <linearGradient id="outroLine">
          <stop stopColor="#5fe1c1" />
          <stop offset="1" stopColor="#efb47d" />
        </linearGradient>
        <filter id="outroGlow">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <rect width="1080" height="1920" fill="url(#outroBg)" />
      {Array.from({length: 9}, (_, i) => (
        <circle
          key={i}
          cx={540 + Math.cos((i * Math.PI * 2) / 9 + t * 0.16) * 330}
          cy={850 + Math.sin((i * Math.PI * 2) / 9 + t * 0.16) * 330}
          r={18 + Math.sin(t + i) * 4}
          fill={i % 2 ? '#77d8cb' : '#efb47d'}
          opacity=".35"
        />
      ))}
      <circle cx="540" cy="850" r="270" fill="none" stroke="#b9e5d8" strokeOpacity=".18" strokeWidth="3" />
      <circle cx="540" cy="850" r="225" fill="none" stroke="#b9e5d8" strokeOpacity=".28" strokeWidth="2" strokeDasharray="12 18" transform={`rotate(${t * 24} 540 850)`} />
      <path d={curve} fill="none" stroke="#62dbc2" strokeWidth="18" opacity=".24" filter="url(#outroGlow)" />
      <path d={curve} fill="none" stroke="url(#outroLine)" strokeWidth="7" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => {
        const p = (t * 0.17 + i / 5) % 1;
        const q = 1 - p;
        const x = q * q * 220 + 2 * q * p * 360 + p * p * 540;
        const y = q * q * 1050 + 2 * q * p * 980 + p * p * 790;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse rx="20" ry="12" fill="#c74862" stroke="#ffc4a5" strokeWidth="3" />
            <ellipse rx="8" ry="5" fill="#792d4d" />
          </g>
        );
      })}
      <text x="540" y="1250" textAnchor="middle" fill="#f5e8d1" fontSize="69" fontWeight="700" letterSpacing="7" opacity={interpolate(t, [0.2, 0.8], [0, 1], clamp)}>
        {brand}
      </text>
      <text x="540" y="1320" textAnchor="middle" fill="#bfe8dc" fontSize="28" letterSpacing="4">{tagline}</text>
      <path d={`M${540 - Math.min(t, 1.3) * 170} 1380 H${540 + Math.min(t, 1.3) * 170}`} stroke="#e9b887" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};
