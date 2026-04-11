# Documentacao do Framework CSS Padrao

Esta pasta contem toda a documentacao do projeto `framework_css`.

## Documento canonico (LER PRIMEIRO)

### [REFERENCIA_CLAUDE_CODE.md](REFERENCIA_CLAUDE_CODE.md)

**Este e o documento canonico**, mantido especificamente para Claude Code consultar
ao desenvolver frontend em qualquer projeto do usuario. Cobre tudo em uma unica leitura:

1. Quando usar o framework (regra obrigatoria)
2. Integracao passo-a-passo em projeto novo
3. Sistema de grid `D{n}T{n}M{n}` + regras criticas (nao aninhar `.linhaDoGrid`)
4. Catalogo completo de componentes (panel, navbar, forms, balloons, modal, 3 containers de balloon, etc)
5. Paleta de cores e sistema de 5 variantes (fade/saturacao/desat/clar/obsc) + mixin `.corPaleta()` que tambem colore `:after`
6. Mixins LESS (`.padding`, `.bordaArredondada`, `.sombreamento`, `.corVariante`, `.corPaleta`, etc)
7. 405 variaveis LESS customizaveis + 405 CSS custom properties (`var(--*)`) expostas em `:root`, 89 delas responsivas automaticas
8. Tipografia (Raleway)
9. JS dos componentes (`messageBalloons.js` reescrito em 2026-04-11 com event delegation, Pointer Events API, API global)
10. **Pegadinhas e bugs conhecidos** (case sensitivity, math:always, display:block no menuItem, `or` em media queries, pointer-events em balloons fechados, hover sticky em touch)
11. Performance e build
12. Checklist de implantacao
13. FAQ com 24 perguntas/erros comuns

**Tambem contem**: 15 screenshots visuais de referencia em `../print_screens/doc-*.png`
capturados do showcase ao vivo nos 3 breakpoints (Desktop 1440x900, Tablet 800x1024,
Mobile 412x915).

**Ordem de precedencia em caso de conflito**:
`REFERENCIA_CLAUDE_CODE.md` > `GUIA_IMPLANTACAO.md` > `FRAMEWORK_COMPLETO.md` >
`VARIAVEIS_REFERENCIA.md`. **O codigo-fonte sempre vence sobre qualquer documentacao.**

**Ultima atualizacao**: 2026-04-11 (CustomProperties.less, containers de balloon,
mixin `.corPaleta()`, messageBalloons.js reescrito, bugs `or` em media queries e
`pointer-events` em balloons).

## Documentos complementares (legado, mantidos como indice/referencia)

### [FRAMEWORK_COMPLETO.md](FRAMEWORK_COMPLETO.md)

Referencia tecnica exaustiva do framework: arquitetura, cada mixin com codigo-fonte e
exemplos detalhados, cada componente com media queries por breakpoint. Util como
"deep dive" quando o `REFERENCIA_CLAUDE_CODE.md` nao da detalhe suficiente para um caso
especifico.

Status: mantido por retrocompatibilidade. Conteudo validado contra o codigo-fonte em
2026-04-08.

### [GUIA_IMPLANTACAO.md](GUIA_IMPLANTACAO.md)

Guia detalhado de integracao em projetos novos, com receitas de build para:
- `lessc` CLI
- Webpack (less-loader)
- Vite
- Gulp
- Inclusao em HTML estatico

Tambem contem exemplos prontos de layouts completos (sidebar, formulario, grid de cards,
wizard de passos).

Status: mantido por retrocompatibilidade. Receitas de build ainda validas.

### [VARIAVEIS_REFERENCIA.md](VARIAVEIS_REFERENCIA.md)

Tabela (parcial, legado) das variaveis LESS do framework. Como o framework agora tem
**405 variaveis** LESS (auditadas pelo gerador `scripts/generate-custom-properties.js`),
use o proprio arquivo `Variaveis.less` ou o endpoint `GET /api/variables` para a lista
autoritativa. O `REFERENCIA_CLAUDE_CODE.md` lista apenas as mais importantes
(cheat sheet).

Fonte autoritativa das variaveis: `../public/less-src/Variaveis/Variaveis.less`.

## Fontes autoritativas (nao sao documentos, mas sao a verdade final)

- **Codigo LESS fonte**: `../public/less-src/`
- **Variaveis default (405 vars)**: `../public/less-src/Variaveis/Variaveis.less`
- **Mixins**: `../public/less-src/Variaveis/Mixing.less`
- **CSS Custom Properties (GERADO)**: `../public/less-src/Variaveis/CustomProperties.less`
- **Gerador de CustomProperties**: `../scripts/generate-custom-properties.js`
- **Grid programatico**: `../public/less-src/Estruturas/Grid/grid.less`
- **Componentes**: `../public/less-src/Estruturas/Elementos/`
- **Message balloons (LESS)**: `../public/less-src/Estruturas/Elementos/basicos/messageBalloon.less` (1859 linhas)
- **Paleta + mixin `.corPaleta()`**: `../public/less-src/Estruturas/Elementos/basicos/paleta.less`
- **HTML do showcase (exemplos canonicos de uso)**: `../public/index.html`
- **Editor de variaveis (iframe)**: `../public/editor.html`
- **JS de balloons (181 linhas, reescrito 2026-04-11)**: `../public/js/messageBalloons.js`
- **Server Express (API /api/compile, /api/variables, /api/icons)**: `../server.js`

## Links uteis

- **Showcase ao vivo**: https://framework-css.sistema.cloud/
- **Editor de variaveis**: https://framework-css.sistema.cloud/editor.html
- **API compilacao**: `POST https://framework-css.sistema.cloud/api/compile`
- **API variaveis**: `GET https://framework-css.sistema.cloud/api/variables`
- **API icones**: `GET https://framework-css.sistema.cloud/api/icons`

## Memoria do projeto

Ver `../.claude/memory.md` para informacoes sobre:
- Arquitetura (Node.js + Express + LESS)
- Estrutura de arquivos
- Endpoints da API
- Troubleshooting historico (bugs resolvidos do LESS math, seletor com espaco, etc)
- Override do showcase via `localStorage`

## Regra obrigatoria na memoria global do usuario

- `~/.claude/ORIENTACOES_DESENVOLVIMENTO.md` — secao "Framework CSS Padrao (OBRIGATORIO para TODO frontend)"
- `~/.claude/projects/-home-cazouvilela/memory/feedback_framework_css_padrao.md`
- `~/.claude/projects/-home-cazouvilela/memory/feedback_framework_css_grid_regras.md`
- `~/.claude/projects/-home-cazouvilela/memory/reference_framework_css_doc.md` (aponta para este README)
