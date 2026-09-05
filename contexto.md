
## 2026-09-04 — Melhorias de interface (TV webOS)

### 1. Botão "Editar" nas listas (Config → Listas de Reprodução)
- Botão fica do lado DIREITO do cartão, bem afastado do Excluir
- Modal de edição: nome, servidor (porta vai junto no host, ex: http://host:8080), usuário e senha
- Campo "porta" separado foi removido (se o host não tiver porta, usa 80 ou 443)
- Botão de "olho" no campo senha para mostrar/esconder
- Ao salvar: atualiza a fonte e ressincroniza os canais automaticamente

### 2. Séries: OK no cartão abre os detalhes
- Ao selecionar uma série e apertar OK, abre o modal de temporadas/episódios
- Antes disso, tocava o primeiro episódio direto (comportamento removido)

### 3. Sinopse nos cartões principais (heroes)
- Séries: mostra a sinopse que já vem na lista (até 6 linhas)
- Filmes: a lista normalmente NÃO traz sinopse; o cartão busca os detalhes
  (get_vod_info) em segundo plano após 400ms e guarda num cache separado
- Sem pulo de seleção: o cache não mexe na lista visível (não chama _recompute)
- Se a lista já trouxer sinopse, ela é usada direto, sem busca extra (sem conflito)

### 4. Data de expiração da lista no rodapé da tela inicial
- O rodapé inferior esquerdo mostra: "LISTA ATIVA [nome] · EXPIRA [data]"
- Se o servidor mandar `exp_date` → mostra a data formatada (ex: 15/03/2027)
- Se não mandar (conta sem expiração) → mostra "Ilimitado"
- A data é capturada durante o sync e salva na fonte

### 5. Correção de foco nas telas de Filmes e Séries
- Ao abrir Filmes/Séries, foco cai direto no grid de cards (não mais no botão Home)
- Ao voltar do player, foco cai no grid (não mais no botão Home)
- Removido o BackHomeButton do sidebar (causava conflito de foco e enviava pra Home ao clicar)
- Fluxo esperado: grid → seta ← → sidebar de categorias → seta → → grid
- BackHomeButton era inútil porque o controle já tem botão Voltar dedicado (via RemoteRouter)

### 6. Correção definitiva do foco nas telas de Filmes e Séries
- Removido o BackHomeButton do sidebar de filmes e séries (era renderizado no topo do sidebar e capturava o foco ao sair do grid)
- Ao apertar seta ← no primeiro card do grid, o foco agora vai direto para a categoria ativa (ex: movie-cat-77) em vez de escapar para o sidebar
- Implementado via callback onEscapeToLeft passada do MoviesScreen/SeriesScreen para os Grids
- Fluxo corrigido: grid → seta ← → sidebar de categorias → seta → → grid (sem mais enviar para Home)
- Botão Voltar do controle (via RemoteRouter) continua funcionando para sair da tela e voltar para Home

### 7. Voltar do player para o mesmo card (não o primeiro)
- Antes: ao sair do player, o foco caía no primeiro card da categoria
- Agora: o último card focado é salvo em memória (fora do componente) e restaurado ao voltar do player
- Implementado em MoviesScreen e SeriesScreen com variáveis de módulo:
  lastMoviesGridFocus / lastSeriesGridFocus (categoria + id do card)
- Se o usuário trocar de categoria dentro da tela, o foco vai para o primeiro card da nova categoria (comportamento normal)
- Se voltar do player na mesma categoria, o foco volta exatamente para o card que abriu o vídeo

### 9. MARCO: Versão estável confirmada (commit 97fced8)
Esta é a versão que está funcionando 100% e serve como ponto de partida seguro:

✅ Sair do player → volta pro MESMO card focado (não o primeiro)
✅ Modal de episódios → reabre na MESMA temporada ao sair do player
✅ Foco volta pro grid quando o modal fecha (direcional funcionando)
✅ Seta ← no primeiro card do grid → vai pra categoria ativa
✅ Data de expiração real no rodapé
✅ Sinopse nos filmes (sem pulo de seleção)
✅ Botão Editar nas listas
✅ BackHomeButton removido (sem mais enviar pra Home ao clicar)

Próximo desafio conhecido (ainda não resolvido):
- Seta ← no sidebar escapa pro TopBar (zona de foco invisível)
- Tentativas de bloqueio não funcionaram; precisa de abordagem diferente

### 10. Barra de rolagem destacada (todas as telas)
- Antes: barra cinza fininha, quase invisível no fundo escuro
- Agora: trilho branco brilhante + polegar preto, 12px de largura (igual à foto de referência do usuário)
- Aplicado via CSS global em src/index.css (vale para todas as telas: filmes, séries, TV ao vivo, configurações, sidebars)
- Regras antigas de scrollbar foram removidas antes de adicionar as novas

### 11. Painel web — versão APROVADA pelo usuário (100% funcional)
- Opção Xtream: campo para colar a URL completa + extração AUTOMÁTICA ao colar
  (servidor, usuário e senha preenchidos sozinhos, com aviso verde "✔ Informações extraídas")
- Campos manuais de servidor/usuário/senha também visíveis para ajuste fino
- Opção M3U mantida para listas simples
- A versão com botão "Extrair + confirmação" foi testada e REJEITADA
- Esta versão (extração automática ao colar) foi aprovada como definitiva
