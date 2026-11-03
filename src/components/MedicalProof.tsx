import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const cl = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const RBC: React.FC<{x: number; y: number; scale: number}> = ({x, y, scale}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse rx="43" ry="29" fill="#a93047" stroke="#ffb29e" strokeWidth="5" />
    <ellipse rx="22" ry="12" fill="#711f39" />
    <ellipse cx="-5" cy="-7" rx="24" ry="8" fill="#f08079" opacity=".8" />
    <path d="M-30-7 Q-8-28 22-14" fill="none" stroke="#ffd6c5" strokeWidth="4" strokeLinecap="round" />
  </g>
);

export const MedicalProof: React.FC<{audio?: boolean}> = ({audio = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const patientOpacity = interpolate(t, [0, .3, 2.9, 3.65, 4.2], [1, 1, 1, .35, 0], cl);
  const handOpacity = interpolate(t, [.12, .6, 2.95, 3.45, 3.8], [0, 1, 1, .75, 0], cl);
  const handScale = interpolate(t, [0, 2.7, 3.55], [1, 1.12, 1.85], cl);
  const handX = interpolate(t, [0, 2.7, 3.55], [0, -35, -320], cl);
  const handY = interpolate(t, [0, 2.7, 3.55], [900, 855, 425], cl);
  const distalTone = interpolate(t, [.35, 1.15, 2.4], [0, .25, .65], cl);
  const skinOpacity = interpolate(t, [3.18, 3.7, 4.62, 5.12], [0, 1, 1, 0], cl);
  const vesselOpacity = interpolate(t, [4.6, 5.25, 9], [0, 1, 1], cl);
  const constrict = interpolate(t, [6.85, 7.8, 9], [0, 1, 1], cl);
  const speed = interpolate(t, [0, 7.0, 8.1, 9], [8, 8, 5.5, 5.5], cl);

  const label = t < 2.8
    ? {text: 'NOREPINEFRINA', color: '#a8ece5', opacity: interpolate(t, [.84, 1.1, 2.25, 2.65], [0, 1, 1, 0], cl)}
    : t < 5.45
      ? {text: 'VASOCONSTRICCIÓN', color: '#ffdc9a', opacity: interpolate(t, [2.6, 2.92, 4.95, 5.25], [0, 1, 1, 0], cl)}
      : {text: 'ARTERIOLAS', color: '#a8ece5', opacity: interpolate(t, [6.52, 6.85, 8.72, 9], [0, 1, 1, 0], cl)};

  const cellXs = Array.from({length: 6}, (_, i) => ((frame * speed + i * 335) % 2200) - 140);
  const midPinch = constrict;
  const top = 265 + midPinch * 165;
  const bottom = 575 - midPinch * 78;
  const centerTop = 265 + midPinch * 165;
  const centerBottom = 575 - midPinch * 78;

  return (
    <AbsoluteFill style={{background: '#102f3b', overflow: 'hidden', fontFamily: 'Arial, sans-serif'}}>
      {/* ICU plate: contextual monitor, IV line and pump remain visible as the camera finds the hand. */}
      <AbsoluteFill style={{opacity: patientOpacity}}>
        <Img src={staticFile('backgrounds/icu-room.webp')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(t, [0, 3.2], [1, 1.08], cl)})`}} />
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,28,39,.12), rgba(8,27,38,.05) 42%, rgba(9,27,39,.28))'}} />
        <div style={{position: 'absolute', left: 50, top: 160, padding: '12px 18px', color: '#e9f4f2', fontSize: 19, letterSpacing: 1.5, fontWeight: 700, border: '1px solid #b6d5d180', borderRadius: 15, background: '#102b39b0'}}>MONITOR UCI · INFUSIÓN IV</div>
      </AbsoluteFill>

      {/* The hand is a detailed original cutout. Slow scale and drift create the anatomical push-in. */}
      <div style={{position: 'absolute', left: handX, top: handY, width: 1080, height: 540, opacity: handOpacity, transform: `scale(${handScale})`, transformOrigin: '55% 54%', filter: 'drop-shadow(0 20px 30px rgba(8,23,34,.48))'}}>
        <Img src={staticFile('anatomy/hand.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain'}} />
        {/* A soft distal blue-violet wash, masked to the hand silhouette, becomes more visible with the narration. */}
        <div style={{position: 'absolute', inset: 0, opacity: distalTone, background: 'linear-gradient(90deg, transparent 38%, rgba(75,83,157,.68) 76%, rgba(74,78,151,.88))', maskImage: `url(${staticFile('anatomy/hand.webp')})`, WebkitMaskImage: `url(${staticFile('anatomy/hand.webp')})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%', mixBlendMode: 'multiply'}} />
      </div>

      {/* Skin cutaway bridges the real hand to the vessel view during the camera dive. */}
      <AbsoluteFill style={{opacity: skinOpacity, background: '#45253b'}}>
        <Img src={staticFile('anatomy/skin-microcirculation.webp')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(t, [3.15, 4.9], [1.04, 1.17], cl)})`}} />
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(52,28,47,.04), rgba(39,20,43,.08) 55%, rgba(26,24,43,.36))'}} />
      </AbsoluteFill>

      {/* Layered vessel states crossfade: thick wall and a still-patent lumen remain clear. */}
      <AbsoluteFill style={{opacity: vesselOpacity, background: 'radial-gradient(ellipse at 50% 48%, #5a2844 0%, #241e37 65%, #122d3c 100%)'}}>
        <div style={{position: 'absolute', left: 0, top: 620, width: 1080, height: 461, filter: 'drop-shadow(0 28px 36px rgba(10,8,24,.48))'}}>
          <Img src={staticFile('anatomy/arteriole-normal.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', opacity: 1 - constrict}} />
          <Img src={staticFile('anatomy/arteriole-constricted.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', opacity: constrict}} />
          <svg width="1080" height="461" viewBox="0 0 1920 819" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
            <defs>
              <clipPath id="flow-lumen"><path d={`M 130 ${top} C 420 ${top - 10} 645 ${centerTop} 960 ${centerTop} C 1270 ${centerTop} 1510 ${top - 10} 1790 ${top} L 1790 ${bottom} C 1510 ${bottom + 10} 1270 ${centerBottom} 960 ${centerBottom} C 645 ${centerBottom} 420 ${bottom + 10} 130 ${bottom} Z`} /></clipPath>
            </defs>
            <g clipPath="url(#flow-lumen)">
              {cellXs.map((x, i) => <RBC key={i} x={x} y={410 + Math.sin(frame * .045 + i * 1.8) * (42 - 10 * constrict)} scale={.72 + (i % 2) * .12} />)}
              <path d="M 80 420 H 1840" fill="none" stroke="#ffb6a0" strokeWidth="8" strokeDasharray="22 38" opacity=".24" />
            </g>
          </svg>
        </div>
      </AbsoluteFill>

      <div style={{position: 'absolute', left: 48, top: 46, padding: '11px 18px', borderRadius: 20, background: 'rgba(10,34,47,.70)', border: '1px solid rgba(180,222,221,.42)', color: '#ecf6f3', fontWeight: 800, fontSize: 21, letterSpacing: 2}}>MEDISHORT360 · UCI</div>
      <div style={{position: 'absolute', top: 132, left: 44, right: 44, textAlign: 'center', opacity: label.opacity, color: label.color, fontWeight: 800, fontSize: 34, letterSpacing: 3, textShadow: '0 3px 18px #061a24'}}>{label.text}</div>
      <div style={{position: 'absolute', right: 48, bottom: 52, color: '#f1f5f2', fontSize: 21, fontWeight: 700, letterSpacing: 3, opacity: .72}}>MEDISHORT360</div>
      {audio && <Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={Math.round(8.34 * fps)} volume={0.98} />}
    </AbsoluteFill>
  );
};
