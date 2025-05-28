!(function e(t, r, n) {
  function i(s, a) {
    if (!r[s]) {
      if (!t[s]) {
        const c = typeof require === 'function' && require;
        if (!a && c) return c(s, !0);
        if (o) return o(s, !0);
        const u = new Error("Cannot find module '" + s + "'");
        throw ((u.code = 'MODULE_NOT_FOUND'), u);
      }
      const l = (r[s] = { exports: {} });
      t[s][0].call(
        l.exports,
        function (e) {
          return i(t[s][1][e] || e);
        },
        l,
        l.exports,
        e,
        t,
        r,
        n
      );
    }
    return r[s].exports;
  }
  for (var o = typeof require === 'function' && require, s = 0; s < n.length; s++) i(n[s]);
  return i;
})(
  {
    1: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.PHISHING_WARNING_PAGE =
            r.PHISHING_STREAM =
            r.PHISHING_SAFELIST =
            r.METAMASK_PROVIDER =
            r.METAMASK_INPAGE =
            r.METAMASK_COOKIE_HANDLER =
            r.LEGACY_PUBLIC_CONFIG =
            r.LEGACY_PROVIDER =
            r.LEGACY_INPAGE =
            r.LEGACY_CONTENT_SCRIPT =
            r.CONTENT_SCRIPT =
              void 0);
        (r.CONTENT_SCRIPT = 'metamask-contentscript'),
          (r.METAMASK_INPAGE = 'metamask-inpage'),
          (r.PHISHING_WARNING_PAGE = 'metamask-phishing-warning-page'),
          (r.METAMASK_COOKIE_HANDLER = 'metamask-cookie-handler'),
          (r.METAMASK_PROVIDER = 'metamask-provider'),
          (r.PHISHING_SAFELIST = 'metamask-phishing-safelist'),
          (r.PHISHING_STREAM = 'phishing'),
          (r.LEGACY_CONTENT_SCRIPT = 'contentscript'),
          (r.LEGACY_INPAGE = 'inpage'),
          (r.LEGACY_PROVIDER = 'provider'),
          (r.LEGACY_PUBLIC_CONFIG = 'publicConfig');
      },
      {},
    ],
    2: [
      function (e, t, r) {
        (function (t) {
          (function () {
            'use strict';
            const r = f(e('loglevel'));
            const n = e('uuid');
            const i = e('@metamask/post-message-stream');
            const o = e('@metamask/providers/initializeInpageProvider');
            const s = f(e('@metamask/object-multiplex'));
            const a = e('readable-stream');
            const c = e('@metamask/multichain-api-client');
            const u = e('@metamask/solana-wallet-standard');
            const l = f(e('../../shared/modules/provider-injection'));
            const d = e('./constants/stream');
            function f(e) {
              return e && e.__esModule ? e : { default: e };
            }
            let h;
            (() => {
              h = t.define;
              try {
                t.define = void 0;
              } catch (e) {
                console.warn('MetaMask - global.define could not be deleted.');
              }
            })();
            if (
              ((() => {
                try {
                  t.define = h;
                } catch (e) {
                  console.warn('MetaMask - global.define could not be overwritten.');
                }
              })(),
              r.default.setDefaultLevel('warn'),
              (0, l.default)())
            ) {
              const e = new i.WindowPostMessageStream({
                name: 'metamask-inpage',
                target: 'metamask-contentscript',
              });
              const t = new s.default();
              (0, a.pipeline)(e, t, e, e => {
                let t = `Lost connection to "${d.METAMASK_PROVIDER}".`;
                e != null && e.stack && (t += `\n${e.stack}`), console.warn(t);
              }),
                (0, o.initializeProvider)({
                  connectionStream: t.createStream(d.METAMASK_PROVIDER),
                  logger: r.default,
                  shouldShimWeb3: !0,
                  providerInfo: {
                    uuid: (0, n.v4)(),
                    name: 'MetaMask Flask',
                    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMwLjU5OTcgMzEuNjIyTDIzLjYwOTMgMjkuNDczMUwxOC4zMzggMzIuNzI2NUgxNC42NTk1TDkuMzg0NjMgMjkuNDczMUwyLjM5NzcyIDMxLjYyMkwwLjI3MzQwNyAyNC4yMTI3TDIuMzk5NDggMTUuOTkwMUwwLjI3MzQwNyA5LjAzNzU0TDIuMzk3NzIgMC40MjE4NzVMMTMuMzE1OCA3LjE1NzkySDE5LjY4MTdMMzAuNTk5NyAwLjQyMTg3NUwzMi43MjU4IDkuMDM3NTRMMzAuNTk5NyAxNS45OTAxTDMyLjcyNTggMjQuMjEyN0wzMC41OTk3IDMxLjYyMloiIGZpbGw9IiMwQTBBMEEiLz4KPHBhdGggZD0iTTMyLjM3NTIgMjQuNDg0NEwzMC40MjQ1IDMxLjI4MjNMMjMuODc0NCAyOS4yNjYyTDIzLjM0ODIgMjkuMTA0M0wyMi41OTc0IDI4Ljg3MzJMMTkuMzgzNyAyNy44ODM0TDE5LjEwMyAyNy45MjE2TDE4Ljk5NDMgMjguMzMyOEwyMi45NjIyIDI5LjU1MzdMMTguMjY0NSAzMi40NTQxSDE0LjczNjlMMTAuMDM5MiAyOS41NTM3TDE0LjAwNTQgMjguMzM0NkwxMy44OTY2IDI3LjkyMTZMMTMuNjE3NyAyNy44ODM0TDkuNjUxNTEgMjkuMTA0M0w5LjEyNTI1IDI5LjI2NjJMMi41NzY4OSAzMS4yODIzTDAuNjI2MjQzIDI0LjQ4NDRMMCAyNC4yMTg4TDIuMjIyNTUgMzEuOTYxTDkuMzUxNTQgMjkuNzY0OEwxNC41OTEzIDMzSDE4LjQxMDFMMjMuNjQ5OSAyOS43NjQ4TDMwLjc3ODkgMzEuOTYxTDMyLjk5OTcgMjQuMjE4OEwzMi4zNzUyIDI0LjQ4NDRaIiBmaWxsPSIjODlCMEZGIi8+CjxwYXRoIGQ9Ik05LjEyNTI1IDI0LjQ4MzlWMjkuMjY1N0w5LjY1MTUxIDI5LjEwMzhWMjQuNzYyM0wxMy42MTc3IDI3Ljg4MjlMMTMuODk2NiAyNy45MjExTDE0LjE1NjIgMjcuNjIwOEw5LjQ3NDM0IDIzLjkzOEgwLjYxNzQ3MkwyLjYwMTQ1IDE2LjI2MzFMMi4xMjYwNyAxNS45OTU2TDAgMjQuMjE4MkwwLjYyNjI0MyAyNC40ODM5SDkuMTI1MjVaIiBmaWxsPSIjRDA3NUZGIi8+CjxwYXRoIGQ9Ik0yNS40NzkzIDIwLjE3MTJMMjMuNzk1MyAyMC42MDI0VjIxLjE2NjVMMjYuMjc1NyAyMC41Mjk2TDI2LjI5MTUgMTYuMjYyOEgyNS45NDI0TDI1Ljc2NTIgMTYuMTM3MkwyNS43NTEyIDE5LjY4MzVMMjMuNzE4MSAxNy42OTI5SDE5LjUwMTFIMTkuNDk5M0wxOS40MTg2IDE4LjI0MDZIMjMuNTA5NEwyNS40NzkzIDIwLjE3MTJaIiBmaWxsPSIjRDA3NUZGIi8+CjxwYXRoIGQ9Ik05LjIwNTY2IDIxLjE2NjVWMjAuNjAyNEw3LjUyMTY0IDIwLjE3MTJMOS40OTE1OSAxOC4yNDA2SDEzLjU4MDZMMTMuNDk5OSAxNy42OTI5SDkuMzg0NThMOS4yMDM5IDE3Ljc2NzVMNy4yNDk3NCAxOS42ODM1TDcuMjM1NzEgMTYuMTM3Mkw3LjA1ODU0IDE2LjI2MjhINi43MDc3TDYuNzIzNDkgMjAuNTI5Nkw5LjIwNTY2IDIxLjE2NjVaIiBmaWxsPSIjRDA3NUZGIi8+CjxwYXRoIGQ9Ik0zMC4zOTg1IDE2LjI2MzFMMzIuMzgyNSAyMy45MzhIMjMuNTI1N0wxOC44NDM4IDI3LjYyMDhMMTkuMTAzNCAyNy45MjExTDE5LjM4NCAyNy44ODI5TDIzLjM0ODUgMjQuNzYyM1YyOS4xMDM4TDIzLjg3NDcgMjkuMjY1N1YyNC40ODM5SDMyLjM3NTVMMzMgMjQuMjE4MkwzMC44NzU3IDE1Ljk5NTZMMzAuMzk4NSAxNi4yNjMxWiIgZmlsbD0iI0QwNzVGRiIvPgo8cGF0aCBkPSJNNi43MDc5OSAxNi4yNjMzSDcuMDU4ODNMNy4yMzYgMTYuMTM3OEwxMi42ODk4IDEyLjI2MjFMMTMuNTAxOSAxNy42OTUzTDEzLjU4MjYgMTguMjQzTDE0Ljg2MzIgMjYuODExNEwxNS4zMTkzIDI2LjYyMDNIMTUuMzY2NkwxMy4xNDkzIDExLjc3OTlMMTMuNTU4MSA3LjQzMjk0SDE5LjQ0MzRMMTkuODUwMyAxMS43ODU0TDE3LjYzMyAyNi42MjAzSDE3LjY4MDRMMTguMTM2NSAyNi44MTE0TDE5LjQxNyAxOC4yNDNMMTkuNDk3NyAxNy42OTUzSDE5LjQ5OTVMMjAuMzExNyAxMi4yNjIxTDI1Ljc2MzcgMTYuMTM3OEwyNS45NDA4IDE2LjI2NTFIMzAuMzk4MkwzMC44NzM2IDE1Ljk5NzdMMzIuOTk3OSA5LjA0NjlMMzAuNzY4NCAwTDE5LjYxNyA2Ljg4NTI1SDEzLjM4NDRMMi4yMzEzMiAwTDAgOS4wNDY5TDIuMTI0MzEgMTUuOTk3N0wyLjU5OTcgMTYuMjY1MUg2LjcwNjI0TDYuNzA3OTkgMTYuMjYzM1pNMzIuNDUyNCA5LjAzMDUyTDMwLjQwNyAxNS43MTc0SDI2LjExMUwyMC41MjA0IDExLjc0NTNMMzAuNDYzMSAwLjk2NjE5MkwzMi40NTI0IDkuMDMwNTJaTTI5LjA3MzggMS42ODMxTDIwLjMyNCAxMS4xNjg1TDE5Ljk2MDggNy4zMDkyMUwyOS4wNzM4IDEuNjgzMVpNMTMuMDM4OCA3LjMwNzM5TDEyLjY3NzUgMTEuMTY4NUwzLjkyNzYxIDEuNjgxMjhMMTMuMDM4OCA3LjMwNTU3VjcuMzA3MzlaTTAuNTQ3MzA1IDkuMDMwNTJMMi41MzY1NSAwLjk2NjE5MkwxMi40NzkzIDExLjc0NTNMNi44ODg2NyAxNS43MTc0SDIuNTkyNjhMMC41NDczMDUgOS4wMzA1MloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTE3Ljk3MzIgMjYuNjIwMUgxNS4wMjc5TDEzLjg5NjUgMjcuOTIxMUwxNC40NTk1IDMwLjA1MThIMTguNTM4TDE5LjEwMTEgMjcuOTIxMUwxNy45Njk3IDI2LjYyMDFIMTcuOTczMlpNMTguMTM2MyAyOS41MDZIMTQuODY2NUwxNC40ODQxIDI4LjA2MTJMMTUuMjU3NyAyNy4xNzE0SDE3Ljc0NTFMMTguNTE4NyAyOC4wNjEyTDE4LjEzNjMgMjkuNTA2WiIgZmlsbD0iI0JBRjI0QSIvPgo8cGF0aCBkPSJNMTMuNTg2MiAyMS45NjU0TDEzLjUzNzEgMjEuODMyNlYyMS44MjlMMTIuNjY1MiAxOS40ODU0SDEwLjMwNzZMOS4yMDU5OSAyMC42MDI2VjIxLjE2NDhMMTMuMDk1IDIyLjE2MTlMMTMuNTg2MiAyMS45NjU0Wk0xMC41MjE2IDIwLjAzM0gxMi4zMDM5TDEyLjg2MzUgMjEuNTM2TDkuODA3NjggMjAuNzUzNkwxMC41MTk5IDIwLjAzM0gxMC41MjE2WiIgZmlsbD0iI0JBRjI0QSIvPgo8cGF0aCBkPSJNMTkuOTAzIDIyLjE2MjFMMjMuNzkyIDIxLjE2NDlWMjAuNjAyN0wyMi42OTA0IDE5LjQ4NzNIMjAuMzMyOEwxOS40NjEgMjEuODI5MVYyMS44MzI3TDE5LjQxMTggMjEuOTY1NkwxOS45MDMgMjIuMTYyMVpNMjMuMTg4NiAyMC43NTM3TDIwLjEzMjggMjEuNTM2MUwyMC42OTI0IDIwLjAzMTRIMjIuNDc0NkwyMy4xODY4IDIwLjc1MzdIMjMuMTg4NloiIGZpbGw9IiNCQUYyNEEiLz4KPC9zdmc+Cg==',
                    rdns: 'io.metamask.flask',
                  },
                }),
                (0, c.getMultichainClient)({ transport: (0, c.getDefaultTransport)() }).then(e => {
                  (0, u.registerSolanaWalletStandard)({ client: e });
                });
            }
          }).call(this);
        }).call(
          this,
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {}
        );
      },
      {
        '../../shared/modules/provider-injection': 230,
        './constants/stream': 1,
        '@metamask/multichain-api-client': 15,
        '@metamask/object-multiplex': 22,
        '@metamask/post-message-stream': 26,
        '@metamask/providers/initializeInpageProvider': 44,
        '@metamask/solana-wallet-standard': 78,
        loglevel: 144,
        'readable-stream': 165,
        uuid: 214,
      },
    ],
    3: [
      function (e, t, r) {
        'use strict';
        let n;
        let i;
        let o;
        let s;
        let a;
        let c;
        let u;
        let l;
        let d;
        let f;
        let h;
        let p;
        let g;
        const m =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        const y =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const b =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.JsonRpcEngine = void 0);
        const w = e('@metamask/rpc-errors');
        const v = b(e('@metamask/safe-event-emitter'));
        const E = e('@metamask/utils');
        class _ extends v.default {
          constructor({ notificationHandler: e } = {}) {
            super(),
              n.add(this),
              o.set(this, !1),
              s.set(this, void 0),
              a.set(this, void 0),
              m(this, s, [], 'f'),
              m(this, a, e, 'f');
          }
          destroy() {
            y(this, s, 'f').forEach(e => {
              'destroy' in e && typeof e.destroy === 'function' && e.destroy();
            }),
              m(this, s, [], 'f'),
              m(this, o, !0, 'f');
          }
          push(e) {
            y(this, n, 'm', c).call(this), y(this, s, 'f').push(e);
          }
          handle(e, t) {
            if ((y(this, n, 'm', c).call(this), t && typeof t !== 'function'))
              throw new Error('"callback" must be a function if provided.');
            return Array.isArray(e)
              ? t
                ? y(this, n, 'm', u).call(this, e, t)
                : y(this, n, 'm', u).call(this, e)
              : t
                ? y(this, n, 'm', l).call(this, e, t)
                : this._promiseHandle(e);
          }
          asMiddleware() {
            return (
              y(this, n, 'm', c).call(this),
              async (e, t, r, n) => {
                try {
                  const [o, a, c] = await y(i, i, 'm', f).call(i, e, t, y(this, s, 'f'));
                  return a
                    ? (await y(i, i, 'm', p).call(i, c), n(o))
                    : r(async e => {
                        try {
                          await y(i, i, 'm', p).call(i, c);
                        } catch (t) {
                          return e(t);
                        }
                        return e();
                      });
                } catch (e) {
                  return n(e);
                }
              }
            );
          }
          async _promiseHandle(e) {
            return new Promise((t, r) => {
              y(this, n, 'm', l)
                .call(this, e, (e, n) => {
                  e && void 0 === n ? r(e) : t(n);
                })
                .catch(r);
            });
          }
        }
        function M(e) {
          return JSON.stringify(e, null, 2);
        }
        (r.JsonRpcEngine = _),
          (i = _),
          (o = new WeakMap()),
          (s = new WeakMap()),
          (a = new WeakMap()),
          (n = new WeakSet()),
          (c = function () {
            if (y(this, o, 'f'))
              throw new Error('This engine is destroyed and can no longer be used.');
          }),
          (u = async function (e, t) {
            try {
              if (e.length === 0) {
                const e = [
                  {
                    id: null,
                    jsonrpc: '2.0',
                    error: new w.JsonRpcError(
                      w.errorCodes.rpc.invalidRequest,
                      'Request batch must contain plain objects. Received an empty array'
                    ),
                  },
                ];
                return t ? t(null, e) : e;
              }
              const r = (await Promise.all(e.map(this._promiseHandle.bind(this)))).filter(
                e => void 0 !== e
              );
              return t ? t(null, r) : r;
            } catch (e) {
              if (t) return t(e);
              throw e;
            }
          }),
          (l = async function (e, t) {
            if (!e || Array.isArray(e) || typeof e !== 'object') {
              const r = new w.JsonRpcError(
                w.errorCodes.rpc.invalidRequest,
                'Requests must be plain objects. Received: ' + typeof e,
                { request: e }
              );
              return t(r, { id: null, jsonrpc: '2.0', error: r });
            }
            if (typeof e.method !== 'string') {
              const r = new w.JsonRpcError(
                w.errorCodes.rpc.invalidRequest,
                'Must specify a string method. Received: ' + typeof e.method,
                { request: e }
              );
              return y(this, a, 'f') && !(0, E.isJsonRpcRequest)(e)
                ? t(null)
                : t(r, { id: e.id ?? null, jsonrpc: '2.0', error: r });
            }
            if (y(this, a, 'f') && (0, E.isJsonRpcNotification)(e) && !(0, E.isJsonRpcRequest)(e)) {
              try {
                await y(this, a, 'f').call(this, e);
              } catch (r) {
                return t(r);
              }
              return t(null);
            }
            let r = null;
            const n = { ...e };
            const o = { id: n.id, jsonrpc: n.jsonrpc };
            try {
              await y(i, i, 'm', d).call(i, n, o, y(this, s, 'f'));
            } catch (e) {
              r = e;
            }
            return r && (delete o.result, o.error || (o.error = (0, w.serializeError)(r))), t(r, o);
          }),
          (d = async function (e, t, r) {
            const [n, o, s] = await y(i, i, 'm', f).call(i, e, t, r);
            if ((y(i, i, 'm', g).call(i, e, t, o), await y(i, i, 'm', p).call(i, s), n)) throw n;
          }),
          (f = async function (e, t, r) {
            const n = [];
            let o = null;
            let s = !1;
            for (const a of r) if ((([o, s] = await y(i, i, 'm', h).call(i, e, t, a, n)), s)) break;
            return [o, s, n.reverse()];
          }),
          (h = async function (e, t, r, n) {
            return new Promise(i => {
              const o = e => {
                const r = e || t.error;
                r && (t.error = (0, w.serializeError)(r)), i([r, !0]);
              };
              const s = r => {
                t.error
                  ? o(t.error)
                  : (r &&
                      (typeof r !== 'function' &&
                        o(
                          new w.JsonRpcError(
                            w.errorCodes.rpc.internal,
                            `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof r}" for request:\n${M(e)}`,
                            { request: e }
                          )
                        ),
                      n.push(r)),
                    i([null, !1]));
              };
              try {
                r(e, t, s, o);
              } catch (e) {
                o(e);
              }
            });
          }),
          (p = async function (e) {
            for (const t of e)
              await new Promise((e, r) => {
                t(t => (t ? r(t) : e()));
              });
          }),
          (g = function (e, t, r) {
            if (!(0, E.hasProperty)(t, 'result') && !(0, E.hasProperty)(t, 'error'))
              throw new w.JsonRpcError(
                w.errorCodes.rpc.internal,
                `JsonRpcEngine: Response has no error or result for request:\n${M(e)}`,
                { request: e }
              );
            if (!r)
              throw new w.JsonRpcError(
                w.errorCodes.rpc.internal,
                `JsonRpcEngine: Nothing ended request:\n${M(e)}`,
                { request: e }
              );
          });
      },
      { '@metamask/rpc-errors': 74, '@metamask/safe-event-emitter': 76, '@metamask/utils': 98 },
    ],
    4: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createAsyncMiddleware = void 0),
          (r.createAsyncMiddleware = function (e) {
            return async (t, r, n, i) => {
              let o;
              const s = new Promise(e => {
                o = e;
              });
              let a = null;
              let c = !1;
              const u = async () => (
                (c = !0),
                n(e => {
                  (a = e), o();
                }),
                s
              );
              try {
                await e(t, r, u), c ? (await s, a(null)) : i(null);
              } catch (e) {
                a ? a(e) : i(e);
              }
            };
          });
      },
      {},
    ],
    5: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createScaffoldMiddleware = void 0),
          (r.createScaffoldMiddleware = function (e) {
            return (t, r, n, i) => {
              const o = e[t.method];
              return void 0 === o
                ? n()
                : typeof o === 'function'
                  ? o(t, r, n, i)
                  : ((r.result = o), i());
            };
          });
      },
      {},
    ],
    6: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.getUniqueId = void 0);
        const n = 4294967295;
        let i = Math.floor(Math.random() * n);
        r.getUniqueId = function () {
          return (i = (i + 1) % n), i;
        };
      },
      {},
    ],
    7: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.createIdRemapMiddleware = void 0);
        const n = e('./getUniqueId.cjs');
        r.createIdRemapMiddleware = function () {
          return (e, t, r, i) => {
            const o = e.id;
            const s = (0, n.getUniqueId)();
            (e.id = s),
              (t.id = s),
              r(r => {
                (e.id = o), (t.id = o), r();
              });
          };
        };
      },
      { './getUniqueId.cjs': 6 },
    ],
    8: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.mergeMiddleware =
            r.JsonRpcEngine =
            r.createIdRemapMiddleware =
            r.getUniqueId =
            r.createScaffoldMiddleware =
            r.createAsyncMiddleware =
              void 0);
        const n = e('./createAsyncMiddleware.cjs');
        Object.defineProperty(r, 'createAsyncMiddleware', {
          enumerable: !0,
          get: function () {
            return n.createAsyncMiddleware;
          },
        });
        const i = e('./createScaffoldMiddleware.cjs');
        Object.defineProperty(r, 'createScaffoldMiddleware', {
          enumerable: !0,
          get: function () {
            return i.createScaffoldMiddleware;
          },
        });
        const o = e('./getUniqueId.cjs');
        Object.defineProperty(r, 'getUniqueId', {
          enumerable: !0,
          get: function () {
            return o.getUniqueId;
          },
        });
        const s = e('./idRemapMiddleware.cjs');
        Object.defineProperty(r, 'createIdRemapMiddleware', {
          enumerable: !0,
          get: function () {
            return s.createIdRemapMiddleware;
          },
        });
        const a = e('./JsonRpcEngine.cjs');
        Object.defineProperty(r, 'JsonRpcEngine', {
          enumerable: !0,
          get: function () {
            return a.JsonRpcEngine;
          },
        });
        const c = e('./mergeMiddleware.cjs');
        Object.defineProperty(r, 'mergeMiddleware', {
          enumerable: !0,
          get: function () {
            return c.mergeMiddleware;
          },
        });
      },
      {
        './JsonRpcEngine.cjs': 3,
        './createAsyncMiddleware.cjs': 4,
        './createScaffoldMiddleware.cjs': 5,
        './getUniqueId.cjs': 6,
        './idRemapMiddleware.cjs': 7,
        './mergeMiddleware.cjs': 9,
      },
    ],
    9: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.mergeMiddleware = void 0);
        const n = e('./JsonRpcEngine.cjs');
        r.mergeMiddleware = function (e) {
          const t = new n.JsonRpcEngine();
          return e.forEach(e => t.push(e)), t.asMiddleware();
        };
      },
      { './JsonRpcEngine.cjs': 3 },
    ],
    10: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        const n = e('readable-stream');
        r.default = function (e) {
          if (!e?.engine) throw new Error('Missing engine parameter!');
          const { engine: t } = e;
          const r = new n.Duplex({
            objectMode: !0,
            read: () => {},
            write: function (e, n, i) {
              t.handle(e, (e, t) => {
                r.push(t);
              }),
                i();
            },
          });
          return (
            t.on &&
              t.on('notification', e => {
                r.push(e);
              }),
            r
          );
        };
      },
      { 'readable-stream': 165 },
    ],
    11: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 });
        const i = n(e('@metamask/safe-event-emitter'));
        const o = e('@metamask/utils');
        const s = e('readable-stream');
        r.default = function (e = {}) {
          const t = {};
          const r = new s.Duplex({
            objectMode: !0,
            read: () => {},
            write: function (r, i, s) {
              let c = null;
              try {
                !(0, o.hasProperty)(r, 'id')
                  ? (function (r) {
                      e?.retryOnMessage &&
                        r.method === e.retryOnMessage &&
                        Object.values(t).forEach(({ req: e, retryCount: r = 0 }) => {
                          if (!e.id) return;
                          if (r >= 3)
                            throw new Error(
                              `StreamMiddleware - Retry limit exceeded for request id "${e.id}"`
                            );
                          const n = t[e.id];
                          n && (n.retryCount = r + 1), a(e);
                        });
                      n.emit('notification', r);
                    })(r)
                  : (function (e) {
                      const { id: r } = e;
                      if (r === null) return;
                      const n = t[r];
                      if (!n)
                        return void console.warn(`StreamMiddleware - Unknown response id "${r}"`);
                      delete t[r], Object.assign(n.res, e), setTimeout(n.end);
                    })(r);
              } catch (e) {
                c = e;
              }
              s(c);
            },
          });
          const n = new i.default();
          return {
            events: n,
            middleware: (e, r, n, i) => {
              (t[e.id] = { req: e, res: r, next: n, end: i }), a(e);
            },
            stream: r,
          };
          function a(e) {
            r.push(e);
          }
        };
      },
      { '@metamask/safe-event-emitter': 76, '@metamask/utils': 98, 'readable-stream': 165 },
    ],
    12: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createStreamMiddleware = r.createEngineStream = void 0);
        const i = n(e('./createEngineStream.cjs'));
        r.createEngineStream = i.default;
        const o = n(e('./createStreamMiddleware.cjs'));
        r.createStreamMiddleware = o.default;
      },
      { './createEngineStream.cjs': 10, './createStreamMiddleware.cjs': 11 },
    ],
    13: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.detectMetamaskExtensionIdOnInit = async function () {
            return new Promise(e => {
              const t = ({ data: n }) => {
                const i = n?.data?.data?.result?.extensionId;
                n?.data?.name === 'metamask-provider' &&
                  i &&
                  (window.removeEventListener('message', t), clearTimeout(r), e(i));
              };
              window.addEventListener('message', t);
              const r = setTimeout(() => {
                window.removeEventListener('message', t), e(void 0);
              }, 3e3);
            });
          }),
          (r.detectMetamaskExtensionId = async function (e) {
            const t = await e.request({ method: 'metamask_getProviderState' });
            return t?.extensionId;
          });
      },
      {},
    ],
    14: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.isChromeRuntime = void 0);
        r.isChromeRuntime = () =>
          typeof chrome !== 'undefined' &&
          chrome.runtime &&
          typeof chrome.runtime.connect === 'function';
      },
      {},
    ],
    15: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getMultichainClient = void 0),
          (r.getDefaultTransport = function (e = {}) {
            return (0, n.isChromeRuntime)()
              ? (0, o.getExternallyConnectableTransport)(e)
              : (0, s.getWindowPostMessageTransport)();
          });
        const n = e('./helpers/utils.cjs');
        const i = e('./multichainClient.cjs');
        Object.defineProperty(r, 'getMultichainClient', {
          enumerable: !0,
          get: function () {
            return i.getMultichainClient;
          },
        });
        const o = e('./transports/externallyConnectableTransport.cjs');
        const s = e('./transports/windowPostMessageTransport.cjs');
      },
      {
        './helpers/utils.cjs': 14,
        './multichainClient.cjs': 16,
        './transports/externallyConnectableTransport.cjs': 18,
        './transports/windowPostMessageTransport.cjs': 19,
      },
    ],
    16: [
      function (e, t, r) {
        'use strict';
        function n(e) {
          async function t() {
            e.isConnected() || (await e.connect());
          }
          return (
            t(),
            {
              createSession: async r => (
                await t(), await e.request({ method: 'wallet_createSession', params: r })
              ),
              getSession: async () => (await t(), await e.request({ method: 'wallet_getSession' })),
              revokeSession: async () => {
                await e.request({ method: 'wallet_revokeSession' }), await e.disconnect();
              },
              invokeMethod: async r => (
                await t(), await e.request({ method: 'wallet_invokeMethod', params: r })
              ),
              extendsRpcApi: () => n(e),
              onNotification: t => e.onNotification(t),
            }
          );
        }
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getMultichainClient = async function ({ transport: e }) {
            return await e.connect(), n(e);
          });
      },
      {},
    ],
    17: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.REQUEST_CAIP = void 0),
          (r.REQUEST_CAIP = 'caip-x');
      },
      {},
    ],
    18: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getExternallyConnectableTransport = function (e = {}) {
            let t;
            let { extensionId: r } = e;
            let o = 1;
            const s = new Map();
            const a = new Set();
            function c(e) {
              if (e?.data?.id == null)
                !(function (e) {
                  for (const t of a)
                    try {
                      t(e);
                    } catch (e) {
                      console.error('[ExtensionProvider] Error in notification callback:', e);
                    }
                })(e.data);
              else if (s.has(e.data.id)) {
                const { resolve: t, reject: r } = s.get(e.data.id) ?? {};
                s.delete(e.data.id),
                  t && r && (e.data.error ? r(new Error(e.data.error.message)) : t(e.data.result));
              }
            }
            return {
              connect: async () => {
                try {
                  if ((r || (r = await (0, n.detectMetamaskExtensionIdOnInit)()), !r))
                    return console.error('[ChromeTransport] MetaMask extension not found'), !1;
                  t = chrome.runtime.connect(r);
                  let e = !0;
                  return (
                    t.onDisconnect.addListener(() => {
                      (e = !1),
                        console.warn('[ChromeTransport] chrome runtime disconnected'),
                        (t = void 0);
                    }),
                    await new Promise(e => setTimeout(e, 10)),
                    e ? (t.onMessage.addListener(c), !0) : !1
                  );
                } catch (e) {
                  return console.error('[ChromeTransport] connectChrome error:', e), !1;
                }
              },
              disconnect: async () => {
                if (t)
                  try {
                    t.disconnect(), (t = void 0), a.clear(), s.clear();
                  } catch (e) {
                    console.error('[ChromeTransport] Error disconnecting chrome port:', e);
                  }
              },
              isConnected: () => void 0 !== t,
              request: ({ method: e, params: r = {} }) => {
                const n = t;
                if (!n) throw new Error('Chrome port not connected');
                const a = o++;
                const c = { id: a, jsonrpc: '2.0', method: e, params: r };
                return new Promise((e, t) => {
                  s.set(a, { resolve: e, reject: t }),
                    n.postMessage({ type: i.REQUEST_CAIP, data: c });
                });
              },
              onNotification: e => {
                a.add(e);
              },
            };
          });
        const n = e('../helpers/metamaskExtensionId.cjs');
        const i = e('./constants.cjs');
      },
      { '../helpers/metamaskExtensionId.cjs': 13, './constants.cjs': 17 },
    ],
    19: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getWindowPostMessageTransport = function () {
            let e = null;
            const t = new Map();
            let r = 1;
            const s = new Set();
            function a(e) {
              if (e?.id == null)
                !(function (e) {
                  for (const t of s)
                    try {
                      t(e);
                    } catch (e) {
                      console.error(
                        '[WindowPostMessageTransport] Error in notification callback:',
                        e
                      );
                    }
                })(e);
              else if (t.has(e.id)) {
                const { resolve: r, reject: n } = t.get(e.id) ?? {};
                t.delete(e.id), r && n && (e.error ? n(new Error(e.error.message)) : r(e.result));
              }
            }
            async function c() {
              e && (window.removeEventListener('message', e), (e = null)), t.clear(), s.clear();
            }
            const u = () => Boolean(e);
            return {
              connect: async () => (
                u() && (await c()),
                (e = e => {
                  const { target: t, data: r } = e.data;
                  t === i && r?.name === o && a(r.data);
                }),
                window.addEventListener('message', e),
                !0
              ),
              disconnect: c,
              isConnected: u,
              request: ({ method: e, params: i = {} }) => {
                if (!u()) throw new Error('Not connected to any extension. Call connect() first.');
                const s = r++;
                const a = { jsonrpc: '2.0', id: s, method: e, params: i };
                return new Promise((e, r) => {
                  t.set(s, { resolve: e, reject: r }),
                    (function (e) {
                      window.postMessage(
                        { target: n, data: { name: o, data: e } },
                        location.origin
                      );
                    })(a);
                });
              },
              onNotification: e => {
                s.add(e);
              },
            };
          });
        const n = 'metamask-contentscript';
        const i = 'metamask-inpage';
        const o = 'metamask-multichain-provider';
      },
      {},
    ],
    20: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.ObjectMultiplex = void 0);
        const i = e('readable-stream');
        const o = n(e('once'));
        const s = e('./Substream');
        const a = Symbol('IGNORE_SUBSTREAM');
        class c extends i.Duplex {
          constructor(e = {}) {
            super(Object.assign({ objectMode: !0 }, e)), (this._substreams = {});
          }
          createStream(e, t = {}) {
            if (this.destroyed)
              throw new Error(`ObjectMultiplex - parent stream for name "${e}" already destroyed`);
            if (this._readableState.ended || this._writableState.ended)
              throw new Error(`ObjectMultiplex - parent stream for name "${e}" already ended`);
            if (!e) throw new Error('ObjectMultiplex - name must not be empty');
            if (this._substreams[e])
              throw new Error(`ObjectMultiplex - Substream for name "${e}" already exists`);
            const r = new s.Substream(Object.assign({ name: e, parent: this }, t));
            return (
              (this._substreams[e] = r),
              (function (e, t) {
                const r = (0, o.default)(t);
                (0, i.finished)(e, { readable: !1 }, r), (0, i.finished)(e, { writable: !1 }, r);
              })(this, e => r.destroy(e || void 0)),
              r
            );
          }
          ignoreStream(e) {
            if (!e) throw new Error('ObjectMultiplex - name must not be empty');
            if (this._substreams[e])
              throw new Error(`ObjectMultiplex - Substream for name "${e}" already exists`);
            this._substreams[e] = a;
          }
          _read() {}
          _write(e, t, r) {
            const { name: n, data: i } = e;
            if (!n)
              return console.warn(`ObjectMultiplex - malformed chunk without name "${e}"`), r();
            const o = this._substreams[n];
            return o
              ? (o !== a && o.push(i), r())
              : (console.warn(`ObjectMultiplex - orphaned data for stream "${n}"`), r());
          }
        }
        r.ObjectMultiplex = c;
      },
      { './Substream': 21, once: 146, 'readable-stream': 165 },
    ],
    21: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__rest) ||
          function (e, t) {
            const r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (e != null && typeof Object.getOwnPropertySymbols === 'function') {
              let i = 0;
              for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                t.indexOf(n[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                  (r[n[i]] = e[n[i]]);
            }
            return r;
          };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.Substream = void 0);
        const i = e('readable-stream');
        class o extends i.Duplex {
          constructor(e) {
            const { parent: t, name: r } = e;
            const i = n(e, ['parent', 'name']);
            super(Object.assign({ objectMode: !0 }, i)), (this._parent = t), (this._name = r);
          }
          _read() {}
          _write(e, t, r) {
            this._parent.push({ name: this._name, data: e }), r();
          }
        }
        r.Substream = o;
      },
      { 'readable-stream': 165 },
    ],
    22: [
      function (e, t, r) {
        'use strict';
        const n = e('./ObjectMultiplex');
        t.exports = n.ObjectMultiplex;
      },
      { './ObjectMultiplex': 20 },
    ],
    23: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.BasePostMessageStream = void 0);
        const n = e('readable-stream');
        const i = () => {};
        const o = 'SYN';
        const s = 'ACK';
        class a extends n.Duplex {
          constructor(e) {
            super(Object.assign({ objectMode: !0 }, e)),
              (this._init = !1),
              (this._haveSyn = !1),
              (this._log = () => null);
          }
          _handshake() {
            this._write(o, null, i), this.cork();
          }
          _onData(e) {
            if (this._init)
              try {
                this.push(e), this._log(e, !1);
              } catch (e) {
                this.emit('error', e);
              }
            else
              e === o
                ? ((this._haveSyn = !0), this._write(s, null, i))
                : e === s &&
                  ((this._init = !0), this._haveSyn || this._write(s, null, i), this.uncork());
          }
          _read() {}
          _write(e, t, r) {
            e !== s && e !== o && this._log(e, !0), this._postMessage(e), r();
          }
          _setLogger(e) {
            this._log = e;
          }
        }
        r.BasePostMessageStream = a;
      },
      { 'readable-stream': 165 },
    ],
    24: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__rest) ||
          function (e, t) {
            const r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (e != null && typeof Object.getOwnPropertySymbols === 'function') {
              let i = 0;
              for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                t.indexOf(n[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                  (r[n[i]] = e[n[i]]);
            }
            return r;
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.WebWorkerParentPostMessageStream = void 0);
        const i = e('../BasePostMessageStream');
        const o = e('../utils');
        class s extends i.BasePostMessageStream {
          constructor(e) {
            const { worker: t } = e;
            super(n(e, ['worker'])),
              (this._target = o.DEDICATED_WORKER_NAME),
              (this._worker = t),
              (this._worker.onmessage = this._onMessage.bind(this)),
              this._handshake();
          }
          _postMessage(e) {
            this._worker.postMessage({ target: this._target, data: e });
          }
          _onMessage(e) {
            const t = e.data;
            (0, o.isValidStreamMessage)(t) && this._onData(t.data);
          }
          _destroy() {
            (this._worker.onmessage = null), (this._worker = null);
          }
        }
        r.WebWorkerParentPostMessageStream = s;
      },
      { '../BasePostMessageStream': 23, '../utils': 28 },
    ],
    25: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.WebWorkerPostMessageStream = void 0);
        const n = e('../BasePostMessageStream');
        const i = e('../utils');
        class o extends n.BasePostMessageStream {
          constructor(e = {}) {
            if (typeof self === 'undefined' || typeof WorkerGlobalScope === 'undefined')
              throw new Error(
                'WorkerGlobalScope not found. This class should only be instantiated in a WebWorker.'
              );
            super(e),
              (this._name = i.DEDICATED_WORKER_NAME),
              self.addEventListener('message', this._onMessage.bind(this)),
              this._handshake();
          }
          _postMessage(e) {
            self.postMessage({ data: e });
          }
          _onMessage(e) {
            const t = e.data;
            (0, i.isValidStreamMessage)(t) && t.target === this._name && this._onData(t.data);
          }
          _destroy() {}
        }
        r.WebWorkerPostMessageStream = o;
      },
      { '../BasePostMessageStream': 23, '../utils': 28 },
    ],
    26: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                let i = Object.getOwnPropertyDescriptor(t, r);
                (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              });
        const i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (const r in e)
              r === 'default' || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(e('./window/WindowPostMessageStream'), r),
          i(e('./WebWorker/WebWorkerPostMessageStream'), r),
          i(e('./WebWorker/WebWorkerParentPostMessageStream'), r),
          i(e('./runtime/BrowserRuntimePostMessageStream'), r),
          i(e('./BasePostMessageStream'), r);
      },
      {
        './BasePostMessageStream': 23,
        './WebWorker/WebWorkerParentPostMessageStream': 24,
        './WebWorker/WebWorkerPostMessageStream': 25,
        './runtime/BrowserRuntimePostMessageStream': 27,
        './window/WindowPostMessageStream': 29,
      },
    ],
    27: [
      function (e, t, r) {
        'use strict';
        let n;
        let i;
        const o =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        const s =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const a =
          (this && this.__rest) ||
          function (e, t) {
            const r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (e != null && typeof Object.getOwnPropertySymbols === 'function') {
              let i = 0;
              for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                t.indexOf(n[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                  (r[n[i]] = e[n[i]]);
            }
            return r;
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.BrowserRuntimePostMessageStream = void 0);
        const c = e('../BasePostMessageStream');
        const u = e('../utils');
        class l extends c.BasePostMessageStream {
          constructor(e) {
            const { name: t, target: r } = e;
            super(a(e, ['name', 'target'])),
              n.set(this, void 0),
              i.set(this, void 0),
              o(this, n, t, 'f'),
              o(this, i, r, 'f'),
              (this._onMessage = this._onMessage.bind(this)),
              this._getRuntime().onMessage.addListener(this._onMessage),
              this._handshake();
          }
          _postMessage(e) {
            this._getRuntime().sendMessage({ target: s(this, i, 'f'), data: e });
          }
          _onMessage(e) {
            (0, u.isValidStreamMessage)(e) && e.target === s(this, n, 'f') && this._onData(e.data);
          }
          _getRuntime() {
            let e, t;
            if (
              'chrome' in globalThis &&
              typeof ((e = chrome === null || void 0 === chrome ? void 0 : chrome.runtime) ===
                null || void 0 === e
                ? void 0
                : e.sendMessage) === 'function'
            )
              return chrome.runtime;
            if (
              'browser' in globalThis &&
              typeof ((t = browser === null || void 0 === browser ? void 0 : browser.runtime) ===
                null || void 0 === t
                ? void 0
                : t.sendMessage) === 'function'
            )
              return browser.runtime;
            throw new Error(
              'browser.runtime.sendMessage is not a function. This class should only be instantiated in a web extension.'
            );
          }
          _destroy() {
            this._getRuntime().onMessage.removeListener(this._onMessage);
          }
        }
        (r.BrowserRuntimePostMessageStream = l), (n = new WeakMap()), (i = new WeakMap());
      },
      { '../BasePostMessageStream': 23, '../utils': 28 },
    ],
    28: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.isValidStreamMessage = r.DEDICATED_WORKER_NAME = void 0);
        const n = e('@metamask/utils');
        (r.DEDICATED_WORKER_NAME = 'dedicatedWorker'),
          (r.isValidStreamMessage = function (e) {
            return (
              (0, n.isObject)(e) &&
              Boolean(e.data) &&
              (typeof e.data === 'number' ||
                typeof e.data === 'object' ||
                typeof e.data === 'string')
            );
          });
      },
      { '@metamask/utils': 98 },
    ],
    29: [
      function (e, t, r) {
        'use strict';
        let n;
        let i;
        const o =
          (this && this.__rest) ||
          function (e, t) {
            const r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (e != null && typeof Object.getOwnPropertySymbols === 'function') {
              let i = 0;
              for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                t.indexOf(n[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                  (r[n[i]] = e[n[i]]);
            }
            return r;
          };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.WindowPostMessageStream = void 0);
        const s = e('@metamask/utils');
        const a = e('../BasePostMessageStream');
        const c = e('../utils');
        const u =
          (n = Object.getOwnPropertyDescriptor(MessageEvent.prototype, 'source')) === null ||
          void 0 === n
            ? void 0
            : n.get;
        (0, s.assert)(u, 'MessageEvent.prototype.source getter is not defined.');
        const l =
          (i = Object.getOwnPropertyDescriptor(MessageEvent.prototype, 'origin')) === null ||
          void 0 === i
            ? void 0
            : i.get;
        (0, s.assert)(l, 'MessageEvent.prototype.origin getter is not defined.');
        class d extends a.BasePostMessageStream {
          constructor(e) {
            const {
              name: t,
              target: r,
              targetOrigin: n = location.origin,
              targetWindow: i = window,
            } = e;
            if (
              (super(o(e, ['name', 'target', 'targetOrigin', 'targetWindow'])),
              typeof window === 'undefined' || typeof window.postMessage !== 'function')
            )
              throw new Error(
                'window.postMessage is not a function. This class should only be instantiated in a Window.'
              );
            (this._name = t),
              (this._target = r),
              (this._targetOrigin = n),
              (this._targetWindow = i),
              (this._onMessage = this._onMessage.bind(this)),
              window.addEventListener('message', this._onMessage, !1),
              this._handshake();
          }
          _postMessage(e) {
            this._targetWindow.postMessage({ target: this._target, data: e }, this._targetOrigin);
          }
          _onMessage(e) {
            const t = e.data;
            (this._targetOrigin !== '*' && l.call(e) !== this._targetOrigin) ||
              u.call(e) !== this._targetWindow ||
              !(0, c.isValidStreamMessage)(t) ||
              t.target !== this._name ||
              this._onData(t.data);
          }
          _destroy() {
            window.removeEventListener('message', this._onMessage, !1);
          }
        }
        r.WindowPostMessageStream = d;
      },
      { '../BasePostMessageStream': 23, '../utils': 28, '@metamask/utils': 98 },
    ],
    30: [
      function (e, t, r) {
        'use strict';
        let n;
        let i;
        const o =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        const s =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.BaseProvider = void 0);
        const c = e('@metamask/json-rpc-engine');
        const u = e('@metamask/rpc-errors');
        const l = a(e('@metamask/safe-event-emitter'));
        const d = a(e('fast-deep-equal'));
        const f = a(e('./messages.cjs'));
        const h = e('./utils.cjs');
        class p extends l.default {
          constructor({
            logger: e = console,
            maxEventListeners: t = 100,
            rpcMiddleware: r = [],
          } = {}) {
            super(),
              n.set(this, void 0),
              i.set(this, void 0),
              (this._log = e),
              this.setMaxListeners(t),
              (this._state = { ...p._defaultState }),
              o(this, i, null, 'f'),
              o(this, n, null, 'f'),
              (this._handleAccountsChanged = this._handleAccountsChanged.bind(this)),
              (this._handleConnect = this._handleConnect.bind(this)),
              (this._handleChainChanged = this._handleChainChanged.bind(this)),
              (this._handleDisconnect = this._handleDisconnect.bind(this)),
              (this._rpcRequest = this._rpcRequest.bind(this)),
              (this.request = this.request.bind(this));
            const s = new c.JsonRpcEngine();
            r.forEach(e => s.push(e)), (this._rpcEngine = s);
          }
          get chainId() {
            return s(this, n, 'f');
          }
          get selectedAddress() {
            return s(this, i, 'f');
          }
          isConnected() {
            return this._state.isConnected;
          }
          async request(e) {
            if (!e || typeof e !== 'object' || Array.isArray(e))
              throw u.rpcErrors.invalidRequest({
                message: f.default.errors.invalidRequestArgs(),
                data: e,
              });
            const { method: t, params: r } = e;
            if (typeof t !== 'string' || t.length === 0)
              throw u.rpcErrors.invalidRequest({
                message: f.default.errors.invalidRequestMethod(),
                data: e,
              });
            if (void 0 !== r && !Array.isArray(r) && (typeof r !== 'object' || r === null))
              throw u.rpcErrors.invalidRequest({
                message: f.default.errors.invalidRequestParams(),
                data: e,
              });
            const n = r == null ? { method: t } : { method: t, params: r };
            return new Promise((e, t) => {
              this._rpcRequest(n, (0, h.getRpcPromiseCallback)(e, t));
            });
          }
          _initializeState(e) {
            if (this._state.initialized) throw new Error('Provider already initialized.');
            if (e) {
              const { accounts: t, chainId: r, networkVersion: n, isConnected: i } = e;
              this._handleConnect({ chainId: r, isConnected: i }),
                this._handleChainChanged({ chainId: r, networkVersion: n, isConnected: i }),
                this._handleAccountsChanged(t);
            }
            (this._state.initialized = !0), this.emit('_initialized');
          }
          _rpcRequest(e, t) {
            let r = t;
            return (
              Array.isArray(e) ||
                (e.jsonrpc || (e.jsonrpc = '2.0'),
                (e.method !== 'eth_accounts' && e.method !== 'eth_requestAccounts') ||
                  (r = (r, n) => {
                    this._handleAccountsChanged(n.result ?? [], e.method === 'eth_accounts'),
                      t(r, n);
                  })),
              this._rpcEngine.handle(e, r)
            );
          }
          _handleConnect({ chainId: e, isConnected: t }) {
            !this._state.isConnected &&
              t &&
              ((this._state.isConnected = !0),
              this.emit('connect', { chainId: e }),
              this._log.debug(f.default.info.connected(e)));
          }
          _handleDisconnect(e, t) {
            if (this._state.isConnected || (!this._state.isPermanentlyDisconnected && !e)) {
              let r;
              (this._state.isConnected = !1),
                e
                  ? ((r = new u.JsonRpcError(1013, t ?? f.default.errors.disconnected())),
                    this._log.debug(r))
                  : ((r = new u.JsonRpcError(
                      1011,
                      t ?? f.default.errors.permanentlyDisconnected()
                    )),
                    this._log.error(r),
                    o(this, n, null, 'f'),
                    (this._state.accounts = null),
                    o(this, i, null, 'f'),
                    (this._state.isPermanentlyDisconnected = !0)),
                this.emit('disconnect', r);
            }
          }
          _handleChainChanged({ chainId: e, isConnected: t } = {}) {
            (0, h.isValidChainId)(e)
              ? (this._handleConnect({ chainId: e, isConnected: t }),
                e !== s(this, n, 'f') &&
                  (o(this, n, e, 'f'),
                  this._state.initialized && this.emit('chainChanged', s(this, n, 'f'))))
              : this._log.error(f.default.errors.invalidNetworkParams(), { chainId: e });
          }
          _handleAccountsChanged(e, t = !1) {
            let r = e;
            Array.isArray(e) ||
              (this._log.error(
                'MetaMask: Received invalid accounts parameter. Please report this bug.',
                e
              ),
              (r = []));
            for (const t of e)
              if (typeof t !== 'string') {
                this._log.error(
                  'MetaMask: Received non-string account. Please report this bug.',
                  e
                ),
                  (r = []);
                break;
              }
            if (
              !(0, d.default)(this._state.accounts, r) &&
              (t &&
                this._state.accounts !== null &&
                this._log.error(
                  "MetaMask: 'eth_accounts' unexpectedly updated accounts. Please report this bug.",
                  r
                ),
              (this._state.accounts = r),
              s(this, i, 'f') !== r[0] && o(this, i, r[0] || null, 'f'),
              this._state.initialized)
            ) {
              const e = [...r];
              this.emit('accountsChanged', e);
            }
          }
        }
        (r.BaseProvider = p),
          (n = new WeakMap()),
          (i = new WeakMap()),
          (p._defaultState = {
            accounts: null,
            isConnected: !1,
            initialized: !1,
            isPermanentlyDisconnected: !1,
          });
      },
      {
        './messages.cjs': 39,
        './utils.cjs': 43,
        '@metamask/json-rpc-engine': 8,
        '@metamask/rpc-errors': 74,
        '@metamask/safe-event-emitter': 76,
        'fast-deep-equal': 139,
      },
    ],
    31: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.CAIP294EventNames = void 0),
          (r.announceWallet = function (e) {
            s(e) || a(`Invalid CAIP-294 WalletData object received from ${o.Prompt}.`);
            const t = () =>
              window.dispatchEvent(
                new CustomEvent(o.Announce, {
                  detail: { id: 1, jsonrpc: '2.0', method: 'wallet_announce', params: e },
                })
              );
            t(),
              window.addEventListener(o.Prompt, e => {
                (function (e) {
                  return (
                    e instanceof CustomEvent &&
                    e.type === o.Prompt &&
                    (0, n.isObject)(e.detail) &&
                    e.detail.method === 'wallet_prompt' &&
                    (function (e) {
                      const t =
                        void 0 === e.chains ||
                        (Array.isArray(e.chains) && e.chains.every(e => typeof e === 'string'));
                      const r = void 0 === e.authName || typeof e.authName === 'string';
                      return t && r;
                    })(e.detail.params)
                  );
                })(e) || a(`Invalid CAIP-294 RequestWalletEvent object received from ${o.Prompt}.`),
                  t();
              });
          }),
          (r.requestWallet = function (e) {
            window.addEventListener(o.Announce, t => {
              (function (e) {
                return (
                  e instanceof CustomEvent &&
                  e.type === o.Announce &&
                  (0, n.isObject)(e.detail) &&
                  e.detail.method === 'wallet_announce' &&
                  s(e.detail.params)
                );
              })(t) || a(`Invalid CAIP-294 WalletData object received from ${o.Announce}.`),
                e(t.detail);
            }),
              window.dispatchEvent(
                new CustomEvent(o.Prompt, {
                  detail: { id: 1, jsonrpc: '2.0', method: 'wallet_prompt', params: {} },
                })
              );
          });
        const n = e('@metamask/utils');
        const i = e('./utils.cjs');
        let o;
        function s(e) {
          return (
            (0, n.isObject)(e) &&
            typeof e.uuid === 'string' &&
            i.UUID_V4_REGEX.test(e.uuid) &&
            typeof e.name === 'string' &&
            Boolean(e.name) &&
            typeof e.icon === 'string' &&
            e.icon.startsWith('data:image') &&
            typeof e.rdns === 'string' &&
            i.FQDN_REGEX.test(e.rdns) &&
            (void 0 === e.extensionId ||
              (typeof e.extensionId === 'string' && e.extensionId.length > 0))
          );
        }
        function a(e) {
          throw new Error(
            `${e} See https://github.com/ChainAgnostic/CAIPs/blob/bc4942857a8e04593ed92f7dc66653577a1c4435/CAIPs/caip-294.md for requirements.`
          );
        }
        !(function (e) {
          (e.Announce = 'caip294:wallet_announce'), (e.Prompt = 'caip294:wallet_prompt');
        })(o || (r.CAIP294EventNames = o = {}));
      },
      { './utils.cjs': 43, '@metamask/utils': 98 },
    ],
    32: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.requestProvider = function (e) {
            window.addEventListener(o.Announce, t => {
              (function (e) {
                return (
                  e instanceof CustomEvent &&
                  e.type === o.Announce &&
                  Object.isFrozen(e.detail) &&
                  s(e.detail)
                );
              })(t) ||
                a(
                  `Invalid EIP-6963 AnnounceProviderEvent object received from ${o.Announce} event.`
                ),
                e(t.detail);
            }),
              window.dispatchEvent(new Event(o.Request));
          }),
          (r.announceProvider = function (e) {
            s(e) || a('Invalid EIP-6963 ProviderDetail object.');
            const { info: t, provider: r } = e;
            const n = () =>
              window.dispatchEvent(
                new CustomEvent(o.Announce, {
                  detail: Object.freeze({ info: { ...t }, provider: r }),
                })
              );
            n(),
              window.addEventListener(o.Request, e => {
                (function (e) {
                  return e instanceof Event && e.type === o.Request;
                })(e) ||
                  a(
                    `Invalid EIP-6963 RequestProviderEvent object received from ${o.Request} event.`
                  ),
                  n();
              });
          });
        const n = e('@metamask/utils');
        const i = e('./utils.cjs');
        let o;
        function s(e) {
          if (!(0, n.isObject)(e) || !(0, n.isObject)(e.info) || !(0, n.isObject)(e.provider))
            return !1;
          const { info: t } = e;
          return (
            typeof t.uuid === 'string' &&
            i.UUID_V4_REGEX.test(t.uuid) &&
            typeof t.name === 'string' &&
            Boolean(t.name) &&
            typeof t.icon === 'string' &&
            t.icon.startsWith('data:image') &&
            typeof t.rdns === 'string' &&
            i.FQDN_REGEX.test(t.rdns)
          );
        }
        function a(e) {
          throw new Error(`${e} See https://eips.ethereum.org/EIPS/eip-6963 for requirements.`);
        }
        !(function (e) {
          (e.Announce = 'eip6963:announceProvider'), (e.Request = 'eip6963:requestProvider');
        })(o || (o = {}));
      },
      { './utils.cjs': 43, '@metamask/utils': 98 },
    ],
    33: [
      function (e, t, r) {
        'use strict';
        let n;
        const i =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        const o =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.MetaMaskInpageProvider = r.MetaMaskInpageProviderStreamName = void 0);
        const a = e('@metamask/rpc-errors');
        const c = s(e('./messages.cjs'));
        const u = e('./siteMetadata.cjs');
        const l = e('./StreamProvider.cjs');
        const d = e('./utils.cjs');
        r.MetaMaskInpageProviderStreamName = 'metamask-provider';
        class f extends l.AbstractStreamProvider {
          constructor(
            e,
            { logger: t = console, maxEventListeners: r = 100, shouldSendMetadata: o } = {}
          ) {
            if (
              (super(e, {
                logger: t,
                maxEventListeners: r,
                rpcMiddleware: (0, d.getDefaultExternalMiddleware)(t),
              }),
              (this._sentWarnings = {
                enable: !1,
                experimentalMethods: !1,
                send: !1,
                events: { close: !1, data: !1, networkChanged: !1, notification: !1 },
              }),
              n.set(this, void 0),
              this._initializeStateAsync(),
              i(this, n, null, 'f'),
              (this.isMetaMask = !0),
              (this._sendSync = this._sendSync.bind(this)),
              (this.enable = this.enable.bind(this)),
              (this.send = this.send.bind(this)),
              (this.sendAsync = this.sendAsync.bind(this)),
              (this._warnOfDeprecation = this._warnOfDeprecation.bind(this)),
              (this._metamask = this._getExperimentalApi()),
              this._jsonRpcConnection.events.on('notification', e => {
                const { method: t } = e;
                d.EMITTED_NOTIFICATIONS.includes(t) &&
                  (this.emit('data', e), this.emit('notification', e.params.result));
              }),
              o)
            )
              if (document.readyState === 'complete')
                (0, u.sendSiteMetadata)(this._rpcEngine, this._log);
              else {
                const e = () => {
                  (0, u.sendSiteMetadata)(this._rpcEngine, this._log),
                    window.removeEventListener('DOMContentLoaded', e);
                };
                window.addEventListener('DOMContentLoaded', e);
              }
          }
          get chainId() {
            return super.chainId;
          }
          get networkVersion() {
            return o(this, n, 'f');
          }
          get selectedAddress() {
            return super.selectedAddress;
          }
          sendAsync(e, t) {
            this._rpcRequest(e, t);
          }
          addListener(e, t) {
            return this._warnOfDeprecation(e), super.addListener(e, t);
          }
          on(e, t) {
            return this._warnOfDeprecation(e), super.on(e, t);
          }
          once(e, t) {
            return this._warnOfDeprecation(e), super.once(e, t);
          }
          prependListener(e, t) {
            return this._warnOfDeprecation(e), super.prependListener(e, t);
          }
          prependOnceListener(e, t) {
            return this._warnOfDeprecation(e), super.prependOnceListener(e, t);
          }
          _handleDisconnect(e, t) {
            super._handleDisconnect(e, t), o(this, n, 'f') && !e && i(this, n, null, 'f');
          }
          _warnOfDeprecation(e) {
            !1 === this._sentWarnings?.events[e] &&
              (this._log.warn(c.default.warnings.events[e]), (this._sentWarnings.events[e] = !0));
          }
          async enable() {
            return (
              this._sentWarnings.enable ||
                (this._log.warn(c.default.warnings.enableDeprecation),
                (this._sentWarnings.enable = !0)),
              new Promise((e, t) => {
                try {
                  this._rpcRequest(
                    { method: 'eth_requestAccounts', params: [] },
                    (0, d.getRpcPromiseCallback)(e, t)
                  );
                } catch (e) {
                  t(e);
                }
              })
            );
          }
          send(e, t) {
            return (
              this._sentWarnings.send ||
                (this._log.warn(c.default.warnings.sendDeprecation),
                (this._sentWarnings.send = !0)),
              typeof e !== 'string' || (t && !Array.isArray(t))
                ? e && typeof e === 'object' && typeof t === 'function'
                  ? this._rpcRequest(e, t)
                  : this._sendSync(e)
                : new Promise((r, n) => {
                    try {
                      this._rpcRequest(
                        { method: e, params: t },
                        (0, d.getRpcPromiseCallback)(r, n, !1)
                      );
                    } catch (e) {
                      n(e);
                    }
                  })
            );
          }
          _sendSync(e) {
            let t;
            switch (e.method) {
              case 'eth_accounts':
                t = this.selectedAddress ? [this.selectedAddress] : [];
                break;
              case 'eth_coinbase':
                t = this.selectedAddress ?? null;
                break;
              case 'eth_uninstallFilter':
                this._rpcRequest(e, d.NOOP), (t = !0);
                break;
              case 'net_version':
                t = o(this, n, 'f') ?? null;
                break;
              default:
                throw new Error(c.default.errors.unsupportedSync(e.method));
            }
            return { id: e.id, jsonrpc: e.jsonrpc, result: t };
          }
          _getExperimentalApi() {
            return new Proxy(
              {
                isUnlocked: async () => !this._state.isPermanentlyDisconnected,
                requestBatch: async e => {
                  if (!Array.isArray(e))
                    throw a.rpcErrors.invalidRequest({
                      message: 'Batch requests must be made with an array of request objects.',
                      data: e,
                    });
                  return new Promise((t, r) => {
                    this._rpcRequest(e, (0, d.getRpcPromiseCallback)(t, r));
                  });
                },
              },
              {
                get: (e, t, ...r) => (
                  this._sentWarnings.experimentalMethods ||
                    (this._log.warn(c.default.warnings.experimentalMethods),
                    (this._sentWarnings.experimentalMethods = !0)),
                  Reflect.get(e, t, ...r)
                ),
              }
            );
          }
          _handleChainChanged({ chainId: e, networkVersion: t, isConnected: r } = {}) {
            super._handleChainChanged({ chainId: e, networkVersion: t, isConnected: r });
            const s = t === 'loading' ? null : t;
            s !== o(this, n, 'f') &&
              (i(this, n, s, 'f'),
              this._state.initialized && this.emit('networkChanged', o(this, n, 'f')));
          }
        }
        (r.MetaMaskInpageProvider = f), (n = new WeakMap());
      },
      {
        './StreamProvider.cjs': 34,
        './messages.cjs': 39,
        './siteMetadata.cjs': 42,
        './utils.cjs': 43,
        '@metamask/rpc-errors': 74,
      },
    ],
    34: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.StreamProvider = r.AbstractStreamProvider = void 0);
        const i = e('@metamask/json-rpc-middleware-stream');
        const o = e('is-stream/index.js');
        const s = e('readable-stream');
        const a = e('./BaseProvider.cjs');
        const c = n(e('./messages.cjs'));
        const u = e('./utils.cjs');
        class l extends a.BaseProvider {
          constructor(
            e,
            { logger: t = console, maxEventListeners: r = 100, rpcMiddleware: n = [] } = {}
          ) {
            if ((super({ logger: t, maxEventListeners: r, rpcMiddleware: n }), !(0, o.duplex)(e)))
              throw new Error(c.default.errors.invalidDuplexStream());
            (this._handleStreamDisconnect = this._handleStreamDisconnect.bind(this)),
              (this._jsonRpcConnection = (0, i.createStreamMiddleware)({
                retryOnMessage: 'METAMASK_EXTENSION_CONNECT_CAN_RETRY',
              })),
              (0, s.pipeline)(
                e,
                this._jsonRpcConnection.stream,
                e,
                this._handleStreamDisconnect.bind(this, 'MetaMask RpcProvider')
              ),
              this._rpcEngine.push(this._jsonRpcConnection.middleware),
              this._jsonRpcConnection.events.on('notification', t => {
                const { method: r, params: n } = t;
                r === 'metamask_accountsChanged'
                  ? this._handleAccountsChanged(n)
                  : r === 'metamask_chainChanged'
                    ? this._handleChainChanged(n)
                    : u.EMITTED_NOTIFICATIONS.includes(r)
                      ? this.emit('message', { type: r, data: n })
                      : r === 'METAMASK_STREAM_FAILURE' &&
                        e.destroy(new Error(c.default.errors.permanentlyDisconnected()));
              });
          }
          async _initializeStateAsync() {
            let e;
            try {
              e = await this.request({ method: 'metamask_getProviderState' });
            } catch (e) {
              this._log.error('MetaMask: Failed to get initial state. Please report this bug.', e);
            }
            this._initializeState(e);
          }
          _handleStreamDisconnect(e, t) {
            let r = `MetaMask: Lost connection to "${e}".`;
            t?.stack && (r += `\n${t.stack}`),
              this._log.warn(r),
              this.listenerCount('error') > 0 && this.emit('error', r),
              this._handleDisconnect(!1, t ? t.message : void 0);
          }
          _handleChainChanged({ chainId: e, networkVersion: t, isConnected: r } = {}) {
            (0, u.isValidChainId)(e) && (0, u.isValidNetworkVersion)(t)
              ? (super._handleChainChanged({ chainId: e, isConnected: r }),
                r || this._handleDisconnect(!0))
              : this._log.error(c.default.errors.invalidNetworkParams(), {
                  chainId: e,
                  networkVersion: t,
                });
          }
        }
        r.AbstractStreamProvider = l;
        r.StreamProvider = class extends l {
          async initialize() {
            return this._initializeStateAsync();
          }
        };
      },
      {
        './BaseProvider.cjs': 30,
        './messages.cjs': 39,
        './utils.cjs': 43,
        '@metamask/json-rpc-middleware-stream': 12,
        'is-stream/index.js': 143,
        'readable-stream': 165,
      },
    ],
    35: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.ERC20 = r.ERC1155 = r.ERC721 = void 0),
          (r.ERC721 = 'ERC721'),
          (r.ERC1155 = 'ERC1155'),
          (r.ERC20 = 'ERC20');
      },
      {},
    ],
    36: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createExternalExtensionProvider = function (e = 'stable') {
            let t;
            try {
              const r = (function (e) {
                let t;
                switch (f?.name) {
                  case 'edge-chromium':
                    t = c.default.edgeChromiumIds;
                    break;
                  case 'firefox':
                    t = c.default.firefoxIds;
                    break;
                  default:
                    t = c.default.chromeIds;
                }
                return t[e] ?? e;
              })(e);
              const n = chrome.runtime.connect(r);
              const o = new s.PortDuplexStream(n);
              const h = u.MetaMaskInpageProviderStreamName;
              const p = new i.default();
              (0, a.pipeline)(o, p, o, e => {
                let t = `Lost connection to "${h}".`;
                e?.stack && (t += `\n${e.stack}`), console.warn(t);
              }),
                (t = new l.StreamProvider(p.createStream(h), {
                  logger: console,
                  rpcMiddleware: (0, d.getDefaultExternalMiddleware)(console),
                })),
                t.initialize();
            } catch (e) {
              throw (console.dir('MetaMask connect error.', e), e);
            }
            return t;
          }),
          (r.getBuildType = function (e) {
            return {
              'io.metamask': 'stable',
              'io.metamask.beta': 'beta',
              'io.metamask.flask': 'flask',
            }[e];
          });
        const i = n(e('@metamask/object-multiplex'));
        const o = e('detect-browser');
        const s = e('extension-port-stream');
        const a = e('readable-stream');
        const c = n(e('./external-extension-config.json'));
        const u = e('../MetaMaskInpageProvider.cjs');
        const l = e('../StreamProvider.cjs');
        const d = e('../utils.cjs');
        const f = (0, o.detect)();
      },
      {
        '../MetaMaskInpageProvider.cjs': 33,
        '../StreamProvider.cjs': 34,
        '../utils.cjs': 43,
        './external-extension-config.json': 37,
        '@metamask/object-multiplex': 22,
        'detect-browser': 137,
        'extension-port-stream': 45,
        'readable-stream': 165,
      },
    ],
    37: [
      function (e, t, r) {
        t.exports = {
          chromeIds: {
            stable: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
            beta: 'pbbkamfgmaedccnfkmjcofcecjhfgldn',
            flask: 'ljfoeinjpaedjfecbmggjgodbgkmjkjk',
          },
          edgeChromiumIds: { stable: 'ejbalbakoplchlghecdalmeeeajnimhm' },
          firefoxIds: {
            stable: 'webextension@metamask.io',
            beta: 'webextension-beta@metamask.io',
            flask: 'webextension-flask@metamask.io',
          },
        };
      },
      {},
    ],
    38: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.initializeProvider = function ({
            connectionStream: e,
            logger: t = console,
            maxEventListeners: r = 100,
            providerInfo: n,
            shouldSendMetadata: o = !0,
            shouldSetOnWindow: l = !0,
            shouldShimWeb3: d = !1,
          }) {
            const f = new s.MetaMaskInpageProvider(e, {
              logger: t,
              maxEventListeners: r,
              shouldSendMetadata: o,
            });
            const h = new Proxy(f, { deleteProperty: () => !0, get: (e, t) => e[t] });
            n && ((0, i.announceProvider)({ info: n, provider: h }), u(f, n));
            l && c(h);
            d && (0, a.shimWeb3)(h, t);
            return h;
          }),
          (r.setGlobalProvider = c),
          (r.announceCaip294WalletData = u);
        const n = e('./CAIP294.cjs');
        const i = e('./EIP6963.cjs');
        const o = e('./extension-provider/createExternalExtensionProvider.cjs');
        const s = e('./MetaMaskInpageProvider.cjs');
        const a = e('./shimWeb3.cjs');
        function c(e) {
          (window.ethereum = e), window.dispatchEvent(new Event('ethereum#initialized'));
        }
        async function u(e, t) {
          if ((0, o.getBuildType)(t.rdns) !== 'flask') return;
          const r = await e.request({ method: 'metamask_getProviderState' });
          const i = r?.extensionId;
          const s = { ...t, extensionId: i };
          (0, n.announceWallet)(s);
        }
      },
      {
        './CAIP294.cjs': 31,
        './EIP6963.cjs': 32,
        './MetaMaskInpageProvider.cjs': 33,
        './extension-provider/createExternalExtensionProvider.cjs': 36,
        './shimWeb3.cjs': 41,
      },
    ],
    39: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        const n = {
          errors: {
            disconnected: () => 'MetaMask: Disconnected from chain. Attempting to connect.',
            permanentlyDisconnected: () =>
              'MetaMask: Disconnected from MetaMask background. Page reload required.',
            sendSiteMetadata: () =>
              'MetaMask: Failed to send site metadata. This is an internal error, please report this bug.',
            unsupportedSync: e =>
              `MetaMask: The MetaMask Ethereum provider does not support synchronous methods like ${e} without a callback parameter.`,
            invalidDuplexStream: () => 'Must provide a Node.js-style duplex stream.',
            invalidNetworkParams: () =>
              'MetaMask: Received invalid network parameters. Please report this bug.',
            invalidRequestArgs: () => 'Expected a single, non-array, object argument.',
            invalidRequestMethod: () => "'args.method' must be a non-empty string.",
            invalidRequestParams: () => "'args.params' must be an object or array if provided.",
            invalidLoggerObject: () => "'args.logger' must be an object if provided.",
            invalidLoggerMethod: e => `'args.logger' must include required method '${e}'.`,
          },
          info: { connected: e => `MetaMask: Connected to chain with ID "${e}".` },
          warnings: {
            enableDeprecation:
              "MetaMask: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1102",
            sendDeprecation:
              "MetaMask: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193",
            events: {
              close:
                "MetaMask: The event 'close' is deprecated and may be removed in the future. Please use 'disconnect' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#disconnect",
              data: "MetaMask: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message",
              networkChanged:
                "MetaMask: The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#chainchanged",
              notification:
                "MetaMask: The event 'notification' is deprecated and may be removed in the future. Use 'message' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message",
            },
            rpc: {
              ethDecryptDeprecation:
                "MetaMask: The RPC method 'eth_decrypt' is deprecated and may be removed in the future.\nFor more information, see: https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686",
              ethGetEncryptionPublicKeyDeprecation:
                "MetaMask: The RPC method 'eth_getEncryptionPublicKey' is deprecated and may be removed in the future.\nFor more information, see: https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686",
              walletWatchAssetNFTExperimental:
                "MetaMask: The RPC method 'wallet_watchAsset' is experimental for ERC721/ERC1155 assets and may change in the future.\nFor more information, see: https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-1.md and https://github.com/MetaMask/metamask-improvement-proposals/blob/main/PROCESS-GUIDE.md#proposal-lifecycle",
            },
            experimentalMethods:
              "MetaMask: 'ethereum._metamask' exposes non-standard, experimental methods. They may be removed or changed without warning.",
          },
        };
        r.default = n;
      },
      {},
    ],
    40: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createRpcWarningMiddleware = function (e) {
            const t = {
              ethDecryptDeprecation: !1,
              ethGetEncryptionPublicKeyDeprecation: !1,
              walletWatchAssetNFTExperimental: !1,
            };
            return (r, n, s) => {
              t.ethDecryptDeprecation || r.method !== 'eth_decrypt'
                ? t.ethGetEncryptionPublicKeyDeprecation ||
                  r.method !== 'eth_getEncryptionPublicKey'
                  ? !t.walletWatchAssetNFTExperimental &&
                    r.method === 'wallet_watchAsset' &&
                    [i.ERC721, i.ERC1155].includes(r.params?.type || '') &&
                    (e.warn(o.default.warnings.rpc.walletWatchAssetNFTExperimental),
                    (t.walletWatchAssetNFTExperimental = !0))
                  : (e.warn(o.default.warnings.rpc.ethGetEncryptionPublicKeyDeprecation),
                    (t.ethGetEncryptionPublicKeyDeprecation = !0))
                : (e.warn(o.default.warnings.rpc.ethDecryptDeprecation),
                  (t.ethDecryptDeprecation = !0)),
                s();
            };
          });
        const i = e('../constants.cjs');
        const o = n(e('../messages.cjs'));
      },
      { '../constants.cjs': 35, '../messages.cjs': 39 },
    ],
    41: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.shimWeb3 = function (e, t = console) {
            let r = !1;
            let n = !1;
            if (!window.web3) {
              const i = '__isMetaMaskShim__';
              let o = { currentProvider: e };
              Object.defineProperty(o, i, {
                value: !0,
                enumerable: !0,
                configurable: !1,
                writable: !1,
              }),
                (o = new Proxy(o, {
                  get: (o, s, ...a) => (
                    s !== 'currentProvider' || r
                      ? s === 'currentProvider' ||
                        s === i ||
                        n ||
                        ((n = !0),
                        t.error(
                          'MetaMask no longer injects web3. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3'
                        ),
                        e.request({ method: 'metamask_logWeb3ShimUsage' }).catch(e => {
                          t.debug('MetaMask: Failed to log web3 shim usage.', e);
                        }))
                      : ((r = !0),
                        t.warn(
                          'You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3'
                        )),
                    Reflect.get(o, s, ...a)
                  ),
                  set: (...e) => (
                    t.warn(
                      'You are accessing the MetaMask window.web3 shim. This object is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3'
                    ),
                    Reflect.set(...e)
                  ),
                })),
                Object.defineProperty(window, 'web3', {
                  value: o,
                  enumerable: !1,
                  configurable: !0,
                  writable: !0,
                });
            }
          });
      },
      {},
    ],
    42: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.sendSiteMetadata = async function (e, t) {
            try {
              const t = await (async function () {
                return { name: s(window), icon: await a(window) };
              })();
              e.handle(
                { jsonrpc: '2.0', id: 1, method: 'metamask_sendDomainMetadata', params: t },
                o.NOOP
              );
            } catch (e) {
              t.error({ message: i.default.errors.sendSiteMetadata(), originalError: e });
            }
          });
        const i = n(e('./messages.cjs'));
        const o = e('./utils.cjs');
        function s(e) {
          const { document: t } = e;
          const r = t.querySelector('head > meta[property="og:site_name"]');
          if (r) return r.content;
          const n = t.querySelector('head > meta[name="title"]');
          return n ? n.content : t.title && t.title.length > 0 ? t.title : window.location.hostname;
        }
        async function a(e) {
          const { document: t } = e;
          const r = t.querySelectorAll('head > link[rel~="icon"]');
          for (const e of Array.from(r)) if (e && (await c(e.href))) return e.href;
          return null;
        }
        async function c(e) {
          return new Promise((t, r) => {
            try {
              const r = document.createElement('img');
              (r.onload = () => t(!0)), (r.onerror = () => t(!1)), (r.src = e);
            } catch (e) {
              r(e);
            }
          });
        }
      },
      { './messages.cjs': 39, './utils.cjs': 43 },
    ],
    43: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.NOOP =
            r.isValidNetworkVersion =
            r.isValidChainId =
            r.getRpcPromiseCallback =
            r.getDefaultExternalMiddleware =
            r.EMITTED_NOTIFICATIONS =
            r.FQDN_REGEX =
            r.UUID_V4_REGEX =
              void 0);
        const n = e('@metamask/json-rpc-engine');
        const i = e('@metamask/rpc-errors');
        const o = e('./middleware/createRpcWarningMiddleware.cjs');
        (r.UUID_V4_REGEX =
          /(?:^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u),
          (r.FQDN_REGEX =
            /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/u);
        const s = /^(\d*[1-9]\d*|0)$/u;
        r.EMITTED_NOTIFICATIONS = Object.freeze(['eth_subscription']);
        r.getDefaultExternalMiddleware = (e = console) => {
          return [
            (0, n.createIdRemapMiddleware)(),
            ((t = e),
            (e, r, n) => {
              (typeof e.method === 'string' && e.method) ||
                (r.error = i.rpcErrors.invalidRequest({
                  message: "The request 'method' must be a non-empty string.",
                  data: e,
                })),
                n(e => {
                  const { error: n } = r;
                  return n ? (t.warn(`MetaMask - RPC Error: ${n.message}`, n), e()) : e();
                });
            }),
            (0, o.createRpcWarningMiddleware)(e),
          ];
          let t;
        };
        r.getRpcPromiseCallback =
          (e, t, r = !0) =>
          (n, i) => {
            n || i.error ? t(n || i.error) : !r || Array.isArray(i) ? e(i) : e(i.result);
          };
        r.isValidChainId = e => Boolean(e) && typeof e === 'string' && e.startsWith('0x');
        r.isValidNetworkVersion = e => typeof e === 'string' && (s.test(e) || e === 'loading');
        r.NOOP = () => {};
      },
      {
        './middleware/createRpcWarningMiddleware.cjs': 40,
        '@metamask/json-rpc-engine': 8,
        '@metamask/rpc-errors': 74,
      },
    ],
    44: [
      function (e, t, r) {
        t.exports = e('./dist/initializeInpageProvider.cjs');
      },
      { './dist/initializeInpageProvider.cjs': 38 },
    ],
    45: [
      function (e, t, r) {
        (function (t) {
          (function () {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }), (r.PortDuplexStream = void 0);
            const n = e('readable-stream');
            class i extends n.Duplex {
              constructor(e, t = {}) {
                super(Object.assign({ objectMode: !0 }, t)),
                  (this._port = e),
                  this._port.onMessage.addListener(e => this._onMessage(e)),
                  this._port.onDisconnect.addListener(() => this._onDisconnect()),
                  (this._log = () => null);
              }
              _onMessage(e) {
                if (t.isBuffer(e)) {
                  const r = t.from(e);
                  this._log(r, !1), this.push(r);
                } else this._log(e, !1), this.push(e);
              }
              _onDisconnect() {
                this.destroy();
              }
              _read() {}
              _write(e, r, n) {
                try {
                  if (t.isBuffer(e)) {
                    const t = e.toJSON();
                    (t._isBuffer = !0), this._log(t, !0), this._port.postMessage(t);
                  } else this._log(e, !0), this._port.postMessage(e);
                } catch (e) {
                  return n(new Error('PortDuplexStream - disconnected'));
                }
                return n();
              }
              _setLogger(e) {
                this._log = e;
              }
            }
            (r.default = i), (r.PortDuplexStream = i);
          }).call(this);
        }).call(this, e('buffer').Buffer);
      },
      { buffer: 132, 'readable-stream': 64 },
    ],
    46: [
      function (e, t, r) {
        'use strict';
        const { SymbolDispose: n } = e('../../ours/primordials');
        const { AbortError: i, codes: o } = e('../../ours/errors');
        const { isNodeStream: s, isWebStream: a, kControllerErrorFunction: c } = e('./utils');
        const u = e('./end-of-stream');
        const { ERR_INVALID_ARG_TYPE: l } = o;
        let d;
        (t.exports.addAbortSignal = function (e, r) {
          if (
            (((e, t) => {
              if (typeof e !== 'object' || !('aborted' in e)) throw new l(t, 'AbortSignal', e);
            })(e, 'signal'),
            !s(r) && !a(r))
          )
            throw new l('stream', ['ReadableStream', 'WritableStream', 'Stream'], r);
          return t.exports.addAbortSignalNoValidate(e, r);
        }),
          (t.exports.addAbortSignalNoValidate = function (t, r) {
            if (typeof t !== 'object' || !('aborted' in t)) return r;
            const o = s(r)
              ? () => {
                  r.destroy(new i(void 0, { cause: t.reason }));
                }
              : () => {
                  r[c](new i(void 0, { cause: t.reason }));
                };
            if (t.aborted) o();
            else {
              d = d || e('../../ours/util').addAbortListener;
              const i = d(t, o);
              u(r, i[n]);
            }
            return r;
          });
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        '../../ours/util': 67,
        './end-of-stream': 52,
        './utils': 61,
      },
    ],
    47: [
      function (e, t, r) {
        'use strict';
        const {
          StringPrototypeSlice: n,
          SymbolIterator: i,
          TypedArrayPrototypeSet: o,
          Uint8Array: s,
        } = e('../../ours/primordials');
        const { Buffer: a } = e('buffer');
        const { inspect: c } = e('../../ours/util');
        t.exports = class {
          constructor() {
            (this.head = null), (this.tail = null), (this.length = 0);
          }
          push(e) {
            const t = { data: e, next: null };
            this.length > 0 ? (this.tail.next = t) : (this.head = t),
              (this.tail = t),
              ++this.length;
          }
          unshift(e) {
            const t = { data: e, next: this.head };
            this.length === 0 && (this.tail = t), (this.head = t), ++this.length;
          }
          shift() {
            if (this.length === 0) return;
            const e = this.head.data;
            return (
              this.length === 1 ? (this.head = this.tail = null) : (this.head = this.head.next),
              --this.length,
              e
            );
          }
          clear() {
            (this.head = this.tail = null), (this.length = 0);
          }
          join(e) {
            if (this.length === 0) return '';
            let t = this.head;
            let r = '' + t.data;
            for (; (t = t.next) !== null; ) r += e + t.data;
            return r;
          }
          concat(e) {
            if (this.length === 0) return a.alloc(0);
            const t = a.allocUnsafe(e >>> 0);
            let r = this.head;
            let n = 0;
            for (; r; ) o(t, r.data, n), (n += r.data.length), (r = r.next);
            return t;
          }
          consume(e, t) {
            const r = this.head.data;
            if (e < r.length) {
              const t = r.slice(0, e);
              return (this.head.data = r.slice(e)), t;
            }
            return e === r.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e);
          }
          first() {
            return this.head.data;
          }
          *[i]() {
            for (let e = this.head; e; e = e.next) yield e.data;
          }
          _getString(e) {
            let t = '';
            let r = this.head;
            let i = 0;
            do {
              const o = r.data;
              if (!(e > o.length)) {
                e === o.length
                  ? ((t += o), ++i, r.next ? (this.head = r.next) : (this.head = this.tail = null))
                  : ((t += n(o, 0, e)), (this.head = r), (r.data = n(o, e)));
                break;
              }
              (t += o), (e -= o.length), ++i;
            } while ((r = r.next) !== null);
            return (this.length -= i), t;
          }
          _getBuffer(e) {
            const t = a.allocUnsafe(e);
            const r = e;
            let n = this.head;
            let i = 0;
            do {
              const a = n.data;
              if (!(e > a.length)) {
                e === a.length
                  ? (o(t, a, r - e),
                    ++i,
                    n.next ? (this.head = n.next) : (this.head = this.tail = null))
                  : (o(t, new s(a.buffer, a.byteOffset, e), r - e),
                    (this.head = n),
                    (n.data = a.slice(e)));
                break;
              }
              o(t, a, r - e), (e -= a.length), ++i;
            } while ((n = n.next) !== null);
            return (this.length -= i), t;
          }
          [Symbol.for('nodejs.util.inspect.custom')](e, t) {
            return c(this, { ...t, depth: 0, customInspect: !1 });
          }
        };
      },
      { '../../ours/primordials': 66, '../../ours/util': 67, buffer: 132 },
    ],
    48: [
      function (e, t, r) {
        'use strict';
        const { pipeline: n } = e('./pipeline');
        const i = e('./duplex');
        const { destroyer: o } = e('./destroy');
        const {
          isNodeStream: s,
          isReadable: a,
          isWritable: c,
          isWebStream: u,
          isTransformStream: l,
          isWritableStream: d,
          isReadableStream: f,
        } = e('./utils');
        const {
          AbortError: h,
          codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: g },
        } = e('../../ours/errors');
        const m = e('./end-of-stream');
        t.exports = function (...e) {
          if (e.length === 0) throw new g('streams');
          if (e.length === 1) return i.from(e[0]);
          const t = [...e];
          if (
            (typeof e[0] === 'function' && (e[0] = i.from(e[0])),
            typeof e[e.length - 1] === 'function')
          ) {
            const t = e.length - 1;
            e[t] = i.from(e[t]);
          }
          for (let r = 0; r < e.length; ++r)
            if (s(e[r]) || u(e[r])) {
              if (r < e.length - 1 && !(a(e[r]) || f(e[r]) || l(e[r])))
                throw new p(`streams[${r}]`, t[r], 'must be readable');
              if (r > 0 && !(c(e[r]) || d(e[r]) || l(e[r])))
                throw new p(`streams[${r}]`, t[r], 'must be writable');
            }
          let r, y, b, w, v;
          const E = e[0];
          const _ = n(e, function (e) {
            const t = w;
            (w = null), t ? t(e) : e ? v.destroy(e) : S || M || v.destroy();
          });
          const M = !!(c(E) || d(E) || l(E));
          const S = !!(a(_) || f(_) || l(_));
          if (
            ((v = new i({
              writableObjectMode: !(E == null || !E.writableObjectMode),
              readableObjectMode: !(_ == null || !_.readableObjectMode),
              writable: M,
              readable: S,
            })),
            M)
          ) {
            if (s(E))
              (v._write = function (e, t, n) {
                E.write(e, t) ? n() : (r = n);
              }),
                (v._final = function (e) {
                  E.end(), (y = e);
                }),
                E.on('drain', function () {
                  if (r) {
                    const e = r;
                    (r = null), e();
                  }
                });
            else if (u(E)) {
              const e = (l(E) ? E.writable : E).getWriter();
              (v._write = async function (t, r, n) {
                try {
                  await e.ready, e.write(t).catch(() => {}), n();
                } catch (e) {
                  n(e);
                }
              }),
                (v._final = async function (t) {
                  try {
                    await e.ready, e.close().catch(() => {}), (y = t);
                  } catch (e) {
                    t(e);
                  }
                });
            }
            const e = l(_) ? _.readable : _;
            m(e, () => {
              if (y) {
                const e = y;
                (y = null), e();
              }
            });
          }
          if (S)
            if (s(_))
              _.on('readable', function () {
                if (b) {
                  const e = b;
                  (b = null), e();
                }
              }),
                _.on('end', function () {
                  v.push(null);
                }),
                (v._read = function () {
                  for (;;) {
                    const e = _.read();
                    if (e === null) return void (b = v._read);
                    if (!v.push(e)) return;
                  }
                });
            else if (u(_)) {
              const e = (l(_) ? _.readable : _).getReader();
              v._read = async function () {
                for (;;)
                  try {
                    const { value: t, done: r } = await e.read();
                    if (!v.push(t)) return;
                    if (r) return void v.push(null);
                  } catch {
                    return;
                  }
              };
            }
          return (
            (v._destroy = function (e, t) {
              e || w === null || (e = new h()),
                (b = null),
                (r = null),
                (y = null),
                w === null ? t(e) : ((w = t), s(_) && o(_, e));
            }),
            v
          );
        };
      },
      {
        '../../ours/errors': 65,
        './destroy': 49,
        './duplex': 50,
        './end-of-stream': 52,
        './pipeline': 57,
        './utils': 61,
      },
    ],
    49: [
      function (e, t, r) {
        'use strict';
        const n = e('process/');
        const {
          aggregateTwoErrors: i,
          codes: { ERR_MULTIPLE_CALLBACK: o },
          AbortError: s,
        } = e('../../ours/errors');
        const { Symbol: a } = e('../../ours/primordials');
        const { kIsDestroyed: c, isDestroyed: u, isFinished: l, isServerRequest: d } = e('./utils');
        const f = a('kDestroy');
        const h = a('kConstruct');
        function p(e, t, r) {
          e && (e.stack, t && !t.errored && (t.errored = e), r && !r.errored && (r.errored = e));
        }
        function g(e, t, r) {
          let i = !1;
          function o(t) {
            if (i) return;
            i = !0;
            const o = e._readableState;
            const s = e._writableState;
            p(t, s, o),
              s && (s.closed = !0),
              o && (o.closed = !0),
              typeof r === 'function' && r(t),
              t ? n.nextTick(m, e, t) : n.nextTick(y, e);
          }
          try {
            e._destroy(t || null, o);
          } catch (t) {
            o(t);
          }
        }
        function m(e, t) {
          b(e, t), y(e);
        }
        function y(e) {
          const t = e._readableState;
          const r = e._writableState;
          r && (r.closeEmitted = !0),
            t && (t.closeEmitted = !0),
            ((r != null && r.emitClose) || (t != null && t.emitClose)) && e.emit('close');
        }
        function b(e, t) {
          const r = e._readableState;
          const n = e._writableState;
          (n != null && n.errorEmitted) ||
            (r != null && r.errorEmitted) ||
            (n && (n.errorEmitted = !0), r && (r.errorEmitted = !0), e.emit('error', t));
        }
        function w(e, t, r) {
          const i = e._readableState;
          const o = e._writableState;
          if ((o != null && o.destroyed) || (i != null && i.destroyed)) return this;
          (i != null && i.autoDestroy) || (o != null && o.autoDestroy)
            ? e.destroy(t)
            : t &&
              (t.stack,
              o && !o.errored && (o.errored = t),
              i && !i.errored && (i.errored = t),
              r ? n.nextTick(b, e, t) : b(e, t));
        }
        function v(e) {
          let t = !1;
          function r(r) {
            if (t) return void w(e, r != null ? r : new o());
            t = !0;
            const i = e._readableState;
            const s = e._writableState;
            const a = s || i;
            i && (i.constructed = !0),
              s && (s.constructed = !0),
              a.destroyed ? e.emit(f, r) : r ? w(e, r, !0) : n.nextTick(E, e);
          }
          try {
            e._construct(e => {
              n.nextTick(r, e);
            });
          } catch (e) {
            n.nextTick(r, e);
          }
        }
        function E(e) {
          e.emit(h);
        }
        function _(e) {
          return (e == null ? void 0 : e.setHeader) && typeof e.abort === 'function';
        }
        function M(e) {
          e.emit('close');
        }
        function S(e, t) {
          e.emit('error', t), n.nextTick(M, e);
        }
        t.exports = {
          construct: function (e, t) {
            if (typeof e._construct !== 'function') return;
            const r = e._readableState;
            const i = e._writableState;
            r && (r.constructed = !1),
              i && (i.constructed = !1),
              e.once(h, t),
              e.listenerCount(h) > 1 || n.nextTick(v, e);
          },
          destroyer: function (e, t) {
            e &&
              !u(e) &&
              (t || l(e) || (t = new s()),
              d(e)
                ? ((e.socket = null), e.destroy(t))
                : _(e)
                  ? e.abort()
                  : _(e.req)
                    ? e.req.abort()
                    : typeof e.destroy === 'function'
                      ? e.destroy(t)
                      : typeof e.close === 'function'
                        ? e.close()
                        : t
                          ? n.nextTick(S, e, t)
                          : n.nextTick(M, e),
              e.destroyed || (e[c] = !0));
          },
          destroy: function (e, t) {
            const r = this._readableState;
            const n = this._writableState;
            const o = n || r;
            return (n != null && n.destroyed) || (r != null && r.destroyed)
              ? (typeof t === 'function' && t(), this)
              : (p(e, n, r),
                n && (n.destroyed = !0),
                r && (r.destroyed = !0),
                o.constructed
                  ? g(this, e, t)
                  : this.once(f, function (r) {
                      g(this, i(r, e), t);
                    }),
                this);
          },
          undestroy: function () {
            const e = this._readableState;
            const t = this._writableState;
            e &&
              ((e.constructed = !0),
              (e.closed = !1),
              (e.closeEmitted = !1),
              (e.destroyed = !1),
              (e.errored = null),
              (e.errorEmitted = !1),
              (e.reading = !1),
              (e.ended = !1 === e.readable),
              (e.endEmitted = !1 === e.readable)),
              t &&
                ((t.constructed = !0),
                (t.destroyed = !1),
                (t.closed = !1),
                (t.closeEmitted = !1),
                (t.errored = null),
                (t.errorEmitted = !1),
                (t.finalCalled = !1),
                (t.prefinished = !1),
                (t.ended = !1 === t.writable),
                (t.ending = !1 === t.writable),
                (t.finished = !1 === t.writable));
          },
          errorOrDestroy: w,
        };
      },
      { '../../ours/errors': 65, '../../ours/primordials': 66, './utils': 61, 'process/': 150 },
    ],
    50: [
      function (e, t, r) {
        'use strict';
        const {
          ObjectDefineProperties: n,
          ObjectGetOwnPropertyDescriptor: i,
          ObjectKeys: o,
          ObjectSetPrototypeOf: s,
        } = e('../../ours/primordials');
        t.exports = u;
        const a = e('./readable');
        const c = e('./writable');
        s(u.prototype, a.prototype), s(u, a);
        {
          const e = o(c.prototype);
          for (let t = 0; t < e.length; t++) {
            const r = e[t];
            u.prototype[r] || (u.prototype[r] = c.prototype[r]);
          }
        }
        function u(e) {
          if (!(this instanceof u)) return new u(e);
          a.call(this, e),
            c.call(this, e),
            e
              ? ((this.allowHalfOpen = !1 !== e.allowHalfOpen),
                !1 === e.readable &&
                  ((this._readableState.readable = !1),
                  (this._readableState.ended = !0),
                  (this._readableState.endEmitted = !0)),
                !1 === e.writable &&
                  ((this._writableState.writable = !1),
                  (this._writableState.ending = !0),
                  (this._writableState.ended = !0),
                  (this._writableState.finished = !0)))
              : (this.allowHalfOpen = !0);
        }
        let l, d;
        function f() {
          return void 0 === l && (l = {}), l;
        }
        n(u.prototype, {
          writable: { __proto__: null, ...i(c.prototype, 'writable') },
          writableHighWaterMark: { __proto__: null, ...i(c.prototype, 'writableHighWaterMark') },
          writableObjectMode: { __proto__: null, ...i(c.prototype, 'writableObjectMode') },
          writableBuffer: { __proto__: null, ...i(c.prototype, 'writableBuffer') },
          writableLength: { __proto__: null, ...i(c.prototype, 'writableLength') },
          writableFinished: { __proto__: null, ...i(c.prototype, 'writableFinished') },
          writableCorked: { __proto__: null, ...i(c.prototype, 'writableCorked') },
          writableEnded: { __proto__: null, ...i(c.prototype, 'writableEnded') },
          writableNeedDrain: { __proto__: null, ...i(c.prototype, 'writableNeedDrain') },
          destroyed: {
            __proto__: null,
            get() {
              return (
                void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                this._readableState.destroyed &&
                this._writableState.destroyed
              );
            },
            set(e) {
              this._readableState &&
                this._writableState &&
                ((this._readableState.destroyed = e), (this._writableState.destroyed = e));
            },
          },
        }),
          (u.fromWeb = function (e, t) {
            return f().newStreamDuplexFromReadableWritablePair(e, t);
          }),
          (u.toWeb = function (e) {
            return f().newReadableWritablePairFromDuplex(e);
          }),
          (u.from = function (t) {
            return d || (d = e('./duplexify')), d(t, 'body');
          });
      },
      { '../../ours/primordials': 66, './duplexify': 51, './readable': 58, './writable': 62 },
    ],
    51: [
      function (e, t, r) {
        const n = e('process/');
        const i = e('buffer');
        const {
          isReadable: o,
          isWritable: s,
          isIterable: a,
          isNodeStream: c,
          isReadableNodeStream: u,
          isWritableNodeStream: l,
          isDuplexNodeStream: d,
          isReadableStream: f,
          isWritableStream: h,
        } = e('./utils');
        const p = e('./end-of-stream');
        const {
          AbortError: g,
          codes: { ERR_INVALID_ARG_TYPE: m, ERR_INVALID_RETURN_VALUE: y },
        } = e('../../ours/errors');
        const { destroyer: b } = e('./destroy');
        const w = e('./duplex');
        const v = e('./readable');
        const E = e('./writable');
        const { createDeferredPromise: _ } = e('../../ours/util');
        const M = e('./from');
        const S = globalThis.Blob || i.Blob;
        const j =
          void 0 !== S
            ? function (e) {
                return e instanceof S;
              }
            : function (e) {
                return !1;
              };
        const I = globalThis.AbortController || e('abort-controller').AbortController;
        const { FunctionPrototypeCall: A } = e('../../ours/primordials');
        class R extends w {
          constructor(e) {
            super(e),
              !1 === (e == null ? void 0 : e.readable) &&
                ((this._readableState.readable = !1),
                (this._readableState.ended = !0),
                (this._readableState.endEmitted = !0)),
              !1 === (e == null ? void 0 : e.writable) &&
                ((this._writableState.writable = !1),
                (this._writableState.ending = !0),
                (this._writableState.ended = !0),
                (this._writableState.finished = !0));
          }
        }
        function T(e) {
          const t =
            e.readable && typeof e.readable.read !== 'function' ? v.wrap(e.readable) : e.readable;
          const r = e.writable;
          let n;
          let i;
          let a;
          let c;
          let u;
          let l = !!o(t);
          let d = !!s(r);
          function f(e) {
            const t = c;
            (c = null), t ? t(e) : e && u.destroy(e);
          }
          return (
            (u = new R({
              readableObjectMode: !(t == null || !t.readableObjectMode),
              writableObjectMode: !(r == null || !r.writableObjectMode),
              readable: l,
              writable: d,
            })),
            d &&
              (p(r, e => {
                (d = !1), e && b(t, e), f(e);
              }),
              (u._write = function (e, t, i) {
                r.write(e, t) ? i() : (n = i);
              }),
              (u._final = function (e) {
                r.end(), (i = e);
              }),
              r.on('drain', function () {
                if (n) {
                  const e = n;
                  (n = null), e();
                }
              }),
              r.on('finish', function () {
                if (i) {
                  const e = i;
                  (i = null), e();
                }
              })),
            l &&
              (p(t, e => {
                (l = !1), e && b(t, e), f(e);
              }),
              t.on('readable', function () {
                if (a) {
                  const e = a;
                  (a = null), e();
                }
              }),
              t.on('end', function () {
                u.push(null);
              }),
              (u._read = function () {
                for (;;) {
                  const e = t.read();
                  if (e === null) return void (a = u._read);
                  if (!u.push(e)) return;
                }
              })),
            (u._destroy = function (e, o) {
              e || c === null || (e = new g()),
                (a = null),
                (n = null),
                (i = null),
                c === null ? o(e) : ((c = o), b(r, e), b(t, e));
            }),
            u
          );
        }
        t.exports = function e(t, r) {
          if (d(t)) return t;
          if (u(t)) return T({ readable: t });
          if (l(t)) return T({ writable: t });
          if (c(t)) return T({ writable: !1, readable: !1 });
          if (f(t)) return T({ readable: v.fromWeb(t) });
          if (h(t)) return T({ writable: E.fromWeb(t) });
          if (typeof t === 'function') {
            const {
              value: e,
              write: i,
              final: o,
              destroy: s,
            } = (function (e) {
              let { promise: t, resolve: r } = _();
              const i = new I();
              const o = i.signal;
              const s = e(
                (async function* () {
                  for (;;) {
                    const e = t;
                    t = null;
                    const { chunk: i, done: s, cb: a } = await e;
                    if ((n.nextTick(a), s)) return;
                    if (o.aborted) throw new g(void 0, { cause: o.reason });
                    ({ promise: t, resolve: r } = _()), yield i;
                  }
                })(),
                { signal: o }
              );
              return {
                value: s,
                write(e, t, n) {
                  const i = r;
                  (r = null), i({ chunk: e, done: !1, cb: n });
                },
                final(e) {
                  const t = r;
                  (r = null), t({ done: !0, cb: e });
                },
                destroy(e, t) {
                  i.abort(), t(e);
                },
              };
            })(t);
            if (a(e)) return M(R, e, { objectMode: !0, write: i, final: o, destroy: s });
            const c = e == null ? void 0 : e.then;
            if (typeof c === 'function') {
              let t;
              const r = A(
                c,
                e,
                e => {
                  if (e != null) throw new y('nully', 'body', e);
                },
                e => {
                  b(t, e);
                }
              );
              return (t = new R({
                objectMode: !0,
                readable: !1,
                write: i,
                final(e) {
                  o(async () => {
                    try {
                      await r, n.nextTick(e, null);
                    } catch (t) {
                      n.nextTick(e, t);
                    }
                  });
                },
                destroy: s,
              }));
            }
            throw new y('Iterable, AsyncIterable or AsyncFunction', r, e);
          }
          if (j(t)) return e(t.arrayBuffer());
          if (a(t)) return M(R, t, { objectMode: !0, writable: !1 });
          if (f(t == null ? void 0 : t.readable) && h(t == null ? void 0 : t.writable))
            return R.fromWeb(t);
          if (
            typeof (t == null ? void 0 : t.writable) === 'object' ||
            typeof (t == null ? void 0 : t.readable) === 'object'
          ) {
            return T({
              readable:
                t != null && t.readable
                  ? u(t == null ? void 0 : t.readable)
                    ? t == null
                      ? void 0
                      : t.readable
                    : e(t.readable)
                  : void 0,
              writable:
                t != null && t.writable
                  ? l(t == null ? void 0 : t.writable)
                    ? t == null
                      ? void 0
                      : t.writable
                    : e(t.writable)
                  : void 0,
            });
          }
          const i = t == null ? void 0 : t.then;
          if (typeof i === 'function') {
            let e;
            return (
              A(
                i,
                t,
                t => {
                  t != null && e.push(t), e.push(null);
                },
                t => {
                  b(e, t);
                }
              ),
              (e = new R({ objectMode: !0, writable: !1, read() {} }))
            );
          }
          throw new m(
            r,
            [
              'Blob',
              'ReadableStream',
              'WritableStream',
              'Stream',
              'Iterable',
              'AsyncIterable',
              'Function',
              '{ readable, writable } pair',
              'Promise',
            ],
            t
          );
        };
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        '../../ours/util': 67,
        './destroy': 49,
        './duplex': 50,
        './end-of-stream': 52,
        './from': 53,
        './readable': 58,
        './utils': 61,
        './writable': 62,
        'abort-controller': 129,
        buffer: 132,
        'process/': 150,
      },
    ],
    52: [
      function (e, t, r) {
        'use strict';
        const n = e('process/');
        const { AbortError: i, codes: o } = e('../../ours/errors');
        const { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_PREMATURE_CLOSE: a } = o;
        const { kEmptyObject: c, once: u } = e('../../ours/util');
        const {
          validateAbortSignal: l,
          validateFunction: d,
          validateObject: f,
          validateBoolean: h,
        } = e('../validators');
        const {
          Promise: p,
          PromisePrototypeThen: g,
          SymbolDispose: m,
        } = e('../../ours/primordials');
        const {
          isClosed: y,
          isReadable: b,
          isReadableNodeStream: w,
          isReadableStream: v,
          isReadableFinished: E,
          isReadableErrored: _,
          isWritable: M,
          isWritableNodeStream: S,
          isWritableStream: j,
          isWritableFinished: I,
          isWritableErrored: A,
          isNodeStream: R,
          willEmitClose: T,
          kIsClosedPromise: N,
        } = e('./utils');
        let O;
        const C = () => {};
        function x(t, r, o) {
          let h, p;
          if (
            (arguments.length === 2 ? ((o = r), (r = c)) : r == null ? (r = c) : f(r, 'options'),
            d(o, 'callback'),
            l(r.signal, 'options.signal'),
            (o = u(o)),
            v(t) || j(t))
          )
            return (function (t, r, o) {
              let s = !1;
              let a = C;
              if (r.signal)
                if (
                  ((a = () => {
                    (s = !0), o.call(t, new i(void 0, { cause: r.signal.reason }));
                  }),
                  r.signal.aborted)
                )
                  n.nextTick(a);
                else {
                  O = O || e('../../ours/util').addAbortListener;
                  const n = O(r.signal, a);
                  const i = o;
                  o = u((...e) => {
                    n[m](), i.apply(t, e);
                  });
                }
              const c = (...e) => {
                s || n.nextTick(() => o.apply(t, e));
              };
              return g(t[N].promise, c, c), C;
            })(t, r, o);
          if (!R(t)) throw new s('stream', ['ReadableStream', 'WritableStream', 'Stream'], t);
          const x = (h = r.readable) !== null && void 0 !== h ? h : w(t);
          const P = (p = r.writable) !== null && void 0 !== p ? p : S(t);
          const k = t._writableState;
          const D = t._readableState;
          const L = () => {
            t.writable || z();
          };
          let $ = T(t) && w(t) === x && S(t) === P;
          let U = I(t, !1);
          const z = () => {
            (U = !0),
              t.destroyed && ($ = !1),
              (!$ || (t.readable && !x)) && ((x && !B) || o.call(t));
          };
          let B = E(t, !1);
          const W = () => {
            (B = !0),
              t.destroyed && ($ = !1),
              (!$ || (t.writable && !P)) && ((P && !U) || o.call(t));
          };
          const F = e => {
            o.call(t, e);
          };
          let G = y(t);
          const V = () => {
            G = !0;
            const e = A(t) || _(t);
            return e && typeof e !== 'boolean'
              ? o.call(t, e)
              : x && !B && w(t, !0) && !E(t, !1)
                ? o.call(t, new a())
                : !P || U || I(t, !1)
                  ? void o.call(t)
                  : o.call(t, new a());
          };
          const H = () => {
            G = !0;
            const e = A(t) || _(t);
            if (e && typeof e !== 'boolean') return o.call(t, e);
            o.call(t);
          };
          const J = () => {
            t.req.on('finish', z);
          };
          !(function (e) {
            return e.setHeader && typeof e.abort === 'function';
          })(t)
            ? P && !k && (t.on('end', L), t.on('close', L))
            : (t.on('complete', z), $ || t.on('abort', V), t.req ? J() : t.on('request', J)),
            $ || typeof t.aborted !== 'boolean' || t.on('aborted', V),
            t.on('end', W),
            t.on('finish', z),
            !1 !== r.error && t.on('error', F),
            t.on('close', V),
            G
              ? n.nextTick(V)
              : (k != null && k.errorEmitted) || (D != null && D.errorEmitted)
                ? $ || n.nextTick(H)
                : (x || ($ && !b(t)) || (!U && !1 !== M(t))) &&
                    (P || ($ && !M(t)) || (!B && !1 !== b(t)))
                  ? D && t.req && t.aborted && n.nextTick(H)
                  : n.nextTick(H);
          const q = () => {
            (o = C),
              t.removeListener('aborted', V),
              t.removeListener('complete', z),
              t.removeListener('abort', V),
              t.removeListener('request', J),
              t.req && t.req.removeListener('finish', z),
              t.removeListener('end', L),
              t.removeListener('close', L),
              t.removeListener('finish', z),
              t.removeListener('end', W),
              t.removeListener('error', F),
              t.removeListener('close', V);
          };
          if (r.signal && !G) {
            const s = () => {
              const e = o;
              q(), e.call(t, new i(void 0, { cause: r.signal.reason }));
            };
            if (r.signal.aborted) n.nextTick(s);
            else {
              O = O || e('../../ours/util').addAbortListener;
              const n = O(r.signal, s);
              const i = o;
              o = u((...e) => {
                n[m](), i.apply(t, e);
              });
            }
          }
          return q;
        }
        (t.exports = x),
          (t.exports.finished = function (e, t) {
            let r;
            let n = !1;
            return (
              t === null && (t = c),
              (r = t) !== null &&
                void 0 !== r &&
                r.cleanup &&
                (h(t.cleanup, 'cleanup'), (n = t.cleanup)),
              new p((r, i) => {
                const o = x(e, t, e => {
                  n && o(), e ? i(e) : r();
                });
              })
            );
          });
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        '../../ours/util': 67,
        '../validators': 63,
        './utils': 61,
        'process/': 150,
      },
    ],
    53: [
      function (e, t, r) {
        'use strict';
        const n = e('process/');
        const {
          PromisePrototypeThen: i,
          SymbolAsyncIterator: o,
          SymbolIterator: s,
        } = e('../../ours/primordials');
        const { Buffer: a } = e('buffer');
        const { ERR_INVALID_ARG_TYPE: c, ERR_STREAM_NULL_VALUES: u } = e('../../ours/errors').codes;
        t.exports = function (e, t, r) {
          let l, d;
          if (typeof t === 'string' || t instanceof a)
            return new e({
              objectMode: !0,
              ...r,
              read() {
                this.push(t), this.push(null);
              },
            });
          if (t && t[o]) (d = !0), (l = t[o]());
          else {
            if (!t || !t[s]) throw new c('iterable', ['Iterable'], t);
            (d = !1), (l = t[s]());
          }
          const f = new e({ objectMode: !0, highWaterMark: 1, ...r });
          let h = !1;
          return (
            (f._read = function () {
              h ||
                ((h = !0),
                (async function () {
                  for (;;) {
                    try {
                      const { value: e, done: t } = d ? await l.next() : l.next();
                      if (t) f.push(null);
                      else {
                        const t = e && typeof e.then === 'function' ? await e : e;
                        if (t === null) throw ((h = !1), new u());
                        if (f.push(t)) continue;
                        h = !1;
                      }
                    } catch (e) {
                      f.destroy(e);
                    }
                    break;
                  }
                })());
            }),
            (f._destroy = function (e, t) {
              i(
                (async function (e) {
                  const t = e != null;
                  const r = typeof l.throw === 'function';
                  if (t && r) {
                    const { value: t, done: r } = await l.throw(e);
                    if ((await t, r)) return;
                  }
                  if (typeof l.return === 'function') {
                    const { value: e } = await l.return();
                    await e;
                  }
                })(e),
                () => n.nextTick(t, e),
                r => n.nextTick(t, r || e)
              );
            }),
            f
          );
        };
      },
      { '../../ours/errors': 65, '../../ours/primordials': 66, buffer: 132, 'process/': 150 },
    ],
    54: [
      function (e, t, r) {
        'use strict';
        const { ArrayIsArray: n, ObjectSetPrototypeOf: i } = e('../../ours/primordials');
        const { EventEmitter: o } = e('events');
        function s(e) {
          o.call(this, e);
        }
        function a(e, t, r) {
          if (typeof e.prependListener === 'function') return e.prependListener(t, r);
          e._events && e._events[t]
            ? n(e._events[t])
              ? e._events[t].unshift(r)
              : (e._events[t] = [r, e._events[t]])
            : e.on(t, r);
        }
        i(s.prototype, o.prototype),
          i(s, o),
          (s.prototype.pipe = function (e, t) {
            const r = this;
            function n(t) {
              e.writable && !1 === e.write(t) && r.pause && r.pause();
            }
            function i() {
              r.readable && r.resume && r.resume();
            }
            r.on('data', n),
              e.on('drain', i),
              e._isStdio || (t && !1 === t.end) || (r.on('end', c), r.on('close', u));
            let s = !1;
            function c() {
              s || ((s = !0), e.end());
            }
            function u() {
              s || ((s = !0), typeof e.destroy === 'function' && e.destroy());
            }
            function l(e) {
              d(), o.listenerCount(this, 'error') === 0 && this.emit('error', e);
            }
            function d() {
              r.removeListener('data', n),
                e.removeListener('drain', i),
                r.removeListener('end', c),
                r.removeListener('close', u),
                r.removeListener('error', l),
                e.removeListener('error', l),
                r.removeListener('end', d),
                r.removeListener('close', d),
                e.removeListener('close', d);
            }
            return (
              a(r, 'error', l),
              a(e, 'error', l),
              r.on('end', d),
              r.on('close', d),
              e.on('close', d),
              e.emit('pipe', r),
              e
            );
          }),
          (t.exports = { Stream: s, prependListener: a });
      },
      { '../../ours/primordials': 66, events: 138 },
    ],
    55: [
      function (e, t, r) {
        'use strict';
        const n = globalThis.AbortController || e('abort-controller').AbortController;
        const {
          codes: {
            ERR_INVALID_ARG_VALUE: i,
            ERR_INVALID_ARG_TYPE: o,
            ERR_MISSING_ARGS: s,
            ERR_OUT_OF_RANGE: a,
          },
          AbortError: c,
        } = e('../../ours/errors');
        const {
          validateAbortSignal: u,
          validateInteger: l,
          validateObject: d,
        } = e('../validators');
        const f = e('../../ours/primordials').Symbol('kWeak');
        const h = e('../../ours/primordials').Symbol('kResistStopPropagation');
        const { finished: p } = e('./end-of-stream');
        const g = e('./compose');
        const { addAbortSignalNoValidate: m } = e('./add-abort-signal');
        const { isWritable: y, isNodeStream: b } = e('./utils');
        const { deprecate: w } = e('../../ours/util');
        const {
          ArrayPrototypePush: v,
          Boolean: E,
          MathFloor: _,
          Number: M,
          NumberIsNaN: S,
          Promise: j,
          PromiseReject: I,
          PromiseResolve: A,
          PromisePrototypeThen: R,
          Symbol: T,
        } = e('../../ours/primordials');
        const N = T('kEmpty');
        const O = T('kEof');
        function C(t, r) {
          if (typeof t !== 'function') throw new o('fn', ['Function', 'AsyncFunction'], t);
          r != null && d(r, 'options'),
            (r == null ? void 0 : r.signal) != null && u(r.signal, 'options.signal');
          let n = 1;
          (r == null ? void 0 : r.concurrency) != null && (n = _(r.concurrency));
          let i = n - 1;
          return (
            (r == null ? void 0 : r.highWaterMark) != null && (i = _(r.highWaterMark)),
            l(n, 'options.concurrency', 1),
            l(i, 'options.highWaterMark', 0),
            (i += n),
            async function* () {
              const o = e('../../ours/util').AbortSignalAny(
                [r == null ? void 0 : r.signal].filter(E)
              );
              const s = this;
              const a = [];
              const u = { signal: o };
              let l;
              let d;
              let f = !1;
              let h = 0;
              function p() {
                (f = !0), g();
              }
              function g() {
                (h -= 1), m();
              }
              function m() {
                d && !f && h < n && a.length < i && (d(), (d = null));
              }
              !(async function () {
                try {
                  for await (let e of s) {
                    if (f) return;
                    if (o.aborted) throw new c();
                    try {
                      if (((e = t(e, u)), e === N)) continue;
                      e = A(e);
                    } catch (t) {
                      e = I(t);
                    }
                    (h += 1),
                      R(e, g, p),
                      a.push(e),
                      l && (l(), (l = null)),
                      !f &&
                        (a.length >= i || h >= n) &&
                        (await new j(e => {
                          d = e;
                        }));
                  }
                  a.push(O);
                } catch (e) {
                  const t = I(e);
                  R(t, g, p), a.push(t);
                } finally {
                  (f = !0), l && (l(), (l = null));
                }
              })();
              try {
                for (;;) {
                  for (; a.length > 0; ) {
                    const e = await a[0];
                    if (e === O) return;
                    if (o.aborted) throw new c();
                    e !== N && (yield e), a.shift(), m();
                  }
                  await new j(e => {
                    l = e;
                  });
                }
              } finally {
                (f = !0), d && (d(), (d = null));
              }
            }.call(this)
          );
        }
        async function x(e, t = void 0) {
          for await (const r of P.call(this, e, t)) return !0;
          return !1;
        }
        function P(e, t) {
          if (typeof e !== 'function') throw new o('fn', ['Function', 'AsyncFunction'], e);
          return C.call(
            this,
            async function (t, r) {
              return (await e(t, r)) ? t : N;
            },
            t
          );
        }
        class k extends s {
          constructor() {
            super('reduce'), (this.message = 'Reduce of an empty stream requires an initial value');
          }
        }
        function D(e) {
          if (((e = M(e)), S(e))) return 0;
          if (e < 0) throw new a('number', '>= 0', e);
          return e;
        }
        (t.exports.streamReturningOperators = {
          asIndexedPairs: w(function (e = void 0) {
            return (
              e != null && d(e, 'options'),
              (e == null ? void 0 : e.signal) != null && u(e.signal, 'options.signal'),
              async function* () {
                let t = 0;
                for await (const n of this) {
                  var r;
                  if (e != null && (r = e.signal) !== null && void 0 !== r && r.aborted)
                    throw new c({ cause: e.signal.reason });
                  yield [t++, n];
                }
              }.call(this)
            );
          }, 'readable.asIndexedPairs will be removed in a future version.'),
          drop: function (e, t = void 0) {
            return (
              t != null && d(t, 'options'),
              (t == null ? void 0 : t.signal) != null && u(t.signal, 'options.signal'),
              (e = D(e)),
              async function* () {
                let r;
                if (t != null && (r = t.signal) !== null && void 0 !== r && r.aborted)
                  throw new c();
                for await (const r of this) {
                  var n;
                  if (t != null && (n = t.signal) !== null && void 0 !== n && n.aborted)
                    throw new c();
                  e-- <= 0 && (yield r);
                }
              }.call(this)
            );
          },
          filter: P,
          flatMap: function (e, t) {
            const r = C.call(this, e, t);
            return async function* () {
              for await (const e of r) yield* e;
            }.call(this);
          },
          map: C,
          take: function (e, t = void 0) {
            return (
              t != null && d(t, 'options'),
              (t == null ? void 0 : t.signal) != null && u(t.signal, 'options.signal'),
              (e = D(e)),
              async function* () {
                let r;
                if (t != null && (r = t.signal) !== null && void 0 !== r && r.aborted)
                  throw new c();
                for await (const r of this) {
                  var n;
                  if (t != null && (n = t.signal) !== null && void 0 !== n && n.aborted)
                    throw new c();
                  if ((e-- > 0 && (yield r), e <= 0)) return;
                }
              }.call(this)
            );
          },
          compose: function (e, t) {
            if (
              (t != null && d(t, 'options'),
              (t == null ? void 0 : t.signal) != null && u(t.signal, 'options.signal'),
              b(e) && !y(e))
            )
              throw new i('stream', e, 'must be writable');
            const r = g(this, e);
            return t != null && t.signal && m(t.signal, r), r;
          },
        }),
          (t.exports.promiseReturningOperators = {
            every: async function (e, t = void 0) {
              if (typeof e !== 'function') throw new o('fn', ['Function', 'AsyncFunction'], e);
              return !(await x.call(this, async (...t) => !(await e(...t)), t));
            },
            forEach: async function (e, t) {
              if (typeof e !== 'function') throw new o('fn', ['Function', 'AsyncFunction'], e);
              for await (const r of C.call(
                this,
                async function (t, r) {
                  return await e(t, r), N;
                },
                t
              ));
            },
            reduce: async function (e, t, r) {
              let i;
              if (typeof e !== 'function') throw new o('reducer', ['Function', 'AsyncFunction'], e);
              r != null && d(r, 'options'),
                (r == null ? void 0 : r.signal) != null && u(r.signal, 'options.signal');
              let s = arguments.length > 1;
              if (r != null && (i = r.signal) !== null && void 0 !== i && i.aborted) {
                const e = new c(void 0, { cause: r.signal.reason });
                throw (this.once('error', () => {}), await p(this.destroy(e)), e);
              }
              const a = new n();
              const l = a.signal;
              if (r != null && r.signal) {
                const e = { once: !0, [f]: this, [h]: !0 };
                r.signal.addEventListener('abort', () => a.abort(), e);
              }
              let g = !1;
              try {
                for await (const n of this) {
                  var m;
                  if (((g = !0), r != null && (m = r.signal) !== null && void 0 !== m && m.aborted))
                    throw new c();
                  s ? (t = await e(t, n, { signal: l })) : ((t = n), (s = !0));
                }
                if (!g && !s) throw new k();
              } finally {
                a.abort();
              }
              return t;
            },
            toArray: async function (e) {
              e != null && d(e, 'options'),
                (e == null ? void 0 : e.signal) != null && u(e.signal, 'options.signal');
              const t = [];
              for await (const n of this) {
                var r;
                if (e != null && (r = e.signal) !== null && void 0 !== r && r.aborted)
                  throw new c(void 0, { cause: e.signal.reason });
                v(t, n);
              }
              return t;
            },
            some: x,
            find: async function (e, t) {
              for await (const r of P.call(this, e, t)) return r;
            },
          });
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        '../../ours/util': 67,
        '../validators': 63,
        './add-abort-signal': 46,
        './compose': 48,
        './end-of-stream': 52,
        './utils': 61,
        'abort-controller': 129,
      },
    ],
    56: [
      function (e, t, r) {
        'use strict';
        const { ObjectSetPrototypeOf: n } = e('../../ours/primordials');
        t.exports = o;
        const i = e('./transform');
        function o(e) {
          if (!(this instanceof o)) return new o(e);
          i.call(this, e);
        }
        n(o.prototype, i.prototype),
          n(o, i),
          (o.prototype._transform = function (e, t, r) {
            r(null, e);
          });
      },
      { '../../ours/primordials': 66, './transform': 60 },
    ],
    57: [
      function (e, t, r) {
        const n = e('process/');
        const {
          ArrayIsArray: i,
          Promise: o,
          SymbolAsyncIterator: s,
          SymbolDispose: a,
        } = e('../../ours/primordials');
        const c = e('./end-of-stream');
        const { once: u } = e('../../ours/util');
        const l = e('./destroy');
        const d = e('./duplex');
        const {
          aggregateTwoErrors: f,
          codes: {
            ERR_INVALID_ARG_TYPE: h,
            ERR_INVALID_RETURN_VALUE: p,
            ERR_MISSING_ARGS: g,
            ERR_STREAM_DESTROYED: m,
            ERR_STREAM_PREMATURE_CLOSE: y,
          },
          AbortError: b,
        } = e('../../ours/errors');
        const { validateFunction: w, validateAbortSignal: v } = e('../validators');
        const {
          isIterable: E,
          isReadable: _,
          isReadableNodeStream: M,
          isNodeStream: S,
          isTransformStream: j,
          isWebStream: I,
          isReadableStream: A,
          isReadableFinished: R,
        } = e('./utils');
        const T = globalThis.AbortController || e('abort-controller').AbortController;
        let N, O, C;
        function x(e, t, r) {
          let n = !1;
          e.on('close', () => {
            n = !0;
          });
          return {
            destroy: t => {
              n || ((n = !0), l.destroyer(e, t || new m('pipe')));
            },
            cleanup: c(e, { readable: t, writable: r }, e => {
              n = !e;
            }),
          };
        }
        function P(t) {
          if (E(t)) return t;
          if (M(t))
            return (async function* (t) {
              O || (O = e('./readable'));
              yield* O.prototype[s].call(t);
            })(t);
          throw new h('val', ['Readable', 'Iterable', 'AsyncIterable'], t);
        }
        async function k(e, t, r, { end: n }) {
          let i;
          let s = null;
          const a = e => {
            if ((e && (i = e), s)) {
              const e = s;
              (s = null), e();
            }
          };
          const u = () =>
            new o((e, t) => {
              i
                ? t(i)
                : (s = () => {
                    i ? t(i) : e();
                  });
            });
          t.on('drain', a);
          const l = c(t, { readable: !1 }, a);
          try {
            t.writableNeedDrain && (await u());
            for await (const r of e) t.write(r) || (await u());
            n && (t.end(), await u()), r();
          } catch (e) {
            r(i !== e ? f(i, e) : e);
          } finally {
            l(), t.off('drain', a);
          }
        }
        async function D(e, t, r, { end: n }) {
          j(t) && (t = t.writable);
          const i = t.getWriter();
          try {
            for await (const t of e) await i.ready, i.write(t).catch(() => {});
            await i.ready, n && (await i.close()), r();
          } catch (e) {
            try {
              await i.abort(e), r(e);
            } catch (e) {
              r(e);
            }
          }
        }
        function L(t, r, o) {
          if ((t.length === 1 && i(t[0]) && (t = t[0]), t.length < 2)) throw new g('streams');
          const s = new T();
          const c = s.signal;
          const u = o == null ? void 0 : o.signal;
          const l = [];
          function f() {
            z(new b());
          }
          let m, y, w;
          v(u, 'options.signal'),
            (C = C || e('../../ours/util').addAbortListener),
            u && (m = C(u, f));
          const R = [];
          let O;
          let L = 0;
          function U(e) {
            z(e, --L == 0);
          }
          function z(e, t) {
            let i;
            if ((!e || (y && y.code !== 'ERR_STREAM_PREMATURE_CLOSE') || (y = e), y || t)) {
              for (; R.length; ) R.shift()(y);
              (i = m) === null || void 0 === i || i[a](),
                s.abort(),
                t && (y || l.forEach(e => e()), n.nextTick(r, y, w));
            }
          }
          for (let G = 0; G < t.length; G++) {
            const V = t[G];
            const H = G < t.length - 1;
            const J = G > 0;
            const q = H || !1 !== (o == null ? void 0 : o.end);
            const Y = G === t.length - 1;
            if (S(V)) {
              if (q) {
                const { destroy: X, cleanup: Q } = x(V, H, J);
                R.push(X), _(V) && Y && l.push(Q);
              }
              function B(e) {
                e && e.name !== 'AbortError' && e.code !== 'ERR_STREAM_PREMATURE_CLOSE' && U(e);
              }
              V.on('error', B),
                _(V) &&
                  Y &&
                  l.push(() => {
                    V.removeListener('error', B);
                  });
            }
            if (G === 0)
              if (typeof V === 'function') {
                if (((O = V({ signal: c })), !E(O)))
                  throw new p('Iterable, AsyncIterable or Stream', 'source', O);
              } else O = E(V) || M(V) || j(V) ? V : d.from(V);
            else if (typeof V === 'function') {
              var W;
              if (j(O)) O = P((W = O) === null || void 0 === W ? void 0 : W.readable);
              else O = P(O);
              if (((O = V(O, { signal: c })), H)) {
                if (!E(O, !0)) throw new p('AsyncIterable', `transform[${G - 1}]`, O);
              } else {
                var F;
                N || (N = e('./passthrough'));
                const Z = new N({ objectMode: !0 });
                const K = (F = O) === null || void 0 === F ? void 0 : F.then;
                if (typeof K === 'function')
                  L++,
                    K.call(
                      O,
                      e => {
                        (w = e), e != null && Z.write(e), q && Z.end(), n.nextTick(U);
                      },
                      e => {
                        Z.destroy(e), n.nextTick(U, e);
                      }
                    );
                else if (E(O, !0)) L++, k(O, Z, U, { end: q });
                else {
                  if (!A(O) && !j(O)) throw new p('AsyncIterable or Promise', 'destination', O);
                  {
                    const re = O.readable || O;
                    L++, k(re, Z, U, { end: q });
                  }
                }
                O = Z;
                const { destroy: ee, cleanup: te } = x(O, !1, !0);
                R.push(ee), Y && l.push(te);
              }
            } else if (S(V)) {
              if (M(O)) {
                L += 2;
                const ne = $(O, V, U, { end: q });
                _(V) && Y && l.push(ne);
              } else if (j(O) || A(O)) {
                const ie = O.readable || O;
                L++, k(ie, V, U, { end: q });
              } else {
                if (!E(O))
                  throw new h(
                    'val',
                    ['Readable', 'Iterable', 'AsyncIterable', 'ReadableStream', 'TransformStream'],
                    O
                  );
                L++, k(O, V, U, { end: q });
              }
              O = V;
            } else if (I(V)) {
              if (M(O)) L++, D(P(O), V, U, { end: q });
              else if (A(O) || E(O)) L++, D(O, V, U, { end: q });
              else {
                if (!j(O))
                  throw new h(
                    'val',
                    ['Readable', 'Iterable', 'AsyncIterable', 'ReadableStream', 'TransformStream'],
                    O
                  );
                L++, D(O.readable, V, U, { end: q });
              }
              O = V;
            } else O = d.from(V);
          }
          return ((c != null && c.aborted) || (u != null && u.aborted)) && n.nextTick(f), O;
        }
        function $(e, t, r, { end: i }) {
          let o = !1;
          if (
            (t.on('close', () => {
              o || r(new y());
            }),
            e.pipe(t, { end: !1 }),
            i)
          ) {
            function s() {
              (o = !0), t.end();
            }
            R(e) ? n.nextTick(s) : e.once('end', s);
          } else r();
          return (
            c(e, { readable: !0, writable: !1 }, t => {
              const n = e._readableState;
              t &&
              t.code === 'ERR_STREAM_PREMATURE_CLOSE' &&
              n &&
              n.ended &&
              !n.errored &&
              !n.errorEmitted
                ? e.once('end', r).once('error', r)
                : r(t);
            }),
            c(t, { readable: !1, writable: !0 }, r)
          );
        }
        t.exports = {
          pipelineImpl: L,
          pipeline: function (...e) {
            return L(
              e,
              u(
                (function (e) {
                  return w(e[e.length - 1], 'streams[stream.length - 1]'), e.pop();
                })(e)
              )
            );
          },
        };
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        '../../ours/util': 67,
        '../validators': 63,
        './destroy': 49,
        './duplex': 50,
        './end-of-stream': 52,
        './passthrough': 56,
        './readable': 58,
        './utils': 61,
        'abort-controller': 129,
        'process/': 150,
      },
    ],
    58: [
      function (e, t, r) {
        'use strict';
        const n = e('process/');
        const {
          ArrayPrototypeIndexOf: i,
          NumberIsInteger: o,
          NumberIsNaN: s,
          NumberParseInt: a,
          ObjectDefineProperties: c,
          ObjectKeys: u,
          ObjectSetPrototypeOf: l,
          Promise: d,
          SafeSet: f,
          SymbolAsyncDispose: h,
          SymbolAsyncIterator: p,
          Symbol: g,
        } = e('../../ours/primordials');
        (t.exports = Y), (Y.ReadableState = q);
        const { EventEmitter: m } = e('events');
        const { Stream: y, prependListener: b } = e('./legacy');
        const { Buffer: w } = e('buffer');
        const { addAbortSignal: v } = e('./add-abort-signal');
        const E = e('./end-of-stream');
        let _ = e('../../ours/util').debuglog('stream', e => {
          _ = e;
        });
        const M = e('./buffer_list');
        const S = e('./destroy');
        const { getHighWaterMark: j, getDefaultHighWaterMark: I } = e('./state');
        const {
          aggregateTwoErrors: A,
          codes: {
            ERR_INVALID_ARG_TYPE: R,
            ERR_METHOD_NOT_IMPLEMENTED: T,
            ERR_OUT_OF_RANGE: N,
            ERR_STREAM_PUSH_AFTER_EOF: O,
            ERR_STREAM_UNSHIFT_AFTER_END_EVENT: C,
          },
          AbortError: x,
        } = e('../../ours/errors');
        const { validateObject: P } = e('../validators');
        const k = g('kPaused');
        const { StringDecoder: D } = e('string_decoder/');
        const L = e('./from');
        l(Y.prototype, y.prototype), l(Y, y);
        const $ = () => {};
        const { errorOrDestroy: U } = S;
        const z = 1;
        const B = 16;
        const W = 32;
        const F = 64;
        const G = 2048;
        const V = 4096;
        const H = 65536;
        function J(e) {
          return {
            enumerable: !1,
            get() {
              return !!(this.state & e);
            },
            set(t) {
              t ? (this.state |= e) : (this.state &= ~e);
            },
          };
        }
        function q(t, r, n) {
          typeof n !== 'boolean' && (n = r instanceof e('./duplex')),
            (this.state = G | V | B | W),
            t && t.objectMode && (this.state |= z),
            n && t && t.readableObjectMode && (this.state |= z),
            (this.highWaterMark = t ? j(this, t, 'readableHighWaterMark', n) : I(!1)),
            (this.buffer = new M()),
            (this.length = 0),
            (this.pipes = []),
            (this.flowing = null),
            (this[k] = null),
            t && !1 === t.emitClose && (this.state &= ~G),
            t && !1 === t.autoDestroy && (this.state &= ~V),
            (this.errored = null),
            (this.defaultEncoding = (t && t.defaultEncoding) || 'utf8'),
            (this.awaitDrainWriters = null),
            (this.decoder = null),
            (this.encoding = null),
            t && t.encoding && ((this.decoder = new D(t.encoding)), (this.encoding = t.encoding));
        }
        function Y(t) {
          if (!(this instanceof Y)) return new Y(t);
          const r = this instanceof e('./duplex');
          (this._readableState = new q(t, this, r)),
            t &&
              (typeof t.read === 'function' && (this._read = t.read),
              typeof t.destroy === 'function' && (this._destroy = t.destroy),
              typeof t.construct === 'function' && (this._construct = t.construct),
              t.signal && !r && v(t.signal, this)),
            y.call(this, t),
            S.construct(this, () => {
              this._readableState.needReadable && te(this, this._readableState);
            });
        }
        function X(e, t, r, n) {
          _('readableAddChunk', t);
          const i = e._readableState;
          let o;
          if (
            (i.state & z ||
              (typeof t === 'string'
                ? ((r = r || i.defaultEncoding),
                  i.encoding !== r &&
                    (n && i.encoding
                      ? (t = w.from(t, r).toString(i.encoding))
                      : ((t = w.from(t, r)), (r = ''))))
                : t instanceof w
                  ? (r = '')
                  : y._isUint8Array(t)
                    ? ((t = y._uint8ArrayToBuffer(t)), (r = ''))
                    : t != null && (o = new R('chunk', ['string', 'Buffer', 'Uint8Array'], t))),
            o)
          )
            U(e, o);
          else if (t === null)
            (i.state &= -9),
              (function (e, t) {
                if ((_('onEofChunk'), t.ended)) return;
                if (t.decoder) {
                  const e = t.decoder.end();
                  e && e.length && (t.buffer.push(e), (t.length += t.objectMode ? 1 : e.length));
                }
                (t.ended = !0),
                  t.sync ? K(e) : ((t.needReadable = !1), (t.emittedReadable = !0), ee(e));
              })(e, i);
          else if (i.state & z || (t && t.length > 0))
            if (n)
              if (4 & i.state) U(e, new C());
              else {
                if (i.destroyed || i.errored) return !1;
                Q(e, i, t, !0);
              }
            else if (i.ended) U(e, new O());
            else {
              if (i.destroyed || i.errored) return !1;
              (i.state &= -9),
                i.decoder && !r
                  ? ((t = i.decoder.write(t)),
                    i.objectMode || t.length !== 0 ? Q(e, i, t, !1) : te(e, i))
                  : Q(e, i, t, !1);
            }
          else n || ((i.state &= -9), te(e, i));
          return !i.ended && (i.length < i.highWaterMark || i.length === 0);
        }
        function Q(e, t, r, n) {
          t.flowing && t.length === 0 && !t.sync && e.listenerCount('data') > 0
            ? (t.state & H ? t.awaitDrainWriters.clear() : (t.awaitDrainWriters = null),
              (t.dataEmitted = !0),
              e.emit('data', r))
            : ((t.length += t.objectMode ? 1 : r.length),
              n ? t.buffer.unshift(r) : t.buffer.push(r),
              t.state & F && K(e)),
            te(e, t);
        }
        c(q.prototype, {
          objectMode: J(z),
          ended: J(2),
          endEmitted: J(4),
          reading: J(8),
          constructed: J(B),
          sync: J(W),
          needReadable: J(F),
          emittedReadable: J(128),
          readableListening: J(256),
          resumeScheduled: J(512),
          errorEmitted: J(1024),
          emitClose: J(G),
          autoDestroy: J(V),
          destroyed: J(8192),
          closed: J(16384),
          closeEmitted: J(32768),
          multiAwaitDrain: J(H),
          readingMore: J(1 << 17),
          dataEmitted: J(1 << 18),
        }),
          (Y.prototype.destroy = S.destroy),
          (Y.prototype._undestroy = S.undestroy),
          (Y.prototype._destroy = function (e, t) {
            t(e);
          }),
          (Y.prototype[m.captureRejectionSymbol] = function (e) {
            this.destroy(e);
          }),
          (Y.prototype[h] = function () {
            let e;
            return (
              this.destroyed || ((e = this.readableEnded ? null : new x()), this.destroy(e)),
              new d((t, r) => E(this, n => (n && n !== e ? r(n) : t(null))))
            );
          }),
          (Y.prototype.push = function (e, t) {
            return X(this, e, t, !1);
          }),
          (Y.prototype.unshift = function (e, t) {
            return X(this, e, t, !0);
          }),
          (Y.prototype.isPaused = function () {
            const e = this._readableState;
            return !0 === e[k] || !1 === e.flowing;
          }),
          (Y.prototype.setEncoding = function (e) {
            const t = new D(e);
            (this._readableState.decoder = t),
              (this._readableState.encoding = this._readableState.decoder.encoding);
            const r = this._readableState.buffer;
            let n = '';
            for (const e of r) n += t.write(e);
            return r.clear(), n !== '' && r.push(n), (this._readableState.length = n.length), this;
          });
        function Z(e, t) {
          return e <= 0 || (t.length === 0 && t.ended)
            ? 0
            : t.state & z
              ? 1
              : s(e)
                ? t.flowing && t.length
                  ? t.buffer.first().length
                  : t.length
                : e <= t.length
                  ? e
                  : t.ended
                    ? t.length
                    : 0;
        }
        function K(e) {
          const t = e._readableState;
          _('emitReadable', t.needReadable, t.emittedReadable),
            (t.needReadable = !1),
            t.emittedReadable ||
              (_('emitReadable', t.flowing), (t.emittedReadable = !0), n.nextTick(ee, e));
        }
        function ee(e) {
          const t = e._readableState;
          _('emitReadable_', t.destroyed, t.length, t.ended),
            t.destroyed ||
              t.errored ||
              (!t.length && !t.ended) ||
              (e.emit('readable'), (t.emittedReadable = !1)),
            (t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark),
            se(e);
        }
        function te(e, t) {
          !t.readingMore && t.constructed && ((t.readingMore = !0), n.nextTick(re, e, t));
        }
        function re(e, t) {
          for (
            ;
            !t.reading && !t.ended && (t.length < t.highWaterMark || (t.flowing && t.length === 0));

          ) {
            const r = t.length;
            if ((_('maybeReadMore read 0'), e.read(0), r === t.length)) break;
          }
          t.readingMore = !1;
        }
        function ne(e) {
          const t = e._readableState;
          (t.readableListening = e.listenerCount('readable') > 0),
            t.resumeScheduled && !1 === t[k]
              ? (t.flowing = !0)
              : e.listenerCount('data') > 0
                ? e.resume()
                : t.readableListening || (t.flowing = null);
        }
        function ie(e) {
          _('readable nexttick read 0'), e.read(0);
        }
        function oe(e, t) {
          _('resume', t.reading),
            t.reading || e.read(0),
            (t.resumeScheduled = !1),
            e.emit('resume'),
            se(e),
            t.flowing && !t.reading && e.read(0);
        }
        function se(e) {
          const t = e._readableState;
          for (_('flow', t.flowing); t.flowing && e.read() !== null; );
        }
        function ae(e, t) {
          typeof e.read !== 'function' && (e = Y.wrap(e, { objectMode: !0 }));
          const r = (async function* (e, t) {
            let r;
            let n = $;
            function i(t) {
              this === e ? (n(), (n = $)) : (n = t);
            }
            e.on('readable', i);
            const o = E(e, { writable: !1 }, e => {
              (r = e ? A(r, e) : null), n(), (n = $);
            });
            try {
              for (;;) {
                const t = e.destroyed ? null : e.read();
                if (t !== null) yield t;
                else {
                  if (r) throw r;
                  if (r === null) return;
                  await new d(i);
                }
              }
            } catch (e) {
              throw ((r = A(r, e)), r);
            } finally {
              (!r && !1 === (t == null ? void 0 : t.destroyOnReturn)) ||
              (void 0 !== r && !e._readableState.autoDestroy)
                ? (e.off('readable', i), o())
                : S.destroyer(e, null);
            }
          })(e, t);
          return (r.stream = e), r;
        }
        function ce(e, t) {
          if (t.length === 0) return null;
          let r;
          return (
            t.objectMode
              ? (r = t.buffer.shift())
              : !e || e >= t.length
                ? ((r = t.decoder
                    ? t.buffer.join('')
                    : t.buffer.length === 1
                      ? t.buffer.first()
                      : t.buffer.concat(t.length)),
                  t.buffer.clear())
                : (r = t.buffer.consume(e, t.decoder)),
            r
          );
        }
        function ue(e) {
          const t = e._readableState;
          _('endReadable', t.endEmitted), t.endEmitted || ((t.ended = !0), n.nextTick(le, t, e));
        }
        function le(e, t) {
          if (
            (_('endReadableNT', e.endEmitted, e.length),
            !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0)
          )
            if (((e.endEmitted = !0), t.emit('end'), t.writable && !1 === t.allowHalfOpen))
              n.nextTick(de, t);
            else if (e.autoDestroy) {
              const e = t._writableState;
              (!e || (e.autoDestroy && (e.finished || !1 === e.writable))) && t.destroy();
            }
        }
        function de(e) {
          e.writable && !e.writableEnded && !e.destroyed && e.end();
        }
        let fe;
        function he() {
          return void 0 === fe && (fe = {}), fe;
        }
        (Y.prototype.read = function (e) {
          _('read', e), void 0 === e ? (e = NaN) : o(e) || (e = a(e, 10));
          const t = this._readableState;
          const r = e;
          if (
            (e > t.highWaterMark &&
              (t.highWaterMark = (function (e) {
                if (e > 1073741824) throw new N('size', '<= 1GiB', e);
                return (
                  e--,
                  (e |= e >>> 1),
                  (e |= e >>> 2),
                  (e |= e >>> 4),
                  (e |= e >>> 8),
                  (e |= e >>> 16),
                  ++e
                );
              })(e)),
            e !== 0 && (t.state &= -129),
            e === 0 &&
              t.needReadable &&
              ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
          )
            return (
              _('read: emitReadable', t.length, t.ended),
              t.length === 0 && t.ended ? ue(this) : K(this),
              null
            );
          if ((e = Z(e, t)) === 0 && t.ended) return t.length === 0 && ue(this), null;
          let n;
          let i = !!(t.state & F);
          if (
            (_('need readable', i),
            (t.length === 0 || t.length - e < t.highWaterMark) &&
              ((i = !0), _('length less than watermark', i)),
            t.ended || t.reading || t.destroyed || t.errored || !t.constructed)
          )
            (i = !1), _('reading, ended or constructing', i);
          else if (i) {
            _('do read'), (t.state |= 8 | W), t.length === 0 && (t.state |= F);
            try {
              this._read(t.highWaterMark);
            } catch (e) {
              U(this, e);
            }
            (t.state &= ~W), t.reading || (e = Z(r, t));
          }
          return (
            (n = e > 0 ? ce(e, t) : null),
            n === null
              ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
              : ((t.length -= e),
                t.multiAwaitDrain ? t.awaitDrainWriters.clear() : (t.awaitDrainWriters = null)),
            t.length === 0 && (t.ended || (t.needReadable = !0), r !== e && t.ended && ue(this)),
            n === null ||
              t.errorEmitted ||
              t.closeEmitted ||
              ((t.dataEmitted = !0), this.emit('data', n)),
            n
          );
        }),
          (Y.prototype._read = function (e) {
            throw new T('_read()');
          }),
          (Y.prototype.pipe = function (e, t) {
            const r = this;
            const i = this._readableState;
            i.pipes.length === 1 &&
              (i.multiAwaitDrain ||
                ((i.multiAwaitDrain = !0),
                (i.awaitDrainWriters = new f(i.awaitDrainWriters ? [i.awaitDrainWriters] : [])))),
              i.pipes.push(e),
              _('pipe count=%d opts=%j', i.pipes.length, t);
            const o = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr ? a : m;
            function s(t, n) {
              _('onunpipe'),
                t === r &&
                  n &&
                  !1 === n.hasUnpiped &&
                  ((n.hasUnpiped = !0),
                  (function () {
                    _('cleanup'),
                      e.removeListener('close', p),
                      e.removeListener('finish', g),
                      c && e.removeListener('drain', c);
                    e.removeListener('error', h),
                      e.removeListener('unpipe', s),
                      r.removeListener('end', a),
                      r.removeListener('end', m),
                      r.removeListener('data', d),
                      (u = !0),
                      c &&
                        i.awaitDrainWriters &&
                        (!e._writableState || e._writableState.needDrain) &&
                        c();
                  })());
            }
            function a() {
              _('onend'), e.end();
            }
            let c;
            i.endEmitted ? n.nextTick(o) : r.once('end', o), e.on('unpipe', s);
            let u = !1;
            function l() {
              u ||
                (i.pipes.length === 1 && i.pipes[0] === e
                  ? (_('false write response, pause', 0),
                    (i.awaitDrainWriters = e),
                    (i.multiAwaitDrain = !1))
                  : i.pipes.length > 1 &&
                    i.pipes.includes(e) &&
                    (_('false write response, pause', i.awaitDrainWriters.size),
                    i.awaitDrainWriters.add(e)),
                r.pause()),
                c ||
                  ((c = (function (e, t) {
                    return function () {
                      const r = e._readableState;
                      r.awaitDrainWriters === t
                        ? (_('pipeOnDrain', 1), (r.awaitDrainWriters = null))
                        : r.multiAwaitDrain &&
                          (_('pipeOnDrain', r.awaitDrainWriters.size),
                          r.awaitDrainWriters.delete(t)),
                        (r.awaitDrainWriters && r.awaitDrainWriters.size !== 0) ||
                          !e.listenerCount('data') ||
                          e.resume();
                    };
                  })(r, e)),
                  e.on('drain', c));
            }
            function d(t) {
              _('ondata');
              const r = e.write(t);
              _('dest.write', r), !1 === r && l();
            }
            function h(t) {
              if (
                (_('onerror', t), m(), e.removeListener('error', h), e.listenerCount('error') === 0)
              ) {
                const r = e._writableState || e._readableState;
                r && !r.errorEmitted ? U(e, t) : e.emit('error', t);
              }
            }
            function p() {
              e.removeListener('finish', g), m();
            }
            function g() {
              _('onfinish'), e.removeListener('close', p), m();
            }
            function m() {
              _('unpipe'), r.unpipe(e);
            }
            return (
              r.on('data', d),
              b(e, 'error', h),
              e.once('close', p),
              e.once('finish', g),
              e.emit('pipe', r),
              !0 === e.writableNeedDrain ? l() : i.flowing || (_('pipe resume'), r.resume()),
              e
            );
          }),
          (Y.prototype.unpipe = function (e) {
            const t = this._readableState;
            if (t.pipes.length === 0) return this;
            if (!e) {
              const e = t.pipes;
              (t.pipes = []), this.pause();
              for (let t = 0; t < e.length; t++) e[t].emit('unpipe', this, { hasUnpiped: !1 });
              return this;
            }
            const r = i(t.pipes, e);
            return (
              r === -1 ||
                (t.pipes.splice(r, 1),
                t.pipes.length === 0 && this.pause(),
                e.emit('unpipe', this, { hasUnpiped: !1 })),
              this
            );
          }),
          (Y.prototype.on = function (e, t) {
            const r = y.prototype.on.call(this, e, t);
            const i = this._readableState;
            return (
              e === 'data'
                ? ((i.readableListening = this.listenerCount('readable') > 0),
                  !1 !== i.flowing && this.resume())
                : e === 'readable' &&
                  (i.endEmitted ||
                    i.readableListening ||
                    ((i.readableListening = i.needReadable = !0),
                    (i.flowing = !1),
                    (i.emittedReadable = !1),
                    _('on readable', i.length, i.reading),
                    i.length ? K(this) : i.reading || n.nextTick(ie, this))),
              r
            );
          }),
          (Y.prototype.addListener = Y.prototype.on),
          (Y.prototype.removeListener = function (e, t) {
            const r = y.prototype.removeListener.call(this, e, t);
            return e === 'readable' && n.nextTick(ne, this), r;
          }),
          (Y.prototype.off = Y.prototype.removeListener),
          (Y.prototype.removeAllListeners = function (e) {
            const t = y.prototype.removeAllListeners.apply(this, arguments);
            return (e !== 'readable' && void 0 !== e) || n.nextTick(ne, this), t;
          }),
          (Y.prototype.resume = function () {
            const e = this._readableState;
            return (
              e.flowing ||
                (_('resume'),
                (e.flowing = !e.readableListening),
                (function (e, t) {
                  t.resumeScheduled || ((t.resumeScheduled = !0), n.nextTick(oe, e, t));
                })(this, e)),
              (e[k] = !1),
              this
            );
          }),
          (Y.prototype.pause = function () {
            return (
              _('call pause flowing=%j', this._readableState.flowing),
              !1 !== this._readableState.flowing &&
                (_('pause'), (this._readableState.flowing = !1), this.emit('pause')),
              (this._readableState[k] = !0),
              this
            );
          }),
          (Y.prototype.wrap = function (e) {
            let t = !1;
            e.on('data', r => {
              !this.push(r) && e.pause && ((t = !0), e.pause());
            }),
              e.on('end', () => {
                this.push(null);
              }),
              e.on('error', e => {
                U(this, e);
              }),
              e.on('close', () => {
                this.destroy();
              }),
              e.on('destroy', () => {
                this.destroy();
              }),
              (this._read = () => {
                t && e.resume && ((t = !1), e.resume());
              });
            const r = u(e);
            for (let t = 1; t < r.length; t++) {
              const n = r[t];
              void 0 === this[n] && typeof e[n] === 'function' && (this[n] = e[n].bind(e));
            }
            return this;
          }),
          (Y.prototype[p] = function () {
            return ae(this);
          }),
          (Y.prototype.iterator = function (e) {
            return void 0 !== e && P(e, 'options'), ae(this, e);
          }),
          c(Y.prototype, {
            readable: {
              __proto__: null,
              get() {
                const e = this._readableState;
                return !(!e || !1 === e.readable || e.destroyed || e.errorEmitted || e.endEmitted);
              },
              set(e) {
                this._readableState && (this._readableState.readable = !!e);
              },
            },
            readableDidRead: {
              __proto__: null,
              enumerable: !1,
              get: function () {
                return this._readableState.dataEmitted;
              },
            },
            readableAborted: {
              __proto__: null,
              enumerable: !1,
              get: function () {
                return !(
                  !1 === this._readableState.readable ||
                  (!this._readableState.destroyed && !this._readableState.errored) ||
                  this._readableState.endEmitted
                );
              },
            },
            readableHighWaterMark: {
              __proto__: null,
              enumerable: !1,
              get: function () {
                return this._readableState.highWaterMark;
              },
            },
            readableBuffer: {
              __proto__: null,
              enumerable: !1,
              get: function () {
                return this._readableState && this._readableState.buffer;
              },
            },
            readableFlowing: {
              __proto__: null,
              enumerable: !1,
              get: function () {
                return this._readableState.flowing;
              },
              set: function (e) {
                this._readableState && (this._readableState.flowing = e);
              },
            },
            readableLength: {
              __proto__: null,
              enumerable: !1,
              get() {
                return this._readableState.length;
              },
            },
            readableObjectMode: {
              __proto__: null,
              enumerable: !1,
              get() {
                return !!this._readableState && this._readableState.objectMode;
              },
            },
            readableEncoding: {
              __proto__: null,
              enumerable: !1,
              get() {
                return this._readableState ? this._readableState.encoding : null;
              },
            },
            errored: {
              __proto__: null,
              enumerable: !1,
              get() {
                return this._readableState ? this._readableState.errored : null;
              },
            },
            closed: {
              __proto__: null,
              get() {
                return !!this._readableState && this._readableState.closed;
              },
            },
            destroyed: {
              __proto__: null,
              enumerable: !1,
              get() {
                return !!this._readableState && this._readableState.destroyed;
              },
              set(e) {
                this._readableState && (this._readableState.destroyed = e);
              },
            },
            readableEnded: {
              __proto__: null,
              enumerable: !1,
              get() {
                return !!this._readableState && this._readableState.endEmitted;
              },
            },
          }),
          c(q.prototype, {
            pipesCount: {
              __proto__: null,
              get() {
                return this.pipes.length;
              },
            },
            paused: {
              __proto__: null,
              get() {
                return !1 !== this[k];
              },
              set(e) {
                this[k] = !!e;
              },
            },
          }),
          (Y._fromList = ce),
          (Y.from = function (e, t) {
            return L(Y, e, t);
          }),
          (Y.fromWeb = function (e, t) {
            return he().newStreamReadableFromReadableStream(e, t);
          }),
          (Y.toWeb = function (e, t) {
            return he().newReadableStreamFromStreamReadable(e, t);
          }),
          (Y.wrap = function (e, t) {
            let r, n;
            return new Y({
              objectMode:
                (r = (n = e.readableObjectMode) !== null && void 0 !== n ? n : e.objectMode) ===
                  null ||
                void 0 === r ||
                r,
              ...t,
              destroy(t, r) {
                S.destroyer(e, t), r(t);
              },
            }).wrap(e);
          });
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        '../../ours/util': 67,
        '../validators': 63,
        './add-abort-signal': 46,
        './buffer_list': 47,
        './destroy': 49,
        './duplex': 50,
        './end-of-stream': 52,
        './from': 53,
        './legacy': 54,
        './state': 59,
        buffer: 132,
        events: 138,
        'process/': 150,
        'string_decoder/': 212,
      },
    ],
    59: [
      function (e, t, r) {
        'use strict';
        const { MathFloor: n, NumberIsInteger: i } = e('../../ours/primordials');
        const { validateInteger: o } = e('../validators');
        const { ERR_INVALID_ARG_VALUE: s } = e('../../ours/errors').codes;
        let a = 16384;
        let c = 16;
        function u(e) {
          return e ? c : a;
        }
        t.exports = {
          getHighWaterMark: function (e, t, r, o) {
            const a = (function (e, t, r) {
              return e.highWaterMark != null ? e.highWaterMark : t ? e[r] : null;
            })(t, o, r);
            if (a != null) {
              if (!i(a) || a < 0) {
                throw new s(o ? `options.${r}` : 'options.highWaterMark', a);
              }
              return n(a);
            }
            return u(e.objectMode);
          },
          getDefaultHighWaterMark: u,
          setDefaultHighWaterMark: function (e, t) {
            o(t, 'value', 0), e ? (c = t) : (a = t);
          },
        };
      },
      { '../../ours/errors': 65, '../../ours/primordials': 66, '../validators': 63 },
    ],
    60: [
      function (e, t, r) {
        'use strict';
        const { ObjectSetPrototypeOf: n, Symbol: i } = e('../../ours/primordials');
        t.exports = u;
        const { ERR_METHOD_NOT_IMPLEMENTED: o } = e('../../ours/errors').codes;
        const s = e('./duplex');
        const { getHighWaterMark: a } = e('./state');
        n(u.prototype, s.prototype), n(u, s);
        const c = i('kCallback');
        function u(e) {
          if (!(this instanceof u)) return new u(e);
          const t = e ? a(this, e, 'readableHighWaterMark', !0) : null;
          t === 0 &&
            (e = {
              ...e,
              highWaterMark: null,
              readableHighWaterMark: t,
              writableHighWaterMark: e.writableHighWaterMark || 0,
            }),
            s.call(this, e),
            (this._readableState.sync = !1),
            (this[c] = null),
            e &&
              (typeof e.transform === 'function' && (this._transform = e.transform),
              typeof e.flush === 'function' && (this._flush = e.flush)),
            this.on('prefinish', d);
        }
        function l(e) {
          typeof this._flush !== 'function' || this.destroyed
            ? (this.push(null), e && e())
            : this._flush((t, r) => {
                t
                  ? e
                    ? e(t)
                    : this.destroy(t)
                  : (r != null && this.push(r), this.push(null), e && e());
              });
        }
        function d() {
          this._final !== l && l.call(this);
        }
        (u.prototype._final = l),
          (u.prototype._transform = function (e, t, r) {
            throw new o('_transform()');
          }),
          (u.prototype._write = function (e, t, r) {
            const n = this._readableState;
            const i = this._writableState;
            const o = n.length;
            this._transform(e, t, (e, t) => {
              e
                ? r(e)
                : (t != null && this.push(t),
                  i.ended || o === n.length || n.length < n.highWaterMark ? r() : (this[c] = r));
            });
          }),
          (u.prototype._read = function () {
            if (this[c]) {
              const e = this[c];
              (this[c] = null), e();
            }
          });
      },
      { '../../ours/errors': 65, '../../ours/primordials': 66, './duplex': 50, './state': 59 },
    ],
    61: [
      function (e, t, r) {
        'use strict';
        const {
          SymbolAsyncIterator: n,
          SymbolIterator: i,
          SymbolFor: o,
        } = e('../../ours/primordials');
        const s = o('nodejs.stream.destroyed');
        const a = o('nodejs.stream.errored');
        const c = o('nodejs.stream.readable');
        const u = o('nodejs.stream.writable');
        const l = o('nodejs.stream.disturbed');
        const d = o('nodejs.webstream.isClosedPromise');
        const f = o('nodejs.webstream.controllerErrorFunction');
        function h(e, t = !1) {
          let r;
          return !(
            !e ||
            typeof e.pipe !== 'function' ||
            typeof e.on !== 'function' ||
            (t && (typeof e.pause !== 'function' || typeof e.resume !== 'function')) ||
            (e._writableState &&
              !1 === ((r = e._readableState) === null || void 0 === r ? void 0 : r.readable)) ||
            (e._writableState && !e._readableState)
          );
        }
        function p(e) {
          let t;
          return !(
            !e ||
            typeof e.write !== 'function' ||
            typeof e.on !== 'function' ||
            (e._readableState &&
              !1 === ((t = e._writableState) === null || void 0 === t ? void 0 : t.writable))
          );
        }
        function g(e) {
          return (
            e &&
            (e._readableState ||
              e._writableState ||
              (typeof e.write === 'function' && typeof e.on === 'function') ||
              (typeof e.pipe === 'function' && typeof e.on === 'function'))
          );
        }
        function m(e) {
          return !(
            !e ||
            g(e) ||
            typeof e.pipeThrough !== 'function' ||
            typeof e.getReader !== 'function' ||
            typeof e.cancel !== 'function'
          );
        }
        function y(e) {
          return !(
            !e ||
            g(e) ||
            typeof e.getWriter !== 'function' ||
            typeof e.abort !== 'function'
          );
        }
        function b(e) {
          return !(!e || g(e) || typeof e.readable !== 'object' || typeof e.writable !== 'object');
        }
        function w(e) {
          if (!g(e)) return null;
          const t = e._writableState;
          const r = e._readableState;
          const n = t || r;
          return !!(e.destroyed || e[s] || (n != null && n.destroyed));
        }
        function v(e) {
          if (!p(e)) return null;
          if (!0 === e.writableEnded) return !0;
          const t = e._writableState;
          return (
            (t == null || !t.errored) &&
            (typeof (t == null ? void 0 : t.ended) !== 'boolean' ? null : t.ended)
          );
        }
        function E(e, t) {
          if (!h(e)) return null;
          const r = e._readableState;
          return (
            (r == null || !r.errored) &&
            (typeof (r == null ? void 0 : r.endEmitted) !== 'boolean'
              ? null
              : !!(r.endEmitted || (!1 === t && !0 === r.ended && r.length === 0)))
          );
        }
        function _(e) {
          return e && e[c] != null
            ? e[c]
            : typeof (e == null ? void 0 : e.readable) !== 'boolean'
              ? null
              : !w(e) && h(e) && e.readable && !E(e);
        }
        function M(e) {
          return e && e[u] != null
            ? e[u]
            : typeof (e == null ? void 0 : e.writable) !== 'boolean'
              ? null
              : !w(e) && p(e) && e.writable && !v(e);
        }
        function S(e) {
          return (
            typeof e._closed === 'boolean' &&
            typeof e._defaultKeepAlive === 'boolean' &&
            typeof e._removedConnection === 'boolean' &&
            typeof e._removedContLen === 'boolean'
          );
        }
        function j(e) {
          return typeof e._sent100 === 'boolean' && S(e);
        }
        t.exports = {
          isDestroyed: w,
          kIsDestroyed: s,
          isDisturbed: function (e) {
            let t;
            return !(
              !e ||
              !((t = e[l]) !== null && void 0 !== t ? t : e.readableDidRead || e.readableAborted)
            );
          },
          kIsDisturbed: l,
          isErrored: function (e) {
            let t, r, n, i, o, s, c, u, l, d;
            return !(
              !e ||
              !((t =
                (r =
                  (n =
                    (i =
                      (o = (s = e[a]) !== null && void 0 !== s ? s : e.readableErrored) !== null &&
                      void 0 !== o
                        ? o
                        : e.writableErrored) !== null && void 0 !== i
                      ? i
                      : (c = e._readableState) === null || void 0 === c
                        ? void 0
                        : c.errorEmitted) !== null && void 0 !== n
                    ? n
                    : (u = e._writableState) === null || void 0 === u
                      ? void 0
                      : u.errorEmitted) !== null && void 0 !== r
                  ? r
                  : (l = e._readableState) === null || void 0 === l
                    ? void 0
                    : l.errored) !== null && void 0 !== t
                ? t
                : (d = e._writableState) === null || void 0 === d
                  ? void 0
                  : d.errored)
            );
          },
          kIsErrored: a,
          isReadable: _,
          kIsReadable: c,
          kIsClosedPromise: d,
          kControllerErrorFunction: f,
          kIsWritable: u,
          isClosed: function (e) {
            if (!g(e)) return null;
            if (typeof e.closed === 'boolean') return e.closed;
            const t = e._writableState;
            const r = e._readableState;
            return typeof (t == null ? void 0 : t.closed) === 'boolean' ||
              typeof (r == null ? void 0 : r.closed) === 'boolean'
              ? (t == null ? void 0 : t.closed) || (r == null ? void 0 : r.closed)
              : typeof e._closed === 'boolean' && S(e)
                ? e._closed
                : null;
          },
          isDuplexNodeStream: function (e) {
            return !(
              !e ||
              typeof e.pipe !== 'function' ||
              !e._readableState ||
              typeof e.on !== 'function' ||
              typeof e.write !== 'function'
            );
          },
          isFinished: function (e, t) {
            return g(e)
              ? !!w(e) ||
                  ((!1 === (t == null ? void 0 : t.readable) || !_(e)) &&
                    (!1 === (t == null ? void 0 : t.writable) || !M(e)))
              : null;
          },
          isIterable: function (e, t) {
            return (
              e != null &&
              (!0 === t
                ? typeof e[n] === 'function'
                : !1 === t
                  ? typeof e[i] === 'function'
                  : typeof e[n] === 'function' || typeof e[i] === 'function')
            );
          },
          isReadableNodeStream: h,
          isReadableStream: m,
          isReadableEnded: function (e) {
            if (!h(e)) return null;
            if (!0 === e.readableEnded) return !0;
            const t = e._readableState;
            return (
              !(!t || t.errored) &&
              (typeof (t == null ? void 0 : t.ended) !== 'boolean' ? null : t.ended)
            );
          },
          isReadableFinished: E,
          isReadableErrored: function (e) {
            let t, r;
            return g(e)
              ? e.readableErrored
                ? e.readableErrored
                : (t = (r = e._readableState) === null || void 0 === r ? void 0 : r.errored) !==
                      null && void 0 !== t
                  ? t
                  : null
              : null;
          },
          isNodeStream: g,
          isWebStream: function (e) {
            return m(e) || y(e) || b(e);
          },
          isWritable: M,
          isWritableNodeStream: p,
          isWritableStream: y,
          isWritableEnded: v,
          isWritableFinished: function (e, t) {
            if (!p(e)) return null;
            if (!0 === e.writableFinished) return !0;
            const r = e._writableState;
            return (
              (r == null || !r.errored) &&
              (typeof (r == null ? void 0 : r.finished) !== 'boolean'
                ? null
                : !!(r.finished || (!1 === t && !0 === r.ended && r.length === 0)))
            );
          },
          isWritableErrored: function (e) {
            let t, r;
            return g(e)
              ? e.writableErrored
                ? e.writableErrored
                : (t = (r = e._writableState) === null || void 0 === r ? void 0 : r.errored) !==
                      null && void 0 !== t
                  ? t
                  : null
              : null;
          },
          isServerRequest: function (e) {
            let t;
            return (
              typeof e._consuming === 'boolean' &&
              typeof e._dumped === 'boolean' &&
              void 0 === ((t = e.req) === null || void 0 === t ? void 0 : t.upgradeOrConnect)
            );
          },
          isServerResponse: j,
          willEmitClose: function (e) {
            if (!g(e)) return null;
            const t = e._writableState;
            const r = e._readableState;
            const n = t || r;
            return (!n && j(e)) || !!(n && n.autoDestroy && n.emitClose && !1 === n.closed);
          },
          isTransformStream: b,
        };
      },
      { '../../ours/primordials': 66 },
    ],
    62: [
      function (e, t, r) {
        'use strict';
        const n = e('process/');
        const {
          ArrayPrototypeSlice: i,
          Error: o,
          FunctionPrototypeSymbolHasInstance: s,
          ObjectDefineProperty: a,
          ObjectDefineProperties: c,
          ObjectSetPrototypeOf: u,
          StringPrototypeToLowerCase: l,
          Symbol: d,
          SymbolHasInstance: f,
        } = e('../../ours/primordials');
        (t.exports = P), (P.WritableState = C);
        const { EventEmitter: h } = e('events');
        const p = e('./legacy').Stream;
        const { Buffer: g } = e('buffer');
        const m = e('./destroy');
        const { addAbortSignal: y } = e('./add-abort-signal');
        const { getHighWaterMark: b, getDefaultHighWaterMark: w } = e('./state');
        const {
          ERR_INVALID_ARG_TYPE: v,
          ERR_METHOD_NOT_IMPLEMENTED: E,
          ERR_MULTIPLE_CALLBACK: _,
          ERR_STREAM_CANNOT_PIPE: M,
          ERR_STREAM_DESTROYED: S,
          ERR_STREAM_ALREADY_FINISHED: j,
          ERR_STREAM_NULL_VALUES: I,
          ERR_STREAM_WRITE_AFTER_END: A,
          ERR_UNKNOWN_ENCODING: R,
        } = e('../../ours/errors').codes;
        const { errorOrDestroy: T } = m;
        function N() {}
        u(P.prototype, p.prototype), u(P, p);
        const O = d('kOnFinished');
        function C(t, r, n) {
          typeof n !== 'boolean' && (n = r instanceof e('./duplex')),
            (this.objectMode = !(!t || !t.objectMode)),
            n && (this.objectMode = this.objectMode || !(!t || !t.writableObjectMode)),
            (this.highWaterMark = t ? b(this, t, 'writableHighWaterMark', n) : w(!1)),
            (this.finalCalled = !1),
            (this.needDrain = !1),
            (this.ending = !1),
            (this.ended = !1),
            (this.finished = !1),
            (this.destroyed = !1);
          const i = !(!t || !1 !== t.decodeStrings);
          (this.decodeStrings = !i),
            (this.defaultEncoding = (t && t.defaultEncoding) || 'utf8'),
            (this.length = 0),
            (this.writing = !1),
            (this.corked = 0),
            (this.sync = !0),
            (this.bufferProcessing = !1),
            (this.onwrite = $.bind(void 0, r)),
            (this.writecb = null),
            (this.writelen = 0),
            (this.afterWriteTickInfo = null),
            x(this),
            (this.pendingcb = 0),
            (this.constructed = !0),
            (this.prefinished = !1),
            (this.errorEmitted = !1),
            (this.emitClose = !t || !1 !== t.emitClose),
            (this.autoDestroy = !t || !1 !== t.autoDestroy),
            (this.errored = null),
            (this.closed = !1),
            (this.closeEmitted = !1),
            (this[O] = []);
        }
        function x(e) {
          (e.buffered = []), (e.bufferedIndex = 0), (e.allBuffers = !0), (e.allNoop = !0);
        }
        function P(t) {
          const r = this instanceof e('./duplex');
          if (!r && !s(P, this)) return new P(t);
          (this._writableState = new C(t, this, r)),
            t &&
              (typeof t.write === 'function' && (this._write = t.write),
              typeof t.writev === 'function' && (this._writev = t.writev),
              typeof t.destroy === 'function' && (this._destroy = t.destroy),
              typeof t.final === 'function' && (this._final = t.final),
              typeof t.construct === 'function' && (this._construct = t.construct),
              t.signal && y(t.signal, this)),
            p.call(this, t),
            m.construct(this, () => {
              const e = this._writableState;
              e.writing || W(this, e), V(this, e);
            });
        }
        function k(e, t, r, i) {
          const o = e._writableState;
          if (typeof r === 'function') (i = r), (r = o.defaultEncoding);
          else {
            if (r) {
              if (r !== 'buffer' && !g.isEncoding(r)) throw new R(r);
            } else r = o.defaultEncoding;
            typeof i !== 'function' && (i = N);
          }
          if (t === null) throw new I();
          if (!o.objectMode)
            if (typeof t === 'string')
              !1 !== o.decodeStrings && ((t = g.from(t, r)), (r = 'buffer'));
            else if (t instanceof g) r = 'buffer';
            else {
              if (!p._isUint8Array(t)) throw new v('chunk', ['string', 'Buffer', 'Uint8Array'], t);
              (t = p._uint8ArrayToBuffer(t)), (r = 'buffer');
            }
          let s;
          return (
            o.ending ? (s = new A()) : o.destroyed && (s = new S('write')),
            s
              ? (n.nextTick(i, s), T(e, s, !0), s)
              : (o.pendingcb++,
                (function (e, t, r, n, i) {
                  const o = t.objectMode ? 1 : r.length;
                  t.length += o;
                  const s = t.length < t.highWaterMark;
                  s || (t.needDrain = !0);
                  t.writing || t.corked || t.errored || !t.constructed
                    ? (t.buffered.push({ chunk: r, encoding: n, callback: i }),
                      t.allBuffers && n !== 'buffer' && (t.allBuffers = !1),
                      t.allNoop && i !== N && (t.allNoop = !1))
                    : ((t.writelen = o),
                      (t.writecb = i),
                      (t.writing = !0),
                      (t.sync = !0),
                      e._write(r, n, t.onwrite),
                      (t.sync = !1));
                  return s && !t.errored && !t.destroyed;
                })(e, o, t, r, i))
          );
        }
        function D(e, t, r, n, i, o, s) {
          (t.writelen = n),
            (t.writecb = s),
            (t.writing = !0),
            (t.sync = !0),
            t.destroyed
              ? t.onwrite(new S('write'))
              : r
                ? e._writev(i, t.onwrite)
                : e._write(i, o, t.onwrite),
            (t.sync = !1);
        }
        function L(e, t, r, n) {
          --t.pendingcb, n(r), B(t), T(e, r);
        }
        function $(e, t) {
          const r = e._writableState;
          const i = r.sync;
          const o = r.writecb;
          typeof o === 'function'
            ? ((r.writing = !1),
              (r.writecb = null),
              (r.length -= r.writelen),
              (r.writelen = 0),
              t
                ? (t.stack,
                  r.errored || (r.errored = t),
                  e._readableState && !e._readableState.errored && (e._readableState.errored = t),
                  i ? n.nextTick(L, e, r, t, o) : L(e, r, t, o))
                : (r.buffered.length > r.bufferedIndex && W(e, r),
                  i
                    ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === o
                      ? r.afterWriteTickInfo.count++
                      : ((r.afterWriteTickInfo = { count: 1, cb: o, stream: e, state: r }),
                        n.nextTick(U, r.afterWriteTickInfo))
                    : z(e, r, 1, o)))
            : T(e, new _());
        }
        function U({ stream: e, state: t, count: r, cb: n }) {
          return (t.afterWriteTickInfo = null), z(e, t, r, n);
        }
        function z(e, t, r, n) {
          for (
            !t.ending &&
            !e.destroyed &&
            t.length === 0 &&
            t.needDrain &&
            ((t.needDrain = !1), e.emit('drain'));
            r-- > 0;

          )
            t.pendingcb--, n();
          t.destroyed && B(t), V(e, t);
        }
        function B(e) {
          if (e.writing) return;
          for (let r = e.bufferedIndex; r < e.buffered.length; ++r) {
            var t;
            const { chunk: n, callback: i } = e.buffered[r];
            const o = e.objectMode ? 1 : n.length;
            (e.length -= o), i((t = e.errored) !== null && void 0 !== t ? t : new S('write'));
          }
          const r = e[O].splice(0);
          for (let t = 0; t < r.length; t++) {
            var n;
            r[t]((n = e.errored) !== null && void 0 !== n ? n : new S('end'));
          }
          x(e);
        }
        function W(e, t) {
          if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
          const { buffered: r, bufferedIndex: n, objectMode: o } = t;
          const s = r.length - n;
          if (!s) return;
          let a = n;
          if (((t.bufferProcessing = !0), s > 1 && e._writev)) {
            t.pendingcb -= s - 1;
            const n = t.allNoop
              ? N
              : e => {
                  for (let t = a; t < r.length; ++t) r[t].callback(e);
                };
            const o = t.allNoop && a === 0 ? r : i(r, a);
            (o.allBuffers = t.allBuffers), D(e, t, !0, t.length, o, '', n), x(t);
          } else {
            do {
              const { chunk: n, encoding: i, callback: s } = r[a];
              r[a++] = null;
              D(e, t, !1, o ? 1 : n.length, n, i, s);
            } while (a < r.length && !t.writing);
            a === r.length
              ? x(t)
              : a > 256
                ? (r.splice(0, a), (t.bufferedIndex = 0))
                : (t.bufferedIndex = a);
          }
          t.bufferProcessing = !1;
        }
        function F(e) {
          return (
            e.ending &&
            !e.destroyed &&
            e.constructed &&
            e.length === 0 &&
            !e.errored &&
            e.buffered.length === 0 &&
            !e.finished &&
            !e.writing &&
            !e.errorEmitted &&
            !e.closeEmitted
          );
        }
        function G(e, t) {
          t.prefinished ||
            t.finalCalled ||
            (typeof e._final !== 'function' || t.destroyed
              ? ((t.prefinished = !0), e.emit('prefinish'))
              : ((t.finalCalled = !0),
                (function (e, t) {
                  let r = !1;
                  function i(i) {
                    if (r) T(e, i != null ? i : _());
                    else if (((r = !0), t.pendingcb--, i)) {
                      const r = t[O].splice(0);
                      for (let e = 0; e < r.length; e++) r[e](i);
                      T(e, i, t.sync);
                    } else
                      F(t) &&
                        ((t.prefinished = !0),
                        e.emit('prefinish'),
                        t.pendingcb++,
                        n.nextTick(H, e, t));
                  }
                  (t.sync = !0), t.pendingcb++;
                  try {
                    e._final(i);
                  } catch (e) {
                    i(e);
                  }
                  t.sync = !1;
                })(e, t)));
        }
        function V(e, t, r) {
          F(t) &&
            (G(e, t),
            t.pendingcb === 0 &&
              (r
                ? (t.pendingcb++,
                  n.nextTick(
                    (e, t) => {
                      F(t) ? H(e, t) : t.pendingcb--;
                    },
                    e,
                    t
                  ))
                : F(t) && (t.pendingcb++, H(e, t))));
        }
        function H(e, t) {
          t.pendingcb--, (t.finished = !0);
          const r = t[O].splice(0);
          for (let e = 0; e < r.length; e++) r[e]();
          if ((e.emit('finish'), t.autoDestroy)) {
            const t = e._readableState;
            (!t || (t.autoDestroy && (t.endEmitted || !1 === t.readable))) && e.destroy();
          }
        }
        (C.prototype.getBuffer = function () {
          return i(this.buffered, this.bufferedIndex);
        }),
          a(C.prototype, 'bufferedRequestCount', {
            __proto__: null,
            get() {
              return this.buffered.length - this.bufferedIndex;
            },
          }),
          a(P, f, {
            __proto__: null,
            value: function (e) {
              return !!s(this, e) || (this === P && e && e._writableState instanceof C);
            },
          }),
          (P.prototype.pipe = function () {
            T(this, new M());
          }),
          (P.prototype.write = function (e, t, r) {
            return !0 === k(this, e, t, r);
          }),
          (P.prototype.cork = function () {
            this._writableState.corked++;
          }),
          (P.prototype.uncork = function () {
            const e = this._writableState;
            e.corked && (e.corked--, e.writing || W(this, e));
          }),
          (P.prototype.setDefaultEncoding = function (e) {
            if ((typeof e === 'string' && (e = l(e)), !g.isEncoding(e))) throw new R(e);
            return (this._writableState.defaultEncoding = e), this;
          }),
          (P.prototype._write = function (e, t, r) {
            if (!this._writev) throw new E('_write()');
            this._writev([{ chunk: e, encoding: t }], r);
          }),
          (P.prototype._writev = null),
          (P.prototype.end = function (e, t, r) {
            const i = this._writableState;
            let s;
            if (
              (typeof e === 'function'
                ? ((r = e), (e = null), (t = null))
                : typeof t === 'function' && ((r = t), (t = null)),
              e != null)
            ) {
              const r = k(this, e, t);
              r instanceof o && (s = r);
            }
            return (
              i.corked && ((i.corked = 1), this.uncork()),
              s ||
                (i.errored || i.ending
                  ? i.finished
                    ? (s = new j('end'))
                    : i.destroyed && (s = new S('end'))
                  : ((i.ending = !0), V(this, i, !0), (i.ended = !0))),
              typeof r === 'function' && (s || i.finished ? n.nextTick(r, s) : i[O].push(r)),
              this
            );
          }),
          c(P.prototype, {
            closed: {
              __proto__: null,
              get() {
                return !!this._writableState && this._writableState.closed;
              },
            },
            destroyed: {
              __proto__: null,
              get() {
                return !!this._writableState && this._writableState.destroyed;
              },
              set(e) {
                this._writableState && (this._writableState.destroyed = e);
              },
            },
            writable: {
              __proto__: null,
              get() {
                const e = this._writableState;
                return !(
                  !e ||
                  !1 === e.writable ||
                  e.destroyed ||
                  e.errored ||
                  e.ending ||
                  e.ended
                );
              },
              set(e) {
                this._writableState && (this._writableState.writable = !!e);
              },
            },
            writableFinished: {
              __proto__: null,
              get() {
                return !!this._writableState && this._writableState.finished;
              },
            },
            writableObjectMode: {
              __proto__: null,
              get() {
                return !!this._writableState && this._writableState.objectMode;
              },
            },
            writableBuffer: {
              __proto__: null,
              get() {
                return this._writableState && this._writableState.getBuffer();
              },
            },
            writableEnded: {
              __proto__: null,
              get() {
                return !!this._writableState && this._writableState.ending;
              },
            },
            writableNeedDrain: {
              __proto__: null,
              get() {
                const e = this._writableState;
                return !!e && !e.destroyed && !e.ending && e.needDrain;
              },
            },
            writableHighWaterMark: {
              __proto__: null,
              get() {
                return this._writableState && this._writableState.highWaterMark;
              },
            },
            writableCorked: {
              __proto__: null,
              get() {
                return this._writableState ? this._writableState.corked : 0;
              },
            },
            writableLength: {
              __proto__: null,
              get() {
                return this._writableState && this._writableState.length;
              },
            },
            errored: {
              __proto__: null,
              enumerable: !1,
              get() {
                return this._writableState ? this._writableState.errored : null;
              },
            },
            writableAborted: {
              __proto__: null,
              enumerable: !1,
              get: function () {
                return !(
                  !1 === this._writableState.writable ||
                  (!this._writableState.destroyed && !this._writableState.errored) ||
                  this._writableState.finished
                );
              },
            },
          });
        const J = m.destroy;
        let q;
        function Y() {
          return void 0 === q && (q = {}), q;
        }
        (P.prototype.destroy = function (e, t) {
          const r = this._writableState;
          return (
            !r.destroyed &&
              (r.bufferedIndex < r.buffered.length || r[O].length) &&
              n.nextTick(B, r),
            J.call(this, e, t),
            this
          );
        }),
          (P.prototype._undestroy = m.undestroy),
          (P.prototype._destroy = function (e, t) {
            t(e);
          }),
          (P.prototype[h.captureRejectionSymbol] = function (e) {
            this.destroy(e);
          }),
          (P.fromWeb = function (e, t) {
            return Y().newStreamWritableFromWritableStream(e, t);
          }),
          (P.toWeb = function (e) {
            return Y().newWritableStreamFromStreamWritable(e);
          });
      },
      {
        '../../ours/errors': 65,
        '../../ours/primordials': 66,
        './add-abort-signal': 46,
        './destroy': 49,
        './duplex': 50,
        './legacy': 54,
        './state': 59,
        buffer: 132,
        events: 138,
        'process/': 150,
      },
    ],
    63: [
      function (e, t, r) {
        'use strict';
        const {
          ArrayIsArray: n,
          ArrayPrototypeIncludes: i,
          ArrayPrototypeJoin: o,
          ArrayPrototypeMap: s,
          NumberIsInteger: a,
          NumberIsNaN: c,
          NumberMAX_SAFE_INTEGER: u,
          NumberMIN_SAFE_INTEGER: l,
          NumberParseInt: d,
          ObjectPrototypeHasOwnProperty: f,
          RegExpPrototypeExec: h,
          String: p,
          StringPrototypeToUpperCase: g,
          StringPrototypeTrim: m,
        } = e('../ours/primordials');
        const {
          hideStackFrames: y,
          codes: {
            ERR_SOCKET_BAD_PORT: b,
            ERR_INVALID_ARG_TYPE: w,
            ERR_INVALID_ARG_VALUE: v,
            ERR_OUT_OF_RANGE: E,
            ERR_UNKNOWN_SIGNAL: _,
          },
        } = e('../ours/errors');
        const { normalizeEncoding: M } = e('../ours/util');
        const { isAsyncFunction: S, isArrayBufferView: j } = e('../ours/util').types;
        const I = {};
        const A = /^[0-7]+$/;
        const R = y((e, t, r = l, n = u) => {
          if (typeof e !== 'number') throw new w(t, 'number', e);
          if (!a(e)) throw new E(t, 'an integer', e);
          if (e < r || e > n) throw new E(t, `>= ${r} && <= ${n}`, e);
        });
        const T = y((e, t, r = -2147483648, n = 2147483647) => {
          if (typeof e !== 'number') throw new w(t, 'number', e);
          if (!a(e)) throw new E(t, 'an integer', e);
          if (e < r || e > n) throw new E(t, `>= ${r} && <= ${n}`, e);
        });
        const N = y((e, t, r = !1) => {
          if (typeof e !== 'number') throw new w(t, 'number', e);
          if (!a(e)) throw new E(t, 'an integer', e);
          const n = r ? 1 : 0;
          const i = 4294967295;
          if (e < n || e > i) throw new E(t, `>= ${n} && <= ${i}`, e);
        });
        function O(e, t) {
          if (typeof e !== 'string') throw new w(t, 'string', e);
        }
        const C = y((e, t, r) => {
          if (!i(r, e)) {
            const n = o(
              s(r, e => (typeof e === 'string' ? `'${e}'` : p(e))),
              ', '
            );
            throw new v(t, e, 'must be one of: ' + n);
          }
        });
        function x(e, t) {
          if (typeof e !== 'boolean') throw new w(t, 'boolean', e);
        }
        function P(e, t, r) {
          return e != null && f(e, t) ? e[t] : r;
        }
        const k = y((e, t, r = null) => {
          const i = P(r, 'allowArray', !1);
          const o = P(r, 'allowFunction', !1);
          if (
            (!P(r, 'nullable', !1) && e === null) ||
            (!i && n(e)) ||
            (typeof e !== 'object' && (!o || typeof e !== 'function'))
          )
            throw new w(t, 'Object', e);
        });
        const D = y((e, t) => {
          if (e != null && typeof e !== 'object' && typeof e !== 'function')
            throw new w(t, 'a dictionary', e);
        });
        const L = y((e, t, r = 0) => {
          if (!n(e)) throw new w(t, 'Array', e);
          if (e.length < r) {
            throw new v(t, e, `must be longer than ${r}`);
          }
        });
        const $ = y((e, t = 'buffer') => {
          if (!j(e)) throw new w(t, ['Buffer', 'TypedArray', 'DataView'], e);
        });
        const U = y((e, t) => {
          if (void 0 !== e && (e === null || typeof e !== 'object' || !('aborted' in e)))
            throw new w(t, 'AbortSignal', e);
        });
        const z = y((e, t) => {
          if (typeof e !== 'function') throw new w(t, 'Function', e);
        });
        const B = y((e, t) => {
          if (typeof e !== 'function' || S(e)) throw new w(t, 'Function', e);
        });
        const W = y((e, t) => {
          if (void 0 !== e) throw new w(t, 'undefined', e);
        });
        const F = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
        function G(e, t) {
          if (void 0 === e || !h(F, e))
            throw new v(
              t,
              e,
              'must be an array or string of format "</styles.css>; rel=preload; as=style"'
            );
        }
        t.exports = {
          isInt32: function (e) {
            return e === (0 | e);
          },
          isUint32: function (e) {
            return e === e >>> 0;
          },
          parseFileMode: function (e, t, r) {
            if ((void 0 === e && (e = r), typeof e === 'string')) {
              if (h(A, e) === null)
                throw new v(t, e, 'must be a 32-bit unsigned integer or an octal string');
              e = d(e, 8);
            }
            return N(e, t), e;
          },
          validateArray: L,
          validateStringArray: function (e, t) {
            L(e, t);
            for (let r = 0; r < e.length; r++) O(e[r], `${t}[${r}]`);
          },
          validateBooleanArray: function (e, t) {
            L(e, t);
            for (let r = 0; r < e.length; r++) x(e[r], `${t}[${r}]`);
          },
          validateAbortSignalArray: function (e, t) {
            L(e, t);
            for (let r = 0; r < e.length; r++) {
              const n = e[r];
              const i = `${t}[${r}]`;
              if (n == null) throw new w(i, 'AbortSignal', n);
              U(n, i);
            }
          },
          validateBoolean: x,
          validateBuffer: $,
          validateDictionary: D,
          validateEncoding: function (e, t) {
            const r = M(t);
            const n = e.length;
            if (r === 'hex' && n % 2 != 0)
              throw new v('encoding', t, `is invalid for data of length ${n}`);
          },
          validateFunction: z,
          validateInt32: T,
          validateInteger: R,
          validateNumber: function (e, t, r = void 0, n) {
            if (typeof e !== 'number') throw new w(t, 'number', e);
            if ((r != null && e < r) || (n != null && e > n) || ((r != null || n != null) && c(e)))
              throw new E(
                t,
                `${r != null ? `>= ${r}` : ''}${r != null && n != null ? ' && ' : ''}${n != null ? `<= ${n}` : ''}`,
                e
              );
          },
          validateObject: k,
          validateOneOf: C,
          validatePlainFunction: B,
          validatePort: function (e, t = 'Port', r = !0) {
            if (
              (typeof e !== 'number' && typeof e !== 'string') ||
              (typeof e === 'string' && m(e).length === 0) ||
              +e != +e >>> 0 ||
              e > 65535 ||
              (e === 0 && !r)
            )
              throw new b(t, e, r);
            return 0 | e;
          },
          validateSignalName: function (e, t = 'signal') {
            if ((O(e, t), void 0 === I[e])) {
              if (void 0 !== I[g(e)]) throw new _(e + ' (signals must use all capital letters)');
              throw new _(e);
            }
          },
          validateString: O,
          validateUint32: N,
          validateUndefined: W,
          validateUnion: function (e, t, r) {
            if (!i(r, e)) throw new w(t, `('${o(r, '|')}')`, e);
          },
          validateAbortSignal: U,
          validateLinkHeaderValue: function (e) {
            if (typeof e === 'string') return G(e, 'hints'), e;
            if (n(e)) {
              const t = e.length;
              let r = '';
              if (t === 0) return r;
              for (let n = 0; n < t; n++) {
                const i = e[n];
                G(i, 'hints'), (r += i), n !== t - 1 && (r += ', ');
              }
              return r;
            }
            throw new v(
              'hints',
              e,
              'must be an array or string of format "</styles.css>; rel=preload; as=style"'
            );
          },
        };
      },
      { '../ours/errors': 65, '../ours/primordials': 66, '../ours/util': 67 },
    ],
    64: [
      function (e, t, r) {
        'use strict';
        const n = e('../stream');
        const i = e('../stream/promises');
        const o = n.Readable.destroy;
        (t.exports = n.Readable),
          (t.exports._uint8ArrayToBuffer = n._uint8ArrayToBuffer),
          (t.exports._isUint8Array = n._isUint8Array),
          (t.exports.isDisturbed = n.isDisturbed),
          (t.exports.isErrored = n.isErrored),
          (t.exports.isReadable = n.isReadable),
          (t.exports.Readable = n.Readable),
          (t.exports.Writable = n.Writable),
          (t.exports.Duplex = n.Duplex),
          (t.exports.Transform = n.Transform),
          (t.exports.PassThrough = n.PassThrough),
          (t.exports.addAbortSignal = n.addAbortSignal),
          (t.exports.finished = n.finished),
          (t.exports.destroy = n.destroy),
          (t.exports.destroy = o),
          (t.exports.pipeline = n.pipeline),
          (t.exports.compose = n.compose),
          Object.defineProperty(n, 'promises', { configurable: !0, enumerable: !0, get: () => i }),
          (t.exports.Stream = n.Stream),
          (t.exports.default = t.exports);
      },
      { '../stream': 69, '../stream/promises': 70 },
    ],
    65: [
      function (e, t, r) {
        'use strict';
        const { format: n, inspect: i } = e('./util/inspect');
        const { AggregateError: o } = e('./primordials');
        const s = globalThis.AggregateError || o;
        const a = Symbol('kIsNodeError');
        const c = [
          'string',
          'function',
          'number',
          'object',
          'Function',
          'Object',
          'boolean',
          'bigint',
          'symbol',
        ];
        const u = /^([A-Z][a-z0-9]*)+$/;
        const l = {};
        function d(e, t) {
          if (!e) throw new l.ERR_INTERNAL_ASSERTION(t);
        }
        function f(e) {
          let t = '';
          let r = e.length;
          const n = e[0] === '-' ? 1 : 0;
          for (; r >= n + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`;
          return `${e.slice(0, r)}${t}`;
        }
        function h(e, t, r) {
          r || (r = Error);
          class i extends r {
            constructor(...r) {
              super(
                (function (e, t, r) {
                  if (typeof t === 'function')
                    return (
                      d(
                        t.length <= r.length,
                        `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${t.length}).`
                      ),
                      t(...r)
                    );
                  const i = (t.match(/%[dfijoOs]/g) || []).length;
                  return (
                    d(
                      i === r.length,
                      `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${i}).`
                    ),
                    r.length === 0 ? t : n(t, ...r)
                  );
                })(e, t, r)
              );
            }
            toString() {
              return `${this.name} [${e}]: ${this.message}`;
            }
          }
          Object.defineProperties(i.prototype, {
            name: { value: r.name, writable: !0, enumerable: !1, configurable: !0 },
            toString: {
              value() {
                return `${this.name} [${e}]: ${this.message}`;
              },
              writable: !0,
              enumerable: !1,
              configurable: !0,
            },
          }),
            (i.prototype.code = e),
            (i.prototype[a] = !0),
            (l[e] = i);
        }
        function p(e) {
          const t = '__node_internal_' + e.name;
          return Object.defineProperty(e, 'name', { value: t }), e;
        }
        class g extends Error {
          constructor(e = 'The operation was aborted', t = void 0) {
            if (void 0 !== t && typeof t !== 'object')
              throw new l.ERR_INVALID_ARG_TYPE('options', 'Object', t);
            super(e, t), (this.code = 'ABORT_ERR'), (this.name = 'AbortError');
          }
        }
        h('ERR_ASSERTION', '%s', Error),
          h(
            'ERR_INVALID_ARG_TYPE',
            (e, t, r) => {
              d(typeof e === 'string', "'name' must be a string"), Array.isArray(t) || (t = [t]);
              let n = 'The ';
              e.endsWith(' argument')
                ? (n += `${e} `)
                : (n += `"${e}" ${e.includes('.') ? 'property' : 'argument'} `),
                (n += 'must be ');
              const o = [];
              const s = [];
              const a = [];
              for (const e of t)
                d(typeof e === 'string', 'All expected entries have to be of type string'),
                  c.includes(e)
                    ? o.push(e.toLowerCase())
                    : u.test(e)
                      ? s.push(e)
                      : (d(e !== 'object', 'The value "object" should be written as "Object"'),
                        a.push(e));
              if (s.length > 0) {
                const e = o.indexOf('object');
                e !== -1 && (o.splice(o, e, 1), s.push('Object'));
              }
              if (o.length > 0) {
                switch (o.length) {
                  case 1:
                    n += `of type ${o[0]}`;
                    break;
                  case 2:
                    n += `one of type ${o[0]} or ${o[1]}`;
                    break;
                  default: {
                    const e = o.pop();
                    n += `one of type ${o.join(', ')}, or ${e}`;
                  }
                }
                (s.length > 0 || a.length > 0) && (n += ' or ');
              }
              if (s.length > 0) {
                switch (s.length) {
                  case 1:
                    n += `an instance of ${s[0]}`;
                    break;
                  case 2:
                    n += `an instance of ${s[0]} or ${s[1]}`;
                    break;
                  default: {
                    const e = s.pop();
                    n += `an instance of ${s.join(', ')}, or ${e}`;
                  }
                }
                a.length > 0 && (n += ' or ');
              }
              switch (a.length) {
                case 0:
                  break;
                case 1:
                  a[0].toLowerCase() !== a[0] && (n += 'an '), (n += `${a[0]}`);
                  break;
                case 2:
                  n += `one of ${a[0]} or ${a[1]}`;
                  break;
                default: {
                  const e = a.pop();
                  n += `one of ${a.join(', ')}, or ${e}`;
                }
              }
              if (r == null) n += `. Received ${r}`;
              else if (typeof r === 'function' && r.name) n += `. Received function ${r.name}`;
              else if (typeof r === 'object') {
                let l;
                if ((l = r.constructor) !== null && void 0 !== l && l.name)
                  n += `. Received an instance of ${r.constructor.name}`;
                else {
                  n += `. Received ${i(r, { depth: -1 })}`;
                }
              } else {
                let e = i(r, { colors: !1 });
                e.length > 25 && (e = `${e.slice(0, 25)}...`),
                  (n += `. Received type ${typeof r} (${e})`);
              }
              return n;
            },
            TypeError
          ),
          h(
            'ERR_INVALID_ARG_VALUE',
            (e, t, r = 'is invalid') => {
              let n = i(t);
              n.length > 128 && (n = n.slice(0, 128) + '...');
              return `The ${e.includes('.') ? 'property' : 'argument'} '${e}' ${r}. Received ${n}`;
            },
            TypeError
          ),
          h(
            'ERR_INVALID_RETURN_VALUE',
            (e, t, r) => {
              let n;
              return `Expected ${e} to be returned from the "${t}" function but got ${r != null && (n = r.constructor) !== null && void 0 !== n && n.name ? `instance of ${r.constructor.name}` : 'type ' + typeof r}.`;
            },
            TypeError
          ),
          h(
            'ERR_MISSING_ARGS',
            (...e) => {
              let t;
              d(e.length > 0, 'At least one arg needs to be specified');
              const r = e.length;
              switch (((e = (Array.isArray(e) ? e : [e]).map(e => `"${e}"`).join(' or ')), r)) {
                case 1:
                  t += `The ${e[0]} argument`;
                  break;
                case 2:
                  t += `The ${e[0]} and ${e[1]} arguments`;
                  break;
                default: {
                  const r = e.pop();
                  t += `The ${e.join(', ')}, and ${r} arguments`;
                }
              }
              return `${t} must be specified`;
            },
            TypeError
          ),
          h(
            'ERR_OUT_OF_RANGE',
            (e, t, r) => {
              let n;
              if ((d(t, 'Missing "range" argument'), Number.isInteger(r) && Math.abs(r) > 2 ** 32))
                n = f(String(r));
              else if (typeof r === 'bigint') {
                n = String(r);
                const e = BigInt(2) ** BigInt(32);
                (r > e || r < -e) && (n = f(n)), (n += 'n');
              } else n = i(r);
              return `The value of "${e}" is out of range. It must be ${t}. Received ${n}`;
            },
            RangeError
          ),
          h('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times', Error),
          h('ERR_METHOD_NOT_IMPLEMENTED', 'The %s method is not implemented', Error),
          h('ERR_STREAM_ALREADY_FINISHED', 'Cannot call %s after a stream was finished', Error),
          h('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable', Error),
          h('ERR_STREAM_DESTROYED', 'Cannot call %s after a stream was destroyed', Error),
          h('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError),
          h('ERR_STREAM_PREMATURE_CLOSE', 'Premature close', Error),
          h('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF', Error),
          h('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event', Error),
          h('ERR_STREAM_WRITE_AFTER_END', 'write after end', Error),
          h('ERR_UNKNOWN_ENCODING', 'Unknown encoding: %s', TypeError),
          (t.exports = {
            AbortError: g,
            aggregateTwoErrors: p(function (e, t) {
              if (e && t && e !== t) {
                if (Array.isArray(t.errors)) return t.errors.push(e), t;
                const r = new s([t, e], t.message);
                return (r.code = t.code), r;
              }
              return e || t;
            }),
            hideStackFrames: p,
            codes: l,
          });
      },
      { './primordials': 66, './util/inspect': 68 },
    ],
    66: [
      function (e, t, r) {
        'use strict';
        class n extends Error {
          constructor(e) {
            if (!Array.isArray(e))
              throw new TypeError('Expected input to be an Array, got ' + typeof e);
            let t = '';
            for (let r = 0; r < e.length; r++) t += `    ${e[r].stack}\n`;
            super(t), (this.name = 'AggregateError'), (this.errors = e);
          }
        }
        t.exports = {
          AggregateError: n,
          ArrayIsArray: e => Array.isArray(e),
          ArrayPrototypeIncludes: (e, t) => e.includes(t),
          ArrayPrototypeIndexOf: (e, t) => e.indexOf(t),
          ArrayPrototypeJoin: (e, t) => e.join(t),
          ArrayPrototypeMap: (e, t) => e.map(t),
          ArrayPrototypePop: (e, t) => e.pop(t),
          ArrayPrototypePush: (e, t) => e.push(t),
          ArrayPrototypeSlice: (e, t, r) => e.slice(t, r),
          Error,
          FunctionPrototypeCall: (e, t, ...r) => e.call(t, ...r),
          FunctionPrototypeSymbolHasInstance: (e, t) =>
            Function.prototype[Symbol.hasInstance].call(e, t),
          MathFloor: Math.floor,
          Number,
          NumberIsInteger: Number.isInteger,
          NumberIsNaN: Number.isNaN,
          NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
          NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
          NumberParseInt: Number.parseInt,
          ObjectDefineProperties: (e, t) => Object.defineProperties(e, t),
          ObjectDefineProperty: (e, t, r) => Object.defineProperty(e, t, r),
          ObjectGetOwnPropertyDescriptor: (e, t) => Object.getOwnPropertyDescriptor(e, t),
          ObjectKeys: e => Object.keys(e),
          ObjectSetPrototypeOf: (e, t) => Object.setPrototypeOf(e, t),
          Promise,
          PromisePrototypeCatch: (e, t) => e.catch(t),
          PromisePrototypeThen: (e, t, r) => e.then(t, r),
          PromiseReject: e => Promise.reject(e),
          PromiseResolve: e => Promise.resolve(e),
          ReflectApply: Reflect.apply,
          RegExpPrototypeTest: (e, t) => e.test(t),
          SafeSet: Set,
          String,
          StringPrototypeSlice: (e, t, r) => e.slice(t, r),
          StringPrototypeToLowerCase: e => e.toLowerCase(),
          StringPrototypeToUpperCase: e => e.toUpperCase(),
          StringPrototypeTrim: e => e.trim(),
          Symbol,
          SymbolFor: Symbol.for,
          SymbolAsyncIterator: Symbol.asyncIterator,
          SymbolHasInstance: Symbol.hasInstance,
          SymbolIterator: Symbol.iterator,
          SymbolDispose: Symbol.dispose || Symbol('Symbol.dispose'),
          SymbolAsyncDispose: Symbol.asyncDispose || Symbol('Symbol.asyncDispose'),
          TypedArrayPrototypeSet: (e, t, r) => e.set(t, r),
          Boolean,
          Uint8Array,
        };
      },
      {},
    ],
    67: [
      function (e, t, r) {
        'use strict';
        const n = e('buffer');
        const { format: i, inspect: o } = e('./util/inspect');
        const {
          codes: { ERR_INVALID_ARG_TYPE: s },
        } = e('./errors');
        const {
          kResistStopPropagation: a,
          AggregateError: c,
          SymbolDispose: u,
        } = e('./primordials');
        const l = globalThis.AbortSignal || e('abort-controller').AbortSignal;
        const d = globalThis.AbortController || e('abort-controller').AbortController;
        const f = Object.getPrototypeOf(async function () {}).constructor;
        const h = globalThis.Blob || n.Blob;
        const p =
          void 0 !== h
            ? function (e) {
                return e instanceof h;
              }
            : function (e) {
                return !1;
              };
        const g = (e, t) => {
          if (void 0 !== e && (e === null || typeof e !== 'object' || !('aborted' in e)))
            throw new s(t, 'AbortSignal', e);
        };
        (t.exports = {
          AggregateError: c,
          kEmptyObject: Object.freeze({}),
          once(e) {
            let t = !1;
            return function (...r) {
              t || ((t = !0), e.apply(this, r));
            };
          },
          createDeferredPromise: function () {
            let e, t;
            return {
              promise: new Promise((r, n) => {
                (e = r), (t = n);
              }),
              resolve: e,
              reject: t,
            };
          },
          promisify: e =>
            new Promise((t, r) => {
              e((e, ...n) => (e ? r(e) : t(...n)));
            }),
          debuglog: () => function () {},
          format: i,
          inspect: o,
          types: {
            isAsyncFunction: e => e instanceof f,
            isArrayBufferView: e => ArrayBuffer.isView(e),
          },
          isBlob: p,
          deprecate: (e, t) => e,
          addAbortListener:
            e('events').addAbortListener ||
            function (e, t) {
              if (void 0 === e) throw new s('signal', 'AbortSignal', e);
              let r;
              return (
                g(e, 'signal'),
                ((e, t) => {
                  if (typeof e !== 'function') throw new s(t, 'Function', e);
                })(t, 'listener'),
                e.aborted
                  ? queueMicrotask(() => t())
                  : (e.addEventListener('abort', t, { __proto__: null, once: !0, [a]: !0 }),
                    (r = () => {
                      e.removeEventListener('abort', t);
                    })),
                {
                  __proto__: null,
                  [u]() {
                    let e;
                    (e = r) === null || void 0 === e || e();
                  },
                }
              );
            },
          AbortSignalAny:
            l.any ||
            function (e) {
              if (e.length === 1) return e[0];
              const t = new d();
              const r = () => t.abort();
              return (
                e.forEach(e => {
                  g(e, 'signals'), e.addEventListener('abort', r, { once: !0 });
                }),
                t.signal.addEventListener(
                  'abort',
                  () => {
                    e.forEach(e => e.removeEventListener('abort', r));
                  },
                  { once: !0 }
                ),
                t.signal
              );
            },
        }),
          (t.exports.promisify.custom = Symbol.for('nodejs.util.promisify.custom'));
      },
      {
        './errors': 65,
        './primordials': 66,
        './util/inspect': 68,
        'abort-controller': 129,
        buffer: 132,
        events: 138,
      },
    ],
    68: [
      function (e, t, r) {
        'use strict';
        t.exports = {
          format: (e, ...t) =>
            e.replace(/%([sdifj])/g, function (...[e, r]) {
              const n = t.shift();
              if (r === 'f') return n.toFixed(6);
              if (r === 'j') return JSON.stringify(n);
              if (r === 's' && typeof n === 'object') {
                return `${n.constructor !== Object ? n.constructor.name : ''} {}`.trim();
              }
              return n.toString();
            }),
          inspect(e) {
            switch (typeof e) {
              case 'string':
                if (e.includes("'")) {
                  if (!e.includes('"')) return `"${e}"`;
                  if (!e.includes('`') && !e.includes('${')) return `\`${e}\``;
                }
                return `'${e}'`;
              case 'number':
                return isNaN(e) ? 'NaN' : Object.is(e, -0) ? String(e) : e;
              case 'bigint':
                return `${String(e)}n`;
              case 'boolean':
              case 'undefined':
                return String(e);
              case 'object':
                return '{}';
            }
          },
        };
      },
      {},
    ],
    69: [
      function (e, t, r) {
        'use strict';
        const { Buffer: n } = e('buffer');
        const { ObjectDefineProperty: i, ObjectKeys: o, ReflectApply: s } = e('./ours/primordials');
        const {
          promisify: { custom: a },
        } = e('./ours/util');
        const { streamReturningOperators: c, promiseReturningOperators: u } = e(
          './internal/streams/operators'
        );
        const {
          codes: { ERR_ILLEGAL_CONSTRUCTOR: l },
        } = e('./ours/errors');
        const d = e('./internal/streams/compose');
        const { setDefaultHighWaterMark: f, getDefaultHighWaterMark: h } = e(
          './internal/streams/state'
        );
        const { pipeline: p } = e('./internal/streams/pipeline');
        const { destroyer: g } = e('./internal/streams/destroy');
        const m = e('./internal/streams/end-of-stream');
        const y = e('./stream/promises');
        const b = e('./internal/streams/utils');
        const w = (t.exports = e('./internal/streams/legacy').Stream);
        (w.isDestroyed = b.isDestroyed),
          (w.isDisturbed = b.isDisturbed),
          (w.isErrored = b.isErrored),
          (w.isReadable = b.isReadable),
          (w.isWritable = b.isWritable),
          (w.Readable = e('./internal/streams/readable'));
        for (const E of o(c)) {
          const _ = c[E];
          function M(...e) {
            if (new.target) throw l();
            return w.Readable.from(s(_, this, e));
          }
          i(M, 'name', { __proto__: null, value: _.name }),
            i(M, 'length', { __proto__: null, value: _.length }),
            i(w.Readable.prototype, E, {
              __proto__: null,
              value: M,
              enumerable: !1,
              configurable: !0,
              writable: !0,
            });
        }
        for (const S of o(u)) {
          const j = u[S];
          function I(...e) {
            if (new.target) throw l();
            return s(j, this, e);
          }
          i(I, 'name', { __proto__: null, value: j.name }),
            i(I, 'length', { __proto__: null, value: j.length }),
            i(w.Readable.prototype, S, {
              __proto__: null,
              value: I,
              enumerable: !1,
              configurable: !0,
              writable: !0,
            });
        }
        (w.Writable = e('./internal/streams/writable')),
          (w.Duplex = e('./internal/streams/duplex')),
          (w.Transform = e('./internal/streams/transform')),
          (w.PassThrough = e('./internal/streams/passthrough')),
          (w.pipeline = p);
        const { addAbortSignal: v } = e('./internal/streams/add-abort-signal');
        (w.addAbortSignal = v),
          (w.finished = m),
          (w.destroy = g),
          (w.compose = d),
          (w.setDefaultHighWaterMark = f),
          (w.getDefaultHighWaterMark = h),
          i(w, 'promises', { __proto__: null, configurable: !0, enumerable: !0, get: () => y }),
          i(p, a, { __proto__: null, enumerable: !0, get: () => y.pipeline }),
          i(m, a, { __proto__: null, enumerable: !0, get: () => y.finished }),
          (w.Stream = w),
          (w._isUint8Array = function (e) {
            return e instanceof Uint8Array;
          }),
          (w._uint8ArrayToBuffer = function (e) {
            return n.from(e.buffer, e.byteOffset, e.byteLength);
          });
      },
      {
        './internal/streams/add-abort-signal': 46,
        './internal/streams/compose': 48,
        './internal/streams/destroy': 49,
        './internal/streams/duplex': 50,
        './internal/streams/end-of-stream': 52,
        './internal/streams/legacy': 54,
        './internal/streams/operators': 55,
        './internal/streams/passthrough': 56,
        './internal/streams/pipeline': 57,
        './internal/streams/readable': 58,
        './internal/streams/state': 59,
        './internal/streams/transform': 60,
        './internal/streams/utils': 61,
        './internal/streams/writable': 62,
        './ours/errors': 65,
        './ours/primordials': 66,
        './ours/util': 67,
        './stream/promises': 70,
        buffer: 132,
      },
    ],
    70: [
      function (e, t, r) {
        'use strict';
        const { ArrayPrototypePop: n, Promise: i } = e('../ours/primordials');
        const { isIterable: o, isNodeStream: s, isWebStream: a } = e('../internal/streams/utils');
        const { pipelineImpl: c } = e('../internal/streams/pipeline');
        const { finished: u } = e('../internal/streams/end-of-stream');
        e('../../lib/stream.js'),
          (t.exports = {
            finished: u,
            pipeline: function (...e) {
              return new i((t, r) => {
                let i, u;
                const l = e[e.length - 1];
                if (l && typeof l === 'object' && !s(l) && !o(l) && !a(l)) {
                  const t = n(e);
                  (i = t.signal), (u = t.end);
                }
                c(
                  e,
                  (e, n) => {
                    e ? r(e) : t(n);
                  },
                  { signal: i, end: u }
                );
              });
            },
          });
      },
      {
        '../../lib/stream.js': 69,
        '../internal/streams/end-of-stream': 52,
        '../internal/streams/pipeline': 57,
        '../internal/streams/utils': 61,
        '../ours/primordials': 66,
      },
    ],
    71: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.EthereumProviderError = r.JsonRpcError = void 0);
        const i = e('@metamask/utils');
        const o = n(e('fast-safe-stringify'));
        const s = e('./utils.cjs');
        class a extends Error {
          constructor(e, t, r) {
            if (!Number.isInteger(e)) throw new Error('"code" must be an integer.');
            if (!t || typeof t !== 'string')
              throw new Error('"message" must be a non-empty string.');
            (0, s.dataHasCause)(r)
              ? (super(t, { cause: r.cause }),
                (0, i.hasProperty)(this, 'cause') || Object.assign(this, { cause: r.cause }))
              : super(t),
              void 0 !== r && (this.data = r),
              (this.code = e);
          }
          serialize() {
            const e = { code: this.code, message: this.message };
            return (
              void 0 !== this.data &&
                ((e.data = this.data),
                (0, i.isPlainObject)(this.data) &&
                  (e.data.cause = (0, s.serializeCause)(this.data.cause))),
              this.stack && (e.stack = this.stack),
              e
            );
          }
          toString() {
            return (0, o.default)(this.serialize(), c, 2);
          }
        }
        r.JsonRpcError = a;
        function c(e, t) {
          if (t !== '[Circular]') return t;
        }
        r.EthereumProviderError = class extends a {
          constructor(e, t, r) {
            if (
              !(function (e) {
                return Number.isInteger(e) && e >= 1e3 && e <= 4999;
              })(e)
            )
              throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
            super(e, t, r);
          }
        };
      },
      { './utils.cjs': 75, '@metamask/utils': 98, 'fast-safe-stringify': 140 },
    ],
    72: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.errorValues = r.errorCodes = void 0),
          (r.errorCodes = {
            rpc: {
              invalidInput: -32e3,
              resourceNotFound: -32001,
              resourceUnavailable: -32002,
              transactionRejected: -32003,
              methodNotSupported: -32004,
              limitExceeded: -32005,
              parse: -32700,
              invalidRequest: -32600,
              methodNotFound: -32601,
              invalidParams: -32602,
              internal: -32603,
            },
            provider: {
              userRejectedRequest: 4001,
              unauthorized: 4100,
              unsupportedMethod: 4200,
              disconnected: 4900,
              chainDisconnected: 4901,
            },
          }),
          (r.errorValues = {
            '-32700': {
              standard: 'JSON RPC 2.0',
              message:
                'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.',
            },
            '-32600': {
              standard: 'JSON RPC 2.0',
              message: 'The JSON sent is not a valid Request object.',
            },
            '-32601': {
              standard: 'JSON RPC 2.0',
              message: 'The method does not exist / is not available.',
            },
            '-32602': { standard: 'JSON RPC 2.0', message: 'Invalid method parameter(s).' },
            '-32603': { standard: 'JSON RPC 2.0', message: 'Internal JSON-RPC error.' },
            '-32000': { standard: 'EIP-1474', message: 'Invalid input.' },
            '-32001': { standard: 'EIP-1474', message: 'Resource not found.' },
            '-32002': { standard: 'EIP-1474', message: 'Resource unavailable.' },
            '-32003': { standard: 'EIP-1474', message: 'Transaction rejected.' },
            '-32004': { standard: 'EIP-1474', message: 'Method not supported.' },
            '-32005': { standard: 'EIP-1474', message: 'Request limit exceeded.' },
            4001: { standard: 'EIP-1193', message: 'User rejected the request.' },
            4100: {
              standard: 'EIP-1193',
              message: 'The requested account and/or method has not been authorized by the user.',
            },
            4200: {
              standard: 'EIP-1193',
              message: 'The requested method is not supported by this Ethereum provider.',
            },
            4900: {
              standard: 'EIP-1193',
              message: 'The provider is disconnected from all chains.',
            },
            4901: {
              standard: 'EIP-1193',
              message: 'The provider is disconnected from the specified chain.',
            },
          });
      },
      {},
    ],
    73: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.providerErrors = r.rpcErrors = void 0);
        const n = e('./classes.cjs');
        const i = e('./error-constants.cjs');
        const o = e('./utils.cjs');
        function s(e, t) {
          const [r, i] = c(t);
          return new n.JsonRpcError(e, r ?? (0, o.getMessageFromCode)(e), i);
        }
        function a(e, t) {
          const [r, i] = c(t);
          return new n.EthereumProviderError(e, r ?? (0, o.getMessageFromCode)(e), i);
        }
        function c(e) {
          if (e) {
            if (typeof e === 'string') return [e];
            if (typeof e === 'object' && !Array.isArray(e)) {
              const { message: t, data: r } = e;
              if (t && typeof t !== 'string') throw new Error('Must specify string message.');
              return [t ?? void 0, r];
            }
          }
          return [];
        }
        (r.rpcErrors = {
          parse: e => s(i.errorCodes.rpc.parse, e),
          invalidRequest: e => s(i.errorCodes.rpc.invalidRequest, e),
          invalidParams: e => s(i.errorCodes.rpc.invalidParams, e),
          methodNotFound: e => s(i.errorCodes.rpc.methodNotFound, e),
          internal: e => s(i.errorCodes.rpc.internal, e),
          server: e => {
            if (!e || typeof e !== 'object' || Array.isArray(e))
              throw new Error('Ethereum RPC Server errors must provide single object argument.');
            const { code: t } = e;
            if (!Number.isInteger(t) || t > -32005 || t < -32099)
              throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            return s(t, e);
          },
          invalidInput: e => s(i.errorCodes.rpc.invalidInput, e),
          resourceNotFound: e => s(i.errorCodes.rpc.resourceNotFound, e),
          resourceUnavailable: e => s(i.errorCodes.rpc.resourceUnavailable, e),
          transactionRejected: e => s(i.errorCodes.rpc.transactionRejected, e),
          methodNotSupported: e => s(i.errorCodes.rpc.methodNotSupported, e),
          limitExceeded: e => s(i.errorCodes.rpc.limitExceeded, e),
        }),
          (r.providerErrors = {
            userRejectedRequest: e => a(i.errorCodes.provider.userRejectedRequest, e),
            unauthorized: e => a(i.errorCodes.provider.unauthorized, e),
            unsupportedMethod: e => a(i.errorCodes.provider.unsupportedMethod, e),
            disconnected: e => a(i.errorCodes.provider.disconnected, e),
            chainDisconnected: e => a(i.errorCodes.provider.chainDisconnected, e),
            custom: e => {
              if (!e || typeof e !== 'object' || Array.isArray(e))
                throw new Error(
                  'Ethereum Provider custom errors must provide single object argument.'
                );
              const { code: t, message: r, data: i } = e;
              if (!r || typeof r !== 'string')
                throw new Error('"message" must be a nonempty string');
              return new n.EthereumProviderError(t, r, i);
            },
          });
      },
      { './classes.cjs': 71, './error-constants.cjs': 72, './utils.cjs': 75 },
    ],
    74: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.errorCodes =
            r.providerErrors =
            r.rpcErrors =
            r.getMessageFromCode =
            r.serializeError =
            r.serializeCause =
            r.dataHasCause =
            r.EthereumProviderError =
            r.JsonRpcError =
              void 0);
        const n = e('./classes.cjs');
        Object.defineProperty(r, 'JsonRpcError', {
          enumerable: !0,
          get: function () {
            return n.JsonRpcError;
          },
        }),
          Object.defineProperty(r, 'EthereumProviderError', {
            enumerable: !0,
            get: function () {
              return n.EthereumProviderError;
            },
          });
        const i = e('./utils.cjs');
        Object.defineProperty(r, 'dataHasCause', {
          enumerable: !0,
          get: function () {
            return i.dataHasCause;
          },
        }),
          Object.defineProperty(r, 'serializeCause', {
            enumerable: !0,
            get: function () {
              return i.serializeCause;
            },
          }),
          Object.defineProperty(r, 'serializeError', {
            enumerable: !0,
            get: function () {
              return i.serializeError;
            },
          }),
          Object.defineProperty(r, 'getMessageFromCode', {
            enumerable: !0,
            get: function () {
              return i.getMessageFromCode;
            },
          });
        const o = e('./errors.cjs');
        Object.defineProperty(r, 'rpcErrors', {
          enumerable: !0,
          get: function () {
            return o.rpcErrors;
          },
        }),
          Object.defineProperty(r, 'providerErrors', {
            enumerable: !0,
            get: function () {
              return o.providerErrors;
            },
          });
        const s = e('./error-constants.cjs');
        Object.defineProperty(r, 'errorCodes', {
          enumerable: !0,
          get: function () {
            return s.errorCodes;
          },
        });
      },
      { './classes.cjs': 71, './error-constants.cjs': 72, './errors.cjs': 73, './utils.cjs': 75 },
    ],
    75: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.dataHasCause =
            r.serializeCause =
            r.serializeError =
            r.isValidCode =
            r.getMessageFromCode =
            r.JSON_RPC_SERVER_ERROR_MESSAGE =
              void 0);
        const n = e('@metamask/utils');
        const i = e('./error-constants.cjs');
        const o = i.errorCodes.rpc.internal;
        const s = { code: o, message: a(o) };
        function a(e, t = 'Unspecified error message. This is a bug, please report it.') {
          if (c(e)) {
            const t = e.toString();
            if ((0, n.hasProperty)(i.errorValues, t)) return i.errorValues[t].message;
            if (
              (function (e) {
                return e >= -32099 && e <= -32e3;
              })(e)
            )
              return r.JSON_RPC_SERVER_ERROR_MESSAGE;
          }
          return t;
        }
        function c(e) {
          return Number.isInteger(e);
        }
        function u(e) {
          return Array.isArray(e)
            ? e.map(e => ((0, n.isValidJson)(e) ? e : (0, n.isObject)(e) ? l(e) : null))
            : (0, n.isObject)(e)
              ? l(e)
              : (0, n.isValidJson)(e)
                ? e
                : null;
        }
        function l(e) {
          return Object.getOwnPropertyNames(e).reduce((t, r) => {
            const i = e[r];
            return (0, n.isValidJson)(i) && (t[r] = i), t;
          }, {});
        }
        (r.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.'),
          (r.getMessageFromCode = a),
          (r.isValidCode = c),
          (r.serializeError = function (
            e,
            { fallbackError: t = s, shouldIncludeStack: r = !0, shouldPreserveMessage: i = !0 } = {}
          ) {
            if (!(0, n.isJsonRpcError)(t))
              throw new Error(
                'Must provide fallback error with integer number code and string message.'
              );
            const o = (function (e, t, r) {
              if (
                e &&
                typeof e === 'object' &&
                'serialize' in e &&
                typeof e.serialize === 'function'
              )
                return e.serialize();
              if ((0, n.isJsonRpcError)(e)) return e;
              const i = (function (e) {
                if (
                  (0, n.isObject)(e) &&
                  (0, n.hasProperty)(e, 'message') &&
                  typeof e.message === 'string' &&
                  e.message.length > 0
                )
                  return e.message;
              })(e);
              const o = u(e);
              const s = { ...t, ...(r && i && { message: i }), data: { cause: o } };
              return s;
            })(e, t, i);
            return r || delete o.stack, o;
          }),
          (r.serializeCause = u),
          (r.dataHasCause = function (e) {
            return (0, n.isObject)(e) && (0, n.hasProperty)(e, 'cause') && (0, n.isObject)(e.cause);
          });
      },
      { './error-constants.cjs': 72, '@metamask/utils': 98 },
    ],
    76: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        const n = e('events');
        function i(e, t, r) {
          try {
            Reflect.apply(e, t, r);
          } catch (e) {
            setTimeout(() => {
              throw e;
            });
          }
        }
        class o extends n.EventEmitter {
          emit(e, ...t) {
            let r = e === 'error';
            const n = this._events;
            if (void 0 !== n) r = r && void 0 === n.error;
            else if (!r) return !1;
            if (r) {
              let e;
              if ((t.length > 0 && ([e] = t), e instanceof Error)) throw e;
              const r = new Error('Unhandled error.' + (e ? ` (${e.message})` : ''));
              throw ((r.context = e), r);
            }
            const o = n[e];
            if (void 0 === o) return !1;
            if (typeof o === 'function') i(o, this, t);
            else {
              const e = o.length;
              const r = (function (e) {
                const t = e.length;
                const r = new Array(t);
                for (let n = 0; n < t; n += 1) r[n] = e[n];
                return r;
              })(o);
              for (let n = 0; n < e; n += 1) i(r[n], this, t);
            }
            return !0;
          }
        }
        r.default = o;
      },
      { events: 138 },
    ],
    77: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.metamaskIcon = void 0),
          (r.metamaskIcon =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNSAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyLjcwNzcgMzIuNzUyMkwyNS4xNjg4IDMwLjUxNzRMMTkuNDgzMyAzMy45MDA4TDE1LjUxNjcgMzMuODk5MUw5LjgyNzkzIDMwLjUxNzRMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDQ4OUwyLjI5MjI1IDE2LjQ5OTNMMCA5LjI3MDk0TDIuMjkyMjUgMC4zMTIyNTZMMTQuMDY3NCA3LjMxNTU0SDIwLjkzMjZMMzIuNzA3NyAwLjMxMjI1NkwzNSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0wzNSAyNS4wNDg5TDMyLjcwNzcgMzIuNzUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTIuMjkzOTUgMC4zMTIyNTZMMTQuMDY5MSA3LjMyMDQ3TDEzLjYwMDggMTIuMTMwMUwyLjI5Mzk1IDAuMzEyMjU2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNOS44Mjk1OSAyNS4wNTIyTDE1LjAxMDYgMjguOTgxMUw5LjgyOTU5IDMwLjUxNzVWMjUuMDUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTE0LjU5NjYgMTguNTU2NUwxMy42MDA5IDEyLjEzMzNMNy4yMjY5MiAxNi41MDA5TDcuMjIzNjMgMTYuNDk5M1YxNi41MDI1TDcuMjQzMzUgMjAuOTk4M0w5LjgyODA5IDE4LjU1NjVIOS44Mjk3NEgxNC41OTY2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMzIuNzA3NyAwLjMxMjI1NkwyMC45MzI2IDcuMzIwNDdMMjEuMzk5MyAxMi4xMzAxTDMyLjcwNzcgMC4zMTIyNTZaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIyIDI1LjA1MjJMMTkuOTkxMiAyOC45ODExTDI1LjE3MjIgMzAuNTE3NVYyNS4wNTIyWiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMjcuNzc2NiAxNi41MDI1SDI3Ljc3ODNIMjcuNzc2NlYxNi40OTkzTDI3Ljc3NSAxNi41MDA5TDIxLjQwMSAxMi4xMzMzTDIwLjQwNTMgMTguNTU2NUgyNS4xNzIyTDI3Ljc1ODYgMjAuOTk4M0wyNy43NzY2IDE2LjUwMjVaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik05LjgyNzkzIDMwLjUxNzVMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDUyMkg5LjgyNzkzVjMwLjUxNzVaIiBmaWxsPSIjRTM0ODA3Ii8+CjxwYXRoIGQ9Ik0xNC41OTQ3IDE4LjU1NDlMMTYuMDM0MSAyNy44NDA2TDE0LjAzOTMgMjIuNjc3N0w3LjIzOTc1IDIwLjk5ODRMOS44MjYxMyAxOC41NTQ5SDE0LjU5M0gxNC41OTQ3WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjUuMTcyMSAzMC41MTc1TDMyLjcwNzggMzIuNzUyMkwzNS4wMDAxIDI1LjA1MjJIMjUuMTcyMVYzMC41MTc1WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjAuNDA1MyAxOC41NTQ5TDE4Ljk2NTggMjcuODQwNkwyMC45NjA3IDIyLjY3NzdMMjcuNzYwMiAyMC45OTg0TDI1LjE3MjIgMTguNTU0OUgyMC40MDUzWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMCAyNS4wNDg4TDIuMjkyMjUgMTYuNDk5M0g3LjIyMTgzTDcuMjM5OTEgMjAuOTk2N0wxNC4wMzk0IDIyLjY3NkwxNi4wMzQzIDI3LjgzODlMMTUuMDA4OSAyOC45NzZMOS44Mjc5MyAyNS4wNDcySDBWMjUuMDQ4OFoiIGZpbGw9IiNGRjhENUQiLz4KPHBhdGggZD0iTTM1LjAwMDEgMjUuMDQ4OEwzMi43MDc4IDE2LjQ5OTNIMjcuNzc4M0wyNy43NjAyIDIwLjk5NjdMMjAuOTYwNyAyMi42NzZMMTguOTY1OCAyNy44Mzg5TDE5Ljk5MTIgMjguOTc2TDI1LjE3MjIgMjUuMDQ3MkgzNS4wMDAxVjI1LjA0ODhaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yMC45MzI1IDcuMzE1NDNIMTcuNDk5OUgxNC4wNjczTDEzLjYwMDYgMTIuMTI1MUwxNi4wMzQyIDI3LjgzNEgxOC45NjU2TDIxLjQwMDggMTIuMTI1MUwyMC45MzI1IDcuMzE1NDNaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yLjI5MjI1IDAuMzEyMjU2TDAgOS4yNzA5NEwyLjI5MjI1IDE2LjQ5OTNINy4yMjE4M0wxMy41OTkxIDEyLjEzMDFMMi4yOTIyNSAwLjMxMjI1NloiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTEzLjE3IDIwLjQxOTlIMTAuOTM2OUw5LjcyMDk1IDIxLjYwNjJMMTQuMDQwOSAyMi42NzI3TDEzLjE3IDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTMyLjcwNzcgMC4zMTIyNTZMMzQuOTk5OSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0gyNy43NzgxTDIxLjQwMDkgMTIuMTMwMUwzMi43MDc3IDAuMzEyMjU2WiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMjEuODMzIDIwLjQxOTlIMjQuMDY5NEwyNS4yODUzIDIxLjYwNzlMMjAuOTYwNCAyMi42NzZMMjEuODMzIDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTE5LjQ4MTcgMzAuODM2MkwxOS45OTExIDI4Ljk3OTRMMTguOTY1OCAyNy44NDIzSDE2LjAzMjdMMTUuMDA3MyAyOC45Nzk0TDE1LjUxNjcgMzAuODM2MiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMTkuNDgxNiAzMC44MzU5VjMzLjkwMjFIMTUuNTE2NlYzMC44MzU5SDE5LjQ4MTZaIiBmaWxsPSIjQzBDNENEIi8+CjxwYXRoIGQ9Ik05LjgyOTU5IDMwLjUxNDJMMTUuNTIgMzMuOTAwOFYzMC44MzQ2TDE1LjAxMDYgMjguOTc3OEw5LjgyOTU5IDMwLjUxNDJaIiBmaWxsPSIjRTdFQkY2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIxIDMwLjUxNDJMMTkuNDgxNyAzMy45MDA4VjMwLjgzNDZMMTkuOTkxMSAyOC45Nzc4TDI1LjE3MjEgMzAuNTE0MloiIGZpbGw9IiNFN0VCRjYiLz4KPC9zdmc+Cg==');
      },
      {},
    ],
    78: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getWalletStandard = o),
          (r.registerSolanaWalletStandard = async function ({ client: e }) {
            const t = o({ client: e });
            (0, n.registerWallet)(t);
          });
        const n = e('@wallet-standard/wallet');
        const i = e('./wallet.cjs');
        function o({ client: e }) {
          return new i.MetamaskWallet({ client: e });
        }
      },
      { './wallet.cjs': 79, '@wallet-standard/wallet': 126 },
    ],
    79: [
      function (e, t, r) {
        (function (t) {
          (function () {
            'use strict';
            let n;
            let i;
            let o;
            let s;
            let a;
            let c;
            let u;
            let l;
            let d;
            let f;
            let h;
            let p;
            let g;
            let m;
            const y =
              (this && this.__classPrivateFieldGet) ||
              function (e, t, r, n) {
                if (r === 'a' && !n)
                  throw new TypeError('Private accessor was defined without a getter');
                if (typeof t === 'function' ? e !== t || !n : !t.has(e))
                  throw new TypeError(
                    'Cannot read private member from an object whose class did not declare it'
                  );
                return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
              };
            const b =
              (this && this.__classPrivateFieldSet) ||
              function (e, t, r, n, i) {
                if (n === 'm') throw new TypeError('Private method is not writable');
                if (n === 'a' && !i)
                  throw new TypeError('Private accessor was defined without a setter');
                if (typeof t === 'function' ? e !== t || !i : !t.has(e))
                  throw new TypeError(
                    'Cannot write private member to an object whose class did not declare it'
                  );
                return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
              };
            const w =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
            Object.defineProperty(r, '__esModule', { value: !0 }),
              (r.MetamaskWallet = r.MetamaskWalletAccount = void 0);
            const v = e('@solana/wallet-standard-chains');
            const E = e('@solana/wallet-standard-features');
            const _ = e('@wallet-standard/features');
            const M = e('@wallet-standard/wallet');
            const S = w(e('bs58'));
            const j = e('./icon.cjs');
            class I extends M.ReadonlyWalletAccount {
              constructor({ address: e, publicKey: t, chains: r }) {
                super({
                  address: e,
                  publicKey: t,
                  chains: r,
                  features: [
                    E.SolanaSignAndSendTransaction,
                    E.SolanaSignTransaction,
                    E.SolanaSignMessage,
                    E.SolanaSignIn,
                  ],
                }),
                  new.target === I && Object.freeze(this);
              }
            }
            r.MetamaskWalletAccount = I;
            (r.MetamaskWallet = class {
              get accounts() {
                return y(this, o, 'f') ? [y(this, o, 'f')] : [];
              }
              get features() {
                return {
                  [_.StandardConnect]: { version: this.version, connect: y(this, u, 'f') },
                  [E.SolanaSignIn]: { version: this.version, signIn: y(this, l, 'f') },
                  [_.StandardDisconnect]: { version: this.version, disconnect: y(this, d, 'f') },
                  [_.StandardEvents]: { version: this.version, on: y(this, s, 'f') },
                  [E.SolanaSignAndSendTransaction]: {
                    version: this.version,
                    supportedTransactionVersions: ['legacy', 0],
                    signAndSendTransaction: y(this, f, 'f'),
                  },
                  [E.SolanaSignTransaction]: {
                    version: this.version,
                    supportedTransactionVersions: ['legacy', 0],
                    signTransaction: y(this, h, 'f'),
                  },
                  [E.SolanaSignMessage]: { version: this.version, signMessage: y(this, p, 'f') },
                };
              }
              constructor({ client: e }) {
                n.add(this),
                  i.set(this, {}),
                  (this.version = '1.0.0'),
                  (this.name = 'MetaMask‎'),
                  (this.icon = j.metamaskIcon),
                  (this.chains = [
                    v.SOLANA_MAINNET_CHAIN,
                    v.SOLANA_DEVNET_CHAIN,
                    v.SOLANA_TESTNET_CHAIN,
                  ]),
                  (this.scope = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'),
                  o.set(this, void 0),
                  s.set(
                    this,
                    (e, t) => (
                      y(this, i, 'f')[e] ? y(this, i, 'f')[e]?.push(t) : (y(this, i, 'f')[e] = [t]),
                      () => y(this, n, 'm', c).call(this, e, t)
                    )
                  ),
                  u.set(this, async () => {
                    if (!this.accounts.length) {
                      const e = new Promise(e => {
                        this.client.onNotification(t => {
                          t?.params?.notification?.method === 'metamask_accountsChanged' &&
                            (y(this, n, 'm', g).call(this, t), e());
                        });
                      });
                      const t = await this.client.getSession();
                      const r = t?.sessionScopes[this.scope]?.accounts?.length
                        ? t
                        : await this.client.createSession({
                            optionalScopes: { [this.scope]: { methods: [], notifications: [] } },
                            sessionProperties: { solana_accountChanged_notifications: !0 },
                          });
                      const i = r?.sessionScopes[this.scope]?.accounts;
                      await new Promise((t, r) => {
                        const s = setTimeout(() => {
                          console.warn(
                            'No accountsChanged event received, using first account from session'
                          ),
                            i?.[0]
                              ? (b(
                                  this,
                                  o,
                                  y(this, n, 'm', m).call(this, i[0].slice(this.scope.length + 1)),
                                  'f'
                                ),
                                t())
                              : r(new Error('No accounts available to use from session'));
                        }, 2e3);
                        e.then(() => {
                          clearTimeout(s), t();
                        });
                      });
                    }
                    return { accounts: this.accounts };
                  }),
                  l.set(this, async (...e) => {
                    if (!y(this, o, 'f') && (await y(this, u, 'f').call(this), !y(this, o, 'f')))
                      throw new Error('No account found');
                    const r = [];
                    for (const n of e) {
                      const e = await this.client.invokeMethod({
                        scope: this.scope,
                        request: {
                          method: 'signIn',
                          params: {
                            ...n,
                            domain: n.domain || window.location.host,
                            address: n.address || y(this, o, 'f').address,
                          },
                        },
                      });
                      r.push({
                        account: y(this, o, 'f'),
                        signedMessage: t.from(e.signedMessage, 'base64'),
                        signature: S.default.decode(e.signature),
                      });
                    }
                    return r;
                  }),
                  d.set(this, async () => {
                    b(this, o, void 0, 'f'),
                      y(this, n, 'm', a).call(this, 'change', { accounts: this.accounts }),
                      await this.client.revokeSession();
                  }),
                  f.set(this, async (...e) => {
                    if (!y(this, o, 'f')) throw new Error('No account found');
                    const r = [];
                    for (const { transaction: n, account: i } of e) {
                      const e = t.from(n).toString('base64');
                      const o = await this.client.invokeMethod({
                        scope: this.scope,
                        request: {
                          method: 'signAndSendTransaction',
                          params: {
                            account: { address: i.address },
                            transaction: e,
                            scope: this.scope,
                          },
                        },
                      });
                      r.push({ signature: S.default.decode(o.signature) });
                    }
                    return r;
                  }),
                  h.set(this, async (...e) => {
                    const r = [];
                    for (const { transaction: n, account: i } of e) {
                      const e = t.from(n).toString('base64');
                      const o = await this.client.invokeMethod({
                        scope: this.scope,
                        request: {
                          method: 'signTransaction',
                          params: {
                            account: { address: i.address },
                            transaction: e,
                            scope: this.scope,
                          },
                        },
                      });
                      r.push({
                        signedTransaction: Uint8Array.from(t.from(o.signedTransaction, 'base64')),
                      });
                    }
                    return r;
                  }),
                  p.set(this, async (...e) => {
                    const r = [];
                    for (const { message: n, account: i } of e) {
                      const e = t.from(n).toString('base64');
                      const o = await this.client.invokeMethod({
                        scope: this.scope,
                        request: {
                          method: 'signMessage',
                          params: { message: e, account: { address: i.address } },
                        },
                      });
                      r.push({
                        signedMessage: t.from(o.signedMessage, 'base64'),
                        signature: S.default.decode(o.signature),
                        signatureType: o.signatureType,
                      });
                    }
                    return r;
                  }),
                  (this.client = e);
              }
            }),
              (i = new WeakMap()),
              (o = new WeakMap()),
              (s = new WeakMap()),
              (u = new WeakMap()),
              (l = new WeakMap()),
              (d = new WeakMap()),
              (f = new WeakMap()),
              (h = new WeakMap()),
              (p = new WeakMap()),
              (n = new WeakSet()),
              (a = function (e, ...t) {
                for (const r of y(this, i, 'f')[e] ?? []) r.apply(null, t);
              }),
              (c = function (e, t) {
                y(this, i, 'f')[e] = y(this, i, 'f')[e]?.filter(e => t !== e);
              }),
              (g = function (e) {
                const t = e?.params?.notification?.params?.[0];
                t
                  ? (b(this, o, y(this, n, 'm', m).call(this, t), 'f'),
                    y(this, n, 'm', a).call(this, 'change', { accounts: this.accounts }))
                  : y(this, d, 'f').call(this);
              }),
              (m = function (e) {
                return new I({
                  address: e,
                  publicKey: new Uint8Array(S.default.decode(e)),
                  chains: this.chains,
                });
              });
          }).call(this);
        }).call(this, e('buffer').Buffer);
      },
      {
        './icon.cjs': 77,
        '@solana/wallet-standard-chains': 115,
        '@solana/wallet-standard-features': 116,
        '@wallet-standard/features': 125,
        '@wallet-standard/wallet': 126,
        bs58: 134,
        buffer: 132,
      },
    ],
    80: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.StructError = void 0);
        class n extends TypeError {
          constructor(e, t) {
            let r;
            const { message: n, explanation: i, ...o } = e;
            const { path: s } = e;
            const a = s.length === 0 ? n : `At path: ${s.join('.')} -- ${n}`;
            super(i ?? a),
              i != null && (this.cause = a),
              Object.assign(this, o),
              (this.name = this.constructor.name),
              (this.failures = () => r ?? (r = [e, ...t()]));
          }
        }
        r.StructError = n;
      },
      {},
    ],
    81: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                let i = Object.getOwnPropertyDescriptor(t, r);
                (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              });
        const i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (const r in e)
              r === 'default' || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(e('./error.cjs'), r),
          i(e('./struct.cjs'), r),
          i(e('./structs/coercions.cjs'), r),
          i(e('./structs/refinements.cjs'), r),
          i(e('./structs/types.cjs'), r),
          i(e('./structs/utilities.cjs'), r);
      },
      {
        './error.cjs': 80,
        './struct.cjs': 82,
        './structs/coercions.cjs': 83,
        './structs/refinements.cjs': 84,
        './structs/types.cjs': 85,
        './structs/utilities.cjs': 86,
      },
    ],
    82: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.validate =
            r.is =
            r.mask =
            r.create =
            r.assert =
            r.ExactOptionalStruct =
            r.Struct =
              void 0);
        const n = e('./error.cjs');
        const i = e('./utils.cjs');
        class o {
          constructor(e) {
            const {
              type: t,
              schema: r,
              validator: n,
              refiner: o,
              coercer: s = e => e,
              entries: a = function* () {},
            } = e;
            (this.type = t),
              (this.schema = r),
              (this.entries = a),
              (this.coercer = s),
              (this.validator = n
                ? (e, t) => {
                    const r = n(e, t);
                    return (0, i.toFailures)(r, t, this, e);
                  }
                : () => []),
              (this.refiner = o
                ? (e, t) => {
                    const r = o(e, t);
                    return (0, i.toFailures)(r, t, this, e);
                  }
                : () => []);
          }
          assert(e, t) {
            return a(e, this, t);
          }
          create(e, t) {
            return c(e, this, t);
          }
          is(e) {
            return l(e, this);
          }
          mask(e, t) {
            return u(e, this, t);
          }
          validate(e, t = {}) {
            return d(e, this, t);
          }
        }
        r.Struct = o;
        const s = 'EXACT_OPTIONAL';
        function a(e, t, r) {
          const n = d(e, t, { message: r });
          if (n[0]) throw n[0];
        }
        function c(e, t, r) {
          const n = d(e, t, { coerce: !0, message: r });
          if (n[0]) throw n[0];
          return n[1];
        }
        function u(e, t, r) {
          const n = d(e, t, { coerce: !0, mask: !0, message: r });
          if (n[0]) throw n[0];
          return n[1];
        }
        function l(e, t) {
          return !d(e, t)[0];
        }
        function d(e, t, r = {}) {
          const o = (0, i.run)(e, t, r);
          const s = (0, i.shiftIterator)(o);
          if (s[0]) {
            return [
              new n.StructError(s[0], function* () {
                for (const e of o) e[0] && (yield e[0]);
              }),
              void 0,
            ];
          }
          return [void 0, s[1]];
        }
        (r.ExactOptionalStruct = class extends o {
          constructor(e) {
            super({ ...e, type: `exact optional ${e.type}` }), (this.brand = s);
          }
          static isExactOptional(e) {
            return (0, i.isObject)(e) && 'brand' in e && e.brand === s;
          }
        }),
          (r.assert = a),
          (r.create = c),
          (r.mask = u),
          (r.is = l),
          (r.validate = d);
      },
      { './error.cjs': 80, './utils.cjs': 87 },
    ],
    83: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.trimmed = r.defaulted = r.coerce = void 0);
        const n = e('../struct.cjs');
        const i = e('../utils.cjs');
        const o = e('./types.cjs');
        function s(e, t, r) {
          return new n.Struct({
            ...e,
            coercer: (i, o) => ((0, n.is)(i, t) ? e.coercer(r(i, o), o) : e.coercer(i, o)),
          });
        }
        (r.coerce = s),
          (r.defaulted = function (e, t, r = {}) {
            return s(e, (0, o.unknown)(), e => {
              const n = typeof t === 'function' ? t() : t;
              if (void 0 === e) return n;
              if (!r.strict && (0, i.isPlainObject)(e) && (0, i.isPlainObject)(n)) {
                const t = { ...e };
                let r = !1;
                for (const e in n) void 0 === t[e] && ((t[e] = n[e]), (r = !0));
                if (r) return t;
              }
              return e;
            });
          }),
          (r.trimmed = function (e) {
            return s(e, (0, o.string)(), e => e.trim());
          });
      },
      { '../struct.cjs': 82, '../utils.cjs': 87, './types.cjs': 85 },
    ],
    84: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.refine = r.size = r.pattern = r.nonempty = r.min = r.max = r.empty = void 0);
        const n = e('../struct.cjs');
        const i = e('../utils.cjs');
        function o(e) {
          return e instanceof Map || e instanceof Set ? e.size : e.length;
        }
        function s(e, t, r) {
          return new n.Struct({
            ...e,
            *refiner(n, o) {
              yield* e.refiner(n, o);
              const s = r(n, o);
              const a = (0, i.toFailures)(s, o, e, n);
              for (const e of a) yield { ...e, refinement: t };
            },
          });
        }
        (r.empty = function (e) {
          return s(e, 'empty', t => {
            const r = o(t);
            return (
              r === 0 || `Expected an empty ${e.type} but received one with a size of \`${r}\``
            );
          });
        }),
          (r.max = function (e, t, r = {}) {
            const { exclusive: n } = r;
            return s(e, 'max', r =>
              n
                ? r < t
                : r <= t ||
                  `Expected a ${e.type} less than ${n ? '' : 'or equal to '}${t} but received \`${r}\``
            );
          }),
          (r.min = function (e, t, r = {}) {
            const { exclusive: n } = r;
            return s(e, 'min', r =>
              n
                ? r > t
                : r >= t ||
                  `Expected a ${e.type} greater than ${n ? '' : 'or equal to '}${t} but received \`${r}\``
            );
          }),
          (r.nonempty = function (e) {
            return s(
              e,
              'nonempty',
              t => o(t) > 0 || `Expected a nonempty ${e.type} but received an empty one`
            );
          }),
          (r.pattern = function (e, t) {
            return s(
              e,
              'pattern',
              r =>
                t.test(r) || `Expected a ${e.type} matching \`/${t.source}/\` but received "${r}"`
            );
          }),
          (r.size = function (e, t, r = t) {
            const n = `Expected a ${e.type}`;
            const i = t === r ? `of \`${t}\`` : `between \`${t}\` and \`${r}\``;
            return s(e, 'size', e => {
              if (typeof e === 'number' || e instanceof Date)
                return (t <= e && e <= r) || `${n} ${i} but received \`${e}\``;
              if (e instanceof Map || e instanceof Set) {
                const { size: o } = e;
                return (
                  (t <= o && o <= r) ||
                  `${n} with a size ${i} but received one with a size of \`${o}\``
                );
              }
              const { length: o } = e;
              return (
                (t <= o && o <= r) ||
                `${n} with a length ${i} but received one with a length of \`${o}\``
              );
            });
          }),
          (r.refine = s);
      },
      { '../struct.cjs': 82, '../utils.cjs': 87 },
    ],
    85: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.unknown =
            r.union =
            r.type =
            r.tuple =
            r.string =
            r.set =
            r.regexp =
            r.record =
            r.exactOptional =
            r.optional =
            r.object =
            r.number =
            r.nullable =
            r.never =
            r.map =
            r.literal =
            r.intersection =
            r.integer =
            r.instance =
            r.func =
            r.enums =
            r.date =
            r.boolean =
            r.bigint =
            r.array =
            r.any =
              void 0);
        const n = e('../struct.cjs');
        const i = e('../utils.cjs');
        const o = e('./utilities.cjs');
        function s() {
          return (0, o.define)('never', () => !1);
        }
        (r.any = function () {
          return (0, o.define)('any', () => !0);
        }),
          (r.array = function (e) {
            return new n.Struct({
              type: 'array',
              schema: e,
              *entries(t) {
                if (e && Array.isArray(t)) for (const [r, n] of t.entries()) yield [r, n, e];
              },
              coercer: e => (Array.isArray(e) ? e.slice() : e),
              validator: e =>
                Array.isArray(e) || `Expected an array value, but received: ${(0, i.print)(e)}`,
            });
          }),
          (r.bigint = function () {
            return (0, o.define)('bigint', e => typeof e === 'bigint');
          }),
          (r.boolean = function () {
            return (0, o.define)('boolean', e => typeof e === 'boolean');
          }),
          (r.date = function () {
            return (0, o.define)(
              'date',
              e =>
                (e instanceof Date && !isNaN(e.getTime())) ||
                `Expected a valid \`Date\` object, but received: ${(0, i.print)(e)}`
            );
          }),
          (r.enums = function (e) {
            const t = {};
            const r = e.map(e => (0, i.print)(e)).join();
            for (const r of e) t[r] = r;
            return new n.Struct({
              type: 'enums',
              schema: t,
              validator: t =>
                e.includes(t) || `Expected one of \`${r}\`, but received: ${(0, i.print)(t)}`,
            });
          }),
          (r.func = function () {
            return (0, o.define)(
              'func',
              e =>
                typeof e === 'function' || `Expected a function, but received: ${(0, i.print)(e)}`
            );
          }),
          (r.instance = function (e) {
            return (0, o.define)(
              'instance',
              t =>
                t instanceof e ||
                `Expected a \`${e.name}\` instance, but received: ${(0, i.print)(t)}`
            );
          }),
          (r.integer = function () {
            return (0, o.define)(
              'integer',
              e =>
                (typeof e === 'number' && !isNaN(e) && Number.isInteger(e)) ||
                `Expected an integer, but received: ${(0, i.print)(e)}`
            );
          }),
          (r.intersection = function (e) {
            return new n.Struct({
              type: 'intersection',
              schema: null,
              *entries(t, r) {
                for (const { entries: n } of e) yield* n(t, r);
              },
              *validator(t, r) {
                for (const { validator: n } of e) yield* n(t, r);
              },
              *refiner(t, r) {
                for (const { refiner: n } of e) yield* n(t, r);
              },
            });
          }),
          (r.literal = function (e) {
            const t = (0, i.print)(e);
            const r = typeof e;
            return new n.Struct({
              type: 'literal',
              schema: r === 'string' || r === 'number' || r === 'boolean' ? e : null,
              validator: r =>
                r === e || `Expected the literal \`${t}\`, but received: ${(0, i.print)(r)}`,
            });
          }),
          (r.map = function (e, t) {
            return new n.Struct({
              type: 'map',
              schema: null,
              *entries(r) {
                if (e && t && r instanceof Map)
                  for (const [n, i] of r.entries()) yield [n, n, e], yield [n, i, t];
              },
              coercer: e => (e instanceof Map ? new Map(e) : e),
              validator: e =>
                e instanceof Map || `Expected a \`Map\` object, but received: ${(0, i.print)(e)}`,
            });
          }),
          (r.never = s),
          (r.nullable = function (e) {
            return new n.Struct({
              ...e,
              validator: (t, r) => t === null || e.validator(t, r),
              refiner: (t, r) => t === null || e.refiner(t, r),
            });
          }),
          (r.number = function () {
            return (0, o.define)(
              'number',
              e =>
                (typeof e === 'number' && !isNaN(e)) ||
                `Expected a number, but received: ${(0, i.print)(e)}`
            );
          }),
          (r.object = function (e) {
            const t = e ? Object.keys(e) : [];
            const r = s();
            return new n.Struct({
              type: 'object',
              schema: e ?? null,
              *entries(o) {
                if (e && (0, i.isObject)(o)) {
                  const i = new Set(Object.keys(o));
                  for (const r of t) {
                    i.delete(r);
                    const t = e[r];
                    (n.ExactOptionalStruct.isExactOptional(t) &&
                      !Object.prototype.hasOwnProperty.call(o, r)) ||
                      (yield [r, o[r], e[r]]);
                  }
                  for (const e of i) yield [e, o[e], r];
                }
              },
              validator: e =>
                (0, i.isObject)(e) || `Expected an object, but received: ${(0, i.print)(e)}`,
              coercer: e => ((0, i.isObject)(e) ? { ...e } : e),
            });
          }),
          (r.optional = function (e) {
            return new n.Struct({
              ...e,
              validator: (t, r) => void 0 === t || e.validator(t, r),
              refiner: (t, r) => void 0 === t || e.refiner(t, r),
            });
          }),
          (r.exactOptional = function (e) {
            return new n.ExactOptionalStruct(e);
          }),
          (r.record = function (e, t) {
            return new n.Struct({
              type: 'record',
              schema: null,
              *entries(r) {
                if ((0, i.isObject)(r))
                  for (const n in r) {
                    const i = r[n];
                    yield [n, n, e], yield [n, i, t];
                  }
              },
              validator: e =>
                (0, i.isObject)(e) || `Expected an object, but received: ${(0, i.print)(e)}`,
            });
          }),
          (r.regexp = function () {
            return (0, o.define)('regexp', e => e instanceof RegExp);
          }),
          (r.set = function (e) {
            return new n.Struct({
              type: 'set',
              schema: null,
              *entries(t) {
                if (e && t instanceof Set) for (const r of t) yield [r, r, e];
              },
              coercer: e => (e instanceof Set ? new Set(e) : e),
              validator: e =>
                e instanceof Set || `Expected a \`Set\` object, but received: ${(0, i.print)(e)}`,
            });
          }),
          (r.string = function () {
            return (0, o.define)(
              'string',
              e => typeof e === 'string' || `Expected a string, but received: ${(0, i.print)(e)}`
            );
          }),
          (r.tuple = function (e) {
            const t = s();
            return new n.Struct({
              type: 'tuple',
              schema: null,
              *entries(r) {
                if (Array.isArray(r)) {
                  const n = Math.max(e.length, r.length);
                  for (let i = 0; i < n; i++) yield [i, r[i], e[i] || t];
                }
              },
              validator: e =>
                Array.isArray(e) || `Expected an array, but received: ${(0, i.print)(e)}`,
            });
          }),
          (r.type = function (e) {
            const t = Object.keys(e);
            return new n.Struct({
              type: 'type',
              schema: e,
              *entries(r) {
                if ((0, i.isObject)(r)) for (const n of t) yield [n, r[n], e[n]];
              },
              validator: e =>
                (0, i.isObject)(e) || `Expected an object, but received: ${(0, i.print)(e)}`,
              coercer: e => ((0, i.isObject)(e) ? { ...e } : e),
            });
          }),
          (r.union = function (e) {
            const t = e.map(e => e.type).join(' | ');
            return new n.Struct({
              type: 'union',
              schema: null,
              coercer(t) {
                for (const r of e) {
                  const [e, n] = r.validate(t, { coerce: !0 });
                  if (!e) return n;
                }
                return t;
              },
              validator(r, n) {
                const o = [];
                for (const t of e) {
                  const [...e] = (0, i.run)(r, t, n);
                  const [s] = e;
                  if (!s?.[0]) return [];
                  for (const [t] of e) t && o.push(t);
                }
                return [
                  `Expected the value to satisfy a union of \`${t}\`, but received: ${(0, i.print)(r)}`,
                  ...o,
                ];
              },
            });
          }),
          (r.unknown = function () {
            return (0, o.define)('unknown', () => !0);
          });
      },
      { '../struct.cjs': 82, '../utils.cjs': 87, './utilities.cjs': 86 },
    ],
    86: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.pick =
            r.partial =
            r.omit =
            r.lazy =
            r.dynamic =
            r.deprecated =
            r.define =
            r.assign =
              void 0);
        const n = e('../struct.cjs');
        const i = e('./types.cjs');
        (r.assign = function (...e) {
          const t = e[0]?.type === 'type';
          const r = e.map(({ schema: e }) => e);
          const n = Object.assign({}, ...r);
          return t ? (0, i.type)(n) : (0, i.object)(n);
        }),
          (r.define = function (e, t) {
            return new n.Struct({ type: e, schema: null, validator: t });
          }),
          (r.deprecated = function (e, t) {
            return new n.Struct({
              ...e,
              refiner: (t, r) => void 0 === t || e.refiner(t, r),
              validator: (r, n) => void 0 === r || (t(r, n), e.validator(r, n)),
            });
          }),
          (r.dynamic = function (e) {
            return new n.Struct({
              type: 'dynamic',
              schema: null,
              *entries(t, r) {
                const n = e(t, r);
                yield* n.entries(t, r);
              },
              validator: (t, r) => e(t, r).validator(t, r),
              coercer: (t, r) => e(t, r).coercer(t, r),
              refiner: (t, r) => e(t, r).refiner(t, r),
            });
          }),
          (r.lazy = function (e) {
            let t;
            return new n.Struct({
              type: 'lazy',
              schema: null,
              *entries(r, n) {
                t ?? (t = e()), yield* t.entries(r, n);
              },
              validator: (r, n) => (t ?? (t = e()), t.validator(r, n)),
              coercer: (r, n) => (t ?? (t = e()), t.coercer(r, n)),
              refiner: (r, n) => (t ?? (t = e()), t.refiner(r, n)),
            });
          }),
          (r.omit = function (e, t) {
            const { schema: r } = e;
            const n = { ...r };
            for (const e of t) delete n[e];
            return e.type === 'type' ? (0, i.type)(n) : (0, i.object)(n);
          }),
          (r.partial = function (e) {
            const t = e instanceof n.Struct;
            const r = t ? { ...e.schema } : { ...e };
            for (const e in r) r[e] = (0, i.optional)(r[e]);
            return t && e.type === 'type' ? (0, i.type)(r) : (0, i.object)(r);
          }),
          (r.pick = function (e, t) {
            const { schema: r } = e;
            const n = {};
            for (const e of t) n[e] = r[e];
            return e.type === 'type' ? (0, i.type)(n) : (0, i.object)(n);
          });
      },
      { '../struct.cjs': 82, './types.cjs': 85 },
    ],
    87: [
      function (e, t, r) {
        'use strict';
        function n(e) {
          return typeof e === 'object' && e !== null;
        }
        function i(e) {
          return typeof e === 'symbol'
            ? e.toString()
            : typeof e === 'string'
              ? JSON.stringify(e)
              : `${e}`;
        }
        function o(e, t, r, n) {
          if (!0 === e) return;
          !1 === e ? (e = {}) : typeof e === 'string' && (e = { message: e });
          const { path: o, branch: s } = t;
          const { type: a } = r;
          const {
            refinement: c,
            message:
              u = `Expected a value of type \`${a}\`${c ? ` with refinement \`${c}\`` : ''}, but received: \`${i(n)}\``,
          } = e;
          return {
            value: n,
            type: a,
            refinement: c,
            key: o[o.length - 1],
            path: o,
            branch: s,
            ...e,
            message: u,
          };
        }
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.run =
            r.toFailures =
            r.toFailure =
            r.shiftIterator =
            r.print =
            r.isPlainObject =
            r.isObject =
              void 0),
          (r.isObject = n),
          (r.isPlainObject = function (e) {
            if (Object.prototype.toString.call(e) !== '[object Object]') return !1;
            const t = Object.getPrototypeOf(e);
            return t === null || t === Object.prototype;
          }),
          (r.print = i),
          (r.shiftIterator = function (e) {
            const { done: t, value: r } = e.next();
            return t ? void 0 : r;
          }),
          (r.toFailure = o),
          (r.toFailures = function* (e, t, r, i) {
            (function (e) {
              return n(e) && typeof e[Symbol.iterator] === 'function';
            })(e) || (e = [e]);
            for (const n of e) {
              const e = o(n, t, r, i);
              e && (yield e);
            }
          }),
          (r.run = function* e(t, r, i = {}) {
            const { path: o = [], branch: s = [t], coerce: a = !1, mask: c = !1 } = i;
            const u = { path: o, branch: s };
            if (
              a &&
              ((t = r.coercer(t, u)),
              c && r.type !== 'type' && n(r.schema) && n(t) && !Array.isArray(t))
            )
              for (const e in t) void 0 === r.schema[e] && delete t[e];
            let l = 'valid';
            for (const e of r.validator(t, u))
              (e.explanation = i.message), (l = 'not_valid'), yield [e, void 0];
            for (let [d, f, h] of r.entries(t, u)) {
              const r = e(f, h, {
                path: void 0 === d ? o : [...o, d],
                branch: void 0 === d ? s : [...s, f],
                coerce: a,
                mask: c,
                message: i.message,
              });
              for (const e of r)
                e[0]
                  ? ((l =
                      e[0].refinement === null || void 0 === e[0].refinement
                        ? 'not_valid'
                        : 'not_refined'),
                    yield [e[0], void 0])
                  : a &&
                    ((f = e[1]),
                    void 0 === d
                      ? (t = f)
                      : t instanceof Map
                        ? t.set(d, f)
                        : t instanceof Set
                          ? t.add(f)
                          : n(t) && (void 0 !== f || d in t) && (t[d] = f));
            }
            if (l !== 'not_valid')
              for (const e of r.refiner(t, u))
                (e.explanation = i.message), (l = 'not_refined'), yield [e, void 0];
            l === 'valid' && (yield [void 0, t]);
          });
      },
      {},
    ],
    88: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.assertExhaustive = r.assertStruct = r.assert = r.AssertionError = void 0);
        const n = e('@metamask/superstruct');
        const i = e('./errors.cjs');
        function o(e, t) {
          return (
            (r = e),
            typeof r?.prototype?.constructor?.name === 'string'
              ? new e({ message: t })
              : e({ message: t })
          );
          let r;
        }
        class s extends Error {
          constructor(e) {
            super(e.message), (this.code = 'ERR_ASSERTION');
          }
        }
        (r.AssertionError = s),
          (r.assert = function (e, t = 'Assertion failed.', r = s) {
            if (!e) {
              if (t instanceof Error) throw t;
              throw o(r, t);
            }
          }),
          (r.assertStruct = function (e, t, r = 'Assertion failed', a = s) {
            try {
              (0, n.assert)(e, t);
            } catch (e) {
              throw o(
                a,
                `${r}: ${(function (e) {
                  return (0, i.getErrorMessage)(e).replace(/\.$/u, '');
                })(e)}.`
              );
            }
          }),
          (r.assertExhaustive = function (e) {
            throw new Error('Invalid branch reached. Should be detected during compilation.');
          });
      },
      { './errors.cjs': 96, '@metamask/superstruct': 81 },
    ],
    89: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.base64 = void 0);
        const n = e('@metamask/superstruct');
        const i = e('./assert.cjs');
        r.base64 = (e, t = {}) => {
          const r = t.paddingRequired ?? !1;
          const o = t.characterSet ?? 'base64';
          let s, a;
          return (
            o === 'base64'
              ? (s = String.raw`[A-Za-z0-9+\/]`)
              : ((0, i.assert)(o === 'base64url'), (s = String.raw`[-_A-Za-z0-9]`)),
            (a = r
              ? new RegExp(`^(?:${s}{4})*(?:${s}{3}=|${s}{2}==)?$`, 'u')
              : new RegExp(`^(?:${s}{4})*(?:${s}{2,3}|${s}{3}=|${s}{2}==)?$`, 'u')),
            (0, n.pattern)(e, a)
          );
        };
      },
      { './assert.cjs': 88, '@metamask/superstruct': 81 },
    ],
    90: [
      function (e, t, r) {
        (function (t) {
          (function () {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
              (r.createDataView =
                r.concatBytes =
                r.valueToBytes =
                r.base64ToBytes =
                r.stringToBytes =
                r.numberToBytes =
                r.signedBigIntToBytes =
                r.bigIntToBytes =
                r.hexToBytes =
                r.bytesToBase64 =
                r.bytesToString =
                r.bytesToNumber =
                r.bytesToSignedBigInt =
                r.bytesToBigInt =
                r.bytesToHex =
                r.assertIsBytes =
                r.isBytes =
                  void 0);
            const n = e('@scure/base');
            const i = e('./assert.cjs');
            const o = e('./hex.cjs');
            const s = 48;
            const a = 58;
            const c = 87;
            const u = (function () {
              const e = [];
              return () => {
                if (e.length === 0)
                  for (let t = 0; t < 256; t++) e.push(t.toString(16).padStart(2, '0'));
                return e;
              };
            })();
            function l(e) {
              return e instanceof Uint8Array;
            }
            function d(e) {
              (0, i.assert)(l(e), 'Value must be a Uint8Array.');
            }
            function f(e) {
              if ((d(e), e.length === 0)) return '0x';
              const t = u();
              const r = new Array(e.length);
              for (let n = 0; n < e.length; n++) r[n] = t[e[n]];
              return (0, o.add0x)(r.join(''));
            }
            function h(e) {
              d(e);
              const t = f(e);
              return BigInt(t);
            }
            function p(e) {
              if (e?.toLowerCase?.() === '0x') return new Uint8Array();
              (0, o.assertIsHexString)(e);
              const t = (0, o.remove0x)(e).toLowerCase();
              const r = t.length % 2 == 0 ? t : `0${t}`;
              const n = new Uint8Array(r.length / 2);
              for (let e = 0; e < n.length; e++) {
                const t = r.charCodeAt(2 * e);
                const i = r.charCodeAt(2 * e + 1);
                const o = t - (t < a ? s : c);
                const u = i - (i < a ? s : c);
                n[e] = 16 * o + u;
              }
              return n;
            }
            function g(e) {
              (0, i.assert)(typeof e === 'bigint', 'Value must be a bigint.'),
                (0, i.assert)(e >= BigInt(0), 'Value must be a non-negative bigint.');
              return p(e.toString(16));
            }
            function m(e) {
              (0, i.assert)(typeof e === 'number', 'Value must be a number.'),
                (0, i.assert)(e >= 0, 'Value must be a non-negative number.'),
                (0, i.assert)(
                  Number.isSafeInteger(e),
                  'Value is not a safe integer. Use `bigIntToBytes` instead.'
                );
              return p(e.toString(16));
            }
            function y(e) {
              return (
                (0, i.assert)(typeof e === 'string', 'Value must be a string.'),
                new TextEncoder().encode(e)
              );
            }
            function b(e) {
              if (typeof e === 'bigint') return g(e);
              if (typeof e === 'number') return m(e);
              if (typeof e === 'string') return e.startsWith('0x') ? p(e) : y(e);
              if (l(e)) return e;
              throw new TypeError(`Unsupported value type: "${typeof e}".`);
            }
            (r.isBytes = l),
              (r.assertIsBytes = d),
              (r.bytesToHex = f),
              (r.bytesToBigInt = h),
              (r.bytesToSignedBigInt = function (e) {
                d(e);
                let t = BigInt(0);
                for (const r of e) t = (t << BigInt(8)) + BigInt(r);
                return BigInt.asIntN(8 * e.length, t);
              }),
              (r.bytesToNumber = function (e) {
                d(e);
                const t = h(e);
                return (
                  (0, i.assert)(
                    t <= BigInt(Number.MAX_SAFE_INTEGER),
                    'Number is not a safe integer. Use `bytesToBigInt` instead.'
                  ),
                  Number(t)
                );
              }),
              (r.bytesToString = function (e) {
                return d(e), new TextDecoder().decode(e);
              }),
              (r.bytesToBase64 = function (e) {
                return d(e), n.base64.encode(e);
              }),
              (r.hexToBytes = p),
              (r.bigIntToBytes = g),
              (r.signedBigIntToBytes = function (e, t) {
                (0, i.assert)(typeof e === 'bigint', 'Value must be a bigint.'),
                  (0, i.assert)(typeof t === 'number', 'Byte length must be a number.'),
                  (0, i.assert)(t > 0, 'Byte length must be greater than 0.'),
                  (0, i.assert)(
                    (function (e, t) {
                      (0, i.assert)(t > 0);
                      const r = e >> BigInt(31);
                      return !(((~e & r) + (e & ~r)) >> BigInt(8 * t - 1));
                    })(e, t),
                    'Byte length is too small to represent the given value.'
                  );
                let r = e;
                const n = new Uint8Array(t);
                for (let e = 0; e < n.length; e++)
                  (n[e] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
                return n.reverse();
              }),
              (r.numberToBytes = m),
              (r.stringToBytes = y),
              (r.base64ToBytes = function (e) {
                return (
                  (0, i.assert)(typeof e === 'string', 'Value must be a string.'),
                  n.base64.decode(e)
                );
              }),
              (r.valueToBytes = b),
              (r.concatBytes = function (e) {
                const t = new Array(e.length);
                let r = 0;
                for (let n = 0; n < e.length; n++) {
                  const i = b(e[n]);
                  (t[n] = i), (r += i.length);
                }
                const n = new Uint8Array(r);
                for (let e = 0, r = 0; e < t.length; e++) n.set(t[e], r), (r += t[e].length);
                return n;
              }),
              (r.createDataView = function (e) {
                if (void 0 !== t && e instanceof t) {
                  const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
                  return new DataView(t);
                }
                return new DataView(e.buffer, e.byteOffset, e.byteLength);
              });
          }).call(this);
        }).call(this, e('buffer').Buffer);
      },
      { './assert.cjs': 88, './hex.cjs': 97, '@scure/base': 114, buffer: 132 },
    ],
    91: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.toCaipAssetId =
            r.toCaipAssetType =
            r.toCaipAccountId =
            r.toCaipChainId =
            r.parseCaipAssetId =
            r.parseCaipAssetType =
            r.parseCaipAccountId =
            r.parseCaipChainId =
            r.isCaipAssetId =
            r.isCaipAssetType =
            r.isCaipTokenId =
            r.isCaipAssetReference =
            r.isCaipAssetNamespace =
            r.isCaipAccountAddress =
            r.isCaipAccountId =
            r.isCaipReference =
            r.isCaipNamespace =
            r.isCaipChainId =
            r.KnownCaipNamespace =
            r.CaipAssetTypeOrIdStruct =
            r.CaipAssetIdStruct =
            r.CaipAssetTypeStruct =
            r.CaipTokenIdStruct =
            r.CaipAssetReferenceStruct =
            r.CaipAssetNamespaceStruct =
            r.CaipAccountAddressStruct =
            r.CaipAccountIdStruct =
            r.CaipReferenceStruct =
            r.CaipNamespaceStruct =
            r.CaipChainIdStruct =
            r.CAIP_ASSET_ID_REGEX =
            r.CAIP_ASSET_TYPE_REGEX =
            r.CAIP_TOKEN_ID_REGEX =
            r.CAIP_ASSET_REFERENCE_REGEX =
            r.CAIP_ASSET_NAMESPACE_REGEX =
            r.CAIP_ACCOUNT_ADDRESS_REGEX =
            r.CAIP_ACCOUNT_ID_REGEX =
            r.CAIP_REFERENCE_REGEX =
            r.CAIP_NAMESPACE_REGEX =
            r.CAIP_CHAIN_ID_REGEX =
              void 0);
        const n = e('@metamask/superstruct');
        const i = e('./superstruct.cjs');
        (r.CAIP_CHAIN_ID_REGEX =
          /^(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})$/u),
          (r.CAIP_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u),
          (r.CAIP_REFERENCE_REGEX = /^[-_a-zA-Z0-9]{1,32}$/u),
          (r.CAIP_ACCOUNT_ID_REGEX =
            /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})):(?<accountAddress>[-.%a-zA-Z0-9]{1,128})$/u),
          (r.CAIP_ACCOUNT_ADDRESS_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u),
          (r.CAIP_ASSET_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u),
          (r.CAIP_ASSET_REFERENCE_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u),
          (r.CAIP_TOKEN_ID_REGEX = /^[-.%a-zA-Z0-9]{1,78}$/u),
          (r.CAIP_ASSET_TYPE_REGEX =
            /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u),
          (r.CAIP_ASSET_ID_REGEX =
            /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})\/(?<tokenId>[-.%a-zA-Z0-9]{1,78})$/u);
        function o(e) {
          return (0, n.is)(e, r.CaipNamespaceStruct);
        }
        function s(e) {
          return (0, n.is)(e, r.CaipReferenceStruct);
        }
        function a(e) {
          return (0, n.is)(e, r.CaipAccountAddressStruct);
        }
        function c(e) {
          return (0, n.is)(e, r.CaipAssetNamespaceStruct);
        }
        function u(e) {
          return (0, n.is)(e, r.CaipAssetReferenceStruct);
        }
        function l(e) {
          return (0, n.is)(e, r.CaipTokenIdStruct);
        }
        (r.CaipChainIdStruct = (0, i.definePattern)('CaipChainId', r.CAIP_CHAIN_ID_REGEX)),
          (r.CaipNamespaceStruct = (0, i.definePattern)('CaipNamespace', r.CAIP_NAMESPACE_REGEX)),
          (r.CaipReferenceStruct = (0, i.definePattern)('CaipReference', r.CAIP_REFERENCE_REGEX)),
          (r.CaipAccountIdStruct = (0, i.definePattern)('CaipAccountId', r.CAIP_ACCOUNT_ID_REGEX)),
          (r.CaipAccountAddressStruct = (0, i.definePattern)(
            'CaipAccountAddress',
            r.CAIP_ACCOUNT_ADDRESS_REGEX
          )),
          (r.CaipAssetNamespaceStruct = (0, i.definePattern)(
            'CaipAssetNamespace',
            r.CAIP_ASSET_NAMESPACE_REGEX
          )),
          (r.CaipAssetReferenceStruct = (0, i.definePattern)(
            'CaipAssetReference',
            r.CAIP_ASSET_REFERENCE_REGEX
          )),
          (r.CaipTokenIdStruct = (0, i.definePattern)('CaipTokenId', r.CAIP_TOKEN_ID_REGEX)),
          (r.CaipAssetTypeStruct = (0, i.definePattern)('CaipAssetType', r.CAIP_ASSET_TYPE_REGEX)),
          (r.CaipAssetIdStruct = (0, i.definePattern)('CaipAssetId', r.CAIP_ASSET_ID_REGEX)),
          (r.CaipAssetTypeOrIdStruct = (0, i.definePattern)(
            'CaipAssetTypeOrId',
            /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})(\/(?<tokenId>[-.%a-zA-Z0-9]{1,78}))?$/u
          )),
          (function (e) {
            (e.Bip122 = 'bip122'),
              (e.Solana = 'solana'),
              (e.Eip155 = 'eip155'),
              (e.Wallet = 'wallet');
          })(r.KnownCaipNamespace || (r.KnownCaipNamespace = {})),
          (r.isCaipChainId = function (e) {
            return (0, n.is)(e, r.CaipChainIdStruct);
          }),
          (r.isCaipNamespace = o),
          (r.isCaipReference = s),
          (r.isCaipAccountId = function (e) {
            return (0, n.is)(e, r.CaipAccountIdStruct);
          }),
          (r.isCaipAccountAddress = a),
          (r.isCaipAssetNamespace = c),
          (r.isCaipAssetReference = u),
          (r.isCaipTokenId = l),
          (r.isCaipAssetType = function (e) {
            return (0, n.is)(e, r.CaipAssetTypeStruct);
          }),
          (r.isCaipAssetId = function (e) {
            return (0, n.is)(e, r.CaipAssetIdStruct);
          }),
          (r.parseCaipChainId = function (e) {
            const t = r.CAIP_CHAIN_ID_REGEX.exec(e);
            if (!t?.groups) throw new Error('Invalid CAIP chain ID.');
            return { namespace: t.groups.namespace, reference: t.groups.reference };
          }),
          (r.parseCaipAccountId = function (e) {
            const t = r.CAIP_ACCOUNT_ID_REGEX.exec(e);
            if (!t?.groups) throw new Error('Invalid CAIP account ID.');
            return {
              address: t.groups.accountAddress,
              chainId: t.groups.chainId,
              chain: { namespace: t.groups.namespace, reference: t.groups.reference },
            };
          }),
          (r.parseCaipAssetType = function (e) {
            const t = r.CAIP_ASSET_TYPE_REGEX.exec(e);
            if (!t?.groups) throw new Error('Invalid CAIP asset type.');
            return {
              assetNamespace: t.groups.assetNamespace,
              assetReference: t.groups.assetReference,
              chainId: t.groups.chainId,
              chain: { namespace: t.groups.namespace, reference: t.groups.reference },
            };
          }),
          (r.parseCaipAssetId = function (e) {
            const t = r.CAIP_ASSET_ID_REGEX.exec(e);
            if (!t?.groups) throw new Error('Invalid CAIP asset ID.');
            return {
              assetNamespace: t.groups.assetNamespace,
              assetReference: t.groups.assetReference,
              tokenId: t.groups.tokenId,
              chainId: t.groups.chainId,
              chain: { namespace: t.groups.namespace, reference: t.groups.reference },
            };
          }),
          (r.toCaipChainId = function (e, t) {
            if (!o(e))
              throw new Error(
                `Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`
              );
            if (!s(t))
              throw new Error(
                `Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`
              );
            return `${e}:${t}`;
          }),
          (r.toCaipAccountId = function (e, t, n) {
            if (!o(e))
              throw new Error(
                `Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`
              );
            if (!s(t))
              throw new Error(
                `Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`
              );
            if (!a(n))
              throw new Error(
                `Invalid "accountAddress", must match: ${r.CAIP_ACCOUNT_ADDRESS_REGEX.toString()}`
              );
            return `${e}:${t}:${n}`;
          }),
          (r.toCaipAssetType = function (e, t, n, i) {
            if (!o(e))
              throw new Error(
                `Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`
              );
            if (!s(t))
              throw new Error(
                `Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`
              );
            if (!c(n))
              throw new Error(
                `Invalid "assetNamespace", must match: ${r.CAIP_ASSET_NAMESPACE_REGEX.toString()}`
              );
            if (!u(i))
              throw new Error(
                `Invalid "assetReference", must match: ${r.CAIP_ASSET_REFERENCE_REGEX.toString()}`
              );
            return `${e}:${t}/${n}:${i}`;
          }),
          (r.toCaipAssetId = function (e, t, n, i, a) {
            if (!o(e))
              throw new Error(
                `Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`
              );
            if (!s(t))
              throw new Error(
                `Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`
              );
            if (!c(n))
              throw new Error(
                `Invalid "assetNamespace", must match: ${r.CAIP_ASSET_NAMESPACE_REGEX.toString()}`
              );
            if (!u(i))
              throw new Error(
                `Invalid "assetReference", must match: ${r.CAIP_ASSET_REFERENCE_REGEX.toString()}`
              );
            if (!l(a))
              throw new Error(`Invalid "tokenId", must match: ${r.CAIP_TOKEN_ID_REGEX.toString()}`);
            return `${e}:${t}/${n}:${i}/${a}`;
          });
      },
      { './superstruct.cjs': 106, '@metamask/superstruct': 81 },
    ],
    92: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.ChecksumStruct = void 0);
        const n = e('@metamask/superstruct');
        const i = e('./base64.cjs');
        r.ChecksumStruct = (0, n.size)(
          (0, i.base64)((0, n.string)(), { paddingRequired: !0 }),
          44,
          44
        );
      },
      { './base64.cjs': 89, '@metamask/superstruct': 81 },
    ],
    93: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createHex = r.createBytes = r.createBigInt = r.createNumber = void 0);
        const n = e('@metamask/superstruct');
        const i = e('./assert.cjs');
        const o = e('./bytes.cjs');
        const s = e('./hex.cjs');
        const a = (0, n.union)([
          (0, n.number)(),
          (0, n.bigint)(),
          (0, n.string)(),
          s.StrictHexStruct,
        ]);
        const c = (0, n.coerce)((0, n.number)(), a, Number);
        const u = (0, n.coerce)((0, n.bigint)(), a, BigInt);
        const l =
          ((0, n.union)([s.StrictHexStruct, (0, n.instance)(Uint8Array)]),
          (0, n.coerce)(
            (0, n.instance)(Uint8Array),
            (0, n.union)([s.StrictHexStruct]),
            o.hexToBytes
          ));
        const d = (0, n.coerce)(s.StrictHexStruct, (0, n.instance)(Uint8Array), o.bytesToHex);
        (r.createNumber = function (e) {
          try {
            const t = (0, n.create)(e, c);
            return (
              (0, i.assert)(Number.isFinite(t), `Expected a number-like value, got "${e}".`), t
            );
          } catch (t) {
            if (t instanceof n.StructError)
              throw new Error(`Expected a number-like value, got "${e}".`);
            throw t;
          }
        }),
          (r.createBigInt = function (e) {
            try {
              return (0, n.create)(e, u);
            } catch (e) {
              if (e instanceof n.StructError)
                throw new Error(`Expected a number-like value, got "${String(e.value)}".`);
              throw e;
            }
          }),
          (r.createBytes = function (e) {
            if (typeof e === 'string' && e.toLowerCase() === '0x') return new Uint8Array();
            try {
              return (0, n.create)(e, l);
            } catch (e) {
              if (e instanceof n.StructError)
                throw new Error(`Expected a bytes-like value, got "${String(e.value)}".`);
              throw e;
            }
          }),
          (r.createHex = function (e) {
            if (
              (e instanceof Uint8Array && e.length === 0) ||
              (typeof e === 'string' && e.toLowerCase() === '0x')
            )
              return '0x';
            try {
              return (0, n.create)(e, d);
            } catch (e) {
              if (e instanceof n.StructError)
                throw new Error(`Expected a bytes-like value, got "${String(e.value)}".`);
              throw e;
            }
          });
      },
      { './assert.cjs': 88, './bytes.cjs': 90, './hex.cjs': 97, '@metamask/superstruct': 81 },
    ],
    94: [
      function (e, t, r) {
        'use strict';
        let n;
        let i;
        const o =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const s =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.FrozenSet = r.FrozenMap = void 0);
        class a {
          get size() {
            return o(this, n, 'f').size;
          }
          [((n = new WeakMap()), Symbol.iterator)]() {
            return o(this, n, 'f')[Symbol.iterator]();
          }
          constructor(e) {
            n.set(this, void 0), s(this, n, new Map(e), 'f'), Object.freeze(this);
          }
          entries() {
            return o(this, n, 'f').entries();
          }
          forEach(e, t) {
            return o(this, n, 'f').forEach((r, n, i) => e.call(t, r, n, this));
          }
          get(e) {
            return o(this, n, 'f').get(e);
          }
          has(e) {
            return o(this, n, 'f').has(e);
          }
          keys() {
            return o(this, n, 'f').keys();
          }
          values() {
            return o(this, n, 'f').values();
          }
          toString() {
            return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([e, t]) => `${String(e)} => ${String(t)}`).join(', ')} ` : ''}}`;
          }
        }
        r.FrozenMap = a;
        class c {
          get size() {
            return o(this, i, 'f').size;
          }
          [((i = new WeakMap()), Symbol.iterator)]() {
            return o(this, i, 'f')[Symbol.iterator]();
          }
          constructor(e) {
            i.set(this, void 0), s(this, i, new Set(e), 'f'), Object.freeze(this);
          }
          entries() {
            return o(this, i, 'f').entries();
          }
          forEach(e, t) {
            return o(this, i, 'f').forEach((r, n, i) => e.call(t, r, n, this));
          }
          has(e) {
            return o(this, i, 'f').has(e);
          }
          keys() {
            return o(this, i, 'f').keys();
          }
          values() {
            return o(this, i, 'f').values();
          }
          toString() {
            return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map(e => String(e)).join(', ')} ` : ''}}`;
          }
        }
        (r.FrozenSet = c),
          Object.freeze(a),
          Object.freeze(a.prototype),
          Object.freeze(c),
          Object.freeze(c.prototype);
      },
      {},
    ],
    95: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
      },
      {},
    ],
    96: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.wrapError =
            r.getErrorMessage =
            r.isErrorWithStack =
            r.isErrorWithMessage =
            r.isErrorWithCode =
              void 0);
        const n = e('pony-cause');
        const i = e('./misc.cjs');
        function o(e) {
          return typeof e === 'object' && e !== null && 'code' in e;
        }
        function s(e) {
          return typeof e === 'object' && e !== null && 'message' in e;
        }
        (r.isErrorWithCode = o),
          (r.isErrorWithMessage = s),
          (r.isErrorWithStack = function (e) {
            return typeof e === 'object' && e !== null && 'stack' in e;
          }),
          (r.getErrorMessage = function (e) {
            return s(e) && typeof e.message === 'string'
              ? e.message
              : (0, i.isNullOrUndefined)(e)
                ? ''
                : String(e);
          }),
          (r.wrapError = function (e, t) {
            if (
              (r = e) instanceof Error ||
              ((0, i.isObject)(r) && r.constructor.name === 'Error')
            ) {
              let r;
              return (
                (r =
                  Error.length === 2
                    ? new Error(t, { cause: e })
                    : new n.ErrorWithCause(t, { cause: e })),
                o(e) && (r.code = e.code),
                r
              );
            }
            let r;
            return t.length > 0 ? new Error(`${String(e)}: ${t}`) : new Error(String(e));
          });
      },
      { './misc.cjs': 102, 'pony-cause': 147 },
    ],
    97: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.remove0x =
            r.add0x =
            r.isValidChecksumAddress =
            r.getChecksumAddress =
            r.isValidHexAddress =
            r.assertIsStrictHexString =
            r.assertIsHexString =
            r.isStrictHexString =
            r.isHexString =
            r.HexChecksumAddressStruct =
            r.HexAddressStruct =
            r.StrictHexStruct =
            r.HexStruct =
              void 0);
        const n = e('@metamask/superstruct');
        const i = e('@noble/hashes/sha3');
        const o = e('./assert.cjs');
        const s = e('./bytes.cjs');
        function a(e) {
          return (0, n.is)(e, r.HexStruct);
        }
        function c(e) {
          return (0, n.is)(e, r.StrictHexStruct);
        }
        function u(e) {
          (0, o.assert)((0, n.is)(e, r.HexChecksumAddressStruct), 'Invalid hex address.');
          const t = d(e.toLowerCase());
          const a = d((0, s.bytesToHex)((0, i.keccak_256)(t)));
          return `0x${t
            .split('')
            .map((e, t) => {
              const r = a[t];
              return (
                (0, o.assert)((0, n.is)(r, (0, n.string)()), 'Hash shorter than address.'),
                parseInt(r, 16) > 7 ? e.toUpperCase() : e
              );
            })
            .join('')}`;
        }
        function l(e) {
          return !!(0, n.is)(e, r.HexChecksumAddressStruct) && u(e) === e;
        }
        function d(e) {
          return e.startsWith('0x') || e.startsWith('0X') ? e.substring(2) : e;
        }
        (r.HexStruct = (0, n.pattern)((0, n.string)(), /^(?:0x)?[0-9a-f]+$/iu)),
          (r.StrictHexStruct = (0, n.pattern)((0, n.string)(), /^0x[0-9a-f]+$/iu)),
          (r.HexAddressStruct = (0, n.pattern)((0, n.string)(), /^0x[0-9a-f]{40}$/u)),
          (r.HexChecksumAddressStruct = (0, n.pattern)((0, n.string)(), /^0x[0-9a-fA-F]{40}$/u)),
          (r.isHexString = a),
          (r.isStrictHexString = c),
          (r.assertIsHexString = function (e) {
            (0, o.assert)(a(e), 'Value must be a hexadecimal string.');
          }),
          (r.assertIsStrictHexString = function (e) {
            (0, o.assert)(c(e), 'Value must be a hexadecimal string, starting with "0x".');
          }),
          (r.isValidHexAddress = function (e) {
            return (0, n.is)(e, r.HexAddressStruct) || l(e);
          }),
          (r.getChecksumAddress = u),
          (r.isValidChecksumAddress = l),
          (r.add0x = function (e) {
            return e.startsWith('0x') ? e : e.startsWith('0X') ? `0x${e.substring(2)}` : `0x${e}`;
          }),
          (r.remove0x = d);
      },
      {
        './assert.cjs': 88,
        './bytes.cjs': 90,
        '@metamask/superstruct': 81,
        '@noble/hashes/sha3': 112,
      },
    ],
    98: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                let i = Object.getOwnPropertyDescriptor(t, r);
                (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              });
        const i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (const r in e)
              r === 'default' || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(e('./assert.cjs'), r),
          i(e('./base64.cjs'), r),
          i(e('./bytes.cjs'), r),
          i(e('./caip-types.cjs'), r),
          i(e('./checksum.cjs'), r),
          i(e('./coercers.cjs'), r),
          i(e('./collections.cjs'), r),
          i(e('./encryption-types.cjs'), r),
          i(e('./errors.cjs'), r),
          i(e('./hex.cjs'), r),
          i(e('./json.cjs'), r),
          i(e('./keyring.cjs'), r),
          i(e('./logging.cjs'), r),
          i(e('./misc.cjs'), r),
          i(e('./number.cjs'), r),
          i(e('./opaque.cjs'), r),
          i(e('./promise.cjs'), r),
          i(e('./superstruct.cjs'), r),
          i(e('./time.cjs'), r),
          i(e('./transaction-types.cjs'), r),
          i(e('./versions.cjs'), r);
      },
      {
        './assert.cjs': 88,
        './base64.cjs': 89,
        './bytes.cjs': 90,
        './caip-types.cjs': 91,
        './checksum.cjs': 92,
        './coercers.cjs': 93,
        './collections.cjs': 94,
        './encryption-types.cjs': 95,
        './errors.cjs': 96,
        './hex.cjs': 97,
        './json.cjs': 99,
        './keyring.cjs': 100,
        './logging.cjs': 101,
        './misc.cjs': 102,
        './number.cjs': 103,
        './opaque.cjs': 104,
        './promise.cjs': 105,
        './superstruct.cjs': 106,
        './time.cjs': 107,
        './transaction-types.cjs': 108,
        './versions.cjs': 109,
      },
    ],
    99: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getJsonRpcIdValidator =
            r.assertIsJsonRpcError =
            r.isJsonRpcError =
            r.assertIsJsonRpcFailure =
            r.isJsonRpcFailure =
            r.assertIsJsonRpcSuccess =
            r.isJsonRpcSuccess =
            r.assertIsJsonRpcResponse =
            r.isJsonRpcResponse =
            r.assertIsPendingJsonRpcResponse =
            r.isPendingJsonRpcResponse =
            r.JsonRpcResponseStruct =
            r.JsonRpcFailureStruct =
            r.JsonRpcSuccessStruct =
            r.PendingJsonRpcResponseStruct =
            r.assertIsJsonRpcRequest =
            r.isJsonRpcRequest =
            r.assertIsJsonRpcNotification =
            r.isJsonRpcNotification =
            r.JsonRpcNotificationStruct =
            r.JsonRpcRequestStruct =
            r.JsonRpcParamsStruct =
            r.JsonRpcErrorStruct =
            r.JsonRpcIdStruct =
            r.JsonRpcVersionStruct =
            r.jsonrpc2 =
            r.getJsonSize =
            r.getSafeJson =
            r.isValidJson =
            r.JsonStruct =
            r.UnsafeJsonStruct =
            r.exactOptional =
            r.object =
              void 0);
        const n = e('@metamask/superstruct');
        const i = e('./assert.cjs');
        const o = e('./misc.cjs');
        function s({ path: e, branch: t }) {
          const r = e[e.length - 1];
          return (0, o.hasProperty)(t[t.length - 2], r);
        }
        function a(e) {
          return new n.Struct({
            ...e,
            type: `optional ${e.type}`,
            validator: (t, r) => !s(r) || e.validator(t, r),
            refiner: (t, r) => !s(r) || e.refiner(t, r),
          });
        }
        function c(e) {
          if (e === null || typeof e === 'boolean' || typeof e === 'string') return !0;
          if (typeof e === 'number' && Number.isFinite(e)) return !0;
          if (typeof e === 'object') {
            let t = !0;
            if (Array.isArray(e)) {
              for (let r = 0; r < e.length; r++)
                if (!c(e[r])) {
                  t = !1;
                  break;
                }
              return t;
            }
            const r = Object.entries(e);
            for (let e = 0; e < r.length; e++)
              if (typeof r[e][0] !== 'string' || !c(r[e][1])) {
                t = !1;
                break;
              }
            return t;
          }
          return !1;
        }
        function u(e) {
          return (0, n.create)(e, r.JsonStruct);
        }
        (r.object = e => (0, n.object)(e)),
          (r.exactOptional = a),
          (r.UnsafeJsonStruct = (0, n.define)('JSON', e => c(e))),
          (r.JsonStruct = (0, n.coerce)(
            r.UnsafeJsonStruct,
            (0, n.refine)((0, n.any)(), 'JSON', e => (0, n.is)(e, r.UnsafeJsonStruct)),
            e =>
              JSON.parse(
                JSON.stringify(e, (e, t) => {
                  if (e !== '__proto__' && e !== 'constructor') return t;
                })
              )
          )),
          (r.isValidJson = function (e) {
            try {
              return u(e), !0;
            } catch {
              return !1;
            }
          }),
          (r.getSafeJson = u),
          (r.getJsonSize = function (e) {
            (0, i.assertStruct)(e, r.JsonStruct, 'Invalid JSON value');
            const t = JSON.stringify(e);
            return new TextEncoder().encode(t).byteLength;
          }),
          (r.jsonrpc2 = '2.0'),
          (r.JsonRpcVersionStruct = (0, n.literal)(r.jsonrpc2)),
          (r.JsonRpcIdStruct = (0, n.nullable)((0, n.union)([(0, n.number)(), (0, n.string)()]))),
          (r.JsonRpcErrorStruct = (0, r.object)({
            code: (0, n.integer)(),
            message: (0, n.string)(),
            data: a(r.JsonStruct),
            stack: a((0, n.string)()),
          })),
          (r.JsonRpcParamsStruct = (0, n.union)([
            (0, n.record)((0, n.string)(), r.JsonStruct),
            (0, n.array)(r.JsonStruct),
          ])),
          (r.JsonRpcRequestStruct = (0, r.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            method: (0, n.string)(),
            params: a(r.JsonRpcParamsStruct),
          })),
          (r.JsonRpcNotificationStruct = (0, r.object)({
            jsonrpc: r.JsonRpcVersionStruct,
            method: (0, n.string)(),
            params: a(r.JsonRpcParamsStruct),
          })),
          (r.isJsonRpcNotification = function (e) {
            return (0, n.is)(e, r.JsonRpcNotificationStruct);
          }),
          (r.assertIsJsonRpcNotification = function (e, t) {
            (0, i.assertStruct)(e, r.JsonRpcNotificationStruct, 'Invalid JSON-RPC notification', t);
          }),
          (r.isJsonRpcRequest = function (e) {
            return (0, n.is)(e, r.JsonRpcRequestStruct);
          }),
          (r.assertIsJsonRpcRequest = function (e, t) {
            (0, i.assertStruct)(e, r.JsonRpcRequestStruct, 'Invalid JSON-RPC request', t);
          }),
          (r.PendingJsonRpcResponseStruct = (0, n.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            result: (0, n.optional)((0, n.unknown)()),
            error: (0, n.optional)(r.JsonRpcErrorStruct),
          })),
          (r.JsonRpcSuccessStruct = (0, r.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            result: r.JsonStruct,
          })),
          (r.JsonRpcFailureStruct = (0, r.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            error: r.JsonRpcErrorStruct,
          })),
          (r.JsonRpcResponseStruct = (0, n.union)([
            r.JsonRpcSuccessStruct,
            r.JsonRpcFailureStruct,
          ])),
          (r.isPendingJsonRpcResponse = function (e) {
            return (0, n.is)(e, r.PendingJsonRpcResponseStruct);
          }),
          (r.assertIsPendingJsonRpcResponse = function (e, t) {
            (0, i.assertStruct)(
              e,
              r.PendingJsonRpcResponseStruct,
              'Invalid pending JSON-RPC response',
              t
            );
          }),
          (r.isJsonRpcResponse = function (e) {
            return (0, n.is)(e, r.JsonRpcResponseStruct);
          }),
          (r.assertIsJsonRpcResponse = function (e, t) {
            (0, i.assertStruct)(e, r.JsonRpcResponseStruct, 'Invalid JSON-RPC response', t);
          }),
          (r.isJsonRpcSuccess = function (e) {
            return (0, n.is)(e, r.JsonRpcSuccessStruct);
          }),
          (r.assertIsJsonRpcSuccess = function (e, t) {
            (0, i.assertStruct)(e, r.JsonRpcSuccessStruct, 'Invalid JSON-RPC success response', t);
          }),
          (r.isJsonRpcFailure = function (e) {
            return (0, n.is)(e, r.JsonRpcFailureStruct);
          }),
          (r.assertIsJsonRpcFailure = function (e, t) {
            (0, i.assertStruct)(e, r.JsonRpcFailureStruct, 'Invalid JSON-RPC failure response', t);
          }),
          (r.isJsonRpcError = function (e) {
            return (0, n.is)(e, r.JsonRpcErrorStruct);
          }),
          (r.assertIsJsonRpcError = function (e, t) {
            (0, i.assertStruct)(e, r.JsonRpcErrorStruct, 'Invalid JSON-RPC error', t);
          }),
          (r.getJsonRpcIdValidator = function (e) {
            const {
              permitEmptyString: t,
              permitFractions: r,
              permitNull: n,
            } = { permitEmptyString: !0, permitFractions: !1, permitNull: !0, ...e };
            return e =>
              Boolean(
                (typeof e === 'number' && (r || Number.isInteger(e))) ||
                  (typeof e === 'string' && (t || e.length > 0)) ||
                  (n && e === null)
              );
          });
      },
      { './assert.cjs': 88, './misc.cjs': 102, '@metamask/superstruct': 81 },
    ],
    100: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
      },
      {},
    ],
    101: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createModuleLogger = r.createProjectLogger = void 0);
        const i = (0, n(e('debug')).default)('metamask');
        (r.createProjectLogger = function (e) {
          return i.extend(e);
        }),
          (r.createModuleLogger = function (e, t) {
            return e.extend(t);
          });
      },
      { debug: 135 },
    ],
    102: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.calculateNumberSize =
            r.calculateStringSize =
            r.isASCII =
            r.isPlainObject =
            r.ESCAPE_CHARACTERS_REGEXP =
            r.JsonSize =
            r.getKnownPropertyNames =
            r.hasProperty =
            r.isObject =
            r.isNullOrUndefined =
            r.isNonEmptyArray =
              void 0),
          (r.isNonEmptyArray = function (e) {
            return Array.isArray(e) && e.length > 0;
          }),
          (r.isNullOrUndefined = function (e) {
            return e == null;
          }),
          (r.isObject = function (e) {
            return Boolean(e) && typeof e === 'object' && !Array.isArray(e);
          });
        function n(e) {
          return e.charCodeAt(0) <= 127;
        }
        (r.hasProperty = (e, t) => Object.hasOwnProperty.call(e, t)),
          (r.getKnownPropertyNames = function (e) {
            return Object.getOwnPropertyNames(e);
          }),
          (function (e) {
            (e[(e.Null = 4)] = 'Null'),
              (e[(e.Comma = 1)] = 'Comma'),
              (e[(e.Wrapper = 1)] = 'Wrapper'),
              (e[(e.True = 4)] = 'True'),
              (e[(e.False = 5)] = 'False'),
              (e[(e.Quote = 1)] = 'Quote'),
              (e[(e.Colon = 1)] = 'Colon'),
              (e[(e.Date = 24)] = 'Date');
          })(r.JsonSize || (r.JsonSize = {})),
          (r.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu),
          (r.isPlainObject = function (e) {
            if (typeof e !== 'object' || e === null) return !1;
            try {
              let t = e;
              for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
              return Object.getPrototypeOf(e) === t;
            } catch (e) {
              return !1;
            }
          }),
          (r.isASCII = n),
          (r.calculateStringSize = function (e) {
            return (
              e.split('').reduce((e, t) => (n(t) ? e + 1 : e + 2), 0) +
              (e.match(r.ESCAPE_CHARACTERS_REGEXP) ?? []).length
            );
          }),
          (r.calculateNumberSize = function (e) {
            return e.toString().length;
          });
      },
      {},
    ],
    103: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.hexToBigInt = r.hexToNumber = r.bigIntToHex = r.numberToHex = void 0);
        const n = e('./assert.cjs');
        const i = e('./hex.cjs');
        r.numberToHex = e => (
          (0, n.assert)(typeof e === 'number', 'Value must be a number.'),
          (0, n.assert)(e >= 0, 'Value must be a non-negative number.'),
          (0, n.assert)(
            Number.isSafeInteger(e),
            'Value is not a safe integer. Use `bigIntToHex` instead.'
          ),
          (0, i.add0x)(e.toString(16))
        );
        r.bigIntToHex = e => (
          (0, n.assert)(typeof e === 'bigint', 'Value must be a bigint.'),
          (0, n.assert)(e >= 0, 'Value must be a non-negative bigint.'),
          (0, i.add0x)(e.toString(16))
        );
        r.hexToNumber = e => {
          (0, i.assertIsHexString)(e);
          const t = parseInt(e, 16);
          return (
            (0, n.assert)(
              Number.isSafeInteger(t),
              'Value is not a safe integer. Use `hexToBigInt` instead.'
            ),
            t
          );
        };
        r.hexToBigInt = e => ((0, i.assertIsHexString)(e), BigInt((0, i.add0x)(e)));
      },
      { './assert.cjs': 88, './hex.cjs': 97 },
    ],
    104: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
      },
      {},
    ],
    105: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.createDeferredPromise = void 0),
          (r.createDeferredPromise = function ({ suppressUnhandledRejection: e = !1 } = {}) {
            let t, r;
            const n = new Promise((e, n) => {
              (t = e), (r = n);
            });
            return e && n.catch(e => {}), { promise: n, resolve: t, reject: r };
          });
      },
      {},
    ],
    106: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.definePattern = void 0);
        const n = e('@metamask/superstruct');
        r.definePattern = function (e, t) {
          return (0, n.define)(e, e => typeof e === 'string' && t.test(e));
        };
      },
      { '@metamask/superstruct': 81 },
    ],
    107: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.timeSince = r.inMilliseconds = r.Duration = void 0),
          (function (e) {
            (e[(e.Millisecond = 1)] = 'Millisecond'),
              (e[(e.Second = 1e3)] = 'Second'),
              (e[(e.Minute = 6e4)] = 'Minute'),
              (e[(e.Hour = 36e5)] = 'Hour'),
              (e[(e.Day = 864e5)] = 'Day'),
              (e[(e.Week = 6048e5)] = 'Week'),
              (e[(e.Year = 31536e6)] = 'Year');
          })(r.Duration || (r.Duration = {}));
        const n = (e, t) => {
          if (!(e => Number.isInteger(e) && e >= 0)(e))
            throw new Error(`"${t}" must be a non-negative integer. Received: "${e}".`);
        };
        (r.inMilliseconds = function (e, t) {
          return n(e, 'count'), e * t;
        }),
          (r.timeSince = function (e) {
            return n(e, 'timestamp'), Date.now() - e;
          });
      },
      {},
    ],
    108: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
      },
      {},
    ],
    109: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.satisfiesVersionRange =
            r.gtRange =
            r.gtVersion =
            r.assertIsSemVerRange =
            r.assertIsSemVerVersion =
            r.isValidSemVerRange =
            r.isValidSemVerVersion =
            r.VersionRangeStruct =
            r.VersionStruct =
              void 0);
        const n = e('@metamask/superstruct');
        const i = e('semver');
        const o = e('./assert.cjs');
        (r.VersionStruct = (0, n.refine)(
          (0, n.string)(),
          'Version',
          e => (0, i.valid)(e) !== null || `Expected SemVer version, got "${e}"`
        )),
          (r.VersionRangeStruct = (0, n.refine)(
            (0, n.string)(),
            'Version range',
            e => (0, i.validRange)(e) !== null || `Expected SemVer range, got "${e}"`
          )),
          (r.isValidSemVerVersion = function (e) {
            return (0, n.is)(e, r.VersionStruct);
          }),
          (r.isValidSemVerRange = function (e) {
            return (0, n.is)(e, r.VersionRangeStruct);
          }),
          (r.assertIsSemVerVersion = function (e) {
            (0, o.assertStruct)(e, r.VersionStruct);
          }),
          (r.assertIsSemVerRange = function (e) {
            (0, o.assertStruct)(e, r.VersionRangeStruct);
          }),
          (r.gtVersion = function (e, t) {
            return (0, i.gt)(e, t);
          }),
          (r.gtRange = function (e, t) {
            return (0, i.gtr)(e, t);
          }),
          (r.satisfiesVersionRange = function (e, t) {
            return (0, i.satisfies)(e, t, { includePrerelease: !0 });
          });
      },
      { './assert.cjs': 88, '@metamask/superstruct': 81, semver: 194 },
    ],
    110: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.toBig =
            r.shrSL =
            r.shrSH =
            r.rotrSL =
            r.rotrSH =
            r.rotrBL =
            r.rotrBH =
            r.rotr32L =
            r.rotr32H =
            r.rotlSL =
            r.rotlSH =
            r.rotlBL =
            r.rotlBH =
            r.add5L =
            r.add5H =
            r.add4L =
            r.add4H =
            r.add3L =
            r.add3H =
              void 0),
          (r.add = v),
          (r.fromBig = o),
          (r.split = s);
        const n = BigInt(2 ** 32 - 1);
        const i = BigInt(32);
        function o(e, t = !1) {
          return t
            ? { h: Number(e & n), l: Number((e >> i) & n) }
            : { h: 0 | Number((e >> i) & n), l: 0 | Number(e & n) };
        }
        function s(e, t = !1) {
          const r = e.length;
          const n = new Uint32Array(r);
          const i = new Uint32Array(r);
          for (let s = 0; s < r; s++) {
            const { h: r, l: a } = o(e[s], t);
            [n[s], i[s]] = [r, a];
          }
          return [n, i];
        }
        const a = (e, t) => (BigInt(e >>> 0) << i) | BigInt(t >>> 0);
        r.toBig = a;
        const c = (e, t, r) => e >>> r;
        r.shrSH = c;
        const u = (e, t, r) => (e << (32 - r)) | (t >>> r);
        r.shrSL = u;
        const l = (e, t, r) => (e >>> r) | (t << (32 - r));
        r.rotrSH = l;
        const d = (e, t, r) => (e << (32 - r)) | (t >>> r);
        r.rotrSL = d;
        const f = (e, t, r) => (e << (64 - r)) | (t >>> (r - 32));
        r.rotrBH = f;
        const h = (e, t, r) => (e >>> (r - 32)) | (t << (64 - r));
        r.rotrBL = h;
        const p = (e, t) => t;
        r.rotr32H = p;
        const g = (e, t) => e;
        r.rotr32L = g;
        const m = (e, t, r) => (e << r) | (t >>> (32 - r));
        r.rotlSH = m;
        const y = (e, t, r) => (t << r) | (e >>> (32 - r));
        r.rotlSL = y;
        const b = (e, t, r) => (t << (r - 32)) | (e >>> (64 - r));
        r.rotlBH = b;
        const w = (e, t, r) => (e << (r - 32)) | (t >>> (64 - r));
        function v(e, t, r, n) {
          const i = (t >>> 0) + (n >>> 0);
          return { h: (e + r + ((i / 2 ** 32) | 0)) | 0, l: 0 | i };
        }
        r.rotlBL = w;
        const E = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0);
        r.add3L = E;
        const _ = (e, t, r, n) => (t + r + n + ((e / 2 ** 32) | 0)) | 0;
        r.add3H = _;
        const M = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0);
        r.add4L = M;
        const S = (e, t, r, n, i) => (t + r + n + i + ((e / 2 ** 32) | 0)) | 0;
        r.add4H = S;
        const j = (e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0);
        r.add5L = j;
        const I = (e, t, r, n, i, o) => (t + r + n + i + o + ((e / 2 ** 32) | 0)) | 0;
        r.add5H = I;
        const A = {
          fromBig: o,
          split: s,
          toBig: a,
          shrSH: c,
          shrSL: u,
          rotrSH: l,
          rotrSL: d,
          rotrBH: f,
          rotrBL: h,
          rotr32H: p,
          rotr32L: g,
          rotlSH: m,
          rotlSL: y,
          rotlBH: b,
          rotlBL: w,
          add: v,
          add3L: E,
          add3H: _,
          add4L: M,
          add4H: S,
          add5H: I,
          add5L: j,
        };
        r.default = A;
      },
      {},
    ],
    111: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.crypto = void 0),
          (r.crypto =
            typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : void 0);
      },
      {},
    ],
    112: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.shake256 =
            r.shake128 =
            r.keccak_512 =
            r.keccak_384 =
            r.keccak_256 =
            r.keccak_224 =
            r.sha3_512 =
            r.sha3_384 =
            r.sha3_256 =
            r.sha3_224 =
            r.Keccak =
              void 0),
          (r.keccakP = w);
        const n = e('./_u64.js');
        const i = e('./utils.js');
        const o = BigInt(0);
        const s = BigInt(1);
        const a = BigInt(2);
        const c = BigInt(7);
        const u = BigInt(256);
        const l = BigInt(113);
        const d = [];
        const f = [];
        const h = [];
        for (let e = 0, t = s, r = 1, n = 0; e < 24; e++) {
          ([r, n] = [n, (2 * r + 3 * n) % 5]),
            d.push(2 * (5 * n + r)),
            f.push((((e + 1) * (e + 2)) / 2) % 64);
          let i = o;
          for (let e = 0; e < 7; e++)
            (t = ((t << s) ^ ((t >> c) * l)) % u), t & a && (i ^= s << ((s << BigInt(e)) - s));
          h.push(i);
        }
        const p = (0, n.split)(h, !0);
        const g = p[0];
        const m = p[1];
        const y = (e, t, r) => (r > 32 ? (0, n.rotlBH)(e, t, r) : (0, n.rotlSH)(e, t, r));
        const b = (e, t, r) => (r > 32 ? (0, n.rotlBL)(e, t, r) : (0, n.rotlSL)(e, t, r));
        function w(e, t = 24) {
          const r = new Uint32Array(10);
          for (let n = 24 - t; n < 24; n++) {
            for (let t = 0; t < 10; t++)
              r[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
            for (let t = 0; t < 10; t += 2) {
              const n = (t + 8) % 10;
              const i = (t + 2) % 10;
              const o = r[i];
              const s = r[i + 1];
              const a = y(o, s, 1) ^ r[n];
              const c = b(o, s, 1) ^ r[n + 1];
              for (let r = 0; r < 50; r += 10) (e[t + r] ^= a), (e[t + r + 1] ^= c);
            }
            let t = e[2];
            let i = e[3];
            for (let r = 0; r < 24; r++) {
              const n = f[r];
              const o = y(t, i, n);
              const s = b(t, i, n);
              const a = d[r];
              (t = e[a]), (i = e[a + 1]), (e[a] = o), (e[a + 1] = s);
            }
            for (let t = 0; t < 50; t += 10) {
              for (let n = 0; n < 10; n++) r[n] = e[t + n];
              for (let n = 0; n < 10; n++) e[t + n] ^= ~r[(n + 2) % 10] & r[(n + 4) % 10];
            }
            (e[0] ^= g[n]), (e[1] ^= m[n]);
          }
          (0, i.clean)(r);
        }
        class v extends i.Hash {
          constructor(e, t, r, n = !1, o = 24) {
            if (
              (super(),
              (this.pos = 0),
              (this.posOut = 0),
              (this.finished = !1),
              (this.destroyed = !1),
              (this.enableXOF = !1),
              (this.blockLen = e),
              (this.suffix = t),
              (this.outputLen = r),
              (this.enableXOF = n),
              (this.rounds = o),
              (0, i.anumber)(r),
              !(e > 0 && e < 200))
            )
              throw new Error('only keccak-f1600 function is supported');
            (this.state = new Uint8Array(200)), (this.state32 = (0, i.u32)(this.state));
          }
          clone() {
            return this._cloneInto();
          }
          keccak() {
            (0, i.swap32IfBE)(this.state32),
              w(this.state32, this.rounds),
              (0, i.swap32IfBE)(this.state32),
              (this.posOut = 0),
              (this.pos = 0);
          }
          update(e) {
            (0, i.aexists)(this), (e = (0, i.toBytes)(e)), (0, i.abytes)(e);
            const { blockLen: t, state: r } = this;
            const n = e.length;
            for (let i = 0; i < n; ) {
              const o = Math.min(t - this.pos, n - i);
              for (let t = 0; t < o; t++) r[this.pos++] ^= e[i++];
              this.pos === t && this.keccak();
            }
            return this;
          }
          finish() {
            if (this.finished) return;
            this.finished = !0;
            const { state: e, suffix: t, pos: r, blockLen: n } = this;
            (e[r] ^= t), 128 & t && r === n - 1 && this.keccak(), (e[n - 1] ^= 128), this.keccak();
          }
          writeInto(e) {
            (0, i.aexists)(this, !1), (0, i.abytes)(e), this.finish();
            const t = this.state;
            const { blockLen: r } = this;
            for (let n = 0, i = e.length; n < i; ) {
              this.posOut >= r && this.keccak();
              const o = Math.min(r - this.posOut, i - n);
              e.set(t.subarray(this.posOut, this.posOut + o), n), (this.posOut += o), (n += o);
            }
            return e;
          }
          xofInto(e) {
            if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
            return this.writeInto(e);
          }
          xof(e) {
            return (0, i.anumber)(e), this.xofInto(new Uint8Array(e));
          }
          digestInto(e) {
            if (((0, i.aoutput)(e, this), this.finished))
              throw new Error('digest() was already called');
            return this.writeInto(e), this.destroy(), e;
          }
          digest() {
            return this.digestInto(new Uint8Array(this.outputLen));
          }
          destroy() {
            (this.destroyed = !0), (0, i.clean)(this.state);
          }
          _cloneInto(e) {
            const { blockLen: t, suffix: r, outputLen: n, rounds: i, enableXOF: o } = this;
            return (
              e || (e = new v(t, r, n, o, i)),
              e.state32.set(this.state32),
              (e.pos = this.pos),
              (e.posOut = this.posOut),
              (e.finished = this.finished),
              (e.rounds = i),
              (e.suffix = r),
              (e.outputLen = n),
              (e.enableXOF = o),
              (e.destroyed = this.destroyed),
              e
            );
          }
        }
        r.Keccak = v;
        const E = (e, t, r) => (0, i.createHasher)(() => new v(t, e, r));
        (r.sha3_224 = E(6, 144, 28)),
          (r.sha3_256 = E(6, 136, 32)),
          (r.sha3_384 = E(6, 104, 48)),
          (r.sha3_512 = E(6, 72, 64)),
          (r.keccak_224 = E(1, 144, 28)),
          (r.keccak_256 = E(1, 136, 32)),
          (r.keccak_384 = E(1, 104, 48)),
          (r.keccak_512 = E(1, 72, 64));
        const _ = (e, t, r) =>
          (0, i.createXOFer)((n = {}) => new v(t, e, void 0 === n.dkLen ? r : n.dkLen, !0));
        (r.shake128 = _(31, 168, 16)), (r.shake256 = _(31, 136, 32));
      },
      { './_u64.js': 110, './utils.js': 113 },
    ],
    113: [
      function (e, t, r) {
        'use strict';
        /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ Object.defineProperty(
          r,
          '__esModule',
          { value: !0 }
        ),
          (r.wrapXOFConstructorWithOpts =
            r.wrapConstructorWithOpts =
            r.wrapConstructor =
            r.Hash =
            r.nextTick =
            r.swap32IfBE =
            r.byteSwapIfBE =
            r.swap8IfBE =
            r.isLE =
              void 0),
          (r.isBytes = i),
          (r.anumber = o),
          (r.abytes = s),
          (r.ahash = function (e) {
            if (typeof e !== 'function' || typeof e.create !== 'function')
              throw new Error('Hash should be wrapped by utils.createHasher');
            o(e.outputLen), o(e.blockLen);
          }),
          (r.aexists = function (e, t = !0) {
            if (e.destroyed) throw new Error('Hash instance has been destroyed');
            if (t && e.finished) throw new Error('Hash#digest() has already been called');
          }),
          (r.aoutput = function (e, t) {
            s(e);
            const r = t.outputLen;
            if (e.length < r)
              throw new Error('digestInto() expects output buffer of length at least ' + r);
          }),
          (r.u8 = function (e) {
            return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
          }),
          (r.u32 = function (e) {
            return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
          }),
          (r.clean = function (...e) {
            for (let t = 0; t < e.length; t++) e[t].fill(0);
          }),
          (r.createView = function (e) {
            return new DataView(e.buffer, e.byteOffset, e.byteLength);
          }),
          (r.rotr = function (e, t) {
            return (e << (32 - t)) | (e >>> t);
          }),
          (r.rotl = function (e, t) {
            return (e << t) | ((e >>> (32 - t)) >>> 0);
          }),
          (r.byteSwap = a),
          (r.byteSwap32 = c),
          (r.bytesToHex = function (e) {
            if ((s(e), u)) return e.toHex();
            let t = '';
            for (let r = 0; r < e.length; r++) t += l[e[r]];
            return t;
          }),
          (r.hexToBytes = function (e) {
            if (typeof e !== 'string') throw new Error('hex string expected, got ' + typeof e);
            if (u) return Uint8Array.fromHex(e);
            const t = e.length;
            const r = t / 2;
            if (t % 2) throw new Error('hex string expected, got unpadded hex of length ' + t);
            const n = new Uint8Array(r);
            for (let t = 0, i = 0; t < r; t++, i += 2) {
              const r = f(e.charCodeAt(i));
              const o = f(e.charCodeAt(i + 1));
              if (void 0 === r || void 0 === o) {
                const t = e[i] + e[i + 1];
                throw new Error(
                  'hex string expected, got non-hex character "' + t + '" at index ' + i
                );
              }
              n[t] = 16 * r + o;
            }
            return n;
          }),
          (r.asyncLoop = async function (e, t, n) {
            let i = Date.now();
            for (let o = 0; o < e; o++) {
              n(o);
              const e = Date.now() - i;
              (e >= 0 && e < t) || (await (0, r.nextTick)(), (i += e));
            }
          }),
          (r.utf8ToBytes = h),
          (r.bytesToUtf8 = function (e) {
            return new TextDecoder().decode(e);
          }),
          (r.toBytes = p),
          (r.kdfInputToBytes = function (e) {
            typeof e === 'string' && (e = h(e));
            return s(e), e;
          }),
          (r.concatBytes = function (...e) {
            let t = 0;
            for (let r = 0; r < e.length; r++) {
              const n = e[r];
              s(n), (t += n.length);
            }
            const r = new Uint8Array(t);
            for (let t = 0, n = 0; t < e.length; t++) {
              const i = e[t];
              r.set(i, n), (n += i.length);
            }
            return r;
          }),
          (r.checkOpts = function (e, t) {
            if (void 0 !== t && {}.toString.call(t) !== '[object Object]')
              throw new Error('options should be object or undefined');
            return Object.assign(e, t);
          }),
          (r.createHasher = g),
          (r.createOptHasher = m),
          (r.createXOFer = y),
          (r.randomBytes = function (e = 32) {
            if (n.crypto && typeof n.crypto.getRandomValues === 'function')
              return n.crypto.getRandomValues(new Uint8Array(e));
            if (n.crypto && typeof n.crypto.randomBytes === 'function')
              return Uint8Array.from(n.crypto.randomBytes(e));
            throw new Error('crypto.getRandomValues must be defined');
          });
        const n = e('@noble/hashes/crypto');
        function i(e) {
          return (
            e instanceof Uint8Array ||
            (ArrayBuffer.isView(e) && e.constructor.name === 'Uint8Array')
          );
        }
        function o(e) {
          if (!Number.isSafeInteger(e) || e < 0)
            throw new Error('positive integer expected, got ' + e);
        }
        function s(e, ...t) {
          if (!i(e)) throw new Error('Uint8Array expected');
          if (t.length > 0 && !t.includes(e.length))
            throw new Error('Uint8Array expected of length ' + t + ', got length=' + e.length);
        }
        function a(e) {
          return (
            ((e << 24) & 4278190080) |
            ((e << 8) & 16711680) |
            ((e >>> 8) & 65280) |
            ((e >>> 24) & 255)
          );
        }
        function c(e) {
          for (let t = 0; t < e.length; t++) e[t] = a(e[t]);
          return e;
        }
        (r.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68),
          (r.swap8IfBE = r.isLE ? e => e : e => a(e)),
          (r.byteSwapIfBE = r.swap8IfBE),
          (r.swap32IfBE = r.isLE ? e => e : c);
        const u = (() =>
          typeof Uint8Array.from([]).toHex === 'function' &&
          typeof Uint8Array.fromHex === 'function')();
        const l = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, '0'));
        const d = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
        function f(e) {
          return e >= d._0 && e <= d._9
            ? e - d._0
            : e >= d.A && e <= d.F
              ? e - (d.A - 10)
              : e >= d.a && e <= d.f
                ? e - (d.a - 10)
                : void 0;
        }
        function h(e) {
          if (typeof e !== 'string') throw new Error('string expected');
          return new Uint8Array(new TextEncoder().encode(e));
        }
        function p(e) {
          return typeof e === 'string' && (e = h(e)), s(e), e;
        }
        r.nextTick = async () => {};
        function g(e) {
          const t = t => e().update(p(t)).digest();
          const r = e();
          return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = () => e()), t;
        }
        function m(e) {
          const t = (t, r) => e(r).update(p(t)).digest();
          const r = e({});
          return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = t => e(t)), t;
        }
        function y(e) {
          const t = (t, r) => e(r).update(p(t)).digest();
          const r = e({});
          return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = t => e(t)), t;
        }
        (r.Hash = class {}),
          (r.wrapConstructor = g),
          (r.wrapConstructorWithOpts = m),
          (r.wrapXOFConstructorWithOpts = y);
      },
      { '@noble/hashes/crypto': 111 },
    ],
    114: [
      function (e, t, r) {
        'use strict';
        /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function n(e) {
          return (
            e instanceof Uint8Array ||
            (ArrayBuffer.isView(e) && e.constructor.name === 'Uint8Array')
          );
        }
        function i(e, ...t) {
          if (!n(e)) throw new Error('Uint8Array expected');
          if (t.length > 0 && !t.includes(e.length))
            throw new Error('Uint8Array expected of length ' + t + ', got length=' + e.length);
        }
        function o(e, t) {
          return (
            !!Array.isArray(t) &&
            (t.length === 0 ||
              (e ? t.every(e => typeof e === 'string') : t.every(e => Number.isSafeInteger(e))))
          );
        }
        function s(e) {
          if (typeof e !== 'function') throw new Error('function expected');
          return !0;
        }
        function a(e, t) {
          if (typeof t !== 'string') throw new Error(`${e}: string expected`);
          return !0;
        }
        function c(e) {
          if (!Number.isSafeInteger(e)) throw new Error(`invalid integer: ${e}`);
        }
        function u(e) {
          if (!Array.isArray(e)) throw new Error('array expected');
        }
        function l(e, t) {
          if (!o(!0, t)) throw new Error(`${e}: array of strings expected`);
        }
        function d(e, t) {
          if (!o(!1, t)) throw new Error(`${e}: array of numbers expected`);
        }
        function f(...e) {
          const t = e => e;
          const r = (e, t) => r => e(t(r));
          return {
            encode: e.map(e => e.encode).reduceRight(r, t),
            decode: e.map(e => e.decode).reduce(r, t),
          };
        }
        function h(e) {
          const t = typeof e === 'string' ? e.split('') : e;
          const r = t.length;
          l('alphabet', t);
          const n = new Map(t.map((e, t) => [e, t]));
          return {
            encode: n => (
              u(n),
              n.map(n => {
                if (!Number.isSafeInteger(n) || n < 0 || n >= r)
                  throw new Error(
                    `alphabet.encode: digit index outside alphabet "${n}". Allowed: ${e}`
                  );
                return t[n];
              })
            ),
            decode: t => (
              u(t),
              t.map(t => {
                a('alphabet.decode', t);
                const r = n.get(t);
                if (void 0 === r) throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                return r;
              })
            ),
          };
        }
        function p(e = '') {
          return (
            a('join', e),
            {
              encode: t => (l('join.decode', t), t.join(e)),
              decode: t => (a('join.decode', t), t.split(e)),
            }
          );
        }
        function g(e, t = '=') {
          return (
            c(e),
            a('padding', t),
            {
              encode(r) {
                for (l('padding.encode', r); (r.length * e) % 8; ) r.push(t);
                return r;
              },
              decode(r) {
                l('padding.decode', r);
                let n = r.length;
                if ((n * e) % 8)
                  throw new Error('padding: invalid, string should have whole number of bytes');
                for (; n > 0 && r[n - 1] === t; n--) {
                  if (((n - 1) * e) % 8 == 0)
                    throw new Error('padding: invalid, string has too much padding');
                }
                return r.slice(0, n);
              },
            }
          );
        }
        function m(e) {
          return s(e), { encode: e => e, decode: t => e(t) };
        }
        function y(e, t, r) {
          if (t < 2) throw new Error(`convertRadix: invalid from=${t}, base cannot be less than 2`);
          if (r < 2) throw new Error(`convertRadix: invalid to=${r}, base cannot be less than 2`);
          if ((u(e), !e.length)) return [];
          let n = 0;
          const i = [];
          const o = Array.from(e, e => {
            if ((c(e), e < 0 || e >= t)) throw new Error(`invalid integer: ${e}`);
            return e;
          });
          const s = o.length;
          for (;;) {
            let e = 0;
            let a = !0;
            for (let i = n; i < s; i++) {
              const s = o[i];
              const c = t * e;
              const u = c + s;
              if (!Number.isSafeInteger(u) || c / t !== e || u - s !== c)
                throw new Error('convertRadix: carry overflow');
              const l = u / r;
              e = u % r;
              const d = Math.floor(l);
              if (((o[i] = d), !Number.isSafeInteger(d) || d * r + e !== u))
                throw new Error('convertRadix: carry overflow');
              a && (d ? (a = !1) : (n = i));
            }
            if ((i.push(e), a)) break;
          }
          for (let t = 0; t < e.length - 1 && e[t] === 0; t++) i.push(0);
          return i.reverse();
        }
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.bytes =
            r.stringToBytes =
            r.str =
            r.bytesToString =
            r.hex =
            r.utf8 =
            r.bech32m =
            r.bech32 =
            r.base58check =
            r.createBase58check =
            r.base58xmr =
            r.base58xrp =
            r.base58flickr =
            r.base58 =
            r.base64urlnopad =
            r.base64url =
            r.base64nopad =
            r.base64 =
            r.base32crockford =
            r.base32hexnopad =
            r.base32hex =
            r.base32nopad =
            r.base32 =
            r.base16 =
            r.utils =
              void 0);
        const b = (e, t) => (t === 0 ? e : b(t, e % t));
        const w = (e, t) => e + (t - b(e, t));
        const v = (() => {
          const e = [];
          for (let t = 0; t < 40; t++) e.push(2 ** t);
          return e;
        })();
        function E(e, t, r, n) {
          if ((u(e), t <= 0 || t > 32)) throw new Error(`convertRadix2: wrong from=${t}`);
          if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
          if (w(t, r) > 32)
            throw new Error(`convertRadix2: carry overflow from=${t} to=${r} carryBits=${w(t, r)}`);
          let i = 0;
          let o = 0;
          const s = v[t];
          const a = v[r] - 1;
          const l = [];
          for (const n of e) {
            if ((c(n), n >= s)) throw new Error(`convertRadix2: invalid data word=${n} from=${t}`);
            if (((i = (i << t) | n), o + t > 32))
              throw new Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
            for (o += t; o >= r; o -= r) l.push(((i >> (o - r)) & a) >>> 0);
            const e = v[o];
            if (void 0 === e) throw new Error('invalid carry');
            i &= e - 1;
          }
          if (((i = (i << (r - o)) & a), !n && o >= t)) throw new Error('Excess padding');
          if (!n && i > 0) throw new Error(`Non-zero padding: ${i}`);
          return n && o > 0 && l.push(i >>> 0), l;
        }
        function _(e) {
          c(e);
          return {
            encode: t => {
              if (!n(t)) throw new Error('radix.encode input should be Uint8Array');
              return y(Array.from(t), 256, e);
            },
            decode: t => (d('radix.decode', t), Uint8Array.from(y(t, e, 256))),
          };
        }
        function M(e, t = !1) {
          if ((c(e), e <= 0 || e > 32)) throw new Error('radix2: bits should be in (0..32]');
          if (w(8, e) > 32 || w(e, 8) > 32) throw new Error('radix2: carry overflow');
          return {
            encode: r => {
              if (!n(r)) throw new Error('radix2.encode input should be Uint8Array');
              return E(Array.from(r), 8, e, !t);
            },
            decode: r => (d('radix2.decode', r), Uint8Array.from(E(r, e, 8, t))),
          };
        }
        function S(e) {
          return (
            s(e),
            function (...t) {
              try {
                return e.apply(null, t);
              } catch (e) {}
            }
          );
        }
        function j(e, t) {
          return (
            c(e),
            s(t),
            {
              encode(r) {
                if (!n(r)) throw new Error('checksum.encode: input should be Uint8Array');
                const i = t(r).slice(0, e);
                const o = new Uint8Array(r.length + e);
                return o.set(r), o.set(i, r.length), o;
              },
              decode(r) {
                if (!n(r)) throw new Error('checksum.decode: input should be Uint8Array');
                const i = r.slice(0, -e);
                const o = r.slice(-e);
                const s = t(i).slice(0, e);
                for (let t = 0; t < e; t++) if (s[t] !== o[t]) throw new Error('Invalid checksum');
                return i;
              },
            }
          );
        }
        (r.utils = {
          alphabet: h,
          chain: f,
          checksum: j,
          convertRadix: y,
          convertRadix2: E,
          radix: _,
          radix2: M,
          join: p,
          padding: g,
        }),
          (r.base16 = f(M(4), h('0123456789ABCDEF'), p(''))),
          (r.base32 = f(M(5), h('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), g(5), p(''))),
          (r.base32nopad = f(M(5), h('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), p(''))),
          (r.base32hex = f(M(5), h('0123456789ABCDEFGHIJKLMNOPQRSTUV'), g(5), p(''))),
          (r.base32hexnopad = f(M(5), h('0123456789ABCDEFGHIJKLMNOPQRSTUV'), p(''))),
          (r.base32crockford = f(
            M(5),
            h('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
            p(''),
            m(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
          ));
        const I = (() =>
          typeof Uint8Array.from([]).toBase64 === 'function' &&
          typeof Uint8Array.fromBase64 === 'function')();
        (r.base64 = I
          ? {
              encode: e => (i(e), e.toBase64()),
              decode: e => (
                a('base64', e), Uint8Array.fromBase64(e, { lastChunkHandling: 'strict' })
              ),
            }
          : f(
              M(6),
              h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
              g(6),
              p('')
            )),
          (r.base64nopad = f(
            M(6),
            h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
            p('')
          )),
          (r.base64url = I
            ? {
                encode: e => (i(e), e.toBase64({ alphabet: 'base64url' })),
                decode: e => (a('base64', e), Uint8Array.fromBase64(e, { alphabet: 'base64url' })),
              }
            : f(
                M(6),
                h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                g(6),
                p('')
              )),
          (r.base64urlnopad = f(
            M(6),
            h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
            p('')
          ));
        const A = e => f(_(58), h(e), p(''));
        (r.base58 = A('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')),
          (r.base58flickr = A('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ')),
          (r.base58xrp = A('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'));
        const R = [0, 2, 3, 5, 6, 7, 9, 10, 11];
        r.base58xmr = {
          encode(e) {
            let t = '';
            for (let n = 0; n < e.length; n += 8) {
              const i = e.subarray(n, n + 8);
              t += r.base58.encode(i).padStart(R[i.length], '1');
            }
            return t;
          },
          decode(e) {
            let t = [];
            for (let n = 0; n < e.length; n += 11) {
              const i = e.slice(n, n + 11);
              const o = R.indexOf(i.length);
              const s = r.base58.decode(i);
              for (let e = 0; e < s.length - o; e++)
                if (s[e] !== 0) throw new Error('base58xmr: wrong padding');
              t = t.concat(Array.from(s.slice(s.length - o)));
            }
            return Uint8Array.from(t);
          },
        };
        (r.createBase58check = e =>
          f(
            j(4, t => e(e(t))),
            r.base58
          )),
          (r.base58check = r.createBase58check);
        const T = f(h('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), p(''));
        const N = [996825010, 642813549, 513874426, 1027748829, 705979059];
        function O(e) {
          const t = e >> 25;
          let r = (33554431 & e) << 5;
          for (let e = 0; e < N.length; e++) ((t >> e) & 1) == 1 && (r ^= N[e]);
          return r;
        }
        function C(e, t, r = 1) {
          const n = e.length;
          let i = 1;
          for (let t = 0; t < n; t++) {
            const r = e.charCodeAt(t);
            if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
            i = O(i) ^ (r >> 5);
          }
          i = O(i);
          for (let t = 0; t < n; t++) i = O(i) ^ (31 & e.charCodeAt(t));
          for (const e of t) i = O(i) ^ e;
          for (let e = 0; e < 6; e++) i = O(i);
          return (i ^= r), T.encode(E([i % v[30]], 30, 5, !1));
        }
        function x(e) {
          const t = e === 'bech32' ? 1 : 734539939;
          const r = M(5);
          const i = r.decode;
          const o = r.encode;
          const s = S(i);
          function c(e, r, i = 90) {
            a('bech32.encode prefix', e), n(r) && (r = Array.from(r)), d('bech32.encode', r);
            const o = e.length;
            if (o === 0) throw new TypeError(`Invalid prefix length ${o}`);
            const s = o + 7 + r.length;
            if (!1 !== i && s > i) throw new TypeError(`Length ${s} exceeds limit ${i}`);
            const c = e.toLowerCase();
            const u = C(c, r, t);
            return `${c}1${T.encode(r)}${u}`;
          }
          function u(e, r = 90) {
            a('bech32.decode input', e);
            const n = e.length;
            if (n < 8 || (!1 !== r && n > r))
              throw new TypeError(`invalid string length: ${n} (${e}). Expected (8..${r})`);
            const i = e.toLowerCase();
            if (e !== i && e !== e.toUpperCase())
              throw new Error('String must be lowercase or uppercase');
            const o = i.lastIndexOf('1');
            if (o === 0 || o === -1)
              throw new Error('Letter "1" must be present between prefix and data only');
            const s = i.slice(0, o);
            const c = i.slice(o + 1);
            if (c.length < 6) throw new Error('Data must be at least 6 characters long');
            const u = T.decode(c).slice(0, -6);
            const l = C(s, u, t);
            if (!c.endsWith(l)) throw new Error(`Invalid checksum in ${e}: expected "${l}"`);
            return { prefix: s, words: u };
          }
          return {
            encode: c,
            decode: u,
            encodeFromBytes: function (e, t) {
              return c(e, o(t));
            },
            decodeToBytes: function (e) {
              const { prefix: t, words: r } = u(e, !1);
              return { prefix: t, words: r, bytes: i(r) };
            },
            decodeUnsafe: S(u),
            fromWords: i,
            fromWordsUnsafe: s,
            toWords: o,
          };
        }
        (r.bech32 = x('bech32')),
          (r.bech32m = x('bech32m')),
          (r.utf8 = {
            encode: e => new TextDecoder().decode(e),
            decode: e => new TextEncoder().encode(e),
          });
        const P = (() =>
          typeof Uint8Array.from([]).toHex === 'function' &&
          typeof Uint8Array.fromHex === 'function')();
        const k = {
          encode: e => (i(e), e.toHex()),
          decode: e => (a('hex', e), Uint8Array.fromHex(e)),
        };
        r.hex = P
          ? k
          : f(
              M(4),
              h('0123456789abcdef'),
              p(''),
              m(e => {
                if (typeof e !== 'string' || e.length % 2 != 0)
                  throw new TypeError(
                    `hex.decode: expected string, got ${typeof e} with length ${e.length}`
                  );
                return e.toLowerCase();
              })
            );
        const D = {
          utf8: r.utf8,
          hex: r.hex,
          base16: r.base16,
          base32: r.base32,
          base64: r.base64,
          base64url: r.base64url,
          base58: r.base58,
          base58xmr: r.base58xmr,
        };
        const L =
          'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
        (r.bytesToString = (e, t) => {
          if (typeof e !== 'string' || !D.hasOwnProperty(e)) throw new TypeError(L);
          if (!n(t)) throw new TypeError('bytesToString() expects Uint8Array');
          return D[e].encode(t);
        }),
          (r.str = r.bytesToString);
        (r.stringToBytes = (e, t) => {
          if (!D.hasOwnProperty(e)) throw new TypeError(L);
          if (typeof t !== 'string') throw new TypeError('stringToBytes() expects string');
          return D[e].decode(t);
        }),
          (r.bytes = r.stringToBytes);
      },
      {},
    ],
    115: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.SOLANA_CHAINS =
            r.SOLANA_LOCALNET_CHAIN =
            r.SOLANA_TESTNET_CHAIN =
            r.SOLANA_DEVNET_CHAIN =
            r.SOLANA_MAINNET_CHAIN =
              void 0),
          (r.isSolanaChain = function (e) {
            return r.SOLANA_CHAINS.includes(e);
          }),
          (r.SOLANA_MAINNET_CHAIN = 'solana:mainnet'),
          (r.SOLANA_DEVNET_CHAIN = 'solana:devnet'),
          (r.SOLANA_TESTNET_CHAIN = 'solana:testnet'),
          (r.SOLANA_LOCALNET_CHAIN = 'solana:localnet'),
          (r.SOLANA_CHAINS = [
            r.SOLANA_MAINNET_CHAIN,
            r.SOLANA_DEVNET_CHAIN,
            r.SOLANA_TESTNET_CHAIN,
            r.SOLANA_LOCALNET_CHAIN,
          ]);
      },
      {},
    ],
    116: [
      function (e, t, r) {
        'use strict';
        const n = Object.create
          ? function (e, t, r, n) {
              void 0 === n && (n = r);
              let i = Object.getOwnPropertyDescriptor(t, r);
              (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                (i = {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                }),
                Object.defineProperty(e, n, i);
            }
          : function (e, t, r, n) {
              void 0 === n && (n = r), (e[n] = t[r]);
            };
        const i = function (e, t) {
          for (const r in e)
            r === 'default' || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
        };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(e('./signAndSendTransaction.js'), r),
          i(e('./signIn.js'), r),
          i(e('./signMessage.js'), r),
          i(e('./signTransaction.js'), r),
          i(e('./signAndSendAllTransactions.js'), r);
      },
      {
        './signAndSendAllTransactions.js': 117,
        './signAndSendTransaction.js': 118,
        './signIn.js': 119,
        './signMessage.js': 120,
        './signTransaction.js': 121,
      },
    ],
    117: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.SignAndSendAllTransactions = void 0),
          (r.SignAndSendAllTransactions = 'solana:signAndSendAllTransactions');
      },
      {},
    ],
    118: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.SolanaSignAndSendTransaction = void 0),
          (r.SolanaSignAndSendTransaction = 'solana:signAndSendTransaction');
      },
      {},
    ],
    119: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.SolanaSignIn = void 0),
          (r.SolanaSignIn = 'solana:signIn');
      },
      {},
    ],
    120: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.SolanaSignMessage = void 0),
          (r.SolanaSignMessage = 'solana:signMessage');
      },
      {},
    ],
    121: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.SolanaSignTransaction = void 0),
          (r.SolanaSignTransaction = 'solana:signTransaction');
      },
      {},
    ],
    122: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.Connect = r.StandardConnect = void 0),
          (r.StandardConnect = 'standard:connect'),
          (r.Connect = r.StandardConnect);
      },
      {},
    ],
    123: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.Disconnect = r.StandardDisconnect = void 0),
          (r.StandardDisconnect = 'standard:disconnect'),
          (r.Disconnect = r.StandardDisconnect);
      },
      {},
    ],
    124: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.Events = r.StandardEvents = void 0),
          (r.StandardEvents = 'standard:events'),
          (r.Events = r.StandardEvents);
      },
      {},
    ],
    125: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                let i = Object.getOwnPropertyDescriptor(t, r);
                (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              });
        const i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (const r in e)
              r === 'default' || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(e('./connect.js'), r),
          i(e('./disconnect.js'), r),
          i(e('./events.js'), r);
      },
      { './connect.js': 122, './disconnect.js': 123, './events.js': 124 },
    ],
    126: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                let i = Object.getOwnPropertyDescriptor(t, r);
                (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              });
        const i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (const r in e)
              r === 'default' || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(e('./register.js'), r),
          i(e('./util.js'), r);
      },
      { './register.js': 127, './util.js': 128 },
    ],
    127: [
      function (e, t, r) {
        'use strict';
        let n;
        const i =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const o =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        function s(e) {
          const t = ({ register: t }) => t(e);
          try {
            window.dispatchEvent(new a(t));
          } catch (e) {
            console.error('wallet-standard:register-wallet event could not be dispatched\n', e);
          }
          try {
            window.addEventListener('wallet-standard:app-ready', ({ detail: e }) => t(e));
          } catch (e) {
            console.error('wallet-standard:app-ready event listener could not be added\n', e);
          }
        }
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.DEPRECATED_registerWallet = r.registerWallet = void 0),
          (r.registerWallet = s);
        class a extends Event {
          get detail() {
            return i(this, n, 'f');
          }
          get type() {
            return 'wallet-standard:register-wallet';
          }
          constructor(e) {
            super('wallet-standard:register-wallet', { bubbles: !1, cancelable: !1, composed: !1 }),
              n.set(this, void 0),
              o(this, n, e, 'f');
          }
          preventDefault() {
            throw new Error('preventDefault cannot be called');
          }
          stopImmediatePropagation() {
            throw new Error('stopImmediatePropagation cannot be called');
          }
          stopPropagation() {
            throw new Error('stopPropagation cannot be called');
          }
        }
        (n = new WeakMap()),
          (r.DEPRECATED_registerWallet = function (e) {
            let t;
            s(e);
            try {
              ((t = window.navigator).wallets || (t.wallets = [])).push(({ register: t }) => t(e));
            } catch (e) {
              console.error('window.navigator.wallets could not be pushed\n', e);
            }
          });
      },
      {},
    ],
    128: [
      function (e, t, r) {
        'use strict';
        let n;
        let i;
        let o;
        let s;
        let a;
        let c;
        const u =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if (r === 'a' && !n)
              throw new TypeError('Private accessor was defined without a getter');
            if (typeof t === 'function' ? e !== t || !n : !t.has(e))
              throw new TypeError(
                'Cannot read private member from an object whose class did not declare it'
              );
            return r === 'm' ? n : r === 'a' ? n.call(e) : n ? n.value : t.get(e);
          };
        const l =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if (n === 'm') throw new TypeError('Private method is not writable');
            if (n === 'a' && !i)
              throw new TypeError('Private accessor was defined without a setter');
            if (typeof t === 'function' ? e !== t || !i : !t.has(e))
              throw new TypeError(
                'Cannot write private member to an object whose class did not declare it'
              );
            return n === 'a' ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.guard =
            r.pick =
            r.concatBytes =
            r.bytesEqual =
            r.arraysEqual =
            r.ReadonlyWalletAccount =
              void 0);
        class d {
          get address() {
            return u(this, n, 'f');
          }
          get publicKey() {
            return u(this, i, 'f').slice();
          }
          get chains() {
            return u(this, o, 'f').slice();
          }
          get features() {
            return u(this, s, 'f').slice();
          }
          get label() {
            return u(this, a, 'f');
          }
          get icon() {
            return u(this, c, 'f');
          }
          constructor(e) {
            n.set(this, void 0),
              i.set(this, void 0),
              o.set(this, void 0),
              s.set(this, void 0),
              a.set(this, void 0),
              c.set(this, void 0),
              new.target === d && Object.freeze(this),
              l(this, n, e.address, 'f'),
              l(this, i, e.publicKey.slice(), 'f'),
              l(this, o, e.chains.slice(), 'f'),
              l(this, s, e.features.slice(), 'f'),
              l(this, a, e.label, 'f'),
              l(this, c, e.icon, 'f');
          }
        }
        function f(e, t) {
          if (e === t) return !0;
          const r = e.length;
          if (r !== t.length) return !1;
          for (let n = 0; n < r; n++) if (e[n] !== t[n]) return !1;
          return !0;
        }
        (r.ReadonlyWalletAccount = d),
          (n = new WeakMap()),
          (i = new WeakMap()),
          (o = new WeakMap()),
          (s = new WeakMap()),
          (a = new WeakMap()),
          (c = new WeakMap()),
          (r.arraysEqual = f),
          (r.bytesEqual = function (e, t) {
            return f(e, t);
          }),
          (r.concatBytes = function (e, ...t) {
            const r = t.reduce((e, t) => e + t.length, e.length);
            const n = new Uint8Array(r);
            n.set(e, 0);
            for (const e of t) n.set(e, n.length);
            return n;
          }),
          (r.pick = function (e, ...t) {
            const r = {};
            for (const n of t) r[n] = e[n];
            return r;
          }),
          (r.guard = function (e) {
            try {
              e();
            } catch (e) {
              console.error(e);
            }
          });
      },
      {},
    ],
    129: [
      function (e, t, r) {
        'use strict';
        const { AbortController: n } = globalThis;
        t.exports = { AbortController: n };
      },
      {},
    ],
    130: [
      function (e, t, r) {
        'use strict';
        (r.byteLength = function (e) {
          const t = c(e);
          const r = t[0];
          const n = t[1];
          return (3 * (r + n)) / 4 - n;
        }),
          (r.toByteArray = function (e) {
            let t;
            let r;
            const n = c(e);
            const s = n[0];
            const a = n[1];
            const u = new o(
              (function (e, t, r) {
                return (3 * (t + r)) / 4 - r;
              })(0, s, a)
            );
            let l = 0;
            const d = a > 0 ? s - 4 : s;
            for (r = 0; r < d; r += 4)
              (t =
                (i[e.charCodeAt(r)] << 18) |
                (i[e.charCodeAt(r + 1)] << 12) |
                (i[e.charCodeAt(r + 2)] << 6) |
                i[e.charCodeAt(r + 3)]),
                (u[l++] = (t >> 16) & 255),
                (u[l++] = (t >> 8) & 255),
                (u[l++] = 255 & t);
            a === 2 &&
              ((t = (i[e.charCodeAt(r)] << 2) | (i[e.charCodeAt(r + 1)] >> 4)), (u[l++] = 255 & t));
            a === 1 &&
              ((t =
                (i[e.charCodeAt(r)] << 10) |
                (i[e.charCodeAt(r + 1)] << 4) |
                (i[e.charCodeAt(r + 2)] >> 2)),
              (u[l++] = (t >> 8) & 255),
              (u[l++] = 255 & t));
            return u;
          }),
          (r.fromByteArray = function (e) {
            for (var t, r = e.length, i = r % 3, o = [], s = 16383, a = 0, c = r - i; a < c; a += s)
              o.push(u(e, a, a + s > c ? c : a + s));
            i === 1
              ? ((t = e[r - 1]), o.push(n[t >> 2] + n[(t << 4) & 63] + '=='))
              : i === 2 &&
                ((t = (e[r - 2] << 8) + e[r - 1]),
                o.push(n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + '='));
            return o.join('');
          });
        for (
          var n = [],
            i = [],
            o = typeof Uint8Array !== 'undefined' ? Uint8Array : Array,
            s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            a = 0;
          a < 64;
          ++a
        )
          (n[a] = s[a]), (i[s.charCodeAt(a)] = a);
        function c(e) {
          const t = e.length;
          if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
          let r = e.indexOf('=');
          return r === -1 && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
        }
        function u(e, t, r) {
          for (var i, o, s = [], a = t; a < r; a += 3)
            (i = ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (255 & e[a + 2])),
              s.push(n[((o = i) >> 18) & 63] + n[(o >> 12) & 63] + n[(o >> 6) & 63] + n[63 & o]);
          return s.join('');
        }
        (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
      },
      {},
    ],
    131: [function (e, t, r) {}, {}],
    132: [
      function (e, t, r) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        'use strict';
        const n = e('base64-js');
        const i = e('ieee754');
        (r.Buffer = a),
          (r.SlowBuffer = function (e) {
            +e != e && (e = 0);
            return a.alloc(+e);
          }),
          (r.INSPECT_MAX_BYTES = 50);
        const o = 2147483647;
        function s(e) {
          if (e > o) throw new RangeError('The value "' + e + '" is invalid for option "size"');
          const t = new Uint8Array(e);
          return (t.__proto__ = a.prototype), t;
        }
        function a(e, t, r) {
          if (typeof e === 'number') {
            if (typeof t === 'string')
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            return l(e);
          }
          return c(e, t, r);
        }
        function c(e, t, r) {
          if (typeof e === 'string')
            return (function (e, t) {
              (typeof t === 'string' && t !== '') || (t = 'utf8');
              if (!a.isEncoding(t)) throw new TypeError('Unknown encoding: ' + t);
              const r = 0 | h(e, t);
              let n = s(r);
              const i = n.write(e, t);
              i !== r && (n = n.slice(0, i));
              return n;
            })(e, t);
          if (ArrayBuffer.isView(e)) return d(e);
          if (e == null)
            throw TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof e
            );
          if (B(e, ArrayBuffer) || (e && B(e.buffer, ArrayBuffer)))
            return (function (e, t, r) {
              if (t < 0 || e.byteLength < t)
                throw new RangeError('"offset" is outside of buffer bounds');
              if (e.byteLength < t + (r || 0))
                throw new RangeError('"length" is outside of buffer bounds');
              let n;
              n =
                void 0 === t && void 0 === r
                  ? new Uint8Array(e)
                  : void 0 === r
                    ? new Uint8Array(e, t)
                    : new Uint8Array(e, t, r);
              return (n.__proto__ = a.prototype), n;
            })(e, t, r);
          if (typeof e === 'number')
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          const n = e.valueOf && e.valueOf();
          if (n != null && n !== e) return a.from(n, t, r);
          const i = (function (e) {
            if (a.isBuffer(e)) {
              const t = 0 | f(e.length);
              const r = s(t);
              return r.length === 0 || e.copy(r, 0, 0, t), r;
            }
            if (void 0 !== e.length)
              return typeof e.length !== 'number' || W(e.length) ? s(0) : d(e);
            if (e.type === 'Buffer' && Array.isArray(e.data)) return d(e.data);
          })(e);
          if (i) return i;
          if (
            typeof Symbol !== 'undefined' &&
            Symbol.toPrimitive != null &&
            typeof e[Symbol.toPrimitive] === 'function'
          )
            return a.from(e[Symbol.toPrimitive]('string'), t, r);
          throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
              typeof e
          );
        }
        function u(e) {
          if (typeof e !== 'number') throw new TypeError('"size" argument must be of type number');
          if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"');
        }
        function l(e) {
          return u(e), s(e < 0 ? 0 : 0 | f(e));
        }
        function d(e) {
          for (var t = e.length < 0 ? 0 : 0 | f(e.length), r = s(t), n = 0; n < t; n += 1)
            r[n] = 255 & e[n];
          return r;
        }
        function f(e) {
          if (e >= o)
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' + o.toString(16) + ' bytes'
            );
          return 0 | e;
        }
        function h(e, t) {
          if (a.isBuffer(e)) return e.length;
          if (ArrayBuffer.isView(e) || B(e, ArrayBuffer)) return e.byteLength;
          if (typeof e !== 'string')
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                typeof e
            );
          const r = e.length;
          const n = arguments.length > 2 && !0 === arguments[2];
          if (!n && r === 0) return 0;
          for (let i = !1; ; )
            switch (t) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return r;
              case 'utf8':
              case 'utf-8':
                return $(e).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * r;
              case 'hex':
                return r >>> 1;
              case 'base64':
                return U(e).length;
              default:
                if (i) return n ? -1 : $(e).length;
                (t = ('' + t).toLowerCase()), (i = !0);
            }
        }
        function p(e, t, r) {
          let n = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
          if ((r >>>= 0) <= (t >>>= 0)) return '';
          for (e || (e = 'utf8'); ; )
            switch (e) {
              case 'hex':
                return T(this, t, r);
              case 'utf8':
              case 'utf-8':
                return j(this, t, r);
              case 'ascii':
                return A(this, t, r);
              case 'latin1':
              case 'binary':
                return R(this, t, r);
              case 'base64':
                return S(this, t, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return N(this, t, r);
              default:
                if (n) throw new TypeError('Unknown encoding: ' + e);
                (e = (e + '').toLowerCase()), (n = !0);
            }
        }
        function g(e, t, r) {
          const n = e[t];
          (e[t] = e[r]), (e[r] = n);
        }
        function m(e, t, r, n, i) {
          if (e.length === 0) return -1;
          if (
            (typeof r === 'string'
              ? ((n = r), (r = 0))
              : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
            W((r = +r)) && (r = i ? 0 : e.length - 1),
            r < 0 && (r = e.length + r),
            r >= e.length)
          ) {
            if (i) return -1;
            r = e.length - 1;
          } else if (r < 0) {
            if (!i) return -1;
            r = 0;
          }
          if ((typeof t === 'string' && (t = a.from(t, n)), a.isBuffer(t)))
            return t.length === 0 ? -1 : y(e, t, r, n, i);
          if (typeof t === 'number')
            return (
              (t &= 255),
              typeof Uint8Array.prototype.indexOf === 'function'
                ? i
                  ? Uint8Array.prototype.indexOf.call(e, t, r)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, r)
                : y(e, [t], r, n, i)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function y(e, t, r, n, i) {
          let o;
          let s = 1;
          let a = e.length;
          let c = t.length;
          if (
            void 0 !== n &&
            ((n = String(n).toLowerCase()) === 'ucs2' ||
              n === 'ucs-2' ||
              n === 'utf16le' ||
              n === 'utf-16le')
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (s = 2), (a /= 2), (c /= 2), (r /= 2);
          }
          function u(e, t) {
            return s === 1 ? e[t] : e.readUInt16BE(t * s);
          }
          if (i) {
            let l = -1;
            for (o = r; o < a; o++)
              if (u(e, o) === u(t, l === -1 ? 0 : o - l)) {
                if ((l === -1 && (l = o), o - l + 1 === c)) return l * s;
              } else l !== -1 && (o -= o - l), (l = -1);
          } else
            for (r + c > a && (r = a - c), o = r; o >= 0; o--) {
              for (var d = !0, f = 0; f < c; f++)
                if (u(e, o + f) !== u(t, f)) {
                  d = !1;
                  break;
                }
              if (d) return o;
            }
          return -1;
        }
        function b(e, t, r, n) {
          r = Number(r) || 0;
          const i = e.length - r;
          n ? (n = Number(n)) > i && (n = i) : (n = i);
          const o = t.length;
          n > o / 2 && (n = o / 2);
          for (var s = 0; s < n; ++s) {
            const a = parseInt(t.substr(2 * s, 2), 16);
            if (W(a)) return s;
            e[r + s] = a;
          }
          return s;
        }
        function w(e, t, r, n) {
          return z($(t, e.length - r), e, r, n);
        }
        function v(e, t, r, n) {
          return z(
            (function (e) {
              for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
              return t;
            })(t),
            e,
            r,
            n
          );
        }
        function E(e, t, r, n) {
          return v(e, t, r, n);
        }
        function _(e, t, r, n) {
          return z(U(t), e, r, n);
        }
        function M(e, t, r, n) {
          return z(
            (function (e, t) {
              for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)
                (n = (r = e.charCodeAt(s)) >> 8), (i = r % 256), o.push(i), o.push(n);
              return o;
            })(t, e.length - r),
            e,
            r,
            n
          );
        }
        function S(e, t, r) {
          return t === 0 && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r));
        }
        function j(e, t, r) {
          r = Math.min(e.length, r);
          for (var n = [], i = t; i < r; ) {
            var o;
            var s;
            var a;
            var c;
            const u = e[i];
            let l = null;
            let d = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
            if (i + d <= r)
              switch (d) {
                case 1:
                  u < 128 && (l = u);
                  break;
                case 2:
                  (192 & (o = e[i + 1])) == 128 &&
                    (c = ((31 & u) << 6) | (63 & o)) > 127 &&
                    (l = c);
                  break;
                case 3:
                  (o = e[i + 1]),
                    (s = e[i + 2]),
                    (192 & o) == 128 &&
                      (192 & s) == 128 &&
                      (c = ((15 & u) << 12) | ((63 & o) << 6) | (63 & s)) > 2047 &&
                      (c < 55296 || c > 57343) &&
                      (l = c);
                  break;
                case 4:
                  (o = e[i + 1]),
                    (s = e[i + 2]),
                    (a = e[i + 3]),
                    (192 & o) == 128 &&
                      (192 & s) == 128 &&
                      (192 & a) == 128 &&
                      (c = ((15 & u) << 18) | ((63 & o) << 12) | ((63 & s) << 6) | (63 & a)) >
                        65535 &&
                      c < 1114112 &&
                      (l = c);
              }
            l === null
              ? ((l = 65533), (d = 1))
              : l > 65535 &&
                ((l -= 65536), n.push(((l >>> 10) & 1023) | 55296), (l = 56320 | (1023 & l))),
              n.push(l),
              (i += d);
          }
          return (function (e) {
            const t = e.length;
            if (t <= I) return String.fromCharCode.apply(String, e);
            let r = '';
            let n = 0;
            for (; n < t; ) r += String.fromCharCode.apply(String, e.slice(n, (n += I)));
            return r;
          })(n);
        }
        (r.kMaxLength = o),
          (a.TYPED_ARRAY_SUPPORT = (function () {
            try {
              const e = new Uint8Array(1);
              return (
                (e.__proto__ = {
                  __proto__: Uint8Array.prototype,
                  foo: function () {
                    return 42;
                  },
                }),
                e.foo() === 42
              );
            } catch (e) {
              return !1;
            }
          })()),
          a.TYPED_ARRAY_SUPPORT ||
            typeof console === 'undefined' ||
            typeof console.error !== 'function' ||
            console.error(
              'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
            ),
          Object.defineProperty(a.prototype, 'parent', {
            enumerable: !0,
            get: function () {
              if (a.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(a.prototype, 'offset', {
            enumerable: !0,
            get: function () {
              if (a.isBuffer(this)) return this.byteOffset;
            },
          }),
          typeof Symbol !== 'undefined' &&
            Symbol.species != null &&
            a[Symbol.species] === a &&
            Object.defineProperty(a, Symbol.species, {
              value: null,
              configurable: !0,
              enumerable: !1,
              writable: !1,
            }),
          (a.poolSize = 8192),
          (a.from = function (e, t, r) {
            return c(e, t, r);
          }),
          (a.prototype.__proto__ = Uint8Array.prototype),
          (a.__proto__ = Uint8Array),
          (a.alloc = function (e, t, r) {
            return (function (e, t, r) {
              return (
                u(e),
                e <= 0
                  ? s(e)
                  : void 0 !== t
                    ? typeof r === 'string'
                      ? s(e).fill(t, r)
                      : s(e).fill(t)
                    : s(e)
              );
            })(e, t, r);
          }),
          (a.allocUnsafe = function (e) {
            return l(e);
          }),
          (a.allocUnsafeSlow = function (e) {
            return l(e);
          }),
          (a.isBuffer = function (e) {
            return e != null && !0 === e._isBuffer && e !== a.prototype;
          }),
          (a.compare = function (e, t) {
            if (
              (B(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
              B(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
              !a.isBuffer(e) || !a.isBuffer(t))
            )
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              );
            if (e === t) return 0;
            for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i)
              if (e[i] !== t[i]) {
                (r = e[i]), (n = t[i]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }),
          (a.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (a.concat = function (e, t) {
            if (!Array.isArray(e))
              throw new TypeError('"list" argument must be an Array of Buffers');
            if (e.length === 0) return a.alloc(0);
            let r;
            if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
            const n = a.allocUnsafe(t);
            let i = 0;
            for (r = 0; r < e.length; ++r) {
              let o = e[r];
              if ((B(o, Uint8Array) && (o = a.from(o)), !a.isBuffer(o)))
                throw new TypeError('"list" argument must be an Array of Buffers');
              o.copy(n, i), (i += o.length);
            }
            return n;
          }),
          (a.byteLength = h),
          (a.prototype._isBuffer = !0),
          (a.prototype.swap16 = function () {
            const e = this.length;
            if (e % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (let t = 0; t < e; t += 2) g(this, t, t + 1);
            return this;
          }),
          (a.prototype.swap32 = function () {
            const e = this.length;
            if (e % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (let t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
            return this;
          }),
          (a.prototype.swap64 = function () {
            const e = this.length;
            if (e % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (let t = 0; t < e; t += 8)
              g(this, t, t + 7),
                g(this, t + 1, t + 6),
                g(this, t + 2, t + 5),
                g(this, t + 3, t + 4);
            return this;
          }),
          (a.prototype.toString = function () {
            const e = this.length;
            return e === 0 ? '' : arguments.length === 0 ? j(this, 0, e) : p.apply(this, arguments);
          }),
          (a.prototype.toLocaleString = a.prototype.toString),
          (a.prototype.equals = function (e) {
            if (!a.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
            return this === e || a.compare(this, e) === 0;
          }),
          (a.prototype.inspect = function () {
            let e = '';
            const t = r.INSPECT_MAX_BYTES;
            return (
              (e = this.toString('hex', 0, t)
                .replace(/(.{2})/g, '$1 ')
                .trim()),
              this.length > t && (e += ' ... '),
              '<Buffer ' + e + '>'
            );
          }),
          (a.prototype.compare = function (e, t, r, n, i) {
            if ((B(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(e)))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                  typeof e
              );
            if (
              (void 0 === t && (t = 0),
              void 0 === r && (r = e ? e.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              t < 0 || r > e.length || n < 0 || i > this.length)
            )
              throw new RangeError('out of range index');
            if (n >= i && t >= r) return 0;
            if (n >= i) return -1;
            if (t >= r) return 1;
            if (this === e) return 0;
            for (
              var o = (i >>>= 0) - (n >>>= 0),
                s = (r >>>= 0) - (t >>>= 0),
                c = Math.min(o, s),
                u = this.slice(n, i),
                l = e.slice(t, r),
                d = 0;
              d < c;
              ++d
            )
              if (u[d] !== l[d]) {
                (o = u[d]), (s = l[d]);
                break;
              }
            return o < s ? -1 : s < o ? 1 : 0;
          }),
          (a.prototype.includes = function (e, t, r) {
            return this.indexOf(e, t, r) !== -1;
          }),
          (a.prototype.indexOf = function (e, t, r) {
            return m(this, e, t, r, !0);
          }),
          (a.prototype.lastIndexOf = function (e, t, r) {
            return m(this, e, t, r, !1);
          }),
          (a.prototype.write = function (e, t, r, n) {
            if (void 0 === t) (n = 'utf8'), (r = this.length), (t = 0);
            else if (void 0 === r && typeof t === 'string') (n = t), (r = this.length), (t = 0);
            else {
              if (!isFinite(t))
                throw new Error(
                  'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                );
              (t >>>= 0),
                isFinite(r) ? ((r >>>= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0));
            }
            const i = this.length - t;
            if (
              ((void 0 === r || r > i) && (r = i),
              (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
            )
              throw new RangeError('Attempt to write outside buffer bounds');
            n || (n = 'utf8');
            for (let o = !1; ; )
              switch (n) {
                case 'hex':
                  return b(this, e, t, r);
                case 'utf8':
                case 'utf-8':
                  return w(this, e, t, r);
                case 'ascii':
                  return v(this, e, t, r);
                case 'latin1':
                case 'binary':
                  return E(this, e, t, r);
                case 'base64':
                  return _(this, e, t, r);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return M(this, e, t, r);
                default:
                  if (o) throw new TypeError('Unknown encoding: ' + n);
                  (n = ('' + n).toLowerCase()), (o = !0);
              }
          }),
          (a.prototype.toJSON = function () {
            return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
          });
        var I = 4096;
        function A(e, t, r) {
          let n = '';
          r = Math.min(e.length, r);
          for (let i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
          return n;
        }
        function R(e, t, r) {
          let n = '';
          r = Math.min(e.length, r);
          for (let i = t; i < r; ++i) n += String.fromCharCode(e[i]);
          return n;
        }
        function T(e, t, r) {
          const n = e.length;
          (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
          for (var i = '', o = t; o < r; ++o) i += L(e[o]);
          return i;
        }
        function N(e, t, r) {
          for (var n = e.slice(t, r), i = '', o = 0; o < n.length; o += 2)
            i += String.fromCharCode(n[o] + 256 * n[o + 1]);
          return i;
        }
        function O(e, t, r) {
          if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
          if (e + t > r) throw new RangeError('Trying to access beyond buffer length');
        }
        function C(e, t, r, n, i, o) {
          if (!a.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
          if (r + n > e.length) throw new RangeError('Index out of range');
        }
        function x(e, t, r, n, i, o) {
          if (r + n > e.length) throw new RangeError('Index out of range');
          if (r < 0) throw new RangeError('Index out of range');
        }
        function P(e, t, r, n, o) {
          return (t = +t), (r >>>= 0), o || x(e, 0, r, 4), i.write(e, t, r, n, 23, 4), r + 4;
        }
        function k(e, t, r, n, o) {
          return (t = +t), (r >>>= 0), o || x(e, 0, r, 8), i.write(e, t, r, n, 52, 8), r + 8;
        }
        (a.prototype.slice = function (e, t) {
          const r = this.length;
          (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            t < e && (t = e);
          const n = this.subarray(e, t);
          return (n.__proto__ = a.prototype), n;
        }),
          (a.prototype.readUIntLE = function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || O(e, t, this.length);
            for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); ) n += this[e + o] * i;
            return n;
          }),
          (a.prototype.readUIntBE = function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || O(e, t, this.length);
            for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); ) n += this[e + --t] * i;
            return n;
          }),
          (a.prototype.readUInt8 = function (e, t) {
            return (e >>>= 0), t || O(e, 1, this.length), this[e];
          }),
          (a.prototype.readUInt16LE = function (e, t) {
            return (e >>>= 0), t || O(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (a.prototype.readUInt16BE = function (e, t) {
            return (e >>>= 0), t || O(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (a.prototype.readUInt32LE = function (e, t) {
            return (
              (e >>>= 0),
              t || O(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + 16777216 * this[e + 3]
            );
          }),
          (a.prototype.readUInt32BE = function (e, t) {
            return (
              (e >>>= 0),
              t || O(e, 4, this.length),
              16777216 * this[e] + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (a.prototype.readIntLE = function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || O(e, t, this.length);
            for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); ) n += this[e + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
          }),
          (a.prototype.readIntBE = function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || O(e, t, this.length);
            for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256); ) o += this[e + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
          }),
          (a.prototype.readInt8 = function (e, t) {
            return (
              (e >>>= 0),
              t || O(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (a.prototype.readInt16LE = function (e, t) {
            (e >>>= 0), t || O(e, 2, this.length);
            const r = this[e] | (this[e + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (a.prototype.readInt16BE = function (e, t) {
            (e >>>= 0), t || O(e, 2, this.length);
            const r = this[e + 1] | (this[e] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (a.prototype.readInt32LE = function (e, t) {
            return (
              (e >>>= 0),
              t || O(e, 4, this.length),
              this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
            );
          }),
          (a.prototype.readInt32BE = function (e, t) {
            return (
              (e >>>= 0),
              t || O(e, 4, this.length),
              (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
            );
          }),
          (a.prototype.readFloatLE = function (e, t) {
            return (e >>>= 0), t || O(e, 4, this.length), i.read(this, e, !0, 23, 4);
          }),
          (a.prototype.readFloatBE = function (e, t) {
            return (e >>>= 0), t || O(e, 4, this.length), i.read(this, e, !1, 23, 4);
          }),
          (a.prototype.readDoubleLE = function (e, t) {
            return (e >>>= 0), t || O(e, 8, this.length), i.read(this, e, !0, 52, 8);
          }),
          (a.prototype.readDoubleBE = function (e, t) {
            return (e >>>= 0), t || O(e, 8, this.length), i.read(this, e, !1, 52, 8);
          }),
          (a.prototype.writeUIntLE = function (e, t, r, n) {
            ((e = +e), (t >>>= 0), (r >>>= 0), n) || C(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            let i = 1;
            let o = 0;
            for (this[t] = 255 & e; ++o < r && (i *= 256); ) this[t + o] = (e / i) & 255;
            return t + r;
          }),
          (a.prototype.writeUIntBE = function (e, t, r, n) {
            ((e = +e), (t >>>= 0), (r >>>= 0), n) || C(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            let i = r - 1;
            let o = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); ) this[t + i] = (e / o) & 255;
            return t + r;
          }),
          (a.prototype.writeUInt8 = function (e, t, r) {
            return (e = +e), (t >>>= 0), r || C(this, e, t, 1, 255, 0), (this[t] = 255 & e), t + 1;
          }),
          (a.prototype.writeUInt16LE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 2, 65535, 0),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              t + 2
            );
          }),
          (a.prototype.writeUInt16BE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 2, 65535, 0),
              (this[t] = e >>> 8),
              (this[t + 1] = 255 & e),
              t + 2
            );
          }),
          (a.prototype.writeUInt32LE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 4, 4294967295, 0),
              (this[t + 3] = e >>> 24),
              (this[t + 2] = e >>> 16),
              (this[t + 1] = e >>> 8),
              (this[t] = 255 & e),
              t + 4
            );
          }),
          (a.prototype.writeUInt32BE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 4, 4294967295, 0),
              (this[t] = e >>> 24),
              (this[t + 1] = e >>> 16),
              (this[t + 2] = e >>> 8),
              (this[t + 3] = 255 & e),
              t + 4
            );
          }),
          (a.prototype.writeIntLE = function (e, t, r, n) {
            if (((e = +e), (t >>>= 0), !n)) {
              const i = Math.pow(2, 8 * r - 1);
              C(this, e, t, r, i - 1, -i);
            }
            let o = 0;
            let s = 1;
            let a = 0;
            for (this[t] = 255 & e; ++o < r && (s *= 256); )
              e < 0 && a === 0 && this[t + o - 1] !== 0 && (a = 1),
                (this[t + o] = (((e / s) | 0) - a) & 255);
            return t + r;
          }),
          (a.prototype.writeIntBE = function (e, t, r, n) {
            if (((e = +e), (t >>>= 0), !n)) {
              const i = Math.pow(2, 8 * r - 1);
              C(this, e, t, r, i - 1, -i);
            }
            let o = r - 1;
            let s = 1;
            let a = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256); )
              e < 0 && a === 0 && this[t + o + 1] !== 0 && (a = 1),
                (this[t + o] = (((e / s) | 0) - a) & 255);
            return t + r;
          }),
          (a.prototype.writeInt8 = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 1, 127, -128),
              e < 0 && (e = 255 + e + 1),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (a.prototype.writeInt16LE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 2, 32767, -32768),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              t + 2
            );
          }),
          (a.prototype.writeInt16BE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 2, 32767, -32768),
              (this[t] = e >>> 8),
              (this[t + 1] = 255 & e),
              t + 2
            );
          }),
          (a.prototype.writeInt32LE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 4, 2147483647, -2147483648),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              (this[t + 2] = e >>> 16),
              (this[t + 3] = e >>> 24),
              t + 4
            );
          }),
          (a.prototype.writeInt32BE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || C(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              (this[t] = e >>> 24),
              (this[t + 1] = e >>> 16),
              (this[t + 2] = e >>> 8),
              (this[t + 3] = 255 & e),
              t + 4
            );
          }),
          (a.prototype.writeFloatLE = function (e, t, r) {
            return P(this, e, t, !0, r);
          }),
          (a.prototype.writeFloatBE = function (e, t, r) {
            return P(this, e, t, !1, r);
          }),
          (a.prototype.writeDoubleLE = function (e, t, r) {
            return k(this, e, t, !0, r);
          }),
          (a.prototype.writeDoubleBE = function (e, t, r) {
            return k(this, e, t, !1, r);
          }),
          (a.prototype.copy = function (e, t, r, n) {
            if (!a.isBuffer(e)) throw new TypeError('argument should be a Buffer');
            if (
              (r || (r = 0),
              n || n === 0 || (n = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0;
            if (e.length === 0 || this.length === 0) return 0;
            if (t < 0) throw new RangeError('targetStart out of bounds');
            if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
            if (n < 0) throw new RangeError('sourceEnd out of bounds');
            n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
            const i = n - r;
            if (this === e && typeof Uint8Array.prototype.copyWithin === 'function')
              this.copyWithin(t, r, n);
            else if (this === e && r < t && t < n)
              for (let o = i - 1; o >= 0; --o) e[o + t] = this[o + r];
            else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
            return i;
          }),
          (a.prototype.fill = function (e, t, r, n) {
            if (typeof e === 'string') {
              if (
                (typeof t === 'string'
                  ? ((n = t), (t = 0), (r = this.length))
                  : typeof r === 'string' && ((n = r), (r = this.length)),
                void 0 !== n && typeof n !== 'string')
              )
                throw new TypeError('encoding must be a string');
              if (typeof n === 'string' && !a.isEncoding(n))
                throw new TypeError('Unknown encoding: ' + n);
              if (e.length === 1) {
                const i = e.charCodeAt(0);
                ((n === 'utf8' && i < 128) || n === 'latin1') && (e = i);
              }
            } else typeof e === 'number' && (e &= 255);
            if (t < 0 || this.length < t || this.length < r)
              throw new RangeError('Out of range index');
            if (r <= t) return this;
            let o;
            if (
              ((t >>>= 0),
              (r = void 0 === r ? this.length : r >>> 0),
              e || (e = 0),
              typeof e === 'number')
            )
              for (o = t; o < r; ++o) this[o] = e;
            else {
              const s = a.isBuffer(e) ? e : a.from(e, n);
              const c = s.length;
              if (c === 0)
                throw new TypeError('The value "' + e + '" is invalid for argument "value"');
              for (o = 0; o < r - t; ++o) this[o + t] = s[o % c];
            }
            return this;
          });
        const D = /[^+/0-9A-Za-z-_]/g;
        function L(e) {
          return e < 16 ? '0' + e.toString(16) : e.toString(16);
        }
        function $(e, t) {
          let r;
          t = t || 1 / 0;
          for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
            if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
              if (!i) {
                if (r > 56319) {
                  (t -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === n) {
                  (t -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = r;
                continue;
              }
              if (r < 56320) {
                (t -= 3) > -1 && o.push(239, 191, 189), (i = r);
                continue;
              }
              r = 65536 + (((i - 55296) << 10) | (r - 56320));
            } else i && (t -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), r < 128)) {
              if ((t -= 1) < 0) break;
              o.push(r);
            } else if (r < 2048) {
              if ((t -= 2) < 0) break;
              o.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((t -= 3) < 0) break;
              o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error('Invalid code point');
              if ((t -= 4) < 0) break;
              o.push(
                (r >> 18) | 240,
                ((r >> 12) & 63) | 128,
                ((r >> 6) & 63) | 128,
                (63 & r) | 128
              );
            }
          }
          return o;
        }
        function U(e) {
          return n.toByteArray(
            (function (e) {
              if ((e = (e = e.split('=')[0]).trim().replace(D, '')).length < 2) return '';
              for (; e.length % 4 != 0; ) e += '=';
              return e;
            })(e)
          );
        }
        function z(e, t, r, n) {
          for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
          return i;
        }
        function B(e, t) {
          return (
            e instanceof t ||
            (e != null &&
              e.constructor != null &&
              e.constructor.name != null &&
              e.constructor.name === t.name)
          );
        }
        function W(e) {
          return e != e;
        }
      },
      { 'base64-js': 130, ieee754: 141 },
    ],
    133: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.default = function (e) {
            if (e.length >= 255) throw new TypeError('Alphabet too long');
            const t = new Uint8Array(256);
            for (let e = 0; e < t.length; e++) t[e] = 255;
            for (let r = 0; r < e.length; r++) {
              const n = e.charAt(r);
              const i = n.charCodeAt(0);
              if (t[i] !== 255) throw new TypeError(n + ' is ambiguous');
              t[i] = r;
            }
            const r = e.length;
            const n = e.charAt(0);
            const i = Math.log(r) / Math.log(256);
            const o = Math.log(256) / Math.log(r);
            function s(e) {
              if (typeof e !== 'string') throw new TypeError('Expected String');
              if (e.length === 0) return new Uint8Array();
              let o = 0;
              let s = 0;
              let a = 0;
              for (; e[o] === n; ) s++, o++;
              const c = ((e.length - o) * i + 1) >>> 0;
              const u = new Uint8Array(c);
              for (; o < e.length; ) {
                const n = e.charCodeAt(o);
                if (n > 255) return;
                let i = t[n];
                if (i === 255) return;
                let s = 0;
                for (let e = c - 1; (i !== 0 || s < a) && e !== -1; e--, s++)
                  (i += (r * u[e]) >>> 0), (u[e] = i % 256 >>> 0), (i = (i / 256) >>> 0);
                if (i !== 0) throw new Error('Non-zero carry');
                (a = s), o++;
              }
              let l = c - a;
              for (; l !== c && u[l] === 0; ) l++;
              const d = new Uint8Array(s + (c - l));
              let f = s;
              for (; l !== c; ) d[f++] = u[l++];
              return d;
            }
            return {
              encode: function (t) {
                if (
                  (t instanceof Uint8Array ||
                    (ArrayBuffer.isView(t)
                      ? (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
                      : Array.isArray(t) && (t = Uint8Array.from(t))),
                  !(t instanceof Uint8Array))
                )
                  throw new TypeError('Expected Uint8Array');
                if (t.length === 0) return '';
                let i = 0;
                let s = 0;
                let a = 0;
                const c = t.length;
                for (; a !== c && t[a] === 0; ) a++, i++;
                const u = ((c - a) * o + 1) >>> 0;
                const l = new Uint8Array(u);
                for (; a !== c; ) {
                  let e = t[a];
                  let n = 0;
                  for (let t = u - 1; (e !== 0 || n < s) && t !== -1; t--, n++)
                    (e += (256 * l[t]) >>> 0), (l[t] = e % r >>> 0), (e = (e / r) >>> 0);
                  if (e !== 0) throw new Error('Non-zero carry');
                  (s = n), a++;
                }
                let d = u - s;
                for (; d !== u && l[d] === 0; ) d++;
                let f = n.repeat(i);
                for (; d < u; ++d) f += e.charAt(l[d]);
                return f;
              },
              decodeUnsafe: s,
              decode: function (e) {
                const t = s(e);
                if (t) return t;
                throw new Error('Non-base' + r + ' character');
              },
            };
          });
      },
      {},
    ],
    134: [
      function (e, t, r) {
        'use strict';
        const n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, '__esModule', { value: !0 });
        const i = n(e('base-x'));
        r.default = (0, i.default)('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
      },
      { 'base-x': 133 },
    ],
    135: [
      function (e, t, r) {
        (function (n) {
          (function () {
            (r.formatArgs = function (e) {
              if (
                ((e[0] =
                  (this.useColors ? '%c' : '') +
                  this.namespace +
                  (this.useColors ? ' %c' : ' ') +
                  e[0] +
                  (this.useColors ? '%c ' : ' ') +
                  '+' +
                  t.exports.humanize(this.diff)),
                !this.useColors)
              )
                return;
              const r = 'color: ' + this.color;
              e.splice(1, 0, r, 'color: inherit');
              let n = 0;
              let i = 0;
              e[0].replace(/%[a-zA-Z%]/g, e => {
                e !== '%%' && (n++, e === '%c' && (i = n));
              }),
                e.splice(i, 0, r);
            }),
              (r.save = function (e) {
                try {
                  e ? r.storage.setItem('debug', e) : r.storage.removeItem('debug');
                } catch (e) {}
              }),
              (r.load = function () {
                let e;
                try {
                  e = r.storage.getItem('debug');
                } catch (e) {}
                !e && void 0 !== n && 'env' in n && (e = n.env.DEBUG);
                return e;
              }),
              (r.useColors = function () {
                if (
                  typeof window !== 'undefined' &&
                  window.process &&
                  (window.process.type === 'renderer' || window.process.__nwjs)
                )
                  return !0;
                if (
                  typeof navigator !== 'undefined' &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
                )
                  return !1;
                let e;
                return (
                  (typeof document !== 'undefined' &&
                    document.documentElement &&
                    document.documentElement.style &&
                    document.documentElement.style.WebkitAppearance) ||
                  (typeof window !== 'undefined' &&
                    window.console &&
                    (window.console.firebug ||
                      (window.console.exception && window.console.table))) ||
                  (typeof navigator !== 'undefined' &&
                    navigator.userAgent &&
                    (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
                    parseInt(e[1], 10) >= 31) ||
                  (typeof navigator !== 'undefined' &&
                    navigator.userAgent &&
                    navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
                );
              }),
              (r.storage = (function () {
                try {
                  return localStorage;
                } catch (e) {}
              })()),
              (r.destroy = (() => {
                let e = !1;
                return () => {
                  e ||
                    ((e = !0),
                    console.warn(
                      'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
                    ));
                };
              })()),
              (r.colors = [
                '#0000CC',
                '#0000FF',
                '#0033CC',
                '#0033FF',
                '#0066CC',
                '#0066FF',
                '#0099CC',
                '#0099FF',
                '#00CC00',
                '#00CC33',
                '#00CC66',
                '#00CC99',
                '#00CCCC',
                '#00CCFF',
                '#3300CC',
                '#3300FF',
                '#3333CC',
                '#3333FF',
                '#3366CC',
                '#3366FF',
                '#3399CC',
                '#3399FF',
                '#33CC00',
                '#33CC33',
                '#33CC66',
                '#33CC99',
                '#33CCCC',
                '#33CCFF',
                '#6600CC',
                '#6600FF',
                '#6633CC',
                '#6633FF',
                '#66CC00',
                '#66CC33',
                '#9900CC',
                '#9900FF',
                '#9933CC',
                '#9933FF',
                '#99CC00',
                '#99CC33',
                '#CC0000',
                '#CC0033',
                '#CC0066',
                '#CC0099',
                '#CC00CC',
                '#CC00FF',
                '#CC3300',
                '#CC3333',
                '#CC3366',
                '#CC3399',
                '#CC33CC',
                '#CC33FF',
                '#CC6600',
                '#CC6633',
                '#CC9900',
                '#CC9933',
                '#CCCC00',
                '#CCCC33',
                '#FF0000',
                '#FF0033',
                '#FF0066',
                '#FF0099',
                '#FF00CC',
                '#FF00FF',
                '#FF3300',
                '#FF3333',
                '#FF3366',
                '#FF3399',
                '#FF33CC',
                '#FF33FF',
                '#FF6600',
                '#FF6633',
                '#FF9900',
                '#FF9933',
                '#FFCC00',
                '#FFCC33',
              ]),
              (r.log = console.debug || console.log || (() => {})),
              (t.exports = e('./common')(r));
            const { formatters: i } = t.exports;
            i.j = function (e) {
              try {
                return JSON.stringify(e);
              } catch (e) {
                return '[UnexpectedJSONParseError]: ' + e.message;
              }
            };
          }).call(this);
        }).call(this, e('_process'));
      },
      { './common': 136, _process: 150 },
    ],
    136: [
      function (e, t, r) {
        t.exports = function (t) {
          function r(e) {
            let t;
            let i;
            let o;
            let s = null;
            function a(...e) {
              if (!a.enabled) return;
              const n = a;
              const i = Number(new Date());
              const o = i - (t || i);
              (n.diff = o),
                (n.prev = t),
                (n.curr = i),
                (t = i),
                (e[0] = r.coerce(e[0])),
                typeof e[0] !== 'string' && e.unshift('%O');
              let s = 0;
              (e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
                if (t === '%%') return '%';
                s++;
                const o = r.formatters[i];
                if (typeof o === 'function') {
                  const r = e[s];
                  (t = o.call(n, r)), e.splice(s, 1), s--;
                }
                return t;
              })),
                r.formatArgs.call(n, e);
              (n.log || r.log).apply(n, e);
            }
            return (
              (a.namespace = e),
              (a.useColors = r.useColors()),
              (a.color = r.selectColor(e)),
              (a.extend = n),
              (a.destroy = r.destroy),
              Object.defineProperty(a, 'enabled', {
                enumerable: !0,
                configurable: !1,
                get: () =>
                  s !== null
                    ? s
                    : (i !== r.namespaces && ((i = r.namespaces), (o = r.enabled(e))), o),
                set: e => {
                  s = e;
                },
              }),
              typeof r.init === 'function' && r.init(a),
              a
            );
          }
          function n(e, t) {
            const n = r(this.namespace + (void 0 === t ? ':' : t) + e);
            return (n.log = this.log), n;
          }
          function i(e) {
            return e
              .toString()
              .substring(2, e.toString().length - 2)
              .replace(/\.\*\?$/, '*');
          }
          return (
            (r.debug = r),
            (r.default = r),
            (r.coerce = function (e) {
              if (e instanceof Error) return e.stack || e.message;
              return e;
            }),
            (r.disable = function () {
              const e = [...r.names.map(i), ...r.skips.map(i).map(e => '-' + e)].join(',');
              return r.enable(''), e;
            }),
            (r.enable = function (e) {
              let t;
              r.save(e), (r.namespaces = e), (r.names = []), (r.skips = []);
              const n = (typeof e === 'string' ? e : '').split(/[\s,]+/);
              const i = n.length;
              for (t = 0; t < i; t++)
                n[t] &&
                  ((e = n[t].replace(/\*/g, '.*?'))[0] === '-'
                    ? r.skips.push(new RegExp('^' + e.slice(1) + '$'))
                    : r.names.push(new RegExp('^' + e + '$')));
            }),
            (r.enabled = function (e) {
              if (e[e.length - 1] === '*') return !0;
              let t, n;
              for (t = 0, n = r.skips.length; t < n; t++) if (r.skips[t].test(e)) return !1;
              for (t = 0, n = r.names.length; t < n; t++) if (r.names[t].test(e)) return !0;
              return !1;
            }),
            (r.humanize = e('ms')),
            (r.destroy = function () {
              console.warn(
                'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
              );
            }),
            Object.keys(t).forEach(e => {
              r[e] = t[e];
            }),
            (r.names = []),
            (r.skips = []),
            (r.formatters = {}),
            (r.selectColor = function (e) {
              let t = 0;
              for (let r = 0; r < e.length; r++) (t = (t << 5) - t + e.charCodeAt(r)), (t |= 0);
              return r.colors[Math.abs(t) % r.colors.length];
            }),
            r.enable(r.load()),
            r
          );
        };
      },
      { ms: 145 },
    ],
    137: [
      function (e, t, r) {
        (function (e) {
          (function () {
            'use strict';
            const t =
              (this && this.__spreadArrays) ||
              function () {
                for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
                const n = Array(e);
                let i = 0;
                for (t = 0; t < r; t++)
                  for (let o = arguments[t], s = 0, a = o.length; s < a; s++, i++) n[i] = o[s];
                return n;
              };
            Object.defineProperty(r, '__esModule', { value: !0 });
            const n = function (e, t, r) {
              (this.name = e), (this.version = t), (this.os = r), (this.type = 'browser');
            };
            r.BrowserInfo = n;
            const i = function (t) {
              (this.version = t),
                (this.type = 'node'),
                (this.name = 'node'),
                (this.os = e.platform);
            };
            r.NodeInfo = i;
            const o = function (e, t, r, n) {
              (this.name = e),
                (this.version = t),
                (this.os = r),
                (this.bot = n),
                (this.type = 'bot-device');
            };
            r.SearchBotDeviceInfo = o;
            const s = function () {
              (this.type = 'bot'),
                (this.bot = !0),
                (this.name = 'bot'),
                (this.version = null),
                (this.os = null);
            };
            r.BotInfo = s;
            const a = function () {
              (this.type = 'react-native'),
                (this.name = 'react-native'),
                (this.version = null),
                (this.os = null);
            };
            r.ReactNativeInfo = a;
            const c =
              /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
            const u = 3;
            const l = [
              ['aol', /AOLShield\/([0-9\._]+)/],
              ['edge', /Edge\/([0-9\._]+)/],
              ['edge-ios', /EdgiOS\/([0-9\._]+)/],
              ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
              ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
              ['samsung', /SamsungBrowser\/([0-9\.]+)/],
              ['silk', /\bSilk\/([0-9._-]+)\b/],
              ['miui', /MiuiBrowser\/([0-9\.]+)$/],
              ['beaker', /BeakerBrowser\/([0-9\.]+)/],
              ['edge-chromium', /EdgA?\/([0-9\.]+)/],
              ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
              ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
              ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
              ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
              ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
              ['fxios', /FxiOS\/([0-9\.]+)/],
              ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
              ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
              ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
              ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
              ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
              ['ie', /MSIE\s(7\.0)/],
              ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
              ['android', /Android\s([0-9\.]+)/],
              ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
              ['safari', /Version\/([0-9\._]+).*Safari/],
              ['facebook', /FBAV\/([0-9\.]+)/],
              ['instagram', /Instagram\s([0-9\.]+)/],
              ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
              ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
              [
                'searchbot',
                /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,
              ],
            ];
            const d = [
              ['iOS', /iP(hone|od|ad)/],
              ['Android OS', /Android/],
              ['BlackBerry OS', /BlackBerry|BB10/],
              ['Windows Mobile', /IEMobile/],
              ['Amazon OS', /Kindle/],
              ['Windows 3.11', /Win16/],
              ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
              ['Windows 98', /(Windows 98)|(Win98)/],
              ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
              ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
              ['Windows Server 2003', /(Windows NT 5.2)/],
              ['Windows Vista', /(Windows NT 6.0)/],
              ['Windows 7', /(Windows NT 6.1)/],
              ['Windows 8', /(Windows NT 6.2)/],
              ['Windows 8.1', /(Windows NT 6.3)/],
              ['Windows 10', /(Windows NT 10.0)/],
              ['Windows ME', /Windows ME/],
              ['Open BSD', /OpenBSD/],
              ['Sun OS', /SunOS/],
              ['Chrome OS', /CrOS/],
              ['Linux', /(Linux)|(X11)/],
              ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
              ['QNX', /QNX/],
              ['BeOS', /BeOS/],
              ['OS/2', /OS\/2/],
            ];
            function f(e) {
              return (
                e !== '' &&
                l.reduce(function (t, r) {
                  const n = r[0];
                  const i = r[1];
                  if (t) return t;
                  const o = i.exec(e);
                  return !!o && [n, o];
                }, !1)
              );
            }
            function h(e) {
              const r = f(e);
              if (!r) return null;
              const i = r[0];
              const a = r[1];
              if (i === 'searchbot') return new s();
              let l = a[1] && a[1].split(/[._]/).slice(0, 3);
              l
                ? l.length < u &&
                  (l = t(
                    l,
                    (function (e) {
                      for (var t = [], r = 0; r < e; r++) t.push('0');
                      return t;
                    })(u - l.length)
                  ))
                : (l = []);
              const d = l.join('.');
              const h = p(e);
              const g = c.exec(e);
              return g && g[1] ? new o(i, d, h, g[1]) : new n(i, d, h);
            }
            function p(e) {
              for (let t = 0, r = d.length; t < r; t++) {
                const n = d[t];
                const i = n[0];
                if (n[1].exec(e)) return i;
              }
              return null;
            }
            function g() {
              return void 0 !== e && e.version ? new i(e.version.slice(1)) : null;
            }
            (r.detect = function (e) {
              return e
                ? h(e)
                : typeof document === 'undefined' &&
                    typeof navigator !== 'undefined' &&
                    navigator.product === 'ReactNative'
                  ? new a()
                  : typeof navigator !== 'undefined'
                    ? h(navigator.userAgent)
                    : g();
            }),
              (r.browserName = function (e) {
                const t = f(e);
                return t ? t[0] : null;
              }),
              (r.parseUserAgent = h),
              (r.detectOS = p),
              (r.getNodeVersion = g);
          }).call(this);
        }).call(this, e('_process'));
      },
      { _process: 150 },
    ],
    138: [
      function (e, t, r) {
        'use strict';
        let n;
        const i = typeof Reflect === 'object' ? Reflect : null;
        const o =
          i && typeof i.apply === 'function'
            ? i.apply
            : function (e, t, r) {
                return Function.prototype.apply.call(e, t, r);
              };
        n =
          i && typeof i.ownKeys === 'function'
            ? i.ownKeys
            : Object.getOwnPropertySymbols
              ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
                }
              : function (e) {
                  return Object.getOwnPropertyNames(e);
                };
        const s =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function a() {
          a.init.call(this);
        }
        (t.exports = a),
          (t.exports.once = function (e, t) {
            return new Promise(function (r, n) {
              function i(r) {
                e.removeListener(t, o), n(r);
              }
              function o() {
                typeof e.removeListener === 'function' && e.removeListener('error', i),
                  r([].slice.call(arguments));
              }
              y(e, t, o, { once: !0 }),
                t !== 'error' &&
                  (function (e, t, r) {
                    typeof e.on === 'function' && y(e, 'error', t, r);
                  })(e, i, { once: !0 });
            });
          }),
          (a.EventEmitter = a),
          (a.prototype._events = void 0),
          (a.prototype._eventsCount = 0),
          (a.prototype._maxListeners = void 0);
        let c = 10;
        function u(e) {
          if (typeof e !== 'function')
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' + typeof e
            );
        }
        function l(e) {
          return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners;
        }
        function d(e, t, r, n) {
          let i, o, s, a;
          if (
            (u(r),
            void 0 === (o = e._events)
              ? ((o = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== o.newListener &&
                  (e.emit('newListener', t, r.listener ? r.listener : r), (o = e._events)),
                (s = o[t])),
            void 0 === s)
          )
            (s = o[t] = r), ++e._eventsCount;
          else if (
            (typeof s === 'function'
              ? (s = o[t] = n ? [r, s] : [s, r])
              : n
                ? s.unshift(r)
                : s.push(r),
            (i = l(e)) > 0 && s.length > i && !s.warned)
          ) {
            s.warned = !0;
            const c = new Error(
              'Possible EventEmitter memory leak detected. ' +
                s.length +
                ' ' +
                String(t) +
                ' listeners added. Use emitter.setMaxListeners() to increase limit'
            );
            (c.name = 'MaxListenersExceededWarning'),
              (c.emitter = e),
              (c.type = t),
              (c.count = s.length),
              (a = c),
              console && console.warn && console.warn(a);
          }
          return e;
        }
        function f() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              arguments.length === 0
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function h(e, t, r) {
          const n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r };
          const i = f.bind(n);
          return (i.listener = r), (n.wrapFn = i), i;
        }
        function p(e, t, r) {
          const n = e._events;
          if (void 0 === n) return [];
          const i = n[t];
          return void 0 === i
            ? []
            : typeof i === 'function'
              ? r
                ? [i.listener || i]
                : [i]
              : r
                ? (function (e) {
                    for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                      t[r] = e[r].listener || e[r];
                    return t;
                  })(i)
                : m(i, i.length);
        }
        function g(e) {
          const t = this._events;
          if (void 0 !== t) {
            const r = t[e];
            if (typeof r === 'function') return 1;
            if (void 0 !== r) return r.length;
          }
          return 0;
        }
        function m(e, t) {
          for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
          return r;
        }
        function y(e, t, r, n) {
          if (typeof e.on === 'function') n.once ? e.once(t, r) : e.on(t, r);
          else {
            if (typeof e.addEventListener !== 'function')
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' + typeof e
              );
            e.addEventListener(t, function i(o) {
              n.once && e.removeEventListener(t, i), r(o);
            });
          }
        }
        Object.defineProperty(a, 'defaultMaxListeners', {
          enumerable: !0,
          get: function () {
            return c;
          },
          set: function (e) {
            if (typeof e !== 'number' || e < 0 || s(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  '.'
              );
            c = e;
          },
        }),
          (a.init = function () {
            (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (a.prototype.setMaxListeners = function (e) {
            if (typeof e !== 'number' || e < 0 || s(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  '.'
              );
            return (this._maxListeners = e), this;
          }),
          (a.prototype.getMaxListeners = function () {
            return l(this);
          }),
          (a.prototype.emit = function (e) {
            for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
            let n = e === 'error';
            const i = this._events;
            if (void 0 !== i) n = n && void 0 === i.error;
            else if (!n) return !1;
            if (n) {
              let s;
              if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
              const a = new Error('Unhandled error.' + (s ? ' (' + s.message + ')' : ''));
              throw ((a.context = s), a);
            }
            const c = i[e];
            if (void 0 === c) return !1;
            if (typeof c === 'function') o(c, this, t);
            else {
              const u = c.length;
              const l = m(c, u);
              for (r = 0; r < u; ++r) o(l[r], this, t);
            }
            return !0;
          }),
          (a.prototype.addListener = function (e, t) {
            return d(this, e, t, !1);
          }),
          (a.prototype.on = a.prototype.addListener),
          (a.prototype.prependListener = function (e, t) {
            return d(this, e, t, !0);
          }),
          (a.prototype.once = function (e, t) {
            return u(t), this.on(e, h(this, e, t)), this;
          }),
          (a.prototype.prependOnceListener = function (e, t) {
            return u(t), this.prependListener(e, h(this, e, t)), this;
          }),
          (a.prototype.removeListener = function (e, t) {
            let r, n, i, o, s;
            if ((u(t), void 0 === (n = this._events))) return this;
            if (void 0 === (r = n[e])) return this;
            if (r === t || r.listener === t)
              --this._eventsCount == 0
                ? (this._events = Object.create(null))
                : (delete n[e],
                  n.removeListener && this.emit('removeListener', e, r.listener || t));
            else if (typeof r !== 'function') {
              for (i = -1, o = r.length - 1; o >= 0; o--)
                if (r[o] === t || r[o].listener === t) {
                  (s = r[o].listener), (i = o);
                  break;
                }
              if (i < 0) return this;
              i === 0
                ? r.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(r, i),
                r.length === 1 && (n[e] = r[0]),
                void 0 !== n.removeListener && this.emit('removeListener', e, s || t);
            }
            return this;
          }),
          (a.prototype.off = a.prototype.removeListener),
          (a.prototype.removeAllListeners = function (e) {
            let t, r, n;
            if (void 0 === (r = this._events)) return this;
            if (void 0 === r.removeListener)
              return (
                arguments.length === 0
                  ? ((this._events = Object.create(null)), (this._eventsCount = 0))
                  : void 0 !== r[e] &&
                    (--this._eventsCount == 0 ? (this._events = Object.create(null)) : delete r[e]),
                this
              );
            if (arguments.length === 0) {
              let i;
              const o = Object.keys(r);
              for (n = 0; n < o.length; ++n)
                (i = o[n]) !== 'removeListener' && this.removeAllListeners(i);
              return (
                this.removeAllListeners('removeListener'),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if (typeof (t = r[e]) === 'function') this.removeListener(e, t);
            else if (void 0 !== t) for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
            return this;
          }),
          (a.prototype.listeners = function (e) {
            return p(this, e, !0);
          }),
          (a.prototype.rawListeners = function (e) {
            return p(this, e, !1);
          }),
          (a.listenerCount = function (e, t) {
            return typeof e.listenerCount === 'function' ? e.listenerCount(t) : g.call(e, t);
          }),
          (a.prototype.listenerCount = g),
          (a.prototype.eventNames = function () {
            return this._eventsCount > 0 ? n(this._events) : [];
          });
      },
      {},
    ],
    139: [
      function (e, t, r) {
        'use strict';
        t.exports = function e(t, r) {
          if (t === r) return !0;
          if (t && r && typeof t === 'object' && typeof r === 'object') {
            if (t.constructor !== r.constructor) return !1;
            let n, i, o;
            if (Array.isArray(t)) {
              if ((n = t.length) != r.length) return !1;
              for (i = n; i-- != 0; ) if (!e(t[i], r[i])) return !1;
              return !0;
            }
            if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
            if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
            if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
            if ((n = (o = Object.keys(t)).length) !== Object.keys(r).length) return !1;
            for (i = n; i-- != 0; ) if (!Object.prototype.hasOwnProperty.call(r, o[i])) return !1;
            for (i = n; i-- != 0; ) {
              const s = o[i];
              if (!e(t[s], r[s])) return !1;
            }
            return !0;
          }
          return t != t && r != r;
        };
      },
      {},
    ],
    140: [
      function (e, t, r) {
        (t.exports = c), (c.default = c), (c.stable = f), (c.stableStringify = f);
        const n = '[...]';
        const i = '[Circular]';
        const o = [];
        const s = [];
        function a() {
          return { depthLimit: Number.MAX_SAFE_INTEGER, edgesLimit: Number.MAX_SAFE_INTEGER };
        }
        function c(e, t, r, n) {
          let i;
          void 0 === n && (n = a()), l(e, '', 0, [], void 0, 0, n);
          try {
            i = s.length === 0 ? JSON.stringify(e, t, r) : JSON.stringify(e, p(t), r);
          } catch (e) {
            return JSON.stringify(
              '[unable to serialize, circular reference is too complex to analyze]'
            );
          } finally {
            for (; o.length !== 0; ) {
              const c = o.pop();
              c.length === 4 ? Object.defineProperty(c[0], c[1], c[3]) : (c[0][c[1]] = c[2]);
            }
          }
          return i;
        }
        function u(e, t, r, n) {
          const i = Object.getOwnPropertyDescriptor(n, r);
          void 0 !== i.get
            ? i.configurable
              ? (Object.defineProperty(n, r, { value: e }), o.push([n, r, t, i]))
              : s.push([t, r, e])
            : ((n[r] = e), o.push([n, r, t]));
        }
        function l(e, t, r, o, s, a, c) {
          let d;
          if (((a += 1), typeof e === 'object' && e !== null)) {
            for (d = 0; d < o.length; d++) if (o[d] === e) return void u(i, e, t, s);
            if (void 0 !== c.depthLimit && a > c.depthLimit) return void u(n, e, t, s);
            if (void 0 !== c.edgesLimit && r + 1 > c.edgesLimit) return void u(n, e, t, s);
            if ((o.push(e), Array.isArray(e)))
              for (d = 0; d < e.length; d++) l(e[d], d, d, o, e, a, c);
            else {
              const f = Object.keys(e);
              for (d = 0; d < f.length; d++) {
                const h = f[d];
                l(e[h], h, d, o, e, a, c);
              }
            }
            o.pop();
          }
        }
        function d(e, t) {
          return e < t ? -1 : e > t ? 1 : 0;
        }
        function f(e, t, r, n) {
          void 0 === n && (n = a());
          let i;
          const c = h(e, '', 0, [], void 0, 0, n) || e;
          try {
            i = s.length === 0 ? JSON.stringify(c, t, r) : JSON.stringify(c, p(t), r);
          } catch (e) {
            return JSON.stringify(
              '[unable to serialize, circular reference is too complex to analyze]'
            );
          } finally {
            for (; o.length !== 0; ) {
              const u = o.pop();
              u.length === 4 ? Object.defineProperty(u[0], u[1], u[3]) : (u[0][u[1]] = u[2]);
            }
          }
          return i;
        }
        function h(e, t, r, s, a, c, l) {
          let f;
          if (((c += 1), typeof e === 'object' && e !== null)) {
            for (f = 0; f < s.length; f++) if (s[f] === e) return void u(i, e, t, a);
            try {
              if (typeof e.toJSON === 'function') return;
            } catch (e) {
              return;
            }
            if (void 0 !== l.depthLimit && c > l.depthLimit) return void u(n, e, t, a);
            if (void 0 !== l.edgesLimit && r + 1 > l.edgesLimit) return void u(n, e, t, a);
            if ((s.push(e), Array.isArray(e)))
              for (f = 0; f < e.length; f++) h(e[f], f, f, s, e, c, l);
            else {
              const p = {};
              const g = Object.keys(e).sort(d);
              for (f = 0; f < g.length; f++) {
                const m = g[f];
                h(e[m], m, f, s, e, c, l), (p[m] = e[m]);
              }
              if (void 0 === a) return p;
              o.push([a, t, e]), (a[t] = p);
            }
            s.pop();
          }
        }
        function p(e) {
          return (
            (e =
              void 0 !== e
                ? e
                : function (e, t) {
                    return t;
                  }),
            function (t, r) {
              if (s.length > 0)
                for (let n = 0; n < s.length; n++) {
                  const i = s[n];
                  if (i[1] === t && i[0] === r) {
                    (r = i[2]), s.splice(n, 1);
                    break;
                  }
                }
              return e.call(this, t, r);
            }
          );
        }
      },
      {},
    ],
    141: [
      function (e, t, r) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        (r.read = function (e, t, r, n, i) {
          let o;
          let s;
          const a = 8 * i - n - 1;
          const c = (1 << a) - 1;
          const u = c >> 1;
          let l = -7;
          let d = r ? i - 1 : 0;
          const f = r ? -1 : 1;
          let h = e[t + d];
          for (
            d += f, o = h & ((1 << -l) - 1), h >>= -l, l += a;
            l > 0;
            o = 256 * o + e[t + d], d += f, l -= 8
          );
          for (
            s = o & ((1 << -l) - 1), o >>= -l, l += n;
            l > 0;
            s = 256 * s + e[t + d], d += f, l -= 8
          );
          if (o === 0) o = 1 - u;
          else {
            if (o === c) return s ? NaN : (1 / 0) * (h ? -1 : 1);
            (s += Math.pow(2, n)), (o -= u);
          }
          return (h ? -1 : 1) * s * Math.pow(2, o - n);
        }),
          (r.write = function (e, t, r, n, i, o) {
            let s;
            let a;
            let c;
            let u = 8 * o - i - 1;
            const l = (1 << u) - 1;
            const d = l >> 1;
            const f = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
            let h = n ? 0 : o - 1;
            const p = n ? 1 : -1;
            const g = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
            for (
              t = Math.abs(t),
                isNaN(t) || t === 1 / 0
                  ? ((a = isNaN(t) ? 1 : 0), (s = l))
                  : ((s = Math.floor(Math.log(t) / Math.LN2)),
                    t * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                    (t += s + d >= 1 ? f / c : f * Math.pow(2, 1 - d)) * c >= 2 && (s++, (c /= 2)),
                    s + d >= l
                      ? ((a = 0), (s = l))
                      : s + d >= 1
                        ? ((a = (t * c - 1) * Math.pow(2, i)), (s += d))
                        : ((a = t * Math.pow(2, d - 1) * Math.pow(2, i)), (s = 0)));
              i >= 8;
              e[r + h] = 255 & a, h += p, a /= 256, i -= 8
            );
            for (s = (s << i) | a, u += i; u > 0; e[r + h] = 255 & s, h += p, s /= 256, u -= 8);
            e[r + h - p] |= 128 * g;
          });
      },
      {},
    ],
    142: [
      function (e, t, r) {
        typeof Object.create === 'function'
          ? (t.exports = function (e, t) {
              t &&
                ((e.super_ = t),
                (e.prototype = Object.create(t.prototype, {
                  constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                })));
            })
          : (t.exports = function (e, t) {
              if (t) {
                e.super_ = t;
                const r = function () {};
                (r.prototype = t.prototype), (e.prototype = new r()), (e.prototype.constructor = e);
              }
            });
      },
      {},
    ],
    143: [
      function (e, t, r) {
        'use strict';
        const n = e => e !== null && typeof e === 'object' && typeof e.pipe === 'function';
        (n.writable = e =>
          n(e) &&
          !1 !== e.writable &&
          typeof e._write === 'function' &&
          typeof e._writableState === 'object'),
          (n.readable = e =>
            n(e) &&
            !1 !== e.readable &&
            typeof e._read === 'function' &&
            typeof e._readableState === 'object'),
          (n.duplex = e => n.writable(e) && n.readable(e)),
          (n.transform = e =>
            n.duplex(e) &&
            typeof e._transform === 'function' &&
            typeof e._transformState === 'object'),
          (t.exports = n);
      },
      {},
    ],
    144: [
      function (e, t, r) {
        !(function (e, r) {
          'use strict';
          typeof define === 'function' && define.amd
            ? define(r)
            : typeof t === 'object' && t.exports
              ? (t.exports = r())
              : (e.log = r());
        })(this, function () {
          'use strict';
          const e = function () {};
          const t = 'undefined';
          const r =
            typeof window !== t &&
            typeof window.navigator !== t &&
            /Trident\/|MSIE /.test(window.navigator.userAgent);
          const n = ['trace', 'debug', 'info', 'warn', 'error'];
          const i = {};
          let o = null;
          function s(e, t) {
            const r = e[t];
            if (typeof r.bind === 'function') return r.bind(e);
            try {
              return Function.prototype.bind.call(r, e);
            } catch (t) {
              return function () {
                return Function.prototype.apply.apply(r, [e, arguments]);
              };
            }
          }
          function a() {
            console.log &&
              (console.log.apply
                ? console.log.apply(console, arguments)
                : Function.prototype.apply.apply(console.log, [console, arguments])),
              console.trace && console.trace();
          }
          function c() {
            for (var r = this.getLevel(), i = 0; i < n.length; i++) {
              const o = n[i];
              this[o] = i < r ? e : this.methodFactory(o, r, this.name);
            }
            if (((this.log = this.debug), typeof console === t && r < this.levels.SILENT))
              return 'No console available for logging';
          }
          function u(e) {
            return function () {
              typeof console !== t && (c.call(this), this[e].apply(this, arguments));
            };
          }
          function l(n, i, o) {
            return (
              (function (n) {
                return (
                  n === 'debug' && (n = 'log'),
                  typeof console !== t &&
                    (n === 'trace' && r
                      ? a
                      : void 0 !== console[n]
                        ? s(console, n)
                        : void 0 !== console.log
                          ? s(console, 'log')
                          : e)
                );
              })(n) || u.apply(this, arguments)
            );
          }
          function d(e, r) {
            let s;
            let a;
            let u;
            const d = this;
            let f = 'loglevel';
            function h() {
              let e;
              if (typeof window !== t && f) {
                try {
                  e = window.localStorage[f];
                } catch (e) {}
                if (typeof e === t)
                  try {
                    const r = window.document.cookie;
                    const n = encodeURIComponent(f);
                    const i = r.indexOf(n + '=');
                    i !== -1 && (e = /^([^;]+)/.exec(r.slice(i + n.length + 1))[1]);
                  } catch (e) {}
                return void 0 === d.levels[e] && (e = void 0), e;
              }
            }
            function p(e) {
              let t = e;
              if (
                (typeof t === 'string' &&
                  void 0 !== d.levels[t.toUpperCase()] &&
                  (t = d.levels[t.toUpperCase()]),
                typeof t === 'number' && t >= 0 && t <= d.levels.SILENT)
              )
                return t;
              throw new TypeError('log.setLevel() called with invalid level: ' + e);
            }
            typeof e === 'string' ? (f += ':' + e) : typeof e === 'symbol' && (f = void 0),
              (d.name = e),
              (d.levels = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, SILENT: 5 }),
              (d.methodFactory = r || l),
              (d.getLevel = function () {
                return u != null ? u : a != null ? a : s;
              }),
              (d.setLevel = function (e, r) {
                return (
                  (u = p(e)),
                  !1 !== r &&
                    (function (e) {
                      const r = (n[e] || 'silent').toUpperCase();
                      if (typeof window !== t && f) {
                        try {
                          return void (window.localStorage[f] = r);
                        } catch (e) {}
                        try {
                          window.document.cookie = encodeURIComponent(f) + '=' + r + ';';
                        } catch (e) {}
                      }
                    })(u),
                  c.call(d)
                );
              }),
              (d.setDefaultLevel = function (e) {
                (a = p(e)), h() || d.setLevel(e, !1);
              }),
              (d.resetLevel = function () {
                (u = null),
                  (function () {
                    if (typeof window !== t && f) {
                      try {
                        window.localStorage.removeItem(f);
                      } catch (e) {}
                      try {
                        window.document.cookie =
                          encodeURIComponent(f) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                      } catch (e) {}
                    }
                  })(),
                  c.call(d);
              }),
              (d.enableAll = function (e) {
                d.setLevel(d.levels.TRACE, e);
              }),
              (d.disableAll = function (e) {
                d.setLevel(d.levels.SILENT, e);
              }),
              (d.rebuild = function () {
                if ((o !== d && (s = p(o.getLevel())), c.call(d), o === d))
                  for (const e in i) i[e].rebuild();
              }),
              (s = p(o ? o.getLevel() : 'WARN'));
            const g = h();
            g != null && (u = p(g)), c.call(d);
          }
          (o = new d()).getLogger = function (e) {
            if ((typeof e !== 'symbol' && typeof e !== 'string') || e === '')
              throw new TypeError('You must supply a name when creating a logger.');
            let t = i[e];
            return t || (t = i[e] = new d(e, o.methodFactory)), t;
          };
          const f = typeof window !== t ? window.log : void 0;
          return (
            (o.noConflict = function () {
              return typeof window !== t && window.log === o && (window.log = f), o;
            }),
            (o.getLoggers = function () {
              return i;
            }),
            (o.default = o),
            o
          );
        });
      },
      {},
    ],
    145: [
      function (e, t, r) {
        const n = 1e3;
        const i = 60 * n;
        const o = 60 * i;
        const s = 24 * o;
        const a = 7 * s;
        const c = 365.25 * s;
        function u(e, t, r, n) {
          const i = t >= 1.5 * r;
          return Math.round(e / r) + ' ' + n + (i ? 's' : '');
        }
        t.exports = function (e, t) {
          t = t || {};
          const r = typeof e;
          if (r === 'string' && e.length > 0)
            return (function (e) {
              if ((e = String(e)).length > 100) return;
              const t =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                  e
                );
              if (!t) return;
              const r = parseFloat(t[1]);
              switch ((t[2] || 'ms').toLowerCase()) {
                case 'years':
                case 'year':
                case 'yrs':
                case 'yr':
                case 'y':
                  return r * c;
                case 'weeks':
                case 'week':
                case 'w':
                  return r * a;
                case 'days':
                case 'day':
                case 'd':
                  return r * s;
                case 'hours':
                case 'hour':
                case 'hrs':
                case 'hr':
                case 'h':
                  return r * o;
                case 'minutes':
                case 'minute':
                case 'mins':
                case 'min':
                case 'm':
                  return r * i;
                case 'seconds':
                case 'second':
                case 'secs':
                case 'sec':
                case 's':
                  return r * n;
                case 'milliseconds':
                case 'millisecond':
                case 'msecs':
                case 'msec':
                case 'ms':
                  return r;
                default:
              }
            })(e);
          if (r === 'number' && isFinite(e))
            return t.long
              ? (function (e) {
                  const t = Math.abs(e);
                  if (t >= s) return u(e, t, s, 'day');
                  if (t >= o) return u(e, t, o, 'hour');
                  if (t >= i) return u(e, t, i, 'minute');
                  if (t >= n) return u(e, t, n, 'second');
                  return e + ' ms';
                })(e)
              : (function (e) {
                  const t = Math.abs(e);
                  if (t >= s) return Math.round(e / s) + 'd';
                  if (t >= o) return Math.round(e / o) + 'h';
                  if (t >= i) return Math.round(e / i) + 'm';
                  if (t >= n) return Math.round(e / n) + 's';
                  return e + 'ms';
                })(e);
          throw new Error(
            'val is not a non-empty string or a valid number. val=' + JSON.stringify(e)
          );
        };
      },
      {},
    ],
    146: [
      function (e, t, r) {
        const n = e('wrappy');
        function i(e) {
          const t = function () {
            return t.called ? t.value : ((t.called = !0), (t.value = e.apply(this, arguments)));
          };
          return (t.called = !1), t;
        }
        function o(e) {
          const t = function () {
            if (t.called) throw new Error(t.onceError);
            return (t.called = !0), (t.value = e.apply(this, arguments));
          };
          const r = e.name || 'Function wrapped with `once`';
          return (t.onceError = r + " shouldn't be called more than once"), (t.called = !1), t;
        }
        (t.exports = n(i)),
          (t.exports.strict = n(o)),
          (i.proto = i(function () {
            Object.defineProperty(Function.prototype, 'once', {
              value: function () {
                return i(this);
              },
              configurable: !0,
            }),
              Object.defineProperty(Function.prototype, 'onceStrict', {
                value: function () {
                  return o(this);
                },
                configurable: !0,
              });
          }));
      },
      { wrappy: 229 },
    ],
    147: [
      function (e, t, r) {
        'use strict';
        const { ErrorWithCause: n } = e('./lib/error-with-cause');
        const {
          findCauseByReference: i,
          getErrorCause: o,
          messageWithCauses: s,
          stackWithCauses: a,
        } = e('./lib/helpers');
        t.exports = {
          ErrorWithCause: n,
          findCauseByReference: i,
          getErrorCause: o,
          stackWithCauses: a,
          messageWithCauses: s,
        };
      },
      { './lib/error-with-cause': 148, './lib/helpers': 149 },
    ],
    148: [
      function (e, t, r) {
        'use strict';
        class n extends Error {
          constructor(e, { cause: t } = {}) {
            super(e), (this.name = n.name), t && (this.cause = t), (this.message = e);
          }
        }
        t.exports = { ErrorWithCause: n };
      },
      {},
    ],
    149: [
      function (e, t, r) {
        'use strict';
        const n = e => {
          if (e && typeof e === 'object' && 'cause' in e) {
            if (typeof e.cause === 'function') {
              const t = e.cause();
              return t instanceof Error ? t : void 0;
            }
            return e.cause instanceof Error ? e.cause : void 0;
          }
        };
        const i = (e, t) => {
          if (!(e instanceof Error)) return '';
          const r = e.stack || '';
          if (t.has(e)) return r + '\ncauses have become circular...';
          const o = n(e);
          return o ? (t.add(e), r + '\ncaused by: ' + i(o, t)) : r;
        };
        const o = (e, t, r) => {
          if (!(e instanceof Error)) return '';
          const i = r ? '' : e.message || '';
          if (t.has(e)) return i + ': ...';
          const s = n(e);
          if (s) {
            t.add(e);
            const r = 'cause' in e && typeof e.cause === 'function';
            return i + (r ? '' : ': ') + o(s, t, r);
          }
          return i;
        };
        t.exports = {
          findCauseByReference: (e, t) => {
            if (!e || !t) return;
            if (!(e instanceof Error)) return;
            if (!(t.prototype instanceof Error) && t !== Error) return;
            const r = new Set();
            let i = e;
            for (; i && !r.has(i); ) {
              if ((r.add(i), i instanceof t)) return i;
              i = n(i);
            }
          },
          getErrorCause: n,
          stackWithCauses: e => i(e, new Set()),
          messageWithCauses: e => o(e, new Set()),
        };
      },
      {},
    ],
    150: [
      function (e, t, r) {
        let n;
        let i;
        const o = (t.exports = {});
        function s() {
          throw new Error('setTimeout has not been defined');
        }
        function a() {
          throw new Error('clearTimeout has not been defined');
        }
        function c(e) {
          if (n === setTimeout) return setTimeout(e, 0);
          if ((n === s || !n) && setTimeout) return (n = setTimeout), setTimeout(e, 0);
          try {
            return n(e, 0);
          } catch (t) {
            try {
              return n.call(null, e, 0);
            } catch (t) {
              return n.call(this, e, 0);
            }
          }
        }
        !(function () {
          try {
            n = typeof setTimeout === 'function' ? setTimeout : s;
          } catch (e) {
            n = s;
          }
          try {
            i = typeof clearTimeout === 'function' ? clearTimeout : a;
          } catch (e) {
            i = a;
          }
        })();
        let u;
        let l = [];
        let d = !1;
        let f = -1;
        function h() {
          d && u && ((d = !1), u.length ? (l = u.concat(l)) : (f = -1), l.length && p());
        }
        function p() {
          if (!d) {
            const e = c(h);
            d = !0;
            for (let t = l.length; t; ) {
              for (u = l, l = []; ++f < t; ) u && u[f].run();
              (f = -1), (t = l.length);
            }
            (u = null),
              (d = !1),
              (function (e) {
                if (i === clearTimeout) return clearTimeout(e);
                if ((i === a || !i) && clearTimeout) return (i = clearTimeout), clearTimeout(e);
                try {
                  return i(e);
                } catch (t) {
                  try {
                    return i.call(null, e);
                  } catch (t) {
                    return i.call(this, e);
                  }
                }
              })(e);
          }
        }
        function g(e, t) {
          (this.fun = e), (this.array = t);
        }
        function m() {}
        (o.nextTick = function (e) {
          const t = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (let r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          l.push(new g(e, t)), l.length !== 1 || d || c(p);
        }),
          (g.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (o.title = 'browser'),
          (o.browser = !0),
          (o.env = {}),
          (o.argv = []),
          (o.version = ''),
          (o.versions = {}),
          (o.on = m),
          (o.addListener = m),
          (o.once = m),
          (o.off = m),
          (o.removeListener = m),
          (o.removeAllListeners = m),
          (o.emit = m),
          (o.prependListener = m),
          (o.prependOnceListener = m),
          (o.listeners = function (e) {
            return [];
          }),
          (o.binding = function (e) {
            throw new Error('process.binding is not supported');
          }),
          (o.cwd = function () {
            return '/';
          }),
          (o.chdir = function (e) {
            throw new Error('process.chdir is not supported');
          }),
          (o.umask = function () {
            return 0;
          });
      },
      {},
    ],
    151: [
      function (e, t, r) {
        'use strict';
        const n = {};
        function i(e, t, r) {
          r || (r = Error);
          const i = (function (e) {
            let r, n;
            function i(r, n, i) {
              return (
                e.call(
                  this,
                  (function (e, r, n) {
                    return typeof t === 'string' ? t : t(e, r, n);
                  })(r, n, i)
                ) || this
              );
            }
            return (
              (n = e),
              ((r = i).prototype = Object.create(n.prototype)),
              (r.prototype.constructor = r),
              (r.__proto__ = n),
              i
            );
          })(r);
          (i.prototype.name = r.name), (i.prototype.code = e), (n[e] = i);
        }
        function o(e, t) {
          if (Array.isArray(e)) {
            const r = e.length;
            return (
              (e = e.map(function (e) {
                return String(e);
              })),
              r > 2
                ? 'one of '.concat(t, ' ').concat(e.slice(0, r - 1).join(', '), ', or ') + e[r - 1]
                : r === 2
                  ? 'one of '.concat(t, ' ').concat(e[0], ' or ').concat(e[1])
                  : 'of '.concat(t, ' ').concat(e[0])
            );
          }
          return 'of '.concat(t, ' ').concat(String(e));
        }
        i(
          'ERR_INVALID_OPT_VALUE',
          function (e, t) {
            return 'The value "' + t + '" is invalid for option "' + e + '"';
          },
          TypeError
        ),
          i(
            'ERR_INVALID_ARG_TYPE',
            function (e, t, r) {
              let n, i, s, a;
              if (
                (typeof t === 'string' &&
                ((i = 'not '), t.substr(!s || s < 0 ? 0 : +s, i.length) === i)
                  ? ((n = 'must not be'), (t = t.replace(/^not /, '')))
                  : (n = 'must be'),
                (function (e, t, r) {
                  return (
                    (void 0 === r || r > e.length) && (r = e.length),
                    e.substring(r - t.length, r) === t
                  );
                })(e, ' argument'))
              )
                a = 'The '.concat(e, ' ').concat(n, ' ').concat(o(t, 'type'));
              else {
                const c = (function (e, t, r) {
                  return (
                    typeof r !== 'number' && (r = 0),
                    !(r + t.length > e.length) && e.indexOf(t, r) !== -1
                  );
                })(e, '.')
                  ? 'property'
                  : 'argument';
                a = 'The "'.concat(e, '" ').concat(c, ' ').concat(n, ' ').concat(o(t, 'type'));
              }
              return (a += '. Received type '.concat(typeof r));
            },
            TypeError
          ),
          i('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF'),
          i('ERR_METHOD_NOT_IMPLEMENTED', function (e) {
            return 'The ' + e + ' method is not implemented';
          }),
          i('ERR_STREAM_PREMATURE_CLOSE', 'Premature close'),
          i('ERR_STREAM_DESTROYED', function (e) {
            return 'Cannot call ' + e + ' after a stream was destroyed';
          }),
          i('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times'),
          i('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable'),
          i('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
          i('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError),
          i(
            'ERR_UNKNOWN_ENCODING',
            function (e) {
              return 'Unknown encoding: ' + e;
            },
            TypeError
          ),
          i('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event'),
          (t.exports.codes = n);
      },
      {},
    ],
    152: [
      function (e, t, r) {
        (function (r) {
          (function () {
            'use strict';
            const n =
              Object.keys ||
              function (e) {
                const t = [];
                for (const r in e) t.push(r);
                return t;
              };
            t.exports = u;
            const i = e('./_stream_readable');
            const o = e('./_stream_writable');
            e('inherits')(u, i);
            for (let s = n(o.prototype), a = 0; a < s.length; a++) {
              const c = s[a];
              u.prototype[c] || (u.prototype[c] = o.prototype[c]);
            }
            function u(e) {
              if (!(this instanceof u)) return new u(e);
              i.call(this, e),
                o.call(this, e),
                (this.allowHalfOpen = !0),
                e &&
                  (!1 === e.readable && (this.readable = !1),
                  !1 === e.writable && (this.writable = !1),
                  !1 === e.allowHalfOpen && ((this.allowHalfOpen = !1), this.once('end', l)));
            }
            function l() {
              this._writableState.ended || r.nextTick(d, this);
            }
            function d(e) {
              e.end();
            }
            Object.defineProperty(u.prototype, 'writableHighWaterMark', {
              enumerable: !1,
              get: function () {
                return this._writableState.highWaterMark;
              },
            }),
              Object.defineProperty(u.prototype, 'writableBuffer', {
                enumerable: !1,
                get: function () {
                  return this._writableState && this._writableState.getBuffer();
                },
              }),
              Object.defineProperty(u.prototype, 'writableLength', {
                enumerable: !1,
                get: function () {
                  return this._writableState.length;
                },
              }),
              Object.defineProperty(u.prototype, 'destroyed', {
                enumerable: !1,
                get: function () {
                  return (
                    void 0 !== this._readableState &&
                    void 0 !== this._writableState &&
                    this._readableState.destroyed &&
                    this._writableState.destroyed
                  );
                },
                set: function (e) {
                  void 0 !== this._readableState &&
                    void 0 !== this._writableState &&
                    ((this._readableState.destroyed = e), (this._writableState.destroyed = e));
                },
              });
          }).call(this);
        }).call(this, e('_process'));
      },
      { './_stream_readable': 154, './_stream_writable': 156, _process: 150, inherits: 142 },
    ],
    153: [
      function (e, t, r) {
        'use strict';
        t.exports = i;
        const n = e('./_stream_transform');
        function i(e) {
          if (!(this instanceof i)) return new i(e);
          n.call(this, e);
        }
        e('inherits')(i, n),
          (i.prototype._transform = function (e, t, r) {
            r(null, e);
          });
      },
      { './_stream_transform': 155, inherits: 142 },
    ],
    154: [
      function (e, t, r) {
        (function (r, n) {
          (function () {
            'use strict';
            let i;
            (t.exports = j), (j.ReadableState = S);
            e('events').EventEmitter;
            const o = function (e, t) {
              return e.listeners(t).length;
            };
            const s = e('./internal/streams/stream');
            const a = e('buffer').Buffer;
            const c =
              (void 0 !== n
                ? n
                : typeof window !== 'undefined'
                  ? window
                  : typeof self !== 'undefined'
                    ? self
                    : {}
              ).Uint8Array || function () {};
            let u;
            const l = e('util');
            u = l && l.debuglog ? l.debuglog('stream') : function () {};
            let d;
            let f;
            let h;
            const p = e('./internal/streams/buffer_list');
            const g = e('./internal/streams/destroy');
            const m = e('./internal/streams/state').getHighWaterMark;
            const y = e('../errors').codes;
            const b = y.ERR_INVALID_ARG_TYPE;
            const w = y.ERR_STREAM_PUSH_AFTER_EOF;
            const v = y.ERR_METHOD_NOT_IMPLEMENTED;
            const E = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
            e('inherits')(j, s);
            const _ = g.errorOrDestroy;
            const M = ['error', 'close', 'destroy', 'pause', 'resume'];
            function S(t, r, n) {
              (i = i || e('./_stream_duplex')),
                (t = t || {}),
                typeof n !== 'boolean' && (n = r instanceof i),
                (this.objectMode = !!t.objectMode),
                n && (this.objectMode = this.objectMode || !!t.readableObjectMode),
                (this.highWaterMark = m(this, t, 'readableHighWaterMark', n)),
                (this.buffer = new p()),
                (this.length = 0),
                (this.pipes = null),
                (this.pipesCount = 0),
                (this.flowing = null),
                (this.ended = !1),
                (this.endEmitted = !1),
                (this.reading = !1),
                (this.sync = !0),
                (this.needReadable = !1),
                (this.emittedReadable = !1),
                (this.readableListening = !1),
                (this.resumeScheduled = !1),
                (this.paused = !0),
                (this.emitClose = !1 !== t.emitClose),
                (this.autoDestroy = !!t.autoDestroy),
                (this.destroyed = !1),
                (this.defaultEncoding = t.defaultEncoding || 'utf8'),
                (this.awaitDrain = 0),
                (this.readingMore = !1),
                (this.decoder = null),
                (this.encoding = null),
                t.encoding &&
                  (d || (d = e('string_decoder/').StringDecoder),
                  (this.decoder = new d(t.encoding)),
                  (this.encoding = t.encoding));
            }
            function j(t) {
              if (((i = i || e('./_stream_duplex')), !(this instanceof j))) return new j(t);
              const r = this instanceof i;
              (this._readableState = new S(t, this, r)),
                (this.readable = !0),
                t &&
                  (typeof t.read === 'function' && (this._read = t.read),
                  typeof t.destroy === 'function' && (this._destroy = t.destroy)),
                s.call(this);
            }
            function I(e, t, r, n, i) {
              u('readableAddChunk', t);
              let o;
              const s = e._readableState;
              if (t === null)
                (s.reading = !1),
                  (function (e, t) {
                    if ((u('onEofChunk'), t.ended)) return;
                    if (t.decoder) {
                      const r = t.decoder.end();
                      r &&
                        r.length &&
                        (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
                    }
                    (t.ended = !0),
                      t.sync
                        ? N(e)
                        : ((t.needReadable = !1),
                          t.emittedReadable || ((t.emittedReadable = !0), O(e)));
                  })(e, s);
              else if (
                (i ||
                  (o = (function (e, t) {
                    let r;
                    (n = t),
                      a.isBuffer(n) ||
                        n instanceof c ||
                        typeof t === 'string' ||
                        void 0 === t ||
                        e.objectMode ||
                        (r = new b('chunk', ['string', 'Buffer', 'Uint8Array'], t));
                    let n;
                    return r;
                  })(s, t)),
                o)
              )
                _(e, o);
              else if (s.objectMode || (t && t.length > 0))
                if (
                  (typeof t === 'string' ||
                    s.objectMode ||
                    Object.getPrototypeOf(t) === a.prototype ||
                    (t = (function (e) {
                      return a.from(e);
                    })(t)),
                  n)
                )
                  s.endEmitted ? _(e, new E()) : A(e, s, t, !0);
                else if (s.ended) _(e, new w());
                else {
                  if (s.destroyed) return !1;
                  (s.reading = !1),
                    s.decoder && !r
                      ? ((t = s.decoder.write(t)),
                        s.objectMode || t.length !== 0 ? A(e, s, t, !1) : C(e, s))
                      : A(e, s, t, !1);
                }
              else n || ((s.reading = !1), C(e, s));
              return !s.ended && (s.length < s.highWaterMark || s.length === 0);
            }
            function A(e, t, r, n) {
              t.flowing && t.length === 0 && !t.sync
                ? ((t.awaitDrain = 0), e.emit('data', r))
                : ((t.length += t.objectMode ? 1 : r.length),
                  n ? t.buffer.unshift(r) : t.buffer.push(r),
                  t.needReadable && N(e)),
                C(e, t);
            }
            Object.defineProperty(j.prototype, 'destroyed', {
              enumerable: !1,
              get: function () {
                return void 0 !== this._readableState && this._readableState.destroyed;
              },
              set: function (e) {
                this._readableState && (this._readableState.destroyed = e);
              },
            }),
              (j.prototype.destroy = g.destroy),
              (j.prototype._undestroy = g.undestroy),
              (j.prototype._destroy = function (e, t) {
                t(e);
              }),
              (j.prototype.push = function (e, t) {
                let r;
                const n = this._readableState;
                return (
                  n.objectMode
                    ? (r = !0)
                    : typeof e === 'string' &&
                      ((t = t || n.defaultEncoding) !== n.encoding &&
                        ((e = a.from(e, t)), (t = '')),
                      (r = !0)),
                  I(this, e, t, !1, r)
                );
              }),
              (j.prototype.unshift = function (e) {
                return I(this, e, null, !0, !1);
              }),
              (j.prototype.isPaused = function () {
                return !1 === this._readableState.flowing;
              }),
              (j.prototype.setEncoding = function (t) {
                d || (d = e('string_decoder/').StringDecoder);
                const r = new d(t);
                (this._readableState.decoder = r),
                  (this._readableState.encoding = this._readableState.decoder.encoding);
                for (var n = this._readableState.buffer.head, i = ''; n !== null; )
                  (i += r.write(n.data)), (n = n.next);
                return (
                  this._readableState.buffer.clear(),
                  i !== '' && this._readableState.buffer.push(i),
                  (this._readableState.length = i.length),
                  this
                );
              });
            const R = 1073741824;
            function T(e, t) {
              return e <= 0 || (t.length === 0 && t.ended)
                ? 0
                : t.objectMode
                  ? 1
                  : e != e
                    ? t.flowing && t.length
                      ? t.buffer.head.data.length
                      : t.length
                    : (e > t.highWaterMark &&
                        (t.highWaterMark = (function (e) {
                          return (
                            e >= R
                              ? (e = R)
                              : (e--,
                                (e |= e >>> 1),
                                (e |= e >>> 2),
                                (e |= e >>> 4),
                                (e |= e >>> 8),
                                (e |= e >>> 16),
                                e++),
                            e
                          );
                        })(e)),
                      e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
            }
            function N(e) {
              const t = e._readableState;
              u('emitReadable', t.needReadable, t.emittedReadable),
                (t.needReadable = !1),
                t.emittedReadable ||
                  (u('emitReadable', t.flowing), (t.emittedReadable = !0), r.nextTick(O, e));
            }
            function O(e) {
              const t = e._readableState;
              u('emitReadable_', t.destroyed, t.length, t.ended),
                t.destroyed ||
                  (!t.length && !t.ended) ||
                  (e.emit('readable'), (t.emittedReadable = !1)),
                (t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark),
                L(e);
            }
            function C(e, t) {
              t.readingMore || ((t.readingMore = !0), r.nextTick(x, e, t));
            }
            function x(e, t) {
              for (
                ;
                !t.reading &&
                !t.ended &&
                (t.length < t.highWaterMark || (t.flowing && t.length === 0));

              ) {
                const r = t.length;
                if ((u('maybeReadMore read 0'), e.read(0), r === t.length)) break;
              }
              t.readingMore = !1;
            }
            function P(e) {
              const t = e._readableState;
              (t.readableListening = e.listenerCount('readable') > 0),
                t.resumeScheduled && !t.paused
                  ? (t.flowing = !0)
                  : e.listenerCount('data') > 0 && e.resume();
            }
            function k(e) {
              u('readable nexttick read 0'), e.read(0);
            }
            function D(e, t) {
              u('resume', t.reading),
                t.reading || e.read(0),
                (t.resumeScheduled = !1),
                e.emit('resume'),
                L(e),
                t.flowing && !t.reading && e.read(0);
            }
            function L(e) {
              const t = e._readableState;
              for (u('flow', t.flowing); t.flowing && e.read() !== null; );
            }
            function $(e, t) {
              return t.length === 0
                ? null
                : (t.objectMode
                    ? (r = t.buffer.shift())
                    : !e || e >= t.length
                      ? ((r = t.decoder
                          ? t.buffer.join('')
                          : t.buffer.length === 1
                            ? t.buffer.first()
                            : t.buffer.concat(t.length)),
                        t.buffer.clear())
                      : (r = t.buffer.consume(e, t.decoder)),
                  r);
              let r;
            }
            function U(e) {
              const t = e._readableState;
              u('endReadable', t.endEmitted), t.endEmitted || ((t.ended = !0), r.nextTick(z, t, e));
            }
            function z(e, t) {
              if (
                (u('endReadableNT', e.endEmitted, e.length),
                !e.endEmitted &&
                  e.length === 0 &&
                  ((e.endEmitted = !0), (t.readable = !1), t.emit('end'), e.autoDestroy))
              ) {
                const r = t._writableState;
                (!r || (r.autoDestroy && r.finished)) && t.destroy();
              }
            }
            function B(e, t) {
              for (let r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
              return -1;
            }
            (j.prototype.read = function (e) {
              u('read', e), (e = parseInt(e, 10));
              const t = this._readableState;
              const r = e;
              if (
                (e !== 0 && (t.emittedReadable = !1),
                e === 0 &&
                  t.needReadable &&
                  ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
              )
                return (
                  u('read: emitReadable', t.length, t.ended),
                  t.length === 0 && t.ended ? U(this) : N(this),
                  null
                );
              if ((e = T(e, t)) === 0 && t.ended) return t.length === 0 && U(this), null;
              let n;
              let i = t.needReadable;
              return (
                u('need readable', i),
                (t.length === 0 || t.length - e < t.highWaterMark) &&
                  u('length less than watermark', (i = !0)),
                t.ended || t.reading
                  ? u('reading or ended', (i = !1))
                  : i &&
                    (u('do read'),
                    (t.reading = !0),
                    (t.sync = !0),
                    t.length === 0 && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    (t.sync = !1),
                    t.reading || (e = T(r, t))),
                (n = e > 0 ? $(e, t) : null) === null
                  ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
                  : ((t.length -= e), (t.awaitDrain = 0)),
                t.length === 0 && (t.ended || (t.needReadable = !0), r !== e && t.ended && U(this)),
                n !== null && this.emit('data', n),
                n
              );
            }),
              (j.prototype._read = function (e) {
                _(this, new v('_read()'));
              }),
              (j.prototype.pipe = function (e, t) {
                const n = this;
                const i = this._readableState;
                switch (i.pipesCount) {
                  case 0:
                    i.pipes = e;
                    break;
                  case 1:
                    i.pipes = [i.pipes, e];
                    break;
                  default:
                    i.pipes.push(e);
                }
                (i.pipesCount += 1), u('pipe count=%d opts=%j', i.pipesCount, t);
                const s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? c : m;
                function a(t, r) {
                  u('onunpipe'),
                    t === n &&
                      r &&
                      !1 === r.hasUnpiped &&
                      ((r.hasUnpiped = !0),
                      u('cleanup'),
                      e.removeListener('close', p),
                      e.removeListener('finish', g),
                      e.removeListener('drain', l),
                      e.removeListener('error', h),
                      e.removeListener('unpipe', a),
                      n.removeListener('end', c),
                      n.removeListener('end', m),
                      n.removeListener('data', f),
                      (d = !0),
                      !i.awaitDrain || (e._writableState && !e._writableState.needDrain) || l());
                }
                function c() {
                  u('onend'), e.end();
                }
                i.endEmitted ? r.nextTick(s) : n.once('end', s), e.on('unpipe', a);
                var l = (function (e) {
                  return function () {
                    const t = e._readableState;
                    u('pipeOnDrain', t.awaitDrain),
                      t.awaitDrain && t.awaitDrain--,
                      t.awaitDrain === 0 && o(e, 'data') && ((t.flowing = !0), L(e));
                  };
                })(n);
                e.on('drain', l);
                var d = !1;
                function f(t) {
                  u('ondata');
                  const r = e.write(t);
                  u('dest.write', r),
                    !1 === r &&
                      (((i.pipesCount === 1 && i.pipes === e) ||
                        (i.pipesCount > 1 && B(i.pipes, e) !== -1)) &&
                        !d &&
                        (u('false write response, pause', i.awaitDrain), i.awaitDrain++),
                      n.pause());
                }
                function h(t) {
                  u('onerror', t),
                    m(),
                    e.removeListener('error', h),
                    o(e, 'error') === 0 && _(e, t);
                }
                function p() {
                  e.removeListener('finish', g), m();
                }
                function g() {
                  u('onfinish'), e.removeListener('close', p), m();
                }
                function m() {
                  u('unpipe'), n.unpipe(e);
                }
                return (
                  n.on('data', f),
                  (function (e, t, r) {
                    if (typeof e.prependListener === 'function') return e.prependListener(t, r);
                    e._events && e._events[t]
                      ? Array.isArray(e._events[t])
                        ? e._events[t].unshift(r)
                        : (e._events[t] = [r, e._events[t]])
                      : e.on(t, r);
                  })(e, 'error', h),
                  e.once('close', p),
                  e.once('finish', g),
                  e.emit('pipe', n),
                  i.flowing || (u('pipe resume'), n.resume()),
                  e
                );
              }),
              (j.prototype.unpipe = function (e) {
                const t = this._readableState;
                const r = { hasUnpiped: !1 };
                if (t.pipesCount === 0) return this;
                if (t.pipesCount === 1)
                  return (
                    (e && e !== t.pipes) ||
                      (e || (e = t.pipes),
                      (t.pipes = null),
                      (t.pipesCount = 0),
                      (t.flowing = !1),
                      e && e.emit('unpipe', this, r)),
                    this
                  );
                if (!e) {
                  const n = t.pipes;
                  const i = t.pipesCount;
                  (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
                  for (let o = 0; o < i; o++) n[o].emit('unpipe', this, { hasUnpiped: !1 });
                  return this;
                }
                const s = B(t.pipes, e);
                return (
                  s === -1 ||
                    (t.pipes.splice(s, 1),
                    (t.pipesCount -= 1),
                    t.pipesCount === 1 && (t.pipes = t.pipes[0]),
                    e.emit('unpipe', this, r)),
                  this
                );
              }),
              (j.prototype.on = function (e, t) {
                const n = s.prototype.on.call(this, e, t);
                const i = this._readableState;
                return (
                  e === 'data'
                    ? ((i.readableListening = this.listenerCount('readable') > 0),
                      !1 !== i.flowing && this.resume())
                    : e === 'readable' &&
                      (i.endEmitted ||
                        i.readableListening ||
                        ((i.readableListening = i.needReadable = !0),
                        (i.flowing = !1),
                        (i.emittedReadable = !1),
                        u('on readable', i.length, i.reading),
                        i.length ? N(this) : i.reading || r.nextTick(k, this))),
                  n
                );
              }),
              (j.prototype.addListener = j.prototype.on),
              (j.prototype.removeListener = function (e, t) {
                const n = s.prototype.removeListener.call(this, e, t);
                return e === 'readable' && r.nextTick(P, this), n;
              }),
              (j.prototype.removeAllListeners = function (e) {
                const t = s.prototype.removeAllListeners.apply(this, arguments);
                return (e !== 'readable' && void 0 !== e) || r.nextTick(P, this), t;
              }),
              (j.prototype.resume = function () {
                const e = this._readableState;
                return (
                  e.flowing ||
                    (u('resume'),
                    (e.flowing = !e.readableListening),
                    (function (e, t) {
                      t.resumeScheduled || ((t.resumeScheduled = !0), r.nextTick(D, e, t));
                    })(this, e)),
                  (e.paused = !1),
                  this
                );
              }),
              (j.prototype.pause = function () {
                return (
                  u('call pause flowing=%j', this._readableState.flowing),
                  !1 !== this._readableState.flowing &&
                    (u('pause'), (this._readableState.flowing = !1), this.emit('pause')),
                  (this._readableState.paused = !0),
                  this
                );
              }),
              (j.prototype.wrap = function (e) {
                const t = this;
                const r = this._readableState;
                let n = !1;
                for (const i in (e.on('end', function () {
                  if ((u('wrapped end'), r.decoder && !r.ended)) {
                    const e = r.decoder.end();
                    e && e.length && t.push(e);
                  }
                  t.push(null);
                }),
                e.on('data', function (i) {
                  (u('wrapped data'),
                  r.decoder && (i = r.decoder.write(i)),
                  r.objectMode && i == null) ||
                    ((r.objectMode || (i && i.length)) && (t.push(i) || ((n = !0), e.pause())));
                }),
                e))
                  void 0 === this[i] &&
                    typeof e[i] === 'function' &&
                    (this[i] = (function (t) {
                      return function () {
                        return e[t].apply(e, arguments);
                      };
                    })(i));
                for (let o = 0; o < M.length; o++) e.on(M[o], this.emit.bind(this, M[o]));
                return (
                  (this._read = function (t) {
                    u('wrapped _read', t), n && ((n = !1), e.resume());
                  }),
                  this
                );
              }),
              typeof Symbol === 'function' &&
                (j.prototype[Symbol.asyncIterator] = function () {
                  return void 0 === f && (f = e('./internal/streams/async_iterator')), f(this);
                }),
              Object.defineProperty(j.prototype, 'readableHighWaterMark', {
                enumerable: !1,
                get: function () {
                  return this._readableState.highWaterMark;
                },
              }),
              Object.defineProperty(j.prototype, 'readableBuffer', {
                enumerable: !1,
                get: function () {
                  return this._readableState && this._readableState.buffer;
                },
              }),
              Object.defineProperty(j.prototype, 'readableFlowing', {
                enumerable: !1,
                get: function () {
                  return this._readableState.flowing;
                },
                set: function (e) {
                  this._readableState && (this._readableState.flowing = e);
                },
              }),
              (j._fromList = $),
              Object.defineProperty(j.prototype, 'readableLength', {
                enumerable: !1,
                get: function () {
                  return this._readableState.length;
                },
              }),
              typeof Symbol === 'function' &&
                (j.from = function (t, r) {
                  return void 0 === h && (h = e('./internal/streams/from')), h(j, t, r);
                });
          }).call(this);
        }).call(
          this,
          e('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {}
        );
      },
      {
        '../errors': 151,
        './_stream_duplex': 152,
        './internal/streams/async_iterator': 157,
        './internal/streams/buffer_list': 158,
        './internal/streams/destroy': 159,
        './internal/streams/from': 161,
        './internal/streams/state': 163,
        './internal/streams/stream': 164,
        _process: 150,
        buffer: 132,
        events: 138,
        inherits: 142,
        'string_decoder/': 212,
        util: 131,
      },
    ],
    155: [
      function (e, t, r) {
        'use strict';
        t.exports = l;
        const n = e('../errors').codes;
        const i = n.ERR_METHOD_NOT_IMPLEMENTED;
        const o = n.ERR_MULTIPLE_CALLBACK;
        const s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING;
        const a = n.ERR_TRANSFORM_WITH_LENGTH_0;
        const c = e('./_stream_duplex');
        function u(e, t) {
          const r = this._transformState;
          r.transforming = !1;
          const n = r.writecb;
          if (n === null) return this.emit('error', new o());
          (r.writechunk = null), (r.writecb = null), t != null && this.push(t), n(e);
          const i = this._readableState;
          (i.reading = !1),
            (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
        }
        function l(e) {
          if (!(this instanceof l)) return new l(e);
          c.call(this, e),
            (this._transformState = {
              afterTransform: u.bind(this),
              needTransform: !1,
              transforming: !1,
              writecb: null,
              writechunk: null,
              writeencoding: null,
            }),
            (this._readableState.needReadable = !0),
            (this._readableState.sync = !1),
            e &&
              (typeof e.transform === 'function' && (this._transform = e.transform),
              typeof e.flush === 'function' && (this._flush = e.flush)),
            this.on('prefinish', d);
        }
        function d() {
          const e = this;
          typeof this._flush !== 'function' || this._readableState.destroyed
            ? f(this, null, null)
            : this._flush(function (t, r) {
                f(e, t, r);
              });
        }
        function f(e, t, r) {
          if (t) return e.emit('error', t);
          if ((r != null && e.push(r), e._writableState.length)) throw new a();
          if (e._transformState.transforming) throw new s();
          return e.push(null);
        }
        e('inherits')(l, c),
          (l.prototype.push = function (e, t) {
            return (this._transformState.needTransform = !1), c.prototype.push.call(this, e, t);
          }),
          (l.prototype._transform = function (e, t, r) {
            r(new i('_transform()'));
          }),
          (l.prototype._write = function (e, t, r) {
            const n = this._transformState;
            if (((n.writecb = r), (n.writechunk = e), (n.writeencoding = t), !n.transforming)) {
              const i = this._readableState;
              (n.needTransform || i.needReadable || i.length < i.highWaterMark) &&
                this._read(i.highWaterMark);
            }
          }),
          (l.prototype._read = function (e) {
            const t = this._transformState;
            t.writechunk === null || t.transforming
              ? (t.needTransform = !0)
              : ((t.transforming = !0),
                this._transform(t.writechunk, t.writeencoding, t.afterTransform));
          }),
          (l.prototype._destroy = function (e, t) {
            c.prototype._destroy.call(this, e, function (e) {
              t(e);
            });
          });
      },
      { '../errors': 151, './_stream_duplex': 152, inherits: 142 },
    ],
    156: [
      function (e, t, r) {
        (function (r, n) {
          (function () {
            'use strict';
            function i(e) {
              const t = this;
              (this.next = null),
                (this.entry = null),
                (this.finish = function () {
                  !(function (e, t, r) {
                    let n = e.entry;
                    e.entry = null;
                    for (; n; ) {
                      const i = n.callback;
                      t.pendingcb--, i(r), (n = n.next);
                    }
                    t.corkedRequestsFree.next = e;
                  })(t, e);
                });
            }
            let o;
            (t.exports = j), (j.WritableState = S);
            const s = { deprecate: e('util-deprecate') };
            const a = e('./internal/streams/stream');
            const c = e('buffer').Buffer;
            const u =
              (void 0 !== n
                ? n
                : typeof window !== 'undefined'
                  ? window
                  : typeof self !== 'undefined'
                    ? self
                    : {}
              ).Uint8Array || function () {};
            let l;
            const d = e('./internal/streams/destroy');
            const f = e('./internal/streams/state').getHighWaterMark;
            const h = e('../errors').codes;
            const p = h.ERR_INVALID_ARG_TYPE;
            const g = h.ERR_METHOD_NOT_IMPLEMENTED;
            const m = h.ERR_MULTIPLE_CALLBACK;
            const y = h.ERR_STREAM_CANNOT_PIPE;
            const b = h.ERR_STREAM_DESTROYED;
            const w = h.ERR_STREAM_NULL_VALUES;
            const v = h.ERR_STREAM_WRITE_AFTER_END;
            const E = h.ERR_UNKNOWN_ENCODING;
            const _ = d.errorOrDestroy;
            function M() {}
            function S(t, n, s) {
              (o = o || e('./_stream_duplex')),
                (t = t || {}),
                typeof s !== 'boolean' && (s = n instanceof o),
                (this.objectMode = !!t.objectMode),
                s && (this.objectMode = this.objectMode || !!t.writableObjectMode),
                (this.highWaterMark = f(this, t, 'writableHighWaterMark', s)),
                (this.finalCalled = !1),
                (this.needDrain = !1),
                (this.ending = !1),
                (this.ended = !1),
                (this.finished = !1),
                (this.destroyed = !1);
              const a = !1 === t.decodeStrings;
              (this.decodeStrings = !a),
                (this.defaultEncoding = t.defaultEncoding || 'utf8'),
                (this.length = 0),
                (this.writing = !1),
                (this.corked = 0),
                (this.sync = !0),
                (this.bufferProcessing = !1),
                (this.onwrite = function (e) {
                  !(function (e, t) {
                    const n = e._writableState;
                    const i = n.sync;
                    const o = n.writecb;
                    if (typeof o !== 'function') throw new m();
                    if (
                      ((function (e) {
                        (e.writing = !1),
                          (e.writecb = null),
                          (e.length -= e.writelen),
                          (e.writelen = 0);
                      })(n),
                      t)
                    )
                      !(function (e, t, n, i, o) {
                        --t.pendingcb,
                          n
                            ? (r.nextTick(o, i),
                              r.nextTick(O, e, t),
                              (e._writableState.errorEmitted = !0),
                              _(e, i))
                            : (o(i), (e._writableState.errorEmitted = !0), _(e, i), O(e, t));
                      })(e, n, i, t, o);
                    else {
                      const s = T(n) || e.destroyed;
                      s || n.corked || n.bufferProcessing || !n.bufferedRequest || R(e, n),
                        i ? r.nextTick(A, e, n, s, o) : A(e, n, s, o);
                    }
                  })(n, e);
                }),
                (this.writecb = null),
                (this.writelen = 0),
                (this.bufferedRequest = null),
                (this.lastBufferedRequest = null),
                (this.pendingcb = 0),
                (this.prefinished = !1),
                (this.errorEmitted = !1),
                (this.emitClose = !1 !== t.emitClose),
                (this.autoDestroy = !!t.autoDestroy),
                (this.bufferedRequestCount = 0),
                (this.corkedRequestsFree = new i(this));
            }
            function j(t) {
              const r = this instanceof (o = o || e('./_stream_duplex'));
              if (!r && !l.call(j, this)) return new j(t);
              (this._writableState = new S(t, this, r)),
                (this.writable = !0),
                t &&
                  (typeof t.write === 'function' && (this._write = t.write),
                  typeof t.writev === 'function' && (this._writev = t.writev),
                  typeof t.destroy === 'function' && (this._destroy = t.destroy),
                  typeof t.final === 'function' && (this._final = t.final)),
                a.call(this);
            }
            function I(e, t, r, n, i, o, s) {
              (t.writelen = n),
                (t.writecb = s),
                (t.writing = !0),
                (t.sync = !0),
                t.destroyed
                  ? t.onwrite(new b('write'))
                  : r
                    ? e._writev(i, t.onwrite)
                    : e._write(i, o, t.onwrite),
                (t.sync = !1);
            }
            function A(e, t, r, n) {
              r ||
                (function (e, t) {
                  t.length === 0 && t.needDrain && ((t.needDrain = !1), e.emit('drain'));
                })(e, t),
                t.pendingcb--,
                n(),
                O(e, t);
            }
            function R(e, t) {
              t.bufferProcessing = !0;
              let r = t.bufferedRequest;
              if (e._writev && r && r.next) {
                const n = t.bufferedRequestCount;
                const o = new Array(n);
                const s = t.corkedRequestsFree;
                s.entry = r;
                for (var a = 0, c = !0; r; )
                  (o[a] = r), r.isBuf || (c = !1), (r = r.next), (a += 1);
                (o.allBuffers = c),
                  I(e, t, !0, t.length, o, '', s.finish),
                  t.pendingcb++,
                  (t.lastBufferedRequest = null),
                  s.next
                    ? ((t.corkedRequestsFree = s.next), (s.next = null))
                    : (t.corkedRequestsFree = new i(t)),
                  (t.bufferedRequestCount = 0);
              } else {
                for (; r; ) {
                  const u = r.chunk;
                  const l = r.encoding;
                  const d = r.callback;
                  if (
                    (I(e, t, !1, t.objectMode ? 1 : u.length, u, l, d),
                    (r = r.next),
                    t.bufferedRequestCount--,
                    t.writing)
                  )
                    break;
                }
                r === null && (t.lastBufferedRequest = null);
              }
              (t.bufferedRequest = r), (t.bufferProcessing = !1);
            }
            function T(e) {
              return (
                e.ending &&
                e.length === 0 &&
                e.bufferedRequest === null &&
                !e.finished &&
                !e.writing
              );
            }
            function N(e, t) {
              e._final(function (r) {
                t.pendingcb--, r && _(e, r), (t.prefinished = !0), e.emit('prefinish'), O(e, t);
              });
            }
            function O(e, t) {
              const n = T(t);
              if (
                n &&
                ((function (e, t) {
                  t.prefinished ||
                    t.finalCalled ||
                    (typeof e._final !== 'function' || t.destroyed
                      ? ((t.prefinished = !0), e.emit('prefinish'))
                      : (t.pendingcb++, (t.finalCalled = !0), r.nextTick(N, e, t)));
                })(e, t),
                t.pendingcb === 0 && ((t.finished = !0), e.emit('finish'), t.autoDestroy))
              ) {
                const i = e._readableState;
                (!i || (i.autoDestroy && i.endEmitted)) && e.destroy();
              }
              return n;
            }
            e('inherits')(j, a),
              (S.prototype.getBuffer = function () {
                for (var e = this.bufferedRequest, t = []; e; ) t.push(e), (e = e.next);
                return t;
              }),
              (function () {
                try {
                  Object.defineProperty(S.prototype, 'buffer', {
                    get: s.deprecate(
                      function () {
                        return this.getBuffer();
                      },
                      '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
                      'DEP0003'
                    ),
                  });
                } catch (e) {}
              })(),
              typeof Symbol === 'function' &&
              Symbol.hasInstance &&
              typeof Function.prototype[Symbol.hasInstance] === 'function'
                ? ((l = Function.prototype[Symbol.hasInstance]),
                  Object.defineProperty(j, Symbol.hasInstance, {
                    value: function (e) {
                      return (
                        !!l.call(this, e) || (this === j && e && e._writableState instanceof S)
                      );
                    },
                  }))
                : (l = function (e) {
                    return e instanceof this;
                  }),
              (j.prototype.pipe = function () {
                _(this, new y());
              }),
              (j.prototype.write = function (e, t, n) {
                let i;
                const o = this._writableState;
                let s = !1;
                const a = !o.objectMode && ((i = e), c.isBuffer(i) || i instanceof u);
                return (
                  a &&
                    !c.isBuffer(e) &&
                    (e = (function (e) {
                      return c.from(e);
                    })(e)),
                  typeof t === 'function' && ((n = t), (t = null)),
                  a ? (t = 'buffer') : t || (t = o.defaultEncoding),
                  typeof n !== 'function' && (n = M),
                  o.ending
                    ? (function (e, t) {
                        const n = new v();
                        _(e, n), r.nextTick(t, n);
                      })(this, n)
                    : (a ||
                        (function (e, t, n, i) {
                          let o;
                          return (
                            n === null
                              ? (o = new w())
                              : typeof n === 'string' ||
                                t.objectMode ||
                                (o = new p('chunk', ['string', 'Buffer'], n)),
                            !o || (_(e, o), r.nextTick(i, o), !1)
                          );
                        })(this, o, e, n)) &&
                      (o.pendingcb++,
                      (s = (function (e, t, r, n, i, o) {
                        if (!r) {
                          const s = (function (e, t, r) {
                            e.objectMode ||
                              !1 === e.decodeStrings ||
                              typeof t !== 'string' ||
                              (t = c.from(t, r));
                            return t;
                          })(t, n, i);
                          n !== s && ((r = !0), (i = 'buffer'), (n = s));
                        }
                        const a = t.objectMode ? 1 : n.length;
                        t.length += a;
                        const u = t.length < t.highWaterMark;
                        u || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                          const l = t.lastBufferedRequest;
                          (t.lastBufferedRequest = {
                            chunk: n,
                            encoding: i,
                            isBuf: r,
                            callback: o,
                            next: null,
                          }),
                            l
                              ? (l.next = t.lastBufferedRequest)
                              : (t.bufferedRequest = t.lastBufferedRequest),
                            (t.bufferedRequestCount += 1);
                        } else I(e, t, !1, a, n, i, o);
                        return u;
                      })(this, o, a, e, t, n))),
                  s
                );
              }),
              (j.prototype.cork = function () {
                this._writableState.corked++;
              }),
              (j.prototype.uncork = function () {
                const e = this._writableState;
                e.corked &&
                  (e.corked--,
                  e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || R(this, e));
              }),
              (j.prototype.setDefaultEncoding = function (e) {
                if (
                  (typeof e === 'string' && (e = e.toLowerCase()),
                  !(
                    [
                      'hex',
                      'utf8',
                      'utf-8',
                      'ascii',
                      'binary',
                      'base64',
                      'ucs2',
                      'ucs-2',
                      'utf16le',
                      'utf-16le',
                      'raw',
                    ].indexOf((e + '').toLowerCase()) > -1
                  ))
                )
                  throw new E(e);
                return (this._writableState.defaultEncoding = e), this;
              }),
              Object.defineProperty(j.prototype, 'writableBuffer', {
                enumerable: !1,
                get: function () {
                  return this._writableState && this._writableState.getBuffer();
                },
              }),
              Object.defineProperty(j.prototype, 'writableHighWaterMark', {
                enumerable: !1,
                get: function () {
                  return this._writableState.highWaterMark;
                },
              }),
              (j.prototype._write = function (e, t, r) {
                r(new g('_write()'));
              }),
              (j.prototype._writev = null),
              (j.prototype.end = function (e, t, n) {
                const i = this._writableState;
                return (
                  typeof e === 'function'
                    ? ((n = e), (e = null), (t = null))
                    : typeof t === 'function' && ((n = t), (t = null)),
                  e != null && this.write(e, t),
                  i.corked && ((i.corked = 1), this.uncork()),
                  i.ending ||
                    (function (e, t, n) {
                      (t.ending = !0),
                        O(e, t),
                        n && (t.finished ? r.nextTick(n) : e.once('finish', n));
                      (t.ended = !0), (e.writable = !1);
                    })(this, i, n),
                  this
                );
              }),
              Object.defineProperty(j.prototype, 'writableLength', {
                enumerable: !1,
                get: function () {
                  return this._writableState.length;
                },
              }),
              Object.defineProperty(j.prototype, 'destroyed', {
                enumerable: !1,
                get: function () {
                  return void 0 !== this._writableState && this._writableState.destroyed;
                },
                set: function (e) {
                  this._writableState && (this._writableState.destroyed = e);
                },
              }),
              (j.prototype.destroy = d.destroy),
              (j.prototype._undestroy = d.undestroy),
              (j.prototype._destroy = function (e, t) {
                t(e);
              });
          }).call(this);
        }).call(
          this,
          e('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {}
        );
      },
      {
        '../errors': 151,
        './_stream_duplex': 152,
        './internal/streams/destroy': 159,
        './internal/streams/state': 163,
        './internal/streams/stream': 164,
        _process: 150,
        buffer: 132,
        inherits: 142,
        'util-deprecate': 213,
      },
    ],
    157: [
      function (e, t, r) {
        (function (r) {
          (function () {
            'use strict';
            let n;
            function i(e, t, r) {
              return (
                (t = (function (e) {
                  const t = (function (e, t) {
                    if (typeof e !== 'object' || e === null) return e;
                    const r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                      const n = r.call(e, t || 'default');
                      if (typeof n !== 'object') return n;
                      throw new TypeError('@@toPrimitive must return a primitive value.');
                    }
                    return (t === 'string' ? String : Number)(e);
                  })(e, 'string');
                  return typeof t === 'symbol' ? t : String(t);
                })(t)) in e
                  ? Object.defineProperty(e, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (e[t] = r),
                e
              );
            }
            const o = e('./end-of-stream');
            const s = Symbol('lastResolve');
            const a = Symbol('lastReject');
            const c = Symbol('error');
            const u = Symbol('ended');
            const l = Symbol('lastPromise');
            const d = Symbol('handlePromise');
            const f = Symbol('stream');
            function h(e, t) {
              return { value: e, done: t };
            }
            function p(e) {
              const t = e[s];
              if (t !== null) {
                const r = e[f].read();
                r !== null && ((e[l] = null), (e[s] = null), (e[a] = null), t(h(r, !1)));
              }
            }
            function g(e) {
              r.nextTick(p, e);
            }
            const m = Object.getPrototypeOf(function () {});
            const y = Object.setPrototypeOf(
              (i(
                (n = {
                  get stream() {
                    return this[f];
                  },
                  next: function () {
                    const e = this;
                    const t = this[c];
                    if (t !== null) return Promise.reject(t);
                    if (this[u]) return Promise.resolve(h(void 0, !0));
                    if (this[f].destroyed)
                      return new Promise(function (t, n) {
                        r.nextTick(function () {
                          e[c] ? n(e[c]) : t(h(void 0, !0));
                        });
                      });
                    let n;
                    const i = this[l];
                    if (i)
                      n = new Promise(
                        (function (e, t) {
                          return function (r, n) {
                            e.then(function () {
                              t[u] ? r(h(void 0, !0)) : t[d](r, n);
                            }, n);
                          };
                        })(i, this)
                      );
                    else {
                      const o = this[f].read();
                      if (o !== null) return Promise.resolve(h(o, !1));
                      n = new Promise(this[d]);
                    }
                    return (this[l] = n), n;
                  },
                }),
                Symbol.asyncIterator,
                function () {
                  return this;
                }
              ),
              i(n, 'return', function () {
                const e = this;
                return new Promise(function (t, r) {
                  e[f].destroy(null, function (e) {
                    e ? r(e) : t(h(void 0, !0));
                  });
                });
              }),
              n),
              m
            );
            t.exports = function (e) {
              let t;
              var r = Object.create(
                y,
                (i((t = {}), f, { value: e, writable: !0 }),
                i(t, s, { value: null, writable: !0 }),
                i(t, a, { value: null, writable: !0 }),
                i(t, c, { value: null, writable: !0 }),
                i(t, u, { value: e._readableState.endEmitted, writable: !0 }),
                i(t, d, {
                  value: function (e, t) {
                    const n = r[f].read();
                    n
                      ? ((r[l] = null), (r[s] = null), (r[a] = null), e(h(n, !1)))
                      : ((r[s] = e), (r[a] = t));
                  },
                  writable: !0,
                }),
                t)
              );
              return (
                (r[l] = null),
                o(e, function (e) {
                  if (e && e.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
                    const t = r[a];
                    return (
                      t !== null && ((r[l] = null), (r[s] = null), (r[a] = null), t(e)),
                      void (r[c] = e)
                    );
                  }
                  const n = r[s];
                  n !== null && ((r[l] = null), (r[s] = null), (r[a] = null), n(h(void 0, !0))),
                    (r[u] = !0);
                }),
                e.on('readable', g.bind(null, r)),
                r
              );
            };
          }).call(this);
        }).call(this, e('_process'));
      },
      { './end-of-stream': 160, _process: 150 },
    ],
    158: [
      function (e, t, r) {
        'use strict';
        function n(e, t) {
          const r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            let n = Object.getOwnPropertySymbols(e);
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function i(e) {
          for (let t = 1; t < arguments.length; t++) {
            var r = arguments[t] != null ? arguments[t] : {};
            t % 2
              ? n(Object(r), !0).forEach(function (t) {
                  o(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                : n(Object(r)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                  });
          }
          return e;
        }
        function o(e, t, r) {
          return (
            (t = a(t)) in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function s(e, t) {
          for (let r = 0; r < t.length; r++) {
            const n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, a(n.key), n);
          }
        }
        function a(e) {
          const t = (function (e, t) {
            if (typeof e !== 'object' || e === null) return e;
            const r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              const n = r.call(e, t || 'default');
              if (typeof n !== 'object') return n;
              throw new TypeError('@@toPrimitive must return a primitive value.');
            }
            return (t === 'string' ? String : Number)(e);
          })(e, 'string');
          return typeof t === 'symbol' ? t : String(t);
        }
        const c = e('buffer').Buffer;
        const u = e('util').inspect;
        const l = (u && u.custom) || 'inspect';
        t.exports = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, e),
              (this.head = null),
              (this.tail = null),
              (this.length = 0);
          }
          let t, r, n;
          return (
            (t = e),
            (r = [
              {
                key: 'push',
                value: function (e) {
                  const t = { data: e, next: null };
                  this.length > 0 ? (this.tail.next = t) : (this.head = t),
                    (this.tail = t),
                    ++this.length;
                },
              },
              {
                key: 'unshift',
                value: function (e) {
                  const t = { data: e, next: this.head };
                  this.length === 0 && (this.tail = t), (this.head = t), ++this.length;
                },
              },
              {
                key: 'shift',
                value: function () {
                  if (this.length !== 0) {
                    const e = this.head.data;
                    return (
                      this.length === 1
                        ? (this.head = this.tail = null)
                        : (this.head = this.head.next),
                      --this.length,
                      e
                    );
                  }
                },
              },
              {
                key: 'clear',
                value: function () {
                  (this.head = this.tail = null), (this.length = 0);
                },
              },
              {
                key: 'join',
                value: function (e) {
                  if (this.length === 0) return '';
                  for (var t = this.head, r = '' + t.data; (t = t.next); ) r += e + t.data;
                  return r;
                },
              },
              {
                key: 'concat',
                value: function (e) {
                  if (this.length === 0) return c.alloc(0);
                  for (var t, r, n, i = c.allocUnsafe(e >>> 0), o = this.head, s = 0; o; )
                    (t = o.data),
                      (r = i),
                      (n = s),
                      c.prototype.copy.call(t, r, n),
                      (s += o.data.length),
                      (o = o.next);
                  return i;
                },
              },
              {
                key: 'consume',
                value: function (e, t) {
                  let r;
                  return (
                    e < this.head.data.length
                      ? ((r = this.head.data.slice(0, e)),
                        (this.head.data = this.head.data.slice(e)))
                      : (r =
                          e === this.head.data.length
                            ? this.shift()
                            : t
                              ? this._getString(e)
                              : this._getBuffer(e)),
                    r
                  );
                },
              },
              {
                key: 'first',
                value: function () {
                  return this.head.data;
                },
              },
              {
                key: '_getString',
                value: function (e) {
                  let t = this.head;
                  let r = 1;
                  let n = t.data;
                  for (e -= n.length; (t = t.next); ) {
                    const i = t.data;
                    const o = e > i.length ? i.length : e;
                    if ((o === i.length ? (n += i) : (n += i.slice(0, e)), (e -= o) == 0)) {
                      o === i.length
                        ? (++r, t.next ? (this.head = t.next) : (this.head = this.tail = null))
                        : ((this.head = t), (t.data = i.slice(o)));
                      break;
                    }
                    ++r;
                  }
                  return (this.length -= r), n;
                },
              },
              {
                key: '_getBuffer',
                value: function (e) {
                  const t = c.allocUnsafe(e);
                  let r = this.head;
                  let n = 1;
                  for (r.data.copy(t), e -= r.data.length; (r = r.next); ) {
                    const i = r.data;
                    const o = e > i.length ? i.length : e;
                    if ((i.copy(t, t.length - e, 0, o), (e -= o) == 0)) {
                      o === i.length
                        ? (++n, r.next ? (this.head = r.next) : (this.head = this.tail = null))
                        : ((this.head = r), (r.data = i.slice(o)));
                      break;
                    }
                    ++n;
                  }
                  return (this.length -= n), t;
                },
              },
              {
                key: l,
                value: function (e, t) {
                  return u(this, i(i({}, t), {}, { depth: 0, customInspect: !1 }));
                },
              },
            ]) && s(t.prototype, r),
            n && s(t, n),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            e
          );
        })();
      },
      { buffer: 132, util: 131 },
    ],
    159: [
      function (e, t, r) {
        (function (e) {
          (function () {
            'use strict';
            function r(e, t) {
              i(e, t), n(e);
            }
            function n(e) {
              (e._writableState && !e._writableState.emitClose) ||
                (e._readableState && !e._readableState.emitClose) ||
                e.emit('close');
            }
            function i(e, t) {
              e.emit('error', t);
            }
            t.exports = {
              destroy: function (t, o) {
                const s = this;
                const a = this._readableState && this._readableState.destroyed;
                const c = this._writableState && this._writableState.destroyed;
                return a || c
                  ? (o
                      ? o(t)
                      : t &&
                        (this._writableState
                          ? this._writableState.errorEmitted ||
                            ((this._writableState.errorEmitted = !0), e.nextTick(i, this, t))
                          : e.nextTick(i, this, t)),
                    this)
                  : (this._readableState && (this._readableState.destroyed = !0),
                    this._writableState && (this._writableState.destroyed = !0),
                    this._destroy(t || null, function (t) {
                      !o && t
                        ? s._writableState
                          ? s._writableState.errorEmitted
                            ? e.nextTick(n, s)
                            : ((s._writableState.errorEmitted = !0), e.nextTick(r, s, t))
                          : e.nextTick(r, s, t)
                        : o
                          ? (e.nextTick(n, s), o(t))
                          : e.nextTick(n, s);
                    }),
                    this);
              },
              undestroy: function () {
                this._readableState &&
                  ((this._readableState.destroyed = !1),
                  (this._readableState.reading = !1),
                  (this._readableState.ended = !1),
                  (this._readableState.endEmitted = !1)),
                  this._writableState &&
                    ((this._writableState.destroyed = !1),
                    (this._writableState.ended = !1),
                    (this._writableState.ending = !1),
                    (this._writableState.finalCalled = !1),
                    (this._writableState.prefinished = !1),
                    (this._writableState.finished = !1),
                    (this._writableState.errorEmitted = !1));
              },
              errorOrDestroy: function (e, t) {
                const r = e._readableState;
                const n = e._writableState;
                (r && r.autoDestroy) || (n && n.autoDestroy) ? e.destroy(t) : e.emit('error', t);
              },
            };
          }).call(this);
        }).call(this, e('_process'));
      },
      { _process: 150 },
    ],
    160: [
      function (e, t, r) {
        'use strict';
        const n = e('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;
        function i() {}
        t.exports = function e(t, r, o) {
          if (typeof r === 'function') return e(t, null, r);
          r || (r = {}),
            (o = (function (e) {
              let t = !1;
              return function () {
                if (!t) {
                  t = !0;
                  for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
                    n[i] = arguments[i];
                  e.apply(this, n);
                }
              };
            })(o || i));
          let s = r.readable || (!1 !== r.readable && t.readable);
          let a = r.writable || (!1 !== r.writable && t.writable);
          const c = function () {
            t.writable || l();
          };
          let u = t._writableState && t._writableState.finished;
          var l = function () {
            (a = !1), (u = !0), s || o.call(t);
          };
          let d = t._readableState && t._readableState.endEmitted;
          const f = function () {
            (s = !1), (d = !0), a || o.call(t);
          };
          const h = function (e) {
            o.call(t, e);
          };
          const p = function () {
            let e;
            return s && !d
              ? ((t._readableState && t._readableState.ended) || (e = new n()), o.call(t, e))
              : a && !u
                ? ((t._writableState && t._writableState.ended) || (e = new n()), o.call(t, e))
                : void 0;
          };
          const g = function () {
            t.req.on('finish', l);
          };
          return (
            !(function (e) {
              return e.setHeader && typeof e.abort === 'function';
            })(t)
              ? a && !t._writableState && (t.on('end', c), t.on('close', c))
              : (t.on('complete', l), t.on('abort', p), t.req ? g() : t.on('request', g)),
            t.on('end', f),
            t.on('finish', l),
            !1 !== r.error && t.on('error', h),
            t.on('close', p),
            function () {
              t.removeListener('complete', l),
                t.removeListener('abort', p),
                t.removeListener('request', g),
                t.req && t.req.removeListener('finish', l),
                t.removeListener('end', c),
                t.removeListener('close', c),
                t.removeListener('finish', l),
                t.removeListener('end', f),
                t.removeListener('error', h),
                t.removeListener('close', p);
            }
          );
        };
      },
      { '../../../errors': 151 },
    ],
    161: [
      function (e, t, r) {
        t.exports = function () {
          throw new Error('Readable.from is not available in the browser');
        };
      },
      {},
    ],
    162: [
      function (e, t, r) {
        'use strict';
        let n;
        const i = e('../../../errors').codes;
        const o = i.ERR_MISSING_ARGS;
        const s = i.ERR_STREAM_DESTROYED;
        function a(e) {
          if (e) throw e;
        }
        function c(e) {
          e();
        }
        function u(e, t) {
          return e.pipe(t);
        }
        t.exports = function () {
          for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
          let l;
          const d = (function (e) {
            return e.length ? (typeof e[e.length - 1] !== 'function' ? a : e.pop()) : a;
          })(r);
          if ((Array.isArray(r[0]) && (r = r[0]), r.length < 2)) throw new o('streams');
          var f = r.map(function (t, i) {
            const o = i < r.length - 1;
            return (function (t, r, i, o) {
              o = (function (e) {
                let t = !1;
                return function () {
                  t || ((t = !0), e.apply(void 0, arguments));
                };
              })(o);
              let a = !1;
              t.on('close', function () {
                a = !0;
              }),
                void 0 === n && (n = e('./end-of-stream')),
                n(t, { readable: r, writable: i }, function (e) {
                  if (e) return o(e);
                  (a = !0), o();
                });
              let c = !1;
              return function (e) {
                if (!a && !c)
                  return (
                    (c = !0),
                    (function (e) {
                      return e.setHeader && typeof e.abort === 'function';
                    })(t)
                      ? t.abort()
                      : typeof t.destroy === 'function'
                        ? t.destroy()
                        : void o(e || new s('pipe'))
                  );
              };
            })(t, o, i > 0, function (e) {
              l || (l = e), e && f.forEach(c), o || (f.forEach(c), d(l));
            });
          });
          return r.reduce(u);
        };
      },
      { '../../../errors': 151, './end-of-stream': 160 },
    ],
    163: [
      function (e, t, r) {
        'use strict';
        const n = e('../../../errors').codes.ERR_INVALID_OPT_VALUE;
        t.exports = {
          getHighWaterMark: function (e, t, r, i) {
            const o = (function (e, t, r) {
              return e.highWaterMark != null ? e.highWaterMark : t ? e[r] : null;
            })(t, i, r);
            if (o != null) {
              if (!isFinite(o) || Math.floor(o) !== o || o < 0)
                throw new n(i ? r : 'highWaterMark', o);
              return Math.floor(o);
            }
            return e.objectMode ? 16 : 16384;
          },
        };
      },
      { '../../../errors': 151 },
    ],
    164: [
      function (e, t, r) {
        t.exports = e('events').EventEmitter;
      },
      { events: 138 },
    ],
    165: [
      function (e, t, r) {
        ((r = t.exports = e('./lib/_stream_readable.js')).Stream = r),
          (r.Readable = r),
          (r.Writable = e('./lib/_stream_writable.js')),
          (r.Duplex = e('./lib/_stream_duplex.js')),
          (r.Transform = e('./lib/_stream_transform.js')),
          (r.PassThrough = e('./lib/_stream_passthrough.js')),
          (r.finished = e('./lib/internal/streams/end-of-stream.js')),
          (r.pipeline = e('./lib/internal/streams/pipeline.js'));
      },
      {
        './lib/_stream_duplex.js': 152,
        './lib/_stream_passthrough.js': 153,
        './lib/_stream_readable.js': 154,
        './lib/_stream_transform.js': 155,
        './lib/_stream_writable.js': 156,
        './lib/internal/streams/end-of-stream.js': 160,
        './lib/internal/streams/pipeline.js': 162,
      },
    ],
    166: [
      function (e, t, r) {
        /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
        const n = e('buffer');
        const i = n.Buffer;
        function o(e, t) {
          for (const r in e) t[r] = e[r];
        }
        function s(e, t, r) {
          return i(e, t, r);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
          ? (t.exports = n)
          : (o(n, r), (r.Buffer = s)),
          (s.prototype = Object.create(i.prototype)),
          o(i, s),
          (s.from = function (e, t, r) {
            if (typeof e === 'number') throw new TypeError('Argument must not be a number');
            return i(e, t, r);
          }),
          (s.alloc = function (e, t, r) {
            if (typeof e !== 'number') throw new TypeError('Argument must be a number');
            const n = i(e);
            return void 0 !== t ? (typeof r === 'string' ? n.fill(t, r) : n.fill(t)) : n.fill(0), n;
          }),
          (s.allocUnsafe = function (e) {
            if (typeof e !== 'number') throw new TypeError('Argument must be a number');
            return i(e);
          }),
          (s.allocUnsafeSlow = function (e) {
            if (typeof e !== 'number') throw new TypeError('Argument must be a number');
            return n.SlowBuffer(e);
          });
      },
      { buffer: 132 },
    ],
    167: [
      function (e, t, r) {
        const n = Symbol('SemVer ANY');
        class i {
          static get ANY() {
            return n;
          }
          constructor(e, t) {
            if (((t = o(t)), e instanceof i)) {
              if (e.loose === !!t.loose) return e;
              e = e.value;
            }
            (e = e.trim().split(/\s+/).join(' ')),
              u('comparator', e, t),
              (this.options = t),
              (this.loose = !!t.loose),
              this.parse(e),
              this.semver === n
                ? (this.value = '')
                : (this.value = this.operator + this.semver.version),
              u('comp', this);
          }
          parse(e) {
            const t = this.options.loose ? s[a.COMPARATORLOOSE] : s[a.COMPARATOR];
            const r = e.match(t);
            if (!r) throw new TypeError(`Invalid comparator: ${e}`);
            (this.operator = void 0 !== r[1] ? r[1] : ''),
              this.operator === '=' && (this.operator = ''),
              r[2] ? (this.semver = new l(r[2], this.options.loose)) : (this.semver = n);
          }
          toString() {
            return this.value;
          }
          test(e) {
            if ((u('Comparator.test', e, this.options.loose), this.semver === n || e === n))
              return !0;
            if (typeof e === 'string')
              try {
                e = new l(e, this.options);
              } catch (e) {
                return !1;
              }
            return c(e, this.operator, this.semver, this.options);
          }
          intersects(e, t) {
            if (!(e instanceof i)) throw new TypeError('a Comparator is required');
            return this.operator === ''
              ? this.value === '' || new d(e.value, t).test(this.value)
              : e.operator === ''
                ? e.value === '' || new d(this.value, t).test(e.semver)
                : (!(t = o(t)).includePrerelease ||
                    (this.value !== '<0.0.0-0' && e.value !== '<0.0.0-0')) &&
                  !(
                    !t.includePrerelease &&
                    (this.value.startsWith('<0.0.0') || e.value.startsWith('<0.0.0'))
                  ) &&
                  (!(!this.operator.startsWith('>') || !e.operator.startsWith('>')) ||
                    !(!this.operator.startsWith('<') || !e.operator.startsWith('<')) ||
                    !(
                      this.semver.version !== e.semver.version ||
                      !this.operator.includes('=') ||
                      !e.operator.includes('=')
                    ) ||
                    !!(
                      c(this.semver, '<', e.semver, t) &&
                      this.operator.startsWith('>') &&
                      e.operator.startsWith('<')
                    ) ||
                    !!(
                      c(this.semver, '>', e.semver, t) &&
                      this.operator.startsWith('<') &&
                      e.operator.startsWith('>')
                    ));
          }
        }
        t.exports = i;
        const o = e('../internal/parse-options');
        const { safeRe: s, t: a } = e('../internal/re');
        const c = e('../functions/cmp');
        const u = e('../internal/debug');
        const l = e('./semver');
        const d = e('./range');
      },
      {
        '../functions/cmp': 171,
        '../internal/debug': 196,
        '../internal/parse-options': 199,
        '../internal/re': 200,
        './range': 168,
        './semver': 169,
      },
    ],
    168: [
      function (e, t, r) {
        const n = /\s+/g;
        class i {
          constructor(e, t) {
            if (((t = s(t)), e instanceof i))
              return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease
                ? e
                : new i(e.raw, t);
            if (e instanceof a)
              return (this.raw = e.value), (this.set = [[e]]), (this.formatted = void 0), this;
            if (
              ((this.options = t),
              (this.loose = !!t.loose),
              (this.includePrerelease = !!t.includePrerelease),
              (this.raw = e.trim().replace(n, ' ')),
              (this.set = this.raw
                .split('||')
                .map(e => this.parseRange(e.trim()))
                .filter(e => e.length)),
              !this.set.length)
            )
              throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
            if (this.set.length > 1) {
              const e = this.set[0];
              if (((this.set = this.set.filter(e => !y(e[0]))), this.set.length === 0))
                this.set = [e];
              else if (this.set.length > 1)
                for (const e of this.set)
                  if (e.length === 1 && b(e[0])) {
                    this.set = [e];
                    break;
                  }
            }
            this.formatted = void 0;
          }
          get range() {
            if (void 0 === this.formatted) {
              this.formatted = '';
              for (let e = 0; e < this.set.length; e++) {
                e > 0 && (this.formatted += '||');
                const t = this.set[e];
                for (let e = 0; e < t.length; e++)
                  e > 0 && (this.formatted += ' '), (this.formatted += t[e].toString().trim());
              }
            }
            return this.formatted;
          }
          format() {
            return this.range;
          }
          toString() {
            return this.range;
          }
          parseRange(e) {
            const t = ((this.options.includePrerelease && g) | (this.options.loose && m)) + ':' + e;
            const r = o.get(t);
            if (r) return r;
            const n = this.options.loose;
            const i = n ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
            (e = e.replace(i, N(this.options.includePrerelease))),
              c('hyphen replace', e),
              (e = e.replace(l[d.COMPARATORTRIM], f)),
              c('comparator trim', e),
              (e = e.replace(l[d.TILDETRIM], h)),
              c('tilde trim', e),
              (e = e.replace(l[d.CARETTRIM], p)),
              c('caret trim', e);
            let s = e
              .split(' ')
              .map(e => v(e, this.options))
              .join(' ')
              .split(/\s+/)
              .map(e => T(e, this.options));
            n &&
              (s = s.filter(
                e => (c('loose invalid filter', e, this.options), !!e.match(l[d.COMPARATORLOOSE]))
              )),
              c('range list', s);
            const u = new Map();
            const b = s.map(e => new a(e, this.options));
            for (const e of b) {
              if (y(e)) return [e];
              u.set(e.value, e);
            }
            u.size > 1 && u.has('') && u.delete('');
            const w = [...u.values()];
            return o.set(t, w), w;
          }
          intersects(e, t) {
            if (!(e instanceof i)) throw new TypeError('a Range is required');
            return this.set.some(
              r =>
                w(r, t) &&
                e.set.some(e => w(e, t) && r.every(r => e.every(e => r.intersects(e, t))))
            );
          }
          test(e) {
            if (!e) return !1;
            if (typeof e === 'string')
              try {
                e = new u(e, this.options);
              } catch (e) {
                return !1;
              }
            for (let t = 0; t < this.set.length; t++)
              if (O(this.set[t], e, this.options)) return !0;
            return !1;
          }
        }
        t.exports = i;
        const o = new (e('../internal/lrucache'))();
        const s = e('../internal/parse-options');
        const a = e('./comparator');
        const c = e('../internal/debug');
        const u = e('./semver');
        const {
          safeRe: l,
          t: d,
          comparatorTrimReplace: f,
          tildeTrimReplace: h,
          caretTrimReplace: p,
        } = e('../internal/re');
        const { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: m } = e('../internal/constants');
        const y = e => e.value === '<0.0.0-0';
        const b = e => e.value === '';
        const w = (e, t) => {
          let r = !0;
          const n = e.slice();
          let i = n.pop();
          for (; r && n.length; ) (r = n.every(e => i.intersects(e, t))), (i = n.pop());
          return r;
        };
        const v = (e, t) => (
          c('comp', e, t),
          (e = S(e, t)),
          c('caret', e),
          (e = _(e, t)),
          c('tildes', e),
          (e = I(e, t)),
          c('xrange', e),
          (e = R(e, t)),
          c('stars', e),
          e
        );
        const E = e => !e || e.toLowerCase() === 'x' || e === '*';
        const _ = (e, t) =>
          e
            .trim()
            .split(/\s+/)
            .map(e => M(e, t))
            .join(' ');
        const M = (e, t) => {
          const r = t.loose ? l[d.TILDELOOSE] : l[d.TILDE];
          return e.replace(r, (t, r, n, i, o) => {
            let s;
            return (
              c('tilde', e, t, r, n, i, o),
              E(r)
                ? (s = '')
                : E(n)
                  ? (s = `>=${r}.0.0 <${+r + 1}.0.0-0`)
                  : E(i)
                    ? (s = `>=${r}.${n}.0 <${r}.${+n + 1}.0-0`)
                    : o
                      ? (c('replaceTilde pr', o), (s = `>=${r}.${n}.${i}-${o} <${r}.${+n + 1}.0-0`))
                      : (s = `>=${r}.${n}.${i} <${r}.${+n + 1}.0-0`),
              c('tilde return', s),
              s
            );
          });
        };
        const S = (e, t) =>
          e
            .trim()
            .split(/\s+/)
            .map(e => j(e, t))
            .join(' ');
        const j = (e, t) => {
          c('caret', e, t);
          const r = t.loose ? l[d.CARETLOOSE] : l[d.CARET];
          const n = t.includePrerelease ? '-0' : '';
          return e.replace(r, (t, r, i, o, s) => {
            let a;
            return (
              c('caret', e, t, r, i, o, s),
              E(r)
                ? (a = '')
                : E(i)
                  ? (a = `>=${r}.0.0${n} <${+r + 1}.0.0-0`)
                  : E(o)
                    ? (a =
                        r === '0'
                          ? `>=${r}.${i}.0${n} <${r}.${+i + 1}.0-0`
                          : `>=${r}.${i}.0${n} <${+r + 1}.0.0-0`)
                    : s
                      ? (c('replaceCaret pr', s),
                        (a =
                          r === '0'
                            ? i === '0'
                              ? `>=${r}.${i}.${o}-${s} <${r}.${i}.${+o + 1}-0`
                              : `>=${r}.${i}.${o}-${s} <${r}.${+i + 1}.0-0`
                            : `>=${r}.${i}.${o}-${s} <${+r + 1}.0.0-0`))
                      : (c('no pr'),
                        (a =
                          r === '0'
                            ? i === '0'
                              ? `>=${r}.${i}.${o}${n} <${r}.${i}.${+o + 1}-0`
                              : `>=${r}.${i}.${o}${n} <${r}.${+i + 1}.0-0`
                            : `>=${r}.${i}.${o} <${+r + 1}.0.0-0`)),
              c('caret return', a),
              a
            );
          });
        };
        const I = (e, t) => (
          c('replaceXRanges', e, t),
          e
            .split(/\s+/)
            .map(e => A(e, t))
            .join(' ')
        );
        const A = (e, t) => {
          e = e.trim();
          const r = t.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
          return e.replace(r, (r, n, i, o, s, a) => {
            c('xRange', e, r, n, i, o, s, a);
            const u = E(i);
            const l = u || E(o);
            const d = l || E(s);
            const f = d;
            return (
              n === '=' && f && (n = ''),
              (a = t.includePrerelease ? '-0' : ''),
              u
                ? (r = n === '>' || n === '<' ? '<0.0.0-0' : '*')
                : n && f
                  ? (l && (o = 0),
                    (s = 0),
                    n === '>'
                      ? ((n = '>='), l ? ((i = +i + 1), (o = 0), (s = 0)) : ((o = +o + 1), (s = 0)))
                      : n === '<=' && ((n = '<'), l ? (i = +i + 1) : (o = +o + 1)),
                    n === '<' && (a = '-0'),
                    (r = `${n + i}.${o}.${s}${a}`))
                  : l
                    ? (r = `>=${i}.0.0${a} <${+i + 1}.0.0-0`)
                    : d && (r = `>=${i}.${o}.0${a} <${i}.${+o + 1}.0-0`),
              c('xRange return', r),
              r
            );
          });
        };
        const R = (e, t) => (c('replaceStars', e, t), e.trim().replace(l[d.STAR], ''));
        const T = (e, t) => (
          c('replaceGTE0', e, t), e.trim().replace(l[t.includePrerelease ? d.GTE0PRE : d.GTE0], '')
        );
        const N = e => (t, r, n, i, o, s, a, c, u, l, d, f) =>
          `${(r = E(n) ? '' : E(i) ? `>=${n}.0.0${e ? '-0' : ''}` : E(o) ? `>=${n}.${i}.0${e ? '-0' : ''}` : s ? `>=${r}` : `>=${r}${e ? '-0' : ''}`)} ${(c = E(u) ? '' : E(l) ? `<${+u + 1}.0.0-0` : E(d) ? `<${u}.${+l + 1}.0-0` : f ? `<=${u}.${l}.${d}-${f}` : e ? `<${u}.${l}.${+d + 1}-0` : `<=${c}`)}`.trim();
        const O = (e, t, r) => {
          for (let r = 0; r < e.length; r++) if (!e[r].test(t)) return !1;
          if (t.prerelease.length && !r.includePrerelease) {
            for (let r = 0; r < e.length; r++)
              if ((c(e[r].semver), e[r].semver !== a.ANY && e[r].semver.prerelease.length > 0)) {
                const n = e[r].semver;
                if (n.major === t.major && n.minor === t.minor && n.patch === t.patch) return !0;
              }
            return !1;
          }
          return !0;
        };
      },
      {
        '../internal/constants': 195,
        '../internal/debug': 196,
        '../internal/lrucache': 198,
        '../internal/parse-options': 199,
        '../internal/re': 200,
        './comparator': 167,
        './semver': 169,
      },
    ],
    169: [
      function (e, t, r) {
        const n = e('../internal/debug');
        const { MAX_LENGTH: i, MAX_SAFE_INTEGER: o } = e('../internal/constants');
        const { safeRe: s, t: a } = e('../internal/re');
        const c = e('../internal/parse-options');
        const { compareIdentifiers: u } = e('../internal/identifiers');
        class l {
          constructor(e, t) {
            if (((t = c(t)), e instanceof l)) {
              if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
              e = e.version;
            } else if (typeof e !== 'string')
              throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
            if (e.length > i) throw new TypeError(`version is longer than ${i} characters`);
            n('SemVer', e, t),
              (this.options = t),
              (this.loose = !!t.loose),
              (this.includePrerelease = !!t.includePrerelease);
            const r = e.trim().match(t.loose ? s[a.LOOSE] : s[a.FULL]);
            if (!r) throw new TypeError(`Invalid Version: ${e}`);
            if (
              ((this.raw = e),
              (this.major = +r[1]),
              (this.minor = +r[2]),
              (this.patch = +r[3]),
              this.major > o || this.major < 0)
            )
              throw new TypeError('Invalid major version');
            if (this.minor > o || this.minor < 0) throw new TypeError('Invalid minor version');
            if (this.patch > o || this.patch < 0) throw new TypeError('Invalid patch version');
            r[4]
              ? (this.prerelease = r[4].split('.').map(e => {
                  if (/^[0-9]+$/.test(e)) {
                    const t = +e;
                    if (t >= 0 && t < o) return t;
                  }
                  return e;
                }))
              : (this.prerelease = []),
              (this.build = r[5] ? r[5].split('.') : []),
              this.format();
          }
          format() {
            return (
              (this.version = `${this.major}.${this.minor}.${this.patch}`),
              this.prerelease.length && (this.version += `-${this.prerelease.join('.')}`),
              this.version
            );
          }
          toString() {
            return this.version;
          }
          compare(e) {
            if ((n('SemVer.compare', this.version, this.options, e), !(e instanceof l))) {
              if (typeof e === 'string' && e === this.version) return 0;
              e = new l(e, this.options);
            }
            return e.version === this.version ? 0 : this.compareMain(e) || this.comparePre(e);
          }
          compareMain(e) {
            return (
              e instanceof l || (e = new l(e, this.options)),
              u(this.major, e.major) || u(this.minor, e.minor) || u(this.patch, e.patch)
            );
          }
          comparePre(e) {
            if (
              (e instanceof l || (e = new l(e, this.options)),
              this.prerelease.length && !e.prerelease.length)
            )
              return -1;
            if (!this.prerelease.length && e.prerelease.length) return 1;
            if (!this.prerelease.length && !e.prerelease.length) return 0;
            let t = 0;
            do {
              const r = this.prerelease[t];
              const i = e.prerelease[t];
              if ((n('prerelease compare', t, r, i), void 0 === r && void 0 === i)) return 0;
              if (void 0 === i) return 1;
              if (void 0 === r) return -1;
              if (r !== i) return u(r, i);
            } while (++t);
          }
          compareBuild(e) {
            e instanceof l || (e = new l(e, this.options));
            let t = 0;
            do {
              const r = this.build[t];
              const i = e.build[t];
              if ((n('build compare', t, r, i), void 0 === r && void 0 === i)) return 0;
              if (void 0 === i) return 1;
              if (void 0 === r) return -1;
              if (r !== i) return u(r, i);
            } while (++t);
          }
          inc(e, t, r) {
            switch (e) {
              case 'premajor':
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  (this.minor = 0),
                  this.major++,
                  this.inc('pre', t, r);
                break;
              case 'preminor':
                (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc('pre', t, r);
                break;
              case 'prepatch':
                (this.prerelease.length = 0), this.inc('patch', t, r), this.inc('pre', t, r);
                break;
              case 'prerelease':
                this.prerelease.length === 0 && this.inc('patch', t, r), this.inc('pre', t, r);
                break;
              case 'major':
                (this.minor === 0 && this.patch === 0 && this.prerelease.length !== 0) ||
                  this.major++,
                  (this.minor = 0),
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case 'minor':
                (this.patch === 0 && this.prerelease.length !== 0) || this.minor++,
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case 'patch':
                this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
                break;
              case 'pre': {
                const e = Number(r) ? 1 : 0;
                if (!t && !1 === r)
                  throw new Error('invalid increment argument: identifier is empty');
                if (this.prerelease.length === 0) this.prerelease = [e];
                else {
                  let n = this.prerelease.length;
                  for (; --n >= 0; )
                    typeof this.prerelease[n] === 'number' && (this.prerelease[n]++, (n = -2));
                  if (n === -1) {
                    if (t === this.prerelease.join('.') && !1 === r)
                      throw new Error('invalid increment argument: identifier already exists');
                    this.prerelease.push(e);
                  }
                }
                if (t) {
                  let n = [t, e];
                  !1 === r && (n = [t]),
                    u(this.prerelease[0], t) === 0
                      ? isNaN(this.prerelease[1]) && (this.prerelease = n)
                      : (this.prerelease = n);
                }
                break;
              }
              default:
                throw new Error(`invalid increment argument: ${e}`);
            }
            return (
              (this.raw = this.format()),
              this.build.length && (this.raw += `+${this.build.join('.')}`),
              this
            );
          }
        }
        t.exports = l;
      },
      {
        '../internal/constants': 195,
        '../internal/debug': 196,
        '../internal/identifiers': 197,
        '../internal/parse-options': 199,
        '../internal/re': 200,
      },
    ],
    170: [
      function (e, t, r) {
        const n = e('./parse');
        t.exports = (e, t) => {
          const r = n(e.trim().replace(/^[=v]+/, ''), t);
          return r ? r.version : null;
        };
      },
      { './parse': 186 },
    ],
    171: [
      function (e, t, r) {
        const n = e('./eq');
        const i = e('./neq');
        const o = e('./gt');
        const s = e('./gte');
        const a = e('./lt');
        const c = e('./lte');
        t.exports = (e, t, r, u) => {
          switch (t) {
            case '===':
              return (
                typeof e === 'object' && (e = e.version),
                typeof r === 'object' && (r = r.version),
                e === r
              );
            case '!==':
              return (
                typeof e === 'object' && (e = e.version),
                typeof r === 'object' && (r = r.version),
                e !== r
              );
            case '':
            case '=':
            case '==':
              return n(e, r, u);
            case '!=':
              return i(e, r, u);
            case '>':
              return o(e, r, u);
            case '>=':
              return s(e, r, u);
            case '<':
              return a(e, r, u);
            case '<=':
              return c(e, r, u);
            default:
              throw new TypeError(`Invalid operator: ${t}`);
          }
        };
      },
      { './eq': 177, './gt': 178, './gte': 179, './lt': 181, './lte': 182, './neq': 185 },
    ],
    172: [
      function (e, t, r) {
        const n = e('../classes/semver');
        const i = e('./parse');
        const { safeRe: o, t: s } = e('../internal/re');
        t.exports = (e, t) => {
          if (e instanceof n) return e;
          if ((typeof e === 'number' && (e = String(e)), typeof e !== 'string')) return null;
          let r = null;
          if ((t = t || {}).rtl) {
            const n = t.includePrerelease ? o[s.COERCERTLFULL] : o[s.COERCERTL];
            let i;
            for (; (i = n.exec(e)) && (!r || r.index + r[0].length !== e.length); )
              (r && i.index + i[0].length === r.index + r[0].length) || (r = i),
                (n.lastIndex = i.index + i[1].length + i[2].length);
            n.lastIndex = -1;
          } else r = e.match(t.includePrerelease ? o[s.COERCEFULL] : o[s.COERCE]);
          if (r === null) return null;
          const a = r[2];
          const c = r[3] || '0';
          const u = r[4] || '0';
          const l = t.includePrerelease && r[5] ? `-${r[5]}` : '';
          const d = t.includePrerelease && r[6] ? `+${r[6]}` : '';
          return i(`${a}.${c}.${u}${l}${d}`, t);
        };
      },
      { '../classes/semver': 169, '../internal/re': 200, './parse': 186 },
    ],
    173: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t, r) => {
          const i = new n(e, r);
          const o = new n(t, r);
          return i.compare(o) || i.compareBuild(o);
        };
      },
      { '../classes/semver': 169 },
    ],
    174: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t) => n(e, t, !0);
      },
      { './compare': 175 },
    ],
    175: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
      },
      { '../classes/semver': 169 },
    ],
    176: [
      function (e, t, r) {
        const n = e('./parse.js');
        t.exports = (e, t) => {
          const r = n(e, null, !0);
          const i = n(t, null, !0);
          const o = r.compare(i);
          if (o === 0) return null;
          const s = o > 0;
          const a = s ? r : i;
          const c = s ? i : r;
          const u = !!a.prerelease.length;
          if (!!c.prerelease.length && !u)
            return c.patch || c.minor ? (a.patch ? 'patch' : a.minor ? 'minor' : 'major') : 'major';
          const l = u ? 'pre' : '';
          return r.major !== i.major
            ? l + 'major'
            : r.minor !== i.minor
              ? l + 'minor'
              : r.patch !== i.patch
                ? l + 'patch'
                : 'prerelease';
        };
      },
      { './parse.js': 186 },
    ],
    177: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(e, t, r) === 0;
      },
      { './compare': 175 },
    ],
    178: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(e, t, r) > 0;
      },
      { './compare': 175 },
    ],
    179: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(e, t, r) >= 0;
      },
      { './compare': 175 },
    ],
    180: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t, r, i, o) => {
          typeof r === 'string' && ((o = i), (i = r), (r = void 0));
          try {
            return new n(e instanceof n ? e.version : e, r).inc(t, i, o).version;
          } catch (e) {
            return null;
          }
        };
      },
      { '../classes/semver': 169 },
    ],
    181: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(e, t, r) < 0;
      },
      { './compare': 175 },
    ],
    182: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(e, t, r) <= 0;
      },
      { './compare': 175 },
    ],
    183: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t) => new n(e, t).major;
      },
      { '../classes/semver': 169 },
    ],
    184: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t) => new n(e, t).minor;
      },
      { '../classes/semver': 169 },
    ],
    185: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(e, t, r) !== 0;
      },
      { './compare': 175 },
    ],
    186: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t, r = !1) => {
          if (e instanceof n) return e;
          try {
            return new n(e, t);
          } catch (e) {
            if (!r) return null;
            throw e;
          }
        };
      },
      { '../classes/semver': 169 },
    ],
    187: [
      function (e, t, r) {
        const n = e('../classes/semver');
        t.exports = (e, t) => new n(e, t).patch;
      },
      { '../classes/semver': 169 },
    ],
    188: [
      function (e, t, r) {
        const n = e('./parse');
        t.exports = (e, t) => {
          const r = n(e, t);
          return r && r.prerelease.length ? r.prerelease : null;
        };
      },
      { './parse': 186 },
    ],
    189: [
      function (e, t, r) {
        const n = e('./compare');
        t.exports = (e, t, r) => n(t, e, r);
      },
      { './compare': 175 },
    ],
    190: [
      function (e, t, r) {
        const n = e('./compare-build');
        t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
      },
      { './compare-build': 173 },
    ],
    191: [
      function (e, t, r) {
        const n = e('../classes/range');
        t.exports = (e, t, r) => {
          try {
            t = new n(t, r);
          } catch (e) {
            return !1;
          }
          return t.test(e);
        };
      },
      { '../classes/range': 168 },
    ],
    192: [
      function (e, t, r) {
        const n = e('./compare-build');
        t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
      },
      { './compare-build': 173 },
    ],
    193: [
      function (e, t, r) {
        const n = e('./parse');
        t.exports = (e, t) => {
          const r = n(e, t);
          return r ? r.version : null;
        };
      },
      { './parse': 186 },
    ],
    194: [
      function (e, t, r) {
        const n = e('./internal/re');
        const i = e('./internal/constants');
        const o = e('./classes/semver');
        const s = e('./internal/identifiers');
        const a = e('./functions/parse');
        const c = e('./functions/valid');
        const u = e('./functions/clean');
        const l = e('./functions/inc');
        const d = e('./functions/diff');
        const f = e('./functions/major');
        const h = e('./functions/minor');
        const p = e('./functions/patch');
        const g = e('./functions/prerelease');
        const m = e('./functions/compare');
        const y = e('./functions/rcompare');
        const b = e('./functions/compare-loose');
        const w = e('./functions/compare-build');
        const v = e('./functions/sort');
        const E = e('./functions/rsort');
        const _ = e('./functions/gt');
        const M = e('./functions/lt');
        const S = e('./functions/eq');
        const j = e('./functions/neq');
        const I = e('./functions/gte');
        const A = e('./functions/lte');
        const R = e('./functions/cmp');
        const T = e('./functions/coerce');
        const N = e('./classes/comparator');
        const O = e('./classes/range');
        const C = e('./functions/satisfies');
        const x = e('./ranges/to-comparators');
        const P = e('./ranges/max-satisfying');
        const k = e('./ranges/min-satisfying');
        const D = e('./ranges/min-version');
        const L = e('./ranges/valid');
        const $ = e('./ranges/outside');
        const U = e('./ranges/gtr');
        const z = e('./ranges/ltr');
        const B = e('./ranges/intersects');
        const W = e('./ranges/simplify');
        const F = e('./ranges/subset');
        t.exports = {
          parse: a,
          valid: c,
          clean: u,
          inc: l,
          diff: d,
          major: f,
          minor: h,
          patch: p,
          prerelease: g,
          compare: m,
          rcompare: y,
          compareLoose: b,
          compareBuild: w,
          sort: v,
          rsort: E,
          gt: _,
          lt: M,
          eq: S,
          neq: j,
          gte: I,
          lte: A,
          cmp: R,
          coerce: T,
          Comparator: N,
          Range: O,
          satisfies: C,
          toComparators: x,
          maxSatisfying: P,
          minSatisfying: k,
          minVersion: D,
          validRange: L,
          outside: $,
          gtr: U,
          ltr: z,
          intersects: B,
          simplifyRange: W,
          subset: F,
          SemVer: o,
          re: n.re,
          src: n.src,
          tokens: n.t,
          SEMVER_SPEC_VERSION: i.SEMVER_SPEC_VERSION,
          RELEASE_TYPES: i.RELEASE_TYPES,
          compareIdentifiers: s.compareIdentifiers,
          rcompareIdentifiers: s.rcompareIdentifiers,
        };
      },
      {
        './classes/comparator': 167,
        './classes/range': 168,
        './classes/semver': 169,
        './functions/clean': 170,
        './functions/cmp': 171,
        './functions/coerce': 172,
        './functions/compare': 175,
        './functions/compare-build': 173,
        './functions/compare-loose': 174,
        './functions/diff': 176,
        './functions/eq': 177,
        './functions/gt': 178,
        './functions/gte': 179,
        './functions/inc': 180,
        './functions/lt': 181,
        './functions/lte': 182,
        './functions/major': 183,
        './functions/minor': 184,
        './functions/neq': 185,
        './functions/parse': 186,
        './functions/patch': 187,
        './functions/prerelease': 188,
        './functions/rcompare': 189,
        './functions/rsort': 190,
        './functions/satisfies': 191,
        './functions/sort': 192,
        './functions/valid': 193,
        './internal/constants': 195,
        './internal/identifiers': 197,
        './internal/re': 200,
        './ranges/gtr': 201,
        './ranges/intersects': 202,
        './ranges/ltr': 203,
        './ranges/max-satisfying': 204,
        './ranges/min-satisfying': 205,
        './ranges/min-version': 206,
        './ranges/outside': 207,
        './ranges/simplify': 208,
        './ranges/subset': 209,
        './ranges/to-comparators': 210,
        './ranges/valid': 211,
      },
    ],
    195: [
      function (e, t, r) {
        const n = Number.MAX_SAFE_INTEGER || 9007199254740991;
        t.exports = {
          MAX_LENGTH: 256,
          MAX_SAFE_COMPONENT_LENGTH: 16,
          MAX_SAFE_BUILD_LENGTH: 250,
          MAX_SAFE_INTEGER: n,
          RELEASE_TYPES: [
            'major',
            'premajor',
            'minor',
            'preminor',
            'patch',
            'prepatch',
            'prerelease',
          ],
          SEMVER_SPEC_VERSION: '2.0.0',
          FLAG_INCLUDE_PRERELEASE: 1,
          FLAG_LOOSE: 2,
        };
      },
      {},
    ],
    196: [
      function (e, t, r) {
        (function (e) {
          (function () {
            const r = (typeof e === 'object' && e.env, () => {});
            t.exports = r;
          }).call(this);
        }).call(this, e('_process'));
      },
      { _process: 150 },
    ],
    197: [
      function (e, t, r) {
        const n = /^[0-9]+$/;
        const i = (e, t) => {
          const r = n.test(e);
          const i = n.test(t);
          return (
            r && i && ((e = +e), (t = +t)),
            e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1
          );
        };
        t.exports = { compareIdentifiers: i, rcompareIdentifiers: (e, t) => i(t, e) };
      },
      {},
    ],
    198: [
      function (e, t, r) {
        t.exports = class {
          constructor() {
            (this.max = 1e3), (this.map = new Map());
          }
          get(e) {
            const t = this.map.get(e);
            return void 0 === t ? void 0 : (this.map.delete(e), this.map.set(e, t), t);
          }
          delete(e) {
            return this.map.delete(e);
          }
          set(e, t) {
            if (!this.delete(e) && void 0 !== t) {
              if (this.map.size >= this.max) {
                const e = this.map.keys().next().value;
                this.delete(e);
              }
              this.map.set(e, t);
            }
            return this;
          }
        };
      },
      {},
    ],
    199: [
      function (e, t, r) {
        const n = Object.freeze({ loose: !0 });
        const i = Object.freeze({});
        t.exports = e => (e ? (typeof e !== 'object' ? n : e) : i);
      },
      {},
    ],
    200: [
      function (e, t, r) {
        const {
          MAX_SAFE_COMPONENT_LENGTH: n,
          MAX_SAFE_BUILD_LENGTH: i,
          MAX_LENGTH: o,
        } = e('./constants');
        const s = e('./debug');
        const a = ((r = t.exports = {}).re = []);
        const c = (r.safeRe = []);
        const u = (r.src = []);
        const l = (r.t = {});
        let d = 0;
        const f = '[a-zA-Z0-9-]';
        const h = [
          ['\\s', 1],
          ['\\d', o],
          [f, i],
        ];
        const p = (e, t, r) => {
          const n = (e => {
            for (const [t, r] of h)
              e = e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);
            return e;
          })(t);
          const i = d++;
          s(e, i, t),
            (l[e] = i),
            (u[i] = t),
            (a[i] = new RegExp(t, r ? 'g' : void 0)),
            (c[i] = new RegExp(n, r ? 'g' : void 0));
        };
        p('NUMERICIDENTIFIER', '0|[1-9]\\d*'),
          p('NUMERICIDENTIFIERLOOSE', '\\d+'),
          p('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${f}*`),
          p(
            'MAINVERSION',
            `(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})`
          ),
          p(
            'MAINVERSIONLOOSE',
            `(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})`
          ),
          p('PRERELEASEIDENTIFIER', `(?:${u[l.NUMERICIDENTIFIER]}|${u[l.NONNUMERICIDENTIFIER]})`),
          p(
            'PRERELEASEIDENTIFIERLOOSE',
            `(?:${u[l.NUMERICIDENTIFIERLOOSE]}|${u[l.NONNUMERICIDENTIFIER]})`
          ),
          p(
            'PRERELEASE',
            `(?:-(${u[l.PRERELEASEIDENTIFIER]}(?:\\.${u[l.PRERELEASEIDENTIFIER]})*))`
          ),
          p(
            'PRERELEASELOOSE',
            `(?:-?(${u[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[l.PRERELEASEIDENTIFIERLOOSE]})*))`
          ),
          p('BUILDIDENTIFIER', `${f}+`),
          p('BUILD', `(?:\\+(${u[l.BUILDIDENTIFIER]}(?:\\.${u[l.BUILDIDENTIFIER]})*))`),
          p('FULLPLAIN', `v?${u[l.MAINVERSION]}${u[l.PRERELEASE]}?${u[l.BUILD]}?`),
          p('FULL', `^${u[l.FULLPLAIN]}$`),
          p('LOOSEPLAIN', `[v=\\s]*${u[l.MAINVERSIONLOOSE]}${u[l.PRERELEASELOOSE]}?${u[l.BUILD]}?`),
          p('LOOSE', `^${u[l.LOOSEPLAIN]}$`),
          p('GTLT', '((?:<|>)?=?)'),
          p('XRANGEIDENTIFIERLOOSE', `${u[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
          p('XRANGEIDENTIFIER', `${u[l.NUMERICIDENTIFIER]}|x|X|\\*`),
          p(
            'XRANGEPLAIN',
            `[v=\\s]*(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:${u[l.PRERELEASE]})?${u[l.BUILD]}?)?)?`
          ),
          p(
            'XRANGEPLAINLOOSE',
            `[v=\\s]*(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:${u[l.PRERELEASELOOSE]})?${u[l.BUILD]}?)?)?`
          ),
          p('XRANGE', `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAIN]}$`),
          p('XRANGELOOSE', `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAINLOOSE]}$`),
          p('COERCEPLAIN', `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),
          p('COERCE', `${u[l.COERCEPLAIN]}(?:$|[^\\d])`),
          p(
            'COERCEFULL',
            u[l.COERCEPLAIN] + `(?:${u[l.PRERELEASE]})?` + `(?:${u[l.BUILD]})?(?:$|[^\\d])`
          ),
          p('COERCERTL', u[l.COERCE], !0),
          p('COERCERTLFULL', u[l.COERCEFULL], !0),
          p('LONETILDE', '(?:~>?)'),
          p('TILDETRIM', `(\\s*)${u[l.LONETILDE]}\\s+`, !0),
          (r.tildeTrimReplace = '$1~'),
          p('TILDE', `^${u[l.LONETILDE]}${u[l.XRANGEPLAIN]}$`),
          p('TILDELOOSE', `^${u[l.LONETILDE]}${u[l.XRANGEPLAINLOOSE]}$`),
          p('LONECARET', '(?:\\^)'),
          p('CARETTRIM', `(\\s*)${u[l.LONECARET]}\\s+`, !0),
          (r.caretTrimReplace = '$1^'),
          p('CARET', `^${u[l.LONECARET]}${u[l.XRANGEPLAIN]}$`),
          p('CARETLOOSE', `^${u[l.LONECARET]}${u[l.XRANGEPLAINLOOSE]}$`),
          p('COMPARATORLOOSE', `^${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]})$|^$`),
          p('COMPARATOR', `^${u[l.GTLT]}\\s*(${u[l.FULLPLAIN]})$|^$`),
          p('COMPARATORTRIM', `(\\s*)${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]}|${u[l.XRANGEPLAIN]})`, !0),
          (r.comparatorTrimReplace = '$1$2$3'),
          p('HYPHENRANGE', `^\\s*(${u[l.XRANGEPLAIN]})\\s+-\\s+(${u[l.XRANGEPLAIN]})\\s*$`),
          p(
            'HYPHENRANGELOOSE',
            `^\\s*(${u[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[l.XRANGEPLAINLOOSE]})\\s*$`
          ),
          p('STAR', '(<|>)?=?\\s*\\*'),
          p('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$'),
          p('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
      },
      { './constants': 195, './debug': 196 },
    ],
    201: [
      function (e, t, r) {
        const n = e('./outside');
        t.exports = (e, t, r) => n(e, t, '>', r);
      },
      { './outside': 207 },
    ],
    202: [
      function (e, t, r) {
        const n = e('../classes/range');
        t.exports = (e, t, r) => ((e = new n(e, r)), (t = new n(t, r)), e.intersects(t, r));
      },
      { '../classes/range': 168 },
    ],
    203: [
      function (e, t, r) {
        const n = e('./outside');
        t.exports = (e, t, r) => n(e, t, '<', r);
      },
      { './outside': 207 },
    ],
    204: [
      function (e, t, r) {
        const n = e('../classes/semver');
        const i = e('../classes/range');
        t.exports = (e, t, r) => {
          let o = null;
          let s = null;
          let a = null;
          try {
            a = new i(t, r);
          } catch (e) {
            return null;
          }
          return (
            e.forEach(e => {
              a.test(e) && ((o && s.compare(e) !== -1) || ((o = e), (s = new n(o, r))));
            }),
            o
          );
        };
      },
      { '../classes/range': 168, '../classes/semver': 169 },
    ],
    205: [
      function (e, t, r) {
        const n = e('../classes/semver');
        const i = e('../classes/range');
        t.exports = (e, t, r) => {
          let o = null;
          let s = null;
          let a = null;
          try {
            a = new i(t, r);
          } catch (e) {
            return null;
          }
          return (
            e.forEach(e => {
              a.test(e) && ((o && s.compare(e) !== 1) || ((o = e), (s = new n(o, r))));
            }),
            o
          );
        };
      },
      { '../classes/range': 168, '../classes/semver': 169 },
    ],
    206: [
      function (e, t, r) {
        const n = e('../classes/semver');
        const i = e('../classes/range');
        const o = e('../functions/gt');
        t.exports = (e, t) => {
          e = new i(e, t);
          let r = new n('0.0.0');
          if (e.test(r)) return r;
          if (((r = new n('0.0.0-0')), e.test(r))) return r;
          r = null;
          for (let t = 0; t < e.set.length; ++t) {
            const i = e.set[t];
            let s = null;
            i.forEach(e => {
              const t = new n(e.semver.version);
              switch (e.operator) {
                case '>':
                  t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0),
                    (t.raw = t.format());
                case '':
                case '>=':
                  (s && !o(t, s)) || (s = t);
                  break;
                case '<':
                case '<=':
                  break;
                default:
                  throw new Error(`Unexpected operation: ${e.operator}`);
              }
            }),
              !s || (r && !o(r, s)) || (r = s);
          }
          return r && e.test(r) ? r : null;
        };
      },
      { '../classes/range': 168, '../classes/semver': 169, '../functions/gt': 178 },
    ],
    207: [
      function (e, t, r) {
        const n = e('../classes/semver');
        const i = e('../classes/comparator');
        const { ANY: o } = i;
        const s = e('../classes/range');
        const a = e('../functions/satisfies');
        const c = e('../functions/gt');
        const u = e('../functions/lt');
        const l = e('../functions/lte');
        const d = e('../functions/gte');
        t.exports = (e, t, r, f) => {
          let h, p, g, m, y;
          switch (((e = new n(e, f)), (t = new s(t, f)), r)) {
            case '>':
              (h = c), (p = l), (g = u), (m = '>'), (y = '>=');
              break;
            case '<':
              (h = u), (p = d), (g = c), (m = '<'), (y = '<=');
              break;
            default:
              throw new TypeError('Must provide a hilo val of "<" or ">"');
          }
          if (a(e, t, f)) return !1;
          for (let r = 0; r < t.set.length; ++r) {
            const n = t.set[r];
            let s = null;
            let a = null;
            if (
              (n.forEach(e => {
                e.semver === o && (e = new i('>=0.0.0')),
                  (s = s || e),
                  (a = a || e),
                  h(e.semver, s.semver, f) ? (s = e) : g(e.semver, a.semver, f) && (a = e);
              }),
              s.operator === m || s.operator === y)
            )
              return !1;
            if ((!a.operator || a.operator === m) && p(e, a.semver)) return !1;
            if (a.operator === y && g(e, a.semver)) return !1;
          }
          return !0;
        };
      },
      {
        '../classes/comparator': 167,
        '../classes/range': 168,
        '../classes/semver': 169,
        '../functions/gt': 178,
        '../functions/gte': 179,
        '../functions/lt': 181,
        '../functions/lte': 182,
        '../functions/satisfies': 191,
      },
    ],
    208: [
      function (e, t, r) {
        const n = e('../functions/satisfies.js');
        const i = e('../functions/compare.js');
        t.exports = (e, t, r) => {
          const o = [];
          let s = null;
          let a = null;
          const c = e.sort((e, t) => i(e, t, r));
          for (const e of c) {
            n(e, t, r) ? ((a = e), s || (s = e)) : (a && o.push([s, a]), (a = null), (s = null));
          }
          s && o.push([s, null]);
          const u = [];
          for (const [e, t] of o)
            e === t
              ? u.push(e)
              : t || e !== c[0]
                ? t
                  ? e === c[0]
                    ? u.push(`<=${t}`)
                    : u.push(`${e} - ${t}`)
                  : u.push(`>=${e}`)
                : u.push('*');
          const l = u.join(' || ');
          const d = typeof t.raw === 'string' ? t.raw : String(t);
          return l.length < d.length ? l : t;
        };
      },
      { '../functions/compare.js': 175, '../functions/satisfies.js': 191 },
    ],
    209: [
      function (e, t, r) {
        const n = e('../classes/range.js');
        const i = e('../classes/comparator.js');
        const { ANY: o } = i;
        const s = e('../functions/satisfies.js');
        const a = e('../functions/compare.js');
        const c = [new i('>=0.0.0-0')];
        const u = [new i('>=0.0.0')];
        const l = (e, t, r) => {
          if (e === t) return !0;
          if (e.length === 1 && e[0].semver === o) {
            if (t.length === 1 && t[0].semver === o) return !0;
            e = r.includePrerelease ? c : u;
          }
          if (t.length === 1 && t[0].semver === o) {
            if (r.includePrerelease) return !0;
            t = u;
          }
          const n = new Set();
          let i, l, h, p, g, m, y;
          for (const t of e)
            t.operator === '>' || t.operator === '>='
              ? (i = d(i, t, r))
              : t.operator === '<' || t.operator === '<='
                ? (l = f(l, t, r))
                : n.add(t.semver);
          if (n.size > 1) return null;
          if (i && l) {
            if (((h = a(i.semver, l.semver, r)), h > 0)) return null;
            if (h === 0 && (i.operator !== '>=' || l.operator !== '<=')) return null;
          }
          for (const e of n) {
            if (i && !s(e, String(i), r)) return null;
            if (l && !s(e, String(l), r)) return null;
            for (const n of t) if (!s(e, String(n), r)) return !1;
            return !0;
          }
          let b = !(!l || r.includePrerelease || !l.semver.prerelease.length) && l.semver;
          let w = !(!i || r.includePrerelease || !i.semver.prerelease.length) && i.semver;
          b && b.prerelease.length === 1 && l.operator === '<' && b.prerelease[0] === 0 && (b = !1);
          for (const e of t) {
            if (
              ((y = y || e.operator === '>' || e.operator === '>='),
              (m = m || e.operator === '<' || e.operator === '<='),
              i)
            )
              if (
                (w &&
                  e.semver.prerelease &&
                  e.semver.prerelease.length &&
                  e.semver.major === w.major &&
                  e.semver.minor === w.minor &&
                  e.semver.patch === w.patch &&
                  (w = !1),
                e.operator === '>' || e.operator === '>=')
              ) {
                if (((p = d(i, e, r)), p === e && p !== i)) return !1;
              } else if (i.operator === '>=' && !s(i.semver, String(e), r)) return !1;
            if (l)
              if (
                (b &&
                  e.semver.prerelease &&
                  e.semver.prerelease.length &&
                  e.semver.major === b.major &&
                  e.semver.minor === b.minor &&
                  e.semver.patch === b.patch &&
                  (b = !1),
                e.operator === '<' || e.operator === '<=')
              ) {
                if (((g = f(l, e, r)), g === e && g !== l)) return !1;
              } else if (l.operator === '<=' && !s(l.semver, String(e), r)) return !1;
            if (!e.operator && (l || i) && h !== 0) return !1;
          }
          return !(i && m && !l && h !== 0) && !(l && y && !i && h !== 0) && !w && !b;
        };
        const d = (e, t, r) => {
          if (!e) return t;
          const n = a(e.semver, t.semver, r);
          return n > 0 ? e : n < 0 || (t.operator === '>' && e.operator === '>=') ? t : e;
        };
        const f = (e, t, r) => {
          if (!e) return t;
          const n = a(e.semver, t.semver, r);
          return n < 0 ? e : n > 0 || (t.operator === '<' && e.operator === '<=') ? t : e;
        };
        t.exports = (e, t, r = {}) => {
          if (e === t) return !0;
          (e = new n(e, r)), (t = new n(t, r));
          let i = !1;
          e: for (const n of e.set) {
            for (const e of t.set) {
              const t = l(n, e, r);
              if (((i = i || t !== null), t)) continue e;
            }
            if (i) return !1;
          }
          return !0;
        };
      },
      {
        '../classes/comparator.js': 167,
        '../classes/range.js': 168,
        '../functions/compare.js': 175,
        '../functions/satisfies.js': 191,
      },
    ],
    210: [
      function (e, t, r) {
        const n = e('../classes/range');
        t.exports = (e, t) =>
          new n(e, t).set.map(e =>
            e
              .map(e => e.value)
              .join(' ')
              .trim()
              .split(' ')
          );
      },
      { '../classes/range': 168 },
    ],
    211: [
      function (e, t, r) {
        const n = e('../classes/range');
        t.exports = (e, t) => {
          try {
            return new n(e, t).range || '*';
          } catch (e) {
            return null;
          }
        };
      },
      { '../classes/range': 168 },
    ],
    212: [
      function (e, t, r) {
        'use strict';
        const n = e('safe-buffer').Buffer;
        const i =
          n.isEncoding ||
          function (e) {
            switch ((e = '' + e) && e.toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
              case 'raw':
                return !0;
              default:
                return !1;
            }
          };
        function o(e) {
          let t;
          switch (
            ((this.encoding = (function (e) {
              const t = (function (e) {
                if (!e) return 'utf8';
                for (var t; ; )
                  switch (e) {
                    case 'utf8':
                    case 'utf-8':
                      return 'utf8';
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                      return 'utf16le';
                    case 'latin1':
                    case 'binary':
                      return 'latin1';
                    case 'base64':
                    case 'ascii':
                    case 'hex':
                      return e;
                    default:
                      if (t) return;
                      (e = ('' + e).toLowerCase()), (t = !0);
                  }
              })(e);
              if (typeof t !== 'string' && (n.isEncoding === i || !i(e)))
                throw new Error('Unknown encoding: ' + e);
              return t || e;
            })(e)),
            this.encoding)
          ) {
            case 'utf16le':
              (this.text = c), (this.end = u), (t = 4);
              break;
            case 'utf8':
              (this.fillLast = a), (t = 4);
              break;
            case 'base64':
              (this.text = l), (this.end = d), (t = 3);
              break;
            default:
              return (this.write = f), void (this.end = h);
          }
          (this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = n.allocUnsafe(t));
        }
        function s(e) {
          return e <= 127
            ? 0
            : e >> 5 == 6
              ? 2
              : e >> 4 == 14
                ? 3
                : e >> 3 == 30
                  ? 4
                  : e >> 6 == 2
                    ? -1
                    : -2;
        }
        function a(e) {
          const t = this.lastTotal - this.lastNeed;
          const r = (function (e, t, r) {
            if ((192 & t[0]) != 128) return (e.lastNeed = 0), '�';
            if (e.lastNeed > 1 && t.length > 1) {
              if ((192 & t[1]) != 128) return (e.lastNeed = 1), '�';
              if (e.lastNeed > 2 && t.length > 2 && (192 & t[2]) != 128)
                return (e.lastNeed = 2), '�';
            }
          })(this, e);
          return void 0 !== r
            ? r
            : this.lastNeed <= e.length
              ? (e.copy(this.lastChar, t, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal))
              : (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length));
        }
        function c(e, t) {
          if ((e.length - t) % 2 == 0) {
            const r = e.toString('utf16le', t);
            if (r) {
              const n = r.charCodeAt(r.length - 1);
              if (n >= 55296 && n <= 56319)
                return (
                  (this.lastNeed = 2),
                  (this.lastTotal = 4),
                  (this.lastChar[0] = e[e.length - 2]),
                  (this.lastChar[1] = e[e.length - 1]),
                  r.slice(0, -1)
                );
            }
            return r;
          }
          return (
            (this.lastNeed = 1),
            (this.lastTotal = 2),
            (this.lastChar[0] = e[e.length - 1]),
            e.toString('utf16le', t, e.length - 1)
          );
        }
        function u(e) {
          const t = e && e.length ? this.write(e) : '';
          if (this.lastNeed) {
            const r = this.lastTotal - this.lastNeed;
            return t + this.lastChar.toString('utf16le', 0, r);
          }
          return t;
        }
        function l(e, t) {
          const r = (e.length - t) % 3;
          return r === 0
            ? e.toString('base64', t)
            : ((this.lastNeed = 3 - r),
              (this.lastTotal = 3),
              r === 1
                ? (this.lastChar[0] = e[e.length - 1])
                : ((this.lastChar[0] = e[e.length - 2]), (this.lastChar[1] = e[e.length - 1])),
              e.toString('base64', t, e.length - r));
        }
        function d(e) {
          const t = e && e.length ? this.write(e) : '';
          return this.lastNeed ? t + this.lastChar.toString('base64', 0, 3 - this.lastNeed) : t;
        }
        function f(e) {
          return e.toString(this.encoding);
        }
        function h(e) {
          return e && e.length ? this.write(e) : '';
        }
        (r.StringDecoder = o),
          (o.prototype.write = function (e) {
            if (e.length === 0) return '';
            let t, r;
            if (this.lastNeed) {
              if (void 0 === (t = this.fillLast(e))) return '';
              (r = this.lastNeed), (this.lastNeed = 0);
            } else r = 0;
            return r < e.length ? (t ? t + this.text(e, r) : this.text(e, r)) : t || '';
          }),
          (o.prototype.end = function (e) {
            const t = e && e.length ? this.write(e) : '';
            return this.lastNeed ? t + '�' : t;
          }),
          (o.prototype.text = function (e, t) {
            const r = (function (e, t, r) {
              let n = t.length - 1;
              if (n < r) return 0;
              let i = s(t[n]);
              if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
              if (--n < r || i === -2) return 0;
              if (((i = s(t[n])), i >= 0)) return i > 0 && (e.lastNeed = i - 2), i;
              if (--n < r || i === -2) return 0;
              if (((i = s(t[n])), i >= 0))
                return i > 0 && (i === 2 ? (i = 0) : (e.lastNeed = i - 3)), i;
              return 0;
            })(this, e, t);
            if (!this.lastNeed) return e.toString('utf8', t);
            this.lastTotal = r;
            const n = e.length - (r - this.lastNeed);
            return e.copy(this.lastChar, 0, n), e.toString('utf8', t, n);
          }),
          (o.prototype.fillLast = function (e) {
            if (this.lastNeed <= e.length)
              return (
                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal)
              );
            e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
              (this.lastNeed -= e.length);
          });
      },
      { 'safe-buffer': 166 },
    ],
    213: [
      function (e, t, r) {
        (function (e) {
          (function () {
            function r(t) {
              try {
                if (!e.localStorage) return !1;
              } catch (e) {
                return !1;
              }
              const r = e.localStorage[t];
              return r != null && String(r).toLowerCase() === 'true';
            }
            t.exports = function (e, t) {
              if (r('noDeprecation')) return e;
              let n = !1;
              return function () {
                if (!n) {
                  if (r('throwDeprecation')) throw new Error(t);
                  r('traceDeprecation') ? console.trace(t) : console.warn(t), (n = !0);
                }
                return e.apply(this, arguments);
              };
            };
          }).call(this);
        }).call(
          this,
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {}
        );
      },
      {},
    ],
    214: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          Object.defineProperty(r, 'v1', {
            enumerable: !0,
            get: function () {
              return n.default;
            },
          }),
          Object.defineProperty(r, 'v3', {
            enumerable: !0,
            get: function () {
              return i.default;
            },
          }),
          Object.defineProperty(r, 'v4', {
            enumerable: !0,
            get: function () {
              return o.default;
            },
          }),
          Object.defineProperty(r, 'v5', {
            enumerable: !0,
            get: function () {
              return s.default;
            },
          }),
          Object.defineProperty(r, 'NIL', {
            enumerable: !0,
            get: function () {
              return a.default;
            },
          }),
          Object.defineProperty(r, 'version', {
            enumerable: !0,
            get: function () {
              return c.default;
            },
          }),
          Object.defineProperty(r, 'validate', {
            enumerable: !0,
            get: function () {
              return u.default;
            },
          }),
          Object.defineProperty(r, 'stringify', {
            enumerable: !0,
            get: function () {
              return l.default;
            },
          }),
          Object.defineProperty(r, 'parse', {
            enumerable: !0,
            get: function () {
              return d.default;
            },
          });
        var n = f(e('./v1.js'));
        var i = f(e('./v3.js'));
        var o = f(e('./v4.js'));
        var s = f(e('./v5.js'));
        var a = f(e('./nil.js'));
        var c = f(e('./version.js'));
        var u = f(e('./validate.js'));
        var l = f(e('./stringify.js'));
        var d = f(e('./parse.js'));
        function f(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      {
        './nil.js': 216,
        './parse.js': 217,
        './stringify.js': 221,
        './v1.js': 222,
        './v3.js': 223,
        './v4.js': 225,
        './v5.js': 226,
        './validate.js': 227,
        './version.js': 228,
      },
    ],
    215: [
      function (e, t, r) {
        'use strict';
        function n(e) {
          return 14 + (((e + 64) >>> 9) << 4) + 1;
        }
        function i(e, t) {
          const r = (65535 & e) + (65535 & t);
          return (((e >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
        }
        function o(e, t, r, n, o, s) {
          return i(((a = i(i(t, e), i(n, s))) << (c = o)) | (a >>> (32 - c)), r);
          let a, c;
        }
        function s(e, t, r, n, i, s, a) {
          return o((t & r) | (~t & n), e, t, i, s, a);
        }
        function a(e, t, r, n, i, s, a) {
          return o((t & n) | (r & ~n), e, t, i, s, a);
        }
        function c(e, t, r, n, i, s, a) {
          return o(t ^ r ^ n, e, t, i, s, a);
        }
        function u(e, t, r, n, i, s, a) {
          return o(r ^ (t | ~n), e, t, i, s, a);
        }
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        const l = function (e) {
          if (typeof e === 'string') {
            const t = unescape(encodeURIComponent(e));
            e = new Uint8Array(t.length);
            for (let r = 0; r < t.length; ++r) e[r] = t.charCodeAt(r);
          }
          return (function (e) {
            const t = [];
            const r = 32 * e.length;
            const n = '0123456789abcdef';
            for (let i = 0; i < r; i += 8) {
              const r = (e[i >> 5] >>> i % 32) & 255;
              const o = parseInt(n.charAt((r >>> 4) & 15) + n.charAt(15 & r), 16);
              t.push(o);
            }
            return t;
          })(
            (function (e, t) {
              (e[t >> 5] |= 128 << t % 32), (e[n(t) - 1] = t);
              let r = 1732584193;
              let o = -271733879;
              let l = -1732584194;
              let d = 271733878;
              for (let t = 0; t < e.length; t += 16) {
                const n = r;
                const f = o;
                const h = l;
                const p = d;
                (r = s(r, o, l, d, e[t], 7, -680876936)),
                  (d = s(d, r, o, l, e[t + 1], 12, -389564586)),
                  (l = s(l, d, r, o, e[t + 2], 17, 606105819)),
                  (o = s(o, l, d, r, e[t + 3], 22, -1044525330)),
                  (r = s(r, o, l, d, e[t + 4], 7, -176418897)),
                  (d = s(d, r, o, l, e[t + 5], 12, 1200080426)),
                  (l = s(l, d, r, o, e[t + 6], 17, -1473231341)),
                  (o = s(o, l, d, r, e[t + 7], 22, -45705983)),
                  (r = s(r, o, l, d, e[t + 8], 7, 1770035416)),
                  (d = s(d, r, o, l, e[t + 9], 12, -1958414417)),
                  (l = s(l, d, r, o, e[t + 10], 17, -42063)),
                  (o = s(o, l, d, r, e[t + 11], 22, -1990404162)),
                  (r = s(r, o, l, d, e[t + 12], 7, 1804603682)),
                  (d = s(d, r, o, l, e[t + 13], 12, -40341101)),
                  (l = s(l, d, r, o, e[t + 14], 17, -1502002290)),
                  (o = s(o, l, d, r, e[t + 15], 22, 1236535329)),
                  (r = a(r, o, l, d, e[t + 1], 5, -165796510)),
                  (d = a(d, r, o, l, e[t + 6], 9, -1069501632)),
                  (l = a(l, d, r, o, e[t + 11], 14, 643717713)),
                  (o = a(o, l, d, r, e[t], 20, -373897302)),
                  (r = a(r, o, l, d, e[t + 5], 5, -701558691)),
                  (d = a(d, r, o, l, e[t + 10], 9, 38016083)),
                  (l = a(l, d, r, o, e[t + 15], 14, -660478335)),
                  (o = a(o, l, d, r, e[t + 4], 20, -405537848)),
                  (r = a(r, o, l, d, e[t + 9], 5, 568446438)),
                  (d = a(d, r, o, l, e[t + 14], 9, -1019803690)),
                  (l = a(l, d, r, o, e[t + 3], 14, -187363961)),
                  (o = a(o, l, d, r, e[t + 8], 20, 1163531501)),
                  (r = a(r, o, l, d, e[t + 13], 5, -1444681467)),
                  (d = a(d, r, o, l, e[t + 2], 9, -51403784)),
                  (l = a(l, d, r, o, e[t + 7], 14, 1735328473)),
                  (o = a(o, l, d, r, e[t + 12], 20, -1926607734)),
                  (r = c(r, o, l, d, e[t + 5], 4, -378558)),
                  (d = c(d, r, o, l, e[t + 8], 11, -2022574463)),
                  (l = c(l, d, r, o, e[t + 11], 16, 1839030562)),
                  (o = c(o, l, d, r, e[t + 14], 23, -35309556)),
                  (r = c(r, o, l, d, e[t + 1], 4, -1530992060)),
                  (d = c(d, r, o, l, e[t + 4], 11, 1272893353)),
                  (l = c(l, d, r, o, e[t + 7], 16, -155497632)),
                  (o = c(o, l, d, r, e[t + 10], 23, -1094730640)),
                  (r = c(r, o, l, d, e[t + 13], 4, 681279174)),
                  (d = c(d, r, o, l, e[t], 11, -358537222)),
                  (l = c(l, d, r, o, e[t + 3], 16, -722521979)),
                  (o = c(o, l, d, r, e[t + 6], 23, 76029189)),
                  (r = c(r, o, l, d, e[t + 9], 4, -640364487)),
                  (d = c(d, r, o, l, e[t + 12], 11, -421815835)),
                  (l = c(l, d, r, o, e[t + 15], 16, 530742520)),
                  (o = c(o, l, d, r, e[t + 2], 23, -995338651)),
                  (r = u(r, o, l, d, e[t], 6, -198630844)),
                  (d = u(d, r, o, l, e[t + 7], 10, 1126891415)),
                  (l = u(l, d, r, o, e[t + 14], 15, -1416354905)),
                  (o = u(o, l, d, r, e[t + 5], 21, -57434055)),
                  (r = u(r, o, l, d, e[t + 12], 6, 1700485571)),
                  (d = u(d, r, o, l, e[t + 3], 10, -1894986606)),
                  (l = u(l, d, r, o, e[t + 10], 15, -1051523)),
                  (o = u(o, l, d, r, e[t + 1], 21, -2054922799)),
                  (r = u(r, o, l, d, e[t + 8], 6, 1873313359)),
                  (d = u(d, r, o, l, e[t + 15], 10, -30611744)),
                  (l = u(l, d, r, o, e[t + 6], 15, -1560198380)),
                  (o = u(o, l, d, r, e[t + 13], 21, 1309151649)),
                  (r = u(r, o, l, d, e[t + 4], 6, -145523070)),
                  (d = u(d, r, o, l, e[t + 11], 10, -1120210379)),
                  (l = u(l, d, r, o, e[t + 2], 15, 718787259)),
                  (o = u(o, l, d, r, e[t + 9], 21, -343485551)),
                  (r = i(r, n)),
                  (o = i(o, f)),
                  (l = i(l, h)),
                  (d = i(d, p));
              }
              return [r, o, l, d];
            })(
              (function (e) {
                if (e.length === 0) return [];
                const t = 8 * e.length;
                const r = new Uint32Array(n(t));
                for (let n = 0; n < t; n += 8) r[n >> 5] |= (255 & e[n / 8]) << n % 32;
                return r;
              })(e),
              8 * e.length
            )
          );
        };
        r.default = l;
      },
      {},
    ],
    216: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        r.default = '00000000-0000-0000-0000-000000000000';
      },
      {},
    ],
    217: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        let n;
        const i = (n = e('./validate.js')) && n.__esModule ? n : { default: n };
        const o = function (e) {
          if (!(0, i.default)(e)) throw TypeError('Invalid UUID');
          let t;
          const r = new Uint8Array(16);
          return (
            (r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24),
            (r[1] = (t >>> 16) & 255),
            (r[2] = (t >>> 8) & 255),
            (r[3] = 255 & t),
            (r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8),
            (r[5] = 255 & t),
            (r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8),
            (r[7] = 255 & t),
            (r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8),
            (r[9] = 255 & t),
            (r[10] = ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
            (r[11] = (t / 4294967296) & 255),
            (r[12] = (t >>> 24) & 255),
            (r[13] = (t >>> 16) & 255),
            (r[14] = (t >>> 8) & 255),
            (r[15] = 255 & t),
            r
          );
        };
        r.default = o;
      },
      { './validate.js': 227 },
    ],
    218: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        r.default =
          /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      },
      {},
    ],
    219: [
      function (e, t, r) {
        'use strict';
        let n;
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.default = function () {
            if (
              !n &&
              ((n =
                (typeof crypto !== 'undefined' &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto)) ||
                (typeof msCrypto !== 'undefined' &&
                  typeof msCrypto.getRandomValues === 'function' &&
                  msCrypto.getRandomValues.bind(msCrypto))),
              !n)
            )
              throw new Error(
                'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
              );
            return n(i);
          });
        const i = new Uint8Array(16);
      },
      {},
    ],
    220: [
      function (e, t, r) {
        'use strict';
        function n(e, t, r, n) {
          switch (e) {
            case 0:
              return (t & r) ^ (~t & n);
            case 1:
            case 3:
              return t ^ r ^ n;
            case 2:
              return (t & r) ^ (t & n) ^ (r & n);
          }
        }
        function i(e, t) {
          return (e << t) | (e >>> (32 - t));
        }
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        const o = function (e) {
          const t = [1518500249, 1859775393, 2400959708, 3395469782];
          const r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
          if (typeof e === 'string') {
            const t = unescape(encodeURIComponent(e));
            e = [];
            for (let r = 0; r < t.length; ++r) e.push(t.charCodeAt(r));
          } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
          e.push(128);
          const o = e.length / 4 + 2;
          const s = Math.ceil(o / 16);
          const a = new Array(s);
          for (let t = 0; t < s; ++t) {
            const r = new Uint32Array(16);
            for (let n = 0; n < 16; ++n)
              r[n] =
                (e[64 * t + 4 * n] << 24) |
                (e[64 * t + 4 * n + 1] << 16) |
                (e[64 * t + 4 * n + 2] << 8) |
                e[64 * t + 4 * n + 3];
            a[t] = r;
          }
          (a[s - 1][14] = (8 * (e.length - 1)) / Math.pow(2, 32)),
            (a[s - 1][14] = Math.floor(a[s - 1][14])),
            (a[s - 1][15] = (8 * (e.length - 1)) & 4294967295);
          for (let e = 0; e < s; ++e) {
            const o = new Uint32Array(80);
            for (let t = 0; t < 16; ++t) o[t] = a[e][t];
            for (let e = 16; e < 80; ++e) o[e] = i(o[e - 3] ^ o[e - 8] ^ o[e - 14] ^ o[e - 16], 1);
            let s = r[0];
            let c = r[1];
            let u = r[2];
            let l = r[3];
            let d = r[4];
            for (let e = 0; e < 80; ++e) {
              const r = Math.floor(e / 20);
              const a = (i(s, 5) + n(r, c, u, l) + d + t[r] + o[e]) >>> 0;
              (d = l), (l = u), (u = i(c, 30) >>> 0), (c = s), (s = a);
            }
            (r[0] = (r[0] + s) >>> 0),
              (r[1] = (r[1] + c) >>> 0),
              (r[2] = (r[2] + u) >>> 0),
              (r[3] = (r[3] + l) >>> 0),
              (r[4] = (r[4] + d) >>> 0);
          }
          return [
            (r[0] >> 24) & 255,
            (r[0] >> 16) & 255,
            (r[0] >> 8) & 255,
            255 & r[0],
            (r[1] >> 24) & 255,
            (r[1] >> 16) & 255,
            (r[1] >> 8) & 255,
            255 & r[1],
            (r[2] >> 24) & 255,
            (r[2] >> 16) & 255,
            (r[2] >> 8) & 255,
            255 & r[2],
            (r[3] >> 24) & 255,
            (r[3] >> 16) & 255,
            (r[3] >> 8) & 255,
            255 & r[3],
            (r[4] >> 24) & 255,
            (r[4] >> 16) & 255,
            (r[4] >> 8) & 255,
            255 & r[4],
          ];
        };
        r.default = o;
      },
      {},
    ],
    221: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        let n;
        const i = (n = e('./validate.js')) && n.__esModule ? n : { default: n };
        const o = [];
        for (let e = 0; e < 256; ++e) o.push((e + 256).toString(16).substr(1));
        const s = function (e, t = 0) {
          const r = (
            o[e[t + 0]] +
            o[e[t + 1]] +
            o[e[t + 2]] +
            o[e[t + 3]] +
            '-' +
            o[e[t + 4]] +
            o[e[t + 5]] +
            '-' +
            o[e[t + 6]] +
            o[e[t + 7]] +
            '-' +
            o[e[t + 8]] +
            o[e[t + 9]] +
            '-' +
            o[e[t + 10]] +
            o[e[t + 11]] +
            o[e[t + 12]] +
            o[e[t + 13]] +
            o[e[t + 14]] +
            o[e[t + 15]]
          ).toLowerCase();
          if (!(0, i.default)(r)) throw TypeError('Stringified UUID is invalid');
          return r;
        };
        r.default = s;
      },
      { './validate.js': 227 },
    ],
    222: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        const n = o(e('./rng.js'));
        const i = o(e('./stringify.js'));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let s;
        let a;
        let c = 0;
        let u = 0;
        const l = function (e, t, r) {
          let o = (t && r) || 0;
          const l = t || new Array(16);
          let d = (e = e || {}).node || s;
          let f = void 0 !== e.clockseq ? e.clockseq : a;
          if (d == null || f == null) {
            const t = e.random || (e.rng || n.default)();
            d == null && (d = s = [1 | t[0], t[1], t[2], t[3], t[4], t[5]]),
              f == null && (f = a = 16383 & ((t[6] << 8) | t[7]));
          }
          let h = void 0 !== e.msecs ? e.msecs : Date.now();
          let p = void 0 !== e.nsecs ? e.nsecs : u + 1;
          const g = h - c + (p - u) / 1e4;
          if (
            (g < 0 && void 0 === e.clockseq && (f = (f + 1) & 16383),
            (g < 0 || h > c) && void 0 === e.nsecs && (p = 0),
            p >= 1e4)
          )
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          (c = h), (u = p), (a = f), (h += 122192928e5);
          const m = (1e4 * (268435455 & h) + p) % 4294967296;
          (l[o++] = (m >>> 24) & 255),
            (l[o++] = (m >>> 16) & 255),
            (l[o++] = (m >>> 8) & 255),
            (l[o++] = 255 & m);
          const y = ((h / 4294967296) * 1e4) & 268435455;
          (l[o++] = (y >>> 8) & 255),
            (l[o++] = 255 & y),
            (l[o++] = ((y >>> 24) & 15) | 16),
            (l[o++] = (y >>> 16) & 255),
            (l[o++] = (f >>> 8) | 128),
            (l[o++] = 255 & f);
          for (let e = 0; e < 6; ++e) l[o + e] = d[e];
          return t || (0, i.default)(l);
        };
        r.default = l;
      },
      { './rng.js': 219, './stringify.js': 221 },
    ],
    223: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        const n = o(e('./v35.js'));
        const i = o(e('./md5.js'));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, n.default)('v3', 48, i.default);
        r.default = s;
      },
      { './md5.js': 215, './v35.js': 224 },
    ],
    224: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.default = function (e, t, r) {
            function o(e, o, s, a) {
              if (
                (typeof e === 'string' &&
                  (e = (function (e) {
                    e = unescape(encodeURIComponent(e));
                    const t = [];
                    for (let r = 0; r < e.length; ++r) t.push(e.charCodeAt(r));
                    return t;
                  })(e)),
                typeof o === 'string' && (o = (0, i.default)(o)),
                o.length !== 16)
              )
                throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
              let c = new Uint8Array(16 + e.length);
              if (
                (c.set(o),
                c.set(e, o.length),
                (c = r(c)),
                (c[6] = (15 & c[6]) | t),
                (c[8] = (63 & c[8]) | 128),
                s)
              ) {
                a = a || 0;
                for (let e = 0; e < 16; ++e) s[a + e] = c[e];
                return s;
              }
              return (0, n.default)(c);
            }
            try {
              o.name = e;
            } catch (e) {}
            return (o.DNS = s), (o.URL = a), o;
          }),
          (r.URL = r.DNS = void 0);
        var n = o(e('./stringify.js'));
        var i = o(e('./parse.js'));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
        r.DNS = s;
        const a = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
        r.URL = a;
      },
      { './parse.js': 217, './stringify.js': 221 },
    ],
    225: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        const n = o(e('./rng.js'));
        const i = o(e('./stringify.js'));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = function (e, t, r) {
          const o = (e = e || {}).random || (e.rng || n.default)();
          if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t)) {
            r = r || 0;
            for (let e = 0; e < 16; ++e) t[r + e] = o[e];
            return t;
          }
          return (0, i.default)(o);
        };
        r.default = s;
      },
      { './rng.js': 219, './stringify.js': 221 },
    ],
    226: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        const n = o(e('./v35.js'));
        const i = o(e('./sha1.js'));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, n.default)('v5', 80, i.default);
        r.default = s;
      },
      { './sha1.js': 220, './v35.js': 224 },
    ],
    227: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        let n;
        const i = (n = e('./regex.js')) && n.__esModule ? n : { default: n };
        const o = function (e) {
          return typeof e === 'string' && i.default.test(e);
        };
        r.default = o;
      },
      { './regex.js': 218 },
    ],
    228: [
      function (e, t, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        let n;
        const i = (n = e('./validate.js')) && n.__esModule ? n : { default: n };
        const o = function (e) {
          if (!(0, i.default)(e)) throw TypeError('Invalid UUID');
          return parseInt(e.substr(14, 1), 16);
        };
        r.default = o;
      },
      { './validate.js': 227 },
    ],
    229: [
      function (e, t, r) {
        t.exports = function e(t, r) {
          if (t && r) return e(t)(r);
          if (typeof t !== 'function') throw new TypeError('need wrapper function');
          return (
            Object.keys(t).forEach(function (e) {
              n[e] = t[e];
            }),
            n
          );
          function n() {
            for (var e = new Array(arguments.length), r = 0; r < e.length; r++) e[r] = arguments[r];
            const n = t.apply(this, e);
            const i = e[e.length - 1];
            return (
              typeof n === 'function' &&
                n !== i &&
                Object.keys(i).forEach(function (e) {
                  n[e] = i[e];
                }),
              n
            );
          }
        };
      },
      {},
    ],
    230: [
      function (e, t, r) {
        'use strict';
        function n(e) {
          return (
            (function ({ pathname: e }) {
              const t = [/\.xml$/u, /\.pdf$/u];
              for (let r = 0; r < t.length; r++) if (t[r].test(e)) return !1;
              return !0;
            })(e) &&
            !(function (e) {
              const t = [
                'execution.consensys.io',
                'execution.metamask.io',
                'uscourts.gov',
                'dropbox.com',
                'webbyawards.com',
                'adyen.com',
                'gravityforms.com',
                'harbourair.com',
                'ani.gamer.com.tw',
                'blueskybooking.com',
                'sharefile.com',
                'battle.net',
              ];
              const r = ['cdn.shopify.com/s/javascripts/tricorder/xtld-read-only-frame.html'];
              const { hostname: n, pathname: i } = e;
              const o = e => (e.endsWith('/') ? e.slice(0, -1) : e);
              return t.some(e => e === n || n.endsWith(`.${e}`)) || r.some(e => o(e) === o(n + i));
            })(e)
          );
        }
        function i() {
          return (
            (function () {
              const { doctype: e } = window.document;
              if (e) return e.name === 'html';
              return !0;
            })() &&
            (function () {
              const e = document.documentElement.nodeName;
              if (e) return e.toLowerCase() === 'html';
              return !0;
            })()
          );
        }
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.checkDocumentForProviderInjection = i),
          (r.checkURLForProviderInjection = n),
          (r.default = function () {
            return n(new URL(window.location)) && i();
          });
      },
      {},
    ],
  },
  {},
  [2]
);
