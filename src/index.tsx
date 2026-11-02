import React from 'react';
import {registerRoot} from 'remotion';
import {Composition} from 'remotion';
import {MedicalProof} from './components/MedicalProof';

const Root: React.FC = () => <>
  <Composition id="VasopresoresProof" component={() => <MedicalProof audio />} durationInFrames={270} fps={30} width={1080} height={1920}/>
</>;

registerRoot(Root);
