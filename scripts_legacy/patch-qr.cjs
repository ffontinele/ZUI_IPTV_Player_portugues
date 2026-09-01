const fs=require('fs');const path=require('path');
function walk(d){let out=[];for(const f of fs.readdirSync(d)){const p=path.join(d,f);const st=fs.statSync(p);if(st.isDirectory())out=out.concat(walk(p));else if(/\.(ts|tsx)$/.test(f))out.push(p);}return out;}
let n=0;
for(const p of walk('src')){
  let s=fs.readFileSync(p,'utf8');
  const s2=s.replace(/zui-sync-web\.vercel\.app/g,'ffontinele.github.io/zui-sync');
  if(s2!==s){fs.writeFileSync(p,s2);n++;console.log('[OK] URL trocada em '+p);}
}
console.log(n===0?'[AVISO] nada encontrado':'[OK] '+n+' arquivo(s) atualizado(s)');
