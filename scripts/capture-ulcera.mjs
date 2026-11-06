import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
const p='projects/ulcera-por-presion/';
const plan=JSON.parse(fs.readFileSync(p+'capture-plan.json','utf8'));
const e=JSON.parse(fs.readFileSync(p+'events.json','utf8'));
const serveUrl=await bundle({entryPoint:'src/index.tsx'});
const browser=await openBrowser('chrome',{chromiumOptions:{gl:'swangle'},logLevel:'error'});
try{
 const composition=await selectComposition({serveUrl,id:'ulcera-por-presion',puppeteerInstance:browser});
 fs.mkdirSync('output/previews',{recursive:true});
 const report=[];
 for(let i=0;i<plan.length;i++){
  const item=plan[i];
  if(item.frame===null){report.push({...item,watermark:null,verification:'No existe esta palabra en el audio; no se inventa captura ni tiempo.'});continue;}
  const output=`output/previews/ulcera-${String(i).padStart(2,'0')}.png`;
  await renderStill({serveUrl,composition,puppeteerInstance:browser,frame:item.frame,output,imageFormat:'png',logLevel:'error'});
  const t=item.frame/30;
  const macro=(t>=e.capillaries&&t<e.deep)||(t>=e.care&&t<e.outro);
  report.push({...item,path:output,effectiveSecond:t,macroZoom:macro?8:null,minCellBodyPx:macro&&t>=e.cells?172:null,minRedCellBodyPx:macro?122:null,minFontPx:40,watermark:true,measurement:'Cotas de diseño conservadoras a 1080x1920; revisar cuerpos y letras en la captura. No es altura raster del glifo.'});
  console.log(item.actual,item.second,output);
 }
 const extras=[['necrosis-estable',e.deep-.15],['cambio-postura',e.reflow],['tejido-viable',e.outro-.2],['primer-frame',0],['ultimo-frame',(composition.durationInFrames-1)/30]];
 for(const [name,t]of extras){await renderStill({serveUrl,composition,puppeteerInstance:browser,frame:Math.floor(t*30),output:`output/previews/ulcera-${name}.png`,imageFormat:'png',logLevel:'error'});}
 fs.writeFileSync(p+'capture-report.json',JSON.stringify(report,null,2)+'\n');
}finally{await browser.close({silent:true});}
