#!/bin/bash
# Build reproduzivel do IPK legacy (independente do make-legacy-tv.cjs)
set -e
cd "$(dirname "$0")/.."
echo "[build-ipk] 1/6 npm run build"
npm run build 2>&1 | tail -2
echo "[build-ipk] 2/6 processar workers"
node scripts_legacy/process-workers.cjs
echo "[build-ipk] 3/6 injetar blackbox+shim inline"
python3 scripts_legacy/inject_inline.py
echo "[build-ipk] 4/6 corrigir appinfo"
python3 -c "import json; d=json.load(open('dist/appinfo.json')); d['id']='com.zui.player4'; d['version']='2.2.0'; json.dump(d,open('dist/appinfo.json','w'),indent=2,ensure_ascii=False); print('[build-ipk] appinfo:',d['id'],d['version'])"
echo "[build-ipk] 5/6 clean-modern"
bash scripts_legacy/clean-modern.sh
echo "[build-ipk] 6/6 ares-package"
ares-package dist -o dist-ipk 2>&1 | tail -2
ls -t dist-ipk/com.zui.player4_2.2.0_all.ipk 2>/dev/null | head -1
