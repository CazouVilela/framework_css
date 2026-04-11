#!/usr/bin/env node
/**
 * Gera public/less-src/Variaveis/CustomProperties.less a partir de Variaveis.less.
 *
 * Para CADA variavel @Nome do framework:
 *   - Expoe --Nome: @Nome; no :root (valor canonico fixo)
 *
 * Para variaveis que tem sufixo _Desktop/_Tablet/_Mobile:
 *   - Expoe tambem --NomeBase (sem sufixo) responsivo via media query,
 *     que muda automaticamente no breakpoint ativo.
 *
 * Por que: projetos downstream que usam CSS puro (.css) nao conseguem ler
 * variaveis LESS. Expor tudo como CSS custom properties permite que esses
 * projetos usem var(--Nome) e calc() sem duplicar valores nem media queries.
 *
 * Este arquivo e gerado automaticamente. NAO editar a mao.
 * Para regenerar: node scripts/generate-custom-properties.js
 */

const fs = require('fs');
const path = require('path');

const VARS_FILE = path.join(__dirname, '..', 'public', 'less-src', 'Variaveis', 'Variaveis.less');
const OUT_FILE = path.join(__dirname, '..', 'public', 'less-src', 'Variaveis', 'CustomProperties.less');

const SUFFIXES = ['_Desktop', '_Tablet', '_Mobile'];

function parseVariables(content) {
  const vars = [];
  const seen = new Set();
  const lines = content.split('\n');
  for (const line of lines) {
    // Match @Name: value; (ignoring comments and empty lines)
    // Supports values with parens, strings, percentages, functions etc.
    const m = line.match(/^\s*@([A-Za-z_][\w]*)\s*:/);
    if (m) {
      const name = m[1];
      if (!seen.has(name)) {
        seen.add(name);
        vars.push(name);
      }
    }
  }
  return vars;
}

function groupResponsive(vars) {
  const responsive = new Map();
  const plain = [];
  for (const name of vars) {
    let matched = false;
    for (const suf of SUFFIXES) {
      if (name.endsWith(suf)) {
        const base = name.slice(0, -suf.length);
        if (!responsive.has(base)) responsive.set(base, {});
        responsive.get(base)[suf] = name;
        matched = true;
        break;
      }
    }
    if (!matched) plain.push(name);
  }
  // Apenas considera responsivo quando existem os 3 breakpoints
  const fullyResponsive = new Map();
  for (const [base, map] of responsive.entries()) {
    if (map._Desktop && map._Tablet && map._Mobile) {
      fullyResponsive.set(base, map);
    }
  }
  return { plain, responsive: fullyResponsive, rawResponsive: responsive };
}

function generate() {
  const content = fs.readFileSync(VARS_FILE, 'utf-8');
  const allVars = parseVariables(content);
  const { plain, responsive, rawResponsive } = groupResponsive(allVars);

  let out = '';
  out += '// ============================================\n';
  out += '// CSS Custom Properties - GERADO AUTOMATICAMENTE\n';
  out += '//\n';
  out += '// Exporta todas as variaveis @ do framework como CSS custom\n';
  out += '// properties para consumo por CSS puro de projetos downstream\n';
  out += '// via var() e calc().\n';
  out += '//\n';
  out += '// Padroes:\n';
  out += '//   --Nome                -> valor canonico fixo\n';
  out += '//   --NomeBase            -> valor "ativo" responsivo (quando ha trio\n';
  out += '//                            _Desktop/_Tablet/_Mobile), default = Desktop,\n';
  out += '//                            sobrescrito via media query em Tablet/Mobile\n';
  out += '//\n';
  out += '// NAO EDITAR A MAO. Regerar via:\n';
  out += '//   node scripts/generate-custom-properties.js\n';
  out += '// ============================================\n\n';

  // :root - valores fixos (todas as variaveis, incluindo sufixadas)
  out += ':root {\n';
  out += '    // Valores fixos (todas as variaveis do framework)\n';
  for (const name of [...plain]) {
    out += `    --${name}: @${name};\n`;
  }
  // Sufixadas
  for (const [base, map] of rawResponsive.entries()) {
    for (const suf of SUFFIXES) {
      if (map[suf]) {
        const full = map[suf];
        out += `    --${full}: @${full};\n`;
      }
    }
  }
  out += '\n';
  // Valor "ativo" responsivo - default Desktop
  out += '    // Valores "ativos" responsivos (default = Desktop)\n';
  for (const [base] of responsive.entries()) {
    out += `    --${base}: @${base}_Desktop;\n`;
  }
  out += '}\n\n';

  // Media query Tablet
  out += '// Tablet: min-width @Res_Tablet, max-width @Res_Desktop\n';
  out += '@media (min-width: @Res_Tablet) and (max-width: @Res_Desktop) {\n';
  out += '    :root {\n';
  for (const [base] of responsive.entries()) {
    out += `        --${base}: @${base}_Tablet;\n`;
  }
  out += '    }\n';
  out += '}\n\n';

  // Media query Mobile
  out += '// Mobile: max-width @Res_Tablet\n';
  out += '@media (max-width: @Res_Tablet) {\n';
  out += '    :root {\n';
  for (const [base] of responsive.entries()) {
    out += `        --${base}: @${base}_Mobile;\n`;
  }
  out += '    }\n';
  out += '}\n';

  fs.writeFileSync(OUT_FILE, out, 'utf-8');

  const total = allVars.length;
  const respCount = responsive.size;
  console.log(`Gerado: ${OUT_FILE}`);
  console.log(`  Variaveis totais: ${total}`);
  console.log(`  Variaveis com trio responsivo: ${respCount} (bases)`);
  console.log(`  Variaveis sem sufixo responsivo: ${plain.length}`);
}

generate();
