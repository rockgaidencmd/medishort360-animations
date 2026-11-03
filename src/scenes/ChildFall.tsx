import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ChildRig,childPose} from '../anatomy/ChildRig';
import {smooth} from '../anatomy/healing';
import type {SceneProps} from './types';
export const ChildFall:React.FC<SceneProps>=({t,props})=>{
 const tripAt=typeof props.tripAt==='number'?props.tripAt:2;const impactAt=Math.max(tripAt+.25,typeof props.impactAt==='number'?props.impactAt:3.2);
 const pose=childPose({t,state:'fall',tripAt,impactAt});const zoom=smooth(impactAt+.45,impactAt+2,t);const scale=1+zoom*1.5;
 return <AbsoluteFill><AbsoluteFill style={{transform:`translate(${(540-pose.forearm.x)*zoom}px, ${(960-pose.forearm.y)*zoom}px) scale(${scale})`,transformOrigin:`${pose.forearm.x}px ${pose.forearm.y}px`}}><ChildRig t={t} state="fall" tripAt={tripAt} impactAt={impactAt}/></AbsoluteFill></AbsoluteFill>;
};
