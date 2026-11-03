import {ICUOpening3DProof} from './compositions/ICUOpening3DProof';
import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {MedicalProof} from './components/MedicalProof';
import {VasopresoresFull} from './compositions/VasopresoresFull';
import {HandPerfusion3DProof} from './compositions/HandPerfusion3DProof';
import {Arteriole3DProof} from './compositions/Arteriole3DProof';
import {ShockSegment} from './compositions/ShockSegment';

const Root: React.FC = () => <>
  <Composition id="ICUOpening3DProof" component={ICUOpening3DProof} durationInFrames={252} fps={30} width={1080} height={1920}/>
  <Composition id="HandPerfusion3DProof" component={HandPerfusion3DProof} durationInFrames={252} fps={30} width={1080} height={1920}/>
  <Composition id="Arteriole3DProof" component={Arteriole3DProof} durationInFrames={252} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresProof" component={() => <MedicalProof audio />} durationInFrames={270} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresFull" component={VasopresoresFull} durationInFrames={1525} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresShockSegment" component={ShockSegment} durationInFrames={192} fps={30} width={1080} height={1920}/>
</>;

registerRoot(Root);
