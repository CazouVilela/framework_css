/**
 * messageBalloons.js
 * ----------------------------------------------------------------------------
 * Interacao touch/click para message balloons (.balloonType-*).
 *
 * Desktop:
 *   - Hover no .balloonTrigger mostra o balloon (via CSS, ja coberto).
 *
 * Touch/mobile/tablet (sem hover):
 *   - Click no .balloonTrigger alterna a classe .balloonStatus-Ativo nos
 *     balloons descendentes, exibindo/ocultando a mensagem.
 *   - Click em qualquer outro ponto da tela fecha todos os balloons abertos.
 *
 * Implementacao:
 *   - Event delegation a partir do document, funcionando tambem com DOM
 *     criado dinamicamente apos o load (React, Vue, jQuery, etc.) sem
 *     precisar reexecutar a funcao quando novos .balloonTrigger surgem.
 *   - Usa capture: false (bubbling) para que handlers do proprio balloon
 *     tenham chance de rodar primeiro.
 *
 * Publica uma API global `MessageBalloons` com metodos helper caso algum
 * consumidor queira controlar programaticamente.
 * ----------------------------------------------------------------------------
 */
(function (global, doc) {
    'use strict';

    var CLASS_TRIGGER      = 'balloonTrigger';
    var CLASS_ACTIVE       = 'balloonStatus-Ativo';
    var CLASS_TYPE_PREFIX  = 'balloonType';

    /**
     * Retorna o elemento .balloonTrigger ancestral (ou o proprio) do alvo
     * passado. Se nao existir na cadeia, retorna null.
     */
    function findTrigger(el) {
        while (el && el !== doc.body && el.nodeType === 1) {
            if (el.classList && el.classList.contains(CLASS_TRIGGER)) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    }

    /**
     * Retorna todos os balloons (.balloonType-*) diretamente relacionados
     * ao trigger: filhos diretos OU irmaos, seguindo a convencao dos
     * seletores CSS `.balloonTrigger:hover ~ .balloonType-*` e
     * `.balloonTrigger:hover > .balloonType-*`.
     */
    function getBalloonsOf(trigger) {
        var balloons = [];
        var i;
        // Filhos diretos
        var children = trigger.children;
        for (i = 0; i < children.length; i++) {
            if (hasBalloonType(children[i])) balloons.push(children[i]);
        }
        // Irmaos (caso o balloon nao esteja dentro do trigger)
        var parent = trigger.parentNode;
        if (parent) {
            var siblings = parent.children;
            for (i = 0; i < siblings.length; i++) {
                if (siblings[i] !== trigger && hasBalloonType(siblings[i])) {
                    balloons.push(siblings[i]);
                }
            }
        }
        return balloons;
    }

    function hasBalloonType(el) {
        if (!el || !el.className || typeof el.className !== 'string') return false;
        return el.className.indexOf(CLASS_TYPE_PREFIX) !== -1;
    }

    /**
     * Fecha todos os balloons abertos no documento, exceto os que forem
     * filhos/irmaos de `exceptTrigger` (opcional).
     */
    function closeAll(exceptTrigger) {
        var keep = exceptTrigger ? getBalloonsOf(exceptTrigger) : [];
        var open = doc.getElementsByClassName(CLASS_ACTIVE);
        // open e live HTMLCollection - iterar em snapshot pra evitar skip.
        var snapshot = [];
        for (var i = 0; i < open.length; i++) snapshot.push(open[i]);
        for (var j = 0; j < snapshot.length; j++) {
            var el = snapshot[j];
            if (keep.indexOf(el) === -1) {
                el.classList.remove(CLASS_ACTIVE);
            }
        }
    }

    /**
     * Alterna o estado ativo dos balloons associados ao trigger.
     * Retorna true se o balloon ficou aberto, false se fechou.
     */
    function toggle(trigger) {
        var balloons = getBalloonsOf(trigger);
        if (balloons.length === 0) return false;
        // Verifica estado atual pelo primeiro balloon.
        var willOpen = !balloons[0].classList.contains(CLASS_ACTIVE);
        // Antes de abrir, fecha qualquer outro aberto em outro trigger.
        if (willOpen) closeAll(trigger);
        for (var i = 0; i < balloons.length; i++) {
            balloons[i].classList.toggle(CLASS_ACTIVE, willOpen);
        }
        return willOpen;
    }

    // Guarda o ultimo handle (timestamp + alvo) processado, para deduplicar
    // eventos disparados em sequencia rapida (touch dispara pointerdown +
    // mousedown + click no mesmo tap em alguns browsers; sem dedup, abre +
    // fecha o balloon no mesmo gesto).
    var lastHandle = { t: 0, target: null };

    /**
     * Handler global do toque/click no documento.
     * - Se o alvo esta dentro de um .balloonTrigger, alterna aquele trigger.
     * - Caso contrario, fecha todos os balloons abertos.
     */
    function onPointerDown(ev) {
        // Dedup de eventos sinteticos: ignora eventos disparados <200ms apos
        // o ultimo no mesmo alvo (touch -> mouse -> click sequence).
        var now = (ev.timeStamp || Date.now());
        if (now - lastHandle.t < 250 && lastHandle.target === ev.target) {
            return;
        }
        lastHandle = { t: now, target: ev.target };

        var trigger = findTrigger(ev.target);
        if (trigger) {
            toggle(trigger);
            // Impede que o evento propague e dispare handlers adicionais
            // (ex: focus blur cascade no input contido no trigger).
            ev.stopPropagation();
        } else {
            closeAll();
        }
    }

    /**
     * Fecha balloons quando a tecla Escape for pressionada.
     */
    function onKeyDown(ev) {
        if (ev.key === 'Escape' || ev.keyCode === 27) {
            closeAll();
        }
    }

    // Instala os listeners uma unica vez. Se o script for carregado duas
    // vezes, o segundo load sera ignorado via flag global.
    //
    // Usamos `pointerdown` (Pointer Events API) em vez de `click` por dois
    // motivos:
    //   1) Funciona unificado para mouse, touch e pen, sem o atraso de 300ms
    //      do click sintetico de touch em alguns browsers/configuracoes.
    //   2) Dispara antes de qualquer transicao de focus, evitando race
    //      conditions com balloons que disparam via :focus.
    // Fallback: se PointerEvent nao existe (browsers muito antigos), usa
    // touchstart + mousedown.
    if (!global.__messageBalloonsInstalled) {
        global.__messageBalloonsInstalled = true;
        if (typeof global.PointerEvent === 'function') {
            doc.addEventListener('pointerdown', onPointerDown, false);
        } else {
            doc.addEventListener('touchstart', onPointerDown, { passive: true });
            doc.addEventListener('mousedown', onPointerDown, false);
        }
        doc.addEventListener('keydown', onKeyDown, false);
    }

    // Exposicao publica caso algum consumidor queira controlar manualmente.
    global.MessageBalloons = {
        toggle:   toggle,
        closeAll: closeAll,
    };

})(window, document);
