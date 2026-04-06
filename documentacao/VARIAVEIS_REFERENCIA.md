# Referencia Completa de Variaveis LESS

**Fonte:** `App_Themes/LESS/Variaveis/Variaveis.less`
**Gerado em:** 2026-04-05

Este documento lista TODAS as variaveis LESS do framework, organizadas por categoria. Cada variavel inclui:
- Nome exato
- Valor padrao
- Tipo (cor, tamanho, percentual, fonte, estilo)
- Arquivos/componentes onde e usada

---

## Sumario

1. [Breakpoints](#1-breakpoints)
2. [Grid](#2-grid)
3. [Linhas](#3-linhas)
4. [Padding Padrao](#4-padding-padrao)
5. [Bordas](#5-bordas)
6. [Fontes](#6-fontes)
7. [Cores Basicas](#7-cores-basicas)
8. [Paleta de Cores](#8-paleta-de-cores)
9. [Efeitos de Cores](#9-efeitos-de-cores)
10. [Gradiente](#10-gradiente)
11. [Pattern](#11-pattern)
12. [Cor das Fontes](#12-cor-das-fontes)
13. [Sombreamento](#13-sombreamento)
14. [Cor das Bordas](#14-cor-das-bordas)
15. [Navbar - Linhas](#15-navbar---linhas)
16. [Navbar - Margens](#16-navbar---margens)
17. [Navbar - Fontes](#17-navbar---fontes)
18. [Navbar - Transicoes](#18-navbar---transicoes)
19. [Navbar - Submenu](#19-navbar---submenu)
20. [Navbar - MenuItem](#20-navbar---menuitem)
21. [Navbar - Menu Hamburger](#21-navbar---menu-hamburger)
22. [Formularios - Margens](#22-formularios---margens)
23. [Formularios - Width](#23-formularios---width)
24. [Formularios - Height](#24-formularios---height)
25. [Formularios - Padding Input](#25-formularios---padding-input)
26. [Formularios - Padding Input com Icone](#26-formularios---padding-input-com-icone)
27. [Formularios - Icones](#27-formularios---icones)
28. [Message Balloon - Espessura da Borda](#28-message-balloon---espessura-da-borda)
29. [Message Balloon - Help](#29-message-balloon---help)
30. [Message Balloon - Atencao](#30-message-balloon---atencao)
31. [Message Balloon - Erro](#31-message-balloon---erro)

---

## 1. Breakpoints

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@Res_Tablet` | `768px` | tamanho | grid.less, Navbar.less, todos os componentes (media queries) |
| `@Res_Desktop` | `992px` | tamanho | grid.less, Navbar.less, todos os componentes (media queries) |

---

## 2. Grid

| Variavel | Valor | Tipo | Descricao | Usada em |
|----------|-------|------|-----------|----------|
| `@SlotsOrdenadores` | `30` | numero | Numero maximo de classes `.item-N` geradas | grid.less |
| `@NumeroDecolunas_Desktop` | `18` | numero | Total de colunas no Desktop | grid.less |
| `@EntreColuna_Desktop` | `12px` | tamanho | Gutter entre colunas no Desktop | grid.less, containerEmLinha, messageBalloon |
| `@ScrollBar_Desktop` | `20px` | tamanho | Compensacao de scrollbar no Desktop | grid.less |
| `@NumeroDecolunas_Tablet` | `12` | numero | Total de colunas no Tablet | grid.less |
| `@EntreColuna_Tablet` | `10px` | tamanho | Gutter entre colunas no Tablet | grid.less, messageBalloon |
| `@ScrollBar_Tablet` | `20px` | tamanho | Compensacao de scrollbar no Tablet | grid.less |
| `@NumeroDecolunas_Mobile` | `6` | numero | Total de colunas no Mobile | grid.less |
| `@EntreColuna_Mobile` | `8px` | tamanho | Gutter entre colunas no Mobile | grid.less, messageBalloon |
| `@ScrollBar_Mobile` | `1px` | tamanho | Compensacao de scrollbar no Mobile | grid.less |

---

## 3. Linhas

| Variavel | Valor | Tipo | Descricao | Usada em |
|----------|-------|------|-----------|----------|
| `@AlturaLinhaPadrao_Mobile` | `36px` | tamanho | Altura padrao de linhas no Mobile | elementosTotais, Variaveis (calc) |
| `@AlturaLinhaPadrao_Tablet` | `40px` | tamanho | Altura padrao de linhas no Tablet | elementosTotais, Variaveis (calc) |
| `@AlturaLinhaPadrao_Desktop` | `46px` | tamanho | Altura padrao de linhas no Desktop | elementosTotais, Variaveis (calc) |

---

## 4. Padding Padrao

### Desktop

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTop_Desktop` | `4px` | tamanho | Mixing.less (.padding(Desktop)), panels.less |
| `@PaddingRight_Desktop` | `6px` | tamanho | Mixing.less (.padding(Desktop)), panels.less |
| `@PaddingBottom_Desktop` | `4px` | tamanho | Mixing.less (.padding(Desktop)), panels.less |
| `@PaddingLeft_Desktop` | `6px` | tamanho | Mixing.less (.padding(Desktop)), panels.less |

### Tablet

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTop_Tablet` | `3px` | tamanho | Mixing.less (.padding(Tablet)), panels.less |
| `@PaddingRight_Tablet` | `5px` | tamanho | Mixing.less (.padding(Tablet)), panels.less |
| `@PaddingBottom_Tablet` | `3px` | tamanho | Mixing.less (.padding(Tablet)), panels.less |
| `@PaddingLeft_Tablet` | `5px` | tamanho | Mixing.less (.padding(Tablet)), panels.less |

### Mobile

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTop_Mobile` | `1px` | tamanho | Mixing.less (.padding(Mobile)), panels.less |
| `@PaddingRight_Mobile` | `4px` | tamanho | Mixing.less (.padding(Mobile)), panels.less |
| `@PaddingBottom_Mobile` | `1px` | tamanho | Mixing.less (.padding(Mobile)), panels.less |
| `@PaddingLeft_Mobile` | `4px` | tamanho | Mixing.less (.padding(Mobile)), panels.less |

---

## 5. Bordas

### Efeitos de Cor da Borda (padrao)

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PercentualFadeDaBorda_Padrao` | `100%` | percentual | Mixing.less (.bordaArredondada) |
| `@PercentualSaturacaoDaBorda_Padrao` | `0%` | percentual | Mixing.less (.bordaArredondada) |
| `@PercentualDesaturacaoDaBorda_Padrao` | `0%` | percentual | Mixing.less (.bordaArredondada) |
| `@PercentualClarificacaoDaBorda_Padrao` | `0%` | percentual | Mixing.less (.bordaArredondada) |
| `@PercentualObscurecenciaDaBorda_Padrao` | `0%` | percentual | Mixing.less (.bordaArredondada) |
| `@EstiloDaBorda_Padrao` | `solid` | estilo | Mixing.less (.bordaArredondada) |

### Desktop

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@RaioBordaEsquerdaSuperior_Desktop` | `5px` | tamanho | Mixing.less, panels.less, todos com .bordaArredondada(Desktop) |
| `@RaioBordaDireitaSuperior_Desktop` | `5px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaDireitaInferior_Desktop` | `5px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaEsquerdaInferior_Desktop` | `5px` | tamanho | Mixing.less, panels.less |
| `@EspessuraDaBorda_Desktop` | `1px` | tamanho | Mixing.less, panels.less, icones (calc), titulos |

### Tablet

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@RaioBordaEsquerdaSuperior_Tablet` | `4px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaDireitaSuperior_Tablet` | `4px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaDireitaInferior_Tablet` | `4px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaEsquerdaInferior_Tablet` | `4px` | tamanho | Mixing.less, panels.less |
| `@EspessuraDaBorda_Tablet` | `1px` | tamanho | Mixing.less, panels.less, icones (calc) |

### Mobile

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@RaioBordaEsquerdaSuperior_Mobile` | `3px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaDireitaSuperior_Mobile` | `3px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaDireitaInferior_Mobile` | `3px` | tamanho | Mixing.less, panels.less |
| `@RaioBordaEsquerdaInferior_Mobile` | `3px` | tamanho | Mixing.less, panels.less |
| `@EspessuraDaBorda_Mobile` | `1px` | tamanho | Mixing.less, panels.less, icones (calc) |

---

## 6. Fontes

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@FontFamilyPadrao` | `Raleway, sans-serif, Arial, Helvetica` | fonte | passos.less, messageBalloon vars |
| `@FontWeightPadrao` | `normal` | peso | messageBalloon vars |
| `@TamanhoPadraoTexto_Desktop` | `16px` | tamanho | passos, textos, messageBalloon, modalLoader |
| `@TamanhoPadraoTexto_Tablet` | `14px` | tamanho | passos, textos, messageBalloon, modalLoader |
| `@TamanhoPadraoTexto_Mobile` | `12px` | tamanho | passos, textos, messageBalloon, modalLoader |

---

## 7. Cores Basicas

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@Preto` | `rgb(0,0,0)` | cor | elementosTotais (borderColor), INPUTS (.color), iconesForm, Botoes, Navbar (.menuItem.Inativo), Mixing (padroes) |
| `@Branco` | `rgb(255,255,255)` | cor | Navbar (hamburger linhas, menuItem cor), loginSocial, Modal |

---

## 8. Paleta de Cores

| Variavel | Valor | Tipo | Descricao | Usada em |
|----------|-------|------|-----------|----------|
| `@CorPrimaria` | `rgb(0,188,212)` | cor | Ciano - cor principal | paleta, Navbar (gradiente, hover, hamburger), passos, titulos, Especificos |
| `@CorSecundaria` | `rgb(135,35,0)` | cor | Marrom escuro - cor secundaria | paleta, Especificos (.btEntrar, subMenu hover) |
| `@CorTercearia` | `rgb(204,204,204)` | cor | Cinza claro - cor terciaria | paleta, Botoes (.bt), messageBalloon Help (fundo) |
| `@CorAtencao` | `rgb(251,140,0)` | cor | Laranja - atencao/warning | paleta, messageBalloon Atencao (fundo) |
| `@CorNegacao` | `rgb(204,77,51)` | cor | Vermelho - erro/negacao | paleta, messageBalloon Erro (fundo) |
| `@CorPositivacao` | `rgb(51,204,154)` | cor | Verde - sucesso/positivo | paleta, passos (passoCompleto SVG) |

---

## 9. Efeitos de Cores

### Padroes Globais

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PercentualFade_Padrao` | `100%` | percentual | Mixing (.corVariante, .color, .backgroundColor, .borderColor, .gradiente) |
| `@PercentualSaturacao_Padrao` | `0%` | percentual | Mixing (idem) |
| `@PercentualDesaturacao_Padrao` | `0%` | percentual | Mixing (idem) |
| `@PercentualClarificacao_Padrao` | `0%` | percentual | Mixing (idem) |
| `@PercentualObscurecencia_Padrao` | `0%` | percentual | Mixing (idem) |

---

## 10. Gradiente

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@CorGradiente` | `rgb(51,51,51)` | cor | Mixing (.gradiente), Navbar, Botoes, titulos, passos |
| `@PercentualFadeGradiente_Padrao` | `100%` | percentual | Mixing (.gradiente) |
| `@PercentualSaturacaoGradiente_Padrao` | `0%` | percentual | Mixing (.gradiente) |
| `@PercentualDesaturacaoGradiente_Padrao` | `0%` | percentual | Mixing (.gradiente) |
| `@PercentualClarificacaoGradiente_Padrao` | `0%` | percentual | Mixing (.gradiente) |
| `@PercentualObscurecenciaGradiente_Padrao` | `0%` | percentual | Mixing (.gradiente) |
| `@ProfundidadeCorGradiente_Padrao` | `170%` | percentual | Mixing (.gradiente) - determina ate onde o gradiente se estende |

---

## 11. Pattern

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@AnguloPattern_Padrao` | `45deg` | angulo | Mixing (.backgroundColorPattern) |
| `@Faixa1Pattern_Padrao` | `4px` | tamanho | Mixing (.backgroundColorPattern) - largura da faixa 1 |
| `@Faixa2Pattern_Padrao` | `4px` | tamanho | Mixing (.backgroundColorPattern) - largura da faixa 2 |

---

## 12. Cor das Fontes

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@CorFontePadrao` | `rgb(0,0,0)` | cor | messageBalloon Help/Atencao/Erro (cor da fonte) |

---

## 13. Sombreamento

### Cor e Efeitos

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@CorSombreamento_Padrao` | `@Preto` | cor | Mixing (.sombreamento) |
| `@PercentualFadeDoSombreamento_Padrao` | `50%` | percentual | Mixing (.sombreamento) |
| `@PercentualSaturacaoDoSombreamento_Padrao` | `0%` | percentual | Mixing (.sombreamento) |
| `@PercentualDesaturacaoDoSombreamento_Padrao` | `0%` | percentual | Mixing (.sombreamento) |
| `@PercentualClarificacaoDoSombreamento_Padrao` | `0%` | percentual | Mixing (.sombreamento) |
| `@PercentualObscurecenciaDoSombreamento_Padrao` | `0%` | percentual | Mixing (.sombreamento) |

### Desktop

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@SombraHorizontal_Desktop` | `2px` | tamanho | Mixing (.sombreamento(Desktop)), panels, Navbar, passos, titulos |
| `@SombraVertical_Desktop` | `2px` | tamanho | Mixing (.sombreamento(Desktop)) |
| `@BlurSombra_Desktop` | `3px` | tamanho | Mixing (.sombreamento(Desktop)) |
| `@SpreadSombra_Desktop` | `0px` | tamanho | Mixing (.sombreamento(Desktop)) |
| `@MarginBottomSombra_Desktop` | `5px` | tamanho | Mixing (.sombreamento(Desktop)) |

### Tablet

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@SombraHorizontal_Tablet` | `1px` | tamanho | Mixing (.sombreamento(Tablet)) |
| `@SombraVertical_Tablet` | `1px` | tamanho | Mixing (.sombreamento(Tablet)) |
| `@BlurSombra_Tablet` | `2px` | tamanho | Mixing (.sombreamento(Tablet)) |
| `@SpreadSombra_Tablet` | `0px` | tamanho | Mixing (.sombreamento(Tablet)) |
| `@MarginBottomSombra_Tablet` | `4px` | tamanho | Mixing (.sombreamento(Tablet)) |

### Mobile

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@SombraHorizontal_Mobile` | `1px` | tamanho | Mixing (.sombreamento(Mobile)) |
| `@SombraVertical_Mobile` | `1px` | tamanho | Mixing (.sombreamento(Mobile)) |
| `@BlurSombra_Mobile` | `1px` | tamanho | Mixing (.sombreamento(Mobile)) |
| `@SpreadSombra_Mobile` | `0px` | tamanho | Mixing (.sombreamento(Mobile)) |
| `@MarginBottomSombra_Mobile` | `3px` | tamanho | Mixing (.sombreamento(Mobile)) |

---

## 14. Cor das Bordas

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@CorDaBorda_Padrao` | `@Preto` | cor | Mixing (.bordaArredondada) como padrao |

---

## 15. Navbar - Linhas

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@AlturaLinhaNavbar_Desktop` | `48px` | tamanho | Navbar (.menuItem height), passos (margin, size calc) |
| `@AlturaLinhaNavbar_Tablet` | `42px` | tamanho | Navbar (.menuItem height), passos |
| `@AlturaLinhaNavbar_Mobile` | `36px` | tamanho | Navbar (.menuItem, .hamburgerDisplayButton height), passos, hamburger calc |

---

## 16. Navbar - Margens

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@MargemSuperiorNavbar_Desktop` | `10px` | tamanho | Navbar.less (.navbar margin-top) |
| `@MargemSuperiorNavbar_Tablet` | `8px` | tamanho | Navbar.less (.navbar margin-top) |
| `@MargemSuperiorNavbar_Mobile` | `0px` | tamanho | Navbar.less (.navbar margin-top) |
| `@MargemInferiorNavbar_Desktop` | `12px` | tamanho | Navbar.less (.navbar margin-bottom) |
| `@MargemInferiorNavbar_Tablet` | `10px` | tamanho | Navbar.less (.navbar margin-bottom) |
| `@MargemInferiorNavbar_Mobile` | `3px` | tamanho | Navbar.less (.navbar margin-bottom) |

---

## 17. Navbar - Fontes

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@FontFamilyNavbar` | `Raleway, sans-serif, Arial, Helvetica` | fonte | Navbar (.menuItem), titulos (.tituloForm) |
| `@FontWeightNavbar` | `bold` | peso | Navbar (.menuItem), Especificos |
| `@FontWeightNavbarSub` | `normal` | peso | Navbar (.subMenuItem.titulo) |
| `@TamanhoTextoNavbar_Desktop` | `20px` | tamanho | Navbar (.menuItem font-size), titulos (calc), Especificos |
| `@TamanhoTextoNavbar_Tablet` | `18px` | tamanho | Navbar (.menuItem font-size), titulos (calc) |
| `@TamanhoTextoNavbar_Mobile` | `16px` | tamanho | Navbar (.menuItem font-size), titulos (calc), Especificos |
| `@TamanhoTextoSubNavbar_Desktop` | `16px` | tamanho | Navbar (.subMenuItem font-size) |
| `@TamanhoTextoSubNavbar_Tablet` | `14px` | tamanho | Navbar (.subMenuItem font-size) |
| `@TamanhoTextoSubNavbar_Mobile` | `12px` | tamanho | Navbar (.subMenuItem font-size) |
| `@CorFonteNavbar` | `rgb(255,255,255)` | cor | Navbar (.menuItem, .menuItem a color), passos (cor, border), titulos |

---

## 18. Navbar - Transicoes

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@VelocidadeTransicaoItemMenu` | `0.5s` | tempo | Navbar (menuItem, subMenu, hamburger, menusContainer transition) |
| `@TipoTransicaoItemMenu` | `ease` | easing | Navbar (idem) |

---

## 19. Navbar - Submenu

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingBottomSubmenu_Desktop` | `5px` | tamanho | Navbar (.subMenu padding-bottom) |
| `@PaddingBottomSubmenu_Tablet` | `4px` | tamanho | Navbar (.subMenu padding-bottom) |
| `@PaddingBottomSubmenu_Mobile` | `0px` | tamanho | Navbar (.subMenu padding-bottom) |

---

## 20. Navbar - MenuItem

### Padding

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTopMenuItem_Desktop` | `0px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingRightMenuItem_Desktop` | `10px` | tamanho | Navbar (.menuItem padding, .menu padding calc, containerBotoesSubmenu) |
| `@PaddingBottomMenuItem_Desktop` | `0px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingLeftMenuItem_Desktop` | `10px` | tamanho | Navbar (.menuItem padding, .menu padding calc, containerBotoesSubmenu) |
| `@PaddingTopMenuItem_Tablet` | `0px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingRightMenuItem_Tablet` | `9px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingBottomMenuItem_Tablet` | `0px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingLeftMenuItem_Tablet` | `9px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingTopMenuItem_Mobile` | `0px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingRightMenuItem_Mobile` | `8px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingBottomMenuItem_Mobile` | `0px` | tamanho | Navbar (.menuItem padding) |
| `@PaddingLeftMenuItem_Mobile` | `8px` | tamanho | Navbar (.menuItem padding) |

### Outras

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@MinimaLinhatituloSubMenuItem_Desktop` | `40px` | tamanho | Navbar (.subMenuItem.titulo min-height) |
| `@MinimaLinhatituloSubMenuItem_Tablet` | `35px` | tamanho | Navbar (.subMenuItem.titulo min-height) |
| `@MinimaLinhatituloSubMenuItem_Mobile` | `30px` | tamanho | Navbar (.subMenuItem.titulo min-height) |

### Icone MenuItem

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@CorIconeMenuitem` | `@CorFonteNavbar` | cor | - | Navbar (.iconMenu path fill) |
| `@TamanhoIconeMenuitem_Desktop` | `17px` | tamanho | `@TamanhoTextoNavbar_Desktop - 3px` | Navbar (.iconMenu svg height) |
| `@TamanhoIconeMenuitem_Tablet` | `15.5px` | tamanho | `@TamanhoTextoNavbar_Tablet - 2.5px` | Navbar (.iconMenu svg height) |
| `@TamanhoIconeMenuitem_Mobile` | `14px` | tamanho | `@TamanhoTextoNavbar_Mobile - 2px` | Navbar (.iconMenu svg height) |

---

## 21. Navbar - Menu Hamburger

### Padding

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@PaddingTop_Hamburger` | `0px` | tamanho | - | Mixing (.padding(Hamburger)) |
| `@PaddingRight_Hamburger` | `6px` | tamanho | `@AlturaLinhaNavbar_Mobile / 6` | Mixing (.padding(Hamburger)) |
| `@PaddingBottom_Hamburger` | `0px` | tamanho | - | Mixing (.padding(Hamburger)) |
| `@PaddingLeft_Hamburger` | `6px` | tamanho | `@AlturaLinhaNavbar_Mobile / 6` | Mixing (.padding(Hamburger)) |

### Linhas do Hamburger

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@LinesHamburger_Height` | `36px` | tamanho | `@AlturaLinhaNavbar_Mobile` | Navbar (.hamburgerDisplayLines height) |
| `@LinesHamburger_Width` | `24px` | tamanho | `(@AlturaLinhaNavbar_Mobile / 3) * 2` | Navbar (.hamburgerDisplayLines width) |
| `@LinesHamburger_Espessura` | `1.8px` | tamanho | `@AlturaLinhaNavbar_Mobile / 20` | Navbar (.hamburgerDisplayLines span height, border-radius) |
| `@LinesHamburger_Espassamento` | `6px` | tamanho | `@AlturaLinhaNavbar_Mobile / 6` | Navbar (espaco entre linhas) |

### Cor

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PercentualObscurecencia_BotaoHamburger` | `20%` | percentual | Mixing (.backgroundColor(BotaoHamburger)) |

---

## 22. Formularios - Margens

### Desktop

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@margemTop_ItemForm_Desktop` | `3px` | tamanho | elementosTotais, Variaveis (calc), loginSocial |
| `@margemRight_ItemForm_Desktop` | `0px` | tamanho | elementosTotais, Variaveis (calc) |
| `@margemBottom_ItemForm_Desktop` | `3px` | tamanho | elementosTotais, Variaveis (calc), loginSocial |
| `@margemLeft_ItemForm_Desktop` | `0px` | tamanho | elementosTotais, Variaveis (calc) |

### Tablet

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@margemTop_ItemForm_Tablet` | `2px` | tamanho | elementosTotais, Variaveis (calc), messageBalloon (Tablet position calc) |
| `@margemRight_ItemForm_Tablet` | `0px` | tamanho | elementosTotais |
| `@margemBottom_ItemForm_Tablet` | `2px` | tamanho | elementosTotais, messageBalloon (Tablet position calc), loginSocial |
| `@margemLeft_ItemForm_Tablet` | `0px` | tamanho | elementosTotais |

### Mobile

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@margemTop_ItemForm_Mobile` | `1px` | tamanho | elementosTotais, Variaveis (calc), loginSocial |
| `@margemRight_ItemForm_Mobile` | `0px` | tamanho | elementosTotais |
| `@margemBottom_ItemForm_Mobile` | `1px` | tamanho | elementosTotais, loginSocial |
| `@margemLeft_ItemForm_Mobile` | `0px` | tamanho | elementosTotais |

---

## 23. Formularios - Width

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@WidthItemForm_Desktop` | `calc(100% - 0px)` | calc | `100% - (margemLeft + margemRight)` | elementosTotais |
| `@WidthItemForm_Tablet` | `calc(100% - 0px)` | calc | `100% - (margemLeft + margemRight)` | elementosTotais |
| `@WidthItemForm_Mobile` | `calc(100% - 0px)` | calc | `100% - (margemLeft + margemRight)` | elementosTotais |

---

## 24. Formularios - Height

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@HeightItemForm_Desktop` | `40px` | tamanho | `46px - (3px + 3px)` | elementosTotais, icones (calc) |
| `@HeightItemForm_Tablet` | `36px` | tamanho | `40px - (2px + 2px)` | elementosTotais, icones (calc) |
| `@HeightItemForm_Mobile` | `34px` | tamanho | `36px - (1px + 1px)` | elementosTotais, icones (calc) |

---

## 25. Formularios - Padding Input

### Desktop

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTopInput_Desktop` | `0px` | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingRightInput_Desktop` | `6px` (= @PaddingRight_Desktop) | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingBottomInput_Desktop` | `0px` | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingLeftInput_Desktop` | `6px` (= @PaddingLeft_Desktop) | tamanho | INPUTS.less, iconesForm.less, loginSocial (svg left) |

### Tablet

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTopInput_Tablet` | `0px` | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingRightInput_Tablet` | `5px` (= @PaddingRight_Tablet) | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingBottomInput_Tablet` | `0px` | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingLeftInput_Tablet` | `5px` (= @PaddingLeft_Tablet) | tamanho | INPUTS.less, iconesForm.less, loginSocial |

### Mobile

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@PaddingTopInput_Mobile` | `0px` | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingRightInput_Mobile` | `4px` (= @PaddingRight_Mobile) | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingBottomInput_Mobile` | `0px` | tamanho | INPUTS.less, iconesForm.less |
| `@PaddingLeftInput_Mobile` | `4px` (= @PaddingLeft_Mobile) | tamanho | INPUTS.less, iconesForm.less, loginSocial |

---

## 26. Formularios - Padding Input com Icone

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@PaddingTopInputIcone_Desktop` | `0px` | tamanho | - | iconesForm.less |
| `@PaddingRightInputIcone_Desktop` | `6px` | tamanho | `= @PaddingRightInput_Desktop` | iconesForm.less |
| `@PaddingBottomInputIcone_Desktop` | `0px` | tamanho | - | iconesForm.less |
| `@PaddingLeftInputIcone_Desktop` | `~42px` | tamanho | `2 * @PaddingLeftInput_Desktop + @tamanhoIcone_Desktop` | iconesForm.less |
| `@PaddingTopInputIcone_Tablet` | `0px` | tamanho | - | iconesForm.less |
| `@PaddingRightInputIcone_Tablet` | `5px` | tamanho | `= @PaddingRightInput_Tablet` | iconesForm.less |
| `@PaddingBottomInputIcone_Tablet` | `0px` | tamanho | - | iconesForm.less |
| `@PaddingLeftInputIcone_Tablet` | `~40px` | tamanho | `2 * @PaddingLeftInput_Tablet + @tamanhoIcone_Desktop` | iconesForm.less |
| `@PaddingTopInputIcone_Mobile` | `0px` | tamanho | - | iconesForm.less |
| `@PaddingRightInputIcone_Mobile` | `4px` | tamanho | `= @PaddingRightInput_Mobile` | iconesForm.less |
| `@PaddingBottomInputIcone_Mobile` | `0px` | tamanho | - | iconesForm.less |
| `@PaddingLeftInputIcone_Mobile` | `~38px` | tamanho | `2 * @PaddingLeftInput_Mobile + @tamanhoIcone_Desktop` | iconesForm.less |

**Nota:** O padding esquerdo do Tablet e Mobile usa `@tamanhoIcone_Desktop` em vez do icone do respectivo breakpoint. Isso pode ser intencional ou um bug.

---

## 27. Formularios - Icones

### Tamanho

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@tamanhoIcone_Desktop` | `~30px` | tamanho | `@HeightItemForm_Desktop - ((@margemTop + @margemBottom + @EspessuraDaBorda*2) * 2)` | iconesForm, loginSocial, Variaveis (PaddingLeftInputIcone calc) |
| `@tamanhoIcone_Tablet` | `~24px` | tamanho | Calc similar ao Desktop | iconesForm, loginSocial |
| `@tamanhoIcone_Mobile` | `~28px` | tamanho | Calc similar ao Desktop | iconesForm, loginSocial |

### Posicao Vertical (Top)

| Variavel | Valor | Tipo | Formula | Usada em |
|----------|-------|------|---------|----------|
| `@topIcone_Desktop` | `~8px` | tamanho | `@AlturaLinhaPadrao_Desktop/2 - @tamanhoIcone_Desktop/2` | iconesForm, loginSocial |
| `@topIcone_Tablet` | `~8px` | tamanho | `@AlturaLinhaPadrao_Tablet/2 - @tamanhoIcone_Tablet/2` | iconesForm, loginSocial |
| `@topIcone_Mobile` | `~4px` | tamanho | `@AlturaLinhaPadrao_Mobile/2 - @tamanhoIcone_Mobile/2` | iconesForm, loginSocial |

---

## 28. Message Balloon - Espessura da Borda

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@EspessuraDaBordaMessageballoon_Desktop` | `1px` | tamanho | messageBalloon.less (calculo posicao seta) |
| `@EspessuraDaBordaMessageballoon_Tablet` | `1px` | tamanho | messageBalloon.less (calculo posicao seta) |
| `@EspessuraDaBordaMessageballoon_Mobile` | `1px` | tamanho | messageBalloon.less (calculo posicao seta) |

---

## 29. Message Balloon - Help

### Bordas

| Variavel | Valor | Tipo | Usada em |
|----------|-------|------|----------|
| `@RaioBordaMessageballoonHelp_Desktop` | `5px` | tamanho | messageBalloon (balloonType-Help border-radius) |
| `@RaioBordaMessageballoonHelp_Tablet` | `4px` | tamanho | messageBalloon |
| `@RaioBordaMessageballoonHelp_Mobile` | `3px` | tamanho | messageBalloon |

### Padding

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@PaddingTopMessageballoonHelp_Desktop` | `4px` | tamanho |
| `@PaddingRightMessageballoonHelp_Desktop` | `6px` | tamanho |
| `@PaddingBottomMessageballoonHelp_Desktop` | `4px` | tamanho |
| `@PaddingLeftMessageballoonHelp_Desktop` | `6px` | tamanho |
| `@PaddingTopMessageballoonHelp_Tablet` | `3px` | tamanho |
| `@PaddingRightMessageballoonHelp_Tablet` | `5px` | tamanho |
| `@PaddingBottomMessageballoonHelp_Tablet` | `3px` | tamanho |
| `@PaddingLeftMessageballoonHelp_Tablet` | `5px` | tamanho |
| `@PaddingTopMessageballoonHelp_Mobile` | `1px` | tamanho |
| `@PaddingRightMessageballoonHelp_Mobile` | `4px` | tamanho |
| `@PaddingBottomMessageballoonHelp_Mobile` | `1px` | tamanho |
| `@PaddingLeftMessageballoonHelp_Mobile` | `4px` | tamanho |

### Cores

| Variavel | Valor | Tipo | Descricao |
|----------|-------|------|-----------|
| `@CorBordaMessageballoonHelp` | `@Preto` | cor | Cor base da borda |
| `@FadeCorBordaMessageballoonHelp` | `100%` | percentual | |
| `@SaturacaoCorBordaMessageballoonHelp` | `0%` | percentual | |
| `@DesaturacaoCorBordaMessageballoonHelp` | `0%` | percentual | |
| `@ClarificacaoCorBordaMessageballoonHelp` | `30%` | percentual | Borda aparece cinza |
| `@ObscurecenciaCorBordaMessageballoonHelp` | `0%` | percentual | |
| `@CorFundoMessageballoonHelp` | `@CorTercearia` | cor | Cinza claro |
| `@FadeCorFundoMessageballoonHelp` | `99%` | percentual | Quase opaco |
| `@SaturacaoCorFundoMessageballoonHelp` | `0%` | percentual | |
| `@DesaturacaoCorFundoMessageballoonHelp` | `0%` | percentual | |
| `@ClarificacaoCorFundoMessageballoonHelp` | `0%` | percentual | |
| `@ObscurecenciaCorFundoMessageballoonHelp` | `0%` | percentual | |
| `@CorFonteMessageballoonHelp` | `@CorFontePadrao` | cor | Preto |
| `@FadeCorFonteMessageballoonHelp` | `100%` | percentual | |
| `@SaturacaoCorFonteMessageballoonHelp` | `0%` | percentual | |
| `@DesaturacaoCorFonteMessageballoonHelp` | `0%` | percentual | |
| `@ClarificacaoCorFonteMessageballoonHelp` | `30%` | percentual | Texto cinza escuro |
| `@ObscurecenciaCorFonteMessageballoonHelp` | `0%` | percentual | |

### Fonte

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@FontFamilyMessageballoonHelp` | `@FontFamilyPadrao` | fonte |
| `@FontWeightMessageballoonHelp` | `@FontWeightPadrao` | peso |
| `@TamanhoTextoHelp_Desktop` | `@TamanhoPadraoTexto_Desktop` (16px) | tamanho |
| `@TamanhoTextoHelp_Tablet` | `@TamanhoPadraoTexto_Tablet` (14px) | tamanho |
| `@TamanhoTextoHelp_Mobile` | `@TamanhoPadraoTexto_Mobile` (12px) | tamanho |

---

## 30. Message Balloon - Atencao

### Bordas

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@RaioBordaMessageballoonAtencao_Desktop` | `5px` | tamanho |
| `@RaioBordaMessageballoonAtencao_Tablet` | `4px` | tamanho |
| `@RaioBordaMessageballoonAtencao_Mobile` | `3px` | tamanho |

### Padding

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@PaddingTopMessageballoonAtencao_Desktop` | `4px` | tamanho |
| `@PaddingRightMessageballoonAtencao_Desktop` | `6px` | tamanho |
| `@PaddingBottomMessageballoonAtencao_Desktop` | `4px` | tamanho |
| `@PaddingLeftMessageballoonAtencao_Desktop` | `6px` | tamanho |
| `@PaddingTopMessageballoonAtencao_Tablet` | `3px` | tamanho |
| `@PaddingRightMessageballoonAtencao_Tablet` | `5px` | tamanho |
| `@PaddingBottomMessageballoonAtencao_Tablet` | `3px` | tamanho |
| `@PaddingLeftMessageballoonAtencao_Tablet` | `5px` | tamanho |
| `@PaddingTopMessageballoonAtencao_Mobile` | `1px` | tamanho |
| `@PaddingRightMessageballoonAtencao_Mobile` | `4px` | tamanho |
| `@PaddingBottomMessageballoonAtencao_Mobile` | `1px` | tamanho |
| `@PaddingLeftMessageballoonAtencao_Mobile` | `4px` | tamanho |

### Cores

| Variavel | Valor | Tipo | Descricao |
|----------|-------|------|-----------|
| `@CorBordaMessageballoonAtencao` | `@Preto` | cor | Borda preta |
| `@FadeCorBordaMessageballoonAtencao` | `100%` | percentual | |
| `@SaturacaoCorBordaMessageballoonAtencao` | `0%` | percentual | |
| `@DesaturacaoCorBordaMessageballoonAtencao` | `0%` | percentual | |
| `@ClarificacaoCorBordaMessageballoonAtencao` | `0%` | percentual | |
| `@ObscurecenciaCorBordaMessageballoonAtencao` | `0%` | percentual | |
| `@CorFundoMessageballoonAtencao` | `@CorAtencao` | cor | Laranja |
| `@FadeCorFundoMessageballoonAtencao` | `99%` | percentual | |
| `@SaturacaoCorFundoMessageballoonAtencao` | `0%` | percentual | |
| `@DesaturacaoCorFundoMessageballoonAtencao` | `0%` | percentual | |
| `@ClarificacaoCorFundoMessageballoonAtencao` | `0%` | percentual | |
| `@ObscurecenciaCorFundoMessageballoonAtencao` | `0%` | percentual | |
| `@CorFonteMessageballoonAtencao` | `@CorFontePadrao` | cor | Preto |
| `@FadeCorFonteMessageballoonAtencao` | `100%` | percentual | |
| `@SaturacaoCorFonteMessageballoonAtencao` | `0%` | percentual | |
| `@DesaturacaoCorFonteMessageballoonAtencao` | `0%` | percentual | |
| `@ClarificacaoCorFonteMessageballoonAtencao` | `0%` | percentual | |
| `@ObscurecenciaCorFonteMessageballoonAtencao` | `0%` | percentual | |

### Fonte

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@FontFamilyMessageballoonAtencao` | `@FontFamilyPadrao` | fonte |
| `@FontWeightMessageballoonAtencao` | `@FontWeightPadrao` | peso |
| `@TamanhoTextoAtencao_Desktop` | `@TamanhoPadraoTexto_Desktop` (16px) | tamanho |
| `@TamanhoTextoAtencao_Tablet` | `@TamanhoPadraoTexto_Tablet` (14px) | tamanho |
| `@TamanhoTextoAtencao_Mobile` | `@TamanhoPadraoTexto_Mobile` (12px) | tamanho |

---

## 31. Message Balloon - Erro

### Bordas

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@RaioBordaMessageballoonErro_Desktop` | `5px` | tamanho |
| `@RaioBordaMessageballoonErro_Tablet` | `4px` | tamanho |
| `@RaioBordaMessageballoonErro_Mobile` | `3px` | tamanho |

### Padding

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@PaddingTopMessageballoonErro_Desktop` | `4px` | tamanho |
| `@PaddingRightMessageballoonErro_Desktop` | `6px` | tamanho |
| `@PaddingBottomMessageballoonErro_Desktop` | `4px` | tamanho |
| `@PaddingLeftMessageballoonErro_Desktop` | `6px` | tamanho |
| `@PaddingTopMessageballoonErro_Tablet` | `3px` | tamanho |
| `@PaddingRightMessageballoonErro_Tablet` | `5px` | tamanho |
| `@PaddingBottomMessageballoonErro_Tablet` | `3px` | tamanho |
| `@PaddingLeftMessageballoonErro_Tablet` | `5px` | tamanho |
| `@PaddingTopMessageballoonErro_Mobile` | `1px` | tamanho |
| `@PaddingRightMessageballoonErro_Mobile` | `4px` | tamanho |
| `@PaddingBottomMessageballoonErro_Mobile` | `1px` | tamanho |
| `@PaddingLeftMessageballoonErro_Mobile` | `4px` | tamanho |

### Cores

| Variavel | Valor | Tipo | Descricao |
|----------|-------|------|-----------|
| `@CorBordaMessageballoonErro` | `@Preto` | cor | Borda preta |
| `@FadeCorBordaMessageballoonErro` | `100%` | percentual | |
| `@SaturacaoCorBordaMessageballoonErro` | `0%` | percentual | |
| `@DesaturacaoCorBordaMessageballoonErro` | `0%` | percentual | |
| `@ClarificacaoCorBordaMessageballoonErro` | `0%` | percentual | |
| `@ObscurecenciaCorBordaMessageballoonErro` | `0%` | percentual | |
| `@CorFundoMessageballoonErro` | `@CorNegacao` | cor | Vermelho |
| `@FadeCorFundoMessageballoonErro` | `99%` | percentual | |
| `@SaturacaoCorFundoMessageballoonErro` | `0%` | percentual | |
| `@DesaturacaoCorFundoMessageballoonErro` | `0%` | percentual | |
| `@ClarificacaoCorFundoMessageballoonErro` | `0%` | percentual | |
| `@ObscurecenciaCorFundoMessageballoonErro` | `0%` | percentual | |
| `@CorFonteMessageballoonErro` | `@CorFontePadrao` | cor | Preto |
| `@FadeCorFonteMessageballoonErro` | `100%` | percentual | |
| `@SaturacaoCorFonteMessageballoonErro` | `0%` | percentual | |
| `@DesaturacaoCorFonteMessageballoonErro` | `0%` | percentual | |
| `@ClarificacaoCorFonteMessageballoonErro` | `0%` | percentual | |
| `@ObscurecenciaCorFonteMessageballoonErro` | `0%` | percentual | |

### Fonte

| Variavel | Valor | Tipo |
|----------|-------|------|
| `@FontFamilyMessageballoonErro` | `@FontFamilyPadrao` | fonte |
| `@FontWeightMessageballoonErro` | `@FontWeightPadrao` | peso |
| `@TamanhoTextoErro_Desktop` | `@TamanhoPadraoTexto_Desktop` (16px) | tamanho |
| `@TamanhoTextoErro_Tablet` | `@TamanhoPadraoTexto_Tablet` (14px) | tamanho |
| `@TamanhoTextoErro_Mobile` | `@TamanhoPadraoTexto_Mobile` (12px) | tamanho |
