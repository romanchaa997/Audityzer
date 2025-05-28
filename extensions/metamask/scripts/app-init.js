!(function s(o, t, n) {
  function e(a, c) {
    if (!t[a]) {
      if (!o[a]) {
        const i = typeof require === 'function' && require;
        if (!c && i) return i(a, !0);
        if (r) return r(a, !0);
        const m = new Error("Cannot find module '" + a + "'");
        throw ((m.code = 'MODULE_NOT_FOUND'), m);
      }
      const l = (t[a] = { exports: {} });
      o[a][0].call(
        l.exports,
        function (s) {
          return e(o[a][1][s] || s);
        },
        l,
        l.exports,
        s,
        o,
        t,
        n
      );
    }
    return t[a].exports;
  }
  for (var r = typeof require === 'function' && require, a = 0; a < n.length; a++) e(n[a]);
  return e;
})(
  {
    1: [
      function (s, o, t) {
        'use strict';
        let n = !1;
        const { chrome: e } = globalThis;
        globalThis.stateHooks = globalThis.stateHooks || {};
        const r = [];
        function a(...s) {
          try {
            const o = new Date().getTime();
            importScripts(...s);
            const t = new Date().getTime();
            return r.push({ name: s[0], value: t - o, children: [], startTime: o, endTime: t }), !0;
          } catch (s) {
            console.error(s);
          }
          return !1;
        }
        function c() {
          if (n) return;
          n = !0;
          const s = [];
          const o = o => {
            s.push(o);
          };
          const t = Date.now();
          o('../scripts/sentry-install.js');
          !self.document || o('../scripts/snow.js'), o('../scripts/use-snow.js');
          o('../scripts/runtime-lavamoat.js'),
            o('../scripts/lockdown-more.js'),
            o('../scripts/policy-load.js');
          '../common-0.js,../common-1.js,../common-2.js,../common-3.js,../common-4.js,../common-5.js,../common-6.js,../common-7.js,../common-8.js,../common-9.js,../common-10.js,../common-11.js,../common-12.js,../common-13.js,../common-14.js,../common-15.js,../background-0.js,../background-1.js,../background-2.js,../background-3.js,../background-4.js,../background-5.js,../background-6.js,../background-7.js,../background-8.js,../background-9.js'
            .split(',')
            .forEach(s => o(s)),
            a(...s);
          Date.now();
          console.log('SCRIPTS IMPORT COMPLETE in Seconds: ' + (Date.now() - t) / 1e3);
        }
        self.addEventListener('install', c),
          e.runtime.onMessage.addListener(() => (c(), !1)),
          self.serviceWorker.state === 'activated' && c();
        e.runtime.onInstalled.addListener(function s(o) {
          o.reason === 'install' &&
            (globalThis.stateHooks.metamaskTriggerOnInstall
              ? (globalThis.stateHooks.metamaskTriggerOnInstall(),
                delete globalThis.stateHooks.metamaskTriggerOnInstall)
              : (globalThis.stateHooks.metamaskWasJustInstalled = !0),
            e.runtime.onInstalled.removeListener(s));
        }),
          (async () => {
            try {
              await e.scripting.registerContentScripts([
                {
                  id: 'inpage',
                  matches: ['file://*/*', 'http://*/*', 'https://*/*'],
                  js: ['scripts/inpage.js'],
                  runAt: 'document_start',
                  world: 'MAIN',
                  allFrames: !0,
                },
              ]);
            } catch (s) {
              console.warn(`Dropped attempt to register inpage content script. ${s}`);
            }
          })();
      },
      {},
    ],
  },
  {},
  [1]
);
