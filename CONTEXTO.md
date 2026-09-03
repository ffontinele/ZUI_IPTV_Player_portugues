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

## 🎨 Ajustes visuais finais (03-09-2026)
- TopBar no padrao visual dos cards: fundo cinza nos itens normais e amarelo esmaecido no item ativo
- Labels do TopBar abreviados para evitar sobreposicao: Inicio, TV, Filme, Serie, Config

## 📺 Ajustes finais (03-09-2026 - parte 2)
- Player: mensagem de erro some quando novo video comeca a tocar (deixa de ser infinita)
- TV ao vivo: botao "Limpar historico" na categoria Recentes (estilo igual aos de Filmes/Series)

## 🌐 Padrao de idioma (03-09-2026 - parte 4)
- Idioma padrao do app agora e portugues (pt) em instalacoes novas
- Antes era turco (tr) — causava instalacoes em outro idioma

## 🔧 Ajustes finais (03-09-2026 - parte 5)

### Player: setas e teclas de canal
- Setas de episódio (prev/next) agora só aparecem quando estamos em série
- Teclas CH+/CH- do controle agora só funcionam na TV ao vivo
- Durante filme ou série: CH+/CH- não faz nada (não sai do conteúdo)
- Corrigido bug: ao sair de série e abrir filme, as setas não apareciam mais

### Modal de Séries (EpisodeBrowserModal)
- Botão de voltar padronizado: fundo amarelo sólido + texto preto + bold
- Mesma configuração visual do botão "Limpar histórico"

### Busca por categoria (lupa local)
- Adicionada lupa dentro da grade de filmes/séries
- Filtra só os itens da categoria ativa (leve, sem pesar memória)
- Placeholder dinâmico: "Buscar em Animes...", "Buscar em Netflix..."
- Busca global (topo) continua funcionando em paralelo
- Traduções adicionadas em pt.json

## 🎨 Ajustes visuais finais (03-09-2026 - parte 6)

### Modal de detalhes de filmes (MovieDetailsModal)
- Botão Favoritar padronizado: amarelo sólido + texto preto + bold
- Botão Fechar padronizado: amarelo sólido + texto preto + bold
- Agora os 3 botões (Assistir, Favoritar, Fechar) têm visual idêntico
- Focado: borda branca + scale + glow amarelo
- Consistente com: Limpar histórico, Voltar do modal de séries, Play do modal de séries
