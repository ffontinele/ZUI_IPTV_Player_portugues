const fs=require('fs'),p=require('path');
let esbuild=null;try{esbuild=require('esbuild');}catch(e){}
const D=p.resolve('dist');const A=p.join(D,'assets');
const files=fs.readdirSync(A);
const css=files.find(f=>f.endsWith('.css'));
const poly=files.find(f=>f.startsWith('polyfills-legacy-'));
const entry=files.find(f=>f.startsWith('index-legacy-'));
console.log('css='+css+' poly='+poly+' entry='+entry);
if(!css||!poly||!entry){console.error('FALTANDO ARQUIVOS LEGACY');process.exit(1);}
const wpoly=fs.readFileSync('/tmp/zui-wpoly.js','utf8');
for(const f of files.filter(f=>/worker-.*\.js$/.test(f))){
  const fp=p.join(A,f);let s=fs.readFileSync(fp,'utf8');
  if(esbuild&&(s.includes('?.')||s.includes('??'))){
    try{const r=esbuild.transformSync(s,{target:'es2015',format:'iife'});s=r.code;console.log('[OK] esbuild downlevel '+f);}catch(e){console.log('[AVISO] esbuild falhou '+f);}
  }
  if(!s.includes('ZUI-WPOLY')){fs.writeFileSync(fp,wpoly+'\n'+s);console.log('[OK] wpoly '+f);}
}
fs.writeFileSync(p.join(A,'zui-mainpoly.js'),fs.readFileSync('/tmp/zui-mainpoly.js','utf8'));
fs.writeFileSync(p.join(A,'zui-kick.js'),'System.import("./assets/'+entry+'").catch(function(e){var d=document.createElement("pre");d.style.cssText="position:fixed;top:0;left:0;right:0;background:#400;color:#fff;padding:8px;z-index:999999;white-space:pre-wrap;font-size:12px;";d.textContent="ERRO LEGACY: "+(e&&e.stack||e);(document.body||document.documentElement).appendChild(d);});');
const html='<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8"/>\n<meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n<title>ZUI IPTV LEGACY</title>\n<link rel="preconnect" href="https://fonts.googleapis.com"/>\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\n<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>\n<link rel="stylesheet" href="./assets/'+css+'"/>\n</head>\n<body>\n<div id="root"></div>\n<script src="./assets/zui-mainpoly.js"></script>\n<script src="./assets/'+poly+'"></script>\n<script src="./assets/zui-kick.js"></script>\n</body>\n</html>\n';
fs.writeFileSync(p.join(D,'index.html'),html);
const ai=p.join(D,'appinfo.json');const j=JSON.parse(fs.readFileSync(ai,'utf8'));
j.id='com.zui.player4';j.version='2.0.0';
fs.writeFileSync(ai,JSON.stringify(j,null,2));
console.log('[OK] index.html + appinfo + kick prontos');
