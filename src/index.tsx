import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {MedicalProof} from './components/MedicalProof';
import {VasopresoresFull} from './compositions/VasopresoresFull';

const Root: React.FC = () => <>
  <Composition id="VasopresoresProof" component={() => <MedicalProof audio />} durationInFrames={270} fps={30} width={1080} height={1920}/>
  <Composition id="VasopresoresFull" component={VasopresoresFull} durationInFrames={1525} fps={30} width={1080} height={1920}/>
</>;

registerRoot(Root);
