import React from 'react';
import {Audio,Sequence,staticFile} from 'remotion';
import {ICUOpening3DProof} from './ICUOpening3DProof';
import {HandPerfusion3DProof} from './HandPerfusion3DProof';
export const ICUInfusionBridge:React.FC=()=> <><Sequence from={-250} durationInFrames={428}><ICUOpening3DProof audio={false} overlays={false}/></Sequence><Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={250}/></>;
export const NursingReview:React.FC=()=> <><HandPerfusion3DProof audio={false} overlays={false} assessment/><Audio src={staticFile('audio/vasopresores-original.mp3')} startFrom={1152}/></>;
