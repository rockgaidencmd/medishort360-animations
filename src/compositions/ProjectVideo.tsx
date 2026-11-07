import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../motion/Camera';
import {Captions} from '../motion/Captions';
import {Callout, LabelBar, Watermark} from '../motion/Overlays';
import {clamp} from '../motion/util';
import type {Project, Scene} from '../pipeline/schema';
import {sceneRegistry} from '../scenes/registry';
import {theme} from '../styles/theme';

export type ProjectVideoProps = {project: Project};

const SceneLayer: React.FC<{scene: Scene; ext: number; lengthFrames: number}> = ({scene, ext, lengthFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = ext > 0 ? interpolate(frame, [0, ext], [0, 1], clamp) : 1;
  const Comp = sceneRegistry[scene.component];
  return (
    <AbsoluteFill style={{opacity}}>
      <Camera type={scene.camera} intensity={scene.cameraIntensity} lengthFrames={lengthFrames}>
        <Comp t={(frame - ext) / fps} durationSec={lengthFrames / fps} props={scene.props} />
      </Camera>
      {scene.callout ? <Callout text={scene.callout} frame={frame} /> : null}
      {scene.label && !scene.props.internalLabel ? <LabelBar text={scene.label} frame={frame} /> : null}
    </AbsoluteFill>
  );
};

/**
 * Composición genérica: lee scenes.json y transcript.json. Una escena de N fotogramas se extiende
 * `transitionIn` fotogramas hacia atrás para fundirse sobre la anterior (las posteriores quedan encima).
 */
export const ProjectVideo: React.FC<ProjectVideoProps> = ({project}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const {manifest, scenes, transcript} = project;
  const controls=scenes[0]?.props??{};

  return (
    <AbsoluteFill style={{background: theme.colors.bg, fontFamily: theme.font.family}}>
      {scenes.map((scene, i) => {
        const start = Math.round(scene.from * fps);
        const isLast = i === scenes.length - 1;
        const end = isLast ? durationInFrames : Math.round(scene.to * fps);
        const ext = i === 0 ? 0 : Math.min(scene.transitionIn, start);
        const length = end - start + ext;
        return (
          <Sequence key={scene.id} name={scene.id} from={start - ext} durationInFrames={length}>
            <SceneLayer scene={scene} ext={ext} lengthFrames={length} />
          </Sequence>
        );
      })}
      {!controls.internalBrand&&<Watermark text={manifest.brand} fontSize={typeof controls.watermarkFontSize==='number'?controls.watermarkFontSize:undefined} />}
      <Captions transcript={transcript} wordByWord={controls.wordCaptions===true} highContrast={controls.captionHighContrast===true} fontSize={typeof controls.captionFontSize==='number'?controls.captionFontSize:undefined} bottom={typeof controls.captionBottom==='number'?controls.captionBottom:undefined}/>
      <Audio src={staticFile(manifest.audio)} />
    </AbsoluteFill>
  );
};
