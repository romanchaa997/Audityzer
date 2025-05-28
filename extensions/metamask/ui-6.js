LavaPack.loadBundle(
  [
    [
      6498,
      {
        '../../../../app/scripts/lib/multichain/address': 142,
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/modules/network.utils': 5868,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../app/connected-status-indicator': 6005,
        '../../component-library': 6402,
        '../../ui/tooltip': 6818,
        '../account-picker': 6489,
        '../global-menu': 6563,
        '../notifications-tag-counter': 6641,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AppHeaderUnlockedContent = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = I(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = M(e('webextension-polyfill')),
                  r = e('react-redux'),
                  i = e('react-router-dom'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../component-library'),
                  c = M(e('../../ui/tooltip')),
                  u = e('../../../../shared/constants/metametrics'),
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../store/actions'),
                  m = M(e('../../app/connected-status-indicator')),
                  f = e('../account-picker'),
                  g = e('../global-menu'),
                  h = e('../../../selectors'),
                  y = e('../../../../app/scripts/lib/util'),
                  k = e('../../../../app/scripts/lib/multichain/address'),
                  b = e('../../../helpers/utils/util'),
                  x = e('../../../../shared/constants/app'),
                  C = e('../../../contexts/metametrics'),
                  v = e('../../../hooks/useCopyToClipboard'),
                  T = e('../../../../shared/constants/time'),
                  E = e('../notifications-tag-counter'),
                  w = e('../../../helpers/constants/routes'),
                  _ = e('../../../../shared/modules/network.utils');
                function M(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function I(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (I = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.AppHeaderUnlockedContent = ({
                  popupStatus: e,
                  currentNetwork: t,
                  networkOpenCallback: n,
                  disableNetworkPicker: M,
                  disableAccountPicker: I,
                  menuRef: S,
                }) => {
                  const A = (0, o.useContext)(C.MetaMetricsContext),
                    N = (0, d.useI18nContext)(),
                    O = (0, i.useHistory)(),
                    P = (0, r.useDispatch)(),
                    B = (0, r.useSelector)(h.getOriginOfCurrentTab),
                    [D, j] = (0, o.useState)(!1),
                    F = (0, r.useSelector)(h.getTestNetworkBackgroundColor),
                    L = (0, _.getNetworkIcon)(t),
                    R = (0, r.useSelector)(h.getSelectedInternalAccount),
                    $ = R && (0, b.shortenAddress)((0, k.normalizeSafeAddress)(R.address)),
                    W = null == R ? void 0 : R.address,
                    z = (0, k.normalizeSafeAddress)(W),
                    [U, V] = (0, v.useCopyToClipboard)(T.MINUTE),
                    H =
                      (0, y.getEnvironmentType)() === x.ENVIRONMENT_TYPE_POPUP &&
                      B &&
                      B !== a.default.runtime.id,
                    G = () => {
                      A({
                        event: u.MetaMetricsEventName.NavMainMenuOpened,
                        category: u.MetaMetricsEventCategory.Navigation,
                        properties: { location: 'Home' },
                      }),
                        j(!0);
                    };
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    e
                      ? o.default.createElement(
                          l.Box,
                          { className: 'multichain-app-header__contents__container' },
                          o.default.createElement(
                            c.default,
                            { title: t.name, position: 'right' },
                            o.default.createElement(l.PickerNetwork, {
                              avatarNetworkProps: { backgroundColor: F, role: 'img', name: t.name },
                              className: 'multichain-app-header__contents--avatar-network',
                              ref: S,
                              as: 'button',
                              src: L,
                              label: t.name,
                              'aria-label': `${N('networkMenu')} ${t.name}`,
                              labelProps: { display: s.Display.None },
                              onClick: e => {
                                e.stopPropagation(), e.preventDefault(), n();
                              },
                              display: [s.Display.Flex, s.Display.None],
                              disabled: M,
                            })
                          )
                        )
                      : o.default.createElement(
                          'div',
                          null,
                          o.default.createElement(l.PickerNetwork, {
                            avatarNetworkProps: { backgroundColor: F, role: 'img', name: t.name },
                            margin: 2,
                            'aria-label': `${N('networkMenu')} ${t.name}`,
                            label: t.name,
                            src: L,
                            onClick: e => {
                              e.stopPropagation(), e.preventDefault(), n();
                            },
                            display: [s.Display.None, s.Display.Flex],
                            className: 'multichain-app-header__contents__network-picker',
                            disabled: M,
                            'data-testid': 'network-display',
                          })
                        ),
                    R &&
                      o.default.createElement(
                        l.Text,
                        {
                          as: 'div',
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          alignItems: s.AlignItems.center,
                          ellipsis: !0,
                        },
                        o.default.createElement(f.AccountPicker, {
                          address: R.address,
                          name: R.metadata.name,
                          onClick: () => {
                            P((0, p.toggleAccountMenu)()),
                              A({
                                event: u.MetaMetricsEventName.NavAccountMenuOpened,
                                category: u.MetaMetricsEventCategory.Navigation,
                                properties: { location: 'Home' },
                              });
                          },
                          disabled: I,
                          labelProps: { fontWeight: s.FontWeight.Bold },
                          paddingLeft: 0,
                          paddingRight: 0,
                        }),
                        o.default.createElement(
                          c.default,
                          { position: 'left', title: N(U ? 'addressCopied' : 'copyToClipboard') },
                          o.default.createElement(
                            l.ButtonBase,
                            {
                              className: 'multichain-app-header__address-copy-button',
                              onClick: () => V(z),
                              size: l.ButtonBaseSize.Sm,
                              backgroundColor: s.BackgroundColor.transparent,
                              borderRadius: s.BorderRadius.LG,
                              endIconName: U ? l.IconName.CopySuccess : l.IconName.Copy,
                              endIconProps: {
                                color: s.IconColor.iconAlternative,
                                size: l.IconSize.Sm,
                              },
                              ellipsis: !0,
                              textProps: {
                                display: s.Display.Flex,
                                alignItems: s.AlignItems.center,
                                gap: 2,
                              },
                              style: { height: 'auto' },
                              'data-testid': 'app-header-copy-button',
                            },
                            o.default.createElement(
                              l.Text,
                              {
                                color: s.TextColor.textAlternative,
                                variant: s.TextVariant.bodySm,
                                ellipsis: !0,
                                as: 'span',
                              },
                              $
                            )
                          )
                        )
                      ),
                    o.default.createElement(
                      l.Box,
                      {
                        display: s.Display.Flex,
                        alignItems: s.AlignItems.center,
                        justifyContent: s.JustifyContent.flexEnd,
                        style: { marginLeft: 'auto' },
                      },
                      o.default.createElement(
                        l.Box,
                        { display: s.Display.Flex, gap: 4 },
                        H &&
                          o.default.createElement(
                            l.Box,
                            { ref: S },
                            o.default.createElement(m.default, {
                              onClick: () => {
                                O.push(`${w.REVIEW_PERMISSIONS}/${encodeURIComponent(B)}`);
                              },
                            })
                          ),
                        ' ',
                        o.default.createElement(
                          l.Box,
                          {
                            ref: S,
                            display: s.Display.Flex,
                            justifyContent: s.JustifyContent.flexEnd,
                            width: s.BlockSize.Full,
                          },
                          !D &&
                            o.default.createElement(
                              l.Box,
                              { style: { position: 'relative' }, onClick: () => G() },
                              o.default.createElement(E.NotificationsTagCounter, { noLabel: !0 })
                            ),
                          o.default.createElement(l.ButtonIcon, {
                            iconName: l.IconName.MoreVertical,
                            'data-testid': 'account-options-menu-button',
                            ariaLabel: N('accountOptions'),
                            onClick: () => {
                              G();
                            },
                            size: l.ButtonIconSize.Sm,
                          })
                        )
                      ),
                      o.default.createElement(g.GlobalMenu, {
                        anchorElement: S.current,
                        isOpen: D,
                        closeMenu: () => j(!1),
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/app-header/app-header-unlocked-content.tsx',
      },
    ],
    [
      6499,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/network.utils': 5868,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../ducks/send': 6865,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        '../../../selectors/multichain/networks': 7606,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        './app-header-container': 6496,
        './app-header-locked-content': 6497,
        './app-header-unlocked-content': 6498,
        './multichain-meta-fox-logo': 6501,
        classnames: 4168,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AppHeader = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = w(e('classnames')),
                  r = w(e('prop-types')),
                  i = e('react-redux'),
                  s = e('react-router-dom'),
                  l = e('../../../contexts/metametrics'),
                  c = e('../../../../shared/constants/metametrics'),
                  u = e('../../../helpers/constants/routes'),
                  d = e('../../../helpers/constants/design-system'),
                  p = e('../../component-library'),
                  m = e('../../../selectors'),
                  f = e('../../../store/actions'),
                  g = e('../../../../app/scripts/lib/util'),
                  h = e('../../../../shared/constants/app'),
                  y = e('../../../ducks/metamask/metamask'),
                  k = e('../../../ducks/send'),
                  b = e('../../../selectors/multichain/networks'),
                  x = e('../../../../shared/modules/network.utils'),
                  C = e('./multichain-meta-fox-logo'),
                  v = e('./app-header-container'),
                  T = e('./app-header-unlocked-content'),
                  E = e('./app-header-locked-content');
                function w(e) {
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
                function M() {
                  return (
                    (M = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    M.apply(null, arguments)
                  );
                }
                const I = ({ location: e }) => {
                  const t = (0, o.useContext)(l.MetaMetricsContext),
                    n = (0, o.useRef)(null),
                    r = (0, i.useSelector)(y.getIsUnlocked),
                    w = (0, i.useSelector)(b.getSelectedMultichainNetworkConfiguration),
                    { chainId: _, isEvm: I } = w,
                    S = (0, x.getNetworkIcon)(_, I),
                    A = (0, i.useDispatch)(),
                    N = (0, g.getEnvironmentType)() === h.ENVIRONMENT_TYPE_POPUP,
                    O = (0, i.useSelector)(k.getSendStage),
                    P = [
                      k.SEND_STAGES.EDIT,
                      k.SEND_STAGES.DRAFT,
                      k.SEND_STAGES.ADD_RECIPIENT,
                    ].includes(O),
                    B = Boolean(
                      (0, s.matchPath)(e.pathname, { path: u.CONFIRM_TRANSACTION_ROUTE, exact: !1 })
                    ),
                    D = Boolean((0, s.matchPath)(e.pathname, { path: u.SWAPS_ROUTE, exact: !1 })),
                    j = (0, i.useSelector)(m.getUnapprovedTransactions),
                    F = Object.keys(j).length > 0,
                    L = B || D,
                    R = D || P || B || F,
                    $ = (0, o.useCallback)(() => {
                      A((0, f.toggleNetworkMenu)()),
                        t({
                          event: c.MetaMetricsEventName.NavNetworkMenuOpened,
                          category: c.MetaMetricsEventCategory.Navigation,
                          properties: { location: 'App header', chain_id: _ },
                        });
                    }, [_, A, t]),
                    W = !N && R ? 4 : 0,
                    z = {
                      alignItems: d.AlignItems.center,
                      width: d.BlockSize.Full,
                      backgroundColor: d.BackgroundColor.backgroundDefault,
                      padding: 2,
                      paddingLeft: 4,
                      paddingRight: 4,
                      gap: 2,
                    },
                    U = {
                      display: d.Display.Flex,
                      alignItems: d.AlignItems.center,
                      width: d.BlockSize.Full,
                      justifyContent: d.JustifyContent.spaceBetween,
                      backgroundColor: d.BackgroundColor.backgroundDefault,
                      padding: 2,
                      gap: 2,
                    };
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    r && !N ? o.default.createElement(C.MultichainMetaFoxLogo, null) : null,
                    o.default.createElement(
                      v.AppHeaderContainer,
                      { isUnlocked: r, popupStatus: N, headerBottomMargin: W },
                      o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(
                          p.Box,
                          M(
                            {
                              className: (0, a.default)(
                                r
                                  ? 'multichain-app-header__contents'
                                  : 'multichain-app-header__lock-contents',
                                { 'multichain-app-header-shadow': r && !N }
                              ),
                            },
                            r ? z : U
                          ),
                          r
                            ? o.default.createElement(T.AppHeaderUnlockedContent, {
                                popupStatus: N,
                                currentNetwork: w,
                                networkIconSrc: S,
                                networkOpenCallback: $,
                                disableNetworkPicker: R,
                                disableAccountPicker: L,
                                menuRef: n,
                              })
                            : o.default.createElement(E.AppHeaderLockedContent, {
                                currentNetwork: w,
                                networkIconSrc: S,
                                networkOpenCallback: $,
                              })
                        )
                      )
                    )
                  );
                };
                (n.AppHeader = I), (I.propTypes = { location: r.default.object });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/app-header/app-header.js' },
    ],
    [
      6500,
      { './app-header': 6499 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AppHeader', {
                    enumerable: !0,
                    get: function () {
                      return o.AppHeader;
                    },
                  });
                var o = e('./app-header');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/app-header/index.js' },
    ],
    [
      6501,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useTheme': 7008,
        '../../component-library': 6402,
        '../../ui/metafox-logo': 6777,
        react: 5328,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.MultichainMetaFoxLogo = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-router-dom'),
                  i = e('../../../helpers/constants/routes'),
                  s = e('../../../hooks/useTheme'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../component-library'),
                  u = (o = e('../../ui/metafox-logo')) && o.__esModule ? o : { default: o };
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.MultichainMetaFoxLogo = () => {
                  const e = (0, r.useHistory)(),
                    t = (0, s.useTheme)(),
                    n = (0, a.useCallback)(async () => {
                      e.push(i.DEFAULT_ROUTE);
                    }, [e]);
                  return a.default.createElement(
                    c.Box,
                    {
                      display: [l.Display.None, l.Display.Flex],
                      alignItems: l.AlignItems.center,
                      margin: 2,
                      className: 'multichain-app-header-logo',
                      'data-testid': 'app-header-logo',
                      justifyContent: l.JustifyContent.center,
                    },
                    a.default.createElement(u.default, {
                      unsetIconHeight: !0,
                      onClick: n,
                      theme: t,
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/app-header/multichain-meta-fox-logo.js',
      },
    ],
    [
      6502,
      {
        '../../../../../shared/constants/transaction': 5819,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/constants/common': 6870,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useCurrencyDisplay': 6974,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useTokenFiatAmount': 7014,
        '../../../../hooks/useTokenTracker': 7017,
        '../../../../selectors': 7601,
        '../../../app/user-preferenced-currency-display': 6317,
        '../../../component-library': 6402,
        '../../../ui/currency-display': 6720,
        '../utils': 6522,
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
                  (n.AssetBalanceText = function ({ asset: e, balanceColor: t, error: n }) {
                    var b, C, v, T;
                    const E = (0, y.useI18nContext)(),
                      w = (0, a.useSelector)(c.getCurrentCurrency),
                      _ = (0, a.useSelector)(h.getIsFiatPrimary),
                      { tokensWithBalances: M } = (0, m.useTokenTracker)({
                        tokens:
                          null !== (b = e.details) && void 0 !== b && b.address && !e.balance
                            ? [{ address: e.details.address }]
                            : [],
                        address: undefined,
                      }),
                      I =
                        (0, k.hexToDecimal)(e.balance) ||
                        (null === (C = M[0]) || void 0 === C ? void 0 : C.string),
                      S = null != I && I.includes('.') ? I.slice(0, I.indexOf('.') + 5) : I,
                      A = (0, a.useSelector)(l.getSelectedAccountCachedBalance),
                      N = (0, f.useCurrencyDisplay)(A, { numberOfDecimals: 2, currency: w })[1]
                        .value,
                      O = (0, g.useTokenFiatAmount)(
                        null === (v = e.details) || void 0 === v ? void 0 : v.address,
                        I,
                        undefined,
                        0 === Number(I) ? { exchangeRate: Number.MIN_VALUE } : undefined,
                        !0
                      ),
                      P = e.type === u.AssetType.native ? N : O,
                      B = {
                        hideLabel: !0,
                        textProps: { color: t, variant: d.TextVariant.bodySm },
                        suffixProps: { color: t, variant: d.TextVariant.bodySm },
                      },
                      D = n ? `. ${E(n)}` : '';
                    if (e.type === u.AssetType.NFT) {
                      const t = (0, k.hexToDecimal)(e.balance || '0x0');
                      return o.default.createElement(
                        r.Text,
                        x({}, B.textProps, { 'data-testid': 'asset-balance-nft-display' }),
                        `${E('1' === t ? 'assetSingleNFTBalance' : 'assetMultipleNFTsBalance', [t])}${D}`
                      );
                    }
                    if (_)
                      return o.default.createElement(
                        p.default,
                        x({}, B, { currency: w, numberOfDecimals: 2, displayValue: `${P}${D}` })
                      );
                    if (e.type === u.AssetType.native)
                      return o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(
                          i.default,
                          x({}, B, { value: e.balance, type: s.PRIMARY })
                        ),
                        D
                          ? o.default.createElement(
                              r.Text,
                              {
                                variant: d.TextVariant.bodySm,
                                color: d.TextColor.errorDefault,
                                'data-testid': 'send-page-amount-error',
                              },
                              D
                            )
                          : null
                      );
                    if (null !== (T = e.details) && void 0 !== T && T.address)
                      return o.default.createElement(
                        i.default,
                        x({}, B, { displayValue: `${S || ''}${D}` })
                      );
                    return null;
                  });
                var o = b(e('react')),
                  a = e('react-redux'),
                  r = e('../../../component-library'),
                  i = b(e('../../../app/user-preferenced-currency-display')),
                  s = e('../../../../helpers/constants/common'),
                  l = e('../../../../selectors'),
                  c = e('../../../../ducks/metamask/metamask'),
                  u = e('../../../../../shared/constants/transaction'),
                  d = e('../../../../helpers/constants/design-system'),
                  p = b(e('../../../ui/currency-display')),
                  m = e('../../../../hooks/useTokenTracker'),
                  f = e('../../../../hooks/useCurrencyDisplay'),
                  g = e('../../../../hooks/useTokenFiatAmount'),
                  h = e('../utils'),
                  y = e('../../../../hooks/useI18nContext'),
                  k = e('../../../../../shared/modules/conversion.utils');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function x() {
                  return (
                    (x = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    x.apply(null, arguments)
                  );
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-balance/asset-balance-text.tsx',
      },
    ],
    [
      6503,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        './asset-balance-text': 6502,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AssetBalance = function ({ asset: e, error: t }) {
                    const n = (0, s.useI18nContext)(),
                      o = t ? i.TextColor.errorDefault : i.TextColor.textAlternative;
                    return a.default.createElement(
                      r.Box,
                      { className: 'asset-picker-amount__balance', display: i.Display.Flex },
                      a.default.createElement(
                        r.Text,
                        { color: o, marginRight: 1, variant: i.TextVariant.bodySm },
                        n('balance'),
                        ':'
                      ),
                      a.default.createElement(l.AssetBalanceText, {
                        asset: e,
                        balanceColor: o,
                        error: t,
                      })
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext'),
                  l = e('./asset-balance-text');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-balance/asset-balance.tsx',
      },
    ],
    [
      6504,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/metamask/metamask': 6860,
        '../../../ducks/send': 6865,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useGetAssetImageUrl': 6983,
        '../../../hooks/useI18nContext': 6985,
        '../../../pages/confirmations/send/send.constants': 7361,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        './asset-balance/asset-balance': 6503,
        './asset-picker/asset-picker': 6514,
        './max-clear-button': 6518,
        './swappable-currency-input/swappable-currency-input': 6521,
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
                  (n.AssetPickerAmount = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = x(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../hooks/useI18nContext'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../selectors'),
                  c = e('../../../../shared/constants/transaction'),
                  u = e('../../../ducks/send'),
                  d = e('../../../pages/confirmations/send/send.constants'),
                  p = e('../../../ducks/metamask/metamask'),
                  m = b(e('../../../hooks/useGetAssetImageUrl')),
                  f = e('../../../../shared/modules/selectors/networks'),
                  g = b(e('./max-clear-button')),
                  h = e('./asset-picker/asset-picker'),
                  y = e('./swappable-currency-input/swappable-currency-input'),
                  k = e('./asset-balance/asset-balance');
                function b(e) {
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
                function C() {
                  return (
                    (C = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    C.apply(null, arguments)
                  );
                }
                n.AssetPickerAmount = ({
                  asset: e,
                  amount: t,
                  onAmountChange: n,
                  action: b,
                  isAmountLoading: x,
                  error: v,
                  ...T
                }) => {
                  var E, w, _, M, I, S;
                  const A = (0, a.useSelector)(l.getSelectedInternalAccount),
                    N = (0, r.useI18nContext)(),
                    {
                      swapQuotesError: O,
                      sendAsset: P,
                      receiveAsset: B,
                    } = (0, a.useSelector)(u.getCurrentDraftTransaction),
                    D = !n,
                    j = D && O,
                    F = (0, a.useSelector)(u.getSendMaxModeState),
                    L = (0, a.useSelector)(u.getIsNativeSendPossible),
                    R = (0, a.useSelector)(f.getCurrentChainId),
                    $ = (0, a.useSelector)(p.getNativeCurrency),
                    W = (0, a.useSelector)(l.getNativeCurrencyImage),
                    z = (0, a.useSelector)(l.getTokenList),
                    U = (0, a.useSelector)(l.getIpfsGateway);
                  (0, o.useEffect)(() => {
                    D || L || (F && n('0x0'));
                  }, [L]);
                  const [V, H] = (0, o.useState)(!1),
                    [G, K] = (0, o.useState)(!1),
                    J = (0, m.default)(
                      (null == e || null === (E = e.details) || void 0 === E ? void 0 : E.image) ??
                        undefined,
                      U
                    ),
                    q = (0, o.useCallback)(
                      (t, o) => {
                        G || e.type !== c.AssetType.NFT || K(!0), null == n || n(t, o);
                      },
                      [n, G, e.type]
                    );
                  (0, o.useEffect)(() => {
                    K(!1);
                  }, [e]);
                  const { error: X } = t,
                    Y =
                      X === d.NEGATIVE_OR_ZERO_AMOUNT_TOKENS_ERROR &&
                      e.type === c.AssetType.NFT &&
                      !G,
                    Z = X && !Y ? X : undefined;
                  (0, o.useEffect)(() => {
                    if (!e) throw new Error('No asset is drafted for sending');
                  }, [A]);
                  let Q = s.BorderColor.borderMuted;
                  D
                    ? j && (Q = s.BorderColor.errorDefault)
                    : Z
                      ? (Q = s.BorderColor.errorDefault)
                      : V && (Q = s.BorderColor.primaryDefault);
                  const ee = P.type === c.AssetType.native && B.type !== c.AssetType.native;
                  let te;
                  if ((null == e ? void 0 : e.type) === c.AssetType.native)
                    te = { type: e.type, image: W, symbol: $, chainId: R };
                  else if (
                    (null == e ? void 0 : e.type) === c.AssetType.token &&
                    null != e &&
                    null !== (w = e.details) &&
                    void 0 !== w &&
                    w.symbol
                  ) {
                    var ne, oe;
                    te = {
                      type: e.type,
                      image:
                        J ||
                        (z &&
                          (null === (ne = e.details) || void 0 === ne ? void 0 : ne.address) &&
                          (null === (oe = z[e.details.address.toLowerCase()]) || void 0 === oe
                            ? void 0
                            : oe.iconUrl)),
                      symbol: e.details.symbol,
                      address: e.details.address,
                      chainId: R,
                    };
                  } else
                    (null == e ? void 0 : e.type) === c.AssetType.NFT &&
                      (null == e || null === (_ = e.details) || void 0 === _
                        ? void 0
                        : _.tokenId) !== undefined &&
                      null != e &&
                      null !== (M = e.details) &&
                      void 0 !== M &&
                      M.image &&
                      (te = {
                        type: e.type,
                        tokenId: e.details.tokenId,
                        image: e.details.image,
                        symbol: (e.details.symbol || e.details.name) ?? undefined,
                        address: e.details.address,
                      });
                  return o.default.createElement(
                    i.Box,
                    { className: 'asset-picker-amount' },
                    o.default.createElement(
                      i.Box,
                      {
                        onFocus: () => H(!0),
                        onBlur: () => H(!1),
                        display: s.Display.Flex,
                        alignItems: s.AlignItems.center,
                        backgroundColor: s.BackgroundColor.backgroundDefault,
                        borderRadius: s.BorderRadius.LG,
                        borderColor: Q,
                        borderStyle: s.BorderStyle.solid,
                        borderWidth: 1,
                        marginBottom: 1,
                        padding: 1,
                        paddingTop:
                          (null === (I = e.details) || void 0 === I ? void 0 : I.standard) ===
                          c.TokenStandard.ERC721
                            ? 4
                            : 1,
                        paddingBottom:
                          (null === (S = e.details) || void 0 === S ? void 0 : S.standard) ===
                          c.TokenStandard.ERC721
                            ? 4
                            : 1,
                      },
                      o.default.createElement(h.AssetPicker, C({ action: b, asset: te }, T)),
                      o.default.createElement(y.SwappableCurrencyInput, {
                        onAmountChange: n ? q : undefined,
                        assetType: e.type,
                        asset: e,
                        amount: t,
                        isAmountLoading: x,
                      })
                    ),
                    o.default.createElement(
                      i.Box,
                      { display: s.Display.Flex },
                      n && o.default.createElement(k.AssetBalance, { asset: e, error: v || Z }),
                      j &&
                        o.default.createElement(
                          i.Text,
                          { variant: s.TextVariant.bodySm, color: s.TextColor.errorDefault },
                          N(O)
                        ),
                      n && L && !ee && o.default.createElement(g.default, { asset: e })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-amount.tsx',
      },
    ],
    [
      6505,
      {
        '../../../../ducks/locale/locale': 6859,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/utils/confirm-tx.util': 6899,
        '../../../../hooks/useTokenFiatAmount': 7014,
        '../../../../pages/confirmations/components/simulation-details/formatAmount': 7244,
        '../../../../selectors/multichain': 7605,
        '../../../../selectors/selectors': 7611,
        '../../token-list-item': 6689,
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
                  (n.default = function ({
                    address: e,
                    image: t,
                    symbol: n,
                    string: o,
                    tooltipText: h,
                    tokenFiatAmount: y,
                    chainId: k,
                    assetItemProps: b = {},
                  }) {
                    var x;
                    const C = (0, r.useSelector)(d.getIntlLocale),
                      v = (0, r.useSelector)(s.getCurrentCurrency),
                      T = (0, r.useSelector)(m.getMultichainNetworkConfigurationsByChainId),
                      E = Boolean(!k || T[k]),
                      w = (0, r.useSelector)(f.selectERC20TokensByChain),
                      _ = (0, l.useTokenFiatAmount)(e ?? undefined, o, n, {}, !0),
                      M = o
                        ? `${(0, u.formatAmount)(C, new i.BigNumber(o.toString(), 10))} ${n}`
                        : undefined,
                      I = y ? (0, p.formatCurrency)(y.toString(), v, 2) : _;
                    return a.default.createElement(
                      c.TokenListItem,
                      g(
                        {
                          key: `${k}-${n}-${e}`,
                          chainId: k,
                          tokenSymbol: n,
                          tokenImage:
                            t ??
                            (null == w ||
                            null === (x = w[k]) ||
                            void 0 === x ||
                            null === (x = x.data) ||
                            void 0 === x ||
                            null === (x = x[(e ?? '').toLowerCase()]) ||
                            void 0 === x
                              ? void 0
                              : x.iconUrl),
                          secondary: E ? M : undefined,
                          primary: E ? I : undefined,
                          title: n,
                          tooltipText: h,
                          tokenChainImage: (0, m.getImageForChainId)(k),
                          isPrimaryTokenSymbolHidden: !0,
                        },
                        b
                      )
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('react-redux'),
                  i = e('bignumber.js'),
                  s = e('../../../../ducks/metamask/metamask'),
                  l = e('../../../../hooks/useTokenFiatAmount'),
                  c = e('../../token-list-item'),
                  u = e(
                    '../../../../pages/confirmations/components/simulation-details/formatAmount'
                  ),
                  d = e('../../../../ducks/locale/locale'),
                  p = e('../../../../helpers/utils/confirm-tx.util'),
                  m = e('../../../../selectors/multichain'),
                  f = e('../../../../selectors/selectors');
                function g() {
                  return (
                    (g = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    g.apply(null, arguments)
                  );
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/Asset.tsx',
      },
    ],
    [
      6506,
      {
        '../..': 6574,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useCurrencyDisplay': 6974,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useMultichainSelector': 6993,
        '../../../../selectors/multichain': 7605,
        '../../../component-library': 6402,
        '../../../ui/loading-screen': 6765,
        './Asset': 6505,
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
                  (n.default = function ({
                    handleAssetChange: e,
                    asset: t,
                    tokenList: n,
                    isTokenDisabled: h,
                    network: k,
                    isTokenListLoading: b = !1,
                    assetItemProps: x = {},
                  }) {
                    const C = (0, p.useI18nContext)(),
                      v = (0, f.useMultichainSelector)(m.getMultichainCurrentNetwork),
                      T = k ?? v,
                      E = T.chainId === v.chainId,
                      w = (0, f.useMultichainSelector)(m.getMultichainCurrentChainId),
                      _ = (0, f.useMultichainSelector)(m.getMultichainNativeCurrency),
                      M = (0, f.useMultichainSelector)(m.getMultichainSelectedAccountCachedBalance),
                      I = (0, r.useSelector)(m.getMultichainCurrentCurrency),
                      [S] = (0, i.useCurrencyDisplay)(M, { currency: I, hideLabel: !0 }),
                      [A] = (0, i.useCurrencyDisplay)(M, { currency: _ });
                    return o.default.createElement(
                      l.Box,
                      { className: 'tokens-main-view-modal' },
                      b &&
                        o.default.createElement(d.default, {
                          loadingMessage: C('loadingTokenList'),
                          showLoadingSpinner: !0,
                        }),
                      n.map(n => {
                        var r, i;
                        const d =
                            null === (r = n.address) || void 0 === r ? void 0 : r.toLowerCase(),
                          p = n.chainId === (null == T ? void 0 : T.chainId),
                          f =
                            (n.type === s.AssetType.native &&
                              n.symbol === (null == t ? void 0 : t.symbol)) ||
                            d ===
                              (null == t || null === (i = t.address) || void 0 === i
                                ? void 0
                                : i.toLowerCase()),
                          k = p && f,
                          b = (null == h ? void 0 : h(n)) ?? !1;
                        return o.default.createElement(
                          l.Box,
                          {
                            padding: 0,
                            gap: 0,
                            margin: 0,
                            key: `${n.symbol}-${d ?? ''}-${n.chainId}`,
                            backgroundColor: k
                              ? c.BackgroundColor.primaryMuted
                              : c.BackgroundColor.transparent,
                            className: (0, a.default)('multichain-asset-picker-list-item', {
                              'multichain-asset-picker-list-item--selected': k,
                              'multichain-asset-picker-list-item--disabled': b,
                            }),
                            'data-testid': 'asset-list-item',
                            onClick: () => {
                              b || e(n);
                            },
                          },
                          k
                            ? o.default.createElement(l.Box, {
                                className: 'multichain-asset-picker-list-item__selected-indicator',
                                borderRadius: c.BorderRadius.pill,
                                backgroundColor: c.BackgroundColor.primaryDefault,
                              })
                            : null,
                          o.default.createElement(
                            l.Box,
                            {
                              key: n.address,
                              padding: 0,
                              display: c.Display.Block,
                              flexWrap: c.FlexWrap.NoWrap,
                              alignItems: c.AlignItems.center,
                            },
                            o.default.createElement(
                              l.Box,
                              null,
                              n.type === s.AssetType.native && n.chainId === w && E
                                ? o.default.createElement(
                                    u.TokenListItem,
                                    y(
                                      {
                                        chainId: n.chainId,
                                        title: n.symbol,
                                        primary: S,
                                        tokenSymbol: n.symbol,
                                        secondary: A,
                                        tokenImage: n.image,
                                        isPrimaryTokenSymbolHidden: !0,
                                        tokenChainImage: (0, m.getImageForChainId)(n.chainId),
                                      },
                                      x
                                    )
                                  )
                                : o.default.createElement(
                                    g.default,
                                    y({}, n, {
                                      tooltipText: b ? 'swapTokenNotAvailable' : undefined,
                                      assetItemProps: x,
                                    })
                                  )
                            )
                          )
                        );
                      })
                    );
                  });
                var o = h(e('react')),
                  a = h(e('classnames')),
                  r = e('react-redux'),
                  i = e('../../../../hooks/useCurrencyDisplay'),
                  s = e('../../../../../shared/constants/transaction'),
                  l = e('../../../component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../..'),
                  d = h(e('../../../ui/loading-screen')),
                  p = e('../../../../hooks/useI18nContext'),
                  m = e('../../../../selectors/multichain'),
                  f = e('../../../../hooks/useMultichainSelector'),
                  g = h(e('./Asset'));
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y() {
                  return (
                    (y = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    y.apply(null, arguments)
                  );
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/AssetList.tsx',
      },
    ],
    [
      6507,
      {
        '../../../../../shared/constants/bridge': 5790,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/confirm-tx.util': 6899,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useMultichainBalances': 6992,
        '../../../../selectors/multichain': 7605,
        '../../../component-library': 6402,
        '../../network-list-item': 6589,
        '@metamask/snaps-sdk/jsx': 2862,
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
                  (n.AssetPickerModalNetwork = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/snaps-sdk/jsx'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = e('../../network-list-item'),
                  u = e('../../../../../shared/modules/selectors/networks'),
                  d = e('../../../../ducks/metamask/metamask'),
                  p = e('../../../../helpers/utils/confirm-tx.util'),
                  m = e('../../../../hooks/useMultichainBalances'),
                  f = e('../../../../../shared/constants/bridge'),
                  g = e('../../../../selectors/multichain');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.AssetPickerModalNetwork = ({
                  isOpen: e,
                  onClose: t,
                  onBack: n,
                  network: h,
                  networks: y,
                  onNetworkChange: k,
                  shouldDisableNetwork: b,
                  header: x,
                  isMultiselectEnabled: C,
                  onMultiselectSubmit: v,
                  selectedChainIds: T,
                }) => {
                  const E = (0, l.useI18nContext)(),
                    { balanceByChainId: w } = (0, m.useMultichainBalances)(),
                    _ = (0, a.useSelector)(u.getNetworkConfigurationsByChainId),
                    M = (0, a.useSelector)(d.getCurrentCurrency),
                    I = (0, o.useMemo)(
                      () =>
                        (y ?? Object.values(_) ?? []).sort((e, t) => w[t.chainId] - w[e.chainId]),
                      []
                    ),
                    [S, A] = (0, o.useState)(
                      (null == I
                        ? void 0
                        : I.reduce(
                            (e, { chainId: t }) => ({ ...e, [t]: !!T && T.includes(t) }),
                            {}
                          )) ?? {}
                    );
                  (0, o.useEffect)(() => {
                    I &&
                      A(I.reduce((e, { chainId: t }) => ({ ...e, [t]: !!T && T.includes(t) }), {}));
                  }, [I, T]);
                  const N = () => {
                    var e;
                    A(
                      null === (e = Object.keys(S)) || void 0 === e
                        ? void 0
                        : e.reduce((e, t) => ({ ...e, [t]: !Object.values(S).every(e => e) }), {})
                    );
                  };
                  return o.default.createElement(
                    s.Modal,
                    { isOpen: e, onClose: t, className: 'multichain-asset-picker__network-modal' },
                    o.default.createElement(s.ModalOverlay, null),
                    o.default.createElement(
                      s.ModalContent,
                      { modalDialogProps: { padding: 0 } },
                      o.default.createElement(
                        s.ModalHeader,
                        {
                          onBack: h ? n : undefined,
                          onClose: C ? undefined : t,
                          endAccessory:
                            C && T
                              ? o.default.createElement(
                                  s.ButtonLink,
                                  {
                                    variant: i.TextVariant.bodyMdMedium,
                                    disabled: Object.values(S).every(e => !e),
                                    onClick: () => {
                                      null == v || v(Object.keys(S).filter(e => S[e])), n();
                                    },
                                  },
                                  E('apply')
                                )
                              : undefined,
                        },
                        x ?? E('bridgeSelectNetwork')
                      ),
                      C &&
                        o.default.createElement(
                          s.Box,
                          { display: i.Display.Flex, padding: 4 },
                          o.default.createElement(s.Checkbox, {
                            isIndeterminate: Object.values(S).every(e => e),
                            iconProps: {
                              name: Object.values(S).some(e => !e)
                                ? r.IconName.MinusBold
                                : r.IconName.Add,
                              color: i.IconColor.primaryInverse,
                              backgroundColor: i.BackgroundColor.primaryDefault,
                            },
                            isChecked: !0,
                            onChange: () => {
                              N();
                            },
                          }),
                          o.default.createElement(
                            s.ButtonLink,
                            {
                              variant: i.TextVariant.bodyMdMedium,
                              onClick: () => {
                                N();
                              },
                              style: { alignSelf: i.AlignItems.flexStart, paddingInline: 16 },
                            },
                            E('selectAll')
                          )
                        ),
                      o.default.createElement(
                        s.Box,
                        {
                          className: 'multichain-asset-picker__network-list',
                          display: i.Display.Flex,
                        },
                        o.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                            width: i.BlockSize.Full,
                          },
                          I.map(e => {
                            var t;
                            const { name: a, chainId: r } = e;
                            return o.default.createElement(c.NetworkListItem, {
                              key: r,
                              name: f.NETWORK_TO_SHORT_NETWORK_NAME_MAP[r] ?? a,
                              selected: !C && (null == h ? void 0 : h.chainId) === r,
                              onClick: () => {
                                C
                                  ? (e => {
                                      A(t => ({ ...t, [e]: !t[e] }));
                                    })(r)
                                  : (k(e), n());
                              },
                              iconSrc: (0, g.getImageForChainId)(r),
                              iconSize: s.AvatarNetworkSize.Sm,
                              focus: !1,
                              disabled: null == b ? void 0 : b(e),
                              startAccessory: C
                                ? o.default.createElement(s.Checkbox, { isChecked: S[r], name: r })
                                : undefined,
                              showEndAccessory: C,
                              variant: i.TextVariant.bodyMdMedium,
                              endAccessory: C
                                ? o.default.createElement(
                                    s.Text,
                                    { variant: i.TextVariant.bodyMdMedium },
                                    (0, p.formatCurrency)(
                                      null === (t = w[r]) || void 0 === t ? void 0 : t.toString(),
                                      M
                                    )
                                  )
                                : undefined,
                            });
                          })
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
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal-network.tsx',
      },
    ],
    [
      6508,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../contexts/metametrics': 6836,
        '../../../../ducks/send': 6865,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../helpers/utils/nfts': 6910,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useNfts': 6997,
        '../../../../selectors': 7601,
        '../../../app/assets/nfts/nft-grid/nft-grid': 5944,
        '../../../app/assets/nfts/nfts-detection-notice-nfts-tab/nfts-detection-notice-nfts-tab': 5947,
        '../../../component-library': 6402,
        '../../../ui/spinner': 6802,
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
                  (n.AssetPickerModalNftTab = function ({
                    searchQuery: e,
                    onClose: t,
                    renderSearch: n,
                  }) {
                    const C = (0, l.useI18nContext)(),
                      v = (0, a.useDispatch)(),
                      T = (0, r.useHistory)(),
                      E = (0, a.useSelector)(d.getUseNftDetection),
                      w = (0, a.useSelector)(d.getIsMainnet),
                      _ = (0, a.useSelector)(d.getNftIsStillFetchingIndication),
                      { currentlyOwnedNfts: M } = (0, f.useNfts)({
                        overridePopularNetworkFilter: !0,
                      }),
                      I = (0, o.useContext)(h.MetaMetricsContext),
                      S = (0, a.useSelector)(b.getSendAnalyticProperties),
                      A = M.reduce((t, n) => {
                        var o;
                        return (
                          (null === (o = n.name) || void 0 === o
                            ? void 0
                            : o.toLowerCase().includes(e.toLowerCase())) && t.push(n),
                          t
                        );
                      }, []),
                      N = A.length > 0;
                    if (!N && _)
                      return o.default.createElement(
                        i.Box,
                        { className: 'modal-tab__loading', 'data-testid': 'spinner' },
                        o.default.createElement(u.default, {
                          color: 'var(--color-warning-default)',
                          className: 'loading-overlay__spinner',
                        })
                      );
                    return o.default.createElement(
                      i.Box,
                      { className: 'modal-tab__main-view' },
                      n(),
                      N
                        ? o.default.createElement(
                            o.default.Fragment,
                            null,
                            o.default.createElement(
                              i.Box,
                              null,
                              o.default.createElement(m.default, {
                                nfts: A,
                                handleNftClick: async e => {
                                  I(
                                    {
                                      event: y.MetaMetricsEventName.sendAssetSelected,
                                      category: y.MetaMetricsEventCategory.Send,
                                      properties: {
                                        is_destination_asset_picker_modal: !1,
                                        is_nft: !0,
                                      },
                                      sensitiveProperties: {
                                        ...S,
                                        new_asset_symbol: e.name,
                                        new_asset_address: e.address,
                                      },
                                    },
                                    { excludeMetaMetricsId: !1 }
                                  );
                                  const n = { ...e, image: (0, x.getNftImage)(e.image) };
                                  await v(
                                    (0, b.updateSendAsset)({
                                      type: k.AssetType.NFT,
                                      details: n,
                                      skipComputeEstimatedGasLimit: !1,
                                    })
                                  ),
                                    T.push(g.SEND_ROUTE),
                                    t && t();
                                },
                              })
                            ),
                            _ &&
                              o.default.createElement(
                                i.Box,
                                { className: 'modal-tab__fetching' },
                                o.default.createElement(u.default, {
                                  color: 'var(--color-warning-default)',
                                  className: 'loading-overlay__spinner',
                                })
                              )
                          )
                        : o.default.createElement(
                            o.default.Fragment,
                            null,
                            w &&
                              !E &&
                              o.default.createElement(
                                i.Box,
                                { paddingTop: 4, paddingInlineStart: 4, paddingInlineEnd: 4 },
                                o.default.createElement(p.default, null)
                              ),
                            o.default.createElement(
                              i.Box,
                              {
                                padding: 12,
                                display: s.Display.Flex,
                                flexDirection: s.FlexDirection.Column,
                                alignItems: s.AlignItems.center,
                                justifyContent: s.JustifyContent.center,
                              },
                              o.default.createElement(
                                i.Box,
                                {
                                  marginTop: 12,
                                  marginBottom: 12,
                                  display: s.Display.Flex,
                                  justifyContent: s.JustifyContent.center,
                                  alignItems: s.AlignItems.center,
                                  flexDirection: s.FlexDirection.Column,
                                  className: 'nfts-tab__link',
                                },
                                o.default.createElement(
                                  i.Text,
                                  {
                                    color: s.TextColor.textAlternative,
                                    variant: s.TextVariant.bodyMdMedium,
                                    textAlign: s.TextAlign.Center,
                                  },
                                  C('noNFTs')
                                ),
                                o.default.createElement(
                                  i.ButtonLink,
                                  {
                                    size: i.ButtonLinkSize.Sm,
                                    href: c.default.NFT_TOKENS,
                                    externalLink: !0,
                                  },
                                  C('learnMoreUpperCase')
                                )
                              )
                            )
                          )
                    );
                  });
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = C(e('../../../../helpers/constants/zendesk-url')),
                  u = C(e('../../../ui/spinner')),
                  d = e('../../../../selectors'),
                  p = C(
                    e(
                      '../../../app/assets/nfts/nfts-detection-notice-nfts-tab/nfts-detection-notice-nfts-tab'
                    )
                  ),
                  m = C(e('../../../app/assets/nfts/nft-grid/nft-grid')),
                  f = e('../../../../hooks/useNfts'),
                  g = e('../../../../helpers/constants/routes'),
                  h = e('../../../../contexts/metametrics'),
                  y = e('../../../../../shared/constants/metametrics'),
                  k = e('../../../../../shared/constants/transaction'),
                  b = e('../../../../ducks/send'),
                  x = e('../../../../helpers/utils/nfts');
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (v = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal-nft-tab.tsx',
      },
    ],
    [
      6509,
      {
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Search = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext');
                function l() {
                  return (
                    (l = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                n.Search = ({
                  searchQuery: e,
                  onChange: t,
                  isNFTSearch: n = !1,
                  props: o,
                  placeholder: c,
                  autoFocus: u = !0,
                }) => {
                  const d = (0, s.useI18nContext)();
                  return a.default.createElement(
                    r.Box,
                    l({ padding: 4 }, o),
                    a.default.createElement(r.TextFieldSearch, {
                      borderRadius: i.BorderRadius.LG,
                      placeholder: c ?? d(n ? 'searchNfts' : 'searchTokensByNameOrAddress'),
                      value: e,
                      onChange: e => t(e.target.value),
                      error: !1,
                      autoFocus: u,
                      autoComplete: !1,
                      width: i.BlockSize.Full,
                      clearButtonOnClick: () => t(''),
                      clearButtonProps: { size: r.ButtonIconSize.Sm },
                      style: { paddingInline: 8 },
                      showClearButton: !0,
                      className: 'asset-picker-modal__search-list',
                      inputProps: {
                        'data-testid': 'asset-picker-modal-search-input',
                        marginRight: 0,
                      },
                      endAccessory: null,
                      size: r.TextFieldSearchSize.Lg,
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal-search.tsx',
      },
    ],
    [
      6510,
      { '../../../../hooks/useI18nContext': 6985, '../../../ui/tabs': 6806, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.TabName = n.AssetPickerModalTabs = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../hooks/useI18nContext'),
                  i = e('../../../ui/tabs');
                let s = (n.TabName = (function (e) {
                  return (e.TOKENS = 'tokens'), (e.NFTS = 'nfts'), e;
                })({}));
                n.AssetPickerModalTabs = ({
                  defaultActiveTabKey: e = s.TOKENS,
                  children: t,
                  visibleTabs: n = [s.TOKENS, s.NFTS],
                }) => {
                  const o = (0, r.useI18nContext)();
                  return n.length > 1
                    ? a.default.createElement(
                        i.Tabs,
                        {
                          defaultActiveTabKey: e,
                          tabsClassName: 'modal-tab__tabs',
                          onTabClick: () => null,
                        },
                        n.map(e =>
                          a.default.createElement(
                            i.Tab,
                            {
                              key: e,
                              activeClassName: 'modal-tab__tab--active',
                              className: 'modal-tab__tab',
                              name: o(e),
                              tabKey: e,
                            },
                            t.find(({ key: t }) => t === e)
                          )
                        )
                      )
                    : a.default.createElement(
                        a.default.Fragment,
                        null,
                        n.map(e => t.find(({ key: t }) => t === e))
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal-tabs.tsx',
      },
    ],
    [
      6511,
      {
        '../../../../../shared/constants/bridge': 5790,
        '../../../../../shared/constants/multichain/networks': 5803,
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../../shared/modules/Numeric': 5853,
        '../../../../../shared/modules/string-utils': 5878,
        '../../../../ducks/send': 6865,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useAsync': 6969,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useMultichainBalances': 6992,
        '../../../../hooks/useMultichainSelector': 6993,
        '../../../../hooks/useTokensToSearch': 7018,
        '../../../../pages/swaps/swaps.util': 7583,
        '../../../../selectors': 7601,
        '../../../../selectors/multichain': 7605,
        '../../../component-library': 6402,
        '../../avatar-group/avatar-group.types': 6524,
        '../../toast': 6687,
        './AssetList': 6506,
        './asset-picker-modal-nft-tab': 6508,
        './asset-picker-modal-search': 6509,
        './asset-picker-modal-tabs': 6510,
        './hooks/useAssetMetadata': 6512,
        './solana-account-creation-prompt': 6513,
        '@metamask/utils': 2995,
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
                  (n.AssetPickerModal = function ({
                    header: e,
                    isOpen: t,
                    onClose: n,
                    onBack: o,
                    asset: B,
                    onAssetChange: j,
                    sendingAsset: F,
                    network: L,
                    networks: R,
                    action: $,
                    onNetworkPickerClick: W,
                    customTokenListGenerator: z,
                    isTokenListLoading: U = !1,
                    isMultiselectEnabled: V,
                    selectedChainIds: H,
                    autoFocus: G,
                    ...K
                  }) {
                    const J = (0, d.useI18nContext)(),
                      [q, X] = (0, a.useState)(!1),
                      Y = (0, a.useRef)(!1),
                      [Z, Q] = (0, a.useState)(''),
                      [ee, te] = (0, a.useState)(Z),
                      ne = (0, l.debounce)(te, 200);
                    (0, a.useEffect)(() => {
                      ne(Z);
                    }, [Z, ne]);
                    const oe = (0, a.useRef)(null),
                      ae = (0, r.useSelector)(h.getSwapsBlockedTokens),
                      re = (0, a.useMemo)(() => new Set(ae), [ae]),
                      ie = (0, a.useCallback)(j, [j]),
                      se = (0, r.useSelector)(w.getMultichainCurrentChainId),
                      le = (0, r.useSelector)(w.getMultichainNetworkConfigurationsByChainId),
                      ce = L ?? (se && le[se]),
                      ue = R ?? Object.values(le ?? {}),
                      de = ce.chainId === se,
                      pe = (0, E.useMultichainSelector)(w.getMultichainIsEvm);
                    (0, a.useEffect)(() => {
                      Q('');
                    }, [null == ce ? void 0 : ce.chainId]);
                    const me = (0, E.useMultichainSelector)(w.getMultichainCurrencyImage),
                      fe = (0, E.useMultichainSelector)(w.getMultichainNativeCurrency),
                      ge = (0, E.useMultichainSelector)(
                        w.getMultichainSelectedAccountCachedBalance
                      ),
                      he = (0, E.useMultichainSelector)(f.getTokenExchangeRates),
                      ye = (0, E.useMultichainSelector)(w.getMultichainConversionRate),
                      ke = (0, r.useSelector)(w.getMultichainCurrentCurrency);
                    let be = !1,
                      xe = !1;
                    (xe = (0, r.useSelector)(f.hasCreatedSolanaAccount)),
                      (be = !xe && ce.chainId === _.MultichainNetworks.SOLANA),
                      (0, a.useEffect)(() => {
                        !0 === Y.current && !be && xe && !1 === q && X(!0), (Y.current = be);
                      }, [be, xe, q]);
                    const { address: Ce } = (0, r.useSelector)(f.getSelectedEvmInternalAccount),
                      ve = (0, r.useSelector)(f.getAllTokens),
                      Te = (0, a.useMemo)(() => {
                        var e;
                        return (
                          ((0, i.isCaipChainId)(se)
                            ? []
                            : null == ve || null === (e = ve[se]) || void 0 === e
                              ? void 0
                              : e[Ce]) ?? []
                        );
                      }, [ve, se, Ce]),
                      { assetsWithBalance: Ee } = (0, b.useMultichainBalances)(),
                      we = (0, r.useSelector)(f.getTokenList),
                      _e = (0, r.useSelector)(f.getUseExternalServices),
                      { value: Me } = (0, v.useAsyncResult)(
                        async () =>
                          _e && null != ce && ce.chainId
                            ? await (0, T.fetchTopAssetsList)(ce.chainId)
                            : undefined,
                        [null == ce ? void 0 : ce.chainId, _e]
                      ),
                      Ie = (0, a.useCallback)(
                        ({ address: e, symbol: t }) =>
                          !(null == F || !F.symbol) &&
                          !(0, y.isEqualCaseInsensitive)(F.symbol, t) &&
                          re.has(e || ''),
                        [null == F ? void 0 : F.symbol, re]
                      ),
                      Se = (0, a.useCallback)(
                        function* (e) {
                          const t = [];
                          for (const t of Ee)
                            e(t.symbol, t.address, t.chainId) &&
                              (yield t.isNative
                                ? {
                                    ...t,
                                    image: k.CHAIN_ID_TOKEN_IMAGE_MAP[t.chainId],
                                    type: m.AssetType.native,
                                  }
                                : {
                                    ...t,
                                    balance: M.Numeric.from(t.balance ?? '0', 10)
                                      .shiftedBy(-1 * t.decimals)
                                      .toPrefixedHexString(),
                                  });
                          const n = {
                            address: '',
                            symbol: fe,
                            decimals: 18,
                            image: me,
                            balance: ge,
                            string: undefined,
                            chainId: ce.chainId,
                            type: m.AssetType.native,
                          };
                          pe && e(n.symbol, n.address, n.chainId) && (yield n);
                          for (const t of Te)
                            e(t.symbol, t.address, se) && (yield { ...t, chainId: se });
                          if ((null == ce ? void 0 : ce.chainId) !== _.MultichainNetworks.SOLANA) {
                            for (const n of Me ?? []) {
                              const o = null == we ? void 0 : we[n.address];
                              if (o && e(o.symbol, o.address, se)) {
                                if (Ie(o)) {
                                  t.push(o);
                                  continue;
                                }
                                yield { ...o, chainId: se };
                              }
                            }
                            for (const t of Object.values(we))
                              e(t.symbol, t.address, se) && (yield { ...t, chainId: se });
                            for (const e of t) yield { ...e, chainId: se };
                          }
                        },
                        [fe, me, ge, se, pe, null == ce ? void 0 : ce.chainId, Ee, Te, Me, we, Ie]
                      ),
                      Ae = (0, a.useMemo)(() => {
                        const e = [],
                          t = new Set(),
                          n = (e, t) =>
                            `${(null == e ? void 0 : e.toLowerCase()) ?? (0, s.zeroAddress)()}:${t ?? se}`,
                          o = (z ?? Se)((e, o, a) => {
                            const r = ee.trim().toLowerCase(),
                              i = Boolean(
                                !r ||
                                  (null == e ? void 0 : e.toLowerCase().includes(r)) ||
                                  (null == o ? void 0 : o.toLowerCase().includes(r))
                              ),
                              s = V
                                ? a && (null == H ? void 0 : H.includes(a))
                                : (null == ce ? void 0 : ce.chainId) === a;
                            return Boolean(s && i && !t.has(n(o, a)));
                          });
                        for (const a of o) {
                          if ('send' === $ && a.balance === undefined) continue;
                          t.add(n(a.address, a.chainId));
                          const o =
                            !z && (0, i.isStrictHexString)(a.address)
                              ? (0, g.getRenderableTokenData)(
                                  a.address
                                    ? {
                                        ...a,
                                        ...we[a.address.toLowerCase()],
                                        type: m.AssetType.token,
                                      }
                                    : a,
                                  he,
                                  ye,
                                  ke,
                                  a.chainId,
                                  we
                                )
                              : a;
                          if (
                            ((null == B ? void 0 : B.address) === o.address &&
                            (null == ce ? void 0 : ce.chainId) === o.chainId
                              ? e.unshift(o)
                              : e.push(o),
                            e.length > D)
                          )
                            break;
                        }
                        return e;
                      }, [
                        se,
                        ee,
                        V,
                        H,
                        null == ce ? void 0 : ce.chainId,
                        z,
                        Se,
                        $,
                        we,
                        he,
                        ye,
                        ke,
                        B,
                      ]),
                      Ne = (0, I.useAssetMetadata)(
                        Z,
                        0 === Ae.length,
                        oe,
                        null == ce ? void 0 : ce.chainId
                      ),
                      Oe = (0, a.useMemo)(() => (Ne ? [Ne] : Ae), [Ne, Ae]);
                    return a.default.createElement(
                      c.Modal,
                      {
                        className: 'asset-picker-modal',
                        isOpen: t,
                        onClose: n,
                        'data-testid': 'asset-picker-modal',
                      },
                      a.default.createElement(c.ModalOverlay, null),
                      a.default.createElement(
                        c.ModalContent,
                        { modalDialogProps: { padding: 0 } },
                        a.default.createElement(
                          c.ModalHeader,
                          { onClose: n, onBack: B ? undefined : o },
                          a.default.createElement(
                            c.Text,
                            { variant: u.TextVariant.headingSm, textAlign: u.TextAlign.Center },
                            e
                          )
                        ),
                        q &&
                          a.default.createElement(
                            'div',
                            {
                              style: {
                                position: 'absolute',
                                bottom: 15,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 1e3,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '16px',
                              },
                            },
                            a.default.createElement(
                              p.ToastContainer,
                              null,
                              a.default.createElement(p.Toast, {
                                text: J('bridgeSolanaAccountCreated'),
                                onClose: () => X(!1),
                                startAdornment: a.default.createElement('img', {
                                  src: '/images/solana-logo.svg',
                                  alt: 'Solana Logo',
                                  style: { width: '24px', height: '24px', borderRadius: '4px' },
                                }),
                                autoHideTime: 5e3,
                                onAutoHideToast: () => X(!1),
                              })
                            )
                          ),
                        (null == F ? void 0 : F.image) &&
                          (null == F ? void 0 : F.symbol) &&
                          a.default.createElement(
                            c.Box,
                            {
                              display: u.Display.Flex,
                              gap: 1,
                              alignItems: u.AlignItems.center,
                              marginInline: 'auto',
                            },
                            a.default.createElement(c.AvatarToken, {
                              borderRadius: u.BorderRadius.full,
                              src: F.image,
                              size: c.AvatarTokenSize.Xs,
                            }),
                            a.default.createElement(
                              c.Text,
                              { variant: u.TextVariant.bodySm },
                              J('sendingAsset', [F.symbol])
                            )
                          ),
                        W &&
                          a.default.createElement(
                            c.Box,
                            { className: 'network-picker' },
                            a.default.createElement(c.PickerNetwork, {
                              label: (() => {
                                if (!V)
                                  return (
                                    ((null == ce ? void 0 : ce.chainId) &&
                                      k.NETWORK_TO_NAME_MAP[ce.chainId]) ??
                                    (null == ce ? void 0 : ce.name) ??
                                    J('bridgeSelectNetwork')
                                  );
                                switch (null == H ? void 0 : H.length) {
                                  case ue.length:
                                    return J('allNetworks');
                                  case 1:
                                    return J('singleNetwork');
                                  case 0:
                                    return J('bridgeSelectNetwork');
                                  default:
                                    return J('someNetworks', [null == H ? void 0 : H.length]);
                                }
                              })(),
                              src:
                                null != ce && ce.chainId
                                  ? (0, w.getImageForChainId)(ce.chainId)
                                  : undefined,
                              avatarGroupProps:
                                V && H
                                  ? {
                                      limit: 2,
                                      members: H.map(e => ({
                                        avatarValue: (0, w.getImageForChainId)(e) ?? '',
                                        symbol: C.NETWORK_TO_SHORT_NETWORK_NAME_MAP[e],
                                      })),
                                      avatarType: x.AvatarType.NETWORK,
                                    }
                                  : undefined,
                              onClick: W,
                              'data-testid': 'multichain-asset-picker__network',
                            })
                          ),
                        a.default.createElement(
                          c.Box,
                          { className: 'modal-tab__wrapper' },
                          be
                            ? a.default.createElement(P.SolanaAccountCreationPrompt, null)
                            : a.default.createElement(
                                S.AssetPickerModalTabs,
                                K,
                                a.default.createElement(
                                  a.default.Fragment,
                                  { key: S.TabName.TOKENS },
                                  a.default.createElement(O.Search, {
                                    searchQuery: Z,
                                    onChange: e => {
                                      var t;
                                      null === (t = oe.current) || void 0 === t || t.abort(), Q(e);
                                    },
                                    autoFocus: G,
                                  }),
                                  a.default.createElement(N.default, {
                                    network: L,
                                    handleAssetChange: ie,
                                    asset:
                                      (null == B ? void 0 : B.type) === m.AssetType.NFT
                                        ? undefined
                                        : B,
                                    tokenList: Oe,
                                    isTokenDisabled: Ie,
                                    isTokenListLoading: U,
                                    assetItemProps: { isTitleNetworkName: V, isTitleHidden: !de },
                                  })
                                ),
                                a.default.createElement(A.AssetPickerModalNftTab, {
                                  key: S.TabName.NFTS,
                                  searchQuery: Z,
                                  onClose: n,
                                  renderSearch: () =>
                                    a.default.createElement(O.Search, {
                                      isNFTSearch: !0,
                                      searchQuery: Z,
                                      onChange: e => Q(e),
                                    }),
                                })
                              )
                        )
                      )
                    );
                  });
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = B(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  i = e('@metamask/utils'),
                  s = e('ethereumjs-util'),
                  l = e('lodash'),
                  c = e('../../../component-library'),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../../hooks/useI18nContext'),
                  p = e('../../toast'),
                  m = e('../../../../../shared/constants/transaction'),
                  f = e('../../../../selectors'),
                  g = e('../../../../hooks/useTokensToSearch'),
                  h = e('../../../../ducks/send'),
                  y = e('../../../../../shared/modules/string-utils'),
                  k = e('../../../../../shared/constants/network'),
                  b = e('../../../../hooks/useMultichainBalances'),
                  x = e('../../avatar-group/avatar-group.types'),
                  C = e('../../../../../shared/constants/bridge'),
                  v = e('../../../../hooks/useAsync'),
                  T = e('../../../../pages/swaps/swaps.util'),
                  E = e('../../../../hooks/useMultichainSelector'),
                  w = e('../../../../selectors/multichain'),
                  _ = e('../../../../../shared/constants/multichain/networks'),
                  M = e('../../../../../shared/modules/Numeric'),
                  I = e('./hooks/useAssetMetadata'),
                  S = e('./asset-picker-modal-tabs'),
                  A = e('./asset-picker-modal-nft-tab'),
                  N = (o = e('./AssetList')) && o.__esModule ? o : { default: o },
                  O = e('./asset-picker-modal-search'),
                  P = e('./solana-account-creation-prompt');
                function B(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (B = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const D = 30;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/asset-picker-modal.tsx',
      },
    ],
    [
      6512,
      {
        '../../../../../../shared/constants/transaction': 5819,
        '../../../../../../shared/lib/asset-utils': 5828,
        '../../../../../hooks/useAsync': 6969,
        '../../../../../selectors': 7601,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useAssetMetadata = void 0);
                var o = e('react-redux'),
                  a = e('../../../../../selectors'),
                  r = e('../../../../../../shared/lib/asset-utils'),
                  i = e('../../../../../../shared/constants/transaction'),
                  s = e('../../../../../hooks/useAsync');
                n.useAssetMetadata = (e, t, n, l) => {
                  const c = (0, o.useSelector)(a.getUseExternalServices),
                    { value: u } = (0, s.useAsyncResult)(async () => {
                      if (!l || !e) return undefined;
                      const o = e.trim();
                      if (c && t && o.length > 30) {
                        n.current = new AbortController();
                        const e = await (0, r.fetchAssetMetadata)(o, l, n.current.signal);
                        return e
                          ? {
                              ...e,
                              chainId: l,
                              isNative: !1,
                              type: i.AssetType.token,
                              image: (0, r.getAssetImageUrl)(e.assetId, l) ?? '',
                              balance: '',
                              string: '',
                            }
                          : undefined;
                      }
                      return undefined;
                    }, [t, e]);
                  return u;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/hooks/useAssetMetadata.ts',
      },
    ],
    [
      6513,
      {
        '../../../../../shared/constants/multichain/networks': 5803,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/accounts/useMultichainWalletSnapClient': 6925,
        '../../../../hooks/useI18nContext': 6985,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SolanaAccountCreationPrompt = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext'),
                  l = e('../../../../../shared/constants/multichain/networks'),
                  c = e('../../../../selectors'),
                  u = e('../../../../hooks/accounts/useMultichainWalletSnapClient');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SolanaAccountCreationPrompt = () => {
                  var e;
                  const t = (0, s.useI18nContext)(),
                    n = (0, u.useMultichainWalletSnapClient)(u.WalletClientType.Solana),
                    [d] = (0, a.useSelector)(c.getMetaMaskKeyrings),
                    [p, m] = o.default.useState(!1),
                    f = (0, o.useCallback)(async () => {
                      try {
                        var e;
                        m(!0),
                          await n.createAccount(
                            {
                              scope: l.MultichainNetworks.SOLANA,
                              entropySource:
                                null == d || null === (e = d.metadata) || void 0 === e
                                  ? void 0
                                  : e.id,
                            },
                            {
                              displayConfirmation: !1,
                              displayAccountNameSuggestion: !1,
                              setSelectedAccount: !1,
                            }
                          );
                      } catch (e) {
                        console.error('Error creating Solana account:', e);
                      } finally {
                        m(!1);
                      }
                    }, [n, null == d || null === (e = d.metadata) || void 0 === e ? void 0 : e.id]);
                  return o.default.createElement(
                    r.Box,
                    {
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Column,
                      alignItems: i.AlignItems.center,
                      justifyContent: i.JustifyContent.flexStart,
                      gap: 1,
                      padding: 4,
                      'data-testid': 'solana-account-creation-prompt',
                      style: { height: '100%', minHeight: '400px', paddingTop: '72px' },
                    },
                    o.default.createElement('img', {
                      src: '/images/solana-logo.svg',
                      alt: 'Solana Logo',
                      style: {
                        width: '30px',
                        height: '30px',
                        marginBottom: '4px',
                        borderRadius: '4px',
                      },
                    }),
                    o.default.createElement(
                      r.Text,
                      {
                        variant: i.TextVariant.headingSm,
                        textAlign: i.TextAlign.Center,
                        color: i.TextColor.textDefault,
                      },
                      t('bridgeCreateSolanaAccountTitle')
                    ),
                    o.default.createElement(
                      r.Text,
                      {
                        variant: i.TextVariant.bodySm,
                        textAlign: i.TextAlign.Center,
                        color: i.TextColor.textAlternative,
                      },
                      t('bridgeCreateSolanaAccountDescription')
                    ),
                    o.default.createElement(
                      r.Button,
                      {
                        block: !0,
                        size: r.ButtonSize.Md,
                        variant: r.ButtonVariant.Secondary,
                        onClick: f,
                        loading: p,
                        'data-testid': 'create-solana-account-button',
                        style: { width: '75%', marginTop: '10px' },
                      },
                      t('bridgeCreateSolanaAccount')
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker-modal/solana-account-creation-prompt.tsx',
      },
    ],
    [
      6514,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/nfts': 6910,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useMultichainBalances': 6992,
        '../../../../hooks/useMultichainSelector': 6993,
        '../../../../pages/confirmations/send/send.utils': 7362,
        '../../../../selectors/multichain': 7605,
        '../../../component-library': 6402,
        '../../../ui/tooltip': 6818,
        '../asset-picker-modal/asset-picker-modal': 6511,
        '../asset-picker-modal/asset-picker-modal-network': 6507,
        '../asset-picker-modal/asset-picker-modal-tabs': 6510,
        '../constants': 6516,
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
                  (n.AssetPicker = function ({
                    children: e,
                    header: t,
                    asset: n,
                    onAssetChange: o,
                    networkProps: C,
                    sendingAsset: E,
                    action: w,
                    onClick: _,
                    isDisabled: M = !1,
                    visibleTabs: I,
                    customTokenListGenerator: S,
                    isTokenListLoading: A = !1,
                    isMultiselectEnabled: N = !1,
                    autoFocus: O = !0,
                  }) {
                    var P, B;
                    const D = (0, p.useI18nContext)(),
                      [j, F] = (0, a.useState)(!1),
                      L = (null == n ? void 0 : n.type) === l.AssetType.NFT,
                      R = null == n ? void 0 : n.image,
                      $ = null == n ? void 0 : n.symbol,
                      W = $ && $.length > d.LARGE_SYMBOL_LENGTH,
                      z = W && !L ? `${$.substring(0, d.LARGE_SYMBOL_LENGTH - 1)}...` : $,
                      U = (0, b.useMultichainSelector)(k.getMultichainCurrentChainId),
                      V = (0, r.useSelector)(k.getMultichainNetworkConfigurationsByChainId),
                      H = V[U],
                      G = (0, b.useMultichainSelector)(k.getMultichainCurrentNetwork),
                      K = (null == C ? void 0 : C.network) ?? H,
                      J = (null == C ? void 0 : C.networks) ?? Object.values(V),
                      { balanceByChainId: q } = (0, y.useMultichainBalances)(),
                      [X, Y] = (0, a.useState)(
                        N
                          ? ((null == J
                              ? void 0
                              : J.map(({ chainId: e }) => e).sort((e, t) => q[t] - q[e])) ?? [])
                          : []
                      ),
                      [Z, Q] = (0, a.useState)(!1);
                    (0, a.useEffect)(() => {
                      var e;
                      const t =
                        null == C || null === (e = C.network) || void 0 === e ? void 0 : e.chainId;
                      t && !X.includes(t) && Y(e => [...e, t]);
                    }, [
                      null == C || null === (P = C.network) || void 0 === P ? void 0 : P.chainId,
                    ]);
                    const ee =
                        null != K && K.chainId ? (0, k.getImageForChainId)(K.chainId) : undefined,
                      te = () => {
                        C && !C.network ? Q(!0) : F(!0), null == _ || _();
                      };
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      C &&
                        a.default.createElement(
                          g.AssetPickerModalNetwork,
                          v(
                            {
                              isOpen: Z,
                              onClose: () => Q(!1),
                              onBack: () => {
                                Q(!1), F(!0);
                              },
                              isMultiselectEnabled: N,
                              onMultiselectSubmit: e => {
                                Y(e),
                                  1 === e.length &&
                                    e[0] !== (null == G ? void 0 : G.chainId) &&
                                    null != C &&
                                    C.onNetworkChange &&
                                    C.onNetworkChange(V[e[0]]);
                              },
                              selectedChainIds: X,
                            },
                            C
                          )
                        ),
                      a.default.createElement(c.AssetPickerModal, {
                        visibleTabs: I,
                        header: t,
                        action: w,
                        isOpen: j,
                        onClose: () => F(!1),
                        asset: n,
                        onAssetChange: e => {
                          if (N && null != C && C.onNetworkChange) {
                            const t = e.chainId ? V[e.chainId] : undefined;
                            t && C.onNetworkChange(t);
                          }
                          o(e), F(!1);
                        },
                        isMultiselectEnabled: N,
                        sendingAsset: E,
                        network: null == C ? void 0 : C.network,
                        networks: null == C ? void 0 : C.networks,
                        selectedChainIds: X,
                        onNetworkPickerClick:
                          null != C && C.networks
                            ? () => {
                                F(!1), Q(!0);
                              }
                            : undefined,
                        defaultActiveTabKey:
                          (null == n ? void 0 : n.type) === l.AssetType.NFT
                            ? f.TabName.NFTS
                            : f.TabName.TOKENS,
                        customTokenListGenerator: S,
                        isTokenListLoading: A,
                        autoFocus: O,
                      }),
                      (null == e ? void 0 : e(te, ee)) ||
                        a.default.createElement(
                          i.ButtonBase,
                          {
                            'data-testid': 'asset-picker-button',
                            className: 'asset-picker',
                            disabled: M,
                            display: s.Display.Flex,
                            alignItems: s.AlignItems.center,
                            gap: 2,
                            padding: 2,
                            paddingLeft: 2,
                            paddingRight: 2,
                            justifyContent: L ? s.JustifyContent.spaceBetween : undefined,
                            backgroundColor: s.BackgroundColor.transparent,
                            onClick: te,
                            endIconName: i.IconName.ArrowDown,
                            endIconProps: {
                              color: s.IconColor.iconDefault,
                              marginInlineStart: 0,
                              display: M ? s.Display.None : s.Display.InlineBlock,
                            },
                            title: M ? D('swapTokenNotAvailable') : undefined,
                          },
                          a.default.createElement(
                            i.Box,
                            { display: s.Display.Flex, alignItems: s.AlignItems.center, gap: 3 },
                            a.default.createElement(
                              i.Box,
                              { display: s.Display.Flex },
                              a.default.createElement(
                                i.BadgeWrapper,
                                {
                                  badge: a.default.createElement(i.AvatarNetwork, {
                                    size: i.AvatarNetworkSize.Xs,
                                    name: (null == K ? void 0 : K.name) ?? '',
                                    src: ee,
                                    backgroundColor:
                                      null ===
                                        (B = Object.entries({
                                          [h.GOERLI_DISPLAY_NAME]: s.BackgroundColor.goerli,
                                          [h.SEPOLIA_DISPLAY_NAME]: s.BackgroundColor.sepolia,
                                        }).find(([e]) => {
                                          var t;
                                          return null == K ||
                                            null === (t = K.nativeCurrency) ||
                                            void 0 === t
                                            ? void 0
                                            : t.includes(e);
                                        })) || void 0 === B
                                        ? void 0
                                        : B[1],
                                    borderColor: R
                                      ? s.BorderColor.borderMuted
                                      : s.BorderColor.borderDefault,
                                  }),
                                },
                                a.default.createElement(
                                  i.AvatarToken,
                                  v(
                                    {
                                      borderRadius: L ? s.BorderRadius.LG : s.BorderRadius.full,
                                      src: (0, x.getNftImage)(R) ?? undefined,
                                      size: i.AvatarTokenSize.Md,
                                      name: $,
                                    },
                                    L && { backgroundColor: s.BackgroundColor.transparent }
                                  )
                                )
                              )
                            ),
                            a.default.createElement(
                              u.default,
                              {
                                disabled: !W,
                                title: $,
                                position: 'bottom',
                                wrapperClassName: 'mm-box',
                              },
                              a.default.createElement(
                                i.Text,
                                {
                                  className: 'asset-picker__symbol',
                                  variant: s.TextVariant.bodyMd,
                                  color: s.TextColor.textDefault,
                                },
                                z
                              ),
                              L &&
                                (null == n ? void 0 : n.tokenId) &&
                                a.default.createElement(
                                  i.Text,
                                  {
                                    variant: s.TextVariant.bodySm,
                                    color: s.TextColor.textAlternative,
                                  },
                                  '#',
                                  String(n.tokenId).length < T
                                    ? n.tokenId
                                    : (0, m.ellipsify)(String(n.tokenId), 6, 4)
                                )
                            )
                          )
                        )
                    );
                  });
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = C(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../../shared/constants/transaction'),
                  c = e('../asset-picker-modal/asset-picker-modal'),
                  u = (o = e('../../../ui/tooltip')) && o.__esModule ? o : { default: o },
                  d = e('../constants'),
                  p = e('../../../../hooks/useI18nContext'),
                  m = e('../../../../pages/confirmations/send/send.utils'),
                  f = e('../asset-picker-modal/asset-picker-modal-tabs'),
                  g = e('../asset-picker-modal/asset-picker-modal-network'),
                  h = e('../../../../../shared/constants/network'),
                  y = e('../../../../hooks/useMultichainBalances'),
                  k = e('../../../../selectors/multichain'),
                  b = e('../../../../hooks/useMultichainSelector'),
                  x = e('../../../../helpers/utils/nfts');
                function C(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (C = function (e) {
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
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    v.apply(null, arguments)
                  );
                }
                const T = 13;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker/asset-picker.tsx',
      },
    ],
    [
      6515,
      { './asset-picker': 6514 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AssetPicker', {
                    enumerable: !0,
                    get: function () {
                      return o.AssetPicker;
                    },
                  });
                var o = e('./asset-picker');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/asset-picker/index.ts',
      },
    ],
    [
      6516,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.LARGE_SYMBOL_LENGTH = void 0);
                n.LARGE_SYMBOL_LENGTH = 7;
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/asset-picker-amount/constants.tsx' },
    ],
    [
      6517,
      { './asset-picker-amount': 6504 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AssetPickerAmount', {
                    enumerable: !0,
                    get: function () {
                      return o.AssetPickerAmount;
                    },
                  });
                var o = e('./asset-picker-amount');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/asset-picker-amount/index.ts' },
    ],
    [
      6518,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/send': 6865,
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
                  (n.default = function ({ asset: e }) {
                    const t = (0, c.useI18nContext)(),
                      n = (0, a.useSelector)(r.getSendMaxModeState),
                      m = (0, a.useDispatch)(),
                      f = (0, o.useContext)(i.MetaMetricsContext),
                      g = (0, a.useSelector)(r.getSendAnalyticProperties);
                    return e.type === d.AssetType.NFT ||
                      Number((0, p.hexToDecimal)(e.balance || '0x0')) <= 0
                      ? null
                      : o.default.createElement(
                          l.ButtonLink,
                          {
                            className: 'asset-picker-amount__max-clear',
                            onClick: () => {
                              f({
                                event: 'Clicked "Amount Max"',
                                category: s.MetaMetricsEventCategory.Transactions,
                                properties: { ...g, action: 'Edit Screen', legacy_event: !0 },
                              }),
                                m((0, r.toggleSendMaxMode)());
                            },
                            marginLeft: 'auto',
                            textProps: { variant: u.TextVariant.bodySm },
                            'data-testid': 'max-clear-button',
                          },
                          t(n ? 'clear' : 'max')
                        );
                  });
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../ducks/send'),
                  i = e('../../../contexts/metametrics'),
                  s = e('../../../../shared/constants/metametrics'),
                  l = e('../../component-library'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../helpers/constants/design-system'),
                  d = e('../../../../shared/constants/transaction'),
                  p = e('../../../../shared/modules/conversion.utils');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/max-clear-button.tsx',
      },
    ],
    [
      6519,
      {
        '../../../../../shared/modules/Numeric': 5853,
        '../../../ui/unit-input': 6824,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NFTInput = function ({ integerValue: e, onChange: t, className: n }) {
                    return o.default.createElement(a.default, {
                      isDisabled: !t,
                      isFocusOnInput: Boolean(t),
                      type: 'number',
                      step: 1,
                      min: 0,
                      dataTestId: 'nft-input',
                      onChange: e => {
                        if (!t) return;
                        const n = new r.Numeric(e, 10);
                        Number.isInteger(n.toNumber()) && t(n.toPrefixedHexString(), String(e));
                      },
                      value: e,
                      className: n,
                      keyPressRegex: s,
                    });
                  });
                var o = i(e('react')),
                  a = i(e('../../../ui/unit-input')),
                  r = e('../../../../../shared/modules/Numeric');
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const s = /^[0-9]*$/u;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/nft-input/nft-input.tsx',
      },
    ],
    [
      6520,
      {
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
                  (n.default = function ({ onClick: e }) {
                    const t = (0, s.useI18nContext)();
                    return a.default.createElement(i.ButtonIcon, {
                      backgroundColor: r.BackgroundColor.transparent,
                      iconName: i.IconName.SwapVertical,
                      size: i.ButtonIconSize.Sm,
                      color: r.IconColor.primaryDefault,
                      onClick: e,
                      ariaLabel: t('switchInputCurrency'),
                      className: 'asset-picker-amount__input__swap',
                    });
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library'),
                  s = e('../../../../hooks/useI18nContext');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/asset-picker-amount/swappable-currency-input/swap-icon.tsx',
      },
    ],
    [
      6521,
      {
        '../../../../../shared/constants/transaction': 5819,
        '../../../../ducks/app/app': 6845,
        '../../../../ducks/send': 6865,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../app/currency-input': 6016,
        '../../../app/currency-input/hooks/useTokenExchangeRate': 6015,
        '../../../component-library': 6402,
        '../nft-input/nft-input': 6519,
        '../utils': 6522,
        './swap-icon': 6520,
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
                  (n.SwappableCurrencyInput = function ({
                    assetType: e,
                    asset: t,
                    amount: { value: n },
                    isAmountLoading: h,
                    onAmountChange: y,
                  }) {
                    var k, b, x;
                    const C = (0, a.useDispatch)(),
                      v = (0, r.useI18nContext)(),
                      T = (0, a.useSelector)(p.getIsFiatPrimary),
                      E = (0, f.default)(
                        null == t || null === (k = t.details) || void 0 === k ? void 0 : k.address
                      ),
                      w = (0, a.useSelector)(i.getSendMaxModeState),
                      _ = o.default.createElement(d.default, {
                        className: 'asset-picker-amount__input',
                        isFiatPreferred: T && Boolean(null == E ? void 0 : E.toNumber()),
                        onChange: y,
                        hexValue: n,
                        swapIcon: e => o.default.createElement(g.default, { onClick: e }),
                        onPreferenceToggle: (0, o.useCallback)(
                          () => C((0, s.toggleCurrencySwitch)()),
                          [C]
                        ),
                        asset: null == t ? void 0 : t.details,
                        isSkeleton: h,
                        isMatchingUpstream: w,
                      }),
                      M = o.default.createElement(m.NFTInput, {
                        integerValue: parseInt(n, 16),
                        onChange: y,
                        className: 'asset-picker-amount__input-nft',
                      });
                    switch (e) {
                      case l.AssetType.token:
                      case l.AssetType.native:
                        return _;
                      case l.AssetType.NFT:
                        return (null === (b = t.details) || void 0 === b ? void 0 : b.standard) ===
                          l.TokenStandard.ERC721
                          ? null
                          : M;
                    }
                    return o.default.createElement(
                      c.Box,
                      { marginLeft: 'auto' },
                      o.default.createElement(
                        c.Text,
                        { variant: u.TextVariant.bodySm },
                        v('tokenId')
                      ),
                      o.default.createElement(
                        c.Text,
                        {
                          variant: u.TextVariant.bodySm,
                          fontWeight: u.FontWeight.Bold,
                          marginLeft: 10,
                        },
                        null == t || null === (x = t.details) || void 0 === x ? void 0 : x.tokenId
                      )
                    );
                  });
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../ducks/send'),
                  s = e('../../../../ducks/app/app'),
                  l = e('../../../../../shared/constants/transaction'),
                  c = e('../../../component-library'),
                  u = e('../../../../helpers/constants/design-system'),
                  d = h(e('../../../app/currency-input')),
                  p = e('../utils'),
                  m = e('../nft-input/nft-input'),
                  f = h(e('../../../app/currency-input/hooks/useTokenExchangeRate')),
                  g = h(e('./swap-icon'));
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
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
        file: 'ui/components/multichain/asset-picker-amount/swappable-currency-input/swappable-currency-input.tsx',
      },
    ],
    [
      6522,
      { reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getIsFiatPrimary = void 0);
                var o = e('reselect');
                n.getIsFiatPrimary = (0, o.createSelector)(
                  function (e) {
                    return e.appState.sendInputCurrencySwitched;
                  },
                  e => Boolean(e)
                );
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/asset-picker-amount/utils.ts' },
    ],
    [
      6526,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/tooltip': 6818,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.BadgeStatus = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = u(e('classnames')),
                  r = e('react-redux'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library'),
                  l = e('../../../selectors'),
                  c = u(e('../../ui/tooltip'));
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
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    p.apply(null, arguments)
                  );
                }
                const m = { display: 'flex' };
                n.BadgeStatus = ({
                  className: e = '',
                  badgeBackgroundColor: t = i.BackgroundColor.backgroundAlternative,
                  badgeBorderColor: n = i.BorderColor.borderMuted,
                  address: u,
                  isConnectedAndNotActive: d = !1,
                  text: f,
                  ...g
                }) => {
                  const h = (0, r.useSelector)(l.getUseBlockie),
                    y = (0, o.useMemo)(
                      () =>
                        o.default.createElement(
                          s.BadgeWrapper,
                          {
                            positionObj: d ? { bottom: 2, right: 5 } : { bottom: -1, right: 2 },
                            badge: o.default.createElement(s.Box, {
                              className: (0, a.default)('multichain-badge-status__badge', {
                                'multichain-badge-status__badge-not-connected': d,
                              }),
                              backgroundColor: t,
                              borderRadius: i.BorderRadius.full,
                              borderColor: n,
                              borderWidth: 2,
                            }),
                          },
                          o.default.createElement(s.AvatarAccount, {
                            borderColor: i.BorderColor.transparent,
                            size: s.AvatarAccountSize.Md,
                            address: u,
                            variant: h
                              ? s.AvatarAccountVariant.Blockies
                              : s.AvatarAccountVariant.Jazzicon,
                            marginInlineEnd: 2,
                          })
                        ),
                      [u, t, n, d, h]
                    );
                  return o.default.createElement(
                    s.Box,
                    p(
                      {
                        className: (0, a.default)('multichain-badge-status', e),
                        'data-testid': 'multichain-badge-status',
                        as: 'button',
                        display: i.Display.Flex,
                        alignItems: i.AlignItems.center,
                        justifyContent: i.JustifyContent.center,
                        backgroundColor: i.BackgroundColor.transparent,
                      },
                      g
                    ),
                    o.default.createElement(
                      c.default,
                      {
                        style: m,
                        title: f,
                        'data-testid': 'multichain-badge-status__tooltip',
                        position: 'bottom',
                      },
                      y
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/badge-status/badge-status.tsx' },
    ],
    [
      6527,
      { './badge-status': 6526 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'BadgeStatus', {
                    enumerable: !0,
                    get: function () {
                      return o.BadgeStatus;
                    },
                  });
                var o = e('./badge-status');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/badge-status/index.ts' },
    ],
    [
      6528,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useCarouselManagement': 6971,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        './constants': 6529,
        './helpers': 6530,
        react: 5328,
        'react-responsive-carousel': 5305,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Carousel = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-responsive-carousel'),
                  r = e('../../../hooks/useI18nContext'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../../shared/constants/metametrics'),
                  c = e('../../../contexts/metametrics'),
                  u = e('../../../hooks/useCarouselManagement'),
                  d = e('./constants'),
                  p = e('./helpers');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
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
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    f.apply(null, arguments)
                  );
                }
                n.Carousel = o.default.forwardRef(
                  (
                    {
                      slides: e = [],
                      isLoading: t = !1,
                      onClose: n,
                      onClick: m,
                      onRenderSlides: g,
                      ...h
                    },
                    y
                  ) => {
                    const [k, b] = (0, o.useState)(0),
                      x = (0, r.useI18nContext)(),
                      C = (0, o.useContext)(c.MetaMetricsContext),
                      v = e
                        .filter(e => !e.dismissed || e.undismissable)
                        .sort((e, t) => {
                          if (
                            (0, u.getSweepstakesCampaignActive)(new Date(new Date().toISOString()))
                          ) {
                            if ('sweepStake' === e.id) return -1;
                            if ('sweepStake' === t.id) return 1;
                          }
                          return e.undismissable && !t.undismissable
                            ? -1
                            : !e.undismissable && t.undismissable
                              ? 1
                              : 0;
                        })
                        .slice(0, d.MAX_SLIDES);
                    (0, o.useEffect)(() => {
                      v && v.length > 0 && g && !t && g(v);
                    }, [v, g, t]);
                    const T = (e, t) => {
                        e.preventDefault(), e.stopPropagation();
                        const o = v.findIndex(e => e.id === t);
                        let a = k;
                        o === v.length - 1 && v.length > 1 ? (a = o - 1) : o < k && (a = k - 1),
                          b(a),
                          n && n(1 === v.length, t);
                      },
                      E = e => {
                        const t = v[k],
                          n = v[e];
                        k !== e &&
                          C({
                            event: l.MetaMetricsEventName.BannerNavigated,
                            category: l.MetaMetricsEventCategory.Banner,
                            properties: {
                              from_banner: t.id,
                              to_banner: n.id,
                              from_banner_title: t.title,
                              to_banner_title: n.title,
                              navigation_method: 1 === Math.abs(k - e) ? 'swipe' : 'dot',
                            },
                          }),
                          b(e);
                      };
                    return t
                      ? o.default.createElement(
                          i.Box,
                          f({ className: 'mm-carousel', ref: y }, h),
                          o.default.createElement(
                            a.Carousel,
                            {
                              showArrows: !1,
                              className: 'mm-carousel__carousel mm-carousel__loading',
                              showStatus: !1,
                              autoPlay: !1,
                              swipeScrollTolerance: 5,
                              centerSlidePercentage: (0, p.getCenterSlidePercentage)(3),
                              axis: 'horizontal',
                              preventMovementUntilSwipeScrollTolerance: !0,
                              emulateTouch: !0,
                              centerMode: !0,
                              swipeable: !1,
                            },
                            [...Array(3)].map((e, t) =>
                              o.default.createElement(i.BannerBase, {
                                key: `skeleton-${t}`,
                                className: 'mm-carousel-slide',
                                textAlign: s.TextAlign.Left,
                                alignItems: s.AlignItems.center,
                                borderColor: s.BorderColor.borderMuted,
                                paddingLeft: 0,
                                paddingRight: 0,
                                style: {
                                  height: d.BANNER_STYLES.HEIGHT,
                                  margin: (0, p.getSlideMargin)(t, 3),
                                  width: (0, p.getSlideWidth)(t, 3),
                                },
                              })
                            )
                          )
                        )
                      : 0 === v.length
                        ? null
                        : o.default.createElement(
                            i.Box,
                            f(
                              {
                                className:
                                  'mm-carousel ' +
                                  (1 === v.length ? 'mm-carousel--single-slide' : ''),
                                ref: y,
                              },
                              h
                            ),
                            o.default.createElement(
                              a.Carousel,
                              {
                                selectedItem: k,
                                showArrows: !1,
                                onClickItem: e => E(e),
                                onChange: e => E(e),
                                className: 'mm-carousel__carousel',
                                showStatus: !1,
                                autoPlay: !1,
                                showThumbs: !1,
                                swipeScrollTolerance: 5,
                                swipeable: v.length > 1,
                                centerSlidePercentage: (0, p.getCenterSlidePercentage)(v.length),
                                axis: 'horizontal',
                                preventMovementUntilSwipeScrollTolerance: !0,
                                emulateTouch: !0,
                                centerMode: !0,
                              },
                              v.map((e, t) =>
                                o.default.createElement(i.BannerBase, {
                                  'data-testid': `slide-${e.id}`,
                                  onClick: () => {
                                    t === k &&
                                      (e.href && global.platform.openTab({ url: e.href }),
                                      null == m || m(e.id));
                                  },
                                  key: e.id,
                                  className: 'mm-carousel-slide',
                                  startAccessory: o.default.createElement('img', {
                                    className: 'mm-carousel-slide__accessory',
                                    src: e.image,
                                  }),
                                  textAlign: s.TextAlign.Left,
                                  alignItems: s.AlignItems.center,
                                  title: x(e.title),
                                  description: x(e.description),
                                  titleProps: {
                                    variant: s.TextVariant.bodySmMedium,
                                    fontWeight: s.FontWeight.Medium,
                                    marginLeft: 2,
                                  },
                                  borderColor: s.BorderColor.borderMuted,
                                  descriptionProps: {
                                    variant: s.TextVariant.bodyXs,
                                    fontWeight: s.FontWeight.Normal,
                                    marginLeft: 2,
                                  },
                                  onClose:
                                    Boolean(T) && !e.undismissable ? t => T(t, e.id) : undefined,
                                  closeButtonProps: {
                                    className: 'mm-carousel-slide__close-button',
                                  },
                                  style: {
                                    height: d.BANNER_STYLES.HEIGHT,
                                    margin: (0, p.getSlideMargin)(t, v.length),
                                    width: (0, p.getSlideWidth)(t, v.length),
                                    position: 'relative',
                                  },
                                  padding: 0,
                                  paddingLeft: 3,
                                  paddingRight: 3,
                                })
                              )
                            )
                          );
                  }
                );
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/carousel/carousel.tsx' },
    ],
    [
      6529,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.WIDTH_VALUES = n.MAX_SLIDES = n.MARGIN_VALUES = n.BANNER_STYLES = void 0);
                (n.MARGIN_VALUES = {
                  SLIDE_BOTTOM: '40px',
                  CONTAINER_SIDE: '16px',
                  SLIDE_GAP: '2%',
                  ZERO: '0',
                }),
                  (n.WIDTH_VALUES = {
                    FULL_WIDTH: '100%',
                    STANDARD_SLIDE: '98%',
                    FIRST_SLIDE: '94%',
                  }),
                  (n.BANNER_STYLES = { HEIGHT: '59px' }),
                  (n.MAX_SLIDES = 5);
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/carousel/constants.ts' },
    ],
    [
      6530,
      { './constants': 6529 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getCenterSlidePercentage = function (e) {
                    return 1 === e ? 100 : 90;
                  }),
                  (n.getSlideMargin = function (e, t) {
                    if (1 === t) return `${o.MARGIN_VALUES.ZERO} ${o.MARGIN_VALUES.CONTAINER_SIDE}`;
                    if (0 === e)
                      return `${o.MARGIN_VALUES.ZERO} ${o.MARGIN_VALUES.ZERO} ${o.MARGIN_VALUES.SLIDE_BOTTOM} ${o.MARGIN_VALUES.CONTAINER_SIDE}`;
                    return `${o.MARGIN_VALUES.ZERO} ${o.MARGIN_VALUES.ZERO} ${o.MARGIN_VALUES.SLIDE_BOTTOM} ${o.MARGIN_VALUES.ZERO}`;
                  }),
                  (n.getSlideWidth = function (e, t) {
                    if (1 === t) return `calc(${o.WIDTH_VALUES.FULL_WIDTH} - 32px)`;
                    if (0 === e)
                      return `calc(${o.WIDTH_VALUES.STANDARD_SLIDE} - ${o.MARGIN_VALUES.CONTAINER_SIDE})`;
                    return o.WIDTH_VALUES.STANDARD_SLIDE;
                  });
                var o = e('./constants');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/carousel/helpers.ts' },
    ],
    [
      6531,
      { './carousel': 6528 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Carousel', {
                    enumerable: !0,
                    get: function () {
                      return o.Carousel;
                    },
                  });
                var o = e('./carousel');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/carousel/index.ts' },
    ],
    [
      6532,
      {
        '..': 6574,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/tooltip/tooltip': 6819,
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
                  (n.ConnectAccountsModalList = void 0);
                var o = p(e('react')),
                  a = e('react-redux'),
                  r = e('../../component-library'),
                  i = e('../../../hooks/useI18nContext'),
                  s = e('..'),
                  l = e('../../../helpers/constants/design-system'),
                  c = p(e('../../ui/tooltip/tooltip')),
                  u = e('../../../helpers/utils/util'),
                  d = e('../../../store/actions');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.ConnectAccountsModalList = ({
                  onClose: e,
                  allAreSelected: t,
                  deselectAll: n,
                  selectAll: p,
                  handleAccountClick: m,
                  selectedAccounts: f,
                  accounts: g,
                  checked: h,
                  isIndeterminate: y,
                  onAccountsUpdate: k,
                  activeTabOrigin: b,
                }) => {
                  const x = (0, i.useI18nContext)(),
                    C = (0, a.useDispatch)();
                  return o.default.createElement(
                    r.Modal,
                    { isOpen: !0, onClose: e, 'data-testid': 'connect-more-accounts' },
                    o.default.createElement(r.ModalOverlay, null),
                    o.default.createElement(
                      r.ModalContent,
                      null,
                      o.default.createElement(
                        r.ModalHeader,
                        { 'data-testid': 'connect-more-accounts-title', onClose: e },
                        x('connectMoreAccounts')
                      ),
                      o.default.createElement(
                        r.ModalBody,
                        null,
                        o.default.createElement(
                          r.Box,
                          {
                            padding: 4,
                            display: l.Display.Flex,
                            justifyContent: l.JustifyContent.spaceBetween,
                          },
                          o.default.createElement(r.Checkbox, {
                            label: x('selectAll'),
                            isChecked: h,
                            onClick: () => (t() ? n() : p()),
                            isIndeterminate: y,
                          }),
                          o.default.createElement(
                            r.Text,
                            {
                              color: l.TextColor.textAlternative,
                              as: 'div',
                              display: l.Display.Flex,
                            },
                            o.default.createElement(
                              c.default,
                              {
                                distance: 10,
                                html: x('connectedAccountsListTooltip', [
                                  o.default.createElement('strong', null, (0, u.getURLHost)(b)),
                                ]),
                                position: 'top',
                              },
                              o.default.createElement(r.Icon, {
                                marginInlineEnd: 2,
                                name: r.IconName.Info,
                                color: l.IconColor.iconMuted,
                              })
                            ),
                            x('permissions')
                          )
                        ),
                        g.map(t => {
                          const n = f.includes(t.address);
                          return o.default.createElement(s.AccountListItem, {
                            onClick: () => m(t.address),
                            account: t,
                            selected: n,
                            key: t.address,
                            closeMenu: e,
                            startAccessory: o.default.createElement(r.Checkbox, { isChecked: n }),
                          });
                        })
                      ),
                      o.default.createElement(
                        r.ModalFooter,
                        null,
                        o.default.createElement(
                          r.ButtonPrimary,
                          {
                            'data-testid': 'connect-more-accounts-button',
                            onClick: () => {
                              C((0, d.addPermittedAccounts)(b, f)), e(), k();
                            },
                            size: r.ButtonPrimarySize.Lg,
                            block: !0,
                            disabled: 0 === f.length,
                          },
                          x('confirm')
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
        file: 'ui/components/multichain/connect-accounts-modal/connect-accounts-modal-list.tsx',
      },
    ],
    [
      6533,
      {
        '../../../selectors/selectors': 7611,
        './connect-accounts-modal-list': 6532,
        '@metamask/keyring-api': 2014,
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
                  (n.ConnectAccountsModal = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/keyring-api'),
                  i = e('../../../selectors/selectors'),
                  s = e('./connect-accounts-modal-list');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.ConnectAccountsModal = ({
                  onClose: e,
                  onAccountsUpdate: t,
                  activeTabOrigin: n,
                }) => {
                  const l = (0, a.useSelector)(e =>
                      (0, i.getUnconnectedAccounts)(e, n).filter(e =>
                        (0, r.isEvmAccountType)(e.type)
                      )
                    ),
                    [c, u] = (0, o.useState)([]),
                    d = () => l.length === c.length,
                    p = d(),
                    m = !p && c.length > 0;
                  return o.default.createElement(s.ConnectAccountsModalList, {
                    accounts: l,
                    selectedAccounts: c,
                    allAreSelected: d,
                    deselectAll: () => {
                      u([]);
                    },
                    selectAll: () => {
                      const e = l.map(e => e.address);
                      u(e);
                    },
                    handleAccountClick: e => {
                      const t = c.indexOf(e);
                      let n = [];
                      (n = -1 === t ? [...c, e] : c.filter((e, n) => n !== t)), u(n);
                    },
                    checked: p,
                    isIndeterminate: m,
                    onClose: e,
                    onAccountsUpdate: t,
                    activeTabOrigin: n,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/connect-accounts-modal/connect-accounts-modal.tsx',
      },
    ],
    [
      6534,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
        '../permission-details-modal/permission-details-modal': 6679,
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
                  (n.ConnectedAccountsMenu = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../component-library'),
                  i = e('../../ui/menu'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../store/actions'),
                  u = e('../../../selectors'),
                  d = e('../permission-details-modal/permission-details-modal');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const m = i.MenuItem;
                n.ConnectedAccountsMenu = ({
                  isOpen: e,
                  account: t,
                  anchorElement: n,
                  disableAccountSwitcher: i = !1,
                  onClose: p,
                  onActionClick: f,
                  activeTabOrigin: g,
                }) => {
                  const h = (0, a.useDispatch)(),
                    y = (0, l.useI18nContext)(),
                    k = (0, o.useRef)(null),
                    [b, x] = (0, o.useState)(!1),
                    C = (0, a.useSelector)(u.getPermissionsForActiveTab),
                    v = (0, o.useCallback)(
                      e => {
                        null != k && k.current && !k.current.contains(e.target) && p();
                      },
                      [p]
                    );
                  (0, o.useEffect)(
                    () => (
                      document.addEventListener('mousedown', v),
                      () => {
                        document.removeEventListener('mousedown', v);
                      }
                    ),
                    [v]
                  );
                  const T = (0, o.useCallback)(
                    e => {
                      var t;
                      'Tab' === e.key &&
                        null != k &&
                        null !== (t = k.current) &&
                        void 0 !== t &&
                        t.contains(e.target) &&
                        p &&
                        p();
                    },
                    [p]
                  );
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      r.Popover,
                      {
                        className: 'multichain-connected-accounts-menu__popover',
                        referenceElement: n,
                        role: r.PopoverRole.Dialog,
                        position: r.PopoverPosition.Bottom,
                        offset: [0, 0],
                        padding: 0,
                        isOpen: e,
                        flip: !0,
                        preventOverflow: !0,
                        isPortal: !0,
                      },
                      o.default.createElement(
                        r.ModalFocus,
                        { restoreFocus: !0, initialFocusRef: { current: n } },
                        o.default.createElement(
                          r.Box,
                          { onKeyDown: T, ref: k },
                          null != C && C.length
                            ? o.default.createElement(
                                m,
                                {
                                  iconName: r.IconName.SecurityTick,
                                  'data-testid': 'permission-details-menu-item',
                                  onClick: () => {
                                    x(!0), p();
                                  },
                                },
                                o.default.createElement(
                                  r.Text,
                                  { variant: s.TextVariant.bodyMd },
                                  y('permissionDetails')
                                )
                              )
                            : null,
                          i
                            ? null
                            : o.default.createElement(
                                m,
                                {
                                  iconName: r.IconName.SwapHorizontal,
                                  'data-testid': 'switch-account-menu-item',
                                  onClick: () => {
                                    h((0, c.setSelectedAccount)(t.address)), p();
                                  },
                                },
                                o.default.createElement(
                                  r.Text,
                                  { variant: s.TextVariant.bodyMd },
                                  y('switchToThisAccount')
                                )
                              ),
                          o.default.createElement(
                            m,
                            {
                              iconName: r.IconName.Logout,
                              iconColor: s.IconColor.errorDefault,
                              'data-testid': 'disconnect-menu-item',
                              onClick: () => {
                                f(t.metadata.name), h((0, c.removePermittedAccount)(g, t.address));
                              },
                            },
                            o.default.createElement(
                              r.Text,
                              { color: s.TextColor.errorDefault, variant: s.TextVariant.bodyMd },
                              y('disconnect')
                            )
                          )
                        )
                      )
                    ),
                    b
                      ? o.default.createElement(d.PermissionDetailsModal, {
                          isOpen: b,
                          account: t,
                          onClick: () => {
                            h((0, c.removePermittedAccount)(g, t.address));
                          },
                          onClose: () => x(!1),
                          permissions: C,
                        })
                      : null
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/connected-accounts-menu/connected-accounts-menu.tsx',
      },
    ],
    [
      6535,
      { './connected-accounts-menu': 6534 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ConnectedAccountsMenu', {
                    enumerable: !0,
                    get: function () {
                      return o.ConnectedAccountsMenu;
                    },
                  });
                var o = e('./connected-accounts-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/connected-accounts-menu/index.ts' },
    ],
    [
      6536,
      {
        '../../../helpers/constants/connected-sites': 6871,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/tooltip': 6818,
        '../connected-site-popover': 6539,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ConnectedSiteMenu = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = f(e('prop-types')),
                  r = f(e('classnames')),
                  i = e('react-redux'),
                  s = e('../../../helpers/constants/connected-sites'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../component-library'),
                  u = e('../../../selectors'),
                  d = f(e('../../ui/tooltip')),
                  p = e('../../../hooks/useI18nContext'),
                  m = e('../connected-site-popover');
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
                const h = ({
                  className: e,
                  globalMenuColor: t,
                  status: n,
                  text: a,
                  disabled: f,
                  onClick: g,
                }) => {
                  var h;
                  const y = (0, p.useI18nContext)(),
                    [k, b] = (0, o.useState)(!1),
                    x = (0, o.useRef)(null),
                    C = (0, i.useSelector)(u.getSelectedInternalAccount),
                    v = (0, i.useSelector)(u.getSubjectMetadata),
                    T = (0, i.useSelector)(u.getOriginOfCurrentTab),
                    E = !(
                      null !== (h = (0, i.useSelector)(u.getPermittedAccountsByOrigin)[T]) &&
                      void 0 !== h &&
                      h.length
                    ),
                    w = v[T],
                    _ =
                      n === s.STATUS_CONNECTED_TO_ANOTHER_ACCOUNT ||
                      n === s.STATUS_CONNECTED_TO_SNAP,
                    M = E
                      ? o.default.createElement(c.Icon, {
                          name: c.IconName.Global,
                          size: c.IconSize.Sm,
                          color: l.IconColor.iconDefault,
                        })
                      : o.default.createElement(c.AvatarFavicon, {
                          name: w.name,
                          size: l.Size.SM,
                          src: w.iconUrl,
                        });
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      c.Box,
                      {
                        className: (0, r.default)(
                          'multichain-connected-site-menu' + (f ? '--disabled' : ''),
                          e
                        ),
                        'data-testid': 'connection-menu',
                        as: 'button',
                        display: l.Display.Flex,
                        alignItems: l.AlignItems.center,
                        justifyContent: l.JustifyContent.center,
                        backgroundColor: l.BackgroundColor.backgroundDefault,
                        ref: x,
                        onClick: g,
                      },
                      o.default.createElement(
                        d.default,
                        {
                          title:
                            n === s.STATUS_NOT_CONNECTED
                              ? y('statusNotConnectedAccount')
                              : `${null == C ? void 0 : C.metadata.name} ${a}`,
                          'data-testid': 'multichain-connected-site-menu__tooltip',
                          position: 'bottom',
                        },
                        o.default.createElement(
                          c.BadgeWrapper,
                          {
                            positionObj: _
                              ? { bottom: -1, right: -2, zIndex: 1 }
                              : { bottom: -1, right: -4, zIndex: 1 },
                            badge: o.default.createElement(c.Box, {
                              backgroundColor: t,
                              className: (0, r.default)('multichain-connected-site-menu__badge', {
                                'not-connected': _,
                              }),
                              borderRadius: l.BorderRadius.full,
                              borderColor: _
                                ? l.BorderColor.successDefault
                                : l.BorderColor.backgroundDefault,
                              borderWidth: 2,
                            }),
                          },
                          M
                        )
                      )
                    ),
                    k &&
                      o.default.createElement(m.ConnectedSitePopover, {
                        referenceElement: x,
                        isOpen: k,
                        isConnected: !E,
                        onClick: g,
                        onClose: () => b(!1),
                      })
                  );
                };
                (n.ConnectedSiteMenu = h),
                  (h.propTypes = {
                    className: a.default.string,
                    globalMenuColor: a.default.string.isRequired,
                    status: a.default.string.isRequired,
                    text: a.default.string,
                    onClick: a.default.func,
                    disabled: a.default.bool,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/connected-site-menu/connected-site-menu.js',
      },
    ],
    [
      6537,
      { './connected-site-menu': 6536 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ConnectedSiteMenu', {
                    enumerable: !0,
                    get: function () {
                      return o.ConnectedSiteMenu;
                    },
                  });
                var o = e('./connected-site-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/connected-site-menu/index.js' },
    ],
    [
      6538,
      {
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
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
                  (n.ConnectedSitePopover = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../contexts/i18n'),
                  l = e('../../../selectors'),
                  c = e('../../../helpers/utils/util'),
                  u = e('../../../selectors/multichain'),
                  d = e('../../../store/actions');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.ConnectedSitePopover = ({
                  isOpen: e,
                  isConnected: t,
                  onClick: n,
                  onClose: p,
                  referenceElement: m,
                }) => {
                  const f = (0, o.useContext)(s.I18nContext),
                    g = (0, a.useSelector)(l.getOriginOfCurrentTab),
                    h = (0, c.getURLHost)(g),
                    y = (0, a.useSelector)(l.getCurrentNetwork),
                    k = (0, a.useDispatch)();
                  return o.default.createElement(
                    r.Popover,
                    {
                      referenceElement: null == m ? void 0 : m.current,
                      isOpen: e,
                      style: { width: '256px' },
                      onClickOutside: p,
                      'data-testid': 'connected-site-popover',
                      paddingLeft: 0,
                      paddingRight: 0,
                      offset: [0, 0],
                      position: r.PopoverPosition.BottomEnd,
                      flip: !0,
                    },
                    o.default.createElement(
                      r.Box,
                      { display: i.Display.Flex, flexDirection: i.FlexDirection.Column },
                      o.default.createElement(
                        r.Box,
                        {
                          style: {
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid',
                            borderBottomColor: '#858B9A33',
                          },
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingBottom: 2,
                        },
                        o.default.createElement(r.Text, { variant: i.TextVariant.bodyMd }, h),
                        t
                          ? o.default.createElement(
                              r.Box,
                              {
                                display: i.Display.Flex,
                                flexDirection: i.FlexDirection.Row,
                                alignItems: i.AlignItems.center,
                                gap: 1,
                              },
                              o.default.createElement(r.AvatarNetwork, {
                                size: r.AvatarNetworkSize.Xs,
                                name: (null == y ? void 0 : y.nickname) || '',
                                src:
                                  null != y && y.chainId
                                    ? (0, u.getImageForChainId)(y.chainId)
                                    : undefined,
                              }),
                              o.default.createElement(
                                r.ButtonLink,
                                { onClick: () => k((0, d.toggleNetworkMenu)()) },
                                null == y ? void 0 : y.nickname
                              )
                            )
                          : o.default.createElement(
                              r.Text,
                              { variant: i.TextVariant.bodySm },
                              f('statusNotConnected')
                            )
                      ),
                      !t &&
                        o.default.createElement(
                          r.Box,
                          { paddingLeft: 4, paddingRight: 4, paddingTop: 2 },
                          o.default.createElement(
                            r.Text,
                            { variant: i.TextVariant.bodyMd },
                            f('connectionPopoverDescription')
                          )
                        ),
                      o.default.createElement(
                        r.Box,
                        { paddingTop: 2, paddingLeft: 4, paddingRight: 4 },
                        o.default.createElement(
                          r.ButtonSecondary,
                          { endIconName: r.IconName.Export, block: !0, onClick: n },
                          f(t ? 'managePermissions' : 'exploreweb3')
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
        file: 'ui/components/multichain/connected-site-popover/connected-site-popover.tsx',
      },
    ],
    [
      6539,
      { './connected-site-popover': 6538 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ConnectedSitePopover', {
                    enumerable: !0,
                    get: function () {
                      return o.ConnectedSitePopover;
                    },
                  });
                var o = e('./connected-site-popover');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/connected-site-popover/index.ts' },
    ],
    [
      6540,
      {
        '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts': 5840,
        '../../../helpers/constants/connected-sites': 6871,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../badge-status': 6527,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ConnectedStatus = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('react-redux'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../helpers/constants/connected-sites'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../badge-status'),
                  u = e(
                    '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts'
                  ),
                  d = e('../../../selectors');
                n.ConnectedStatus = ({ address: e = '', isActive: t }) => {
                  const n = (0, l.useI18nContext)(),
                    o = (0, r.useSelector)(d.getAllPermittedAccountsForCurrentTab),
                    p = (0, r.useSelector)(t => (0, d.getInternalAccountByAddress)(t, e)),
                    m = (0, u.isInternalAccountInPermittedAccountIds)(p, o);
                  let f = s.STATUS_NOT_CONNECTED;
                  t ? (f = s.STATUS_CONNECTED) : m && (f = s.STATUS_CONNECTED_TO_ANOTHER_ACCOUNT);
                  let g = i.BorderColor.backgroundDefault,
                    h = i.BackgroundColor.iconAlternative,
                    y = n('statusNotConnected');
                  f === s.STATUS_CONNECTED
                    ? ((g = i.BorderColor.backgroundDefault),
                      (h = i.BackgroundColor.successDefault),
                      (y = n('active')))
                    : f === s.STATUS_CONNECTED_TO_ANOTHER_ACCOUNT &&
                      ((g = i.BorderColor.successDefault),
                      (h = i.BackgroundColor.backgroundDefault),
                      (y = n('tooltipSatusConnectedUpperCase')));
                  const k = m && !t;
                  return a.default.createElement(c.BadgeStatus, {
                    address: e,
                    badgeBackgroundColor: h,
                    badgeBorderColor: g,
                    text: y,
                    isConnectedAndNotActive: k,
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/connected-status/connected-status.tsx' },
    ],
    [
      6541,
      { './connected-status': 6540 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ConnectedStatus', {
                    enumerable: !0,
                    get: function () {
                      return o.ConnectedStatus;
                    },
                  });
                var o = e('./connected-status');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/connected-status/index.ts' },
    ],
    [
      6542,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/history/history': 6857,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/accounts': 6896,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/multi-srp/multi-srp': 7604,
        '../../../selectors/selectors': 7611,
        '../../component-library': 6402,
        '../../component-library/form-text-field/form-text-field': 6391,
        '../multi-srp/select-srp/select-srp': 6582,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.CreateAccount = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../component-library'),
                  s = e('../../component-library/form-text-field/form-text-field'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/utils/accounts'),
                  u = e('../../../selectors'),
                  d = e('../../../selectors/selectors'),
                  p = e('../../../ducks/history/history'),
                  m = e('../../../../shared/constants/metametrics'),
                  f = e('../../../contexts/metametrics'),
                  g = e('../../../helpers/constants/design-system'),
                  h = e('../multi-srp/select-srp/select-srp'),
                  y = e('../../../selectors/multi-srp/multi-srp');
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.CreateAccount = o.default.memo(
                  o.default.forwardRef(
                    (
                      {
                        getNextAvailableAccountName: e,
                        onCreateAccount: t,
                        onSelectSrp: n,
                        selectedKeyringId: k,
                        onActionComplete: b,
                      },
                      x
                    ) => {
                      const C = (0, l.useI18nContext)(),
                        v = (0, r.useHistory)(),
                        T = (0, o.useContext)(f.MetaMetricsContext),
                        E = (0, a.useSelector)(d.getHDEntropyIndex),
                        w = (0, a.useSelector)(p.getMostRecentOverviewPage),
                        _ = (0, a.useSelector)(u.getMetaMaskAccountsOrdered),
                        [M, I] = (0, o.useState)(!1),
                        [S, A] = (0, o.useState)('');
                      (0, o.useEffect)(() => {
                        e(_).then(A);
                      }, []);
                      const [N, O] = (0, o.useState)(''),
                        P = N.trim(),
                        { isValidAccountName: B, errorMessage: D } = (0,
                        c.getAccountNameErrorMessage)(_, { t: C }, P || S, S),
                        j = (0, a.useSelector)(u.getMetaMaskHdKeyrings),
                        F = (0, a.useSelector)(e => (0, u.getSelectedKeyringByIdOrDefault)(e, k)),
                        L = (0, a.useSelector)(e => (0, y.getSnapAccountsByKeyringId)(e, k)),
                        R = (0, a.useSelector)(e => (0, u.getHdKeyringIndexByIdOrDefault)(e, k)),
                        $ = (0, o.useCallback)(
                          async e => {
                            I(!0), e.preventDefault();
                            try {
                              await t(P || S),
                                T({
                                  category: m.MetaMetricsEventCategory.Accounts,
                                  event: m.MetaMetricsEventName.AccountAdded,
                                  properties: {
                                    account_type: m.MetaMetricsEventAccountType.Default,
                                    location: 'Home',
                                    hd_entropy_index: E,
                                  },
                                }),
                                v.push(w);
                            } catch (e) {
                              T({
                                category: m.MetaMetricsEventCategory.Accounts,
                                event: m.MetaMetricsEventName.AccountAddFailed,
                                properties: {
                                  account_type: m.MetaMetricsEventAccountType.Default,
                                  error: e.message,
                                  hd_entropy_index: E,
                                },
                              });
                            }
                          },
                          [P, S, w]
                        );
                      return o.default.createElement(
                        i.Box,
                        { as: 'form', onSubmit: $ },
                        o.default.createElement(s.FormTextField, {
                          'data-testid': 'account-name-input',
                          ref: x,
                          size: i.FormTextFieldSize.Lg,
                          gap: 2,
                          autoFocus: !0,
                          id: 'account-name',
                          label: C('accountName'),
                          placeholder: S,
                          onChange: e => O(e.target.value),
                          helpText: D,
                          error: !B,
                          onKeyPress: e => {
                            'Enter' === e.key && $(e);
                          },
                        }),
                        j.length > 1 && n && F
                          ? o.default.createElement(
                              i.Box,
                              { marginBottom: 3 },
                              o.default.createElement(h.SelectSrp, {
                                onClick: n,
                                srpName: C('secretRecoveryPhrasePlusNumber', [R + 1]),
                                srpAccounts: F.accounts.length + L.length,
                              })
                            )
                          : null,
                        o.default.createElement(
                          i.Box,
                          { display: g.Display.Flex, marginTop: 1, gap: 2 },
                          o.default.createElement(
                            i.ButtonSecondary,
                            {
                              'data-testid': 'cancel-add-account-with-name',
                              type: 'button',
                              onClick: async () => await b(!1),
                              block: !0,
                            },
                            C('cancel')
                          ),
                          o.default.createElement(
                            i.ButtonPrimary,
                            {
                              'data-testid': 'submit-add-account-with-name',
                              type: 'submit',
                              disabled: !B || M,
                              loading: M,
                              block: !0,
                            },
                            C('addAccount')
                          )
                        )
                      );
                    }
                  )
                );
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/create-account/create-account.tsx' },
    ],
    [
      6543,
      { './create-account': 6542 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'CreateAccount', {
                    enumerable: !0,
                    get: function () {
                      return o.CreateAccount;
                    },
                  });
                var o = e('./create-account');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/create-account/index.js' },
    ],
    [
      6544,
      {
        '../../../store/actions': 7619,
        '../create-account': 6543,
        '@metamask/keyring-controller': 2021,
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
                  (n.CreateEthAccount = void 0);
                var o = c(e('react')),
                  a = c(e('prop-types')),
                  r = e('react-redux'),
                  i = e('@metamask/keyring-controller'),
                  s = e('../../../store/actions'),
                  l = e('../create-account');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({ onActionComplete: e, onSelectSrp: t, selectedKeyringId: n }) => {
                  const a = (0, r.useDispatch)();
                  return o.default.createElement(l.CreateAccount, {
                    onActionComplete: e,
                    onCreateAccount: async t => {
                      const o = await a((0, s.addNewAccount)(n));
                      t && a((0, s.setAccountLabel)(o, t)), e(!0);
                    },
                    getNextAvailableAccountName: async () =>
                      await (0, s.getNextAvailableAccountName)(i.KeyringTypes.hd),
                    onSelectSrp: t,
                    selectedKeyringId: n,
                  });
                };
                (n.CreateEthAccount = u),
                  (u.propTypes = {
                    onActionComplete: a.default.func.isRequired,
                    onSelectSrp: a.default.func,
                    selectedKeyringId: a.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/create-eth-account/create-eth-account.js',
      },
    ],
    [
      6545,
      { './create-eth-account': 6544 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'CreateEthAccount', {
                    enumerable: !0,
                    get: function () {
                      return o.CreateEthAccount;
                    },
                  });
                var o = e('./create-eth-account');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/create-eth-account/index.js' },
    ],
    [
      6546,
      {
        '..': 6574,
        '../../../../shared/lib/accounts': 5824,
        '../../../ducks/history/history': 6857,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '@metamask/keyring-controller': 2021,
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
                  (n.CreateNamedSnapAccount = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('@metamask/keyring-controller'),
                  s = e('..'),
                  l = e('../../component-library'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../ducks/history/history'),
                  d = e('../../../store/actions'),
                  p = e('../../../../shared/lib/accounts');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.CreateNamedSnapAccount = ({
                  onActionComplete: e,
                  snapSuggestedAccountName: t,
                }) => {
                  const n = (0, c.useI18nContext)(),
                    m = (0, r.useHistory)(),
                    f = (0, a.useSelector)(u.getMostRecentOverviewPage),
                    g = (0, o.useCallback)(async t => {
                      await e({ success: t });
                    }, []),
                    h = (0, o.useCallback)(async t => {
                      await e({ success: !0, name: t });
                    }, []),
                    y = (0, o.useCallback)(
                      async e =>
                        t
                          ? (0, p.getUniqueAccountName)(e, t)
                          : (0, d.getNextAvailableAccountName)(i.KeyringTypes.snap),
                      []
                    ),
                    k = (0, o.useCallback)(async () => {
                      await e({ success: !1 }), m.push(f);
                    }, []);
                  return o.default.createElement(
                    l.Box,
                    { padding: 4, className: 'name-snap-account-page' },
                    o.default.createElement(
                      l.ModalHeader,
                      { padding: 4, onClose: k },
                      n('addAccountToMetaMask')
                    ),
                    o.default.createElement(s.CreateAccount, {
                      onActionComplete: g,
                      onCreateAccount: h,
                      getNextAvailableAccountName: y,
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/create-named-snap-account/create-named-snap-account.tsx',
      },
    ],
    [
      6547,
      { './create-named-snap-account': 6546 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'CreateNamedSnapAccount', {
                    enumerable: !0,
                    get: function () {
                      return o.CreateNamedSnapAccount;
                    },
                  });
                var o = e('./create-named-snap-account');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/create-named-snap-account/index.js' },
    ],
    [
      6548,
      {
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../hooks/accounts/useMultichainWalletSnapClient': 6925,
        '../../../store/actions': 7619,
        '../create-account': 6543,
        '@metamask/keyring-controller': 2021,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.CreateSnapAccount = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('@metamask/keyring-controller'),
                  r = e('../../../store/actions'),
                  i = e('../create-account'),
                  s = e('../../../hooks/accounts/useMultichainWalletSnapClient'),
                  l = e('../../../../shared/constants/multichain/networks');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.CreateSnapAccount = ({
                  onActionComplete: e,
                  onSelectSrp: t,
                  selectedKeyringId: n,
                  clientType: c,
                  chainId: u,
                }) => {
                  const d = (0, s.useMultichainWalletSnapClient)(c),
                    p = (0, o.useRef)(!1),
                    m = (0, o.useCallback)(
                      async t => {
                        if (!p.current)
                          try {
                            (p.current = !0),
                              await d.createAccount({
                                scope: u,
                                entropySource: n,
                                accountNameSuggestion: t,
                              }),
                              e(!0);
                          } catch (t) {
                            e(!1);
                          } finally {
                            p.current = !1;
                          }
                      },
                      [d, u, n, e]
                    );
                  return o.default.createElement(i.CreateAccount, {
                    onActionComplete: e,
                    onCreateAccount: m,
                    getNextAvailableAccountName: async () => {
                      const e = await (0, r.getNextAvailableAccountName)(a.KeyringTypes.snap),
                        t = e.trim().split(' ').pop();
                      switch (c) {
                        case s.WalletClientType.Bitcoin:
                          return u === l.MultichainNetworks.BITCOIN_TESTNET
                            ? `Bitcoin Testnet Account ${t}`
                            : `Bitcoin Account ${t}`;
                        case s.WalletClientType.Solana:
                          return `Solana Account ${t}`;
                        default:
                          return e;
                      }
                    },
                    onSelectSrp: t,
                    selectedKeyringId: n,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/create-snap-account/create-snap-account.tsx',
      },
    ],
    [
      6549,
      { './create-snap-account': 6548 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'CreateSnapAccount', {
                    enumerable: !0,
                    get: function () {
                      return o.CreateSnapAccount;
                    },
                  });
                var o = e('./create-snap-account');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/create-snap-account/index.ts' },
    ],
    [
      6550,
      {
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/accounts/useMultichainWalletSnapClient': 6925,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../create-snap-account': 6549,
        '../multi-srp/srp-list': 6583,
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
                  (n.CreateSolanaAccountModal = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('react-redux'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../selectors'),
                  u = e('../create-snap-account'),
                  d = e('../multi-srp/srp-list'),
                  p = e('../../../hooks/accounts/useMultichainWalletSnapClient'),
                  m = e('../../../../shared/constants/multichain/networks');
                n.CreateSolanaAccountModal = ({ onClose: e }) => {
                  const t = (0, l.useI18nContext)(),
                    [n] = (0, r.useSelector)(c.getMetaMaskKeyrings),
                    [o, f] = a.default.useState(!1),
                    [g, h] = a.default.useState(!0),
                    [y, k] = a.default.useState(n.metadata.id);
                  return g
                    ? a.default.createElement(
                        i.Modal,
                        { isOpen: !0, onClose: e },
                        a.default.createElement(i.ModalOverlay, null),
                        a.default.createElement(
                          i.ModalContent,
                          {
                            className: 'create-solana-account-modal',
                            'data-testid': 'create-solana-account-modal',
                            modalDialogProps: {
                              className: 'create-solana-account-modal__dialog',
                              padding: 0,
                              display: s.Display.Flex,
                              flexDirection: s.FlexDirection.Column,
                            },
                          },
                          a.default.createElement(
                            i.ModalHeader,
                            { padding: 4, onClose: e },
                            t('createSolanaAccount')
                          ),
                          a.default.createElement(
                            i.Box,
                            { paddingLeft: 4, paddingRight: 4, paddingBottom: 4 },
                            a.default.createElement(u.CreateSnapAccount, {
                              onActionComplete: async t => {
                                t && h(!1), e();
                              },
                              selectedKeyringId: y,
                              onSelectSrp: () => {
                                f(!0), h(!1);
                              },
                              clientType: p.WalletClientType.Solana,
                              chainId: m.MultichainNetworks.SOLANA,
                            })
                          )
                        )
                      )
                    : o
                      ? a.default.createElement(
                          i.Modal,
                          { isOpen: !0, onClose: e },
                          a.default.createElement(i.ModalOverlay, null),
                          a.default.createElement(
                            i.ModalContent,
                            {
                              className: 'create-solana-account-modal',
                              'data-testid': 'create-solana-account-modal',
                              modalDialogProps: {
                                className: 'create-solana-account-modal__dialog',
                                padding: 0,
                                display: s.Display.Flex,
                                flexDirection: s.FlexDirection.Column,
                              },
                            },
                            a.default.createElement(
                              i.ModalHeader,
                              { padding: 4, onClose: e },
                              t('selectSRP')
                            ),
                            a.default.createElement(
                              i.Box,
                              { paddingLeft: 4, paddingRight: 4, paddingBottom: 4 },
                              a.default.createElement(d.SrpList, {
                                onActionComplete: e => {
                                  k(e), h(!0);
                                },
                              })
                            )
                          )
                        )
                      : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/create-solana-account-modal/create-solana-account-modal.tsx',
      },
    ],
    [
      6551,
      { './create-solana-account-modal': 6550 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'CreateSolanaAccountModal', {
                    enumerable: !0,
                    get: function () {
                      return o.CreateSolanaAccountModal;
                    },
                  });
                var o = e('./create-solana-account-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/create-solana-account-modal/index.ts' },
    ],
    [
      6552,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.DetectedTokensBanner = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = m(e('prop-types')),
                  i = m(e('classnames')),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../selectors'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../component-library');
                function m(e) {
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
                function g() {
                  return (
                    (g = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    g.apply(null, arguments)
                  );
                }
                const h = ({ className: e, actionButtonOnClick: t, ...n }) => {
                  const r = (0, s.useI18nContext)(),
                    m = (0, o.useContext)(u.MetaMetricsContext),
                    f = (0, a.useSelector)(c.getIsTokenNetworkFilterEqualCurrentNetwork),
                    h = (0, a.useSelector)(l.getNetworkConfigurationsByChainId),
                    y = {};
                  Object.keys(h || {}).forEach(e => {
                    y[e] = !0;
                  });
                  const k = (0, a.useSelector)(c.getDetectedTokensInCurrentNetwork),
                    b = (0, a.useSelector)(c.getAllDetectedTokensForSelectedAddress),
                    x = (0, a.useSelector)(l.getCurrentChainId),
                    C = f
                      ? k.map(({ address: e, symbol: t }) => `${t} - ${e}`)
                      : Object.values(b)
                          .flat()
                          .map(({ address: e, symbol: t }) => `${t} - ${e}`),
                    v = f ? k.length : Object.values(b).reduce((e, t) => e + t.length, 0);
                  return o.default.createElement(
                    p.BannerAlert,
                    g(
                      {
                        className: (0, i.default)('multichain-detected-token-banner', e),
                        actionButtonLabel: r('importTokensCamelCase'),
                        actionButtonOnClick: () => {
                          t(),
                            m({
                              event: d.MetaMetricsEventName.TokenImportClicked,
                              category: d.MetaMetricsEventCategory.Wallet,
                              properties: {
                                source_connection_method: d.MetaMetricsTokenEventSource.Detected,
                                tokens: C,
                                chain_id: x,
                              },
                            });
                        },
                        'data-testid': 'detected-token-banner',
                      },
                      n
                    ),
                    1 === v
                      ? r('numberOfNewTokensDetectedSingular')
                      : r('numberOfNewTokensDetectedPlural', [v])
                  );
                };
                (n.DetectedTokensBanner = h),
                  (h.propTypes = {
                    actionButtonOnClick: r.default.func.isRequired,
                    className: r.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/detected-token-banner/detected-token-banner.js',
      },
    ],
    [
      6553,
      { './detected-token-banner': 6552 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'DetectedTokensBanner', {
                    enumerable: !0,
                    get: function () {
                      return o.DetectedTokensBanner;
                    },
                  });
                var o = e('./detected-token-banner');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/detected-token-banner/index.js' },
    ],
    [
      6554,
      { '../../../hooks/useI18nContext': 6985, '../../component-library': 6402, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.DisconnectType = n.DisconnectAllModal = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../hooks/useI18nContext');
                n.DisconnectType = (function (e) {
                  return (
                    (e.Account = 'disconnectAllAccountsText'),
                    (e.Snap = 'disconnectAllSnapsText'),
                    e
                  );
                })({});
                n.DisconnectAllModal = ({ onClick: e, onClose: t }) => {
                  const n = (0, i.useI18nContext)();
                  return a.default.createElement(
                    r.Modal,
                    { isOpen: !0, onClose: t, 'data-testid': 'disconnect-all-modal' },
                    a.default.createElement(r.ModalOverlay, null),
                    a.default.createElement(
                      r.ModalContent,
                      null,
                      a.default.createElement(r.ModalHeader, { onClose: t }, n('disconnect')),
                      a.default.createElement(
                        r.ModalBody,
                        null,
                        a.default.createElement(r.Text, null, n('disconnectAllDescriptionText'))
                      ),
                      a.default.createElement(
                        r.ModalFooter,
                        null,
                        a.default.createElement(
                          r.Button,
                          {
                            onClick: e,
                            startIconName: r.IconName.Logout,
                            block: !0,
                            danger: !0,
                            'data-testid': 'disconnect-all',
                          },
                          n('disconnect')
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
        file: 'ui/components/multichain/disconnect-all-modal/disconnect-all-modal.tsx',
      },
    ],
    [
      6555,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/tooltip': 6818,
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
                  (n.DropdownEditorStyle = n.DropdownEditor = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = c(e('classnames')),
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../hooks/useI18nContext'),
                  l = c(e('../../ui/tooltip'));
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
                let d = (n.DropdownEditorStyle = (function (e) {
                  return (
                    (e[(e.PopoverStyle = 0)] = 'PopoverStyle'),
                    (e[(e.BoxStyle = 1)] = 'BoxStyle'),
                    e
                  );
                })({}));
                n.DropdownEditor = ({
                  title: e,
                  placeholder: t,
                  items: n,
                  selectedItemIndex: c,
                  addButtonText: u,
                  error: p,
                  style: m,
                  onItemSelected: f,
                  onItemDeleted: g,
                  onItemAdd: h,
                  onDropdownOpened: y,
                  itemKey: k,
                  itemIsDeletable: b = () => !0,
                  renderItem: x,
                  renderTooltip: C,
                  buttonDataTestId: v,
                }) => {
                  const T = (0, s.useI18nContext)(),
                    E = (0, o.useRef)(null),
                    [w, _] = (0, o.useState)(!1),
                    M = () =>
                      o.default.createElement(
                        r.Box,
                        null,
                        null == n
                          ? void 0
                          : n.map((e, t) => {
                              const s = o.default.createElement(
                                  r.Box,
                                  {
                                    alignItems: i.AlignItems.center,
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    display: i.Display.Flex,
                                    justifyContent: i.JustifyContent.spaceBetween,
                                    key: k(e),
                                    onClick: () => {
                                      f(t), _(!1);
                                    },
                                    className: (0, a.default)('dropdown-editor__item', {
                                      'dropdown-editor__item--selected': t === c,
                                    }),
                                  },
                                  t === c &&
                                    o.default.createElement(r.Box, {
                                      className: 'dropdown-editor__item-selected-pill',
                                      borderRadius: i.BorderRadius.pill,
                                      backgroundColor: i.BackgroundColor.primaryDefault,
                                    }),
                                  x(e, !0),
                                  b(e, n) &&
                                    o.default.createElement(r.ButtonIcon, {
                                      marginLeft: 1,
                                      ariaLabel: T('delete'),
                                      size: r.ButtonIconSize.Sm,
                                      iconName: r.IconName.Trash,
                                      'data-testid': `delete-item-${t}`,
                                      color: i.IconColor.errorDefault,
                                      onClick: e => {
                                        let o;
                                        e.stopPropagation(),
                                          c === undefined || n.length <= 1
                                            ? (o = undefined)
                                            : t === c
                                              ? (o = 0)
                                              : t > c
                                                ? (o = c)
                                                : t < c && (o = c - 1),
                                          g(t, o);
                                      },
                                    })
                                ),
                                u = C(e, !0);
                              return u
                                ? o.default.createElement(
                                    l.default,
                                    { title: u, position: 'bottom' },
                                    s
                                  )
                                : s;
                            }),
                        o.default.createElement(
                          r.Box,
                          {
                            onClick: h,
                            padding: 4,
                            display: i.Display.Flex,
                            alignItems: i.AlignItems.center,
                            className: 'dropdown-editor__item',
                          },
                          o.default.createElement(r.Icon, {
                            color: i.IconColor.primaryDefault,
                            name: r.IconName.Add,
                            size: r.IconSize.Sm,
                            marginRight: 2,
                          }),
                          o.default.createElement(
                            r.Text,
                            {
                              as: 'button',
                              backgroundColor: i.BackgroundColor.transparent,
                              color: i.TextColor.primaryDefault,
                              variant: i.TextVariant.bodySmMedium,
                            },
                            u
                          )
                        )
                      );
                  let I = i.BorderColor.borderDefault;
                  p ? (I = i.BorderColor.errorDefault) : w && (I = i.BorderColor.primaryDefault),
                    (0, o.useEffect)(() => {
                      w && (null == y || y());
                    }, [w]);
                  const S = null == n ? void 0 : n[c ?? -1],
                    A = S ? C(S, !1) : undefined,
                    N = o.default.createElement(
                      r.Box,
                      {
                        onClick: () => {
                          _(!w);
                        },
                        className: 'dropdown-editor__item-dropdown',
                        display: i.Display.Flex,
                        alignItems: i.AlignItems.center,
                        justifyContent: i.JustifyContent.spaceBetween,
                        borderRadius: i.BorderRadius.LG,
                        borderColor: I,
                        borderWidth: 1,
                        paddingLeft: 4,
                        paddingRight: 4,
                        ref: E,
                      },
                      S
                        ? x(S, !1)
                        : o.default.createElement(r.Input, {
                            className: 'dropdown-editor__item-placeholder',
                            placeholder: t,
                            readOnly: !0,
                            tabIndex: -1,
                            paddingTop: 3,
                            paddingBottom: 3,
                          }),
                      o.default.createElement(r.ButtonIcon, {
                        marginLeft: 'auto',
                        iconName: w ? r.IconName.ArrowUp : r.IconName.ArrowDown,
                        ariaLabel: e,
                        size: r.ButtonIconSize.Md,
                        'data-testid': v,
                      })
                    );
                  return o.default.createElement(
                    r.Box,
                    { paddingTop: 4 },
                    o.default.createElement(r.Label, { variant: i.TextVariant.bodyMdMedium }, e),
                    A ? o.default.createElement(l.default, { title: A, position: 'bottom' }, N) : N,
                    m === d.PopoverStyle
                      ? o.default.createElement(
                          r.Popover,
                          {
                            paddingTop: n && n.length > 0 ? 2 : 0,
                            paddingBottom: n && n.length > 0 ? 2 : 0,
                            paddingLeft: 0,
                            matchWidth: !0,
                            paddingRight: 0,
                            className: 'dropdown-editor__item-popover',
                            referenceElement: E.current,
                            position: r.PopoverPosition.Bottom,
                            isOpen: w,
                            onClickOutside: () => _(!1),
                          },
                          M()
                        )
                      : o.default.createElement(
                          r.Box,
                          {
                            marginTop: 2,
                            display: w ? i.Display.Block : i.Display.None,
                            borderColor: i.BorderColor.borderMuted,
                            borderRadius: i.BorderRadius.LG,
                          },
                          M()
                        )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/dropdown-editor/dropdown-editor.tsx' },
    ],
    [
      6556,
      {
        '..': 6574,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/string-utils': 5878,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.EditAccountsModal = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../hooks/useI18nContext'),
                  r = e('../../component-library'),
                  i = e('..'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../../shared/constants/metametrics'),
                  c = e('../../../contexts/metametrics'),
                  u = e('../../../../shared/modules/string-utils');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.EditAccountsModal = ({
                  accounts: e,
                  defaultSelectedAccountAddresses: t,
                  onClose: n,
                  onSubmit: d,
                }) => {
                  const p = (0, a.useI18nContext)(),
                    m = (0, o.useContext)(c.MetaMetricsContext),
                    [f, g] = (0, o.useState)(!1),
                    [h, y] = (0, o.useState)(t);
                  (0, o.useEffect)(() => {
                    y(t);
                  }, [JSON.stringify(t)]);
                  const k = () => e.length === h.length,
                    b = k(),
                    x = !b && h.length > 0,
                    C = new Set(t),
                    v = new Set(h);
                  return o.default.createElement(
                    r.Modal,
                    {
                      isOpen: !0,
                      onClose: n,
                      'data-testid': 'edit-accounts-modal',
                      className: 'edit-accounts-modal',
                    },
                    o.default.createElement(r.ModalOverlay, null),
                    o.default.createElement(
                      r.ModalContent,
                      null,
                      o.default.createElement(r.ModalHeader, { onClose: n }, p('editAccounts')),
                      o.default.createElement(
                        r.ModalBody,
                        { paddingLeft: 0, paddingRight: 0, className: 'edit-accounts-modal__body' },
                        f
                          ? o.default.createElement(
                              r.Box,
                              { paddingLeft: 4, paddingRight: 4, paddingBottom: 4 },
                              o.default.createElement(i.CreateEthAccount, {
                                onActionComplete: () => g(!1),
                              })
                            )
                          : o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                r.Box,
                                {
                                  padding: 4,
                                  display: s.Display.Flex,
                                  justifyContent: s.JustifyContent.spaceBetween,
                                },
                                o.default.createElement(r.Checkbox, {
                                  label: p('selectAll'),
                                  isChecked: b,
                                  gap: 4,
                                  onClick: () =>
                                    k()
                                      ? void y([])
                                      : (() => {
                                          const t = e.map(({ caipAccountId: e }) => e);
                                          y(t);
                                        })(),
                                  isIndeterminate: x,
                                }),
                                o.default.createElement(
                                  r.ButtonLink,
                                  { onClick: () => g(!0) },
                                  p('newAccount')
                                )
                              ),
                              e.map(e =>
                                o.default.createElement(i.AccountListItem, {
                                  onClick: () =>
                                    (e => {
                                      const t = h.filter(t => !(0, u.isEqualCaseInsensitive)(t, e));
                                      t.length === h.length ? y([...h, e]) : y(t);
                                    })(e.caipAccountId),
                                  account: e,
                                  key: e.caipAccountId,
                                  isPinned: Boolean(e.pinned),
                                  startAccessory: o.default.createElement(r.Checkbox, {
                                    isChecked: h.some(t =>
                                      (0, u.isEqualCaseInsensitive)(t, e.caipAccountId)
                                    ),
                                  }),
                                  selected: !1,
                                })
                              )
                            )
                      ),
                      o.default.createElement(
                        r.ModalFooter,
                        null,
                        0 === h.length
                          ? o.default.createElement(
                              r.Box,
                              {
                                display: s.Display.Flex,
                                flexDirection: s.FlexDirection.Column,
                                gap: 4,
                                width: s.BlockSize.Full,
                                alignItems: s.AlignItems.center,
                              },
                              o.default.createElement(
                                r.Box,
                                {
                                  display: s.Display.Flex,
                                  gap: 1,
                                  alignItems: s.AlignItems.center,
                                },
                                o.default.createElement(r.Icon, {
                                  name: r.IconName.Danger,
                                  size: r.IconSize.Xs,
                                  color: s.IconColor.errorDefault,
                                }),
                                o.default.createElement(
                                  r.Text,
                                  {
                                    variant: s.TextVariant.bodySm,
                                    color: s.TextColor.errorDefault,
                                  },
                                  p('disconnectMessage')
                                )
                              ),
                              o.default.createElement(
                                r.ButtonPrimary,
                                {
                                  'data-testid': 'disconnect-accounts-button',
                                  onClick: () => {
                                    d([]), n();
                                  },
                                  size: r.ButtonPrimarySize.Lg,
                                  block: !0,
                                  danger: !0,
                                },
                                p('disconnect')
                              )
                            )
                          : o.default.createElement(
                              r.ButtonPrimary,
                              {
                                'data-testid': 'connect-more-accounts-button',
                                onClick: () => {
                                  const e = h.filter(e => !C.has(e)),
                                    o = t.filter(e => !v.has(e));
                                  d(h),
                                    m({
                                      category: l.MetaMetricsEventCategory.Permissions,
                                      event: l.MetaMetricsEventName.UpdatePermissionedAccounts,
                                      properties: {
                                        addedAccounts: e.length,
                                        removedAccounts: o.length,
                                        location: 'Edit Accounts Modal',
                                      },
                                    }),
                                    n();
                                },
                                size: r.ButtonPrimarySize.Lg,
                                block: !0,
                              },
                              p('update')
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
        file: 'ui/components/multichain/edit-accounts-modal/edit-accounts-modal.tsx',
      },
    ],
    [
      6557,
      { './edit-accounts-modal': 6556 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'EditAccountsModal', {
                    enumerable: !0,
                    get: function () {
                      return o.EditAccountsModal;
                    },
                  });
                var o = e('./edit-accounts-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/edit-accounts-modal/index.ts' },
    ],
    [
      6558,
      {
        '..': 6574,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.EditNetworksModal = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = (o = e('prop-types')) && o.__esModule ? o : { default: o },
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../component-library'),
                  c = e('..'),
                  u = e('../../../../shared/constants/network'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../../contexts/metametrics');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = ({
                  nonTestNetworks: e,
                  testNetworks: t,
                  defaultSelectedChainIds: n,
                  onClose: o,
                  onSubmit: r,
                }) => {
                  const m = (0, s.useI18nContext)(),
                    f = (0, a.useContext)(p.MetaMetricsContext),
                    g = [...e, ...t],
                    [h, y] = (0, a.useState)(n);
                  (0, a.useEffect)(() => {
                    y(n);
                  }, [JSON.stringify(n)]);
                  const k = e => {
                      h.includes(e) ? y(h.filter(t => t !== e)) : y([...h, e]);
                    },
                    b = () => g.length === h.length,
                    x = b(),
                    C = !x && h.length > 0,
                    v = new Set(n),
                    T = new Set(h);
                  return a.default.createElement(
                    l.Modal,
                    {
                      isOpen: !0,
                      onClose: () => {
                        o();
                      },
                      className: 'edit-networks-modal',
                    },
                    a.default.createElement(l.ModalOverlay, null),
                    a.default.createElement(
                      l.ModalContent,
                      null,
                      a.default.createElement(
                        l.ModalHeader,
                        {
                          onClose: () => {
                            o();
                          },
                        },
                        m('editNetworksTitle')
                      ),
                      a.default.createElement(
                        l.ModalBody,
                        { paddingLeft: 0, paddingRight: 0, className: 'edit-networks-modal__body' },
                        a.default.createElement(
                          l.Box,
                          { padding: 4 },
                          a.default.createElement(l.Checkbox, {
                            label: m('selectAll'),
                            isChecked: x,
                            gap: 4,
                            onClick: () =>
                              b()
                                ? void y([])
                                : (() => {
                                    const e = g.map(({ caipChainId: e }) => e);
                                    y(e);
                                  })(),
                            isIndeterminate: C,
                          })
                        ),
                        e.map(e =>
                          a.default.createElement(c.NetworkListItem, {
                            name: e.name,
                            iconSrc: u.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                            key: e.caipChainId,
                            onClick: () => {
                              k(e.caipChainId);
                            },
                            startAccessory: a.default.createElement(l.Checkbox, {
                              isChecked: h.includes(e.caipChainId),
                            }),
                          })
                        ),
                        a.default.createElement(
                          l.Box,
                          { padding: 4 },
                          a.default.createElement(
                            l.Text,
                            { variant: i.TextVariant.bodyMdMedium },
                            m('testnets')
                          )
                        ),
                        t.map(e =>
                          a.default.createElement(c.NetworkListItem, {
                            name: e.name,
                            iconSrc: u.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.caipChainId],
                            key: e.caipChainId,
                            onClick: () => {
                              k(e.caipChainId);
                            },
                            startAccessory: a.default.createElement(l.Checkbox, {
                              isChecked: h.includes(e.caipChainId),
                            }),
                            showEndAccessory: !1,
                          })
                        )
                      ),
                      a.default.createElement(
                        l.ModalFooter,
                        null,
                        0 === h.length
                          ? a.default.createElement(
                              l.Box,
                              {
                                display: i.Display.Flex,
                                flexDirection: i.FlexDirection.Column,
                                gap: 4,
                                alignItems: i.AlignItems.center,
                                width: i.BlockSize.Full,
                              },
                              a.default.createElement(
                                l.Box,
                                {
                                  display: i.Display.Flex,
                                  gap: 1,
                                  alignItems: i.AlignItems.center,
                                  justifyContent: i.JustifyContent.center,
                                },
                                a.default.createElement(l.Icon, {
                                  name: l.IconName.Danger,
                                  size: l.IconSize.Sm,
                                  color: i.IconColor.errorDefault,
                                }),
                                a.default.createElement(
                                  l.Text,
                                  {
                                    variant: i.TextVariant.bodySm,
                                    color: i.TextColor.errorDefault,
                                  },
                                  m('disconnectMessage')
                                )
                              ),
                              a.default.createElement(
                                l.ButtonPrimary,
                                {
                                  'data-testid': 'disconnect-chains-button',
                                  onClick: () => {
                                    r(h);
                                    const e = h.filter(e => !v.has(e)),
                                      t = n.filter(e => !T.has(e));
                                    f({
                                      category: d.MetaMetricsEventCategory.Permissions,
                                      event: d.MetaMetricsEventName.UpdatePermissionedNetworks,
                                      properties: {
                                        addedNetworks: e.length,
                                        removedNetworks: t.length,
                                        location: 'Edit Networks Modal',
                                      },
                                    }),
                                      o();
                                  },
                                  size: l.ButtonPrimarySize.Lg,
                                  block: !0,
                                  danger: !0,
                                },
                                m('disconnect')
                              )
                            )
                          : a.default.createElement(
                              l.ButtonPrimary,
                              {
                                'data-testid': 'connect-more-chains-button',
                                onClick: () => {
                                  r(h), o();
                                },
                                size: l.ButtonPrimarySize.Lg,
                                block: !0,
                              },
                              m('update')
                            )
                      )
                    )
                  );
                };
                (n.EditNetworksModal = f),
                  (f.propTypes = {
                    nonTestNetworks: r.default.arrayOf(
                      r.default.shape({
                        caipChainId: r.default.string.isRequired,
                        name: r.default.string.isRequired,
                      })
                    ).isRequired,
                    testNetworks: r.default.arrayOf(
                      r.default.shape({
                        caipChainId: r.default.string.isRequired,
                        name: r.default.string.isRequired,
                      })
                    ).isRequired,
                    defaultSelectedChainIds: r.default.arrayOf(r.default.string),
                    onClose: r.default.func.isRequired,
                    onSubmit: r.default.func.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/edit-networks-modal/edit-networks-modal.js',
      },
    ],
    [
      6559,
      { './edit-networks-modal': 6558 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'EditNetworksModal', {
                    enumerable: !0,
                    get: function () {
                      return o.EditNetworksModal;
                    },
                  });
                var o = e('./edit-networks-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/edit-networks-modal/index.js' },
    ],
    [
      6560,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system');
                n.default = ({ icon: e, title: t, description: n, onClick: o }) =>
                  a.default.createElement(
                    r.Box,
                    {
                      display: [i.Display.Flex],
                      gap: 2,
                      alignItems: i.AlignItems.center,
                      onClick: o,
                      className: 'funding-method-item',
                      padding: 4,
                    },
                    a.default.createElement(r.Icon, { name: e }),
                    a.default.createElement(
                      r.Box,
                      { display: [i.Display.Flex], flexDirection: i.FlexDirection.Column },
                      a.default.createElement(r.Text, { variant: i.TextVariant.bodyMdMedium }, t),
                      a.default.createElement(
                        r.Text,
                        { variant: i.TextVariant.bodySm, color: i.TextColor.textAlternative },
                        n
                      )
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/funding-method-modal/funding-method-item.tsx',
      },
    ],
    [
      6561,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/portfolio': 6914,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../component-library': 6402,
        './funding-method-item': 6560,
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
                  (n.FundingMethodModal = void 0);
                var o,
                  a = y(e('react')),
                  r = e('react-redux'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../selectors/multichain'),
                  c = y(e('../../../hooks/ramps/useRamps/useRamps')),
                  u = e('../../../helpers/utils/portfolio'),
                  d = e('../../../selectors'),
                  p = e('../../../hooks/useI18nContext'),
                  m = e('../../../../shared/constants/metametrics'),
                  f = e('../../../contexts/metametrics'),
                  g = (o = e('./funding-method-item')) && o.__esModule ? o : { default: o };
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function y(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = h(t);
                  if (n && n.has(e)) return n.get(e);
                  var o = { __proto__: null },
                    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                      i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                    }
                  return (o.default = e), n && n.set(e, o), o;
                }
                n.FundingMethodModal = ({ isOpen: e, onClose: t, title: n, onClickReceive: o }) => {
                  const h = (0, p.useI18nContext)(),
                    y = (0, a.useContext)(f.MetaMetricsContext),
                    { openBuyCryptoInPdapp: k } = (0, c.default)(),
                    { address: b } = (0, r.useSelector)(d.getSelectedAccount),
                    { chainId: x } = (0, r.useSelector)(l.getMultichainCurrentNetwork),
                    { symbol: C } = (0, r.useSelector)(l.getMultichainDefaultToken),
                    v = (0, r.useSelector)(d.getMetaMetricsId),
                    T = (0, r.useSelector)(d.getParticipateInMetaMetrics),
                    E = (0, r.useSelector)(d.getDataCollectionForMarketing),
                    w = (0, a.useCallback)(() => {
                      y({
                        event: m.MetaMetricsEventName.NavSendButtonClicked,
                        category: m.MetaMetricsEventCategory.Navigation,
                        properties: {
                          location:
                            null === c.RampsMetaMaskEntry || void 0 === c.RampsMetaMaskEntry
                              ? void 0
                              : c.RampsMetaMaskEntry.TokensBanner,
                          text: 'Transfer crypto',
                          chain_id: x,
                          token_symbol: C,
                        },
                      });
                      const e = (0, u.getPortfolioUrl)(
                        'transfer',
                        'ext_funding_method_modal',
                        v,
                        T,
                        E,
                        b,
                        'transfer'
                      );
                      global.platform.openTab({ url: e });
                    }, [v, T, E, x, C, b]),
                    _ = (0, a.useCallback)(() => {
                      y({
                        event: m.MetaMetricsEventName.NavBuyButtonClicked,
                        category: m.MetaMetricsEventCategory.Navigation,
                        properties: {
                          location:
                            null === c.RampsMetaMaskEntry || void 0 === c.RampsMetaMaskEntry
                              ? void 0
                              : c.RampsMetaMaskEntry.TokensBanner,
                          text: 'Buy crypto',
                          chain_id: x,
                          token_symbol: C,
                        },
                      }),
                        k(x);
                    }, [x, C]);
                  return a.default.createElement(
                    i.Modal,
                    { isOpen: e, onClose: t, 'data-testid': 'funding-method-modal' },
                    a.default.createElement(i.ModalOverlay, null),
                    a.default.createElement(
                      i.ModalContent,
                      { modalDialogProps: { padding: 0 } },
                      a.default.createElement(
                        i.ModalHeader,
                        { paddingBottom: 2, onClose: t },
                        a.default.createElement(
                          i.Text,
                          { variant: s.TextVariant.headingSm, textAlign: s.TextAlign.Center },
                          n
                        )
                      ),
                      a.default.createElement(g.default, {
                        icon: i.IconName.Card,
                        title: h('tokenMarketplace'),
                        description: h('debitCreditPurchaseOptions'),
                        onClick: _,
                      }),
                      a.default.createElement(g.default, {
                        icon: i.IconName.Received,
                        title: h('receiveCrypto'),
                        description: h('depositCrypto'),
                        onClick: o,
                      }),
                      a.default.createElement(g.default, {
                        icon: i.IconName.Link,
                        title: h('transferCrypto'),
                        description: h('linkCentralizedExchanges'),
                        onClick: w,
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/funding-method-modal/funding-method-modal.tsx',
      },
    ],
    [
      6562,
      {
        '..': 6574,
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/lib/ui-utils': 5852,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/metamask-notifications/useCounter': 6953,
        '../../../hooks/useI18nContext': 6985,
        '../../../pages/notifications/NewFeatureTag': 7400,
        '../../../selectors': 7601,
        '../../../selectors/identity/profile-syncing': 7600,
        '../../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
        '../notifications-tag-counter': 6641,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.GlobalMenu = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = M(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = (o = e('prop-types')) && o.__esModule ? o : { default: o },
                  i = e('react-router-dom'),
                  s = e('react-redux'),
                  l = e('../../../hooks/metamask-notifications/useCounter'),
                  c = e('../notifications-tag-counter'),
                  u = e('../../../pages/notifications/NewFeatureTag'),
                  d = e('../../../helpers/constants/routes'),
                  p = e('../../../store/actions'),
                  m = e('../../../hooks/useI18nContext'),
                  f = e('../../../selectors/metamask-notifications/metamask-notifications'),
                  g = e('../../../selectors/identity/profile-syncing'),
                  h = e('../../component-library'),
                  y = e('../../ui/menu'),
                  k = e('../../../../app/scripts/lib/util'),
                  b = e('../../../../shared/constants/app'),
                  x = e('../../../../shared/lib/ui-utils'),
                  C = e('../../../helpers/constants/common'),
                  v = e('../../../contexts/metametrics'),
                  T = e('../../../../shared/constants/metametrics'),
                  E = e('../../../selectors'),
                  w = e('../../../helpers/constants/design-system'),
                  _ = e('..');
                function M(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (M = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const I = 'Global Menu',
                  S = ({ closeMenu: e, anchorElement: t, isOpen: n }) => {
                    const o = (0, m.useI18nContext)(),
                      r = (0, s.useDispatch)(),
                      M = (0, a.useContext)(v.MetaMetricsContext),
                      S = (0, s.useSelector)(E.getUseExternalServices),
                      A = (0, i.useHistory)(),
                      { notificationsUnreadCount: N } = (0, l.useUnreadNotificationsCounter)(),
                      { notificationsReadCount: O } = (0, l.useReadNotificationsCounter)(),
                      P = (0, s.useSelector)(E.getSelectedInternalAccount),
                      B = (0, s.useSelector)(E.getUnapprovedTransactions),
                      D = (0, s.useSelector)(f.selectIsMetamaskNotificationsFeatureSeen),
                      j = (0, s.useSelector)(f.selectIsMetamaskNotificationsEnabled),
                      F = (0, s.useSelector)(g.selectIsProfileSyncingEnabled),
                      L = Object.keys(B).length > 0;
                    let R = !1;
                    const $ = (0, s.useSelector)(E.getAnySnapUpdateAvailable);
                    R = (0, s.useSelector)(E.getThirdPartyNotifySnaps).length > 0;
                    let W = o('support'),
                      z = x.SUPPORT_LINK;
                    (W = o('needHelpSubmitTicket')), (z = C.SUPPORT_REQUEST_LINK);
                    const U = a.default.useRef(null);
                    a.default.useEffect(() => {
                      const t = U.current,
                        n = t => {
                          'Tab' !== t.key || t.shiftKey || (t.preventDefault(), e());
                        };
                      return (
                        t && t.addEventListener('keydown', n),
                        () => {
                          t && t.removeEventListener('keydown', n);
                        }
                      );
                    }, [e]);
                    return a.default.createElement(
                      h.Popover,
                      {
                        'data-testid': 'global-menu',
                        referenceElement: t,
                        isOpen: n,
                        padding: 0,
                        onClickOutside: e,
                        onPressEscKey: e,
                        style: { overflow: 'hidden', minWidth: 225 },
                        borderStyle: w.BorderStyle.none,
                        position: h.PopoverPosition.BottomEnd,
                      },
                      S &&
                        a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(
                            y.MenuItem,
                            {
                              iconName: h.IconName.Notification,
                              onClick: () =>
                                (() => {
                                  if (!R && !j)
                                    return (
                                      M({
                                        category:
                                          T.MetaMetricsEventCategory.NotificationsActivationFlow,
                                        event: T.MetaMetricsEventName.NotificationsActivated,
                                        properties: {
                                          action_type: 'started',
                                          is_profile_syncing_enabled: F,
                                        },
                                      }),
                                      r((0, p.showConfirmTurnOnMetamaskNotifications)()),
                                      void e()
                                    );
                                  M({
                                    category: T.MetaMetricsEventCategory.NotificationInteraction,
                                    event: T.MetaMetricsEventName.NotificationsMenuOpened,
                                    properties: { unread_count: N, read_count: O },
                                  }),
                                    A.push(d.NOTIFICATIONS_ROUTE),
                                    e();
                                })(),
                              'data-testid': 'notifications-menu-item',
                            },
                            a.default.createElement(
                              h.Box,
                              {
                                display: w.Display.Flex,
                                flexDirection: w.FlexDirection.Row,
                                alignItems: w.AlignItems.center,
                                justifyContent: w.JustifyContent.spaceBetween,
                              },
                              o('notifications'),
                              0 === N && !D && a.default.createElement(u.NewFeatureTag, null),
                              a.default.createElement(c.NotificationsTagCounter, null)
                            )
                          ),
                          a.default.createElement(h.Box, {
                            borderColor: w.BorderColor.borderMuted,
                            width: w.BlockSize.Full,
                            style: { height: '1px', borderBottomWidth: 0 },
                          })
                        ),
                      P &&
                        a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(_.AccountDetailsMenuItem, {
                            metricsLocation: I,
                            closeMenu: e,
                            address: P.address,
                          }),
                          a.default.createElement(_.ViewExplorerMenuItem, {
                            metricsLocation: I,
                            closeMenu: e,
                            account: P,
                          })
                        ),
                      a.default.createElement(h.Box, {
                        borderColor: w.BorderColor.borderMuted,
                        width: w.BlockSize.Full,
                        style: { height: '1px', borderBottomWidth: 0 },
                      }),
                      a.default.createElement(
                        y.MenuItem,
                        {
                          iconName: h.IconName.SecurityTick,
                          onClick: () => {
                            A.push(d.PERMISSIONS),
                              M({
                                event: T.MetaMetricsEventName.NavPermissionsOpened,
                                category: T.MetaMetricsEventCategory.Navigation,
                                properties: { location: I },
                              }),
                              e();
                          },
                          'data-testid': 'global-menu-connected-sites',
                          disabled: L,
                        },
                        o('allPermissions')
                      ),
                      (0, k.getEnvironmentType)() === b.ENVIRONMENT_TYPE_FULLSCREEN
                        ? null
                        : a.default.createElement(
                            y.MenuItem,
                            {
                              iconName: h.IconName.Expand,
                              onClick: () => {
                                global.platform.openExtensionInBrowser(),
                                  M({
                                    event: T.MetaMetricsEventName.AppWindowExpanded,
                                    category: T.MetaMetricsEventCategory.Navigation,
                                    properties: { location: I },
                                  }),
                                  e();
                              },
                              'data-testid': 'global-menu-expand',
                            },
                            o('expandView')
                          ),
                      a.default.createElement(
                        y.MenuItem,
                        {
                          iconName: h.IconName.Snaps,
                          onClick: () => {
                            A.push(d.SNAPS_ROUTE), e();
                          },
                          showInfoDot: $,
                        },
                        o('snaps')
                      ),
                      a.default.createElement(
                        y.MenuItem,
                        {
                          iconName: h.IconName.MessageQuestion,
                          onClick: () => {
                            global.platform.openTab({ url: z }),
                              M(
                                {
                                  category: T.MetaMetricsEventCategory.Home,
                                  event: T.MetaMetricsEventName.SupportLinkClicked,
                                  properties: { url: z, location: I },
                                },
                                {
                                  contextPropsIntoEventProperties: [
                                    T.MetaMetricsContextProp.PageTitle,
                                  ],
                                }
                              ),
                              e();
                          },
                          'data-testid': 'global-menu-support',
                        },
                        W
                      ),
                      a.default.createElement(
                        y.MenuItem,
                        {
                          iconName: h.IconName.Setting,
                          disabled: L,
                          onClick: () => {
                            A.push(d.SETTINGS_ROUTE),
                              M({
                                category: T.MetaMetricsEventCategory.Navigation,
                                event: T.MetaMetricsEventName.NavSettingsOpened,
                                properties: { location: I },
                              }),
                              e();
                          },
                          'data-testid': 'global-menu-settings',
                        },
                        o('settings')
                      ),
                      a.default.createElement(
                        y.MenuItem,
                        {
                          ref: U,
                          iconName: h.IconName.Lock,
                          onClick: () => {
                            r((0, p.lockMetamask)()),
                              A.push(d.DEFAULT_ROUTE),
                              M({
                                category: T.MetaMetricsEventCategory.Navigation,
                                event: T.MetaMetricsEventName.AppLocked,
                                properties: { location: I },
                              }),
                              e();
                          },
                          'data-testid': 'global-menu-lock',
                        },
                        o('lockMetaMask')
                      )
                    );
                  };
                (n.GlobalMenu = S),
                  (S.propTypes = {
                    anchorElement: r.default.instanceOf(window.Element),
                    closeMenu: r.default.func.isRequired,
                    isOpen: r.default.bool.isRequired,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/global-menu/global-menu.js' },
    ],
    [
      6563,
      { './global-menu': 6562 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'GlobalMenu', {
                    enumerable: !0,
                    get: function () {
                      return o.GlobalMenu;
                    },
                  });
                var o = e('./global-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/global-menu/index.js' },
    ],
    [
      6564,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = p);
                var o = d(e('prop-types')),
                  a = d(e('react')),
                  r = e('react-redux'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('../../../store/actions'));
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
                function p({ importAccountFunc: e, isPrimaryDisabled: t, onActionComplete: n }) {
                  const o = (0, l.useI18nContext)(),
                    u = (0, r.useDispatch)();
                  return a.default.createElement(
                    i.Box,
                    { display: s.Display.Flex, gap: 4 },
                    a.default.createElement(
                      i.ButtonSecondary,
                      {
                        onClick: () => {
                          u(c.hideWarning()), n();
                        },
                        size: i.ButtonSecondarySize.Lg,
                        block: !0,
                      },
                      o('cancel')
                    ),
                    a.default.createElement(
                      i.ButtonPrimary,
                      {
                        onClick: async () => {
                          try {
                            (await e()) && n(!0);
                          } catch (e) {}
                        },
                        disabled: t,
                        size: i.ButtonSecondarySize.Lg,
                        'data-testid': 'import-account-confirm-button',
                        block: !0,
                      },
                      o('import')
                    )
                  );
                }
                p.propTypes = {
                  importAccountFunc: o.default.func.isRequired,
                  isPrimaryDisabled: o.default.bool.isRequired,
                  onActionComplete: o.default.func.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-account/bottom-buttons.js' },
    ],
    [
      6565,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/error': 5860,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/dropdown': 6732,
        './json': 6567,
        './private-key': 6568,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ImportAccount = void 0);
                var o = x(e('react')),
                  a = k(e('prop-types')),
                  r = e('react-redux'),
                  i = e('../../../../shared/modules/error'),
                  s = e('../../../../shared/constants/metametrics'),
                  l = e('../../component-library'),
                  c = k(e('../../ui/dropdown')),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../helpers/constants/design-system'),
                  p = k(e('../../../helpers/constants/zendesk-url')),
                  m = e('../../../hooks/useI18nContext'),
                  f = x(e('../../../store/actions')),
                  g = e('../../../selectors/selectors'),
                  h = k(e('./json')),
                  y = k(e('./private-key'));
                function k(e) {
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
                function x(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = b(t);
                  if (n && n.has(e)) return n.get(e);
                  var o = { __proto__: null },
                    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                      i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                    }
                  return (o.default = e), n && n.set(e, o), o;
                }
                const C = ({ onActionComplete: e }) => {
                  const t = (0, m.useI18nContext)(),
                    n = (0, r.useDispatch)(),
                    a = (0, o.useContext)(u.MetaMetricsContext),
                    k = (0, r.useSelector)(g.getHDEntropyIndex),
                    b = [t('privateKey'), t('jsonFile')],
                    [x, C] = (0, o.useState)(b[0]);
                  async function v(a, r) {
                    const s = (function (e) {
                      if ('json' === e)
                        return o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(
                            l.Text,
                            { width: d.BlockSize.ThreeFourths, fontWeight: d.FontWeight.Bold },
                            t('importAccountJsonLoading1')
                          ),
                          o.default.createElement(
                            l.Text,
                            { width: d.BlockSize.ThreeFourths, fontWeight: d.FontWeight.Bold },
                            t('importAccountJsonLoading2')
                          )
                        );
                      return '';
                    })(a);
                    try {
                      const { selectedAddress: o } = await n(f.importNewAccount(a, r, s));
                      if (!o) return n(f.displayWarning(t('importAccountError'))), !1;
                      T(a, !0), n(f.hideWarning()), e(!0);
                    } catch (e) {
                      const o = (0, i.getErrorMessage)(e);
                      return (
                        T(a, o),
                        (function (e) {
                          e && !e.startsWith('t(')
                            ? n(f.displayWarning(e))
                            : n(f.displayWarning(t(e.slice(3, -2))));
                        })(o),
                        !1
                      );
                    }
                    return !0;
                  }
                  function T(e, t) {
                    const n =
                        'Private Key' === e
                          ? s.MetaMetricsEventAccountImportType.PrivateKey
                          : s.MetaMetricsEventAccountImportType.Json,
                      o = t
                        ? s.MetaMetricsEventName.AccountAdded
                        : s.MetaMetricsEventName.AccountAddFailed;
                    a({
                      category: s.MetaMetricsEventCategory.Accounts,
                      event: o,
                      properties: {
                        account_type: s.MetaMetricsEventAccountType.Imported,
                        account_import_type: n,
                        hd_entropy_index: k,
                      },
                    });
                  }
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      l.Text,
                      { variant: d.TextVariant.bodySm, marginTop: 2 },
                      t('importAccountMsg'),
                      ' ',
                      o.default.createElement(
                        l.ButtonLink,
                        {
                          size: d.Size.inherit,
                          href: p.default.IMPORTED_ACCOUNTS,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        },
                        t('here')
                      )
                    ),
                    o.default.createElement(
                      l.Box,
                      { paddingTop: 4, paddingBottom: 8 },
                      o.default.createElement(
                        l.Label,
                        {
                          width: d.BlockSize.Full,
                          marginBottom: 4,
                          justifyContent: d.JustifyContent.spaceBetween,
                        },
                        t('selectType'),
                        o.default.createElement(c.default, {
                          options: b.map(e => ({ value: e })),
                          selectedOption: x,
                          onChange: e => {
                            n(f.hideWarning()), C(e);
                          },
                        })
                      ),
                      x === b[0]
                        ? o.default.createElement(y.default, {
                            importAccountFunc: v,
                            onActionComplete: e,
                          })
                        : o.default.createElement(h.default, {
                            importAccountFunc: v,
                            onActionComplete: e,
                          })
                    )
                  );
                };
                (n.ImportAccount = C),
                  (C.propTypes = { onActionComplete: a.default.func.isRequired });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-account/import-account.js' },
    ],
    [
      6566,
      { './import-account': 6565 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ImportAccount', {
                    enumerable: !0,
                    get: function () {
                      return o.ImportAccount;
                    },
                  });
                var o = e('./import-account');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-account/index.js' },
    ],
    [
      6567,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../component-library/form-text-field/deprecated': 6390,
        './bottom-buttons': 6564,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
        'react-simple-file-input': 5323,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = h);
                var o = g(e('prop-types')),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  i = g(e('react-simple-file-input')),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../component-library/form-text-field/deprecated'),
                  u = g(e('../../../helpers/constants/zendesk-url')),
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../store/actions'),
                  m = g(e('./bottom-buttons'));
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function h({ importAccountFunc: e, onActionComplete: t }) {
                  const n = (0, d.useI18nContext)(),
                    o = (0, r.useSelector)(e => e.appState.warning),
                    [f, g] = (0, a.useState)(''),
                    [h, y] = (0, a.useState)(''),
                    k = '' === h;
                  function b() {
                    k ? (0, p.displayWarning)(n('needImportFile')) : e('json', [h, f]);
                  }
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      s.Text,
                      { variant: l.TextVariant.bodyMd, textAlign: l.TextAlign.Center },
                      n('usedByClients'),
                      a.default.createElement(
                        s.ButtonLink,
                        {
                          size: l.Size.inherit,
                          href: u.default.IMPORTED_ACCOUNTS,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        },
                        n('fileImportFail')
                      )
                    ),
                    a.default.createElement(i.default, {
                      id: 'file-input',
                      'data-testid': 'file-input',
                      readAs: 'text',
                      onLoad: e => y(e.target.result),
                      style: {
                        padding: '20px 0px 12px 15%',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                      },
                    }),
                    a.default.createElement(c.FormTextField, {
                      id: 'json-password-box',
                      size: s.TextFieldSize.Lg,
                      autoFocus: !0,
                      type: s.TextFieldType.Password,
                      helpText: o,
                      error: !0,
                      placeholder: n('enterOptionalPassword'),
                      value: f,
                      onChange: e => {
                        g(e.target.value);
                      },
                      inputProps: {
                        onKeyPress: function (e) {
                          k || 'Enter' !== e.key || (e.preventDefault(), b());
                        },
                      },
                      marginBottom: 4,
                    }),
                    a.default.createElement(m.default, {
                      importAccountFunc: b,
                      isPrimaryDisabled: k,
                      onActionComplete: t,
                    })
                  );
                }
                h.propTypes = {
                  importAccountFunc: o.default.func.isRequired,
                  onActionComplete: o.default.func.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-account/json.js' },
    ],
    [
      6568,
      {
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/show-hide-toggle': 6798,
        './bottom-buttons': 6564,
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
                var o = p(e('prop-types')),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  i = e('../../component-library'),
                  s = e('../../../store/actions'),
                  l = e('../../../hooks/useI18nContext'),
                  c = p(e('../../ui/show-hide-toggle')),
                  u = p(e('./bottom-buttons'));
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
                function m({ importAccountFunc: e, onActionComplete: t }) {
                  const n = (0, l.useI18nContext)(),
                    o = (0, r.useDispatch)(),
                    [d, p] = (0, a.useState)(''),
                    [m, f] = (0, a.useState)(!1);
                  (0, a.useEffect)(
                    () => () => {
                      o((0, s.hideWarning)());
                    },
                    [o]
                  );
                  const g = (0, r.useSelector)(e => e.appState.warning);
                  function h() {
                    e('privateKey', [d]);
                  }
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(i.FormTextField, {
                      id: 'private-key-box',
                      size: i.TextFieldSize.Lg,
                      autoFocus: !0,
                      helpText: g,
                      error: !0,
                      label: n('pastePrivateKey'),
                      value: d,
                      onChange: e => p(e.target.value),
                      inputProps: {
                        onKeyPress: function (e) {
                          '' !== d && 'Enter' === e.key && (e.preventDefault(), h());
                        },
                      },
                      marginBottom: 4,
                      type: m ? i.TextFieldType.Text : i.TextFieldType.Password,
                      textFieldProps: {
                        endAccessory: a.default.createElement(c.default, {
                          shown: m,
                          id: 'show-hide-private-key',
                          title: n('privateKeyShow'),
                          ariaLabelShown: n('privateKeyShown'),
                          ariaLabelHidden: n('privateKeyHidden'),
                          onChange: () => f(!m),
                        }),
                      },
                    }),
                    a.default.createElement(u.default, {
                      importAccountFunc: h,
                      isPrimaryDisabled: '' === d,
                      onActionComplete: t,
                    })
                  );
                }
                m.propTypes = {
                  importAccountFunc: o.default.func.isRequired,
                  onActionComplete: o.default.func.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-account/private-key.js' },
    ],
    [
      6569,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/error': 5860,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useNftsCollections': 6998,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../app/assets/nfts/nfts-detection-notice-import-nfts/nfts-detection-notice-import-nfts': 5946,
        '../../component-library': 6402,
        '../../component-library/form-text-field/deprecated': 6390,
        '../../component-library/modal-content/deprecated': 6412,
        '../../component-library/modal-header/deprecated': 6421,
        '../../ui/tooltip': 6818,
        '@metamask/controller-utils': 1515,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ImportNftsModal = void 0);
                var o = e('@metamask/controller-utils'),
                  a = I(e('prop-types')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = M(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  i = e('react-redux'),
                  s = e('react-router-dom'),
                  l = e('../../../../shared/modules/error'),
                  c = e('../../../../shared/constants/metametrics'),
                  u = e('../../../../shared/constants/transaction'),
                  d = e('../../../contexts/metametrics'),
                  p = e('../../../ducks/metamask/metamask'),
                  m = e('../../../helpers/constants/design-system'),
                  f = e('../../../helpers/constants/routes'),
                  g = e('../../../hooks/useI18nContext'),
                  h = e('../../../../shared/modules/selectors/networks'),
                  y = e('../../../selectors'),
                  k = e('../../../store/actions'),
                  b = I(
                    e(
                      '../../app/assets/nfts/nfts-detection-notice-import-nfts/nfts-detection-notice-import-nfts'
                    )
                  ),
                  x = e('../../component-library'),
                  C = e('../../component-library/form-text-field/deprecated'),
                  v = e('../../component-library/modal-content/deprecated'),
                  T = e('../../component-library/modal-header/deprecated'),
                  E = I(e('../../ui/tooltip')),
                  w = e('../../../hooks/useNftsCollections'),
                  _ = e('../../../helpers/utils/util');
                function M(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (M = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function I(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const S = ({ onClose: e }) => {
                  const t = (0, g.useI18nContext)(),
                    n = (0, s.useHistory)(),
                    a = (0, i.useDispatch)(),
                    M = (0, i.useSelector)(y.getOpenSeaEnabled),
                    I = (0, i.useSelector)(y.getIsMainnet),
                    S = (0, i.useSelector)(p.getNftsDropdownState),
                    A = (0, i.useSelector)(y.getSelectedInternalAccount),
                    N = (0, i.useSelector)(h.getCurrentChainId),
                    {
                      tokenAddress: O,
                      tokenId: P,
                      ignoreErc20Token: B,
                    } = (0, i.useSelector)(e => e.appState.importNftsModal),
                    D = (0, w.useNftsCollections)(),
                    [j, F] = (0, r.useState)(O ?? ''),
                    [L, R] = (0, r.useState)(P ?? ''),
                    [$, W] = (0, r.useState)(!0),
                    [z, U] = (0, r.useState)(!1),
                    V = (0, r.useContext)(d.MetaMetricsContext),
                    [H, G] = (0, r.useState)(null),
                    [K, J] = (0, r.useState)(null);
                  return r.default.createElement(
                    x.Modal,
                    {
                      isOpen: !0,
                      onClose: () => {
                        e();
                      },
                      className: 'import-nfts-modal',
                    },
                    r.default.createElement(x.ModalOverlay, null),
                    r.default.createElement(
                      v.ModalContent,
                      null,
                      r.default.createElement(
                        T.ModalHeader,
                        {
                          onClose: () => {
                            e();
                          },
                        },
                        t('importNFT')
                      ),
                      r.default.createElement(
                        x.Box,
                        null,
                        I && !M
                          ? r.default.createElement(
                              x.Box,
                              { marginTop: 6 },
                              r.default.createElement(b.default, { onActionButtonClick: e })
                            )
                          : null,
                        z &&
                          r.default.createElement(
                            x.Box,
                            { marginTop: 6 },
                            r.default.createElement(
                              x.BannerAlert,
                              {
                                severity: m.Severity.Danger,
                                onClose: () => U(!1),
                                closeButtonProps: { 'data-testid': 'add-nft-error-close' },
                              },
                              t('nftAddFailedMessage')
                            )
                          ),
                        r.default.createElement(
                          x.Box,
                          {
                            display: m.Display.Flex,
                            flexDirection: m.FlexDirection.Column,
                            gap: 6,
                            marginTop: 6,
                            marginBottom: 6,
                          },
                          r.default.createElement(
                            x.Box,
                            null,
                            r.default.createElement(
                              x.Box,
                              {
                                display: m.Display.Flex,
                                justifyContent: m.JustifyContent.spaceBetween,
                                alignItems: m.AlignItems.flexEnd,
                              },
                              r.default.createElement(
                                x.Box,
                                { display: m.Display.Flex, alignItems: m.AlignItems.center },
                                r.default.createElement(
                                  x.Label,
                                  { htmlFor: 'address' },
                                  t('address')
                                ),
                                r.default.createElement(
                                  E.default,
                                  { title: t('importNFTAddressToolTip'), position: 'bottom' },
                                  r.default.createElement(x.Icon, {
                                    name: x.IconName.Info,
                                    size: x.IconSize.Sm,
                                    marginLeft: 1,
                                    color: m.IconColor.iconAlternative,
                                  })
                                )
                              )
                            ),
                            r.default.createElement(C.FormTextField, {
                              autoFocus: !0,
                              dataTestId: 'address',
                              id: 'address',
                              placeholder: '0x...',
                              value: j,
                              onChange: e => {
                                var n;
                                (n = e.target.value),
                                  G(null),
                                  n && !(0, o.isValidHexAddress)(n) && G(t('invalidAddress')),
                                  W(!(0, o.isValidHexAddress)(n) || !L),
                                  F(n),
                                  U(!1);
                              },
                              helpText: H,
                              error: Boolean(H),
                            })
                          ),
                          r.default.createElement(
                            x.Box,
                            null,
                            r.default.createElement(
                              x.Box,
                              {
                                display: m.Display.Flex,
                                justifyContent: m.JustifyContent.spaceBetween,
                                alignItems: m.AlignItems.flexEnd,
                              },
                              r.default.createElement(
                                x.Box,
                                { display: m.Display.Flex, alignItems: m.AlignItems.center },
                                r.default.createElement(
                                  x.Label,
                                  { htmlFor: 'token-id' },
                                  t('tokenId')
                                ),
                                r.default.createElement(
                                  E.default,
                                  { title: t('importNFTTokenIdToolTip'), position: 'bottom' },
                                  r.default.createElement(x.Icon, {
                                    name: x.IconName.Info,
                                    size: x.IconSize.Sm,
                                    marginLeft: 1,
                                    color: m.IconColor.iconAlternative,
                                  })
                                )
                              )
                            ),
                            r.default.createElement(C.FormTextField, {
                              dataTestId: 'token-id',
                              id: 'token-id',
                              placeholder: t('nftTokenIdPlaceholder'),
                              value: L,
                              onChange: e => {
                                (e => {
                                  J(null);
                                  const n = (0, _.checkTokenIdExists)(j, e, D.collections);
                                  n && J(t('nftAlreadyAdded')),
                                    W(!(0, o.isValidHexAddress)(j) || !e || isNaN(Number(e)) || n),
                                    R(e);
                                })(e.target.value),
                                  U(!1);
                              },
                              helpText: K,
                              error: K,
                            })
                          )
                        )
                      ),
                      r.default.createElement(
                        x.Box,
                        {
                          display: m.Display.Flex,
                          flexDirection: m.FlexDirection.Row,
                          justifyContent: m.JustifyContent.spaceBetween,
                          gap: 4,
                          paddingTop: 4,
                          paddingBottom: 4,
                        },
                        r.default.createElement(
                          x.ButtonSecondary,
                          {
                            size: x.ButtonSecondarySize.Lg,
                            onClick: () => e(),
                            block: !0,
                            className: 'import-nfts-modal__cancel-button',
                          },
                          t('cancel')
                        ),
                        r.default.createElement(
                          x.ButtonPrimary,
                          {
                            size: m.Size.LG,
                            onClick: () =>
                              (async () => {
                                try {
                                  var t;
                                  await a((0, k.addNftVerifyOwnership)(j, L));
                                  const e = {
                                    ...S,
                                    [A.address]: {
                                      ...(null == S ? void 0 : S[A.address]),
                                      [N]: {
                                        ...(null == S || null === (t = S[A.address]) || void 0 === t
                                          ? void 0
                                          : t[N]),
                                        [j]: !0,
                                      },
                                    },
                                  };
                                  a((0, k.updateNftDropDownState)(e));
                                } catch (e) {
                                  const t = (0, l.getErrorMessage)(e);
                                  return a((0, k.setNewNftAddedMessage)(t)), void U(!0);
                                }
                                B &&
                                  j &&
                                  (await a(
                                    (0, k.ignoreTokens)({
                                      tokensToIgnore: j,
                                      dontShowLoadingIndicator: !0,
                                    })
                                  )),
                                  a((0, k.setNewNftAddedMessage)('success'));
                                const o = await (0, k.getTokenStandardAndDetails)(
                                  j,
                                  null,
                                  L.toString()
                                ).catch(() => ({}));
                                V({
                                  event: c.MetaMetricsEventName.TokenAdded,
                                  category: 'Wallet',
                                  sensitiveProperties: {
                                    token_contract_address: j,
                                    token_symbol: null == o ? void 0 : o.symbol,
                                    tokenId: L.toString(),
                                    asset_type: u.AssetType.NFT,
                                    token_standard: null == o ? void 0 : o.standard,
                                    source_connection_method: c.MetaMetricsTokenEventSource.Custom,
                                  },
                                }),
                                  n.push(f.DEFAULT_ROUTE),
                                  e();
                              })(),
                            disabled: $,
                            block: !0,
                            'data-testid': 'import-nfts-modal-import-button',
                          },
                          t('import')
                        )
                      )
                    )
                  );
                };
                (n.ImportNftsModal = S), (S.propTypes = { onClose: a.default.func.isRequired });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/import-nfts-modal/import-nfts-modal.js',
      },
    ],
    [
      6570,
      { './import-nfts-modal': 6569 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ImportNftsModal', {
                    enumerable: !0,
                    get: function () {
                      return o.ImportNftsModal;
                    },
                  });
                var o = e('./import-nfts-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-nfts-modal/index.js' },
    ],
    [
      6571,
      {
        '../../../../shared/constants/network': 5804,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/token-balance/token-balance': 6817,
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
                  (n.ImportTokensModalConfirm = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = p(e('prop-types')),
                  i = e('../../../selectors'),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = p(e('../../ui/token-balance/token-balance')),
                  u = e('../../../contexts/i18n'),
                  d = e('../../../../shared/constants/network');
                function p(e) {
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
                const f = ({ networkFilter: e }) => {
                  const t = (0, o.useContext)(u.I18nContext),
                    n = (0, a.useSelector)(i.getCurrentNetwork),
                    r = (0, a.useSelector)(i.getTestNetworkBackgroundColor),
                    p = (0, a.useSelector)(i.getPendingTokens),
                    m = (0, a.useSelector)(i.selectERC20TokensByChain),
                    f = 1 === Object.keys(e).length && e[null == n ? void 0 : n.chainId];
                  return o.default.createElement(
                    s.Box,
                    { paddingTop: 6 },
                    o.default.createElement(
                      s.Text,
                      { textAlign: l.TextAlign.Center },
                      1 === Object.keys(p).length ? t('likeToImportToken') : t('likeToImportTokens')
                    ),
                    o.default.createElement(
                      s.Box,
                      { paddingTop: 6 },
                      o.default.createElement(
                        s.Box,
                        {
                          flexDirection: l.FlexDirection.Column,
                          className: 'import-tokens-modal__confirmation-list',
                        },
                        Object.entries(p).map(([e, t]) => {
                          var a, i;
                          const { name: u, symbol: g, iconUrl: h, chainId: y } = t,
                            k =
                              h ||
                              (null == m ||
                              null === (a = m[y]) ||
                              void 0 === a ||
                              null === (a = a.data[e.toLowerCase()]) ||
                              void 0 === a
                                ? void 0
                                : a.iconUrl);
                          return o.default.createElement(
                            s.Box,
                            { key: e, padding: 4, display: l.Display.Flex },
                            o.default.createElement(
                              s.Box,
                              {
                                display: l.Display.Flex,
                                className: 'import-tokens-modal__confirm-token-list-item-wrapper',
                              },
                              o.default.createElement(
                                s.BadgeWrapper,
                                {
                                  badge: o.default.createElement(s.AvatarNetwork, {
                                    size: s.AvatarNetworkSize.Xs,
                                    name: null == n ? void 0 : n.nickname,
                                    src: d.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[
                                      null === (i = p[e]) || void 0 === i ? void 0 : i.chainId
                                    ],
                                    backgroundColor: r,
                                  }),
                                  marginRight: 4,
                                  marginTop: 1,
                                },
                                o.default.createElement(s.AvatarToken, { name: g, src: k })
                              ),
                              o.default.createElement(
                                s.Box,
                                null,
                                o.default.createElement(
                                  s.Text,
                                  {
                                    fontWeight: l.FontWeight.Medium,
                                    variant: l.TextVariant.bodyMd,
                                  },
                                  u || g
                                ),
                                f
                                  ? o.default.createElement(
                                      s.Text,
                                      {
                                        variant: l.TextVariant.bodySm,
                                        color: l.TextColor.textAlternative,
                                      },
                                      o.default.createElement(c.default, {
                                        token: t,
                                        displayZeroBalance: !0,
                                      })
                                    )
                                  : null
                              )
                            ),
                            f
                              ? o.default.createElement(
                                  s.Box,
                                  { alignItems: l.AlignItems.flexStart },
                                  o.default.createElement(c.default, {
                                    textProps: {
                                      font: l.FontWeight.Medium,
                                      variant: l.TextVariant.bodyLgMedium,
                                    },
                                    suffixProps: {
                                      font: l.FontWeight.Medium,
                                      variant: l.TextVariant.bodyLgMedium,
                                    },
                                    token: t,
                                    showFiat: !0,
                                  })
                                )
                              : null
                          );
                        })
                      )
                    )
                  );
                };
                (n.ImportTokensModalConfirm = f),
                  (f.propTypes = { networkFilter: r.default.object.isRequired });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/import-tokens-modal/import-tokens-modal-confirm.js',
      },
    ],
    [
      6572,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/tokens': 5818,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../helpers/utils/token-util': 6918,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '../../app/import-token/network-filter-import-token': 6031,
        '../../app/import-token/network-selector-custom-import': 6034,
        '../../app/import-token/token-list': 6035,
        '../../app/import-token/token-list/token-list-placeholder': 6036,
        '../../app/import-token/token-search': 6040,
        '../../component-library': 6402,
        '../../component-library/form-text-field/deprecated': 6390,
        '../../ui/tabs': 6806,
        '../network-list-item': 6589,
        './import-tokens-modal-confirm': 6571,
        '@metamask/etherscan-link/dist/token-tracker-link': 1941,
        '@metamask/transaction-controller': 2946,
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
                  (n.ImportTokensModal = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = L(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = F(e('prop-types')),
                  s = e('@metamask/etherscan-link/dist/token-tracker-link'),
                  l = e('@metamask/transaction-controller'),
                  c = e('../../ui/tabs'),
                  u = e('../../../hooks/useI18nContext'),
                  d = e('../../../../shared/modules/selectors/networks'),
                  p = e('../../../selectors'),
                  m = e('../../../store/actions'),
                  f = e('../../component-library'),
                  g = e('../../component-library/form-text-field/deprecated'),
                  h = F(e('../../app/import-token/token-search')),
                  y = F(e('../../app/import-token/token-list')),
                  k = e('../../../helpers/constants/design-system'),
                  b = e('../../../helpers/constants/routes'),
                  x = F(e('../../../helpers/constants/zendesk-url')),
                  C = e('../../../../shared/modules/hexstring-utils'),
                  v = e('../../../../app/scripts/lib/util'),
                  T = e('../../../../shared/constants/tokens'),
                  E = e('../../../../shared/constants/transaction'),
                  w = e('../../../helpers/utils/util'),
                  _ = e('../../../helpers/utils/token-util'),
                  M = e('../../../contexts/metametrics'),
                  I = e('../../../ducks/metamask/metamask'),
                  S = e('../../../../shared/constants/metametrics'),
                  A = e('../../app/import-token/network-filter-import-token'),
                  N = e('../../../../shared/constants/network'),
                  O = e('../../app/import-token/network-selector-custom-import'),
                  P = e('../../../selectors/multichain'),
                  B = e('../network-list-item'),
                  D = F(e('../../app/import-token/token-list/token-list-placeholder')),
                  j = e('./import-tokens-modal-confirm');
                function F(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function L(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (L = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const R = {
                    IMPORT_TOKEN: 'IMPORT_TOKEN',
                    NETWORK_SELECTOR: 'NETWORK_SELECTOR',
                    SEARCH_NETWORK_SELECTOR: 'SEARCH_NETWORK_SELECTOR',
                  },
                  $ = 'search',
                  W = 'customToken',
                  z = ({ onClose: e }) => {
                    var t, n, i;
                    const F = (0, u.useI18nContext)(),
                      L = (0, r.useHistory)(),
                      z = (0, a.useDispatch)(),
                      [U, V] = (0, o.useState)(''),
                      [H, G] = (0, o.useState)(null),
                      [K, J] = (0, o.useState)({}),
                      [q, X] = (0, o.useState)([]),
                      Y = (0, a.useSelector)(p.getCurrentNetwork),
                      [Z, Q] = (0, o.useState)(null),
                      [ee, te] = (0, o.useState)($),
                      ne = (0, a.useSelector)(d.getNetworkConfigurationsByChainId),
                      [oe, ae] = (0, o.useState)(R.CUSTOM_IMPORT),
                      re = (0, a.useSelector)(p.getTokenNetworkFilter),
                      [ie, se] = (0, o.useState)(re),
                      le = (0, a.useSelector)(p.getIsTokenDetectionSupported),
                      ce = (0, a.useSelector)(p.getIsTokenDetectionInactiveOnMainnet),
                      ue = le || ce || Boolean(!1),
                      de = (0, a.useSelector)(p.selectERC20TokensByChain),
                      pe = (0, a.useSelector)(({ metamask: e }) => e.useTokenDetection),
                      me = (0, a.useSelector)(p.getTokenDetectionSupportNetworkByChainId),
                      fe = (0, a.useSelector)(I.getNativeCurrency),
                      ge = (0, a.useSelector)(
                        p.getIstokenDetectionInactiveOnNonMainnetSupportedNetwork
                      ),
                      he = (0, a.useSelector)(p.getIsDynamicTokenListAvailable),
                      ye = (0, a.useSelector)(p.getSelectedInternalAccount),
                      ke = (0, a.useSelector)(p.getInternalAccounts),
                      be = (0, a.useSelector)(e => e.metamask.tokens),
                      xe = (0, a.useSelector)(p.getTokenExchangeRates),
                      Ce = (0, a.useSelector)(d.getNetworkConfigurationsByChainId),
                      ve = (0, a.useSelector)(d.getIsAllNetworksFilterEnabled),
                      [Te, Ee] = (0, o.useState)(''),
                      [we, _e] = (0, o.useState)(null),
                      [Me, Ie] = (0, o.useState)(null),
                      [Se, Ae] = (0, o.useState)(!1),
                      [Ne, Oe] = (0, o.useState)(null),
                      [Pe, Be] = (0, o.useState)(''),
                      [De, je] = (0, o.useState)(''),
                      [Fe, Le] = (0, o.useState)(null),
                      [Re, $e] = (0, o.useState)(0),
                      [We, ze] = (0, o.useState)(null),
                      [Ue, Ve] = (0, o.useState)(E.TokenStandard.none),
                      He = (0, a.useSelector)(p.getTestNetworkBackgroundColor),
                      [Ge, Ke] = (0, o.useState)(!1),
                      Je =
                        (null === (t = Ce[Z]) ||
                        void 0 === t ||
                        null === (t = t.blockExplorerUrls) ||
                        void 0 === t
                          ? void 0
                          : t[
                              null === (n = Ce[Z]) || void 0 === n
                                ? void 0
                                : n.defaultBlockExplorerUrlIndex
                            ]) ?? null,
                      qe = (0, a.useSelector)(d.getCurrentChainId),
                      Xe = (0, s.getTokenTrackerLink)(Te, Z, null, null, { blockExplorerUrl: Je }),
                      Ye = Xe ? (0, w.getURLHostName)(Xe) : F('etherscan'),
                      Ze = (0, o.useRef)((0, _.tokenInfoGetter)()),
                      Qe = (0, o.useContext)(M.MetaMetricsContext),
                      et = (0, a.useSelector)(p.getPendingTokens),
                      tt = (0, o.useCallback)(async () => {
                        try {
                          const e = Object.values(et),
                            t = e.reduce(
                              (e, t) => (
                                e[t.chainId] || (e[t.chainId] = []), e[t.chainId].push(t), e
                              ),
                              {}
                            ),
                            n = Object.keys(t).map(e => {
                              var n, o;
                              const a =
                                null === (n = Ce[e]) ||
                                void 0 === n ||
                                null ===
                                  (n =
                                    n.rpcEndpoints[
                                      null === (o = Ce[e]) || void 0 === o
                                        ? void 0
                                        : o.defaultRpcEndpointIndex
                                    ]) ||
                                void 0 === n
                                  ? void 0
                                  : n.networkClientId;
                              return z((0, m.addImportedTokens)(t[e], a));
                            });
                          await Promise.all(n),
                            e.forEach(e => {
                              Qe({
                                event: S.MetaMetricsEventName.TokenAdded,
                                category: S.MetaMetricsEventCategory.Wallet,
                                sensitiveProperties: {
                                  token_symbol: e.symbol,
                                  token_contract_address: e.address,
                                  token_decimal_precision: e.decimals,
                                  unlisted: e.unlisted,
                                  source_connection_method: e.isCustom
                                    ? S.MetaMetricsTokenEventSource.Custom
                                    : S.MetaMetricsTokenEventSource.List,
                                  token_standard: E.TokenStandard.ERC20,
                                  asset_type: E.AssetType.token,
                                },
                              });
                            });
                          const o = [];
                          for (const e in et)
                            Object.prototype.hasOwnProperty.call(et, e) && o.push(et[e].symbol);
                          z((0, m.setNewTokensImported)(o.join(', '))),
                            z((0, m.clearPendingTokens)()),
                            z((0, m.hideImportTokensModal)()),
                            L.push(b.DEFAULT_ROUTE);
                        } catch (e) {
                          z((0, m.setNewTokensImportedError)('error')),
                            z((0, m.clearPendingTokens)()),
                            L.push(b.DEFAULT_ROUTE);
                        }
                      }, [z, L, et, Qe]);
                    (0, o.useEffect)(() => {
                      const e = Object.keys(et);
                      if (0 === e.length) return;
                      let t = {},
                        n = {};
                      e.forEach(e => {
                        const o = et[e],
                          { isCustom: a } = o;
                        a ? (n = { ...o }) : (t = { ...K, [e]: { ...o } });
                      }),
                        J(t),
                        Ee(n.address),
                        Be(n.symbol),
                        $e(n.decimals);
                    }, [et]),
                      (0, o.useEffect)(() => {
                        J({});
                      }, [ie]);
                    const nt = e => {
                        const t = e.trim(),
                          n = t.length;
                        let o = null;
                        (n <= 0 || n >= 12) && (o = F('symbolBetweenZeroTwelve')), Be(t), Le(o);
                      },
                      ot = e => {
                        let t,
                          n = null;
                        e
                          ? ((t = Number(e.trim())),
                            (n = e < 0 || e > 36 ? F('decimalsMustZerotoTen') : null))
                          : ((t = ''),
                            (n = F('tokenDecimalFetchFailed', [
                              o.default.createElement(
                                f.ButtonLink,
                                {
                                  className: 'import-tokens-modal__button-link',
                                  key: 'import-token-verify-token-decimal',
                                  rel: 'noopener noreferrer',
                                  target: '_blank',
                                  href: Xe,
                                  endIconName: f.IconName.Export,
                                },
                                Ye
                              ),
                            ]))),
                          $e(t),
                          ze(n);
                      },
                      at = (0, o.useCallback)(
                        async e => {
                          var t;
                          const {
                            symbol: n = '',
                            decimals: o,
                            name: a,
                          } = await Ze.current(
                            e,
                            null == de || null === (t = de[Z]) || void 0 === t ? void 0 : t.data
                          );
                          Ae(Boolean(o)), nt(n || ''), ot(o), je(a);
                        },
                        [Z, de]
                      ),
                      rt = () => H || we || Fe || We || Me,
                      it = () => Te || Object.keys(K).length > 0,
                      st = 'confirm' === U;
                    return oe === R.NETWORK_SELECTOR
                      ? o.default.createElement(
                          f.Modal,
                          { isOpen: !0 },
                          o.default.createElement(f.ModalOverlay, null),
                          o.default.createElement(
                            f.ModalContent,
                            null,
                            o.default.createElement(
                              f.ModalHeader,
                              { onBack: () => ae(R.IMPORT_TOKEN), onClose: e },
                              o.default.createElement(
                                f.Text,
                                { variant: k.TextVariant.headingSm, align: k.TextAlign.Center },
                                F('networkMenuHeading')
                              )
                            ),
                            o.default.createElement(
                              f.ModalBody,
                              null,
                              o.default.createElement(
                                f.Box,
                                {
                                  display: k.Display.Flex,
                                  flexDirection: k.FlexDirection.Column,
                                  width: k.BlockSize.Full,
                                },
                                Object.values(ne).map(e =>
                                  o.default.createElement(
                                    f.Box,
                                    {
                                      key: e.chainId,
                                      'data-testid': `select-network-item-${e.chainId}`,
                                    },
                                    o.default.createElement(B.NetworkListItem, {
                                      key: e.chainId,
                                      chainId: e.chainId,
                                      name: e.name,
                                      iconSrc: (0, P.getImageForChainId)(e.chainId),
                                      iconSize: f.AvatarNetworkSize.Sm,
                                      focus: !1,
                                      onClick: () => {
                                        Q(e.chainId),
                                          Ee(''),
                                          Be(''),
                                          $e(0),
                                          Ke(!1),
                                          ae(R.IMPORT_TOKEN);
                                      },
                                      selected: (null == e ? void 0 : e.chainId) === Z,
                                    })
                                  )
                                )
                              )
                            )
                          )
                        )
                      : oe === R.SEARCH_NETWORK_SELECTOR
                        ? o.default.createElement(
                            f.Modal,
                            { isOpen: !0 },
                            o.default.createElement(f.ModalOverlay, null),
                            o.default.createElement(
                              f.ModalContent,
                              null,
                              o.default.createElement(
                                f.ModalHeader,
                                { onBack: () => ae(R.IMPORT_TOKEN), onClose: e },
                                o.default.createElement(
                                  f.Text,
                                  { variant: k.TextVariant.headingSm, align: k.TextAlign.Center },
                                  F('networks')
                                )
                              ),
                              o.default.createElement(
                                f.ModalBody,
                                null,
                                o.default.createElement(
                                  f.Box,
                                  {
                                    display: k.Display.Flex,
                                    flexDirection: k.FlexDirection.Column,
                                    width: k.BlockSize.Full,
                                  },
                                  N.FEATURED_NETWORK_CHAIN_IDS.filter(e => ve[e]).map(e => {
                                    var t;
                                    return o.default.createElement(
                                      f.Box,
                                      {
                                        key: e,
                                        padding: 4,
                                        gap: 4,
                                        display: k.Display.Flex,
                                        alignItems: k.AlignItems.center,
                                        justifyContent: k.JustifyContent.spaceBetween,
                                        width: k.BlockSize.Full,
                                      },
                                      o.default.createElement(f.AvatarNetwork, {
                                        name: (0, P.getImageForChainId)(e),
                                        src: (0, P.getImageForChainId)(e),
                                        size: f.AvatarNetworkSize.Sm,
                                      }),
                                      o.default.createElement(
                                        f.Box,
                                        {
                                          width: k.BlockSize.Full,
                                          display: k.Display.Flex,
                                          alignItems: k.AlignItems.center,
                                        },
                                        o.default.createElement(
                                          f.Text,
                                          { variant: k.TextVariant.bodyMdMedium },
                                          null === (t = Ce[e]) || void 0 === t ? void 0 : t.name
                                        )
                                      )
                                    );
                                  })
                                )
                              )
                            )
                          )
                        : o.default.createElement(
                            f.Modal,
                            {
                              isOpen: !0,
                              onClose: () => {
                                z((0, m.clearPendingTokens)()), e();
                              },
                              className: 'import-tokens-modal',
                            },
                            o.default.createElement(f.ModalOverlay, null),
                            o.default.createElement(
                              f.ModalContent,
                              {
                                modalDialogProps: {
                                  className: 'import-tokens-modal__modal-dialog-content',
                                },
                              },
                              o.default.createElement(
                                f.ModalHeader,
                                {
                                  onBack: st ? () => V('') : null,
                                  paddingBottom: 4,
                                  paddingRight: 4,
                                  paddingLeft: 4,
                                  onClose: () => {
                                    z((0, m.clearPendingTokens)()), e();
                                  },
                                },
                                F('importTokensCamelCase')
                              ),
                              o.default.createElement(
                                f.Box,
                                { className: 'import-tokens-modal__body' },
                                st
                                  ? o.default.createElement(j.ImportTokensModalConfirm, {
                                      networkFilter: ie,
                                    })
                                  : o.default.createElement(
                                      c.Tabs,
                                      {
                                        t: F,
                                        tabsClassName: 'import-tokens-modal__tabs',
                                        onTabClick: e => te(e),
                                        defaultActiveTabKey: ee,
                                      },
                                      ue
                                        ? o.default.createElement(
                                            c.Tab,
                                            {
                                              activeClassName: 'import-tokens-modal__active-tab',
                                              buttonClassName: 'import-tokens-modal__button-tab',
                                              tabKey: $,
                                              name: F('search'),
                                              onClick: () => te($),
                                            },
                                            o.default.createElement(
                                              f.Box,
                                              { paddingTop: 4 },
                                              pe
                                                ? null
                                                : o.default.createElement(
                                                    f.Box,
                                                    { paddingLeft: 4, paddingRight: 4 },
                                                    o.default.createElement(
                                                      f.BannerAlert,
                                                      {
                                                        severity: k.Severity.Info,
                                                        marginBottom: 4,
                                                        paddingLeft: 4,
                                                        paddingRight: 4,
                                                      },
                                                      o.default.createElement(
                                                        f.Text,
                                                        {
                                                          variant: k.TextVariant.bodyMd,
                                                          fontSize: '16',
                                                        },
                                                        F('enhancedTokenDetectionAlertMessage', [
                                                          me,
                                                          o.default.createElement(
                                                            f.ButtonLink,
                                                            {
                                                              key: 'token-detection-announcement',
                                                              className:
                                                                'import-tokens-modal__autodetect',
                                                              onClick: () => {
                                                                e(),
                                                                  L.push(
                                                                    `${b.SECURITY_ROUTE}#auto-detect-tokens`
                                                                  );
                                                              },
                                                            },
                                                            F('enableFromSettings')
                                                          ),
                                                        ])
                                                      )
                                                    )
                                                  ),
                                              N.FEATURED_NETWORK_CHAIN_IDS.some(
                                                e => e === Y.chainId
                                              ) &&
                                                o.default.createElement(
                                                  f.Box,
                                                  {
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    paddingBottom: 4,
                                                  },
                                                  o.default.createElement(
                                                    A.NetworkFilterImportToken,
                                                    {
                                                      buttonDataTestId:
                                                        'test-import-tokens-drop-down',
                                                      openListNetwork: () =>
                                                        ae(R.SEARCH_NETWORK_SELECTOR),
                                                      networkFilter: ie,
                                                      setNetworkFilter: se,
                                                    }
                                                  )
                                                ),
                                              o.default.createElement(
                                                f.Box,
                                                {
                                                  paddingLeft: 4,
                                                  paddingRight: 4,
                                                  paddingBottom: 4,
                                                },
                                                o.default.createElement(h.default, {
                                                  searchClassName:
                                                    'import-tokens-modal__button-search',
                                                  onSearch: ({ results: e = [] }) => X(e),
                                                  error: H,
                                                  tokenList: de,
                                                  networkFilter: ie,
                                                  setSearchResults: X,
                                                })
                                              ),
                                              0 === q.length
                                                ? o.default.createElement(
                                                    f.Box,
                                                    {
                                                      paddingLeft: 4,
                                                      paddingRight: 4,
                                                      className: 'token-list__empty-list',
                                                    },
                                                    o.default.createElement(D.default, null)
                                                  )
                                                : o.default.createElement(y.default, {
                                                    currentNetwork: Y,
                                                    testNetworkBackgroundColor: He,
                                                    results: q,
                                                    selectedTokens: K,
                                                    onToggleToken: e =>
                                                      (e => {
                                                        const { address: t } = e,
                                                          n = { ...K };
                                                        t in n ? delete n[t] : (n[t] = e),
                                                          J(n),
                                                          G(null);
                                                      })(e),
                                                    isTokenNetworkFilterEqualCurrentNetwork:
                                                      1 === Object.keys(ie).length && ie[qe],
                                                  })
                                            )
                                          )
                                        : null,
                                      o.default.createElement(
                                        c.Tab,
                                        {
                                          activeClassName: 'import-tokens-modal__active-tab',
                                          buttonClassName: 'import-tokens-modal__button-tab',
                                          tabKey: W,
                                          name: F('customToken'),
                                          onClick: () => te(W),
                                        },
                                        st
                                          ? o.default.createElement(j.ImportTokensModalConfirm, {
                                              networkFilter: ie,
                                            })
                                          : o.default.createElement(
                                              f.Box,
                                              { paddingTop: 4 },
                                              o.default.createElement(
                                                f.Box,
                                                {
                                                  className:
                                                    'import-tokens-modal__custom-token-form__container',
                                                },
                                                ge
                                                  ? o.default.createElement(
                                                      f.Box,
                                                      { paddingLeft: 4, paddingRight: 4 },
                                                      o.default.createElement(
                                                        f.BannerAlert,
                                                        { severity: k.Severity.Warning },
                                                        o.default.createElement(
                                                          f.Text,
                                                          { variant: k.TextVariant.bodyMd },
                                                          F(
                                                            'customTokenWarningInTokenDetectionNetworkWithTDOFF',
                                                            [
                                                              o.default.createElement(
                                                                f.ButtonLink,
                                                                {
                                                                  key: 'import-token-security-risk',
                                                                  rel: 'noopener noreferrer',
                                                                  target: '_blank',
                                                                  href: x.default
                                                                    .TOKEN_SAFETY_PRACTICES,
                                                                },
                                                                F('tokenScamSecurityRisk')
                                                              ),
                                                              o.default.createElement(
                                                                f.ButtonLink,
                                                                {
                                                                  type: 'link',
                                                                  key: 'import-token-token-detection-announcement',
                                                                  onClick: () => {
                                                                    e(),
                                                                      L.push(
                                                                        `${b.SECURITY_ROUTE}#auto-detect-tokens`
                                                                      );
                                                                  },
                                                                },
                                                                F('inYourSettings')
                                                              ),
                                                            ]
                                                          )
                                                        )
                                                      )
                                                    )
                                                  : o.default.createElement(
                                                      f.Box,
                                                      { paddingLeft: 4, paddingRight: 4 },
                                                      o.default.createElement(
                                                        f.BannerAlert,
                                                        {
                                                          severity: he
                                                            ? k.Severity.Warning
                                                            : k.Severity.Info,
                                                          'data-testid': 'custom-token-warning',
                                                        },
                                                        o.default.createElement(
                                                          f.Text,
                                                          { variant: k.TextVariant.bodyMd },
                                                          F(
                                                            he
                                                              ? 'customTokenWarningInTokenDetectionNetwork'
                                                              : 'customTokenWarningInNonTokenDetectionNetwork',
                                                            [
                                                              o.default.createElement(
                                                                f.ButtonLink,
                                                                {
                                                                  key: 'import-token-fake-token-warning',
                                                                  rel: 'noopener noreferrer',
                                                                  target: '_blank',
                                                                  href: x.default
                                                                    .TOKEN_SAFETY_PRACTICES,
                                                                },
                                                                F('learnScamRisk')
                                                              ),
                                                            ]
                                                          )
                                                        )
                                                      )
                                                    ),
                                                o.default.createElement(
                                                  O.NetworkSelectorCustomImport,
                                                  {
                                                    title: Z
                                                      ? null === (i = Ce[Z]) || void 0 === i
                                                        ? void 0
                                                        : i.name
                                                      : F('networkMenuHeading'),
                                                    buttonDataTestId:
                                                      'test-import-tokens-drop-down-custom-import',
                                                    chainId: Z,
                                                    onSelectNetwork: () => ae(R.NETWORK_SELECTOR),
                                                  }
                                                ),
                                                o.default.createElement(
                                                  f.Box,
                                                  null,
                                                  o.default.createElement(g.FormTextField, {
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    paddingTop: 6,
                                                    label: F('tokenContractAddress'),
                                                    value: Te,
                                                    onChange: t => {
                                                      Z
                                                        ? (async t => {
                                                            const n = t.trim();
                                                            Ee(n),
                                                              _e(null),
                                                              Ie(null),
                                                              Ae(!1),
                                                              Oe(null),
                                                              Ke(!1);
                                                            const a = (0, C.isValidHexAddress)(n, {
                                                                allowNonPrefixed: !1,
                                                              }),
                                                              r = (0, v.addHexPrefix)(
                                                                n
                                                              ).toLowerCase(),
                                                              i = Object.keys(
                                                                T.STATIC_MAINNET_TOKEN_LIST
                                                              ).some(
                                                                e =>
                                                                  e.toLowerCase() ===
                                                                  n.toLowerCase()
                                                              );
                                                            let s;
                                                            if (a)
                                                              try {
                                                                ({ standard: s } = await (0,
                                                                m.getTokenStandardAndDetailsByChain)(
                                                                  r,
                                                                  ye.address,
                                                                  null,
                                                                  Z
                                                                ));
                                                              } catch (e) {}
                                                            const c =
                                                              0 === n.length ||
                                                              '0x0000000000000000000000000000000000000000' ===
                                                                n;
                                                            switch (!0) {
                                                              case !a && !c:
                                                                _e(F('invalidAddress')),
                                                                  Be(''),
                                                                  $e(0),
                                                                  Le(null),
                                                                  ze(null),
                                                                  Ke(!1);
                                                                break;
                                                              case s === E.TokenStandard.ERC1155 ||
                                                                s === E.TokenStandard.ERC721:
                                                                Ie(
                                                                  F('nftAddressError', [
                                                                    o.default.createElement(
                                                                      f.ButtonLink,
                                                                      {
                                                                        className:
                                                                          'import-tokens-modal__nft-address-error-link',
                                                                        onClick: () => {
                                                                          z(
                                                                            (0,
                                                                            m.showImportNftsModal)({
                                                                              tokenAddress: n,
                                                                            })
                                                                          ),
                                                                            e();
                                                                        },
                                                                        color:
                                                                          k.TextColor
                                                                            .primaryDefault,
                                                                        key: 'nftAddressError',
                                                                      },
                                                                      F('importNFTPage')
                                                                    ),
                                                                  ])
                                                                ),
                                                                  Ke(!1);
                                                                break;
                                                              case i && Z !== l.CHAIN_IDS.MAINNET:
                                                                Oe(F('mainnetToken')),
                                                                  Be(''),
                                                                  $e(0),
                                                                  Le(null),
                                                                  ze(null),
                                                                  Ke(!1);
                                                                break;
                                                              case Boolean(
                                                                ke.find(
                                                                  e => e.address.toLowerCase() === r
                                                                )
                                                              ):
                                                                _e(F('personalAddressDetected')),
                                                                  Ke(!1);
                                                                break;
                                                              case (0, w.checkExistingAddresses)(
                                                                n,
                                                                be
                                                              ):
                                                                _e(F('tokenAlreadyAdded')), Ke(!1);
                                                                break;
                                                              default:
                                                                c || (at(n), Ke(!0), s && Ve(s));
                                                            }
                                                          })(t.target.value)
                                                        : Ee(t.target.value);
                                                    },
                                                    helpText: we || Ne || Me,
                                                    error: we || Ne || Me,
                                                    textFieldProps: {
                                                      className:
                                                        we || Ne || Me
                                                          ? 'import-tokens-modal__custom-token-form__text-outline-error'
                                                          : 'import-tokens-modal__custom-token-form__text-outline-success',
                                                    },
                                                    inputProps: {
                                                      'data-testid':
                                                        'import-tokens-modal-custom-address',
                                                    },
                                                  }),
                                                  Ge &&
                                                    o.default.createElement(
                                                      f.Box,
                                                      null,
                                                      o.default.createElement(g.FormTextField, {
                                                        paddingLeft: 4,
                                                        paddingRight: 4,
                                                        paddingTop: 4,
                                                        label: o.default.createElement(
                                                          o.default.Fragment,
                                                          null,
                                                          F('tokenSymbol')
                                                        ),
                                                        value: Pe,
                                                        onChange: e => nt(e.target.value),
                                                        helpText: Fe,
                                                        error: Fe,
                                                        textFieldProps: {
                                                          className: Fe
                                                            ? 'import-tokens-modal__custom-token-form__text-outline-error'
                                                            : 'import-tokens-modal__custom-token-form__text-outline-success',
                                                        },
                                                        inputProps: {
                                                          'data-testid':
                                                            'import-tokens-modal-custom-symbol',
                                                        },
                                                      }),
                                                      o.default.createElement(g.FormTextField, {
                                                        paddingLeft: 4,
                                                        paddingRight: 4,
                                                        paddingTop: 4,
                                                        label: F('decimal'),
                                                        type: 'number',
                                                        value: Re,
                                                        onChange: e => ot(e.target.value),
                                                        helpText: We,
                                                        error: We,
                                                        disabled: Se,
                                                        min: 0,
                                                        max: 36,
                                                        textFieldProps: {
                                                          className: We
                                                            ? 'import-tokens-modal__custom-token-form__text-outline-error'
                                                            : 'import-tokens-modal__custom-token-form__text-outline-success',
                                                        },
                                                        inputProps: {
                                                          'data-testid':
                                                            'import-tokens-modal-custom-decimals',
                                                        },
                                                      })
                                                    )
                                                )
                                              )
                                            )
                                      )
                                    )
                              ),
                              st
                                ? o.default.createElement(
                                    f.Box,
                                    {
                                      paddingTop: 5,
                                      paddingLeft: 4,
                                      paddingRight: 4,
                                      display: k.Display.Flex,
                                    },
                                    o.default.createElement(
                                      f.ButtonSecondary,
                                      {
                                        size: k.Size.LG,
                                        onClick: () => {
                                          z((0, m.clearPendingTokens)()), V('');
                                        },
                                        block: !0,
                                        marginRight: 5,
                                      },
                                      F('back')
                                    ),
                                    o.default.createElement(
                                      f.ButtonPrimary,
                                      {
                                        size: k.Size.LG,
                                        onClick: async () => {
                                          await tt(), L.push(b.DEFAULT_ROUTE);
                                        },
                                        block: !0,
                                        'data-testid': 'import-tokens-modal-import-button',
                                      },
                                      F('import')
                                    )
                                  )
                                : o.default.createElement(
                                    f.Box,
                                    { paddingTop: 6, paddingLeft: 4, paddingRight: 4 },
                                    o.default.createElement(
                                      f.ButtonPrimary,
                                      {
                                        onClick: () =>
                                          (async () => {
                                            var e;
                                            if (rt()) return;
                                            if (!it()) return void G(F('mustSelectOne'));
                                            const t =
                                                (null == de || null === (e = de[Z]) || void 0 === e
                                                  ? void 0
                                                  : e.data) ?? {},
                                              n = Object.keys(t),
                                              o = Te
                                                ? {
                                                    address: Te,
                                                    symbol: Pe,
                                                    decimals: Re,
                                                    standard: Ue,
                                                    name: De,
                                                    chainId: Z,
                                                  }
                                                : null;
                                            z(
                                              (0, m.setPendingTokens)({
                                                customToken: o,
                                                selectedTokens: K,
                                                tokenAddressList: n,
                                              })
                                            );
                                            const a = {
                                                ...K,
                                                ...((null == o ? void 0 : o.address) && {
                                                  [o.address]: { ...o },
                                                }),
                                              },
                                              r = Object.values(a).filter(
                                                e =>
                                                  (null == xe
                                                    ? void 0
                                                    : xe[
                                                        (0, C.toChecksumHexAddress)(e.address)
                                                      ]) === undefined
                                              ),
                                              i = r.map(e => e.address);
                                            if (0 !== r.length) {
                                              const e = await (0, w.fetchTokenExchangeRates)(
                                                fe,
                                                i,
                                                qe
                                              );
                                              z((0, m.setConfirmationExchangeRates)(e));
                                            }
                                            V('confirm');
                                          })(),
                                        size: k.Size.LG,
                                        disabled: Boolean(rt()) || !it() || (ee === W && !Z),
                                        block: !0,
                                        'data-testid': 'import-tokens-button-next',
                                      },
                                      F('next')
                                    )
                                  )
                            )
                          );
                  };
                (n.ImportTokensModal = z), (z.propTypes = { onClose: i.default.func.isRequired });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/import-tokens-modal/import-tokens-modal.js',
      },
    ],
    [
      6573,
      { './import-tokens-modal': 6572 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ImportTokensModal', {
                    enumerable: !0,
                    get: function () {
                      return o.ImportTokensModal;
                    },
                  });
                var o = e('./import-tokens-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/import-tokens-modal/index.js' },
    ],
    [
      6574,
      {
        './account-details': 6472,
        './account-list-item': 6477,
        './account-list-item-menu': 6474,
        './account-list-menu': 6480,
        './account-overview': 6487,
        './account-picker': 6489,
        './activity-list-item': 6491,
        './address-copy-button': 6493,
        './address-list-item': 6495,
        './app-header': 6500,
        './asset-picker-amount': 6517,
        './avatar-group': 6525,
        './carousel': 6531,
        './connected-accounts-menu': 6535,
        './connected-site-menu': 6537,
        './connected-site-popover': 6539,
        './connected-status': 6541,
        './create-account': 6543,
        './create-eth-account': 6545,
        './detected-token-banner': 6553,
        './edit-accounts-modal': 6557,
        './edit-networks-modal': 6559,
        './global-menu': 6563,
        './import-account': 6566,
        './import-nfts-modal': 6570,
        './import-tokens-modal': 6573,
        './menu-items': 6576,
        './multi-srp': 6580,
        './network-list-item': 6589,
        './network-list-menu': 6594,
        './notification-detail': 6623,
        './notification-detail-address': 6603,
        './notification-detail-asset': 6605,
        './notification-detail-block-explorer-button': 6607,
        './notification-detail-button': 6609,
        './notification-detail-collection': 6611,
        './notification-detail-copy-button': 6613,
        './notification-detail-info': 6615,
        './notification-detail-network-fee': 6617,
        './notification-detail-nft': 6619,
        './notification-detail-title': 6621,
        './notification-list-item': 6631,
        './notification-list-item-icon': 6625,
        './notification-list-item-snap': 6627,
        './notification-list-item-text': 6629,
        './notifications-page': 6633,
        './notifications-settings-account': 6635,
        './notifications-settings-box': 6637,
        './notifications-settings-type': 6639,
        './notifications-tag-counter': 6641,
        './permission-details-modal': 6678,
        './product-tour-popover': 6681,
        './receive-modal': 6685,
        './toast': 6687,
        './token-list-item': 6689,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountDetails', {
                    enumerable: !0,
                    get: function () {
                      return b.AccountDetails;
                    },
                  }),
                  Object.defineProperty(n, 'AccountDetailsMenuItem', {
                    enumerable: !0,
                    get: function () {
                      return w.AccountDetailsMenuItem;
                    },
                  }),
                  Object.defineProperty(n, 'AccountListItem', {
                    enumerable: !0,
                    get: function () {
                      return o.AccountListItem;
                    },
                  }),
                  Object.defineProperty(n, 'AccountListItemMenu', {
                    enumerable: !0,
                    get: function () {
                      return a.AccountListItemMenu;
                    },
                  }),
                  Object.defineProperty(n, 'AccountListItemMenuTypes', {
                    enumerable: !0,
                    get: function () {
                      return o.AccountListItemMenuTypes;
                    },
                  }),
                  Object.defineProperty(n, 'AccountListMenu', {
                    enumerable: !0,
                    get: function () {
                      return r.AccountListMenu;
                    },
                  }),
                  Object.defineProperty(n, 'AccountOverview', {
                    enumerable: !0,
                    get: function () {
                      return i.AccountOverview;
                    },
                  }),
                  Object.defineProperty(n, 'AccountPicker', {
                    enumerable: !0,
                    get: function () {
                      return s.AccountPicker;
                    },
                  }),
                  Object.defineProperty(n, 'ActivityListItem', {
                    enumerable: !0,
                    get: function () {
                      return l.ActivityListItem;
                    },
                  }),
                  Object.defineProperty(n, 'AddressCopyButton', {
                    enumerable: !0,
                    get: function () {
                      return m.AddressCopyButton;
                    },
                  }),
                  Object.defineProperty(n, 'AddressListItem', {
                    enumerable: !0,
                    get: function () {
                      return S.AddressListItem;
                    },
                  }),
                  Object.defineProperty(n, 'AppHeader', {
                    enumerable: !0,
                    get: function () {
                      return c.AppHeader;
                    },
                  }),
                  Object.defineProperty(n, 'AssetPickerAmount', {
                    enumerable: !0,
                    get: function () {
                      return I.AssetPickerAmount;
                    },
                  }),
                  Object.defineProperty(n, 'AvatarGroup', {
                    enumerable: !0,
                    get: function () {
                      return M.AvatarGroup;
                    },
                  }),
                  Object.defineProperty(n, 'Carousel', {
                    enumerable: !0,
                    get: function () {
                      return ne.Carousel;
                    },
                  }),
                  Object.defineProperty(n, 'ConnectedAccountsMenu', {
                    enumerable: !0,
                    get: function () {
                      return v.ConnectedAccountsMenu;
                    },
                  }),
                  Object.defineProperty(n, 'ConnectedSiteMenu', {
                    enumerable: !0,
                    get: function () {
                      return f.ConnectedSiteMenu;
                    },
                  }),
                  Object.defineProperty(n, 'ConnectedSitePopover', {
                    enumerable: !0,
                    get: function () {
                      return g.ConnectedSitePopover;
                    },
                  }),
                  Object.defineProperty(n, 'ConnectedStatus', {
                    enumerable: !0,
                    get: function () {
                      return A.ConnectedStatus;
                    },
                  }),
                  Object.defineProperty(n, 'CreateAccount', {
                    enumerable: !0,
                    get: function () {
                      return x.CreateAccount;
                    },
                  }),
                  Object.defineProperty(n, 'CreateEthAccount', {
                    enumerable: !0,
                    get: function () {
                      return C.CreateEthAccount;
                    },
                  }),
                  Object.defineProperty(n, 'DetectedTokensBanner', {
                    enumerable: !0,
                    get: function () {
                      return u.DetectedTokensBanner;
                    },
                  }),
                  Object.defineProperty(n, 'EditAccountsModal', {
                    enumerable: !0,
                    get: function () {
                      return te.EditAccountsModal;
                    },
                  }),
                  Object.defineProperty(n, 'EditNetworksModal', {
                    enumerable: !0,
                    get: function () {
                      return ee.EditNetworksModal;
                    },
                  }),
                  Object.defineProperty(n, 'GlobalMenu', {
                    enumerable: !0,
                    get: function () {
                      return d.GlobalMenu;
                    },
                  }),
                  Object.defineProperty(n, 'ImportAccount', {
                    enumerable: !0,
                    get: function () {
                      return T.ImportAccount;
                    },
                  }),
                  Object.defineProperty(n, 'ImportNftsModal', {
                    enumerable: !0,
                    get: function () {
                      return E.ImportNftsModal;
                    },
                  }),
                  Object.defineProperty(n, 'ImportSrp', {
                    enumerable: !0,
                    get: function () {
                      return oe.ImportSrp;
                    },
                  }),
                  Object.defineProperty(n, 'ImportTokensModal', {
                    enumerable: !0,
                    get: function () {
                      return _.ImportTokensModal;
                    },
                  }),
                  Object.defineProperty(n, 'NetworkListItem', {
                    enumerable: !0,
                    get: function () {
                      return h.NetworkListItem;
                    },
                  }),
                  Object.defineProperty(n, 'NetworkListMenu', {
                    enumerable: !0,
                    get: function () {
                      return y.NetworkListMenu;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetail', {
                    enumerable: !0,
                    get: function () {
                      return B.NotificationDetail;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailAddress', {
                    enumerable: !0,
                    get: function () {
                      return D.NotificationDetailAddress;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailAsset', {
                    enumerable: !0,
                    get: function () {
                      return j.NotificationDetailAsset;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailBlockExplorerButton', {
                    enumerable: !0,
                    get: function () {
                      return V.NotificationDetailBlockExplorerButton;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailButton', {
                    enumerable: !0,
                    get: function () {
                      return U.NotificationDetailButton;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailCollection', {
                    enumerable: !0,
                    get: function () {
                      return F.NotificationDetailCollection;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailCopyButton', {
                    enumerable: !0,
                    get: function () {
                      return L.NotificationDetailCopyButton;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailInfo', {
                    enumerable: !0,
                    get: function () {
                      return $.NotificationDetailInfo;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailNetworkFee', {
                    enumerable: !0,
                    get: function () {
                      return R.NotificationDetailNetworkFee;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailNft', {
                    enumerable: !0,
                    get: function () {
                      return W.NotificationDetailNft;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationDetailTitle', {
                    enumerable: !0,
                    get: function () {
                      return z.NotificationDetailTitle;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationListItem', {
                    enumerable: !0,
                    get: function () {
                      return N.NotificationListItem;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationListItemIcon', {
                    enumerable: !0,
                    get: function () {
                      return O.NotificationListItemIcon;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationListItemSnap', {
                    enumerable: !0,
                    get: function () {
                      return q.NotificationListItemSnap;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationListItemText', {
                    enumerable: !0,
                    get: function () {
                      return P.NotificationListItemText;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationsPage', {
                    enumerable: !0,
                    get: function () {
                      return H.NotificationsPage;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationsSettingsAccount', {
                    enumerable: !0,
                    get: function () {
                      return J.NotificationsSettingsAccount;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationsSettingsBox', {
                    enumerable: !0,
                    get: function () {
                      return G.NotificationsSettingsBox;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationsSettingsType', {
                    enumerable: !0,
                    get: function () {
                      return K.NotificationsSettingsType;
                    },
                  }),
                  Object.defineProperty(n, 'NotificationsTagCounter', {
                    enumerable: !0,
                    get: function () {
                      return X.NotificationsTagCounter;
                    },
                  }),
                  Object.defineProperty(n, 'PermissionDetailsModal', {
                    enumerable: !0,
                    get: function () {
                      return Z.PermissionDetailsModal;
                    },
                  }),
                  Object.defineProperty(n, 'ProductTour', {
                    enumerable: !0,
                    get: function () {
                      return k.ProductTour;
                    },
                  }),
                  Object.defineProperty(n, 'ReceiveModal', {
                    enumerable: !0,
                    get: function () {
                      return Q.ReceiveModal;
                    },
                  }),
                  Object.defineProperty(n, 'SelectSrp', {
                    enumerable: !0,
                    get: function () {
                      return oe.SelectSrp;
                    },
                  }),
                  Object.defineProperty(n, 'SrpList', {
                    enumerable: !0,
                    get: function () {
                      return oe.SrpList;
                    },
                  }),
                  Object.defineProperty(n, 'Toast', {
                    enumerable: !0,
                    get: function () {
                      return Y.Toast;
                    },
                  }),
                  Object.defineProperty(n, 'ToastContainer', {
                    enumerable: !0,
                    get: function () {
                      return Y.ToastContainer;
                    },
                  }),
                  Object.defineProperty(n, 'TokenListItem', {
                    enumerable: !0,
                    get: function () {
                      return p.TokenListItem;
                    },
                  }),
                  Object.defineProperty(n, 'ViewExplorerMenuItem', {
                    enumerable: !0,
                    get: function () {
                      return w.ViewExplorerMenuItem;
                    },
                  });
                var o = e('./account-list-item'),
                  a = e('./account-list-item-menu'),
                  r = e('./account-list-menu'),
                  i = e('./account-overview'),
                  s = e('./account-picker'),
                  l = e('./activity-list-item'),
                  c = e('./app-header'),
                  u = e('./detected-token-banner'),
                  d = e('./global-menu'),
                  p = e('./token-list-item'),
                  m = e('./address-copy-button'),
                  f = e('./connected-site-menu'),
                  g = e('./connected-site-popover'),
                  h = e('./network-list-item'),
                  y = e('./network-list-menu'),
                  k = e('./product-tour-popover'),
                  b = e('./account-details'),
                  x = e('./create-account'),
                  C = e('./create-eth-account'),
                  v = e('./connected-accounts-menu'),
                  T = e('./import-account'),
                  E = e('./import-nfts-modal'),
                  w = e('./menu-items'),
                  _ = e('./import-tokens-modal'),
                  M = e('./avatar-group'),
                  I = e('./asset-picker-amount'),
                  S = e('./address-list-item'),
                  A = e('./connected-status'),
                  N = e('./notification-list-item'),
                  O = e('./notification-list-item-icon'),
                  P = e('./notification-list-item-text'),
                  B = e('./notification-detail'),
                  D = e('./notification-detail-address'),
                  j = e('./notification-detail-asset'),
                  F = e('./notification-detail-collection'),
                  L = e('./notification-detail-copy-button'),
                  R = e('./notification-detail-network-fee'),
                  $ = e('./notification-detail-info'),
                  W = e('./notification-detail-nft'),
                  z = e('./notification-detail-title'),
                  U = e('./notification-detail-button'),
                  V = e('./notification-detail-block-explorer-button'),
                  H = e('./notifications-page'),
                  G = e('./notifications-settings-box'),
                  K = e('./notifications-settings-type'),
                  J = e('./notifications-settings-account'),
                  q = e('./notification-list-item-snap'),
                  X = e('./notifications-tag-counter'),
                  Y = e('./toast'),
                  Z = e('./permission-details-modal'),
                  Q = e('./receive-modal'),
                  ee = e('./edit-networks-modal'),
                  te = e('./edit-accounts-modal'),
                  ne = e('./carousel'),
                  oe = e('./multi-srp');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/index.js' },
    ],
    [
      6575,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
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
                  (n.AccountDetailsMenuItem = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = (o = e('prop-types')) && o.__esModule ? o : { default: o },
                  i = e('react-redux'),
                  s = e('../../../store/actions'),
                  l = e('../../ui/menu'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../component-library'),
                  m = e('../../../selectors/selectors');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const g = ({ metricsLocation: e, closeMenu: t, address: n, textProps: o }) => {
                  const r = (0, c.useI18nContext)(),
                    f = (0, i.useDispatch)(),
                    g = (0, a.useContext)(u.MetaMetricsContext),
                    h = (0, i.useSelector)(m.getHDEntropyIndex),
                    y = r('accountDetails');
                  return a.default.createElement(
                    l.MenuItem,
                    {
                      onClick: () => {
                        f((0, s.setAccountDetailsAddress)(n)),
                          g({
                            event: d.MetaMetricsEventName.AccountDetailsOpened,
                            category: d.MetaMetricsEventCategory.Navigation,
                            properties: { location: e, hd_entropy_index: h },
                          }),
                          null == t || t();
                      },
                      iconName: p.IconName.ScanBarcode,
                      'data-testid': 'account-list-menu-details',
                    },
                    o ? a.default.createElement(p.Text, o, y) : y
                  );
                };
                (n.AccountDetailsMenuItem = g),
                  (g.propTypes = {
                    metricsLocation: r.default.string.isRequired,
                    closeMenu: r.default.func,
                    address: r.default.string.isRequired,
                    textProps: r.default.object,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/menu-items/account-details-menu-item.js',
      },
    ],
    [
      6576,
      { './account-details-menu-item': 6575, './view-explorer-menu-item': 6577 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountDetailsMenuItem', {
                    enumerable: !0,
                    get: function () {
                      return o.AccountDetailsMenuItem;
                    },
                  }),
                  Object.defineProperty(n, 'ViewExplorerMenuItem', {
                    enumerable: !0,
                    get: function () {
                      return a.ViewExplorerMenuItem;
                    },
                  });
                var o = e('./account-details-menu-item'),
                  a = e('./view-explorer-menu-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/menu-items/index.js' },
    ],
    [
      6577,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/multichain/blockExplorer': 6909,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.openBlockExplorer = n.ViewExplorerMenuItem = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('@metamask/utils'),
                  s = e('../../../helpers/utils/multichain/blockExplorer'),
                  l = e('../../ui/menu'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../component-library'),
                  m = e('../../../selectors'),
                  f = e('../../../helpers/utils/util'),
                  g = e('../../../helpers/constants/routes'),
                  h = e('../../../selectors/multichain'),
                  y = e('../../../hooks/useMultichainSelector');
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const b = (e, t, n, o) => {
                  n({
                    event: d.MetaMetricsEventName.ExternalLinkClicked,
                    category: d.MetaMetricsEventCategory.Navigation,
                    properties: {
                      link_type: d.MetaMetricsEventLinkType.AccountTracker,
                      location: t,
                      url_domain: (0, f.getURLHostName)(e),
                    },
                  }),
                    global.platform.openTab({ url: e }),
                    null == o || o();
                };
                n.openBlockExplorer = b;
                n.ViewExplorerMenuItem = ({
                  metricsLocation: e,
                  closeMenu: t,
                  textProps: n,
                  account: k,
                }) => {
                  const x = (0, c.useI18nContext)(),
                    C = (0, o.useContext)(u.MetaMetricsContext),
                    v = (0, r.useHistory)(),
                    T = (0, y.useMultichainSelector)(h.getMultichainNetwork, k),
                    E = (0, s.getMultichainAccountUrl)(k.address, T),
                    w = (0, i.parseCaipChainId)(T.chainId).reference,
                    _ = (0, s.getMultichainBlockExplorerUrl)(T),
                    M = (0, f.getURLHostName)(_),
                    I = (0, a.useSelector)(m.getBlockExplorerLinkText),
                    S = x('viewOnExplorer');
                  return o.default.createElement(
                    l.MenuItem,
                    {
                      onClick: () => {
                        'addBlockExplorer' === I.firstPart
                          ? v.push(`${g.NETWORKS_ROUTE}#blockExplorerUrl`)
                          : b(E, e, C, t),
                          C({
                            event: d.MetaMetricsEventName.BlockExplorerLinkClicked,
                            category: d.MetaMetricsEventCategory.Accounts,
                            properties: { location: e, chain_id: w },
                          }),
                          null == t || t();
                      },
                      subtitle: M || null,
                      iconName: p.IconName.Export,
                      'data-testid': 'account-list-menu-open-explorer',
                    },
                    n ? o.default.createElement(p.Text, n, S) : S
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/menu-items/view-explorer-menu-item.tsx',
      },
    ],
    [
      6578,
      {
        '../../../../../shared/constants/preferences': 5809,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useTheme': 7008,
        '../../../../store/actions': 7619,
        '../../../app/srp-input/parse-secret-recovery-phrase': 6276,
        '../../../app/toast-master/utils': 6292,
        '../../../component-library': 6402,
        '@ethersproject/hdnode': 538,
        '@metamask/scure-bip39/dist/wordlists/english': 2589,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ImportSrp = void 0);
                var o = y(e('react')),
                  a = e('react-redux'),
                  r = e('@ethersproject/hdnode'),
                  i = e('@metamask/scure-bip39/dist/wordlists/english'),
                  s = e('../../../../hooks/useI18nContext'),
                  l = y(e('../../../../store/actions')),
                  c = e('../../../component-library'),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../app/toast-master/utils'),
                  p = e('../../../app/srp-input/parse-secret-recovery-phrase'),
                  m = e('../../../../helpers/utils/util'),
                  f = e('../../../../hooks/useTheme'),
                  g = e('../../../../../shared/constants/preferences');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function y(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = h(t);
                  if (n && n.has(e)) return n.get(e);
                  var o = { __proto__: null },
                    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                      i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                    }
                  return (o.default = e), n && n.set(e, o), o;
                }
                n.ImportSrp = ({ onActionComplete: e }) => {
                  const t = (0, s.useI18nContext)(),
                    n = ((0, f.useTheme)(), (0, a.useDispatch)()),
                    [h, y] = (0, o.useState)(''),
                    [k, b] = (0, o.useState)(!1),
                    [x, C] = (0, o.useState)(Array(12).fill('')),
                    [v, T] = (0, o.useState)(12),
                    [E, w] = (0, o.useState)(Array(12).fill(!1)),
                    [_, M] = (0, o.useState)(!1);
                  (0, o.useEffect)(
                    () => () => {
                      n(l.hideWarning());
                    },
                    [n]
                  );
                  const I = (0, o.useMemo)(() => (0, r.isValidMnemonic)(x.join(' ')), [x]),
                    S = (0, o.useMemo)(() => x.some(e => '' === e) || x.length !== v, [x, v]),
                    A = (0, o.useCallback)(
                      e => {
                        if (e.filter(e => '' !== e).length === v) {
                          const a = e.join(' ').trim(),
                            s = Array(e.length).fill(!1);
                          let l =
                            ((o = s),
                            (n = e).some(e => '' !== e)
                              ? { error: '', words: n.map(e => !i.wordlist.includes(e)) }
                              : { error: '', words: o });
                          (l = ((e, n) => {
                            return e.error
                              ? e
                              : (o = n) !== o.toLowerCase()
                                ? { ...e, error: t('invalidSeedPhraseCaseSensitive') }
                                : e;
                            var o;
                          })(l, a)),
                            (l = ((e, n) =>
                              e.error
                                ? e
                                : n.some(e => '' === e)
                                  ? { ...e, error: t('importSRPNumberOfWordsError') }
                                  : e)(l, e)),
                            (l = (e => {
                              if (e.error) return e;
                              const n = e.words.map((e, t) => (e ? t + 1 : 0)).filter(e => 0 !== e);
                              if (0 === n.length) return e;
                              if (1 === n.length)
                                return { ...e, error: t('importSRPWordError', [n[0]]) };
                              const o = n.pop(),
                                a = n.join(', ');
                              return { ...e, error: t('importSRPWordErrorAlternative', [a, o]) };
                            })(l)),
                            (l = ((e, n) =>
                              e.error || (0, r.isValidMnemonic)(n)
                                ? e
                                : { ...e, error: t('invalidSeedPhrase') })(l, a)),
                            y(l.error),
                            w(l.words);
                        }
                        var n, o;
                        C(e);
                      },
                      [t, y, C, v]
                    ),
                    N = (0, o.useCallback)(
                      e => {
                        let t = (0, p.parseSecretRecoveryPhrase)(e).split(' ');
                        if (t.length > 24) return void b(!0);
                        k && b(!1);
                        let n = v;
                        t.length !== v &&
                          ((n =
                            t.length < 12
                              ? 12
                              : t.length % 3 == 0
                                ? t.length
                                : t.length + (3 - (t.length % 3))),
                          T(n)),
                          t.length < n && (t = t.concat(new Array(n - t.length).fill(''))),
                          A(t),
                          (0, m.clearClipboard)();
                      },
                      [v, A, k, b]
                    ),
                    O = (0, o.useCallback)(
                      (e, t) => {
                        k && b(!1);
                        const n = x.slice();
                        (n[e] = t.trim()), A(n);
                      },
                      [x, A, k]
                    );
                  return o.default.createElement(
                    c.Box,
                    {
                      display: u.Display.Flex,
                      flexDirection: u.FlexDirection.Column,
                      height: u.BlockSize.Max,
                      'data-testid': 'import-srp-container',
                    },
                    o.default.createElement(
                      c.Text,
                      { variant: u.TextVariant.bodyMd, marginTop: 2 },
                      t('importSRPDescription')
                    ),
                    o.default.createElement(
                      c.Box,
                      { className: 'import-srp__multi-srp__srp-inner-container' },
                      o.default.createElement(
                        c.Box,
                        {
                          className: 'import-srp__multi-srp__srp',
                          width: u.BlockSize.Full,
                          marginTop: 4,
                        },
                        Array.from({ length: v }).map((e, t) => {
                          const n = `import-srp__multi-srp__srp-word-${t}`;
                          return o.default.createElement(
                            c.Box,
                            { key: t, display: u.Display.Flex, flexDirection: u.FlexDirection.Row },
                            o.default.createElement(
                              c.Label,
                              {
                                className: 'import-srp__multi-srp__label',
                                variant: u.TextVariant.bodyMdMedium,
                                marginRight: 4,
                              },
                              t + 1,
                              '.'
                            ),
                            o.default.createElement(
                              c.Box,
                              { className: 'import-srp__multi-srp__srp-word', marginBottom: 4 },
                              o.default.createElement(c.TextField, {
                                id: n,
                                'data-testid': n,
                                borderRadius: u.BorderRadius.LG,
                                error: E[t],
                                type: c.TextFieldType.Text,
                                onChange: e => {
                                  e.preventDefault(), O(t, e.target.value);
                                },
                                value: x[t],
                                autoComplete: !1,
                                onPaste: e => {
                                  const t = e.clipboardData.getData('text');
                                  t.trim().match(/\s/u) && (e.preventDefault(), N(t));
                                },
                              })
                            )
                          );
                        })
                      ),
                      h
                        ? o.default.createElement(c.BannerAlert, {
                            severity: c.BannerAlertSeverity.Danger,
                            description: h,
                            actionButtonLabel: t('clear'),
                            actionButtonOnClick: () => {
                              A(Array(12).fill('')), y('');
                            },
                            'data-testid': 'bannerAlert',
                          })
                        : null,
                      o.default.createElement(
                        c.Box,
                        { width: u.BlockSize.Full, marginTop: 4 },
                        o.default.createElement(
                          c.ButtonLink,
                          {
                            width: u.BlockSize.Full,
                            loading: _,
                            onClick: async () => {
                              T(12 === v ? 24 : 12), y(''), w(Array(12 === v ? 24 : 12).fill(!1));
                            },
                            'data-testid': 'import-srp__multi-srp__switch-word-count-button',
                          },
                          t('importNWordSRP', [12 === v ? '24' : '12'])
                        )
                      )
                    ),
                    o.default.createElement(
                      c.Box,
                      {
                        className: 'import-srp__multi-srp__import-button',
                        width: u.BlockSize.Full,
                        marginTop: 4,
                        paddingBottom: 6,
                        paddingTop: 2,
                        backgroundColor: (g.ThemeType.light, u.BackgroundColor.backgroundDefault),
                      },
                      o.default.createElement(
                        c.ButtonPrimary,
                        {
                          width: u.BlockSize.Full,
                          disabled: !I || S,
                          loading: _,
                          onClick: async () => {
                            try {
                              M(!0),
                                await (async function () {
                                  const e = x.join(' ');
                                  e && (await n(l.importMnemonicToVault(e)), C(Array(12).fill('')));
                                })(),
                                e(!0),
                                n((0, d.setShowNewSrpAddedToast)(!0));
                            } catch (e) {
                              y(e instanceof Error ? e.message : 'An unknown error occurred'),
                                M(!1);
                            }
                          },
                        },
                        t('importWallet')
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/import-srp/import-srp.tsx' },
    ],
    [
      6579,
      { './import-srp': 6578 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ImportSrp', {
                    enumerable: !0,
                    get: function () {
                      return o.ImportSrp;
                    },
                  });
                var o = e('./import-srp');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/import-srp/index.ts' },
    ],
    [
      6580,
      { './import-srp': 6579, './select-srp': 6581, './srp-list': 6583 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ImportSrp', {
                    enumerable: !0,
                    get: function () {
                      return o.ImportSrp;
                    },
                  }),
                  Object.defineProperty(n, 'SelectSrp', {
                    enumerable: !0,
                    get: function () {
                      return r.SelectSrp;
                    },
                  }),
                  Object.defineProperty(n, 'SrpList', {
                    enumerable: !0,
                    get: function () {
                      return a.SrpList;
                    },
                  });
                var o = e('./import-srp'),
                  a = e('./srp-list'),
                  r = e('./select-srp');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/index.ts' },
    ],
    [
      6581,
      { './select-srp': 6582 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SelectSrp', {
                    enumerable: !0,
                    get: function () {
                      return o.SelectSrp;
                    },
                  });
                var o = e('./select-srp');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/select-srp/index.ts' },
    ],
    [
      6582,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        '../../../ui/card': 6711,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SelectSrp = void 0);
                var o = l(e('react')),
                  a = l(e('../../../ui/card')),
                  r = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.SelectSrp = ({ srpName: e, srpAccounts: t, onClick: n }) => {
                  const l = (0, s.useI18nContext)();
                  return o.default.createElement(
                    r.Box,
                    { 'data-testid': 'select-srp-container' },
                    o.default.createElement(
                      r.Label,
                      { marginBottom: 2 },
                      l('selectSecretRecoveryPhrase')
                    ),
                    o.default.createElement(
                      a.default,
                      {
                        onClick: n,
                        paddingTop: 1,
                        paddingBottom: 1,
                        className: 'select-srp__container',
                        'data-testid': `select-srp-${e}`,
                      },
                      o.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          alignItems: i.AlignItems.center,
                          justifyContent: i.JustifyContent.spaceBetween,
                        },
                        o.default.createElement(
                          r.Box,
                          null,
                          o.default.createElement(r.Text, null, e),
                          o.default.createElement(
                            r.Text,
                            { variant: i.TextVariant.bodySm, color: i.TextColor.textMuted },
                            l(t > 1 ? 'srpListNumberOfAccounts' : 'srpListSingleOrZero', [t])
                          )
                        ),
                        o.default.createElement(r.Icon, {
                          name: r.IconName.ArrowRight,
                          size: r.IconSize.Sm,
                        })
                      )
                    ),
                    o.default.createElement(
                      r.Text,
                      { variant: i.TextVariant.bodySm, marginTop: 1 },
                      l('srpListSelectionDescription')
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/select-srp/select-srp.tsx' },
    ],
    [
      6583,
      { './srp-list': 6585 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SrpList', {
                    enumerable: !0,
                    get: function () {
                      return o.SrpList;
                    },
                  });
                var o = e('./srp-list');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/srp-list/index.ts' },
    ],
    [
      6584,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useMultichainAccountTotalFiatBalance': 6991,
        '../../../app/user-preferenced-currency-display': 6317,
        '../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SrpListItem = void 0);
                var o = c(e('react')),
                  a = e('../../../../hooks/useMultichainAccountTotalFiatBalance'),
                  r = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../helpers/utils/util'),
                  s = c(e('../../../app/user-preferenced-currency-display')),
                  l = e('../../../component-library');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.SrpListItem = ({ account: e }) => {
                  const { totalFiatBalance: t } = (0, a.useMultichainAccountTotalFiatBalance)(e);
                  return o.default.createElement(
                    l.Box,
                    {
                      key: e.address,
                      display: r.Display.Flex,
                      flexDirection: r.FlexDirection.Row,
                      alignItems: r.AlignItems.center,
                      justifyContent: r.JustifyContent.spaceBetween,
                    },
                    o.default.createElement(
                      l.Box,
                      {
                        display: r.Display.Flex,
                        flexDirection: r.FlexDirection.Row,
                        alignItems: r.AlignItems.center,
                      },
                      o.default.createElement(l.AvatarAccount, {
                        address: e.address,
                        size: l.AvatarAccountSize.Xs,
                      }),
                      o.default.createElement(
                        l.Text,
                        {
                          className: 'srp-list__account-name',
                          variant: r.TextVariant.bodySm,
                          ellipsis: !0,
                          paddingInlineStart: 3,
                        },
                        e.metadata.name
                      ),
                      o.default.createElement(
                        l.Text,
                        {
                          variant: r.TextVariant.bodySm,
                          color: r.TextColor.textAlternative,
                          marginLeft: 1,
                          paddingInlineStart: 1,
                        },
                        (0, i.shortenAddress)(e.address)
                      )
                    ),
                    o.default.createElement(
                      l.Text,
                      { variant: r.TextVariant.bodySm },
                      o.default.createElement(s.default, {
                        account: e,
                        value: t,
                        type: 'PRIMARY',
                        ethNumberOfDecimals: 4,
                        hideTitle: !0,
                        showFiat: !0,
                        isAggregatedFiatOverviewBalance: !0,
                        hideLabel: !0,
                      })
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/srp-list/srp-list-item.tsx' },
    ],
    [
      6585,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/multi-srp/useHdKeyringsWithSnapAccounts': 6956,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors/selectors': 7611,
        '../../../component-library': 6402,
        '../../../ui/card': 6711,
        './srp-list-item': 6584,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SrpList = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  i = (o = e('../../../ui/card')) && o.__esModule ? o : { default: o },
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../selectors/selectors'),
                  u = e('../../../../hooks/useI18nContext'),
                  d = e('../../../../../shared/constants/metametrics'),
                  p = e('../../../../contexts/metametrics'),
                  m = e('../../../../hooks/multi-srp/useHdKeyringsWithSnapAccounts'),
                  f = e('./srp-list-item');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SrpList = ({ onActionComplete: e, hideShowAccounts: t }) => {
                  const n = (0, u.useI18nContext)(),
                    o = (0, a.useContext)(p.MetaMetricsContext),
                    g = (0, m.useHdKeyringsWithSnapAccounts)(),
                    h = (0, r.useSelector)(c.getMetaMaskAccounts),
                    y = (0, a.useMemo)(() => new Array(g.length).fill(t), [g, t]),
                    [k, b] = (0, a.useState)(y);
                  return a.default.createElement(
                    s.Box,
                    { className: 'srp-list__container', padding: 4, 'data-testid': 'srp-list' },
                    g.map((r, c) =>
                      a.default.createElement(
                        i.default,
                        {
                          key: `srp-${r.metadata.id}`,
                          'data-testid': `hd-keyring-${r.metadata.id}`,
                          onClick: () => {
                            o({
                              category: d.MetaMetricsEventCategory.Accounts,
                              event: d.MetaMetricsEventName.SecretRecoveryPhrasePickerSelected,
                            }),
                              e(r.metadata.id);
                          },
                          className: 'select-srp__container',
                          marginBottom: 3,
                        },
                        a.default.createElement(
                          s.Box,
                          {
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Row,
                            alignItems: l.AlignItems.center,
                            justifyContent: l.JustifyContent.spaceBetween,
                          },
                          a.default.createElement(
                            s.Box,
                            null,
                            a.default.createElement(s.Text, null, n('srpListName', [c + 1])),
                            !t &&
                              a.default.createElement(
                                s.Text,
                                {
                                  variant: l.TextVariant.bodySm,
                                  color: l.TextColor.primaryDefault,
                                  className: 'srp-list__show-accounts',
                                  'data-testid': `srp-list-show-accounts-${c}`,
                                  onClick: e => {
                                    e.stopPropagation(),
                                      o({
                                        category: d.MetaMetricsEventCategory.Accounts,
                                        event:
                                          d.MetaMetricsEventName
                                            .SecretRecoveryPhrasePickerDetailsClicked,
                                      }),
                                      b(e => e.map((e, t) => (t === c ? !e : e)));
                                  },
                                },
                                ((e, t) =>
                                  t > 1
                                    ? k[e]
                                      ? n('SrpListHideAccounts', [t])
                                      : n('SrpListShowAccounts', [t])
                                    : k[e]
                                      ? n('SrpListHideSingleAccount', [t])
                                      : n('SrpListShowSingleAccount', [t]))(c, r.accounts.length)
                              )
                          ),
                          a.default.createElement(s.Icon, {
                            name: s.IconName.ArrowRight,
                            size: s.IconSize.Sm,
                          })
                        ),
                        k[c] &&
                          a.default.createElement(
                            s.Box,
                            null,
                            a.default.createElement(s.Box, {
                              width: l.BlockSize.Full,
                              className: 'srp-list__divider',
                              marginTop: 2,
                              marginBottom: 2,
                            }),
                            r.accounts.map(e => {
                              const t = h[e];
                              return a.default.createElement(f.SrpListItem, {
                                key: `account-${t.id}`,
                                account: t,
                              });
                            })
                          )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/multi-srp/srp-list/srp-list.tsx' },
    ],
    [
      6586,
      {
        '../../../../shared/constants/network': 5804,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../app/assets/asset-list/network-filter': 5926,
        '../../component-library': 6402,
        '../../component-library/button-base': 6368,
        '../../component-library/popover': 6434,
        '@metamask/snaps-sdk/jsx': 2862,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = n.NetworkFilterComponent = void 0);
                var o,
                  a = e('@metamask/snaps-sdk/jsx'),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library/button-base'),
                  l = e('../../component-library/popover'),
                  c = e('../../component-library'),
                  u = e('../../../../shared/constants/network'),
                  d =
                    (o = e('../../app/assets/asset-list/network-filter')) && o.__esModule
                      ? o
                      : { default: o },
                  p = e('../../../hooks/useI18nContext');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = ({
                  isFullScreen: e,
                  toggleNetworkFilterPopover: t,
                  isTestNetwork: n,
                  currentNetworkConfig: o,
                  isNetworkFilterPopoverOpen: m,
                  closePopover: f,
                  isTokenNetworkFilterEqualCurrentNetwork: g,
                }) => {
                  const h = (0, r.useRef)(null),
                    y = (0, p.useI18nContext)();
                  return r.default.createElement(
                    c.Box,
                    {
                      marginLeft: 2,
                      marginRight: 2,
                      justifyContent: e
                        ? i.JustifyContent.flexStart
                        : i.JustifyContent.spaceBetween,
                      ref: h,
                    },
                    r.default.createElement(
                      s.ButtonBase,
                      {
                        'data-testid': 'sort-by-popover-toggle',
                        className:
                          'asset-list-control-bar__button asset-list-control-bar__network_control',
                        onClick: t,
                        size: s.ButtonBaseSize.Sm,
                        disabled: n || !u.FEATURED_NETWORK_CHAIN_IDS.includes(o.chainId),
                        endIconName: a.IconName.ArrowDown,
                        backgroundColor: m
                          ? i.BackgroundColor.backgroundPressed
                          : i.BackgroundColor.backgroundDefault,
                        color: i.TextColor.textDefault,
                        marginRight: e ? 2 : null,
                        ellipsis: !0,
                      },
                      g
                        ? ((null == o ? void 0 : o.nickname) ?? y('currentNetwork'))
                        : y('popularNetworks')
                    ),
                    r.default.createElement(
                      l.Popover,
                      {
                        onClickOutside: f,
                        isOpen: m,
                        position: l.PopoverPosition.BottomStart,
                        referenceElement: h.current,
                        matchWidth: !e,
                        style: {
                          zIndex: 10,
                          display: 'flex',
                          flexDirection: 'column',
                          padding: 0,
                          minWidth: e ? '325px' : '',
                        },
                      },
                      r.default.createElement(d.default, { handleClose: f })
                    )
                  );
                };
                n.NetworkFilterComponent = f;
                n.default = f;
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/network-filter-menu/index.tsx' },
    ],
    [
      6587,
      { './network-list-item-menu': 6588 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NetworkListItemMenu', {
                    enumerable: !0,
                    get: function () {
                      return o.NetworkListItemMenu;
                    },
                  });
                var o = e('./network-list-item-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/network-list-item-menu/index.js' },
    ],
    [
      6588,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
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
                  (n.NetworkListItemMenu = void 0);
                var o = c(e('react')),
                  a = c(e('prop-types')),
                  r = e('../../../hooks/useI18nContext'),
                  i = e('../../component-library'),
                  s = e('../../ui/menu'),
                  l = e('../../../helpers/constants/design-system');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({
                  anchorElement: e,
                  onClose: t,
                  onEditClick: n,
                  onDeleteClick: a,
                  onDiscoverClick: c,
                  isOpen: u,
                }) => {
                  const d = (0, r.useI18nContext)();
                  return o.default.createElement(
                    i.Popover,
                    {
                      className: 'multichain-network-list-item-menu__popover',
                      onClickOutside: t,
                      referenceElement: e,
                      role: i.PopoverRole.Dialog,
                      position: i.PopoverPosition.BottomEnd,
                      offset: [8, 0],
                      padding: 0,
                      isOpen: u,
                      isPortal: !0,
                      preventOverflow: !0,
                      flip: !0,
                    },
                    o.default.createElement(
                      i.ModalFocus,
                      { restoreFocus: !0, initialFocusRef: e },
                      o.default.createElement(
                        i.Box,
                        null,
                        c
                          ? o.default.createElement(
                              s.MenuItem,
                              {
                                iconName: i.IconName.Eye,
                                onClick: e => {
                                  e.stopPropagation(), c();
                                },
                                'data-testid': 'network-list-item-options-discover',
                              },
                              o.default.createElement(i.Text, null, d('discover'))
                            )
                          : null,
                        n
                          ? o.default.createElement(
                              s.MenuItem,
                              {
                                iconName: i.IconName.Edit,
                                onClick: e => {
                                  e.stopPropagation(), n();
                                },
                                'data-testid': 'network-list-item-options-edit',
                              },
                              o.default.createElement(i.Text, null, ' ', d('edit'))
                            )
                          : null,
                        a
                          ? o.default.createElement(
                              s.MenuItem,
                              {
                                iconName: i.IconName.Trash,
                                iconColor: l.IconColor.errorDefault,
                                onClick: e => {
                                  e.stopPropagation(), a();
                                },
                                'data-testid': 'network-list-item-options-delete',
                              },
                              o.default.createElement(
                                i.Text,
                                { color: l.TextColor.errorDefault },
                                d('delete')
                              )
                            )
                          : null
                      )
                    )
                  );
                };
                (n.NetworkListItemMenu = u),
                  (u.propTypes = {
                    anchorElement: a.default.instanceOf(window.Element),
                    onClose: a.default.func.isRequired,
                    onEditClick: a.default.func,
                    onDeleteClick: a.default.func,
                    onDiscoverClick: a.default.func,
                    isOpen: a.default.bool.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/network-list-item-menu/network-list-item-menu.js',
      },
    ],
    [
      6589,
      { './network-list-item': 6590 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NetworkListItem', {
                    enumerable: !0,
                    get: function () {
                      return o.NetworkListItem;
                    },
                  });
                var o = e('./network-list-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/network-list-item/index.js' },
    ],
    [
      6590,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/accounts': 6896,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/tooltip/tooltip': 6819,
        '../network-list-item-menu': 6587,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.NetworkListItem = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = p(e('classnames')),
                  r = p(e('prop-types')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/utils/accounts'),
                  u = p(e('../../ui/tooltip/tooltip')),
                  d = e('../network-list-item-menu');
                function p(e) {
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
                const f = ({
                  name: e,
                  iconSrc: t,
                  iconSize: n = s.AvatarNetworkSize.Md,
                  rpcEndpoint: r,
                  chainId: p,
                  selected: m = !1,
                  focus: f = !0,
                  onClick: g,
                  onDeleteClick: h,
                  onEditClick: y,
                  onDiscoverClick: k,
                  onRpcEndpointClick: b,
                  startAccessory: x,
                  endAccessory: C,
                  showEndAccessory: v = !0,
                  disabled: T = !1,
                  variant: E,
                }) => {
                  const w = (0, l.useI18nContext)(),
                    _ = (0, o.useRef)(null),
                    [M, I] = (0, o.useState)(),
                    S = e => {
                      I(e);
                    },
                    [A, N] = (0, o.useState)(!1),
                    O = (0, o.useCallback)(
                      () =>
                        h || y || k
                          ? o.default.createElement(s.ButtonIcon, {
                              iconName: s.IconName.MoreVertical,
                              ref: S,
                              'data-testid': `network-list-item-options-button-${p}`,
                              ariaLabel: w('networkOptions'),
                              onClick: e => {
                                e.stopPropagation(), N(!0);
                              },
                              size: s.ButtonIconSize.Sm,
                            })
                          : null,
                      [h, y, k, p, w, S, N]
                    );
                  (0, o.useEffect)(() => {
                    _.current && f && _.current.focus();
                  }, [_, f]);
                  return o.default.createElement(
                    s.Box,
                    {
                      paddingLeft: 4,
                      paddingRight: 4,
                      paddingTop: r ? 2 : 4,
                      paddingBottom: r ? 2 : 4,
                      gap: 4,
                      backgroundColor: m
                        ? i.BackgroundColor.primaryMuted
                        : i.BackgroundColor.transparent,
                      className: (0, a.default)('multichain-network-list-item', {
                        'multichain-network-list-item--selected': m,
                        'multichain-network-list-item--disabled': T,
                      }),
                      display: i.Display.Flex,
                      alignItems: i.AlignItems.center,
                      justifyContent: i.JustifyContent.spaceBetween,
                      width: i.BlockSize.Full,
                      onClick: T ? undefined : g,
                    },
                    x ? o.default.createElement(s.Box, { marginTop: 1 }, x) : null,
                    m &&
                      o.default.createElement(s.Box, {
                        className: 'multichain-network-list-item__selected-indicator',
                        borderRadius: i.BorderRadius.pill,
                        backgroundColor: i.BackgroundColor.primaryDefault,
                      }),
                    o.default.createElement(s.AvatarNetwork, {
                      borderColor: i.BorderColor.backgroundDefault,
                      backgroundColor: (0, c.getAvatarNetworkColor)(e),
                      name: e,
                      src: t,
                      size: n,
                    }),
                    o.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        alignItems: i.AlignItems.flexStart,
                        justifyContent: i.JustifyContent.flexStart,
                        width: i.BlockSize.Full,
                        style: { overflow: 'hidden' },
                      },
                      o.default.createElement(
                        s.Box,
                        {
                          width: i.BlockSize.Full,
                          display: i.Display.Flex,
                          alignItems: i.AlignItems.center,
                          'data-testid': e,
                        },
                        o.default.createElement(
                          u.default,
                          {
                            title: e,
                            position: 'bottom',
                            wrapperClassName: 'multichain-network-list-item__tooltip',
                            disabled: (null == e ? void 0 : e.length) <= 20,
                          },
                          o.default.createElement(
                            s.Text,
                            {
                              ref: _,
                              color: i.TextColor.textDefault,
                              backgroundColor: i.BackgroundColor.transparent,
                              variant: E ?? i.TextVariant.bodyMd,
                              ellipsis: !0,
                              onKeyDown: e => {
                                'Enter' === e.key && (e.stopPropagation(), g());
                              },
                              tabIndex: 0,
                            },
                            e
                          )
                        )
                      ),
                      r &&
                        o.default.createElement(
                          s.Box,
                          {
                            className: 'multichain-network-list-item__rpc-endpoint',
                            display: i.Display.Flex,
                            alignItems: i.AlignItems.center,
                            'data-testid': `network-rpc-name-button-${p}`,
                            onClick: e => {
                              e.stopPropagation(), null == b || b();
                            },
                          },
                          o.default.createElement(
                            s.Text,
                            {
                              padding: 0,
                              backgroundColor: i.BackgroundColor.transparent,
                              as: 'button',
                              variant: i.TextVariant.bodySmMedium,
                              color: i.TextColor.textAlternative,
                              ellipsis: !0,
                            },
                            r.name ?? new URL(r.url).host
                          ),
                          o.default.createElement(s.Icon, {
                            marginLeft: 1,
                            color: i.IconColor.iconAlternative,
                            name: s.IconName.ArrowDown,
                            size: s.IconSize.Xs,
                          })
                        )
                    ),
                    O(),
                    v
                      ? (C ??
                          o.default.createElement(d.NetworkListItemMenu, {
                            anchorElement: M,
                            isOpen: A,
                            onDeleteClick: h,
                            onEditClick: y,
                            onDiscoverClick: k,
                            onClose: () => N(!1),
                          }))
                      : null
                  );
                };
                (n.NetworkListItem = f),
                  (f.propTypes = {
                    name: r.default.string.isRequired,
                    iconSrc: r.default.string,
                    iconSize: r.default.string,
                    selected: r.default.bool,
                    onClick: r.default.func.isRequired,
                    onDeleteClick: r.default.func,
                    onEditClick: r.default.func,
                    focus: r.default.bool,
                    startAccessory: r.default.node,
                    endAccessory: r.default.node,
                    showEndAccessory: r.default.bool,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/network-list-item/network-list-item.tsx',
      },
    ],
    [
      6591,
      {
        '../../../../../app/scripts/lib/util': 204,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../component-library'),
                  r = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../../app/scripts/lib/util');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ onAdded: e }) => {
                  const t = (0, i.useI18nContext)(),
                    [n, l] = (0, o.useState)(),
                    [c, u] = (0, o.useState)();
                  return (
                    (0, o.useEffect)(() => {
                      n && (null == n ? void 0 : n.length) > 0 && !(0, s.isWebUrl)(n)
                        ? u(t('urlErrorMsg'))
                        : u(undefined);
                    }, [n]),
                    o.default.createElement(
                      a.Box,
                      {
                        className: 'add-block-explorer-modal',
                        display: r.Display.Flex,
                        flexDirection: r.FlexDirection.Column,
                        justifyContent: r.JustifyContent.spaceBetween,
                        height: r.BlockSize.Full,
                      },
                      o.default.createElement(
                        a.Box,
                        { paddingLeft: 4, paddingRight: 4 },
                        o.default.createElement(a.FormTextField, {
                          size: a.FormTextFieldSize.Lg,
                          textFieldProps: { borderRadius: r.BorderRadius.LG },
                          error: Boolean(c),
                          id: 'additional-rpc-url',
                          label: t('blockExplorerUrl'),
                          inputProps: { 'data-testid': 'explorer-url-input' },
                          labelProps: { children: undefined, variant: r.TextVariant.bodyMdMedium },
                          onChange: e => l(e.target.value),
                          autoFocus: !0,
                        }),
                        c &&
                          o.default.createElement(
                            a.HelpText,
                            { severity: a.HelpTextSeverity.Danger },
                            c
                          )
                      ),
                      o.default.createElement(
                        a.Box,
                        {
                          className: 'add-block-explorer-modal__footer',
                          backgroundColor: r.BackgroundColor.backgroundDefault,
                          padding: 4,
                          width: r.BlockSize.Full,
                        },
                        o.default.createElement(
                          a.ButtonPrimary,
                          {
                            width: r.BlockSize.Full,
                            disabled: Boolean(c),
                            size: a.ButtonPrimarySize.Lg,
                            onClick: async () => {
                              n && e(n);
                            },
                          },
                          t('addUrl')
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
        file: 'ui/components/multichain/network-list-menu/add-block-explorer-modal/add-block-explorer-modal.tsx',
      },
    ],
    [
      6592,
      {
        '../../../../../shared/constants/multichain/networks': 5803,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/accounts/useMultichainWalletSnapClient': 6925,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../../create-snap-account': 6549,
        '../../multi-srp/srp-list': 6583,
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
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../store/actions'),
                  i = e('../../../../../shared/constants/multichain/networks'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../selectors'),
                  d = e('../../create-snap-account'),
                  p = e('../../multi-srp/srp-list'),
                  m = e('../../../../hooks/accounts/useMultichainWalletSnapClient');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const g = {
                  [i.MultichainNetworks.BITCOIN]: {
                    clientType: m.WalletClientType.Bitcoin,
                    chainId: i.MultichainNetworks.BITCOIN,
                  },
                  [i.MultichainNetworks.BITCOIN_TESTNET]: {
                    clientType: m.WalletClientType.Bitcoin,
                    chainId: i.MultichainNetworks.BITCOIN_TESTNET,
                  },
                  [i.MultichainNetworks.BITCOIN_SIGNET]: {
                    clientType: m.WalletClientType.Bitcoin,
                    chainId: i.MultichainNetworks.BITCOIN_SIGNET,
                  },
                  [i.MultichainNetworks.SOLANA]: {
                    clientType: m.WalletClientType.Solana,
                    chainId: i.MultichainNetworks.SOLANA,
                  },
                  [i.MultichainNetworks.SOLANA_TESTNET]: {
                    clientType: m.WalletClientType.Solana,
                    chainId: i.MultichainNetworks.SOLANA_TESTNET,
                  },
                  [i.MultichainNetworks.SOLANA_DEVNET]: {
                    clientType: m.WalletClientType.Solana,
                    chainId: i.MultichainNetworks.SOLANA_DEVNET,
                  },
                };
                n.default = ({ chainId: e }) => {
                  const t = (0, c.useI18nContext)(),
                    n = (0, a.useDispatch)(),
                    [m] = (0, a.useSelector)(u.getMetaMaskHdKeyrings),
                    [f, h] = o.default.useState(!1),
                    [y, k] = o.default.useState(!1),
                    [b, x] = o.default.useState(m.metadata.id),
                    C = (0, o.useCallback)(
                      async e => {
                        e ? n((0, r.toggleNetworkMenu)()) : k(!1);
                      },
                      [n]
                    ),
                    v = (0, o.useCallback)(() => {
                      h(!0), k(!1);
                    }, []),
                    T = (0, o.useCallback)(e => {
                      x(e), k(!0);
                    }, []),
                    E = (0, o.useCallback)(() => {
                      k(!0);
                    }, []),
                    { clientType: w, chainId: _ } = g[e] || { clientType: null, chainId: null };
                  return y && w && _
                    ? o.default.createElement(
                        s.Box,
                        {
                          className: 'add-non-evm-account-modal',
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Column,
                          justifyContent: l.JustifyContent.spaceBetween,
                        },
                        o.default.createElement(
                          s.Box,
                          { paddingLeft: 4, paddingRight: 4, paddingBottom: 4 },
                          o.default.createElement(d.CreateSnapAccount, {
                            onActionComplete: C,
                            selectedKeyringId: b,
                            onSelectSrp: v,
                            clientType: w,
                            chainId: _,
                          })
                        )
                      )
                    : f
                      ? o.default.createElement(
                          s.Box,
                          {
                            className: 'add-non-evm-account-modal',
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                            justifyContent: l.JustifyContent.spaceBetween,
                          },
                          o.default.createElement(p.SrpList, { onActionComplete: T })
                        )
                      : o.default.createElement(
                          s.Box,
                          {
                            className: 'add-non-evm-account-modal',
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                            justifyContent: l.JustifyContent.spaceBetween,
                          },
                          o.default.createElement(
                            s.Box,
                            { paddingLeft: 4, paddingRight: 4 },
                            o.default.createElement(
                              s.Text,
                              { textAlign: l.TextAlign.Left, variant: l.TextVariant.bodyMd },
                              t('addNonEvmAccountFromNetworkPicker', [
                                i.MULTICHAIN_NETWORK_TO_NICKNAME[e],
                                i.MULTICHAIN_NETWORK_TO_ACCOUNT_TYPE_NAME[e],
                              ])
                            )
                          ),
                          o.default.createElement(
                            s.Box,
                            {
                              className: 'add-non-evm-account-modal__footer',
                              padding: 4,
                              width: l.BlockSize.Full,
                            },
                            o.default.createElement(
                              s.ButtonPrimary,
                              { width: l.BlockSize.Full, size: s.ButtonPrimarySize.Lg, onClick: E },
                              t('addAccount')
                            )
                          )
                        );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/network-list-menu/add-non-evm-account/add-non-evm-account.tsx',
      },
    ],
    [
      6593,
      {
        '../../../../../app/scripts/lib/util': 204,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../component-library'),
                  r = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../../app/scripts/lib/util');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ onAdded: e }) => {
                  const t = (0, i.useI18nContext)(),
                    [n, l] = (0, o.useState)(),
                    [c, u] = (0, o.useState)(),
                    d = (0, o.useRef)(null);
                  return (
                    (0, o.useEffect)(() => {
                      n && !(0, s.isWebUrl)(n)
                        ? u((0, s.isWebUrl)(`https://${n}`) ? t('urlErrorMsg') : t('invalidRPC'))
                        : u(undefined);
                    }, [n]),
                    o.default.createElement(
                      a.Box,
                      {
                        className: 'add-rpc-modal',
                        display: r.Display.Flex,
                        flexDirection: r.FlexDirection.Column,
                        justifyContent: r.JustifyContent.spaceBetween,
                        height: r.BlockSize.Full,
                      },
                      o.default.createElement(
                        a.Box,
                        { paddingTop: 4, paddingLeft: 4, paddingRight: 4 },
                        o.default.createElement(a.FormTextField, {
                          id: 'rpcUrl',
                          size: a.FormTextFieldSize.Lg,
                          error: Boolean(c),
                          label: t('rpcUrl'),
                          placeholder: t('enterRpcUrl'),
                          textFieldProps: { borderRadius: r.BorderRadius.LG },
                          labelProps: { children: undefined, variant: r.TextVariant.bodyMdMedium },
                          inputProps: { 'data-testid': 'rpc-url-input-test' },
                          onChange: e => l(e.target.value),
                          autoFocus: !0,
                        }),
                        c &&
                          o.default.createElement(
                            a.HelpText,
                            { severity: a.HelpTextSeverity.Danger },
                            c
                          ),
                        o.default.createElement(a.FormTextField, {
                          id: 'rpcName',
                          size: a.FormTextFieldSize.Lg,
                          inputProps: { 'data-testid': 'rpc-name-input-test' },
                          placeholder: t('enterANameToIdentifyTheUrl'),
                          paddingTop: 4,
                          inputRef: d,
                          label: t('rpcNameOptional'),
                          textFieldProps: { borderRadius: r.BorderRadius.LG },
                          labelProps: { children: undefined, variant: r.TextVariant.bodyMdMedium },
                        })
                      ),
                      o.default.createElement(
                        a.Box,
                        {
                          className: 'add-rpc-modal__footer',
                          backgroundColor: r.BackgroundColor.backgroundDefault,
                          padding: 4,
                          width: r.BlockSize.Full,
                        },
                        o.default.createElement(
                          a.ButtonPrimary,
                          {
                            width: r.BlockSize.Full,
                            disabled: Boolean(c),
                            size: a.ButtonPrimarySize.Lg,
                            onClick: async () => {
                              n && !c && d.current && e(n, d.current.value || undefined);
                            },
                          },
                          t('addUrl')
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
        file: 'ui/components/multichain/network-list-menu/add-rpc-url-modal/add-rpc-url-modal.tsx',
      },
    ],
    [
      6594,
      { './network-list-menu': 6596 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NetworkListMenu', {
                    enumerable: !0,
                    get: function () {
                      return o.NetworkListMenu;
                    },
                  });
                var o = e('./network-list-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/network-list-menu/index.js' },
    ],
    [
      6595,
      {
        '../../../../pages/confirmations/confirmation/confirmation': 7276,
        '../../../../selectors': 7601,
        '../../../ui/popover': 6789,
        '@metamask/approval-controller': 1323,
        '@metamask/controller-utils': 1515,
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
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/controller-utils'),
                  i = e('@metamask/approval-controller'),
                  s = u(e('../../../ui/popover')),
                  l = u(e('../../../../pages/confirmations/confirmation/confirmation')),
                  c = e('../../../../selectors');
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
                n.default = () => {
                  const [e, t] = (0, o.useState)(!1),
                    n = (0, a.useSelector)(c.getUnapprovedConfirmations);
                  return (
                    (0, o.useEffect)(() => {
                      const o =
                        null == n
                          ? void 0
                          : n.find(
                              e =>
                                e.origin === i.ORIGIN_METAMASK &&
                                e.type === r.ApprovalType.AddEthereumChain
                            );
                      !e && o ? t(!0) : e && !o && t(!1);
                    }, [n, e]),
                    e
                      ? o.default.createElement(
                          s.default,
                          { 'data-testid': 'network-popover' },
                          o.default.createElement(l.default, {
                            redirectToHomeOnZeroConfirmations: !1,
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
        file: 'ui/components/multichain/network-list-menu/network-confirmation-popover/network-confirmation-popover.tsx',
      },
    ],
    [
      6596,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/modules/network.utils': 5868,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/window': 6923,
        '../../../hooks/accounts/useAccountCreationOnNetworkChange': 6924,
        '../../../hooks/useI18nContext': 6985,
        '../../../pages/settings/networks-tab/networks-form': 7492,
        '../../../pages/settings/networks-tab/networks-form/networks-form-state': 7493,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/toggle-button': 6814,
        '../network-list-item': 6589,
        './add-block-explorer-modal/add-block-explorer-modal': 6591,
        './add-non-evm-account/add-non-evm-account': 6592,
        './add-rpc-url-modal/add-rpc-url-modal': 6593,
        './network-list-search/network-list-search': 6597,
        './popular-network-list/popular-network-list': 6598,
        './select-rpc-url-modal/select-rpc-url-modal': 6600,
        '@metamask/keyring-api': 2014,
        '@metamask/multichain-network-controller': 2141,
        '@metamask/network-controller': 2202,
        '@metamask/utils': 2995,
        'fuse.js': 4545,
        react: 5328,
        'react-beautiful-dnd': 5152,
        'react-redux': 5286,
        'uri-js': 5708,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NetworkListMenu = n.ACTION_MODE = void 0);
                var o = F(e('react')),
                  a = e('react-beautiful-dnd'),
                  r = e('react-redux'),
                  i = D(e('fuse.js')),
                  s = F(e('uri-js')),
                  l = e('@metamask/keyring-api'),
                  c = e('@metamask/network-controller'),
                  u = e('@metamask/multichain-network-controller'),
                  d = e('@metamask/utils'),
                  p = e('../../../hooks/useI18nContext'),
                  m = e('../../../hooks/accounts/useAccountCreationOnNetworkChange'),
                  f = e('../network-list-item'),
                  g = e('../../../store/actions'),
                  h = e('../../../../shared/constants/network'),
                  y = e('../../../../shared/constants/multichain/networks'),
                  k = e('../../../selectors'),
                  b = D(e('../../ui/toggle-button')),
                  x = e('../../../helpers/constants/design-system'),
                  C = e('../../component-library'),
                  v = e('../../../contexts/metametrics'),
                  T = e('../../../../shared/constants/metametrics'),
                  E = e('../../../../shared/modules/network.utils'),
                  w = e('../../../ducks/metamask/metamask'),
                  _ = D(e('../../../pages/settings/networks-tab/networks-form')),
                  M = e('../../../pages/settings/networks-tab/networks-form/networks-form-state'),
                  I = e('../../../helpers/utils/window'),
                  S = D(e('./popular-network-list/popular-network-list')),
                  A = D(e('./network-list-search/network-list-search')),
                  N = D(e('./add-rpc-url-modal/add-rpc-url-modal')),
                  O = e('./select-rpc-url-modal/select-rpc-url-modal'),
                  P = D(e('./add-block-explorer-modal/add-block-explorer-modal')),
                  B = D(e('./add-non-evm-account/add-non-evm-account'));
                function D(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function j(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (j = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function F(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = j(t);
                  if (n && n.has(e)) return n.get(e);
                  var o = { __proto__: null },
                    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                      i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                    }
                  return (o.default = e), n && n.set(e, o), o;
                }
                function L() {
                  return (
                    (L = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    L.apply(null, arguments)
                  );
                }
                let R = (n.ACTION_MODE = (function (e) {
                  return (
                    (e[(e.LIST = 0)] = 'LIST'),
                    (e[(e.ADD_EDIT = 1)] = 'ADD_EDIT'),
                    (e[(e.ADD_RPC = 2)] = 'ADD_RPC'),
                    (e[(e.ADD_EXPLORER_URL = 3)] = 'ADD_EXPLORER_URL'),
                    (e[(e.SELECT_RPC = 4)] = 'SELECT_RPC'),
                    (e[(e.ADD_NON_EVM_ACCOUNT = 5)] = 'ADD_NON_EVM_ACCOUNT'),
                    e
                  );
                })({}));
                n.NetworkListMenu = ({ onClose: e }) => {
                  const t = (0, p.useI18nContext)(),
                    n = (0, r.useDispatch)(),
                    D = (0, o.useContext)(v.MetaMetricsContext),
                    { hasAnyAccountsInNetwork: j } = (0, m.useAccountCreationOnNetworkChange)(),
                    { tokenNetworkFilter: F } = (0, r.useSelector)(k.getPreferences),
                    $ = (0, r.useSelector)(k.getShowTestNetworks),
                    W = (0, r.useSelector)(k.getOriginOfCurrentTab),
                    z = (0, r.useSelector)(w.getIsUnlocked),
                    U = (0, r.useSelector)(k.getAllDomains),
                    V = (0, r.useSelector)(k.getOrderedNetworksList),
                    H = (0, r.useSelector)(k.getIsAddingNewNetwork),
                    G = (0, r.useSelector)(k.getIsMultiRpcOnboarding),
                    K = (0, r.useSelector)(w.getCompletedOnboarding),
                    J = (0, r.useSelector)(k.getOnboardedInThisUISession),
                    q = (0, r.useSelector)(k.getShowNetworkBanner),
                    X = (0, r.useSelector)(k.getIsPortfolioDiscoverButtonEnabled),
                    [Y, Z] = (0, r.useSelector)(k.getMultichainNetworkConfigurationsByChainId),
                    Q = (0, r.useSelector)(k.getSelectedMultichainNetworkChainId),
                    { chainId: ee, editCompleted: te } =
                      (0, r.useSelector)(k.getEditedNetwork) ?? {},
                    ne = (0, r.useSelector)(e => (0, k.getPermittedEVMChainsForSelectedTab)(e, W)),
                    oe = (0, r.useSelector)(e =>
                      (0, k.getPermittedEVMAccountsForSelectedTab)(e, W)
                    ),
                    ae = (0, r.useSelector)(k.getAllChainsToPoll),
                    re = (0, o.useMemo)(() => {
                      const { namespace: e } = (0, d.parseCaipChainId)(Q);
                      return (
                        e === d.KnownCaipNamespace.Eip155 &&
                        h.TEST_CHAINS.includes((0, E.convertCaipToHexChainId)(Q))
                      );
                    }, [Q]),
                    [ie, se] = (0, o.useMemo)(
                      () =>
                        Object.entries(Y).reduce(
                          ([e, t], [n, o]) => {
                            let a = n,
                              r = !1;
                            return (
                              o.isEvm
                                ? ((a = (0, E.convertCaipToHexChainId)(o.chainId)),
                                  (r = h.TEST_CHAINS.includes(a)))
                                : (r = u.NON_EVM_TESTNET_IDS.includes(o.chainId)),
                              ((r ? t : e)[a] = o),
                              [e, t]
                            );
                          },
                          [{}, {}]
                        ),
                      [Y]
                    ),
                    le = (0, o.useMemo)(() => {
                      var e;
                      return !ee || te
                        ? undefined
                        : null === (e = Object.entries(Z).find(([e]) => e === ee)) || void 0 === e
                          ? void 0
                          : e[1];
                    }, [ee, te, Z]),
                    [ce, ue] = (0, o.useState)(H || le ? R.ADD_EDIT : R.LIST),
                    de = (0, M.useNetworkFormState)(le),
                    { rpcUrls: pe, setRpcUrls: me, blockExplorers: fe, setBlockExplorers: ge } = de,
                    [he, ye] = (0, o.useState)((0, E.sortNetworks)(ie, V));
                  (0, o.useEffect)(() => ye((0, E.sortNetworks)(ie, V)), [ie, V]);
                  const ke = e => {
                      if (e.destination) {
                        const t = [...he],
                          [o] = t.splice(e.source.index, 1);
                        t.splice(e.destination.index, 0, o),
                          n((0, g.updateNetworksList)(t.map(e => e.chainId))),
                          ye(t);
                      }
                    },
                    be = (0, o.useMemo)(
                      () =>
                        h.FEATURED_RPCS.filter(({ chainId: e }) => !Z[e]).sort((e, t) =>
                          e.name.localeCompare(t.name)
                        ),
                      [Z]
                    ),
                    [xe, Ce] = (0, o.useState)(),
                    [ve, Te] = (0, o.useState)(''),
                    [Ee, we] = (0, o.useState)(!1),
                    _e = (e, t) =>
                      '' === ve
                        ? e
                        : new i.default(e, {
                            threshold: 0.2,
                            location: 0,
                            distance: 100,
                            maxPatternLength: 32,
                            minMatchCharLength: 1,
                            shouldSort: !1,
                            keys: ['name', 'chainId', 'nativeCrrency'],
                          }).search(t),
                    Me = _e(he, ve),
                    Ie = _e(be, ve),
                    Se = _e(Object.values(se), ve),
                    Ae = e => {
                      const t = (0, E.convertCaipToHexChainId)(e),
                        { defaultRpcEndpoint: o } = (0, E.getRpcDataByChainId)(e, Z),
                        { networkClientId: a } = o;
                      if (
                        (n((0, g.setActiveNetwork)(a)),
                        n((0, g.updateCustomNonce)('')),
                        n((0, g.setNextNonce)('')),
                        n((0, g.detectNfts)(ae)),
                        n((0, g.toggleNetworkMenu)()),
                        Object.keys(F || {}).length <= 1)
                      )
                        n((0, g.setTokenNetworkFilter)({ [t]: !0 }));
                      else {
                        const e = Object.keys(Z).reduce((e, t) => ((e[t] = !0), e), {});
                        n((0, g.setTokenNetworkFilter)(e));
                      }
                      W && U[W] && (0, g.setNetworkClientIdForDomain)(W, a),
                        oe.length > 0 &&
                          (n((0, g.addPermittedChain)(W, e)),
                          ne.includes(t) || n((0, g.showPermittedNetworkToast)()));
                    },
                    Ne = e => {
                      const t = Y[e];
                      if (!t) throw new Error(`Network configuration not found for chainId: ${e}`);
                      return t;
                    },
                    Oe = async e => {
                      const t = Ne(Q),
                        o = Ne(e);
                      o.isEvm
                        ? Ae(e)
                        : await (async e => {
                            if (j(e))
                              return (
                                n((0, g.toggleNetworkMenu)()), void n((0, g.setActiveNetwork)(e))
                              );
                            Ce(e), ue(R.ADD_NON_EVM_ACCOUNT);
                          })(e);
                      const a = o.isEvm ? (0, E.convertCaipToHexChainId)(e) : e,
                        r = t.isEvm ? (0, E.convertCaipToHexChainId)(Q) : Q;
                      D({
                        event: T.MetaMetricsEventName.NavNetworkSwitched,
                        category: T.MetaMetricsEventCategory.Network,
                        properties: {
                          location: 'Network Menu',
                          chain_id: r,
                          from_network: r,
                          to_network: a,
                        },
                      });
                    },
                    Pe = (0, o.useCallback)(
                      e => X && h.CHAIN_ID_PROFOLIO_LANDING_PAGE_URL_MAP[e] !== undefined,
                      [X]
                    ),
                    Be = (0, o.useCallback)(
                      e =>
                        e.isEvm && (0, E.getRpcDataByChainId)(e.chainId, Z).rpcEndpoints.length > 1,
                      [Z]
                    ),
                    De = (0, o.useCallback)(e => e.isEvm || z || j(e.chainId), [j, z]),
                    je = (0, o.useCallback)(
                      e => {
                        const { chainId: t, isEvm: o } = e;
                        if (!o) return {};
                        const a = (0, E.convertCaipToHexChainId)(t);
                        return {
                          onDelete:
                            z && e.chainId !== Q && e.chainId !== l.EthScope.Mainnet
                              ? () => {
                                  n((0, g.toggleNetworkMenu)()),
                                    n(
                                      (0, g.showModal)({
                                        name: 'CONFIRM_DELETE_NETWORK',
                                        target: a,
                                        onConfirm: () => undefined,
                                      })
                                    );
                                }
                              : undefined,
                          onEdit: () => {
                            n((0, g.setEditedNetwork)({ chainId: a, nickname: e.name })),
                              ue(R.ADD_EDIT);
                          },
                          onDiscoverClick: Pe(a)
                            ? () => {
                                (0, I.openWindow)(
                                  h.CHAIN_ID_PROFOLIO_LANDING_PAGE_URL_MAP[a],
                                  '_blank'
                                );
                              }
                            : undefined,
                          onRpcConfigEdit: Be(e)
                            ? () => {
                                ue(R.SELECT_RPC), n((0, g.setEditedNetwork)({ chainId: a }));
                              }
                            : undefined,
                        };
                      },
                      [Q, n, Be, z, Pe]
                    ),
                    Fe = e => {
                      const t = e.chainId === Q,
                        { onDelete: n, onEdit: a, onDiscoverClick: r, onRpcConfigEdit: i } = je(e),
                        s = (0, E.getNetworkIcon)(e);
                      return o.default.createElement(f.NetworkListItem, {
                        key: e.chainId,
                        chainId: e.chainId,
                        name: e.name,
                        iconSrc: s,
                        iconSize: C.AvatarNetworkSize.Sm,
                        selected: t && !Ee,
                        focus: t && !Ee,
                        rpcEndpoint: Be(e)
                          ? (0, E.getRpcDataByChainId)(e.chainId, Z).defaultRpcEndpoint
                          : undefined,
                        onClick: async () => {
                          await Oe(e.chainId);
                        },
                        onDeleteClick: n,
                        onEditClick: a,
                        onDiscoverClick: r,
                        onRpcEndpointClick: i,
                        disabled: !De(e),
                      });
                    };
                  let Le, Re;
                  return (
                    (Le =
                      ce === R.LIST
                        ? t('networkMenuHeading')
                        : ce !== R.ADD_EDIT || le
                          ? ce === R.ADD_RPC
                            ? t('addRpcUrl')
                            : ce === R.ADD_EXPLORER_URL
                              ? t('addBlockExplorerUrl')
                              : ce === R.SELECT_RPC
                                ? t('selectRpcUrl')
                                : ce === R.ADD_NON_EVM_ACCOUNT && xe
                                  ? t('addNonEvmAccount', [
                                      y.MULTICHAIN_NETWORK_TO_ACCOUNT_TYPE_NAME[xe],
                                    ])
                                  : ((null == le ? void 0 : le.name) ?? '')
                          : t('addACustomNetwork')),
                    ce === R.ADD_EDIT
                      ? (Re = () => {
                          le ? n((0, g.setEditedNetwork)()) : de.clear(), ue(R.LIST);
                        })
                      : ce === R.ADD_RPC || ce === R.ADD_EXPLORER_URL
                        ? (Re = () => ue(R.ADD_EDIT))
                        : ce === R.ADD_NON_EVM_ACCOUNT && (Re = () => ue(R.LIST)),
                    G && (Re = e),
                    o.default.createElement(
                      C.Modal,
                      { isOpen: !0, onClose: e },
                      o.default.createElement(C.ModalOverlay, null),
                      o.default.createElement(
                        C.ModalContent,
                        {
                          padding: 0,
                          className: 'multichain-network-list-menu-content-wrapper',
                          modalDialogProps: {
                            className: 'multichain-network-list-menu-content-wrapper__dialog',
                            display: x.Display.Flex,
                            flexDirection: x.FlexDirection.Column,
                            paddingTop: 0,
                            paddingBottom: 0,
                          },
                        },
                        o.default.createElement(
                          C.ModalHeader,
                          {
                            paddingTop: 4,
                            paddingRight: 4,
                            paddingBottom: ce === R.SELECT_RPC ? 0 : 4,
                            onClose: e,
                            onBack: Re,
                          },
                          o.default.createElement(
                            C.Text,
                            {
                              ellipsis: !0,
                              variant: x.TextVariant.headingSm,
                              textAlign: x.TextAlign.Center,
                            },
                            Le
                          )
                        ),
                        ce === R.LIST
                          ? o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                C.Box,
                                { className: 'multichain-network-list-menu' },
                                o.default.createElement(A.default, {
                                  searchQuery: ve,
                                  setSearchQuery: Te,
                                  setFocusSearch: we,
                                }),
                                K &&
                                  !J &&
                                  q &&
                                  !ve &&
                                  o.default.createElement(C.BannerBase, {
                                    marginLeft: 4,
                                    marginRight: 4,
                                    borderRadius: x.BorderRadius.LG,
                                    padding: 4,
                                    marginTop: 2,
                                    gap: 4,
                                    backgroundColor: x.BackgroundColor.backgroundMuted,
                                    startAccessory: o.default.createElement(
                                      C.Box,
                                      {
                                        display: x.Display.Flex,
                                        alignItems: x.AlignItems.center,
                                        justifyContent: x.JustifyContent.center,
                                      },
                                      o.default.createElement('img', {
                                        src: './images/dragging-animation.svg',
                                        alt: 'drag-and-drop',
                                      })
                                    ),
                                    onClose: () => (0, g.hideNetworkBanner)(),
                                    description: t('dragAndDropBanner'),
                                  }),
                                o.default.createElement(
                                  C.Box,
                                  null,
                                  Me.length > 0 &&
                                    o.default.createElement(
                                      C.Box,
                                      {
                                        padding: 4,
                                        display: x.Display.Flex,
                                        justifyContent: x.JustifyContent.spaceBetween,
                                      },
                                      o.default.createElement(
                                        C.Text,
                                        { color: x.TextColor.textAlternative },
                                        t('enabledNetworks')
                                      )
                                    ),
                                  0 === Me.length && 0 === Ie.length && 0 === Se.length && Ee
                                    ? o.default.createElement(
                                        C.Text,
                                        {
                                          paddingLeft: 4,
                                          paddingRight: 4,
                                          color: x.TextColor.textMuted,
                                          'data-testid':
                                            'multichain-network-menu-popover-no-results',
                                        },
                                        t('noNetworksFound')
                                      )
                                    : o.default.createElement(
                                        a.DragDropContext,
                                        { onDragEnd: ke },
                                        o.default.createElement(
                                          a.Droppable,
                                          { droppableId: 'characters' },
                                          e =>
                                            o.default.createElement(
                                              C.Box,
                                              L({ className: 'characters' }, e.droppableProps, {
                                                ref: e.innerRef,
                                              }),
                                              Me.map((e, t) =>
                                                o.default.createElement(
                                                  a.Draggable,
                                                  {
                                                    key: e.chainId,
                                                    draggableId: e.chainId,
                                                    index: t,
                                                  },
                                                  t =>
                                                    o.default.createElement(
                                                      C.Box,
                                                      L(
                                                        { ref: t.innerRef },
                                                        t.draggableProps,
                                                        t.dragHandleProps
                                                      ),
                                                      Fe(e)
                                                    )
                                                )
                                              ),
                                              e.placeholder
                                            )
                                        )
                                      ),
                                  o.default.createElement(S.default, {
                                    searchAddNetworkResults: Ie,
                                    'data-testid': 'add-popular-network-view',
                                  }),
                                  Se.length > 0
                                    ? o.default.createElement(
                                        C.Box,
                                        {
                                          paddingBottom: 4,
                                          paddingTop: 4,
                                          paddingLeft: 4,
                                          display: x.Display.Flex,
                                          justifyContent: x.JustifyContent.spaceBetween,
                                        },
                                        o.default.createElement(
                                          C.Text,
                                          { color: x.TextColor.textAlternative },
                                          t('showTestnetNetworks')
                                        ),
                                        o.default.createElement(b.default, {
                                          value: $ || re,
                                          disabled: re,
                                          onToggle: e => {
                                            n((0, g.setShowTestNetworks)(!e)),
                                              e ||
                                                D({
                                                  event:
                                                    T.MetaMetricsEventName.TestNetworksDisplayed,
                                                  category: T.MetaMetricsEventCategory.Network,
                                                });
                                          },
                                        })
                                      )
                                    : null,
                                  $ || re
                                    ? o.default.createElement(
                                        C.Box,
                                        { className: 'multichain-network-list-menu' },
                                        Se.map(e => Fe(e))
                                      )
                                    : null
                                )
                              ),
                              o.default.createElement(
                                C.Box,
                                { padding: 4 },
                                o.default.createElement(
                                  C.ButtonSecondary,
                                  {
                                    size: C.ButtonSecondarySize.Lg,
                                    startIconName: C.IconName.Add,
                                    startIconProps: { marginRight: 2 },
                                    block: !0,
                                    onClick: () => {
                                      D({
                                        event: T.MetaMetricsEventName.AddNetworkButtonClick,
                                        category: T.MetaMetricsEventCategory.Network,
                                      }),
                                        ue(R.ADD_EDIT);
                                    },
                                  },
                                  t('addACustomNetwork')
                                )
                              )
                            )
                          : ce === R.ADD_EDIT
                            ? o.default.createElement(_.default, {
                                networkFormState: de,
                                existingNetwork: le,
                                onRpcAdd: () => ue(R.ADD_RPC),
                                onBlockExplorerAdd: () => ue(R.ADD_EXPLORER_URL),
                              })
                            : ce === R.ADD_RPC
                              ? o.default.createElement(N.default, {
                                  onAdded: (e, t) => {
                                    var n;
                                    null !== (n = pe.rpcEndpoints) &&
                                      void 0 !== n &&
                                      n.every(t => !s.equal(t.url, e)) &&
                                      me({
                                        rpcEndpoints: [
                                          ...pe.rpcEndpoints,
                                          { url: e, name: t, type: c.RpcEndpointType.Custom },
                                        ],
                                        defaultRpcEndpointIndex: pe.rpcEndpoints.length,
                                      }),
                                      ue(R.ADD_EDIT);
                                  },
                                })
                              : ce === R.ADD_EXPLORER_URL
                                ? o.default.createElement(P.default, {
                                    onAdded: e => {
                                      var t;
                                      null !== (t = fe.blockExplorerUrls) &&
                                        void 0 !== t &&
                                        t.every(t => t !== e) &&
                                        ge({
                                          blockExplorerUrls: [...fe.blockExplorerUrls, e],
                                          defaultBlockExplorerUrlIndex: fe.blockExplorerUrls.length,
                                        }),
                                        ue(R.ADD_EDIT);
                                    },
                                  })
                                : ce === R.SELECT_RPC && le
                                  ? o.default.createElement(O.SelectRpcUrlModal, {
                                      networkConfiguration: Z[le.chainId],
                                      onNetworkChange: Ae,
                                    })
                                  : ce === R.ADD_NON_EVM_ACCOUNT && xe
                                    ? o.default.createElement(B.default, { chainId: xe })
                                    : null
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/network-list-menu/network-list-menu.tsx',
      },
    ],
    [
      6597,
      {
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../hooks/useI18nContext'),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system');
                n.default = ({ searchQuery: e, setSearchQuery: t, setFocusSearch: n }) => {
                  const o = (0, r.useI18nContext)();
                  return a.default.createElement(
                    i.Box,
                    { paddingLeft: 4, paddingRight: 4, paddingBottom: 2, paddingTop: 0 },
                    a.default.createElement(i.TextFieldSearch, {
                      size: i.TextFieldSearchSize.Lg,
                      width: s.BlockSize.Full,
                      placeholder: o('search'),
                      autoFocus: !0,
                      value: e,
                      onFocus: () => n(!0),
                      onBlur: () => n(!1),
                      onChange: e => t(e.target.value),
                      clearButtonOnClick: () => t(''),
                      clearButtonProps: { size: i.ButtonIconSize.Sm },
                      inputProps: { 'data-testid': 'network-redesign-modal-search-input' },
                      borderRadius: s.BorderRadius.MD,
                      'data-testid': 'search-list',
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/network-list-menu/network-list-search/network-list-search.tsx',
      },
    ],
    [
      6598,
      {
        '../../../../../app/scripts/lib/util': 204,
        '../../../../../shared/constants/app': 5789,
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/constants/network': 5804,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '@metamask/controller-utils': 1515,
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
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('@metamask/controller-utils'),
                  i = e('react-redux'),
                  s = e('../../../../hooks/useI18nContext'),
                  l = e('../../../component-library'),
                  c = e('../../../../../shared/constants/metametrics'),
                  u = e('../../../../../shared/constants/app'),
                  d = e('../../../../store/actions'),
                  p = e('../../../../../app/scripts/lib/util'),
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('../../../../../shared/constants/network'),
                  g =
                    (o = e('../../../../helpers/constants/zendesk-url')) && o.__esModule
                      ? o
                      : { default: o };
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ searchAddNetworkResults: e }) => {
                  const t = (0, s.useI18nContext)(),
                    n = (0, p.getEnvironmentType)() === u.ENVIRONMENT_TYPE_POPUP,
                    o = (0, i.useDispatch)(),
                    [h, y] = (0, a.useState)(!1),
                    k = () => {
                      y(!0);
                    },
                    b = () => {
                      y(!1);
                    },
                    [x, C] = (0, a.useState)(),
                    v = (0, a.useMemo)(
                      () =>
                        0 === Object.keys(e).length
                          ? null
                          : a.default.createElement(
                              l.Box,
                              {
                                marginTop: 4,
                                marginBottom: 4,
                                display: m.Display.Flex,
                                justifyContent: m.JustifyContent.spaceBetween,
                              },
                              a.default.createElement(
                                l.Box,
                                { display: m.Display.InlineFlex },
                                a.default.createElement(
                                  l.Text,
                                  {
                                    color: m.TextColor.textAlternative,
                                    variant: m.TextVariant.bodyMd,
                                  },
                                  t('additionalNetworks')
                                ),
                                a.default.createElement(
                                  l.Box,
                                  { onMouseEnter: k, marginTop: 1 },
                                  a.default.createElement(l.Icon, {
                                    className: 'add-network__warning-icon',
                                    name: l.IconName.Info,
                                    color: m.IconColor.iconMuted,
                                    size: l.IconSize.Sm,
                                    marginLeft: 2,
                                  }),
                                  a.default.createElement(
                                    l.Popover,
                                    {
                                      referenceElement: x,
                                      position: l.PopoverPosition.Top,
                                      isOpen: h,
                                      matchWidth: !0,
                                      flip: !0,
                                      hasArrow: !0,
                                      backgroundColor: m.BackgroundColor.backgroundAlternative,
                                      onMouseLeave: b,
                                    },
                                    t('popularNetworkAddToolTip', [
                                      a.default.createElement(
                                        l.Box,
                                        { key: 'learn-more-link' },
                                        a.default.createElement(
                                          l.ButtonLink,
                                          {
                                            size: l.ButtonLinkSize.Inherit,
                                            externalLink: !0,
                                            onClick: () => {
                                              global.platform.openTab({
                                                url: g.default.UNKNOWN_NETWORK,
                                              });
                                            },
                                          },
                                          t('learnMoreUpperCase')
                                        )
                                      ),
                                    ])
                                  )
                                )
                              )
                            ),
                      [e, x, h]
                    );
                  return a.default.createElement(
                    l.Box,
                    { className: 'new-network-list__networks-container' },
                    a.default.createElement(
                      l.Box,
                      {
                        marginTop: n ? 0 : 4,
                        marginBottom: 1,
                        paddingLeft: 4,
                        paddingRight: 4,
                        ref: e => {
                          C(e);
                        },
                      },
                      v,
                      e.map(e =>
                        a.default.createElement(
                          l.Box,
                          {
                            key: e.chainId,
                            display: m.Display.Flex,
                            alignItems: m.AlignItems.center,
                            justifyContent: m.JustifyContent.spaceBetween,
                            paddingBottom: 4,
                            paddingTop: 4,
                            className: 'new-network-list__list-of-networks',
                            'data-testid': `popular-network-${e.chainId}`,
                            onMouseEnter: b,
                          },
                          a.default.createElement(
                            l.Box,
                            { display: m.Display.Flex, alignItems: m.AlignItems.center },
                            a.default.createElement(l.AvatarNetwork, {
                              borderColor: m.BorderColor.backgroundDefault,
                              size: l.AvatarNetworkSize.Sm,
                              src: f.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                              name: e.name,
                            }),
                            a.default.createElement(
                              l.Box,
                              { marginLeft: 4 },
                              a.default.createElement(
                                l.Text,
                                {
                                  color: m.TextColor.textDefault,
                                  backgroundColor: m.BackgroundColor.transparent,
                                  ellipsis: !0,
                                },
                                e.name
                              )
                            )
                          ),
                          a.default.createElement(
                            l.Box,
                            {
                              display: m.Display.Flex,
                              alignItems: m.AlignItems.center,
                              marginLeft: 1,
                            },
                            a.default.createElement(
                              l.Button,
                              {
                                type: l.ButtonVariant.Link,
                                className: 'add-network__add-button',
                                variant: l.ButtonVariant.Link,
                                'data-testid': 'test-add-button',
                                onClick: async () => {
                                  o((0, d.toggleNetworkMenu)()),
                                    await o(
                                      (0, d.requestUserApproval)({
                                        origin: u.ORIGIN_METAMASK,
                                        type: r.ApprovalType.AddEthereumChain,
                                        requestData: {
                                          chainId: e.chainId,
                                          rpcUrl: e.rpcEndpoints[e.defaultRpcEndpointIndex].url,
                                          ticker: e.nativeCurrency,
                                          rpcPrefs: {
                                            blockExplorerUrl:
                                              e.defaultBlockExplorerUrlIndex === undefined
                                                ? undefined
                                                : e.blockExplorerUrls[
                                                    e.defaultBlockExplorerUrlIndex
                                                  ],
                                          },
                                          imageUrl: f.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                                          chainName: e.name,
                                          referrer: u.ORIGIN_METAMASK,
                                          source: c.MetaMetricsNetworkEventSource.NewAddNetworkFlow,
                                        },
                                      })
                                    );
                                },
                              },
                              t('add')
                            )
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
        file: 'ui/components/multichain/network-list-menu/popular-network-list/popular-network-list.tsx',
      },
    ],
    [
      6599,
      {
        '../../../../shared/constants/network': 5804,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '@metamask/network-controller': 2202,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.stripProtocol = n.stripKeyFromInfuraUrl = n.default = void 0);
                var o,
                  a = e('@metamask/network-controller'),
                  r = (o = e('react')) && o.__esModule ? o : { default: o },
                  i = e('../../../../shared/constants/network'),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system');
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const u = e => {
                  let t = e;
                  return (
                    t.endsWith('/v3/{infuraProjectId}')
                      ? (t = t.replace('/v3/{infuraProjectId}', ''))
                      : t.endsWith(`/v3/${i.infuraProjectId}`) &&
                        (t = t.replace(`/v3/${i.infuraProjectId}`, '')),
                    t
                  );
                };
                n.stripKeyFromInfuraUrl = u;
                const d = e => {
                  const t = new URL(e);
                  return `${t.host}${'/' === t.pathname ? '' : t.pathname}`;
                };
                n.stripProtocol = d;
                n.default = ({ rpcEndpoint: e }) => {
                  const { url: t, type: n } = e,
                    o = n === a.RpcEndpointType.Infura ? 'Infura' : e.name,
                    i = e => (e ? d(u(e)) : ' '),
                    p = o ? 2 : 4;
                  return r.default.createElement(
                    s.Box,
                    c(
                      {
                        className: 'rpc-list-item',
                        display: l.Display.Flex,
                        flexDirection: l.FlexDirection.Column,
                        paddingTop: p,
                        paddingBottom: p,
                      },
                      !o && {
                        borderWidth: 2,
                        borderStyle: l.BorderStyle.solid,
                        borderColor: l.BorderColor.transparent,
                      }
                    ),
                    r.default.createElement(
                      s.Box,
                      null,
                      r.default.createElement(
                        s.Text,
                        {
                          as: 'button',
                          padding: 0,
                          width: l.BlockSize.Full,
                          color: o ? l.TextColor.textDefault : l.TextColor.textAlternative,
                          variant: o ? l.TextVariant.bodyMdMedium : l.TextVariant.bodySm,
                          backgroundColor: l.BackgroundColor.transparent,
                          ellipsis: !0,
                        },
                        o || i(t)
                      )
                    ),
                    o &&
                      r.default.createElement(
                        s.Box,
                        null,
                        r.default.createElement(
                          s.Text,
                          {
                            color: l.TextColor.textAlternative,
                            variant: l.TextVariant.bodySm,
                            ellipsis: !0,
                          },
                          i(t)
                        )
                      )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/network-list-menu/rpc-list-item.tsx' },
    ],
    [
      6600,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../rpc-list-item': 6599,
        '@metamask/multichain-network-controller': 2141,
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
                  (n.default = n.SelectRpcUrlModal = void 0);
                var o = p(e('react')),
                  a = e('@metamask/multichain-network-controller'),
                  r = p(e('classnames')),
                  i = e('react-redux'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../../shared/constants/network'),
                  u = e('../../../../store/actions'),
                  d = p(e('../rpc-list-item'));
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const m = ({ networkConfiguration: e, onNetworkChange: t }) => {
                  const n = (0, i.useDispatch)(),
                    p = c.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId];
                  return o.default.createElement(
                    s.Box,
                    null,
                    o.default.createElement(
                      s.Box,
                      { display: l.Display.Flex },
                      o.default.createElement(
                        s.Box,
                        {
                          margin: 'auto',
                          paddingTop: 1,
                          paddingBottom: 8,
                          display: l.Display.Flex,
                          alignItems: l.AlignItems.center,
                        },
                        p &&
                          o.default.createElement(s.AvatarNetwork, {
                            src: p,
                            name: e.name,
                            size: s.AvatarNetworkSize.Sm,
                            marginRight: 1,
                          }),
                        o.default.createElement(
                          s.Text,
                          { variant: l.TextVariant.bodySm, color: l.TextColor.textAlternative },
                          e.name
                        )
                      )
                    ),
                    e.rpcEndpoints.map((i, c) =>
                      o.default.createElement(
                        s.Box,
                        {
                          alignItems: l.AlignItems.center,
                          paddingLeft: 4,
                          paddingRight: 4,
                          display: l.Display.Flex,
                          key: i.url,
                          onClick: () => {
                            const o = { ...e, defaultRpcEndpointIndex: c };
                            n((0, u.updateNetwork)(o)),
                              n((0, u.setEditedNetwork)()),
                              t((0, a.toEvmCaipChainId)(o.chainId));
                          },
                          className: (0, r.default)('select-rpc-url__item', {
                            'select-rpc-url__item--selected': c === e.defaultRpcEndpointIndex,
                          }),
                        },
                        c === e.defaultRpcEndpointIndex &&
                          o.default.createElement(s.Box, {
                            className: 'select-rpc-url__item-selected-pill',
                            borderRadius: l.BorderRadius.pill,
                            backgroundColor: l.BackgroundColor.primaryDefault,
                          }),
                        o.default.createElement(d.default, { rpcEndpoint: i })
                      )
                    )
                  );
                };
                n.SelectRpcUrlModal = m;
                n.default = m;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/network-list-menu/select-rpc-url-modal/select-rpc-url-modal.tsx',
      },
    ],
    [
      6601,
      { './nft-item': 6602 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NftItem', {
                    enumerable: !0,
                    get: function () {
                      return o.NftItem;
                    },
                  });
                var o = e('./nft-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/nft-item/index.ts' },
    ],
    [
      6602,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../app/assets/nfts/nft-default-image/nft-default-image': 5935,
        '../../component-library': 6402,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.NftItem = void 0);
                var o = u(e('react')),
                  a = u(e('classnames')),
                  r = e('react-redux'),
                  i = u(e('../../app/assets/nfts/nft-default-image/nft-default-image')),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../selectors');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.NftItem = ({
                  nft: e,
                  alt: t,
                  src: n,
                  networkName: u,
                  networkSrc: d,
                  onClick: p,
                  detailView: m,
                  clickable: f,
                  privacyMode: g,
                  isIpfsURL: h,
                  name: y,
                }) => {
                  var k;
                  const b = (0, r.useSelector)(c.getTestNetworkBackgroundColor),
                    x = (0, r.useSelector)(c.getIpfsGateway),
                    C = (0, r.useSelector)(c.getOpenSeaEnabled),
                    v =
                      (x && h && n) || (C && n && !h)
                        ? o.default.createElement(
                            s.Box,
                            {
                              display: l.Display.Flex,
                              justifyContent: l.JustifyContent.center,
                              alignItems: l.AlignItems.center,
                              style: { position: 'relative' },
                            },
                            o.default.createElement(s.Box, {
                              className: m
                                ? 'nft-item__item nft-item__item-detail'
                                : 'nft-item__item nft-item__item-image' + (g ? '--hidden' : ''),
                              'data-testid': 'nft-image',
                              as: 'img',
                              src: n,
                              alt: t,
                              display: l.Display.Block,
                              justifyContent: l.JustifyContent.center,
                            }),
                            g &&
                              o.default.createElement(s.Icon, {
                                style: { position: 'absolute' },
                                name: s.IconName.EyeSlash,
                                color: l.IconColor.iconAlternative,
                              })
                          )
                        : o.default.createElement(i.default, {
                            className: 'nft-item__default-image',
                            'data-testid': 'nft-default-image',
                            clickable: f && h,
                          });
                  return o.default.createElement(
                    s.Box,
                    { className: 'nft-item__card' },
                    o.default.createElement(
                      s.Box,
                      {
                        className: 'nft-item__container',
                        'data-testid': 'nft-item',
                        as: 'button',
                        onClick: p,
                      },
                      o.default.createElement(
                        s.BadgeWrapper,
                        {
                          className: (0, a.default)('nft-item__badge-wrapper', {
                            'nft-item__badge-wrapper__clickable': Boolean(f),
                          }),
                          anchorElementShape: s.BadgeWrapperAnchorElementShape.circular,
                          positionObj: { bottom: 4, right: 4 },
                          display: l.Display.Block,
                          badge: o.default.createElement(s.AvatarNetwork, {
                            className: 'nft-item__network-badge',
                            backgroundColor: b,
                            'data-testid': 'nft-network-badge',
                            size: s.AvatarNetworkSize.Xs,
                            name: u,
                            src: d,
                            borderWidth: 2,
                            borderColor: l.BackgroundColor.backgroundDefault,
                          }),
                        },
                        v
                      )
                    ),
                    o.default.createElement(
                      s.Text,
                      {
                        variant: l.TextVariant.bodySm,
                        color: l.TextColor.textDefault,
                        ellipsis: !0,
                      },
                      null == e ? void 0 : e.name
                    ),
                    o.default.createElement(
                      s.Text,
                      {
                        variant: l.TextVariant.bodySm,
                        color: l.TextColor.textAlternative,
                        ellipsis: !0,
                      },
                      (null == e || null === (k = e.collection) || void 0 === k
                        ? void 0
                        : k.name) || y
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/nft-item/nft-item.tsx' },
    ],
    [
      6603,
      { './notification-detail-address': 6604 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailAddress', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailAddress;
                    },
                  });
                var o = e('./notification-detail-address');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail-address/index.ts' },
    ],
    [
      6604,
      {
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../component-library': 6402,
        '../notification-detail': 6623,
        '../notification-detail-copy-button': 6613,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailAddress = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../notification-detail'),
                  i = e('../notification-detail-copy-button'),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../helpers/utils/util'),
                  u = e('../../../../shared/modules/hexstring-utils');
                const d = ({ side: e }) =>
                  a.default.createElement(
                    s.Text,
                    { variant: l.TextVariant.bodyLgMedium, fontWeight: l.FontWeight.Medium },
                    e
                  );
                n.NotificationDetailAddress = ({ side: e, address: t }) => {
                  const n = (0, u.toChecksumHexAddress)(t),
                    o = (0, c.shortenAddress)(n);
                  return a.default.createElement(r.NotificationDetail, {
                    icon: a.default.createElement(s.AvatarAccount, { address: t }),
                    primaryTextLeft: a.default.createElement(d, { side: e }),
                    secondaryTextLeft: a.default.createElement(i.NotificationDetailCopyButton, {
                      text: t,
                      displayText: o,
                    }),
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-address/notification-detail-address.tsx',
      },
    ],
    [
      6605,
      { './notification-detail-asset': 6606 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailAsset', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailAsset;
                    },
                  });
                var o = e('./notification-detail-asset');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail-asset/index.ts' },
    ],
    [
      6606,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../notification-detail': 6623,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailAsset = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../notification-detail'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system');
                const l = (e, t, n, o) =>
                  a.default.createElement(i.Text, { variant: e, fontWeight: t, color: n }, o);
                n.NotificationDetailAsset = ({
                  icon: e,
                  label: t,
                  detail: n,
                  fiatValue: o,
                  value: c,
                }) => {
                  var u;
                  const d = a.default.createElement(i.AvatarToken, {
                      src: null === (u = e.badge) || void 0 === u ? void 0 : u.src,
                      size: i.AvatarTokenSize.Sm,
                      backgroundColor: s.BackgroundColor.infoDefault,
                      borderColor: s.BorderColor.backgroundDefault,
                      borderWidth: 2,
                    }),
                    p = e.badge
                      ? a.default.createElement(
                          i.BadgeWrapper,
                          {
                            position: e.badge.position || i.BadgeWrapperPosition.topRight,
                            badge: d,
                          },
                          a.default.createElement(i.AvatarToken, {
                            src: e.src,
                            borderColor: s.BorderColor.borderMuted,
                            className: 'notification-detail-asset__icon',
                          })
                        )
                      : a.default.createElement(i.AvatarToken, {
                          src: e.src,
                          borderColor: s.BorderColor.borderMuted,
                          className: 'notification-detail-asset__icon',
                        }),
                    m = l(
                      s.TextVariant.bodyLgMedium,
                      s.FontWeight.Medium,
                      s.TextColor.textDefault,
                      t
                    ),
                    f = l(
                      s.TextVariant.bodyMd,
                      s.FontWeight.Normal,
                      s.TextColor.textAlternative,
                      n
                    ),
                    g = c
                      ? l(
                          s.TextVariant.bodyLgMedium,
                          s.FontWeight.Medium,
                          s.TextColor.textDefault,
                          c
                        )
                      : undefined,
                    h = o
                      ? l(s.TextVariant.bodyMd, s.FontWeight.Normal, s.TextColor.textAlternative, o)
                      : undefined;
                  return a.default.createElement(r.NotificationDetail, {
                    icon: p,
                    primaryTextLeft: m,
                    secondaryTextLeft: f,
                    primaryTextRight: g,
                    secondaryTextRight: h,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-asset/notification-detail-asset.tsx',
      },
    ],
    [
      6607,
      { './notification-detail-block-explorer-button': 6608 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailBlockExplorerButton', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailBlockExplorerButton;
                    },
                  });
                var o = e('./notification-detail-block-explorer-button');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-block-explorer-button/index.ts',
      },
    ],
    [
      6608,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/utils/notification.util': 6911,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../notification-detail-button': 6609,
        '@metamask/controller-utils': 1515,
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
                  (n.NotificationDetailBlockExplorerButton = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/controller-utils'),
                  i = e('../../../../shared/modules/selectors/networks'),
                  s = e('../../component-library'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/utils/notification.util'),
                  u = e('../notification-detail-button'),
                  d = e('../../../contexts/metametrics'),
                  p = e('../../../../shared/constants/metametrics');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.NotificationDetailBlockExplorerButton = ({
                  notification: e,
                  chainId: t,
                  txHash: n,
                }) => {
                  var m;
                  const f = (0, l.useI18nContext)(),
                    g = (0, o.useContext)(d.MetaMetricsContext),
                    h = (0, r.toHex)(t),
                    { blockExplorerConfig: y } = (0, c.getNetworkDetailsByChainId)(h),
                    k = (0, a.useSelector)(i.getNetworkConfigurationsByChainId)[h],
                    b =
                      null == k || null === (m = k.blockExplorerUrls) || void 0 === m
                        ? void 0
                        : m[k.defaultBlockExplorerUrlIndex ?? -1],
                    x = b ?? (null == y ? void 0 : y.url),
                    C = (0, o.useMemo)(
                      () =>
                        b
                          ? f('notificationItemCheckBlockExplorer')
                          : null != y && y.name
                            ? f('notificationTransactionSuccessView', [y.name])
                            : f('notificationItemCheckBlockExplorer'),
                      [null == y ? void 0 : y.name, b, f]
                    ),
                    v = (0, o.useCallback)(() => {
                      g({
                        category: p.MetaMetricsEventCategory.NotificationInteraction,
                        event: p.MetaMetricsEventName.NotificationDetailClicked,
                        properties: {
                          notification_id: e.id,
                          notification_type: e.type,
                          chain_id: t,
                          clicked_item: 'block_explorer',
                        },
                      });
                    }, [t, e.id, e.type, g]);
                  return x
                    ? o.default.createElement(u.NotificationDetailButton, {
                        variant: s.ButtonVariant.Secondary,
                        text: C,
                        href: `${x}/tx/${n}`,
                        isExternal: !0,
                        onClick: v,
                      })
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-block-explorer-button/notification-detail-block-explorer-button.tsx',
      },
    ],
    [
      6609,
      { './notification-detail-button': 6610 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailButton', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailButton;
                    },
                  });
                var o = e('./notification-detail-button');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail-button/index.ts' },
    ],
    [
      6610,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailButton = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system');
                n.NotificationDetailButton = ({
                  variant: e = r.ButtonVariant.Secondary,
                  text: t,
                  href: n,
                  isExternal: o = !1,
                  onClick: s,
                }) =>
                  a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      r.Button,
                      {
                        href: n,
                        externalLink: Boolean(n) && o,
                        variant: e,
                        size: r.ButtonSize.Lg,
                        width: i.BlockSize.Full,
                        endIconName: o ? r.IconName.Arrow2UpRight : undefined,
                        onClick: s,
                      },
                      t
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-button/notification-detail-button.tsx',
      },
    ],
    [
      6611,
      { './notification-detail-collection': 6612 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailCollection', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailCollection;
                    },
                  });
                var o = e('./notification-detail-collection');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-collection/index.ts',
      },
    ],
    [
      6612,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/notification.util': 6911,
        '../../../selectors': 7601,
        '../../app/assets/nfts/nft-default-image/nft-default-image': 5935,
        '../../component-library': 6402,
        '../notification-detail': 6623,
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
                  (n.NotificationDetailCollection = void 0);
                var o = d(e('react')),
                  a = e('react-redux'),
                  r = e('../../../selectors'),
                  i = d(e('../../app/assets/nfts/nft-default-image/nft-default-image')),
                  s = e('../../../helpers/utils/notification.util'),
                  l = e('../notification-detail'),
                  c = e('../../component-library'),
                  u = e('../../../helpers/constants/design-system');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.NotificationDetailCollection = ({ icon: e, label: t, collection: n }) => {
                  const { badgeSrc: d, src: p } = e,
                    m = (0, a.useSelector)(r.getIpfsGateway),
                    f = (0, a.useSelector)(r.getOpenSeaEnabled),
                    g = m && (0, s.isIpfsURL)(p) && p,
                    h = f && p && !(0, s.isIpfsURL)(p),
                    y = o.default.createElement(c.AvatarToken, {
                      src: d,
                      backgroundColor: u.BackgroundColor.infoDefault,
                      borderColor: u.BorderColor.backgroundDefault,
                      borderWidth: 2,
                      size: c.AvatarTokenSize.Sm,
                    }),
                    k = o.default.createElement(
                      c.BadgeWrapper,
                      { position: c.BadgeWrapperPosition.topRight, badge: y },
                      g || h
                        ? o.default.createElement(c.Box, {
                            as: 'img',
                            src: p,
                            display: u.Display.Block,
                            justifyContent: u.JustifyContent.center,
                            backgroundColor: u.BackgroundColor.primaryMuted,
                            borderRadius: u.BorderRadius.LG,
                            className: 'notification-detail-collection__image',
                          })
                        : o.default.createElement(i.default, {
                            className:
                              'nft-item__default-image notification-detail-collection__image',
                            'data-testid': 'nft-default-image',
                            clickable: !1,
                          })
                    ),
                    b = (e, t, n, a) =>
                      o.default.createElement(c.Text, { variant: e, fontWeight: t, color: n }, a),
                    x = b(
                      u.TextVariant.bodyLgMedium,
                      u.FontWeight.Medium,
                      u.TextColor.textDefault,
                      t
                    ),
                    C = b(
                      u.TextVariant.bodyMd,
                      u.FontWeight.Normal,
                      u.TextColor.textAlternative,
                      n
                    );
                  return o.default.createElement(l.NotificationDetail, {
                    icon: k,
                    primaryTextLeft: x,
                    secondaryTextLeft: C,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-collection/notification-detail-collection.tsx',
      },
    ],
    [
      6613,
      { './notification-detail-copy-button': 6614 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailCopyButton', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailCopyButton;
                    },
                  });
                var o = e('./notification-detail-copy-button');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-copy-button/index.ts',
      },
    ],
    [
      6614,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/time': 5817,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/tooltip/tooltip': 6819,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailCopyButton = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../contexts/metametrics'),
                  i = e('../../../../shared/constants/metametrics'),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../hooks/useCopyToClipboard'),
                  u = (o = e('../../ui/tooltip/tooltip')) && o.__esModule ? o : { default: o },
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../../shared/constants/time');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.NotificationDetailCopyButton = ({
                  notification: e,
                  text: t,
                  displayText: n,
                  color: o = l.TextColor.textAlternative,
                }) => {
                  const [m, f] = (0, c.useCopyToClipboard)(p.MINUTE),
                    g = (0, d.useI18nContext)(),
                    h = (0, a.useContext)(r.MetaMetricsContext),
                    y = g(m ? 'copiedExclamation' : 'copyToClipboard');
                  return a.default.createElement(
                    u.default,
                    { position: 'bottom', title: y },
                    a.default.createElement(
                      s.ButtonBase,
                      {
                        backgroundColor: l.BackgroundColor.transparent,
                        onClick: () => {
                          'function' == typeof f && f(t),
                            e &&
                              h({
                                category: i.MetaMetricsEventCategory.NotificationInteraction,
                                event: i.MetaMetricsEventName.NotificationDetailClicked,
                                properties: {
                                  notification_id: e.id,
                                  notification_type: e.type,
                                  ...('chain_id' in e && { chain_id: e.chain_id }),
                                  clicked_item: 'tx_id',
                                },
                              });
                        },
                        paddingRight: 0,
                        paddingLeft: 0,
                        variant: l.TextVariant.bodyMd,
                        fontWeight: l.FontWeight.Normal,
                        color: o,
                        endIconName: m ? s.IconName.CopySuccess : s.IconName.Copy,
                        alignItems: l.AlignItems.center,
                        'data-testid': 'address-copy-button-text',
                        size: s.ButtonBaseSize.Sm,
                      },
                      a.default.createElement(s.Box, { display: l.Display.Flex }, n)
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-copy-button/notification-detail-copy-button.tsx',
      },
    ],
    [
      6615,
      { './notification-detail-info': 6616 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailInfo', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailInfo;
                    },
                  });
                var o = e('./notification-detail-info');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail-info/index.ts' },
    ],
    [
      6616,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../notification-detail': 6623,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailInfo = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../notification-detail'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system');
                n.NotificationDetailInfo = ({ icon: e, label: t, detail: n, action: o }) =>
                  a.default.createElement(r.NotificationDetail, {
                    icon: a.default.createElement(i.AvatarIcon, e),
                    primaryTextLeft: a.default.createElement(
                      i.Text,
                      {
                        variant: s.TextVariant.bodyLgMedium,
                        fontWeight: s.FontWeight.Medium,
                        color: s.TextColor.textDefault,
                      },
                      t
                    ),
                    secondaryTextLeft: a.default.createElement(
                      i.Text,
                      {
                        variant: s.TextVariant.bodyMd,
                        fontWeight: s.FontWeight.Normal,
                        color: s.TextColor.textAlternative,
                      },
                      n
                    ),
                    secondaryTextRight: o,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-info/notification-detail-info.tsx',
      },
    ],
    [
      6617,
      { './notification-detail-network-fee': 6618 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailNetworkFee', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailNetworkFee;
                    },
                  });
                var o = e('./notification-detail-network-fee');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-network-fee/index.ts',
      },
    ],
    [
      6618,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/notification.util': 6911,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/icon/preloader/preloader-icon.component': 6752,
        '../notification-detail': 6623,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailNetworkFee = void 0);
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../hooks/useI18nContext'),
                  i = e('../../../contexts/metametrics'),
                  s = e('../../../helpers/utils/notification.util'),
                  l = e('../../../../shared/modules/conversion.utils'),
                  c = e('../../../../shared/constants/metametrics'),
                  u = e('../notification-detail'),
                  d = e('../../component-library'),
                  p = e('../../../helpers/constants/design-system'),
                  m =
                    (o = e('../../ui/icon/preloader/preloader-icon.component')) && o.__esModule
                      ? o
                      : { default: o };
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const g = ({ label: e, value: t }) =>
                  a.default.createElement(
                    d.Box,
                    {
                      display: p.Display.Flex,
                      justifyContent: p.JustifyContent.spaceBetween,
                      padding: 4,
                    },
                    a.default.createElement(
                      d.Text,
                      {
                        color: p.TextColor.textDefault,
                        variant: p.TextVariant.bodyMd,
                        fontWeight: p.FontWeight.Normal,
                      },
                      e
                    ),
                    a.default.createElement(
                      d.Text,
                      {
                        color: p.TextColor.textAlternative,
                        variant: p.TextVariant.bodyMd,
                        fontWeight: p.FontWeight.Normal,
                      },
                      t
                    )
                  );
                n.NotificationDetailNetworkFee = ({ notification: e }) => {
                  const t = (0, r.useI18nContext)(),
                    n = (0, a.useContext)(i.MetaMetricsContext),
                    [o, f] = (0, a.useState)(!1),
                    [h, y] = (0, a.useState)(null),
                    [k, b] = (0, a.useState)(!1),
                    x = (e => {
                      const t = (0, l.decimalToHex)(e.chain_id);
                      return (0, s.getNetworkDetailsByChainId)(`0x${t}`);
                    })(e);
                  (0, a.useEffect)(() => {
                    (async () => {
                      try {
                        const t = await (0, s.getNetworkFees)(e);
                        t &&
                          y({
                            transactionFee: {
                              transactionFeeInEther: t.transactionFeeInEth,
                              transactionFeeInUsd: t.transactionFeeInUsd,
                            },
                            gasLimitUnits: t.gasLimit,
                            gasUsedUnits: t.gasUsed,
                            baseFee: t.baseFee,
                            priorityFee: t.priorityFee,
                            maxFeePerGas: t.maxFeePerGas,
                          });
                      } catch (e) {
                        b(!0);
                      }
                    })();
                  }, []);
                  return h || k
                    ? !h && k
                      ? a.default.createElement(
                          d.Box,
                          {
                            height: p.BlockSize.Full,
                            width: p.BlockSize.Full,
                            display: p.Display.Flex,
                            justifyContent: p.JustifyContent.center,
                            alignItems: p.AlignItems.center,
                            flexDirection: p.FlexDirection.Column,
                            'data-testid': 'notifications-list-loading',
                            paddingTop: 4,
                          },
                          a.default.createElement(
                            d.Text,
                            {
                              as: 'p',
                              color: p.TextColor.errorDefault,
                              variant: p.TextVariant.bodyMd,
                            },
                            t('notificationItemError')
                          )
                        )
                      : a.default.createElement(
                          d.Box,
                          {
                            width: p.BlockSize.Full,
                            backgroundColor: p.BackgroundColor.transparent,
                            padding: 0,
                          },
                          a.default.createElement(u.NotificationDetail, {
                            icon: a.default.createElement(d.AvatarIcon, {
                              iconName: d.IconName.Gas,
                              color: p.TextColor.infoDefault,
                              backgroundColor: p.BackgroundColor.infoMuted,
                            }),
                            primaryTextLeft: a.default.createElement(
                              d.Text,
                              {
                                variant: p.TextVariant.bodyLgMedium,
                                fontWeight: p.FontWeight.Medium,
                                color: p.TextColor.textDefault,
                              },
                              t('notificationDetailNetworkFee')
                            ),
                            secondaryTextLeft: a.default.createElement(
                              d.Text,
                              {
                                variant: p.TextVariant.bodyMd,
                                fontWeight: p.FontWeight.Normal,
                                color: p.TextColor.textAlternative,
                              },
                              null == h ? void 0 : h.transactionFee.transactionFeeInEther,
                              ' ',
                              null == x ? void 0 : x.nativeCurrencySymbol,
                              ' (',
                              null == h ? void 0 : h.transactionFee.transactionFeeInUsd,
                              ' USD)'
                            ),
                            secondaryTextRight: a.default.createElement(
                              d.Box,
                              {
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingTop: 0,
                                backgroundColor: p.BackgroundColor.transparent,
                                display: p.Display.InlineFlex,
                                alignItems: p.AlignItems.center,
                                justifyContent: p.JustifyContent.flexEnd,
                                gap: 2,
                                as: 'button',
                                onClick: () => {
                                  o ||
                                    n({
                                      category: c.MetaMetricsEventCategory.NotificationInteraction,
                                      event: c.MetaMetricsEventName.NotificationDetailClicked,
                                      properties: {
                                        notification_id: e.id,
                                        notification_type: e.type,
                                        chain_id: e.chain_id,
                                        clicked_item: 'fee_details',
                                      },
                                    }),
                                    f(!o);
                                },
                              },
                              a.default.createElement(
                                d.Text,
                                {
                                  color: p.TextColor.primaryDefault,
                                  variant: p.TextVariant.bodyMd,
                                },
                                t('notificationDetail')
                              ),
                              a.default.createElement(d.Icon, {
                                name: o ? d.IconName.ArrowUp : d.IconName.ArrowDown,
                                color: p.IconColor.primaryDefault,
                                size: d.IconSize.Sm,
                                marginInlineEnd: 1,
                              })
                            ),
                          }),
                          o &&
                            a.default.createElement(
                              d.Box,
                              {
                                display: p.Display.Flex,
                                flexDirection: p.FlexDirection.Column,
                                justifyContent: p.JustifyContent.flexStart,
                                width: p.BlockSize.Full,
                              },
                              a.default.createElement(g, {
                                label: t('notificationDetailGasLimit'),
                                value: (null == h ? void 0 : h.gasLimitUnits.toString()) || '',
                              }),
                              a.default.createElement(g, {
                                label: t('notificationDetailGasUsed'),
                                value: (null == h ? void 0 : h.gasUsedUnits.toString()) || '',
                              }),
                              a.default.createElement(g, {
                                label: t('notificationDetailBaseFee'),
                                value: (null == h ? void 0 : h.baseFee) || '',
                              }),
                              a.default.createElement(g, {
                                label: t('notificationDetailPriorityFee'),
                                value: (null == h ? void 0 : h.priorityFee) || '',
                              }),
                              a.default.createElement(g, {
                                label: t('notificationDetailMaxFee'),
                                value: (null == h ? void 0 : h.maxFeePerGas) || '',
                              })
                            )
                        )
                    : a.default.createElement(
                        d.Box,
                        {
                          height: p.BlockSize.Full,
                          width: p.BlockSize.Full,
                          display: p.Display.Flex,
                          justifyContent: p.JustifyContent.center,
                          alignItems: p.AlignItems.center,
                          flexDirection: p.FlexDirection.Column,
                          'data-testid': 'notifications-list-loading',
                        },
                        a.default.createElement(m.default, { size: 36 })
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-network-fee/notification-detail-network-fee.tsx',
      },
    ],
    [
      6619,
      { './notification-detail-nft': 6620 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailNft', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailNft;
                    },
                  });
                var o = e('./notification-detail-nft');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail-nft/index.ts' },
    ],
    [
      6620,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../nft-item': 6601,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailNft = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../nft-item'),
                  s = e('../../../helpers/constants/design-system');
                n.NotificationDetailNft = ({
                  networkSrc: e,
                  tokenId: t,
                  tokenName: n,
                  tokenSrc: o,
                  networkName: l,
                }) =>
                  a.default.createElement(
                    r.Box,
                    {
                      paddingTop: 1,
                      paddingBottom: 4,
                      display: s.Display.Flex,
                      alignItems: s.AlignItems.center,
                      justifyContent: s.JustifyContent.center,
                    },
                    a.default.createElement(
                      r.Box,
                      { className: 'notification-detail-nft__image' },
                      a.default.createElement(i.NftItem, {
                        networkSrc: e,
                        src: o,
                        name: n,
                        alt: n,
                        networkName: l,
                        tokenId: t,
                      })
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-nft/notification-detail-nft.tsx',
      },
    ],
    [
      6621,
      { './notification-detail-title': 6622 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetailTitle', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetailTitle;
                    },
                  });
                var o = e('./notification-detail-title');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail-title/index.ts' },
    ],
    [
      6622,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailTitle = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../helpers/constants/design-system'),
                  i = e('../../component-library');
                n.NotificationDetailTitle = ({ title: e, date: t }) =>
                  a.default.createElement(
                    i.Box,
                    {
                      display: r.Display.Flex,
                      justifyContent: r.JustifyContent.center,
                      alignItems: r.AlignItems.center,
                      width: r.BlockSize.Full,
                      flexDirection: r.FlexDirection.Column,
                      paddingInlineStart: 8,
                      paddingInlineEnd: 8,
                    },
                    a.default.createElement(
                      i.Text,
                      {
                        variant: r.TextVariant.headingSm,
                        textAlign: r.TextAlign.Center,
                        overflowWrap: r.OverflowWrap.BreakWord,
                      },
                      e
                    ),
                    a.default.createElement(i.Text, { variant: r.TextVariant.bodyXs }, t)
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail-title/notification-detail-title.tsx',
      },
    ],
    [
      6623,
      { './notification-detail': 6624 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationDetail', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationDetail;
                    },
                  });
                var o = e('./notification-detail');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-detail/index.ts' },
    ],
    [
      6624,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetail = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system');
                n.NotificationDetail = ({
                  icon: e,
                  primaryTextLeft: t,
                  primaryTextRight: n,
                  secondaryTextLeft: o,
                  secondaryTextRight: s,
                }) =>
                  a.default.createElement(
                    r.Box,
                    {
                      display: i.Display.Flex,
                      justifyContent: i.JustifyContent.spaceBetween,
                      alignItems: i.AlignItems.flexStart,
                      width: i.BlockSize.Full,
                      paddingBottom: 2,
                      paddingRight: 4,
                      paddingLeft: 4,
                      paddingTop: 2,
                      backgroundColor: i.BackgroundColor.transparent,
                    },
                    a.default.createElement(
                      r.Box,
                      {
                        display: i.Display.Flex,
                        gap: 4,
                        paddingRight: 4,
                        height: i.BlockSize.Full,
                        alignItems: i.AlignItems.flexStart,
                      },
                      a.default.createElement(
                        r.Box,
                        { height: i.BlockSize.Full, className: 'notification-detail__icon' },
                        e
                      ),
                      a.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Block,
                          flexDirection: i.FlexDirection.Column,
                          alignItems: i.AlignItems.flexStart,
                          textAlign: i.TextAlign.Left,
                        },
                        t,
                        o
                      )
                    ),
                    a.default.createElement(
                      r.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        alignItems: i.AlignItems.flexEnd,
                        textAlign: i.TextAlign.Right,
                        className: 'notification-detail__right-container',
                      },
                      n ?? null,
                      s ?? null
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-detail/notification-detail.tsx',
      },
    ],
    [
      6625,
      { './notification-list-item-icon': 6626 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationListItemIcon', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationListItemIcon;
                    },
                  });
                var o = e('./notification-list-item-icon');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-list-item-icon/index.js' },
    ],
    [
      6626,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/notification.util': 6911,
        '../../../selectors': 7601,
        '../../app/assets/nfts/nft-default-image/nft-default-image': 5935,
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
                  (n.NotificationListItemIconType = n.NotificationListItemIcon = void 0);
                var o = u(e('react')),
                  a = e('react-redux'),
                  r = e('../../../selectors'),
                  i = u(e('../../app/assets/nfts/nft-default-image/nft-default-image')),
                  s = e('../../../helpers/utils/notification.util'),
                  l = e('../../component-library'),
                  c = e('../../../helpers/constants/design-system');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                let d = (n.NotificationListItemIconType = (function (e) {
                  return (e.Token = 'token'), (e.Nft = 'nft'), e;
                })({}));
                const p = ({ src: e }) => {
                    const {
                      ipfsImageIsRenderable: t,
                      openseaImageIsRenderable: n,
                      isIpfs: u,
                    } = (e => {
                      const t = (0, a.useSelector)(r.getIpfsGateway),
                        n = (0, a.useSelector)(r.getOpenSeaEnabled),
                        o = (0, s.isIpfsURL)(e);
                      return {
                        ipfsImageIsRenderable: t && o && e,
                        openseaImageIsRenderable: n && e && !o,
                        isIpfs: o,
                      };
                    })(e);
                    return t || n
                      ? o.default.createElement(l.Box, {
                          'data-testid': 'nft-image',
                          as: 'img',
                          src: e,
                          display: c.Display.Block,
                          justifyContent: c.JustifyContent.center,
                          backgroundColor: c.BackgroundColor.primaryMuted,
                          borderRadius: c.BorderRadius.SM,
                          className: 'notification-list-item-icon__image',
                        })
                      : o.default.createElement(i.default, {
                          className: 'nft-item__default-image notification-list-item-icon__image',
                          'data-testid': 'nft-default-image',
                          clickable: u,
                        });
                  },
                  m = {
                    [d.Token]: ({ src: e }) =>
                      o.default.createElement(l.AvatarToken, {
                        'data-testid': 'avatar-token',
                        src: e,
                        borderStyle: c.BorderStyle.none,
                        size: l.AvatarTokenSize.Md,
                      }),
                    [d.Nft]: ({ src: e }) => o.default.createElement(p, { src: e }),
                    default: () =>
                      o.default.createElement(l.Box, {
                        'data-testid': 'default-icon',
                        as: 'img',
                        display: c.Display.Block,
                        borderRadius: c.BorderRadius.SM,
                        backgroundColor: c.BackgroundColor.backgroundDefault,
                        className: 'notification-list-item-icon__image',
                      }),
                  };
                n.NotificationListItemIcon = ({ type: e, value: t, badge: n }) => {
                  const a = m[e] || m.default,
                    r = o.default.createElement(a, { src: t });
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    n
                      ? ((e, t) =>
                          o.default.createElement(
                            l.BadgeWrapper,
                            {
                              'data-testid': 'badge-wrapper',
                              position: e.position || l.BadgeWrapperPosition.bottomRight,
                              badge: o.default.createElement(l.AvatarIcon, {
                                iconName: e.icon,
                                size: l.AvatarIconSize.Sm,
                                backgroundColor: c.BackgroundColor.infoDefault,
                                borderColor: c.BorderColor.backgroundDefault,
                                borderWidth: 2,
                                iconProps: {
                                  name: e.icon,
                                  color: c.IconColor.infoInverse,
                                  size: l.IconSize.Xs,
                                },
                              }),
                            },
                            t
                          ))(n, r)
                      : o.default.createElement(l.Box, { borderRadius: c.BorderRadius.XL }, r)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-list-item-icon/notification-list-item-icon.tsx',
      },
    ],
    [
      6627,
      { './notification-list-item-snap': 6628 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationListItemSnap', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationListItemSnap;
                    },
                  });
                var o = e('./notification-list-item-snap');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-list-item-snap/index.ts' },
    ],
    [
      6628,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/notification.util': 6911,
        '../../app/snaps/snap-icon': 6170,
        '../../app/snaps/snap-ui-markdown': 6225,
        '../../component-library': 6402,
        '../notification-list-item-text': 6629,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationListItemSnap = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../notification-list-item-text'),
                  l = e('../../../helpers/utils/notification.util'),
                  c = e('../../app/snaps/snap-ui-markdown'),
                  u = e('../../app/snaps/snap-icon');
                function d() {
                  return (
                    (d = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    d.apply(null, arguments)
                  );
                }
                n.NotificationListItemSnap = ({
                  id: e,
                  isRead: t,
                  title: n,
                  snapMessage: o,
                  createdAt: p,
                  snapId: m,
                  handleSnapClick: f,
                  handleSnapButton: g,
                }) =>
                  a.default.createElement(
                    r.Box,
                    {
                      className:
                        'notification-list-item ' + (t ? '' : 'notification-list-item--unread'),
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Column,
                      justifyContent: i.JustifyContent.spaceBetween,
                      alignItems: i.AlignItems.flexStart,
                      width: i.BlockSize.Full,
                      paddingBottom: 3,
                      paddingRight: 5,
                      paddingLeft: 5,
                      paddingTop: 3,
                      key: e,
                      onClick: () => {
                        null == f || f();
                      },
                      style: { cursor: 'pointer' },
                    },
                    a.default.createElement(
                      r.Box,
                      {
                        display: i.Display.Flex,
                        justifyContent: i.JustifyContent.spaceBetween,
                        flexDirection: i.FlexDirection.Row,
                        alignItems: i.AlignItems.flexStart,
                        width: i.BlockSize.Full,
                        backgroundColor: i.BackgroundColor.transparent,
                        gap: 4,
                        height: i.BlockSize.Full,
                        style: { paddingLeft: '6px', paddingRight: '6px', paddingTop: '2px' },
                      },
                      !t &&
                        a.default.createElement(
                          r.Box,
                          {
                            display: i.Display.Block,
                            className: 'notification-list-item__unread-dot__wrapper--snap',
                          },
                          a.default.createElement(r.Icon, {
                            name: r.IconName.FullCircle,
                            color: i.IconColor.primaryDefault,
                            className: 'notification-list-item__unread-dot__dot',
                            'data-testid': 'unread-dot',
                          })
                        ),
                      a.default.createElement(
                        r.Box,
                        { height: i.BlockSize.Full, className: 'notification-list-item__icon' },
                        a.default.createElement(u.SnapIcon, {
                          snapId: m,
                          avatarSize: r.IconSize.Md,
                        })
                      ),
                      a.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Flex,
                          gap: 4,
                          height: i.BlockSize.Full,
                          alignItems: i.AlignItems.flexStart,
                          width: i.BlockSize.Full,
                        },
                        a.default.createElement(
                          r.Box,
                          {
                            display: i.Display.Block,
                            flexDirection: i.FlexDirection.Column,
                            alignItems: i.AlignItems.flexStart,
                            textAlign: i.TextAlign.Left,
                            width: i.BlockSize.Full,
                          },
                          a.default.createElement(
                            r.Box,
                            {
                              display: i.Display.Flex,
                              flexDirection: i.FlexDirection.Row,
                              alignItems: i.AlignItems.flexStart,
                              justifyContent: i.JustifyContent.spaceBetween,
                            },
                            a.default.createElement(
                              r.Box,
                              {
                                onClick: () => {
                                  null == g || g();
                                },
                              },
                              a.default.createElement(
                                s.NotificationListItemText,
                                d({}, n, { color: i.TextColor.primaryDefault })
                              )
                            ),
                            a.default.createElement(
                              r.Text,
                              {
                                color: i.TextColor.textMuted,
                                variant: i.TextVariant.bodySm,
                                fontWeight: i.FontWeight.Normal,
                                as: 'p',
                              },
                              (0, l.formatMenuItemDate)(p)
                            )
                          ),
                          a.default.createElement(
                            r.Box,
                            {
                              color: i.TextColor.textDefault,
                              className: 'snap-notifications__item__details__message',
                            },
                            a.default.createElement(c.SnapUIMarkdown, { markdown: !0 }, o)
                          )
                        )
                      )
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-list-item-snap/notification-list-item-snap.tsx',
      },
    ],
    [
      6629,
      { './notification-list-item-text': 6630 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationListItemText', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationListItemText;
                    },
                  });
                var o = e('./notification-list-item-text');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-list-item-text/index.ts' },
    ],
    [
      6630,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/notification.util': 6911,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationListItemText = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../helpers/utils/notification.util');
                n.NotificationListItemText = ({
                  items: e,
                  variant: t = i.TextVariant.bodySm,
                  color: n = i.TextColor.textDefault,
                }) => {
                  const o = e.map(({ text: t, highlighted: o }, l) => {
                    const c = (0, s.getRandomKey)(t, l),
                      u = o ? i.TextColor.infoDefault : n,
                      d = l !== e.length - 1 && ' ';
                    return a.default.createElement(
                      r.Text,
                      {
                        key: c,
                        as: 'span',
                        variant: i.TextVariant.inherit,
                        fontWeight: i.FontWeight.Normal,
                        color: u,
                      },
                      t,
                      d
                    );
                  });
                  return a.default.createElement(r.Text, { as: 'p', variant: t }, o);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-list-item-text/notification-list-item-text.tsx',
      },
    ],
    [
      6631,
      { './notification-list-item': 6632 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationListItem', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationListItem;
                    },
                  });
                var o = e('./notification-list-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notification-list-item/index.ts' },
    ],
    [
      6632,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/notification.util': 6911,
        '../../component-library': 6402,
        '../notification-list-item-icon': 6625,
        '../notification-list-item-text': 6629,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationListItem = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../notification-list-item-icon'),
                  l = e('../notification-list-item-text'),
                  c = e('../../../helpers/utils/notification.util');
                function u() {
                  return (
                    (u = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    u.apply(null, arguments)
                  );
                }
                n.NotificationListItem = ({
                  id: e,
                  isRead: t,
                  icon: n,
                  title: o,
                  description: d,
                  createdAt: p,
                  amount: m,
                  onClick: f,
                }) =>
                  a.default.createElement(
                    r.Box,
                    {
                      className:
                        'notification-list-item ' + (t ? '' : 'notification-list-item--unread'),
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Column,
                      justifyContent: i.JustifyContent.spaceBetween,
                      alignItems: i.AlignItems.flexStart,
                      width: i.BlockSize.Full,
                      paddingBottom: 3,
                      paddingRight: 5,
                      paddingLeft: 5,
                      paddingTop: 3,
                      key: e,
                    },
                    a.default.createElement(
                      r.Box,
                      {
                        display: i.Display.Flex,
                        justifyContent: i.JustifyContent.spaceBetween,
                        flexDirection: i.FlexDirection.Row,
                        alignItems: i.AlignItems.flexStart,
                        as: 'button',
                        onClick: () => {
                          null == f || f();
                        },
                        width: i.BlockSize.Full,
                        backgroundColor: i.BackgroundColor.transparent,
                      },
                      !t &&
                        a.default.createElement(
                          r.Box,
                          {
                            display: i.Display.Block,
                            className: 'notification-list-item__unread-dot__wrapper',
                          },
                          a.default.createElement(r.Icon, {
                            name: r.IconName.FullCircle,
                            color: i.IconColor.primaryDefault,
                            className: 'notification-list-item__unread-dot__dot',
                            'data-testid': 'unread-dot',
                          })
                        ),
                      a.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Flex,
                          gap: 4,
                          paddingRight: 4,
                          height: i.BlockSize.Full,
                          alignItems: i.AlignItems.flexStart,
                        },
                        a.default.createElement(
                          r.Box,
                          { height: i.BlockSize.Full, className: 'notification-list-item__icon' },
                          a.default.createElement(s.NotificationListItemIcon, n)
                        ),
                        a.default.createElement(
                          r.Box,
                          {
                            display: i.Display.Block,
                            flexDirection: i.FlexDirection.Column,
                            alignItems: i.AlignItems.flexStart,
                            textAlign: i.TextAlign.Left,
                            width: i.BlockSize.Full,
                          },
                          a.default.createElement(
                            l.NotificationListItemText,
                            u({}, o, { color: i.TextColor.textAlternative })
                          ),
                          a.default.createElement(l.NotificationListItemText, d)
                        )
                      ),
                      a.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          alignItems: i.AlignItems.flexEnd,
                          textAlign: i.TextAlign.Right,
                          className: 'notification-list-item__right-container',
                        },
                        a.default.createElement(
                          r.Text,
                          {
                            color: i.TextColor.textMuted,
                            variant: i.TextVariant.bodySm,
                            fontWeight: i.FontWeight.Normal,
                            as: 'p',
                          },
                          (0, c.formatMenuItemDate)(p)
                        ),
                        m &&
                          a.default.createElement(
                            r.Text,
                            {
                              color: i.TextColor.textDefault,
                              variant: i.TextVariant.bodyMd,
                              fontWeight: i.FontWeight.Normal,
                              as: 'p',
                            },
                            m
                          )
                      )
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notification-list-item/notification-list-item.tsx',
      },
    ],
    [
      6633,
      { './notifications-page': 6634 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationsPage', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationsPage;
                    },
                  });
                var o = e('./notifications-page');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notifications-page/index.js' },
    ],
    [
      6634,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../component-library': 6402,
        '../../ui/metafox-logo': 6777,
        '../pages/page': 6652,
        react: 5328,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsPage = function ({ children: e }) {
                    const t = (0, a.useHistory)();
                    return o.default.createElement(
                      'div',
                      { className: 'main-container', 'data-testid': 'notifications-page' },
                      o.default.createElement(
                        r.Box,
                        {
                          display: [i.Display.None, i.Display.Flex],
                          alignItems: i.AlignItems.center,
                          margin: 2,
                          className: 'multichain-app-header-logo',
                          'data-testid': 'app-header-logo',
                          justifyContent: i.JustifyContent.center,
                        },
                        o.default.createElement(s.default, {
                          unsetIconHeight: !0,
                          onClick: () => t.push(l.DEFAULT_ROUTE),
                        })
                      ),
                      o.default.createElement(c.Page, null, e)
                    );
                  });
                var o = u(e('react')),
                  a = e('react-router-dom'),
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  s = u(e('../../ui/metafox-logo')),
                  l = e('../../../helpers/constants/routes'),
                  c = e('../pages/page');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notifications-page/notifications-page.tsx',
      },
    ],
    [
      6635,
      { './notifications-settings-account': 6636 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationsSettingsAccount', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationsSettingsAccount;
                    },
                  });
                var o = e('./notifications-settings-account');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notifications-settings-account/index.ts',
      },
    ],
    [
      6636,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../component-library': 6402,
        '@metamask/controller-utils': 1515,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsSettingsAccount = function ({ address: e, name: t }) {
                    const n = (0, r.toChecksumHexAddress)(e);
                    return a.default.createElement(
                      i.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Row,
                        alignItems: s.AlignItems.center,
                        gap: 4,
                      },
                      a.default.createElement(i.AvatarAccount, { address: n }),
                      a.default.createElement(
                        i.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          alignItems: s.AlignItems.flexStart,
                          justifyContent: s.JustifyContent.spaceBetween,
                          width: s.BlockSize.Full,
                        },
                        a.default.createElement(
                          i.Text,
                          { variant: s.TextVariant.bodyLgMedium, textAlign: s.TextAlign.Left },
                          t ?? n
                        ),
                        a.default.createElement(
                          i.Text,
                          {
                            variant: s.TextVariant.bodyMd,
                            textAlign: s.TextAlign.Left,
                            color: s.TextColor.textAlternative,
                          },
                          (0, l.shortenAddress)(n)
                        )
                      )
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('@metamask/controller-utils'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../helpers/utils/util');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notifications-settings-account/notifications-settings-account.tsx',
      },
    ],
    [
      6637,
      { './notifications-settings-box': 6638 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationsSettingsBox', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationsSettingsBox;
                    },
                  });
                var o = e('./notifications-settings-box');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notifications-settings-box/index.ts' },
    ],
    [
      6638,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/icon/preloader/preloader-icon.component': 6752,
        '../../ui/toggle-button': 6814,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsSettingsBox = function ({
                    children: e,
                    value: t,
                    loading: n = !1,
                    disabled: c = !1,
                    error: u = null,
                    dataTestId: d,
                    onToggle: p,
                  }) {
                    const m = (0, a.useI18nContext)();
                    return o.default.createElement(
                      r.Box,
                      { width: s.BlockSize.Full },
                      o.default.createElement(
                        r.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Row,
                          alignItems: s.AlignItems.center,
                          justifyContent: s.JustifyContent.spaceBetween,
                          width: s.BlockSize.Full,
                          gap: 4,
                          className: 'notifications-settings-box',
                        },
                        e,
                        o.default.createElement(
                          r.Box,
                          {
                            'data-testid': `${d}-toggle-box`,
                            className: 'notifications-settings-box__toggle',
                          },
                          n
                            ? o.default.createElement(
                                r.Box,
                                { textAlign: s.TextAlign.Right },
                                o.default.createElement(l.default, { size: 24 })
                              )
                            : o.default.createElement(i.default, {
                                value: t,
                                onToggle: p,
                                disabled: c,
                                dataTestId: `${d}-toggle-input`,
                                className: 'notifications-settings-box__toggle',
                              })
                        )
                      ),
                      u &&
                        o.default.createElement(
                          r.Box,
                          { paddingTop: 0 },
                          o.default.createElement(
                            r.Text,
                            { as: 'p', color: s.TextColor.errorDefault, paddingTop: 2 },
                            m('notificationsSettingsBoxError')
                          )
                        )
                    );
                  });
                var o = c(e('react')),
                  a = e('../../../hooks/useI18nContext'),
                  r = e('../../component-library'),
                  i = c(e('../../ui/toggle-button')),
                  s = e('../../../helpers/constants/design-system'),
                  l = c(e('../../ui/icon/preloader/preloader-icon.component'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notifications-settings-box/notifications-settings-box.tsx',
      },
    ],
    [
      6639,
      { './notifications-settings-type': 6640 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationsSettingsType', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationsSettingsType;
                    },
                  });
                var o = e('./notifications-settings-type');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notifications-settings-type/index.ts' },
    ],
    [
      6640,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsSettingsType = function ({ icon: e, title: t, text: n }) {
                    return a.default.createElement(
                      r.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Row,
                        alignItems: i.AlignItems.center,
                        gap: 4,
                      },
                      e &&
                        a.default.createElement(r.Icon, {
                          name: e,
                          size: r.IconSize.Lg,
                          'data-testid': 'icon',
                        }),
                      a.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          alignItems: i.AlignItems.stretch,
                          justifyContent: i.JustifyContent.spaceBetween,
                          width: i.BlockSize.Full,
                        },
                        a.default.createElement(
                          r.Text,
                          { variant: i.TextVariant.bodyLgMedium, textAlign: i.TextAlign.Left },
                          t
                        ),
                        n &&
                          a.default.createElement(
                            r.Text,
                            {
                              variant: i.TextVariant.bodyMd,
                              textAlign: i.TextAlign.Left,
                              color: i.TextColor.textAlternative,
                            },
                            n
                          )
                      )
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notifications-settings-type/notifications-settings-type.tsx',
      },
    ],
    [
      6641,
      { './notifications-tag-counter': 6642 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'NotificationsTagCounter', {
                    enumerable: !0,
                    get: function () {
                      return o.NotificationsTagCounter;
                    },
                  });
                var o = e('./notifications-tag-counter');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/notifications-tag-counter/index.ts' },
    ],
    [
      6642,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/metamask-notifications/useCounter': 6953,
        '../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsTagCounter = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../hooks/metamask-notifications/useCounter'),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system');
                n.NotificationsTagCounter = ({ noLabel: e = !1 }) => {
                  const { notificationsUnreadCount: t } = (0, r.useUnreadNotificationsCounter)();
                  return 0 === t
                    ? null
                    : e
                      ? a.default.createElement(
                          i.Box,
                          {
                            display: s.Display.Block,
                            className: 'notification-list-item__unread-dot__wrapper',
                            style: {
                              position: 'absolute',
                              cursor: 'pointer',
                              top: '-5px',
                              left: '10px',
                              zIndex: 1,
                            },
                            backgroundColor: s.BackgroundColor.errorDefault,
                            borderStyle: s.BorderStyle.none,
                            borderRadius: s.BorderRadius.LG,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                          },
                          a.default.createElement(
                            i.Text,
                            {
                              color: s.TextColor.errorInverse,
                              variant: s.TextVariant.bodyXs,
                              className: 'notifications-tag-counter__unread-dot',
                              'data-testid': 'notifications-tag-counter__unread-dot',
                              textAlign: s.TextAlign.Center,
                            },
                            t > 10 ? '9+' : t
                          )
                        )
                      : a.default.createElement(
                          i.Box,
                          {
                            backgroundColor: s.BackgroundColor.errorDefault,
                            borderStyle: s.BorderStyle.none,
                            borderRadius: s.BorderRadius.LG,
                            paddingTop: 0,
                            paddingBottom: 0,
                            className: 'notifications-tag-counter',
                          },
                          a.default.createElement(
                            i.Text,
                            {
                              color: s.TextColor.errorInverse,
                              variant: s.TextVariant.bodySm,
                              'data-testid': 'global-menu-notification-count',
                              className: 'notifications-tag-counter__text',
                              textAlign: s.TextAlign.Center,
                            },
                            t > 10 ? '9+' : t
                          )
                        );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/notifications-tag-counter/notifications-tag-counter.tsx',
      },
    ],
    [
      6643,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NoConnectionContent = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  s = e('../../../../component-library');
                n.NoConnectionContent = () => {
                  const e = (0, i.useI18nContext)();
                  return a.default.createElement(
                    s.Box,
                    {
                      className: 'connections-page__no-site-connected-content',
                      display: r.Display.Flex,
                      flexDirection: r.FlexDirection.Column,
                      alignItems: r.AlignItems.center,
                      justifyContent: r.JustifyContent.center,
                      gap: 2,
                      paddingLeft: 4,
                      paddingRight: 4,
                    },
                    a.default.createElement(
                      s.Text,
                      { variant: r.TextVariant.bodyMdMedium, textAlign: r.TextAlign.Center },
                      e('noConnectedAccountTitle')
                    ),
                    a.default.createElement(
                      s.Text,
                      { variant: r.TextVariant.bodyMd, textAlign: r.TextAlign.Center },
                      e('noConnectionDescription')
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/connections/components/no-connection.tsx',
      },
    ],
    [
      6644,
      {
        '../..': 6574,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../../connect-accounts-modal/connect-accounts-modal': 6533,
        '../../disconnect-all-modal/disconnect-all-modal': 6554,
        '../page': 6652,
        './components/no-connection': 6643,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Connections = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../helpers/constants/routes'),
                  l = e('../../../../helpers/utils/util'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../selectors'),
                  d = e('../../../component-library'),
                  p = e('../..'),
                  m = e('../page'),
                  f = e('../../connect-accounts-modal/connect-accounts-modal'),
                  g = e('../../../../store/actions'),
                  h = e('../../disconnect-all-modal/disconnect-all-modal'),
                  y = e('./components/no-connection');
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.Connections = () => {
                  var e;
                  const t = (0, c.useI18nContext)(),
                    n = (0, a.useDispatch)(),
                    k = (0, r.useHistory)(),
                    [b, x] = (0, o.useState)(!1),
                    [C, v] = (0, o.useState)(!1),
                    [T, E] = (0, o.useState)(''),
                    [w, _] = (0, o.useState)(!1),
                    [M, I] = (0, o.useState)(!1),
                    S = (0, r.useParams)(),
                    A = decodeURIComponent(S.origin),
                    N = (0, a.useSelector)(u.getConnectedSitesList),
                    O = (0, a.useSelector)(u.getSubjectMetadata)[A],
                    { openMetaMaskTabs: P } = (0, a.useSelector)(e => e.appState),
                    { id: B } = (0, a.useSelector)(e => e.activeTab),
                    D = (0, a.useSelector)(e => (0, u.getUnconnectedAccounts)(e, A)),
                    j = (0, a.useSelector)(e =>
                      (0, u.getOrderedConnectedAccountsForConnectedDapp)(e, A)
                    ),
                    F = (0, a.useSelector)(u.getSelectedAccount),
                    L = (0, a.useSelector)(u.getPermittedAccountsByOrigin),
                    R = (0, a.useSelector)(u.getPermissionSubjects),
                    $ = !(null !== (e = L[A]) && void 0 !== e && e.length);
                  let W = { origin: null };
                  A && $ && !P[B] && (W = { origin: A });
                  const z = N[A],
                    U = (0, a.useSelector)(e => (0, u.getPermittedEVMAccountsForSelectedTab)(e, A)),
                    V = j.findIndex(
                      (e, t) =>
                        t ===
                        j.reduce(
                          (e, t, n) =>
                            (t.metadata.lastSelected ?? 0) > (j[e].metadata.lastSelected ? n : e)
                              ? n
                              : e,
                          0
                        )
                    );
                  return o.default.createElement(
                    m.Page,
                    {
                      'data-testid': 'connections-page',
                      className: 'main-container connections-page',
                    },
                    o.default.createElement(
                      m.Header,
                      {
                        backgroundColor: i.BackgroundColor.backgroundDefault,
                        startAccessory: o.default.createElement(d.ButtonIcon, {
                          ariaLabel: t('back'),
                          iconName: d.IconName.ArrowLeft,
                          className: 'connections-header__start-accessory',
                          color: i.IconColor.iconDefault,
                          onClick: () => k.goBack(),
                          size: d.ButtonIconSize.Sm,
                        }),
                      },
                      o.default.createElement(
                        d.Box,
                        {
                          display: i.Display.Flex,
                          alignItems: i.AlignItems.center,
                          gap: 2,
                          justifyContent: i.JustifyContent.center,
                          className: 'connections-header__title',
                        },
                        null != z && z.iconUrl
                          ? o.default.createElement(d.AvatarFavicon, {
                              name: z.name,
                              size: d.AvatarFaviconSize.Sm,
                              src: z.iconUrl,
                            })
                          : o.default.createElement(d.Icon, {
                              name: d.IconName.Global,
                              size: d.IconSize.Sm,
                              color: i.IconColor.iconDefault,
                            }),
                        o.default.createElement(
                          d.Text,
                          {
                            as: 'span',
                            variant: i.TextVariant.headingMd,
                            textAlign: i.TextAlign.Center,
                            ellipsis: !0,
                          },
                          (0, l.getURLHost)(A)
                        )
                      )
                    ),
                    o.default.createElement(
                      m.Content,
                      { padding: 0 },
                      U.length > 0 && j.length > 0
                        ? o.default.createElement(
                            d.Box,
                            null,
                            j.map((e, n) => {
                              var a;
                              const r =
                                  null === (a = {}[e.address]) || void 0 === a
                                    ? void 0
                                    : a.find(({ origin: e }) => e === A),
                                i = F.address === e.address,
                                s = { ...e, isAccountActive: n === V };
                              return o.default.createElement(p.AccountListItem, {
                                account: s,
                                key: e.address,
                                accountsCount: j.length,
                                selected: i,
                                connectedAvatar: null == r ? void 0 : r.iconUrl,
                                menuType: p.AccountListItemMenuTypes.Connection,
                                currentTabOrigin: A,
                                isActive: s.isAccountActive ? t('active') : null,
                                onActionClick: E,
                              });
                            })
                          )
                        : o.default.createElement(y.NoConnectionContent, null),
                      b
                        ? o.default.createElement(f.ConnectAccountsModal, {
                            onClose: () => x(!1),
                            onAccountsUpdate: () => _(!0),
                            activeTabOrigin: A,
                          })
                        : null,
                      C
                        ? o.default.createElement(h.DisconnectAllModal, {
                            type: h.DisconnectType.Account,
                            hostname: A,
                            onClose: () => v(!1),
                            onClick: () =>
                              (() => {
                                const e = R[A];
                                if (e) {
                                  const t = Object.values(e.permissions).map(
                                    ({ parentCapability: e }) => e
                                  );
                                  if (t.length > 0) {
                                    const e = { [A]: t };
                                    n((0, g.removePermissionsFor)(e));
                                  }
                                  v(!1), I(!0);
                                }
                              })(),
                          })
                        : null
                    ),
                    o.default.createElement(
                      m.Footer,
                      null,
                      o.default.createElement(
                        d.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          width: i.BlockSize.Full,
                          gap: 4,
                        },
                        w
                          ? o.default.createElement(
                              p.ToastContainer,
                              null,
                              o.default.createElement(p.Toast, {
                                text: t('connectedAccountsToast'),
                                onClose: () => _(!1),
                                startAdornment: o.default.createElement(d.AvatarFavicon, {
                                  name: null == z ? void 0 : z.name,
                                  size: d.AvatarFaviconSize.Sm,
                                  src: null == z ? void 0 : z.iconUrl,
                                }),
                              })
                            )
                          : null,
                        M
                          ? o.default.createElement(
                              p.ToastContainer,
                              null,
                              o.default.createElement(p.Toast, {
                                text: t('disconnectedAllAccountsToast', [(0, l.getURLHost)(A)]),
                                onClose: () => I(!1),
                                startAdornment: o.default.createElement(d.AvatarFavicon, {
                                  name: null == O ? void 0 : O.name,
                                  size: d.AvatarFaviconSize.Sm,
                                  src: null == O ? void 0 : O.iconUrl,
                                }),
                              })
                            )
                          : null,
                        T.length > 0
                          ? o.default.createElement(
                              p.ToastContainer,
                              null,
                              o.default.createElement(p.Toast, {
                                text: t('disconnectedSingleAccountToast', [
                                  T,
                                  (0, l.getURLHost)(A),
                                ]),
                                onClose: () => E(''),
                                startAdornment: o.default.createElement(d.AvatarFavicon, {
                                  name: null == O ? void 0 : O.name,
                                  size: d.AvatarFaviconSize.Sm,
                                  src: null == O ? void 0 : O.iconUrl,
                                }),
                              })
                            )
                          : null,
                        U.length > 0 && j.length > 0
                          ? o.default.createElement(
                              d.Box,
                              {
                                display: i.Display.Flex,
                                gap: 2,
                                flexDirection: i.FlexDirection.Column,
                                width: i.BlockSize.Full,
                                'data-test-id': 'connections-button',
                              },
                              o.default.createElement(
                                d.Button,
                                {
                                  size: d.ButtonSize.Lg,
                                  block: !0,
                                  variant: d.ButtonVariant.Secondary,
                                  disabled: 0 === D.length,
                                  startIconName: d.IconName.Add,
                                  onClick: () => x(!0),
                                },
                                t('connectMoreAccounts')
                              ),
                              o.default.createElement(
                                d.Button,
                                {
                                  size: d.ButtonSize.Lg,
                                  block: !0,
                                  variant: d.ButtonVariant.Secondary,
                                  startIconName: d.IconName.Logout,
                                  danger: !0,
                                  onClick: () => v(!0),
                                },
                                t('disconnectAllAccounts')
                              )
                            )
                          : o.default.createElement(
                              d.ButtonPrimary,
                              {
                                size: d.ButtonPrimarySize.Lg,
                                block: !0,
                                'data-test-id': 'no-connections-button',
                                onClick: () =>
                                  (async () => {
                                    const e = await n(
                                      (0, g.requestAccountsAndChainPermissionsWithId)(W.origin)
                                    );
                                    k.push(`${s.CONNECT_ROUTE}/${e}`);
                                  })(),
                              },
                              t('connectAccounts')
                            )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/connections/connections.tsx' },
    ],
    [
      6645,
      { './connections': 6644 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Connections', {
                    enumerable: !0,
                    get: function () {
                      return o.Connections;
                    },
                  });
                var o = e('./connections');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/connections/index.js' },
    ],
    [
      6646,
      {
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../component-library': 6402,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Content = void 0);
                var o = s(e('react')),
                  a = s(e('classnames')),
                  r = e('../../../../../component-library'),
                  i = e('../../../../../../helpers/constants/design-system');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l() {
                  return (
                    (l = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                n.Content = ({ children: e, className: t = '', ...n }) =>
                  o.default.createElement(
                    r.Box,
                    l(
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        width: i.BlockSize.Full,
                        padding: 4,
                        height: i.BlockSize.Full,
                        className: (0, a.default)('multichain-page-content', t),
                      },
                      n
                    ),
                    e
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/page/components/content/content.tsx',
      },
    ],
    [
      6647,
      { './content': 6646 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Content', {
                    enumerable: !0,
                    get: function () {
                      return o.Content;
                    },
                  });
                var o = e('./content');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/page/components/content/index.ts',
      },
    ],
    [
      6648,
      {
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../component-library': 6402,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Footer = void 0);
                var o = s(e('react')),
                  a = s(e('classnames')),
                  r = e('../../../../../component-library'),
                  i = e('../../../../../../helpers/constants/design-system');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l() {
                  return (
                    (l = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                n.Footer = ({ children: e, className: t = '', ...n }) =>
                  o.default.createElement(
                    r.Box,
                    l(
                      {
                        padding: 4,
                        display: i.Display.Flex,
                        width: i.BlockSize.Full,
                        gap: 4,
                        className: (0, a.default)('multichain-page-footer', t),
                      },
                      n
                    ),
                    e
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/page/components/footer/footer.tsx',
      },
    ],
    [
      6649,
      { './footer': 6648 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Footer', {
                    enumerable: !0,
                    get: function () {
                      return o.Footer;
                    },
                  });
                var o = e('./footer');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/page/components/footer/index.ts' },
    ],
    [
      6650,
      {
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../component-library': 6402,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Header = void 0);
                var o = s(e('react')),
                  a = s(e('classnames')),
                  r = e('../../../../../component-library'),
                  i = e('../../../../../../helpers/constants/design-system');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l() {
                  return (
                    (l = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                n.Header = ({
                  children: e,
                  endAccessory: t = null,
                  startAccessory: n = null,
                  className: s = '',
                  textProps: c,
                  ...u
                }) =>
                  o.default.createElement(
                    r.HeaderBase,
                    l(
                      {
                        padding: 4,
                        width: i.BlockSize.Full,
                        justifyContent: i.JustifyContent.center,
                        className: (0, a.default)('multichain-page-header', s),
                        startAccessory: n,
                        endAccessory: t,
                      },
                      u
                    ),
                    o.default.createElement(
                      r.Text,
                      l(
                        {
                          display: i.Display.Block,
                          variant: i.TextVariant.bodyMdBold,
                          textAlign: i.TextAlign.Center,
                          paddingInlineStart: 8,
                          paddingInlineEnd: 8,
                          ellipsis: !0,
                        },
                        c
                      ),
                      e
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/page/components/header/header.tsx',
      },
    ],
    [
      6651,
      { './header': 6650 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Header', {
                    enumerable: !0,
                    get: function () {
                      return o.Header;
                    },
                  });
                var o = e('./header');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/page/components/header/index.ts' },
    ],
    [
      6652,
      {
        './components/content': 6647,
        './components/footer': 6649,
        './components/header': 6651,
        './page': 6653,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Content', {
                    enumerable: !0,
                    get: function () {
                      return r.Content;
                    },
                  }),
                  Object.defineProperty(n, 'Footer', {
                    enumerable: !0,
                    get: function () {
                      return i.Footer;
                    },
                  }),
                  Object.defineProperty(n, 'Header', {
                    enumerable: !0,
                    get: function () {
                      return a.Header;
                    },
                  }),
                  Object.defineProperty(n, 'Page', {
                    enumerable: !0,
                    get: function () {
                      return o.Page;
                    },
                  });
                var o = e('./page'),
                  a = e('./components/header'),
                  r = e('./components/content'),
                  i = e('./components/footer');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/page/index.ts' },
    ],
    [
      6653,
      {
        '../../../../helpers/constants/design-system': 6872,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Page = void 0);
                var o = l(e('react')),
                  a = l(e('prop-types')),
                  r = l(e('classnames')),
                  i = e('../../../component-library'),
                  s = e('../../../../helpers/constants/design-system');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const u = ({ children: e, className: t = '', ...n }) =>
                  o.default.createElement(
                    i.Box,
                    {
                      width: s.BlockSize.Full,
                      height: s.BlockSize.Full,
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      justifyContent: s.JustifyContent.center,
                      backgroundColor: s.BackgroundColor.backgroundAlternative,
                      className: 'multichain-page',
                      'data-testid': 'multichain-page',
                    },
                    o.default.createElement(
                      i.Box,
                      c(
                        {
                          width: s.BlockSize.Full,
                          height: s.BlockSize.Full,
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          backgroundColor: s.BackgroundColor.backgroundDefault,
                          className: (0, r.default)('multichain-page__inner-container', t),
                        },
                        n
                      ),
                      e
                    )
                  );
                (n.Page = u),
                  (u.propTypes = { className: a.default.string, children: a.default.node });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/page/page.tsx' },
    ],
    [
      6654,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../app/snaps/snap-icon': 6170,
        '../../../component-library': 6402,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ConnectionListItem = void 0);
                var o = m(e('react')),
                  a = m(e('prop-types')),
                  r = e('@metamask/permission-controller'),
                  i = e('react-redux'),
                  s = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = e('../../../component-library'),
                  u = e('../../../../helpers/utils/util'),
                  d = e('../../../app/snaps/snap-icon'),
                  p = e('../../../../selectors');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const f = ({ connection: e, onClick: t }) => {
                  const n = (0, l.useI18nContext)(),
                    a = e.subjectType === r.SubjectType.Snap,
                    m = (0, i.useSelector)(t =>
                      (0, p.getAllPermittedChainsForSelectedTab)(t, e.origin)
                    );
                  return o.default.createElement(
                    c.Box,
                    {
                      'data-testid': 'connection-list-item',
                      as: 'button',
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      alignItems: s.AlignItems.baseline,
                      width: s.BlockSize.Full,
                      backgroundColor: s.BackgroundColor.backgroundDefault,
                      onClick: t,
                      padding: 4,
                      gap: 4,
                      className: 'multichain-connection-list-item',
                    },
                    o.default.createElement(
                      c.Box,
                      {
                        display: s.Display.Flex,
                        alignItems: s.AlignItems.center,
                        style: { alignSelf: 'center' },
                      },
                      a
                        ? o.default.createElement(d.SnapIcon, {
                            className: 'connection-list-item__snap-avatar',
                            snapId: e.id,
                            avatarSize: c.IconSize.Md,
                          })
                        : o.default.createElement(c.AvatarFavicon, {
                            'data-testid': 'connection-list-item__avatar-favicon',
                            src: e.iconUrl,
                          })
                    ),
                    o.default.createElement(
                      c.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Column,
                        width: s.BlockSize.FiveTwelfths,
                        style: { alignSelf: 'center', flexGrow: '1' },
                      },
                      o.default.createElement(
                        c.Text,
                        {
                          variant: s.TextVariant.bodyMd,
                          textAlign: s.TextAlign.Left,
                          ellipsis: !0,
                        },
                        a ? e.packageName : (0, u.getURLHost)(e.origin)
                      ),
                      a
                        ? null
                        : o.default.createElement(
                            c.Box,
                            {
                              display: s.Display.Flex,
                              flexDirection: s.FlexDirection.Row,
                              alignItems: s.AlignItems.center,
                              gap: 1,
                            },
                            o.default.createElement(
                              c.Text,
                              {
                                as: 'span',
                                width: s.BlockSize.Max,
                                color: s.TextColor.textAlternative,
                                variant: s.TextVariant.bodyMd,
                              },
                              e.addresses.length,
                              ' ',
                              n('accountsSmallCase'),
                              ' • ',
                              m.length,
                              ' ',
                              n('networksSmallCase')
                            )
                          )
                    ),
                    o.default.createElement(
                      c.Box,
                      {
                        display: s.Display.Flex,
                        justifyContent: s.JustifyContent.flexEnd,
                        alignItems: s.AlignItems.center,
                        style: { flex: '1', alignSelf: 'center' },
                        gap: 2,
                      },
                      o.default.createElement(c.Icon, {
                        display: s.Display.Flex,
                        name: c.IconName.ArrowRight,
                        color: s.IconColor.iconDefault,
                        size: c.IconSize.Sm,
                        backgroundColor: s.BackgroundColor.backgroundDefault,
                      })
                    )
                  );
                };
                (n.ConnectionListItem = f),
                  (f.propTypes = {
                    connection: a.default.object.isRequired,
                    onClick: a.default.func.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/permissions-page/connection-list-item.js',
      },
    ],
    [
      6655,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../page': 6652,
        './connection-list-item': 6654,
        '@metamask/snaps-utils': 2890,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.PermissionsPage = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-router-dom'),
                  r = e('react-redux'),
                  i = e('@metamask/snaps-utils'),
                  s = e('../page'),
                  l = e('../../../component-library'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../../helpers/constants/routes'),
                  p = e('../../../../selectors'),
                  m = e('./connection-list-item');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.PermissionsPage = () => {
                  const e = (0, c.useI18nContext)(),
                    t = (0, a.useHistory)(),
                    n = (0, o.useRef)(),
                    [f, g] = (0, o.useState)(0),
                    h = (0, r.useSelector)(p.getConnectedSitesListWithNetworkInfo);
                  (0, o.useEffect)(() => {
                    g(Object.keys(h).length);
                  }, [h]);
                  return o.default.createElement(
                    s.Page,
                    { className: 'main-container', 'data-testid': 'permissions-page' },
                    o.default.createElement(
                      s.Header,
                      {
                        backgroundColor: u.BackgroundColor.backgroundDefault,
                        startAccessory: o.default.createElement(l.ButtonIcon, {
                          ariaLabel: e('back'),
                          iconName: l.IconName.ArrowLeft,
                          className: 'connections-header__start-accessory',
                          color: u.Color.iconDefault,
                          onClick: () => t.push(d.DEFAULT_ROUTE),
                          size: l.ButtonIconSize.Sm,
                        }),
                      },
                      o.default.createElement(
                        l.Text,
                        {
                          as: 'span',
                          variant: u.TextVariant.headingMd,
                          textAlign: u.TextAlign.Center,
                        },
                        e('permissions')
                      )
                    ),
                    o.default.createElement(
                      s.Content,
                      { padding: 0 },
                      o.default.createElement(l.Box, { ref: n }),
                      f > 0
                        ? ((y = h),
                          Object.entries(y).map(([e, n]) =>
                            (0, i.isSnapId)(n.origin)
                              ? null
                              : o.default.createElement(m.ConnectionListItem, {
                                  'data-testid': 'connection-list-item',
                                  key: e,
                                  connection: n,
                                  onClick: () =>
                                    (e => {
                                      const n = e.origin,
                                        o = encodeURIComponent(n);
                                      t.push(`${d.REVIEW_PERMISSIONS}/${o}`);
                                    })(n),
                                })
                          ))
                        : o.default.createElement(
                            l.Box,
                            {
                              'data-testid': 'no-connections',
                              display: u.Display.Flex,
                              flexDirection: u.FlexDirection.Column,
                              justifyContent: u.JustifyContent.center,
                              height: u.BlockSize.Full,
                              gap: 2,
                              padding: 4,
                            },
                            o.default.createElement(
                              l.Text,
                              {
                                variant: u.TextVariant.bodyMdMedium,
                                backgroundColor: u.BackgroundColor.backgroundDefault,
                                textAlign: u.TextAlign.Center,
                              },
                              e('permissionsPageEmptyContent')
                            ),
                            o.default.createElement(
                              l.Text,
                              {
                                variant: u.TextVariant.bodyMd,
                                color: u.TextColor.textAlternative,
                                backgroundColor: u.BackgroundColor.backgroundDefault,
                                textAlign: u.TextAlign.Center,
                              },
                              e('permissionsPageEmptySubContent')
                            )
                          )
                    )
                  );
                  var y;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/permissions-page/permissions-page.js',
      },
    ],
    [
      6656,
      {
        '../..': 6574,
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../component-library': 6402,
        '../../disconnect-all-modal/disconnect-all-modal': 6554,
        '../../permissions-header/permissions-header': 6680,
        '../connections/components/no-connection': 6643,
        '../page': 6652,
        './site-cell/site-cell': 6659,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ReviewPermissions = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('@metamask/utils'),
                  s = e('lodash'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../../shared/modules/selectors/networks'),
                  d = e('../../../../selectors'),
                  p = e('../../../../store/actions'),
                  m = e('../../../component-library'),
                  f = e('../..'),
                  g = e('../connections/components/no-connection'),
                  h = e('../page'),
                  y = e('../../../../helpers/constants/routes'),
                  k = e('../../disconnect-all-modal/disconnect-all-modal'),
                  b = e('../../permissions-header/permissions-header'),
                  x = e('../../../../../shared/constants/network'),
                  C = e('./site-cell/site-cell');
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (v = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.ReviewPermissions = () => {
                  const e = (0, c.useI18nContext)(),
                    t = (0, a.useDispatch)(),
                    n = (0, r.useHistory)(),
                    v = (0, r.useParams)(),
                    T = decodeURIComponent(v.origin),
                    [E, w] = (0, o.useState)(!1),
                    [_, M] = (0, o.useState)(!1),
                    [I, S] = (0, o.useState)(!1),
                    A = T,
                    N = (0, a.useSelector)(d.getShowPermittedNetworkToastOpen);
                  (0, o.useEffect)(() => {
                    N && (M(N), t((0, p.hidePermittedNetworkToast)()));
                  }, [N]);
                  const O = (0, a.useSelector)(d.getConnectedSitesList)[A],
                    P = (0, a.useSelector)(d.getPermissionSubjects),
                    B = (0, a.useSelector)(u.getAllNetworkConfigurationsByCaipChainId),
                    [D, j] = (0, o.useMemo)(
                      () =>
                        Object.entries(B).reduce(
                          ([e, t], [n, o]) => {
                            const a = n;
                            return (
                              (x.CAIP_FORMATTED_EVM_TEST_CHAINS.includes(a) ? t : e).push({
                                ...o,
                                caipChainId: a,
                              }),
                              [e, t]
                            );
                          },
                          [[], []]
                        ),
                      [B]
                    ),
                    F = (0, a.useSelector)(e => (0, d.getAllPermittedChainsForSelectedTab)(e, A)),
                    L = (0, a.useSelector)(d.getUpdatedAndSortedAccountsWithCaipAccountId),
                    R = (0, a.useSelector)(e => (0, d.getAllPermittedAccountsForSelectedTab)(e, A)),
                    $ = (0, s.uniq)(
                      R.map(e => {
                        const {
                          address: t,
                          chain: { namespace: n },
                        } = (0, i.parseCaipAccountId)(e);
                        return n === i.KnownCaipNamespace.Eip155 ? `eip155:0:${t}` : e;
                      })
                    );
                  return o.default.createElement(
                    h.Page,
                    {
                      'data-testid': 'connections-page',
                      className: 'main-container connections-page',
                    },
                    o.default.createElement(
                      o.default.Fragment,
                      null,
                      o.default.createElement(b.PermissionsHeader, {
                        securedOrigin: T,
                        connectedSubjectsMetadata: O,
                      }),
                      o.default.createElement(
                        h.Content,
                        { padding: 0 },
                        $.length > 0
                          ? o.default.createElement(C.SiteCell, {
                              nonTestNetworks: D,
                              testNetworks: j,
                              accounts: L,
                              onSelectAccountAddresses: e => {
                                if (0 === e.length) return void S(!0);
                                const n = e.map(e => (0, i.parseCaipAccountId)(e)),
                                  o = n.map(({ address: e }) => e);
                                t((0, p.addPermittedAccounts)(A, o)),
                                  $.forEach(e => {
                                    const o = (0, i.parseCaipAccountId)(e);
                                    n.some(
                                      e =>
                                        o.chain.namespace === e.chain.namespace &&
                                        o.address === e.address &&
                                        ('0' === e.chain.reference ||
                                          e.chain.reference === o.chain.reference)
                                    ) || t((0, p.removePermittedAccount)(A, o.address));
                                  }),
                                  w(!0);
                              },
                              onSelectChainIds: async e => {
                                0 !== e.length
                                  ? (t((0, p.addPermittedChains)(A, e)),
                                    F.forEach(n => {
                                      e.includes(n) || t((0, p.removePermittedChain)(A, n));
                                    }),
                                    M(!0))
                                  : S(!0);
                              },
                              selectedAccountAddresses: $,
                              selectedChainIds: F,
                              hideAllToasts: () => {
                                w(!1), M(!1);
                              },
                            })
                          : o.default.createElement(g.NoConnectionContent, null),
                        I
                          ? o.default.createElement(k.DisconnectAllModal, {
                              type: k.DisconnectType.Account,
                              hostname: A,
                              onClose: () => S(!1),
                              onClick: () => {
                                (() => {
                                  const e = P[A];
                                  if (e) {
                                    const n = Object.values(e.permissions).map(
                                      ({ parentCapability: e }) => e
                                    );
                                    if (n.length > 0) {
                                      const e = { [A]: n };
                                      t((0, p.removePermissionsFor)(e));
                                    }
                                  }
                                  t((0, p.hidePermittedNetworkToast)());
                                })(),
                                  S(!1);
                              },
                            })
                          : null
                      ),
                      o.default.createElement(
                        h.Footer,
                        null,
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          $.length > 0
                            ? o.default.createElement(
                                m.Box,
                                {
                                  display: l.Display.Flex,
                                  flexDirection: l.FlexDirection.Column,
                                  width: l.BlockSize.Full,
                                  gap: 2,
                                  alignItems: l.AlignItems.center,
                                },
                                E
                                  ? o.default.createElement(
                                      f.ToastContainer,
                                      null,
                                      o.default.createElement(f.Toast, {
                                        text: e('accountPermissionToast'),
                                        onClose: () => w(!1),
                                        startAdornment: o.default.createElement(m.AvatarFavicon, {
                                          name: null == O ? void 0 : O.name,
                                          size: m.AvatarFaviconSize.Sm,
                                          src: null == O ? void 0 : O.iconUrl,
                                        }),
                                      })
                                    )
                                  : null,
                                _
                                  ? o.default.createElement(
                                      f.ToastContainer,
                                      null,
                                      o.default.createElement(f.Toast, {
                                        text: e('networkPermissionToast'),
                                        onClose: () => M(!1),
                                        startAdornment: o.default.createElement(m.AvatarFavicon, {
                                          name: null == O ? void 0 : O.name,
                                          size: m.AvatarFaviconSize.Sm,
                                          src: null == O ? void 0 : O.iconUrl,
                                        }),
                                      })
                                    )
                                  : null,
                                o.default.createElement(
                                  m.Button,
                                  {
                                    size: m.ButtonSize.Lg,
                                    block: !0,
                                    variant: m.ButtonVariant.Secondary,
                                    startIconName: m.IconName.Logout,
                                    danger: !0,
                                    onClick: () => S(!0),
                                    'data-test-id': 'disconnect-all',
                                  },
                                  e('disconnect')
                                )
                              )
                            : o.default.createElement(
                                o.default.Fragment,
                                null,
                                $.length > 0
                                  ? o.default.createElement(
                                      m.ButtonPrimary,
                                      {
                                        size: m.ButtonPrimarySize.Lg,
                                        block: !0,
                                        'data-test-id': 'no-connections-button',
                                        onClick: async () => {
                                          const e = await t(
                                            (0, p.requestAccountsAndChainPermissionsWithId)(A)
                                          );
                                          n.push(`${y.CONNECT_ROUTE}/${e}`);
                                        },
                                      },
                                      e('connectAccounts')
                                    )
                                  : null
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
        file: 'ui/components/multichain/pages/review-permissions-page/review-permissions-page.tsx',
      },
    ],
    [
      6657,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SiteCellConnectionListItem = void 0);
                var o = l(e('react')),
                  a = l(e('prop-types')),
                  r = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../component-library'),
                  s = e('../../../../../hooks/useI18nContext');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = ({
                  title: e,
                  iconName: t,
                  connectedMessage: n,
                  unconnectedMessage: a,
                  isConnectFlow: l,
                  onClick: c,
                  content: u,
                  paddingTopValue: d,
                  paddingBottomValue: p,
                }) => {
                  const m = (0, s.useI18nContext)();
                  return o.default.createElement(
                    i.Box,
                    {
                      'data-testid': 'site-cell-connection-list-item',
                      display: r.Display.Flex,
                      flexDirection: r.FlexDirection.Row,
                      alignItems: r.AlignItems.baseline,
                      width: r.BlockSize.Full,
                      backgroundColor: r.BackgroundColor.backgroundDefault,
                      gap: 4,
                      className: 'multichain-connection-list-item',
                      paddingTop: d,
                      paddingBottom: p,
                    },
                    o.default.createElement(i.AvatarIcon, {
                      iconName: t,
                      size: i.AvatarIconSize.Md,
                      color: r.IconColor.iconAlternative,
                      backgroundColor: r.BackgroundColor.backgroundAlternative,
                    }),
                    o.default.createElement(
                      i.Box,
                      {
                        display: r.Display.Flex,
                        flexDirection: r.FlexDirection.Column,
                        width: r.BlockSize.FiveTwelfths,
                        style: { alignSelf: 'center', flexGrow: 1 },
                        gap: 1,
                      },
                      o.default.createElement(
                        i.Text,
                        { variant: r.TextVariant.bodyMd, textAlign: r.TextAlign.Left },
                        e
                      ),
                      o.default.createElement(
                        i.Box,
                        {
                          display: r.Display.Flex,
                          flexDirection: r.FlexDirection.Row,
                          alignItems: r.AlignItems.center,
                          gap: 1,
                        },
                        o.default.createElement(
                          i.Text,
                          {
                            as: 'span',
                            width: r.BlockSize.Max,
                            color: r.TextColor.textAlternative,
                            variant: r.TextVariant.bodySm,
                            ellipsis: !0,
                          },
                          l ? a : n
                        ),
                        u
                      )
                    ),
                    o.default.createElement(
                      i.ButtonLink,
                      { onClick: () => c(), 'data-testid': 'edit' },
                      m('edit')
                    )
                  );
                };
                (n.SiteCellConnectionListItem = c),
                  (c.propTypes = {
                    title: a.default.string,
                    iconName: a.default.string,
                    connectedMessage: a.default.string,
                    paddingTopValue: a.default.number,
                    paddingBottomValue: a.default.number,
                    unconnectedMessage: a.default.string,
                    isConnectFlow: a.default.bool,
                    onClick: a.default.func,
                    content: a.default.node,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/review-permissions-page/site-cell/site-cell-connection-list-item.js',
      },
    ],
    [
      6658,
      {
        '../../..': 6574,
        '../../../../../../shared/constants/network': 5804,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../../component-library': 6402,
        '../../../avatar-group/avatar-group.types': 6524,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
        'react-tippy': 5324,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SiteCellTooltip = void 0);
                var o = f(e('react')),
                  a = f(e('prop-types')),
                  r = e('react-tippy'),
                  i = e('react-redux'),
                  s = e('../../../../../helpers/constants/design-system'),
                  l = e('../../../avatar-group/avatar-group.types'),
                  c = e('../../..'),
                  u = e('../../../../component-library'),
                  d = e('../../../../../selectors'),
                  p = e('../../../../../hooks/useI18nContext'),
                  m = e('../../../../../../shared/constants/network');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const g = ({ accounts: e, networks: t }) => {
                  const n = (0, p.useI18nContext)(),
                    a = (0, i.useSelector)(d.getUseBlockie)
                      ? u.AvatarAccountVariant.Blockies
                      : u.AvatarAccountVariant.Jazzicon,
                    f = null == e ? void 0 : e.map(e => ({ avatarValue: e.address })),
                    g =
                      null == t
                        ? void 0
                        : t.map(e => ({
                            avatarValue: m.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                            symbol: e.name,
                          }));
                  return o.default.createElement(
                    r.Tooltip,
                    {
                      position: 'bottom',
                      html: o.default.createElement(
                        u.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          'data-test-id': 'site-cell-tooltip',
                        },
                        o.default.createElement(
                          u.Box,
                          { display: s.Display.Flex, flexDirection: s.FlexDirection.Column },
                          null == e
                            ? void 0
                            : e
                                .slice(0, 4)
                                .map(e =>
                                  o.default.createElement(
                                    u.Box,
                                    {
                                      display: s.Display.Flex,
                                      flexDirection: s.FlexDirection.Row,
                                      alignItems: s.AlignItems.center,
                                      textAlign: s.TextAlign.Left,
                                      key: e.address,
                                      padding: 1,
                                      paddingInline: 2,
                                      gap: 2,
                                    },
                                    o.default.createElement(u.AvatarAccount, {
                                      size: u.AvatarAccountSize.Xs,
                                      address: e.address,
                                      variant: a,
                                      borderStyle: s.BorderStyle.none,
                                    }),
                                    o.default.createElement(
                                      u.Text,
                                      {
                                        color: s.TextColor.overlayInverse,
                                        variant: s.TextVariant.bodyMdMedium,
                                        'data-testid': 'accounts-list-item-connected-account-name',
                                        ellipsis: !0,
                                      },
                                      e.metadata.name || e.label
                                    )
                                  )
                                ),
                          null == t
                            ? void 0
                            : t
                                .slice(0, 4)
                                .map(e =>
                                  o.default.createElement(
                                    u.Box,
                                    {
                                      display: s.Display.Flex,
                                      flexDirection: s.FlexDirection.Row,
                                      alignItems: s.AlignItems.center,
                                      textAlign: s.TextAlign.Left,
                                      key: e.chainId,
                                      padding: 1,
                                      paddingInline: 2,
                                      gap: 2,
                                    },
                                    o.default.createElement(u.AvatarNetwork, {
                                      size: u.AvatarNetworkSize.Xs,
                                      src: m.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                                      name: e.name,
                                      borderStyle: s.BorderStyle.none,
                                    }),
                                    o.default.createElement(
                                      u.Text,
                                      {
                                        color: s.TextColor.overlayInverse,
                                        variant: s.TextVariant.bodyMdMedium,
                                        'data-testid': 'accounts-list-item-connected-account-name',
                                        ellipsis: !0,
                                      },
                                      e.name
                                    )
                                  )
                                ),
                          (null == e ? void 0 : e.length) > 4 || (null == t ? void 0 : t.length) > 4
                            ? o.default.createElement(
                                u.Box,
                                {
                                  display: s.Display.Flex,
                                  alignItems: s.AlignItems.center,
                                  textAlign: s.TextAlign.Left,
                                  paddingInline: 2,
                                },
                                o.default.createElement(
                                  u.Text,
                                  {
                                    color: s.TextColor.textMuted,
                                    variant: s.TextVariant.bodyMdMedium,
                                    'data-testid': 'accounts-list-item-plus-more-tooltip',
                                  },
                                  (null == e ? void 0 : e.length) > 0
                                    ? n('moreAccounts', [(null == e ? void 0 : e.length) - 4])
                                    : n('moreNetworks', [t.length - 4])
                                )
                              )
                            : null
                        )
                      ),
                      arrow: !0,
                      offset: 0,
                      delay: 50,
                      duration: 0,
                      size: 'small',
                      title: n('alertDisableTooltip'),
                      trigger: 'mouseenter focus',
                      theme: 'dark',
                      tag: 'div',
                    },
                    (null == e ? void 0 : e.length) > 0 &&
                      o.default.createElement(c.AvatarGroup, {
                        members: f,
                        limit: 4,
                        avatarType: l.AvatarType.ACCOUNT,
                        borderColor: s.BackgroundColor.backgroundDefault,
                      }),
                    (null == t ? void 0 : t.length) > 0 &&
                      o.default.createElement(c.AvatarGroup, {
                        members: g,
                        limit: 4,
                        avatarType: l.AvatarType.TOKEN,
                      })
                  );
                };
                (n.SiteCellTooltip = g),
                  (g.propTypes = {
                    accounts: a.default.arrayOf(
                      a.default.shape({
                        address: a.default.string,
                        label: a.default.string,
                        metadata: a.default.shape({ name: a.default.string }),
                      })
                    ),
                    networks: a.default.arrayOf(
                      a.default.shape({ chainId: a.default.string, name: a.default.string })
                    ),
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/review-permissions-page/site-cell/site-cell-tooltip.js',
      },
    ],
    [
      6659,
      {
        '../../..': 6574,
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../../shared/modules/string-utils': 5878,
        '../../../../../contexts/metametrics': 6836,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../component-library': 6402,
        './site-cell-connection-list-item': 6657,
        './site-cell-tooltip': 6658,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SiteCell = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../../../helpers/constants/design-system'),
                  r = e('../../../../../hooks/useI18nContext'),
                  i = e('../../../../component-library'),
                  s = e('../../..'),
                  l = e('../../../../../contexts/metametrics'),
                  c = e('../../../../../../shared/constants/metametrics'),
                  u = e('../../../../../../shared/modules/string-utils'),
                  d = e('./site-cell-tooltip'),
                  p = e('./site-cell-connection-list-item');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SiteCell = ({
                  nonTestNetworks: e,
                  testNetworks: t,
                  accounts: n,
                  onSelectAccountAddresses: m,
                  onSelectChainIds: f,
                  selectedAccountAddresses: g,
                  selectedChainIds: h,
                  isConnectFlow: y,
                  hideAllToasts: k = () => undefined,
                }) => {
                  const b = (0, r.useI18nContext)(),
                    x = (0, o.useContext)(l.MetaMetricsContext),
                    C = [...e, ...t],
                    [v, T] = (0, o.useState)(!1),
                    [E, w] = (0, o.useState)(!1),
                    _ = n.filter(({ caipAccountId: e }) =>
                      g.some(t => (0, u.isEqualCaseInsensitive)(t, e))
                    ),
                    M = C.filter(({ caipChainId: e }) => h.includes(e)),
                    I = h.length,
                    S =
                      1 === _.length
                        ? b('connectedWithAccountName', [_[0].metadata.name || _[0].label])
                        : b('connectedWithAccount', [_.length]),
                    A =
                      1 === _.length
                        ? b('requestingForAccount', [_[0].metadata.name || _[0].label])
                        : b('requestingFor'),
                    N =
                      1 === I
                        ? b('connectedWithNetworkName', [M[0].name])
                        : b('connectedWithNetwork', [I]),
                    O = 1 === I ? b('requestingForNetwork', [M[0].name]) : b('requestingFor');
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      i.Box,
                      {
                        padding: 4,
                        gap: 4,
                        backgroundColor: a.BackgroundColor.backgroundDefault,
                        borderRadius: a.BorderRadius.LG,
                      },
                      o.default.createElement(p.SiteCellConnectionListItem, {
                        title: b('accountsPermissionsTitle'),
                        iconName: i.IconName.Wallet,
                        connectedMessage: S,
                        unconnectedMessage: A,
                        isConnectFlow: y,
                        onClick: () => {
                          null == k || k(),
                            T(!0),
                            x({
                              category: c.MetaMetricsEventCategory.Navigation,
                              event: c.MetaMetricsEventName.ViewPermissionedAccounts,
                              properties: {
                                location:
                                  'Connect view (permissions tab), Permissions toast, Permissions (dapp)',
                              },
                            });
                        },
                        paddingBottomValue: 2,
                        paddingTopValue: 0,
                        content:
                          1 === _.length
                            ? o.default.createElement(i.AvatarAccount, {
                                address: _[0].address,
                                size: i.AvatarAccountSize.Xs,
                                borderColor: a.BorderColor.transparent,
                              })
                            : o.default.createElement(d.SiteCellTooltip, { accounts: _ }),
                      }),
                      o.default.createElement(p.SiteCellConnectionListItem, {
                        title: b('permission_walletSwitchEthereumChain'),
                        iconName: i.IconName.Data,
                        connectedMessage: N,
                        unconnectedMessage: O,
                        isConnectFlow: y,
                        onClick: () => {
                          null == k || k(),
                            w(!0),
                            x({
                              category: c.MetaMetricsEventCategory.Navigation,
                              event: c.MetaMetricsEventName.ViewPermissionedNetworks,
                              properties: {
                                location:
                                  'Connect view (permissions tab), Permissions toast, Permissions (dapp)',
                              },
                            });
                        },
                        paddingTopValue: 2,
                        paddingBottomValue: 0,
                        content: o.default.createElement(d.SiteCellTooltip, { networks: M }),
                      })
                    ),
                    v &&
                      o.default.createElement(s.EditAccountsModal, {
                        accounts: n,
                        defaultSelectedAccountAddresses: g,
                        onClose: () => T(!1),
                        onSubmit: m,
                      }),
                    E &&
                      o.default.createElement(s.EditNetworksModal, {
                        nonTestNetworks: e,
                        testNetworks: t,
                        defaultSelectedChainIds: h,
                        onClose: () => w(!1),
                        onSubmit: f,
                      })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/review-permissions-page/site-cell/site-cell.tsx',
      },
    ],
    [
      6660,
      {
        '../../..': 6574,
        '../../../../../contexts/i18n': 6832,
        '../../../../../ducks/send': 6865,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../selectors': 7601,
        '../../../../component-library': 6402,
        '../../../account-picker': 6489,
        './send-page-row': 6674,
        '@metamask/keyring-api': 2014,
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
                  (n.SendPageAccountPicker = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/keyring-api'),
                  i = e('../../../../../selectors'),
                  s = e('../../../../component-library'),
                  l = e('../../../account-picker'),
                  c = e('../../../../../helpers/constants/design-system'),
                  u = e('../../../../../contexts/i18n'),
                  d = e('../../..'),
                  p = e('../../../../../ducks/send'),
                  m = e('./send-page-row');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const g = { showOptions: !1 };
                n.SendPageAccountPicker = () => {
                  const e = (0, o.useContext)(u.I18nContext),
                    t = (0, a.useSelector)(i.getSelectedInternalAccount),
                    [n, f] = (0, o.useState)(!1),
                    h = (0, a.useSelector)(p.getSendStage),
                    y = p.SEND_STAGES.EDIT === h,
                    k = (0, o.useCallback)(() => {
                      f(!1);
                    }, []);
                  return o.default.createElement(
                    m.SendPageRow,
                    null,
                    o.default.createElement(s.Label, { paddingBottom: 2 }, e('from')),
                    o.default.createElement(l.AccountPicker, {
                      className: 'multichain-send-page__account-picker',
                      address: t.address,
                      name: t.metadata.name,
                      onClick: () => f(!0),
                      showAddress: !0,
                      borderColor: c.BorderColor.borderMuted,
                      borderWidth: 1,
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 3,
                      block: !0,
                      justifyContent: c.JustifyContent.flexStart,
                      addressProps: { display: c.Display.Flex, textAlign: c.TextAlign.Start },
                      labelProps: {
                        style: { flexGrow: 1, textAlign: 'start' },
                        paddingInlineStart: 1,
                        className: 'multichain-send-page__account-picker__label',
                      },
                      textProps: { display: c.Display.Flex, width: c.BlockSize.Full },
                      width: c.BlockSize.Full,
                      disabled: y,
                      'data-testid': 'send-page-account-picker',
                    }),
                    n
                      ? o.default.createElement(d.AccountListMenu, {
                          accountListItemProps: g,
                          showAccountCreation: !1,
                          onClose: k,
                          allowedAccountTypes: [r.EthAccountType.Eoa, r.EthAccountType.Erc4337],
                        })
                      : null
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/account-picker.tsx',
      },
    ],
    [
      6661,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../contexts/i18n': 6832,
        '../../../../../contexts/metametrics': 6836,
        '../../../../../ducks/send': 6865,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/constants/routes': 6878,
        '../../../../../selectors': 7601,
        '../../../../app/contact-list': 6007,
        '../../../../component-library': 6402,
        './send-page-row': 6674,
        'fuse.js': 4545,
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
                  (n.SendPageAddressBook = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var i = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(o, r, i) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = h(e('fuse.js')),
                  i = e('../../../../component-library'),
                  s = e('../../../../../contexts/i18n'),
                  l = h(e('../../../../app/contact-list')),
                  c = e('../../../../../selectors'),
                  u = e('../../../../../ducks/send'),
                  d = e('../../../../../helpers/constants/design-system'),
                  p = e('../../../../../helpers/constants/routes'),
                  m = e('../../../../../contexts/metametrics'),
                  f = e('../../../../../../shared/constants/metametrics'),
                  g = e('./send-page-row');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SendPageAddressBook = () => {
                  const e = (0, o.useContext)(s.I18nContext),
                    t = (0, a.useDispatch)(),
                    n = (0, o.useContext)(m.MetaMetricsContext),
                    h = (0, a.useSelector)(c.getAddressBook),
                    y = (0, a.useSelector)(c.getInternalAccounts),
                    k = h.filter(({ name: e }) => Boolean(e)),
                    b = [...(0, a.useSelector)(c.getCurrentNetworkTransactions)].reverse(),
                    x = h
                      .filter(({ name: e }) => !e)
                      .map(e => {
                        const t = b.find(t => t.txParams.to === e.address.toLowerCase());
                        return { ...e, timestamp: null == t ? void 0 : t.time };
                      }),
                    C = (0, a.useSelector)(u.getRecipientUserInput),
                    v = new r.default(k, {
                      shouldSort: !0,
                      threshold: 0.45,
                      location: 0,
                      distance: 100,
                      maxPatternLength: 32,
                      minMatchCharLength: 1,
                      keys: [
                        { name: 'name', weight: 0.5 },
                        { name: 'address', weight: 0.5 },
                      ],
                    }),
                    T = new r.default(x, {
                      shouldSort: !0,
                      threshold: 0.45,
                      location: 0,
                      distance: 100,
                      maxPatternLength: 32,
                      minMatchCharLength: 1,
                      keys: [{ name: 'address', weight: 0.5 }],
                    });
                  return o.default.createElement(
                    g.SendPageRow,
                    null,
                    h.length
                      ? o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(l.default, {
                            addressBook: h,
                            internalAccounts: y,
                            searchForContacts: () => (C ? (v.setCollection(k), v.search(C)) : k),
                            searchForRecents: () => (C ? (T.setCollection(x), T.search(C)) : x),
                            selectRecipient: (e = '', o = '') => {
                              ((e = '', o = '', a = 'user input') => {
                                t(
                                  (0, u.addHistoryEntry)(
                                    `sendFlow - User clicked recipient from ${a}. address: ${e}, nickname ${o}`
                                  )
                                ),
                                  n(
                                    {
                                      event: f.MetaMetricsEventName.sendRecipientSelected,
                                      category: f.MetaMetricsEventCategory.Send,
                                      properties: { location: 'address book', inputType: a },
                                    },
                                    { excludeMetaMetricsId: !1 }
                                  ),
                                  t((0, u.updateRecipient)({ address: e, nickname: o })),
                                  t((0, u.updateRecipientUserInput)(e));
                              })(e, o, (o ? 'contact' : 'recent') + ' list');
                            },
                          })
                        )
                      : o.default.createElement(
                          i.Box,
                          { padding: 6, textAlign: d.TextAlign.Center },
                          o.default.createElement(
                            i.Text,
                            { marginBottom: 4, fontWeight: d.FontWeight.Bold },
                            e('sendNoContactsTitle')
                          ),
                          o.default.createElement(
                            i.Text,
                            { color: d.TextColor.textAlternative },
                            e('sendNoContactsDescription', [
                              o.default.createElement(
                                i.Text,
                                {
                                  as: 'a',
                                  href: `#${p.CONTACT_LIST_ROUTE}`,
                                  color: d.TextColor.primaryDefault,
                                },
                                e('sendNoContactsConversionText')
                              ),
                            ])
                          )
                        )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/address-book.tsx',
      },
    ],
  ],
  [],
  {}
);
