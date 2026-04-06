#!/usr/bin/env node

const express = require('express');
const less = require('less');
const fs = require('fs');
const path = require('path');

require('./config/env.config');

const app = express();
const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 4200;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
      if (value.match(/^rgb\(/i) || value.match(/^#[0-9a-f]/i)) type = 'color';
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
app.post('/api/compile', async (req, res) => {
  try {
    const customVars = req.body.variables || {};

    // Read framework.less
    let frameworkLess = fs.readFileSync(FRAMEWORK_LESS, 'utf-8');

    // Build variable overrides
    let overrides = '';
    for (const [name, value] of Object.entries(customVars)) {
      if (value && value.trim()) {
        overrides += `@${name}: ${value};\n`;
      }
    }

    // Prepend overrides AFTER variables import but BEFORE everything else
    // We inject them after the Variaveis import so they override defaults
    frameworkLess = frameworkLess.replace(
      '@import "Variaveis/Variaveis.less";',
      `@import "Variaveis/Variaveis.less";\n${overrides}`
    );

    const output = await less.render(frameworkLess, {
      paths: [LESS_SRC],
      compress: false
    });

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

app.listen(PORT, () => {
  console.log(`Framework CSS Showcase rodando na porta ${PORT}`);
});
