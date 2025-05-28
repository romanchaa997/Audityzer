LavaPack.loadBundle(
  [
    [
      6662,
      {
        '../../../../../contexts/i18n': 6832,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/util': 6921,
        '../../../../component-library': 6402,
        '../../../../ui/confusable': 6718,
        '../../../../ui/tooltip': 6818,
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
                  (n.DomainInputResolutionCell = void 0);
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
                  o = e('../../../../../contexts/i18n'),
                  i = d(e('../../../../ui/confusable')),
                  s = e('../../../../component-library'),
                  l = e('../../../../../helpers/constants/design-system'),
                  u = d(e('../../../../ui/tooltip')),
                  c = e('../../../../../helpers/utils/util');
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
                  address: e,
                  domainName: t,
                  resolvingSnap: n = '',
                  onClick: r,
                  protocol: d,
                }) => {
                  const p = (0, a.useContext)(o.I18nContext),
                    f = (0, a.useRef)(null),
                    m = (0, a.useRef)(null),
                    [h, g] = (0, a.useState)(!1);
                  (0, a.useEffect)(() => {
                    var e;
                    if (!f.current) return;
                    let n = f.current.offsetWidth < f.current.scrollWidth;
                    const a =
                      null === (e = f.current.textContent) || void 0 === e ? void 0 : e.length;
                    n && !m.current && a && (m.current = a),
                      n ||
                        (m.current &&
                          (t.length >= m.current ? (n = !0) : ((n = !1), (m.current = null)))),
                      n !== h && g(n);
                  }, [t, h]);
                  const y = () =>
                    a.default.createElement(
                      u.default,
                      {
                        containerClassName: 'multichain-send-page__recipient__item__title-tooltip',
                        wrapperClassName:
                          'multichain-send-page__recipient__item__title-tooltip-container',
                        position: 'bottom',
                        title: t,
                      },
                      a.default.createElement(i.default, {
                        asText: !0,
                        input: t,
                        confusableWrapperName:
                          'multichain-send-page__recipient__item__title-confusable-wrapper',
                      })
                    );
                  return a.default.createElement(
                    s.Box,
                    {
                      key: e,
                      className: 'multichain-send-page__recipient__item',
                      onClick: () => r(),
                      display: l.Display.Flex,
                      alignItems: l.AlignItems.center,
                      paddingBottom: 2,
                      style: { cursor: 'pointer' },
                      'data-testid': 'multichain-send-page__recipient__item',
                    },
                    a.default.createElement(
                      u.default,
                      { title: p('suggestedBySnap', [n]) },
                      a.default.createElement(
                        s.BadgeWrapper,
                        {
                          badge: a.default.createElement(s.AvatarIcon, {
                            iconName: s.IconName.Snaps,
                            size: s.AvatarIconSize.Xs,
                            className: 'multichain-send-page__recipient__item__avatar',
                            backgroundColor: l.BackgroundColor.infoDefault,
                            borderColor: l.BorderColor.backgroundDefault,
                            borderWidth: 2,
                            iconProps: {
                              color: l.IconColor.infoInverse,
                              style: { width: '12px', height: '12px' },
                              name: s.IconName.Snaps,
                            },
                          }),
                          positionObj: { bottom: '25%', right: '10%' },
                          badgeContainerProps: {
                            className: 'multichain-send-page__recipient__item__badge',
                          },
                        },
                        a.default.createElement(s.AvatarAccount, { address: e })
                      )
                    ),
                    a.default.createElement(
                      s.Box,
                      {
                        className: 'multichain-send-page__recipient__item__content',
                        paddingLeft: 4,
                        style: { overflow: 'hidden' },
                      },
                      a.default.createElement(
                        s.Box,
                        {
                          ref: f,
                          className: 'multichain-send-page__recipient__item__title',
                          'data-testid': 'multichain-send-page__recipient__item__title',
                          display: l.Display.Flex,
                        },
                        h
                          ? a.default.createElement(y, null)
                          : a.default.createElement(i.default, { asText: !0, input: t })
                      ),
                      a.default.createElement(
                        s.Text,
                        { color: l.TextColor.textAlternative },
                        (0, c.shortenAddress)(e)
                      ),
                      a.default.createElement(
                        s.Box,
                        {
                          className: 'multichain-send-page__recipient__item__subtitle',
                          'data-testid': 'multichain-send-page__recipient__item__subtitle',
                        },
                        a.default.createElement(
                          s.Text,
                          { color: l.TextColor.textAlternative, variant: l.TextVariant.bodySm },
                          d
                        )
                      )
                    )
                  );
                };
                (n.DomainInputResolutionCell = f),
                  (f.propTypes = {
                    address: r.default.string.isRequired,
                    domainName: r.default.string.isRequired,
                    resolvingSnap: r.default.string.isRequired,
                    onClick: r.default.func,
                    protocol: r.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/domain-input-resolution-cell.tsx',
      },
    ],
    [
      6663,
      {
        '../../../../../ducks/send': 6865,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../pages/confirmations/send/send.constants': 7361,
        '../../../../component-library': 6402,
        '../../../../component-library/textarea': 6465,
        './send-page-row': 6674,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SendHexData = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../../../hooks/useI18nContext'),
                  s = e('../../../../component-library'),
                  l = e('../../../../../ducks/send'),
                  u = e('../../../../component-library/textarea'),
                  c = e('../../../../../pages/confirmations/send/send.constants'),
                  d = e('../../../../../helpers/constants/design-system'),
                  p = e('./send-page-row');
                n.SendHexData = () => {
                  const e = (0, i.useI18nContext)(),
                    t = (0, o.useDispatch)(),
                    n = (0, o.useSelector)(l.getSendHexData),
                    a = (0, o.useSelector)(l.getSendHexDataError),
                    f = a === c.INVALID_HEX_DATA_ERROR,
                    m = Boolean(a);
                  return r.default.createElement(
                    p.SendPageRow,
                    null,
                    r.default.createElement(s.Label, null, e('hexData')),
                    r.default.createElement(u.Textarea, {
                      onInput: e => {
                        const n = e.target.value.replace(/\n/gu, '') || null;
                        t((0, l.updateSendHexData)(n ?? ''));
                      },
                      placeholder: e('optional'),
                      defaultValue: n || '',
                      'data-testid': 'send-hex-textarea',
                      error: m,
                    }),
                    f &&
                      r.default.createElement(
                        s.Text,
                        { variant: d.TextVariant.bodySm, color: d.TextColor.errorDefault },
                        e('invalidHexData')
                      )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/send/components/hex.tsx' },
    ],
    [
      6664,
      {
        './account-picker': 6660,
        './address-book': 6661,
        './domain-input-resolution-cell': 6662,
        './hex': 6663,
        './network-picker': 6665,
        './quote-card': 6670,
        './recipient': 6673,
        './recipient-content': 6671,
        './recipient-input': 6672,
        './send-page-row': 6674,
        './your-accounts': 6675,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'DomainInputResolutionCell', {
                    enumerable: !0,
                    get: function () {
                      return f.DomainInputResolutionCell;
                    },
                  }),
                  Object.defineProperty(n, 'QuoteCard', {
                    enumerable: !0,
                    get: function () {
                      return p.QuoteCard;
                    },
                  }),
                  Object.defineProperty(n, 'SendHexData', {
                    enumerable: !0,
                    get: function () {
                      return d.SendHexData;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageAccountPicker', {
                    enumerable: !0,
                    get: function () {
                      return r.SendPageAccountPicker;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageAddressBook', {
                    enumerable: !0,
                    get: function () {
                      return l.SendPageAddressBook;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageNetworkPicker', {
                    enumerable: !0,
                    get: function () {
                      return o.SendPageNetworkPicker;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageRecipient', {
                    enumerable: !0,
                    get: function () {
                      return u.SendPageRecipient;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageRecipientContent', {
                    enumerable: !0,
                    get: function () {
                      return c.SendPageRecipientContent;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageRecipientInput', {
                    enumerable: !0,
                    get: function () {
                      return s.SendPageRecipientInput;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageRow', {
                    enumerable: !0,
                    get: function () {
                      return a.SendPageRow;
                    },
                  }),
                  Object.defineProperty(n, 'SendPageYourAccounts', {
                    enumerable: !0,
                    get: function () {
                      return i.SendPageYourAccounts;
                    },
                  });
                var a = e('./send-page-row'),
                  r = e('./account-picker'),
                  o = e('./network-picker'),
                  i = e('./your-accounts'),
                  s = e('./recipient-input'),
                  l = e('./address-book'),
                  u = e('./recipient'),
                  c = e('./recipient-content'),
                  d = e('./hex'),
                  p = e('./quote-card'),
                  f = e('./domain-input-resolution-cell');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/send/components/index.ts' },
    ],
    [
      6665,
      {
        '../../../../../selectors': 7601,
        '../../../../../store/actions': 7619,
        '../../../../component-library': 6402,
        './send-page-row': 6674,
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
                  (n.SendPageNetworkPicker = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('../../../../../selectors'),
                  s = e('../../../../../store/actions'),
                  l = e('../../../../component-library'),
                  u = e('./send-page-row');
                n.SendPageNetworkPicker = () => {
                  var e;
                  const t = (0, o.useSelector)(i.getCurrentNetwork),
                    n = (0, o.useDispatch)();
                  return r.default.createElement(
                    u.SendPageRow,
                    null,
                    r.default.createElement(l.PickerNetwork, {
                      label: (null == t ? void 0 : t.nickname) ?? '',
                      src:
                        null == t || null === (e = t.rpcPrefs) || void 0 === e
                          ? void 0
                          : e.imageUrl,
                      onClick: () => n((0, s.toggleNetworkMenu)()),
                      'data-testid': 'send-page-network-picker',
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/network-picker.tsx',
      },
    ],
    [
      6666,
      {
        '../../../../../../../../shared/constants/common': 5791,
        '../../../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../../../ducks/metamask/metamask': 6860,
        '../../../../../../../ducks/swaps/swaps': 6868,
        '../../../../../../../helpers/utils/confirm-tx.util': 6899,
        '../../../../../../../selectors/selectors': 7611,
        './utils': 6669,
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
                  (n.default = function (e = 0) {
                    const t = (0, r.useDispatch)(),
                      n = (0, r.useSelector)(s.getNativeCurrency),
                      m = (0, r.useSelector)(s.getConversionRate),
                      h = (0, r.useSelector)(s.getCurrentCurrency),
                      g = (0, r.useSelector)(u.checkNetworkAndAccountSupports1559),
                      { medium: y, gasPrice: b } = (0, r.useSelector)(s.getGasFeeEstimates),
                      v = b ?? (null == y ? void 0 : y.suggestedMaxFeePerGas),
                      _ = (0, r.useSelector)(c.getCurrentChainId),
                      T = (0, r.useSelector)(u.getIsSwapsChain),
                      C = (0, r.useSelector)(d.getUsedSwapsGasPrice);
                    return (
                      (0, a.useEffect)(() => {
                        T && (g || t((0, d.fetchAndSetSwapsGasPriceInfo)()));
                      }, [t, _, g, T]),
                      (0, a.useMemo)(() => {
                        const t = g ? v : C;
                        if (!t) return { formattedFiatGasFee: '', formattedEthGasFee: '' };
                        const a = new i.Numeric(
                            t,
                            (0, o.isHexString)(t) ? 16 : 10,
                            l.EtherDenomination.GWEI
                          )
                            .times(new i.Numeric(e, 10))
                            .toDenomination(l.EtherDenomination.ETH),
                          r = m ? a.applyConversionRate(m).toNumber() : undefined;
                        return {
                          formattedFiatGasFee: r
                            ? (0, p.formatCurrency)(new i.Numeric(r, 10).toString(), h)
                            : '',
                          formattedEthGasFee: `${(0, f.toFixedNoTrailingZeros)(a.toNumber())} ${n}`,
                        };
                      }, [g, null == y ? void 0 : y.suggestedMaxFeePerGas, C, e, m, h, n])
                    );
                  });
                var a = e('react'),
                  r = e('react-redux'),
                  o = e('@metamask/utils'),
                  i = e('../../../../../../../../shared/modules/Numeric'),
                  s = e('../../../../../../../ducks/metamask/metamask'),
                  l = e('../../../../../../../../shared/constants/common'),
                  u = e('../../../../../../../selectors/selectors'),
                  c = e('../../../../../../../../shared/modules/selectors/networks'),
                  d = e('../../../../../../../ducks/swaps/swaps'),
                  p = e('../../../../../../../helpers/utils/confirm-tx.util'),
                  f = e('./utils');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/quote-card/hooks/useEthFeeData.tsx',
      },
    ],
    [
      6667,
      {
        '../../../../../../../../shared/constants/transaction': 5819,
        '../../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../../ducks/metamask/metamask': 6860,
        '../../../../../../../ducks/send': 6865,
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
                    var e, t, n, d;
                    const p = (0, r.useSelector)(o.getBestQuote),
                      { sendAsset: f, receiveAsset: m } = (0, r.useSelector)(
                        o.getCurrentDraftTransaction
                      ),
                      h = (0, r.useSelector)(u.getNativeCurrency),
                      g =
                        (null == f ? void 0 : f.type) === i.AssetType.native
                          ? h
                          : null == f || null === (e = f.details) || void 0 === e
                            ? void 0
                            : e.symbol,
                      y =
                        (null == m ? void 0 : m.type) === i.AssetType.native
                          ? h
                          : null == m || null === (t = m.details) || void 0 === t
                            ? void 0
                            : t.symbol;
                    return (0, a.useMemo)(() => {
                      if (p && f && m) {
                        var e, t;
                        const n = (0, s.calcTokenAmount)(
                            p.sourceAmount,
                            (null === (e = f.details) || void 0 === e ? void 0 : e.decimals) || c
                          ),
                          a = (0, s.calcTokenAmount)(
                            p.destinationAmount,
                            (null === (t = m.details) || void 0 === t ? void 0 : t.decimals) || c
                          ),
                          r = new l.Numeric(a).divide(n).round(9).toNumber();
                        return `1 ${g} = ${r} ${y}`;
                      }
                      return undefined;
                    }, [
                      null == p ? void 0 : p.sourceAmount,
                      null == p ? void 0 : p.destinationAmount,
                      null == f || null === (n = f.details) || void 0 === n ? void 0 : n.decimals,
                      null == m || null === (d = m.details) || void 0 === d ? void 0 : d.decimals,
                      g,
                      y,
                    ]);
                  });
                var a = e('react'),
                  r = e('react-redux'),
                  o = e('../../../../../../../ducks/send'),
                  i = e('../../../../../../../../shared/constants/transaction'),
                  s = e('../../../../../../../../shared/lib/transactions-controller-utils'),
                  l = e('../../../../../../../../shared/modules/Numeric'),
                  u = e('../../../../../../../ducks/metamask/metamask');
                const c = 18;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/quote-card/hooks/useGetConversionRate.tsx',
      },
    ],
    [
      6668,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../../../hooks/useI18nContext': 6985,
        '@metamask/controller-utils': 1515,
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
                    const e = (0, a.useSelector)(s.getCurrentChainId),
                      t = (0, i.useI18nContext)();
                    switch ((0, r.toHex)(e)) {
                      case o.CHAIN_IDS.MAINNET:
                        return t('networkNameEthereum');
                      case o.CHAIN_IDS.BSC:
                        return t('networkNameBSC');
                      case o.CHAIN_IDS.POLYGON:
                        return t('networkNamePolygon');
                      case o.CHAIN_IDS.LOCALHOST:
                        return t('networkNameTestnet');
                      case o.CHAIN_IDS.GOERLI:
                        return t('networkNameGoerli');
                      case o.CHAIN_IDS.AVALANCHE:
                        return t('networkNameAvalanche');
                      case o.CHAIN_IDS.OPTIMISM:
                        return t('networkNameOpMainnet');
                      case o.CHAIN_IDS.ARBITRUM:
                        return t('networkNameArbitrum');
                      case o.CHAIN_IDS.ZKSYNC_ERA:
                        return t('networkNameZkSyncEra');
                      case o.CHAIN_IDS.LINEA_MAINNET:
                        return t('networkNameLinea');
                      case o.CHAIN_IDS.BASE:
                        return t('networkNameBase');
                      default:
                        return undefined;
                    }
                  });
                var a = e('react-redux'),
                  r = e('@metamask/controller-utils'),
                  o = e('../../../../../../../../shared/constants/network'),
                  i = e('../../../../../../../hooks/useI18nContext'),
                  s = e('../../../../../../../../shared/modules/selectors/networks');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/quote-card/hooks/useTranslatedNetworkName.tsx',
      },
    ],
    [
      6669,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.toFixedNoTrailingZeros = void 0);
                const a = /0+$/u;
                n.toFixedNoTrailingZeros = (e, t = 7) => {
                  const n = e.toFixed(t).replace(a, '');
                  return n.endsWith('.') ? n.slice(0, -1) : n;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/quote-card/hooks/utils.ts',
      },
    ],
    [
      6670,
      {
        '../../../../../../../shared/constants/metametrics': 5800,
        '../../../../../../../shared/constants/time': 5817,
        '../../../../../../../shared/lib/ui-utils': 5852,
        '../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../contexts/metametrics': 6836,
        '../../../../../../ducks/send': 6865,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../../component-library': 6402,
        '../../../../../ui/info-tooltip/info-tooltip-icon': 6760,
        '../../../../../ui/tooltip': 6818,
        './hooks/useEthFeeData': 6666,
        './hooks/useGetConversionRate': 6667,
        './hooks/useTranslatedNetworkName': 6668,
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
                  (n.QuoteCard = function ({ scrollRef: e }) {
                    var t;
                    const n = (0, l.useI18nContext)(),
                      v = (0, r.useDispatch)(),
                      _ = (0, r.useSelector)(s.getSendAnalyticProperties),
                      C = (0, y.default)(),
                      k = (0, a.useContext)(m.MetaMetricsContext),
                      { isSwapQuoteLoading: w } = (0, r.useSelector)(s.getCurrentDraftTransaction),
                      E = (0, r.useSelector)(s.getBestQuote),
                      [x, M] = (0, a.useState)(undefined),
                      { formattedEthGasFee: O, formattedFiatGasFee: I } = (0, g.default)(
                        ((null == E ? void 0 : E.gasParams.maxGas) || 0) +
                          Number(
                            (0, h.hexToDecimal)(
                              (null == E || null === (t = E.approvalNeeded) || void 0 === t
                                ? void 0
                                : t.gas) || '0x0'
                            )
                          )
                      ),
                      N = (0, b.default)(),
                      S = (0, a.useRef)(E);
                    (0, a.useEffect)(() => {
                      const t = E && S.current === undefined;
                      var n;
                      ((S.current = E), t) &&
                        (null === (n = e.current) ||
                          void 0 === n ||
                          n.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                      E
                        ? (k(
                            {
                              event: p.MetaMetricsEventName.sendSwapQuoteReceived,
                              category: p.MetaMetricsEventCategory.Send,
                              properties: { is_first_fetch: t },
                              sensitiveProperties: { ..._ },
                            },
                            { excludeMetaMetricsId: !1 }
                          ),
                          M(T))
                        : M(undefined);
                    }, [E]),
                      (0, a.useEffect)(() => {
                        if (w || x === undefined) return;
                        x <= 0 && v((0, s.updateSendQuote)(!1, !0));
                        const e = setTimeout(() => M(x - 1), u.SECOND);
                        return () => clearTimeout(e);
                      }, [x]),
                      (0, a.useEffect)(() => {
                        w
                          ? k(
                              {
                                event: p.MetaMetricsEventName.sendSwapQuoteRequested,
                                category: p.MetaMetricsEventCategory.Send,
                                sensitiveProperties: { ..._ },
                              },
                              { excludeMetaMetricsId: !1 }
                            )
                          : E &&
                            k(
                              {
                                event: p.MetaMetricsEventName.sendSwapQuoteReceived,
                                category: p.MetaMetricsEventCategory.Send,
                                sensitiveProperties: { ..._ },
                              },
                              { excludeMetaMetricsId: !1 }
                            );
                      }, [w]);
                    const P = (0, a.useMemo)(() => {
                      if (w) return n('swapFetchingQuotes');
                      if (E) {
                        const e = `0${x}`.slice(-2);
                        return x ? n('swapNewQuoteIn', [`0:${e}`]) : undefined;
                      }
                      return undefined;
                    }, [w, E, x]);
                    if (!Boolean(P || E)) return null;
                    return a.default.createElement(
                      o.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        alignItems: i.AlignItems.flexStart,
                        gap: 2,
                      },
                      P &&
                        a.default.createElement(
                          o.Text,
                          {
                            color: i.TextColor.textAlternative,
                            variant: i.TextVariant.bodySm,
                            className: 'quote-card__fetch-status',
                          },
                          P
                        ),
                      E &&
                        a.default.createElement(
                          o.Box,
                          {
                            backgroundColor: i.BackgroundColor.backgroundAlternative,
                            borderRadius: i.BorderRadius.LG,
                            width: i.BlockSize.Full,
                            gap: 2,
                            padding: 3,
                          },
                          a.default.createElement(
                            o.Box,
                            { display: i.Display.Flex, alignItems: i.AlignItems.center },
                            a.default.createElement(
                              o.Text,
                              {
                                className: 'quote-card__text',
                                color: i.TextColor.textAlternative,
                                marginRight: 'auto',
                                variant: i.TextVariant.bodySm,
                              },
                              n('quoteRate')
                            ),
                            a.default.createElement(
                              o.Text,
                              {
                                marginLeft: 'auto',
                                variant: i.TextVariant.bodySm,
                                'data-testid': 'quote-card__conversion-rate',
                              },
                              N
                            )
                          ),
                          a.default.createElement(
                            o.Box,
                            { display: i.Display.Flex, alignItems: i.AlignItems.center },
                            a.default.createElement(
                              o.Box,
                              {
                                display: i.Display.Flex,
                                marginRight: 'auto',
                                gap: 1,
                                alignItems: i.AlignItems.center,
                              },
                              a.default.createElement(
                                o.Text,
                                {
                                  variant: i.TextVariant.bodySm,
                                  color: i.TextColor.textAlternative,
                                },
                                n('transactionDetailGasHeading')
                              ),
                              a.default.createElement(
                                c.default,
                                {
                                  interactive: !0,
                                  position: 'left',
                                  containerClassName: 'info-tooltip__tooltip-container',
                                  tooltipInnerClassName: 'info-tooltip__tooltip-content',
                                  tooltipArrowClassName: 'info-tooltip__left-tooltip-arrow',
                                  style: { display: 'flex', height: '12px', aspectRatio: '1' },
                                  html: a.default.createElement(
                                    a.default.Fragment,
                                    null,
                                    a.default.createElement(
                                      'p',
                                      null,
                                      n('swapGasFeesSummary', [C])
                                    ),
                                    a.default.createElement('p', null, n('swapGasFeesDetails')),
                                    a.default.createElement(
                                      'p',
                                      null,
                                      a.default.createElement(
                                        'a',
                                        {
                                          onClick: () => {
                                            k({
                                              event: 'Clicked "Gas Fees: Learn More" Link',
                                              category: p.MetaMetricsEventCategory.Swaps,
                                            }),
                                              global.platform.openTab({
                                                url: f.GAS_FEES_LEARN_MORE_URL,
                                              });
                                          },
                                          target: '_blank',
                                          rel: 'noreferrer',
                                        },
                                        n('swapGasFeesLearnMore')
                                      )
                                    )
                                  ),
                                  theme: 'tippy-tooltip-info',
                                },
                                a.default.createElement(d.default, {
                                  fillColor: 'var(--color-icon-alternative)',
                                })
                              )
                            ),
                            a.default.createElement(
                              o.Box,
                              { display: i.Display.Flex, marginLeft: 'auto' },
                              a.default.createElement(
                                o.Text,
                                {
                                  variant: i.TextVariant.bodySm,
                                  'data-testid': 'quote-card__gas-fee',
                                },
                                O
                              ),
                              I &&
                                a.default.createElement(
                                  o.Text,
                                  {
                                    color: i.TextColor.textAlternative,
                                    variant: i.TextVariant.bodySm,
                                    marginLeft: 1,
                                    'data-testid': 'quote-card__fiat-gas-fee',
                                  },
                                  '≈ ',
                                  I
                                )
                            )
                          )
                        ),
                      E &&
                        a.default.createElement(
                          o.Text,
                          { color: i.TextColor.textAlternative, variant: i.TextVariant.bodySm },
                          n('swapIncludesMMFeeAlt', [null == E ? void 0 : E.fee])
                        ),
                      E &&
                        a.default.createElement(
                          o.ButtonLink,
                          {
                            variant: i.TextVariant.bodySm,
                            href: f.CONSENSYS_TERMS_OF_USE,
                            target: '_blank',
                            className: 'quote-card__TOS',
                          },
                          n('termsOfService')
                        ),
                      a.default.createElement('div', { ref: e })
                    );
                  });
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
                  r = e('react-redux'),
                  o = e('../../../../../component-library'),
                  i = e('../../../../../../helpers/constants/design-system'),
                  s = e('../../../../../../ducks/send'),
                  l = e('../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../../../shared/constants/time'),
                  c = v(e('../../../../../ui/tooltip')),
                  d = v(e('../../../../../ui/info-tooltip/info-tooltip-icon')),
                  p = e('../../../../../../../shared/constants/metametrics'),
                  f = e('../../../../../../../shared/lib/ui-utils'),
                  m = e('../../../../../../contexts/metametrics'),
                  h = e('../../../../../../../shared/modules/conversion.utils'),
                  g = v(e('./hooks/useEthFeeData')),
                  y = v(e('./hooks/useTranslatedNetworkName')),
                  b = v(e('./hooks/useGetConversionRate'));
                function v(e) {
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
                const T = 30;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/quote-card/index.tsx',
      },
    ],
    [
      6671,
      {
        '../../..': 6574,
        '../../../../../../shared/constants/transaction': 5819,
        '../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../shared/modules/string-utils': 5878,
        '../../../../../ducks/metamask/metamask': 6860,
        '../../../../../ducks/send': 6865,
        '../../../../../helpers/constants/common': 6870,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useGetAssetImageUrl': 6983,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../../component-library': 6402,
        '../../../asset-picker-amount/asset-picker-modal/asset-picker-modal-tabs': 6510,
        './hex': 6663,
        './quote-card': 6670,
        './send-page-row': 6674,
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
                  (n.SendPageRecipientContent = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = C(t);
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
                  i = e('../../../../component-library'),
                  s = e('../../../../../ducks/metamask/metamask'),
                  l = e('../../../../../ducks/send'),
                  u = e('../../../../../../shared/constants/transaction'),
                  c = e('../../../../../helpers/constants/common'),
                  d = e('../../../../../helpers/constants/design-system'),
                  p = e('../../../../../hooks/useI18nContext'),
                  f = e('../../..'),
                  m = e('../../../../../../shared/modules/conversion.utils'),
                  h = e('../../../../../selectors'),
                  g =
                    (a = e('../../../../../hooks/useGetAssetImageUrl')) && a.__esModule
                      ? a
                      : { default: a },
                  y = e('../../../../../../shared/modules/string-utils'),
                  b = e('../../../asset-picker-amount/asset-picker-modal/asset-picker-modal-tabs'),
                  v = e('./send-page-row'),
                  _ = e('./quote-card'),
                  T = e('./hex');
                function C(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (C = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SendPageRecipientContent = ({
                  requireContractAddressAcknowledgement: e,
                  onAssetChange: t,
                  onClick: n,
                }) => {
                  var a, C, k, w, E, x, M;
                  const O = (0, p.useI18nContext)(),
                    {
                      receiveAsset: I,
                      sendAsset: N,
                      amount: S,
                      isSwapQuoteLoading: P,
                    } = (0, o.useSelector)(l.getCurrentDraftTransaction),
                    A = (0, o.useSelector)(h.getUseExternalServices),
                    j = (0, o.useSelector)(h.getIsSwapsChain),
                    D = (0, o.useSelector)(l.getIsSwapAndSendDisabledForNetwork),
                    R = (0, o.useSelector)(l.getSwapsBlockedTokens),
                    B = (0, r.useMemo)(() => new Set(R), [R]),
                    $ = (0, o.useSelector)(s.getNativeCurrency),
                    F = (0, o.useSelector)(h.getNativeCurrencyImage),
                    L = (0, o.useSelector)(h.getTokenList),
                    U = (0, o.useSelector)(h.getIpfsGateway),
                    H = (0, g.default)(
                      (null === (a = N.details) || void 0 === a ? void 0 : a.image) ?? undefined,
                      U
                    ),
                    V =
                      j &&
                      !D &&
                      [u.AssetType.token, u.AssetType.native].includes(N.type) &&
                      A &&
                      !B.has(
                        null === (C = N.details) ||
                          void 0 === C ||
                          null === (C = C.address) ||
                          void 0 === C
                          ? void 0
                          : C.toLowerCase()
                      ),
                    W = (0, o.useSelector)(l.getBestQuote),
                    q = !W && P,
                    z = (0, y.isEqualCaseInsensitive)(
                      (null === (k = I.details) || void 0 === k ? void 0 : k.address) ?? '',
                      (null === (w = N.details) || void 0 === w ? void 0 : w.address) ?? ''
                    ),
                    G = z
                      ? S
                      : {
                          value: (0, m.decimalToHex)(
                            (null == W ? void 0 : W.destinationAmount) || '0'
                          ),
                        },
                    K = (0, o.useSelector)(s.getSendHexDataFeatureFlagState),
                    Y = (0, o.useSelector)(l.getSendAsset),
                    Z = z && K && Y && Y.type !== u.AssetType.token && Y.type !== u.AssetType.NFT,
                    Q = (0, r.useRef)(null),
                    X = (0, o.useDispatch)();
                  return r.default.createElement(
                    i.Box,
                    null,
                    e
                      ? r.default.createElement(
                          v.SendPageRow,
                          null,
                          r.default.createElement(
                            i.BannerAlert,
                            {
                              severity: i.BannerAlertSeverity.Danger,
                              'data-testid': 'send-warning',
                              actionButtonLabel: O('tooltipApproveButton'),
                              actionButtonOnClick: () => {
                                X((0, l.acknowledgeRecipientWarning)());
                              },
                              actionButtonProps: { display: d.Display.Block, marginTop: 4 },
                            },
                            O('sendingToTokenContractWarning', [
                              r.default.createElement(
                                'a',
                                {
                                  key: 'contractWarningSupport',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  className: 'send__warning-container__link',
                                  href: c.CONTRACT_ADDRESS_LINK,
                                },
                                O('learnMoreUpperCase')
                              ),
                            ])
                          )
                        )
                      : null,
                    r.default.createElement(
                      v.SendPageRow,
                      null,
                      r.default.createElement(f.AssetPickerAmount, {
                        header: O('sendSelectReceiveAsset'),
                        action: 'receive',
                        asset: V ? I : N,
                        sendingAsset: V &&
                          N && {
                            image:
                              N.type === u.AssetType.native
                                ? F
                                : L &&
                                  N.details &&
                                  (H ||
                                    (null ===
                                      (E =
                                        L[
                                          null === (x = N.details.address) || void 0 === x
                                            ? void 0
                                            : x.toLowerCase()
                                        ]) || void 0 === E
                                      ? void 0
                                      : E.iconUrl)),
                            symbol:
                              (null == N || null === (M = N.details) || void 0 === M
                                ? void 0
                                : M.symbol) || $,
                          },
                        onAssetChange: (0, r.useCallback)(e => t(e, V), [t, V]),
                        isAmountLoading: q,
                        amount: G,
                        isDisabled: !V,
                        onClick: n,
                        visibleTabs: [b.TabName.TOKENS],
                      })
                    ),
                    r.default.createElement(_.QuoteCard, { scrollRef: Q }),
                    Z ? r.default.createElement(T.SendHexData, null) : null,
                    r.default.createElement('div', { ref: Q })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/recipient-content.tsx',
      },
    ],
    [
      6672,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../../contexts/i18n': 6832,
        '../../../../../contexts/metametrics': 6836,
        '../../../../../ducks/send': 6865,
        '../../../../../helpers/utils/util': 6921,
        '../../../../../pages/confirmations/send/send-content/add-recipient/domain-input': 7360,
        '../../../../../store/actions': 7619,
        '../../../../component-library': 6402,
        './send-page-row': 6674,
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
                  (n.SendPageRecipientInput = void 0);
                var a,
                  r = (function (e, t) {
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
                  o = e('react-redux'),
                  i = e('../../../../component-library'),
                  s =
                    (a = e(
                      '../../../../../pages/confirmations/send/send-content/add-recipient/domain-input'
                    )) && a.__esModule
                      ? a
                      : { default: a },
                  l = e('../../../../../contexts/i18n'),
                  u = e('../../../../../ducks/send'),
                  c = e('../../../../../store/actions'),
                  d = e('../../../../../contexts/metametrics'),
                  p = e('../../../../../../shared/constants/metametrics'),
                  f = e('../../../../../helpers/utils/util'),
                  m = e('../../../../../../shared/modules/hexstring-utils'),
                  h = e('./send-page-row');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SendPageRecipientInput = () => {
                  const e = (0, r.useContext)(l.I18nContext),
                    t = (0, o.useDispatch)(),
                    n = (0, r.useContext)(d.MetaMetricsContext),
                    a = (0, o.useSelector)(u.getRecipient),
                    g = (0, o.useSelector)(u.getRecipientUserInput),
                    y = (0, o.useSelector)(u.getIsUsingMyAccountForRecipientSearch),
                    b = (0, r.useCallback)(
                      e => {
                        t((0, u.updateRecipientUserInput)(e));
                      },
                      [t]
                    ),
                    v = (0, r.useCallback)(
                      async e => {
                        t((0, u.addHistoryEntry)(`sendFlow - Valid address typed ${e}`)),
                          await t((0, u.updateRecipientUserInput)(e)),
                          n(
                            {
                              event: p.MetaMetricsEventName.sendRecipientSelected,
                              category: p.MetaMetricsEventCategory.Send,
                              properties: {
                                location: 'send page recipient input',
                                inputType: 'user input',
                              },
                            },
                            { excludeMetaMetricsId: !1 }
                          ),
                          t((0, u.updateRecipient)({ address: e, nickname: '' }));
                      },
                      [t, n]
                    ),
                    _ = (0, r.useCallback)(
                      e => {
                        t((0, u.addHistoryEntry)(`sendFlow - User pasted ${e} into address field`));
                      },
                      [t]
                    ),
                    T = (0, r.useCallback)(() => {
                      n({
                        event: 'Used QR scanner',
                        category: p.MetaMetricsEventCategory.Transactions,
                        properties: { action: 'Edit Screen', legacy_event: !0 },
                      }),
                        t((0, c.showQrScanner)());
                    }, [t, n]),
                    C = (0, r.useCallback)(() => {
                      t((0, u.resetRecipientInput)());
                    }, [t]);
                  return r.default.createElement(
                    h.SendPageRow,
                    null,
                    r.default.createElement(i.Label, { paddingBottom: 2 }, e('to')),
                    r.default.createElement(s.default, {
                      userInput: g,
                      onChange: b,
                      onValidAddressTyped: v,
                      internalSearch: y,
                      selectedAddress: a.address,
                      selectedName:
                        a.nickname === a.address
                          ? (0, f.shortenAddress)((0, m.toChecksumHexAddress)(a.address))
                          : a.nickname,
                      onPaste: _,
                      onReset: C,
                      scanQrCode: T,
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/recipient-input.tsx',
      },
    ],
    [
      6673,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../contexts/i18n': 6832,
        '../../../../../contexts/metametrics': 6836,
        '../../../../../ducks/domains': 6854,
        '../../../../../ducks/send': 6865,
        '../../../../component-library': 6402,
        '../../../../ui/tabs': 6806,
        './address-book': 6661,
        './domain-input-resolution-cell': 6662,
        './send-page-row': 6674,
        './your-accounts': 6675,
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
                  (n.SendPageRecipient = void 0);
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
                  r = e('react-redux'),
                  o = e('../../../../../contexts/i18n'),
                  i = e('../../../../../ducks/send'),
                  s = e('../../../../../ducks/domains'),
                  l = e('../../../../component-library'),
                  u = e('../../../../ui/tabs'),
                  c = e('../../../../../../shared/constants/metametrics'),
                  d = e('../../../../../contexts/metametrics'),
                  p = e('./domain-input-resolution-cell'),
                  f = e('./address-book'),
                  m = e('./send-page-row'),
                  h = e('./your-accounts');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const y = 'contacts',
                  b = 'accounts';
                n.SendPageRecipient = () => {
                  const e = (0, a.useContext)(o.I18nContext),
                    t = (0, r.useDispatch)(),
                    n = (0, a.useContext)(d.MetaMetricsContext),
                    g = (0, r.useSelector)(i.getRecipient),
                    v = (0, r.useSelector)(i.getRecipientUserInput) || '',
                    _ = (0, r.useSelector)(s.getDomainResolutions) || [],
                    T = (0, r.useSelector)(s.getDomainError),
                    C = (0, r.useSelector)(s.getDomainWarning),
                    k = T || (g.error && 'required' !== g.error),
                    w = !k && (C || g.warning),
                    E = (e, a, r = 'user input') => {
                      t(
                        (0, i.addHistoryEntry)(
                          `sendFlow - User clicked recipient from ${r}. address: ${e}, nickname ${a}`
                        )
                      ),
                        n(
                          {
                            event: c.MetaMetricsEventName.sendRecipientSelected,
                            category: c.MetaMetricsEventCategory.Send,
                            properties: { location: 'send page recipient screen', inputType: r },
                          },
                          { excludeMetaMetricsId: !1 }
                        ),
                        t((0, i.updateRecipient)({ address: e, nickname: a })),
                        t((0, i.updateRecipientUserInput)(e));
                    };
                  let x;
                  return (
                    (x = g.address
                      ? a.default.createElement(p.DomainInputResolutionCell, {
                          address: g.address,
                          domainName: g.nickname,
                          onClick: () => E(g.address, g.nickname),
                        })
                      : (null == _ ? void 0 : _.length) > 0 && !g.error
                        ? _.map(e => {
                            const {
                              resolvedAddress: t,
                              resolvingSnap: n,
                              addressBookEntryName: r,
                              protocol: o,
                              domainName: i,
                            } = e;
                            return a.default.createElement(p.DomainInputResolutionCell, {
                              key: `${t}${n}${o}`,
                              address: t,
                              domainName: r ?? i,
                              onClick: () => E(t, r ?? i, 'Domain resolution'),
                              protocol: o,
                              resolvingSnap: n,
                            });
                          })
                        : a.default.createElement(
                            u.Tabs,
                            { defaultActiveTabKey: v.length > 0 ? y : b, onTabClick: () => null },
                            a.default.createElement(
                              u.Tab,
                              { tabKey: b, name: e('yourAccounts') },
                              a.default.createElement(h.SendPageYourAccounts, null)
                            ),
                            a.default.createElement(
                              u.Tab,
                              {
                                tabKey: y,
                                name: e('contacts'),
                                'data-testid': 'send-contacts-tab',
                              },
                              a.default.createElement(f.SendPageAddressBook, null)
                            )
                          )),
                    a.default.createElement(
                      a.default.Fragment,
                      null,
                      k
                        ? a.default.createElement(
                            m.SendPageRow,
                            null,
                            a.default.createElement(
                              l.BannerAlert,
                              {
                                severity: l.BannerAlertSeverity.Danger,
                                'data-testid': 'send-recipient-error',
                              },
                              e(T ?? g.error)
                            )
                          )
                        : null,
                      w
                        ? a.default.createElement(
                            m.SendPageRow,
                            null,
                            a.default.createElement(
                              l.BannerAlert,
                              {
                                severity: l.BannerAlertSeverity.Warning,
                                'data-testid': 'send-recipient-warning',
                              },
                              e(C ?? g.warning)
                            )
                          )
                        : null,
                      a.default.createElement(
                        l.Box,
                        { className: 'multichain-send-page__recipient' },
                        x
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/send/components/recipient.tsx' },
    ],
    [
      6674,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../component-library': 6402,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SendPageRow = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../component-library'),
                  i = e('../../../../../helpers/constants/design-system');
                n.SendPageRow = ({ children: e }) =>
                  r.default.createElement(
                    o.Box,
                    {
                      display: i.Display.Flex,
                      paddingBottom: 4,
                      flexDirection: i.FlexDirection.Column,
                    },
                    e
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/send-page-row.tsx',
      },
    ],
    [
      6675,
      {
        '../../..': 6574,
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../contexts/metametrics': 6836,
        '../../../../../ducks/send': 6865,
        '../../../../../selectors': 7601,
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
                  (n.SendPageYourAccounts = void 0);
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
                  r = e('react-redux'),
                  o = e('@metamask/keyring-api'),
                  i = e('../../../../../selectors'),
                  s = e('../../..'),
                  l = e('../../../../../ducks/send'),
                  u = e('../../../../../contexts/metametrics'),
                  c = e('../../../../../../shared/constants/metametrics'),
                  d = e('./send-page-row');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = [o.EthAccountType.Eoa, o.EthAccountType.Erc4337];
                n.SendPageYourAccounts = ({ allowedAccountTypes: e = f }) => {
                  const t = (0, r.useDispatch)(),
                    n = (0, a.useContext)(u.MetaMetricsContext),
                    o = (0, r.useSelector)(i.getUpdatedAndSortedAccounts),
                    p = (0, a.useMemo)(() => o.filter(t => e.includes(t.type)), [o]),
                    m = (0, r.useSelector)(i.getSelectedInternalAccount),
                    h = (0, a.useCallback)(
                      e => {
                        t(
                          (0, l.addHistoryEntry)(
                            `sendFlow - User clicked recipient from my accounts. address: ${e.address}, nickname ${e.metadata.name}`
                          )
                        ),
                          n(
                            {
                              event: c.MetaMetricsEventName.sendRecipientSelected,
                              category: c.MetaMetricsEventCategory.Send,
                              properties: { location: 'my accounts', inputType: 'click' },
                            },
                            { excludeMetaMetricsId: !1 }
                          ),
                          t(
                            (0, l.updateRecipient)({
                              address: e.address,
                              nickname: e.metadata.name,
                            })
                          ),
                          t((0, l.updateRecipientUserInput)(e.address));
                      },
                      [t, n]
                    );
                  return a.default.createElement(
                    d.SendPageRow,
                    null,
                    p.map(e =>
                      a.default.createElement(s.AccountListItem, {
                        account: e,
                        selected: m.address === e.address,
                        key: e.address,
                        isPinned: Boolean(e.pinned),
                        shouldScrollToWhenSelected: !1,
                        onClick: h,
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/pages/send/components/your-accounts.tsx',
      },
    ],
    [
      6676,
      { './send': 6677 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SendPage', {
                    enumerable: !0,
                    get: function () {
                      return a.SendPage;
                    },
                  });
                var a = e('./send');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/send/index.js' },
    ],
    [
      6677,
      {
        '../..': 6574,
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../contexts/i18n': 6832,
        '../../../../contexts/metametrics': 6836,
        '../../../../ducks/history/history': 6857,
        '../../../../ducks/send': 6865,
        '../../../../ducks/send/helpers': 6864,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../pages/confirmations/send/send.constants': 7361,
        '../../../../pages/swaps/hooks/useUpdateSwapsState': 7546,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../../app/transaction-activity-log/transaction-activity-log.constants': 6297,
        '../../../component-library': 6402,
        '../page': 6652,
        './components': 6664,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
        'react-tippy': 5324,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SendPage = void 0);
                var a,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = x(t);
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
                  i = e('react-router-dom'),
                  s = e('react-tippy'),
                  l = e('../../../../contexts/i18n'),
                  u = e('../../../component-library'),
                  c = e('../page'),
                  d = e('../../../../ducks/send'),
                  p = e('../../../../../shared/constants/transaction'),
                  f = e('../../../../contexts/metametrics'),
                  m = e('../../../../pages/confirmations/send/send.constants'),
                  h = e('../../../../store/actions'),
                  g = e('../../../../helpers/constants/routes'),
                  y = e('../../../../../shared/constants/metametrics'),
                  b = e('../../../../ducks/history/history'),
                  v = e('../..'),
                  _ =
                    (a = e('../../../../pages/swaps/hooks/useUpdateSwapsState')) && a.__esModule
                      ? a
                      : { default: a },
                  T = e('../../../../ducks/send/helpers'),
                  C = e('../../../../selectors'),
                  k = e('../../../../helpers/constants/design-system'),
                  w = e('../../../app/transaction-activity-log/transaction-activity-log.constants'),
                  E = e('./components');
                function x(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (x = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SendPage = () => {
                  const e = (0, r.useContext)(l.I18nContext),
                    t = (0, o.useDispatch)(),
                    n = (0, r.useRef)(!1),
                    a = (0, o.useSelector)(d.getDraftTransactionExists),
                    x = (0, o.useSelector)(d.getCurrentDraftTransaction),
                    { sendAsset: M, amount: O, swapQuotesError: I } = x,
                    N = (0, o.useSelector)(d.getDraftTransactionID),
                    S = (0, o.useSelector)(b.getMostRecentOverviewPage),
                    P = (0, o.useSelector)(d.getSendStage),
                    A = (0, T.getIsDraftSwapAndSend)(x),
                    j = (0, i.useHistory)(),
                    D = (0, i.useLocation)(),
                    R = (0, r.useContext)(f.MetaMetricsContext),
                    B = (0, o.useSelector)(d.getSendAnalyticProperties),
                    [$, F] = (0, r.useState)(!1),
                    [L, U] = (0, r.useState)(undefined),
                    H = (0, r.useCallback)(
                      (e, n) => {
                        const a = e.type.toUpperCase();
                        switch (a) {
                          case p.TokenStandard.ERC20:
                          case 'TOKEN':
                            (e.type = p.AssetType.token), (e.standard = p.TokenStandard.ERC20);
                            break;
                          case p.TokenStandard.ERC721:
                            (e.type = p.AssetType.NFT),
                              (e.standard = p.TokenStandard.ERC721),
                              (e.isERC721 = !0);
                            break;
                          case p.TokenStandard.ERC1155:
                            (e.type = p.AssetType.NFT), (e.standard = p.TokenStandard.ERC1155);
                            break;
                          default:
                            if ('NATIVE' === a) break;
                            (e.type = p.AssetType.unknown), (e.standard = p.TokenStandard.none);
                        }
                        (e.image = e.image ?? e.iconUrl),
                          e.type === p.AssetType.native
                            ? t(
                                (0, d.updateSendAsset)({
                                  type: e.type,
                                  details: e,
                                  skipComputeEstimatedGasLimit: !1,
                                  isReceived: n,
                                })
                              )
                            : t(
                                (0, d.updateSendAsset)({
                                  type: e.type ?? p.AssetType.token,
                                  details: { ...e, standard: e.standard ?? p.TokenStandard.ERC20 },
                                  skipComputeEstimatedGasLimit: !1,
                                  isReceived: n,
                                })
                              ),
                          R(
                            {
                              event: y.MetaMetricsEventName.sendAssetSelected,
                              category: y.MetaMetricsEventCategory.Send,
                              properties: {
                                is_destination_asset_picker_modal: Boolean(n),
                                is_nft: !1,
                              },
                              sensitiveProperties: {
                                ...B,
                                new_asset_symbol: e.symbol,
                                new_asset_address: e.address,
                              },
                            },
                            { excludeMetaMetricsId: !1 }
                          ),
                          j.push(g.SEND_ROUTE);
                      },
                      [t, j, B, R]
                    ),
                    V = (0, r.useCallback)(
                      e => {
                        R(
                          {
                            event: y.MetaMetricsEventName.sendTokenModalOpened,
                            category: y.MetaMetricsEventCategory.Send,
                            properties: { is_destination_asset_picker_modal: Boolean(e) },
                            sensitiveProperties: { ...B },
                          },
                          { excludeMetaMetricsId: !1 }
                        );
                      },
                      [B, R]
                    ),
                    W = (0, r.useCallback)(() => {
                      t((0, d.resetSendState)()), F(!1), U(undefined);
                    }, [t]);
                  (0, r.useEffect)(() => {
                    !1 === a &&
                      !1 === n.current &&
                      ((n.current = !0),
                      t((0, d.startNewDraftTransaction)({ type: p.AssetType.native })));
                  }, [a, t]),
                    (0, r.useEffect)(() => {
                      window.addEventListener('beforeunload', W);
                    }, [W]),
                    (0, r.useEffect)(() => {
                      if ('?scan=true' === D.search) {
                        t((0, h.showQrScanner)());
                        const [e] = window.location.href.split('?');
                        window.history.pushState({}, null, `${e}`),
                          (window.location.hash = '#send');
                      }
                    }, [D, t]),
                    (0, r.useEffect)(
                      () => () => {
                        t((0, d.resetSendState)()), window.removeEventListener('beforeunload', W);
                      },
                      [t, W]
                    );
                  const q = () => {
                    N && t((0, h.cancelTx)({ id: N })),
                      t((0, d.resetSendState)()),
                      R(
                        {
                          event: y.MetaMetricsEventName.sendFlowExited,
                          category: y.MetaMetricsEventCategory.Send,
                          sensitiveProperties: { ...B },
                        },
                        { excludeMetaMetricsId: !1 }
                      );
                    const e = P === d.SEND_STAGES.EDIT ? g.DEFAULT_ROUTE : S;
                    j.push(e);
                  };
                  (0, r.useEffect)(() => {
                    I &&
                      R(
                        {
                          event: y.MetaMetricsEventName.sendSwapQuoteError,
                          category: y.MetaMetricsEventCategory.Send,
                          properties: { error: I },
                          sensitiveProperties: { ...B },
                        },
                        { excludeMetaMetricsId: !1 }
                      );
                  }, [R, I]);
                  const z = 'knownAddressRecipient' === (0, o.useSelector)(d.getRecipient).warning,
                    G = (0, o.useSelector)(d.getRecipientWarningAcknowledgement),
                    K = z && !G,
                    Y = (0, o.useSelector)(d.getSendErrors),
                    Z = (0, o.useSelector)(d.isSendFormInvalid),
                    Q = (0, o.useSelector)(C.smartTransactionsListSelector),
                    X =
                      null == Q
                        ? void 0
                        : Q.find(({ status: e }) => e === p.SmartTransactionStatus.pending),
                    J =
                      Y.gasFee === m.INSUFFICIENT_FUNDS_ERROR &&
                      Y.amount !== m.INSUFFICIENT_FUNDS_ERROR,
                    ee = Y.hexData === m.INVALID_HEX_DATA_ERROR,
                    te = (Z && !J) || K || (A && X) || ee,
                    ne = a && [d.SEND_STAGES.EDIT, d.SEND_STAGES.DRAFT].includes(P),
                    ae = (0, r.useCallback)(e => H(e, !1), [H]);
                  (0, _.default)();
                  const re = (0, r.useCallback)(
                    (e, n) => {
                      t((0, d.updateSendAmount)(e, n)), U(undefined);
                    },
                    [t]
                  );
                  let oe = '';
                  return (
                    A && (oe = e(X ? 'isSigningOrSubmitting' : 'sendSwapSubmissionWarning')),
                    r.default.createElement(
                      c.Page,
                      { className: 'multichain-send-page' },
                      r.default.createElement(
                        c.Header,
                        {
                          textProps: { variant: k.TextVariant.headingSm },
                          startAccessory: r.default.createElement(u.ButtonIcon, {
                            size: u.ButtonIconSize.Sm,
                            ariaLabel: e('back'),
                            iconName: u.IconName.ArrowLeft,
                            onClick: q,
                          }),
                        },
                        e('send')
                      ),
                      r.default.createElement(
                        c.Content,
                        null,
                        r.default.createElement(E.SendPageAccountPicker, null),
                        ne &&
                          r.default.createElement(v.AssetPickerAmount, {
                            error: L,
                            action: 'send',
                            header: e('sendSelectSendAsset'),
                            asset: M,
                            amount: O,
                            onAssetChange: ae,
                            onAmountChange: re,
                            onClick: () => V(!1),
                          }),
                        r.default.createElement(
                          u.Box,
                          { marginTop: 6 },
                          r.default.createElement(E.SendPageRecipientInput, null),
                          ne
                            ? r.default.createElement(E.SendPageRecipientContent, {
                                requireContractAddressAcknowledgement: K,
                                onAssetChange: H,
                                onClick: () => V(!0),
                              })
                            : r.default.createElement(E.SendPageRecipient, null)
                        )
                      ),
                      r.default.createElement(
                        c.Footer,
                        null,
                        r.default.createElement(
                          u.ButtonSecondary,
                          {
                            className: 'multichain-send-page__nav-button',
                            onClick: q,
                            size: u.ButtonSecondarySize.Lg,
                            block: !0,
                          },
                          P === d.SEND_STAGES.EDIT ? e('reject') : e('cancel')
                        ),
                        r.default.createElement(
                          s.Tooltip,
                          {
                            key: oe,
                            className: 'multichain-send-page__nav-button',
                            title: oe,
                            disabled: !A,
                            arrow: !0,
                            hideOnClick: !1,
                            style: { display: 'inline-flex' },
                          },
                          r.default.createElement(
                            u.ButtonPrimary,
                            {
                              onClick: async e => {
                                e.preventDefault(), F(!0), U(undefined);
                                try {
                                  await t((0, d.signTransaction)(j)),
                                    R({
                                      category: y.MetaMetricsEventCategory.Transactions,
                                      event: 'Complete',
                                      properties: {
                                        ...B,
                                        action: A ? 'Submit Immediately' : 'Edit Screen',
                                        legacy_event: !0,
                                      },
                                    });
                                } catch {
                                  U(w.TRANSACTION_ERRORED_EVENT);
                                } finally {
                                  $ && F(!1);
                                }
                              },
                              loading: $,
                              size: u.ButtonPrimarySize.Lg,
                              disabled: te || $,
                              block: !0,
                            },
                            e(A ? 'confirm' : 'continue')
                          )
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/pages/send/send.js' },
    ],
    [
      6678,
      { './permission-details-modal': 6679 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'PermissionDetailsModal', {
                    enumerable: !0,
                    get: function () {
                      return a.PermissionDetailsModal;
                    },
                  });
                var a = e('./permission-details-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/permission-details-modal/index.ts' },
    ],
    [
      6679,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/permission': 6912,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../app/permission-cell': 6119,
        '../../component-library': 6402,
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
                  (n.PermissionDetailsModal = void 0);
                var a = f(e('react')),
                  r = e('lodash'),
                  o = e('react-redux'),
                  i = e('../../component-library'),
                  s = e('../../../selectors'),
                  l = e('../../../helpers/utils/util'),
                  u = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/utils/permission'),
                  d = f(e('../../app/permission-cell')),
                  p = e('../../../helpers/constants/design-system');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.PermissionDetailsModal = ({
                  onClose: e,
                  onClick: t,
                  isOpen: n,
                  account: f,
                  permissions: m,
                }) => {
                  const h = (0, u.useI18nContext)(),
                    g = (0, o.useSelector)(s.getUseBlockie),
                    y = (0, r.flatten)(
                      m.map(({ key: e, value: t }) =>
                        (0, c.getPermissionDescription)({
                          t: h,
                          permissionName: e,
                          permissionValue: t,
                          subjectName: '',
                          getSubjectName: () => '',
                        })
                      )
                    );
                  return a.default.createElement(
                    i.Modal,
                    { isOpen: n, 'data-testid': 'permission-details-modal', onClose: e },
                    a.default.createElement(i.ModalOverlay, null),
                    a.default.createElement(
                      i.ModalContent,
                      null,
                      a.default.createElement(
                        i.ModalHeader,
                        { onClose: e },
                        a.default.createElement(
                          i.Box,
                          {
                            display: p.Display.Flex,
                            alignItems: p.AlignItems.center,
                            justifyContent: p.JustifyContent.center,
                            gap: 2,
                          },
                          a.default.createElement(i.AvatarAccount, {
                            size: i.AvatarAccountSize.Sm,
                            address: f.address,
                            variant: g
                              ? i.AvatarAccountVariant.Blockies
                              : i.AvatarAccountVariant.Jazzicon,
                          }),
                          a.default.createElement(
                            i.Text,
                            { variant: p.TextVariant.headingSm },
                            f.metadata.name ? f.metadata.name : (0, l.shortenAddress)(f.address)
                          )
                        )
                      ),
                      a.default.createElement(
                        i.ModalBody,
                        null,
                        y.map((e, t) =>
                          a.default.createElement(d.default, {
                            permissionName: e.permissionName,
                            title: e.label,
                            description: e.description,
                            weight: e.weight,
                            avatarIcon: e.leftIcon,
                            dateApproved: (null == e ? void 0 : e.permissionValue).date,
                            key: `${e.permissionName}-${t}`,
                          })
                        )
                      ),
                      a.default.createElement(
                        i.ModalFooter,
                        null,
                        a.default.createElement(
                          i.Button,
                          {
                            startIconName: i.IconName.Logout,
                            variant: i.ButtonVariant.Secondary,
                            onClick: t,
                            size: i.ButtonSize.Lg,
                            danger: !0,
                            block: !0,
                            'data-testid': 'disconnect',
                          },
                          h('disconnect')
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
        file: 'ui/components/multichain/permission-details-modal/permission-details-modal.tsx',
      },
    ],
    [
      6680,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
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
                  (n.PermissionsHeader = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-router-dom'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library'),
                  l = e('../pages/page'),
                  u = e('../../../helpers/utils/util'),
                  c = e('../../../hooks/useI18nContext');
                n.PermissionsHeader = ({ securedOrigin: e, connectedSubjectsMetadata: t }) => {
                  const n = (0, c.useI18nContext)(),
                    a = (0, o.useHistory)();
                  return r.default.createElement(
                    l.Header,
                    {
                      backgroundColor: i.BackgroundColor.backgroundDefault,
                      startAccessory: r.default.createElement(s.ButtonIcon, {
                        ariaLabel: n('back'),
                        iconName: s.IconName.ArrowLeft,
                        className: 'connections-header__start-accessory',
                        color: i.IconColor.iconDefault,
                        onClick: () => a.goBack(),
                        size: s.ButtonIconSize.Sm,
                      }),
                    },
                    r.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        alignItems: i.AlignItems.center,
                        gap: 2,
                        justifyContent: i.JustifyContent.center,
                        className: 'connections-header__title',
                      },
                      null != t && t.iconUrl
                        ? r.default.createElement(s.AvatarFavicon, {
                            name: t.name,
                            size: s.AvatarFaviconSize.Sm,
                            src: t.iconUrl,
                          })
                        : r.default.createElement(s.Icon, {
                            name: s.IconName.Global,
                            size: s.IconSize.Sm,
                            color: i.IconColor.iconDefault,
                          }),
                      r.default.createElement(
                        s.Text,
                        {
                          as: 'span',
                          variant: i.TextVariant.headingMd,
                          textAlign: i.TextAlign.Center,
                          ellipsis: !0,
                        },
                        (0, u.getURLHost)(e)
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/permissions-header/permissions-header.tsx',
      },
    ],
    [
      6681,
      { './product-tour-popover': 6682 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ProductTour', {
                    enumerable: !0,
                    get: function () {
                      return a.ProductTour;
                    },
                  });
                var a = e('./product-tour-popover');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/product-tour-popover/index.js' },
    ],
    [
      6682,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ProductTour = void 0);
                var a = c(e('react')),
                  r = c(e('classnames')),
                  o = c(e('prop-types')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library'),
                  l = e('../../../hooks/useI18nContext'),
                  u = e('../../ui/menu');
                function c(e) {
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
                  className: e,
                  prevIcon: t,
                  title: n,
                  description: o,
                  currentStep: c,
                  totalSteps: p,
                  positionObj: f = '5%',
                  closeMenu: m,
                  anchorElement: h,
                  onClick: g,
                  prevClick: y,
                  productTourDirection: b,
                  ...v
                }) => {
                  const _ = (0, l.useI18nContext)();
                  return a.default.createElement(
                    u.Menu,
                    d(
                      {
                        className: (0, r.default)(
                          'multichain-product-tour-menu',
                          { 'multichain-product-tour-menu--rtl': 'rtl' === b },
                          e
                        ),
                        anchorElement: h,
                        onHide: m,
                        'data-testid': 'multichain-product-tour-menu-popover',
                      },
                      v
                    ),
                    a.default.createElement(
                      s.Box,
                      {
                        className: 'multichain-product-tour-menu__container',
                        backgroundColor: i.BackgroundColor.infoDefault,
                        borderRadius: i.BorderRadius.LG,
                        padding: 4,
                      },
                      a.default.createElement(s.Box, {
                        borderWidth: 1,
                        className: 'multichain-product-tour-menu__arrow',
                        display: i.Display.Flex,
                        justifyContent: i.JustifyContent.center,
                        alignItems: i.AlignItems.center,
                        style: { right: f },
                      }),
                      a.default.createElement(
                        s.Box,
                        {
                          display: i.Display.Flex,
                          alignItems: i.AlignItems.center,
                          className: 'multichain-product-tour-menu__header',
                        },
                        t
                          ? a.default.createElement(s.ButtonIcon, {
                              iconName: s.IconName.ArrowLeft,
                              size: i.Size.SM,
                              color: i.IconColor.infoInverse,
                              onClick: y,
                              className: 'multichain-product-tour-menu__previous-icon',
                              'data-testid': 'multichain-product-tour-menu-popover-prevIcon',
                            })
                          : null,
                        a.default.createElement(
                          s.Text,
                          {
                            textAlign: i.TextAlign.Center,
                            variant: i.TextVariant.headingSm,
                            width: i.BlockSize.Full,
                            color: i.TextColor.infoInverse,
                          },
                          n
                        )
                      ),
                      a.default.createElement(
                        s.Text,
                        {
                          paddingBottom: 2,
                          paddingTop: 2,
                          color: i.TextColor.infoInverse,
                          variant: i.TextVariant.bodyMd,
                        },
                        o
                      ),
                      a.default.createElement(
                        s.Box,
                        {
                          display: i.Display.Flex,
                          alignItems: i.AlignItems.center,
                          justifyContent: i.JustifyContent.spaceBetween,
                        },
                        a.default.createElement(
                          s.Text,
                          {
                            paddingBottom: 2,
                            paddingTop: 2,
                            color: i.TextColor.infoInverse,
                            variant: i.TextVariant.bodyMd,
                            'data-testid': 'multichain-product-tour-menu-popover-step-counter',
                          },
                          c && p ? `${c} / ${p}` : null
                        ),
                        a.default.createElement(
                          s.ButtonBase,
                          {
                            backgroundColor: i.BackgroundColor.primaryInverse,
                            color: i.TextColor.primaryDefault,
                            className: 'multichain-product-tour-menu__button',
                            onClick: g,
                          },
                          _('recoveryPhraseReminderConfirm')
                        )
                      )
                    )
                  );
                };
                (n.ProductTour = p),
                  (p.propTypes = {
                    anchorElement: o.default.instanceOf(window.Element),
                    closeMenu: o.default.func.isRequired,
                    className: o.default.string,
                    prevIcon: o.default.bool,
                    title: o.default.string,
                    description: o.default.string,
                    currentStep: o.default.string,
                    totalSteps: o.default.string,
                    positionObj: o.default.string,
                    onClick: o.default.func,
                    prevClick: o.default.func,
                    productTourDirection: o.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/product-tour-popover/product-tour-popover.js',
      },
    ],
    [
      6683,
      { './ramps-card': 6684 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'RampsCard', {
                    enumerable: !0,
                    get: function () {
                      return a.RampsCard;
                    },
                  });
                var a = e('./ramps-card');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/ramps-card/index.js' },
    ],
    [
      6684,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/locale/locale': 6859,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/multichain': 7605,
        '../../../store/background-connection': 7620,
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
                  (n.RampsCard = n.RAMPS_CARD_VARIANT_TYPES = n.RAMPS_CARD_VARIANTS = void 0);
                var a = v(e('react')),
                  r = y(e('prop-types')),
                  o = e('react-redux'),
                  i = y(e('classnames')),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  u = e('../../../hooks/useI18nContext'),
                  c = e('../../../selectors/multichain'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../../contexts/metametrics'),
                  f = v(e('../../../hooks/ramps/useRamps/useRamps')),
                  m = e('../../../../shared/constants/app'),
                  h = e('../../../ducks/locale/locale'),
                  g = e('../../../store/background-connection');
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
                function v(e, t) {
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
                }
                const _ = (n.RAMPS_CARD_VARIANT_TYPES = {
                    TOKEN: 'token',
                    ACTIVITY: 'activity',
                    BTC: 'btc',
                  }),
                  T = (n.RAMPS_CARD_VARIANTS = {
                    [_.TOKEN]: {
                      illustrationSrc: './images/ramps-card-token-illustration.png',
                      gradient:
                        'linear-gradient(90deg, #0189EC 0%, #4B7AED 35%, #6774EE 58%, #706AF4 80.5%, #7C5BFC 100%)',
                      title: 'tipsForUsingAWallet',
                      body: 'tipsForUsingAWalletDescription',
                    },
                    [_.ACTIVITY]: {
                      illustrationSrc: './images/ramps-card-activity-illustration.png',
                      gradient: 'linear-gradient(90deg, #57C5DC 0%, #06BFDD 49.39%, #35A9C7 100%)',
                      title: 'tipsForUsingAWallet',
                      body: 'tipsForUsingAWalletDescription',
                    },
                    [_.BTC]: {
                      illustrationSrc: './images/ramps-card-btc-illustration.png',
                      gradient:
                        'linear-gradient(90deg, #017ED9 0%, #446FD9 35%, #5E6AD9 58%, #635ED9 80.5%, #6855D9 92.5%, #6A4FD9 100%)',
                      title: 'tipsForUsingAWallet',
                      body: 'tipsForUsingAWalletDescription',
                    },
                  }),
                  C = {
                    [_.TOKEN]: f.RampsMetaMaskEntry.TokensBanner,
                    [_.ACTIVITY]: f.RampsMetaMaskEntry.ActivityBanner,
                    [_.BTC]: f.RampsMetaMaskEntry.BtcBanner,
                  },
                  k = ({ variant: e, handleOnClick: t }) => {
                    const n = (0, u.useI18nContext)(),
                      { gradient: r, illustrationSrc: y, title: b, body: v } = T[e],
                      { openBuyCryptoInPdapp: _ } = (0, f.default)(C[e]),
                      k = (0, a.useContext)(p.MetaMetricsContext),
                      w = (0, o.useSelector)(h.getCurrentLocale),
                      { chainId: E, nickname: x } = (0, o.useSelector)(
                        c.getMultichainCurrentNetwork
                      ),
                      { symbol: M } = (0, o.useSelector)(c.getMultichainDefaultToken),
                      O = (0, o.useSelector)(e => e.metamask.isRampCardClosed);
                    (0, a.useEffect)(() => {
                      k({
                        event: d.MetaMetricsEventName.EmptyBuyBannerDisplayed,
                        category: d.MetaMetricsEventCategory.Navigation,
                        properties: {
                          chain_id: E,
                          locale: w,
                          network: x,
                          referrer: m.ORIGIN_METAMASK,
                        },
                      });
                    }, [w, E, x, k]);
                    const I = (0, a.useCallback)(() => {
                        _(E),
                          k({
                            event: d.MetaMetricsEventName.NavBuyButtonClicked,
                            category: d.MetaMetricsEventCategory.Navigation,
                            properties: {
                              location: `${e} tab`,
                              text: 'Token Marketplace',
                              chain_id: E,
                              token_symbol: M,
                            },
                          });
                      }, [E, _, M, k, e]),
                      N = (0, a.useCallback)(() => {
                        var t;
                        k({
                          event: d.MetaMetricsEventName.EmptyBuyBannerClosed,
                          category: d.MetaMetricsEventCategory.Navigation,
                          properties: { location: `${e} tab`, chain_id: E, token_symbol: M },
                        }),
                          null === (t = (0, g.submitRequestToBackground)('setRampCardClosed')) ||
                            void 0 === t ||
                            t.catch(e => {
                              console.error(
                                'Error caught in setRampCardClosed submitRequestToBackground',
                                e
                              );
                            });
                      }, [E, M, k, e]);
                    return O
                      ? null
                      : a.default.createElement(
                          s.Box,
                          {
                            className: (0, i.default)('ramps-card', `ramps-card-${e}`),
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                            gap: 2,
                            borderRadius: l.BorderRadius.LG,
                            margin: 2,
                            style: {
                              background: `url(${y}) no-repeat right bottom / contain,\n            linear-gradient(rgba(0, 0, 0, 0.12),rgba(0, 0, 0, 0.12)), ${r}`,
                            },
                          },
                          a.default.createElement(
                            s.Box,
                            {
                              display: l.Display.Flex,
                              justifyContent: l.JustifyContent.spaceBetween,
                            },
                            a.default.createElement(
                              s.Text,
                              { className: 'ramps-card__title', variant: l.TextVariant.headingSm },
                              n(b)
                            ),
                            a.default.createElement(s.ButtonIcon, {
                              'data-testid': 'ramp-card-close-btn',
                              color: l.IconColor.infoInverse,
                              iconName: s.IconName.Close,
                              size: s.ButtonIconSize.Sm,
                              ariaLabel: n('close'),
                              onClick: N,
                            })
                          ),
                          a.default.createElement(s.Text, { className: 'ramps-card__body' }, n(v)),
                          a.default.createElement(
                            s.ButtonBase,
                            { className: 'ramps-card__cta-button', onClick: t ?? I },
                            n('tokenMarketplace')
                          )
                        );
                  };
                (n.RampsCard = k),
                  (k.propTypes = {
                    variant: r.default.oneOf(Object.values(_)),
                    handleOnClick: r.default.func,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/ramps-card/ramps-card.js' },
    ],
    [
      6685,
      { './receive-modal': 6686 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ReceiveModal', {
                    enumerable: !0,
                    get: function () {
                      return a.ReceiveModal;
                    },
                  });
                var a = e('./receive-modal');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/receive-modal/index.js' },
    ],
    [
      6686,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/qr-code-view': 6793,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ReceiveModal = void 0);
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
                  r = e('react-redux'),
                  o = d(e('prop-types')),
                  i = e('../../component-library'),
                  s = d(e('../../ui/qr-code-view')),
                  l = e('../../../hooks/useI18nContext'),
                  u = e('../../../selectors'),
                  c = e('../../../helpers/constants/design-system');
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
                const f = ({ address: e, onClose: t }) => {
                  const n = (0, l.useI18nContext)(),
                    {
                      metadata: { name: o },
                    } = (0, r.useSelector)(t => (0, u.getInternalAccountByAddress)(t, e)),
                    d = (0, a.useMemo)(() => ({ data: e }), [e]);
                  return a.default.createElement(
                    i.Modal,
                    { isOpen: !0, onClose: t },
                    a.default.createElement(i.ModalOverlay, null),
                    a.default.createElement(
                      i.ModalContent,
                      null,
                      a.default.createElement(
                        i.ModalHeader,
                        { marginBottom: 4, onClose: t },
                        n('receive')
                      ),
                      a.default.createElement(
                        i.Box,
                        {
                          display: c.Display.Flex,
                          alignItems: c.AlignItems.center,
                          flexDirection: c.FlexDirection.Column,
                          paddingInlineEnd: 4,
                          paddingInlineStart: 4,
                        },
                        a.default.createElement(s.default, { Qr: d, accountName: o })
                      )
                    )
                  );
                };
                (n.ReceiveModal = f),
                  (f.propTypes = {
                    address: o.default.string.isRequired,
                    onClose: o.default.func.isRequired,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/receive-modal/receive-modal.js' },
    ],
    [
      6687,
      { './toast': 6688 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Toast', {
                    enumerable: !0,
                    get: function () {
                      return a.Toast;
                    },
                  }),
                  Object.defineProperty(n, 'ToastContainer', {
                    enumerable: !0,
                    get: function () {
                      return a.ToastContainer;
                    },
                  });
                var a = e('./toast');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/toast/index.ts' },
    ],
    [
      6688,
      {
        '../../../../shared/constants/preferences': 5809,
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
                  (n.ToastContainer = n.Toast = void 0);
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
                  r = e('../../../../shared/constants/preferences'),
                  o = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.ToastContainer = ({ children: e }) =>
                  a.default.createElement(o.Box, { className: 'toasts-container' }, e);
                n.Toast = ({
                  startAdornment: e,
                  text: t,
                  actionText: n,
                  onActionClick: s,
                  onClose: l,
                  borderRadius: u,
                  textVariant: c,
                  autoHideTime: d,
                  onAutoHideToast: p,
                  dataTestId: f,
                  className: m,
                }) => {
                  const { theme: h } = document.documentElement.dataset,
                    [g, y] = (0, a.useState)(!0);
                  return (
                    (0, a.useEffect)(
                      function () {
                        if (!d || 0 === d) return undefined;
                        const e = setTimeout(() => {
                          y(!1), null == p || p();
                        }, d);
                        return function () {
                          clearTimeout(e);
                        };
                      },
                      [d]
                    ),
                    g
                      ? a.default.createElement(
                          o.BannerBase,
                          {
                            'data-theme':
                              h === r.ThemeType.light ? r.ThemeType.dark : r.ThemeType.light,
                            onClose: l,
                            borderRadius: u,
                            'data-testid': f ? `${f}-banner-base` : undefined,
                            className: `toasts-container__banner-base ${m}`,
                          },
                          a.default.createElement(
                            o.Box,
                            { display: i.Display.Flex, gap: 4, 'data-testid': f },
                            e,
                            a.default.createElement(
                              o.Box,
                              null,
                              a.default.createElement(
                                o.Text,
                                { className: 'toast-text', variant: c },
                                t
                              ),
                              n && s
                                ? a.default.createElement(o.ButtonLink, { onClick: s }, n)
                                : null
                            )
                          )
                        )
                      : null
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/toast/toast.tsx' },
    ],
    [
      6689,
      { './token-list-item': 6694 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'TokenListItem', {
                    enumerable: !0,
                    get: function () {
                      return a.TokenListItem;
                    },
                  });
                var a = e('./token-list-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/token-list-item/index.ts' },
    ],
    [
      6690,
      {
        '../../../../../../app/scripts/lib/util': 204,
        '../../../../../../shared/constants/common': 5791,
        '../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../ducks/locale/locale': 6859,
        '../../../../../ducks/metamask/metamask': 6860,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../selectors': 7601,
        '../../../../component-library': 6402,
        '@metamask/assets-controllers': 1353,
        'bignumber.js': 4030,
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
                  (n.renderPercentageWithNumber = n.PercentageAndAmountChange = void 0);
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
                  o = e('bignumber.js'),
                  i = e('ethereumjs-util'),
                  s = e('@metamask/assets-controllers'),
                  l = e('../../../../component-library'),
                  u = e('../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../shared/modules/selectors/networks'),
                  d = e('../../../../../selectors'),
                  p = e('../../../../../ducks/locale/locale'),
                  f = e('../../../../../../shared/constants/common'),
                  m = e('../../../../../../shared/modules/Numeric'),
                  h = e('../../../../../ducks/metamask/metamask'),
                  g = e('../../../../../../app/scripts/lib/util');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const b = (e, t, n) =>
                  a.default.createElement(
                    l.Box,
                    { display: u.Display.Flex },
                    a.default.createElement(
                      l.Text,
                      {
                        variant: u.TextVariant.bodyMdMedium,
                        color: n,
                        'data-testid': 'token-increase-decrease-value',
                        style: { whiteSpace: 'pre' },
                        ellipsis: !0,
                      },
                      t
                    ),
                    a.default.createElement(
                      l.Text,
                      {
                        variant: u.TextVariant.bodyMdMedium,
                        color: n,
                        'data-testid': 'token-increase-decrease-percentage',
                        ellipsis: !0,
                      },
                      e
                    )
                  );
                n.renderPercentageWithNumber = b;
                n.PercentageAndAmountChange = ({ value: e }) => {
                  const t = (0, r.useSelector)(h.getCurrentCurrency),
                    n = (0, r.useSelector)(p.getIntlLocale),
                    l = (0, r.useSelector)(d.getSelectedAccountCachedBalance),
                    y = (0, r.useSelector)(h.getConversionRate),
                    v = (0, r.useSelector)(h.getNativeCurrency),
                    _ = (0, r.useSelector)(d.getTokensMarketData),
                    T = (0, r.useSelector)(c.getCurrentChainId),
                    C = (0, a.useMemo)(() => {
                      var e;
                      const n =
                        null == _ ||
                        null === (e = _[(0, s.getNativeTokenAddress)(T)]) ||
                        void 0 === e
                          ? void 0
                          : e.pricePercentChange1d;
                      if ((0, i.isHexString)(l)) {
                        let e = new m.Numeric(l, 16, f.EtherDenomination.WEI);
                        return (
                          v !== t && (e = e.applyConversionRate(y)),
                          e.isZero()
                            ? 0
                            : n
                              ? e
                                  .toBase(10)
                                  .toDenomination(f.EtherDenomination.ETH)
                                  .round(2, o.BigNumber.ROUND_HALF_DOWN)
                                  .times(n, 10)
                                  .divide(100, 10)
                                  .toNumber()
                              : null
                        );
                      }
                      return null;
                    }, [_]);
                  let k = u.TextColor.textDefault;
                  (0, g.isValidAmount)(C) &&
                    (k =
                      0 === C
                        ? u.TextColor.textDefault
                        : C > 0
                          ? u.TextColor.successDefault
                          : u.TextColor.errorDefault);
                  const w = (0, g.formatValue)(0 === C ? 0 : e, !0);
                  let E = '';
                  if ((0, g.isValidAmount)(C)) {
                    E = C >= 0 ? '+' : '';
                    const e = {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 2,
                    };
                    try {
                      E += `${Intl.NumberFormat(n, { ...e, style: 'currency', currency: t }).format(C)} `;
                    } catch {
                      E += `${Intl.NumberFormat(n, { ...e, minimumFractionDigits: 2, style: 'decimal' }).format(C)} `;
                    }
                  }
                  return b(w, E, k);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/token-list-item/price/percentage-and-amount-change/percentage-and-amount-change.tsx',
      },
    ],
    [
      6691,
      { './percentage-change': 6692 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'PercentageChange', {
                    enumerable: !0,
                    get: function () {
                      return a.PercentageChange;
                    },
                  });
                var a = e('./percentage-change');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/token-list-item/price/percentage-change/index.ts',
      },
    ],
    [
      6692,
      {
        '../../../../../../app/scripts/lib/util': 204,
        '../../../../../helpers/constants/design-system': 6872,
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
                  (n.default = n.PercentageChange = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../component-library'),
                  i = e('../../../../../helpers/constants/design-system'),
                  s = e('../../../../../../app/scripts/lib/util');
                const l = ({ value: e, address: t }) => {
                  let n = i.TextColor.textDefault;
                  (0, s.isValidAmount)(e) &&
                    (n =
                      0 === e
                        ? i.TextColor.textDefault
                        : e > 0
                          ? i.TextColor.successDefault
                          : i.TextColor.errorDefault);
                  const a = (0, s.formatValue)(e, !1);
                  return r.default.createElement(
                    o.Box,
                    { display: i.Display.Flex },
                    r.default.createElement(
                      o.Text,
                      {
                        variant: i.TextVariant.bodySmMedium,
                        color: n,
                        'data-testid': `token-increase-decrease-percentage-${t}`,
                        ellipsis: !0,
                      },
                      a
                    )
                  );
                };
                n.PercentageChange = l;
                n.default = l;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/token-list-item/price/percentage-change/percentage-change.tsx',
      },
    ],
    [
      6693,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/portfolio': 6914,
        '../../../hooks/useI18nContext': 6985,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.StakeableLink = void 0);
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
                  r = e('react-redux'),
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../../component-library'),
                  s = e('../../../../shared/constants/metametrics'),
                  l = e('../../../helpers/utils/portfolio'),
                  u = e('../../../selectors'),
                  c = e('../../../contexts/metametrics'),
                  d = e('../../../hooks/useI18nContext');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.StakeableLink = ({ chainId: e, symbol: t }) => {
                  const n = (0, d.useI18nContext)(),
                    p = (0, a.useContext)(c.MetaMetricsContext),
                    f = (0, r.useSelector)(u.getMetaMetricsId),
                    m = (0, r.useSelector)(u.getParticipateInMetaMetrics),
                    h = (0, r.useSelector)(u.getDataCollectionForMarketing);
                  return a.default.createElement(
                    i.Box,
                    {
                      as: 'button',
                      backgroundColor: o.BackgroundColor.transparent,
                      'data-testid': `staking-entrypoint-${e}`,
                      gap: 1,
                      paddingInline: 0,
                      paddingInlineStart: 1,
                      paddingInlineEnd: 1,
                      tabIndex: 0,
                      onClick: n => {
                        n.preventDefault(), n.stopPropagation();
                        const a = (0, l.getPortfolioUrl)('stake', 'ext_stake_button', f, m, h);
                        global.platform.openTab({ url: a }),
                          p({
                            event: s.MetaMetricsEventName.StakingEntryPointClicked,
                            category: s.MetaMetricsEventCategory.Tokens,
                            properties: {
                              location: 'Token List Item',
                              text: 'Stake',
                              chain_id: e,
                              token_symbol: t,
                            },
                          });
                      },
                    },
                    a.default.createElement(i.Text, { as: 'span' }, '•'),
                    a.default.createElement(
                      i.Text,
                      {
                        as: 'span',
                        color: o.TextColor.primaryDefault,
                        paddingInlineStart: 1,
                        paddingInlineEnd: 1,
                        fontWeight: o.FontWeight.Medium,
                      },
                      n('stake')
                    ),
                    a.default.createElement(i.Icon, {
                      name: i.IconName.Stake,
                      size: i.IconSize.Sm,
                      color: o.IconColor.primaryDefault,
                    })
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/token-list-item/stakeable-link.tsx' },
    ],
    [
      6694,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../pages/settings/networks-tab/networks-form/use-safe-chains': 7495,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/tooltip': 6818,
        './price/percentage-change/percentage-change': 6692,
        './stakeable-link': 6693,
        '@metamask/assets-controllers': 1353,
        '@metamask/utils': 2995,
        classnames: 4168,
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
                  (n.TokenListItemComponent = n.TokenListItem = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = M(t);
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
                  i = x(e('classnames')),
                  s = e('@metamask/assets-controllers'),
                  l = e('@metamask/utils'),
                  u = e('../../../helpers/constants/design-system'),
                  c = e('../../component-library'),
                  d = e('../../../selectors'),
                  p = e('../../../selectors/multichain'),
                  f = x(e('../../ui/tooltip')),
                  m = e('../../../hooks/useI18nContext'),
                  h = e('../../../contexts/metametrics'),
                  g = e('../../../../shared/constants/metametrics'),
                  y = e('../../../../shared/constants/network'),
                  b = e('../../../../shared/modules/conversion.utils'),
                  v = e('../../../helpers/constants/routes'),
                  _ = e('../../../store/actions'),
                  T = e('../../../pages/settings/networks-tab/networks-form/use-safe-chains'),
                  C = e('../../../../shared/constants/bridge'),
                  k = e('../../../../shared/modules/selectors/networks'),
                  w = e('./price/percentage-change/percentage-change'),
                  E = e('./stakeable-link');
                function x(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function M(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (M = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function O() {
                  return (
                    (O = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    O.apply(null, arguments)
                  );
                }
                const I = ({
                  className: e,
                  onClick: t,
                  tokenSymbol: n,
                  tokenImage: x,
                  primary: M,
                  secondary: I,
                  title: N,
                  tooltipText: S,
                  tokenChainImage: P,
                  chainId: A,
                  isPrimaryTokenSymbolHidden: j = !1,
                  isNativeCurrency: D = !1,
                  isStakeable: R = !1,
                  isTitleNetworkName: B = !1,
                  isTitleHidden: $ = !1,
                  address: F = null,
                  showPercentage: L = !1,
                  privacyMode: U = !1,
                }) => {
                  var H, V, W, q;
                  const z = (0, m.useI18nContext)(),
                    G = (0, r.useSelector)(p.getMultichainIsEvm),
                    K = (0, a.useContext)(h.MetaMetricsContext),
                    { safeChains: Y } = (0, T.useSafeChains)(),
                    Z = (0, r.useSelector)(d.getCurrencyRates),
                    Q =
                      null == Y
                        ? void 0
                        : Y.find(e => {
                            const t =
                              (0, l.isStrictHexString)(A) && parseInt((0, b.hexToDecimal)(A), 10);
                            return 'number' == typeof t ? e.chainId === t.toString() : undefined;
                          }),
                    X = G && L,
                    J = n && Z[n],
                    ee = D && !J && X,
                    te = (0, r.useDispatch)(),
                    [ne, ae] = (0, a.useState)(!1),
                    re = (0, o.useHistory)(),
                    oe = (0, r.useSelector)(d.getMarketData),
                    ie = F
                      ? null == oe ||
                        null === (H = oe[A]) ||
                        void 0 === H ||
                        null === (H = H[F]) ||
                        void 0 === H
                        ? void 0
                        : H.pricePercentChange1d
                      : null,
                    se = (() => {
                      if (B) return C.NETWORK_TO_SHORT_NETWORK_NAME_MAP[A];
                      if ($) return undefined;
                      switch (N) {
                        case y.CURRENCY_SYMBOLS.ETH:
                          return z('networkNameEthereum');
                        case y.NON_EVM_CURRENCY_SYMBOLS.BTC:
                          return z('networkNameBitcoin');
                        case y.NON_EVM_CURRENCY_SYMBOLS.SOL:
                          return z('networkNameSolana');
                        default:
                          return N;
                      }
                    })(),
                    le = X && !B ? se : n,
                    ue = (0, r.useSelector)(k.getNetworkConfigurationsByChainId);
                  return a.default.createElement(
                    c.Box,
                    {
                      className: (0, i.default)('multichain-token-list-item', e || {}),
                      display: u.Display.Flex,
                      flexDirection: u.FlexDirection.Row,
                      width: u.BlockSize.Full,
                      height: u.BlockSize.Full,
                      gap: 4,
                      'data-testid': 'multichain-token-list-item',
                      title: S ? z(S) : undefined,
                    },
                    a.default.createElement(
                      c.Box,
                      O(
                        {
                          className: (0, i.default)('multichain-token-list-item__container-cell', {
                            'multichain-token-list-item__container-cell--clickable':
                              t !== undefined,
                          }),
                          display: u.Display.Flex,
                          flexDirection: u.FlexDirection.Row,
                          paddingTop: 2,
                          paddingBottom: 2,
                          paddingLeft: 4,
                          paddingRight: 4,
                          width: u.BlockSize.Full,
                          style: { height: 62 },
                          'data-testid': 'multichain-token-list-button',
                        },
                        t && {
                          as: 'a',
                          href: '#',
                          onClick: e => {
                            e.preventDefault(),
                              ne ||
                                (t(),
                                K({
                                  category: g.MetaMetricsEventCategory.Tokens,
                                  event: g.MetaMetricsEventName.TokenDetailsOpened,
                                  properties: { location: 'Home', chain_id: A, token_symbol: n },
                                }));
                          },
                        }
                      ),
                      a.default.createElement(
                        c.BadgeWrapper,
                        {
                          badge: a.default.createElement(c.AvatarNetwork, {
                            size: c.AvatarNetworkSize.Xs,
                            name:
                              null == ue || null === (V = ue[A]) || void 0 === V ? void 0 : V.name,
                            src: P || undefined,
                            backgroundColor: u.BackgroundColor.backgroundDefault,
                            borderWidth: 2,
                            className: 'multichain-token-list-item__badge__avatar-network',
                          }),
                          marginRight: 4,
                          className: 'multichain-token-list-item__badge',
                        },
                        a.default.createElement(c.AvatarToken, { name: n, src: x })
                      ),
                      a.default.createElement(
                        c.Box,
                        {
                          className: 'multichain-token-list-item__container-cell--text-container',
                          display: u.Display.Flex,
                          flexDirection: u.FlexDirection.Column,
                          width: u.BlockSize.Full,
                          style: { flexGrow: 1, overflow: 'hidden' },
                          justifyContent: u.JustifyContent.center,
                        },
                        a.default.createElement(
                          c.Box,
                          {
                            display: u.Display.Flex,
                            flexDirection: u.FlexDirection.Row,
                            justifyContent: u.JustifyContent.spaceBetween,
                          },
                          (null == N ? void 0 : N.length) > 12
                            ? a.default.createElement(
                                f.default,
                                {
                                  position: 'bottom',
                                  html: N,
                                  tooltipInnerClassName: 'multichain-token-list-item__tooltip',
                                },
                                a.default.createElement(
                                  c.Text,
                                  {
                                    as: 'span',
                                    fontWeight: u.FontWeight.Medium,
                                    variant: u.TextVariant.bodyMd,
                                    display: u.Display.Block,
                                    ellipsis: !0,
                                  },
                                  le,
                                  R &&
                                    a.default.createElement(E.StakeableLink, {
                                      chainId: A,
                                      symbol: n,
                                    })
                                )
                              )
                            : a.default.createElement(
                                c.Text,
                                {
                                  fontWeight: u.FontWeight.Medium,
                                  variant: u.TextVariant.bodyMd,
                                  ellipsis: !0,
                                },
                                le,
                                R &&
                                  a.default.createElement(E.StakeableLink, {
                                    chainId: A,
                                    symbol: n,
                                  })
                              ),
                          ee
                            ? a.default.createElement(c.ButtonIcon, {
                                iconName: c.IconName.Danger,
                                onClick: e => {
                                  e.preventDefault(), e.stopPropagation(), ae(!0);
                                },
                                color: u.IconColor.errorDefault,
                                size: c.ButtonIconSize.Md,
                                backgroundColor: u.BackgroundColor.transparent,
                                'data-testid': 'scam-warning',
                                ariaLabel: '',
                              })
                            : a.default.createElement(
                                c.SensitiveText,
                                {
                                  fontWeight: u.FontWeight.Medium,
                                  variant: u.TextVariant.bodyMd,
                                  textAlign: u.TextAlign.End,
                                  'data-testid': 'multichain-token-list-item-secondary-value',
                                  ellipsis: R,
                                  isHidden: U,
                                  length: c.SensitiveTextLength.Medium,
                                },
                                I
                              )
                        ),
                        a.default.createElement(
                          c.Box,
                          {
                            display: u.Display.Flex,
                            flexDirection: u.FlexDirection.Row,
                            justifyContent: u.JustifyContent.spaceBetween,
                          },
                          X
                            ? a.default.createElement(w.PercentageChange, {
                                value: D
                                  ? null == oe ||
                                    null === (W = oe[A]) ||
                                    void 0 === W ||
                                    null === (W = W[(0, s.getNativeTokenAddress)(A)]) ||
                                    void 0 === W
                                    ? void 0
                                    : W.pricePercentChange1d
                                  : ie,
                                address: D ? (0, s.getNativeTokenAddress)(A) : F,
                              })
                            : a.default.createElement(
                                c.Text,
                                {
                                  variant: u.TextVariant.bodySmMedium,
                                  color: u.TextColor.textAlternative,
                                  'data-testid': 'multichain-token-list-item-token-name',
                                  ellipsis: !0,
                                },
                                se
                              ),
                          ee
                            ? a.default.createElement(
                                c.SensitiveText,
                                {
                                  'data-testid': 'multichain-token-list-item-value',
                                  color: u.TextColor.textAlternative,
                                  variant: u.TextVariant.bodyMd,
                                  textAlign: u.TextAlign.End,
                                  isHidden: U,
                                  length: c.SensitiveTextLength.Short,
                                },
                                M,
                                ' ',
                                j ? '' : n
                              )
                            : a.default.createElement(
                                c.SensitiveText,
                                {
                                  'data-testid': 'multichain-token-list-item-value',
                                  color: u.TextColor.textAlternative,
                                  variant: u.TextVariant.bodySmMedium,
                                  textAlign: u.TextAlign.End,
                                  isHidden: U,
                                  length: c.SensitiveTextLength.Short,
                                },
                                M,
                                ' ',
                                j ? '' : n
                              )
                        )
                      )
                    ),
                    G && ne
                      ? a.default.createElement(
                          c.Modal,
                          { isOpen: !0, onClose: () => ae(!1) },
                          a.default.createElement(c.ModalOverlay, null),
                          a.default.createElement(
                            c.ModalContent,
                            null,
                            a.default.createElement(
                              c.ModalHeader,
                              { onClose: () => ae(!1) },
                              z('nativeTokenScamWarningTitle')
                            ),
                            a.default.createElement(
                              c.ModalBody,
                              { marginTop: 4, marginBottom: 4 },
                              z('nativeTokenScamWarningDescription', [
                                n,
                                (null == Q || null === (q = Q.nativeCurrency) || void 0 === q
                                  ? void 0
                                  : q.symbol) ||
                                  z('nativeTokenScamWarningDescriptionExpectedTokenFallback'),
                              ])
                            ),
                            a.default.createElement(
                              c.ModalFooter,
                              null,
                              a.default.createElement(
                                c.ButtonSecondary,
                                {
                                  onClick: () => {
                                    te((0, _.setEditedNetwork)({ chainId: A })),
                                      re.push(v.NETWORKS_ROUTE);
                                  },
                                  block: !0,
                                },
                                z('nativeTokenScamWarningConversion')
                              )
                            )
                          )
                        )
                      : null
                  );
                };
                n.TokenListItemComponent = I;
                n.TokenListItem = a.default.memo(I);
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/token-list-item/token-list-item.tsx' },
    ],
    [
      6695,
      {
        '../../../helpers/constants/common': 6870,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../app/user-preferenced-currency-display': 6317,
        '../../component-library': 6402,
        '../identicon': 6758,
        '../tooltip': 6818,
        '@metamask/keyring-api': 2014,
        classnames: 4168,
        lodash: 4921,
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
                  o = h(e('classnames')),
                  i = e('lodash'),
                  s = e('@metamask/keyring-api'),
                  l = e('../../../hooks/useI18nContext'),
                  u = h(e('../identicon')),
                  c = h(e('../../app/user-preferenced-currency-display')),
                  d = e('../../../helpers/constants/common'),
                  p = h(e('../tooltip')),
                  f = e('../../component-library'),
                  m = e('../../../helpers/constants/design-system');
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
                  selectNewAccountViaModal: e,
                  accounts: t,
                  addressLastConnectedMap: n,
                  selectedAccounts: r,
                  nativeCurrency: i,
                  allAreSelected: h,
                  deselectAll: g,
                  selectAll: y,
                  handleAccountClick: b,
                }) => {
                  const v = (0, l.useI18nContext)(),
                    _ = (0, a.useRef)(null);
                  (0, a.useLayoutEffect)(() => {
                    var e;
                    null === (e = _.current) ||
                      void 0 === e ||
                      e.scrollIntoView({ behavior: 'smooth' });
                  }, []);
                  const [T] = r,
                    C = () => {
                      const n = h(),
                        i = !n && 0 !== r.size;
                      return a.default.createElement(
                        'div',
                        {
                          className: (0, o.default)({
                            'choose-account-list__header--one-item': 1 === t.length,
                            'choose-account-list__header--multiple-items': t.length > 1,
                          }),
                        },
                        t.length > 1
                          ? a.default.createElement(
                              'div',
                              { className: 'choose-account-list__select-all' },
                              a.default.createElement(f.Checkbox, {
                                className: 'choose-account-list__header-check-box',
                                'data-testid': 'choose-account-list-operate-all-check-box',
                                isChecked: n,
                                isIndeterminate: i,
                                onClick: () => (h() ? g() : y()),
                              }),
                              a.default.createElement(
                                f.Text,
                                {
                                  as: 'div',
                                  className: 'choose-account-list__text-grey',
                                  color: m.TextColor.textAlternative,
                                },
                                v('selectAll')
                              ),
                              a.default.createElement(
                                p.default,
                                {
                                  position: 'bottom',
                                  html: a.default.createElement(
                                    'div',
                                    { style: { width: 200, padding: 4 } },
                                    v('selectingAllWillAllow')
                                  ),
                                },
                                a.default.createElement(f.Icon, {
                                  name: f.IconName.Info,
                                  color: m.IconColor.iconMuted,
                                  className: 'info-circle',
                                  marginInlineStart: 2,
                                })
                              )
                            )
                          : null,
                        a.default.createElement(
                          f.ButtonLink,
                          {
                            color: m.TextColor.infoDefault,
                            variant: m.TextVariant.bodyMdMedium,
                            style: { cursor: 'pointer' },
                            onClick: () => e(b),
                          },
                          v('newAccount')
                        )
                      );
                    };
                  return a.default.createElement(
                    'div',
                    { className: 'choose-account-list' },
                    a.default.createElement(C, null),
                    a.default.createElement(
                      'div',
                      { className: 'choose-account-list__wrapper' },
                      a.default.createElement(
                        f.Box,
                        { className: 'choose-account-list__list', style: { overflowX: 'hidden' } },
                        t.map((e, t) => {
                          const { address: o, addressLabel: l, balance: h } = e,
                            g = r.has(o);
                          return a.default.createElement(
                            f.Box,
                            {
                              display: m.Display.Flex,
                              width: m.BlockSize.Full,
                              key: `choose-account-list-${t}`,
                              'data-testid': `choose-account-list-${t}`,
                              onClick: () =>
                                (e => {
                                  (0, s.isEvmAccountType)(e.type) && b(e.address);
                                })(e),
                              className: 'choose-account-list__account',
                              ref: g && o === T ? _ : null,
                              backgroundColor: g
                                ? m.Color.primaryMuted
                                : m.BackgroundColor.backgroundDefault,
                            },
                            a.default.createElement(
                              f.Box,
                              {
                                display: m.Display.Flex,
                                width: m.BlockSize.Full,
                                alignItems: m.AlignItems.center,
                              },
                              a.default.createElement(f.Checkbox, {
                                isChecked: g,
                                isDisabled: !(0, s.isEvmAccountType)(e.type),
                              }),
                              a.default.createElement(
                                f.Box,
                                { marginLeft: 2 },
                                a.default.createElement(u.default, { diameter: 34, address: o })
                              ),
                              a.default.createElement(
                                f.Box,
                                {
                                  display: m.Display.Flex,
                                  justifyContent: m.JustifyContent.spaceBetween,
                                  width: m.BlockSize.Full,
                                  paddingLeft: 3,
                                  style: { minWidth: 0 },
                                },
                                a.default.createElement(
                                  f.Box,
                                  {
                                    display: m.Display.Flex,
                                    flexDirection: m.FlexDirection.Column,
                                    width: m.BlockSize.Full,
                                  },
                                  a.default.createElement(
                                    f.Text,
                                    {
                                      variant: m.TextVariant.bodyMdMedium,
                                      style: { textWrap: 'nowrap' },
                                      ellipsis: !0,
                                    },
                                    l
                                  ),
                                  a.default.createElement(
                                    f.Box,
                                    { display: m.Display.Flex },
                                    a.default.createElement(c.default, {
                                      account: e,
                                      type: d.PRIMARY,
                                      value: h,
                                      style: {
                                        color: 'var(--color-text-alternative)',
                                        flexWrap: 'nowrap',
                                      },
                                      suffix: i,
                                      numberOfDecimals: 2,
                                      ethNumberOfDecimals: 5,
                                      textProps: {
                                        color: m.TextColor.textAlternative,
                                        variant: m.TextVariant.bodySm,
                                      },
                                      suffixProps: {
                                        color: m.TextColor.textAlternative,
                                        variant: m.TextVariant.bodySm,
                                      },
                                    })
                                  )
                                )
                              ),
                              n[o]
                                ? a.default.createElement(
                                    p.default,
                                    { title: `${v('lastConnected')} ${n[o]}` },
                                    a.default.createElement(f.Icon, {
                                      name: f.IconName.Info,
                                      color: m.IconColor.iconMuted,
                                      className: 'info-circle',
                                      marginInlineStart: 2,
                                    })
                                  )
                                : null
                            )
                          );
                        })
                      )
                    )
                  );
                };
                y.propTypes = {
                  accounts: r.default.arrayOf(
                    r.default.shape({
                      address: r.default.string,
                      addressLabel: r.default.string,
                      lastConnectedDate: r.default.string,
                      balance: r.default.string,
                    })
                  ).isRequired,
                  selectNewAccountViaModal: r.default.func.isRequired,
                  addressLastConnectedMap: r.default.object,
                  nativeCurrency: r.default.string.isRequired,
                  selectedAccounts: r.default.object.isRequired,
                  allAreSelected: r.default.func.isRequired,
                  deselectAll: r.default.func.isRequired,
                  selectAll: r.default.func.isRequired,
                  handleAccountClick: r.default.func.isRequired,
                };
                n.default = (0, a.memo)(y, (e, t) =>
                  (0, i.isEqual)(e.selectedAccounts, t.selectedAccounts)
                );
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/account-list/account-list.js' },
    ],
    [
      6696,
      { './account-list': 6695 },
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
                  r = (a = e('./account-list')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/account-list/index.js' },
    ],
    [
      6697,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../icon/info-icon.component': 6750,
        '../tooltip': 6818,
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
                var a = d(e('react')),
                  r = e('react-redux'),
                  o = d(e('prop-types')),
                  i = d(e('../tooltip')),
                  s = e('../../../selectors'),
                  l = d(e('../icon/info-icon.component')),
                  u = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/constants/design-system');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p({ address: e }) {
                  const t = (0, r.useSelector)(s.getSelectedAccount),
                    n = (0, u.useI18nContext)();
                  return t.address === e
                    ? null
                    : a.default.createElement(
                        i.default,
                        {
                          position: 'bottom',
                          html: a.default.createElement('p', null, n('notCurrentAccount')),
                          wrapperClassName: 'account-mismatch-warning__tooltip-wrapper',
                          containerClassName: 'account-mismatch-warning__tooltip-container',
                        },
                        a.default.createElement(
                          'div',
                          {
                            className: 'account-mismatch-warning__tooltip-container-icon',
                            'data-testid': 'account-mismatch-warning-tooltip',
                          },
                          a.default.createElement(l.default, { severity: c.Severity.Warning })
                        )
                      );
                }
                p.propTypes = { address: o.default.string.isRequired };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/account-mismatch-warning/account-mismatch-warning.component.js',
      },
    ],
    [
      6698,
      {
        '../info-tooltip': 6759,
        '../info-tooltip/info-tooltip-icon': 6760,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = p),
                  (n.typeHash = void 0);
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
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = l(e('../info-tooltip')),
                  s = l(e('../info-tooltip/info-tooltip-icon'));
                function l(e) {
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
                const c = 'actionable-message--with-right-button',
                  d = (n.typeHash = {
                    warning: 'actionable-message--warning',
                    danger: 'actionable-message--danger',
                    success: 'actionable-message--success',
                    default: '',
                  });
                function p({
                  message: e = '',
                  primaryAction: t = null,
                  primaryActionV2: n = null,
                  secondaryAction: r = null,
                  className: l = '',
                  infoTooltipText: u = '',
                  withRightButton: p = !1,
                  type: f = 'default',
                  useIcon: m = !1,
                  icon: h,
                  iconFillColor: g = '',
                  roundedButtons: y,
                  dataTestId: b,
                  autoHideTime: v = 0,
                  onAutoHide: _,
                }) {
                  const [T, C] = (0, a.useState)(!0);
                  (0, a.useEffect)(
                    function () {
                      if (0 === v) return undefined;
                      const e = setTimeout(() => {
                        null == _ || _(), C(!1);
                      }, v);
                      return function () {
                        clearTimeout(e);
                      };
                    },
                    [v, _]
                  );
                  const k = (0, o.default)('actionable-message', d[f], p ? c : null, l, {
                      'actionable-message--with-icon': m,
                    }),
                    w = (t && !r) || (r && !t);
                  return T
                    ? a.default.createElement(
                        'div',
                        { className: k, 'data-testid': b },
                        m ? h || a.default.createElement(s.default, { fillColor: g }) : null,
                        u &&
                          a.default.createElement(i.default, {
                            position: 'left',
                            contentText: u,
                            wrapperClassName: 'actionable-message__info-tooltip-wrapper',
                          }),
                        a.default.createElement(
                          'div',
                          { className: 'actionable-message__message' },
                          e
                        ),
                        n &&
                          a.default.createElement(
                            'button',
                            { className: 'actionable-message__action-v2', onClick: n.onClick },
                            n.label
                          ),
                        (t || r) &&
                          a.default.createElement(
                            'div',
                            {
                              className: (0, o.default)('actionable-message__actions', {
                                'actionable-message__actions--single': w,
                              }),
                            },
                            t &&
                              a.default.createElement(
                                'button',
                                {
                                  className: (0, o.default)(
                                    'actionable-message__action',
                                    'actionable-message__action--primary',
                                    `actionable-message__action-${f}`,
                                    { 'actionable-message__action--rounded': y }
                                  ),
                                  onClick: t.onClick,
                                },
                                t.label
                              ),
                            r &&
                              a.default.createElement(
                                'button',
                                {
                                  className: (0, o.default)(
                                    'actionable-message__action',
                                    'actionable-message__action--secondary',
                                    `actionable-message__action-${f}`,
                                    { 'actionable-message__action--rounded': y }
                                  ),
                                  onClick: r.onClick,
                                },
                                r.label
                              )
                          )
                      )
                    : null;
                }
                p.propTypes = {
                  message: r.default.node.isRequired,
                  primaryAction: r.default.shape({
                    label: r.default.string,
                    onClick: r.default.func,
                  }),
                  primaryActionV2: r.default.shape({
                    label: r.default.string,
                    onClick: r.default.func,
                  }),
                  secondaryAction: r.default.shape({
                    label: r.default.string,
                    onClick: r.default.func,
                  }),
                  className: r.default.string,
                  type: r.default.oneOf(Object.keys(d)),
                  withRightButton: r.default.bool,
                  infoTooltipText: r.default.string,
                  useIcon: r.default.bool,
                  icon: r.default.node,
                  iconFillColor: r.default.string,
                  roundedButtons: r.default.bool,
                  dataTestId: r.default.string,
                  autoHideTime: r.default.number,
                  onAutoHide: r.default.func,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/actionable-message/actionable-message.js' },
    ],
    [
      6699,
      { './actionable-message': 6698 },
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
                  r = (a = e('./actionable-message')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/actionable-message/index.js' },
    ],
    [
      6700,
      {
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../../selectors/assets': 7595,
        '../../../selectors/multichain': 7605,
        '../../app/assets/util/formatWithThreshold': 5963,
        '../../component-library': 6402,
        '../spinner': 6802,
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
                  (n.AggregatedBalance = void 0);
                var a = h(e('react')),
                  r = e('react-redux'),
                  o = h(e('classnames')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library'),
                  l = e('../../../ducks/metamask/metamask'),
                  u = e('../../../selectors/assets'),
                  c = e('../../../selectors'),
                  d = e('../../../selectors/multichain'),
                  p = e('../../app/assets/util/formatWithThreshold'),
                  f = e('../../../ducks/locale/locale'),
                  m = h(e('../spinner'));
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.AggregatedBalance = ({
                  classPrefix: e,
                  balanceIsCached: t,
                  handleSensitiveToggle: n,
                }) => {
                  var h;
                  const { privacyMode: g, showNativeTokenAsMainBalance: y } = (0, r.useSelector)(
                      c.getPreferences
                    ),
                    b = (0, r.useSelector)(f.getIntlLocale),
                    v = (0, r.useSelector)(l.getTokenBalances),
                    _ = (0, r.useSelector)(u.getAccountAssets),
                    T = (0, r.useSelector)(c.getSelectedInternalAccount),
                    C = (0, r.useSelector)(d.getMultichainNetwork),
                    k = (0, r.useSelector)(l.getCurrentCurrency),
                    w = (0, r.useSelector)(e => (0, u.getMultichainAggregatedBalance)(e, T)),
                    E = (0, r.useSelector)(e => (0, u.getMultichainNativeTokenBalance)(e, T)),
                    x = (0, p.formatWithThreshold)(w, 0, b, {
                      style: 'currency',
                      currency: k.toUpperCase(),
                    }),
                    M = (0, p.formatWithThreshold)(parseFloat(E.amount.toString()), 0, b, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 5,
                    });
                  return v && null !== (h = _[T.id]) && void 0 !== h && h.length
                    ? a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(
                          s.Box,
                          {
                            className: (0, o.default)(`${e}-overview__primary-balance`, {
                              [`${e}-overview__cached-balance`]: t,
                            }),
                            'data-testid': `${e}-overview__primary-currency`,
                            display: i.Display.Flex,
                            alignItems: i.AlignItems.center,
                            flexWrap: i.FlexWrap.Wrap,
                          },
                          a.default.createElement(
                            s.SensitiveText,
                            {
                              ellipsis: !0,
                              variant: i.TextVariant.inherit,
                              isHidden: g,
                              'data-testid': 'account-value-and-suffix',
                            },
                            y ? M : x
                          ),
                          a.default.createElement(
                            s.SensitiveText,
                            {
                              marginInlineStart: g ? 0 : 1,
                              variant: i.TextVariant.inherit,
                              isHidden: g,
                            },
                            y ? C.network.ticker : k.toUpperCase()
                          ),
                          a.default.createElement(s.ButtonIcon, {
                            color: i.IconColor.iconAlternative,
                            marginLeft: 2,
                            size: s.ButtonIconSize.Md,
                            onClick: n,
                            iconName: g ? s.IconName.EyeSlash : s.IconName.Eye,
                            justifyContent: i.JustifyContent.center,
                            ariaLabel: 'Sensitive toggle',
                            'data-testid': 'sensitive-toggle',
                          })
                        )
                      )
                    : a.default.createElement(m.default, { className: 'loading-overlay__spinner' });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/aggregated-balance/aggregated-balance.tsx' },
    ],
    [
      6701,
      {
        '../../../../shared/constants/time': 5817,
        '../../../hooks/usePrevious': 7002,
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
                var a = u(e('classnames')),
                  r = u(e('prop-types')),
                  o = (function (e, t) {
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
                  i = e('../../../hooks/usePrevious'),
                  s = e('../../../../shared/constants/time');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c(e) {
                  const [t, n] = (0, o.useState)(!1),
                    [r, l] = (0, o.useState)(''),
                    u = (0, i.usePrevious)(e.visible);
                  return (
                    (0, o.useEffect)(() => {
                      !u && e.visible
                        ? (e.msg, l('visible'), n(!0))
                        : u &&
                          !e.visible &&
                          (l('hidden'),
                          setTimeout(e => {
                            n(!1);
                          }, 500 * s.MILLISECOND));
                    }, [u, e.msg, e.visible]),
                    t
                      ? o.default.createElement(
                          'div',
                          { className: (0, a.default)('global-alert', r) },
                          o.default.createElement('a', { className: 'msg' }, e.msg)
                        )
                      : null
                  );
                }
                c.propTypes = { visible: r.default.bool.isRequired, msg: r.default.string };
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/alert/index.js' },
    ],
    [
      6702,
      {
        '../../../helpers/constants/design-system': 6872,
        classnames: 4168,
        lodash: 4921,
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
                  (n.default =
                    n.ValidTextColors =
                    n.ValidIconColors =
                    n.ValidBorderColors =
                    n.ValidBackgroundColor =
                    n.MultipleTextColors =
                    n.MultipleSizesAndAuto =
                    n.MultipleSizes =
                    n.MultipleJustifyContents =
                    n.MultipleBorderColors =
                    n.MultipleBlockSizes =
                    n.MultipleBackgroundColor =
                    n.MultipleAlignItems =
                      void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('lodash'),
                  s = e('../../../helpers/constants/design-system');
                function l(e) {
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
                const c = 'box',
                  d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  p = r.default.oneOf(d),
                  f = r.default.oneOf(Object.values(s.BlockSize)),
                  m = r.default.oneOf([...d, 'auto']),
                  h = (n.ValidBackgroundColor = r.default.oneOf(Object.values(s.BackgroundColor))),
                  g = (n.ValidBorderColors = r.default.oneOf(Object.values(s.BorderColor))),
                  y = (n.ValidTextColors = r.default.oneOf(Object.values(s.TextColor))),
                  b = (n.ValidIconColors = r.default.oneOf(Object.values(s.IconColor))),
                  v = r.default.oneOf(Object.values(s.AlignItems)),
                  _ = r.default.oneOf(Object.values(s.JustifyContent)),
                  T = r.default.arrayOf(p),
                  C = (n.MultipleSizes = r.default.oneOfType([p, T])),
                  k = r.default.arrayOf(f),
                  w = (n.MultipleBlockSizes = r.default.oneOfType([f, k])),
                  E = r.default.arrayOf(m),
                  x = (n.MultipleSizesAndAuto = r.default.oneOfType([m, E])),
                  M = r.default.arrayOf(g),
                  O = (n.MultipleBorderColors = r.default.oneOfType([g, M])),
                  I = r.default.arrayOf(h),
                  N = (n.MultipleBackgroundColor = r.default.oneOfType([h, I])),
                  S = r.default.arrayOf(y),
                  P = r.default.arrayOf(b),
                  A = (n.MultipleTextColors = r.default.oneOfType([y, S, b, P])),
                  j = r.default.arrayOf(v),
                  D = (n.MultipleAlignItems = r.default.oneOfType([v, j])),
                  R = r.default.arrayOf(_),
                  B = (n.MultipleJustifyContents = r.default.oneOfType([_, R]));
                function $(e, t) {
                  return (
                    'number' == typeof t ||
                    (('margin' === e ||
                      'margin-top' === e ||
                      'margin-right' === e ||
                      'margin-bottom' === e ||
                      'margin-left' === e ||
                      'margin-inline' === e ||
                      'margin-inline-start' === e ||
                      'margin-inline-end' === e) &&
                      'auto' === t)
                  );
                }
                function F(e, t) {
                  return 'string' == typeof e && 'string' == typeof t;
                }
                const L = (0, i.memoize)(
                    (e, t, n) => {
                      if (!t) return null;
                      const a = {},
                        r = Array.isArray(t) && 1 === t.length ? t[0] : undefined,
                        o =
                          ((!Array.isArray(t) && 'string' == typeof t) || 'number' == typeof t
                            ? t
                            : undefined) || r;
                      if (o || 0 === o) a[`${c}--${e}-${o}`] = n(e, o);
                      else
                        switch (t.length) {
                          case 4:
                            (a[`${c}--${e}-${t[0]}`] = t[0] && n(e, t[0])),
                              (a[`${c}--${s.BREAKPOINTS[1]}:${e}-${t[1]}`] = t[1] && n(e, t[1])),
                              (a[`${c}--${s.BREAKPOINTS[2]}:${e}-${t[2]}`] = t[2] && n(e, t[2])),
                              (a[`${c}--${s.BREAKPOINTS[3]}:${e}-${t[3]}`] = t[3] && n(e, t[3]));
                            break;
                          case 3:
                            (a[`${c}--${e}-${t[0]}`] = t[0] && n(e, t[0])),
                              (a[`${c}--${s.BREAKPOINTS[1]}:${e}-${t[1]}`] = t[1] && n(e, t[1])),
                              (a[`${c}--${s.BREAKPOINTS[2]}:${e}-${t[2]}`] = t[2] && n(e, t[2]));
                            break;
                          case 2:
                            (a[`${c}--${e}-${t[0]}`] = t[0] && n(e, t[0])),
                              (a[`${c}--${s.BREAKPOINTS[1]}:${e}-${t[1]}`] = t[1] && n(e, t[1]));
                            break;
                          default:
                            console.log(`Invalid array prop length: ${t.length}`);
                        }
                      return a;
                    },
                    (e, t) => `${e}${t}`
                  ),
                  U = a.default.forwardRef(function (
                    {
                      padding: e,
                      paddingTop: t,
                      paddingRight: n,
                      paddingBottom: r,
                      paddingLeft: i,
                      paddingInline: l,
                      paddingInlineStart: d,
                      paddingInlineEnd: p,
                      margin: f,
                      marginTop: m,
                      marginRight: h,
                      marginBottom: g,
                      marginLeft: y,
                      marginInline: b,
                      marginInlineStart: v,
                      marginInlineEnd: _,
                      borderColor: T,
                      borderWidth: C,
                      borderRadius: k,
                      borderStyle: w,
                      alignItems: E,
                      justifyContent: x,
                      textAlign: M,
                      flexDirection: O = s.FlexDirection.Row,
                      flexWrap: I,
                      gap: N,
                      display: S,
                      width: P,
                      height: A,
                      children: j,
                      className: D,
                      backgroundColor: R,
                      color: B,
                      ariaLabel: U,
                      as: H = 'div',
                      ...V
                    },
                    W
                  ) {
                    const q = (0, o.default)(
                      c,
                      D,
                      f && L('margin', f, $),
                      m && L('margin-top', m, $),
                      h && L('margin-right', h, $),
                      g && L('margin-bottom', g, $),
                      y && L('margin-left', y, $),
                      b && L('margin-inline', b, $),
                      v && L('margin-inline-start', v, $),
                      _ && L('margin-inline-end', _, $),
                      e && L('padding', e, $),
                      t && L('padding-top', t, $),
                      n && L('padding-right', n, $),
                      r && L('padding-bottom', r, $),
                      i && L('padding-left', i, $),
                      l && L('padding-inline', l, $),
                      d && L('padding-inline-start', d, $),
                      p && L('padding-inline-end', p, $),
                      S && L('display', S, F),
                      N && L('gap', N, $),
                      O && L('flex-direction', O, F),
                      I && L('flex-wrap', I, F),
                      x && L('justify-content', x, F),
                      E && L('align-items', E, F),
                      M && L('text-align', M, F),
                      P && L('width', P, F),
                      A && L('height', A, F),
                      B && L('color', B, F),
                      R && L('background-color', R, F),
                      k && L('rounded', k, F),
                      w && L('border-style', w, F),
                      T && L('border-color', T, F),
                      C && L('border-width', C, $),
                      {
                        'box--border-style-solid': !w && (Boolean(C) || Boolean(T)),
                        'box--border-width-1': !C && Boolean(T),
                        'box--display-flex': !S && (Boolean(x) || Boolean(E)),
                      }
                    );
                    if ('function' == typeof j) return j(q);
                    const z = H,
                      G = {};
                    return (
                      'function' == typeof z.type ? (G.ariaLabel = U) : (G['aria-label'] = U),
                      V['aria-label'] && (G['aria-label'] = V['aria-label']),
                      a.default.createElement(z, u({ className: q, ref: W }, V, G), j)
                    );
                  });
                U.propTypes = {
                  children: r.default.oneOfType([r.default.node, r.default.func]),
                  flexDirection: r.default.oneOfType([
                    r.default.oneOf(Object.values(s.FlexDirection)),
                    r.default.arrayOf(r.default.oneOf(Object.values(s.FlexDirection))),
                  ]),
                  flexWrap: r.default.oneOfType([
                    r.default.oneOf(Object.values(s.FlexWrap)),
                    r.default.arrayOf(r.default.oneOf(Object.values(s.FlexWrap))),
                  ]),
                  gap: C,
                  margin: x,
                  marginTop: x,
                  marginBottom: x,
                  marginRight: x,
                  marginLeft: x,
                  marginInline: x,
                  marginInlineStart: x,
                  marginInlineEnd: x,
                  padding: C,
                  paddingTop: C,
                  paddingBottom: C,
                  paddingRight: C,
                  paddingLeft: C,
                  paddingInline: C,
                  paddingInlineStart: C,
                  paddingInlineEnd: C,
                  borderColor: O,
                  borderWidth: r.default.oneOfType([
                    r.default.number,
                    r.default.arrayOf(r.default.number),
                  ]),
                  borderRadius: r.default.oneOfType([
                    r.default.oneOf(Object.values(s.BorderRadius)),
                    r.default.arrayOf(r.default.oneOf(Object.values(s.BorderRadius))),
                  ]),
                  borderStyle: r.default.oneOfType([
                    r.default.oneOf(Object.values(s.BorderStyle)),
                    r.default.arrayOf(r.default.oneOf(Object.values(s.BorderStyle))),
                  ]),
                  alignItems: D,
                  justifyContent: B,
                  textAlign: r.default.oneOfType([
                    r.default.oneOf(Object.values(s.TextAlign)),
                    r.default.arrayOf(r.default.oneOf(Object.values(s.TextAlign))),
                  ]),
                  display: r.default.oneOfType([
                    r.default.oneOf(Object.values(s.Display)),
                    r.default.arrayOf(r.default.oneOf(Object.values(s.Display))),
                  ]),
                  width: w,
                  height: w,
                  backgroundColor: N,
                  className: r.default.string,
                  style: r.default.object,
                  as: r.default.string,
                  color: A,
                  ariaLabel: r.default.string,
                  'aria-label': r.default.string,
                };
                n.default = U;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/box/box.js' },
    ],
    [
      6703,
      { './box': 6702 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'MultipleSizes', {
                    enumerable: !0,
                    get: function () {
                      return a.MultipleSizes;
                    },
                  }),
                  Object.defineProperty(n, 'MultipleSizesAndAuto', {
                    enumerable: !0,
                    get: function () {
                      return a.MultipleSizesAndAuto;
                    },
                  }),
                  Object.defineProperty(n, 'ValidBackgroundColor', {
                    enumerable: !0,
                    get: function () {
                      return a.ValidBackgroundColor;
                    },
                  }),
                  Object.defineProperty(n, 'ValidBorderColors', {
                    enumerable: !0,
                    get: function () {
                      return a.ValidBorderColors;
                    },
                  }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var a = (function (e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = r(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var i in e)
                    if ('default' !== i && {}.hasOwnProperty.call(e, i)) {
                      var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
                      s && (s.get || s.set) ? Object.defineProperty(a, i, s) : (a[i] = e[i]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                })(e('./box'));
                function r(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (r = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/box/index.js' },
    ],
    [
      6704,
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
                  r = i(e('prop-types')),
                  o = i(e('classnames'));
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
                class u extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      l(this, 'state', {
                        activeButtonIndex: this.props.noButtonActiveByDefault
                          ? null
                          : this.props.defaultActiveButtonIndex,
                      });
                  }
                  componentDidUpdate(e, t) {
                    'number' == typeof this.props.newActiveButtonIndex &&
                      t.activeButtonIndex !== this.props.newActiveButtonIndex &&
                      this.setState({ activeButtonIndex: this.props.newActiveButtonIndex });
                  }
                  handleButtonClick(e) {
                    this.setState({ activeButtonIndex: e });
                  }
                  renderButtons() {
                    const { children: e, disabled: t, variant: n } = this.props;
                    return a.default.Children.map(
                      e,
                      (e, r) =>
                        e &&
                        a.default.createElement(
                          'button',
                          {
                            role: 'radiogroup' === n ? 'radio' : undefined,
                            'aria-checked': r === this.state.activeButtonIndex,
                            className: (0, o.default)(
                              'radiogroup' === n
                                ? 'radio-button-group__button'
                                : 'button-group__button',
                              e.props.className,
                              {
                                'button-group__button--active': r === this.state.activeButtonIndex,
                                'radio-button-group__button--active':
                                  'radiogroup' === n && r === this.state.activeButtonIndex,
                              }
                            ),
                            'data-testid': `button-group__button${r}`,
                            onClick: () => {
                              var t, n;
                              this.handleButtonClick(r),
                                null === (t = (n = e.props).onClick) || void 0 === t || t.call(n);
                            },
                            disabled: t || e.props.disabled,
                            key: r,
                          },
                          e.props.children
                        )
                    );
                  }
                  render() {
                    const { className: e, style: t, variant: n } = this.props;
                    return a.default.createElement(
                      'div',
                      {
                        className: (0, o.default)(e, { 'radio-button-group': 'radiogroup' === n }),
                        role: 'radiogroup' === n ? 'radiogroup' : undefined,
                        style: t,
                      },
                      this.renderButtons()
                    );
                  }
                }
                (n.default = u),
                  l(u, 'propTypes', {
                    defaultActiveButtonIndex: r.default.number,
                    noButtonActiveByDefault: r.default.bool,
                    disabled: r.default.bool,
                    children: r.default.array,
                    className: r.default.string,
                    style: r.default.object,
                    newActiveButtonIndex: r.default.number,
                    variant: r.default.oneOf(['radiogroup', 'default']),
                  }),
                  l(u, 'defaultProps', {
                    className: 'button-group',
                    defaultActiveButtonIndex: 0,
                    variant: 'default',
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/button-group/button-group.component.js' },
    ],
    [
      6705,
      { './button-group.component': 6704 },
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
                  r = (a = e('./button-group.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/button-group/index.js' },
    ],
    [
      6706,
      { classnames: 4168, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = i(e('react')),
                  r = i(e('prop-types')),
                  o = i(e('classnames'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function s() {
                  return (
                    (s = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    s.apply(null, arguments)
                  );
                }
                const l = 'btn-default',
                  u = {
                    default: l,
                    primary: 'btn-primary',
                    secondary: 'btn-secondary',
                    warning: 'btn-warning',
                    danger: 'btn-danger',
                    'danger-primary': 'btn-danger-primary',
                    link: 'btn-link',
                    inline: 'btn--inline',
                    raised: 'btn-raised',
                  },
                  c = ({
                    type: e,
                    submit: t = !1,
                    large: n,
                    children: r,
                    icon: i,
                    className: c,
                    rounded: d = !0,
                    ...p
                  }) => {
                    const f = d && 'link' !== e && 'inline' !== e;
                    let m = 'button';
                    return (
                      'link' === e ? (m = 'a') : t && (p.type = 'submit'),
                      'link' === e &&
                        'function' == typeof p.onClick &&
                        (p.onKeyUp ??
                          (p.onKeyUp = e => {
                            'Enter' === e.key && p.onClick();
                          }),
                        p.role ?? (p.role = 'button'),
                        p.tabIndex ?? (p.tabIndex = 0)),
                      a.default.createElement(
                        m,
                        s(
                          {
                            className: (0, o.default)(
                              'button',
                              f && 'btn--rounded',
                              u[e] || l,
                              n && 'btn--large',
                              c
                            ),
                          },
                          p
                        ),
                        i
                          ? a.default.createElement('span', { className: 'button__icon' }, i)
                          : null,
                        r
                      )
                    );
                  };
                c.propTypes = {
                  type: r.default.string,
                  submit: r.default.bool,
                  large: r.default.bool,
                  className: r.default.string,
                  children: r.default.node,
                  icon: r.default.node,
                  rounded: r.default.bool,
                };
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/button/button.component.js' },
    ],
    [
      6707,
      { './button.component': 6706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./button.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/button/index.js' },
    ],
    [
      6708,
      {
        '../../../../shared/constants/time': 5817,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../icon/info-icon-inverted.component': 6749,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = p);
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
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  i = c(e('../icon/info-icon-inverted.component')),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../../shared/constants/time'),
                  u = e('../../component-library');
                function c(e) {
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
                function p({
                  severity: e,
                  children: t,
                  dismiss: n,
                  isFirst: r,
                  isLast: c,
                  isMultiple: d,
                }) {
                  const [p, f] = (0, a.useState)(!1),
                    m = (0, o.default)('callout', `callout--${e}`, {
                      'callout--dismissed': !0 === p,
                      'callout--multiple': !0 === d,
                      'callout--dismissible': Boolean(n),
                      'callout--first': !0 === r || !0 !== d,
                      'callout--last': !0 === c || !0 !== d,
                    });
                  return (
                    (0, a.useEffect)(() => {
                      p &&
                        setTimeout(() => {
                          n();
                        }, 500 * l.MILLISECOND);
                    }, [p, n]),
                    a.default.createElement(
                      'div',
                      { className: m },
                      a.default.createElement(i.default, { severity: e }),
                      a.default.createElement(
                        u.Text,
                        { color: s.TextColor.textDefault, className: 'callout__content' },
                        t
                      ),
                      n &&
                        a.default.createElement(u.ButtonIcon, {
                          iconName: u.IconName.Close,
                          size: u.IconSize.Sm,
                          className: 'callout__close-button',
                          onClick: () => {
                            f(!0);
                          },
                          onKeyUp: e => {
                            'Enter' === e.key && f(!0);
                          },
                        })
                    )
                  );
                }
                p.propTypes = {
                  severity: r.default.oneOf(Object.values(s.Severity)).isRequired,
                  children: r.default.node.isRequired,
                  dismiss: r.default.func,
                  isFirst: r.default.bool,
                  isLast: r.default.bool,
                  isMultiple: r.default.bool,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/callout/callout.js' },
    ],
    [
      6709,
      { './callout': 6708 },
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
                  r = (a = e('./callout')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/callout/index.js' },
    ],
    [
      6710,
      {
        '../../../helpers/constants/design-system': 6872,
        '../box': 6703,
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
                  o = s(e('../box')),
                  i = e('../../../helpers/constants/design-system');
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
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                const u = ({
                  border: e = !0,
                  backgroundColor: t = i.BackgroundColor.backgroundDefault,
                  children: n,
                  ...r
                }) =>
                  a.default.createElement(
                    o.default,
                    l(
                      {
                        borderColor: e ? i.BorderColor.borderMuted : null,
                        borderRadius: e ? i.BorderRadius.MD : null,
                        borderStyle: e ? i.BorderStyle.solid : null,
                        backgroundColor: t,
                        padding: 4,
                      },
                      r
                    ),
                    n
                  );
                u.propTypes = {
                  border: r.default.bool,
                  backgroundColor: r.default.oneOf(Object.values(i.BackgroundColor)),
                  ...o.default.propTypes,
                };
                n.default = u;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/card/card.js' },
    ],
    [
      6711,
      { './card': 6710 },
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
                  r = (a = e('./card')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/card/index.js' },
    ],
    [
      6712,
      { classnames: 4168, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = n.UNCHECKED = n.INDETERMINATE = n.CHECKED = void 0);
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
                  r = i(e('prop-types')),
                  o = i(e('classnames'));
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
                const l = {
                    CHECKED: 'CHECKED',
                    INDETERMINATE: 'INDETERMINATE',
                    UNCHECKED: 'UNCHECKED',
                  },
                  { CHECKED: u, INDETERMINATE: c, UNCHECKED: d } = l;
                (n.UNCHECKED = d), (n.INDETERMINATE = c), (n.CHECKED = u);
                const p = ({
                  className: e,
                  disabled: t,
                  id: n,
                  onClick: r,
                  checked: i,
                  title: s,
                  dataTestId: u,
                }) => {
                  'boolean' == typeof i && (i = i ? l.CHECKED : l.UNCHECKED);
                  const c = (0, a.useRef)(null);
                  return (
                    (0, a.useLayoutEffect)(() => {
                      c.current.indeterminate = i === l.INDETERMINATE;
                    }, [i]),
                    a.default.createElement('input', {
                      checked: i === l.CHECKED,
                      className: (0, o.default)('check-box', e, {
                        'far fa-square': i === l.UNCHECKED,
                        'fa fa-check-square check-box__checked': i === l.CHECKED,
                        'fa fa-minus-square check-box__indeterminate': i === l.INDETERMINATE,
                      }),
                      disabled: t,
                      id: n,
                      onClick: r
                        ? e => {
                            e.preventDefault(), r();
                          }
                        : null,
                      readOnly: !0,
                      ref: c,
                      title: s,
                      'data-testid': u,
                      type: 'checkbox',
                    })
                  );
                };
                (p.propTypes = {
                  className: r.default.string,
                  disabled: r.default.bool,
                  id: r.default.string,
                  onClick: r.default.func,
                  checked: r.default.oneOf([...Object.keys(l), !0, !1]).isRequired,
                  title: r.default.string,
                  dataTestId: r.default.string,
                }),
                  (p.defaultProps = { className: undefined, disabled: !1, id: undefined });
                n.default = p;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/check-box/check-box.component.js' },
    ],
    [
      6713,
      { './check-box.component': 6712 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'CHECKED', {
                    enumerable: !0,
                    get: function () {
                      return a.CHECKED;
                    },
                  }),
                  Object.defineProperty(n, 'INDETERMINATE', {
                    enumerable: !0,
                    get: function () {
                      return a.INDETERMINATE;
                    },
                  }),
                  Object.defineProperty(n, 'UNCHECKED', {
                    enumerable: !0,
                    get: function () {
                      return a.UNCHECKED;
                    },
                  }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var a = (function (e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = r(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var i in e)
                    if ('default' !== i && {}.hasOwnProperty.call(e, i)) {
                      var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
                      s && (s.get || s.set) ? Object.defineProperty(a, i, s) : (a[i] = e[i]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                })(e('./check-box.component'));
                function r(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (r = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/check-box/index.js' },
    ],
    [
      6714,
      {
        '.': 6716,
        '../../../helpers/constants/design-system': 6872,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ChipWithInput = u);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('../../../helpers/constants/design-system'),
                  s = l(e('.'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function u({
                  dataTestId: e,
                  className: t,
                  borderColor: n = i.BorderColor.borderDefault,
                  inputValue: r,
                  setInputValue: l,
                }) {
                  return a.default.createElement(
                    s.default,
                    { className: (0, o.default)(t, 'chip--with-input'), borderColor: n },
                    l &&
                      a.default.createElement('input', {
                        'data-testid': e,
                        type: 'text',
                        className: 'chip__input',
                        onChange: e => {
                          l(e.target.value);
                        },
                        value: r,
                      })
                  );
                }
                u.propTypes = {
                  dataTestId: r.default.string,
                  borderColor: r.default.oneOf(Object.values(i.BorderColor)),
                  className: r.default.string,
                  inputValue: r.default.string,
                  setInputValue: r.default.func,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/chip/chip-with-input.js' },
    ],
    [
      6715,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../url-icon': 6827,
        classnames: 4168,
        lodash: 4921,
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
                var a = c(e('react')),
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  i = e('lodash'),
                  s = e('../../component-library'),
                  l = c(e('../url-icon')),
                  u = e('../../../helpers/constants/design-system');
                function c(e) {
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
                function p({
                  dataTestId: e,
                  className: t,
                  children: n,
                  borderColor: r = u.BorderColor.borderDefault,
                  backgroundColor: i,
                  label: c,
                  labelProps: p = {},
                  leftIcon: f,
                  leftIconUrl: m = '',
                  rightIcon: h,
                  onClick: g,
                  maxContent: y = !0,
                  displayInlineBlock: b = !1,
                }) {
                  const v = 'function' == typeof g;
                  return a.default.createElement(
                    'div',
                    {
                      'data-testid': e,
                      onClick: g,
                      onKeyPress: e => {
                        'Enter' === e.key && g && g(e);
                      },
                      className: (0, o.default)(t, 'chip', {
                        'chip--with-left-icon': Boolean(f),
                        'chip--with-right-icon': Boolean(h),
                        [`chip--border-color-${r}`]: !0,
                        [`chip--background-color-${i}`]: !0,
                        'chip--max-content': y,
                        'chip--display-inline-block': b,
                      }),
                      role: v ? 'button' : undefined,
                      tabIndex: v ? 0 : undefined,
                    },
                    f && !m
                      ? a.default.createElement('div', { className: 'chip__left-icon' }, f)
                      : null,
                    m
                      ? a.default.createElement(l.default, {
                          className: 'chip__left-url-icon',
                          url: m,
                        })
                      : null,
                    n ??
                      a.default.createElement(
                        s.Text,
                        d(
                          {
                            className: 'chip__label',
                            variant: u.TextVariant.bodySm,
                            as: 'span',
                            color: u.TextColor.textAlternative,
                          },
                          p
                        ),
                        c
                      ),
                    h ? a.default.createElement('div', { className: 'chip__right-icon' }, h) : null
                  );
                }
                p.propTypes = {
                  dataTestId: r.default.string,
                  borderColor: r.default.oneOf(Object.values(u.BorderColor)),
                  backgroundColor: r.default.oneOf(Object.values(u.BackgroundColor)),
                  label: r.default.string,
                  labelProps: r.default.shape({
                    ...(0, i.omit)(u.TextVariant.propTypes, ['children', 'className']),
                  }),
                  children: r.default.node,
                  leftIcon: r.default.node,
                  rightIcon: r.default.node,
                  className: r.default.string,
                  onClick: r.default.func,
                  maxContent: r.default.bool,
                  leftIconUrl: r.default.string,
                  displayInlineBlock: r.default.bool,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/chip/chip.js' },
    ],
    [
      6716,
      { './chip': 6715 },
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
                  r = (a = e('./chip')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/chip/index.js' },
    ],
    [
      6717,
      {
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../tooltip': 6818,
        'prop-types': 5082,
        react: 5328,
        'unicode-confusables': 5696,
        uuid: 5733,
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
                  r = c(e('prop-types')),
                  o = e('unicode-confusables'),
                  i = e('uuid'),
                  s = c(e('../tooltip')),
                  l = e('../../../hooks/useI18nContext'),
                  u = e('../../component-library');
                function c(e) {
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
                const p = ({ input: e, asText: t, confusableWrapperName: n = '' }) => {
                  const r = (0, l.useI18nContext)();
                  return (0, a.useMemo)(() => (0, o.confusables)(e), [e]).map(
                    ({ point: e, similarTo: o }) => {
                      const l = '' === o;
                      return o === undefined
                        ? t
                          ? a.default.createElement(u.Text, { key: (0, i.v4)() }, e)
                          : e
                        : a.default.createElement(
                            s.default,
                            {
                              key: (0, i.v4)(),
                              tag: 'span',
                              position: 'top',
                              title: l
                                ? r('confusableZeroWidthUnicode')
                                : r('confusableUnicode', [e, o]),
                              wrapperClassName: n,
                            },
                            a.default.createElement(
                              u.Text,
                              { className: 'confusable__point', as: t ? 'p' : 'span' },
                              l ? '?' : e
                            )
                          );
                    }
                  );
                };
                p.propTypes = {
                  input: r.default.string.isRequired,
                  asText: r.default.bool,
                  confusableWrapperName: r.default.string,
                };
                n.default = p;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/confusable/confusable.component.js' },
    ],
    [
      6718,
      { './confusable.component': 6717 },
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
                  r = (a = e('./confusable.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/confusable/index.js' },
    ],
    [
      6719,
      {
        '../../../../shared/constants/common': 5791,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useCurrencyDisplay': 6974,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = p);
                var a = c(e('react')),
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  i = e('../../../hooks/useCurrencyDisplay'),
                  s = e('../../../../shared/constants/common'),
                  l = e('../../component-library'),
                  u = e('../../../helpers/constants/design-system');
                function c(e) {
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
                function p({
                  account: e,
                  value: t,
                  displayValue: n,
                  'data-testid': r,
                  style: s,
                  className: c,
                  prefix: p,
                  prefixComponent: f,
                  hideLabel: m,
                  hideTitle: h,
                  numberOfDecimals: g,
                  denomination: y,
                  currency: b,
                  suffix: v,
                  prefixComponentWrapperProps: _ = {},
                  textProps: T = {},
                  suffixProps: C = {},
                  isAggregatedFiatOverviewBalance: k = !1,
                  privacyMode: w = !1,
                  ...E
                }) {
                  const [x, M] = (0, i.useCurrencyDisplay)(t, {
                    account: e,
                    displayValue: n,
                    prefix: p,
                    numberOfDecimals: g,
                    hideLabel: m,
                    denomination: y,
                    currency: b,
                    suffix: v,
                    isAggregatedFiatOverviewBalance: k,
                  });
                  return a.default.createElement(
                    l.Box,
                    d(
                      {
                        className: (0, o.default)('currency-display-component', c),
                        'data-testid': r,
                        style: s,
                        title: (!h && !w && x) || null,
                        display: u.Display.Flex,
                        alignItems: u.AlignItems.center,
                        flexWrap: u.FlexWrap.Wrap,
                      },
                      E
                    ),
                    f
                      ? a.default.createElement(
                          l.Box,
                          d(
                            {
                              className: 'currency-display-component__prefix',
                              marginInlineEnd: 1,
                              variant: u.TextVariant.inherit,
                            },
                            _
                          ),
                          f
                        )
                      : null,
                    a.default.createElement(
                      l.SensitiveText,
                      d(
                        {
                          as: 'span',
                          className: 'currency-display-component__text',
                          ellipsis: !0,
                          variant: u.TextVariant.inherit,
                          isHidden: w,
                          'data-testid': 'account-value-and-suffix',
                        },
                        T
                      ),
                      M.prefix,
                      M.value
                    ),
                    M.suffix
                      ? a.default.createElement(
                          l.SensitiveText,
                          d(
                            {
                              as: 'span',
                              className: w
                                ? 'currency-display-component__text'
                                : 'currency-display-component__suffix',
                              marginInlineStart: w ? 0 : 1,
                              variant: u.TextVariant.inherit,
                              isHidden: w,
                            },
                            C
                          ),
                          M.suffix
                        )
                      : null
                  );
                }
                const f = {
                  className: r.default.string,
                  account: r.default.object,
                  currency: r.default.string,
                  'data-testid': r.default.string,
                  denomination: r.default.oneOf([
                    s.EtherDenomination.GWEI,
                    s.EtherDenomination.ETH,
                  ]),
                  displayValue: r.default.string,
                  hideLabel: r.default.bool,
                  hideTitle: r.default.bool,
                  numberOfDecimals: r.default.oneOfType([r.default.string, r.default.number]),
                  prefix: r.default.string,
                  prefixComponent: r.default.node,
                  style: r.default.object,
                  suffix: r.default.oneOfType([r.default.string, r.default.bool]),
                  value: r.default.string,
                  prefixComponentWrapperProps: r.default.object,
                  textProps: r.default.object,
                  suffixProps: r.default.object,
                  isAggregatedFiatOverviewBalance: r.default.bool,
                  privacyMode: r.default.bool,
                };
                p.propTypes = f;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/currency-display/currency-display.component.js',
      },
    ],
    [
      6720,
      { './currency-display.component': 6719 },
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
                  r = (a = e('./currency-display.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/currency-display/index.js' },
    ],
    [
      6721,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../tooltip': 6818,
        lodash: 4921,
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
                  o = e('lodash'),
                  i = e('../../../helpers/constants/design-system'),
                  s = u(e('../tooltip')),
                  l = e('../../component-library');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const d = {
                  [i.Size.XS]: 0,
                  [i.Size.SM]: 2,
                  [i.Size.MD]: 4,
                  [i.Size.LG]: 6,
                  [i.Size.XL]: 8,
                };
                function p({
                  dictionary: e,
                  termTypography: t = {},
                  definitionTypography: n = {},
                  tooltips: r = {},
                  warnings: o = {},
                  gapSize: u = i.Size.SM,
                }) {
                  return a.default.createElement(
                    'dl',
                    { className: 'definition-list' },
                    Object.entries(e).map(([e, p]) =>
                      a.default.createElement(
                        a.default.Fragment,
                        { key: `definition-for-${e}` },
                        a.default.createElement(
                          l.Text,
                          c({ variant: i.TextVariant.bodyMdMedium }, t, {
                            marginTop: 0,
                            marginBottom: 1,
                            className: 'definition-list__term',
                            as: 'dt',
                          }),
                          e,
                          r[e] &&
                            a.default.createElement(
                              s.default,
                              {
                                title: r[e],
                                position: 'top',
                                containerClassName: 'definition-list__tooltip-wrapper',
                              },
                              a.default.createElement(l.Icon, {
                                name: l.IconName.Question,
                                size: l.IconSize.Sm,
                                marginLeft: 1,
                                color: i.IconColor.iconDefault,
                              })
                            )
                        ),
                        a.default.createElement(
                          l.Text,
                          c(
                            { variant: i.TextVariant.bodyMd, color: i.TextColor.textAlternative },
                            n,
                            {
                              marginTop: 0,
                              marginBottom: d[u],
                              className: 'definition-list__definition',
                              overflowWrap: i.OverflowWrap.BreakWord,
                              as: 'dd',
                            }
                          ),
                          p
                        ),
                        o[e] &&
                          a.default.createElement(
                            l.Text,
                            { variant: i.TextVariant.bodySm, color: i.TextColor.warningDefault },
                            o[e]
                          )
                      )
                    )
                  );
                }
                p.propTypes = {
                  gapSize: r.default.oneOf(Object.values(i.Size)),
                  dictionary: r.default.objectOf(
                    r.default.oneOfType([r.default.string, r.default.number])
                  ),
                  tooltips: r.default.objectOf(r.default.string),
                  warnings: r.default.objectOf(r.default.string),
                  termTypography: r.default.shape({
                    ...(0, o.omit)(i.TextVariant.propTypes, ['tag', 'className', 'boxProps']),
                  }),
                  definitionTypography: r.default.shape({
                    ...(0, o.omit)(i.TextVariant.propTypes, ['tag', 'className', 'boxProps']),
                  }),
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/definition-list/definition-list.js' },
    ],
    [
      6722,
      { './definition-list': 6721 },
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
                  r = (a = e('./definition-list')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/definition-list/index.js' },
    ],
    [
      6723,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../icon/preloader/preloader-icon.component': 6752,
        './utils': 6726,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Delineator = void 0);
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
                  r = u(e('classnames')),
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../../component-library'),
                  s = u(e('../icon/preloader/preloader-icon.component')),
                  l = e('./utils');
                function u(e) {
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
                const p = () =>
                    a.default.createElement(
                      'div',
                      { role: 'progressbar' },
                      a.default.createElement(s.default, { size: 16 })
                    ),
                  f = ({ isExpanded: e }) =>
                    a.default.createElement(i.Icon, {
                      name: e ? i.IconName.ArrowUp : i.IconName.ArrowDown,
                      size: i.IconSize.Sm,
                      color: o.IconColor.primaryDefault,
                    }),
                  m = ({
                    headerComponent: e,
                    iconName: t,
                    isCollapsible: n,
                    isExpanded: s,
                    isLoading: u,
                    isDisabled: c,
                    onHeaderClick: m,
                    type: h,
                  }) => {
                    const g = (0, l.getIconPropsByType)(h);
                    return a.default.createElement(
                      i.Box,
                      {
                        className: (0, r.default)({
                          delineator__header: !0,
                          'delineator__header--expanded': s,
                          'delineator__header--loading': u,
                          'delineator__header--disabled': c,
                        }),
                        display: o.Display.Flex,
                        alignItems: o.AlignItems.center,
                        justifyContent: o.JustifyContent.spaceBetween,
                        paddingTop: 2,
                        paddingRight: 4,
                        paddingBottom: s ? 0 : 2,
                        paddingLeft: 4,
                        onClick: m,
                      },
                      a.default.createElement(
                        i.Box,
                        { display: o.Display.Flex, alignItems: o.AlignItems.center },
                        t && a.default.createElement(i.AvatarIcon, d({ iconName: t }, g)),
                        (0, l.overrideTextComponentColorByType)({ component: e, type: h })
                      ),
                      n &&
                        (u
                          ? a.default.createElement(p, null)
                          : a.default.createElement(f, { isExpanded: s }))
                    );
                  },
                  h = ({ children: e, contentBoxProps: t }) =>
                    a.default.createElement(
                      i.Box,
                      d(
                        {
                          paddingTop: 2,
                          paddingRight: 4,
                          paddingBottom: 4,
                          paddingLeft: 4,
                          flexDirection: o.FlexDirection.Column,
                        },
                        t
                      ),
                      e
                    ),
                  g = ({ children: e, wrapperBoxProps: t }) =>
                    a.default.createElement(
                      i.Box,
                      d(
                        {
                          className: 'delineator__wrapper',
                          display: o.Display.Flex,
                          flexDirection: o.FlexDirection.Column,
                          backgroundColor: o.BackgroundColor.backgroundDefault,
                          borderRadius: o.BorderRadius.LG,
                        },
                        t
                      ),
                      e
                    );
                n.Delineator = ({
                  children: e,
                  headerComponent: t,
                  iconName: n,
                  isCollapsible: r = !0,
                  isExpanded: o,
                  isLoading: i = !1,
                  isDisabled: s = !1,
                  onExpandChange: l,
                  type: u,
                  wrapperBoxProps: c,
                  contentBoxProps: d,
                }) => {
                  const [p, f] = (0, a.useState)(o || !1),
                    y = !r || (r && p),
                    b = (0, a.useCallback)(() => {
                      if (s || i || !r) return;
                      const e = !p;
                      null == l || l(e), f(e);
                    }, [i, r, p, s, l]);
                  return a.default.createElement(
                    g,
                    { wrapperBoxProps: c },
                    a.default.createElement(m, {
                      headerComponent: t,
                      iconName: n,
                      isCollapsible: r,
                      isExpanded: p,
                      isLoading: i,
                      isDisabled: s,
                      onHeaderClick: b,
                      type: u,
                    }),
                    y && !i && a.default.createElement(h, { contentBoxProps: d }, e)
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/delineator/delineator.tsx' },
    ],
    [
      6724,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.DelineatorType = void 0);
                n.DelineatorType = (function (e) {
                  return (e.Error = 'error'), (e.Default = 'default'), e;
                })({});
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/delineator/delineator.types.ts' },
    ],
    [
      6725,
      { './delineator': 6723 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Delineator', {
                    enumerable: !0,
                    get: function () {
                      return a.Delineator;
                    },
                  });
                var a = e('./delineator');
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/delineator/index.ts' },
    ],
    [
      6726,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        './delineator.types': 6724,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.overrideTextComponentColorByType = n.getIconPropsByType = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../../component-library'),
                  s = e('./delineator.types');
                const l = { size: i.AvatarIconSize.Xs };
                n.getIconPropsByType = e => {
                  let t;
                  const n = { color: o.IconColor.infoInverse };
                  if (e === s.DelineatorType.Error) t = o.BackgroundColor.errorDefault;
                  else t = o.BackgroundColor.overlayAlternative;
                  return { ...l, iconProps: n, backgroundColor: t };
                };
                n.overrideTextComponentColorByType = ({ component: e, type: t }) => {
                  const n = (e =>
                    e === s.DelineatorType.Error
                      ? o.TextColor.errorDefault
                      : o.TextColor.textDefault)(t);
                  return r.default.cloneElement(e, { color: n });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/delineator/utils.ts' },
    ],
    [
      6727,
      {
        '../../../../shared/constants/network': 5804,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
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
                  (n.default = function () {
                    const { chainId: e, rpcUrl: t } = (0, r.useSelector)(s.getCurrentNetwork) ?? {},
                      n = (0, r.useSelector)(l.getNetworkConfigurationsByChainId),
                      [f, h] = (0, a.useState)(!1),
                      g = (0, r.useSelector)(u.getCompletedOnboarding),
                      y = (0, o.useI18nContext)(),
                      b = (0, r.useDispatch)();
                    if (!g || f) return null;
                    let v;
                    e === d.CHAIN_IDS.GOERLI ||
                    e === d.CHAIN_IDS.LINEA_GOERLI ||
                    e === d.CHAIN_IDS.ARBITRUM_GOERLI ||
                    e === d.CHAIN_IDS.OPTIMISM_GOERLI
                      ? (v = {
                          description: y('deprecatedGoerliNtwrkMsg'),
                          actionButtonLabel: y('learnMoreUpperCase'),
                          actionButtonProps: {
                            href: 'https://github.com/eth-clients/goerli#goerli-goerlitzer-testnet',
                            externalLink: !0,
                          },
                        })
                      : d.DEPRECATED_NETWORKS.includes(e)
                        ? (v = { description: y('deprecatedNetwork') })
                        : e === d.CHAIN_IDS.AURORA &&
                          t.startsWith('https://aurora-mainnet.infura.io/') &&
                          (v = {
                            description: y('auroraRpcDeprecationMessage'),
                            actionButtonLabel: y('switchToNetwork', ['mainnet.aurora.dev']),
                            actionButtonOnClick: async () => {
                              h(!0);
                              const t = n[e];
                              (t.rpcEndpoints[t.defaultRpcEndpointIndex].url =
                                'https://mainnet.aurora.dev'),
                                await b((0, p.updateNetwork)(t));
                            },
                          });
                    return v
                      ? a.default.createElement(
                          c.Box,
                          {
                            className: 'deprecated-networks',
                            backgroundColor: i.BackgroundColor.backgroundDefault,
                            padding: 4,
                            borderRadius: i.BorderRadius.SM,
                          },
                          a.default.createElement(
                            c.BannerAlert,
                            m({ severity: i.Severity.Warning, onClose: () => h(!0) }, v)
                          )
                        )
                      : null;
                  });
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
                  o = e('../../../hooks/useI18nContext'),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../selectors'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  u = e('../../../ducks/metamask/metamask'),
                  c = e('../../component-library'),
                  d = e('../../../../shared/constants/network'),
                  p = e('../../../store/actions');
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
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/deprecated-networks/deprecated-networks.js' },
    ],
    [
      6728,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.DisclosureVariant = void 0);
                n.DisclosureVariant = (function (e) {
                  return (e.Default = 'default'), (e.Arrow = 'arrow'), e;
                })({});
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/disclosure/disclosure.constants.ts' },
    ],
    [
      6729,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        './disclosure.constants': 6728,
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
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('./disclosure.constants');
                function u(e) {
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
                const d = ({
                  children: e,
                  isScrollToBottomOnOpen: t,
                  title: n,
                  size: r,
                  variant: u,
                }) => {
                  const c = (0, a.useRef)(null),
                    [d, p] = (0, a.useState)(!1);
                  return (
                    (0, a.useEffect)(() => {
                      var e;
                      t &&
                        d &&
                        (null == c ||
                          null === (e = c.current) ||
                          void 0 === e ||
                          e.scrollIntoView({ behavior: 'smooth' }));
                    }, [t, d]),
                    a.default.createElement(
                      'div',
                      {
                        className: 'disclosure',
                        'data-testid': 'disclosure',
                        onClick: () => p(e => !e),
                      },
                      n
                        ? a.default.createElement(
                            'details',
                            null,
                            ((e, t, n) => {
                              if (e === l.DisclosureVariant.Arrow) {
                                const e =
                                  'small' === n ? s.TextVariant.bodySm : s.TextVariant.bodyMd;
                                return a.default.createElement(
                                  'summary',
                                  { className: 'disclosure__summary is-arrow' },
                                  a.default.createElement(
                                    i.Text,
                                    { color: s.Color.primaryDefault, variant: e },
                                    t
                                  ),
                                  a.default.createElement(i.Icon, {
                                    className: 'disclosure__summary--icon',
                                    color: s.Color.primaryDefault,
                                    name: i.IconName.ArrowUp,
                                    size: i.IconSize.Sm,
                                    marginInlineStart: 2,
                                  })
                                );
                              }
                              return a.default.createElement(
                                'summary',
                                { className: 'disclosure__summary' },
                                a.default.createElement(i.Icon, {
                                  className: 'disclosure__summary--icon',
                                  name: i.IconName.Add,
                                  size: i.IconSize.Sm,
                                  marginInlineEnd: 2,
                                }),
                                t
                              );
                            })(u, n),
                            a.default.createElement(
                              'div',
                              { className: (0, o.default)('disclosure__content', r) },
                              e
                            ),
                            a.default.createElement('div', {
                              ref: c,
                              className: 'disclosure__footer',
                            })
                          )
                        : e
                    )
                  );
                };
                (d.propTypes = {
                  children: r.default.node.isRequired,
                  isScrollToBottomOnOpen: r.default.bool,
                  size: r.default.string,
                  title: r.default.string,
                  variant: r.default.string,
                }),
                  (d.defaultProps = {
                    isScrollToBottomOnOpen: !1,
                    size: 'normal',
                    title: null,
                    variant: l.DisclosureVariant.Default,
                  });
                n.default = d;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/disclosure/disclosure.js' },
    ],
    [
      6730,
      { './disclosure': 6729 },
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
                  r = (a = e('./disclosure')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/disclosure/index.js' },
    ],
    [
      6731,
      { '../../component-library': 6402, classnames: 4168, 'prop-types': 5082, react: 5328 },
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
                  i = e('../../component-library');
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
                const u = ({
                  className: e,
                  disabled: t = !1,
                  onChange: n,
                  options: r,
                  selectedOption: s = '',
                  style: l,
                  title: u,
                  'data-testid': c,
                }) => {
                  const d = (0, a.useCallback)(
                    e => {
                      e.preventDefault(), e.stopPropagation(), n(e.target.value);
                    },
                    [n]
                  );
                  return a.default.createElement(
                    'div',
                    { className: (0, o.default)('dropdown', e) },
                    a.default.createElement(
                      'select',
                      {
                        className: 'dropdown__select',
                        'data-testid': c,
                        disabled: t,
                        title: u,
                        onChange: d,
                        style: l,
                        value: s,
                      },
                      r.map(e =>
                        a.default.createElement(
                          'option',
                          { key: e.value, value: e.value, disabled: e.disabled },
                          e.name || e.value
                        )
                      )
                    ),
                    a.default.createElement(i.Icon, {
                      name: i.IconName.ArrowDown,
                      size: i.IconSize.Sm,
                      className: 'dropdown__icon-caret-down',
                    })
                  );
                };
                u.propTypes = {
                  className: r.default.string,
                  disabled: r.default.bool,
                  title: r.default.string,
                  onChange: r.default.func.isRequired,
                  options: r.default.arrayOf(
                    r.default.exact({ name: r.default.string, value: r.default.string.isRequired })
                  ).isRequired,
                  selectedOption: r.default.string,
                  style: r.default.object,
                  'data-testid': r.default.string,
                };
                n.default = u;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/dropdown/dropdown.js' },
    ],
    [
      6732,
      { './dropdown': 6731 },
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
                  r = (a = e('./dropdown')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/dropdown/index.js' },
    ],
    [
      6733,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/accounts': 6896,
        '../../component-library': 6402,
        '../../component-library/form-text-field/deprecated': 6390,
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
                  r = c(e('classnames')),
                  o = c(e('prop-types')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../helpers/utils/accounts'),
                  l = e('../../component-library'),
                  u = e('../../component-library/form-text-field/deprecated');
                function c(e) {
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
                class f extends a.Component {
                  constructor(...e) {
                    super(...e),
                      p(this, 'state', { isEditing: !1, value: this.props.defaultValue || '' });
                  }
                  async handleSubmit(e) {
                    e &&
                      (await this.props.onSubmit(this.state.value.trim()),
                      this.setState({ isEditing: !1 }));
                  }
                  renderEditing() {
                    const { isValidAccountName: e, errorMessage: t } = (0,
                    s.getAccountNameErrorMessage)(
                      this.props.accounts,
                      this.context,
                      this.state.value,
                      this.props.defaultValue
                    );
                    return a.default.createElement(
                      l.Box,
                      {
                        className: (0, r.default)('editable-label', this.props.className),
                        display: i.Display.Flex,
                        gap: 3,
                      },
                      a.default.createElement(u.FormTextField, {
                        required: !0,
                        value: this.state.value,
                        onKeyPress: t => {
                          'Enter' === t.key && this.handleSubmit(e);
                        },
                        onChange: e => {
                          this.setState({ value: e.target.value });
                        },
                        'data-testid': 'editable-input',
                        error: !e,
                        helpText: t,
                        autoFocus: !0,
                        placeholder: this.context.t('accountName'),
                      }),
                      a.default.createElement(l.ButtonIcon, {
                        iconName: l.IconName.Check,
                        onClick: () => this.handleSubmit(e),
                        'data-testid': 'save-account-label-input',
                      })
                    );
                  }
                  renderReadonly() {
                    return a.default.createElement(
                      l.Box,
                      { display: i.Display.Flex, alignItems: i.AlignItems.center, gap: 3 },
                      a.default.createElement(
                        l.Text,
                        { variant: i.TextVariant.bodyLgMedium, style: { wordBreak: 'break-word' } },
                        this.state.value
                      ),
                      a.default.createElement(l.ButtonIcon, {
                        iconName: l.IconName.Edit,
                        ariaLabel: this.context.t('edit'),
                        'data-testid': 'editable-label-button',
                        onClick: () => this.setState({ isEditing: !0 }),
                        color: i.Color.iconDefault,
                      })
                    );
                  }
                  render() {
                    return this.state.isEditing ? this.renderEditing() : this.renderReadonly();
                  }
                }
                (n.default = f),
                  p(f, 'propTypes', {
                    onSubmit: o.default.func.isRequired,
                    defaultValue: o.default.string,
                    className: o.default.string,
                    accounts: o.default.array,
                  }),
                  p(f, 'contextTypes', { t: o.default.func });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/editable-label/editable-label.js' },
    ],
    [
      6734,
      {
        '../../../helpers/constants/design-system': 6872,
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
                var a = s(e('react')),
                  r = s(e('prop-types')),
                  o = e('../../component-library'),
                  i = e('../../../helpers/constants/design-system');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const l = (e, t) => {
                  const { errorMessage: n, errorKey: r } = e,
                    s = r ? t.t(r) : n;
                  return a.default.createElement(
                    'div',
                    { className: 'error-message' },
                    a.default.createElement(o.Icon, {
                      className: 'error-message__icon',
                      name: o.IconName.Warning,
                      size: o.IconSize.Sm,
                      color: i.IconColor.errorDefault,
                      marginRight: 2,
                    }),
                    a.default.createElement('div', { className: 'error-message__text' }, s)
                  );
                };
                (l.propTypes = { errorMessage: r.default.string, errorKey: r.default.string }),
                  (l.contextTypes = { t: r.default.func });
                n.default = l;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/error-message/error-message.component.js' },
    ],
    [
      6735,
      { './error-message.component': 6734 },
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
                  r = (a = e('./error-message.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/error-message/index.js' },
    ],
    [
      6736,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useCopyToClipboard': 6973,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = e('../../../hooks/useI18nContext'),
                  i = e('../../../hooks/useCopyToClipboard'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../component-library');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c({ text: e = '', onClickCopy: t = null }) {
                  const n = (0, o.useI18nContext)(),
                    [r, u] = (0, i.useCopyToClipboard)(6e4);
                  return a.default.createElement(
                    l.Box,
                    {
                      display: s.Display.Flex,
                      justifyContent: s.JustifyContent.center,
                      flexDirection: s.FlexDirection.Column,
                      alignItems: s.AlignItems.center,
                      borderColor: s.BorderColor.borderDefault,
                      borderRadius: s.BorderRadius.MD,
                      padding: 4,
                      gap: 4,
                    },
                    a.default.createElement(
                      l.Text,
                      {
                        display: s.Display.Flex,
                        justifyContent: s.JustifyContent.center,
                        className: 'notranslate',
                        variant: s.TextVariant.bodyLgMedium,
                        'data-testid': 'srp_text',
                      },
                      e
                    ),
                    a.default.createElement(
                      l.ButtonSecondary,
                      {
                        className: 'export-text-container__button',
                        block: !0,
                        onClick: () => {
                          t && t(), u(e);
                        },
                      },
                      n(r ? 'copiedExclamation' : 'copyToClipboard')
                    )
                  );
                }
                c.propTypes = { text: r.default.string, onClickCopy: r.default.func };
                n.default = a.default.memo(c);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/export-text-container/export-text-container.component.js',
      },
    ],
    [
      6737,
      { './export-text-container.component': 6736 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r =
                    (a = e('./export-text-container.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/export-text-container/index.js' },
    ],
    [
      6738,
      {
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../../component-library/form-text-field/deprecated': 6390,
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
                  (n.default = function ({
                    hideDropdownIfNoOptions: e = !1,
                    maxDropdownHeight: t,
                    noOptionsText: n,
                    onChange: a,
                    onOptionClick: c,
                    options: d,
                    placeholder: f,
                    value: m,
                  }) {
                    const [h, g] = (0, r.useState)(!1),
                      y = (0, r.useRef)(),
                      [b, v] = (0, r.useState)(0),
                      _ = (0, r.useRef)(null),
                      T = (0, r.useContext)(l.I18nContext);
                    (0, r.useEffect)(() => {
                      var e;
                      v(null === (e = y.current) || void 0 === e ? void 0 : e.offsetWidth);
                    });
                    const C = (0, r.useCallback)(
                        e => {
                          var t;
                          'form-combo-field__option' !==
                            (null == e || null === (t = e.relatedTarget) || void 0 === t
                              ? void 0
                              : t.className) && g(!1);
                        },
                        [g]
                      ),
                      k = (0, r.useCallback)(
                        e => {
                          null == a || a(e.target.value);
                        },
                        [a]
                      ),
                      w = (0, r.useCallback)(
                        e => {
                          var t;
                          g(!1),
                            e && (k({ target: { value: e.value } }), null == c || c(e)),
                            null === (t = _.current) || void 0 === t || t.focus();
                        },
                        [g, k]
                      ),
                      E = (0, r.useCallback)(() => {
                        var e;
                        k({ target: { value: '' } }),
                          null === (e = _.current) || void 0 === e || e.focus();
                      }, [k]);
                    return r.default.createElement(
                      'div',
                      { className: 'form-combo-field', ref: y },
                      r.default.createElement(
                        'div',
                        {
                          onClick: () => {
                            g(!0);
                          },
                        },
                        r.default.createElement(s.FormTextField, {
                          autoFocus: !0,
                          inputRef: _,
                          placeholder: f,
                          onBlur: C,
                          onKeyUp: e => {
                            'Enter' === e.key && C();
                          },
                          value: m,
                          onChange: k,
                          className: (0, o.default)({
                            'form-combo-field__value': !0,
                            'form-combo-field__value-dropdown-visible': h,
                          }),
                          endAccessory: r.default.createElement(i.ButtonIcon, {
                            display: u.Display.Flex,
                            iconName: i.IconName.Close,
                            size: i.ButtonIconSize.Sm,
                            onClick: () => E(),
                            color: u.IconColor.iconMuted,
                            ariaLabel: T('clear'),
                          }),
                        })
                      ),
                      h &&
                        r.default.createElement(p, {
                          hideDropdownIfNoOptions: e,
                          maxDropdownHeight: t,
                          noOptionsText: n,
                          onOptionClick: w,
                          options: d,
                          width: b,
                        })
                    );
                  });
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
                  o = (a = e('classnames')) && a.__esModule ? a : { default: a },
                  i = e('../../component-library'),
                  s = e('../../component-library/form-text-field/deprecated'),
                  l = e('../../../contexts/i18n'),
                  u = e('../../../helpers/constants/design-system');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function d({ option: e, onClick: t }) {
                  const n = (0, r.useCallback)(
                      n => {
                        n.preventDefault(),
                          n.stopPropagation(),
                          n.nativeEvent.stopImmediatePropagation(),
                          t(e);
                      },
                      [t, e]
                    ),
                    { primaryLabel: a, secondaryLabel: o, value: i } = e;
                  return r.default.createElement(
                    'div',
                    { tabIndex: 0, className: 'form-combo-field__option', onClick: n },
                    r.default.createElement(
                      'span',
                      { className: 'form-combo-field__option-primary' },
                      a ?? i
                    ),
                    o
                      ? r.default.createElement(
                          'span',
                          { className: 'form-combo-field__option-secondary' },
                          o
                        )
                      : null
                  );
                }
                function p({
                  hideDropdownIfNoOptions: e,
                  maxDropdownHeight: t,
                  noOptionsText: n,
                  onOptionClick: a,
                  options: i,
                  width: s,
                }) {
                  const u = (0, r.useContext)(l.I18nContext),
                    c = (0, r.useRef)(),
                    p = t ?? 179,
                    [f, m] = (0, r.useState)(0);
                  return (
                    (0, r.useEffect)(() => {
                      var e;
                      m((null === (e = c.current) || void 0 === e ? void 0 : e.scrollHeight) ?? 0);
                    }),
                    r.default.createElement(
                      'div',
                      {
                        ref: c,
                        style: { width: s, maxHeight: p },
                        className: (0, o.default)({
                          'form-combo-field__dropdown': !0,
                          'form-combo-field__dropdown__scroll': f > p,
                        }),
                      },
                      0 === i.length &&
                        !e &&
                        r.default.createElement(d, {
                          option: { primaryLabel: n ?? u('comboNoOptions'), value: '' },
                          onClick: () => a(undefined),
                        }),
                      i.map((e, t) =>
                        r.default.createElement(d, {
                          key: t,
                          option: e,
                          onClick: () => {
                            a(e);
                          },
                        })
                      )
                    )
                  );
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/form-combo-field/form-combo-field.tsx' },
    ],
    [
      6739,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../info-tooltip/info-tooltip': 6761,
        '../numeric-input/numeric-input.component': 6781,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = p);
                var a = c(e('react')),
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  i = e('../../../helpers/constants/design-system'),
                  s = c(e('../numeric-input/numeric-input.component')),
                  l = c(e('../info-tooltip/info-tooltip')),
                  u = e('../../component-library');
                function c(e) {
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
                function p({
                  dataTestId: e,
                  titleText: t = '',
                  TitleTextCustomComponent: n,
                  titleUnit: r = '',
                  TitleUnitCustomComponent: c,
                  tooltipText: p = '',
                  TooltipCustomComponent: f,
                  titleDetail: m = '',
                  titleDetailWrapperProps: h,
                  titleHeadingWrapperProps: g,
                  error: y,
                  onChange: b = undefined,
                  value: v = 0,
                  numeric: _,
                  detailText: T = '',
                  autoFocus: C = !1,
                  password: k = !1,
                  allowDecimals: w = !1,
                  disabled: E = !1,
                  placeholder: x,
                  warning: M,
                  warningProps: O,
                  passwordStrength: I,
                  passwordStrengthText: N,
                  id: S,
                  inputProps: P,
                  wrappingLabelProps: A,
                  inputRef: j,
                }) {
                  return a.default.createElement(
                    'div',
                    { className: (0, o.default)('form-field', { 'form-field__row--error': y }) },
                    a.default.createElement(
                      u.Box,
                      d({ as: 'label' }, A),
                      a.default.createElement(
                        'div',
                        { className: 'form-field__heading' },
                        a.default.createElement(
                          u.Box,
                          d(
                            {
                              className: 'form-field__heading-title',
                              display: i.Display.Flex,
                              alignItems: i.AlignItems.baseline,
                            },
                            g
                          ),
                          n ||
                            (t &&
                              a.default.createElement(
                                u.Text,
                                {
                                  as: 'h6',
                                  variant: i.TextVariant.bodySmBold,
                                  display: i.Display.InlineBlock,
                                },
                                t
                              )),
                          c ||
                            (r &&
                              a.default.createElement(
                                u.Text,
                                {
                                  as: 'h6',
                                  variant: i.TextVariant.bodySm,
                                  color: i.TextColor.textAlternative,
                                  display: i.Display.InlineBlock,
                                },
                                r
                              )),
                          f ||
                            (p &&
                              a.default.createElement(l.default, {
                                position: 'top',
                                contentText: p,
                              }))
                        ),
                        m &&
                          a.default.createElement(
                            u.Box,
                            d(
                              {
                                className: 'form-field__heading-detail',
                                textAlign: i.TextAlign.End,
                                marginRight: 2,
                              },
                              h
                            ),
                            m
                          )
                      ),
                      _
                        ? a.default.createElement(s.default, {
                            error: y,
                            onChange: b,
                            value: v,
                            detailText: T,
                            autoFocus: C,
                            allowDecimals: w,
                            disabled: E,
                            dataTestId: e,
                            placeholder: x,
                            id: S,
                            inputRef: j,
                          })
                        : a.default.createElement(
                            'input',
                            d(
                              {
                                className: (0, o.default)('form-field__input', {
                                  'form-field__input--error': y,
                                  'form-field__input--warning': M,
                                }),
                                onChange: e => b(e.target.value),
                                value: v,
                                type: k ? 'password' : 'text',
                                autoFocus: C,
                                disabled: E,
                                'data-testid': e,
                                placeholder: x,
                                id: S,
                                ref: j,
                              },
                              P
                            )
                          ),
                      y &&
                        a.default.createElement(
                          u.Text,
                          {
                            color: i.TextColor.errorDefault,
                            variant: i.TextVariant.bodySm,
                            as: 'h6',
                            className: 'form-field__error',
                          },
                          y
                        ),
                      M &&
                        a.default.createElement(
                          u.Text,
                          d(
                            {
                              color: i.TextColor.textAlternative,
                              variant: i.TextVariant.bodySm,
                              as: 'h6',
                              className: 'form-field__warning',
                            },
                            O
                          ),
                          M
                        ),
                      I &&
                        a.default.createElement(
                          u.Text,
                          {
                            color: i.TextColor.textDefault,
                            variant: i.TextVariant.bodySm,
                            as: 'h6',
                            className: 'form-field__password-strength',
                          },
                          I
                        ),
                      N &&
                        a.default.createElement(
                          u.Text,
                          {
                            color: i.TextColor.textAlternative,
                            variant: i.TextVariant.bodyXs,
                            as: 'h6',
                            className: 'form-field__password-strength-text',
                          },
                          N
                        )
                    )
                  );
                }
                p.propTypes = {
                  dataTestId: r.default.string,
                  titleText: r.default.oneOfType([r.default.string, r.default.node]),
                  TitleTextCustomComponent: r.default.node,
                  titleUnit: r.default.string,
                  TitleUnitCustomComponent: r.default.node,
                  tooltipText: r.default.oneOfType([r.default.string, r.default.node]),
                  TooltipCustomComponent: r.default.node,
                  titleDetail: r.default.oneOfType([r.default.string, r.default.node]),
                  titleDetailWrapperProps: r.default.shape({ ...u.Box.propTypes }),
                  titleHeadingWrapperProps: r.default.shape({ ...u.Box.propTypes }),
                  error: r.default.string,
                  warning: r.default.string,
                  warningProps: r.default.shape({ ...u.Text.propTypes }),
                  onChange: r.default.func,
                  value: r.default.oneOfType([r.default.number, r.default.string]),
                  detailText: r.default.string,
                  autoFocus: r.default.bool,
                  numeric: r.default.bool,
                  password: r.default.bool,
                  allowDecimals: r.default.bool,
                  disabled: r.default.bool,
                  placeholder: r.default.string,
                  passwordStrength: r.default.oneOfType([r.default.string, r.default.node]),
                  passwordStrengthText: r.default.string,
                  id: r.default.string,
                  inputProps: r.default.object,
                  wrappingLabelProps: r.default.object,
                  inputRef: r.default.object,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/form-field/form-field.js' },
    ],
    [
      6740,
      { './form-field': 6739 },
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
                  r = (a = e('./form-field')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/form-field/index.js' },
    ],
    [
      6741,
      { '../../../../shared/modules/conversion.utils': 5858, 'prop-types': 5082, react: 5328 },
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
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('../../../../shared/modules/conversion.utils');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                class l extends r.PureComponent {
                  render() {
                    const { className: e, value: t } = this.props,
                      n = (0, i.hexToDecimal)(t);
                    return r.default.createElement('div', { className: e }, n);
                  }
                }
                (n.default = l),
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
                  })(l, 'propTypes', { className: o.default.string, value: o.default.string });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/hex-to-decimal/hex-to-decimal.component.js' },
    ],
    [
      6742,
      { './hex-to-decimal.component': 6741 },
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
                  r = (a = e('./hex-to-decimal.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/hex-to-decimal/index.js' },
    ],
    [
      6743,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../tooltip/tooltip': 6819,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = u(e('../tooltip/tooltip'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = e => e;
                function d(e) {
                  const {
                      onClick: t,
                      Icon: n,
                      disabled: r,
                      label: u,
                      tooltipRender: d,
                      className: p,
                      iconButtonClassName: f = '',
                      ...m
                    } = e,
                    h = d ?? c;
                  return a.default.createElement(
                    'button',
                    {
                      className: (0, o.default)('icon-button', p, { 'icon-button--disabled': r }),
                      'data-testid': m['data-testid'] ?? undefined,
                      onClick: t,
                      disabled: r,
                    },
                    h(
                      a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(
                          'div',
                          {
                            'data-theme': 'light',
                            className: (0, o.default)('icon-button__circle', f),
                          },
                          n
                        ),
                        u.length > 10
                          ? a.default.createElement(
                              l.default,
                              { title: u, position: 'bottom' },
                              a.default.createElement(
                                i.Text,
                                {
                                  className: 'icon-button__label-large',
                                  ellipsis: !0,
                                  variant: s.TextVariant.bodySm,
                                },
                                u
                              )
                            )
                          : a.default.createElement(
                              i.Text,
                              {
                                className: 'icon-button__label',
                                ellipsis: !0,
                                variant: s.TextVariant.bodySm,
                              },
                              u
                            )
                      )
                    )
                  );
                }
                d.propTypes = {
                  onClick: r.default.func.isRequired,
                  Icon: r.default.object.isRequired,
                  disabled: r.default.bool,
                  label: r.default.string.isRequired,
                  tooltipRender: r.default.func,
                  className: r.default.string,
                  iconButtonClassName: r.default.string,
                  'data-testid': r.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon-button/icon-button.js' },
    ],
    [
      6744,
      { './icon-button': 6743 },
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
                  r = (a = e('./icon-button')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon-button/index.js' },
    ],
    [
      6745,
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
                  r = i(e('prop-types')),
                  o = i(e('classnames'));
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
                const u = ({
                  name: e = '',
                  icon: t = null,
                  size: n,
                  className: r,
                  fallbackClassName: i,
                  wrapperClassName: s,
                  ...u
                }) => {
                  const [c, d] = (0, a.useState)(!1),
                    p = n ? { height: `${n}px`, width: `${n}px` } : {};
                  return a.default.createElement(
                    'div',
                    { className: (0, o.default)(s), style: p },
                    !c && t
                      ? a.default.createElement(
                          'img',
                          l(
                            {
                              onError: () => {
                                d(!0);
                              },
                              src: t,
                              style: p,
                              className: r,
                              alt: e || 'icon',
                            },
                            u
                          )
                        )
                      : a.default.createElement(
                          'span',
                          { className: (0, o.default)('icon-with-fallback__fallback', i) },
                          (null == e ? void 0 : e.charAt(0).toUpperCase()) || ''
                        )
                  );
                };
                u.propTypes = {
                  icon: r.default.string,
                  name: r.default.string,
                  size: r.default.number,
                  className: r.default.string,
                  wrapperClassName: r.default.string,
                  fallbackClassName: r.default.string,
                };
                n.default = u;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/icon-with-fallback/icon-with-fallback.component.js',
      },
    ],
    [
      6746,
      { './icon-with-fallback.component': 6745 },
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
                    (a = e('./icon-with-fallback.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon-with-fallback/index.js' },
    ],
    [
      6747,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({
                  size: e = 24,
                  color: t = 'currentColor',
                  ariaLabel: n,
                  className: r,
                }) =>
                  a.default.createElement(
                    'svg',
                    {
                      width: e,
                      height: e,
                      fill: t,
                      className: r,
                      'aria-label': n,
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 640 512',
                    },
                    a.default.createElement('path', {
                      d: 'M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z',
                    })
                  );
                i.propTypes = {
                  size: r.default.number,
                  color: r.default.string,
                  className: r.default.string,
                  ariaLabel: r.default.string,
                };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/icon-eye-slash.js' },
    ],
    [
      6748,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({
                  size: e = 24,
                  color: t = 'currentColor',
                  ariaLabel: n,
                  className: r,
                }) =>
                  a.default.createElement(
                    'svg',
                    {
                      width: e,
                      height: e,
                      fill: t,
                      className: r,
                      'aria-label': n,
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 576 512',
                    },
                    a.default.createElement('path', {
                      d: 'M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z',
                    })
                  );
                i.propTypes = {
                  size: r.default.number,
                  color: r.default.string,
                  className: r.default.string,
                  ariaLabel: r.default.string,
                };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/icon-eye.js' },
    ],
    [
      6749,
      {
        '../../../helpers/constants/design-system': 6872,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = l);
                var a = s(e('react')),
                  r = s(e('classnames')),
                  o = s(e('prop-types')),
                  i = e('../../../helpers/constants/design-system');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l({ severity: e }) {
                  const t = (0, r.default)('info-icon', {
                    'info-icon--success': e === i.SEVERITIES.SUCCESS,
                    'info-icon--warning': e === i.SEVERITIES.WARNING,
                    'info-icon--danger': e === i.SEVERITIES.DANGER,
                    'info-icon--info': e === i.SEVERITIES.INFO,
                  });
                  return a.default.createElement(
                    'svg',
                    {
                      className: t,
                      width: '16',
                      height: '16',
                      viewBox: '0 0 16 16',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      d: 'M15.75 8C15.75 3.75 12.25 0.25 8 0.25C3.71875 0.25 0.25 3.75 0.25 8C0.25 12.2812 3.71875 15.75 8 15.75C12.25 15.75 15.75 12.2812 15.75 8ZM8 9.5625C8.78125 9.5625 9.4375 10.2188 9.4375 11C9.4375 11.8125 8.78125 12.4375 8 12.4375C7.1875 12.4375 6.5625 11.8125 6.5625 11C6.5625 10.2188 7.1875 9.5625 8 9.5625ZM6.625 4.40625C6.59375 4.1875 6.78125 4 7 4H8.96875C9.1875 4 9.375 4.1875 9.34375 4.40625L9.125 8.65625C9.09375 8.875 8.9375 9 8.75 9H7.21875C7.03125 9 6.875 8.875 6.84375 8.65625L6.625 4.40625Z',
                    })
                  );
                }
                l.propTypes = { severity: o.default.oneOf(Object.values(i.SEVERITIES)) };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/info-icon-inverted.component.js' },
    ],
    [
      6750,
      {
        '../../../helpers/constants/design-system': 6872,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = l);
                var a = s(e('react')),
                  r = s(e('classnames')),
                  o = s(e('prop-types')),
                  i = e('../../../helpers/constants/design-system');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l({ severity: e }) {
                  const t = (0, r.default)('info-icon', {
                    'info-icon--success': e === i.SEVERITIES.SUCCESS,
                    'info-icon--warning': e === i.SEVERITIES.WARNING,
                    'info-icon--danger': e === i.SEVERITIES.DANGER,
                    'info-icon--info': e === i.SEVERITIES.INFO,
                  });
                  return a.default.createElement(
                    'svg',
                    {
                      className: t,
                      width: '16',
                      height: '16',
                      viewBox: '0 0 16 16',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      d: 'M7.2 5.6H8.8V4H7.2V5.6ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4ZM8 0C6.94943 0 5.90914 0.206926 4.93853 0.608964C3.96793 1.011 3.08601 1.60028 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.08601 14.3997 3.96793 14.989 4.93853 15.391C5.90914 15.7931 6.94943 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 0 8 0ZM7.2 12H8.8V7.2H7.2V12Z',
                    })
                  );
                }
                l.propTypes = { severity: o.default.oneOf(Object.values(i.SEVERITIES)) };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/info-icon.component.js' },
    ],
    [
      6751,
      { './preloader-icon.component': 6752 },
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
                  r = (a = e('./preloader-icon.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/preloader/index.js' },
    ],
    [
      6752,
      { classnames: 4168, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = i(e('react')),
                  r = i(e('prop-types')),
                  o = i(e('classnames'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const s = ({ className: e, size: t }) =>
                  a.default.createElement(
                    'svg',
                    {
                      className: (0, o.default)('preloader__icon', e),
                      width: t,
                      height: t,
                      viewBox: '0 0 16 16',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      fillRule: 'evenodd',
                      clipRule: 'evenodd',
                      d: 'M8 13.7143C4.84409 13.7143 2.28571 11.1559 2.28571 8C2.28571 4.84409 4.84409 2.28571 8 2.28571C11.1559 2.28571 13.7143 4.84409 13.7143 8C13.7143 11.1559 11.1559 13.7143 8 13.7143ZM8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16Z',
                      fill: 'var(--color-primary-muted)',
                    }),
                    a.default.createElement(
                      'mask',
                      {
                        id: 'mask0',
                        'mask-type': 'alpha',
                        maskUnits: 'userSpaceOnUse',
                        x: '0',
                        y: '0',
                        width: '16',
                        height: '16',
                      },
                      a.default.createElement('path', {
                        fillRule: 'evenodd',
                        clipRule: 'evenodd',
                        d: 'M8 13.7143C4.84409 13.7143 2.28571 11.1559 2.28571 8C2.28571 4.84409 4.84409 2.28571 8 2.28571C11.1559 2.28571 13.7143 4.84409 13.7143 8C13.7143 11.1559 11.1559 13.7143 8 13.7143ZM8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16Z',
                        fill: 'var(--color-primary-default)',
                      })
                    ),
                    a.default.createElement(
                      'g',
                      { mask: 'url(#mask0)' },
                      a.default.createElement('path', {
                        d: 'M6.85718 17.9999V11.4285V8.28564H-4.85711V17.9999H6.85718Z',
                        fill: 'var(--color-primary-default)',
                      })
                    )
                  );
                (s.defaultProps = { className: undefined }),
                  (s.propTypes = {
                    className: r.default.string,
                    size: r.default.number.isRequired,
                  });
                n.default = s;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/preloader/preloader-icon.component.js' },
    ],
    [
      6753,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = i);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function i({ reverseColors: e }) {
                  const t = e ? 'var(--color-primary-default)' : 'var(--color-primary-inverse)',
                    n = e ? 'var(--color-primary-inverse)' : 'var(--color-primary-default)';
                  return a.default.createElement(
                    'svg',
                    {
                      width: '15',
                      height: '15',
                      viewBox: '0 0 15 15',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      d: 'M13.2148 9.05384C13.432 8.40203 14.8878 7.92403 14.8878 7.20703C14.8878 6.49003 13.432 6.01204 13.2148 5.36022C12.9975 4.68668 13.8883 3.44823 13.4755 2.88332C13.0627 2.31842 11.607 2.77469 11.0421 2.3836C10.4771 1.97078 10.4771 0.449879 9.80361 0.232608C9.15179 0.0153358 8.26098 1.25378 7.54398 1.25378C6.82698 1.25378 5.91444 0.0153358 5.28435 0.232608C4.61081 0.449879 4.61081 1.99251 4.04591 2.3836C3.481 2.79641 2.02528 2.31842 1.61246 2.88332C1.19965 3.44823 2.09046 4.68668 1.87319 5.36022C1.65592 6.01204 0.200195 6.49003 0.200195 7.20703C0.200195 7.92403 1.65592 8.40203 1.87319 9.05384C2.09046 9.72738 1.19965 10.9658 1.61246 11.5307C2.02528 12.0956 3.481 11.6394 4.04591 12.0305C4.61081 12.4433 4.61081 13.9642 5.28435 14.1815C5.93617 14.3987 6.82698 13.1603 7.54398 13.1603C8.26098 13.1603 9.17352 14.3987 9.80361 14.1815C10.4771 13.9642 10.4771 12.4216 11.0421 12.0305C11.607 11.6176 13.0627 12.0956 13.4755 11.5307C13.8883 10.9658 12.9975 9.70566 13.2148 9.05384Z',
                      fill: t,
                    }),
                    a.default.createElement('path', {
                      d: 'M6.42285 10.084L4.13965 7.81445C4.07585 7.75065 4.04395 7.66862 4.04395 7.56836C4.04395 7.4681 4.07585 7.38607 4.13965 7.32227L4.64551 6.83008C4.70931 6.75716 4.78678 6.7207 4.87793 6.7207C4.97819 6.7207 5.06478 6.75716 5.1377 6.83008L6.66895 8.36133L9.9502 5.08008C10.0231 5.00716 10.1051 4.9707 10.1963 4.9707C10.2965 4.9707 10.3786 5.00716 10.4424 5.08008L10.9482 5.57227C11.012 5.63607 11.0439 5.7181 11.0439 5.81836C11.0439 5.91862 11.012 6.00065 10.9482 6.06445L6.91504 10.084C6.85124 10.1569 6.76921 10.1934 6.66895 10.1934C6.56868 10.1934 6.48665 10.1569 6.42285 10.084Z',
                      fill: n,
                    })
                  );
                }
                i.propTypes = { reverseColors: r.default.bool };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/icon/sun-check-icon.component.js' },
    ],
    [
      6755,
      { './blockieIdenticon.component': 6754 },
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
                  r = (a = e('./blockieIdenticon.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/identicon/blockieIdenticon/index.js' },
    ],
    [
      6756,
      {
        '../../../helpers/utils/util': 6921,
        '../jazzicon': 6762,
        './blockieIdenticon': 6755,
        classnames: 4168,
        lodash: 4921,
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
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  i = e('lodash'),
                  s = c(e('../jazzicon')),
                  l = e('../../../helpers/utils/util'),
                  u = c(e('./blockieIdenticon'));
                function c(e) {
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
                const f = e => ({ height: e, width: e, borderRadius: e / 2 });
                class m extends a.Component {
                  constructor(...e) {
                    super(...e),
                      p(this, 'state', { imageLoadingError: !1, imageUrl: '' }),
                      p(this, 'loadImage', async () => {
                        const e = await (async (e, t) => await (0, l.getAssetImageURL)(e, t))(
                          this.props.image,
                          this.props.ipfsGateway
                        );
                        this.setState({ imageUrl: e });
                      });
                  }
                  async componentDidMount() {
                    this.loadImage();
                  }
                  async componentDidUpdate(e) {
                    e.image !== this.props.image && this.loadImage();
                  }
                  renderImage() {
                    const { className: e, diameter: t, alt: n, imageBorder: r } = this.props;
                    let { image: i } = this.props;
                    const { imageUrl: s } = this.state;
                    return (
                      Array.isArray(i) && i.length && (i = i[0]),
                      'string' == typeof i && i.toLowerCase().startsWith('ipfs://') && (i = s),
                      a.default.createElement('img', {
                        className: (0, o.default)('identicon', e, { 'identicon__image-border': r }),
                        src: i,
                        style: f(t),
                        alt: n,
                        onError: () => {
                          this.setState({ imageLoadingError: !0 });
                        },
                      })
                    );
                  }
                  renderJazzicon() {
                    const { address: e, className: t, diameter: n, alt: r } = this.props,
                      i = this.getTokenList();
                    return a.default.createElement(s.default, {
                      address: e,
                      diameter: n,
                      className: (0, o.default)('identicon', t),
                      style: f(n),
                      alt: r,
                      tokenList: i,
                    });
                  }
                  renderBlockie() {
                    const { address: e, className: t, diameter: n, alt: r } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: (0, o.default)('identicon', t), style: f(n) },
                      a.default.createElement(u.default, { address: e, diameter: n, alt: r })
                    );
                  }
                  renderBlockieOrJazzIcon() {
                    const { useBlockie: e } = this.props;
                    return e ? this.renderBlockie() : this.renderJazzicon();
                  }
                  shouldComponentUpdate(e, t) {
                    return !(0, i.isEqual)(e, this.props) || !(0, i.isEqual)(t, this.state);
                  }
                  getTokenImage() {
                    var e;
                    const { address: t, tokenList: n } = this.props;
                    return null === (e = n[null == t ? void 0 : t.toLowerCase()]) || void 0 === e
                      ? void 0
                      : e.iconUrl;
                  }
                  getNftImage() {
                    var e;
                    const { address: t, watchedNftContracts: n } = this.props;
                    return null === (e = n[null == t ? void 0 : t.toLowerCase()]) || void 0 === e
                      ? void 0
                      : e.logo;
                  }
                  getTokenList() {
                    const { address: e } = this.props,
                      t = this.getTokenImage(),
                      n = this.getNftImage(),
                      a = t || n;
                    return a ? { [e.toLowerCase()]: { iconUrl: a } } : {};
                  }
                  render() {
                    const { address: e, image: t, addBorder: n, diameter: r } = this.props,
                      { imageLoadingError: i } = this.state,
                      s = r + 8;
                    return i
                      ? this.renderBlockieOrJazzIcon()
                      : t
                        ? this.renderImage()
                        : e
                          ? this.getTokenImage() || this.getNftImage()
                            ? this.renderJazzicon()
                            : a.default.createElement(
                                'div',
                                {
                                  className: (0, o.default)({ 'identicon__address-wrapper': n }),
                                  style: n ? f(s) : null,
                                },
                                this.renderBlockieOrJazzIcon()
                              )
                          : a.default.createElement('div', {
                              style: f(r),
                              className: 'identicon__image-border',
                            });
                  }
                }
                (n.default = m),
                  p(m, 'propTypes', {
                    addBorder: r.default.bool,
                    address: r.default.string,
                    className: r.default.string,
                    diameter: r.default.number,
                    image: r.default.oneOfType([r.default.string, r.default.array]),
                    useBlockie: r.default.bool,
                    alt: r.default.string,
                    imageBorder: r.default.bool,
                    tokenList: r.default.object,
                    ipfsGateway: r.default.string,
                    watchedNftContracts: r.default.object,
                  }),
                  p(m, 'defaultProps', {
                    addBorder: !1,
                    address: undefined,
                    className: undefined,
                    diameter: 46,
                    image: undefined,
                    useBlockie: !1,
                    alt: '',
                    tokenList: {},
                    watchedNftContracts: {},
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/identicon/identicon.component.js' },
    ],
    [
      6757,
      {
        '../../../selectors': 7601,
        '../../../selectors/nft': 7607,
        './identicon.component': 6756,
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
                  i = e('../../../selectors/nft'),
                  s = (a = e('./identicon.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.connect)(e => {
                  const {
                    metamask: { useBlockie: t, ipfsGateway: n },
                  } = e;
                  return {
                    useBlockie: t,
                    tokenList: (0, o.getTokenList)(e),
                    ipfsGateway: n,
                    watchedNftContracts: (0, i.getNftContractsByAddressOnCurrentChain)(e),
                  };
                })(s.default);
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/identicon/identicon.container.js' },
    ],
    [
      6758,
      { './identicon.container': 6757 },
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
                  r = (a = e('./identicon.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/identicon/index.js' },
    ],
    [
      6759,
      { './info-tooltip': 6761 },
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
                  r = (a = e('./info-tooltip')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/info-tooltip/index.js' },
    ],
    [
      6760,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = i);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function i({ fillColor: e = 'var(--color-icon-default)' }) {
                  return a.default.createElement(
                    'svg',
                    { viewBox: '0 0 10 10', xmlns: 'http://www.w3.org/2000/svg' },
                    a.default.createElement('path', {
                      d: 'M5 0C2.2 0 0 2.2 0 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.2-.7-.6.3-.8.7-.8zm.7 6H4.3V4.3h1.5V8z',
                      fill: e,
                    })
                  );
                }
                i.propTypes = { fillColor: r.default.string };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/info-tooltip/info-tooltip-icon.js' },
    ],
    [
      6761,
      {
        '../tooltip': 6818,
        './info-tooltip-icon': 6760,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = l(e('../tooltip')),
                  s = l(e('./info-tooltip-icon'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = {
                  top: 'info-tooltip__top-tooltip-arrow',
                  bottom: 'info-tooltip__bottom-tooltip-arrow',
                  left: 'info-tooltip__left-tooltip-arrow',
                  right: 'info-tooltip__right-tooltip-arrow',
                };
                function c({
                  contentText: e = '',
                  position: t = '',
                  containerClassName: n,
                  wrapperClassName: r,
                  iconFillColor: l = 'var(--color-icon-alternative)',
                }) {
                  return a.default.createElement(
                    'div',
                    { className: 'info-tooltip', 'data-testid': 'info-tooltip' },
                    a.default.createElement(
                      i.default,
                      {
                        interactive: !0,
                        position: t,
                        containerClassName: (0, o.default)('info-tooltip__tooltip-container', n),
                        wrapperClassName: r,
                        tooltipInnerClassName: 'info-tooltip__tooltip-content',
                        tooltipArrowClassName: u[t],
                        html: e,
                        theme: 'tippy-tooltip-info',
                      },
                      a.default.createElement(s.default, { fillColor: l })
                    )
                  );
                }
                c.propTypes = {
                  contentText: r.default.oneOfType([r.default.string, r.default.node]),
                  position: r.default.oneOf(['top', 'left', 'bottom', 'right']),
                  containerClassName: r.default.string,
                  wrapperClassName: r.default.string,
                  iconFillColor: r.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/info-tooltip/info-tooltip.js' },
    ],
    [
      6762,
      { './jazzicon.component': 6763 },
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
                  r = (a = e('./jazzicon.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/jazzicon/index.js' },
    ],
    [
      6764,
      {
        '../../../ducks/app/app': 6845,
        '../../../helpers/utils/gas': 6902,
        '../../../hooks/useShouldAnimateGasEstimations': 7005,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = p);
                var a = e('react-redux'),
                  r = c(e('classnames')),
                  o = c(e('prop-types')),
                  i = c(e('react')),
                  s = e('../../../helpers/utils/gas'),
                  l = e('../../../ducks/app/app'),
                  u = e('../../../hooks/useShouldAnimateGasEstimations');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = 'loading-heartbeat--active';
                function p({
                  estimateUsed: e,
                  backgroundColor: t = 'var(--color-background-default)',
                }) {
                  (0, u.useShouldAnimateGasEstimations)();
                  const n = (0, a.useSelector)(l.getGasLoadingAnimationIsShowing);
                  return e && !(0, s.isMetamaskSuggestedGasEstimate)(e)
                    ? null
                    : i.default.createElement('div', {
                        className: (0, r.default)('loading-heartbeat', { [d]: n }),
                        onClick: e => {
                          e.preventDefault(), e.stopPropagation();
                        },
                        style: { backgroundColor: t },
                      });
                }
                p.propTypes = { backgroundColor: o.default.string, estimateUsed: o.default.string };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/loading-heartbeat/index.js' },
    ],
    [
      6765,
      { './loading-screen.component': 6766 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./loading-screen.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/loading-screen/index.js' },
    ],
    [
      6766,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../spinner': 6802,
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
                  r = l(e('prop-types')),
                  o = l(e('../spinner')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system');
                function l(e) {
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
                const c = ({ header: e, loadingMessage: t, showLoadingSpinner: n = !0 }) =>
                  a.default.createElement(
                    i.Box,
                    { className: 'loading-overlay' },
                    e,
                    a.default.createElement(
                      i.Box,
                      { className: 'loading-overlay__container', marginBottom: 3 },
                      n &&
                        a.default.createElement(o.default, {
                          className: 'loading-overlay__spinner',
                        })
                    ),
                    a.default.createElement(
                      i.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Row,
                        justifyContent: s.JustifyContent.center,
                        alignItems: s.AlignItems.center,
                      },
                      t
                        ? (0, a.isValidElement)(t)
                          ? t
                          : a.default.createElement('span', { style: { textAlign: 'center' } }, t)
                        : null
                    )
                  );
                c.propTypes = {
                  header: r.default.element,
                  loadingMessage: r.default.oneOfType([r.default.string, r.default.element]),
                  showLoadingSpinner: r.default.bool,
                };
                n.default = a.default.memo(c);
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/loading-screen/loading-screen.component.js' },
    ],
    [
      6767,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({
                  width: e = '100%',
                  color: t = 'var(--color-text-default)',
                  className: n,
                  ariaLabel: r,
                }) =>
                  a.default.createElement(
                    'svg',
                    {
                      width: e,
                      fill: t,
                      className: n,
                      'aria-label': r,
                      viewBox: '0 0 2546 491',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      fillRule: 'evenodd',
                      clipRule: 'evenodd',
                      d: 'M2460 15V30H2488H2516V140V250H2531H2546V125V0H2503H2460V15ZM1861 116.038C1796.99 123.881 1741.39 163.865 1712.97 222.5C1680.8 288.855 1690.83 365.835 1739.17 423.5C1778.97 470.987 1839.99 496.383 1898.79 489.935C1937.49 485.692 1976.26 467.949 2005.03 441.315L2010.98 435.803L1997.36 421.444L1983.74 407.085L1974.62 415.109C1953.06 434.078 1931.7 444.965 1904.88 450.669C1893.48 453.093 1867.95 453.103 1855.82 450.689C1837.26 446.995 1819.5 439.522 1802.54 428.264C1790.63 420.354 1773.3 403.429 1764.69 391.295C1752.74 374.459 1743.39 352.909 1738.81 331.648C1735.63 316.902 1735.66 289.005 1738.87 274C1751.85 213.28 1797.55 166.907 1855.82 155.311C1867.95 152.897 1893.48 152.907 1904.88 155.331C1931.7 161.035 1953.06 171.922 1974.62 190.891L1983.74 198.915L1997.38 184.534L2011.02 170.153L2003.26 163.053C1977.39 139.393 1945.42 123.844 1909.5 117.465C1898.75 115.555 1871.49 114.753 1861 116.038ZM0 303V485H120H240V465.5V446H140.5H41V283.5V121H20.5H0V303ZM407.496 297.75C364.676 394.963 328.599 476.871 327.325 479.769L325.009 485.038L347.632 484.769L370.256 484.5L386.106 448.5C394.823 428.7 403.087 410.135 404.469 407.245L406.983 401.99L508.152 402.245L609.321 402.5L627.41 443.719L645.5 484.938L668.135 484.969L690.769 485L655.85 405.75C636.645 362.163 600.584 280.269 575.716 223.763L530.5 121.027L507.925 121.013L485.35 121L407.496 297.75ZM749 140.5V160H810H871V322.5V485H891.5H912V322.5V160H973H1034V140.5V121H891.5H749V140.5ZM1133 140.5V160H1194H1255V322.5V485H1275.5H1296V322.5V160H1357H1418V140.5V121H1275.5H1133V140.5ZM1534 303V485H1554.5H1575V303V121H1554.5H1534V303ZM2120 303V485H2250.5H2381V465.5V446H2271.5H2162V382.5V319H2260.5H2359V299.5V280H2260.5H2162V220V160H2271.5H2381V140.5V121H2250.5H2120V303ZM550.073 267.125C572.858 318.894 591.65 361.644 591.833 362.125C592.022 362.621 555.677 363 507.976 363C428.21 363 423.821 362.908 424.447 361.25C426.983 354.537 507.62 173.036 508.073 173.02C508.388 173.009 527.288 215.356 550.073 267.125Z',
                    })
                  );
                i.propTypes = {
                  width: r.default.string,
                  color: r.default.string,
                  className: r.default.string,
                  ariaLabel: r.default.string,
                };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/logo/logo-lattice.js' },
    ],
    [
      6768,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({
                  width: e = '100%',
                  color: t = 'var(--color-text-default)',
                  className: n,
                  ariaLabel: r,
                }) =>
                  a.default.createElement(
                    'svg',
                    {
                      width: e,
                      fill: t,
                      className: n,
                      'aria-label': r,
                      viewBox: '0 0 2000.58 669.35',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      d: 'm1711.35 627.2v42.14h289.22v-190.05h-42.14v147.91zm0-627.2v42.14h247.08v147.92h42.14v-190.06zm-149.15 326v-97.92h66.11c32.23 0 43.8 10.74 43.8 40.08v17.35c0 30.16-11.16 40.49-43.8 40.49zm104.94 17.35c30.16-7.85 51.23-35.95 51.23-69.41 0-21.07-8.26-40.08-23.96-55.37-19.83-19.01-46.28-28.51-80.57-28.51h-92.96v289.22h41.32v-115.27h61.98c31.81 0 44.62 13.22 44.62 46.28v69h42.14v-62.39c0-45.45-10.74-62.8-43.8-67.76zm-347.88 9.5h127.26v-38.01h-127.26v-86.77h139.65v-38.01h-181.8v289.22h188v-38.01h-145.85zm-138.42 15.29v19.83c0 41.73-15.29 55.37-53.71 55.37h-9.09c-38.43 0-57.02-12.4-57.02-69.83v-77.68c0-57.84 19.42-69.83 57.84-69.83h8.26c37.6 0 49.58 14.05 49.99 52.89h45.45c-4.13-57.02-42.14-92.96-99.16-92.96-27.68 0-50.82 8.68-68.17 25.2-26.03 24.38-40.49 65.7-40.49 123.54 0 55.78 12.4 97.1 38.01 122.71 17.35 16.94 41.32 26.03 64.87 26.03 24.79 0 47.52-9.92 59.08-31.4h5.78v27.27h38.01v-149.15h-111.97v38.01zm-364.41-140.07h45.04c42.56 0 65.7 10.74 65.7 68.59v76.02c0 57.84-23.14 68.59-65.7 68.59h-45.04zm48.75 251.22c78.92 0 108.25-59.91 108.25-144.61 0-85.94-31.4-144.61-109.08-144.61h-89.25v289.22zm-289.63-126.44h127.26v-38.01h-127.26v-86.77h139.65v-38.01h-181.8v289.22h188v-38.01h-145.85zm-243.77-162.79h-42.14v289.22h190.06v-38.01h-147.92zm-331.78 289.23v190.06h289.22v-42.15h-247.08v-147.91zm0-479.29v190.06h42.14v-147.92h247.08v-42.14z',
                    })
                  );
                i.propTypes = {
                  width: r.default.string,
                  color: r.default.string,
                  className: r.default.string,
                  ariaLabel: r.default.string,
                };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/logo/logo-ledger.js' },
    ],
    [
      6769,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({
                  width: e = '100%',
                  color: t = 'var(--color-text-default)',
                  className: n,
                  ariaLabel: r,
                }) =>
                  a.default.createElement(
                    'svg',
                    {
                      width: e,
                      fill: t,
                      className: n,
                      'aria-label': r,
                      viewBox: '0 0 107 24',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      d: 'M1.3333 8H6.6667C7.403 8 8 7.403 8 6.6667V1.3333C8 0.597002 7.403 0 6.6667 0H1.3333C0.597 0 0 0.597002 0 1.3333V6.6667C0 7.403 0.597 8 1.3333 8ZM2.6667 2.6667H5.3333V5.3333H2.6667V2.6667ZM0.6667 13.3333H2C2.3682 13.3333 2.6667 13.0349 2.6667 12.6667V11.3333C2.6667 10.9651 2.3682 10.6667 2 10.6667H0.6667C0.2985 10.6667 0 10.9651 0 11.3333V12.6667C0 13.0349 0.2985 13.3333 0.6667 13.3333ZM6.6667 16H1.3333C0.597 16 0 16.597 0 17.3333V22.6667C0 23.403 0.597 24 1.3333 24H6.6667C7.403 24 8 23.403 8 22.6667V17.3333C8 16.597 7.403 16 6.6667 16ZM5.3333 21.3333H2.6667V18.6667H5.3333V21.3333ZM19.3333 24H23.3333C23.7015 24 24 23.7015 24 23.3333V19.3333C24 18.9651 23.7015 18.6667 23.3333 18.6667H22C21.6318 18.6667 21.3333 18.9651 21.3333 19.3333V21.3333H18.6667V23.3333C18.6667 23.7015 18.9651 24 19.3333 24ZM22.6667 0H17.3333C16.597 0 16 0.597002 16 1.3333V6.6667C16 7.403 16.597 8 17.3333 8H22.6667C23.403 8 24 7.403 24 6.6667V1.3333C24 0.597002 23.403 0 22.6667 0ZM21.3333 5.3333H18.6667V2.6667H21.3333V5.3333ZM6 10.6667C5.6318 10.6667 5.3333 10.9651 5.3333 11.3333V12.6667C5.3333 13.0349 5.6318 13.3333 6 13.3333H10.6667V10.6667H6ZM10.6667 15.3333C10.6667 15.7015 10.9651 16 11.3333 16H13.3333V18C13.3333 18.3682 13.6318 18.6667 14 18.6667H16V13.3333H10.6667V15.3333ZM10.6667 22V23.3333C10.6667 23.7015 10.9651 24 11.3333 24H15.3333C15.7015 24 16 23.7015 16 23.3333V21.3333H11.3333C10.9651 21.3333 10.6667 21.6318 10.6667 22ZM23.3333 10.6667H16.6667C16.2985 10.6667 16 10.9651 16 11.3333V13.3333H18.6667V15.3333C18.6667 15.7015 18.9651 16 19.3333 16H20.6667C21.0349 16 21.3333 15.7015 21.3333 15.3333V13.3333H23.3333C23.7015 13.3333 24 13.0349 24 12.6667V11.3333C24 10.9651 23.7015 10.6667 23.3333 10.6667ZM18.6667 21.3333V18.6667H16V21.3333H18.6667ZM11.3333 5.3333H12.6667C13.0349 5.3333 13.3333 5.0349 13.3333 4.6667V0.666698C13.3333 0.298498 13.0349 0 12.6667 0H11.3333C10.9651 0 10.6667 0.298498 10.6667 0.666698V4.6667C10.6667 5.0349 10.9651 5.3333 11.3333 5.3333ZM13.3333 10V8.6667C13.3333 8.2985 13.0349 8 12.6667 8H11.3333C10.9651 8 10.6667 8.2985 10.6667 8.6667V10.6667H12.6667C13.0349 10.6667 13.3333 10.3682 13.3333 10Z',
                    }),
                    a.default.createElement('path', {
                      d: 'M38.592 18.192C37.7707 18.192 37.0027 18.0427 36.288 17.744C35.584 17.4347 34.9653 17.0187 34.432 16.496C33.8987 15.9627 33.4773 15.3387 33.168 14.624C32.8693 13.9093 32.72 13.1413 32.72 12.32C32.72 11.4987 32.8693 10.7307 33.168 10.016C33.4773 9.3013 33.8987 8.6827 34.432 8.16C34.9653 7.6267 35.584 7.2107 36.288 6.912C37.0027 6.6027 37.7707 6.448 38.592 6.448C39.4133 6.448 40.1813 6.6027 40.896 6.912C41.6107 7.2107 42.2293 7.6267 42.752 8.16C43.2853 8.6827 43.7013 9.3013 44 10.016C44.3093 10.7307 44.464 11.4987 44.464 12.32C44.464 13.0347 44.3467 13.7067 44.112 14.336C43.888 14.9653 43.5733 15.536 43.168 16.048L45.28 18H43.248L42.16 17.008C41.6693 17.3813 41.12 17.6747 40.512 17.888C39.904 18.0907 39.264 18.192 38.592 18.192ZM38.592 16.784C39.5413 16.784 40.3787 16.528 41.104 16.016L39.296 14.336L40.208 13.312L42.08 15.056C42.3573 14.6827 42.576 14.2667 42.736 13.808C42.896 13.3387 42.976 12.8427 42.976 12.32C42.976 11.7013 42.864 11.12 42.64 10.576C42.416 10.032 42.1067 9.5573 41.712 9.152C41.328 8.7467 40.864 8.432 40.32 8.208C39.7867 7.9733 39.2107 7.856 38.592 7.856C37.9733 7.856 37.3973 7.9733 36.864 8.208C36.3307 8.432 35.8667 8.7467 35.472 9.152C35.088 9.5573 34.784 10.032 34.56 10.576C34.336 11.12 34.224 11.7013 34.224 12.32C34.224 12.9493 34.336 13.536 34.56 14.08C34.784 14.6133 35.088 15.0827 35.472 15.488C35.8667 15.8933 36.3307 16.2133 36.864 16.448C37.3973 16.672 37.9733 16.784 38.592 16.784ZM46.9259 6.64H50.7979C51.3205 6.64 51.7899 6.7147 52.2059 6.864C52.6325 7.0133 52.9899 7.2267 53.2779 7.504C53.5765 7.7813 53.8005 8.112 53.9499 8.496C54.1099 8.88 54.1899 9.3067 54.1899 9.776C54.1899 10.608 53.9392 11.2907 53.4379 11.824C52.9472 12.3573 52.2592 12.688 51.3739 12.816L55.7579 18H53.8859L49.5179 12.832H48.4139V18H46.9259V6.64ZM50.6219 11.504C51.2725 11.504 51.7792 11.36 52.1419 11.072C52.5152 10.784 52.7019 10.352 52.7019 9.776C52.7019 9.2 52.5152 8.7627 52.1419 8.464C51.7792 8.1653 51.2725 8.016 50.6219 8.016H48.4139V11.504H50.6219ZM55.8681 12.832H59.948V14.208H55.8681V12.832ZM66.488 18.16C65.88 18.16 65.325 18.0267 64.824 17.76C64.323 17.4827 63.939 17.152 63.672 16.768V18H62.296V6H63.672V11.232C63.939 10.848 64.323 10.5227 64.824 10.256C65.325 9.9787 65.88 9.84 66.488 9.84C67.043 9.84 67.56 9.952 68.04 10.176C68.52 10.3893 68.936 10.688 69.288 11.072C69.64 11.4453 69.912 11.8827 70.104 12.384C70.307 12.8853 70.408 13.424 70.408 14C70.408 14.576 70.307 15.1147 70.104 15.616C69.912 16.1173 69.64 16.56 69.288 16.944C68.936 17.3173 68.52 17.616 68.04 17.84C67.56 18.0533 67.043 18.16 66.488 18.16ZM66.28 16.896C66.685 16.896 67.053 16.8213 67.384 16.672C67.715 16.5227 67.997 16.32 68.232 16.064C68.477 15.7973 68.664 15.488 68.792 15.136C68.931 14.784 69 14.4053 69 14C69 13.5947 68.931 13.216 68.792 12.864C68.664 12.512 68.477 12.208 68.232 11.952C67.997 11.6853 67.715 11.4773 67.384 11.328C67.053 11.1787 66.685 11.104 66.28 11.104C65.875 11.104 65.507 11.1787 65.176 11.328C64.845 11.4773 64.557 11.6853 64.312 11.952C64.077 12.208 63.891 12.512 63.752 12.864C63.624 13.216 63.56 13.5947 63.56 14C63.56 14.4053 63.624 14.784 63.752 15.136C63.891 15.488 64.077 15.7973 64.312 16.064C64.557 16.32 64.845 16.5227 65.176 16.672C65.507 16.8213 65.875 16.896 66.28 16.896ZM75.67 18.16C75.105 18.16 74.582 18.0533 74.102 17.84C73.633 17.616 73.222 17.3173 72.87 16.944C72.518 16.56 72.241 16.1173 72.038 15.616C71.846 15.1147 71.75 14.576 71.75 14C71.75 13.424 71.846 12.8853 72.038 12.384C72.241 11.8827 72.518 11.4453 72.87 11.072C73.222 10.688 73.633 10.3893 74.102 10.176C74.582 9.952 75.105 9.84 75.67 9.84C76.278 9.84 76.833 9.9787 77.334 10.256C77.835 10.5227 78.219 10.848 78.486 11.232V10H79.862V18H78.486V16.768C78.219 17.152 77.835 17.4827 77.334 17.76C76.833 18.0267 76.278 18.16 75.67 18.16ZM75.878 16.896C76.283 16.896 76.651 16.8213 76.982 16.672C77.313 16.5227 77.595 16.32 77.83 16.064C78.075 15.7973 78.262 15.488 78.39 15.136C78.529 14.784 78.598 14.4053 78.598 14C78.598 13.5947 78.529 13.216 78.39 12.864C78.262 12.512 78.075 12.208 77.83 11.952C77.595 11.6853 77.313 11.4773 76.982 11.328C76.651 11.1787 76.283 11.104 75.878 11.104C75.473 11.104 75.099 11.1787 74.758 11.328C74.427 11.4773 74.139 11.6853 73.894 11.952C73.659 12.208 73.473 12.512 73.334 12.864C73.206 13.216 73.142 13.5947 73.142 14C73.142 14.4053 73.206 14.784 73.334 15.136C73.473 15.488 73.659 15.7973 73.894 16.064C74.139 16.32 74.427 16.5227 74.758 16.672C75.099 16.8213 75.473 16.896 75.878 16.896ZM85.028 18.16C84.602 18.16 84.196 18.1067 83.812 18C83.428 17.8933 83.092 17.7387 82.804 17.536C82.516 17.3227 82.282 17.0613 82.1 16.752C81.919 16.4427 81.812 16.0853 81.78 15.68H83.188C83.231 15.9253 83.311 16.1333 83.428 16.304C83.556 16.464 83.706 16.5973 83.876 16.704C84.047 16.8107 84.228 16.8853 84.42 16.928C84.623 16.9707 84.831 16.992 85.044 16.992C85.482 16.992 85.844 16.9067 86.132 16.736C86.431 16.5547 86.58 16.288 86.58 15.936C86.58 15.616 86.479 15.3547 86.276 15.152C86.074 14.9493 85.732 14.784 85.252 14.656L84.1 14.352C83.407 14.1707 82.89 13.8773 82.548 13.472C82.207 13.0667 82.036 12.576 82.036 12C82.036 11.6693 82.106 11.3707 82.244 11.104C82.383 10.8373 82.575 10.6133 82.82 10.432C83.066 10.24 83.354 10.096 83.684 10C84.026 9.8933 84.399 9.84 84.804 9.84C85.231 9.84 85.615 9.8987 85.956 10.016C86.298 10.1333 86.591 10.2987 86.836 10.512C87.092 10.7147 87.295 10.9547 87.444 11.232C87.594 11.5093 87.684 11.808 87.716 12.128H86.34C86.234 11.776 86.042 11.4987 85.764 11.296C85.498 11.0933 85.178 10.992 84.804 10.992C84.42 10.992 84.095 11.0827 83.828 11.264C83.562 11.4347 83.428 11.6747 83.428 11.984C83.428 12.2827 83.524 12.5227 83.716 12.704C83.908 12.8747 84.218 13.0187 84.644 13.136L85.924 13.472C86.596 13.6427 87.103 13.9307 87.444 14.336C87.796 14.7307 87.972 15.232 87.972 15.84C87.972 16.2347 87.898 16.5813 87.748 16.88C87.599 17.168 87.391 17.408 87.124 17.6C86.858 17.792 86.543 17.9307 86.18 18.016C85.828 18.112 85.444 18.16 85.028 18.16ZM93.329 18.16C92.742 18.16 92.204 18.0587 91.713 17.856C91.222 17.6427 90.796 17.3493 90.433 16.976C90.081 16.6027 89.804 16.1653 89.601 15.664C89.398 15.152 89.297 14.5973 89.297 14C89.297 13.4133 89.388 12.8693 89.569 12.368C89.761 11.856 90.033 11.4133 90.385 11.04C90.737 10.6667 91.164 10.3733 91.665 10.16C92.166 9.9467 92.732 9.84 93.361 9.84C93.99 9.84 94.55 9.9627 95.041 10.208C95.542 10.4427 95.958 10.768 96.289 11.184C96.63 11.5893 96.876 12.0693 97.025 12.624C97.185 13.168 97.244 13.7493 97.201 14.368H90.689C90.7 14.7307 90.774 15.0667 90.913 15.376C91.062 15.6853 91.254 15.9573 91.489 16.192C91.724 16.416 92.001 16.592 92.321 16.72C92.641 16.848 92.982 16.912 93.345 16.912C93.846 16.912 94.294 16.8107 94.689 16.608C95.094 16.3947 95.42 16.048 95.665 15.568H97.073C96.977 15.92 96.822 16.256 96.609 16.576C96.396 16.8853 96.129 17.1573 95.809 17.392C95.5 17.6267 95.137 17.8133 94.721 17.952C94.305 18.0907 93.841 18.16 93.329 18.16ZM93.313 11.056C93.025 11.056 92.742 11.0987 92.465 11.184C92.188 11.2693 91.932 11.4027 91.697 11.584C91.473 11.7653 91.276 11.9947 91.105 12.272C90.934 12.5493 90.817 12.8853 90.753 13.28H95.745C95.617 12.5333 95.329 11.9787 94.881 11.616C94.433 11.2427 93.91 11.056 93.313 11.056ZM102.483 18.16C101.917 18.16 101.395 18.0533 100.915 17.84C100.445 17.616 100.035 17.3173 99.683 16.944C99.331 16.56 99.053 16.1173 98.851 15.616C98.659 15.1147 98.563 14.576 98.563 14C98.563 13.424 98.659 12.8853 98.851 12.384C99.053 11.8827 99.331 11.4453 99.683 11.072C100.035 10.688 100.445 10.3893 100.915 10.176C101.395 9.952 101.917 9.84 102.483 9.84C103.091 9.84 103.645 9.9787 104.147 10.256C104.648 10.5227 105.032 10.848 105.299 11.232V6H106.675V18H105.299V16.768C105.032 17.152 104.648 17.4827 104.147 17.76C103.645 18.0267 103.091 18.16 102.483 18.16ZM102.691 16.896C103.096 16.896 103.464 16.8213 103.795 16.672C104.125 16.5227 104.408 16.32 104.643 16.064C104.888 15.7973 105.075 15.488 105.203 15.136C105.341 14.784 105.411 14.4053 105.411 14C105.411 13.5947 105.341 13.216 105.203 12.864C105.075 12.512 104.888 12.208 104.643 11.952C104.408 11.6853 104.125 11.4773 103.795 11.328C103.464 11.1787 103.096 11.104 102.691 11.104C102.285 11.104 101.912 11.1787 101.571 11.328C101.24 11.4773 100.952 11.6853 100.707 11.952C100.472 12.208 100.285 12.512 100.147 12.864C100.019 13.216 99.955 13.5947 99.955 14C99.955 14.4053 100.019 14.784 100.147 15.136C100.285 15.488 100.472 15.7973 100.707 16.064C100.952 16.32 101.24 16.5227 101.571 16.672C101.912 16.8213 102.285 16.896 102.691 16.896Z',
                    })
                  );
                i.propTypes = {
                  width: r.default.string,
                  color: r.default.string,
                  className: r.default.string,
                  ariaLabel: r.default.string,
                };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/logo/logo-qr-based.js' },
    ],
    [
      6770,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({
                  width: e = '100%',
                  color: t = 'var(--color-text-default)',
                  className: n,
                  ariaLabel: r,
                }) =>
                  a.default.createElement(
                    'svg',
                    {
                      width: e,
                      fill: t,
                      className: n,
                      'aria-label': r,
                      viewBox: '0 0 1482 378',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    a.default.createElement('path', {
                      d: 'm915.31 115.89h154.82v40.74l-84.2 114.08h84.2v47.98h-154.82v-40.74l84.2-114.08h-84.2z',
                    }),
                    a.default.createElement('path', {
                      d: 'm1437.7101 243.55c19-7.25 38.9301-26.26 38.9301-59.76 0-40.74-28.0601-67-69.71-67h-95.0601v201.9h52.51v-67.9h19.9199l37.12 67.9h60.66l-44.37-75.14zm-37.12-39.84h-36.21v-40.74h36.21c13.58 0 22.64 8.15 22.64 19.92 0 12.67-9.0601 20.82-22.64 20.82z',
                    }),
                    a.default.createElement('path', {
                      d: 'm1184.2101 113.17c-61.5699 0-105 44.36-105 104.12s44.34 104.12 105 104.12 105.9301-44.37 105.9301-104.12-44.3701-104.12-105.9301-104.12zm0 161.16c-30.78 0-51.61-23.54-51.61-57 0-34.4 20.83-57 51.61-57s52.51 23.54 52.51 57-21.7301 56.9999-52.51 56.9999z',
                    }),
                    a.default.createElement('path', {
                      d: 'm743.29 115.89h146.6701v47.08h-94.1601v29.87h91.44v46.18h-91.44v32.59h94.1601v47.08h-146.6701z',
                    }),
                    a.default.createElement('path', {
                      d: 'm222.7 87.82c0-48-41.65-87.82-92.35-87.82s-92.35 39.84-92.35 87.82v28.07h-38v201.9l130.35 60.62 130.38-60.66v-201h-38zm-137.62 0c0-22.63 19.92-40.74 45.27-40.74s45.27 18.11 45.27 40.74v28.07h-90.54zm123.13 197.37-77.86 36.22-77.86-36.22v-121.32h155.72z',
                    }),
                    a.default.createElement('path', {
                      d: 'm718.85 183.79c0-40.74-28.07-67-69.72-67h-95.0599v201.9h52.51v-67.9h19.92l37.12 67.9h60.68l-44.37-75.14c19-7.25 38.92-26.26 38.92-59.76zm-76.06 19.92h-36.21v-40.74h36.21c13.58 0 22.64 8.15 22.64 19.92 0 12.67-9.0601 20.82-22.6401 20.82z',
                    }),
                    a.default.createElement('path', {
                      d: 'm366.66 115.89h163.87v47.98h-56.13v154.82h-52.52v-154.82h-55.22z',
                    })
                  );
                i.propTypes = {
                  width: r.default.string,
                  color: r.default.string,
                  className: r.default.string,
                  ariaLabel: r.default.string,
                };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/logo/logo-trezor.js' },
    ],
    [
      6771,
      { './mascot.component': 6772 },
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
                  r = (a = e('./mascot.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/mascot/index.js' },
    ],
    [
      6772,
      {
        '../../../helpers/utils/build-types': 6897,
        '@metamask/logo': 2100,
        lodash: 4921,
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
                var a = u(e('prop-types')),
                  r = (function (e, t) {
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
                  o = u(e('@metamask/logo')),
                  i = e('lodash'),
                  s = e('../../../helpers/utils/build-types');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
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
                class d extends r.Component {
                  constructor(e) {
                    super(e);
                    const { width: t, height: n, followMouse: a } = e;
                    (this.logo = (0, o.default)({
                      followMouse: a,
                      pxNotRatio: !0,
                      width: t,
                      height: n,
                      meshJson: (0, s.getBuildSpecificAsset)('foxMeshJson'),
                      verticalFieldOfView: Math.PI / 37.5,
                      near: 100,
                      far: 340,
                    })),
                      (this.mascotContainer = (0, r.createRef)()),
                      (this.refollowMouse = (0, i.debounce)(
                        this.logo.setFollowMouse.bind(this.logo, !0),
                        1e3
                      )),
                      (this.unfollowMouse = this.logo.setFollowMouse.bind(this.logo, !1));
                  }
                  handleAnimationEvents() {
                    this.animations ||
                      ((this.animations = this.props.animationEventEmitter),
                      this.animations.on('point', this.lookAt.bind(this)),
                      this.animations.on(
                        'setFollowMouse',
                        this.logo.setFollowMouse.bind(this.logo)
                      ));
                  }
                  lookAt(e) {
                    this.unfollowMouse(), this.logo.lookAtAndRender(e), this.refollowMouse();
                  }
                  componentDidMount() {
                    this.mascotContainer.current.appendChild(this.logo.container),
                      (this.directionTargetMap = (({ top: e, left: t, height: n, width: a }) => {
                        const r = t + a / 2,
                          o = e + n / 2;
                        return {
                          up: { x: r, y: e - n },
                          down: { x: r, y: e + 2 * n },
                          left: { x: t - a, y: o },
                          right: { x: t + 2 * a, y: o },
                          middle: { x: r, y: o },
                        };
                      })(this.mascotContainer.current.getBoundingClientRect()));
                    const { lookAtTarget: e, lookAtDirection: t } = this.props;
                    null != e && e.x && null != e && e.y
                      ? this.logo.lookAtAndRender(e)
                      : t && this.logo.lookAtAndRender(this.directionTargetMap[t]);
                  }
                  componentDidUpdate(e) {
                    const { lookAtTarget: t = {}, lookAtDirection: n = null, followMouse: a } = e,
                      { lookAtTarget: r = {}, followMouse: o, lookAtDirection: i } = this.props;
                    i && n !== i
                      ? this.logo.lookAtAndRender(this.directionTargetMap[i])
                      : ((null == r ? void 0 : r.x) === (null == t ? void 0 : t.x) &&
                          (null == r ? void 0 : r.y) === (null == t ? void 0 : t.y)) ||
                        this.logo.lookAtAndRender(r),
                      a !== o && (this.unfollowMouse(), o && this.refollowMouse());
                  }
                  componentWillUnmount() {
                    (this.animations = this.props.animationEventEmitter),
                      this.animations.removeAllListeners(),
                      this.logo.container.remove(),
                      this.logo.stopAnimation();
                  }
                  render() {
                    return (
                      this.handleAnimationEvents(),
                      r.default.createElement('div', {
                        ref: this.mascotContainer,
                        style: { zIndex: 0 },
                      })
                    );
                  }
                }
                (n.default = d),
                  c(d, 'propTypes', {
                    animationEventEmitter: a.default.object.isRequired,
                    width: a.default.string,
                    height: a.default.string,
                    followMouse: a.default.bool,
                    lookAtTarget: a.default.object,
                    lookAtDirection: a.default.oneOf(['up', 'down', 'left', 'right', 'middle']),
                  }),
                  c(d, 'defaultProps', {
                    width: '200',
                    height: '200',
                    followMouse: !0,
                    lookAtTarget: {},
                    lookAtDirection: null,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/mascot/mascot.component.js' },
    ],
    [
      6773,
      { './menu': 6775, './menu-item': 6774 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Menu', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  }),
                  Object.defineProperty(n, 'MenuItem', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var a = o(e('./menu')),
                  r = o(e('./menu-item'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/menu/index.js' },
    ],
    [
      6774,
      {
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = a.default.forwardRef(
                  (
                    {
                      children: e,
                      className: t,
                      'data-testid': n,
                      iconName: r,
                      iconColor: l,
                      onClick: u,
                      subtitle: c,
                      disabled: d = !1,
                      showInfoDot: p,
                    },
                    f
                  ) =>
                    a.default.createElement(
                      'button',
                      {
                        className: (0, o.default)('menu-item', t),
                        'data-testid': n,
                        onClick: u,
                        ref: f,
                        disabled: d,
                      },
                      r &&
                        p &&
                        a.default.createElement(
                          i.BadgeWrapper,
                          {
                            anchorElementShape: i.BadgeWrapperAnchorElementShape.circular,
                            display: s.Display.Block,
                            position: i.BadgeWrapperPosition.topRight,
                            positionObj: { top: -6, right: 4 },
                            badge: a.default.createElement(i.Icon, {
                              name: i.IconName.FullCircle,
                              size: i.IconSize.Xs,
                              color: s.IconColor.primaryDefault,
                              style: { '--size': '10px' },
                            }),
                          },
                          a.default.createElement(i.Icon, {
                            name: r,
                            size: i.IconSize.Sm,
                            marginRight: 2,
                          })
                        ),
                      r &&
                        !p &&
                        a.default.createElement(i.Icon, {
                          name: r,
                          size: i.IconSize.Sm,
                          marginRight: 2,
                          color: l,
                        }),
                      a.default.createElement(
                        'div',
                        null,
                        a.default.createElement(i.Text, { as: 'div' }, e),
                        c
                          ? a.default.createElement(i.Text, { variant: s.TextVariant.bodyXs }, c)
                          : null
                      )
                    )
                );
                (u.propTypes = {
                  children: r.default.node.isRequired,
                  className: r.default.string,
                  'data-testid': r.default.string,
                  iconName: r.default.string,
                  onClick: r.default.func,
                  subtitle: r.default.node,
                  disabled: r.default.bool,
                  showInfoDot: r.default.bool,
                  iconColor: r.default.string,
                }),
                  (u.displayName = 'MenuItem');
                n.default = u;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/menu/menu-item.js' },
    ],
    [
      6775,
      {
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
        'react-dom': 5157,
        'react-popper': 5268,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = u(e('prop-types')),
                  r = (function (e, t) {
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
                  o = e('react-dom'),
                  i = e('react-popper'),
                  s = u(e('classnames'));
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const d = ({
                  anchorElement: e,
                  children: t,
                  className: n,
                  'data-testid': a,
                  onHide: l,
                  popperOptions: u,
                }) => {
                  const [d, p] = (0, r.useState)(null),
                    f = (0, r.useRef)(document.getElementById('popover-content')),
                    { attributes: m, styles: h } = (0, i.usePopper)(e, d, u);
                  return (0, o.createPortal)(
                    r.default.createElement(
                      r.default.Fragment,
                      null,
                      r.default.createElement('div', {
                        className: 'menu__background',
                        'data-testid': a,
                        onClick: l,
                      }),
                      r.default.createElement(
                        'div',
                        c(
                          {
                            className: (0, s.default)('menu__container', n),
                            'data-testid': n,
                            ref: p,
                            style: h.popper,
                          },
                          m.popper
                        ),
                        t
                      )
                    ),
                    f.current
                  );
                };
                (d.propTypes = {
                  anchorElement: a.default.instanceOf(window.Element),
                  children: a.default.node.isRequired,
                  className: a.default.string,
                  onHide: a.default.func.isRequired,
                  popperOptions: a.default.object,
                  dataTestId: a.default.string,
                }),
                  (d.defaultProps = {
                    anchorElement: undefined,
                    className: undefined,
                    popperOptions: undefined,
                  });
                n.default = d;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/menu/menu.js' },
    ],
    [
      6776,
      { '../../../../shared/constants/preferences': 5809, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var a,
                  r = (function (e, t) {
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
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('../../../../shared/constants/preferences');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const l = 162,
                  u = 30;
                function c({ theme: e, className: t }) {
                  const [n, a] = (0, r.useState)(() =>
                      e === undefined ? document.documentElement.getAttribute('data-theme') : e
                    ),
                    o = 'dark' === n ? 'rgb(255,255,255)' : 'rgb(22,22,22)';
                  return (
                    (0, r.useEffect)(() => {
                      e !== undefined && a(e);
                    }, [e, a]),
                    r.default.createElement(
                      'svg',
                      {
                        height: u,
                        width: l,
                        viewBox: '0 0 696 344',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        className: t,
                      },
                      r.default.createElement('path', {
                        d: 'M394.102 265.407V340.812H355.162V288.57L310.786 293.73C301.039 294.854 296.75 298.041 296.75 303.912C296.75 312.512 304.892 316.136 322.344 316.136C332.985 316.136 344.773 314.553 355.184 311.824L335.026 340.353C326.885 342.165 318.95 343.06 310.579 343.06C275.262 343.06 255.103 329.024 255.103 304.119C255.103 282.149 270.95 270.613 306.956 266.531L354.519 261.004C351.951 247.175 341.516 241.167 320.762 241.167C301.291 241.167 279.78 246.143 260.539 255.431L266.662 221.696C284.55 214.22 304.938 210.367 325.532 210.367C370.825 210.367 394.148 229.173 394.148 265.384L394.102 265.407ZM43.7957 170.991L1.23138 340.812H43.7957L64.9173 255.477L101.542 299.372H145.918L182.542 255.477L203.664 340.812H246.228L203.664 170.968L123.718 265.912L43.7727 170.968L43.7957 170.991ZM203.664 1.14648L123.718 96.0905L43.7957 1.14648L1.23138 170.991H43.7957L64.9173 85.6558L101.542 129.55H145.918L182.542 85.6558L203.664 170.991H246.228L203.664 1.14648ZM496.454 263.825L462.031 258.848C453.431 257.495 450.037 254.766 450.037 250.019C450.037 242.313 458.407 238.919 475.63 238.919C495.559 238.919 513.447 243.001 532.253 251.831L527.506 218.554C512.324 213.119 494.894 210.413 476.777 210.413C434.442 210.413 411.325 225.136 411.325 251.624C411.325 272.241 424.007 283.777 450.954 287.859L485.836 293.065C494.665 294.418 498.289 297.812 498.289 303.247C498.289 310.953 490.147 314.576 473.612 314.576C451.871 314.576 428.319 309.37 409.078 300.082L412.931 333.359C429.466 339.482 450.977 343.105 471.135 343.105C514.617 343.105 537.252 327.924 537.252 300.977C537.252 279.465 524.57 267.907 496.5 263.848L496.454 263.825ZM552.388 186.15V340.812H591.329V186.15H552.388ZM636.829 271.301L690.974 212.638H642.516L591.329 273.319L645.91 340.789H695.057L636.829 271.278V271.301ZM546.953 134.297C546.953 159.203 567.111 173.238 602.429 173.238C610.799 173.238 618.734 172.321 626.876 170.532L647.034 142.003C636.622 144.709 624.835 146.314 614.194 146.314C596.764 146.314 588.6 142.691 588.6 134.091C588.6 128.197 592.911 125.032 602.635 123.909L647.011 118.749V170.991H685.952V95.586C685.952 59.3513 662.629 40.5689 617.335 40.5689C596.718 40.5689 576.354 44.4217 558.466 51.8979L552.342 85.6329C571.583 76.3449 593.095 71.3684 612.565 71.3684C633.32 71.3684 643.755 77.3769 646.323 91.2057L598.759 96.7326C562.754 100.815 546.907 112.35 546.907 134.32L546.953 134.297ZM438.043 126.156C438.043 157.414 456.16 173.261 491.936 173.261C506.201 173.261 517.988 170.991 529.294 165.785L534.271 131.591C523.4 138.15 512.301 141.544 501.201 141.544C484.437 141.544 476.961 134.756 476.961 119.574V74.2809H536.06V42.8163H476.961V16.099L402.909 55.2691V74.2809H437.997V126.133L438.043 126.156ZM399.767 111.892V119.597H294.526C299.273 135.284 313.377 142.462 338.42 142.462C358.349 142.462 376.925 138.38 393.437 130.468L388.69 163.537C373.508 169.867 354.267 173.284 334.567 173.284C282.257 173.284 253.727 150.19 253.727 107.397C253.727 64.603 282.715 40.5918 327.55 40.5918C372.384 40.5918 399.79 66.6441 399.79 111.914L399.767 111.892ZM294.021 93.3155H360.574C357.065 78.2942 345.53 70.451 327.091 70.451C308.653 70.451 297.714 78.0878 294.021 93.3155Z',
                        fill: o,
                      })
                    )
                  );
                }
                c.propTypes = {
                  theme: o.default.oneOf([i.ThemeType.light, i.ThemeType.dark, i.ThemeType.os]),
                  className: o.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/metafox-logo/horizontal-logo.js' },
    ],
    [
      6777,
      { './metafox-logo.component': 6778 },
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
                  r = (a = e('./metafox-logo.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/metafox-logo/index.js' },
    ],
    [
      6778,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        './horizontal-logo': 6776,
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
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = u(e('./horizontal-logo'));
                function u(e) {
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
                class f extends a.PureComponent {
                  render() {
                    const {
                        onClick: e,
                        unsetIconHeight: t,
                        isOnboarding: n,
                        src: r,
                        theme: u,
                      } = this.props,
                      c = t ? {} : { height: 42, width: 42 };
                    c.src = './images/logo/metamask-fox.svg';
                    let p = () =>
                        a.default.createElement(l.default, {
                          theme: u,
                          className: (0, o.default)({
                            'app-header__metafox-logo--horizontal': !n,
                            'onboarding-app-header__metafox-logo--horizontal': n,
                          }),
                        }),
                      f = './images/logo/metamask-fox.svg';
                    return (
                      r &&
                        ((p = () =>
                          a.default.createElement(
                            'img',
                            d({}, c, {
                              src: r,
                              className: (0, o.default)({
                                'app-header__metafox-logo--horizontal': !n,
                                'onboarding-app-header__metafox-logo--horizontal': n,
                              }),
                              alt: '',
                            })
                          )),
                        (f = r)),
                      a.default.createElement(
                        i.Box,
                        {
                          as: 'button',
                          onClick: e,
                          className: (0, o.default)({
                            'app-header__logo-container': !n,
                            'onboarding-app-header__logo-container': n,
                            'app-header__logo-container--clickable': Boolean(e),
                          }),
                          backgroundColor: s.BackgroundColor.transparent,
                          'data-testid': 'app-header-logo',
                        },
                        p(),
                        a.default.createElement(
                          'img',
                          d({}, c, {
                            src: f,
                            className: (0, o.default)({
                              'app-header__metafox-logo--icon': !n,
                              'onboarding-app-header__metafox-logo--icon': n,
                            }),
                            alt: '',
                          })
                        )
                      )
                    );
                  }
                }
                (n.default = f),
                  p(f, 'propTypes', {
                    onClick: r.default.func,
                    unsetIconHeight: r.default.bool,
                    isOnboarding: r.default.bool,
                    src: r.default.string,
                    theme: r.default.string,
                  }),
                  p(f, 'defaultProps', {
                    onClick: undefined,
                    unsetIconHeight: !1,
                    isOnboarding: !1,
                    src: undefined,
                    theme: undefined,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/metafox-logo/metafox-logo.component.js' },
    ],
    [
      6779,
      { './nickname-popover.component': 6780 },
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
                  r = (a = e('./nickname-popover.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/nickname-popover/index.js' },
    ],
    [
      6780,
      {
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../button': 6707,
        '../identicon': 6758,
        '../popover': 6789,
        '../tooltip': 6818,
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
                  r = e('react-redux'),
                  o = y(e('prop-types')),
                  i = e('react-router-dom'),
                  s = e('../../../contexts/i18n'),
                  l = y(e('../tooltip')),
                  u = y(e('../popover')),
                  c = y(e('../button')),
                  d = y(e('../identicon')),
                  p = e('../../../helpers/utils/util'),
                  f = e('../../../hooks/useCopyToClipboard'),
                  m = e('../../../selectors'),
                  h = e('../../../helpers/constants/routes'),
                  g = e('../../component-library');
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
                const v = ({
                  address: e,
                  nickname: t,
                  onClose: n = null,
                  onAdd: o = null,
                  explorerLink: y,
                }) => {
                  var b;
                  const v = (0, a.useContext)(s.I18nContext),
                    _ = (0, i.useHistory)(),
                    T = (0, a.useCallback)(() => {
                      o();
                    }, [o]),
                    [C, k] = (0, f.useCopyToClipboard)(),
                    w = (0, r.useSelector)(m.getTokenList),
                    E = (0, r.useSelector)(m.getBlockExplorerLinkText);
                  return a.default.createElement(
                    'div',
                    { className: 'nickname-popover' },
                    a.default.createElement(
                      u.default,
                      { onClose: n, className: 'nickname-popover__popover-wrap' },
                      a.default.createElement(d.default, {
                        address: e,
                        diameter: 36,
                        className: 'nickname-popover__identicon',
                        image:
                          null === (b = w[e.toLowerCase()]) || void 0 === b ? void 0 : b.iconUrl,
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'nickname-popover__address' },
                        t || (0, p.shortenAddress)(e)
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'nickname-popover__public-address' },
                        a.default.createElement(
                          'div',
                          { className: 'nickname-popover__public-address__constant' },
                          e
                        ),
                        a.default.createElement(
                          l.default,
                          {
                            position: 'bottom',
                            title: v(C ? 'copiedExclamation' : 'copyToClipboard'),
                          },
                          a.default.createElement(g.ButtonIcon, {
                            iconName: C ? g.IconName.CopySuccess : g.IconName.Copy,
                            size: g.IconSize.Sm,
                            onClick: () => k(e),
                          })
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'nickname-popover__view-on-block-explorer' },
                        a.default.createElement(
                          c.default,
                          {
                            type: 'link',
                            className: 'nickname-popover__etherscan-link',
                            onClick:
                              'addBlockExplorer' === E.firstPart
                                ? () => {
                                    _.push(`${h.NETWORKS_ROUTE}#blockExplorerUrl`);
                                  }
                                : () => {
                                    global.platform.openTab({ url: y });
                                  },
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            title:
                              'addBlockExplorer' === E.firstPart
                                ? v('addBlockExplorer')
                                : v('etherscanView'),
                          },
                          'addBlockExplorer' === E.firstPart
                            ? v('addBlockExplorer')
                            : v('viewOnBlockExplorer')
                        )
                      ),
                      a.default.createElement(
                        c.default,
                        {
                          type: 'primary',
                          className: 'nickname-popover__footer-button',
                          onClick: T,
                        },
                        v(t ? 'editANickname' : 'addANickname')
                      )
                    )
                  );
                };
                v.propTypes = {
                  address: o.default.string,
                  nickname: o.default.string,
                  onClose: o.default.func,
                  onAdd: o.default.func,
                  explorerLink: o.default.string,
                };
                n.default = v;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/nickname-popover/nickname-popover.component.js',
      },
    ],
    [
      6781,
      {
        '../../../../shared/constants/tokens': 5818,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var a = u(e('react')),
                  r = u(e('classnames')),
                  o = u(e('prop-types')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../../../shared/constants/tokens'),
                  l = e('../../component-library');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c({
                  detailText: e = '',
                  value: t = 0,
                  onChange: n,
                  error: o = '',
                  autoFocus: u = !1,
                  allowDecimals: c = !0,
                  disabled: d = !1,
                  dataTestId: p,
                  placeholder: f,
                  id: m,
                  name: h,
                  inputRef: g,
                }) {
                  return a.default.createElement(
                    'div',
                    { className: (0, r.default)('numeric-input', { 'numeric-input--error': o }) },
                    a.default.createElement('input', {
                      type: 'number',
                      value: t,
                      onKeyDown: e => {
                        c || ('.' !== e.key && ',' !== e.key) || e.preventDefault();
                      },
                      onChange: e => {
                        var t;
                        const a = e.target.value,
                          r = s.DECIMAL_REGEX.exec(a);
                        (null == r || null === (t = r[1]) || void 0 === t ? void 0 : t.length) >=
                          15 ||
                          null == n ||
                          n(a);
                      },
                      min: '0',
                      autoFocus: u,
                      disabled: d,
                      'data-testid': p,
                      placeholder: f,
                      id: m,
                      name: h,
                      ref: g,
                    }),
                    e &&
                      a.default.createElement(
                        l.Text,
                        {
                          color: i.TextColor.textAlternative,
                          variant: i.TextVariant.bodySm,
                          as: 'span',
                        },
                        e
                      )
                  );
                }
                c.propTypes = {
                  value: o.default.oneOfType([o.default.number, o.default.string]),
                  detailText: o.default.string,
                  onChange: o.default.func,
                  error: o.default.string,
                  autoFocus: o.default.bool,
                  allowDecimals: o.default.bool,
                  disabled: o.default.bool,
                  dataTestId: o.default.string,
                  placeholder: o.default.string,
                  name: o.default.string,
                  id: o.default.string,
                  inputRef: o.default.object,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/numeric-input/numeric-input.component.js' },
    ],
    [
      6782,
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
                  (n.default = function ({ origin: e, dataTestId: t, style: n }) {
                    const a = (0, o.useSelector)(s.getSubjectMetadata),
                      { iconUrl: u = '' } = a[e] || {};
                    return r.default.createElement(
                      l.Box,
                      {
                        display: i.Display.Flex,
                        alignItems: i.AlignItems.center,
                        justifyContent: i.JustifyContent.center,
                        marginTop: 6,
                        marginRight: 4,
                        marginLeft: 4,
                        padding: 2,
                        borderColor: i.BorderColor.borderMuted,
                        borderStyle: i.BorderStyle.solid,
                        borderRadius: i.BorderRadius.pill,
                        borderWidth: 1,
                        'data-testid': t,
                        style: n,
                      },
                      r.default.createElement(l.AvatarFavicon, {
                        src: u,
                        name: e,
                        'data-testid': `${t}-avatar-favicon`,
                      }),
                      r.default.createElement(
                        l.Text,
                        {
                          variant: i.TextVariant.bodySm,
                          as: 'h6',
                          color: i.TextColor.textAlternative,
                          marginLeft: 1,
                          'data-testid': `${t}-text`,
                        },
                        e
                      )
                    );
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
      { package: '$root$', file: 'ui/components/ui/origin-pill/origin-pill.tsx' },
    ],
    [
      6783,
      {
        './page-container-footer': 6784,
        './page-container-header': 6786,
        './page-container.component': 6788,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'PageContainerFooter', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'PageContainerHeader', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  }),
                  Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    get: function () {
                      return o.default;
                    },
                  });
                var a = i(e('./page-container-header')),
                  r = i(e('./page-container-footer')),
                  o = i(e('./page-container.component'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/page-container/index.js' },
    ],
    [
      6784,
      { './page-container-footer.component': 6785 },
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
                    (a = e('./page-container-footer.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/page-container/page-container-footer/index.js' },
    ],
    [
      6785,
      { '../../button': 6707, classnames: 4168, 'prop-types': 5082, react: 5328 },
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
                  i = s(e('../../button'));
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
                class c extends a.Component {
                  render() {
                    const {
                      children: e,
                      onCancel: t,
                      cancelText: n,
                      onSubmit: r,
                      submitText: s,
                      disabled: l,
                      submitButtonType: u,
                      hideCancel: c,
                      cancelButtonType: d,
                      buttonSizeLarge: p = !1,
                      footerClassName: f,
                      footerButtonClassName: m,
                      submitButtonIcon: h,
                    } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: (0, o.default)('page-container__footer', f) },
                      a.default.createElement(
                        'footer',
                        null,
                        !c &&
                          a.default.createElement(
                            i.default,
                            {
                              type: d || 'secondary',
                              large: p,
                              className: (0, o.default)(
                                'page-container__footer-button',
                                'page-container__footer-button__cancel',
                                m
                              ),
                              onClick: e => t(e),
                              'data-testid': 'page-container-footer-cancel',
                            },
                            n || this.context.t('cancel')
                          ),
                        a.default.createElement(
                          i.default,
                          {
                            type: u || 'primary',
                            large: p,
                            className: (0, o.default)('page-container__footer-button', m),
                            disabled: l,
                            onClick: e => r(e),
                            'data-testid': 'page-container-footer-next',
                            icon: h,
                          },
                          s || this.context.t('next')
                        )
                      ),
                      e &&
                        a.default.createElement(
                          'div',
                          { className: 'page-container__footer-secondary' },
                          e
                        )
                    );
                  }
                }
                (n.default = c),
                  u(c, 'propTypes', {
                    children: r.default.node,
                    onCancel: r.default.func,
                    cancelText: r.default.string,
                    cancelButtonType: r.default.string,
                    onSubmit: r.default.func,
                    submitText: r.default.string,
                    disabled: r.default.bool,
                    submitButtonType: r.default.string,
                    hideCancel: r.default.bool,
                    buttonSizeLarge: r.default.bool,
                    footerClassName: r.default.string,
                    footerButtonClassName: r.default.string,
                    submitButtonIcon: r.default.string,
                  }),
                  u(c, 'contextTypes', { t: r.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/page-container/page-container-footer/page-container-footer.component.js',
      },
    ],
    [
      6786,
      { './page-container-header.component': 6787 },
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
                    (a = e('./page-container-header.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/page-container/page-container-header/index.js' },
    ],
    [
      6787,
      { '../../button': 6707, classnames: 4168, 'prop-types': 5082, react: 5328 },
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
                  s = c(e('prop-types')),
                  l = c(e('classnames')),
                  u = c(e('../../button'));
                function c(e) {
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
                class p extends i.Component {
                  renderTabs() {
                    const { tabs: e } = this.props;
                    return e
                      ? i.default.createElement('ul', { className: 'page-container__tabs' }, e)
                      : null;
                  }
                  renderCloseAction() {
                    const { hideClose: e, onClose: t, headerCloseText: n } = this.props;
                    return e
                      ? null
                      : n
                        ? t &&
                          i.default.createElement(
                            u.default,
                            {
                              type: 'link',
                              className: 'page-container__header-close-text',
                              onClick: () => t(),
                            },
                            n
                          )
                        : t &&
                          i.default.createElement('button', {
                            className: 'page-container__header-close',
                            onClick: () => t(),
                            'aria-label': 'close',
                          });
                  }
                  renderHeaderRow() {
                    const {
                      showBackButton: e,
                      onBackButtonClick: t,
                      backButtonStyles: n,
                      backButtonString: a,
                    } = this.props;
                    return (
                      e &&
                      i.default.createElement(
                        'div',
                        { className: 'page-container__header-row' },
                        i.default.createElement(
                          'span',
                          { className: 'page-container__back-button', onClick: t, style: n },
                          a || 'Back'
                        )
                      )
                    );
                  }
                  render() {
                    const {
                      title: e,
                      subtitle: t,
                      tabs: n,
                      className: a,
                      hideClose: r,
                    } = this.props;
                    return i.default.createElement(
                      'div',
                      {
                        className: (0, l.default)('page-container__header', a, {
                          'page-container__header--no-padding-bottom': Boolean(n),
                        }),
                        'data-testid': 'page-container__header',
                      },
                      this.renderHeaderRow(),
                      e &&
                        i.default.createElement(
                          'div',
                          {
                            className: (0, l.default)('page-container__title', {
                              'page-container__title--no-margin-right': r,
                            }),
                          },
                          e
                        ),
                      t
                        ? i.default.createElement(
                            'div',
                            { className: 'page-container__subtitle' },
                            t
                          )
                        : null,
                      this.renderCloseAction(),
                      this.renderTabs()
                    );
                  }
                }
                (n.default = p),
                  (a = p),
                  (r = 'propTypes'),
                  (o = {
                    title: s.default.string,
                    subtitle: s.default.string,
                    onClose: s.default.func,
                    showBackButton: s.default.bool,
                    onBackButtonClick: s.default.func,
                    backButtonStyles: s.default.object,
                    backButtonString: s.default.string,
                    tabs: s.default.node,
                    headerCloseText: s.default.string,
                    className: s.default.string,
                    hideClose: s.default.bool,
                  }),
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
        file: 'ui/components/ui/page-container/page-container-header/page-container-header.component.js',
      },
    ],
    [
      6788,
      {
        './page-container-footer': 6784,
        './page-container-header': 6786,
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
                  o = s(e('./page-container-header')),
                  i = s(e('./page-container-footer'));
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
                class c extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      u(this, 'state', { activeTabIndex: this.props.defaultActiveTabIndex || 0 });
                  }
                  handleTabClick(e) {
                    this.setState({ activeTabIndex: e });
                  }
                  renderTabs() {
                    const { tabsComponent: e } = this.props;
                    if (!e) return null;
                    const t = a.default.Children.count(e.props.children);
                    return a.default.Children.map(
                      e.props.children,
                      (e, n) =>
                        e &&
                        a.default.cloneElement(e, {
                          onClick: e => this.handleTabClick(e),
                          tabIndex: n,
                          isActive: t > 1 && n === this.state.activeTabIndex,
                          key: n,
                          className: 'page-container__tab',
                        })
                    );
                  }
                  renderActiveTabContent() {
                    const { tabsComponent: e } = this.props;
                    let { children: t } = e.props;
                    t = t.filter(Boolean);
                    const { activeTabIndex: n } = this.state;
                    return (t[n] || t[0]).props.children;
                  }
                  renderContent() {
                    const { contentComponent: e, tabsComponent: t } = this.props;
                    return e || (t ? this.renderActiveTabContent() : null);
                  }
                  render() {
                    const {
                      title: e,
                      subtitle: t,
                      onClose: n,
                      showBackButton: r,
                      onBackButtonClick: s,
                      backButtonStyles: l,
                      backButtonString: u,
                      onCancel: c,
                      cancelText: d,
                      onSubmit: p,
                      submitText: f,
                      disabled: m,
                      headerCloseText: h,
                      hideCancel: g,
                    } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: 'page-container' },
                      a.default.createElement(o.default, {
                        title: e,
                        subtitle: t,
                        onClose: n,
                        showBackButton: r,
                        onBackButtonClick: s,
                        backButtonStyles: l,
                        backButtonString: u,
                        tabs: this.renderTabs(),
                        headerCloseText: h,
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'page-container__bottom' },
                        a.default.createElement(
                          'div',
                          { className: 'page-container__content' },
                          this.renderContent()
                        ),
                        a.default.createElement(i.default, {
                          onCancel: c,
                          cancelText: d,
                          hideCancel: g,
                          onSubmit: p,
                          submitText: f,
                          disabled: m,
                        })
                      )
                    );
                  }
                }
                (n.default = c),
                  u(c, 'contextTypes', { t: r.default.func }),
                  u(c, 'propTypes', {
                    backButtonString: r.default.string,
                    backButtonStyles: r.default.object,
                    headerCloseText: r.default.string,
                    onBackButtonClick: r.default.func,
                    onClose: r.default.func,
                    showBackButton: r.default.bool,
                    subtitle: r.default.string,
                    title: r.default.string.isRequired,
                    defaultActiveTabIndex: r.default.number,
                    tabsComponent: r.default.node,
                    contentComponent: r.default.node,
                    cancelText: r.default.string,
                    disabled: r.default.bool,
                    hideCancel: r.default.bool,
                    onCancel: r.default.func,
                    onSubmit: r.default.func,
                    submitText: r.default.string,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/page-container/page-container.component.js' },
    ],
    [
      6789,
      { './popover.component': 6790 },
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
                  r = (a = e('./popover.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/popover/index.js' },
    ],
    [
      6790,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../box': 6703,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
        'react-dom': 5157,
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
                  r = d(e('react-dom')),
                  o = d(e('prop-types')),
                  i = d(e('classnames')),
                  s = e('../../../hooks/useI18nContext'),
                  l = d(e('../box')),
                  u = e('../../../helpers/constants/design-system'),
                  c = e('../../component-library');
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
                const h = {
                    padding: [6, 4, 4],
                    display: 'flex',
                    flexDirection: u.FLEX_DIRECTION.COLUMN,
                    backgroundColor: u.BackgroundColor.backgroundDefault,
                    borderRadius: 'xl',
                  },
                  g = {
                    display: 'flex',
                    flexDirection: u.FLEX_DIRECTION.COLUMN,
                    justifyContent: u.JustifyContent.flexStart,
                    alignItems: u.AlignItems.stretch,
                    borderRadius: 'xl',
                  },
                  y = {
                    display: 'flex',
                    justifyContent: u.JustifyContent.spaceBetween,
                    padding: [4, 6, 6],
                  },
                  b = ({
                    title: e,
                    subtitle: t = '',
                    children: n,
                    footer: r,
                    footerClassName: o,
                    onBack: d,
                    onClose: p,
                    onScroll: f,
                    className: b,
                    contentClassName: v,
                    showArrow: _,
                    CustomBackground: T,
                    popoverRef: C,
                    showScrollDown: k,
                    onScrollDownButtonClick: w,
                    centerTitle: E,
                    wrapTitle: x,
                    headerProps: M = h,
                    contentProps: O = g,
                    footerProps: I = y,
                  }) => {
                    const N = (0, s.useI18nContext)(),
                      S = e || d || t || p,
                      P = () =>
                        a.default.createElement(
                          l.default,
                          m({}, h, M, { className: 'popover-header' }),
                          a.default.createElement(
                            l.default,
                            {
                              display: u.DISPLAY.FLEX,
                              alignItems: u.AlignItems.center,
                              justifyContent: E ? null : u.JustifyContent.spaceBetween,
                              className: (0, i.default)('popover-header__title', {
                                'popover-header__title--center': E,
                              }),
                              marginBottom: 2,
                            },
                            d
                              ? a.default.createElement(c.ButtonIcon, {
                                  iconName: c.IconName.ArrowLeft,
                                  ariaLabel: N('back'),
                                  onClick: d,
                                  color: u.Color.iconDefault,
                                  size: u.Size.SM,
                                })
                              : null,
                            a.default.createElement(
                              c.Text,
                              {
                                textAlign: E ? u.TextAlign.Center : u.TextAlign.Start,
                                className: x ? 'popover-header__title-wrap' : null,
                                ellipsis: !0,
                                variant: u.TextVariant.headingSm,
                                as: 'h2',
                                width: u.BLOCK_SIZES.FULL,
                              },
                              e
                            ),
                            p
                              ? a.default.createElement(c.ButtonIcon, {
                                  iconName: c.IconName.Close,
                                  ariaLabel: N('close'),
                                  'data-testid': 'popover-close',
                                  onClick: p,
                                  size: u.Size.SM,
                                })
                              : null
                          ),
                          t
                            ? a.default.createElement(c.Text, { variant: u.TextVariant.bodySm }, t)
                            : null
                        );
                    return a.default.createElement(
                      'div',
                      { className: 'popover-container' },
                      T
                        ? a.default.createElement(T, { onClose: p })
                        : a.default.createElement('div', { className: 'popover-bg', onClick: p }),
                      a.default.createElement(
                        'section',
                        { className: (0, i.default)('popover-wrap', b), ref: C },
                        _ ? a.default.createElement('div', { className: 'popover-arrow' }) : null,
                        S && a.default.createElement(P, null),
                        n
                          ? a.default.createElement(
                              l.default,
                              m(
                                { className: (0, i.default)('popover-content', v), onScroll: f },
                                g,
                                O
                              ),
                              n
                            )
                          : null,
                        k
                          ? a.default.createElement(
                              l.default,
                              {
                                display: u.DISPLAY.FLEX,
                                alignItems: u.AlignItems.center,
                                justifyContent: u.JustifyContent.center,
                                borderColor: u.BorderColor.borderDefault,
                                backgroundColor: u.BackgroundColor.backgroundDefault,
                                color: u.Color.iconDefault,
                                onClick: w,
                                className: 'popover-scroll-button',
                                style: { bottom: r ? '140px' : '12px' },
                                'data-testid': 'popover-scroll-button',
                              },
                              a.default.createElement(c.Icon, {
                                name: c.IconName.ArrowDown,
                                color: u.IconColor.primaryDefault,
                                size: c.IconSize.Md,
                                'aria-label': N('scrollDown'),
                              })
                            )
                          : null,
                        r
                          ? a.default.createElement(
                              l.default,
                              m({ className: (0, i.default)('popover-footer', o) }, y, I),
                              r
                            )
                          : null
                      )
                    );
                  };
                b.propTypes = {
                  wrapTitle: o.default.bool,
                  title: o.default.node,
                  subtitle: o.default.string,
                  children: o.default.node,
                  footer: o.default.node,
                  footerClassName: o.default.string,
                  onBack: o.default.func,
                  onClose: o.default.func,
                  onScroll: o.default.func,
                  CustomBackground: o.default.func,
                  contentClassName: o.default.string,
                  className: o.default.string,
                  showArrow: o.default.bool,
                  popoverRef: o.default.shape({ current: o.default.instanceOf(window.Element) }),
                  showScrollDown: o.default.bool,
                  onScrollDownButtonClick: o.default.func,
                  centerTitle: o.default.bool,
                  headerProps: o.default.shape({ ...l.default.propTypes }),
                  contentProps: o.default.shape({ ...l.default.propTypes }),
                  footerProps: o.default.shape({ ...l.default.propTypes }),
                };
                class v extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      f(this, 'rootNode', document.getElementById('popover-content')),
                      f(this, 'instanceNode', document.createElement('div'));
                  }
                  componentDidMount() {
                    this.rootNode && this.rootNode.appendChild(this.instanceNode);
                  }
                  componentWillUnmount() {
                    this.rootNode && this.rootNode.removeChild(this.instanceNode);
                  }
                  render() {
                    const e = a.default.createElement(b, this.props);
                    return this.rootNode ? r.default.createPortal(e, this.instanceNode) : e;
                  }
                }
                (n.default = v), f(v, 'propTypes', b.propTypes);
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/popover/popover.component.js' },
    ],
    [
      6791,
      { './pulse-loader': 6792 },
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
                  r = (a = e('./pulse-loader')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/pulse-loader/index.js' },
    ],
    [
      6792,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    return r.default.createElement(
                      'div',
                      { className: 'pulse-loader', 'data-testid': 'pulse-loader' },
                      r.default.createElement('div', {
                        className: 'pulse-loader__loading-dot-one',
                      }),
                      r.default.createElement('div', {
                        className: 'pulse-loader__loading-dot-two',
                      }),
                      r.default.createElement('div', {
                        className: 'pulse-loader__loading-dot-three',
                      })
                    );
                  });
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/pulse-loader/pulse-loader.js' },
    ],
    [
      6793,
      { './qr-code-view': 6794 },
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
                  r = (a = e('./qr-code-view')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/qr-code-view/index.js' },
    ],
    [
      6794,
      {
        '../../../../app/scripts/lib/multichain/address': 142,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/time': 5817,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        'ethereumjs-util': 4393,
        'prop-types': 5082,
        'qrcode-generator': 5141,
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
                var a = y(e('prop-types')),
                  r = (function (e, t) {
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
                  o = y(e('qrcode-generator')),
                  i = e('react-redux'),
                  s = e('ethereumjs-util'),
                  l = e('../../../../app/scripts/lib/multichain/address'),
                  u = e('../../component-library'),
                  c = e('../../../contexts/metametrics'),
                  d = e('../../../helpers/constants/design-system'),
                  p = e('../../../hooks/useI18nContext'),
                  f = e('../../../../shared/constants/time'),
                  m = e('../../../../shared/constants/metametrics'),
                  h = e('../../../hooks/useCopyToClipboard');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function y(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function b({ Qr: e, warning: t, accountName: n }) {
                  const a = (0, r.useContext)(c.MetaMetricsContext),
                    [i, g] = (0, h.useCopyToClipboard)(f.MINUTE),
                    y = (0, p.useI18nContext)(),
                    { message: b, data: v } = e,
                    _ = (0, l.normalizeSafeAddress)(v),
                    T = `${(0, s.isHexPrefixed)(v) ? 'ethereum:' : ''}${_}`,
                    C = (0, o.default)(4, 'M');
                  C.addData(T), C.make();
                  const k = b
                      ? r.default.createElement('div', { className: 'qr-code__header' }, b)
                      : null,
                    w = v.substring(0, 6),
                    E = v.substring(6, v.length - 5),
                    x = v.substring(v.length - 5);
                  return r.default.createElement(
                    'div',
                    { className: 'qr-code' },
                    Array.isArray(b)
                      ? r.default.createElement(
                          'div',
                          { className: 'qr-code__message-container' },
                          b.map((e, t) =>
                            r.default.createElement(
                              u.Text,
                              {
                                key: t,
                                variant: d.TextVariant.bodyXs,
                                color: d.TextColor.warningDefault,
                              },
                              e
                            )
                          )
                        )
                      : k,
                    t ? r.default.createElement('span', { className: 'qr-code__error' }, t) : null,
                    r.default.createElement(
                      u.Box,
                      { className: 'qr-code__wrapper', marginBottom: 4 },
                      r.default.createElement(u.Box, {
                        'data-testid': 'qr-code-image',
                        className: 'qr-code__image',
                        dangerouslySetInnerHTML: { __html: C.createTableTag(5, 16) },
                      }),
                      r.default.createElement(
                        u.Box,
                        { className: 'qr-code__logo' },
                        r.default.createElement('img', {
                          src: 'images/logo/metamask-fox.svg',
                          alt: 'Logo',
                        })
                      )
                    ),
                    n
                      ? r.default.createElement(
                          u.Text,
                          {
                            variant: d.TextVariant.bodyLgMedium,
                            textAlign: d.TextAlign.Center,
                            marginBottom: 4,
                          },
                          n
                        )
                      : null,
                    r.default.createElement(
                      u.Text,
                      {
                        variant: d.TextVariant.bodyMd,
                        className: 'qr-code__address-segments',
                        marginBottom: 4,
                      },
                      w,
                      r.default.createElement(
                        u.Text,
                        {
                          variant: d.TextVariant.bodyMd,
                          color: d.TextColor.textMuted,
                          className: 'qr-code__address-inner-segment',
                        },
                        E
                      ),
                      x
                    ),
                    r.default.createElement(
                      u.Box,
                      {
                        display: d.Display.Flex,
                        marginBottom: 4,
                        gap: 2,
                        alignItems: d.AlignItems.center,
                        color: d.TextColor.primaryDefault,
                        className: 'qr-code__copy-button',
                        'data-testid': 'address-copy-button-text',
                        onClick: () => {
                          g(_),
                            a({
                              category: m.MetaMetricsEventCategory.Accounts,
                              event: m.MetaMetricsEventName.PublicAddressCopied,
                              properties: { location: 'Account Details Modal' },
                            });
                        },
                      },
                      r.default.createElement(u.Icon, {
                        name: i ? u.IconName.CopySuccess : u.IconName.Copy,
                        size: u.IconSize.Sm,
                        color: d.IconColor.primaryDefault,
                      }),
                      y('copyAddressShort')
                    )
                  );
                }
                b.propTypes = {
                  warning: a.default.node,
                  Qr: a.default.shape({
                    message: a.default.oneOfType([
                      a.default.arrayOf(a.default.node),
                      a.default.node,
                    ]),
                    data: a.default.string.isRequired,
                  }).isRequired,
                };
                n.default = (0, i.connect)(function (e) {
                  const { buyView: t, warning: n } = e.appState;
                  return { buyView: t, warning: n };
                })(b);
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/qr-code-view/qr-code-view.tsx' },
    ],
    [
      6795,
      { './sender-to-recipient.component': 6796 },
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
                    (a = e('./sender-to-recipient.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/sender-to-recipient/index.js' },
    ],
    [
      6796,
      {
        '../../../../shared/constants/copy': 5792,
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../app/name/name': 6115,
        '../../component-library': 6402,
        '../account-mismatch-warning/account-mismatch-warning.component': 6697,
        '../identicon': 6758,
        '../tooltip': 6818,
        './sender-to-recipient.constants': 6797,
        '@metamask/name-controller': 2190,
        classnames: 4168,
        'copy-to-clipboard': 4209,
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
                  (n.RecipientWithAddress = C),
                  (n.default = w);
                var a = e('@metamask/name-controller'),
                  r = v(e('classnames')),
                  o = v(e('copy-to-clipboard')),
                  i = v(e('prop-types')),
                  s = (function (e, t) {
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
                  l = e('../../../../shared/constants/copy'),
                  u = e('../../../../shared/modules/hexstring-utils'),
                  c = e('../../../helpers/utils/util'),
                  d = e('../../../hooks/useI18nContext'),
                  p = v(e('../../app/name/name')),
                  f = e('../../component-library'),
                  m = v(e('../account-mismatch-warning/account-mismatch-warning.component')),
                  h = v(e('../identicon')),
                  g = v(e('../tooltip')),
                  y = e('./sender-to-recipient.constants');
                function b(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (b = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function v(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const _ = {
                  [y.DEFAULT_VARIANT]: 'sender-to-recipient--default',
                  [y.CARDS_VARIANT]: 'sender-to-recipient--cards',
                  [y.FLAT_VARIANT]: 'sender-to-recipient--flat',
                };
                function T({
                  addressOnly: e,
                  checksummedSenderAddress: t,
                  senderName: n,
                  onSenderClick: a,
                  senderAddress: i,
                  warnUserOnAccountMismatch: p,
                }) {
                  const f = (0, d.useI18nContext)(),
                    [y, b] = (0, s.useState)(!1);
                  let v = s.default.createElement('p', null, f('copiedExclamation'));
                  return (
                    y ||
                      (v = e
                        ? s.default.createElement('p', null, f('copyAddress'))
                        : s.default.createElement(
                            'p',
                            null,
                            (0, c.shortenAddress)(t),
                            s.default.createElement('br', null),
                            f('copyAddress')
                          )),
                    s.default.createElement(
                      'div',
                      {
                        className: (0, r.default)(
                          'sender-to-recipient__party sender-to-recipient__party--sender'
                        ),
                        onClick: () => {
                          b(!0), (0, o.default)(t, l.COPY_OPTIONS), a && a();
                        },
                      },
                      s.default.createElement(
                        'div',
                        { className: 'sender-to-recipient__sender-icon' },
                        s.default.createElement(h.default, {
                          address: (0, u.toChecksumHexAddress)(i),
                          diameter: 24,
                        })
                      ),
                      s.default.createElement(
                        g.default,
                        {
                          position: 'bottom',
                          html: v,
                          wrapperClassName: 'sender-to-recipient__tooltip-wrapper',
                          containerClassName: 'sender-to-recipient__tooltip-container',
                          onHidden: () => b(!1),
                        },
                        s.default.createElement(
                          'div',
                          { className: 'sender-to-recipient__name' },
                          e
                            ? s.default.createElement(
                                'span',
                                null,
                                `${n || (0, c.shortenAddress)(t)}`
                              )
                            : n
                        )
                      ),
                      p && s.default.createElement(m.default, { address: i })
                    )
                  );
                }
                function C({
                  checksummedRecipientAddress: e,
                  onRecipientClick: t,
                  addressOnly: n,
                  recipientName: r,
                  recipientIsOwnedAccount: i,
                  chainId: u,
                }) {
                  const f = (0, d.useI18nContext)(),
                    [m, h] = (0, s.useState)(!1);
                  let y = s.default.createElement('p', null, f('copiedExclamation'));
                  return (
                    m ||
                      (y = n
                        ? s.default.createElement('p', null, f('copyAddress'))
                        : s.default.createElement(
                            'p',
                            null,
                            (0, c.shortenAddress)(e),
                            s.default.createElement('br', null),
                            f('copyAddress')
                          )),
                    s.default.createElement(
                      s.default.Fragment,
                      null,
                      s.default.createElement(
                        'div',
                        {
                          className:
                            'sender-to-recipient__party sender-to-recipient__party--recipient sender-to-recipient__party--recipient-with-address',
                          onClick: () => {
                            i ? (h(!0), (0, o.default)(e, l.COPY_OPTIONS)) : t && t();
                          },
                        },
                        s.default.createElement(
                          g.default,
                          {
                            position: 'bottom',
                            disabled: !r,
                            html: y,
                            wrapperClassName: 'sender-to-recipient__tooltip-wrapper',
                            containerClassName: 'sender-to-recipient__tooltip-container',
                            onHidden: () => h(!1),
                          },
                          s.default.createElement(p.default, {
                            value: e,
                            type: a.NameType.ETHEREUM_ADDRESS,
                            variation: u,
                          })
                        )
                      )
                    )
                  );
                }
                function k({ variant: e }) {
                  return e === y.DEFAULT_VARIANT
                    ? s.default.createElement(
                        'div',
                        { className: 'sender-to-recipient__arrow-container' },
                        s.default.createElement(
                          'div',
                          { className: 'sender-to-recipient__arrow-circle' },
                          s.default.createElement('i', {
                            className: 'fa fa-arrow-right sender-to-recipient__arrow-circle__icon',
                          })
                        )
                      )
                    : s.default.createElement(
                        'div',
                        { className: 'sender-to-recipient__arrow-container' },
                        s.default.createElement(f.Icon, { name: f.IconName.ArrowRight })
                      );
                }
                function w({
                  senderAddress: e,
                  addressOnly: t,
                  senderName: n,
                  recipientName: a,
                  onRecipientClick: o,
                  onSenderClick: i,
                  recipientAddress: l,
                  variant: c,
                  warnUserOnAccountMismatch: p,
                  recipientIsOwnedAccount: f,
                  chainId: m,
                }) {
                  const h = (0, d.useI18nContext)(),
                    g = (0, u.toChecksumHexAddress)(e),
                    y = (0, u.toChecksumHexAddress)(l);
                  return s.default.createElement(
                    'div',
                    {
                      className: (0, r.default)('sender-to-recipient', _[c]),
                      'data-testid': 'sender-to-recipient',
                    },
                    s.default.createElement(T, {
                      checksummedSenderAddress: g,
                      addressOnly: t,
                      senderName: n,
                      onSenderClick: i,
                      senderAddress: e,
                      warnUserOnAccountMismatch: p,
                    }),
                    s.default.createElement(k, { variant: c }),
                    l
                      ? s.default.createElement(C, {
                          checksummedRecipientAddress: y,
                          onRecipientClick: o,
                          addressOnly: t,
                          recipientName: a,
                          recipientIsOwnedAccount: f,
                          chainId: m,
                        })
                      : s.default.createElement(
                          'div',
                          {
                            className:
                              'sender-to-recipient__party sender-to-recipient__party--recipient',
                          },
                          s.default.createElement('i', { className: 'fa fa-file-text-o' }),
                          s.default.createElement(
                            'div',
                            { className: 'sender-to-recipient__name' },
                            h('newContract')
                          )
                        )
                  );
                }
                (T.propTypes = {
                  senderName: i.default.string,
                  checksummedSenderAddress: i.default.string,
                  addressOnly: i.default.bool,
                  senderAddress: i.default.string,
                  onSenderClick: i.default.func,
                  warnUserOnAccountMismatch: i.default.bool,
                }),
                  (C.propTypes = {
                    checksummedRecipientAddress: i.default.string,
                    recipientName: i.default.string,
                    addressOnly: i.default.bool,
                    onRecipientClick: i.default.func,
                    recipientIsOwnedAccount: i.default.bool,
                    chainId: i.default.string,
                  }),
                  (k.propTypes = {
                    variant: i.default.oneOf([y.DEFAULT_VARIANT, y.CARDS_VARIANT, y.FLAT_VARIANT]),
                  }),
                  (w.defaultProps = { variant: y.DEFAULT_VARIANT, warnUserOnAccountMismatch: !0 }),
                  (w.propTypes = {
                    senderName: i.default.string,
                    senderAddress: i.default.string,
                    recipientName: i.default.string,
                    recipientAddress: i.default.string,
                    variant: i.default.oneOf([y.DEFAULT_VARIANT, y.CARDS_VARIANT, y.FLAT_VARIANT]),
                    addressOnly: i.default.bool,
                    onRecipientClick: i.default.func,
                    onSenderClick: i.default.func,
                    warnUserOnAccountMismatch: i.default.bool,
                    recipientIsOwnedAccount: i.default.bool,
                    chainId: i.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/sender-to-recipient/sender-to-recipient.component.js',
      },
    ],
    [
      6797,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.FLAT_VARIANT = n.DEFAULT_VARIANT = n.CARDS_VARIANT = void 0);
                (n.DEFAULT_VARIANT = 'DEFAULT_VARIANT'),
                  (n.CARDS_VARIANT = 'CARDS_VARIANT'),
                  (n.FLAT_VARIANT = 'FLAT_VARIANT');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/sender-to-recipient/sender-to-recipient.constants.js',
      },
    ],
    [
      6798,
      { './show-hide-toggle': 6799 },
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
                  r = (a = e('./show-hide-toggle')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/show-hide-toggle/index.js' },
    ],
    [
      6799,
      {
        '../icon/icon-eye': 6748,
        '../icon/icon-eye-slash': 6747,
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
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = l(e('../icon/icon-eye')),
                  s = l(e('../icon/icon-eye-slash'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({
                  id: e,
                  shown: t,
                  onChange: n,
                  ariaLabelHidden: r,
                  ariaLabelShown: l,
                  className: u,
                  'data-testid': c,
                  disabled: d,
                  title: p,
                }) =>
                  a.default.createElement(
                    'div',
                    { className: (0, o.default)('show-hide-toggle', u) },
                    a.default.createElement('input', {
                      className: 'show-hide-toggle__input',
                      id: e,
                      type: 'checkbox',
                      checked: t,
                      onChange: n,
                      'data-testid': c,
                      disabled: d,
                    }),
                    a.default.createElement(
                      'label',
                      { htmlFor: e, className: 'show-hide-toggle__label', title: p },
                      t
                        ? a.default.createElement(i.default, {
                            ariaLabel: l,
                            className: 'show-hide-toggle__icon',
                          })
                        : a.default.createElement(s.default, {
                            ariaLabel: r,
                            className: 'show-hide-toggle__icon',
                          })
                    )
                  );
                u.propTypes = {
                  id: r.default.string.isRequired,
                  shown: r.default.bool.isRequired,
                  onChange: r.default.func.isRequired,
                  ariaLabelHidden: r.default.string.isRequired,
                  ariaLabelShown: r.default.string.isRequired,
                  className: r.default.string,
                  'data-testid': r.default.string,
                  disabled: r.default.bool,
                  title: r.default.string,
                };
                n.default = u;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/show-hide-toggle/show-hide-toggle.js' },
    ],
    [
      6800,
      { './site-origin': 6801 },
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
                  r = (a = e('./site-origin')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/site-origin/index.js' },
    ],
    [
      6801,
      {
        '../../../helpers/constants/design-system': 6872,
        '../chip': 6716,
        '../icon-with-fallback': 6746,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = u(e('../chip')),
                  s = u(e('../icon-with-fallback')),
                  l = e('../../../helpers/constants/design-system');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c({
                  siteOrigin: e,
                  iconSrc: t,
                  iconName: n,
                  chip: r,
                  className: u,
                  title: c,
                  leftIcon: d,
                  rightIcon: p,
                }) {
                  return a.default.createElement(
                    'div',
                    { className: (0, o.default)('site-origin', u), title: c },
                    r
                      ? a.default.createElement(i.default, {
                          borderColor: l.BorderColor.borderMuted,
                          label: e,
                          maxContent: !1,
                          leftIcon:
                            d || a.default.createElement(s.default, { icon: t, name: n, size: 24 }),
                          rightIcon: p,
                        })
                      : a.default.createElement('bdi', { dir: 'ltr' }, e)
                  );
                }
                c.propTypes = {
                  siteOrigin: r.default.string.isRequired,
                  iconName: r.default.string,
                  iconSrc: r.default.string,
                  className: r.default.string,
                  title: r.default.string,
                  chip: r.default.bool,
                  leftIcon: r.default.node,
                  rightIcon: r.default.node,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/site-origin/site-origin.js' },
    ],
    [
      6802,
      { './spinner.component': 6803 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./spinner.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/spinner/index.js' },
    ],
    [
      6803,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const i = ({ className: e = '', color: t = 'var(--color-icon-muted)' }) =>
                  a.default.createElement(
                    'div',
                    { className: `spinner ${e}` },
                    a.default.createElement(
                      'svg',
                      {
                        className: 'lds-spinner',
                        width: '100%',
                        height: '100%',
                        xmlns: 'http://www.w3.org/2000/svg',
                        xmlnsXlink: 'http://www.w3.org/1999/xlink',
                        viewBox: '0 0 100 100',
                        preserveAspectRatio: 'xMidYMid',
                        style: { background: 'none' },
                      },
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(0 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.9166666666666666s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(30 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.8333333333333334s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(60 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.75s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(90 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.6666666666666666s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(120 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.5833333333333334s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(150 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.5s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(180 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.4166666666666667s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(210 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.3333333333333333s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(240 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.25s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(270 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.16666666666666666s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(300 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '-0.08333333333333333s',
                            repeatCount: 'indefinite',
                          })
                        )
                      ),
                      a.default.createElement(
                        'g',
                        { transform: 'rotate(330 50 50)' },
                        a.default.createElement(
                          'rect',
                          { x: 45, y: 0, rx: 0, ry: 0, width: 10, height: 30, fill: t },
                          a.default.createElement('animate', {
                            attributeName: 'opacity',
                            values: '1;0',
                            dur: '1s',
                            begin: '0s',
                            repeatCount: 'indefinite',
                          })
                        )
                      )
                    )
                  );
                i.propTypes = { className: r.default.string, color: r.default.string };
                n.default = i;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/spinner/spinner.component.js' },
    ],
    [
      6804,
      { './survey-toast': 6805 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SurveyToast', {
                    enumerable: !0,
                    get: function () {
                      return a.SurveyToast;
                    },
                  });
                var a = e('./survey-toast');
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/survey-toast/index.ts' },
    ],
    [
      6805,
      {
        '../../../../shared/constants/accounts': 5785,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/lib/fetch-with-cache': 5834,
        '../../../contexts/metametrics': 6836,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../multichain': 6574,
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
                  (n.SurveyToast = function () {
                    const [e, t] = (0, r.useState)(null),
                      n = (0, o.useDispatch)(),
                      a = (0, r.useContext)(l.MetaMetricsContext),
                      m = (0, o.useSelector)(c.getLastViewedUserSurvey),
                      h = (0, o.useSelector)(c.getParticipateInMetaMetrics),
                      g = (0, o.useSelector)(c.getUseExternalServices),
                      y = (0, o.useSelector)(c.getSelectedInternalAccount),
                      b = (0, o.useSelector)(c.getMetaMetricsId),
                      v = (0, r.useMemo)(
                        () => `${d.ACCOUNTS_API_BASE_URL}/v1/users/${b}/surveys`,
                        [b]
                      );
                    function _(t) {
                      h &&
                        e &&
                        a({
                          event: u.MetaMetricsEventName.SurveyToast,
                          category: u.MetaMetricsEventCategory.Feedback,
                          properties: { response: t, survey: e.id },
                        });
                    }
                    if (
                      ((0, r.useEffect)(() => {
                        if (!g || !b || !h) return undefined;
                        const e = new AbortController();
                        return (
                          (async () => {
                            try {
                              const n = await (0, i.default)({
                                  url: v,
                                  fetchOptions: {
                                    method: 'GET',
                                    headers: { 'x-metamask-clientproduct': 'metamask-extension' },
                                    signal: e.signal,
                                  },
                                  functionName: 'fetchSurveys',
                                  cacheOptions: { cacheRefreshTime: s.DAY },
                                }),
                                a = null == n ? void 0 : n.surveys;
                              if (!a || 0 === Object.keys(a).length || a.id <= m) return;
                              t(a);
                            } catch (e) {
                              e instanceof Error &&
                                'AbortError' !== e.name &&
                                console.error('Failed to fetch survey:', b, e);
                            }
                          })(),
                          () => {
                            e.abort();
                          }
                        );
                      }, [null == y ? void 0 : y.address, m, g, b, n]),
                      !e || e.id <= m)
                    )
                      return null;
                    return r.default.createElement(f.Toast, {
                      dataTestId: 'survey-toast',
                      key: 'survey-toast',
                      text: e.description,
                      actionText: e.cta,
                      onActionClick: function () {
                        e &&
                          (global.platform.openTab({ url: e.url }),
                          n((0, p.setLastViewedUserSurvey)(e.id)),
                          _('accept'));
                      },
                      onClose: function () {
                        e && (n((0, p.setLastViewedUserSurvey)(e.id)), _('deny'));
                      },
                      startAdornment: null,
                    });
                  });
                var a,
                  r = (function (e, t) {
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
                  o = e('react-redux'),
                  i =
                    (a = e('../../../../shared/lib/fetch-with-cache')) && a.__esModule
                      ? a
                      : { default: a },
                  s = e('../../../../shared/constants/time'),
                  l = e('../../../contexts/metametrics'),
                  u = e('../../../../shared/constants/metametrics'),
                  c = e('../../../selectors'),
                  d = e('../../../../shared/constants/accounts'),
                  p = e('../../../store/actions'),
                  f = e('../../multichain');
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
      { package: '$root$', file: 'ui/components/ui/survey-toast/survey-toast.tsx' },
    ],
    [
      6806,
      { './tab': 6807, './tabs.component': 6809 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Tab', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'Tabs', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var a = o(e('./tabs.component')),
                  r = o(e('./tab'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/tabs/index.js' },
    ],
    [
      6807,
      { './tab.component': 6808 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./tab.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/tabs/tab/index.js' },
    ],
    [
      6808,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library');
                function l(e) {
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
                const c = e => {
                  const {
                    buttonClassName: t,
                    activeClassName: n,
                    className: r,
                    'data-testid': l,
                    isActive: c,
                    isSingleTab: d,
                    name: p,
                    onClick: f,
                    tabIndex: m,
                    tabKey: h,
                    children: g,
                    textProps: y,
                    disabled: b,
                    ...v
                  } = e;
                  return a.default.createElement(
                    s.Box,
                    u(
                      {
                        as: 'li',
                        'data-testid': l,
                        onClick: e => {
                          e.preventDefault(), f(m);
                        },
                        key: h,
                      },
                      v,
                      {
                        className: (0, o.default)('tab', r, {
                          'tab--single': d,
                          'tab--active': c,
                          [n]: n && c,
                          ...(null == v ? void 0 : v.className),
                        }),
                      }
                    ),
                    a.default.createElement(
                      s.Text,
                      u(
                        {
                          as: 'button',
                          padding: 2,
                          textAlign: i.TextAlign.Center,
                          display: i.Display.Block,
                          width: i.BlockSize.Full,
                          variant: i.TextVariant.bodyMd,
                          color: i.TextColor.inherit,
                        },
                        y,
                        {
                          className: (0, o.default)(t, null == y ? void 0 : y.className),
                          disabled: b,
                        }
                      ),
                      p
                    )
                  );
                };
                (c.propTypes = {
                  activeClassName: r.default.string,
                  buttonClassName: r.default.string,
                  className: r.default.string,
                  'data-testid': r.default.string,
                  isActive: r.default.bool,
                  isSingleTab: r.default.bool,
                  name: r.default.node.isRequired,
                  tabKey: r.default.string.isRequired,
                  onClick: r.default.func,
                  tabIndex: r.default.number,
                  children: r.default.node,
                  textProps: r.default.object,
                  width: r.default.string,
                  disabled: r.default.bool,
                }),
                  (c.defaultProps = {
                    activeClassName: undefined,
                    buttonClassName: undefined,
                    className: undefined,
                    onClick: undefined,
                    'data-testid': undefined,
                  });
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/tabs/tab/tab.component.js' },
    ],
    [
      6809,
      {
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
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
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system');
                function l(e) {
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
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const d = ({
                  defaultActiveTabKey: e,
                  onTabClick: t,
                  children: n,
                  tabsClassName: r = '',
                  subHeader: l = null,
                  tabListProps: u = {},
                  tabContentProps: d = {},
                  ...p
                }) => {
                  const f = () => a.default.Children.toArray(n).filter(Boolean),
                    [m, h] = (0, a.useState)(() => {
                      return Math.max(
                        ((t = e), f().findIndex(e => (null == e ? void 0 : e.props.tabKey) === t)),
                        0
                      );
                      var t;
                    });
                  return a.default.createElement(
                    i.Box,
                    c({ className: 'tabs' }, p),
                    a.default.createElement(
                      i.Box,
                      c(
                        {
                          as: 'ul',
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.flexStart,
                          backgroundColor: s.BackgroundColor.backgroundDefault,
                          gap: 0,
                        },
                        u,
                        { className: (0, o.default)('tabs__list', r, u.className) }
                      ),
                      (() => {
                        const e = a.default.Children.count(f());
                        return a.default.Children.map(f(), (n, r) => {
                          const o = null == n ? void 0 : n.props.tabKey,
                            i = 1 === e;
                          return (
                            n &&
                            a.default.cloneElement(n, {
                              onClick: e =>
                                ((e, n) => {
                                  e !== m && (h(e), null == t || t(n));
                                })(e, o),
                              tabIndex: r,
                              isActive: e > 1 && r === m,
                              isSingleTab: i,
                            })
                          );
                        });
                      })()
                    ),
                    l,
                    a.default.createElement(
                      i.Box,
                      c({}, d, { className: (0, o.default)('tabs__content', d.className) }),
                      (() => {
                        const e = f();
                        if ((Array.isArray(e) && !e[m]) || (!Array.isArray(e) && 0 !== m))
                          throw new Error(`Tab at index '${m}' does not exist`);
                        return e[m] ? e[m].props.children : e.props.children;
                      })()
                    )
                  );
                };
                n.default = d;
                d.propTypes = {
                  defaultActiveTabKey: r.default.string,
                  onTabClick: r.default.func,
                  children: r.default.node.isRequired,
                  tabsClassName: r.default.string,
                  subHeader: r.default.node,
                  tabListProps: r.default.object,
                  tabContentProps: r.default.object,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/tabs/tabs.component.js' },
    ],
    [
      681,
      {
        '@ethereumjs/util': 477,
        '@keystonehq/bc-ur-registry': 703,
        buffer: 4139,
        hdkey: 4698,
        uuid: 5733,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 });
                    var a,
                      r = e('@keystonehq/bc-ur-registry'),
                      o = e('uuid'),
                      i =
                        (a = e('hdkey')) && 'object' == typeof a && 'default' in a ? a.default : a,
                      s = e('@ethereumjs/util');
                    const l = {
                        ETH_SIGN_REQUEST: new r.RegistryType('eth-sign-request', 401),
                        ETH_SIGNATURE: new r.RegistryType('eth-signature', 402),
                        ETH_NFT_ITEM: new r.RegistryType('eth-nft-item', 403),
                      },
                      { decodeToDataItem: u, RegistryTypes: c } = r.extend;
                    var d, p;
                    !(function (e) {
                      (e[(e.requestId = 1)] = 'requestId'),
                        (e[(e.signData = 2)] = 'signData'),
                        (e[(e.dataType = 3)] = 'dataType'),
                        (e[(e.chainId = 4)] = 'chainId'),
                        (e[(e.derivationPath = 5)] = 'derivationPath'),
                        (e[(e.address = 6)] = 'address'),
                        (e[(e.origin = 7)] = 'origin');
                    })(d || (d = {})),
                      ((p = n.DataType || (n.DataType = {}))[(p.transaction = 1)] = 'transaction'),
                      (p[(p.typedData = 2)] = 'typedData'),
                      (p[(p.personalMessage = 3)] = 'personalMessage'),
                      (p[(p.typedTransaction = 4)] = 'typedTransaction');
                    class f extends r.RegistryItem {
                      constructor(e) {
                        super(),
                          (this.getRegistryType = () => l.ETH_SIGN_REQUEST),
                          (this.getRequestId = () => this.requestId),
                          (this.getSignData = () => this.signData),
                          (this.getDataType = () => this.dataType),
                          (this.getChainId = () => this.chainId),
                          (this.getDerivationPath = () => this.derivationPath.getPath()),
                          (this.getSourceFingerprint = () =>
                            this.derivationPath.getSourceFingerprint()),
                          (this.getSignRequestAddress = () => this.address),
                          (this.getOrigin = () => this.origin),
                          (this.toDataItem = () => {
                            const e = {};
                            this.requestId &&
                              (e[d.requestId] = new r.DataItem(this.requestId, c.UUID.getTag())),
                              this.address && (e[d.address] = this.address),
                              this.chainId && (e[d.chainId] = Number(this.chainId)),
                              this.origin && (e[d.origin] = this.origin),
                              (e[d.signData] = this.signData),
                              (e[d.dataType] = this.dataType);
                            const t = this.derivationPath.toDataItem();
                            return (
                              t.setTag(this.derivationPath.getRegistryType().getTag()),
                              (e[d.derivationPath] = t),
                              new r.DataItem(e)
                            );
                          }),
                          (this.requestId = e.requestId),
                          (this.signData = e.signData),
                          (this.dataType = e.dataType),
                          (this.chainId = e.chainId),
                          (this.derivationPath = e.derivationPath),
                          (this.address = e.address),
                          (this.origin = e.origin);
                      }
                      static constructETHRequest(e, n, a, i, s, l, u, c) {
                        const d = a.replace(/[m|M]\//, '').split('/'),
                          p = new r.CryptoKeypath(
                            d.map(e => {
                              const t = parseInt(e.replace("'", ''));
                              let n = !1;
                              return (
                                e.endsWith("'") && (n = !0),
                                new r.PathComponent({ index: t, hardened: n })
                              );
                            }),
                            t.from(i, 'hex')
                          );
                        return new f({
                          requestId: s ? t.from(o.parse(s)) : undefined,
                          signData: e,
                          dataType: n,
                          derivationPath: p,
                          chainId: l,
                          address: u ? t.from(u.replace('0x', ''), 'hex') : undefined,
                          origin: c || undefined,
                        });
                      }
                    }
                    (f.fromDataItem = e => {
                      const t = e.getData(),
                        n = t[d.signData],
                        a = t[d.dataType],
                        o = r.CryptoKeypath.fromDataItem(t[d.derivationPath]),
                        i = t[d.chainId] ? t[d.chainId] : undefined,
                        s = t[d.address] ? t[d.address] : undefined,
                        l = t[d.requestId] ? t[d.requestId].getData() : undefined,
                        u = t[d.origin] ? t[d.origin] : undefined;
                      return new f({
                        requestId: l,
                        signData: n,
                        dataType: a,
                        chainId: i,
                        derivationPath: o,
                        address: s,
                        origin: u,
                      });
                    }),
                      (f.fromCBOR = e => {
                        const t = u(e);
                        return f.fromDataItem(t);
                      });
                    const { RegistryTypes: m, decodeToDataItem: h } = r.extend;
                    var g;
                    !(function (e) {
                      (e[(e.requestId = 1)] = 'requestId'),
                        (e[(e.signature = 2)] = 'signature'),
                        (e[(e.origin = 3)] = 'origin');
                    })(g || (g = {}));
                    class y extends r.RegistryItem {
                      constructor(e, t, n) {
                        super(),
                          (this.getRegistryType = () => l.ETH_SIGNATURE),
                          (this.getRequestId = () => this.requestId),
                          (this.getSignature = () => this.signature),
                          (this.getOrigin = () => this.origin),
                          (this.toDataItem = () => {
                            const e = {};
                            return (
                              this.requestId &&
                                (e[g.requestId] = new r.DataItem(this.requestId, m.UUID.getTag())),
                              this.origin && (e[g.origin] = this.origin),
                              (e[g.signature] = this.signature),
                              new r.DataItem(e)
                            );
                          }),
                          (this.signature = e),
                          (this.requestId = t),
                          (this.origin = n);
                      }
                    }
                    (y.fromDataItem = e => {
                      const t = e.getData(),
                        n = t[g.signature],
                        a = t[g.requestId] ? t[g.requestId].getData() : undefined;
                      return new y(n, a, t[g.origin]);
                    }),
                      (y.fromCBOR = e => {
                        const t = h(e);
                        return y.fromDataItem(t);
                      });
                    const { decodeToDataItem: b } = r.extend;
                    var v;
                    !(function (e) {
                      (e[(e.chainId = 1)] = 'chainId'),
                        (e[(e.contractAddress = 2)] = 'contractAddress'),
                        (e[(e.contractName = 3)] = 'contractName'),
                        (e[(e.name = 4)] = 'name'),
                        (e[(e.mediaData = 5)] = 'mediaData');
                    })(v || (v = {}));
                    class _ extends r.RegistryItem {
                      constructor(e) {
                        super(),
                          (this.getRegistryType = () => l.ETH_NFT_ITEM),
                          (this.getChainId = () => this.chainId),
                          (this.getName = () => this.name),
                          (this.getmediaData = () => this.mediaData),
                          (this.getContractAddress = () => this.contractAddress),
                          (this.getContractName = () => this.contractName),
                          (this.toDataItem = () => {
                            const e = {};
                            return (
                              (e[v.chainId] = this.chainId),
                              (e[v.name] = this.name),
                              (e[v.contractAddress] = this.contractAddress),
                              (e[v.contractName] = this.contractName),
                              (e[v.mediaData] = this.mediaData),
                              new r.DataItem(e)
                            );
                          }),
                          (this.chainId = e.chainId),
                          (this.name = e.name),
                          (this.contractAddress = e.contractAddress),
                          (this.contractName = e.contractName),
                          (this.mediaData = e.mediaData);
                      }
                      static constructETHNFTItem(e, t, n, a, r) {
                        return new _({
                          chainId: e,
                          contractAddress: t,
                          contractName: n,
                          mediaData: r,
                          name: a,
                        });
                      }
                    }
                    (_.fromDataItem = e => {
                      const t = e.getData(),
                        n = t[v.chainId],
                        a = t[v.name],
                        r = t[v.mediaData],
                        o = t[v.contractAddress],
                        i = t[v.contractName];
                      return new _({
                        chainId: n,
                        name: a,
                        contractAddress: o,
                        contractName: i,
                        mediaData: r,
                      });
                    }),
                      (_.fromCBOR = e => {
                        const t = b(e);
                        return _.fromDataItem(t);
                      });
                    const T = (e, n) => {
                      const a = i.fromExtendedKey(e).derive(n),
                        r = '0x' + t.from(s.publicToAddress(a.publicKey, !0)).toString('hex');
                      return s.toChecksumAddress(r);
                    };
                    r.patchTags(
                      Object.values(l)
                        .filter(e => !!e.getTag())
                        .map(e => e.getTag())
                    ),
                      Object.keys(r).forEach(function (e) {
                        'default' !== e &&
                          Object.defineProperty(n, e, {
                            enumerable: !0,
                            get: function () {
                              return r[e];
                            },
                          });
                      }),
                      (n.ETHNFTItem = _),
                      (n.ETHSignature = y),
                      (n.EthSignRequest = f),
                      (n.findHDPathFromAddress = (e, t, n, a) => {
                        for (let r = 0; r < n; r++) {
                          const n = T(t, `M/0/${r}`);
                          if (e.toLowerCase() == n.toLowerCase()) return `${a}/0/${r}`;
                        }
                        return null;
                      }),
                      (n.generateAddressFromXpub = T);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth',
        file: 'node_modules/@keystonehq/bc-ur-registry-eth/dist/bc-ur-registry-eth.cjs.development.js',
      },
    ],
    [
      6810,
      { './text-field.component': 6811 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./text-field.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/text-field/index.js' },
    ],
    [
      6811,
      {
        '@material-ui/core/TextField': 1097,
        '@material-ui/core/styles': 1170,
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
                  o = e('@material-ui/core/styles'),
                  i = s(e('@material-ui/core/TextField'));
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
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    l.apply(null, arguments)
                  );
                }
                const u = {
                    transform: 'none',
                    transition: 'none',
                    position: 'initial',
                    color: 'var(--color-text-default)',
                  },
                  c = ['"CentraNo1"', 'Helvetica', 'Arial', 'sans-serif'].join(', '),
                  d = {
                    materialLabel: {
                      '&$materialFocused': { color: 'var(--color-text-alternative)' },
                      '&$materialError': { color: 'var(--color-text-alternative)' },
                      fontWeight: '400',
                      color: 'var(--color-text-alternative)',
                    },
                    materialFocused: {},
                    materialUnderline: {
                      '&:before': {
                        borderBottom: '1px solid var(--color-text-default) !important',
                      },
                      '&:after': { borderBottom: '2px solid var(--color-primary-default)' },
                    },
                    materialError: {},
                    materialWhitePaddedRoot: { color: 'var(--color-text-alternative)' },
                    materialWhitePaddedInput: {
                      padding: '8px',
                      '&::placeholder': { color: 'var(--color-text-alternative)' },
                    },
                    materialWhitePaddedFocused: { color: 'var(--color-background-default)' },
                    materialWhitePaddedUnderline: {
                      '&:after': { borderBottom: '2px solid var(--color-background-default)' },
                    },
                    formLabel: {
                      fontFamily: c,
                      '&$formLabelFocused': { color: 'var(--color-text-alternative)' },
                      '&$materialError': { color: 'var(--color-text-alternative)' },
                    },
                    formLabelFocused: {},
                    inputFocused: {},
                    inputRoot: {
                      fontFamily: c,
                      'label + &': { marginTop: '9px' },
                      backgroundColor: 'var(--color-background-default)',
                      border: '1px solid var(--color-border-default)',
                      color: 'var(--color-text-default)',
                      height: '48px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      '&$inputFocused': { border: '1px solid var(--color-primary-default)' },
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    },
                    largeInputLabel: { ...u, fontSize: '1rem' },
                    inputLabel: { ...u, fontSize: '.75rem' },
                    inputMultiline: { lineHeight: 'initial !important' },
                  },
                  p = {
                    material: ({
                      dir: e,
                      classes: {
                        materialLabel: t,
                        materialFocused: n,
                        materialError: a,
                        materialUnderline: r,
                      },
                      startAdornment: o,
                      endAdornment: i,
                      min: s,
                      max: l,
                      autoComplete: u,
                    }) => ({
                      InputLabelProps: { classes: { root: t, focused: n, error: a } },
                      InputProps: {
                        startAdornment: o,
                        endAdornment: i,
                        classes: { underline: r },
                        inputProps: { dir: e, min: s, max: l, autoComplete: u },
                      },
                    }),
                    bordered: ({
                      dir: e,
                      classes: {
                        formLabel: t,
                        formLabelFocused: n,
                        materialError: a,
                        largeInputLabel: r,
                        inputLabel: o,
                        inputRoot: i,
                        input: s,
                        inputFocused: l,
                      },
                      largeLabel: u,
                      startAdornment: c,
                      endAdornment: d,
                      min: p,
                      max: f,
                      autoComplete: m,
                    }) => ({
                      InputLabelProps: {
                        shrink: !0,
                        className: u ? r : o,
                        classes: { root: t, focused: n, error: a },
                      },
                      InputProps: {
                        startAdornment: c,
                        endAdornment: d,
                        classes: { root: i, input: s, focused: l },
                        inputProps: { dir: e, min: p, max: f, autoComplete: m },
                        disableUnderline: 'true',
                      },
                    }),
                    'material-white-padded': ({
                      dir: e,
                      classes: {
                        materialWhitePaddedRoot: t,
                        materialWhitePaddedFocused: n,
                        materialWhitePaddedInput: a,
                        materialWhitePaddedUnderline: r,
                      },
                      startAdornment: o,
                      endAdornment: i,
                      min: s,
                      max: l,
                      autoComplete: u,
                    }) => ({
                      InputProps: {
                        startAdornment: o,
                        endAdornment: i,
                        classes: { root: t, focused: n, input: a, underline: r },
                        inputProps: { dir: e, min: s, max: l, autoComplete: u },
                      },
                    }),
                  },
                  f = ({
                    'data-testid': e,
                    error: t,
                    classes: n,
                    theme: r,
                    startAdornment: o,
                    endAdornment: s,
                    largeLabel: u,
                    dir: c,
                    min: d,
                    max: f,
                    autoComplete: m,
                    onPaste: h,
                    ...g
                  }) => {
                    const y = p[r]({
                      classes: n,
                      startAdornment: o,
                      endAdornment: s,
                      largeLabel: u,
                      dir: c,
                      min: d,
                      max: f,
                      autoComplete: m,
                    });
                    return (
                      (h || e) &&
                        (y.InputProps || (y.InputProps = {}),
                        y.InputProps.inputProps || (y.InputProps.inputProps = {}),
                        (y.InputProps.inputProps.onPaste = h),
                        (y.InputProps.inputProps['data-testid'] = e)),
                      a.default.createElement(
                        i.default,
                        l({ error: Boolean(t), helperText: t }, y, g)
                      )
                    );
                  };
                (f.defaultProps = { error: null, dir: 'auto', theme: 'bordered' }),
                  (f.propTypes = {
                    'data-testid': r.default.string,
                    error: r.default.oneOfType([r.default.string, r.default.element]),
                    classes: r.default.object,
                    dir: r.default.string,
                    theme: r.default.oneOf(['bordered', 'material', 'material-white-padded']),
                    startAdornment: r.default.element,
                    endAdornment: r.default.element,
                    largeLabel: r.default.bool,
                    min: r.default.number,
                    max: r.default.number,
                    autoComplete: r.default.string,
                    onPaste: r.default.func,
                  });
                n.default = (0, o.withStyles)(d)(f);
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/text-field/text-field.component.js' },
    ],
    [
      6812,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.RESIZE = void 0);
                n.RESIZE = {
                  NONE: 'none',
                  BOTH: 'both',
                  HORIZONTAL: 'horizontal',
                  VERTICAL: 'vertical',
                  INITIAL: 'initial',
                  INHERIT: 'inherit',
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/textarea/textarea.constants.js' },
    ],
    [
      6813,
      {
        '../../../helpers/constants/design-system': 6872,
        '../box': 6703,
        './textarea.constants': 6812,
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
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = e('../../../helpers/constants/design-system'),
                  s = u(e('../box')),
                  l = e('./textarea.constants');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const d = ({
                  className: e,
                  value: t,
                  onChange: n,
                  resize: r = l.RESIZE.BOTH,
                  scrollable: u = !1,
                  height: d,
                  boxProps: p,
                  ...f
                }) => {
                  const m = (0, o.default)('textarea', e, `textarea--resize-${r}`, {
                    'textarea--scrollable': u,
                    'textarea--not-scrollable': !u,
                  });
                  return a.default.createElement(
                    s.default,
                    c(
                      {
                        backgroundColor: i.BackgroundColor.backgroundDefault,
                        borderColor: i.BorderColor.borderDefault,
                        borderRadius: i.Size.SM,
                        borderStyle: i.BorderStyle.solid,
                        padding: 4,
                        width: i.BlockSize.Full,
                      },
                      p
                    ),
                    e =>
                      a.default.createElement(
                        'textarea',
                        c(
                          {
                            required: !0,
                            style: { height: d },
                            className: (0, o.default)(e, m),
                            value: t,
                            onChange: n,
                          },
                          f
                        )
                      )
                  );
                };
                d.propTypes = {
                  height: r.default.oneOfType([r.default.string, r.default.number]),
                  className: r.default.string,
                  value: r.default.string,
                  onChange: r.default.func,
                  resize: r.default.oneOf(Object.values(l.RESIZE)),
                  scrollable: r.default.bool,
                  boxProps: r.default.shape({ ...s.default.propTypes }),
                };
                n.default = d;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/textarea/textarea.js' },
    ],
    [
      6814,
      { './toggle-button.component': 6815 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('./toggle-button.component')) && a.__esModule ? a : { default: a };
                n.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/toggle-button/index.js' },
    ],
    [
      6815,
      {
        '../../../hooks/useTheme': 7008,
        '@metamask/design-tokens': 1520,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
        'react-toggle-button': 5325,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = u(e('react-toggle-button')),
                  i = u(e('classnames')),
                  s = e('@metamask/design-tokens'),
                  l = e('../../../hooks/useTheme');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = {
                    width: '40px',
                    height: '24px',
                    padding: '0px',
                    borderRadius: '26px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  d = { ...c, border: 'none' },
                  p = {
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    boxShadow: 'var(--shadow-size-xs) var(--color-shadow-default)',
                    alignSelf: 'center',
                    borderRadius: '50%',
                    position: 'relative',
                  },
                  f = {
                    activeThumb: { base: s.lightTheme.colors.primary.inverse },
                    inactiveThumb: { base: s.lightTheme.colors.primary.inverse },
                    active: {
                      base: s.lightTheme.colors.primary.default,
                      hover: s.lightTheme.colors.primary.defaultHover,
                    },
                    inactive: {
                      base: s.lightTheme.colors.icon.muted,
                      hover: s.lightTheme.colors.icon.muted,
                    },
                  },
                  m = {
                    activeThumb: { base: s.lightTheme.colors.primary.inverse },
                    inactiveThumb: { base: s.lightTheme.colors.primary.inverse },
                    active: {
                      base: s.darkTheme.colors.primary.default,
                      hover: s.darkTheme.colors.primary.defaultHover,
                    },
                    inactive: {
                      base: s.darkTheme.colors.icon.muted,
                      hover: s.darkTheme.colors.icon.muted,
                    },
                  },
                  h = e => {
                    const {
                        value: t,
                        onToggle: n,
                        offLabel: r,
                        onLabel: s,
                        disabled: u,
                        className: h,
                        dataTestId: g,
                      } = e,
                      y = t ? 'on' : 'off',
                      b = (0, l.useTheme)();
                    return a.default.createElement(
                      'label',
                      {
                        tabIndex: '0',
                        onKeyDown: e => {
                          'Enter' === e.key && n(t);
                        },
                        className: (0, i.default)(
                          'toggle-button',
                          `toggle-button--${y}`,
                          { 'toggle-button--disabled': u },
                          h
                        ),
                      },
                      a.default.createElement(o.default, {
                        value: t,
                        onToggle: u ? undefined : n,
                        activeLabel: '',
                        inactiveLabel: '',
                        trackStyle: t ? c : d,
                        thumbStyle: p,
                        thumbAnimateRange: [3, 18],
                        colors: 'light' === b ? f : m,
                        passThroughInputProps: { 'data-testid': g },
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'toggle-button__status' },
                        a.default.createElement(
                          'span',
                          { className: 'toggle-button__label-off' },
                          r
                        ),
                        a.default.createElement('span', { className: 'toggle-button__label-on' }, s)
                      )
                    );
                  };
                h.propTypes = {
                  value: r.default.bool,
                  onToggle: r.default.func,
                  offLabel: r.default.string,
                  onLabel: r.default.string,
                  disabled: r.default.bool,
                  className: r.default.string,
                  dataTestId: r.default.string,
                };
                n.default = h;
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/toggle-button/toggle-button.component.js' },
    ],
    [
      6816,
      { './token-balance': 6817 },
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
                  r = (a = e('./token-balance')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/token-balance/index.js' },
    ],
    [
      6817,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useIsOriginalTokenSymbol': 6987,
        '../../../hooks/useTokenFiatAmount': 7014,
        '../../../hooks/useTokenTracker': 7017,
        '../../component-library': 6402,
        '../currency-display': 6720,
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
                var a = d(e('react')),
                  r = d(e('prop-types')),
                  o = d(e('../currency-display')),
                  i = e('../../../hooks/useTokenTracker'),
                  s = e('../../../hooks/useTokenFiatAmount'),
                  l = e('../../../hooks/useIsOriginalTokenSymbol'),
                  u = e('../../component-library'),
                  c = e('../../../helpers/constants/design-system');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
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
                function f({ className: e, token: t, showFiat: n, ...r }) {
                  const { tokensWithBalances: d } = (0, i.useTokenTracker)({ tokens: [t] }),
                    { string: f, symbol: m, address: h } = d[0] || {},
                    g = (0, s.useTokenFiatAmount)(h, f, m),
                    y = (0, l.useIsOriginalTokenSymbol)(h, m) ? g : null;
                  return n
                    ? a.default.createElement(
                        u.Text,
                        { fontWeight: c.FontWeight.Medium, variant: c.TextVariant.bodyMd },
                        y
                      )
                    : a.default.createElement(
                        o.default,
                        p({ className: e, displayValue: f || '', suffix: m || '' }, r)
                      );
                }
                (f.propTypes = {
                  className: r.default.string,
                  token: r.default.shape({
                    address: r.default.string.isRequired,
                    decimals: r.default.number,
                    symbol: r.default.string,
                  }).isRequired,
                  showFiat: r.default.bool,
                }),
                  (f.defaultProps = { className: undefined });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/token-balance/token-balance.js' },
    ],
    [
      6818,
      { './tooltip': 6819 },
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
                  r = (a = e('./tooltip')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/tooltip/index.js' },
    ],
    [
      6819,
      { 'prop-types': 5082, react: 5328, 'react-tippy': 5324 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  o = (function (e, t) {
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
                  i = e('react-tippy');
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
                class u extends o.PureComponent {
                  render() {
                    const {
                      arrow: e,
                      children: t,
                      containerClassName: n,
                      disabled: a,
                      position: r,
                      html: s,
                      interactive: l,
                      size: u,
                      distance: c,
                      title: d,
                      trigger: p,
                      onHidden: f,
                      offset: m,
                      open: h,
                      wrapperClassName: g,
                      style: y,
                      wrapperStyle: b,
                      theme: v,
                      tabIndex: _,
                      tag: T,
                    } = this.props;
                    return d || s
                      ? o.default.createElement(
                          T,
                          { className: g, style: b },
                          o.default.createElement(
                            i.Tooltip,
                            {
                              arrow: e,
                              className: n,
                              disabled: a,
                              hideOnClick: !1,
                              distance: c,
                              html: s,
                              interactive: l,
                              onHidden: f,
                              position: r,
                              size: u,
                              offset: m,
                              style: y,
                              title: a ? '' : d,
                              trigger: p,
                              open: h,
                              theme: `tippy-tooltip--mm-custom ${v}`,
                              tabIndex: _ || 0,
                              tag: T,
                            },
                            t
                          )
                        )
                      : o.default.createElement('div', { className: g }, t);
                  }
                }
                (n.default = u),
                  l(u, 'defaultProps', {
                    arrow: !0,
                    children: null,
                    containerClassName: '',
                    html: null,
                    interactive: undefined,
                    onHidden: null,
                    distance: 0,
                    position: 'left',
                    offset: 0,
                    open: undefined,
                    size: 'small',
                    title: null,
                    trigger: 'mouseenter focus',
                    wrapperClassName: undefined,
                    theme: '',
                    tag: 'div',
                    wrapperStyle: {},
                  }),
                  l(u, 'propTypes', {
                    arrow: r.default.bool,
                    children: r.default.node,
                    containerClassName: r.default.string,
                    disabled: r.default.bool,
                    html: r.default.node,
                    distance: r.default.number,
                    interactive: r.default.bool,
                    offset: r.default.number,
                    onHidden: r.default.func,
                    open: r.default.bool,
                    position: r.default.oneOf(['top', 'right', 'bottom', 'left']),
                    size: r.default.oneOf(['small', 'regular', 'big']),
                    title: r.default.string,
                    trigger: r.default.any,
                    wrapperClassName: r.default.string,
                    style: r.default.object,
                    wrapperStyle: r.default.object,
                    theme: r.default.string,
                    tabIndex: r.default.number,
                    tag: r.default.string,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/tooltip/tooltip.js' },
    ],
    [
      682,
      {
        '@ethereumjs/util': 477,
        '@keystonehq/bc-ur-registry': 703,
        buffer: 4139,
        hdkey: 4698,
        uuid: 5733,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 });
                    var a,
                      r = e('@keystonehq/bc-ur-registry'),
                      o = e('uuid'),
                      i =
                        (a = e('hdkey')) && 'object' == typeof a && 'default' in a ? a.default : a,
                      s = e('@ethereumjs/util');
                    const l = {
                        ETH_SIGN_REQUEST: new r.RegistryType('eth-sign-request', 401),
                        ETH_SIGNATURE: new r.RegistryType('eth-signature', 402),
                        ETH_NFT_ITEM: new r.RegistryType('eth-nft-item', 403),
                      },
                      { decodeToDataItem: u, RegistryTypes: c } = r.extend;
                    var d, p;
                    !(function (e) {
                      (e[(e.requestId = 1)] = 'requestId'),
                        (e[(e.signData = 2)] = 'signData'),
                        (e[(e.dataType = 3)] = 'dataType'),
                        (e[(e.chainId = 4)] = 'chainId'),
                        (e[(e.derivationPath = 5)] = 'derivationPath'),
                        (e[(e.address = 6)] = 'address'),
                        (e[(e.origin = 7)] = 'origin');
                    })(d || (d = {})),
                      ((p = n.DataType || (n.DataType = {}))[(p.transaction = 1)] = 'transaction'),
                      (p[(p.typedData = 2)] = 'typedData'),
                      (p[(p.personalMessage = 3)] = 'personalMessage'),
                      (p[(p.typedTransaction = 4)] = 'typedTransaction');
                    class f extends r.RegistryItem {
                      constructor(e) {
                        super(),
                          (this.getRegistryType = () => l.ETH_SIGN_REQUEST),
                          (this.getRequestId = () => this.requestId),
                          (this.getSignData = () => this.signData),
                          (this.getDataType = () => this.dataType),
                          (this.getChainId = () => this.chainId),
                          (this.getDerivationPath = () => this.derivationPath.getPath()),
                          (this.getSourceFingerprint = () =>
                            this.derivationPath.getSourceFingerprint()),
                          (this.getSignRequestAddress = () => this.address),
                          (this.getOrigin = () => this.origin),
                          (this.toDataItem = () => {
                            const e = {};
                            this.requestId &&
                              (e[d.requestId] = new r.DataItem(this.requestId, c.UUID.getTag())),
                              this.address && (e[d.address] = this.address),
                              this.chainId && (e[d.chainId] = Number(this.chainId)),
                              this.origin && (e[d.origin] = this.origin),
                              (e[d.signData] = this.signData),
                              (e[d.dataType] = this.dataType);
                            const t = this.derivationPath.toDataItem();
                            return (
                              t.setTag(this.derivationPath.getRegistryType().getTag()),
                              (e[d.derivationPath] = t),
                              new r.DataItem(e)
                            );
                          }),
                          (this.requestId = e.requestId),
                          (this.signData = e.signData),
                          (this.dataType = e.dataType),
                          (this.chainId = e.chainId),
                          (this.derivationPath = e.derivationPath),
                          (this.address = e.address),
                          (this.origin = e.origin);
                      }
                      static constructETHRequest(e, n, a, i, s, l, u, c) {
                        const d = a.replace(/[m|M]\//, '').split('/'),
                          p = new r.CryptoKeypath(
                            d.map(e => {
                              const t = parseInt(e.replace("'", ''));
                              let n = !1;
                              return (
                                e.endsWith("'") && (n = !0),
                                new r.PathComponent({ index: t, hardened: n })
                              );
                            }),
                            t.from(i, 'hex')
                          );
                        return new f({
                          requestId: s ? t.from(o.parse(s)) : void 0,
                          signData: e,
                          dataType: n,
                          derivationPath: p,
                          chainId: l,
                          address: u ? t.from(u.replace('0x', ''), 'hex') : void 0,
                          origin: c || void 0,
                        });
                      }
                    }
                    (f.fromDataItem = e => {
                      const t = e.getData(),
                        n = t[d.signData],
                        a = t[d.dataType],
                        o = r.CryptoKeypath.fromDataItem(t[d.derivationPath]),
                        i = t[d.chainId] ? t[d.chainId] : void 0,
                        s = t[d.address] ? t[d.address] : void 0,
                        l = t[d.requestId] ? t[d.requestId].getData() : void 0;
                      return new f({
                        requestId: l,
                        signData: n,
                        dataType: a,
                        chainId: i,
                        derivationPath: o,
                        address: s,
                        origin: t[d.origin] ? t[d.origin] : void 0,
                      });
                    }),
                      (f.fromCBOR = e => {
                        const t = u(e);
                        return f.fromDataItem(t);
                      });
                    const { RegistryTypes: m, decodeToDataItem: h } = r.extend;
                    var g;
                    !(function (e) {
                      (e[(e.requestId = 1)] = 'requestId'),
                        (e[(e.signature = 2)] = 'signature'),
                        (e[(e.origin = 3)] = 'origin');
                    })(g || (g = {}));
                    class y extends r.RegistryItem {
                      constructor(e, t, n) {
                        super(),
                          (this.getRegistryType = () => l.ETH_SIGNATURE),
                          (this.getRequestId = () => this.requestId),
                          (this.getSignature = () => this.signature),
                          (this.getOrigin = () => this.origin),
                          (this.toDataItem = () => {
                            const e = {};
                            return (
                              this.requestId &&
                                (e[g.requestId] = new r.DataItem(this.requestId, m.UUID.getTag())),
                              this.origin && (e[g.origin] = this.origin),
                              (e[g.signature] = this.signature),
                              new r.DataItem(e)
                            );
                          }),
                          (this.signature = e),
                          (this.requestId = t),
                          (this.origin = n);
                      }
                    }
                    (y.fromDataItem = e => {
                      const t = e.getData(),
                        n = t[g.signature],
                        a = t[g.requestId] ? t[g.requestId].getData() : void 0;
                      return new y(n, a, t[g.origin]);
                    }),
                      (y.fromCBOR = e => {
                        const t = h(e);
                        return y.fromDataItem(t);
                      });
                    const { decodeToDataItem: b } = r.extend;
                    var v;
                    !(function (e) {
                      (e[(e.chainId = 1)] = 'chainId'),
                        (e[(e.contractAddress = 2)] = 'contractAddress'),
                        (e[(e.contractName = 3)] = 'contractName'),
                        (e[(e.name = 4)] = 'name'),
                        (e[(e.mediaData = 5)] = 'mediaData');
                    })(v || (v = {}));
                    class _ extends r.RegistryItem {
                      constructor(e) {
                        super(),
                          (this.getRegistryType = () => l.ETH_NFT_ITEM),
                          (this.getChainId = () => this.chainId),
                          (this.getName = () => this.name),
                          (this.getmediaData = () => this.mediaData),
                          (this.getContractAddress = () => this.contractAddress),
                          (this.getContractName = () => this.contractName),
                          (this.toDataItem = () => {
                            const e = {};
                            return (
                              (e[v.chainId] = this.chainId),
                              (e[v.name] = this.name),
                              (e[v.contractAddress] = this.contractAddress),
                              (e[v.contractName] = this.contractName),
                              (e[v.mediaData] = this.mediaData),
                              new r.DataItem(e)
                            );
                          }),
                          (this.chainId = e.chainId),
                          (this.name = e.name),
                          (this.contractAddress = e.contractAddress),
                          (this.contractName = e.contractName),
                          (this.mediaData = e.mediaData);
                      }
                      static constructETHNFTItem(e, t, n, a, r) {
                        return new _({
                          chainId: e,
                          contractAddress: t,
                          contractName: n,
                          mediaData: r,
                          name: a,
                        });
                      }
                    }
                    (_.fromDataItem = e => {
                      const t = e.getData();
                      return new _({
                        chainId: t[v.chainId],
                        name: t[v.name],
                        contractAddress: t[v.contractAddress],
                        contractName: t[v.contractName],
                        mediaData: t[v.mediaData],
                      });
                    }),
                      (_.fromCBOR = e => {
                        const t = b(e);
                        return _.fromDataItem(t);
                      });
                    const T = (e, n) => {
                      const a = i.fromExtendedKey(e).derive(n),
                        r = '0x' + t.from(s.publicToAddress(a.publicKey, !0)).toString('hex');
                      return s.toChecksumAddress(r);
                    };
                    r.patchTags(
                      Object.values(l)
                        .filter(e => !!e.getTag())
                        .map(e => e.getTag())
                    ),
                      Object.keys(r).forEach(function (e) {
                        'default' !== e &&
                          Object.defineProperty(n, e, {
                            enumerable: !0,
                            get: function () {
                              return r[e];
                            },
                          });
                      }),
                      (n.ETHNFTItem = _),
                      (n.ETHSignature = y),
                      (n.EthSignRequest = f),
                      (n.findHDPathFromAddress = (e, t, n, a) => {
                        for (let r = 0; r < n; r++) {
                          const n = T(t, 'M/0/' + r);
                          if (e.toLowerCase() == n.toLowerCase()) return `${a}/0/${r}`;
                        }
                        return null;
                      }),
                      (n.generateAddressFromXpub = T);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth',
        file: 'node_modules/@keystonehq/bc-ur-registry-eth/dist/bc-ur-registry-eth.cjs.production.min.js',
      },
    ],
    [
      6820,
      { './truncated-definition-list': 6821 },
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
                  r = (a = e('./truncated-definition-list')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/truncated-definition-list/index.js' },
    ],
    [
      6821,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../box': 6703,
        '../button': 6707,
        '../definition-list/definition-list': 6721,
        lodash: 4921,
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
                var a = e('lodash'),
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
                  o = d(e('prop-types')),
                  i = e('../../../helpers/constants/design-system'),
                  s = d(e('../box')),
                  l = d(e('../button')),
                  u = d(e('../definition-list/definition-list')),
                  c = e('../../../hooks/useI18nContext');
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
                function f({ dictionary: e, tooltips: t, warnings: n, prefaceKeys: o }) {
                  const [d, p] = (0, r.useState)(!1),
                    f = (0, c.useI18nContext)(),
                    m = s =>
                      r.default.createElement(u.default, {
                        gap: i.Size.MD,
                        tooltips: t,
                        warnings: n,
                        dictionary: s ? e : (0, a.pick)(e, o),
                      });
                  return r.default.createElement(
                    s.default,
                    {
                      marginTop: 6,
                      marginBottom: 6,
                      marginLeft: 0,
                      marginRight: 0,
                      padding: 4,
                      paddingBottom: 3,
                      borderRadius: i.Size.LG,
                      borderColor: i.BorderColor.borderMuted,
                    },
                    d
                      ? m(!0)
                      : r.default.createElement(
                          r.default.Fragment,
                          null,
                          m(!1),
                          r.default.createElement(
                            l.default,
                            {
                              className: 'truncated-definition-list__view-more',
                              type: 'link',
                              onClick: () => p(!0),
                            },
                            f('seeDetails')
                          )
                        )
                  );
                }
                f.propTypes = {
                  dictionary: u.default.propTypes.dictionary,
                  tooltips: u.default.propTypes.dictionary,
                  warnings: u.default.propTypes.dictionary,
                  prefaceKeys: o.default.arrayOf(o.default.string),
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/truncated-definition-list/truncated-definition-list.js',
      },
    ],
    [
      6822,
      { './typography': 6823 },
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
                  r = (a = e('./typography')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/typography/index.js' },
    ],
    [
      6823,
      {
        '../../../helpers/constants/design-system': 6872,
        '../box': 6703,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ValidTags = n.ValidColors = void 0),
                  (n.default = y);
                var a = u(e('react')),
                  r = u(e('classnames')),
                  o = u(e('prop-types')),
                  i = e('../../../helpers/constants/design-system'),
                  s = (function (e, t) {
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
                  })(e('../box'));
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c() {
                  return (
                    (c = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const { H6: d, H7: p, H8: f, H9: m } = i.TypographyVariant,
                  h = (n.ValidColors = [
                    i.Color.textDefault,
                    i.Color.textAlternative,
                    i.Color.textMuted,
                    i.Color.overlayInverse,
                    i.Color.primaryDefault,
                    i.Color.primaryInverse,
                    i.Color.errorDefault,
                    i.Color.errorInverse,
                    i.Color.successDefault,
                    i.Color.successInverse,
                    i.Color.sepoliaInverse,
                    i.Color.warningDefault,
                    i.Color.warningInverse,
                    i.Color.infoDefault,
                    i.Color.infoInverse,
                    i.Color.goerli,
                    i.Color.sepolia,
                    i.Color.goerliInverse,
                    i.Color.sepoliaInverse,
                    i.Color.lineaGoerli,
                    i.Color.lineaGoerliInverse,
                    i.Color.lineaSepolia,
                    i.Color.lineaSepoliaInverse,
                    i.Color.lineaMainnet,
                    i.Color.lineaMainnetInverse,
                  ]),
                  g = (n.ValidTags = [
                    'dd',
                    'div',
                    'dt',
                    'em',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'li',
                    'p',
                    'span',
                    'strong',
                    'ul',
                    'label',
                  ]);
                function y({
                  variant: e = i.TypographyVariant.paragraph,
                  color: t = i.Color.textDefault,
                  fontWeight: n = 'normal',
                  fontStyle: o = 'normal',
                  align: l,
                  overflowWrap: u,
                  title: h,
                  as: g,
                  margin: y,
                  marginTop: b = 1,
                  marginRight: v,
                  marginBottom: _ = 1,
                  marginLeft: T,
                  boxProps: C = {},
                  className: k,
                  testId: w,
                  children: E,
                }) {
                  let x,
                    M = g ?? e;
                  'strong' === M && (x = i.FONT_WEIGHT.BOLD);
                  const O = (0, r.default)(
                    'typography',
                    k,
                    `typography--${e}`,
                    `typography--weight-${x || n}`,
                    `typography--style-${o}`,
                    {
                      [`typography--align-${l}`]: Boolean(l),
                      [`typography--color-${t}`]: Boolean(t),
                      [`typography--overflowwrap-${u}`]: Boolean(u),
                    }
                  );
                  return (
                    M === i.TypographyVariant.paragraph
                      ? (M = 'p')
                      : [p, f, m].includes(M) && (M = d),
                    a.default.createElement(
                      s.default,
                      c(
                        { margin: y, marginTop: b, marginRight: v, marginBottom: _, marginLeft: T },
                        C
                      ),
                      e =>
                        a.default.createElement(
                          M,
                          { className: (0, r.default)(e, O), title: h, 'data-testid': w },
                          E
                        )
                    )
                  );
                }
                y.propTypes = {
                  variant: o.default.oneOf(Object.values(i.TypographyVariant)),
                  color: o.default.oneOf(h),
                  fontWeight: o.default.oneOf(Object.values(i.FONT_WEIGHT)),
                  fontStyle: o.default.oneOf(Object.values(i.FONT_STYLE)),
                  align: o.default.oneOf(Object.values(i.TextAlign)),
                  overflowWrap: o.default.oneOf(Object.values(i.OVERFLOW_WRAP)),
                  as: o.default.oneOf(g),
                  margin: s.MultipleSizesAndAuto,
                  marginTop: s.MultipleSizesAndAuto,
                  marginBottom: s.MultipleSizesAndAuto,
                  marginRight: s.MultipleSizesAndAuto,
                  marginLeft: s.MultipleSizesAndAuto,
                  boxProps: o.default.shape({ ...s.default.propTypes }),
                  className: o.default.string,
                  title: o.default.string,
                  testId: o.default.string,
                  children: o.default.node.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/typography/typography.js' },
    ],
    [
      6824,
      { './unit-input.component': 6825 },
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
                  r = (a = e('./unit-input.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/unit-input/index.js' },
    ],
    [
      6825,
      { classnames: 4168, 'prop-types': 5082, react: 5328, 'react-tippy': 5324 },
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
                  r = e('react-tippy'),
                  o = s(e('prop-types')),
                  i = s(e('classnames'));
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
                const c = /^\d*(\.|,)?\d*$/u;
                class d extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      u(this, 'state', { value: this.props.value, isOverflowing: !1 }),
                      u(this, 'handleFocus', () => {
                        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) ||
                          this.unitInput.focus();
                      }),
                      u(this, 'handleInputFocus', ({ target: { value: e } }) => {
                        '0' === e && this.setState({ ...this.state, isOverflowing: !1, value: '' });
                      }),
                      u(this, 'handleInputBlur', ({ target: { value: e } }) => {
                        var t, n;
                        '' === e && this.setState({ ...this.state, isOverflowing: !1, value: '0' }),
                          this.props.onBlur && this.props.onBlur(e),
                          null === (t = this.unitInput) ||
                            void 0 === t ||
                            null === (n = t.scrollTo) ||
                            void 0 === n ||
                            n.call(t, 0, 0);
                      }),
                      u(this, 'handleChange', e => {
                        const { value: t } = e.target;
                        let n = t;
                        t.length && t.length > 1 && (n = t.replace(/^0*(?=\d)/u, '')),
                          this.props.keyPressRegex.test(n)
                            ? (this.setState({
                                ...this.state,
                                isOverflowing: this.getIsOverflowing(),
                                value: n,
                              }),
                              this.props.onChange(n))
                            : e.preventDefault();
                      }),
                      u(this, 'handleOnKeyPress', e => {
                        c.test(e.key) || e.preventDefault();
                      }),
                      u(this, 'updateIsOverflowing', () => {
                        this.setState({ ...this.state, isOverflowing: this.getIsOverflowing() });
                      });
                  }
                  componentDidUpdate(e) {
                    const { value: t } = e,
                      { value: n } = this.props,
                      { value: a } = this.state;
                    t !== n &&
                      Number(n) !== Number(a) &&
                      this.setState({ ...this.state, value: n });
                  }
                  componentDidMount() {
                    this.props.isFocusOnInput &&
                      document.addEventListener('keypress', this.handleFocus);
                  }
                  componentWillUnmount() {
                    document.removeEventListener('keypress', this.handleFocus);
                  }
                  getInputWidth(e) {
                    const t = String(e);
                    return `${(t.length || 1) + (t.match(/\./u) ? -0.5 : 0) + 0.5}ch`;
                  }
                  getIsOverflowing() {
                    let e = !1;
                    if (this.unitInput) {
                      const { offsetWidth: t, scrollWidth: n } = this.unitInput;
                      e = n - t > 4;
                    }
                    return e;
                  }
                  render() {
                    const {
                        className: e,
                        error: t,
                        placeholder: n,
                        hideSuffix: o,
                        suffix: s,
                        actionComponent: l,
                        children: u,
                        dataTestId: c,
                        isDisabled: d,
                      } = this.props,
                      { value: p, isOverflowing: f } = this.state;
                    return a.default.createElement(
                      'div',
                      {
                        className: (0, i.default)('unit-input', { 'unit-input--error': t }, e),
                        onClick: this.handleFocus,
                      },
                      a.default.createElement(
                        'div',
                        { className: 'unit-input__inputs' },
                        a.default.createElement(
                          r.Tooltip,
                          {
                            title: p,
                            disabled: !f || !p,
                            arrow: !0,
                            hideOnClick: !1,
                            className: 'unit-input__input-container',
                            style: { display: 'inherit' },
                          },
                          a.default.createElement('input', {
                            disabled: d,
                            'data-testid': c,
                            type: 'number',
                            dir: 'ltr',
                            className: (0, i.default)('unit-input__input'),
                            value: p,
                            placeholder: n,
                            onChange: this.handleChange,
                            onBlur: this.handleInputBlur,
                            onFocus: this.handleInputFocus,
                            onKeyPress: this.handleOnKeyPress,
                            min: 0,
                            step: 'any',
                            style: { width: this.getInputWidth(p) },
                            ref: e => {
                              this.unitInput = e;
                            },
                            autoFocus: !0,
                          }),
                          s && !o
                            ? a.default.createElement('div', { className: 'unit-input__suffix' }, s)
                            : null
                        ),
                        u
                      ),
                      l
                    );
                  }
                }
                (n.default = d),
                  u(d, 'propTypes', {
                    className: o.default.string,
                    dataTestId: o.default.string,
                    children: o.default.node,
                    actionComponent: o.default.node,
                    error: o.default.bool,
                    onChange: o.default.func,
                    onBlur: o.default.func,
                    placeholder: o.default.string,
                    suffix: o.default.string,
                    hideSuffix: o.default.bool,
                    value: o.default.oneOfType([o.default.string, o.default.number]),
                    keyPressRegex: o.default.instanceOf(RegExp),
                    isDisabled: o.default.bool,
                    isFocusOnInput: o.default.bool,
                  }),
                  u(d, 'defaultProps', { value: '', placeholder: '0', keyPressRegex: c });
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/unit-input/unit-input.component.js' },
    ],
    [
      6826,
      {
        '../../../contexts/i18n': 6832,
        '../../../selectors': 7601,
        '../button': 6707,
        '../identicon': 6758,
        '../popover': 6789,
        '../text-field': 6810,
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
                  i = p(e('../popover')),
                  s = p(e('../button')),
                  l = p(e('../text-field')),
                  u = e('../../../contexts/i18n'),
                  c = p(e('../identicon')),
                  d = e('../../../selectors');
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
                function m({ address: e, nickname: t = '', memo: n = '', onAdd: o, onClose: p }) {
                  var f;
                  const m = (0, a.useContext)(u.I18nContext),
                    [h, g] = (0, a.useState)(null === t ? '' : t),
                    [y, b] = (0, a.useState)(null === n ? '' : n),
                    v = (0, a.useCallback)(() => {
                      p();
                    }, [p]),
                    _ = (0, r.useSelector)(d.getTokenList);
                  return a.default.createElement(
                    i.default,
                    {
                      title: m(t ? 'editAddressNickname' : 'addANickname'),
                      onClose: v,
                      className: 'update-nickname__wrapper',
                      footer: a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(
                          s.default,
                          {
                            className: 'update-nickname__cancel',
                            type: 'secondary',
                            onClick: () => {
                              p();
                            },
                          },
                          m('cancel')
                        ),
                        a.default.createElement(
                          s.default,
                          {
                            className: 'update-nickname__save',
                            type: 'primary',
                            onClick: () => {
                              o(e, h, y), p();
                            },
                            disabled: !h,
                          },
                          m('save')
                        )
                      ),
                    },
                    a.default.createElement(
                      'div',
                      { className: 'update-nickname__content' },
                      a.default.createElement(c.default, {
                        className: 'update-nickname__content__indenticon',
                        address: e,
                        diameter: 36,
                        image:
                          null === (f = _[e.toLowerCase()]) || void 0 === f ? void 0 : f.iconUrl,
                      }),
                      a.default.createElement(
                        'label',
                        { className: 'update-nickname__content__label--capitalized' },
                        m('address')
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'update-nickname__content__address' },
                        e
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'update-nickname__content__nickname-label' },
                        m('nickname')
                      ),
                      a.default.createElement(l.default, {
                        className: 'update-nickname__content__text-field',
                        value: h,
                        onChange: e => {
                          g(e.target.value);
                        },
                        placeholder: m('addANickname'),
                        fullWidth: !0,
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'update-nickname__content__label--capitalized' },
                        m('memo')
                      ),
                      a.default.createElement(l.default, {
                        type: 'text',
                        id: 'memo',
                        value: y,
                        onChange: e => {
                          b(e.target.value);
                        },
                        placeholder: m('addMemo'),
                        fullWidth: !0,
                        margin: 'dense',
                        multiline: !0,
                        rows: 3,
                        classes: {
                          inputMultiline: 'update-nickname__content__text-area',
                          inputRoot: 'update-nickname__content__text-area-wrapper',
                        },
                      })
                    )
                  );
                }
                m.propTypes = {
                  nickname: o.default.string,
                  address: o.default.string,
                  memo: o.default.string,
                  onAdd: o.default.func,
                  onClose: o.default.func,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/ui/update-nickname-popover/update-nickname-popover.js',
      },
    ],
    [
      6827,
      { './url-icon': 6828 },
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
                  r = (a = e('./url-icon')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/url-icon/index.js' },
    ],
    [
      6828,
      { '../icon-with-fallback': 6746, classnames: 4168, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = l);
                var a = s(e('react')),
                  r = s(e('prop-types')),
                  o = s(e('classnames')),
                  i = s(e('../icon-with-fallback'));
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l({ url: e, className: t, name: n, fallbackClassName: r }) {
                  return a.default.createElement(i.default, {
                    className: (0, o.default)('url-icon', t),
                    icon: e,
                    name: n,
                    fallbackClassName: (0, o.default)('url-icon__fallback', r),
                  });
                }
                l.propTypes = {
                  url: r.default.string,
                  className: r.default.string,
                  name: r.default.string,
                  fallbackClassName: r.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/ui/url-icon/url-icon.js' },
    ],
    [
      6829,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ETH_DEFAULT_DECIMALS = void 0);
                n.ETH_DEFAULT_DECIMALS = 8;
              };
            };
      },
      { package: '$root$', file: 'ui/constants/index.js' },
    ],
    [
      683,
      {
        './bc-ur-registry-eth.cjs.development.js': 681,
        './bc-ur-registry-eth.cjs.production.min.js': 682,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                t.exports = e('./bc-ur-registry-eth.cjs.production.min.js');
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth',
        file: 'node_modules/@keystonehq/bc-ur-registry-eth/dist/index.js',
      },
    ],
    [
      6830,
      {
        '../hooks/useAccountTrackerPolling': 6967,
        '../hooks/useCurrencyRatePolling': 6975,
        '../hooks/useTokenDetectionPolling': 7012,
        '../hooks/useTokenListPolling': 7015,
        '../hooks/useTokenRatesPolling': 7016,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AssetPollingProvider = void 0);
                var a = u(e('react')),
                  r = u(e('../hooks/useCurrencyRatePolling')),
                  o = u(e('../hooks/useTokenRatesPolling')),
                  i = u(e('../hooks/useAccountTrackerPolling')),
                  s = u(e('../hooks/useTokenDetectionPolling')),
                  l = u(e('../hooks/useTokenListPolling'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.AssetPollingProvider = ({ children: e }) => (
                  (0, r.default)(),
                  (0, o.default)(),
                  (0, i.default)(),
                  (0, s.default)(),
                  (0, l.default)(),
                  a.default.createElement(a.default.Fragment, null, e)
                );
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/assetPolling.tsx' },
    ],
    [
      6831,
      { '../pages/confirmations/hooks/useGasFeeInputs': 7337, 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.GasFeeContextProvider = n.GasFeeContext = void 0),
                  (n.useGasFeeContext = function () {
                    return (0, r.useContext)(l);
                  });
                var a,
                  r = (function (e, t) {
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
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('../pages/confirmations/hooks/useGasFeeInputs');
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const l = (n.GasFeeContext = (0, r.createContext)({})),
                  u = ({
                    children: e,
                    defaultEstimateToUse: t,
                    transaction: n,
                    minimumGasLimit: a,
                    editGasMode: o,
                  }) => {
                    const s = (0, i.useGasFeeInputs)(t, n, a, o);
                    return r.default.createElement(l.Provider, { value: s }, e);
                  };
                (n.GasFeeContextProvider = u),
                  (u.propTypes = {
                    children: o.default.node.isRequired,
                    defaultEstimateToUse: o.default.string,
                    transaction: o.default.object,
                    minimumGasLimit: o.default.string,
                    editGasMode: o.default.string,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/gasFee.js' },
    ],
    [
      6833,
      {
        '../../hooks/identity/useAccountSyncing': 6944,
        '../../hooks/identity/useAuthentication': 6946,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.MetamaskIdentityProvider = void 0);
                var a = (function (e, t) {
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
                  r = e('../../hooks/identity/useAccountSyncing'),
                  o = e('../../hooks/identity/useAuthentication');
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.MetamaskIdentityProvider = ({ children: e }) => {
                  const { dispatchAccountSyncing: t, shouldDispatchAccountSyncing: n } = (0,
                    r.useAccountSyncing)(),
                    { autoSignIn: i, shouldAutoSignIn: s } = (0, o.useAutoSignIn)(),
                    { autoSignOut: l, shouldAutoSignOut: u } = (0, o.useAutoSignOut)();
                  return (
                    (0, a.useEffect)(() => {
                      n && t();
                    }, [n, t]),
                    (0, a.useEffect)(() => {
                      s && i();
                    }, [s, i]),
                    (0, a.useEffect)(() => {
                      u && l();
                    }, [u, l]),
                    a.default.createElement(a.default.Fragment, null, e)
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/identity/index.tsx' },
    ],
    [
      6834,
      { './metamask-notifications': 6835 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'MetamaskNotificationsProvider', {
                    enumerable: !0,
                    get: function () {
                      return a.MetamaskNotificationsProvider;
                    },
                  });
                var a = e('./metamask-notifications');
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/metamask-notifications/index.tsx' },
    ],
    [
      6835,
      {
        '../../ducks/metamask/metamask': 6860,
        '../../hooks/metamask-notifications/useNotifications': 6954,
        '../../selectors': 7601,
        '../../selectors/identity/authentication': 7599,
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
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
                  (n.useMetamaskNotificationsContext = n.MetamaskNotificationsProvider = void 0);
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
                  r = e('react-redux'),
                  o = e('../../hooks/metamask-notifications/useNotifications'),
                  i = e('../../selectors/metamask-notifications/metamask-notifications'),
                  s = e('../../selectors'),
                  l = e('../../ducks/metamask/metamask'),
                  u = e('../../selectors/identity/authentication');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const d = (0, a.createContext)(undefined);
                n.useMetamaskNotificationsContext = () => {
                  const e = (0, a.useContext)(d);
                  if (!e)
                    throw new Error(
                      'useNotificationsContext must be used within a MetamaskNotificationsProvider'
                    );
                  return e;
                };
                n.MetamaskNotificationsProvider = ({ children: e }) => {
                  const t = (0, r.useSelector)(i.selectIsMetamaskNotificationsEnabled),
                    n = (0, r.useSelector)(s.getUseExternalServices),
                    c = (0, r.useSelector)(l.getIsUnlocked),
                    p = (0, r.useSelector)(u.selectIsSignedIn),
                    {
                      listNotifications: f,
                      notificationsData: m,
                      isLoading: h,
                      error: g,
                    } = (0, o.useListNotifications)(),
                    { disableNotifications: y } = (0, o.useDisableNotifications)();
                  (0, a.useEffect)(() => {
                    !n && t && (y(), f());
                  }, [n, t, y, f]);
                  const b = (0, a.useMemo)(() => t && p, [t, p]);
                  return (
                    (0, a.useEffect)(() => {
                      n && b && c && f();
                    }, [b, f, n, c]),
                    a.default.createElement(
                      d.Provider,
                      {
                        value: {
                          listNotifications: f,
                          notificationsData: m,
                          isLoading: h,
                          error: g,
                        },
                      },
                      e
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/metamask-notifications/metamask-notifications.tsx' },
    ],
    [
      6836,
      {
        '../../app/scripts/lib/util': 204,
        '../../shared/constants/metametrics': 5800,
        '../helpers/constants/routes': 6878,
        '../hooks/useSegmentContext': 7004,
        '../store/actions': 7619,
        '@sentry/browser': 3136,
        lodash: 4921,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.MetaMetricsContext = n.LegacyMetaMetricsProvider = void 0),
                  (n.MetaMetricsProvider = b);
                var a,
                  r = (function (e, t) {
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
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('react-router-dom'),
                  s = e('@sentry/browser'),
                  l = e('lodash'),
                  u = e('../../app/scripts/lib/util'),
                  c = e('../helpers/constants/routes'),
                  d = e('../../shared/constants/metametrics'),
                  p = e('../hooks/useSegmentContext'),
                  f = e('../store/actions');
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
                const g = (n.MetaMetricsContext = (0, r.createContext)(() => {
                    (0, s.captureException)(
                      Error(
                        'MetaMetrics context function was called from a react node that is not a descendant of a MetaMetrics context provider'
                      )
                    );
                  })),
                  y = Object.keys(c.PATH_NAME_MAP);
                function b({ children: e }) {
                  var t;
                  const n = (0, i.useLocation)(),
                    a = (0, p.useSegmentContext)(),
                    o = (0, r.useCallback)(
                      (e, t) => {
                        const n = null == t ? void 0 : t.contextPropsIntoEventProperties;
                        var r;
                        n &&
                          0 !== n.length &&
                          (e.properties || (e.properties = {}),
                          n.includes(d.MetaMetricsContextProp.PageTitle) &&
                            (e.properties[d.MetaMetricsContextProp.PageTitle] =
                              null === (r = a.page) || void 0 === r ? void 0 : r.title));
                      },
                      [null === (t = a.page) || void 0 === t ? void 0 : t.title]
                    ),
                    m = (0, r.useCallback)(
                      (e, t) => {
                        o(e, t),
                          (0, f.trackMetaMetricsEvent)(
                            { ...e, environmentType: (0, u.getEnvironmentType)(), ...a },
                            t
                          );
                      },
                      [o, a]
                    ),
                    h = (0, r.useRef)();
                  return (
                    (0, r.useEffect)(() => {
                      const e = (0, u.getEnvironmentType)(),
                        t = (0, i.matchPath)(n.pathname, { path: y, exact: !0, strict: !0 });
                      if (t) {
                        if (
                          h.current !== t.path &&
                          ('notification' !== e || '/' !== t.path || h.current !== undefined)
                        ) {
                          const { path: r, params: o } = t,
                            i = c.PATH_NAME_MAP[r];
                          (0, f.trackMetaMetricsPage)(
                            {
                              name: i,
                              params: (0, l.omit)(o, ['account', 'address']),
                              environmentType: e,
                              page: a.page,
                              referrer: a.referrer,
                            },
                            { isOptInPath: n.pathname.startsWith('/initialize') }
                          );
                        }
                      } else
                        (0, s.captureMessage)('Segment page tracking found unmatched route', {
                          extra: { previousMatch: h, currentPath: n.pathname },
                        });
                      h.current = null == t ? void 0 : t.path;
                    }, [n, a]),
                    r.default.createElement(g.Provider, { value: m }, e)
                  );
                }
                b.propTypes = { children: o.default.node };
                class v extends r.Component {
                  getChildContext() {
                    return { trackEvent: this.context };
                  }
                  render() {
                    return this.props.children;
                  }
                }
                (n.LegacyMetaMetricsProvider = v),
                  h(v, 'propTypes', { children: o.default.node }),
                  h(v, 'defaultProps', { children: undefined }),
                  h(v, 'contextType', g),
                  h(v, 'childContextTypes', { trackEvent: o.default.func });
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/metametrics.js' },
    ],
    [
      6837,
      { './snap-interface': 6838 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-interface');
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
      { package: '$root$', file: 'ui/contexts/snaps/index.ts' },
    ],
    [
      6838,
      {
        '../../store/actions': 7619,
        './utils': 6839,
        '@metamask/snaps-sdk': 2779,
        '@metamask/snaps-utils': 2890,
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
                  (n.SnapInterfaceContextProvider = n.SnapInterfaceContext = void 0),
                  (n.useSnapInterfaceContext = function () {
                    return (0, o.useContext)(c);
                  });
                var a = e('@metamask/snaps-sdk'),
                  r = e('@metamask/snaps-utils'),
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
                  i = e('react-redux'),
                  s = e('../../store/actions'),
                  l = e('./utils');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const c = (n.SnapInterfaceContext = (0, o.createContext)(null));
                n.SnapInterfaceContextProvider = ({
                  children: e,
                  interfaceId: t,
                  snapId: n,
                  initialState: u,
                }) => {
                  const d = (0, i.useDispatch)(),
                    p = (0, o.useRef)(u ?? {}),
                    f = (0, o.useRef)(null);
                  (0, o.useEffect)(() => {
                    p.current = u;
                  }, [u]);
                  const m = e => d((0, s.updateInterfaceState)(t, e)),
                    h = ({ event: e, name: a, value: r = a ? p.current[a] : undefined }) =>
                      ((e, a, r) => {
                        (0, s.handleSnapRequest)({
                          snapId: n,
                          origin: 'metamask',
                          handler: 'onUserInput',
                          request: {
                            jsonrpc: '2.0',
                            method: ' ',
                            params: {
                              event: {
                                type: e,
                                ...(a !== undefined && null !== a ? { name: a } : {}),
                                ...(r !== undefined && null !== r ? { value: r } : {}),
                              },
                              id: t,
                            },
                          },
                        }).then(() => (0, s.forceUpdateMetamaskState)(d));
                      })(e, a, r),
                    g = (e, r) => {
                      (0, s.handleSnapRequest)({
                        snapId: n,
                        origin: 'metamask',
                        handler: 'onUserInput',
                        request: {
                          jsonrpc: '2.0',
                          method: ' ',
                          params: {
                            event: {
                              type: a.UserInputEventType.FileUploadEvent,
                              ...(e === undefined ? {} : { name: e }),
                              ...(r === undefined ? {} : { file: r }),
                            },
                            id: t,
                          },
                        },
                      }).then(() => (0, s.forceUpdateMetamaskState)(d));
                    };
                  return o.default.createElement(
                    c.Provider,
                    {
                      value: {
                        handleEvent: h,
                        getValue: (e, t) => {
                          var n;
                          const a = t
                            ? null === (n = u[t]) || void 0 === n
                              ? void 0
                              : n[e]
                            : null == u
                              ? void 0
                              : u[e];
                          return a !== undefined && null !== a ? a : undefined;
                        },
                        handleInputChange: (e, t, n) => {
                          const r = (0, l.mergeValue)(p.current, e, t, n);
                          (p.current = r),
                            m(r),
                            ((e, t) => {
                              h({
                                event: a.UserInputEventType.InputChangeEvent,
                                name: e,
                                value: t,
                              });
                            })(e, t);
                        },
                        handleFileChange: (e, t, n) => {
                          if (t)
                            return void t
                              .arrayBuffer()
                              .then(e => new Uint8Array(e))
                              .then(e => (0, r.encodeBase64)(e))
                              .then(a => {
                                const r = {
                                    name: t.name,
                                    size: t.size,
                                    contentType: t.type,
                                    contents: a,
                                  },
                                  o = (0, l.mergeValue)(p.current, e, r, n);
                                (p.current = o), m(o), g(e, r);
                              });
                          const a = (0, l.mergeValue)(p.current, e, null, n);
                          (p.current = a), m(a), g(e, null);
                        },
                        setCurrentFocusedInput: e => (f.current = e),
                        focusedInput: f.current,
                        snapId: n,
                      },
                    },
                    e
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/snaps/snap-interface.tsx' },
    ],
    [
      6839,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.mergeValue = void 0);
                n.mergeValue = (e, t, n, a) =>
                  a ? { ...e, [a]: { ...e[a], [t]: n } } : { ...e, [t]: n };
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/snaps/utils.ts' },
    ],
    [
      684,
      { './RegistryItem': 695, './RegistryType': 696, './lib': 706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Bytes = void 0);
                const a = e('./lib'),
                  r = e('./RegistryItem'),
                  o = e('./RegistryType');
                class i extends r.RegistryItem {
                  constructor(e) {
                    super(),
                      (this.bytes = e),
                      (this.getRegistryType = () => o.RegistryTypes.BYTES),
                      (this.getData = () => this.bytes),
                      (this.toDataItem = () => new a.DataItem(this.bytes));
                  }
                }
                (n.Bytes = i),
                  (i.fromDataItem = e => {
                    const t = e.getData();
                    if (!t)
                      throw new Error(
                        `#[ur-registry][Bytes][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${e}`
                      );
                    return new i(t);
                  }),
                  (i.fromCBOR = e => {
                    const t = (0, a.decodeToDataItem)(e);
                    return i.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/Bytes.js',
      },
    ],
    [
      6840,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.TransactionModalContextProvider = n.TransactionModalContext = void 0),
                  (n.useTransactionModalContext = function () {
                    return (0, r.useContext)(s);
                  });
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
                const s = (n.TransactionModalContext = (0, r.createContext)({})),
                  l = ({ children: e }) => {
                    const [t, n] = (0, r.useState)([]);
                    return r.default.createElement(
                      s.Provider,
                      {
                        value: {
                          closeModal: e => {
                            if (t < 0) return;
                            const a = [...t];
                            e.forEach(e => {
                              const n = t.indexOf(e);
                              a.splice(n, 1);
                            }),
                              n(a);
                          },
                          closeAllModals: () => {
                            n([]);
                          },
                          currentModal: t[t.length - 1],
                          openModal: e => {
                            if (t.includes(e)) return;
                            const a = [...t];
                            a.push(e), n(a);
                          },
                          openModalCount: t.length,
                        },
                      },
                      e
                    );
                  };
                (n.TransactionModalContextProvider = l),
                  (l.propTypes = { children: o.default.node.isRequired });
              };
            };
      },
      { package: '$root$', file: 'ui/contexts/transaction-modal.js' },
    ],
    [
      6842,
      { './enums': 6841, './invalid-custom-network': 6843, './unconnected-account': 6844 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ALERT_STATE', {
                    enumerable: !0,
                    get: function () {
                      return o.ALERT_STATE;
                    },
                  }),
                  Object.defineProperty(n, 'invalidCustomNetwork', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'unconnectedAccount', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var a = i(e('./unconnected-account')),
                  r = i(e('./invalid-custom-network')),
                  o = e('./enums');
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/alerts/index.js' },
    ],
    [
      6843,
      { '../../../shared/constants/alerts': 5787, './enums': 6841, '@reduxjs/toolkit': 3073 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.openAlert =
                    n.getNetworkName =
                    n.getAlertState =
                    n.dismissAlert =
                    n.default =
                    n.alertIsOpen =
                      void 0);
                var a = e('@reduxjs/toolkit'),
                  r = e('../../../shared/constants/alerts'),
                  o = e('./enums');
                const i = r.AlertTypes.invalidCustomNetwork,
                  s = { state: o.ALERT_STATE.CLOSED, networkName: '' },
                  l = (0, a.createSlice)({
                    name: i,
                    initialState: s,
                    reducers: {
                      openAlert: (e, t) => {
                        (e.state = o.ALERT_STATE.OPEN), (e.networkName = t.payload);
                      },
                      dismissAlert: e => {
                        (e.state = o.ALERT_STATE.CLOSED), (e.networkName = '');
                      },
                    },
                  }),
                  { actions: u, reducer: c } = l;
                n.default = c;
                n.getAlertState = e => e[i].state;
                n.getNetworkName = e => e[i].networkName;
                n.alertIsOpen = e => e[i].state !== o.ALERT_STATE.CLOSED;
                const { openAlert: d, dismissAlert: p } = u;
                (n.dismissAlert = p), (n.openAlert = d);
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/alerts/invalid-custom-network.js' },
    ],
    [
      6846,
      {
        '../../../shared/types/bridge-status': 5883,
        '../../store/actions': 7619,
        '../../store/background-connection': 7620,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.startPollingForBridgeTxStatus = void 0);
                var a = e('../../../shared/types/bridge-status'),
                  r = e('../../store/actions'),
                  o = e('../../store/background-connection');
                n.startPollingForBridgeTxStatus = e => async t => {
                  return t(
                    ((n = a.BridgeStatusAction.START_POLLING_FOR_BRIDGE_TX_STATUS),
                    (i = [e]),
                    async e => {
                      await (0, o.submitRequestToBackground)(n, i),
                        await (0, r.forceUpdateMetamaskState)(e);
                    })
                  );
                  var n, i;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/bridge-status/actions.ts' },
    ],
    [
      6847,
      {
        '../../../shared/modules/Numeric': 5853,
        '../../../shared/modules/selectors/networks': 5875,
        '../../selectors': 7601,
        reselect: 5353,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.selectIncomingBridgeHistory =
                    n.selectBridgeStatusState =
                    n.selectBridgeHistoryForAccount =
                      void 0);
                var a = e('reselect'),
                  r = e('../../selectors'),
                  o = e('../../../shared/modules/Numeric'),
                  i = e('../../../shared/modules/selectors/networks');
                const s = e => e.metamask.bridgeStatusState;
                n.selectBridgeStatusState = s;
                const l = (n.selectBridgeHistoryForAccount = (0, a.createSelector)(
                  [r.getSelectedAddress, s],
                  (e, t) => {
                    const { txHistory: n = {} } = t || {};
                    return Object.keys(n).reduce((t, a) => {
                      const r = n[a];
                      return r.account === e && (t[a] = r), t;
                    }, {});
                  }
                ));
                n.selectIncomingBridgeHistory = (0, a.createSelector)(
                  l,
                  i.getCurrentChainId,
                  (e, t) =>
                    Object.values(e)
                      .filter(
                        e => new o.Numeric(e.quote.destChainId, 10).toPrefixedHexString() === t
                      )
                      .sort((e, t) => (e.startTime && t.startTime ? t.startTime - e.startTime : 0))
                );
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/bridge-status/selectors.ts' },
    ],
    [
      6848,
      {
        '../../store/actions': 7619,
        '../../store/background-connection': 7620,
        './bridge': 6849,
        '@metamask/bridge-controller': 1414,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.setBridgeFeatureFlags =
                    n.resetInputFields =
                    n.resetBridgeState =
                    n.getBridgeERC20Allowance =
                      void 0),
                  Object.defineProperty(n, 'setDestTokenExchangeRates', {
                    enumerable: !0,
                    get: function () {
                      return i.setDestTokenExchangeRates;
                    },
                  }),
                  Object.defineProperty(n, 'setDestTokenUsdExchangeRates', {
                    enumerable: !0,
                    get: function () {
                      return i.setDestTokenUsdExchangeRates;
                    },
                  }),
                  (n.setSortOrder =
                    n.setSlippage =
                    n.setSelectedQuote =
                    n.setFromTokenInputValue =
                    n.setFromToken =
                      void 0),
                  Object.defineProperty(n, 'setSrcTokenExchangeRates', {
                    enumerable: !0,
                    get: function () {
                      return i.setSrcTokenExchangeRates;
                    },
                  }),
                  (n.updateQuoteRequestParams =
                    n.setWasTxDeclined =
                    n.setToToken =
                    n.setToChainId =
                      void 0);
                var a = e('@metamask/bridge-controller'),
                  r = e('../../store/actions'),
                  o = e('../../store/background-connection'),
                  i = e('./bridge');
                const {
                  setToChainId: s,
                  setFromToken: l,
                  setToToken: u,
                  setFromTokenInputValue: c,
                  resetInputFields: d,
                  setSortOrder: p,
                  setSelectedQuote: f,
                  setWasTxDeclined: m,
                  setSlippage: h,
                } = i.bridgeSlice.actions;
                (n.setSlippage = h),
                  (n.setWasTxDeclined = m),
                  (n.setSelectedQuote = f),
                  (n.setSortOrder = p),
                  (n.resetInputFields = d),
                  (n.setFromTokenInputValue = c),
                  (n.setToToken = u),
                  (n.setFromToken = l),
                  (n.setToChainId = s);
                const g = (e, t) => async n => {
                  await (0, o.submitRequestToBackground)(e, [t]),
                    await (0, r.forceUpdateMetamaskState)(n);
                };
                n.setBridgeFeatureFlags = () => async e =>
                  e(g(a.BridgeBackgroundAction.SET_FEATURE_FLAGS));
                n.resetBridgeState = () => async e => {
                  e(d()), e(g(a.BridgeBackgroundAction.RESET_STATE));
                };
                n.updateQuoteRequestParams = e => async t => {
                  await t(g(a.BridgeUserAction.UPDATE_QUOTE_PARAMS, e));
                };
                n.getBridgeERC20Allowance = async (e, t) =>
                  await (0, o.submitRequestToBackground)(
                    a.BridgeBackgroundAction.GET_BRIDGE_ERC20_ALLOWANCE,
                    [e, t]
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/bridge/actions.ts' },
    ],
    [
      6849,
      { './utils': 6851, '@metamask/bridge-controller': 1414, '@reduxjs/toolkit': 3073 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.setSrcTokenExchangeRates =
                    n.setDestTokenUsdExchangeRates =
                    n.setDestTokenExchangeRates =
                    n.default =
                    n.bridgeSlice =
                      void 0);
                var a = e('@reduxjs/toolkit'),
                  r = e('@metamask/bridge-controller'),
                  o = e('./utils');
                const i = {
                    toChainId: null,
                    fromToken: null,
                    toToken: null,
                    fromTokenInputValue: null,
                    fromTokenExchangeRate: null,
                    toTokenExchangeRate: null,
                    toTokenUsdExchangeRate: null,
                    sortOrder: r.SortOrder.COST_ASC,
                    selectedQuote: null,
                    wasTxDeclined: !1,
                    slippage: r.BRIDGE_DEFAULT_SLIPPAGE,
                  },
                  s = (n.setSrcTokenExchangeRates = (0, a.createAsyncThunk)(
                    'bridge/setSrcTokenExchangeRates',
                    o.getTokenExchangeRate
                  )),
                  l = (n.setDestTokenExchangeRates = (0, a.createAsyncThunk)(
                    'bridge/setDestTokenExchangeRates',
                    o.getTokenExchangeRate
                  )),
                  u = (n.setDestTokenUsdExchangeRates = (0, a.createAsyncThunk)(
                    'bridge/setDestTokenUsdExchangeRates',
                    o.getTokenExchangeRate
                  )),
                  c = (n.bridgeSlice = (0, a.createSlice)({
                    name: 'bridge',
                    initialState: { ...i },
                    reducers: {
                      setToChainId: (e, { payload: t }) => {
                        e.toChainId = t ? (0, r.formatChainIdToCaip)(t) : null;
                      },
                      setFromToken: (e, { payload: t }) => {
                        e.fromToken = t
                          ? {
                              ...t,
                              balance: t.balance ?? '0',
                              string: t.string ?? '0',
                              chainId: t.chainId,
                            }
                          : t;
                      },
                      setToToken: (e, { payload: t }) => {
                        e.toToken = t
                          ? {
                              ...t,
                              balance: t.balance ?? '0',
                              string: t.string ?? '0',
                              chainId: t.chainId,
                              address:
                                t.address || (0, r.getNativeAssetForChainId)(t.chainId).address,
                            }
                          : t;
                      },
                      setFromTokenInputValue: (e, t) => {
                        e.fromTokenInputValue = t.payload;
                      },
                      resetInputFields: () => ({ ...i }),
                      setSortOrder: (e, t) => {
                        e.sortOrder = t.payload;
                      },
                      setSelectedQuote: (e, t) => {
                        e.selectedQuote = t.payload;
                      },
                      setWasTxDeclined: (e, t) => {
                        e.wasTxDeclined = t.payload;
                      },
                      setSlippage: (e, t) => {
                        e.slippage = t.payload;
                      },
                    },
                    extraReducers: e => {
                      e.addCase(l.pending, e => {
                        e.toTokenExchangeRate = null;
                      }),
                        e.addCase(u.pending, e => {
                          e.toTokenUsdExchangeRate = null;
                        }),
                        e.addCase(s.pending, e => {
                          e.fromTokenExchangeRate = null;
                        }),
                        e.addCase(l.fulfilled, (e, t) => {
                          e.toTokenExchangeRate = t.payload ?? null;
                        }),
                        e.addCase(u.fulfilled, (e, t) => {
                          e.toTokenUsdExchangeRate = t.payload ?? null;
                        }),
                        e.addCase(s.fulfilled, (e, t) => {
                          e.fromTokenExchangeRate = t.payload ?? null;
                        });
                    },
                  }));
                n.default = c.reducer;
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/bridge/bridge.ts' },
    ],
    [
      685,
      { '.': 703, './RegistryItem': 695, './RegistryType': 696, './lib': 706, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }),
                      (n.CryptoAccount = void 0);
                    const a = e('.'),
                      r = e('./lib'),
                      o = e('./RegistryItem'),
                      i = e('./RegistryType');
                    var s;
                    !(function (e) {
                      (e[(e.masterFingerprint = 1)] = 'masterFingerprint'),
                        (e[(e.outputDescriptors = 2)] = 'outputDescriptors');
                    })(s || (s = {}));
                    class l extends o.RegistryItem {
                      constructor(e, t) {
                        super(),
                          (this.masterFingerprint = e),
                          (this.outputDescriptors = t),
                          (this.getRegistryType = () => i.RegistryTypes.CRYPTO_ACCOUNT),
                          (this.getMasterFingerprint = () => this.masterFingerprint),
                          (this.getOutputDescriptors = () => this.outputDescriptors),
                          (this.toDataItem = () => {
                            const e = {};
                            return (
                              this.masterFingerprint &&
                                (e[s.masterFingerprint] = this.masterFingerprint.readUInt32BE(0)),
                              this.outputDescriptors &&
                                (e[s.outputDescriptors] = this.outputDescriptors.map(e =>
                                  e.toDataItem()
                                )),
                              new r.DataItem(e)
                            );
                          });
                      }
                    }
                    (n.CryptoAccount = l),
                      (l.fromDataItem = e => {
                        const n = e.getData(),
                          r = t.alloc(4),
                          o = n[s.masterFingerprint];
                        o && r.writeUInt32BE(o, 0);
                        const i = n[s.outputDescriptors].map(e => a.CryptoOutput.fromDataItem(e));
                        return new l(r, i);
                      }),
                      (l.fromCBOR = e => {
                        const t = (0, r.decodeToDataItem)(e);
                        return l.fromDataItem(t);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoAccount.js',
      },
    ],
    [
      6850,
      {
        '../../../shared/constants/bridge': 5790,
        '../../../shared/constants/hardware-wallets': 5796,
        '../../../shared/constants/multichain/networks': 5803,
        '../../../shared/constants/network': 5804,
        '../../../shared/lib/asset-utils': 5828,
        '../../../shared/modules/conversion.utils': 5858,
        '../../../shared/modules/selectors/networks': 5875,
        '../../../shared/modules/selectors/util': 5877,
        '../../pages/bridge/utils/quote': 7074,
        '../../selectors/assets': 7595,
        '../../selectors/multichain': 7605,
        '../../selectors/selectors': 7611,
        '../metamask/metamask': 6860,
        './utils': 6851,
        '@metamask/bridge-controller': 1414,
        '@metamask/keyring-api': 2014,
        '@metamask/notification-services-controller/push-services': 2391,
        'bignumber.js': 4030,
        lodash: 4921,
        reselect: 5353,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.needsSolanaAccountForDestination =
                    n.isBridgeSolanaEnabled =
                    n.getWasTxDeclined =
                    n.getValidationErrors =
                    n.getTopAssetsFromFeatureFlags =
                    n.getToTokenConversionRate =
                    n.getToToken =
                    n.getToChains =
                    n.getToChain =
                    n.getSlippage =
                    n.getQuoteRequest =
                    n.getQuoteRefreshRate =
                    n.getIsToOrFromSolana =
                    n.getIsSwap =
                    n.getIsBridgeTx =
                    n.getHardwareWalletName =
                    n.getFromTokenConversionRate =
                    n.getFromToken =
                    n.getFromChains =
                    n.getFromChain =
                    n.getFromAmountInCurrency =
                    n.getFromAmount =
                    n.getBridgeSortOrder =
                    n.getBridgeQuotesConfig =
                    n.getBridgeQuotes =
                    n.getAllBridgeableNetworks =
                      void 0);
                var a = e('@metamask/keyring-api'),
                  r = e('lodash'),
                  o = e('reselect'),
                  i = e('bignumber.js'),
                  s = e('@metamask/notification-services-controller/push-services'),
                  l = e('@metamask/bridge-controller'),
                  u = e('../../../shared/constants/multichain/networks'),
                  c = e('../../selectors/selectors'),
                  d = e('../../../shared/constants/bridge'),
                  p = e('../../../shared/modules/selectors/util'),
                  f = e('../../../shared/modules/selectors/networks'),
                  m = e('../metamask/metamask'),
                  h = e('../../pages/bridge/utils/quote'),
                  g = e('../../../shared/modules/conversion.utils'),
                  y = e('../../../shared/constants/network'),
                  b = e('../../selectors/multichain'),
                  v = e('../../selectors/assets'),
                  _ = e('../../../shared/constants/hardware-wallets'),
                  T = e('../../../shared/lib/asset-utils'),
                  C = e('./utils');
                const k = e => {
                    var t;
                    const n =
                      (null === (t = e.metamask.internalAccounts) || void 0 === t
                        ? void 0
                        : t.accounts) || {};
                    return Object.values(n).some(e => {
                      const { DataAccount: t } = a.SolAccountType;
                      return Boolean(e && e.type === t);
                    });
                  },
                  w = (n.getAllBridgeableNetworks = (0, p.createDeepEqualSelector)(
                    f.getNetworkConfigurationsByChainId,
                    e =>
                      (0, r.uniqBy)(
                        [
                          ...Object.values(e),
                          {
                            ...u.MULTICHAIN_PROVIDER_CONFIGS[u.MultichainNetworks.SOLANA],
                            blockExplorerUrls: [],
                            name: u.MULTICHAIN_PROVIDER_CONFIGS[u.MultichainNetworks.SOLANA]
                              .nickname,
                            nativeCurrency:
                              u.MULTICHAIN_PROVIDER_CONFIGS[u.MultichainNetworks.SOLANA].ticker,
                            rpcEndpoints: [{ url: '', type: '', networkClientId: '' }],
                            defaultRpcEndpointIndex: 0,
                            chainId: u.MultichainNetworks.SOLANA,
                          },
                        ],
                        'chainId'
                      ).filter(({ chainId: e }) => d.ALLOWED_BRIDGE_CHAIN_IDS.includes(e))
                  )),
                  E = (n.getFromChains = (0, p.createDeepEqualSelector)(
                    w,
                    e => e.metamask.bridgeFeatureFlags,
                    e => k(e),
                    (e, t, n) =>
                      (n ? e : e.filter(({ chainId: e }) => !(0, l.isSolanaChainId)(e))).filter(
                        ({ chainId: e }) => {
                          var n;
                          return null ===
                            (n =
                              t[l.BridgeFeatureFlagsKey.EXTENSION_CONFIG].chains[
                                (0, l.formatChainIdToCaip)(e)
                              ]) || void 0 === n
                            ? void 0
                            : n.isActiveSrc;
                        }
                      )
                  )),
                  x = (n.getFromChain = (0, p.createDeepEqualSelector)(
                    b.getMultichainProviderConfig,
                    E,
                    (e, t) =>
                      null != e && e.chainId
                        ? t.find(({ chainId: t }) => t === e.chainId)
                        : undefined
                  )),
                  M = (n.getToChains = (0, p.createDeepEqualSelector)(
                    w,
                    e => e.metamask.bridgeFeatureFlags,
                    (e, t) =>
                      (0, r.uniqBy)([...e, ...y.FEATURED_RPCS], 'chainId').filter(
                        ({ chainId: e }) => {
                          var n;
                          return null == t ||
                            null === (n = t[l.BridgeFeatureFlagsKey.EXTENSION_CONFIG]) ||
                            void 0 === n ||
                            null === (n = n.chains) ||
                            void 0 === n ||
                            null === (n = n[(0, l.formatChainIdToCaip)(e)]) ||
                            void 0 === n
                            ? void 0
                            : n.isActiveDest;
                        }
                      )
                  ));
                n.getTopAssetsFromFeatureFlags = (e, t) => {
                  var n;
                  if (!t) return undefined;
                  const { bridgeFeatureFlags: a } = e.metamask;
                  return null == a ||
                    null ===
                      (n =
                        a[l.BridgeFeatureFlagsKey.EXTENSION_CONFIG].chains[
                          (0, l.formatChainIdToCaip)(t)
                        ]) ||
                    void 0 === n
                    ? void 0
                    : n.topAssets;
                };
                const O = (n.getToChain = (0, o.createSelector)(
                    M,
                    e => {
                      var t;
                      return null === (t = e.bridge) || void 0 === t ? void 0 : t.toChainId;
                    },
                    (e, t) =>
                      t
                        ? e.find(({ chainId: e }) => e === t || (0, l.formatChainIdToCaip)(e) === t)
                        : undefined
                  )),
                  I = (n.getFromToken = (0, o.createSelector)(
                    e => e.bridge.fromToken,
                    x,
                    (e, t) => {
                      if (null == t || !t.chainId) return null;
                      if (null != e && e.address) return e;
                      const { iconUrl: n, ...a } = (0, l.getNativeAssetForChainId)(t.chainId);
                      return {
                        ...a,
                        chainId: (0, l.formatChainIdToCaip)(t.chainId),
                        image:
                          y.CHAIN_ID_TOKEN_IMAGE_MAP[t.chainId] ??
                          (0, b.getImageForChainId)(t.chainId),
                        balance: '0',
                        string: '0',
                      };
                    }
                  )),
                  N = e => e.bridge.toToken;
                n.getToToken = N;
                const S = e => e.bridge.fromTokenInputValue;
                n.getFromAmount = S;
                n.getSlippage = e => e.bridge.slippage;
                const P = e => {
                  const { quoteRequest: t } = e.metamask;
                  return t;
                };
                n.getQuoteRequest = P;
                const A = e =>
                  e.metamask.bridgeFeatureFlags[l.BridgeFeatureFlagsKey.EXTENSION_CONFIG] ?? {};
                n.getBridgeQuotesConfig = A;
                n.getQuoteRefreshRate = (0, o.createSelector)(A, x, (e, t) => {
                  var n;
                  return (
                    (t &&
                      (null === (n = e.chains[(0, l.formatChainIdToCaip)(t.chainId)]) ||
                      void 0 === n
                        ? void 0
                        : n.refreshRate)) ??
                    e.refreshRate
                  );
                });
                const j = (0, o.createSelector)(m.getGasFeeEstimates, e => {
                    var t, n, a, r;
                    return {
                      estimatedBaseFeeInDecGwei: null == e ? void 0 : e.estimatedBaseFee,
                      maxPriorityFeePerGasInDecGwei:
                        null == e ||
                        null === (t = e[l.BRIDGE_PREFERRED_GAS_ESTIMATE]) ||
                        void 0 === t
                          ? void 0
                          : t.suggestedMaxPriorityFeePerGas,
                      maxFeePerGasInDecGwei:
                        null == e || null === (n = e.high) || void 0 === n
                          ? void 0
                          : n.suggestedMaxFeePerGas,
                      maxFeePerGas: (0, g.decGWEIToHexWEI)(
                        null == e || null === (a = e.high) || void 0 === a
                          ? void 0
                          : a.suggestedMaxFeePerGas
                      ),
                      maxPriorityFeePerGas: (0, g.decGWEIToHexWEI)(
                        null == e || null === (r = e.high) || void 0 === r
                          ? void 0
                          : r.suggestedMaxPriorityFeePerGas
                      ),
                    };
                  }),
                  D = e => e.bridge.sortOrder;
                n.getBridgeSortOrder = D;
                const R = (n.getFromTokenConversionRate = (0, o.createSelector)(
                    [
                      x,
                      e => e.metamask.marketData,
                      v.getAssetsRates,
                      I,
                      b.getMultichainCoinRates,
                      e => e.metamask.currencyRates,
                      e => e.bridge.fromTokenExchangeRate,
                    ],
                    (e, t, n, a, r, o, i) => {
                      if (null != e && e.chainId && a) {
                        var s, u, c, d, p;
                        const g =
                            null === (s = (0, l.getNativeAssetForChainId)(e.chainId)) ||
                            void 0 === s
                              ? void 0
                              : s.assetId,
                          y = (0, T.toAssetId)(a.address, (0, l.formatChainIdToCaip)(e.chainId)),
                          b = (0, l.isSolanaChainId)(e.chainId)
                            ? Number(
                                (null == n || null === (u = n[g]) || void 0 === u
                                  ? void 0
                                  : u.rate) ?? null
                              )
                            : ((null === (c = o[e.nativeCurrency]) || void 0 === c
                                ? void 0
                                : c.conversionRate) ?? null),
                          v = (0, l.isSolanaChainId)(e.chainId)
                            ? Number(
                                (null == r ||
                                null === (d = r[e.nativeCurrency.toLowerCase()]) ||
                                void 0 === d
                                  ? void 0
                                  : d.usdConversionRate) ?? null
                              )
                            : ((null === (p = o[e.nativeCurrency]) || void 0 === p
                                ? void 0
                                : p.usdConversionRate) ?? null);
                        if ((0, l.isNativeAddress)(a.address))
                          return { valueInCurrency: b, usd: v };
                        if ((0, l.isSolanaChainId)(e.chainId) && g && y) {
                          var f, m, h;
                          const e = (0, C.tokenPriceInNativeAsset)(
                            Number(
                              (null == n || null === (f = n[y]) || void 0 === f
                                ? void 0
                                : f.rate) ??
                                i ??
                                null
                            ),
                            Number(
                              (null == n || null === (m = n[g]) || void 0 === m
                                ? void 0
                                : m.rate) ??
                                (null == r || null === (h = r.sol) || void 0 === h
                                  ? void 0
                                  : h.conversionRate) ??
                                null
                            )
                          );
                          return (0, C.exchangeRatesFromNativeAndCurrencyRates)(
                            e,
                            Number(b),
                            Number(v)
                          );
                        }
                        const _ =
                          (0, C.exchangeRateFromMarketData)(e.chainId, a.address, t) ??
                          (0, C.tokenPriceInNativeAsset)(i, b);
                        return (0, C.exchangeRatesFromNativeAndCurrencyRates)(_, b, v);
                      }
                      return (0, C.exchangeRatesFromNativeAndCurrencyRates)();
                    }
                  )),
                  B = (n.getToTokenConversionRate = (0, p.createDeepEqualSelector)(
                    [
                      O,
                      e => e.metamask.marketData,
                      v.getAssetsRates,
                      N,
                      f.getNetworkConfigurationsByChainId,
                      e => ({
                        state: e,
                        toTokenExchangeRate: e.bridge.toTokenExchangeRate,
                        toTokenUsdExchangeRate: e.bridge.toTokenUsdExchangeRate,
                      }),
                      b.getMultichainCoinRates,
                    ],
                    (
                      e,
                      t,
                      n,
                      a,
                      r,
                      { state: o, toTokenExchangeRate: i, toTokenUsdExchangeRate: s },
                      u
                    ) => {
                      if (null != e && e.chainId && !r[e.chainId] && i)
                        return { valueInCurrency: i, usd: s };
                      if (null != e && e.chainId && a) {
                        var d;
                        const r =
                            null === (d = (0, l.getNativeAssetForChainId)(e.chainId)) ||
                            void 0 === d
                              ? void 0
                              : d.assetId,
                          s = (0, T.toAssetId)(a.address, (0, l.formatChainIdToCaip)(e.chainId));
                        if ((0, l.isSolanaChainId)(e.chainId) && r && s) {
                          var p, f, m, h;
                          const t = (0, C.tokenPriceInNativeAsset)(
                            Number(
                              (null == n || null === (p = n[s]) || void 0 === p
                                ? void 0
                                : p.rate) ?? null
                            ),
                            Number(
                              (null == n || null === (f = n[r]) || void 0 === f
                                ? void 0
                                : f.rate) ?? null
                            )
                          );
                          return (0, C.exchangeRatesFromNativeAndCurrencyRates)(
                            t,
                            (null == u ||
                            null === (m = u[e.nativeCurrency.toLowerCase()]) ||
                            void 0 === m
                              ? void 0
                              : m.conversionRate) ?? null,
                            (null == u ||
                            null === (h = u[e.nativeCurrency.toLowerCase()]) ||
                            void 0 === h
                              ? void 0
                              : h.usdConversionRate) ?? null
                          );
                        }
                        const { chainId: g } = e,
                          y = (0, c.selectConversionRateByChainId)(o, g),
                          b = (0, c.getUSDConversionRateByChainId)(g)(o);
                        if ((0, l.isNativeAddress)(a.address))
                          return { valueInCurrency: y, usd: b };
                        const v =
                          (0, C.exchangeRateFromMarketData)(g, a.address, t) ??
                          (0, C.tokenPriceInNativeAsset)(i, y);
                        return (0, C.exchangeRatesFromNativeAndCurrencyRates)(v, y, b);
                      }
                      return (0, C.exchangeRatesFromNativeAndCurrencyRates)();
                    }
                  )),
                  $ = (0, o.createSelector)(
                    e => e.metamask.quotes,
                    B,
                    R,
                    m.getConversionRate,
                    b.getMultichainCoinRates,
                    c.getUSDConversionRate,
                    j,
                    (
                      e,
                      t,
                      n,
                      a,
                      r,
                      o,
                      {
                        estimatedBaseFeeInDecGwei: i,
                        maxPriorityFeePerGasInDecGwei: s,
                        maxFeePerGasInDecGwei: u,
                      }
                    ) =>
                      e.map(e => {
                        const c =
                            (0, l.isSolanaChainId)(e.quote.srcChainId) && e.solanaFeesInLamports,
                          d = (0, h.calcToAmount)(e.quote, t.valueInCurrency, t.usd);
                        let p, f, m;
                        if (c)
                          (p = (0, h.calcSolanaTotalNetworkFee)(
                            e,
                            r.sol.conversionRate,
                            r.sol.usdConversionRate
                          )),
                            (f = p),
                            (m = p);
                        else {
                          var g, y, b, v;
                          f = (0, h.calcEstimatedAndMaxTotalGasFee)({
                            bridgeQuote: e,
                            estimatedBaseFeeInDecGwei: i,
                            maxFeePerGasInDecGwei: u,
                            maxPriorityFeePerGasInDecGwei: s,
                            nativeToDisplayCurrencyExchangeRate: a,
                            nativeToUsdExchangeRate: o,
                          });
                          const t = (0, h.calcRelayerFee)(e, a, o);
                          (p = {
                            amount: f.amount.plus(t.amount),
                            valueInCurrency:
                              (null === (g = f.valueInCurrency) || void 0 === g
                                ? void 0
                                : g.plus(t.valueInCurrency || '0')) ?? null,
                            usd:
                              (null === (y = f.usd) || void 0 === y
                                ? void 0
                                : y.plus(t.usd || '0')) ?? null,
                          }),
                            (m = {
                              amount: f.amountMax.plus(t.amount),
                              valueInCurrency:
                                (null === (b = f.valueInCurrencyMax) || void 0 === b
                                  ? void 0
                                  : b.plus(t.valueInCurrency || '0')) ?? null,
                              usd:
                                (null === (v = f.usdMax) || void 0 === v
                                  ? void 0
                                  : v.plus(t.usd || '0')) ?? null,
                            });
                        }
                        const _ = (0, h.calcSentAmount)(e.quote, n.valueInCurrency, n.usd),
                          T = (0, h.calcAdjustedReturn)(d, p);
                        return {
                          ...e,
                          toTokenAmount: d,
                          sentAmount: _,
                          totalNetworkFee: p,
                          totalMaxNetworkFee: m,
                          adjustedReturn: T,
                          gasFee: f,
                          swapRate: (0, h.calcSwapRate)(_.amount, d.amount),
                          cost: (0, h.calcCost)(T, _),
                        };
                      })
                  ),
                  F = (0, o.createSelector)($, D, (e, t) =>
                    t === l.SortOrder.ETA_ASC
                      ? (0, r.orderBy)(e, e => e.estimatedProcessingTimeInSeconds, 'asc')
                      : (0, r.orderBy)(
                          e,
                          ({ cost: e }) => {
                            var t;
                            return null === (t = e.valueInCurrency) || void 0 === t
                              ? void 0
                              : t.toNumber();
                          },
                          'asc'
                        )
                  ),
                  L = ({ quote: e }) => `${e.bridgeId}-${e.bridges[0]}-${e.steps.length}`,
                  U = (0, o.createSelector)(
                    e => e.metamask.quotesRefreshCount,
                    e => e.bridge.selectedQuote,
                    F,
                    (e, t, n) => (e <= 1 ? t : n.find(e => !!t && L(e) === L(t)))
                  ),
                  H = (n.getBridgeQuotes = (0, o.createSelector)(
                    [
                      F,
                      U,
                      e => e.metamask.quotesLastFetched,
                      e => e.metamask.quotesLoadingStatus === l.RequestStatus.LOADING,
                      e => e.metamask.quotesRefreshCount,
                      e => e.metamask.quotesInitialLoadTime,
                      e => e.metamask.quoteFetchError,
                      A,
                      P,
                    ],
                    (e, t, n, a, r, o, i, { maxRefreshCount: s }, { insufficientBal: l }) => ({
                      sortedQuotes: e,
                      recommendedQuote: e[0],
                      activeQuote: t ?? e[0],
                      quotesLastFetchedMs: n,
                      isLoading: a,
                      quoteFetchError: i,
                      quotesRefreshCount: r,
                      quotesInitialLoadTimeMs: o,
                      isQuoteGoingToRefresh: !l && r < s,
                    })
                  )),
                  V =
                    ((n.getIsBridgeTx = (0, p.createDeepEqualSelector)(
                      x,
                      O,
                      e => (0, c.getIsBridgeEnabled)(e),
                      (e, t, n) => !!(n && t && null != e && e.chainId) && e.chainId !== t.chainId
                    )),
                    (n.getIsSwap = (0, p.createDeepEqualSelector)(
                      P,
                      ({ srcChainId: e, destChainId: t }) =>
                        Boolean(
                          e && t && (0, l.formatChainIdToCaip)(e) === (0, l.formatChainIdToCaip)(t)
                        )
                    )),
                    (0, o.createSelector)(
                      I,
                      e => e.metamask.quoteRequest.srcTokenAmount,
                      (e, t) =>
                        t && null != e && e.decimals
                          ? (0, s.calcTokenAmount)(t, Number(e.decimals)).toString()
                          : null
                    ));
                (n.getFromAmountInCurrency = (0, o.createSelector)(
                  I,
                  x,
                  V,
                  R,
                  (e, t, n, { valueInCurrency: a, usd: r }) =>
                    null != e && e.symbol && null != t && t.chainId && n && a && r
                      ? {
                          valueInCurrency: new i.BigNumber(n).mul(
                            new i.BigNumber(a.toString() ?? 1)
                          ),
                          usd: new i.BigNumber(n).mul(new i.BigNumber(r.toString() ?? 1)),
                        }
                      : { valueInCurrency: new i.BigNumber(0), usd: new i.BigNumber(0) }
                )),
                  (n.getValidationErrors = (0, p.createDeepEqualSelector)(
                    H,
                    V,
                    I,
                    S,
                    ({ activeQuote: e, quotesLastFetchedMs: t, isLoading: n }, a, r, o) => {
                      var s, u;
                      return {
                        isNoQuotesAvailable: Boolean(!e && t && !n),
                        isInsufficientGasBalance: t =>
                          !(!t || e || !a || !r) &&
                          ((0, l.isNativeAddress)(r.address) ? t.eq(a) : t.lte(0)),
                        isInsufficientGasForQuote: t =>
                          !!(t && e && r && o) &&
                          ((0, l.isNativeAddress)(r.address)
                            ? t.sub(e.totalMaxNetworkFee.amount).sub(e.sentAmount.amount).lte(0)
                            : t.lte(e.totalMaxNetworkFee.amount)),
                        isInsufficientBalance: e => !(!a || e === undefined) && e.lt(a),
                        isEstimatedReturnLow:
                          !!(
                            null != e &&
                            null !== (s = e.sentAmount) &&
                            void 0 !== s &&
                            s.valueInCurrency &&
                            null != e &&
                            null !== (u = e.adjustedReturn) &&
                            void 0 !== u &&
                            u.valueInCurrency &&
                            o
                          ) &&
                          e.adjustedReturn.valueInCurrency.lt(
                            new i.BigNumber(
                              1 - l.BRIDGE_QUOTE_MAX_RETURN_DIFFERENCE_PERCENTAGE
                            ).times(e.sentAmount.valueInCurrency)
                          ),
                      };
                    }
                  ));
                n.getWasTxDeclined = e => e.bridge.wasTxDeclined;
                (n.isBridgeSolanaEnabled = (0, p.createDeepEqualSelector)(
                  e => e.metamask.bridgeFeatureFlags,
                  e => {
                    var t;
                    const n = u.MultichainNetworks.SOLANA,
                      a = (0, l.formatChainIdToCaip)(n),
                      r =
                        null == e ||
                        null === (t = e[l.BridgeFeatureFlagsKey.EXTENSION_CONFIG]) ||
                        void 0 === t ||
                        null === (t = t.chains) ||
                        void 0 === t
                          ? void 0
                          : t[a];
                    return Boolean(
                      (null == r ? void 0 : r.isActiveSrc) || (null == r ? void 0 : r.isActiveDest)
                    );
                  }
                )),
                  (n.needsSolanaAccountForDestination = (0, p.createDeepEqualSelector)(
                    O,
                    e => k(e),
                    (e, t) => {
                      if (!e) return !1;
                      return (0, l.isSolanaChainId)(e.chainId) && !t;
                    }
                  )),
                  (n.getIsToOrFromSolana = (0, o.createSelector)(x, O, (e, t) => {
                    if (null == e || !e.chainId || null == t || !t.chainId) return !1;
                    const n = (0, l.isSolanaChainId)(e.chainId);
                    return (0, l.isSolanaChainId)(t.chainId) !== n;
                  }));
                n.getHardwareWalletName = e => {
                  switch ((0, c.getHardwareWalletType)(e)) {
                    case _.HardwareKeyringType.ledger:
                      return _.HardwareKeyringNames.ledger;
                    case _.HardwareKeyringType.trezor:
                      return _.HardwareKeyringNames.trezor;
                    case _.HardwareKeyringType.lattice:
                      return _.HardwareKeyringNames.lattice;
                    case _.HardwareKeyringType.oneKey:
                      return _.HardwareKeyringNames.oneKey;
                    default:
                      return undefined;
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/bridge/selectors.ts' },
    ],
    [
      6852,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.clearAlerts = function (e) {
                    return { type: 'CLEAR_ALERTS', ownerId: e };
                  }),
                  (n.default = function (e = a, t) {
                    switch (t.type) {
                      case 'UPDATE_ALERTS':
                        return { ...e, alerts: { ...e.alerts, [t.ownerId]: t.alerts } };
                      case 'SET_ALERT_CONFIRMED':
                        return {
                          ...e,
                          confirmed: {
                            ...e.confirmed,
                            [t.ownerId]: { ...e.confirmed[t.ownerId], [t.alertKey]: t.isConfirmed },
                          },
                        };
                      case 'CLEAR_ALERTS':
                        return {
                          ...e,
                          alerts: { ...e.alerts, [t.ownerId]: [] },
                          confirmed: { ...e.confirmed, [t.ownerId]: {} },
                        };
                      default:
                        return e;
                    }
                  }),
                  (n.setAlertConfirmed = function (e, t, n) {
                    return { type: 'SET_ALERT_CONFIRMED', ownerId: e, alertKey: t, isConfirmed: n };
                  }),
                  (n.updateAlerts = function (e, t) {
                    return { type: 'UPDATE_ALERTS', alerts: t, ownerId: e };
                  });
                const a = { alerts: {}, confirmed: {} };
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/confirm-alerts/confirm-alerts.ts' },
    ],
    [
      6857,
      { '../../helpers/constants/routes': 6878, '@reduxjs/toolkit': 3073 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.pageChanged = n.getMostRecentOverviewPage = n.default = void 0);
                var a = e('@reduxjs/toolkit'),
                  r = e('../../helpers/constants/routes');
                const o = { mostRecentOverviewPage: r.DEFAULT_ROUTE },
                  i = 'history',
                  s = (0, a.createSlice)({
                    name: i,
                    initialState: o,
                    reducers: {
                      pageChanged: (e, t) => {
                        const n = t.payload;
                        (n === r.DEFAULT_ROUTE || n.startsWith(r.ASSET_ROUTE)) &&
                          (e.mostRecentOverviewPage = n);
                      },
                    },
                  }),
                  { actions: l, reducer: u } = s;
                n.default = u;
                n.getMostRecentOverviewPage = e => e[i].mostRecentOverviewPage;
                const { pageChanged: c } = l;
                n.pageChanged = c;
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/history/history.js' },
    ],
    [
      6858,
      {
        '../../shared/constants/alerts': 5787,
        './alerts': 6842,
        './app/app': 6845,
        './bridge/bridge': 6849,
        './confirm-alerts/confirm-alerts': 6852,
        './confirm-transaction/confirm-transaction.duck': 6853,
        './domains': 6854,
        './gas/gas.duck': 6856,
        './history/history': 6857,
        './locale/locale': 6859,
        './metamask/metamask': 6860,
        './ramps/ramps': 6863,
        './send/send': 6866,
        './swaps/swaps': 6868,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('redux'),
                  r = e('../../shared/constants/alerts'),
                  o = b(e('./metamask/metamask')),
                  i = b(e('./locale/locale')),
                  s = b(e('./send/send')),
                  l = b(e('./domains')),
                  u = b(e('./app/app')),
                  c = b(e('./confirm-transaction/confirm-transaction.duck')),
                  d = b(e('./gas/gas.duck')),
                  p = e('./alerts'),
                  f = b(e('./swaps/swaps')),
                  m = b(e('./bridge/bridge')),
                  h = b(e('./history/history')),
                  g = b(e('./ramps/ramps')),
                  y = b(e('./confirm-alerts/confirm-alerts'));
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = (0, a.combineReducers)({
                  [r.AlertTypes.invalidCustomNetwork]: p.invalidCustomNetwork,
                  [r.AlertTypes.unconnectedAccount]: p.unconnectedAccount,
                  activeTab: e => (e === undefined ? null : e),
                  metamask: o.default,
                  appState: u.default,
                  DNS: l.default,
                  history: h.default,
                  send: s.default,
                  confirmAlerts: y.default,
                  confirmTransaction: c.default,
                  swaps: f.default,
                  ramps: g.default,
                  bridge: m.default,
                  gas: d.default,
                  localeMessages: i.default,
                });
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/index.js' },
    ],
    [
      686,
      { './RegistryItem': 695, './RegistryType': 696, './lib': 706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.CryptoCoinInfo = n.Network = n.Type = void 0);
                const a = e('./lib'),
                  r = e('./RegistryItem'),
                  o = e('./RegistryType');
                var i, s, l;
                !(function (e) {
                  (e.type = '1'), (e.network = '2');
                })(i || (i = {})),
                  (function (e) {
                    e[(e.bitcoin = 0)] = 'bitcoin';
                  })((s = n.Type || (n.Type = {}))),
                  (function (e) {
                    (e[(e.mainnet = 0)] = 'mainnet'), (e[(e.testnet = 1)] = 'testnet');
                  })((l = n.Network || (n.Network = {})));
                class u extends r.RegistryItem {
                  constructor(e, t) {
                    super(),
                      (this.type = e),
                      (this.network = t),
                      (this.getRegistryType = () => o.RegistryTypes.CRYPTO_COIN_INFO),
                      (this.getType = () => this.type || s.bitcoin),
                      (this.getNetwork = () => this.network || l.mainnet),
                      (this.toDataItem = () => {
                        const e = {};
                        return (
                          this.type && (e[i.type] = this.type),
                          this.network && (e[i.network] = this.network),
                          new a.DataItem(e)
                        );
                      });
                  }
                }
                (n.CryptoCoinInfo = u),
                  (u.fromDataItem = e => {
                    const t = e.getData(),
                      n = t[i.type],
                      a = t[i.network];
                    return new u(n, a);
                  }),
                  (u.fromCBOR = e => {
                    const t = (0, a.decodeToDataItem)(e);
                    return u.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoCoinInfo.js',
      },
    ],
    [
      6861,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.defaultBuyableChains = void 0);
                n.defaultBuyableChains = [
                  {
                    active: !0,
                    chainId: 1,
                    chainName: 'Ethereum Mainnet',
                    shortName: 'Ethereum',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 10,
                    chainName: 'Optimism Mainnet',
                    shortName: 'Optimism',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 25,
                    chainName: 'Cronos Mainnet',
                    shortName: 'Cronos',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 56,
                    chainName: 'BNB Chain Mainnet',
                    shortName: 'BNB Chain',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 100,
                    chainName: 'Gnosis Mainnet',
                    shortName: 'Gnosis',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 137,
                    chainName: 'Polygon Mainnet',
                    shortName: 'Polygon',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 250,
                    chainName: 'Fantom Mainnet',
                    shortName: 'Fantom',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 324,
                    chainName: 'zkSync Era Mainnet',
                    shortName: 'zkSync Era',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 1101,
                    chainName: 'Polygon zkEVM',
                    shortName: 'Polygon zkEVM',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 1284,
                    chainName: 'Moonbeam Mainnet',
                    shortName: 'Moonbeam',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 1285,
                    chainName: 'Moonriver Mainnet',
                    shortName: 'Moonriver',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 8453,
                    chainName: 'Base Mainnet',
                    shortName: 'Base',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 42161,
                    chainName: 'Arbitrum Mainnet',
                    shortName: 'Arbitrum',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 42220,
                    chainName: 'Celo Mainnet',
                    shortName: 'Celo',
                    nativeTokenSupported: !1,
                  },
                  {
                    active: !0,
                    chainId: 43114,
                    chainName: 'Avalanche C-Chain Mainnet',
                    shortName: 'Avalanche C-Chain',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 59144,
                    chainName: 'Linea',
                    shortName: 'Linea',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 1313161554,
                    chainName: 'Aurora Mainnet',
                    shortName: 'Aurora',
                    nativeTokenSupported: !1,
                  },
                  {
                    active: !0,
                    chainId: 16666e5,
                    chainName: 'Harmony Mainnet (Shard 0)',
                    shortName: 'Harmony (Shard 0)',
                    nativeTokenSupported: !0,
                  },
                  {
                    active: !0,
                    chainId: 11297108109,
                    chainName: 'Palm Mainnet',
                    shortName: 'Palm',
                    nativeTokenSupported: !1,
                  },
                ];
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/ramps/constants.ts' },
    ],
    [
      6862,
      { './ramps': 6863 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./ramps');
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
      { package: '$root$', file: 'ui/ducks/ramps/index.ts' },
    ],
    [
      6863,
      {
        '../../../shared/constants/multichain/networks': 5803,
        '../../../shared/modules/conversion.utils': 5858,
        '../../../shared/modules/selectors/networks': 5875,
        '../../helpers/ramps/rampApi/rampAPI': 6895,
        '../../selectors': 7601,
        '../../selectors/multichain': 7605,
        './constants': 6861,
        '@reduxjs/toolkit': 3073,
        reselect: 5353,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getIsNativeTokenBuyable =
                    n.getIsBitcoinBuyable =
                    n.getBuyableChains =
                    n.fetchBuyableChains =
                    n.default =
                      void 0);
                var a,
                  r = e('reselect'),
                  o = e('@reduxjs/toolkit'),
                  i = e('../../../shared/modules/selectors/networks'),
                  s = e('../../selectors'),
                  l =
                    (a = e('../../helpers/ramps/rampApi/rampAPI')) && a.__esModule
                      ? a
                      : { default: a },
                  u = e('../../../shared/modules/conversion.utils'),
                  c = e('../../selectors/multichain'),
                  d = e('../../../shared/constants/multichain/networks'),
                  p = e('./constants');
                const f = (n.fetchBuyableChains = (0, o.createAsyncThunk)(
                    'ramps/fetchBuyableChains',
                    async (e, { getState: t }) => {
                      const n = t(),
                        { isFetched: a } = n.ramps;
                      return (0, s.getUseExternalServices)(n)
                        ? a
                          ? n.ramps.buyableChains
                          : await l.default.getNetworks()
                        : p.defaultBuyableChains;
                    }
                  )),
                  m = (0, o.createSlice)({
                    name: 'ramps',
                    initialState: { buyableChains: p.defaultBuyableChains, isFetched: !1 },
                    reducers: {
                      setBuyableChains: (e, t) => {
                        Array.isArray(t.payload) &&
                        t.payload.length > 0 &&
                        t.payload.every(e => (null == e ? void 0 : e.chainId))
                          ? ((e.buyableChains = t.payload), (e.isFetched = !0))
                          : (e.buyableChains = p.defaultBuyableChains);
                      },
                    },
                    extraReducers: e => {
                      e.addCase(f.fulfilled, (e, t) => {
                        const n = t.payload;
                        n && n.length > 0
                          ? (e.buyableChains = n)
                          : (e.buyableChains = p.defaultBuyableChains),
                          (e.isFetched = !0);
                      }).addCase(f.rejected, e => {
                        (e.buyableChains = p.defaultBuyableChains), (e.isFetched = !0);
                      });
                    },
                  }),
                  { reducer: h } = m,
                  g = e => {
                    var t;
                    return (
                      (null === (t = e.ramps) || void 0 === t ? void 0 : t.buyableChains) ??
                      p.defaultBuyableChains
                    );
                  };
                n.getBuyableChains = g;
                const y = (n.getIsBitcoinBuyable = (0, r.createSelector)([g], e =>
                  e
                    .filter(Boolean)
                    .some(e => e.chainId === d.MultichainNetworks.BITCOIN && e.active)
                ));
                n.getIsNativeTokenBuyable = (0, r.createSelector)(
                  [i.getCurrentChainId, g, y, c.getMultichainIsBitcoin],
                  (e, t, n, a) => {
                    try {
                      return t
                        .filter(Boolean)
                        .some(t => (a ? n : String(t.chainId) === (0, u.hexToDecimal)(e)));
                    } catch (e) {
                      return !1;
                    }
                  }
                );
                n.default = h;
              };
            };
      },
      { package: '$root$', file: 'ui/ducks/ramps/ramps.ts' },
    ],
    [
      6869,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                t.exports = [
                  { code: 'aud', name: 'Australian Dollar' },
                  { code: 'hkd', name: 'Hong Kong Dollar' },
                  { code: 'sgd', name: 'Singapore Dollar' },
                  { code: 'idr', name: 'Indonesian Rupiah' },
                  { code: 'inr', name: 'Indian Rupee' },
                  { code: 'nzd', name: 'New Zealand Dollar' },
                  { code: 'php', name: 'Philippine Peso' },
                  { code: 'btc', name: 'Bitcoin' },
                  { code: 'cad', name: 'Canadian Dollar' },
                  { code: 'eur', name: 'Euro' },
                  { code: 'gbp', name: 'Pound Sterling' },
                  { code: 'jpy', name: 'Japanese Yen' },
                  { code: 'ltc', name: 'Litecoin' },
                  { code: 'rub', name: 'Russian Ruble' },
                  { code: 'uah', name: 'Ukrainian Hryvnia' },
                  { code: 'usd', name: 'United States Dollar' },
                  { code: 'xlm', name: 'Stellar Lumen' },
                  { code: 'xrp', name: 'Ripple' },
                  { code: 'sek', name: 'Swedish Krona' },
                  { code: 'aed', name: 'United Arab Emirates Dirham' },
                  { code: 'ars', name: 'Argentine Peso' },
                  { code: 'bch', name: 'Bitcoin Cash' },
                  { code: 'bnb', name: 'Binance Coin' },
                  { code: 'brl', name: 'Brazilian Real' },
                  { code: 'clp', name: 'Chilean Peso' },
                  { code: 'cny', name: 'Chinese Yuan' },
                  { code: 'czk', name: 'Czech Koruna' },
                  { code: 'dkk', name: 'Danish Krone' },
                  { code: 'chf', name: 'Swiss Franc' },
                  { code: 'dot', name: 'Polkadot' },
                  { code: 'eos', name: 'EOS' },
                  { code: 'eth', name: 'Ethereum' },
                  { code: 'gel', name: 'Georgian Lari' },
                  { code: 'huf', name: 'Hungarian Forint' },
                  { code: 'ils', name: 'Israeli Shekel' },
                  { code: 'krw', name: 'South Korean Won' },
                  { code: 'mxn', name: 'Mexican Peso' },
                  { code: 'myr', name: 'Malaysian Ringgit' },
                  { code: 'ngn', name: 'Nigerian Naira' },
                  { code: 'nok', name: 'Norwegian Krone' },
                  { code: 'pln', name: 'Polish Zloty' },
                  { code: 'thb', name: 'Thai Baht' },
                  { code: 'try', name: 'Turkish Lira' },
                  { code: 'zar', name: 'South African Rand' },
                ];
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/available-conversions.json' },
    ],
    [
      687,
      { './RegistryItem': 695, './RegistryType': 696, './lib': 706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.CryptoECKey = void 0);
                const a = e('./lib'),
                  r = e('./RegistryItem'),
                  o = e('./RegistryType');
                var i;
                !(function (e) {
                  (e[(e.curve = 1)] = 'curve'),
                    (e[(e.private = 2)] = 'private'),
                    (e[(e.data = 3)] = 'data');
                })(i || (i = {}));
                class s extends r.RegistryItem {
                  constructor(e) {
                    super(),
                      (this.isECKey = () => !0),
                      (this.getCurve = () => this.curve || 0),
                      (this.isPrivateKey = () => this.privateKey || !1),
                      (this.getData = () => this.data),
                      (this.getRegistryType = () => o.RegistryTypes.CRYPTO_ECKEY),
                      (this.toDataItem = () => {
                        const e = {};
                        return (
                          this.curve && (e[i.curve] = this.curve),
                          this.privateKey !== undefined && (e[i.private] = this.privateKey),
                          (e[i.data] = this.data),
                          new a.DataItem(e)
                        );
                      }),
                      (this.getOutputDescriptorContent = () => this.data.toString('hex')),
                      (this.data = e.data),
                      (this.curve = e.curve),
                      (this.privateKey = e.privateKey || undefined);
                  }
                }
                (n.CryptoECKey = s),
                  (s.fromDataItem = e => {
                    const t = e.getData(),
                      n = t[i.curve],
                      a = t[i.private],
                      r = t[i.data];
                    if (!r)
                      throw new Error(
                        `#[ur-registry][CryptoECKey][fn.fromDataItem]: decoded [dataItem][#data.data] is undefined: ${e}`
                      );
                    return new s({ data: r, curve: n, privateKey: a });
                  }),
                  (s.fromCBOR = e => {
                    const t = (0, a.decodeToDataItem)(e);
                    return s.fromDataItem(t);
                  });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoECKey.js',
      },
    ],
    [
      6871,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.STATUS_NOT_CONNECTED =
                    n.STATUS_CONNECTED_TO_SNAP =
                    n.STATUS_CONNECTED_TO_ANOTHER_ACCOUNT =
                    n.STATUS_CONNECTED =
                      void 0);
                (n.STATUS_CONNECTED = 'STATUS_CONNECTED'),
                  (n.STATUS_CONNECTED_TO_ANOTHER_ACCOUNT = 'STATUS_CONNECTED_TO_ANOTHER_ACCOUNT'),
                  (n.STATUS_NOT_CONNECTED = 'STATUS_NOT_CONNECTED'),
                  (n.STATUS_CONNECTED_TO_SNAP = 'STATUS_CONNECTED_TO_SNAP');
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/connected-sites.js' },
    ],
    [
      6874,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.PRIORITY_LEVEL_ICON_MAP = n.GAS_FORM_ERRORS = void 0),
                  (n.getGasFormErrorText = function (e, t, { minimumGasLimit: n } = {}) {
                    switch (e) {
                      case a.GAS_LIMIT_OUT_OF_BOUNDS:
                        return t('editGasLimitOutOfBounds', [n]);
                      case a.MAX_PRIORITY_FEE_TOO_LOW:
                        return t('editGasMaxPriorityFeeLow');
                      case a.MAX_FEE_TOO_LOW:
                        return t('editGasMaxFeeLow');
                      case a.MAX_PRIORITY_FEE_BELOW_MINIMUM:
                        return t('editGasMaxPriorityFeeBelowMinimum');
                      case a.MAX_PRIORITY_FEE_HIGH_WARNING:
                        return t('editGasMaxPriorityFeeHigh');
                      case a.MAX_FEE_HIGH_WARNING:
                        return t('editGasMaxFeeHigh');
                      case a.MAX_FEE_IMBALANCE:
                        return t('editGasMaxFeePriorityImbalance');
                      case a.GAS_PRICE_TOO_LOW:
                        return t('editGasPriceTooLow');
                      default:
                        return '';
                    }
                  });
                const a = (n.GAS_FORM_ERRORS = {
                  GAS_LIMIT_OUT_OF_BOUNDS: 'editGasLimitOutOfBounds',
                  MAX_PRIORITY_FEE_TOO_LOW: 'editGasMaxPriorityFeeLow',
                  MAX_FEE_TOO_LOW: 'editGasMaxFeeLow',
                  MAX_PRIORITY_FEE_BELOW_MINIMUM: 'editGasMaxPriorityFeeBelowMinimum',
                  MAX_PRIORITY_FEE_HIGH_WARNING: 'editGasMaxPriorityFeeHigh',
                  MAX_FEE_HIGH_WARNING: 'editGasMaxFeeHigh',
                  MAX_FEE_IMBALANCE: 'editGasMaxFeeImbalance',
                  GAS_PRICE_TOO_LOW: 'editGasPriceTooLow',
                });
                n.PRIORITY_LEVEL_ICON_MAP = {
                  low: '🐢',
                  medium: '🦊',
                  high: '🦍',
                  dappSuggested: '🌐',
                  dappSuggestedHigh: '🌐',
                  swapSuggested: '🔄',
                  custom: '⚙️',
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/gas.js' },
    ],
    [
      6875,
      { '../../../../shared/constants/network': 5804 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SUPPORTED_NOTIFICATION_BLOCK_EXPLORERS = void 0);
                var a = e('../../../../shared/constants/network');
                n.SUPPORTED_NOTIFICATION_BLOCK_EXPLORERS = {
                  [a.CHAIN_IDS.MAINNET]: { url: 'https://etherscan.io', name: 'Etherscan' },
                  [a.CHAIN_IDS.OPTIMISM]: {
                    url: 'https://optimistic.etherscan.io',
                    name: 'Optimistic Etherscan',
                  },
                  [a.CHAIN_IDS.BSC]: { url: 'https://bscscan.com', name: 'BscScan' },
                  [a.CHAIN_IDS.POLYGON]: { url: 'https://polygonscan.com', name: 'PolygonScan' },
                  [a.CHAIN_IDS.ARBITRUM]: { url: 'https://arbiscan.io', name: 'Arbiscan' },
                  [a.CHAIN_IDS.AVALANCHE]: { url: 'https://snowtrace.io', name: 'Snowtrace' },
                  [a.CHAIN_IDS.LINEA_MAINNET]: {
                    url: 'https://lineascan.build',
                    name: 'LineaScan',
                  },
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/helpers/constants/metamask-notifications/metamask-notifications.ts',
      },
    ],
    [
      6877,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.PRIVACY_POLICY_DATE = void 0);
                n.PRIVACY_POLICY_DATE = '2024-06-18T12:00:00Z';
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/privacy-policy.ts' },
    ],
    [
      6879,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/app': 5789,
        '../../components/component-library': 6402,
        './routes': 6878,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('../../../app/scripts/lib/util'),
                  r = e('../../../shared/constants/app'),
                  o = e('../../components/component-library'),
                  i = e('./routes');
                const s = [
                  {
                    tabMessage: e => e('general'),
                    sectionMessage: e => e('currencyConversion'),
                    descriptionMessage: e => e('currencyConversion'),
                    route: `${i.GENERAL_ROUTE}#currency-conversion`,
                    iconName: o.IconName.Setting,
                  },
                  {
                    tabMessage: e => e('general'),
                    sectionMessage: e => e('showNativeTokenAsMainBalance'),
                    descriptionMessage: e => e('showNativeTokenAsMainBalance'),
                    route: `${i.GENERAL_ROUTE}#show-native-token-as-main-balance`,
                    iconName: o.IconName.Setting,
                  },
                  {
                    tabMessage: e => e('general'),
                    sectionMessage: e => e('currentLanguage'),
                    descriptionMessage: e => e('currentLanguage'),
                    route: `${i.GENERAL_ROUTE}#current-language`,
                    iconName: o.IconName.Setting,
                  },
                  {
                    tabMessage: e => e('general'),
                    sectionMessage: e => e('theme'),
                    descriptionMessage: e => e('themeDescription'),
                    route: `${i.GENERAL_ROUTE}#theme`,
                    icon: 'fa fa-flask',
                  },
                  {
                    tabMessage: e => e('general'),
                    sectionMessage: e => e('accountIdenticon'),
                    descriptionMessage: e => e('accountIdenticon'),
                    route: `${i.GENERAL_ROUTE}#account-identicon`,
                    iconName: o.IconName.Setting,
                  },
                  {
                    tabMessage: e => e('general'),
                    sectionMessage: e => e('hideZeroBalanceTokens'),
                    descriptionMessage: e => e('hideZeroBalanceTokens'),
                    route: `${i.GENERAL_ROUTE}#zero-balancetokens`,
                    iconName: o.IconName.Setting,
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('stateLogs'),
                    descriptionMessage: e => e('stateLogsDescription'),
                    route: `${i.ADVANCED_ROUTE}#state-logs`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('clearActivity'),
                    descriptionMessage: e => e('clearActivityDescription'),
                    route: `${i.ADVANCED_ROUTE}#clear-activity`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('smartTransactions'),
                    descriptionMessage: e => e('stxOptInSupportedNetworksDescription'),
                    route: `${i.ADVANCED_ROUTE}#smart-transactions`,
                    icon: 'fas fa-upload',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('showHexData'),
                    descriptionMessage: e => e('showHexDataDescription'),
                    route: `${i.ADVANCED_ROUTE}#show-hexdata`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('showFiatConversionInTestnets'),
                    descriptionMessage: e => e('showFiatConversionInTestnetsDescription'),
                    route: `${i.ADVANCED_ROUTE}#conversion-testnetworks`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('showTestnetNetworks'),
                    descriptionMessage: e => e('showTestnetNetworksDescription'),
                    route: `${i.ADVANCED_ROUTE}#show-testnets`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('autoLockTimeLimit'),
                    descriptionMessage: e => e('autoLockTimeLimitDescription'),
                    route: `${i.ADVANCED_ROUTE}#autolock-timer`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('showExtensionInFullSizeView'),
                    descriptionMessage: e => e('showExtensionInFullSizeViewDescription'),
                    route: `${i.ADVANCED_ROUTE}#extension-full-size-view`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('dismissReminderField'),
                    descriptionMessage: e => e('dismissReminderDescriptionField'),
                    route: `${i.ADVANCED_ROUTE}#dismiss-secretrecovery`,
                    icon: 'fas fa-sliders-h',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('exportYourData'),
                    descriptionMessage: e => e('exportYourDataDescription'),
                    route: `${i.ADVANCED_ROUTE}#export-data`,
                    icon: 'fas fa-download',
                  },
                  {
                    tabMessage: e => e('advanced'),
                    sectionMessage: e => e('overrideContentSecurityPolicyHeader'),
                    descriptionMessage: e => e('overrideContentSecurityPolicyHeaderDescription'),
                    route: `${i.ADVANCED_ROUTE}#override-content-security-policy-header`,
                    icon: 'fas fa-sliders-h',
                    hidden: (0, a.getPlatform)() !== r.PLATFORM_FIREFOX,
                  },
                  {
                    tabMessage: e => e('contacts'),
                    sectionMessage: e => e('contacts'),
                    descriptionMessage: e => e('contacts'),
                    route: i.CONTACT_LIST_ROUTE,
                    iconName: o.IconName.Book,
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('basicConfigurationLabel'),
                    descriptionMessage: e => e('basicConfigurationDescription'),
                    route: `${i.SECURITY_ROUTE}#basic-functionality-toggle`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('revealSeedWords'),
                    descriptionMessage: e => e('revealSeedWords'),
                    route: `${i.SECURITY_ROUTE}#reveal-secretrecovery`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('usePhishingDetection'),
                    descriptionMessage: e => e('usePhishingDetectionDescription'),
                    route: `${i.SECURITY_ROUTE}#phishing-detection`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('use4ByteResolution'),
                    descriptionMessage: e => e('toggleDecodeDescription'),
                    route: `${i.SECURITY_ROUTE}#decode-smart-contracts`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('participateInMetaMetrics'),
                    descriptionMessage: e => e('participateInMetaMetricsDescription'),
                    route: `${i.SECURITY_ROUTE}#metametrics`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('networkProvider'),
                    descriptionMessage: e =>
                      `${e('chooseYourNetwork')} ${e('chooseYourNetworkDescription')}`,
                    route: `${i.SECURITY_ROUTE}#network-provider`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('ipfsGateway'),
                    descriptionMessage: e => e('ipfsGatewayDescription'),
                    route: `${i.SECURITY_ROUTE}#add-custom-ipfs-gateway`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('autoDetectTokens'),
                    descriptionMessage: e => e('autoDetectTokensDescription'),
                    route: `${i.SECURITY_ROUTE}#auto-detect-tokens`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('useMultiAccountBalanceChecker'),
                    descriptionMessage: e => e('useMultiAccountBalanceCheckerSettingDescription'),
                    route: `${i.SECURITY_ROUTE}#batch-account-balance-requests`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('currencyRateCheckToggle'),
                    descriptionMessage: e => e('currencyRateCheckToggleDescription'),
                    route: `${i.SECURITY_ROUTE}#price-checker`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('ensDomainsSettingTitle'),
                    descriptionMessage: e => e('ensDomainsSettingDescriptionIntroduction'),
                    route: `${i.SECURITY_ROUTE}#ens-domains`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('displayNftMedia'),
                    descriptionMessage: e => e('displayNftMediaDescription'),
                    route: `${i.SECURITY_ROUTE}#display-nft-media`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('useNftDetection'),
                    descriptionMessage: e => e('useNftDetectionDescriptionText'),
                    route: `${i.SECURITY_ROUTE}#autodetect-nfts`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('useSafeChainsListValidation'),
                    descriptionMessage: e => e('useSafeChainsListValidationDescription'),
                    route: `${i.SECURITY_ROUTE}#network-details-check`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('externalNameSourcesSetting'),
                    descriptionMessage: e => e('externalNameSourcesSettingDescription'),
                    route: `${i.SECURITY_ROUTE}#proposed-nicknames`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('securityAlerts'),
                    descriptionMessage: e => e('securityAlertsDescription'),
                    route: `${i.SECURITY_ROUTE}#security-alerts`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('blockaid'),
                    descriptionMessage: e => e('blockaidMessage'),
                    route: `${i.SECURITY_ROUTE}#security-alerts-blockaid`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('simulationsSettingSubHeader'),
                    descriptionMessage: e => e('simulationsSettingDescription'),
                    route: `${i.SECURITY_ROUTE}#transaction-simulations`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('dataCollectionForMarketing'),
                    descriptionMessage: e => e('dataCollectionForMarketingDescription'),
                    route: `${i.SECURITY_ROUTE}#dataCollectionForMarketing`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('deleteMetaMetricsData'),
                    descriptionMessage: e => e('deleteMetaMetricsDataDescription'),
                    route: `${i.SECURITY_ROUTE}#delete-metametrics-data`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('securityAndPrivacy'),
                    sectionMessage: e => e('profileSync'),
                    descriptionMessage: e => e('profileSyncDescription'),
                    route: `${i.SECURITY_ROUTE}#profile-sync`,
                    icon: 'fa fa-lock',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('mainnet'),
                    descriptionMessage: e => e('mainnet'),
                    route: `${i.NETWORKS_ROUTE}#networks-mainnet`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('lineaMainnet'),
                    descriptionMessage: e => e('lineaMainnet'),
                    route: `${i.NETWORKS_ROUTE}#networks-linea-mainnet`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('goerli'),
                    descriptionMessage: e => e('goerli'),
                    route: `${i.NETWORKS_ROUTE}#networks-goerli`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('sepolia'),
                    descriptionMessage: e => e('sepolia'),
                    route: `${i.NETWORKS_ROUTE}#networks-sepolia`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('lineaGoerli'),
                    descriptionMessage: e => e('lineaGoerli'),
                    route: `${i.NETWORKS_ROUTE}#networks-linea-goerli`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('lineaSepolia'),
                    descriptionMessage: e => e('lineaSepolia'),
                    route: `${i.NETWORKS_ROUTE}#networks-linea-sepolia`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('networks'),
                    sectionMessage: e => e('localhost'),
                    descriptionMessage: e => e('localhost'),
                    route: `${i.NETWORKS_ROUTE}#networks-localhost`,
                    icon: 'fa fa-plug',
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('metamaskVersion'),
                    descriptionMessage: e => e('builtAroundTheWorld'),
                    route: `${i.ABOUT_US_ROUTE}#version`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('links'),
                    descriptionMessage: e => e('links'),
                    route: `${i.ABOUT_US_ROUTE}#links`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('privacyMsg'),
                    descriptionMessage: e => e('privacyMsg'),
                    route: `${i.ABOUT_US_ROUTE}#privacy-policy`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('terms'),
                    descriptionMessage: e => e('terms'),
                    route: `${i.ABOUT_US_ROUTE}#terms`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('attributions'),
                    descriptionMessage: e => e('attributions'),
                    route: `${i.ABOUT_US_ROUTE}#attributions`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('supportCenter'),
                    descriptionMessage: e => e('supportCenter'),
                    route: `${i.ABOUT_US_ROUTE}#supportcenter`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('visitWebSite'),
                    descriptionMessage: e => e('visitWebSite'),
                    route: `${i.ABOUT_US_ROUTE}#visitwebsite`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('contactUs'),
                    descriptionMessage: e => e('contactUs'),
                    route: `${i.ABOUT_US_ROUTE}#contactus`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('about'),
                    sectionMessage: e => e('betaTerms'),
                    descriptionMessage: e => e('betaTerms'),
                    route: `${i.ABOUT_US_ROUTE}#beta-terms`,
                    iconName: o.IconName.Info,
                  },
                  {
                    tabMessage: e => e('experimental'),
                    sectionMessage: e => e('notificationsFeatureToggle'),
                    descriptionMessage: e => e('notificationsFeatureToggleDescription'),
                    route: `${i.EXPERIMENTAL_ROUTE}#notifications`,
                    icon: 'fas fa-flask',
                  },
                  {
                    tabMessage: e => e('experimental'),
                    sectionMessage: e => e('snaps'),
                    descriptionMessage: e => e('addSnapAccountToggle'),
                    route: `${i.EXPERIMENTAL_ROUTE}#snaps`,
                    icon: 'fas fa-flask',
                  },
                  {
                    featureFlag: 'ENABLE_SETTINGS_PAGE_DEV_OPTIONS',
                    tabMessage: e => e('developerOptions'),
                    sectionMessage: 'Reset States',
                    descriptionMessage: 'Reset States',
                    route: `${i.DEVELOPER_OPTIONS_ROUTE}#reset-states`,
                    icon: o.IconName.CodeCircle,
                  },
                  {
                    featureFlag: 'ENABLE_SETTINGS_PAGE_DEV_OPTIONS',
                    tabMessage: e => e('developerOptions'),
                    sectionMessage: 'Announcements',
                    descriptionMessage:
                      "Resets isShown boolean to false for all announcements. Announcements are the notifications shown in the What's New popup modal.",
                    route: `${i.DEVELOPER_OPTIONS_ROUTE}#reset-states-announcements`,
                    icon: o.IconName.CodeCircle,
                  },
                  {
                    featureFlag: 'ENABLE_SETTINGS_PAGE_DEV_OPTIONS',
                    tabMessage: e => e('developerOptions'),
                    sectionMessage: 'Service Worker Keep Alive',
                    descriptionMessage:
                      'Resets various states related to onboarding and redirects to the "Secure Your Wallet" onboarding page.',
                    route: `${i.DEVELOPER_OPTIONS_ROUTE}#reset-states-onboarding`,
                    icon: o.IconName.CodeCircle,
                  },
                  {
                    featureFlag: 'ENABLE_SETTINGS_PAGE_DEV_OPTIONS',
                    tabMessage: e => e('developerOptions'),
                    sectionMessage: 'Service Worker Keep Alive',
                    descriptionMessage:
                      'Results in a timestamp being continuously saved to session.storage',
                    route: `${i.DEVELOPER_OPTIONS_ROUTE}#service-worker-keep-alive`,
                    icon: o.IconName.CodeCircle,
                  },
                  {
                    tabMessage: e => e('experimental'),
                    sectionMessage: e => e('watchEthereumAccountsToggle'),
                    descriptionMessage: e => e('watchEthereumAccountsDescription'),
                    route: `${i.EXPERIMENTAL_ROUTE}#watch-only`,
                    icon: 'fas fa-flask',
                  },
                ];
                n.default = s;
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/settings.js' },
    ],
    [
      688,
      {
        './CryptoCoinInfo': 686,
        './CryptoKeypath': 689,
        './RegistryItem': 695,
        './RegistryType': 696,
        './lib': 706,
        bs58check: 4142,
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
                    Object.defineProperty(n, '__esModule', { value: !0 }), (n.CryptoHDKey = void 0);
                    const a = e('bs58check'),
                      r = e('./CryptoCoinInfo'),
                      o = e('./CryptoKeypath'),
                      i = e('./lib'),
                      s = e('./RegistryItem'),
                      l = e('./RegistryType');
                    var u;
                    !(function (e) {
                      (e[(e.is_master = 1)] = 'is_master'),
                        (e[(e.is_private = 2)] = 'is_private'),
                        (e[(e.key_data = 3)] = 'key_data'),
                        (e[(e.chain_code = 4)] = 'chain_code'),
                        (e[(e.use_info = 5)] = 'use_info'),
                        (e[(e.origin = 6)] = 'origin'),
                        (e[(e.children = 7)] = 'children'),
                        (e[(e.parent_fingerprint = 8)] = 'parent_fingerprint'),
                        (e[(e.name = 9)] = 'name'),
                        (e[(e.note = 10)] = 'note');
                    })(u || (u = {}));
                    class c extends s.RegistryItem {
                      constructor(e) {
                        super(),
                          (this.isECKey = () => !1),
                          (this.getKey = () => this.key),
                          (this.getChainCode = () => this.chainCode),
                          (this.isMaster = () => this.master),
                          (this.isPrivateKey = () => !!this.privateKey),
                          (this.getUseInfo = () => this.useInfo),
                          (this.getOrigin = () => this.origin),
                          (this.getChildren = () => this.children),
                          (this.getParentFingerprint = () => this.parentFingerprint),
                          (this.getName = () => this.name),
                          (this.getNote = () => this.note),
                          (this.getBip32Key = () => {
                            var e, n, r;
                            let o,
                              i,
                              s = 0,
                              l = t.alloc(4).fill(0);
                            if (this.isMaster()) (o = t.from('0488ADE4', 'hex')), (i = 0), (s = 0);
                            else {
                              i =
                                (null === (e = this.getOrigin()) || void 0 === e
                                  ? void 0
                                  : e.getComponents().length) ||
                                (null === (n = this.getOrigin()) || void 0 === n
                                  ? void 0
                                  : n.getDepth());
                              const a =
                                  null === (r = this.getOrigin()) || void 0 === r
                                    ? void 0
                                    : r.getComponents(),
                                u = a[a.length - 1];
                              u &&
                                ((s = u.isHardened() ? u.getIndex() + 2147483648 : u.getIndex()),
                                this.getParentFingerprint() && (l = this.getParentFingerprint())),
                                (o = this.isPrivateKey()
                                  ? t.from('0488ADE4', 'hex')
                                  : t.from('0488B21E', 'hex'));
                            }
                            const u = t.alloc(1);
                            u.writeUInt8(i, 0);
                            const c = t.alloc(4);
                            c.writeUInt32BE(s, 0);
                            const d = this.getChainCode(),
                              p = this.getKey();
                            return (0, a.encode)(t.concat([o, u, l, c, d, p]));
                          }),
                          (this.getRegistryType = () => l.RegistryTypes.CRYPTO_HDKEY),
                          (this.getOutputDescriptorContent = () => {
                            var e, t, n, a, r, o, i;
                            let s = '';
                            return (
                              this.getOrigin() &&
                                (null === (e = this.getOrigin()) || void 0 === e
                                  ? void 0
                                  : e.getSourceFingerprint()) &&
                                (null === (t = this.getOrigin()) || void 0 === t
                                  ? void 0
                                  : t.getPath()) &&
                                (s += `${null === (a = null === (n = this.getOrigin()) || void 0 === n ? void 0 : n.getSourceFingerprint()) || void 0 === a ? void 0 : a.toString('hex')}/${null === (r = this.getOrigin()) || void 0 === r ? void 0 : r.getPath()}`),
                              (s += this.getBip32Key()),
                              this.getChildren() &&
                                (null === (o = this.getChildren()) || void 0 === o
                                  ? void 0
                                  : o.getPath()) &&
                                (s += `/${null === (i = this.getChildren()) || void 0 === i ? void 0 : i.getPath()}`),
                              s
                            );
                          }),
                          (this.setupMasterKey = e => {
                            (this.master = !0), (this.key = e.key), (this.chainCode = e.chainCode);
                          }),
                          (this.setupDeriveKey = e => {
                            (this.master = !1),
                              (this.privateKey = e.isPrivateKey),
                              (this.key = e.key),
                              (this.chainCode = e.chainCode),
                              (this.useInfo = e.useInfo),
                              (this.origin = e.origin),
                              (this.children = e.children),
                              (this.parentFingerprint = e.parentFingerprint),
                              (this.name = e.name),
                              (this.note = e.note);
                          }),
                          (this.toDataItem = () => {
                            const e = {};
                            if (this.master)
                              (e[u.is_master] = !0),
                                (e[u.key_data] = this.key),
                                (e[u.chain_code] = this.chainCode);
                            else {
                              if (
                                (this.privateKey !== undefined &&
                                  (e[u.is_private] = this.privateKey),
                                (e[u.key_data] = this.key),
                                this.chainCode && (e[u.chain_code] = this.chainCode),
                                this.useInfo)
                              ) {
                                const t = this.useInfo.toDataItem();
                                t.setTag(this.useInfo.getRegistryType().getTag()),
                                  (e[u.use_info] = t);
                              }
                              if (this.origin) {
                                const t = this.origin.toDataItem();
                                t.setTag(this.origin.getRegistryType().getTag()), (e[u.origin] = t);
                              }
                              if (this.children) {
                                const t = this.children.toDataItem();
                                t.setTag(this.children.getRegistryType().getTag()),
                                  (e[u.children] = t);
                              }
                              this.parentFingerprint &&
                                (e[u.parent_fingerprint] = this.parentFingerprint.readUInt32BE(0)),
                                this.name !== undefined && (e[u.name] = this.name),
                                this.note !== undefined && (e[u.note] = this.note);
                            }
                            return new i.DataItem(e);
                          }),
                          e.isMaster ? this.setupMasterKey(e) : this.setupDeriveKey(e);
                      }
                    }
                    (n.CryptoHDKey = c),
                      (c.fromDataItem = e => {
                        const n = e.getData(),
                          a = !!n[u.is_master],
                          i = n[u.is_private],
                          s = n[u.key_data],
                          l = n[u.chain_code],
                          d = n[u.use_info]
                            ? r.CryptoCoinInfo.fromDataItem(n[u.use_info])
                            : undefined,
                          p = n[u.origin] ? o.CryptoKeypath.fromDataItem(n[u.origin]) : undefined,
                          f = n[u.children]
                            ? o.CryptoKeypath.fromDataItem(n[u.children])
                            : undefined,
                          m = n[u.parent_fingerprint];
                        let h = undefined;
                        m && ((h = t.alloc(4)), h.writeUInt32BE(m, 0));
                        const g = n[u.name],
                          y = n[u.note];
                        return new c({
                          isMaster: a,
                          isPrivateKey: i,
                          key: s,
                          chainCode: l,
                          useInfo: d,
                          origin: p,
                          children: f,
                          parentFingerprint: h,
                          name: g,
                          note: y,
                        });
                      }),
                      (c.fromCBOR = e => {
                        const t = (0, i.decodeToDataItem)(e);
                        return c.fromDataItem(t);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/CryptoHDKey.js',
      },
    ],
    [
      6880,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getDelineatorTitle = n.DelineatorType = void 0);
                let a = (n.DelineatorType = (function (e) {
                  return (
                    (e.Content = 'content'),
                    (e.Error = 'error'),
                    (e.Insights = 'insights'),
                    (e.Description = 'description'),
                    (e.Warning = 'warning'),
                    e
                  );
                })({}));
                n.getDelineatorTitle = e => {
                  switch (e) {
                    case a.Error:
                      return 'errorWithSnap';
                    case a.Insights:
                      return 'insightsFromSnap';
                    case a.Description:
                      return 'descriptionFromSnap';
                    case a.Warning:
                      return 'warningFromSnap';
                    default:
                      return 'contentFromSnap';
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/snaps/delineator.ts' },
    ],
    [
      6881,
      { './delineator': 6880, './insights': 6882 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./delineator');
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
                var r = e('./insights');
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
      { package: '$root$', file: 'ui/helpers/constants/snaps/index.js' },
    ],
    [
      6882,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.InsightWarningLanguage = void 0);
                n.InsightWarningLanguage = {
                  confirming: { noun: 'transaction', imperative: 'confirm' },
                  signing: { noun: 'signature', imperative: 'sign' },
                };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/snaps/insights.ts' },
    ],
    [
      6883,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SURVEY_START_TIME =
                    n.SURVEY_START_HOUR =
                    n.SURVEY_GMT =
                    n.SURVEY_END_TIME =
                    n.SURVEY_END_HOUR =
                    n.SURVEY_DATE =
                      void 0);
                n.SURVEY_DATE = 'February 28 2024';
                const a = (n.SURVEY_GMT = 'GMT-0600'),
                  r = (n.SURVEY_START_HOUR = '12:00:00'),
                  o = (n.SURVEY_END_HOUR = '13:00:00');
                (n.SURVEY_START_TIME = `${r} ${a}`), (n.SURVEY_END_TIME = `${o} ${a}`);
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/constants/survey.ts' },
    ],
    [
      6886,
      { '../../constants/routes': 6878, 'prop-types': 5082, react: 5328, 'react-router-dom': 5313 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = c);
                var a = s(e('react')),
                  r = s(e('prop-types')),
                  o = e('react-router-dom'),
                  i = e('../../constants/routes');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const l = { pathname: i.ONBOARDING_ROUTE },
                  u = { pathname: i.UNLOCK_ROUTE };
                function c(e) {
                  const { isUnlocked: t, completedOnboarding: n } = e;
                  switch (!0) {
                    case t && n:
                      return a.default.createElement(o.Route, e);
                    case !n:
                      return a.default.createElement(o.Redirect, { to: l });
                    default:
                      return a.default.createElement(o.Redirect, { to: u });
                  }
                }
                c.propTypes = { isUnlocked: r.default.bool, completedOnboarding: r.default.bool };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/helpers/higher-order-components/authenticated/authenticated.component.js',
      },
    ],
    [
      6887,
      { './authenticated.component': 6886, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = e('react-redux'),
                  o = (a = e('./authenticated.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.connect)(e => {
                  const {
                    metamask: { isUnlocked: t, completedOnboarding: n },
                  } = e;
                  return { isUnlocked: t, completedOnboarding: n };
                })(o.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/helpers/higher-order-components/authenticated/authenticated.container.js',
      },
    ],
    [
      6888,
      { './authenticated.container': 6887 },
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
                  r = (a = e('./authenticated.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/helpers/higher-order-components/authenticated/index.js' },
    ],
  ],
  [],
  {}
);
