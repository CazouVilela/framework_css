# Framework CSS LESS - Documentacao Completa

**Versao:** Baseada em analise do codigo-fonte em 2026-04-05
**Preprocessador:** LESS
**Contexto original:** ASP.NET WebForms (VB.NET) - mas o CSS/LESS e reutilizavel em qualquer projeto web

---

## Sumario

1. [Visao Geral e Arquitetura](#1-visao-geral-e-arquitetura)
2. [Sistema de Variaveis](#2-sistema-de-variaveis)
3. [Sistema de Breakpoints](#3-sistema-de-breakpoints)
4. [Mixins Disponiveis](#4-mixins-disponiveis)
5. [Sistema de Grid](#5-sistema-de-grid)
6. [Componente: Panel](#6-componente-panel)
7. [Componente: Textos por Breakpoint](#7-componente-textos-por-breakpoint)
8. [Componente: Bordas Parciais](#8-componente-bordas-parciais)
9. [Componente: Paleta de Cores](#9-componente-paleta-de-cores)
10. [Componente: Formularios](#10-componente-formularios)
11. [Componente: Inputs](#11-componente-inputs)
12. [Componente: Icones em Formularios](#12-componente-icones-em-formularios)
13. [Componente: Botoes](#13-componente-botoes)
14. [Componente: Titulos de Formulario](#14-componente-titulos-de-formulario)
15. [Componente: Passos (Wizard/Steps)](#15-componente-passos-wizardsteps)
16. [Componente: Navbar](#16-componente-navbar)
17. [Componente: Message Balloons](#17-componente-message-balloons)
18. [Componente: Modal](#18-componente-modal)
19. [Componente: Alert Type](#19-componente-alert-type)
20. [Componente: Login Social](#20-componente-login-social)
21. [Componente: Estilos Especificos](#21-componente-estilos-especificos)
22. [JavaScript - messageBalloons.js](#22-javascript---messageballoonsjs)
23. [Normalize.less](#23-normalizeless)
24. [Icones Disponiveis](#24-icones-disponiveis)
25. [Diferenca entre grid.less e grid_OLD.less](#25-diferenca-entre-gridless-e-grid_oldless)

---

## 1. Visao Geral e Arquitetura

### O que e o Framework

E um framework CSS construido com LESS que implementa:

- **Sistema de grid responsivo** baseado em Flexbox com 3 breakpoints (Desktop, Tablet, Mobile)
- **Sistema de variaveis LESS** para customizacao completa de cores, tamanhos, espacamentos
- **Mixins reutilizaveis** para cores, bordas, sombras, gradientes e padding
- **Componentes UI** prontos: navbar, panels, formularios, botoes, modais, balloons, passos
- **Normalize.css** customizado com box-sizing border-box e divs em flex por padrao

### Arquivo Principal: framework.less

O arquivo `framework.less` importa todos os modulos na seguinte ordem:

```
Variaveis/Variaveis.less      --> Todas as variaveis (inclui breakpoints internamente)
Variaveis/Mixing.less          --> Todos os mixins

Estruturas/Grid/grid.less      --> Sistema de grid

Estruturas/Elementos/basicos/panels.less
Estruturas/Elementos/basicos/textos_especificos_por_breakpoint.less
Estruturas/Elementos/basicos/bordas.less
Estruturas/Elementos/basicos/messageBalloon.less
Estruturas/Elementos/basicos/paleta.less

Estruturas/Elementos/Formularios/elementosTotais.less
Estruturas/Elementos/Formularios/iconesForm.less
Estruturas/Elementos/Formularios/titulos.less
Estruturas/Elementos/Formularios/passos.less
Estruturas/Elementos/Formularios/inputs.less
Estruturas/Elementos/Formularios/botoes.less

Estruturas/Elementos/NavBars/Navbar.less
Estruturas/Elementos/Social_Login_Buttons/Botoes_LoginSocial.less

Especificos/Especificos.less
```

**Nota:** O arquivo `framework.less` NAO importa `normalize.less` -- este deve ser incluido separadamente no HTML.

**Nota:** O arquivo `breakpoints.less` existe na pasta Variaveis, mas NAO e importado separadamente -- as mesmas variaveis de breakpoint estao duplicadas dentro de `Variaveis.less`.

### Estrutura de Pastas

```
App_Themes/
  LESS/
    framework.less                    -- Arquivo principal (importa tudo)
    normalize.less                    -- Reset CSS (separado)
    Variaveis/
      Variaveis.less                  -- Todas as variaveis
      breakpoints.less                -- Breakpoints (redundante, ja esta em Variaveis.less)
      Mixing.less                     -- Todos os mixins
    Estruturas/
      Grid/
        grid.less                     -- Grid atual (media queries)
        grid_OLD.less                 -- Grid antigo (guards)
      Elementos/
        basicos/                      -- Panel, bordas, textos, balloons, paleta
        Formularios/                  -- Inputs, botoes, icones, titulos, passos
        Menu/                         -- Menu e Navbar (versao com guards)
        NavBars/                      -- Navbar (versao com media queries) <-- USADA
        Modal/                        -- Modal
        Social_Login_Buttons/         -- Botoes Facebook e Google
        alertType/                    -- Tipo de alerta (erro)
    Especificos/
      Especificos.less                -- Estilos especificos do projeto
  css/
    framework.css                     -- CSS compilado
    normalize.css                     -- Normalize compilado
    paleta.css                        -- Paleta compilada
  icones/                             -- SVGs de icones
```

### Filosofia do Framework

1. **Flexbox First:** Todas as `<div>` ja sao `display: flex` via normalize.less
2. **Mobile-First invertido:** O framework define estilos para os 3 breakpoints explicitamente (nao e mobile-first progressivo)
3. **Tudo via variaveis:** Cada medida, cor e espacamento e controlado por variavel LESS
4. **Mixins parametricos:** Cores, bordas, sombras e padding sao aplicados via mixins que aceitam breakpoint como parametro
5. **Classe unica multi-breakpoint:** Uma unica classe como `D6T4M2` define o comportamento em todos os breakpoints

---

## 2. Sistema de Variaveis

Todas as variaveis estao definidas em `Variaveis/Variaveis.less`. Veja o arquivo [VARIAVEIS_REFERENCIA.md](VARIAVEIS_REFERENCIA.md) para a referencia completa com todas as variaveis organizadas por categoria.

### Categorias de Variaveis

| Categoria | Quantidade | Descricao |
|-----------|-----------|-----------|
| Breakpoints | 2 | Pontos de corte responsivos |
| Grid | 10 | Colunas, gutters, scrollbar |
| Linhas | 3 | Altura padrao de linhas por breakpoint |
| Padding | 12 | Padding padrao por breakpoint |
| Bordas | 18 | Raio, espessura, estilo, efeitos de cor |
| Fontes | 5 | Familia, peso, tamanho por breakpoint |
| Cores | 6 basicas + 11 efeitos | Paleta e efeitos de transformacao |
| Gradiente | 7 | Cor, efeitos e profundidade |
| Pattern | 3 | Angulo e faixas |
| Sombreamento | 17 | Cor, efeitos, dimensoes por breakpoint |
| Navbar | ~45 | Linhas, margens, fontes, transicoes, hamburger |
| Formularios | ~55 | Margens, padding, dimensoes, icones |
| Message Balloon | ~80 | Bordas, padding, cores e fontes para Help, Atencao e Erro |

---

## 3. Sistema de Breakpoints

### Definicao

| Breakpoint | Variavel | Valor | Condicao CSS |
|-----------|----------|-------|-------------|
| **Mobile** | (abaixo de @Res_Tablet) | < 768px | `@media (max-width: 768px)` |
| **Tablet** | `@Res_Tablet` | 768px | `@media (min-width: 768px) and (max-width: 992px), or (hover: none) and (min-width: 768px)` |
| **Desktop** | `@Res_Desktop` | 992px | `@media (min-width: 992px)` |

### Detecao de Tablet por Touch

A media query para Tablet inclui `(hover: none)` como condicao alternativa. Isso significa que dispositivos touch com tela >= 768px tambem recebem estilos de Tablet, mesmo que a largura seja maior que 992px. Essa abordagem garante que tablets em modo paisagem nao recebam estilos de Desktop.

### Padrao de Media Query Usado no Codigo

```less
// Desktop
@media (min-width: @Res_Desktop) { ... }

// Tablet
@media (max-width: @Res_Desktop) and (min-width: @Res_Tablet),
       or (hover: none) and (min-width: @Res_Tablet) { ... }

// Mobile
@media (max-width: @Res_Tablet) { ... }
```

---

## 4. Mixins Disponiveis

Todos os mixins estao em `Variaveis/Mixing.less`.

### 4.1 .padding()

Aplica padding responsivo. Aceita um argumento de breakpoint predefinido ou valores customizados.

**Assinatura generica:**
```less
.padding(@PaddingTop; @PaddingRight; @PaddingBottom; @PaddingLeft)
```

**Variantes predefinidas:**
| Argumento | Descricao | Valores usados |
|-----------|-----------|---------------|
| `Mobile` | Padding para mobile | 1px 4px 1px 4px |
| `Tablet` | Padding para tablet | 3px 5px 3px 5px |
| `Desktop` | Padding para desktop | 4px 6px 4px 6px |
| `Hamburger` | Padding do menu hamburger | Calculado a partir de `@AlturaLinhaNavbar_Mobile / 6` |
| `Remover` | Remove todo padding | 0px 0px 0px 0px !important |

**Exemplo de uso:**
```less
.meuElemento {
    @media (min-width: @Res_Desktop) {
        .padding(Desktop);
    }
    @media (max-width: @Res_Tablet) {
        .padding(Mobile);
    }
}
```

### 4.2 .corVariante()

Gera uma variante de cor aplicando transformacoes encadeadas (fade, saturacao, desaturacao, clarificacao, obscurecencia). Nao produz CSS diretamente -- armazena o resultado na variavel local `@CorVariante`.

**Assinatura:**
```less
.corVariante(
    @Cor;
    @PercentualFade: 100%;
    @PercentualSaturacao: 0%;
    @PercentualDesaturacao: 0%;
    @PercentualClarificacao: 0%;
    @PercentualObscurecencia: 0%
)
```

**Ordem das transformacoes:** `fade -> saturate -> desaturate -> lighten -> darken`

**Formula resultante:**
```
@CorVariante = darken(lighten(desaturate(saturate(fade(@Cor, @PercentualFade), @PercentualSaturacao), @PercentualDesaturacao), @PercentualClarificacao), @PercentualObscurecencia)
```

### 4.3 .corVariante2()

Igual a `.corVariante()` mas para duas cores simultaneamente. Gera `@CorVariante` e `@CorVariante2`.

**Assinatura:**
```less
.corVariante2(
    @Cor;
    @Cor2;
    @PercentualFade: 100%; @PercentualSaturacao: 0%; @PercentualDesaturacao: 0%;
    @PercentualClarificacao: 0%; @PercentualObscurecencia: 0%;
    @PercentualFade2: 100%; @PercentualSaturacao2: 0%; @PercentualDesaturacao2: 0%;
    @PercentualClarificacao2: 0%; @PercentualObscurecencia2: 0%
)
```

### 4.4 .color()

Aplica cor ao texto (propriedade `color`) e ao preenchimento SVG (propriedade `fill`).

**Assinatura:**
```less
.color(
    @Cor;
    @PercentualFade: 100%;
    @PercentualSaturacao: 0%;
    @PercentualDesaturacao: 0%;
    @PercentualClarificacao: 0%;
    @PercentualObscurecencia: 0%
)
```

**CSS gerado:**
```css
color: [cor variante];
fill: [cor variante];
```

**Exemplo:**
```less
.meuTexto {
    .color(@CorPrimaria; 80%); // Cor primaria com 80% de opacidade
}
```

### 4.5 .backgroundColor()

Aplica cor de fundo.

**Assinatura generica:**
```less
.backgroundColor(
    @Cor;
    @PercentualFade: 100%;
    @PercentualSaturacao: 0%;
    @PercentualDesaturacao: 0%;
    @PercentualClarificacao: 0%;
    @PercentualObscurecencia: 0%
)
```

**Variante predefinida:**
| Argumento | Descricao |
|-----------|-----------|
| `BotaoHamburger` | Cor primaria escurecida em 20% |

**Exemplo:**
```less
.meuFundo {
    .backgroundColor(@CorSecundaria; 90%; 0%; 0%; 10%; 0%);
}
```

### 4.6 .backgroundColorPattern()

Gera um fundo com pattern de faixas diagonais (repeating-linear-gradient).

**Assinatura:**
```less
.backgroundColorPattern(
    @Cor1; @Cor2;
    @PercentualFadeCor1: 100%; ... (efeitos cor 1)
    @PercentualFadeCor2: 100%; ... (efeitos cor 2)
    @AnguloPattern: 45deg;
    @Faixa1Pattern: 4px;
    @Faixa2Pattern: 4px
)
```

**CSS gerado:**
```css
background: repeating-linear-gradient(45deg, cor1, cor1 4px, cor2 4px, cor2 8px);
```

### 4.7 .borderColor()

Aplica cor de borda com transformacoes.

**Assinatura:**
```less
.borderColor(
    @Cor;
    @PercentualFade: 100%;
    @PercentualSaturacao: 0%;
    @PercentualDesaturacao: 0%;
    @PercentualClarificacao: 0%;
    @PercentualObscurecencia: 0%
)
```

### 4.8 .gradiente()

Aplica gradiente vertical (de cima para baixo) com prefixos de browser.

**Assinatura:**
```less
.gradiente(
    @CorBase;
    @CorDoGradiente: rgb(51,51,51);
    @PercentualFadeCorBase: 100%; ... (efeitos cor base)
    @PercentualFadeDoGradiente: 100%; ... (efeitos cor gradiente)
    @ProfundidadeCorGradiente: 170%
)
```

**CSS gerado:**
```css
background-image: linear-gradient(to bottom, [corBase], [corGradiente] 170%);
```

**Nota:** O codigo contem um typo no prefixo Mozilla: `-moz-linear-linear-gradient` (duplo "linear"). Isso faz com que o prefixo Mozilla nao funcione, mas os demais browsers (webkit, standard) funcionam normalmente.

### 4.9 .sombreamento()

Aplica box-shadow com prefixos de browser e margin-bottom.

**Assinatura generica:**
```less
.sombreamento(
    @SombraHorizontal; @SombraVertical; @BlurSombra; @SpreadSombra; @Margin-botton;
    @CorSombreamento: @Preto;
    @PercentualFadeDoSombreamento: 50%;
    ... (demais efeitos de cor)
)
```

**Variantes predefinidas:**
| Argumento | Sombra H | Sombra V | Blur | Spread | Margin-bottom |
|-----------|---------|---------|------|--------|--------------|
| `Mobile` | 1px | 1px | 1px | 0px | 3px |
| `Tablet` | 1px | 1px | 2px | 0px | 4px |
| `Desktop` | 2px | 2px | 3px | 0px | 5px |
| `Remover` | 0 | 0 | 0 | 0 | 0 |

### 4.10 .bordaArredondada()

Aplica border-radius, border-width, border-style e border-color com prefixos de browser.

**Assinatura generica:**
```less
.bordaArredondada(
    @CorDaBorda: @Preto;
    @PercentualFadeDaBorda: 100%; ... (efeitos de cor)
    @EstiloDaBorda: solid;
    @RaioBordaEsquerdaSuperior; @RaioBordaDireitaSuperior;
    @RaioBordaDireitaInferior; @RaioBordaEsquerdaInferior;
    @EspessuraDaBorda
)
```

**Variantes predefinidas:**
| Argumento | Raio cantos | Espessura |
|-----------|------------|-----------|
| `Mobile` | 3px | 1px |
| `Tablet` | 4px | 1px |
| `Desktop` | 5px | 1px |
| `Remover` | 0px | 0px |
| `Menu` | - | 0px !important |
| `Inferior` | Remove raio superior |
| `Superior` | Remove raio inferior |

### 4.11 .margin()

**Variante unica:**
| Argumento | Descricao |
|-----------|-----------|
| `Remover` | `margin: 0` em todas as direcoes |

---

## 5. Sistema de Grid

### Arquivo: `Estruturas/Grid/grid.less`

### Conceito

O grid e baseado em **Flexbox** e funciona com classes que definem quantas colunas um elemento ocupa em cada breakpoint. A nomenclatura utiliza o formato `D{n}T{n}M{n}` onde:

- **D** = Desktop (numero de colunas no Desktop)
- **T** = Tablet (numero de colunas no Tablet)
- **M** = Mobile (numero de colunas no Mobile)

### Colunas por Breakpoint

| Breakpoint | Colunas | Gutter (entreColuna) | Scrollbar |
|-----------|---------|---------------------|-----------|
| Desktop | 18 | 12px | 20px |
| Tablet | 12 | 10px | 20px |
| Mobile | 6 | 8px | 1px |

### Calculo da Largura

Para Desktop:
```
width = calc(((100vw - scrollbar) / totalColunas) * numColunas - gutter)
margin-left = gutter / 2
margin-right = gutter / 2
```

### Classes Geradas

#### Classes de Colunas: `D{d}T{t}M{m}`

Geradas automaticamente por loops LESS recursivos. Cobrem todas as combinacoes possiveis:
- D: 0 a 18
- T: 0 a 12
- M: 0 a 6

**Quando o valor e 0**, o elemento recebe `display: none !important` naquele breakpoint.

**Exemplos:**

| Classe | Desktop | Tablet | Mobile |
|--------|---------|--------|--------|
| `D18T12M6` | Largura total | Largura total | Largura total |
| `D6T4M2` | 1/3 da tela | 1/3 da tela | 1/3 da tela |
| `D1T1M1` | 1 coluna | 1 coluna | 1 coluna |
| `D1T0M0` | 1 coluna | Oculto | Oculto |
| `D0T0M6` | Oculto | Oculto | Largura total |
| `D9T6M3` | Metade | Metade | Metade |

#### Classes de Deslocamento: `desloc-D{d}T{t}M{m}`

Adicionam `margin-left` calculada para "pular" colunas.

**Exemplo:**
```html
<div class="D6T4M2 desloc-D3T2M1">
    <!-- Desktop: pula 3 colunas, ocupa 6 -->
    <!-- Tablet: pula 2 colunas, ocupa 4 -->
    <!-- Mobile: pula 1 coluna, ocupa 2 -->
</div>
```

#### Classes de Ordenacao: `item-{n}`

Permitem reordenar elementos visuais sem alterar a ordem no HTML. Gera classes de `item-1` ate `item-30` (definido por `@SlotsOrdenadores`).

```html
<div class="panel D6T4M2 item-2">Aparece segundo</div>
<div class="panel D6T4M2 item-3">Aparece terceiro</div>
<div class="panel D6T4M2 item-1">Aparece primeiro</div>
```

### Containers Estruturais

#### `.linhaDoGrid`

Container de linha principal. Define:
- `flex-direction: row`
- `flex-wrap: wrap`
- `justify-content: flex-start`
- `width: calc(100vw - scrollbar)` (ajustada por breakpoint)

```html
<div class="linhaDoGrid">
    <div class="D9T6M3">Conteudo</div>
    <div class="D9T6M3">Conteudo</div>
</div>
```

##### Regras Criticas de Uso (OBRIGATORIO)

> **IMPORTANTE**: Estas regras sao inegociaveis. Violar qualquer uma delas quebra o
> layout do framework, gera scroll horizontal indesejado ou rompe a responsividade.

**1. `.linhaDoGrid` e o container MACRO de uma linha do layout**

Cada elemento `.linhaDoGrid` representa **uma linha** dentro do layout da pagina. Dentro
dele ficam organizados os demais elementos que compoem aquela linha. A classe define:

- Largura total disponivel para a linha (`100vw - scrollbar`)
- As margens/gutters corretos para cada viewport (Desktop/Tablet/Mobile)
- A base do flex row wrap onde as colunas `D{n}T{n}M{n}` sao posicionadas

**2. PROIBIDO aninhar `.linhaDoGrid` dentro de outro `.linhaDoGrid` (ERRO CRITICO)**

NUNCA coloque um elemento `.linhaDoGrid` dentro de outro `.linhaDoGrid`. Isso e
considerado erro de uso do framework e deve ser evitado em qualquer situacao.

**Por que isso quebra**: a classe `.linhaDoGrid` define `width: calc(100vw - scrollbar)`,
ou seja, ocupa **toda a largura da viewport**, nao do container pai. Aninhar gera:

- O filho tenta ocupar 100vw dentro de um container que ja tem margens/paddings
- Estouro horizontal do layout
- Aparecimento de scroll lateral indesejado
- Calculos de coluna (`D{n}T{n}M{n}`) sobrepostos e incorretos

**Como evitar**: quando precisar de subdivisoes dentro de uma coluna, use
`.containerEmColuna` (subcontainer vertical dentro da mesma linha) ou `.containerEmLinha`
(sub-grid dentro de uma coluna — ja aplica as margens negativas compensatorias).

```html
<!-- ERRADO: aninhamento proibido -->
<div class="linhaDoGrid">
    <div class="linhaDoGrid">   <!-- NAO FAZER: estoura 100vw -->
        <div class="panel D6T4M2">...</div>
    </div>
</div>

<!-- CORRETO: usar containerEmColuna como subcontainer -->
<div class="linhaDoGrid">
    <div class="D3T2M1 containerEmColuna">
        <div class="panel D3T2M1">DIV 1</div>
        <div class="panel D3T2M1">DIV 2</div>
        <div class="panel D3T2M1">DIV 3</div>
    </div>
</div>
```

**3. Elementos podem ser filhos DIRETOS de `.linhaDoGrid`**

A forma mais simples de uso e colocar os elementos de layout diretamente como filhos
da linha, ja com suas classes de coluna `D{n}T{n}M{n}`:

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

**4. Ou podem ser agrupados em subcontainers (`.containerEmColuna`)**

Dentro da mesma `.linhaDoGrid` e permitido misturar elementos diretos com
subcontainers `.containerEmColuna`. O subcontainer tambem recebe sua classe de coluna
e define um agrupamento vertical:

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

Neste exemplo, a mesma linha mistura paineis diretos (que consomem uma coluna cada)
com dois agrupamentos verticais `.containerEmColuna` (cada um ocupando `D3T2M1` da linha
e contendo tres paineis empilhados verticalmente).

**Resumo das regras**:

| Regra | O que fazer | O que nao fazer |
|-------|-------------|-----------------|
| 1 | Usar `.linhaDoGrid` como container macro de cada linha | Tratar `.linhaDoGrid` como grid generico ou aninhado |
| 2 | Aninhar subdivisoes com `.containerEmColuna` / `.containerEmLinha` | **Aninhar `.linhaDoGrid` dentro de outro `.linhaDoGrid`** (ERRO) |
| 3 | Filhos diretos com `D{n}T{n}M{n}` | Omitir a classe de coluna nos filhos |
| 4 | Agrupar em subcontainer quando precisar empilhar | Usar divs genericas sem classe de coluna |

#### `.containerEmColuna`

Transforma o layout interno de um elemento para coluna vertical.

```less
flex-direction: column !important;
```

Filhos recebem `margin-left: 0 !important; margin-right: 0 !important;`

```html
<div class="D6T4M2 containerEmColuna">
    <div class="panel">Linha 1</div>
    <div class="panel">Linha 2</div>
    <div class="panel">Linha 3</div>
</div>
```

#### `.containerEmLinha`

Permite criar sub-grids dentro de colunas. Aplica margens negativas para compensar os gutters e garante que filhos tenham margens corretas.

```html
<div class="D9T6M3 containerEmColuna">
    <div class="panel">Linha normal</div>
    <div class="containerEmLinha">
        <div class="panel D3T6M3">Sub-col 1</div>
        <div class="panel D3T6M3">Sub-col 2</div>
        <div class="panel D3T6M3">Sub-col 3</div>
    </div>
</div>
```

#### Classes nowrap

| Classe | Descricao |
|--------|-----------|
| `.nowrap` | Remove wrap em todos os breakpoints |
| `.D-nowrap` | Remove wrap apenas no Desktop |
| `.T-nowrap` | Remove wrap apenas no Tablet |
| `.M-nowrap` | Remove wrap apenas no Mobile |

### Exemplo Completo de HTML (extraido de ModelosFramework.aspx)

```html
<!-- Grid basico: 18 colunas -->
<div class="linhaDoGrid">
    <div class="panel D1T1M1">1</div>
    <div class="panel D1T1M1">2</div>
    <!-- ... ate 18 -->
</div>

<!-- Ocultando colunas excedentes -->
<div class="linhaDoGrid">
    <div class="panel D1T1M1">1-6 (visiveis em todos)</div>
    <div class="panel D1T1M0">7-12 (ocultos no mobile)</div>
    <div class="panel D1T0M0">13-18 (ocultos em tablet e mobile)</div>
</div>

<!-- Colunas duplas -->
<div class="linhaDoGrid">
    <div class="panel D2T2M2">Dupla 1</div>
    <div class="panel D2T2M2">Dupla 2</div>
    <div class="panel D2T2M2">Dupla 3</div>
</div>

<!-- Deslocamento (skip da primeira coluna) -->
<div class="linhaDoGrid">
    <div class="panel D1T1M1 desloc-D1T1M1">Comeca na 2a coluna</div>
    <div class="panel D1T1M1">Continua normalmente</div>
</div>

<!-- Reordenacao visual -->
<div class="linhaDoGrid">
    <div class="panel D6T4M2 item-2">HTML primeiro, aparece segundo</div>
    <div class="panel D6T4M2 item-3">HTML segundo, aparece terceiro</div>
    <div class="panel D6T4M2 item-1">HTML terceiro, aparece primeiro</div>
</div>

<!-- Colunas verticais com sub-grids -->
<div class="linhaDoGrid">
    <div class="panel containerEmColuna D9T6M3">
        <div class="panel">Item vertical 1</div>
        <div class="panel">Item vertical 2</div>
        <div class="containerEmLinha D-nowrap T-nowrap M-nowrap">
            <div class="panel D9T6M3">Sub-col nowrap 1</div>
            <div class="panel D9T6M3">Sub-col nowrap 2</div>
        </div>
    </div>
</div>
```

---

## 6. Componente: Panel

### Arquivo: `Estruturas/Elementos/basicos/panels.less`

### Proposito

Aplica automaticamente sombreamento (box-shadow), borda arredondada e padding responsivos a um elemento.

### Classe CSS: `.panel`

### Comportamento por Breakpoint

| Breakpoint | Sombra | Borda | Padding |
|-----------|--------|-------|---------|
| Desktop | 2px 2px 3px 0px, cor preta 50% fade | 5px raio, 1px solid | 4px 6px 4px 6px |
| Tablet | 1px 1px 2px 0px, cor preta 50% fade | 4px raio, 1px solid | 3px 5px 3px 5px |
| Mobile | 1px 1px 1px 0px, cor preta 50% fade | 3px raio, 1px solid | 1px 4px 1px 4px |

### Exemplo de Uso

```html
<div class="linhaDoGrid">
    <div class="panel D6T4M2">
        Conteudo com borda, sombra e padding automaticos
    </div>
</div>
```

---

## 7. Componente: Textos por Breakpoint

### Arquivo: `Estruturas/Elementos/basicos/textos_especificos_por_breakpoint.less`

### Proposito

Permite exibir textos diferentes dependendo do breakpoint ativo.

### Classes CSS

| Classe | Visivel em |
|--------|-----------|
| `.spanDesktop` | Apenas Desktop (>= 992px) |
| `.spanTablet` | Apenas Tablet (768px - 992px) |
| `.spanMobile` | Apenas Mobile (< 768px) |

Todos iniciam com `display: none` e sao ativados (`display: inline`) no breakpoint correspondente.

### Exemplo de Uso

```html
<span class="spanDesktop">Texto completo para desktop</span>
<span class="spanTablet">Texto medio para tablet</span>
<span class="spanMobile">Texto curto</span>
```

---

## 8. Componente: Bordas Parciais

### Arquivo: `Estruturas/Elementos/basicos/bordas.less`

### Proposito

Classes utilitarias para remover bordas de lados especificos.

### Classes CSS

| Classe | Efeito |
|--------|--------|
| `.arredondadaSuperior` | Remove arredondamento dos cantos inferiores |
| `.arredondadaInferior` | Remove arredondamento dos cantos superiores |

### Uso Tipico

Combinar com `.panel` e `.tituloForm` para criar blocos de formulario com titulo acoplado:

```html
<div class="D12T10M6 tituloForm arredondadaSuperior">Titulo</div>
<div class="panel D12T10M6 containerEmColuna arredondadaInferior">
    <!-- Conteudo do formulario -->
</div>
```

---

## 9. Componente: Paleta de Cores

### Arquivo: `Estruturas/Elementos/basicos/paleta.less`

### Proposito

Gera classes utilitarias de background-color para a paleta do projeto e variacoes sistematicas.

### Cores Base

| Classe | Cor | Valor padrao |
|--------|-----|-------------|
| `.primaria` | @CorPrimaria | rgb(0, 188, 212) - Ciano |
| `.secundaria` | @CorSecundaria | rgb(135, 35, 0) - Marrom escuro |
| `.terciaria` | @CorTercearia | rgb(204, 204, 204) - Cinza claro |
| `.corAtencao` | @CorAtencao | rgb(251, 140, 0) - Laranja |
| `.corNegacao` | @CorNegacao | rgb(204, 77, 51) - Vermelho |
| `.corPositivacao` | @CorPositivacao | rgb(51, 204, 154) - Verde |

### Variacoes de Paleta

A variavel `@CorTestada` (padrao: `@CorPrimaria`) e usada para gerar 50 variacoes em 5 series:

| Serie | Parametro variado | Classes |
|-------|------------------|---------|
| `.paleta-1-{1..10}` | Fade (100% a 10%) | Transparencia progressiva |
| `.paleta-2-{1..10}` | Saturacao (10% a 100%) | Mais saturado progressivamente |
| `.paleta-3-{1..10}` | Desaturacao (10% a 100%) | Menos saturado progressivamente |
| `.paleta-4-{1..10}` | Clarificacao (10% a 100%) | Mais claro progressivamente |
| `.paleta-5-{1..10}` | Obscurecencia (10% a 100%) | Mais escuro progressivamente |

### Exemplo de Uso (extraido de ModelosFramework.aspx)

```html
<div class="D6T3M2 containerEmColuna">
    <div class="primaria">Cor primaria</div>
    <div class="secundaria">Cor secundaria</div>
    <div class="terciaria">Cor terciaria</div>
</div>
<div class="D6T3M2 containerEmColuna">
    <div class="corNegacao">Cor Negacao</div>
    <div class="corAtencao">Cor Atencao</div>
    <div class="corPositivacao">Cor Positivacao</div>
</div>
```

---

## 10. Componente: Formularios

### Arquivo: `Estruturas/Elementos/Formularios/elementosTotais.less`

### Proposito

Define o estilo base para TODOS os elementos de formulario (inputs, selects, textareas, botoes).

### Classe CSS: `.itemForm`

### Comportamento por Breakpoint

| Propriedade | Desktop | Tablet | Mobile |
|------------|---------|--------|--------|
| Borda | 5px raio, 1px solid | 4px raio, 1px solid | 3px raio, 1px solid |
| Padding | 4px 6px 4px 6px | 3px 5px 3px 5px | 1px 4px 1px 4px |
| Width | calc(100% - margens) | calc(100% - margens) | calc(100% - margens) |
| Height | 40px (46 - 3*2) | 34px (40 - 3*2) | 34px (36 - 1*2) |
| Margin top/bottom | 3px | 2px | 1px |
| Margin left/right | 0px | 0px | 0px |

**Cor da borda:** Preto com 70% de opacidade.

### Exemplo de HTML (extraido do comentario no .less)

```html
<div class="containerItemFormComIcone">
    <input type="text" class="itemForm input" placeholder="Senha" />
    <svg><!-- icone lock.svg --></svg>
</div>
```

---

## 11. Componente: Inputs

### Arquivo: `Estruturas/Elementos/Formularios/INPUTS.less`

### Proposito

Estilos especificos para campos de input.

### Classe CSS: `.input`

### Comportamento

- **Cor do texto:** Preto com 30% de opacidade (placeholder e texto inativo)
- **Cor em foco:** Preto com 80% de opacidade
- **Font-weight:** normal
- **Padding responsivo:** Usa as variaveis `@PaddingTopInput_*` etc.

### Placeholder

O placeholder tambem recebe `color: rgba(0,0,0,0.3)` via os seletores vendor-prefixed:
- `::-webkit-input-placeholder`
- `:-ms-input-placeholder`
- `::-ms-input-placeholder`
- `::placeholder`

---

## 12. Componente: Icones em Formularios

### Arquivo: `Estruturas/Elementos/Formularios/iconesForm.less`

### Proposito

Permite inserir um icone SVG dentro de um campo de input.

### Estrutura HTML

```html
<div class="containerItemFormComIcone">
    <input type="text" class="itemForm input" placeholder="E-mail" />
    <svg><!-- icone SVG incluido via SSI --></svg>
</div>
```

### Classes CSS

#### `.containerItemFormComIcone`
- `width: 100%`
- `position: relative`
- `align-items: center`

#### `.containerItemFormComIcone svg`
- `position: absolute`
- Posicionado a esquerda do input
- Tamanho e posicao calculados por breakpoint:

| Breakpoint | Left | Top | Height |
|-----------|------|-----|--------|
| Desktop | 6px | calculado para centralizar | ~30px |
| Tablet | 5px | calculado para centralizar | ~24px |
| Mobile | 4px | calculado para centralizar | ~28px |

#### `.containerItemFormComIcone svg path`
- Cor: Preto com 30% de opacidade

#### `.containerItemFormComIcone input`
- Padding-left aumentado para nao sobrepor o icone (inclui tamanho do icone + padding)

---

## 13. Componente: Botoes

### Arquivo: `Estruturas/Elementos/Formularios/Botoes.less`

### Proposito

Estilo para botoes genericos.

### Classe CSS: `.bt`

### Estilos

```less
.bt {
    color: preto 100%;
    fill: preto 100%;
    background-color: @CorTercearia; // Cinza claro
}

.bt:hover {
    background-image: gradiente(@CorTercearia -> @CorGradiente);
}
```

### Botao "Entrar" (definido em Especificos.less)

```less
.btEntrar {
    border-color: preto 70%;
    color: branco;
    background: gradiente(@CorSecundaria);
}

.btEntrar:hover {
    background: gradiente(@CorSecundaria com clarificacao 30% e obscurecencia gradiente 90%);
}
```

---

## 14. Componente: Titulos de Formulario

### Arquivo: `Estruturas/Elementos/Formularios/titulos.less`

### Proposito

Barra de titulo para secoes de formulario. Aparece como uma faixa com gradiente da cor primaria.

### Classe CSS: `.tituloForm`

### Estilos

- **Cor do texto:** `@CorFonteNavbar` (branco por padrao)
- **Fonte:** `@FontFamilyNavbar` (Raleway, sans-serif)
- **Background:** Gradiente `@CorPrimaria -> @CorGradiente`
- **Borda superior:** Arredondada (usa `.bordaArredondada(Superior)`)
- **Sombra:** Aplicada horizontalmente (vertical = 0)
- **Alinhamento:** flex center

| Breakpoint | Font-size | Height | Border-radius |
|-----------|-----------|--------|---------------|
| Desktop | 16px | 38.4px | 5px (top only) |
| Tablet | 14.4px | 33.6px | 4px (top only) |
| Mobile | 12.8px | 28.8px | 3px (top only) |

### Exemplo de Uso (extraido de Default.aspx)

```html
<div class="D12T10M6 desloc-D3T1M0 tituloForm arredondadaSuperior">
    Dados para acesso
</div>
<div class="panel D12T10M6 desloc-D3T1M0 containerEmColuna arredondadaInferior">
    <!-- Campos de formulario aqui -->
</div>
```

---

## 15. Componente: Passos (Wizard/Steps)

### Arquivo: `Estruturas/Elementos/Formularios/passos.less`

### Proposito

Indicador de progresso em passos numerados (wizard).

### Exemplo de HTML (extraido do comentario no .less)

```html
<div class="passos">
    <p>Passos para criacao de usuario</p>
    <div class="passoCompleto">
        <div>1</div>
        <div><svg><!-- check.svg --></svg></div>
    </div>
    <div>
        <div>2</div>
        <div><svg><!-- check.svg --></svg></div>
    </div>
    <div class="passoFuturo">
        <div>3</div>
        <div><svg><!-- check.svg --></svg></div>
    </div>
</div>
```

### Classes CSS

#### `.passos` (container)
- `display: flex; align-items: center; justify-content: center;`
- `margin-bottom` responsivo (14.4px Desktop, 8.4px Tablet, 3.6px Mobile)

#### `.passos > p` (titulo dos passos)
- Cor: `@CorPrimaria`
- Font-size responsivo (16px, 14px, 12px)

#### `.passos > div` (cada passo individual)
- Formato circular (border-radius = altura * 0.8)
- Background: gradiente `@CorPrimaria` com profundidade 400%
- Borda: 2px solid branco
- Font-weight: bold
- Sombra aplicada por breakpoint

| Breakpoint | Tamanho (largura/altura) | Margem lateral | Font-size |
|-----------|--------------------------|---------------|-----------|
| Desktop | 38.4px | 18px | 16px |
| Tablet | 33.6px | 15px | 14px |
| Mobile | 28.8px | 12px | 12px |

#### `.passoCompleto` (passo concluido)
- Exibe o SVG de check sobreponho ao numero
- SVG: `display: block; width: 150%; height: 150%`
- Cor do SVG: `@CorPositivacao` com 90% de opacidade

#### `.passoFuturo` (passo nao atingido)
- `background-image: none`
- Cor: cinza claro (rgba(204,204,204,1))
- Background: cinza transparente (rgba(204,204,204,0.6))
- Sombra com opacidade reduzida (15%)

---

## 16. Componente: Navbar

### Arquivo: `Estruturas/Elementos/NavBars/Navbar.less`

### Proposito

Sistema completo de navegacao com suporte a:
- Menus principal e secundario
- Submenus flyout (hover em Desktop, inline em Mobile)
- Menu hamburger para Mobile
- Items ativos, inativos e pagina atual

### Estrutura HTML Completa (extraida dos comentarios no .less)

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
        <div class="menu D9T5M2">
            <div class="menuItem">
                <a href="pagina.html">
                    <span class="iconMenu"><svg><!-- icone --></svg></span>
                    Home
                </a>
            </div>
            <div class="menuItem">
                Jobs
                <div class="subMenu">
                    <div class="subMenuItem titulo">Ultimos jobs</div>
                    <div class="subMenuItem">
                        <a href="job1.html">Job 1</a>
                    </div>
                    <div class="subMenuItem PaginaAtual">
                        <a href="job3.html">Job 3</a>
                    </div>
                    <div class="subMenuItem Inativo">
                        <a href="job5.html">Job 5</a>
                    </div>
                </div>
            </div>
            <div class="menuItem inativo">Timesheet</div>
        </div>
        <div class="menu menuSecundario D3T1M1">
            <div class="menuItem">
                <a href="login.html">Meus Dados</a>
                <div class="subMenu">
                    <!-- Conteudo do submenu de login -->
                </div>
            </div>
        </div>
    </div>
</div>
```

### Classes CSS

#### `.navbar` (container principal)
- Margens responsivas (top/bottom)
- Em Mobile: largura total, gradiente aplicado, altura fixa

| Breakpoint | Margin top | Margin bottom | Altura |
|-----------|-----------|--------------|--------|
| Desktop | 10px | 12px | auto |
| Tablet | 8px | 10px | auto |
| Mobile | 0px | 3px | 36px |

#### `.menusContainer`
- flex-direction: row, nowrap
- z-index: 10000
- Em Mobile: `transform: scaleY(0)` (colapsado por padrao)
- Transicao: 0.5s ease

#### `.menuPrincipal` / `.menuSecundario`
- Gradiente `@CorPrimaria -> @CorGradiente`
- Borda arredondada e sombra por breakpoint
- Em Mobile: inline-block, largura total, sem sombra, sem borda arredondada

#### `.menuItem`
- Texto: branco, Raleway, bold
- Transicao: 0.5s ease
- Em Desktop: float left, altura da navbar
- Em Mobile: float none, texto alinhado a direita

| Breakpoint | Altura | Font-size | Padding lateral |
|-----------|--------|-----------|----------------|
| Desktop | 48px | 20px | 10px |
| Tablet | 42px | 18px | 9px |
| Mobile | 36px | 16px | 8px |

#### `.menuItem:hover`
- background-color: @CorPrimaria

#### `.menuItem.paginaAtual`
- Gradiente com clarificacao de 5%
- Hover: background sem gradiente, clarificacao de 3%

#### `.menuItem.Inativo`
- Cor: preto com 30% opacidade
- Cursor: default
- Gradiente escurecido em 5%

#### `.subMenu`
- Desktop: posicao absoluta, transform: scaleY(0), transform-origin: top
- Aparece via `menuItem:hover .subMenu { transform: scaleY(1) }`
- Mobile: inline, sem animacao

#### `.subMenuItem`
- Bordas arredondadas por breakpoint
- Hover: background-color com clarificacao de 3%

#### `.subMenuItem.titulo`
- Font-weight: `@FontWeightNavbarSub`
- Nao clicavel

#### `.subMenuItem.Inativo`
- Cor: preto com 30% opacidade
- Cursor: default

### Menu Hamburger (Mobile)

O sistema usa um **checkbox oculto** para controlar o estado aberto/fechado sem JavaScript:

1. `.hamburgerCheckbox` - `display: none`
2. `.hamburgerDisplayButton` - Botao visivel com cor escurecida da primaria
3. `.hamburgerDisplayLines` - 3 spans que formam as 3 linhas
4. `:checked ~ .menusContainer` - Quando checked, `transform: scaleY(1)`
5. `:checked ~ .hamburgerDisplayButton > .hamburgerDisplayLines span` - Linhas viram X

Dimensoes do hamburger (Mobile):
- Altura/Largura do botao: `@AlturaLinhaNavbar_Mobile` (36px)
- Largura das linhas: 24px (36/3 * 2)
- Espessura das linhas: 1.8px (36/20)
- Espaco entre linhas: 6px (36/6)

---

## 17. Componente: Message Balloons

### Arquivo: `Estruturas/Elementos/basicos/messageBalloon.less`

### Proposito

Sistema de tooltips/balloons posicionados relativamente a um elemento pai. Suportam 8 posicoes para cada breakpoint (Desktop, Tablet, Mobile) + posicoes "All" que se adaptam automaticamente.

### Mecanismo

Os balloons usam transformacoes CSS (`transform: scaleX(0.001)` ou `scaleY(0.001)`) para ficar ocultos, e a classe `balloonStatus-Ativo` (adicionada via JS) altera para `scale(1)` com opacidade 1.

### Classes de Posicao

#### Por Breakpoint Especifico

| Posicao | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Direita | `.balloonPosition-Desktop-Right` | `.balloonPosition-Tablet-Right` | `.balloonPosition-Mobile-Right` |
| Esquerda | `.balloonPosition-Desktop-Left` | `.balloonPosition-Tablet-Left` | `.balloonPosition-Mobile-Left` |
| Topo Direita | `.balloonPosition-Desktop-TopRight` | `.balloonPosition-Tablet-TopRight` | `.balloonPosition-Mobile-TopRight` |
| Topo Esquerda | `.balloonPosition-Desktop-TopLeft` | `.balloonPosition-Tablet-TopLeft` | `.balloonPosition-Mobile-TopLeft` |
| Baixo Direita | `.balloonPosition-Desktop-BottomRight` | `.balloonPosition-Tablet-BottomRight` | `.balloonPosition-Mobile-BottomRight` |
| Baixo Esquerda | `.balloonPosition-Desktop-BottomLeft` | `.balloonPosition-Tablet-BottomLeft` | `.balloonPosition-Mobile-BottomLeft` |
| Topo Central | `.balloonPosition-Desktop-Top` | `.balloonPosition-Tablet-Top` | `.balloonPosition-Mobile-Top` |
| Baixo Central | `.balloonPosition-Desktop-Bottom` | `.balloonPosition-Tablet-Bottom` | `.balloonPosition-Mobile-Bottom` |

#### Automaticas (todos os breakpoints)

| Classe | Descricao |
|--------|-----------|
| `.balloonPosition-All-Right` | Direita em todos os breakpoints |
| `.balloonPosition-All-Left` | Esquerda em todos os breakpoints |
| `.balloonPosition-All-TopRight` | Topo-direita em todos |
| `.balloonPosition-All-TopLeft` | Topo-esquerda em todos |
| `.balloonPosition-All-BottomRight` | Baixo-direita em todos |
| `.balloonPosition-All-BottomLeft` | Baixo-esquerda em todos |
| `.balloonPosition-All-Top` | Topo central em todos |
| `.balloonPosition-All-Bottom` | Baixo central em todos |

### Classes de Tipo (Estilos Visuais)

Os tipos sao aplicados via variaveis dedicadas para cada tipo:

| Classe | Cor de Fundo | Cor da Borda | Descricao |
|--------|-------------|-------------|-----------|
| `balloonType-Help` | @CorTercearia (cinza) | @Preto clarificado 30% | Informativo |
| `balloonType-Atencao` | @CorAtencao (laranja) | @Preto | Aviso |
| `balloonType-Erro` | @CorNegacao (vermelho) | @Preto | Erro |

### Classes de Estado

| Classe | Efeito |
|--------|--------|
| `balloonStatus-Ativo` | Torna o balloon visivel (opacity: 1, transform: scale(1)) |

### Classes de Trigger

| Classe | Efeito |
|--------|--------|
| `.balloonTrigger` | Elemento que ativa/desativa o balloon ao clicar |

### Transicao

Todos os balloons tem:
- Opacidade inicial: 0
- Transicao: `all 0.3s ease-in 0.1s`
- Transform-origin: definido de acordo com a direcao do balloon

### Exemplo de Uso (extraido de Default.aspx)

```html
<!-- Input com balloon a esquerda -->
<div class="containerItemFormComIcone">
    <input type="text" class="itemForm input balloonTrigger" placeholder="E-mail" />
    <svg><!-- mail.svg --></svg>
    <div class="balloonPosition-All-Left balloonType-Help D3T2M1">
        Texto de ajuda do balloon
    </div>
</div>

<!-- Icone de ajuda (?) com balloon -->
<div class="help-icon balloonTrigger">
    <span>?</span>
    <span class="balloonPosition-All-Right balloonType-Help D3T2M1">
        Texto de ajuda
    </span>
</div>
```

---

## 18. Componente: Modal

### Arquivo: `Estruturas/Elementos/Modal/Modal.less`

### Proposito

Janela modal com overlay e caixa centralizada.

**Nota:** Este arquivo usa `& when (@breakpoint = ...)` guards em vez de media queries, indicando que pertence a versao grid_OLD.

### Classes CSS

#### `.modalBackground`
- `position: fixed; z-index: 50000;`
- Cobre toda a viewport (100vh x 100vw)
- Cor: preto com 60% de opacidade

#### `.modalBox`
- `background-color: branco`
- Centralizado verticalmente: `top: 50%; transform: translate(0%, -50%)`
- `display: flex; flex-wrap: wrap; align-items: center; justify-content: center`
- `font-size: x-large; text-align: center`

#### `.modalLoader`
- Dimensoes responsivas (tamanho do texto padrao por breakpoint)

| Breakpoint | Tamanho |
|-----------|---------|
| Desktop | 16px x 16px |
| Tablet | 14px x 14px |
| Mobile | 12px x 12px |

---

## 19. Componente: Alert Type

### Arquivo: `Estruturas/Elementos/alertType/alertType.less`

### Proposito

Estilo para alertas de erro. Utiliza guards (`& when (@breakpoint = 'all')`), indicando versao para grid_OLD.

### Classe CSS: `.error`

- Borda: solid
- Font-family: `@FontFamilyMessageballoonErro`
- Font-weight: `@FontWeightMessageballoonErro`
- Cor da borda: definida pelas variaveis `@CorBordaMessageballoonErro` com efeitos
- Cor de fundo: `@CorFundoMessageballoonErro` (@CorNegacao = vermelho)
- Cor do texto: `@CorFonteMessageballoonErro` com efeitos

---

## 20. Componente: Login Social

### Arquivo: `Estruturas/Elementos/Social_Login_Buttons/Botoes_LoginSocial.less`

### Proposito

Botoes de login com Facebook e Google.

### Exemplo de HTML (extraido do comentario no .less)

```html
<div class="containerItemFormComIcone containerbtFacebook">
    <input type="submit" class="itemForm bt" value="" />
    <div>Login com Facebook</div>
    <svg><!-- facebookbutton.svg --></svg>
</div>
```

### Classes CSS

#### `.containerbtFacebook`
- `min-width: 200px`
- `background-color: #4267b2` (azul do Facebook)
- `color: white`
- Altura calculada por breakpoint (altura da linha - margens - bordas)
- Borda arredondada
- Input interno: transparente, z-index 2000
- Texto: posicao absoluta, centralizado
- Icone SVG: cor branca

#### `.containerbtGoogle`
- `min-width: 200px`
- `background-color: white`
- `color: rgba(0,0,0,0.54)`
- Mesma estrutura que Facebook
- Icone SVG com 4 cores do Google:
  - Path 1: #FBBC05 (amarelo)
  - Path 2: #EA4335 (vermelho)
  - Path 3: #34A853 (verde)
  - Path 4: #4285F4 (azul)

---

## 21. Componente: Estilos Especificos

### Arquivo: `Especificos/Especificos.less`

### Proposito

Estilos especificos da aplicacao de demonstracao que NAO fazem parte do framework generico:

- Tamanhos minimos de submenus especificos (`#menuSecundario_acesso_SubMenu`)
- Hover customizado para subMenuItems de acesso
- Botao `.btEntrar` (gradiente da cor secundaria, texto branco)
- Link `.esqueciSenha` (sem borda, sublinhado, centralizado)
- ID especifico `#IDMenu_Secundario_IDitem_acesso_IDsubItem_criarConta`

**Nota:** Este arquivo deve ser **substituido** ao utilizar o framework em um novo projeto.

---

## 22. JavaScript - messageBalloons.js

### Arquivo: `JS/messageBalloons.js`

### Proposito

Controla a exibicao/ocultacao dos message balloons via JavaScript.

### Inicializacao

```javascript
window.addEventListener("load", balloonsTriggerListener);
```

### Funcoes

#### `balloonsTriggerListener()`
Busca todos os elementos com classe `balloonTrigger` e adiciona um event listener de `click`.

#### `balloonsTriggerClickAction()`
Quando um `balloonTrigger` e clicado:
1. Percorre os filhos do elemento clicado
2. Ignora elementos `<svg>`
3. Procura filhos que contenham a classe `balloonType` no className
4. Para cada encontrado, chama `balloonsShowHide()`

#### `balloonsShowHide(element, classeCSS)`
Alterna (toggle) a classe `balloonStatus-Ativo` no elemento:
- Se tem a classe: remove
- Se nao tem: adiciona

#### `balloonsCloseX()` (DESATIVADA)
Funcao comentada que adicionaria um botao "X" de fechamento em cada balloon ativo. A chamada `window.addEventListener("load", balloonsCloseX)` esta comentada.

### Fluxo de Funcionamento

1. Usuario clica em elemento com classe `balloonTrigger`
2. JS busca filhos com `balloonType` no nome da classe
3. Toggle da classe `balloonStatus-Ativo`
4. CSS reage: opacidade 0->1 e transform scale 0.001->1 com transicao de 0.3s

---

## 23. Normalize.less

### Arquivo: `normalize.less`

### Base

normalize.css v3.0.3 (MIT License) com customizacoes:

### Customizacoes Relevantes

1. **Box-sizing global:**
```css
* { box-sizing: border-box; }
```

2. **Divs como flex containers:**
```css
div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
```

Esta customizacao e FUNDAMENTAL para o funcionamento do framework -- todas as divs ja sao flex containers por padrao.

3. **Body sem margens:**
```css
body { margin: 0; }
```

---

## 24. Icones Disponiveis

O framework inclui 80 icones SVG na pasta `App_Themes/icones/`. Inclusao via SSI (`<!--#include virtual="~/App_Themes/icones/nome.svg"-->`) ou via tag `<img>` / inline SVG.

### Lista Completa

| Icone | Arquivo |
|-------|---------|
| Adicionar (alternativo) | `add-alt.svg` |
| Adicionar | `add.svg` |
| Anexo | `attachment.svg` |
| Sino/Notificacao | `bell.svg` |
| Favorito/Bookmark | `bookmark.svg` |
| Balao de fala | `bubble.svg` |
| Calendario | `calendar.svg` |
| Camera | `camera.svg` |
| Carrinho | `cart.svg` |
| Grafico | `chart.svg` |
| Check/Confirmacao | `check.svg` |
| Relogio | `clock.svg` |
| Nuvem | `cloud.svg` |
| Cartao de credito | `creditcard.svg` |
| Fechar (alternativo) | `cross-alt.svg` |
| Fechar | `cross.svg` |
| Mira/Crosshair | `crosshair.svg` |
| Deletar (alternativo) | `delete-alt.svg` |
| Deletar | `delete.svg` |
| Negado/Bloqueado | `denied.svg` |
| Documento | `document.svg` |
| Seta baixo | `down.svg` |
| Editar | `edit.svg` |
| Erro | `error.svg` |
| Sair | `exit.svg` |
| Olho/Visualizar | `eye.svg` |
| Facebook | `facebook.svg` |
| Facebook (botao) | `facebookbutton.svg` |
| Filtro | `filter.svg` |
| Bandeira | `flag.svg` |
| Pasta | `folder.svg` |
| Tela cheia | `fullscreen.svg` |
| Engrenagem/Config | `gear.svg` |
| Presente | `gift.svg` |
| Globo | `globe.svg` |
| Google (botao) | `googlebutton.svg` |
| Grade | `grid.svg` |
| Grupo | `group.svg` |
| Coracao | `heart.svg` |
| Ajuda | `help.svg` |
| Home | `home.svg` |
| Informacao | `info.svg` |
| Juntar/Unir | `join.svg` |
| Seta esquerda | `left.svg` |
| Lista | `list.svg` |
| Localizacao | `location.svg` |
| Cadeado | `lock.svg` |
| Email | `mail.svg` |
| Mover | `move.svg` |
| Musica | `music.svg` |
| Navegacao | `navigation.svg` |
| Telefone | `phone.svg` |
| Play | `play.svg` |
| Energia | `power.svg` |
| Impressora | `print.svg` |
| Atualizar | `refresh.svg` |
| Responder | `reply.svg` |
| Seta direita | `right.svg` |
| RSS | `rss.svg` |
| Tela/Monitor | `screen.svg` |
| Compartilhar (alt) | `share-alt.svg` |
| Compartilhar | `share.svg` |
| Sliders/Controles | `sliders.svg` |
| Smartphone | `smartphone.svg` |
| Alto-falante | `speaker.svg` |
| Dividir | `split.svg` |
| Estrela | `star.svg` |
| Etiqueta | `tag.svg` |
| Polegar baixo | `thumbs-down.svg` |
| Polegar cima | `thumbs-up.svg` |
| Lixeira | `trash.svg` |
| Twitter | `twitter.svg` |
| Desbloqueado | `unlock.svg` |
| Seta cima | `up.svg` |
| Usuario | `user.svg` |
| Video (alt) | `video-alt.svg` |
| Video | `video.svg` |
| Aviso | `warning.svg` |
| Chave inglesa | `wrench.svg` |
| Zoom/Busca | `zoom.svg` |

**Nota:** O arquivo `JNS.rp` na pasta icones e um arquivo Axure RP (prototipacao), nao um icone.

---

## 25. Diferenca entre grid.less e grid_OLD.less

O projeto contem duas versoes do grid:

### grid.less (VERSAO ATUAL - usada pelo framework.less)

- Usa **media queries CSS** para definir breakpoints:
  ```less
  @media (min-width: @Res_Desktop) { ... }
  @media (min-width: @Res_Tablet) and (max-width: @Res_Desktop), or (hover: none) { ... }
  @media (max-width: @Res_Tablet) { ... }
  ```
- Compativel com compilacao LESS padrao
- Gera CSS direto com media queries

### grid_OLD.less (VERSAO ANTIGA - nao usada)

- Usa **guards LESS** com variavel `@breakpoint`:
  ```less
  & when (@breakpoint = 'Desktop') { ... }
  & when (@breakpoint = 'Tablet') { ... }
  & when (@breakpoint = 'Mobile') { ... }
  ```
- Requer que o compilador passe a variavel `@breakpoint` externamente
- Inclui sistema adicional de **linhas** (`Lines-D{d}T{t}M{m}`) nao presente na versao atual
- As classes de deslocamento usam `!important` na versao OLD
- Mesma logica de colunas e deslocamento

### Sistema de Linhas (apenas grid_OLD)

Gera classes `Lines-D{d}T{t}M{m}` que definem `height` baseada em multiplos de `@AlturaLinhaPadrao_Desktop`:

```less
.Lines-D3T2M1 {
    // Desktop: height = 46px * 3 = 138px
    // Tablet: height = 46px * 2 = 92px
    // Mobile: height = 46px * 1 = 46px
}
```

### Outros Arquivos com Guards

Os seguintes arquivos tambem usam guards (`& when (@breakpoint = ...)`) e portanto pertencem ao modelo OLD:
- `Menu/menu.less`
- `Menu/Navbar.less`
- `Modal/Modal.less`
- `alertType/alertType.less`

O arquivo que **e importado pelo framework.less** e `NavBars/Navbar.less` (com media queries).
