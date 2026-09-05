
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
