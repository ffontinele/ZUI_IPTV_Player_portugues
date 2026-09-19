const fs=require('fs'),p=require('path');
let esbuild=null;try{esbuild=require('esbuild');}catch(e){}
const A=p.resolve('dist/assets');
const wpoly=fs.readFileSync(p.join(__dirname,'wpoly.js'),'utf8');
for(const f of fs.readdirSync(A).filter(f=>/worker-.*\.js$/.test(f))){
  const fp=p.join(A,f);let s=fs.readFileSync(fp,'utf8');
  if(esbuild&&(s.includes('?.')||s.includes('??'))){
    try{const r=esbuild.transformSync(s,{target:'es2015',format:'iife'});s=r.code;console.log('[OK] downlevel '+f);}catch(e){console.log('[AVISO] esbuild falhou '+f);}
  }
  if(!s.includes('ZUI-WPOLY')){fs.writeFileSync(fp,wpoly+'\n'+s);console.log('[OK] wpoly '+f);}
}
console.log('[build-ipk] workers prontos');
