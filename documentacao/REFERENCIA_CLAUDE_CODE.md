# Framework CSS Padrao — Referencia Canonica para Claude Code

> **Status**: Documento canonico. **Este arquivo e a fonte unica de verdade** que Claude Code
> deve consultar toda vez que precisar escrever frontend em QUALQUER projeto do usuario.
>
> **Ordem de precedencia**: este arquivo > `GUIA_IMPLANTACAO.md` > `FRAMEWORK_COMPLETO.md`
> > `VARIAVEIS_REFERENCIA.md`. Em caso de conflito, este arquivo vence. Em caso de
> conflito com codigo-fonte, o **codigo-fonte sempre vence**.
>
> **Ultima validacao contra codigo**: 2026-04-11 (linha a linha em `public/less-src/`,
> `public/js/messageBalloons.js`, `scripts/generate-custom-properties.js` e
> `public/less-src/Variaveis/CustomProperties.less`).

**Localizacao canonica** deste arquivo:
`/home/cazouvilela/projetos/framework_css/documentacao/REFERENCIA_CLAUDE_CODE.md`

**Projeto fonte**: `/home/cazouvilela/projetos/framework_css/`
**Showcase ao vivo**: https://framework-css.sistema.cloud
**Editor de variaveis ao vivo**: https://framework-css.sistema.cloud/editor.html
**Porta local**: 4200 (`sudo systemctl status framework-css`)

---

## Sumario

1. [Quando usar este framework](#1-quando-usar-este-framework)
2. [Integracao em projeto novo (passo-a-passo executavel)](#2-integracao-em-projeto-novo-passo-a-passo-executavel)
3. [Sistema de Grid `D{n}T{n}M{n}` — REGRAS CRITICAS](#3-sistema-de-grid-dntnmn--regras-criticas)
4. [Catalogo de Componentes](#4-catalogo-de-componentes)
5. [Paleta de Cores e Variantes](#5-paleta-de-cores-e-variantes)
6. [Mixins LESS de Layout](#6-mixins-less-de-layout)
7. [Variaveis Customizaveis (LESS e CSS Custom Properties)](#7-variaveis-customizaveis-less-e-css-custom-properties)
8. [Tipografia](#8-tipografia)
9. [Comportamento JS dos Componentes](#9-comportamento-js-dos-componentes)
10. [Pegadinhas e Bugs Conhecidos — LEIA SEMPRE](#10-pegadinhas-e-bugs-conhecidos--leia-sempre)
11. [Performance e Build](#11-performance-e-build)
12. [Checklist de Implantacao em Projeto Novo](#12-checklist-de-implantacao-em-projeto-novo)
13. [FAQ — Erros comuns que Claude Code cometeria sem esta documentacao](#13-faq--erros-comuns-que-claude-code-cometeria-sem-esta-documentacao)

---

## 1. Quando usar este framework

### Regra obrigatoria (transversal a TODOS os projetos)

> **Todo desenvolvimento de frontend, em QUALQUER projeto (atual ou futuro), DEVE
> usar o `framework_css` como base.**

Esta regra esta documentada em:
- `/home/cazouvilela/.claude/ORIENTACOES_DESENVOLVIMENTO.md` — secao "Framework CSS Padrao"
- `/home/cazouvilela/.claude/projects/-home-cazouvilela/memory/feedback_framework_css_padrao.md`
- `/home/cazouvilela/.claude/projects/-home-cazouvilela/memory/feedback_framework_css_grid_regras.md`

### O que NAO usar (proibido)

| NAO usar                   | Por que                                                         | Usar em vez disso                          |
|----------------------------|-----------------------------------------------------------------|--------------------------------------------|
| Bootstrap                  | Grid diferente, componentes conflitantes com o framework        | Grid `D{n}T{n}M{n}` + `.panel`, `.bt` etc. |
| Tailwind CSS               | Classes utilitarias brigam com a semantica do framework         | Mixins LESS + variaveis                    |
| CSS Grid nativo            | Framework nao usa — quebra responsividade esperada              | `.linhaDoGrid` + classes de coluna         |
| Flex custom para layout    | Nao respeita os gutters/breakpoints do grid                     | `.containerEmColuna` / `.containerEmLinha` |
| Media queries custom       | Breakpoints oficiais ja estao nas classes `D/T/M`               | Variantes `D{n}T{n}M{n}`                   |
| Fontes diferentes          | Fonte padrao e Raleway                                          | Import Google Fonts Raleway                |

### Excecoes

**Tipicamente nenhuma.** Se aparecer um caso legitimo (ex: um widget de terceiros que traz
seu proprio CSS isolado), isolar esse componente e manter o restante da pagina no framework.

---

## 2. Integracao em projeto novo (passo-a-passo executavel)

Tres estrategias de integracao. Escolha conforme o contexto:

### Estrategia A — Asset estatico (recomendado para projetos simples)

Copiar o `framework.css` ja compilado e usar direto.

**Quando usar**: protototipos, projetos pequenos, paginas estaticas, Apps Script.

**Como**:
```bash
# 1. Criar pasta no projeto
mkdir -p <projeto>/public/css <projeto>/public/icones

# 2. Copiar CSS ja compilado do framework
cp /home/cazouvilela/projetos/framework_css/public/css/framework.css <projeto>/public/css/
cp /home/cazouvilela/projetos/framework_css/public/css/normalize.css <projeto>/public/css/
cp /home/cazouvilela/projetos/framework_css/public/css/paleta.css <projeto>/public/css/

# 3. Copiar SVGs dos icones
cp -r /home/cazouvilela/projetos/framework_css/public/icones/* <projeto>/public/icones/
```

### Estrategia B — Compilacao via API (recomendado para projetos customizados)

Chamar o endpoint `POST /api/compile` em build time com variaveis customizadas do projeto.

**Quando usar**: projetos que precisam de cores/tamanhos proprios mas querem manter a estrutura.

**Como**:
```bash
# Em tempo de build, gerar framework.css customizado
curl -X POST https://framework-css.sistema.cloud/api/compile \
  -H "Content-Type: application/json" \
  -d '{"variables": {"CorPrimaria": "rgb(30, 144, 255)", "CorSecundaria": "rgb(220, 53, 69)"}}' \
  | jq -r '.css' > public/css/framework.css
```

O endpoint aceita qualquer variavel listada em `/api/variables` como chave do objeto
`variables`. Ver secao [7. Variaveis Customizaveis](#7-variaveis-customizaveis) para a
lista completa.

**Tambem disponivel**: `POST /api/export` retorna um arquivo `.less` com as variaveis
customizadas (para versionar no repositorio do projeto e compilar localmente).

### Estrategia C — Source LESS + build local (recomendado para projetos grandes)

Integrar `less-src/` no build do proprio projeto (webpack, vite, gulp, lessc).

**Quando usar**: aplicacoes grandes que ja tem toolchain LESS e precisam de compilacao
fina-granular ou sourcemaps.

**Como**: ver `GUIA_IMPLANTACAO.md` > "7. Compilacao LESS" para receitas de webpack, vite,
gulp, gulp, lessc. Importante: **use `math: 'always'` na configuracao do compilador LESS**
(sem isso, divisoes sem parenteses viram literais e quebram o framework — ver
[secao 10, bug LESS math](#bug-less-divisao-sem-parenteses)).

### Imports HTML necessarios (qualquer estrategia)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu projeto</title>

  <!-- 1. Fonte padrao (OBRIGATORIO) -->
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- 2. Normalize (OBRIGATORIO — o framework conta com ele) -->
  <link rel="stylesheet" href="/css/normalize.css">

  <!-- 3. Framework CSS compilado (OBRIGATORIO) -->
  <link rel="stylesheet" href="/css/framework.css">

  <!-- 4. Paleta (opcional, mas recomendado para classes .paleta-{eixo}-{nivel}) -->
  <link rel="stylesheet" href="/css/paleta.css">

  <!-- 5. CSS especifico do seu projeto (SEMPRE DEPOIS do framework) -->
  <link rel="stylesheet" href="/css/meu-projeto.css">
</head>
<body>
  <!-- conteudo ... -->
</body>
</html>
```

### Estrutura minima de pagina HTML usando o framework

```html
<!-- ========== NAVBAR (se o projeto tiver menu) ========== -->
<div class="linhaDoGrid navbar">
  <input type="checkbox" class="hamburgerCheckbox" id="Hamburger1">
  <div class="hamburgerDisplayButton">
    <label for="Hamburger1" class="hamburgerDisplayLines">
      <span></span><span></span><span></span>
    </label>
  </div>
  <div class="menusContainer">
    <div class="menu menuPrincipal D12T9M6">
      <div class="menuItem"><a href="#">Home</a></div>
      <div class="menuItem"><a href="#">Outra</a></div>
    </div>
  </div>
</div>

<!-- ========== CONTEUDO PRINCIPAL (UMA linhaDoGrid por "faixa horizontal") ========== -->
<div class="linhaDoGrid">
  <div class="panel D18T12M6">
    Conteudo que ocupa a largura inteira.
  </div>
</div>

<div class="linhaDoGrid">
  <div class="panel D9T6M6">Coluna esquerda</div>
  <div class="panel D9T6M6">Coluna direita</div>
</div>
```

### Icones SVG

**Duas formas de referenciar**:

1. **Via `<img>`** (simples, nao estilizavel por CSS):
```html
<img src="/icones/user.svg" alt="user" style="width:24px;height:24px">
```

2. **Inline via fetch** (estilizavel, recomendado):
```html
<span data-icon="user"></span>

<script>
document.querySelectorAll('[data-icon]').forEach(el => {
  const icon = el.getAttribute('data-icon');
  fetch('/icones/' + icon + '.svg')
    .then(r => r.text())
    .then(svg => { el.innerHTML = svg; });
});
</script>
```

**80 icones disponiveis** (ver listagem completa em [secao 4.13](#413-icones-svg)).

---

## 3. Sistema de Grid `D{n}T{n}M{n}` — REGRAS CRITICAS

> **Esta e a parte mais importante do framework.** Violar qualquer uma destas regras gera
> layout quebrado, scroll lateral ou falha de responsividade. Claude Code DEVE respeitar
> estas regras em 100% dos HTMLs gerados.

**Arquivo fonte**: `public/less-src/Estruturas/Grid/grid.less`

### 3.1 Conceito fundamental: `.linhaDoGrid`

`.linhaDoGrid` e o **container macro de UMA linha do layout**. Cada `.linhaDoGrid`
representa uma **faixa horizontal** da pagina, ocupando sempre `calc(100vw - scrollbar)`.

```less
.linhaDoGrid {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start !important;

  @media (min-width: 992px) { width: calc(100vw - 20px + 3px); }  /* Desktop */
  @media (min-width: 768px) and (max-width: 992px) { width: calc(100vw - 20px); }  /* Tablet */
  @media (max-width: 768px) { width: calc(100vw - 1px); }  /* Mobile */
}
```

### 3.2 Tabela de breakpoints

| Breakpoint | Largura            | Colunas | Gutter (`EntreColuna`) | Scrollbar |
|------------|--------------------|--------:|-----------------------:|----------:|
| **Desktop**| `> 992px`          |  **18** | `12px`                 | `20px`    |
| **Tablet** | `768px - 992px`    |  **12** | `10px`                 | `20px`    |
| **Mobile** | `< 768px`          |   **6** | `8px`                  | `1px`     |

**Notas importantes**:
- Tablet tambem e ativado em qualquer dispositivo com `hover: none` (touch) e largura >= 768.
  Isso significa que tablets grandes em landscape podem cair no breakpoint Tablet mesmo > 992px.
- Mobile e qualquer `< 768px`.

### 3.3 Classes `D{n}T{n}M{n}` — quantas colunas ocupar

**Sintaxe**: `D<colsDesktop>T<colsTablet>M<colsMobile>`

- `D{n}`: quantas das **18** colunas no Desktop
- `T{n}`: quantas das **12** colunas no Tablet
- `M{n}`: quantas das **6** colunas no Mobile

**Valores validos**:
- `D`: 0 a 18
- `T`: 0 a 12
- `M`: 0 a 6

**Exemplos de uso real do showcase**:

| Classe       | Desktop          | Tablet           | Mobile            | Uso tipico                          |
|--------------|------------------|------------------|-------------------|--------------------------------------|
| `D18T12M6`   | 100% (18/18)     | 100% (12/12)     | 100% (6/6)        | Conteudo que ocupa a linha inteira   |
| `D9T6M6`     | 50% (9/18)       | 50% (6/12)       | 100% (6/6)        | 2 colunas desktop/tablet, 1 mobile   |
| `D6T4M2`     | 33% (6/18)       | 33% (4/12)       | 33% (2/6)         | 3 colunas em todos os breakpoints    |
| `D3T2M1`     | 16% (3/18)       | 16% (2/12)       | 16% (1/6)         | 6 colunas em todos                   |
| `D2T2M2`     | 11% (2/18)       | 16% (2/12)       | 33% (2/6)         | Colunas duplas que crescem no mobile |
| `D1T1M1`     | 5.5% (1/18)      | 8% (1/12)        | 16% (1/6)         | 1 coluna minima — 18/12/6 por linha  |

**Comportamento visual** (validado em `print_screens/doc-grid-18cols-base.png`):
- No **Desktop** (1440px): 18 panels `D1T1M1` cabem em 1 linha horizontal.
- No **Tablet** (800px): quebra em **2 linhas de 12 + 6** (ver `doc-grid-tablet-12col.png`).
- No **Mobile** (412px): quebra em **3 linhas de 6 + 6 + 6** (ver `doc-grid-mobile-6col.png`).

### 3.4 Ocultar elementos por breakpoint (valor `0`)

Colocar `0` em qualquer dimensao equivale a `display: none !important` naquele breakpoint.

| Classe       | Desktop | Tablet  | Mobile  | Uso                                   |
|--------------|:-------:|:-------:|:-------:|---------------------------------------|
| `D1T1M0`     | visivel | visivel | oculto  | Esconde no mobile                     |
| `D1T0M0`     | visivel | oculto  | oculto  | Aparece so no desktop                 |
| `D0T1M1`     | oculto  | visivel | visivel | Esconde no desktop (raro)             |
| `D0T0M0`     | oculto  | oculto  | oculto  | Oculto em tudo (usado p/ compensar offset) |

### 3.5 Offset (deslocamento) — `desloc-D{n}T{n}M{n}`

Classe **adicional** (aplicada junto com `D{n}T{n}M{n}`) que empurra o elemento N colunas
a direita, deixando um espaco vazio antes dele.

```html
<!-- Pular a 1a coluna -->
<div class="panel D1T1M1 desloc-D1T1M1">1</div>
<div class="panel D1T1M1">2</div>
...
```

**Importante**: como o offset ocupa espaco no grid, **REMOVA um elemento equivalente do final**
(tipicamente marcando com `D0T0M0`) para nao quebrar a contagem da linha. Ver
`print_screens/doc-grid-duplas-offset.png`.

**Offset independente por breakpoint**:
```html
<!-- Empurra 2 cols no Desktop, 1 col no Tablet, 0 col no Mobile -->
<div class="panel D4T3M2 desloc-D2T1M0">Conteudo</div>
```

### 3.6 Ordenacao via `item-N` (CSS flex order)

Classes `item-1` ate `item-30` reordenam VISUALMENTE os elementos sem alterar o HTML.

```html
<div class="linhaDoGrid">
  <div class="panel D6T4M2 item-2">HTML 1 — exibe como 2o</div>
  <div class="panel D6T4M2 item-3">HTML 2 — exibe como 3o</div>
  <div class="panel D6T4M2 item-1">HTML 3 — exibe como 1o</div>
</div>
```

**Uso tipico**: mover elementos importantes para o topo no mobile sem reescrever o HTML.
**Limite**: 30 slots (`@SlotsOrdenadores: 30` em `Variaveis.less`).

### 3.7 Containers estruturais — `.containerEmColuna` e `.containerEmLinha`

| Container            | Direcao | Quando usar                                                   |
|----------------------|---------|----------------------------------------------------------------|
| `.containerEmColuna` | Vertical| Agrupar varios elementos empilhados dentro de 1 "slot" do grid |
| `.containerEmLinha`  | Sub-grid| Criar um mini-grid horizontal com gutter compensado           |

**`.containerEmColuna`** recebe sua propria classe `D{n}T{n}M{n}` que define sua largura
no grid pai, e seus filhos sao empilhados verticalmente:

```html
<div class="linhaDoGrid">
  <!-- 3 panels simples -->
  <div class="panel D3T2M1">A</div>
  <div class="panel D3T2M1">B</div>

  <!-- containerEmColuna ocupa 1 slot de 3 cols, empilha 3 cards -->
  <div class="D3T2M1 containerEmColuna">
    <div class="panel D3T2M1">Card 1</div>
    <div class="panel D3T2M1">Card 2</div>
    <div class="panel D3T2M1">Card 3</div>
  </div>

  <!-- mais panels depois -->
  <div class="panel D3T2M1">C</div>
</div>
```

**`.containerEmLinha`** cria um sub-grid horizontal. Usa margens negativas compensatorias
(`-@EntreColuna_Desktop / 2`) para alinhar com o grid pai.

```html
<div class="linhaDoGrid">
  <div class="D9T6M3 containerEmColuna">
    <div class="containerEmLinha">
      <div class="panel D3T6M3">Wrap 1</div>
      <div class="panel D3T6M3">Wrap 2</div>
      <div class="panel D3T6M3">Wrap 3</div>
    </div>
  </div>
</div>
```

**Modificadores de wrap** (aplicaveis em `.containerEmLinha`):

| Classe      | Efeito                                                        |
|-------------|---------------------------------------------------------------|
| `.nowrap`   | `flex-wrap: nowrap` em todos breakpoints                      |
| `.D-nowrap` | `flex-wrap: nowrap` so no Desktop                             |
| `.T-nowrap` | `flex-wrap: nowrap` so no Tablet                              |
| `.M-nowrap` | `flex-wrap: nowrap` so no Mobile                              |

### 3.8 REGRAS CRITICAS — LEIA ANTES DE ESCREVER HTML

#### **Regra #1 (a mais importante): NUNCA aninhar `.linhaDoGrid`**

```html
<!-- ERRADO — ERRO CRITICO -->
<div class="linhaDoGrid">
  <div class="linhaDoGrid">   <!-- NAO FAZER -->
    <div class="panel D6T4M2">...</div>
  </div>
</div>
```

**Por que**: `.linhaDoGrid` tem `width: calc(100vw - scrollbar)` — se aninhado, o filho
estoura o pai e **gera scroll lateral**. As colunas filhas calculam largura com base em
`100vw`, nao no container pai.

**Alternativa**: use `.containerEmColuna` (vertical) ou `.containerEmLinha` (sub-grid).

```html
<!-- CORRETO -->
<div class="linhaDoGrid">
  <div class="D6T4M2 containerEmColuna">
    <div class="panel D6T4M2">...</div>
  </div>
</div>
```

#### **Regra #2: Uma `.linhaDoGrid` = uma faixa horizontal da pagina**

Uma pagina tipica tem **varias `.linhaDoGrid` sequenciais** (nao aninhadas) — uma para
cada faixa do layout.

```html
<!-- CORRETO: faixas sequenciais -->
<div class="linhaDoGrid">...hero...</div>
<div class="linhaDoGrid">...features...</div>
<div class="linhaDoGrid">...footer...</div>
```

#### **Regra #3: Sempre declarar D + T + M juntos**

Nao usar so `D6` ou so `T3`. O framework gera classes com os 3 breakpoints juntos.

```html
<!-- ERRADO — classe nao existe -->
<div class="panel D6">...</div>

<!-- CORRETO — sempre os 3 -->
<div class="panel D6T4M2">...</div>
```

#### **Regra #4: Valores devem ser validos (<=18/12/6)**

`D19T1M1`, `D1T13M1`, `D1T1M7` **NAO EXISTEM** no CSS gerado. O framework so gera classes
ate o limite de cada breakpoint.

#### **Regra #5: Ao usar offset, compensar no final**

Quando aplicar `desloc-*`, remover um elemento equivalente do final com `D0T0M0` para
manter a contagem de colunas correta na linha.

#### **Regra #6: `.containerEmColuna` tambem recebe classe de coluna**

```html
<!-- ERRADO — containerEmColuna sem classe de coluna nao ocupa espaco definido -->
<div class="linhaDoGrid">
  <div class="containerEmColuna">   <!-- FALTA D/T/M -->
    <div class="panel">...</div>
  </div>
</div>

<!-- CORRETO -->
<div class="linhaDoGrid">
  <div class="D6T4M2 containerEmColuna">
    <div class="panel D6T4M2">...</div>
  </div>
</div>
```

### 3.9 Screenshots de referencia (validados em producao)

Todos os screenshots abaixo foram gerados a partir de `https://framework-css.sistema.cloud`
com o framework limpo (sem overrides), no dia 2026-04-08. Caminhos absolutos:

- **Grid base 18 cols**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-grid-18cols-base.png`
- **Grid duplas + offset**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-grid-duplas-offset.png`
- **Ordenacao + containers**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-ordenacao-containers.png`
- **Grid misto (filhos + containerEmColuna)**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-grid-misto.png`
- **Grid em Tablet (12 cols)**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-grid-tablet-12col.png`
- **Grid em Mobile (6 cols)**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-grid-mobile-6col.png`

---

## 4. Catalogo de Componentes

Cada componente abaixo segue a estrutura: **classe principal**, **o que faz**, **HTML
pronto**, **variaveis LESS relevantes**, **variantes**, **pegadinhas**.

### 4.1 `.panel` — Caixa/cartao basico

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/panels.less`

**O que faz**: Aplica borda arredondada, padding interno, sombra e background branco.
Uso universal para qualquer caixa de conteudo.

**Screenshot**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-grid-18cols-base.png`

**HTML pronto**:
```html
<div class="linhaDoGrid">
  <div class="panel D18T12M6">
    Conteudo do painel
  </div>
</div>
```

**Variaveis relevantes** (definidas em `Variaveis.less`, customizaveis):

| Variavel                     | Tipo | Default | Efeito                                |
|-----------------------------|------|---------|----------------------------------------|
| `@PaddingTop_Desktop`        | size | `4px`   | Padding superior desktop               |
| `@PaddingRight_Desktop`      | size | `6px`   | Padding direito desktop                |
| `@RaioBordaEsquerdaSuperior_Desktop` | size | `5px` | Raio da borda superior esquerda |
| `@EspessuraDaBorda_Desktop`  | size | `1px`   | Espessura da borda desktop             |
| (mesmas variaveis para `_Tablet` e `_Mobile`) | — | — | Valores menores por breakpoint |

**Comportamento responsivo**: O `.panel` chama `.sombreamento(Desktop/Tablet/Mobile)`,
`.bordaArredondada(Desktop/Tablet/Mobile)` e `.padding(Desktop/Tablet/Mobile)` dentro de
media queries, entao os valores mudam automaticamente por breakpoint.

### 4.2 `.navbar` + estrutura completa de menu

**Arquivo**: `public/less-src/Estruturas/Elementos/NavBars/Navbar.less` (780 linhas)

**O que faz**: Barra de navegacao completa com menu principal/secundario, submenus
dropdown, hamburger automatico no mobile (100% CSS, sem JS), login social integrado.

**Screenshot Desktop**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-navbar-desktop.png`
**Screenshot Mobile com hamburger**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-navbar-mobile-hamburger.png`

**HTML pronto** (extraido do showcase):
```html
<div class="linhaDoGrid navbar">
  <input type="checkbox" class="hamburgerCheckbox" id="Hamburger1"/>
  <div class="hamburgerDisplayButton">
    <label for="Hamburger1" class="hamburgerDisplayLines">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  <div class="menusContainer">
    <div class="menu menuPrincipal D12T9M6">
      <div class="menuItem">
        <a href="#"><span class="iconMenu" data-icon="home"></span> Home</a>
      </div>
      <div class="menuItem">
        Jobs
        <div class="subMenu">
          <div class="subMenuItem titulo">Ultimos jobs acessados</div>
          <div class="subMenuItem"><a href="#">Job 1</a></div>
          <div class="subMenuItem paginaAtual"><a href="#">Job 3</a></div>
          <div class="subMenuItem inativo"><a href="#">Job 5</a></div>
        </div>
      </div>
      <div class="menuItem inativo">Timesheet</div>
    </div>
    <div class="menu menuSecundario D6T3M6">
      <div class="menuItem">
        <a href="#">Meus Dados</a>
        <div class="subMenu">
          <div class="subMenuItem titulo">Login via email e senha</div>
          <div class="subMenuItem">
            <div class="containerItemFormComIcone">
              <input type="text" class="itemForm input" placeholder="E-mail" />
              <span data-icon="mail"></span>
            </div>
          </div>
          <div class="subMenuItem">
            <div class="containerItemFormComIcone">
              <input type="password" class="itemForm input" placeholder="Password" />
              <span data-icon="lock"></span>
            </div>
          </div>
          <div class="subMenuItem containerExternoBotoesSubmenu">
            <div class="containerInternoBotoesSubmenu">
              <div class="itemForm esqueciSenha"><a href="#">Esqueci minha senha</a></div>
            </div>
            <div class="containerInternoBotoesSubmenu">
              <input type="button" class="itemForm bt btEntrar" value="entrar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Classes principais**:

| Classe                    | Funcao                                                             |
|---------------------------|---------------------------------------------------------------------|
| `.navbar`                 | Modificador de `.linhaDoGrid` com gradiente, sombra, altura fixa    |
| `.hamburgerCheckbox`      | Input checkbox oculto (controla menu mobile via CSS)                |
| `.hamburgerDisplayButton` | Botao hamburguer (aparece so < 768px)                               |
| `.hamburgerDisplayLines`  | 3 linhas do botao hamburger                                         |
| `.menusContainer`         | Container flex que agrupa menuPrincipal + menuSecundario            |
| `.menu.menuPrincipal`     | Menu da esquerda (gradiente `@CorPrimaria`)                         |
| `.menu.menuSecundario`    | Menu da direita (gradiente `@CorSecundaria`)                        |
| `.menuItem`               | Item individual do menu                                             |
| `.menuItem.inativo`       | Cinza, sem cursor pointer, sem hover                                |
| `.menuItem.paginaAtual`   | Destaque visual indicando pagina ativa                              |
| `.subMenu`                | Dropdown flyout (aparece no hover)                                  |
| `.subMenuItem`            | Item do submenu                                                     |
| `.subMenuItem.titulo`     | Cabecalho nao clicavel dentro do submenu                            |
| `.subMenuItem.paginaAtual`| Item ativo do submenu                                               |
| `.iconMenu`               | Container de icone SVG ao lado do texto do menuItem                 |
| `.containerExternoBotoesSubmenu` | Wrapper flex row para botoes lado a lado no submenu         |
| `.containerInternoBotoesSubmenu` | Wrapper interno de cada botao                                |
| `.btEntrar`               | Botao "Entrar" estilizado (navbar secundaria)                       |
| `.esqueciSenha`           | Link "Esqueci senha" estilizado (sem borda, sublinhado)             |

**Variaveis relevantes**:
- `@AlturaLinhaNavbar_Desktop` (48px), `_Tablet` (42px), `_Mobile` (36px)
- `@CorFonteNavbar` (branco), `@FontFamilyNavbar` (Raleway), `@FontWeightNavbar` (bold)
- `@TamanhoTextoNavbar_Desktop` (20px), `_Tablet` (18px), `_Mobile` (16px)
- `@MargemSuperiorNavbar_Desktop` (10px), `@MargemInferiorNavbar_Desktop` (12px)
- `@VelocidadeTransicaoItemMenu` (0.5s), `@TipoTransicaoItemMenu` (ease)
- `@PaddingLeftMenuItem_Desktop` (10px), demais padding por breakpoint
- `@AlinhamentoTextoMenuItem_Desktop` (center), `_Mobile` (right)

**Hamburger mobile**: O comportamento de mostrar/ocultar menu no mobile e **100% CSS**,
usando um `<input type="checkbox">` oculto + `~ selector` para aplicar `transform:
scaleY(1)` no `.menusContainer` quando checked. Nao requer JS. As 3 linhas do botao
viram um X via `rotate(45deg)/(-45deg)` quando o checkbox e marcado.

**Pegadinha** (ver [secao 10](#bug-display-block-menuitem)): `.menuItem` tem `display:
block` explicito para sobrescrever o `normalize.less` global que faz
`div { display: flex; }`. Sem isso, `text-align` nao funciona no `.menuItem`.

### 4.3 `.itemForm` + `.input` + formularios

**Arquivos**:
- `public/less-src/Estruturas/Elementos/Formularios/elementosTotais.less` (`.itemForm`)
- `public/less-src/Estruturas/Elementos/Formularios/inputs.less` (`.input`)
- `public/less-src/Estruturas/Elementos/Formularios/iconesForm.less` (`.containerItemFormComIcone`)
- `public/less-src/Estruturas/Elementos/Formularios/titulos.less` (`.tituloForm`)
- `public/less-src/Estruturas/Elementos/Formularios/passos.less` (`.passos`, `.passoCompleto`, `.passoFuturo`)
- `public/less-src/Estruturas/Elementos/Formularios/botoes.less` (`.bt`)

**O que fazem**:
- `.itemForm`: dimensoes responsivas (altura, padding, borda, margens) para qualquer input/botao
- `.input`: estilos de placeholder, focus, cor cinza para input vazio
- `.containerItemFormComIcone`: wrapper `position: relative` para posicionar um SVG dentro do input
- `.tituloForm`: barra de titulo com gradiente da cor primaria
- `.passos` + `.passoCompleto` + `.passoFuturo`: wizard de etapas
- `.bt`: botao generico (background terciario, hover com gradiente)

**Screenshot**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-formulario-completo.png`

**HTML pronto — Input simples com icone**:
```html
<div class="linhaDoGrid">
  <div class="D6T3M2 containerEmColuna">
    <div class="containerItemFormComIcone">
      <input type="text" class="itemForm input" placeholder="E-mail" autocomplete="on" />
      <span data-icon="user"></span>
    </div>
  </div>
</div>
```

**HTML pronto — Formulario completo com passos, titulo e painel**:
```html
<!-- 1. Indicador de passos -->
<div class="D12T10M6 desloc-D3T1M0 containerEmLinha passos">
  <p>Passos para criacao de usuario</p>
  <div class="passoCompleto">
    <div>1</div>
    <div><span data-icon="check"></span></div>
  </div>
  <div>   <!-- sem modificador = passo atual -->
    <div>2</div>
    <div><span data-icon="check"></span></div>
  </div>
  <div class="passoFuturo">
    <div>3</div>
    <div><span data-icon="check"></span></div>
  </div>
</div>

<!-- 2. Titulo do formulario (gradiente + borda superior arredondada) -->
<div class="D12T10M6 desloc-D3T1M0 tituloForm arredondadaSuperior">Dados para acesso</div>

<!-- 3. Painel de campos (borda inferior arredondada, formando conjunto com o titulo) -->
<div class="linhaDoGrid">
  <div class="panel D12T10M6 desloc-D3T1M0 containerEmColuna arredondadaInferior">
    <div class="containerItemFormComIcone">
      <input type="text" class="itemForm input" placeholder="E-mail" autocomplete="on" />
      <span data-icon="mail"></span>
    </div>
    <div class="containerItemFormComIcone">
      <input type="password" class="itemForm input" placeholder="Senha" autocomplete="off" />
      <span data-icon="lock"></span>
    </div>
    <input type="button" class="itemForm bt btEntrar" value="Entrar" />
  </div>
</div>
```

**Classes auxiliares**:
- `.arredondadaSuperior`: aplica `border-top-*-radius` zero (para o elemento colar no de
  baixo)
- `.arredondadaInferior`: aplica `border-bottom-*-radius` zero (para colar com o de cima)

**Variaveis relevantes**:
- `@AlturaLinhaPadrao_Desktop` (46px), `_Tablet` (40px), `_Mobile` (36px)
- `@margemTop/Right/Bottom/Left_ItemForm_*`
- `@tamanhoIcone_Desktop/Tablet/Mobile` (derivado automaticamente)
- `@PaddingLeftInputIcone_*` (compensa o espaco do icone no input)

### 4.4 `.bt` — Botao basico

**Arquivo**: `public/less-src/Estruturas/Elementos/Formularios/botoes.less`

**O que faz**: Background `@CorTercearia` (cinza claro), cor preta, hover com gradiente.

**HTML pronto**:
```html
<button class="itemForm bt">Clique aqui</button>
<!-- ou -->
<input type="button" class="itemForm bt" value="Clique aqui" />
```

**Variantes** (definidas em outros arquivos):
- `.btEntrar` — botao "Entrar" com borda preta e gradiente secundario (ver `Especificos.less`)
- Aplicavel junto: `.arredondadaSuperior`, `.arredondadaInferior`

**Pegadinha**: O `.bt` e sempre usado em conjunto com `.itemForm` para ter dimensoes
responsivas. `.bt` sozinho so aplica cor, nao dimensoes.

### 4.5 `.passos` + `.passoCompleto` + `.passoFuturo`

**Arquivo**: `public/less-src/Estruturas/Elementos/Formularios/passos.less`

**O que faz**: Indicador visual de wizard (bolinhas numeradas com check). Estados:
- **Passo atual**: `<div>` sem modificador — colorido com gradiente primario
- **Passo completo**: `.passoCompleto` — mostra o icone de check
- **Passo futuro**: `.passoFuturo` — cinza, opaco

**HTML pronto** (ja mostrado acima em 4.3):
```html
<div class="D12T10M6 containerEmLinha passos">
  <p>Titulo dos passos</p>
  <div class="passoCompleto">
    <div>1</div>
    <div><span data-icon="check"></span></div>
  </div>
  <div>
    <div>2</div>
    <div><span data-icon="check"></span></div>
  </div>
  <div class="passoFuturo">
    <div>3</div>
    <div><span data-icon="check"></span></div>
  </div>
</div>
```

**Estrutura obrigatoria**:
- Wrapper `.passos` precisa ter `.containerEmLinha` e classe de coluna `D{n}T{n}M{n}`
- `<p>` opcional como titulo
- Cada passo e um `<div>` com exatamente 2 `<div>` filhos:
  - 1o filho: numero do passo (ex: `<div>1</div>`)
  - 2o filho: icone de check (ex: `<div><span data-icon="check"></span></div>`)

### 4.6 `.balloonTrigger` + `.balloonType-*` + `.balloonPosition-*`

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/messageBalloon.less` (1859 linhas)
**JS auxiliar (OBRIGATORIO)**: `public/js/messageBalloons.js`

**O que faz**: Balao de mensagem com triangulo apontando para um elemento ancora. Abre/
fecha por clique/tap (JS, qualquer device) ou por `:hover`/`:focus` (so Desktop **com
mouse REAL**, via CSS puro).

**Screenshot 3 tipos**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-balloons-3-tipos.png`

#### 4.6.1 Containers — escolha qual usar (IMPORTANTE)

Um balloon e `position: absolute`, portanto precisa de um ancestral proximo com
`position: relative` para se posicionar corretamente. O framework fornece **TRES**
classes de container distintas, cada uma com proposito claro. Claude Code DEVE escolher
a correta:

| Classe                          | `display`        | `width` | Proposito                                                                                                 |
|--------------------------------|------------------|---------|-----------------------------------------------------------------------------------------------------------|
| `.containerItemFormComIcone`   | block (flex herdado) + `position: relative` | `100%` | Hospedar um **ICONE SVG** POSICIONADO DENTRO do input. Nao foi feito para balloons. (`iconesForm.less`) |
| `.containerComBalloon`         | `inline-flex` + `align-items: center` + `position: relative` | auto (encolhe) | Hospedar BALLOON em **elemento de largura variavel/fixa** (botao, icone, link). Garante que o triangulo aponte para o elemento e nao para a borda da celula do grid. (`messageBalloon.less`) |
| `.containerItemFormComBalloon` | `flex` + `align-items: center` + `position: relative` | `100%`  | Hospedar BALLOON em **itemForm que ocupa a largura total da coluna** (inputs, selects, botoes full-width). (`messageBalloon.less`) |

**Regra de escolha** (usar a primeira que casar):
1. Se o trigger e um **input/itemForm que precisa preencher a coluna inteira** ->
   `.containerItemFormComBalloon`
2. Se o trigger e um **botao/icone/link de tamanho proprio** (o balloon deve encostar
   no elemento, nao na borda da celula) -> `.containerComBalloon`
3. Se for um input com **icone DENTRO do campo E SEM BALLOON** ->
   `.containerItemFormComIcone` (uso original, sem balloon)
4. Se precisar de **input com icone DENTRO E balloon**, combine as classes:
   `class="containerItemFormComBalloon containerItemFormComIcone"`

**Todas as tres** criam o positioning context (`position: relative`) necessario.

#### 4.6.2 Tipos (`.balloonType-*`)

| Classe                  | Cor de fundo                 | Uso                        |
|-------------------------|------------------------------|----------------------------|
| `.balloonType-Help`     | Cinza claro (`@CorTercearia`)| Dicas contextuais neutras  |
| `.balloonType-Atencao`  | Laranja (`@CorAtencao`)      | Avisos importantes         |
| `.balloonType-Erro`     | Vermelho (`@CorNegacao`)     | Erros e bloqueios          |

#### 4.6.3 Posicoes (`.balloonPosition-All-*`)

8 posicoes disponiveis:

- `-Top` (balao acima, triangulo embaixo)
- `-Bottom` (balao abaixo, triangulo em cima)
- `-Left` (balao a esquerda, triangulo a direita)
- `-Right` (balao a direita, triangulo a esquerda)
- `-TopLeft`, `-TopRight`, `-BottomLeft`, `-BottomRight` (diagonais)

Tambem existem `.balloonPosition-Desktop-*`, `-Tablet-*`, `-Mobile-*` para posicao
diferente por breakpoint (raramente usadas).

#### 4.6.4 Padroes canonicos de HTML (COPIE A ESTRUTURA CORRETA)

**Caso 1 — Balloon em botao/icone (container que se ajusta ao conteudo)**:
```html
<div class="D1T1M1 text_center">
  <div class="containerComBalloon">
    <button class="bt epica-bt-icone balloonTrigger" aria-label="Excluir">
      <span data-icon="trash"></span>
    </button>
    <span class="balloonType-Help balloonPosition-All-TopRight D2T3M3">
      Remover item permanentemente
    </span>
  </div>
</div>
```

**Caso 2 — Balloon em input/itemForm (container width 100%)**:
```html
<div class="D6T3M1">
  <div class="containerItemFormComBalloon">
    <input class="itemForm input balloonTrigger" placeholder="CPF" />
    <span class="balloonType-Atencao balloonPosition-All-Top D3T3M3">
      Digite apenas numeros (11 digitos).
    </span>
  </div>
</div>
```

**Caso 3 — Input com icone DENTRO do campo E balloon (classes combinadas)**:
```html
<div class="D6T3M1">
  <div class="containerItemFormComBalloon containerItemFormComIcone">
    <input type="email" class="itemForm input balloonTrigger" placeholder="E-mail" />
    <span data-icon="mail"></span>
    <span class="balloonType-Help balloonPosition-All-Left D3T2M1">
      Usaremos para enviar confirmacao.
    </span>
  </div>
</div>
```

**Caso 4 — Help icon isolado (circulo "?")**:
```html
<div class="D2T1M1">
  <div class="help-icon balloonTrigger">
    <span>?</span>
    <span class="balloonPosition-All-Right balloonType-Help D3T2M1">
      Texto de ajuda contextual
    </span>
  </div>
</div>
```

#### 4.6.5 Estrutura obrigatoria (regras)

1. **Container ancestral** com `position: relative`: use uma das 3 classes de 4.6.1, ou
   `.help-icon` (que ja aplica `position: relative` internamente). Nunca deixe o balloon
   solto na pagina.
2. **Trigger**: o elemento ancora (input, botao, icone) DEVE ter a classe
   `.balloonTrigger` — o JS usa essa classe para delegacao de eventos.
3. **Balao**: `<div>` ou `<span>` com **3 classes obrigatorias**:
   - `balloonPosition-All-<posicao>` (posicao)
   - `balloonType-<tipo>` (tipo)
   - `D{n}T{n}M{n}` (largura do balloon — sem isso ele nao tem tamanho definido)
4. **Relacao DOM**: o balao deve ser **filho direto** do trigger OU **irmao** (mesmo
   parent). O JS procura balloons em ambas direcoes via `getBalloonsOf(trigger)`.
5. **Nunca aninhe** um `.balloonTrigger` dentro de outro `.balloonTrigger` — o evento
   dispara no mais interno pelo `findTrigger()` subir o DOM.

#### 4.6.6 Comportamento CSS (fluxo de ativacao)

O estado ativo e controlado por **3 caminhos independentes**, cada um em um escopo
diferente:

| Caminho                       | Quando aplica                                             | Breakpoint       |
|-------------------------------|-----------------------------------------------------------|------------------|
| `.balloonTrigger:hover`       | Passar mouse sobre o trigger (so `.balloonType-Help`)     | Desktop + `(hover: hover)` |
| `.balloonTrigger:focus`       | Foco via teclado/Tab ou JS (`.focus()`)                   | Desktop          |
| `.balloonStatus-Ativo` (JS)   | JS aplica a classe apos `pointerdown`/tap/click           | Todos breakpoints |

Internamente o LESS extrai as transformacoes para um mixin reutilizavel
`.balloonAtivoTransforms()` (`messageBalloon.less:1707`), que e chamado nos 3 caminhos.

**Por que `:hover` esta em `@media (min-width: @Res_Desktop) and (hover: hover)`**:
em touch devices o `:hover` e "sticky" — um tap deixa o estado :hover ativo ate o
proximo tap em outro elemento. Filtrar por `(hover: hover)` isola mouse real e evita
balloons aparecendo sozinhos em tablets/mobiles.

#### 4.6.7 `pointer-events: none` em balloons fechados (CRITICO para touch)

O mixin `.balloon` aplica `pointer-events: none` por default
(`messageBalloon.less:77`). A regra `.balloonStatus-Ativo { pointer-events: auto !important; }`
(linha 92) restaura a interatividade SO quando o balloon esta visivel.

**Por que e necessario**: mesmo fechado (com `transform: scaleY(0.001)` + `opacity: 0`),
o balloon continua ocupando largura do `D{n}T{n}M{n}` no DOM. Em touch devices, a area
de hit-test do dedo pode arredondar para esse elemento "invisivel" e abri-lo por
acidente. O `pointer-events: none` impede qualquer intercepcao enquanto o balloon
estiver fechado. O `!important` e **obrigatorio** porque cada regra `.balloonPosition-*`
re-aplica `.balloon;` com mesma specificity (0,1,0) e ordem posterior — sem `!important`
perderia a ultima cascata.

#### 4.6.8 Variaveis relevantes (customizaveis por tipo)

- `@CorFundoMessageballoonHelp/Atencao/Erro`
- `@CorBordaMessageballoonHelp/Atencao/Erro`
- `@CorFonteMessageballoonHelp/Atencao/Erro`
- `@TamanhoTextoHelp/Atencao/Erro_Desktop/Tablet/Mobile`
- `@PaddingTop/Right/Bottom/LeftMessageballoonHelp/Atencao/Erro_Desktop/Tablet/Mobile`
- `@RaioBordaMessageballoonHelp/Atencao/Erro_Desktop/Tablet/Mobile`
- `@AlturaLinhaPadrao_Desktop/Tablet/Mobile` (aplicado como `line-height` em cada tipo
  por breakpoint desde 2026-04-11)

#### 4.6.9 JS — ver [secao 9.1](#91-balloons-messageballoonsjs-reescrito-2026-04-11)

**Script obrigatorio**: `<script src="/js/messageBalloons.js" defer></script>`. Se o
projeto nao incluir esse script, balloons NAO abrem em touch devices. No Desktop, so
funcionariam via `:hover`/`:focus`.

### 4.7 `.modalBackground` + `.modalBox`

**Arquivo**: `public/less-src/Estruturas/Elementos/Modal/Modal.less`

**O que faz**: Overlay fullscreen semi-transparente com caixa de dialogo centralizada
verticalmente.

**HTML pronto**:
```html
<div class="modalBackground">
  <div class="modalBox">
    Conteudo do modal (texto, formulario, botoes etc)
  </div>
</div>
```

**Classe auxiliar**:
- `.modalLoader`: pequeno loader (tamanho = `@TamanhoPadraoTexto_*`) para usar dentro do modal

**Comportamento**: `.modalBackground` tem `position: fixed`, `z-index: 50000` e cobre
`100vw/100vh`. `.modalBox` e `position: absolute`, `top: 50%`, `transform: translate(0%,
-50%)` para centralizar verticalmente.

**Importante**: A exibicao/ocultacao do modal e responsabilidade do **JS da sua aplicacao**
(adicionar/remover o `.modalBackground` do DOM, ou controlar `display`). O framework so
fornece os estilos.

### 4.8 `.containerbtFacebook` e `.containerbtGoogle`

**Arquivo**: `public/less-src/Estruturas/Elementos/Social_Login_Buttons/Botoes_LoginSocial.less`

**O que faz**: Botoes de login social com cores oficiais das marcas e icones SVG embutidos.

**HTML pronto — Facebook**:
```html
<div class="containerItemFormComIcone containerbtFacebook">
  <input type="button" class="itemForm bt" value="" />
  <div>Login com Facebook</div>
  <span data-icon="facebookbutton"></span>
</div>
```

**HTML pronto — Google**:
```html
<div class="containerItemFormComIcone containerbtGoogle">
  <input type="button" class="itemForm bt" value="" />
  <div>Login com Google</div>
  <span data-icon="googlebutton"></span>
</div>
```

**Caracteristicas**:
- `.containerbtFacebook`: fundo `#4267b2` (azul Facebook), texto branco, icone branco
- `.containerbtGoogle`: fundo branco, texto cinza (`rgba(0,0,0,0.54)`), logo Google com
  4 cores originais (amarelo, vermelho, verde, azul — via `:nth-of-type(1..4)`)
- Ambos com `min-width: 200px` e altura responsiva compensando margens do `.itemForm`

### 4.9 `.spanDesktop` / `.spanTablet` / `.spanMobile`

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/textos_especificos_por_breakpoint.less`

**O que faz**: Exibe conteudo de texto **diferente** por breakpoint (nao apenas com
tamanho diferente).

**HTML pronto**:
```html
<div class="panel D18T12M6">
  Voce esta vendo:
  <span class="spanDesktop"><b>DESKTOP (&gt;992px)</b></span>
  <span class="spanTablet"><b>TABLET (768-992px)</b></span>
  <span class="spanMobile"><b>MOBILE (&lt;768px)</b></span>
</div>
```

**Uso tipico**: "Adicionar ao carrinho" (desktop) vs "+ Carrinho" (mobile). Todos os
spans existem no DOM (bom para SEO), mas so um e visivel por vez via `display: none`.

### 4.10 `.containerEmColuna` / `.containerEmLinha`

Ja documentado extensivamente em [secao 3.7](#37-containers-estruturais--containerecoluna-e-containerelinha).

### 4.11 `.arredondadaSuperior` / `.arredondadaInferior`

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/bordas.less`

**O que faz**: Remove o raio da borda superior ou inferior para "colar" elementos
verticalmente.

**HTML pronto**:
```html
<!-- Titulo colado no painel abaixo -->
<div class="D12T10M6 tituloForm arredondadaSuperior">Titulo</div>

<div class="linhaDoGrid">
  <div class="panel D12T10M6 containerEmColuna arredondadaInferior">
    Conteudo do painel
  </div>
</div>
```

### 4.12 Classes de cor semantica

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/paleta.less`

**O que faz**: Aplica cor como `background-color` no elemento E como `border-color`
apenas no pseudo-elemento `:after`, via mixin `.corPaleta()`. Isso permite colorir
balloons inteiros (fundo + preenchimento da setinha via `:after`) em uma unica classe,
mantendo o contorno da setinha (`:before`) com a cor original.

**Screenshot**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-cores-semanticas.png`

| Classe            | Cor base            | Uso                          |
|-------------------|---------------------|------------------------------|
| `.primaria`       | `@CorPrimaria`      | Cor principal de marca       |
| `.secundaria`     | `@CorSecundaria`    | Cor secundaria de marca      |
| `.terciaria`      | `@CorTercearia`     | Cinza neutro                 |
| `.corAtencao`     | `@CorAtencao`       | Laranja — alertas            |
| `.corNegacao`     | `@CorNegacao`       | Vermelho — erros             |
| `.corPositivacao` | `@CorPositivacao`   | Verde — sucessos             |

**HTML**:
```html
<div class="linhaDoGrid">
  <div class="D12T6M2 corNegacao">Cor Negacao (erro)</div>
  <div class="D12T6M2 corAtencao">Cor Atencao (aviso)</div>
  <div class="D12T6M2 corPositivacao">Cor Positivacao (sucesso)</div>
</div>
```

**Aplicado em balloons**:
```html
<!-- .paleta-4-4 colore fundo E preenchimento da setinha do balloon, -->
<!-- preservando o contorno (cor original do .balloonType-Help). -->
<span class="balloonType-Help balloonPosition-All-Top paleta-4-4 D3T2M1">
  Texto do balloon com fundo verde claro
</span>
```

Ver [secao 5.3](#53-mixin-corpaleta-aplicacao-automatica-em-after) para detalhes do
mixin `.corPaleta()` e como criar paletas proprias.

### 4.13 Icones SVG

**Localizacao**: `public/icones/*.svg` (80 arquivos)
**Endpoint API**: `GET /api/icons` (lista), `GET /api/icon/:nome` (SVG individual)

**Screenshot**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-icones-grid.png`

**Lista completa dos 80 icones disponiveis**:

```
add, add-alt, attachment, bell, bookmark, bubble, calendar, camera, cart, chart,
check, clock, cloud, creditcard, cross, cross-alt, crosshair, delete, delete-alt,
denied, document, down, edit, error, exit, eye, facebook, facebookbutton, filter,
flag, folder, fullscreen, gear, gift, globe, googlebutton, grid, group, heart,
help, home, info, join, left, list, location, lock, mail, move, music, navigation,
phone, play, power, print, refresh, reply, right, rss, screen, share, share-alt,
sliders, smartphone, speaker, split, star, tag, thumbs-down, thumbs-up, trash,
twitter, unlock, up, user, video, video-alt, warning, wrench, zoom
```

**Uso**: ver [secao 2 — Icones SVG](#icones-svg).

### 4.14 `.tituloForm_subTitulo_1` / `_2` / `_3` — Subtitulos do tituloForm

**Arquivo**: `public/less-src/Estruturas/Elementos/Formularios/subtitulos.less`

**O que faz**: Tres niveis de subtitulo para usar como `<span>` dentro de `.tituloForm`.
Herda a cor branca do pai (tituloForm) e ajusta tamanho, peso e opacidade.

**HTML pronto**:
```html
<div class="D18T12M6 tituloForm">
  Titulo principal
  <span class="tituloForm_subTitulo_1">Subtitulo grande</span>
</div>

<div class="D18T12M6 tituloForm">
  Titulo
  <span class="tituloForm_subTitulo_2">Descricao curta</span>
</div>

<div class="D18T12M6 tituloForm">
  Titulo
  <span class="tituloForm_subTitulo_3">Nota/hint</span>
</div>
```

**Variaveis relevantes**:
- `@TamanhoSubTitulo1/2/3_Desktop/Tablet/Mobile` — tamanho de fonte
- `@FontWeightSubTitulo1/2/3` — peso (normal, 300, 300)
- `@OpacidadeSubTitulo1/2/3` — opacidade (0.85, 0.75, 0.65)
- `@MargemEsquerdaSubTitulo1/2/3` — margem esquerda (10px, 8px, 6px)

### 4.15 `.badge` — Pilulas coloridas de status

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/badges.less`

**O que faz**: Tag/pilula colorida para status, roles, categorias. Inline-flex com
border-radius responsivo.

**HTML pronto**:
```html
<span class="badge">Neutro</span>
<span class="badge badgePrimario">Primario</span>
<span class="badge badgePositivo">Ativo</span>
<span class="badge badgeNegativo">Inativo</span>
<span class="badge badgeAtencao">Pendente</span>
<span class="badge badgeInfo">Info</span>
```

**Variantes**:

| Classe           | Cor de fundo                    | Uso                  |
|------------------|---------------------------------|----------------------|
| `.badge`         | `@CorTercearia` (cinza)         | Neutro/default       |
| `.badgePrimario` | `@CorPrimaria` (ciano)          | Destaque principal   |
| `.badgePositivo` | `@CorPositivacao` (verde)       | Sucesso, ativo       |
| `.badgeNegativo` | `@CorNegacao` (vermelho)        | Erro, inativo        |
| `.badgeAtencao`  | `@CorAtencao` (laranja)         | Aviso, pendente      |
| `.badgeInfo`     | `@CorPrimaria` clarificada 20%  | Informacao           |

**Variaveis relevantes**:
- `@BadgePadding_Desktop/Tablet/Mobile`, `@BadgeFontSize_*`, `@BadgeBorderRadius_*`
- `@BadgeFontWeight` (600), `@BadgeCorFundo`, `@BadgeCorFonte`

### 4.16 `.mensagemInline` — Mensagens de feedback

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/mensagensInline.less`

**O que faz**: Barra horizontal de feedback (sucesso, erro, aviso, info). Diferente dos
balloons (posicionados via trigger) — as mensagens inline sao barras fixas no fluxo.

**HTML pronto**:
```html
<div class="mensagemInline mensagemPositiva">Operacao realizada com sucesso!</div>
<div class="mensagemInline mensagemNegativa">Erro ao salvar dados.</div>
<div class="mensagemInline mensagemAtencao">Atencao: preencha todos os campos.</div>
<div class="mensagemInline mensagemInfo">Dica: voce pode usar atalhos de teclado.</div>
```

**Variantes**:

| Classe              | Cor de fundo/borda/fonte          | Uso            |
|---------------------|-----------------------------------|----------------|
| `.mensagemPositiva` | Verde (`@CorPositivacao` fade 20%) | Sucesso        |
| `.mensagemNegativa` | Vermelho (`@CorNegacao` fade 20%)  | Erro           |
| `.mensagemAtencao`  | Laranja (`@CorAtencao` fade 20%)   | Aviso          |
| `.mensagemInfo`     | Ciano (`@CorPrimaria` fade 15%)    | Informacao     |

**Variaveis relevantes**:
- `@MensagemInlinePaddingTop/Right/Bottom/Left_Desktop/Tablet/Mobile`
- `@MensagemInlineFontSize_*`, `@MensagemInlineBorderRadius_*`
- `@MensagemInlineBorderWidth` (1px), `@MensagemInlineMarginBottom_*`

### 4.17 `.loader` + `.loaderContainer` — Indicador de carregamento

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/loader.less`

**O que faz**: Spinner circular CSS puro (sem JS, sem imagens). `.loader` e o spinner,
`.loaderContainer` centraliza e adiciona padding + texto.

**HTML pronto**:
```html
<div class="loaderContainer">
  <span class="loader"></span>
  Carregando...
</div>
```

**Variaveis relevantes**:
- `@LoaderTamanho_Desktop/Tablet/Mobile` — tamanho do spinner (32/28/24px)
- `@LoaderEspessura` (3px), `@LoaderCor` (@CorPrimaria), `@LoaderVelocidade` (0.8s)
- `@LoaderTextoFontSize_*`, `@LoaderTextoMargemEsquerda` (12px)
- `@LoaderContainerPadding_Desktop/Tablet/Mobile` (24/20/16px)

### 4.18 `.semPadding` — Modificador sem padding

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/semPadding.less`

**O que faz**: Remove padding de qualquer elemento. Util em `.panel` que contém tabelas
ou conteudo que precisa encostar nas bordas.

**HTML pronto**:
```html
<div class="panel D18T12M6 semPadding">
  Conteudo sem padding
</div>
```

---

## 5. Paleta de Cores e Variantes

### 5.1 Cores base (definidas em `Variaveis.less`)

| Variavel           | Default                   | Uso                                      |
|--------------------|---------------------------|------------------------------------------|
| `@Preto`           | `rgb(0,0,0)`              | Texto padrao, bordas escuras              |
| `@Branco`          | `rgb(255,255,255)`        | Fundos claros, texto em botoes escuros    |
| `@CorPrimaria`     | `rgb(0,188,212)` (ciano)  | Cor principal do sistema                  |
| `@CorSecundaria`   | `rgb(135,35,0)` (marrom)  | Cor secundaria (navbar direita, btEntrar) |
| `@CorTercearia`    | `rgb(204,204,204)` (cinza)| Cor neutra, fundos de botao padrao        |
| `@CorAtencao`      | `rgb(251,140,0)` (laranja)| Avisos                                    |
| `@CorNegacao`      | `rgb(204,77,51)` (vermelho)| Erros                                    |
| `@CorPositivacao`  | `rgb(51,204,154)` (verde) | Sucessos                                  |
| `@CorFontePadrao`  | `rgb(0,0,0)`              | Cor padrao de texto                       |
| `@CorFonteNavbar`  | `rgb(255,255,255)`        | Texto branco na navbar                    |

**Nota**: `@CorTercearia` esta escrito com "ea" no codigo — preservar esse nome ao usar.

### 5.2 Sistema de variantes (5 eixos)

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/paleta.less`

**Screenshot Fade/Saturacao/Desaturacao**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-paleta-5-eixos.png`
**Screenshot Clarificacao/Obscurecencia**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-paleta-clar-obsc.png`

Cada cor tem 5 eixos de variacao, cada um com 10 niveis. Classes:

| Eixo             | Classe          | Efeito                                   |
|------------------|------------------|------------------------------------------|
| 1. **Fade**      | `.paleta-1-1` ate `.paleta-1-10` | Transparencia (100% -> 10%) |
| 2. **Saturacao** | `.paleta-2-1` ate `.paleta-2-10` | Saturacao +10% ate +100%    |
| 3. **Desaturacao**| `.paleta-3-1` ate `.paleta-3-10` | Saturacao -10% ate -100%   |
| 4. **Clarificacao**| `.paleta-4-1` ate `.paleta-4-10` | Clareza +10% ate +100%    |
| 5. **Obscurecencia**| `.paleta-5-1` ate `.paleta-5-10` | Escurecimento +10% ate +100% |

> **Nota sobre `paleta.less`**: Essas classes sao geradas em cima de `@CorTestada`, que por
> padrao aponta para `@CorPrimaria`. Para ter a mesma paleta para OUTRA cor, e necessario
> recompilar o LESS sobrescrevendo `@CorTestada`.

**Combinacao de eixos**: aplique varias classes no mesmo elemento:
```html
<div class="panel paleta-1-3 paleta-3-2">
  Cor primaria com fade 80% + desaturacao 20%
</div>
```

**Aplicacao em balloons**: como as classes `.paleta-*` usam o mixin `.corPaleta()`
(ver 5.3), aplica-las em `.balloonType-*` colore tanto o fundo do balloon quanto o
preenchimento do triangulo (`:after`), mantendo o contorno (`:before`) intacto.

### 5.3 Mixin `.corPaleta()` — aplicacao automatica em `:after`

**Arquivo**: `public/less-src/Estruturas/Elementos/basicos/paleta.less:23-35`

Mixin que substitui a aplicacao direta de `.backgroundColor()` nas classes de paleta.
Alem do `background-color` no proprio elemento, aplica `border-color` no
pseudo-elemento `:after`. Todas as 56 classes semanticas e de paleta (`.primaria`,
`.secundaria`, `.terciaria`, `.corAtencao`, `.corNegacao`, `.corPositivacao`,
`.paleta-1-1` a `.paleta-5-10`) foram reescritas para usar este mixin.

**Assinatura**:
```less
.corPaleta(
    @Cor;
    @PercentualFade:            @PercentualFade_Padrao;
    @PercentualSaturacao:       @PercentualSaturacao_Padrao;
    @PercentualDesaturacao:     @PercentualDesaturacao_Padrao;
    @PercentualClarificacao:    @PercentualClarificacao_Padrao;
    @PercentualObscurecencia:   @PercentualObscurecencia_Padrao;
) {
    .backgroundColor(@Cor; @PercentualFade; @PercentualSaturacao; @PercentualDesaturacao; @PercentualClarificacao; @PercentualObscurecencia;);
    &:after {
        .borderColor(@Cor; @PercentualFade; @PercentualSaturacao; @PercentualDesaturacao; @PercentualClarificacao; @PercentualObscurecencia;);
    }
}
```

**Por que NAO afeta `:before`**: o `:before` do balloon desenha o **contorno** da
setinha (borda externa) e deve manter a cor original definida por `.balloonType-*`.
O `:after` desenha o **preenchimento** interno da setinha, que deve acompanhar o fundo
quando uma classe de paleta for aplicada.

**Como criar uma paleta propria no seu projeto**:
```less
// meu-projeto.less (em LESS)
.minha-variante-roxa {
    .corPaleta(rgb(120, 50, 200); 100%; 0%; 0%; 15%; 0%);
}
```
Isso aplica automaticamente o fundo no elemento e a cor no `:after` — funcionando em
qualquer componente, incluindo balloons.

**Seguranca**: em elementos sem pseudo-elementos (ex: um `.panel` qualquer), a regra
para `:after` simplesmente nao produz efeito visual. E seguro aplicar em qualquer
elemento.

### 5.4 Mixin `.corVariante(@Cor, @Fade, @Sat, @Desat, @Clar, @Obsc)`

**Arquivo**: `public/less-src/Variaveis/Mixing.less`

Nao aplica CSS diretamente — gera a variavel `@CorVariante` que os outros mixins
(`.color`, `.backgroundColor`, `.borderColor`) usam internamente.

```less
// Uso em LESS customizado (novo componente do seu projeto)
.meuBotao {
  .corVariante(@CorPrimaria; 100%; 0%; 0%; 10%; 5%);  // fade,sat,desat,clar,obsc
  background-color: @CorVariante;
}
```

### 5.5 Mixins de aplicacao de cor

| Mixin                | O que aplica                               |
|----------------------|--------------------------------------------|
| `.color(@Cor, ...)`  | `color` + `fill` (para texto e SVGs)       |
| `.backgroundColor(@Cor, ...)` | `background-color`                |
| `.borderColor(@Cor, ...)` | `border-color`                        |
| `.gradiente(@CorBase, @CorDoGradiente, ...)` | `background-image: linear-gradient(...)` |
| `.corPaleta(@Cor, ...)` | `background-color` no elemento + `border-color` no `:after` (ver 5.3) |

**Todas aceitam os 5 parametros de variante como opcionais**:
```less
.color(@CorPrimaria);                        // cor pura
.color(@CorPrimaria; 50%);                   // 50% de fade
.color(@CorPrimaria; 100%; 0%; 0%; 10%; 0%); // clarificada 10%
```

### 5.6 Mixin `.backgroundColorPattern(@Cor1, @Cor2, ...)`

Gera um `repeating-linear-gradient` com duas cores variantes (usado em `.subMenuItem.inativo`
para padrao listrado).

### 5.7 Mixin `.gradiente(@CorBase, @CorDoGradiente)`

Gera um `linear-gradient(to bottom, @CorBase, @CorDoGradiente @ProfundidadeCorGradiente)`.

**Observacao sobre bug do codigo fonte**: ha um typo no mixin (`-moz-linear-linear-gradient`
em vez de `-moz-linear-gradient`) que nao afeta a renderizacao porque browsers modernos
usam `linear-gradient` sem prefixo. Ver [secao 10](#bug-gradiente-moz).

---

## 6. Mixins LESS de Layout

**Arquivo**: `public/less-src/Variaveis/Mixing.less`

### 6.1 `.padding(@Top; @Right; @Bottom; @Left)` + variantes

**Formas de chamar**:
```less
.padding(4px; 6px; 4px; 6px);                 // valores custom
.padding(Desktop);                             // ja usa @PaddingTop_Desktop etc.
.padding(Tablet);                              // idem Tablet
.padding(Mobile);                              // idem Mobile
.padding(Hamburger);                           // padding do botao hamburger
.padding(Remover);                             // padding: 0 0 0 0 !important
```

### 6.2 `.bordaArredondada(@CorDaBorda; ...; @RaioES; @RaioDS; @RaioDI; @RaioEI; @Espessura)`

**Formas de chamar**:
```less
.bordaArredondada(Desktop);    // usa @RaioBordaEsquerdaSuperior_Desktop etc
.bordaArredondada(Tablet);
.bordaArredondada(Mobile);
.bordaArredondada(Remover);    // zerar todas
.bordaArredondada(Menu);       // border-width: 0 !important
.bordaArredondada(Inferior);   // zera apenas borda superior (usado com tituloForm)
.bordaArredondada(Superior);   // zera apenas borda inferior
```

### 6.3 `.sombreamento(@SombraH; @SombraV; @Blur; @Spread; @MarginBottom; ...)`

**Formas de chamar**:
```less
.sombreamento(Desktop);    // usa @SombraHorizontal_Desktop etc
.sombreamento(Tablet);
.sombreamento(Mobile);
.sombreamento(Remover);    // zerar sombra
```

**Adiciona `margin-bottom`** junto da sombra para evitar que panels consecutivos fiquem
com sombras sobrepostas.

### 6.4 `.margin(Remover)`

Zera `margin-top/right/bottom/left` (sem `!important`).

### 6.5 Tabela-resumo de todos os mixins

| Mixin                     | Argumentos (principais)                  | O que faz                          |
|---------------------------|------------------------------------------|-------------------------------------|
| `.padding(Desktop/Tablet/Mobile/Hamburger/Remover)` | modo | Aplica padding do breakpoint |
| `.corVariante(@Cor;@F;@S;@D;@C;@O)` | cor + 5 eixos variacao | Gera `@CorVariante` local |
| `.corVariante2(@Cor1;@Cor2;...)` | 2 cores + 10 eixos | Gera `@CorVariante` e `@CorVariante2` |
| `.color(@Cor;...)` | cor + 5 eixos | `color` + `fill` |
| `.backgroundColor(@Cor;...)` | cor + 5 eixos | `background-color` |
| `.backgroundColor(BotaoHamburger)` | — | Background do hamburger |
| `.backgroundColorPattern(@C1;@C2;...)` | 2 cores + 10 eixos + angulo | Padrao listrado |
| `.borderColor(@Cor;...)` | cor + 5 eixos | `border-color` |
| `.gradiente(@CorBase;@CorDoGradiente;...)` | 2 cores + 10 eixos | Gradiente linear |
| `.sombreamento(Desktop/Tablet/Mobile/Remover)` | modo | Box-shadow + margin-bottom |
| `.bordaArredondada(Desktop/Tablet/Mobile/Remover/Menu/Superior/Inferior)` | modo | Borda + radius |
| `.margin(Remover)` | — | Zera margens |

---

## 7. Variaveis Customizaveis (LESS e CSS Custom Properties)

**Arquivo fonte LESS**: `public/less-src/Variaveis/Variaveis.less` (27KB)
**Arquivo gerado CSS vars**: `public/less-src/Variaveis/CustomProperties.less` (706 linhas, NAO editar)
**Gerador**: `scripts/generate-custom-properties.js`
**Total de variaveis**: **405** LESS
**Endpoint API**: `GET /api/variables` retorna todas as variaveis com `name`, `value`,
`type` (color/size/percent/angle/time/number/reference/text) e `category`.

O framework expoe todas as variaveis de DUAS formas complementares:

### 7.0 CSS Custom Properties (`var(--*)`) — disponiveis em runtime sem LESS

Todas as 405 variaveis LESS sao espelhadas como CSS custom properties em `:root` no
arquivo gerado `CustomProperties.less` (importado logo apos `Mixing.less` em
`framework.less`). Isso permite que projetos consumidores usem `var(--Nome)` em CSS
puro sem precisar de pipeline LESS.

**Tres padroes expostos**:

| Padrao                    | Exemplo                                    | Comportamento                           |
|---------------------------|--------------------------------------------|-----------------------------------------|
| **Variavel fixa**         | `var(--CorPrimaria)`                       | Valor constante (nao muda por breakpoint) |
| **Sufixada por breakpoint** | `var(--EntreColuna_Desktop)`             | Valor fixo do breakpoint especifico     |
| **Base responsiva**       | `var(--EntreColuna)`                       | Muda automaticamente por `@media`       |

**A variante "base responsiva"** e gerada para cada trio `_Desktop/_Tablet/_Mobile`
encontrado em `Variaveis.less`. Existem **89 trios responsivos** no framework, ou seja,
89 variaveis CSS sem sufixo que mudam automaticamente conforme o breakpoint ativo.

**Exemplo em CSS puro do projeto consumidor**:
```css
/* No CSS do seu projeto, SEM precisar de LESS ou media queries */
.meu-card {
    padding:       var(--PaddingTop) var(--PaddingRight);
    background:    var(--CorPrimaria);
    border-radius: var(--RaioBordaEsquerdaSuperior);
    margin:        calc(var(--EntreColuna) / 2);
    /* var(--EntreColuna) vale 12px no Desktop, 10px no Tablet, 8px no Mobile */
}
```

**Lista parcial das variaveis "base responsivas"** (sem sufixo, 89 no total):
- Grid: `--NumeroDecolunas`, `--EntreColuna`, `--ScrollBar`, `--AlturaLinhaPadrao`
- Padding: `--PaddingTop`, `--PaddingRight`, `--PaddingBottom`, `--PaddingLeft`
- Bordas: `--RaioBordaEsquerdaSuperior`, `--RaioBordaDireitaSuperior`,
  `--RaioBordaDireitaInferior`, `--RaioBordaEsquerdaInferior`, `--EspessuraDaBorda`
- Texto: `--TamanhoPadraoTexto`, `--TamanhoTextoNavbar`, `--TamanhoTextoSubNavbar`,
  `--TamanhoTextoSectionTitle`
- Sombras: `--SombraHorizontal`, `--SombraVertical`, `--BlurSombra`, `--SpreadSombra`,
  `--MarginBottomSombra`
- Navbar: `--AlturaLinhaNavbar`, `--MargemSuperiorNavbar`, `--MargemInferiorNavbar`,
  `--PaddingTopMenuItem`, etc
- Form items: `--margemTop_ItemForm`, `--margemBottom_ItemForm`, `--HeightInput`,
  `--WidthItemForm`, `--PaddingLeftInput`, `--PaddingTopInput`, etc
- Icones: `--tamanhoIcone`, `--topIcone`, `--PaddingLeftInputIcone`
- Balloons: `--RaioBordaMessageballoonHelp`, `--PaddingTopMessageballoonHelp`,
  `--TamanhoTextoHelp` (e iguais para Atencao/Erro)
- Loader/Badge/MensagemInline: `--LoaderTamanho`, `--BadgePadding`,
  `--BadgeFontSize`, `--MensagemInlineFontSize`, etc

**Fonte completa**: ler `public/less-src/Variaveis/CustomProperties.less` (gerado) para
a lista exata de todas as 405 CSS custom properties disponiveis.

### 7.0.1 Gerador `scripts/generate-custom-properties.js`

**Arquivo**: `scripts/generate-custom-properties.js`

**Como funciona**:
1. Le `public/less-src/Variaveis/Variaveis.less` linha a linha.
2. Parseia todas as declaracoes `@Nome: valor;` via regex (405 matches).
3. Identifica trios `_Desktop/_Tablet/_Mobile` e agrupa por nome base.
4. Gera `public/less-src/Variaveis/CustomProperties.less` com:
   - `:root { --Nome: @Nome; }` para cada variavel (valores canonicos fixos)
   - `:root { --NomeBase: @NomeBase_Desktop; }` para cada base responsiva (default)
   - `@media (min-width: @Res_Tablet) and (max-width: @Res_Desktop) { :root { --NomeBase: @NomeBase_Tablet; } }`
   - `@media (max-width: @Res_Tablet) { :root { --NomeBase: @NomeBase_Mobile; } }`
5. O arquivo gerado e importado por `framework.less` logo apos `Mixing.less`.

**Quando regerar**:
- Sempre que voce adicionar/renomear/remover uma variavel em `Variaveis.less`
- Sempre que alterar o nome de um sufixo `_Desktop/_Tablet/_Mobile`

**Comando**:
```bash
cd /home/cazouvilela/projetos/framework_css
node scripts/generate-custom-properties.js
```

Saida esperada:
```
Gerado: .../public/less-src/Variaveis/CustomProperties.less
  Variaveis totais: 405
  Variaveis com trio responsivo: 89 (bases)
  Variaveis sem sufixo responsivo: 136
```

**NAO EDITAR `CustomProperties.less` A MAO**. Qualquer edicao manual sera sobrescrita
na proxima geracao. Toda mudanca deve ser feita em `Variaveis.less` e depois regerada.

Apos regerar, **recompile** `framework.css`:
```bash
node_modules/.bin/lessc --math=always public/less-src/framework.less public/css/framework.css
```



### 7.1 Categorias (conforme expostas pela API)

```
BREAKPOINTS (2), GRID (1), DESKTOP (3), TABLET (3), MOBILE (3), LINHAS (3),
PADDING (12), BORDAS (22), FONTES (5),
CORES BASICAS (2), PALETA DE CORES (6), EFEITOS DE CORES (5),
GRADIENTE (6), PATTERN (3), CORES DAS FONTES (1),
SOMBREAMENTO (22), COR DAS BORDAS (1),
LINHAS NAVBAR (3), MARGENS NAVBAR (6), FONTES NAVBAR (11),
TRANSIÇÕES MENUS (2), SUBMENU (3),
PADDING MENUITEM (12), LARGURA MINIMA MENUITEM (3),
LARGURA MINIMA SUBMENUITEM (3), ALINHAMENTO TEXTO MENUITEM (3),
ALINHAMENTO TEXTO SUBMENUITEM (3), ICONE MENUITEM (4),
PADDING MENU HAMBURGUER (4), LINHAS MENU HAMBURGUER (4), COR MENU HAMBURGUER (1),
MARGIN ITENS DO FORM (12), WIDTH ITENS DO FORM (3), HEIGHT ITENS DO FORM (3),
PADDING INPUT (12), PADDING INPUT COM ICONE (12),
TAMANHO (3), TOP POSITION ICONES NOS INPUTS (3),
ESPESSURA DA BORDA (3), BORDAS ARREDONDADAS (4),
CORES (varias secoes), FONTE (varias secoes)
```

### 7.2 Variaveis mais importantes (cheat sheet)

**Cores principais**:
```less
@CorPrimaria:     rgb(0, 188, 212);      // Ciano
@CorSecundaria:   rgb(135, 35, 0);       // Marrom
@CorTercearia:    rgb(204, 204, 204);    // Cinza claro
@CorAtencao:      rgb(251, 140, 0);      // Laranja
@CorNegacao:      rgb(204, 77, 51);      // Vermelho
@CorPositivacao:  rgb(51, 204, 154);     // Verde
```

**Breakpoints e grid**:
```less
@Res_Tablet:                    768px;
@Res_Desktop:                   992px;

@NumeroDecolunas_Desktop:       18;
@NumeroDecolunas_Tablet:        12;
@NumeroDecolunas_Mobile:        6;

@EntreColuna_Desktop:           12px;   // Gutter desktop
@EntreColuna_Tablet:            10px;
@EntreColuna_Mobile:            8px;

@ScrollBar_Desktop:             20px;
@ScrollBar_Tablet:              20px;
@ScrollBar_Mobile:              1px;
```

**Alturas padrao**:
```less
@AlturaLinhaPadrao_Desktop:     46px;
@AlturaLinhaPadrao_Tablet:      40px;
@AlturaLinhaPadrao_Mobile:      36px;

@AlturaLinhaNavbar_Desktop:     48px;
@AlturaLinhaNavbar_Tablet:      42px;
@AlturaLinhaNavbar_Mobile:      36px;
```

**Fonte**:
```less
@FontFamilyPadrao:              Raleway, sans-serif, Arial, Helvetica;
@FontWeightPadrao:              normal;
@TamanhoPadraoTexto_Desktop:    16px;
@TamanhoPadraoTexto_Tablet:     14px;
@TamanhoPadraoTexto_Mobile:     12px;
```

**Para a lista COMPLETA das 325 variaveis**, consultar:
- `public/less-src/Variaveis/Variaveis.less` (fonte — SEMPRE canonico)
- `documentacao/VARIAVEIS_REFERENCIA.md` (documentacao legada — usar como indice)
- `GET https://framework-css.sistema.cloud/api/variables` (API ao vivo, retorna JSON
  agrupado por categoria)

### 7.3 Como customizar em outro projeto

**Opcao 1 — Sobrescrever antes do import do framework**:
```less
// variaveis-meu-projeto.less
@CorPrimaria:     rgb(30, 144, 255);   // azul
@CorSecundaria:   rgb(220, 53, 69);    // vermelho

@AlturaLinhaPadrao_Desktop: 52px;       // campos maiores

// Depois importe o framework (ele usa seus valores):
@import "caminho/para/framework.less";
```

Compile com `lessc --math=always variaveis-meu-projeto.less projeto.css`.

**Opcao 2 — Via API de compilacao**:
```bash
curl -X POST https://framework-css.sistema.cloud/api/compile \
  -H "Content-Type: application/json" \
  -d '{
    "variables": {
      "CorPrimaria": "rgb(30, 144, 255)",
      "CorSecundaria": "rgb(220, 53, 69)",
      "AlturaLinhaPadrao_Desktop": "52px"
    }
  }' | jq -r '.css' > framework.css
```

**Opcao 3 — Editor visual em tempo real** (humano):
1. Abrir `https://framework-css.sistema.cloud/editor.html`
2. Editar variaveis na sidebar esquerda
3. Preview atualiza em tempo real no iframe
4. Clicar "Compilar LESS" para aplicar
5. Clicar "Exportar Config" para baixar `.less` com as variaveis customizadas
6. Commitar esse `.less` no repositorio do projeto

**Screenshot do editor**: `/home/cazouvilela/projetos/framework_css/print_screens/doc-editor-variaveis.png`

---

## 8. Tipografia

### 8.1 Fonte padrao: Raleway (Google Fonts)

**Import obrigatorio** no `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Pesos disponiveis**: 300 (light), 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold).

### 8.2 Variaveis de tipografia

```less
@FontFamilyPadrao:          Raleway, sans-serif, Arial, Helvetica;
@FontFamilyNavbar:          Raleway, sans-serif, Arial, Helvetica;
@FontFamilyMessageballoonHelp:      @FontFamilyPadrao;
@FontFamilyMessageballoonAtencao:   @FontFamilyPadrao;
@FontFamilyMessageballoonErro:      @FontFamilyPadrao;

@FontWeightPadrao:          normal;
@FontWeightNavbar:          bold;
@FontWeightNavbarSub:       normal;
```

### 8.3 Tamanhos de texto por breakpoint

| Contexto         | Desktop | Tablet  | Mobile  | Variavel                                  |
|------------------|---------|---------|---------|--------------------------------------------|
| Texto padrao     | 16px    | 14px    | 12px    | `@TamanhoPadraoTexto_*`                    |
| Navbar principal | 20px    | 18px    | 16px    | `@TamanhoTextoNavbar_*`                    |
| Submenu          | 16px    | 14px    | 12px    | `@TamanhoTextoSubNavbar_*`                 |
| Balloon Help     | 16px * 0.8 | 14px * 0.8 | 12px * 0.8 | `@TamanhoTextoHelp_*`               |
| Balloon Atencao  | 16px    | 14px    | 12px    | `@TamanhoTextoAtencao_*`                   |
| Balloon Erro     | 16px    | 14px    | 12px    | `@TamanhoTextoErro_*`                      |

### 8.4 Hierarquia

O framework **nao define estilos para `h1`-`h6`** fora do contexto de componentes. Se seu
projeto precisa de headings, crie variaveis proprias no `variaveis-projeto.less` ou use
classes utilitarias proprias. NAO usar Bootstrap/Tailwind — criar o CSS do projeto
usando as variaveis do framework.

---

## 9. Comportamento JS dos Componentes

### 9.1 Balloons (`messageBalloons.js`, reescrito 2026-04-11)

**Arquivo**: `public/js/messageBalloons.js` (181 linhas)

**Como incluir no projeto**:
```html
<!-- No final do <body> ou com defer no <head> -->
<script src="/js/messageBalloons.js" defer></script>
```

O script **precisa estar incluido via `<script>`** em todo HTML que usa balloons.
Sem ele, em touch devices os balloons nunca abrem (so funcionariam via `:hover` no
desktop com mouse).

**Arquitetura** (IIFE self-contained, expondo API global `window.MessageBalloons`):

1. **Event delegation a partir do `document`** — o script NAO percorre o DOM para
   registrar listeners em cada `.balloonTrigger`. Em vez disso, captura eventos no
   nivel do `document` e usa `findTrigger(ev.target)` para subir a cadeia ate
   encontrar um `.balloonTrigger`. Consequencia: funciona com **DOM dinamico** (React,
   Vue, jQuery, HTMX etc) SEM precisar reescanear elementos novos.

2. **Pointer Events API** — usa `pointerdown` em vez de `click`:
   - Funciona unificado para mouse, touch e caneta (pen)
   - Sem o atraso de 300ms do click sintetico em touch
   - Dispara **antes** de qualquer transicao de focus, evitando race conditions com
     balloons que dependem de `:focus`
   - **Fallback** para browsers sem `PointerEvent`: adiciona listeners de `touchstart`
     (passive) e `mousedown`.

3. **Dedup de eventos sinteticos** — touch em alguns browsers dispara cascata
   `touchstart -> pointerdown -> mousedown -> click` no mesmo target. Sem dedup, um
   unico tap abriria e fecharia o balloon. O handler guarda `{timestamp, target}` do
   ultimo evento processado e ignora novos eventos no **mesmo target** em janela de
   **250ms**.

4. **ESC fecha todos** — handler de `keydown` fecha balloons abertos quando `Escape`
   e pressionado.

5. **Click fora fecha** — quando `findTrigger(ev.target)` retorna `null` (clique em
   qualquer lugar fora de um trigger), chama `closeAll()`.

6. **Apenas um balloon aberto por vez** — quando um trigger vai abrir, o handler chama
   `closeAll(trigger)` antes, fechando todos os balloons de outros triggers mas
   preservando os do trigger atual.

7. **Protecao contra instalacao dupla** — flag global `window.__messageBalloonsInstalled`.
   Se o script for incluido 2x por acidente, a segunda vez e ignorada.

**Funcoes internas** (nao expostas):
- `findTrigger(el)` — sobe o DOM ate encontrar elemento com `.balloonTrigger`
- `getBalloonsOf(trigger)` — retorna balloons que sao filhos diretos OU irmaos do
  trigger, replicando a convencao dos seletores CSS `trigger > balloon` e
  `trigger ~ balloon`
- `hasBalloonType(el)` — checa se o className contem "balloonType"
- `closeAll(exceptTrigger)` — remove `.balloonStatus-Ativo` de todos os balloons
  abertos, exceto os relacionados a `exceptTrigger` (opcional)
- `toggle(trigger)` — alterna o estado dos balloons do trigger. Retorna `true` se
  abriu, `false` se fechou.
- `onPointerDown(ev)` — handler global de `pointerdown` no document
- `onKeyDown(ev)` — handler global de `keydown` para ESC

**API publica exposta em `window.MessageBalloons`**:

| Metodo                              | O que faz                                                    |
|-------------------------------------|--------------------------------------------------------------|
| `MessageBalloons.toggle(trigger)`   | Alterna estado dos balloons associados ao trigger (DOM node) |
| `MessageBalloons.closeAll()`        | Fecha TODOS os balloons abertos no documento                 |

**Uso programatico** (caso queira controlar via JS do seu app):
```javascript
const inputCPF = document.querySelector('#cpf');
// Abre o balloon do input CPF programaticamente (ex: apos validacao falhar)
MessageBalloons.toggle(inputCPF);

// Fecha tudo ao submeter o form
form.addEventListener('submit', () => MessageBalloons.closeAll());
```

**Interacao com `.balloonStatus-Ativo`**:
- O JS adiciona/remove essa classe nos elementos balloon.
- O CSS (`messageBalloon.less`) usa essa classe para aplicar transformacoes de
  visibilidade via mixin `.balloonAtivoTransforms()`, que ativa `opacity: 0.95` +
  `transform: scale(1)` com transicao de 0.3s.
- A mesma classe tambem restaura `pointer-events: auto` (ver 4.6.7).

**Por que a reescrita (vs. versao antiga com `window.onload`)**:

| Problema na versao antiga             | Solucao na nova                                   |
|---------------------------------------|---------------------------------------------------|
| So registrava em elementos que existiam no load | Event delegation no document — funciona com qualquer DOM dinamico |
| Atraso de 300ms em touch (click sintetico) | `pointerdown` dispara imediatamente            |
| Nao fechava com ESC                   | Handler de keydown                                |
| Nao fechava com click fora            | `closeAll()` quando `findTrigger` retorna null    |
| Podia abrir + fechar no mesmo tap     | Dedup de 250ms por target                         |
| Nao expunha API para controle externo | `window.MessageBalloons.toggle()/closeAll()`      |
| Podia ser instalado 2x                | Flag `__messageBalloonsInstalled`                 |

### 9.2 Modais

**O framework nao fornece JS de modal.** O `.modalBackground` + `.modalBox` sao puramente
estilos. A abertura/fechamento e responsabilidade do JS da sua aplicacao (tipicamente
`element.style.display = 'flex'` / `none`, ou adicionar/remover o `.modalBackground` do
DOM).

**Exemplo minimo** (vanilla JS):
```javascript
function abrirModal(conteudoHTML) {
  var bg = document.createElement('div');
  bg.className = 'modalBackground';
  bg.innerHTML = '<div class="modalBox">' + conteudoHTML + '</div>';
  bg.addEventListener('click', function(e) {
    if (e.target === bg) bg.remove();
  });
  document.body.appendChild(bg);
}
```

### 9.3 Hamburger menu

**100% CSS, sem JS**. Funciona via `<input type="checkbox">` oculto com `:checked` +
`~ selector` para aplicar `transform: scaleY(1)` no `.menusContainer`. As 3 linhas do
botao hamburger viram "X" via `rotate(45deg)/(-45deg)` quando o checkbox e marcado.

**Cada navbar precisa de um ID unico para o checkbox** (`id="Hamburger1"`, `id="Hamburger2"`
etc), se houver mais de uma na pagina — o `<label for="...">` referencia esse ID.

### 9.4 `frameworkOverrides.js` — NAO usar em projetos finais

**Arquivo**: `public/js/frameworkOverrides.js`

**Proposito**: mecanismo interno do **showcase/editor** que armazena CSS customizado no
`localStorage` e injeta via `<style id="custom-framework-css">`. Usa `BroadcastChannel`
para sincronizar entre abas.

**NAO incluir esse script em projetos normais.** Ele e exclusivamente para o editor ao
vivo funcionar. Se voce ver overrides aparecendo no showcase, use o botao "Limpar" para
remover o localStorage.

---

## 10. Pegadinhas e Bugs Conhecidos — LEIA SEMPRE

Esta secao economiza **horas de debug**. Bugs ja ocorridos e resolvidos, alem de
comportamentos nao-obvios do framework.

### Case sensitivity dos arquivos LESS

**Sintoma**: Compilacao falha em Linux com erro "file not found" para `inputs.less`,
`botoes.less` etc.

**Causa**: `framework.less` importa com minusculo (`inputs.less`), mas o ZIP original vinha
com `Inputs.less`. No macOS/Windows (case-insensitive) funciona; no Linux (case-sensitive) falha.

**Fix**: Todos os arquivos foram renomeados para minusculo no projeto atual. Se copiar
para outro projeto, garanta que os nomes dos arquivos batem com os `@import`.

### <a id="bug-less-divisao-sem-parenteses"></a>Bug LESS divisao sem parenteses (LESS 4+)

**Sintoma**: Triangulos dos balloons ficam com `border-width: 0`. Outras propriedades com
divisao aparecem literais no CSS (ex: `border: 12px / 2 solid transparent;`).

**Causa**: LESS 4+ por padrao usa `math: parens-division`, que deixa expressoes sem
parenteses como literais. O framework usa muito `@var / 2` em border widths.

**Fix**: SEMPRE compilar com `math: 'always'`:

```js
// Node.js
less.render(input, { math: 'always' })
```

```bash
# lessc CLI
lessc --math=always framework.less framework.css
```

```js
// webpack less-loader
{
  loader: 'less-loader',
  options: {
    lessOptions: { math: 'always' }
  }
}
```

**Status no framework_css**: `server.js` usa `math: 'always'` no endpoint `/api/compile`.
Se recompilar `framework.css` manualmente, passar essa opcao.

### <a id="bug-balloon-pseudo-elementos"></a>Bug seletor com espaco antes de pseudo-elemento

**Sintoma**: `balloonType-Atencao` e `balloonType-Erro` aparecem sem triangulo. `balloonType-Help`
funciona normalmente.

**Causa**: No `messageBalloon.less`, as regras estavam escritas com **espaco antes do `:`**:
```less
.balloonType-Atencao :before { ... }  // ERRADO — espaco
.balloonType-Atencao:before { ... }   // CORRETO
```
O espaco faz o seletor virar `combinador descendente` (`.balloonType-Atencao *::before`),
mirando `:before` de qualquer filho em vez do proprio elemento. O `balloonType-Help` usava
`&:before` (aninhado no LESS), entao nao tinha o bug.

**Status**: corrigido no framework em 2026-04-08 (linhas 1550, 1554, 1591, 1595 do
`messageBalloon.less`). Se voce encontrar outro caso similar, sempre remover o espaco.

### <a id="bug-media-query-or-hover"></a>Bug `or (hover: none)` em media queries (RESOLVIDO 2026-04-11)

**Sintoma**: Estilos dentro de `@media (max-width: ...), or (hover: none)` sao
COMPLETAMENTE ignorados por alguns browsers (Chrome/Safari). A regra inteira e tratada
como seletor invalido e nada dentro dela aplica.

**Causa**: Media queries CSS **NAO aceitam a palavra `or` como operador logico**.
O operador OR em media queries e a **virgula**. O CSS correto e:

```css
/* ERRADO — alguns browsers descartam a regra inteira */
@media (max-width: 992px), or (hover: none) { ... }

/* CORRETO — a virgula sozinha ja e o OR logico */
@media (max-width: 992px), (hover: none) { ... }
```

**Status**: corrigido via sed global em 21 arquivos de `public/less-src/` em
2026-04-11. Todas as ocorrencias `, or (hover: none)` foram substituidas por
`, (hover: none)`. O unico arquivo que ainda contem o padrao antigo e
`Estruturas/Elementos/basicos/messageBalloon - Cópia .less` que e um BACKUP nao
importado e pode ser ignorado.

**Licao**: NUNCA usar `or` em media queries. Sempre virgula. Se precisar expressar
"tablet OU touch device", escreva:
```less
@media (max-width: @Res_Desktop) and (min-width: @Res_Tablet), (hover: none) and (min-width: @Res_Tablet) { ... }
```

### <a id="bug-balloon-pointer-events"></a>Balloons fechados interceptando taps em touch devices (RESOLVIDO 2026-04-11)

**Sintoma**: Em tablets/mobiles, tocar em area "vazia" da tela as vezes abre um
balloon inesperado, como se o tap tivesse atingido um elemento invisivel.

**Causa**: Balloons fechados nao saem do layout — permanecem `position: absolute` com
`transform: scaleY(0.001)` (praticamente invisiveis) mas a area de hit-test do dedo e
maior que um mouse pointer e pode arredondar para esses elementos. O browser aplica o
handler de pointerdown no balloon, que pode propagar ate o `.balloonTrigger` ancestral
e dispara `toggle()`.

**Fix aplicado**:
- Mixin `.balloon` (linha 63 em `messageBalloon.less`) aplica `pointer-events: none`
  por default.
- Nova regra `.balloonStatus-Ativo { pointer-events: auto !important; }` (linha 92)
  restaura a interacao apenas quando visivel.

**Por que `!important`**: cada `.balloonPosition-*` inclui `.balloon;` via mixin,
gerando regras posteriores com mesma specificity (0,1,0). Sem `!important`, a ultima
regra (do mixin) venceria e `pointer-events` ficaria sempre `none`, quebrando o click
em desktop tambem.

**Status**: corrigido em `messageBalloon.less:77, 92` em 2026-04-11. Nao precisa
nenhuma acao do consumidor — funciona automaticamente apos recompilar `framework.css`.

### <a id="bug-balloon-hover-sticky"></a>`:hover` sticky em tablets landscape (RESOLVIDO 2026-04-11)

**Sintoma**: Em tablets em landscape (viewport >= 992px, touch, sem mouse), abrir um
balloon por tap deixa o balloon preso — o `:hover` CSS fica ativo ate o proximo tap em
outro lugar, causando balloons "sticky".

**Causa**: `:hover` em touch devices e sticky (comportamento de fallback do browser).
A regra CSS antiga aplicava `:hover` em qualquer breakpoint >= Desktop, incluindo
tablets landscape touch.

**Fix aplicado** (`messageBalloon.less:1787`): `:hover` agora so aplica em
`@media (min-width: @Res_Desktop) and (hover: hover)`. O `(hover: hover)` filtra
APENAS devices com mouse real. Em tablets touch em landscape, o `:hover` nao dispara
mais o balloon — so `:focus` (teclado/JS) e tap (JS via `pointerdown`).

**Impacto** esperado: em desktop com mouse, comportamento identico (hover abre
balloon). Em tablet landscape touch, balloon so abre por tap (controlado por
`messageBalloons.js`).

### <a id="bug-display-block-menuitem"></a>Bug `text-align` no `.menuItem`

**Sintoma**: A variavel `@AlinhamentoTextoMenuItem_Desktop` (ou `_Tablet/_Mobile`) nao
afeta o alinhamento do texto dentro do `.menuItem`.

**Causa**: O `normalize.less` aplica globalmente:
```less
div { display: flex; justify-content: flex-start; align-items: flex-start; }
```
Isso transforma **todo** `div` (incluindo `.menuItem`) em flex container, e `text-align`
deixa de afetar o alinhamento do conteudo inline.

**Fix**: `.menuItem` tem `display: block` explicito para sobrescrever o normalize global
(em `Navbar.less:303`). `subMenuItem` nao tem esse problema porque o `<a>` interno tem
`display: block !important; width: 100%` e herda o `text-align`.

**Licao**: Se voce criar um componente proprio no seu projeto e `text-align` nao funcionar,
verifique se nao e um `div` (que herda o `display: flex` global) — use `display: block`
explicito ou troque para `span`.

### <a id="bug-gradiente-moz"></a>Bug no mixin `.gradiente()` — typo

**Sintoma**: Inspecionando o CSS gerado, aparece `background-image: -moz-linear-linear-gradient(...)`
(duplicado).

**Causa**: Typo no `Mixing.less` linha 220. Nao afeta a renderizacao porque browsers modernos
usam a regra sem prefixo `linear-gradient(...)` que vem logo depois. Mas o CSS fica "feio".

**Status**: ainda presente no codigo. Baixo impacto. Pode ser corrigido em `Mixing.less:220`:
`-moz-linear-linear-gradient` -> `-moz-linear-gradient`.

### Override do showcase (`frameworkCssOverrides`)

**Sintoma**: Voce altera o `framework.css` estatico mas nao ve a mudanca no navegador ao
abrir `https://framework-css.sistema.cloud/`.

**Causa**: O `frameworkOverrides.js` armazena CSS no `localStorage` do navegador e injeta
em uma `<style id="custom-framework-css">` ao carregar a pagina. Esse CSS sobrescreve o
framework estatico ate voce limpar.

**Fix**:
1. Clicar em "Limpar" no topo da pagina do showcase
2. OU abrir DevTools > Application > Local Storage > limpar a chave `frameworkCssOverrides`
3. OU chamar `FrameworkOverrides.clear()` no console

**So afeta o showcase/editor.** Em projetos normais, voce nao importa esse script, entao
o bug nao acontece.

### Normalize global afeta TUDO

**`normalize.less`** aplica estilos globalmente a `div`, `span`, `p`, `a`, `input`, etc.
Em particular:
```less
div { display: flex; box-sizing: border-box; justify-content: flex-start; align-items: flex-start; }
```

**Impacto**: QUALQUER `div` no seu HTML vira flex container por padrao. Isso afeta:
- Componentes de terceiros que esperam `div` como block
- Seus proprios componentes onde voce esperava block flow
- Centralizacao de texto via `text-align`

**Alternativas**:
- `display: block` explicito em componentes que precisam de block flow
- Usar `span` em vez de `div` para elementos inline
- Criar uma classe `.noFlex` no seu projeto: `.noFlex { display: block !important; }`

**Nao removeveis facilmente**: esse comportamento e assumido por TODO o framework. Nao
remova do `normalize.less`.

### Tamanho do CSS gerado: ~1.2 MB

**Por que**: O grid programatico faz **3 loops aninhados** (Desktop 0-18 x Tablet 0-12 x
Mobile 0-6) gerando `19 * 13 * 7 = 1729` classes de coluna, mais as mesmas quantidades
para offset. Total: ~3500 regras de grid apenas.

**Isso e normal** e esperado. O CSS e pesado mas cacheavel. Em producao:
- Habilitar gzip/brotli no servidor (reduz para ~80KB comprimido)
- Cache agressivo com hash no nome do arquivo (`framework.1.0.0.css`)
- NAO usar PurgeCSS/Tailwind-like tree-shaking porque as classes sao dinamicas (voce
  aplica `D{n}T{n}M{n}` por variavel no HTML, o tree-shaker nao consegue detectar uso)

### Tablet ativado tambem por `hover: none`

**Comportamento oculto**: O breakpoint Tablet usa o seletor (ja com a sintaxe correta
sem `or`, corrigida em 2026-04-11):
```less
@media (min-width: 768px) and (max-width: 992px), (hover: none) and (min-width: 768px)
```

Isso significa que **qualquer dispositivo touch** (`hover: none`) com largura >= 768px
cai no breakpoint Tablet, mesmo se a largura for maior que 992px (ex: tablet grande em
landscape, laptop touch). A virgula sozinha e o operador OR de media queries — NAO usar
`or`, que e sintaxe invalida (ver [bug media-query-or-hover](#bug-media-query-or-hover)).

**Impacto**: tablets grandes em landscape podem ter o layout de tablet (12 cols) em vez
de desktop (18 cols). Isso e intencional.

### `.containerEmColuna *` zera margens laterais

**Comportamento**: Dentro de um `.containerEmColuna`, **todos** os elementos recebem
`margin-left: 0 !important` e `margin-right: 0 !important`. Isso evita quebras de largura
ao empilhar elementos verticalmente.

**Impacto**: Se voce precisar de margens laterais em algo DENTRO de um `.containerEmColuna`,
terá que usar padding no pai ou um wrapper adicional.

### `_OLD.less` e `Cópia .less` em `less-src/`

Existem arquivos antigos em `public/less-src/`:
- `Estruturas/Grid/grid_OLD.less` (38KB)
- `Estruturas/Elementos/basicos/messageBalloon - Cópia .less` (115KB)

**NAO sao importados** por `framework.less`. Sao backups. Ignorar.

---

## 11. Performance e Build

### 11.1 Tamanho do CSS

- `framework.css` raw: ~1.2 MB (1,160,464 bytes)
- Gzip: ~80 KB
- Brotli: ~60 KB

### 11.2 Otimizacao em producao

**Obrigatorio**:
- Habilitar **gzip** ou **brotli** no servidor web (nginx/Apache/Cloudflare)
- Cache-Control: `public, max-age=31536000, immutable` (1 ano, com hash no nome)
- HTTP/2 para multiplexar normalize + framework + paleta

**Opcional**:
- CDN para servir o CSS (Cloudflare, jsDelivr)
- Prefetch no `<head>`: `<link rel="preload" href="/css/framework.css" as="style">`

**NAO fazer**:
- PurgeCSS — quebra classes dinamicas do grid
- Minificacao agressiva que remove `!important` — o framework depende deles

### 11.3 Cache busting

Recomendado: adicionar hash ao nome do arquivo quando recompilar com variaveis
customizadas.

```html
<link rel="stylesheet" href="/css/framework.a1b2c3d4.css">
```

---

## 12. Checklist de Implantacao em Projeto Novo

Sequencia executavel (happy path) que Claude Code deve seguir ao iniciar o frontend de
um projeto novo:

- [ ] **1. Criar pastas** no projeto: `public/css/`, `public/icones/`, `public/js/`
- [ ] **2. Copiar arquivos do framework**:
  ```bash
  cp /home/cazouvilela/projetos/framework_css/public/css/framework.css <projeto>/public/css/
  cp /home/cazouvilela/projetos/framework_css/public/css/normalize.css <projeto>/public/css/
  cp /home/cazouvilela/projetos/framework_css/public/css/paleta.css <projeto>/public/css/
  cp -r /home/cazouvilela/projetos/framework_css/public/icones/* <projeto>/public/icones/
  cp /home/cazouvilela/projetos/framework_css/public/js/messageBalloons.js <projeto>/public/js/
  ```
  O `framework.css` ja contem as CSS custom properties (`var(--*)`) geradas em
  `CustomProperties.less`. Nao precisa copiar o arquivo LESS nem rodar o gerador no
  lado do consumidor.
- [ ] **3. Criar `index.html`** com os imports na ordem correta:
  1. Raleway (Google Fonts)
  2. normalize.css
  3. framework.css
  4. paleta.css
  5. CSS do projeto (sempre DEPOIS do framework)
- [ ] **4. Include do `messageBalloons.js`** com `defer` SE o projeto vai usar balloons.
  Importante: o script NAO e opcional para touch devices — sem ele, balloons nao abrem
  em tablets/mobiles.
- [ ] **5. Identificar as faixas horizontais** do layout e criar uma `.linhaDoGrid` para
      cada (nunca aninhar)
- [ ] **6. Para cada linha**, distribuir elementos em colunas com `D{n}T{n}M{n}` usando
      a soma correta para cada breakpoint (ex: 2 cols de D9 = 18 = linha cheia)
- [ ] **7. Usar `.containerEmColuna`** quando precisar empilhar multiplos elementos em
      uma unica coluna do grid
- [ ] **8. Usar `.containerEmLinha`** quando precisar de sub-grid horizontal dentro de
      uma coluna
- [ ] **9. Usar componentes prontos** (`.panel`, `.navbar`, `.itemForm`, `.input`, `.bt`,
      `.tituloForm`, `.passos`, `.balloonType-*`) em vez de criar CSS do zero
- [ ] **10. Icones**: usar `<span data-icon="nome"></span>` + script de fetch, OU
      `<img src="/icones/nome.svg">`
- [ ] **11. Testar responsividade** em 3 viewports:
  - Desktop: 1440x900
  - Tablet: 800x1024
  - Mobile: **412x915** (Samsung S26 Ultra, DPR 3 — dispositivo de teste padrao do usuario)
- [ ] **12. Validar** que nao ha scroll horizontal em nenhum breakpoint (se tiver,
      provavelmente voce aninhou `.linhaDoGrid`)
- [ ] **13. Verificar** que `.menuItem` aparece com alinhamento correto (se nao, checar
      `display: block`)
- [ ] **14. Customizar variaveis** (se necessario) via editor visual em
      `https://framework-css.sistema.cloud/editor.html`, exportar config, recompilar
      usando API `/api/compile` ou `lessc` local com `math: 'always'`
- [ ] **15. Build + deploy**: em projetos com systemd, fazer build do frontend e
      `sudo systemctl restart <servico>` conforme `feedback_build_deploy_apos_alteracao.md`
      da memoria global

---

## 13. FAQ — Erros comuns que Claude Code cometeria sem esta documentacao

### **P1. Posso usar Tailwind/Bootstrap junto com o framework_css?**
**R**: Nao. E regra obrigatoria do usuario. Usar SEMPRE e APENAS `framework_css`. Ver
`~/.claude/ORIENTACOES_DESENVOLVIMENTO.md` e `feedback_framework_css_padrao.md`.

### **P2. Posso fazer media query custom para um breakpoint diferente?**
**R**: Nao. Use os breakpoints oficiais via classes `D/T/M`. Os valores `@Res_Tablet` e
`@Res_Desktop` sao constantes do framework. Se precisar de logica especial por viewport,
combine classes do grid (ex: `D6T12M6` = metade no desktop, cheio no tablet, cheio no mobile).

### **P3. Posso aninhar `.linhaDoGrid` dentro de outro `.linhaDoGrid`?**
**R**: **NAO**. Isso e **ERRO CRITICO**. Gera scroll lateral e quebra todo o calculo de
colunas. Use `.containerEmColuna` ou `.containerEmLinha` para subdivisoes.

### **P4. Posso usar `D6` sem `T` e `M`?**
**R**: Nao. O framework gera apenas classes `D{n}T{n}M{n}` com os 3 breakpoints. `D6`
sozinho nao existe no CSS.

### **P5. Preciso criar um componente novo que nao existe no framework. O que fazer?**
**R**: Opcao 1 (recomendada): contribuir upstream adicionando o componente ao framework.
Opcao 2 (se for muito especifico): criar o CSS no seu projeto USANDO os mixins LESS do
framework (ou classes de cor existentes) para manter consistencia visual. NUNCA criar
CSS do zero ignorando o framework.

### **P6. Posso usar `h1`-`h6` normalmente?**
**R**: Sim, mas saiba que o framework NAO define estilos para headings. Use as variaveis
`@TamanhoPadraoTexto_*` como base se quiser tamanhos consistentes com o resto.

### **P7. Posso usar flexbox ou CSS Grid nativo diretamente?**
**R**: Para layout de pagina, NAO. Use `.linhaDoGrid` + `D{n}T{n}M{n}`. Para alinhamento
interno de um componente (ex: centralizar icone dentro de botao), pode usar flex — mas
o framework ja faz isso internamente na maioria dos componentes.

### **P8. Como faco um card simples?**
**R**: Use `.panel D{n}T{n}M{n}`:
```html
<div class="linhaDoGrid">
  <div class="panel D6T4M2">Card 1</div>
  <div class="panel D6T4M2">Card 2</div>
  <div class="panel D6T4M2">Card 3</div>
</div>
```

### **P9. Como faco um formulario com 2 colunas no desktop e 1 no mobile?**
**R**:
```html
<div class="linhaDoGrid">
  <div class="panel D9T6M6 containerEmColuna">
    <input class="itemForm input" placeholder="Coluna 1 Campo 1">
    <input class="itemForm input" placeholder="Coluna 1 Campo 2">
  </div>
  <div class="panel D9T6M6 containerEmColuna">
    <input class="itemForm input" placeholder="Coluna 2 Campo 1">
    <input class="itemForm input" placeholder="Coluna 2 Campo 2">
  </div>
</div>
```

### **P10. Como adiciono um hover state custom a um `.bt`?**
**R**: Use os mixins do framework no seu LESS proprio:
```less
.meuBotao {
  .bt;  // herda estilos do bt (se voce estiver em LESS)
}
.meuBotao:hover {
  .backgroundColor(@CorPrimaria; 100%; 0%; 0%; 0%; 10%);  // 10% mais escuro
}
```

Se voce nao tem LESS no projeto, use `.bt` direto no HTML e adicione sua classe extra:
```html
<button class="itemForm bt meuBotao">Clique</button>
```
E no CSS do projeto:
```css
.meuBotao:hover {
  background-color: #004c6b;  /* escolha sua cor */
}
```

### **P11. Preciso recompilar o CSS toda vez que mudar uma variavel?**
**R**: Depende do que voce quer mudar.

- **Mudar o VALOR DEFAULT de uma variavel** (ex: alterar `@CorPrimaria` permanentemente):
  SIM — recompile `framework.css` (via `lessc --math=always` ou API `/api/compile`).
- **Sobrescrever uma variavel em runtime no seu projeto** (ex: usar cor primaria
  diferente em uma pagina especifica): NAO e necessario recompilar. Desde 2026-04-11 o
  framework expoe todas as 405 variaveis como CSS custom properties (`var(--*)`) em
  `:root`. Voce pode sobrescreve-las em qualquer escopo CSS:
  ```css
  .minha-pagina-azul {
      --CorPrimaria: rgb(30, 144, 255);  /* sobrescreve em runtime */
  }
  ```
  As 89 variaveis com trio `_Desktop/_Tablet/_Mobile` tambem tem versao "base" sem
  sufixo (`--EntreColuna`, `--AlturaLinhaPadrao` etc) que muda automaticamente por
  breakpoint. Ver [secao 7.0](#70-css-custom-properties-var----disponiveis-em-runtime-sem-less).

O pipeline LESS continua sendo a fonte de verdade — as CSS vars sao derivadas dele.

### **P12. Posso usar o framework com Vue/React/Angular/Svelte?**
**R**: Sim. O framework e CSS puro, funciona com qualquer framework JS. Importe o
`framework.css` no entry point e use as classes normalmente nos componentes. Para balloons,
chame `balloonsTriggerListener()` apos cada re-render para registrar os listeners nos
novos elementos.

### **P13. Preciso de build system especifico (webpack, vite, gulp)?**
**R**: Nao. O `framework.css` compilado funciona em qualquer ambiente (HTML estatico,
Express, Django, Flask, Rails, Apps Script, PHP, WordPress etc). O build so e necessario
se voce quiser compilar o LESS do zero com variaveis customizadas — nesse caso, qualquer
compilador LESS 4+ serve, com `math: 'always'`.

### **P14. Como testar que meu layout funciona em todos os breakpoints?**
**R**: Use DevTools (F12) > Device Toolbar (Ctrl+Shift+M) e teste em:
- **Desktop**: 1440x900 (ou > 992px)
- **Tablet**: 800x1024 (entre 768 e 992)
- **Mobile**: **412x915** (Samsung S26 Ultra — dispositivo de teste padrao do usuario, DPR 3)
- Tablet de teste alternativo: **800x1280** (Lenovo Tab M11, DPR 1.5)

Ver `~/.claude/projects/-home-cazouvilela/memory/user_dispositivos_teste.md`.

### **P15. Minhas mudancas nao aparecem no showcase local — por que?**
**R**: Provavelmente o `frameworkOverrides.js` tem um CSS antigo em `localStorage`. Clique
"Limpar" no topo do showcase, ou limpe o localStorage via DevTools.

### **P16. O `framework.css` e enorme (~1.2MB) — posso reduzir com PurgeCSS?**
**R**: Nao. As classes `D{n}T{n}M{n}` sao aplicadas via interpolacao no HTML e o PurgeCSS
nao consegue detectar. Habilite gzip/brotli (vai para ~60KB) e cache agressivo em vez disso.

### **P17. Como faco para adicionar um novo icone SVG?**
**R**: Contribuir upstream: adicionar o arquivo `.svg` em `public/icones/` do projeto
`framework_css` e fazer commit. Depois da aprovacao, o icone vira disponivel via
`<span data-icon="nome"></span>` em todos os projetos que consumirem o framework.

### **P18. Como faco para modificar a cor primaria SO no meu projeto, sem mudar o framework?**
**R**: Tres opcoes:
1. **Opcao rapida**: sobrescrever via CSS no arquivo do seu projeto (depois do framework):
   ```css
   .primaria, .menuPrincipal, .panel { background-color: #1e90ff !important; }
   ```
   (hacky, quebra a coerencia do sistema de variantes)
2. **Opcao correta (recomendada)**: gerar um `framework.css` customizado via API:
   ```bash
   curl -X POST https://framework-css.sistema.cloud/api/compile \
     -H "Content-Type: application/json" \
     -d '{"variables":{"CorPrimaria":"rgb(30,144,255)"}}' | jq -r '.css' > projeto/css/framework.css
   ```
3. **Opcao avancada**: importar o LESS source e sobrescrever `@CorPrimaria` antes do
   `@import "framework.less"`, compilando localmente com `math: 'always'`.

### **P19. Posso customizar o numero de colunas (ex: 16 em vez de 18 no desktop)?**
**R**: Sim, mudando `@NumeroDecolunas_Desktop: 18;` para o valor desejado e recompilando.
**Atencao**: todas as classes `D{n}T{n}M{n}` sao geradas dinamicamente, entao voce deixa
de ter `D17`, `D18` — so ira ate `D16`. HTML existente com `D18` quebraria. Mudanca
invasiva; prefira manter o padrao 18/12/6.

### **P20. Posso usar o framework em Apps Script (Google Sheets/Docs)?**
**R**: Sim. Incluir o CSS no `<head>` da `HtmlService.createHtmlOutputFromFile()`. Para
ambientes sem servidor (Apps Script), usar a Estrategia A (asset estatico copiado para
um arquivo HTML/CSS do projeto). A API `/api/compile` tambem pode ser usada em build
time para gerar o CSS com cores do projeto.

### **P21. Qual container usar para colocar um balloon em um botao/input/icone?**
**R**: Depende do elemento ancora. Ver a [tabela completa em 4.6.1](#461-containers--escolha-qual-usar-importante):

- **Botao/icone/link de tamanho variavel** -> `.containerComBalloon` (inline-flex,
  encolhe para o conteudo; triangulo aponta para o elemento, nao para a borda da
  celula do grid)
- **Input/itemForm que ocupa a coluna inteira** -> `.containerItemFormComBalloon`
  (flex, `width: 100%`)
- **Input com icone DENTRO do campo E balloon** -> combinar classes:
  `class="containerItemFormComBalloon containerItemFormComIcone"`
- **Apenas icone dentro do input (sem balloon)** -> `.containerItemFormComIcone`
  (classe antiga, uso original)

NAO use nenhuma outra classe como wrapper de balloon (`<div>` cru sem essas classes
nao tem `position: relative` pois o normalize da `display: flex` aos divs mas nao
posiciona).

### **P22. Meus balloons nao abrem quando clico/toco. O que falta?**
**R**: Checklist:
1. O HTML inclui `<script src="/js/messageBalloons.js" defer></script>`? Sem isso, os
   balloons nao abrem em touch nem em click desktop.
2. O elemento ancora tem a classe `.balloonTrigger`?
3. O balao tem as 3 classes obrigatorias: `balloonPosition-All-*`, `balloonType-*` e
   `D{n}T{n}M{n}`?
4. O balao esta como filho direto ou irmao do trigger (ambos dentro do mesmo
   `.containerComBalloon` / `.containerItemFormComBalloon`)?
5. O container wrapper tem `position: relative`? (as classes
   `.containerComBalloon` e `.containerItemFormComBalloon` ja aplicam isso — se voce
   usou outro wrapper, precisa adicionar `position: relative` manualmente)

### **P23. Como faco o balloon de um botao colorido (ex: .paleta-4-4) ter a setinha colorida tambem?**
**R**: Aplique a classe `.paleta-*` no proprio `.balloonType-*`. Desde 2026-04-11 todas
as classes de paleta usam o mixin `.corPaleta()` que aplica `background-color` no
elemento E `border-color` no `:after` (preenchimento da setinha). O `:before` (contorno
da setinha) mantem a cor original de `.balloonType-*`. Ver [secao 5.3](#53-mixin-corpaleta--aplicacao-automatica-em-after).

```html
<span class="balloonType-Help balloonPosition-All-Top paleta-4-4 D3T2M1">
  Balloon com fundo verde claro, setinha preenchida de verde,
  contorno original de balloonType-Help
</span>
```

### **P24. Quando devo usar `var(--Nome)` em vez de recompilar o LESS?**
**R**: Use CSS custom properties (`var(--*)`) quando:
- Voce quer sobrescrever um valor apenas em um escopo especifico (uma pagina, um
  tema, um componente) sem mudar o framework compilado.
- Voce precisa que o valor mude dinamicamente via JavaScript (ex: tema escuro).
- Voce nao tem acesso ao pipeline LESS do projeto (ex: HTML estatico simples).

Recompile o LESS quando:
- Voce quer mudar o default global do framework (ex: mudar `@CorPrimaria` para toda
  a aplicacao sempre).
- A customizacao envolve logica que os mixins do framework resolvem em tempo de
  compilacao (ex: gerar uma paleta de 10 niveis).

Os dois caminhos sao complementares: recompile o LESS uma vez com as cores da marca
do projeto, depois use `var(--*)` para ajustes finos ou temas dinamicos.

---

## Referencias cruzadas

- **Memoria global do usuario**: `/home/cazouvilela/.claude/projects/-home-cazouvilela/memory/MEMORY.md`
- **Orientacoes de desenvolvimento**: `/home/cazouvilela/.claude/ORIENTACOES_DESENVOLVIMENTO.md`
- **Regra obrigatoria framework CSS**: `feedback_framework_css_padrao.md`
- **Regras criticas do grid**: `feedback_framework_css_grid_regras.md`
- **Build/deploy apos alteracao**: `feedback_build_deploy_apos_alteracao.md`
- **Dispositivos de teste (S26 Ultra, Tab M11)**: `user_dispositivos_teste.md`

**Docs do proprio framework_css** (complementares a este arquivo):
- `documentacao/FRAMEWORK_COMPLETO.md` — referencia tecnica exaustiva (legado)
- `documentacao/GUIA_IMPLANTACAO.md` — receitas de webpack/vite/gulp/lessc (legado)
- `documentacao/VARIAVEIS_REFERENCIA.md` — tabela completa das 325 variaveis (legado)
- `.claude/memory.md` — memoria do projeto framework_css (arquitetura, troubleshooting)

---

**Ultima validacao contra codigo-fonte**: 2026-04-11
**Ultima validacao visual contra showcase ao vivo**: 2026-04-08 (22 demos, 3 viewports)
**Total de screenshots de referencia gerados**: 15 (ver `/home/cazouvilela/projetos/framework_css/print_screens/doc-*.png`)
**Total de componentes catalogados**: 22 (panel, navbar, itemForm, input, containerItemFormComIcone, containerComBalloon, containerItemFormComBalloon, tituloForm, tituloForm_subTitulo, bt, passos, balloon, modal, login social, spans responsivos, icones, badge, mensagemInline, loader, semPadding, centralizadorVertical, logoHomeNavbar/Container)
**Total de variaveis LESS**: 405 (`Variaveis.less`)
**Total de CSS custom properties expostas**: 405 fixas + 89 responsivas em `:root`
  (`CustomProperties.less` gerado por `scripts/generate-custom-properties.js`)
**Total de classes de grid geradas**: ~1729 `D{n}T{n}M{n}` + ~1729 `desloc-*` + 30 `item-*`
**Total de linhas no `messageBalloon.less`**: 1859
**Total de linhas no `messageBalloons.js`**: 181
