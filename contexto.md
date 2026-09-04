
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
