/**
 * frameworkOverrides.js
 * ----------------------------------------------------------------------------
 * Modulo compartilhado de aplicacao/propagacao de customizacoes de variaveis
 * do Framework CSS Padrao.
 *
 * Fluxo:
 *  - Editor chama FrameworkOverrides.apply(css, variables) apos compilar LESS.
 *  - O CSS e gravado em localStorage (persiste entre sessoes) e transmitido
 *    via BroadcastChannel para todas as abas/janelas do mesmo origem.
 *  - Cada pagina que queira receber overrides chama load() (uma vez, no boot)
 *    e listen(cb) para atualizar a tag <style> em tempo real.
 *
 * Tag de estilo injetada: <style id="custom-framework-css">
 *
 * Compatibilidade: quando BroadcastChannel nao esta disponivel no browser,
 * o fallback e o evento "storage" do localStorage, que tambem propaga entre
 * abas do mesmo origem.
 * ----------------------------------------------------------------------------
 */
(function (global) {
  'use strict';

  // Chave usada no localStorage para persistir o estado atual de overrides.
  var STORAGE_KEY = 'frameworkCssOverrides';

  // Nome do canal de broadcast. Nao conflitar com outros canais da aplicacao.
  var CHANNEL_NAME = 'framework-css-overrides';

  // ID da tag <style> injetada no documento (editor e showcase compartilham).
  var STYLE_TAG_ID = 'custom-framework-css';

  // Canal reutilizado durante todo o ciclo de vida da pagina.
  var channel = null;
  if (typeof global.BroadcastChannel === 'function') {
    try {
      channel = new global.BroadcastChannel(CHANNEL_NAME);
    } catch (e) {
      // Alguns contextos (iframe sandboxed) podem lancar; seguir com fallback.
      channel = null;
    }
  }

  /**
   * Le o estado atual persistido no localStorage.
   * Retorna null se nao houver override ou se o JSON estiver corrompido.
   */
  function readState() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed;
    } catch (e) {
      // JSON invalido: limpa para nao carregar estado quebrado nas proximas vezes.
      try { global.localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      return null;
    }
  }

  /**
   * Grava o estado no localStorage. Se ultrapassar a quota do browser,
   * loga no console e falha silenciosamente (o broadcast ainda pode funcionar).
   */
  function writeState(state) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      if (global.console && global.console.warn) {
        global.console.warn('[frameworkOverrides] Falha ao gravar no localStorage:', e);
      }
      return false;
    }
  }

  /**
   * Remove o estado do localStorage.
   */
  function clearState() {
    try { global.localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  /**
   * Injeta ou atualiza a tag <style id="custom-framework-css"> no documento
   * informado (permite injetar tanto em document quanto em contentDocument de iframe).
   */
  function injectStyle(doc, css) {
    if (!doc) return;
    var el = doc.getElementById(STYLE_TAG_ID);
    if (!el) {
      el = doc.createElement('style');
      el.id = STYLE_TAG_ID;
      // Append ao <head> quando existir; se nao, ao <html> como ultimo recurso.
      (doc.head || doc.documentElement).appendChild(el);
    }
    el.textContent = css || '';
  }

  /**
   * Remove a tag <style id="custom-framework-css"> do documento informado.
   */
  function removeStyle(doc) {
    if (!doc) return;
    var el = doc.getElementById(STYLE_TAG_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  /**
   * Aplica um conjunto de overrides: persiste, transmite e injeta no documento atual.
   *
   * @param {string} css        - CSS compilado retornado por /api/compile.
   * @param {object} variables  - Mapa nome->valor das variaveis alteradas (para persistencia/exportacao).
   * @param {Document} [targetDoc=document] - Documento onde injetar a tag <style>.
   *                              Permite injetar em iframe (editor) alem do documento atual.
   */
  function apply(css, variables, targetDoc) {
    var state = {
      css: css || '',
      variables: variables || {},
      timestamp: Date.now()
    };
    writeState(state);

    // Injeta no documento solicitado (padrao: documento atual).
    injectStyle(targetDoc || global.document, state.css);

    // Broadcast para outras abas/janelas.
    if (channel) {
      try {
        channel.postMessage({ type: 'update', state: state });
      } catch (e) {
        // postMessage pode falhar se o canal foi fechado; ignorar.
      }
    }
  }

  /**
   * Le o estado persistido e aplica ao documento informado.
   * Deve ser chamado uma vez no boot de cada pagina que consome overrides.
   *
   * @param {Document} [targetDoc=document]
   * @returns {object|null} - O estado carregado, ou null se nao havia overrides.
   */
  function load(targetDoc) {
    var state = readState();
    if (state && state.css) {
      injectStyle(targetDoc || global.document, state.css);
    }
    return state;
  }

  /**
   * Remove overrides: limpa storage, transmite sinal de clear e remove <style>.
   *
   * @param {Document} [targetDoc=document]
   */
  function clear(targetDoc) {
    clearState();
    removeStyle(targetDoc || global.document);

    if (channel) {
      try {
        channel.postMessage({ type: 'clear' });
      } catch (e) {}
    }
  }

  /**
   * Registra um callback que sera invocado quando overrides mudarem em
   * outra aba/janela (BroadcastChannel) ou quando o localStorage for alterado
   * externamente (evento storage — fallback).
   *
   * O callback recebe (state|null) — null indica "clear".
   * Retorna uma funcao para remover o listener.
   *
   * @param {(state: object|null) => void} callback
   * @param {Document} [targetDoc=document] - Documento onde injetar a tag <style> automaticamente.
   *                                          Passe null para nao injetar automaticamente.
   */
  function listen(callback, targetDoc) {
    var doc = (targetDoc === undefined) ? global.document : targetDoc;

    // Handler do BroadcastChannel.
    function channelHandler(ev) {
      var msg = ev && ev.data;
      if (!msg || typeof msg !== 'object') return;

      if (msg.type === 'update' && msg.state) {
        if (doc) injectStyle(doc, msg.state.css);
        if (typeof callback === 'function') callback(msg.state);
      } else if (msg.type === 'clear') {
        if (doc) removeStyle(doc);
        if (typeof callback === 'function') callback(null);
      }
    }

    // Handler do evento storage (fallback + complementar para cross-tab).
    // O evento storage NAO dispara na aba que fez o setItem, apenas nas outras.
    function storageHandler(ev) {
      if (ev.key !== STORAGE_KEY) return;
      if (ev.newValue == null) {
        if (doc) removeStyle(doc);
        if (typeof callback === 'function') callback(null);
        return;
      }
      try {
        var state = JSON.parse(ev.newValue);
        if (doc) injectStyle(doc, state.css);
        if (typeof callback === 'function') callback(state);
      } catch (e) {}
    }

    if (channel) channel.addEventListener('message', channelHandler);
    global.addEventListener('storage', storageHandler);

    // Funcao de unsubscribe.
    return function unlisten() {
      if (channel) channel.removeEventListener('message', channelHandler);
      global.removeEventListener('storage', storageHandler);
    };
  }

  /**
   * Retorna o estado atual sem alterar nada. Util para decidir se badges
   * de "customizado" devem aparecer e para pre-popular o editor.
   */
  function getState() {
    return readState();
  }

  // Expor API global (namespace unico para evitar colisoes).
  global.FrameworkOverrides = {
    apply: apply,
    load: load,
    clear: clear,
    listen: listen,
    getState: getState,
    // Constantes expostas para debug / testes.
    _STORAGE_KEY: STORAGE_KEY,
    _CHANNEL_NAME: CHANNEL_NAME,
    _STYLE_TAG_ID: STYLE_TAG_ID
  };
})(typeof window !== 'undefined' ? window : this);
