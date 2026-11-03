import {previewCompositions} from './compositions/previews';
import {ICUInfusionBridge,NursingReview} from './compositions/ReviewSegments';
import {Vasopresores3DReview} from './compositions/Vasopresores3DReview';
import {ICUOpening3DProof} from './compositions/ICUOpening3DProof';
import React from 'react';
import {Composition} from 'remotion';
import {MedicalProof} from './components/MedicalProof';
import {VasopresoresFull} from './compositions/VasopresoresFull';
import {HandPerfusion3DProof} from './compositions/HandPerfusion3DProof';
import {Arteriole3DProof} from './compositions/Arteriole3DProof';
import {ShockSegment} from './compositions/ShockSegment';
import {projectCompositions} from './compositions/projectCompositions';

export const Root: React.FC = () => <>
  <Composition id="ICUInfusionBridge" component={ICUInfusionBridge} durationInFrames={178} fps={30} width={1080} height={1920}/>
  <Composition id="NursingReview" component={NursingReview} durationInFrames={310} fps={30} width={1080} height={1920}/>
  <Composition id="Vasopresores3DReview" component={Vasopresores3DReview} durationInFrames={1525} fps={30} width={1080} height={1920}/>
  <Composition id="ICUOpening3DProof" component={ICUOpening3DProof} durationInFrames={252} fps={30} width={1080} height={1920}/>
  <Composition id="HandPerfusion3DProof" component={HandPerfusion3DProof} durationInFrames={252} fps={30} width={1080} height={1920}/>
  <Composition id="Arteriole3DProof" component={Arteriole3DProof} durationInFrames={252} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresProof" component={() => <MedicalProof audio />} durationInFrames={270} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresFull" component={VasopresoresFull} durationInFrames={1525} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresShockSegment" component={ShockSegment} durationInFrames={192} fps={30} width={1080} height={1920}/>
  {projectCompositions()}
  {previewCompositions()}
</>;



