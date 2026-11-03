import React from 'react';
import {AbsoluteFill,Composition,useCurrentFrame,useVideoConfig} from 'remotion';
import {z} from 'zod';
import {ChildRig} from '../anatomy/ChildRig';
import {SkinSection} from '../anatomy/SkinSection';
import {ArmSurface} from '../anatomy/ArmSurface';
import * as Cells from '../anatomy/Cells';
import {HealingView} from '../scenes/WoundHealing';
import {theme} from '../styles/theme';
const healing=z.number().min(0).max(1).step(.01);
const woundWidth=z.number().min(80).max(440).step(1);
const woundDepth=z.enum(['superficial','profunda']);
const childSchema=z.object({state:z.enum(['walk','trip','fall']),tripAt:z.number().min(0).max(8).step(.1),impactAt:z.number().min(.25).max(10).step(.1),shake:z.boolean()});
const skinSchema=z.object({healing,woundWidth,woundDepth,showCells:z.boolean(),showLabels:z.boolean()});
const armSchema=z.object({healing,woundWidth,woundDepth});
const timelineSchema=skinSchema.extend({animate:z.boolean(),healingFrom:healing,healingTo:healing,view:z.enum(['section','surface','both'])});
const cellsSchema=z.object({size:z.number().min(60).max(220).step(1),seed:z.number().int().min(0).max(1000)});
const useSeconds=()=>{const f=useCurrentFrame();return f/useVideoConfig().fps;};
const ChildPreview:React.FC<z.infer<typeof childSchema>>=p=><ChildRig {...p} t={useSeconds()}/>;
const SkinPreview:React.FC<z.infer<typeof skinSchema>>=p=><AbsoluteFill style={{background:theme.anatomy.paper,justifyContent:'center'}}><SkinSection {...p} t={useSeconds()}/></AbsoluteFill>;
const ArmPreview:React.FC<z.infer<typeof armSchema>>=p=><AbsoluteFill style={{background:theme.anatomy.paper,justifyContent:'center'}}><ArmSurface {...p} t={useSeconds()}/></AbsoluteFill>;
const TimelinePreview:React.FC<z.infer<typeof timelineSchema>>=({animate,healingFrom,healingTo,...p})=>{
 const frame=useCurrentFrame();const {durationInFrames,fps}=useVideoConfig();
 return <HealingView {...p} healing={animate?healingFrom+(healingTo-healingFrom)*frame/(durationInFrames-1):p.healing} t={frame/fps}/>;
};
const cellList=[['Plaquetas',Cells.Platelet],['Fibrina',Cells.FibrinMesh],['Eritrocitos',Cells.RedBloodCell],['Neutrófilos',Cells.Neutrophil],['Macrófagos',Cells.Macrophage],['Fibroblastos',Cells.Fibroblast],['Colágeno',Cells.CollagenFibers],['Capilar nuevo',Cells.NewCapillary],['Queratinocitos',Cells.Keratinocyte]] as const;
const CellsPreview:React.FC<z.infer<typeof cellsSchema>>=({size,seed})=>{const t=useSeconds();return <AbsoluteFill style={{background:theme.anatomy.paper,padding:70,fontFamily:theme.font.family,color:theme.anatomy.ink}}><h1 style={{fontSize:54}}>Piezas celulares</h1><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:40,flex:1,alignItems:'center'}}>{cellList.map(([name,Cell],i)=><div key={name} style={{textAlign:'center'}}><Cell size={size} t={t} seed={seed+i}/><div style={{fontSize:25,marginTop:25}}>{name}</div></div>)}</div></AbsoluteFill>;};
const common={fps:30,width:1080,height:1920};
export const previewCompositions=()=> <>
 <Composition {...common} id="Preview-ChildRig" component={ChildPreview} schema={childSchema} durationInFrames={300} defaultProps={{state:'fall',tripAt:2,impactAt:3.2,shake:true}}/>
 <Composition {...common} id="Preview-SkinSection" component={SkinPreview} schema={skinSchema} durationInFrames={600} defaultProps={{healing:0,woundWidth:270,woundDepth:'superficial',showCells:true,showLabels:true}}/>
 <Composition {...common} id="Preview-ArmSurface" component={ArmPreview} schema={armSchema} durationInFrames={600} defaultProps={{healing:0,woundWidth:270,woundDepth:'superficial'}}/>
 <Composition {...common} id="Preview-Cells" component={CellsPreview} schema={cellsSchema} durationInFrames={300} defaultProps={{size:160,seed:42}}/>
 <Composition {...common} id="Preview-HealingTimeline" component={TimelinePreview} schema={timelineSchema} durationInFrames={600} defaultProps={{animate:true,healing:0,healingFrom:0,healingTo:1,view:'both',woundWidth:270,woundDepth:'superficial',showCells:true,showLabels:true}}/>
 </>;
