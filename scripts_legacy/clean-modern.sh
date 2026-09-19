#!/bin/bash
# Remove chunks modernos (nao-legacy) que quebram o minificador do ares-package
cd "$(dirname "$0")/../dist/assets" || exit 1
for f in *.js; do
  case "$f" in
    *legacy*|zui-*|*worker*) : ;;
    *) rm -f "$f" ;;
  esac
done
echo "OK: chunks modernos removidos de dist/assets"
