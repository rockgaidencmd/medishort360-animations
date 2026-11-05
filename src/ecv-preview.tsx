import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
import {ECVFilm} from './scenes/ECVFilm';
import {ECVPreview} from './scenes/ECVPreview';
const Preview=()=>{const f=useCurrentFrame();return <ECVPreview t={f/30} durationSec={10} props={{mode:f>=150?'ruptura':'obstruccion',detail:f>=240?'signs':'table'}}/>};
registerRoot(()=> <><Composition id="ECV-Film" component={ECVFilm} durationInFrames={2760} fps={30} width={1080} height={1920}/><Composition id="ECV-Pieces" component={Preview} durationInFrames={300} fps={30} width={1080} height={1920}/></>);
