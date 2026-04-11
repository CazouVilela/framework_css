# Guia de Implantacao do Framework CSS LESS

**Versao:** 2026-04-11

Este guia descreve como integrar o framework CSS LESS em novos projetos web.

> **Nota de precedencia**: Este guia e complementar a `REFERENCIA_CLAUDE_CODE.md`
> (canonico). Em caso de conflito, consulte primeiro o REFERENCIA, depois este.

---

## Sumario

1. [Pre-requisitos](#1-pre-requisitos)
2. [Arquivos Necessarios](#2-arquivos-necessarios)
3. [Estrutura de Pastas Recomendada](#3-estrutura-de-pastas-recomendada)
4. [Passo a Passo de Integracao](#4-passo-a-passo-de-integracao)
5. [Inclusao no HTML](#5-inclusao-no-html)
6. [Customizacao via Variaveis](#6-customizacao-via-variaveis)
7. [Compilacao LESS](#7-compilacao-less)
8. [Regras de Aplicacao do Grid (OBRIGATORIO)](#8-regras-de-aplicacao-do-grid-obrigatorio)
9. [Exemplos de Implementacao](#9-exemplos-de-implementacao)
10. [Dependencias](#10-dependencias)
11. [Notas Importantes](#11-notas-importantes)

---

## 1. Pre-requisitos

- **Compilador LESS:** O framework usa LESS como preprocessador CSS. Voce precisa de:
  - `lessc` (CLI) via npm: `npm install -g less`
  - Ou plugin de compilacao LESS no seu editor/bundler (Webpack, Vite, Gulp, etc.)
  - Ou compilacao server-side (como o dotless do ASP.NET original)

- **Fonte Raleway:** O framework usa Raleway como fonte padrao. Inclua via Google Fonts:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">
  ```

---

## 2. Arquivos Necessarios

### Essenciais (minimo para funcionar)

| Arquivo | Proposito |
|---------|-----------|
| `LESS/framework.less` | Arquivo principal que importa tudo |
| `LESS/normalize.less` | Reset CSS com customizacoes do framework |
| `LESS/Variaveis/Variaveis.less` | Todas as 405 variaveis |
| `LESS/Variaveis/Mixing.less` | Todos os mixins |
| `LESS/Variaveis/CustomProperties.less` | CSS custom properties (GERADO - nao editar) |
| `LESS/Estruturas/Grid/grid.less` | Sistema de grid |
| `LESS/Estruturas/Elementos/basicos/panels.less` | Componente panel |
| `LESS/Estruturas/Elementos/basicos/textos_especificos_por_breakpoint.less` | Textos responsivos |
| `LESS/Estruturas/Elementos/basicos/bordas.less` | Classes de borda |
| `LESS/Estruturas/Elementos/basicos/messageBalloon.less` | Sistema de balloons |
| `LESS/Estruturas/Elementos/basicos/paleta.less` | Classes de cores |
| `LESS/Estruturas/Elementos/Formularios/elementosTotais.less` | Base de formularios |
| `LESS/Estruturas/Elementos/Formularios/iconesForm.less` | Icones em inputs |
| `LESS/Estruturas/Elementos/Formularios/titulos.less` | Titulos de formulario |
| `LESS/Estruturas/Elementos/Formularios/passos.less` | Wizard/steps |
| `LESS/Estruturas/Elementos/Formularios/inputs.less` | Estilos de input |
| `LESS/Estruturas/Elementos/Formularios/botoes.less` | Estilos de botao |
| `LESS/Estruturas/Elementos/NavBars/Navbar.less` | Navbar completa |
| `LESS/Estruturas/Elementos/Social_Login_Buttons/Botoes_LoginSocial.less` | Login social |

### Opcionais

| Arquivo | Proposito | Quando incluir |
|---------|-----------|---------------|
| `LESS/Especificos/Especificos.less` | Estilos da aplicacao demo | Substituir pelo seu proprio arquivo de estilos especificos |
| `JS/messageBalloons.js` | Controle touch/click de balloons (event delegation + Pointer Events) | OBRIGATORIO se usar balloons — sem ele, balloons nao abrem em touch devices |
| `icones/*.svg` | Biblioteca de icones | Copiar os que precisar |

### NAO copiar

| Arquivo | Motivo |
|---------|--------|
| `LESS/Variaveis/breakpoints.less` | Redundante (ja esta em Variaveis.less) |
| `LESS/Estruturas/Grid/grid_OLD.less` | Versao antiga com guards |
| `LESS/Estruturas/Elementos/Menu/menu.less` | Versao com guards (usar NavBars/Navbar.less) |
| `LESS/Estruturas/Elementos/Menu/Navbar.less` | Versao com guards (usar NavBars/Navbar.less) |
| `LESS/Estruturas/Elementos/alertType/alertType.less` | Versao com guards |
| `LESS/Estruturas/Elementos/Modal/Modal.less` | Versao com guards |
| `css/*.css` | Arquivos compilados antigos (recompilar) |

---

## 3. Estrutura de Pastas Recomendada

```
seu-projeto/
  src/
    styles/
      framework/
        framework.less              <-- Arquivo principal
        normalize.less
        Variaveis/
          Variaveis.less
          Mixing.less
        Estruturas/
          Grid/
            grid.less
          Elementos/
            basicos/
              panels.less
              textos_especificos_por_breakpoint.less
              bordas.less
              messageBalloon.less
              paleta.less
            Formularios/
              elementosTotais.less
              iconesForm.less
              titulos.less
              passos.less
              inputs.less
              botoes.less
            NavBars/
              Navbar.less
            Social_Login_Buttons/
              Botoes_LoginSocial.less
        Especificos/
          Especificos.less          <-- Substituir pelo seu
      custom/
        variaveis-override.less     <-- Suas customizacoes de variaveis
        estilos-projeto.less        <-- Seus estilos adicionais
    js/
      messageBalloons.js            <-- Se usar balloons
    assets/
      icones/                       <-- SVGs necessarios
  dist/
    css/
      normalize.css                 <-- Compilado
      framework.css                 <-- Compilado
```

---

## 4. Passo a Passo de Integracao

### Passo 1: Copiar os Arquivos

Copie toda a estrutura LESS listada na secao 2 para o seu projeto, mantendo a hierarquia de pastas.

### Passo 2: Criar Arquivo de Override de Variaveis (Opcional)

Se precisar customizar cores, tamanhos ou breakpoints, crie um arquivo que redefina as variaveis ANTES de importar o framework:

```less
// variaveis-override.less
@CorPrimaria: rgb(33, 150, 243);    // Azul Material
@CorSecundaria: rgb(255, 87, 34);   // Laranja profundo
@Res_Tablet: 600px;                  // Breakpoint tablet menor
@Res_Desktop: 1024px;                // Breakpoint desktop maior
```

### Passo 3: Criar Arquivo Principal do Projeto

```less
// main.less
@import "variaveis-override.less";   // Suas variaveis (sobrescreve as padroes)
@import "framework/framework.less";  // Framework completo
@import "estilos-projeto.less";      // Seus estilos adicionais
```

**Importante:** As variaveis LESS usam escopo lazy, ou seja, a ULTIMA definicao vence. Mas como `framework.less` importa `Variaveis.less` que define as variaveis, voce precisa editar `Variaveis.less` diretamente OU importar seu override DEPOIS de `Variaveis.less` mas ANTES dos componentes. A forma mais simples e editar `Variaveis.less` diretamente.

### Passo 4: Substituir Especificos.less

O arquivo `Especificos/Especificos.less` contem estilos especificos da aplicacao demo. Substitua seu conteudo pelos estilos especificos do seu projeto ou esvazie-o.

### Passo 5: Compilar

```bash
# Compilar normalize
lessc src/styles/framework/normalize.less dist/css/normalize.css

# Compilar framework
lessc src/styles/main.less dist/css/framework.css

# Ou com minificacao
lessc --clean-css src/styles/main.less dist/css/framework.min.css
```

### Passo 6: Incluir no HTML

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/framework.css">
</head>
<body>
    <!-- Seu conteudo -->
    <script src="js/messageBalloons.js" defer></script> <!-- OBRIGATORIO se usar balloons -->
</body>
</html>
```

---

## 5. Inclusao no HTML

### Ordem dos CSS

1. **normalize.css** (PRIMEIRO - reset e configuracao base flex)
2. **framework.css** (SEGUNDO - todos os componentes)
3. **seus-estilos.css** (TERCEIRO - customizacoes adicionais)

A ordem e importante porque `normalize.less` define `div { display: flex; }` que e prerequisito para todo o sistema de grid.

### Meta Viewport

O framework e responsivo e requer a meta viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Icones SVG

No projeto original, icones SVG sao incluidos via Server Side Includes (SSI):
```html
<!--#include virtual="~/App_Themes/icones/mail.svg"-->
```

Em projetos modernos, use uma das alternativas:

**Inline SVG (recomendado para icones em inputs):**
```html
<div class="containerItemFormComIcone">
    <input type="text" class="itemForm input" placeholder="E-mail">
    <svg viewBox="0 0 24 24"><!-- conteudo do SVG --></svg>
</div>
```

**Tag img:**
```html
<img src="icones/mail.svg" alt="Email">
```

**CSS background-image:**
```css
.icon-mail {
    background-image: url('icones/mail.svg');
}
```

---

## 6. Customizacao via Variaveis

### Duas formas de customizar

**A) Em build-time (recompilar LESS)** — mudanca permanente no `framework.css`:

Edite `Variaveis.less`, **rode o gerador de CustomProperties** (`node scripts/generate-custom-properties.js`) e **recompile** o LESS com `math: 'always'`.

```bash
cd framework_css
# apenas se adicionou/renomeou/removeu variaveis (altera lista de var(--*)):
node scripts/generate-custom-properties.js
# sempre:
node_modules/.bin/lessc --math=always public/less-src/framework.less public/css/framework.css
```

**B) Em runtime (CSS custom properties `var(--*)`)** — sobrescrita em qualquer escopo CSS, sem recompilar:

Desde 2026-04-11, todas as 405 variaveis LESS sao expostas como CSS custom properties em `:root`. Voce pode sobrescreve-las em qualquer nivel do CSS do seu projeto:

```css
/* Tema azul aplicado apenas em uma rota/pagina */
.pagina-azul {
    --CorPrimaria:   rgb(30, 144, 255);
    --CorSecundaria: rgb(220, 53, 69);
}

/* Tema escuro dinamico via JS */
html[data-theme="dark"] {
    --CorFundo:        rgb(18, 18, 18);
    --CorFontePadrao:  rgb(240, 240, 240);
}
```

Alem das variaveis fixas, o framework expoe 89 "bases responsivas" sem sufixo (ex: `var(--EntreColuna)`, `var(--AlturaLinhaPadrao)`) que mudam **automaticamente** por breakpoint. Ver secao 7.0 do `REFERENCIA_CLAUDE_CODE.md`.

### Cores

Para mudar o esquema de cores em build-time, edite em `Variaveis.less`:

```less
// Cores principais
@CorPrimaria:      rgb(33, 150, 243);   // Azul
@CorSecundaria:    rgb(255, 87, 34);    // Laranja
@CorTercearia:     rgb(238, 238, 238);  // Cinza claro

// Cores semanticas
@CorAtencao:       rgb(255, 193, 7);    // Amarelo
@CorNegacao:       rgb(244, 67, 54);    // Vermelho
@CorPositivacao:   rgb(76, 175, 80);    // Verde

// Cor do gradiente (escurece elementos)
@CorGradiente:     rgb(33, 33, 33);

// Cor do texto
@CorFontePadrao:   rgb(33, 33, 33);
```

### Grid

Para alterar o numero de colunas ou gutters:

```less
// Breakpoints
@Res_Tablet:  768px;
@Res_Desktop: 1200px;   // Desktop a partir de 1200px

// Colunas
@NumeroDecolunas_Desktop: 12;  // Grid de 12 colunas
@NumeroDecolunas_Tablet:  8;
@NumeroDecolunas_Mobile:  4;

// Gutters
@EntreColuna_Desktop: 16px;
@EntreColuna_Tablet:  12px;
@EntreColuna_Mobile:  8px;
```

**ATENCAO:** Alterar o numero de colunas afeta TODAS as classes geradas. Se mudar de 18 para 12, as classes `D13T...` a `D18T...` nao existirao mais.

### Fontes

```less
@FontFamilyPadrao:  'Inter', sans-serif;
@FontFamilyNavbar:  'Inter', sans-serif;

@TamanhoPadraoTexto_Desktop: 16px;
@TamanhoPadraoTexto_Tablet:  14px;
@TamanhoPadraoTexto_Mobile:  13px;
```

### Bordas

```less
// Raio uniforme
@RaioBordaEsquerdaSuperior_Desktop:  8px;
@RaioBordaDireitaSuperior_Desktop:   8px;
@RaioBordaDireitaInferior_Desktop:   8px;
@RaioBordaEsquerdaInferior_Desktop:  8px;
```

### Sombras

```less
// Desativar sombras
@SombraHorizontal_Desktop: 0px;
@SombraVertical_Desktop:   0px;
@BlurSombra_Desktop:       0px;
// ... idem para Tablet e Mobile
```

---

## 7. Compilacao LESS

### Via linha de comando (lessc)

```bash
npm install -g less
lessc framework.less framework.css
```

### Via Webpack

```javascript
// webpack.config.js
module.exports = {
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    }
};
```

### Via Vite

```javascript
// vite.config.js
export default {
    css: {
        preprocessorOptions: {
            less: {}
        }
    }
};
```

### Via Gulp

```javascript
const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('less', function() {
    return gulp.src('src/styles/framework.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
```

---

## 8. Regras de Aplicacao do Grid (OBRIGATORIO)

> **LEIA ANTES DE IMPLEMENTAR QUALQUER LAYOUT**. Estas regras se aplicam a TODOS os
> projetos que usam o framework CSS. Violar qualquer uma delas quebra o layout,
> gera scroll horizontal indesejado ou rompe a responsividade.

### 8.1. `.linhaDoGrid` = container macro de UMA linha do layout

Cada elemento `.linhaDoGrid` representa **uma linha** dentro do layout da pagina.
Dentro dele ficam organizados os elementos que compoem aquela linha. A classe
define:

- **Largura total** disponivel para a linha: `calc(100vw - scrollbar)`
- **Margens/gutters** corretos para cada viewport (Desktop/Tablet/Mobile)
- Base do **flex row wrap** onde as colunas `D{n}T{n}M{n}` sao posicionadas

Uma pagina tipica e composta por varias `.linhaDoGrid` sequenciais, uma para cada
"faixa horizontal" do layout.

### 8.2. PROIBIDO aninhar `.linhaDoGrid` dentro de outro `.linhaDoGrid`

**ESTA E A REGRA MAIS IMPORTANTE DO FRAMEWORK**.

NUNCA coloque um elemento `.linhaDoGrid` dentro de outro `.linhaDoGrid`. Isso e
considerado **erro de uso** e deve ser evitado em qualquer situacao.

**Por que isso quebra o layout**: a classe `.linhaDoGrid` define
`width: calc(100vw - scrollbar)` — ou seja, ocupa **toda a largura da viewport**,
nao a largura do container pai. Aninhar gera:

1. O filho tenta ocupar 100vw dentro de um container que ja tem margens/paddings
2. **Estouro horizontal** do layout
3. **Scroll lateral indesejado** na pagina
4. Calculos de coluna `D{n}T{n}M{n}` sobrepostos e incorretos
5. Perda da responsividade em Tablet e Mobile

**Como evitar**: quando precisar de subdivisoes dentro de uma coluna, use:

- `.containerEmColuna` — subcontainer vertical dentro da mesma linha
- `.containerEmLinha` — sub-grid dentro de uma coluna, ja aplica margens negativas compensatorias

```html
<!-- ERRADO: aninhamento proibido — quebra o layout -->
<div class="linhaDoGrid">
    <div class="linhaDoGrid">       <!-- NAO FAZER -->
        <div class="panel D6T4M2">...</div>
    </div>
</div>

<!-- CORRETO: subcontainer vertical dentro da mesma linha -->
<div class="linhaDoGrid">
    <div class="D3T2M1 containerEmColuna">
        <div class="panel D3T2M1">DIV 1</div>
        <div class="panel D3T2M1">DIV 2</div>
        <div class="panel D3T2M1">DIV 3</div>
    </div>
</div>
```

### 8.3. Formas permitidas de aplicar elementos dentro de `.linhaDoGrid`

Dentro de `.linhaDoGrid` os elementos podem ser organizados de duas formas, e essas
formas podem ser **misturadas** livremente na mesma linha:

#### Forma A — Elementos como filhos DIRETOS da linha

A forma mais simples: o elemento de layout e filho direto da `.linhaDoGrid`, ja com
sua classe de coluna `D{n}T{n}M{n}`.

```html
<div class="linhaDoGrid">
    <div class="panel D18T12M6">
        <b>Configuracoes do GRID:</b><br>
        - Desktop - 18 Colunas<br>
        - Tablet - 12 Colunas<br>
        - Mobile - 6 Colunas
    </div>
</div>
```

#### Forma B — Elementos agrupados em `.containerEmColuna`

Quando precisar empilhar varios elementos verticalmente dentro de uma faixa da linha,
use um subcontainer `.containerEmColuna`. Ele tambem recebe sua classe de coluna
`D{n}T{n}M{n}` (definindo a largura do grupo) e contem os elementos empilhados.

#### Forma C — Mistura de elementos diretos + subcontainers na mesma linha

E **permitido e incentivado** misturar as duas formas dentro de uma mesma `.linhaDoGrid`.
Os filhos diretos e os `.containerEmColuna` ficam lado a lado conforme suas classes de
coluna, respeitando o total de colunas do grid.

```html
<div class="linhaDoGrid">
    <div class="panel D1T1M1">T1</div>
    <div class="panel D1T1M0">T1</div>
    <div class="panel D1T0M0">T1</div>

    <div class="D3T2M1 containerEmColuna">
        <div class="panel D3T2M1">DIV 1</div>
        <div class="panel D3T2M1">DIV 2</div>
        <div class="panel D3T2M1">DIV 3</div>
    </div>

    <div class="panel D1T1M1">T1</div>
    <div class="panel D1T1M0">T1</div>
    <div class="panel D1T0M0">T1</div>
    <div class="panel D1T1M1">T1</div>
    <div class="panel D1T1M0">T1</div>
    <div class="panel D1T0M0">T1</div>

    <div class="D3T2M1 containerEmColuna">
        <div class="panel D3T2M1">DIV 1</div>
        <div class="panel D3T2M1">DIV 2</div>
        <div class="panel D3T2M1">DIV 3</div>
    </div>

    <div class="panel D1T1M1">T1</div>
    <div class="panel D1T1M0">T1</div>
    <div class="panel D1T0M0">T1</div>
</div>
```

Na estrutura acima, a mesma linha mistura paineis diretos (cada um consumindo uma
coluna por breakpoint) com dois agrupamentos verticais `.containerEmColuna` (cada um
ocupando `D3T2M1` da linha, com tres paineis empilhados verticalmente dentro).

### 8.4. Resumo das regras

| # | Regra | O que fazer | O que NAO fazer |
|---|-------|-------------|-----------------|
| 1 | Container macro | Usar `.linhaDoGrid` como container de cada linha | Tratar como grid generico |
| 2 | Aninhamento | Usar `.containerEmColuna` / `.containerEmLinha` para subdividir | **Aninhar `.linhaDoGrid` dentro de outro `.linhaDoGrid`** (ERRO CRITICO) |
| 3 | Elementos diretos | Filhos diretos com classe `D{n}T{n}M{n}` | Omitir classe de coluna |
| 4 | Subcontainers | Agrupar elementos verticais com `.containerEmColuna` | Usar divs genericas sem classe |
| 5 | Mistura na linha | Misturar livremente filhos diretos + subcontainers | Criar nova `.linhaDoGrid` para agrupar |

---

## 9. Exemplos de Implementacao

### Layout Basico com Sidebar

```html
<div class="linhaDoGrid">
    <!-- Sidebar: 4 colunas desktop, 3 tablet, oculta mobile -->
    <div class="D4T3M0 containerEmColuna">
        <div class="panel">Menu lateral</div>
        <div class="panel">Widget 1</div>
        <div class="panel">Widget 2</div>
    </div>
    
    <!-- Conteudo principal: 14 colunas desktop, 9 tablet, total mobile -->
    <div class="D14T9M6 containerEmColuna">
        <div class="tituloForm arredondadaSuperior">Titulo da Pagina</div>
        <div class="panel arredondadaInferior containerEmColuna">
            <p>Conteudo aqui</p>
        </div>
    </div>
</div>
```

### Formulario Completo

```html
<!-- Titulo -->
<div class="D12T10M6 desloc-D3T1M0 tituloForm arredondadaSuperior">
    Cadastro
</div>

<!-- Corpo do formulario -->
<div class="linhaDoGrid">
    <div class="panel D12T10M6 desloc-D3T1M0 containerEmColuna arredondadaInferior">
        
        <!-- Campo com icone -->
        <div class="containerItemFormComIcone">
            <input type="email" class="itemForm input" placeholder="E-mail">
            <svg><!-- mail.svg inline --></svg>
        </div>
        
        <!-- Campo com icone e balloon de ajuda -->
        <div class="containerHelpIcon">
            <div class="containerItemFormComIcone">
                <input type="password" class="itemForm input balloonTrigger" placeholder="Senha">
                <svg><!-- lock.svg inline --></svg>
                <div class="balloonPosition-All-Right balloonType-Help D3T2M1">
                    A senha deve ter pelo menos 8 caracteres.
                </div>
            </div>
        </div>
        
        <!-- Botao -->
        <input type="submit" class="itemForm bt btEntrar" value="Cadastrar">
    </div>
</div>
```

### Grid de Cards

```html
<div class="linhaDoGrid">
    <div class="panel D6T4M3 containerEmColuna">
        <div class="tituloForm">Card 1</div>
        <p>Descricao do card 1</p>
    </div>
    <div class="panel D6T4M3 containerEmColuna">
        <div class="tituloForm">Card 2</div>
        <p>Descricao do card 2</p>
    </div>
    <div class="panel D6T4M3 containerEmColuna">
        <div class="tituloForm">Card 3</div>
        <p>Descricao do card 3</p>
    </div>
</div>
```

### Navbar Minima

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
                <a href="/">Home</a>
            </div>
            <div class="menuItem paginaAtual">
                <a href="/sobre">Sobre</a>
            </div>
            <div class="menuItem">
                <a href="/contato">Contato</a>
            </div>
        </div>
    </div>
</div>
```

### Wizard de Passos

```html
<div class="D12T10M6 desloc-D3T1M0 containerEmLinha passos">
    <p>Etapas do cadastro</p>
    
    <!-- Passo concluido -->
    <div class="passoCompleto">
        <div>1</div>
        <div><svg><!-- check.svg --></svg></div>
    </div>
    
    <!-- Passo atual -->
    <div>
        <div>2</div>
        <div><svg><!-- check.svg --></svg></div>
    </div>
    
    <!-- Passo futuro -->
    <div class="passoFuturo">
        <div>3</div>
        <div><svg><!-- check.svg --></svg></div>
    </div>
</div>
```

### Textos Responsivos

```html
<div class="linhaDoGrid">
    <div class="D18T12M6">
        <span class="spanDesktop">Bem-vindo ao sistema de gerenciamento completo</span>
        <span class="spanTablet">Bem-vindo ao sistema</span>
        <span class="spanMobile">Bem-vindo</span>
    </div>
</div>
```

---

## 10. Dependencias

### Obrigatorias

| Dependencia | Versao | Proposito |
|------------|--------|-----------|
| Compilador LESS | >= 3.0 | Compilar os arquivos .less para .css |

### Recomendadas

| Dependencia | Proposito |
|------------|-----------|
| Google Fonts (Raleway) | Fonte padrao do framework |
| messageBalloons.js | Interatividade touch/click dos balloons — OBRIGATORIO se usar balloons (sem ele, touch devices nao conseguem abrir balloons). Expoe API global `window.MessageBalloons.toggle()` / `.closeAll()` |

### Sem dependencias externas de:

- jQuery
- Bootstrap
- Qualquer outro framework CSS
- JavaScript (exceto para balloons)

---

## 11. Notas Importantes

### O normalize.less define divs como flex

A customizacao mais importante do normalize e:
```css
div { display: flex; justify-content: flex-start; align-items: flex-start; }
```

Isso significa que **todas as divs do seu projeto serao flex containers**. Se isso causar problemas em partes do seu codigo que esperam `display: block`, voce precisara:
- Adicionar `display: block` explicitamente nesses elementos, OU
- Remover essa regra do normalize e adicionar `.flex` como classe utilitaria

### Classes de grid usam nomes sem prefixo

As classes de grid (`D6T4M2`) nao tem prefixo como `.col-` do Bootstrap. Isso pode causar conflitos se voce combinar com outros frameworks. Considere adicionar um prefixo se necessario.

### O sistema de grid e baseado em viewport width (vw)

As larguras sao calculadas com `100vw`, nao com porcentagens do container pai. Isso significa que `.linhaDoGrid` deve ser sempre um container de largura total. Para sub-grids dentro de colunas, use `.containerEmLinha`.

### Scrollbar e compensada

O grid compensa a largura da scrollbar (`@ScrollBar_Desktop: 20px`). Se seu design usa `overflow: hidden` no body (sem scrollbar), ajuste `@ScrollBar_Desktop` e `@ScrollBar_Tablet` para `0px`.

### Typo no gradiente Mozilla

O mixin `.gradiente()` tem um typo no prefixo Mozilla: `-moz-linear-linear-gradient` (duplo "linear"). Corrija para `-moz-linear-gradient` se precisar de suporte a Firefox antigo.

### Deteccao de tablet via hover: none

O media query de tablet inclui `(hover: none)` para detectar dispositivos touch. Isso pode capturar dispositivos inesperados. Se isso for um problema, remova a parte `, or (hover: none)` das media queries.

### Arquivo Especificos.less e projeto-especifico

O arquivo `Especificos/Especificos.less` contem estilos da aplicacao demo (menus especificos, botao entrar, etc.). Ele e importado pelo framework.less. Ao integrar em um novo projeto:
1. Esvazie o conteudo do arquivo, OU
2. Substitua pelo seus estilos especificos, OU
3. Remova o `@import` do `framework.less`

Nao o delete sem remover o import, senao a compilacao falhara.
