import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
const p='projects/ulcera-por-presion/';
const plan=JSON.parse(fs.readFileSync(p+'capture-plan-v2.json','utf8'));
const e=JSON.parse(fs.readFileSync(p+'events-v2.json','utf8'));
const subset=new Set((process.argv[2]??'').split(',').filter(Boolean).map(Number));
if([...subset].some(i=>!Number.isInteger(i)||i<0||i>=20))throw Error('Índices fuera de rango');
const serveUrl=await bundle({entryPoint:'src/index.tsx'});
const browser=await openBrowser('chrome',{chromiumOptions:{gl:'swangle'},logLevel:'error'});
try{
 const composition=await selectComposition({serveUrl,id:'ulcera-por-presion',puppeteerInstance:browser});
 const report=[];
 for(let i=0;i<plan.length;i++){
  const item=plan[i];if(item.frame===null)throw Error('No se permiten cuadros de relleno');
  const output=`output/previews/ulcera-v2-${String(i).padStart(2,'0')}.png`;
  if(subset.size===0||subset.has(i))await renderStill({serveUrl,composition,puppeteerInstance:browser,frame:item.frame,output,imageFormat:'png',logLevel:'error'});
  if(!fs.existsSync(output))throw Error('Falta captura real: '+output);
  const t=item.frame/30,macro=(t>=e.capillaries&&t<e.deep)||(t>=e.care&&t<e.outro),full=t>=e.cells&&t<e.deep;
  let zoom=macro?8:1;
  if(t<e.body){let u=Math.max(0,Math.min(1,t/e.openingEnd));u=u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;zoom=1+1.2*u;}
  const minFont=t>=e.evolution&&t<e.care?36:t>=e.outside&&t<e.evolution||t>=e.outro?44:40;
  report.push({...item,path:output,zoom:Number(zoom.toFixed(3)),macroZoom:macro?8:null,minCellBodyPx:macro?(full?216:172):null,minRedCellBodyPx:macro&&!full?122:null,minFontPx:minFont,watermark:true,measurement:'Cotas geométricas conservadoras a 1080x1920; tamaño de cuerpo celular y font-size efectivo, no altura raster de glifos.'});
  console.log(`${i+1}/20 ${item.title}: ${item.second.toFixed(3)} s, ${item.anchor.actual}`);
 }
 fs.writeFileSync(p+'capture-report-v2.json',JSON.stringify(report,null,2)+'\n');
 // Referencias adicionales para verificar marca en los extremos, fuera de la hoja de veinte cuadros.
 if(subset.size===0)for(const [name,frame] of [['first',0],['last',composition.durationInFrames-1]])await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:`output/previews/ulcera-v2-${name}.png`,imageFormat:'png',logLevel:'error'});
}finally{await browser.close({silent:true});}
