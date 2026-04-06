# Framework CSS Padrao

Framework CSS customizado baseado em LESS com sistema de grid responsivo, componentes UI e editor de variaveis em tempo real.

## Stack

- Node.js + Express (servidor e API de compilacao LESS)
- LESS (pre-processador CSS)
- HTML/CSS/JS puro (showcase e editor)

## Acesso

- **URL publica**: https://framework-css.sistema.cloud
- **Local**: http://localhost:4200
- **Servico**: `sudo systemctl {start|stop|restart|status} framework-css`

## Paginas

- `/` — Showcase com todos os componentes do framework
- `/editor.html` — Editor de variaveis com compilacao LESS em tempo real e preview

## API

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/api/variables` | GET | Lista todas as variaveis LESS |
| `/api/compile` | POST | Compila LESS com variaveis customizadas |
| `/api/export` | POST | Gera arquivo .less para download |
| `/api/icons` | GET | Lista icones SVG disponiveis |
| `/api/icon/:name` | GET | Serve icone SVG individual |

## Configuracao

`config/.env` — porta do servidor (FRONTEND_PORT=4200).
Loader: `config/env.config.js`. NUNCA usar valores hardcoded no codigo.

## Instalacao

```bash
npm install
node server.js
```

## Documentacao

- `documentacao/FRAMEWORK_COMPLETO.md` — Documentacao detalhada de todos os componentes
- `documentacao/VARIAVEIS_REFERENCIA.md` — Referencia completa de variaveis LESS
- `documentacao/GUIA_IMPLANTACAO.md` — Como usar o framework em outros projetos
