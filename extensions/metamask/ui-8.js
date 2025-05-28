LavaPack.loadBundle(
  [
    [
      6889,
      { 'prop-types': 5082, react: 5328, 'react-router-dom': 5313 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var s,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = i(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  o = (s = e('prop-types')) && s.__esModule ? s : { default: s },
                  a = e('react-router-dom');
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function c({ flag: e, redirectRoute: t, ...n }) {
                  const s = (0, r.useMemo)(() => ({ pathname: t }), [t]);
                  return e
                    ? r.default.createElement(a.Route, n)
                    : r.default.createElement(a.Redirect, { to: s });
                }
                c.propTypes = {
                  flag: o.default.bool.isRequired,
                  redirectRoute: o.default.string.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/higher-order-components/feature-toggled-route.js' },
    ],
    [
      689,
      {
        './PathComponent': 694,
        './RegistryItem': 695,
        './RegistryType': 696,
        './lib': 706,
        buffer: 4139,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }),
                      (n.CryptoKeypath = void 0);
                    const s = e('./lib'),
                      r = e('./PathComponent'),
                      o = e('./RegistryItem'),
                      a = e('./RegistryType');
                    var i;
                    !(function (e) {
                      (e[(e.components = 1)] = 'components'),
                        (e[(e.source_fingerprint = 2)] = 'source_fingerprint'),
                        (e[(e.depth = 3)] = 'depth');
                    })(i || (i = {}));
                    class c extends o.RegistryItem {
                      constructor(e = [], t, n) {
                        super(),
                          (this.components = e),
                          (this.sourceFingerprint = t),
                          (this.depth = n),
                          (this.getRegistryType = () => a.RegistryTypes.CRYPTO_KEYPATH),
                          (this.getPath = () => {
                            if (0 === this.components.length) return undefined;
                            return this.components
                              .map(
                                e =>
                                  `${e.isWildcard() ? '*' : e.getIndex()}${e.isHardened() ? "'" : ''}`
                              )
                              .join('/');
                          }),
                          (this.getComponents = () => this.components),
                          (this.getSourceFingerprint = () => this.sourceFingerprint),
                          (this.getDepth = () => this.depth),
                          (this.toDataItem = () => {
                            const e = {},
                              t = [];
                            return (
                              this.components &&
                                this.components.forEach(e => {
                                  e.isWildcard() ? t.push([]) : t.push(e.getIndex()),
                                    t.push(e.isHardened());
                                }),
                              (e[i.components] = t),
                              this.sourceFingerprint &&
                                (e[i.source_fingerprint] = this.sourceFingerprint.readUInt32BE(0)),
                              this.depth !== undefined && (e[i.depth] = this.depth),
                              new s.DataItem(e)
                            );
                          });
                      }
                    }
                    (n.CryptoKeypath = c),
                      (c.fromDataItem = e => {
                        const n = e.getData(),
                          s = [],
                          o = n[i.components];
                        if (o)
                          for (let e = 0; e < o.length; e += 2) {
                            const t = o[e + 1],
                              n = o[e];
                            'number' == typeof n
                              ? s.push(new r.PathComponent({ index: n, hardened: t }))
                              : s.push(new r.PathComponent({ hardened: t }));
                          }
                        const a = n[i.source_fingerprint];
                        let u;
                        a && ((u = t.alloc(4)), u.writeUInt32BE(a, 0));
                        const l = n[i.depth];
                        return new c(s, u, l);
                      }),
                      (c.fromCBOR = e => {
                        const t = (0, s.decodeToDataItem)(e);
                        return c.fromDataItem(t);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoKeypath.js',
      },
    ],
    [
      6890,
      { './initialized.container': 6892 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var s,
                  r = (s = e('./initialized.container')) && s.__esModule ? s : { default: s };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/higher-order-components/initialized/index.js' },
    ],
    [
      6891,
      { '../../constants/routes': 6878, 'prop-types': 5082, react: 5328, 'react-router-dom': 5313 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var s = a(e('react')),
                  r = a(e('prop-types')),
                  o = e('react-router-dom');
                function a(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = { pathname: e('../../constants/routes').ONBOARDING_ROUTE };
                function c(e) {
                  return e.completedOnboarding
                    ? s.default.createElement(o.Route, e)
                    : s.default.createElement(o.Redirect, { to: i });
                }
                c.propTypes = { completedOnboarding: r.default.bool };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/helpers/higher-order-components/initialized/initialized.component.js',
      },
    ],
    [
      6892,
      { './initialized.component': 6891, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = e('react-redux'),
                  o = (s = e('./initialized.component')) && s.__esModule ? s : { default: s };
                n.default = (0, r.connect)(e => {
                  const {
                    metamask: { completedOnboarding: t },
                  } = e;
                  return { completedOnboarding: t };
                })(o.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/helpers/higher-order-components/initialized/initialized.container.js',
      },
    ],
    [
      6893,
      { './with-modal-props': 6894 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var s,
                  r = (s = e('./with-modal-props')) && s.__esModule ? s : { default: s };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/higher-order-components/with-modal-props/index.js' },
    ],
    [
      6894,
      { '../../../store/actions': 7619, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function (e) {
                    return (0, s.connect)(o, a)(e);
                  });
                var s = e('react-redux'),
                  r = e('../../../store/actions');
                const o = e => {
                    const { appState: t } = e,
                      { props: n } = t.modal.modalState;
                    return { ...n };
                  },
                  a = e => ({ hideModal: () => e((0, r.hideModal)()) });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/helpers/higher-order-components/with-modal-props/with-modal-props.js',
      },
    ],
    [
      6895,
      { '../../../../shared/modules/fetch-with-timeout': 5862 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                var s;
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                const r = (0,
                  ((s = e('../../../../shared/modules/fetch-with-timeout')) && s.__esModule
                    ? s
                    : { default: s }
                  ).default)(),
                  o = {
                    async getNetworks() {
                      const e = new URL(
                        '/regions/networks',
                        'https://on-ramp-content.api.cx.metamask.io'
                      );
                      e.searchParams.set('context', 'extension');
                      const t = await r(e.toString()),
                        { networks: n } = await t.json();
                      return n;
                    },
                  };
                n.default = o;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/ramps/rampApi/rampAPI.ts' },
    ],
    [
      6896,
      {
        '../../../app/scripts/translate': 386,
        '../../../shared/constants/hardware-wallets': 5796,
        '../../../shared/constants/keyring': 5797,
        '../../../shared/constants/network': 5804,
        '../../../shared/lib/snaps/snaps': 5844,
        '../../components/component-library': 6402,
        '../constants/design-system': 6872,
        '@metamask/snaps-sdk/jsx': 2862,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getAccountLabels = function (e, t, n, r) {
                    if (!t) return [];
                    const o = [],
                      a = n.filter(e => e.type === i.KeyringType.hdKeyTree);
                    switch (e) {
                      case i.KeyringType.hdKeyTree:
                        if (a.length > 1) {
                          const e = a.findIndex(e => e.accounts.includes(t.address));
                          o.push({ label: d(e), icon: null });
                        }
                        break;
                      case i.KeyringType.imported:
                        o.push({ label: (0, u.t)('imported'), icon: null });
                        break;
                      case i.KeyringType.qr:
                        o.push({ label: c.HardwareKeyringNames.qr, icon: null });
                        break;
                      case i.KeyringType.trezor:
                        o.push({ label: c.HardwareKeyringNames.trezor, icon: null });
                        break;
                      case i.KeyringType.ledger:
                        o.push({ label: c.HardwareKeyringNames.ledger, icon: null });
                        break;
                      case i.KeyringType.oneKey:
                        o.push({ label: c.HardwareKeyringNames.oneKey, icon: null });
                        break;
                      case i.KeyringType.lattice:
                        o.push({ label: c.HardwareKeyringNames.lattice, icon: null });
                        break;
                      case i.KeyringType.snap: {
                        const { entropySource: e } = t.options;
                        if (e && a.length > 1) {
                          const t = a.findIndex(t => t.metadata.id === e);
                          o.push({ label: d(t), icon: null });
                        }
                        if ((0, l.isSnapPreinstalled)(t.metadata.snap.id)) break;
                        if (r) {
                          o.push({ label: `${r} (${(0, u.t)('beta')})`, icon: s.IconName.Snaps });
                          break;
                        }
                        o.push({
                          label: `${(0, u.t)('snaps')} (${(0, u.t)('beta')})`,
                          icon: s.IconName.Snaps,
                        });
                        break;
                      }
                    }
                    return o;
                  }),
                  (n.getAccountNameErrorMessage = function (e, t, n, s) {
                    const o = e.some(e => {
                        var t;
                        return (
                          (null === (t = e.metadata) ||
                          void 0 === t ||
                          null === (t = t.name) ||
                          void 0 === t
                            ? void 0
                            : t.toLowerCase()) === (null == n ? void 0 : n.toLowerCase())
                        );
                      }),
                      a = !n || '' === n,
                      i = t.t('newAccountNumberName').replace(' $1', ''),
                      c = new RegExp(`^\\s*${i} \\d+\\s*$`, 'iu').test(n || ''),
                      u =
                        (null == n ? void 0 : n.toLowerCase()) ===
                          (null == s ? void 0 : s.toLowerCase()) ||
                        (!o && !c && !a);
                    let l;
                    u
                      ? (l = r.InvisibleCharacter)
                      : o
                        ? (l = t.t('accountNameDuplicate'))
                        : c
                          ? (l = t.t('accountNameReserved'))
                          : a && (l = t.t('required'));
                    return { isValidAccountName: u, errorMessage: l };
                  }),
                  (n.getAvatarNetworkColor = function (e) {
                    switch (e) {
                      case o.GOERLI_DISPLAY_NAME:
                        return a.BackgroundColor.goerli;
                      case o.LINEA_GOERLI_DISPLAY_NAME:
                        return a.BackgroundColor.lineaGoerli;
                      case o.LINEA_SEPOLIA_DISPLAY_NAME:
                        return a.BackgroundColor.lineaSepolia;
                      case o.SEPOLIA_DISPLAY_NAME:
                        return a.BackgroundColor.sepolia;
                      default:
                        return undefined;
                    }
                  });
                var s = e('@metamask/snaps-sdk/jsx'),
                  r = e('../../components/component-library'),
                  o = e('../../../shared/constants/network'),
                  a = e('../constants/design-system'),
                  i = e('../../../shared/constants/keyring'),
                  c = e('../../../shared/constants/hardware-wallets'),
                  u = e('../../../app/scripts/translate'),
                  l = e('../../../shared/lib/snaps/snaps');
                const d = e => `SRP #${e + 1}`;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/accounts.js' },
    ],
    [
      6898,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.camelCaseToCapitalize = function (e = '') {
                    return e.replace(/([A-Z])/gu, ' $1').replace(/^./u, e => e.toUpperCase());
                  }),
                  (n.getCurrencySymbol = function (e) {
                    const t = {
                      EUR: '€',
                      HKD: '$',
                      JPY: '¥',
                      PHP: '₱',
                      RUB: '₽',
                      SGD: '$',
                      USD: '$',
                    };
                    if (t[e.toUpperCase()]) return t[e.toUpperCase()];
                    return e.toUpperCase();
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/common.util.js' },
    ],
    [
      690,
      {
        './CryptoECKey': 687,
        './CryptoHDKey': 688,
        './MultiKey': 693,
        './RegistryItem': 695,
        './RegistryType': 696,
        './ScriptExpression': 697,
        './lib': 706,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.CryptoOutput = void 0);
                const s = e('./CryptoECKey'),
                  r = e('./CryptoHDKey'),
                  o = e('./lib'),
                  a = e('./MultiKey'),
                  i = e('./RegistryItem'),
                  c = e('./RegistryType'),
                  u = e('./ScriptExpression');
                class l extends i.RegistryItem {
                  constructor(e, t) {
                    super(),
                      (this.scriptExpressions = e),
                      (this.cryptoKey = t),
                      (this.getRegistryType = () => c.RegistryTypes.CRYPTO_OUTPUT),
                      (this.getCryptoKey = () => this.cryptoKey),
                      (this.getHDKey = () =>
                        this.cryptoKey instanceof r.CryptoHDKey ? this.cryptoKey : undefined),
                      (this.getECKey = () =>
                        this.cryptoKey instanceof s.CryptoECKey ? this.cryptoKey : undefined),
                      (this.getMultiKey = () =>
                        this.cryptoKey instanceof a.MultiKey ? this.cryptoKey : undefined),
                      (this.getScriptExpressions = () => this.scriptExpressions),
                      (this._toOutputDescriptor = e =>
                        e >= this.scriptExpressions.length
                          ? this.cryptoKey.getOutputDescriptorContent()
                          : `${this.scriptExpressions[e].getExpression()}(${this._toOutputDescriptor(e + 1)})`),
                      (this.toString = () => this._toOutputDescriptor(0)),
                      (this.toDataItem = () => {
                        let e = this.cryptoKey.toDataItem();
                        (this.cryptoKey instanceof s.CryptoECKey ||
                          this.cryptoKey instanceof r.CryptoHDKey) &&
                          e.setTag(this.cryptoKey.getRegistryType().getTag());
                        return (
                          [...this.scriptExpressions].reverse().forEach(t => {
                            const n = t.getTag();
                            e.getTag() === undefined ? e.setTag(n) : (e = new o.DataItem(e, n));
                          }),
                          e
                        );
                      });
                  }
                }
                (n.CryptoOutput = l),
                  (l.fromDataItem = e => {
                    const t = [];
                    let n = e;
                    for (;;) {
                      let e = n.getTag();
                      const s = u.ScriptExpression.fromTag(e);
                      if (!s) break;
                      if ((t.push(s), !(n.getData() instanceof o.DataItem))) break;
                      (n = n.getData()), (e = n.getTag());
                    }
                    const i = t.length;
                    if (
                      i > 0 &&
                      (t[i - 1].getExpression() === u.ScriptExpressions.MULTISIG.getExpression() ||
                        t[i - 1].getExpression() ===
                          u.ScriptExpressions.SORTED_MULTISIG.getExpression())
                    ) {
                      const e = a.MultiKey.fromDataItem(n);
                      return new l(t, e);
                    }
                    if (n.getTag() === c.RegistryTypes.CRYPTO_HDKEY.getTag()) {
                      const e = r.CryptoHDKey.fromDataItem(n);
                      return new l(t, e);
                    }
                    {
                      const e = s.CryptoECKey.fromDataItem(n);
                      return new l(t, e);
                    }
                  }),
                  (l.fromCBOR = e => {
                    const t = (0, o.decodeToDataItem)(e);
                    return l.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoOutput.js',
      },
    ],
    [
      6900,
      { buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (e) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }),
                      (n.ExportableContentType = void 0),
                      (n.exportAsFile = async function (t, n, r) {
                        if (!s[r]) throw new Error(`Unsupported file type: ${r}`);
                        'undefined' != typeof window &&
                        void 0 !== window.showSaveFilePicker &&
                        void 0 !== window.Blob
                          ? await (async function (e, t, n) {
                              const r = new window.Blob([t], { contentType: n }),
                                o = s[n],
                                a = await window.showSaveFilePicker({
                                  suggestedName: e,
                                  types: [{ description: e, accept: { [n]: [o] } }],
                                }),
                                i = await a.createWritable();
                              await i.write(r), await i.close();
                            })(t, n, r)
                          : (function (t, n, s) {
                              const r = e.from(n, 'utf8').toString('base64'),
                                o = document.createElement('a');
                              (o.href = `data:${s};Base64,${r}`),
                                (o.download = t),
                                document.body.appendChild(o),
                                o.click(),
                                document.body.removeChild(o);
                            })(t, n, r);
                      });
                    const t = (n.ExportableContentType = {
                        JSON: 'application/json',
                        TXT: 'text/plain',
                      }),
                      s = { [t.JSON]: '.json', [t.TXT]: '.txt' };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/export-utils.js' },
    ],
    [
      6902,
      {
        '../../../shared/constants/gas': 5795,
        '../../../shared/modules/Numeric': 5853,
        '../../../shared/modules/conversion.utils': 5858,
        './util': 6921,
        'bignumber.js': 4030,
        lodash: 4921,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.addTenPercentAndRound = d),
                  (n.editGasModeIsSpeedUpOrCancel = function (e) {
                    return e === a.EditGasModes.cancel || e === a.EditGasModes.speedUp;
                  }),
                  (n.formatGasFeeOrFeeRange = function (e, { precision: t = 2 } = {}) {
                    if ((0, u.isNullish)(e) || (Array.isArray(e) && 0 === e.length)) return null;
                    const n = Array.isArray(e) ? e.slice(0, 2) : [e],
                      s = Array.isArray(t)
                        ? t.slice(0, 2)
                        : (0, r.times)(n.length, (0, r.constant)(t));
                    return `${(0, r.uniq)((0, r.zip)(n, s).map(([e, t]) => (t === undefined ? e : (0, u.roundToDecimalPlacesRemovingExtraZeroes)(e, t)))).join(' - ')} GWEI`;
                  }),
                  (n.gasEstimateGreaterThanGasUsedPlusTenPercent = void 0),
                  (n.isMetamaskSuggestedGasEstimate = function (e) {
                    return [
                      a.GasRecommendations.high,
                      a.GasRecommendations.medium,
                      a.GasRecommendations.low,
                    ].includes(e);
                  });
                var s,
                  r = e('lodash'),
                  o = (s = e('bignumber.js')) && s.__esModule ? s : { default: s },
                  a = e('../../../shared/constants/gas'),
                  i = e('../../../shared/modules/conversion.utils'),
                  c = e('../../../shared/modules/Numeric'),
                  u = e('./util');
                const l = new c.Numeric(1.1, 10);
                function d(e) {
                  return e === undefined
                    ? undefined
                    : new c.Numeric(e, 16).times(l).round(0).toPrefixedHexString();
                }
                n.gasEstimateGreaterThanGasUsedPlusTenPercent = (e, t, n) => {
                  var s;
                  let { maxFeePerGas: r } = e;
                  r = new o.default((0, i.hexWEIToDecGWEI)(d(r)));
                  const a =
                    null == t || null === (s = t[n]) || void 0 === s
                      ? void 0
                      : s.suggestedMaxFeePerGas;
                  return (0, u.bnGreaterThan)(a, r);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/gas.js' },
    ],
    [
      6906,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                n.default = () => window.matchMedia('screen and (max-width: 575px)').matches;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/is-mobile-view.js' },
    ],
    [
      6908,
      { '../../../shared/lib/manifestFlags': 5837, '../../../shared/lib/trace': 5849, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.mmLazy = function (e) {
                    return o.default.lazy(async () => {
                      const t = Date.now(),
                        n = await e(),
                        { componentName: s, component: r } = (function (e) {
                          let t;
                          if (!e.default) {
                            const n = Object.keys(e);
                            if (1 === n.length)
                              return (t = n[0]), { componentName: t, component: { default: e[t] } };
                            throw new Error(
                              'mmLazy: You cannot lazy-load a component when there are multiple exported components in one file'
                            );
                          }
                          t = e.default.WrappedComponent
                            ? e.default.WrappedComponent.name
                            : e.default.name || e.default.displayName;
                          return { componentName: t, component: e };
                        })(n);
                      return (
                        c &&
                          Math.random() < c &&
                          ((0, i.trace)({
                            name: i.TraceName.LazyLoadComponent,
                            data: { componentName: s },
                            startTime: t,
                          }),
                          (0, i.endTrace)({ name: i.TraceName.LazyLoadComponent })),
                        r
                      );
                    });
                  });
                var s,
                  r,
                  o = (s = e('react')) && s.__esModule ? s : { default: s },
                  a = e('../../../shared/lib/manifestFlags'),
                  i = e('../../../shared/lib/trace');
                const c =
                  null === (r = (0, a.getManifestFlags)().sentry) || void 0 === r
                    ? void 0
                    : r.lazyLoadSubSampleRate;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/mm-lazy.ts' },
    ],
    [
      6909,
      {
        '../../../../app/scripts/lib/multichain/address': 142,
        '../../../../shared/lib/multichain/networks': 5843,
        '@metamask/etherscan-link': 1938,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getMultichainBlockExplorerUrl = n.getMultichainAccountUrl = void 0);
                var s = e('@metamask/etherscan-link'),
                  r = e('@metamask/utils'),
                  o = e('../../../../app/scripts/lib/multichain/address'),
                  a = e('../../../../shared/lib/multichain/networks');
                n.getMultichainBlockExplorerUrl = e => {
                  var t;
                  return (
                    (null === (t = e.network) ||
                    void 0 === t ||
                    null === (t = t.rpcPrefs) ||
                    void 0 === t
                      ? void 0
                      : t.blockExplorerUrl) ?? ''
                  );
                };
                n.getMultichainAccountUrl = (e, t) => {
                  const { namespace: n } = (0, r.parseCaipChainId)(t.chainId);
                  var i;
                  if (n === r.KnownCaipNamespace.Eip155)
                    return (0, s.getAccountLink)(
                      (0, o.normalizeSafeAddress)(e),
                      t.network.chainId,
                      null === (i = t.network) || void 0 === i ? void 0 : i.rpcPrefs
                    );
                  const { blockExplorerFormatUrls: c } = t.network;
                  return c ? (0, a.formatBlockExplorerAddressUrl)(c, e) : '';
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/multichain/blockExplorer.ts' },
    ],
    [
      691,
      { './RegistryItem': 695, './RegistryType': 696, './lib': 706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.CryptoPSBT = void 0);
                const s = e('./lib'),
                  r = e('./RegistryItem'),
                  o = e('./RegistryType');
                class a extends r.RegistryItem {
                  constructor(e) {
                    super(),
                      (this.psbt = e),
                      (this.getRegistryType = () => o.RegistryTypes.CRYPTO_PSBT),
                      (this.getPSBT = () => this.psbt),
                      (this.toDataItem = () => new s.DataItem(this.psbt));
                  }
                }
                (n.CryptoPSBT = a),
                  (a.fromDataItem = e => {
                    const t = e.getData();
                    if (!t)
                      throw new Error(
                        `#[ur-registry][CryptoPSBT][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${e}`
                      );
                    return new a(t);
                  }),
                  (a.fromCBOR = e => {
                    const t = (0, s.decodeToDataItem)(e);
                    return a.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoPSBT.js',
      },
    ],
    [
      6910,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.nftTruncateAltText = n.getNftImageAlt = n.getNftImage = void 0);
                const s = (e, t) => {
                  if (e.length <= t) return e;
                  const n = e.substring(0, t),
                    s = n.lastIndexOf(' ');
                  return s > 0 ? `${n.substring(0, s)}...` : `${n}...`;
                };
                n.nftTruncateAltText = s;
                n.getNftImageAlt = ({ name: e, tokenId: t, description: n }) => {
                  if (!e && !t && !n) return '';
                  const r = n ?? `${e ?? ''} ${t ?? ''}`.trim();
                  return s(r, 100);
                };
                n.getNftImage = e =>
                  'string' == typeof e ? e : Array.isArray(e) ? e[0] : undefined;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/nfts.ts' },
    ],
    [
      6911,
      {
        '../../../shared/constants/network': 5804,
        '../../../shared/lib/transactions-controller-utils': 5851,
        '../../../shared/modules/conversion.utils': 5858,
        '../constants/metamask-notifications/metamask-notifications': 6875,
        '@ethersproject/providers': 565,
        'bignumber.js': 4030,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.formatAmount = n.createTextItems = void 0),
                  (n.formatIsoDateString = function (e) {
                    const t = new Date(e);
                    return new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: !0,
                    }).format(t);
                  }),
                  (n.formatMenuItemDate = function (e) {
                    const t = new Date();
                    if (u(t, e))
                      return new Intl.DateTimeFormat('en', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: !1,
                      }).format(e);
                    if (l(t, e))
                      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                        -1,
                        'day'
                      );
                    if (d(t, e))
                      return new Intl.DateTimeFormat('en', {
                        month: 'short',
                        day: 'numeric',
                      }).format(e);
                    return new Intl.DateTimeFormat('en', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(e);
                  }),
                  (n.getLeadingZeroCount = n.getAmount = void 0),
                  (n.getNetworkDetailsByChainId = function (e) {
                    const t = (o.NETWORK_TO_NAME_MAP[e] ?? '').split(' ')[0] ?? '',
                      n = o.CHAIN_ID_TO_CURRENCY_SYMBOL_MAP[e],
                      s = o.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e],
                      r =
                        e && ((i = a.SUPPORTED_NOTIFICATION_BLOCK_EXPLORERS), (c = e), c in i)
                          ? a.SUPPORTED_NOTIFICATION_BLOCK_EXPLORERS[e]
                          : undefined;
                    var i, c;
                    return {
                      nativeCurrencyName: t,
                      nativeCurrencySymbol: n,
                      nativeCurrencyLogo: s,
                      nativeCurrencyAddress: '0x0000000000000000000000000000000000000000',
                      blockExplorerConfig: r,
                    };
                  }),
                  (n.getRandomKey = n.getNetworkNameByChainId = n.getNetworkFees = void 0),
                  (n.getRpcUrlByChainId = f),
                  (n.getUsdAmount = void 0),
                  (n.hasNetworkFeeFields = g),
                  (n.isIpfsURL = void 0);
                var s = e('bignumber.js'),
                  r = e('@ethersproject/providers'),
                  o = e('../../../shared/constants/network'),
                  a = e('../constants/metamask-notifications/metamask-notifications'),
                  i = e('../../../shared/lib/transactions-controller-utils'),
                  c = e('../../../shared/modules/conversion.utils');
                const u = (e, t) =>
                    e.getFullYear() === t.getFullYear() &&
                    e.getMonth() === t.getMonth() &&
                    e.getDate() === t.getDate(),
                  l = (e, t) => {
                    const n = new Date(e);
                    return n.setDate(e.getDate() - 1), u(n, t);
                  },
                  d = (e, t) => e.getFullYear() === t.getFullYear();
                const p = { decimalPlaces: 4 },
                  m = e => {
                    var t;
                    return (
                      (null ===
                        (t = (new s.BigNumber(e, 10).toString(10).split('.')[1] ?? '').match(
                          /^0*/u
                        )) ||
                      void 0 === t ||
                      null === (t = t[0]) ||
                      void 0 === t
                        ? void 0
                        : t.length) || 0
                    );
                  };
                n.getLeadingZeroCount = m;
                const h = (e, t) => {
                  const n = { ...p, ...t },
                    s = m(e),
                    r = e.toString().includes('.') || s > 0 || e.toString().includes('e-');
                  if (e > 999)
                    return Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 2,
                    }).format(e);
                  if (r) {
                    const t =
                        ((o = n.decimalPlaces),
                        Boolean(null == n ? void 0 : n.shouldEllipse) && s >= o),
                      r = Intl.NumberFormat('en-US', {
                        minimumFractionDigits: t ? n.decimalPlaces : undefined,
                        maximumFractionDigits: n.decimalPlaces,
                      }).format(e);
                    return t ? `${r}...` : r;
                  }
                  var o;
                  return e.toString();
                };
                n.formatAmount = h;
                n.getRandomKey = (e, t) =>
                  `${e.replace(/\s+/gu, '_').replace(/[^\w-]/gu, '')}-${t}-${Math.random().toString(36).substring(2, 15)}`;
                n.createTextItems = (e, t) => ({
                  items: e.map((e, t) => ({ text: e, highlighted: t % 2 == 1 })),
                  variant: t,
                });
                n.getAmount = (e, t, n) => {
                  if (!e || !t) return '';
                  const s = (0, i.calcTokenAmount)(e, parseFloat(t)).toNumber();
                  return h(s, n);
                };
                n.getUsdAmount = (e, t, n) => {
                  if (!e || !t || !n) return '';
                  const s = (0, i.calcTokenAmount)(e, parseFloat(t)).toNumber(),
                    r = parseFloat(`${s}`) * parseFloat(n);
                  return h(r);
                };
                function f(e) {
                  const t = o.FEATURED_RPCS.find(t => t.chainId === e);
                  if (t) return t.rpcEndpoints[0].url;
                  switch (e) {
                    case o.CHAIN_IDS.MAINNET:
                      return o.MAINNET_RPC_URL;
                    case o.CHAIN_IDS.GOERLI:
                      return o.GOERLI_RPC_URL;
                    case o.CHAIN_IDS.SEPOLIA:
                      return o.SEPOLIA_RPC_URL;
                    case o.CHAIN_IDS.LINEA_GOERLI:
                      return o.LINEA_GOERLI_RPC_URL;
                    case o.CHAIN_IDS.LINEA_SEPOLIA:
                      return o.LINEA_SEPOLIA_RPC_URL;
                    case o.CHAIN_IDS.LINEA_MAINNET:
                      return o.LINEA_MAINNET_RPC_URL;
                    case o.CHAIN_IDS.LOCALHOST:
                      return o.LOCALHOST_RPC_URL;
                    default:
                      return o.MAINNET_RPC_URL;
                  }
                }
                function g(e) {
                  return 'network_fee' in e.data;
                }
                n.getNetworkNameByChainId = e => o.NETWORK_TO_NAME_MAP[e];
                n.getNetworkFees = async e => {
                  if (!g(e)) throw new Error('Invalid notification type');
                  const t = (0, c.decimalToHex)(e.chain_id),
                    n = { url: f(`0x${t}`), headers: { 'Infura-Source': 'metamask/metamask' } },
                    s = new r.JsonRpcProvider(n);
                  if (!s) throw new Error(`No provider found for chainId ${t}`);
                  try {
                    const [t, n, r] = await Promise.all([
                        s.getTransactionReceipt(e.tx_hash),
                        s.getTransaction(e.tx_hash),
                        s.getBlock(e.block_number),
                      ]),
                      o = (t, n) =>
                        h(
                          parseFloat(t) * parseFloat(e.data.network_fee.native_token_price_in_usd),
                          { decimalPlaces: n || 4 }
                        ),
                      a = (0, c.hexWEIToDecETH)(t.gasUsed.mul(t.effectiveGasPrice)._hex),
                      i = o(a),
                      u = n.gasLimit.toNumber(),
                      l = t.gasUsed.toNumber(),
                      d = r.baseFeePerGas ? (0, c.hexWEIToDecGWEI)(r.baseFeePerGas._hex) : null,
                      p = r.baseFeePerGas
                        ? (0, c.hexWEIToDecGWEI)(t.effectiveGasPrice.sub(r.baseFeePerGas)._hex)
                        : null;
                    return {
                      transactionFeeInEth: a,
                      transactionFeeInUsd: i,
                      gasLimit: u,
                      gasUsed: l,
                      baseFee: d,
                      priorityFee: p,
                      maxFeePerGas: n.maxFeePerGas
                        ? (0, c.hexWEIToDecGWEI)(n.maxFeePerGas._hex)
                        : null,
                    };
                  } catch (e) {
                    throw new Error(`Error fetching network fees for chainId ${t}: ${e}`);
                  }
                };
                n.isIpfsURL = e => e.startsWith('ipfs://');
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/notification.util.ts' },
    ],
    [
      6912,
      {
        '../../../app/scripts/controllers/permissions': 86,
        '../../../shared/constants/permissions': 5808,
        '../../components/component-library': 6402,
        '../constants/design-system': 6872,
        './util': 6921,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/controller-utils': 1515,
        '@metamask/snaps-rpc-methods': 2733,
        '@metamask/snaps-utils': 2890,
        'deep-freeze-strict': 4294,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getPermissionDescription = void 0),
                  (n.getWeightedPermissions = function ({
                    t: e,
                    isRequestApprovalPermittedChains: t,
                    permissions: n,
                    getSubjectName: s,
                    subjectName: r,
                  }) {
                    return Object.entries(n)
                      .reduce(
                        (n, [o, a]) =>
                          n.concat(
                            v({
                              t: e,
                              isRequestApprovalPermittedChains: t,
                              permissionName: o,
                              permissionValue: a,
                              subjectName: r,
                              getSubjectName: s,
                            })
                          ),
                        []
                      )
                      .sort((e, t) => e.weight - t.weight);
                  });
                var s = h(e('deep-freeze-strict')),
                  r = h(e('react')),
                  o = e('@metamask/snaps-rpc-methods'),
                  a = e('@metamask/snaps-utils'),
                  i = e('@metamask/controller-utils'),
                  c = e('@metamask/chain-agnostic-permission'),
                  u = e('../../../shared/constants/permissions'),
                  l = e('../../components/component-library'),
                  d = e('../constants/design-system'),
                  p = e('../../../app/scripts/controllers/permissions'),
                  m = e('./util');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const f = Symbol('unknown'),
                  g = r.default.createElement(l.Icon, {
                    name: l.IconName.Info,
                    size: l.IconSize.Sm,
                    color: d.IconColor.iconMuted,
                  });
                function y(e) {
                  return r.default.createElement(
                    l.Text,
                    {
                      fontWeight: d.FontWeight.Medium,
                      variant: d.TextVariant.inherit,
                      color: d.TextColor.inherit,
                    },
                    e
                  );
                }
                const k = (0, s.default)({
                    [c.Caip25EndowmentPermissionName]: ({
                      t: e,
                      isRequestApprovalPermittedChains: t,
                    }) =>
                      t
                        ? {
                            label: e('permission_walletSwitchEthereumChain'),
                            leftIcon: l.IconName.Wifi,
                            weight: u.PermissionWeight.permittedChains,
                          }
                        : {
                            label: e('permission_ethereumAccounts'),
                            leftIcon: l.IconName.Eye,
                            weight: u.PermissionWeight.eth_accounts,
                          },
                    [u.RestrictedMethods.eth_accounts]: ({ t: e }) => ({
                      label: e('permission_ethereumAccounts'),
                      leftIcon: l.IconName.Eye,
                      weight: u.PermissionWeight.eth_accounts,
                    }),
                    [p.PermissionNames.permittedChains]: ({ t: e }) => ({
                      label: e('permission_walletSwitchEthereumChain'),
                      leftIcon: l.IconName.Wifi,
                      weight: u.PermissionWeight.permittedChains,
                    }),
                    [u.RestrictedMethods.snap_dialog]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_dialog'),
                      description: e('permission_dialogDescription', [y(t)]),
                      leftIcon: l.IconName.Messages,
                      weight: u.PermissionWeight.snap_dialog,
                    }),
                    [u.RestrictedMethods.snap_notify]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_notifications'),
                      description: e('permission_notificationsDescription', [y(t)]),
                      leftIcon: l.IconName.Notification,
                      weight: u.PermissionWeight.snap_notify,
                    }),
                    [u.RestrictedMethods.snap_getBip32PublicKey]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) =>
                      t.caveats[0].value.map(({ path: t, curve: s }, o) => {
                        var i;
                        const c = {
                            leftIcon: l.IconName.SecuritySearch,
                            weight: u.PermissionWeight.snap_getBip32PublicKey,
                            id: `public-key-access-bip32-${null === (i = t.join('-')) || void 0 === i ? void 0 : i.replace(/'/gu, 'h')}-${s}-${o}`,
                            warningMessageSubject:
                              (0, a.getSnapDerivationPathName)(t, s) ??
                              `${e('unknownNetworkForKeyEntropy')}  ${t.join('/')} (${s})`,
                          },
                          p = (0, a.getSnapDerivationPathName)(t, s);
                        return p
                          ? {
                              ...c,
                              label: e('permission_viewNamedBip32PublicKeys', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: t.join('/'),
                                  },
                                  p
                                ),
                              ]),
                              description: e('permission_viewBip32PublicKeysDescription', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: `description-${t.join('/')}`,
                                  },
                                  p
                                ),
                                y(n),
                              ]),
                            }
                          : {
                              ...c,
                              label: e('permission_viewBip32PublicKeys', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: t.join('/'),
                                  },
                                  `${e('unknownNetworkForKeyEntropy')} `,
                                  ' ',
                                  t.join('/')
                                ),
                                s,
                              ]),
                              description: e('permission_viewBip32PublicKeysDescription', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: `description-${t.join('/')}`,
                                  },
                                  t.join('/')
                                ),
                                y(n),
                              ]),
                            };
                      }),
                    [u.RestrictedMethods.snap_getBip32Entropy]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) =>
                      t.caveats[0].value.map(({ path: t, curve: s }, o) => {
                        var i;
                        const c = {
                            leftIcon: l.IconName.Key,
                            weight: u.PermissionWeight.snap_getBip32Entropy,
                            id: `key-access-bip32-${null === (i = t.join('-')) || void 0 === i ? void 0 : i.replace(/'/gu, 'h')}-${s}-${o}`,
                            warningMessageSubject:
                              (0, a.getSnapDerivationPathName)(t, s) ??
                              `${e('unknownNetworkForKeyEntropy')} ${t.join('/')} (${s})`,
                          },
                          p = (0, a.getSnapDerivationPathName)(t, s);
                        return p
                          ? {
                              ...c,
                              label: e('permission_manageBip32Keys', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: t.join('/'),
                                  },
                                  p
                                ),
                              ]),
                              description: e('permission_manageBip44AndBip32KeysDescription', [
                                y(n),
                              ]),
                            }
                          : {
                              ...c,
                              label: e('permission_manageBip32Keys', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: t.join('/'),
                                  },
                                  `${e('unknownNetworkForKeyEntropy')} ${t.join('/')} (${s})`
                                ),
                              ]),
                              description: e('permission_manageBip44AndBip32KeysDescription', [
                                y(n),
                              ]),
                            };
                      }),
                    [u.RestrictedMethods.snap_getBip44Entropy]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) =>
                      t.caveats[0].value.map(({ coinType: t }, s) => ({
                        label: e('permission_manageBip44Keys', [
                          r.default.createElement(
                            l.Text,
                            {
                              color: d.TextColor.inherit,
                              variant: d.TextVariant.inherit,
                              fontWeight: d.FontWeight.Medium,
                              key: `coin-type-${t}`,
                            },
                            (0, a.getSlip44ProtocolName)(t) ??
                              `${e('unknownNetworkForKeyEntropy')} m/44'/${t}'`
                          ),
                        ]),
                        description: e('permission_manageBip44AndBip32KeysDescription', [y(n)]),
                        leftIcon: l.IconName.Key,
                        weight: u.PermissionWeight.snap_getBip44Entropy,
                        id: `key-access-bip44-${t}-${s}`,
                        warningMessageSubject:
                          (0, a.getSlip44ProtocolName)(t) ??
                          `${e('unknownNetworkForKeyEntropy')} m/44'/${t}'`,
                      })),
                    [u.RestrictedMethods.snap_getEntropy]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_getEntropy', [y(t)]),
                      description: e('permission_getEntropyDescription', [y(t)]),
                      leftIcon: l.IconName.SecurityKey,
                      weight: u.PermissionWeight.snap_getEntropy,
                    }),
                    [u.RestrictedMethods.snap_manageState]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_manageState'),
                      description: e('permission_manageStateDescription', [y(t)]),
                      leftIcon: l.IconName.AddSquare,
                      weight: u.PermissionWeight.snap_manageState,
                    }),
                    [u.RestrictedMethods.snap_getLocale]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_getLocale'),
                      description: e('permission_getLocaleDescription', [y(t)]),
                      leftIcon: l.IconName.Global,
                      weight: u.PermissionWeight.snap_getLocale,
                    }),
                    [u.RestrictedMethods.snap_getPreferences]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_getPreferences'),
                      description: e('permission_getPreferencesDescription', [y(t)]),
                      leftIcon: l.IconName.Customize,
                      weight: 4,
                    }),
                    [u.RestrictedMethods.wallet_snap]: ({
                      t: e,
                      permissionValue: t,
                      getSubjectName: n,
                    }) => {
                      const s = t.caveats[0].value,
                        o = {
                          leftIcon: l.IconName.Flash,
                          rightIcon: g,
                          weight: u.PermissionWeight.wallet_snap,
                        };
                      return Object.keys(s).map(t => {
                        const s = n(t);
                        return s
                          ? {
                              ...o,
                              label: e('permission_accessNamedSnap', [
                                r.default.createElement(
                                  l.Text,
                                  {
                                    color: d.TextColor.inherit,
                                    variant: d.TextVariant.inherit,
                                    fontWeight: d.FontWeight.Medium,
                                    key: t,
                                  },
                                  s
                                ),
                              ]),
                              description: e('permission_accessSnapDescription', [s]),
                            }
                          : {
                              ...o,
                              label: e('permission_accessSnap', [t]),
                              description: e('permission_accessSnapDescription', [t]),
                            };
                      });
                    },
                    [u.EndowmentPermissions['endowment:network-access']]: ({
                      t: e,
                      subjectName: t,
                    }) => ({
                      label: e('permission_accessNetwork'),
                      description: e('permission_accessNetworkDescription', [y(t)]),
                      leftIcon: l.IconName.Wifi,
                      weight: u.PermissionWeight.endowment_networkAccess,
                    }),
                    [u.EndowmentPermissions['endowment:webassembly']]: ({
                      t: e,
                      subjectName: t,
                    }) => ({
                      label: e('permission_webAssembly'),
                      description: e('permission_webAssemblyDescription', [y(t)]),
                      leftIcon: l.IconName.DocumentCode,
                      rightIcon: null,
                      weight: u.PermissionWeight.endowment_webassembly,
                    }),
                    [u.EndowmentPermissions['endowment:transaction-insight']]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) => {
                      const s = {
                          leftIcon: l.IconName.Speedometer,
                          weight: u.PermissionWeight.endowment_transactionInsight,
                        },
                        r = [
                          {
                            ...s,
                            label: e('permission_transactionInsight'),
                            description: e('permission_transactionInsightDescription', [y(n)]),
                          },
                        ];
                      return (
                        (0, i.isNonEmptyArray)(t.caveats) &&
                          t.caveats[0].type === a.SnapCaveatType.TransactionOrigin &&
                          t.caveats[0].value &&
                          r.push({
                            ...s,
                            label: e('permission_transactionInsightOrigin'),
                            description: e('permission_transactionInsightOriginDescription', [
                              y(n),
                            ]),
                            leftIcon: l.IconName.Explore,
                          }),
                        r
                      );
                    },
                    [u.EndowmentPermissions['endowment:cronjob']]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_cronjob'),
                      description: e('permission_cronjobDescription', [y(t)]),
                      leftIcon: l.IconName.Clock,
                      weight: u.PermissionWeight.endowment_cronjob,
                    }),
                    [u.EndowmentPermissions['endowment:ethereum-provider']]: ({
                      t: e,
                      subjectName: t,
                    }) => ({
                      label: e('permission_ethereumProvider'),
                      description: e('permission_ethereumProviderDescription', [y(t)]),
                      leftIcon: l.IconName.Ethereum,
                      weight: u.PermissionWeight.endowment_ethereumProvider,
                      id: 'ethereum-provider-access',
                      message: e('ethereumProviderAccess', [y(t)]),
                    }),
                    [u.EndowmentPermissions['endowment:rpc']]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) => {
                      const s = {
                          leftIcon: l.IconName.Hierarchy,
                          weight: u.PermissionWeight.endowment_rpc,
                        },
                        { snaps: a, dapps: i, allowedOrigins: c } = (0, o.getRpcCaveatOrigins)(t),
                        p = [];
                      if (
                        (a &&
                          p.push({
                            ...s,
                            label: e('permission_rpc', [e('otherSnaps'), y(n)]),
                            description: e('permission_rpcDescription', [e('otherSnaps'), y(n)]),
                          }),
                        i &&
                          p.push({
                            ...s,
                            label: e('permission_rpc', [e('websites'), y(n)]),
                            description: e('permission_rpcDescription', [e('websites'), y(n)]),
                          }),
                        (null == c ? void 0 : c.length) > 0)
                      ) {
                        let t;
                        if (1 === c.length)
                          t = r.default.createElement(
                            l.Text,
                            {
                              color: d.TextColor.inherit,
                              variant: d.TextVariant.inherit,
                              fontWeight: d.FontWeight.Medium,
                              style: { lineBreak: 'anywhere' },
                            },
                            c[0]
                          );
                        else {
                          const n = c.slice(-1);
                          t = e('permission_rpcDescriptionOriginList', [
                            c
                              .slice(0, -1)
                              .map(e =>
                                r.default.createElement(
                                  r.default.Fragment,
                                  null,
                                  r.default.createElement(
                                    l.Text,
                                    {
                                      color: d.TextColor.inherit,
                                      variant: d.TextVariant.inherit,
                                      fontWeight: d.FontWeight.Medium,
                                      style: { lineBreak: 'anywhere' },
                                    },
                                    e
                                  ),
                                  ', '
                                )
                              ),
                            r.default.createElement(
                              l.Text,
                              {
                                color: d.TextColor.inherit,
                                variant: d.TextVariant.inherit,
                                fontWeight: d.FontWeight.Medium,
                                key: '2',
                                style: { lineBreak: 'anywhere' },
                              },
                              n
                            ),
                          ]);
                        }
                        p.push({
                          ...s,
                          label: e('permission_rpc', [t, y(n)]),
                          description: e('permission_rpcDescription', [t, y(n)]),
                        });
                      }
                      return p;
                    },
                    [u.EndowmentPermissions['endowment:lifecycle-hooks']]: ({
                      t: e,
                      subjectName: t,
                    }) => ({
                      label: e('permission_lifecycleHooks'),
                      description: e('permission_lifecycleHooksDescription', [y(t)]),
                      leftIcon: l.IconName.Hierarchy,
                      weight: u.PermissionWeight.endowment_lifecycleHooks,
                    }),
                    [u.EndowmentPermissions['endowment:page-home']]: ({
                      t: e,
                      subjectName: t,
                    }) => ({
                      label: e('permission_homePage'),
                      description: e('permission_homePageDescription', [y(t)]),
                      leftIcon: l.IconName.Home,
                      weight: u.PermissionWeight.endowment_pageHome,
                    }),
                    [u.RestrictedMethods.snap_manageAccounts]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_manageAccounts'),
                      description: e('permission_manageAccountsDescription', [y(t)]),
                      leftIcon: l.IconName.UserCircleAdd,
                      rightIcon: null,
                      weight: u.PermissionWeight.snap_manageAccounts,
                    }),
                    [u.EndowmentPermissions['endowment:keyring']]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_keyring'),
                      description: e('permission_keyringDescription', [y(t)]),
                      leftIcon: l.IconName.UserCircleAdd,
                      rightIcon: null,
                      weight: u.PermissionWeight.endowment_keyring,
                    }),
                    [u.EndowmentPermissions['endowment:name-lookup']]: ({ t: e }) => ({
                      label: e('permission_nameLookup'),
                      description: e('permission_nameLookupDescription'),
                      leftIcon: l.IconName.Search,
                      weight: u.PermissionWeight.endowment_nameLookup,
                    }),
                    [u.EndowmentPermissions['endowment:assets']]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_assets'),
                      description: e('permission_assetsDescription', [y(t)]),
                      leftIcon: l.IconName.Coin,
                      weight: u.PermissionWeight.endowment_assets,
                    }),
                    [u.EndowmentPermissions['endowment:protocol']]: ({ t: e, subjectName: t }) => ({
                      label: e('permission_protocol'),
                      description: e('permission_protocolDescription', [y(t)]),
                      leftIcon: l.IconName.GlobalSearch,
                      weight: u.PermissionWeight.endowment_protocol,
                    }),
                    [u.EndowmentPermissions['endowment:signature-insight']]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) => {
                      const s = {
                          leftIcon: l.IconName.Warning,
                          weight: u.PermissionWeight.endowment_signatureInsight,
                        },
                        r = [
                          {
                            ...s,
                            label: e('permission_signatureInsight'),
                            description: e('permission_signatureInsightDescription', [y(n)]),
                          },
                        ];
                      return (
                        (0, i.isNonEmptyArray)(t.caveats) &&
                          t.caveats.find(
                            e => e.type === a.SnapCaveatType.SignatureOrigin && e.value
                          ) &&
                          r.push({
                            ...s,
                            label: e('permission_signatureInsightOrigin'),
                            description: e('permission_signatureInsightOriginDescription', [y(n)]),
                            leftIcon: l.IconName.Explore,
                          }),
                        r
                      );
                    },
                    [u.ConnectionPermission.connection_permission]: ({
                      t: e,
                      permissionValue: t,
                      subjectName: n,
                    }) =>
                      Object.keys(t).map(t => {
                        let s = (0, m.getURLHost)(t);
                        return (
                          s || (s = t.replace('npm:', '')),
                          {
                            label: e('snapConnectTo', [
                              r.default.createElement(
                                l.Text,
                                {
                                  key: 'connectToMain',
                                  fontWeight: d.FontWeight.Medium,
                                  variant: d.TextVariant.inherit,
                                  color: d.TextColor.inherit,
                                  style: { lineBreak: 'anywhere' },
                                },
                                s
                              ),
                            ]),
                            description: e('snapConnectionPermissionDescription', [
                              y(n),
                              r.default.createElement(
                                l.Text,
                                {
                                  key: 'connectToDescription',
                                  fontWeight: d.FontWeight.Medium,
                                  variant: d.TextVariant.inherit,
                                  color: d.TextColor.inherit,
                                },
                                s
                              ),
                            ]),
                            leftIcon: undefined,
                            connection: t,
                            connectionName: s,
                            subjectName: n,
                            weight: u.PermissionWeight.connection_permission,
                          }
                        );
                      }),
                    [f]: ({ t: e, permissionName: t }) => ({
                      label: e('permission_unknown', [t ?? 'undefined']),
                      leftIcon: l.IconName.Question,
                      rightIcon: null,
                      weight: u.PermissionWeight.unknown_permission,
                    }),
                  }),
                  v = ({
                    t: e,
                    isRequestApprovalPermittedChains: t,
                    permissionName: n,
                    permissionValue: s,
                    subjectName: r,
                    getSubjectName: o,
                  }) => {
                    let a = k[f];
                    Object.hasOwnProperty.call(k, n) && (a = k[n]);
                    const i = a({
                      t: e,
                      isRequestApprovalPermittedChains: t,
                      permissionName: n,
                      permissionValue: s,
                      subjectName: r,
                      getSubjectName: o,
                    });
                    return Array.isArray(i)
                      ? i.map(e => ({ ...e, permissionName: n, permissionValue: s }))
                      : [{ ...i, permissionName: n, permissionValue: s }];
                  };
                n.getPermissionDescription = v;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/permission.js' },
    ],
    [
      6913,
      { '../../../shared/constants/permissions': 5808, '@metamask/keyring-api': 2014 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.containsEthPermissionsAndNonEvmAccount = void 0);
                var s = e('@metamask/keyring-api'),
                  r = e('../../../shared/constants/permissions');
                n.containsEthPermissionsAndNonEvmAccount = (e, t) => {
                  const n = Object.keys(r.RestrictedEthMethods),
                    o = Object.keys(t).some(e => n.includes(e)),
                    a = e.some(e => !(0, s.isEvmAccountType)(e.type));
                  return o && a;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/permissions.ts' },
    ],
    [
      6914,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getPortfolioUrl = function (e = '', t = '', n = '', s = !1, r = !1, o, a) {
                    const i = new URL(e, 'https://portfolio.metamask.io');
                    i.searchParams.append('metamaskEntry', t),
                      i.searchParams.append('metametricsId', n),
                      i.searchParams.append('metricsEnabled', String(s)),
                      i.searchParams.append('marketingEnabled', String(r)),
                      o && i.searchParams.append('accountAddress', o);
                    a && i.searchParams.append('tab', a);
                    return i.href;
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/portfolio.js' },
    ],
    [
      6915,
      { '../constants/settings': 6879, _process: 5077 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }),
                      (n.colorText = c),
                      (n.escapeRegExp = void 0),
                      (n.getNumberOfSettingRoutesInTab = function (e, t) {
                        return i(e, t).length;
                      }),
                      (n.getSettingsRoutes = a),
                      (n.getSpecificSettingsRoute = function (e, t, n) {
                        return a().find(s => s.tabMessage(e) === t && s.sectionMessage(e) === n);
                      }),
                      (n.handleSettingsRefs = function (e, t, n) {
                        const s = i(e, t),
                          r = s.findIndex(
                            e => e.route.substring(1) === window.location.hash.substring(1)
                          );
                        if (-1 === r) return;
                        const o = 1 === s.length ? n : n[r];
                        if (null != o && o.current) {
                          o.current.scrollIntoView({ behavior: 'smooth' }), o.current.focus();
                          const e = window.location.hash.split('#')[1];
                          window.location.hash = e;
                        }
                      }),
                      (n.highlightSearchedText = function () {
                        const e = document.getElementById('search-settings'),
                          t = new RegExp(u(e.value), 'gi');
                        [
                          ...document.querySelectorAll(
                            '.settings-page__header__search__list__item'
                          ),
                        ].forEach(e => {
                          const n = e.querySelector(
                              '.settings-page__header__search__list__item__tab'
                            ),
                            s = e.querySelector(
                              '.settings-page__header__search__list__item__section'
                            );
                          c(n, t), c(s, t);
                        });
                      });
                    var s,
                      r = (s = e('../constants/settings')) && s.__esModule ? s : { default: s };
                    let o;
                    function a() {
                      return (
                        o ||
                        ((o = r.default.filter(
                          e => (!e.featureFlag || t.env[e.featureFlag]) && !e.hidden
                        )),
                        o)
                      );
                    }
                    function i(e, t) {
                      return a().filter(n => n.tabMessage(e) === t);
                    }
                    function c(e, t) {
                      if (null !== e) {
                        let n = e.innerHTML;
                        (n = n.replace('&amp;', '&')),
                          (n = n.replace(
                            /(<span class="settings-page__header__search__list__item__highlight">|<\/span>)/gim,
                            ''
                          )),
                          (e.innerHTML = n.replace(
                            t,
                            '<span class="settings-page__header__search__list__item__highlight">$&</span>'
                          ));
                      }
                    }
                    const u = e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    n.escapeRegExp = u;
                  }).call(this);
                }).call(this, e('_process'));
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/settings-search.js' },
    ],
    [
      6917,
      {
        '../../../app/scripts/lib/util': 204,
        '../../ducks/metamask/metamask': 6860,
        '../../selectors': 7601,
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../../selectors/nft': 7607,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getStartupTraceTags = function (e) {
                    var t;
                    const n = (0, s.getEnvironmentType)(),
                      c = (0, r.getIsUnlocked)(e),
                      u = (0, o.getInternalAccounts)(e).length,
                      l = (0, i.selectAllNftsFlat)(e).length,
                      d = (0, a.getMetamaskNotifications)(e).length,
                      p = (0, o.selectAllTokensFlat)(e).length,
                      m = (0, o.getTransactions)(e).length,
                      h = (0, o.getPendingApprovals)(e),
                      f = null == h || null === (t = h[0]) || void 0 === t ? void 0 : t.type;
                    return {
                      'wallet.account_count': u,
                      'wallet.nft_count': l,
                      'wallet.notification_count': d,
                      'wallet.pending_approval': f,
                      'wallet.token_count': p,
                      'wallet.transaction_count': m,
                      'wallet.unlocked': c,
                      'wallet.ui_type': n,
                    };
                  });
                var s = e('../../../app/scripts/lib/util'),
                  r = e('../../ducks/metamask/metamask'),
                  o = e('../../selectors'),
                  a = e('../../selectors/metamask-notifications/metamask-notifications'),
                  i = e('../../selectors/nft');
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/tags.ts' },
    ],
    [
      692,
      { '..': 703, '../RegistryType': 696, '../errors': 698, '@ngraveio/bc-ur': 3014 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.URRegistryDecoder = void 0);
                const s = e('@ngraveio/bc-ur'),
                  r = e('..'),
                  o = e('../RegistryType'),
                  a = e('../errors');
                class i extends s.URDecoder {
                  constructor() {
                    super(...arguments),
                      (this.resultRegistryType = () => {
                        const e = this.resultUR();
                        switch (e.type) {
                          case o.RegistryTypes.BYTES.getType():
                            return r.Bytes.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_HDKEY.getType():
                            return r.CryptoHDKey.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_KEYPATH.getType():
                            return r.CryptoKeypath.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_COIN_INFO.getType():
                            return r.CryptoCoinInfo.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_ECKEY.getType():
                            return r.CryptoECKey.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_OUTPUT.getType():
                            return r.CryptoOutput.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_PSBT.getType():
                            return r.CryptoPSBT.fromCBOR(e.cbor);
                          case o.RegistryTypes.CRYPTO_ACCOUNT.getType():
                            return r.CryptoAccount.fromCBOR(e.cbor);
                          default:
                            throw new a.UnknownURTypeError(
                              `#[ur-registry][Decoder][fn.resultRegistryType]: registry type ${e.type} is not supported now`
                            );
                        }
                      });
                  }
                }
                n.URRegistryDecoder = i;
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/Decoder/index.js',
      },
    ],
    [
      6922,
      { '../../../app/scripts/lib/util': 204, '../../../shared/constants/app': 5789 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('../../../shared/constants/app'),
                  r = e('../../../app/scripts/lib/util');
                n.default = class {
                  static async checkStatus() {
                    const e = (0, r.getEnvironmentType)() === s.ENVIRONMENT_TYPE_POPUP,
                      t = (0, r.getPlatform)() === (s.PLATFORM_FIREFOX || s.PLATFORM_BRAVE),
                      n = (await window.navigator.mediaDevices.enumerateDevices()).filter(
                        e => 'videoinput' === e.kind
                      ),
                      o = n.length > 0,
                      a = n.some(e => e.label && e.label.length > 0);
                    if (o) {
                      let n = !0;
                      return (
                        ((t && e) || (e && !a)) && (n = !1), { permissions: a, environmentReady: n }
                      );
                    }
                    const i = new Error('No webcam found');
                    throw ((i.type = 'NO_WEBCAM_FOUND'), i);
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/webcam-utils.js' },
    ],
    [
      6923,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.openWindow = void 0);
                n.openWindow = (e, t) => {
                  window.open(e, t || '_blank', 'noopener');
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/utils/window.ts' },
    ],
    [
      6924,
      {
        '../../../shared/constants/multichain/networks': 5803,
        '../../selectors': 7601,
        './useMultichainWalletSnapClient': 6925,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAccountCreationOnNetworkChange = void 0);
                var s = e('react-redux'),
                  r = e('../../../shared/constants/multichain/networks'),
                  o = e('../../selectors'),
                  a = e('./useMultichainWalletSnapClient');
                n.useAccountCreationOnNetworkChange = () => {
                  const e = (0, a.useMultichainWalletSnapClient)(a.WalletClientType.Bitcoin),
                    t = (0, a.useMultichainWalletSnapClient)(a.WalletClientType.Solana),
                    n = (0, s.useSelector)(o.getMetaMaskAccountsOrdered);
                  return {
                    createAccount: async n => {
                      switch (n) {
                        case r.MultichainNetworks.BITCOIN:
                          await e.createAccount({ scope: r.MultichainNetworks.BITCOIN });
                          break;
                        case r.MultichainNetworks.SOLANA:
                          await t.createAccount({ scope: r.MultichainNetworks.SOLANA });
                          break;
                        default:
                          throw new Error(`Unsupported chainId: ${n}`);
                      }
                    },
                    hasAnyAccountsInNetwork: e => n.some(({ scopes: t }) => t.includes(e)),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/accounts/useAccountCreationOnNetworkChange.ts' },
    ],
    [
      6925,
      {
        '../../../shared/lib/accounts/bitcoin-wallet-snap': 5823,
        '../../../shared/lib/accounts/solana-wallet-snap': 5827,
        '../../store/actions': 7619,
        '@metamask/snaps-utils': 2890,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.WalletClientType =
                    n.MultichainWalletSnapSender =
                    n.MultichainWalletSnapClient =
                      void 0),
                  (n.useMultichainWalletSnapClient = function (e) {
                    return (0, r.useMemo)(() => new k(e), [e]);
                  }),
                  (n.useMultichainWalletSnapSender = function (e) {
                    return (0, r.useMemo)(() => new f(e), [e]);
                  });
                var s = e('@metamask/snaps-utils'),
                  r = e('react'),
                  o = e('../../store/actions'),
                  a = e('../../../shared/lib/accounts/bitcoin-wallet-snap'),
                  i = e('../../../shared/lib/accounts/solana-wallet-snap');
                function c(e, t, n) {
                  (function (e, t) {
                    if (t.has(e))
                      throw new TypeError(
                        'Cannot initialize the same private elements twice on an object'
                      );
                  })(e, t),
                    t.set(e, n);
                }
                function u(e, t) {
                  return e.get(d(e, t));
                }
                function l(e, t, n) {
                  return e.set(d(e, t), n), n;
                }
                function d(e, t, n) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : n;
                  throw new TypeError('Private element is not present on this object');
                }
                function p(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var s = n.call(e, t || 'default');
                          if ('object' != typeof s) return s;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: n,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = n),
                    e
                  );
                }
                let m = (n.WalletClientType = (function (e) {
                  return (e.Bitcoin = 'bitcoin-wallet-snap'), (e.Solana = 'solana-wallet-snap'), e;
                })({}));
                const h = {
                  [m.Bitcoin]: { id: a.BITCOIN_WALLET_SNAP_ID, name: a.BITCOIN_WALLET_NAME },
                  [m.Solana]: { id: i.SOLANA_WALLET_SNAP_ID, name: i.SOLANA_WALLET_NAME },
                };
                class f {
                  constructor(e) {
                    p(this, 'snapId', void 0),
                      p(
                        this,
                        'send',
                        async e =>
                          await (0, o.handleSnapRequest)({
                            origin: 'metamask',
                            snapId: this.snapId,
                            handler: s.HandlerType.OnKeyringRequest,
                            request: e,
                          })
                      ),
                      (this.snapId = e);
                  }
                }
                n.MultichainWalletSnapSender = f;
                var g = new WeakMap(),
                  y = new WeakMap();
                class k {
                  constructor(e) {
                    c(this, g, void 0), c(this, y, void 0);
                    const { id: t, name: n } = h[e];
                    if ((l(g, this, t), l(y, this, n), !u(g, this)))
                      throw new Error(`Unsupported client type: ${e}`);
                  }
                  getSnapId() {
                    return u(g, this);
                  }
                  getSnapName() {
                    return u(y, this);
                  }
                  async createAccount(e, t) {
                    const n = await (0, o.createSnapAccount)(u(g, this), e, t);
                    await (0, o.multichainUpdateBalance)(n.id),
                      await (0, o.multichainUpdateTransactions)(n.id);
                  }
                }
                n.MultichainWalletSnapClient = k;
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/accounts/useMultichainWalletSnapClient.ts' },
    ],
    [
      6927,
      {
        '../../../../shared/lib/bridge/metrics': 5831,
        '../../../ducks/bridge/selectors': 6850,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useConvertedUsdAmounts = void 0);
                var s = e('react-redux'),
                  r = e('../../../ducks/bridge/selectors'),
                  o = e('../../../../shared/lib/bridge/metrics');
                n.useConvertedUsdAmounts = () => {
                  const { activeQuote: e } = (0, s.useSelector)(r.getBridgeQuotes),
                    { usd: t } = (0, s.useSelector)(r.getFromAmountInCurrency);
                  return (0, o.getConvertedUsdAmounts)({
                    activeQuote: e,
                    fromAmountInputValueInUsd: t,
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/events/useConvertedUsdAmounts.ts' },
    ],
    [
      6928,
      {
        '../../../../shared/constants/time': 5817,
        '../../../ducks/bridge/selectors': 6850,
        '../../../pages/bridge/utils/quote': 7074,
        '../useIsTxSubmittable': 6938,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useQuoteProperties = void 0);
                var s = e('react-redux'),
                  r = e('../../../ducks/bridge/selectors'),
                  o = e('../../../pages/bridge/utils/quote'),
                  a = e('../useIsTxSubmittable'),
                  i = e('../../../../shared/constants/time');
                n.useQuoteProperties = () => {
                  const {
                      recommendedQuote: e,
                      sortedQuotes: t,
                      quotesInitialLoadTimeMs: n,
                    } = (0, s.useSelector)(r.getBridgeQuotes),
                    c = (0, a.useIsTxSubmittable)(),
                    u = n ? n / i.SECOND : 0;
                  return {
                    can_submit: c,
                    best_quote_provider: (0, o.formatProviderLabel)(null == e ? void 0 : e.quote),
                    quotes_count: t.length,
                    quotes_list: t.map(e => (0, o.formatProviderLabel)(e.quote)),
                    initial_load_time_all_quotes: u,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/events/useQuoteProperties.ts' },
    ],
    [
      6929,
      {
        '../../../../shared/modules/selectors': 5874,
        '../../../ducks/bridge/selectors': 6850,
        '../../../helpers/utils/hardware': 6903,
        '../../../selectors': 7601,
        './types': 6926,
        './useConvertedUsdAmounts': 6927,
        '@metamask/bridge-controller': 1414,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useRequestMetadataProperties = void 0);
                var s = e('react-redux'),
                  r = e('@metamask/bridge-controller'),
                  o = e('../../../ducks/bridge/selectors'),
                  a = e('../../../helpers/utils/hardware'),
                  i = e('../../../selectors'),
                  c = e('../../../../shared/modules/selectors'),
                  u = e('./types'),
                  l = e('./useConvertedUsdAmounts');
                n.useRequestMetadataProperties = () => {
                  const { slippage: e } = (0, s.useSelector)(o.getQuoteRequest),
                    t = (0, s.useSelector)(o.getIsBridgeTx),
                    n = (0, s.useSelector)(c.getIsSmartTransaction),
                    { usd_amount_source: d } = (0, l.useConvertedUsdAmounts)(),
                    p = (0, s.useSelector)(i.getCurrentKeyring),
                    m = (0, a.isHardwareKeyring)(p.type) ?? !1,
                    h = e,
                    f = t ? u.ActionType.CROSSCHAIN_V1 : u.ActionType.SWAPBRIDGE_V1,
                    g = h !== r.BRIDGE_DEFAULT_SLIPPAGE;
                  return {
                    slippage_limit: e ?? r.BRIDGE_DEFAULT_SLIPPAGE,
                    custom_slippage: g,
                    is_hardware_wallet: m,
                    swap_type: f,
                    stx_enabled: n,
                    usd_amount_source: d,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/events/useRequestMetadataProperties.ts' },
    ],
    [
      693,
      {
        './CryptoECKey': 687,
        './CryptoHDKey': 688,
        './RegistryItem': 695,
        './RegistryType': 696,
        './lib/DataItem': 704,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.MultiKey = void 0);
                const s = e('./CryptoECKey'),
                  r = e('./CryptoHDKey'),
                  o = e('./lib/DataItem'),
                  a = e('./RegistryItem'),
                  i = e('./RegistryType');
                var c;
                !(function (e) {
                  (e[(e.threshold = 1)] = 'threshold'), (e[(e.keys = 2)] = 'keys');
                })(c || (c = {}));
                class u extends a.RegistryItem {
                  constructor(e, t) {
                    super(),
                      (this.threshold = e),
                      (this.keys = t),
                      (this.getThreshold = () => this.threshold),
                      (this.getKeys = () => this.keys),
                      (this.toDataItem = () => {
                        const e = {};
                        e[c.threshold] = this.threshold;
                        const t = this.keys.map(e => {
                          const t = e.toDataItem();
                          return t.setTag(e.getRegistryType().getTag()), t;
                        });
                        return (e[c.keys] = t), new o.DataItem(e);
                      }),
                      (this.getOutputDescriptorContent = () =>
                        [
                          this.getThreshold(),
                          this.keys.map(e => e.getOutputDescriptorContent()).join(','),
                        ].join(','));
                  }
                }
                (n.MultiKey = u),
                  (u.fromDataItem = e => {
                    const t = e.getData(),
                      n = t[c.threshold],
                      o = t[c.keys],
                      a = [];
                    return (
                      o.forEach(e => {
                        e.getTag() === i.RegistryTypes.CRYPTO_HDKEY.getTag()
                          ? a.push(r.CryptoHDKey.fromDataItem(e))
                          : e.getTag() === i.RegistryTypes.CRYPTO_ECKEY.getTag() &&
                            a.push(s.CryptoECKey.fromDataItem(e));
                      }),
                      new u(n, a)
                    );
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/MultiKey.js',
      },
    ],
    [
      6930,
      {
        '../../../ducks/bridge/selectors': 6850,
        '@metamask/bridge-controller': 1414,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useRequestProperties = void 0);
                var s = e('react-redux'),
                  r = e('@metamask/bridge-controller'),
                  o = e('../../../ducks/bridge/selectors');
                n.useRequestProperties = () => {
                  const {
                      srcChainId: e,
                      destChainId: t,
                      srcTokenAddress: n,
                      destTokenAddress: a,
                    } = (0, s.useSelector)(o.getQuoteRequest),
                    i = (0, s.useSelector)(o.getFromToken),
                    c = (0, s.useSelector)(o.getToToken),
                    u = null == i ? void 0 : i.symbol,
                    l = null == c ? void 0 : c.symbol,
                    d = n,
                    p = a;
                  return e && t && d && p && u && l
                    ? {
                        quoteRequestProperties: {
                          chain_id_source: (0, r.formatChainIdToCaip)(e),
                          chain_id_destination: (0, r.formatChainIdToCaip)(t),
                          token_symbol_source: u,
                          token_symbol_destination: l,
                          token_address_source: d,
                          token_address_destination: p,
                        },
                        flippedRequestProperties: {
                          chain_id_source: (0, r.formatChainIdToCaip)(t),
                          chain_id_destination: (0, r.formatChainIdToCaip)(e),
                          token_symbol_source: l,
                          token_symbol_destination: u,
                          token_address_source: p,
                          token_address_destination: d,
                        },
                      }
                    : {};
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/events/useRequestProperties.ts' },
    ],
    [
      6931,
      {
        '../../../ducks/bridge/selectors': 6850,
        '../../../pages/bridge/utils/quote': 7074,
        './useConvertedUsdAmounts': 6927,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTradeProperties = void 0);
                var s = e('react-redux'),
                  r = e('../../../ducks/bridge/selectors'),
                  o = e('../../../pages/bridge/utils/quote'),
                  a = e('./useConvertedUsdAmounts');
                n.useTradeProperties = () => {
                  const { activeQuote: e } = (0, s.useSelector)(r.getBridgeQuotes),
                    {
                      usd_amount_source: t,
                      usd_quoted_gas: n,
                      usd_quoted_return: i,
                    } = (0, a.useConvertedUsdAmounts)();
                  return {
                    gas_included: !1,
                    quoted_time_minutes:
                      null != e && e.estimatedProcessingTimeInSeconds
                        ? e.estimatedProcessingTimeInSeconds / 60
                        : 0,
                    provider: (0, o.formatProviderLabel)(null == e ? void 0 : e.quote),
                    usd_amount_source: t,
                    usd_quoted_gas: n,
                    usd_quoted_return: i,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/events/useTradeProperties.ts' },
    ],
    [
      6932,
      {
        '../../../shared/constants/bridge': 5790,
        '../../../shared/constants/common': 5791,
        '@metamask/bridge-controller': 1414,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function ({ bridgeHistoryItem: e, srcTxMeta: t }) {
                    var n, c, u, l;
                    if ((null == t ? void 0 : t.type) !== s.TransactionType.bridge)
                      return { srcNetwork: undefined, destNetwork: undefined };
                    const { srcChainId: d, destChainId: p } = i({ bridgeHistoryItem: e });
                    if (!d || !p) return { srcNetwork: undefined, destNetwork: undefined };
                    const m = (0, r.formatChainIdToCaip)(d),
                      h = (0, r.isSolanaChainId)(d) ? m : (0, r.formatChainIdToHex)(d),
                      f = {
                        chainId: m,
                        name: a.NETWORK_TO_SHORT_NETWORK_NAME_MAP[h],
                        ...((0, r.isSolanaChainId)(m)
                          ? {
                              isEvm: !1,
                              nativeCurrency:
                                null === (n = (0, r.getNativeAssetForChainId)(d)) || void 0 === n
                                  ? void 0
                                  : n.assetId,
                            }
                          : {
                              defaultBlockExplorerUrlIndex: 0,
                              blockExplorerUrls: [o.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[h]],
                              defaultRpcEndpointIndex: 0,
                              rpcEndpoints: [],
                              nativeCurrency:
                                null === (c = (0, r.getNativeAssetForChainId)(d)) || void 0 === c
                                  ? void 0
                                  : c.symbol,
                              isEvm: !0,
                            }),
                      },
                      g = (0, r.formatChainIdToCaip)(p),
                      y = (0, r.isSolanaChainId)(p) ? g : (0, r.formatChainIdToHex)(p),
                      k = {
                        chainId: g,
                        name: a.NETWORK_TO_SHORT_NETWORK_NAME_MAP[y],
                        ...((0, r.isSolanaChainId)(g)
                          ? {
                              isEvm: !1,
                              nativeCurrency:
                                null === (u = (0, r.getNativeAssetForChainId)(p)) || void 0 === u
                                  ? void 0
                                  : u.assetId,
                            }
                          : {
                              defaultBlockExplorerUrlIndex: 0,
                              blockExplorerUrls: [o.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[y]],
                              defaultRpcEndpointIndex: 0,
                              rpcEndpoints: [],
                              nativeCurrency:
                                null === (l = (0, r.getNativeAssetForChainId)(p)) || void 0 === l
                                  ? void 0
                                  : l.symbol,
                              isEvm: !0,
                            }),
                      };
                    return { srcNetwork: f, destNetwork: k };
                  });
                var s = e('@metamask/transaction-controller'),
                  r = e('@metamask/bridge-controller'),
                  o = e('../../../shared/constants/common'),
                  a = e('../../../shared/constants/bridge');
                const i = ({ bridgeHistoryItem: e }) => ({
                  srcChainId: e ? e.quote.srcChainId : undefined,
                  destChainId: e ? e.quote.destChainId : undefined,
                });
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useBridgeChainInfo.ts' },
    ],
    [
      6933,
      {
        '../../ducks/bridge/bridge': 6849,
        '../../ducks/bridge/selectors': 6850,
        '../../ducks/bridge/utils': 6851,
        '../../ducks/metamask/metamask': 6860,
        '../../selectors': 7601,
        '../../selectors/multichain': 7605,
        '../useMultichainSelector': 6993,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useBridgeExchangeRates = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../ducks/bridge/selectors'),
                  a = e('../../selectors'),
                  i = e('../../ducks/metamask/metamask'),
                  c = e('../../ducks/bridge/bridge'),
                  u = e('../../ducks/bridge/utils'),
                  l = e('../useMultichainSelector'),
                  d = e('../../selectors/multichain');
                n.useBridgeExchangeRates = () => {
                  const { srcTokenAddress: e, destTokenAddress: t } = (0, r.useSelector)(
                      o.getQuoteRequest
                    ),
                    { activeQuote: n } = (0, r.useSelector)(o.getBridgeQuotes),
                    p = (0, l.useMultichainSelector)(d.getMultichainCurrentChainId),
                    m = (0, r.useSelector)(o.getToChain),
                    h = null == m ? void 0 : m.chainId,
                    f = (0, r.useSelector)(a.getParticipateInMetaMetrics),
                    g = (0, r.useDispatch)(),
                    y = (0, r.useSelector)(i.getCurrentCurrency),
                    k = n ? n.quote.srcAsset.address : e,
                    v = (0, r.useSelector)(o.getFromToken),
                    T = (null == v ? void 0 : v.address) ?? k,
                    b = n ? n.quote.destAsset.address : t,
                    w = (0, r.useSelector)(o.getToToken),
                    S = (null == w ? void 0 : w.address) ?? b,
                    C = (0, r.useSelector)(a.getMarketData);
                  (0, s.useEffect)(() => {
                    if (p && T) {
                      (0, u.exchangeRateFromMarketData)(p, T, C) ||
                        g(
                          (0, c.setSrcTokenExchangeRates)({
                            chainId: p,
                            tokenAddress: T,
                            currency: y,
                          })
                        );
                    }
                  }, [y, g, p, T, C]),
                    (0, s.useEffect)(() => {
                      if (h && S) {
                        (0, u.exchangeRateFromMarketData)(h, S, C) ||
                          (g(
                            (0, c.setDestTokenExchangeRates)({
                              chainId: h,
                              tokenAddress: S,
                              currency: y,
                            })
                          ),
                          f &&
                            'usd' !== y &&
                            g(
                              (0, c.setDestTokenUsdExchangeRates)({
                                chainId: h,
                                tokenAddress: S,
                                currency: 'usd',
                              })
                            ));
                      }
                    }, [y, g, f, C, h, S]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useBridgeExchangeRates.ts' },
    ],
    [
      6934,
      {
        '../../ducks/bridge-status/selectors': 6847,
        '../../helpers/constants/routes': 6878,
        '@metamask/transaction-controller': 2946,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.FINAL_NON_CONFIRMED_STATUSES = void 0),
                  (n.useBridgeTxHistoryData = function ({
                    transactionGroup: e,
                    isEarliestNonce: t,
                  }) {
                    var n;
                    const r = (0, o.useHistory)(),
                      u = (0, s.useSelector)(a.selectBridgeHistoryForAccount),
                      l = e.initialTransaction,
                      d = l.id,
                      p = u[d],
                      m = p
                        ? Boolean(
                            (null == p ? void 0 : p.status.srcChain.txHash) &&
                              (null === (n = p.status.destChain) || void 0 === n
                                ? void 0
                                : n.txHash)
                          )
                        : null,
                      h = c.includes(l.status)
                        ? undefined
                        : () => {
                            r.push({
                              pathname: `${i.CROSS_CHAIN_SWAP_TX_DETAILS_ROUTE}/${d}`,
                              state: { transactionGroup: e, isEarliestNonce: t },
                            });
                          };
                    return { bridgeTxHistoryItem: p, isBridgeComplete: m, showBridgeTxDetails: h };
                  });
                var s = e('react-redux'),
                  r = e('@metamask/transaction-controller'),
                  o = e('react-router-dom'),
                  a = e('../../ducks/bridge-status/selectors'),
                  i = e('../../helpers/constants/routes');
                const c = (n.FINAL_NON_CONFIRMED_STATUSES = [
                  r.TransactionStatus.failed,
                  r.TransactionStatus.dropped,
                  r.TransactionStatus.rejected,
                ]);
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useBridgeTxHistoryData.ts' },
    ],
    [
      6935,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/modules/selectors/networks': 5875,
        '../../contexts/metametrics': 6836,
        '../../ducks/bridge/actions': 6848,
        '../../helpers/constants/routes': 6878,
        '../../helpers/utils/portfolio': 6914,
        '../../selectors': 7601,
        './useCrossChainSwapsEventTracker': 6937,
        '@metamask/bridge-controller': 1414,
        '@metamask/utils': 2995,
        'ethereumjs-util': 4393,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  a = e('ethereumjs-util'),
                  i = e('@metamask/utils'),
                  c = e('@metamask/bridge-controller'),
                  u = e('../../ducks/bridge/actions'),
                  l = e('../../selectors'),
                  d = e('../../contexts/metametrics'),
                  p = e('../../../shared/constants/metametrics'),
                  m = e('../../helpers/constants/routes'),
                  h = e('../../helpers/utils/portfolio'),
                  f = e('../../../shared/modules/selectors/networks'),
                  g = e('./useCrossChainSwapsEventTracker');
                n.default = () => {
                  const e = (0, r.useDispatch)(),
                    t = (0, o.useHistory)(),
                    n = (0, s.useContext)(d.MetaMetricsContext),
                    y = (0, g.useCrossChainSwapsEventTracker)(),
                    k = (0, r.useSelector)(l.getMetaMetricsId),
                    v = (0, r.useSelector)(l.getParticipateInMetaMetrics),
                    T = (0, r.useSelector)(l.getDataCollectionForMarketing),
                    b = (0, r.useSelector)(f.getProviderConfig),
                    w = (0, r.useSelector)(l.getUseExternalServices),
                    S = (0, r.useSelector)(l.getIsBridgeEnabled),
                    C = (0, r.useSelector)(l.getIsBridgeChain);
                  (0, s.useEffect)(() => {
                    w && e((0, u.setBridgeFeatureFlags)());
                  }, [e, u.setBridgeFeatureFlags]);
                  return {
                    openBridgeExperience: (0, s.useCallback)(
                      (e, s, r, o = !1) => {
                        if (C && b)
                          if (S) {
                            y({
                              event: p.MetaMetricsEventName.ActionOpened,
                              category: p.MetaMetricsEventCategory.Navigation,
                              properties: {
                                location:
                                  'Home' === e
                                    ? p.MetaMetricsSwapsEventSource.MainView
                                    : p.MetaMetricsSwapsEventSource.TokenView,
                                chain_id_source: (0, c.formatChainIdToCaip)(b.chainId),
                                token_symbol_source: s.symbol,
                                token_address_source: s.address,
                              },
                            }),
                              n({
                                event: p.MetaMetricsEventName.BridgeLinkClicked,
                                category: p.MetaMetricsEventCategory.Navigation,
                                properties: {
                                  token_symbol: s.symbol,
                                  location: e,
                                  text: 'Bridge',
                                  chain_id: b.chainId,
                                },
                              });
                            let r = `${m.CROSS_CHAIN_SWAP_ROUTE}${m.PREPARE_SWAP_ROUTE}`;
                            (r += `?token=${(0, i.isStrictHexString)(s.address) ? (0, a.toChecksumAddress)(s.address) : s.address}`),
                              o && (r += '&swaps=true'),
                              t.push(r);
                          } else {
                            const t = (0, h.getPortfolioUrl)(
                              'bridge',
                              'ext_bridge_button',
                              k,
                              v,
                              T
                            );
                            global.platform.openTab({ url: `${t}${r ?? `&token=${s.address}`}` }),
                              n({
                                category: p.MetaMetricsEventCategory.Navigation,
                                event: p.MetaMetricsEventName.BridgeLinkClicked,
                                properties: {
                                  location: e,
                                  text: 'Bridge',
                                  url: t,
                                  chain_id: b.chainId,
                                  token_symbol: s.symbol,
                                },
                              });
                          }
                      },
                      [S, C, e, t, k, n, y, v, T, b]
                    ),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useBridging.ts' },
    ],
    [
      6936,
      { '../../ducks/bridge/selectors': 6850, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useCountdownTimer = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../ducks/bridge/selectors');
                const a = 1e3;
                n.useCountdownTimer = () => {
                  const { quotesLastFetchedMs: e } = (0, r.useSelector)(o.getBridgeQuotes),
                    t = (0, r.useSelector)(o.getQuoteRefreshRate),
                    [n, i] = (0, s.useState)(t);
                  return (
                    (0, s.useEffect)(() => {
                      e && i(t - (Date.now() - e) + a);
                    }, [e]),
                    (0, s.useEffect)(() => {
                      const e = setInterval(() => {
                        i(Math.max(0, n - a));
                      }, a);
                      return () => clearInterval(e);
                    }, [n]),
                    n
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useCountdownTimer.ts' },
    ],
    [
      6937,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../contexts/metametrics': 6836,
        './events/types': 6926,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useCrossChainSwapsEventTracker = void 0);
                var s = e('react'),
                  r = e('../../contexts/metametrics'),
                  o = e('../../../shared/constants/metametrics'),
                  a = e('./events/types');
                n.useCrossChainSwapsEventTracker = () => {
                  const e = (0, s.useContext)(r.MetaMetricsContext);
                  return (0, s.useCallback)(
                    ({ event: t, category: n, properties: s }) => {
                      e({
                        category: n ?? o.MetaMetricsEventCategory.CrossChainSwaps,
                        event: t,
                        properties: { action_type: a.ActionType.CROSSCHAIN_V1, ...s },
                        value: 'value' in s ? s.value : undefined,
                      });
                    },
                    [e]
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useCrossChainSwapsEventTracker.ts' },
    ],
    [
      6938,
      {
        '../../ducks/bridge/selectors': 6850,
        '../../pages/bridge/hooks/useIsMultichainSwap': 7045,
        '../../selectors/multichain': 7605,
        '../useMultichainSelector': 6993,
        './useLatestBalance': 6939,
        '@metamask/bridge-controller': 1414,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIsTxSubmittable = void 0);
                var s,
                  r = e('react-redux'),
                  o = e('@metamask/bridge-controller'),
                  a = e('react'),
                  i = e('../../ducks/bridge/selectors'),
                  c = e('../../selectors/multichain'),
                  u = e('../useMultichainSelector'),
                  l = e('../../pages/bridge/hooks/useIsMultichainSwap'),
                  d = (s = e('./useLatestBalance')) && s.__esModule ? s : { default: s };
                n.useIsTxSubmittable = () => {
                  const e = (0, r.useSelector)(i.getFromToken),
                    t = (0, r.useSelector)(i.getToToken),
                    n = (0, u.useMultichainSelector)(c.getMultichainCurrentChainId),
                    s = (0, r.useSelector)(i.getToChain),
                    p = (0, r.useSelector)(i.getFromAmount),
                    { activeQuote: m } = (0, r.useSelector)(i.getBridgeQuotes),
                    h = (0, l.useIsMultichainSwap)(),
                    {
                      isInsufficientBalance: f,
                      isInsufficientGasBalance: g,
                      isInsufficientGasForQuote: y,
                    } = (0, r.useSelector)(i.getValidationErrors),
                    k = (0, d.default)(e),
                    v = (0, a.useMemo)(() => (0, o.getNativeAssetForChainId)(n), [n]),
                    T = (0, d.default)(v);
                  return Boolean(e && t && n && (h || s) && p && m && !f(k) && !g(T) && !y(T));
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useIsTxSubmittable.ts' },
    ],
    [
      6939,
      {
        '../../../shared/constants/multichain/assets': 5802,
        '../../../shared/lib/transactions-controller-utils': 5851,
        '../../../shared/modules/Numeric': 5853,
        '../../selectors': 7601,
        '../../selectors/multichain': 7605,
        '../useAsync': 6969,
        '../useMultichainSelector': 6993,
        '@metamask/bridge-controller': 1414,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react'),
                  r = e('@metamask/bridge-controller'),
                  o = e('../../selectors'),
                  a = e('../useAsync'),
                  i = e('../../../shared/modules/Numeric'),
                  c = e('../../../shared/lib/transactions-controller-utils'),
                  u = e('../useMultichainSelector'),
                  l = e('../../selectors/multichain'),
                  d = e('../../../shared/constants/multichain/assets');
                n.default = e => {
                  const { address: t, id: n } = (0, u.useMultichainSelector)(
                      o.getSelectedInternalAccount
                    ),
                    p = (0, u.useMultichainSelector)(l.getMultichainCurrentChainId),
                    m = (0, u.useMultichainSelector)(l.getMultichainBalances),
                    h = null == m ? void 0 : m[n],
                    f = (0, a.useAsyncResult)(async () => {
                      if (null == e || !e.chainId || !e) return undefined;
                      const { chainId: n } = e;
                      if ((0, r.isSolanaChainId)(n) && e.decimals) {
                        var s;
                        const t = (0, r.isNativeAddress)(e.address)
                          ? d.MULTICHAIN_NATIVE_CURRENCY_TO_CAIP19.SOL
                          : (e.assetId ?? e.address);
                        return i.Numeric.from(
                          (null == h || null === (s = h[t]) || void 0 === s ? void 0 : s.amount) ??
                            (null == e ? void 0 : e.string),
                          10
                        )
                          .shiftedBy(-1 * e.decimals)
                          .toString();
                      }
                      var o;
                      return e.address &&
                        (0, r.formatChainIdToCaip)(p) === (0, r.formatChainIdToCaip)(n)
                        ? null ===
                            (o = await (0, r.calcLatestSrcBalance)(
                              global.ethereumProvider,
                              t,
                              e.address,
                              (0, r.formatChainIdToHex)(n)
                            )) || void 0 === o
                          ? void 0
                          : o.toString()
                        : undefined;
                    }, [p, e, t, h]);
                  if (e && 'number' != typeof e.decimals)
                    throw new Error(
                      `Failed to calculate latest balance - ${e.symbol} token is missing "decimals" value`
                    );
                  return (0, s.useMemo)(
                    () =>
                      null != f && f.value
                        ? (0, c.calcTokenAmount)(f.value, null == e ? void 0 : e.decimals)
                        : undefined,
                    [null == f ? void 0 : f.value, null == e ? void 0 : e.decimals]
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useLatestBalance.ts' },
    ],
    [
      694,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.PathComponent = void 0);
                class s {
                  constructor(e) {
                    if (
                      ((this.getIndex = () => this.index),
                      (this.isWildcard = () => this.wildcard),
                      (this.isHardened = () => this.hardened),
                      (this.index = e.index),
                      (this.hardened = e.hardened),
                      this.index !== undefined ? (this.wildcard = !1) : (this.wildcard = !0),
                      this.index && this.index & s.HARDENED_BIT)
                    )
                      throw new Error(
                        `#[ur-registry][PathComponent][fn.constructor]: Invalid index ${this.index} - most significant bit cannot be set`
                      );
                  }
                }
                (n.PathComponent = s), (s.HARDENED_BIT = 2147483648);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/PathComponent.js',
      },
    ],
    [
      6940,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../ducks/bridge/selectors': 6850,
        './events/useConvertedUsdAmounts': 6927,
        './events/useQuoteProperties': 6928,
        './events/useRequestMetadataProperties': 6929,
        './events/useRequestProperties': 6930,
        './events/useTradeProperties': 6931,
        './useCrossChainSwapsEventTracker': 6937,
        './useLatestBalance': 6939,
        '@metamask/bridge-controller': 1414,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useQuoteFetchEvents = void 0);
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = e('@metamask/bridge-controller'),
                  i = e('../../../shared/constants/metametrics'),
                  c = e('../../ducks/bridge/selectors'),
                  u = e('./useCrossChainSwapsEventTracker'),
                  l = (s = e('./useLatestBalance')) && s.__esModule ? s : { default: s },
                  d = e('./events/useRequestMetadataProperties'),
                  p = e('./events/useRequestProperties'),
                  m = e('./events/useTradeProperties'),
                  h = e('./events/useConvertedUsdAmounts'),
                  f = e('./events/useQuoteProperties');
                n.useQuoteFetchEvents = () => {
                  const e = (0, u.useCrossChainSwapsEventTracker)(),
                    {
                      isLoading: t,
                      quotesRefreshCount: n,
                      quoteFetchError: s,
                      quotesInitialLoadTimeMs: g,
                    } = (0, o.useSelector)(c.getBridgeQuotes),
                    { insufficientBal: y, srcTokenAddress: k } = (0, o.useSelector)(
                      c.getQuoteRequest
                    ),
                    v = (0, o.useSelector)(c.getFromAmount),
                    T = (0, o.useSelector)(c.getValidationErrors),
                    { quoteRequestProperties: b } = (0, p.useRequestProperties)(),
                    w = (0, d.useRequestMetadataProperties)(),
                    { usd_amount_source: S } = (0, h.useConvertedUsdAmounts)(),
                    C = !y,
                    _ = (0, f.useQuoteProperties)(),
                    E = (0, m.useTradeProperties)(),
                    I = (0, o.useSelector)(c.getFromToken),
                    x = (0, o.useSelector)(c.getFromChain),
                    A = (0, l.default)(I),
                    M = (0, r.useMemo)(
                      () =>
                        null != x && x.chainId ? (0, a.getNativeAssetForChainId)(x.chainId) : null,
                      [null == x ? void 0 : x.chainId]
                    ),
                    P = (0, l.default)(M),
                    O = (0, r.useMemo)(() => {
                      const {
                          isEstimatedReturnLow: e,
                          isNoQuotesAvailable: t,
                          isInsufficientGasBalance: n,
                          isInsufficientGasForQuote: s,
                          isInsufficientBalance: r,
                        } = T,
                        o = [];
                      return (
                        e && o.push('low_return'),
                        t && o.push('no_quotes'),
                        n(P) && o.push('insufficient_gas_balance'),
                        s(P) && o.push('insufficient_gas_for_selected_quote'),
                        r(A) && o.push('insufficient_balance'),
                        o
                      );
                    }, [T]);
                  (0, r.useEffect)(() => {
                    const s = t && 0 === n && g === undefined;
                    b &&
                      v &&
                      k &&
                      s &&
                      e({
                        event: i.MetaMetricsEventName.CrossChainSwapsQuotesRequested,
                        properties: { ...b, ...w, has_sufficient_funds: C, usd_amount_source: S },
                      });
                  }, [t, g]),
                    (0, r.useEffect)(() => {
                      b &&
                        v &&
                        k &&
                        s &&
                        e({
                          event: i.MetaMetricsEventName.CrossChainSwapsQuoteError,
                          properties: {
                            ...b,
                            ...w,
                            has_sufficient_funds: C,
                            usd_amount_source: S,
                            error_message: s,
                          },
                        });
                    }, [s]),
                    (0, r.useEffect)(() => {
                      v &&
                        k &&
                        !t &&
                        n >= 0 &&
                        _.initial_load_time_all_quotes > 0 &&
                        b &&
                        !s &&
                        E &&
                        e({
                          event: i.MetaMetricsEventName.CrossChainSwapsQuotesReceived,
                          properties: { ...b, ...w, ..._, ...E, refresh_count: n - 1, warnings: O },
                        });
                    }, [n]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useQuoteFetchEvents.ts' },
    ],
    [
      6941,
      {
        '../../../shared/constants/bridge': 5790,
        '../../../shared/constants/multichain/networks': 5803,
        '../../../shared/constants/network': 5804,
        '../../../shared/modules/Numeric': 5853,
        '../../ducks/bridge-status/selectors': 6847,
        '../useMultichainTransactionDisplay': 6994,
        '@metamask/bridge-controller': 1414,
        '@metamask/keyring-api': 2014,
        '@metamask/transaction-controller': 2946,
        '@metamask/utils': 2995,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function (e) {
                    const t = (0, r.useSelector)(m.selectBridgeHistoryForAccount),
                      n = (0, s.useMemo)(() => {
                        var t;
                        const n = new Map();
                        return (
                          null == e ||
                            null === (t = e.transactions) ||
                            void 0 === t ||
                            t.forEach(e => {
                              n.set(e.id, e);
                            }),
                          n
                        );
                      }, [e]),
                      f = e => {
                        var t;
                        if (e === undefined || null === e) return '';
                        const n = e.toString();
                        let s =
                          null === (t = d.MULTICHAIN_PROVIDER_CONFIGS[n]) || void 0 === t
                            ? void 0
                            : t.nickname;
                        if (!s && !isNaN(Number(e)))
                          try {
                            const t = new u.Numeric(e, 10).toPrefixedHexString();
                            s = p.NETWORK_TO_SHORT_NETWORK_NAME_MAP[t] ?? l.NETWORK_TO_NAME_MAP[t];
                          } catch (e) {
                            console.error('Error converting chain ID', e);
                          }
                        return s || n;
                      },
                      g = {};
                    t &&
                      Object.values(t).forEach(e => {
                        var t;
                        const n =
                          null === (t = e.status) ||
                          void 0 === t ||
                          null === (t = t.srcChain) ||
                          void 0 === t
                            ? void 0
                            : t.txHash;
                        n && (g[n] = e);
                      });
                    let y = e
                      ? {
                          ...e,
                          transactions: (e.transactions || []).map(e => ({
                            ...e,
                            isBridgeOriginated: !1,
                          })),
                        }
                      : { transactions: [], next: null, lastUpdated: Date.now() };
                    const k = [];
                    t &&
                      Object.entries(t).forEach(([e, t]) => {
                        if (t.startTime && Date.now() - t.startTime < 864e5) {
                          var s;
                          const e =
                            null === (s = t.status) ||
                            void 0 === s ||
                            null === (s = s.srcChain) ||
                            void 0 === s
                              ? void 0
                              : s.txHash;
                          if (!n.has(e ?? '') && e) {
                            var r, o, a, u, l, p, m;
                            const n =
                                (('COMPLETE' ===
                                (null === (r = t.status) || void 0 === r ? void 0 : r.status)
                                  ? (t.completionTime ?? t.startTime)
                                  : t.startTime) ?? Date.now()) / 1e3,
                              s = null === (o = t.quote) || void 0 === o ? void 0 : o.srcChainId,
                              h = (0, i.isCaipChainId)(s) ? s : d.MultichainNetworks.SOLANA,
                              f = (0, c.getNativeAssetForChainId)(h) ?? 'eip155:1/slip44:60',
                              g = {
                                id: e,
                                account: t.account,
                                timestamp: n,
                                type: 'send',
                                to: [],
                                from: [
                                  {
                                    address: t.account,
                                    asset: {
                                      type: f,
                                      amount: (
                                        Number(
                                          (null === (a = t.quote) || void 0 === a
                                            ? void 0
                                            : a.srcTokenAmount) ?? 0
                                        ) /
                                        10 **
                                          ((null === (u = t.quote) ||
                                          void 0 === u ||
                                          null === (u = u.srcAsset) ||
                                          void 0 === u
                                            ? void 0
                                            : u.decimals) ?? 9)
                                      ).toString(),
                                      unit:
                                        (null === (l = t.quote) ||
                                        void 0 === l ||
                                        null === (l = l.srcAsset) ||
                                        void 0 === l
                                          ? void 0
                                          : l.symbol) ?? '',
                                      fungible: !0,
                                    },
                                  },
                                ],
                                isBridgeOriginated: !0,
                                bridgeStatus:
                                  (null === (p = t.status) || void 0 === p ? void 0 : p.status) ??
                                  'PENDING',
                                network:
                                  (null === (m = t.quote) ||
                                  void 0 === m ||
                                  null === (m = m.srcChainId) ||
                                  void 0 === m
                                    ? void 0
                                    : m.toString()) ?? '',
                                isBridgeTx: !0,
                                bridgeInfo: undefined,
                                isSourceTxConfirmed: !1,
                              };
                            k.push(g);
                          }
                        }
                      });
                    k.length > 0 && (y = { ...y, transactions: [...y.transactions, ...k] });
                    if (!y.transactions.length)
                      return e === undefined && 0 === k.length ? undefined : y;
                    const v = y.transactions.map(e => {
                      const t = e.id,
                        s = n.get(t),
                        r = (null == s ? void 0 : s.status) ?? o.TransactionStatus.Submitted,
                        i = h.KEYRING_TRANSACTION_STATUS_KEY[r] === a.TransactionStatus.confirmed;
                      if ('swap' === e.type && !e.isBridgeOriginated) return e;
                      const c = t ? g[t] : null;
                      if (c) {
                        var u, l, d, p, m, y, k, v, T, b;
                        const t = null === (u = c.quote) || void 0 === u ? void 0 : u.srcChainId,
                          n = null === (l = c.quote) || void 0 === l ? void 0 : l.destChainId,
                          s = t !== undefined && n !== undefined && t !== n;
                        if (!s) return e;
                        const r = {
                          destChainId: n,
                          destChainName: f(n),
                          destAsset: {
                            ...((null === (d = c.quote) || void 0 === d ? void 0 : d.destAsset) ??
                              {}),
                            decimals:
                              (null === (p = c.quote) ||
                              void 0 === p ||
                              null === (p = p.destAsset) ||
                              void 0 === p
                                ? void 0
                                : p.decimals) ?? 18,
                          },
                          destTokenAmount:
                            null === (m = c.quote) || void 0 === m ? void 0 : m.destTokenAmount,
                          status:
                            (null === (y = c.status) || void 0 === y ? void 0 : y.status) ??
                            'PENDING',
                          destTxHash:
                            null === (k = c.status) ||
                            void 0 === k ||
                            null === (k = k.destChain) ||
                            void 0 === k
                              ? void 0
                              : k.txHash,
                          srcTxHash:
                            null === (v = c.status) ||
                            void 0 === v ||
                            null === (v = v.srcChain) ||
                            void 0 === v
                              ? void 0
                              : v.txHash,
                          provider: null === (T = c.quote) || void 0 === T ? void 0 : T.provider,
                          destBlockExplorerUrl:
                            null === (b = c.quote) ||
                            void 0 === b ||
                            null === (b = b.destChain) ||
                            void 0 === b
                              ? void 0
                              : b.blockExplorerUrl,
                        };
                        return e.isBridgeOriginated
                          ? {
                              id: e.id,
                              account: e.account,
                              timestamp: e.timestamp,
                              type: e.type,
                              from: e.from,
                              to: e.to,
                              isBridgeOriginated: !0,
                              bridgeStatus: e.bridgeStatus,
                              network: e.network,
                              isBridgeTx: s,
                              bridgeInfo: r,
                              isSourceTxConfirmed: i,
                            }
                          : {
                              ...e,
                              isBridgeTx: s,
                              bridgeInfo: r,
                              isBridgeOriginated: !1,
                              isSourceTxConfirmed: i,
                            };
                      }
                      return e.isBridgeOriginated
                        ? {
                            id: e.id,
                            account: e.account,
                            timestamp: e.timestamp,
                            type: e.type,
                            from: e.from,
                            to: e.to,
                            isBridgeOriginated: !0,
                            bridgeStatus: e.bridgeStatus,
                            network: e.network,
                            isBridgeTx: !1,
                            bridgeInfo: undefined,
                            isSourceTxConfirmed: i,
                          }
                        : e;
                    });
                    return { ...y, transactions: v };
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('@metamask/keyring-api'),
                  a = e('@metamask/transaction-controller'),
                  i = e('@metamask/utils'),
                  c = e('@metamask/bridge-controller'),
                  u = e('../../../shared/modules/Numeric'),
                  l = e('../../../shared/constants/network'),
                  d = e('../../../shared/constants/multichain/networks'),
                  p = e('../../../shared/constants/bridge'),
                  m = e('../../ducks/bridge-status/selectors'),
                  h = e('../useMultichainTransactionDisplay');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useSolanaBridgeTransactionMapping.ts' },
    ],
    [
      6942,
      {
        '../../../shared/modules/bridge-utils/security-alerts-api.util': 5854,
        '../../ducks/bridge/selectors': 6850,
        '../useAsync': 6969,
        '@metamask/bridge-controller': 1414,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTokenAlerts = n.default = void 0);
                var s = e('react-redux'),
                  r = e('@metamask/bridge-controller'),
                  o = e('../../ducks/bridge/selectors'),
                  a = e('../../../shared/modules/bridge-utils/security-alerts-api.util'),
                  i = e('../useAsync');
                const c = () => {
                  const e = (0, s.useSelector)(o.getFromToken),
                    t = (0, s.useSelector)(o.getFromChain),
                    n = (0, s.useSelector)(o.getToToken),
                    c = (0, s.useSelector)(o.getToChain),
                    { value: u } = (0, i.useAsyncResult)(async () => {
                      if (e && t && n && c) {
                        const e = (0, a.convertChainIdToBlockAidChainName)(
                          null == c ? void 0 : c.chainId
                        );
                        if (e)
                          return await (0, a.fetchTokenAlert)(
                            e,
                            (0, r.formatAddressToCaipReference)(n.address)
                          );
                      }
                      return null;
                    }, [n, c]);
                  return { tokenAlert: u };
                };
                n.useTokenAlerts = c;
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useTokenAlerts.ts' },
    ],
    [
      6943,
      {
        '../../../shared/constants/bridge': 5790,
        '../../../shared/constants/multichain/networks': 5803,
        '../../../shared/constants/network': 5804,
        '../../../shared/constants/time': 5817,
        '../../../shared/constants/transaction': 5819,
        '../../../shared/lib/asset-utils': 5828,
        '../../../shared/lib/fetch-with-cache': 5834,
        '../../ducks/bridge/selectors': 6850,
        '../../pages/swaps/swaps.util': 7583,
        '../../selectors': 7601,
        '../useAsync': 6969,
        '../useMultichainBalances': 6992,
        '@metamask/bridge-controller': 1414,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTokensWithFiltering = void 0);
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = e('@metamask/bridge-controller'),
                  i = e('../../selectors'),
                  c = e('../../../shared/constants/transaction'),
                  u = e('../../../shared/constants/network'),
                  l = e('../useMultichainBalances'),
                  d = e('../useAsync'),
                  p = e('../../pages/swaps/swaps.util'),
                  m = e('../../../shared/constants/time'),
                  h = e('../../ducks/bridge/selectors'),
                  f =
                    (s = e('../../../shared/lib/fetch-with-cache')) && s.__esModule
                      ? s
                      : { default: s },
                  g = e('../../../shared/constants/bridge'),
                  y = e('../../../shared/lib/asset-utils'),
                  k = e('../../../shared/constants/multichain/networks');
                n.useTokensWithFiltering = (e, t, n) => {
                  const s = (0, o.useSelector)(t => (0, h.getTopAssetsFromFeatureFlags)(t, e)),
                    { assetsWithBalance: v } = (0, l.useMultichainBalances)(n),
                    T = (0, o.useSelector)(i.selectERC20TokensByChain),
                    { value: b, pending: w } = (0, d.useAsyncResult)(async () => {
                      if (e) {
                        if (!(0, a.isSolanaChainId)(e)) {
                          var t;
                          const s = (0, a.formatChainIdToHex)(e),
                            r = null === (t = T[s]) || void 0 === t ? void 0 : t.timestamp;
                          var n;
                          if (r && Date.now() - r <= 10 * m.MINUTE)
                            return null === (n = T[s]) || void 0 === n ? void 0 : n.data;
                        }
                        return await (0, a.fetchBridgeTokens)(
                          e,
                          a.BridgeClientId.EXTENSION,
                          async (e, t) => {
                            const { headers: n, ...s } = t ?? {};
                            return await (0, f.default)({
                              url: e,
                              ...s,
                              fetchOptions: { method: 'GET', headers: n },
                              functionName: 'fetchBridgeTokens',
                            });
                          },
                          g.BRIDGE_API_BASE_URL
                        );
                      }
                      return {};
                    }, [e, T]),
                    { value: S, pending: C } = (0, d.useAsyncResult)(
                      async () =>
                        e
                          ? s
                            ? s.map(e => ({ address: e }))
                            : await (0, p.fetchTopAssetsList)(e)
                          : [],
                      [e, s]
                    ),
                    _ = (0, r.useCallback)(
                      t => {
                        if (!e || !t) return undefined;
                        const n = {
                          ...t,
                          chainId: (0, a.isSolanaChainId)(e)
                            ? (0, a.formatChainIdToCaip)(e)
                            : (0, a.formatChainIdToHex)(e),
                          assetId: t.assetId,
                        };
                        return (0, a.isNativeAddress)(t.address)
                          ? {
                              ...n,
                              type: c.AssetType.native,
                              address: '',
                              image:
                                u.CHAIN_ID_TOKEN_IMAGE_MAP[n.chainId] ??
                                (t.iconUrl || t.icon || ''),
                              balance: '0',
                              string: '0',
                            }
                          : {
                              ...n,
                              type: c.AssetType.token,
                              image: t.iconUrl ?? t.icon ?? '',
                              balance: '',
                              string: undefined,
                            };
                      },
                      [e]
                    );
                  return {
                    filteredTokenListGenerator: (0, r.useCallback)(
                      n =>
                        (function* () {
                          const s = (e, s, r) =>
                            n(e, s, r) &&
                            (!t ||
                              !r ||
                              !(
                                t.symbol === e &&
                                t.address === s &&
                                t.chainId === (0, a.formatChainIdToCaip)(r)
                              ));
                          if (e && S && b && 0 !== Object.keys(b).length) {
                            for (const e of v) {
                              var r, o, i;
                              if (s(e.symbol, e.address ?? undefined, e.chainId))
                                if ((0, a.isNativeAddress)(e.address) || e.isNative)
                                  yield {
                                    symbol: e.symbol,
                                    chainId: e.chainId,
                                    tokenFiatAmount: e.tokenFiatAmount,
                                    decimals: e.decimals,
                                    address: '',
                                    type: c.AssetType.native,
                                    balance: e.balance ?? '0',
                                    string: e.string ?? undefined,
                                    image:
                                      u.CHAIN_ID_TOKEN_IMAGE_MAP[e.chainId] ??
                                      k.MULTICHAIN_TOKEN_IMAGE_MAP[e.chainId] ??
                                      ((null === (r = (0, a.getNativeAssetForChainId)(e.chainId)) ||
                                      void 0 === r
                                        ? void 0
                                        : r.icon) ||
                                        (null ===
                                          (o = (0, a.getNativeAssetForChainId)(e.chainId)) ||
                                        void 0 === o
                                          ? void 0
                                          : o.iconUrl) ||
                                        (0, y.getAssetImageUrl)(
                                          e.address,
                                          (0, a.formatChainIdToCaip)(e.chainId)
                                        )),
                                  };
                                else
                                  yield {
                                    symbol: e.symbol,
                                    chainId: e.chainId,
                                    tokenFiatAmount: e.tokenFiatAmount,
                                    decimals: e.decimals,
                                    address: e.address,
                                    type: c.AssetType.token,
                                    balance: e.balance ?? '',
                                    string: e.string ?? undefined,
                                    image:
                                      (e.image ||
                                        (null == b ||
                                        null === (i = b[e.address.toLowerCase()]) ||
                                        void 0 === i
                                          ? void 0
                                          : i.iconUrl)) ??
                                      (0, y.getAssetImageUrl)(
                                        e.address,
                                        (0, a.formatChainIdToCaip)(e.chainId)
                                      ) ??
                                      '',
                                  };
                            }
                            for (const t of S) {
                              const n = null == b ? void 0 : b[t.address],
                                r = _(n);
                              r && s(r.symbol, r.address ?? undefined, e) && r && (yield r);
                            }
                            for (const t of Object.values(b)) {
                              const n = _(t);
                              n &&
                                !n.symbol.includes('$') &&
                                s(n.symbol, n.address ?? undefined, e) &&
                                n &&
                                (yield n);
                            }
                          }
                        })(),
                      [_, v, S, e, b, t]
                    ),
                    isLoading: w || C,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/bridge/useTokensWithFiltering.ts' },
    ],
    [
      6944,
      { './useAccountSyncing': 6945 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'useAccountSyncing', {
                    enumerable: !0,
                    get: function () {
                      return s.useAccountSyncing;
                    },
                  }),
                  Object.defineProperty(n, 'useDeleteAccountSyncingDataFromUserStorage', {
                    enumerable: !0,
                    get: function () {
                      return s.useDeleteAccountSyncingDataFromUserStorage;
                    },
                  }),
                  Object.defineProperty(n, 'useShouldDispatchAccountSyncing', {
                    enumerable: !0,
                    get: function () {
                      return s.useShouldDispatchAccountSyncing;
                    },
                  });
                var s = e('./useAccountSyncing');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAccountSyncing/index.ts' },
    ],
    [
      6945,
      {
        '../../../ducks/metamask/metamask': 6860,
        '../../../selectors': 7601,
        '../../../selectors/identity/authentication': 7599,
        '../../../selectors/identity/profile-syncing': 7600,
        '../../../store/actions': 7619,
        loglevel: 4929,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useShouldDispatchAccountSyncing =
                    n.useDeleteAccountSyncingDataFromUserStorage =
                    n.useAccountSyncing =
                      void 0);
                var s,
                  r = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  o = e('react'),
                  a = e('react-redux'),
                  i = e('../../../store/actions'),
                  c = e('../../../selectors/identity/profile-syncing'),
                  u = e('../../../selectors'),
                  l = e('../../../ducks/metamask/metamask'),
                  d = e('../../../selectors/identity/authentication');
                const p = () => {
                  const e = (0, a.useSelector)(c.selectIsAccountSyncingReadyToBeDispatched),
                    t = (0, a.useSelector)(c.selectIsProfileSyncingEnabled),
                    n = (0, a.useSelector)(u.getUseExternalServices),
                    s = (0, a.useSelector)(l.getIsUnlocked),
                    r = (0, a.useSelector)(d.selectIsSignedIn),
                    o = (0, a.useSelector)(l.getCompletedOnboarding);
                  return Boolean(n && t && s && r && o && e);
                };
                n.useShouldDispatchAccountSyncing = p;
                n.useAccountSyncing = () => {
                  const e = (0, a.useDispatch)(),
                    t = p(),
                    n = (0, o.useCallback)(() => {
                      try {
                        if (!t) return;
                        e((0, i.syncInternalAccountsWithUserStorage)());
                      } catch (e) {
                        r.default.error(e);
                      }
                    }, [e, t]);
                  return { dispatchAccountSyncing: n, shouldDispatchAccountSyncing: t };
                };
                n.useDeleteAccountSyncingDataFromUserStorage = () => {
                  const e = (0, a.useDispatch)();
                  return {
                    dispatchDeleteAccountSyncingData: (0, o.useCallback)(async () => {
                      try {
                        await e((0, i.deleteAccountSyncingDataFromUserStorage)());
                      } catch {}
                    }, []),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAccountSyncing/useAccountSyncing.ts' },
    ],
    [
      6946,
      {
        './useAutoSignIn': 6947,
        './useAutoSignOut': 6948,
        './useSignIn': 6949,
        './useSignOut': 6950,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'useAutoSignIn', {
                    enumerable: !0,
                    get: function () {
                      return o.useAutoSignIn;
                    },
                  }),
                  Object.defineProperty(n, 'useAutoSignOut', {
                    enumerable: !0,
                    get: function () {
                      return a.useAutoSignOut;
                    },
                  }),
                  Object.defineProperty(n, 'useSignIn', {
                    enumerable: !0,
                    get: function () {
                      return s.useSignIn;
                    },
                  }),
                  Object.defineProperty(n, 'useSignOut', {
                    enumerable: !0,
                    get: function () {
                      return r.useSignOut;
                    },
                  });
                var s = e('./useSignIn'),
                  r = e('./useSignOut'),
                  o = e('./useAutoSignIn'),
                  a = e('./useAutoSignOut');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAuthentication/index.ts' },
    ],
    [
      6947,
      {
        '../../../ducks/metamask/metamask': 6860,
        '../../../selectors': 7601,
        '../../../selectors/identity/authentication': 7599,
        '../../../selectors/identity/profile-syncing': 7600,
        '../../../selectors/metamask-notifications/metamask-notifications': 7602,
        './useSignIn': 6949,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAutoSignIn = function () {
                    const { signIn: e } = (0, l.useSignIn)(),
                      t = Boolean((0, r.useSelector)(o.getIsUnlocked)),
                      n = Boolean((0, r.useSelector)(a.getUseExternalServices)),
                      d = Boolean((0, r.useSelector)(o.getCompletedOnboarding)),
                      p = (0, r.useSelector)(i.selectIsSignedIn),
                      m = (0, s.useMemo)(() => !p && t && n && d, [p, t, n, d]),
                      h = (0, r.useSelector)(c.selectIsProfileSyncingEnabled),
                      f = (0, r.useSelector)(a.getParticipateInMetaMetrics),
                      g = (0, r.useSelector)(u.selectIsMetamaskNotificationsEnabled),
                      y = (0, s.useMemo)(() => h || f || g, [h, f, g]),
                      k = (0, s.useMemo)(() => m && y, [m, y]);
                    return {
                      autoSignIn: (0, s.useCallback)(async () => {
                        k && (await e());
                      }, [k, e]),
                      shouldAutoSignIn: k,
                    };
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../../ducks/metamask/metamask'),
                  a = e('../../../selectors'),
                  i = e('../../../selectors/identity/authentication'),
                  c = e('../../../selectors/identity/profile-syncing'),
                  u = e('../../../selectors/metamask-notifications/metamask-notifications'),
                  l = e('./useSignIn');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAuthentication/useAutoSignIn.ts' },
    ],
    [
      6948,
      {
        '../../../ducks/metamask/metamask': 6860,
        '../../../selectors': 7601,
        '../../../selectors/identity/authentication': 7599,
        './useSignOut': 6950,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAutoSignOut = function () {
                    const { signOut: e } = (0, c.useSignOut)(),
                      t = Boolean((0, r.useSelector)(o.getIsUnlocked)),
                      n = Boolean((0, r.useSelector)(a.getUseExternalServices)),
                      u = (0, r.useSelector)(i.selectIsSignedIn),
                      l = (0, s.useMemo)(() => u && t && !n, [u, t, n]),
                      d = (0, s.useMemo)(() => l, [l]);
                    return {
                      autoSignOut: (0, s.useCallback)(async () => {
                        d && (await e());
                      }, [d, e]),
                      shouldAutoSignOut: d,
                    };
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../../ducks/metamask/metamask'),
                  a = e('../../../selectors'),
                  i = e('../../../selectors/identity/authentication'),
                  c = e('./useSignOut');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAuthentication/useAutoSignOut.ts' },
    ],
    [
      6949,
      {
        '../../../selectors/identity/authentication': 7599,
        '../../../store/actions': 7619,
        loglevel: 4929,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSignIn = function () {
                    const e = (0, o.useDispatch)(),
                      t = (0, o.useSelector)(i.selectIsSignedIn),
                      n = (0, r.useMemo)(() => !t, [t]);
                    return {
                      signIn: (0, r.useCallback)(async () => {
                        if (n)
                          try {
                            await e((0, c.performSignIn)());
                          } catch (e) {
                            const t = e instanceof Error ? e.message : JSON.stringify(e ?? '');
                            a.default.error(t);
                          }
                      }, [e, n]),
                    };
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  i = e('../../../selectors/identity/authentication'),
                  c = e('../../../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAuthentication/useSignIn.ts' },
    ],
    [
      695,
      { './lib': 706, '@ngraveio/bc-ur': 3014 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.RegistryItem = void 0);
                const s = e('@ngraveio/bc-ur'),
                  r = e('./lib');
                n.RegistryItem = class {
                  constructor() {
                    (this.toCBOR = () => {
                      if (this.toDataItem() === undefined)
                        throw new Error(
                          `#[ur-registry][RegistryItem][fn.toCBOR]: registry ${this.getRegistryType()}'s method toDataItem returns undefined`
                        );
                      return (0, r.encodeDataItem)(this.toDataItem());
                    }),
                      (this.toUR = () => new s.UR(this.toCBOR(), this.getRegistryType().getType())),
                      (this.toUREncoder = (e, t, n) => {
                        const r = this.toUR();
                        return new s.UREncoder(r, e, t, n);
                      });
                  }
                };
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/RegistryItem.js',
      },
    ],
    [
      6950,
      {
        '../../../selectors/identity/authentication': 7599,
        '../../../store/actions': 7619,
        loglevel: 4929,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSignOut = function () {
                    const e = (0, o.useDispatch)(),
                      t = (0, o.useSelector)(i.selectIsSignedIn),
                      n = (0, r.useMemo)(() => Boolean(t), [t]);
                    return {
                      signOut: (0, r.useCallback)(async () => {
                        if (n)
                          try {
                            await e((0, c.performSignOut)());
                          } catch (e) {
                            const t = e instanceof Error ? e.message : JSON.stringify(e ?? '');
                            a.default.error(t);
                          }
                      }, [e, n]),
                    };
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  i = e('../../../selectors/identity/authentication'),
                  c = e('../../../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useAuthentication/useSignOut.ts' },
    ],
    [
      6951,
      { './useProfileSyncing': 6952 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'useDisableProfileSyncing', {
                    enumerable: !0,
                    get: function () {
                      return s.useDisableProfileSyncing;
                    },
                  }),
                  Object.defineProperty(n, 'useEnableProfileSyncing', {
                    enumerable: !0,
                    get: function () {
                      return s.useEnableProfileSyncing;
                    },
                  });
                var s = e('./useProfileSyncing');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useProfileSyncing/index.ts' },
    ],
    [
      6952,
      { '../../../store/actions': 7619, loglevel: 4929, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDisableProfileSyncing = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      disableProfileSyncing: (0, r.useCallback)(async () => {
                        n(null);
                        try {
                          await e((0, i.disableProfileSyncing)());
                        } catch (e) {
                          const t = e instanceof Error ? e.message : JSON.stringify(e ?? '');
                          n(t), a.default.error(t);
                        } finally {
                          e((0, i.hideLoadingIndication)());
                        }
                      }, [e]),
                      error: t,
                    };
                  }),
                  (n.useEnableProfileSyncing = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      enableProfileSyncing: (0, r.useCallback)(async () => {
                        n(null);
                        try {
                          await e((0, i.enableProfileSyncing)());
                        } catch (e) {
                          const t = e instanceof Error ? e.message : JSON.stringify(e ?? '');
                          a.default.error(t), n(t);
                        }
                      }, [e]),
                      error: t,
                    };
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  i = e('../../../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/identity/useProfileSyncing/useProfileSyncing.ts' },
    ],
    [
      6953,
      {
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useReadNotificationsCounter = function () {
                    const { readSnapNotificationsCount: e } = o(),
                      { featureAnnouncementsReadCount: t } = a(),
                      { onChainMetamaskNotificationsReadCount: n } = i();
                    return { notificationsReadCount: e + t + n };
                  }),
                  (n.useUnreadNotificationsCounter = function () {
                    const { unreadSnapNotificationsCount: e } = o(),
                      { featureAnnouncementsUnreadCount: t } = a(),
                      { onChainMetamaskNotificationsUnreadCount: n } = i();
                    return { notificationsUnreadCount: e + t + n };
                  });
                var s = e('react-redux'),
                  r = e('../../selectors/metamask-notifications/metamask-notifications');
                const o = () => ({
                    unreadSnapNotificationsCount: (0, s.useSelector)(
                      r.getSnapNotificationsUnreadCount
                    ),
                    readSnapNotificationsCount: (0, s.useSelector)(r.getSnapNotificationsReadCount),
                  }),
                  a = () => {
                    const e = (0, s.useSelector)(r.selectIsFeatureAnnouncementsEnabled),
                      t = (0, s.useSelector)(r.getFeatureAnnouncementsUnreadCount),
                      n = (0, s.useSelector)(r.getFeatureAnnouncementsReadCount);
                    return e
                      ? { featureAnnouncementsUnreadCount: t, featureAnnouncementsReadCount: n }
                      : { featureAnnouncementsUnreadCount: 0, featureAnnouncementsReadCount: 0 };
                  },
                  i = () => {
                    const e = (0, s.useSelector)(r.selectIsMetamaskNotificationsEnabled),
                      t = (0, s.useSelector)(r.getOnChainMetamaskNotificationsUnreadCount),
                      n = (0, s.useSelector)(r.getOnChainMetamaskNotificationsReadCount);
                    return e
                      ? {
                          onChainMetamaskNotificationsUnreadCount: t,
                          onChainMetamaskNotificationsReadCount: n,
                        }
                      : {
                          onChainMetamaskNotificationsUnreadCount: 0,
                          onChainMetamaskNotificationsReadCount: 0,
                        };
                  };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/metamask-notifications/useCounter.tsx' },
    ],
    [
      6954,
      { '../../store/actions': 7619, loglevel: 4929, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useCreateNotifications = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      createNotifications: (0, r.useCallback)(async () => {
                        n(null);
                        try {
                          await e((0, i.createOnChainTriggers)());
                        } catch (e) {
                          throw (
                            (n(e instanceof Error ? e.message : 'An unexpected error occurred'),
                            a.default.error(e),
                            e)
                          );
                        }
                      }, [e]),
                      error: t,
                    };
                  }),
                  (n.useDisableNotifications = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      disableNotifications: (0, r.useCallback)(async () => {
                        n(null);
                        try {
                          await e((0, i.disableMetamaskNotifications)());
                        } catch (e) {
                          throw (
                            (n(e instanceof Error ? e.message : 'An unexpected error occurred'),
                            a.default.error(e),
                            e)
                          );
                        }
                      }, [e]),
                      error: t,
                    };
                  }),
                  (n.useEnableNotifications = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      enableNotifications: (0, r.useCallback)(async () => {
                        n(null);
                        try {
                          await e((0, i.enableMetamaskNotifications)());
                        } catch (e) {
                          throw (
                            (n(e instanceof Error ? e.message : 'An unexpected error occurred'),
                            a.default.error(e),
                            e)
                          );
                        }
                      }, [e]),
                      error: t,
                    };
                  }),
                  (n.useListNotifications = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(!1),
                      [s, c] = (0, r.useState)(null),
                      [u, l] = (0, r.useState)(undefined);
                    return {
                      listNotifications: (0, r.useCallback)(async () => {
                        n(!0), c(null);
                        const t = new URLSearchParams(window.location.search).get('previewToken');
                        try {
                          const n = await e(
                            (0, i.fetchAndUpdateMetamaskNotifications)(t ?? undefined)
                          );
                          return l(n), n;
                        } catch (e) {
                          throw (
                            (a.default.error(e),
                            c(e instanceof Error ? e.message : 'An unexpected error occurred'),
                            e)
                          );
                        } finally {
                          n(!1);
                        }
                      }, [e]),
                      notificationsData: u,
                      isLoading: t,
                      error: s,
                    };
                  }),
                  (n.useMarkNotificationAsRead = function () {
                    const e = (0, o.useDispatch)();
                    return {
                      markNotificationAsRead: (0, r.useCallback)(
                        async t => {
                          try {
                            e((0, i.markMetamaskNotificationsAsRead)(t));
                          } catch (e) {
                            throw (a.default.error(e), e);
                          }
                        },
                        [e]
                      ),
                    };
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  i = e('../../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/metamask-notifications/useNotifications.ts' },
    ],
    [
      6955,
      {
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../../store/actions': 7619,
        loglevel: 4929,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAccountSettingsProps = function (e) {
                    const t = (0, o.useSelector)(c.getIsUpdatingMetamaskNotificationsAccount),
                      n = (0, o.useSelector)(c.selectIsMetamaskNotificationsEnabled),
                      s = (function () {
                        const e = (0, o.useDispatch)(),
                          t = (0, r.useCallback)(async t => {
                            try {
                              return await e((0, i.checkAccountsPresence)(t));
                            } catch {
                              return {};
                            }
                          }, []);
                        return t;
                      })(),
                      [a, u] = (0, r.useState)({}),
                      [l, d] = (0, r.useState)(!1),
                      [p, m] = (0, r.useState)(null),
                      h = (0, r.useMemo)(() => JSON.stringify(e), [e]),
                      f = (0, r.useCallback)(async e => {
                        try {
                          d(!0), m(null);
                          const t = await s(e);
                          u(t);
                        } catch {
                          m('Failed to get account settings');
                        } finally {
                          d(!1);
                        }
                      }, []);
                    return (
                      (0, r.useEffect)(() => {
                        if (!n) return;
                        const e = JSON.parse(h);
                        f(e);
                      }, [h, s, n]),
                      { data: a, initialLoading: l, error: p, accountsBeingUpdated: t, update: f }
                    );
                  }),
                  (n.useSwitchAccountNotificationsChange = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      onChange: (0, r.useCallback)(
                        async (t, s) => {
                          n(null);
                          try {
                            s
                              ? await e((0, i.updateOnChainTriggersByAccount)(t))
                              : await e((0, i.deleteOnChainTriggersByAccount)(t));
                          } catch (e) {
                            const t = e instanceof Error ? e.message : JSON.stringify(e ?? '');
                            a.default.error(t), n(t);
                          }
                          e((0, i.hideLoadingIndication)());
                        },
                        [e]
                      ),
                      error: t,
                    };
                  }),
                  (n.useSwitchFeatureAnnouncementsChange = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(null);
                    return {
                      onChange: (0, r.useCallback)(
                        async t => {
                          n(null);
                          try {
                            await e((0, i.setFeatureAnnouncementsEnabled)(t));
                          } catch (e) {
                            const t = e instanceof Error ? e.message : JSON.stringify(e ?? '');
                            n(t);
                          }
                        },
                        [e]
                      ),
                      error: t,
                    };
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  i = e('../../store/actions'),
                  c = e('../../selectors/metamask-notifications/metamask-notifications');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/metamask-notifications/useSwitchNotifications.ts' },
    ],
    [
      6956,
      {
        '../../selectors': 7601,
        '../../selectors/accounts': 7592,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useHdKeyringsWithSnapAccounts = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../selectors/accounts'),
                  a = e('../../selectors');
                n.useHdKeyringsWithSnapAccounts = () => {
                  const e = (0, r.useSelector)(a.getMetaMaskHdKeyrings),
                    t = (0, r.useSelector)(o.getInternalAccounts);
                  return (0, s.useMemo)(
                    () =>
                      e.map(e => {
                        const n = t
                          .filter(t => {
                            var n;
                            return (
                              (null === (n = t.options) || void 0 === n
                                ? void 0
                                : n.entropySource) === e.metadata.id
                            );
                          })
                          .map(e => e.address);
                        return { ...e, accounts: [...e.accounts, ...n] };
                      }),
                    [e, t]
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/multi-srp/useHdKeyringsWithSnapAccounts.ts' },
    ],
    [
      6957,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../selectors': 7601,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = n.RampsMetaMaskEntry = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../../../shared/modules/selectors/networks'),
                  a = e('../../../selectors');
                let i = (n.RampsMetaMaskEntry = (function (e) {
                  return (
                    (e.BuySellButton = 'ext_buy_sell_button'),
                    (e.NftBanner = 'ext_buy_banner_nfts'),
                    (e.TokensBanner = 'ext_buy_banner_tokens'),
                    (e.ActivityBanner = 'ext_buy_banner_activity'),
                    (e.BtcBanner = 'ext_buy_banner_btc'),
                    e
                  );
                })({}));
                n.default = (e = i.BuySellButton) => {
                  const t = (0, r.useSelector)(o.getCurrentChainId),
                    n = (0, r.useSelector)(a.getMetaMetricsId),
                    c = (0, r.useSelector)(a.getParticipateInMetaMetrics),
                    u = (0, r.useSelector)(a.getDataCollectionForMarketing),
                    l = (0, s.useCallback)(
                      t => {
                        try {
                          const s = new URLSearchParams();
                          s.set('metamaskEntry', e),
                            s.set('chainId', t),
                            n && s.set('metametricsId', n),
                            s.set('metricsEnabled', String(c)),
                            u && s.set('marketingEnabled', String(u));
                          const r = new URL('https://portfolio.metamask.io');
                          return (r.pathname = 'buy'), (r.search = s.toString()), r.toString();
                        } catch {
                          return 'https://portfolio.metamask.io/buy';
                        }
                      },
                      [n]
                    );
                  return {
                    openBuyCryptoInPdapp: (0, s.useCallback)(
                      e => {
                        const n = l(e || t);
                        global.platform.openTab({ url: n });
                      },
                      [t]
                    ),
                    getBuyURI: l,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/ramps/useRamps/useRamps.ts' },
    ],
    [
      6958,
      {
        '../../../shared/modules/conversion.utils': 5858,
        '../../../shared/modules/hexstring-utils': 5864,
        '../../selectors/snaps': 7616,
        '@metamask/utils': 2995,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useDisplayName = void 0);
                var s = e('@metamask/utils'),
                  r = e('react-redux'),
                  o = e('../../selectors/snaps'),
                  a = e('../../../shared/modules/hexstring-utils'),
                  i = e('../../../shared/modules/conversion.utils');
                n.useDisplayName = e => {
                  const {
                      address: t,
                      chain: { namespace: n, reference: c },
                    } = e,
                    u = n === s.KnownCaipNamespace.Eip155,
                    l = u ? (0, a.toChecksumHexAddress)(t) : t,
                    d = (0, r.useSelector)(e => (0, o.getMemoizedAccountName)(e, l)),
                    p = (0, r.useSelector)(e =>
                      (0, o.getAddressBookEntryByNetwork)(
                        e,
                        l,
                        `0x${(0, i.decimalToHex)(u ? c : '0')}`
                      )
                    );
                  return d || (u && (null == p ? void 0 : p.name)) || undefined;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/snaps/useDisplayName.ts' },
    ],
    [
      6959,
      { '../../selectors': 7601, '@metamask/snaps-sdk': 2779, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useInsightSnaps = function (e) {
                    const t = (0, s.useSelector)(t => (0, o.getSnapInsights)(t, e)),
                      n = t ? Object.values(t) : [],
                      a = n.filter(e => e.severity === r.SeverityLevel.Critical);
                    return { data: n, warnings: a };
                  });
                var s = e('react-redux'),
                  r = e('@metamask/snaps-sdk'),
                  o = e('../../selectors');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/snaps/useInsightSnaps.js' },
    ],
    [
      696,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.RegistryTypes = n.RegistryType = void 0);
                class s {
                  constructor(e, t) {
                    (this.type = e),
                      (this.tag = t),
                      (this.getTag = () => this.tag),
                      (this.getType = () => this.type);
                  }
                }
                (n.RegistryType = s),
                  (n.RegistryTypes = {
                    UUID: new s('uuid', 37),
                    BYTES: new s('bytes', undefined),
                    CRYPTO_HDKEY: new s('crypto-hdkey', 303),
                    CRYPTO_KEYPATH: new s('crypto-keypath', 304),
                    CRYPTO_COIN_INFO: new s('crypto-coin-info', 305),
                    CRYPTO_ECKEY: new s('crypto-eckey', 306),
                    CRYPTO_OUTPUT: new s('crypto-output', 308),
                    CRYPTO_PSBT: new s('crypto-psbt', 310),
                    CRYPTO_ACCOUNT: new s('crypto-account', 311),
                    CRYPTO_MULTI_ACCOUNTS: new s('crypto-multi-accounts', 1103),
                    QR_HARDWARE_CALL: new s('qr-hardware-call', 1201),
                    KEY_DERIVATION_CALL: new s('key-derivation-call', 1301),
                    KEY_DERIVATION_SCHEMA: new s('key-derivation-schema', 1302),
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/RegistryType.js',
      },
    ],
    [
      6960,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react');
                n.default = () => {
                  const e = (0, s.useRef)(null),
                    [t, n] = (0, s.useState)(!1);
                  return (
                    (0, s.useEffect)(() => {
                      n(e.current && e.current.offsetHeight < e.current.scrollHeight);
                    }, [e]),
                    { contentRef: e, isOverflowing: t }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/snaps/useIsOverflowing.js' },
    ],
    [
      6961,
      { '../../store/actions': 7619, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useSafeWebsite = void 0);
                var s = e('react'),
                  r = e('../../store/actions');
                n.useSafeWebsite = e => {
                  const [t, n] = (0, s.useState)();
                  return (
                    (0, s.useEffect)(() => {
                      e &&
                        (async () => {
                          (await (0, r.getPhishingResult)(e)).result || n(new URL(e));
                        })();
                    }, [e]),
                    t
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/snaps/useSafeWebsite.ts' },
    ],
    [
      6962,
      { '../../helpers/utils/util': 6921, '@metamask/snaps-utils': 2890, 'react-router-dom': 5313 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react-router-dom'),
                  r = e('@metamask/snaps-utils'),
                  o = e('../../helpers/utils/util');
                n.default = () => {
                  const e = (0, s.useHistory)();
                  return {
                    navigate: t => {
                      let n;
                      const s = (0, r.parseMetaMaskUrl)(t);
                      (n = s.snapId ? (0, o.getSnapRoute)(s.snapId) : s.path), e.push(n);
                    },
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/snaps/useSnapNavigation.ts' },
    ],
    [
      6963,
      { '../../store/actions': 7619, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSnapSettings = function ({ snapId: e }) {
                    const t = (0, r.useDispatch)(),
                      [n, a] = (0, s.useState)(!0),
                      [i, c] = (0, s.useState)(undefined),
                      [u, l] = (0, s.useState)(undefined);
                    return (
                      (0, s.useEffect)(() => {
                        let n = !1;
                        return (
                          e &&
                            (async function (e) {
                              try {
                                l(undefined), a(!0);
                                const s = await (0, o.handleSnapRequest)({
                                  snapId: e,
                                  origin: 'metamask',
                                  handler: 'onSettingsPage',
                                  request: { jsonrpc: '2.0', method: ' ' },
                                });
                                n || (c(s), (0, o.forceUpdateMetamaskState)(t));
                              } catch (e) {
                                n || l(e);
                              } finally {
                                n || a(!1);
                              }
                            })(e),
                          () => {
                            n = !0;
                          }
                        );
                      }, [e]),
                      { data: i, error: u, loading: n }
                    );
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/snaps/useSnapSettings.ts' },
    ],
    [
      6964,
      {
        '../../../shared/constants/swaps': 5815,
        '../../../shared/modules/selectors/networks': 5875,
        '../../ducks/swaps/swaps': 6868,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('lodash'),
                  a = e('../../../shared/modules/selectors/networks'),
                  i = e('../../../shared/constants/swaps'),
                  c = e('../../ducks/swaps/swaps');
                n.default = function () {
                  const e = (0, r.useSelector)(a.getCurrentChainId),
                    t = (0, r.useSelector)(c.getFromToken, o.isEqual),
                    n = (0, s.useMemo)(() => {
                      if (!t) return null;
                      const n = i.SWAPS_CHAINID_DEFAULT_TOKEN_MAP[e] ?? null;
                      return n
                        ? n.address === (null == t ? void 0 : t.address)
                          ? (i.SWAPS_CHAINID_COMMON_TOKEN_PAIR[e] ?? null)
                          : n
                        : null;
                    }, [e, null == t ? void 0 : t.address]);
                  return (
                    n || console.warn(`No Swap default token found for chainId: ${e}`),
                    { defaultToToken: n }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/swap/useSwapDefaultToToken.ts' },
    ],
    [
      6965,
      {
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../helpers/utils/token-util': 6918,
        '../selectors': 7601,
        'ethereumjs-util': 4393,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAccountTotalCrossChainFiatBalance = void 0);
                var s = e('react-redux'),
                  r = e('ethereumjs-util'),
                  o = e('react'),
                  a = e('../ducks/metamask/metamask'),
                  i = e('../selectors'),
                  c = e('../../shared/modules/conversion.utils'),
                  u = e('../helpers/utils/token-util'),
                  l = e('../../shared/modules/selectors/networks');
                n.useAccountTotalCrossChainFiatBalance = (e, t) => {
                  const n = (0, s.useSelector)(l.getNetworkConfigurationsByChainId),
                    d = (0, s.useSelector)(a.getCurrencyRates),
                    p = (0, s.useSelector)(a.getCurrentCurrency),
                    m = (0, s.useSelector)(i.getCrossChainTokenExchangeRates, s.shallowEqual),
                    h = (0, s.useSelector)(i.getCrossChainMetaMaskCachedBalances),
                    f = (0, o.useMemo)(() => ({ ...m }), [m]),
                    g = (0, o.useMemo)(
                      () =>
                        t.map(t => {
                          var s, o;
                          const { tokensWithBalances: a } = t,
                            i = n[t.chainId].nativeCurrency,
                            l =
                              null == d || null === (s = d[i]) || void 0 === s
                                ? void 0
                                : s.conversionRate,
                            m = a.map(e => {
                              var n;
                              const s =
                                null == f || null === (n = f[t.chainId]) || void 0 === n
                                  ? void 0
                                  : n[(0, r.toChecksumAddress)(e.address)];
                              return (0, u.getTokenFiatAmount)(s, l, p, e.string, e.symbol, !1, !1);
                            }),
                            g =
                              (null == h || null === (o = h[t.chainId]) || void 0 === o
                                ? void 0
                                : o[null == e ? void 0 : e.address]) ?? 0,
                            y = (0, c.getValueFromWeiHex)({
                              value: g,
                              toCurrency: p,
                              conversionRate: l,
                              numberOfDecimals: 2,
                            });
                          return { ...t, tokenFiatBalances: m, nativeFiatValue: y };
                        }),
                      [t, n, d, f, h, null == e ? void 0 : e.address, p]
                    );
                  return {
                    totalFiatBalance: (0, o.useMemo)(
                      () =>
                        g.reduce((e, t) => {
                          const n = t.tokenFiatBalances.filter(e => e !== undefined),
                            s = (0, c.sumDecimals)(t.nativeFiatValue, ...n);
                          return e + (s.toNumber ? s.toNumber() : Number(s));
                        }, 0),
                      [g]
                    ).toString(10),
                    tokenFiatBalancesCrossChains: g,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useAccountTotalCrossChainFiatBalance.ts' },
    ],
    [
      6966,
      {
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../helpers/utils/confirm-tx.util': 6899,
        '../helpers/utils/token-util': 6918,
        '../helpers/utils/util': 6921,
        '../selectors': 7601,
        './useTokenBalances': 7010,
        'ethereumjs-util': 4393,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAccountTotalFiatBalance = void 0);
                var s = e('react-redux'),
                  r = e('ethereumjs-util'),
                  o = e('react'),
                  a = e('../../shared/modules/selectors/networks'),
                  i = e('../selectors'),
                  c = e('../../shared/modules/conversion.utils'),
                  u = e('../ducks/metamask/metamask'),
                  l = e('../helpers/utils/confirm-tx.util'),
                  d = e('../helpers/utils/token-util'),
                  p = e('../helpers/utils/util'),
                  m = e('./useTokenBalances');
                n.useAccountTotalFiatBalance = (e, t) => {
                  const n = (0, s.useSelector)(a.getCurrentChainId),
                    h = (0, s.useSelector)(u.getConversionRate),
                    f = (0, s.useSelector)(u.getCurrentCurrency),
                    g = (0, s.useSelector)(i.getTokenExchangeRates, s.shallowEqual),
                    y = (0, s.useSelector)(i.getConfirmationExchangeRates),
                    k = (0, s.useSelector)(i.getMetaMaskCachedBalances),
                    v = (null == k ? void 0 : k[null == e ? void 0 : e.address]) ?? 0,
                    T = (0, c.getValueFromWeiHex)({
                      value: v,
                      toCurrency: f,
                      conversionRate: h,
                      numberOfDecimals: 2,
                    }),
                    b = (0, s.useSelector)(i.getAllTokens),
                    w = (0, o.useMemo)(() => {
                      var t;
                      return (
                        (null == b || null === (t = b[n]) || void 0 === t
                          ? void 0
                          : t[null == e ? void 0 : e.address]) ?? []
                      );
                    }, [null == e ? void 0 : e.address, n, b]),
                    S = (0, s.useSelector)(i.getTokenList),
                    C = (0, s.useSelector)(i.getNativeCurrencyImage),
                    _ = (0, s.useSelector)(u.getNativeCurrency),
                    { tokensWithBalances: E } = (0, m.useTokenTracker)({
                      chainId: n,
                      tokens: w,
                      address: null == e ? void 0 : e.address,
                      hideZeroBalanceTokens: t,
                    }),
                    I = (0, o.useMemo)(() => ({ ...g, ...y }), [y, g]),
                    x = (0, o.useMemo)(
                      () =>
                        E.map(e => {
                          const t = I[(0, r.toChecksumAddress)(e.address)];
                          return (0, d.getTokenFiatAmount)(t, h, f, e.string, e.symbol, !1, !1);
                        }),
                      [E, I, h, f]
                    ),
                    A = (0, o.useMemo)(
                      () =>
                        ((e, t) => {
                          const n = [];
                          return (
                            t.forEach(t => {
                              const s = e[t.address.toLowerCase()];
                              s &&
                                n.push({
                                  ...s,
                                  balance: t.balance,
                                  string: t.string,
                                  balanceError: t.balanceError,
                                });
                            }),
                            n
                          );
                        })(S, E),
                      [S, E]
                    ),
                    M = (0, o.useMemo)(
                      () => [
                        { iconUrl: C, symbol: _, fiatBalance: T },
                        ...A.map((e, t) => ({ ...e, fiatBalance: x[t] })),
                      ],
                      [A, x, C, _, T]
                    ),
                    P = (0, o.useMemo)(
                      () => M.sort((e, t) => parseFloat(t.fiatBalance) - parseFloat(e.fiatBalance)),
                      [M]
                    ),
                    O = (0, c.sumDecimals)(T, ...x).toString(10),
                    N = (0, o.useMemo)(
                      () => (
                        E.forEach(e => {
                          e.string = (0, p.roundToDecimalPlacesRemovingExtraZeroes)(e.string, 5);
                          const t = I[(0, r.toChecksumAddress)(e.address)];
                          e.tokenFiatAmount =
                            (0, d.getTokenFiatAmount)(t, h, f, e.string, e.symbol, !1, !1) || '0';
                        }),
                        E
                      ),
                      [E, I, h, f]
                    ),
                    D = (0, l.formatCurrency)(O, f);
                  let R = (0, c.getWeiHexFromDecimalValue)({
                    value: O,
                    fromCurrency: f,
                    conversionRate: h,
                    invertConversionRate: !0,
                  });
                  return (
                    'NaN' === R && (R = '0x0'),
                    {
                      formattedFiat: D,
                      totalWeiBalance: R,
                      totalFiatBalance: O,
                      tokensWithBalances: N,
                      loading: !1,
                      orderedTokenList: P,
                      mergedRates: I,
                    }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useAccountTotalFiatBalance.js' },
    ],
    [
      6967,
      {
        '../ducks/metamask/metamask': 6860,
        '../selectors': 7601,
        '../store/actions': 7619,
        './useMultiPolling': 6990,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../store/actions'),
                  i = e('../ducks/metamask/metamask'),
                  c = (s = e('./useMultiPolling')) && s.__esModule ? s : { default: s };
                n.default = () => {
                  const e = (0, r.useSelector)(o.getNetworkClientIdsToPoll),
                    t = (0, r.useSelector)(i.getCompletedOnboarding),
                    n = (0, r.useSelector)(i.getIsUnlocked),
                    s = t && n;
                  (0, c.default)({
                    startPolling: a.accountTrackerStartPolling,
                    stopPollingByPollingToken: a.accountTrackerStopPollingByPollingToken,
                    input: s ? e : [],
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useAccountTrackerPolling.ts' },
    ],
    [
      6968,
      {
        '../ducks/confirm-alerts/confirm-alerts': 6852,
        '../helpers/constants/design-system': 6872,
        '../selectors/alerts': 7593,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react-redux'),
                  r = e('react'),
                  o = e('../selectors/alerts'),
                  a = e('../ducks/confirm-alerts/confirm-alerts'),
                  i = e('../helpers/constants/design-system');
                function c(e) {
                  const t = {
                    [i.Severity.Danger]: 3,
                    [i.Severity.Warning]: 2,
                    [i.Severity.Info]: 1,
                  };
                  return e.sort((e, n) => t[n.severity] - t[e.severity]);
                }
                n.default = e => {
                  const t = (0, s.useDispatch)(),
                    n = c((0, s.useSelector)(t => (0, o.selectAlerts)(t, e))),
                    u = (0, s.useSelector)(t => (0, o.selectConfirmedAlertKeys)(t, e)),
                    l = c((0, s.useSelector)(t => (0, o.selectGeneralAlerts)(t, e))),
                    d = c((0, s.useSelector)(t => (0, o.selectFieldAlerts)(t, e))),
                    p = (0, r.useCallback)(e => (e ? n.filter(t => t.field === e) : []), [n]),
                    m = (0, r.useCallback)(
                      (n, s) => {
                        t((0, a.setAlertConfirmed)(e, n, s));
                      },
                      [t, a.setAlertConfirmed, e]
                    ),
                    h = (0, r.useCallback)(e => u.includes(e), [u]),
                    f = n.filter(e => !h(e.key) && e.severity === i.Severity.Danger),
                    g = n.length > 0,
                    y = n.filter(e => e.severity === i.Severity.Danger),
                    k = f.length > 0,
                    v = d.filter(e => !h(e.key) && e.severity === i.Severity.Danger);
                  return {
                    alerts: n,
                    fieldAlerts: d,
                    generalAlerts: l,
                    getFieldAlerts: p,
                    hasAlerts: g,
                    dangerAlerts: y,
                    hasDangerAlerts: (null == y ? void 0 : y.length) > 0,
                    hasUnconfirmedDangerAlerts: k,
                    isAlertConfirmed: h,
                    setAlertConfirmed: m,
                    unconfirmedDangerAlerts: f,
                    unconfirmedFieldDangerAlerts: v,
                    hasUnconfirmedFieldDangerAlerts: v.length > 0,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useAlerts.ts' },
    ],
    [
      6969,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.RESULT_PENDING = n.RESULT_IDLE = n.RESULT_BASE = void 0),
                  (n.createErrorResult = c),
                  (n.createSuccessResult = i),
                  (n.useAsyncCallback = u),
                  (n.useAsyncResult = l),
                  (n.useAsyncResultOrThrow = function (e, t = []) {
                    const n = l(e, t);
                    if ('error' === n.status) throw n.error;
                    return n;
                  });
                var s = e('react');
                const r = (n.RESULT_BASE = {
                    idle: !1,
                    pending: !1,
                    value: undefined,
                    error: undefined,
                  }),
                  o = (n.RESULT_IDLE = { ...r, status: 'idle', idle: !0 }),
                  a = (n.RESULT_PENDING = { ...r, status: 'pending', pending: !0 });
                function i(e) {
                  return { ...r, status: 'success', value: e };
                }
                function c(e) {
                  return { ...r, status: 'error', error: e };
                }
                function u(e, t = []) {
                  const [n, r] = (0, s.useState)(o),
                    u = (0, s.useRef)(!0);
                  (0, s.useEffect)(
                    () => () => {
                      u.current = !1;
                    },
                    []
                  );
                  return [
                    (0, s.useCallback)(async () => {
                      if (u.current) {
                        r(a);
                        try {
                          const t = await e();
                          u.current && r(i(t));
                        } catch (e) {
                          u.current && r(c(e));
                        }
                      }
                    }, t),
                    n,
                  ];
                }
                function l(e, t = []) {
                  const [n, r] = u(e, t);
                  return (
                    (0, s.useEffect)(() => {
                      n();
                    }, [n]),
                    'idle' === r.status ? a : r
                  );
                }
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useAsync.ts' },
    ],
    [
      697,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ScriptExpressions = n.ScriptExpression = void 0);
                class s {
                  constructor(e, t) {
                    (this.tag = e),
                      (this.expression = t),
                      (this.getTag = () => this.tag),
                      (this.getExpression = () => this.expression);
                  }
                }
                (n.ScriptExpression = s),
                  (s.fromTag = e => Object.values(n.ScriptExpressions).find(t => t.getTag() === e)),
                  (n.ScriptExpressions = {
                    SCRIPT_HASH: new s(400, 'sh'),
                    WITNESS_SCRIPT_HASH: new s(401, 'wsh'),
                    PUBLIC_KEY: new s(402, 'pk'),
                    PUBLIC_KEY_HASH: new s(403, 'pkh'),
                    WITNESS_PUBLIC_KEY_HASH: new s(404, 'wpkh'),
                    COMBO: new s(405, 'combo'),
                    MULTISIG: new s(406, 'multi'),
                    SORTED_MULTISIG: new s(407, 'sortedmulti'),
                    ADDRESS: new s(307, 'addr'),
                    RAW_SCRIPT: new s(408, 'raw'),
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/ScriptExpression.js',
      },
    ],
    [
      6970,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ZERO_BALANCE =
                    n.SWEEPSTAKES_START =
                    n.SWEEPSTAKES_SLIDE =
                    n.SWEEPSTAKES_END =
                    n.REMOTE_MODE_SLIDE =
                    n.FUND_SLIDE =
                    n.CASH_SLIDE =
                    n.CARD_SLIDE =
                    n.BRIDGE_SLIDE =
                      void 0);
                (n.REMOTE_MODE_SLIDE = {
                  id: 'remoteMode',
                  title: 'slideRemoteModeTitle',
                  description: 'slideRemoteModeDescription',
                  image: './images/slide-fund-icon.svg',
                  href: '/home.html#remote',
                }),
                  (n.SWEEPSTAKES_SLIDE = {
                    id: 'sweepStake',
                    title: 'slideSweepStakeTitle',
                    description: 'slideSweepStakeDescription',
                    image: './images/sweepstakes.png',
                    href: 'https://portfolio.metamask.io/explore/nfts?event=012e19e2',
                  }),
                  (n.FUND_SLIDE = {
                    id: 'fund',
                    title: 'slideFundWalletTitle',
                    description: 'slideFundWalletDescription',
                    image: './images/slide-fund-icon.svg',
                    href: 'https://portfolio.metamask.io/buy/build-quote',
                  }),
                  (n.BRIDGE_SLIDE = {
                    id: 'bridge',
                    title: 'slideBridgeTitle',
                    description: 'slideBridgeDescription',
                    image: './images/slide-bridge-icon.svg',
                  }),
                  (n.CARD_SLIDE = {
                    id: 'card',
                    title: 'slideDebitCardTitle',
                    description: 'slideDebitCardDescription',
                    image: './images/slide-card-icon.svg',
                    href: 'https://portfolio.metamask.io/card',
                  }),
                  (n.CASH_SLIDE = {
                    id: 'cash',
                    title: 'slideCashOutTitle',
                    description: 'slideCashOutDescription',
                    image: './images/slide-sell-icon.svg',
                    href: 'https://portfolio.metamask.io/sell',
                  }),
                  (n.ZERO_BALANCE = '0x0'),
                  (n.SWEEPSTAKES_START = new Date('2025-04-09T00:00:00Z')),
                  (n.SWEEPSTAKES_END = new Date('2025-04-28T23:59:59Z'));
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useCarouselManagement/constants.ts' },
    ],
    [
      6971,
      { './constants': 6970, './useCarouselManagement': 6972 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var s = e('./useCarouselManagement');
                Object.keys(s).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === s[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return s[e];
                        },
                      }));
                });
                var r = e('./constants');
                Object.keys(r).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === r[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return r[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useCarouselManagement/index.ts' },
    ],
    [
      6972,
      {
        '../../selectors': 7601,
        '../../selectors/remote-mode': 7610,
        '../../store/actions': 7619,
        './constants': 6970,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getSweepstakesCampaignActive = l),
                  (n.useCarouselManagement = void 0);
                var s = e('lodash'),
                  r = e('react'),
                  o = e('react-redux'),
                  a = e('../../store/actions'),
                  i = e('../../selectors'),
                  c = e('../../selectors/remote-mode'),
                  u = e('./constants');
                function l(e) {
                  return e >= u.SWEEPSTAKES_START && e <= u.SWEEPSTAKES_END;
                }
                n.useCarouselManagement = ({ testDate: e } = {}) => {
                  const t = Boolean(!1),
                    n = (0, o.useDispatch)(),
                    d = (0, o.useSelector)(i.getSlides),
                    p = (0, o.useSelector)(i.getSelectedAccountCachedBalance),
                    m = (0, o.useSelector)(c.getIsRemoteModeEnabled),
                    h = p === u.ZERO_BALANCE;
                  return (
                    (0, r.useEffect)(() => {
                      const r = [],
                        o = d.find(e => e.id === u.SWEEPSTAKES_SLIDE.id),
                        i = (null == o ? void 0 : o.dismissed) ?? !1,
                        c = { ...u.FUND_SLIDE, undismissable: h };
                      r.push(u.BRIDGE_SLIDE),
                        r.push(u.CARD_SLIDE),
                        r.push(u.CASH_SLIDE),
                        r.splice(h ? 0 : 2, 0, c),
                        m && r.unshift(u.REMOTE_MODE_SLIDE);
                      const p = l(e ? new Date(e) : new Date(new Date().toISOString()));
                      if (t || !p || i) {
                        if (null != o && o.dismissed) {
                          const e = { ...u.SWEEPSTAKES_SLIDE, dismissed: !0 };
                          r.push(e);
                        }
                      } else {
                        const e = { ...u.SWEEPSTAKES_SLIDE, dismissed: !1 };
                        r.unshift(e);
                      }
                      (0, s.isEqual)(d, r) || n((0, a.updateSlides)(r));
                    }, [n, h, m, d, e, t]),
                    { slides: d }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useCarouselManagement/useCarouselManagement.ts' },
    ],
    [
      6973,
      {
        '../../shared/constants/copy': 5792,
        '../../shared/constants/time': 5817,
        './useTimeout': 7009,
        'copy-to-clipboard': 4209,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useCopyToClipboard = function (e = u) {
                    const [t, n] = (0, r.useState)(!1),
                      s = (0, c.useTimeout)(
                        () => {
                          (0, o.default)(' ', i.COPY_OPTIONS), n(!1);
                        },
                        e,
                        !1
                      ),
                      a = (0, r.useCallback)(
                        e => {
                          n(!0), s(), (0, o.default)(e, i.COPY_OPTIONS);
                        },
                        [s]
                      );
                    return [t, a];
                  });
                var s,
                  r = e('react'),
                  o = (s = e('copy-to-clipboard')) && s.__esModule ? s : { default: s },
                  a = e('../../shared/constants/time'),
                  i = e('../../shared/constants/copy'),
                  c = e('./useTimeout');
                const u = a.MINUTE;
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useCopyToClipboard.js' },
    ],
    [
      6975,
      {
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../selectors': 7601,
        '../store/actions': 7619,
        './usePolling': 7001,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../../shared/modules/selectors/networks'),
                  i = e('../store/actions'),
                  c = e('../ducks/metamask/metamask'),
                  u = (s = e('./usePolling')) && s.__esModule ? s : { default: s };
                n.default = () => {
                  const e = (0, r.useSelector)(o.getUseCurrencyRateCheck),
                    t = (0, r.useSelector)(c.getCompletedOnboarding),
                    n = (0, r.useSelector)(c.getIsUnlocked),
                    s = (0, r.useSelector)(a.getNetworkConfigurationsByChainId),
                    l = t && n && e,
                    d = [...new Set(Object.values(s).map(e => e.nativeCurrency))];
                  (0, u.default)({
                    startPolling: i.currencyRateStartPolling,
                    stopPollingByPollingToken: i.currencyRateStopPollingByPollingToken,
                    input: d,
                    enabled: l,
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useCurrencyRatePolling.ts' },
    ],
    [
      6976,
      {
        '../../shared/constants/swaps': 5815,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/string-utils': 5878,
        '../ducks/metamask/metamask': 6860,
        '../helpers/constants/routes': 6878,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useCurrentAsset = function () {
                    var e;
                    const t = (0, r.useRouteMatch)({
                        path: `${i.ASSET_ROUTE}/:asset`,
                        exact: !0,
                        strict: !0,
                      }),
                      n = null == t || null === (e = t.params) || void 0 === e ? void 0 : e.asset,
                      l = (0, s.useSelector)(o.getTokens),
                      d = n && l.find(({ address: e }) => (0, u.isEqualCaseInsensitive)(e, n)),
                      p = (0, s.useSelector)(a.getCurrentChainId);
                    return d ?? (c.SWAPS_CHAINID_DEFAULT_TOKEN_MAP[p] || c.ETH_SWAPS_TOKEN_OBJECT);
                  });
                var s = e('react-redux'),
                  r = e('react-router-dom'),
                  o = e('../ducks/metamask/metamask'),
                  a = e('../../shared/modules/selectors/networks'),
                  i = e('../helpers/constants/routes'),
                  c = e('../../shared/constants/swaps'),
                  u = e('../../shared/modules/string-utils');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useCurrentAsset.js' },
    ],
    [
      6977,
      {
        '../../shared/constants/first-party-contracts': 5794,
        '../../shared/modules/hexstring-utils': 5864,
        '../ducks/domains': 6854,
        '../selectors': 7601,
        '../selectors/nft': 7607,
        './useName': 6995,
        './useNftCollectionsMetadata': 6996,
        '@metamask/name-controller': 2190,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDisplayName = function (e) {
                    return p([e])[0];
                  }),
                  (n.useDisplayNames = p);
                var s = e('@metamask/name-controller'),
                  r = e('react-redux'),
                  o = e('../../shared/constants/first-party-contracts'),
                  a = e('../../shared/modules/hexstring-utils'),
                  i = e('../ducks/domains'),
                  c = e('../selectors'),
                  u = e('../selectors/nft'),
                  l = e('./useName'),
                  d = e('./useNftCollectionsMetadata');
                function p(e) {
                  const t = (0, l.useNames)(e),
                    n = e.map(({ type: e, value: t, variation: n }) => {
                      if (e !== s.NameType.ETHEREUM_ADDRESS) return undefined;
                      const r = t.toLowerCase();
                      return Object.keys(o.FIRST_PARTY_CONTRACT_NAMES).find(e => {
                        var t;
                        const s =
                          null === (t = o.FIRST_PARTY_CONTRACT_NAMES[e]) || void 0 === t
                            ? void 0
                            : t[n];
                        return (null == s ? void 0 : s.toLowerCase()) === r;
                      });
                    });
                  const p = (function (e) {
                      const t = (0, r.useSelector)(c.selectERC20TokensByChain);
                      return e.map(
                        ({ preferContractSymbol: e, type: n, value: r, variation: o }) => {
                          var a;
                          if (n !== s.NameType.ETHEREUM_ADDRESS) return undefined;
                          const i = r.toLowerCase(),
                            {
                              iconUrl: c,
                              name: u,
                              symbol: l,
                            } = (null == t ||
                            null === (a = t[o]) ||
                            void 0 === a ||
                            null === (a = a.data) ||
                            void 0 === a
                              ? void 0
                              : a[i]) ?? {};
                          return { name: e && l ? l : u, image: c };
                        }
                      );
                    })(e),
                    m = (function (e) {
                      const t = (0, r.useSelector)(u.getNftContractsByAddressByChain);
                      return e.map(({ type: e, value: n, variation: r }) => {
                        var o;
                        if (e !== s.NameType.ETHEREUM_ADDRESS) return undefined;
                        const a = n.toLowerCase(),
                          i = t[r];
                        return null == i || null === (o = i[a]) || void 0 === o ? void 0 : o.name;
                      });
                    })(e),
                    h = (function (e) {
                      const t = e
                          .filter(({ type: e }) => e === s.NameType.ETHEREUM_ADDRESS)
                          .map(({ value: e, variation: t }) => ({
                            chainId: t,
                            contractAddress: e,
                          })),
                        n = (0, d.useNftCollectionsMetadata)(t);
                      return e.map(({ type: e, value: t, variation: r }) => {
                        var o;
                        if (e !== s.NameType.ETHEREUM_ADDRESS) return undefined;
                        const a = null === (o = n[r]) || void 0 === o ? void 0 : o[t.toLowerCase()],
                          i = !1 !== (null == a ? void 0 : a.isSpam);
                        if (!a || i) return undefined;
                        const { name: c, image: u } = a;
                        return { name: c, image: u };
                      });
                    })(e),
                    f = (function (e) {
                      const t = (0, r.useSelector)(i.getDomainResolutions);
                      return e.map(({ type: e, value: n }) => {
                        if (e !== s.NameType.ETHEREUM_ADDRESS) return undefined;
                        const r =
                          null == t
                            ? void 0
                            : t.find(
                                e =>
                                  (0, a.toChecksumHexAddress)(e.resolvedAddress) ===
                                  (0, a.toChecksumHexAddress)(n)
                              );
                        return null == r ? void 0 : r.domainName;
                      });
                    })(e);
                  return e.map((e, s) => {
                    const r = t[s],
                      o = n[s],
                      a = p[s],
                      i = m[s],
                      c = h[s],
                      u = f[s],
                      l =
                        (null == r ? void 0 : r.name) ||
                        o ||
                        (null == c ? void 0 : c.name) ||
                        (null == a ? void 0 : a.name) ||
                        i ||
                        u ||
                        null,
                      d = (null == c ? void 0 : c.image) || (null == a ? void 0 : a.image);
                    return {
                      name: l,
                      hasPetname: Boolean(null == r ? void 0 : r.name),
                      contractDisplayName: null == a ? void 0 : a.name,
                      image: d,
                    };
                  });
                }
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useDisplayName.ts' },
    ],
    [
      6978,
      { lodash: 4921, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useEqualityCheck = function (e, t = r.isEqual) {
                    const [n, o] = (0, s.useState)(e);
                    return (
                      (0, s.useLayoutEffect)(() => {
                        t(e, n) || o(e);
                      }, [e, t, n]),
                      n
                    );
                  });
                var s = e('react'),
                  r = e('lodash');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useEqualityCheck.js' },
    ],
    [
      6979,
      {
        '../../shared/modules/conversion.utils': 5858,
        '../ducks/metamask/metamask': 6860,
        '../helpers/utils/confirm-tx.util': 6899,
        '../selectors': 7601,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useEthFiatAmount = function (e, t = {}, n) {
                    const u = (0, r.useSelector)(i.getConversionRate),
                      l = (0, r.useSelector)(i.getCurrentCurrency),
                      d = (0, r.useSelector)(o.getShouldShowFiat),
                      p = t.showFiat ?? d,
                      m = (0, s.useMemo)(
                        () => (0, c.decEthToConvertedCurrency)(e, l, u),
                        [u, l, e]
                      );
                    if (!p || 'ETH' === l.toUpperCase() || u <= 0 || e === undefined)
                      return undefined;
                    return n
                      ? (0, a.formatCurrency)(m, l)
                      : `${(0, a.formatCurrency)(m, l)} ${l.toUpperCase()}`;
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../helpers/utils/confirm-tx.util'),
                  i = e('../ducks/metamask/metamask'),
                  c = e('../../shared/modules/conversion.utils');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useEthFiatAmount.js' },
    ],
    [
      698,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.UnknownURTypeError = void 0);
                class s extends Error {
                  constructor(e) {
                    super(e);
                  }
                }
                n.UnknownURTypeError = s;
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/errors/index.js',
      },
    ],
    [
      6980,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react');
                n.default = e => {
                  const [t, n] = (0, s.useState)(''),
                    [r, o] = (0, s.useState)('');
                  return (
                    (0, s.useEffect)(() => {
                      (async () => {
                        if (!e) return;
                        const t = await fetch(e);
                        if (t.ok)
                          try {
                            let e = await t.text();
                            e = e.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']');
                            const s = JSON.parse(e);
                            n(s.image), o(s.name);
                          } catch {}
                      })();
                    }, [e]),
                    { image: t, name: r }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useFetchNftDetailsFromTokenURI.ts' },
    ],
    [
      6981,
      {
        '../ducks/locale/locale': 6859,
        '../ducks/metamask/metamask': 6860,
        '../helpers/utils/util': 6921,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useFiatFormatter = void 0);
                var s = e('react-redux'),
                  r = e('../ducks/locale/locale'),
                  o = e('../ducks/metamask/metamask'),
                  a = e('../helpers/utils/util');
                n.useFiatFormatter = () => {
                  const e = (0, s.useSelector)(r.getIntlLocale),
                    t = (0, s.useSelector)(o.getCurrentCurrency);
                  return (n, s = {}) => {
                    const { shorten: r } = s;
                    try {
                      const s = new Intl.NumberFormat(e, { style: 'currency', currency: t });
                      if (!r) return s.format(n);
                      const o = s.formatToParts(n);
                      let i = '',
                        c = '';
                      o.forEach(e => {
                        'currency' === e.type ? (i += e.value) : (c += e.value);
                      });
                      const u = (0, a.shortenString)(c, {
                        truncatedCharLimit: 15,
                        truncatedStartChars: 12,
                        truncatedEndChars: 0,
                        skipCharacterInEnd: !0,
                      });
                      return o.findIndex(e => 'currency' === e.type) <
                        o.findIndex(e => 'integer' === e.type)
                        ? `${i}${u}`
                        : `${u}${i}`;
                    } catch (s) {
                      const o = new Intl.NumberFormat(e).format(n),
                        i = (0, a.shortenString)(o, {
                          truncatedCharLimit: 15,
                          truncatedStartChars: 12,
                          truncatedEndChars: 0,
                          skipCharacterInEnd: !0,
                        });
                      return r ? `${i} ${t}` : `${o} ${t}`;
                    }
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useFiatFormatter.ts' },
    ],
    [
      6982,
      {
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../store/actions': 7619,
        './usePolling': 7001,
        'lodash/isEqual': 4908,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGasFeeEstimates = function (e) {
                    const t = (0, r.useSelector)(c.getSelectedNetworkClientId),
                      n = e ?? t,
                      [l, d] = (0, o.useState)(''),
                      p = (0, r.useSelector)(e => (0, a.getGasEstimateTypeByChainId)(e, l)),
                      m = (0, r.useSelector)(
                        e => (0, a.getGasFeeEstimatesByChainId)(e, l),
                        s.default
                      ),
                      h = (0, r.useSelector)(e =>
                        (0, a.getIsGasEstimatesLoadingByChainId)(e, {
                          chainId: l,
                          networkClientId: n,
                        })
                      ),
                      f = (0, r.useSelector)(e => (0, a.getIsNetworkBusyByChainId)(e, l));
                    return (
                      (0, o.useEffect)(() => {
                        let e = !0;
                        return (
                          (0, i.getNetworkConfigurationByNetworkClientId)(n).then(t => {
                            t && e && d(t.chainId);
                          }),
                          () => {
                            e = !1;
                          }
                        );
                      }, [n]),
                      (0, u.default)({
                        startPolling: e =>
                          (0, i.gasFeeStartPollingByNetworkClientId)(e.networkClientId),
                        stopPollingByPollingToken: i.gasFeeStopPollingByPollingToken,
                        input: { networkClientId: n },
                      }),
                      {
                        gasFeeEstimates: m,
                        gasEstimateType: p,
                        isGasEstimatesLoading: h,
                        isNetworkBusy: f,
                      }
                    );
                  });
                var s = l(e('lodash/isEqual')),
                  r = e('react-redux'),
                  o = e('react'),
                  a = e('../ducks/metamask/metamask'),
                  i = e('../store/actions'),
                  c = e('../../shared/modules/selectors/networks'),
                  u = l(e('./usePolling'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useGasFeeEstimates.js' },
    ],
    [
      6983,
      { '../helpers/utils/util': 6921, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react'),
                  r = e('../helpers/utils/util');
                n.default = (e, t) => {
                  const [n, o] = (0, s.useState)('');
                  return (
                    (0, s.useEffect)(() => {
                      (async () => {
                        const n = await (0, r.getAssetImageURL)(e, t);
                        o(n);
                      })();
                    }, [e, t]),
                    n
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useGetAssetImageUrl.ts' },
    ],
    [
      6984,
      {
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/selectors/networks': 5875,
        '../selectors': 7601,
        './useTokenBalances': 7010,
        'bn.js': 4078,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGetFormattedTokensPerChain = void 0);
                var s = e('react-redux'),
                  r = e('bn.js'),
                  o = e('../selectors'),
                  a = e('../../shared/modules/selectors/networks'),
                  i = e('../../shared/modules/conversion.utils'),
                  c = e('./useTokenBalances');
                n.useGetFormattedTokensPerChain = (e, t, n, u) => {
                  const l = (0, s.useSelector)(a.getCurrentChainId),
                    d = (0, s.useSelector)(o.getAllTokens),
                    p = (0, c.useTokenBalances)({ chainIds: u });
                  return {
                    formattedTokensWithBalancesPerChain: (n ? [l] : u).map(n => {
                      var s;
                      const o = (
                        (null == d || null === (s = d[n]) || void 0 === s
                          ? void 0
                          : s[null == e ? void 0 : e.address]) ?? []
                      ).reduce((s, o) => {
                        var a;
                        const u =
                          (null === (a = p.tokenBalances[e.address]) ||
                          void 0 === a ||
                          null === (a = a[n]) ||
                          void 0 === a
                            ? void 0
                            : a[o.address]) ?? '0x0';
                        if ('0x0' !== u || !t) {
                          const e = (0, i.hexToDecimal)(u);
                          s.push({
                            address: o.address,
                            symbol: o.symbol,
                            decimals: o.decimals,
                            balance: e,
                            string: (0, c.stringifyBalance)(new r.BN(e), new r.BN(o.decimals)),
                          });
                        }
                        return s;
                      }, []);
                      return { chainId: n, tokensWithBalances: o };
                    }),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useGetFormattedTokensPerChain.ts' },
    ],
    [
      6986,
      {
        '../../app/scripts/lib/util': 204,
        '../../shared/constants/network': 5804,
        '../../shared/constants/time': 5817,
        '../../shared/lib/fetch-with-cache': 5834,
        '../selectors': 7601,
        '../selectors/multichain': 7605,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIsOriginalNativeTokenSymbol = function (e, t, n, s = '') {
                    const [p, m] = (0, r.useState)(!1),
                      h = (0, o.useSelector)(u.useSafeChainsListValidationSelector),
                      f = (0, o.useSelector)(l.getMultichainIsEvm),
                      g = (0, o.useSelector)(l.getMultichainCurrentNetwork);
                    return (
                      (0, r.useEffect)(() => {
                        !(async function (n) {
                          if (f)
                            try {
                              var r;
                              if (!h) return void m(!0);
                              if (
                                (e => {
                                  const t = (0, d.getValidUrl)(e);
                                  return (
                                    null !== t &&
                                    ('localhost' === t.hostname || '127.0.0.1' === t.hostname)
                                  );
                                })(s)
                              )
                                return void m(!0);
                              const o = i.CHAIN_ID_TO_CURRENCY_SYMBOL_MAP[e];
                              if (o) return void m(o === t);
                              const u = i.CHAIN_ID_TO_CURRENCY_SYMBOL_MAP_NETWORK_COLLISION[e];
                              if (u && u.some(e => e.currencySymbol === t)) return void m(!0);
                              const l = (
                                  await (0, a.default)({
                                    url: i.CHAIN_SPEC_URL,
                                    allowStale: !0,
                                    cacheOptions: { cacheRefreshTime: c.DAY },
                                    functionName: 'getSafeChainsList',
                                  })
                                ).find(e => e.chainId === parseInt(n, 16)),
                                p =
                                  (null == l || null === (r = l.nativeCurrency) || void 0 === r
                                    ? void 0
                                    : r.symbol) ?? null;
                              m(p === t);
                            } catch (e) {
                              m(!1);
                            }
                          else m(t === (null == g ? void 0 : g.ticker));
                        })(e);
                      }, [p, e, t, n, s, h]),
                      p
                    );
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a =
                    (s = e('../../shared/lib/fetch-with-cache')) && s.__esModule
                      ? s
                      : { default: s },
                  i = e('../../shared/constants/network'),
                  c = e('../../shared/constants/time'),
                  u = e('../selectors'),
                  l = e('../selectors/multichain'),
                  d = e('../../app/scripts/lib/util');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useIsOriginalNativeTokenSymbol.js' },
    ],
    [
      6987,
      { '../selectors': 7601, '../store/actions': 7619, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIsOriginalTokenSymbol = function (e, t) {
                    const [n, i] = (0, s.useState)(null),
                      c = (0, r.useSelector)(a.getTokenList);
                    return (
                      (0, s.useEffect)(() => {
                        !(async function (e) {
                          var n, s;
                          let r =
                            null === (n = c[null == e ? void 0 : e.toLowerCase()]) || void 0 === n
                              ? void 0
                              : n.symbol;
                          r || (r = await (0, o.getTokenSymbol)(e)),
                            i(
                              (null === (s = r) || void 0 === s ? void 0 : s.toLowerCase()) ===
                                (null == t ? void 0 : t.toLowerCase())
                            );
                        })(e);
                      }, [e, t]),
                      n
                    );
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../store/actions'),
                  a = e('../selectors');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useIsOriginalTokenSymbol.js' },
    ],
    [
      6988,
      { '../store/actions': 7619, loglevel: 4929, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDisableMetametrics = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(!1),
                      [s, a] = (0, r.useState)(null);
                    return {
                      disableMetametrics: (0, r.useCallback)(async () => {
                        n(!0), e((0, i.showLoadingIndication)()), a(null);
                        try {
                          await e((0, i.setParticipateInMetaMetrics)(!1));
                        } catch (e) {
                          throw (
                            (a(e instanceof Error ? e.message : 'An unexpected error occurred'), e)
                          );
                        } finally {
                          n(!1), e((0, i.hideLoadingIndication)());
                        }
                        e((0, i.hideLoadingIndication)());
                      }, [e]),
                      loading: t,
                      error: s,
                    };
                  }),
                  (n.useEnableMetametrics = function () {
                    const e = (0, o.useDispatch)(),
                      [t, n] = (0, r.useState)(!1),
                      [s, c] = (0, r.useState)(null);
                    return {
                      enableMetametrics: (0, r.useCallback)(async () => {
                        n(!0), e((0, i.showLoadingIndication)()), c(null);
                        try {
                          await e((0, i.setParticipateInMetaMetrics)(!0));
                        } catch (e) {
                          throw (
                            (c(e instanceof Error ? e.message : 'An unexpected error occurred'),
                            a.default.error(e),
                            e)
                          );
                        } finally {
                          n(!1), e((0, i.hideLoadingIndication)());
                        }
                        e((0, i.hideLoadingIndication)());
                      }, [e]),
                      loading: t,
                      error: s,
                    };
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('loglevel')) && s.__esModule ? s : { default: s },
                  i = e('../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useMetametrics.ts' },
    ],
    [
      6989,
      { '../store/actions': 7619, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useModalProps = function () {
                    const e = (0, s.useSelector)(e => {
                        var t;
                        return null === (t = e.appState.modal.modalState) || void 0 === t
                          ? void 0
                          : t.props;
                      }),
                      t = (0, s.useDispatch)();
                    return { props: e, hideModal: () => t((0, r.hideModal)()) };
                  });
                var s = e('react-redux'),
                  r = e('../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useModalProps.ts' },
    ],
    [
      699,
      {
        '../CryptoHDKey': 688,
        '../RegistryItem': 695,
        '../RegistryType': 696,
        '../lib': 706,
        buffer: 4139,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }),
                      (n.CryptoMultiAccounts = void 0);
                    const s = e('../RegistryType'),
                      r = e('../CryptoHDKey'),
                      o = e('../RegistryItem'),
                      a = e('../lib');
                    var i;
                    !(function (e) {
                      (e[(e.masterFingerprint = 1)] = 'masterFingerprint'),
                        (e[(e.keys = 2)] = 'keys'),
                        (e[(e.device = 3)] = 'device'),
                        (e[(e.deviceId = 4)] = 'deviceId'),
                        (e[(e.version = 5)] = 'version');
                    })(i || (i = {}));
                    class c extends o.RegistryItem {
                      constructor(e, t, n, r, o) {
                        super(),
                          (this.masterFingerprint = e),
                          (this.keys = t),
                          (this.device = n),
                          (this.deviceId = r),
                          (this.version = o),
                          (this.getRegistryType = () => s.RegistryTypes.CRYPTO_MULTI_ACCOUNTS),
                          (this.getMasterFingerprint = () => this.masterFingerprint),
                          (this.getKeys = () => this.keys),
                          (this.getDevice = () => this.device),
                          (this.getDeviceId = () => this.deviceId),
                          (this.getVersion = () => this.version),
                          (this.toDataItem = () => {
                            const e = {};
                            return (
                              this.masterFingerprint &&
                                (e[i.masterFingerprint] = this.masterFingerprint.readUInt32BE(0)),
                              this.keys &&
                                (e[i.keys] = this.keys.map(e => {
                                  const t = e.toDataItem();
                                  return t.setTag(e.getRegistryType().getTag()), t;
                                })),
                              this.device && (e[i.device] = this.device),
                              this.deviceId && (e[i.deviceId] = this.deviceId),
                              this.version && (e[i.version] = this.version),
                              new a.DataItem(e)
                            );
                          });
                      }
                    }
                    (n.CryptoMultiAccounts = c),
                      (c.fromDataItem = e => {
                        const n = e.getData(),
                          s = t.alloc(4),
                          o = n[i.masterFingerprint];
                        o && s.writeUInt32BE(o, 0);
                        const a = n[i.keys].map(e => r.CryptoHDKey.fromDataItem(e)),
                          u = n[i.device],
                          l = n[i.deviceId],
                          d = n[i.version];
                        return new c(s, a, u, l, d);
                      }),
                      (c.fromCBOR = e => {
                        const t = (0, a.decodeToDataItem)(e);
                        return c.fromDataItem(t);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/extended/CryptoMultiAccounts.js',
      },
    ],
    [
      6990,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react');
                n.default = e => {
                  const t = (0, s.useRef)(new Map());
                  (0, s.useEffect)(() => {
                    for (const n of e.input) {
                      const s = JSON.stringify(n);
                      t.current.has(s) || e.startPolling(n).then(e => t.current.set(s, e));
                    }
                    for (const [n, s] of t.current.entries()) {
                      e.input.some(e => n === JSON.stringify(e)) ||
                        (e.stopPollingByPollingToken(s), t.current.delete(n));
                    }
                  }, [e.input && JSON.stringify(e.input)]),
                    (0, s.useEffect)(
                      () => () => {
                        for (const n of t.current.values()) e.stopPollingByPollingToken(n);
                      },
                      []
                    );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useMultiPolling.ts' },
    ],
    [
      6991,
      {
        '../../shared/constants/multichain/assets': 5802,
        '../helpers/utils/confirm-tx.util': 6899,
        '../helpers/utils/token-util': 6918,
        '../selectors/multichain': 7605,
        './useAccountTotalFiatBalance': 6966,
        './useMultichainSelector': 6993,
        '@metamask/keyring-api': 2014,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useMultichainAccountTotalFiatBalance = n.EMPTY_VALUES = void 0);
                var s = e('react-redux'),
                  r = e('@metamask/keyring-api'),
                  o = e('../selectors/multichain'),
                  a = e('../helpers/utils/confirm-tx.util'),
                  i = e('../../shared/constants/multichain/assets'),
                  c = e('../helpers/utils/token-util'),
                  u = e('./useMultichainSelector'),
                  l = e('./useAccountTotalFiatBalance');
                const d = (n.EMPTY_VALUES = {
                  formattedFiat: '0',
                  totalFiatBalance: '0',
                  totalWeiBalance: '0',
                  tokensWithBalances: [],
                  loading: !1,
                  orderedTokenList: [],
                });
                n.useMultichainAccountTotalFiatBalance = (e, t = !1) => {
                  var n;
                  if ((0, r.isEvmAccountType)(e.type))
                    return (0, l.useAccountTotalFiatBalance)(e, t);
                  const p = (0, u.useMultichainSelector)(o.getMultichainCurrentCurrency, e),
                    { network: m } = (0, u.useMultichainSelector)(o.getMultichainNetwork, e),
                    { ticker: h } = m,
                    f = (0, u.useMultichainSelector)(o.getMultichainConversionRate, e),
                    g = (0, u.useMultichainSelector)(o.getMultichainCurrencyImage, e),
                    y = (0, s.useSelector)(o.getMultichainBalances),
                    k = i.MULTICHAIN_NATIVE_CURRENCY_TO_CAIP19[h];
                  if (null == y || null === (n = y[e.id]) || void 0 === n || !n[k]) return d;
                  const { amount: v } = y[e.id][k],
                    T = (0, c.getTokenFiatAmount)(1, Number(f), p, v, h, !1, !1) ?? '0',
                    b = { iconUrl: g, symbol: h, fiatBalance: T };
                  return {
                    formattedFiat: (0, a.formatCurrency)(T, p),
                    totalFiatBalance: T,
                    totalBalance: v,
                    tokensWithBalances: [],
                    loading: !1,
                    orderedTokenList: [b],
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useMultichainAccountTotalFiatBalance.ts' },
    ],
    [
      6992,
      {
        '../../shared/constants/transaction': 5819,
        '../selectors/assets': 7595,
        '../selectors/multichain': 7605,
        '../selectors/selectors': 7611,
        './useMultichainSelector': 6993,
        '@metamask/utils': 2995,
        'bignumber.js': 4030,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useMultichainBalances = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('@metamask/utils'),
                  a = e('bignumber.js'),
                  i = e('../selectors/assets'),
                  c = e('../selectors/multichain'),
                  u = e('../../shared/constants/transaction'),
                  l = e('../selectors/selectors'),
                  d = e('./useMultichainSelector');
                n.useMultichainBalances = e => {
                  const t = (0, r.useSelector)(l.getSelectedEvmInternalAccount),
                    n = (0, r.useSelector)(t => (0, l.getInternalAccount)(t, e ?? '')),
                    p = e ? n : t,
                    m = (0, r.useSelector)(e =>
                      (0, i.getTokenBalancesEvm)(e, null == p ? void 0 : p.address)
                    ),
                    h = (0, r.useSelector)(c.getLastSelectedNonEvmAccount),
                    f = (e => {
                      const t = (0, r.useSelector)(i.getAccountAssets),
                        n = (0, r.useSelector)(i.getAssetsMetadata),
                        l = (0, d.useMultichainSelector)(c.getMultichainBalances),
                        p = (0, r.useSelector)(i.getAssetsRates);
                      return (0, s.useMemo)(() => {
                        if (!e) return [];
                        const s = null == t ? void 0 : t[e],
                          r = null == l ? void 0 : l[e];
                        return r && s
                          ? s
                              .filter(e => n[e])
                              .map(e => {
                                var t, s, i, c, l, d, m;
                                const {
                                  chainId: h,
                                  assetReference: f,
                                  assetNamespace: g,
                                } = (0, o.parseCaipAssetType)(e);
                                return {
                                  chainId: h,
                                  symbol:
                                    (null === (t = n[e]) || void 0 === t ? void 0 : t.symbol) ?? '',
                                  assetId: e,
                                  address: f,
                                  string:
                                    (null === (s = r[e]) || void 0 === s ? void 0 : s.amount) ??
                                    '0',
                                  balance:
                                    (null === (i = r[e]) || void 0 === i ? void 0 : i.amount) ??
                                    '0',
                                  decimals:
                                    null === (c = n[e]) ||
                                    void 0 === c ||
                                    null === (c = c.units[0]) ||
                                    void 0 === c
                                      ? void 0
                                      : c.decimals,
                                  image:
                                    (null === (l = n[e]) || void 0 === l ? void 0 : l.iconUrl) ??
                                    '',
                                  type: 'token' === g ? u.AssetType.token : u.AssetType.native,
                                  tokenFiatAmount: new a.BigNumber(
                                    (null === (d = r[e]) || void 0 === d ? void 0 : d.amount) ?? '1'
                                  )
                                    .times(
                                      (null == p || null === (m = p[e]) || void 0 === m
                                        ? void 0
                                        : m.rate) ?? '1'
                                    )
                                    .toNumber(),
                                };
                              })
                              .filter(Boolean)
                          : [];
                      }, [n, p, t, e, l]);
                    })(e ?? (null == h ? void 0 : h.id));
                  return {
                    assetsWithBalance: (0, s.useMemo)(
                      () =>
                        [...m, ...f]
                          .map(e => ({
                            ...e,
                            type: e.isNative ? u.AssetType.native : u.AssetType.token,
                          }))
                          .sort((e, t) => (t.tokenFiatAmount ?? 0) - (e.tokenFiatAmount ?? 0)),
                      [m, f]
                    ),
                    balanceByChainId: (0, s.useMemo)(
                      () =>
                        [...m, ...f].reduce(
                          (e, t) => (
                            e[t.chainId] || (e[t.chainId] = 0),
                            (e[t.chainId] += t.tokenFiatAmount ?? 0),
                            e
                          ),
                          {}
                        ),
                      [m, f]
                    ),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useMultichainBalances.ts' },
    ],
    [
      6994,
      {
        '../../shared/constants/transaction': 5819,
        '../components/app/assets/util/formatWithThreshold': 5963,
        '../ducks/locale/locale': 6859,
        './useI18nContext': 6985,
        '@metamask/keyring-api': 2014,
        '@metamask/multichain-network-controller': 2141,
        '@metamask/transaction-controller': 2946,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.KEYRING_TRANSACTION_STATUS_KEY = void 0),
                  (n.useMultichainTransactionDisplay = function (e, t) {
                    const n = (0, a.useSelector)(c.getIntlLocale),
                      { chainId: r } = t,
                      i = o.MULTICHAIN_NETWORK_DECIMAL_PLACES[r],
                      u = (0, l.useI18nContext)(),
                      p = d(e.from, !0, n, i),
                      m = d(e.to, e.type === s.TransactionType.Send, n, i),
                      h = d(
                        e.fees.filter(e => 'base' === e.type),
                        !0,
                        n
                      ),
                      f = d(
                        e.fees.filter(e => 'priority' === e.type),
                        !0,
                        n
                      ),
                      g = {
                        [s.TransactionType.Send]: u('send'),
                        [s.TransactionType.Receive]: u('receive'),
                        [s.TransactionType.Swap]:
                          `${u('swap')} ${null == p ? void 0 : p.unit} ${u('to').toLowerCase()} ${null == m ? void 0 : m.unit}`,
                        [s.TransactionType.Unknown]: u('interaction'),
                      };
                    return {
                      ...e,
                      title: g[e.type],
                      from: p,
                      to: m,
                      baseFee: h,
                      priorityFee: f,
                      isRedeposit:
                        !0 === Boolean(p) && !1 === Boolean(m) && e.type === s.TransactionType.Send,
                    };
                  });
                var s = e('@metamask/keyring-api'),
                  r = e('@metamask/transaction-controller'),
                  o = e('@metamask/multichain-network-controller'),
                  a = e('react-redux'),
                  i = e('../components/app/assets/util/formatWithThreshold'),
                  c = e('../ducks/locale/locale'),
                  u = e('../../shared/constants/transaction'),
                  l = e('./useI18nContext');
                n.KEYRING_TRANSACTION_STATUS_KEY = {
                  [s.TransactionStatus.Failed]: r.TransactionStatus.failed,
                  [s.TransactionStatus.Confirmed]: r.TransactionStatus.confirmed,
                  [s.TransactionStatus.Unconfirmed]: u.TransactionGroupStatus.pending,
                  [s.TransactionStatus.Submitted]: r.TransactionStatus.submitted,
                };
                function d(e, t, n, s) {
                  const r = {};
                  for (const t of e) {
                    if (null == t || !t.asset.fungible) continue;
                    const e = t.asset.type;
                    r[e]
                      ? (r[e].amount += parseFloat(t.asset.amount))
                      : (r[e] = {
                          amount: parseFloat(t.asset.amount),
                          address: t.address,
                          unit: t.asset.unit,
                        });
                  }
                  return Object.entries(r).map(([e, r]) =>
                    (function (e, t, n, s) {
                      const r = 1 / 10 ** (s || 8),
                        o = (0, i.formatWithThreshold)(e.amount, r, t, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: s || 8,
                        });
                      let a = o;
                      n && (a = `-${o}`);
                      return { ...e, amount: a };
                    })(r, n, t, s)
                  )[0];
                }
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useMultichainTransactionDisplay.ts' },
    ],
    [
      6995,
      {
        '../selectors': 7601,
        '@metamask/name-controller': 2190,
        lodash: 4921,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useName = function (e, t, n) {
                    return i([{ value: e, type: t, variation: n }])[0];
                  }),
                  (n.useNames = i);
                var s = e('@metamask/name-controller'),
                  r = e('react-redux'),
                  o = e('lodash'),
                  a = e('../selectors');
                function i(e) {
                  const t = (0, r.useSelector)(a.getNames, o.isEqual);
                  return e.map(({ value: e, type: n, variation: r }) => {
                    var o;
                    const a = (function (e, t) {
                        if (t === s.NameType.ETHEREUM_ADDRESS) return e.toLowerCase();
                        return e;
                      })(e, n),
                      i = (null === (o = t[n]) || void 0 === o ? void 0 : o[a]) ?? {},
                      c = i[r],
                      u = i[s.FALLBACK_VARIATION],
                      l = (null != c && c.name) || !u ? (c ?? {}) : u,
                      {
                        name: d = null,
                        sourceId: p = null,
                        origin: m = null,
                        proposedNames: h = {},
                      } = l;
                    return { name: d, sourceId: p, proposedNames: h, origin: m };
                  });
                }
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useName.ts' },
    ],
    [
      6996,
      { '../../shared/constants/transaction': 5819, '../store/actions': 7619, './useAsync': 6969 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useNftCollectionsMetadata = function (e) {
                    const { value: t } = (0, o.useAsyncResult)(
                      () =>
                        (async function (e) {
                          const t = e.reduce(
                              (e, { chainId: t, contractAddress: n }) => (
                                (e[t] = [...(e[t] ?? []), n.toLowerCase()]), e
                              ),
                              {}
                            ),
                            n = Object.keys(t),
                            s = await Promise.all(
                              n.map(e =>
                                (async function (e, t) {
                                  const n = await Promise.all(
                                      e.map(e => (0, r.getTokenStandardAndDetails)(e, t))
                                    ),
                                    s = e.filter((e, t) => a.includes(n[t].standard));
                                  if (0 === s.length) return {};
                                  const o = await (0, r.getNFTContractInfo)(s, t);
                                  return o.collections.reduce(
                                    (e, t, n) => (
                                      (e[s[n]] = {
                                        name: null == t ? void 0 : t.name,
                                        image: null == t ? void 0 : t.image,
                                        isSpam: null == t ? void 0 : t.isSpam,
                                      }),
                                      e
                                    ),
                                    {}
                                  );
                                })(t[e], e)
                              )
                            );
                          return n.reduce((e, t, n) => ((e[t] = s[n]), e), {});
                        })(e),
                      [JSON.stringify(e)]
                    );
                    return t ?? {};
                  });
                var s = e('../../shared/constants/transaction'),
                  r = e('../store/actions'),
                  o = e('./useAsync');
                const a = [s.TokenStandard.ERC721];
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useNftCollectionsMetadata.ts' },
    ],
    [
      6997,
      {
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../selectors': 7601,
        './useI18nContext': 6985,
        './usePrevious': 7002,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useNfts = function ({ overridePopularNetworkFilter: e = !1 } = {}) {
                    const t = (0, l.useI18nContext)(),
                      n = (0, r.useSelector)(a.getAllNfts),
                      { address: d } = (0, r.useSelector)(i.getSelectedInternalAccount),
                      p = (0, r.useSelector)(c.getCurrentChainId),
                      m = (0, r.useSelector)(i.getAllChainsToPoll),
                      h = (0, r.useSelector)(i.getIsTokenNetworkFilterEqualCurrentNetwork),
                      f = (0, s.useMemo)(
                        () => (h || e ? ((null == n ? void 0 : n[p]) ?? []) : n),
                        [h, n, p, e]
                      ),
                      g = (0, r.useSelector)(a.getNftContracts),
                      y = t('nftsPreviouslyOwned'),
                      k = t('unknownCollection'),
                      [v, T] = (0, s.useState)([]),
                      [b, w] = (0, s.useState)([]),
                      [S, C] = (0, s.useState)(() => (null == f ? void 0 : f.length) >= 0),
                      _ = (0, u.usePrevious)(f),
                      E = (0, u.usePrevious)(m),
                      I = (0, u.usePrevious)(d);
                    return (
                      (0, s.useEffect)(() => {
                        ((0, o.isEqual)(_, f) && (0, o.isEqual)(I, d) && (0, o.isEqual)(E, p)) ||
                          (() => {
                            if ((C(!0), d === undefined || m === undefined)) return;
                            const e = [],
                              t = [];
                            Object.values(f)
                              .flat()
                              .forEach(n => {
                                !1 === (null == n ? void 0 : n.isCurrentlyOwned)
                                  ? e.push(n)
                                  : t.push(n);
                              }),
                              w(e),
                              T(t),
                              C(!1);
                          })();
                      }, [f, _, g, C, p, E, d, I, y, k, m]),
                      { loading: S, currentlyOwnedNfts: v, previouslyOwnedNfts: b }
                    );
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('lodash'),
                  a = e('../ducks/metamask/metamask'),
                  i = e('../selectors'),
                  c = e('../../shared/modules/selectors/networks'),
                  u = e('./usePrevious'),
                  l = e('./useI18nContext');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useNfts.ts' },
    ],
    [
      6998,
      {
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../helpers/utils/nfts': 6910,
        '../selectors': 7601,
        './useI18nContext': 6985,
        './usePrevious': 7002,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useNftsCollections = function () {
                    const e = (0, d.useI18nContext)(),
                      t = e('nftsPreviouslyOwned'),
                      n = e('unknownCollection'),
                      [p, m] = (0, s.useState)({}),
                      [h, f] = (0, s.useState)({ collectionName: t, nfts: [] }),
                      g = (0, r.useSelector)(i.getIsTokenNetworkFilterEqualCurrentNetwork),
                      y = (0, r.useSelector)(a.getAllNfts),
                      { address: k } = (0, r.useSelector)(i.getSelectedInternalAccount),
                      v = (0, r.useSelector)(c.getCurrentChainId),
                      T = (0, s.useMemo)(
                        () => (g ? ((null == y ? void 0 : y[v]) ?? []) : y),
                        [g, y, v]
                      ),
                      [b, w] = (0, s.useState)(() => (null == T ? void 0 : T.length) >= 0),
                      S = (0, r.useSelector)(a.getNftContracts),
                      C = (0, l.usePrevious)(T),
                      _ = (0, l.usePrevious)(v),
                      E = (0, l.usePrevious)(k);
                    return (
                      (0, s.useEffect)(() => {
                        ((0, o.isEqual)(C, T) && (0, o.isEqual)(E, k) && (0, o.isEqual)(_, v)) ||
                          (() => {
                            if ((w(!0), k === undefined || v === undefined)) return;
                            const e = {},
                              s = { collectionName: t, nfts: [] };
                            Object.values(T)
                              .flat()
                              .forEach(t => {
                                if (!1 === (null == t ? void 0 : t.isCurrentlyOwned))
                                  s.nfts.push(t);
                                else if (e[t.address]) e[t.address].nfts.push(t);
                                else {
                                  const s = S.find(({ address: e }) => e === t.address);
                                  e[t.address] = {
                                    collectionName: (null == s ? void 0 : s.name) || n,
                                    collectionImage:
                                      (null == s ? void 0 : s.logo) || (0, u.getNftImage)(t.image),
                                    nfts: [t],
                                  };
                                }
                              }),
                              m(e),
                              f(s),
                              w(!1);
                          })();
                      }, [T, C, S, w, v, _, k, E, t, n]),
                      { nftsLoading: b, collections: p, previouslyOwnedCollection: h }
                    );
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('lodash'),
                  a = e('../ducks/metamask/metamask'),
                  i = e('../selectors'),
                  c = e('../../shared/modules/selectors/networks'),
                  u = e('../helpers/utils/nfts'),
                  l = e('./usePrevious'),
                  d = e('./useI18nContext');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useNftsCollections.js' },
    ],
    [
      6999,
      { '../helpers/constants/notifications': 6876, '../store/actions': 7619, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSnapNotificationTimeouts = void 0);
                var s = e('react-redux'),
                  r = e('../store/actions'),
                  o = e('../helpers/constants/notifications');
                n.useSnapNotificationTimeouts = () => {
                  const e = (0, s.useDispatch)();
                  return {
                    setNotificationTimeout: t => {
                      setTimeout(() => {
                        e((0, r.deleteNotificationsById)([t]));
                      }, o.NOTIFICATIONS_EXPIRATION_DELAY);
                    },
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useNotificationTimeouts.ts' },
    ],
    [
      700,
      { '../CryptoKeypath': 689, '../RegistryItem': 695, '../RegistryType': 696, '../lib': 706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.KeyDerivationSchema = n.DerivationAlgorithm = n.Curve = void 0);
                const s = e('../RegistryType'),
                  r = e('../RegistryItem'),
                  o = e('../lib'),
                  a = e('../CryptoKeypath');
                var i, c, u;
                !(function (e) {
                  (e[(e.keyPath = 1)] = 'keyPath'),
                    (e[(e.curve = 2)] = 'curve'),
                    (e[(e.algo = 3)] = 'algo'),
                    (e[(e.chainType = 4)] = 'chainType');
                })(i || (i = {})),
                  (function (e) {
                    (e[(e.secp256k1 = 0)] = 'secp256k1'), (e[(e.ed25519 = 1)] = 'ed25519');
                  })((c = n.Curve || (n.Curve = {}))),
                  (function (e) {
                    (e[(e.slip10 = 0)] = 'slip10'), (e[(e.bip32ed25519 = 1)] = 'bip32ed25519');
                  })((u = n.DerivationAlgorithm || (n.DerivationAlgorithm = {})));
                class l extends r.RegistryItem {
                  constructor(e, t = c.secp256k1, n = u.slip10, r) {
                    super(),
                      (this.keypath = e),
                      (this.curve = t),
                      (this.algo = n),
                      (this.chainType = r),
                      (this.getRegistryType = () => s.RegistryTypes.KEY_DERIVATION_SCHEMA),
                      (this.getKeypath = () => this.keypath),
                      (this.getCurve = () => this.curve),
                      (this.getAlgo = () => this.algo),
                      (this.getChainType = () => this.chainType),
                      (this.toDataItem = () => {
                        const e = {},
                          t = this.getKeypath().toDataItem();
                        return (
                          t.setTag(this.getKeypath().getRegistryType().getTag()),
                          (e[i.keyPath] = t),
                          (e[i.curve] = this.curve),
                          (e[i.algo] = this.algo),
                          this.chainType && (e[i.chainType] = this.chainType),
                          new o.DataItem(e)
                        );
                      });
                  }
                }
                (n.KeyDerivationSchema = l),
                  (l.fromDataItem = e => {
                    const t = e.getData(),
                      n = a.CryptoKeypath.fromDataItem(t[i.keyPath]),
                      s = t[i.curve],
                      r = t[i.algo],
                      o = t[i.chainType];
                    return new l(n, s, r, o);
                  }),
                  (l.fromCBOR = e => {
                    const t = (0, o.decodeToDataItem)(e);
                    return l.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/extended/DerivationSchema.js',
      },
    ],
    [
      7e3,
      { '../selectors': 7601, '@metamask/permission-controller': 2421, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useOriginMetadata = function (e) {
                    const t = (0, r.useSelector)(t => (0, o.getTargetSubjectMetadata)(t, e));
                    if (!e) return null;
                    let n = null;
                    try {
                      const t = new URL(e);
                      n = {
                        host: t.host,
                        hostname: t.hostname,
                        origin: e,
                        subjectType: s.SubjectType.Unknown,
                      };
                    } catch (e) {}
                    if (t && n) return { ...n, ...t };
                    if (t) return t;
                    return n;
                  });
                var s = e('@metamask/permission-controller'),
                  r = e('react-redux'),
                  o = e('../selectors');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useOriginMetadata.js' },
    ],
    [
      7001,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('react');
                n.default = e => {
                  const t = (0, s.useRef)(null),
                    n = (0, s.useRef)(null);
                  let r = !1;
                  (0, s.useEffect)(() => {
                    if (!1 === e.enabled) return () => {};
                    r = !0;
                    const s = () => {
                      var s;
                      t.current &&
                        (e.stopPollingByPollingToken(t.current),
                        null === (s = n.current) || void 0 === s || s.call(n, t.current));
                    };
                    return (
                      e.startPolling(e.input).then(o => {
                        var a;
                        (t.current = o),
                          (n.current =
                            (null === (a = e.callback) || void 0 === a ? void 0 : a.call(e, o)) ||
                            null),
                          r || s();
                      }),
                      () => {
                        (r = !1), s();
                      }
                    );
                  }, [e.input && JSON.stringify(e.input), e.enabled]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/usePolling.ts' },
    ],
    [
      7002,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.usePrevious = function (e) {
                    const t = (0, s.useRef)();
                    return (
                      (0, s.useEffect)(() => {
                        t.current = e;
                      }, [e]),
                      t.current
                    );
                  });
                var s = e('react');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/usePrevious.ts' },
    ],
    [
      7003,
      { './usePrevious': 7002, lodash: 4921, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useScrollRequired = void 0);
                var s = e('react'),
                  r = e('lodash'),
                  o = e('./usePrevious');
                n.useScrollRequired = (e = [], { offsetPxFromBottom: t = 16 } = {}) => {
                  var n, a;
                  const i = (0, s.useRef)(null),
                    c = (0, o.usePrevious)(
                      null === (n = i.current) || void 0 === n ? void 0 : n.offsetHeight
                    ),
                    [u, l] = (0, s.useState)(!1),
                    [d, p] = (0, s.useState)(!1),
                    [m, h] = (0, s.useState)(!1),
                    f = () => {
                      if (!i.current) return;
                      const e = i.current && i.current.scrollHeight > i.current.clientHeight,
                        n =
                          e &&
                          Math.round(i.current.scrollTop) + i.current.offsetHeight + t >=
                            i.current.scrollHeight;
                      e !== d && (l(!1), p(e)), h(!e || n), (e && !n) || l(!0);
                    };
                  (0, s.useEffect)(f, [i, ...e]),
                    (0, s.useEffect)(() => {
                      var e;
                      c !== (null === (e = i.current) || void 0 === e ? void 0 : e.offsetHeight) &&
                        f();
                    }, [null === (a = i.current) || void 0 === a ? void 0 : a.offsetHeight]);
                  return {
                    isScrollable: d,
                    isScrolledToBottom: m,
                    hasScrolledToBottom: u,
                    scrollToBottom: () => {
                      h(!0),
                        l(!0),
                        i.current &&
                          i.current.scrollTo({ top: i.current.scrollHeight, behavior: 'smooth' });
                    },
                    setHasScrolledToBottom: l,
                    ref: i,
                    onScroll: (0, r.debounce)(f, 25),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useScrollRequired.js' },
    ],
    [
      7004,
      {
        '../helpers/constants/routes': 6878,
        '../selectors': 7601,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSegmentContext = function () {
                    const e = (0, r.useRouteMatch)({ path: i, exact: !0, strict: !0 }),
                      t = ((0, s.useSelector)(a.txDataSelector) || {}).origin,
                      n = t ? { url: t } : undefined;
                    return {
                      page: e
                        ? { path: e.path, title: o.PATH_NAME_MAP[e.path], url: e.path }
                        : undefined,
                      referrer: n,
                    };
                  });
                var s = e('react-redux'),
                  r = e('react-router-dom'),
                  o = e('../helpers/constants/routes'),
                  a = e('../selectors');
                const i = Object.keys(o.PATH_NAME_MAP);
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useSegmentContext.js' },
    ],
    [
      7005,
      {
        '../ducks/app/app': 6845,
        './useGasFeeEstimates': 6982,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useShouldAnimateGasEstimations = function () {
                    const { isGasEstimatesLoading: e, gasFeeEstimates: t } = (0,
                      i.useGasFeeEstimates)(),
                      n = (0, r.useDispatch)(),
                      c = (0, r.useSelector)(a.getGasLoadingAnimationIsShowing),
                      u = (0, s.useRef)(t),
                      l = !(0, o.isEqual)(u.current, t),
                      d = (0, o.isEqual)(u.current, {});
                    l && (u.current = t);
                    const p = e || (l && !d);
                    (0, s.useEffect)(() => {
                      !1 === c && !0 === p && n((0, a.toggleGasLoadingAnimation)(!0));
                    }, [n, c, p]),
                      (0, s.useEffect)(() => {
                        let e;
                        return (
                          c &&
                            !p &&
                            (e = setTimeout(() => {
                              n((0, a.toggleGasLoadingAnimation)(!1));
                            }, 2e3)),
                          () => {
                            e && clearTimeout(e);
                          }
                        );
                      }, [n, c, p]);
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('lodash'),
                  a = e('../ducks/app/app'),
                  i = e('./useGasFeeEstimates');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useShouldAnimateGasEstimations.js' },
    ],
    [
      7006,
      {
        '../../shared/constants/time': 5817,
        '../../shared/modules/selectors/networks': 5875,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useShouldShowSpeedUp = function (e, t) {
                    const { transactions: n, hasRetried: i } = e,
                      c = (0, r.useSelector)(a.getCurrentChainId),
                      [u = {}] = n,
                      l = u.chainId === c,
                      { submittedTime: d } = u,
                      [p, m] = (0, s.useState)(() => Date.now() - d > 5e3 && t && !i && l);
                    return (
                      (0, s.useEffect)(() => {
                        let e;
                        return (
                          i ||
                            !t ||
                            p ||
                            (Date.now() - d > 5 * o.SECOND
                              ? m(!0)
                              : (e = setTimeout(
                                  () => {
                                    m(!0), clearTimeout(e);
                                  },
                                  5001 - (Date.now() - d)
                                ))),
                          () => {
                            e && clearTimeout(e);
                          }
                        );
                      }, [d, p, i, t]),
                      p
                    );
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../shared/constants/time'),
                  a = e('../../shared/modules/selectors/networks');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useShouldShowSpeedUp.js' },
    ],
    [
      7007,
      {
        '../../shared/lib/transactions-controller-utils': 5851,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/swaps.utils': 5879,
        './useTokenFiatAmount': 7014,
        '@metamask/transaction-controller': 2946,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSwappedTokenValue = function (e, t) {
                    const { symbol: n, decimals: u, address: l } = t,
                      { primaryTransaction: d, initialTransaction: p } = e,
                      { type: m } = p,
                      { from: h } = p.txParams || {},
                      f = (0, s.useSelector)(i.getCurrentChainId),
                      g =
                        m === r.TransactionType.swap &&
                        ((null == t ? void 0 : t.symbol) === d.destinationTokenSymbol ||
                          ((0, a.isSwapsDefaultTokenAddress)(t.address, f) &&
                            (0, a.isSwapsDefaultTokenSymbol)(d.destinationTokenSymbol, f))),
                      y =
                        [r.TransactionType.swap].includes(m) && g
                          ? (0, o.getSwapsTokensReceivedFromTxMeta)(
                              d.destinationTokenSymbol,
                              p,
                              l,
                              h,
                              u,
                              null,
                              f
                            )
                          : [r.TransactionType.swap, r.TransactionType.swapAndSend].includes(m) &&
                            d.swapTokenValue,
                      k = 'string' == typeof y && -1 === Math.sign(y),
                      v = (0, c.useTokenFiatAmount)(l, y || '', n),
                      T = (0, c.useTokenFiatAmount)(d.sourceTokenAddress, y, d.sourceTokenSymbol);
                    let b;
                    y && (g ? (b = v) : m === r.TransactionType.swapAndSend && (b = T));
                    return {
                      swapTokenValue: y,
                      swapTokenFiatAmount: b,
                      isViewingReceivedTokenFromSwap: g,
                      isNegative: k,
                    };
                  });
                var s = e('react-redux'),
                  r = e('@metamask/transaction-controller'),
                  o = e('../../shared/lib/transactions-controller-utils'),
                  a = e('../../shared/modules/swaps.utils'),
                  i = e('../../shared/modules/selectors/networks'),
                  c = e('./useTokenFiatAmount');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useSwappedTokenValue.js' },
    ],
    [
      7008,
      {
        '../../shared/constants/preferences': 5809,
        '../selectors': 7601,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTheme = function () {
                    const e = (0, r.useSelector)(o.getTheme),
                      [t, n] = (0, s.useState)(e);
                    return (
                      (0, s.useEffect)(() => {
                        const t =
                          e && e !== a.ThemeType.os
                            ? e
                            : document.documentElement.getAttribute('data-theme');
                        i.includes(t) ||
                          (console.warn(
                            `useTheme: Invalid theme resolved to "${t}". Defaulting to "${a.ThemeType.light}".`
                          ),
                          n(a.ThemeType.light)),
                          n(t);
                      }, [e]),
                      t
                    );
                  });
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../../shared/constants/preferences');
                const i = Object.values(a.ThemeType).filter(e => e !== a.ThemeType.os);
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTheme.ts' },
    ],
    [
      7009,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTimeout = function (e, t, n = !0) {
                    const r = (0, s.useRef)(),
                      [o, a] = (0, s.useState)(null);
                    (0, s.useEffect)(() => {
                      r.current = e;
                    }, [e]),
                      (0, s.useEffect)(() => {
                        if ('start' !== o) return undefined;
                        const e = setTimeout(() => {
                          r.current();
                        }, t);
                        return (
                          a(e),
                          () => {
                            clearTimeout(o);
                          }
                        );
                      }, [t, o]);
                    const i = (0, s.useCallback)(() => {
                      clearTimeout(o), a('start');
                    }, [o]);
                    n && i();
                    return i;
                  });
                var s = e('react');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTimeout.js' },
    ],
    [
      701,
      { '../RegistryItem': 695, '../RegistryType': 696, '../lib': 706, './DerivationSchema': 700 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.KeyDerivation = void 0);
                const s = e('../RegistryType'),
                  r = e('../RegistryItem'),
                  o = e('../lib'),
                  a = e('./DerivationSchema');
                var i;
                !(function (e) {
                  e[(e.schemas = 1)] = 'schemas';
                })(i || (i = {}));
                class c extends r.RegistryItem {
                  constructor(e) {
                    super(),
                      (this.schemas = e),
                      (this.getRegistryType = () => s.RegistryTypes.KEY_DERIVATION_CALL),
                      (this.getSchemas = () => this.schemas),
                      (this.toDataItem = () => {
                        const e = {};
                        return (
                          (e[i.schemas] = this.schemas.map(e => {
                            const t = e.toDataItem();
                            return t.setTag(e.getRegistryType().getTag()), t;
                          })),
                          new o.DataItem(e)
                        );
                      });
                  }
                }
                (n.KeyDerivation = c),
                  (c.fromDataItem = e => {
                    const t = e
                      .getData()
                      [i.schemas].map(e => a.KeyDerivationSchema.fromDataItem(e));
                    return new c(t);
                  }),
                  (c.fromCBOR = e => {
                    const t = (0, o.decodeToDataItem)(e);
                    return c.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/extended/KeyDerivation.js',
      },
    ],
    [
      7010,
      {
        '../../shared/modules/conversion.utils': 5858,
        '../../shared/modules/selectors/networks': 5875,
        '../ducks/metamask/metamask': 6860,
        '../store/actions': 7619,
        './useMultiPolling': 6990,
        'bn.js': 4078,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.stringifyBalance = p),
                  (n.useTokenTracker = n.useTokenBalances = void 0);
                var s = e('react-redux'),
                  r = l(e('bn.js')),
                  o = e('../../shared/modules/selectors/networks'),
                  a = e('../store/actions'),
                  i = e('../ducks/metamask/metamask'),
                  c = e('../../shared/modules/conversion.utils'),
                  u = l(e('./useMultiPolling'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = ({ chainIds: e } = {}) => {
                  const t = (0, s.useSelector)(i.getTokenBalances),
                    n = (0, s.useSelector)(o.getNetworkConfigurationsByChainId);
                  return (
                    (0, u.default)({
                      startPolling: a.tokenBalancesStartPolling,
                      stopPollingByPollingToken: a.tokenBalancesStopPollingByPollingToken,
                      input: e ?? Object.keys(n),
                    }),
                    { tokenBalances: t }
                  );
                };
                n.useTokenBalances = d;
                function p(e, t, n = 5) {
                  if (e.eq(new r.default(0))) return '0';
                  const s = parseInt(t.toString(), 10);
                  if (0 === s) return e.toString();
                  let o = e.toString(),
                    a = o.length,
                    i = a - s,
                    c = '';
                  if (i <= 0) {
                    for (; c.length <= -1 * i; ) (c += '0'), (a += 1);
                    (o = c + o), (i = 1);
                  }
                  const u = o.substr(0, a - s);
                  if (0 === n) return u;
                  const l = o.substr(i, n);
                  if (/0+$/u.test(l)) {
                    let e = o.substr(i).replace(/0+$/u, '');
                    return e.length > 0 && (e = `.${e}`), `${u}${e}`;
                  }
                  return `${u}.${l}`;
                }
                n.useTokenTracker = ({
                  chainId: e,
                  tokens: t,
                  address: n,
                  hideZeroBalanceTokens: s,
                }) => {
                  const { tokenBalances: o } = d({ chainIds: [e] });
                  return {
                    tokensWithBalances: t.reduce((t, a) => {
                      var i;
                      const u =
                        (null === (i = o[n]) || void 0 === i || null === (i = i[e]) || void 0 === i
                          ? void 0
                          : i[a.address]) ?? '0x0';
                      if ('0x0' !== u || !s) {
                        const e = (0, c.hexToDecimal)(u);
                        t.push({
                          address: a.address,
                          symbol: a.symbol,
                          decimals: a.decimals,
                          balance: e,
                          balanceError: null,
                          string: p(new r.default(e), new r.default(a.decimals)),
                        });
                      }
                      return t;
                    }, []),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenBalances.ts' },
    ],
    [
      7011,
      { '../../shared/modules/transaction.utils': 5880, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTokenData = function (e, t = !0) {
                    return (0, s.useMemo)(
                      () => (t && e ? (0, r.parseStandardTokenTransactionData)(e) : null),
                      [t, e]
                    );
                  });
                var s = e('react'),
                  r = e('../../shared/modules/transaction.utils');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenData.js' },
    ],
    [
      7012,
      {
        '../ducks/metamask/metamask': 6860,
        '../selectors': 7601,
        '../store/actions': 7619,
        './useMultiPolling': 6990,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../store/actions'),
                  i = e('../ducks/metamask/metamask'),
                  c = (s = e('./useMultiPolling')) && s.__esModule ? s : { default: s };
                n.default = () => {
                  const e = (0, r.useSelector)(o.getUseTokenDetection),
                    t = (0, r.useSelector)(i.getCompletedOnboarding),
                    n = (0, r.useSelector)(i.getIsUnlocked),
                    s = (0, r.useSelector)(o.getChainIdsToPoll),
                    u = t && n && e;
                  return (
                    (0, c.default)({
                      startPolling: a.tokenDetectionStartPolling,
                      stopPollingByPollingToken: a.tokenDetectionStopPollingByPollingToken,
                      input: u ? [s] : [],
                    }),
                    {}
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenDetectionPolling.ts' },
    ],
    [
      7013,
      {
        '../../shared/lib/metamask-controller-utils': 5838,
        '../../shared/lib/transactions-controller-utils': 5851,
        './useTokenData': 7011,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTokenDisplayValue = function (e, t, n = !0) {
                    const i = (0, a.useTokenData)(e, n),
                      c = (0, r.getTokenValueParam)(i),
                      u = Boolean(
                        n && e && t && null !== t.decimals && t.decimals !== undefined && c
                      );
                    return (0, s.useMemo)(
                      () => (u ? (0, o.calcTokenAmount)(c, t.decimals).toString(10) : null),
                      [u, c, t]
                    );
                  });
                var s = e('react'),
                  r = e('../../shared/lib/metamask-controller-utils'),
                  o = e('../../shared/lib/transactions-controller-utils'),
                  a = e('./useTokenData');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenDisplayValue.js' },
    ],
    [
      7015,
      {
        '../ducks/metamask/metamask': 6860,
        '../selectors': 7601,
        '../store/actions': 7619,
        './useMultiPolling': 6990,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../store/actions'),
                  i = e('../ducks/metamask/metamask'),
                  c = (s = e('./useMultiPolling')) && s.__esModule ? s : { default: s };
                n.default = () => {
                  const e = (0, r.useSelector)(o.getUseTokenDetection),
                    t = (0, r.useSelector)(o.getUseTransactionSimulations),
                    n = (0, r.useSelector)(i.getCompletedOnboarding),
                    s = (0, r.useSelector)(i.getIsUnlocked),
                    u = (0, r.useSelector)(o.getUseExternalServices),
                    l = (0, r.useSelector)(o.getChainIdsToPoll),
                    d = n && s && u && (e || t);
                  return (
                    (0, c.default)({
                      startPolling: a.tokenListStartPolling,
                      stopPollingByPollingToken: a.tokenListStopPollingByPollingToken,
                      input: d ? l : [],
                    }),
                    {}
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenListPolling.ts' },
    ],
    [
      7016,
      {
        '../ducks/metamask/metamask': 6860,
        '../selectors': 7601,
        '../store/actions': 7619,
        './useMultiPolling': 6990,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = e('react-redux'),
                  o = e('../selectors'),
                  a = e('../store/actions'),
                  i = e('../ducks/metamask/metamask'),
                  c = (s = e('./useMultiPolling')) && s.__esModule ? s : { default: s };
                n.default = () => {
                  const e = (0, r.useSelector)(i.getCompletedOnboarding),
                    t = (0, r.useSelector)(i.getIsUnlocked),
                    n = (0, r.useSelector)(o.getUseCurrencyRateCheck),
                    s = (0, r.useSelector)(o.getChainIdsToPoll),
                    u = (0, r.useSelector)(o.getTokenExchangeRates),
                    l = (0, r.useSelector)(o.getTokensMarketData),
                    d = (0, r.useSelector)(o.getMarketData),
                    p = e && t && n;
                  return (
                    (0, c.default)({
                      startPolling: a.tokenRatesStartPolling,
                      stopPollingByPollingToken: a.tokenRatesStopPollingByPollingToken,
                      input: p ? s : [],
                    }),
                    { tokenExchangeRates: u, tokensMarketData: l, marketData: d }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenRatesPolling.ts' },
    ],
    [
      7017,
      {
        '../../shared/constants/time': 5817,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/string-utils': 5878,
        '../selectors': 7601,
        './useEqualityCheck': 6978,
        '@metamask/eth-token-tracker': 1884,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTokenTracker = function ({
                    tokens: e,
                    address: t,
                    includeFailedTokens: n = !1,
                    hideZeroBalanceTokens: s = !1,
                  }) {
                    const { chainId: p, rpcUrl: m } = (0, a.useSelector)(c.getProviderConfig),
                      { address: h } = (0, a.useSelector)(
                        i.getSelectedInternalAccount,
                        a.shallowEqual
                      ),
                      f = t ?? h,
                      [g, y] = (0, r.useState)(() => (null == e ? void 0 : e.length) >= 0),
                      [k, v] = (0, r.useState)([]),
                      [T, b] = (0, r.useState)(null),
                      w = (0, r.useRef)(null),
                      S = (0, d.useEqualityCheck)(e),
                      C = (0, r.useCallback)(
                        e => {
                          const t = (s ? e.filter(e => Number(e.balance) > 0) : e).map(e => {
                            const t = S.find(t =>
                              (0, l.isEqualCaseInsensitive)(t.address, e.address)
                            );
                            return {
                              ...e,
                              isERC721: null == t ? void 0 : t.isERC721,
                              image: null == t ? void 0 : t.image,
                            };
                          });
                          v(t), y(!1), b(null);
                        },
                        [s, S]
                      ),
                      _ = (0, r.useCallback)(e => {
                        b(e), y(!1);
                      }, []),
                      E = (0, r.useCallback)(() => {
                        w.current &&
                          (w.current.stop(),
                          w.current.removeAllListeners('update'),
                          w.current.removeAllListeners('error'),
                          (w.current = null));
                      }, []),
                      I = (0, r.useCallback)(
                        (e, t) => {
                          E(),
                            (w.current = new o.default({
                              userAddress: e,
                              provider: global.ethereumProvider,
                              tokens: t,
                              includeFailedTokens: n,
                              pollingInterval: 8 * u.SECOND,
                              balanceDecimals: 5,
                            })),
                            w.current.on('update', C),
                            w.current.on('error', _),
                            w.current.updateBalances();
                        },
                        [C, n, _, E]
                      );
                    return (
                      (0, r.useEffect)(() => E, [E]),
                      (0, r.useEffect)(() => {
                        y(!0),
                          f && p !== undefined && global.ethereumProvider
                            ? (0 === S.length && C([]), I(f, S))
                            : E();
                      }, [f, E, p, m, S, C, I]),
                      { loading: g, tokensWithBalances: k, error: T }
                    );
                  });
                var s,
                  r = e('react'),
                  o = (s = e('@metamask/eth-token-tracker')) && s.__esModule ? s : { default: s },
                  a = e('react-redux'),
                  i = e('../selectors'),
                  c = e('../../shared/modules/selectors/networks'),
                  u = e('../../shared/constants/time'),
                  l = e('../../shared/modules/string-utils'),
                  d = e('./useEqualityCheck');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokenTracker.js' },
    ],
    [
      7018,
      {
        '../../shared/constants/network': 5804,
        '../../shared/constants/swaps': 5815,
        '../../shared/modules/hexstring-utils': 5864,
        '../../shared/modules/selectors/networks': 5875,
        '../../shared/modules/swaps.utils': 5879,
        '../ducks/metamask/metamask': 6860,
        '../ducks/swaps/swaps': 6868,
        '../helpers/utils/token-util': 6918,
        '../selectors': 7601,
        './useEqualityCheck': 6978,
        '@metamask/assets-controllers': 1353,
        'bignumber.js': 4030,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getRenderableTokenData = v),
                  (n.useTokensToSearch = function ({
                    usersTokens: e = [],
                    topTokens: t = {},
                    shuffledTokensList: n,
                    tokenBucketPriority: s = g.TokenBucketPriority.owned,
                  }) {
                    const c = (0, o.useSelector)(d.getCurrentChainId),
                      u = (0, o.useSelector)(l.getTokenExchangeRates, i.isEqual),
                      f = (0, o.useSelector)(p.getConversionRate),
                      y = (0, o.useSelector)(p.getCurrentCurrency),
                      T = (0, o.useSelector)(l.getSwapsDefaultToken, o.shallowEqual),
                      b = (0, o.useSelector)(l.getTokenList, i.isEqual),
                      w = (0, k.useEqualityCheck)(t),
                      S = (0, k.useEqualityCheck)(e),
                      C = v(T, u, f, y, c, b),
                      _ = (0, k.useEqualityCheck)(C),
                      E = (0, o.useSelector)(m.getSwapsTokens, i.isEqual) || [],
                      I = E.length ? E : [_, ...n.filter(e => e.symbol !== _.symbol)],
                      x = (0, k.useEqualityCheck)(I);
                    return (0, r.useMemo)(() => {
                      const e = S.reduce((e, t) => ({ ...e, [t.address.toLowerCase()]: t }), {}),
                        t = { owned: [], top: [], others: [] };
                      return (
                        (0, i.uniqBy)([_, ...x, ...S], e => e.address.toLowerCase()).forEach(n => {
                          const r = v({ ...e[n.address.toLowerCase()], ...n }, u, f, y, c, b);
                          s === g.TokenBucketPriority.owned
                            ? (0, h.isSwapsDefaultTokenSymbol)(r.symbol, c) ||
                              e[n.address.toLowerCase()]
                              ? t.owned.push(r)
                              : w[n.address.toLowerCase()]
                                ? (t.top[w[n.address.toLowerCase()].index] = r)
                                : t.others.push(r)
                            : w[n.address.toLowerCase()]
                              ? (t.top[w[n.address.toLowerCase()].index] = r)
                              : (0, h.isSwapsDefaultTokenSymbol)(r.symbol, c) ||
                                  e[n.address.toLowerCase()]
                                ? t.owned.push(r)
                                : t.others.push(r);
                        }),
                        (t.owned = t.owned.sort(({ rawFiat: e }, { rawFiat: t }) =>
                          new a.default(e || 0).gt(t || 0) ? -1 : 1
                        )),
                        (t.top = t.top.filter(Boolean)),
                        s === g.TokenBucketPriority.owned
                          ? [...t.owned, ...t.top, ...t.others]
                          : [...t.top, ...t.owned, ...t.others]
                      );
                    }, [x, S, w, u, f, y, _, c, b, s]);
                  });
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a = (s = e('bignumber.js')) && s.__esModule ? s : { default: s },
                  i = e('lodash'),
                  c = e('@metamask/assets-controllers'),
                  u = e('../helpers/utils/token-util'),
                  l = e('../selectors'),
                  d = e('../../shared/modules/selectors/networks'),
                  p = e('../ducks/metamask/metamask'),
                  m = e('../ducks/swaps/swaps'),
                  h = e('../../shared/modules/swaps.utils'),
                  f = e('../../shared/modules/hexstring-utils'),
                  g = e('../../shared/constants/swaps'),
                  y = e('../../shared/constants/network'),
                  k = e('./useEqualityCheck');
                function v(e, t, n, s, r, o) {
                  var i, l;
                  const {
                    symbol: d,
                    name: p,
                    address: m,
                    iconUrl: g,
                    string: k,
                    balance: v,
                    decimals: T,
                  } = e;
                  let b;
                  (0, h.isSwapsDefaultTokenSymbol)(d, r)
                    ? (b = 1)
                    : k && n > 0 && (b = t[(0, f.toChecksumHexAddress)(m)]);
                  const w = (0, u.getTokenFiatAmount)(b, n, s, k, d, !0) || '',
                    S = w ? (0, u.getTokenFiatAmount)(b, n, s, k, d, !1) : '',
                    C = r === y.CHAIN_IDS.SEPOLIA ? y.CHAIN_IDS.MAINNET : r,
                    _ =
                      ((d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.MAINNET) ||
                      (d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.SEPOLIA) ||
                      (d === y.CURRENCY_SYMBOLS.BNB && r === y.CHAIN_IDS.BSC) ||
                      (d === y.CURRENCY_SYMBOLS.MATIC && r === y.CHAIN_IDS.POLYGON) ||
                      (d === y.CURRENCY_SYMBOLS.AVALANCHE && r === y.CHAIN_IDS.AVALANCHE) ||
                      (d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.OPTIMISM) ||
                      (d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.ARBITRUM) ||
                      (d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.LINEA_MAINNET) ||
                      (d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.ZKSYNC_ERA) ||
                      (d === y.CURRENCY_SYMBOLS.ETH && r === y.CHAIN_IDS.BASE)
                        ? g
                        : (0, c.formatIconUrlWithProxy)({ chainId: C, tokenAddress: m || '' })) ||
                      (null == e ? void 0 : e.image);
                  return {
                    ...e,
                    primaryLabel: d,
                    secondaryLabel:
                      p ||
                      (null === (i = o[null == m ? void 0 : m.toLowerCase()]) || void 0 === i
                        ? void 0
                        : i.name),
                    rightPrimaryLabel: k && `${new a.default(k).round(6).toString()} ${d}`,
                    rightSecondaryLabel: w,
                    iconUrl: _,
                    identiconAddress: _ ? null : m,
                    balance: v,
                    decimals: T,
                    name:
                      p ||
                      (null === (l = o[null == m ? void 0 : m.toLowerCase()]) || void 0 === l
                        ? void 0
                        : l.name),
                    rawFiat: S,
                    image: e.image || e.iconUrl,
                  };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTokensToSearch.js' },
    ],
    [
      7019,
      {
        '../../shared/constants/bridge': 5790,
        '../../shared/constants/transaction': 5819,
        '../../shared/lib/metamask-controller-utils': 5838,
        '../../shared/modules/string-utils': 5878,
        '../ducks/bridge-status/selectors': 6847,
        '../ducks/locale/locale': 6859,
        '../ducks/metamask/metamask': 6860,
        '../helpers/constants/common': 6870,
        '../helpers/constants/transactions': 6884,
        '../helpers/utils/common.util': 6898,
        '../helpers/utils/token-util': 6918,
        '../helpers/utils/transactions.util': 6919,
        '../helpers/utils/util': 6921,
        '../pages/bridge/hooks/useBridgeTokenDisplayData': 7039,
        '../pages/confirmations/components/simulation-details/formatAmount': 7244,
        '../selectors/selectors': 7611,
        '../store/actions': 7619,
        './bridge/useBridgeChainInfo': 6932,
        './useCurrencyDisplay': 6974,
        './useCurrentAsset': 6976,
        './useI18nContext': 6985,
        './useSwappedTokenValue': 7007,
        './useTokenData': 7011,
        './useTokenDisplayValue': 7013,
        './useTokenFiatAmount': 7014,
        './useUserPreferencedCurrency': 7020,
        '@metamask/transaction-controller': 2946,
        'bignumber.js': 4030,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTransactionDisplayData = function (e) {
                    var t, n, N, R, B, j, F, L, $, U, W;
                    const H = (0, s.useDispatch)(),
                      q = (0, s.useSelector)(w.getIntlLocale),
                      K = (0, P.useCurrentAsset)(),
                      V = (0, s.useSelector)(i.getAllTokens),
                      G = (0, s.useSelector)(i.getSelectedAddress),
                      z = (0, s.useSelector)(h.getNfts),
                      Y = (0, s.useSelector)(i.getAllDetectedTokens),
                      Q = (0, s.useSelector)(i.selectERC20TokensByChain),
                      J = (0, C.useI18nContext)(),
                      X = (0, s.useSelector)(v.selectBridgeHistoryForAccount),
                      Z = e.initialTransaction.id,
                      ee = X[Z],
                      { destNetwork: te } = (0, O.default)({
                        bridgeHistoryItem: ee,
                        srcTxMeta: e.initialTransaction,
                      }),
                      ne = S.NETWORK_TO_SHORT_NETWORK_NAME_MAP[null == te ? void 0 : te.chainId],
                      { initialTransaction: se, primaryTransaction: re } = e,
                      { type: oe } = se,
                      { from: ae, to: ie } = se.txParams || {},
                      ce =
                        (0, s.useSelector)(e => {
                          var t;
                          return (0, i.getKnownMethodData)(
                            e,
                            null == se || null === (t = se.txParams) || void 0 === t
                              ? void 0
                              : t.data
                          );
                        }) || {},
                      ue = (0, c.getStatusKey)(re),
                      le = ue in m.PENDING_STATUS_HASH,
                      de = ue === o.TransactionStatus.submitted,
                      pe = (0, r.useRef)(!0),
                      me = null === (t = re.txParams) || void 0 === t ? void 0 : t.value,
                      he = (0, p.formatDateWithYearContext)(se.time);
                    let fe,
                      ge = '-',
                      ye = !1,
                      ke = ie;
                    const ve = m.TOKEN_CATEGORY_HASH[oe];
                    let Te = null;
                    const [be, we] = (0, r.useState)(null);
                    var Se, Ce, _e, Ee, Ie, xe;
                    ve &&
                      (Te =
                        (null == V ||
                        null ===
                          (Se =
                            V[
                              null == e || null === (Ce = e.initialTransaction) || void 0 === Ce
                                ? void 0
                                : Ce.chainId
                            ]) ||
                        void 0 === Se ||
                        null === (Se = Se[G]) ||
                        void 0 === Se
                          ? void 0
                          : Se.find(({ address: e }) => (0, y.isEqualCaseInsensitive)(e, ke))) ||
                        (null == Y ||
                        null ===
                          (_e =
                            Y[
                              null == e || null === (Ee = e.initialTransaction) || void 0 === Ee
                                ? void 0
                                : Ee.chainId
                            ]) ||
                        void 0 === _e ||
                        null === (_e = _e[G]) ||
                        void 0 === _e
                          ? void 0
                          : _e.find(({ address: e }) => (0, y.isEqualCaseInsensitive)(e, ke))) ||
                        (null == Q ||
                        null ===
                          (Ie =
                            Q[
                              null == e || null === (xe = e.initialTransaction) || void 0 === xe
                                ? void 0
                                : xe.chainId
                            ]) ||
                        void 0 === Ie ||
                        null === (Ie = Ie.data) ||
                        void 0 === Ie
                          ? void 0
                          : Ie[ke.toLowerCase()]));
                    (0, r.useEffect)(
                      () => () => {
                        pe.current = !1;
                      },
                      []
                    ),
                      (0, r.useEffect)(() => {
                        !(async function () {
                          if (ve && !Te) {
                            var e;
                            const t = await (0, d.getAssetDetails)(
                              ie,
                              ae,
                              null == se || null === (e = se.txParams) || void 0 === e
                                ? void 0
                                : e.data,
                              z
                            );
                            !0 === pe.current && we(t);
                          }
                        })();
                      }, [
                        ve,
                        Te,
                        ke,
                        ae,
                        null == se || null === (n = se.txParams) || void 0 === n ? void 0 : n.data,
                        z,
                        ie,
                        pe,
                      ]),
                      be &&
                        (Te = { address: be.toAddress, symbol: be.symbol, decimals: be.decimals });
                    const Ae = (0, A.useTokenData)(
                        null == se || null === (N = se.txParams) || void 0 === N ? void 0 : N.data,
                        ve
                      ),
                      Me = (0, d.getTokenIdParam)(Ae) ?? (0, k.getTokenValueParam)(Ae),
                      Pe =
                        ve &&
                        z.find(
                          ({ address: e, tokenId: t }) =>
                            (0, y.isEqualCaseInsensitive)(e, ke) && t === Me
                        ),
                      Oe = (0, x.useTokenDisplayValue)(
                        null == re || null === (R = re.txParams) || void 0 === R ? void 0 : R.data,
                        Te,
                        ve
                      ),
                      Ne = (0, _.useTokenFiatAmount)(
                        null === (B = Te) || void 0 === B ? void 0 : B.address,
                        Oe,
                        null === (j = Te) || void 0 === j ? void 0 : j.symbol
                      ),
                      De = (0, p.stripHttpSchemes)(
                        se.origin ||
                          (null === (F = se.msgParams) || void 0 === F ? void 0 : F.origin) ||
                          ''
                      );
                    let Re,
                      Be,
                      je = ve ? (null === (L = Te) || void 0 === L ? void 0 : L.symbol) : undefined,
                      Fe = ve ? Oe : undefined,
                      Le = ve ? Ne : undefined;
                    const {
                        swapTokenValue: $e,
                        isNegative: Ue,
                        swapTokenFiatAmount: We,
                        isViewingReceivedTokenFromSwap: He,
                      } = (0, M.useSwappedTokenValue)(e, K),
                      qe = (0, T.useBridgeTokenDisplayData)(e);
                    if (D.includes(oe))
                      (Re = f.TransactionGroupCategory.signatureRequest),
                        (Be = J('signatureRequest')),
                        (fe = De),
                        (ye = !0);
                    else if (oe === o.TransactionType.swap)
                      (Re = f.TransactionGroupCategory.swap),
                        (Be = J('swapTokenToToken', [
                          se.sourceTokenSymbol,
                          se.destinationTokenSymbol,
                        ])),
                        (fe = De),
                        (ye = !0),
                        (je = He ? K.symbol : se.sourceTokenSymbol),
                        (Fe = $e),
                        (Le = We),
                        (ge = Ue ? '' : He ? '+' : '-');
                    else if (oe === o.TransactionType.swapAndSend) {
                      const e = se.swapAndSendRecipient === ae;
                      (ke = se.swapAndSendRecipient),
                        (Re = f.TransactionGroupCategory.swapAndSend),
                        (Be = J('sendTokenAsToken', [
                          se.sourceTokenSymbol,
                          se.destinationTokenSymbol,
                        ])),
                        (fe = De),
                        (ye = !0),
                        (je = He && e ? K.symbol : se.sourceTokenSymbol),
                        (Fe = $e),
                        (Le = We),
                        (ge = Ue ? '' : He && e ? '+' : '-');
                    } else if (oe === o.TransactionType.swapApproval)
                      (Re = f.TransactionGroupCategory.approval),
                        (Be = J('swapApproval', [re.sourceTokenSymbol])),
                        (fe = De),
                        (ye = !0),
                        (je = re.sourceTokenSymbol);
                    else if (oe === o.TransactionType.tokenMethodApprove) {
                      var Ke;
                      (Re = f.TransactionGroupCategory.approval),
                        (ge = ''),
                        (Be = J('approveSpendingCap', [
                          (null === (Ke = Te) || void 0 === Ke ? void 0 : Ke.symbol) ||
                            J('token').toLowerCase(),
                        ])),
                        (fe = De),
                        (ye = !0);
                    } else if (oe === o.TransactionType.tokenMethodSetApprovalForAll) {
                      var Ve, Ge, ze;
                      const e = !(null != Ae && null !== (Ve = Ae.args) && void 0 !== Ve && Ve[1]);
                      (Re = f.TransactionGroupCategory.approval),
                        (ge = ''),
                        (Be = e
                          ? J('revokePermissionTitle', [
                              (null === (Ge = Te) || void 0 === Ge ? void 0 : Ge.symbol) ||
                                (null == Pe ? void 0 : Pe.name) ||
                                J('token'),
                            ])
                          : J('setApprovalForAllTitle', [
                              (null === (ze = Te) || void 0 === ze ? void 0 : ze.symbol) ||
                                J('token'),
                            ])),
                        (fe = De),
                        (ye = !0);
                    } else if (oe === o.TransactionType.tokenMethodIncreaseAllowance) {
                      var Ye;
                      (Re = f.TransactionGroupCategory.approval),
                        (ge = ''),
                        (Be = J('approveIncreaseAllowance', [
                          (null === (Ye = Te) || void 0 === Ye ? void 0 : Ye.symbol) || J('token'),
                        ])),
                        (fe = De),
                        (ye = !0);
                    } else if (
                      oe === o.TransactionType.contractInteraction ||
                      oe === o.TransactionType.batch ||
                      oe === o.TransactionType.revokeDelegation
                    ) {
                      Re = f.TransactionGroupCategory.interaction;
                      const e = (0, c.getTransactionTypeTitle)(J, oe);
                      (Be =
                        ((null == ce ? void 0 : ce.name) &&
                          (0, u.camelCaseToCapitalize)(ce.name)) ||
                        e),
                        (fe = De),
                        (ye = !0);
                    } else if (oe === o.TransactionType.deployContract)
                      (Re = f.TransactionGroupCategory.interaction),
                        (Be = (0, c.getTransactionTypeTitle)(J, oe)),
                        (fe = De),
                        (ye = !0);
                    else if (oe === o.TransactionType.incoming)
                      (Re = f.TransactionGroupCategory.receive),
                        (Be = J('receive')),
                        (ge = ''),
                        (fe = J('fromAddress', [(0, p.shortenAddress)(ae)]));
                    else if (
                      oe === o.TransactionType.tokenMethodTransferFrom ||
                      oe === o.TransactionType.tokenMethodTransfer
                    ) {
                      var Qe;
                      (Re = f.TransactionGroupCategory.send),
                        (Be = J('sendSpecifiedTokens', [
                          (null === (Qe = Te) || void 0 === Qe ? void 0 : Qe.symbol) ||
                            (null == Pe ? void 0 : Pe.name) ||
                            J('token'),
                        ])),
                        (ke = (0, d.getTokenAddressParam)(Ae)),
                        (fe = J('toAddress', [(0, p.shortenAddress)(ke)]));
                    } else
                      oe === o.TransactionType.tokenMethodSafeTransferFrom
                        ? ((Re = f.TransactionGroupCategory.send),
                          (Be = J('safeTransferFrom')),
                          (ke = (0, d.getTokenAddressParam)(Ae)),
                          (fe = J('toAddress', [(0, p.shortenAddress)(ke)])))
                        : oe === o.TransactionType.simpleSend
                          ? ((Re = f.TransactionGroupCategory.send),
                            (Be = J('send')),
                            (fe = J('toAddress', [(0, p.shortenAddress)(ke)])))
                          : oe === o.TransactionType.bridgeApproval
                            ? ((Be = J('bridgeApproval')),
                              (Re = f.TransactionGroupCategory.approval),
                              (Be = J('bridgeApproval', [re.sourceTokenSymbol])),
                              (fe = De),
                              (ye = !0),
                              (je = re.sourceTokenSymbol))
                            : oe === o.TransactionType.bridge
                              ? ((Be = J('bridgeToChain', [ne || ''])),
                                (Re = qe.category),
                                (je = qe.sourceTokenSymbol),
                                (Fe = (0, b.formatAmount)(
                                  q,
                                  new a.default(qe.sourceTokenAmountSent ?? 0)
                                )),
                                (Le = qe.displayCurrencyAmount))
                              : H(
                                  (0, g.captureSingleException)(
                                    `useTransactionDisplayData does not recognize transaction type. Type received is: ${oe}`
                                  )
                                );
                    const Je = (0, E.useUserPreferencedCurrency)(
                        l.PRIMARY,
                        {},
                        null == e || null === ($ = e.initialTransaction) || void 0 === $
                          ? void 0
                          : $.chainId
                      ),
                      Xe = (0, E.useUserPreferencedCurrency)(l.SECONDARY),
                      [Ze] = (0, I.useCurrencyDisplay)(
                        me,
                        { prefix: ge, displayValue: Fe, suffix: je, ...Je },
                        null == e || null === (U = e.initialTransaction) || void 0 === U
                          ? void 0
                          : U.chainId
                      ),
                      [et] = (0, I.useCurrencyDisplay)(
                        me,
                        { prefix: ge, displayValue: Le, hideLabel: ve || Boolean($e), ...Xe },
                        null == e || null === (W = e.initialTransaction) || void 0 === W
                          ? void 0
                          : W.chainId
                      );
                    return {
                      title: Be,
                      category: Re,
                      date: he,
                      subtitle: fe,
                      subtitleContainsOrigin: ye,
                      primaryCurrency: oe === o.TransactionType.swap && le ? '' : Ze,
                      senderAddress: ae,
                      recipientAddress: ke,
                      secondaryCurrency:
                        (ve && !Ne) ||
                        ([o.TransactionType.swap, o.TransactionType.swapAndSend].includes(oe) &&
                          !We)
                          ? undefined
                          : et,
                      displayedStatusKey: ue,
                      isPending: le,
                      isSubmitted: de,
                    };
                  });
                var s = e('react-redux'),
                  r = e('react'),
                  o = e('@metamask/transaction-controller'),
                  a = N(e('bignumber.js')),
                  i = e('../selectors/selectors'),
                  c = e('../helpers/utils/transactions.util'),
                  u = e('../helpers/utils/common.util'),
                  l = e('../helpers/constants/common'),
                  d = e('../helpers/utils/token-util'),
                  p = e('../helpers/utils/util'),
                  m = e('../helpers/constants/transactions'),
                  h = e('../ducks/metamask/metamask'),
                  f = e('../../shared/constants/transaction'),
                  g = e('../store/actions'),
                  y = e('../../shared/modules/string-utils'),
                  k = e('../../shared/lib/metamask-controller-utils'),
                  v = e('../ducks/bridge-status/selectors'),
                  T = e('../pages/bridge/hooks/useBridgeTokenDisplayData'),
                  b = e('../pages/confirmations/components/simulation-details/formatAmount'),
                  w = e('../ducks/locale/locale'),
                  S = e('../../shared/constants/bridge'),
                  C = e('./useI18nContext'),
                  _ = e('./useTokenFiatAmount'),
                  E = e('./useUserPreferencedCurrency'),
                  I = e('./useCurrencyDisplay'),
                  x = e('./useTokenDisplayValue'),
                  A = e('./useTokenData'),
                  M = e('./useSwappedTokenValue'),
                  P = e('./useCurrentAsset'),
                  O = N(e('./bridge/useBridgeChainInfo'));
                function N(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const D = [
                  null,
                  undefined,
                  o.TransactionType.sign,
                  o.TransactionType.personalSign,
                  o.TransactionType.signTypedData,
                  o.TransactionType.ethDecrypt,
                  o.TransactionType.ethGetEncryptionPublicKey,
                ];
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useTransactionDisplayData.js' },
    ],
    [
      702,
      { '../RegistryItem': 695, '../RegistryType': 696, '../lib': 706, './KeyDerivation': 701 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.QRHardwareCall = n.QRHardwareCallVersion = n.QRHardwareCallType = void 0);
                const s = e('../RegistryType'),
                  r = e('../RegistryItem'),
                  o = e('../lib'),
                  a = e('./KeyDerivation');
                var i, c;
                !(function (e) {
                  (e[(e.type = 1)] = 'type'),
                    (e[(e.params = 2)] = 'params'),
                    (e[(e.origin = 3)] = 'origin'),
                    (e[(e.version = 4)] = 'version');
                })(i || (i = {})),
                  (function (e) {
                    e[(e.KeyDerivation = 0)] = 'KeyDerivation';
                  })((c = n.QRHardwareCallType || (n.QRHardwareCallType = {}))),
                  (function (e) {
                    (e[(e.V0 = 0)] = 'V0'), (e[(e.V1 = 1)] = 'V1');
                  })(n.QRHardwareCallVersion || (n.QRHardwareCallVersion = {}));
                class u extends r.RegistryItem {
                  constructor(e, t, n, r) {
                    super(),
                      (this.type = e),
                      (this.params = t),
                      (this.origin = n),
                      (this.version = r),
                      (this.getRegistryType = () => s.RegistryTypes.QR_HARDWARE_CALL),
                      (this.getType = () => this.type),
                      (this.getParams = () => this.params),
                      (this.getOrigin = () => this.origin),
                      (this.getVersion = () => this.version),
                      (this.toDataItem = () => {
                        const e = {};
                        e[i.type] = this.type;
                        const t = this.params.toDataItem();
                        return (
                          t.setTag(this.params.getRegistryType().getTag()),
                          (e[i.params] = t),
                          this.origin && (e[i.origin] = this.origin),
                          this.version && (e[i.version] = this.version),
                          new o.DataItem(e)
                        );
                      });
                  }
                }
                (n.QRHardwareCall = u),
                  (u.fromDataItem = e => {
                    const t = e.getData(),
                      n = t[i.type] || c.KeyDerivation;
                    let s;
                    if (n === c.KeyDerivation) s = a.KeyDerivation.fromDataItem(t[i.params]);
                    const r = t[i.origin],
                      o = t[i.version];
                    return new u(n, s, r, o);
                  }),
                  (u.fromCBOR = e => {
                    const t = (0, o.decodeToDataItem)(e);
                    return u.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/extended/QRHardwareCall.js',
      },
    ],
    [
      7020,
      {
        '../../shared/constants/common': 5791,
        '../../shared/constants/network': 5804,
        '../constants': 6829,
        '../helpers/constants/common': 6870,
        '../selectors': 7601,
        '../selectors/multichain': 7605,
        './useMultichainSelector': 6993,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useUserPreferencedCurrency = function (e, t = {}, n = null) {
                    const d = (0, s.useSelector)(r.getSelectedInternalAccount),
                      p = t.account ?? d,
                      m = (0, l.useMultichainSelector)(o.getMultichainNativeCurrency, p),
                      { showNativeTokenAsMainBalance: h } = (0, s.useSelector)(
                        r.getPreferences,
                        s.shallowEqual
                      ),
                      f = (0, l.useMultichainSelector)(o.getMultichainShouldShowFiat, p),
                      g = {
                        currency: (0, l.useMultichainSelector)(o.getMultichainCurrentCurrency, p),
                        numberOfDecimals: t.numberOfDecimals || t.fiatNumberOfDecimals || 2,
                      },
                      y = {
                        currency: n
                          ? u.CHAIN_ID_TO_CURRENCY_SYMBOL_MAP[n] || m || i.EtherDenomination.ETH
                          : m || i.EtherDenomination.ETH,
                        numberOfDecimals:
                          t.numberOfDecimals || t.ethNumberOfDecimals || c.ETH_DEFAULT_DECIMALS,
                      };
                    if (t.showNativeOverride) return y;
                    if (t.showFiatOverride) return g;
                    if (!f) return y;
                    if ((t.shouldCheckShowNativeToken && h) || !t.shouldCheckShowNativeToken)
                      return e === a.PRIMARY ? y : g;
                    return e === a.PRIMARY ? g : y;
                  });
                var s = e('react-redux'),
                  r = e('../selectors'),
                  o = e('../selectors/multichain'),
                  a = e('../helpers/constants/common'),
                  i = e('../../shared/constants/common'),
                  c = e('../constants'),
                  u = e('../../shared/constants/network'),
                  l = e('./useMultichainSelector');
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useUserPreferencedCurrency.js' },
    ],
    [
      7021,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useWindowFocus = void 0);
                var s = e('react');
                n.useWindowFocus = () => {
                  const [e, t] = (0, s.useState)(document.hasFocus());
                  return (
                    (0, s.useEffect)(() => {
                      const e = () => t(!0),
                        n = () => t(!1);
                      return (
                        window.addEventListener('focus', e),
                        window.addEventListener('blur', n),
                        () => {
                          window.removeEventListener('focus', e),
                            window.removeEventListener('blur', n);
                        }
                      );
                    }, []),
                    e
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/hooks/useWindowFocus.ts' },
    ],
    [
      7022,
      {
        '../app/scripts/constants/sentry-state': 8,
        '../app/scripts/lib/util': 204,
        '../shared/constants/alerts': 5787,
        '../shared/constants/app': 5789,
        '../shared/constants/copy': 5792,
        '../shared/lib/error-utils': 5833,
        '../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts': 5840,
        '../shared/lib/switch-direction': 5847,
        '../shared/lib/trace': 5849,
        '../shared/modules/object.utils': 5869,
        '../shared/modules/selectors/networks': 5875,
        './ducks/alerts': 6842,
        './ducks/metamask/metamask': 6860,
        './helpers/utils/tags': 6917,
        './helpers/utils/tx-helper': 6920,
        './pages': 7383,
        './selectors': 7601,
        './store/actions': 7619,
        './store/background-connection': 7620,
        './store/store': 7622,
        'copy-to-clipboard': 4209,
        lodash: 4921,
        loglevel: 4929,
        react: 5328,
        'react-dom': 5157,
        util: 5732,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = async function (e) {
                    const { backgroundConnection: t, traceContext: n } = e,
                      r = await (0, k.trace)({ name: k.TraceName.GetState, parentContext: n }, () =>
                        (0, s.promisify)(t.getState.bind(t))()
                      ),
                      o = await (async function (e, t, n) {
                        const { traceContext: s } = n,
                          r = (0, A.getStartupTraceTags)({ metamask: e }),
                          o = await (0, k.trace)(
                            { name: k.TraceName.SetupStore, parentContext: s, tags: r },
                            () => D(e, t, n.activeTab)
                          );
                        return (
                          (global.metamask = {
                            updateCurrentLocale: e => {
                              o.dispatch(b.updateCurrentLocale(e));
                            },
                            setFeatureFlag: (e, t) => {
                              o.dispatch(b.setFeatureFlag(e, t));
                            },
                          }),
                          await (0, k.trace)(
                            { name: k.TraceName.InitialActions, parentContext: s },
                            () =>
                              (async function (e) {
                                const t = e.getState(),
                                  n = (0, S.getNetworkToAutomaticallySwitchTo)(t);
                                n
                                  ? await e.dispatch(
                                      b.automaticallySwitchNetwork(
                                        n,
                                        (0, S.getOriginOfCurrentTab)(t)
                                      )
                                    )
                                  : (0, S.getSwitchedNetworkDetails)(t) &&
                                    (await e.dispatch(b.clearSwitchedNetworkDetails()));
                                if ((0, l.getEnvironmentType)() === h.ENVIRONMENT_TYPE_POPUP) {
                                  const t = Date.now();
                                  (global.metamask.id = t),
                                    await e.dispatch(b.setCurrentExtensionPopupId(t));
                                }
                              })(o)
                          ),
                          (0, k.trace)({ name: k.TraceName.FirstRender, parentContext: s }, () =>
                            (0, c.render)(
                              i.default.createElement(E.default, { store: o }),
                              n.container
                            )
                          ),
                          o
                        );
                      })(r, t, e);
                    return (
                      await (0, s.promisify)(t.startPatches.bind(t))(),
                      (function (e) {
                        0;
                        (window.stateHooks.getCleanAppState = async function () {
                          const t = (0, a.clone)(e.getState());
                          return (
                            (t.version = global.platform.getVersion()),
                            (t.browser = window.navigator.userAgent),
                            t
                          );
                        }),
                          (window.stateHooks.getSentryAppState = function () {
                            const t = e.getState();
                            return (0, p.maskObject)(t, m.SENTRY_UI_STATE);
                          }),
                          (window.stateHooks.getLogs = function () {
                            const t = e.getState(),
                              { logs: n } = t.metamask;
                            return Object.values(n).sort((e, t) => e.timestamp - t.timestamp);
                          });
                      })(o),
                      o
                    );
                  }),
                  (n.setupInitialStore = D),
                  (n.updateBackgroundConnection = void 0);
                var s = e('util'),
                  r = P(e('copy-to-clipboard')),
                  o = P(e('loglevel')),
                  a = e('lodash'),
                  i = P(e('react')),
                  c = e('react-dom'),
                  u = P(e('webextension-polyfill')),
                  l = e('../app/scripts/lib/util'),
                  d = e('../shared/constants/alerts'),
                  p = e('../shared/modules/object.utils'),
                  m = e('../app/scripts/constants/sentry-state'),
                  h = e('../shared/constants/app'),
                  f = e('../shared/constants/copy'),
                  g = P(e('../shared/lib/switch-direction')),
                  y = e('../shared/lib/error-utils'),
                  k = e('../shared/lib/trace'),
                  v = e('../shared/modules/selectors/networks'),
                  T = e('../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts'),
                  b = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = M(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('./store/actions')),
                  w = P(e('./store/store')),
                  S = e('./selectors'),
                  C = e('./ducks/alerts'),
                  _ = e('./ducks/metamask/metamask'),
                  E = P(e('./pages')),
                  I = P(e('./helpers/utils/tx-helper')),
                  x = e('./store/background-connection'),
                  A = e('./helpers/utils/tags');
                function M(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (M = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function P(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                let O;
                o.default.setLevel(global.METAMASK_DEBUG ? 'debug' : 'warn', !1);
                const N = e => {
                  (0, x.setBackgroundConnection)(e),
                    e.onNotification(e => {
                      if ('sendUpdate' !== e.method)
                        throw new Error(
                          `Internal JSON-RPC Notification Not Handled:\n\n ${JSON.stringify(e)}`
                        );
                      O.dispatch(b.updateMetamaskState(e.params[0]));
                    });
                };
                async function D(e, t, n) {
                  e.featureFlags || (e.featureFlags = {});
                  const { currentLocaleMessages: s, enLocaleMessages: r } = await (0,
                  y.setupLocale)(e.currentLocale);
                  'rtl' === e.textDirection && (0, g.default)('rtl');
                  const o = {
                    activeTab: n,
                    metamask: e,
                    appState: {},
                    localeMessages: { currentLocale: e.currentLocale, current: s, en: r },
                  };
                  if ((N(t), (0, l.getEnvironmentType)() === h.ENVIRONMENT_TYPE_POPUP)) {
                    const { origin: e } = o.activeTab,
                      t = (0, S.getAllPermittedAccountsForCurrentTab)(o),
                      n = (0, S.getSelectedInternalAccount)(o),
                      s = (0, T.isInternalAccountInPermittedAccountIds)(n, t),
                      r = (0, _.getUnconnectedAccountAlertShown)(o),
                      a = (0, _.getUnconnectedAccountAlertEnabledness)(o);
                    e &&
                      a &&
                      !r[e] &&
                      t.length > 0 &&
                      !s &&
                      ((o[d.AlertTypes.unconnectedAccount] = { state: C.ALERT_STATE.OPEN }),
                      b.setUnconnectedAccountAlertShown(e));
                  }
                  const a = (0, w.default)(o);
                  O = a;
                  const i = (0, S.getUnapprovedTransactions)(e),
                    c = (0, I.default)(
                      i,
                      e.unapprovedPersonalMsgs,
                      e.unapprovedDecryptMsgs,
                      e.unapprovedEncryptionPublicKeyMsgs,
                      e.unapprovedTypedMessages,
                      e.networkId,
                      (0, v.getCurrentChainId)({ metamask: e })
                    );
                  return c.length > 0 && a.dispatch(b.showConfTxPage({ id: c[0].id })), a;
                }
                (n.updateBackgroundConnection = N),
                  (window.logStateString = async function (e) {
                    const t = await window.stateHooks.getCleanAppState(),
                      n = window.stateHooks.getLogs();
                    u.default.runtime
                      .getPlatformInfo()
                      .then(s => {
                        (t.platform = s), (t.logs = n);
                        const r = JSON.stringify(t, null, 2);
                        e(null, r);
                      })
                      .catch(t => {
                        e(t);
                      });
                  }),
                  (window.logState = function (e) {
                    return window.logStateString((t, n) => {
                      t
                        ? console.error(t.message)
                        : e
                          ? ((0, r.default)(n, f.COPY_OPTIONS), console.log('State log copied'))
                          : console.log(n);
                    });
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/index.js' },
    ],
    [
      7023,
      {
        '../../../shared/modules/string-utils': 5878,
        '../../components/app/assets/nfts/nft-details/nft-details': 5940,
        '../../ducks/metamask/metamask': 6860,
        '../../helpers/constants/routes': 6878,
        '../../selectors/assets': 7595,
        './components/native-asset': 7030,
        './components/token-asset': 7031,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  a = e('../../../shared/modules/string-utils'),
                  i = m(e('../../components/app/assets/nfts/nft-details/nft-details')),
                  c = e('../../ducks/metamask/metamask'),
                  u = e('../../helpers/constants/routes'),
                  l = e('../../selectors/assets'),
                  d = m(e('./components/native-asset')),
                  p = m(e('./components/token-asset'));
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, o.useParams)(),
                    { chainId: t, asset: n, id: m } = e,
                    h = n ? decodeURIComponent(n) : undefined,
                    f = (0, r.useSelector)(e => (0, c.getNFTsByChainId)(e, t)),
                    g = (0, r.useSelector)(e =>
                      (0, l.getTokenByAccountAndAddressAndChainId)(e, undefined, h, t)
                    ),
                    y = f.find(
                      ({ address: e, tokenId: t }) =>
                        (0, a.isEqualCaseInsensitive)(e, h) && m === t.toString()
                    );
                  (0, s.useEffect)(() => {
                    const e = document.querySelector('.app');
                    null == e || e.scroll(0, 0);
                  }, []);
                  const k = (() => {
                    if (y) return s.default.createElement(i.default, { nft: y });
                    if (!g || !t)
                      return s.default.createElement(o.Redirect, {
                        to: { pathname: u.DEFAULT_ROUTE },
                      });
                    return !g.isNative && g.address
                      ? s.default.createElement(p.default, { chainId: t, token: g })
                      : s.default.createElement(d.default, { chainId: t, token: g });
                  })();
                  return s.default.createElement(
                    'div',
                    { className: 'main-container asset__container' },
                    k
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/asset.tsx' },
    ],
    [
      7024,
      {
        '../../../components/component-library': 6402,
        '../../../components/ui/menu': 6773,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  o = (s = e('prop-types')) && s.__esModule ? s : { default: s },
                  a = e('react-router-dom'),
                  i = e('react-redux'),
                  c = e('../../../contexts/i18n'),
                  u = e('../../../components/ui/menu'),
                  l = e('../../../selectors'),
                  d = e('../../../helpers/constants/routes'),
                  p = e('../../../components/component-library'),
                  m = e('../../../helpers/constants/design-system'),
                  h = e('../../../selectors/multichain');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const g = ({
                  onRemove: e,
                  onClickBlockExplorer: t,
                  onViewTokenDetails: n,
                  tokenSymbol: s,
                  isNativeAsset: o,
                }) => {
                  const f = (0, r.useContext)(c.I18nContext),
                    [g, y] = (0, r.useState)(!1),
                    k = (0, a.useHistory)(),
                    v = (0, i.useSelector)(l.getBlockExplorerLinkText),
                    T = (0, r.useRef)(!1),
                    b = (0, i.useSelector)(h.getMultichainIsEvm) && !o;
                  return r.default.createElement(
                    'div',
                    { ref: T },
                    r.default.createElement(p.ButtonIcon, {
                      className: 'asset-options__button',
                      'data-testid': 'asset-options__button',
                      onClick: () => y(!0),
                      ariaLabel: f('assetOptions'),
                      iconName: p.IconName.MoreVertical,
                      color: m.Color.textDefault,
                      size: p.ButtonIconSize.Sm,
                    }),
                    g
                      ? r.default.createElement(
                          u.Menu,
                          { anchorElement: T.current, onHide: () => y(!1) },
                          r.default.createElement(
                            u.MenuItem,
                            {
                              iconName: p.IconName.Export,
                              'data-testid': 'asset-options__etherscan',
                              onClick:
                                'addBlockExplorer' === v.firstPart
                                  ? () => {
                                      k.push(`${d.NETWORKS_ROUTE}#blockExplorerUrl`);
                                    }
                                  : () => {
                                      y(!1), t();
                                    },
                            },
                            f(
                              v.firstPart,
                              '' === v.secondPart ? null : [f('blockExplorerAssetAction')]
                            )
                          ),
                          b &&
                            r.default.createElement(
                              u.MenuItem,
                              {
                                iconName: p.IconName.Trash,
                                'data-testid': 'asset-options__hide',
                                onClick: () => {
                                  y(!1), e();
                                },
                              },
                              f('hideTokenSymbol', [s])
                            ),
                          o || !n
                            ? null
                            : r.default.createElement(
                                u.MenuItem,
                                {
                                  iconName: p.IconName.Info,
                                  'data-testid': 'asset-options__token-details',
                                  onClick: () => {
                                    y(!1), n();
                                  },
                                },
                                f('tokenDetails')
                              )
                        )
                      : null
                  );
                };
                g.propTypes = {
                  isNativeAsset: o.default.bool,
                  onClickBlockExplorer: o.default.func.isRequired,
                  onRemove: e => {
                    if (!1 === e.isNativeAsset && 'function' != typeof e.onRemove)
                      throw new Error('When isNativeAsset is true, onRemove is a required prop');
                  },
                  onViewTokenDetails: o.default.func,
                  tokenSymbol: e => {
                    if (!1 === e.isNativeAsset && 'string' != typeof e.tokenSymbol)
                      throw new Error('When isNativeAsset is true, tokenSymbol is a required prop');
                  },
                };
                n.default = g;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/asset-options.js' },
    ],
    [
      7025,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../components/app/assets/hooks/useMultichainAssets': 5931,
        '../../../components/app/assets/token-cell': 5956,
        '../../../components/app/assets/util/calculateTokenBalance': 5960,
        '../../../components/app/transaction-list': 6314,
        '../../../components/app/wallet-overview/coin-buttons': 6321,
        '../../../components/component-library': 6402,
        '../../../components/multichain': 6574,
        '../../../ducks/metamask/metamask': 6860,
        '../../../ducks/ramps': 6862,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/confirm-tx.util': 6899,
        '../../../helpers/utils/portfolio': 6914,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../hooks/useTokenBalances': 7010,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../util': 7035,
        './chart/asset-chart': 7027,
        './token-buttons': 7032,
        '@metamask/assets-controllers': 1353,
        '@metamask/keyring-api': 2014,
        '@metamask/utils': 2995,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('@metamask/assets-controllers'),
                  r = e('@metamask/keyring-api'),
                  o = e('@metamask/utils'),
                  a = e('lodash'),
                  i = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = R(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  c = e('react-redux'),
                  u = e('react-router-dom'),
                  l = e('../../../../shared/constants/transaction'),
                  d = e('../../../../shared/modules/conversion.utils'),
                  p = e('../../../../shared/modules/hexstring-utils'),
                  m = D(e('../../../components/app/assets/hooks/useMultichainAssets')),
                  h = D(e('../../../components/app/assets/token-cell')),
                  f = e('../../../components/app/assets/util/calculateTokenBalance'),
                  g = D(e('../../../components/app/transaction-list')),
                  y = D(e('../../../components/app/wallet-overview/coin-buttons')),
                  k = e('../../../components/component-library'),
                  v = e('../../../components/multichain'),
                  T = e('../../../ducks/metamask/metamask'),
                  b = e('../../../ducks/ramps'),
                  w = e('../../../helpers/constants/design-system'),
                  S = e('../../../helpers/constants/routes'),
                  C = e('../../../helpers/utils/confirm-tx.util'),
                  _ = e('../../../helpers/utils/portfolio'),
                  E = e('../../../hooks/useI18nContext'),
                  I = e('../../../hooks/useMultichainSelector'),
                  x = e('../../../hooks/useTokenBalances'),
                  A = e('../../../selectors'),
                  M = e('../../../selectors/multichain'),
                  P = e('../util'),
                  O = D(e('./chart/asset-chart')),
                  N = D(e('./token-buttons'));
                function D(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function R(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (R = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function B(e, t) {
                  return i.default.createElement(
                    k.Box,
                    { display: w.Display.Flex, justifyContent: w.JustifyContent.spaceBetween },
                    i.default.createElement(
                      k.Text,
                      { color: w.TextColor.textAlternative, variant: w.TextVariant.bodyMdMedium },
                      e
                    ),
                    t
                  );
                }
                n.default = ({ asset: e, optionsButton: t }) => {
                  var n, D, R, j, F, L, $;
                  const U = (0, E.useI18nContext)(),
                    W = (0, u.useHistory)(),
                    H = (0, c.useSelector)(A.getSelectedAccount),
                    q = (0, c.useSelector)(T.getCurrentCurrency),
                    K = (0, I.useMultichainSelector)(M.getMultichainConversionRate),
                    V = (0, c.useSelector)(b.getIsNativeTokenBuyable),
                    G = (0, I.useMultichainSelector)(M.getMultichainIsEvm),
                    { chainId: z, type: Y, symbol: Q, name: J, image: X, decimals: Z } = e,
                    ee = Y === l.AssetType.native,
                    te = (0, c.useSelector)(e => (0, A.getSwapsDefaultToken)(e, z), a.isEqual),
                    ne = (0, c.useSelector)(e => (0, A.getIsSwapsChain)(e, z)),
                    se = (0, c.useSelector)(e => (0, A.getIsBridgeChain)(e, z)),
                    re = (0, c.useSelector)(A.getSelectedInternalAccount, a.isEqual),
                    oe =
                      re.methods.includes(r.EthMethod.SignTransaction) ||
                      re.methods.includes(r.EthMethod.SignUserOperation) ||
                      re.methods.includes(r.SolMethod.SignTransaction),
                    ae = (0, c.useSelector)(A.getMarketData),
                    ie = (0, c.useSelector)(A.getCurrencyRates),
                    ce = (0, I.useMultichainSelector)(M.getMultichainIsTestnet),
                    ue = (0, I.useMultichainSelector)(M.getMultichainShouldShowFiat),
                    le = !ce,
                    de = (0, c.useSelector)(A.getShowFiatInTestnets),
                    pe = ue && (le || (ce && de)),
                    me = (0, c.useSelector)(A.getSelectedAccountNativeTokenCachedBalanceByChainId),
                    { tokenBalances: he } = (0, x.useTokenBalances)({ chainIds: [z] }),
                    fe = he[H.address],
                    ge = (0, m.default)()
                      .filter(e => e.chainId === z && e.address !== undefined)
                      .find(t => {
                        switch (Y) {
                          case l.AssetType.native:
                            return t.isNative;
                          case l.AssetType.token:
                            return t.address === e.address;
                          default:
                            return !1;
                        }
                      }),
                    ye = (0, c.useSelector)(A.getParticipateInMetaMetrics),
                    ke = (0, c.useSelector)(A.getDataCollectionForMarketing),
                    ve = (0, c.useSelector)(A.getMetaMetricsId),
                    Te =
                      Y === l.AssetType.token
                        ? G
                          ? (0, p.toChecksumHexAddress)(e.address)
                          : e.address
                        : (0, s.getNativeTokenAddress)(z),
                    be = Y === l.AssetType.token,
                    we = be
                      ? G
                        ? (0, p.toChecksumHexAddress)(e.address)
                        : (0, o.parseCaipAssetType)(Te).assetReference
                      : '',
                    Se = null == fe || null === (n = fe[z]) || void 0 === n ? void 0 : n[Te],
                    Ce = (0, f.calculateTokenBalance)({
                      isNative: ee,
                      chainId: z,
                      address: Te,
                      decimals: Z,
                      nativeBalances: me,
                      selectedAccountTokenBalancesAcrossChains: fe,
                    }),
                    _e =
                      null === (D = ae[z]) || void 0 === D || null === (D = D[Te]) || void 0 === D
                        ? void 0
                        : D.currency,
                    Ee =
                      (null === (R = ae[z]) || void 0 === R || null === (R = R[Te]) || void 0 === R
                        ? void 0
                        : R.price) || undefined,
                    Ie =
                      Y === l.AssetType.native
                        ? null === (j = ie[Q]) || void 0 === j
                          ? void 0
                          : j.conversionRate
                        : (null === (F = ie[_e]) || void 0 === F ? void 0 : F.conversionRate) || 0,
                    xe = Ee * Ie * parseFloat(String(Ce)),
                    Ae = Ie !== undefined && Ee !== undefined ? Ie * Ee : undefined,
                    Me = null === (L = ae[z]) || void 0 === L ? void 0 : L[Te],
                    Pe =
                      K > 0 &&
                      Me &&
                      (Me.marketCap > 0 ||
                        Me.totalVolume > 0 ||
                        Me.circulatingSupply > 0 ||
                        Me.allTimeHigh > 0 ||
                        Me.allTimeLow > 0);
                  e.balance = {
                    value: (0, d.hexToDecimal)(Se),
                    display: String(Ce),
                    fiat: String(xe),
                  };
                  const Oe = G,
                    Ne = (0, i.useMemo)(
                      () =>
                        (0, _.getPortfolioUrl)(
                          '',
                          'asset_page',
                          ve,
                          ye,
                          ke,
                          re.address,
                          'spending-caps'
                        ),
                      [re.address, ke, ye, ve]
                    ),
                    De =
                      null ===
                        ($ = (0, c.useSelector)(M.getMultichainNetworkConfigurationsByChainId)[
                          z
                        ]) || void 0 === $
                        ? void 0
                        : $.name,
                    Re = (0, M.getImageForChainId)(z),
                    Be = G
                      ? {
                          address: Te,
                          chainId: z,
                          symbol: Q,
                          image: X,
                          title: J ?? Q,
                          tokenFiatAmount: pe && Ee ? xe : null,
                          string: Ce ? Ce.toString() : '',
                          decimals: e.decimals,
                          aggregators:
                            Y === l.AssetType.token && e.aggregators ? e.aggregators : [],
                          isNative: Y === l.AssetType.native,
                          primary: Ce ? Ce.toString() : '',
                          secondary: Ce ? Number(Ce) : 0,
                        }
                      : ge;
                  if (!Be) throw new Error('Token with fiat amount not found');
                  return i.default.createElement(
                    k.Box,
                    {
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 4,
                      className: 'asset__content',
                    },
                    i.default.createElement(
                      k.Box,
                      {
                        display: w.Display.Flex,
                        flexDirection: w.FlexDirection.Row,
                        justifyContent: w.JustifyContent.spaceBetween,
                        paddingLeft: 2,
                        paddingRight: 4,
                        paddingBottom: 1,
                      },
                      i.default.createElement(
                        k.Box,
                        { display: w.Display.Flex },
                        i.default.createElement(k.ButtonIcon, {
                          color: w.IconColor.iconAlternative,
                          marginRight: 1,
                          size: k.ButtonIconSize.Sm,
                          ariaLabel: U('back'),
                          iconName: k.IconName.ArrowLeft,
                          onClick: () => W.push(S.DEFAULT_ROUTE),
                        }),
                        i.default.createElement(
                          k.Text,
                          { 'data-testid': 'asset-name', color: w.TextColor.textAlternative },
                          J && Q && J !== Q ? `${J} (${Q})` : (J ?? Q)
                        )
                      ),
                      t
                    ),
                    i.default.createElement(O.default, {
                      chainId: z,
                      address: Te,
                      currentPrice: Ae,
                      currency: q,
                    }),
                    i.default.createElement(
                      k.Box,
                      { marginTop: 4 },
                      Y === l.AssetType.native
                        ? i.default.createElement(y.default, {
                            account: re,
                            trackingLocation: 'asset-page',
                            isBuyableChain: V,
                            isSigningEnabled: oe,
                            isSwapsChain: ne,
                            isBridgeChain: se,
                            chainId: z,
                            defaultSwapsToken: te,
                          })
                        : i.default.createElement(N.default, { token: e })
                    ),
                    i.default.createElement(
                      k.Box,
                      {
                        display: w.Display.Flex,
                        flexDirection: w.FlexDirection.Column,
                        paddingTop: 5,
                      },
                      i.default.createElement(
                        k.Text,
                        { variant: w.TextVariant.headingMd, paddingBottom: 2, paddingLeft: 4 },
                        U('yourBalance')
                      ),
                      [l.AssetType.token, l.AssetType.native].includes(Y) &&
                        i.default.createElement(h.default, {
                          key: `${Q}-${Te}`,
                          token: Be,
                          disableHover: !0,
                        }),
                      i.default.createElement(
                        k.Box,
                        {
                          marginTop: 2,
                          display: w.Display.Flex,
                          flexDirection: w.FlexDirection.Column,
                          gap: 7,
                        },
                        [l.AssetType.token, l.AssetType.native].includes(Y) &&
                          i.default.createElement(
                            k.Box,
                            {
                              display: w.Display.Flex,
                              flexDirection: w.FlexDirection.Column,
                              paddingLeft: 4,
                              paddingRight: 4,
                            },
                            i.default.createElement(
                              k.Text,
                              { variant: w.TextVariant.headingMd, paddingBottom: 4 },
                              U('tokenDetails')
                            ),
                            i.default.createElement(
                              k.Box,
                              {
                                display: w.Display.Flex,
                                flexDirection: w.FlexDirection.Column,
                                gap: 2,
                              },
                              B(
                                U('network'),
                                i.default.createElement(
                                  k.Text,
                                  {
                                    display: w.Display.Flex,
                                    alignItems: w.AlignItems.center,
                                    gap: 1,
                                    'data-testid': 'asset-network',
                                  },
                                  i.default.createElement(k.AvatarNetwork, {
                                    src: Re,
                                    name: De,
                                    size: k.AvatarNetworkSize.Sm,
                                  }),
                                  De
                                )
                              ),
                              be &&
                                i.default.createElement(
                                  k.Box,
                                  null,
                                  B(
                                    U('contractAddress'),
                                    i.default.createElement(v.AddressCopyButton, {
                                      address: we,
                                      shorten: !0,
                                    })
                                  ),
                                  i.default.createElement(
                                    k.Box,
                                    {
                                      display: w.Display.Flex,
                                      flexDirection: w.FlexDirection.Column,
                                      gap: 2,
                                    },
                                    e.decimals !== undefined &&
                                      B(
                                        U('tokenDecimal'),
                                        i.default.createElement(k.Text, null, e.decimals)
                                      ),
                                    e.aggregators &&
                                      e.aggregators.length > 0 &&
                                      i.default.createElement(
                                        k.Box,
                                        null,
                                        i.default.createElement(
                                          k.Text,
                                          {
                                            color: w.TextColor.textAlternative,
                                            variant: w.TextVariant.bodyMdMedium,
                                          },
                                          U('tokenList')
                                        ),
                                        i.default.createElement(
                                          k.Text,
                                          null,
                                          e.aggregators
                                            .map(e => e.replace(/^metamask$/iu, 'MetaMask'))
                                            .join(', ')
                                        )
                                      )
                                  )
                                ),
                              Oe &&
                                B(
                                  U('spendingCaps'),
                                  i.default.createElement(
                                    k.ButtonLink,
                                    {
                                      className:
                                        'asset-page__spending-caps mm-text--body-md-medium',
                                      href: Ne,
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                    },
                                    U('editInPortfolio')
                                  )
                                )
                            )
                          ),
                        Pe &&
                          i.default.createElement(
                            k.Box,
                            { paddingLeft: 4, paddingRight: 4 },
                            i.default.createElement(
                              k.Text,
                              { variant: w.TextVariant.headingMd, paddingBottom: 4 },
                              U('marketDetails')
                            ),
                            i.default.createElement(
                              k.Box,
                              {
                                display: w.Display.Flex,
                                flexDirection: w.FlexDirection.Column,
                                gap: 2,
                              },
                              Me.marketCap > 0 &&
                                B(
                                  U('marketCap'),
                                  i.default.createElement(
                                    k.Text,
                                    { 'data-testid': 'asset-market-cap' },
                                    (0, P.localizeLargeNumber)(U, Ie * Me.marketCap)
                                  )
                                ),
                              Me.totalVolume > 0 &&
                                B(
                                  U('totalVolume'),
                                  i.default.createElement(
                                    k.Text,
                                    null,
                                    (0, P.localizeLargeNumber)(U, Ie * Me.totalVolume)
                                  )
                                ),
                              Me.circulatingSupply > 0 &&
                                B(
                                  U('circulatingSupply'),
                                  i.default.createElement(
                                    k.Text,
                                    null,
                                    (0, P.localizeLargeNumber)(U, Me.circulatingSupply)
                                  )
                                ),
                              Me.allTimeHigh > 0 &&
                                B(
                                  U('allTimeHigh'),
                                  i.default.createElement(
                                    k.Text,
                                    null,
                                    (0, C.formatCurrency)(
                                      '' + Ie * Me.allTimeHigh,
                                      q,
                                      (0, P.getPricePrecision)(Ie * Me.allTimeHigh)
                                    )
                                  )
                                ),
                              Me.allTimeLow > 0 &&
                                B(
                                  U('allTimeLow'),
                                  i.default.createElement(
                                    k.Text,
                                    null,
                                    (0, C.formatCurrency)(
                                      '' + Ie * Me.allTimeLow,
                                      q,
                                      (0, P.getPricePrecision)(Ie * Me.allTimeLow)
                                    )
                                  )
                                )
                            )
                          ),
                        i.default.createElement(
                          k.Box,
                          { marginBottom: 8 },
                          i.default.createElement(
                            k.Text,
                            { paddingLeft: 4, paddingRight: 4, variant: w.TextVariant.headingMd },
                            U('yourActivity')
                          ),
                          Y === l.AssetType.native
                            ? i.default.createElement(g.default, { hideNetworkFilter: !0 })
                            : i.default.createElement(g.default, {
                                tokenAddress: Te,
                                hideNetworkFilter: !0,
                              })
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/asset-page.tsx' },
    ],
    [
      7026,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/confirm-tx.util': 6899,
        '../util': 7035,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('../../../helpers/constants/design-system'),
                  o = e('../../../components/component-library'),
                  a = e('../../../helpers/utils/confirm-tx.util'),
                  i = e('../util');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const u = s.default.createElement(
                    'svg',
                    {
                      className: 'chart-up',
                      width: '12',
                      height: '12',
                      viewBox: '0 0 12 12',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    s.default.createElement('path', {
                      d: 'M9.75 3.8125L6.25 7.4875L4.91667 5.3875L2.25 8.1875',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    }),
                    s.default.createElement('path', {
                      d: 'M8.08398 3.8125H9.75065V5.5625',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    })
                  ),
                  l = s.default.createElement(
                    'svg',
                    {
                      className: 'chart-down',
                      width: '12',
                      height: '12',
                      viewBox: '0 0 12 12',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    s.default.createElement('path', {
                      d: 'M9.75 8.1875L6.25 4.5125L4.91667 6.6125L2.25 3.8125',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    }),
                    s.default.createElement('path', {
                      d: 'M8.08398 8.1875H9.75065V6.4375',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    })
                  ),
                  d = (0, s.forwardRef)((e, t) => {
                    const [{ price: n, date: c }, d] = (0, s.useState)({
                      price: e.price,
                      date: e.date,
                    });
                    (0, s.useImperativeHandle)(t, () => ({ setPrice: d }));
                    const { loading: p, currency: m, comparePrice: h } = e,
                      f = n !== undefined && h !== undefined ? n - h : undefined;
                    return s.default.createElement(
                      o.Box,
                      { marginLeft: 4, marginRight: 4 },
                      s.default.createElement(
                        o.Text,
                        {
                          'data-testid': 'asset-hovered-price',
                          style: { width: '100px' },
                          variant: r.TextVariant.displayMd,
                          fontWeight: r.FontWeight.Medium,
                          borderRadius: r.BorderRadius.LG,
                          marginBottom: 1,
                          backgroundColor:
                            p && !n
                              ? r.BackgroundColor.backgroundAlternative
                              : r.BackgroundColor.transparent,
                        },
                        n ? (0, a.formatCurrency)(`${n}`, m, (0, i.getPricePrecision)(n)) : ' '
                      ),
                      s.default.createElement(
                        o.Box,
                        null,
                        f !== undefined && h !== undefined
                          ? s.default.createElement(
                              o.Box,
                              { style: { opacity: p ? i.loadingOpacity : 1 } },
                              f >= 0 ? u : l,
                              s.default.createElement(
                                o.Text,
                                {
                                  display: r.Display.InlineBlock,
                                  variant: r.TextVariant.bodyMdMedium,
                                  marginLeft: 1,
                                  marginRight: 1,
                                  color:
                                    f >= 0 ? r.TextColor.successDefault : r.TextColor.errorDefault,
                                },
                                (0, a.formatCurrency)(
                                  `${Math.abs(f)}`,
                                  m,
                                  (0, i.getPricePrecision)(f)
                                ),
                                ' ',
                                '(',
                                f >= 0 ? '+' : '',
                                ((f / h) * 100).toFixed(2),
                                '%)'
                              ),
                              s.default.createElement(
                                o.Text,
                                {
                                  display: r.Display.InlineBlock,
                                  variant: r.TextVariant.bodyMdMedium,
                                  color: r.TextColor.textAlternative,
                                },
                                (0, i.getShortDateFormatter)().format(c)
                              )
                            )
                          : s.default.createElement(
                              o.Text,
                              {
                                style: { width: '200px' },
                                backgroundColor: p
                                  ? r.BackgroundColor.backgroundAlternative
                                  : r.BackgroundColor.transparent,
                                borderRadius: r.BorderRadius.LG,
                                variant: r.TextVariant.bodyMdMedium,
                              },
                              ' '
                            )
                      )
                    );
                  });
                n.default = d;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/asset-price.tsx' },
    ],
    [
      7027,
      {
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useTheme': 7008,
        '../../useHistoricalPrices': 7034,
        '../../util': 7035,
        '../asset-price': 7026,
        './chart-tooltip': 7028,
        './crosshair-plugin': 7029,
        '@metamask/design-tokens': 1520,
        'chart.js': 4163,
        classnames: 4168,
        react: 5328,
        'react-chartjs-2': 5153,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('chart.js'),
                  o = e('react-chartjs-2'),
                  a = y(e('classnames')),
                  i = e('@metamask/design-tokens'),
                  c = e('../../../../hooks/useTheme'),
                  u = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../components/component-library'),
                  d = e('../../../../hooks/useI18nContext'),
                  p = e('../../useHistoricalPrices'),
                  m = e('../../util'),
                  h = y(e('../asset-price')),
                  f = y(e('./chart-tooltip')),
                  g = e('./crosshair-plugin');
                function y(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function v() {
                  return (
                    (v = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) ({}).hasOwnProperty.call(n, s) && (e[s] = n[s]);
                          }
                          return e;
                        }),
                    v.apply(null, arguments)
                  );
                }
                r.Chart.register(
                  r.LinearScale,
                  r.PointElement,
                  r.LineElement,
                  r.Filler,
                  r.Decimation,
                  g.CrosshairPlugin
                );
                const T = {
                  normalized: !0,
                  parsing: !1,
                  aspectRatio: 2.9,
                  layout: { autoPadding: !1, padding: 0 },
                  animation: { duration: 0 },
                  fill: !0,
                  backgroundColor: ({ chart: e }) => {
                    const t = e.ctx.createLinearGradient(0, 0, 0, e.height);
                    return (
                      t.addColorStop(0, `${e.options.borderColor}60`),
                      t.addColorStop(1, `${e.options.borderColor}00`),
                      t
                    );
                  },
                  elements: { line: { borderWidth: 2 }, point: { pointStyle: !1 } },
                  plugins: {
                    decimation: { algorithm: 'lttb', samples: 150, threshold: 150, enabled: !0 },
                  },
                };
                n.default = ({ chainId: e, address: t, currentPrice: n, currency: r }) => {
                  var g;
                  const y = (0, d.useI18nContext)(),
                    k = (0, c.useTheme)(),
                    [b, w] = (0, s.useState)('1D'),
                    S = (0, s.useRef)(),
                    C = (0, s.useRef)(),
                    {
                      loading: _,
                      data: { prices: E, edges: I },
                    } = (0, p.useHistoricalPrices)({
                      chainId: e,
                      address: t,
                      currency: r,
                      timeRange: b,
                    }),
                    { xMin: x, xMax: A, yMin: M, yMax: P } = I ?? {},
                    O = {
                      ...T,
                      borderColor: 'dark' === k ? i.brandColor.blue400 : i.brandColor.blue500,
                      scales: {
                        x: {
                          min: null == x ? void 0 : x.x,
                          max: null == A ? void 0 : A.x,
                          display: !1,
                          type: 'linear',
                        },
                        y: {
                          min: null == M ? void 0 : M.y,
                          max: null == P ? void 0 : P.y,
                          display: !1,
                        },
                      },
                    };
                  return n && (_ || E)
                    ? s.default.createElement(
                        l.Box,
                        { borderRadius: u.BorderRadius.LG },
                        s.default.createElement(h.default, {
                          ref: C,
                          loading: _,
                          currency: r,
                          price: n,
                          date: Date.now(),
                          comparePrice:
                            null == E || null === (g = E[0]) || void 0 === g ? void 0 : g.y,
                        }),
                        s.default.createElement(
                          l.Box,
                          {
                            'data-testid': 'asset-price-chart',
                            marginTop: 4,
                            borderRadius: u.BorderRadius.LG,
                            backgroundColor:
                              _ && !E
                                ? u.BackgroundColor.backgroundAlternative
                                : u.BackgroundColor.transparent,
                          },
                          s.default.createElement(
                            l.Box,
                            { style: { opacity: _ && E ? m.loadingOpacity : 1 } },
                            s.default.createElement(f.default, v({ point: P }, I, { currency: r })),
                            s.default.createElement(
                              l.Box,
                              {
                                style: { aspectRatio: `${O.aspectRatio}` },
                                display: u.Display.Flex,
                                flexDirection: u.FlexDirection.Column,
                                justifyContent: n
                                  ? u.JustifyContent.flexEnd
                                  : u.JustifyContent.flexStart,
                              },
                              s.default.createElement(o.Line, {
                                ref: S,
                                data: { datasets: [{ data: E }] },
                                options: O,
                                updateMode: 'none',
                                onMouseMove: e => {
                                  var t;
                                  const n =
                                    null == S ||
                                    null === (t = S.current) ||
                                    void 0 === t ||
                                    null === (t = t.data) ||
                                    void 0 === t ||
                                    null === (t = t.datasets) ||
                                    void 0 === t ||
                                    null === (t = t[0]) ||
                                    void 0 === t
                                      ? void 0
                                      : t.data;
                                  if (n) {
                                    const t = e.target,
                                      r =
                                        n[
                                          Math.max(
                                            0,
                                            Math.min(
                                              n.length - 1,
                                              Math.round(
                                                (e.nativeEvent.offsetX / t.clientWidth) * n.length
                                              )
                                            )
                                          )
                                        ];
                                    var s;
                                    if (r)
                                      null == C ||
                                        null === (s = C.current) ||
                                        void 0 === s ||
                                        s.setPrice({ price: r.y, date: r.x });
                                  }
                                },
                                onMouseOut: () => {
                                  var e;
                                  null == C ||
                                    null === (e = C.current) ||
                                    void 0 === e ||
                                    e.setPrice({ price: n, date: Date.now() });
                                },
                              })
                            ),
                            s.default.createElement(f.default, v({ point: M }, I, { currency: r }))
                          ),
                          s.default.createElement(
                            l.Box,
                            {
                              style: E ? undefined : { visibility: 'hidden' },
                              display: u.Display.Flex,
                              justifyContent: u.JustifyContent.spaceBetween,
                              marginTop: 4,
                              marginLeft: 4,
                              marginRight: 4,
                            },
                            [
                              [y('oneDayAbbreviation'), '1D'],
                              [y('oneWeekAbbreviation'), '7D'],
                              [y('oneMonthAbbreviation'), '1M'],
                              [y('threeMonthsAbbreviation'), '3M'],
                              [y('oneYearAbbreviation'), '1Y'],
                              [y('all'), '1000Y'],
                            ].map(([e, t]) =>
                              s.default.createElement(
                                l.ButtonBase,
                                {
                                  key: t,
                                  className: (0, a.default)('time-range-button', {
                                    'time-range-button__selected': t === b,
                                  }),
                                  onClick: () => w(t),
                                  variant: u.TextVariant.bodySmMedium,
                                  size: l.ButtonBaseSize.Sm,
                                  backgroundColor: u.BackgroundColor.transparent,
                                  color: u.TextColor.textAlternative,
                                },
                                e
                              )
                            )
                          )
                        )
                      )
                    : null;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/chart/asset-chart.tsx' },
    ],
    [
      7028,
      {
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/confirm-tx.util': 6899,
        '../../util': 7035,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = (s = e('react')) && s.__esModule ? s : { default: s },
                  o = e('../../../../components/component-library'),
                  a = e('../../../../helpers/utils/confirm-tx.util'),
                  i = e('../../../../helpers/constants/design-system'),
                  c = e('../../util');
                n.default = ({ point: e, xMin: t, xMax: n, currency: s }) => {
                  const u = e && t && n ? (e.x - t.x) / (n.x - t.x) : 0;
                  return r.default.createElement(
                    o.Box,
                    {
                      style: {
                        ...(u < 0.5
                          ? { paddingRight: 100 - 200 * u + '%' }
                          : { paddingLeft: 100 - 2 * (100 - 100 * u) + '%' }),
                        direction:
                          u < 0.5 ? o.TextDirection.LeftToRight : o.TextDirection.RightToLeft,
                      },
                    },
                    r.default.createElement(
                      o.Text,
                      {
                        marginLeft: 4,
                        marginRight: 4,
                        variant: i.TextVariant.bodySmMedium,
                        color: i.TextColor.textAlternative,
                        textAlign: i.TextAlign.Center,
                      },
                      (null == e ? void 0 : e.y) === undefined
                        ? ' '
                        : (0, a.formatCurrency)(
                            `${null == e ? void 0 : e.y}`,
                            s,
                            (0, c.getPricePrecision)(null == e ? void 0 : e.y)
                          )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/chart/chart-tooltip.tsx' },
    ],
    [
      7029,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.CrosshairPlugin = void 0);
                n.CrosshairPlugin = {
                  id: 'crosshair',
                  afterEvent(e, { event: t }) {
                    (e.crosshairX = 'mouseout' === t.type ? undefined : (t.x ?? undefined)),
                      e.draw();
                  },
                  afterDraw(e) {
                    if (e.crosshairX !== undefined) {
                      const t = e.data.datasets[0].data,
                        n =
                          t[
                            Math.max(
                              0,
                              Math.min(
                                t.length - 1,
                                Math.round((e.crosshairX / e.width) * t.length)
                              )
                            )
                          ];
                      if (n) {
                        const { x: t, y: s } = e.scales,
                          r = t.getPixelForValue(n.x),
                          o = s.getPixelForValue(n.y);
                        (e.ctx.lineWidth = 1),
                          (e.ctx.strokeStyle = '#BBC0C5'),
                          e.ctx.beginPath(),
                          e.ctx.moveTo(r, 0),
                          e.ctx.lineTo(r, e.height),
                          e.ctx.stroke(),
                          e.ctx.beginPath(),
                          e.ctx.arc(r, o, 3, 0, 2 * Math.PI),
                          (e.ctx.fillStyle = e.options.borderColor),
                          e.ctx.fill();
                      }
                    }
                  },
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/chart/crosshair-plugin.ts' },
    ],
    [
      703,
      {
        './Bytes': 684,
        './CryptoAccount': 685,
        './CryptoCoinInfo': 686,
        './CryptoECKey': 687,
        './CryptoHDKey': 688,
        './CryptoKeypath': 689,
        './CryptoOutput': 690,
        './CryptoPSBT': 691,
        './Decoder': 692,
        './MultiKey': 693,
        './PathComponent': 694,
        './RegistryItem': 695,
        './RegistryType': 696,
        './ScriptExpression': 697,
        './errors': 698,
        './extended/CryptoMultiAccounts': 699,
        './extended/DerivationSchema': 700,
        './extended/KeyDerivation': 701,
        './extended/QRHardwareCall': 702,
        './lib': 706,
        './patchCBOR': 707,
        './types': 708,
        './utils': 709,
        'buffer/': 4146,
        tslib: 5685,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.Buffer =
                    n.extend =
                    n.PathComponent =
                    n.ScriptExpressions =
                    n.MultiKey =
                    n.CryptoPSBT =
                    n.CryptoOutput =
                    n.CryptoECKey =
                    n.CryptoCoinInfoNetwork =
                    n.CryptoCoinInfoType =
                    n.CryptoCoinInfo =
                    n.CryptoKeypath =
                    n.CryptoMultiAccounts =
                    n.CryptoHDKey =
                    n.CryptoAccount =
                    n.Bytes =
                    n.URRegistryDecoder =
                    n.DataItem =
                      void 0);
                const s = e('tslib');
                e('./patchCBOR');
                const r = e('buffer/');
                Object.defineProperty(n, 'Buffer', {
                  enumerable: !0,
                  get: function () {
                    return r.Buffer;
                  },
                });
                const o = e('./CryptoHDKey');
                Object.defineProperty(n, 'CryptoHDKey', {
                  enumerable: !0,
                  get: function () {
                    return o.CryptoHDKey;
                  },
                });
                const a = e('./CryptoKeypath');
                Object.defineProperty(n, 'CryptoKeypath', {
                  enumerable: !0,
                  get: function () {
                    return a.CryptoKeypath;
                  },
                });
                const i = e('./CryptoCoinInfo');
                Object.defineProperty(n, 'CryptoCoinInfo', {
                  enumerable: !0,
                  get: function () {
                    return i.CryptoCoinInfo;
                  },
                }),
                  Object.defineProperty(n, 'CryptoCoinInfoType', {
                    enumerable: !0,
                    get: function () {
                      return i.Type;
                    },
                  }),
                  Object.defineProperty(n, 'CryptoCoinInfoNetwork', {
                    enumerable: !0,
                    get: function () {
                      return i.Network;
                    },
                  });
                const c = e('./CryptoECKey');
                Object.defineProperty(n, 'CryptoECKey', {
                  enumerable: !0,
                  get: function () {
                    return c.CryptoECKey;
                  },
                });
                const u = e('./Bytes');
                Object.defineProperty(n, 'Bytes', {
                  enumerable: !0,
                  get: function () {
                    return u.Bytes;
                  },
                });
                const l = e('./CryptoOutput');
                Object.defineProperty(n, 'CryptoOutput', {
                  enumerable: !0,
                  get: function () {
                    return l.CryptoOutput;
                  },
                });
                const d = e('./CryptoPSBT');
                Object.defineProperty(n, 'CryptoPSBT', {
                  enumerable: !0,
                  get: function () {
                    return d.CryptoPSBT;
                  },
                });
                const p = e('./CryptoAccount');
                Object.defineProperty(n, 'CryptoAccount', {
                  enumerable: !0,
                  get: function () {
                    return p.CryptoAccount;
                  },
                });
                const m = e('./Decoder');
                Object.defineProperty(n, 'URRegistryDecoder', {
                  enumerable: !0,
                  get: function () {
                    return m.URRegistryDecoder;
                  },
                });
                const h = e('./MultiKey');
                Object.defineProperty(n, 'MultiKey', {
                  enumerable: !0,
                  get: function () {
                    return h.MultiKey;
                  },
                });
                const f = e('./ScriptExpression');
                Object.defineProperty(n, 'ScriptExpressions', {
                  enumerable: !0,
                  get: function () {
                    return f.ScriptExpressions;
                  },
                });
                const g = e('./PathComponent');
                Object.defineProperty(n, 'PathComponent', {
                  enumerable: !0,
                  get: function () {
                    return g.PathComponent;
                  },
                });
                const y = e('./RegistryItem'),
                  k = e('./RegistryType'),
                  v = e('./lib');
                var T = e('./lib');
                Object.defineProperty(n, 'DataItem', {
                  enumerable: !0,
                  get: function () {
                    return T.DataItem;
                  },
                });
                const b = e('./utils'),
                  w = e('./extended/CryptoMultiAccounts');
                Object.defineProperty(n, 'CryptoMultiAccounts', {
                  enumerable: !0,
                  get: function () {
                    return w.CryptoMultiAccounts;
                  },
                });
                const S = {
                    URRegistryDecoder: m.URRegistryDecoder,
                    Bytes: u.Bytes,
                    CryptoAccount: p.CryptoAccount,
                    CryptoHDKey: o.CryptoHDKey,
                    CryptoMultiAccounts: w.CryptoMultiAccounts,
                    CryptoKeypath: a.CryptoKeypath,
                    CryptoCoinInfo: i.CryptoCoinInfo,
                    CryptoCoinInfoType: i.Type,
                    CryptoCoinInfoNetwork: i.Network,
                    CryptoECKey: c.CryptoECKey,
                    CryptoOutput: l.CryptoOutput,
                    CryptoPSBT: d.CryptoPSBT,
                    MultiKey: h.MultiKey,
                    ScriptExpressions: f.ScriptExpressions,
                    PathComponent: g.PathComponent,
                  },
                  C = {
                    addReader: v.addReader,
                    addSemanticDecode: v.addSemanticDecode,
                    addSemanticEncode: v.addSemanticEncode,
                    addWriter: v.addWriter,
                    patchTags: b.patchTags,
                  },
                  _ = {
                    RegistryTypes: k.RegistryTypes,
                    RegistryItem: y.RegistryItem,
                    RegistryType: k.RegistryType,
                    decodeToDataItem: v.decodeToDataItem,
                    encodeDataItem: v.encodeDataItem,
                    cbor: C,
                  };
                (n.extend = _),
                  (0, s.__exportStar)(e('./errors'), n),
                  (0, s.__exportStar)(e('./Decoder'), n),
                  (0, s.__exportStar)(e('./lib'), n),
                  (0, s.__exportStar)(e('./CryptoAccount'), n),
                  (0, s.__exportStar)(e('./CryptoPSBT'), n),
                  (0, s.__exportStar)(e('./CryptoHDKey'), n),
                  (0, s.__exportStar)(e('./extended/CryptoMultiAccounts'), n),
                  (0, s.__exportStar)(e('./extended/QRHardwareCall'), n),
                  (0, s.__exportStar)(e('./extended/KeyDerivation'), n),
                  (0, s.__exportStar)(e('./extended/DerivationSchema'), n),
                  (0, s.__exportStar)(e('./CryptoOutput'), n),
                  (0, s.__exportStar)(e('./CryptoCoinInfo'), n),
                  (0, s.__exportStar)(e('./CryptoECKey'), n),
                  (0, s.__exportStar)(e('./MultiKey'), n),
                  (0, s.__exportStar)(e('./CryptoKeypath'), n),
                  (0, s.__exportStar)(e('./patchCBOR'), n),
                  (0, s.__exportStar)(e('./PathComponent'), n),
                  (0, s.__exportStar)(e('./RegistryItem'), n),
                  (0, s.__exportStar)(e('./RegistryType'), n),
                  (0, s.__exportStar)(e('./types'), n),
                  (0, s.__exportStar)(e('./utils'), n),
                  (n.default = S);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/index.js',
      },
    ],
    [
      7030,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useIsOriginalNativeTokenSymbol': 6986,
        '../../../selectors': 7601,
        './asset-options': 7024,
        './asset-page': 7025,
        '@metamask/etherscan-link': 1938,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/etherscan-link'),
                  a = e('../../../selectors'),
                  i = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../../shared/constants/transaction'),
                  u = e('../../../hooks/useIsOriginalNativeTokenSymbol'),
                  l = e('../../../../shared/constants/metametrics'),
                  d = e('../../../helpers/utils/util'),
                  p = e('../../../contexts/metametrics'),
                  m = f(e('./asset-options')),
                  h = f(e('./asset-page'));
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ token: e, chainId: t }) => {
                  const { symbol: n } = e,
                    f = (0, a.getNativeCurrencyForChain)(t),
                    { type: g } = (0, r.useSelector)(i.getProviderConfig) ?? {},
                    { address: y } = (0, r.useSelector)(a.getSelectedInternalAccount),
                    k = (0, r.useSelector)(a.getRpcPrefsForCurrentProvider),
                    v = (0, o.getAccountLink)(y, t, k),
                    T = (0, s.useContext)(p.MetaMetricsContext),
                    b = (0, u.useIsOriginalNativeTokenSymbol)(t, n, g);
                  return s.default.createElement(h.default, {
                    asset: {
                      chainId: t,
                      type: c.AssetType.native,
                      symbol: n,
                      image: f,
                      decimals: e.decimals,
                      isOriginalNativeSymbol: !0 === b,
                    },
                    optionsButton: s.default.createElement(m.default, {
                      isNativeAsset: !0,
                      onClickBlockExplorer: () => {
                        T({
                          event: 'Clicked Block Explorer Link',
                          category: l.MetaMetricsEventCategory.Navigation,
                          properties: {
                            link_type: 'Account Tracker',
                            action: 'Asset Options',
                            block_explorer_domain: (0, d.getURLHostName)(v),
                          },
                        }),
                          global.platform.openTab({ url: v });
                      },
                    }),
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/native-asset.tsx' },
    ],
    [
      7031,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/modules/string-utils': 5878,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/utils/multichain/blockExplorer': 6909,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../hooks/useTokenFiatAmount': 7014,
        '../../../hooks/useTokenTracker': 7017,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        './asset-options': 7024,
        './asset-page': 7025,
        '@metamask/etherscan-link': 1938,
        '@metamask/utils': 2995,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = e('@metamask/etherscan-link'),
                  r = e('@metamask/utils'),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = C(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  a = e('react-redux'),
                  i = e('react-router-dom'),
                  c = e('../../../../shared/constants/metametrics'),
                  u = e('../../../../shared/constants/transaction'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  d = e('../../../../shared/modules/string-utils'),
                  p = e('../../../contexts/metametrics'),
                  m = e('../../../helpers/utils/util'),
                  h = e('../../../hooks/useTokenFiatAmount'),
                  f = e('../../../hooks/useTokenTracker'),
                  g = e('../../../selectors'),
                  y = e('../../../store/actions'),
                  k = e('../../../helpers/utils/multichain/blockExplorer'),
                  v = e('../../../hooks/useMultichainSelector'),
                  T = e('../../../selectors/multichain'),
                  b = S(e('./asset-options')),
                  w = S(e('./asset-page'));
                function S(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function C(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (C = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ token: e, chainId: t }) => {
                  var n, S, C;
                  const { address: _, symbol: E, isERC721: I, image: x } = e,
                    A = (0, a.useSelector)(g.getTokenList),
                    M = (0, a.useSelector)(l.getNetworkConfigurationsByChainId),
                    P =
                      null === (n = M[t]) || void 0 === n ? void 0 : n.defaultBlockExplorerUrlIndex,
                    O =
                      P === undefined
                        ? null
                        : null === (S = M[t]) || void 0 === S
                          ? void 0
                          : S.blockExplorerUrls[P],
                    N = (0, a.useSelector)(g.getSelectedInternalAccount),
                    { address: D } = N,
                    R = (0, a.useSelector)(g.selectERC20TokensByChain),
                    B = (0, v.useMultichainSelector)(T.getMultichainNetwork, N),
                    j = (0, a.useSelector)(T.getMultichainIsEvm),
                    F = (0, i.useHistory)(),
                    L = (0, a.useDispatch)(),
                    $ = (0, o.useContext)(p.MetaMetricsContext),
                    U = Object.values(A).find(
                      e =>
                        (0, d.isEqualCaseInsensitive)(e.symbol, E) &&
                        (0, d.isEqualCaseInsensitive)(e.address, _)
                    ),
                    W =
                      null == R ||
                      null === (C = R[t]) ||
                      void 0 === C ||
                      null === (C = C.data) ||
                      void 0 === C
                        ? void 0
                        : C[_.toLowerCase()],
                    H = (null == U ? void 0 : U.name) || (null == W ? void 0 : W.name) || E,
                    q =
                      (null == U ? void 0 : U.iconUrl) ||
                      (null == W ? void 0 : W.iconUrl) ||
                      x ||
                      '',
                    K = null == U ? void 0 : U.aggregators,
                    { tokensWithBalances: V } = (0, f.useTokenTracker)({
                      tokens: [e],
                      address: undefined,
                    }),
                    G = null == V ? void 0 : V[0],
                    z = (0, h.useTokenFiatAmount)(_, null == G ? void 0 : G.string, E, {}, !1),
                    Y = (0, s.getTokenTrackerLink)(e.address, t, '', D, {
                      blockExplorerUrl: O ?? '',
                    }),
                    Q = j
                      ? Y
                      : (0, k.getMultichainAccountUrl)(
                          (0, r.parseCaipAssetType)(_).assetReference,
                          B
                        );
                  return o.default.createElement(w.default, {
                    asset: {
                      chainId: t,
                      type: u.AssetType.token,
                      address: _,
                      symbol: E,
                      name: H,
                      decimals: e.decimals,
                      image: q,
                      aggregators: K,
                      balance: {
                        value: null == G ? void 0 : G.balance,
                        display: `${(0, m.roundToDecimalPlacesRemovingExtraZeroes)(null == G ? void 0 : G.string, 5)}`,
                        fiat: z,
                      },
                      isERC721: I,
                    },
                    optionsButton: o.default.createElement(b.default, {
                      isNativeAsset: !1,
                      onRemove: () =>
                        L(
                          (0, y.showModal)({
                            name: 'HIDE_TOKEN_CONFIRMATION',
                            token: e,
                            history: F,
                          })
                        ),
                      onClickBlockExplorer: () => {
                        $({
                          event: 'Clicked Block Explorer Link',
                          category: c.MetaMetricsEventCategory.Navigation,
                          properties: {
                            link_type: 'Token Tracker',
                            action: 'Token Options',
                            block_explorer_domain: (0, m.getURLHostName)(Y),
                          },
                        }),
                          global.platform.openTab({ url: Q });
                      },
                      tokenSymbol: e.symbol,
                    }),
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/token-asset.tsx' },
    ],
    [
      7032,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/app/wallet-overview/hooks/useHandleSendNonEvm': 6324,
        '../../../components/component-library': 6402,
        '../../../components/ui/icon-button/icon-button': 6743,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/ramps': 6862,
        '../../../ducks/send': 6865,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/error-keys': 6873,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/hardware': 6903,
        '../../../hooks/bridge/useBridging': 6935,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '@metamask/keyring-api': 2014,
        lodash: 4921,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = P(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  a = e('@metamask/keyring-api'),
                  i = e('lodash'),
                  c = e('../../../contexts/i18n'),
                  u = e('../../../helpers/constants/routes'),
                  l = e('../../../ducks/send'),
                  d = e('../../../helpers/utils/hardware'),
                  p = e('../../../ducks/swaps/swaps'),
                  m = M(e('../../../hooks/ramps/useRamps/useRamps')),
                  h = e('../../../selectors'),
                  f = M(e('../../../hooks/bridge/useBridging')),
                  g = e('../../../helpers/constants/error-keys'),
                  y = e('../../../store/actions'),
                  k = e('../../../contexts/metametrics'),
                  v = e('../../../../shared/constants/metametrics'),
                  T = e('../../../../shared/constants/transaction'),
                  b = e('../../../helpers/constants/design-system'),
                  w = M(e('../../../components/ui/icon-button/icon-button')),
                  S = e('../../../components/component-library'),
                  C = e('../../../ducks/ramps'),
                  _ = e('../../../hooks/useMultichainSelector'),
                  E = e('../../../selectors/multichain'),
                  I = e('../../../components/app/wallet-overview/hooks/useHandleSendNonEvm'),
                  x = e('../../../../shared/constants/multichain/networks'),
                  A = e('../../../../shared/modules/selectors/networks');
                function M(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function P(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (P = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ token: e }) => {
                  const t = (0, r.useDispatch)(),
                    n = (0, s.useContext)(c.I18nContext),
                    M = (0, s.useContext)(k.MetaMetricsContext),
                    P = (0, o.useHistory)(),
                    O = (0, r.useSelector)(h.getCurrentKeyring),
                    N = (0, d.isHardwareKeyring)(O.type),
                    D = (0, _.useMultichainSelector)(E.getMultichainIsEvm),
                    R = (0, r.useSelector)(h.getSelectedInternalAccount, i.isEqual),
                    { chainId: B } = (0, _.useMultichainSelector)(E.getMultichainNetwork),
                    j = (0, r.useSelector)(A.getCurrentChainId),
                    F = (0, r.useSelector)(h.getNetworkConfigurationIdByChainId),
                    L = (0, r.useSelector)(e => (0, h.getIsSwapsChain)(e, D ? j : B)),
                    $ = (0, r.useSelector)(h.getIsBridgeChain),
                    U = (0, r.useSelector)(C.getIsNativeTokenBuyable),
                    { openBuyCryptoInPdapp: W } = (0, m.default)(),
                    { openBridgeExperience: H } = (0, f.default)(),
                    q = (0, I.useHandleSendNonEvm)(e.address);
                  (0, s.useEffect)(() => {
                    e.isERC721 &&
                      t(
                        (0, y.showModal)({ name: 'CONVERT_TOKEN_TO_NFT', tokenAddress: e.address })
                      );
                  }, [e.isERC721, e.address, t]);
                  const K = (0, s.useCallback)(async () => {
                      if (j !== e.chainId && B !== e.chainId)
                        try {
                          const n = F[e.chainId];
                          await t((0, y.setActiveNetworkWithError)(n)),
                            await t((0, y.setSwitchedNetworkDetails)({ networkClientId: n }));
                        } catch (t) {
                          throw (
                            (console.error(
                              `Failed to switch chains.\n        Target chainId: ${e.chainId}, Current chainId: ${j}.\n        ${t}`
                            ),
                            t)
                          );
                        }
                    }, [j, B, F, e.chainId, t]),
                    V = (0, s.useCallback)(() => {
                      W(),
                        M({
                          event: v.MetaMetricsEventName.NavBuyButtonClicked,
                          category: v.MetaMetricsEventCategory.Navigation,
                          properties: {
                            location: 'Token Overview',
                            text: 'Buy',
                            chain_id: j,
                            token_symbol: e.symbol,
                          },
                        });
                    }, [j, e.symbol, M, W]),
                    G = (0, s.useCallback)(async () => {
                      if (
                        (M(
                          {
                            event: v.MetaMetricsEventName.NavSendButtonClicked,
                            category: v.MetaMetricsEventCategory.Navigation,
                            properties: {
                              token_symbol: e.symbol,
                              location: v.MetaMetricsSwapsEventSource.TokenView,
                              text: 'Send',
                              chain_id: e.chainId,
                            },
                          },
                          { excludeMetaMetricsId: !1 }
                        ),
                        (0, a.isEvmAccountType)(R.type))
                      )
                        try {
                          await K(),
                            await t(
                              (0, l.startNewDraftTransaction)({
                                type: T.AssetType.token,
                                details: e,
                              })
                            ),
                            P.push(u.SEND_ROUTE);
                        } catch (e) {
                          if (!e.message.includes(g.INVALID_ASSET_TYPE)) throw e;
                        }
                      else await q();
                    }, [M, t, P, e, K, R, q]),
                    z = (0, s.useCallback)(
                      async t => {
                        var n, s;
                        await K(),
                          H(
                            v.MetaMetricsSwapsEventSource.TokenView,
                            {
                              ...e,
                              iconUrl: e.image,
                              balance:
                                null == e || null === (n = e.balance) || void 0 === n
                                  ? void 0
                                  : n.value,
                              string:
                                null == e || null === (s = e.balance) || void 0 === s
                                  ? void 0
                                  : s.display,
                              name: e.name ?? '',
                            },
                            undefined,
                            t
                          );
                      },
                      [e, K, H]
                    ),
                    Y = (0, s.useCallback)(async () => {
                      var n, s, r, o, a;
                      B !== x.MultichainNetworks.SOLANA
                        ? (await K(),
                          M({
                            event: v.MetaMetricsEventName.NavSwapButtonClicked,
                            category: v.MetaMetricsEventCategory.Swaps,
                            properties: {
                              token_symbol: e.symbol,
                              location: v.MetaMetricsSwapsEventSource.TokenView,
                              text: 'Swap',
                              chain_id: j,
                            },
                          }),
                          t(
                            (0, p.setSwapsFromToken)({
                              ...e,
                              address:
                                null === (n = e.address) || void 0 === n ? void 0 : n.toLowerCase(),
                              iconUrl: e.image,
                              balance:
                                null == e || null === (s = e.balance) || void 0 === s
                                  ? void 0
                                  : s.value,
                              string:
                                null == e || null === (r = e.balance) || void 0 === r
                                  ? void 0
                                  : r.display,
                            })
                          ),
                          N
                            ? null === (o = (a = global.platform).openExtensionInBrowser) ||
                              void 0 === o ||
                              o.call(a, u.PREPARE_SWAP_ROUTE, undefined, !1)
                            : P.push(u.PREPARE_SWAP_ROUTE))
                        : z(!0);
                    }, [j, M, t, P, e, N, K, z, B]);
                  return s.default.createElement(
                    S.Box,
                    { display: b.Display.Flex, justifyContent: b.JustifyContent.spaceEvenly },
                    s.default.createElement(w.default, {
                      className: 'token-overview__button',
                      Icon: s.default.createElement(S.Icon, {
                        name: S.IconName.PlusMinus,
                        color: b.IconColor.primaryInverse,
                        size: S.IconSize.Sm,
                      }),
                      label: n('buyAndSell'),
                      'data-testid': 'token-overview-buy',
                      onClick: V,
                      disabled: e.isERC721 || !U,
                      tooltipRender: null,
                    }),
                    s.default.createElement(w.default, {
                      className: 'token-overview__button',
                      onClick: G,
                      Icon: s.default.createElement(S.Icon, {
                        name: S.IconName.Arrow2UpRight,
                        color: b.IconColor.primaryInverse,
                        size: S.IconSize.Sm,
                      }),
                      label: n('send'),
                      'data-testid': 'eth-overview-send',
                      disabled: e.isERC721,
                      tooltipRender: null,
                    }),
                    L &&
                      s.default.createElement(w.default, {
                        className: 'token-overview__button',
                        Icon: s.default.createElement(S.Icon, {
                          name: S.IconName.SwapHorizontal,
                          color: b.IconColor.primaryInverse,
                          size: S.IconSize.Sm,
                        }),
                        onClick: Y,
                        label: n('swap'),
                        tooltipRender: null,
                      }),
                    $ &&
                      s.default.createElement(w.default, {
                        className: 'token-overview__button',
                        'data-testid': 'token-overview-bridge',
                        Icon: s.default.createElement(S.Icon, {
                          name: S.IconName.Bridge,
                          color: b.IconColor.primaryInverse,
                          size: S.IconSize.Sm,
                        }),
                        label: n('bridge'),
                        onClick: () => z(!1),
                        tooltipRender: null,
                      })
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/components/token-buttons.tsx' },
    ],
    [
      7033,
      { './asset': 7023 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var s,
                  r = (s = e('./asset')) && s.__esModule ? s : { default: s };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/index.js' },
    ],
    [
      7034,
      {
        '../../../shared/constants/time': 5817,
        '../../../shared/lib/fetch-with-cache': 5834,
        '../../selectors': 7601,
        './util': 7035,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useHistoricalPrices = void 0);
                var s,
                  r = e('react'),
                  o = e('react-redux'),
                  a =
                    (s = e('../../../shared/lib/fetch-with-cache')) && s.__esModule
                      ? s
                      : { default: s },
                  i = e('../../../shared/constants/time'),
                  c = e('../../selectors'),
                  u = e('./util');
                n.useHistoricalPrices = ({ chainId: e, address: t, currency: n, timeRange: s }) => {
                  const l =
                      (0, o.useSelector)(c.getShouldShowFiat) && (0, u.chainSupportsPricing)(e),
                    [d, p] = (0, r.useState)(l),
                    [m, h] = (0, r.useState)({});
                  return (
                    (0, r.useEffect)(() => {
                      l
                        ? (p(!0),
                          (0, a.default)({
                            url: `https://price.api.cx.metamask.io/v1/chains/${e}/historical-prices/${t}?vsCurrency=${n}&timePeriod=${s}`,
                            cacheOptions: { cacheRefreshTime: 5 * i.MINUTE },
                            functionName: 'GetAssetHistoricalPrices',
                            fetchOptions: { headers: { 'X-Client-Id': 'extension' } },
                          })
                            .catch(() => ({}))
                            .then(e => {
                              var t;
                              const n =
                                null == e || null === (t = e.prices) || void 0 === t
                                  ? void 0
                                  : t.map(e => ({
                                      x: null == e ? void 0 : e[0],
                                      y: null == e ? void 0 : e[1],
                                    }));
                              let s;
                              if (n && n.length > 0) {
                                let [e, t, r, o] = [];
                                for (const s of n)
                                  (e = !e || s.x < e.x ? s : e),
                                    (t = !t || s.x > t.x ? s : t),
                                    (r = !r || s.y < r.y ? s : r),
                                    (o = !o || s.y > o.y ? s : o);
                                s = { xMin: e, xMax: t, yMin: r, yMax: o };
                              }
                              h({ prices: n, edges: s }), p(!1);
                            }))
                        : (h({}), p(!1));
                    }, [l, e, t, n, s]),
                    { loading: d, data: m }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/useHistoricalPrices.ts' },
    ],
    [
      7035,
      { '@metamask/assets-controllers': 1353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.localizeLargeNumber =
                    n.loadingOpacity =
                    n.getShortDateFormatterV2 =
                    n.getShortDateFormatter =
                    n.getPricePrecision =
                    n.findAssetByAddress =
                    n.chainSupportsPricing =
                      void 0);
                var s = e('@metamask/assets-controllers');
                n.getShortDateFormatter = () =>
                  Intl.DateTimeFormat(navigator.language, {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  });
                n.getShortDateFormatterV2 = () =>
                  Intl.DateTimeFormat(navigator.language, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                n.localizeLargeNumber = (e, t) =>
                  t >= 1e12
                    ? `${(t / 1e12).toFixed(2)}${e('trillionAbbreviation')}`
                    : t >= 1e9
                      ? `${(t / 1e9).toFixed(2)}${e('billionAbbreviation')}`
                      : t >= 1e6
                        ? `${(t / 1e6).toFixed(2)}${e('millionAbbreviation')}`
                        : t.toFixed(2);
                n.getPricePrecision = e => {
                  if (0 === e) return 1;
                  let t = 2;
                  for (let n = Math.abs(e); n < 1; t++) n *= 10;
                  return t;
                };
                n.chainSupportsPricing = e => s.SUPPORTED_CHAIN_IDS.includes(e);
                n.loadingOpacity = 0.2;
                n.findAssetByAddress = (e, t, n) => {
                  if (!n) return console.error('Chain ID is required.'), null;
                  const s = e[n];
                  return s
                    ? t
                      ? s.find(e => e.address && e.address.toLowerCase() === t.toLowerCase())
                      : s.find(e => !e.address)
                    : (console.warn(`No tokens found for chainId: ${n}`), null);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/asset/util.ts' },
    ],
    [
      7036,
      {
        '../../../components/component-library': 6402,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/routes': 6878,
        react: 5328,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-router-dom'),
                  o = e('../../../helpers/constants/routes'),
                  a = e('../../../components/component-library'),
                  i = e('../../../contexts/i18n');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, s.useContext)(i.I18nContext),
                    t = (0, r.useHistory)();
                  return s.default.createElement(
                    a.Button,
                    {
                      onClick: () => {
                        t.push(`${o.CROSS_CHAIN_SWAP_ROUTE}${o.PREPARE_SWAP_ROUTE}`);
                      },
                    },
                    e('cancel')
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/awaiting-signatures/awaiting-signatures-cancel-button.tsx',
      },
    ],
    [
      7037,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../components/ui/pulse-loader': 6791,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/bridge/selectors': 6850,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        'lodash/isEqual': 4908,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    var e;
                    const t = (0, m.useI18nContext)(),
                      { activeQuote: n } = (0, r.useSelector)(p.getBridgeQuotes, r.shallowEqual),
                      h =
                        null == n ||
                        null === (e = n.sentAmount) ||
                        void 0 === e ||
                        null === (e = e.amount) ||
                        void 0 === e
                          ? void 0
                          : e.toNumber(),
                      f = (0, r.useSelector)(p.getFromToken, o.default),
                      g = (0, r.useSelector)(p.getToToken, o.default),
                      y = (0, r.useSelector)(p.getFromChain, o.default),
                      k = (0, r.useSelector)(p.getToChain, o.default),
                      v = (0, r.useSelector)(a.isHardwareWallet),
                      T = (0, r.useSelector)(a.getHardwareWalletType),
                      b = Boolean(null == n ? void 0 : n.approval),
                      w = (0, s.useContext)(u.MetaMetricsContext);
                    return (
                      (0, s.useEffect)(() => {
                        var e, t;
                        w({
                          event: 'Awaiting Signature(s) on a HW wallet',
                          category: l.MetaMetricsEventCategory.Swaps,
                          properties: {
                            needs_two_confirmations: b,
                            token_from: (null == f ? void 0 : f.symbol) ?? '',
                            token_to: (null == g ? void 0 : g.symbol) ?? '',
                            is_hardware_wallet: v,
                            hardware_wallet_type: T ?? '',
                          },
                          sensitiveProperties: {
                            token_from_amount:
                              (null == n || null === (e = n.quote) || void 0 === e
                                ? void 0
                                : e.srcTokenAmount) ?? '',
                            token_to_amount:
                              (null == n || null === (t = n.quote) || void 0 === t
                                ? void 0
                                : t.destTokenAmount) ?? '',
                          },
                        });
                      }, []),
                      s.default.createElement(
                        'div',
                        { className: 'awaiting-bridge-signatures' },
                        s.default.createElement(
                          d.Box,
                          {
                            paddingLeft: 6,
                            paddingRight: 6,
                            height: c.BlockSize.Full,
                            justifyContent: c.JustifyContent.center,
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Column,
                          },
                          s.default.createElement(
                            d.Box,
                            { marginTop: 3, marginBottom: 4 },
                            s.default.createElement(i.default, null)
                          ),
                          !b &&
                            s.default.createElement(
                              d.Text,
                              {
                                color: c.TextColor.textDefault,
                                variant: c.TextVariant.headingMd,
                                as: 'h3',
                              },
                              t('swapConfirmWithHwWallet')
                            ),
                          b &&
                            s.default.createElement(
                              s.default.Fragment,
                              null,
                              s.default.createElement(
                                d.Text,
                                { variant: c.TextVariant.bodyMdBold, marginTop: 2 },
                                t('bridgeConfirmTwoTransactions')
                              ),
                              s.default.createElement(
                                'ul',
                                { className: 'awaiting-bridge-signatures__steps' },
                                s.default.createElement(
                                  'li',
                                  null,
                                  s.default.createElement(
                                    d.AvatarBase,
                                    {
                                      size: d.AvatarBaseSize.Sm,
                                      backgroundColor: c.BackgroundColor.primaryMuted,
                                      color: c.TextColor.primaryDefault,
                                      marginRight: 2,
                                    },
                                    '1'
                                  ),
                                  t('bridgeAllowSwappingOf', [
                                    s.default.createElement(
                                      d.Text,
                                      {
                                        as: 'span',
                                        variant: c.TextVariant.bodyMd,
                                        key: 'allowAmount',
                                      },
                                      h
                                    ),
                                    s.default.createElement(
                                      d.Text,
                                      {
                                        as: 'span',
                                        variant: c.TextVariant.bodyMd,
                                        key: 'allowToken',
                                      },
                                      null == f ? void 0 : f.symbol
                                    ),
                                    s.default.createElement(
                                      d.Text,
                                      {
                                        as: 'span',
                                        variant: c.TextVariant.bodyMd,
                                        key: 'allowNetwork',
                                      },
                                      null == y ? void 0 : y.name
                                    ),
                                  ])
                                ),
                                s.default.createElement(
                                  'li',
                                  null,
                                  s.default.createElement(
                                    d.AvatarBase,
                                    {
                                      size: d.AvatarBaseSize.Sm,
                                      backgroundColor: c.BackgroundColor.primaryMuted,
                                      color: c.TextColor.primaryDefault,
                                      marginRight: 2,
                                    },
                                    '2'
                                  ),
                                  t('bridgeFromTo', [
                                    s.default.createElement(
                                      d.Text,
                                      {
                                        as: 'span',
                                        variant: c.TextVariant.bodyMd,
                                        key: 'fromAmount',
                                      },
                                      h
                                    ),
                                    s.default.createElement(
                                      d.Text,
                                      {
                                        as: 'span',
                                        variant: c.TextVariant.bodyMd,
                                        key: 'fromToken',
                                      },
                                      null == f ? void 0 : f.symbol
                                    ),
                                    s.default.createElement(
                                      d.Text,
                                      {
                                        as: 'span',
                                        variant: c.TextVariant.bodyMd,
                                        key: 'toNetwork',
                                      },
                                      null == k ? void 0 : k.name
                                    ),
                                  ])
                                )
                              ),
                              s.default.createElement(
                                d.Text,
                                { variant: c.TextVariant.bodyXs },
                                t('bridgeGasFeesSplit')
                              )
                            )
                        )
                      )
                    );
                  });
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = h(e('lodash/isEqual')),
                  a = e('../../../selectors/selectors'),
                  i = h(e('../../../components/ui/pulse-loader')),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../../contexts/metametrics'),
                  l = e('../../../../shared/constants/metametrics'),
                  d = e('../../../components/component-library'),
                  p = e('../../../ducks/bridge/selectors'),
                  m = e('../../../hooks/useI18nContext');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/awaiting-signatures/awaiting-signatures.tsx' },
    ],
    [
      7038,
      {
        '../../../../shared/constants/network': 5804,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../store/actions': 7619,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    const e = (0, s.useDispatch)(),
                      t = (0, s.useSelector)(a.getNetworkConfigurationsByChainId),
                      n = (0, s.useSelector)(a.getSelectedNetworkClientId);
                    return {
                      addSourceToken: t => {
                        const { address: s, decimals: r, symbol: a, icon: i } = t.quote.srcAsset;
                        e(
                          (0, o.addToken)({
                            address: s,
                            decimals: r,
                            symbol: a,
                            image: i,
                            networkClientId: n,
                          })
                        );
                      },
                      addDestToken: async n => {
                        const s = (0, i.decimalToPrefixedHex)(n.quote.destChainId),
                          a = t[s];
                        let c;
                        if (!a) {
                          const t = r.FEATURED_RPCS.find(e => e.chainId === s);
                          if (!t) throw new Error('No featured RPC found');
                          c = await e((0, o.addNetwork)(t));
                        }
                        const u = a || c;
                        if (!u) throw new Error('No destination network configuration found');
                        const l = u.defaultRpcEndpointIndex,
                          d = u.rpcEndpoints[l].networkClientId,
                          { address: p, decimals: m, symbol: h, icon: f } = n.quote.destAsset;
                        await e(
                          (0, o.addToken)({
                            address: p,
                            decimals: m,
                            symbol: h,
                            image: f,
                            networkClientId: d,
                          })
                        );
                      },
                    };
                  });
                var s = e('react-redux'),
                  r = e('../../../../shared/constants/network'),
                  o = e('../../../store/actions'),
                  a = e('../../../../shared/modules/selectors/networks'),
                  i = e('../../../../shared/modules/conversion.utils');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useAddToken.ts' },
    ],
    [
      7039,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/bridge-status/selectors': 6847,
        '../../../hooks/useTokenFiatAmount': 7014,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useBridgeTokenDisplayData = function (e) {
                    var t, n;
                    const { primaryTransaction: c } = e,
                      u = (0, s.useSelector)(r.getCurrentChainId),
                      l = (0, s.useSelector)(i.selectBridgeHistoryForAccount)[c.id],
                      d = (0, o.useTokenFiatAmount)(
                        c.sourceTokenAddress,
                        null == l || null === (t = l.pricingData) || void 0 === t
                          ? void 0
                          : t.amountSent,
                        c.sourceTokenSymbol,
                        {},
                        !0,
                        u
                      );
                    return {
                      category: a.TransactionGroupCategory.bridge,
                      displayCurrencyAmount: d,
                      sourceTokenSymbol: c.sourceTokenSymbol,
                      sourceTokenAmountSent:
                        null == l || null === (n = l.pricingData) || void 0 === n
                          ? void 0
                          : n.amountSent,
                    };
                  });
                var s = e('react-redux'),
                  r = e('../../../../shared/modules/selectors/networks'),
                  o = e('../../../hooks/useTokenFiatAmount'),
                  a = e('../../../../shared/constants/transaction'),
                  i = e('../../../ducks/bridge-status/selectors');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useBridgeTokenDisplayData.ts' },
    ],
    [
      704,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.DataItem = void 0);
                n.DataItem = class {
                  constructor(e, t) {
                    (this.setTag = e => {
                      this.tag = e;
                    }),
                      (this.clearTag = () => {
                        this.tag = undefined;
                      }),
                      (this.getTag = () => this.tag),
                      (this.getData = () => this.data),
                      (this.data = e),
                      (this.tag = t);
                  }
                };
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/lib/DataItem.js',
      },
    ],
    [
      7040,
      {
        '../../../ducks/bridge/selectors': 6850,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '@metamask/bridge-controller': 1414,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDestinationAccount = void 0);
                var s = e('react-redux'),
                  r = e('react'),
                  o = e('@metamask/bridge-controller'),
                  a = e('../../../selectors'),
                  i = e('../../../ducks/bridge/selectors'),
                  c = e('../../../selectors/multichain'),
                  u = e('../../../hooks/useMultichainSelector');
                n.useDestinationAccount = (e = !1) => {
                  const [t, n] = (0, r.useState)(null),
                    l = (0, u.useMultichainSelector)(c.getMultichainIsEvm),
                    d = (0, s.useSelector)(a.getSelectedEvmInternalAccount),
                    p = (0, s.useSelector)(c.getLastSelectedSolanaAccount),
                    m = (0, u.useMultichainSelector)(a.getSelectedInternalAccount),
                    h = l ? d : m,
                    f = (0, s.useSelector)(i.getToChain),
                    g = f && (0, o.isSolanaChainId)(f.chainId);
                  return (
                    (0, r.useEffect)(() => {
                      n(e ? h : g ? p : d);
                    }, [g, p, d]),
                    { selectedDestinationAccount: t, setSelectedDestinationAccount: n }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useDestinationAccount.ts' },
    ],
    [
      7041,
      {
        '../../../../app/scripts/lib/multichain/address': 142,
        '../../../../shared/lib/multichain/accounts': 5839,
        '../../../ducks/domains': 6854,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useExternalAccountResolution = void 0);
                var s = e('react'),
                  r = e('react-redux'),
                  o = e('../../../../app/scripts/lib/multichain/address'),
                  a = e('../../../ducks/domains'),
                  i = e('../../../../shared/lib/multichain/accounts');
                n.useExternalAccountResolution = ({
                  searchQuery: e,
                  isDestinationSolana: t,
                  accounts: n,
                }) => {
                  const c = (0, r.useDispatch)(),
                    u = (0, r.useSelector)(a.getDomainResolutions);
                  (0, s.useEffect)(() => {
                    c((0, a.initializeDomainSlice)());
                  }, [c]);
                  const l = (0, s.useMemo)(() => {
                      const n = e.trim();
                      return !!n && (t ? (0, i.isSolanaAddress)(n) : (0, o.isEthAddress)(n));
                    }, [e, t]),
                    d = (0, s.useMemo)(() => {
                      if (t) return !1;
                      const n = e.trim();
                      return !!n && n.endsWith('.eth');
                    }, [e, t]);
                  (0, s.useEffect)(() => {
                    c(d ? (0, a.lookupDomainName)(e.trim()) : (0, a.resetDomainResolution)());
                  }, [c, d, e]);
                  const p = (0, s.useMemo)(() => {
                    const t = u || [];
                    if (!l && !d) return null;
                    if (d && t.length > 0) {
                      const { resolvedAddress: s } = t[0],
                        r = e.trim();
                      return n.some(e => e.address.toLowerCase() === s.toLowerCase())
                        ? null
                        : { address: s, metadata: { name: r }, isExternal: !0 };
                    }
                    if (l) {
                      const t = e.trim();
                      return n.some(e => e.address.toLowerCase() === t.toLowerCase())
                        ? null
                        : { address: t, metadata: { name: t }, isExternal: !0 };
                    }
                    return null;
                  }, [n, l, d, e, u]);
                  return { isValidAddress: l, isValidEnsName: d, externalAccount: p };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useExternalAccountResolution.ts' },
    ],
    [
      7042,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../ducks/bridge/actions': 6848,
        './useHandleTx': 7044,
        '@metamask/bridge-controller': 1414,
        '@metamask/transaction-controller': 2946,
        'bignumber.js': 4030,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.APPROVAL_TX_ERROR = n.ALLOWANCE_RESET_ERROR = void 0),
                  (n.default = function () {
                    const { handleTx: e } = (0, l.default)();
                    return {
                      handleApprovalTx: async ({ approval: t, quoteResponse: n }) => {
                        try {
                          const s = (0, u.decimalToPrefixedHex)(t.chainId);
                          (0, a.isEthUsdt)(s, n.quote.srcAsset.address) &&
                            (await (async ({ approval: t, quoteResponse: n, hexChainId: s }) => {
                              try {
                                const u = new o.BigNumber(
                                    await (0, c.getBridgeERC20Allowance)(i.ETH_USDT_ADDRESS, s)
                                  ),
                                  l = new o.BigNumber(n.quote.srcTokenAmount)
                                    .plus(n.quote.feeData[a.FeeType.METABRIDGE].amount)
                                    .toString();
                                if (u.lt(l) && u.gt(0)) {
                                  const s = (0, a.getEthUsdtResetData)(),
                                    o = { ...t, data: s };
                                  await e({
                                    txType: r.TransactionType.bridgeApproval,
                                    txParams: o,
                                    fieldsToAddToTxMeta: {
                                      sourceTokenSymbol: n.quote.srcAsset.symbol,
                                    },
                                  });
                                }
                              } catch (e) {
                                throw new Error(`${d}: ${e}`);
                              }
                            })({ approval: t, quoteResponse: n, hexChainId: s }));
                          return await e({
                            txType: r.TransactionType.bridgeApproval,
                            txParams: t,
                            fieldsToAddToTxMeta: { sourceTokenSymbol: n.quote.srcAsset.symbol },
                          });
                        } catch (e) {
                          throw new Error(`${p}: ${e}`);
                        }
                      },
                    };
                  });
                var s,
                  r = e('@metamask/transaction-controller'),
                  o = e('bignumber.js'),
                  a = e('@metamask/bridge-controller'),
                  i = e('../../../../shared/constants/bridge'),
                  c = e('../../../ducks/bridge/actions'),
                  u = e('../../../../shared/modules/conversion.utils'),
                  l = (s = e('./useHandleTx')) && s.__esModule ? s : { default: s };
                const d = (n.ALLOWANCE_RESET_ERROR = 'Eth USDT allowance reset failed'),
                  p = (n.APPROVAL_TX_ERROR = 'Approve transaction failed');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useHandleApprovalTx.ts' },
    ],
    [
      7043,
      {
        '../../../../shared/modules/Numeric': 5853,
        './useHandleTx': 7044,
        '@metamask/bridge-controller': 1414,
        '@metamask/transaction-controller': 2946,
        'bignumber.js': 4030,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    const { handleTx: e } = (0, u.default)(),
                      t = (0, a.useDispatch)();
                    return {
                      handleBridgeTx: async ({ quoteResponse: n, approvalTxId: s }) => {
                        const a = new r.BigNumber(n.quote.srcTokenAmount).plus(
                            n.quote.feeData[i.FeeType.METABRIDGE].amount
                          ),
                          u = new c.Numeric(a, 10).shiftedBy(n.quote.srcAsset.decimals).toString(),
                          l = 'string' == typeof n.trade,
                          d = {
                            destinationChainId: new c.Numeric(n.quote.destChainId, 10)
                              .toPrefixedHexString()
                              .toLowerCase(),
                            sourceTokenAmount: n.quote.srcTokenAmount,
                            sourceTokenSymbol: n.quote.srcAsset.symbol,
                            sourceTokenDecimals: n.quote.srcAsset.decimals,
                            sourceTokenAddress: n.quote.srcAsset.address,
                            destinationTokenAmount: n.quote.destTokenAmount,
                            destinationTokenSymbol: n.quote.destAsset.symbol,
                            destinationTokenDecimals: n.quote.destAsset.decimals,
                            destinationTokenAddress: n.quote.destAsset.address,
                            approvalTxId: s,
                            swapTokenValue: u,
                            isSolana: l,
                            isBridgeTx: !0,
                          },
                          p = await e({
                            txType: o.TransactionType.bridge,
                            txParams: n.trade,
                            fieldsToAddToTxMeta: d,
                          });
                        return (
                          l &&
                            p &&
                            (p.isSolana || (p.isSolana = !0),
                            p.hash && t({ type: 'TRANSACTION_CREATED', payload: p })),
                          p
                        );
                      },
                    };
                  });
                var s,
                  r = e('bignumber.js'),
                  o = e('@metamask/transaction-controller'),
                  a = e('react-redux'),
                  i = e('@metamask/bridge-controller'),
                  c = e('../../../../shared/modules/Numeric'),
                  u = (s = e('./useHandleTx')) && s.__esModule ? s : { default: s };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useHandleBridgeTx.ts' },
    ],
    [
      7044,
      {
        '../../../../shared/lib/accounts/solana-wallet-snap': 5827,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/selectors': 5874,
        '../../../ducks/bridge/utils': 6851,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/accounts/useMultichainWalletSnapClient': 6925,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '@metamask/keyring-api': 2014,
        '@metamask/transaction-controller': 2946,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    const e = (0, r.useDispatch)(),
                      t = (0, r.useSelector)(y.checkNetworkAndAccountSupports1559),
                      n = (0, r.useSelector)(l.getGasFeeEstimates),
                      v = (0, r.useSelector)(m.getIsSmartTransaction),
                      T = (0, r.useSelector)(y.getNetworkConfigurationIdByChainId),
                      b = (0, r.useSelector)(y.getSelectedInternalAccount),
                      w = (0, r.useSelector)(h.getMultichainCurrentChainId),
                      S = (0, g.useMultichainWalletSnapSender)(f.SOLANA_WALLET_SNAP_ID),
                      C = (0, i.useHistory)(),
                      _ = (0, r.useSelector)(y.getMemoizedUnapprovedTemplatedConfirmations),
                      E = (0, r.useSelector)(y.getMemoizedUnapprovedConfirmations);
                    (0, a.useEffect)(() => {
                      const e = _.find(e => e.origin === f.SOLANA_WALLET_SNAP_ID),
                        t = E.find(e => e.origin === f.SOLANA_WALLET_SNAP_ID);
                      e
                        ? C.push(`${k.CONFIRMATION_V_NEXT_ROUTE}/${e.id}`)
                        : t && C.push(`${k.CONFIRM_TRANSACTION_ROUTE}/${t.id}`);
                    }, [C, _, E]);
                    const I = (0, d.useMultichainSelector)(h.getMultichainIsSolana);
                    return {
                      handleTx: async ({ txType: r, txParams: a, fieldsToAddToTxMeta: i }) =>
                        I && r === s.TransactionType.bridge && 'string' == typeof a
                          ? (console.log('Handling Solana bridge transaction'),
                            (async ({ txType: t, txParams: n, fieldsToAddToTxMeta: r }) => {
                              await e((0, c.setDefaultHomeActiveTabName)('activity'));
                              const a = await S.send({
                                id: crypto.randomUUID(),
                                jsonrpc: '2.0',
                                method: o.KeyringRpcMethod.SubmitRequest,
                                params: {
                                  request: {
                                    params: {
                                      account: { address: b.address },
                                      transaction: n,
                                      scope: w,
                                    },
                                    method: 'signAndSendTransaction',
                                  },
                                  id: crypto.randomUUID(),
                                  account: b.id,
                                  scope: w,
                                },
                              });
                              let i;
                              console.log('===SOLANA=== snap response:', a),
                                'string' == typeof a
                                  ? (i = a)
                                  : a &&
                                    'object' == typeof a &&
                                    a.result &&
                                    'object' == typeof a.result &&
                                    (console.log('===SOLANA=== snap response result:', a.result),
                                    (i =
                                      a.result.signature ||
                                      a.result.txid ||
                                      a.result.hash ||
                                      a.result.txHash)),
                                console.log('===SOLANA=== Extracted signature:', i);
                              const u = {
                                ...r,
                                id: crypto.randomUUID(),
                                chainId: w,
                                networkClientId: b.id,
                                time: Date.now(),
                                txParams: { data: n },
                                type: t,
                                status: s.TransactionStatus.submitted,
                                hash: i,
                                isSolana: !0,
                                isBridgeTx: !0,
                                actionId: t,
                                origin: f.SOLANA_WALLET_SNAP_ID,
                              };
                              return (
                                console.log(
                                  '===SOLANA=== Creating bridge transaction meta with ALL fields:',
                                  {
                                    id: u.id,
                                    hash: u.hash,
                                    isSolana: u.isSolana,
                                    isBridgeTx: u.isBridgeTx,
                                    type: u.type,
                                    chainId: u.chainId,
                                    networkClientId: u.networkClientId,
                                    time: u.time,
                                    status: u.status,
                                    origin: u.origin,
                                    actionId: u.actionId,
                                    fieldsFromParent: { ...r },
                                    txParams: u.txParams,
                                    fullObject: u,
                                  }
                                ),
                                u
                              );
                            })({
                              txType: r,
                              txParams: 'string' == typeof a ? a : JSON.stringify(a),
                              fieldsToAddToTxMeta: i,
                            }))
                          : (async ({ txType: r, txParams: o, fieldsToAddToTxMeta: a }) => {
                              const i = (0, p.decimalToPrefixedHex)(o.chainId),
                                { maxFeePerGas: l, maxPriorityFeePerGas: d } = await (0,
                                u.getTxGasEstimates)({
                                  networkAndAccountSupports1559: t,
                                  networkGasFeeEstimates: n,
                                  txParams: o,
                                  hexChainId: i,
                                }),
                                m = (0, u.getHexMaxGasLimit)(o.gasLimit ?? 0),
                                h = {
                                  ...o,
                                  chainId: i,
                                  gasLimit: m,
                                  gas: m,
                                  maxFeePerGas: l,
                                  maxPriorityFeePerGas: d,
                                },
                                f = T[i];
                              let g;
                              return (
                                (g =
                                  r === s.TransactionType.bridge && v
                                    ? await (0, c.addTransaction)(h, {
                                        networkClientId: f,
                                        requireApproval: !1,
                                        type: r,
                                      })
                                    : await (0, c.addTransactionAndWaitForPublish)(h, {
                                        networkClientId: f,
                                        requireApproval: !1,
                                        type: r,
                                      })),
                                e((0, c.updateTransaction)({ ...g, ...a }, !0)),
                                await (0, c.forceUpdateMetamaskState)(e),
                                g
                              );
                            })({ txType: r, txParams: a, fieldsToAddToTxMeta: i }),
                    };
                  });
                var s = e('@metamask/transaction-controller'),
                  r = e('react-redux'),
                  o = e('@metamask/keyring-api'),
                  a = e('react'),
                  i = e('react-router-dom'),
                  c = e('../../../store/actions'),
                  u = e('../../../ducks/bridge/utils'),
                  l = e('../../../ducks/metamask/metamask'),
                  d = e('../../../hooks/useMultichainSelector'),
                  p = e('../../../../shared/modules/conversion.utils'),
                  m = e('../../../../shared/modules/selectors'),
                  h = e('../../../selectors/multichain'),
                  f = e('../../../../shared/lib/accounts/solana-wallet-snap'),
                  g = e('../../../hooks/accounts/useMultichainWalletSnapClient'),
                  y = e('../../../selectors'),
                  k = e('../../../helpers/constants/routes');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useHandleTx.ts' },
    ],
    [
      7045,
      {
        '../../../ducks/bridge/selectors': 6850,
        '../../../selectors/multichain': 7605,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIsMultichainSwap = void 0);
                var s = e('react-redux'),
                  r = e('react-router-dom'),
                  o = e('react'),
                  a = e('../../../selectors/multichain'),
                  i = e('../../../ducks/bridge/selectors');
                n.useIsMultichainSwap = () => {
                  const { search: e, pathname: t } = (0, r.useLocation)(),
                    n = (0, r.useHistory)(),
                    c = (0, s.useSelector)(a.getMultichainIsSolana),
                    u = (0, s.useSelector)(i.getIsSwap);
                  (0, o.useEffect)(() => {
                    const s = new URLSearchParams(e),
                      r = 'true' === s.get('swaps');
                    u &&
                      c &&
                      !r &&
                      (s.set('swaps', 'true'), n.replace({ pathname: t, search: s.toString() }));
                  }, [u, c, n, e, t]);
                  return (0, o.useMemo)(
                    () => 'true' === new URLSearchParams(e).get('swaps') && c,
                    [c, e]
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useIsMultichainSwap.tsx' },
    ],
    [
      7046,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/lib/bridge-status/metrics': 5829,
        '../../../../shared/lib/bridge-status/utils': 5830,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/types/bridge-status': 5883,
        '../../../ducks/bridge-status/actions': 6846,
        '../../../ducks/bridge/actions': 6848,
        '../../../ducks/bridge/selectors': 6850,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        './useAddToken': 7038,
        './useHandleApprovalTx': 7042,
        './useHandleBridgeTx': 7043,
        '@metamask/bridge-controller': 1414,
        '@metamask/utils': 2995,
        'ethereumjs-util': 4393,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    const e = (0, o.useHistory)(),
                      t = (0, s.useDispatch)(),
                      n = (0, s.useSelector)(e => e),
                      a = (0, s.useSelector)(h.getCurrentChainId),
                      { addSourceToken: E, addDestToken: I } = (0, S.default)(),
                      { handleApprovalTx: N } = (0, C.default)(),
                      { handleBridgeTx: D } = (0, _.default)(),
                      R = (0, s.useSelector)(d.isHardwareWallet),
                      { slippage: B } = (0, s.useSelector)(p.getQuoteRequest),
                      j = (0, s.useSelector)(d.getSelectedAddress),
                      F = (0, k.useCrossChainSwapsEventTracker)(),
                      L = (0, b.useMultichainSelector)(w.getMultichainIsEvm);
                    return {
                      submitBridgeTransaction: async s => {
                        R && e.push(`${c.CROSS_CHAIN_SWAP_ROUTE}${c.AWAITING_SIGNATURES_ROUTE}`);
                        const o = {
                          bridgeId: s.quote.bridgeId,
                          bridge: s.quote.bridges[0],
                          srcChainId: s.quote.srcChainId,
                          destChainId: s.quote.destChainId,
                          quote: s.quote,
                          refuel: Boolean(s.quote.refuel),
                        };
                        let d, p;
                        try {
                          null != s &&
                            s.approval &&
                            (d = await N({ approval: s.approval, quoteResponse: s }));
                        } catch (r) {
                          var h;
                          x('Approve transaction failed', r),
                            R && O(r)
                              ? (t((0, f.setWasTxDeclined)(!0)),
                                e.push(`${c.CROSS_CHAIN_SWAP_ROUTE}${c.PREPARE_SWAP_ROUTE}`))
                              : (await t((0, u.setDefaultHomeActiveTabName)('activity')),
                                e.push(c.DEFAULT_ROUTE));
                          const a = (0, g.getInitialHistoryItem)({
                              quoteResponse: (0, g.serializeQuoteMetadata)(s),
                              bridgeTxMetaId: 'dummy-id',
                              startTime: null === (h = d) || void 0 === h ? void 0 : h.time,
                              slippagePercentage: B ?? 0,
                              initialDestAssetBalance: undefined,
                              targetContractAddress: undefined,
                              account: j,
                              statusRequest: o,
                            }),
                            i = (0, v.getCommonProperties)(a, n),
                            l = M(r)
                              ? { allowance_reset_transaction: T.StatusTypes.FAILED }
                              : undefined,
                            p = P(r) ? { approval_transaction: T.StatusTypes.FAILED } : undefined;
                          return void F({
                            event: y.MetaMetricsEventName.ActionFailed,
                            properties: { ...i, ...l, ...p, error_message: r.message },
                          });
                        }
                        if (
                          [
                            m.CHAIN_IDS.LINEA_MAINNET,
                            m.CHAIN_IDS.LINEA_GOERLI,
                            m.CHAIN_IDS.LINEA_SEPOLIA,
                          ].includes(a) &&
                          null != s &&
                          s.approval
                        ) {
                          x('Delaying submitting bridge tx to make Linea confirmation more likely');
                          const e = new Promise(e => setTimeout(e, A));
                          await e;
                        }
                        try {
                          var k;
                          p = await D({
                            quoteResponse: s,
                            approvalTxId: null === (k = d) || void 0 === k ? void 0 : k.id,
                          });
                        } catch (n) {
                          return (
                            x('Bridge transaction failed', n),
                            void (R && O(n)
                              ? (t((0, f.setWasTxDeclined)(!0)),
                                e.push(`${c.CROSS_CHAIN_SWAP_ROUTE}${c.PREPARE_SWAP_ROUTE}`))
                              : (await t((0, u.setDefaultHomeActiveTabName)('activity')),
                                e.push(c.DEFAULT_ROUTE)))
                          );
                        }
                        const b = { ...o, srcTxHash: p.hash },
                          w = !0 === p.isSolana;
                        t(
                          (0, l.startPollingForBridgeTxStatus)({
                            bridgeTxMeta: p,
                            statusRequest: { ...b, srcTxHash: w && p.hash ? p.hash : b.srcTxHash },
                            quoteResponse: (0, g.serializeQuoteMetadata)(s),
                            slippagePercentage: B ?? 0,
                            startTime: p.time,
                          })
                        ),
                          L &&
                            (s.quote.srcAsset.address !== (0, r.zeroAddress)() && E(s),
                            s.quote.destAsset.address === (0, r.zeroAddress)() ||
                              (0, i.isSolanaChainId)(s.quote.destChainId) ||
                              (await I(s))),
                          await t((0, u.setDefaultHomeActiveTabName)('activity')),
                          w || e.push({ pathname: c.DEFAULT_ROUTE, state: { stayOnHomePage: !0 } });
                      },
                    };
                  }),
                  (n.isApprovalTxError = n.isAllowanceResetError = void 0);
                var s = e('react-redux'),
                  r = e('ethereumjs-util'),
                  o = e('react-router-dom'),
                  a = e('@metamask/utils'),
                  i = e('@metamask/bridge-controller'),
                  c = e('../../../helpers/constants/routes'),
                  u = e('../../../store/actions'),
                  l = e('../../../ducks/bridge-status/actions'),
                  d = e('../../../selectors'),
                  p = e('../../../ducks/bridge/selectors'),
                  m = e('../../../../shared/constants/network'),
                  h = e('../../../../shared/modules/selectors/networks'),
                  f = e('../../../ducks/bridge/actions'),
                  g = e('../../../../shared/lib/bridge-status/utils'),
                  y = e('../../../../shared/constants/metametrics'),
                  k = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  v = e('../../../../shared/lib/bridge-status/metrics'),
                  T = e('../../../../shared/types/bridge-status'),
                  b = e('../../../hooks/useMultichainSelector'),
                  w = e('../../../selectors/multichain'),
                  S = I(e('./useAddToken')),
                  C = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('./useHandleApprovalTx')),
                  _ = I(e('./useHandleBridgeTx'));
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function I(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const x = (0, a.createProjectLogger)('bridge'),
                  A = 5e3,
                  M = e => (e.message ?? '').includes(C.ALLOWANCE_RESET_ERROR);
                n.isAllowanceResetError = M;
                const P = e => (e.message ?? '').includes(C.APPROVAL_TX_ERROR);
                n.isApprovalTxError = P;
                const O = e => {
                  var t;
                  const n =
                    (null === (t = e.message) || void 0 === t ? void 0 : t.toLowerCase()) ?? '';
                  return (
                    (n.includes('ledger') &&
                      (n.includes('rejected') ||
                        n.includes('denied') ||
                        n.includes('error while signing'))) ||
                    (n.includes('trezor') && (n.includes('cancelled') || n.includes('rejected'))) ||
                    (n.includes('lattice') && n.includes('rejected')) ||
                    n.includes('user rejected') ||
                    n.includes('user cancelled')
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/hooks/useSubmitBridgeTransaction.ts' },
    ],
    [
      7047,
      {
        '../../../shared/modules/selectors/networks': 5875,
        '../../components/component-library': 6402,
        '../../components/multichain/pages/page': 6652,
        '../../contexts/i18n': 6832,
        '../../ducks/bridge/actions': 6848,
        '../../ducks/swaps/swaps': 6868,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../helpers/higher-order-components/feature-toggled-route': 6889,
        '../../hooks/bridge/useBridgeExchangeRates': 6933,
        '../../hooks/bridge/useBridging': 6935,
        '../../hooks/bridge/useQuoteFetchEvents': 6940,
        '../../hooks/useGasFeeEstimates': 6982,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        '../swaps/hooks/useSwapsFeatureFlags': 7545,
        './awaiting-signatures/awaiting-signatures': 7037,
        './awaiting-signatures/awaiting-signatures-cancel-button': 7036,
        './hooks/useIsMultichainSwap': 7045,
        './prepare/bridge-transaction-settings-modal': 7054,
        './prepare/prepare-bridge-page': 7060,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = x(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  a = e('../../contexts/i18n'),
                  i = e('../../ducks/swaps/swaps'),
                  c = e('../../helpers/constants/routes'),
                  u = e('../../store/actions'),
                  l = I(e('../../helpers/higher-order-components/feature-toggled-route')),
                  d = e('../../components/component-library'),
                  p = e('../../../shared/modules/selectors/networks'),
                  m = e('../../selectors'),
                  h = I(e('../../hooks/bridge/useBridging')),
                  f = e('../../components/multichain/pages/page'),
                  g = e('../swaps/hooks/useSwapsFeatureFlags'),
                  y = e('../../ducks/bridge/actions'),
                  k = e('../../hooks/useGasFeeEstimates'),
                  v = e('../../hooks/bridge/useBridgeExchangeRates'),
                  T = e('../../hooks/bridge/useQuoteFetchEvents'),
                  b = e('../../helpers/constants/design-system'),
                  w = I(e('./prepare/prepare-bridge-page')),
                  S = I(e('./awaiting-signatures/awaiting-signatures-cancel-button')),
                  C = I(e('./awaiting-signatures/awaiting-signatures')),
                  _ = e('./prepare/bridge-transaction-settings-modal'),
                  E = e('./hooks/useIsMultichainSwap');
                function I(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function x(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (x = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, s.useContext)(a.I18nContext);
                  (0, g.useSwapsFeatureFlags)(), (0, h.default)();
                  const t = (0, o.useHistory)(),
                    n = (0, r.useDispatch)(),
                    I = (0, r.useSelector)(m.getIsBridgeEnabled),
                    x = (0, r.useSelector)(p.getSelectedNetworkClientId),
                    A = async () => {
                      await n((0, y.resetBridgeState)());
                    };
                  (0, s.useEffect)(
                    () => (
                      window.addEventListener('beforeunload', A),
                      () => {
                        window.removeEventListener('beforeunload', A), A();
                      }
                    ),
                    []
                  ),
                    (0, k.useGasFeeEstimates)(x),
                    (0, v.useBridgeExchangeRates)(),
                    (0, T.useQuoteFetchEvents)();
                  const M = (0, E.useIsMultichainSwap)(),
                    [P, O] = (0, s.useState)(!1);
                  return s.default.createElement(
                    f.Page,
                    { className: 'bridge__container' },
                    s.default.createElement(
                      f.Header,
                      {
                        textProps: { variant: b.TextVariant.headingSm },
                        startAccessory: s.default.createElement(d.ButtonIcon, {
                          iconName: d.IconName.ArrowLeft,
                          size: d.ButtonIconSize.Sm,
                          ariaLabel: e('back'),
                          onClick: async () => {
                            t.push({ pathname: c.DEFAULT_ROUTE, state: { stayOnHomePage: !0 } }),
                              n((0, i.clearSwapsState)()),
                              await n((0, u.resetBackgroundSwapsState)()),
                              await A();
                          },
                        }),
                        endAccessory: s.default.createElement(d.ButtonIcon, {
                          iconName: d.IconName.Setting,
                          size: d.ButtonIconSize.Sm,
                          ariaLabel: e('settings'),
                          onClick: () => {
                            O(!0);
                          },
                        }),
                      },
                      e(M ? 'swap' : 'bridge')
                    ),
                    s.default.createElement(
                      f.Content,
                      { padding: 0 },
                      s.default.createElement(
                        o.Switch,
                        null,
                        s.default.createElement(l.default, {
                          redirectRoute: c.SWAPS_MAINTENANCE_ROUTE,
                          flag: I,
                          path: c.CROSS_CHAIN_SWAP_ROUTE + c.PREPARE_SWAP_ROUTE,
                          render: () =>
                            s.default.createElement(
                              s.default.Fragment,
                              null,
                              s.default.createElement(_.BridgeTransactionSettingsModal, {
                                isOpen: P,
                                onClose: () => {
                                  O(!1);
                                },
                              }),
                              s.default.createElement(w.default, null)
                            ),
                        }),
                        s.default.createElement(
                          o.Route,
                          { path: c.CROSS_CHAIN_SWAP_ROUTE + c.AWAITING_SIGNATURES_ROUTE },
                          s.default.createElement(
                            f.Content,
                            null,
                            s.default.createElement(C.default, null)
                          ),
                          s.default.createElement(
                            f.Footer,
                            null,
                            s.default.createElement(S.default, null)
                          )
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/index.tsx' },
    ],
    [
      7048,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = (s = e('react')) && s.__esModule ? s : { default: s },
                  o = e('../../../components/component-library'),
                  a = e('../../../helpers/constants/design-system');
                function i() {
                  return (
                    (i = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) ({}).hasOwnProperty.call(n, s) && (e[s] = n[s]);
                          }
                          return e;
                        }),
                    i.apply(null, arguments)
                  );
                }
                n.default = e =>
                  r.default.createElement(
                    o.Container,
                    i(
                      {
                        display: a.Display.Flex,
                        flexDirection: a.FlexDirection.Column,
                        width: a.BlockSize.Full,
                      },
                      e
                    )
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/layout/column.tsx' },
    ],
    [
      7049,
      { './column': 7048, './row': 7050, './tooltip': 7051 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Column', {
                    enumerable: !0,
                    get: function () {
                      return s.default;
                    },
                  }),
                  Object.defineProperty(n, 'Row', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'Tooltip', {
                    enumerable: !0,
                    get: function () {
                      return o.default;
                    },
                  });
                var s = a(e('./column')),
                  r = a(e('./row')),
                  o = a(e('./tooltip'));
                function a(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/layout/index.tsx' },
    ],
    [
      705,
      { './DataItem': 704, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (n) {
                  (function () {
                    !(function (e, n) {
                      'function' == typeof define && define.amd
                        ? define([], n)
                        : void 0 !== t && t.exports
                          ? (t.exports = n())
                          : (e.CBOR = n());
                    })(this, function () {
                      const { DataItem: t } = e('./DataItem');
                      var s = (function () {
                        function e(e) {
                          this.$hex = e;
                        }
                        (e.prototype = {
                          length: function () {
                            return this.$hex.length / 2;
                          },
                          toString: function (e) {
                            if (!e || 'hex' === e || 16 === e) return this.$hex;
                            if ('utf-8' === e) {
                              for (var t = '', n = 0; n < this.$hex.length; n += 2)
                                t += '%' + this.$hex.substring(n, n + 2);
                              return decodeURIComponent(t);
                            }
                            if ('latin' === e) {
                              for (t = [], n = 0; n < this.$hex.length; n += 2)
                                t.push(parseInt(this.$hex.substring(n, n + 2), 16));
                              return String.fromCharCode.apply(String, t);
                            }
                            throw new Error('Unrecognised format: ' + e);
                          },
                        }),
                          (e.fromLatinString = function (t) {
                            for (var n = '', s = 0; s < t.length; s++) {
                              var r = t.charCodeAt(s).toString(16);
                              1 === r.length && (r = '0' + r), (n += r);
                            }
                            return new e(n);
                          }),
                          (e.fromUtf8String = function (t) {
                            for (var n = encodeURIComponent(t), s = '', r = 0; r < n.length; r++)
                              if ('%' === n.charAt(r)) (s += n.substring(r + 1, r + 3)), (r += 2);
                              else {
                                var o = n.charCodeAt(r).toString(16);
                                o.length < 2 && (o = '0' + o), (s += o);
                              }
                            return new e(s);
                          });
                        var s = [],
                          r = {},
                          o = function (e) {
                            return function () {
                              throw new Error(e + ' not implemented');
                            };
                          };
                        function a() {}
                        function i() {}
                        function c(e, t) {
                          var n = e.value;
                          return n < 24
                            ? n
                            : 24 == n
                              ? t.readByte()
                              : 25 == n
                                ? t.readUint16()
                                : 26 == n
                                  ? t.readUint32()
                                  : 27 == n
                                    ? t.readUint64()
                                    : 31 == n
                                      ? null
                                      : void o('Additional info: ' + n)();
                        }
                        function u(e, t, n) {
                          var s = e << 5;
                          t < 24
                            ? n.writeByte(s | t)
                            : t < 256
                              ? (n.writeByte(24 | s), n.writeByte(t))
                              : t < 65536
                                ? (n.writeByte(25 | s), n.writeUint16(t))
                                : t < 4294967296
                                  ? (n.writeByte(26 | s), n.writeUint32(t))
                                  : (n.writeByte(27 | s), n.writeUint64(t));
                        }
                        (a.prototype = {
                          peekByte: o('peekByte'),
                          readByte: o('readByte'),
                          readChunk: o('readChunk'),
                          readFloat16: function () {
                            var e = this.readUint16(),
                              t = (32767 & e) >> 10,
                              n = 1023 & e,
                              s = 32768 & e;
                            if (31 === t) return 0 === n ? (s ? -Infinity : Infinity) : NaN;
                            var r = t ? Math.pow(2, t - 25) * (1024 + n) : Math.pow(2, -24) * n;
                            return s ? -r : r;
                          },
                          readFloat32: function () {
                            var e = this.readUint32(),
                              t = (2147483647 & e) >> 23,
                              n = 8388607 & e,
                              s = 2147483648 & e;
                            if (255 === t) return 0 === n ? (s ? -Infinity : Infinity) : NaN;
                            var r = t
                              ? Math.pow(2, t - 23 - 127) * (8388608 + n)
                              : Math.pow(2, -149) * n;
                            return s ? -r : r;
                          },
                          readFloat64: function () {
                            var e = this.readUint32(),
                              t = (e >> 20) & 2047,
                              n = 4294967296 * (1048575 & e) + this.readUint32(),
                              s = 2147483648 & e;
                            if (2047 === t) return 0 === n ? (s ? -Infinity : Infinity) : NaN;
                            var r = t
                              ? Math.pow(2, t - 52 - 1023) * (4503599627370496 + n)
                              : Math.pow(2, -1074) * n;
                            return s ? -r : r;
                          },
                          readUint16: function () {
                            return 256 * this.readByte() + this.readByte();
                          },
                          readUint32: function () {
                            return 65536 * this.readUint16() + this.readUint16();
                          },
                          readUint64: function () {
                            return 4294967296 * this.readUint32() + this.readUint32();
                          },
                        }),
                          (i.prototype = {
                            writeByte: o('writeByte'),
                            result: o('result'),
                            writeFloat16: o('writeFloat16'),
                            writeFloat32: o('writeFloat32'),
                            writeFloat64: o('writeFloat64'),
                            writeUint16: function (e) {
                              this.writeByte((e >> 8) & 255), this.writeByte(255 & e);
                            },
                            writeUint32: function (e) {
                              this.writeUint16((e >> 16) & 65535), this.writeUint16(65535 & e);
                            },
                            writeUint64: function (e) {
                              if (e >= 9007199254740992 || e <= -9007199254740992)
                                throw new Error(
                                  'Cannot encode Uint64 of: ' +
                                    e +
                                    ' magnitude to big (floating point errors)'
                                );
                              this.writeUint32(Math.floor(e / 4294967296)),
                                this.writeUint32(e % 4294967296);
                            },
                            writeString: o('writeString'),
                            canWriteBinary: function (e) {
                              return !1;
                            },
                            writeBinary: o('writeChunk'),
                          });
                        var l = new Error();
                        function d(e) {
                          var t = (function (e) {
                            var t = e.readByte();
                            return { type: t >> 5, value: 31 & t };
                          })(e);
                          switch (t.type) {
                            case 0:
                              return c(t, e);
                            case 1:
                              return -1 - c(t, e);
                            case 2:
                              return e.readChunk(c(t, e));
                            case 3:
                              return e.readChunk(c(t, e)).toString('utf-8');
                            case 4:
                            case 5:
                              var n = c(t, e),
                                s = [];
                              if (null !== n) {
                                5 === t.type && (n *= 2);
                                for (var o = 0; o < n; o++) s[o] = d(e);
                              } else for (var a; (a = d(e)) !== l; ) s.push(a);
                              if (5 === t.type) {
                                var i = {};
                                for (o = 0; o < s.length; o += 2) i[s[o]] = s[o + 1];
                                return i;
                              }
                              return s;
                            case 6:
                              var u = c(t, e),
                                p = r[u];
                              s = d(e);
                              return p ? p(s) : s;
                            case 7:
                              if (25 === t.value) return e.readFloat16();
                              if (26 === t.value) return e.readFloat32();
                              if (27 === t.value) return e.readFloat64();
                              switch (c(t, e)) {
                                case 20:
                                  return !1;
                                case 21:
                                  return !0;
                                case 22:
                                  return null;
                                case 23:
                                  return undefined;
                                case null:
                                  return l;
                                default:
                                  throw new Error('Unknown fixed value: ' + t.value);
                              }
                            default:
                              throw new Error('Unsupported header: ' + JSON.stringify(t));
                          }
                          throw new Error('not implemented yet');
                        }
                        function p(e, t) {
                          for (var n = 0; n < s.length; n++) {
                            var r = s[n].fn(e);
                            if (r !== undefined) return u(6, s[n].tag, t), p(r, t);
                          }
                          if ((e && 'function' == typeof e.toCBOR && (e = e.toCBOR()), !1 === e))
                            u(7, 20, t);
                          else if (!0 === e) u(7, 21, t);
                          else if (null === e) u(7, 22, t);
                          else if (e === undefined) u(7, 23, t);
                          else if ('number' == typeof e)
                            Math.floor(e) === e && e < 9007199254740992 && e > -9007199254740992
                              ? e < 0
                                ? u(1, -1 - e, t)
                                : u(0, e, t)
                              : (!(function (e, t, n) {
                                  n.writeByte((e << 5) | t);
                                })(7, 27, t),
                                t.writeFloat64(e));
                          else if ('string' == typeof e)
                            t.writeString(e, function (e) {
                              u(3, e, t);
                            });
                          else if (t.canWriteBinary(e))
                            t.writeBinary(e, function (e) {
                              u(2, e, t);
                            });
                          else {
                            if ('object' != typeof e)
                              throw new Error('CBOR encoding not supported: ' + e);
                            if (
                              (f.config.useToJSON &&
                                'function' == typeof e.toJSON &&
                                (e = e.toJSON()),
                              Array.isArray(e))
                            ) {
                              u(4, e.length, t);
                              for (n = 0; n < e.length; n++) p(e[n], t);
                            } else {
                              var o = Object.keys(e);
                              u(5, o.length, t);
                              for (n = 0; n < o.length; n++) {
                                const s = parseInt(o[n]);
                                isNaN(s) ? (p(o[n], t), p(e[o[n]], t)) : (p(s, t), p(e[o[n]], t));
                              }
                            }
                          }
                        }
                        var m = [],
                          h = [],
                          f = {
                            config: { useToJSON: !0 },
                            addWriter: function (e, t) {
                              'string' == typeof e
                                ? h.push(function (n) {
                                    if (e === n) return t(n);
                                  })
                                : h.push(e);
                            },
                            addReader: function (e, t) {
                              'string' == typeof e
                                ? m.push(function (n, s) {
                                    if (e === s) return t(n, s);
                                  })
                                : m.push(e);
                            },
                            encode: function (e, t) {
                              for (var n = 0; n < h.length; n++) {
                                var s = (0, h[n])(t);
                                if (s) return p(e, s), s.result();
                              }
                              throw new Error('Unsupported output format: ' + t);
                            },
                            encodeDataItem: function (e, t) {
                              for (var n = 0; n < h.length; n++) {
                                var s = (0, h[n])(t);
                                if (s)
                                  return e.getTag() !== undefined
                                    ? (p(e, s), s.result())
                                    : (p(e.getData(), s), s.result());
                              }
                              throw new Error('Unsupported output format: ' + t);
                            },
                            decode: function (e, t) {
                              for (var n = 0; n < m.length; n++) {
                                var s = (0, m[n])(e, t);
                                if (s) return d(s);
                              }
                              throw new Error('Unsupported input format: ' + t);
                            },
                            decodeToDataItem: function (e, n) {
                              for (var s = 0; s < m.length; s++) {
                                var r = (0, m[s])(e, n);
                                if (r) {
                                  const e = d(r);
                                  return e instanceof t ? e : new t(e);
                                }
                              }
                              throw new Error('Unsupported input format: ' + n);
                            },
                            addSemanticEncode: function (e, t) {
                              if ('number' != typeof e || e % 1 != 0 || e < 0)
                                throw new Error('Tag must be a positive integer');
                              return s.push({ tag: e, fn: t }), this;
                            },
                            addSemanticDecode: function (e, t) {
                              if ('number' != typeof e || e % 1 != 0 || e < 0)
                                throw new Error('Tag must be a positive integer');
                              return (r[e] = t), this;
                            },
                          };
                        function g(e) {
                          (this.buffer = e), (this.pos = 0);
                        }
                        function y(e) {
                          (this.byteLength = 0),
                            (this.defaultBufferLength = 16384),
                            (this.latestBuffer = n.alloc(this.defaultBufferLength)),
                            (this.latestBufferOffset = 0),
                            (this.completeBuffers = []),
                            (this.stringFormat = e);
                        }
                        function k(e) {
                          (this.hex = e), (this.pos = 0);
                        }
                        function v(e) {
                          (this.$hex = ''), (this.finalFormat = e || 'hex');
                        }
                        return (
                          (g.prototype = Object.create(a.prototype)),
                          (g.prototype.peekByte = function () {
                            return this.buffer[this.pos];
                          }),
                          (g.prototype.readByte = function () {
                            return this.buffer[this.pos++];
                          }),
                          (g.prototype.readUint16 = function () {
                            var e = this.buffer.readUInt16BE(this.pos);
                            return (this.pos += 2), e;
                          }),
                          (g.prototype.readUint32 = function () {
                            var e = this.buffer.readUInt32BE(this.pos);
                            return (this.pos += 4), e;
                          }),
                          (g.prototype.readFloat32 = function () {
                            var e = this.buffer.readFloatBE(this.pos);
                            return (this.pos += 4), e;
                          }),
                          (g.prototype.readFloat64 = function () {
                            var e = this.buffer.readDoubleBE(this.pos);
                            return (this.pos += 8), e;
                          }),
                          (g.prototype.readChunk = function (e) {
                            var t = n.alloc(e);
                            return this.buffer.copy(t, 0, this.pos, (this.pos += e)), t;
                          }),
                          (y.prototype = Object.create(i.prototype)),
                          (y.prototype.writeByte = function (e) {
                            (this.latestBuffer[this.latestBufferOffset++] = e),
                              this.latestBufferOffset >= this.latestBuffer.length &&
                                (this.completeBuffers.push(this.latestBuffer),
                                (this.latestBuffer = n.alloc(this.defaultBufferLength)),
                                (this.latestBufferOffset = 0)),
                              this.byteLength++;
                          }),
                          (y.prototype.writeFloat32 = function (e) {
                            var t = n.alloc(4);
                            t.writeFloatBE(e, 0), this.writeBuffer(t);
                          }),
                          (y.prototype.writeFloat64 = function (e) {
                            var t = n.alloc(8);
                            t.writeDoubleBE(e, 0), this.writeBuffer(t);
                          }),
                          (y.prototype.writeString = function (e, t) {
                            var s = n.from(e, 'utf-8');
                            t(s.length), this.writeBuffer(s);
                          }),
                          (y.prototype.canWriteBinary = function (e) {
                            return e instanceof n;
                          }),
                          (y.prototype.writeBinary = function (e, t) {
                            t(e.length), this.writeBuffer(e);
                          }),
                          (y.prototype.writeBuffer = function (e) {
                            if (!(e instanceof n))
                              throw new TypeError('BufferWriter only accepts Buffers');
                            this.latestBufferOffset
                              ? this.latestBuffer.length - this.latestBufferOffset >= e.length
                                ? (e.copy(this.latestBuffer, this.latestBufferOffset),
                                  (this.latestBufferOffset += e.length),
                                  this.latestBufferOffset >= this.latestBuffer.length &&
                                    (this.completeBuffers.push(this.latestBuffer),
                                    (this.latestBuffer = n.alloc(this.defaultBufferLength)),
                                    (this.latestBufferOffset = 0)))
                                : (this.completeBuffers.push(
                                    this.latestBuffer.slice(0, this.latestBufferOffset)
                                  ),
                                  this.completeBuffers.push(e),
                                  (this.latestBuffer = n.alloc(this.defaultBufferLength)),
                                  (this.latestBufferOffset = 0))
                              : this.completeBuffers.push(e),
                              (this.byteLength += e.length);
                          }),
                          (y.prototype.result = function () {
                            for (
                              var e = n.alloc(this.byteLength), t = 0, s = 0;
                              s < this.completeBuffers.length;
                              s++
                            ) {
                              var r = this.completeBuffers[s];
                              r.copy(e, t, 0, r.length), (t += r.length);
                            }
                            return (
                              this.latestBufferOffset &&
                                this.latestBuffer.copy(e, t, 0, this.latestBufferOffset),
                              this.stringFormat ? e.toString(this.stringFormat) : e
                            );
                          }),
                          'function' == typeof n &&
                            (f.addReader(function (e, t) {
                              return n.isBuffer(e)
                                ? new g(e)
                                : 'hex' === t || 'base64' === t
                                  ? new g(n.from(e, t))
                                  : void 0;
                            }),
                            f.addWriter(function (e) {
                              return e && 'buffer' !== e
                                ? 'hex' === e || 'base64' === e
                                  ? new y(e)
                                  : void 0
                                : new y();
                            })),
                          (k.prototype = Object.create(a.prototype)),
                          (k.prototype.peekByte = function () {
                            var e = this.hex.substring(this.pos, 2);
                            return parseInt(e, 16);
                          }),
                          (k.prototype.readByte = function () {
                            var e = this.hex.substring(this.pos, this.pos + 2);
                            return (this.pos += 2), parseInt(e, 16);
                          }),
                          (k.prototype.readChunk = function (t) {
                            var s = this.hex.substring(this.pos, this.pos + 2 * t);
                            return (
                              (this.pos += 2 * t),
                              'function' == typeof n ? n.from(s, 'hex') : new e(s)
                            );
                          }),
                          (v.prototype = Object.create(i.prototype)),
                          (v.prototype.writeByte = function (e) {
                            if (e < 0 || e > 255) throw new Error('Byte value out of range: ' + e);
                            var t = e.toString(16);
                            1 == t.length && (t = '0' + t), (this.$hex += t);
                          }),
                          (v.prototype.canWriteBinary = function (t) {
                            return t instanceof e || ('function' == typeof n && t instanceof n);
                          }),
                          (v.prototype.writeBinary = function (t, s) {
                            if (t instanceof e) s(t.length()), (this.$hex += t.$hex);
                            else {
                              if (!('function' == typeof n && t instanceof n))
                                throw new TypeError('HexWriter only accepts BinaryHex or Buffers');
                              s(t.length), (this.$hex += t.toString('hex'));
                            }
                          }),
                          (v.prototype.result = function () {
                            return 'buffer' === this.finalFormat && 'function' == typeof n
                              ? n.from(this.$hex, 'hex')
                              : new e(this.$hex).toString(this.finalFormat);
                          }),
                          (v.prototype.writeString = function (t, n) {
                            var s = e.fromUtf8String(t);
                            n(s.length()), (this.$hex += s.$hex);
                          }),
                          f.addReader(function (t, n) {
                            return t instanceof e || t.$hex
                              ? new k(t.$hex)
                              : 'hex' === n
                                ? new k(t)
                                : void 0;
                          }),
                          f.addWriter(function (e) {
                            if ('hex' === e) return new v();
                          }),
                          f
                        );
                      })();
                      return (
                        s
                          .addSemanticEncode(0, function (e) {
                            if (e instanceof Date) return e.toISOString();
                          })
                          .addSemanticDecode(0, function (e) {
                            return new Date(e);
                          })
                          .addSemanticDecode(1, function (e) {
                            return new Date(e);
                          }),
                        s
                      );
                    });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/lib/cbor-sync.js',
      },
    ],
    [
      7050,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = (s = e('react')) && s.__esModule ? s : { default: s },
                  o = e('../../../components/component-library'),
                  a = e('../../../helpers/constants/design-system');
                function i() {
                  return (
                    (i = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) ({}).hasOwnProperty.call(n, s) && (e[s] = n[s]);
                          }
                          return e;
                        }),
                    i.apply(null, arguments)
                  );
                }
                n.default = e =>
                  r.default.createElement(
                    o.Container,
                    i(
                      {
                        display: a.Display.Flex,
                        flexDirection: a.FlexDirection.Row,
                        justifyContent: a.JustifyContent.spaceBetween,
                        flexWrap: a.FlexWrap.NoWrap,
                        alignItems: a.AlignItems.center,
                      },
                      e
                    )
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/layout/row.tsx' },
    ],
    [
      7051,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        './column': 7048,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  o = e('../../../components/component-library'),
                  a = e('../../../helpers/constants/design-system'),
                  i = (s = e('./column')) && s.__esModule ? s : { default: s };
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u() {
                  return (
                    (u = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) ({}).hasOwnProperty.call(n, s) && (e[s] = n[s]);
                          }
                          return e;
                        }),
                    u.apply(null, arguments)
                  );
                }
                const l = r.default.forwardRef(
                  (
                    {
                      children: e,
                      title: t,
                      triggerElement: n,
                      disabled: s = !1,
                      onClose: c,
                      iconName: l,
                      style: d,
                      ...p
                    },
                    m
                  ) => {
                    const [h, f] = (0, r.useState)(!1),
                      [g, y] = (0, r.useState)(null),
                      k = () => f(!1);
                    return r.default.createElement(
                      o.Box,
                      { ref: m },
                      r.default.createElement(
                        o.Box,
                        {
                          ref: e => y(e),
                          onMouseEnter: () => f(!0),
                          onMouseLeave: k,
                          display: a.Display.Flex,
                        },
                        n ??
                          (l &&
                            r.default.createElement(o.Icon, {
                              color: a.IconColor.iconAlternativeSoft,
                              name: l,
                              size: o.IconSize.Sm,
                            })) ??
                          r.default.createElement(o.Icon, {
                            name: o.IconName.Question,
                            color: a.IconColor.iconAlternativeSoft,
                            size: o.IconSize.Sm,
                          })
                      ),
                      !s &&
                        r.default.createElement(
                          o.Popover,
                          u(
                            {
                              position: o.PopoverPosition.Auto,
                              referenceElement: g,
                              isOpen: h,
                              onClickOutside: k,
                              style: {
                                maxWidth: '240px',
                                backgroundColor: 'var(--color-text-default)',
                                paddingInline: '16px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                transitionTimingFunction: 'linear',
                                display: 'inherit',
                                ...d,
                              },
                              preventOverflow: !0,
                              flip: !0,
                              hasArrow: !0,
                              isPortal: !0,
                            },
                            p
                          ),
                          r.default.createElement(
                            i.default,
                            { gap: 4 },
                            t &&
                              r.default.createElement(
                                o.PopoverHeader,
                                {
                                  color: a.TextColor.infoInverse,
                                  textAlign: a.TextAlign.Center,
                                  justifyContent: c
                                    ? a.JustifyContent.spaceBetween
                                    : a.JustifyContent.center,
                                  onClose: c,
                                  childrenWrapperProps: { style: { whiteSpace: 'nowrap' } },
                                },
                                t
                              ),
                            r.default.createElement(
                              o.Text,
                              {
                                justifyContent: a.JustifyContent.center,
                                color: a.TextColor.infoInverse,
                              },
                              e
                            )
                          )
                        )
                    );
                  }
                );
                n.default = l;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/layout/tooltip.tsx' },
    ],
    [
      7052,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../ducks/bridge/selectors': 6850,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/bridge/events/useRequestMetadataProperties': 6929,
        '../../../hooks/bridge/events/useRequestProperties': 6930,
        '../../../hooks/bridge/events/useTradeProperties': 6931,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/bridge/useIsTxSubmittable': 6938,
        '../../../hooks/bridge/useLatestBalance': 6939,
        '../../../hooks/useI18nContext': 6985,
        '../hooks/useSubmitBridgeTransaction': 7046,
        '../layout': 7049,
        '../utils/quote': 7074,
        '@metamask/bridge-controller': 1414,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.BridgeCTAButton = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = b(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/bridge-controller'),
                  a = e('../../../components/component-library'),
                  i = e('../../../ducks/bridge/selectors'),
                  c = e('../../../hooks/useI18nContext'),
                  u = T(e('../hooks/useSubmitBridgeTransaction')),
                  l = e('../../../helpers/constants/design-system'),
                  d = T(e('../../../hooks/bridge/useLatestBalance')),
                  p = e('../../../hooks/bridge/useIsTxSubmittable'),
                  m = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  h = e('../../../hooks/bridge/events/useRequestProperties'),
                  f = e('../../../hooks/bridge/events/useRequestMetadataProperties'),
                  g = e('../../../hooks/bridge/events/useTradeProperties'),
                  y = e('../../../../shared/constants/metametrics'),
                  k = e('../layout'),
                  v = e('../utils/quote');
                function T(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function b(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (b = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.BridgeCTAButton = ({ onFetchNewQuotes: e, needsDestinationAddress: t = !1 }) => {
                  const n = (0, c.useI18nContext)(),
                    T = (0, r.useSelector)(i.getFromToken),
                    b = (0, r.useSelector)(i.getToToken),
                    w = (0, r.useSelector)(i.getFromChain),
                    S = (0, r.useSelector)(i.getFromAmount),
                    {
                      isLoading: C,
                      activeQuote: _,
                      isQuoteGoingToRefresh: E,
                      quotesLastFetchedMs: I,
                    } = (0, r.useSelector)(i.getBridgeQuotes),
                    x = (0, r.useSelector)(i.getQuoteRefreshRate),
                    A = (0, v.isQuoteExpired)(E, x, I),
                    { submitBridgeTransaction: M } = (0, u.default)(),
                    [P, O] = (0, s.useState)(!1),
                    {
                      isNoQuotesAvailable: N,
                      isInsufficientBalance: D,
                      isInsufficientGasBalance: R,
                      isInsufficientGasForQuote: B,
                    } = (0, r.useSelector)(i.getValidationErrors),
                    j = (0, r.useSelector)(i.getWasTxDeclined),
                    F = (0, d.default)(T),
                    L = (0, s.useMemo)(
                      () =>
                        null != w && w.chainId ? (0, o.getNativeAssetForChainId)(w.chainId) : null,
                      [null == w ? void 0 : w.chainId]
                    ),
                    $ = (0, d.default)(L),
                    U = (0, p.useIsTxSubmittable)(),
                    W = (0, m.useCrossChainSwapsEventTracker)(),
                    { quoteRequestProperties: H } = (0, h.useRequestProperties)(),
                    q = (0, f.useRequestMetadataProperties)(),
                    K = (0, g.useTradeProperties)(),
                    V = D(F),
                    G = R($),
                    z = B($),
                    Y = (0, s.useMemo)(
                      () =>
                        j
                          ? 'youDeclinedTheTransaction'
                          : A
                            ? 'bridgeQuoteExpired'
                            : !C || U || _
                              ? G || N
                                ? undefined
                                : V || z
                                  ? 'alertReasonInsufficientBalance'
                                  : S
                                    ? t
                                      ? 'bridgeSelectDestinationAccount'
                                      : U
                                        ? 'submit'
                                        : 'swapSelectToken'
                                    : b
                                      ? t
                                        ? 'bridgeEnterAmountAndSelectAccount'
                                        : 'bridgeEnterAmount'
                                      : t
                                        ? 'bridgeSelectTokenAmountAndAccount'
                                        : 'bridgeSelectTokenAndAmount'
                              : undefined,
                      [C, S, b, U, V, G, z, j, A, t, _, N]
                    ),
                    Q = (0, s.useMemo)(() => (j || A ? 'bridgeFetchNewQuotes' : undefined), [j, A]);
                  return _ && !Q
                    ? s.default.createElement(
                        a.ButtonPrimary,
                        {
                          width: l.BlockSize.Full,
                          size: _ ? a.ButtonPrimarySize.Md : a.ButtonPrimarySize.Lg,
                          variant: l.TextVariant.bodyMd,
                          'data-testid': 'bridge-cta-button',
                          style: { boxShadow: 'none' },
                          onClick: async () => {
                            if (_ && U && !P)
                              try {
                                O(!0),
                                  H &&
                                    q &&
                                    K &&
                                    W({
                                      event: y.MetaMetricsEventName.ActionSubmitted,
                                      properties: { ...H, ...q, ...K },
                                    }),
                                  await M(_);
                              } finally {
                                O(!1);
                              }
                          },
                          loading: P,
                          disabled: !U || A || P || t,
                        },
                        Y ? n(Y) : ''
                      )
                    : s.default.createElement(
                        k.Row,
                        {
                          alignItems: l.AlignItems.center,
                          justifyContent: l.JustifyContent.center,
                          gap: 1,
                        },
                        s.default.createElement(
                          a.Text,
                          {
                            variant: l.TextVariant.bodyMd,
                            textAlign: l.TextAlign.Center,
                            color: l.TextColor.textAlternativeSoft,
                          },
                          Y ? n(Y) : ''
                        ),
                        Q &&
                          s.default.createElement(
                            a.ButtonLink,
                            {
                              as: 'a',
                              variant: l.TextVariant.bodyMd,
                              style: { whiteSpace: 'nowrap' },
                              onClick: e,
                            },
                            n(Q)
                          )
                      );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/prepare/bridge-cta-button.tsx' },
    ],
    [
      7053,
      {
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/lib/multichain/networks': 5843,
        '../../../components/component-library': 6402,
        '../../../components/multichain/asset-picker-amount/asset-picker': 6515,
        '../../../components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal-tabs': 6510,
        '../../../ducks/bridge/selectors': 6850,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/bridge/useLatestBalance': 6939,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../hooks/useIsMultichainSwap': 7045,
        '../layout': 7049,
        '../utils/quote': 7074,
        './components/bridge-asset-picker-button': 7055,
        '@metamask/bridge-controller': 1414,
        '@metamask/etherscan-link': 1938,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.BridgeInputGroup = void 0);
                var s,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  o = e('react-redux'),
                  a = e('@metamask/bridge-controller'),
                  i = e('@metamask/etherscan-link'),
                  c = e('../../../components/component-library'),
                  u = e('../../../components/multichain/asset-picker-amount/asset-picker'),
                  l = e(
                    '../../../components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal-tabs'
                  ),
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../ducks/metamask/metamask'),
                  m = e('../utils/quote'),
                  h = e('../layout'),
                  f = e('../../../helpers/constants/design-system'),
                  g =
                    (s = e('../../../hooks/bridge/useLatestBalance')) && s.__esModule
                      ? s
                      : { default: s },
                  y = e('../../../ducks/bridge/selectors'),
                  k = e('../../../helpers/utils/util'),
                  v = e('../../../hooks/useCopyToClipboard'),
                  T = e('../../../../shared/constants/time'),
                  b = e('../../../ducks/locale/locale'),
                  w = e('../hooks/useIsMultichainSwap'),
                  S = e('../../../../shared/constants/multichain/networks'),
                  C = e('../../../../shared/lib/multichain/networks'),
                  _ = e('./components/bridge-asset-picker-button');
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function I() {
                  return (
                    (I = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) ({}).hasOwnProperty.call(n, s) && (e[s] = n[s]);
                          }
                          return e;
                        }),
                    I.apply(null, arguments)
                  );
                }
                const x = e =>
                  e
                    .replace(/[^\d.]+/gu, '')
                    .split('.', 2)
                    .join('.');
                n.BridgeInputGroup = ({
                  header: e,
                  token: t,
                  onAssetChange: n,
                  onAmountChange: s,
                  networkProps: E,
                  isTokenListLoading: A,
                  customTokenListGenerator: M,
                  amountFieldProps: P,
                  amountInFiat: O,
                  onMaxButtonClick: N,
                  isMultiselectEnabled: D,
                  onBlockExplorerClick: R,
                  buttonProps: B,
                }) => {
                  var j;
                  const F = (0, d.useI18nContext)(),
                    { isLoading: L } = (0, o.useSelector)(y.getBridgeQuotes),
                    { isInsufficientBalance: $, isEstimatedReturnLow: U } = (0, o.useSelector)(
                      y.getValidationErrors
                    ),
                    W = (0, o.useSelector)(p.getCurrentCurrency),
                    H = (0, o.useSelector)(b.getIntlLocale),
                    q = null == E || null === (j = E.network) || void 0 === j ? void 0 : j.chainId,
                    K = (0, g.default)(t),
                    [, V] = (0, v.useCopyToClipboard)(T.MINUTE),
                    G = (0, r.useRef)(null),
                    z = (null == P ? void 0 : P.readOnly) || (null == P ? void 0 : P.disabled);
                  (0, r.useEffect)(() => {
                    var e;
                    !z &&
                      G.current &&
                      ((G.current.value =
                        (null == P || null === (e = P.value) || void 0 === e
                          ? void 0
                          : e.toString()) ?? ''),
                      G.current.focus());
                  }, [null == P ? void 0 : P.value, z, t]);
                  const Y = (0, w.useIsMultichainSwap)();
                  return r.default.createElement(
                    h.Column,
                    { paddingInline: 6, gap: 1 },
                    r.default.createElement(
                      h.Row,
                      { gap: 4 },
                      r.default.createElement(
                        c.TextField,
                        I(
                          {
                            inputProps: {
                              disableStateStyles: !0,
                              textAlign: f.TextAlign.Start,
                              style: {
                                fontWeight: 400,
                                fontSize: Math.max(
                                  14,
                                  (9 /
                                    Math.max(
                                      9,
                                      ((null == P ? void 0 : P.value) ?? '').toString().length
                                    )) *
                                    36
                                ),
                                transition: 'font-size 0.1s',
                                padding: 0,
                              },
                            },
                            style: {
                              minWidth: 96,
                              maxWidth: 190,
                              opacity: z && null != P && P.value ? 1 : undefined,
                            },
                            display: f.Display.Flex,
                            inputRef: G,
                            type: c.TextFieldType.Text,
                            className: 'amount-input',
                            placeholder: '0',
                            onKeyPress: e => {
                              var t;
                              e &&
                                ('.' === e.key &&
                                null !== (t = P.value) &&
                                void 0 !== t &&
                                t.toString().includes('.')
                                  ? e.preventDefault()
                                  : /^[\d.]{1}$/u.test(e.key) || e.preventDefault());
                            },
                            onPaste: e => {
                              e.preventDefault();
                              const t = x(e.clipboardData.getData('text'));
                              null == s || s(t ?? '');
                            },
                            onChange: e => {
                              e.preventDefault(), e.stopPropagation();
                              const t = x(e.target.value);
                              null == s || s(t ?? '');
                            },
                          },
                          P
                        )
                      ),
                      r.default.createElement(
                        u.AssetPicker,
                        {
                          header: e,
                          visibleTabs: [l.TabName.TOKENS],
                          asset: t ?? undefined,
                          onAssetChange: n,
                          networkProps: E,
                          customTokenListGenerator: M,
                          isTokenListLoading: A,
                          isMultiselectEnabled: D,
                        },
                        (e, n) =>
                          z && !t
                            ? r.default.createElement(
                                c.Button,
                                {
                                  'data-testid': B.testId,
                                  onClick: e,
                                  size: c.ButtonSize.Lg,
                                  paddingLeft: 6,
                                  paddingRight: 6,
                                  fontWeight: f.FontWeight.Normal,
                                  style: { whiteSpace: 'nowrap' },
                                },
                                F(Y ? 'swapSwapTo' : 'bridgeTo')
                              )
                            : r.default.createElement(_.BridgeAssetPickerButton, {
                                onClick: e,
                                networkImageSrc: n,
                                asset: t ?? undefined,
                                networkProps: E,
                                'data-testid': B.testId,
                              })
                      )
                    ),
                    r.default.createElement(
                      h.Row,
                      { justifyContent: f.JustifyContent.spaceBetween },
                      r.default.createElement(
                        h.Row,
                        null,
                        r.default.createElement(
                          c.Text,
                          {
                            variant: f.TextVariant.bodyMd,
                            fontWeight: f.FontWeight.Normal,
                            color:
                              z && U ? f.TextColor.warningDefault : f.TextColor.textAlternativeSoft,
                            textAlign: f.TextAlign.End,
                            ellipsis: !0,
                          },
                          z && L && '0' === P.value ? F('bridgeCalculatingAmount') : undefined,
                          O && (0, m.formatCurrencyAmount)(O, W, 2)
                        )
                      ),
                      r.default.createElement(
                        c.Text,
                        {
                          display: f.Display.Flex,
                          gap: 1,
                          variant: f.TextVariant.bodyMd,
                          color:
                            !z && $(K) ? f.TextColor.errorDefault : f.TextColor.textAlternativeSoft,
                          onClick: () => {
                            z && t && q
                              ? (() => {
                                  if (t && q) {
                                    const s = (0, a.formatChainIdToCaip)(q);
                                    let r = '';
                                    if (s === S.MultichainNetworks.SOLANA) {
                                      const e =
                                        S.MULTICHAIN_NETWORK_BLOCK_EXPLORER_FORMAT_URLS_MAP[s];
                                      e && (r = (0, C.formatBlockExplorerAddressUrl)(e, t.address));
                                    } else {
                                      var e, n;
                                      const s =
                                        null == E ||
                                        null === (e = E.network) ||
                                        void 0 === e ||
                                        null === (e = e.blockExplorerUrls) ||
                                        void 0 === e
                                          ? void 0
                                          : e[
                                              (null == E || null === (n = E.network) || void 0 === n
                                                ? void 0
                                                : n.defaultBlockExplorerUrlIndex) ?? 0
                                            ];
                                      s &&
                                        (r = (0, i.getAccountLink)(
                                          t.address,
                                          q,
                                          { blockExplorerUrl: s },
                                          undefined
                                        ));
                                    }
                                    r && (V(r), null == R || R(t));
                                  }
                                })()
                              : t && q && V(t.address);
                          },
                          as: z ? 'a' : 'p',
                          style: {
                            cursor: z ? 'pointer' : 'default',
                            textDecoration: z ? 'underline' : 'none',
                          },
                        },
                        z &&
                          t &&
                          q &&
                          ((0, a.isNativeAddress)(t.address)
                            ? undefined
                            : (0, k.shortenString)(t.address, {
                                truncatedCharLimit: 11,
                                truncatedStartChars: 4,
                                truncatedEndChars: 4,
                                skipCharacterInEnd: !1,
                              })),
                        !z && K
                          ? (0, m.formatTokenAmount)(H, K, null == t ? void 0 : t.symbol)
                          : undefined,
                        N &&
                          t &&
                          !(0, a.isNativeAddress)(t.address) &&
                          K &&
                          r.default.createElement(
                            c.ButtonLink,
                            {
                              variant: f.TextVariant.bodyMd,
                              onClick: () => N(null == K ? void 0 : K.toFixed()),
                            },
                            F('max')
                          )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/prepare/bridge-input-group.tsx' },
    ],
    [
      7054,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../ducks/bridge/actions': 6848,
        '../../../ducks/bridge/selectors': 6850,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/useI18nContext': 6985,
        '../layout': 7049,
        '@metamask/bridge-controller': 1414,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.BridgeTransactionSettingsModal = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/bridge-controller'),
                  a = e('../../../components/component-library'),
                  i = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../../ducks/bridge/selectors'),
                  l = e('../../../ducks/bridge/actions'),
                  d = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  p = e('../../../../shared/constants/metametrics'),
                  m = e('../layout');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = [o.BRIDGE_DEFAULT_SLIPPAGE, 3];
                n.BridgeTransactionSettingsModal = ({ onClose: e, isOpen: t }) => {
                  const n = (0, i.useI18nContext)(),
                    o = (0, d.useCrossChainSwapsEventTracker)(),
                    h = (0, r.useDispatch)(),
                    g = (0, r.useSelector)(u.getSlippage),
                    [y, k] = (0, s.useState)(g),
                    [v, T] = (0, s.useState)(g && !f.includes(g) ? g.toString() : undefined),
                    [b, w] = (0, s.useState)(!0),
                    S = (() => {
                      if (!v) return null;
                      const e = Number(v.replace(',', '.'));
                      return e < 0.5
                        ? {
                            severity: c.SEVERITIES.WARNING,
                            text: n('swapSlippageLowDescription', [e]),
                            title: n('swapSlippageLowTitle'),
                          }
                        : null;
                    })();
                  return s.default.createElement(
                    a.Modal,
                    { isOpen: t, onClose: e, className: 'bridge-settings-modal' },
                    s.default.createElement(a.ModalOverlay, null),
                    s.default.createElement(
                      a.ModalContent,
                      null,
                      s.default.createElement(
                        a.ModalHeader,
                        { onClose: e },
                        n('transactionSettings')
                      ),
                      s.default.createElement(
                        m.Column,
                        { gap: 3, padding: 4 },
                        s.default.createElement(
                          m.Row,
                          { gap: 1, justifyContent: c.JustifyContent.flexStart },
                          s.default.createElement(a.Text, null, n('swapsMaxSlippage')),
                          s.default.createElement(
                            m.Tooltip,
                            {
                              position: a.PopoverPosition.Top,
                              iconName: a.IconName.Info,
                              style: { zIndex: 1051 },
                            },
                            n('swapSlippageTooltip')
                          )
                        ),
                        s.default.createElement(
                          m.Row,
                          { gap: 2, justifyContent: c.JustifyContent.flexStart },
                          f.map(e =>
                            s.default.createElement(
                              a.Button,
                              {
                                key: e,
                                size: a.ButtonSize.Sm,
                                onClick: t => {
                                  t.preventDefault(), t.stopPropagation(), k(e), T(undefined);
                                },
                                variant: a.ButtonVariant.Secondary,
                                borderColor:
                                  y === e && b
                                    ? c.BorderColor.primaryDefault
                                    : c.BorderColor.borderDefault,
                                borderWidth: y === e && b ? 2 : 1,
                                backgroundColor:
                                  y === e && b
                                    ? c.BackgroundColor.primaryMuted
                                    : c.BackgroundColor.backgroundDefault,
                              },
                              s.default.createElement(
                                a.Text,
                                {
                                  color:
                                    y === e && b
                                      ? c.TextColor.primaryDefault
                                      : c.TextColor.textDefault,
                                },
                                e,
                                '%'
                              )
                            )
                          ),
                          b &&
                            s.default.createElement(
                              a.Button,
                              {
                                size: a.ButtonSize.Sm,
                                variant: a.ButtonVariant.Secondary,
                                borderColor:
                                  v === undefined
                                    ? c.BorderColor.borderDefault
                                    : c.BorderColor.primaryDefault,
                                borderWidth: v === undefined ? 1 : 2,
                                backgroundColor:
                                  v === undefined
                                    ? c.BackgroundColor.backgroundDefault
                                    : c.BackgroundColor.primaryMuted,
                                onClick: e => {
                                  e.preventDefault(), e.stopPropagation(), w(!1);
                                },
                              },
                              s.default.createElement(
                                a.Text,
                                {
                                  color:
                                    v === undefined
                                      ? c.TextColor.textDefault
                                      : c.TextColor.primaryDefault,
                                },
                                v === undefined ? n('customSlippage') : `${v}%`
                              )
                            ),
                          !b &&
                            s.default.createElement(a.TextField, {
                              borderColor: c.BorderColor.primaryDefault,
                              borderWidth: 2,
                              borderRadius: c.BorderRadius.pill,
                              type: a.TextFieldType.Text,
                              value: v,
                              onChange: e => {
                                const { value: t } = e.target;
                                ('' === t || /^\d*[.,]?\d*$/u.test(t)) && (k(undefined), T(t));
                              },
                              autoFocus: !0,
                              onBlur: () => {
                                w(!0);
                              },
                              onFocus: () => {
                                w(!1);
                              },
                              endAccessory: s.default.createElement(
                                a.Text,
                                { variant: c.TextVariant.bodyMd },
                                '%'
                              ),
                            })
                        ),
                        S &&
                          s.default.createElement(
                            a.Box,
                            { marginTop: 5 },
                            s.default.createElement(
                              a.BannerAlert,
                              {
                                severity: S.severity,
                                title: S.title,
                                titleProps: { 'data-testid': 'swaps-banner-title' },
                              },
                              s.default.createElement(a.Text, null, S.text)
                            )
                          )
                      ),
                      s.default.createElement(
                        a.ModalFooter,
                        null,
                        s.default.createElement(
                          a.ButtonPrimary,
                          {
                            width: c.BlockSize.Full,
                            size: a.ButtonPrimarySize.Md,
                            variant: c.TextVariant.bodyMd,
                            disabled:
                              (v !== undefined && Number(v.replace(',', '.')) === g) ||
                              (y !== undefined && y === g),
                            onClick: () => {
                              const t = y ?? Number(null == v ? void 0 : v.replace(',', '.'));
                              t &&
                                (o({
                                  event: p.MetaMetricsEventName.InputChanged,
                                  properties: { input: 'slippage', value: t.toString() },
                                }),
                                h((0, l.setSlippage)(t)),
                                e());
                            },
                          },
                          n('submit')
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/prepare/bridge-transaction-settings-modal.tsx' },
    ],
    [
      7055,
      {
        '../../../../components/component-library': 6402,
        '../../../../components/component-library/select-button/select-button.types': 6439,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/nfts': 6910,
        '../../../../hooks/useI18nContext': 6985,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.BridgeAssetPickerButton = void 0);
                var s,
                  r = (s = e('react')) && s.__esModule ? s : { default: s },
                  o = e(
                    '../../../../components/component-library/select-button/select-button.types'
                  ),
                  a = e('../../../../components/component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../helpers/utils/nfts');
                function l() {
                  return (
                    (l = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) ({}).hasOwnProperty.call(n, s) && (e[s] = n[s]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                n.BridgeAssetPickerButton = ({
                  asset: e,
                  networkProps: t,
                  networkImageSrc: n,
                  ...s
                }) => {
                  var d;
                  const p = (0, c.useI18nContext)();
                  return r.default.createElement(
                    a.SelectButton,
                    l(
                      {
                        borderRadius: i.BorderRadius.pill,
                        backgroundColor: i.BackgroundColor.backgroundDefault,
                        borderColor: i.BorderColor.borderMuted,
                        style: {
                          padding: 8,
                          paddingRight: 11,
                          paddingInline: e ? undefined : 24,
                          minWidth: 'fit-content',
                        },
                        gap: 0,
                        size: o.SelectButtonSize.Lg,
                        alignItems: i.AlignItems.center,
                        descriptionProps: {
                          variant: i.TextVariant.bodyMd,
                          overflowWrap: i.OverflowWrap.BreakWord,
                          ellipsis: !1,
                        },
                        caretIconProps: {
                          name: a.IconName.Arrow2Down,
                          style: { display: i.Display.None },
                        },
                        label: r.default.createElement(
                          a.Text,
                          { variant: i.TextVariant.bodyLgMedium, ellipsis: !0 },
                          (null == e ? void 0 : e.symbol) ?? p('bridgeTo')
                        ),
                        startAccessory: e
                          ? r.default.createElement(
                              a.BadgeWrapper,
                              {
                                marginRight: 2,
                                badge: e
                                  ? r.default.createElement(a.AvatarNetwork, {
                                      name:
                                        (null == t || null === (d = t.network) || void 0 === d
                                          ? void 0
                                          : d.name) ?? '',
                                      src: n,
                                      size: a.AvatarNetworkSize.Xs,
                                    })
                                  : undefined,
                              },
                              e
                                ? r.default.createElement(a.AvatarToken, {
                                    src: (0, u.getNftImage)(e.image) || undefined,
                                    backgroundColor: i.BackgroundColor.backgroundHover,
                                    name: e.symbol,
                                  })
                                : undefined
                            )
                          : undefined,
                      },
                      s
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/prepare/components/bridge-asset-picker-button.tsx',
      },
    ],
    [
      7056,
      {
        '../../../../../app/scripts/lib/multichain/address': 142,
        '../../../../components/app/user-preferenced-currency-display/user-preferenced-currency-display.component': 6318,
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/common': 6870,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useAccountTotalCrossChainFiatBalance': 6965,
        '../../../../hooks/useGetFormattedTokensPerChain': 6984,
        '../../../../hooks/useMultichainAccountTotalFiatBalance': 6991,
        '../../../../hooks/useMultichainSelector': 6993,
        '../../../../selectors': 7601,
        '../../../../selectors/multichain': 7605,
        classnames: 4168,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = k(e('react')),
                  r = k(e('classnames')),
                  o = e('react-redux'),
                  a = e('../../../../helpers/utils/util'),
                  i = e('../../../../components/component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../selectors'),
                  l = e('../../../../../app/scripts/lib/multichain/address'),
                  d = e('../../../../hooks/useMultichainAccountTotalFiatBalance'),
                  p = e('../../../../hooks/useGetFormattedTokensPerChain'),
                  m = e('../../../../hooks/useAccountTotalCrossChainFiatBalance'),
                  h = k(
                    e(
                      '../../../../components/app/user-preferenced-currency-display/user-preferenced-currency-display.component'
                    )
                  ),
                  f = e('../../../../helpers/constants/common'),
                  g = e('../../../../hooks/useMultichainSelector'),
                  y = e('../../../../selectors/multichain');
                function k(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const v = ({ account: e, selected: t, onClick: n }) => {
                  const k = (0, o.useSelector)(u.getUseBlockie),
                    v = (0, o.useSelector)(u.getShouldHideZeroBalanceTokens),
                    T = (0, o.useSelector)(u.getIsTokenNetworkFilterEqualCurrentNetwork),
                    b = (0, o.useSelector)(u.getChainIdsToPoll),
                    { isEvmNetwork: w } = (0, g.useMultichainSelector)(y.getMultichainNetwork, e),
                    S = (0, g.useMultichainSelector)(y.getMultichainIsTestnet, e),
                    C = !S,
                    _ = (0, g.useMultichainSelector)(y.getMultichainShouldShowFiat, e),
                    E = (0, o.useSelector)(u.getShowFiatInTestnets),
                    I = _ && (C || (S && E)),
                    x = (0, g.useMultichainSelector)(y.getMultichainNativeCurrencyImage, e),
                    A = (0, g.useMultichainSelector)(y.getMultichainNativeCurrency, e),
                    M = (0, d.useMultichainAccountTotalFiatBalance)(e),
                    { formattedTokensWithBalancesPerChain: P } = (0,
                    p.useGetFormattedTokensPerChain)(e, v, T, b),
                    { totalFiatBalance: O } = (0, m.useAccountTotalCrossChainFiatBalance)(e, P);
                  let N;
                  return (
                    (N = w ? (!_ || S ? e.balance : O) : M.totalBalance),
                    s.default.createElement(
                      i.Box,
                      {
                        display: c.Display.Flex,
                        padding: 4,
                        backgroundColor: t
                          ? c.BackgroundColor.primaryMuted
                          : c.BackgroundColor.transparent,
                        className: (0, r.default)('multichain-account-list-item', {
                          'multichain-account-list-item--selected': t,
                        }),
                        onClick: n,
                        alignItems: c.AlignItems.center,
                      },
                      s.default.createElement(i.AvatarAccount, {
                        borderColor: c.BorderColor.transparent,
                        size: i.AvatarAccountSize.Md,
                        address: e.address,
                        variant: k
                          ? i.AvatarAccountVariant.Blockies
                          : i.AvatarAccountVariant.Jazzicon,
                        marginInlineEnd: 2,
                      }),
                      s.default.createElement(
                        i.Box,
                        {
                          display: c.Display.Flex,
                          flexDirection: c.FlexDirection.Column,
                          style: { flex: 1 },
                        },
                        s.default.createElement(
                          i.Box,
                          {
                            display: c.Display.Flex,
                            justifyContent: c.JustifyContent.spaceBetween,
                          },
                          s.default.createElement(
                            i.Text,
                            { variant: c.TextVariant.bodyMdMedium },
                            e.metadata.name
                          ),
                          s.default.createElement(
                            i.Box,
                            {
                              display: c.Display.Flex,
                              alignItems: c.AlignItems.center,
                              justifyContent: c.JustifyContent.flexEnd,
                              gap: 1,
                            },
                            s.default.createElement(
                              i.Text,
                              {
                                as: 'div',
                                display: c.Display.Flex,
                                flexDirection: c.FlexDirection.Row,
                                alignItems: c.AlignItems.center,
                                justifyContent: c.JustifyContent.flexEnd,
                                ellipsis: !0,
                                textAlign: c.TextAlign.End,
                              },
                              s.default.createElement(h.default, {
                                ethNumberOfDecimals: 3,
                                value: N,
                                type: f.PRIMARY,
                                showFiat: I,
                                isAggregatedFiatOverviewBalance: I,
                                hideLabel: !0,
                                'data-testid': 'first-currency-display',
                              })
                            )
                          )
                        ),
                        s.default.createElement(
                          i.Box,
                          {
                            display: c.Display.Flex,
                            justifyContent: c.JustifyContent.spaceBetween,
                            alignItems: c.AlignItems.center,
                          },
                          s.default.createElement(
                            i.Text,
                            {
                              variant: c.TextVariant.bodySm,
                              color: c.TextColor.textAlternative,
                              'data-testid': 'account-list-address',
                            },
                            (0, a.shortenAddress)((0, l.normalizeSafeAddress)(e.address))
                          ),
                          s.default.createElement(
                            i.Box,
                            { display: c.Display.Flex, gap: 2 },
                            s.default.createElement(i.AvatarToken, {
                              src: x,
                              name: A,
                              size: i.AvatarTokenSize.Xs,
                              borderColor: c.BorderColor.borderDefault,
                            })
                          )
                        )
                      )
                    )
                  );
                };
                n.default = s.default.memo(v);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/prepare/components/destination-account-list-item.tsx',
      },
    ],
    [
      7057,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../selectors': 7601,
        '../../hooks/useExternalAccountResolution': 7041,
        './destination-account-list-item': 7056,
        './destination-selected-account-list-item': 7058,
        './external-account-list-item': 7059,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.DestinationAccountPicker = void 0);
                var s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, o, a) : (s[o] = e[o]);
                      }
                    return (s.default = e), n && n.set(e, s), s;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('../../../../components/component-library'),
                  a = e('../../../../selectors'),
                  i = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../../app/scripts/translate'),
                  u = e('../../hooks/useExternalAccountResolution'),
                  l = m(e('./destination-selected-account-list-item')),
                  d = m(e('./destination-account-list-item')),
                  p = e('./external-account-list-item');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.DestinationAccountPicker = ({
                  onAccountSelect: e,
                  selectedSwapToAccount: t,
                  isDestinationSolana: n,
                }) => {
                  const [m, h] = (0, s.useState)(''),
                    f = (0, r.useSelector)(a.getSelectedInternalAccount),
                    g = (0, r.useSelector)(a.getInternalAccounts),
                    { externalAccount: y } = (0, u.useExternalAccountResolution)({
                      searchQuery: m,
                      isDestinationSolana: n,
                      accounts: g,
                    }),
                    k = (0, s.useMemo)(
                      () =>
                        g.filter(e => {
                          const t = e.metadata.name.toLowerCase().includes(m.toLowerCase()),
                            s = e.address.toLowerCase().includes(m.toLowerCase()),
                            r = t || s,
                            o = n ? (0, a.isSolanaAccount)(e) : !(0, a.isSolanaAccount)(e);
                          return r && o;
                        }),
                      [g, n, m]
                    );
                  return t
                    ? s.default.createElement(
                        o.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          alignItems: i.AlignItems.center,
                          justifyContent: i.JustifyContent.spaceBetween,
                          width: i.BlockSize.Full,
                          className: 'swap-to-account-picker',
                          backgroundColor: i.BackgroundColor.backgroundDefault,
                          style: {
                            height: '70px',
                            borderRadius: '8px',
                            boxShadow: 'var(--shadow-size-sm) var(--color-shadow-default)',
                          },
                        },
                        s.default.createElement(
                          o.Box,
                          {
                            className: 'destination-account-picker__selected',
                            width: i.BlockSize.Full,
                          },
                          s.default.createElement(l.default, {
                            account: t,
                            isSelected: t.id === (null == f ? void 0 : f.id),
                            showOptions: !1,
                            disableHover: !0,
                          })
                        ),
                        s.default.createElement(
                          o.Box,
                          { className: 'deselect-button-container', paddingRight: 5 },
                          s.default.createElement(
                            o.Button,
                            {
                              onClick: () => e(null),
                              'aria-label': 'Deselect account',
                              variant: o.ButtonVariant.Link,
                              size: o.ButtonSize.Sm,
                              className: 'deselect-button',
                              style: {
                                padding: '5px',
                                color: 'var(--color-icon-alternative)',
                                textDecoration: 'none',
                              },
                            },
                            '✕'
                          )
                        )
                      )
                    : s.default.createElement(
                        o.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          width: i.BlockSize.Full,
                          className: 'destination-account-picker',
                          backgroundColor: i.BackgroundColor.backgroundDefault,
                          style: { borderRadius: '8px', position: 'relative' },
                        },
                        s.default.createElement(
                          o.Box,
                          {
                            className: 'search-container',
                            width: i.BlockSize.Full,
                            display: i.Display.Flex,
                            alignItems: i.AlignItems.center,
                            justifyContent: i.JustifyContent.center,
                            backgroundColor: i.BackgroundColor.backgroundDefault,
                            style: {
                              height: '50px',
                              borderBottomWidth: '1px',
                              borderBottomStyle: 'solid',
                              borderBottomColor: '#B7BBC866',
                              borderRadius: '8px 8px 0 0',
                              boxShadow: 'var(--shadow-size-sm) var(--color-shadow-default)',
                            },
                          },
                          s.default.createElement(o.TextField, {
                            placeholder: n
                              ? (0, c.t)('destinationAccountPickerSearchPlaceholderToSolana')
                              : (0, c.t)('destinationAccountPickerSearchPlaceholderToMainnet'),
                            value: m,
                            onChange: e => h(e.target.value),
                            clearButtonOnClick: () => h(''),
                            className: 'text-field-search',
                            style: {
                              width: '98%',
                              borderRadius: 0,
                              borderWidth: 0,
                              color: 'var(--color-text-alternative)',
                            },
                          })
                        ),
                        s.default.createElement(o.Box, { style: { height: '20px' } }),
                        s.default.createElement(
                          o.Box,
                          {
                            className: 'destination-account-picker__list',
                            backgroundColor: i.BackgroundColor.backgroundDefault,
                            style: {
                              position: 'absolute',
                              top: '50px',
                              left: 0,
                              right: 0,
                              maxHeight: '240px',
                              overflowY: 'auto',
                              borderRadius: '0 0 8px 8px',
                              zIndex: 1e3,
                              boxShadow: 'var(--shadow-size-sm) var(--color-shadow-default)',
                            },
                          },
                          k.map(n =>
                            s.default.createElement(d.default, {
                              key: n.id,
                              account: n,
                              onClick: () => e(n),
                              isSelected: n.id === (null == t ? void 0 : t.id),
                              showOptions: !1,
                            })
                          ),
                          y &&
                            s.default.createElement(p.ExternalAccountListItem, {
                              key: 'external-account',
                              account: y,
                              selected: Boolean(t && t.address === y.address),
                              onClick: () => e(y),
                            }),
                          0 === k.length &&
                            !y &&
                            s.default.createElement(
                              o.Box,
                              {
                                display: i.Display.Flex,
                                style: { minHeight: '79px' },
                                width: i.BlockSize.Full,
                                height: i.BlockSize.Full,
                                justifyContent: i.JustifyContent.center,
                                alignItems: i.AlignItems.center,
                              },
                              s.default.createElement(
                                o.Text,
                                { textAlign: i.TextAlign.Center },
                                m
                                  ? (0, c.t)('destinationAccountPickerNoMatching')
                                  : (0, c.t)('destinationAccountPickerNoEligible')
                              )
                            )
                        )
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/prepare/components/destination-account-picker.tsx',
      },
    ],
    [
      7058,
      {
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        classnames: 4168,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var s = l(e('react')),
                  r = l(e('classnames')),
                  o = e('react-redux'),
                  a = e('../../../../components/component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../selectors'),
                  u = e('../../../../hooks/useI18nContext');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = ({ account: e, selected: t, onClick: n }) => {
                  const l = (0, o.useSelector)(c.getUseBlockie),
                    d = (0, u.useI18nContext)(),
                    p = 'isExternal' in e && e.isExternal;
                  return s.default.createElement(
                    a.Box,
                    {
                      display: i.Display.Flex,
                      padding: 4,
                      backgroundColor: t
                        ? i.BackgroundColor.primaryMuted
                        : i.BackgroundColor.transparent,
                      className: (0, r.default)('multichain-account-list-item', {
                        'multichain-account-list-item--selected': t,
                      }),
                      onClick: n,
                      alignItems: i.AlignItems.center,
                      style: { pointerEvents: 'none' },
                    },
                    s.default.createElement(a.AvatarAccount, {
                      borderColor: i.BorderColor.transparent,
                      size: a.AvatarAccountSize.Md,
                      address: e.address,
                      variant: l
                        ? a.AvatarAccountVariant.Blockies
                        : a.AvatarAccountVariant.Jazzicon,
                      marginInlineEnd: 2,
                    }),
                    s.default.createElement(
                      a.Box,
                      { display: i.Display.Flex, style: { flexDirection: 'column' } },
                      s.default.createElement(
                        a.Text,
                        {
                          variant: i.TextVariant.bodySmMedium,
                          color: i.TextColor.textAlternative,
                          'data-testid': 'account-list-address',
                          marginBottom: 1,
                        },
                        d('destinationAccountPickerReceiveAt')
                      ),
                      s.default.createElement(
                        a.Text,
                        { variant: i.TextVariant.bodyMdMedium, marginBottom: 1 },
                        p
                          ? e.metadata.name.endsWith('.eth')
                            ? e.metadata.name
                            : d('externalAccount')
                          : e.metadata.name
                      )
                    )
                  );
                };
                n.default = s.default.memo(d);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/prepare/components/destination-selected-account-list-item.tsx',
      },
    ],
    [
      7059,
      {
        '../../../../../app/scripts/lib/multichain/address': 142,
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        classnames: 4168,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ExternalAccountListItem = void 0);
                var s = p(e('react')),
                  r = p(e('classnames')),
                  o = e('react-redux'),
                  a = e('../../../../helpers/utils/util'),
                  i = e('../../../../components/component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../selectors'),
                  l = e('../../../../../app/scripts/lib/multichain/address'),
                  d = e('../../../../hooks/useI18nContext');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.ExternalAccountListItem = ({ account: e, selected: t, onClick: n }) => {
                  const p = (0, o.useSelector)(u.getUseBlockie),
                    m = (0, d.useI18nContext)(),
                    h = e.metadata.name.endsWith('.eth');
                  return s.default.createElement(
                    i.Box,
                    {
                      display: c.Display.Flex,
                      padding: 4,
                      backgroundColor: c.BackgroundColor.transparent,
                      className: (0, r.default)('multichain-account-list-item', {
                        'multichain-account-list-item--selected': t,
                      }),
                      onClick: n,
                      alignItems: c.AlignItems.center,
                      justifyContent: c.JustifyContent.spaceBetween,
                    },
                    s.default.createElement(
                      i.Box,
                      { display: c.Display.Flex, alignItems: c.AlignItems.center },
                      s.default.createElement(i.AvatarAccount, {
                        borderColor: c.BorderColor.transparent,
                        size: i.AvatarAccountSize.Md,
                        address: e.address,
                        variant: p
                          ? i.AvatarAccountVariant.Blockies
                          : i.AvatarAccountVariant.Jazzicon,
                        marginInlineEnd: 2,
                      }),
                      s.default.createElement(
                        i.Box,
                        {
                          display: c.Display.Flex,
                          flexDirection: c.FlexDirection.Column,
                          style: { maxWidth: '140px', overflow: 'hidden' },
                        },
                        s.default.createElement(
                          i.Text,
                          {
                            variant: c.TextVariant.bodyMdMedium,
                            marginBottom: 1,
                            style: {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            },
                          },
                          h ? e.metadata.name : m('externalAccount')
                        ),
                        s.default.createElement(
                          i.Text,
                          {
                            variant: c.TextVariant.bodySm,
                            color: c.TextColor.textAlternative,
                            'data-testid': 'account-list-address',
                            style: {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            },
                          },
                          (0, a.shortenAddress)((0, l.normalizeSafeAddress)(e.address))
                        )
                      )
                    ),
                    h &&
                      s.default.createElement(i.Tag, {
                        label: m('externalAccount'),
                        paddingLeft: 2,
                        paddingRight: 2,
                        labelProps: { variant: c.TextVariant.bodyXs },
                      })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/prepare/components/external-account-list-item.tsx',
      },
    ],
    [
      706,
      { './DataItem': 704, './cbor-sync': 705 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.DataItem =
                    n.addWriter =
                    n.addReader =
                    n.addSemanticEncode =
                    n.addSemanticDecode =
                    n.decodeToDataItem =
                    n.encodeDataItem =
                      void 0);
                var s = e('./cbor-sync');
                Object.defineProperty(n, 'encodeDataItem', {
                  enumerable: !0,
                  get: function () {
                    return s.encodeDataItem;
                  },
                }),
                  Object.defineProperty(n, 'decodeToDataItem', {
                    enumerable: !0,
                    get: function () {
                      return s.decodeToDataItem;
                    },
                  }),
                  Object.defineProperty(n, 'addSemanticDecode', {
                    enumerable: !0,
                    get: function () {
                      return s.addSemanticDecode;
                    },
                  }),
                  Object.defineProperty(n, 'addSemanticEncode', {
                    enumerable: !0,
                    get: function () {
                      return s.addSemanticEncode;
                    },
                  }),
                  Object.defineProperty(n, 'addReader', {
                    enumerable: !0,
                    get: function () {
                      return s.addReader;
                    },
                  }),
                  Object.defineProperty(n, 'addWriter', {
                    enumerable: !0,
                    get: function () {
                      return s.addWriter;
                    },
                  });
                var r = e('./DataItem');
                Object.defineProperty(n, 'DataItem', {
                  enumerable: !0,
                  get: function () {
                    return r.DataItem;
                  },
                });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/lib/index.js',
      },
    ],
  ],
  [],
  {}
);
