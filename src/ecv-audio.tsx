import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {ECVAudioFilm,transcript} from './scenes/ECVAudioFilm';
registerRoot(()=> <Composition id="ECV-Audio" component={ECVAudioFilm} durationInFrames={Math.ceil(transcript.durationSec*30)} fps={30} width={1080} height={1920}/>);
