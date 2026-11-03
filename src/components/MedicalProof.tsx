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
  const respiratory = Math.sin(t * Math.PI * 1.1);
  const monitorSweep = (frame * 5.2) % 680;
  const fluidPhase = (t * 0.48) % 1;
  const cameraDrift = Math.sin(t * 0.7);
  const handPulse = Math.sin(t * Math.PI * 2.2);

  const patientOpacity = interpolate(t, [0, .3, 2.9, 3.65, 4.2], [1, 1, 1, .35, 0], cl);
  const handOpacity = interpolate(t, [.12, .6, 2.95, 3.45, 3.8], [0, 1, 1, .75, 0], cl);
  const handScale = interpolate(t, [0, 2.7, 3.55], [1, 1.12, 1.85], cl);
  const handX = interpolate(t, [0, 2.7, 3.55], [0, -35, -320], cl);
  const handY = interpolate(t, [0, 2.7, 3.55], [900, 855, 425], cl);
  const distalTone = interpolate(t, [.35, 1.15, 2.4], [0, .25, .65], cl) + Math.max(0, handPulse) * .08;
  const skinOpacity = interpolate(t, [3.08, 3.72, 4.92, 5.4], [0, 1, 1, 0], cl);
  const skinAperture = interpolate(t, [3.02, 3.82], [0, 145], cl);
  const vesselOpacity = interpolate(t, [4.65, 5.28, 9], [0, 1, 1], cl);
  const vesselAperture = interpolate(t, [4.64, 5.38], [0, 145], cl);
  const vesselScale = interpolate(t, [5.18, 8.9], [.94, 1.1], cl) + Math.sin(t * 2.3) * .008;
  const constrict = interpolate(t, [6.85, 7.8, 9], [0, 1, 1], cl);
  const speed = interpolate(t, [0, 7.0, 8.1, 9], [8, 8, 5.5, 5.5], cl);

  const label = t < 2.8
    ? {text: 'NOREPINEFRINA', color: '#a8ece5', opacity: interpolate(t, [.84, 1.1, 2.25, 2.65], [0, 1, 1, 0], cl)}
    : t < 5.45
      ? {text: 'VASOCONSTRICCIÓN', color: '#ffdc9a', opacity: interpolate(t, [2.6, 2.92, 4.95, 5.25], [0, 1, 1, 0], cl)}
      : {text: 'ARTERIOLAS', color: '#a8ece5', opacity: interpolate(t, [6.52, 6.85, 8.72, 9], [0, 1, 1, 0], cl)};

  const caption = t < 1.22
    ? 'Medicamentos como la'
    : t < 2.12
      ? 'norepinefrina'
      : t < 3.74
        ? 'producen vasoconstricción'
        : t < 5.46
          ? 'para elevar la presión arterial'
          : t >= 5.94 && t < 6.42
            ? 'Observa.'
            : t >= 6.88 && t < 8.82
              ? 'Las arterias pequeñas se estrechan'
              : '';

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
        <Img src={staticFile('backgrounds/icu-room.webp')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `translate3d(${cameraDrift * -9}px, ${respiratory * -5}px, 0) scale(${interpolate(t, [0, 3.2], [1.04, 1.14], cl) + Math.max(0, respiratory) * .006})`, filter: `brightness(${1 + respiratory * .012}) saturate(1.04)`}} />
        {/* Independent light layers create foreground/background parallax rather than a single still plate. */}
        <div style={{position: 'absolute', inset: '-12%', opacity: .38 + Math.max(0, respiratory) * .12, transform: `translate3d(${cameraDrift * 18}px, ${respiratory * 10}px, 0)`, background: 'radial-gradient(ellipse at 82% 24%, rgba(112,219,222,.28), transparent 36%), radial-gradient(ellipse at 18% 72%, rgba(50,118,146,.28), transparent 42%)'}} />
        {/* Live monitor trace and small IV droplets travel independently over the room plate. */}
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
          <defs>
            <linearGradient id="ecgGlow"><stop stopColor="#62e8c2" stopOpacity="0"/><stop offset=".28" stopColor="#62e8c2"/><stop offset=".72" stopColor="#a5ffe0"/><stop offset="1" stopColor="#62e8c2" stopOpacity="0"/></linearGradient>
            <filter id="ecgBloom"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M168 265 H242 L266 257 L285 278 L309 229 L333 302 L355 265 H424 L447 255 L466 265 H530" fill="none" stroke="#123b3d" strokeWidth="12" opacity=".44" />
          <path d="M168 265 H242 L266 257 L285 278 L309 229 L333 302 L355 265 H424 L447 255 L466 265 H530" fill="none" stroke="url(#ecgGlow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="68 590" strokeDashoffset={-monitorSweep} filter="url(#ecgBloom)" />
          <path d="M766 280 C760 330 800 390 790 450" fill="none" stroke="#9de9dd" strokeWidth="4" strokeDasharray="2 22" strokeLinecap="round" opacity=".58" />
          {[0, 1, 2].map((i) => {
            const p = (fluidPhase + i / 3) % 1;
            const x = 766 + 34 * p + 11 * Math.sin(p * Math.PI * 2);
            const y = 280 + 170 * p;
            return <g key={i} transform={`translate(${x} ${y})`} opacity={.45 + .4 * Math.sin(p * Math.PI)}><circle r="4" fill="#d5fff5"/><circle r="9" fill="#83e4d8" opacity=".16" /></g>;
          })}
        </svg>
      </AbsoluteFill>

      {/* The hand is a detailed original cutout. Slow scale and drift create the anatomical push-in. */}
      <div style={{position: 'absolute', left: handX, top: handY + handPulse * 8, width: 1080, height: 540, opacity: handOpacity, transform: `scale(${handScale}) rotate(${handPulse * .62}deg)`, transformOrigin: '55% 54%', filter: 'drop-shadow(0 20px 30px rgba(8,23,34,.48))'}}>
        <Img src={staticFile('anatomy/hand.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain'}} />
        {/* A soft distal blue-violet wash, masked to the hand silhouette, becomes more visible with the narration. */}
        <div style={{position: 'absolute', inset: 0, opacity: distalTone, background: 'linear-gradient(90deg, transparent 38%, rgba(75,83,157,.68) 76%, rgba(74,78,151,.88))', maskImage: `url(${staticFile('anatomy/hand.webp')})`, WebkitMaskImage: `url(${staticFile('anatomy/hand.webp')})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%', mixBlendMode: 'multiply'}} />
      </div>

      {/* Skin cutaway bridges the real hand to the vessel view during the camera dive. */}
      <AbsoluteFill style={{opacity: skinOpacity, clipPath: `circle(${skinAperture}% at 68% 22%)`, background: '#45253b', overflow: 'hidden'}}>
        {/* Epidermis and deeper dermis move at different rates to give the skin cutaway actual depth. */}
        <Img src={staticFile('anatomy/skin-microcirculation.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `translate3d(${cameraDrift * -12}px, ${respiratory * -7}px, 0) scale(${interpolate(t, [3.15, 4.9], [1.04, 1.2], cl)})`}} />
        <Img src={staticFile('anatomy/skin-microcirculation.webp')} style={{position: 'absolute', inset: '-4%', width: '108%', height: '108%', objectFit: 'cover', opacity: .58, transform: `translate3d(${cameraDrift * 21}px, ${Math.sin(t * 1.7) * 13}px, 0) scale(${interpolate(t, [3.15, 4.9], [1.07, 1.25], cl)})`, maskImage: 'linear-gradient(180deg, transparent 28%, rgba(0,0,0,.35) 42%, #000 62%)', WebkitMaskImage: 'linear-gradient(180deg, transparent 28%, rgba(0,0,0,.35) 42%, #000 62%)'}} />
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${50 + Math.sin(t * 1.6) * 8}% ${53 + respiratory * 3}%, rgba(255,145,117,.16), transparent 43%), linear-gradient(180deg, rgba(52,28,47,.04), rgba(39,20,43,.08) 55%, rgba(26,24,43,.36))`}} />
        <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse at ${22 + (frame * 1.1 % 70)}% 76%, rgba(255,205,166,.18), transparent 13%)`, mixBlendMode:'screen', opacity:.7}} />
      </AbsoluteFill>

      {/* The tissue texture stays under the cutaway, so the vessel reveal never floats on an empty plate. */}
      <AbsoluteFill style={{opacity: vesselOpacity, clipPath: `circle(${vesselAperture}% at 51% 50%)`}}>
        <Img src={staticFile('anatomy/skin-microcirculation.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `translate3d(${cameraDrift * 12}px, ${respiratory * -11}px, 0) scale(${1.14 + Math.sin(t * .8) * .012})`, filter: 'blur(3px) saturate(.82)'}} />
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(23,22,41,.48), rgba(35,24,44,.28) 48%, rgba(16,31,45,.62))'}} />
        <div style={{position: 'absolute', left: 0, top: 700, width: 1080, height: 461, transform: `scale(${vesselScale})`, transformOrigin: '50% 50%', filter: 'drop-shadow(0 28px 36px rgba(10,8,24,.48))'}}>
          <Img src={staticFile('anatomy/arteriole-normal.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', opacity: 1 - constrict}} />
          <Img src={staticFile('anatomy/arteriole-constricted.webp')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', opacity: constrict}} />
          <svg width="1080" height="461" viewBox="0 0 1920 819" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
            <defs>
              <clipPath id="flow-lumen"><path d={`M 130 ${top} C 420 ${top - 10} 645 ${centerTop} 960 ${centerTop} C 1270 ${centerTop} 1510 ${top - 10} 1790 ${top} L 1790 ${bottom} C 1510 ${bottom + 10} 1270 ${centerBottom} 960 ${centerBottom} C 645 ${centerBottom} 420 ${bottom + 10} 130 ${bottom} Z`} /></clipPath>
            </defs>
            <g clipPath="url(#flow-lumen)">
              {cellXs.map((x, i) => <RBC key={i} x={x} y={410 + Math.sin(frame * .045 + i * 1.8) * (42 - 10 * constrict)} scale={.9 + (i % 3) * .1} />)}
              <path d="M 80 420 H 1840" fill="none" stroke="#ffb6a0" strokeWidth="8" strokeDasharray="22 38" opacity=".24" />
              <path d={`M 180 ${410 + 16 * Math.sin(frame * .08)} H 1750`} fill="none" stroke="#ffd0b7" strokeWidth="3" strokeDasharray="4 90" strokeDashoffset={-frame * 17} opacity=".4" />
            </g>
          </svg>
        </div>
      </AbsoluteFill>

      <div style={{position: 'absolute', left: 48, top: 46, padding: '11px 18px', borderRadius: 20, background: 'rgba(10,34,47,.70)', border: '1px solid rgba(180,222,221,.42)', color: '#ecf6f3', fontWeight: 800, fontSize: 21, letterSpacing: 2}}>MEDISHORT360 · UCI</div>
      <div style={{position: 'absolute', top: 132, left: 44, right: 44, textAlign: 'center', opacity: label.opacity, color: label.color, fontWeight: 800, fontSize: 34, letterSpacing: 3, textShadow: '0 3px 18px #061a24'}}>{label.text}</div>
      {caption && <div style={{position: 'absolute', left: 140, right: 140, bottom: 150, minHeight: 68, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 24px', borderRadius: 18, background: 'rgba(8,22,33,.68)', border: '1px solid rgba(221,238,236,.24)', color: '#f8f7f0', fontSize: 32, lineHeight: 1.18, fontWeight: 800, letterSpacing: .3, textAlign: 'center', textShadow: '0 3px 14px #06131c', opacity: interpolate(t % 1, [0, .12, .78, 1], [.82, 1, 1, .82], cl)}}>{caption}</div>}
      <div style={{position: 'absolute', right: 48, bottom: 52, color: '#f1f5f2', fontSize: 21, fontWeight: 700, letterSpacing: 3, opacity: .72}}>MEDISHORT360</div>
      {audio && <Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={Math.round(8.34 * fps)} volume={0.98} />}
    </AbsoluteFill>
  );
};
