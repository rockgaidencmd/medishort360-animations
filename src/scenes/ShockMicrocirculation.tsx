import React from 'react';
import type {SceneProps} from './types';

const PATHS = [
  'M110 875 C300 820 360 670 525 680 S790 900 970 820',
  'M110 875 C300 900 380 1080 540 1030 S800 850 970 990',
  'M110 875 C330 850 400 850 550 850 S800 840 970 875',
];
const COLORS = ['#d8778d', '#bf7390', '#da8c86'];

/** Corte ilustrativo de microcirculación en shock: el flujo persiste pero es heterogéneo. */
export const ShockMicrocirculation: React.FC<SceneProps> = ({t: rawT, props}) => {
  const t = Math.max(0, rawT);
  const title = typeof props.title === 'string' ? props.title : 'SHOCK · MICROCIRCULACIÓN';
  const caption = typeof props.caption === 'string' ? props.caption : 'La alteración circulatoria también puede afectar la perfusión.';
  const note = typeof props.note === 'string' ? props.note : 'Esquema ilustrativo · el flujo no desaparece por completo';

  return (
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id="shockBg">
          <stop stopColor="#8d596f" />
          <stop offset=".52" stopColor="#59475f" />
          <stop offset="1" stopColor="#263f4f" />
        </radialGradient>
        <linearGradient id="shockVessel" x2="0" y2="1">
          <stop stopColor="#f0b79e" />
          <stop offset=".4" stopColor="#c76f84" />
          <stop offset=".58" stopColor="#732c50" />
          <stop offset="1" stopColor="#a95470" />
        </linearGradient>
        <radialGradient id="shockCell">
          <stop stopColor="#e6aa91" />
          <stop offset="1" stopColor="#a65d76" />
        </radialGradient>
        <filter id="shockGlow">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="shockShadow">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#142c3a" floodOpacity=".55" />
        </filter>
        <clipPath id="shockCrop">
          <rect x="50" y="590" width="980" height="720" rx="150" />
        </clipPath>
      </defs>
      <rect width="1080" height="1920" fill="url(#shockBg)" />
      <g opacity=".14" fill="none" stroke="#e6bdab">
        {Array.from({length: 12}, (_, i) => (
          <path key={i} d={`M${-180 + i * 120} 560 Q${70 + i * 55} 1030 ${-80 + i * 118} 1400`} strokeWidth="3" />
        ))}
      </g>
      <g clipPath="url(#shockCrop)" filter="url(#shockShadow)">
        <rect x="50" y="590" width="980" height="720" fill="#543d59" />
        {Array.from({length: 10}, (_, i) => (
          <g key={i} transform={`translate(${135 + (i % 5) * 205},${680 + Math.floor(i / 5) * 280 + Math.sin(t * 0.6 + i) * 7})`}>
            <ellipse rx="99" ry="84" fill="url(#shockCell)" stroke="#efb49f" strokeWidth="5" opacity=".9" />
            <ellipse rx="30" ry="26" fill="#80506b" opacity=".8" />
            <path d="M-65-34 Q-18-66 31-48" fill="none" stroke="#ffd6b6" strokeWidth="7" opacity=".25" />
          </g>
        ))}
        {PATHS.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke={COLORS[i]} strokeWidth="70" strokeLinecap="round" opacity=".28" filter="url(#shockGlow)" />
            <path d={d} fill="none" stroke="url(#shockVessel)" strokeWidth="54" strokeLinecap="round" />
            <path d={d} fill="none" stroke="#642b4c" strokeWidth="27" strokeLinecap="round" />
            {Array.from({length: 5}, (_, k) => {
              const p = (t * [0.16, 0.095, 0.13][i] + k / 5) % 1;
              const q = 1 - p;
              const cx = i === 2 ? 330 : 300;
              const cy = i === 0 ? 820 : i === 1 ? 900 : 850;
              const endY = i === 0 ? 820 : i === 1 ? 990 : 875;
              const x = q * q * 110 + 2 * q * p * cx + p * p * 970;
              const y = q * q * 875 + 2 * q * p * cy + p * p * endY;
              const flow = i === 1 ? 0.46 : 1;
              return (
                <g key={k} transform={`translate(${x} ${y}) rotate(${Math.sin(t + k + i) * 12})`} opacity={flow}>
                  <ellipse rx="22" ry="14" fill="#b73e5b" stroke="#ffc2a6" strokeWidth="3" />
                  <ellipse rx="9" ry="5" fill="#742b49" opacity=".75" />
                </g>
              );
            })}
          </g>
        ))}
        {Array.from({length: 14}, (_, i) => {
          const p = (t * 0.11 + i / 14) % 1;
          const x = 145 + (i % 7) * 132 + (p - 0.5) * 22;
          const y = 1060 + Math.floor(i / 7) * 110 + Math.sin(t + i) * 6;
          return <circle key={i} cx={x} cy={y} r={5 + Math.sin(t * 2 + i) * 1.5} fill="#a8e7d7" opacity={0.28 + Math.sin(t + i) * 0.12} />;
        })}
      </g>
      <rect x="50" y="590" width="980" height="720" rx="150" fill="none" stroke="#e8c9ba" strokeWidth="5" opacity=".7" />
      <text x="90" y="500" fill="#f7d8bd" fontSize="34" fontWeight="700" letterSpacing="3">{title}</text>
      <text x="90" y="1400" fill="#ecf0e4" fontSize="29">{caption}</text>
      <text x="90" y="1450" fill="#bce4dc" fontSize="24">{note}</text>
      <path d={`M90 1530 H${90 + Math.min(t, 5.8) * 130}`} stroke="#e6aa91" strokeWidth="7" strokeLinecap="round" opacity=".8" />
    </svg>
  );
};
