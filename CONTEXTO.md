# 📋 Contexto do Projeto ZUI IPTV Player

## 🎨 Padrão Visual

- Normal: Fundo amarelo #E8B567 + texto preto #0e0b0a
- Focado: Fundo branco + texto preto + glow
- Legendas: Sempre pretas em negrito
- SEM fundo branco em botoes do player

## 📍 Botoes do Player

- Episodio Anterior: canto inferior ESQUERDO
- Proximo Episodio: canto inferior DIREITO
- Closed Caption: canto SUPERIOR DIREITO
- Play/Pause/10s: centro inferior

## 🏗️ Build

npm run build
node scripts_legacy/make-legacy-tv.cjs
ares-package dist
