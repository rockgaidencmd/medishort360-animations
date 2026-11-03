import React from 'react';
import {Composition} from 'remotion';
import {projects} from '../projects/index.generated';
import {ProjectVideo} from './ProjectVideo';

/** Úsalo dentro de tu Root.tsx:  {projectCompositions()}  — registra una composición por proyecto. */
export const projectCompositions = () =>
  projects.map((p) => (
    <Composition
      key={p.manifest.id}
      id={p.manifest.id}
      component={ProjectVideo}
      durationInFrames={Math.ceil(p.transcript.durationSec * p.manifest.fps)}
      fps={p.manifest.fps}
      width={p.manifest.width}
      height={p.manifest.height}
      defaultProps={{project: p}}
    />
  ));
