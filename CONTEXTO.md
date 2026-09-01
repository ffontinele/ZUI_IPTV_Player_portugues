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

## 📱 Painel Web QR Code
- URL: https://ffontinele.github.io/ZUI_IPTV_Player_portugues/painel_web/
- QR aponta para: URL?id=SHORT_ID&key=DEVICE_KEY
- Preenche TV ID e Chave automaticamente via URL params

## 🖱️ Mouse e Navegacao (atualizacao 01-09-2026)
- Clique no poster SELECIONA no topo (nao reproduz)
- Botao Detalhes abre MovieDetailsModal (sinopse, nota, ano)
- BACK respeita modais abertos (fecha o modal antes de navegar)
- VOLTAR do modal de episodios agora e botao real
