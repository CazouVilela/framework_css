#!/usr/bin/env node

const express = require('express');
const less = require('less');
const fs = require('fs');
const path = require('path');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

require('./config/env.config');

const app = express();
const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 4200;
// F-008: bind em 127.0.0.1 — LAN direta fica fora, mas Cloudflare tunnel
// (que conecta via localhost no próprio host) continua funcionando.
const HOST = process.env.FRAMEWORK_CSS_HOST || '127.0.0.1';

app.set('trust proxy', 1);

app.use(express.json({ limit: '256kb' })); // F-008: limite pequeno
app.use(express.static(path.join(__dirname, 'public')));

// F-008: rate limit agressivo no endpoint de compile — mitiga DoS
const compileLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas compilações. Aguarde 1 minuto.' },
  keyGenerator: (req) => ipKeyGenerator(req.ip || ''),
});

// F-008: rejeita payloads LESS suspeitos antes de compilar
const FORBIDDEN_LESS_TOKENS = [
  /data-uri\s*\(/i,      // leitura de arquivo do filesystem
  /@import\s+url\s*\(/i, // import HTTP externo
  /@import\s+\(reference\)/i,
  /\/\*.*?\*\//,         // comentários multi-linha podem esconder payloads — não bloquear, só alertar
];
function isLessPayloadSafe(payload) {
  // Bloqueia apenas os primeiros 2 padrões (o regex de comentário é só para log/debug)
  return !FORBIDDEN_LESS_TOKENS.slice(0, 2).some(re => re.test(payload));
}

// LESS source path
const LESS_SRC = path.join(__dirname, 'public', 'less-src');
const FRAMEWORK_LESS = path.join(LESS_SRC, 'framework.less');

// Default variables path
const DEFAULT_VARS_FILE = path.join(LESS_SRC, 'Variaveis', 'Variaveis.less');

// Parse LESS variables from a file
function parseLessVariables(content) {
  const vars = [];
  const lines = content.split('\n');
  let currentCategory = 'Geral';

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect category from comments
    const commentMatch = trimmed.match(/^\/\/\s*(.+)/);
    if (commentMatch && !trimmed.match(/@\w+/)) {
      currentCategory = commentMatch[1].trim();
      continue;
    }

    // Parse variable
    const varMatch = trimmed.match(/^@(\w+):\s*(.+?);/);
    if (varMatch) {
      const name = varMatch[1];
      const value = varMatch[2].trim();

      // Determine type
      let type = 'text';
      if (value.match(/^rgba?\(/i) || value.match(/^#[0-9a-f]/i)) type = 'color';
      else if (value.match(/^\d+(\.\d+)?px$/)) type = 'size';
      else if (value.match(/^\d+(\.\d+)?%$/)) type = 'percent';
      else if (value.match(/^\d+(\.\d+)?deg$/)) type = 'angle';
      else if (value.match(/^\d+(\.\d+)?s$/)) type = 'time';
      else if (value.match(/^\d+$/)) type = 'number';
      else if (value.match(/^@/)) type = 'reference';

      vars.push({ name, value, type, category: currentCategory });
    }
  }
  return vars;
}

// API: Get all default variables
app.get('/api/variables', (req, res) => {
  try {
    const content = fs.readFileSync(DEFAULT_VARS_FILE, 'utf-8');
    const vars = parseLessVariables(content);
    res.json(vars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Compile LESS with custom variables
// F-008: rate limit + validação de payload + timeout de compilação
app.post('/api/compile', compileLimiter, async (req, res) => {
  try {
    const customVars = req.body.variables || {};

    // Validação: nomes de variáveis só podem ter [a-zA-Z0-9_]; valores são checados via isLessPayloadSafe
    const VAR_NAME = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

    // Build variable overrides
    let overrides = '';
    for (const [name, value] of Object.entries(customVars)) {
      if (!VAR_NAME.test(name)) {
        return res.status(400).json({ error: `Nome de variável inválido: ${name}` });
      }
      if (value && value.trim()) {
        if (!isLessPayloadSafe(value)) {
          return res.status(400).json({ error: `Valor inseguro para variável: ${name}` });
        }
        overrides += `@${name}: ${value};\n`;
      }
    }

    if (overrides.length > 50000) {
      return res.status(413).json({ error: 'Payload de variáveis muito grande' });
    }

    // Read framework.less
    let frameworkLess = fs.readFileSync(FRAMEWORK_LESS, 'utf-8');

    // Prepend overrides AFTER variables import but BEFORE everything else
    frameworkLess = frameworkLess.replace(
      '@import "Variaveis/Variaveis.less";',
      `@import "Variaveis/Variaveis.less";\n${overrides}`
    );

    // F-008: timeout da compilação (5 segundos) — evita DoS via recursão LESS
    const renderPromise = less.render(frameworkLess, {
      paths: [LESS_SRC],
      compress: false,
      math: 'always'
    });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Compilação excedeu tempo limite')), 5000)
    );
    const output = await Promise.race([renderPromise, timeoutPromise]);

    res.json({ css: output.css });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API: Export config file
app.post('/api/export', (req, res) => {
  const customVars = req.body.variables || {};
  const projectName = req.body.projectName || 'meu_projeto';

  let lessContent = `// ============================================\n`;
  lessContent += `// Configuracao de Variaveis - ${projectName}\n`;
  lessContent += `// Framework CSS Padrao\n`;
  lessContent += `// Gerado em: ${new Date().toISOString()}\n`;
  lessContent += `// ============================================\n\n`;
  lessContent += `// Importe ESTE arquivo ANTES do framework.less\n`;
  lessContent += `// Ex: @import "variaveis-${projectName}.less";\n`;
  lessContent += `//     @import "framework.less";\n\n`;

  // Group by category
  const categories = {};
  for (const [name, value] of Object.entries(customVars)) {
    if (value && value.trim()) {
      // We don't have category info here, just output flat
      lessContent += `@${name}: ${value};\n`;
    }
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', `attachment; filename="variaveis-${projectName}.less"`);
  res.send(lessContent);
});

// Serve icones as inline SVG endpoint
app.get('/api/icon/:name', (req, res) => {
  const iconPath = path.join(__dirname, 'public', 'icones', `${req.params.name}.svg`);
  if (fs.existsSync(iconPath)) {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(iconPath);
  } else {
    res.status(404).send('Icon not found');
  }
});

// List all icons
app.get('/api/icons', (req, res) => {
  const iconsDir = path.join(__dirname, 'public', 'icones');
  const icons = fs.readdirSync(iconsDir)
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace('.svg', ''));
  res.json(icons);
});

app.listen(PORT, HOST, () => {
  console.log(`Framework CSS Showcase rodando em ${HOST}:${PORT}`);
});
