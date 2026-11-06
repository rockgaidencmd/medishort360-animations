import React from 'react';
import {spring, useVideoConfig} from 'remotion';
import {theme} from '../styles/theme';

const {colors, layout, size} = theme;

export const LabelBar: React.FC<{text: string; frame: number}> = ({text, frame}) => {
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 200}});
  return (
    <div
      style={{
        position: 'absolute',
        left: layout.margin,
        right: layout.margin,
        top: layout.labelTop,
        height: layout.labelHeight,
        padding: 20,
        boxSizing: 'border-box',
        background: colors.panel,
        color: colors.label,
        fontWeight: 700,
        fontSize: size.label,
        textShadow: `0 2px 8px ${colors.shadow}`,
        opacity: p,
        transform: `translateY(${(1 - p) * -24}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const Callout: React.FC<{text: string; frame: number}> = ({text, frame}) => {
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 6, fps, config: {damping: 200}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: layout.calloutTop,
        padding: 22,
        borderRadius: 22,
        background: 'rgba(36,68,83,.88)',
        color: colors.mint,
        fontSize: size.callout,
        opacity: p,
        transform: `scale(${0.96 + 0.04 * p})`,
      }}
    >
      {text}
    </div>
  );
};

export const Watermark: React.FC<{text: string;fontSize?:number}> = ({text,fontSize}) => (
  <div
    style={{
      position: 'absolute',
      left: layout.margin,
      top: 50,
      color: colors.text,
      fontWeight: 700,
      fontSize: fontSize??size.brand,
      letterSpacing: 3,
      textShadow: `0 2px 8px ${colors.shadow}`,
    }}
  >
    {text}
  </div>
);
