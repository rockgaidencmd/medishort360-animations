import React from 'react';

type ArterioleProps = {frame: number; constrict: number};

const RedCell: React.FC<{x: number; y: number; scale: number}> = ({x, y, scale}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {/* Biconcave disc: raised rim, depressed center and a moving specular highlight. */}
    <path d="M-42 0 C-42-17-23-30 0-30 C23-30 42-17 42 0 C42 17 23 30 0 30 C-23 30-42 17-42 0Z" fill="url(#rbc-body)" stroke="#ffb1a3" strokeWidth="3" />
    <path d="M-25 0 C-22-8-11-12 0-12 C11-12 22-8 25 0 C22 8 11 12 0 12 C-11 12-22 8-25 0Z" fill="#8d243d" opacity="0.82" />
    <ellipse cx="-1" cy="-2" rx="13" ry="5" fill="#e87878" opacity="0.8" />
    <path d="M-34-7 C-22-23 7-28 26-16" fill="none" stroke="#ffd2c4" strokeWidth="4" strokeLinecap="round" opacity="0.72" />
    <path d="M-31 9 C-18 23 10 25 27 13" fill="none" stroke="#6f2039" strokeWidth="3" opacity="0.45" />
  </g>
);

/** Layered, longitudinal cutaway of a small artery with animated smooth-muscle constriction. */
export const Arteriole: React.FC<ArterioleProps> = ({frame, constrict}) => {
  const upper = 860 + constrict * 62;
  const lower = 1060 - constrict * 62;
  const outerUpper = 694 + constrict * 24;
  const outerLower = 1226 - constrict * 24;
  const cells = Array.from({length: 6}, (_, index) => {
    const flow = 2.7 - constrict * 1.15;
    const x = ((frame * flow + index * 191 + 60) % 1160) - 40;
    const localPinch = Math.exp(-Math.pow((x - 540) / 250, 2));
    const localHalfHeight = 100 - constrict * 58 * localPinch;
    const y = 960 + Math.sin(index * 1.8 + frame * 0.035) * localHalfHeight * 0.22;
    return {x, y, scale: 0.78 + (index % 3) * 0.08};
  });

  return (
    <g>
      <defs>
        <linearGradient id="arteriole-adventitia" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#873c55" /><stop offset="0.22" stopColor="#c05b62" />
          <stop offset="0.48" stopColor="#773149" /><stop offset="0.78" stopColor="#b4515c" />
          <stop offset="1" stopColor="#54263f" />
        </linearGradient>
        <linearGradient id="arteriole-muscle" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f19881" /><stop offset="0.16" stopColor="#c55b62" />
          <stop offset="0.5" stopColor="#8e344d" /><stop offset="0.84" stopColor="#c65c62" />
          <stop offset="1" stopColor="#f0a086" />
        </linearGradient>
        <linearGradient id="arteriole-endothelium" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f2a49a" /><stop offset="0.45" stopColor="#9f4a59" />
          <stop offset="1" stopColor="#e88c7e" />
        </linearGradient>
        <linearGradient id="arteriole-lumen" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#561c37" /><stop offset="0.48" stopColor="#27172f" />
          <stop offset="1" stopColor="#551d38" />
        </linearGradient>
        <radialGradient id="arteriole-glow"><stop stopColor="#ffb09a" stopOpacity="0.34" /><stop offset="1" stopColor="#ffb09a" stopOpacity="0" /></radialGradient>
        <linearGradient id="rbc-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ffb0a0" /><stop offset="0.32" stopColor="#dc5964" />
          <stop offset="0.72" stopColor="#af304c" /><stop offset="1" stopColor="#72213e" />
        </linearGradient>
        <filter id="vessel-shadow" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <clipPath id="arteriole-lumen-clip">
          <path d={`M25 ${upper + 17} C250 ${upper - 17} 370 ${upper + 24} 540 ${upper + 32} C710 ${upper + 24} 830 ${upper - 17} 1055 ${upper + 17} L1055 ${lower - 17} C830 ${lower + 17} 710 ${lower - 24} 540 ${lower - 32} C370 ${lower - 24} 250 ${lower + 17} 25 ${lower - 17}Z`} />
        </clipPath>
      </defs>

      <ellipse cx="540" cy="960" rx="560" ry="430" fill="url(#arteriole-glow)" />
      <path d={`M25 ${outerUpper} C240 ${outerUpper - 25} 390 ${outerUpper + 36} 540 ${outerUpper + 45} C690 ${outerUpper + 36} 840 ${outerUpper - 25} 1055 ${outerUpper} L1055 ${outerLower} C840 ${outerLower + 25} 690 ${outerLower - 36} 540 ${outerLower - 45} C390 ${outerLower - 36} 240 ${outerLower + 25} 25 ${outerLower}Z`} transform="translate(0 34)" fill="#160f26" opacity="0.72" filter="url(#vessel-shadow)" />

      {/* Outer connective-tissue coat; folds deepen as the wall contracts. */}
      <path d={`M25 ${outerUpper} C240 ${outerUpper - 25} 390 ${outerUpper + 36} 540 ${outerUpper + 45} C690 ${outerUpper + 36} 840 ${outerUpper - 25} 1055 ${outerUpper} L1055 ${outerLower} C840 ${outerLower + 25} 690 ${outerLower - 36} 540 ${outerLower - 45} C390 ${outerLower - 36} 240 ${outerLower + 25} 25 ${outerLower}Z`} fill="url(#arteriole-adventitia)" stroke="#f0a18d" strokeWidth="12" />

      {/* Circular smooth-muscle bundles represented as curved fiber bands. */}
      <path d={`M35 ${outerUpper + 46} C250 ${outerUpper + 15} 390 ${outerUpper + 82} 540 ${outerUpper + 90} C690 ${outerUpper + 82} 830 ${outerUpper + 15} 1045 ${outerUpper + 46} L1045 ${outerLower - 46} C830 ${outerLower - 15} 690 ${outerLower - 82} 540 ${outerLower - 90} C390 ${outerLower - 82} 250 ${outerLower - 15} 35 ${outerLower - 46}Z`} fill="url(#arteriole-muscle)" stroke="#f8c0a3" strokeWidth="7" />
      <g fill="none" stroke="#763148" strokeWidth="7" opacity="0.62">
        <path d={`M100 ${outerUpper + 27} C270 ${outerUpper + 5} 402 ${outerUpper + 62} 540 ${outerUpper + 69} C678 ${outerUpper + 62} 810 ${outerUpper + 5} 980 ${outerUpper + 27}`} />
        <path d={`M100 ${outerLower - 27} C270 ${outerLower - 5} 402 ${outerLower - 62} 540 ${outerLower - 69} C678 ${outerLower - 62} 810 ${outerLower - 5} 980 ${outerLower - 27}`} />
      </g>

      {/* Endothelial lining frames the open lumen. */}
      <path d={`M25 ${upper} C250 ${upper - 34} 370 ${upper + 5} 540 ${upper + 12} C710 ${upper + 5} 830 ${upper - 34} 1055 ${upper} L1055 ${lower} C830 ${lower + 34} 710 ${lower - 5} 540 ${lower - 12} C370 ${lower - 5} 250 ${lower + 34} 25 ${lower}Z`} fill="url(#arteriole-endothelium)" stroke="#ffc2ad" strokeWidth="8" />
      <path d={`M25 ${upper + 18} C250 ${upper - 11} 370 ${upper + 24} 540 ${upper + 32} C710 ${upper + 24} 830 ${upper - 11} 1055 ${upper + 18} L1055 ${lower - 18} C830 ${lower + 11} 710 ${lower - 24} 540 ${lower - 32} C370 ${lower - 24} 250 ${lower + 11} 25 ${lower - 18}Z`} fill="url(#arteriole-lumen)" stroke="#732a45" strokeWidth="4" />

      <g clipPath="url(#arteriole-lumen-clip)">
        {cells.map((cell, index) => <RedCell key={index} {...cell} />)}
        {/* Flow streaks remain visible through the narrowed lumen. */}
        <path d="M45 952 C250 940 365 955 515 960 C690 965 830 944 1040 952" fill="none" stroke="#ff9c8c" strokeWidth="4" strokeDasharray="18 26" opacity="0.32" />
      </g>

      {/* Smooth-muscle contraction is localized around the arteriole, not the whole vessel. */}
      <path d={`M486 ${outerUpper + 8} Q540 ${outerUpper + 50} 594 ${outerUpper + 8}`} fill="none" stroke="#ffe0a5" strokeWidth="7" strokeLinecap="round" opacity={0.2 + constrict * 0.72} />
      <path d={`M486 ${outerLower - 8} Q540 ${outerLower - 50} 594 ${outerLower - 8}`} fill="none" stroke="#ffe0a5" strokeWidth="7" strokeLinecap="round" opacity={0.2 + constrict * 0.72} />
      <path d={`M525 ${outerUpper - 74} V${outerUpper - 22}`} stroke="#ffd477" strokeWidth="7" opacity={constrict} />
      <path d={`M555 ${outerLower + 74} V${outerLower + 22}`} stroke="#ffd477" strokeWidth="7" opacity={constrict} />
    </g>
  );
};
