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
│   │   └── messageBalloons.js  # JS dos balloons (trigger/toggle)
│   ├── icones/                 # ~80 SVGs
│   ├── images/                 # baloon.svg, bicoBallon.svg, loader.gif
│   └── less-src/               # Fontes LESS completas
│       ├── framework.less      # Entry point (importa tudo)
│       ├── Variaveis/
│       │   ├── Variaveis.less  # TODAS as variaveis
│       │   ├── breakpoints.less
│       │   └── Mixing.less     # Mixins reutilizaveis
│       ├── Estruturas/
│       │   ├── Grid/grid.less  # Sistema de grid D{n}T{n}M{n}
│       │   └── Elementos/      # Componentes (panels, forms, navbar, etc)
│       └── Especificos/
├── arquivos_auxiliares/
│   └── FrameworkPadrao/        # Fonte original (ZIP extraido)
├── documentacao/
│   ├── FRAMEWORK_COMPLETO.md   # Documentacao detalhada
│   ├── VARIAVEIS_REFERENCIA.md # Referencia de variaveis
│   └── GUIA_IMPLANTACAO.md     # Guia de uso em outros projetos
├── scripts/
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
- Componentes: .panel, .navbar, .menuItem, .subMenu, .hamburger, .itemForm, .input, .bt, .tituloForm, .passos, .balloonTrigger, .balloonType-Help/Atencao/Erro, .modalBackground/Box, .containerbtFacebook/Google, .spanDesktop/Tablet/Mobile

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

**Ultima Atualizacao**: 2026-04-05
**Versao**: 1.0.0
**Status**: Em producao
