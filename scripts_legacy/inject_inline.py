import sys
s=open('dist/index.html',encoding='utf-8').read()
if 'zui-inline-blackbox' in s:
    print('[build-ipk] inline ja presente'); sys.exit(0)
snippet=open('scripts_legacy/inline_blackbox.html',encoding='utf-8').read()
s=s.replace('<head>','<head>\n'+snippet,1)
open('dist/index.html','w',encoding='utf-8').write(s)
print('[build-ipk] inline silencioso injetado no head')
