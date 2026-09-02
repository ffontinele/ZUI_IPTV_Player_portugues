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

## 👁️ Assistidos Recentemente / Continuar Assistindo (02-09-2026)
- Hook useWatchProgress salva progresso automatico a cada 5s (timeupdate/pause/ended)
- Filmes: salva % em moviesStore.watchProgress + retoma de onde parou (resumeRatio)
- Series: salva % + temporada/episodio/segundos (currentEpisode + resumeSec)
- Badge amarelo "CONTINUAR" no ultimo episodio assistido no modal
- Categoria "Continuar Assistindo" FIXA na biblioteca (Filmes e Series)
- Categoria "Favoritos" FIXA na biblioteca
- Botoes "LIMPAR HISTORICO" / "LIMPAR FAVORITOS" com confirmacao em 2 cliques
- Prune automatico de favoritos/progresso fantasmas (IDs que nao existem mais)
- Traducoes: Devam Et → Continuar Assistindo, Favoriler/İzleme Listesi → Favoritos

## 🖱️ Mouse e Navegacao (01-09-2026)
- Clique no poster SELECIONA no topo (nao reproduz direto)
- Botao "Detalhes" abre MovieDetailsModal (sinopse, nota, ano, runtime)
- BACK respeita modais abertos (fecha o modal antes de navegar)
- "VOLTAR" do modal de episodios agora e botao real clicavel

## 🎨 Ajustes visuais finais (03-09-2026)
- TopBar no padrao visual dos cards: fundo cinza nos itens normais e amarelo esmaecido no item ativo
- Labels do TopBar abreviados para evitar sobreposicao: Inicio, TV, Filme, Serie, Config
