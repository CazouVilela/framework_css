# framework_css - Memoria do Projeto

> **Referencia**: Este projeto segue o template documentado em [TEMPLATE_PROJETO.md](.claude/TEMPLATE_PROJETO.md)

<!-- CHAPTER: 1 Visao Geral -->

## Sobre o Projeto

Framework CSS customizado baseado em LESS que implementa um sistema de grid responsivo, componentes UI (panels, botoes, formularios, navbar, modais, balloons), paleta de cores com variantes e controles de usuario (login social, menus). Acompanha uma aplicacao web de showcase que demonstra todos os componentes e um editor de variaveis em tempo real com compilacao LESS no servidor.

## Informacoes Principais

**Versao Atual**: v1.0.0
**Stack**: Node.js, Express, LESS (compilacao server-side), HTML/CSS/JS puro
**Status**: Em producao
**Ambiente**: Producao unica (branch main)

**URL Publica**: https://framework-css.sistema.cloud
**Porta Local**: 4200
**Servico systemd**: framework-css

<!-- CHAPTER: 2 Arquitetura -->

## Arquitetura

### Stack Tecnologico
- Node.js + Express (server.js) — serve arquivos estaticos e API de compilacao LESS
- LESS — pre-processador CSS com sistema de variaveis, mixins e grid programatico
- HTML/CSS/JS puro — paginas de showcase e editor (sem framework frontend)

### Estrutura de Arquivos
```
framework_css/
├── .claude/
│   └── memory.md
├── config/
│   ├── .env                    # FRONTEND_PORT=4200
│   └── env.config.js           # Loader central
├── server.js                   # Express + API compilacao LESS
├── public/
│   ├── index.html              # Showcase de todos os componentes
│   ├── editor.html             # Editor de variaveis com preview
│   ├── css/
│   │   ├── framework.css       # CSS compilado padrao
│   │   ├── normalize.css
│   │   └── paleta.css
│   ├── js/
│   │   ├── messageBalloons.js  # Interacao touch/click dos balloons (pointerdown + event delegation)
│   │   └── frameworkOverrides.js # So para o showcase/editor; NAO incluir em projetos
│   ├── icones/                 # ~80 SVGs
│   ├── images/                 # baloon.svg, bicoBallon.svg, loader.gif
│   └── less-src/               # Fontes LESS completas
│       ├── framework.less      # Entry point (importa tudo)
│       ├── Variaveis/
│       │   ├── Variaveis.less  # TODAS as 405 variaveis LESS
│       │   ├── breakpoints.less
│       │   ├── Mixing.less     # Mixins reutilizaveis
│       │   └── CustomProperties.less # GERADO automaticamente pelo script - NAO editar
│       ├── Estruturas/
│       │   ├── Grid/grid.less  # Sistema de grid D{n}T{n}M{n}
│       │   └── Elementos/      # Componentes (panels, forms, navbar, messageBalloon, paleta, etc)
│       └── Especificos/
├── arquivos_auxiliares/
│   └── FrameworkPadrao/        # Fonte original (ZIP extraido)
├── documentacao/
│   ├── REFERENCIA_CLAUDE_CODE.md # CANONICO — leitura obrigatoria para Claude Code
│   ├── FRAMEWORK_COMPLETO.md   # Documentacao detalhada (legado)
│   ├── VARIAVEIS_REFERENCIA.md # Referencia de variaveis (legado)
│   ├── GUIA_IMPLANTACAO.md     # Guia de uso em outros projetos (legado)
│   └── README.md               # Indice e ordem de precedencia
├── scripts/
│   ├── generate-custom-properties.js # Gera CustomProperties.less a partir de Variaveis.less
│   ├── backup-prod-db.sh
│   └── load-env.sh
├── backups/
└── package.json
```

### API Endpoints
- `GET /` — Pagina showcase com todos os componentes
- `GET /editor.html` — Editor de variaveis com preview
- `GET /api/variables` — Lista todas as variaveis LESS com tipo/categoria
- `POST /api/compile` — Compila LESS com variaveis customizadas, retorna CSS
- `POST /api/export` — Gera arquivo .less para download
- `GET /api/icons` — Lista todos os icones SVG disponiveis
- `GET /api/icon/:name` — Serve icone SVG individual

<!-- CHAPTER: 3 Funcionalidades -->

## Funcionalidades

### Implementadas
- Showcase completo de todos os componentes do framework (grid 12 cols, offset, ordenacao, containers, panels, cores, paleta, formularios, botoes, navbar, passos, balloons, modal, login social, textos responsivos, icones)
- Editor de variaveis com sidebar de edicao, busca, preview em iframe, simulacao de breakpoints (desktop/tablet/mobile)
- Compilacao LESS em tempo real no servidor
- Exportacao de config de variaveis como arquivo .less para outros projetos
- Rota publica via Cloudflare Tunnel

### Framework CSS Original
- Grid programatico via LESS loops: D{n}T{n}M{n} (Desktop/Tablet/Mobile)
- Breakpoints: Desktop >992px (18 cols original), Tablet 768-992px (12 cols), Mobile <768px (6 cols)
- Mixins: .padding(), .corVariante(), .color(), .backgroundColor(), .borderColor(), .gradiente(), .sombreamento(), .bordaArredondada(), .margin()
- Componentes: .panel, .navbar, .menuItem, .subMenu, .hamburger, .itemForm, .input, .bt, .tituloForm, .passos, .balloonTrigger, .balloonType-Help/Atencao/Erro, .modalBackground/Box, .containerbtFacebook/Google, .spanDesktop/Tablet/Mobile, .centralizadorVertical, .logoHomeNavbar, .logoHomeNavbarContainer, .sectionTitle, .cardButton

### Mudancas 2026-04-11

- **CSS Custom Properties (`var(--*)`) geradas automaticamente** (`scripts/generate-custom-properties.js` + `public/less-src/Variaveis/CustomProperties.less`):
  - Novo script `scripts/generate-custom-properties.js` le todas as 405 variaveis `@Nome` de `Variaveis.less` e gera `public/less-src/Variaveis/CustomProperties.less`.
  - Para cada variavel: expoe `:root { --Nome: @Nome; }` (valor canonico fixo).
  - Para cada trio `_Desktop/_Tablet/_Mobile` (89 bases responsivas): gera tambem `--NomeBase` "ativa" via `@media`, mudando automaticamente por breakpoint.
  - O arquivo gerado e importado em `framework.less` logo apos `Mixing.less`.
  - NAO editar `CustomProperties.less` a mao — regenerar via `node scripts/generate-custom-properties.js` apos qualquer mudanca em `Variaveis.less`.
  - Permite que projetos consumidores usem `var(--EntreColuna)` em CSS puro, sem precisar de LESS, com resposta automatica ao breakpoint.

- **Mixin `.corPaleta()` em `paleta.less`** (`public/less-src/Estruturas/Elementos/basicos/paleta.less:23-35`):
  - Substitui a aplicacao direta de `.backgroundColor()` nas 56 classes de paleta (`.primaria`, `.secundaria`, `.terciaria`, `.corAtencao`, `.corNegacao`, `.corPositivacao`, `.paleta-1-1` a `.paleta-5-10`).
  - Alem do `background-color` no elemento, aplica `border-color` no pseudo-elemento `:after`.
  - Proposito: colorir automaticamente o PREENCHIMENTO do triangulo de balloons ao aplicar classe de paleta, sem tocar no `:before` (contorno), que mantem a cor original do `.balloonType-*`.
  - E seguro aplicar em qualquer elemento — sem pseudo-elementos o `:after` simplesmente nao produz efeito.

- **Containers de balloon** (`public/less-src/Estruturas/Elementos/basicos/messageBalloon.less:42-59`):
  - Novas classes: `.containerComBalloon` (inline-flex, encolhe ao conteudo) e `.containerItemFormComBalloon` (flex, width 100%).
  - Ambas tem `position: relative` (positioning context para balloons `position: absolute`).
  - Separacao de responsabilidades com `.containerItemFormComIcone` (classe antiga, para ICONE dentro do input, nao para balloons). As 3 classes sao complementares e podem ser combinadas.
  - Regra:
    - Botao/icone/link (tamanho variavel) -> `.containerComBalloon`
    - Input/itemForm que ocupa coluna inteira -> `.containerItemFormComBalloon`
    - Input com icone DENTRO e balloon -> `.containerItemFormComBalloon containerItemFormComIcone` (combinadas)

- **messageBalloon.less — fixes e refatoracoes**:
  - `line-height` responsivo adicionado em cada @media dos 3 tipos (`.balloonType-Help/Atencao/Erro`) usando `@AlturaLinhaPadrao_*`.
  - Bug `, or (hover: none)` em media queries (sintaxe invalida em CSS, descartada por Chrome/Safari) corrigido via sed global em 21 arquivos. Substituido por `, (hover: none)` (virgula sozinha ja e OR logico).
  - Mixin `.balloonAtivoTransforms()` extraido (linha 1707) com as transformacoes de balloon visivel, reutilizado em `:focus`, `.balloonStatus-Ativo` e `:hover`.
  - `:hover` movido para `@media (min-width: @Res_Desktop) and (hover: hover)` — so aplica em devices com mouse real. Tablets touch em landscape nao disparam mais balloons "sticky" via hover.
  - `pointer-events: none` aplicado por default no mixin `.balloon` (linha 77). Balloons fechados nao interceptam mais taps acidentais em touch devices.
  - `.balloonStatus-Ativo { pointer-events: auto !important }` restaura a interatividade quando visivel. `!important` obrigatorio por causa da cascata dos `.balloonPosition-*` que re-aplicam `.balloon`.

- **messageBalloons.js — REESCRITA COMPLETA** (`public/js/messageBalloons.js`, 181 linhas):
  - Event delegation a partir do `document` (antes: listener em cada `.balloonTrigger` no load). Funciona com DOM dinamico (React/Vue/etc) sem reescaneamento.
  - Pointer Events API (`pointerdown`) em vez de `click`. Unificado para mouse/touch/pen, sem atraso de 300ms do click sintetico em touch.
  - Fallback `touchstart` + `mousedown` para browsers antigos sem `PointerEvent`.
  - Dedup de eventos sinteticos: janela de 250ms por target evita cascata touch -> mouse -> click abrir+fechar no mesmo tap.
  - ESC fecha todos os balloons (handler de keydown).
  - Click fora do trigger fecha todos via `closeAll()`.
  - Apenas um balloon aberto por vez (`closeAll(trigger)` antes de abrir outro).
  - API global `window.MessageBalloons.toggle(trigger)` + `.closeAll()`.
  - Flag `window.__messageBalloonsInstalled` previne instalacao dupla.

### Novas Classes (2026-04-09)

- **`.centralizadorVertical`** (`grid.less`): Modificador de `.linhaDoGrid` para telas de login/landing. Aplica `flex-direction: column; justify-content: center !important; min-height: 100vh`. Uso: `<div class="linhaDoGrid centralizadorVertical">`.

- **`.logoHomeNavbar`** + **`.logoHomeNavbarContainer`** (`Navbar.less`): Logo do sistema ao lado da navbar.
  - `.logoHomeNavbarContainer`: wrapper do logo. `z-index: 10001` (acima do navbar). No mobile: `position: absolute; left: 0; top: 0` (sobrepoe a barra do hamburger na coluna 1).
  - `.logoHomeNavbar`: aplicar na `<img>`. `display: block; object-fit: contain; margin: auto` (centralizado). `max-height` responsivo: Desktop = `@AlturaLinhaNavbar_Desktop + margens` (70px), Tablet = idem (60px), Mobile = `@AlturaLinhaNavbar_Mobile` somente (36px, sem margens).
  - Estrutura HTML:
    ```html
    <div class="linhaDoGrid" style="position: relative">
      <div class="D1T1M1 logoHomeNavbarContainer">
        <a href="/home"><img class="logoHomeNavbar" alt="Logo" src="/logo.png" /></a>
      </div>
      <div class="navbar D17T11M6">...</div>
    </div>
    ```

- **`.containerbtGoogle div`** refatorado (`Botoes_LoginSocial.less`): Agora usa `display: flex; justify-content: center; align-items: center; gap: 8px`. SVG deve ficar DENTRO do `<div>` (nao em `<span>` separado). `position: static !important` no SVG para sobrescrever o absoluto do `containerItemFormComIcone`. Novo padrao HTML:
  ```html
  <div class="containerItemFormComIcone containerbtGoogle">
    <input type="button" class="itemForm bt" value="" />
    <div><svg>...</svg> Google</div>
  </div>
  ```

- **`.navbar`** atualizado (`Navbar.less`): Adicionado `position: relative; z-index: 10000` em todos os viewports. Garante que dropdowns/submenus fiquem acima de todo o conteudo da pagina.

- **`.sectionTitle`** (`titulos.less`): Titulo de secao com linha inferior na cor primaria, alinhado a esquerda. Variaveis: `@TamanhoTextoSectionTitle_Desktop/Tablet/Mobile` (18/16/14px), `@linhaSectionTitle_*` (3/2/1px), `@MargemSuperiorSectionTitle_*` (20/16/12px), `@MargemInferiorSectionTitle_*` (idem). Uso: `<div class="sectionTitle D18T12M6">Titulo</div>`.

- **`.cardButton`** (`cardButton.less`): Cartao clicavel com icone+texto+subtexto. `display: flex !important; flex-direction: column; justify-content: center; height: 3 × @AlturaLinhaPadrao`. Hover: `fade(@CorPrimaria, 10%)`. Estrutura HTML:
  ```html
  <div class="panel DnTnMn cardButton" role="button">
    <div class="cardButton-main">
      <div class="cardButton-icone">icone</div>
      <div class="cardButton-texto">Titulo</div>
    </div>
    <div class="cardButton-subtexto">Descricao opcional</div>
  </div>
  ```
  - `.cardButton-main`: flex row, gap 8px (icone e texto na mesma linha)
  - `.cardButton-icone`: font-size = `@TamanhoTextoNavbar * 1.4`
  - `.cardButton-texto`: font-size/weight = navbar
  - `.cardButton-subtexto`: cor primaria, tamanho padrao. Sem subtexto, main centraliza sozinho.

### Regras Criticas de Uso do Grid (OBRIGATORIO em TODO projeto que usar o framework)

Documentacao completa:
- [FRAMEWORK_COMPLETO.md - Secao Regras Criticas de Uso](../documentacao/FRAMEWORK_COMPLETO.md#linhaDoGrid)
- [GUIA_IMPLANTACAO.md - Secao 8. Regras de Aplicacao do Grid](../documentacao/GUIA_IMPLANTACAO.md#8-regras-de-aplicacao-do-grid-obrigatorio)

**Resumo das regras (estao detalhadas nos docs acima)**:

1. **`.linhaDoGrid` e o container MACRO de UMA linha do layout**. Define o espaco total
   disponivel como largura para aquela linha (`calc(100vw - scrollbar)`), ja com as
   margens/gutters para cada viewport. E o container base onde as colunas `D{n}T{n}M{n}`
   sao posicionadas via flex row wrap.

2. **PROIBIDO aninhar `.linhaDoGrid` dentro de outro `.linhaDoGrid`**. E considerado
   **ERRO CRITICO de uso**. Como a classe define `width: calc(100vw - scrollbar)`, aninhar
   faz o filho estourar a largura e gera scroll lateral indesejado. Quando precisar de
   subdivisoes, usar `.containerEmColuna` (vertical) ou `.containerEmLinha` (sub-grid com
   margens negativas compensatorias).

3. **Elementos de layout podem ser filhos diretos de `.linhaDoGrid`** com suas classes
   `D{n}T{n}M{n}`, OU agrupados em subcontainers `.containerEmColuna` (que tambem recebem
   classe de coluna). **As duas formas podem ser misturadas livremente** dentro da mesma
   `.linhaDoGrid`.

**Exemplo de uso correto (mistura de filhos diretos + subcontainers)**:
```html
<div class="linhaDoGrid">
    <div class="panel D1T1M1">T1</div>
    <div class="panel D1T1M0">T1</div>

    <div class="D3T2M1 containerEmColuna">
        <div class="panel D3T2M1">DIV 1</div>
        <div class="panel D3T2M1">DIV 2</div>
        <div class="panel D3T2M1">DIV 3</div>
    </div>

    <div class="panel D1T1M1">T1</div>
</div>
```

<!-- CHAPTER: 4 Configuracoes -->

## Configuracoes

**Configuracao do ambiente**: `config/.env` (FRONTEND_PORT=4200)
**Servico**: `sudo systemctl {start|stop|restart|status} framework-css`
**Cloudflare**: Rota direta (sem gateway) → `http://localhost:4200`
**DNS CNAME**: `framework-css.sistema.cloud` → tunnel

<!-- CHAPTER: 5 Troubleshooting -->

## Troubleshooting

- **Case sensitivity LESS**: Arquivos LESS no Linux sao case-sensitive. Os imports em `framework.less` usam minusculo (`inputs.less`, `botoes.less`), os arquivos foram renomeados para corresponder.
- **Compilacao LESS lenta**: O CSS gerado tem ~1.2MB devido ao grid programatico com 3 loops aninhados (Desktop x Tablet x Mobile). Isso e normal.
- **Cloudflare 404**: O tunnel usa remote config via API. Editar config.yml local NAO basta — precisa atualizar via API (`PUT /accounts/{id}/cfd_tunnel/{id}/configurations`).
- **Bug mixin .gradiente()**: Typo no original: `-moz-linear-linear-gradient` (duplicado). Nao afeta funcionamento pois browsers modernos usam `linear-gradient` sem prefixo.
- **Bug LESS divisao sem parenteses (RESOLVIDO 2026-04-08)**: LESS 4+ usa `math: parens-division` por padrao, deixando expressoes como `@var / 2` literais ("12px / 2") no CSS final, gerando regras invalidas. **Sintoma**: triangulos dos balloons (`border: @EntreColuna_Desktop / 2 solid transparent`) com `border-width: 0px`. **Fix**: `server.js` usa `math: 'always'` em `less.render()`, e o `framework.css` estatico foi recompilado com a mesma opcao. Aplicar essa opcao em qualquer recompilacao manual.
- **Bug seletor com espaco antes de pseudo-elemento (RESOLVIDO 2026-04-08)**: `.balloonType-Atencao :before` (com espaco) era interpretado como combinador descendente, mirando `*::before` em filhos. **Sintoma**: balloon Atencao e Erro sem triangulo (Help funcionava porque usava `&:before` no LESS). **Fix**: removidos espacos em `messageBalloon.less:1550, 1554, 1591, 1595` (`.balloonType-Atencao:before`, `.balloonType-Erro:before`, etc.).
- **Bug `text-align` no `.menuItem` (RESOLVIDO 2026-04-08)**: `normalize.less` aplica `div { display: flex; justify-content: flex-start; align-items: flex-start; }` globalmente. Isso transforma `.menuItem` em flex container, e `text-align` deixa de afetar o alinhamento do conteudo (texto direto ou `<a>`), ignorando `@AlinhamentoTextoMenuItem_*`. **Fix**: adicionado `display: block` em `.menuItem` (`Navbar.less:303`) para sobrescrever o normalize global. SubMenu funciona porque o `<a>` interno tem `display: block !important; width: 100%` e herda `text-align`.
- **Override do showcase (`frameworkCssOverrides`)**: O `public/js/frameworkOverrides.js` armazena CSS compilado no `localStorage` e injeta em uma `<style id="custom-framework-css">` ao carregar `index.html`/`editor.html`. Isso significa que mudancas no `framework.css` estatico podem nao aparecer enquanto houver override antigo no navegador do usuario. Solucao: clicar em "Limpar" no showcase ou clicar em "Compilar LESS" no editor (regenera com o LESS atual).
- **Bug `, or (hover: none)` em media queries (RESOLVIDO 2026-04-11)**: Media queries CSS NAO aceitam `or` como operador — o operador OR e a virgula. Algumas regras do framework tinham sintaxe `, or (hover: none)` que Chrome/Safari descartavam silenciosamente. Fix: sed global em 21 arquivos substituindo `, or (hover: none)` por `, (hover: none)`. O unico lugar que ainda tem e o backup `messageBalloon - Cópia .less` que nao e importado.
- **Bug balloons fechados interceptando taps em touch (RESOLVIDO 2026-04-11)**: Balloons com `transform: scaleY(0.001)` continuam ocupando largura no DOM e sua area pode ser arredondada pelo hit-test do dedo, abrindo-os por acidente. Fix: `.balloon { pointer-events: none }` por default + `.balloonStatus-Ativo { pointer-events: auto !important }`. O `!important` e necessario porque cada `.balloonPosition-*` re-aplica o mixin com mesma specificity.
- **Bug `:hover` sticky em tablets landscape (RESOLVIDO 2026-04-11)**: Tablets em landscape (>=992px) com touch mantinham `:hover` "grudado" apos tap, abrindo balloons inesperadamente. Fix: `:hover` em balloons movido para `@media (min-width: @Res_Desktop) and (hover: hover)` — so aplica em devices com mouse real.
- **Regeneracao de CustomProperties.less**: Apos qualquer edicao em `Variaveis.less` (adicionar/renomear/remover variavel), rodar `node scripts/generate-custom-properties.js` para atualizar `CustomProperties.less`. Depois recompilar `framework.css`: `node_modules/.bin/lessc --math=always public/less-src/framework.less public/css/framework.css`.

## Showcase (`public/index.html`)

Cada `linhaDoGrid` demonstrativa segue o padrao:

```
<span class="demo-label">Titulo curto da demo</span>
<div class="linhaDoGrid">...HTML real do componente...</div>
<div class="description-block">
  Explicacao das classes utilizadas, efeitos esperados e regras gerais
</div>
<div class="code-block">HTML do bloco acima, com ... para linhas repetidas</div>
```

22 trios `linhaDoGrid + description-block + code-block` cobrem: Grid (configuracao base, 18 cols, ocultar, duplas), Offset (1a e 2a col), Ordenacao, Containers (column/linha), Cores semanticas, Forms (campos com icone, formulario completo), Balloons (3 tipos + 8 posicoes), Navbar, Paleta (Fade/Saturacao/Desaturacao/Clarificacao/Obscurecencia), Textos por breakpoint, Icones SVG.

Estilo `.description-block`: fundo amarelo claro, borda lateral ciano. Classes referenciadas em `<strong>` ou `<code>` ganham fonte monospace e cor ciano para destaque. Estrutura: `<span class="desc-title">` para titulo + `<ul><li>` para itens.

Secao de balloons (`#balloons`) tem estrutura padronizada para que o triangulo aponte corretamente:
- Wrapper externo: `containerHelpIcon D6T4M2`
- Wrapper interno: `containerItemFormComIcone` (`position: relative`)
- Balao como filho direto, com `D3T2M1` (largura fixa)
- Para help-icons isolados (8 posicoes): `D2T1M1` em wrapper + `help-icon balloonTrigger` interno

<!-- CHAPTER: 6 Proximas Features -->

## Proximas Funcionalidades

- [ ] Preview visual dos icones com busca no editor
- [ ] Salvar/carregar presets de variaveis
- [ ] Modo escuro para o showcase
- [ ] Documentacao interativa inline nos componentes

<!-- CHAPTER: 7 Referencias -->

## Referencias

- [TEMPLATE_PROJETO.md](.claude/TEMPLATE_PROJETO.md) - Template de organizacao
- [GUIA_SISTEMA_PROJETOS.md](.claude/GUIA_SISTEMA_PROJETOS.md) - Guia do sistema
- [FRAMEWORK_COMPLETO.md](documentacao/FRAMEWORK_COMPLETO.md) - Documentacao completa do framework
- [VARIAVEIS_REFERENCIA.md](documentacao/VARIAVEIS_REFERENCIA.md) - Referencia de variaveis
- [GUIA_IMPLANTACAO.md](documentacao/GUIA_IMPLANTACAO.md) - Guia de uso em outros projetos

---

**Ultima Atualizacao**: 2026-04-11
**Versao**: 1.0.0
**Status**: Em producao
