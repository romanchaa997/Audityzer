LavaPack.loadBundle(
  [
    [
      6008,
      { '../../../multichain': 6574, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = s);
                var a = i(e('react')),
                  r = i(e('prop-types')),
                  o = e('../../../multichain');
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function s({ items: e, onSelect: t }) {
                  return e && e.length
                    ? e.map(({ address: e, name: n, isDuplicate: r }) =>
                        a.default.createElement(o.AddressListItem, {
                          address: e,
                          label: n,
                          onClick: () => t(e, n),
                          key: e,
                          isDuplicate: r,
                        })
                      )
                    : null;
                }
                s.propTypes = {
                  items: r.default.arrayOf(
                    r.default.shape({
                      address: r.default.string.isRequired,
                      name: r.default.string,
                    })
                  ),
                  onSelect: r.default.func.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/contact-list/recipient-group/recipient-group.component.js',
      },
    ],
    [
      6009,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.isDuplicateContact =
                    n.hasDuplicateContacts =
                    n.buildDuplicateContactMap =
                      void 0);
                n.buildDuplicateContactMap = (e, t) => {
                  const n = new Map(
                    t.map(e => [e.metadata.name.trim().toLowerCase(), [`account-id-${e.id}`]])
                  );
                  return (
                    e.forEach(e => {
                      const { name: t, address: a } = e,
                        r = t.trim().toLowerCase(),
                        o = n.get(r) ?? [];
                      o.push(a), n.set(r, o);
                    }),
                    n
                  );
                };
                n.hasDuplicateContacts = (e, t) => {
                  const n = Array.from(new Set(e.map(({ name: e }) => e.toLowerCase().trim()))),
                    a = t.some(e => n.includes(e.metadata.name.toLowerCase().trim()));
                  return n.length !== e.length || a;
                };
                n.isDuplicateContact = (e, t, n) => {
                  const a = e.some(
                      ({ name: e }) => e.toLowerCase().trim() === n.toLowerCase().trim()
                    ),
                    r = t.some(
                      ({ metadata: e }) => e.name.toLowerCase().trim() === n.toLowerCase().trim()
                    );
                  return a || r;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/contact-list/utils.ts' },
    ],
    [
      6010,
      {
        '../../../helpers/constants/common': 6870,
        '../../../hooks/identity/useAuthentication': 6946,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/text-field': 6810,
        '../srp-input': 6275,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = f);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = d(e('prop-types')),
                  o = e('../../../hooks/useI18nContext'),
                  i = d(e('../../ui/text-field')),
                  s = e('../../component-library'),
                  l = d(e('../srp-input')),
                  c = e('../../../helpers/constants/common'),
                  u = e('../../../hooks/identity/useAuthentication');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function f({ disabled: e = !1, includeTerms: t = !1, onSubmit: n, submitText: r }) {
                  const [d, p] = (0, a.useState)(''),
                    [f, m] = (0, a.useState)(''),
                    [h, g] = (0, a.useState)(''),
                    [y, b] = (0, a.useState)(''),
                    [v, k] = (0, a.useState)(''),
                    [_, x] = (0, a.useState)(!1),
                    { signOut: w } = (0, u.useSignOut)(),
                    M = (0, o.useI18nContext)(),
                    T = (0, a.useCallback)(
                      e => {
                        let t = '',
                          n = '';
                        e && e.length < c.PASSWORD_MIN_LENGTH && (n = M('passwordNotLongEnough')),
                          d && e !== d && (t = M('passwordsDontMatch')),
                          g(e),
                          b(n),
                          m(t);
                      },
                      [d, M]
                    ),
                    E = (0, a.useCallback)(
                      e => {
                        let t = '';
                        h !== e && (t = M('passwordsDontMatch')), p(e), m(t);
                      },
                      [h, M]
                    ),
                    C = !e && h && d && h === d && v && (!t || _) && !y && !f,
                    S = (0, a.useCallback)(
                      async e => {
                        e.preventDefault(), C && (await w(), await n(h, v));
                      },
                      [C, n, h, v, w]
                    ),
                    O = (0, a.useCallback)(() => {
                      x(e => !e);
                    }, []),
                    I = M('acceptTermsOfUse', [
                      a.default.createElement(
                        'a',
                        {
                          className: 'create-new-vault__terms-link',
                          key: 'create-new-vault__link-text',
                          href: 'https://metamask.io/terms.html',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        },
                        M('terms')
                      ),
                    ]);
                  return a.default.createElement(
                    'form',
                    { className: 'create-new-vault__form', onSubmit: S },
                    a.default.createElement(l.default, {
                      onChange: k,
                      srpText: M('secretRecoveryPhrase'),
                    }),
                    a.default.createElement(
                      'div',
                      { className: 'create-new-vault__create-password' },
                      a.default.createElement(i.default, {
                        'data-testid': 'create-vault-password',
                        id: 'password',
                        label: M('newPassword'),
                        type: 'password',
                        value: h,
                        onChange: e => T(e.target.value),
                        error: y,
                        autoComplete: 'new-password',
                        margin: 'normal',
                        largeLabel: !0,
                      }),
                      a.default.createElement(i.default, {
                        'data-testid': 'create-vault-confirm-password',
                        id: 'confirm-password',
                        label: M('confirmPassword'),
                        type: 'password',
                        value: d,
                        onChange: e => E(e.target.value),
                        error: f,
                        autoComplete: 'new-password',
                        margin: 'normal',
                        largeLabel: !0,
                      })
                    ),
                    t
                      ? a.default.createElement(
                          'div',
                          { className: 'create-new-vault__terms' },
                          a.default.createElement(s.Checkbox, {
                            id: 'create-new-vault-terms-checkbox',
                            'data-testid': 'create-new-vault-terms-checkbox',
                            isChecked: _,
                            onChange: O,
                            label: I,
                          })
                        )
                      : null,
                    a.default.createElement(
                      s.Button,
                      {
                        'data-testid': 'create-new-vault-submit-button',
                        className: 'create-new-vault__submit-button',
                        variant: s.ButtonVariant.Primary,
                        disabled: !C,
                        type: 'submit',
                      },
                      r
                    )
                  );
                }
                f.propTypes = {
                  disabled: r.default.bool,
                  includeTerms: r.default.bool,
                  onSubmit: r.default.func.isRequired,
                  submitText: r.default.string.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/create-new-vault/create-new-vault.js' },
    ],
    [
      6011,
      { './create-new-vault': 6010 },
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
                var a,
                  r = (a = e('./create-new-vault')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/create-new-vault/index.js' },
    ],
    [
      6012,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/modules/Numeric': 5853,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/confirm-tx.util': 6899,
        '../../../hooks/useIsOriginalNativeTokenSymbol': 6986,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/currency-display': 6720,
        '../../ui/unit-input': 6824,
        './hooks/useProcessNewDecimalValue': 6013,
        './hooks/useStateWithFirstTouch': 6014,
        './hooks/useTokenExchangeRate': 6015,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = M);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = k(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = k(e('../../ui/unit-input')),
                  c = k(e('../../ui/currency-display')),
                  u = e('../../../ducks/metamask/metamask'),
                  d = e('../../../../shared/modules/selectors/networks'),
                  p = e('../../../selectors'),
                  f = e('../../../../shared/constants/common'),
                  m = e('../../../../shared/modules/Numeric'),
                  h = e('../../../hooks/useIsOriginalNativeTokenSymbol'),
                  g = e('../../../helpers/utils/confirm-tx.util'),
                  y = k(e('./hooks/useTokenExchangeRate')),
                  b = k(e('./hooks/useProcessNewDecimalValue')),
                  v = k(e('./hooks/useStateWithFirstTouch'));
                function k(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function _(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (_ = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const x = 18,
                  w = 7;
                function M({
                  hexValue: e,
                  isFiatPreferred: t,
                  onChange: n,
                  onPreferenceToggle: r,
                  swapIcon: k,
                  className: _ = '',
                  asset: M,
                  isSkeleton: T,
                  isMatchingUpstream: E,
                }) {
                  const C = isNaN(Number(null == M ? void 0 : M.decimals))
                      ? x
                      : Number(null == M ? void 0 : M.decimals),
                    S = (0, o.useSelector)(u.getNativeCurrency),
                    O = (0, o.useSelector)(u.getCurrentCurrency),
                    I = (null == M ? void 0 : M.symbol) || S || f.EtherDenomination.ETH,
                    P = O.toUpperCase(),
                    j = ((null == I ? void 0 : I.length) || 0) > w,
                    N = (0, o.useSelector)(p.getShouldShowFiat),
                    D = !(N && t),
                    [A, B, R] = (0, v.default)('0'),
                    [F, $] = (0, a.useState)('0'),
                    W = (0, o.useSelector)(d.getCurrentChainId),
                    { ticker: L, type: q, rpcUrl: z } = (0, o.useSelector)(d.getProviderConfig),
                    U = (0, h.useIsOriginalNativeTokenSymbol)(W, L, q, z),
                    V = (0, a.useRef)(),
                    H = (0, y.default)(null == M ? void 0 : M.address),
                    K = Boolean(null == H ? void 0 : H.toNumber()),
                    J = (0, b.default)(C, D, H),
                    G = n === undefined,
                    Q = async () => {
                      await r();
                    };
                  (0, a.useEffect)(() => {
                    D || K || r();
                  }, [K, D, r]);
                  const Y = (0, a.useRef)(null);
                  (0, a.useEffect)(() => {
                    const t = new m.Numeric(e, 16).toBase(10).shiftedBy(C).toString();
                    if (Number(t) === Number(A)) return;
                    const n = G || R || E,
                      { newTokenDecimalValue: a, newFiatDecimalValue: r } = J(t, !!n || undefined);
                    B(a),
                      $(r),
                      Y.current && clearTimeout(Y.current),
                      (Y.current = setTimeout(() => {
                        var e, t;
                        return null === (e = V.current) ||
                          void 0 === e ||
                          null === (t = e.updateIsOverflowing) ||
                          void 0 === t
                          ? void 0
                          : t.call(e);
                      }, 500));
                  }, [e, null == M ? void 0 : M.address, J, D, C, G]);
                  return T
                    ? a.default.createElement(
                        i.Box,
                        { paddingRight: 4, className: 'currency-input__skeleton-container' },
                        a.default.createElement(i.Box, {
                          width: s.BlockSize.Half,
                          className: 'currency-input__pulsing-bar',
                        }),
                        a.default.createElement(i.Box, {
                          width: s.BlockSize.OneThird,
                          className: 'currency-input__pulsing-bar',
                        })
                      )
                    : a.default.createElement(
                        l.default,
                        {
                          ref: V,
                          isDisabled: G,
                          isFocusOnInput: !G,
                          hideSuffix: D && j,
                          dataTestId: 'currency-input',
                          suffix: D ? I : P,
                          onChange: e => {
                            const { newTokenDecimalValue: t, newFiatDecimalValue: a } = J(e);
                            B(t),
                              $(a),
                              n(
                                new m.Numeric(t, 10)
                                  .times(Math.pow(10, C), 10)
                                  .toPrefixedHexString(),
                                t
                              );
                          },
                          value: D ? A : F,
                          className: _,
                          actionComponent:
                            N && H
                              ? k
                                ? k(Q)
                                : U
                                  ? a.default.createElement(
                                      'button',
                                      {
                                        className: 'currency-input__swap-component',
                                        'data-testid': 'currency-swap',
                                        onClick: Q,
                                      },
                                      a.default.createElement('i', {
                                        className: 'fa fa-retweet fa-lg',
                                      })
                                    )
                                  : null
                              : undefined,
                        },
                        (() => {
                          let e, t;
                          return N && H && U
                            ? (D
                                ? (t = (0, g.formatCurrency)(new m.Numeric(F, 10).toString(), O))
                                : ((e = I), (t = new m.Numeric(A, 10).toString())),
                              a.default.createElement(c.default, {
                                hideLabel: D || j,
                                suffix: e,
                                className: 'currency-input__conversion-component',
                                displayValue: t,
                              }))
                            : null;
                        })()
                      );
                }
                M.propTypes = {
                  hexValue: r.default.string,
                  isFiatPreferred: r.default.bool,
                  onChange: r.default.func,
                  onPreferenceToggle: r.default.func,
                  swapIcon: r.default.func,
                  className: r.default.string,
                  asset: r.default.shape({
                    address: r.default.string,
                    symbol: r.default.string,
                    decimals: r.default.oneOfType([r.default.string, r.default.number]),
                    isERC721: r.default.bool,
                  }),
                  isSkeleton: r.default.bool,
                  isMatchingUpstream: r.default.bool,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/currency-input/currency-input.js' },
    ],
    [
      6013,
      { '../../../../../shared/modules/Numeric': 5853, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function (e, t, n) {
                    return (0, a.useCallback)(
                      (a, i) => {
                        let s, l;
                        const c = (t, n = e) => {
                            const a = t.toString().split('.')[1] || '',
                              r = Math.min(n, e),
                              o = Math.min(a.length, r);
                            return t.toFixed(o);
                          },
                          u = new r.Numeric(a, 10);
                        return (
                          (i ?? t)
                            ? ((s = n ? u.times(n).toFixed(2) : undefined), (l = c(u)))
                            : ((s = u.toFixed(2)), (l = n ? c(u.divide(n), o) : undefined)),
                          { newFiatDecimalValue: s, newTokenDecimalValue: l }
                        );
                      },
                      [null == n ? void 0 : n.toString(), t, e]
                    );
                  });
                var a = e('react'),
                  r = e('../../../../../shared/modules/Numeric');
                const o = 6;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/currency-input/hooks/useProcessNewDecimalValue.tsx',
      },
    ],
    [
      6014,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function (e) {
                    const [t, n] = (0, a.useState)(r);
                    return [t === r ? e : t, n, t === r];
                  });
                var a = e('react');
                const r = Symbol('INITIAL_VALUE');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/currency-input/hooks/useStateWithFirstTouch.tsx',
      },
    ],
    [
      6015,
      {
        '../../../../../shared/modules/Numeric': 5853,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/utils/util': 6921,
        '../../../../selectors': 7601,
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
                  (n.default = function (e) {
                    const t = e ? (0, r.toChecksumAddress)(e) : undefined,
                      n = (0, o.useSelector)(c.getNativeCurrency),
                      f = (0, o.useSelector)(i.getCurrentChainId),
                      m = (0, o.useSelector)(c.getConversionRate),
                      h = (0, o.useSelector)(s.getTokenExchangeRates, o.shallowEqual),
                      [g, y] = (0, a.useState)({});
                    return (0, a.useMemo)(() => {
                      if (!m) return undefined;
                      const e = new l.Numeric(m, 10);
                      if (!t) return e;
                      if (!!t && [d, p].includes(g[t])) return undefined;
                      const a = h[t] || g[t];
                      return a
                        ? new l.Numeric(a, 10).times(e)
                        : (y(e => ({ ...e, [t]: d })),
                          (0, u.fetchTokenExchangeRates)(n, [t], f)
                            .then(e => {
                              y(n => ({ ...n, [t]: e[t] || p }));
                            })
                            .catch(() => {
                              y(e => ({ ...e, [t]: p }));
                            }),
                          undefined);
                    }, [g, f, n, t, m, h]);
                  });
                var a = e('react'),
                  r = e('ethereumjs-util'),
                  o = e('react-redux'),
                  i = e('../../../../../shared/modules/selectors/networks'),
                  s = e('../../../../selectors'),
                  l = e('../../../../../shared/modules/Numeric'),
                  c = e('../../../../ducks/metamask/metamask'),
                  u = e('../../../../helpers/utils/util');
                const d = 'loading',
                  p = 'failed';
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/currency-input/hooks/useTokenExchangeRate.tsx',
      },
    ],
    [
      6016,
      { './currency-input': 6012 },
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
                var a,
                  r = (a = e('./currency-input')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/currency-input/index.js' },
    ],
    [
      6017,
      {
        '../../../ducks/app/app': 6845,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
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
                    const e = (0, s.useI18nContext)(),
                      t = (0, o.useDispatch)();
                    function n() {
                      t((0, c.hideDataDeletionErrorModal)());
                    }
                    return r.default.createElement(
                      l.Modal,
                      { onClose: n, isOpen: !0 },
                      r.default.createElement(l.ModalOverlay, null),
                      r.default.createElement(
                        l.ModalContent,
                        {
                          modalDialogProps: {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                          },
                        },
                        r.default.createElement(
                          l.ModalHeader,
                          { paddingBottom: 4, paddingRight: 6, paddingLeft: 6, onClose: n },
                          r.default.createElement(
                            l.Box,
                            {
                              display: i.Display.Flex,
                              flexDirection: i.FlexDirection.Column,
                              alignItems: i.AlignItems.center,
                              justifyContent: i.JustifyContent.center,
                              gap: 4,
                            },
                            r.default.createElement(l.Icon, {
                              size: l.IconSize.Xl,
                              name: l.IconName.Danger,
                              color: i.IconColor.warningDefault,
                            }),
                            r.default.createElement(
                              l.Text,
                              { variant: i.TextVariant.headingSm, textAlign: i.TextAlign.Center },
                              e('deleteMetaMetricsDataErrorTitle')
                            )
                          )
                        ),
                        r.default.createElement(
                          l.Box,
                          {
                            paddingLeft: 6,
                            paddingRight: 6,
                            display: i.Display.Flex,
                            gap: 4,
                            flexDirection: i.FlexDirection.Column,
                          },
                          r.default.createElement(
                            l.Text,
                            { variant: i.TextVariant.bodySm, textAlign: i.TextAlign.Justify },
                            e('deleteMetaMetricsDataErrorDesc')
                          )
                        ),
                        r.default.createElement(
                          l.ModalFooter,
                          null,
                          r.default.createElement(
                            l.Box,
                            { display: i.Display.Flex, gap: 4 },
                            r.default.createElement(
                              l.Button,
                              {
                                size: l.ButtonSize.Lg,
                                width: i.BlockSize.Full,
                                variant: l.ButtonVariant.Primary,
                                onClick: n,
                              },
                              e('ok')
                            )
                          )
                        )
                      )
                    );
                  });
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../component-library'),
                  c = e('../../../ducks/app/app');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/data-deletion-error-modal/data-deletion-error-modal.tsx',
      },
    ],
    [
      6018,
      { './data-deletion-error-modal': 6017 },
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
                var a,
                  r = (a = e('./data-deletion-error-modal')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/data-deletion-error-modal/index.ts' },
    ],
    [
      6019,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useCopyToClipboard': 6973,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../ui/tooltip': 6818,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = d(e('react')),
                  r = d(e('prop-types')),
                  o = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../hooks/useCopyToClipboard'),
                  s = d(e('../../../ui/tooltip')),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../helpers/utils/util'),
                  u = e('../../../component-library');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const p = ({ tokenAddress: e }) => {
                  const t = (0, o.useI18nContext)(),
                    [n, r] = (0, i.useCopyToClipboard)();
                  return a.default.createElement(
                    u.Box,
                    { display: l.Display.InlineFlex, className: 'detected-token-address' },
                    a.default.createElement(
                      u.Text,
                      { color: l.TextColor.textDefault },
                      `${t('tokenAddress')}:`
                    ),
                    a.default.createElement(
                      s.default,
                      { position: 'bottom', title: t(n ? 'copiedExclamation' : 'copyToClipboard') },
                      a.default.createElement(
                        u.ButtonLink,
                        {
                          className: 'detected-token-address__copy-link',
                          onClick: () => {
                            r(e);
                          },
                          endIconName: u.IconName.Copy,
                          marginLeft: 2,
                          marginRight: 2,
                        },
                        (0, c.shortenAddress)(e)
                      )
                    )
                  );
                };
                p.propTypes = { tokenAddress: r.default.string };
                n.default = p;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/detected-token/detected-token-address/detected-token-address.js',
      },
    ],
    [
      6020,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../component-library');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const u = ({ aggregators: e }) => {
                  const t = (0, i.useI18nContext)(),
                    n = parseInt(e.length, 10) - 2,
                    [a, o] = (0, r.useState)(!1);
                  return r.default.createElement(
                    l.Box,
                    { display: s.Display.InlineFlex, className: 'detected-token-aggregators' },
                    r.default.createElement(
                      l.Text,
                      { variant: s.TextVariant.bodySm, as: 'h6', fontWeight: s.FontWeight.Normal },
                      t('fromTokenLists', [
                        n > 0 && !a
                          ? r.default.createElement(
                              l.Text,
                              {
                                as: 'h6',
                                fontWeight: s.FontWeight.Normal,
                                key: 'detected-token-aggrgators-with-more',
                              },
                              `${e.slice(0, 2).join(', ')}`,
                              r.default.createElement(
                                l.ButtonLink,
                                {
                                  className: 'detected-token-aggregators__link',
                                  onClick: () => o(!0),
                                  key: 'detected-token-aggrgators-link',
                                },
                                t('plusXMore', [n])
                              )
                            )
                          : r.default.createElement(
                              l.Text,
                              {
                                as: 'h6',
                                fontWeight: s.FontWeight.Normal,
                                key: 'detected-token-aggrgators-without-more',
                              },
                              `${e.join(', ')}.`
                            ),
                      ])
                    )
                  );
                };
                u.propTypes = { aggregators: o.default.array.isRequired };
                n.default = u;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/detected-token/detected-token-aggregators/detected-token-aggregators.js',
      },
    ],
    [
      6021,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../detected-token-address/detected-token-address': 6019,
        '../detected-token-aggregators/detected-token-aggregators': 6020,
        '../detected-token-values/detected-token-values': 6024,
        'prop-types': 5082,
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
                var a = f(e('react')),
                  r = f(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../component-library'),
                  s = f(e('../detected-token-values/detected-token-values')),
                  l = f(e('../detected-token-address/detected-token-address')),
                  c = f(e('../detected-token-aggregators/detected-token-aggregators')),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../../selectors'),
                  p = e('../../../../../shared/constants/network');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const m = ({
                  token: e,
                  handleTokenSelection: t,
                  tokensListDetected: n,
                  chainId: r,
                }) => {
                  var f;
                  const m = (0, o.useSelector)(d.getTokenList)[
                      null === (f = e.address) || void 0 === f ? void 0 : f.toLowerCase()
                    ],
                    h = (0, o.useSelector)(d.getTestNetworkBackgroundColor),
                    g = (0, o.useSelector)(d.getCurrentNetwork);
                  return a.default.createElement(
                    i.Box,
                    {
                      display: u.Display.Flex,
                      className: 'detected-token-details',
                      marginBottom: 4,
                    },
                    a.default.createElement(
                      i.BadgeWrapper,
                      {
                        badge: a.default.createElement(i.AvatarNetwork, {
                          size: i.AvatarNetworkSize.Xs,
                          src: p.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[r],
                          name: (null == g ? void 0 : g.nickname) || '',
                          backgroundColor: h,
                          borderWidth: 2,
                        }),
                        marginRight: 2,
                        className: 'detected-token-details__identicon',
                      },
                      a.default.createElement(i.AvatarToken, {
                        name: e.symbol,
                        src: e.image,
                        size: i.AvatarTokenSize.Md,
                      })
                    ),
                    a.default.createElement(
                      i.Box,
                      {
                        display: u.Display.Grid,
                        marginLeft: 2,
                        className: 'detected-token-details__data',
                      },
                      a.default.createElement(s.default, {
                        token: e,
                        handleTokenSelection: t,
                        tokensListDetected: n,
                      }),
                      a.default.createElement(l.default, { tokenAddress: e.address }),
                      (null == m ? void 0 : m.aggregators.length) > 0 &&
                        a.default.createElement(c.default, {
                          aggregators: null == m ? void 0 : m.aggregators,
                        })
                    )
                  );
                };
                m.propTypes = {
                  token: r.default.shape({
                    address: r.default.string.isRequired,
                    decimals: r.default.number,
                    symbol: r.default.string,
                    iconUrl: r.default.string,
                    aggregators: r.default.array,
                    image: r.default.string,
                  }),
                  handleTokenSelection: r.default.func.isRequired,
                  tokensListDetected: r.default.object,
                  chainId: r.default.string,
                };
                n.default = m;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/detected-token/detected-token-details/detected-token-details.js',
      },
    ],
    [
      6022,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../component-library/modal-content/deprecated': 6412,
        '../../../component-library/modal-header/deprecated': 6421,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = d(e('react')),
                  r = d(e('prop-types')),
                  o = d(e('classnames')),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../component-library'),
                  c = e('../../../component-library/modal-content/deprecated'),
                  u = e('../../../component-library/modal-header/deprecated');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const p = ({
                  partiallyIgnoreDetectedTokens: e,
                  onCancelIgnore: t,
                  handleClearTokensSelection: n,
                  isOpen: r,
                }) => {
                  const d = (0, i.useI18nContext)();
                  return a.default.createElement(
                    l.Modal,
                    {
                      isOpen: r,
                      className: (0, o.default)('detected-token-ignored-popover', {
                        'detected-token-ignored-popover--import': e,
                        'detected-token-ignored-popover--ignore': !e,
                      }),
                      onClose: t,
                      autoFocus: !1,
                    },
                    a.default.createElement(l.ModalOverlay, null),
                    a.default.createElement(
                      c.ModalContent,
                      null,
                      a.default.createElement(
                        u.ModalHeader,
                        { marginBottom: 4 },
                        d(e ? 'importSelectedTokens' : 'areYouSure')
                      ),
                      a.default.createElement(
                        l.Text,
                        { marginBottom: 4 },
                        d(e ? 'importSelectedTokensDescription' : 'ignoreTokenWarning')
                      ),
                      a.default.createElement(
                        l.Box,
                        {
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.center,
                          gap: 4,
                        },
                        a.default.createElement(
                          l.Button,
                          {
                            className: 'detected-token-ignored-popover__ignore-button',
                            block: !0,
                            variant: l.BUTTON_VARIANT.SECONDARY,
                            onClick: t,
                            size: l.BUTTON_SIZES.LG,
                          },
                          d('cancel')
                        ),
                        a.default.createElement(
                          l.Button,
                          {
                            className: 'detected-token-ignored-popover__import-button',
                            block: !0,
                            variant: l.BUTTON_VARIANT.PRIMARY,
                            onClick: n,
                            size: l.BUTTON_SIZES.LG,
                            'data-testid': 'detected-token-ignored-popover-confirm-button',
                          },
                          d('confirm')
                        )
                      )
                    )
                  );
                };
                p.propTypes = {
                  partiallyIgnoreDetectedTokens: r.default.bool.isRequired,
                  onCancelIgnore: r.default.func.isRequired,
                  handleClearTokensSelection: r.default.func.isRequired,
                  isOpen: r.default.bool.isRequired,
                };
                n.default = p;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/detected-token/detected-token-ignored-popover/detected-token-ignored-popover.js',
      },
    ],
    [
      6023,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/lib/trace': 5849,
        '../../../../contexts/metametrics': 6836,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../ui/box': 6703,
        '../../../ui/button': 6707,
        '../../../ui/popover': 6789,
        '../detected-token-details/detected-token-details': 6021,
        'prop-types': 5082,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = h(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../contexts/metametrics'),
                  l = e('../../../../../shared/constants/metametrics'),
                  c = e('../../../../selectors'),
                  u = h(e('../../../ui/popover')),
                  d = h(e('../../../ui/box')),
                  p = h(e('../../../ui/button')),
                  f = h(e('../detected-token-details/detected-token-details')),
                  m = e('../../../../../shared/lib/trace');
                function h(e) {
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
                const y = ({
                  tokensListDetected: e,
                  handleTokenSelection: t,
                  onImport: n,
                  onIgnoreAll: r,
                  setShowDetectedTokens: h,
                  sortingBasedOnTokenSelection: g,
                }) => {
                  const y = (0, i.useI18nContext)(),
                    b = (0, a.useContext)(s.MetaMetricsContext),
                    v = (0, o.useSelector)(c.getDetectedTokensInCurrentNetwork),
                    k = (0, o.useSelector)(c.getIsTokenNetworkFilterEqualCurrentNetwork),
                    _ = (0, o.useSelector)(c.getCurrentNetwork),
                    x = (0, o.useSelector)(c.getAllDetectedTokensForSelectedAddress),
                    w = (0, a.useMemo)(
                      () => (k ? v.length : Object.values(x).reduce((e, t) => e + t.length, 0)),
                      [x, v, k]
                    ),
                    { selected: M = [] } = g(e),
                    T = a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        p.default,
                        {
                          className: 'detected-token-selection-popover__ignore-button',
                          type: 'secondary',
                          onClick: () => r(),
                        },
                        y('ignoreAll')
                      ),
                      a.default.createElement(
                        p.default,
                        {
                          className: 'detected-token-selection-popover__import-button',
                          type: 'primary',
                          onClick: () => {
                            (0, m.endTrace)({ name: m.TraceName.AccountOverviewAssetListTab }),
                              (0, m.trace)({ name: m.TraceName.AccountOverviewAssetListTab }),
                              n();
                          },
                          disabled: 0 === M.length,
                        },
                        y('importWithCount', [`(${M.length})`])
                      )
                    );
                  return a.default.createElement(
                    u.default,
                    {
                      className: 'detected-token-selection-popover',
                      title: 1 === w ? y('tokenFoundTitle') : y('tokensFoundTitle', [w]),
                      onClose: () => {
                        const e = Object.keys(x);
                        h(!1);
                        const t = v.map(({ address: e, symbol: t }) => `${t} - ${e}`);
                        b({
                          event: l.MetaMetricsEventName.TokenImportCanceled,
                          category: l.MetaMetricsEventCategory.Wallet,
                          properties: {
                            source_connection_method: l.MetaMetricsTokenEventSource.Detected,
                            tokens: t,
                            chain_ids: e,
                          },
                        });
                      },
                      footer: T,
                    },
                    k
                      ? a.default.createElement(
                          d.default,
                          { margin: 3 },
                          v.map((n, r) =>
                            a.default.createElement(f.default, {
                              key: r,
                              token: n,
                              handleTokenSelection: t,
                              tokensListDetected: e,
                              chainId: _.chainId,
                            })
                          )
                        )
                      : a.default.createElement(
                          d.default,
                          { margin: 3 },
                          Object.entries(x).map(([n, r]) =>
                            r.map((r, o) =>
                              a.default.createElement(f.default, {
                                key: `${n}-${o}`,
                                token: r,
                                chainId: n,
                                handleTokenSelection: t,
                                tokensListDetected: e,
                              })
                            )
                          )
                        )
                  );
                };
                y.propTypes = {
                  tokensListDetected: r.default.object,
                  handleTokenSelection: r.default.func.isRequired,
                  onIgnoreAll: r.default.func.isRequired,
                  onImport: r.default.func.isRequired,
                  setShowDetectedTokens: r.default.func.isRequired,
                  sortingBasedOnTokenSelection: r.default.func.isRequired,
                };
                n.default = y;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/detected-token/detected-token-selection-popover/detected-token-selection-popover.js',
      },
    ],
    [
      6024,
      {
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useTokenBalances': 7010,
        '../../../../hooks/useTokenFiatAmount': 7014,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        'prop-types': 5082,
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
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('react-redux'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../hooks/useTokenFiatAmount'),
                  c = e('../../../../../shared/modules/selectors/networks'),
                  u = e('../../../../selectors'),
                  d = e('../../../component-library'),
                  p = e('../../../../hooks/useTokenBalances');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const m = ({ token: e, handleTokenSelection: t, tokensListDetected: n }) => {
                  var a;
                  const [o, f] = (0, r.useState)(() => {
                      var t;
                      return null === (t = n[e.address]) || void 0 === t ? void 0 : t.selected;
                    }),
                    m = (0, i.useSelector)(u.getSelectedAddress),
                    h = (0, i.useSelector)(c.getCurrentChainId),
                    g = e.chainId ?? h,
                    { tokensWithBalances: y } = (0, p.useTokenTracker)({
                      chainId: g,
                      tokens: [e],
                      address: m,
                      hideZeroBalanceTokens: !1,
                    }),
                    b = null === (a = y[0]) || void 0 === a ? void 0 : a.string,
                    v = (0, l.useTokenFiatAmount)(e.address, b, e.symbol, {}, !1, g),
                    k = (0, i.useSelector)(u.getUseCurrencyRateCheck);
                  (0, r.useEffect)(() => {
                    var t;
                    f(null === (t = n[e.address]) || void 0 === t ? void 0 : t.selected);
                  }, [n, e.address, o, f]);
                  return r.default.createElement(
                    d.Box,
                    { display: s.Display.InlineFlex, className: 'detected-token-values' },
                    r.default.createElement(
                      d.Box,
                      { marginBottom: 1 },
                      r.default.createElement(
                        d.Text,
                        { variant: s.TextVariant.bodyLgMedium, as: 'h4' },
                        `${b || '0'} ${e.symbol}`
                      ),
                      r.default.createElement(
                        d.Text,
                        {
                          variant: s.TextVariant.bodySm,
                          as: 'h6',
                          color: s.TextColor.textAlternative,
                        },
                        k ? v || '$0' : v
                      )
                    ),
                    r.default.createElement(
                      d.Box,
                      { className: 'detected-token-values__checkbox' },
                      r.default.createElement(d.Checkbox, {
                        isChecked: o,
                        onClick: () => {
                          f(!o), t(e);
                        },
                      })
                    )
                  );
                };
                m.propTypes = {
                  token: o.default.shape({
                    address: o.default.string.isRequired,
                    decimals: o.default.number,
                    symbol: o.default.string,
                    iconUrl: o.default.string,
                    aggregators: o.default.array,
                    chainId: o.default.string,
                  }),
                  handleTokenSelection: o.default.func.isRequired,
                  tokensListDetected: o.default.object,
                };
                n.default = m;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/detected-token/detected-token-values/detected-token-values.js',
      },
    ],
    [
      6025,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './detected-token-ignored-popover/detected-token-ignored-popover': 6022,
        './detected-token-selection-popover/detected-token-selection-popover': 6023,
        lodash: 4921,
        'prop-types': 5082,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = h(e('prop-types')),
                  o = e('react-redux'),
                  i = e('lodash'),
                  s = e('../../../store/actions'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../selectors'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../../shared/constants/transaction'),
                  p = e('../../../../shared/constants/metametrics'),
                  f = h(e('./detected-token-selection-popover/detected-token-selection-popover')),
                  m = h(e('./detected-token-ignored-popover/detected-token-ignored-popover'));
                function h(e) {
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
                const y = e =>
                    (0, i.chain)(e)
                      .values()
                      .groupBy(e => (e.selected ? 'selected' : 'deselected'))
                      .mapValues(e =>
                        e.map(({ token: e }) => {
                          const {
                            address: t,
                            symbol: n,
                            decimals: a,
                            aggregators: r,
                            chainId: o,
                          } = e;
                          return { address: t, symbol: n, decimals: a, aggregators: r, chainId: o };
                        })
                      )
                      .value(),
                  b = ({ setShowDetectedTokens: e }) => {
                    const t = (0, o.useDispatch)(),
                      n = (0, a.useContext)(u.MetaMetricsContext),
                      r = (0, o.useSelector)(c.getDetectedTokensInCurrentNetwork),
                      i = (0, o.useSelector)(l.getSelectedNetworkClientId),
                      h = (0, o.useSelector)(c.getAllDetectedTokensForSelectedAddress),
                      g = (0, o.useSelector)(l.getCurrentChainId),
                      b = (0, o.useSelector)(l.getNetworkConfigurationsByChainId),
                      v = (0, o.useSelector)(c.getIsTokenNetworkFilterEqualCurrentNetwork),
                      k = (0, a.useMemo)(
                        () => (v ? r.length : Object.values(h).flat().length),
                        [r, h, v]
                      ),
                      [_, x] = (0, a.useState)({});
                    (0, a.useEffect)(() => {
                      x(
                        v
                          ? r.reduce((e, t) => {
                              var n;
                              return (
                                (e[t.address] = {
                                  token: t,
                                  selected:
                                    (null === (n = _[t.address]) || void 0 === n
                                      ? void 0
                                      : n.selected) ?? !0,
                                  chainId: g,
                                }),
                                e
                              );
                            }, {})
                          : Object.entries(h).reduce(
                              (e, [t, n]) => (
                                Array.isArray(n) &&
                                  n.forEach(n => {
                                    var a;
                                    e[n.address] = {
                                      token: { ...n, chainId: t },
                                      selected:
                                        (null === (a = _[n.address]) || void 0 === a
                                          ? void 0
                                          : a.selected) ?? !0,
                                    };
                                  }),
                                e
                              ),
                              {}
                            )
                      );
                    }, [v, h, r, g]);
                    const [w, M] = (0, a.useState)(!1),
                      [T, E] = (0, a.useState)(!1),
                      C = async e => {
                        if (
                          (e.forEach(e => {
                            n({
                              event: p.MetaMetricsEventName.TokenAdded,
                              category: p.MetaMetricsEventCategory.Wallet,
                              sensitiveProperties: {
                                token_symbol: e.symbol,
                                token_contract_address: e.address,
                                token_decimal_precision: e.decimals,
                                source: p.MetaMetricsTokenEventSource.Detected,
                                token_standard: d.TokenStandard.ERC20,
                                asset_type: d.AssetType.token,
                                token_added_type: 'detected',
                                chain_id: e.chainId,
                              },
                            });
                          }),
                          v)
                        ) {
                          await t((0, s.addImportedTokens)(e, i));
                          const n = e.map(({ symbol: e }) => e);
                          t((0, s.setNewTokensImported)(n.join(', ')));
                        } else {
                          const n = e.reduce((e, t) => {
                              const { chainId: n } = t;
                              return e[n] || (e[n] = { tokens: [] }), e[n].tokens.push(t), e;
                            }, {}),
                            a = Object.entries(n).map(async ([e, { tokens: n }]) => {
                              const a = b[e],
                                { defaultRpcEndpointIndex: r } = a,
                                { networkClientId: o } = a.rpcEndpoints[r];
                              await t((0, s.addImportedTokens)(n, o));
                              const i = n.map(({ symbol: e }) => e);
                              t((0, s.setNewTokensImported)(i.join(', ')));
                            });
                          await Promise.all(a);
                        }
                      };
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      w &&
                        a.default.createElement(m.default, {
                          isOpen: !0,
                          onCancelIgnore: () => {
                            M(!1), E(!1);
                          },
                          handleClearTokensSelection: async () => {
                            const { selected: a = [], deselected: r = [] } = y(_);
                            r.length < k && (await C(a));
                            const o = r.map(({ symbol: e, address: t }) => `${e} - ${t}`);
                            if (
                              (n({
                                event: p.MetaMetricsEventName.TokenHidden,
                                category: p.MetaMetricsEventCategory.Wallet,
                                sensitiveProperties: {
                                  tokens: o,
                                  location: p.MetaMetricsEventLocation.TokenDetection,
                                  token_standard: d.TokenStandard.ERC20,
                                  asset_type: d.AssetType.token,
                                },
                              }),
                              v)
                            ) {
                              const n = r.map(({ address: e }) => e);
                              await t(
                                (0, s.ignoreTokens)({
                                  tokensToIgnore: n,
                                  dontShowLoadingIndicator: !0,
                                })
                              ),
                                e(!1),
                                E(!1);
                            } else {
                              const n = r.reduce((e, t) => {
                                  const { chainId: n } = t;
                                  return e[n] || (e[n] = []), e[n].push(t), e;
                                }, {}),
                                a = Object.entries(n).map(async ([e, n]) => {
                                  const { defaultRpcEndpointIndex: a, rpcEndpoints: r } = b[e],
                                    o = r[a].networkClientId,
                                    i = n.map(e => e.address);
                                  await t(
                                    (0, s.ignoreTokens)({
                                      tokensToIgnore: i,
                                      dontShowLoadingIndicator: !0,
                                      networkClientId: o,
                                    })
                                  );
                                });
                              await Promise.all(a), e(!1), E(!1);
                            }
                          },
                          partiallyIgnoreDetectedTokens: T,
                        }),
                      k > 0 &&
                        a.default.createElement(f.default, {
                          detectedTokens: h,
                          tokensListDetected: _,
                          handleTokenSelection: e => {
                            x(t => ({
                              ...t,
                              [e.address]: { ...t[e.address], selected: !t[e.address].selected },
                            }));
                          },
                          onImport: async () => {
                            const { selected: t = [] } = y(_);
                            t.length < k ? (M(!0), E(!0)) : (await C(t), e(!1));
                          },
                          onIgnoreAll: () => {
                            const e = { ..._ };
                            for (const t of Object.keys(_)) e[t].selected = !1;
                            x(e), M(!0);
                          },
                          setShowDetectedTokens: e,
                          sortingBasedOnTokenSelection: y,
                        })
                    );
                  };
                b.propTypes = { setShowDetectedTokens: r.default.func.isRequired };
                n.default = b;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/detected-token/detected-token.js' },
    ],
    [
      6026,
      {
        '../../../../contexts/i18n': 6832,
        '../../../ui/button': 6707,
        'prop-types': 5082,
        react: 5328,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = f);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-router-dom'),
                  o = l(e('prop-types')),
                  i = e('../../../../contexts/i18n'),
                  s = l(e('../../../ui/button'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e) {
                  return e
                    .split('\n')
                    .map((e, t) =>
                      a.default.createElement(
                        a.Fragment,
                        { key: t },
                        e,
                        a.default.createElement('br', null)
                      )
                    );
                }
                const d = u(
                    'MMm*mmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmm*mMM\nMM*./***mMMMMMMMMMMMMMMMMMMMMMMMMMMm***/.*MM\nMM/...///*mMMMMMMMMMMMMMMMMMMMMMMm*///.../MM\nMm.....//../*mMMMMMMMMMMMMMMMMm*/..//.....mM\nM*....../*....*mMMMMMMMMMMMMm*....*/......*M\nM/........*.....*//////////*...../......../M\nm..........*/...//........//.../*..........m\nM/..........//.../......../...//........../M\nM/.........../*/./.......//./*/.........../M\nM*.............////......////.............*M\nMm...............**......**...............mM\nMm/...............*/..../*.............../mM\nMM/............../*/..../*/............../MM\nMm..............//./...././/..............mM\nMM*............*/../..../../*............*MM\nMM/........../*..../..../....*/........../MM\nMMm.........//...../..../.....//.........mMM\nMMm......//**....../..../......**//......mMM\nMMM/..////.*......./..../......././///../MMM\nMMMm*//..../......./..../......./....//*mMMM\nMMMm......*////////*....*////////*......mMMM\nMMM*......*////////*....*////////*......*MMM\nMMM/....../*......./..../.......*/....../MMM\nMMm........**/./m*./..../.**/..**........mMM\nMM*........//*mMMM///..///mMMm*//........*MM\nMM/........././*mM*//..//*Mm*/./........./MM\nMm..........//.../**/../**/...//..........mM\nM*...........*..../*/../*/..../...........*M\nM*///////////*/.../m/../m/.../*///////////*M\nM*.........../*/...m/../m.../*/...........*M\nMm.........../..//.*....*./*../...........mM\nMM/........../...//******//.../........../MM\nMM*........../....*MMMMMM*..../..........*MM\nMMm........../....*MMMMMM*..../..........mMM\nMMm/........//....*MMMMMM*....//......../mMM\nMMM/....../*mm*...*mmmmmm*...*mm*/....../MMM\nMMM*../*mmMMMMMm///......//*mMMMMMmm*/..*MMM\nMMMm*mMMMMMMMMMMm**......**mMMMMMMMMMMm*mMMM\nMMMMMMMMMMMMMMMMMm/....../mMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMmmmmmmmmMMMMMMMMMMMMMMMMMM'
                  ),
                  p = u(
                    '█▀▀ ▄▀█ █░█ ▀█▀ █ █▀█ █▄░█ ▀  \n  █▄▄ █▀█ █▄█ ░█░ █ █▄█ █░▀█ ▄  \n  \n  █▀▀ ▀▄▀ █▀█ █▀▀ █▀█ █ █▀▄▀█ █▀▀ █▄░█ ▀█▀ ▄▀█ █░░  \n  ██▄ █░█ █▀▀ ██▄ █▀▄ █ █░▀░█ ██▄ █░▀█ ░█░ █▀█ █▄▄  \n  \n  █▀ █▀█ █▀▀ ▀█▀ █░█░█ ▄▀█ █▀█ █▀▀\n  ▄█ █▄█ █▀░ ░█░ ▀▄▀▄▀ █▀█ █▀▄ ██▄'
                  );
                function f({ redirectTo: e }) {
                  const t = (0, a.useContext)(i.I18nContext),
                    n = (0, r.useHistory)();
                  return a.default.createElement(
                    'div',
                    { className: 'experimental-area', 'data-testid': 'experimental-area' },
                    a.default.createElement('div', { className: 'logo' }, d),
                    a.default.createElement('div', { className: 'experimental-text' }, p),
                    a.default.createElement(
                      'div',
                      { className: 'text' },
                      a.default.createElement(
                        'p',
                        null,
                        t('flaskWelcomeWarning1', [
                          a.default.createElement(
                            'b',
                            { key: 'doNotUse' },
                            t('flaskWelcomeUninstall')
                          ),
                        ])
                      ),
                      a.default.createElement('br', null),
                      a.default.createElement('p', null, t('flaskWelcomeWarning2')),
                      a.default.createElement('br', null),
                      a.default.createElement('p', null, t('flaskWelcomeWarning3')),
                      a.default.createElement('br', null),
                      a.default.createElement('p', null, t('flaskWelcomeWarning4'))
                    ),
                    a.default.createElement(
                      s.default,
                      {
                        type: 'primary',
                        onClick: () => {
                          n.push(e);
                        },
                      },
                      t('flaskWelcomeWarningAcceptButton')
                    )
                  );
                }
                f.propTypes = { redirectTo: o.default.string };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/flask/experimental-area/experimental-area.js' },
    ],
    [
      6027,
      { './experimental-area': 6026 },
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
                var a,
                  r = (a = e('./experimental-area')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/flask/experimental-area/index.js' },
    ],
    [
      6028,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = h);
                var a = p(e('classnames')),
                  r = p(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  i = e('../../../../shared/constants/metametrics'),
                  s = e('../../../contexts/i18n'),
                  l = e('../../../contexts/metametrics'),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../component-library');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const f = 14,
                  m = f - 1;
                function h({ buttonText: e, onLongPressed: t }) {
                  const n = (0, o.useContext)(s.I18nContext),
                    r = (0, o.useRef)(!1),
                    [d, p] = (0, o.useState)(!1),
                    [h, g] = (0, o.useState)(!1),
                    y = (0, o.useContext)(l.MetaMetricsContext),
                    b = e => {
                      e.stopPropagation();
                    },
                    v = () => {
                      r.current && p(!0);
                    },
                    k = (0, o.useCallback)(
                      e => {
                        y({
                          category: i.MetaMetricsEventCategory.Keys,
                          event: i.MetaMetricsEventName.SrpHoldToRevealCompleted,
                          properties: { key_type: i.MetaMetricsEventKeyType.Srp },
                        }),
                          y({
                            category: i.MetaMetricsEventCategory.Keys,
                            event: i.MetaMetricsEventName.SrpRevealViewed,
                            properties: { key_type: i.MetaMetricsEventKeyType.Srp },
                          }),
                          t(),
                          g(!0),
                          b(e);
                      },
                      [t, y]
                    ),
                    _ = () => {
                      p(!1), g(!1);
                    },
                    x = (0, o.useCallback)(
                      () =>
                        o.default.createElement(
                          u.Box,
                          {
                            className: (0, a.default)('hold-to-reveal-button__absolute-fill', {
                              'hold-to-reveal-button__absolute-fill': d,
                              'hold-to-reveal-button__main-icon-show': h,
                            }),
                          },
                          o.default.createElement(
                            u.Box,
                            { className: 'hold-to-reveal-button__absolute-fill' },
                            o.default.createElement(
                              'svg',
                              { className: 'hold-to-reveal-button__circle-svg' },
                              o.default.createElement('circle', {
                                className: 'hold-to-reveal-button__circle-background',
                                cx: f,
                                cy: f,
                                r: m,
                              })
                            )
                          ),
                          o.default.createElement(
                            u.Box,
                            { className: 'hold-to-reveal-button__absolute-fill' },
                            o.default.createElement(
                              'svg',
                              { className: 'hold-to-reveal-button__circle-svg' },
                              o.default.createElement('circle', {
                                'aria-label': n('holdToRevealLockedLabel'),
                                onTransitionEnd: v,
                                className: 'hold-to-reveal-button__circle-foreground',
                                cx: f,
                                cy: f,
                                r: m,
                              })
                            )
                          ),
                          o.default.createElement(
                            u.Box,
                            {
                              display: c.Display.Flex,
                              alignItems: c.AlignItems.center,
                              justifyContent: c.JustifyContent.center,
                              className: 'hold-to-reveal-button__lock-icon-container',
                            },
                            o.default.createElement('img', {
                              src: 'images/lock-icon.svg',
                              alt: n('padlock'),
                              className: 'hold-to-reveal-button__lock-icon',
                            })
                          )
                        ),
                      [d, h, n]
                    ),
                    w = (0, o.useCallback)(
                      () =>
                        d
                          ? o.default.createElement(
                              'div',
                              {
                                className: (0, a.default)('hold-to-reveal-button__absolute-fill', {
                                  'hold-to-reveal-button__unlock-icon-hide': h,
                                }),
                                onAnimationEnd: _,
                              },
                              o.default.createElement(
                                'div',
                                {
                                  onAnimationEnd: b,
                                  className:
                                    'hold-to-reveal-button__absolute-fill hold-to-reveal-button__circle-static-outer-container',
                                },
                                o.default.createElement(
                                  'svg',
                                  { className: 'hold-to-reveal-button__circle-svg' },
                                  o.default.createElement('circle', {
                                    className: 'hold-to-reveal-button__circle-static-outer',
                                    cx: 14,
                                    cy: 14,
                                    r: 14,
                                  })
                                )
                              ),
                              o.default.createElement(
                                'div',
                                {
                                  onAnimationEnd: b,
                                  className:
                                    'hold-to-reveal-button__absolute-fill hold-to-reveal-button__circle-static-inner-container',
                                },
                                o.default.createElement(
                                  'svg',
                                  { className: 'hold-to-reveal-button__circle-svg' },
                                  o.default.createElement('circle', {
                                    className: 'hold-to-reveal-button__circle-static-inner',
                                    cx: 14,
                                    cy: 14,
                                    r: 12,
                                  })
                                )
                              ),
                              o.default.createElement(
                                'div',
                                {
                                  'aria-label': n('holdToRevealUnlockedLabel'),
                                  className: 'hold-to-reveal-button__unlock-icon-container',
                                  onAnimationEnd: k,
                                },
                                o.default.createElement('img', {
                                  src: 'images/unlock-icon.svg',
                                  alt: n('padlock'),
                                  className: 'hold-to-reveal-button__unlock-icon',
                                })
                              )
                            )
                          : null,
                      [d, h, k, n]
                    );
                  return o.default.createElement(
                    u.Button,
                    {
                      width: c.BlockSize.Full,
                      onPointerDown: () => {
                        (r.current = !0),
                          y({
                            category: i.MetaMetricsEventCategory.Keys,
                            event: i.MetaMetricsEventName.SrpHoldToRevealClickStarted,
                            properties: { key_type: i.MetaMetricsEventKeyType.Srp },
                          });
                      },
                      onPointerUp: () => {
                        r.current = !1;
                      },
                      className: 'hold-to-reveal-button__button-hold',
                      textProps: { display: c.Display.Flex, alignItems: c.AlignItems.center },
                    },
                    o.default.createElement(
                      u.Box,
                      { className: 'hold-to-reveal-button__icon-container', marginRight: 2 },
                      x(),
                      w()
                    ),
                    e
                  );
                }
                h.propTypes = {
                  buttonText: r.default.string.isRequired,
                  onLongPressed: r.default.func.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/hold-to-reveal-button/hold-to-reveal-button.js',
      },
    ],
    [
      6029,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../../ui/button': 6707,
        '../../ui/check-box': 6713,
        '../../ui/tooltip': 6818,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = d(e('classnames')),
                  o = d(e('prop-types')),
                  i = d(e('../../ui/button')),
                  s = d(e('../../ui/check-box')),
                  l = d(e('../../ui/tooltip')),
                  c = e('../../component-library'),
                  u = e('../../../helpers/constants/design-system');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = ({
                  acceptText: e,
                  checkboxText: t,
                  checkboxTooltipText: n,
                  classNames: o = [],
                  descriptionText: d,
                  ignoreText: p,
                  infoText: f,
                  onAccept: m,
                  onIgnore: h,
                }) => {
                  const [g, y] = (0, a.useState)(!1),
                    b =
                      t &&
                      a.default.createElement(s.default, {
                        id: 'homeNotification_checkbox',
                        checked: g,
                        className: 'home-notification__checkbox',
                        onClick: () => y(e => !e),
                      });
                  return a.default.createElement(
                    'div',
                    { className: (0, r.default)('home-notification', ...o) },
                    a.default.createElement(
                      'div',
                      { className: 'home-notification__content' },
                      a.default.createElement(
                        'div',
                        { className: 'home-notification__content-container' },
                        a.default.createElement('div', { className: 'home-notification__text' }, d)
                      ),
                      f
                        ? a.default.createElement(
                            l.default,
                            {
                              position: 'top',
                              title: f,
                              wrapperClassName: 'home-notification__tooltip-wrapper',
                            },
                            a.default.createElement(c.Icon, {
                              name: c.IconName.Info,
                              color: u.IconColor.iconDefault,
                            })
                          )
                        : null
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'home-notification__buttons' },
                      m && e
                        ? a.default.createElement(
                            i.default,
                            {
                              type: 'primary',
                              className: 'home-notification__accept-button',
                              onClick: m,
                            },
                            e
                          )
                        : null,
                      h && p
                        ? a.default.createElement(
                            i.default,
                            {
                              type: 'secondary',
                              className: 'home-notification__ignore-button',
                              onClick: () => h(g),
                            },
                            p
                          )
                        : null,
                      t
                        ? a.default.createElement(
                            'div',
                            { className: 'home-notification__checkbox-wrapper' },
                            n
                              ? a.default.createElement(
                                  l.default,
                                  {
                                    position: 'top',
                                    title: n,
                                    wrapperClassName: 'home-notification__checkbox-label-tooltip',
                                  },
                                  b
                                )
                              : b,
                            a.default.createElement(
                              'label',
                              {
                                className: 'home-notification__checkbox-label',
                                htmlFor: 'homeNotification_checkbox',
                              },
                              t
                            )
                          )
                        : null
                    )
                  );
                };
                f.propTypes = {
                  acceptText: o.default.node,
                  checkboxText: o.default.node,
                  checkboxTooltipText: o.default.node,
                  classNames: o.default.array,
                  descriptionText: o.default.node.isRequired,
                  ignoreText: o.default.node,
                  infoText: o.default.node,
                  onAccept: o.default.func,
                  onIgnore: o.default.func,
                };
                n.default = f;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/home-notification/home-notification.component.js',
      },
    ],
    [
      6030,
      { './home-notification.component': 6029 },
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
                var a,
                  r = (a = e('./home-notification.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/home-notification/index.js' },
    ],
    [
      6031,
      {
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../selectors': 7601,
        '../../../../selectors/multichain': 7605,
        '../../../component-library': 6402,
        '../../assets/asset-list/network-filter': 5926,
        './network-filter-dropdown': 6032,
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
                  (n.default = n.NetworkFilterImportToken = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l =
                    (a = e('../../assets/asset-list/network-filter')) && a.__esModule
                      ? a
                      : { default: a },
                  c = e('../../../../selectors'),
                  u = e('../../../../../shared/modules/selectors/networks'),
                  d = e('../../../../selectors/multichain'),
                  p = e('./network-filter-dropdown');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function m() {
                  return (
                    (m = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    m.apply(null, arguments)
                  );
                }
                const h = ({
                  title: e,
                  buttonDataTestId: t,
                  openListNetwork: n,
                  networkFilter: a,
                  setNetworkFilter: f,
                }) => {
                  const h = (0, r.useRef)(null),
                    [g, y] = (0, r.useState)(!1),
                    b = (0, o.useSelector)(c.getIsTokenNetworkFilterEqualCurrentNetwork),
                    v = (0, o.useSelector)(c.getCurrentNetwork),
                    k = (0, d.getImageForChainId)(null == v ? void 0 : v.chainId),
                    _ = (0, o.useSelector)(u.getNetworkConfigurationsByChainId),
                    x = (0, r.useMemo)(
                      () => Object.keys(_ || {}).reduce((e, t) => ((e[t] = !0), e), {}),
                      [_]
                    ),
                    w = a ? 1 === Object.keys(a).length && a[null == v ? void 0 : v.chainId] : b;
                  return r.default.createElement(
                    s.Box,
                    null,
                    e
                      ? r.default.createElement(s.Label, { variant: i.TextVariant.bodyMdMedium }, e)
                      : null,
                    r.default.createElement(p.NetworkFilterDropdown, {
                      title: e,
                      buttonDataTestId: t,
                      isCurrentNetwork: w,
                      openListNetwork: n,
                      currentNetworkImageUrl: k ?? '',
                      allOpts: x,
                      isDropdownOpen: g,
                      setIsDropdownOpen: y,
                      dropdownRef: h,
                    }),
                    r.default.createElement(
                      s.Popover,
                      {
                        onClickOutside: () => y(!1),
                        isOpen: g,
                        position: s.PopoverPosition.BottomStart,
                        referenceElement: h.current,
                        matchWidth: !0,
                        style: { zIndex: 10, display: 'flex', flexDirection: 'column', padding: 0 },
                      },
                      r.default.createElement(
                        l.default,
                        m(
                          {
                            handleClose: () => y(!1),
                            handleFilterNetwork: e => {
                              f && f(e);
                            },
                          },
                          a && { networkFilter: a }
                        )
                      )
                    )
                  );
                };
                n.NetworkFilterImportToken = h;
                n.default = h;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/network-filter-import-token/index.tsx',
      },
    ],
    [
      6032,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../component-library': 6402,
        './network-filter-drop-down-item': 6033,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = n.NetworkFilterDropdown = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = s(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('../../../../component-library'),
                  o = e('../../../../../helpers/constants/design-system'),
                  i = e('./network-filter-drop-down-item');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const l = ({
                  title: e,
                  buttonDataTestId: t,
                  isCurrentNetwork: n,
                  openListNetwork: s,
                  currentNetworkImageUrl: l,
                  allOpts: c,
                  isDropdownOpen: u,
                  setIsDropdownOpen: d,
                  dropdownRef: p,
                }) => {
                  const f = (0, a.useCallback)(() => {
                    d(!u);
                  }, [u, d]);
                  return a.default.createElement(
                    r.Box,
                    {
                      className: 'dropdown-editor__item-dropdown',
                      display: o.Display.Flex,
                      alignItems: o.AlignItems.center,
                      justifyContent: o.JustifyContent.spaceBetween,
                      borderRadius: o.BorderRadius.LG,
                      borderColor: o.BorderColor.borderDefault,
                      borderWidth: 1,
                      paddingLeft: 4,
                      paddingRight: 1,
                      ref: p,
                    },
                    a.default.createElement(i.NetworkFilterDropdownItem, {
                      isCurrentNetwork: n,
                      openListNetwork: s,
                      currentNetworkImageUrl: l,
                      allOpts: c,
                      setDropdownOpen: f,
                    }),
                    a.default.createElement(r.ButtonIcon, {
                      marginLeft: 'auto',
                      iconName: u ? r.IconName.ArrowUp : r.IconName.ArrowDown,
                      ariaLabel: e,
                      size: r.ButtonIconSize.Md,
                      onClick: f,
                      'data-testid': t,
                    })
                  );
                };
                n.NetworkFilterDropdown = l;
                n.default = l;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/network-filter-import-token/network-filter-dropdown/index.tsx',
      },
    ],
    [
      6033,
      {
        '../../../../../../../shared/constants/network': 5804,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../selectors': 7601,
        '../../../../../component-library': 6402,
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
                  (n.NetworkFilterDropdownItem = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../../../component-library'),
                  s = e('../../../../../../helpers/constants/design-system'),
                  l = e('../../../../../../../shared/constants/network'),
                  c = e('../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../../selectors');
                n.NetworkFilterDropdownItem = ({
                  isCurrentNetwork: e,
                  openListNetwork: t,
                  currentNetworkImageUrl: n,
                  allOpts: a,
                  setDropdownOpen: d,
                }) => {
                  const p = (0, c.useI18nContext)(),
                    f = (0, o.useSelector)(u.getCurrentNetwork);
                  return e
                    ? r.default.createElement(
                        i.Box,
                        {
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.spaceBetween,
                          width: s.BlockSize.Full,
                          paddingTop: 3,
                          paddingBottom: 3,
                          gap: 3,
                          onClick: d,
                        },
                        r.default.createElement(
                          i.Box,
                          null,
                          r.default.createElement(
                            i.Text,
                            { variant: s.TextVariant.bodyMdMedium, color: s.TextColor.textDefault },
                            (null == f ? void 0 : f.nickname) ?? p('currentNetwork')
                          )
                        ),
                        r.default.createElement(
                          i.Box,
                          { display: s.Display.Flex, alignItems: s.AlignItems.flexStart },
                          r.default.createElement(i.AvatarNetwork, {
                            key: n,
                            name: n ?? '',
                            src: n ?? undefined,
                            size: i.AvatarNetworkSize.Sm,
                          })
                        )
                      )
                    : r.default.createElement(
                        i.Box,
                        {
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.spaceBetween,
                          width: s.BlockSize.Full,
                          paddingTop: 3,
                          paddingBottom: 3,
                          gap: 3,
                          onClick: d,
                        },
                        r.default.createElement(
                          i.Text,
                          { variant: s.TextVariant.bodyMdMedium, color: s.TextColor.textDefault },
                          p('popularNetworks')
                        ),
                        r.default.createElement(
                          i.Box,
                          { display: s.Display.Flex, alignItems: s.AlignItems.flexEnd, onClick: t },
                          l.FEATURED_NETWORK_CHAIN_IDS.filter(e => a[e]).map((e, t) => {
                            const n = l.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e];
                            return r.default.createElement(i.AvatarNetwork, {
                              key: n,
                              name: n,
                              src: n ?? undefined,
                              size: i.AvatarNetworkSize.Sm,
                              style: { marginLeft: 0 === t ? 0 : '-20px', zIndex: 5 - t },
                            });
                          })
                        )
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/network-filter-import-token/network-filter-dropdown/network-filter-drop-down-item/index.tsx',
      },
    ],
    [
      6034,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../selectors/multichain': 7605,
        '../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = n.NetworkSelectorCustomImport = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library'),
                  s = e('../../../../selectors/multichain');
                const l = ({ title: e, buttonDataTestId: t, chainId: n, onSelectNetwork: a }) => {
                  const l = (0, s.getImageForChainId)(n);
                  return r.default.createElement(
                    i.Box,
                    { padding: 4, onClick: a, 'data-testid': t },
                    r.default.createElement(
                      i.Box,
                      {
                        className: 'dropdown-editor__item-dropdown',
                        display: o.Display.Flex,
                        alignItems: o.AlignItems.center,
                        justifyContent: o.JustifyContent.spaceBetween,
                        borderRadius: o.BorderRadius.LG,
                        borderColor: o.BorderColor.borderDefault,
                        borderWidth: 1,
                        paddingLeft: 4,
                        paddingRight: 1,
                      },
                      r.default.createElement(
                        i.Text,
                        {
                          variant: o.TextVariant.bodyMdMedium,
                          color: o.TextColor.textAlternative,
                          paddingTop: 3,
                          paddingBottom: 3,
                        },
                        e
                      ),
                      r.default.createElement(
                        i.Box,
                        {
                          display: o.Display.Flex,
                          alignItems: o.AlignItems.center,
                          marginLeft: 'auto',
                        },
                        l
                          ? r.default.createElement(i.AvatarNetwork, {
                              key: l,
                              name: l ?? '',
                              src: l ?? undefined,
                              size: i.AvatarNetworkSize.Sm,
                            })
                          : null,
                        r.default.createElement(i.ButtonIcon, {
                          marginLeft: 'auto',
                          iconName: i.IconName.ArrowRight,
                          size: i.ButtonIconSize.Md,
                          ariaLabel: e,
                        })
                      )
                    )
                  );
                };
                n.NetworkSelectorCustomImport = l;
                n.default = l;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/network-selector-custom-import/index.tsx',
      },
    ],
    [
      6035,
      { './token-list.container': 6039 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./token-list.container')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/import-token/token-list/index.js' },
    ],
    [
      6036,
      { './token-list-placeholder.component': 6037 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r =
                    (a = e('./token-list-placeholder.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = r.default;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/token-list/token-list-placeholder/index.js',
      },
    ],
    [
      6037,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/constants/zendesk-url': 6885,
        '../../../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r,
                  o,
                  i = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = d(e('prop-types')),
                  l = d(e('../../../../../helpers/constants/zendesk-url')),
                  c = e('../../../../component-library'),
                  u = e('../../../../../helpers/constants/design-system');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                class f extends i.Component {
                  render() {
                    return i.default.createElement(
                      c.Box,
                      {
                        display: u.Display.Flex,
                        alignItems: u.AlignItems.center,
                        flexDirection: u.FlexDirection.Column,
                        textAlign: u.TextAlign.Center,
                      },
                      i.default.createElement(
                        c.Text,
                        { color: u.TextColor.textAlternative },
                        this.context.t('addAcquiredTokens')
                      ),
                      i.default.createElement(
                        c.ButtonLink,
                        { href: l.default.ADD_CUSTOM_TOKENS, externalLink: !0 },
                        this.context.t('learnMoreUpperCase')
                      )
                    );
                  }
                }
                (n.default = f),
                  (a = f),
                  (r = 'contextTypes'),
                  (o = { t: s.default.func }),
                  (r = (function (e) {
                    var t = (function (e, t) {
                      if ('object' != typeof e || !e) return e;
                      var n = e[Symbol.toPrimitive];
                      if (void 0 !== n) {
                        var a = n.call(e, t || 'default');
                        if ('object' != typeof a) return a;
                        throw new TypeError('@@toPrimitive must return a primitive value.');
                      }
                      return ('string' === t ? String : Number)(e);
                    })(e, 'string');
                    return 'symbol' == typeof t ? t : t + '';
                  })(r)) in a
                    ? Object.defineProperty(a, r, {
                        value: o,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (a[r] = o);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/token-list/token-list-placeholder/token-list-placeholder.component.js',
      },
    ],
    [
      6038,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../component-library': 6402,
        './token-list-placeholder': 6036,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = d(e('prop-types')),
                  o = d(e('classnames')),
                  i = e('../../../../helpers/utils/util'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../../shared/constants/network'),
                  u = d(e('./token-list-placeholder'));
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function f(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class m extends a.Component {
                  render() {
                    const {
                      results: e = [],
                      selectedTokens: t = {},
                      onToggleToken: n,
                      tokens: r = [],
                      allTokens: d = {},
                      accountAddress: p,
                      currentNetwork: f,
                      testNetworkBackgroundColor: m,
                      isTokenNetworkFilterEqualCurrentNetwork: h,
                    } = this.props;
                    return a.default.createElement(
                      s.Box,
                      { className: 'token-list' },
                      0 === e.length
                        ? a.default.createElement(
                            s.Box,
                            {
                              paddingLeft: 4,
                              paddingRight: 4,
                              className: 'token-list__empty-list',
                            },
                            a.default.createElement(u.default, null)
                          )
                        : a.default.createElement(
                            s.Box,
                            {
                              className: 'token-list__tokens-container',
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                            },
                            Array(Math.min(12, e.length))
                              .fill(undefined)
                              .map((u, g) => {
                                var y, b, v;
                                const { symbol: k, name: _, address: x, chainId: w } = e[g] || {};
                                let M = !1;
                                h
                                  ? ((M = (0, i.checkExistingAddresses)(x, r)),
                                    (e[g].chainId = null == f ? void 0 : f.chainId))
                                  : (M = (0, i.checkExistingAllTokens)(x, w, p, d));
                                const T = () => !M && n(e[g]);
                                return (
                                  Boolean(
                                    (null === (y = e[g]) || void 0 === y ? void 0 : y.iconUrl) ||
                                      k ||
                                      _
                                  ) &&
                                  a.default.createElement(
                                    s.Box,
                                    {
                                      key: x,
                                      display: l.Display.Flex,
                                      alignItems: l.AlignItems.center,
                                      flexDirection: l.FlexDirection.Row,
                                      flexWrap: l.FlexWrap.NoWrap,
                                      paddingLeft: 4,
                                      paddingRight: 4,
                                      paddingTop: 2,
                                      paddingBottom: 2,
                                      backgroundColor: t[x]
                                        ? l.BackgroundColor.primaryMuted
                                        : l.BackgroundColor.transparent,
                                      className: (0, o.default)('token-list__token_component', {
                                        'token-list__token_component--disabled': M,
                                      }),
                                      onClick: T,
                                    },
                                    a.default.createElement(
                                      s.Box,
                                      { display: l.Display.Flex, alignItems: l.AlignItems.center },
                                      a.default.createElement(s.Checkbox, {
                                        isChecked: t[x] || M,
                                        marginRight: 2,
                                        onClick: T,
                                      }),
                                      a.default.createElement(
                                        s.Box,
                                        null,
                                        a.default.createElement(
                                          s.BadgeWrapper,
                                          {
                                            badge: a.default.createElement(s.AvatarNetwork, {
                                              size: s.AvatarNetworkSize.Xs,
                                              name: null == f ? void 0 : f.nickname,
                                              src: h
                                                ? c.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[
                                                    null == f ? void 0 : f.chainId
                                                  ]
                                                : c.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[
                                                    null === (b = e[g]) || void 0 === b
                                                      ? void 0
                                                      : b.chainId
                                                  ],
                                              backgroundColor: m,
                                              className:
                                                'token-list__token_component__network-badge',
                                            }),
                                            marginRight: 4,
                                            marginTop: 1,
                                          },
                                          a.default.createElement(s.AvatarToken, {
                                            name: k,
                                            src:
                                              null === (v = e[g]) || void 0 === v
                                                ? void 0
                                                : v.iconUrl,
                                          })
                                        )
                                      ),
                                      a.default.createElement(
                                        s.Box,
                                        null,
                                        a.default.createElement(
                                          s.Text,
                                          {
                                            fontWeight: l.FontWeight.Medium,
                                            variant: l.TextVariant.bodyMd,
                                          },
                                          _
                                        ),
                                        a.default.createElement(
                                          s.Text,
                                          {
                                            variant: l.TextVariant.bodySm,
                                            color: l.TextColor.textAlternative,
                                          },
                                          k
                                        )
                                      )
                                    )
                                  )
                                );
                              })
                          )
                    );
                  }
                }
                (n.default = m),
                  f(m, 'contextTypes', { t: r.default.func }),
                  f(m, 'propTypes', {
                    tokens: r.default.array,
                    allTokens: r.default.object,
                    results: r.default.array,
                    selectedTokens: r.default.object,
                    onToggleToken: r.default.func,
                    currentNetwork: r.default.object,
                    testNetworkBackgroundColor: r.default.object,
                    isTokenNetworkFilterEqualCurrentNetwork: r.default.bool,
                    accountAddress: r.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/token-list/token-list.component.js',
      },
    ],
    [
      6039,
      { '../../../../selectors': 7601, './token-list.component': 6038, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = e('react-redux'),
                  o = e('../../../../selectors'),
                  i = (a = e('./token-list.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.connect)(e => {
                  const { tokens: t } = e.metamask,
                    { allTokens: n } = e.metamask,
                    { address: a } = (0, o.getSelectedInternalAccount)(e);
                  return { tokens: t, allTokens: n, accountAddress: a };
                })(i.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/token-list/token-list.container.js',
      },
    ],
    [
      6040,
      { './token-search.component': 6041 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./token-search.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/import-token/token-search/index.js' },
    ],
    [
      6041,
      {
        '../../../../../shared/modules/string-utils': 5878,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library/text-field-search/deprecated': 6454,
        'fuse.js': 4545,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = g);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = p(e('prop-types')),
                  i = p(e('fuse.js')),
                  s = e('../../../../../shared/modules/string-utils'),
                  l = e('../../../component-library/text-field-search/deprecated'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../hooks/useI18nContext'),
                  d = e('../../../../selectors');
                function p(e) {
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
                const m = (e = {}) => Object.values(e),
                  h = e =>
                    new i.default(m(e), {
                      shouldSort: !0,
                      threshold: 0.45,
                      location: 0,
                      distance: 100,
                      maxPatternLength: 32,
                      minMatchCharLength: 1,
                      keys: [
                        { name: 'name', weight: 0.5 },
                        { name: 'symbol', weight: 0.5 },
                      ],
                    });
                function g({
                  onSearch: e,
                  error: t,
                  tokenList: n,
                  searchClassName: o,
                  networkFilter: i,
                  setSearchResults: p,
                }) {
                  const f = (0, u.useI18nContext)(),
                    g = 1 === Object.keys(i).length,
                    { chainId: y } = (0, r.useSelector)(d.getCurrentNetwork),
                    b = (0, a.useMemo)(() => {
                      var e;
                      return g
                        ? null == n || null === (e = n[y]) || void 0 === e
                          ? void 0
                          : e.data
                        : Object.entries(n).flatMap(([e, { data: t }]) =>
                            Object.values(t).map(t => ({ ...t, chainId: e }))
                          );
                    }, [n, g, y]),
                    [v, k] = (0, a.useState)(''),
                    [_, x] = (0, a.useState)(h(b));
                  (0, a.useEffect)(() => {
                    x(h(b));
                  }, [b]);
                  const w = () => {
                    k(''), p([]);
                  };
                  return (
                    (0, a.useEffect)(() => {
                      w();
                    }, [g]),
                    a.default.createElement(l.TextFieldSearch, {
                      className: o,
                      placeholder: f('searchTokens'),
                      value: v,
                      onChange: t =>
                        (t => {
                          k(t);
                          const n = _.search(t),
                            a = [
                              ...m(b).filter(
                                e => e.address && t && (0, s.isEqualCaseInsensitive)(e.address, t)
                              ),
                              ...n,
                            ];
                          e({ newSearchQuery: t, results: a });
                        })(t.target.value),
                      error: t,
                      autoFocus: !0,
                      autoComplete: !1,
                      width: c.BlockSize.Full,
                      clearButtonOnClick: w,
                      clearButtonProps: { size: c.Size.LG },
                    })
                  );
                }
                g.propTypes = {
                  onSearch: o.default.func.isRequired,
                  error: o.default.object,
                  tokenList: o.default.object.isRequired,
                  searchClassName: o.default.string.isRequired,
                  networkFilter: o.default.object.isRequired,
                  setSearchResults: o.default.func.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/import-token/token-search/token-search.component.js',
      },
    ],
    [
      6042,
      { './loading-network-screen.container': 6044 },
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
                var a,
                  r =
                    (a = e('./loading-network-screen.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/loading-network-screen/index.js' },
    ],
    [
      6043,
      {
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/time': 5817,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../../ui/box/box': 6702,
        '../../ui/loading-screen': 6765,
        '../../ui/popover/popover.component': 6790,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = p(e('prop-types')),
                  o = p(e('../../ui/loading-screen')),
                  i = e('../../../../shared/constants/time'),
                  s = e('../../../../shared/constants/network'),
                  l = p(e('../../ui/popover/popover.component')),
                  c = e('../../component-library'),
                  u = e('../../../helpers/constants/design-system'),
                  d = p(e('../../ui/box/box'));
                function p(e) {
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
                function m(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class h extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      m(this, 'state', { showErrorScreen: !1 }),
                      m(this, 'componentDidMount', () => {
                        this.cancelCallTimeout = setTimeout(
                          this.cancelCall,
                          this.props.cancelTime || 15 * i.SECOND
                        );
                      }),
                      m(this, 'getConnectingLabel', function (e) {
                        if (e) return e;
                        const { providerConfig: t, providerId: n } = this.props,
                          a = t.type,
                          { t: r } = this.context;
                        if (s.DEPRECATED_NETWORKS.includes(t.chainId)) {
                          return r('connectingToDeprecatedNetwork', [t.nickname || t.type]);
                        }
                        switch (a) {
                          case s.NETWORK_TYPES.MAINNET:
                            return r('connectingToMainnet');
                          case s.NETWORK_TYPES.GOERLI:
                            return r('connectingToGoerli');
                          case s.NETWORK_TYPES.SEPOLIA:
                            return r('connectingToSepolia');
                          case s.NETWORK_TYPES.LINEA_GOERLI:
                            return r('connectingToLineaGoerli');
                          case s.NETWORK_TYPES.LINEA_SEPOLIA:
                            return r('connectingToLineaSepolia');
                          case s.NETWORK_TYPES.LINEA_MAINNET:
                            return r('connectingToLineaMainnet');
                          default:
                            return r('connectingTo', [n]);
                        }
                      }),
                      m(this, 'renderConnectionFailureNotification', (e, t = !1) => {
                        const {
                          showNetworkDropdown: n,
                          setProviderArgs: r,
                          setActiveNetwork: o,
                        } = this.props;
                        return a.default.createElement(
                          l.default,
                          {
                            onClose: () => {
                              window.clearTimeout(this.cancelCallTimeout),
                                this.setState({ showErrorScreen: !1 });
                            },
                            centerTitle: !0,
                            title: a.default.createElement(c.Icon, {
                              name: c.IconName.Danger,
                              size: c.IconSize.Xl,
                              color: u.IconColor.warningDefault,
                            }),
                          },
                          a.default.createElement(
                            c.Text,
                            {
                              variant: u.TextVariant.bodyLgMedium,
                              textAlign: u.TextAlign.Center,
                              margin: [0, 4, 4, 4],
                            },
                            e
                          ),
                          a.default.createElement(
                            d.default,
                            { display: u.DISPLAY.FLEX, padding: 4, gap: 2 },
                            a.default.createElement(
                              c.ButtonSecondary,
                              {
                                onClick: () => {
                                  window.clearTimeout(this.cancelCallTimeout),
                                    this.setState({ showErrorScreen: !1 }),
                                    n();
                                },
                                variant: u.TextVariant.bodySm,
                                block: !0,
                              },
                              this.context.t('switchNetworks')
                            ),
                            t
                              ? a.default.createElement(
                                  c.ButtonPrimary,
                                  {
                                    onClick: () => {
                                      this.setState({ showErrorScreen: !1 }),
                                        o(...r),
                                        window.clearTimeout(this.cancelCallTimeout),
                                        (this.cancelCallTimeout = setTimeout(
                                          this.cancelCall,
                                          this.props.cancelTime || 15 * i.SECOND
                                        ));
                                    },
                                    variant: u.TextVariant.bodySm,
                                    block: !0,
                                  },
                                  this.context.t('tryAgain')
                                )
                              : null
                          )
                        );
                      }),
                      m(this, 'renderDeprecatedRpcUrlWarning', () =>
                        this.renderConnectionFailureNotification(
                          this.context.t('currentRpcUrlDeprecated'),
                          !1
                        )
                      ),
                      m(this, 'renderErrorScreenContent', () => {
                        const { providerConfig: e } = this.props;
                        return this.renderConnectionFailureNotification(
                          this.context.t('networkSwitchConnectionError', [e.nickname]),
                          !0
                        );
                      }),
                      m(this, 'cancelCall', () => {
                        const { isNetworkLoading: e } = this.props;
                        e && this.setState({ showErrorScreen: !0 });
                      }),
                      m(this, 'componentDidUpdate', e => {
                        const { providerConfig: t } = this.props,
                          { providerConfig: n } = e;
                        t.type !== n.type &&
                          (window.clearTimeout(this.cancelCallTimeout),
                          this.setState({ showErrorScreen: !1 }),
                          (this.cancelCallTimeout = setTimeout(
                            this.cancelCall,
                            this.props.cancelTime || 15 * i.SECOND
                          )));
                      }),
                      m(this, 'componentWillUnmount', () => {
                        window.clearTimeout(this.cancelCallTimeout);
                      });
                  }
                  render() {
                    const { rollbackToPreviousProvider: e, showDeprecatedRpcUrlWarning: t } =
                      this.props;
                    let n;
                    return (
                      (n = this.state.showErrorScreen
                        ? this.renderErrorScreenContent()
                        : t
                          ? this.renderDeprecatedRpcUrlWarning()
                          : this.getConnectingLabel(this.props.loadingMessage)),
                      a.default.createElement(o.default, {
                        header: a.default.createElement('div', {
                          className: 'page-container__header-close',
                          onClick: e,
                        }),
                        showLoadingSpinner: !this.state.showErrorScreen,
                        loadingMessage: n,
                      })
                    );
                  }
                }
                (n.default = h),
                  m(h, 'contextTypes', { t: r.default.func }),
                  m(h, 'propTypes', {
                    loadingMessage: r.default.string,
                    cancelTime: r.default.number,
                    providerConfig: r.default.object,
                    providerId: r.default.oneOfType([r.default.string, r.default.number]),
                    showNetworkDropdown: r.default.func,
                    setProviderArgs: r.default.array,
                    setActiveNetwork: r.default.func,
                    rollbackToPreviousProvider: r.default.func,
                    isNetworkLoading: r.default.bool,
                    showDeprecatedRpcUrlWarning: r.default.bool,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/loading-network-screen/loading-network-screen.component.js',
      },
    ],
    [
      6044,
      {
        '../../../../shared/constants/network': 5804,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './loading-network-screen.component': 6043,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = e('react-redux'),
                  o = e('../../../../shared/constants/network'),
                  i = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('../../../store/actions')),
                  s = e('../../../selectors'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  c =
                    (a = e('./loading-network-screen.component')) && a.__esModule
                      ? a
                      : { default: a };
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const d = ['0x3', '0x2a', '0x4'];
                n.default = (0, r.connect)(
                  e => {
                    const { loadingMessage: t } = e.appState,
                      n = (0, l.getProviderConfig)(e),
                      { rpcUrl: a, chainId: r, ticker: i, nickname: c, type: u } = n,
                      p = u === o.NETWORK_TYPES.RPC ? [a, r, i, c] : [u],
                      f = r,
                      m = d.includes(f),
                      h = a && new URL(a).host.endsWith('.infura.io'),
                      g = m && h;
                    let y = c;
                    if (y === undefined) {
                      const t = (0, s.getAllEnabledNetworks)(e)[r];
                      t && (y = t.name);
                    }
                    return {
                      isNetworkLoading: (0, l.isNetworkLoading)(e),
                      loadingMessage: t,
                      setProviderArgs: p,
                      providerConfig: { ...n, nickname: y },
                      providerId: (0, s.getNetworkIdentifier)(e),
                      showDeprecatedRpcUrlWarning: g,
                    };
                  },
                  e => ({
                    setActiveNetwork: t => {
                      e(i.setActiveNetwork(t));
                    },
                    rollbackToPreviousProvider: () => e(i.rollbackToPreviousProvider()),
                    showNetworkDropdown: () => e(i.toggleNetworkMenu()),
                  })
                )(c.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/loading-network-screen/loading-network-screen.container.js',
      },
    ],
    [
      6045,
      { './metamask-template-renderer': 6046, './section-shape': 6048 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SectionShape', {
                    enumerable: !0,
                    get: function () {
                      return o.SectionShape;
                    },
                  }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var a,
                  r = (a = e('./metamask-template-renderer')) && a.__esModule ? a : { default: a },
                  o = e('./section-shape');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/metamask-template-renderer/index.js' },
    ],
    [
      6046,
      { './safe-component-list': 6047, './section-shape': 6048, lodash: 4921, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = s(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('lodash'),
                  o = e('./safe-component-list'),
                  i = e('./section-shape');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function l() {
                  return (
                    (l = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                function c(e) {
                  const { element: t } = e,
                    n = o.safeComponentList[t];
                  if (!n)
                    throw new Error(
                      `${t} is not in the safe component list for MetaMask template renderer`
                    );
                  return n;
                }
                function u(e) {
                  const t = c(e),
                    n = e.propComponents ? d(e.propComponents) : {};
                  return a.default.createElement(
                    t,
                    l({}, e.props, n),
                    'object' == typeof e.children
                      ? a.default.createElement(p, { sections: e.children })
                      : null == e
                        ? void 0
                        : e.children
                  );
                }
                function d(e) {
                  return Object.entries(e).reduce(
                    (e, [t, n]) => (n && (e[t] = Array.isArray(n) ? n.map(u) : u(n)), e),
                    {}
                  );
                }
                const p = ({ sections: e }) =>
                  e
                    ? 'string' == typeof e
                      ? e
                      : e && 'object' == typeof e && !Array.isArray(e)
                        ? u(e)
                        : a.default.createElement(
                            a.default.Fragment,
                            null,
                            e.reduce((e, t) => {
                              if (t === undefined || !0 === (null == t ? void 0 : t.hide)) return e;
                              if ('string' == typeof t) e.push(t);
                              else {
                                if (!t.key)
                                  throw new Error(
                                    'When using array syntax in MetaMask Template Language, you must specify a key for each child of the array'
                                  );
                                if ('object' == typeof (null == t ? void 0 : t.children))
                                  e.push(a.default.createElement(p, { sections: t, key: t.key }));
                                else {
                                  const n = c(t),
                                    r = t.propComponents ? d(t.propComponents) : {};
                                  e.push(
                                    a.default.createElement(
                                      n,
                                      l({ key: t.key }, t.props, r),
                                      null == t ? void 0 : t.children
                                    )
                                  );
                                }
                              }
                              return e;
                            }, [])
                          )
                    : null;
                p.propTypes = { sections: i.ValidChildren };
                n.default = (0, a.memo)(p, (e, t) => (0, r.isEqual)(e.sections, t.sections));
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/metamask-template-renderer/metamask-template-renderer.js',
      },
    ],
    [
      6047,
      {
        '../../../pages/confirmations/components/snap-account-error-message': 7255,
        '../../../pages/confirmations/components/snap-account-success-message': 7257,
        '../../../pages/confirmations/confirmation/components/confirmation-network-switch': 7275,
        '../../../pages/create-snap-account': 7377,
        '../../../pages/remove-snap-account': 7458,
        '../../../pages/smart-transactions/smart-transaction-status-page': 7516,
        '../../../pages/snap-account-redirect': 7523,
        '../../component-library': 6402,
        '../../component-library/skeleton': 6448,
        '../../multichain': 6574,
        '../../multichain/create-named-snap-account': 6547,
        '../../ui/actionable-message/actionable-message': 6698,
        '../../ui/box': 6703,
        '../../ui/button': 6707,
        '../../ui/chip': 6716,
        '../../ui/definition-list': 6722,
        '../../ui/icon/preloader': 6751,
        '../../ui/origin-pill/origin-pill': 6782,
        '../../ui/popover': 6789,
        '../../ui/spinner': 6802,
        '../../ui/text-field': 6810,
        '../../ui/textarea/textarea': 6813,
        '../../ui/tooltip/tooltip': 6819,
        '../../ui/truncated-definition-list': 6820,
        '../../ui/typography': 6822,
        '../../ui/url-icon': 6827,
        '../confirm/info/row': 5984,
        '../metamask-translation': 6049,
        '../network-display': 6117,
        '../snaps/copyable': 6150,
        '../snaps/snap-authorship-header': 6159,
        '../snaps/snap-delineator': 6164,
        '../snaps/snap-ui-address': 6194,
        '../snaps/snap-ui-address-input': 6192,
        '../snaps/snap-ui-asset-selector': 6196,
        '../snaps/snap-ui-avatar': 6199,
        '../snaps/snap-ui-banner': 6201,
        '../snaps/snap-ui-button': 6203,
        '../snaps/snap-ui-card': 6205,
        '../snaps/snap-ui-checkbox': 6207,
        '../snaps/snap-ui-dropdown': 6209,
        '../snaps/snap-ui-file-input': 6211,
        '../snaps/snap-ui-footer-button': 6213,
        '../snaps/snap-ui-form': 6215,
        '../snaps/snap-ui-icon': 6217,
        '../snaps/snap-ui-image': 6219,
        '../snaps/snap-ui-input': 6221,
        '../snaps/snap-ui-link': 6223,
        '../snaps/snap-ui-markdown': 6225,
        '../snaps/snap-ui-radio-group': 6227,
        '../snaps/snap-ui-selector': 6266,
        '../snaps/snap-ui-tooltip': 6268,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.safeComponentList = void 0);
                var a = te(
                    e(
                      '../../../pages/confirmations/confirmation/components/confirmation-network-switch'
                    )
                  ),
                  r = e('../../../pages/smart-transactions/smart-transaction-status-page'),
                  o = e('../../component-library'),
                  i = e('../../multichain'),
                  s = te(e('../../ui/actionable-message/actionable-message')),
                  l = te(e('../../ui/box')),
                  c = te(e('../../ui/button')),
                  u = te(e('../../ui/chip')),
                  d = te(e('../../ui/definition-list')),
                  p = te(e('../../ui/icon/preloader')),
                  f = te(e('../../ui/origin-pill/origin-pill')),
                  m = te(e('../../ui/popover')),
                  h = te(e('../../ui/spinner')),
                  g = te(e('../../ui/text-field')),
                  y = te(e('../../ui/textarea/textarea')),
                  b = te(e('../../ui/tooltip/tooltip')),
                  v = te(e('../../ui/truncated-definition-list')),
                  k = te(e('../../ui/typography')),
                  _ = te(e('../../ui/url-icon')),
                  x = e('../confirm/info/row'),
                  w = te(e('../metamask-translation')),
                  M = te(e('../network-display')),
                  T = e('../snaps/copyable'),
                  E = e('../snaps/snap-delineator'),
                  C = e('../snaps/snap-ui-address'),
                  S = e('../snaps/snap-ui-avatar'),
                  O = e('../snaps/snap-ui-banner'),
                  I = e('../snaps/snap-ui-button'),
                  P = e('../snaps/snap-ui-card'),
                  j = e('../snaps/snap-ui-checkbox'),
                  N = e('../snaps/snap-ui-dropdown'),
                  D = e('../snaps/snap-ui-file-input'),
                  A = e('../snaps/snap-ui-footer-button'),
                  B = e('../snaps/snap-ui-form'),
                  R = e('../snaps/snap-ui-icon'),
                  F = e('../snaps/snap-ui-image'),
                  $ = e('../snaps/snap-ui-input'),
                  W = e('../snaps/snap-ui-link'),
                  L = e('../snaps/snap-ui-address-input'),
                  q = e('../snaps/snap-ui-markdown'),
                  z = e('../snaps/snap-ui-radio-group'),
                  U = e('../snaps/snap-ui-selector'),
                  V = e('../snaps/snap-ui-tooltip'),
                  H = e('../snaps/snap-ui-asset-selector'),
                  K = e('../../../pages/confirmations/components/snap-account-error-message'),
                  J = e('../../../pages/confirmations/components/snap-account-success-message'),
                  G = e('../../../pages/create-snap-account'),
                  Q = e('../../../pages/remove-snap-account'),
                  Y = e('../../../pages/snap-account-redirect'),
                  X = e('../../multichain/create-named-snap-account'),
                  Z = te(e('../snaps/snap-authorship-header')),
                  ee = e('../../component-library/skeleton');
                function te(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.safeComponentList = {
                  a: 'a',
                  AccountListItem: i.AccountListItem,
                  ActionableMessage: s.default,
                  AvatarIcon: o.AvatarIcon,
                  b: 'b',
                  BannerAlert: o.BannerAlert,
                  Box: l.default,
                  Button: c.default,
                  Chip: u.default,
                  ConfirmationNetworkSwitch: a.default,
                  ConfirmInfoRow: x.ConfirmInfoRow,
                  ConfirmInfoRowAddress: x.ConfirmInfoRowAddress,
                  ConfirmInfoRowValueDouble: x.ConfirmInfoRowValueDouble,
                  Copyable: T.Copyable,
                  DefinitionList: d.default,
                  div: 'div',
                  FormTextField: o.FormTextField,
                  i: 'i',
                  MetaMaskTranslation: w.default,
                  NetworkDisplay: M.default,
                  OriginPill: f.default,
                  p: 'p',
                  Popover: m.default,
                  Preloader: p.default,
                  SnapDelineator: E.SnapDelineator,
                  SnapUIAddress: C.SnapUIAddress,
                  SnapUIAvatar: S.SnapUIAvatar,
                  SnapUIBanner: O.SnapUIBanner,
                  SnapUIButton: I.SnapUIButton,
                  SnapUICard: P.SnapUICard,
                  SnapUICheckbox: j.SnapUICheckbox,
                  SnapUIDropdown: N.SnapUIDropdown,
                  SnapUIFileInput: D.SnapUIFileInput,
                  SnapUIForm: B.SnapUIForm,
                  SnapUIFooterButton: A.SnapUIFooterButton,
                  SnapUIIcon: R.SnapUIIcon,
                  SnapUIImage: F.SnapUIImage,
                  SnapUIInput: $.SnapUIInput,
                  SnapUIAddressInput: L.SnapUIAddressInput,
                  SnapUILink: W.SnapUILink,
                  SnapUIMarkdown: q.SnapUIMarkdown,
                  SnapUIRadioGroup: z.SnapUIRadioGroup,
                  SnapUISelector: U.SnapUISelector,
                  SnapUITooltip: V.SnapUITooltip,
                  SnapUIAssetSelector: H.SnapUIAssetSelector,
                  span: 'span',
                  Spinner: h.default,
                  Skeleton: ee.Skeleton,
                  Text: o.Text,
                  TextArea: y.default,
                  TextField: g.default,
                  Tooltip: b.default,
                  TruncatedDefinitionList: v.default,
                  Typography: k.default,
                  SmartTransactionStatusPage: r.SmartTransactionStatusPage,
                  UrlIcon: _.default,
                  CreateNamedSnapAccount: X.CreateNamedSnapAccount,
                  CreateSnapAccount: G.CreateSnapAccount,
                  RemoveSnapAccount: Q.RemoveSnapAccount,
                  SnapAccountCard: Q.SnapAccountCard,
                  SnapAccountErrorMessage: K.SnapAccountErrorMessage,
                  SnapAccountRedirect: Y.SnapAccountRedirect,
                  SnapAccountSuccessMessage: J.SnapAccountSuccessMessage,
                  SnapAuthorshipHeader: Z.default,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/metamask-template-renderer/safe-component-list.js',
      },
    ],
    [
      6048,
      { 'prop-types': 5082 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ValidChildren = n.SectionShape = void 0);
                var a,
                  r = (a = e('prop-types')) && a.__esModule ? a : { default: a };
                const o = (n.SectionShape = {
                    props: r.default.object,
                    propComponents: r.default.object,
                    element: r.default.string,
                    key: r.default.string,
                  }),
                  i = (n.ValidChildren = r.default.oneOfType([
                    r.default.string,
                    r.default.shape(o),
                    r.default.arrayOf(r.default.oneOfType([r.default.shape(o), r.default.string])),
                  ]));
                o.children = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/metamask-template-renderer/section-shape.js' },
    ],
    [
      6049,
      { './metamask-translation': 6050 },
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
                var a,
                  r = (a = e('./metamask-translation')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/metamask-translation/index.js' },
    ],
    [
      6050,
      {
        '../../../hooks/useI18nContext': 6985,
        '../metamask-template-renderer': 6045,
        '../metamask-template-renderer/section-shape': 6048,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = e('../../../hooks/useI18nContext'),
                  i = l(e('../metamask-template-renderer')),
                  s = e('../metamask-template-renderer/section-shape');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c({ translationKey: e, variables: t }) {
                  return (0, o.useI18nContext)()(
                    e,
                    null == t
                      ? void 0
                      : t.map(t => {
                          if ('object' == typeof t && !Array.isArray(t) && t.element) {
                            var n, r;
                            if (!t.key)
                              throw new Error(
                                `When using MetaMask Template Language in a MetaMaskTranslation variable, you must provide a key for the section regardless of syntax.\n            Section with element '${t.element}' for translationKey: '${e}' has no key property`
                              );
                            if (t.children && Array.isArray(t.children) && t.children.length > 2)
                              throw new Error(
                                'MetaMaskTranslation only renders templates with a single section and maximum two children'
                              );
                            if (
                              ((null === (n = t.children) ||
                              void 0 === n ||
                              null === (n = n[0]) ||
                              void 0 === n
                                ? void 0
                                : n.children) !== undefined &&
                                'string' != typeof t.children[0].children) ||
                              ((null === (r = t.children) ||
                              void 0 === r ||
                              null === (r = r[1]) ||
                              void 0 === r
                                ? void 0
                                : r.children) !== undefined &&
                                'string' != typeof t.children[1].children)
                            )
                              throw new Error(
                                'MetaMaskTranslation does not allow for component trees of non trivial depth'
                              );
                            return a.default.createElement(i.default, {
                              key: `${e}-${t.key}`,
                              sections: t,
                            });
                          }
                          return t;
                        })
                  );
                }
                c.propTypes = {
                  translationKey: r.default.string.isRequired,
                  variables: r.default.arrayOf(
                    r.default.oneOfType([
                      r.default.string,
                      r.default.number,
                      r.default.shape(s.SectionShape),
                    ])
                  ),
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/metamask-translation/metamask-translation.js' },
    ],
    [
      6051,
      { './modal-content': 6052, './modal.component': 6054 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ModalContent', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var a = o(e('./modal.component')),
                  r = o(e('./modal-content'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modal/index.js' },
    ],
    [
      6052,
      { './modal-content.component': 6053 },
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
                var a,
                  r = (a = e('./modal-content.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modal/modal-content/index.js' },
    ],
    [
      6053,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = i(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, o, s) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a };
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                class s extends r.PureComponent {
                  render() {
                    const { title: e, description: t } = this.props;
                    return r.default.createElement(
                      'div',
                      { className: 'modal-content' },
                      e
                        ? r.default.createElement('div', { className: 'modal-content__title' }, e)
                        : null,
                      t &&
                        r.default.createElement(
                          'div',
                          { className: 'modal-content__description' },
                          t
                        )
                    );
                  }
                }
                (n.default = s),
                  (function (e, t, n) {
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                      : (e[t] = n);
                  })(s, 'propTypes', { title: o.default.string, description: o.default.string });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modal/modal-content/modal-content.component.js',
      },
    ],
    [
      6054,
      { '../../ui/button': 6707, classnames: 4168, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = s(e('prop-types')),
                  o = s(e('classnames')),
                  i = s(e('../../ui/button'));
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function c(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class u extends a.PureComponent {
                  render() {
                    const {
                      children: e,
                      headerText: t,
                      onClose: n,
                      onSubmit: r,
                      submitType: s,
                      submitText: l,
                      submitDisabled: c,
                      onCancel: u,
                      cancelType: d,
                      cancelText: p,
                      contentClass: f,
                      containerClass: m,
                      hideFooter: h,
                      testId: g,
                    } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: (0, o.default)('modal-container', m), 'data-testid': g },
                      t &&
                        a.default.createElement(
                          'div',
                          { className: 'modal-container__header' },
                          a.default.createElement(
                            'div',
                            { className: 'modal-container__header-text' },
                            t
                          ),
                          a.default.createElement('div', {
                            className: 'modal-container__header-close',
                            'data-testid': 'modal-header-close',
                            onClick: n,
                          })
                        ),
                      a.default.createElement(
                        'div',
                        { className: (0, o.default)('modal-container__content', f) },
                        e
                      ),
                      h
                        ? null
                        : a.default.createElement(
                            'div',
                            { className: 'modal-container__footer' },
                            u &&
                              a.default.createElement(
                                i.default,
                                {
                                  type: d,
                                  onClick: u,
                                  className: 'modal-container__footer-button',
                                },
                                p
                              ),
                            a.default.createElement(
                              i.default,
                              {
                                type: s,
                                onClick: r,
                                disabled: c,
                                className: 'modal-container__footer-button',
                              },
                              l
                            )
                          )
                    );
                  }
                }
                (n.default = u),
                  c(u, 'propTypes', {
                    children: r.default.node,
                    contentClass: r.default.string,
                    containerClass: r.default.string,
                    testId: r.default.string,
                    headerText: r.default.string,
                    onClose: r.default.func,
                    onSubmit: r.default.func,
                    submitType: r.default.string,
                    submitText: r.default.string,
                    submitDisabled: r.default.bool,
                    hideFooter: r.default.bool,
                    onCancel: r.default.func,
                    cancelType: r.default.string,
                    cancelText: r.default.string,
                  }),
                  c(u, 'defaultProps', { submitType: 'primary', cancelType: 'secondary' });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modal/modal.component.js' },
    ],
    [
      6055,
      { '../../modal': 6051, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = l(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = l(e('../../modal'));
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function l(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = s(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var o in e)
                    if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                      var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                      i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                function c(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class u extends r.PureComponent {
                  constructor(...e) {
                    super(...e),
                      c(this, 'handleDelete', async () => {
                        const {
                          chainId: e,
                          currentChainId: t,
                          ethereumMainnetClientId: n,
                          onConfirm: a,
                          hideModal: r,
                          removeNetwork: o,
                          switchEvmNetwork: i,
                        } = this.props;
                        e === t && (await i(n)), await o(e), a(), r();
                      });
                  }
                  render() {
                    const { t: e } = this.context,
                      { networkNickname: t } = this.props;
                    return r.default.createElement(
                      i.default,
                      {
                        onSubmit: this.handleDelete,
                        onCancel: () => this.props.hideModal(),
                        submitText: e('delete'),
                        cancelText: e('cancel'),
                        submitType: 'danger-primary',
                        testId: 'confirm-delete-network-modal',
                      },
                      r.default.createElement(i.ModalContent, {
                        title: e('deleteNetworkTitle', [t]),
                        description: e('deleteNetworkIntro'),
                      })
                    );
                  }
                }
                (n.default = u),
                  c(u, 'propTypes', {
                    hideModal: o.default.func.isRequired,
                    removeNetwork: o.default.func.isRequired,
                    onConfirm: o.default.func.isRequired,
                    switchEvmNetwork: o.default.func.isRequired,
                    networkNickname: o.default.string.isRequired,
                    chainId: o.default.string.isRequired,
                    currentChainId: o.default.string.isRequired,
                    ethereumMainnetClientId: o.default.string.isRequired,
                  }),
                  c(u, 'contextTypes', { t: o.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-delete-network/confirm-delete-network.component.js',
      },
    ],
    [
      6056,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        '../../../../store/actions': 7619,
        './confirm-delete-network.component': 6055,
        'react-redux': 5286,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  r = e('redux'),
                  o = u(e('../../../../helpers/higher-order-components/with-modal-props')),
                  i = e('../../../../store/actions'),
                  s = e('../../../../../shared/modules/selectors/networks'),
                  l = e('../../../../../shared/constants/network'),
                  c = u(e('./confirm-delete-network.component'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, r.compose)(
                  o.default,
                  (0, a.connect)(
                    (e, t) => {
                      const n = (0, s.getNetworkConfigurationsByChainId)(e),
                        a = (0, s.getCurrentChainId)(e),
                        { rpcEndpoints: r, defaultRpcEndpointIndex: o } = n[l.CHAIN_IDS.MAINNET],
                        i = r[o].networkClientId,
                        { chainId: c, name: u } = n[t.target];
                      return {
                        ethereumMainnetClientId: i,
                        currentChainId: a,
                        chainId: c,
                        networkNickname: u,
                      };
                    },
                    e => ({
                      removeNetwork: t => {
                        e((0, i.removeNetwork)(t));
                      },
                      switchEvmNetwork: t => {
                        e((0, i.setActiveNetworkConfigurationId)(t));
                      },
                    })
                  )
                )(c.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-delete-network/confirm-delete-network.container.js',
      },
    ],
    [
      6057,
      { './confirm-delete-network.container': 6056 },
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
                var a,
                  r =
                    (a = e('./confirm-delete-network.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/confirm-delete-network/index.js' },
    ],
    [
      6058,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../helpers/utils/multichain/blockExplorer': 6909,
        '../../../../helpers/utils/util': 6921,
        '../../../../selectors/multichain': 7605,
        '../../../ui/identicon': 6758,
        '../../modal': 6051,
        '@metamask/keyring-api': 2014,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = f(e('prop-types')),
                  o = e('@metamask/keyring-api'),
                  i = e('../../../../helpers/utils/multichain/blockExplorer'),
                  s = f(e('../../modal')),
                  l = e('../../../../helpers/utils/util'),
                  c = f(e('../../../ui/identicon')),
                  u = e('../../../../../shared/constants/metametrics'),
                  d = f(e('../../../../helpers/constants/zendesk-url')),
                  p = e('../../../../selectors/multichain');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function h(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class g extends a.Component {
                  constructor(...e) {
                    super(...e),
                      h(this, 'handleRemove', () => {
                        this.props
                          .removeAccount(this.props.account.address)
                          .then(() => this.props.hideModal());
                      }),
                      h(this, 'handleCancel', () => {
                        this.props.hideModal();
                      });
                  }
                  renderSelectedAccount() {
                    const { t: e } = this.context,
                      { account: t, network: n } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: 'confirm-remove-account__account' },
                      a.default.createElement(
                        'div',
                        { className: 'confirm-remove-account__account__identicon' },
                        a.default.createElement(c.default, { address: t.address, diameter: 32 })
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'confirm-remove-account__account__name' },
                        a.default.createElement(
                          'span',
                          { className: 'confirm-remove-account__account__label' },
                          e('name')
                        ),
                        a.default.createElement(
                          'span',
                          { className: 'account_value' },
                          t.metadata.name
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'confirm-remove-account__account__address' },
                        a.default.createElement(
                          'span',
                          { className: 'confirm-remove-account__account__label' },
                          e('publicAddress')
                        ),
                        a.default.createElement(
                          'span',
                          { className: 'account_value' },
                          (0, l.addressSummary)(t.address, 4, 4, (0, o.isEvmAccountType)(t.type))
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'confirm-remove-account__account__link' },
                        a.default.createElement(
                          'a',
                          {
                            onClick: () => {
                              const e = (0, i.getMultichainAccountUrl)(t.address, n);
                              this.context.trackEvent({
                                category: u.MetaMetricsEventCategory.Accounts,
                                event: 'Clicked Block Explorer Link',
                                properties: {
                                  link_type: 'Account Tracker',
                                  action: 'Remove Account',
                                  block_explorer_domain: (0, l.getURLHostName)(e),
                                },
                              }),
                                global.platform.openTab({ url: e });
                            },
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            title: e('etherscanView'),
                            'data-testid': 'explorer-link',
                          },
                          a.default.createElement('i', {
                            className: 'fa fa-share-square',
                            style: { color: 'var(--color-icon-muted)' },
                            title: e('etherscanView'),
                          })
                        )
                      )
                    );
                  }
                  render() {
                    const { t: e } = this.context;
                    return a.default.createElement(
                      s.default,
                      {
                        headerText: `${e('removeAccount')}?`,
                        onClose: this.handleCancel,
                        onSubmit: this.handleRemove,
                        onCancel: this.handleCancel,
                        submitText: e('remove'),
                        cancelText: e('nevermind'),
                      },
                      a.default.createElement(
                        'div',
                        null,
                        this.renderSelectedAccount(),
                        a.default.createElement(
                          'div',
                          { className: 'confirm-remove-account__description' },
                          e('removeAccountDescription'),
                          a.default.createElement(
                            'a',
                            {
                              className: 'confirm-remove-account__link',
                              rel: 'noopener noreferrer',
                              target: '_blank',
                              href: d.default.IMPORTED_ACCOUNTS,
                            },
                            e('learnMore')
                          )
                        )
                      )
                    );
                  }
                }
                (n.default = g),
                  h(g, 'propTypes', {
                    hideModal: r.default.func.isRequired,
                    removeAccount: r.default.func.isRequired,
                    account: p.InternalAccountPropType.isRequired,
                    network: p.MultichainNetworkPropType.isRequired,
                  }),
                  h(g, 'contextTypes', { t: r.default.func, trackEvent: r.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-remove-account/confirm-remove-account.component.js',
      },
    ],
    [
      6059,
      {
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        '../../../../selectors/multichain': 7605,
        '../../../../store/actions': 7619,
        './confirm-remove-account.component': 6058,
        'react-redux': 5286,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  r = e('redux'),
                  o = c(e('../../../../helpers/higher-order-components/with-modal-props')),
                  i = e('../../../../store/actions'),
                  s = e('../../../../selectors/multichain'),
                  l = c(e('./confirm-remove-account.component'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, r.compose)(
                  o.default,
                  (0, a.connect)(
                    (e, t) => ({ network: (0, s.getMultichainNetwork)(e, t.account) }),
                    e => ({ removeAccount: t => e((0, i.removeAccount)(t)) })
                  )
                )(l.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-remove-account/confirm-remove-account.container.js',
      },
    ],
    [
      6060,
      { './confirm-remove-account.container': 6059 },
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
                var a,
                  r =
                    (a = e('./confirm-remove-account.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/confirm-remove-account/index.js' },
    ],
    [
      6061,
      { '../../modal': 6051, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = l(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = l(e('../../modal'));
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function l(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = s(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var o in e)
                    if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                      var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                      i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                function c(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class u extends r.PureComponent {
                  constructor(...e) {
                    super(...e),
                      c(this, 'handleReset', () => {
                        this.props.resetAccount().then(() => this.props.hideModal());
                      });
                  }
                  render() {
                    const { t: e } = this.context;
                    return r.default.createElement(
                      i.default,
                      {
                        onSubmit: this.handleReset,
                        onCancel: () => this.props.hideModal(),
                        submitText: e('clear'),
                        cancelText: e('nevermind'),
                        submitType: 'danger-primary',
                      },
                      r.default.createElement(i.ModalContent, {
                        title: `${e('clearActivity')}?`,
                        description: e('clearActivityDescription'),
                      })
                    );
                  }
                }
                (n.default = u),
                  c(u, 'propTypes', {
                    hideModal: o.default.func.isRequired,
                    resetAccount: o.default.func.isRequired,
                  }),
                  c(u, 'contextTypes', { t: o.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-reset-account/confirm-reset-account.component.js',
      },
    ],
    [
      6062,
      {
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        '../../../../store/actions': 7619,
        './confirm-reset-account.component': 6061,
        'react-redux': 5286,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  r = e('redux'),
                  o = l(e('../../../../helpers/higher-order-components/with-modal-props')),
                  i = e('../../../../store/actions'),
                  s = l(e('./confirm-reset-account.component'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, r.compose)(
                  o.default,
                  (0, a.connect)(null, e => ({ resetAccount: () => e((0, i.resetAccount)()) }))
                )(s.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-reset-account/confirm-reset-account.container.js',
      },
    ],
    [
      6063,
      { './confirm-reset-account.container': 6062 },
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
                var a,
                  r =
                    (a = e('./confirm-reset-account.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/confirm-reset-account/index.js' },
    ],
    [
      6064,
      {
        '../../../../contexts/i18n': 6832,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useModalProps': 6989,
        '../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    const { props: e, hideModal: t } = (0, r.useModalProps)(),
                      { turnOffProfileSyncing: n } = e,
                      l = (0, a.useContext)(s.I18nContext),
                      c = () => {
                        t();
                      };
                    return a.default.createElement(
                      o.Modal,
                      { isOpen: !0, onClose: c, 'data-testid': 'turn-off-sync-modal' },
                      a.default.createElement(o.ModalOverlay, { 'data-testid': 'modal-overlay' }),
                      a.default.createElement(
                        o.ModalContent,
                        { size: o.ModalContentSize.Md, 'data-testid': 'modal-content' },
                        a.default.createElement(
                          o.ModalHeader,
                          { onClose: c, 'data-testid': 'modal-header' },
                          l('areYouSure')
                        ),
                        a.default.createElement(
                          o.ModalBody,
                          { 'data-testid': 'modal-body' },
                          a.default.createElement(
                            o.Text,
                            {
                              textAlign: i.TextAlign.Center,
                              as: 'p',
                              'data-testid': 'confirmation-text',
                            },
                            l('profileSyncConfirmation')
                          )
                        ),
                        a.default.createElement(o.ModalFooter, {
                          paddingTop: 4,
                          onSubmit: c,
                          onCancel: async () => {
                            n(), t();
                          },
                          containerProps: {
                            flexDirection: i.FlexDirection.Row,
                            alignItems: i.AlignItems.stretch,
                          },
                          submitButtonProps: {
                            children: l('cancel'),
                            size: o.ButtonSize.Lg,
                            'data-testid': 'cancel-button',
                          },
                          cancelButtonProps: {
                            children: l('turnOff'),
                            size: o.ButtonSize.Lg,
                            'data-testid': 'submit-button',
                          },
                          'data-testid': 'modal-footer',
                        })
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('../../../../hooks/useModalProps'),
                  o = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../contexts/i18n');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-turn-off-profile-syncing/confirm-turn-off-profile-syncing.tsx',
      },
    ],
    [
      6065,
      { './confirm-turn-off-profile-syncing': 6064 },
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
                var a,
                  r =
                    (a = e('./confirm-turn-off-profile-syncing')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/confirm-turn-off-profile-syncing/index.ts',
      },
    ],
    [
      6066,
      {
        '../../../../../shared/modules/string-utils': 5878,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/constants/routes': 6878,
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../store/actions': 7619,
        '../../../component-library/text': 6462,
        '../../modal': 6051,
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
                var a = h(e('react')),
                  r = h(e('prop-types')),
                  o = e('react-router-dom'),
                  i = e('react-redux'),
                  s = h(e('../../modal')),
                  l = e('../../../component-library/text'),
                  c = h(e('../../../../helpers/higher-order-components/with-modal-props')),
                  u = e('../../../../hooks/useI18nContext'),
                  d = e('../../../../helpers/constants/routes'),
                  p = e('../../../../ducks/metamask/metamask'),
                  f = e('../../../../store/actions'),
                  m = e('../../../../../shared/modules/string-utils');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const g = ({ hideModal: e, tokenAddress: t }) => {
                  const n = (0, o.useHistory)(),
                    r = (0, u.useI18nContext)(),
                    c = (0, i.useDispatch)(),
                    h = (0, i.useSelector)(p.getNfts).find(({ address: e }) =>
                      (0, m.isEqualCaseInsensitive)(e, t)
                    );
                  return a.default.createElement(
                    s.default,
                    {
                      onSubmit: async () => {
                        if (h) {
                          await c(
                            (0, f.ignoreTokens)({ tokensToIgnore: t, dontShowLoadingIndicator: !0 })
                          );
                          const { tokenId: e } = h;
                          n.push({ pathname: `${d.ASSET_ROUTE}/${t}/${e}` });
                        } else
                          c((0, f.showImportNftsModal)({ tokenAddress: t, ignoreErc20Token: !0 }));
                        e();
                      },
                      submitText: r('yes'),
                      onCancel: () => e(),
                      cancelText: r('cancel'),
                    },
                    a.default.createElement(
                      'div',
                      { className: 'convert-token-to-nft-modal' },
                      a.default.createElement(
                        l.Text,
                        { marginTop: 2 },
                        r(h ? 'convertTokenToNFTExistDescription' : 'convertTokenToNFTDescription')
                      )
                    )
                  );
                };
                g.propTypes = {
                  hideModal: r.default.func.isRequired,
                  tokenAddress: r.default.string,
                };
                n.default = (0, c.default)(g);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/convert-token-to-nft-modal/convert-token-to-nft-modal.js',
      },
    ],
    [
      6067,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../ui/text-field': 6810,
        '../../modal': 6051,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = p(e('prop-types')),
                  o = p(e('../../modal')),
                  i = p(e('../../../ui/text-field')),
                  s = e('../../../../helpers/constants/design-system'),
                  l = p(e('../../../../helpers/higher-order-components/with-modal-props')),
                  c = e('../../../../hooks/useI18nContext'),
                  u = p(e('../../../../helpers/constants/zendesk-url')),
                  d = e('../../../component-library');
                function p(e) {
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
                const m = ({
                  hideModal: e,
                  customNonceValue: t,
                  nextNonce: n,
                  updateCustomNonce: r,
                  getNextNonce: l,
                }) => {
                  const p = t || ('number' == typeof n && n.toString()),
                    [f, m] = (0, a.useState)(p),
                    h = (0, c.useI18nContext)();
                  return a.default.createElement(
                    o.default,
                    {
                      onSubmit: () => {
                        r('' === f ? t : f), l(), e();
                      },
                      submitText: h('save'),
                      onCancel: () => e(),
                      cancelText: h('cancel'),
                      contentClass: 'customize-nonce-modal-content',
                      containerClass: 'customize-nonce-modal-container',
                    },
                    a.default.createElement(
                      'div',
                      { className: 'customize-nonce-modal' },
                      a.default.createElement(
                        'div',
                        { className: 'customize-nonce-modal__main-header' },
                        a.default.createElement(
                          d.Text,
                          {
                            className: 'customize-nonce-modal__main-title',
                            variant: s.TextVariant.headingSm,
                            as: 'h4',
                          },
                          h('editNonceField')
                        ),
                        a.default.createElement(d.ButtonIcon, {
                          iconName: d.IconName.Close,
                          className: 'customize-nonce-modal__close',
                          size: d.ButtonIconSize.Sm,
                          ariaLabel: h('close'),
                          onClick: e,
                        })
                      ),
                      a.default.createElement(
                        d.Box,
                        {
                          marginTop: 2,
                          display: s.Display.InlineFlex,
                          alignItems: s.AlignItems.center,
                        },
                        a.default.createElement(
                          d.Text,
                          { variant: s.TextVariant.bodyMd, as: 'h6' },
                          h('editNonceMessage'),
                          a.default.createElement(
                            d.ButtonLink,
                            {
                              className: 'customize-nonce-modal__link',
                              rel: 'noopener noreferrer',
                              target: '_blank',
                              href: u.default.CUSTOMIZE_NONCE,
                            },
                            h('learnMoreUpperCase')
                          )
                        )
                      ),
                      a.default.createElement(
                        d.Box,
                        { marginTop: 4 },
                        a.default.createElement(
                          d.Box,
                          { alignItems: s.AlignItems.center, display: s.Display.Flex },
                          a.default.createElement(
                            d.Text,
                            {
                              variant: s.TextVariant.bodyMdBold,
                              as: 'h6',
                              width: s.BlockSize.FiveSixths,
                            },
                            h('editNonceField')
                          ),
                          a.default.createElement(
                            d.Box,
                            { width: s.BlockSize.OneSixth },
                            a.default.createElement(
                              d.ButtonLink,
                              {
                                className: 'customize-nonce-modal__reset',
                                'data-testid': 'customize-nonce-reset',
                                onClick: () => {
                                  m(n);
                                },
                              },
                              h('reset')
                            )
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'customize-nonce-modal__input' },
                          a.default.createElement(i.default, {
                            type: 'number',
                            'data-testid': 'custom-nonce-input',
                            min: '0',
                            placeholder: p,
                            onChange: e => {
                              const t = e.target.value.replace(/[.,]/gu, '');
                              m(t);
                            },
                            fullWidth: !0,
                            margin: 'dense',
                            value: f,
                            id: 'custom-nonce-id',
                          })
                        )
                      )
                    )
                  );
                };
                m.propTypes = {
                  hideModal: r.default.func.isRequired,
                  customNonceValue: r.default.string,
                  nextNonce: r.default.number,
                  updateCustomNonce: r.default.func,
                  getNextNonce: r.default.func,
                };
                n.default = (0, l.default)(m);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/customize-nonce/customize-nonce.component.js',
      },
    ],
    [
      6068,
      { './customize-nonce.component': 6067 },
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
                var a,
                  r = (a = e('./customize-nonce.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/customize-nonce/index.js' },
    ],
    [
      6069,
      {
        '../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../component-library': 6402,
        '../../../ui/identicon': 6758,
        '../../../ui/text-field': 6810,
        '../../modal': 6051,
        'bignumber.js': 4030,
        classnames: 4168,
        loglevel: 4929,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = f(e('prop-types')),
                  o = f(e('loglevel')),
                  i = f(e('classnames')),
                  s = f(e('bignumber.js')),
                  l = f(e('../../modal')),
                  c = f(e('../../../ui/identicon')),
                  u = f(e('../../../ui/text-field')),
                  d = e('../../../../../shared/lib/transactions-controller-utils'),
                  p = e('../../../component-library');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function h(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                const g = new s.default(2).pow(256).minus(1).toString(10);
                class y extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      h(this, 'state', {
                        customSpendLimit: this.props.customTokenAmount || '',
                        selectedOptionIsUnlimited: !this.props.customTokenAmount,
                      });
                  }
                  renderModalContent(e) {
                    const { t: t } = this.context,
                      {
                        hideModal: n,
                        selectedAccount: r,
                        tokenAmount: o,
                        tokenSymbol: l,
                        tokenBalance: f,
                        customTokenAmount: m,
                        origin: h,
                      } = this.props,
                      { name: y, address: b } = r || {},
                      { selectedOptionIsUnlimited: v } = this.state;
                    return a.default.createElement(
                      'div',
                      { className: 'edit-approval-permission' },
                      a.default.createElement(
                        'div',
                        { className: 'edit-approval-permission__header' },
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__title' },
                          t('editPermission')
                        ),
                        a.default.createElement(p.ButtonIcon, {
                          iconName: p.IconName.Close,
                          size: p.ButtonIconSize.Lg,
                          className: 'edit-approval-permission__header__close',
                          onClick: n,
                        })
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'edit-approval-permission__account-info' },
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__account-info__account' },
                          a.default.createElement(c.default, { address: b, diameter: 32 }),
                          a.default.createElement(
                            'div',
                            { className: 'edit-approval-permission__name-and-balance-container' },
                            a.default.createElement(
                              'div',
                              { className: 'edit-approval-permission__account-info__name' },
                              y
                            ),
                            a.default.createElement('div', null, t('balance'))
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__account-info__balance' },
                          `${(0, d.toPrecisionWithoutTrailingZeros)(f, 9)} ${l}`
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'edit-approval-permission__edit-section' },
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__edit-section__title' },
                          t('spendLimitPermission')
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__edit-section__description' },
                          t('allowWithdrawAndSpend', [h])
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__edit-section__option' },
                          a.default.createElement(
                            'div',
                            {
                              className: 'edit-approval-permission__edit-section__radio-button',
                              onClick: () => this.setState({ selectedOptionIsUnlimited: !0 }),
                            },
                            a.default.createElement('div', {
                              className: (0, i.default)({
                                'edit-approval-permission__edit-section__radio-button-outline': !v,
                                'edit-approval-permission__edit-section__radio-button-outline--selected':
                                  v,
                              }),
                            }),
                            a.default.createElement('div', {
                              className:
                                'edit-approval-permission__edit-section__radio-button-fill',
                            }),
                            v &&
                              a.default.createElement('div', {
                                className:
                                  'edit-approval-permission__edit-section__radio-button-dot',
                              })
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'edit-approval-permission__edit-section__option-text' },
                            a.default.createElement(
                              'div',
                              {
                                className: (0, i.default)({
                                  'edit-approval-permission__edit-section__option-label': !v,
                                  'edit-approval-permission__edit-section__option-label--selected':
                                    v,
                                }),
                              },
                              new s.default(o).equals(new s.default(g))
                                ? t('unlimited')
                                : t('proposedApprovalLimit')
                            ),
                            a.default.createElement(
                              'div',
                              {
                                className:
                                  'edit-approval-permission__edit-section__option-description',
                              },
                              t('spendLimitRequestedBy', [h])
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'edit-approval-permission__edit-section__option-value' },
                              `${Number(o)} ${l}`
                            )
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'edit-approval-permission__edit-section__option' },
                          a.default.createElement(
                            'div',
                            {
                              className: 'edit-approval-permission__edit-section__radio-button',
                              onClick: () => this.setState({ selectedOptionIsUnlimited: !1 }),
                            },
                            a.default.createElement('div', {
                              className: (0, i.default)({
                                'edit-approval-permission__edit-section__radio-button-outline': v,
                                'edit-approval-permission__edit-section__radio-button-outline--selected':
                                  !v,
                              }),
                            }),
                            a.default.createElement('div', {
                              className:
                                'edit-approval-permission__edit-section__radio-button-fill',
                            }),
                            !v &&
                              a.default.createElement('div', {
                                className:
                                  'edit-approval-permission__edit-section__radio-button-dot',
                              })
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'edit-approval-permission__edit-section__option-text' },
                            a.default.createElement(
                              'div',
                              {
                                className: (0, i.default)({
                                  'edit-approval-permission__edit-section__option-label': v,
                                  'edit-approval-permission__edit-section__option-label--selected':
                                    !v,
                                }),
                              },
                              t('customSpendLimit')
                            ),
                            a.default.createElement(
                              'div',
                              {
                                className:
                                  'edit-approval-permission__edit-section__option-description',
                              },
                              t('enterMaxSpendLimit')
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'edit-approval-permission__edit-section__option-input' },
                              a.default.createElement(u.default, {
                                type: 'number',
                                placeholder: `${Number(m || o)} ${l}`,
                                onChange: e => {
                                  this.setState({ customSpendLimit: e.target.value }),
                                    v && this.setState({ selectedOptionIsUnlimited: !1 });
                                },
                                fullWidth: !0,
                                margin: 'dense',
                                value: this.state.customSpendLimit,
                                error: e,
                              })
                            )
                          )
                        )
                      )
                    );
                  }
                  validateSpendLimit() {
                    const { t: e } = this.context,
                      { decimals: t, requiredMinimum: n } = this.props,
                      { selectedOptionIsUnlimited: a, customSpendLimit: r } = this.state;
                    if (a || !r) return undefined;
                    let i;
                    try {
                      i = new s.default(r);
                    } catch (t) {
                      return (
                        o.default.debug(`Error converting '${r}' to BigNumber:`, t),
                        e('spendLimitInvalid')
                      );
                    }
                    if (i.isNegative()) return e('spendLimitInvalid');
                    const l = (0, d.calcTokenAmount)(g, t);
                    return i.greaterThan(l)
                      ? e('spendLimitTooLarge')
                      : n !== undefined && i.lessThan(n)
                        ? e('spendLimitInsufficient')
                        : undefined;
                  }
                  render() {
                    const { t: e } = this.context,
                      { setCustomAmount: t, hideModal: n, customTokenAmount: r } = this.props,
                      { selectedOptionIsUnlimited: o, customSpendLimit: i } = this.state,
                      s = this.validateSpendLimit(),
                      c = Boolean((i === r && !o) || s);
                    return a.default.createElement(
                      l.default,
                      {
                        onSubmit: () => {
                          t(o ? '' : i), n();
                        },
                        submitText: e('save'),
                        contentClass: 'edit-approval-permission-modal-content',
                        containerClass: 'edit-approval-permission-modal-container',
                        submitDisabled: c,
                      },
                      this.renderModalContent(s)
                    );
                  }
                }
                (n.default = y),
                  h(y, 'propTypes', {
                    decimals: r.default.number,
                    hideModal: r.default.func.isRequired,
                    selectedAccount: r.default.object,
                    tokenAmount: r.default.string,
                    customTokenAmount: r.default.string,
                    tokenSymbol: r.default.string,
                    tokenBalance: r.default.string,
                    setCustomAmount: r.default.func,
                    origin: r.default.string.isRequired,
                    requiredMinimum: r.default.instanceOf(s.default),
                  }),
                  h(y, 'contextTypes', { t: r.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/edit-approval-permission/edit-approval-permission.component.js',
      },
    ],
    [
      6070,
      {
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        '../../../../selectors': 7601,
        './edit-approval-permission.component': 6069,
        'react-redux': 5286,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  r = e('redux'),
                  o = l(e('../../../../helpers/higher-order-components/with-modal-props')),
                  i = e('../../../../selectors'),
                  s = l(e('./edit-approval-permission.component'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, r.compose)(
                  o.default,
                  (0, a.connect)(e => {
                    const t = e.appState.modal.modalState.props || {};
                    return { selectedAccount: (0, i.getSelectedInternalAccount)(e), ...t };
                  })
                )(s.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/edit-approval-permission/edit-approval-permission.container.js',
      },
    ],
    [
      6071,
      { './edit-approval-permission.container': 6070 },
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
                var a,
                  r =
                    (a = e('./edit-approval-permission.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/edit-approval-permission/index.js' },
    ],
    [
      6072,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = i(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, o, s) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a };
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function s(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                let l,
                  c = 0;
                const u = e => {
                    const t = `anim_${++c}${Number(new Date())}`;
                    let n = `@keyframes ${t} {`;
                    return (
                      Object.keys(e).forEach(t => {
                        (n += `${t} {`),
                          Object.keys(e[t]).forEach(a => {
                            const r = `:${e[t][a]};`;
                            n += a + r;
                          }),
                          (n += '}');
                      }),
                      (n += '}'),
                      (e => {
                        l ||
                          ((l = document.createElement('style')),
                          document.getElementsByTagName('head')[0].appendChild(l),
                          (l = l.sheet || l.styleSheet)),
                          l.insertRule(e, (l.cssRules || l.rules).length);
                      })(n),
                      t
                    );
                  },
                  d = {
                    show: { animationDuration: '0.3s', animationTimingFunction: 'ease-out' },
                    hide: { animationDuration: '0.3s', animationTimingFunction: 'ease-out' },
                    showContentAnimation: u({ '0%': { opacity: 0 }, '100%': { opacity: 1 } }),
                    hideContentAnimation: u({ '0%': { opacity: 1 }, '100%': { opacity: 0 } }),
                    showBackdropAnimation: u({ '0%': { opacity: 0 }, '100%': { opacity: 0.9 } }),
                    hideBackdropAnimation: u({ '0%': { opacity: 0.9 }, '100%': { opacity: 0 } }),
                  },
                  p = ['transitionend', 'animationend'];
                class f extends r.Component {
                  constructor(...e) {
                    super(...e),
                      s(this, 'content', null),
                      s(this, 'state', { willHide: !0, hidden: !0 }),
                      s(this, 'addTransitionListener', (e, t) => {
                        if (e) {
                          const n = function (a) {
                            (a && a.target !== e) ||
                              (((e, t) => {
                                0 !== p.length &&
                                  p.forEach(function (n) {
                                    !(function (e, t, n) {
                                      e.removeEventListener(t, n, !1);
                                    })(e, n, t);
                                  });
                              })(e, n),
                              t());
                          };
                          ((e, t) => {
                            0 !== p.length
                              ? p.forEach(function (n) {
                                  !(function (e, t, n) {
                                    e.addEventListener(t, n, !1);
                                  })(e, n, t);
                                })
                              : window.setTimeout(t, 0);
                          })(e, n);
                        }
                      }),
                      s(this, 'handleBackdropClick', () => {
                        this.props.closeOnClick && this.hide();
                      }),
                      s(this, 'hasHidden', () => this.state.hidden),
                      s(this, 'leave', () => {
                        this.setState({ hidden: !0 }), this.props.onHide(this.state.hideSource);
                      }),
                      s(this, 'enter', () => {
                        this.props.onShow();
                      }),
                      s(this, 'show', () => {
                        this.state.hidden &&
                          (this.setState({ willHide: !1, hidden: !1 }),
                          setTimeout(
                            function () {
                              this.addTransitionListener(this.content, this.enter);
                            }.bind(this),
                            0
                          ));
                      }),
                      s(this, 'hide', () => {
                        this.hasHidden() || this.setState({ willHide: !0 });
                      }),
                      s(this, 'listenKeyboard', e => {
                        'function' == typeof this.props.keyboard
                          ? this.props.keyboard(e)
                          : this.closeOnEsc(e);
                      }),
                      s(this, 'closeOnEsc', e => {
                        !this.props.keyboard ||
                          ('Escape' !== e.key && 27 !== e.keyCode) ||
                          this.hide();
                      }),
                      s(this, 'UNSAFE_componentDidMount', () => {
                        window.addEventListener('keydown', this.listenKeyboard, !0);
                      }),
                      s(this, 'UNSAFE_componentWillUnmount', () => {
                        window.removeEventListener('keydown', this.listenKeyboard, !0);
                      });
                  }
                  render() {
                    if (this.state.hidden) return null;
                    const { willHide: e } = this.state,
                      { modalStyle: t, testId: n } = this.props,
                      a = {
                        animationName: e ? d.hideBackdropAnimation : d.showBackdropAnimation,
                        animationTimingFunction: (e ? d.hide : d.show).animationTimingFunction,
                        ...this.props.backdropStyle,
                      },
                      o = {
                        animationDuration: (e ? d.hide : d.show).animationDuration,
                        animationName: e ? d.hideContentAnimation : d.showContentAnimation,
                        animationTimingFunction: (e ? d.hide : d.show).animationTimingFunction,
                        ...this.props.contentStyle,
                      },
                      i = this.props.backdrop
                        ? r.default.createElement('div', {
                            className: 'modal__backdrop',
                            style: a,
                            onClick: this.props.closeOnClick ? this.handleBackdropClick : null,
                          })
                        : undefined;
                    return (
                      e && this.addTransitionListener(this.content, this.leave),
                      r.default.createElement(
                        'span',
                        null,
                        r.default.createElement(
                          'div',
                          { className: 'modal', style: t, 'data-testid': n },
                          r.default.createElement(
                            'div',
                            {
                              className: 'modal__content',
                              ref: e => (this.content = e),
                              tabIndex: '-1',
                              style: o,
                            },
                            this.props.children
                          )
                        ),
                        i
                      )
                    );
                  }
                }
                s(f, 'propTypes', {
                  backdrop: o.default.bool,
                  backdropStyle: o.default.object,
                  closeOnClick: o.default.bool,
                  contentStyle: o.default.object,
                  keyboard: o.default.bool,
                  modalStyle: o.default.object,
                  onShow: o.default.func,
                  onHide: o.default.func,
                  children: o.default.node,
                  testId: o.default.string,
                }),
                  s(f, 'defaultProps', {
                    testId: '',
                    onShow: () => undefined,
                    onHide: () => undefined,
                    keyboard: !0,
                    backdrop: !0,
                    closeOnClick: !0,
                    modalStyle: {},
                    backdropStyle: {},
                    contentStyle: {},
                    children: [],
                  });
                n.default = f;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/fade-modal.js' },
    ],
    [
      6073,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/constants/routes': 6878,
        '../../../../store/actions': 7619,
        '../../../ui/button': 6707,
        '../../../ui/identicon': 6758,
        'prop-types': 5082,
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
                var a = m(e('prop-types')),
                  r = f(e('react')),
                  o = e('react-redux'),
                  i = f(e('../../../../store/actions')),
                  s = m(e('../../../ui/identicon')),
                  l = m(e('../../../ui/button')),
                  c = e('../../../../helpers/constants/routes'),
                  u = e('../../../../../shared/constants/metametrics'),
                  d = e('../../../../../shared/modules/selectors/networks');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function f(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = p(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var o in e)
                    if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                      var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                      i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function h(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class g extends r.Component {
                  constructor(...e) {
                    super(...e), h(this, 'state', {});
                  }
                  render() {
                    const {
                        chainId: e,
                        token: t,
                        hideToken: n,
                        hideModal: a,
                        history: o,
                        networkConfigurationsByChainId: i,
                      } = this.props,
                      { symbol: d, address: p, image: f, chainId: m } = t,
                      h = i[m || e],
                      { defaultRpcEndpointIndex: g } = h,
                      { networkClientId: y } = h.rpcEndpoints[g];
                    return r.default.createElement(
                      'div',
                      { className: 'hide-token-confirmation__container' },
                      r.default.createElement(
                        'div',
                        { className: 'hide-token-confirmation__title' },
                        this.context.t('hideTokenPrompt')
                      ),
                      r.default.createElement(s.default, {
                        className: 'hide-token-confirmation__identicon',
                        diameter: 45,
                        address: p,
                        image: f,
                      }),
                      r.default.createElement(
                        'div',
                        { className: 'hide-token-confirmation__symbol' },
                        d
                      ),
                      r.default.createElement(
                        'div',
                        { className: 'hide-token-confirmation__copy' },
                        this.context.t('readdToken')
                      ),
                      r.default.createElement(
                        'div',
                        { className: 'hide-token-confirmation__buttons' },
                        r.default.createElement(
                          l.default,
                          {
                            type: 'secondary',
                            className: 'hide-token-confirmation__button',
                            'data-testid': 'hide-token-confirmation__cancel',
                            onClick: () => a(),
                          },
                          this.context.t('cancel')
                        ),
                        r.default.createElement(
                          l.default,
                          {
                            type: 'primary',
                            className: 'hide-token-confirmation__button',
                            'data-testid': 'hide-token-confirmation__hide',
                            onClick: () => {
                              this.context.trackEvent({
                                event: u.MetaMetricsEventName.TokenRemoved,
                                category: u.MetaMetricsEventCategory.Tokens,
                                sensitiveProperties: {
                                  chain_id: e,
                                  token_contract_address: p,
                                  token_symbol: d,
                                },
                              }),
                                n(p, y),
                                o.push(c.DEFAULT_ROUTE);
                            },
                          },
                          this.context.t('hide')
                        )
                      )
                    );
                  }
                }
                h(g, 'contextTypes', { t: a.default.func, trackEvent: a.default.func }),
                  h(g, 'propTypes', {
                    hideToken: a.default.func.isRequired,
                    hideModal: a.default.func.isRequired,
                    chainId: a.default.string.isRequired,
                    networkConfigurationsByChainId: a.default.object.isRequired,
                    token: a.default.shape({
                      symbol: a.default.string,
                      address: a.default.string,
                      image: a.default.string,
                      chainId: a.default.string,
                    }),
                    history: a.default.object,
                  });
                n.default = (0, o.connect)(
                  function (e) {
                    return {
                      chainId: (0, d.getCurrentChainId)(e),
                      token: e.appState.modal.modalState.props.token,
                      history: e.appState.modal.modalState.props.history,
                      networkConfigurationsByChainId: (0, d.getNetworkConfigurationsByChainId)(e),
                    };
                  },
                  function (e) {
                    return {
                      hideModal: () => e(i.hideModal()),
                      hideToken: async (t, n) => {
                        await e(i.ignoreTokens({ tokensToIgnore: t, networkClientId: n })),
                          e(i.hideModal());
                      },
                    };
                  }
                )(g);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/hide-token-confirmation-modal/hide-token-confirmation-modal.js',
      },
    ],
    [
      6074,
      { './hide-token-confirmation-modal': 6073 },
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
                var a,
                  r =
                    (a = e('./hide-token-confirmation-modal')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/hide-token-confirmation-modal/index.js',
      },
    ],
    [
      6075,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../hold-to-reveal-button/hold-to-reveal-button': 6028,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function ({
                    isOpen: e,
                    onClose: t,
                    onLongPressed: n,
                    holdToRevealType: c,
                  }) {
                    const u = (0, i.useI18nContext)(),
                      d = 'SRP' === c ? 'holdToRevealSRPTitle' : 'holdToRevealPrivateKeyTitle',
                      p = 'SRP' === c ? 'holdToRevealSRP' : 'holdToRevealPrivateKey',
                      f = 'SRP' === c ? 'holdToRevealContent' : 'holdToRevealContentPrivateKey',
                      m = `${f}1`,
                      h = `${f}2`;
                    u('holdToRevealContentPrivateKey1'),
                      u('holdToRevealContentPrivateKey2'),
                      u('holdToRevealContent1'),
                      u('holdToRevealContent2');
                    const g = () =>
                      a.default.createElement(
                        s.Box,
                        {
                          display: r.Display.Flex,
                          flexDirection: r.FlexDirection.Column,
                          gap: 4,
                          marginTop: 4,
                          marginBottom: 6,
                        },
                        a.default.createElement(
                          s.Text,
                          { variant: r.TextVariant.bodyMd },
                          u(m, [
                            a.default.createElement(
                              s.Text,
                              {
                                key: 'hold-to-reveal-2',
                                variant: r.TextVariant.bodyMdBold,
                                as: 'span',
                              },
                              u(h)
                            ),
                          ])
                        ),
                        a.default.createElement(
                          s.Text,
                          { variant: r.TextVariant.bodyMdBold },
                          u('holdToRevealContent3', [
                            a.default.createElement(
                              s.Text,
                              {
                                key: 'hold-to-reveal-4',
                                variant: r.TextVariant.bodyMd,
                                as: 'span',
                                display: r.Display.Inline,
                              },
                              u('holdToRevealContent4')
                            ),
                            a.default.createElement(
                              s.Button,
                              {
                                key: 'hold-to-reveal-5',
                                variant: s.ButtonVariant.Link,
                                size: s.ButtonSize.Inherit,
                                href: o.default.NON_CUSTODIAL_WALLET,
                                externalLink: !0,
                              },
                              u('holdToRevealContent5')
                            ),
                          ])
                        )
                      );
                    return a.default.createElement(
                      s.Modal,
                      { isOpen: e, onClose: t },
                      a.default.createElement(s.ModalOverlay, null),
                      a.default.createElement(
                        s.ModalContent,
                        null,
                        a.default.createElement(s.ModalHeader, { onClose: t }, u(d)),
                        a.default.createElement(
                          s.Container,
                          { paddingLeft: 4, paddingRight: 4 },
                          a.default.createElement(g, null),
                          a.default.createElement(l.default, { buttonText: u(p), onLongPressed: n })
                        )
                      )
                    );
                  });
                var a = c(e('react')),
                  r = e('../../../../helpers/constants/design-system'),
                  o = c(e('../../../../helpers/constants/zendesk-url')),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../component-library'),
                  l = c(e('../../hold-to-reveal-button/hold-to-reveal-button'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/hold-to-reveal-modal/hold-to-reveal-modal.tsx',
      },
    ],
    [
      6076,
      { './modal': 6079 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Modal', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var a,
                  r = (a = e('./modal')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/index.js' },
    ],
    [
      6077,
      { './keyring-snap-removal-result-modal': 6078 },
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
                var a,
                  r =
                    (a = e('./keyring-snap-removal-result-modal')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/keyring-snap-removal-modal/index.ts' },
    ],
    [
      6078,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../../../component-library/modal-content/deprecated': 6412,
        '../../../component-library/modal-header/deprecated': 6421,
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
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = e('../../../component-library/modal-content/deprecated'),
                  c = e('../../../component-library/modal-header/deprecated'),
                  u = e('../../../../hooks/useI18nContext'),
                  d = e('../../../../selectors');
                n.default = ({ isOpen: e, onClose: t }) => {
                  const n = (0, u.useI18nContext)(),
                    a = (0, o.useSelector)(d.getKeyringSnapRemovalResult);
                  return r.default.createElement(
                    r.default.Fragment,
                    null,
                    r.default.createElement(
                      s.Modal,
                      { isOpen: e, onClose: () => t() },
                      r.default.createElement(s.ModalOverlay, null),
                      r.default.createElement(
                        l.ModalContent,
                        {
                          modalDialogProps: {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                            gap: 4,
                          },
                        },
                        r.default.createElement(c.ModalHeader, { onClose: t }, ''),
                        r.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                            justifyContent: i.JustifyContent.center,
                            alignItems: i.AlignItems.center,
                          },
                          r.default.createElement(s.Icon, {
                            name:
                              'success' === a.result ? s.IconName.Confirmation : s.IconName.Danger,
                            color:
                              'success' === a.result
                                ? i.IconColor.successDefault
                                : i.IconColor.errorDefault,
                            size: s.IconSize.Xl,
                            marginBottom: 4,
                          }),
                          r.default.createElement(
                            s.Text,
                            { variant: i.TextVariant.bodyMdBold, textAlign: i.TextAlign.Center },
                            n('keyringSnapRemovalResult1', [
                              a.snapName,
                              'failed' === a.result
                                ? n('keyringSnapRemovalResultNotSuccessful')
                                : '',
                            ])
                          )
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
        file: 'ui/components/app/modals/keyring-snap-removal-modal/keyring-snap-removal-result-modal.tsx',
      },
    ],
    [
      6079,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../helpers/utils/is-mobile-view': 6906,
        '../../../store/actions': 7619,
        './confirm-delete-network': 6057,
        './confirm-remove-account': 6060,
        './confirm-reset-account': 6063,
        './confirm-turn-off-profile-syncing': 6065,
        './convert-token-to-nft-modal/convert-token-to-nft-modal': 6066,
        './customize-nonce': 6068,
        './edit-approval-permission': 6071,
        './fade-modal': 6072,
        './hide-token-confirmation-modal': 6074,
        './new-account-modal': 6080,
        './qr-scanner': 6085,
        './reject-transactions': 6089,
        './transaction-already-confirmed': 6092,
        './transaction-confirmed': 6094,
        './turn-on-metamask-notifications/turn-on-metamask-notifications': 6097,
        'prop-types': 5082,
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
                var a = C(e('prop-types')),
                  r = E(e('react')),
                  o = e('react-redux'),
                  i = e('../../../../app/scripts/lib/util'),
                  s = e('../../../../shared/constants/app'),
                  l = C(e('../../../helpers/utils/is-mobile-view')),
                  c = E(e('../../../store/actions')),
                  u = C(e('./hide-token-confirmation-modal')),
                  d = C(e('./qr-scanner')),
                  p = C(e('./confirm-remove-account')),
                  f = C(e('./confirm-reset-account')),
                  m = C(e('./transaction-confirmed')),
                  h = C(e('./confirm-delete-network')),
                  g = C(e('./convert-token-to-nft-modal/convert-token-to-nft-modal')),
                  y = C(e('./customize-nonce')),
                  b = C(e('./edit-approval-permission')),
                  v = C(e('./fade-modal')),
                  k = C(e('./new-account-modal')),
                  _ = C(e('./reject-transactions')),
                  x = C(e('./transaction-already-confirmed')),
                  w = C(e('./confirm-turn-off-profile-syncing')),
                  M = C(e('./turn-on-metamask-notifications/turn-on-metamask-notifications'));
                function T(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (T = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function E(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = T(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var o in e)
                    if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                      var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                      i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const S = {
                    transform: 'translate3d(-50%, 0, 0px)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-default)',
                    boxShadow: 'var(--shadow-size-sm) var(--color-shadow-default)',
                  },
                  O = { ...S, width: '344px', top: '15%' },
                  I = { ...S, width: '309px', top: '12.5%' },
                  P = {
                    NEW_ACCOUNT: {
                      contents: r.default.createElement(k.default, null),
                      mobileModalStyle: {
                        width: '95%',
                        top: '10%',
                        boxShadow: 'var(--shadow-size-xs) var(--color-shadow-default)',
                        transform: 'none',
                        left: '0',
                        right: '0',
                        margin: '0 auto',
                        borderRadius: '10px',
                      },
                      laptopModalStyle: {
                        width: '375px',
                        top: '10%',
                        boxShadow: 'var(--shadow-size-xs) var(--color-shadow-default)',
                        transform: 'none',
                        left: '0',
                        right: '0',
                        margin: '0 auto',
                        borderRadius: '10px',
                      },
                      contentStyle: { borderRadius: '10px' },
                    },
                    HIDE_TOKEN_CONFIRMATION: {
                      contents: r.default.createElement(u.default, null),
                      testId: 'hide-token-confirmation-modal',
                      mobileModalStyle: {
                        width: '95%',
                        top:
                          (0, i.getEnvironmentType)() === s.ENVIRONMENT_TYPE_POPUP
                            ? '52vh'
                            : '36.5vh',
                      },
                      laptopModalStyle: {
                        width:
                          (0, i.getEnvironmentType)() === s.ENVIRONMENT_TYPE_POPUP
                            ? '400px'
                            : '449px',
                        top: 'calc(33% + 45px)',
                        paddingLeft:
                          (0, i.getEnvironmentType)() === s.ENVIRONMENT_TYPE_POPUP ? '16px' : null,
                        paddingRight:
                          (0, i.getEnvironmentType)() === s.ENVIRONMENT_TYPE_POPUP ? '16px' : null,
                      },
                    },
                    CONFIRM_RESET_ACCOUNT: {
                      contents: r.default.createElement(f.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    CONFIRM_REMOVE_ACCOUNT: {
                      contents: r.default.createElement(p.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    CONVERT_TOKEN_TO_NFT: {
                      contents: r.default.createElement(g.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    CONFIRM_DELETE_NETWORK: {
                      contents: r.default.createElement(h.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    EDIT_APPROVAL_PERMISSION: {
                      contents: r.default.createElement(b.default, null),
                      mobileModalStyle: {
                        width: '95vw',
                        height: '100vh',
                        top: '50px',
                        transform: 'none',
                        left: '0',
                        right: '0',
                        margin: '0 auto',
                      },
                      laptopModalStyle: {
                        width: 'auto',
                        height: '0px',
                        top: '80px',
                        left: '0px',
                        transform: 'none',
                        margin: '0 auto',
                        position: 'relative',
                      },
                      contentStyle: { borderRadius: '8px' },
                    },
                    TRANSACTION_CONFIRMED: {
                      disableBackdropClick: !0,
                      contents: r.default.createElement(m.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    TRANSACTION_ALREADY_CONFIRMED: {
                      disableBackdropClick: !0,
                      contents: r.default.createElement(x.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                    },
                    QR_SCANNER: {
                      contents: r.default.createElement(d.default, null),
                      testId: 'qr-scanner-modal',
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    REJECT_TRANSACTIONS: {
                      contents: r.default.createElement(_.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    CUSTOMIZE_NONCE: {
                      contents: r.default.createElement(y.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    CONFIRM_TURN_OFF_PROFILE_SYNCING: {
                      contents: r.default.createElement(w.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    TURN_ON_METAMASK_NOTIFICATIONS: {
                      contents: r.default.createElement(M.default, null),
                      mobileModalStyle: { ...I },
                      laptopModalStyle: { ...O },
                      contentStyle: { borderRadius: '8px' },
                    },
                    DEFAULT: { contents: [], mobileModalStyle: {}, laptopModalStyle: {} },
                  },
                  j = { backgroundColor: 'var(--color-overlay-default)' };
                class N extends r.Component {
                  hide() {
                    this.modalRef.hide();
                  }
                  show() {
                    this.modalRef.show();
                  }
                  UNSAFE_componentWillReceiveProps(e, t) {
                    e.active ? this.show() : this.props.active && this.hide();
                  }
                  render() {
                    const e = P[this.props.modalState.name || 'DEFAULT'],
                      { contents: t, disableBackdropClick: n = !1, testId: a } = e,
                      o = e[(0, l.default)() ? 'mobileModalStyle' : 'laptopModalStyle'],
                      i = e.contentStyle || {};
                    return r.default.createElement(
                      v.default,
                      {
                        keyboard: !1,
                        onHide: () => {
                          e.onHide && e.onHide({ hideWarning: this.props.hideWarning }),
                            this.props.hideModal(e.customOnHideOpts);
                        },
                        ref: e => {
                          this.modalRef = e;
                        },
                        modalStyle: o,
                        contentStyle: i,
                        backdropStyle: j,
                        closeOnClick: !n,
                        testId: a,
                      },
                      t
                    );
                  }
                }
                var D, A, B;
                (D = N),
                  (A = 'propTypes'),
                  (B = {
                    active: a.default.bool.isRequired,
                    hideModal: a.default.func.isRequired,
                    hideWarning: a.default.func.isRequired,
                    modalState: a.default.object.isRequired,
                  }),
                  (A = (function (e) {
                    var t = (function (e, t) {
                      if ('object' != typeof e || !e) return e;
                      var n = e[Symbol.toPrimitive];
                      if (void 0 !== n) {
                        var a = n.call(e, t || 'default');
                        if ('object' != typeof a) return a;
                        throw new TypeError('@@toPrimitive must return a primitive value.');
                      }
                      return ('string' === t ? String : Number)(e);
                    })(e, 'string');
                    return 'symbol' == typeof t ? t : t + '';
                  })(A)) in D
                    ? Object.defineProperty(D, A, {
                        value: B,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (D[A] = B);
                n.default = (0, o.connect)(
                  function (e) {
                    return {
                      active: e.appState.modal.open,
                      modalState: e.appState.modal.modalState,
                    };
                  },
                  function (e) {
                    return {
                      hideModal: t => {
                        e(c.hideModal()), t && t.action && e(t.action(...t.args));
                      },
                      hideWarning: () => {
                        e(c.hideWarning());
                      },
                    };
                  }
                )(N);
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/modal.js' },
    ],
    [
      6080,
      { './new-account-modal.container': 6082 },
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
                var a,
                  r = (a = e('./new-account-modal.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/new-account-modal/index.js' },
    ],
    [
      6081,
      {
        '../../../component-library': 6402,
        '../../../ui/button/button.component': 6706,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = s(e('prop-types')),
                  o = s(e('../../../ui/button/button.component')),
                  i = e('../../../component-library');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function c(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class u extends a.Component {
                  constructor(...e) {
                    super(...e),
                      c(this, 'state', {
                        alias: this.context.t('newAccountNumberName', [
                          this.props.newAccountNumber,
                        ]),
                      }),
                      c(this, 'onChange', e => {
                        this.setState({ alias: e.target.value });
                      }),
                      c(this, 'onSubmit', async () => {
                        await this.props.onSave(this.state.alias).then(this.props.hideModal);
                      }),
                      c(this, 'onKeyPress', e => {
                        'Enter' === e.key && this.state.alias && this.onSubmit();
                      });
                  }
                  render() {
                    const { t: e } = this.context;
                    return a.default.createElement(
                      'div',
                      { className: 'new-account-modal' },
                      a.default.createElement(
                        'div',
                        { className: 'new-account-modal__content' },
                        a.default.createElement(
                          'div',
                          { className: 'new-account-modal__content__header' },
                          e('newAccount'),
                          a.default.createElement(i.ButtonIcon, {
                            className: 'new-account-modal__content__header-close',
                            ariaLabel: e('close'),
                            onClick: this.props.hideModal,
                            iconName: i.IconName.Close,
                          })
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'new-account-modal__input-label' },
                          e('accountName')
                        ),
                        a.default.createElement('input', {
                          type: 'text',
                          className: 'new-account-modal__input',
                          onChange: this.onChange,
                          onKeyPress: this.onKeyPress,
                          value: this.state.alias,
                          autoFocus: !0,
                        })
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'new-account-modal__footer' },
                        a.default.createElement(
                          o.default,
                          { type: 'secondary', onClick: this.props.hideModal },
                          e('cancel')
                        ),
                        a.default.createElement(
                          o.default,
                          { type: 'primary', onClick: this.onSubmit, disabled: !this.state.alias },
                          e('save')
                        )
                      )
                    );
                  }
                }
                (n.default = u),
                  c(u, 'contextTypes', { t: r.default.func }),
                  c(u, 'propTypes', {
                    hideModal: r.default.func.isRequired,
                    newAccountNumber: r.default.number.isRequired,
                    onSave: r.default.func.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/new-account-modal/new-account-modal.component.js',
      },
    ],
    [
      6082,
      {
        '../../../../store/actions': 7619,
        './new-account-modal.component': 6081,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = e('react-redux'),
                  o = e('../../../../store/actions'),
                  i = (a = e('./new-account-modal.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.connect)(
                  function (e) {
                    return { ...(e.appState.modal.modalState.props || {}) };
                  },
                  function (e) {
                    return {
                      hideModal: () => e((0, o.hideModal)()),
                      createAccount: async t => {
                        const n = await e((0, o.addNewAccount)());
                        return (
                          t && e((0, o.setAccountLabel)(n, t)),
                          await (0, o.forceUpdateMetamaskState)(e),
                          n
                        );
                      },
                    };
                  },
                  function (e, t) {
                    const { onCreateNewAccount: n } = e,
                      { createAccount: a } = t;
                    return {
                      ...e,
                      ...t,
                      onSave: e =>
                        a(e).then(e => {
                          n(e);
                        }),
                    };
                  }
                )(i.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/new-account-modal/new-account-modal.container.js',
      },
    ],
    [
      6083,
      { './nickname-popovers.component': 6084 },
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
                var a,
                  r = (a = e('./nickname-popovers.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/nickname-popovers/index.js' },
    ],
    [
      6084,
      {
        '../../../../helpers/utils/multichain/blockExplorer': 6909,
        '../../../../hooks/useMultichainSelector': 6993,
        '../../../../selectors': 7601,
        '../../../../selectors/multichain': 7605,
        '../../../../store/actions': 7619,
        '../../../ui/nickname-popover': 6779,
        '../../../ui/update-nickname-popover/update-nickname-popover': 6826,
        'prop-types': 5082,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = f(e('prop-types')),
                  i = e('../../../../helpers/utils/multichain/blockExplorer'),
                  s = e('../../../../store/actions'),
                  l = e('../../../../selectors'),
                  c = f(e('../../../ui/nickname-popover')),
                  u = f(e('../../../ui/update-nickname-popover/update-nickname-popover')),
                  d = e('../../../../selectors/multichain'),
                  p = e('../../../../hooks/useMultichainSelector');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const h = 'SHOW_NICKNAME_POPOVER',
                  g = 'ADD_NICKNAME_POPOVER',
                  y = ({ address: e, onClose: t }) => {
                    const n = (0, r.useDispatch)(),
                      [o, f] = (0, a.useState)(h),
                      m = (0, r.useSelector)(l.getAddressBook).find(t => t.address === e),
                      y = null == m ? void 0 : m.name,
                      b = (0, r.useSelector)(t => (0, l.getInternalAccountByAddress)(t, e)),
                      v = (0, p.useMultichainSelector)(d.getMultichainNetwork, b),
                      k = (0, i.getMultichainAccountUrl)(e, v);
                    return o === g
                      ? a.default.createElement(u.default, {
                          address: e,
                          nickname: y || null,
                          memo: (null == m ? void 0 : m.memo) || null,
                          onClose: () => f(h),
                          onAdd: (e, t, a) => n((0, s.addToAddressBook)(e, t, a)),
                        })
                      : a.default.createElement(c.default, {
                          address: e,
                          nickname: y || null,
                          onClose: t,
                          onAdd: () => f(g),
                          explorerLink: k,
                        });
                  };
                y.propTypes = { address: o.default.string, onClose: o.default.func };
                n.default = y;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/nickname-popovers/nickname-popovers.component.js',
      },
    ],
    [
      6085,
      { './qr-scanner.container': 6087 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./qr-scanner.container')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/qr-scanner/index.js' },
    ],
    [
      6086,
      {
        '../../../../../app/scripts/lib/util': 204,
        '../../../../../shared/constants/app': 5789,
        '../../../../../shared/constants/time': 5817,
        '../../../../helpers/utils/util': 6921,
        '../../../../helpers/utils/webcam-utils': 6922,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/usePrevious': 7002,
        '../../../ui/page-container/page-container-footer/page-container-footer.component': 6785,
        '../../../ui/spinner': 6802,
        './scan-util': 6088,
        '@zxing/browser': 3656,
        loglevel: 4929,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = x);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = b(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = y(e('prop-types')),
                  o = y(e('loglevel')),
                  i = e('@zxing/browser'),
                  s = e('../../../../hooks/usePrevious'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = e('../../../../../app/scripts/lib/util'),
                  u = e('../../../../helpers/utils/util'),
                  d = y(e('../../../../helpers/utils/webcam-utils')),
                  p = y(
                    e(
                      '../../../ui/page-container/page-container-footer/page-container-footer.component'
                    )
                  ),
                  f = y(e('../../../ui/spinner')),
                  m = e('../../../../../shared/constants/app'),
                  h = e('../../../../../shared/constants/time'),
                  g = e('./scan-util');
                function y(e) {
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
                const v = {
                    ACCESSING_CAMERA: 'ACCESSING_CAMERA',
                    NEED_TO_ALLOW_ACCESS: 'NEED_TO_ALLOW_ACCESS',
                    READY: 'READY',
                  },
                  k = 'ethereum:',
                  _ = e => {
                    let t = 'unknown',
                      n = {};
                    return (
                      e.split(k).length > 1 && 51 === e.length
                        ? ((t = 'address'), (n = { address: (0, g.parseScanContent)(e) }))
                        : '0x' === e.substring(0, 2).toLowerCase() &&
                          42 === e.length &&
                          ((t = 'address'), (n = { address: e })),
                      { type: t, values: n }
                    );
                  };
                function x({ hideModal: e, qrCodeDetected: t }) {
                  const n = (0, l.useI18nContext)(),
                    [r, g] = (0, a.useState)(v.ACCESSING_CAMERA),
                    y = (0, s.usePrevious)(r),
                    [b, k] = (0, a.useState)(null),
                    [x, w] = (0, a.useState)(!1),
                    [M, T] = (0, a.useState)(null),
                    [E, C] = (0, a.useState)(null),
                    S = (0, a.useCallback)(async () => {
                      try {
                        const { permissions: e } = await d.default.checkStatus();
                        if (e) {
                          if ((await new Promise(e => setTimeout(e, 2 * h.SECOND)), !x)) return;
                          g(v.READY);
                        } else x && C(setTimeout(this.checkPermissions, h.SECOND));
                      } catch (e) {
                        x && k({ error: e });
                      }
                    }, [x]),
                    O = (0, a.useCallback)(() => {
                      M &&
                        (M.constructor.cleanVideoSource(),
                        M.constructor.releaseAllStreams(),
                        T(null));
                    }, [M]),
                    I = (0, a.useCallback)(() => {
                      M && O(e), e();
                    }, [M, e, O]),
                    P = (0, a.useCallback)(async () => {
                      M || T(new i.BrowserQRCodeReader());
                    }, [M]);
                  (0, a.useEffect)(() => {
                    (async () => {
                      if (M)
                        try {
                          await S(), await M.constructor.listVideoInputDevices();
                          const e = await M.decodeOnceFromVideoDevice(undefined, 'video'),
                            a = _(e.text);
                          x &&
                            ('unknown' === a.type ? k(new Error(n('unknownQrCode'))) : (t(a), I()));
                        } catch (e) {
                          if (x) return;
                          'NotAllowedError' === e.name
                            ? (o.default.info(`Permission denied: '${e}'`),
                              g(v.NEED_TO_ALLOW_ACCESS))
                            : k(e);
                        }
                    })();
                  }, [S, M, x, t, I, n]);
                  const j = async () => {
                    try {
                      const { environmentReady: e } = await d.default.checkStatus();
                      if (!e && (0, c.getEnvironmentType)() !== m.ENVIRONMENT_TYPE_FULLSCREEN) {
                        const e = (0, u.getURL)(window.location.href),
                          t = null == e ? void 0 : e.hash,
                          n = t ? t.substring(1) : null;
                        global.platform.openExtensionInBrowser(n);
                      }
                    } catch (e) {
                      x && k({ error: e });
                    }
                    await P();
                  };
                  (0, a.useEffect)(() => {
                    w(!0),
                      (async () => {
                        await j();
                      })();
                  }, []),
                    (0, a.useEffect)(() => {
                      (async () => {
                        y !== r &&
                          (r === v.READY ? await P() : r === v.NEED_TO_ALLOW_ACCESS && (await S()));
                      })();
                    }, [y, r, P, S]);
                  const N = async () => {
                    clearTimeout(E), M && O(), g(v.ACCESSING_CAMERA), k(null), await j();
                  };
                  return a.default.createElement(
                    'div',
                    { className: 'qr-scanner' },
                    a.default.createElement('div', { className: 'qr-scanner__close', onClick: I }),
                    b
                      ? (() => {
                          let e, t;
                          return (
                            'NO_WEBCAM_FOUND' === b.type
                              ? ((e = n('noWebcamFoundTitle')), (t = n('noWebcamFound')))
                              : b.message === n('unknownQrCode')
                                ? (t = n('unknownQrCode'))
                                : ((e = n('generalCameraErrorTitle')),
                                  (t = n('generalCameraError'))),
                            a.default.createElement(
                              a.default.Fragment,
                              null,
                              a.default.createElement(
                                'div',
                                { className: 'qr-scanner__image' },
                                a.default.createElement('img', {
                                  src: 'images/webcam.svg',
                                  width: '70',
                                  height: '70',
                                  alt: '',
                                })
                              ),
                              e &&
                                a.default.createElement(
                                  'div',
                                  { className: 'qr-scanner__title' },
                                  e
                                ),
                              a.default.createElement('div', { className: 'qr-scanner__error' }, t),
                              a.default.createElement(p.default, {
                                onCancel: I,
                                onSubmit: N,
                                cancelText: n('cancel'),
                                submitText: n('tryAgain'),
                              })
                            )
                          );
                        })()
                      : a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(
                            'div',
                            { className: 'qr-scanner__title' },
                            `${n('scanQrCode')}`
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'qr-scanner__content' },
                            a.default.createElement(
                              'div',
                              { className: 'qr-scanner__content__video-wrapper' },
                              a.default.createElement('video', {
                                id: 'video',
                                style: { display: r === v.READY ? 'block' : 'none' },
                              }),
                              r !== v.READY && a.default.createElement(f.default, null)
                            )
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'qr-scanner__status' },
                            (e => {
                              let t;
                              switch (e) {
                                case v.ACCESSING_CAMERA:
                                  t = n('accessingYourCamera');
                                  break;
                                case v.READY:
                                  t = n('scanInstructions');
                                  break;
                                case v.NEED_TO_ALLOW_ACCESS:
                                  t = n('youNeedToAllowCameraAccess');
                                  break;
                                default:
                                  t = n('accessingYourCamera');
                              }
                              return t;
                            })(r)
                          )
                        )
                  );
                }
                x.propTypes = {
                  hideModal: r.default.func.isRequired,
                  qrCodeDetected: r.default.func.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/qr-scanner/qr-scanner.component.js' },
    ],
    [
      6087,
      { '../../../../store/actions': 7619, './qr-scanner.component': 6086, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = e('react-redux'),
                  o = e('../../../../store/actions'),
                  i = (a = e('./qr-scanner.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.connect)(null, e => ({
                  hideModal: () => e((0, o.hideModal)()),
                  qrCodeDetected: t => e((0, o.qrCodeDetected)(t)),
                }))(i.default);
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/qr-scanner/qr-scanner.container.js' },
    ],
    [
      6088,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.parseScanContent = function (e) {
                    const t = e.match(/^[a-zA-Z]+:(0x[0-9a-fA-F]{40})(?:@.*)?/u);
                    if (!t) return null;
                    return t[1];
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/qr-scanner/scan-util.ts' },
    ],
    [
      6089,
      { './reject-transactions.container': 6091 },
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
                var a,
                  r =
                    (a = e('./reject-transactions.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/reject-transactions/index.js' },
    ],
    [
      6090,
      { '../../modal': 6051, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = s(e('prop-types')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = i(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, o, s) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = s(e('../../modal'));
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class c extends r.PureComponent {
                  constructor(...e) {
                    super(...e),
                      l(this, 'onSubmit', async () => {
                        const { onSubmit: e, hideModal: t } = this.props;
                        await e(), t();
                      });
                  }
                  render() {
                    const { t: e } = this.context,
                      { hideModal: t, unapprovedTxCount: n, isRequestType: a } = this.props;
                    return r.default.createElement(
                      o.default,
                      {
                        headerText: e(a ? 'rejectRequestsN' : 'rejectTxsN', [n]),
                        onClose: t,
                        onSubmit: this.onSubmit,
                        onCancel: t,
                        submitText: e('rejectAll'),
                        cancelText: e('cancel'),
                      },
                      r.default.createElement(
                        'div',
                        null,
                        r.default.createElement(
                          'div',
                          { className: 'reject-transactions__description' },
                          e(a ? 'rejectRequestsDescription' : 'rejectTxsDescription', [n])
                        )
                      )
                    );
                  }
                }
                (n.default = c),
                  l(c, 'contextTypes', { t: a.default.func.isRequired }),
                  l(c, 'propTypes', {
                    onSubmit: a.default.func.isRequired,
                    hideModal: a.default.func.isRequired,
                    unapprovedTxCount: a.default.number.isRequired,
                    isRequestType: a.default.bool,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/reject-transactions/reject-transactions.component.js',
      },
    ],
    [
      6091,
      {
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        './reject-transactions.component': 6090,
        'react-redux': 5286,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  r = e('redux'),
                  o = s(e('../../../../helpers/higher-order-components/with-modal-props')),
                  i = s(e('./reject-transactions.component'));
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, r.compose)(
                  o.default,
                  (0, a.connect)((e, t) => {
                    const { unapprovedTxCount: n } = t;
                    return { unapprovedTxCount: n };
                  })
                )(i.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/reject-transactions/reject-transactions.container.js',
      },
    ],
    [
      6092,
      { './transaction-already-confirmed': 6093 },
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
                var a,
                  r =
                    (a = e('./transaction-already-confirmed')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/transaction-already-confirmed/index.ts',
      },
    ],
    [
      6093,
      {
        '../../../../contexts/i18n': 6832,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useModalProps': 6989,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
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
                  (n.default = function () {
                    const {
                        hideModal: e,
                        props: { originalTransactionId: t },
                      } = (0, s.useModalProps)(),
                      n = (0, a.useContext)(u.I18nContext),
                      d = (0, r.useDispatch)(),
                      p = (0, r.useSelector)(e => (0, i.getTransaction)(e, t)),
                      f = (0, r.useSelector)(i.getRpcPrefsForCurrentProvider);
                    return a.default.createElement(
                      l.Modal,
                      { isOpen: !0, onClose: e },
                      a.default.createElement(l.ModalOverlay, null),
                      a.default.createElement(
                        l.ModalContent,
                        null,
                        a.default.createElement(
                          l.ModalHeader,
                          { onClose: e },
                          n('yourTransactionConfirmed')
                        ),
                        a.default.createElement(
                          l.ModalBody,
                          null,
                          a.default.createElement(l.Text, null, n('yourTransactionJustConfirmed'))
                        ),
                        a.default.createElement(l.ModalFooter, {
                          onSubmit: e,
                          onCancel: () => {
                            const t = (0, o.getBlockExplorerLink)(p, f);
                            global.platform.openTab({ url: t }), d(e());
                          },
                          submitButtonProps: { children: n('gotIt') },
                          cancelButtonProps: { children: n('viewOnBlockExplorer') },
                          containerProps: {
                            flexDirection: c.FlexDirection.Column,
                            alignItems: c.AlignItems.stretch,
                          },
                        })
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/etherscan-link'),
                  i = e('../../../../selectors'),
                  s = e('../../../../hooks/useModalProps'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../contexts/i18n');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/transaction-already-confirmed/transaction-already-confirmed.tsx',
      },
    ],
    [
      6094,
      { './transaction-confirmed.container': 6096 },
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
                var a,
                  r =
                    (a = e('./transaction-confirmed.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/modals/transaction-confirmed/index.js' },
    ],
    [
      6095,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../../modal': 6051,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('../../modal')),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class d extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      u(this, 'handleSubmit', () => {
                        const { hideModal: e, onSubmit: t } = this.props;
                        e(), t && 'function' == typeof t && t();
                      });
                  }
                  render() {
                    const { t: e } = this.context;
                    return a.default.createElement(
                      o.default,
                      { onSubmit: this.handleSubmit, submitText: e('ok') },
                      a.default.createElement(
                        'div',
                        { className: 'transaction-confirmed__content' },
                        a.default.createElement(i.Icon, {
                          name: i.IconName.Check,
                          color: s.IconColor.successDefault,
                          size: i.IconSize.Xl,
                        }),
                        a.default.createElement(
                          i.Text,
                          {
                            variant: s.TextVariant.headingMd,
                            fontWeight: s.FontWeight.Medium,
                            textAlign: s.TextAlign.Center,
                          },
                          `${e('confirmed')}!`
                        ),
                        a.default.createElement(
                          i.Text,
                          { textAlign: s.TextAlign.Center },
                          e('initialTransactionConfirmed')
                        )
                      )
                    );
                  }
                }
                (n.default = d),
                  u(d, 'contextTypes', { t: r.default.func }),
                  u(d, 'propTypes', { onSubmit: r.default.func, hideModal: r.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/transaction-confirmed/transaction-confirmed.component.js',
      },
    ],
    [
      6096,
      {
        '../../../../helpers/higher-order-components/with-modal-props': 6893,
        './transaction-confirmed.component': 6095,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('../../../../helpers/higher-order-components/with-modal-props')),
                  r = o(e('./transaction-confirmed.component'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, a.default)(r.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/transaction-confirmed/transaction-confirmed.container.js',
      },
    ],
    [
      6097,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../contexts/i18n': 6832,
        '../../../../contexts/metamask-notifications/metamask-notifications': 6835,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../hooks/metamask-notifications/useNotifications': 6954,
        '../../../../hooks/useModalProps': 6989,
        '../../../../selectors/identity/profile-syncing': 7600,
        '../../../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../../../component-library': 6402,
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
                    const { hideModal: e } = (0, s.useModalProps)(),
                      t = (0, o.useHistory)(),
                      n = (0, a.useContext)(i.I18nContext),
                      y = (0, a.useContext)(c.MetaMetricsContext),
                      { listNotifications: b } = (0, l.useMetamaskNotificationsContext)(),
                      v = (0, r.useSelector)(d.selectIsMetamaskNotificationsEnabled),
                      k = (0, r.useSelector)(d.getIsUpdatingMetamaskNotifications),
                      _ = (0, r.useSelector)(p.selectIsProfileSyncingEnabled),
                      [x, w] = (0, a.useState)(k),
                      { enableNotifications: M, error: T } = (0, f.useEnableNotifications)(),
                      E = () => {
                        e(),
                          w(
                            e => (
                              e ||
                                y({
                                  category: u.MetaMetricsEventCategory.NotificationsActivationFlow,
                                  event: u.MetaMetricsEventName.NotificationsActivated,
                                  properties: {
                                    is_profile_syncing_enabled: _,
                                    action_type: 'dismissed',
                                  },
                                }),
                              e
                            )
                          );
                      };
                    (0, a.useEffect)(() => {
                      v && !T && (t.push(m.NOTIFICATIONS_ROUTE), e(), b());
                    }, [v, T]);
                    const C = a.default.createElement(
                        h.Text,
                        {
                          as: 'a',
                          href: 'https://support.metamask.io/privacy-and-security/profile-privacy',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          key: 'privacy-link',
                          color: g.TextColor.infoDefault,
                        },
                        n('turnOnMetamaskNotificationsMessagePrivacyLink')
                      ),
                      S = a.default.createElement(
                        h.Text,
                        { as: 'span', fontWeight: g.FontWeight.Bold, key: 'strong-text' },
                        n('turnOnMetamaskNotificationsMessagePrivacyBold')
                      );
                    return a.default.createElement(
                      h.Modal,
                      { isOpen: !0, onClose: () => E() },
                      a.default.createElement(h.ModalOverlay, null),
                      a.default.createElement(
                        h.ModalContent,
                        null,
                        a.default.createElement(
                          h.ModalHeader,
                          { onClose: () => E() },
                          n('turnOnMetamaskNotifications')
                        ),
                        a.default.createElement(
                          h.ModalBody,
                          null,
                          a.default.createElement(h.Box, {
                            as: 'img',
                            src: './images/turn-on-metamask-notifications.png',
                            width: g.BlockSize.Full,
                            borderRadius: g.BorderRadius.MD,
                            marginBottom: 4,
                          }),
                          a.default.createElement(
                            h.Text,
                            { as: 'p' },
                            n('turnOnMetamaskNotificationsMessageFirst')
                          ),
                          a.default.createElement(
                            h.Text,
                            { as: 'p', paddingTop: 4 },
                            n('turnOnMetamaskNotificationsMessageSecond', [C])
                          ),
                          a.default.createElement(
                            h.Text,
                            { as: 'p', paddingTop: 4 },
                            n('turnOnMetamaskNotificationsMessageThird', [S])
                          )
                        ),
                        a.default.createElement(h.ModalFooter, {
                          paddingTop: 4,
                          onSubmit: () =>
                            (async () => {
                              w(!0),
                                y({
                                  category: u.MetaMetricsEventCategory.NotificationsActivationFlow,
                                  event: u.MetaMetricsEventName.NotificationsActivated,
                                  properties: {
                                    is_profile_syncing_enabled: !0,
                                    action_type: 'activated',
                                  },
                                }),
                                await M();
                            })(),
                          containerProps: {
                            flexDirection: g.FlexDirection.Column,
                            alignItems: g.AlignItems.stretch,
                          },
                          submitButtonProps: {
                            children: n('turnOnMetamaskNotificationsButton'),
                            loading: x,
                            disabled: x,
                            'data-testid': 'turn-on-notifications-button',
                          },
                        }),
                        T &&
                          a.default.createElement(
                            h.Box,
                            { paddingLeft: 4, paddingRight: 4 },
                            a.default.createElement(
                              h.Text,
                              { as: 'p', color: g.TextColor.errorDefault, paddingTop: 4 },
                              n('turnOnMetamaskNotificationsError')
                            )
                          )
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  i = e('../../../../contexts/i18n'),
                  s = e('../../../../hooks/useModalProps'),
                  l = e('../../../../contexts/metamask-notifications/metamask-notifications'),
                  c = e('../../../../contexts/metametrics'),
                  u = e('../../../../../shared/constants/metametrics'),
                  d = e('../../../../selectors/metamask-notifications/metamask-notifications'),
                  p = e('../../../../selectors/identity/profile-syncing'),
                  f = e('../../../../hooks/metamask-notifications/useNotifications'),
                  m = e('../../../../helpers/constants/routes'),
                  h = e('../../../component-library'),
                  g = e('../../../../helpers/constants/design-system');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/turn-on-metamask-notifications/turn-on-metamask-notifications.tsx',
      },
    ],
    [
      6098,
      { './visit-support-data-consent-modal': 6099 },
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
                var a,
                  r =
                    (a = e('./visit-support-data-consent-modal')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/modals/visit-support-data-consent-modal/index.ts',
      },
    ],
    [
      6099,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/lib/ui-utils': 5852,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/window': 6923,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors/identity/authentication': 7599,
        '../../../../selectors/selectors': 7611,
        '../../../component-library': 6402,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../selectors/identity/authentication'),
                  s = e('../../../../selectors/selectors'),
                  l = e('../../../../helpers/utils/window'),
                  c = e('../../../component-library'),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../../../shared/constants/metametrics'),
                  p = e('../../../../contexts/metametrics'),
                  f = e('../../../../../shared/lib/ui-utils');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ isOpen: e, onClose: t }) => {
                  var n;
                  const m = (0, o.useI18nContext)(),
                    h = (0, a.useContext)(p.MetaMetricsContext),
                    g = (0, r.useSelector)(i.selectSessionData),
                    y =
                      null == g || null === (n = g.profile) || void 0 === n ? void 0 : n.profileId,
                    b = (0, r.useSelector)(s.getMetaMetricsId),
                    v = (0, a.useCallback)(
                      e => {
                        t();
                        let n = f.SUPPORT_LINK;
                        const a = new URLSearchParams();
                        a.append('metamask_version', e.version),
                          e.profileId && a.append('metamask_profile_id', e.profileId),
                          e.metaMetricsId && a.append('metamask_metametrics_id', e.metaMetricsId);
                        const r = a.toString();
                        r && (n += `?${r}`),
                          h(
                            {
                              category: d.MetaMetricsEventCategory.Settings,
                              event: d.MetaMetricsEventName.SupportLinkClicked,
                              properties: { url: n },
                            },
                            {
                              contextPropsIntoEventProperties: [d.MetaMetricsContextProp.PageTitle],
                            }
                          ),
                          (0, l.openWindow)(n);
                      },
                      [t, h]
                    ),
                    k = (0, a.useCallback)(() => {
                      t(),
                        h(
                          {
                            category: d.MetaMetricsEventCategory.Settings,
                            event: d.MetaMetricsEventName.SupportLinkClicked,
                            properties: { url: f.SUPPORT_LINK },
                          },
                          { contextPropsIntoEventProperties: [d.MetaMetricsContextProp.PageTitle] }
                        ),
                        (0, l.openWindow)(f.SUPPORT_LINK);
                    }, [t, h]);
                  return a.default.createElement(
                    c.Modal,
                    {
                      isOpen: e,
                      onClose: t,
                      'data-testid': 'visit-support-data-consent-modal',
                      className: 'visit-support-data-consent-modal',
                    },
                    a.default.createElement(c.ModalOverlay, null),
                    a.default.createElement(
                      c.ModalContent,
                      null,
                      a.default.createElement(
                        c.ModalHeader,
                        null,
                        m('visitSupportDataConsentModalTitle')
                      ),
                      a.default.createElement(
                        c.ModalBody,
                        {
                          paddingLeft: 4,
                          paddingRight: 4,
                          className: 'visit-support-data-consent-modal__body',
                        },
                        a.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.bodyMd },
                          m('visitSupportDataConsentModalDescription')
                        )
                      ),
                      a.default.createElement(
                        c.ModalFooter,
                        null,
                        a.default.createElement(
                          c.Box,
                          { display: u.Display.Flex, gap: 4 },
                          a.default.createElement(
                            c.ButtonSecondary,
                            {
                              size: c.ButtonSecondarySize.Lg,
                              width: u.BlockSize.Half,
                              onClick: k,
                              'data-testid': 'visit-support-data-consent-modal-reject-button',
                            },
                            m('visitSupportDataConsentModalReject')
                          ),
                          a.default.createElement(
                            c.ButtonPrimary,
                            {
                              size: c.ButtonPrimarySize.Lg,
                              width: u.BlockSize.Half,
                              onClick: () =>
                                v({ version: '12.17.2-flask.0', profileId: y, metaMetricsId: b }),
                              'data-testid': 'visit-support-data-consent-modal-accept-button',
                            },
                            m('visitSupportDataConsentModalAccept')
                          )
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
        file: 'ui/components/app/modals/visit-support-data-consent-modal/visit-support-data-consent-modal.tsx',
      },
    ],
    [
      6100,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        './network-list-item/network-list-item': 6101,
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
                var a = f(e('react')),
                  r = e('react-redux'),
                  o = e('../../component-library'),
                  i = e('../../../hooks/useI18nContext'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../store/actions'),
                  c = e('../../../../app/scripts/lib/util'),
                  u = e('../../../../shared/modules/selectors/networks'),
                  d = e('../../../../shared/constants/app'),
                  p = f(e('./network-list-item/network-list-item'));
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = function () {
                  const e = (0, i.useI18nContext)(),
                    t = (0, r.useDispatch)(),
                    n = (0, c.getEnvironmentType)() === d.ENVIRONMENT_TYPE_POPUP,
                    f = (0, r.useSelector)(u.getNetworkConfigurationsByChainId);
                  return a.default.createElement(
                    o.Modal,
                    {
                      isOpen: !0,
                      onClose: () => t((0, l.setShowMultiRpcModal)(!1)),
                      isClosedOnOutsideClick: !1,
                      isClosedOnEscapeKey: !1,
                      'data-testid': 'multi-rpc-edit-modal',
                      autoFocus: !1,
                    },
                    a.default.createElement(o.ModalOverlay, null),
                    a.default.createElement(
                      o.ModalContent,
                      null,
                      a.default.createElement(
                        o.ModalBody,
                        { display: s.Display.Flex, flexDirection: s.FlexDirection.Column },
                        a.default.createElement(
                          o.Box,
                          {
                            display: s.Display.Flex,
                            alignItems: s.AlignItems.center,
                            justifyContent: s.JustifyContent.center,
                            borderRadius: s.BorderRadius.SM,
                          },
                          a.default.createElement('img', { src: '/images/networks1.png' })
                        ),
                        a.default.createElement(
                          o.Text,
                          { variant: s.TextVariant.bodyMdBold, textAlign: s.TextAlign.Center },
                          e('updatedRpcForNetworks')
                        ),
                        a.default.createElement(
                          o.Text,
                          {
                            variant: s.TextVariant.bodyMd,
                            textAlign: s.TextAlign.Center,
                            paddingTop: 2,
                          },
                          e('supportMultiRpcInformation')
                        ),
                        a.default.createElement(
                          o.Box,
                          { paddingBottom: 6 },
                          a.default.createElement(
                            o.Box,
                            { marginTop: n ? 0 : 4, marginBottom: 1 },
                            Object.values(f).map(e =>
                              e.rpcEndpoints.length > 1
                                ? a.default.createElement(p.default, {
                                    networkConfiguration: e,
                                    key: e.chainId,
                                  })
                                : null
                            )
                          )
                        )
                      ),
                      a.default.createElement(o.ModalFooter, {
                        onSubmit: () => {
                          t((0, l.setShowMultiRpcModal)(!1));
                        },
                        submitButtonProps: { children: e('accept'), block: !0 },
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multi-rpc-edit-modal/multi-rpc-edit-modal.tsx',
      },
    ],
    [
      6101,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '@metamask/network-controller': 2202,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/network-controller'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = e('../../../../store/actions'),
                  u = e('../../../../../shared/constants/network');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ networkConfiguration: e }) => {
                  const t = e.rpcEndpoints[e.defaultRpcEndpointIndex],
                    n = (0, l.useI18nContext)(),
                    [d, p] = (0, a.useState)(!1),
                    f = (0, r.useDispatch)(),
                    [m, h] = (0, a.useState)();
                  return a.default.createElement(
                    i.Box,
                    {
                      display: s.Display.Flex,
                      alignItems: s.AlignItems.center,
                      flexDirection: s.FlexDirection.Row,
                      justifyContent: s.JustifyContent.spaceBetween,
                      paddingBottom: 4,
                      paddingTop: 4,
                    },
                    a.default.createElement(
                      i.Box,
                      {
                        display: s.Display.Flex,
                        alignItems: s.AlignItems.center,
                        width: s.BlockSize.EightTwelfths,
                      },
                      a.default.createElement(i.AvatarNetwork, {
                        size: i.AvatarNetworkSize.Md,
                        src: u.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                        name: e.name,
                      }),
                      a.default.createElement(
                        i.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          width: s.BlockSize.ElevenTwelfths,
                        },
                        a.default.createElement(
                          i.Box,
                          { marginLeft: 4 },
                          a.default.createElement(
                            i.Text,
                            {
                              color: s.TextColor.textDefault,
                              backgroundColor: s.BackgroundColor.transparent,
                              ellipsis: !0,
                            },
                            e.name
                          )
                        ),
                        a.default.createElement(
                          i.Box,
                          {
                            display: s.Display.Flex,
                            alignItems: s.AlignItems.center,
                            marginLeft: 4,
                          },
                          a.default.createElement(
                            i.Text,
                            {
                              padding: 0,
                              backgroundColor: s.BackgroundColor.transparent,
                              as: 'button',
                              variant: s.TextVariant.bodySmMedium,
                              color: s.TextColor.textAlternative,
                              ref: e => {
                                h(e);
                              },
                              style: { width: 220 },
                              textAlign: s.TextAlign.Left,
                              onMouseLeave: () => {
                                p(!1);
                              },
                              onMouseOver: () => {
                                p(!0);
                              },
                              ellipsis: !0,
                            },
                            t.name ?? new URL(t.url).host
                          ),
                          a.default.createElement(
                            i.Popover,
                            {
                              referenceElement: m,
                              position: i.PopoverPosition.Bottom,
                              isOpen: d,
                              hasArrow: !0,
                              backgroundColor: s.BackgroundColor.backgroundAlternative,
                              paddingTop: 2,
                              paddingBottom: 2,
                            },
                            a.default.createElement(
                              i.Text,
                              { variant: s.TextVariant.bodyXsMedium, ellipsis: !0 },
                              t.type === o.RpcEndpointType.Infura
                                ? t.url.replace('/v3/{infuraProjectId}', '')
                                : t.url
                            )
                          )
                        )
                      )
                    ),
                    a.default.createElement(
                      i.Box,
                      { display: s.Display.Flex, alignItems: s.AlignItems.center, marginLeft: 1 },
                      a.default.createElement(
                        i.Button,
                        {
                          type: 'button',
                          variant: i.ButtonVariant.Link,
                          onClick: () => {
                            f(
                              (0, c.toggleNetworkMenu)({
                                isAddingNewNetwork: !1,
                                isMultiRpcOnboarding: !0,
                              })
                            ),
                              f((0, c.setEditedNetwork)({ chainId: e.chainId, nickname: e.name }));
                          },
                        },
                        n('edit')
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multi-rpc-edit-modal/network-list-item/network-list-item.tsx',
      },
    ],
    [
      6102,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/lib/bridge-status/utils': 5830,
        '../../../../shared/lib/multichain/networks': 5843,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainTransactionDisplay': 6994,
        '../../component-library': 6402,
        '../confirm/info/row': 5984,
        '../multichain-transaction-details-modal/helpers': 6104,
        '@metamask/bridge-controller': 1414,
        '@metamask/etherscan-link': 1938,
        '@metamask/transaction-controller': 2946,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('@metamask/etherscan-link'),
                  o = e('@metamask/bridge-controller'),
                  i = e('@metamask/transaction-controller'),
                  s = e('../../../../shared/lib/bridge-status/utils'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../component-library'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../../contexts/metametrics'),
                  f = e('../confirm/info/row'),
                  m = e('../../../helpers/utils/util'),
                  h = e('../../../hooks/useMultichainTransactionDisplay'),
                  g = e('../multichain-transaction-details-modal/helpers'),
                  y = e('../../../../shared/lib/multichain/networks'),
                  b = e('../../../../shared/constants/multichain/networks'),
                  v = e('../../../../shared/constants/network'),
                  k = e('../../../../shared/constants/common');
                function _(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (_ = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = function ({ transaction: e, onClose: t }) {
                  var n, _, x;
                  const w = (0, c.useI18nContext)(),
                    M = (0, a.useContext)(p.MetaMetricsContext),
                    { id: T, timestamp: E, from: C, bridgeInfo: S, isBridgeOriginated: O } = e,
                    I = e.network ?? e.chain ?? undefined,
                    P = O ? i.TransactionStatus.submitted : e.status,
                    j = null == C || null === (n = C[0]) || void 0 === n ? void 0 : n.asset,
                    N = O
                      ? null
                      : null === (_ = e.fees) ||
                          void 0 === _ ||
                          null === (_ = _.find(e => 'base' === e.type)) ||
                          void 0 === _
                        ? void 0
                        : _.asset,
                    D = S || {},
                    A = h.KEYRING_TRANSACTION_STATUS_KEY[P],
                    B = (0, s.getBridgeStatusKey)({ ...e, isBridgeTx: e.isBridgeTx ?? !1 }, A);
                  let R = w('bridgeStatusInProgress'),
                    F = l.TextColor.primaryDefault;
                  return (
                    B === i.TransactionStatus.confirmed
                      ? ((R = w('bridgeStatusComplete')), (F = l.TextColor.successDefault))
                      : B === i.TransactionStatus.failed &&
                        ((R = w('bridgeStatusFailed')), (F = l.TextColor.errorDefault)),
                    a.default.createElement(
                      u.Modal,
                      {
                        onClose: t,
                        'data-testid': 'solana-bridge-transaction-details-modal',
                        isOpen: !0,
                        isClosedOnOutsideClick: !0,
                        isClosedOnEscapeKey: !0,
                      },
                      a.default.createElement(u.ModalOverlay, null),
                      a.default.createElement(
                        u.ModalContent,
                        {
                          className: 'solana-bridge-transaction-details-modal',
                          modalDialogProps: {
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                            padding: 4,
                          },
                        },
                        a.default.createElement(
                          u.ModalHeader,
                          { onClose: t, padding: 0 },
                          a.default.createElement(
                            u.Text,
                            { variant: l.TextVariant.headingMd, textAlign: l.TextAlign.Center },
                            w('bridgeDetailsTitle')
                          ),
                          a.default.createElement(
                            u.Text,
                            {
                              variant: l.TextVariant.bodyMd,
                              color: l.TextColor.textAlternative,
                              textAlign: l.TextAlign.Center,
                            },
                            (0, g.formatTimestamp)(E)
                          )
                        ),
                        a.default.createElement(
                          u.Box,
                          { paddingBottom: 4 },
                          a.default.createElement(f.ConfirmInfoRowDivider, null)
                        ),
                        a.default.createElement(
                          u.Box,
                          {
                            className: 'solana-bridge-transaction-details-modal__content',
                            style: { overflow: 'auto', flex: '1' },
                          },
                          a.default.createElement(
                            u.Box,
                            null,
                            a.default.createElement(
                              u.Box,
                              {
                                display: l.Display.Flex,
                                flexDirection: l.FlexDirection.Column,
                                gap: 4,
                              },
                              a.default.createElement(
                                u.Box,
                                {
                                  display: l.Display.Flex,
                                  justifyContent: l.JustifyContent.spaceBetween,
                                },
                                a.default.createElement(
                                  u.Text,
                                  {
                                    variant: l.TextVariant.bodyMd,
                                    fontWeight: l.FontWeight.Medium,
                                  },
                                  w('status')
                                ),
                                a.default.createElement(
                                  u.Text,
                                  { variant: l.TextVariant.bodyMd, color: F },
                                  R
                                )
                              ),
                              a.default.createElement(
                                u.Box,
                                {
                                  display: l.Display.Flex,
                                  justifyContent: l.JustifyContent.spaceBetween,
                                },
                                a.default.createElement(
                                  u.Text,
                                  {
                                    variant: l.TextVariant.bodyMd,
                                    fontWeight: l.FontWeight.Medium,
                                  },
                                  w('transactionIdLabel')
                                ),
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    alignItems: l.AlignItems.center,
                                    gap: 1,
                                  },
                                  a.default.createElement(
                                    u.ButtonLink,
                                    {
                                      size: u.ButtonLinkSize.Inherit,
                                      textProps: {
                                        variant: l.TextVariant.bodyMd,
                                        alignItems: l.AlignItems.flexStart,
                                      },
                                      as: 'a',
                                      externalLink: !0,
                                      href: (0, g.getTransactionUrl)(T, I),
                                    },
                                    (0, g.shortenTransactionId)(T),
                                    a.default.createElement(u.Icon, {
                                      marginLeft: 2,
                                      name: u.IconName.Export,
                                      size: u.IconSize.Sm,
                                      color: l.IconColor.primaryDefault,
                                    })
                                  )
                                )
                              ),
                              (null == D ? void 0 : D.destTxHash) &&
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    justifyContent: l.JustifyContent.spaceBetween,
                                  },
                                  a.default.createElement(
                                    u.Text,
                                    {
                                      variant: l.TextVariant.bodyMd,
                                      fontWeight: l.FontWeight.Medium,
                                    },
                                    w('destinationTransactionIdLabel')
                                  ),
                                  a.default.createElement(
                                    u.Box,
                                    {
                                      display: l.Display.Flex,
                                      alignItems: l.AlignItems.center,
                                      gap: 1,
                                    },
                                    a.default.createElement(
                                      u.ButtonLink,
                                      {
                                        size: u.ButtonLinkSize.Inherit,
                                        textProps: {
                                          variant: l.TextVariant.bodyMd,
                                          alignItems: l.AlignItems.flexStart,
                                        },
                                        as: 'a',
                                        externalLink: !0,
                                        href: ((e, t, n) => {
                                          if (!e || !t) return '';
                                          try {
                                            const a = (0, o.formatChainIdToCaip)(t),
                                              i = a === b.MultichainNetworks.SOLANA;
                                            let s = '';
                                            if (i) {
                                              const t =
                                                b.MULTICHAIN_NETWORK_BLOCK_EXPLORER_FORMAT_URLS_MAP[
                                                  a
                                                ];
                                              t &&
                                                (s = (0, y.formatBlockExplorerTransactionUrl)(
                                                  t,
                                                  e.split(':').at(-1) ?? e
                                                ));
                                            } else {
                                              const a = t.startsWith('0x')
                                                  ? t
                                                  : `0x${Number(t).toString(16)}`,
                                                o = k.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[a];
                                              s = o
                                                ? `${o}tx/${e}`
                                                : null != n && n.blockExplorerUrl
                                                  ? (0, r.getAccountLink)(
                                                      e,
                                                      t,
                                                      { blockExplorerUrl: n.blockExplorerUrl },
                                                      undefined
                                                    )
                                                  : `https://etherscan.io/tx/${e}`;
                                            }
                                            return s;
                                          } catch (e) {
                                            return (
                                              console.error(
                                                'Error generating block explorer URL:',
                                                e
                                              ),
                                              ''
                                            );
                                          }
                                        })(
                                          D.destTxHash,
                                          (null === (x = D.destChainId) || void 0 === x
                                            ? void 0
                                            : x.toString()) ?? '',
                                          { blockExplorerUrl: D.destBlockExplorerUrl }
                                        ),
                                      },
                                      (0, g.shortenTransactionId)(D.destTxHash),
                                      a.default.createElement(u.Icon, {
                                        marginLeft: 2,
                                        name: u.IconName.Export,
                                        size: u.IconSize.Sm,
                                        color: l.IconColor.primaryDefault,
                                      })
                                    )
                                  )
                                )
                            ),
                            a.default.createElement(
                              u.Box,
                              { paddingTop: 4, paddingBottom: 4 },
                              a.default.createElement(f.ConfirmInfoRowDivider, null)
                            ),
                            a.default.createElement(
                              u.Box,
                              { marginBottom: 4 },
                              a.default.createElement(
                                u.Text,
                                {
                                  variant: l.TextVariant.bodyMd,
                                  fontWeight: l.FontWeight.Medium,
                                  marginBottom: 2,
                                },
                                w('bridging')
                              ),
                              a.default.createElement(
                                u.Box,
                                {
                                  display: l.Display.Flex,
                                  justifyContent: l.JustifyContent.spaceBetween,
                                  alignItems: l.AlignItems.center,
                                  marginBottom: 2,
                                },
                                a.default.createElement(
                                  u.Text,
                                  {
                                    variant: l.TextVariant.bodyMd,
                                    fontWeight: l.FontWeight.Medium,
                                  },
                                  w('from')
                                ),
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    gap: 2,
                                    alignItems: l.AlignItems.center,
                                  },
                                  a.default.createElement(u.AvatarNetwork, {
                                    size: u.AvatarNetworkSize.Sm,
                                    className:
                                      'solana-bridge-transaction-details-modal__network-badge',
                                    name: b.MULTICHAIN_PROVIDER_CONFIGS[b.MultichainNetworks.SOLANA]
                                      .nickname,
                                    src: b.SOLANA_TOKEN_IMAGE_URL,
                                    borderColor: l.BorderColor.backgroundDefault,
                                  }),
                                  a.default.createElement(
                                    u.Text,
                                    { variant: l.TextVariant.bodyMd },
                                    b.MULTICHAIN_PROVIDER_CONFIGS[b.MultichainNetworks.SOLANA]
                                      .nickname
                                  )
                                )
                              ),
                              a.default.createElement(
                                u.Box,
                                {
                                  display: l.Display.Flex,
                                  justifyContent: l.JustifyContent.spaceBetween,
                                  alignItems: l.AlignItems.center,
                                },
                                a.default.createElement(
                                  u.Text,
                                  {
                                    variant: l.TextVariant.bodyMd,
                                    fontWeight: l.FontWeight.Medium,
                                  },
                                  w('to')
                                ),
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    gap: 2,
                                    alignItems: l.AlignItems.center,
                                  },
                                  a.default.createElement(u.AvatarNetwork, {
                                    size: u.AvatarNetworkSize.Sm,
                                    className:
                                      'solana-bridge-transaction-details-modal__network-badge',
                                    name: (null == D ? void 0 : D.destChainName) || '',
                                    src:
                                      v.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[
                                        null == S ? void 0 : S.destChainId
                                      ] || '',
                                    borderColor: l.BorderColor.backgroundDefault,
                                  }),
                                  a.default.createElement(
                                    u.Text,
                                    { variant: l.TextVariant.bodyMd },
                                    (null == S ? void 0 : S.destChainName) || ''
                                  )
                                )
                              )
                            ),
                            a.default.createElement(
                              u.Box,
                              {
                                display: l.Display.Flex,
                                flexDirection: l.FlexDirection.Column,
                                gap: 4,
                              },
                              a.default.createElement(
                                u.Box,
                                {
                                  display: l.Display.Flex,
                                  justifyContent: l.JustifyContent.spaceBetween,
                                },
                                a.default.createElement(
                                  u.Text,
                                  {
                                    variant: l.TextVariant.bodyMd,
                                    fontWeight: l.FontWeight.Medium,
                                  },
                                  w('youSent')
                                ),
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    flexDirection: l.FlexDirection.Column,
                                    alignItems: l.AlignItems.flexEnd,
                                  },
                                  a.default.createElement(
                                    u.Text,
                                    {
                                      variant: l.TextVariant.bodyMd,
                                      'data-testid': 'transaction-source-amount',
                                    },
                                    (() => {
                                      if (null != j && j.fungible) {
                                        var e;
                                        return `${null !== (e = j.amount) && void 0 !== e && e.startsWith('-') ? j.amount.substring(1) : j.amount} ${j.unit}`;
                                      }
                                      return '';
                                    })()
                                  )
                                )
                              ),
                              B === i.TransactionStatus.confirmed &&
                                (null == S ? void 0 : S.destAsset) &&
                                (null == S ? void 0 : S.destTokenAmount) &&
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    justifyContent: l.JustifyContent.spaceBetween,
                                  },
                                  a.default.createElement(
                                    u.Text,
                                    {
                                      variant: l.TextVariant.bodyMd,
                                      fontWeight: l.FontWeight.Medium,
                                    },
                                    w('youReceived')
                                  ),
                                  a.default.createElement(
                                    u.Box,
                                    {
                                      display: l.Display.Flex,
                                      flexDirection: l.FlexDirection.Column,
                                      alignItems: l.AlignItems.flexEnd,
                                    },
                                    a.default.createElement(
                                      u.Text,
                                      {
                                        variant: l.TextVariant.bodyMd,
                                        'data-testid': 'transaction-dest-amount',
                                      },
                                      ((e, t = 18) => {
                                        if (!e) return '0';
                                        try {
                                          const n = BigInt(e),
                                            a = BigInt(10) ** BigInt(t),
                                            r = n / a,
                                            o = (n % a).toString().padStart(t, '0'),
                                            i = 4,
                                            s = o.substring(0, i).replace(/0+$/u, '');
                                          return s.length > 0 ? `${r}.${s}` : `${r}`;
                                        } catch (t) {
                                          return (
                                            console.error(
                                              'Error formatting destination token amount:',
                                              t
                                            ),
                                            e.toString()
                                          );
                                        }
                                      })(S.destTokenAmount, S.destAsset.decimals),
                                      ' ',
                                      S.destAsset.symbol
                                    )
                                  )
                                ),
                              N &&
                                N.fungible &&
                                a.default.createElement(
                                  u.Box,
                                  {
                                    display: l.Display.Flex,
                                    justifyContent: l.JustifyContent.spaceBetween,
                                  },
                                  a.default.createElement(
                                    u.Text,
                                    {
                                      variant: l.TextVariant.bodyMd,
                                      fontWeight: l.FontWeight.Medium,
                                    },
                                    w('transactionTotalGasFee')
                                  ),
                                  a.default.createElement(
                                    u.Box,
                                    {
                                      display: l.Display.Flex,
                                      flexDirection: l.FlexDirection.Column,
                                      alignItems: l.AlignItems.flexEnd,
                                    },
                                    a.default.createElement(
                                      u.Text,
                                      {
                                        variant: l.TextVariant.bodyMd,
                                        'data-testid': 'transaction-gas-fee',
                                      },
                                      N.amount,
                                      ' ',
                                      N.unit
                                    )
                                  )
                                )
                            )
                          ),
                          a.default.createElement(
                            u.Box,
                            { paddingTop: 4 },
                            a.default.createElement(f.ConfirmInfoRowDivider, null)
                          )
                        ),
                        a.default.createElement(
                          u.ModalFooter,
                          null,
                          a.default.createElement(
                            u.Button,
                            {
                              block: !0,
                              size: u.ButtonSize.Md,
                              variant: u.ButtonVariant.Link,
                              onClick: () => {
                                global.platform.openTab({ url: (0, g.getTransactionUrl)(T, I) }),
                                  M({
                                    event: d.MetaMetricsEventName.ExternalLinkClicked,
                                    category: d.MetaMetricsEventCategory.Navigation,
                                    properties: {
                                      link_type: d.MetaMetricsEventLinkType.AccountTracker,
                                      location: 'Transaction Details',
                                      url_domain: (0, m.getURLHostName)(
                                        (0, g.getTransactionUrl)(T, I)
                                      ),
                                    },
                                  });
                              },
                              endIconName: u.IconName.Export,
                            },
                            w('viewOnBlockExplorer')
                          )
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
        file: 'ui/components/app/multichain-bridge-transaction-details-modal/multichain-bridge-transaction-details-modal.tsx',
      },
    ],
    [
      6103,
      {
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/lib/bridge-status/utils': 5830,
        '../../../../shared/types/bridge-status': 5883,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainTransactionDisplay': 6994,
        '../../../pages/bridge/transaction-details/segment': 7070,
        '../../../selectors/accounts': 7592,
        '../../component-library': 6402,
        '../../multichain/activity-list-item/activity-list-item': 6490,
        '../multichain-transaction-details-modal/helpers': 6104,
        '../transaction-icon': 6306,
        '../transaction-status-label/transaction-status-label': 6316,
        '@metamask/transaction-controller': 2946,
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
                var a = _(e('react')),
                  r = e('react-redux'),
                  o = e('lodash'),
                  i = e('@metamask/transaction-controller'),
                  s = e('../../../../shared/lib/bridge-status/utils'),
                  l = e('../../../../shared/types/bridge-status'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../selectors/accounts'),
                  d = e('../../../hooks/useMultichainTransactionDisplay'),
                  p = e('../multichain-transaction-details-modal/helpers'),
                  f = _(e('../transaction-icon')),
                  m = _(e('../transaction-status-label/transaction-status-label')),
                  h = e('../../multichain/activity-list-item/activity-list-item'),
                  g = _(e('../../../pages/bridge/transaction-details/segment')),
                  y = e('../../../helpers/constants/design-system'),
                  b = e('../../component-library'),
                  v = e('../../../../shared/constants/multichain/networks'),
                  k = e('../../../../shared/constants/transaction');
                function _(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = ({ transaction: e, toggleShowDetails: t }) => {
                  var n;
                  const _ = (0, c.useI18nContext)(),
                    x = (0, r.useSelector)(u.isSelectedInternalAccountSolana),
                    {
                      type: w,
                      from: M,
                      bridgeInfo: T,
                      isBridgeOriginated: E,
                      isSourceTxConfirmed: C,
                    } = e,
                    S = null == M || null === (n = M[0]) || void 0 === n ? void 0 : n.asset,
                    O = E ? i.TransactionStatus.submitted : e.status,
                    I = d.KEYRING_TRANSACTION_STATUS_KEY[O],
                    P = (0, s.getBridgeStatusKey)({ ...e, isBridgeTx: e.isBridgeTx ?? !1 }, I),
                    j = (0, s.isBridgeComplete)({ ...e, isBridgeTx: e.isBridgeTx ?? !1 }),
                    N = (0, s.isBridgeFailed)({ ...e, isBridgeTx: e.isBridgeTx ?? !1 }, I),
                    D = j || N,
                    A = [i.TransactionStatus.submitted, k.TransactionGroupStatus.pending].includes(
                      P
                    )
                      ? undefined
                      : P,
                    B = C ? l.StatusTypes.COMPLETE : l.StatusTypes.PENDING;
                  let R = null;
                  C && (R = j ? l.StatusTypes.COMPLETE : l.StatusTypes.PENDING);
                  const F = C ? 2 : 1;
                  let $ = (0, o.capitalize)(w);
                  if (e.isBridgeTx && T) {
                    const { destChainName: e, provider: t, destChainId: n } = T,
                      a = e || n;
                    ($ = `${_('bridge')} ${_('to')} ${a}`), t && ($ = `${$} ${_('via')} ${t}`);
                  }
                  return a.default.createElement(h.ActivityListItem, {
                    className: 'solana-bridge-transaction-list-item',
                    'data-testid': 'solana-bridge-activity-item',
                    onClick: () => t(e),
                    icon: a.default.createElement(
                      b.BadgeWrapper,
                      {
                        anchorElementShape: b.BadgeWrapperAnchorElementShape.circular,
                        badge: a.default.createElement(b.AvatarNetwork, {
                          borderColor: y.BorderColor.backgroundDefault,
                          borderWidth: 1,
                          className: 'activity-tx__network-badge',
                          'data-testid': 'activity-tx-network-badge',
                          name: x
                            ? v.MULTICHAIN_PROVIDER_CONFIGS[v.MultichainNetworks.SOLANA].nickname
                            : v.MULTICHAIN_PROVIDER_CONFIGS[v.MultichainNetworks.BITCOIN].nickname,
                          size: b.AvatarNetworkSize.Xs,
                          src: x ? v.SOLANA_TOKEN_IMAGE_URL : v.BITCOIN_TOKEN_IMAGE_URL,
                        }),
                        display: y.Display.Block,
                        positionObj: { right: -4, top: -4 },
                      },
                      a.default.createElement(f.default, {
                        category: k.TransactionGroupCategory.bridge,
                        status: P,
                      })
                    ),
                    rightContent: a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        b.Text,
                        {
                          className: 'activity-list-item__primary-currency',
                          color: y.TextColor.textDefault,
                          'data-testid': 'transaction-list-item-primary-currency',
                          ellipsis: !0,
                          fontWeight: y.FontWeight.Medium,
                          textAlign: y.TextAlign.Right,
                          title: 'Primary Currency',
                          variant: y.TextVariant.bodyLgMedium,
                        },
                        (() => {
                          if (null != S && S.fungible) {
                            return `${S.amount} ${S.unit}`;
                          }
                          return '';
                        })()
                      )
                    ),
                    title: $,
                    subtitle: a.default.createElement(
                      b.Box,
                      { display: y.Display.Flex, flexDirection: y.FlexDirection.Column, gap: 1 },
                      a.default.createElement(m.default, {
                        date: (0, p.formatTimestamp)(e.timestamp),
                        error: {},
                        status: A,
                        statusOnly: !0,
                        className: j ? 'transaction-status-label--confirmed' : undefined,
                      }),
                      e.isBridgeTx &&
                        T &&
                        !D &&
                        a.default.createElement(
                          b.Box,
                          {
                            marginTop: 0,
                            display: y.Display.Flex,
                            flexDirection: y.FlexDirection.Column,
                            gap: 1,
                            width: y.BlockSize.Full,
                          },
                          a.default.createElement(
                            b.Text,
                            { color: y.TextColor.textAlternative, variant: y.TextVariant.bodySm },
                            _('bridgeTransactionProgress', [F])
                          ),
                          a.default.createElement(
                            b.Box,
                            { display: y.Display.Flex, gap: 2, width: y.BlockSize.Full },
                            a.default.createElement(g.default, { type: B }),
                            a.default.createElement(g.default, { type: R })
                          )
                        )
                    ),
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multichain-bridge-transaction-list-item/multichain-bridge-transaction-list-item.tsx',
      },
    ],
    [
      6104,
      {
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/lib/multichain/networks': 5843,
        '../../../helpers/utils/util': 6921,
        luxon: 4931,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getTransactionUrl = n.getAddressUrl = n.formatTimestamp = void 0),
                  (n.shortenTransactionId = function (e) {
                    return (0, o.shortenAddress)(e);
                  });
                var a = e('luxon'),
                  r = e('../../../../shared/constants/multichain/networks'),
                  o = e('../../../helpers/utils/util'),
                  i = e('../../../../shared/lib/multichain/networks');
                n.getTransactionUrl = (e, t) => {
                  const n = r.MULTICHAIN_NETWORK_BLOCK_EXPLORER_FORMAT_URLS_MAP[t];
                  return n ? (0, i.formatBlockExplorerTransactionUrl)(n, e) : '';
                };
                n.getAddressUrl = (e, t) => {
                  const n = r.MULTICHAIN_NETWORK_BLOCK_EXPLORER_FORMAT_URLS_MAP[t];
                  return n ? (0, i.formatBlockExplorerAddressUrl)(n, e) : '';
                };
                n.formatTimestamp = e => {
                  if (!e) return '';
                  const t = e < 1e12 ? 1e3 * e : e,
                    n = a.DateTime.fromMillis(t);
                  return `${(0, o.formatDateWithYearContext)(t, 'MMM d, y', 'MMM d')}, ${n.toFormat('HH:mm')}`;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multichain-transaction-details-modal/helpers.ts',
      },
    ],
    [
      6105,
      { './multichain-transaction-details-modal': 6106 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'MultichainTransactionDetailsModal', {
                    enumerable: !0,
                    get: function () {
                      return a.MultichainTransactionDetailsModal;
                    },
                  });
                var a = e('./multichain-transaction-details-modal');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multichain-transaction-details-modal/index.ts',
      },
    ],
    [
      6106,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainTransactionDisplay': 6994,
        '../../component-library': 6402,
        '../confirm/info/row': 5984,
        './helpers': 6104,
        '@metamask/keyring-api': 2014,
        lodash: 4921,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.MultichainTransactionDetailsModal = function ({
                    transaction: e,
                    onClose: t,
                    userAddress: n,
                    networkConfig: h,
                  }) {
                    const g = (0, s.useI18nContext)(),
                      y = (0, a.useContext)(u.MetaMetricsContext),
                      {
                        from: b,
                        to: v,
                        isRedeposit: k,
                        baseFee: _,
                        priorityFee: x,
                        status: w,
                        chain: M,
                        type: T,
                        timestamp: E,
                        id: C,
                      } = (0, f.useMultichainTransactionDisplay)(e, h),
                      S = f.KEYRING_TRANSACTION_STATUS_KEY[w],
                      O = (e, t) =>
                        t
                          ? a.default.createElement(
                              l.Box,
                              {
                                display: i.Display.Flex,
                                justifyContent: i.JustifyContent.spaceBetween,
                              },
                              a.default.createElement(
                                l.Text,
                                { variant: i.TextVariant.bodyMd, fontWeight: i.FontWeight.Medium },
                                e
                              ),
                              a.default.createElement(
                                l.Box,
                                {
                                  display: i.Display.Flex,
                                  alignItems: i.AlignItems.center,
                                  gap: 1,
                                },
                                a.default.createElement(
                                  l.ButtonLink,
                                  {
                                    size: l.ButtonLinkSize.Inherit,
                                    textProps: {
                                      variant: i.TextVariant.bodyMd,
                                      alignItems: i.AlignItems.flexStart,
                                    },
                                    as: 'a',
                                    externalLink: !0,
                                    href: (0, m.getAddressUrl)(t, M),
                                  },
                                  (0, p.shortenAddress)(t),
                                  a.default.createElement(l.Icon, {
                                    marginLeft: 2,
                                    name: l.IconName.Export,
                                    size: l.IconSize.Sm,
                                    color: i.IconColor.primaryDefault,
                                    onClick: () =>
                                      navigator.clipboard.writeText((0, m.getAddressUrl)(t, M)),
                                  })
                                )
                              )
                            )
                          : null,
                      I = (e, t, n) =>
                        e
                          ? a.default.createElement(
                              l.Box,
                              {
                                display: i.Display.Flex,
                                justifyContent: i.JustifyContent.spaceBetween,
                              },
                              a.default.createElement(
                                l.Text,
                                { variant: i.TextVariant.bodyMd, fontWeight: i.FontWeight.Medium },
                                t
                              ),
                              a.default.createElement(
                                l.Box,
                                {
                                  display: i.Display.Flex,
                                  flexDirection: i.FlexDirection.Column,
                                  alignItems: i.AlignItems.flexEnd,
                                },
                                a.default.createElement(
                                  l.Text,
                                  { variant: i.TextVariant.bodyMd, 'data-testid': n },
                                  e.amount,
                                  ' ',
                                  e.unit
                                )
                              )
                            )
                          : null,
                      P = {
                        [o.TransactionType.Send]: g('send'),
                        [o.TransactionType.Receive]: g('receive'),
                        [o.TransactionType.Swap]: g('swap'),
                        [o.TransactionType.Unknown]: g('interaction'),
                      };
                    return a.default.createElement(
                      l.Modal,
                      {
                        onClose: t,
                        'data-testid': 'multichain-transaction-details-modal',
                        isOpen: !0,
                        isClosedOnOutsideClick: !0,
                        isClosedOnEscapeKey: !0,
                      },
                      a.default.createElement(l.ModalOverlay, null),
                      a.default.createElement(
                        l.ModalContent,
                        {
                          modalDialogProps: {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                            padding: 4,
                          },
                        },
                        a.default.createElement(
                          l.ModalHeader,
                          { onClose: t, padding: 0 },
                          a.default.createElement(
                            l.Text,
                            { variant: i.TextVariant.headingMd, textAlign: i.TextAlign.Center },
                            (0, r.capitalize)(k ? g('redeposit') : P[T])
                          ),
                          a.default.createElement(
                            l.Text,
                            {
                              variant: i.TextVariant.bodyMd,
                              color: i.TextColor.textAlternative,
                              textAlign: i.TextAlign.Center,
                            },
                            (0, m.formatTimestamp)(E)
                          )
                        ),
                        a.default.createElement(
                          l.Box,
                          { paddingBottom: 4 },
                          a.default.createElement(d.ConfirmInfoRowDivider, null)
                        ),
                        a.default.createElement(
                          l.Box,
                          null,
                          a.default.createElement(
                            l.Box,
                            {
                              display: i.Display.Flex,
                              flexDirection: i.FlexDirection.Column,
                              gap: 4,
                            },
                            a.default.createElement(
                              l.Box,
                              {
                                display: i.Display.Flex,
                                justifyContent: i.JustifyContent.spaceBetween,
                              },
                              a.default.createElement(
                                l.Text,
                                { variant: i.TextVariant.bodyMd, fontWeight: i.FontWeight.Medium },
                                g('status')
                              ),
                              a.default.createElement(
                                l.Text,
                                {
                                  variant: i.TextVariant.bodyMd,
                                  color: (e => {
                                    switch (e.toLowerCase()) {
                                      case o.TransactionStatus.Confirmed:
                                        return i.TextColor.successDefault;
                                      case o.TransactionStatus.Unconfirmed:
                                        return i.TextColor.warningDefault;
                                      case o.TransactionStatus.Failed:
                                        return i.TextColor.errorDefault;
                                      default:
                                        return i.TextColor.textDefault;
                                    }
                                  })(w),
                                },
                                (0, r.capitalize)(g(S))
                              )
                            ),
                            a.default.createElement(
                              l.Box,
                              {
                                display: i.Display.Flex,
                                justifyContent: i.JustifyContent.spaceBetween,
                              },
                              a.default.createElement(
                                l.Text,
                                { variant: i.TextVariant.bodyMd, fontWeight: i.FontWeight.Medium },
                                g('notificationItemTransactionId')
                              ),
                              a.default.createElement(
                                l.Box,
                                {
                                  display: i.Display.Flex,
                                  alignItems: i.AlignItems.center,
                                  gap: 1,
                                },
                                a.default.createElement(
                                  l.ButtonLink,
                                  {
                                    size: l.ButtonLinkSize.Inherit,
                                    textProps: {
                                      variant: i.TextVariant.bodyMd,
                                      alignItems: i.AlignItems.flexStart,
                                    },
                                    as: 'a',
                                    externalLink: !0,
                                    href: (0, m.getTransactionUrl)(C, M),
                                  },
                                  (0, m.shortenTransactionId)(C),
                                  a.default.createElement(l.Icon, {
                                    marginLeft: 2,
                                    name: l.IconName.Export,
                                    size: l.IconSize.Sm,
                                    color: i.IconColor.primaryDefault,
                                    onClick: () =>
                                      navigator.clipboard.writeText((0, m.getTransactionUrl)(C, M)),
                                  })
                                )
                              )
                            )
                          ),
                          a.default.createElement(
                            l.Box,
                            { paddingTop: 4, paddingBottom: 4 },
                            a.default.createElement(d.ConfirmInfoRowDivider, null)
                          ),
                          a.default.createElement(
                            l.Box,
                            {
                              display: i.Display.Flex,
                              flexDirection: i.FlexDirection.Column,
                              gap: 4,
                            },
                            T === o.TransactionType.Send
                              ? O(g('from'), n)
                              : O(g('from'), null == b ? void 0 : b.address),
                            a.default.createElement(
                              a.default.Fragment,
                              null,
                              O(g('to'), null == v ? void 0 : v.address),
                              I(
                                T === o.TransactionType.Swap ? b : v,
                                g('amount'),
                                'transaction-amount'
                              )
                            ),
                            I(_, g('networkFee'), 'transaction-base-fee'),
                            I(x, g('priorityFee'), 'transaction-priority-fee')
                          )
                        ),
                        a.default.createElement(
                          l.Box,
                          { paddingTop: 4 },
                          a.default.createElement(d.ConfirmInfoRowDivider, null)
                        ),
                        a.default.createElement(
                          l.ModalFooter,
                          null,
                          a.default.createElement(
                            l.Button,
                            {
                              block: !0,
                              size: l.ButtonSize.Md,
                              variant: l.ButtonVariant.Link,
                              onClick: () => {
                                global.platform.openTab({ url: (0, m.getTransactionUrl)(C, M) }),
                                  y({
                                    event: c.MetaMetricsEventName.ExternalLinkClicked,
                                    category: c.MetaMetricsEventCategory.Navigation,
                                    properties: {
                                      link_type: c.MetaMetricsEventLinkType.AccountTracker,
                                      location: 'Transaction Details',
                                      url_domain: (0, p.getURLHostName)(
                                        (0, m.getTransactionUrl)(C, M)
                                      ),
                                    },
                                  });
                              },
                              endIconName: l.IconName.Export,
                            },
                            g('viewDetails')
                          )
                        )
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('lodash'),
                  o = e('@metamask/keyring-api'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../component-library'),
                  c = e('../../../../shared/constants/metametrics'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../confirm/info/row'),
                  p = e('../../../helpers/utils/util'),
                  f = e('../../../hooks/useMultichainTransactionDisplay'),
                  m = e('./helpers');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multichain-transaction-details-modal/multichain-transaction-details-modal.tsx',
      },
    ],
    [
      6107,
      { './multiple-notifications.component': 6108 },
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
                var a,
                  r =
                    (a = e('./multiple-notifications.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/multiple-notifications/index.js' },
    ],
    [
      6108,
      { classnames: 4168, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = s(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = i(e('classnames')),
                  o = i(e('prop-types'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function l(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class c extends a.PureComponent {
                  constructor(...e) {
                    super(...e), l(this, 'state', { showAll: !1 });
                  }
                  render() {
                    const { showAll: e } = this.state,
                      { children: t, classNames: n } = this.props,
                      o = t.filter(Boolean);
                    return 0 === o.length
                      ? null
                      : a.default.createElement(
                          'div',
                          {
                            className: (0, r.default)(
                              ...n,
                              'home-notification-wrapper--multichain',
                              {
                                'home-notification-wrapper--show-all': e,
                                'home-notification-wrapper--show-first': !e,
                              }
                            ),
                          },
                          o,
                          a.default.createElement(
                            'div',
                            {
                              className: 'home-notification-wrapper__i-container',
                              onClick: () => this.setState({ showAll: !e }),
                            },
                            o.length > 1
                              ? a.default.createElement('i', {
                                  className: (0, r.default)('fa fa-sm fa-sort-amount', {
                                    flipped: !e,
                                  }),
                                })
                              : null
                          )
                        );
                  }
                }
                (n.default = c),
                  l(c, 'defaultProps', { children: [], classNames: [] }),
                  l(c, 'propTypes', { children: o.default.array, classNames: o.default.array });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/multiple-notifications/multiple-notifications.component.js',
      },
    ],
    [
      6109,
      { './name': 6115 },
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
                var a,
                  r = (a = e('./name')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/index.ts' },
    ],
    [
      6110,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../component-library': 6402,
        '@metamask/name-controller': 2190,
        'ethereumjs-util': 4393,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('ethereumjs-util'),
                  o = e('@metamask/name-controller'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/utils/util'),
                  l = e('../../../../helpers/constants/design-system');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const u = (0, a.memo)(({ value: e, type: t }) => {
                  const n = (function (e, t) {
                    return e.length && t === o.NameType.ETHEREUM_ADDRESS
                      ? (0, s.shortenAddress)((0, r.toChecksumAddress)(e))
                      : e;
                  })(e, t);
                  return a.default.createElement(
                    i.Text,
                    { className: 'name__value', variant: l.TextVariant.bodyMd },
                    n
                  );
                });
                n.default = u;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/name-details/formatted-value.tsx' },
    ],
    [
      6111,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../contexts/metametrics': 6836,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.usePetnamesMetrics = function ({
                    initialSources: e,
                    name: t,
                    proposedNameOptions: n,
                    savedName: i,
                    savedSourceId: s,
                    selectedSourceId: l,
                    type: c,
                  }) {
                    const u = (0, a.useContext)(r.MetaMetricsContext),
                      d = (0, a.useCallback)(
                        (e, t = {}) => {
                          const a = [...new Set(n.map(e => e.sourceId))],
                            r = { petname_category: c, suggested_names_sources: a, ...t };
                          u({
                            event: e,
                            category: o.MetaMetricsEventCategory.Petnames,
                            properties: r,
                          });
                        },
                        [u, c, n]
                      ),
                      p = (0, a.useCallback)(() => {
                        const e = l ?? null,
                          n = (null == i ? void 0 : i.length) && !(null != t && t.length),
                          a =
                            (null == i ? void 0 : i.length) &&
                            (null == t ? void 0 : t.length) &&
                            t !== i,
                          r = !(null != i && i.length) && (null == t ? void 0 : t.length);
                        let c = null,
                          u = {};
                        n &&
                          ((c = o.MetaMetricsEventName.PetnameDeleted),
                          (u = { petname_previous_source: s })),
                          a &&
                            ((c = o.MetaMetricsEventName.PetnameUpdated),
                            (u = { petname_previous_source: s, petname_source: e })),
                          r &&
                            ((c = o.MetaMetricsEventName.PetnameCreated),
                            (u = { petname_source: e })),
                          c && d(c, u);
                      }, [d, t, l, i, s]);
                    return {
                      trackPetnamesOpenEvent: (0, a.useCallback)(() => {
                        d(o.MetaMetricsEventName.PetnameModalOpened, {
                          has_petname: Boolean(null == i ? void 0 : i.length),
                          suggested_names_sources: e,
                        });
                      }, [d, i, e]),
                      trackPetnamesSaveEvent: p,
                    };
                  });
                var a = e('react'),
                  r = e('../../../../contexts/metametrics'),
                  o = e('../../../../../shared/constants/metametrics');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/name-details/metrics.ts' },
    ],
    [
      6112,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useCopyToClipboard': 6973,
        '../../../../hooks/useDisplayName': 6977,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useName': 6995,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../../../ui/form-combo-field/form-combo-field': 6738,
        './metrics': 6111,
        './name-display': 6113,
        '@metamask/name-controller': 2190,
        'ethereumjs-util': 4393,
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
                  (n.default = function ({ onClose: e, type: t, value: n, variation: v }) {
                    const { name: k, sourceId: x } = (0, m.useName)(n, t, v),
                      { name: M, hasPetname: T } = (0, h.useDisplayName)({
                        value: n,
                        type: t,
                        variation: v,
                      }),
                      E = (0, o.useSelector)(d.getNameSources, i.isEqual),
                      [C, S] = (0, a.useState)(''),
                      [O, I] = (0, a.useState)(!1),
                      [P, j] = (0, a.useState)(),
                      [N, D] = (0, a.useState)(),
                      A = (0, o.useDispatch)(),
                      B = (0, g.useI18nContext)(),
                      R = !T && Boolean(M),
                      F = (function (e, t) {
                        if (!e.length) return e;
                        if (t === r.NameType.ETHEREUM_ADDRESS) return (0, s.toChecksumAddress)(e);
                        return e;
                      })(n, t),
                      { proposedNames: $, initialSources: W } = (function (e, t, n) {
                        const r = (0, o.useDispatch)(),
                          { proposedNames: i } = (0, m.useName)(e, t, n),
                          s = (0, a.useRef)(),
                          [l, c] = (0, a.useState)();
                        return (
                          (0, a.useEffect)(() => {
                            const a = () => {
                                s.current && clearInterval(s.current);
                              },
                              o = async () => {
                                const a = await r(
                                  (0, p.updateProposedNames)({
                                    value: e,
                                    type: t,
                                    onlyUpdateAfterDelay: !0,
                                    variation: n,
                                  })
                                );
                                l ||
                                  c(
                                    (function (e, t) {
                                      const n = Object.keys(e).filter(t => {
                                          var n;
                                          return null === (n = e[t].proposedNames) || void 0 === n
                                            ? void 0
                                            : n.length;
                                        }),
                                        a = Object.keys(t).filter(n => {
                                          var a, r;
                                          return (
                                            !(
                                              null !== (a = e[n]) &&
                                              void 0 !== a &&
                                              a.proposedNames
                                            ) &&
                                            (null === (r = t[n].proposedNames) || void 0 === r
                                              ? void 0
                                              : r.length)
                                          );
                                        });
                                      return [...n, ...a].sort();
                                    })((null == a ? void 0 : a.results) ?? {}, i)
                                  );
                              };
                            return a(), o(), (s.current = setInterval(o, _)), a;
                          }, [e, t, n, r, l, c]),
                          { proposedNames: i, initialSources: l }
                        );
                      })(n, t, v),
                      [L, q] = (0, f.useCopyToClipboard)();
                    (0, a.useEffect)(() => {
                      S(k ?? ''), j(x ?? undefined), D(x ? (k ?? undefined) : undefined);
                    }, [k, x, S, j]);
                    const z = (0, a.useMemo)(
                        () =>
                          (function (e, t, n) {
                            const a = Object.keys(e),
                              r = a
                                .filter(t => {
                                  var n;
                                  return null === (n = e[t]) ||
                                    void 0 === n ||
                                    null === (n = n.proposedNames) ||
                                    void 0 === n
                                    ? void 0
                                    : n.length;
                                })
                                .map(a => {
                                  var r;
                                  return (
                                    (null === (r = e[a]) || void 0 === r
                                      ? void 0
                                      : r.proposedNames) ?? []
                                  ).map(e => ({
                                    value: e,
                                    primaryLabel: t('nameModalMaybeProposedName', [e]),
                                    secondaryLabel: t('nameProviderProposedBy', [w(a, t, n)]),
                                    sourceId: a,
                                  }));
                                })
                                .flat();
                            return r.sort((e, t) =>
                              e.secondaryLabel
                                .toLowerCase()
                                .localeCompare(t.secondaryLabel.toLowerCase())
                            );
                          })($, B, E),
                        [$, E]
                      ),
                      { trackPetnamesOpenEvent: U, trackPetnamesSaveEvent: V } = (0,
                      b.usePetnamesMetrics)({
                        initialSources: W,
                        name: C,
                        proposedNameOptions: z,
                        savedName: k,
                        savedSourceId: x,
                        selectedSourceId: P,
                        type: t,
                      });
                    (0, a.useEffect)(() => {
                      W && !O && (U(), I(!0));
                    }, [W, O, U]);
                    const H = (0, a.useCallback)(async () => {
                        V(),
                          await A(
                            (0, p.setName)({
                              value: n,
                              type: t,
                              name: null != C && C.length ? C : null,
                              sourceId: P,
                              variation: v,
                            })
                          ),
                          e();
                      }, [C, P, e, V, v]),
                      K = (0, a.useCallback)(() => {
                        e();
                      }, [e]),
                      J = (0, a.useCallback)(
                        e => {
                          S(e), e !== N && (j(undefined), D(undefined));
                        },
                        [S, P, j, D]
                      ),
                      G = (0, a.useCallback)(
                        e => {
                          j(e.sourceId), D(e.value);
                        },
                        [j, D]
                      ),
                      Q = (0, a.useCallback)(() => {
                        q(F);
                      }, [q, F]),
                      [Y, X] = T
                        ? [B('nameModalTitleSaved'), B('nameInstructionsSaved')]
                        : R
                          ? [B('nameModalTitleRecognized'), B('nameInstructionsRecognized')]
                          : [B('nameModalTitleNew'), B('nameInstructionsNew')];
                    return a.default.createElement(
                      l.Box,
                      null,
                      a.default.createElement(
                        l.Modal,
                        { isOpen: !0, onClose: K },
                        a.default.createElement(l.ModalOverlay, null),
                        a.default.createElement(
                          l.ModalContent,
                          null,
                          a.default.createElement(l.ModalHeader, { onClose: K }, Y),
                          a.default.createElement(
                            l.ModalBody,
                            { className: 'name-details__modal-body' },
                            a.default.createElement(
                              'div',
                              { style: { textAlign: 'center', marginBottom: 16, marginTop: 8 } },
                              a.default.createElement(y.default, {
                                value: n,
                                type: r.NameType.ETHEREUM_ADDRESS,
                                variation: v,
                              })
                            ),
                            a.default.createElement(
                              l.Text,
                              { marginBottom: 4, justifyContent: c.JustifyContent.spaceBetween },
                              X
                            ),
                            a.default.createElement(l.FormTextField, {
                              id: 'address',
                              className: 'name-details__address',
                              label: B('nameAddressLabel'),
                              value: F,
                              marginBottom: 4,
                              disabled: !0,
                              endAccessory: a.default.createElement(l.ButtonIcon, {
                                display: c.Display.Flex,
                                iconName: L ? l.IconName.CopySuccess : l.IconName.Copy,
                                size: l.ButtonIconSize.Sm,
                                onClick: Q,
                                color: c.IconColor.iconMuted,
                                ariaLabel: B('copyAddress'),
                              }),
                            }),
                            a.default.createElement(
                              l.Label,
                              {
                                flexDirection: c.FlexDirection.Column,
                                alignItems: c.AlignItems.flexStart,
                                marginBottom: 2,
                                className: 'name-details__display-name',
                              },
                              B('nameLabel'),
                              a.default.createElement(u.default, {
                                hideDropdownIfNoOptions: !0,
                                value: C,
                                options: z,
                                placeholder: B('nameSetPlaceholder'),
                                onChange: J,
                                onOptionClick: G,
                              })
                            )
                          ),
                          a.default.createElement(
                            l.ModalFooter,
                            null,
                            a.default.createElement(
                              l.Button,
                              {
                                variant: l.ButtonVariant.Primary,
                                startIconName: l.IconName.Save,
                                width: c.BlockSize.Full,
                                onClick: H,
                                size: l.ButtonSize.Lg,
                              },
                              B('save')
                            )
                          )
                        )
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('@metamask/name-controller'),
                  o = e('react-redux'),
                  i = e('lodash'),
                  s = e('ethereumjs-util'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = v(e('../../../ui/form-combo-field/form-combo-field')),
                  d = e('../../../../selectors'),
                  p = e('../../../../store/actions'),
                  f = e('../../../../hooks/useCopyToClipboard'),
                  m = e('../../../../hooks/useName'),
                  h = e('../../../../hooks/useDisplayName'),
                  g = e('../../../../hooks/useI18nContext'),
                  y = v(e('./name-display')),
                  b = e('./metrics');
                function v(e) {
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
                const _ = 2e3;
                const x = ['ens', 'etherscan', 'lens', 'token'];
                function w(e, t, n) {
                  var a;
                  if (x.includes(e)) {
                    return t(`nameProvider_${e}`);
                  }
                  return (null === (a = n[e]) || void 0 === a ? void 0 : a.label) ?? e;
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/name-details/name-details.tsx' },
    ],
    [
      6113,
      {
        '../../../../hooks/useDisplayName': 6977,
        '../../../component-library': 6402,
        '../../../ui/identicon': 6758,
        './formatted-value': 6110,
        './shortened-name': 6114,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = u(e('classnames')),
                  o = u(e('../../../ui/identicon')),
                  i = e('../../../component-library'),
                  s = e('../../../../hooks/useDisplayName'),
                  l = u(e('./shortened-name')),
                  c = u(e('./formatted-value'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const p = (0, a.memo)(
                  ({
                    value: e,
                    type: t,
                    preferContractSymbol: n,
                    variation: u,
                    handleClick: d,
                  }) => {
                    const {
                        name: p,
                        hasPetname: f,
                        image: m,
                      } = (0, s.useDisplayName)({
                        value: e,
                        type: t,
                        preferContractSymbol: n,
                        variation: u,
                      }),
                      h = (function (e) {
                        return Boolean(e);
                      })(p);
                    return a.default.createElement(
                      'div',
                      {
                        className: (0, r.default)({
                          name: !0,
                          name__clickable: Boolean(d),
                          name__saved: f,
                          name__recognized_unsaved: !f && h,
                          name__missing: !h,
                        }),
                        onClick: d,
                      },
                      h
                        ? a.default.createElement(o.default, { address: e, diameter: 16, image: m })
                        : a.default.createElement(i.Icon, {
                            name: i.IconName.Question,
                            className: 'name__icon',
                            size: i.IconSize.Md,
                          }),
                      h
                        ? a.default.createElement(l.default, { name: p })
                        : a.default.createElement(c.default, { value: e, type: t })
                    );
                  }
                );
                n.default = p;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/name-details/name-display.tsx' },
    ],
    [
      6114,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = s(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('../../../component-library'),
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../helpers/utils/util');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const l = (0, a.memo)(({ name: e }) => {
                  const t = (0, i.shortenString)(e || '', {
                    truncatedCharLimit: 12,
                    truncatedStartChars: 9,
                    truncatedEndChars: 0,
                    skipCharacterInEnd: !0,
                  });
                  return a.default.createElement(
                    r.Text,
                    { className: 'name__name', variant: o.TextVariant.bodyMd },
                    t
                  );
                });
                n.default = l;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/name-details/shortened-name.tsx' },
    ],
    [
      6115,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useDisplayName': 6977,
        '../../component-library': 6402,
        './name-details/name-details': 6112,
        './name-details/name-display': 6113,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('../../component-library'),
                  o = e('../../../contexts/metametrics'),
                  i = e('../../../../shared/constants/metametrics'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useDisplayName'),
                  c = d(e('./name-details/name-display')),
                  u = d(e('./name-details/name-details'));
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = (0, a.memo)(
                  ({ value: e, type: t, preferContractSymbol: n = !1, variation: d }) => {
                    const [p, f] = (0, a.useState)(!1),
                      m = (0, a.useContext)(o.MetaMetricsContext),
                      { name: h } = (0, l.useDisplayName)({
                        value: e,
                        type: t,
                        preferContractSymbol: n,
                        variation: d,
                      });
                    (0, a.useEffect)(() => {
                      m({
                        event: i.MetaMetricsEventName.PetnameDisplayed,
                        category: i.MetaMetricsEventCategory.Petnames,
                        properties: {
                          petname_category: t,
                          has_petname: Boolean(null == h ? void 0 : h.length),
                        },
                      });
                    }, []);
                    const g = (0, a.useCallback)(() => {
                        f(!0);
                      }, [f]),
                      y = (0, a.useCallback)(() => {
                        f(!1);
                      }, [f]);
                    return a.default.createElement(
                      r.Box,
                      { display: s.Display.Flex },
                      p &&
                        a.default.createElement(u.default, {
                          value: e,
                          type: t,
                          variation: d,
                          onClose: y,
                        }),
                      a.default.createElement(c.default, {
                        value: e,
                        type: t,
                        preferContractSymbol: n,
                        variation: d,
                        handleClick: g,
                      })
                    );
                  }
                );
                n.default = f;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/name/name.tsx' },
    ],
    [
      6116,
      {
        '../../../../shared/constants/network': 5804,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../../ui/box/box': 6702,
        '../../ui/icon-with-fallback': 6746,
        '../../ui/identicon': 6758,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = m);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = p(e('prop-types')),
                  o = p(e('../../ui/icon-with-fallback')),
                  i = p(e('../../ui/identicon')),
                  s = e('../../../helpers/constants/design-system'),
                  l = p(e('../../ui/box/box')),
                  c = e('../../../contexts/i18n'),
                  u = e('../../../../shared/constants/network'),
                  d = e('../../component-library');
                function p(e) {
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
                function m({
                  networkName: e,
                  accountName: t,
                  accountBalance: n,
                  tokenName: r,
                  accountAddress: p,
                  chainId: f,
                }) {
                  const m = (0, a.useContext)(c.I18nContext),
                    h = u.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[f],
                    g = h
                      ? 'network-account-balance-header__network-account__ident-icon-ethereum'
                      : 'network-account-balance-header__network-account__ident-icon-ethereum--gray';
                  return a.default.createElement(
                    l.default,
                    {
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      padding: 4,
                      className: 'network-account-balance-header',
                      alignItems: s.AlignItems.center,
                      justifyContent: s.JustifyContent.spaceBetween,
                    },
                    a.default.createElement(
                      l.default,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Row,
                        alignItems: s.AlignItems.center,
                        gap: 2,
                      },
                      a.default.createElement(
                        l.default,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Row,
                          alignItems: s.AlignItems.center,
                        },
                        a.default.createElement(i.default, { address: p, diameter: 32 }),
                        a.default.createElement(o.default, {
                          name: e,
                          size: 16,
                          icon: h,
                          wrapperClassName: g,
                        })
                      ),
                      a.default.createElement(
                        l.default,
                        {
                          display: s.Display.Flex,
                          alignItems: s.AlignItems.flexStart,
                          flexDirection: s.FlexDirection.Column,
                        },
                        a.default.createElement(
                          d.Text,
                          {
                            variant: s.TextVariant.bodySm,
                            as: 'h6',
                            color: s.TextColor.textAlternative,
                            'data-testid': 'signature-request-network-display',
                          },
                          e
                        ),
                        a.default.createElement(
                          d.Text,
                          {
                            variant: s.TextVariant.bodySm,
                            as: 'h6',
                            color: s.TextColor.textDefault,
                            fontWeight: s.FontWeight.Bold,
                          },
                          t
                        )
                      )
                    ),
                    a.default.createElement(
                      l.default,
                      {
                        display: s.Display.Flex,
                        alignItems: s.AlignItems.flexEnd,
                        flexDirection: s.FlexDirection.Column,
                      },
                      a.default.createElement(
                        d.Text,
                        {
                          variant: s.TextVariant.bodySm,
                          as: 'h6',
                          color: s.TextColor.textAlternative,
                        },
                        m('balance')
                      ),
                      a.default.createElement(
                        d.Text,
                        {
                          variant: s.TextVariant.bodySm,
                          as: 'h6',
                          color: s.TextColor.textDefault,
                          fontWeight: s.FontWeight.Bold,
                          align: s.TextAlign.End,
                        },
                        n,
                        ' ',
                        r
                      )
                    )
                  );
                }
                m.propTypes = {
                  networkName: r.default.string,
                  accountName: r.default.string,
                  accountBalance: r.default.string,
                  tokenName: r.default.string,
                  accountAddress: r.default.string,
                  chainId: r.default.string,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/network-account-balance-header/network-account-balance-header.js',
      },
    ],
    [
      6117,
      { './network-display': 6118 },
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
                var a,
                  r = (a = e('./network-display')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/network-display/index.js' },
    ],
    [
      6118,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../component-library': 6402,
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
                    const t = (0, o.useSelector)(s.getCurrentNetwork);
                    return r.default.createElement(l.PickerNetwork, {
                      className: 'network-display',
                      label: null == t ? void 0 : t.nickname,
                      labelProps: { 'data-testid': 'network-display' },
                      src:
                        null == t || null === (e = t.rpcPrefs) || void 0 === e
                          ? void 0
                          : e.imageUrl,
                      iconProps: { display: 'none' },
                      avatarNetworkProps: { size: l.AvatarNetworkSize.Xs },
                      as: 'div',
                      backgroundColor: i.BackgroundColor.transparent,
                      borderWidth: 0,
                      borderColor: i.BorderColor.borderMuted,
                    });
                  });
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../selectors'),
                  l = e('../../component-library');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/network-display/network-display.js' },
    ],
    [
      6119,
      { './permission-cell': 6122 },
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
                var a,
                  r = (a = e('./permission-cell')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permission-cell/index.js' },
    ],
    [
      6120,
      {
        '../../../../shared/constants/snaps/permissions': 5814,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/box': 6703,
        '../../ui/menu': 6773,
        '../../ui/popover/popover.component': 6790,
        'prop-types': 5082,
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
                  (n.PermissionCellOptions = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = m(e('prop-types')),
                  o = e('react-redux'),
                  i = m(e('../../ui/box')),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../component-library'),
                  c = e('../../ui/menu'),
                  u = e('../../../helpers/constants/design-system'),
                  d = m(e('../../ui/popover/popover.component')),
                  p = e('../../../../shared/constants/snaps/permissions'),
                  f = e('../../../store/actions');
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
                const g = ({ snapId: e, permissionName: t, description: n }) => {
                  const r = (0, s.useI18nContext)(),
                    m = (0, o.useDispatch)(),
                    h = (0, a.useRef)(!1),
                    [g, y] = (0, a.useState)(!1),
                    [b, v] = (0, a.useState)(!1),
                    k = p.DynamicSnapPermissions.includes(t);
                  return n || k
                    ? a.default.createElement(
                        i.default,
                        { ref: h },
                        a.default.createElement(l.ButtonIcon, {
                          iconName: l.IconName.MoreVertical,
                          ariaLabel: r('options'),
                          onClick: () => {
                            y(!0);
                          },
                          'data-testid': t,
                        }),
                        g &&
                          a.default.createElement(
                            c.Menu,
                            {
                              anchorElement: h.current,
                              onHide: () => {
                                y(!1);
                              },
                            },
                            n &&
                              a.default.createElement(
                                c.MenuItem,
                                {
                                  onClick: () => {
                                    y(!1), v(!0);
                                  },
                                },
                                a.default.createElement(
                                  l.Text,
                                  {
                                    variant: u.TextVariant.bodySm,
                                    style: { whiteSpace: 'nowrap' },
                                  },
                                  r('details')
                                )
                              ),
                            k &&
                              a.default.createElement(
                                c.MenuItem,
                                {
                                  onClick: () => {
                                    y(!1), m((0, f.revokeDynamicSnapPermissions)(e, [t]));
                                  },
                                },
                                a.default.createElement(
                                  l.Text,
                                  {
                                    variant: u.TextVariant.bodySm,
                                    color: u.TextColor.errorDefault,
                                    style: { whiteSpace: 'nowrap' },
                                  },
                                  r('revokePermission')
                                )
                              )
                          ),
                        b &&
                          a.default.createElement(
                            d.default,
                            {
                              title: r('details'),
                              onClose: () => {
                                y(!1), v(!1);
                              },
                            },
                            a.default.createElement(
                              i.default,
                              { marginLeft: 4, marginRight: 4, marginBottom: 4 },
                              a.default.createElement(l.Text, null, n)
                            )
                          )
                      )
                    : null;
                };
                (n.PermissionCellOptions = g),
                  (g.propTypes = {
                    snapId: r.default.string.isRequired,
                    permissionName: r.default.string.isRequired,
                    description: r.default.oneOfType([r.default.string, r.default.object]),
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permission-cell/permission-cell-options.js' },
    ],
    [
      6121,
      {
        '../../../../shared/constants/network': 5804,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../multichain/avatar-group': 6525,
        '../../multichain/avatar-group/avatar-group.types': 6524,
        '../../ui/tooltip': 6818,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.PermissionCellStatus = void 0);
                var a = f(e('react')),
                  r = f(e('prop-types')),
                  o = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = f(e('../../ui/tooltip')),
                  l = e('../../multichain/avatar-group'),
                  c = e('../../multichain/avatar-group/avatar-group.types'),
                  u = e('../../../hooks/useI18nContext'),
                  d = e('../../../helpers/utils/util'),
                  p = e('../../../../shared/constants/network');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const m = ({
                  revoked: e,
                  approved: t,
                  dateApproved: n,
                  accounts: r,
                  networks: f,
                }) => {
                  const m = (0, u.useI18nContext)(),
                    h = () =>
                      a.default.createElement(
                        a.default.Fragment,
                        null,
                        f.length > 0
                          ? a.default.createElement(
                              o.Box,
                              {
                                as: 'span',
                                className: 'permission-cell__status__accounts-group-box',
                                display: i.Display.InlineFlex,
                              },
                              a.default.createElement(
                                o.Box,
                                { display: i.Display.Flex, flexDirection: i.FlexDirection.Column },
                                null == f
                                  ? void 0
                                  : f.map((e, t) =>
                                      a.default.createElement(
                                        o.Box,
                                        {
                                          key: `${e.name}_${t}`,
                                          display: i.Display.Flex,
                                          justifyContent: i.JustifyContent.flexStart,
                                          alignItems: i.AlignItems.center,
                                          marginTop: 2,
                                        },
                                        a.default.createElement(o.AvatarNetwork, {
                                          size: o.AvatarNetworkSize.Xs,
                                          src: p.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                                          name: e.name,
                                        }),
                                        a.default.createElement(
                                          o.Text,
                                          { variant: i.TextVariant.bodyMdMedium, marginLeft: 2 },
                                          e.name
                                        )
                                      )
                                    )
                              )
                            )
                          : a.default.createElement(
                              o.Box,
                              {
                                as: 'span',
                                className: 'permission-cell__status__accounts-group-box',
                                display: i.Display.InlineFlex,
                              },
                              a.default.createElement(
                                s.default,
                                {
                                  position: 'bottom',
                                  html: a.default.createElement(
                                    o.Box,
                                    {
                                      display: i.Display.Flex,
                                      flexDirection: i.FlexDirection.Column,
                                      justifyContent: i.JustifyContent.center,
                                      alignItems: i.AlignItems.center,
                                    },
                                    a.default.createElement(
                                      o.Text,
                                      {
                                        variant: i.TextVariant.headingSm,
                                        color: i.TextColor.textAlternative,
                                        textAlign: i.TextAlign.Center,
                                      },
                                      m('accounts')
                                    ),
                                    a.default.createElement(
                                      o.Box,
                                      {
                                        display: i.Display.Flex,
                                        flexDirection: i.FlexDirection.Column,
                                      },
                                      r.map((e, t) =>
                                        a.default.createElement(
                                          o.Box,
                                          {
                                            key: `${e.avatarValue}_${t}`,
                                            display: i.Display.Flex,
                                            justifyContent: i.JustifyContent.flexStart,
                                            alignItems: i.AlignItems.center,
                                            marginTop: 2,
                                          },
                                          a.default.createElement(o.AvatarAccount, {
                                            address: e.avatarValue,
                                            size: o.AvatarAccountSize.Xs,
                                            borderColor: i.BorderColor.backgroundDefault,
                                          }),
                                          a.default.createElement(
                                            o.Text,
                                            { variant: i.TextVariant.bodyMdMedium, marginLeft: 2 },
                                            e.avatarName
                                          )
                                        )
                                      )
                                    )
                                  ),
                                },
                                a.default.createElement(l.AvatarGroup, {
                                  limit: 3,
                                  members: r,
                                  avatarType: c.AvatarType.ACCOUNT,
                                  size: o.AvatarTokenSize.Xs,
                                  width: i.BlockSize.Min,
                                  borderColor: i.BorderColor.backgroundDefault,
                                  marginLeft: 4,
                                  paddingLeft: 4,
                                })
                              )
                            )
                      );
                  return a.default.createElement(
                    o.Text,
                    {
                      as: 'div',
                      className: 'permission-cell__status',
                      variant: i.TextVariant.bodySm,
                      color: i.TextColor.textAlternative,
                      display: i.Display.Flex,
                    },
                    e
                      ? r && r.length
                        ? m('permissionRevokedForAccounts', [h()])
                        : m('permissionRevoked')
                      : n
                        ? r && r.length
                          ? m('approvedOnForAccounts', [(0, d.formatDate)(n, 'yyyy-MM-dd'), h()])
                          : m('approvedOn', [(0, d.formatDate)(n, 'yyyy-MM-dd')])
                        : t
                          ? m('approved')
                          : r && r.length
                            ? m('permissionRequestedForAccounts', [h()])
                            : m('permissionRequested')
                  );
                };
                (n.PermissionCellStatus = m),
                  (m.propTypes = {
                    revoked: r.default.bool,
                    approved: r.default.bool,
                    dateApproved: r.default.number,
                    accounts: r.default.array,
                    networks: r.default.array,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permission-cell/permission-cell-status.js' },
    ],
    [
      6122,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/tooltip': 6818,
        './permission-cell-options': 6120,
        './permission-cell-status': 6121,
        classnames: 4168,
        'prop-types': 5082,
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
                var a = f(e('react')),
                  r = f(e('prop-types')),
                  o = f(e('classnames')),
                  i = e('react-redux'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../component-library'),
                  c = f(e('../../ui/tooltip')),
                  u = e('../../../selectors'),
                  d = e('./permission-cell-options'),
                  p = e('./permission-cell-status');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const m = ({
                  snapId: e,
                  permissionName: t,
                  title: n,
                  description: r,
                  weight: f,
                  avatarIcon: m,
                  dateApproved: h,
                  revoked: g,
                  approved: y,
                  showOptions: b,
                  hideStatus: v,
                  accounts: k,
                  chainIds: _,
                }) => {
                  var x;
                  const w = l.IconName.Info;
                  let M = s.IconColor.iconMuted,
                    T = s.IconColor.primaryDefault,
                    E = s.Color.primaryMuted;
                  !g &&
                    f <= 2 &&
                    ((T = s.IconColor.warningDefault),
                    (E = s.Color.warningMuted),
                    (M = s.IconColor.warningDefault)),
                    (h || y) && ((T = s.IconColor.iconMuted), (E = s.Color.backgroundAlternative)),
                    g && ((T = s.IconColor.iconMuted), (E = s.Color.backgroundAlternative));
                  let C = m;
                  'string' != typeof m &&
                    null != m &&
                    null !== (x = m.props) &&
                    void 0 !== x &&
                    x.iconName &&
                    (C = m.props.iconName);
                  const S = (0, i.useSelector)(e => (0, u.getRequestingNetworkInfo)(e, _));
                  return a.default.createElement(
                    l.Box,
                    {
                      className: 'permission-cell',
                      display: s.Display.Flex,
                      justifyContent: s.JustifyContent.center,
                      alignItems: s.AlignItems.flexStart,
                      paddingTop: 2,
                      paddingBottom: 2,
                    },
                    a.default.createElement(
                      l.Box,
                      { display: s.Display.Flex },
                      'string' == typeof C
                        ? a.default.createElement(l.AvatarIcon, {
                            iconName: C,
                            size: l.AvatarIconSize.Md,
                            iconProps: { size: l.IconSize.Sm },
                            color: T,
                            backgroundColor: E,
                          })
                        : C
                    ),
                    a.default.createElement(
                      l.Box,
                      {
                        display: s.Display.Flex,
                        flexWrap: s.FlexWrap.Wrap,
                        flexDirection: s.FlexDirection.Column,
                        width: s.BlockSize.Full,
                        marginLeft: 4,
                        marginRight: 4,
                      },
                      a.default.createElement(
                        l.Text,
                        {
                          size: s.Size.MD,
                          variant: s.TextVariant.bodyMd,
                          className: (0, o.default)('permission-cell__title', {
                            'permission-cell__title-revoked': g,
                          }),
                        },
                        n
                      ),
                      !v &&
                        a.default.createElement(p.PermissionCellStatus, {
                          revoked: g,
                          approved: y,
                          dateApproved: h,
                          accounts: k,
                          networks: S || null,
                        })
                    ),
                    a.default.createElement(
                      l.Box,
                      { display: s.Display.Flex },
                      b && e
                        ? a.default.createElement(d.PermissionCellOptions, {
                            snapId: e,
                            permissionName: t,
                            description: r,
                          })
                        : r &&
                            a.default.createElement(
                              c.default,
                              {
                                html: a.default.createElement(
                                  l.Text,
                                  {
                                    variant: s.TextVariant.bodySm,
                                    color: s.TextColor.textAlternative,
                                  },
                                  r
                                ),
                                position: 'bottom',
                              },
                              a.default.createElement(l.Icon, {
                                color: M,
                                name: w,
                                size: l.IconSize.Sm,
                              })
                            )
                    )
                  );
                };
                m.propTypes = {
                  snapId: r.default.string,
                  permissionName: r.default.oneOfType([r.default.string, r.default.element])
                    .isRequired,
                  title: r.default.oneOfType([
                    r.default.string.isRequired,
                    r.default.object.isRequired,
                  ]),
                  description: r.default.oneOfType([r.default.string, r.default.object]),
                  weight: r.default.number,
                  avatarIcon: r.default.any.isRequired,
                  dateApproved: r.default.number,
                  revoked: r.default.bool,
                  approved: r.default.bool,
                  showOptions: r.default.bool,
                  hideStatus: r.default.bool,
                  accounts: r.default.array,
                  chainIds: r.default.array,
                };
                n.default = m;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permission-cell/permission-cell.js' },
    ],
    [
      6123,
      { './permission-connect-header': 6124 },
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
                var a,
                  r = (a = e('./permission-connect-header')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permission-connect-header/index.js' },
    ],
    [
      6124,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../pages/confirmations/components/confirm/nav': 7197,
        '../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = c(e('react')),
                  r = c(e('prop-types')),
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/utils/util'),
                  l = e('../../../pages/confirmations/components/confirm/nav');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({ requestId: e, origin: t, iconUrl: n }) => {
                  const r = (e => {
                    try {
                      const t = new URL(e);
                      return t.hostname.split('.').slice(-2).join('.');
                    } catch (e) {
                      return 'Unknown Origin';
                    }
                  })(t);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(l.Nav, { confirmationId: e }),
                    a.default.createElement(
                      i.Box,
                      {
                        backgroundColor: o.BackgroundColor.backgroundDefault,
                        width: o.BlockSize.Full,
                        alignItems: o.AlignItems.center,
                        display: o.Display.Flex,
                        padding: 4,
                        style: { boxShadow: 'var(--shadow-size-lg) var(--color-shadow-default)' },
                      },
                      a.default.createElement(
                        i.Box,
                        null,
                        n
                          ? a.default.createElement(i.AvatarFavicon, {
                              backgroundColor: o.BackgroundColor.backgroundAlternative,
                              size: i.IconSize.Lg,
                              src: n,
                              name: r,
                            })
                          : a.default.createElement(
                              i.AvatarBase,
                              {
                                size: i.IconSize.Lg,
                                display: o.Display.Flex,
                                alignItems: o.AlignItems.center,
                                justifyContent: o.JustifyContent.center,
                                color: o.TextColor.textAlternative,
                                style: { borderWidth: '0px' },
                                backgroundColor: o.BackgroundColor.backgroundAlternative,
                              },
                              (0, s.getAvatarFallbackLetter)(r)
                            )
                      ),
                      a.default.createElement(
                        i.Box,
                        {
                          marginLeft: 4,
                          marginRight: 4,
                          display: o.Display.Flex,
                          flexDirection: o.FlexDirection.Column,
                          style: { overflow: 'hidden' },
                        },
                        a.default.createElement(
                          i.Text,
                          { ellipsis: !0, fontWeight: o.FontWeight.Medium },
                          r
                        ),
                        a.default.createElement(
                          i.Text,
                          {
                            ellipsis: !0,
                            variant: o.TextVariant.bodySm,
                            color: o.TextColor.textAlternative,
                          },
                          t
                        )
                      )
                    )
                  );
                };
                u.propTypes = {
                  requestId: r.default.string,
                  origin: r.default.string,
                  iconUrl: r.default.string,
                };
                n.default = u;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permission-connect-header/permission-connect-header.js',
      },
    ],
    [
      6125,
      {
        './permission-page-container-content': 6126,
        './permission-page-container.container': 6130,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'PermissionPageContainerContent', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var a = o(e('./permission-page-container.container')),
                  r = o(e('./permission-page-container-content'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permission-page-container/index.js' },
    ],
    [
      6126,
      { './permission-page-container-content.component': 6127 },
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
                var a,
                  r =
                    (a = e('./permission-page-container-content.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permission-page-container/permission-page-container-content/index.js',
      },
    ],
    [
      6127,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../component-library': 6402,
        '../../permissions-connect-permission-list': 6133,
        '@metamask/permission-controller': 2421,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = d(e('prop-types')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('@metamask/permission-controller'),
                  i = d(e('../../permissions-connect-permission-list')),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/utils/util');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class f extends r.PureComponent {
                  render() {
                    var e;
                    const { t: t } = this.context,
                      {
                        selectedPermissions: n,
                        selectedAccounts: a,
                        subjectMetadata: u,
                        requestedChainIds: d,
                        request: p,
                      } = this.props,
                      f = a.reduce(
                        (e, t) => (e.push({ avatarValue: t.address, avatarName: t.label }), e),
                        []
                      ),
                      { origin: m, subjectType: h } = u,
                      g = h === o.SubjectType.Website ? (0, c.getURLHost)(m) : m;
                    return r.default.createElement(
                      l.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Column,
                        justifyContent: s.JustifyContent.flexStart,
                        alignItems: s.AlignItems.center,
                        height: s.BlockSize.Full,
                        paddingLeft: 4,
                        paddingRight: 4,
                        backgroundColor: s.BackgroundColor.backgroundAlternative,
                      },
                      r.default.createElement(
                        l.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          justifyContent: s.JustifyContent.center,
                          alignItems: s.AlignItems.center,
                          paddingTop: 4,
                          paddingBottom: 4,
                        },
                        r.default.createElement(
                          l.Text,
                          { variant: s.TextVariant.headingMd, textAlign: s.TextAlign.Center },
                          t('reviewPermissions')
                        ),
                        r.default.createElement(
                          l.Text,
                          { variant: s.TextVariant.bodyMd, textAlign: s.TextAlign.Center },
                          t('nativeNetworkPermissionRequestDescription', [
                            r.default.createElement(
                              l.Text,
                              {
                                as: 'span',
                                key: `description_key_${g}`,
                                fontWeight: s.FontWeight.Medium,
                              },
                              g
                            ),
                          ])
                        )
                      ),
                      r.default.createElement(
                        l.Box,
                        {
                          display: s.Display.Flex,
                          backgroundColor: s.BackgroundColor.backgroundDefault,
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingTop: 2,
                          paddingBottom: 2,
                          borderRadius: s.BorderRadius.XL,
                        },
                        r.default.createElement(i.default, {
                          isRequestApprovalPermittedChains: Boolean(
                            null === (e = p.diff) || void 0 === e ? void 0 : e.permissionDiffMap
                          ),
                          permissions: n,
                          subjectName: u.origin,
                          accounts: f,
                          requestedChainIds: d,
                        })
                      )
                    );
                  }
                }
                (n.default = f),
                  p(f, 'propTypes', {
                    request: a.default.object,
                    subjectMetadata: a.default.shape({
                      name: a.default.string.isRequired,
                      origin: a.default.string.isRequired,
                      subjectType: a.default.string.isRequired,
                      extensionId: a.default.string,
                      iconUrl: a.default.string,
                    }),
                    selectedPermissions: a.default.object.isRequired,
                    selectedAccounts: a.default.array,
                    requestedChainIds: a.default.array,
                  }),
                  p(f, 'defaultProps', {
                    request: {},
                    selectedAccounts: [],
                    requestedChainIds: [],
                  }),
                  p(f, 'contextTypes', { t: a.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permission-page-container/permission-page-container-content/permission-page-container-content.component.js',
      },
    ],
    [
      6128,
      {
        '../../../hooks/useI18nContext': 6985,
        '../../../pages/confirmations/confirmation/alerts/TemplateAlertContext': 7268,
        '../../component-library': 6402,
        '../../ui/page-container': 6783,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.PermissionPageContainerFooter = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../hooks/useI18nContext'),
                  i = e('../../../pages/confirmations/confirmation/alerts/TemplateAlertContext'),
                  s = e('../../component-library'),
                  l = e('../../ui/page-container');
                n.PermissionPageContainerFooter = ({
                  cancelText: e,
                  disabled: t,
                  onCancel: n,
                  onSubmit: a,
                }) => {
                  const c = (0, o.useI18nContext)(),
                    { hasAlerts: u, showAlertsModal: d } = (0, i.useTemplateAlertContext)();
                  return r.default.createElement(l.PageContainerFooter, {
                    footerClassName: 'permission-page-container-footer',
                    cancelButtonType: 'default',
                    onCancel: n,
                    cancelText: e,
                    onSubmit: u ? d : a,
                    submitText: c('confirm'),
                    buttonSizeLarge: !1,
                    disabled: t,
                    submitButtonIcon: u
                      ? r.default.createElement(s.Icon, {
                          name: s.IconName.Info,
                          size: s.IconSize.Sm,
                        })
                      : undefined,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permission-page-container/permission-page-container-footer.component.tsx',
      },
    ],
    [
      6129,
      {
        '.': 6125,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/permissions': 5808,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/permissions': 6913,
        '../../../helpers/utils/util': 6921,
        '../../../pages/confirmations/confirmation/alerts/TemplateAlertContext': 7268,
        '../../../pages/permissions-connect/connect-page/utils': 7443,
        '../../component-library': 6402,
        '../permissions-connect-footer': 6131,
        '../snaps/snap-privacy-warning': 6186,
        './permission-page-container-footer.component': 6128,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/permission-controller': 2421,
        '@metamask/snaps-rpc-methods': 2733,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = _(e('prop-types')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('@metamask/snaps-rpc-methods'),
                  i = e('@metamask/chain-agnostic-permission'),
                  s = e('@metamask/permission-controller'),
                  l = e('../../../../shared/constants/metametrics'),
                  c = _(e('../permissions-connect-footer')),
                  u = e('../../../../shared/constants/permissions'),
                  d = _(e('../snaps/snap-privacy-warning')),
                  p = e('../../../helpers/utils/util'),
                  f = e('../../../helpers/constants/design-system'),
                  m = e('../../component-library'),
                  h = e('../../../pages/permissions-connect/connect-page/utils'),
                  g = e('../../../pages/confirmations/confirmation/alerts/TemplateAlertContext'),
                  y = e('../../../helpers/utils/permissions'),
                  b = e('./permission-page-container-footer.component'),
                  v = e('.');
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function _(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function x(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var a = n.call(e, t || 'default');
                          if ('object' != typeof a) return a;
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
                class w extends r.Component {
                  constructor(...e) {
                    super(...e),
                      x(this, 'state', {}),
                      x(this, 'onCancel', () => {
                        const { request: e, rejectPermissionsRequest: t } = this.props;
                        t(e.metadata.id);
                      }),
                      x(this, 'onSubmit', () => {
                        const {
                            request: e,
                            approvePermissionsRequest: t,
                            rejectPermissionsRequest: n,
                            selectedAccounts: a,
                            requestedChainIds: r,
                          } = this.props,
                          o = a.map(e => e.address),
                          i = (0, h.getRequestedCaip25CaveatValue)(e.permissions),
                          s = {
                            ...e,
                            permissions: {
                              ...e.permissions,
                              ...(0, h.getCaip25PermissionsResponse)(i, o, r),
                            },
                          };
                        Object.keys(s.permissions).length > 0 ? t(s) : n(s.metadata.id);
                      }),
                      x(this, 'onLeftFooterClick', () => {
                        this.getRequestedPermissions()[i.Caip25EndowmentPermissionName] ===
                        undefined
                          ? this.goBack()
                          : this.onCancel();
                      });
                  }
                  getRequestedPermissions() {
                    var e;
                    const { request: t } = this.props,
                      n =
                        (null == t || null === (e = t.diff) || void 0 === e
                          ? void 0
                          : e.permissionDiffMap) ??
                        t.permissions ??
                        {};
                    return Object.entries(n).reduce(
                      (e, [t, n]) =>
                        t === u.RestrictedMethods.wallet_snap
                          ? ((e[t] = this.getDedupedSnapPermissions()), e)
                          : ((e[t] = n), e),
                      {}
                    );
                  }
                  getDedupedSnapPermissions() {
                    var e;
                    const { request: t, currentPermissions: n } = this.props,
                      a = (0, p.getDedupedSnaps)(t, n);
                    return {
                      ...((null == t || null === (e = t.permissions) || void 0 === e
                        ? void 0
                        : e[o.WALLET_SNAP_PERMISSION_KEY]) || {}),
                      caveats: [
                        {
                          type: o.SnapCaveatType.SnapIds,
                          value: a.reduce((e, t) => ((e[t] = {}), e), {}),
                        },
                      ],
                    };
                  }
                  showSnapsPrivacyWarning() {
                    this.setState({ isShowingSnapsPrivacyWarning: !0 });
                  }
                  componentDidMount() {
                    this.context.trackEvent({
                      category: l.MetaMetricsEventCategory.Auth,
                      event: 'Tab Opened',
                      properties: { action: 'Connect', legacy_event: !0 },
                    }),
                      this.props.request.permissions[o.WALLET_SNAP_PERMISSION_KEY] &&
                        !1 === this.props.snapsInstallPrivacyWarningShown &&
                        this.showSnapsPrivacyWarning();
                  }
                  goBack() {
                    const { history: e, connectPath: t } = this.props;
                    e.push(t);
                  }
                  render() {
                    var e;
                    const {
                        request: t,
                        requestMetadata: n,
                        targetSubjectMetadata: a,
                        selectedAccounts: o,
                        allAccountsSelected: l,
                        requestedChainIds: u,
                      } = this.props,
                      p = this.getRequestedPermissions(),
                      h = e => {
                        this.setState({ isShowingSnapsPrivacyWarning: e });
                      },
                      k = () => {
                        h(!1), this.props.setSnapsInstallPrivacyWarningShownStatus(!0);
                      },
                      _ = p[i.Caip25EndowmentPermissionName]
                        ? this.context.t('cancel')
                        : this.context.t('back');
                    return r.default.createElement(
                      g.TemplateAlertContextProvider,
                      {
                        onSubmit: () => this.onSubmit(),
                        confirmationId:
                          null == t || null === (e = t.metadata) || void 0 === e ? void 0 : e.id,
                      },
                      this.state.isShowingSnapsPrivacyWarning &&
                        r.default.createElement(d.default, {
                          onAccepted: () => k(),
                          onCanceled: () => this.onCancel(),
                        }),
                      r.default.createElement(v.PermissionPageContainerContent, {
                        request: t,
                        requestMetadata: n,
                        subjectMetadata: a,
                        selectedPermissions: p,
                        requestedChainIds: u,
                        selectedAccounts: o,
                        allAccountsSelected: l,
                      }),
                      r.default.createElement(
                        m.Box,
                        {
                          display: f.Display.Flex,
                          backgroundColor: f.BackgroundColor.backgroundAlternative,
                          flexDirection: f.FlexDirection.Column,
                        },
                        (null == a ? void 0 : a.subjectType) !== s.SubjectType.Snap &&
                          r.default.createElement(c.default, null),
                        r.default.createElement(b.PermissionPageContainerFooter, {
                          onCancel: () => this.onLeftFooterClick(),
                          cancelText: _,
                          onSubmit: () => this.onSubmit(),
                          disabled: (0, y.containsEthPermissionsAndNonEvmAccount)(o, p),
                        })
                      )
                    );
                  }
                }
                (n.default = w),
                  x(w, 'propTypes', {
                    approvePermissionsRequest: a.default.func.isRequired,
                    rejectPermissionsRequest: a.default.func.isRequired,
                    selectedAccounts: a.default.array,
                    requestedChainIds: a.default.array,
                    allAccountsSelected: a.default.bool,
                    currentPermissions: a.default.object,
                    snapsInstallPrivacyWarningShown: a.default.bool.isRequired,
                    setSnapsInstallPrivacyWarningShownStatus: a.default.func,
                    request: a.default.object,
                    requestMetadata: a.default.object,
                    targetSubjectMetadata: a.default.shape({
                      name: a.default.string,
                      origin: a.default.string.isRequired,
                      subjectType: a.default.string.isRequired,
                      extensionId: a.default.string,
                      iconUrl: a.default.string,
                    }),
                    history: a.default.object.isRequired,
                    connectPath: a.default.string.isRequired,
                  }),
                  x(w, 'defaultProps', {
                    request: {},
                    requestMetadata: {},
                    selectedAccounts: [],
                    allAccountsSelected: !1,
                    currentPermissions: {},
                  }),
                  x(w, 'contextTypes', { t: a.default.func, trackEvent: a.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permission-page-container/permission-page-container.component.js',
      },
    ],
    [
      6130,
      {
        '../../../selectors': 7601,
        './permission-page-container.component': 6129,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = e('react-redux'),
                  o = e('../../../selectors'),
                  i =
                    (a = e('./permission-page-container.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = (0, r.connect)((e, t) => {
                  var n;
                  const { selectedAccounts: a } = t,
                    r = (0, o.getPermissions)(
                      e,
                      null === (n = t.request.metadata) || void 0 === n ? void 0 : n.origin
                    ),
                    i = (0, o.getInternalAccounts)(e);
                  return {
                    allInternalAccountsSelected:
                      Object.keys(a).length === Object.keys(i).length && a.length > 1,
                    currentPermissions: r,
                  };
                })(i.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permission-page-container/permission-page-container.container.js',
      },
    ],
    [
      6131,
      { './permissions-connect-footer.component': 6132 },
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
                var a,
                  r =
                    (a = e('./permissions-connect-footer.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permissions-connect-footer/index.js' },
    ],
    [
      6132,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r,
                  o,
                  i = p(e('prop-types')),
                  s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  l = p(e('../../../helpers/constants/zendesk-url')),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../component-library');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                class f extends s.Component {
                  render() {
                    const { t: e } = this.context;
                    return s.default.createElement(
                      u.Box,
                      {
                        display: c.Display.Flex,
                        alignItems: c.AlignItems.center,
                        justifyContent: c.JustifyContent.center,
                      },
                      s.default.createElement(
                        u.Text,
                        { variant: c.TextVariant.bodyMd },
                        e('onlyConnectTrust', [
                          s.default.createElement(
                            u.ButtonLink,
                            {
                              key: 'permission-connect-footer-learn-more-link',
                              size: u.ButtonLinkSize.Inherit,
                              target: '_blank',
                              onClick: () => {
                                global.platform.openTab({ url: l.default.USER_GUIDE_DAPPS });
                              },
                            },
                            e('learnMoreUpperCase')
                          ),
                        ])
                      )
                    );
                  }
                }
                (n.default = f),
                  (a = f),
                  (r = 'contextTypes'),
                  (o = { t: i.default.func }),
                  (r = (function (e) {
                    var t = (function (e, t) {
                      if ('object' != typeof e || !e) return e;
                      var n = e[Symbol.toPrimitive];
                      if (void 0 !== n) {
                        var a = n.call(e, t || 'default');
                        if ('object' != typeof a) return a;
                        throw new TypeError('@@toPrimitive must return a primitive value.');
                      }
                      return ('string' === t ? String : Number)(e);
                    })(e, 'string');
                    return 'symbol' == typeof t ? t : t + '';
                  })(r)) in a
                    ? Object.defineProperty(a, r, {
                        value: o,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (a[r] = o);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permissions-connect-footer/permissions-connect-footer.component.js',
      },
    ],
    [
      6133,
      { './permissions-connect-permission-list': 6134 },
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
                var a,
                  r =
                    (a = e('./permissions-connect-permission-list')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/permissions-connect-permission-list/index.js' },
    ],
    [
      6134,
      {
        '../../../helpers/utils/permission': 6912,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../permission-cell': 6119,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = f);
                var a = p(e('react')),
                  r = p(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../helpers/utils/permission'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../../selectors'),
                  c = e('../../../helpers/utils/util'),
                  u = p(e('../permission-cell')),
                  d = e('../../component-library');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function f({
                  isRequestApprovalPermittedChains: e,
                  permissions: t,
                  subjectName: n,
                  accounts: r,
                  requestedChainIds: p,
                }) {
                  const f = (0, s.useI18nContext)(),
                    m = (0, o.useSelector)(l.getSnapsMetadata);
                  return a.default.createElement(
                    d.Box,
                    { as: 'span' },
                    (0, i.getWeightedPermissions)({
                      t: f,
                      isRequestApprovalPermittedChains: e,
                      permissions: t,
                      getSubjectName: (0, c.getSnapName)(m),
                      subjectName: n,
                    }).map((e, t) =>
                      (function ({ permission: e, index: t, accounts: n, requestedChainIds: r }) {
                        return a.default.createElement(u.default, {
                          permissionName: e.name,
                          title: e.label,
                          description: e.description,
                          weight: e.weight,
                          avatarIcon: e.leftIcon,
                          key: `${e.permissionName}-${t}`,
                          accounts: n,
                          chainIds: r,
                        });
                      })({ permission: e, index: t, accounts: r, requestedChainIds: p })
                    )
                  );
                }
                f.propTypes = {
                  permissions: r.default.object.isRequired,
                  subjectName: r.default.string.isRequired,
                  requestedChainIds: r.default.array,
                  accounts: r.default.arrayOf(r.default.object),
                  isRequestApprovalPermittedChains: r.default.boolean,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/permissions-connect-permission-list/permissions-connect-permission-list.js',
      },
    ],
    [
      6135,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/time': 5817,
        '../../../helpers/utils/webcam-utils': 6922,
        '../../../hooks/useI18nContext': 6985,
        '../../ui/page-container/page-container-footer/page-container-footer.component': 6785,
        './enhanced-reader': 6136,
        '@ngraveio/bc-ur': 3014,
        loglevel: 4929,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = m(e('loglevel')),
                  o = e('@ngraveio/bc-ur'),
                  i = m(e('prop-types')),
                  s = e('../../../../app/scripts/lib/util'),
                  l = e('../../../../shared/constants/app'),
                  c = m(e('../../../helpers/utils/webcam-utils')),
                  u = m(
                    e(
                      '../../ui/page-container/page-container-footer/page-container-footer.component'
                    )
                  ),
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../../shared/constants/time'),
                  f = m(e('./enhanced-reader'));
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
                const g = 'ACCESSING_CAMERA',
                  y = 'NEED_TO_ALLOW_ACCESS',
                  b = 'READY',
                  v = ({
                    isReadingWallet: e,
                    handleCancel: t,
                    handleSuccess: n,
                    setErrorTitle: i,
                  }) => {
                    const m = (0, d.useI18nContext)(),
                      [h, v] = (0, a.useState)(g),
                      [k, _] = (0, a.useState)(null),
                      [x, w] = (0, a.useState)(new o.URDecoder()),
                      [M, T] = (0, a.useState)(0);
                    let E = null;
                    const C = (0, a.useRef)(!1),
                      S = async () => {
                        try {
                          const { environmentReady: e } = await c.default.checkStatus();
                          if (!e && (0, s.getEnvironmentType)() !== l.ENVIRONMENT_TYPE_FULLSCREEN) {
                            const e = new URL(window.location.href).hash,
                              t = e ? e.substring(1) : null;
                            global.platform.openExtensionInBrowser(t);
                          }
                        } catch (e) {
                          C.current && _(e);
                        }
                        return P();
                      },
                      O = async () => {
                        try {
                          const { permissions: e } = await c.default.checkStatus();
                          if (e) {
                            if ((await new Promise(e => setTimeout(e, 2 * p.SECOND)), !C.current))
                              return;
                            v(b);
                          } else C.current && ((E = setTimeout(O, p.SECOND)), v(y));
                        } catch (e) {
                          C.current && _(e);
                        }
                      },
                      I = t => {
                        try {
                          if (!t) return;
                          if ((x.receivePart(t), T(x.estimatedPercentComplete()), x.isComplete())) {
                            const e = x.resultUR();
                            n(e).catch(_);
                          }
                        } catch (t) {
                          i(
                            m(
                              e
                                ? 'QRHardwareUnknownQRCodeTitle'
                                : 'QRHardwareInvalidTransactionTitle'
                            )
                          ),
                            _(new Error(m('unknownQrCode')));
                        }
                      },
                      P = () => {
                        try {
                          O();
                        } catch (e) {
                          if (!C.current) return;
                          'NotAllowedError' === e.name
                            ? (r.default.info(`Permission denied: '${e}'`), v(y))
                            : _(e);
                        }
                      };
                    (0, a.useEffect)(
                      () => (
                        (C.current = !0),
                        S(),
                        () => {
                          (C.current = !1), clearTimeout(E);
                        }
                      ),
                      []
                    ),
                      (0, a.useEffect)(() => {
                        h === b ? P() : h === y && O();
                      }, [h]);
                    const j = () => {
                      clearTimeout(E), v(g), _(null), w(new o.URDecoder()), T(0), S();
                    };
                    return a.default.createElement(
                      'div',
                      { className: 'qr-scanner' },
                      k
                        ? (() => {
                            let n, r;
                            return (
                              'NO_WEBCAM_FOUND' === k.type
                                ? ((n = m('noWebcamFoundTitle')), (r = m('noWebcamFound')))
                                : k.message === m('unknownQrCode')
                                  ? (r = m(e ? 'QRHardwareUnknownWalletQRCode' : 'unknownQrCode'))
                                  : k.message === m('QRHardwareMismatchedSignId')
                                    ? (r = m('QRHardwareMismatchedSignId'))
                                    : ((n = m('generalCameraErrorTitle')),
                                      (r = m('generalCameraError'))),
                              a.default.createElement(
                                a.default.Fragment,
                                null,
                                a.default.createElement(
                                  'div',
                                  { className: 'qr-scanner__image' },
                                  a.default.createElement('img', {
                                    src: 'images/webcam.svg',
                                    width: '70',
                                    height: '70',
                                    alt: '',
                                  })
                                ),
                                n
                                  ? a.default.createElement(
                                      'div',
                                      { className: 'qr-scanner__title' },
                                      n
                                    )
                                  : null,
                                a.default.createElement(
                                  'div',
                                  {
                                    className: 'qr-scanner__error',
                                    'data-testid': 'qr-scanner__error',
                                  },
                                  r
                                ),
                                a.default.createElement(u.default, {
                                  onCancel: () => {
                                    i(''), t();
                                  },
                                  onSubmit: () => {
                                    i(''), j();
                                  },
                                  cancelText: m('cancel'),
                                  submitText: m('tryAgain'),
                                  submitButtonType: 'confirm',
                                })
                              )
                            );
                          })()
                        : (() => {
                            let e;
                            return (
                              h === g
                                ? (e = m('accessingYourCamera'))
                                : h === b
                                  ? (e = m('QRHardwareScanInstructions'))
                                  : h === y && (e = m('youNeedToAllowCameraAccess')),
                              a.default.createElement(
                                a.default.Fragment,
                                null,
                                a.default.createElement(
                                  'div',
                                  { className: 'qr-scanner__content' },
                                  a.default.createElement(f.default, { handleScan: I })
                                ),
                                M > 0 &&
                                  a.default.createElement('div', {
                                    className: 'qr-scanner__progress',
                                    'data-testid': 'qr-reader-progress-bar',
                                    style: { '--progress': `${Math.floor(100 * M)}%` },
                                  }),
                                e &&
                                  a.default.createElement(
                                    'div',
                                    { className: 'qr-scanner__status' },
                                    e
                                  )
                              )
                            );
                          })()
                    );
                  };
                v.propTypes = {
                  isReadingWallet: i.default.bool.isRequired,
                  handleCancel: i.default.func.isRequired,
                  handleSuccess: i.default.func.isRequired,
                  setErrorTitle: i.default.func.isRequired,
                };
                n.default = v;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/qr-hardware-popover/base-reader.js' },
    ],
    [
      6136,
      {
        '../../../../shared/constants/time': 5817,
        '../../ui/spinner': 6802,
        '@zxing/browser': 3656,
        '@zxing/library': 3875,
        loglevel: 4929,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('@zxing/library'),
                  o = e('@zxing/browser'),
                  i = u(e('loglevel')),
                  s = u(e('prop-types')),
                  l = e('../../../../shared/constants/time'),
                  c = u(e('../../ui/spinner'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const p = ({ handleScan: e }) => {
                  const [t, n] = (0, a.useState)(!1),
                    s = (0, a.useMemo)(() => {
                      const e = new Map();
                      return (
                        e.set(r.DecodeHintType.POSSIBLE_FORMATS, [r.BarcodeFormat.QR_CODE]),
                        new o.BrowserQRCodeReader(e, {
                          delayBetweenScanAttempts: 100 * l.MILLISECOND,
                          delayBetweenScanSuccess: 100 * l.MILLISECOND,
                        })
                      );
                    }, []);
                  return (
                    (0, a.useEffect)(() => {
                      const t = document.getElementById('video'),
                        a = () => {
                          n(!0);
                        };
                      t.addEventListener('canplay', a);
                      const r = s.decodeFromVideoDevice(undefined, 'video', t => {
                        t && e(t.getText());
                      });
                      return () => {
                        t.removeEventListener('canplay', a),
                          r
                            .then(e => {
                              e && e.stop();
                            })
                            .catch(i.default.info);
                      };
                    }, []),
                    a.default.createElement(
                      'div',
                      { className: 'qr-scanner__content__video-wrapper' },
                      a.default.createElement('video', {
                        id: 'video',
                        style: {
                          display: t ? 'block' : 'none',
                          width: '100%',
                          filter: 'blur(4px)',
                        },
                      }),
                      t ? null : a.default.createElement(c.default, null)
                    )
                  );
                };
                p.propTypes = { handleScan: s.default.func.isRequired };
                n.default = p;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/qr-hardware-popover/enhanced-reader.js' },
    ],
    [
      6137,
      { './qr-hardware-popover': 6138 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./qr-hardware-popover')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/qr-hardware-popover/index.js' },
    ],
    [
      6138,
      {
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../ui/popover': 6789,
        './qr-hardware-sign-request': 6139,
        './qr-hardware-wallet-importer': 6143,
        '@metamask/rpc-errors': 2585,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/rpc-errors'),
                  i = e('../../../selectors'),
                  s = p(e('../../ui/popover')),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../store/actions'),
                  u = p(e('./qr-hardware-wallet-importer')),
                  d = p(e('./qr-hardware-sign-request'));
                function p(e) {
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
                n.default = () => {
                  var e;
                  const t = (0, l.useI18nContext)(),
                    n = (0, r.useSelector)(i.getCurrentQRHardwareState),
                    { sync: p, sign: f } = n,
                    m = null == p ? void 0 : p.reading,
                    h = null == f ? void 0 : f.request,
                    g = m || h,
                    [y, b] = (0, a.useState)(''),
                    { txData: v } = (0, r.useSelector)(e => e.confirmTransaction),
                    k = (0, a.useMemo)(
                      () => v,
                      [null == f || null === (e = f.request) || void 0 === e ? void 0 : e.requestId]
                    ),
                    _ = (0, r.useDispatch)(),
                    x = (0, a.useCallback)(() => _((0, c.cancelSyncQRHardware)()), [_]),
                    w = (0, a.useCallback)(() => {
                      _(
                        (0, c.rejectPendingApproval)(
                          k.id,
                          (0, o.serializeError)(o.providerErrors.userRejectedRequest())
                        )
                      ),
                        _((0, c.cancelTx)(k)),
                        _((0, c.cancelQRHardwareSignRequest)());
                    }, [_, k]),
                    M = (0, a.useMemo)(() => {
                      let e = '';
                      return (
                        h
                          ? (e = t('QRHardwareSignRequestTitle'))
                          : m && (e = t('QRHardwareWalletImporterTitle')),
                        '' !== y && (e = y),
                        e
                      );
                    }, [h, m, t, y]);
                  return g
                    ? a.default.createElement(
                        s.default,
                        { title: M, onClose: m ? x : w },
                        m &&
                          a.default.createElement(u.default, { handleCancel: x, setErrorTitle: b }),
                        h &&
                          a.default.createElement(d.default, {
                            setErrorTitle: b,
                            handleCancel: w,
                            request: f.request,
                          })
                      )
                    : null;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/qr-hardware-popover/qr-hardware-popover.js' },
    ],
    [
      6139,
      { './qr-hardware-sign-request.component': 6141 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r =
                    (a = e('./qr-hardware-sign-request.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = r.default;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/qr-hardware-popover/qr-hardware-sign-request/index.js',
      },
    ],
    [
      6140,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../ui/page-container': 6783,
        '@ngraveio/bc-ur': 3014,
        buffer: 4139,
        'prop-types': 5082,
        'qrcode.react': 5142,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                    var a,
                      r = (function (e, t) {
                        if (!t && e && e.__esModule) return e;
                        if (null === e || ('object' != typeof e && 'function' != typeof e))
                          return { default: e };
                        var n = p(t);
                        if (n && n.has(e)) return n.get(e);
                        var a = { __proto__: null },
                          r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                        for (var o in e)
                          if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                            var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                            i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                          }
                        return (a.default = e), n && n.set(e, a), a;
                      })(e('react')),
                      o = e('qrcode.react'),
                      i = e('@ngraveio/bc-ur'),
                      s = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                      l = e('../../../../hooks/useI18nContext'),
                      c = e('../../../../helpers/constants/design-system'),
                      u = e('../../../ui/page-container'),
                      d = e('../../../component-library');
                    function p(e) {
                      if ('function' != typeof WeakMap) return null;
                      var t = new WeakMap(),
                        n = new WeakMap();
                      return (p = function (e) {
                        return e ? n : t;
                      })(e);
                    }
                    const f = ({ type: e, cbor: n, cancelQRHardwareSignRequest: a, toRead: s }) => {
                      const p = (0, l.useI18nContext)(),
                        f = (0, r.useMemo)(
                          () => new i.UREncoder(new i.UR(t.from(n, 'hex'), e), 200),
                          [n, e]
                        ),
                        [m, h] = (0, r.useState)(f.nextPart());
                      return (
                        (0, r.useEffect)(() => {
                          const e = setInterval(() => {
                            h(f.nextPart());
                          }, 200);
                          return () => {
                            clearInterval(e);
                          };
                        }, [f]),
                        r.default.createElement(
                          r.default.Fragment,
                          null,
                          r.default.createElement(
                            d.Box,
                            null,
                            r.default.createElement(
                              d.Text,
                              { align: c.TextAlign.Center },
                              p('QRHardwareSignRequestSubtitle')
                            )
                          ),
                          r.default.createElement(
                            d.Box,
                            {
                              paddingTop: 4,
                              paddingBottom: 4,
                              display: c.Display.Flex,
                              alignItems: c.AlignItems.center,
                              flexDirection: c.FlexDirection.Column,
                            },
                            r.default.createElement(
                              'div',
                              {
                                style: {
                                  padding: 20,
                                  backgroundColor: 'var(--qr-code-white-background)',
                                },
                              },
                              r.default.createElement(o.QRCodeSVG, {
                                value: m.toUpperCase(),
                                size: 225,
                              })
                            )
                          ),
                          r.default.createElement(
                            d.Box,
                            { paddingBottom: 4, paddingLeft: 4, paddingRight: 4 },
                            r.default.createElement(
                              d.Text,
                              { align: c.TextAlign.Center },
                              p('QRHardwareSignRequestDescription')
                            )
                          ),
                          r.default.createElement(u.PageContainerFooter, {
                            onCancel: a,
                            onSubmit: s,
                            cancelText: p('QRHardwareSignRequestCancel'),
                            submitText: p('QRHardwareSignRequestGetSignature'),
                            submitButtonType: 'confirm',
                          })
                        )
                      );
                    };
                    f.propTypes = {
                      type: s.default.string.isRequired,
                      cbor: s.default.string.isRequired,
                      cancelQRHardwareSignRequest: s.default.func.isRequired,
                      toRead: s.default.func.isRequired,
                    };
                    n.default = f;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/qr-hardware-popover/qr-hardware-sign-request/player.js',
      },
    ],
    [
      6141,
      {
        '../../../../store/actions': 7619,
        './player': 6140,
        './reader': 6142,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = l(e('prop-types')),
                  o = e('../../../../store/actions'),
                  i = l(e('./player')),
                  s = l(e('./reader'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const u = ({ request: e, handleCancel: t, setErrorTitle: n }) => {
                  const [r, l] = (0, a.useState)('play'),
                    c = (0, a.useCallback)(() => l('read'), []);
                  return 'play' === r
                    ? (() => {
                        const { payload: n } = e;
                        return a.default.createElement(i.default, {
                          type: n.type,
                          cbor: n.cbor,
                          cancelQRHardwareSignRequest: t,
                          toRead: c,
                        });
                      })()
                    : a.default.createElement(s.default, {
                        cancelQRHardwareSignRequest: t,
                        submitQRHardwareSignature: o.submitQRHardwareSignature,
                        requestId: e.requestId,
                        setErrorTitle: n,
                      });
                };
                u.propTypes = {
                  request: r.default.object.isRequired,
                  handleCancel: r.default.func.isRequired,
                  setErrorTitle: r.default.func.isRequired,
                };
                n.default = u;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/qr-hardware-popover/qr-hardware-sign-request/qr-hardware-sign-request.component.js',
      },
    ],
    [
      6142,
      {
        '../../../../hooks/useI18nContext': 6985,
        '../base-reader': 6135,
        '@keystonehq/bc-ur-registry-eth': 683,
        'prop-types': 5082,
        react: 5328,
        uuid: 5733,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = u(e('react')),
                  r = e('@keystonehq/bc-ur-registry-eth'),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('uuid')),
                  i = u(e('prop-types')),
                  s = u(e('../base-reader')),
                  l = e('../../../../hooks/useI18nContext');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = ({
                  submitQRHardwareSignature: e,
                  cancelQRHardwareSignRequest: t,
                  requestId: n,
                  setErrorTitle: i,
                }) => {
                  const c = (0, l.useI18nContext)();
                  return a.default.createElement(s.default, {
                    isReadingWallet: !1,
                    handleCancel: () => {
                      t();
                    },
                    handleSuccess: async t => {
                      if ('eth-signature' === t.type) {
                        const a = r.ETHSignature.fromCBOR(t.cbor).getRequestId(),
                          s = o.stringify(a);
                        if (s === n) return await e(s, t.cbor.toString('hex'));
                        throw (
                          (i(c('QRHardwareInvalidTransactionTitle')),
                          new Error(c('QRHardwareMismatchedSignId')))
                        );
                      }
                      throw (
                        (i(c('QRHardwareInvalidTransactionTitle')), new Error(c('unknownQrCode')))
                      );
                    },
                    setErrorTitle: i,
                  });
                };
                d.propTypes = {
                  submitQRHardwareSignature: i.default.func.isRequired,
                  cancelQRHardwareSignRequest: i.default.func.isRequired,
                  requestId: i.default.string.isRequired,
                  setErrorTitle: i.default.func.isRequired,
                };
                n.default = d;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/qr-hardware-popover/qr-hardware-sign-request/reader.js',
      },
    ],
    [
      6143,
      { './qr-hardware-wallet-importer.component': 6144 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r =
                    (a = e('./qr-hardware-wallet-importer.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = r.default;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/qr-hardware-popover/qr-hardware-wallet-importer/index.js',
      },
    ],
    [
      6144,
      {
        '../../../../hooks/useI18nContext': 6985,
        '../../../../store/actions': 7619,
        '../base-reader': 6135,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = e('../../../../store/actions'),
                  i = l(e('../base-reader')),
                  s = e('../../../../hooks/useI18nContext');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = ({ handleCancel: e, setErrorTitle: t }) => {
                  const n = (0, s.useI18nContext)();
                  return a.default.createElement(i.default, {
                    isReadingWallet: !0,
                    handleCancel: e,
                    handleSuccess: async e => {
                      if ('crypto-hdkey' === e.type)
                        return await (0, o.submitQRHardwareCryptoHDKey)(e.cbor.toString('hex'));
                      if ('crypto-account' === e.type)
                        return await (0, o.submitQRHardwareCryptoAccount)(e.cbor.toString('hex'));
                      throw (t(n('QRHardwareUnknownQRCodeTitle')), new Error(n('unknownQrCode')));
                    },
                    setErrorTitle: t,
                  });
                };
                c.propTypes = {
                  handleCancel: r.default.func.isRequired,
                  setErrorTitle: r.default.func.isRequired,
                };
                n.default = c;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/qr-hardware-popover/qr-hardware-wallet-importer/qr-hardware-wallet-importer.component.js',
      },
    ],
    [
      6145,
      { './recovery-phrase-reminder': 6146 },
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
                var a,
                  r = (a = e('./recovery-phrase-reminder')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/recovery-phrase-reminder/index.js' },
    ],
    [
      6146,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/box': 6703,
        '../../ui/button': 6707,
        '../../ui/popover': 6789,
        'prop-types': 5082,
        react: 5328,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = m);
                var a = f(e('react')),
                  r = f(e('prop-types')),
                  o = e('react-router-dom'),
                  i = e('../../../hooks/useI18nContext'),
                  s = f(e('../../ui/box')),
                  l = f(e('../../ui/button')),
                  c = f(e('../../ui/popover')),
                  u = e('../../../helpers/constants/design-system'),
                  d = e('../../../helpers/constants/routes'),
                  p = e('../../component-library');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m({ onConfirm: e, hasBackedUp: t }) {
                  const n = (0, i.useI18nContext)(),
                    r = (0, o.useHistory)();
                  return a.default.createElement(
                    c.default,
                    { centerTitle: !0, title: n('recoveryPhraseReminderTitle') },
                    a.default.createElement(
                      s.default,
                      {
                        paddingRight: 4,
                        paddingBottom: 6,
                        paddingLeft: 4,
                        className: 'recovery-phrase-reminder',
                      },
                      a.default.createElement(
                        p.Text,
                        {
                          color: u.TextColor.textDefault,
                          align: u.TextAlign.Center,
                          variant: u.TextVariant.bodyMd,
                          marginBottom: 4,
                        },
                        n('recoveryPhraseReminderSubText')
                      ),
                      a.default.createElement(
                        s.default,
                        { marginTop: 4, marginBottom: 8 },
                        a.default.createElement(
                          'ul',
                          { className: 'recovery-phrase-reminder__list' },
                          a.default.createElement(
                            p.Text,
                            {
                              as: 'li',
                              color: u.TextColor.textDefault,
                              fontWeight: u.FontWeight.Bold,
                            },
                            n('recoveryPhraseReminderItemOne')
                          ),
                          a.default.createElement(
                            p.Text,
                            { as: 'li' },
                            n('recoveryPhraseReminderItemTwo')
                          ),
                          a.default.createElement(
                            p.Text,
                            { as: 'li' },
                            t
                              ? n('recoveryPhraseReminderHasBackedUp')
                              : a.default.createElement(
                                  a.default.Fragment,
                                  null,
                                  n('recoveryPhraseReminderHasNotBackedUp'),
                                  a.default.createElement(
                                    s.default,
                                    { display: u.DISPLAY.INLINE_BLOCK, marginLeft: 1 },
                                    a.default.createElement(
                                      l.default,
                                      {
                                        type: 'link',
                                        onClick: () => {
                                          r.push(d.ONBOARDING_UNLOCK_ROUTE);
                                        },
                                        style: { fontSize: 'inherit', padding: 0 },
                                      },
                                      n('recoveryPhraseReminderBackupStart')
                                    )
                                  )
                                )
                          )
                        )
                      ),
                      a.default.createElement(
                        s.default,
                        { justifyContent: u.JustifyContent.center },
                        a.default.createElement(
                          s.default,
                          { width: u.BLOCK_SIZES.TWO_FIFTHS },
                          a.default.createElement(
                            l.default,
                            { type: 'primary', onClick: e },
                            n('recoveryPhraseReminderConfirm')
                          )
                        )
                      )
                    )
                  );
                }
                m.propTypes = {
                  hasBackedUp: r.default.bool.isRequired,
                  onConfirm: r.default.func.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/recovery-phrase-reminder/recovery-phrase-reminder.js',
      },
    ],
    [
      6147,
      { './reveal-SRP-modal': 6148 },
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
                var a,
                  r = (a = e('./reveal-SRP-modal')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/reveal-SRP-modal/index.js' },
    ],
    [
      6148,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a,
                  r = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../../store/actions'),
                  c = e('../../component-library');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function d({ setSecretRecoveryPhrase: e, onClose: t, isOpen: n }) {
                  const a = (0, s.useI18nContext)(),
                    [r, u] = (0, o.useState)(''),
                    d = (0, o.useCallback)(
                      async t => {
                        const n = await (0, l.getSeedPhrase)(t);
                        e(n);
                      },
                      [e]
                    );
                  return o.default.createElement(
                    c.Modal,
                    { isOpen: n, onClose: t, 'data-testid': 'reveal-srp-modal' },
                    o.default.createElement(c.ModalOverlay, null),
                    o.default.createElement(
                      c.ModalContent,
                      null,
                      o.default.createElement(c.ModalHeader, { onClose: t }, a('revealSeedWords')),
                      o.default.createElement(
                        c.Box,
                        { paddingLeft: 4, paddingRight: 4 },
                        o.default.createElement(
                          'form',
                          {
                            onSubmit: e => {
                              e.preventDefault(), d(r);
                            },
                          },
                          o.default.createElement(c.FormTextField, {
                            marginTop: 6,
                            id: 'account-details-authenticate',
                            label: a('enterYourPassword'),
                            placeholder: a('password'),
                            onChange: e => u(e.target.value),
                            value: r,
                            variant: i.TextVariant.bodySm,
                            type: 'password',
                            labelProps: { fontWeight: i.FontWeight.Medium },
                            autoFocus: !0,
                          })
                        ),
                        o.default.createElement(
                          c.Box,
                          { display: i.Display.Flex, marginTop: 6, gap: 2 },
                          o.default.createElement(
                            c.ButtonSecondary,
                            { onClick: t, block: !0 },
                            a('cancel')
                          ),
                          o.default.createElement(
                            c.ButtonPrimary,
                            { onClick: () => d(r), disabled: '' === r, block: !0 },
                            a('confirm')
                          )
                        )
                      )
                    )
                  );
                }
                d.propTypes = {
                  setSecretRecoveryPhrase: r.default.func.isRequired,
                  onClose: r.default.func.isRequired,
                  isOpen: r.default.bool.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/reveal-SRP-modal/reveal-SRP-modal.js' },
    ],
    [
      6149,
      {
        '../../../../../shared/constants/time': 5817,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useCopyToClipboard': 6973,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useTimeout': 7009,
        '../../../component-library': 6402,
        '../../../ui/tooltip': 6818,
        '../show-more': 6155,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Copyable = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = m(e('prop-types')),
                  o = m(e('classnames')),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useCopyToClipboard'),
                  l = e('../../../component-library'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = m(e('../../../ui/tooltip')),
                  d = e('../show-more'),
                  p = e('../../../../../shared/constants/time'),
                  f = e('../../../../hooks/useTimeout');
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
                const g = ({ text: e, sensitive: t = !1, marginTop: n, marginBottom: r }) => {
                  const m = (0, c.useI18nContext)(),
                    [, h] = (0, s.useCopyToClipboard)(),
                    [g, y] = (0, a.useState)(!t),
                    [b, v] = (0, a.useState)(!1),
                    k = (0, f.useTimeout)(() => v(!1), 3 * p.SECOND, !1),
                    _ = e => {
                      e.stopPropagation(), y(e => !e);
                    };
                  return a.default.createElement(
                    l.Box,
                    {
                      display: i.Display.Flex,
                      onClick:
                        t && !g
                          ? _
                          : t => {
                              t.stopPropagation(), h(e), v(!0), k();
                            },
                      className: (0, o.default)('copyable', {
                        sensitive: t,
                        clicked: b,
                        visible: g,
                      }),
                      backgroundColor:
                        g && t ? i.BackgroundColor.errorMuted : i.BackgroundColor.primaryMuted,
                      borderRadius: i.BorderRadius.LG,
                      padding: 2,
                      marginTop: n,
                      marginBottom: r,
                    },
                    t &&
                      a.default.createElement(
                        l.Box,
                        { marginRight: 2, className: 'copyable__icon' },
                        a.default.createElement(
                          u.default,
                          {
                            wrapperClassName: 'copyable__tooltip',
                            html: a.default.createElement(
                              l.Text,
                              null,
                              m(g ? 'hideSentitiveInfo' : 'doNotShare')
                            ),
                            position: 'bottom',
                          },
                          a.default.createElement(l.Icon, {
                            name: g ? l.IconName.EyeSlash : l.IconName.Eye,
                            onClick: _,
                            color: g && t ? i.Color.errorAlternative : i.IconColor.iconAlternative,
                            'data-testid': 'reveal-icon',
                          })
                        )
                      ),
                    t &&
                      !g &&
                      a.default.createElement(
                        l.Text,
                        {
                          color: i.Color.textAlternative,
                          marginRight: 2,
                          marginBottom: 0,
                          overflowWrap: i.OverflowWrap.Anywhere,
                        },
                        m('revealSensitiveContent')
                      ),
                    g &&
                      a.default.createElement(
                        d.ShowMore,
                        {
                          marginRight: 2,
                          buttonBackground:
                            g && t
                              ? i.BackgroundColor.errorMuted
                              : i.BackgroundColor.backgroundAlternative,
                        },
                        a.default.createElement(
                          l.Text,
                          {
                            color: g && t ? i.Color.errorAlternative : i.TextColor.textAlternative,
                            marginBottom: 0,
                            overflowWrap: i.OverflowWrap.Anywhere,
                          },
                          e
                        )
                      ),
                    g &&
                      a.default.createElement(l.Icon, {
                        className: 'copyable__icon',
                        name: b ? l.IconName.CopySuccess : l.IconName.Copy,
                        color: g && t ? i.Color.errorAlternative : i.IconColor.iconAlternative,
                        marginLeft: 'auto',
                        'data-testid': 'copy-icon',
                      })
                  );
                };
                (n.Copyable = g),
                  (g.propTypes = {
                    text: r.default.string,
                    sensitive: r.default.bool,
                    marginTop: r.default.number,
                    marginBottom: r.default.number,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/copyable/copyable.js' },
    ],
    [
      6150,
      { './copyable': 6149 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Copyable', {
                    enumerable: !0,
                    get: function () {
                      return a.Copyable;
                    },
                  });
                var a = e('./copyable');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/copyable/index.js' },
    ],
    [
      6151,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = s(e('react')),
                  r = s(e('prop-types')),
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const l = ({ title: e, error: t, description: n, iconName: r }) =>
                  a.default.createElement(
                    i.Box,
                    {
                      display: o.Display.Flex,
                      flexDirection: o.FlexDirection.Column,
                      alignItems: o.AlignItems.center,
                      justifyContent: o.JustifyContent.center,
                      height: o.BlockSize.Full,
                      padding: 2,
                    },
                    r &&
                      a.default.createElement(i.AvatarIcon, {
                        iconName: r,
                        size: i.AvatarIconSize.Xl,
                        color: o.IconColor.errorDefault,
                        backgroundColor: o.BackgroundColor.errorMuted,
                        marginBottom: 4,
                      }),
                    a.default.createElement(i.Text, { variant: o.TextVariant.headingLg }, e),
                    n && a.default.createElement(i.Text, { textAlign: o.TextAlign.Center }, n),
                    t &&
                      a.default.createElement(
                        i.BannerAlert,
                        { marginTop: 4, startAccessory: null, severity: o.Severity.Danger },
                        a.default.createElement(i.Text, { variant: o.TextVariant.bodySm }, t)
                      )
                  );
                l.propTypes = {
                  title: r.default.node.isRequired,
                  error: r.default.string,
                  description: r.default.string,
                  iconName: r.default.string,
                };
                n.default = l;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/install-error/install-error.js' },
    ],
    [
      6152,
      { './keyring-snap-removal-warning': 6154 },
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
                var a,
                  r =
                    (a = e('./keyring-snap-removal-warning')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/keyring-snap-removal-warning/index.ts' },
    ],
    [
      6153,
      {
        '../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.KeyringAccountListItem = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../../shared/modules/hexstring-utils'),
                  l = e('../../../../hooks/useI18nContext');
                n.KeyringAccountListItem = ({ account: e, snapUrl: t }) => {
                  const n = (0, l.useI18nContext)();
                  return r.default.createElement(
                    o.Box,
                    {
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Row,
                      justifyContent: i.JustifyContent.spaceBetween,
                      borderRadius: i.BorderRadius.MD,
                      borderColor: i.BorderColor.borderDefault,
                      padding: 3,
                      width: i.BlockSize.Full,
                      'data-testid': 'keyring-account-list-item',
                    },
                    r.default.createElement(
                      o.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        width: i.BlockSize.TenTwelfths,
                      },
                      r.default.createElement(
                        o.Box,
                        { flexDirection: i.FlexDirection.Column, marginBottom: 2 },
                        r.default.createElement(
                          o.Text,
                          { color: i.TextColor.textMuted },
                          n('keyringAccountName')
                        ),
                        r.default.createElement(o.Text, null, e.name)
                      ),
                      r.default.createElement(
                        o.Box,
                        { flexDirection: i.FlexDirection.Column },
                        r.default.createElement(
                          o.Text,
                          { color: i.TextColor.textMuted },
                          n('keyringAccountPublicAddress')
                        ),
                        r.default.createElement(
                          o.Text,
                          { overflowWrap: i.OverflowWrap.Anywhere },
                          (0, s.toChecksumHexAddress)(e.address)
                        )
                      )
                    ),
                    r.default.createElement(
                      o.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        justifyContent: i.JustifyContent.center,
                      },
                      r.default.createElement(o.ButtonIcon, {
                        ariaLabel: 'snap-url-export',
                        'data-testid': 'keyring-account-link',
                        iconName: o.IconName.Export,
                        color: i.IconColor.primaryDefault,
                        onClick: () => {
                          global.platform.openTab({ url: t });
                        },
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/keyring-snap-removal-warning/keyring-account-list-item.tsx',
      },
    ],
    [
      6154,
      {
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../ui/info-tooltip': 6759,
        './keyring-account-list-item': 6153,
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
                  (n.default = function ({
                    snap: e,
                    keyringAccounts: t,
                    onCancel: n,
                    onClose: a,
                    onSubmit: f,
                    onBack: m,
                    isOpen: h,
                  }) {
                    const g = (0, c.useI18nContext)(),
                      [y, b] = (0, r.useState)(!1),
                      [v, k] = (0, r.useState)(!1),
                      [_, x] = (0, r.useState)(''),
                      [w, M] = (0, r.useState)(!1),
                      T = (0, i.useSelector)(d.getCurrentChainId);
                    (0, r.useEffect)(() => {
                      b(0 === t.length);
                    }, [t]);
                    return r.default.createElement(
                      r.default.Fragment,
                      null,
                      r.default.createElement(
                        s.Modal,
                        { isOpen: h, onClose: a },
                        r.default.createElement(s.ModalOverlay, null),
                        r.default.createElement(
                          s.ModalContent,
                          {
                            modalDialogProps: {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              gap: 4,
                            },
                          },
                          r.default.createElement(
                            s.ModalHeader,
                            {
                              onBack: () => {
                                y ? b(!1) : m();
                              },
                              onClose: () => {
                                b(!1), a();
                              },
                            },
                            g('removeSnap')
                          ),
                          r.default.createElement(
                            s.ModalBody,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              gap: 4,
                            },
                            r.default.createElement(
                              s.BannerAlert,
                              { severity: s.BannerAlertSeverity.Warning },
                              g('backupKeyringSnapReminder')
                            ),
                            !1 === y
                              ? r.default.createElement(
                                  r.default.Fragment,
                                  null,
                                  r.default.createElement(
                                    s.Box,
                                    {
                                      display: l.Display.Flex,
                                      justifyContent: l.JustifyContent.spaceBetween,
                                    },
                                    r.default.createElement(s.Text, null, g('removeKeyringSnap')),
                                    r.default.createElement(u.default, {
                                      contentText: g('removeKeyringSnapToolTip'),
                                      position: 'top',
                                    })
                                  ),
                                  t.map((e, t) =>
                                    r.default.createElement(p.KeyringAccountListItem, {
                                      key: t,
                                      account: e,
                                      snapUrl: (0, o.getAccountLink)(e.address, T),
                                    })
                                  )
                                )
                              : r.default.createElement(
                                  r.default.Fragment,
                                  null,
                                  r.default.createElement(
                                    s.Text,
                                    null,
                                    g('keyringSnapRemoveConfirmation', [
                                      r.default.createElement(
                                        s.Text,
                                        {
                                          key: 'keyringSnapRemoveConfirmation2',
                                          fontWeight: l.FontWeight.Bold,
                                          as: 'span',
                                        },
                                        e.manifest.proposedName
                                      ),
                                    ])
                                  ),
                                  r.default.createElement(s.TextField, {
                                    value: _,
                                    onChange: t => {
                                      var n;
                                      x(t.target.value),
                                        k(
                                          ((n = t.target.value),
                                          M(!1),
                                          n === e.manifest.proposedName || (M(!0), !1))
                                        );
                                    },
                                    onPaste: e => {
                                      e.preventDefault();
                                    },
                                    error: w,
                                    inputProps: { 'data-testid': 'remove-snap-confirmation-input' },
                                  })
                                )
                          ),
                          r.default.createElement(s.ModalFooter, {
                            onCancel: n,
                            onSubmit: async () => {
                              y ? v && f() : b(!0);
                            },
                            submitButtonProps: {
                              id: 'popoverRemoveSnapButton',
                              danger: y,
                              disabled: y && !v,
                              children: g(y ? 'removeSnap' : 'continue'),
                            },
                            cancelButtonProps: {
                              variant: s.ButtonVariant.Secondary,
                              children: g('cancel'),
                            },
                          })
                        )
                      )
                    );
                  });
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('@metamask/etherscan-link'),
                  i = e('react-redux'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = (a = e('../../../ui/info-tooltip')) && a.__esModule ? a : { default: a },
                  d = e('../../../../../shared/modules/selectors/networks'),
                  p = e('./keyring-account-list-item');
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
      {
        package: '$root$',
        file: 'ui/components/app/snaps/keyring-snap-removal-warning/keyring-snap-removal-warning.tsx',
      },
    ],
    [
      6155,
      { './show-more': 6156 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ShowMore', {
                    enumerable: !0,
                    get: function () {
                      return a.ShowMore;
                    },
                  });
                var a = e('./show-more');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/show-more/index.js' },
    ],
    [
      6156,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/snaps/useIsOverflowing': 6960,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ShowMore = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = u(e('../../../../hooks/snaps/useIsOverflowing')),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function p() {
                  return (
                    (p = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    p.apply(null, arguments)
                  );
                }
                const f = ({ children: e, className: t = '', ...n }) => {
                  const r = (0, c.useI18nContext)(),
                    { contentRef: u, isOverflowing: d } = (0, i.default)(),
                    [f, m] = (0, a.useState)(!1),
                    h = d && !f;
                  return a.default.createElement(
                    s.Box,
                    p(
                      {
                        className: (0, o.default)('show-more', t),
                        style: {
                          position: 'relative',
                          overflow: 'hidden',
                          maxHeight: f ? 'none' : undefined,
                        },
                        ref: u,
                      },
                      n
                    ),
                    e,
                    h &&
                      a.default.createElement(
                        s.Box,
                        {
                          style: {
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: `linear-gradient(90deg, transparent 0%, var(--color-${l.BackgroundColor.backgroundAlternative}) 33%)`,
                          },
                        },
                        a.default.createElement(
                          s.Button,
                          {
                            className: 'show-more__button',
                            padding: 0,
                            paddingLeft: 8,
                            variant: s.ButtonVariant.Link,
                            onClick: e => {
                              e.stopPropagation(), m(!0);
                            },
                          },
                          a.default.createElement(
                            s.Text,
                            { color: l.TextColor.infoDefault },
                            r('more')
                          )
                        )
                      )
                  );
                };
                (n.ShowMore = f),
                  (f.propTypes = {
                    children: r.default.node,
                    buttonBackground: r.default.string,
                    className: r.default.string,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/show-more/show-more.js' },
    ],
    [
      6157,
      { './snap-authorship-expanded': 6158 },
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
                var a,
                  r = (a = e('./snap-authorship-expanded')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-authorship-expanded/index.js' },
    ],
    [
      6158,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/snaps/useSafeWebsite': 6961,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useOriginMetadata': 7e3,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../../../ui/toggle-button': 6814,
        '../../../ui/tooltip/tooltip': 6819,
        '../snap-version/snap-external-pill': 6272,
        '@metamask/snaps-utils': 2890,
        classnames: 4168,
        'prop-types': 5082,
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
                var a = e('@metamask/snaps-utils'),
                  r = v(e('classnames')),
                  o = v(e('prop-types')),
                  i = v(e('react')),
                  s = e('react-redux'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../helpers/utils/util'),
                  u = e('../../../../hooks/useI18nContext'),
                  d = e('../../../../hooks/useOriginMetadata'),
                  p = e('../../../../selectors'),
                  f = e('../../../../store/actions'),
                  m = e('../../../component-library'),
                  h = v(e('../../../ui/toggle-button')),
                  g = v(e('../../../ui/tooltip/tooltip')),
                  y = v(e('../snap-version/snap-external-pill')),
                  b = e('../../../../hooks/snaps/useSafeWebsite');
                function v(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const k = ({ snapId: e, className: t, snap: n }) => {
                  const o = (0, u.useI18nContext)(),
                    v = (0, s.useDispatch)(),
                    k = e && (0, a.getSnapPrefix)(e),
                    _ = e && (0, a.stripSnapPrefix)(e),
                    x = 'npm:' === k,
                    w = null != n && n.version ? `/v/${null == n ? void 0 : n.version}` : '',
                    M = x ? `https://www.npmjs.com/package/${_}${w}` : _,
                    T = (0, s.useSelector)(t => (0, p.getSnapRegistryData)(t, e)),
                    { website: E = undefined } = (null == T ? void 0 : T.metadata) ?? {},
                    C = (0, b.useSafeWebsite)(E),
                    S = (null == n ? void 0 : n.versionHistory) ?? [],
                    O = S.length ? S[S.length - 1] : undefined,
                    I = (0, d.useOriginMetadata)(null == O ? void 0 : O.origin);
                  return i.default.createElement(
                    m.Box,
                    {
                      className: (0, r.default)('snaps-authorship-expanded', t),
                      backgroundColor: l.BackgroundColor.backgroundDefault,
                      borderColor: l.BorderColor.borderDefault,
                      borderWidth: 1,
                      width: l.BlockSize.Full,
                      borderRadius: l.BorderRadius.LG,
                    },
                    i.default.createElement(
                      m.Box,
                      {
                        display: l.Display.Flex,
                        flexDirection: l.FlexDirection.Row,
                        justifyContent: l.JustifyContent.spaceBetween,
                        paddingLeft: 4,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderColor: l.BorderColor.borderDefault,
                        width: l.BlockSize.Full,
                        style: {
                          borderLeft: l.BorderStyle.none,
                          borderRight: l.BorderStyle.none,
                          borderTop: l.BorderStyle.none,
                        },
                      },
                      i.default.createElement(
                        m.Text,
                        { variant: l.TextVariant.bodyMd, fontWeight: l.FontWeight.Medium },
                        o('enabled')
                      ),
                      i.default.createElement(
                        m.Box,
                        { style: { maxWidth: '52px' } },
                        i.default.createElement(
                          g.default,
                          { interactive: !0, position: 'left', html: o('snapsToggle') },
                          i.default.createElement(h.default, {
                            value: null == n ? void 0 : n.enabled,
                            onToggle: () => {
                              null != n && n.enabled
                                ? v((0, f.disableSnap)(null == n ? void 0 : n.id))
                                : v((0, f.enableSnap)(null == n ? void 0 : n.id));
                            },
                          })
                        )
                      )
                    ),
                    i.default.createElement(
                      m.Box,
                      { padding: 4, width: l.BlockSize.Full },
                      C &&
                        i.default.createElement(
                          m.Box,
                          {
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Row,
                            justifyContent: l.JustifyContent.spaceBetween,
                            width: l.BlockSize.Full,
                            marginBottom: 4,
                          },
                          i.default.createElement(
                            m.Text,
                            { variant: l.TextVariant.bodyMd, fontWeight: l.FontWeight.Medium },
                            o('snapDetailWebsite')
                          ),
                          i.default.createElement(
                            m.Box,
                            {
                              paddingLeft: 8,
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              alignItems: l.AlignItems.flexEnd,
                            },
                            i.default.createElement(
                              m.ButtonLink,
                              {
                                href: C.toString(),
                                target: '_blank',
                                overflowWrap: l.OverflowWrap.Anywhere,
                              },
                              C.host
                            )
                          )
                        ),
                      I &&
                        O &&
                        i.default.createElement(
                          m.Box,
                          {
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Row,
                            justifyContent: l.JustifyContent.spaceBetween,
                            width: l.BlockSize.Full,
                          },
                          i.default.createElement(
                            m.Text,
                            { variant: l.TextVariant.bodyMd, fontWeight: l.FontWeight.Medium },
                            o('installOrigin')
                          ),
                          i.default.createElement(
                            m.Box,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              alignItems: l.AlignItems.flexEnd,
                            },
                            i.default.createElement(m.Text, { textAlign: l.TextAlign.End }, I.host),
                            i.default.createElement(
                              m.Text,
                              { color: l.Color.textMuted },
                              o('installedOn', [(0, c.formatDate)(O.date, 'dd MMM yyyy')])
                            )
                          )
                        ),
                      i.default.createElement(
                        m.Box,
                        {
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Row,
                          justifyContent: l.JustifyContent.spaceBetween,
                          alignItems: l.AlignItems.center,
                          marginTop: 4,
                        },
                        i.default.createElement(
                          m.Text,
                          { variant: l.TextVariant.bodyMd, fontWeight: l.FontWeight.Medium },
                          o('version')
                        ),
                        i.default.createElement(y.default, {
                          value: null == n ? void 0 : n.version,
                          url: M,
                        })
                      )
                    )
                  );
                };
                k.propTypes = {
                  snapId: o.default.string,
                  className: o.default.string,
                  snap: o.default.object,
                };
                n.default = k;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-authorship-expanded/snap-authorship-expanded.js',
      },
    ],
    [
      6159,
      { './snap-authorship-header': 6160 },
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
                var a,
                  r = (a = e('./snap-authorship-header')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-authorship-header/index.js' },
    ],
    [
      6160,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../snap-icon': 6170,
        '../snap-metadata-modal': 6178,
        classnames: 4168,
        'prop-types': 5082,
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
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = f(e('prop-types')),
                  o = f(e('classnames')),
                  i = e('react-redux'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../selectors'),
                  c = e('../../../component-library'),
                  u = e('../snap-metadata-modal'),
                  d = e('../../../../hooks/useI18nContext'),
                  p = e('../snap-icon');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const h = ({
                  snapId: e,
                  className: t,
                  boxShadow: n = 'var(--shadow-size-md) var(--color-shadow-default)',
                  showInfo: r = !0,
                  startAccessory: f,
                  endAccessory: m,
                  onCancel: h,
                }) => {
                  const g = (0, d.useI18nContext)(),
                    [y, b] = (0, a.useState)(!1),
                    { name: v, hidden: k } = (0, i.useSelector)(t => (0, l.getSnapMetadata)(t, e));
                  return a.default.createElement(
                    c.Box,
                    {
                      className: (0, o.default)('snaps-authorship-header', t),
                      backgroundColor: s.BackgroundColor.backgroundDefault,
                      width: s.BlockSize.Full,
                      alignItems: s.AlignItems.center,
                      display: s.Display.Flex,
                      padding: 4,
                      style: { boxShadow: n, minHeight: '64px', zIndex: 1 },
                    },
                    e &&
                      a.default.createElement(u.SnapMetadataModal, {
                        snapId: e,
                        isOpen: y,
                        onClose: () => b(!1),
                      }),
                    h &&
                      a.default.createElement(c.ButtonIcon, {
                        iconName: c.IconName.Close,
                        ariaLabel: g('close'),
                        size: c.ButtonIconSize.Md,
                        onClick: h,
                        color: s.IconColor.iconDefault,
                      }),
                    f && f,
                    a.default.createElement(
                      c.Box,
                      {
                        marginLeft: 4,
                        marginRight: 4,
                        display: s.Display.Flex,
                        justifyContent: s.JustifyContent.center,
                        alignItems: s.AlignItems.center,
                        style: { overflow: 'hidden' },
                        width: s.BlockSize.Full,
                      },
                      a.default.createElement(
                        c.Box,
                        {
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.center,
                          alignItems: s.AlignItems.center,
                          style: { overflow: 'hidden' },
                        },
                        a.default.createElement(p.SnapIcon, {
                          snapId: e,
                          avatarSize: c.IconSize.Sm,
                        }),
                        a.default.createElement(
                          c.Text,
                          {
                            color: s.TextColor.textDefault,
                            variant: s.TextVariant.bodyMdMedium,
                            marginLeft: 2,
                            title: v,
                            ellipsis: !0,
                          },
                          v
                        )
                      )
                    ),
                    r &&
                      !k &&
                      a.default.createElement(
                        c.Box,
                        { marginLeft: 'auto' },
                        a.default.createElement(c.AvatarIcon, {
                          className: 'snaps-authorship-header__button',
                          iconName: c.IconName.Info,
                          onClick: () => b(!0),
                          color: s.IconColor.iconDefault,
                          backgroundColor: s.BackgroundColor.backgroundAlternative,
                        })
                      ),
                    m && m
                  );
                };
                h.propTypes = {
                  snapId: r.default.string,
                  className: r.default.string,
                  boxShadow: r.default.string,
                  showInfo: r.default.bool,
                  startAccessory: r.default.element,
                  endAccessory: r.default.element,
                  onCancel: r.default.func,
                };
                n.default = h;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-authorship-header/snap-authorship-header.js',
      },
    ],
    [
      6161,
      { './snap-authorship-pill': 6162 },
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
                var a,
                  r = (a = e('./snap-authorship-pill')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-authorship-pill/index.ts' },
    ],
    [
      6162,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../snap-icon': 6170,
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
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../component-library'),
                  s = e('../snap-icon'),
                  l = e('../../../../selectors'),
                  c = e('../../../../helpers/constants/design-system');
                n.default = ({ snapId: e, onClick: t }) => {
                  const { name: n } = (0, o.useSelector)(t => (0, l.getSnapMetadata)(t, e));
                  return r.default.createElement(
                    i.Box,
                    {
                      className: 'snap-authorship-pill',
                      display: c.Display.Flex,
                      flexDirection: c.FlexDirection.Row,
                      alignItems: c.AlignItems.center,
                      borderRadius: c.BorderRadius.pill,
                      paddingTop: 1,
                      paddingBottom: 1,
                      paddingLeft: 1,
                      paddingRight: 2,
                      onClick: t,
                    },
                    r.default.createElement(s.SnapIcon, { avatarSize: i.IconSize.Sm, snapId: e }),
                    r.default.createElement(
                      i.Text,
                      {
                        color: c.TextColor.primaryDefault,
                        variant: c.TextVariant.bodyMdMedium,
                        ellipsis: !0,
                        paddingLeft: 1,
                      },
                      n
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-authorship-pill/snap-authorship-pill.tsx',
      },
    ],
    [
      6163,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../../../ui/tooltip/tooltip': 6819,
        '../snap-icon': 6170,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = f);
                var a = p(e('react')),
                  r = p(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = p(e('../../../ui/tooltip/tooltip')),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../selectors'),
                  d = e('../snap-icon');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function f({ origin: e, snapId: t }) {
                  const n = (0, c.useI18nContext)(),
                    { name: r } = (0, o.useSelector)(e => (0, u.getSnapMetadata)(e, t));
                  return a.default.createElement(
                    s.Box,
                    {
                      display: i.Display.Flex,
                      alignItems: i.AlignItems.center,
                      paddingTop: 2,
                      paddingBottom: 2,
                    },
                    a.default.createElement(d.SnapIcon, { snapId: t }),
                    a.default.createElement(
                      s.Box,
                      { width: 'full', paddingLeft: 4, paddingRight: 4 },
                      a.default.createElement(
                        s.Text,
                        null,
                        n('connectSnap', [
                          a.default.createElement(
                            s.Text,
                            {
                              variant: i.TextVariant.inherit,
                              key: '1',
                              fontWeight: i.FontWeight.Bold,
                            },
                            r
                          ),
                        ])
                      )
                    ),
                    a.default.createElement(
                      s.Box,
                      null,
                      a.default.createElement(
                        l.default,
                        {
                          html: a.default.createElement(
                            'div',
                            null,
                            n('snapConnectionWarning', [
                              a.default.createElement('b', { key: '0' }, e),
                              a.default.createElement('b', { key: '1' }, r),
                            ])
                          ),
                          position: 'bottom',
                        },
                        a.default.createElement(s.Icon, {
                          color: i.IconColor.iconMuted,
                          name: s.IconName.Info,
                          size: s.IconSize.Sm,
                        })
                      )
                    )
                  );
                }
                f.propTypes = {
                  origin: r.default.string.isRequired,
                  snapId: r.default.string.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-connect-cell/snap-connect-cell.js' },
    ],
    [
      6164,
      { './snap-delineator': 6165 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapDelineator', {
                    enumerable: !0,
                    get: function () {
                      return a.SnapDelineator;
                    },
                  });
                var a = e('./snap-delineator');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-delineator/index.js' },
    ],
    [
      6165,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/snaps': 6881,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../ui/pulse-loader/pulse-loader': 6792,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapDelineator = void 0);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/snaps'),
                  c = u(e('../../../ui/pulse-loader/pulse-loader'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d() {
                  return (
                    (d = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    d.apply(null, arguments)
                  );
                }
                const p = ({
                  snapName: e,
                  type: t = l.DelineatorType.default,
                  isLoading: n = !1,
                  isCollapsable: r = !1,
                  isCollapsed: u = !1,
                  children: p,
                  onClick: f,
                  boxProps: m,
                  disablePadding: h = !1,
                }) => {
                  const g = (0, o.useI18nContext)(),
                    y = t === l.DelineatorType.Error || t === l.DelineatorType.Warning;
                  return a.default.createElement(
                    s.Box,
                    d(
                      {
                        className: 'snap-delineator__wrapper',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        borderStyle: i.BorderStyle.solid,
                        borderColor: i.BorderColor.borderDefault,
                        borderRadius: i.BorderRadius.LG,
                        backgroundColor: y
                          ? i.BackgroundColor.errorMuted
                          : i.BackgroundColor.backgroundDefault,
                      },
                      m,
                      { style: { minHeight: n && '180px', ...(null == m ? void 0 : m.style) } }
                    ),
                    a.default.createElement(
                      s.Box,
                      {
                        className: 'snap-delineator__header',
                        display: i.Display.Flex,
                        alignItems: i.AlignItems.center,
                        justifyContent: i.JustifyContent.spaceBetween,
                        padding: 1,
                        style: { borderBottomWidth: u ? 0 : 1 },
                      },
                      a.default.createElement(
                        s.Box,
                        {
                          display: i.Display.Flex,
                          alignItems: i.AlignItems.center,
                          className: 'snap-delineator__header__container',
                        },
                        a.default.createElement(s.AvatarIcon, {
                          iconName: s.IconName.Snaps,
                          className: 'snap-delineator__header__icon',
                          size: s.AvatarIconSize.Xs,
                          backgroundColor: y ? i.IconColor.errorDefault : i.IconColor.infoDefault,
                          iconProps: { color: i.IconColor.infoInverse },
                        }),
                        a.default.createElement(
                          s.Text,
                          {
                            variant: i.TextVariant.bodySm,
                            color: i.TextColor.textDefault,
                            className: 'snap-delineator__header__text',
                            marginLeft: 1,
                            marginTop: 0,
                            marginBottom: 0,
                            marginRight: 1,
                            display: 'block',
                          },
                          g((0, l.getDelineatorTitle)(t), [e])
                        )
                      ),
                      r &&
                        a.default.createElement(s.Icon, {
                          name: u ? s.IconName.ArrowDown : s.IconName.ArrowUp,
                          size: s.IconSize.Sm,
                          color: i.IconColor.iconMuted,
                          className: 'snap-delineator__expansion-icon',
                          onClick: f,
                        })
                    ),
                    a.default.createElement(
                      s.Box,
                      {
                        className: 'snap-delineator__content',
                        padding: !h || n ? 4 : 0,
                        display: r && u ? i.Display.None : i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        alignItems: n && i.AlignItems.center,
                        justifyContent: n && i.JustifyContent.center,
                        style: { flexGrow: n && '1' },
                      },
                      n ? a.default.createElement(c.default, null) : p
                    )
                  );
                };
                (n.SnapDelineator = p),
                  (p.propTypes = {
                    snapName: r.default.string,
                    type: r.default.string,
                    isCollapsable: r.default.bool,
                    isCollapsed: r.default.bool,
                    isLoading: r.default.bool,
                    onClick: r.default.func,
                    boxProps: r.default.object,
                    children: r.default.node,
                    disablePadding: r.default.bool,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-delineator/snap-delineator.js' },
    ],
    [
      6166,
      { './snap-home-menu': 6167 },
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
                var a,
                  r = (a = e('./snap-home-menu')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-home-menu/index.js' },
    ],
    [
      6167,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../snap-metadata-modal': 6178,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../snap-metadata-modal');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function d({
                  snapId: e,
                  isSettingsAvailable: t,
                  onSettingsClick: n,
                  onRemoveClick: a,
                }) {
                  const o = (0, i.useI18nContext)(),
                    [u, d] = (0, r.useState)(),
                    [p, f] = (0, r.useState)(!1),
                    [m, h] = (0, r.useState)(!1),
                    g = e => {
                      switch (e) {
                        case 'settings':
                          n();
                          break;
                        case 'details':
                          h(!0);
                          break;
                        case 'remove':
                          a();
                      }
                      f(!1);
                    },
                    y = () => {
                      f(!1);
                    };
                  return r.default.createElement(
                    r.default.Fragment,
                    null,
                    m &&
                      r.default.createElement(c.SnapMetadataModal, {
                        snapId: e,
                        isOpen: m,
                        onClose: () => h(!1),
                      }),
                    r.default.createElement(
                      s.Box,
                      { display: l.Display.Flex },
                      r.default.createElement(
                        s.Box,
                        {
                          display: l.Display.Flex,
                          justifyContent: l.JustifyContent.center,
                          alignItems: l.AlignItems.center,
                        },
                        r.default.createElement(s.ButtonIcon, {
                          iconName: s.IconName.MoreVertical,
                          'data-testid': 'snap-home-menu-button',
                          ariaLabel: o('snapHomeMenu'),
                          onClick: () => {
                            f(!p);
                          },
                          size: s.ButtonIconSize.Md,
                          ref: e => {
                            d(e);
                          },
                        })
                      ),
                      r.default.createElement(
                        s.Popover,
                        {
                          referenceElement: u,
                          isOpen: p,
                          position: s.PopoverPosition.BottomEnd,
                          role: s.PopoverRole.Dialog,
                          preventOverflow: !0,
                          padding: 0,
                          offset: [-12, -2],
                          onClickOutside: y,
                          onPressEscKey: y,
                          style: { zIndex: 1 },
                        },
                        r.default.createElement(
                          s.Box,
                          {
                            display: l.Display.Flex,
                            padding: 1,
                            flexDirection: l.FlexDirection.Column,
                            className: 'snap-home-menu',
                          },
                          t &&
                            r.default.createElement(
                              s.Box,
                              { className: 'snap-home-menu__item' },
                              r.default.createElement(
                                s.Text,
                                {
                                  onClick: () => g('settings'),
                                  variant: l.TextVariant.bodyMd,
                                  padding: [1, 1, 2, 2],
                                },
                                o('settings')
                              )
                            ),
                          r.default.createElement(
                            s.Box,
                            { className: 'snap-home-menu__item' },
                            r.default.createElement(
                              s.Text,
                              {
                                onClick: () => g('details'),
                                variant: l.TextVariant.bodyMd,
                                padding: [1, 1, 2, 2],
                              },
                              o('details')
                            )
                          ),
                          r.default.createElement(
                            s.Box,
                            { className: 'snap-home-menu__item' },
                            r.default.createElement(
                              s.Text,
                              {
                                onClick: () => g('remove'),
                                variant: l.TextVariant.bodyMd,
                                color: l.TextColor.errorDefault,
                                padding: [1, 1, 2, 2],
                              },
                              o('remove')
                            )
                          )
                        )
                      )
                    )
                  );
                }
                d.propTypes = {
                  snapId: o.default.string.isRequired,
                  isSettingsAvailable: o.default.bool.isRequired,
                  onSettingsClick: o.default.func.isRequired,
                  onRemoveClick: o.default.func.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-home-menu/snap-home-menu.js' },
    ],
    [
      6168,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../helpers/constants/snaps': 6881,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../copyable': 6150,
        '../snap-delineator': 6164,
        '../snap-ui-renderer': 6263,
        './useSnapHome': 6169,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SnapHomeRenderer = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('react-router-dom'),
                  s = e('react-redux'),
                  l = e('../../../component-library'),
                  c = e('../snap-ui-renderer'),
                  u = e('../../../../selectors'),
                  d = e('../snap-delineator'),
                  p = e('../../../../helpers/constants/snaps'),
                  f = e('../../../../helpers/constants/design-system'),
                  m = e('../copyable'),
                  h = e('../../../../hooks/useI18nContext'),
                  g = e('../../../../store/actions'),
                  y = e('../../../../helpers/constants/routes'),
                  b = e('./useSnapHome');
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (v = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const k = ({ snapId: e }) => {
                  const t = (0, s.useDispatch)(),
                    n = (0, h.useI18nContext)(),
                    { name: a } = (0, s.useSelector)(t => (0, u.getSnapMetadata)(t, e)),
                    o = (0, s.useSelector)(u.getMemoizedUnapprovedTemplatedConfirmations),
                    v = (0, s.useSelector)(u.getMemoizedUnapprovedConfirmations),
                    k = (0, i.useHistory)(),
                    { data: _, error: x, loading: w } = (0, b.useSnapHome)({ snapId: e }),
                    M = w || x ? undefined : null == _ ? void 0 : _.id;
                  return (
                    (0, r.useEffect)(() => () => M && t((0, g.deleteInterface)(M)), [M]),
                    (0, r.useEffect)(() => {
                      const t = o.find(t => t.origin === e),
                        n = v.find(t => t.origin === e);
                      t
                        ? k.push(`${y.CONFIRMATION_V_NEXT_ROUTE}/${t.id}`)
                        : n && k.push(`${y.CONFIRM_TRANSACTION_ROUTE}/${n.id}`);
                    }, [o, v, k]),
                    x
                      ? r.default.createElement(
                          l.Box,
                          {
                            height: f.BlockSize.Full,
                            width: f.BlockSize.Full,
                            backgroundColor: f.BackgroundColor.backgroundAlternative,
                            style: { overflowY: 'auto' },
                          },
                          r.default.createElement(
                            l.Box,
                            { height: f.BlockSize.Full, padding: 4 },
                            r.default.createElement(
                              d.SnapDelineator,
                              { snapName: a, type: p.DelineatorType.Error },
                              r.default.createElement(
                                l.Text,
                                { variant: f.TextVariant.bodySm, marginBottom: 4 },
                                n('snapsUIError', [r.default.createElement('b', { key: '0' }, a)])
                              ),
                              r.default.createElement(m.Copyable, { text: x.message })
                            )
                          )
                        )
                      : r.default.createElement(c.SnapUIRenderer, {
                          snapId: e,
                          interfaceId: M,
                          isLoading: w,
                          useFooter: !0,
                        })
                  );
                };
                (n.SnapHomeRenderer = k), (k.propTypes = { snapId: o.default.string });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-home-page/snap-home-renderer.js' },
    ],
    [
      6169,
      { '../../../../store/actions': 7619, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSnapHome = function ({ snapId: e }) {
                    const t = (0, r.useDispatch)(),
                      [n, i] = (0, a.useState)(!0),
                      [s, l] = (0, a.useState)(undefined),
                      [c, u] = (0, a.useState)(undefined);
                    return (
                      (0, a.useEffect)(() => {
                        let n = !1;
                        return (
                          (async function () {
                            try {
                              u(undefined), i(!0);
                              const a = await (0, o.handleSnapRequest)({
                                snapId: e,
                                origin: 'metamask',
                                handler: 'onHomePage',
                                request: { jsonrpc: '2.0', method: ' ' },
                              });
                              n || (l(a), (0, o.forceUpdateMetamaskState)(t));
                            } catch (e) {
                              n || u(e);
                            } finally {
                              n || i(!1);
                            }
                          })(),
                          () => (n = !0)
                        );
                      }, [e]),
                      { data: s, error: c, loading: n }
                    );
                  });
                var a = e('react'),
                  r = e('react-redux'),
                  o = e('../../../../store/actions');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-home-page/useSnapHome.js' },
    ],
    [
      6170,
      { './snap-icon': 6171 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-icon');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-icon/index.ts' },
    ],
    [
      6171,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapIcon = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../../selectors'),
                  s = e('../../../../helpers/utils/util'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/constants/design-system');
                function u() {
                  return (
                    (u = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    u.apply(null, arguments)
                  );
                }
                n.SnapIcon = ({ snapId: e, avatarSize: t = l.IconSize.Lg, ...n }) => {
                  const a = (0, o.useSelector)(t => (0, i.getTargetSubjectMetadata)(t, e)),
                    { name: d } = (0, o.useSelector)(t => (0, i.getSnapMetadata)(t, e)),
                    p = null == a ? void 0 : a.iconUrl,
                    f = (0, s.getAvatarFallbackLetter)(d);
                  return p
                    ? r.default.createElement(
                        l.AvatarFavicon,
                        u(
                          {
                            style: { backgroundColor: 'var(--color-background-alternative-hover)' },
                            src: p,
                            name: d,
                          },
                          n,
                          { size: t }
                        )
                      )
                    : r.default.createElement(
                        l.AvatarBase,
                        u(
                          {
                            display: c.Display.Flex,
                            alignItems: c.AlignItems.center,
                            justifyContent: c.JustifyContent.center,
                            color: c.TextColor.textAlternative,
                            style: {
                              borderWidth: '0px',
                              backgroundColor: 'var(--color-background-alternative-hover)',
                            },
                          },
                          n,
                          { size: t }
                        ),
                        f
                      );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-icon/snap-icon.tsx' },
    ],
    [
      6172,
      { './snap-install-warning': 6173 },
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
                var a,
                  r = (a = e('./snap-install-warning')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-install-warning/index.js' },
    ],
    [
      6173,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../permission-cell': 6119,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = c(e('prop-types')),
                  o = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = c(e('../../permission-cell'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function d({ onCancel: e, onSubmit: t, warnings: n, snapName: r }) {
                  const c = (0, o.useI18nContext)(),
                    [u, d] = (0, a.useState)(!1),
                    [p, f] = (0, a.useState)(!0);
                  function m(e, t) {
                    const n = (function (e) {
                      if (1 === e.length)
                        return [
                          a.default.createElement(
                            s.Text,
                            {
                              fontWeight: i.FontWeight.Medium,
                              as: 'span',
                              key: 'warningMessageSubject',
                            },
                            e[0].warningMessageSubject
                          ),
                        ];
                      if (2 === e.length) {
                        const t = e[0].warningMessageSubject,
                          n = e[1].warningMessageSubject;
                        return [
                          a.default.createElement(
                            s.Text,
                            {
                              fontWeight: i.FontWeight.Normal,
                              as: 'span',
                              key: 'warningMessageSubject',
                            },
                            c('andForTwoItems', [
                              a.default.createElement(
                                s.Text,
                                {
                                  fontWeight: i.FontWeight.Medium,
                                  variant: i.TextVariant.inherit,
                                  key: `${t}_and_first`,
                                },
                                t
                              ),
                              a.default.createElement(
                                s.Text,
                                {
                                  fontWeight: i.FontWeight.Medium,
                                  variant: i.TextVariant.inherit,
                                  key: `${n}_and_second`,
                                },
                                n
                              ),
                            ])
                          ),
                        ];
                      }
                      return e.map((t, n) =>
                        e.length - 1 === n
                          ? []
                          : e.length - 2 === n
                            ? [
                                a.default.createElement(
                                  s.Text,
                                  {
                                    fontWeight: i.FontWeight.Normal,
                                    as: 'span',
                                    key: `${t.permissionName}_and_${n}`,
                                  },
                                  c('andForListItems', [
                                    a.default.createElement(
                                      s.Text,
                                      {
                                        fontWeight: i.FontWeight.Medium,
                                        variant: i.TextVariant.inherit,
                                        key: `${t.permissionName}_and_first_${n}`,
                                      },
                                      t.warningMessageSubject
                                    ),
                                    a.default.createElement(
                                      s.Text,
                                      {
                                        fontWeight: i.FontWeight.Medium,
                                        variant: i.TextVariant.inherit,
                                        key: `${t.permissionName}_and_second_first_${n}`,
                                      },
                                      e[e.length - 1].warningMessageSubject
                                    ),
                                  ])
                                ),
                              ]
                            : [
                                a.default.createElement(
                                  'span',
                                  { key: `${t.permissionName}_${n}` },
                                  a.default.createElement(
                                    s.Text,
                                    { fontWeight: i.FontWeight.Medium, as: 'span' },
                                    t.warningMessageSubject,
                                    ', '
                                  )
                                ),
                              ]
                      );
                    })(e);
                    return a.default.createElement(
                      s.Box,
                      { as: 'span', marginBottom: 4 },
                      a.default.createElement(l.default, {
                        permissionName: a.default.createElement(s.Text, null, c(t.name, [n])),
                        title: a.default.createElement(s.Text, null, c(t.title, [n])),
                        description: c(t.description, [
                          a.default.createElement(
                            s.Text,
                            {
                              color: i.TextColor.inherit,
                              variant: i.TextVariant.inherit,
                              fontWeight: i.FontWeight.Medium,
                              key: '1',
                            },
                            r
                          ),
                        ]),
                        weight: 1,
                        avatarIcon: s.IconName.Key,
                        key: `snapInstallWarningPermissionCellKeyEntropy_${t.permissionName}`,
                        hideStatus: !0,
                        margin: 0,
                      })
                    );
                  }
                  const h = {
                      name: 'snapInstallWarningPermissionNameForViewPublicKey',
                      title: 'snapInstallWarningPermissionNameForViewPublicKey',
                      description: 'snapInstallWarningPermissionDescriptionForBip32View',
                    },
                    g = {
                      name: 'snapInstallWarningPermissionNameForEntropy',
                      title: 'snapInstallWarningPermissionNameForEntropy',
                      description: 'snapInstallWarningPermissionDescriptionForEntropy',
                    },
                    y = n.filter(e => 'snap_getBip32PublicKey' === e.permissionName),
                    b = n.filter(
                      e =>
                        'snap_getBip32Entropy' === e.permissionName ||
                        'snap_getBip44Entropy' === e.permissionName
                    );
                  return a.default.createElement(
                    s.Modal,
                    { onClose: e, isOpen: p, className: 'snap-install-warning' },
                    a.default.createElement(
                      s.ModalContent,
                      null,
                      a.default.createElement(
                        s.ModalHeader,
                        { onClose: e },
                        a.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            justifyContent: i.JustifyContent.center,
                            marginBottom: 4,
                          },
                          a.default.createElement(s.AvatarIcon, {
                            iconName: s.IconName.Danger,
                            backgroundColor: i.BackgroundColor.warningMuted,
                            color: i.IconColor.warningDefault,
                            size: s.AvatarIconSize.Xl,
                          })
                        )
                      ),
                      a.default.createElement(
                        s.ModalBody,
                        null,
                        a.default.createElement(
                          s.Text,
                          {
                            paddingBottom: 4,
                            textAlign: i.TextAlign.Center,
                            variant: i.TextVariant.headingMd,
                            as: 'h2',
                          },
                          c('snapInstallWarningHeading')
                        ),
                        a.default.createElement(
                          s.Text,
                          { paddingBottom: 4, textAlign: i.TextAlign.Left },
                          c('snapInstallWarningCheck', [
                            a.default.createElement(
                              s.Text,
                              {
                                key: 'snapNameInWarningDescription',
                                fontWeight: i.FontWeight.Medium,
                                as: 'span',
                              },
                              r
                            ),
                          ])
                        ),
                        b.length > 0 && m(b, g),
                        y.length > 0 && m(y, h),
                        a.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            justifyContent: i.JustifyContent.flexStart,
                            alignItems: i.AlignItems.center,
                            marginTop: 4,
                            padding: 4,
                            borderRadius: i.BorderRadius.SM,
                            backgroundColor: u
                              ? i.BackgroundColor.infoMuted
                              : i.BackgroundColor.backgroundAlternative,
                          },
                          a.default.createElement(s.Checkbox, {
                            isRequired: !0,
                            onChange: () => d(e => !e),
                            isChecked: u,
                            label: a.default.createElement(
                              s.Text,
                              { as: 'span' },
                              'Install',
                              ' ',
                              a.default.createElement(
                                s.Text,
                                { as: 'span', fontWeight: i.FontWeight.Medium },
                                r
                              )
                            ),
                          })
                        )
                      ),
                      a.default.createElement(s.ModalFooter, {
                        onSubmit: function () {
                          f(!1), t();
                        },
                        submitButtonProps: {
                          children: c('confirm'),
                          disabled: !u,
                          'data-testid': 'snap-install-warning-modal-confirm',
                        },
                      })
                    )
                  );
                }
                d.propTypes = {
                  onCancel: r.default.func,
                  onSubmit: r.default.func,
                  warnings: r.default.arrayOf({
                    id: r.default.string,
                    permissionName: r.default.string,
                    warningMessageSubject: r.default.oneOfType([
                      r.default.string,
                      r.default.element,
                    ]),
                  }),
                  snapName: r.default.string.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-install-warning/snap-install-warning.js',
      },
    ],
    [
      6174,
      { './snap-link-warning': 6175 },
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
                var a,
                  r = (a = e('./snap-link-warning')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-link-warning/index.js' },
    ],
    [
      6175,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../component-library/modal-content/deprecated': 6412,
        '../../../component-library/modal-header/deprecated': 6421,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = p);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = e('../../../component-library'),
                  i = e('../../../component-library/modal-content/deprecated'),
                  s = e('../../../component-library/modal-header/deprecated'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = ({ url: e }) => {
                  const t = new URL(e);
                  if ('https:' === t.protocol) {
                    const n = e.split(t.host);
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      n[0],
                      a.default.createElement('b', null, t.host),
                      n[1]
                    );
                  }
                  const n = e.split(t.protocol);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    t.protocol,
                    a.default.createElement('b', null, n[1])
                  );
                };
                function p({ isOpen: e, onClose: t, url: n }) {
                  const r = (0, c.useI18nContext)();
                  return a.default.createElement(
                    o.Modal,
                    { isOpen: e, onClose: t },
                    a.default.createElement(o.ModalOverlay, null),
                    a.default.createElement(
                      i.ModalContent,
                      {
                        modalDialogProps: {
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Column,
                          gap: 4,
                        },
                      },
                      a.default.createElement(
                        s.ModalHeader,
                        {
                          onClose: t,
                          childrenWrapperProps: {
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                            alignItems: l.AlignItems.center,
                            gap: 2,
                          },
                        },
                        a.default.createElement(o.Icon, {
                          name: o.IconName.Danger,
                          color: l.IconColor.warningDefault,
                          size: o.AvatarIconSize.Xl,
                        }),
                        a.default.createElement(
                          o.Text,
                          { variant: l.TextVariant.headingMd },
                          r('leaveMetaMask')
                        ),
                        a.default.createElement(
                          o.Text,
                          { textAlign: l.TextAlign.Center },
                          r('leaveMetaMaskDesc')
                        )
                      ),
                      a.default.createElement(
                        o.ButtonLink,
                        {
                          externalLink: !0,
                          href: n,
                          width: l.BlockSize.Full,
                          textProps: { width: l.BlockSize.Full },
                        },
                        a.default.createElement(
                          o.Box,
                          {
                            display: l.Display.Flex,
                            FlexDirection: l.FlexDirection.Row,
                            justifyContent: l.JustifyContent.spaceBetween,
                            alignItems: l.AlignItems.center,
                            backgroundColor: l.BackgroundColor.backgroundAlternative,
                            borderColor: l.BorderColor.borderDefault,
                            borderStyle: l.BorderStyle.solid,
                            borderRadius: l.BorderRadius.MD,
                            paddingTop: 3,
                            paddingBottom: 3,
                            paddingRight: 4,
                            paddingLeft: 4,
                            width: l.BlockSize.Full,
                          },
                          a.default.createElement(
                            o.Text,
                            {
                              ellipsis: !0,
                              style: { overflow: 'hidden' },
                              color: l.TextColor.primaryDefault,
                            },
                            a.default.createElement(d, { url: n })
                          ),
                          a.default.createElement(o.Icon, {
                            name: o.IconName.Export,
                            color: l.IconColor.iconAlternative,
                            marginLeft: 2,
                          })
                        )
                      ),
                      a.default.createElement(
                        o.Box,
                        { width: l.BlockSize.Full, display: l.Display.Flex, gap: 4 },
                        a.default.createElement(
                          o.Button,
                          {
                            block: !0,
                            variant: o.ButtonVariant.Secondary,
                            size: o.ButtonSize.Lg,
                            onClick: t,
                          },
                          r('back')
                        ),
                        a.default.createElement(
                          o.Button,
                          {
                            block: !0,
                            size: o.ButtonSize.Lg,
                            'data-testid': 'modalSnapLinkButton',
                            href: n,
                            externalLink: !0,
                            onClick: t,
                          },
                          r('visitSite')
                        )
                      )
                    )
                  );
                }
                (d.propTypes = { url: r.default.string }),
                  (p.propTypes = {
                    isOpen: r.default.bool,
                    onClose: r.default.func,
                    url: r.default.string,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-link-warning/snap-link-warning.js' },
    ],
    [
      6176,
      { './snap-list-item': 6177 },
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
                var a,
                  r = (a = e('./snap-list-item')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-list-item/index.js' },
    ],
    [
      6177,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../snap-icon': 6170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library'),
                  s = e('../snap-icon');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = ({ name: e, packageName: t, onClick: n, snapId: r, showUpdateDot: l }) =>
                  a.default.createElement(
                    i.Box,
                    {
                      className: 'snap-list-item',
                      'data-testid': r,
                      display: o.Display.Flex,
                      alignItems: o.AlignItems.center,
                      justifyContent: o.JustifyContent.spaceBetween,
                      width: o.BlockSize.Full,
                      padding: 4,
                      onClick: n,
                    },
                    a.default.createElement(
                      i.Box,
                      {
                        className: 'snap-list-item__inner-wrapper',
                        display: o.Display.Flex,
                        alignItems: o.AlignItems.center,
                        justifyContent: o.JustifyContent.flexStart,
                        width: o.BlockSize.Full,
                      },
                      a.default.createElement(
                        i.Box,
                        null,
                        a.default.createElement(s.SnapIcon, { snapId: r })
                      ),
                      a.default.createElement(
                        i.Box,
                        {
                          paddingLeft: 4,
                          paddingRight: 4,
                          width: o.BlockSize.Full,
                          style: { overflow: 'hidden' },
                        },
                        a.default.createElement(
                          i.Text,
                          {
                            className: 'snap-list-item__title',
                            color: o.Color.textDefault,
                            variant: o.TextVariant.bodyMd,
                            ellipsis: !0,
                          },
                          e
                        ),
                        a.default.createElement(
                          i.Text,
                          {
                            className: 'snap-list-item__url',
                            color: o.Color.textAlternative,
                            variant: o.TextVariant.bodySm,
                            ellipsis: !0,
                          },
                          t
                        )
                      )
                    ),
                    l &&
                      a.default.createElement(
                        i.Box,
                        { display: o.Display.Flex },
                        a.default.createElement(i.Icon, {
                          name: i.IconName.FullCircle,
                          size: i.IconSize.Xs,
                          color: o.IconColor.primaryDefault,
                        })
                      )
                  );
                c.propTypes = {
                  name: r.default.string,
                  packageName: r.default.string,
                  onClick: r.default.func,
                  snapId: r.default.string.isRequired,
                  showUpdateDot: r.default.bool,
                };
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-list-item/snap-list-item.js' },
    ],
    [
      6178,
      { './snap-metadata-modal': 6179 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapMetadataModal', {
                    enumerable: !0,
                    get: function () {
                      return a.SnapMetadataModal;
                    },
                  });
                var a = e('./snap-metadata-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-metadata-modal/index.js' },
    ],
    [
      6179,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/snaps/useSafeWebsite': 6961,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useOriginMetadata': 7e3,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../../../ui/tooltip': 6818,
        '../show-more': 6155,
        '../snap-icon': 6170,
        '../snap-version/snap-external-pill': 6272,
        '@metamask/snaps-utils': 2890,
        'prop-types': 5082,
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
                  (n.SnapMetadataModal = void 0);
                var a = b(e('react')),
                  r = b(e('prop-types')),
                  o = e('react-redux'),
                  i = e('@metamask/snaps-utils'),
                  s = e('../../../../selectors'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../helpers/utils/util'),
                  d = e('../../../../hooks/useI18nContext'),
                  p = e('../../../../hooks/useOriginMetadata'),
                  f = e('../show-more'),
                  m = b(e('../snap-version/snap-external-pill')),
                  h = e('../../../../hooks/snaps/useSafeWebsite'),
                  g = b(e('../../../ui/tooltip')),
                  y = e('../snap-icon');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const v = ({ snapId: e, isOpen: t, onClose: n }) => {
                  const r = (0, d.useI18nContext)(),
                    b = (0, o.useSelector)(t => (0, s.getTargetSubjectMetadata)(t, e)),
                    { name: v, description: k } = (0, o.useSelector)(t =>
                      (0, s.getSnapMetadata)(t, e)
                    ),
                    _ = (0, o.useSelector)(t => (0, s.getSnap)(t, e)),
                    x = (null == _ ? void 0 : _.versionHistory) ?? [],
                    w = x.length ? x[x.length - 1] : undefined,
                    M = (0, p.useOriginMetadata)(null == w ? void 0 : w.origin),
                    T = (0, i.isSnapId)(null == w ? void 0 : w.origin),
                    E = (0, i.getSnapPrefix)(e),
                    C = (0, i.stripSnapPrefix)(e),
                    S = 'npm:' === E,
                    O = null != b && b.version ? `/v/${null == b ? void 0 : b.version}` : '',
                    I = S ? `https://www.npmjs.com/package/${C}${O}` : C,
                    P = (0, o.useSelector)(t => (0, s.getSnapRegistryData)(t, e)),
                    { website: j = undefined } = (null == P ? void 0 : P.metadata) ?? {},
                    N = (0, h.useSafeWebsite)(j);
                  return a.default.createElement(
                    l.Modal,
                    { isOpen: t, onClose: n, className: 'snap-metadata-modal' },
                    a.default.createElement(l.ModalOverlay, null),
                    a.default.createElement(
                      l.ModalContent,
                      {
                        modalDialogProps: {
                          display: c.Display.Flex,
                          flexDirection: c.FlexDirection.Column,
                        },
                      },
                      a.default.createElement(
                        l.ModalHeader,
                        {
                          onClose: n,
                          childrenWrapperProps: {
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Column,
                            alignItems: c.AlignItems.center,
                            gap: 2,
                            marginBottom: 6,
                          },
                        },
                        a.default.createElement(
                          l.Box,
                          null,
                          a.default.createElement(y.SnapIcon, { snapId: e })
                        ),
                        a.default.createElement(
                          l.Text,
                          { variant: c.TextVariant.bodyMdMedium, textAlign: c.TextAlign.Center },
                          v
                        )
                      ),
                      a.default.createElement(
                        l.Box,
                        { marginLeft: 4, marginRight: 4 },
                        N &&
                          a.default.createElement(
                            l.Box,
                            {
                              display: c.Display.Flex,
                              FlexDirection: c.FlexDirection.Row,
                              justifyContent: c.JustifyContent.spaceBetween,
                              flexWrap: c.FlexWrap.NoWrap,
                            },
                            a.default.createElement(
                              l.Text,
                              { variant: c.TextVariant.bodyMdMedium, marginRight: 4 },
                              r('snapDetailWebsite')
                            ),
                            a.default.createElement(
                              l.ButtonLink,
                              {
                                overflowWrap: c.OverflowWrap.Anywhere,
                                href: N.toString(),
                                target: '_blank',
                                externalLink: !0,
                                textAlign: c.TextAlign.End,
                                ellipsis: !0,
                              },
                              N.host
                            )
                          ),
                        M &&
                          a.default.createElement(
                            l.Box,
                            {
                              display: c.Display.Flex,
                              flexDirection: c.FlexDirection.Row,
                              justifyContent: c.JustifyContent.spaceBetween,
                              flexWrap: c.FlexWrap.NoWrap,
                              marginTop: 4,
                            },
                            a.default.createElement(
                              l.Box,
                              {
                                display: c.Display.Flex,
                                flexDirection: c.FlexDirection.Row,
                                alignItems: c.AlignItems.center,
                                marginRight: 4,
                              },
                              a.default.createElement(
                                l.Text,
                                { variant: c.TextVariant.bodyMdMedium, marginRight: 1 },
                                r('installOrigin')
                              ),
                              w &&
                                a.default.createElement(
                                  g.default,
                                  {
                                    html: r('installedOn', [
                                      (0, u.formatDate)(w.date, 'dd MMM yyyy'),
                                    ]),
                                    position: 'bottom',
                                  },
                                  a.default.createElement(l.Icon, {
                                    color: c.IconColor.iconMuted,
                                    name: l.IconName.Info,
                                    size: l.IconSize.Sm,
                                  })
                                )
                            ),
                            a.default.createElement(
                              l.Text,
                              { ellipsis: !0 },
                              T ? (0, i.stripSnapPrefix)(w.origin) : M.host
                            )
                          ),
                        a.default.createElement(
                          l.Box,
                          {
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Row,
                            justifyContent: c.JustifyContent.spaceBetween,
                            flexWrap: c.FlexWrap.NoWrap,
                            marginTop: 4,
                          },
                          a.default.createElement(
                            l.Box,
                            {
                              display: c.Display.Flex,
                              flexDirection: c.FlexDirection.Row,
                              alignItems: c.AlignItems.center,
                              marginRight: 4,
                            },
                            a.default.createElement(
                              l.Text,
                              { variant: c.TextVariant.bodyMdMedium, marginRight: 1 },
                              r('source')
                            ),
                            a.default.createElement(
                              g.default,
                              {
                                html: r('metadataModalSourceTooltip', [
                                  a.default.createElement(
                                    l.Text,
                                    {
                                      key: 'snap-name',
                                      fontWeight: c.FontWeight.Medium,
                                      variant: c.TextVariant.inherit,
                                    },
                                    v
                                  ),
                                  a.default.createElement(
                                    l.Text,
                                    {
                                      key: 'snap-id',
                                      fontWeight: c.FontWeight.Medium,
                                      variant: c.TextVariant.inherit,
                                    },
                                    C
                                  ),
                                ]),
                                position: 'bottom',
                              },
                              a.default.createElement(l.Icon, {
                                color: c.IconColor.iconMuted,
                                name: l.IconName.Info,
                                size: l.IconSize.Sm,
                              })
                            )
                          ),
                          a.default.createElement(m.default, { value: C, url: I })
                        ),
                        a.default.createElement(
                          l.Box,
                          {
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Row,
                            justifyContent: c.JustifyContent.spaceBetween,
                            flexWrap: c.FlexWrap.NoWrap,
                            marginTop: 4,
                          },
                          a.default.createElement(
                            l.Text,
                            { variant: c.TextVariant.bodyMdMedium, marginRight: 4 },
                            r('version')
                          ),
                          a.default.createElement(
                            l.Text,
                            { ellipsis: !0 },
                            null == b ? void 0 : b.version
                          )
                        ),
                        a.default.createElement(
                          l.Box,
                          {
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Column,
                            marginTop: 4,
                          },
                          a.default.createElement(
                            l.Text,
                            { variant: c.TextVariant.bodyMdMedium, marginRight: 4 },
                            r('descriptionFromSnap', [v])
                          ),
                          a.default.createElement(
                            f.ShowMore,
                            null,
                            a.default.createElement(l.Text, null, k)
                          )
                        )
                      )
                    )
                  );
                };
                (n.SnapMetadataModal = v),
                  (v.propTypes = {
                    snapId: r.default.string,
                    isOpen: r.default.bool,
                    onClose: r.default.func,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-metadata-modal/snap-metadata-modal.js',
      },
    ],
    [
      6180,
      { './snap-permission-adapter': 6181 },
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
                var a,
                  r = (a = e('./snap-permission-adapter')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-permission-adapter/index.js' },
    ],
    [
      6181,
      { '../snap-permission-cell': 6182, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = s);
                var a = i(e('react')),
                  r = i(e('prop-types')),
                  o = i(e('../snap-permission-cell'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function s({
                  snapId: e,
                  permissions: t,
                  showOptions: n,
                  targetSubjectsMetadata: r,
                  revoked: i,
                  approved: s,
                }) {
                  return t.map((t, l) =>
                    a.default.createElement(o.default, {
                      snapId: e,
                      showOptions: n,
                      connectionSubjectMetadata: r[t.connection],
                      permission: t,
                      index: l,
                      key: `permissionCellDisplay_${e}_${l}`,
                      revoked: i,
                      approved: s,
                    })
                  );
                }
                s.propTypes = {
                  snapId: r.default.string.isRequired,
                  snapName: r.default.string.isRequired,
                  permissions: r.default.array.isRequired,
                  showOptions: r.default.bool,
                  targetSubjectsMetadata: r.default.object,
                  weightThreshold: r.default.number,
                  revoked: r.default.bool,
                  approved: r.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-permission-adapter/snap-permission-adapter.js',
      },
    ],
    [
      6182,
      { './snap-permission-cell': 6183 },
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
                var a,
                  r = (a = e('./snap-permission-cell')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-permission-cell/index.js' },
    ],
    [
      6183,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../../permission-cell': 6119,
        '@metamask/permission-controller': 2421,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = m);
                var a = f(e('prop-types')),
                  r = e('@metamask/permission-controller'),
                  o = f(e('react')),
                  i = e('react-redux'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../helpers/utils/util'),
                  u = f(e('../../permission-cell')),
                  d = e('../../../../hooks/useI18nContext'),
                  p = e('../../../../selectors');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m({
                  snapId: e,
                  showOptions: t,
                  permission: n,
                  connectionSubjectMetadata: a,
                  index: f,
                  revoked: m,
                  approved: h,
                }) {
                  var g;
                  const y = (0, d.useI18nContext)();
                  let { label: b, description: v, leftIcon: k } = n;
                  const _ = (0, i.useSelector)(p.getSnapsMetadata);
                  if (n.connection) {
                    if ((null == a ? void 0 : a.subjectType) === r.SubjectType.Snap) {
                      const e = (0, c.getSnapName)(_)(a.origin);
                      (b = (e =>
                        y('snapConnectTo', [
                          o.default.createElement(
                            s.Text,
                            {
                              key: 'snapConnectTo',
                              fontWeight: l.FontWeight.Medium,
                              variant: l.TextVariant.inherit,
                              color: l.TextColor.inherit,
                            },
                            e
                          ),
                        ]))(e)),
                        (v = (e =>
                          y('snapConnectionPermissionDescription', [
                            o.default.createElement(
                              s.Text,
                              {
                                key: `permissionSubject_${n.subjectName}`,
                                fontWeight: l.FontWeight.Medium,
                                variant: l.TextVariant.inherit,
                                color: l.TextColor.inherit,
                              },
                              n.subjectName
                            ),
                            o.default.createElement(
                              s.Text,
                              {
                                key: `permissionSubjectDescription_${e}`,
                                fontWeight: l.FontWeight.Medium,
                                variant: l.TextVariant.inherit,
                                color: l.TextColor.inherit,
                              },
                              e
                            ),
                          ]))(e));
                    }
                    (x = null == a ? void 0 : a.iconUrl),
                      (w = n),
                      (k = x
                        ? o.default.createElement(s.AvatarFavicon, {
                            backgroundColor: l.BackgroundColor.backgroundAlternative,
                            size: s.AvatarFaviconSize.Md,
                            iconProps: { size: s.IconSize.Sm },
                            src: x,
                            name: w.connection,
                          })
                        : o.default.createElement(
                            s.AvatarBase,
                            {
                              size: s.AvatarBaseSize.Md,
                              display: l.Display.Flex,
                              alignItems: l.AlignItems.center,
                              justifyContent: l.JustifyContent.center,
                              color: l.TextColor.textAlternative,
                              style: { borderWidth: '0px' },
                              backgroundColor: l.BackgroundColor.backgroundAlternative,
                            },
                            (0, c.getAvatarFallbackLetter)(w.connectionName)
                          ));
                  }
                  var x, w;
                  return o.default.createElement(u.default, {
                    snapId: e,
                    permissionName: n.permissionName,
                    title: b,
                    description: v,
                    weight: n.weight,
                    avatarIcon: k,
                    dateApproved:
                      null == n || null === (g = n.permissionValue) || void 0 === g
                        ? void 0
                        : g.date,
                    key: `${n.permissionName}-${f}`,
                    showOptions: t,
                    revoked: m,
                    approved: h,
                  });
                }
                m.propTypes = {
                  snapId: a.default.string.isRequired,
                  showOptions: a.default.bool,
                  permission: a.default.object.isRequired,
                  connectionSubjectMetadata: a.default.object,
                  index: a.default.number,
                  revoked: a.default.bool,
                  approved: a.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-permission-cell/snap-permission-cell.js',
      },
    ],
    [
      6184,
      { './snap-permissions-list': 6185 },
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
                var a,
                  r = (a = e('./snap-permissions-list')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-permissions-list/index.js' },
    ],
    [
      6185,
      {
        '../../../../../shared/constants/permissions': 5808,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/permission': 6912,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../snap-permission-adapter': 6180,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = g);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = m(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../component-library'),
                  l = e('../../../../selectors'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../../shared/constants/permissions'),
                  d = e('../../../../helpers/utils/util'),
                  p = e('../../../../helpers/utils/permission'),
                  f = m(e('../snap-permission-adapter'));
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
                function g({
                  snapId: e,
                  snapName: t,
                  permissions: n,
                  connections: r,
                  showOptions: m,
                  showAllPermissions: h,
                  onShowAllPermissions: g,
                }) {
                  const y = (0, i.useI18nContext)(),
                    b = (0, a.useMemo)(() => ({ ...n, connection_permission: r ?? {} }), [n, r]),
                    v = (0, o.useSelector)(e => (0, l.getMultipleTargetsSubjectMetadata)(e, r)),
                    k = (0, o.useSelector)(l.getSnapsMetadata),
                    _ = (0, p.getWeightedPermissions)({
                      t: y,
                      permissions: b,
                      subjectName: t,
                      getSubjectName: (0, d.getSnapName)(k),
                    }),
                    [x, w] = (0, a.useState)(
                      h || Object.keys(_).length <= u.PermissionsAbstractionThreshold
                    ),
                    M = (0, d.getFilteredSnapPermissions)(
                      _,
                      u.PermissionWeightThreshold.snapInstall,
                      u.MinPermissionAbstractionDisplayCount
                    );
                  return a.default.createElement(
                    s.Box,
                    {
                      display: c.Display.Flex,
                      flexDirection: c.FlexDirection.Column,
                      width: c.BlockSize.Full,
                    },
                    a.default.createElement(
                      s.Box,
                      { className: 'snap-permissions-list', width: c.BlockSize.Full },
                      a.default.createElement(f.default, {
                        permissions: x ? _ : M,
                        snapId: e,
                        snapName: t,
                        showOptions: m,
                        targetSubjectsMetadata: v,
                      })
                    ),
                    x
                      ? null
                      : a.default.createElement(
                          s.Box,
                          {
                            display: c.Display.Flex,
                            justifyContent: c.JustifyContent.center,
                            paddingTop: 2,
                            paddingBottom: 2,
                          },
                          a.default.createElement(
                            s.ButtonLink,
                            {
                              onClick: () => {
                                g(), w(!0);
                              },
                            },
                            y('seeAllPermissions')
                          )
                        )
                  );
                }
                g.propTypes = {
                  snapId: r.default.string.isRequired,
                  snapName: r.default.string.isRequired,
                  permissions: r.default.object.isRequired,
                  connections: r.default.object,
                  showOptions: r.default.bool,
                  showAllPermissions: r.default.bool,
                  onShowAllPermissions: r.default.func,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-permissions-list/snap-permissions-list.js',
      },
    ],
    [
      6186,
      { './snap-privacy-warning': 6187 },
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
                var a,
                  r = (a = e('./snap-privacy-warning')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-privacy-warning/index.js' },
    ],
    [
      6187,
      {
        '../../../../../shared/constants/terms': 5816,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useScrollRequired': 7003,
        '../../../component-library': 6402,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = e('../../../../hooks/useI18nContext'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../hooks/useScrollRequired'),
                  c = e('../../../../../shared/constants/terms');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d({ onAccepted: e, onCanceled: t }) {
                  const n = (0, o.useI18nContext)(),
                    {
                      isScrollable: r,
                      isScrolledToBottom: u,
                      scrollToBottom: d,
                      ref: p,
                      onScroll: f,
                    } = (0, l.useScrollRequired)();
                  return a.default.createElement(
                    i.Modal,
                    { onClose: () => null, isOpen: !0, className: 'snap-install-warning' },
                    a.default.createElement(
                      i.ModalContent,
                      null,
                      a.default.createElement(
                        i.ModalBody,
                        { className: 'snap-privacy-warning' },
                        a.default.createElement(
                          i.Box,
                          null,
                          a.default.createElement(
                            i.Box,
                            { className: 'snap-privacy-warning__header' },
                            a.default.createElement(
                              i.Box,
                              {
                                marginTop: 4,
                                className: 'snap-privacy-warning__header__info-icon',
                                display: s.Display.Flex,
                                justifyContent: s.JustifyContent.center,
                                alignItems: s.AlignItems.center,
                              },
                              a.default.createElement(i.AvatarIcon, {
                                iconName: i.IconName.Info,
                                color: s.IconColor.infoDefault,
                                backgroundColor: s.BackgroundColor.primaryMuted,
                                size: i.AvatarIconSize.Md,
                              })
                            ),
                            a.default.createElement(
                              i.Box,
                              {
                                className: 'snap-privacy-warning__header__title',
                                marginTop: 4,
                                marginBottom: 4,
                                display: s.Display.Flex,
                                justifyContent: s.JustifyContent.center,
                                alignItems: s.AlignItems.center,
                              },
                              a.default.createElement(
                                i.Text,
                                { variant: s.TextVariant.headingMd, fontWeight: s.FontWeight.Bold },
                                n('thirdPartySoftware')
                              )
                            )
                          ),
                          a.default.createElement(
                            i.Box,
                            { className: 'snap-privacy-warning__content', ref: p, onScroll: f },
                            a.default.createElement(
                              i.Box,
                              { className: 'snap-privacy-warning__message' },
                              a.default.createElement(
                                i.Text,
                                { variant: s.TextVariant.bodyMd },
                                n('snapsPrivacyWarningFirstMessage', [
                                  a.default.createElement(
                                    i.ButtonLink,
                                    {
                                      className: 'snap-privacy-warning__content__terms-link',
                                      key: 'privacyNoticeTermsOfUseLink',
                                      size: i.ButtonLinkSize.Inherit,
                                      href: c.TERMS_OF_USE_LINK,
                                      target: '_blank',
                                    },
                                    ' ',
                                    n('snapsTermsOfUse'),
                                    ' '
                                  ),
                                ])
                              ),
                              a.default.createElement(
                                i.Text,
                                { variant: s.TextVariant.bodyMd, paddingTop: 6 },
                                n('snapsPrivacyWarningSecondMessage')
                              ),
                              a.default.createElement(
                                i.Text,
                                {
                                  variant: s.TextVariant.bodyMd,
                                  fontWeight: s.FontWeight.Bold,
                                  paddingTop: 6,
                                },
                                n('snapsPrivacyWarningThirdMessage')
                              )
                            ),
                            r && !u
                              ? a.default.createElement(i.AvatarIcon, {
                                  className: 'snap-privacy-warning__content__scroll-button',
                                  'data-testid': 'snap-privacy-warning-scroll',
                                  iconName: i.IconName.Arrow2Down,
                                  backgroundColor: s.BackgroundColor.infoDefault,
                                  color: s.IconColor.primaryInverse,
                                  onClick: d,
                                  style: { cursor: 'pointer' },
                                })
                              : null
                          )
                        )
                      ),
                      a.default.createElement(i.ModalFooter, {
                        onSubmit: e,
                        onCancel: t,
                        submitButtonProps: { children: n('accept'), disabled: !u },
                        cancelButtonProps: { children: n('cancel') },
                      })
                    )
                  );
                }
                d.propTypes = {
                  onAccepted: r.default.func.isRequired,
                  onCanceled: r.default.func.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-privacy-warning/snap-privacy-warning.js',
      },
    ],
    [
      6188,
      { './snap-remove-warning': 6189 },
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
                var a,
                  r = (a = e('./snap-remove-warning')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-remove-warning/index.js' },
    ],
    [
      6189,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../component-library/modal-content/deprecated': 6412,
        '../../../component-library/modal-header/deprecated': 6421,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = e('../../../../hooks/useI18nContext'),
                  i = e('../../../component-library'),
                  s = e('../../../component-library/modal-content/deprecated'),
                  l = e('../../../component-library/modal-header/deprecated'),
                  c = e('../../../../helpers/constants/design-system');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d({ isOpen: e, onCancel: t, onSubmit: n, snapName: r }) {
                  const u = (0, o.useI18nContext)();
                  return a.default.createElement(
                    i.Modal,
                    { isOpen: e, onClose: t },
                    a.default.createElement(i.ModalOverlay, null),
                    a.default.createElement(
                      s.ModalContent,
                      {
                        modalDialogProps: {
                          display: c.Display.Flex,
                          flexDirection: c.FlexDirection.Column,
                          gap: 4,
                        },
                      },
                      a.default.createElement(l.ModalHeader, { onClose: t }, u('pleaseConfirm')),
                      a.default.createElement(i.Text, null, u('removeSnapConfirmation', [r])),
                      a.default.createElement(
                        i.Box,
                        { width: c.BlockSize.Full, display: c.Display.Flex, gap: 4 },
                        a.default.createElement(
                          i.Button,
                          {
                            block: !0,
                            variant: i.BUTTON_VARIANT.SECONDARY,
                            size: i.BUTTON_SIZES.LG,
                            onClick: t,
                          },
                          u('cancel')
                        ),
                        a.default.createElement(
                          i.Button,
                          {
                            block: !0,
                            size: i.BUTTON_SIZES.LG,
                            id: 'popoverRemoveSnapButton',
                            danger: !0,
                            onClick: n,
                          },
                          u('removeSnap')
                        )
                      )
                    )
                  );
                }
                d.propTypes = {
                  onCancel: r.default.func,
                  onSubmit: r.default.func,
                  snapName: r.default.string,
                  isOpen: r.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-remove-warning/snap-remove-warning.js',
      },
    ],
    [
      6190,
      { './snap-settings-renderer': 6191 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-settings-renderer');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-settings-page/index.ts' },
    ],
    [
      6191,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/snaps': 6881,
        '../../../../helpers/utils/snaps': 6916,
        '../../../../hooks/snaps/useSnapSettings': 6963,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../copyable': 6150,
        '../snap-delineator': 6164,
        '../snap-ui-renderer': 6263,
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
                  (n.SnapSettingsRenderer = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../store/actions'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../snap-delineator'),
                  d = e('../../../../selectors'),
                  p = e('../../../../helpers/constants/snaps'),
                  f = e('../copyable'),
                  m = e('../snap-ui-renderer'),
                  h = e('../../../../hooks/snaps/useSnapSettings'),
                  g = e('../../../../helpers/utils/snaps');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SnapSettingsRenderer = () => {
                  const { pathname: e } = (0, o.useLocation)(),
                    t = (0, r.useDispatch)(),
                    n = (0, i.useI18nContext)(),
                    y = (0, a.useMemo)(() => (0, g.decodeSnapIdFromPathname)(e), [e]),
                    { name: b } = (0, r.useSelector)(e => (0, d.getSnapMetadata)(e, y)),
                    { data: v, error: k, loading: _ } = (0, h.useSnapSettings)({ snapId: y }),
                    x = _ || k ? undefined : null == v ? void 0 : v.id;
                  return (
                    (0, a.useEffect)(
                      () => () => {
                        x && t((0, s.deleteInterface)(x));
                      },
                      [x]
                    ),
                    y
                      ? a.default.createElement(
                          l.Box,
                          {
                            height: c.BlockSize.Full,
                            width: c.BlockSize.Full,
                            backgroundColor: c.BackgroundColor.backgroundDefault,
                          },
                          k &&
                            a.default.createElement(
                              l.Box,
                              { height: c.BlockSize.Full, padding: 4 },
                              a.default.createElement(
                                u.SnapDelineator,
                                { snapName: b, type: p.DelineatorType.Error },
                                a.default.createElement(
                                  l.Text,
                                  { variant: c.TextVariant.bodySm, marginBottom: 4 },
                                  n('snapsUIError', [a.default.createElement('b', { key: '0' }, b)])
                                ),
                                a.default.createElement(f.Copyable, { text: k.message })
                              )
                            ),
                          (x || _) &&
                            a.default.createElement(m.SnapUIRenderer, {
                              snapId: y,
                              interfaceId: x,
                              isLoading: _,
                              contentBackgroundColor: c.BackgroundColor.backgroundDefault,
                            })
                        )
                      : null
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-settings-page/snap-settings-renderer.tsx',
      },
    ],
    [
      6192,
      { './snap-ui-address-input': 6193 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-address-input');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-address-input/index.ts' },
    ],
    [
      6193,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/snaps/useDisplayName': 6958,
        '../../../component-library': 6402,
        '../snap-ui-avatar': 6199,
        '@metamask/utils': 2995,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SnapUIAddressInput = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = (a = e('classnames')) && a.__esModule ? a : { default: a },
                  i = e('@metamask/utils'),
                  s = e('../../../component-library'),
                  l = e('../../../../contexts/snaps'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../snap-ui-avatar'),
                  d = e('../../../../hooks/snaps/useDisplayName');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function f() {
                  return (
                    (f = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    f.apply(null, arguments)
                  );
                }
                n.SnapUIAddressInput = ({
                  name: e,
                  form: t,
                  label: n,
                  chainId: a,
                  displayAvatar: p = !0,
                  error: m,
                  ...h
                }) => {
                  const {
                      handleInputChange: g,
                      getValue: y,
                      focusedInput: b,
                      setCurrentFocusedInput: v,
                    } = (0, l.useSnapInterfaceContext)(),
                    k = (0, r.useRef)(null),
                    _ = y(e, t),
                    { namespace: x, reference: w } = (0, i.parseCaipChainId)(a),
                    [M, T] = (0, r.useState)(_ ? (0, i.parseCaipAccountId)(_).address : ''),
                    E = (0, d.useDisplayName)({
                      address: M,
                      chain: { namespace: x, reference: w },
                      chainId: a,
                    });
                  (0, r.useEffect)(() => {
                    k.current && e === b && k.current.querySelector('input').focus();
                  }, [k]);
                  const C = () => {
                      T(''), g(e, '', t);
                    },
                    S = () =>
                      r.default.createElement(
                        s.Box,
                        { display: c.Display.Flex, flexDirection: c.FlexDirection.Column },
                        n &&
                          r.default.createElement(
                            s.Label,
                            { className: (0, o.default)('mm-form-text-field__label') },
                            n
                          ),
                        r.default.createElement(
                          s.Box,
                          {
                            display: c.Display.Flex,
                            backgroundColor: c.BackgroundColor.backgroundDefault,
                            alignItems: c.AlignItems.center,
                            borderWidth: 1,
                            borderRadius: c.BorderRadius.LG,
                            borderColor: c.BorderColor.borderMuted,
                            paddingLeft: 4,
                            paddingRight: 4,
                            gap: 2,
                            style: { height: '48px' },
                          },
                          p &&
                            r.default.createElement(u.SnapUIAvatar, {
                              address: `${a}:${M}`,
                              size: 'sm',
                            }),
                          r.default.createElement(
                            s.Box,
                            {
                              display: c.Display.Flex,
                              alignItems: c.AlignItems.center,
                              gap: 2,
                              style: { flex: 1, minWidth: 0 },
                            },
                            r.default.createElement(
                              s.Box,
                              {
                                flexDirection: c.FlexDirection.Column,
                                gap: 2,
                                style: { minWidth: 0, flex: 1 },
                              },
                              r.default.createElement(
                                s.Text,
                                { fontWeight: c.FontWeight.Medium },
                                E
                              ),
                              r.default.createElement(
                                s.Text,
                                { variant: c.TextVariant.bodyXs, ellipsis: !0 },
                                M
                              )
                            )
                          ),
                          r.default.createElement(s.Icon, {
                            onClick: C,
                            name: s.IconName.Close,
                            color: c.IconColor.infoDefault,
                            style: { cursor: 'pointer', flexShrink: 0 },
                          })
                        )
                      );
                  return E
                    ? r.default.createElement(S, null)
                    : r.default.createElement(
                        s.FormTextField,
                        f(
                          {
                            ref: k,
                            onFocus: () => v(e),
                            onBlur: () => v(null),
                            className: (0, o.default)('snap-ui-renderer__address-input', {
                              'snap-ui-renderer__field': n !== undefined,
                            }),
                            id: e,
                            value: M,
                            onChange: n => {
                              T(n.target.value);
                              const r = n.target.value ? `${a}:${n.target.value}` : '';
                              g(e, r, t);
                            },
                            label: n,
                            error: Boolean(m),
                            size: s.FormTextFieldSize.Lg,
                            helpText: m,
                            textFieldProps: { borderRadius: c.BorderRadius.LG },
                            startAccessory:
                              p && M
                                ? r.default.createElement(u.SnapUIAvatar, {
                                    address: `${a}:${M}`,
                                    size: 'sm',
                                  })
                                : null,
                            endAccessory: M
                              ? r.default.createElement(s.Icon, {
                                  onClick: C,
                                  name: s.IconName.Close,
                                  color: c.IconColor.infoDefault,
                                  style: { cursor: 'pointer' },
                                })
                              : null,
                          },
                          h
                        )
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-address-input/snap-ui-address-input.tsx',
      },
    ],
    [
      6194,
      { './snap-ui-address': 6195 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-address');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-address/index.ts' },
    ],
    [
      6195,
      {
        '../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/snaps/useDisplayName': 6958,
        '../../../component-library': 6402,
        '../snap-ui-avatar': 6199,
        '@metamask/utils': 2995,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIAddress = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('@metamask/utils'),
                  o = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../helpers/utils/util'),
                  l = e('../../../../../shared/modules/hexstring-utils'),
                  c = e('../snap-ui-avatar'),
                  u = e('../../../../hooks/snaps/useDisplayName');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SnapUIAddress = ({
                  address: e,
                  avatarSize: t = 'md',
                  truncate: n = !0,
                  displayName: d = !1,
                  avatar: p = !0,
                }) => {
                  const f = (0, a.useMemo)(
                      () => ((0, r.isHexString)(e) ? `eip155:1:${e}` : e),
                      [e]
                    ),
                    m = (0, a.useMemo)(() => (0, r.parseCaipAccountId)(f), [f]),
                    h = (0, u.useDisplayName)(m),
                    g =
                      'eip155' === m.chain.namespace
                        ? (0, l.toChecksumHexAddress)(m.address)
                        : m.address,
                    y = n ? (0, s.shortenAddress)(g) : e;
                  return a.default.createElement(
                    o.Box,
                    {
                      className: 'snap-ui-renderer__address',
                      'data-testid': 'snap-ui-address',
                      display: i.Display.Flex,
                      alignItems: i.AlignItems.center,
                      gap: 2,
                    },
                    p && a.default.createElement(c.SnapUIAvatar, { address: f, size: t }),
                    a.default.createElement(
                      o.Text,
                      {
                        variant: i.TextVariant.bodyMd,
                        color: i.TextColor.inherit,
                        style: { lineBreak: 'anywhere' },
                      },
                      d && h ? h : y
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-address/snap-ui-address.tsx' },
    ],
    [
      6196,
      { './snap-ui-asset-selector': 6197 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-asset-selector');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-asset-selector/index.ts' },
    ],
    [
      6197,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../snap-ui-selector': 6266,
        './useSnapAssetDisplay': 6198,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SnapUIAssetSelector = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../snap-ui-selector'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = e('./useSnapAssetDisplay');
                function u() {
                  return (
                    (u = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    u.apply(null, arguments)
                  );
                }
                const d = ({
                  icon: e,
                  symbol: t,
                  name: n,
                  balance: a,
                  fiat: o,
                  networkName: l,
                  networkIcon: c,
                }) =>
                  r.default.createElement(
                    s.Box,
                    {
                      display: i.Display.Flex,
                      alignItems: i.AlignItems.center,
                      width: i.BlockSize.Full,
                      gap: 4,
                      style: { overflow: 'hidden' },
                    },
                    r.default.createElement(
                      s.Box,
                      { display: i.Display.Flex, alignItems: i.AlignItems.center },
                      r.default.createElement(
                        s.BadgeWrapper,
                        {
                          badge: r.default.createElement(s.AvatarNetwork, {
                            size: s.AvatarNetworkSize.Xs,
                            name: l,
                            src: c,
                            backgroundColor: i.BackgroundColor.backgroundDefault,
                          }),
                        },
                        r.default.createElement(s.AvatarToken, { src: e })
                      )
                    ),
                    r.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        style: { overflow: 'hidden' },
                      },
                      r.default.createElement(
                        s.Text,
                        { variant: i.TextVariant.bodyMdMedium, ellipsis: !0 },
                        n
                      ),
                      r.default.createElement(
                        s.Text,
                        {
                          color: i.TextColor.textAlternative,
                          variant: i.TextVariant.bodySm,
                          ellipsis: !0,
                        },
                        l
                      )
                    ),
                    r.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        marginLeft: 'auto',
                        textAlign: i.TextAlign.End,
                        className: 'snap-ui-renderer__asset-selector-option__balance',
                      },
                      r.default.createElement(
                        s.Text,
                        { variant: i.TextVariant.bodySmMedium },
                        a,
                        ' ',
                        t
                      ),
                      r.default.createElement(
                        s.Text,
                        { color: i.TextColor.textAlternative, variant: i.TextVariant.bodySm },
                        o
                      )
                    )
                  );
                n.SnapUIAssetSelector = ({ addresses: e, chainIds: t, disabled: n, ...a }) => {
                  const i = (0, l.useI18nContext)(),
                    s = (0, c.useSnapAssetSelectorData)({ addresses: e, chainIds: t }),
                    p = s.map(({ address: e, name: t, symbol: n }) => ({
                      key: 'asset',
                      value: { asset: e, name: t, symbol: n },
                      disabled: !1,
                    })),
                    f = s.map((e, t) => r.default.createElement(d, u({}, e, { key: t })));
                  return r.default.createElement(
                    o.SnapUISelector,
                    u(
                      {
                        className: 'snap-ui-renderer__asset-selector',
                        title: i('snapUIAssetSelectorTitle'),
                        options: p,
                        optionComponents: f,
                        disabled: n || 0 === s.length,
                      },
                      a
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-asset-selector/snap-ui-asset-selector.tsx',
      },
    ],
    [
      6198,
      {
        '../../../../../shared/constants/bridge': 5790,
        '../../../../ducks/locale/locale': 6859,
        '../../../../selectors': 7601,
        '../../../../selectors/assets': 7595,
        '../../../../selectors/multichain': 7605,
        '../../../../selectors/snaps': 7616,
        '../../assets/util/formatWithThreshold': 5963,
        '@metamask/utils': 2995,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSnapAssetSelectorData = void 0);
                var a = e('@metamask/utils'),
                  r = e('react-redux'),
                  o = e('../../../../selectors'),
                  i = e('../../../../selectors/assets'),
                  s = e('../../../../ducks/locale/locale'),
                  l = e('../../assets/util/formatWithThreshold'),
                  c = e('../../../../selectors/multichain'),
                  u = e('../../../../../shared/constants/bridge'),
                  d = e('../../../../selectors/snaps');
                n.useSnapAssetSelectorData = ({ addresses: e, chainIds: t }) => {
                  const n = (0, r.useSelector)(d.getMemoizedCurrentCurrency),
                    p = (0, r.useSelector)(s.getIntlLocale),
                    f = e.map(a.parseCaipAccountId),
                    m = (0, r.useSelector)(e =>
                      (0, o.getMemoizedInternalAccountByAddress)(e, f[0].address)
                    ),
                    h = (0, r.useSelector)(c.getMemoizedMultichainNetworkConfigurationsByChainId),
                    g = (0, r.useSelector)(e => (0, i.getMultiChainAssets)(e, m)),
                    y = (e = 0) =>
                      (0, l.formatWithThreshold)(e, 0.01, p, {
                        style: 'currency',
                        currency: n.toUpperCase(),
                      }),
                    b = e => {
                      const t = parseFloat(e);
                      return (0, l.formatWithThreshold)(t, 1e-5, p, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 5,
                      });
                    },
                    v = f
                      .map(e => e)
                      .filter(({ chainId: e }) => !t || (null == t ? void 0 : t.includes(e)));
                  return g
                    .map(e => {
                      var t;
                      const n =
                        u.NETWORK_TO_SHORT_NETWORK_NAME_MAP[e.chainId] ??
                        (null === (t = h[e.chainId]) || void 0 === t ? void 0 : t.name);
                      return {
                        icon: e.image,
                        symbol: e.symbol,
                        name: e.title,
                        balance: b(e.primary),
                        networkName: n,
                        networkIcon: (0, c.getImageForChainId)(e.chainId),
                        fiat: y(e.secondary),
                        chainId: e.chainId,
                        address: e.address,
                      };
                    })
                    .filter(e =>
                      v.some(({ chainId: t, chain: { namespace: n, reference: r } }) => {
                        if (n === a.KnownCaipNamespace.Eip155 && '0' === r) {
                          const { namespace: t } = (0, a.parseCaipChainId)(e.chainId);
                          return t === n;
                        }
                        return t === e.chainId;
                      })
                    );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-asset-selector/useSnapAssetDisplay.tsx',
      },
    ],
    [
      6199,
      { './snap-ui-avatar': 6200 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-avatar');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-avatar/index.ts' },
    ],
    [
      6200,
      {
        '../../../../selectors': 7601,
        '../../../ui/identicon/blockieIdenticon': 6755,
        '../../../ui/jazzicon': 6762,
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
                  (n.SnapUIAvatar = n.DIAMETERS = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/utils'),
                  i = c(e('../../../ui/identicon/blockieIdenticon')),
                  s = c(e('../../../ui/jazzicon')),
                  l = e('../../../../selectors');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const d = (n.DIAMETERS = { xs: 16, sm: 24, md: 32, lg: 40 });
                n.SnapUIAvatar = ({ address: e, size: t = 'md' }) => {
                  const n = (0, a.useMemo)(() => (0, o.parseCaipAccountId)(e), [e]);
                  return (0, r.useSelector)(l.getUseBlockie)
                    ? a.default.createElement(i.default, {
                        address: n.address,
                        diameter: d[t],
                        borderRadius: '50%',
                      })
                    : a.default.createElement(s.default, {
                        namespace: n.chain.namespace,
                        address: n.address,
                        diameter: d[t],
                        style: { display: 'flex' },
                      });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-avatar/snap-ui-avatar.tsx' },
    ],
    [
      6201,
      { './snap-ui-banner': 6202 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-banner');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-banner/index.ts' },
    ],
    [
      6202,
      { '../../../component-library': 6402, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIBanner = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../component-library');
                n.SnapUIBanner = ({ children: e, severity: t, title: n }) =>
                  r.default.createElement(o.BannerAlert, { severity: t, title: n }, e);
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-banner/snap-ui-banner.tsx' },
    ],
    [
      6203,
      { './snap-ui-button': 6204 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-button');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-button/index.ts' },
    ],
    [
      6204,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '@metamask/snaps-sdk': 2779,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIButton = void 0);
                var a = c(e('react')),
                  r = c(e('classnames')),
                  o = e('@metamask/snaps-sdk'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../contexts/snaps');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function u() {
                  return (
                    (u = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    u.apply(null, arguments)
                  );
                }
                const d = {
                  primary: s.TextColor.infoDefault,
                  destructive: s.TextColor.errorDefault,
                  disabled: s.TextColor.textMuted,
                };
                n.SnapUIButton = ({
                  name: e,
                  children: t,
                  type: n = o.ButtonType.Button,
                  variant: c = 'primary',
                  disabled: p = !1,
                  loading: f = !1,
                  className: m = '',
                  textVariant: h,
                  ...g
                }) => {
                  const { handleEvent: y } = (0, l.useSnapInterfaceContext)(),
                    b = d[p ? 'disabled' : c];
                  return a.default.createElement(
                    i.Text,
                    u(
                      {
                        className: (0, r.default)(m, 'snap-ui-renderer__button', {
                          'snap-ui-renderer__button--disabled': p,
                        }),
                        as: 'button',
                        id: e,
                        type: n,
                        fontWeight: s.FontWeight.Medium,
                        onClick: t => {
                          n === o.ButtonType.Button && t.preventDefault(),
                            y({ event: o.UserInputEventType.ButtonClickEvent, name: e });
                        },
                        color: b,
                        disabled: p,
                        variant: h,
                      },
                      g
                    ),
                    f
                      ? a.default.createElement(i.Icon, {
                          name: i.IconName.Loading,
                          style: { animation: 'spin 1.2s linear infinite' },
                        })
                      : t
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-button/snap-ui-button.tsx' },
    ],
    [
      6205,
      { './snap-ui-card': 6206 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-card');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-card/index.ts' },
    ],
    [
      6206,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../snap-ui-image': 6219,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUICard = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library'),
                  s = e('../snap-ui-image');
                n.SnapUICard = ({ image: e, title: t, description: n, value: a, extra: l }) =>
                  r.default.createElement(
                    i.Box,
                    {
                      className: 'snap-ui-renderer__card',
                      display: o.Display.Flex,
                      justifyContent: o.JustifyContent.spaceBetween,
                      alignItems: o.AlignItems.center,
                    },
                    r.default.createElement(
                      i.Box,
                      {
                        display: o.Display.Flex,
                        gap: 4,
                        alignItems: o.AlignItems.center,
                        style: { overflow: 'hidden' },
                      },
                      e &&
                        r.default.createElement(s.SnapUIImage, {
                          width: '32px',
                          height: '32px',
                          value: e,
                          borderRadius: '999px',
                        }),
                      r.default.createElement(
                        i.Box,
                        {
                          display: o.Display.Flex,
                          flexDirection: o.FlexDirection.Column,
                          style: { overflow: 'hidden' },
                        },
                        r.default.createElement(
                          i.Text,
                          { variant: o.TextVariant.bodyMdMedium, ellipsis: !0 },
                          t
                        ),
                        n &&
                          r.default.createElement(
                            i.Text,
                            { color: o.TextColor.textAlternative, ellipsis: !0 },
                            n
                          )
                      )
                    ),
                    r.default.createElement(
                      i.Box,
                      {
                        display: o.Display.Flex,
                        flexDirection: o.FlexDirection.Column,
                        textAlign: o.TextAlign.Right,
                        style: { overflow: 'hidden' },
                      },
                      r.default.createElement(
                        i.Text,
                        { variant: o.TextVariant.bodyMdMedium, ellipsis: !0 },
                        a
                      ),
                      l &&
                        r.default.createElement(
                          i.Text,
                          { color: o.TextColor.textAlternative, ellipsis: !0 },
                          l
                        )
                    )
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-card/snap-ui-card.tsx' },
    ],
    [
      6207,
      { './snap-ui-checkbox': 6208 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-checkbox');
                Object.keys(a).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === a[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return a[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-checkbox/index.ts' },
    ],
  ],
  [],
  {}
);
