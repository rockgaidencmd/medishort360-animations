import React, {useMemo} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Transcript} from '../pipeline/schema';
import {theme} from '../styles/theme';

type W = {text: string; start: number; end: number};
type Chunk = {start: number; end: number; words: W[]; phrase: boolean};

const MAX_WORDS = 4;
const BREAK = /[.,;:!?¿¡]$/;

/** Agrupa en bloques de hasta 4 palabras. Si no hay tiempos por palabra, muestra la frase completa. */
export const buildChunks = (transcript: Transcript): Chunk[] => {
  const chunks: Chunk[] = [];
  for (const seg of transcript.segments) {
    if (!seg.words || seg.words.length === 0) {
      chunks.push({start: seg.start, end: seg.end, words: [{text: seg.text, start: seg.start, end: seg.end}], phrase: true});
      continue;
    }
    let cur: W[] = [];
    const flush = () => {
      if (cur.length > 0) {
        chunks.push({start: cur[0].start, end: cur[cur.length - 1].end, words: cur, phrase: false});
        cur = [];
      }
    };
    for (const w of seg.words) {
      cur.push({text: w.word.trim(), start: w.start, end: w.end});
      if (cur.length >= MAX_WORDS || BREAK.test(w.word.trim())) flush();
    }
    flush();
  }
  return chunks;
};

export const Captions: React.FC<{transcript: Transcript; wordByWord?: boolean; bottom?: number;fontSize?:number}> = ({transcript,wordByWord=false,bottom,fontSize}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const chunks = useMemo(() => wordByWord?transcript.segments.flatMap(seg=>(seg.words??[]).map(w=>({start:w.start,end:w.end,words:[{text:w.word,start:w.start,end:w.end}],phrase:false}))):buildChunks(transcript), [transcript,wordByWord]);
  const chunk = chunks.find((c) => wordByWord?(t>=c.start&&t<c.end):(t >= c.start - 0.05 && t < c.end + 0.2));
  if (!chunk) return null;

  const {colors, layout, size} = theme;
  const fadeIn = interpolate(t, [chunk.start - 0.05, chunk.start + 0.1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        left: layout.captionLeft,
        right: layout.captionRight,
        bottom: bottom??layout.captionBottom,
        minHeight: layout.captionHeight,
        padding: '18px 24px',
        boxSizing: 'border-box',
        borderRadius: 18,
        background: colors.panelDeep,
        color: colors.caption,
        fontSize: fontSize??size.caption,
        lineHeight: 1.25,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0 10px',
        opacity: fadeIn,
      }}
    >
      {chunk.words.map((w, i) => {
        const active = !chunk.phrase && t >= w.start && t < w.end;
        const pop = active ? spring({frame: frame - Math.round(w.start * fps), fps, config: {damping: 12, stiffness: 220}}) : 1;
        return (
          <span
            key={`${w.start}-${i}`}
            style={{
              display: 'inline-block',
              color: active ? colors.label : colors.caption,
              fontWeight: active ? 700 : 400,
              transform: `scale(${active ? interpolate(pop, [0, 1], [1.25, 1]) : 1})`,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
