LavaPack.loadBundle(
  [
    [
      7060,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/lib/swaps-utils': 5846,
        '../../../../shared/modules/swaps.utils': 5879,
        '../../../../shared/types/security-alerts-api': 5884,
        '../../../components/component-library': 6402,
        '../../../components/multichain': 6574,
        '../../../components/multichain/pages/page': 6652,
        '../../../ducks/bridge/actions': 6848,
        '../../../ducks/bridge/selectors': 6850,
        '../../../ducks/bridge/utils': 6851,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/hardware': 6903,
        '../../../hooks/bridge/events/useRequestProperties': 6930,
        '../../../hooks/bridge/useCountdownTimer': 6936,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/bridge/useIsTxSubmittable': 6938,
        '../../../hooks/bridge/useLatestBalance': 6939,
        '../../../hooks/bridge/useTokenAlerts': 6942,
        '../../../hooks/bridge/useTokensWithFiltering': 6943,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '../../swaps/mascot-background-animation/mascot-background-animation': 7554,
        '../hooks/useDestinationAccount': 7040,
        '../hooks/useIsMultichainSwap': 7045,
        '../layout': 7049,
        '../quotes/bridge-quote-card': 7061,
        '../quotes/multichain-bridge-quote-card': 7063,
        '../utils/quote': 7074,
        './bridge-cta-button': 7052,
        './bridge-input-group': 7053,
        './components/destination-account-picker': 7057,
        '@metamask/bridge-controller': 1414,
        'bignumber.js': 4030,
        classnames: 4168,
        'ethereumjs-util': 4393,
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
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = Y(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = X(e('classnames')),
                  s = e('lodash'),
                  i = e('react-router-dom'),
                  l = e('bignumber.js'),
                  c = e('ethereumjs-util'),
                  u = e('@metamask/bridge-controller'),
                  d = e('../../../ducks/bridge/actions'),
                  m = e('../../../ducks/bridge/selectors'),
                  f = e('../../../components/component-library'),
                  p = e('../../../helpers/constants/design-system'),
                  g = e('../../../hooks/useI18nContext'),
                  h = e('../../../hooks/bridge/useTokensWithFiltering'),
                  y = e('../../../store/actions'),
                  v = e('../../../../shared/lib/swaps-utils'),
                  x = e('../utils/quote'),
                  T = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  k = e('../../../hooks/bridge/events/useRequestProperties'),
                  b = e('../../../../shared/constants/metametrics'),
                  E = e('../../../ducks/bridge/utils'),
                  C = e('../../../components/multichain/pages/page'),
                  w = X(e('../../swaps/mascot-background-animation/mascot-background-animation')),
                  _ = e('../layout'),
                  I = X(e('../../../hooks/ramps/useRamps/useRamps')),
                  S = e('../../../ducks/metamask/metamask'),
                  M = X(e('../../../hooks/bridge/useLatestBalance')),
                  P = e('../../../hooks/bridge/useCountdownTimer'),
                  D = e('../../../selectors'),
                  A = e('../../../helpers/utils/hardware'),
                  F = e('../../../../shared/constants/time'),
                  O = e('../../../../shared/constants/bridge'),
                  R = e('../../../ducks/locale/locale'),
                  N = e('../hooks/useIsMultichainSwap'),
                  B = e('../../../hooks/useMultichainSelector'),
                  j = e('../../../selectors/multichain'),
                  G = e('../quotes/multichain-bridge-quote-card'),
                  $ = e('../quotes/bridge-quote-card'),
                  W = e('../../../../shared/types/security-alerts-api'),
                  L = e('../../../hooks/bridge/useTokenAlerts'),
                  q = e('../hooks/useDestinationAccount'),
                  V = e('../../../components/multichain'),
                  U = e('../../../../shared/constants/multichain/networks'),
                  z = e('../../../../shared/modules/swaps.utils'),
                  H = e('../../../hooks/bridge/useIsTxSubmittable'),
                  K = e('./bridge-input-group'),
                  Q = e('./bridge-cta-button'),
                  J = e('./components/destination-account-picker');
                function X(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function Y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (Y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  var e, t, n;
                  const X = (0, a.useDispatch)(),
                    Y = (0, g.useI18nContext)(),
                    Z = (0, N.useIsMultichainSwap)(),
                    ee = (0, a.useSelector)(m.getFromToken),
                    te = (0, a.useSelector)(D.getTokenList),
                    ne = (0, o.useMemo)(() => 0 === Object.keys(te).length, [te]),
                    oe = (0, a.useSelector)(m.getToToken),
                    ae = (0, a.useSelector)(m.getFromChains),
                    re = (0, a.useSelector)(m.getToChains),
                    se = (0, a.useSelector)(m.getFromChain),
                    ie = (0, a.useSelector)(m.getToChain),
                    le = (0, a.useSelector)(m.getFromAmount),
                    ce = (0, a.useSelector)(m.getFromAmountInCurrency),
                    ue = (0, B.useMultichainSelector)(j.getMultichainProviderConfig),
                    de = (0, a.useSelector)(m.getSlippage),
                    me = (0, a.useSelector)(m.getQuoteRequest),
                    {
                      isLoading: fe,
                      activeQuote: pe,
                      isQuoteGoingToRefresh: ge,
                      quotesLastFetchedMs: he,
                    } = (0, a.useSelector)(m.getBridgeQuotes),
                    ye = (0, a.useSelector)(m.getQuoteRefreshRate),
                    ve = (0, a.useSelector)(m.getWasTxDeclined),
                    xe = (0, x.isQuoteExpired)(ge, ye, he),
                    Te = xe && !me.insufficientBal ? undefined : pe,
                    ke = (0, B.useMultichainSelector)(j.getMultichainIsEvm),
                    be = (0, a.useSelector)(D.getSelectedEvmInternalAccount),
                    Ee = (0, a.useSelector)(j.getLastSelectedNonEvmAccount),
                    Ce = (0, B.useMultichainSelector)(D.getSelectedInternalAccount),
                    we = ke ? be : Ce,
                    _e = (0, a.useSelector)(D.getCurrentKeyring),
                    Ie = (0, A.isHardwareKeyring)(_e.type),
                    Se = (0, a.useSelector)(m.getHardwareWalletName),
                    Me = (0, H.useIsTxSubmittable)(),
                    Pe = (0, a.useSelector)(R.getIntlLocale),
                    De = (0, a.useSelector)(S.getNativeCurrency),
                    {
                      isEstimatedReturnLow: Ae,
                      isNoQuotesAvailable: Fe,
                      isInsufficientGasForQuote: Oe,
                      isInsufficientBalance: Re,
                    } = (0, a.useSelector)(m.getValidationErrors),
                    { quotesRefreshCount: Ne } = (0, a.useSelector)(m.getBridgeQuotes),
                    { openBuyCryptoInPdapp: Be } = (0, I.default)(),
                    je = (0, o.useMemo)(
                      () =>
                        null != se && se.chainId
                          ? (0, u.getNativeAssetForChainId)(se.chainId)
                          : null,
                      [null == se ? void 0 : se.chainId]
                    ),
                    Ge = (0, M.default)(je),
                    { tokenAlert: $e } = (0, L.useTokenAlerts)(),
                    We = (0, M.default)(ee),
                    { selectedDestinationAccount: Le, setSelectedDestinationAccount: qe } = (0,
                    q.useDestinationAccount)(Z),
                    { filteredTokenListGenerator: Ve, isLoading: Ue } = (0,
                    h.useTokensWithFiltering)(
                      (null == ie ? void 0 : ie.chainId) ?? (null == se ? void 0 : se.chainId),
                      ee,
                      null !== Le && 'id' in Le ? Le.id : undefined
                    ),
                    { flippedRequestProperties: ze } = (0, k.useRequestProperties)(),
                    He = (0, T.useCrossChainSwapsEventTracker)(),
                    Ke = (0, P.useCountdownTimer)(),
                    [Qe, Je] = (0, o.useState)(!1),
                    [Xe, Ye] = (0, o.useState)(!0);
                  (0, o.useEffect)(() => Ye(!0), [Ne]);
                  const [Ze, et] = (0, o.useState)(!0);
                  (0, o.useEffect)(() => et(!0), [$e]);
                  const [tt, nt] = (0, o.useState)(!0);
                  (0, o.useEffect)(() => nt(!0), [null == oe ? void 0 : oe.address]);
                  const [ot, at] = (0, o.useState)(!1);
                  (0, o.useEffect)(() => {
                    at(!0);
                    const e = setTimeout(() => {
                      at(!1);
                    }, F.SECOND);
                    return () => {
                      clearTimeout(e);
                    };
                  }, [Qe]),
                    (0, o.useEffect)(() => {
                      if (Te) {
                        const {
                          srcAsset: e,
                          destAsset: t,
                          destChainId: n,
                          srcChainId: o,
                        } = Te.quote;
                        e &&
                          t &&
                          n &&
                          (X((0, d.setToChainId)(n)),
                          X(
                            (0, d.setToToken)({
                              ...t,
                              chainId: n,
                              image: e.icon ?? t.iconUrl ?? '',
                              address: t.address,
                            })
                          ),
                          X(
                            (0, d.setFromToken)({
                              ...e,
                              chainId: o,
                              image: e.icon || e.iconUrl || '',
                              address: e.address,
                            })
                          ));
                      } else X((0, d.resetBridgeState)());
                    }, []);
                  const rt = (0, o.useRef)(null),
                    st = (0, o.useRef)(null),
                    it = (0, o.useRef)(null);
                  (0, o.useEffect)(() => {
                    var e, t;
                    Oe(Ge) &&
                      (null === (e = rt.current) ||
                        void 0 === e ||
                        e.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                    Ae &&
                      (null === (t = st.current) ||
                        void 0 === t ||
                        t.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                  }, [Ae, Oe(Ge), Xe]);
                  const lt = (0, a.useSelector)(m.getIsToOrFromSolana),
                    ct = (0, o.useMemo)(
                      () => !(null == ie || !ie.chainId) && (0, u.isSolanaChainId)(ie.chainId),
                      [null == ie ? void 0 : ie.chainId]
                    ),
                    ut = (0, o.useMemo)(() => {
                      var e;
                      return {
                        srcTokenAddress: null == ee ? void 0 : ee.address,
                        destTokenAddress: null == oe ? void 0 : oe.address,
                        srcTokenAmount:
                          le && null != ee && ee.decimals
                            ? (0, v.calcTokenValue)(['', '.'].includes(le) ? '0' : le, ee.decimals)
                                .toFixed()
                                .split('.')[0]
                            : undefined,
                        srcChainId: null == se ? void 0 : se.chainId,
                        destChainId: null == ie ? void 0 : ie.chainId,
                        insufficientBal:
                          !(
                            null == ue ||
                            null === (e = ue.rpcUrl) ||
                            void 0 === e ||
                            !e.includes('localhost')
                          ) || undefined,
                        slippage: de,
                        walletAddress: (null == we ? void 0 : we.address) ?? '',
                        destWalletAddress: null == Le ? void 0 : Le.address,
                      };
                    }, [
                      null == ee ? void 0 : ee.address,
                      null == ee ? void 0 : ee.decimals,
                      null == oe ? void 0 : oe.address,
                      le,
                      null == se ? void 0 : se.chainId,
                      null == ie ? void 0 : ie.chainId,
                      de,
                      null == we ? void 0 : we.address,
                      null == Le ? void 0 : Le.address,
                      null == ue ? void 0 : ue.rpcUrl,
                    ]),
                    dt = (0, o.useCallback)(
                      (0, s.debounce)(e => {
                        X((0, d.updateQuoteRequestParams)(e));
                      }, 300),
                      []
                    );
                  (0, o.useEffect)(() => {
                    X((0, d.setSelectedQuote)(null)), dt(ut);
                  }, [ut, dt]);
                  const mt = (0, o.useCallback)(e => {
                      He({ event: b.MetaMetricsEventName.InputChanged, properties: e });
                    }, []),
                    { search: ft } = (0, i.useLocation)(),
                    pt = (0, i.useHistory)();
                  (0, o.useEffect)(() => {
                    if (null == se || !se.chainId || ne) return;
                    const e = new URLSearchParams(ft),
                      t = e.get('token');
                    if (!t) return;
                    const n = () => {
                        const t = new URLSearchParams(e);
                        t.delete('token'), pt.replace({ search: t.toString() });
                      },
                      o = te[t.toLowerCase()];
                    switch (t) {
                      case null == ee ? void 0 : ee.address:
                        n();
                        break;
                      case null == o ? void 0 : o.address:
                      case null != o && o.address ? (0, c.toChecksumAddress)(o.address) : undefined:
                        X((0, d.setFromToken)({ ...o, image: o.iconUrl, chainId: se.chainId })),
                          n();
                        break;
                      default:
                        n();
                    }
                  }, [se, ee, te, ft, ne]),
                    (0, o.useEffect)(() => {
                      Z &&
                        (X((0, d.setSlippage)(undefined)),
                        se &&
                          !oe &&
                          (X((0, d.setToChainId)(se.chainId)),
                          X((0, d.setToToken)(O.SOLANA_USDC_ASSET))));
                    }, []);
                  const gt = Number((null == oe ? void 0 : oe.occurrences) ?? 0),
                    ht =
                      (null == oe ? void 0 : oe.address) &&
                      !(0, z.isSwapsDefaultTokenAddress)(
                        null == oe ? void 0 : oe.address,
                        null == ie ? void 0 : ie.chainId
                      ),
                    yt = (0, a.useSelector)(m.isBridgeSolanaEnabled),
                    [vt, xt] = (0, o.useState)(!1),
                    [Tt, kt] = (0, o.useState)(null),
                    [bt, Et] = (0, o.useState)(0);
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      _.Column,
                      { className: 'prepare-bridge-page', gap: 8 },
                      o.default.createElement(K.BridgeInputGroup, {
                        header: Y(Z ? 'swapSwapFrom' : 'bridgeFrom'),
                        token: ee,
                        onAmountChange: e => {
                          X((0, d.setFromTokenInputValue)(e));
                        },
                        onAssetChange: e => {
                          const t = { ...e, address: e.address ?? (0, c.zeroAddress)() };
                          X((0, d.setFromToken)(t)),
                            X((0, d.setFromTokenInputValue)(null)),
                            e.address === (null == oe ? void 0 : oe.address) &&
                              X((0, d.setToToken)(null)),
                            t.address && mt({ input: 'token_source', value: t.address });
                        },
                        networkProps: {
                          network: se,
                          networks: Z ? undefined : ae,
                          onNetworkChange: e => {
                            (null == e ? void 0 : e.chainId) &&
                              e.chainId !== (null == se ? void 0 : se.chainId) &&
                              mt({ input: 'chain_source', value: e.chainId }),
                              null != e &&
                                e.chainId &&
                                e.chainId === (null == ie ? void 0 : ie.chainId) &&
                                (X((0, d.setToChainId)(null)), X((0, d.setToToken)(null))),
                              (0, u.isSolanaChainId)(e.chainId) && Ee
                                ? X((0, y.setSelectedAccount)(Ee.address))
                                : (0, E.isNetworkAdded)(e) &&
                                  (X((0, y.setSelectedAccount)(be.address)),
                                  X(
                                    (0, y.setActiveNetworkWithError)(
                                      e.rpcEndpoints[e.defaultRpcEndpointIndex].networkClientId ||
                                        e.chainId
                                    )
                                  )),
                              X((0, d.setFromToken)(null)),
                              X((0, d.setFromTokenInputValue)(null));
                          },
                          header: Y('yourNetworks'),
                        },
                        isMultiselectEnabled: !Z,
                        onMaxButtonClick: e => {
                          X((0, d.setFromTokenInputValue)(e));
                        },
                        amountInFiat: ce.valueInCurrency,
                        amountFieldProps: {
                          testId: 'from-amount',
                          autoFocus: !0,
                          value: le || undefined,
                        },
                        isTokenListLoading: ne,
                        buttonProps: { testId: 'bridge-source-button' },
                        onBlockExplorerClick: e => {
                          kt(e), xt(!0), Et(e => e + 1);
                        },
                      }),
                      o.default.createElement(
                        _.Column,
                        {
                          height: p.BlockSize.Full,
                          paddingTop: 8,
                          backgroundColor: p.BackgroundColor.backgroundAlternativeSoft,
                          style: { position: 'relative' },
                        },
                        o.default.createElement(
                          f.Box,
                          {
                            className: 'prepare-bridge-page__switch-tokens',
                            display: p.Display.Flex,
                            backgroundColor: p.BackgroundColor.backgroundAlternativeSoft,
                            style: {
                              position: 'absolute',
                              top: 'calc(-20px + 1px)',
                              right: 'calc(50% - 20px)',
                              border: '2px solid var(--color-background-default)',
                              borderRadius: '100%',
                              opacity: 1,
                              width: 40,
                              height: 40,
                              justifyContent: p.JustifyContent.center,
                            },
                          },
                          o.default.createElement(f.ButtonIcon, {
                            iconProps: { className: (0, r.default)({ rotate: Qe }) },
                            style: {
                              alignSelf: 'center',
                              borderRadius: '100%',
                              width: '100%',
                              height: '100%',
                            },
                            'data-testid': 'switch-tokens',
                            ariaLabel: 'switch-tokens',
                            iconName: f.IconName.Arrow2Down,
                            color: p.IconColor.iconAlternativeSoft,
                            disabled:
                              ot ||
                              !(0, u.isValidQuoteRequest)(me, !1) ||
                              (!Z && !(0, E.isNetworkAdded)(ie)),
                            onClick: () => {
                              if (Z || (0, E.isNetworkAdded)(ie)) {
                                if (
                                  (Je(!Qe),
                                  ze &&
                                    He({
                                      event: b.MetaMetricsEventName.InputSourceDestinationFlipped,
                                      properties: ze,
                                    }),
                                  !Z)
                                ) {
                                  const e =
                                    (null == ie ? void 0 : ie.defaultRpcEndpointIndex) !==
                                      undefined &&
                                    null != ie &&
                                    ie.rpcEndpoints &&
                                    (0, E.isNetworkAdded)(ie)
                                      ? ie.rpcEndpoints[ie.defaultRpcEndpointIndex].networkClientId
                                      : undefined;
                                  null != ie &&
                                  ie.chainId &&
                                  (0, u.formatChainIdToCaip)(ie.chainId) ===
                                    U.MultichainNetworks.SOLANA &&
                                  Ee
                                    ? X((0, y.setSelectedAccount)(Ee.address))
                                    : X((0, y.setSelectedAccount)(be.address)),
                                    e && X((0, y.setActiveNetwork)(e)),
                                    (null == se ? void 0 : se.chainId) &&
                                      X((0, d.setToChainId)(se.chainId));
                                }
                                X((0, d.setFromToken)(oe)), X((0, d.setToToken)(ee));
                              }
                            },
                          })
                        ),
                        o.default.createElement(K.BridgeInputGroup, {
                          header: Y('swapSelectToken'),
                          token: oe,
                          onAssetChange: e => {
                            const t = { ...e, address: e.address ?? (0, c.zeroAddress)() };
                            t.address && mt({ input: 'token_destination', value: t.address }),
                              X((0, d.setToToken)(t));
                          },
                          networkProps: Z
                            ? undefined
                            : {
                                network: ie,
                                networks: re,
                                onNetworkChange: e => {
                                  e.chainId !== (null == ie ? void 0 : ie.chainId) &&
                                    mt({ input: 'chain_destination', value: e.chainId }),
                                    X((0, d.setToChainId)(e.chainId)),
                                    X((0, d.setToToken)(null));
                                },
                                header: Y(Z ? 'swapSwapTo' : 'bridgeTo'),
                                shouldDisableNetwork: ({ chainId: e }) =>
                                  e === (null == se ? void 0 : se.chainId),
                              },
                          customTokenListGenerator: ie || Z ? Ve : undefined,
                          amountInFiat:
                            (null == Te || null === (e = Te.toTokenAmount) || void 0 === e
                              ? void 0
                              : e.valueInCurrency) || undefined,
                          amountFieldProps: {
                            testId: 'to-amount',
                            readOnly: !0,
                            disabled: !0,
                            value:
                              null != Te &&
                              null !== (t = Te.toTokenAmount) &&
                              void 0 !== t &&
                              t.amount
                                ? (0, x.formatTokenAmount)(Pe, Te.toTokenAmount.amount)
                                : '0',
                            autoFocus: !1,
                            className:
                              null != Te &&
                              null !== (n = Te.toTokenAmount) &&
                              void 0 !== n &&
                              n.amount
                                ? 'amount-input defined'
                                : 'amount-input',
                          },
                          isTokenListLoading: Ue,
                          buttonProps: { testId: 'bridge-destination-button' },
                          onBlockExplorerClick: e => {
                            kt(e), xt(!0), Et(e => e + 1);
                          },
                        }),
                        yt &&
                          lt &&
                          o.default.createElement(
                            f.Box,
                            { padding: 6, paddingBottom: 3, paddingTop: 3 },
                            o.default.createElement(J.DestinationAccountPicker, {
                              onAccountSelect: qe,
                              selectedSwapToAccount: Le,
                              isDestinationSolana: ct,
                            })
                          ),
                        o.default.createElement(
                          _.Column,
                          { height: p.BlockSize.Full, justifyContent: p.JustifyContent.center },
                          fe && !Te
                            ? o.default.createElement(
                                o.default.Fragment,
                                null,
                                o.default.createElement(
                                  f.Text,
                                  {
                                    textAlign: p.TextAlign.Center,
                                    color: p.TextColor.textAlternativeSoft,
                                  },
                                  Y('swapFetchingQuotes')
                                ),
                                o.default.createElement(w.default, { height: '64', width: '64' })
                              )
                            : null
                        ),
                        o.default.createElement(
                          _.Row,
                          { padding: 6, paddingTop: Te ? 0 : 6 },
                          o.default.createElement(
                            _.Column,
                            {
                              gap: 3,
                              className: Te ? 'highlight' : '',
                              style: {
                                paddingBottom: null != Te && Te.approval ? 16 : 'revert-layer',
                                paddingTop: null != Te && Te.approval ? 16 : undefined,
                                paddingInline: 16,
                                position: 'relative',
                                overflow: 'hidden',
                                ...(Te && !ve && yt
                                  ? {
                                      boxShadow:
                                        'var(--shadow-size-sm) var(--color-shadow-default)',
                                      backgroundColor: 'var(--color-background-default)',
                                      borderRadius: 8,
                                    }
                                  : {}),
                              },
                            },
                            Te &&
                              ge &&
                              o.default.createElement(_.Row, {
                                style: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  width: `calc(100% * (${ye} - ${Ke}) / ${ye})`,
                                  height: 4,
                                  maxWidth: '100%',
                                  transition: 'width 1s linear',
                                },
                                backgroundColor: p.BackgroundColor.primaryMuted,
                              }),
                            !ve &&
                              Te &&
                              (yt
                                ? o.default.createElement(G.MultichainBridgeQuoteCard, null)
                                : o.default.createElement($.BridgeQuoteCard, null)),
                            o.default.createElement(
                              C.Footer,
                              { padding: 0, flexDirection: p.FlexDirection.Column, gap: 2 },
                              o.default.createElement(Q.BridgeCTAButton, {
                                onFetchNewQuotes: () => {
                                  dt(ut);
                                },
                                needsDestinationAddress: yt && lt && !Le,
                              }),
                              null != Te && Te.approval && le && ee
                                ? o.default.createElement(
                                    _.Row,
                                    { justifyContent: p.JustifyContent.center, gap: 1 },
                                    o.default.createElement(
                                      f.Text,
                                      {
                                        color: p.TextColor.textAlternativeSoft,
                                        variant: p.TextVariant.bodyXs,
                                        textAlign: p.TextAlign.Center,
                                      },
                                      Ie
                                        ? Y('willApproveAmountForBridgingHardware')
                                        : Y('willApproveAmountForBridging', [
                                            (0, x.formatTokenAmount)(
                                              Pe,
                                              new l.BigNumber(le),
                                              ee.symbol
                                            ),
                                          ])
                                    ),
                                    le &&
                                      o.default.createElement(
                                        _.Tooltip,
                                        {
                                          display: p.Display.InlineBlock,
                                          position: f.PopoverPosition.Top,
                                          offset: [-48, 8],
                                          title: Y('grantExactAccess'),
                                        },
                                        Y(
                                          Ie
                                            ? 'bridgeApprovalWarningForHardware'
                                            : 'bridgeApprovalWarning',
                                          [le, ee.symbol]
                                        )
                                      )
                                  )
                                : null
                            )
                          )
                        ),
                        Ie &&
                          Me &&
                          Se &&
                          Te &&
                          o.default.createElement(
                            f.BannerAlert,
                            {
                              marginInline: 4,
                              marginBottom: 3,
                              title: Y('hardwareWalletSubmissionWarningTitle'),
                              textAlign: p.TextAlign.Left,
                            },
                            o.default.createElement(
                              'ul',
                              { style: { listStyle: 'disc' } },
                              o.default.createElement(
                                'li',
                                null,
                                o.default.createElement(
                                  f.Text,
                                  { variant: p.TextVariant.bodyMd },
                                  Y('hardwareWalletSubmissionWarningStep1', [Se])
                                )
                              ),
                              o.default.createElement(
                                'li',
                                null,
                                o.default.createElement(
                                  f.Text,
                                  { variant: p.TextVariant.bodyMd },
                                  Y('hardwareWalletSubmissionWarningStep2', [Se])
                                )
                              )
                            )
                          ),
                        Fe &&
                          !xe &&
                          o.default.createElement(f.BannerAlert, {
                            marginInline: 4,
                            marginBottom: 10,
                            severity: f.BannerAlertSeverity.Danger,
                            description: Y('noOptionsAvailableMessage'),
                            textAlign: p.TextAlign.Left,
                          }),
                        tt &&
                          ke &&
                          oe &&
                          ht &&
                          gt < 2 &&
                          o.default.createElement(f.BannerAlert, {
                            severity: f.BannerAlertSeverity.Warning,
                            title: Y('bridgeTokenCannotVerifyTitle'),
                            description: Y('bridgeTokenCannotVerifyDescription'),
                            marginInline: 4,
                            marginBottom: 3,
                            textAlign: p.TextAlign.Left,
                            onClose: () => nt(!1),
                          }),
                        $e &&
                          Ze &&
                          o.default.createElement(f.BannerAlert, {
                            ref: it,
                            marginInline: 4,
                            marginBottom: 3,
                            title: $e.titleId ? Y($e.titleId) : '',
                            severity:
                              $e.type === W.TokenFeatureType.MALICIOUS
                                ? f.BannerAlertSeverity.Danger
                                : f.BannerAlertSeverity.Warning,
                            description: $e.descriptionId ? Y($e.descriptionId) : $e.description,
                            textAlign: p.TextAlign.Left,
                            onClose: () => et(!1),
                          }),
                        !fe &&
                          Te &&
                          !Re(We) &&
                          Oe(Ge) &&
                          o.default.createElement(f.BannerAlert, {
                            ref: st,
                            marginInline: 4,
                            marginBottom: 3,
                            title: Y('bridgeValidationInsufficientGasTitle', [De]),
                            severity: f.BannerAlertSeverity.Danger,
                            description: Y('bridgeValidationInsufficientGasMessage', [De]),
                            textAlign: p.TextAlign.Left,
                            actionButtonLabel: Y('buyMoreAsset', [De]),
                            actionButtonOnClick: () => Be(),
                          }),
                        Ae &&
                          Xe &&
                          Te &&
                          o.default.createElement(f.BannerAlert, {
                            ref: rt,
                            marginInline: 4,
                            marginBottom: 3,
                            title: Y('lowEstimatedReturnTooltipTitle'),
                            severity: f.BannerAlertSeverity.Warning,
                            description: Y('lowEstimatedReturnTooltipMessage', [
                              100 * u.BRIDGE_QUOTE_MAX_RETURN_DIFFERENCE_PERCENTAGE,
                            ]),
                            textAlign: p.TextAlign.Left,
                            onClose: () => Ye(!1),
                          })
                      )
                    ),
                    vt &&
                      Tt &&
                      o.default.createElement(
                        'div',
                        {
                          style: {
                            position: 'absolute',
                            bottom: 50,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1e3,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                          },
                        },
                        o.default.createElement(
                          V.ToastContainer,
                          null,
                          o.default.createElement(V.Toast, {
                            key: bt,
                            text: Y('bridgeBlockExplorerLinkCopied'),
                            onClose: () => xt(!1),
                            autoHideTime: 2500,
                            startAdornment: o.default.createElement(f.AvatarFavicon, {
                              name: Tt.symbol,
                              size: f.AvatarFaviconSize.Sm,
                              src: Tt.image,
                            }),
                          })
                        )
                      )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/prepare/prepare-bridge-page.tsx' },
    ],
    [
      7061,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/terms': 5816,
        '../../../components/component-library': 6402,
        '../../../ducks/bridge/selectors': 6850,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/bridge/events/useQuoteProperties': 6928,
        '../../../hooks/bridge/events/useRequestMetadataProperties': 6929,
        '../../../hooks/bridge/events/useRequestProperties': 6930,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/multichain': 7605,
        '../layout': 7049,
        '../utils/quote': 7074,
        './bridge-quotes-modal': 7062,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.BridgeQuoteCard = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/bridge-controller'),
                  s = e('../../../components/component-library'),
                  i = e('../../../ducks/bridge/selectors'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../utils/quote'),
                  u = e('../../../ducks/metamask/metamask'),
                  d = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  m = e('../../../hooks/bridge/events/useRequestProperties'),
                  f = e('../../../hooks/bridge/events/useRequestMetadataProperties'),
                  p = e('../../../hooks/bridge/events/useQuoteProperties'),
                  g = e('../../../../shared/constants/metametrics'),
                  h = e('../../../helpers/constants/design-system'),
                  y = e('../layout'),
                  v = e('../../../../shared/constants/bridge'),
                  x = e('../../../../shared/constants/terms'),
                  T = e('../../../ducks/locale/locale'),
                  k = e('../../../selectors/multichain'),
                  b = e('./bridge-quotes-modal');
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.BridgeQuoteCard = () => {
                  var e, t, n, E;
                  const C = (0, l.useI18nContext)(),
                    { activeQuote: w } = (0, a.useSelector)(i.getBridgeQuotes),
                    _ = (0, a.useSelector)(u.getCurrentCurrency),
                    I = (0, a.useSelector)(u.getNativeCurrency),
                    { isEstimatedReturnLow: S } = (0, a.useSelector)(i.getValidationErrors),
                    M = (0, d.useCrossChainSwapsEventTracker)(),
                    { quoteRequestProperties: P } = (0, m.useRequestProperties)(),
                    D = (0, f.useRequestMetadataProperties)(),
                    A = (0, p.useQuoteProperties)(),
                    F = (0, a.useSelector)(i.getFromChain),
                    O = (0, a.useSelector)(i.getToChain),
                    R = (0, a.useSelector)(T.getIntlLocale),
                    [N, B] = (0, o.useState)(!1),
                    [j, G] = (0, o.useState)(!1);
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(b.BridgeQuotesModal, {
                      isOpen: N,
                      onClose: () => B(!1),
                    }),
                    w
                      ? o.default.createElement(
                          y.Column,
                          { gap: 3 },
                          o.default.createElement(
                            y.Row,
                            { justifyContent: h.JustifyContent.spaceBetween },
                            o.default.createElement(
                              y.Row,
                              {
                                gap: 1,
                                justifyContent: h.JustifyContent.flexStart,
                                style: { whiteSpace: 'nowrap' },
                              },
                              o.default.createElement(
                                s.Text,
                                { variant: h.TextVariant.bodyLgMedium },
                                C('bestPrice')
                              ),
                              o.default.createElement(
                                y.Tooltip,
                                {
                                  title: C('howQuotesWork'),
                                  position: s.PopoverPosition.TopStart,
                                  offset: [-16, 16],
                                  iconName: s.IconName.Question,
                                },
                                C('howQuotesWorkExplanation', [r.BRIDGE_MM_FEE_RATE])
                              )
                            ),
                            o.default.createElement(
                              y.Column,
                              { height: h.BlockSize.Full, alignItems: h.AlignItems.flexEnd },
                              o.default.createElement(
                                s.Text,
                                {
                                  as: 'a',
                                  variant: h.TextVariant.bodyMd,
                                  color: h.TextColor.primaryDefault,
                                  onClick: () => {
                                    P &&
                                      D &&
                                      A &&
                                      M({
                                        event: g.MetaMetricsEventName.AllQuotesOpened,
                                        properties: { ...P, ...D, ...A },
                                      }),
                                      B(!0);
                                  },
                                },
                                C('moreQuotes')
                              )
                            )
                          ),
                          o.default.createElement(
                            y.Column,
                            { gap: 1 },
                            o.default.createElement(
                              y.Row,
                              null,
                              o.default.createElement(
                                s.Text,
                                {
                                  variant: h.TextVariant.bodyMdMedium,
                                  color: h.TextColor.textAlternativeSoft,
                                },
                                C('bridging')
                              ),
                              o.default.createElement(
                                y.Row,
                                { gap: 1 },
                                o.default.createElement(s.AvatarNetwork, {
                                  name: (null == F ? void 0 : F.name) ?? '',
                                  src:
                                    null != F && F.chainId
                                      ? (0, k.getImageForChainId)(F.chainId)
                                      : undefined,
                                  size: s.AvatarNetworkSize.Xs,
                                  backgroundColor: h.BackgroundColor.transparent,
                                }),
                                o.default.createElement(
                                  s.Text,
                                  { style: { whiteSpace: 'nowrap' } },
                                  null != F && F.chainId
                                    ? v.NETWORK_TO_SHORT_NETWORK_NAME_MAP[F.chainId]
                                    : null == F
                                      ? void 0
                                      : F.name
                                ),
                                o.default.createElement(s.Icon, {
                                  name: s.IconName.Arrow2Right,
                                  size: s.IconSize.Xs,
                                }),
                                o.default.createElement(s.AvatarNetwork, {
                                  name: (null == O ? void 0 : O.name) ?? '',
                                  src:
                                    null != O && O.chainId
                                      ? (0, k.getImageForChainId)(O.chainId)
                                      : undefined,
                                  size: s.AvatarNetworkSize.Xs,
                                  backgroundColor: h.BackgroundColor.transparent,
                                }),
                                o.default.createElement(
                                  s.Text,
                                  { style: { whiteSpace: 'nowrap' } },
                                  null != O && O.chainId
                                    ? v.NETWORK_TO_SHORT_NETWORK_NAME_MAP[O.chainId]
                                    : null == O
                                      ? void 0
                                      : O.name
                                )
                              )
                            ),
                            o.default.createElement(
                              y.Row,
                              {
                                className: 'row-with-warning',
                                backgroundColor: S ? h.BackgroundColor.warningMuted : undefined,
                              },
                              o.default.createElement(
                                s.Text,
                                {
                                  style: { whiteSpace: 'nowrap' },
                                  variant: h.TextVariant.bodyMdMedium,
                                  color: S
                                    ? h.TextColor.warningDefault
                                    : h.TextColor.textAlternativeSoft,
                                },
                                C('networkFee')
                              ),
                              o.default.createElement(
                                y.Row,
                                { gap: 1 },
                                o.default.createElement(
                                  y.Tooltip,
                                  {
                                    position: s.PopoverPosition.TopStart,
                                    offset: [-16, 16],
                                    iconName: s.IconName.Question,
                                    triggerElement: o.default.createElement(
                                      s.Text,
                                      {
                                        style: {
                                          whiteSpace: 'nowrap',
                                          overflow: 'visible',
                                          textDecoration: 'underline',
                                          cursor: 'pointer',
                                        },
                                        color: S ? h.TextColor.warningDefault : undefined,
                                      },
                                      j
                                        ? `${null != w && null !== (e = w.totalNetworkFee) && void 0 !== e && e.valueInCurrency ? (0, c.formatTokenAmount)(R, null == w || null === (t = w.totalNetworkFee) || void 0 === t ? void 0 : t.amount, I) : undefined}`
                                        : `${(0, c.formatCurrencyAmount)(null == w || null === (n = w.totalNetworkFee) || void 0 === n ? void 0 : n.valueInCurrency, _, 2) ?? (0, c.formatTokenAmount)(R, null == w || null === (E = w.totalNetworkFee) || void 0 === E ? void 0 : E.amount, I)}`
                                    ),
                                  },
                                  C('howNetworkFeesWorkExplanation', [
                                    j
                                      ? (0, c.formatTokenAmount)(
                                          R,
                                          null == w ? void 0 : w.totalMaxNetworkFee.amount,
                                          I
                                        )
                                      : (0, c.formatCurrencyAmount)(
                                          null == w ? void 0 : w.totalMaxNetworkFee.valueInCurrency,
                                          _,
                                          2
                                        ),
                                  ])
                                ),
                                o.default.createElement(s.Icon, {
                                  style: { cursor: 'pointer' },
                                  color: S
                                    ? h.IconColor.warningDefault
                                    : h.IconColor.iconAlternativeSoft,
                                  name: s.IconName.SwapVertical,
                                  size: s.IconSize.Md,
                                  onClick: () => G(!j),
                                })
                              )
                            ),
                            o.default.createElement(
                              y.Row,
                              null,
                              o.default.createElement(
                                s.Text,
                                {
                                  variant: h.TextVariant.bodyMdMedium,
                                  color: h.TextColor.textAlternativeSoft,
                                },
                                C('time')
                              ),
                              o.default.createElement(
                                s.Text,
                                null,
                                C('bridgeTimingMinutes', [
                                  (0, c.formatEtaInMinutes)(w.estimatedProcessingTimeInSeconds),
                                ])
                              )
                            ),
                            o.default.createElement(
                              y.Row,
                              { justifyContent: h.JustifyContent.flexStart, gap: 2 },
                              o.default.createElement(
                                s.Text,
                                {
                                  variant: h.TextVariant.bodyMd,
                                  color: h.TextColor.textAlternativeSoft,
                                },
                                C('rateIncludesMMFee', [r.BRIDGE_MM_FEE_RATE])
                              ),
                              o.default.createElement(
                                s.Text,
                                { color: h.TextColor.textAlternativeSoft },
                                C('bulletpoint')
                              ),
                              o.default.createElement(
                                s.ButtonLink,
                                {
                                  variant: h.TextVariant.bodyMd,
                                  color: h.TextColor.textAlternativeSoft,
                                  href: x.TERMS_OF_USE_LINK,
                                  externalLink: !0,
                                  style: { textDecoration: 'underline' },
                                },
                                C('bridgeTerms')
                              )
                            )
                          )
                        )
                      : null
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/quotes/bridge-quote-card.tsx' },
    ],
    [
      7062,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../ducks/bridge/actions': 6848,
        '../../../ducks/bridge/selectors': 6850,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/bridge/events/useQuoteProperties': 6928,
        '../../../hooks/bridge/events/useRequestMetadataProperties': 6929,
        '../../../hooks/bridge/events/useRequestProperties': 6930,
        '../../../hooks/bridge/events/useTradeProperties': 6931,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors/multichain': 7605,
        '../layout': 7049,
        '../utils/quote': 7074,
        '@metamask/bridge-controller': 1414,
        '@metamask/snaps-sdk/jsx': 2862,
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
                  (n.BridgeQuotesModal = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('@metamask/snaps-sdk/jsx'),
                  s = e('react-redux'),
                  i = e('lodash'),
                  l = e('@metamask/bridge-controller'),
                  c = e('../../../components/component-library'),
                  u = e('../../../helpers/constants/design-system'),
                  d = e('../utils/quote'),
                  m = e('../../../hooks/useI18nContext'),
                  f = e('../../../ducks/bridge/actions'),
                  p = e('../../../ducks/bridge/selectors'),
                  g = e('../layout'),
                  h = e('../../../ducks/metamask/metamask'),
                  y = e('../../../hooks/bridge/events/useQuoteProperties'),
                  v = e('../../../hooks/bridge/events/useRequestMetadataProperties'),
                  x = e('../../../hooks/bridge/events/useRequestProperties'),
                  T = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  k = e('../../../../shared/constants/metametrics'),
                  b = e('../../../hooks/bridge/events/useTradeProperties'),
                  E = e('../../../ducks/locale/locale'),
                  C = e('../../../selectors/multichain'),
                  w = e('../../../hooks/useMultichainSelector');
                function _() {
                  return (
                    (_ = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
                          }
                          return e;
                        }),
                    _.apply(null, arguments)
                  );
                }
                n.BridgeQuotesModal = ({ onClose: e, ...t }) => {
                  const n = (0, m.useI18nContext)(),
                    o = (0, s.useDispatch)(),
                    {
                      sortedQuotes: I,
                      activeQuote: S,
                      recommendedQuote: M,
                    } = (0, s.useSelector)(p.getBridgeQuotes),
                    P = (0, s.useSelector)(p.getBridgeSortOrder),
                    D = (0, s.useSelector)(h.getCurrentCurrency),
                    A = (0, w.useMultichainSelector)(C.getMultichainNativeCurrency),
                    F = (0, s.useSelector)(E.getIntlLocale),
                    O = (0, T.useCrossChainSwapsEventTracker)(),
                    { quoteRequestProperties: R } = (0, x.useRequestProperties)(),
                    N = (0, v.useRequestMetadataProperties)(),
                    B = (0, y.useQuoteProperties)(),
                    j = (0, b.useTradeProperties)();
                  return a.default.createElement(
                    c.Modal,
                    _({ className: 'quotes-modal', onClose: e }, t),
                    a.default.createElement(c.ModalOverlay, null),
                    a.default.createElement(
                      c.ModalContent,
                      { modalDialogProps: { padding: 0 } },
                      a.default.createElement(
                        c.ModalHeader,
                        { onBack: e },
                        a.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.headingSm, textAlign: u.TextAlign.Center },
                          n('swapSelectAQuote')
                        )
                      ),
                      a.default.createElement(
                        g.Row,
                        { paddingTop: 3, paddingBottom: 1, paddingInline: 4 },
                        [
                          [l.SortOrder.COST_ASC, n('bridgeNetCost'), r.IconName.Arrow2Up],
                          [l.SortOrder.ETA_ASC, n('time'), r.IconName.Arrow2Down],
                        ].map(([e, t, n]) =>
                          a.default.createElement(
                            c.ButtonLink,
                            {
                              key: t,
                              onClick: () => {
                                R &&
                                  N &&
                                  B &&
                                  O({
                                    event: k.MetaMetricsEventName.AllQuotesSorted,
                                    properties: { ...R, ...N, ...B, sort_order: P },
                                  }),
                                  o((0, f.setSortOrder)(e));
                              },
                              startIconName: P === e && P === l.SortOrder.ETA_ASC ? n : undefined,
                              startIconProps: { size: c.IconSize.Xs },
                              endIconName: P === e && P === l.SortOrder.COST_ASC ? n : undefined,
                              endIconProps: { size: c.IconSize.Xs },
                              color:
                                P === e
                                  ? u.TextColor.primaryDefault
                                  : u.TextColor.textAlternativeSoft,
                            },
                            a.default.createElement(
                              c.Text,
                              {
                                variant:
                                  P === e ? u.TextVariant.bodySmMedium : u.TextVariant.bodySm,
                                color:
                                  P === e
                                    ? u.TextColor.primaryDefault
                                    : u.TextColor.textAlternativeSoft,
                              },
                              t
                            )
                          )
                        )
                      ),
                      a.default.createElement(
                        g.Column,
                        { style: { overflow: 'scroll' } },
                        I.map((t, r) => {
                          const {
                              totalNetworkFee: s,
                              estimatedProcessingTimeInSeconds: l,
                              toTokenAmount: m,
                              cost: p,
                              sentAmount: h,
                              quote: { destAsset: y, bridges: v, requestId: x },
                            } = t,
                            T = x === (null == S ? void 0 : S.quote.requestId),
                            b = x === (null == M ? void 0 : M.quote.requestId);
                          return a.default.createElement(
                            g.Row,
                            {
                              alignItems: u.AlignItems.flexStart,
                              key: r,
                              backgroundColor: T ? u.BackgroundColor.primaryMuted : undefined,
                              onClick: () => {
                                o((0, f.setSelectedQuote)(t)),
                                  R &&
                                    N &&
                                    B &&
                                    j &&
                                    O({
                                      event: k.MetaMetricsEventName.QuoteSelected,
                                      properties: { ...R, ...N, ...B, ...j, is_best_quote: b },
                                    }),
                                  e();
                              },
                              paddingInline: 4,
                              paddingTop: 3,
                              paddingBottom: 3,
                              style: { position: 'relative' },
                            },
                            T &&
                              a.default.createElement(g.Column, {
                                style: {
                                  position: 'absolute',
                                  left: 4,
                                  top: 4,
                                  height: 'calc(100% - 8px)',
                                  width: 4,
                                  borderRadius: 8,
                                },
                                backgroundColor: u.BackgroundColor.primaryDefault,
                              }),
                            a.default.createElement(
                              g.Column,
                              null,
                              a.default.createElement(
                                c.Text,
                                { variant: u.TextVariant.bodyMd },
                                p.valueInCurrency &&
                                  (0, d.formatCurrencyAmount)(p.valueInCurrency, D, 0)
                              ),
                              [
                                null != s && s.valueInCurrency && null != h && h.valueInCurrency
                                  ? n('quotedTotalCost', [
                                      (0, d.formatCurrencyAmount)(
                                        s.valueInCurrency.plus(h.valueInCurrency),
                                        D,
                                        0
                                      ),
                                    ])
                                  : n('quotedTotalCost', [
                                      (0, d.formatTokenAmount)(F, s.amount, A),
                                    ]),
                                n('quotedReceiveAmount', [
                                  (0, d.formatCurrencyAmount)(m.valueInCurrency, D, 0) ??
                                    (0, d.formatTokenAmount)(F, m.amount, y.symbol),
                                ]),
                              ].map(e =>
                                a.default.createElement(
                                  c.Text,
                                  {
                                    key: e,
                                    variant: u.TextVariant.bodyXsMedium,
                                    color: u.TextColor.textAlternative,
                                  },
                                  e
                                )
                              )
                            ),
                            a.default.createElement(
                              g.Column,
                              { alignItems: u.AlignItems.flexEnd },
                              a.default.createElement(
                                c.Text,
                                { variant: u.TextVariant.bodyMd },
                                n('bridgeTimingMinutes', [(0, d.formatEtaInMinutes)(l)])
                              ),
                              a.default.createElement(
                                c.Text,
                                {
                                  variant: u.TextVariant.bodyXsMedium,
                                  color: u.TextColor.textAlternative,
                                },
                                (0, i.startCase)(v[0])
                              )
                            )
                          );
                        })
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/quotes/bridge-quotes-modal.tsx' },
    ],
    [
      7063,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/network': 5804,
        '../../../components/component-library': 6402,
        '../../../ducks/bridge/selectors': 6850,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/bridge/events/useQuoteProperties': 6928,
        '../../../hooks/bridge/events/useRequestMetadataProperties': 6929,
        '../../../hooks/bridge/events/useRequestProperties': 6930,
        '../../../hooks/bridge/useCrossChainSwapsEventTracker': 6937,
        '../../../hooks/useI18nContext': 6985,
        '../layout': 7049,
        '../utils/quote': 7074,
        './bridge-quotes-modal': 7062,
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
                  (n.MultichainBridgeQuoteCard = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/bridge-controller'),
                  s = e('../../../components/component-library'),
                  i = e('../../../ducks/bridge/selectors'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../utils/quote'),
                  u = e('../../../ducks/metamask/metamask'),
                  d = e('../../../hooks/bridge/useCrossChainSwapsEventTracker'),
                  m = e('../../../hooks/bridge/events/useRequestProperties'),
                  f = e('../../../hooks/bridge/events/useRequestMetadataProperties'),
                  p = e('../../../hooks/bridge/events/useQuoteProperties'),
                  g = e('../../../../shared/constants/metametrics'),
                  h = e('../../../helpers/constants/design-system'),
                  y = e('../layout'),
                  v = e('../../../../shared/constants/bridge'),
                  x = e('../../../../shared/constants/network'),
                  T = e('../../../../shared/constants/multichain/networks'),
                  k = e('../../../ducks/locale/locale'),
                  b = e('./bridge-quotes-modal');
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.MultichainBridgeQuoteCard = () => {
                  var e;
                  const t = (0, l.useI18nContext)(),
                    { activeQuote: n } = (0, a.useSelector)(i.getBridgeQuotes),
                    E = (0, a.useSelector)(u.getCurrentCurrency),
                    C = (0, d.useCrossChainSwapsEventTracker)(),
                    { quoteRequestProperties: w } = (0, m.useRequestProperties)(),
                    _ = (0, f.useRequestMetadataProperties)(),
                    I = (0, p.useQuoteProperties)(),
                    S = (0, a.useSelector)(i.getFromChain),
                    M = (0, a.useSelector)(i.getToChain),
                    P = (0, a.useSelector)(k.getIntlLocale),
                    D = (0, a.useSelector)(i.getIsBridgeTx),
                    [A, F] = (0, o.useState)(!1),
                    O = e =>
                      (0, r.isSolanaChainId)(e)
                        ? T.MULTICHAIN_TOKEN_IMAGE_MAP[T.MultichainNetworks.SOLANA]
                        : x.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[(0, r.formatChainIdToHex)(e)],
                    R = e =>
                      (0, r.isSolanaChainId)(e)
                        ? v.NETWORK_TO_SHORT_NETWORK_NAME_MAP[T.MultichainNetworks.SOLANA]
                        : v.NETWORK_TO_SHORT_NETWORK_NAME_MAP[(0, r.formatChainIdToHex)(e)];
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(b.BridgeQuotesModal, {
                      isOpen: A,
                      onClose: () => F(!1),
                    }),
                    n
                      ? o.default.createElement(
                          y.Column,
                          { gap: 3 },
                          o.default.createElement(
                            y.Column,
                            { gap: 2 },
                            o.default.createElement(
                              y.Row,
                              { justifyContent: h.JustifyContent.spaceBetween },
                              o.default.createElement(
                                y.Row,
                                { gap: 1 },
                                o.default.createElement(
                                  s.Text,
                                  {
                                    variant: h.TextVariant.bodyMd,
                                    color: h.TextColor.textAlternative,
                                  },
                                  t('multichainQuoteCardQuoteLabel')
                                ),
                                o.default.createElement(
                                  y.Tooltip,
                                  {
                                    title: t('howQuotesWork'),
                                    position: s.PopoverPosition.TopStart,
                                    offset: [-16, 16],
                                    iconName: s.IconName.Question,
                                  },
                                  t('howQuotesWorkExplanation', [r.BRIDGE_MM_FEE_RATE])
                                )
                              ),
                              o.default.createElement(
                                s.Text,
                                null,
                                `1 ${n.quote.srcAsset.symbol} = ${(0, c.formatTokenAmount)(P, n.toTokenAmount.amount.dividedBy(n.sentAmount.amount))} ${n.quote.destAsset.symbol}`
                              )
                            ),
                            D &&
                              o.default.createElement(
                                y.Row,
                                { justifyContent: h.JustifyContent.spaceBetween },
                                o.default.createElement(
                                  s.Text,
                                  {
                                    variant: h.TextVariant.bodyMd,
                                    color: h.TextColor.textAlternative,
                                  },
                                  t('multichainQuoteCardBridgingLabel')
                                ),
                                o.default.createElement(
                                  y.Row,
                                  { gap: 1 },
                                  o.default.createElement(s.AvatarNetwork, {
                                    name: (null == S ? void 0 : S.name) ?? '',
                                    src: O(n.quote.srcChainId),
                                    size: s.AvatarNetworkSize.Xs,
                                    backgroundColor: h.BackgroundColor.transparent,
                                  }),
                                  o.default.createElement(s.Text, null, R(n.quote.srcChainId)),
                                  o.default.createElement(s.Icon, {
                                    name: s.IconName.Arrow2Right,
                                    size: s.IconSize.Xs,
                                  }),
                                  o.default.createElement(s.AvatarNetwork, {
                                    name: (null == M ? void 0 : M.name) ?? '',
                                    src: O(n.quote.destChainId),
                                    size: s.AvatarNetworkSize.Xs,
                                    backgroundColor: h.BackgroundColor.transparent,
                                  }),
                                  o.default.createElement(s.Text, null, R(n.quote.destChainId))
                                )
                              ),
                            o.default.createElement(
                              y.Row,
                              { justifyContent: h.JustifyContent.spaceBetween },
                              o.default.createElement(
                                s.Text,
                                {
                                  variant: h.TextVariant.bodyMd,
                                  color: h.TextColor.textAlternative,
                                },
                                t('networkFee')
                              ),
                              o.default.createElement(
                                s.Text,
                                null,
                                (0, c.formatCurrencyAmount)(
                                  null === (e = n.totalNetworkFee) || void 0 === e
                                    ? void 0
                                    : e.valueInCurrency,
                                  E,
                                  2
                                )
                              )
                            ),
                            o.default.createElement(
                              y.Row,
                              { justifyContent: h.JustifyContent.spaceBetween },
                              o.default.createElement(
                                s.Text,
                                {
                                  variant: h.TextVariant.bodyMd,
                                  color: h.TextColor.textAlternative,
                                },
                                t('multichainQuoteCardTimeLabel')
                              ),
                              o.default.createElement(
                                s.Text,
                                null,
                                t('bridgeTimingMinutes', [
                                  (0, c.formatEtaInMinutes)(n.estimatedProcessingTimeInSeconds),
                                ])
                              )
                            ),
                            o.default.createElement(
                              y.Row,
                              {
                                justifyContent: h.JustifyContent.spaceBetween,
                                color: h.TextColor.textAlternative,
                              },
                              o.default.createElement(
                                s.Text,
                                { variant: h.TextVariant.bodyMd },
                                t('rateIncludesMMFee', [r.BRIDGE_MM_FEE_RATE])
                              ),
                              o.default.createElement(
                                s.ButtonLink,
                                {
                                  variant: h.TextVariant.bodyMd,
                                  onClick: () => {
                                    w &&
                                      _ &&
                                      I &&
                                      C({
                                        event: g.MetaMetricsEventName.AllQuotesOpened,
                                        properties: { ...w, ..._, ...I },
                                      }),
                                      F(!0);
                                  },
                                },
                                t('moreQuotes')
                              )
                            )
                          )
                        )
                      : null
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/quotes/multichain-bridge-quote-card.tsx' },
    ],
    [
      7064,
      {
        '../../../../shared/types/bridge-status': 5883,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        './segment': 7070,
        '@metamask/transaction-controller': 2946,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function ({ bridgeTxHistoryItem: e, transactionGroup: t }) {
                    const n = (0, l.useI18nContext)(),
                      { initialTransaction: a } = t,
                      r = m(a),
                      u = f({ bridgeTxHistoryItem: e, srcTxStatus: r }),
                      p = d(r);
                    return o.default.createElement(
                      s.Box,
                      { display: i.Display.Flex, flexDirection: i.FlexDirection.Column, gap: 2 },
                      o.default.createElement(
                        s.Text,
                        { color: i.TextColor.textAlternative },
                        n('bridgeTransactionProgress', [p])
                      ),
                      o.default.createElement(
                        s.Box,
                        { display: i.Display.Flex, gap: 2, width: i.BlockSize.Full },
                        o.default.createElement(c.default, { type: r }),
                        o.default.createElement(c.default, { type: u })
                      )
                    );
                  });
                var o = u(e('react')),
                  a = e('@metamask/transaction-controller'),
                  r = e('../../../../shared/types/bridge-status'),
                  s = e('../../../components/component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = u(e('./segment'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = e => {
                    if (e === r.StatusTypes.PENDING) return 1;
                    if (e === r.StatusTypes.COMPLETE) return 2;
                    throw new Error('No more possible states for srcTxStatus');
                  },
                  m = e =>
                    e.status === a.TransactionStatus.confirmed
                      ? r.StatusTypes.COMPLETE
                      : r.StatusTypes.PENDING,
                  f = ({ bridgeTxHistoryItem: e, srcTxStatus: t }) => {
                    var n;
                    return t !== r.StatusTypes.COMPLETE
                      ? null
                      : null != e &&
                          null !== (n = e.status.destChain) &&
                          void 0 !== n &&
                          n.txHash &&
                          e.status.status === r.StatusTypes.COMPLETE
                        ? r.StatusTypes.COMPLETE
                        : r.StatusTypes.PENDING;
                  };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/transaction-details/bridge-activity-item-tx-segments.tsx',
      },
    ],
    [
      7065,
      {
        '../../../../shared/constants/common': 5791,
        '../../../components/component-library': 6402,
        '../../../components/multichain/menu-items/view-explorer-menu-item': 6577,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
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
                    srcChainId: e,
                    destChainId: t,
                    srcBlockExplorerUrl: n,
                    destBlockExplorerUrl: c,
                  }) {
                    const u = (0, o.useContext)(s.MetaMetricsContext),
                      f = (0, l.useI18nContext)(),
                      p = f('bridgeExplorerLinkViewOn', [d(e, n)]),
                      g = c ? f('bridgeExplorerLinkViewOn', [d(t, c)]) : undefined;
                    return o.default.createElement(
                      a.Box,
                      { display: i.Display.Flex, flexDirection: i.FlexDirection.Column, gap: 4 },
                      n &&
                        o.default.createElement(
                          a.ButtonSecondary,
                          {
                            endIconName: a.IconName.Export,
                            onClick: () => {
                              n && (0, r.openBlockExplorer)(n, m, u);
                            },
                          },
                          p
                        ),
                      c &&
                        o.default.createElement(
                          a.ButtonSecondary,
                          {
                            endIconName: a.IconName.Export,
                            onClick: () => {
                              c && (0, r.openBlockExplorer)(c, m, u);
                            },
                          },
                          g
                        )
                    );
                  }),
                  (n.getBlockExplorerUrl = void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../components/component-library'),
                  r = e('../../../components/multichain/menu-items/view-explorer-menu-item'),
                  s = e('../../../contexts/metametrics'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../../shared/constants/common');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const d = (e, t) => {
                  const n = e
                    ? c.CHAINID_DEFAULT_BLOCK_EXPLORER_HUMAN_READABLE_URL_MAP[e]
                    : undefined;
                  return n || (t ? t.split('/')[2] : undefined);
                };
                n.getBlockExplorerUrl = (e, t) => {
                  var n;
                  if (!e || !t) return undefined;
                  const o = e.defaultBlockExplorerUrlIndex;
                  if (o === undefined) return undefined;
                  return `${null === (n = e.blockExplorerUrls[o]) || void 0 === n ? void 0 : n.replace(/\/$/u, '')}/tx/${t}`;
                };
                const m = 'Activity Tab';
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/bridge-explorer-links.tsx' },
    ],
    [
      7066,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/modules/Numeric': 5853,
        '../../../../shared/types/bridge-status': 5883,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '@metamask/transaction-controller': 2946,
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
                    step: e,
                    networkConfigurationsByChainId: t,
                    time: n,
                    stepStatus: a,
                  }) {
                    const i = (0, c.useI18nContext)();
                    return o.createElement(
                      s.Box,
                      {
                        display: l.Display.Flex,
                        alignItems: l.AlignItems.center,
                        gap: 2,
                        className: 'bridge-transaction-details__step-grid--desc',
                      },
                      n && o.createElement(s.Text, { color: l.TextColor.textDefault }, n),
                      o.createElement(
                        s.Text,
                        {
                          color:
                            a === r.StatusTypes.PENDING || a === r.StatusTypes.COMPLETE
                              ? l.TextColor.textDefault
                              : l.TextColor.textAlternative,
                          fontWeight:
                            a === r.StatusTypes.PENDING ? l.FontWeight.Medium : l.FontWeight.Normal,
                        },
                        e.action === r.ActionTypes.BRIDGE && m(i, a, e, t),
                        e.action === r.ActionTypes.SWAP && f(i, a, e)
                      )
                    );
                  }),
                  (n.getStepStatus = void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('@metamask/transaction-controller'),
                  r = e('../../../../shared/types/bridge-status'),
                  s = e('../../../components/component-library'),
                  i = e('../../../../shared/modules/Numeric'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../../shared/constants/bridge');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const m = (e, t, n, o) => {
                    var a;
                    const s = n.destChainId
                        ? new i.Numeric(n.destChainId, 10).toPrefixedHexString()
                        : undefined,
                      l = s ? o[s] : undefined,
                      c = u.NETWORK_TO_SHORT_NETWORK_NAME_MAP[null == l ? void 0 : l.chainId],
                      d = null === (a = n.destAsset) || void 0 === a ? void 0 : a.symbol;
                    return d
                      ? t === r.StatusTypes.COMPLETE
                        ? e('bridgeStepActionBridgeComplete', [d, c])
                        : e('bridgeStepActionBridgePending', [d, c])
                      : null;
                  },
                  f = (e, t, n) => {
                    var o, a;
                    const s = null === (o = n.srcAsset) || void 0 === o ? void 0 : o.symbol,
                      i = null === (a = n.destAsset) || void 0 === a ? void 0 : a.symbol;
                    return s && i
                      ? t === r.StatusTypes.COMPLETE
                        ? e('bridgeStepActionSwapComplete', [s, i])
                        : e('bridgeStepActionSwapPending', [s, i])
                      : null;
                  };
                n.getStepStatus = ({ bridgeHistoryItem: e, step: t, srcChainTxMeta: n }) =>
                  e
                    ? t.action === r.ActionTypes.SWAP
                      ? ((e, t, n) => {
                          const o = t.srcChainId === t.destChainId,
                            s = t.srcChainId === e.quote.srcChainId;
                          if (o && s)
                            return (null == n ? void 0 : n.status) === a.TransactionStatus.confirmed
                              ? r.StatusTypes.COMPLETE
                              : r.StatusTypes.PENDING;
                          return (null == n ? void 0 : n.status) ===
                            a.TransactionStatus.confirmed && e.status
                            ? e.status.status
                            : null;
                        })(e, t, n)
                      : t.action === r.ActionTypes.BRIDGE
                        ? (e => (e.status ? e.status.status : null))(e)
                        : r.StatusTypes.UNKNOWN
                    : r.StatusTypes.UNKNOWN;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/bridge/transaction-details/bridge-step-description.tsx',
      },
    ],
    [
      7067,
      {
        '../../../../shared/types/bridge-status': 5883,
        '../../../components/component-library': 6402,
        '../../../helpers/utils/util': 6921,
        './bridge-step-description': 7066,
        './step-progress-bar-item': 7071,
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
                    bridgeHistoryItem: e,
                    srcChainTxMeta: t,
                    networkConfigurationsByChainId: n,
                  }) {
                    const c = (null == e ? void 0 : e.quote.steps) || [],
                      u = c.map(n =>
                        (0, i.getStepStatus)({ bridgeHistoryItem: e, step: n, srcChainTxMeta: t })
                      );
                    return o.default.createElement(
                      a.Box,
                      { className: 'bridge-transaction-details__step-grid' },
                      c.map((a, m) => {
                        const f = m > 0 ? u[m - 1] : null,
                          p = u[m],
                          g = m < u.length - 1 ? u[m + 1] : null,
                          h =
                            p === r.StatusTypes.COMPLETE &&
                            (g === r.StatusTypes.PENDING || g === r.StatusTypes.COMPLETE),
                          y = f === r.StatusTypes.PENDING && p === r.StatusTypes.PENDING ? null : p,
                          v = (0, s.formatDate)(
                            d(
                              m,
                              m === c.length - 1,
                              (null == e ? void 0 : e.startTime) || (null == t ? void 0 : t.time),
                              (null == e ? void 0 : e.estimatedProcessingTimeInSeconds) || 0
                            ),
                            'hh:mm a'
                          );
                        return o.default.createElement(
                          l.default,
                          {
                            key: `progress-${a.action}-${a.srcChainId}-${a.destChainId}`,
                            stepStatus: y,
                            isLastItem: m === c.length - 1,
                            isEdgeComplete: h,
                          },
                          o.default.createElement(i.default, {
                            step: a,
                            networkConfigurationsByChainId: n,
                            stepStatus: y,
                            time: v,
                          })
                        );
                      })
                    );
                  });
                var o = u(e('react')),
                  a = e('../../../components/component-library'),
                  r = e('../../../../shared/types/bridge-status'),
                  s = e('../../../helpers/utils/util'),
                  i = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('./bridge-step-description')),
                  l = u(e('./step-progress-bar-item'));
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
                const d = (e, t, n, o) => (0 === e ? n : t && n && o ? n + 1e3 * o : undefined);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/bridge-step-list.tsx' },
    ],
    [
      7068,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
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
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = (o = e('classnames')) && o.__esModule ? o : { default: o },
                  s = e('../../../components/component-library'),
                  i = e('../../../helpers/constants/design-system');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const c = a.forwardRef(
                  ({ size: e = s.IconSize.Md, color: t, className: n = '', style: o }, l) =>
                    a.createElement(s.Box, {
                      className: (0, r.default)(n, 'mm-icon', `mm-icon--size-${e}`),
                      ref: l,
                      as: 'span',
                      display: i.Display.InlineBlock,
                      style: {
                        height: '12px',
                        width: '12px',
                        border: `1px solid var(--color-${t})`,
                        borderRadius: '50%',
                        backgroundColor: `var(--color-${i.BackgroundColor.backgroundDefault})`,
                        zIndex: 1,
                        ...o,
                      },
                    })
                );
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/hollow-circle.tsx' },
    ],
    [
      7069,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        './hollow-circle': 7068,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function ({ iconSize: e, color: t }) {
                    return o.default.createElement(
                      a.Box,
                      { style: { position: 'relative' } },
                      o.default.createElement(a.Box, {
                        className: 'bridge-transaction-details__icon-loading',
                        backgroundColor: r.BackgroundColor.primaryMuted,
                        display: r.Display.Flex,
                        justifyContent: r.JustifyContent.center,
                        alignItems: r.AlignItems.center,
                        borderRadius: r.BorderRadius.full,
                        style: { width: '2rem', height: '2rem' },
                      }),
                      o.default.createElement(s.default, {
                        size: e,
                        color: t,
                        style: {
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          borderWidth: '2px',
                        },
                      })
                    );
                  });
                var o = i(e('react')),
                  a = e('../../../components/component-library'),
                  r = e('../../../helpers/constants/design-system'),
                  s = i(e('./hollow-circle'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/pulsing-circle.tsx' },
    ],
    [
      707,
      { './RegistryType': 696, './ScriptExpression': 697, './utils': 709 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                const o = e('./utils'),
                  a = e('./RegistryType'),
                  r = e('./ScriptExpression'),
                  s = Object.values(a.RegistryTypes)
                    .filter(e => !!e.getTag())
                    .map(e => e.getTag()),
                  i = Object.values(r.ScriptExpressions).map(e => e.getTag());
                (0, o.patchTags)(s.concat(i));
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/patchCBOR.js',
      },
    ],
    [
      7070,
      {
        '../../../../shared/types/bridge-status': 5883,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
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
                  (n.default = function ({ type: e }) {
                    return o.default.createElement(
                      r.Box,
                      {
                        width: s.BlockSize.Full,
                        backgroundColor: s.BackgroundColor.backgroundAlternative,
                        borderRadius: s.BorderRadius.pill,
                      },
                      o.default.createElement(r.Box, {
                        width: s.BlockSize.Full,
                        backgroundColor: s.BackgroundColor.primaryDefault,
                        borderRadius: s.BorderRadius.pill,
                        className: (0, a.default)({
                          'bridge-transaction-details__segment': !0,
                          'bridge-transaction-details__segment--pending':
                            e === i.StatusTypes.PENDING,
                          'bridge-transaction-details__segment--complete':
                            e === i.StatusTypes.COMPLETE,
                        }),
                      })
                    );
                  });
                var o = l(e('react')),
                  a = l(e('classnames')),
                  r = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  i = e('../../../../shared/types/bridge-status');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/segment.tsx' },
    ],
    [
      7071,
      {
        '../../../../shared/types/bridge-status': 5883,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        './hollow-circle': 7068,
        './pulsing-circle': 7069,
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
                    stepStatus: e,
                    isLastItem: t,
                    isEdgeComplete: n,
                    children: c,
                  }) {
                    return o.default.createElement(
                      o.default.Fragment,
                      null,
                      (null === e || e === a.StatusTypes.UNKNOWN) &&
                        o.default.createElement(i.default, {
                          size: u,
                          color: s.IconColor.iconMuted,
                        }),
                      e === a.StatusTypes.PENDING &&
                        o.default.createElement(l.default, {
                          iconSize: u,
                          color: s.IconColor.primaryDefault,
                        }),
                      e === a.StatusTypes.COMPLETE &&
                        o.default.createElement(r.Icon, {
                          name: r.IconName.FullCircle,
                          color: s.IconColor.primaryDefault,
                          size: u,
                        }),
                      c,
                      !t &&
                        o.default.createElement(d, {
                          color: n ? s.IconColor.primaryDefault : s.IconColor.iconMuted,
                        }),
                      !t && o.default.createElement('div', null)
                    );
                  });
                var o = c(e('react')),
                  a = e('../../../../shared/types/bridge-status'),
                  r = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  i = c(e('./hollow-circle')),
                  l = c(e('./pulsing-circle'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = r.IconSize.Xs,
                  d = ({ color: e }) =>
                    o.default.createElement('div', {
                      style: {
                        height: '60px',
                        marginTop: '-1rem',
                        marginBottom: '-1rem',
                        width: '1px',
                        backgroundColor: `var(--color-${e})`,
                        zIndex: 0.1,
                      },
                    });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/step-progress-bar-item.tsx' },
    ],
    [
      7072,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function ({ title: e, value: t }) {
                    return a.default.createElement(
                      r.Box,
                      { display: s.Display.Flex, justifyContent: s.JustifyContent.spaceBetween },
                      a.default.createElement(
                        r.Text,
                        {
                          width: s.BlockSize.OneFourth,
                          paddingRight: 1,
                          variant: s.TextVariant.bodyMd,
                        },
                        e
                      ),
                      a.default.createElement(
                        r.Text,
                        {
                          display: s.Display.Flex,
                          width: s.BlockSize.ThreeFourths,
                          flexDirection: s.FlexDirection.Column,
                          alignItems: s.AlignItems.flexEnd,
                          textAlign: s.TextAlign.Right,
                          paddingLeft: 1,
                          variant: s.TextVariant.bodyMd,
                        },
                        t
                      )
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/transaction-detail-row.tsx' },
    ],
    [
      7073,
      {
        '../../../../shared/constants/bridge': 5790,
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/types/bridge-status': 5883,
        '../../../components/app/confirm/info/row': 5984,
        '../../../components/app/transaction-activity-log': 6293,
        '../../../components/app/transaction-breakdown/transaction-breakdown-utils': 6303,
        '../../../components/app/user-preferenced-currency-display/user-preferenced-currency-display.component': 6318,
        '../../../components/component-library': 6402,
        '../../../components/multichain/pages/page': 6652,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/bridge-status/selectors': 6847,
        '../../../ducks/locale/locale': 6859,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/bridge/useBridgeChainInfo': 6932,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../confirmations/components/simulation-details/formatAmount': 7244,
        './bridge-explorer-links': 7065,
        './bridge-step-list': 7067,
        './transaction-detail-row': 7072,
        '@metamask/bridge-controller': 1414,
        'bignumber.js': 4030,
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
                  (n.getIsDelayed = n.default = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = N(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('bignumber.js'),
                  i = e('@metamask/bridge-controller'),
                  l = e('../../../components/component-library'),
                  c = e('../../../components/multichain/pages/page'),
                  u = e('../../../ducks/bridge-status/selectors'),
                  d = R(e('../../../hooks/bridge/useBridgeChainInfo')),
                  m = e('../../../../shared/modules/selectors/networks'),
                  f = e(
                    '../../../components/app/transaction-breakdown/transaction-breakdown-utils'
                  ),
                  p = e('../../../../shared/modules/conversion.utils'),
                  g = R(
                    e(
                      '../../../components/app/user-preferenced-currency-display/user-preferenced-currency-display.component'
                    )
                  ),
                  h = e('../../../../shared/constants/common'),
                  y = e('../../../helpers/constants/common'),
                  v = e('../../../../shared/types/bridge-status'),
                  x = e('../../../helpers/constants/design-system'),
                  T = e('../../../helpers/utils/util'),
                  k = e('../../../components/app/confirm/info/row'),
                  b = e('../../../hooks/useI18nContext'),
                  E = e('../../../selectors'),
                  C = e('../../../../shared/constants/metametrics'),
                  w = e('../../../contexts/metametrics'),
                  _ = e('../../confirmations/components/simulation-details/formatAmount'),
                  I = e('../../../ducks/locale/locale'),
                  S = R(e('../../../components/app/transaction-activity-log')),
                  M = e('../../../../shared/constants/bridge'),
                  P = e('../../../selectors/multichain'),
                  D = e('../../../../shared/constants/time'),
                  A = R(e('./transaction-detail-row')),
                  F = R(e('./bridge-explorer-links')),
                  O = R(e('./bridge-step-list'));
                function R(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function N(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (N = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const B = (e, t) => {
                    var n;
                    if (!e || !t) return undefined;
                    const o = e.defaultBlockExplorerUrlIndex;
                    if (o === undefined) return undefined;
                    return `${null === (n = e.blockExplorerUrls[o]) || void 0 === n ? void 0 : n.replace(/\/$/u, '')}/tx/${t}`;
                  },
                  j = (e, t) => {
                    const n = 10 * D.MINUTE;
                    return Boolean(
                      e === v.StatusTypes.PENDING &&
                        (null == t ? void 0 : t.startTime) &&
                        Date.now() > t.startTime + n + 1e3 * t.estimatedProcessingTimeInSeconds
                    );
                  };
                n.getIsDelayed = j;
                const G = {
                  [v.StatusTypes.PENDING]: x.TextColor.warningDefault,
                  [v.StatusTypes.COMPLETE]: x.TextColor.successDefault,
                  [v.StatusTypes.FAILED]: x.TextColor.errorDefault,
                  [v.StatusTypes.UNKNOWN]: x.TextColor.errorDefault,
                };
                n.default = () => {
                  var e, t, n;
                  const D = (0, b.useI18nContext)(),
                    R = (0, a.useSelector)(I.getIntlLocale),
                    N = (0, o.useContext)(w.MetaMetricsContext),
                    $ = (0, a.useSelector)(e => e),
                    W = (0, r.useHistory)(),
                    L = (0, r.useLocation)(),
                    { srcTxMetaId: q } = (0, r.useParams)(),
                    V = (0, a.useSelector)(u.selectBridgeHistoryForAccount),
                    U = (0, a.useSelector)(E.selectedAddressTxListSelectorAllChain),
                    z = (0, a.useSelector)(m.getNetworkConfigurationsByChainId),
                    H =
                      (null === (e = L.state) || void 0 === e ? void 0 : e.transactionGroup) ||
                      null,
                    K =
                      (null === (t = L.state) || void 0 === t ? void 0 : t.isEarliestNonce) || null,
                    Q = U.find(e => e.id === q),
                    J = q ? V[q] : undefined,
                    { srcNetwork: X, destNetwork: Y } = (0, d.default)({
                      bridgeHistoryItem: J,
                      srcTxMeta: Q,
                    }),
                    Z = null == Q ? void 0 : Q.hash,
                    ee = null != X && X.isEvm ? B(X, Z) : undefined,
                    te =
                      null == J || null === (n = J.status.destChain) || void 0 === n
                        ? void 0
                        : n.txHash,
                    ne = null != Y && Y.isEvm ? B(Y, te) : undefined,
                    oe = J ? (null == J ? void 0 : J.status.status) : v.StatusTypes.PENDING,
                    ae = X
                      ? (0, P.getImageForChainId)(
                          X.isEvm ? (0, i.formatChainIdToHex)(X.chainId) : X.chainId
                        )
                      : undefined,
                    re = Y
                      ? (0, P.getImageForChainId)(
                          Y.isEvm ? (0, i.formatChainIdToHex)(Y.chainId) : Y.chainId
                        )
                      : undefined,
                    se = M.NETWORK_TO_SHORT_NETWORK_NAME_MAP[null == X ? void 0 : X.chainId],
                    ie = M.NETWORK_TO_SHORT_NETWORK_NAME_MAP[null == Y ? void 0 : Y.chainId],
                    le = Q
                      ? (0, f.getTransactionBreakdownData)({
                          state: $,
                          transaction: Q,
                          isTokenApprove: !1,
                        })
                      : undefined,
                    ce = (({ locale: e, bridgeHistoryItem: t }) => {
                      var n;
                      return null != t &&
                        null !== (n = t.pricingData) &&
                        void 0 !== n &&
                        n.amountSent
                        ? (0, _.formatAmount)(e, new s.BigNumber(t.pricingData.amountSent))
                        : undefined;
                    })({ locale: R, bridgeHistoryItem: J }),
                    ue = (({ locale: e, bridgeHistoryItem: t }) => {
                      var n;
                      if (!t) return undefined;
                      const o =
                        null === (n = t.status.destChain) || void 0 === n ? void 0 : n.amount;
                      if (!o) return undefined;
                      const a = t.quote.destAsset.decimals;
                      return (0, _.formatAmount)(e, new s.BigNumber(o).dividedBy(10 ** a));
                    })({ locale: R, bridgeHistoryItem: J }),
                    de = j(oe, J),
                    me = o.default.createElement(
                      l.Box,
                      { display: x.Display.Flex, gap: 1, alignItems: x.AlignItems.center },
                      X &&
                        o.default.createElement(l.AvatarNetwork, {
                          size: l.AvatarNetworkSize.Xs,
                          src: ae,
                          name: null == X ? void 0 : X.name,
                        }),
                      se
                    ),
                    fe = o.default.createElement(
                      l.Box,
                      { display: x.Display.Flex, gap: 1, alignItems: x.AlignItems.center },
                      Y &&
                        o.default.createElement(l.AvatarNetwork, {
                          size: l.AvatarNetworkSize.Xs,
                          src: re,
                          name: null == Y ? void 0 : Y.name,
                        }),
                      ie
                    );
                  return o.default.createElement(
                    'div',
                    { className: 'bridge__container' },
                    o.default.createElement(
                      c.Header,
                      {
                        className: 'bridge__header',
                        startAccessory: o.default.createElement(l.ButtonIcon, {
                          iconName: l.IconName.ArrowLeft,
                          size: l.ButtonIconSize.Sm,
                          ariaLabel: D('back'),
                          onClick: () => W.goBack(),
                        }),
                      },
                      D('bridge'),
                      ' details'
                    ),
                    o.default.createElement(
                      c.Content,
                      { className: 'bridge-transaction-details__content' },
                      o.default.createElement(
                        l.Box,
                        { display: x.Display.Flex, flexDirection: x.FlexDirection.Column, gap: 4 },
                        de &&
                          o.default.createElement(
                            l.BannerAlert,
                            {
                              title: D('bridgeTxDetailsDelayedTitle'),
                              severity: l.BannerAlertSeverity.Warning,
                            },
                            o.default.createElement(
                              l.Text,
                              { display: x.Display.Flex, alignItems: x.AlignItems.center },
                              D('bridgeTxDetailsDelayedDescription'),
                              ' ',
                              o.default.createElement(
                                l.ButtonLink,
                                {
                                  externalLink: !0,
                                  href: y.SUPPORT_REQUEST_LINK,
                                  onClick: () => {
                                    N(
                                      {
                                        category: C.MetaMetricsEventCategory.Home,
                                        event: C.MetaMetricsEventName.SupportLinkClicked,
                                        properties: {
                                          url: y.SUPPORT_REQUEST_LINK,
                                          location: 'Bridge Tx Details',
                                        },
                                      },
                                      {
                                        contextPropsIntoEventProperties: [
                                          C.MetaMetricsContextProp.PageTitle,
                                        ],
                                      }
                                    );
                                  },
                                },
                                D('bridgeTxDetailsDelayedDescriptionSupport')
                              ),
                              '.'
                            )
                          ),
                        oe !== v.StatusTypes.COMPLETE &&
                          (J || Q) &&
                          o.default.createElement(O.default, {
                            bridgeHistoryItem: J,
                            srcChainTxMeta: Q,
                            networkConfigurationsByChainId: z,
                          }),
                        o.default.createElement(F.default, {
                          srcChainId:
                            null != X && X.isEvm
                              ? (0, i.formatChainIdToHex)(null == X ? void 0 : X.chainId)
                              : undefined,
                          destChainId:
                            null != Y && Y.isEvm
                              ? (0, i.formatChainIdToHex)(null == Y ? void 0 : Y.chainId)
                              : undefined,
                          srcBlockExplorerUrl: ee,
                          destBlockExplorerUrl: ne,
                        }),
                        o.default.createElement(k.ConfirmInfoRowDivider, null),
                        o.default.createElement(
                          l.Box,
                          {
                            display: x.Display.Flex,
                            flexDirection: x.FlexDirection.Column,
                            gap: 2,
                          },
                          o.default.createElement(A.default, {
                            title: D('bridgeTxDetailsStatus'),
                            value: o.default.createElement(
                              l.Text,
                              {
                                textTransform: x.TextTransform.Capitalize,
                                color: oe ? G[oe] : undefined,
                              },
                              null == oe ? void 0 : oe.toLowerCase()
                            ),
                          }),
                          o.default.createElement(A.default, {
                            title: D('bridgeTxDetailsBridging'),
                            value: o.default.createElement(
                              l.Box,
                              {
                                display: x.Display.Flex,
                                gap: 1,
                                alignItems: x.AlignItems.center,
                                flexWrap: x.FlexWrap.Wrap,
                                justifyContent: x.JustifyContent.flexEnd,
                              },
                              me,
                              o.default.createElement(l.Icon, {
                                name: l.IconName.Arrow2Right,
                                size: l.IconSize.Sm,
                              }),
                              fe
                            ),
                          }),
                          o.default.createElement(A.default, {
                            title: D('bridgeTxDetailsTimestamp'),
                            value: D('bridgeTxDetailsTimestampValue', [
                              (0, T.formatDate)(null == Q ? void 0 : Q.time, 'MMM d, yyyy'),
                              (0, T.formatDate)(null == Q ? void 0 : Q.time, 'hh:mm a'),
                            ]),
                          })
                        ),
                        o.default.createElement(k.ConfirmInfoRowDivider, null),
                        o.default.createElement(
                          l.Box,
                          {
                            display: x.Display.Flex,
                            flexDirection: x.FlexDirection.Column,
                            gap: 2,
                          },
                          o.default.createElement(A.default, {
                            title: D('bridgeTxDetailsYouSent'),
                            value: o.default.createElement(
                              l.Box,
                              {
                                display: x.Display.Flex,
                                gap: 1,
                                alignItems: x.AlignItems.center,
                                flexWrap: x.FlexWrap.Wrap,
                                justifyContent: x.JustifyContent.flexEnd,
                              },
                              D('bridgeTxDetailsTokenAmountOnChain', [
                                ce,
                                null == J ? void 0 : J.quote.srcAsset.symbol,
                              ]),
                              me
                            ),
                          }),
                          ue &&
                            (null == J ? void 0 : J.quote.destAsset.symbol) &&
                            o.default.createElement(A.default, {
                              title: D('bridgeTxDetailsYouReceived'),
                              value: o.default.createElement(
                                l.Box,
                                {
                                  display: x.Display.Flex,
                                  gap: 1,
                                  alignItems: x.AlignItems.center,
                                  flexWrap: x.FlexWrap.Wrap,
                                  justifyContent: x.JustifyContent.flexEnd,
                                },
                                D('bridgeTxDetailsTokenAmountOnChain', [
                                  ue,
                                  null == J ? void 0 : J.quote.destAsset.symbol,
                                ]),
                                fe
                              ),
                            }),
                          o.default.createElement(A.default, {
                            title: D('bridgeTxDetailsTotalGasFee'),
                            value: o.default.createElement(g.default, {
                              currency: null == le ? void 0 : le.nativeCurrency,
                              denomination: h.EtherDenomination.ETH,
                              numberOfDecimals: 6,
                              value: null == le ? void 0 : le.hexGasTotal,
                              type: y.PRIMARY,
                            }),
                          })
                        ),
                        o.default.createElement(k.ConfirmInfoRowDivider, null),
                        o.default.createElement(
                          l.Box,
                          {
                            display: x.Display.Flex,
                            flexDirection: x.FlexDirection.Column,
                            gap: 2,
                          },
                          o.default.createElement(A.default, {
                            title: D('bridgeTxDetailsNonce'),
                            value:
                              null != Q && Q.txParams.nonce
                                ? (0, p.hexToDecimal)(null == Q ? void 0 : Q.txParams.nonce)
                                : undefined,
                          }),
                          H &&
                            void 0 !== K &&
                            o.default.createElement(S.default, {
                              transactionGroup: H,
                              className: 'transaction-list-item-details__transaction-activity-log',
                              isEarliestNonce: K,
                            })
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/bridge/transaction-details/transaction-details.tsx' },
    ],
    [
      7075,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/constants/network': 5804,
        '../../../shared/constants/transaction': 5819,
        '../../../shared/modules/selectors/networks': 5875,
        '../../../shared/modules/string-utils': 5878,
        '../../components/app/assets/nfts/nft-default-image/nft-default-image': 5935,
        '../../components/app/network-account-balance-header/network-account-balance-header': 6116,
        '../../components/component-library': 6402,
        '../../components/ui/page-container': 6783,
        '../../components/ui/site-origin/site-origin': 6801,
        '../../contexts/i18n': 6832,
        '../../contexts/metametrics': 6836,
        '../../ducks/history/history': 6857,
        '../../helpers/constants/common': 6870,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/utils/util': 6921,
        '../../hooks/useCurrencyDisplay': 6974,
        '../../hooks/useOriginMetadata': 7e3,
        '../../hooks/useUserPreferencedCurrency': 7020,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        '../confirmations/components/confirm/nav': 7197,
        '@metamask/etherscan-link': 1938,
        '@metamask/rpc-errors': 2585,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = A(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('@metamask/rpc-errors'),
                  i = e('@metamask/etherscan-link'),
                  l = D(e('classnames')),
                  c = e('../../components/ui/page-container'),
                  u = e('../../contexts/i18n'),
                  d = e('../../contexts/metametrics'),
                  m = e('../../ducks/history/history'),
                  f = e('../../store/actions'),
                  p = e('../../../shared/constants/metametrics'),
                  g = e('../../../shared/constants/transaction'),
                  h = e('../../components/component-library'),
                  y = e('../../../shared/modules/selectors/networks'),
                  v = e('../../selectors'),
                  x = D(e('../../components/app/assets/nfts/nft-default-image/nft-default-image')),
                  T = e('../../helpers/utils/util'),
                  k = e('../../helpers/constants/design-system'),
                  b = D(
                    e(
                      '../../components/app/network-account-balance-header/network-account-balance-header'
                    )
                  ),
                  E = e('../../../shared/constants/network'),
                  C = D(e('../../components/ui/site-origin/site-origin')),
                  w = e('../../helpers/constants/common'),
                  _ = e('../../hooks/useUserPreferencedCurrency'),
                  I = e('../../hooks/useCurrencyDisplay'),
                  S = e('../../hooks/useOriginMetadata'),
                  M = e('../../../shared/modules/string-utils'),
                  P = e('../confirmations/components/confirm/nav');
                function D(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function A(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (A = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  var e, t;
                  const n = (0, o.useContext)(u.I18nContext),
                    D = (0, a.useDispatch)(),
                    A = (0, r.useHistory)(),
                    F = (0, a.useSelector)(m.getMostRecentOverviewPage),
                    O = (0, a.useSelector)(v.getSuggestedNfts).sort(
                      (e, t) => e.requestData.asset.tokenId - t.requestData.asset.tokenId
                    ),
                    R = (0, a.useSelector)(v.getRpcPrefsForCurrentProvider),
                    N = (0, a.useSelector)(y.getCurrentChainId),
                    B = (0, a.useSelector)(v.getIpfsGateway),
                    j = (0, o.useContext)(d.MetaMetricsContext),
                    G = (0, a.useSelector)(v.getNetworkIdentifier),
                    { address: $ } = (0, a.useSelector)(v.getSelectedInternalAccount),
                    W = (0, a.useSelector)(v.getSelectedAccountCachedBalance),
                    L = (0, a.useSelector)(e => (0, v.getAddressBookEntryOrAccountName)(e, $)),
                    [q, V] = (0, o.useState)([]),
                    U = E.NETWORK_TO_NAME_MAP[N] || G,
                    { currency: z, numberOfDecimals: H } = (0, _.useUserPreferencedCurrency)(
                      w.PRIMARY,
                      { ethNumberOfDecimals: 4 }
                    ),
                    [K] = (0, I.useCurrencyDisplay)(W, { numberOfDecimals: H, currency: z }),
                    Q =
                      (0, S.useOriginMetadata)(
                        null === (e = O[0]) || void 0 === e ? void 0 : e.origin
                      ) || {},
                    J = null === (t = O[0]) || void 0 === t ? void 0 : t.id,
                    X = (0, o.useCallback)(async () => {
                      await Promise.all(
                        O.map(async ({ requestData: { asset: e }, id: t }) => {
                          await D((0, f.resolvePendingApproval)(t, null)),
                            j({
                              event: p.MetaMetricsEventName.NftAdded,
                              category: p.MetaMetricsEventCategory.Wallet,
                              sensitiveProperties: {
                                token_contract_address: e.address,
                                token_symbol: e.symbol,
                                token_id: e.tokenId,
                                token_standard: e.standard,
                                asset_type: g.AssetType.NFT,
                                source: p.MetaMetricsTokenEventSource.Dapp,
                              },
                            });
                        })
                      ),
                        A.push(F);
                    }, [D, A, j, F, O]),
                    Y = (0, o.useCallback)(async () => {
                      await Promise.all(
                        O.map(async ({ id: e }) =>
                          D(
                            (0, f.rejectPendingApproval)(
                              e,
                              (0, s.serializeError)(s.providerErrors.userRejectedRequest())
                            )
                          )
                        )
                      ),
                        A.push(F);
                    }, [D, A, F, O]);
                  let Z, ee;
                  if (
                    ((0, o.useEffect)(() => {
                      O.length || A.push(F);
                    }, [A, F, O]),
                    O.length)
                  )
                    try {
                      const e = new URL(O[0].origin);
                      (Z = e.host), (ee = e.href);
                    } catch {
                      Z = 'dapp';
                    }
                  return (
                    (0, o.useEffect)(() => {
                      (async () => {
                        const e = await Promise.all(
                          O.map(async e => {
                            const t = await (0, T.getAssetImageURL)(e.requestData.asset.image, B);
                            return {
                              ...e,
                              requestData: {
                                ...e.requestData,
                                asset: { ...e.requestData.asset, assetImageUrl: t },
                              },
                            };
                          })
                        );
                        V(e);
                      })();
                    }, []),
                    o.default.createElement(
                      h.Box,
                      {
                        height: k.BlockSize.Full,
                        width: k.BlockSize.Full,
                        display: k.Display.Flex,
                        flexDirection: k.FlexDirection.Column,
                      },
                      o.default.createElement(P.Nav, { confirmationId: J }),
                      o.default.createElement(
                        h.Box,
                        { paddingBottom: 2, className: 'confirm-add-suggested-nft__header' },
                        o.default.createElement(b.default, {
                          accountName: L,
                          accountBalance: K,
                          accountAddress: $,
                          networkName: U,
                          chainId: N,
                        }),
                        o.default.createElement(
                          h.Box,
                          {
                            paddingTop: 4,
                            paddingRight: 4,
                            paddingLeft: 4,
                            display: k.Display.Flex,
                            justifyContent: k.JustifyContent.center,
                          },
                          o.default.createElement(C.default, {
                            chip: !0,
                            siteOrigin: Q.origin,
                            title: Q.origin,
                            iconSrc: Q.iconUrl,
                            iconName: Q.hostname,
                          })
                        ),
                        o.default.createElement(
                          h.Text,
                          {
                            variant: k.TextVariant.headingLg,
                            textAlign: k.TextAlign.Center,
                            margin: 2,
                          },
                          n('addSuggestedNFTs')
                        ),
                        o.default.createElement(
                          h.Text,
                          { variant: k.TextVariant.bodyMd, textAlign: k.TextAlign.Center },
                          n('wantsToAddThisAsset', [
                            'dapp' === Z
                              ? o.default.createElement(
                                  h.Text,
                                  { key: Z, variant: k.TextVariant.bodyMd, fontWeight: 'bold' },
                                  Z
                                )
                              : o.default.createElement(
                                  h.ButtonLink,
                                  {
                                    key: Z,
                                    size: h.BUTTON_SIZES.INHERIT,
                                    href: ee,
                                    target: '_blank',
                                  },
                                  Z
                                ),
                          ])
                        )
                      ),
                      o.default.createElement(
                        h.Box,
                        { className: 'confirm-add-suggested-nft__content' },
                        o.default.createElement(
                          h.Box,
                          {
                            className: 'confirm-add-suggested-nft__card',
                            padding: 2,
                            borderRadius: k.BorderRadius.MD,
                          },
                          o.default.createElement(
                            h.Box,
                            {
                              className: (0, l.default)({
                                'confirm-add-suggested-nft__nft-list': O.length > 1,
                              }),
                            },
                            O.map(
                              ({
                                id: e,
                                requestData: {
                                  asset: { address: t, tokenId: n, symbol: a, name: r },
                                },
                              }) => {
                                const l = q.find(
                                    e =>
                                      e.requestData.asset.tokenId === n &&
                                      (0, M.isEqualCaseInsensitive)(e.requestData.asset.address, t)
                                  ),
                                  c = l ? l.requestData.asset.assetImageUrl : '',
                                  u = (0, i.getTokenTrackerLink)(t, N, null, null, {
                                    blockExplorerUrl:
                                      (null == R ? void 0 : R.blockExplorerUrl) ?? null,
                                  });
                                return 1 === O.length
                                  ? o.default.createElement(
                                      h.Box,
                                      {
                                        className: 'confirm-add-suggested-nft__nft-single',
                                        key: `confirm-add-suggested-nft__nft-single-${e}`,
                                        borderRadius: k.BorderRadius.MD,
                                        margin: 0,
                                        padding: 0,
                                      },
                                      c
                                        ? o.default.createElement('img', {
                                            className:
                                              'confirm-add-suggested-nft__nft-single-image',
                                            src: c,
                                            alt: r || n,
                                          })
                                        : o.default.createElement(x.default, {
                                            className:
                                              'confirm-add-suggested-nft__nft-single-image-default',
                                            tokenId: n,
                                            name: r || a || (0, T.shortenAddress)(t),
                                          }),
                                      o.default.createElement(
                                        h.Box,
                                        {
                                          padding: 1,
                                          display: k.Display.Flex,
                                          flexDirection: k.FlexDirection.Row,
                                          justifyContent: k.JustifyContent.spaceBetween,
                                          alignItems: k.AlignItems.Center,
                                        },
                                        o.default.createElement(
                                          h.Box,
                                          {
                                            display: k.Display.Flex,
                                            flexDirection: k.FlexDirection.Column,
                                            justifyContent: k.JustifyContent.spaceEvenly,
                                            flexWrap: k.FlexWrap.NoWrap,
                                            width: k.BlockSize.Full,
                                            className:
                                              'confirm-add-suggested-nft__nft-single-sub-details',
                                          },
                                          R.blockExplorerUrl
                                            ? o.default.createElement(
                                                h.ButtonLink,
                                                {
                                                  className: 'confirm-add-suggested-nft__nft-name',
                                                  href: u,
                                                  title: t,
                                                  target: '_blank',
                                                  size: h.BUTTON_SIZES.INHERIT,
                                                },
                                                r || a || (0, T.shortenAddress)(t)
                                              )
                                            : o.default.createElement(
                                                h.Text,
                                                {
                                                  variant: k.TextVariant.bodyMd,
                                                  className: 'confirm-add-suggested-nft__nft-name',
                                                  title: t,
                                                },
                                                r || a || (0, T.shortenAddress)(t)
                                              ),
                                          o.default.createElement(
                                            h.Text,
                                            {
                                              variant: k.TextVariant.bodyMd,
                                              color: k.TextColor.textAlternative,
                                              className: 'confirm-add-suggested-nft__nft-tokenId',
                                            },
                                            '#',
                                            n
                                          )
                                        )
                                      )
                                    )
                                  : o.default.createElement(
                                      h.Box,
                                      {
                                        display: k.Display.Flex,
                                        flexDirection: k.FlexDirection.Row,
                                        flexWrap: k.FlexWrap.NoWrap,
                                        alignItems: k.AlignItems.Center,
                                        justifyContent: k.JustifyContent.spaceBetween,
                                        marginBottom: 4,
                                        className: 'confirm-add-suggested-nft__nft-list-item',
                                        key: `${t}-${n}`,
                                      },
                                      o.default.createElement(
                                        h.Box,
                                        {
                                          display: k.Display.Flex,
                                          flexDirection: k.FlexDirection.Row,
                                          flexWrap: k.FlexWrap.NoWrap,
                                          alignItems: k.AlignItems.Center,
                                          justifyContent: k.JustifyContent.spaceBetween,
                                        },
                                        c
                                          ? o.default.createElement('img', {
                                              className: 'confirm-add-suggested-nft__nft-image',
                                              src: c,
                                              alt: r || n,
                                            })
                                          : o.default.createElement(x.default, {
                                              className:
                                                'confirm-add-suggested-nft__nft-image-default',
                                            }),
                                        o.default.createElement(
                                          h.Box,
                                          {
                                            display: k.Display.Flex,
                                            flexDirection: k.FlexDirection.Column,
                                            justifyContent: k.JustifyContent.spaceEvenly,
                                            flexWrap: k.FlexWrap.NoWrap,
                                            width: k.BlockSize.Full,
                                            className: 'confirm-add-suggested-nft__nft-sub-details',
                                          },
                                          R.blockExplorerUrl
                                            ? o.default.createElement(
                                                h.ButtonLink,
                                                {
                                                  className: 'confirm-add-suggested-nft__nft-name',
                                                  href: u,
                                                  title: t,
                                                  target: '_blank',
                                                  size: h.BUTTON_SIZES.INHERIT,
                                                },
                                                r || a || (0, T.shortenAddress)(t)
                                              )
                                            : o.default.createElement(
                                                h.Text,
                                                {
                                                  variant: k.TextVariant.bodySm,
                                                  className: 'confirm-add-suggested-nft__nft-name',
                                                  title: t,
                                                },
                                                r || a || (0, T.shortenAddress)(t)
                                              ),
                                          o.default.createElement(
                                            h.Text,
                                            {
                                              variant: k.TextVariant.bodySm,
                                              color: k.TextColor.textAlternative,
                                              className: 'confirm-add-suggested-nft__nft-tokenId',
                                            },
                                            '#',
                                            n
                                          )
                                        )
                                      ),
                                      o.default.createElement(h.ButtonIcon, {
                                        className: 'confirm-add-suggested-nft__nft-remove',
                                        'data-testid': `confirm-add-suggested-nft__nft-remove-${e}`,
                                        iconName: h.IconName.Close,
                                        size: h.ButtonIconSize.Sm,
                                        color: k.IconColor.iconMuted,
                                        onClick: t => {
                                          t.preventDefault(),
                                            t.stopPropagation(),
                                            D(
                                              (0, f.rejectPendingApproval)(
                                                e,
                                                (0, s.serializeError)(
                                                  s.providerErrors.userRejectedRequest()
                                                )
                                              )
                                            );
                                        },
                                      })
                                    );
                              }
                            )
                          )
                        )
                      ),
                      o.default.createElement(c.PageContainerFooter, {
                        cancelText: n('cancel'),
                        submitText: 1 === O.length ? n('addNft') : n('addNfts'),
                        onCancel: Y,
                        onSubmit: X,
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirm-add-suggested-nft/confirm-add-suggested-nft.js',
      },
    ],
    [
      7076,
      { './confirm-add-suggested-nft': 7075 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./confirm-add-suggested-nft')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirm-add-suggested-nft/index.js' },
    ],
    [
      7077,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/constants/transaction': 5819,
        '../../../shared/modules/string-utils': 5878,
        '../../components/component-library': 6402,
        '../../components/ui/identicon': 6758,
        '../../components/ui/page-container': 6783,
        '../../components/ui/token-balance': 6816,
        '../../contexts/i18n': 6832,
        '../../contexts/metametrics': 6836,
        '../../ducks/history/history': 6857,
        '../../ducks/metamask/metamask': 6860,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/zendesk-url': 6885,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        '../confirmations/components/confirm/nav': 7197,
        '@metamask/rpc-errors': 2585,
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
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = C(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('@metamask/rpc-errors'),
                  i = e('../../components/component-library'),
                  l = E(e('../../components/ui/identicon')),
                  c = E(e('../../components/ui/token-balance')),
                  u = e('../../components/ui/page-container'),
                  d = e('../../contexts/i18n'),
                  m = e('../../contexts/metametrics'),
                  f = e('../../ducks/history/history'),
                  p = e('../../ducks/metamask/metamask'),
                  g = E(e('../../helpers/constants/zendesk-url')),
                  h = e('../../../shared/modules/string-utils'),
                  y = e('../../store/actions'),
                  v = e('../../../shared/constants/metametrics'),
                  x = e('../../../shared/constants/transaction'),
                  T = e('../../selectors'),
                  k = e('../../helpers/constants/design-system'),
                  b = e('../confirmations/components/confirm/nav');
                function E(e) {
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
                n.default = () => {
                  var e;
                  const t = (0, o.useContext)(d.I18nContext),
                    n = (0, a.useDispatch)(),
                    E = (0, r.useHistory)(),
                    C = (0, a.useSelector)(f.getMostRecentOverviewPage),
                    w = (0, a.useSelector)(T.getSuggestedTokens),
                    _ = (0, a.useSelector)(p.getTokens),
                    I = (0, o.useContext)(m.MetaMetricsContext),
                    S = null === (e = w[0]) || void 0 === e ? void 0 : e.id,
                    M = (0, o.useMemo)(
                      () =>
                        (function (e, t) {
                          const n = e.find(({ requestData: { asset: e } }) => {
                            const n = t.find(({ address: t }) =>
                              (0, h.isEqualCaseInsensitive)(t, null == e ? void 0 : e.address)
                            );
                            return Boolean(n);
                          });
                          return Boolean(n);
                        })(w, _) &&
                        o.default.createElement(
                          i.BannerAlert,
                          { severity: k.Severity.Warning, marginTop: 4 },
                          t('knownTokenWarning', [
                            o.default.createElement(
                              i.Button,
                              {
                                variant: i.ButtonVariant.Link,
                                key: 'confirm-add-suggested-token-duplicate-warning',
                                className: 'confirm-add-suggested-token__link',
                                externalLink: !0,
                                size: i.ButtonLinkSize.Inherit,
                                href: g.default.TOKEN_SAFETY_PRACTICES,
                              },
                              t('learnScamRisk')
                            ),
                          ])
                        ),
                      [w, _, t]
                    ),
                    P = (0, o.useMemo)(
                      () =>
                        (function (e, t) {
                          const n = e.find(({ requestData: { asset: e } }) => {
                            const n = t.find(
                              t =>
                                (0, h.isEqualCaseInsensitive)(
                                  t.symbol,
                                  null == e ? void 0 : e.symbol
                                ) &&
                                !(0, h.isEqualCaseInsensitive)(
                                  t.address,
                                  null == e ? void 0 : e.address
                                )
                            );
                            return Boolean(n);
                          });
                          return Boolean(n);
                        })(w, _) &&
                        o.default.createElement(i.BannerAlert, {
                          marginTop: 4,
                          severity: k.Severity.Warning,
                          description: t('reusedTokenNameWarning'),
                        }),
                      [w, _, t]
                    ),
                    D = (0, o.useCallback)(async () => {
                      await Promise.all(
                        w.map(async ({ requestData: { asset: e }, id: t }) => {
                          await n((0, y.resolvePendingApproval)(t, null)),
                            I({
                              event: v.MetaMetricsEventName.TokenAdded,
                              category: v.MetaMetricsEventCategory.Wallet,
                              sensitiveProperties: {
                                token_symbol: e.symbol,
                                token_contract_address: e.address,
                                token_decimal_precision: e.decimals,
                                unlisted: e.unlisted,
                                source: v.MetaMetricsTokenEventSource.Dapp,
                                token_standard: x.TokenStandard.ERC20,
                                asset_type: x.AssetType.token,
                              },
                            });
                        })
                      ),
                        E.push(C);
                    }, [n, E, I, C, w]),
                    A = (0, o.useCallback)(async () => {
                      await Promise.all(
                        w.map(({ id: e }) =>
                          n(
                            (0, y.rejectPendingApproval)(
                              e,
                              (0, s.serializeError)(s.providerErrors.userRejectedRequest())
                            )
                          )
                        )
                      ),
                        E.push(C);
                    }, [n, E, C, w]);
                  return (
                    (0, o.useEffect)(() => {
                      w.length || E.push(C);
                    }, []),
                    o.default.createElement(
                      'div',
                      { className: 'page-container' },
                      o.default.createElement(b.Nav, { confirmationId: S }),
                      o.default.createElement(
                        'div',
                        { className: 'page-container__header' },
                        o.default.createElement(
                          'div',
                          { className: 'page-container__title' },
                          t('addSuggestedTokens')
                        ),
                        o.default.createElement(
                          'div',
                          { className: 'page-container__subtitle' },
                          t('likeToImportTokens')
                        ),
                        M,
                        P
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'page-container__content' },
                        o.default.createElement(
                          'div',
                          { className: 'confirm-add-suggested-token' },
                          o.default.createElement(
                            'div',
                            { className: 'confirm-add-suggested-token__header' },
                            o.default.createElement(
                              'div',
                              { className: 'confirm-add-suggested-token__token' },
                              t('token')
                            ),
                            o.default.createElement(
                              'div',
                              { className: 'confirm-add-suggested-token__balance' },
                              t('balance')
                            )
                          ),
                          o.default.createElement(
                            'div',
                            { className: 'confirm-add-suggested-token__token-list' },
                            w.map(({ requestData: { asset: e } }) => {
                              return o.default.createElement(
                                'div',
                                {
                                  className: 'confirm-add-suggested-token__token-list-item',
                                  key: e.address,
                                },
                                o.default.createElement(
                                  'div',
                                  {
                                    className:
                                      'confirm-add-suggested-token__token confirm-add-suggested-token__data',
                                  },
                                  o.default.createElement(l.default, {
                                    className: 'confirm-add-suggested-token__token-icon',
                                    diameter: 48,
                                    address: e.address,
                                    image: e.image,
                                  }),
                                  o.default.createElement(
                                    'div',
                                    { className: 'confirm-add-suggested-token__name' },
                                    ((t = e.name),
                                    (n = e.symbol),
                                    t === undefined ? n : `${t} (${n})`)
                                  )
                                ),
                                o.default.createElement(
                                  'div',
                                  { className: 'confirm-add-suggested-token__balance' },
                                  o.default.createElement(c.default, { token: e })
                                )
                              );
                              var t, n;
                            })
                          )
                        )
                      ),
                      o.default.createElement(u.PageContainerFooter, {
                        cancelText: t('cancel'),
                        submitText: t('addToken'),
                        onCancel: A,
                        onSubmit: D,
                        disabled: 0 === w.length,
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirm-add-suggested-token/confirm-add-suggested-token.js',
      },
    ],
    [
      7078,
      { './confirm-add-suggested-token': 7077 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./confirm-add-suggested-token')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirm-add-suggested-token/index.js' },
    ],
    [
      7079,
      {
        '../../../shared/constants/common': 5791,
        '../../../shared/constants/copy': 5792,
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/constants/time': 5817,
        '../../../shared/modules/Numeric': 5853,
        '../../components/app/account-list-item': 5898,
        '../../components/component-library': 6402,
        '../../components/ui/page-container': 6783,
        '../../components/ui/tooltip': 6818,
        '../../contexts/metametrics': 6836,
        '../../ducks/confirm-transaction/confirm-transaction.duck': 6853,
        '../../ducks/history/history': 6857,
        '../../ducks/metamask/metamask': 6860,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/useI18nContext': 6985,
        '../../hooks/useScrollRequired': 7003,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        '../confirmations/components/confirm/nav': 7197,
        classnames: 4168,
        'copy-to-clipboard': 4209,
        lodash: 4921,
        loglevel: 4929,
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
                var o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = D(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = P(e('prop-types')),
                  r = P(e('copy-to-clipboard')),
                  s = P(e('classnames')),
                  i = P(e('loglevel')),
                  l = e('react-redux'),
                  c = e('react-router-dom'),
                  u = e('lodash'),
                  d = P(e('../../components/app/account-list-item')),
                  m = P(e('../../components/ui/tooltip')),
                  f = e('../../components/ui/page-container'),
                  p = e('../../ducks/history/history'),
                  g = e('../../ducks/metamask/metamask'),
                  h = e('../../../shared/constants/metametrics'),
                  y = e('../../../shared/constants/time'),
                  v = e('../../../shared/modules/Numeric'),
                  x = e('../../../shared/constants/common'),
                  T = e('../../components/component-library'),
                  k = e('../../../shared/constants/copy'),
                  b = e('../../hooks/useI18nContext'),
                  E = e('../../hooks/useScrollRequired'),
                  C = e('../../contexts/metametrics'),
                  w = e('../../helpers/constants/design-system'),
                  _ = e('../../ducks/confirm-transaction/confirm-transaction.duck'),
                  I = e('../../store/actions'),
                  S = e('../../selectors'),
                  M = e('../confirmations/components/confirm/nav');
                function P(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function D(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (D = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const A = ({ approvalId: e }) => {
                    const t = (0, b.useI18nContext)();
                    return o.default.createElement(
                      o.default.Fragment,
                      null,
                      o.default.createElement(M.Nav, { confirmationId: e }),
                      o.default.createElement(
                        'div',
                        { className: 'request-decrypt-message__header' },
                        o.default.createElement('div', {
                          className: 'request-decrypt-message__header-background',
                        }),
                        o.default.createElement(
                          'div',
                          { className: 'request-decrypt-message__header__text' },
                          t('decryptRequest')
                        ),
                        o.default.createElement(
                          'div',
                          { className: 'request-decrypt-message__header__tip-container' },
                          o.default.createElement('div', {
                            className: 'request-decrypt-message__header__tip',
                          })
                        )
                      )
                    );
                  },
                  F = ({ fromAccount: e, nativeCurrency: t }) => {
                    const n = (0, b.useI18nContext)(),
                      a = new v.Numeric(e.balance, 16, x.EtherDenomination.WEI)
                        .toDenomination(x.EtherDenomination.ETH)
                        .round(6)
                        .toBase(10)
                        .toString();
                    return o.default.createElement(
                      'div',
                      { className: 'request-decrypt-message__account-info' },
                      o.default.createElement(
                        'div',
                        { className: 'request-decrypt-message__account' },
                        o.default.createElement(
                          'div',
                          { className: 'request-decrypt-message__account-text' },
                          `${n('account')}:`
                        ),
                        o.default.createElement(
                          'div',
                          { className: 'request-decrypt-message__account-item' },
                          o.default.createElement(d.default, { account: e })
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'request-decrypt-message__balance' },
                        o.default.createElement(
                          'div',
                          { className: 'request-decrypt-message__balance-text' },
                          `${n('balance')}:`
                        ),
                        o.default.createElement(
                          'div',
                          { className: 'request-decrypt-message__balance-value' },
                          `${a} ${t}`
                        )
                      )
                    );
                  };
                F.propTypes = {
                  fromAccount: a.default.shape({ balance: a.default.string.isRequired }).isRequired,
                  nativeCurrency: a.default.string.isRequired,
                };
                const O = ({ name: e, notice: t, targetSubjectMetadata: n }) =>
                  o.default.createElement(
                    'div',
                    { className: 'request-decrypt-message__visual' },
                    o.default.createElement(
                      'section',
                      null,
                      null != n && n.iconUrl
                        ? o.default.createElement('img', {
                            className: 'request-decrypt-message__visual-identicon',
                            src: n.iconUrl,
                            alt: '',
                          })
                        : o.default.createElement(
                            'i',
                            { className: 'request-decrypt-message__visual-identicon--default' },
                            e.charAt(0).toUpperCase()
                          ),
                      o.default.createElement(
                        'div',
                        { className: 'request-decrypt-message__notice' },
                        t
                      )
                    )
                  );
                O.propTypes = {
                  name: a.default.string.isRequired,
                  notice: a.default.string.isRequired,
                  targetSubjectMetadata: a.default.shape({ iconUrl: a.default.string }),
                };
                const R = ({
                  isScrollable: e,
                  isScrolledToBottom: t,
                  hasDecrypted: n,
                  hasError: a,
                  scrollToBottom: r,
                }) => {
                  const s = (0, b.useI18nContext)();
                  return n && !a && e && !t
                    ? o.default.createElement(T.ButtonIcon, {
                        ariaLabel: s('scrollDown'),
                        backgroundColor: w.BackgroundColor.primaryDefault,
                        borderRadius: w.BorderRadius.full,
                        className: 'scroll-to-bottom__button',
                        color: w.IconColor.primaryInverse,
                        'data-testid': 'scroll-to-bottom',
                        display: w.Display.Flex,
                        iconName: T.IconName.Arrow2Down,
                        onClick: r,
                        size: T.ButtonIconSize.Md,
                      })
                    : null;
                };
                R.propTypes = {
                  isScrollable: a.default.bool.isRequired,
                  isScrolledToBottom: a.default.bool.isRequired,
                  hasDecrypted: a.default.bool.isRequired,
                  hasError: a.default.bool.isRequired,
                  scrollToBottom: a.default.func.isRequired,
                };
                const N = (0, o.forwardRef)(
                  (
                    {
                      isScrollable: e,
                      isScrolledToBottom: t,
                      onScroll: n,
                      rawMessage: a,
                      scrollToBottom: i,
                      setRawMessage: c,
                      messageData: u,
                    },
                    d
                  ) => {
                    const f = (0, l.useDispatch)(),
                      p = (0, o.useContext)(C.MetaMetricsContext),
                      g = (0, b.useI18nContext)(),
                      [v, x] = (0, o.useState)(!1),
                      [E, _] = (0, o.useState)(!1),
                      [S, M] = (0, o.useState)(!1),
                      [P, D] = (0, o.useState)(!1),
                      [A, F] = (0, o.useState)('');
                    return o.default.createElement(
                      'div',
                      { className: 'request-decrypt-message__message-container' },
                      o.default.createElement(
                        'div',
                        { className: 'request-decrypt-message__message' },
                        o.default.createElement(
                          'div',
                          {
                            className: 'request-decrypt-message__message-text',
                            ref: d,
                            onScroll: n,
                          },
                          S || P ? a : u.msgParams.data,
                          P ? A : ''
                        ),
                        o.default.createElement('div', {
                          className: (0, s.default)('request-decrypt-message__message-cover', {
                            'request-decrypt-message__message-lock--pressed': S || P,
                          }),
                        }),
                        o.default.createElement(
                          'div',
                          {
                            className: (0, s.default)('request-decrypt-message__message-lock', {
                              'request-decrypt-message__message-lock--pressed': S || P,
                            }),
                            'data-testid': 'message-lock',
                            onClick: async e => {
                              e.stopPropagation(e);
                              const t = u.msgParams;
                              t.metamaskId = u.id;
                              const n = await f((0, I.decryptMsgInline)(t));
                              n.error
                                ? (D(!0), F(g('decryptInlineError', [n.error])))
                                : (M(!0), c(n.rawSig));
                            },
                          },
                          o.default.createElement(
                            'div',
                            { className: 'request-decrypt-message__message-lock__container' },
                            o.default.createElement('i', {
                              className:
                                'fa fa-lock fa-lg request-decrypt-message__message-lock__container__icon',
                            }),
                            o.default.createElement(
                              'div',
                              {
                                className: 'request-decrypt-message__message-lock__container__text',
                              },
                              g('decryptMetamask')
                            )
                          )
                        )
                      ),
                      o.default.createElement(R, {
                        isScrollable: e,
                        hasError: P,
                        hasDecrypted: S,
                        isScrolledToBottom: t,
                        scrollToBottom: i,
                      }),
                      S
                        ? o.default.createElement(
                            'div',
                            {
                              className: (0, s.default)({
                                'request-decrypt-message__message-copy': !0,
                                'request-decrypt-message__message-copy--pressed': v,
                              }),
                              onClick: () => {
                                (0, r.default)(a, k.COPY_OPTIONS),
                                  p({
                                    category: h.MetaMetricsEventCategory.Messages,
                                    event: 'Copy',
                                    properties: {
                                      action: 'Decrypt Message Copy',
                                      legacy_event: !0,
                                    },
                                  }),
                                  _(!0),
                                  setTimeout(() => _(!1), 3 * y.SECOND);
                              },
                              onMouseDown: () => x(!0),
                              onMouseUp: () => x(!1),
                              'data-testid': 'message-copy',
                            },
                            o.default.createElement(
                              m.default,
                              {
                                position: 'bottom',
                                title: g(E ? 'copiedExclamation' : 'copyToClipboard'),
                                wrapperClassName: 'request-decrypt-message__message-copy-tooltip',
                                style: { display: 'flex', alignItems: 'center' },
                              },
                              o.default.createElement(
                                'div',
                                { className: 'request-decrypt-message__message-copy-text' },
                                g('decryptCopy')
                              ),
                              o.default.createElement(T.Icon, {
                                name: E ? T.IconName.CopySuccess : T.IconName.Copy,
                                color: w.IconColor.primaryDefault,
                              })
                            )
                          )
                        : o.default.createElement('div', null)
                    );
                  }
                );
                (N.displayName = 'MessageBody'),
                  (N.propTypes = {
                    isScrollable: a.default.bool.isRequired,
                    isScrolledToBottom: a.default.bool.isRequired,
                    onScroll: a.default.func.isRequired,
                    rawMessage: a.default.string.isRequired,
                    scrollToBottom: a.default.func.isRequired,
                    setRawMessage: a.default.func.isRequired,
                    messageData: a.default.shape({
                      msgParams: a.default.shape({
                        data: a.default.string.isRequired,
                        from: a.default.string.isRequired,
                        origin: a.default.string.isRequired,
                      }).isRequired,
                      id: a.default.string.isRequired,
                    }).isRequired,
                  });
                const B = ({
                  hasScrolledToBottom: e,
                  isScrollable: t,
                  mostRecentOverviewPage: n,
                  messageData: a,
                }) => {
                  const r = (0, l.useDispatch)(),
                    s = (0, c.useHistory)(),
                    i = (0, b.useI18nContext)(),
                    u = (0, o.useContext)(C.MetaMetricsContext);
                  return o.default.createElement(f.PageContainerFooter, {
                    cancelText: i('cancel'),
                    submitText: i('decrypt'),
                    disabled: t && !e,
                    onCancel: async e => {
                      e.stopPropagation(e),
                        await r((0, I.cancelDecryptMsg)(a)),
                        u({
                          category: h.MetaMetricsEventCategory.Messages,
                          event: 'Cancel',
                          properties: { action: 'Decrypt Message Request', legacy_event: !0 },
                        }),
                        r((0, _.clearConfirmTransaction)()),
                        s.push(n);
                    },
                    onSubmit: async e => {
                      e.stopPropagation(e);
                      const t = a.msgParams;
                      (t.metamaskId = a.id),
                        await r((0, I.decryptMsg)(t)),
                        u({
                          category: h.MetaMetricsEventCategory.Messages,
                          event: 'Confirm',
                          properties: { action: 'Decrypt Message Request', legacy_event: !0 },
                        }),
                        r((0, _.clearConfirmTransaction)()),
                        s.push(n);
                    },
                  });
                };
                B.propTypes = {
                  hasScrolledToBottom: a.default.bool.isRequired,
                  isScrollable: a.default.bool.isRequired,
                  mostRecentOverviewPage: a.default.string.isRequired,
                  messageData: a.default.shape({
                    msgParams: a.default.shape({
                      data: a.default.string.isRequired,
                      from: a.default.string.isRequired,
                      origin: a.default.string.isRequired,
                    }).isRequired,
                    id: a.default.string.isRequired,
                  }).isRequired,
                };
                n.default = () => {
                  const e = (0, b.useI18nContext)(),
                    [t, n] = (0, o.useState)(''),
                    a = (0, l.useSelector)(p.getMostRecentOverviewPage),
                    r = (0, l.useSelector)(g.getNativeCurrency),
                    { id: s } = (0, c.useParams)(),
                    d = (0, l.useSelector)(S.unconfirmedTransactionsListSelector),
                    m = (0, u.cloneDeep)(d.find(e => e.id === s)),
                    f = (0, l.useSelector)(e => {
                      var t;
                      return (0, S.getTargetAccountWithSendEtherInfo)(
                        e,
                        null == m || null === (t = m.msgParams) || void 0 === t ? void 0 : t.from
                      );
                    }),
                    h = (0, l.useSelector)(e => e.metamask.subjectMetadata || {}),
                    {
                      hasScrolledToBottom: y,
                      isScrollable: v,
                      isScrolledToBottom: x,
                      onScroll: T,
                      scrollToBottom: k,
                      ref: C,
                    } = (0, E.useScrollRequired)([t], { offsetPxFromBottom: 0 });
                  if (!m)
                    return (
                      i.default.warn('ConfirmDecryptMessage Page: Missing messageData prop.'), null
                    );
                  const w = h[m.msgParams.origin],
                    _ = (null == w ? void 0 : w.name) || m.msgParams.origin,
                    I = e('decryptMessageNotice', [m.msgParams.origin]);
                  return o.default.createElement(
                    'div',
                    { className: 'request-decrypt-message__container' },
                    o.default.createElement(A, { approvalId: s }),
                    o.default.createElement(
                      'div',
                      { className: 'request-decrypt-message__body' },
                      o.default.createElement(F, { fromAccount: f, nativeCurrency: r }),
                      o.default.createElement(O, { name: _, notice: I, targetSubjectMetadata: w }),
                      o.default.createElement(N, {
                        isScrollable: v,
                        isScrolledToBottom: x,
                        onScroll: T,
                        rawMessage: t,
                        ref: C,
                        scrollToBottom: k,
                        setRawMessage: n,
                        messageData: m,
                      })
                    ),
                    o.default.createElement(B, {
                      hasScrolledToBottom: y,
                      isScrollable: v,
                      mostRecentOverviewPage: a,
                      messageData: m,
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirm-decrypt-message/confirm-decrypt-message.component.js',
      },
    ],
    [
      708,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/types.js',
      },
    ],
    [
      7080,
      { './confirm-decrypt-message.component': 7079 },
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
                      return a.default;
                    },
                  });
                var o,
                  a =
                    (o = e('./confirm-decrypt-message.component')) && o.__esModule
                      ? o
                      : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirm-decrypt-message/index.js' },
    ],
    [
      7081,
      {
        '../../../shared/constants/common': 5791,
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/modules/Numeric': 5853,
        '../../components/app/account-list-item': 5898,
        '../../components/ui/identicon': 6758,
        '../../components/ui/page-container': 6783,
        '../../components/ui/site-origin': 6800,
        '../confirmations/components/confirm/nav': 7197,
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = p(e('prop-types')),
                  r = p(e('loglevel')),
                  s = p(e('../../components/app/account-list-item')),
                  i = p(e('../../components/ui/identicon')),
                  l = e('../../components/ui/page-container'),
                  c = e('../../../shared/constants/metametrics'),
                  u = p(e('../../components/ui/site-origin')),
                  d = e('../../../shared/modules/Numeric'),
                  m = e('../../../shared/constants/common'),
                  f = e('../confirmations/components/confirm/nav');
                function p(e) {
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
                function h(e, t, n) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                          var o = n.call(e, t || 'default');
                          if ('object' != typeof o) return o;
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
                class y extends o.Component {
                  constructor(...e) {
                    super(...e),
                      h(this, 'renderHeader', () => {
                        var e;
                        const t = null === (e = this.props.txData) || void 0 === e ? void 0 : e.id;
                        return o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(f.Nav, { confirmationId: t }),
                          o.default.createElement(
                            'div',
                            { className: 'request-encryption-public-key__header' },
                            o.default.createElement('div', {
                              className: 'request-encryption-public-key__header-background',
                            }),
                            o.default.createElement(
                              'div',
                              { className: 'request-encryption-public-key__header__text' },
                              this.context.t('encryptionPublicKeyRequest')
                            ),
                            o.default.createElement(
                              'div',
                              { className: 'request-encryption-public-key__header__tip-container' },
                              o.default.createElement('div', {
                                className: 'request-encryption-public-key__header__tip',
                              })
                            )
                          )
                        );
                      }),
                      h(this, 'renderAccount', () => {
                        const { fromAccount: e } = this.props,
                          { t: t } = this.context;
                        return o.default.createElement(
                          'div',
                          { className: 'request-encryption-public-key__account' },
                          o.default.createElement(
                            'div',
                            { className: 'request-encryption-public-key__account-text' },
                            `${t('account')}:`
                          ),
                          o.default.createElement(
                            'div',
                            { className: 'request-encryption-public-key__account-item' },
                            o.default.createElement(s.default, { account: e })
                          )
                        );
                      }),
                      h(this, 'renderBalance', () => {
                        const {
                            nativeCurrency: e,
                            fromAccount: { balance: t },
                          } = this.props,
                          { t: n } = this.context,
                          a = new d.Numeric(t, 16, m.EtherDenomination.WEI)
                            .toDenomination(m.EtherDenomination.ETH)
                            .round(6)
                            .toBase(10)
                            .toString();
                        return o.default.createElement(
                          'div',
                          { className: 'request-encryption-public-key__balance' },
                          o.default.createElement(
                            'div',
                            { className: 'request-encryption-public-key__balance-text' },
                            `${n('balance')}:`
                          ),
                          o.default.createElement(
                            'div',
                            { className: 'request-encryption-public-key__balance-value' },
                            `${a} ${e}`
                          )
                        );
                      }),
                      h(this, 'renderRequestIcon', () => {
                        const { requesterAddress: e } = this.props;
                        return o.default.createElement(
                          'div',
                          { className: 'request-encryption-public-key__request-icon' },
                          o.default.createElement(i.default, { diameter: 40, address: e })
                        );
                      }),
                      h(this, 'renderAccountInfo', () =>
                        o.default.createElement(
                          'div',
                          { className: 'request-encryption-public-key__account-info' },
                          this.renderAccount(),
                          this.renderRequestIcon(),
                          this.renderBalance()
                        )
                      ),
                      h(this, 'renderBody', () => {
                        const { subjectMetadata: e, txData: t } = this.props,
                          { t: n } = this.context,
                          a = e[t.origin],
                          r = n('encryptionPublicKeyNotice', [
                            o.default.createElement(u.default, {
                              siteOrigin: t.origin,
                              key: t.origin,
                            }),
                          ]),
                          s = (null == a ? void 0 : a.hostname) || t.origin;
                        return o.default.createElement(
                          'div',
                          { className: 'request-encryption-public-key__body' },
                          this.renderAccountInfo(),
                          o.default.createElement(
                            'div',
                            { className: 'request-encryption-public-key__visual' },
                            o.default.createElement(
                              'section',
                              null,
                              null != a && a.iconUrl
                                ? o.default.createElement('img', {
                                    className: 'request-encryption-public-key__visual-identicon',
                                    src: a.iconUrl,
                                    alt: '',
                                  })
                                : o.default.createElement(
                                    'i',
                                    {
                                      className:
                                        'request-encryption-public-key__visual-identicon--default',
                                    },
                                    s.charAt(0).toUpperCase()
                                  ),
                              o.default.createElement(
                                'div',
                                { className: 'request-encryption-public-key__notice' },
                                r
                              )
                            )
                          )
                        );
                      }),
                      h(this, 'renderFooter', () => {
                        const {
                            cancelEncryptionPublicKey: e,
                            clearConfirmTransaction: t,
                            encryptionPublicKey: n,
                            history: a,
                            mostRecentOverviewPage: r,
                            txData: s,
                          } = this.props,
                          { t: i, trackEvent: u } = this.context;
                        return o.default.createElement(l.PageContainerFooter, {
                          cancelText: i('cancel'),
                          submitText: i('provide'),
                          onCancel: async n => {
                            await e(s, n),
                              u({
                                category: c.MetaMetricsEventCategory.Messages,
                                event: 'Cancel',
                                properties: {
                                  action: 'Encryption public key Request',
                                  legacy_event: !0,
                                },
                              }),
                              t(),
                              a.push(r);
                          },
                          onSubmit: async e => {
                            await n(s, e),
                              this.context.trackEvent({
                                category: c.MetaMetricsEventCategory.Messages,
                                event: 'Confirm',
                                properties: {
                                  action: 'Encryption public key Request',
                                  legacy_event: !0,
                                },
                              }),
                              t(),
                              a.push(r);
                          },
                        });
                      }),
                      h(this, 'render', () =>
                        this.props.txData
                          ? o.default.createElement(
                              'div',
                              { className: 'request-encryption-public-key__container' },
                              this.renderHeader(),
                              this.renderBody(),
                              this.renderFooter()
                            )
                          : (r.default.warn(
                              'ConfirmEncryptionPublicKey Page: Missing txData prop.'
                            ),
                            null)
                      );
                  }
                }
                (n.default = y),
                  h(y, 'contextTypes', {
                    t: a.default.func.isRequired,
                    trackEvent: a.default.func.isRequired,
                  }),
                  h(y, 'propTypes', {
                    fromAccount: a.default.shape({
                      address: a.default.string.isRequired,
                      balance: a.default.string,
                      name: a.default.string,
                    }).isRequired,
                    clearConfirmTransaction: a.default.func.isRequired,
                    cancelEncryptionPublicKey: a.default.func.isRequired,
                    encryptionPublicKey: a.default.func.isRequired,
                    history: a.default.object.isRequired,
                    requesterAddress: a.default.string,
                    txData: a.default.object,
                    subjectMetadata: a.default.object,
                    mostRecentOverviewPage: a.default.string.isRequired,
                    nativeCurrency: a.default.string.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirm-encryption-public-key/confirm-encryption-public-key.component.js',
      },
    ],
    [
      7082,
      {
        '../../ducks/confirm-transaction/confirm-transaction.duck': 6853,
        '../../ducks/history/history': 6857,
        '../../ducks/metamask/metamask': 6860,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        './confirm-encryption-public-key.component': 7081,
        'react-redux': 5286,
        'react-router-dom': 5313,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o,
                  a = e('react-redux'),
                  r = e('redux'),
                  s = e('react-router-dom'),
                  i = e('../../store/actions'),
                  l = e('../../selectors'),
                  c = e('../../ducks/confirm-transaction/confirm-transaction.duck'),
                  u = e('../../ducks/history/history'),
                  d = e('../../ducks/metamask/metamask'),
                  m =
                    (o = e('./confirm-encryption-public-key.component')) && o.__esModule
                      ? o
                      : { default: o };
                n.default = (0, r.compose)(
                  s.withRouter,
                  (0, a.connect)(
                    function (e, t) {
                      const {
                          metamask: { subjectMetadata: n = {} },
                        } = e,
                        o = (0, l.unconfirmedTransactionsListSelector)(e),
                        {
                          match: {
                            params: { id: a },
                          },
                        } = t,
                        r = o.find(e => e.id === a);
                      return {
                        txData: r,
                        subjectMetadata: n,
                        fromAccount: (0, l.getTargetAccountWithSendEtherInfo)(
                          e,
                          null == r ? void 0 : r.msgParams
                        ),
                        requester: null,
                        requesterAddress: null,
                        mostRecentOverviewPage: (0, u.getMostRecentOverviewPage)(e),
                        nativeCurrency: (0, d.getNativeCurrency)(e),
                      };
                    },
                    function (e) {
                      return {
                        goHome: () => e((0, i.goHome)()),
                        clearConfirmTransaction: () => e((0, c.clearConfirmTransaction)()),
                        encryptionPublicKey: (t, n) => {
                          const o = { data: t.msgParams, metamaskId: t.id };
                          return n.stopPropagation(), e((0, i.encryptionPublicKeyMsg)(o));
                        },
                        cancelEncryptionPublicKey: (t, n) => (
                          n.stopPropagation(), e((0, i.cancelEncryptionPublicKeyMsg)(t))
                        ),
                      };
                    }
                  )
                )(m.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirm-encryption-public-key/confirm-encryption-public-key.container.js',
      },
    ],
    [
      7083,
      { './confirm-encryption-public-key.container': 7082 },
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
                      return a.default;
                    },
                  });
                var o,
                  a =
                    (o = e('./confirm-encryption-public-key.container')) && o.__esModule
                      ? o
                      : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirm-encryption-public-key/index.js' },
    ],
    [
      7084,
      {
        '../../../../components/ui/form-field': 6740,
        '../../../../contexts/i18n': 6832,
        '../../../../helpers/constants/gas': 6874,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = u);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = l(e('prop-types')),
                  r = e('../../../../contexts/i18n'),
                  s = l(e('../../../../components/ui/form-field')),
                  i = e('../../../../helpers/constants/gas');
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
                function u({
                  onManualChange: e,
                  gasLimit: t,
                  setGasLimit: n,
                  gasPrice: a,
                  setGasPrice: l,
                  gasErrors: c,
                  minimumGasLimit: u,
                }) {
                  const d = (0, o.useContext)(r.I18nContext);
                  return o.default.createElement(
                    'div',
                    { className: 'advanced-gas-controls' },
                    o.default.createElement(s.default, {
                      titleText: d('gasLimit'),
                      error:
                        null != c && c.gasLimit
                          ? (0, i.getGasFormErrorText)(c.gasLimit, d, { minimumGasLimit: u })
                          : null,
                      onChange: t => {
                        null == e || e(), n(t);
                      },
                      tooltipText: d('editGasLimitTooltip'),
                      value: t,
                      allowDecimals: !1,
                      numeric: !0,
                    }),
                    o.default.createElement(
                      o.default.Fragment,
                      null,
                      o.default.createElement(s.default, {
                        titleText: d('advancedGasPriceTitle'),
                        titleUnit: '(GWEI)',
                        onChange: t => {
                          null == e || e(), l(t);
                        },
                        tooltipText: d('editGasPriceTooltip'),
                        value: a,
                        numeric: !0,
                        allowDecimals: !0,
                        error:
                          null != c && c.gasPrice
                            ? (0, i.getGasFormErrorText)(c.gasPrice, d)
                            : null,
                      })
                    )
                  );
                }
                u.propTypes = {
                  onManualChange: a.default.func,
                  gasLimit: a.default.number,
                  setGasLimit: a.default.func,
                  gasPrice: a.default.string,
                  setGasPrice: a.default.func,
                  minimumGasLimit: a.default.string,
                  gasErrors: a.default.object,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-controls/advanced-gas-controls.component.js',
      },
    ],
    [
      7085,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../../shared/modules/Numeric': 5853,
        '../../../../../components/component-library': 6402,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../../../store/actions': 7619,
        '../../../hooks/useTransactionEventFragment': 7350,
        '../context': 7101,
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('lodash'),
                  s = e('../../../hooks/useTransactionEventFragment'),
                  i = e('../../../../../../shared/constants/gas'),
                  l = e('../../../../../helpers/constants/design-system'),
                  c = e('../../../../../selectors'),
                  u = e('../../../../../store/actions'),
                  d = e('../../../../../contexts/gasFee'),
                  m = e('../context'),
                  f = e('../../../../../hooks/useI18nContext'),
                  p = e('../../../../../components/component-library'),
                  g = e('../../../../../../shared/modules/Numeric');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, f.useI18nContext)(),
                    t = (0, a.useDispatch)(),
                    {
                      gasErrors: n,
                      maxBaseFee: h,
                      maxPriorityFeePerGas: y,
                    } = (0, m.useAdvancedGasFeePopoverContext)(),
                    v = new g.Numeric(h, 10).toString(),
                    x = new g.Numeric(y, 10).toString(),
                    T = (0, a.useSelector)(c.getAdvancedGasFeeValues),
                    { updateTransactionEventFragment: k } = (0, s.useTransactionEventFragment)(),
                    { editGasMode: b, transaction: E } = (0, d.useGasFeeContext)(),
                    { chainId: C } = E,
                    w = (0, a.useSelector)(e => (0, c.selectNetworkIdentifierByChainId)(e, C)),
                    [_, I] = (0, o.useState)(
                      Boolean(T) && T.maxBaseFee === v && T.priorityFee === x
                    );
                  (0, o.useEffect)(() => {
                    I(Boolean(T) && T.maxBaseFee === v && T.priorityFee === x);
                  }, [T, v, x]);
                  return b === i.EditGasModes.swaps
                    ? null
                    : o.default.createElement(
                        p.Box,
                        {
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Row,
                          marginTop: 4,
                          marginLeft: 2,
                          marginRight: 2,
                          paddingTop: 4,
                          paddingBottom: 4,
                          className: 'advanced-gas-fee-defaults',
                        },
                        o.default.createElement(p.Checkbox, {
                          isChecked: _,
                          onChange: () => {
                            _
                              ? (t(
                                  (0, u.setAdvancedGasFee)({
                                    chainId: C,
                                    gasFeePreferences: undefined,
                                  })
                                ),
                                I(!1),
                                k({
                                  properties: {
                                    advanced_gas_defaults_updated_maxbasefee: null,
                                    advanced_gas_defaults_updated_priorityfee: null,
                                  },
                                }))
                              : (t(
                                  (0, u.setAdvancedGasFee)({
                                    chainId: C,
                                    gasFeePreferences: { maxBaseFee: v, priorityFee: x },
                                  })
                                ),
                                k({
                                  properties: {
                                    advanced_gas_defaults_updated_maxbasefee: v,
                                    advanced_gas_defaults_updated_priorityfee: x,
                                  },
                                }));
                          },
                          isDisabled: n.maxFeePerGas || n.maxPriorityFeePerGas,
                          label: e('advancedGasFeeDefaultOptIn', [(0, r.capitalize)(w)]),
                        })
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-defaults/advanced-gas-fee-defaults.js',
      },
    ],
    [
      7086,
      { './advanced-gas-fee-defaults': 7085 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./advanced-gas-fee-defaults')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-defaults/index.js',
      },
    ],
    [
      7087,
      {
        '../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../components/component-library': 6402,
        '../../../../../components/ui/button': 6707,
        '../../../../../components/ui/form-field': 6740,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/util': 6921,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../constants': 7293,
        '../../../send/send.constants': 7361,
        '../context': 7101,
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
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../../../contexts/gasFee'),
                  r = e('../../../../../helpers/utils/util'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  l = e('../../../send/send.constants'),
                  c = g(e('../../../../../components/ui/button')),
                  u = g(e('../../../../../components/ui/form-field')),
                  d = e('../context'),
                  m = e('../../../../../components/component-library'),
                  f = e('../../../constants'),
                  p = e('../../../../../../shared/modules/conversion.utils');
                function g(e) {
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
                  const e = (0, i.useI18nContext)(),
                    { setGasLimit: t, setErrorValue: n } = (0, d.useAdvancedGasFeePopoverContext)(),
                    {
                      gasLimit: g,
                      minimumGasLimitDec: h,
                      transaction: { chainId: y, originalGasEstimate: v },
                    } = (0, a.useGasFeeContext)(),
                    x = v !== undefined && (0, p.hexToDecimal)(v),
                    [T, k] = (0, o.useState)(
                      x ? Math.max(l.MAX_GAS_LIMIT_DEC, x) : l.MAX_GAS_LIMIT_DEC
                    ),
                    [b, E] = (0, o.useState)(!1),
                    [C, w] = (0, o.useState)(g),
                    [_, I] = (0, o.useState)(),
                    S = e => {
                      w(e || 0);
                    };
                  return (
                    (0, o.useEffect)(() => {
                      if ((t(C), f.IGNORE_GAS_LIMIT_CHAIN_IDS.includes(y))) return;
                      const e = ((e, t, n) =>
                        (0, r.bnLessThan)(e, t) || (0, r.bnGreaterThan)(e, n)
                          ? 'editGasLimitOutOfBoundsV2'
                          : null)(C, h, T);
                      I(e),
                        E(!0 === b ? b : null !== e),
                        n('gasLimit', 'editGasLimitOutOfBoundsV2' === e);
                    }, [y, C, h, t, n, T, b, e]),
                    (0, o.useEffect)(() => {
                      x && k(Math.max(l.MAX_GAS_LIMIT_DEC, x));
                    }, [h, x, k]),
                    b
                      ? o.default.createElement(u.default, {
                          dataTestId: 'gas-limit-input',
                          error: _ ? e(_, [h - 1, T]) : '',
                          onChange: S,
                          titleText: e('gasLimitV2'),
                          value: C,
                          allowDecimals: !1,
                          numeric: !0,
                        })
                      : o.default.createElement(
                          m.Text,
                          {
                            tag: s.TextVariant.bodyMd,
                            variant: s.TextVariant.bodySm,
                            as: 'h6',
                            className: 'advanced-gas-fee-gas-limit',
                            marginTop: 4,
                            marginLeft: 2,
                            marginRight: 2,
                          },
                          o.default.createElement('strong', null, e('gasLimitV2')),
                          o.default.createElement('span', null, C),
                          o.default.createElement(
                            c.default,
                            {
                              'data-testid': 'advanced-gas-fee-edit',
                              className: 'advanced-gas-fee-gas-limit__edit-link',
                              onClick: () => E(!0),
                              type: 'link',
                            },
                            e('edit')
                          )
                        )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-gas-limit/advanced-gas-fee-gas-limit.js',
      },
    ],
    [
      7088,
      { './advanced-gas-fee-gas-limit': 7087 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./advanced-gas-fee-gas-limit')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-gas-limit/index.js',
      },
    ],
    [
      7089,
      {
        '../../../../../components/ui/box': 6703,
        '../../../../../components/ui/loading-heartbeat': 6764,
        '../../../../../contexts/i18n': 6832,
        '../../../../../helpers/utils/gas': 6902,
        '../../../../../helpers/utils/util': 6921,
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = d(e('prop-types')),
                  r = d(e('classnames')),
                  s = e('../../../../../helpers/utils/util'),
                  i = e('../../../../../helpers/utils/gas'),
                  l = e('../../../../../contexts/i18n'),
                  c = d(e('../../../../../components/ui/box')),
                  u = d(e('../../../../../components/ui/loading-heartbeat'));
                function d(e) {
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
                const f = ({ latest: e, historical: t, trend: n }) => {
                  const a = (0, o.useContext)(l.I18nContext),
                    d = (function (e, t) {
                      switch (e) {
                        case 'up':
                          return {
                            className: 'fa-arrow-up advanced-gas-fee-input-subtext__up',
                            color: 'var(--color-success-default)',
                            title: t('upArrow'),
                          };
                        case 'down':
                          return {
                            className: 'fa-arrow-down advanced-gas-fee-input-subtext__down',
                            color: 'var(--color-error-default)',
                            title: t('downArrow'),
                          };
                        case 'level':
                          return {
                            className: 'fa-arrow-right advanced-gas-fee-input-subtext__level',
                            color: 'var(--color-icon-alternative)',
                            title: t('levelArrow'),
                          };
                        default:
                          return null;
                      }
                    })(n, a);
                  return o.default.createElement(
                    c.default,
                    {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      className: 'advanced-gas-fee-input-subtext',
                    },
                    (0, s.isNullish)(e)
                      ? null
                      : o.default.createElement(
                          c.default,
                          { display: 'flex', alignItems: 'center', 'data-testid': 'latest' },
                          o.default.createElement(
                            'span',
                            { className: 'advanced-gas-fee-input-subtext__label' },
                            a('currentTitle')
                          ),
                          o.default.createElement(
                            'span',
                            { className: 'advanced-gas-fee-input-subtext__value' },
                            o.default.createElement(u.default, null),
                            (0, i.formatGasFeeOrFeeRange)(e)
                          ),
                          null === d
                            ? null
                            : o.default.createElement(
                                'span',
                                { className: 'advanced-gas-fee-input-subtext__icon' },
                                o.default.createElement('i', {
                                  className: (0, r.default)('fa', d.className),
                                  style: { color: d.color },
                                  title: d.title,
                                  'data-testid': 'fee-arrow',
                                })
                              )
                        ),
                    (0, s.isNullish)(t)
                      ? null
                      : o.default.createElement(
                          c.default,
                          null,
                          o.default.createElement(
                            'span',
                            {
                              className: 'advanced-gas-fee-input-subtext__label',
                              'data-testid': 'historical',
                            },
                            a('twelveHrTitle')
                          ),
                          o.default.createElement(
                            'span',
                            { className: 'advanced-gas-fee-input-subtext__value' },
                            o.default.createElement(u.default, null),
                            (0, i.formatGasFeeOrFeeRange)(t)
                          )
                        )
                  );
                };
                f.propTypes = {
                  latest: a.default.oneOfType([
                    a.default.string,
                    a.default.arrayOf(a.default.string),
                  ]),
                  historical: a.default.oneOfType([
                    a.default.string,
                    a.default.arrayOf(a.default.string),
                  ]),
                  trend: a.default.oneOf(['up', 'down', 'level']),
                };
                n.default = f;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-input-subtext/advanced-gas-fee-input-subtext.js',
      },
    ],
    [
      709,
      { './lib': 706 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.patchTags = void 0);
                const o = e('./lib'),
                  a = [];
                n.patchTags = e => {
                  e.forEach(e => {
                    a.find(t => t === e) ||
                      ((0, o.addSemanticEncode)(e, t => {
                        if (t instanceof o.DataItem && t.getTag() === e) return t.getData();
                      }),
                      (0, o.addSemanticDecode)(e, t => new o.DataItem(t, e)),
                      a.push(e));
                  });
                };
              };
            };
      },
      {
        package: '@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry',
        file: 'node_modules/@keystonehq/bc-ur-registry/dist/utils.js',
      },
    ],
    [
      7090,
      { './advanced-gas-fee-input-subtext': 7089 },
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
                      return a.default;
                    },
                  });
                var o,
                  a =
                    (o = e('./advanced-gas-fee-input-subtext')) && o.__esModule
                      ? o
                      : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-input-subtext/index.js',
      },
    ],
    [
      7091,
      {
        '../../../../../components/ui/box': 6703,
        './base-fee-input': 7093,
        './priority-fee-input': 7095,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = i(e('react')),
                  a = i(e('../../../../../components/ui/box')),
                  r = i(e('./base-fee-input')),
                  s = i(e('./priority-fee-input'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () =>
                  o.default.createElement(
                    a.default,
                    { className: 'advanced-gas-fee-inputs' },
                    o.default.createElement(r.default, null),
                    o.default.createElement(s.default, null)
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-inputs/advanced-gas-fee-inputs.js',
      },
    ],
    [
      7092,
      {
        '../../../../../../../shared/constants/gas': 5795,
        '../../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../components/ui/box': 6703,
        '../../../../../../components/ui/form-field': 6740,
        '../../../../../../contexts/gasFee': 6831,
        '../../../../../../helpers/constants/common': 6870,
        '../../../../../../hooks/useCurrencyDisplay': 6974,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../hooks/useUserPreferencedCurrency': 7020,
        '../../../../../../selectors': 7601,
        '../../../../constants': 7293,
        '../../../../send/send.constants': 7361,
        '../../advanced-gas-fee-input-subtext': 7090,
        '../../context': 7101,
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
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../send/send.constants'),
                  s = e('../../../../../../../shared/constants/gas'),
                  i = e('../../../../../../helpers/constants/common'),
                  l = e('../../../../../../selectors'),
                  c = e('../../../../../../contexts/gasFee'),
                  u = e('../../../../../../hooks/useI18nContext'),
                  d = e('../../../../../../hooks/useUserPreferencedCurrency'),
                  m = e('../../../../../../hooks/useCurrencyDisplay'),
                  f = T(e('../../../../../../components/ui/box')),
                  p = T(e('../../../../../../components/ui/form-field')),
                  g = e('../../context'),
                  h = T(e('../../advanced-gas-fee-input-subtext')),
                  y = e('../../../../../../../shared/modules/conversion.utils'),
                  v = e('../../../../../../../shared/modules/Numeric'),
                  x = e('../../../../constants');
                function T(e) {
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
                n.default = () => {
                  const e = (0, u.useI18nContext)(),
                    {
                      gasFeeEstimates: t,
                      estimateUsed: n,
                      maxFeePerGas: T,
                      editGasMode: k,
                      transaction: { chainId: b },
                    } = (0, c.useGasFeeContext)(),
                    E = new v.Numeric(T, 10).toString(),
                    {
                      gasLimit: C,
                      maxPriorityFeePerGas: w,
                      setErrorValue: _,
                      setMaxFeePerGas: I,
                      setMaxBaseFee: S,
                    } = (0, g.useAdvancedGasFeePopoverContext)(),
                    { estimatedBaseFee: M, historicalBaseFeeRange: P, baseFeeTrend: D } = t ?? {},
                    [A, F] = (0, o.useState)(),
                    { currency: O, numberOfDecimals: R } = (0, d.useUserPreferencedCurrency)(
                      i.PRIMARY
                    ),
                    N = (0, a.useSelector)(l.getAdvancedGasFeeValues),
                    B =
                      n !== s.PriorityLevels.custom &&
                      null != N &&
                      N.maxBaseFee &&
                      k !== s.EditGasModes.swaps
                        ? N.maxBaseFee
                        : E,
                    [j, G] = (0, o.useState)(B > 0 ? B : undefined);
                  (0, o.useEffect)(() => {
                    j === undefined && B > 0 && G(B);
                  }, [j, B, G]);
                  const [$] = (0, m.useCurrencyDisplay)((0, y.decGWEIToHexWEI)(j * C), {
                      currency: O,
                      numberOfDecimals: R,
                    }),
                    W = (0, o.useCallback)(
                      e => {
                        G(e);
                      },
                      [G]
                    );
                  return (
                    (0, o.useEffect)(() => {
                      I(j);
                      const e = ((e, t, n, o) => {
                        const a = new v.Numeric(e, 10);
                        return new v.Numeric(n, 10).greaterThan(a)
                          ? 'editGasMaxBaseFeeGWEIImbalance'
                          : null != t &&
                              t.low &&
                              a.lessThan(t.low.suggestedMaxFeePerGas, 10) &&
                              x.IGNORE_GAS_LIMIT_CHAIN_IDS.includes(o)
                            ? 'editGasMaxBaseFeeLow'
                            : null != t &&
                                t.high &&
                                a.greaterThan(
                                  t.high.suggestedMaxFeePerGas * r.HIGH_FEE_WARNING_MULTIPLIER,
                                  10
                                )
                              ? 'editGasMaxBaseFeeHigh'
                              : null;
                      })(j, t, w, b);
                      F(e), _('maxFeePerGas', 'editGasMaxBaseFeeGWEIImbalance' === e), S(j);
                    }, [j, b, t, w, F, _, I, S]),
                    o.default.createElement(
                      f.default,
                      { className: 'base-fee-input', marginLeft: 2, marginRight: 2 },
                      o.default.createElement(p.default, {
                        dataTestId: 'base-fee-input',
                        error: A ? e(A) : '',
                        onChange: W,
                        titleText: e('maxBaseFee'),
                        titleUnit: `(${e('gwei')})`,
                        tooltipText: e('advancedBaseGasFeeToolTip'),
                        value: j,
                        detailText: `≈ ${$}`,
                        allowDecimals: !0,
                        numeric: !0,
                      }),
                      o.default.createElement(h.default, { latest: M, historical: P, trend: D })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-inputs/base-fee-input/base-fee-input.js',
      },
    ],
    [
      7093,
      { './base-fee-input': 7092 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./base-fee-input')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-inputs/base-fee-input/index.js',
      },
    ],
    [
      7094,
      { './advanced-gas-fee-inputs': 7091 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./advanced-gas-fee-inputs')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-inputs/index.js',
      },
    ],
    [
      7095,
      { './priority-fee-input': 7096 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./priority-fee-input')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-inputs/priority-fee-input/index.js',
      },
    ],
    [
      7096,
      {
        '../../../../../../../shared/constants/gas': 5795,
        '../../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../components/ui/box': 6703,
        '../../../../../../components/ui/form-field': 6740,
        '../../../../../../contexts/gasFee': 6831,
        '../../../../../../helpers/constants/common': 6870,
        '../../../../../../hooks/useCurrencyDisplay': 6974,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../hooks/useUserPreferencedCurrency': 7020,
        '../../../../../../selectors': 7601,
        '../../../../constants': 7293,
        '../../../../send/send.constants': 7361,
        '../../advanced-gas-fee-input-subtext': 7090,
        '../../context': 7101,
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
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../send/send.constants'),
                  s = e('../../../../../../../shared/constants/gas'),
                  i = e('../../../../../../helpers/constants/common'),
                  l = e('../../../../../../selectors'),
                  c = e('../../../../../../hooks/useCurrencyDisplay'),
                  u = e('../../../../../../contexts/gasFee'),
                  d = e('../../../../../../hooks/useI18nContext'),
                  m = e('../../../../../../hooks/useUserPreferencedCurrency'),
                  f = T(e('../../../../../../components/ui/form-field')),
                  p = T(e('../../../../../../components/ui/box')),
                  g = e('../../context'),
                  h = T(e('../../advanced-gas-fee-input-subtext')),
                  y = e('../../../../../../../shared/modules/conversion.utils'),
                  v = e('../../../../../../../shared/modules/Numeric'),
                  x = e('../../../../constants');
                function T(e) {
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
                n.default = () => {
                  const e = (0, d.useI18nContext)(),
                    t = (0, a.useSelector)(l.getAdvancedGasFeeValues),
                    {
                      gasLimit: n,
                      setErrorValue: T,
                      setMaxPriorityFeePerGas: k,
                    } = (0, g.useAdvancedGasFeePopoverContext)(),
                    {
                      editGasMode: b,
                      estimateUsed: E,
                      gasFeeEstimates: C,
                      maxPriorityFeePerGas: w,
                      transaction: { chainId: _ },
                    } = (0, u.useGasFeeContext)(),
                    I = new v.Numeric(w, 10).toString(),
                    {
                      latestPriorityFeeRange: S,
                      historicalPriorityFeeRange: M,
                      priorityFeeTrend: P,
                    } = C ?? {},
                    [D, A] = (0, o.useState)(),
                    F =
                      E !== s.PriorityLevels.custom &&
                      null != t &&
                      t.priorityFee &&
                      b !== s.EditGasModes.swaps
                        ? t.priorityFee
                        : I,
                    [O, R] = (0, o.useState)(F > 0 ? F : undefined);
                  (0, o.useEffect)(() => {
                    O === undefined && F > 0 && R(F);
                  }, [O, F, R]);
                  const { currency: N, numberOfDecimals: B } = (0, m.useUserPreferencedCurrency)(
                      i.PRIMARY
                    ),
                    [j] = (0, c.useCurrencyDisplay)((0, y.decGWEIToHexWEI)(O * n), {
                      currency: N,
                      numberOfDecimals: B,
                    });
                  return (
                    (0, o.useEffect)(() => {
                      k(O);
                      const e = ((e, t, n) => {
                        const o = new v.Numeric(e, 10);
                        return o.lessThan(0, 10)
                          ? 'editGasMaxPriorityFeeBelowMinimumV2'
                          : null != t &&
                              t.low &&
                              o.lessThan(t.low.suggestedMaxPriorityFeePerGas, 10) &&
                              x.IGNORE_GAS_LIMIT_CHAIN_IDS.includes(n)
                            ? 'editGasMaxPriorityFeeLowV2'
                            : null != t &&
                                t.high &&
                                o.greaterThan(
                                  t.high.suggestedMaxPriorityFeePerGas *
                                    r.HIGH_FEE_WARNING_MULTIPLIER,
                                  10
                                )
                              ? 'editGasMaxPriorityFeeHighV2'
                              : null;
                      })(O, C, _);
                      T('maxPriorityFeePerGas', 'editGasMaxPriorityFeeBelowMinimumV2' === e), A(e);
                    }, [_, C, O, T, k, A]),
                    o.default.createElement(
                      p.default,
                      {
                        marginTop: 4,
                        marginLeft: 2,
                        marginRight: 2,
                        className: 'priority-fee-input',
                      },
                      o.default.createElement(f.default, {
                        dataTestId: 'priority-fee-input',
                        error: D ? e(D) : '',
                        onChange: e => {
                          R(e);
                        },
                        titleText: e('priorityFeeProperCase'),
                        titleUnit: `(${e('gwei')})`,
                        tooltipText: e('advancedPriorityFeeToolTip'),
                        value: O,
                        detailText: `≈ ${j}`,
                        allowDecimals: !0,
                        numeric: !0,
                      }),
                      o.default.createElement(h.default, { latest: S, historical: M, trend: P })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-inputs/priority-fee-input/priority-fee-input.js',
      },
    ],
    [
      7097,
      {
        '../../../../components/ui/box': 6703,
        '../../../../components/ui/popover': 6789,
        '../../../../contexts/transaction-modal': 6840,
        '../../../../hooks/useI18nContext': 6985,
        './advanced-gas-fee-defaults': 7086,
        './advanced-gas-fee-gas-limit': 7088,
        './advanced-gas-fee-inputs': 7094,
        './advanced-gas-fee-save': 7099,
        './context': 7101,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = f(e('react')),
                  a = e('../../../../hooks/useI18nContext'),
                  r = e('../../../../contexts/transaction-modal'),
                  s = f(e('../../../../components/ui/box')),
                  i = f(e('../../../../components/ui/popover')),
                  l = e('./context'),
                  c = f(e('./advanced-gas-fee-inputs')),
                  u = f(e('./advanced-gas-fee-gas-limit')),
                  d = f(e('./advanced-gas-fee-save')),
                  m = f(e('./advanced-gas-fee-defaults'));
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const e = (0, a.useI18nContext)(),
                    { closeAllModals: t, currentModal: n } = (0, r.useTransactionModalContext)();
                  return 'advancedGasFee' !== n
                    ? null
                    : o.default.createElement(
                        l.AdvancedGasFeePopoverContextProvider,
                        null,
                        o.default.createElement(
                          i.default,
                          {
                            className: 'advanced-gas-fee-popover',
                            title: e('advancedGasFeeModalTitle'),
                            onClose: t,
                            footer: o.default.createElement(d.default, null),
                          },
                          o.default.createElement(
                            s.default,
                            { margin: 4 },
                            o.default.createElement(c.default, null),
                            o.default.createElement(m.default, null),
                            o.default.createElement(u.default, null)
                          )
                        )
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-popover.js',
      },
    ],
    [
      7098,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../components/ui/button': 6707,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../contexts/transaction-modal': 6840,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../hooks/useTransactionEventFragment': 7350,
        '../context': 7101,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = m(e('react')),
                  a = e('../../../../../../shared/constants/gas'),
                  r = e('../../../../../../shared/modules/conversion.utils'),
                  s = e('../../../../../contexts/transaction-modal'),
                  i = e('../../../../../contexts/gasFee'),
                  l = e('../../../hooks/useTransactionEventFragment'),
                  c = e('../../../../../hooks/useI18nContext'),
                  u = m(e('../../../../../components/ui/button')),
                  d = e('../context');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { closeModal: e } = (0, s.useTransactionModalContext)(),
                    { updateTransactionEventFragment: t } = (0, l.useTransactionEventFragment)(),
                    { updateTransaction: n } = (0, i.useGasFeeContext)(),
                    m = (0, c.useI18nContext)(),
                    {
                      gasLimit: f,
                      hasErrors: p,
                      maxFeePerGas: g,
                      maxPriorityFeePerGas: h,
                    } = (0, d.useAdvancedGasFeePopoverContext)();
                  return o.default.createElement(
                    u.default,
                    {
                      type: 'primary',
                      disabled: p,
                      onClick: () => {
                        n({
                          estimateUsed: a.PriorityLevels.custom,
                          maxFeePerGas: (0, r.decGWEIToHexWEI)(g),
                          maxPriorityFeePerGas: (0, r.decGWEIToHexWEI)(h),
                          gasLimit: f,
                        }),
                          t({ properties: { gas_edit_type: 'advanced' } }),
                          e(['advancedGasFee', 'editGasFee']);
                      },
                    },
                    m('save')
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-save/advanced-gas-fee-save.js',
      },
    ],
    [
      7099,
      { './advanced-gas-fee-save': 7098 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./advanced-gas-fee-save')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/advanced-gas-fee-save/index.js',
      },
    ],
    [
      7100,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AdvancedGasFeePopoverContextProvider = n.AdvancedGasFeePopoverContext =
                    void 0),
                  (n.useAdvancedGasFeePopoverContext = function () {
                    return (0, a.useContext)(i);
                  });
                var o,
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = s(t);
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
                  r = (o = e('prop-types')) && o.__esModule ? o : { default: o };
                function s(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (s = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const i = (n.AdvancedGasFeePopoverContext = (0, a.createContext)({})),
                  l = ({ children: e }) => {
                    const [t, n] = (0, a.useState)(),
                      [o, r] = (0, a.useState)(),
                      [s, l] = (0, a.useState)(),
                      [c, u] = (0, a.useState)({
                        maxFeePerGas: !1,
                        maxPriorityFeePerGas: !1,
                        gasLimit: !1,
                      }),
                      d = (0, a.useCallback)(
                        (e, t) => {
                          c[e] !== t && u({ ...c, [e]: t });
                        },
                        [c, u]
                      ),
                      [m, f] = (0, a.useState)();
                    return a.default.createElement(
                      i.Provider,
                      {
                        value: {
                          gasLimit: t,
                          hasErrors: c.maxFeePerGas || c.maxPriorityFeePerGas || c.gasLimit,
                          gasErrors: c,
                          maxFeePerGas: o,
                          maxPriorityFeePerGas: s,
                          setErrorValue: d,
                          maxBaseFee: m,
                          setGasLimit: n,
                          setMaxPriorityFeePerGas: l,
                          setMaxFeePerGas: r,
                          setMaxBaseFee: f,
                        },
                      },
                      e
                    );
                  };
                (n.AdvancedGasFeePopoverContextProvider = l),
                  (l.propTypes = { children: r.default.node.isRequired });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/context/advancedGasFeePopover.js',
      },
    ],
    [
      7101,
      { './advancedGasFeePopover': 7100 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./advancedGasFeePopover');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/context/index.js',
      },
    ],
    [
      7102,
      { './advanced-gas-fee-popover': 7097 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./advanced-gas-fee-popover')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/advanced-gas-fee-popover/index.js',
      },
    ],
    [
      7103,
      {
        '../../../../../../shared/constants/security-provider': 5811,
        '../../../../../components/component-library': 6402,
        '../../../../../components/ui/icon/preloader': 6751,
        '../../../hooks/useCurrentSignatureSecurityAlertResponse': 7331,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = l(e('react')),
                  a = l(e('../../../../../components/ui/icon/preloader')),
                  r = e('../../../../../../shared/constants/security-provider'),
                  s = e('../../../../../components/component-library'),
                  i = l(e('../../../hooks/useCurrentSignatureSecurityAlertResponse'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const e = (0, i.default)();
                  return (null == e ? void 0 : e.result_type) !== r.BlockaidResultType.Loading
                    ? null
                    : o.default.createElement(
                        s.Box,
                        { marginInline: 'auto', marginTop: 4 },
                        o.default.createElement(a.default, { size: 18 })
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/blockaid-loading-indicator/blockaid-loading-indicator.tsx',
      },
    ],
    [
      7104,
      { './blockaid-loading-indicator': 7103 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'BlockaidLoadingIndicator', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./blockaid-loading-indicator')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/blockaid-loading-indicator/index.ts',
      },
    ],
    [
      7105,
      {
        '../../../../../components/app/alert-system/contexts/alertActionHandler': 5905,
        '../../../../../components/app/alert-system/contexts/alertMetricsContext': 5906,
        '../../../hooks/setConfirmationAlerts': 7318,
        '../../../hooks/useConfirmationAlertActions': 7324,
        '../../../hooks/useConfirmationAlertMetrics': 7325,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = c(e('react')),
                  a = e('../../../../../components/app/alert-system/contexts/alertActionHandler'),
                  r = c(e('../../../hooks/useConfirmationAlertActions')),
                  s = c(e('../../../hooks/setConfirmationAlerts')),
                  i = e('../../../../../components/app/alert-system/contexts/alertMetricsContext'),
                  l = e('../../../hooks/useConfirmationAlertMetrics');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = ({ children: e }) => {
                  const {
                      trackAlertActionClicked: t,
                      trackAlertRender: n,
                      trackInlineAlertClicked: c,
                    } = (0, l.useConfirmationAlertMetrics)(),
                    u = (0, r.default)();
                  return (
                    (0, s.default)(),
                    o.default.createElement(
                      i.AlertMetricsProvider,
                      {
                        metrics: {
                          trackAlertActionClicked: t,
                          trackAlertRender: n,
                          trackInlineAlertClicked: c,
                        },
                      },
                      o.default.createElement(
                        a.AlertActionHandlerProvider,
                        { onProcessAction: u },
                        e
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/confirm-alerts/confirm-alerts.tsx',
      },
    ],
    [
      7106,
      { './confirm-alerts': 7105 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ConfirmAlerts', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./confirm-alerts')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/confirm-alerts/index.tsx',
      },
    ],
    [
      7107,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../../components/app/alert-system/confirm-alert-modal': 5904,
        '../../../../../components/component-library': 6402,
        '../../../../../components/multichain/pages/page': 6652,
        '../../../../../ducks/confirm-transaction/confirm-transaction.duck': 6853,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useAlerts': 6968,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../../../store/actions': 7619,
        '../../../context/confirm': 7294,
        '../../../hooks/transactions/useTransactionConfirm': 7320,
        '../../../hooks/useOriginThrottling': 7344,
        '../../../utils': 7364,
        '../info/hooks/useIsUpgradeTransaction': 7138,
        '../utils': 7216,
        './origin-throttle-modal': 7109,
        './upgrade-cancel-modal': 7110,
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
                var o = e('@metamask/rpc-errors'),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  s = e('../../../../../../shared/constants/metametrics'),
                  i = e('../../../../../../shared/lib/confirmation.utils'),
                  l = e('../../../../../components/app/alert-system/confirm-alert-modal'),
                  c = e('../../../../../components/component-library'),
                  u = e('../../../../../components/multichain/pages/page'),
                  d = e('../../../../../ducks/confirm-transaction/confirm-transaction.duck'),
                  m = e('../../../../../helpers/constants/design-system'),
                  f = w(e('../../../../../hooks/useAlerts')),
                  p = e('../../../../../hooks/useI18nContext'),
                  g = e('../../../../../selectors'),
                  h = e('../../../../../store/actions'),
                  y = e('../../../context/confirm'),
                  v = e('../../../hooks/useOriginThrottling'),
                  x = e('../../../utils'),
                  T = e('../utils'),
                  k = e('../info/hooks/useIsUpgradeTransaction'),
                  b = e('../../../hooks/transactions/useTransactionConfirm'),
                  E = e('./upgrade-cancel-modal'),
                  C = w(e('./origin-throttle-modal'));
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
                function I(e, t, n) {
                  return !!t || (!e && n);
                }
                const S = ({ alertOwnerId: e = '', disabled: t, onSubmit: n, onCancel: o }) => {
                  const r = (0, p.useI18nContext)(),
                    [s, i] = (0, a.useState)(!1),
                    {
                      alerts: u,
                      hasDangerAlerts: d,
                      hasUnconfirmedDangerAlerts: g,
                      hasUnconfirmedFieldDangerAlerts: h,
                      unconfirmedFieldDangerAlerts: y,
                    } = (0, f.default)(e),
                    v = u.some(e => e.severity === m.Severity.Danger && e.isBlocking),
                    x = (0, a.useCallback)(() => {
                      i(!1);
                    }, []),
                    T = (0, a.useCallback)(() => {
                      i(!0);
                    }, []);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    s &&
                      a.default.createElement(l.ConfirmAlertModal, {
                        ownerId: e,
                        onClose: x,
                        onCancel: o,
                        onSubmit: n,
                      }),
                    d
                      ? a.default.createElement(
                          c.Button,
                          {
                            block: !0,
                            danger: !0,
                            'data-testid': 'confirm-footer-button',
                            disabled: I(g, v, t),
                            onClick: T,
                            size: c.ButtonSize.Lg,
                            startIconName: h ? c.IconName.SecuritySearch : c.IconName.Danger,
                          },
                          (function (e, t) {
                            return 1 === e.length
                              ? t('reviewAlert')
                              : e.length > 1
                                ? t('reviewAlerts')
                                : t('confirm');
                          })(y, r)
                        )
                      : a.default.createElement(
                          c.Button,
                          {
                            block: !0,
                            'data-testid': 'confirm-footer-button',
                            disabled: t,
                            onClick: n,
                            size: c.ButtonSize.Lg,
                          },
                          r('confirm')
                        )
                  );
                };
                n.default = () => {
                  const e = (0, r.useDispatch)(),
                    t = (0, p.useI18nContext)(),
                    [n, l] = (0, a.useState)(!1),
                    { onTransactionConfirm: f } = (0, b.useTransactionConfirm)(),
                    { currentConfirmation: w, isScrollToBottomCompleted: _ } = (0,
                    y.useConfirmContext)(),
                    { from: I } = (0, T.getConfirmationSender)(w),
                    { shouldThrottleOrigin: M } = (0, v.useOriginThrottling)(),
                    [P, D] = (0, a.useState)(!1),
                    { id: A } = w || {},
                    F = (0, r.useSelector)(
                      e => !!I && (0, g.doesAddressRequireLedgerHidConnection)(e, I)
                    ),
                    O = (0, x.isSignatureTransactionType)(w),
                    R = (0, k.useIsUpgradeTransaction)(),
                    N = (!_ && !O) || F,
                    B = (0, a.useCallback)(
                      ({ location: t } = {}) => {
                        if (!A) return;
                        const n = o.providerErrors.userRejectedRequest();
                        n.data = { location: t };
                        const a = (0, o.serializeError)(n);
                        e((0, h.rejectPendingApproval)(A, a));
                      },
                      [A, e]
                    ),
                    j = (0, a.useCallback)(() => {
                      e((0, h.updateCustomNonce)('')),
                        e((0, h.setNextNonce)('')),
                        e((0, d.clearConfirmTransaction)());
                    }, [e]),
                    G = (0, a.useCallback)(
                      ({ location: e }) => {
                        w && (R ? l(!0) : (B({ location: e }), j()));
                      },
                      [w, R, B, j]
                    ),
                    $ = (0, a.useCallback)(() => {
                      if (!w) return;
                      (0, i.isCorrectDeveloperTransactionType)(null == w ? void 0 : w.type)
                        ? f()
                        : e((0, h.resolvePendingApproval)(w.id, undefined)),
                        j();
                    }, [w, e, f, j]),
                    W = (0, a.useCallback)(() => {
                      M ? D(!0) : G({ location: s.MetaMetricsEventLocation.Confirmation });
                    }, [G, M]);
                  return a.default.createElement(
                    u.Footer,
                    {
                      className: 'confirm-footer_page-footer',
                      flexDirection: m.FlexDirection.Column,
                    },
                    a.default.createElement(C.default, { isOpen: P, onConfirmationCancel: G }),
                    a.default.createElement(E.UpgradeCancelModal, {
                      isOpen: n,
                      onClose: () => l(!1),
                      onReject: B,
                    }),
                    a.default.createElement(
                      c.Box,
                      { display: m.Display.Flex, flexDirection: m.FlexDirection.Row, gap: 4 },
                      a.default.createElement(
                        c.Button,
                        {
                          block: !0,
                          'data-testid': 'confirm-footer-cancel-button',
                          onClick: W,
                          size: c.ButtonSize.Lg,
                          variant: c.ButtonVariant.Secondary,
                          endIconName: R ? c.IconName.ArrowDown : undefined,
                        },
                        t('cancel')
                      ),
                      a.default.createElement(S, {
                        alertOwnerId: null == w ? void 0 : w.id,
                        onSubmit: () => $(),
                        disabled: N,
                        onCancel: G,
                      })
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/footer/footer.tsx' },
    ],
    [
      7108,
      { './footer': 7107 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./footer')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/footer/index.tsx' },
    ],
    [
      7109,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../components/component-library': 6402,
        '../../../../../components/ui/origin-pill/origin-pill': 6782,
        '../../../../../contexts/i18n': 6832,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useModalProps': 6989,
        '../../../hooks/useOriginThrottling': 7344,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function ({ isOpen: e, onConfirmationCancel: t }) {
                    const { hideModal: n } = (0, r.useModalProps)(),
                      [o, i] = (0, a.useState)(!1);
                    return a.default.createElement(
                      s.Modal,
                      {
                        isOpen: e,
                        onClose: () => {
                          n();
                        },
                        isClosedOnOutsideClick: !1,
                        isClosedOnEscapeKey: !1,
                      },
                      a.default.createElement(s.ModalOverlay, { 'data-testid': 'modal-overlay' }),
                      o
                        ? a.default.createElement(p, { onConfirmationCancel: t })
                        : a.default.createElement(f, {
                            onConfirmationCancel: t,
                            setIsTemporaryBlock: i,
                          })
                    );
                  });
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../../../hooks/useModalProps'),
                  s = e('../../../../../components/component-library'),
                  i = e('../../../../../helpers/constants/design-system'),
                  l = e('../../../../../contexts/i18n'),
                  c = e('../../../hooks/useOriginThrottling'),
                  u =
                    (o = e('../../../../../components/ui/origin-pill/origin-pill')) && o.__esModule
                      ? o
                      : { default: o },
                  d = e('../../../../../../shared/constants/metametrics');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const f = ({ onConfirmationCancel: e, setIsTemporaryBlock: t }) => {
                    const n = (0, a.useContext)(l.I18nContext),
                      { origin: o, resetOrigin: r } = (0, c.useOriginThrottling)();
                    return a.default.createElement(
                      s.ModalContent,
                      { size: s.ModalContentSize.Md },
                      a.default.createElement(
                        s.Box,
                        {
                          justifyContent: i.JustifyContent.center,
                          display: i.Display.Flex,
                          marginBottom: 4,
                        },
                        a.default.createElement(s.Icon, {
                          name: s.IconName.Warning,
                          size: s.IconSize.Xl,
                          color: i.IconColor.warningDefault,
                        })
                      ),
                      a.default.createElement(
                        s.ModalHeader,
                        { endAccessory: a.default.createElement(a.default.Fragment, null) },
                        n('spamModalTitle')
                      ),
                      a.default.createElement(u.default, {
                        style: { marginTop: 0, marginBottom: 20 },
                        origin: o,
                        dataTestId: 'origin-pill',
                      }),
                      a.default.createElement(
                        s.ModalBody,
                        null,
                        a.default.createElement(
                          s.Text,
                          {
                            textAlign: i.TextAlign.Center,
                            as: 'p',
                            'data-testid': 'confirmation-text',
                          },
                          n('spamModalDescription')
                        )
                      ),
                      a.default.createElement(s.ModalFooter, {
                        paddingTop: 4,
                        onSubmit: () => {
                          e({ location: d.MetaMetricsEventLocation.OriginThrottleModal }), r();
                        },
                        onCancel: () => {
                          t(!0);
                        },
                        containerProps: {
                          alignItems: i.AlignItems.stretch,
                          flexDirection: i.FlexDirection.Column,
                        },
                        submitButtonProps: { children: n('cancel'), size: s.ButtonSize.Lg },
                        cancelButtonProps: {
                          children: n('spamModalTemporaryBlockButton'),
                          size: s.ButtonSize.Lg,
                        },
                      })
                    );
                  },
                  p = ({ onConfirmationCancel: e }) => {
                    const t = (0, a.useContext)(l.I18nContext);
                    return a.default.createElement(
                      s.ModalContent,
                      { size: s.ModalContentSize.Md },
                      a.default.createElement(
                        s.Box,
                        {
                          justifyContent: i.JustifyContent.center,
                          display: i.Display.Flex,
                          marginBottom: 4,
                        },
                        a.default.createElement(s.Icon, {
                          name: s.IconName.Confirmation,
                          size: s.IconSize.Xl,
                          color: i.IconColor.successDefault,
                        })
                      ),
                      a.default.createElement(
                        s.ModalHeader,
                        { endAccessory: a.default.createElement(a.default.Fragment, null) },
                        t('spamModalBlockedTitle')
                      ),
                      a.default.createElement(
                        s.ModalBody,
                        null,
                        a.default.createElement(
                          s.Text,
                          {
                            textAlign: i.TextAlign.Center,
                            as: 'p',
                            'data-testid': 'confirmation-text',
                          },
                          t('spamModalBlockedDescription')
                        )
                      ),
                      a.default.createElement(s.ModalFooter, {
                        paddingTop: 4,
                        onSubmit: () =>
                          e({ location: d.MetaMetricsEventLocation.OriginThrottleModal }),
                        submitButtonProps: { children: t('gotIt'), size: s.ButtonSize.Lg },
                      })
                    );
                  };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/footer/origin-throttle-modal.tsx',
      },
    ],
    [
      7110,
      { './upgrade-cancel-modal': 7111 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'UpgradeCancelModal', {
                    enumerable: !0,
                    get: function () {
                      return o.UpgradeCancelModal;
                    },
                  });
                var o = e('./upgrade-cancel-modal');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/footer/upgrade-cancel-modal/index.ts',
      },
    ],
    [
      7111,
      {
        '../../../../../../components/component-library': 6402,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../helpers/constants/zendesk-url': 6885,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../../../../hooks/useSmartAccountActions': 7347,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.UpgradeCancelModal = function ({ isOpen: e, onClose: t, onReject: n }) {
                    const u = (0, s.useI18nContext)(),
                      { currentConfirmation: d } = (0, i.useConfirmContext)(),
                      { handleRejectUpgrade: m } = (0, c.useSmartAccountActions)();
                    if (!d) return null;
                    return o.default.createElement(
                      a.Modal,
                      {
                        isOpen: e,
                        onClose: t,
                        isClosedOnOutsideClick: !1,
                        isClosedOnEscapeKey: !1,
                      },
                      o.default.createElement(a.ModalOverlay, null),
                      o.default.createElement(
                        a.ModalContent,
                        { size: a.ModalContentSize.Md },
                        o.default.createElement(
                          a.ModalHeader,
                          { onClose: t },
                          u('confirmUpgradeCancelModalTitle')
                        ),
                        o.default.createElement(
                          a.ModalBody,
                          null,
                          o.default.createElement(
                            a.Text,
                            { style: { whiteSpace: 'pre-wrap' } },
                            u('confirmUpgradeCancelModalDescription', [
                              o.default.createElement(
                                'a',
                                {
                                  key: 'learnMoreLink',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  href: l.default.ACCOUNT_UPGRADE,
                                },
                                u('learnMoreUpperCase')
                              ),
                            ])
                          )
                        ),
                        o.default.createElement(
                          a.ModalFooter,
                          null,
                          o.default.createElement(
                            a.Box,
                            {
                              display: r.Display.Flex,
                              flexDirection: r.FlexDirection.Column,
                              alignItems: r.AlignItems.stretch,
                              gap: 4,
                            },
                            o.default.createElement(
                              a.Button,
                              {
                                onClick: m,
                                variant: a.ButtonVariant.Secondary,
                                'data-testid': 'upgrade-cancel-reject-upgrade',
                              },
                              u('confirmUpgradeCancelModalButtonCancelUpgrade')
                            ),
                            o.default.createElement(
                              a.Button,
                              { onClick: n, 'data-testid': 'upgrade-cancel-reject' },
                              u('confirmUpgradeCancelModalButtonCancelTransaction')
                            )
                          )
                        )
                      )
                    );
                  });
                var o = u(e('react')),
                  a = e('../../../../../../components/component-library'),
                  r = e('../../../../../../helpers/constants/design-system'),
                  s = e('../../../../../../hooks/useI18nContext'),
                  i = e('../../../../context/confirm'),
                  l = u(e('../../../../../../helpers/constants/zendesk-url')),
                  c = e('../../../../hooks/useSmartAccountActions');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/footer/upgrade-cancel-modal/upgrade-cancel-modal.tsx',
      },
    ],
    [
      7112,
      {
        '../../../../../components/component-library': 6402,
        '../../../../../components/ui/tooltip': 6818,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../store/actions': 7619,
        '../../../selectors/preferences': 7357,
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
                  (n.AdvancedDetailsButton = void 0);
                var o = d(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../components/component-library'),
                  s = d(e('../../../../../components/ui/tooltip')),
                  i = e('../../../../../helpers/constants/design-system'),
                  l = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../../../store/actions'),
                  u = e('../../../selectors/preferences');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.AdvancedDetailsButton = () => {
                  const e = (0, l.useI18nContext)(),
                    t = (0, a.useDispatch)(),
                    n = (0, a.useSelector)(u.selectConfirmationAdvancedDetailsOpen);
                  return o.default.createElement(
                    r.Box,
                    {
                      backgroundColor: n
                        ? i.BackgroundColor.infoMuted
                        : i.BackgroundColor.transparent,
                      borderRadius: i.BorderRadius.MD,
                      marginRight: 1,
                    },
                    o.default.createElement(
                      s.default,
                      { title: e(n ? 'hideAdvancedDetails' : 'showAdvancedDetails') },
                      o.default.createElement(r.ButtonIcon, {
                        ariaLabel: 'Advanced tx details',
                        color: i.IconColor.iconDefault,
                        iconName: r.IconName.Customize,
                        'data-testid': 'header-advanced-details-button',
                        size: r.ButtonIconSize.Md,
                        onClick: () => {
                          var e;
                          (e = !n), t((0, c.setConfirmationAdvancedDetailsOpen)(e));
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
        file: 'ui/pages/confirmations/components/confirm/header/advanced-details-button.tsx',
      },
    ],
    [
      7113,
      {
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        './advanced-details-button': 7112,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.DAppInitiatedHeader = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../components/component-library'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  l = e('./advanced-details-button');
                n.DAppInitiatedHeader = () => {
                  const e = (0, i.useI18nContext)();
                  return a.default.createElement(
                    r.Box,
                    {
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      justifyContent: s.JustifyContent.center,
                      alignItems: s.AlignItems.center,
                      backgroundColor: s.BackgroundColor.backgroundDefault,
                      padding: 3,
                      style: { zIndex: 2, position: 'relative' },
                    },
                    a.default.createElement(
                      r.Text,
                      { variant: s.TextVariant.headingMd, color: s.TextColor.inherit },
                      e('transferRequest')
                    ),
                    a.default.createElement(
                      r.Box,
                      {
                        paddingRight: 3,
                        style: { marginLeft: 'auto', position: 'absolute', right: 0 },
                      },
                      a.default.createElement(l.AdvancedDetailsButton, null)
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/header/dapp-initiated-header.tsx',
      },
    ],
    [
      7114,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../../components/app/confirm/info/row': 5984,
        '../../../../../components/app/confirm/info/row/currency': 5979,
        '../../../../../components/component-library': 6402,
        '../../../../../components/multichain': 6574,
        '../../../../../components/ui/identicon': 6758,
        '../../../../../components/ui/tooltip/tooltip': 6819,
        '../../../../../contexts/metametrics': 6836,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors/selectors': 7611,
        '../../../context/confirm': 7294,
        '../../../hooks/useBalance': 7323,
        '../../../hooks/useConfirmationRecipientInfo': 7329,
        '../../../utils/confirm': 7363,
        './advanced-details-button': 7112,
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
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../shared/constants/metametrics'),
                  s = e('../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../components/app/confirm/info/row/currency'),
                  l = e('../../../../../components/component-library'),
                  c = e('../../../../../components/multichain'),
                  u = b(e('../../../../../components/ui/tooltip/tooltip')),
                  d = e('../../../../../contexts/metametrics'),
                  m = e('../../../../../helpers/constants/design-system'),
                  f = e('../../../../../hooks/useI18nContext'),
                  p = e('../../../context/confirm'),
                  g = e('../../../hooks/useBalance'),
                  h = b(e('../../../hooks/useConfirmationRecipientInfo')),
                  y = e('../../../utils/confirm'),
                  v = e('../../../../../../shared/lib/confirmation.utils'),
                  x = b(e('../../../../../components/ui/identicon')),
                  T = e('../../../../../selectors/selectors'),
                  k = e('./advanced-details-button');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  var e;
                  const t = (0, o.useContext)(d.MetaMetricsContext),
                    n = (0, a.useSelector)(T.getHDEntropyIndex),
                    [b, E] = o.default.useState(!1),
                    { currentConfirmation: C } = (0, p.useConfirmContext)(),
                    { senderAddress: w, senderName: _ } = (0, h.default)(),
                    I = (0, f.useI18nContext)(),
                    { balance: S } = (0, g.useBalance)(w),
                    M = (0, y.isSignatureTransactionType)(C)
                      ? {
                          location: r.MetaMetricsEventLocation.SignatureConfirmation,
                          signature_type:
                            null == C || null === (e = C.msgParams) || void 0 === e
                              ? void 0
                              : e.signatureMethod,
                          hd_entropy_index: n,
                        }
                      : {
                          location: r.MetaMetricsEventLocation.Transaction,
                          transaction_type: null == C ? void 0 : C.type,
                          hd_entropy_index: n,
                        };
                  const P = (0, v.isCorrectDeveloperTransactionType)(null == C ? void 0 : C.type);
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      l.Box,
                      {
                        display: m.Display.Flex,
                        justifyContent: m.JustifyContent.flexEnd,
                        style: { alignSelf: 'flex-end' },
                      },
                      o.default.createElement(
                        u.default,
                        { position: 'bottom', title: I('accountDetails'), interactive: !0 },
                        o.default.createElement(l.ButtonIcon, {
                          ariaLabel: I('accountDetails'),
                          color: m.IconColor.iconDefault,
                          iconName: l.IconName.Info,
                          size: l.ButtonIconSize.Md,
                          onClick: () => {
                            !(function () {
                              const e = {
                                category: r.MetaMetricsEventCategory.Confirmations,
                                event: r.MetaMetricsEventName.AccountDetailsOpened,
                                properties: { action: 'Confirm Screen', ...M },
                              };
                              t(e);
                            })(),
                              E(!0);
                          },
                          'data-testid': 'header-info__account-details-button',
                        })
                      ),
                      P && o.default.createElement(k.AdvancedDetailsButton, null)
                    ),
                    o.default.createElement(
                      l.Modal,
                      {
                        isOpen: b,
                        onClose: () => E(!1),
                        'data-testid': 'account-details-modal',
                        isClosedOnEscapeKey: !1,
                        isClosedOnOutsideClick: !1,
                      },
                      o.default.createElement(l.ModalOverlay, null),
                      o.default.createElement(
                        l.ModalContent,
                        null,
                        o.default.createElement(
                          l.ModalHeader,
                          null,
                          o.default.createElement(
                            l.Box,
                            {
                              display: m.Display.Flex,
                              justifyContent: m.JustifyContent.center,
                              style: { position: 'relative' },
                            },
                            o.default.createElement(
                              l.Box,
                              {
                                style: { margin: '0 auto' },
                                display: m.Display.Flex,
                                justifyContent: m.JustifyContent.center,
                                flexDirection: m.FlexDirection.Column,
                                alignItems: m.AlignItems.center,
                              },
                              o.default.createElement(x.default, { address: w, diameter: 40 }),
                              o.default.createElement(
                                l.Text,
                                {
                                  fontWeight: m.FontWeight.Bold,
                                  variant: m.TextVariant.bodyMd,
                                  color: m.TextColor.textDefault,
                                  marginTop: 2,
                                  'data-testid': 'confirmation-account-details-modal__account-name',
                                },
                                _
                              )
                            ),
                            o.default.createElement(
                              l.Box,
                              { style: { position: 'absolute', right: 0 } },
                              o.default.createElement(l.ButtonIcon, {
                                ariaLabel: I('close'),
                                iconName: l.IconName.Close,
                                size: l.ButtonIconSize.Sm,
                                className: 'confirm_header__close-button',
                                onClick: () => E(!1),
                                'data-testid': 'confirmation-account-details-modal__close-button',
                              })
                            )
                          )
                        ),
                        o.default.createElement(
                          l.ModalBody,
                          null,
                          o.default.createElement(
                            s.ConfirmInfoRow,
                            { label: 'Account address' },
                            o.default.createElement(c.AddressCopyButton, {
                              address: w,
                              shorten: !0,
                            })
                          ),
                          o.default.createElement(
                            s.ConfirmInfoRow,
                            { label: 'Balance' },
                            o.default.createElement(i.ConfirmInfoRowCurrency, {
                              value: S ?? 0,
                              'data-testid': 'confirmation-account-details-modal__account-balance',
                            })
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
        file: 'ui/pages/confirmations/components/confirm/header/header-info.tsx',
      },
    ],
    [
      7115,
      {
        '../../../../../../shared/constants/app': 5789,
        '../../../../../components/component-library': 6402,
        '../../../../../components/ui/identicon': 6758,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/accounts': 6896,
        '../../../context/confirm': 7294,
        '../../../hooks/useConfirmationNetworkInfo': 7328,
        '../../../hooks/useConfirmationRecipientInfo': 7329,
        './dapp-initiated-header': 7113,
        './header-info': 7114,
        './wallet-initiated-header': 7117,
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
                var o = e('@metamask/transaction-controller'),
                  a = h(e('react')),
                  r = e('../../../../../../shared/constants/app'),
                  s = e('../../../../../components/component-library'),
                  i = h(e('../../../../../components/ui/identicon')),
                  l = e('../../../../../helpers/constants/design-system'),
                  c = e('../../../../../helpers/utils/accounts'),
                  u = e('../../../context/confirm'),
                  d = h(e('../../../hooks/useConfirmationNetworkInfo')),
                  m = h(e('../../../hooks/useConfirmationRecipientInfo')),
                  f = e('./dapp-initiated-header'),
                  p = h(e('./header-info')),
                  g = e('./wallet-initiated-header');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const y = [
                  o.TransactionType.tokenMethodTransfer,
                  o.TransactionType.tokenMethodTransferFrom,
                  o.TransactionType.tokenMethodSafeTransferFrom,
                  o.TransactionType.simpleSend,
                ];
                n.default = () => {
                  const { networkImageUrl: e, networkDisplayName: t } = (0, d.default)(),
                    { senderAddress: n, senderName: o } = (0, m.default)(),
                    { currentConfirmation: h } = (0, u.useConfirmContext)(),
                    v = a.default.createElement(
                      s.Box,
                      {
                        display: l.Display.Flex,
                        className: 'confirm_header__wrapper',
                        alignItems: l.AlignItems.center,
                        justifyContent: l.JustifyContent.spaceBetween,
                        'data-testid': 'confirm-header',
                      },
                      a.default.createElement(
                        s.Box,
                        { alignItems: l.AlignItems.flexStart, display: l.Display.Flex, padding: 4 },
                        a.default.createElement(
                          s.Box,
                          { display: l.Display.Flex, marginTop: 2 },
                          a.default.createElement(i.default, { address: n, diameter: 32 }),
                          a.default.createElement(s.AvatarNetwork, {
                            src: e,
                            name: t,
                            size: s.AvatarNetworkSize.Xs,
                            backgroundColor: (0, c.getAvatarNetworkColor)(t),
                            className: 'confirm_header__avatar-network',
                          })
                        ),
                        a.default.createElement(
                          s.Box,
                          { marginInlineStart: 4 },
                          a.default.createElement(
                            s.Text,
                            {
                              color: l.TextColor.textDefault,
                              variant: l.TextVariant.bodyMdMedium,
                              'data-testid': 'header-account-name',
                            },
                            o
                          ),
                          a.default.createElement(
                            s.Text,
                            {
                              color: l.TextColor.textAlternative,
                              'data-testid': 'header-network-display-name',
                            },
                            t
                          )
                        )
                      ),
                      a.default.createElement(
                        s.Box,
                        { alignItems: l.AlignItems.flexEnd, display: l.Display.Flex, padding: 4 },
                        a.default.createElement(p.default, null)
                      )
                    ),
                    x = (null == h ? void 0 : h.type) && y.includes(h.type),
                    T = (null == h ? void 0 : h.origin) === r.ORIGIN_METAMASK;
                  return x && T
                    ? a.default.createElement(g.WalletInitiatedHeader, null)
                    : x && !T
                      ? a.default.createElement(f.DAppInitiatedHeader, null)
                      : v;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/header/header.tsx' },
    ],
    [
      7116,
      { './header': 7115 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./header')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/header/index.tsx' },
    ],
    [
      7117,
      {
        '../../../../../../shared/constants/transaction': 5819,
        '../../../../../components/component-library': 6402,
        '../../../../../ducks/confirm-transaction/confirm-transaction.duck': 6853,
        '../../../../../ducks/send': 6865,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/constants/routes': 6878,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../store/actions': 7619,
        '../../../context/confirm': 7294,
        './advanced-details-button': 7112,
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
                  (n.WalletInitiatedHeader = void 0);
                var o = e('@metamask/transaction-controller'),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('../../../../../../shared/constants/transaction'),
                  l = e('../../../../../components/component-library'),
                  c = e('../../../../../ducks/confirm-transaction/confirm-transaction.duck'),
                  u = e('../../../../../ducks/send'),
                  d = e('../../../../../helpers/constants/design-system'),
                  m = e('../../../../../helpers/constants/routes'),
                  f = e('../../../../../hooks/useI18nContext'),
                  p = e('../../../../../store/actions'),
                  g = e('../../../context/confirm'),
                  h = e('./advanced-details-button');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.WalletInitiatedHeader = () => {
                  const e = (0, f.useI18nContext)(),
                    t = (0, r.useDispatch)(),
                    n = (0, s.useHistory)(),
                    { currentConfirmation: y } = (0, g.useConfirmContext)(),
                    v = (0, a.useCallback)(async () => {
                      const { id: e } = y,
                        a = y.type === o.TransactionType.simpleSend,
                        r = y.type === o.TransactionType.tokenMethodTransfer,
                        s =
                          y.type === o.TransactionType.tokenMethodTransferFrom ||
                          y.type === o.TransactionType.tokenMethodSafeTransferFrom;
                      let l;
                      (l = a
                        ? i.AssetType.native
                        : r
                          ? i.AssetType.token
                          : s
                            ? i.AssetType.NFT
                            : i.AssetType.unknown),
                        await t((0, u.editExistingTransaction)(l, e.toString())),
                        t((0, c.clearConfirmTransaction)()),
                        t((0, p.showSendTokenPage)()),
                        n.push(m.SEND_ROUTE);
                    }, [y, t, n]);
                  return a.default.createElement(
                    l.Box,
                    {
                      alignItems: d.AlignItems.center,
                      backgroundColor: d.BackgroundColor.backgroundDefault,
                      display: d.Display.Flex,
                      flexDirection: d.FlexDirection.Row,
                      justifyContent: d.JustifyContent.spaceBetween,
                      padding: 3,
                      style: { zIndex: 2 },
                    },
                    a.default.createElement(l.ButtonIcon, {
                      iconName: l.IconName.ArrowLeft,
                      ariaLabel: e('back'),
                      size: l.ButtonIconSize.Md,
                      onClick: v,
                      'data-testid': 'wallet-initiated-header-back-button',
                      color: d.IconColor.iconDefault,
                    }),
                    a.default.createElement(
                      l.Text,
                      { variant: d.TextVariant.headingMd, color: d.TextColor.inherit },
                      e('review')
                    ),
                    a.default.createElement(h.AdvancedDetailsButton, null)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/header/wallet-initiated-header.tsx',
      },
    ],
    [
      7118,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../../../../selectors/preferences': 7357,
        '../../hooks/useTokenTransactionData': 7143,
        '../../shared/network-row/network-row': 7172,
        '../../shared/sign-in-with-row/sign-in-with-row': 7177,
        '../../shared/transaction-details/transaction-details': 7180,
        '../../utils': 7194,
        '../hooks/use-is-nft': 7123,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ApproveDetails = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('react-redux'),
                  s = e('../../../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../../../components/app/confirm/info/row/section'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../context/confirm'),
                  u = e('../../../../../selectors/preferences'),
                  d = e('../../shared/sign-in-with-row/sign-in-with-row'),
                  m = e('../../shared/transaction-details/transaction-details'),
                  f = e('../../utils'),
                  p = e('../hooks/use-is-nft'),
                  g = e('../../hooks/useTokenTransactionData'),
                  h = e('../../shared/network-row/network-row');
                const y = ({ isSetApprovalForAll: e = !1 }) => {
                  var t, n, o;
                  const r = (0, l.useI18nContext)(),
                    { currentConfirmation: i } = (0, c.useConfirmContext)(),
                    { isNFT: u } = (0, p.useIsNFT)(i),
                    d = (0, g.useTokenTransactionData)();
                  if (!d) return null;
                  const m =
                      (null === (t = d.args) || void 0 === t ? void 0 : t._spender) ??
                      (null === (n = d.args) || void 0 === n ? void 0 : n._operator) ??
                      (null === (o = d.args) || void 0 === o ? void 0 : o.spender),
                    { chainId: h } = i;
                  return (0, f.getIsRevokeSetApprovalForAll)(d)
                    ? null
                    : a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(
                          s.ConfirmInfoRow,
                          {
                            label: r(e ? 'permissionFor' : 'spender'),
                            tooltip: r(u ? 'spenderTooltipDesc' : 'spenderTooltipERC20ApproveDesc'),
                            'data-testid': 'confirmation__approve-spender',
                          },
                          a.default.createElement(s.ConfirmInfoRowAddress, {
                            address: m,
                            chainId: h,
                          })
                        ),
                        a.default.createElement(s.ConfirmInfoRowDivider, null)
                      );
                };
                n.ApproveDetails = ({ isSetApprovalForAll: e = !1 }) => {
                  const t = (0, r.useSelector)(u.selectConfirmationAdvancedDetailsOpen);
                  return a.default.createElement(
                    i.ConfirmInfoSection,
                    { 'data-testid': 'confirmation__approve-details' },
                    a.default.createElement(y, { isSetApprovalForAll: e }),
                    a.default.createElement(h.NetworkRow, { isShownWithAlertsOnly: !0 }),
                    a.default.createElement(m.OriginRow, null),
                    a.default.createElement(d.SigningInWithRow, null),
                    t &&
                      a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(m.RecipientRow, null),
                        a.default.createElement(m.MethodDataRow, null)
                      )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/approve-details/approve-details.tsx',
      },
    ],
    [
      7119,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/name': 6109,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../../../../hooks/useAssetDetails': 7321,
        '../../shared/static-simulation/static-simulation': 7178,
        '../../shared/transaction-data/transaction-data': 7179,
        '../hooks/use-approve-token-simulation': 7122,
        '../hooks/use-is-nft': 7123,
        '@metamask/name-controller': 2190,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ApproveStaticSimulation = void 0);
                var o = e('@metamask/name-controller'),
                  a = y(e('react')),
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = y(e('../../../../../../../components/app/name')),
                  i = e('../../../../../../../components/component-library'),
                  l = y(e('../../../../../../../components/ui/tooltip')),
                  c = e('../../../../../../../helpers/constants/design-system'),
                  u = e('../../../../../../../hooks/useI18nContext'),
                  d = e('../../../../../context/confirm'),
                  m = e('../../../../../hooks/useAssetDetails'),
                  f = y(e('../../shared/static-simulation/static-simulation')),
                  p = e('../../shared/transaction-data/transaction-data'),
                  g = e('../hooks/use-approve-token-simulation'),
                  h = e('../hooks/use-is-nft');
                function y(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.ApproveStaticSimulation = ({ setIsOpenEditSpendingCapModal: e }) => {
                  var t, n, y;
                  const v = (0, u.useI18nContext)(),
                    { currentConfirmation: x } = (0, d.useConfirmContext)(),
                    { decimals: T } = (0, m.useAssetDetails)(
                      null == x || null === (t = x.txParams) || void 0 === t ? void 0 : t.to,
                      null == x || null === (n = x.txParams) || void 0 === n ? void 0 : n.from,
                      null == x || null === (y = x.txParams) || void 0 === y ? void 0 : y.data,
                      null == x ? void 0 : x.chainId
                    ),
                    {
                      spendingCap: k,
                      isUnlimitedSpendingCap: b,
                      formattedSpendingCap: E,
                      value: C,
                      pending: w,
                    } = (0, g.useApproveTokenSimulation)(x, T),
                    { isNFT: _ } = (0, h.useIsNFT)(x);
                  if (w) return a.default.createElement(p.Container, { isLoading: !0 });
                  if (!C) return null;
                  const { chainId: I } = x,
                    S = a.default.createElement(
                      i.Text,
                      {
                        'data-testid': 'simulation-token-value',
                        backgroundColor: c.BackgroundColor.backgroundAlternative,
                        borderRadius: c.BorderRadius.XL,
                        paddingInline: 2,
                        textAlign: c.TextAlign.Center,
                        alignItems: c.AlignItems.center,
                      },
                      b ? v('unlimited') : E
                    ),
                    M = a.default.createElement(
                      r.ConfirmInfoRow,
                      { label: v(_ ? 'simulationApproveHeading' : 'spendingCap') },
                      a.default.createElement(
                        i.Box,
                        { style: { marginLeft: 'auto', maxWidth: '100%' } },
                        a.default.createElement(
                          i.Box,
                          { display: c.Display.Flex, alignItems: c.AlignItems.center },
                          !_ &&
                            a.default.createElement(i.ButtonIcon, {
                              color: c.IconColor.primaryDefault,
                              ariaLabel: v('edit'),
                              iconName: i.IconName.Edit,
                              onClick: () => e(!0),
                              size: i.ButtonIconSize.Sm,
                              'data-testid': 'edit-spending-cap-icon',
                            }),
                          a.default.createElement(
                            i.Box,
                            {
                              display: c.Display.Inline,
                              marginInlineEnd: 1,
                              minWidth: c.BlockSize.Zero,
                            },
                            Boolean(b) || k !== E
                              ? a.default.createElement(l.default, { title: k }, S)
                              : S
                          ),
                          a.default.createElement(s.default, {
                            value: x.txParams.to,
                            type: o.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: I,
                          })
                        )
                      )
                    );
                  return a.default.createElement(f.default, {
                    title: v('simulationDetailsTitle'),
                    titleTooltip: v('simulationDetailsTitleTooltip'),
                    description: v(
                      _ ? 'simulationDetailsApproveDesc' : 'simulationDetailsERC20ApproveDesc'
                    ),
                    simulationElements: M,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/approve-static-simulation/approve-static-simulation.tsx',
      },
    ],
    [
      7120,
      {
        '../../../../context/confirm': 7294,
        '../../../../hooks/useAssetDetails': 7321,
        '../shared/advanced-details/advanced-details': 7156,
        '../shared/confirm-loader/confirm-loader': 7157,
        '../shared/gas-fees-section/gas-fees-section': 7170,
        './approve-details/approve-details': 7118,
        './approve-static-simulation/approve-static-simulation': 7119,
        './edit-spending-cap-modal/edit-spending-cap-modal': 7121,
        './hooks/use-approve-token-simulation': 7122,
        './hooks/use-is-nft': 7123,
        './revoke-details/revoke-details': 7124,
        './revoke-static-simulation/revoke-static-simulation': 7125,
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
                var o = e('@metamask/transaction-controller'),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../../context/confirm'),
                  s = e('../../../../hooks/useAssetDetails'),
                  i = e('../shared/advanced-details/advanced-details'),
                  l = e('../shared/confirm-loader/confirm-loader'),
                  c = e('../shared/gas-fees-section/gas-fees-section'),
                  u = e('./approve-details/approve-details'),
                  d = e('./approve-static-simulation/approve-static-simulation'),
                  m = e('./edit-spending-cap-modal/edit-spending-cap-modal'),
                  f = e('./hooks/use-approve-token-simulation'),
                  p = e('./hooks/use-is-nft'),
                  g = e('./revoke-details/revoke-details'),
                  h = e('./revoke-static-simulation/revoke-static-simulation');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const { currentConfirmation: e } = (0, r.useConfirmContext)(),
                    { isNFT: t } = (0, p.useIsNFT)(e),
                    [n, y] = (0, a.useState)(!1),
                    { decimals: v } = (0, s.useAssetDetails)(
                      e.txParams.to,
                      e.txParams.from,
                      e.txParams.data,
                      e.chainId
                    ),
                    { spendingCap: x, pending: T } = (0, f.useApproveTokenSimulation)(e, v),
                    k = '0' === x && e.type === o.TransactionType.tokenMethodApprove;
                  return null != e && e.txParams
                    ? T || (!t && !v)
                      ? a.default.createElement(l.ConfirmLoader, null)
                      : a.default.createElement(
                          a.default.Fragment,
                          null,
                          k
                            ? a.default.createElement(h.RevokeStaticSimulation, null)
                            : a.default.createElement(d.ApproveStaticSimulation, {
                                setIsOpenEditSpendingCapModal: y,
                              }),
                          k
                            ? a.default.createElement(g.RevokeDetails, null)
                            : a.default.createElement(u.ApproveDetails, null),
                          a.default.createElement(c.GasFeesSection, null),
                          a.default.createElement(i.AdvancedDetails, null),
                          a.default.createElement(m.EditSpendingCapModal, {
                            isOpenEditSpendingCapModal: n,
                            setIsOpenEditSpendingCapModal: y,
                          })
                        )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/approve.tsx',
      },
    ],
    [
      7121,
      {
        '../../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../store/actions': 7619,
        '../../../../../confirm-approve/confirm-approve.util': 7259,
        '../../../../../context/confirm': 7294,
        '../../../../../hooks/useAssetDetails': 7321,
        '../hooks/use-approve-token-simulation': 7122,
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
                  (n.EditSpendingCapModal = void 0),
                  (n.countDecimalDigits = h);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../../shared/lib/transactions-controller-utils'),
                  s = e('../../../../../../../../shared/modules/conversion.utils'),
                  i = e('../../../../../../../components/component-library'),
                  l = e('../../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../../../store/actions'),
                  d = e('../../../../../confirm-approve/confirm-approve.util'),
                  m = e('../../../../../context/confirm'),
                  f = e('../../../../../hooks/useAssetDetails'),
                  p = e('../hooks/use-approve-token-simulation');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function h(e) {
                  var t;
                  return (null === (t = e.split('.')[1]) || void 0 === t ? void 0 : t.length) || 0;
                }
                n.EditSpendingCapModal = ({
                  data: e,
                  isOpenEditSpendingCapModal: t,
                  onSubmit: n,
                  setIsOpenEditSpendingCapModal: g,
                  to: y,
                }) => {
                  const v = (0, c.useI18nContext)(),
                    x = (0, a.useDispatch)(),
                    { currentConfirmation: T } = (0, m.useConfirmContext)(),
                    k = T.txParams.to,
                    b = T.txParams.from,
                    E = T.txParams.data,
                    C = y ?? k,
                    w = e ?? E,
                    {
                      userBalance: _,
                      tokenSymbol: I,
                      decimals: S,
                    } = (0, f.useAssetDetails)(C, b, w, T.chainId),
                    M = (0, r.calcTokenAmount)(_ ?? '0', Number(S ?? '0')).toFixed(),
                    P = (0, o.useMemo)(
                      () => ({ ...T, txParams: { ...T.txParams, to: C, from: b, data: w } }),
                      [b, w, T, C]
                    ),
                    { formattedSpendingCap: D, spendingCap: A } = (0, p.useApproveTokenSimulation)(
                      P,
                      S
                    ),
                    [F, O] = (0, o.useState)(A);
                  (0, o.useEffect)(() => {
                    A && O(A);
                  }, [A]);
                  const R = (0, o.useCallback)(() => {
                      g(!1), O(A);
                    }, [g, O, A]),
                    [N, B] = (0, o.useState)(!1),
                    j = (0, o.useCallback)(async () => {
                      var e;
                      B(!0);
                      const t = (0, d.getCustomTxParamsData)(
                        null == P || null === (e = P.txParams) || void 0 === e ? void 0 : e.data,
                        { customPermissionAmount: F || '0', decimals: S || '0' }
                      );
                      if (n) n(t);
                      else {
                        const e = await (0, u.estimateGas)({
                          from: P.txParams.from,
                          to: P.txParams.to,
                          value: P.txParams.value,
                          data: t,
                        });
                        x(
                          (0, u.updateEditableParams)(T.id, {
                            data: t,
                            gas: (0, s.hexToDecimal)(e),
                          })
                        );
                      }
                      B(!1), g(!1), O(A);
                    }, [F, S, x, P, n, g, A, T.id]),
                    G = S && parseInt(S, 10) < h(F),
                    $ = /[-+e]/u.test(F);
                  return o.default.createElement(
                    i.Modal,
                    {
                      isOpen: t,
                      onClose: R,
                      isClosedOnEscapeKey: !0,
                      isClosedOnOutsideClick: !0,
                      className: 'edit-spending-cap-modal',
                    },
                    o.default.createElement(i.ModalOverlay, null),
                    o.default.createElement(
                      i.ModalContent,
                      null,
                      o.default.createElement(
                        i.ModalHeader,
                        {
                          justifyContent: l.JustifyContent.center,
                          childrenWrapperProps: {
                            alignItems: l.AlignItems.center,
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                          },
                        },
                        o.default.createElement(
                          i.Text,
                          { variant: l.TextVariant.headingMd },
                          v('editSpendingCap')
                        )
                      ),
                      o.default.createElement(
                        i.ModalBody,
                        null,
                        o.default.createElement(
                          i.Text,
                          {
                            variant: l.TextVariant.bodyMd,
                            color: l.TextColor.textAlternative,
                            paddingBottom: 4,
                          },
                          v('editSpendingCapDesc')
                        ),
                        o.default.createElement(i.TextField, {
                          type: i.TextFieldType.Number,
                          value: F,
                          onChange: e => O(e.target.value),
                          placeholder: `${D} ${I}`,
                          style: { width: '100%' },
                          inputProps: { 'data-testid': 'custom-spending-cap-input' },
                        }),
                        G &&
                          o.default.createElement(
                            i.Text,
                            {
                              variant: l.TextVariant.bodySm,
                              color: l.TextColor.errorDefault,
                              paddingTop: 1,
                            },
                            v('editSpendingCapError', [S])
                          ),
                        $ &&
                          o.default.createElement(
                            i.Text,
                            {
                              variant: l.TextVariant.bodySm,
                              color: l.TextColor.errorDefault,
                              paddingTop: 1,
                            },
                            v('editSpendingCapSpecialCharError')
                          ),
                        o.default.createElement(
                          i.Text,
                          {
                            variant: l.TextVariant.bodySm,
                            color: l.TextColor.textAlternative,
                            paddingTop: 1,
                          },
                          v('editSpendingCapAccountBalance', [M, I || ''])
                        )
                      ),
                      o.default.createElement(i.ModalFooter, {
                        onSubmit: j,
                        onCancel: R,
                        submitButtonProps: {
                          children: v('save'),
                          loading: N,
                          disabled: G || $ || '' === F,
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
        file: 'ui/pages/confirmations/components/confirm/info/approve/edit-spending-cap-modal/edit-spending-cap-modal.tsx',
      },
    ],
    [
      7122,
      {
        '../../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../../ducks/locale/locale': 6859,
        '../../../../simulation-details/formatAmount': 7244,
        '../../shared/constants': 7158,
        './use-is-nft': 7123,
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
                  (n.isSpendingCapUnlimited = m),
                  (n.useApproveTokenSimulation = void 0);
                var o = e('bignumber.js'),
                  a = e('react'),
                  r = e('react-redux'),
                  s = e('../../../../../../../../shared/lib/transactions-controller-utils'),
                  i = e('../../../../../../../ducks/locale/locale'),
                  l = e('../../../../simulation-details/formatAmount'),
                  c = e('../../shared/constants'),
                  u = e('../../../../../../../../shared/modules/transaction.utils'),
                  d = e('./use-is-nft');
                function m(e) {
                  return e >= c.TOKEN_VALUE_UNLIMITED_THRESHOLD;
                }
                n.useApproveTokenSimulation = (e, t) => {
                  var n;
                  const c = (0, r.useSelector)(i.getIntlLocale),
                    { isNFT: f, pending: p } = (0, d.useIsNFT)(e),
                    g = null == e || null === (n = e.txParams) || void 0 === n ? void 0 : n.data,
                    { amountOrTokenId: h } = (0, u.parseApprovalTransactionData)(g ?? '0x') ?? {},
                    y = h ?? new o.BigNumber(0),
                    v = (0, s.calcTokenAmount)(y, Number(t ?? '0')).toFixed(),
                    x = f ? '#' : '',
                    T = (0, a.useMemo)(
                      () => (f ? `${x}${v}` : (0, l.formatAmount)(c, new o.BigNumber(v))),
                      [v, f, c]
                    ),
                    { spendingCap: k, isUnlimitedSpendingCap: b } = (0, a.useMemo)(
                      () =>
                        !f && m(parseInt(v, 10))
                          ? { spendingCap: v, isUnlimitedSpendingCap: !0 }
                          : { spendingCap: `${x}${v}`, isUnlimitedSpendingCap: !1 },
                      [v, T, f]
                    );
                  return {
                    isUnlimitedSpendingCap: b,
                    spendingCap: k,
                    formattedSpendingCap: T,
                    value: y,
                    pending: p,
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/hooks/use-approve-token-simulation.ts',
      },
    ],
    [
      7123,
      {
        '../../../../../../../../shared/constants/transaction': 5819,
        '../../../../../../../hooks/useAsync': 6969,
        '../../../../../../../store/actions': 7619,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useIsNFT = void 0);
                var o = e('../../../../../../../../shared/constants/transaction'),
                  a = e('../../../../../../../hooks/useAsync'),
                  r = e('../../../../../../../store/actions');
                n.useIsNFT = e => {
                  var t;
                  const { value: n, pending: s } = (0, a.useAsyncResult)(async () => {
                    var t;
                    return await (0, r.getTokenStandardAndDetails)(
                      null == e || null === (t = e.txParams) || void 0 === t ? void 0 : t.to
                    );
                  }, [null == e || null === (t = e.txParams) || void 0 === t ? void 0 : t.to]);
                  return {
                    pending: s,
                    isNFT: (null == n ? void 0 : n.standard) !== o.TokenStandard.ERC20,
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/hooks/use-is-nft.ts',
      },
    ],
    [
      7124,
      {
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../shared/network-row/network-row': 7172,
        '../../shared/sign-in-with-row/sign-in-with-row': 7177,
        '../../shared/transaction-details/transaction-details': 7180,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.RevokeDetails = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../../components/app/confirm/info/row/section'),
                  s = e('../../shared/network-row/network-row'),
                  i = e('../../shared/transaction-details/transaction-details'),
                  l = e('../../shared/sign-in-with-row/sign-in-with-row');
                n.RevokeDetails = () =>
                  a.default.createElement(
                    r.ConfirmInfoSection,
                    null,
                    a.default.createElement(s.NetworkRow, { isShownWithAlertsOnly: !0 }),
                    a.default.createElement(i.OriginRow, null),
                    a.default.createElement(l.SigningInWithRow, null)
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/revoke-details/revoke-details.tsx',
      },
    ],
    [
      7125,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/name': 6109,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../shared/static-simulation/static-simulation': 7178,
        '@metamask/name-controller': 2190,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.RevokeStaticSimulation = void 0);
                var o = e('@metamask/name-controller'),
                  a = m(e('react')),
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = m(e('../../../../../../../components/app/name')),
                  i = e('../../../../../../../components/component-library'),
                  l = e('../../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../context/confirm'),
                  d = m(e('../../shared/static-simulation/static-simulation'));
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.RevokeStaticSimulation = () => {
                  const e = (0, c.useI18nContext)(),
                    { currentConfirmation: t } = (0, u.useConfirmContext)(),
                    { chainId: n } = t,
                    m = a.default.createElement(
                      r.ConfirmInfoRow,
                      { label: e('spendingCap') },
                      a.default.createElement(
                        i.Box,
                        { style: { marginLeft: 'auto', maxWidth: '100%' } },
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex },
                          a.default.createElement(s.default, {
                            value: t.txParams.to,
                            type: o.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: n,
                          })
                        )
                      )
                    ),
                    f = a.default.createElement(
                      r.ConfirmInfoRow,
                      { label: e('spender') },
                      a.default.createElement(
                        i.Box,
                        { style: { marginLeft: 'auto', maxWidth: '100%' } },
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex },
                          a.default.createElement(s.default, {
                            value: t.txParams.from,
                            type: o.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: n,
                          })
                        )
                      )
                    ),
                    p = a.default.createElement(a.default.Fragment, null, m, f);
                  return a.default.createElement(d.default, {
                    title: e('simulationDetailsTitle'),
                    titleTooltip: e('simulationDetailsTitleTooltip'),
                    description: e('revokeSimulationDetailsDesc'),
                    simulationElements: p,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/approve/revoke-static-simulation/revoke-static-simulation.tsx',
      },
    ],
    [
      7126,
      {
        '../../../../context/confirm': 7294,
        '../batch/batch-simulation-details/batch-simulation-details': 7127,
        '../batch/transaction-account-details': 7129,
        '../shared/advanced-details/advanced-details': 7156,
        '../shared/gas-fees-section/gas-fees-section': 7170,
        '../shared/transaction-details/transaction-details': 7180,
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
                  r = e('../../../../context/confirm'),
                  s = e('../shared/advanced-details/advanced-details'),
                  i = e('../shared/gas-fees-section/gas-fees-section'),
                  l = e('../shared/transaction-details/transaction-details'),
                  c = e('../batch/transaction-account-details'),
                  u = e('../batch/batch-simulation-details/batch-simulation-details');
                n.default = () => {
                  const { currentConfirmation: e } = (0, r.useConfirmContext)();
                  return null != e && e.txParams
                    ? a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(c.TransactionAccountDetails, null),
                        a.default.createElement(u.BatchSimulationDetails, null),
                        a.default.createElement(l.TransactionDetails, null),
                        a.default.createElement(i.GasFeesSection, null),
                        a.default.createElement(s.AdvancedDetails, null)
                      )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/base-transaction-info/base-transaction-info.tsx',
      },
    ],
    [
      7127,
      {
        '../../../../../../../../shared/constants/transaction': 5819,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../store/controller-actions/transaction-controller': 7621,
        '../../../../../context/confirm': 7294,
        '../../../../simulation-details/simulation-details': 7246,
        '../../approve/edit-spending-cap-modal/edit-spending-cap-modal': 7121,
        '../../hooks/useBatchApproveBalanceChanges': 7132,
        '@metamask/transaction-controller': 2946,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.BatchSimulationDetails = function () {
                    const e = (0, u.useI18nContext)(),
                      { currentConfirmation: t } = (0, i.useConfirmContext)(),
                      { id: n, nestedTransactions: m } = t,
                      { value: f } = (0, s.useBatchApproveBalanceChanges)() ?? {},
                      [p, g] = (0, o.useState)(!1),
                      [h, y] = (0, o.useState)(),
                      v = (0, o.useCallback)(e => {
                        y(e.nestedTransactionIndex), g(!0);
                      }, []),
                      x = (0, o.useCallback)(
                        async e => {
                          h !== undefined &&
                            (await (0, d.updateAtomicBatchData)({
                              transactionId: n,
                              transactionData: e,
                              transactionIndex: h,
                            }));
                        },
                        [n, h]
                      );
                    if ((null == t ? void 0 : t.type) === a.TransactionType.revokeDelegation)
                      return null;
                    const T =
                        null == f
                          ? void 0
                          : f.map(e => ({
                              ...e,
                              onEdit:
                                e.asset.standard === c.TokenStandard.ERC20 ? () => v(e) : undefined,
                            })),
                      k = { label: e('confirmSimulationApprove'), balanceChanges: T ?? [] },
                      b = h === undefined ? undefined : null == m ? void 0 : m[h];
                    return o.default.createElement(
                      o.default.Fragment,
                      null,
                      p &&
                        o.default.createElement(l.EditSpendingCapModal, {
                          data: null == b ? void 0 : b.data,
                          isOpenEditSpendingCapModal: !0,
                          onSubmit: x,
                          setIsOpenEditSpendingCapModal: g,
                          to: null == b ? void 0 : b.to,
                        }),
                      o.default.createElement(r.SimulationDetails, {
                        transaction: t,
                        staticRows: [k],
                        isTransactionsRedesign: !0,
                        enableMetrics: !0,
                      })
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('@metamask/transaction-controller'),
                  r = e('../../../../simulation-details/simulation-details'),
                  s = e('../../hooks/useBatchApproveBalanceChanges'),
                  i = e('../../../../../context/confirm'),
                  l = e('../../approve/edit-spending-cap-modal/edit-spending-cap-modal'),
                  c = e('../../../../../../../../shared/constants/transaction'),
                  u = e('../../../../../../../hooks/useI18nContext'),
                  d = e('../../../../../../../store/controller-actions/transaction-controller');
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
        file: 'ui/pages/confirmations/components/confirm/info/batch/batch-simulation-details/batch-simulation-details.tsx',
      },
    ],
    [
      7128,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/expandable-row': 5982,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../hooks/useFourByte': 7136,
        '../../shared/transaction-data/transaction-data': 7179,
        '../../shared/transaction-details/transaction-details': 7180,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NestedTransactionData = function () {
                    const { currentConfirmation: e } = (0, r.useConfirmContext)(),
                      { nestedTransactions: t } = e ?? {};
                    if (null == t || !t.length) return null;
                    return a.default.createElement(
                      s.Box,
                      { 'data-testid': 'batch-txs' },
                      t.map((e, t) =>
                        a.default.createElement(p, { key: t, index: t, nestedTransaction: e })
                      )
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../context/confirm'),
                  s = e('../../../../../../../components/component-library'),
                  i = e('../../hooks/useFourByte'),
                  l = e('../../../../../../../components/app/confirm/info/row/section'),
                  c = e('../../../../../../../components/app/confirm/info/row/expandable-row'),
                  u = e('../../shared/transaction-details/transaction-details'),
                  d = e('../../shared/transaction-data/transaction-data'),
                  m = e('../../../../../../../components/app/confirm/info/row'),
                  f = e('../../../../../../../hooks/useI18nContext');
                function p({ index: e, nestedTransaction: t }) {
                  const n = (0, f.useI18nContext)(),
                    { data: o, to: r } = t,
                    s = (0, i.useFourByte)({ data: o, to: r }),
                    p =
                      (null == s ? void 0 : s.name) ??
                      n('confirmNestedTransactionTitle', [String(e + 1)]);
                  return a.default.createElement(
                    l.ConfirmInfoSection,
                    null,
                    a.default.createElement(
                      c.ConfirmInfoExpandableRow,
                      {
                        label: p,
                        content: a.default.createElement(
                          a.default.Fragment,
                          null,
                          r && a.default.createElement(u.RecipientRow, { recipient: r }),
                          o &&
                            r &&
                            a.default.createElement(d.TransactionData, {
                              data: o,
                              to: r,
                              noPadding: !0,
                            })
                        ),
                      },
                      a.default.createElement(m.ConfirmInfoRowText, { text: '' })
                    )
                  );
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/batch/nested-transaction-data/nested-transaction-data.tsx',
      },
    ],
    [
      7129,
      { './transaction-account-details': 7130 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'TransactionAccountDetails', {
                    enumerable: !0,
                    get: function () {
                      return o.TransactionAccountDetails;
                    },
                  });
                var o = e('./transaction-account-details');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/batch/transaction-account-details/index.ts',
      },
    ],
    [
      7130,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../hooks/useIsUpgradeTransaction': 7138,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.TransactionAccountDetails = function () {
                    const e = (0, c.useI18nContext)(),
                      { currentConfirmation: t } = (0, s.useConfirmContext)(),
                      n = (0, l.useIsUpgradeTransaction)(),
                      o = (0, l.useIsDowngradeTransaction)(),
                      { chainId: u, txParams: d } = t,
                      { from: m } = d;
                    if (!n && !o) return null;
                    return a.default.createElement(
                      i.ConfirmInfoSection,
                      null,
                      a.default.createElement(
                        r.ConfirmInfoRow,
                        { label: e('account') },
                        a.default.createElement(r.ConfirmInfoRowAddress, { chainId: u, address: m })
                      ),
                      n &&
                        a.default.createElement(
                          r.ConfirmInfoRow,
                          { label: e('confirmAccountType') },
                          a.default.createElement(r.ConfirmInfoRowText, {
                            text: e('confirmAccountTypeSmartContract'),
                            'data-testid': 'tx-type',
                          })
                        ),
                      o &&
                        a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(
                            r.ConfirmInfoRow,
                            { label: 'Current Type' },
                            a.default.createElement(r.ConfirmInfoRowText, {
                              text: e('confirmAccountTypeSmartContract'),
                            })
                          ),
                          a.default.createElement(
                            r.ConfirmInfoRow,
                            { label: 'New Type' },
                            a.default.createElement(r.ConfirmInfoRowText, {
                              text: e('confirmAccountTypeStandard'),
                            })
                          )
                        )
                    );
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = e('../../../../../context/confirm'),
                  i = e('../../../../../../../components/app/confirm/info/row/section'),
                  l = e('../../hooks/useIsUpgradeTransaction'),
                  c = e('../../../../../../../hooks/useI18nContext');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/batch/transaction-account-details/transaction-account-details.tsx',
      },
    ],
    [
      7131,
      {
        '../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../components/app/currency-input/hooks/useTokenExchangeRate': 6015,
        '../../../../../../ducks/locale/locale': 6859,
        '../../../../../../hooks/useFiatFormatter': 6981,
        '../../../../hooks/useAssetDetails': 7321,
        '../../../simulation-details/formatAmount': 7244,
        './useTokenTransactionData': 7143,
        'bignumber.js': 4030,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useTokenValues = void 0);
                var o,
                  a = e('bignumber.js'),
                  r = e('react-redux'),
                  s = e('../../../../../../../shared/lib/transactions-controller-utils'),
                  i =
                    (o = e(
                      '../../../../../../components/app/currency-input/hooks/useTokenExchangeRate'
                    )) && o.__esModule
                      ? o
                      : { default: o },
                  l = e('../../../../../../ducks/locale/locale'),
                  c = e('../../../../../../hooks/useFiatFormatter'),
                  u = e('../../../../hooks/useAssetDetails'),
                  d = e('../../../simulation-details/formatAmount'),
                  m = e('./useTokenTransactionData');
                n.useTokenValues = e => {
                  var t, n;
                  const o = (0, r.useSelector)(l.getIntlLocale),
                    f = (0, m.useTokenTransactionData)(),
                    p = (0, i.default)(
                      null == e || null === (t = e.txParams) || void 0 === t ? void 0 : t.to
                    ),
                    g = (0, c.useFiatFormatter)(),
                    { decimals: h } = (0, u.useAssetDetails)(
                      e.txParams.to,
                      e.txParams.from,
                      e.txParams.data,
                      e.chainId
                    ),
                    y = null == f || null === (n = f.args) || void 0 === n ? void 0 : n._value,
                    v = h !== undefined && y ? (0, s.calcTokenAmount)(y, Number(h)).toFixed() : '0',
                    x = p && v && p.times(v, 10).toNumber(),
                    T = x && g(x, { shorten: !0 });
                  return {
                    decodedTransferValue: v,
                    displayTransferValue: (0, d.formatAmount)(o, new a.BigNumber(v)),
                    fiatDisplayValue: T,
                    fiatValue: x,
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/use-token-values.ts',
      },
    ],
    [
      7132,
      {
        '../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../hooks/useAsync': 6969,
        '../../../../../../store/actions': 7619,
        '../../../../context/confirm': 7294,
        '../../../simulation-details/useBalanceChanges': 7249,
        '../approve/hooks/use-approve-token-simulation': 7122,
        '@metamask/transaction-controller': 2946,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useBatchApproveBalanceChanges = function () {
                    const { currentConfirmation: e } = (0, r.useConfirmContext)(),
                      { chainId: t, nestedTransactions: n } = e ?? {},
                      { value: d, pending: m } = (function ({ nestedTransactions: e }) {
                        return (0, s.useAsyncResult)(
                          async () =>
                            (async function ({ nestedTransactions: e }) {
                              const t = [];
                              if (!e) return t;
                              for (let r = 0; r < e.length; r++) {
                                var n;
                                const s = e[r],
                                  { data: c, to: d } = s;
                                if (!c || !d) continue;
                                const m = await (0, i.getTokenStandardAndDetails)(d);
                                if (null == m || !m.standard) continue;
                                const f =
                                    null == m || null === (n = m.standard) || void 0 === n
                                      ? void 0
                                      : n.toLowerCase(),
                                  p = f !== o.SimulationTokenStandard.erc20,
                                  g = (0, l.parseApprovalTransactionData)(c);
                                if (!g) continue;
                                const { amountOrTokenId: h, isApproveAll: y } = g,
                                  v = (0, a.add0x)((null == h ? void 0 : h.toString(16)) ?? '0x0'),
                                  x = {
                                    address: d,
                                    difference: p || h === undefined ? '0x1' : v,
                                    id: p && h ? v : undefined,
                                    isAll: y ?? !1,
                                    isDecrease: !0,
                                    isUnlimited:
                                      !p &&
                                      (0, u.isSpendingCapUnlimited)(
                                        (null == h ? void 0 : h.toNumber()) ?? 0
                                      ),
                                    newBalance: '0x0',
                                    nestedTransactionIndex: r,
                                    previousBalance: '0x0',
                                    standard: f,
                                  };
                                t.push(x);
                              }
                              return t;
                            })({ nestedTransactions: e }),
                          [e]
                        );
                      })({ nestedTransactions: n }),
                      { value: f, pending: p } = (0, c.useBalanceChanges)({
                        chainId: t,
                        simulationData: { tokenBalanceChanges: d ?? [] },
                      }),
                      g = (f ?? []).map((e, t) => {
                        const n = null == d ? void 0 : d[t];
                        return {
                          ...e,
                          isApproval: !0,
                          isAllApproval: (null == n ? void 0 : n.isAll) ?? !1,
                          isUnlimitedApproval: (null == n ? void 0 : n.isUnlimited) ?? !1,
                          nestedTransactionIndex:
                            (null == n ? void 0 : n.nestedTransactionIndex) ?? -1,
                        };
                      });
                    return { pending: m || p, value: g };
                  });
                var o = e('@metamask/transaction-controller'),
                  a = e('@metamask/utils'),
                  r = e('../../../../context/confirm'),
                  s = e('../../../../../../hooks/useAsync'),
                  i = e('../../../../../../store/actions'),
                  l = e('../../../../../../../shared/modules/transaction.utils'),
                  c = e('../../../simulation-details/useBalanceChanges'),
                  u = e('../approve/hooks/use-approve-token-simulation');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useBatchApproveBalanceChanges.ts',
      },
    ],
    [
      7133,
      {
        '../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../hooks/useAsync': 6969,
        '../../../../../../selectors': 7601,
        '../../../../../../store/actions': 7619,
        '../../../../context/confirm': 7294,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDecodedTransactionData = function ({
                    data: e,
                    to: t,
                    transactionTypeFilter: n,
                  } = {}) {
                    var c, u;
                    const { currentConfirmation: d } = (0, s.useConfirmContext)(),
                      m = (0, o.useSelector)(l.use4ByteResolutionSelector),
                      f = null == d ? void 0 : d.type,
                      p = null == d ? void 0 : d.chainId,
                      g = null == d || null === (c = d.txParams) || void 0 === c ? void 0 : c.data,
                      h = null == d || null === (u = d.txParams) || void 0 === u ? void 0 : u.to,
                      y = e ?? g,
                      v = t ?? h;
                    return (0, a.useAsyncResult)(
                      async () =>
                        !m || !(0, i.hasTransactionData)(y) || !v || (n && f !== n)
                          ? undefined
                          : await (0, r.decodeTransactionData)({
                              transactionData: y,
                              chainId: p,
                              contractAddress: v,
                            }),
                      [m, y, v, p]
                    );
                  });
                var o = e('react-redux'),
                  a = e('../../../../../../hooks/useAsync'),
                  r = e('../../../../../../store/actions'),
                  s = e('../../../../context/confirm'),
                  i = e('../../../../../../../shared/modules/transaction.utils'),
                  l = e('../../../../../../selectors');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useDecodedTransactionData.ts',
      },
    ],
    [
      7134,
      { '../../../../../../../shared/modules/conversion.utils': 5858, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useEIP1559TxFees = void 0);
                var o = e('react'),
                  a = e('../../../../../../../shared/modules/conversion.utils');
                n.useEIP1559TxFees = e => {
                  var t, n;
                  const r =
                      null == e || null === (t = e.txParams) || void 0 === t
                        ? void 0
                        : t.maxFeePerGas,
                    s =
                      null == e || null === (n = e.txParams) || void 0 === n
                        ? void 0
                        : n.maxPriorityFeePerGas;
                  return (0, o.useMemo)(
                    () => ({
                      maxFeePerGas: r ? (0, a.hexToDecimal)(r) : '0',
                      maxPriorityFeePerGas: s ? (0, a.hexToDecimal)(s) : '0',
                    }),
                    [r, s]
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useEIP1559TxFees.ts',
      },
    ],
    [
      7135,
      {
        '../../../../../../../shared/constants/common': 5791,
        '../../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../ducks/metamask/metamask': 6860,
        '../../../../../../hooks/useFiatFormatter': 6981,
        '../../../../../../hooks/useGasFeeEstimates': 6982,
        '../../../../../../selectors': 7601,
        '../shared/constants': 7158,
        './useEIP1559TxFees': 7134,
        './useSupportsEIP1559': 7141,
        './useTransactionGasFeeEstimate': 7144,
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
                  (n.useFeeCalculations = function (e) {
                    var t, n;
                    const v = (0, r.useSelector)(d.getCurrentCurrency),
                      { chainId: x } = e,
                      T = (0, c.useFiatFormatter)(),
                      k = (0, r.useSelector)(e => (0, m.selectConversionRateByChainId)(e, x)),
                      b = (0, a.useCallback)(
                        e => {
                          const t = `${(0, i.getValueFromWeiHex)({ value: e, fromCurrency: s.EtherDenomination.GWEI, numberOfDecimals: 4 }) || 0}`,
                            n = Number(
                              (0, i.getValueFromWeiHex)({
                                value: e,
                                conversionRate: k,
                                fromCurrency: s.EtherDenomination.GWEI,
                                toCurrency: v,
                                numberOfDecimals: 2,
                              })
                            );
                          let o, a;
                          return (
                            0 === n
                              ? ((o = `< ${T(0.01)}`),
                                (a = (0, i.getValueFromWeiHex)({
                                  value: e,
                                  conversionRate: k,
                                  fromCurrency: s.EtherDenomination.GWEI,
                                  toCurrency: v,
                                  numberOfDecimals: 18,
                                })))
                              : ((o = T(n)), (a = null)),
                            {
                              currentCurrencyFee: o,
                              currentCurrencyFeeWith18SignificantDigits: a,
                              hexFee: e,
                              nativeCurrencyFee: t,
                            }
                          );
                        },
                        [k, v, T]
                      ),
                      { maxFeePerGas: E, maxPriorityFeePerGas: C } = (0, p.useEIP1559TxFees)(e),
                      { supportsEIP1559: w } = (0, g.useSupportsEIP1559)(e),
                      _ = (0, h.useTransactionGasFeeEstimate)(e, w),
                      { gasFeeEstimates: I } = (0, u.useGasFeeEstimates)(e.networkClientId),
                      S = null == I ? void 0 : I.estimatedBaseFee,
                      M = null == e ? void 0 : e.layer1GasFee,
                      P = Boolean(M),
                      D = (0, a.useMemo)(() => (P ? b(M) : y), [b, M, P]),
                      A = (0, a.useMemo)(() => (P ? b(_) : y), [_, b, P]),
                      F =
                        (null == e || null === (t = e.txParams) || void 0 === t ? void 0 : t.gas) ||
                        f.HEX_ZERO,
                      O =
                        (null == e || null === (n = e.txParams) || void 0 === n
                          ? void 0
                          : n.gasPrice) || f.HEX_ZERO,
                      R = (0, a.useMemo)(
                        () => (0, i.multiplyHexes)(w ? (0, i.decimalToHex)(E) : O, F),
                        [w, E, F, O]
                      ),
                      {
                        currentCurrencyFee: N,
                        currentCurrencyFeeWith18SignificantDigits: B,
                        nativeCurrencyFee: j,
                      } = b(R),
                      G = (0, a.useMemo)(() => {
                        if (P) {
                          const e = (0, i.addHexes)(_, M);
                          return b(e);
                        }
                        let t = (0, i.addHexes)(
                          (0, i.decGWEIToHexWEI)(S) || f.HEX_ZERO,
                          (0, i.decimalToHex)(C)
                        );
                        new l.Numeric(t, 16).greaterThan((0, i.decimalToHex)(E), 16) &&
                          (t = (0, i.decimalToHex)(E));
                        const n = e.gasLimitNoBuffer || f.HEX_ZERO,
                          o = (0, i.multiplyHexes)(w ? t : O, n);
                        return b(o);
                      }, [S, _, O, b, P, M, E, C, w, e]);
                    return {
                      estimatedFeeFiat: G.currentCurrencyFee,
                      estimatedFeeFiatWith18SignificantDigits:
                        G.currentCurrencyFeeWith18SignificantDigits,
                      estimatedFeeNative: G.nativeCurrencyFee,
                      estimatedFeeNativeHex: (0, o.add0x)(G.hexFee),
                      l1FeeFiat: D.currentCurrencyFee,
                      l1FeeFiatWith18SignificantDigits: D.currentCurrencyFeeWith18SignificantDigits,
                      l1FeeNative: D.nativeCurrencyFee,
                      l2FeeFiat: A.currentCurrencyFee,
                      l2FeeFiatWith18SignificantDigits: A.currentCurrencyFeeWith18SignificantDigits,
                      l2FeeNative: A.nativeCurrencyFee,
                      maxFeeFiat: N,
                      maxFeeFiatWith18SignificantDigits: B,
                      maxFeeNative: j,
                    };
                  });
                var o = e('@metamask/utils'),
                  a = e('react'),
                  r = e('react-redux'),
                  s = e('../../../../../../../shared/constants/common'),
                  i = e('../../../../../../../shared/modules/conversion.utils'),
                  l = e('../../../../../../../shared/modules/Numeric'),
                  c = e('../../../../../../hooks/useFiatFormatter'),
                  u = e('../../../../../../hooks/useGasFeeEstimates'),
                  d = e('../../../../../../ducks/metamask/metamask'),
                  m = e('../../../../../../selectors'),
                  f = e('../shared/constants'),
                  p = e('./useEIP1559TxFees'),
                  g = e('./useSupportsEIP1559'),
                  h = e('./useTransactionGasFeeEstimate');
                const y = {
                  currentCurrencyFee: '',
                  currentCurrencyFeeWith18SignificantDigits: '',
                  nativeCurrencyFee: '',
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useFeeCalculations.ts',
      },
    ],
    [
      7136,
      {
        '../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../selectors': 7601,
        '../../../../../../store/actions': 7619,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useFourByte = void 0);
                var o = e('react-redux'),
                  a = e('react'),
                  r = e('../../../../../../selectors'),
                  s = e('../../../../../../store/actions'),
                  i = e('../../../../../../../shared/modules/transaction.utils');
                n.useFourByte = ({ to: e, data: t }) => {
                  const n = (0, o.useDispatch)(),
                    l = (0, o.useSelector)(r.use4ByteResolutionSelector),
                    c = e,
                    u = t;
                  (0, a.useEffect)(() => {
                    l && (0, i.hasTransactionData)(u) && c && n((0, s.getContractMethodData)(u));
                  }, [l, u, c, n]);
                  const d = (0, o.useSelector)(e => (0, r.getKnownMethodData)(e, u));
                  return c ? d : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useFourByte.ts',
      },
    ],
    [
      7137,
      {
        '../../../../../../ducks/locale/locale': 6859,
        '../../../../../../hooks/useEthFiatAmount': 6979,
        '../../../../../../selectors': 7601,
        '../../../../context/confirm': 7294,
        '../../../simulation-details/formatAmount': 7244,
        './useFeeCalculations': 7135,
        '@ethersproject/abi': 504,
        '@metamask/metamask-eth-abis': 2113,
        '@metamask/utils': 2995,
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
                  (n.RATE_WEI_NATIVE = n.NATIVE_TOKEN_ADDRESS = n.METAMASK_FEE_PERCENTAGE = void 0),
                  (n.useGasFeeToken = y),
                  (n.useSelectedGasFeeToken = function () {
                    const { currentConfirmation: e } = (0, l.useConfirmContext)(),
                      { selectedGasFeeToken: t } = e ?? {};
                    return y({ tokenAddress: t ?? '0x' });
                  });
                var o = e('@metamask/utils'),
                  a = e('bignumber.js'),
                  r = e('react-redux'),
                  s = e('@ethersproject/abi'),
                  i = e('@metamask/metamask-eth-abis'),
                  l = e('../../../../context/confirm'),
                  c = e('../../../../../../hooks/useEthFiatAmount'),
                  u = e('../../../simulation-details/formatAmount'),
                  d = e('../../../../../../ducks/locale/locale'),
                  m = e('../../../../../../selectors'),
                  f = e('./useFeeCalculations');
                const p = (n.NATIVE_TOKEN_ADDRESS = '0x0'.padEnd(42, '0')),
                  g = (n.RATE_WEI_NATIVE = '0xDE0B6B3A7640000'),
                  h = (n.METAMASK_FEE_PERCENTAGE = 0.35);
                function y({ tokenAddress: e }) {
                  var t, n;
                  const { currentConfirmation: c } = (0, l.useConfirmContext)(),
                    y = (0, r.useSelector)(d.getIntlLocale),
                    x = (function () {
                      const { currentConfirmation: e } = (0, l.useConfirmContext)(),
                        { id: t, txParams: n } = e ?? {},
                        { estimatedFeeNativeHex: o } = (0, f.useFeeCalculations)(
                          null != e && e.txParams ? e : { txParams: {} }
                        ),
                        a = (0, r.useSelector)(t =>
                          (0, m.selectNetworkConfigurationByChainId)(
                            t,
                            null == e ? void 0 : e.chainId
                          )
                        ),
                        s = (0, r.useSelector)(e => (0, m.selectTransactionAvailableBalance)(e, t)),
                        { nativeCurrency: i } = a ?? {},
                        { gas: c, maxFeePerGas: u, maxPriorityFeePerGas: d } = n ?? {};
                      return {
                        amount: o,
                        balance: s,
                        decimals: 18,
                        gas: c,
                        maxFeePerGas: u,
                        maxPriorityFeePerGas: d,
                        rateWei: g,
                        recipient: p,
                        symbol: i,
                        tokenAddress: p,
                      };
                    })(),
                    { gasFeeTokens: T } = c ?? {};
                  let k =
                    null == T
                      ? void 0
                      : T.find(t => t.tokenAddress.toLowerCase() === e.toLowerCase());
                  e === p && (k = x);
                  const { amount: b, decimals: E } = k ?? { amount: '0x0', decimals: 0 },
                    C = (0, o.add0x)(new a.BigNumber(b).times(h).toString(16)),
                    w = (0, u.formatAmount)(y, new a.BigNumber(b).shift(-E)),
                    _ = v(k, null === (t = k) || void 0 === t ? void 0 : t.amount),
                    I = v(k, null === (n = k) || void 0 === n ? void 0 : n.balance),
                    S = v(k, C);
                  if (!k) return undefined;
                  const M = (function (e) {
                    const t = new s.Interface(i.abiERC20).encodeFunctionData('transfer', [
                      e.recipient,
                      e.amount,
                    ]);
                    return {
                      data: t,
                      maxFeePerGas: e.maxFeePerGas,
                      maxPriorityFeePerGas: e.maxPriorityFeePerGas,
                      to: e.tokenAddress,
                    };
                  })(k);
                  return {
                    ...k,
                    amountFormatted: w,
                    amountFiat: _,
                    balanceFiat: I,
                    metaMaskFee: C,
                    metamaskFeeFiat: S,
                    transferTransaction: M,
                  };
                }
                function v(e, t) {
                  const { decimals: n, rateWei: o } = e ?? { decimals: 0, rateWei: '0x0' },
                    r = new a.BigNumber(t ?? '0x0').shift(-n).mul(new a.BigNumber(o)).shift(-18),
                    s = (0, c.useEthFiatAmount)(r, {}, !0);
                  return e ? s : '';
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useGasFeeToken.ts',
      },
    ],
    [
      7138,
      { '../../../../context/confirm': 7294, '../../../../hooks/useEIP7702Account': 7334 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIsDowngradeTransaction = function () {
                    const e = r();
                    return Boolean(e) && e === a.EIP_7702_REVOKE_ADDRESS;
                  }),
                  (n.useIsUpgradeTransaction = function () {
                    const e = r();
                    return Boolean(e) && e !== a.EIP_7702_REVOKE_ADDRESS;
                  });
                var o = e('../../../../context/confirm'),
                  a = e('../../../../hooks/useEIP7702Account');
                function r() {
                  const { currentConfirmation: e } = (0, o.useConfirmContext)(),
                    { txParams: t } = e ?? {},
                    { authorizationList: n } = t ?? {},
                    a = null == n ? void 0 : n[0];
                  return null == a ? void 0 : a.address;
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useIsUpgradeTransaction.ts',
      },
    ],
    [
      7139,
      {
        '../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../selectors': 7601,
        '../../../../../../store/actions': 7619,
        '../../../../context/confirm': 7294,
        '../../../../hooks/useTransactionEventFragment': 7350,
        '../shared/constants': 7158,
        './useSupportsEIP1559': 7141,
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
                  (n.useMaxValueRefresher = void 0);
                var o = e('react'),
                  a = e('react-redux'),
                  r = e('@metamask/transaction-controller'),
                  s = e('@metamask/utils'),
                  i = e('../../../../../../selectors'),
                  l = e('../../../../../../../shared/modules/conversion.utils'),
                  c = e('../../../../../../store/actions'),
                  u = e('../../../../context/confirm'),
                  d = e('../shared/constants'),
                  m = e('../../../../hooks/useTransactionEventFragment'),
                  f = e('./useSupportsEIP1559');
                function p(e, t) {
                  var n;
                  return (
                    (null == e || null === (n = e[t]) || void 0 === n ? void 0 : n.maxFeePerGas) ||
                    (null == e ? void 0 : e[t]) ||
                    (null == e ? void 0 : e.gasPrice)
                  );
                }
                n.useMaxValueRefresher = () => {
                  var e, t;
                  const { currentConfirmation: n } = (0, u.useConfirmContext)(),
                    g = (0, a.useDispatch)(),
                    { id: h } = n,
                    { supportsEIP1559: y } = (0, f.useSupportsEIP1559)(n),
                    v =
                      (null == n || null === (e = n.txParams) || void 0 === e ? void 0 : e.gas) ||
                      d.HEX_ZERO,
                    x =
                      (null == n || null === (t = n.txParams) || void 0 === t
                        ? void 0
                        : t.gasPrice) || d.HEX_ZERO,
                    T = (0, a.useSelector)(i.getSelectedAccountCachedBalance),
                    k = (0, a.useSelector)(e =>
                      (0, i.selectMaxValueModeForTransaction)(e, null == n ? void 0 : n.id)
                    ),
                    { updateTransactionEventFragment: b } = (0, m.useTransactionEventFragment)(),
                    E = (function (e) {
                      const { gasFeeEstimates: t, userFeeLevel: n } = e;
                      let o = p(t, r.GasFeeEstimateLevel.Medium);
                      n === r.UserFeeLevel.CUSTOM && (o = e.txParams.maxFeePerGas);
                      Object.values(r.GasFeeEstimateLevel).includes(n) && (o = p(t, n));
                      return o;
                    })(n),
                    C = (0, o.useMemo)(
                      () => (0, l.multiplyHexes)(y ? (0, l.decimalToHex)(E) : x, v),
                      [y, E, v, x]
                    );
                  (0, o.useEffect)(() => {
                    b({ properties: { is_send_max: k } }, h);
                  }, [k, h]),
                    (0, o.useEffect)(() => {
                      if (!k || n.type !== r.TransactionType.simpleSend) return;
                      const e = (0, l.subtractHexes)(T, C),
                        t = (0, s.add0x)(e);
                      g((0, c.updateEditableParams)(n.id, { value: t }));
                    }, [k, T, C]);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useMaxValueRefresher.ts',
      },
    ],
    [
      7140,
      { '../../../../hooks/useTransactionEventFragment': 7350, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSendingValueMetric = void 0);
                var o = e('react'),
                  a = e('../../../../hooks/useTransactionEventFragment');
                n.useSendingValueMetric = ({ transactionMeta: e, fiatValue: t }) => {
                  const { updateTransactionEventFragment: n } = (0,
                    a.useTransactionEventFragment)(),
                    r = e.id,
                    s = { properties: { sending_value: t }, sensitiveProperties: {} };
                  (0, o.useEffect)(() => {
                    t !== undefined && '' !== t && n(s, r);
                  }, [n, r, JSON.stringify(s)]);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useSendingValueMetric.ts',
      },
    ],
    [
      7141,
      {
        '../../../../../../helpers/utils/transactions.util': 6919,
        '../../../../../../selectors': 7601,
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
                  (n.useSupportsEIP1559 = function (e) {
                    const { networkClientId: t, txParams: n } = e ?? {},
                      i =
                        (null == n ? void 0 : n.type) === o.TransactionEnvelopeType.legacy ||
                        (0, r.isLegacyTransaction)(e),
                      l = (0, a.useSelector)(e => (0, s.checkNetworkAndAccountSupports1559)(e, t));
                    return { supportsEIP1559: l && !i };
                  });
                var o = e('@metamask/transaction-controller'),
                  a = e('react-redux'),
                  r = e('../../../../../../helpers/utils/transactions.util'),
                  s = e('../../../../../../selectors');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useSupportsEIP1559.ts',
      },
    ],
    [
      7142,
      {
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../selectors': 7601,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useTokenDetails = void 0);
                var o = e('react-redux'),
                  a = e('../../../../../../hooks/useI18nContext'),
                  r = e('../../../../../../selectors');
                n.useTokenDetails = e => {
                  var t, n, s, i;
                  const l = (0, a.useI18nContext)(),
                    c = (0, o.useSelector)(t => (0, r.getWatchedToken)(e)(t)),
                    u = (0, o.useSelector)(r.getTokenList);
                  return {
                    tokenImage:
                      (null == c ? void 0 : c.iconUrl) ||
                      (null == c ? void 0 : c.image) ||
                      (null ===
                        (t =
                          u[
                            null == e || null === (n = e.txParams) || void 0 === n ? void 0 : n.to
                          ]) || void 0 === t
                        ? void 0
                        : t.iconUrl),
                    tokenSymbol:
                      (null == c ? void 0 : c.symbol) ||
                      (null ===
                        (s =
                          u[
                            null == e || null === (i = e.txParams) || void 0 === i ? void 0 : i.to
                          ]) || void 0 === s
                        ? void 0
                        : s.symbol) ||
                      l('unknown'),
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useTokenDetails.ts',
      },
    ],
    [
      7143,
      {
        '../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../context/confirm': 7294,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTokenTransactionData = function () {
                    var e;
                    const { currentConfirmation: t } = (0, o.useConfirmContext)(),
                      n = null == t || null === (e = t.txParams) || void 0 === e ? void 0 : e.data;
                    if (!n) return undefined;
                    return (0, a.parseStandardTokenTransactionData)(n);
                  });
                var o = e('../../../../context/confirm'),
                  a = e('../../../../../../../shared/modules/transaction.utils');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useTokenTransactionData.ts',
      },
    ],
    [
      7144,
      {
        '../../../../../../../shared/modules/Numeric': 5853,
        '../../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../hooks/useGasFeeEstimates': 6982,
        '../shared/constants': 7158,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTransactionGasFeeEstimate = function (e, t) {
                    var n, i;
                    let { gas: l, gasPrice: c } = e.txParams;
                    const { gasFeeEstimates: u } = (0, r.useGasFeeEstimates)(e.networkClientId),
                      d = null == u ? void 0 : u.estimatedBaseFee;
                    (l = l || s.HEX_ZERO), (c = c || s.HEX_ZERO);
                    const m =
                        (null === (n = e.txParams) || void 0 === n
                          ? void 0
                          : n.maxPriorityFeePerGas) || s.HEX_ZERO,
                      f =
                        (null === (i = e.txParams) || void 0 === i ? void 0 : i.maxFeePerGas) ||
                        s.HEX_ZERO;
                    let p;
                    if (t) {
                      const e = (0, o.decGWEIToHexWEI)(d);
                      let t = (0, o.addHexes)(e || s.HEX_ZERO, m);
                      new a.Numeric(t, 16).greaterThan(f, 16) && (t = f),
                        (p = (0, o.multiplyHexes)(t, l));
                    } else p = (0, o.multiplyHexes)(c, l);
                    return p;
                  });
                var o = e('../../../../../../../shared/modules/conversion.utils'),
                  a = e('../../../../../../../shared/modules/Numeric'),
                  r = e('../../../../../../hooks/useGasFeeEstimates'),
                  s = e('../shared/constants');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useTransactionGasFeeEstimate.ts',
      },
    ],
    [
      7145,
      {
        '../../../../context/confirm': 7294,
        './useTokenTransactionData': 7143,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTransferRecipient = function () {
                    var e, t, n;
                    const { currentConfirmation: s } = (0, a.useConfirmContext)(),
                      i = (0, r.useTokenTransactionData)(),
                      l = null == s ? void 0 : s.type,
                      c = null == s || null === (e = s.txParams) || void 0 === e ? void 0 : e.to,
                      u =
                        (null == i || null === (t = i.args) || void 0 === t ? void 0 : t._to) ||
                        (null == i || null === (n = i.args) || void 0 === n ? void 0 : n.to);
                    return l === o.TransactionType.simpleSend ? c : u;
                  });
                var o = e('@metamask/transaction-controller'),
                  a = e('../../../../context/confirm'),
                  r = e('./useTokenTransactionData');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/hooks/useTransferRecipient.ts',
      },
    ],
    [
      7146,
      { './info': 7147 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Info', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./info')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/info/index.ts' },
    ],
    [
      7147,
      {
        '../../../context/confirm': 7294,
        '../../../hooks/useSmartTransactionFeatureFlags': 7348,
        '../../../hooks/useTransactionFocusEffect': 7351,
        './approve/approve': 7120,
        './base-transaction-info/base-transaction-info': 7126,
        './native-transfer/native-transfer': 7148,
        './nft-token-transfer/nft-token-transfer': 7149,
        './personal-sign/personal-sign': 7150,
        './set-approval-for-all-info/set-approval-for-all-info': 7154,
        './token-transfer/token-transfer': 7182,
        './typed-sign-v1/typed-sign-v1': 7184,
        './typed-sign/typed-sign': 7193,
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
                var o = e('@metamask/transaction-controller'),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../context/confirm'),
                  s = e('../../../hooks/useSmartTransactionFeatureFlags'),
                  i = e('../../../hooks/useTransactionFocusEffect'),
                  l = y(e('./approve/approve')),
                  c = y(e('./base-transaction-info/base-transaction-info')),
                  u = y(e('./native-transfer/native-transfer')),
                  d = y(e('./nft-token-transfer/nft-token-transfer')),
                  m = y(e('./personal-sign/personal-sign')),
                  f = y(e('./set-approval-for-all-info/set-approval-for-all-info')),
                  p = y(e('./token-transfer/token-transfer')),
                  g = y(e('./typed-sign-v1/typed-sign-v1')),
                  h = y(e('./typed-sign/typed-sign'));
                function y(e) {
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
                n.default = () => {
                  const { currentConfirmation: e } = (0, r.useConfirmContext)();
                  (0, s.useSmartTransactionFeatureFlags)(), (0, i.useTransactionFocusEffect)();
                  const t = (0, a.useMemo)(
                    () => ({
                      [o.TransactionType.batch]: () => c.default,
                      [o.TransactionType.contractInteraction]: () => c.default,
                      [o.TransactionType.deployContract]: () => c.default,
                      [o.TransactionType.personalSign]: () => m.default,
                      [o.TransactionType.revokeDelegation]: () => c.default,
                      [o.TransactionType.simpleSend]: () => u.default,
                      [o.TransactionType.signTypedData]: () => {
                        const { version: t } = (null == e ? void 0 : e.msgParams) ?? {};
                        return 'V1' === t ? g.default : h.default;
                      },
                      [o.TransactionType.tokenMethodApprove]: () => l.default,
                      [o.TransactionType.tokenMethodIncreaseAllowance]: () => l.default,
                      [o.TransactionType.tokenMethodSafeTransferFrom]: () => d.default,
                      [o.TransactionType.tokenMethodSetApprovalForAll]: () => f.default,
                      [o.TransactionType.tokenMethodTransfer]: () => p.default,
                      [o.TransactionType.tokenMethodTransferFrom]: () => d.default,
                    }),
                    [e]
                  );
                  if (null == e || !e.type) return null;
                  const n = t[null == e ? void 0 : e.type]();
                  return a.default.createElement(n, null);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/info/info.tsx' },
    ],
    [
      7148,
      {
        '../../../../context/confirm': 7294,
        '../../../simulation-details': 7245,
        '../hooks/useMaxValueRefresher': 7139,
        '../shared/advanced-details/advanced-details': 7156,
        '../shared/gas-fees-section/gas-fees-section': 7170,
        '../shared/native-send-heading/native-send-heading': 7171,
        '../token-transfer/token-details-section': 7181,
        '../token-transfer/transaction-flow-section': 7183,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = m(e('react')),
                  a = e('../../../../context/confirm'),
                  r = e('../../../simulation-details'),
                  s = e('../shared/advanced-details/advanced-details'),
                  i = e('../shared/gas-fees-section/gas-fees-section'),
                  l = m(e('../shared/native-send-heading/native-send-heading')),
                  c = e('../token-transfer/token-details-section'),
                  u = e('../token-transfer/transaction-flow-section'),
                  d = e('../hooks/useMaxValueRefresher');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { currentConfirmation: e } = (0, a.useConfirmContext)();
                  (0, d.useMaxValueRefresher)();
                  const t = 'metamask' === e.origin;
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(l.default, null),
                    o.default.createElement(u.TransactionFlowSection, null),
                    o.default.createElement(r.SimulationDetails, {
                      transaction: e,
                      isTransactionsRedesign: !0,
                      enableMetrics: !0,
                      metricsOnly: t,
                    }),
                    o.default.createElement(c.TokenDetailsSection, null),
                    o.default.createElement(i.GasFeesSection, null),
                    o.default.createElement(s.AdvancedDetails, null)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/native-transfer/native-transfer.tsx',
      },
    ],
    [
      7149,
      {
        '../../../../context/confirm': 7294,
        '../../../simulation-details': 7245,
        '../shared/advanced-details/advanced-details': 7156,
        '../shared/gas-fees-section/gas-fees-section': 7170,
        '../shared/nft-send-heading/nft-send-heading': 7173,
        '../token-transfer/token-details-section': 7181,
        '../token-transfer/transaction-flow-section': 7183,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = d(e('react')),
                  a = e('../../../../context/confirm'),
                  r = e('../../../simulation-details'),
                  s = e('../shared/advanced-details/advanced-details'),
                  i = e('../shared/gas-fees-section/gas-fees-section'),
                  l = d(e('../shared/nft-send-heading/nft-send-heading')),
                  c = e('../token-transfer/token-details-section'),
                  u = e('../token-transfer/transaction-flow-section');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { currentConfirmation: e } = (0, a.useConfirmContext)(),
                    t = 'metamask' === e.origin;
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(l.default, null),
                    o.default.createElement(u.TransactionFlowSection, null),
                    o.default.createElement(r.SimulationDetails, {
                      transaction: e,
                      isTransactionsRedesign: !0,
                      enableMetrics: !0,
                      metricsOnly: t,
                    }),
                    o.default.createElement(c.TokenDetailsSection, null),
                    o.default.createElement(i.GasFeesSection, null),
                    o.default.createElement(s.AdvancedDetails, null)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/nft-token-transfer/nft-token-transfer.tsx',
      },
    ],
    [
      7150,
      {
        '../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../components/component-library': 6402,
        '../../../../../../components/ui/tooltip': 6818,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../helpers/utils/util': 6921,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../../../../selectors/preferences': 7357,
        '../../../../utils': 7364,
        '../shared/network-row/network-row': 7172,
        '../shared/sign-in-with-row/sign-in-with-row': 7177,
        '../utils': 7194,
        './siwe-sign': 7151,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = b(e('react')),
                  a = e('react-redux'),
                  r = e('@metamask/snaps-utils'),
                  s = e('../../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  l = e('../../../../../../components/app/confirm/info/row/constants'),
                  c = e('../../../../../../components/app/confirm/info/row/section'),
                  u = e('../../../../../../components/component-library'),
                  d = b(e('../../../../../../components/ui/tooltip')),
                  m = e('../../../../../../helpers/constants/design-system'),
                  f = e('../../../../../../helpers/utils/util'),
                  p = e('../../../../../../hooks/useI18nContext'),
                  g = e('../../../../context/confirm'),
                  h = e('../../../../selectors/preferences'),
                  y = e('../../../../utils'),
                  v = e('../shared/network-row/network-row'),
                  x = e('../shared/sign-in-with-row/sign-in-with-row'),
                  T = e('../utils'),
                  k = e('./siwe-sign');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  var e;
                  const t = (0, p.useI18nContext)(),
                    { currentConfirmation: n } = (0, g.useConfirmContext)(),
                    b = (0, a.useSelector)(h.selectUseTransactionSimulations);
                  if (null == n || !n.msgParams) return null;
                  const E = (0, y.isSIWESignatureRequest)(n),
                    C = (e => {
                      if (!e) return e;
                      const t = (0, f.sanitizeString)((0, f.hexToText)(e));
                      return (0, T.isValidUTF8)(t) ? t : e;
                    })(null === (e = n.msgParams) || void 0 === e ? void 0 : e.data);
                  let w;
                  E ||
                    (w = (0, r.isSnapId)(n.msgParams.origin)
                      ? t('requestFromInfoSnap')
                      : t('requestFromInfo'));
                  const _ = o.default.createElement(
                      u.Box,
                      {
                        display: m.Display.Flex,
                        flexDirection: m.FlexDirection.Row,
                        alignItems: m.AlignItems.center,
                        gap: 1,
                      },
                      o.default.createElement(
                        u.Text,
                        { variant: m.TextVariant.bodyMdMedium },
                        t('simulationDetailsTitle')
                      ),
                      o.default.createElement(
                        d.default,
                        {
                          interactive: !0,
                          position: 'top',
                          containerClassName: 'info-tooltip__tooltip-container',
                          tooltipInnerClassName: 'info-tooltip__tooltip-content',
                          tooltipArrowClassName: 'info-tooltip__top-tooltip-arrow',
                          html: t('simulationDetailsTitleTooltip'),
                          theme: 'tippy-tooltip-info',
                          style: { display: m.Display.Flex },
                        },
                        o.default.createElement(u.Icon, {
                          name: u.IconName.Question,
                          marginLeft: 1,
                          color: m.IconColor.iconMuted,
                          size: u.IconSize.Sm,
                        })
                      )
                    ),
                    I = o.default.createElement(
                      u.Text,
                      { color: m.TextColor.textAlternative, variant: m.TextVariant.bodyMd },
                      t('simulationDetailsNoChanges')
                    );
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    E &&
                      b &&
                      o.default.createElement(
                        c.ConfirmInfoSection,
                        null,
                        o.default.createElement(
                          u.Box,
                          {
                            'data-testid': 'simulation-details-layout',
                            className: 'simulation-details-layout',
                            display: m.Display.Flex,
                            flexDirection: m.FlexDirection.Column,
                            borderRadius: m.BorderRadius.LG,
                            borderColor: m.BorderColor.transparent,
                            padding: 2,
                            gap: 3,
                          },
                          o.default.createElement(
                            u.Box,
                            {
                              display: m.Display.Flex,
                              flexDirection: m.FlexDirection.Row,
                              alignItems: m.AlignItems.center,
                              justifyContent: m.JustifyContent.spaceBetween,
                            },
                            _,
                            I
                          )
                        )
                      ),
                    o.default.createElement(
                      c.ConfirmInfoSection,
                      null,
                      o.default.createElement(v.NetworkRow, { isShownWithAlertsOnly: !0 }),
                      o.default.createElement(
                        i.ConfirmInfoAlertRow,
                        {
                          alertKey: l.RowAlertKey.RequestFrom,
                          ownerId: n.id,
                          label: t('requestFrom'),
                          tooltip: w,
                        },
                        o.default.createElement(s.ConfirmInfoRowUrl, { url: n.msgParams.origin })
                      ),
                      o.default.createElement(x.SigningInWithRow, null)
                    ),
                    o.default.createElement(
                      c.ConfirmInfoSection,
                      null,
                      E
                        ? o.default.createElement(k.SIWESignInfo, null)
                        : o.default.createElement(
                            i.ConfirmInfoAlertRow,
                            {
                              alertKey: 'message',
                              ownerId: n.id,
                              label: t('message'),
                              collapsed: !1,
                              copyEnabled: !0,
                              copyText: C,
                            },
                            o.default.createElement(s.ConfirmInfoRowText, { text: C })
                          )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/personal-sign/personal-sign.tsx',
      },
    ],
    [
      7151,
      { './siwe-sign': 7152 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SIWESignInfo', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./siwe-sign')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/personal-sign/siwe-sign/index.ts',
      },
    ],
    [
      7152,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '@metamask/controller-utils': 1515,
        luxon: 4931,
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
                  r = e('luxon'),
                  s = e('@metamask/controller-utils'),
                  i = e('../../../../../../../../shared/constants/network'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../../../components/app/confirm/info/row'),
                  u = e('../../../../../../../components/component-library'),
                  d = e('../../../../../../../helpers/constants/design-system'),
                  m = e('../../../../../context/confirm');
                n.default = () => {
                  var e;
                  const t = (0, l.useI18nContext)(),
                    { currentConfirmation: n } = (0, m.useConfirmContext)(),
                    o =
                      null == n ||
                      null === (e = n.msgParams) ||
                      void 0 === e ||
                      null === (e = e.siwe) ||
                      void 0 === e
                        ? void 0
                        : e.parsedMessage;
                  if (!o) return null;
                  const {
                      address: f,
                      chainId: p,
                      issuedAt: g,
                      nonce: h,
                      requestId: y,
                      statement: v,
                      resources: x,
                      uri: T,
                      version: k,
                    } = o,
                    b = (0, s.toHex)(p),
                    E = i.NETWORK_TO_NAME_MAP[b] ?? b;
                  return a.default.createElement(
                    c.ConfirmInfoRow,
                    {
                      label: t('message'),
                      collapsed: !1,
                      copyEnabled: !0,
                      copyText: JSON.stringify(o),
                    },
                    a.default.createElement(
                      u.Box,
                      { style: { marginLeft: -8, marginRight: -8 } },
                      a.default.createElement(
                        u.Text,
                        {
                          color: d.TextColor.inherit,
                          style: { whiteSpace: 'pre-wrap', marginLeft: 8, marginRight: 8 },
                        },
                        v ?? ''
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('siweURI') },
                        a.default.createElement(c.ConfirmInfoRowText, { text: T })
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('siweNetwork') },
                        a.default.createElement(c.ConfirmInfoRowText, { text: E })
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('account') },
                        a.default.createElement(c.ConfirmInfoRowAddress, { address: f, chainId: b })
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('version') },
                        a.default.createElement(c.ConfirmInfoRowText, { text: k })
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('chainId') },
                        a.default.createElement(c.ConfirmInfoRowText, { text: `${p}` })
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('nonce') },
                        a.default.createElement(c.ConfirmInfoRowText, { text: h })
                      ),
                      a.default.createElement(
                        c.ConfirmInfoRow,
                        { label: t('siweIssued') },
                        a.default.createElement(c.ConfirmInfoRowDate, {
                          unixTimestamp: r.DateTime.fromISO(g, { zone: 'utc' }).toUnixInteger(),
                        })
                      ),
                      y &&
                        a.default.createElement(
                          c.ConfirmInfoRow,
                          { label: t('siweRequestId') },
                          a.default.createElement(c.ConfirmInfoRowText, { text: y })
                        ),
                      x &&
                        a.default.createElement(
                          c.ConfirmInfoRow,
                          { label: t('siweResources') },
                          x.map((e, t) =>
                            a.default.createElement(c.ConfirmInfoRowText, {
                              key: `resource-${t}`,
                              text: e,
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
        file: 'ui/pages/confirmations/components/confirm/info/personal-sign/siwe-sign/siwe-sign.tsx',
      },
    ],
    [
      7153,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/name': 6109,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../shared/static-simulation/static-simulation': 7178,
        '@metamask/name-controller': 2190,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.RevokeSetApprovalForAllStaticSimulation = void 0);
                var o = e('@metamask/name-controller'),
                  a = m(e('react')),
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = m(e('../../../../../../../components/app/name')),
                  i = e('../../../../../../../components/component-library'),
                  l = e('../../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../context/confirm'),
                  d = m(e('../../shared/static-simulation/static-simulation'));
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.RevokeSetApprovalForAllStaticSimulation = ({ spender: e }) => {
                  const t = (0, c.useI18nContext)(),
                    { currentConfirmation: n } = (0, u.useConfirmContext)(),
                    { chainId: m } = n,
                    f = a.default.createElement(
                      r.ConfirmInfoRow,
                      { label: t('nfts') },
                      a.default.createElement(
                        i.Box,
                        { style: { marginLeft: 'auto', maxWidth: '100%' } },
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.center },
                          a.default.createElement(s.default, {
                            value: n.txParams.to,
                            type: o.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: m,
                          })
                        )
                      )
                    ),
                    p = a.default.createElement(
                      r.ConfirmInfoRow,
                      { label: t('permissionFrom') },
                      a.default.createElement(
                        i.Box,
                        { style: { marginLeft: 'auto', maxWidth: '100%' } },
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.center },
                          a.default.createElement(s.default, {
                            value: e,
                            type: o.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: m,
                          })
                        )
                      )
                    ),
                    g = a.default.createElement(a.default.Fragment, null, f, p);
                  return a.default.createElement(d.default, {
                    title: t('simulationDetailsTitle'),
                    titleTooltip: t('simulationDetailsTitleTooltip'),
                    description: t('simulationDetailsRevokeSetApprovalForAllDesc'),
                    simulationElements: g,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/set-approval-for-all-info/revoke-set-approval-for-all-static-simulation/revoke-set-approval-for-all-static-simulation.tsx',
      },
    ],
    [
      7154,
      {
        '../../../../context/confirm': 7294,
        '../approve/approve-details/approve-details': 7118,
        '../hooks/useTokenTransactionData': 7143,
        '../shared/advanced-details/advanced-details': 7156,
        '../shared/gas-fees-section/gas-fees-section': 7170,
        '../utils': 7194,
        './revoke-set-approval-for-all-static-simulation/revoke-set-approval-for-all-static-simulation': 7153,
        './set-approval-for-all-static-simulation/set-approval-for-all-static-simulation': 7155,
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
                  r = e('../../../../context/confirm'),
                  s = e('../approve/approve-details/approve-details'),
                  i = e('../shared/advanced-details/advanced-details'),
                  l = e('../shared/gas-fees-section/gas-fees-section'),
                  c = e('../utils'),
                  u = e('../hooks/useTokenTransactionData'),
                  d = e(
                    './revoke-set-approval-for-all-static-simulation/revoke-set-approval-for-all-static-simulation'
                  ),
                  m = e(
                    './set-approval-for-all-static-simulation/set-approval-for-all-static-simulation'
                  );
                n.default = () => {
                  var e;
                  const { currentConfirmation: t } = (0, r.useConfirmContext)(),
                    n = (0, u.useTokenTransactionData)(),
                    o = null == n || null === (e = n.args) || void 0 === e ? void 0 : e._operator,
                    f = (0, c.getIsRevokeSetApprovalForAll)(n);
                  return null != t && t.txParams
                    ? a.default.createElement(
                        a.default.Fragment,
                        null,
                        f
                          ? a.default.createElement(d.RevokeSetApprovalForAllStaticSimulation, {
                              spender: o,
                            })
                          : a.default.createElement(m.SetApprovalForAllStaticSimulation, null),
                        a.default.createElement(s.ApproveDetails, { isSetApprovalForAll: !0 }),
                        a.default.createElement(l.GasFeesSection, null),
                        a.default.createElement(i.AdvancedDetails, null)
                      )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/set-approval-for-all-info/set-approval-for-all-info.tsx',
      },
    ],
    [
      7155,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/name': 6109,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../shared/static-simulation/static-simulation': 7178,
        '@metamask/name-controller': 2190,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SetApprovalForAllStaticSimulation = void 0);
                var o = e('@metamask/name-controller'),
                  a = m(e('react')),
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = m(e('../../../../../../../components/app/name')),
                  i = e('../../../../../../../components/component-library'),
                  l = e('../../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../context/confirm'),
                  d = m(e('../../shared/static-simulation/static-simulation'));
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.SetApprovalForAllStaticSimulation = () => {
                  const e = (0, c.useI18nContext)(),
                    { currentConfirmation: t } = (0, u.useConfirmContext)(),
                    { chainId: n } = t,
                    m = a.default.createElement(
                      r.ConfirmInfoRow,
                      { label: e('withdrawing') },
                      a.default.createElement(
                        i.Box,
                        { style: { marginLeft: 'auto', maxWidth: '100%' } },
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.center },
                          a.default.createElement(
                            i.Box,
                            {
                              display: l.Display.Inline,
                              marginInlineEnd: 1,
                              minWidth: l.BlockSize.Zero,
                            },
                            a.default.createElement(
                              i.Text,
                              {
                                'data-testid': 'simulation-token-value',
                                backgroundColor: l.BackgroundColor.backgroundAlternative,
                                borderRadius: l.BorderRadius.XL,
                                paddingInline: 2,
                                textAlign: l.TextAlign.Center,
                                alignItems: l.AlignItems.center,
                              },
                              e('all')
                            )
                          ),
                          a.default.createElement(s.default, {
                            value: t.txParams.to,
                            type: o.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: n,
                          })
                        )
                      )
                    );
                  return a.default.createElement(d.default, {
                    title: e('simulationDetailsTitle'),
                    titleTooltip: e('simulationDetailsTitleTooltip'),
                    description: e('simulationDetailsSetApprovalForAllDesc'),
                    simulationElements: m,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/set-approval-for-all-info/set-approval-for-all-static-simulation/set-approval-for-all-static-simulation.tsx',
      },
    ],
    [
      7156,
      {
        '../../../../../../../../shared/modules/selectors': 5874,
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../selectors': 7601,
        '../../../../../../../store/actions': 7619,
        '../../../../../context/confirm': 7294,
        '../../../../../selectors/preferences': 7357,
        '../../../../../utils': 7364,
        '../../batch/nested-transaction-data/nested-transaction-data': 7128,
        '../transaction-data/transaction-data': 7179,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AdvancedDetails = void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../../shared/modules/selectors'),
                  s = e('../../../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../../../components/app/confirm/info/row/section'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../../../selectors'),
                  u = e('../../../../../../../store/actions'),
                  d = e('../../../../../context/confirm'),
                  m = e('../../../../../selectors/preferences'),
                  f = e('../../../../../utils'),
                  p = e('../transaction-data/transaction-data'),
                  g = e('../../batch/nested-transaction-data/nested-transaction-data');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const y = () => {
                  const { currentConfirmation: e } = (0, d.useConfirmContext)(),
                    t = (0, l.useI18nContext)(),
                    n = (0, a.useDispatch)();
                  (0, o.useEffect)(() => {
                    e &&
                      !(0, f.isSignatureTransactionType)(e) &&
                      n((0, u.getNextNonce)(e.txParams.from));
                  }, [e, n]);
                  const m = (0, a.useSelector)(c.getNextSuggestedNonce),
                    p = (0, a.useSelector)(c.getCustomNonceValue),
                    g = p || m,
                    h = (0, a.useSelector)(r.getIsSmartTransaction);
                  return o.default.createElement(
                    i.ConfirmInfoSection,
                    { 'data-testid': 'advanced-details-nonce-section' },
                    o.default.createElement(
                      s.ConfirmInfoRow,
                      {
                        label: t('advancedDetailsNonceDesc'),
                        tooltip: t('advancedDetailsNonceTooltip'),
                      },
                      o.default.createElement(s.ConfirmInfoRowText, {
                        'data-testid': 'advanced-details-displayed-nonce',
                        text: `${g}`,
                        onEditClick: h
                          ? undefined
                          : () =>
                              n(
                                (0, u.showModal)({
                                  name: 'CUSTOMIZE_NONCE',
                                  customNonceValue: p,
                                  nextNonce: m,
                                  updateCustomNonce: e => {
                                    n((0, u.updateCustomNonce)(e));
                                  },
                                  getNextNonce: u.getNextNonce,
                                })
                              ),
                        editIconClassName: 'edit-nonce-btn',
                        editIconDataTestId: 'edit-nonce-icon',
                      })
                    )
                  );
                };
                n.AdvancedDetails = ({ overrideVisibility: e = !1 }) => {
                  const t = (0, a.useSelector)(m.selectConfirmationAdvancedDetailsOpen);
                  return e || t
                    ? o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(y, null),
                        o.default.createElement(p.TransactionData, null),
                        o.default.createElement(g.NestedTransactionData, null)
                      )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/advanced-details/advanced-details.tsx',
      },
    ],
    [
      7157,
      {
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/icon/preloader': 6751,
        '../../../../../../../helpers/constants/design-system': 6872,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ConfirmLoader = void 0);
                var o = i(e('react')),
                  a = e('../../../../../../../components/component-library'),
                  r = i(e('../../../../../../../components/ui/icon/preloader')),
                  s = e('../../../../../../../helpers/constants/design-system');
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.ConfirmLoader = () =>
                  o.default.createElement(
                    a.Box,
                    {
                      display: s.Display.Flex,
                      justifyContent: s.JustifyContent.center,
                      alignItems: s.AlignItems.center,
                      paddingTop: 4,
                      paddingBottom: 4,
                    },
                    o.default.createElement(r.default, { size: 20 })
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/confirm-loader/confirm-loader.tsx',
      },
    ],
    [
      7158,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.TOKEN_VALUE_UNLIMITED_THRESHOLD =
                    n.HEX_ZERO =
                    n.DAI_CONTRACT_ADDRESS =
                      void 0);
                (n.HEX_ZERO = '0x0'),
                  (n.TOKEN_VALUE_UNLIMITED_THRESHOLD = 10 ** 15),
                  (n.DAI_CONTRACT_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/constants.ts',
      },
    ],
    [
      7159,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../selectors': 7601,
        '../../../../../context/confirm': 7294,
        '../../../../../selectors/preferences': 7357,
        '../../hooks/useGasFeeToken': 7137,
        '../edit-gas-icon/edit-gas-icon-button': 7160,
        '../selected-gas-fee-token': 7174,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.EditGasFeesRow = void 0);
                var o = v(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../../shared/constants/network'),
                  s = e('../../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  i = e('../../../../../../../components/app/confirm/info/row/constants'),
                  l = e('../../../../../../../components/component-library'),
                  c = v(e('../../../../../../../components/ui/tooltip')),
                  u = e('../../../../../../../helpers/constants/design-system'),
                  d = e('../../../../../../../hooks/useI18nContext'),
                  m = e('../../../../../../../selectors'),
                  f = e('../../../../../context/confirm'),
                  p = e('../edit-gas-icon/edit-gas-icon-button'),
                  g = e('../selected-gas-fee-token'),
                  h = e('../../hooks/useGasFeeToken'),
                  y = e('../../../../../selectors/preferences');
                function v(e) {
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
                function T({ roundedValue: e }) {
                  return o.default.createElement(
                    l.Text,
                    { color: u.TextColor.textDefault, 'data-testid': 'first-gas-field' },
                    e
                  );
                }
                function k({ color: e, fullValue: t, roundedValue: n, variant: a }) {
                  const r = { color: e, variant: a },
                    s = o.default.createElement(
                      l.Text,
                      x({}, r, { 'data-testid': 'native-currency' }),
                      n
                    );
                  return t
                    ? o.default.createElement(c.default, { title: t }, s)
                    : o.default.createElement(o.default.Fragment, null, s);
                }
                n.EditGasFeesRow = ({
                  fiatFee: e,
                  fiatFeeWith18SignificantDigits: t,
                  nativeFee: n,
                  supportsEIP1559: c,
                  setShowCustomizeGasPopover: v,
                }) => {
                  const x = (0, d.useI18nContext)(),
                    { currentConfirmation: b } = (0, f.useConfirmContext)(),
                    E = (0, a.useSelector)(y.selectConfirmationAdvancedDetailsOpen),
                    { chainId: C } = b,
                    w = (0, h.useSelectedGasFeeToken)(),
                    _ = (function (e) {
                      const t = r.TEST_CHAINS.includes(e),
                        { showFiatInTestnets: n } = (0, a.useSelector)(m.getPreferences);
                      return !t || n;
                    })(C),
                    I = w ? w.amountFiat : e,
                    S = w ? w.amountFormatted : n,
                    M = null == w ? void 0 : w.metamaskFeeFiat,
                    P = w ? x('confirmGasFeeTokenTooltip', [M]) : x('estimatedFeeTooltip');
                  return o.default.createElement(
                    l.Box,
                    { display: u.Display.Flex, flexDirection: u.FlexDirection.Column },
                    o.default.createElement(
                      s.ConfirmInfoAlertRow,
                      {
                        alertKey: i.RowAlertKey.EstimatedFee,
                        ownerId: b.id,
                        'data-testid': 'edit-gas-fees-row',
                        label: x('networkFee'),
                        tooltip: P,
                        style: { alignItems: u.AlignItems.center, marginBottom: '2px' },
                      },
                      o.default.createElement(
                        l.Box,
                        {
                          display: u.Display.Flex,
                          flexDirection: u.FlexDirection.Row,
                          justifyContent: u.JustifyContent.spaceBetween,
                          alignItems: u.AlignItems.center,
                          textAlign: u.TextAlign.Center,
                          gap: 1,
                        },
                        !w &&
                          o.default.createElement(p.EditGasIconButton, {
                            supportsEIP1559: c,
                            setShowCustomizeGasPopover: v,
                          }),
                        _ && !E
                          ? o.default.createElement(k, { fullValue: t, roundedValue: I })
                          : o.default.createElement(T, { roundedValue: S }),
                        o.default.createElement(g.SelectedGasFeeToken, null)
                      )
                    ),
                    o.default.createElement(
                      l.Box,
                      {
                        display: u.Display.Flex,
                        justifyContent: u.JustifyContent.spaceBetween,
                        paddingInline: 2,
                      },
                      o.default.createElement(
                        l.Text,
                        { variant: u.TextVariant.bodySm, color: u.TextColor.textAlternative },
                        w ? x('confirmGasFeeTokenMetaMaskFee', [M]) : ' '
                      ),
                      E &&
                        o.default.createElement(k, {
                          fullValue: t,
                          roundedValue: I,
                          variant: u.TextVariant.bodySm,
                          color: u.TextColor.textAlternative,
                        })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/edit-gas-fees-row/edit-gas-fees-row.tsx',
      },
    ],
    [
      7160,
      {
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../contexts/transaction-modal': 6840,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useTransactionEventFragment': 7350,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.EditGasIconButton = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../../components/component-library'),
                  s = e('../../../../../../../contexts/transaction-modal'),
                  i = e('../../../../../../../helpers/constants/design-system'),
                  l = e('../../../../../hooks/useTransactionEventFragment');
                n.EditGasIconButton = ({ supportsEIP1559: e, setShowCustomizeGasPopover: t }) => {
                  const { openModal: n } = (0, s.useTransactionModalContext)(),
                    { updateTransactionEventFragment: o } = (0, l.useTransactionEventFragment)();
                  return a.default.createElement(r.Button, {
                    style: { textDecoration: 'none' },
                    size: r.ButtonSize.Auto,
                    variant: r.ButtonVariant.Link,
                    startIconName: r.IconName.Edit,
                    color: i.IconColor.primaryDefault,
                    'data-testid': 'edit-gas-fee-icon',
                    onClick: () =>
                      e ? (o({ gas_edit_attempted: 'basic' }), void n('editGasFee')) : void t(!0),
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/edit-gas-icon/edit-gas-icon-button.tsx',
      },
    ],
    [
      7161,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/identicon': 6758,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../selectors': 7601,
        '../../../../../context/confirm': 7294,
        '../../hooks/useGasFeeToken': 7137,
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
                  (n.GasFeeTokenIcon = function ({ size: e = f.Md, tokenAddress: t }) {
                    const { currentConfirmation: n } = (0, r.useConfirmContext)(),
                      { chainId: m } = n,
                      p = (0, a.useSelector)(e => (0, s.selectNetworkConfigurationByChainId)(e, m));
                    if (t !== i.NATIVE_TOKEN_ADDRESS)
                      return o.default.createElement(
                        u.Box,
                        { 'data-testid': 'token-icon' },
                        o.default.createElement(l.default, {
                          address: t,
                          diameter: e === f.Md ? 32 : 12,
                        })
                      );
                    const { nativeCurrency: g } = p,
                      h = c.CHAIN_ID_TOKEN_IMAGE_MAP[m];
                    return o.default.createElement(
                      u.Box,
                      { 'data-testid': 'native-icon' },
                      o.default.createElement(u.AvatarToken, {
                        src: h,
                        name: g,
                        size: e === f.Md ? u.AvatarTokenSize.Md : u.AvatarTokenSize.Xs,
                        backgroundColor: d.BackgroundColor.backgroundDefault,
                      })
                    );
                  }),
                  (n.GasFeeTokenIconSize = void 0);
                var o = m(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../context/confirm'),
                  s = e('../../../../../../../selectors'),
                  i = e('../../hooks/useGasFeeToken'),
                  l = m(e('../../../../../../../components/ui/identicon')),
                  c = e('../../../../../../../../shared/constants/network'),
                  u = e('../../../../../../../components/component-library'),
                  d = e('../../../../../../../helpers/constants/design-system');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                let f = (n.GasFeeTokenIconSize = (function (e) {
                  return (e.Sm = 'sm'), (e.Md = 'md'), e;
                })({}));
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-icon/gas-fee-token-icon.tsx',
      },
    ],
    [
      7162,
      { './gas-fee-token-icon': 7161 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./gas-fee-token-icon');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-icon/index.ts',
      },
    ],
    [
      7163,
      {
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../ducks/metamask/metamask': 6860,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../hooks/alerts/transactions/useInsufficientBalanceAlerts': 7304,
        '../../hooks/useGasFeeToken': 7137,
        '../gas-fee-token-icon': 7162,
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
                  (n.GasFeeTokenListItem = function ({
                    tokenAddress: e,
                    isSelected: t,
                    onClick: n,
                  }) {
                    const a = (0, l.useI18nContext)(),
                      s = (0, c.useGasFeeToken)({ tokenAddress: e }),
                      i = (0, r.useSelector)(d.getCurrentCurrency),
                      f =
                        Boolean((0, u.useInsufficientBalanceAlerts)().length) &&
                        e === c.NATIVE_TOKEN_ADDRESS;
                    if (!s) return null;
                    const { amountFiat: h, amountFormatted: y, balanceFiat: v, symbol: x } = s;
                    return o.default.createElement(p, {
                      image: o.default.createElement(m.GasFeeTokenIcon, {
                        tokenAddress: e,
                        size: m.GasFeeTokenIconSize.Md,
                      }),
                      isSelected: t,
                      leftPrimary: x,
                      leftSecondary: `${a('confirmGasFeeTokenBalance')} ${v} ${i.toUpperCase()}`,
                      rightPrimary: h,
                      rightSecondary: `${y} ${x}`,
                      warning: f && o.default.createElement(g, null),
                      onClick: () => (null == n ? void 0 : n(s)),
                    });
                  });
                var o = f(e('react')),
                  a = f(e('classnames')),
                  r = e('react-redux'),
                  s = e('../../../../../../../components/component-library'),
                  i = e('../../../../../../../helpers/constants/design-system'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../hooks/useGasFeeToken'),
                  u = e('../../../../../hooks/alerts/transactions/useInsufficientBalanceAlerts'),
                  d = e('../../../../../../../ducks/metamask/metamask'),
                  m = e('../gas-fee-token-icon');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p({
                  image: e,
                  leftPrimary: t,
                  leftSecondary: n,
                  rightPrimary: r,
                  rightSecondary: l,
                  isSelected: c,
                  warning: u,
                  onClick: d,
                }) {
                  return o.default.createElement(
                    s.Box,
                    {
                      'data-testid': 'gas-fee-token-list-item',
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Row,
                      justifyContent: i.JustifyContent.spaceBetween,
                      backgroundColor: c ? i.BackgroundColor.primaryMuted : undefined,
                      padding: 2,
                      className: (0, a.default)('gas-fee-token-list-item', {
                        'gas-fee-token-list-item--selected': c ?? !1,
                      }),
                      onClick: () => (null == d ? void 0 : d()),
                    },
                    c && o.default.createElement(h, null),
                    o.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Row,
                        alignItems: i.AlignItems.center,
                        paddingLeft: 2,
                      },
                      e,
                      o.default.createElement(
                        s.Box,
                        { textAlign: i.TextAlign.Left, marginLeft: 4 },
                        o.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Row,
                            alignItems: i.AlignItems.center,
                            gap: 2,
                          },
                          o.default.createElement(
                            s.Text,
                            {
                              as: 'button',
                              variant: i.TextVariant.bodyMdMedium,
                              backgroundColor: i.BackgroundColor.transparent,
                              padding: 0,
                            },
                            t
                          ),
                          u
                        ),
                        o.default.createElement(
                          s.Text,
                          {
                            variant: i.TextVariant.bodySmMedium,
                            color: i.TextColor.textAlternative,
                          },
                          n
                        )
                      )
                    ),
                    o.default.createElement(
                      s.Box,
                      { textAlign: i.TextAlign.Right, paddingRight: 2 },
                      o.default.createElement(s.Text, { variant: i.TextVariant.bodyMdMedium }, r),
                      o.default.createElement(
                        s.Text,
                        { variant: i.TextVariant.bodySmMedium, color: i.TextColor.textAlternative },
                        l
                      )
                    )
                  );
                }
                function g() {
                  const e = (0, l.useI18nContext)();
                  return o.default.createElement(
                    s.Box,
                    {
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Row,
                      alignItems: i.AlignItems.center,
                      borderRadius: i.BorderRadius.pill,
                      borderColor: i.BorderColor.borderDefault,
                      padding: 1,
                      gap: 1,
                    },
                    o.default.createElement(s.Icon, {
                      name: s.IconName.Warning,
                      size: s.IconSize.Xs,
                      color: i.IconColor.iconMuted,
                    }),
                    o.default.createElement(
                      s.Text,
                      { variant: i.TextVariant.bodyXsMedium, color: i.TextColor.textMuted },
                      e('confirmGasFeeTokenInsufficientBalance')
                    )
                  );
                }
                function h() {
                  return o.default.createElement(s.Box, {
                    borderRadius: i.BorderRadius.pill,
                    backgroundColor: i.BackgroundColor.primaryDefault,
                    className: 'gas-fee-token-list-item__selected-indicator',
                  });
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-list-item/gas-fee-token-list-item.tsx',
      },
    ],
    [
      7164,
      { './gas-fee-token-list-item': 7163 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./gas-fee-token-list-item');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-list-item/index.ts',
      },
    ],
    [
      7165,
      {
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../store/controller-actions/transaction-controller': 7621,
        '../../../../../context/confirm': 7294,
        '../../hooks/useGasFeeToken': 7137,
        '../gas-fee-token-list-item': 7164,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.GasFeeTokenModal = function ({ onClose: e }) {
                    const t = (0, l.useI18nContext)(),
                      { currentConfirmation: n } = (0, s.useConfirmContext)(),
                      { id: d, gasFeeTokens: m, selectedGasFeeToken: f } = n,
                      p = (0, o.useCallback)(
                        async t => {
                          const n =
                            t.tokenAddress === u.NATIVE_TOKEN_ADDRESS ? undefined : t.tokenAddress;
                          await (0, c.updateSelectedGasFeeToken)(d, n), null == e || e();
                        },
                        [e, d]
                      ),
                      g = [
                        u.NATIVE_TOKEN_ADDRESS,
                        ...((null == m
                          ? void 0
                          : m
                              .filter(e => e.tokenAddress !== u.NATIVE_TOKEN_ADDRESS)
                              .map(e => e.tokenAddress)) ?? []),
                      ];
                    return o.default.createElement(
                      a.Modal,
                      {
                        isOpen: !0,
                        onClose: e ?? (() => {}),
                        isClosedOnOutsideClick: !1,
                        isClosedOnEscapeKey: !1,
                      },
                      o.default.createElement(a.ModalOverlay, { 'data-testid': 'modal-overlay' }),
                      o.default.createElement(
                        a.ModalContent,
                        { size: a.ModalContentSize.Md },
                        o.default.createElement(
                          a.ModalHeader,
                          { onClose: e },
                          t('confirmGasFeeTokenModalTitle')
                        ),
                        o.default.createElement(
                          a.ModalBody,
                          {
                            display: r.Display.Flex,
                            flexDirection: r.FlexDirection.Column,
                            paddingLeft: 0,
                            paddingRight: 0,
                          },
                          g.map(e =>
                            o.default.createElement(i.GasFeeTokenListItem, {
                              key: e,
                              tokenAddress: e,
                              isSelected:
                                (null == f ? void 0 : f.toLowerCase()) === e.toLowerCase() ||
                                (!f && e === u.NATIVE_TOKEN_ADDRESS),
                              onClick: p,
                            })
                          )
                        )
                      )
                    );
                  });
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../../../../../components/component-library'),
                  r = e('../../../../../../../helpers/constants/design-system'),
                  s = e('../../../../../context/confirm'),
                  i = e('../gas-fee-token-list-item'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../../../store/controller-actions/transaction-controller'),
                  u = e('../../hooks/useGasFeeToken');
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
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-modal/gas-fee-token-modal.tsx',
      },
    ],
    [
      7166,
      { './gas-fee-token-modal': 7165 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./gas-fee-token-modal');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-modal/index.ts',
      },
    ],
    [
      7167,
      {
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/multichain': 6574,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../hooks/useGasFeeToken': 7137,
        '../gas-fee-token-icon': 7162,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.GasFeeTokenToast = function () {
                    const e = (0, s.useI18nContext)(),
                      [t, n] = (0, o.useState)(!1),
                      c = (0, i.useGasFeeToken)({ tokenAddress: i.NATIVE_TOKEN_ADDRESS }),
                      d = (0, i.useSelectedGasFeeToken)() ?? c,
                      [m, f] = (0, o.useState)(i.NATIVE_TOKEN_ADDRESS),
                      p = (0, o.useCallback)(() => {
                        n(!1);
                      }, []);
                    (null == d ? void 0 : d.tokenAddress) !== m &&
                      (f((null == d ? void 0 : d.tokenAddress) ?? i.NATIVE_TOKEN_ADDRESS),
                      n(!0),
                      setTimeout(() => {
                        p();
                      }, u));
                    if (!t) return null;
                    return o.default.createElement(
                      a.Box,
                      { className: 'toast_wrapper' },
                      o.default.createElement(r.Toast, {
                        onClose: p,
                        text: e('confirmGasFeeTokenToast', [
                          o.default.createElement('b', null, null == d ? void 0 : d.symbol),
                        ]),
                        startAdornment: o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(l.GasFeeTokenIcon, {
                            tokenAddress:
                              (null == d ? void 0 : d.tokenAddress) ?? i.NATIVE_TOKEN_ADDRESS,
                          })
                        ),
                      })
                    );
                  });
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../../../../../components/component-library'),
                  r = e('../../../../../../../components/multichain'),
                  s = e('../../../../../../../hooks/useI18nContext'),
                  i = e('../../hooks/useGasFeeToken'),
                  l = e('../gas-fee-token-icon');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const u = 5e3;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fee-token-toast/gas-fee-token-toast.tsx',
      },
    ],
    [
      7168,
      {
        '../../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../../../../hooks/useAutomaticGasFeeTokenSelect': 7322,
        '../../../../../selectors/preferences': 7357,
        '../../../../gas-timing/gas-timing.component': 7238,
        '../../hooks/useEIP1559TxFees': 7134,
        '../../hooks/useFeeCalculations': 7135,
        '../../hooks/useSupportsEIP1559': 7141,
        '../edit-gas-fees-row/edit-gas-fees-row': 7159,
        '../gas-fees-row/gas-fees-row': 7169,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.GasFeesDetails = void 0);
                var o = x(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../components/component-library'),
                  s = e('../../../../../../../helpers/constants/design-system'),
                  i = e('../../../../../../../hooks/useI18nContext'),
                  l = e('../../../../../selectors/preferences'),
                  c = e('../../../../../context/confirm'),
                  u = x(e('../../../../gas-timing/gas-timing.component')),
                  d = e('../../hooks/useEIP1559TxFees'),
                  m = e('../../hooks/useFeeCalculations'),
                  f = e('../../hooks/useSupportsEIP1559'),
                  p = e('../edit-gas-fees-row/edit-gas-fees-row'),
                  g = e('../gas-fees-row/gas-fees-row'),
                  h = e('../../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  y = e('../../../../../../../components/app/confirm/info/row/constants'),
                  v = e('../../../../../hooks/useAutomaticGasFeeTokenSelect');
                function x(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.GasFeesDetails = ({ setShowCustomizeGasPopover: e }) => {
                  const t = (0, i.useI18nContext)();
                  (0, v.useAutomaticGasFeeTokenSelect)();
                  const { currentConfirmation: n } = (0, c.useConfirmContext)(),
                    { maxFeePerGas: x, maxPriorityFeePerGas: T } = (0, d.useEIP1559TxFees)(n),
                    { supportsEIP1559: k } = (0, f.useSupportsEIP1559)(n),
                    b = Boolean(null == n ? void 0 : n.layer1GasFee),
                    {
                      estimatedFeeFiat: E,
                      estimatedFeeFiatWith18SignificantDigits: C,
                      estimatedFeeNative: w,
                      l1FeeFiat: _,
                      l1FeeFiatWith18SignificantDigits: I,
                      l1FeeNative: S,
                      l2FeeFiat: M,
                      l2FeeFiatWith18SignificantDigits: P,
                      l2FeeNative: D,
                      maxFeeFiat: A,
                      maxFeeFiatWith18SignificantDigits: F,
                      maxFeeNative: O,
                    } = (0, m.useFeeCalculations)(n),
                    R = (0, a.useSelector)(l.selectConfirmationAdvancedDetailsOpen);
                  return null != n && n.txParams
                    ? o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(p.EditGasFeesRow, {
                          fiatFee: E,
                          fiatFeeWith18SignificantDigits: C,
                          nativeFee: w,
                          supportsEIP1559: k,
                          setShowCustomizeGasPopover: e,
                        }),
                        R &&
                          b &&
                          o.default.createElement(
                            o.default.Fragment,
                            null,
                            o.default.createElement(g.GasFeesRow, {
                              'data-testid': 'gas-fee-details-l1',
                              label: t('l1Fee'),
                              tooltipText: t('l1FeeTooltip'),
                              fiatFee: _,
                              fiatFeeWith18SignificantDigits: I,
                              nativeFee: S,
                            }),
                            o.default.createElement(g.GasFeesRow, {
                              'data-testid': 'gas-fee-details-l2',
                              label: t('l2Fee'),
                              tooltipText: t('l2FeeTooltip'),
                              fiatFee: M,
                              fiatFeeWith18SignificantDigits: P,
                              nativeFee: D,
                            })
                          ),
                        k &&
                          o.default.createElement(
                            h.ConfirmInfoAlertRow,
                            {
                              alertKey: y.RowAlertKey.Speed,
                              'data-testid': 'gas-fee-details-speed',
                              label: t('speed'),
                              ownerId: n.id,
                            },
                            o.default.createElement(
                              r.Box,
                              { display: s.Display.Flex, alignItems: s.AlignItems.center },
                              o.default.createElement(u.default, {
                                maxFeePerGas: x,
                                maxPriorityFeePerGas: T,
                              })
                            )
                          ),
                        R &&
                          !n.selectedGasFeeToken &&
                          o.default.createElement(g.GasFeesRow, {
                            'data-testid': 'gas-fee-details-max-fee',
                            label: t('maxFee'),
                            tooltipText: t('maxFeeTooltip'),
                            fiatFee: A,
                            fiatFeeWith18SignificantDigits: F,
                            nativeFee: O,
                          })
                      )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fees-details/gas-fees-details.tsx',
      },
    ],
    [
      7169,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../selectors': 7601,
        '../../../../../context/confirm': 7294,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.GasFeesRow = void 0);
                var o = m(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../../shared/constants/network'),
                  s = e('../../../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../../../components/component-library'),
                  l = m(e('../../../../../../../components/ui/tooltip')),
                  c = e('../../../../../../../helpers/constants/design-system'),
                  u = e('../../../../../../../selectors'),
                  d = e('../../../../../context/confirm');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.GasFeesRow = ({
                  label: e,
                  tooltipText: t,
                  fiatFee: n,
                  fiatFeeWith18SignificantDigits: m,
                  nativeFee: f,
                  'data-testid': p,
                }) => {
                  const { currentConfirmation: g } = (0, d.useConfirmContext)(),
                    h = r.TEST_CHAINS.includes(null == g ? void 0 : g.chainId),
                    { showFiatInTestnets: y } = (0, a.useSelector)(u.getPreferences);
                  return o.default.createElement(
                    s.ConfirmInfoRow,
                    {
                      'data-testid': p,
                      label: e,
                      tooltip: t,
                      variant: s.ConfirmInfoRowVariant.Default,
                    },
                    o.default.createElement(
                      i.Box,
                      {
                        display: c.Display.Flex,
                        flexDirection: c.FlexDirection.Row,
                        justifyContent: c.JustifyContent.spaceBetween,
                        alignItems: c.AlignItems.center,
                        textAlign: c.TextAlign.Center,
                        marginLeft: 8,
                      },
                      o.default.createElement(
                        i.Text,
                        { marginRight: 1, color: c.TextColor.textDefault },
                        f
                      ),
                      (!h || y) &&
                        (m
                          ? o.default.createElement(
                              l.default,
                              { title: m },
                              o.default.createElement(
                                i.Text,
                                { color: c.TextColor.textAlternative },
                                n
                              )
                            )
                          : o.default.createElement(
                              i.Text,
                              { color: c.TextColor.textAlternative },
                              n
                            ))
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fees-row/gas-fees-row.tsx',
      },
    ],
    [
      7170,
      {
        '../../../../../../../../shared/constants/gas': 5795,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../context/confirm': 7294,
        '../../../../edit-gas-popover': 7235,
        '../../hooks/useSupportsEIP1559': 7141,
        '../gas-fees-details/gas-fees-details': 7168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.GasFeesSection = void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../../../../../../shared/constants/gas'),
                  s = e('../../../../../../../components/app/confirm/info/row/section'),
                  i = e('../../../../../context/confirm'),
                  l = (o = e('../../../../edit-gas-popover')) && o.__esModule ? o : { default: o },
                  c = e('../../hooks/useSupportsEIP1559'),
                  u = e('../gas-fees-details/gas-fees-details');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const m = ({ closeCustomizeGasPopover: e, transactionMeta: t }) =>
                  a.default.createElement(l.default, {
                    onClose: e,
                    mode: r.EditGasModes.modifyInPlace,
                    transaction: t,
                  });
                n.GasFeesSection = () => {
                  const { currentConfirmation: e } = (0, i.useConfirmContext)(),
                    [t, n] = (0, a.useState)(!1),
                    o = (0, a.useCallback)(() => n(!1), [n]),
                    { supportsEIP1559: r } = (0, c.useSupportsEIP1559)(e);
                  return null != e && e.txParams
                    ? a.default.createElement(
                        s.ConfirmInfoSection,
                        { 'data-testid': 'gas-fee-section' },
                        a.default.createElement(u.GasFeesDetails, {
                          setShowCustomizeGasPopover: n,
                        }),
                        !r &&
                          t &&
                          a.default.createElement(m, {
                            closeCustomizeGasPopover: o,
                            transactionMeta: e,
                          })
                      )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/gas-fees-section/gas-fees-section.tsx',
      },
    ],
    [
      7171,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../ducks/locale/locale': 6859,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useFiatFormatter': 6981,
        '../../../../../../../selectors': 7601,
        '../../../../../context/confirm': 7294,
        '../../../../simulation-details/formatAmount': 7244,
        '../../hooks/useSendingValueMetric': 7140,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = e('bignumber.js'),
                  a = v(e('react')),
                  r = e('react-redux'),
                  s = e('../../../../../../../../shared/constants/network'),
                  i = e('../../../../../../../../shared/lib/transactions-controller-utils'),
                  l = e('../../../../../../../../shared/modules/selectors/networks'),
                  c = e('../../../../../../../components/component-library'),
                  u = v(e('../../../../../../../components/ui/tooltip')),
                  d = e('../../../../../../../ducks/locale/locale'),
                  m = e('../../../../../../../helpers/constants/design-system'),
                  f = e('../../../../../../../hooks/useFiatFormatter'),
                  p = e('../../../../../../../selectors'),
                  g = e('../../../../../context/confirm'),
                  h = e('../../../../simulation-details/formatAmount'),
                  y = e('../../hooks/useSendingValueMetric');
                function v(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { currentConfirmation: e } = (0, g.useConfirmContext)(),
                    { chainId: t } = e,
                    n = (0, i.calcTokenAmount)(e.txParams.value, 18),
                    v = (0, r.useSelector)(e => (0, p.selectConversionRateByChainId)(e, t)),
                    x = v && n && new o.BigNumber(v).times(n, 10).toNumber(),
                    T = (0, f.useFiatFormatter)(),
                    k = x && T(x, { shorten: !0 }),
                    b = (0, r.useSelector)(l.getNetworkConfigurationsByChainId),
                    E = null == b ? void 0 : b[e.chainId],
                    { nativeCurrency: C } = E,
                    w = (0, r.useSelector)(d.getIntlLocale),
                    _ = (0, h.formatAmount)(w, n),
                    I = n.toFixed(),
                    S = s.TEST_CHAINS.includes(e.chainId),
                    { showFiatInTestnets: M } = (0, r.useSelector)(p.getPreferences),
                    P = a.default.createElement(c.AvatarToken, {
                      src: s.CHAIN_ID_TOKEN_IMAGE_MAP[e.chainId],
                      name: C,
                      size: c.AvatarTokenSize.Xl,
                      backgroundColor: m.BackgroundColor.backgroundDefault,
                    }),
                    D =
                      _ === I
                        ? a.default.createElement(
                            c.Text,
                            {
                              variant: m.TextVariant.headingLg,
                              color: m.TextColor.inherit,
                              marginTop: 3,
                            },
                            `${_} ${C}`
                          )
                        : a.default.createElement(
                            u.default,
                            { title: I, position: 'right' },
                            a.default.createElement(
                              c.Text,
                              {
                                variant: m.TextVariant.headingLg,
                                color: m.TextColor.inherit,
                                marginTop: 3,
                              },
                              `${_} ${C}`
                            )
                          ),
                    A =
                      Boolean(k) &&
                      (!S || M) &&
                      a.default.createElement(
                        c.Text,
                        { variant: m.TextVariant.bodyMd, color: m.TextColor.textAlternative },
                        k
                      );
                  return (
                    (0, y.useSendingValueMetric)({ transactionMeta: e, fiatValue: x }),
                    a.default.createElement(
                      c.Box,
                      {
                        display: m.Display.Flex,
                        flexDirection: m.FlexDirection.Column,
                        justifyContent: m.JustifyContent.center,
                        alignItems: m.AlignItems.center,
                        padding: 4,
                      },
                      P,
                      D,
                      A
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/native-send-heading/native-send-heading.tsx',
      },
    ],
    [
      7172,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.NetworkRow = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('react-redux'),
                  s = e('../../../../../../../../shared/constants/network'),
                  i = e('../../../../../../../../shared/modules/selectors/networks'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../../../components/component-library'),
                  u = e('../../../../../../../helpers/constants/design-system'),
                  d = e('../../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  m = e('../../../../../../../components/app/confirm/info/row/constants'),
                  f = e('../../../../../context/confirm');
                n.NetworkRow = ({ isShownWithAlertsOnly: e = !1 }) => {
                  var t;
                  const n = (0, l.useI18nContext)(),
                    { currentConfirmation: o } = (0, f.useConfirmContext)() ?? {},
                    p = (0, r.useSelector)(i.getNetworkConfigurationsByChainId);
                  if (!o) return null;
                  const g = o.chainId ?? '',
                    h = g ? (null === (t = p[g]) || void 0 === t ? void 0 : t.name) : '',
                    y = g ? s.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[g] : '';
                  return a.default.createElement(
                    d.ConfirmInfoAlertRow,
                    {
                      alertKey: m.RowAlertKey.Network,
                      ownerId: o.id,
                      label: n('transactionFlowNetwork'),
                      isShownWithAlertsOnly: e,
                    },
                    a.default.createElement(
                      c.Box,
                      {
                        display: u.Display.Flex,
                        alignItems: u.AlignItems.center,
                        flexWrap: u.FlexWrap.Wrap,
                        gap: 2,
                        minWidth: u.BlockSize.Zero,
                      },
                      a.default.createElement(c.AvatarNetwork, {
                        borderColor: u.BorderColor.backgroundDefault,
                        size: c.AvatarNetworkSize.Xs,
                        src: y,
                        name: h,
                      }),
                      a.default.createElement(
                        c.Text,
                        { variant: u.TextVariant.bodyMd, color: u.TextColor.textDefault },
                        h
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/network-row/network-row.tsx',
      },
    ],
    [
      7173,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../../../../shared/modules/string-utils': 5878,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/multichain/nft-item': 6601,
        '../../../../../../../ducks/metamask/metamask': 6860,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../helpers/utils/nfts': 6910,
        '../../../../../../../hooks/useFetchNftDetailsFromTokenURI': 6980,
        '../../../../../context/confirm': 7294,
        '../../../../../hooks/useAssetDetails': 7321,
        '../../../../../send/send.utils': 7362,
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
                  (n.generateTokenIdDisplay = n.default = void 0);
                var o = y(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../../shared/constants/network'),
                  s = e('../../../../../../../../shared/modules/selectors/networks'),
                  i = e('../../../../../../../../shared/modules/string-utils'),
                  l = e('../../../../../../../components/component-library'),
                  c = e('../../../../../../../components/multichain/nft-item'),
                  u = e('../../../../../../../ducks/metamask/metamask'),
                  d = e('../../../../../../../helpers/constants/design-system'),
                  m = e('../../../../../../../helpers/utils/nfts'),
                  f = e('../../../../../context/confirm'),
                  p = e('../../../../../hooks/useAssetDetails'),
                  g = e('../../../../../send/send.utils'),
                  h = y(e('../../../../../../../hooks/useFetchNftDetailsFromTokenURI'));
                function y(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const v = e => (e.length >= 10 ? (0, g.ellipsify)(e, 4, 4) : e);
                n.generateTokenIdDisplay = v;
                n.default = () => {
                  const { currentConfirmation: e } = (0, f.useConfirmContext)(),
                    t = e.txParams.to,
                    n = e.txParams.from,
                    { data: g } = e.txParams,
                    { chainId: y } = e,
                    {
                      assetName: x,
                      tokenImage: T,
                      tokenId: k,
                      tokenURI: b,
                    } = (0, p.useAssetDetails)(t, n, g, y),
                    { image: E, name: C } = (0, h.default)(b),
                    w = (0, a.useSelector)(e => (0, u.getNFTsByChainId)(e, y)),
                    _ = (0, a.useSelector)(s.getNetworkConfigurationsByChainId),
                    I =
                      k &&
                      w.find(
                        ({ address: e, tokenId: n }) =>
                          (0, i.isEqualCaseInsensitive)(e, t) && k === n.toString()
                      ),
                    S = null == I ? void 0 : I.imageOriginal,
                    M = (0, m.getNftImage)(null == I ? void 0 : I.image),
                    P = I ? (0, m.getNftImageAlt)(I) : '',
                    D = S ?? (M || E || ''),
                    A = null == D ? void 0 : D.startsWith('ipfs:'),
                    F = _[y],
                    O = k && `#${v(k)}`,
                    R = o.default.createElement(
                      l.Box,
                      { style: { width: '48px' } },
                      o.default.createElement(c.NftItem, {
                        src: T || E,
                        alt: P,
                        name: x || C,
                        tokenId: k || '',
                        networkName: F.name ?? '',
                        networkSrc: r.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[y],
                        isIpfsURL: A,
                      })
                    ),
                    N = o.default.createElement(
                      l.Text,
                      {
                        variant: d.TextVariant.headingLg,
                        color: d.TextColor.inherit,
                        marginTop: 3,
                        textAlign: d.TextAlign.Center,
                      },
                      x
                    ),
                    B = o.default.createElement(
                      l.Text,
                      { variant: d.TextVariant.bodyMd, color: d.TextColor.textAlternative },
                      O
                    );
                  return o.default.createElement(
                    l.Box,
                    {
                      display: d.Display.Flex,
                      flexDirection: d.FlexDirection.Column,
                      justifyContent: d.JustifyContent.center,
                      alignItems: d.AlignItems.center,
                      padding: 4,
                    },
                    R,
                    N,
                    B
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/nft-send-heading/nft-send-heading.tsx',
      },
    ],
    [
      7174,
      { './selected-gas-fee-token': 7175 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./selected-gas-fee-token');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/selected-gas-fee-token/index.ts',
      },
    ],
    [
      7175,
      {
        '../../../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../context/confirm': 7294,
        '../../../../../hooks/gas/useIsGaslessSupported': 7317,
        '../../hooks/useGasFeeToken': 7137,
        '../gas-fee-token-icon': 7162,
        '../gas-fee-token-modal': 7166,
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
                  (n.SelectedGasFeeToken = function () {
                    var e;
                    const [t, n] = (0, o.useState)(!1),
                      { currentConfirmation: f } = (0, i.useConfirmContext)(),
                      { chainId: p, gasFeeTokens: g } = f,
                      h = (0, m.useIsGaslessSupported)() && Boolean(null == g ? void 0 : g.length),
                      y =
                        null === (e = (0, a.useSelector)(l.getNetworkConfigurationsByChainId)) ||
                        void 0 === e
                          ? void 0
                          : e[p],
                      v = (0, o.useCallback)(() => {
                        h && n(!0);
                      }, [h]),
                      x = null == y ? void 0 : y.nativeCurrency,
                      T = (0, u.useSelectedGasFeeToken)(),
                      k = (null == T ? void 0 : T.symbol) ?? x;
                    return o.default.createElement(
                      o.default.Fragment,
                      null,
                      t && o.default.createElement(c.GasFeeTokenModal, { onClose: () => n(!1) }),
                      o.default.createElement(
                        r.Box,
                        {
                          onClick: v,
                          backgroundColor: s.BackgroundColor.backgroundAlternative,
                          borderRadius: s.BorderRadius.pill,
                          display: s.Display.InlineFlex,
                          alignItems: s.AlignItems.center,
                          paddingInline: 2,
                          gap: 1,
                          style: { cursor: h ? 'pointer' : 'default' },
                        },
                        o.default.createElement(d.GasFeeTokenIcon, {
                          tokenAddress:
                            (null == T ? void 0 : T.tokenAddress) ?? u.NATIVE_TOKEN_ADDRESS,
                          size: d.GasFeeTokenIconSize.Sm,
                        }),
                        o.default.createElement(r.Text, null, k),
                        h &&
                          o.default.createElement(r.Icon, {
                            'data-testid': 'selected-gas-fee-token-arrow',
                            name: r.IconName.ArrowDown,
                            size: r.IconSize.Sm,
                          })
                      )
                    );
                  });
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../components/component-library'),
                  s = e('../../../../../../../helpers/constants/design-system'),
                  i = e('../../../../../context/confirm'),
                  l = e('../../../../../../../../shared/modules/selectors/networks'),
                  c = e('../gas-fee-token-modal'),
                  u = e('../../hooks/useGasFeeToken'),
                  d = e('../gas-fee-token-icon'),
                  m = e('../../../../../hooks/gas/useIsGaslessSupported');
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
        file: 'ui/pages/confirmations/components/confirm/info/shared/selected-gas-fee-token/selected-gas-fee-token.tsx',
      },
    ],
    [
      7176,
      {
        '../../../../../../../../shared/constants/network': 5804,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../selectors': 7601,
        '../../../../../context/confirm': 7294,
        '../../hooks/use-token-values': 7131,
        '../../hooks/useSendingValueMetric': 7140,
        '../../hooks/useTokenDetails': 7142,
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
                var o = g(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../../../shared/constants/network'),
                  s = e('../../../../../../../components/component-library'),
                  i = g(e('../../../../../../../components/ui/tooltip')),
                  l = e('../../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../../../selectors'),
                  d = e('../../../../../context/confirm'),
                  m = e('../../hooks/use-token-values'),
                  f = e('../../hooks/useSendingValueMetric'),
                  p = e('../../hooks/useTokenDetails');
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const e = (0, c.useI18nContext)(),
                    { currentConfirmation: t } = (0, d.useConfirmContext)(),
                    { tokenImage: n, tokenSymbol: g } = (0, p.useTokenDetails)(t),
                    {
                      decodedTransferValue: h,
                      displayTransferValue: y,
                      fiatDisplayValue: v,
                      fiatValue: x,
                    } = (0, m.useTokenValues)(t),
                    T = r.TEST_CHAINS.includes(t.chainId),
                    { showFiatInTestnets: k } = (0, a.useSelector)(u.getPreferences),
                    b = o.default.createElement(s.AvatarToken, {
                      src: n,
                      name: g !== e('unknown') && g,
                      size: s.AvatarTokenSize.Xl,
                      backgroundColor:
                        g === e('unknown')
                          ? l.BackgroundColor.overlayDefault
                          : l.BackgroundColor.backgroundDefault,
                      color: g === e('unknown') ? l.TextColor.textMuted : l.TextColor.textDefault,
                    }),
                    E =
                      y === h
                        ? o.default.createElement(
                            s.Text,
                            {
                              variant: l.TextVariant.headingLg,
                              color: l.TextColor.inherit,
                              marginTop: 3,
                            },
                            `${y} ${g}`
                          )
                        : o.default.createElement(
                            i.default,
                            { title: h, position: 'right' },
                            o.default.createElement(
                              s.Text,
                              {
                                variant: l.TextVariant.headingLg,
                                color: l.TextColor.inherit,
                                marginTop: 3,
                              },
                              `${y} ${g}`
                            )
                          ),
                    C =
                      Boolean(v) &&
                      (!T || k) &&
                      o.default.createElement(
                        s.Text,
                        { variant: l.TextVariant.bodyMd, color: l.TextColor.textAlternative },
                        v
                      );
                  return (
                    (0, f.useSendingValueMetric)({ transactionMeta: t, fiatValue: x }),
                    o.default.createElement(
                      s.Box,
                      {
                        display: l.Display.Flex,
                        flexDirection: l.FlexDirection.Column,
                        justifyContent: l.JustifyContent.center,
                        alignItems: l.AlignItems.center,
                        padding: 4,
                      },
                      b,
                      E,
                      C
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/send-heading/send-heading.tsx',
      },
    ],
    [
      7177,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../../../../utils': 7364,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SigningInWithRow = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = e('../../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  i = e('../../../../../../../components/app/confirm/info/row/constants'),
                  l = e('../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../context/confirm'),
                  u = e('../../../../../utils');
                n.SigningInWithRow = () => {
                  var e, t;
                  const n = (0, l.useI18nContext)(),
                    { currentConfirmation: o } = (0, c.useConfirmContext)(),
                    d = (0, u.isSIWESignatureRequest)(o),
                    m = null == o ? void 0 : o.chainId,
                    f =
                      (null == o || null === (e = o.txParams) || void 0 === e ? void 0 : e.from) ??
                      (null == o || null === (t = o.msgParams) || void 0 === t ? void 0 : t.from);
                  return f
                    ? a.default.createElement(
                        s.ConfirmInfoAlertRow,
                        {
                          alertKey: i.RowAlertKey.SigningInWith,
                          label: n(d ? 'signingInWith' : 'signingWith'),
                          ownerId: o.id,
                          isShownWithAlertsOnly: !d,
                        },
                        a.default.createElement(r.ConfirmInfoRowAddress, { address: f, chainId: m })
                      )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/sign-in-with-row/sign-in-with-row.tsx',
      },
    ],
    [
      7178,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/icon/preloader': 6751,
        '../../../../../../../helpers/constants/design-system': 6872,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = c(e('react')),
                  a = e('../../../../../../../components/component-library'),
                  r = e('../../../../../../../components/app/confirm/info/row'),
                  s = e('../../../../../../../components/app/confirm/info/row/section'),
                  i = e('../../../../../../../helpers/constants/design-system'),
                  l = c(e('../../../../../../../components/ui/icon/preloader'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = {
                  display: i.Display.Flex,
                  alignItems: i.AlignItems.center,
                  justifyContent: i.JustifyContent.spaceBetween,
                };
                n.default = ({
                  title: e,
                  titleTooltip: t,
                  description: n,
                  simulationElements: c,
                  isLoading: d,
                  isCollapsed: m = !1,
                }) =>
                  o.default.createElement(
                    s.ConfirmInfoSection,
                    { 'data-testid': 'confirmation__simulation_section', style: m ? u : {} },
                    o.default.createElement(
                      r.ConfirmInfoRow,
                      { label: e, tooltip: t },
                      n && o.default.createElement(r.ConfirmInfoRowText, { text: n })
                    ),
                    d
                      ? o.default.createElement(
                          a.Box,
                          { display: i.Display.Flex, justifyContent: i.JustifyContent.center },
                          o.default.createElement(l.default, { size: 20 })
                        )
                      : c
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/static-simulation/static-simulation.tsx',
      },
    ],
    [
      7179,
      {
        '../../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../../../shared/types/transaction-decode': 5885,
        '../../../../../../../components/app/assets/nfts/nft-details/utils': 5942,
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/expandable-row': 5982,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../components/ui/icon/preloader': 6751,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../context/confirm': 7294,
        '../../hooks/useDecodedTransactionData': 7133,
        '@ethersproject/bytes': 520,
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
                  (n.Container = x),
                  (n.TransactionData = void 0);
                var o = v(e('react')),
                  a = e('@ethersproject/bytes'),
                  r = v(e('lodash')),
                  s = e('../../hooks/useDecodedTransactionData'),
                  i = e('../../../../../../../components/app/confirm/info/row/section'),
                  l = e('../../../../../../../components/app/confirm/info/row'),
                  c = e('../../../../../../../helpers/constants/design-system'),
                  u = e('../../../../../../../components/component-library'),
                  d = e('../../../../../../../hooks/useI18nContext'),
                  m = e('../../../../../../../components/app/confirm/info/row/expandable-row'),
                  f = v(e('../../../../../../../components/ui/icon/preloader')),
                  p = e('../../../../../../../../shared/types/transaction-decode'),
                  g = e('../../../../../context/confirm'),
                  h = e('../../../../../../../../shared/modules/transaction.utils'),
                  y = e('../../../../../../../components/app/assets/nfts/nft-details/utils');
                function v(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function x({ children: e, isLoading: t, noPadding: n, transactionData: a }) {
                  const r = (0, d.useI18nContext)();
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      i.ConfirmInfoSection,
                      { noPadding: n, 'data-testid': 'advanced-details-data-section' },
                      o.default.createElement(
                        l.ConfirmInfoRow,
                        {
                          label: r('advancedDetailsDataDesc'),
                          copyEnabled: Boolean(a),
                          copyText: a || undefined,
                        },
                        o.default.createElement(
                          u.Box,
                          null,
                          t && o.default.createElement(f.default, { size: 20 })
                        )
                      ),
                      e
                    )
                  );
                }
                function T({ transactionData: e }) {
                  const t = (0, d.useI18nContext)();
                  return o.default.createElement(
                    l.ConfirmInfoRow,
                    { label: t('advancedDetailsHexDesc') },
                    o.default.createElement(l.ConfirmInfoRowText, {
                      'data-testid': 'advanced-details-transaction-hex',
                      text: e,
                    })
                  );
                }
                function k({ method: e, source: t, isExpandable: n, chainId: a }) {
                  const r = (0, d.useI18nContext)(),
                    s = o.default.createElement(
                      u.Box,
                      { paddingLeft: 2, 'data-testid': `advanced-details-${e.name}-params` },
                      e.params.map((e, n) =>
                        o.default.createElement(E, {
                          key: n,
                          param: e,
                          index: n,
                          source: t,
                          chainId: a,
                        })
                      )
                    );
                  return n
                    ? o.default.createElement(
                        m.ConfirmInfoExpandableRow,
                        {
                          label: r('transactionDataFunction'),
                          tooltip: e.description,
                          content: s,
                          startExpanded: !0,
                        },
                        o.default.createElement(l.ConfirmInfoRowText, {
                          'data-testid': 'advanced-details-data-function',
                          text: e.name,
                        })
                      )
                    : o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(
                          l.ConfirmInfoRow,
                          {
                            'data-testid': 'advanced-details-data-function',
                            label: r('transactionDataFunction'),
                            tooltip: e.description,
                          },
                          o.default.createElement(l.ConfirmInfoRowText, { text: e.name })
                        ),
                        s
                      );
                }
                function b({ param: e, source: t, chainId: n }) {
                  const { name: r, type: s, value: i } = e;
                  if ('address' === s)
                    return o.default.createElement(l.ConfirmInfoRowAddress, {
                      address: i,
                      chainId: n,
                    });
                  if ('path' === r && t === p.DecodedTransactionDataSource.Uniswap)
                    return o.default.createElement(C, { pathPools: i, chainId: n });
                  let c = i.toString();
                  return (
                    c.length > 15 && !c.startsWith('0x') && (c = (0, y.renderShortTokenId)(c, 5)),
                    !Array.isArray(i) && c.startsWith('0x') && (c = (0, a.hexStripZeros)(c)),
                    o.default.createElement(l.ConfirmInfoRowText, { text: c })
                  );
                }
                function E({ param: e, index: t, source: n, chainId: a }) {
                  var s;
                  const { name: i, type: c, description: d } = e,
                    m = i ? r.default.startCase(i) : `Param #${t + 1}`,
                    f = `${c}${d ? ` - ${d}` : ''}`,
                    p = `advanced-details-data-param-${t}`,
                    g =
                      null === (s = e.children) || void 0 === s
                        ? void 0
                        : s.map((e, t) =>
                            o.default.createElement(E, {
                              key: t,
                              param: e,
                              index: t,
                              source: n,
                              chainId: a,
                            })
                          );
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      l.ConfirmInfoRow,
                      { label: m, tooltip: f, 'data-testid': p },
                      !(null != g && g.length) &&
                        o.default.createElement(b, { param: e, source: n, chainId: a })
                    ),
                    g && o.default.createElement(u.Box, { paddingLeft: 2 }, g)
                  );
                }
                function C({ pathPools: e, chainId: t }) {
                  return o.default.createElement(
                    u.Box,
                    {
                      display: c.Display.Flex,
                      flexWrap: c.FlexWrap.Wrap,
                      justifyContent: c.JustifyContent.flexEnd,
                    },
                    e.map((e, n) =>
                      o.default.createElement(
                        o.default.Fragment,
                        null,
                        0 === n &&
                          o.default.createElement(l.ConfirmInfoRowAddress, {
                            address: e.firstAddress,
                            chainId: t,
                          }),
                        o.default.createElement(l.ConfirmInfoRowText, {
                          text: String(e.tickSpacing),
                        }),
                        o.default.createElement(l.ConfirmInfoRowAddress, {
                          address: e.secondAddress,
                          chainId: t,
                        })
                      )
                    )
                  );
                }
                n.TransactionData = ({ data: e, noPadding: t, to: n } = {}) => {
                  const { currentConfirmation: a } = (0, g.useConfirmContext)(),
                    { nestedTransactions: r, txParams: i } = a ?? {},
                    { data: c, to: u } = i ?? {},
                    d = e ?? c,
                    m = n ?? u,
                    f = (0, s.useDecodedTransactionData)({ data: d, to: m }),
                    { value: p, pending: y } = f;
                  if (null != r && r.length && !e) return null;
                  if (y) return o.default.createElement(x, { isLoading: !0, noPadding: t });
                  if (!(0, h.hasTransactionData)(d)) return null;
                  if (!p)
                    return o.default.createElement(
                      x,
                      { noPadding: t, transactionData: d },
                      o.default.createElement(T, { transactionData: d })
                    );
                  const { data: v, source: b } = p,
                    E = v.length > 1,
                    { chainId: C } = a;
                  return o.default.createElement(
                    x,
                    { transactionData: d, noPadding: t },
                    o.default.createElement(
                      o.default.Fragment,
                      null,
                      v.map((e, t) =>
                        o.default.createElement(
                          o.default.Fragment,
                          { key: t },
                          o.default.createElement(k, {
                            method: e,
                            source: b,
                            isExpandable: E,
                            chainId: C,
                          }),
                          t < v.length - 1 && o.default.createElement(l.ConfirmInfoRowDivider, null)
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
        file: 'ui/pages/confirmations/components/confirm/info/shared/transaction-data/transaction-data.tsx',
      },
    ],
    [
      7180,
      {
        '../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../../components/app/confirm/info/row/currency': 5979,
        '../../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../../components/component-library': 6402,
        '../../../../../../../helpers/constants/common': 6870,
        '../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../../hooks/useUserPreferencedCurrency': 7020,
        '../../../../../../../selectors/account-abstraction': 7591,
        '../../../../../context/confirm': 7294,
        '../../../../../selectors/preferences': 7357,
        '../../hooks/useFourByte': 7136,
        '../../utils': 7194,
        '../constants': 7158,
        '../network-row/network-row': 7172,
        '../sign-in-with-row/sign-in-with-row': 7177,
        '@metamask/transaction-controller': 2946,
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
                  (n.TransactionDetails = n.RecipientRow = n.OriginRow = n.MethodDataRow = void 0);
                var o = e('@metamask/transaction-controller'),
                  a = e('ethereumjs-util'),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = w(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  s = e('react-redux'),
                  i = e('../../../../../../../components/app/confirm/info/row'),
                  l = e('../../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  c = e('../../../../../../../components/app/confirm/info/row/constants'),
                  u = e('../../../../../../../components/app/confirm/info/row/section'),
                  d = e('../../../../../../../hooks/useI18nContext'),
                  m = e('../../../../../../../selectors/account-abstraction'),
                  f = e('../../../../../selectors/preferences'),
                  p = e('../../../../../context/confirm'),
                  g = e('../../hooks/useFourByte'),
                  h = e('../../../../../../../components/app/confirm/info/row/currency'),
                  y = e('../../../../../../../helpers/constants/common'),
                  v = e('../../../../../../../hooks/useUserPreferencedCurrency'),
                  x = e('../constants'),
                  T = e('../../utils'),
                  k = e('../network-row/network-row'),
                  b = e('../sign-in-with-row/sign-in-with-row'),
                  E = e('../../../../../../../helpers/constants/design-system'),
                  C = e('../../../../../../../components/component-library');
                function w(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (w = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const _ = () => {
                  const e = (0, d.useI18nContext)(),
                    { currentConfirmation: t } = (0, p.useConfirmContext)(),
                    n = null == t ? void 0 : t.origin;
                  return n
                    ? r.default.createElement(
                        l.ConfirmInfoAlertRow,
                        {
                          alertKey: c.RowAlertKey.RequestFrom,
                          ownerId: t.id,
                          'data-testid': 'transaction-details-origin-row',
                          label: e('requestFrom'),
                          tooltip: e('requestFromTransactionDescription'),
                        },
                        r.default.createElement(i.ConfirmInfoRowUrl, { url: n })
                      )
                    : null;
                };
                n.OriginRow = _;
                const I = ({ recipient: e } = {}) => {
                  var t;
                  const n = (0, d.useI18nContext)(),
                    { currentConfirmation: o } = (0, p.useConfirmContext)(),
                    { from: s } = (null == o ? void 0 : o.txParams) ?? {},
                    u =
                      e ?? (null == o || null === (t = o.txParams) || void 0 === t ? void 0 : t.to),
                    { nestedTransactions: m } = o ?? {},
                    f =
                      Boolean(null == m ? void 0 : m.length) &&
                      (null == u ? void 0 : u.toLowerCase()) === s.toLowerCase();
                  if (!u || !(0, a.isValidAddress)(u)) return null;
                  const { chainId: g } = o;
                  return r.default.createElement(
                    l.ConfirmInfoAlertRow,
                    {
                      ownerId: o.id,
                      alertKey: c.RowAlertKey.InteractingWith,
                      'data-testid': 'transaction-details-recipient-row',
                      label: n('interactingWith'),
                      tooltip: n('interactingWithTransactionDescription'),
                    },
                    f
                      ? r.default.createElement(D, null)
                      : r.default.createElement(i.ConfirmInfoRowAddress, { address: u, chainId: g })
                  );
                };
                n.RecipientRow = I;
                const S = () => {
                  const e = (0, d.useI18nContext)(),
                    { currentConfirmation: t } = (0, p.useConfirmContext)(),
                    { txParams: n } = t ?? {},
                    o = null == n ? void 0 : n.to,
                    a = null == n ? void 0 : n.data,
                    s = (0, g.useFourByte)({ to: o, data: a });
                  return null != s && s.name
                    ? r.default.createElement(
                        i.ConfirmInfoRow,
                        {
                          'data-testid': 'transaction-details-method-data-row',
                          label: e('methodData'),
                          tooltip: e('methodDataTransactionDesc'),
                        },
                        r.default.createElement(i.ConfirmInfoRowText, { text: s.name })
                      )
                    : null;
                };
                n.MethodDataRow = S;
                const M = () => {
                    var e;
                    const t = (0, d.useI18nContext)(),
                      { currentConfirmation: n } = (0, p.useConfirmContext)(),
                      { currency: o } = (0, v.useUserPreferencedCurrency)(y.PRIMARY),
                      a = null == n || null === (e = n.txParams) || void 0 === e ? void 0 : e.value;
                    return a && a !== x.HEX_ZERO
                      ? r.default.createElement(
                          u.ConfirmInfoSection,
                          null,
                          r.default.createElement(
                            i.ConfirmInfoRow,
                            { 'data-testid': 'transaction-details-amount-row', label: t('amount') },
                            r.default.createElement(h.ConfirmInfoRowCurrency, {
                              value: a,
                              currency: o,
                            })
                          )
                        )
                      : null;
                  },
                  P = () => {
                    const e = (0, d.useI18nContext)(),
                      { currentConfirmation: t } = (0, p.useConfirmContext)(),
                      { id: n, chainId: o } = t ?? {},
                      a = Boolean(null == t ? void 0 : t.isUserOperation),
                      l = (0, s.useSelector)(e => (0, m.selectPaymasterAddress)(e, n));
                    return a && l
                      ? r.default.createElement(
                          u.ConfirmInfoSection,
                          null,
                          r.default.createElement(
                            i.ConfirmInfoRow,
                            {
                              'data-testid': 'transaction-details-paymaster-row',
                              label: e('confirmFieldPaymaster'),
                              tooltip: e('confirmFieldTooltipPaymaster'),
                            },
                            r.default.createElement(i.ConfirmInfoRowAddress, {
                              address: l,
                              chainId: o,
                            })
                          )
                        )
                      : null;
                  };
                function D() {
                  const e = (0, d.useI18nContext)();
                  return r.default.createElement(
                    C.Box,
                    {
                      display: E.Display.Flex,
                      flexDirection: E.FlexDirection.Row,
                      alignItems: E.AlignItems.center,
                      borderRadius: E.BorderRadius.pill,
                      backgroundColor: E.BackgroundColor.backgroundAlternative,
                      style: { padding: '1px 8px 1px 4px' },
                    },
                    r.default.createElement('img', {
                      src: 'images/logo/metamask-fox.svg',
                      width: '16',
                      height: '16',
                    }),
                    r.default.createElement(
                      C.Text,
                      { marginLeft: 2, color: E.TextColor.inherit },
                      e('interactWithSmartContract')
                    )
                  );
                }
                n.TransactionDetails = () => {
                  const e = (0, s.useSelector)(f.selectConfirmationAdvancedDetailsOpen),
                    { currentConfirmation: t } = (0, p.useConfirmContext)(),
                    n = (0, r.useMemo)(() => (0, T.hasValueAndNativeBalanceMismatch)(t), [t]);
                  return (null == t ? void 0 : t.type) === o.TransactionType.revokeDelegation
                    ? null
                    : r.default.createElement(
                        r.default.Fragment,
                        null,
                        r.default.createElement(
                          u.ConfirmInfoSection,
                          { 'data-testid': 'transaction-details-section' },
                          r.default.createElement(k.NetworkRow, { isShownWithAlertsOnly: !0 }),
                          r.default.createElement(_, null),
                          r.default.createElement(I, null),
                          e && r.default.createElement(S, null),
                          r.default.createElement(b.SigningInWithRow, null)
                        ),
                        (e || n) && r.default.createElement(M, null),
                        r.default.createElement(P, null)
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/shared/transaction-details/transaction-details.tsx',
      },
    ],
    [
      7181,
      {
        '../../../../../../../shared/constants/app': 5789,
        '../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../../../../selectors/preferences': 7357,
        '../../../simulation-details/useBalanceChanges': 7249,
        '../shared/network-row/network-row': 7172,
        '../shared/transaction-details/transaction-details': 7180,
        '@metamask/transaction-controller': 2946,
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
                  (n.TokenDetailsSection = void 0);
                var o,
                  a = e('@metamask/transaction-controller'),
                  r = (o = e('react')) && o.__esModule ? o : { default: o },
                  s = e('react-redux'),
                  i = e('../../../../../../../shared/constants/app'),
                  l = e('../../../../../../components/app/confirm/info/row'),
                  c = e('../../../../../../components/app/confirm/info/row/section'),
                  u = e('../../../../../../hooks/useI18nContext'),
                  d = e('../../../../context/confirm'),
                  m = e('../../../../selectors/preferences'),
                  f = e('../../../simulation-details/useBalanceChanges'),
                  p = e('../shared/transaction-details/transaction-details'),
                  g = e('../shared/network-row/network-row');
                n.TokenDetailsSection = () => {
                  var e;
                  const t = (0, u.useI18nContext)(),
                    { currentConfirmation: n } = (0, d.useConfirmContext)(),
                    { chainId: o } = n,
                    h = (0, s.useSelector)(m.selectConfirmationAdvancedDetailsOpen),
                    y = Boolean(
                      null === (e = n.simulationData) ||
                        void 0 === e ||
                        null === (e = e.error) ||
                        void 0 === e
                        ? void 0
                        : e.code
                    ),
                    v =
                      0 ===
                      (0, f.useBalanceChanges)({ chainId: o, simulationData: n.simulationData })
                        .value.length,
                    x = n.type !== a.TransactionType.simpleSend && (h || v || y),
                    T =
                      x &&
                      r.default.createElement(
                        l.ConfirmInfoRow,
                        {
                          label: t('interactingWith'),
                          tooltip: t('interactingWithTransactionDescription'),
                        },
                        r.default.createElement(l.ConfirmInfoRowAddress, {
                          address: n.txParams.to,
                          chainId: o,
                        })
                      ),
                    k = (null == n ? void 0 : n.origin) !== i.ORIGIN_METAMASK;
                  return r.default.createElement(
                    c.ConfirmInfoSection,
                    { 'data-testid': 'confirmation__token-details-section' },
                    r.default.createElement(g.NetworkRow, null),
                    k && r.default.createElement(p.OriginRow, null),
                    x && r.default.createElement(l.ConfirmInfoRowDivider, null),
                    T
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/token-transfer/token-details-section.tsx',
      },
    ],
    [
      7182,
      {
        '../../../../context/confirm': 7294,
        '../../../simulation-details': 7245,
        '../shared/advanced-details/advanced-details': 7156,
        '../shared/gas-fees-section/gas-fees-section': 7170,
        '../shared/send-heading/send-heading': 7176,
        './token-details-section': 7181,
        './transaction-flow-section': 7183,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = d(e('react')),
                  a = e('../../../../context/confirm'),
                  r = e('../../../simulation-details'),
                  s = e('../shared/advanced-details/advanced-details'),
                  i = e('../shared/gas-fees-section/gas-fees-section'),
                  l = d(e('../shared/send-heading/send-heading')),
                  c = e('./token-details-section'),
                  u = e('./transaction-flow-section');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { currentConfirmation: e } = (0, a.useConfirmContext)(),
                    t = 'metamask' === e.origin;
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(l.default, null),
                    o.default.createElement(u.TransactionFlowSection, null),
                    o.default.createElement(r.SimulationDetails, {
                      transaction: e,
                      isTransactionsRedesign: !0,
                      enableMetrics: !0,
                      metricsOnly: t,
                    }),
                    o.default.createElement(c.TokenDetailsSection, null),
                    o.default.createElement(i.GasFeesSection, null),
                    o.default.createElement(s.AdvancedDetails, null)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/token-transfer/token-transfer.tsx',
      },
    ],
    [
      7183,
      {
        '../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../components/component-library': 6402,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../hooks/useTransferRecipient': 7145,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.TransactionFlowSection = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../components/app/confirm/info/row/section'),
                  s = e('../../../../../../components/component-library'),
                  i = e('../../../../../../helpers/constants/design-system'),
                  l = e('../../../../../../components/app/confirm/info/row'),
                  c = e('../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  u = e('../../../../../../components/app/confirm/info/row/constants'),
                  d = e('../../../../../../hooks/useI18nContext'),
                  m = e('../../../../context/confirm'),
                  f = e('../hooks/useTransferRecipient');
                n.TransactionFlowSection = () => {
                  const e = (0, d.useI18nContext)(),
                    { currentConfirmation: t } = (0, m.useConfirmContext)(),
                    n = (0, f.useTransferRecipient)(),
                    { chainId: o } = t;
                  return a.default.createElement(
                    r.ConfirmInfoSection,
                    { 'data-testid': 'confirmation__transaction-flow' },
                    a.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Row,
                        justifyContent: i.JustifyContent.spaceBetween,
                        alignItems: i.AlignItems.center,
                      },
                      a.default.createElement(
                        c.ConfirmInfoAlertRow,
                        {
                          alertKey: u.RowAlertKey.SigningInWith,
                          label: e('from'),
                          ownerId: t.id,
                          style: { flexDirection: i.FlexDirection.Column },
                        },
                        a.default.createElement(
                          s.Box,
                          { marginTop: 1, 'data-testid': 'sender-address' },
                          a.default.createElement(l.ConfirmInfoRowAddress, {
                            address: t.txParams.from,
                            chainId: o,
                          })
                        )
                      ),
                      a.default.createElement(s.Icon, {
                        name: s.IconName.ArrowRight,
                        size: s.IconSize.Md,
                        color: i.IconColor.iconMuted,
                      }),
                      n &&
                        a.default.createElement(
                          c.ConfirmInfoAlertRow,
                          {
                            alertKey: u.RowAlertKey.InteractingWith,
                            label: e('to'),
                            ownerId: t.id,
                            style: { flexDirection: i.FlexDirection.Column },
                          },
                          a.default.createElement(
                            s.Box,
                            { marginTop: 1, 'data-testid': 'recipient-address' },
                            a.default.createElement(l.ConfirmInfoRowAddress, {
                              address: n,
                              chainId: o,
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
        file: 'ui/pages/confirmations/components/confirm/info/token-transfer/transaction-flow-section.tsx',
      },
    ],
    [
      7184,
      {
        '../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../../row/typed-sign-data-v1/typedSignDataV1': 7202,
        '../shared/network-row/network-row': 7172,
        '../shared/sign-in-with-row/sign-in-with-row': 7177,
        '@metamask/snaps-utils': 2890,
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
                  r = e('@metamask/snaps-utils'),
                  s = e('../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  i = e('../../../../../../components/app/confirm/info/row'),
                  l = e('../../../../../../components/app/confirm/info/row/constants'),
                  c = e('../../../../../../hooks/useI18nContext'),
                  u = e('../../../../context/confirm'),
                  d = e('../../row/typed-sign-data-v1/typedSignDataV1'),
                  m = e('../../../../../../components/app/confirm/info/row/section'),
                  f = e('../shared/network-row/network-row'),
                  p = e('../shared/sign-in-with-row/sign-in-with-row');
                n.default = () => {
                  var e, t, n, o;
                  const g = (0, c.useI18nContext)(),
                    { currentConfirmation: h } = (0, u.useConfirmContext)();
                  if (null == h || !h.msgParams) return null;
                  const y = (0, r.isSnapId)(
                      null === (e = h.msgParams) || void 0 === e ? void 0 : e.origin
                    )
                      ? g('requestFromInfoSnap')
                      : g('requestFromInfo'),
                    v = h.chainId;
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      m.ConfirmInfoSection,
                      null,
                      a.default.createElement(f.NetworkRow, { isShownWithAlertsOnly: !0 }),
                      a.default.createElement(
                        s.ConfirmInfoAlertRow,
                        {
                          alertKey: l.RowAlertKey.RequestFrom,
                          ownerId: h.id,
                          label: g('requestFrom'),
                          tooltip: y,
                        },
                        a.default.createElement(i.ConfirmInfoRowUrl, {
                          url:
                            (null === (t = h.msgParams) || void 0 === t ? void 0 : t.origin) ?? '',
                        })
                      ),
                      a.default.createElement(p.SigningInWithRow, null)
                    ),
                    a.default.createElement(
                      m.ConfirmInfoSection,
                      null,
                      a.default.createElement(
                        i.ConfirmInfoRow,
                        {
                          label: g('message'),
                          collapsed: !1,
                          copyEnabled: !0,
                          copyText: JSON.stringify(
                            (null === (n = h.msgParams) || void 0 === n ? void 0 : n.data) ?? {}
                          ),
                        },
                        a.default.createElement(d.ConfirmInfoRowTypedSignDataV1, {
                          data: null === (o = h.msgParams) || void 0 === o ? void 0 : o.data,
                          chainId: v,
                        })
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign-v1/typed-sign-v1.tsx',
      },
    ],
    [
      7185,
      {
        '../../../../../../../../../shared/constants/transaction': 5819,
        '../../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../../components/component-library': 6402,
        '../../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../context/confirm': 7294,
        '../../../shared/static-simulation/static-simulation': 7178,
        '../native-value-display/native-value-display': 7188,
        '../value-display/value-display': 7192,
        '@metamask/signature-controller': 2609,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getStateChangeType =
                    n.getStateChangeToolip =
                    n.default =
                    n.StateChangeType =
                      void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('@metamask/signature-controller'),
                  r = e('../../../../../../../../../shared/constants/transaction'),
                  s = e('../../../../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../../../../components/component-library'),
                  l = e('../../../../../../../../hooks/useI18nContext'),
                  c = e('../../../../../../context/confirm'),
                  u = f(e('../../../shared/static-simulation/static-simulation')),
                  d = f(e('../value-display/value-display')),
                  m = f(e('../native-value-display/native-value-display'));
                function f(e) {
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
                let g = (n.StateChangeType = (function (e) {
                  return (
                    (e.NFTListingReceive = 'NFTListingReceive'),
                    (e.NFTBiddingReceive = 'NFTBiddingReceive'),
                    e
                  );
                })({}));
                const h = (e, t) => {
                  if (t.changeType === a.DecodingDataChangeType.Receive) {
                    if (
                      null != e &&
                      e.some(
                        e =>
                          e.changeType === a.DecodingDataChangeType.Listing &&
                          e.assetType === r.TokenStandard.ERC721
                      )
                    )
                      return g.NFTListingReceive;
                    if (
                      t.assetType === r.TokenStandard.ERC721 &&
                      null != e &&
                      e.some(e => e.changeType === a.DecodingDataChangeType.Bidding)
                    )
                      return g.NFTBiddingReceive;
                  }
                  return undefined;
                };
                n.getStateChangeType = h;
                const y = (e, t) =>
                  e === g.NFTListingReceive
                    ? t('signature_decoding_list_nft_tooltip')
                    : e === g.NFTBiddingReceive
                      ? t('signature_decoding_bid_nft_tooltip')
                      : undefined;
                n.getStateChangeToolip = y;
                const v = {
                    [a.DecodingDataChangeType.Transfer]: 1,
                    [a.DecodingDataChangeType.Listing]: 2,
                    [a.DecodingDataChangeType.Approve]: 3,
                    [a.DecodingDataChangeType.Revoke]: 4,
                    [a.DecodingDataChangeType.Bidding]: 5,
                    [a.DecodingDataChangeType.Receive]: 6,
                  },
                  x = (e, t, n) =>
                    ({
                      [a.DecodingDataChangeType.Transfer]: e('permitSimulationChange_transfer'),
                      [a.DecodingDataChangeType.Receive]:
                        n === g.NFTListingReceive
                          ? e('permitSimulationChange_nft_listing')
                          : e('permitSimulationChange_receive'),
                      [a.DecodingDataChangeType.Approve]: e('permitSimulationChange_approve'),
                      [a.DecodingDataChangeType.Revoke]: e('permitSimulationChange_revoke2'),
                      [a.DecodingDataChangeType.Bidding]: e('permitSimulationChange_bidding'),
                      [a.DecodingDataChangeType.Listing]: e('permitSimulationChange_listing'),
                    })[t],
                  T = ({
                    stateChangeList: e,
                    stateChange: t,
                    chainId: n,
                    shouldDisplayLabel: i,
                  }) => {
                    const c = (0, l.useI18nContext)(),
                      {
                        assetType: u,
                        changeType: f,
                        amount: p,
                        contractAddress: v,
                        tokenID: T,
                      } = t,
                      k = h(e, t),
                      b = y(k, c),
                      E =
                        u === r.TokenStandard.ERC20 &&
                        (f === a.DecodingDataChangeType.Approve ||
                          f === a.DecodingDataChangeType.Revoke);
                    return o.default.createElement(
                      s.ConfirmInfoRow,
                      { label: i ? x(c, f, k) : '', tooltip: b },
                      (u === r.TokenStandard.ERC20 ||
                        u === r.TokenStandard.ERC721 ||
                        u === r.TokenStandard.ERC1155) &&
                        o.default.createElement(d.default, {
                          tokenContract: v,
                          value: p,
                          chainId: n,
                          tokenId: T,
                          credit:
                            k !== g.NFTListingReceive && f === a.DecodingDataChangeType.Receive,
                          debit: f === a.DecodingDataChangeType.Transfer,
                          canDisplayValueAsUnlimited: E,
                        }),
                      'NATIVE' === u &&
                        o.default.createElement(m.default, {
                          value: p,
                          chainId: n,
                          credit:
                            k !== g.NFTListingReceive && f === a.DecodingDataChangeType.Receive,
                          debit: f === a.DecodingDataChangeType.Transfer,
                        })
                    );
                  };
                n.default = () => {
                  const e = (0, l.useI18nContext)(),
                    { currentConfirmation: t } = (0, c.useConfirmContext)(),
                    n = t.chainId,
                    { decodingLoading: a, decodingData: r } = t,
                    s = (0, o.useMemo)(() => {
                      var e;
                      const t = (
                        (null == r || null === (e = r.stateChanges) || void 0 === e
                          ? void 0
                          : e.sort((e, t) => (v[e.changeType] > v[t.changeType] ? 1 : -1))) ?? []
                      ).reduce(
                        (e, t) => ((e[t.changeType] = [...(e[t.changeType] ?? []), t]), e),
                        {}
                      );
                      return Object.entries(t).flatMap(([e, t]) =>
                        t.map((e, t) =>
                          o.default.createElement(T, {
                            stateChangeList: (null == r ? void 0 : r.stateChanges) ?? [],
                            stateChange: e,
                            chainId: n,
                            shouldDisplayLabel: 0 === t,
                          })
                        )
                      );
                    }, [null == r ? void 0 : r.stateChanges]);
                  return o.default.createElement(u.default, {
                    title: e('simulationDetailsTitle'),
                    titleTooltip: e('simulationDetailsTitleTooltip'),
                    simulationElements: s.length
                      ? s
                      : o.default.createElement(i.Text, null, e('simulationDetailsUnavailable')),
                    isLoading: a,
                    isCollapsed: a || !s.length,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/decoded-simulation/decoded-simulation.tsx',
      },
    ],
    [
      7186,
      { './decoded-simulation': 7185 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'DecodedSimulation', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./decoded-simulation')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/decoded-simulation/index.ts',
      },
    ],
    [
      7187,
      { './typed-sign-v4-simulation': 7191 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'TypedSignV4Simulation', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./typed-sign-v4-simulation')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/index.ts',
      },
    ],
    [
      7188,
      {
        '../../../../../../../../../shared/constants/transaction': 5819,
        '../../../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../../../components/component-library': 6402,
        '../../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../../helpers/utils/util': 6921,
        '../../../../../../../../selectors': 7601,
        '../../../../../simulation-details/asset-pill': 7240,
        '../../../../../simulation-details/fiat-display': 7243,
        '../../../../../simulation-details/formatAmount': 7244,
        '../../../utils': 7194,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o,
                  a = e('bignumber.js'),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  s = e('react-redux'),
                  i = e('../../../../../../../../../shared/constants/transaction'),
                  l = e('../../../../../../../../../shared/lib/transactions-controller-utils'),
                  c = e('../../../../../../../../components/component-library'),
                  u = e('../../../../../../../../helpers/constants/design-system'),
                  d =
                    (o = e('../../../../../../../../components/ui/tooltip')) && o.__esModule
                      ? o
                      : { default: o },
                  m = e('../../../../../../../../helpers/utils/util'),
                  f = e('../../../../../../../../selectors'),
                  p = e('../../../../../simulation-details/asset-pill'),
                  g = e('../../../../../simulation-details/formatAmount'),
                  h = e('../../../../../simulation-details/fiat-display'),
                  y = e('../../../utils');
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (v = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ chainId: e, value: t, credit: n, debit: o }) => {
                  const v = (0, s.useSelector)(t => (0, f.selectConversionRateByChainId)(t, e)),
                    {
                      fiatValue: x,
                      tokenValue: T,
                      tokenValueMaxPrecision: k,
                    } = (0, r.useMemo)(() => {
                      if (!t) return { tokenValue: null, tokenValueMaxPrecision: null };
                      const e = (0, l.calcTokenAmount)(t, 18);
                      return {
                        fiatValue: v ? new a.BigNumber(e).times(String(v)).toNumber() : undefined,
                        tokenValue: (0, g.formatAmount)('en-US', e),
                        tokenValueMaxPrecision: (0, g.formatAmountMaxPrecision)('en-US', e),
                      };
                    }, [v, t]),
                    { color: b, backgroundColor: E } = (0, y.getAmountColors)(n, o);
                  return r.default.createElement(
                    c.Box,
                    { style: { marginLeft: 'auto', maxWidth: '100%' } },
                    r.default.createElement(
                      c.Box,
                      { display: u.Display.Flex, justifyContent: u.JustifyContent.flexEnd },
                      r.default.createElement(
                        c.Box,
                        {
                          display: u.Display.Inline,
                          marginInlineEnd: 1,
                          minWidth: u.BlockSize.Zero,
                        },
                        r.default.createElement(
                          d.default,
                          {
                            position: 'bottom',
                            title: k,
                            wrapperStyle: { minWidth: 0 },
                            interactive: !0,
                          },
                          r.default.createElement(
                            c.Text,
                            {
                              'data-testid': 'simulation-native-value-display',
                              backgroundColor: E,
                              borderRadius: u.BorderRadius.XL,
                              color: b,
                              paddingInline: 2,
                              style: { paddingTop: '1px', paddingBottom: '1px' },
                              textAlign: u.TextAlign.Center,
                            },
                            n && '+ ',
                            o && '- ',
                            null !== T &&
                              (0, m.shortenString)(T || '', {
                                truncatedCharLimit: 15,
                                truncatedStartChars: 15,
                                truncatedEndChars: 0,
                                skipCharacterInEnd: !0,
                              })
                          )
                        )
                      ),
                      r.default.createElement(p.AssetPill, {
                        asset: { chainId: e, standard: i.TokenStandard.none },
                      })
                    ),
                    r.default.createElement(
                      c.Box,
                      null,
                      x !== undefined &&
                        r.default.createElement(h.IndividualFiatDisplay, {
                          fiatAmount: x,
                          shorten: !0,
                        })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/native-value-display/native-value-display.tsx',
      },
    ],
    [
      7189,
      { './permit-simulation': 7190 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'PermitSimulation', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./permit-simulation')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/permit-simulation/index.ts',
      },
    ],
    [
      7190,
      {
        '../../../../../../../../../shared/constants/signatures': 5812,
        '../../../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../../../components/component-library': 6402,
        '../../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../context/confirm': 7294,
        '../../../shared/static-simulation/static-simulation': 7178,
        '../value-display/value-display': 7192,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = f(e('react')),
                  a = e('../../../../../../../../../shared/constants/signatures'),
                  r = e('../../../../../../../../../shared/modules/transaction.utils'),
                  s = e('../../../../../../../../components/app/confirm/info/row'),
                  i = e('../../../../../../../../components/component-library'),
                  l = e('../../../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../../context/confirm'),
                  d = f(e('../../../shared/static-simulation/static-simulation')),
                  m = f(e('../value-display/value-display'));
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  var e;
                  const t = (0, c.useI18nContext)(),
                    { currentConfirmation: n } = (0, u.useConfirmContext)(),
                    f = null === (e = n.msgParams) || void 0 === e ? void 0 : e.data,
                    p = n.chainId,
                    {
                      domain: { verifyingContract: g },
                      message: h,
                      message: { tokenId: y },
                      primaryType: v,
                    } = (0, r.parseTypedDataMessage)(f),
                    x = y !== undefined,
                    T = (function (e, t) {
                      let n;
                      switch (t) {
                        case a.PrimaryType.PermitBatch:
                        case a.PrimaryType.PermitSingle:
                          n = null == e ? void 0 : e.details;
                          break;
                        case a.PrimaryType.PermitBatchTransferFrom:
                        case a.PrimaryType.PermitTransferFrom:
                          n = null == e ? void 0 : e.permitted;
                      }
                      return n && !Array.isArray(n) ? [n] : n;
                    })(h, v),
                    k = ({ token: e, amount: t }) =>
                      o.default.createElement(m.default, {
                        primaryType: v,
                        tokenContract: e,
                        value: t,
                        chainId: p,
                        message: h,
                        canDisplayValueAsUnlimited: !0,
                      });
                  let b = 'spendingCap',
                    E = 'permitSimulationDetailInfo';
                  !1 === h.allowed
                    ? ((E = 'revokeSimulationDetailsDesc'), (b = 'permitSimulationChange_revoke2'))
                    : x && ((E = 'simulationDetailsApproveDesc'), (b = 'simulationApproveHeading'));
                  const C = o.default.createElement(
                    s.ConfirmInfoRow,
                    { label: t(b) },
                    o.default.createElement(
                      i.Box,
                      { style: { marginLeft: 'auto', maxWidth: '100%' } },
                      Array.isArray(T)
                        ? o.default.createElement(
                            i.Box,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              gap: 2,
                            },
                            T.map(({ token: e, amount: t }, n) =>
                              o.default.createElement(k, { token: e, amount: t, key: `${e}-${n}` })
                            )
                          )
                        : o.default.createElement(m.default, {
                            tokenContract: g,
                            value: h.value,
                            tokenId: h.tokenId,
                            chainId: p,
                            message: h,
                            canDisplayValueAsUnlimited: !0,
                          })
                    )
                  );
                  return o.default.createElement(d.default, {
                    title: t('simulationDetailsTitle'),
                    titleTooltip: t('simulationDetailsTitleTooltip'),
                    description: t(E),
                    simulationElements: C,
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/permit-simulation/permit-simulation.tsx',
      },
    ],
    [
      7191,
      {
        '../../../../../context/confirm': 7294,
        '../../../../../hooks/useDecodedSignatureMetrics': 7332,
        '../../../../../hooks/useTypesSignSimulationEnabledInfo': 7354,
        '../../../../../utils': 7364,
        './decoded-simulation': 7186,
        './permit-simulation': 7189,
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
                  r = e('../../../../../utils'),
                  s = e('../../../../../context/confirm'),
                  i = e('../../../../../hooks/useDecodedSignatureMetrics'),
                  l = e('../../../../../hooks/useTypesSignSimulationEnabledInfo'),
                  c = e('./decoded-simulation'),
                  u = e('./permit-simulation');
                n.default = () => {
                  const { currentConfirmation: e } = (0, s.useConfirmContext)(),
                    t = (0, r.isPermitSignatureRequest)(e),
                    n = (0, l.useTypesSignSimulationEnabledInfo)();
                  if (((0, i.useDecodedSignatureMetrics)(!0 === n), !n)) return null;
                  const { decodingData: o, decodingLoading: d } = e;
                  return ((!d && o === undefined) || (null != o && o.error)) && t
                    ? a.default.createElement(u.PermitSimulation, null)
                    : a.default.createElement(c.DecodedSimulation, null);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/typed-sign-v4-simulation.tsx',
      },
    ],
    [
      7192,
      {
        '../../../../../../../../../shared/constants/metametrics': 5800,
        '../../../../../../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../../../../../components/app/currency-input/hooks/useTokenExchangeRate': 6015,
        '../../../../../../../../components/app/name/name': 6115,
        '../../../../../../../../components/component-library': 6402,
        '../../../../../../../../components/ui/tooltip': 6818,
        '../../../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../../../helpers/utils/util': 6921,
        '../../../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../hooks/useGetTokenStandardAndDetails': 7339,
        '../../../../../../hooks/useTrackERC20WithoutDecimalInformation': 7349,
        '../../../../../simulation-details/fiat-display': 7243,
        '../../../../../simulation-details/formatAmount': 7244,
        '../../../shared/constants': 7158,
        '../../../utils': 7194,
        '@metamask/name-controller': 2190,
        '@sentry/browser': 3136,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = e('@metamask/name-controller'),
                  a = e('@sentry/browser'),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = b(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  s = e('../../../../../../../../../shared/constants/metametrics'),
                  i = e('../../../../../../../../../shared/lib/transactions-controller-utils'),
                  l = k(
                    e(
                      '../../../../../../../../components/app/currency-input/hooks/useTokenExchangeRate'
                    )
                  ),
                  c = k(e('../../../../../../../../components/app/name/name')),
                  u = e('../../../../../../../../components/component-library'),
                  d = k(e('../../../../../../../../components/ui/tooltip')),
                  m = e('../../../../../../../../helpers/constants/design-system'),
                  f = e('../../../../../../../../helpers/utils/util'),
                  p = e('../../../../../../../../hooks/useI18nContext'),
                  g = e('../../../../../../hooks/useGetTokenStandardAndDetails'),
                  h = k(e('../../../../../../hooks/useTrackERC20WithoutDecimalInformation')),
                  y = e('../../../../../simulation-details/fiat-display'),
                  v = e('../../../../../simulation-details/formatAmount'),
                  x = e('../../../shared/constants'),
                  T = e('../../../utils');
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
                n.default = ({
                  chainId: e,
                  primaryType: t,
                  tokenContract: n,
                  tokenId: k,
                  value: b,
                  message: E,
                  credit: C,
                  debit: w,
                  canDisplayValueAsUnlimited: _,
                }) => {
                  const I = (0, p.useI18nContext)(),
                    S = (0, l.default)(n),
                    M = (0, g.useGetTokenStandardAndDetails)(n);
                  (0, h.default)(e, n, M, s.MetaMetricsEventLocation.SignatureConfirmation);
                  const { decimalsNumber: P } = M,
                    D = (0, r.useMemo)(() => {
                      if (S && b && !k) {
                        const e = (0, i.calcTokenAmount)(b, P);
                        return S.times(e).toNumber();
                      }
                      return undefined;
                    }, [S, P, k, b]),
                    {
                      tokenValue: A,
                      tokenValueMaxPrecision: F,
                      shouldShowUnlimitedValue: O,
                    } = (0, r.useMemo)(() => {
                      const e = n === x.DAI_CONTRACT_ADDRESS,
                        t = (null == E ? void 0 : E.allowed) !== undefined,
                        o = e && t;
                      if (!b || k)
                        return {
                          tokenValue: null,
                          tokenValueMaxPrecision: null,
                          shouldShowUnlimitedValue: _ && o,
                        };
                      const a = (0, i.calcTokenAmount)(b, P),
                        r = Number(b) > x.TOKEN_VALUE_UNLIMITED_THRESHOLD;
                      return {
                        tokenValue: (0, v.formatAmount)('en-US', a),
                        tokenValueMaxPrecision: (0, v.formatAmountMaxPrecision)('en-US', a),
                        shouldShowUnlimitedValue: _ && (r || o),
                      };
                    }, [_, null == E ? void 0 : E.allowed, P, n, k, b]);
                  if (!n)
                    return (
                      (0, a.captureException)(
                        new Error(
                          `PermitSimulationValueDisplay: Token contract address is missing where primaryType === ${t}`
                        )
                      ),
                      null
                    );
                  const { color: R, backgroundColor: N } = (0, T.getAmountColors)(C, w);
                  return r.default.createElement(
                    u.Box,
                    { marginLeft: 'auto', style: { maxWidth: '100%' } },
                    r.default.createElement(
                      u.Box,
                      { display: m.Display.Flex, justifyContent: m.JustifyContent.flexEnd },
                      r.default.createElement(
                        u.Box,
                        {
                          display: m.Display.Inline,
                          marginInlineEnd: 1,
                          minWidth: m.BlockSize.Zero,
                        },
                        r.default.createElement(
                          d.default,
                          {
                            position: 'bottom',
                            title: F,
                            wrapperStyle: { minWidth: 0 },
                            interactive: !0,
                          },
                          r.default.createElement(
                            u.Text,
                            {
                              'data-testid': 'simulation-token-value',
                              backgroundColor: N,
                              borderRadius: m.BorderRadius.XL,
                              color: R,
                              paddingInline: 2,
                              style: { paddingTop: '1px', paddingBottom: '1px' },
                              textAlign: m.TextAlign.Center,
                            },
                            C && '+ ',
                            w && '- ',
                            O
                              ? I('unlimited')
                              : null !== A &&
                                  (0, f.shortenString)(A || '', {
                                    truncatedCharLimit: 15,
                                    truncatedStartChars: 15,
                                    truncatedEndChars: 0,
                                    skipCharacterInEnd: !0,
                                  }),
                            k && `#${k}`
                          )
                        )
                      ),
                      r.default.createElement(c.default, {
                        value: n,
                        type: o.NameType.ETHEREUM_ADDRESS,
                        variation: e,
                        preferContractSymbol: !0,
                      })
                    ),
                    r.default.createElement(
                      u.Box,
                      null,
                      D !== undefined &&
                        r.default.createElement(y.IndividualFiatDisplay, {
                          fiatAmount: D,
                          shorten: !0,
                        })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign-v4-simulation/value-display/value-display.tsx',
      },
    ],
    [
      7193,
      {
        '../../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../../components/app/confirm/info/row/section': 5986,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../../../../hooks/useGetTokenStandardAndDetails': 7339,
        '../../../../hooks/useTypesSignSimulationEnabledInfo': 7354,
        '../../../../utils': 7364,
        '../../row/typed-sign-data/typedSignData': 7203,
        '../shared/network-row/network-row': 7172,
        '../shared/sign-in-with-row/sign-in-with-row': 7177,
        './typed-sign-v4-simulation': 7187,
        '@metamask/snaps-utils': 2890,
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
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('ethereumjs-util'),
                  s = e('@metamask/snaps-utils'),
                  i = e('../../../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  l = e('../../../../../../../shared/modules/transaction.utils'),
                  c = e('../../../../../../components/app/confirm/info/row/constants'),
                  u = e('../../../../../../components/app/confirm/info/row'),
                  d = e('../../../../../../components/app/confirm/info/row/section'),
                  m = e('../../../../../../hooks/useI18nContext'),
                  f = e('../../../../hooks/useGetTokenStandardAndDetails'),
                  p = e('../../../../utils'),
                  g = e('../../../../context/confirm'),
                  h = e('../../../../hooks/useTypesSignSimulationEnabledInfo'),
                  y = e('../../row/typed-sign-data/typedSignData'),
                  v = e('../shared/network-row/network-row'),
                  x = e('../shared/sign-in-with-row/sign-in-with-row'),
                  T = e('./typed-sign-v4-simulation');
                n.default = () => {
                  var e;
                  const t = (0, m.useI18nContext)(),
                    { currentConfirmation: n } = (0, g.useConfirmContext)(),
                    o = (0, h.useTypesSignSimulationEnabledInfo)();
                  if (null == n || !n.msgParams) return null;
                  const {
                      domain: { verifyingContract: k },
                      message: { spender: b },
                    } = (0, l.parseTypedDataMessage)(n.msgParams.data),
                    E = (0, p.isPermitSignatureRequest)(n),
                    C = (0, p.isOrderSignatureRequest)(n),
                    w = E || C ? k : undefined,
                    { decimalsNumber: _ } = (0, f.useGetTokenStandardAndDetails)(w),
                    I = n.chainId,
                    S = (0, s.isSnapId)(n.msgParams.origin)
                      ? t('requestFromInfoSnap')
                      : t('requestFromInfo'),
                    M = null === (e = n.msgParams) || void 0 === e ? void 0 : e.data;
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    o && a.default.createElement(T.TypedSignV4Simulation, null),
                    a.default.createElement(
                      d.ConfirmInfoSection,
                      { 'data-testid': 'confirmation_request-section' },
                      E &&
                        a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(
                            u.ConfirmInfoRow,
                            { label: t('spender') },
                            a.default.createElement(u.ConfirmInfoRowAddress, {
                              address: b,
                              chainId: I,
                            })
                          ),
                          a.default.createElement(u.ConfirmInfoRowDivider, null)
                        ),
                      a.default.createElement(v.NetworkRow, { isShownWithAlertsOnly: !0 }),
                      a.default.createElement(
                        i.ConfirmInfoAlertRow,
                        {
                          alertKey: c.RowAlertKey.RequestFrom,
                          ownerId: n.id,
                          label: t('requestFrom'),
                          tooltip: S,
                        },
                        a.default.createElement(u.ConfirmInfoRowUrl, { url: n.msgParams.origin })
                      ),
                      (0, r.isValidAddress)(k) &&
                        a.default.createElement(
                          u.ConfirmInfoRow,
                          { label: t('interactingWith') },
                          a.default.createElement(u.ConfirmInfoRowAddress, {
                            address: k,
                            chainId: I,
                          })
                        ),
                      a.default.createElement(x.SigningInWithRow, null)
                    ),
                    a.default.createElement(
                      d.ConfirmInfoSection,
                      { 'data-testid': 'confirmation_message-section' },
                      a.default.createElement(
                        u.ConfirmInfoRow,
                        {
                          label: t('message'),
                          collapsed: o,
                          copyEnabled: !0,
                          copyText: JSON.stringify((0, l.parseTypedDataMessage)(M ?? {})),
                        },
                        a.default.createElement(y.ConfirmInfoRowTypedSignData, {
                          data: M,
                          tokenDecimals: _,
                          chainId: I,
                        })
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/info/typed-sign/typed-sign.tsx',
      },
    ],
    [
      7194,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '@metamask/utils': 2995,
        'bn.js': 4078,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getAmountColors = void 0),
                  (n.getIsRevokeSetApprovalForAll = function (e) {
                    var t;
                    return (
                      'setApprovalForAll' === (null == e ? void 0 : e.name) &&
                      !1 ===
                        (null == e || null === (t = e.args) || void 0 === t ? void 0 : t._approved)
                    );
                  }),
                  (n.getPercentageChange = i),
                  (n.hasValueAndNativeBalanceMismatch = function (e) {
                    var t, n;
                    const r =
                        (null == e || null === (t = e.txParams) || void 0 === t
                          ? void 0
                          : t.value) ?? '0x0',
                      l =
                        null == e || null === (n = e.simulationData) || void 0 === n
                          ? void 0
                          : n.nativeBalanceChange,
                      c = (null == l ? void 0 : l.difference) ?? '0x0';
                    return !(function (e, t, n) {
                      const r = new a.BN((0, o.remove0x)(e), 'hex');
                      let l = new a.BN((0, o.remove0x)(t), 'hex');
                      n && (l = l.neg());
                      return i(r, l) <= s;
                    })(r, c, !1 === (null == l ? void 0 : l.isDecrease));
                  }),
                  (n.isValidUTF8 = function (e) {
                    try {
                      const t = new TextEncoder().encode(e);
                      return new TextDecoder('utf-8', { fatal: !0 }).decode(t), !0;
                    } catch (e) {
                      return !1;
                    }
                  });
                var o = e('@metamask/utils'),
                  a = e('bn.js'),
                  r = e('../../../../../helpers/constants/design-system');
                const s = 5;
                function i(e, t) {
                  const n = new a.BN(10).pow(new a.BN(18)),
                    o = e.mul(n),
                    r = t.mul(n),
                    s = r.sub(o);
                  return s.isZero()
                    ? 0
                    : o.isZero() && !r.isZero()
                      ? 100
                      : s.muln(100).div(o).abs().toNumber();
                }
                n.getAmountColors = (e, t) => {
                  let n = r.TextColor.textDefault,
                    o = r.BackgroundColor.backgroundAlternative;
                  return (
                    e
                      ? ((n = r.TextColor.successDefault), (o = r.BackgroundColor.successMuted))
                      : t && ((n = r.TextColor.errorDefault), (o = r.BackgroundColor.errorMuted)),
                    { color: n, backgroundColor: o }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/info/utils.ts' },
    ],
    [
      7195,
      { './ledger-info': 7196 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'LedgerInfo', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./ledger-info')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/ledger-info/index.ts' },
    ],
    [
      7196,
      {
        '../../../../../../app/scripts/lib/util': 204,
        '../../../../../../shared/constants/app': 5789,
        '../../../../../../shared/constants/hardware-wallets': 5796,
        '../../../../../components/component-library': 6402,
        '../../../../../ducks/app/app': 6845,
        '../../../../../ducks/metamask/metamask': 6860,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../hooks/useLedgerConnection': 7341,
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
                var o = p(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../app/scripts/lib/util'),
                  s = e('../../../../../../shared/constants/app'),
                  i = e('../../../../../../shared/constants/hardware-wallets'),
                  l = e('../../../../../components/component-library'),
                  c = e('../../../../../ducks/app/app'),
                  u = e('../../../../../ducks/metamask/metamask'),
                  d = e('../../../../../helpers/constants/design-system'),
                  m = e('../../../../../hooks/useI18nContext'),
                  f = p(e('../../../hooks/useLedgerConnection'));
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { isLedgerWallet: e } = (0, f.default)(),
                    t = (0, m.useI18nContext)(),
                    n = (0, a.useDispatch)(),
                    p = (0, a.useSelector)(c.getLedgerWebHidConnectedStatus),
                    g = (0, a.useSelector)(u.getLedgerTransportType),
                    h = (0, a.useSelector)(c.getLedgerTransportStatus),
                    y = (0, r.getEnvironmentType)() === s.ENVIRONMENT_TYPE_FULLSCREEN;
                  if (!e) return null;
                  const v = g === i.LedgerTransportTypes.webhid;
                  return o.default.createElement(
                    l.BannerAlert,
                    { severity: l.BannerAlertSeverity.Info, style: { marginTop: 16 } },
                    o.default.createElement(
                      l.Text,
                      { variant: d.TextVariant.headingSm, fontWeight: d.FontWeight.Medium },
                      t('ledgerConnectionInstructionHeader')
                    ),
                    o.default.createElement(
                      'ul',
                      { style: { listStyle: 'disc' } },
                      o.default.createElement(
                        'li',
                        null,
                        o.default.createElement(
                          l.Text,
                          { variant: d.TextVariant.bodyMd },
                          t('ledgerConnectionInstructionStepThree')
                        )
                      ),
                      o.default.createElement(
                        'li',
                        null,
                        o.default.createElement(
                          l.Text,
                          { variant: d.TextVariant.bodyMd },
                          t('ledgerConnectionInstructionStepFour')
                        )
                      )
                    ),
                    h === i.HardwareTransportStates.deviceOpenFailure &&
                      o.default.createElement(
                        l.Button,
                        {
                          variant: l.ButtonVariant.Link,
                          textAlign: d.TextAlign.Left,
                          fontWeight: d.FontWeight.Normal,
                          onClick: async () => {
                            var e, t;
                            y
                              ? window.location.reload()
                              : null === (e = (t = global.platform).openExtensionInBrowser) ||
                                void 0 === e ||
                                e.call(t, null, null, !0);
                          },
                        },
                        t('ledgerConnectionInstructionCloseOtherApps')
                      ),
                    v &&
                      p === i.WebHIDConnectedStatuses.notConnected &&
                      o.default.createElement(
                        l.Button,
                        {
                          variant: l.ButtonVariant.Link,
                          textAlign: d.TextAlign.Left,
                          fontWeight: d.FontWeight.Normal,
                          onClick: async () => {
                            if (y) {
                              const e = (
                                await window.navigator.hid.requestDevice({
                                  filters: [{ vendorId: Number(i.LEDGER_USB_VENDOR_ID) }],
                                })
                              ).some(e => e.vendorId === Number(i.LEDGER_USB_VENDOR_ID));
                              n(
                                (0, c.setLedgerWebHidConnectedStatus)(
                                  e
                                    ? i.WebHIDConnectedStatuses.connected
                                    : i.WebHIDConnectedStatuses.notConnected
                                )
                              );
                            } else {
                              var e, t;
                              null === (e = (t = global.platform).openExtensionInBrowser) ||
                                void 0 === e ||
                                e.call(t, null, null, !0);
                            }
                          },
                        },
                        t(y ? 'clickToConnectLedgerViaWebHID' : 'openFullScreenForLedgerWebHid')
                      )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/ledger-info/ledger-info.tsx',
      },
    ],
    [
      7197,
      { './nav': 7198 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./nav');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/nav/index.tsx' },
    ],
    [
      7198,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../store/actions': 7619,
        '../../../context/confirm': 7294,
        '../../../hooks/useConfirmationNavigation': 7327,
        '../../../hooks/useQueuedConfirmationEvents': 7345,
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
                  (n.Nav = n.ConfirmNav = void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../shared/constants/metametrics'),
                  s = e('../../../../../components/component-library'),
                  i = e('../../../../../helpers/constants/design-system'),
                  l = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../../../store/actions'),
                  u = e('../../../hooks/useQueuedConfirmationEvents'),
                  d = e('../../../hooks/useConfirmationNavigation'),
                  m = e('../../../context/confirm');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const p = ({ confirmationId: e }) => {
                  const t = (0, l.useI18nContext)(),
                    n = (0, a.useDispatch)(),
                    {
                      count: m,
                      getIndex: f,
                      navigateToIndex: p,
                    } = (0, d.useConfirmationNavigation)(),
                    g = f(e),
                    h = (0, o.useCallback)(
                      e => {
                        p(g + e);
                      },
                      [g, p]
                    ),
                    y = (0, o.useCallback)(async () => {
                      await n((0, c.rejectAllApprovals)());
                    }, [n]);
                  return (
                    (0, u.useQueuedConfirmationsEvent)(r.QueueType.NavigationHeader),
                    m <= 1
                      ? null
                      : o.default.createElement(
                          s.Box,
                          {
                            alignItems: i.AlignItems.center,
                            backgroundColor: i.BackgroundColor.backgroundDefault,
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Row,
                            justifyContent: i.JustifyContent.spaceBetween,
                            padding: 3,
                            width: i.BlockSize.Full,
                            style: { zIndex: 2, position: 'relative' },
                          },
                          o.default.createElement(
                            s.Box,
                            { alignItems: i.AlignItems.center, display: i.Display.Flex },
                            o.default.createElement(s.ButtonIcon, {
                              ariaLabel: 'Previous Confirmation',
                              'data-testid': 'confirm-nav__previous-confirmation',
                              backgroundColor: i.BackgroundColor.backgroundAlternative,
                              borderRadius: i.BorderRadius.full,
                              className: 'confirm_nav__left_btn',
                              color: i.IconColor.iconAlternative,
                              disabled: 0 === g,
                              iconName: s.IconName.ArrowLeft,
                              onClick: () => h(-1),
                              size: s.ButtonIconSize.Sm,
                            }),
                            o.default.createElement(
                              s.Text,
                              {
                                color: i.TextColor.textAlternative,
                                marginInline: 2,
                                variant: i.TextVariant.bodySm,
                                'data-testid': 'confirm-page-nav-position',
                              },
                              g + 1,
                              ' of ',
                              m
                            ),
                            o.default.createElement(s.ButtonIcon, {
                              ariaLabel: 'Next Confirmation',
                              'data-testid': 'confirm-nav__next-confirmation',
                              backgroundColor: i.BackgroundColor.backgroundAlternative,
                              borderRadius: i.BorderRadius.full,
                              className: 'confirm_nav__right_btn',
                              color: i.IconColor.iconAlternative,
                              disabled: g === m - 1,
                              iconName: s.IconName.ArrowRight,
                              onClick: () => h(1),
                              size: s.ButtonIconSize.Sm,
                            })
                          ),
                          o.default.createElement(
                            s.Button,
                            {
                              borderRadius: i.BorderRadius.XL,
                              className: 'confirm_nav__reject_all',
                              'data-testid': 'confirm-nav__reject-all',
                              fontWeight: i.FontWeight.Normal,
                              onClick: y,
                              paddingLeft: 3,
                              paddingRight: 3,
                              startIconName: s.IconName.Close,
                              type: s.ButtonVariant.Secondary,
                            },
                            t('rejectAll')
                          )
                        )
                  );
                };
                n.Nav = p;
                n.ConfirmNav = () => {
                  const { currentConfirmation: e } = (0, m.useConfirmContext)();
                  return o.default.createElement(p, { confirmationId: null == e ? void 0 : e.id });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/nav/nav.tsx' },
    ],
    [
      7199,
      { './pluggable-section': 7200 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'PluggableSection', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./pluggable-section')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/pluggable-section/index.ts',
      },
    ],
    [
      7200,
      { '../../../context/confirm': 7294, '../snaps/snaps-section': 7206, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../context/confirm');
                const s = [e('../snaps/snaps-section').SnapsSection];
                n.default = () => {
                  const { currentConfirmation: e } = (0, r.useConfirmContext)();
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    s.map((t, n) =>
                      a.default.createElement(t, { key: `section-${n}`, confirmation: e })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/pluggable-section/pluggable-section.tsx',
      },
    ],
    [
      7201,
      {
        '../../../../../../shared/constants/signatures': 5812,
        '../../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../../components/app/confirm/info/row': 5984,
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/util': 6921,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../hooks/useGetTokenStandardAndDetails': 7339,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.DataTree = void 0);
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('../../../../../../shared/constants/signatures'),
                  r = e('../../../../../../shared/modules/hexstring-utils'),
                  s = e('../../../../../helpers/utils/util'),
                  i = e('../../../../../components/component-library'),
                  l = e('../../../../../helpers/constants/design-system'),
                  c = e('../../../../../hooks/useI18nContext'),
                  u = e('../../../../../components/app/confirm/info/row'),
                  d = e('../../../hooks/useGetTokenStandardAndDetails');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                var f = (function (e) {
                  return (
                    (e.Amount = 'amount'),
                    (e.BuyAmount = 'buyAmount'),
                    (e.Deadline = 'deadline'),
                    (e.EndAmount = 'endAmount'),
                    (e.EndTime = 'endTime'),
                    (e.Expiration = 'expiration'),
                    (e.Expiry = 'expiry'),
                    (e.SellAmount = 'sellAmount'),
                    (e.SigDeadline = 'sigDeadline'),
                    (e.StartAmount = 'startAmount'),
                    (e.StartTime = 'startTime'),
                    (e.ValidTo = 'validTo'),
                    (e.Value = 'value'),
                    e
                  );
                })(f || {});
                const p = {
                    [f.Amount]: [...a.PRIMARY_TYPES_PERMIT],
                    [f.BuyAmount]: [...a.PRIMARY_TYPES_ORDER],
                    [f.EndAmount]: [...a.PRIMARY_TYPES_ORDER],
                    [f.SellAmount]: [...a.PRIMARY_TYPES_ORDER],
                    [f.StartAmount]: [...a.PRIMARY_TYPES_ORDER],
                    [f.Value]: [...a.PRIMARY_TYPES_PERMIT],
                  },
                  g = {
                    [f.Deadline]: [...a.PRIMARY_TYPES_PERMIT],
                    [f.EndTime]: [...a.PRIMARY_TYPES_ORDER],
                    [f.Expiration]: [a.PrimaryType.PermitBatch, a.PrimaryType.PermitSingle],
                    [f.Expiry]: [...a.PRIMARY_TYPES_PERMIT],
                    [f.SigDeadline]: [...a.PRIMARY_TYPES_PERMIT],
                    [f.StartTime]: [...a.PRIMARY_TYPES_ORDER],
                    [f.ValidTo]: [...a.PRIMARY_TYPES_ORDER],
                  },
                  h = ({ data: e, primaryType: t, tokenDecimals: n, chainId: a }) => {
                    const c = (e => {
                        var t;
                        if (Array.isArray(e)) return undefined;
                        const n = null === (t = e.token) || void 0 === t ? void 0 : t.value;
                        return n && (0, r.isValidHexAddress)(n) ? n : undefined;
                      })(e),
                      { decimalsNumber: m } = (0, d.useGetTokenStandardAndDetails)(c),
                      f = 'number' == typeof m ? m : n;
                    return o.default.createElement(
                      i.Box,
                      { width: l.BlockSize.Full },
                      Object.entries(e).map(([e, { value: n, type: r }], i) =>
                        o.default.createElement(
                          u.ConfirmInfoRow,
                          {
                            label: `${(0, s.sanitizeString)(e.charAt(0).toUpperCase() + e.slice(1))}:`,
                            style: { paddingRight: 0 },
                            key: `tree-data-${e}-index-${i}`,
                            'data-testid': `confirmation_data-${e}-index-${i}`,
                          },
                          o.default.createElement(y, {
                            label: e,
                            primaryType: t,
                            value: n,
                            type: r,
                            tokenDecimals: f,
                            chainId: a,
                          })
                        )
                      )
                    );
                  };
                n.DataTree = h;
                const y = (0, o.memo)(
                  ({
                    label: e,
                    primaryType: t,
                    type: n,
                    value: a,
                    tokenDecimals: i,
                    chainId: l,
                  }) => {
                    const d = (0, c.useI18nContext)();
                    if ('object' == typeof a && null !== a)
                      return o.default.createElement(h, {
                        data: a,
                        primaryType: t,
                        tokenDecimals: i,
                        chainId: l,
                      });
                    if (
                      (function (e, t) {
                        var n;
                        return null === (n = g[e] || []) || void 0 === n
                          ? void 0
                          : n.includes(t || '');
                      })(e, t) &&
                      Boolean(a)
                    ) {
                      return -1 === parseInt(a, 10)
                        ? o.default.createElement(u.ConfirmInfoRowText, { text: d('none') })
                        : o.default.createElement(u.ConfirmInfoRowDate, {
                            unixTimestamp: parseInt(a, 10),
                          });
                    }
                    return (function (e, t) {
                      var n;
                      return null === (n = p[e] || []) || void 0 === n
                        ? void 0
                        : n.includes(t || '');
                    })(e, t)
                      ? o.default.createElement(u.ConfirmInfoRowTextTokenUnits, {
                          value: a,
                          decimals: i,
                        })
                      : 'address' === n && (0, r.isValidHexAddress)(a, { mixedCaseUseChecksum: !0 })
                        ? o.default.createElement(u.ConfirmInfoRowAddress, {
                            address: a,
                            chainId: l,
                          })
                        : 'bool' === n
                          ? o.default.createElement(u.ConfirmInfoRowText, { text: String(a) })
                          : o.default.createElement(u.ConfirmInfoRowText, {
                              text: (0, s.sanitizeString)(a),
                            });
                  }
                );
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/row/dataTree.tsx' },
    ],
    [
      7202,
      {
        '../../../../../../components/component-library': 6402,
        '../../../../../../helpers/constants/design-system': 6872,
        '../dataTree': 7201,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ConfirmInfoRowTypedSignDataV1 = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../components/component-library'),
                  s = e('../../../../../../helpers/constants/design-system'),
                  i = e('../dataTree');
                n.ConfirmInfoRowTypedSignDataV1 = ({ data: e, chainId: t }) => {
                  if (!e) return null;
                  const n = e.reduce(
                    (e, { name: t, value: n, type: o }) => ({ ...e, [t]: { type: o, value: n } }),
                    {}
                  );
                  return a.default.createElement(
                    r.Box,
                    { width: s.BlockSize.Full },
                    a.default.createElement(
                      r.Box,
                      { style: { marginLeft: -8 } },
                      a.default.createElement(i.DataTree, { data: n, chainId: t })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/row/typed-sign-data-v1/typedSignDataV1.tsx',
      },
    ],
    [
      7203,
      {
        '../../../../../../components/app/confirm/info/row': 5984,
        '../../../../../../components/component-library': 6402,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../utils': 7364,
        '../dataTree': 7201,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ConfirmInfoRowTypedSignData = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../hooks/useI18nContext'),
                  s = e('../../../../../../components/component-library'),
                  i = e('../../../../../../helpers/constants/design-system'),
                  l = e('../../../../../../components/app/confirm/info/row'),
                  c = e('../../../../utils'),
                  u = e('../dataTree');
                n.ConfirmInfoRowTypedSignData = ({ data: e, tokenDecimals: t, chainId: n }) => {
                  const o = (0, r.useI18nContext)();
                  if (!e) return null;
                  const { sanitizedMessage: d, primaryType: m } = (0,
                  c.parseSanitizeTypedDataMessage)(e);
                  return a.default.createElement(
                    s.Box,
                    { width: i.BlockSize.Full },
                    a.default.createElement(
                      l.ConfirmInfoRow,
                      { label: `${o('primaryType')}:`, style: { paddingLeft: 0, paddingRight: 0 } },
                      a.default.createElement(l.ConfirmInfoRowText, { text: m })
                    ),
                    a.default.createElement(
                      s.Box,
                      { style: { marginLeft: -8 } },
                      a.default.createElement(u.DataTree, {
                        data: d.value,
                        primaryType: m,
                        tokenDecimals: t,
                        chainId: n,
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/row/typed-sign-data/typedSignData.tsx',
      },
    ],
    [
      7204,
      { './scroll-to-bottom': 7205 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./scroll-to-bottom')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/scroll-to-bottom/index.ts',
      },
    ],
    [
      7205,
      {
        '../../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../../components/component-library': 6402,
        '../../../../../contexts/i18n': 6832,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/usePrevious': 7002,
        '../../../../../hooks/useScrollRequired': 7003,
        '../../../context/confirm': 7294,
        '../../../selectors/preferences': 7357,
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../components/component-library'),
                  s = e('../../../../../contexts/i18n'),
                  i = e('../../../../../helpers/constants/design-system'),
                  l = e('../../../../../hooks/usePrevious'),
                  c = e('../../../../../hooks/useScrollRequired'),
                  u = e('../../../context/confirm'),
                  d = e('../../../selectors/preferences'),
                  m = e('../../../../../../shared/lib/confirmation.utils');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({ children: e }) => {
                  const t = (0, o.useContext)(s.I18nContext),
                    { currentConfirmation: n, setIsScrollToBottomCompleted: f } = (0,
                    u.useConfirmContext)(),
                    p = (0, l.usePrevious)(null == n ? void 0 : n.id),
                    g = (0, a.useSelector)(d.selectConfirmationAdvancedDetailsOpen),
                    {
                      hasScrolledToBottom: h,
                      isScrollable: y,
                      isScrolledToBottom: v,
                      onScroll: x,
                      scrollToBottom: T,
                      setHasScrolledToBottom: k,
                      ref: b,
                    } = (0, c.useScrollRequired)([null == n ? void 0 : n.id, g], {
                      offsetPxFromBottom: 0,
                    }),
                    E = (0, m.isCorrectDeveloperTransactionType)(null == n ? void 0 : n.type),
                    C = y && !v && !E;
                  return (
                    (0, o.useEffect)(() => {
                      if (p === (null == n ? void 0 : n.id)) return;
                      const e = null == b ? void 0 : b.current;
                      e && ('function' == typeof e.scrollTo && e.scrollTo(0, 0), k(!1));
                    }, [null == n ? void 0 : n.id, p, null == b ? void 0 : b.current]),
                    (0, o.useEffect)(() => {
                      f(!!E || !y || h);
                    }, [y, h, E]),
                    o.default.createElement(
                      r.Box,
                      {
                        backgroundColor: i.BackgroundColor.backgroundAlternative,
                        width: i.BlockSize.Full,
                        height: i.BlockSize.Full,
                        style: { minHeight: '0', overflow: 'hidden', position: 'relative' },
                      },
                      o.default.createElement(
                        r.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          width: i.BlockSize.Full,
                          height: i.BlockSize.Full,
                          paddingLeft: 4,
                          paddingRight: 4,
                          onScroll: x,
                          ref: b,
                          style: { overflow: 'auto' },
                        },
                        e,
                        C &&
                          o.default.createElement(r.ButtonIcon, {
                            className: 'confirm-scroll-to-bottom__button',
                            onClick: T,
                            iconName: r.IconName.Arrow2Down,
                            ariaLabel: t('scrollDown'),
                            backgroundColor: i.BackgroundColor.backgroundDefault,
                            borderRadius: i.BorderRadius.full,
                            color: i.IconColor.primaryDefault,
                            display: i.Display.Flex,
                            size: r.ButtonIconSize.Md,
                          })
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/scroll-to-bottom/scroll-to-bottom.tsx',
      },
    ],
    [
      7206,
      { './snaps-section': 7208 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var o = e('./snaps-section');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in n && n[e] === o[e]) ||
                      Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/snaps/snaps-section/index.ts',
      },
    ],
    [
      7207,
      {
        '../../../../../../components/app/snaps/snap-ui-renderer': 6263,
        '../../../../../../components/component-library': 6402,
        '../../../../../../components/ui/delineator': 6725,
        '../../../../../../components/ui/tooltip': 6818,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../../../selectors': 7601,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapInsight = void 0);
                var o = m(e('react')),
                  a = e('react-redux'),
                  r = e('../../../../../../components/app/snaps/snap-ui-renderer'),
                  s = e('../../../../../../components/ui/delineator'),
                  i = e('../../../../../../components/component-library'),
                  l = e('../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../hooks/useI18nContext'),
                  u = e('../../../../../../selectors'),
                  d = m(e('../../../../../../components/ui/tooltip'));
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.SnapInsight = ({ snapId: e, interfaceId: t, loading: n, isExpanded: m }) => {
                  const f = (0, c.useI18nContext)(),
                    { name: p } = (0, a.useSelector)(t => (0, u.getSnapMetadata)(t, e)),
                    g = o.default.createElement(
                      i.Text,
                      null,
                      f('insightsFromSnap', [
                        o.default.createElement(
                          i.Text,
                          {
                            fontWeight: l.FontWeight.Medium,
                            variant: l.TextVariant.inherit,
                            color: l.TextColor.inherit,
                          },
                          p
                        ),
                      ])
                    );
                  return !n && !t
                    ? o.default.createElement(
                        d.default,
                        { position: 'top', title: f('snapsNoInsight') },
                        o.default.createElement(s.Delineator, {
                          headerComponent: g,
                          isDisabled: !0,
                        })
                      )
                    : o.default.createElement(
                        s.Delineator,
                        {
                          headerComponent: g,
                          isLoading: n,
                          isExpanded: m,
                          contentBoxProps: n
                            ? undefined
                            : { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 },
                        },
                        o.default.createElement(r.SnapUIRenderer, {
                          snapId: e,
                          interfaceId: t,
                          isLoading: n,
                          contentBackgroundColor: l.BackgroundColor.backgroundDefault,
                        })
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/snaps/snaps-section/snap-insight.tsx',
      },
    ],
    [
      7208,
      {
        '../../../../../../components/component-library': 6402,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/snaps/useInsightSnaps': 6959,
        '../../../../context/confirm': 7294,
        './snap-insight': 7207,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapsSection = void 0);
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../../../../../../hooks/snaps/useInsightSnaps'),
                  s = e('../../../../../../components/component-library'),
                  i = e('../../../../../../helpers/constants/design-system'),
                  l = e('../../../../context/confirm'),
                  c = e('./snap-insight');
                n.SnapsSection = () => {
                  const { currentConfirmation: e } = (0, l.useConfirmContext)(),
                    { data: t } = (0, r.useInsightSnaps)(null == e ? void 0 : e.id);
                  return 0 === t.length
                    ? null
                    : a.default.createElement(
                        s.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          gap: 4,
                          marginBottom: 4,
                        },
                        t.map(({ snapId: e, interfaceId: t, loading: n }, o) =>
                          a.default.createElement(c.SnapInsight, {
                            key: e,
                            snapId: e,
                            interfaceId: t,
                            loading: n,
                            isExpanded: 0 === o,
                          })
                        )
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/snaps/snaps-section/snaps-section.tsx',
      },
    ],
    [
      7209,
      { './splash': 7212 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Splash', {
                    enumerable: !0,
                    get: function () {
                      return o.Splash;
                    },
                  });
                var o = e('./splash');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/splash/index.ts' },
    ],
    [
      7210,
      { './smart-account-update': 7211 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SmartAccountUpdate', {
                    enumerable: !0,
                    get: function () {
                      return o.SmartAccountUpdate;
                    },
                  });
                var o = e('./smart-account-update');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/splash/smart-account-update/index.ts',
      },
    ],
    [
      7211,
      {
        '../../../../../../../shared/lib/ui-utils': 5852,
        '../../../../../../components/app/name': 6109,
        '../../../../../../components/component-library': 6402,
        '../../../../../../helpers/constants/design-system': 6872,
        '../../../../../../hooks/useI18nContext': 6985,
        '../../../../context/confirm': 7294,
        '../../../../hooks/useSmartAccountActions': 7347,
        '@metamask/name-controller': 2190,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SmartAccountUpdate = function () {
                    const [e, t] = (0, a.useState)(!1),
                      n = (0, c.useI18nContext)(),
                      { currentConfirmation: o } = (0, d.useConfirmContext)(),
                      { chainId: f, txParams: p } = o ?? {},
                      { from: g } = p,
                      { handleRejectUpgrade: h } = (0, m.useSmartAccountActions)();
                    if (!o || e) return null;
                    return a.default.createElement(
                      i.Box,
                      {
                        display: l.Display.Flex,
                        backgroundColor: l.BackgroundColor.overlayDefault,
                        color: l.TextColor.primaryDefault,
                        className: 'smart-account-update__wrapper',
                      },
                      a.default.createElement(
                        i.Box,
                        {
                          backgroundColor: l.BackgroundColor.backgroundDefault,
                          borderRadius: l.BorderRadius.MD,
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Column,
                          alignItems: l.AlignItems.center,
                          justifyContent: l.JustifyContent.spaceBetween,
                          margin: 4,
                          padding: 4,
                          className: 'smart-account-update__inner',
                        },
                        a.default.createElement('img', {
                          width: '100%',
                          src: './images/smart-transactions/smart-account-update.svg',
                        }),
                        a.default.createElement(
                          i.Text,
                          { fontWeight: l.FontWeight.Medium, variant: l.TextVariant.headingLg },
                          n('smartAccountSplashTitle')
                        ),
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.center },
                          a.default.createElement(
                            i.Text,
                            {
                              color: l.TextColor.textAlternative,
                              variant: l.TextVariant.bodyMd,
                              marginInlineEnd: 2,
                            },
                            n('smartAccountRequestFor')
                          ),
                          a.default.createElement(u.default, {
                            value: g,
                            type: r.NameType.ETHEREUM_ADDRESS,
                            preferContractSymbol: !0,
                            variation: f,
                          })
                        ),
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.flexStart },
                          a.default.createElement('img', {
                            width: '24px',
                            src: './images/speedometer.svg',
                          }),
                          a.default.createElement(
                            i.Box,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              marginInlineStart: 2,
                            },
                            a.default.createElement(
                              i.Text,
                              {
                                color: l.TextColor.textDefault,
                                variant: l.TextVariant.bodyMd,
                                fontWeight: l.FontWeight.Medium,
                              },
                              n('smartAccountBetterTransaction')
                            ),
                            a.default.createElement(
                              i.Text,
                              {
                                color: l.TextColor.textAlternative,
                                variant: l.TextVariant.bodyMd,
                                fontWeight: l.FontWeight.Normal,
                              },
                              n('smartAccountBetterTransactionDescription')
                            )
                          )
                        ),
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.flexStart },
                          a.default.createElement('img', {
                            width: '24px',
                            src: './images/petrol-pump.svg',
                          }),
                          a.default.createElement(
                            i.Box,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              marginInlineStart: 2,
                            },
                            a.default.createElement(
                              i.Text,
                              {
                                color: l.TextColor.textDefault,
                                variant: l.TextVariant.bodyMd,
                                fontWeight: l.FontWeight.Medium,
                              },
                              n('smartAccountPayToken')
                            ),
                            a.default.createElement(
                              i.Text,
                              {
                                color: l.TextColor.textAlternative,
                                variant: l.TextVariant.bodyMd,
                                fontWeight: l.FontWeight.Normal,
                              },
                              n('smartAccountPayTokenDescription')
                            )
                          )
                        ),
                        a.default.createElement(
                          i.Box,
                          { display: l.Display.Flex, alignItems: l.AlignItems.flexStart },
                          a.default.createElement('img', {
                            width: '24px',
                            src: './images/sparkle.svg',
                          }),
                          a.default.createElement(
                            i.Box,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              marginInlineStart: 2,
                            },
                            a.default.createElement(
                              i.Text,
                              {
                                color: l.TextColor.textDefault,
                                variant: l.TextVariant.bodyMd,
                                fontWeight: l.FontWeight.Medium,
                              },
                              n('smartAccountFeatures')
                            ),
                            a.default.createElement(
                              i.Text,
                              {
                                color: l.TextColor.textAlternative,
                                variant: l.TextVariant.bodyMd,
                                fontWeight: l.FontWeight.Normal,
                              },
                              n('smartAccountFeaturesDescription'),
                              ' ',
                              a.default.createElement(
                                'a',
                                {
                                  key: 'learn_more_link',
                                  href: s.SMART_ACCOUNT_INFO_LINK,
                                  rel: 'noopener noreferrer',
                                  target: '_blank',
                                },
                                n('learnMoreUpperCaseWithDot')
                              )
                            )
                          )
                        ),
                        a.default.createElement(
                          i.Button,
                          {
                            variant: i.ButtonVariant.Secondary,
                            size: i.ButtonSize.Lg,
                            onClick: h,
                            width: l.BlockSize.Full,
                          },
                          n('smartAccountReject')
                        ),
                        a.default.createElement(
                          i.Button,
                          {
                            variant: i.ButtonVariant.Primary,
                            size: i.ButtonSize.Lg,
                            onClick: () => t(!0),
                            width: l.BlockSize.Full,
                          },
                          n('smartAccountAccept')
                        )
                      )
                    );
                  });
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('@metamask/name-controller'),
                  s = e('../../../../../../../shared/lib/ui-utils'),
                  i = e('../../../../../../components/component-library'),
                  l = e('../../../../../../helpers/constants/design-system'),
                  c = e('../../../../../../hooks/useI18nContext'),
                  u =
                    (o = e('../../../../../../components/app/name')) && o.__esModule
                      ? o
                      : { default: o },
                  d = e('../../../../context/confirm'),
                  m = e('../../../../hooks/useSmartAccountActions');
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
        file: 'ui/pages/confirmations/components/confirm/splash/smart-account-update/smart-account-update.tsx',
      },
    ],
    [
      7212,
      {
        '../info/hooks/useIsUpgradeTransaction': 7138,
        './smart-account-update': 7210,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.Splash = function () {
                    if (!(0, r.useIsUpgradeTransaction)()) return null;
                    return a.default.createElement(s.SmartAccountUpdate, null);
                  });
                var o,
                  a = (o = e('react')) && o.__esModule ? o : { default: o },
                  r = e('../info/hooks/useIsUpgradeTransaction'),
                  s = e('./smart-account-update');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/splash/splash.tsx' },
    ],
    [
      7213,
      {
        '../../../../hooks/useAssetDetails': 7321,
        '../../info/approve/hooks/use-approve-token-simulation': 7122,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useCurrentSpendingCap = function (e) {
                    const t =
                        s(e) &&
                        [
                          o.TransactionType.tokenMethodApprove,
                          o.TransactionType.tokenMethodIncreaseAllowance,
                        ].includes(e.type),
                      n = t ? e.txParams.to : null,
                      i = t ? e.txParams.from : null,
                      l = t ? e.txParams.data : null,
                      c = t ? e.chainId : null,
                      { decimals: u } = (0, a.useAssetDetails)(n, i, l, c),
                      { spendingCap: d, pending: m } = (0, r.useApproveTokenSimulation)(e, u);
                    let f = '';
                    t && (f = d);
                    return { customSpendingCap: f, pending: m };
                  });
                var o = e('@metamask/transaction-controller'),
                  a = e('../../../../hooks/useAssetDetails'),
                  r = e('../../info/approve/hooks/use-approve-token-simulation');
                const s = e => e !== undefined && e.txParams !== undefined;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirm/title/hooks/useCurrentSpendingCap.ts',
      },
    ],
    [
      7214,
      { './title': 7215 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Title', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./title')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/title/index.ts' },
    ],
    [
      7215,
      {
        '../../../../../../shared/constants/transaction': 5819,
        '../../../../../components/app/alert-system/general-alert/general-alert': 5907,
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useAlerts': 6968,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../constants': 7293,
        '../../../context/confirm': 7294,
        '../../../hooks/useSignatureEventFragment': 7346,
        '../../../hooks/useTransactionEventFragment': 7350,
        '../../../hooks/useTypedSignSignatureInfo': 7353,
        '../../../utils': 7364,
        '../info/approve/hooks/use-is-nft': 7123,
        '../info/hooks/useTokenTransactionData': 7143,
        '../info/utils': 7194,
        '../utils': 7216,
        './hooks/useCurrentSpendingCap': 7213,
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
                var o = e('@metamask/transaction-controller'),
                  a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var o = { __proto__: null },
                      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = e('../../../../../../shared/constants/transaction'),
                  s = b(
                    e('../../../../../components/app/alert-system/general-alert/general-alert')
                  ),
                  i = e('../../../../../components/component-library'),
                  l = e('../../../../../helpers/constants/design-system'),
                  c = b(e('../../../../../hooks/useAlerts')),
                  u = e('../../../../../hooks/useI18nContext'),
                  d = e('../../../constants'),
                  m = e('../../../context/confirm'),
                  f = e('../../../hooks/useTypedSignSignatureInfo'),
                  p = e('../../../utils'),
                  g = e('../info/approve/hooks/use-is-nft'),
                  h = e('../info/hooks/useTokenTransactionData'),
                  y = e('../info/utils'),
                  v = e('../utils'),
                  x = e('../../../hooks/useSignatureEventFragment'),
                  T = e('../../../hooks/useTransactionEventFragment'),
                  k = e('./hooks/useCurrentSpendingCap');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function C({ ownerId: e }) {
                  const { generalAlerts: t } = (0, c.default)(e),
                    { updateSignatureEventFragment: n } = (0, x.useSignatureEventFragment)(),
                    { updateTransactionEventFragment: o } = (0, T.useTransactionEventFragment)();
                  if (0 === t.length) return null;
                  const r = () => {
                    const t = {
                      properties: { external_link_clicked: 'security_alert_support_link' },
                    };
                    n(t), o(t, e);
                  };
                  return a.default.createElement(
                    i.Box,
                    { marginTop: 3 },
                    t.map(e =>
                      a.default.createElement(
                        i.Box,
                        { marginTop: 1, key: e.key },
                        a.default.createElement(s.default, {
                          'data-testid': 'confirm-banner-alert',
                          title: e.reason,
                          description: e.message,
                          severity: e.severity,
                          provider: e.provider,
                          details: e.alertDetails,
                          reportUrl: e.reportUrl,
                          children: e.content,
                          onClickSupportLink: r,
                        })
                      )
                    )
                  );
                }
                const w = (0, a.memo)(() => {
                  const e = (0, u.useI18nContext)(),
                    { currentConfirmation: t } = (0, m.useConfirmContext)(),
                    { isNFT: n } = (0, g.useIsNFT)(t),
                    { primaryType: s, tokenStandard: c } = (0, f.useTypedSignSignatureInfo)(t),
                    { customSpendingCap: x, pending: T } = (0, k.useCurrentSpendingCap)(t),
                    b = (0, h.useTokenTransactionData)(),
                    E =
                      (null == t ? void 0 : t.type) ===
                        o.TransactionType.tokenMethodSetApprovalForAll &&
                      (0, y.getIsRevokeSetApprovalForAll)(b),
                    w = (0, a.useMemo)(
                      () =>
                        ((e, t, n, a, s, i, l, c) => {
                          if (i) return '';
                          switch (null == t ? void 0 : t.type) {
                            case o.TransactionType.contractInteraction:
                            case o.TransactionType.batch:
                              return e('confirmTitleTransaction');
                            case o.TransactionType.deployContract:
                              return e('confirmTitleDeployContract');
                            case o.TransactionType.personalSign:
                              return (0, p.isSIWESignatureRequest)(t)
                                ? e('confirmTitleSIWESignature')
                                : e('confirmTitleSignature');
                            case o.TransactionType.revokeDelegation:
                              return e('confirmTitleDelegationRevoke');
                            case o.TransactionType.signTypedData:
                              return l === d.TypedSignSignaturePrimaryTypes.PERMIT
                                ? (0, v.getIsRevokeDAIPermit)(t) || '0' === a
                                  ? e('confirmTitleRevokeApproveTransaction')
                                  : c === r.TokenStandard.ERC721
                                    ? e('setApprovalForAllRedesignedTitle')
                                    : e('confirmTitlePermitTokens')
                                : e('confirmTitleSignature');
                            case o.TransactionType.tokenMethodApprove:
                              return e(
                                n
                                  ? 'confirmTitleApproveTransactionNFT'
                                  : '0' === a
                                    ? 'confirmTitleRevokeApproveTransaction'
                                    : 'confirmTitlePermitTokens'
                              );
                            case o.TransactionType.tokenMethodIncreaseAllowance:
                              return e('confirmTitlePermitTokens');
                            case o.TransactionType.tokenMethodSetApprovalForAll:
                              return e(
                                s
                                  ? 'confirmTitleSetApprovalForAllRevokeTransaction'
                                  : 'setApprovalForAllRedesignedTitle'
                              );
                            default:
                              return '';
                          }
                        })(e, t, n, x, E, T, s, c),
                      [t, n, x, E, T, s, e, c]
                    ),
                    _ = (0, a.useMemo)(
                      () =>
                        ((e, t, n, a, s, i, l, c) => {
                          if (i) return '';
                          switch (null == t ? void 0 : t.type) {
                            case o.TransactionType.contractInteraction:
                            case o.TransactionType.batch:
                              return '';
                            case o.TransactionType.deployContract:
                              return e('confirmTitleDescDeployContract');
                            case o.TransactionType.personalSign:
                              return (0, p.isSIWESignatureRequest)(t)
                                ? e('confirmTitleDescSIWESignature')
                                : e('confirmTitleDescSign');
                            case o.TransactionType.revokeDelegation:
                              return e('confirmTitleDescDelegationRevoke');
                            case o.TransactionType.signTypedData:
                              return l === d.TypedSignSignaturePrimaryTypes.PERMIT
                                ? c === r.TokenStandard.ERC721
                                  ? e('confirmTitleDescApproveTransaction')
                                  : (0, v.getIsRevokeDAIPermit)(t) || '0' === a
                                    ? ''
                                    : e('confirmTitleDescPermitSignature')
                                : e('confirmTitleDescSign');
                            case o.TransactionType.tokenMethodApprove:
                              return n
                                ? e('confirmTitleDescApproveTransaction')
                                : '0' === a
                                  ? ''
                                  : e('confirmTitleDescERC20ApproveTransaction');
                            case o.TransactionType.tokenMethodIncreaseAllowance:
                              return e('confirmTitleDescPermitSignature');
                            case o.TransactionType.tokenMethodSetApprovalForAll:
                              return s ? '' : e('confirmTitleDescApproveTransaction');
                            default:
                              return '';
                          }
                        })(e, t, n, x, E, T, s, c),
                      [t, n, x, E, T, s, e, c]
                    );
                  return t
                    ? a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(C, { ownerId: t.id }),
                        '' !== w &&
                          a.default.createElement(
                            i.Text,
                            {
                              variant: l.TextVariant.headingLg,
                              paddingTop: 4,
                              paddingBottom: 2,
                              textAlign: l.TextAlign.Center,
                            },
                            w
                          ),
                        '' !== _ &&
                          a.default.createElement(
                            i.Text,
                            {
                              paddingBottom: 4,
                              color: l.TextColor.textAlternative,
                              textAlign: l.TextAlign.Center,
                            },
                            _
                          )
                      )
                    : null;
                });
                n.default = w;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/title/title.tsx' },
    ],
    [
      7216,
      { '../../../../../shared/modules/transaction.utils': 5880, './info/shared/constants': 7158 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getIsRevokeDAIPermit = n.getConfirmationSender = n.formatNumber = void 0);
                var o = e('../../../../../shared/modules/transaction.utils'),
                  a = e('./info/shared/constants');
                n.getConfirmationSender = e => {
                  const t = null == e ? void 0 : e.msgParams,
                    n = null == e ? void 0 : e.txParams;
                  let o;
                  return t && (o = t.from), n && (o = n.from), { from: o };
                };
                n.formatNumber = (e, t) => {
                  if (e === undefined) return e;
                  return new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: t,
                    maximumFractionDigits: t,
                  }).format(e);
                };
                n.getIsRevokeDAIPermit = e => {
                  var t;
                  const n =
                      null == e || null === (t = e.msgParams) || void 0 === t ? void 0 : t.data,
                    {
                      message: r,
                      domain: { verifyingContract: s },
                    } = (0, o.parseTypedDataMessage)(n);
                  return !1 === r.allowed && s === a.DAI_CONTRACT_ADDRESS;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/confirm/utils.ts' },
    ],
    [
      7217,
      {
        '../../../../components/component-library': 6402,
        '../../../../components/component-library/modal-content/deprecated': 6412,
        '../../../../components/component-library/modal-header/deprecated': 6421,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
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
                var o = u(e('react')),
                  a = u(e('prop-types')),
                  r = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../components/component-library'),
                  l = e('../../../../components/component-library/modal-content/deprecated'),
                  c = e('../../../../components/component-library/modal-header/deprecated');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = ({ onSubmit: e, onCancel: t }) => {
                  const n = (0, r.useI18nContext)();
                  return o.default.createElement(
                    i.Modal,
                    { isOpen: !0, onClose: t, className: 'confirmation-warning-modal__content' },
                    o.default.createElement(i.ModalOverlay, null),
                    o.default.createElement(
                      l.ModalContent,
                      null,
                      o.default.createElement(
                        c.ModalHeader,
                        {
                          childrenWrapperProps: {
                            display: s.Display.Flex,
                            flexDirection: s.FlexDirection.Column,
                            alignItems: s.AlignItems.center,
                            gap: 4,
                          },
                        },
                        o.default.createElement(i.Icon, {
                          name: i.IconName.Danger,
                          color: s.IconColor.errorDefault,
                          size: i.IconSize.Xl,
                        }),
                        o.default.createElement(
                          i.Text,
                          {
                            variant: s.TextVariant.headingSm,
                            as: 'h4',
                            fontWeight: s.FontWeight.Bold,
                            textAlign: s.TextAlign.Center,
                          },
                          n('addEthereumChainWarningModalTitle')
                        )
                      ),
                      o.default.createElement(
                        i.Box,
                        { marginBottom: 4 },
                        o.default.createElement(
                          i.Text,
                          { marginTop: 4, variant: s.TextVariant.bodySm },
                          n('addEthereumChainWarningModalHeader', [
                            o.default.createElement(
                              'strong',
                              { key: 'part-2' },
                              n('addEthereumChainWarningModalHeaderPartTwo')
                            ),
                          ])
                        ),
                        o.default.createElement(
                          i.Text,
                          { marginTop: 4, variant: s.TextVariant.bodySm },
                          n('addEthereumChainWarningModalListHeader')
                        ),
                        o.default.createElement(
                          'ul',
                          null,
                          o.default.createElement(
                            i.Text,
                            { as: 'li', marginTop: 2, variant: s.TextVariant.bodySm },
                            n('addEthereumChainWarningModalListPointOne')
                          ),
                          o.default.createElement(
                            i.Text,
                            { as: 'li', marginTop: 2, variant: s.TextVariant.bodySm },
                            n('addEthereumChainWarningModalListPointTwo')
                          ),
                          o.default.createElement(
                            i.Text,
                            { as: 'li', marginTop: 2, variant: s.TextVariant.bodySm },
                            n('addEthereumChainWarningModalListPointThree')
                          )
                        )
                      ),
                      o.default.createElement(
                        i.Box,
                        { display: s.Display.Flex, gap: 4 },
                        o.default.createElement(
                          i.Button,
                          {
                            variant: i.BUTTON_VARIANT.SECONDARY,
                            onClick: t,
                            block: !0,
                            size: i.BUTTON_SIZES.LG,
                          },
                          n('reject')
                        ),
                        o.default.createElement(
                          i.Button,
                          {
                            variant: i.BUTTON_VARIANT.PRIMARY,
                            onClick: e,
                            danger: !0,
                            block: !0,
                            size: i.BUTTON_SIZES.LG,
                          },
                          n('approveButtonText')
                        )
                      )
                    )
                  );
                };
                d.propTypes = { onSubmit: a.default.func, onCancel: a.default.func };
                n.default = d;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirmation-warning-modal/confirmation-warning-modal.js',
      },
    ],
    [
      7218,
      { './confirmation-warning-modal': 7217 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./confirmation-warning-modal')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/confirmation-warning-modal/index.js',
      },
    ],
    [
      7219,
      {
        '../../../../../shared/constants/gas': 5795,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/button': 6707,
        '../../../../components/ui/info-tooltip': 6759,
        '../../../../contexts/i18n': 6832,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/confirm-tx.util': 6899,
        '../advanced-gas-controls/advanced-gas-controls.component': 7084,
        'bignumber.js': 4030,
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  a = p(e('prop-types')),
                  r = p(e('bignumber.js')),
                  s = e('../../../../../shared/constants/gas'),
                  i = p(e('../../../../components/ui/button')),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../components/component-library'),
                  u = e('../../../../helpers/utils/confirm-tx.util'),
                  d = p(e('../../../../components/ui/info-tooltip')),
                  m = p(e('../advanced-gas-controls/advanced-gas-controls.component')),
                  f = e('../../../../contexts/i18n');
                function p(e) {
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
                function h({
                  mode: e = s.EditGasModes.modifyInPlace,
                  estimatedMinimumNative: t,
                  transaction: n,
                  gasPrice: a,
                  setGasPrice: p,
                  gasLimit: g,
                  setGasLimit: h,
                  properGasLimit: y,
                  dappSuggestedGasFeeAcknowledged: v,
                  setDappSuggestedGasFeeAcknowledged: x,
                  onManualChange: T,
                  minimumGasLimit: k,
                  balanceError: b,
                  gasErrors: E,
                  txParamsHaveBeenCustomized: C,
                }) {
                  const w = (0, o.useContext)(f.I18nContext),
                    _ = (0, o.useRef)(null),
                    I = (0, u.areDappSuggestedAndTxParamGasFeesTheSame)(n),
                    S = Boolean((null == n ? void 0 : n.dappSuggestedGasFees) && !v && I);
                  let M;
                  g !== undefined &&
                    y !== undefined &&
                    new r.default(g || 0).lessThan(new r.default(y)) &&
                    (M = w('gasLimitRecommended', [y]));
                  const P = b && C;
                  return o.default.createElement(
                    'div',
                    { className: 'edit-gas-display' },
                    o.default.createElement(
                      'div',
                      { className: 'edit-gas-display__content' },
                      P &&
                        o.default.createElement(c.BannerAlert, {
                          severity: l.Severity.Danger,
                          description: w('insufficientFunds'),
                          marginBottom: 6,
                        }),
                      M &&
                        o.default.createElement(c.BannerAlert, {
                          severity: l.Severity.Warning,
                          description: M,
                          marginBottom: 6,
                        }),
                      S &&
                        o.default.createElement(c.BannerAlert, {
                          severity: l.Severity.Warning,
                          className: 'banner-alert--warning',
                          description: w('gasDisplayDappWarning', [n.origin]),
                          marginBottom: 6,
                        }),
                      e === s.EditGasModes.speedUp &&
                        o.default.createElement(
                          'div',
                          { className: 'edit-gas-display__top-tooltip' },
                          o.default.createElement(
                            c.Text,
                            {
                              color: l.TextColor.textDefault,
                              variant: l.TextVariant.bodySm,
                              as: 'h6',
                              fontWeight: l.FontWeight.Bold,
                            },
                            w('speedUpTooltipText'),
                            ' ',
                            o.default.createElement(d.default, {
                              position: 'top',
                              contentText: w('speedUpExplanation'),
                            })
                          )
                        ),
                      o.default.createElement(
                        c.Text,
                        {
                          color: l.TextColor.textDefault,
                          variant: l.TextVariant.headingLg,
                          as: 'h1',
                          textAlign: l.TextAlign.Center,
                        },
                        t
                      ),
                      S &&
                        o.default.createElement(
                          i.default,
                          {
                            className: 'edit-gas-display__dapp-acknowledgement-button',
                            onClick: () => x(!0),
                          },
                          w('gasDisplayAcknowledgeDappButtonText')
                        ),
                      !S &&
                        o.default.createElement(m.default, {
                          gasLimit: g,
                          setGasLimit: h,
                          gasPrice: a,
                          setGasPrice: p,
                          onManualChange: T,
                          minimumGasLimit: k,
                          gasErrors: E,
                        })
                    ),
                    o.default.createElement('div', {
                      ref: _,
                      className: 'edit-gas-display__scroll-bottom',
                    })
                  );
                }
                h.propTypes = {
                  mode: a.default.oneOf(Object.values(s.EditGasModes)),
                  estimatedMinimumNative: a.default.string,
                  gasPrice: a.default.string,
                  setGasPrice: a.default.func,
                  gasLimit: a.default.number,
                  setGasLimit: a.default.func,
                  properGasLimit: a.default.number,
                  dappSuggestedGasFeeAcknowledged: a.default.bool,
                  setDappSuggestedGasFeeAcknowledged: a.default.func,
                  transaction: a.default.object,
                  onManualChange: a.default.func,
                  minimumGasLimit: a.default.string,
                  balanceError: a.default.bool,
                  gasErrors: a.default.object,
                  txParamsHaveBeenCustomized: a.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-display/edit-gas-display.component.js',
      },
    ],
    [
      7220,
      { './edit-gas-display.component': 7219 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./edit-gas-display.component')) && o.__esModule ? o : { default: o };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/edit-gas-display/index.js' },
    ],
    [
      7221,
      {
        '../../../../components/component-library': 6402,
        '../../../../contexts/gasFee': 6831,
        '../../../../contexts/transaction-modal': 6840,
        '../../../../helpers/constants/design-system': 6872,
        '../../hooks/useTransactionEventFragment': 7350,
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
                var o = u(e('react')),
                  a = u(e('prop-types')),
                  r = e('../../../../contexts/gasFee'),
                  s = e('../../hooks/useTransactionEventFragment'),
                  i = e('../../../../contexts/transaction-modal'),
                  l = e('../../../../components/component-library'),
                  c = e('../../../../helpers/constants/design-system');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d({ userAcknowledgedGasMissing: e = !1 }) {
                  const {
                      hasSimulationError: t,
                      estimateUsed: n,
                      supportsEIP1559: a,
                    } = (0, r.useGasFeeContext)(),
                    { updateTransactionEventFragment: u } = (0, s.useTransactionEventFragment)(),
                    { openModal: d } = (0, i.useTransactionModalContext)();
                  if (!a || !n || !(!t || e)) return null;
                  return o.default.createElement(l.Button, {
                    style: {
                      textDecoration: 'none',
                      height: 'var(--typography-l-body-md-medium-line-height)',
                    },
                    size: c.Size.SM,
                    variant: l.ButtonVariant.Link,
                    startIconName: l.IconName.Edit,
                    color: c.IconColor.primaryDefault,
                    alignItems: c.AlignItems.baseline,
                    paddingTop: 1,
                    'data-testid': 'edit-gas-fee-icon',
                    onClick: () => {
                      u({ gas_edit_attempted: 'basic' }), d('editGasFee');
                    },
                  });
                }
                d.propTypes = { userAcknowledgedGasMissing: a.default.bool };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-icon/edit-gas-fee-icon.js',
      },
    ],
    [
      7222,
      {
        '../../../../../shared/constants/gas': 5795,
        '../../../../components/app/app-loading-spinner': 5917,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/box': 6703,
        '../../../../components/ui/error-message': 6735,
        '../../../../components/ui/popover': 6789,
        '../../../../contexts/gasFee': 6831,
        '../../../../contexts/transaction-modal': 6840,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/error-keys': 6873,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../hooks/useI18nContext': 6985,
        './edit-gas-item': 7224,
        './network-statistics': 7229,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var o = v(e('react')),
                  a = e('../../../../../shared/constants/gas'),
                  r = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../contexts/transaction-modal'),
                  i = v(e('../../../../components/ui/box')),
                  l = v(e('../../../../components/ui/error-message')),
                  c = v(e('../../../../components/ui/popover')),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../../helpers/constants/error-keys'),
                  m = e('../../../../contexts/gasFee'),
                  f = v(e('../../../../components/app/app-loading-spinner')),
                  p = v(e('../../../../helpers/constants/zendesk-url')),
                  g = e('../../../../components/component-library'),
                  h = v(e('./edit-gas-item')),
                  y = v(e('./network-statistics'));
                function v(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = () => {
                  const { balanceError: e, editGasMode: t } = (0, m.useGasFeeContext)(),
                    n = (0, r.useI18nContext)(),
                    {
                      closeAllModals: v,
                      closeModal: x,
                      currentModal: T,
                      openModalCount: k,
                    } = (0, s.useTransactionModalContext)();
                  if ('editGasFee' !== T) return null;
                  let b = 'editGasFeeModalTitle';
                  return (
                    t === a.EditGasModes.cancel
                      ? (b = 'editCancellationGasFeeModalTitle')
                      : t === a.EditGasModes.speedUp && (b = 'editSpeedUpEditGasFeeModalTitle'),
                    o.default.createElement(
                      c.default,
                      {
                        title: n(b),
                        onBack: 1 === k ? undefined : () => x(['editGasFee']),
                        onClose: v,
                        className: 'edit-gas-fee-popover',
                      },
                      o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(f.default, null),
                        o.default.createElement(
                          'div',
                          { className: 'edit-gas-fee-popover__wrapper' },
                          o.default.createElement(
                            'div',
                            { className: 'edit-gas-fee-popover__content' },
                            o.default.createElement(
                              i.default,
                              null,
                              e &&
                                o.default.createElement(l.default, {
                                  errorKey: d.INSUFFICIENT_FUNDS_ERROR_KEY,
                                }),
                              o.default.createElement(
                                'div',
                                { className: 'edit-gas-fee-popover__content__header' },
                                o.default.createElement(
                                  'span',
                                  { className: 'edit-gas-fee-popover__content__header-option' },
                                  n('gasOption')
                                ),
                                o.default.createElement(
                                  'span',
                                  { className: 'edit-gas-fee-popover__content__header-time' },
                                  t !== a.EditGasModes.swaps && n('time')
                                ),
                                o.default.createElement(
                                  'span',
                                  { className: 'edit-gas-fee-popover__content__header-max-fee' },
                                  n('maxFee')
                                )
                              ),
                              (t === a.EditGasModes.cancel || t === a.EditGasModes.speedUp) &&
                                o.default.createElement(h.default, {
                                  priorityLevel: a.PriorityLevels.tenPercentIncreased,
                                }),
                              t === a.EditGasModes.modifyInPlace &&
                                o.default.createElement(h.default, {
                                  priorityLevel: a.PriorityLevels.low,
                                }),
                              o.default.createElement(h.default, {
                                priorityLevel: a.PriorityLevels.medium,
                              }),
                              o.default.createElement(h.default, {
                                priorityLevel: a.PriorityLevels.high,
                              }),
                              o.default.createElement('div', {
                                className: 'edit-gas-fee-popover__content__separator',
                              }),
                              t === a.EditGasModes.modifyInPlace &&
                                o.default.createElement(h.default, {
                                  priorityLevel: a.PriorityLevels.dAppSuggested,
                                }),
                              o.default.createElement(h.default, {
                                priorityLevel: a.PriorityLevels.custom,
                              })
                            ),
                            o.default.createElement(
                              i.default,
                              null,
                              o.default.createElement(y.default, null),
                              o.default.createElement(
                                g.Text,
                                {
                                  className: 'edit-gas-fee-popover__know-more',
                                  align: 'center',
                                  color: u.TextColor.textAlternative,
                                  tag: u.TextVariant.bodyMd,
                                  variant: u.TextVariant.bodySm,
                                  as: 'h6',
                                },
                                n('learnMoreAboutGas', [
                                  o.default.createElement(
                                    'a',
                                    {
                                      key: 'learnMoreLink',
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                      href: p.default.USER_GUIDE_GAS,
                                    },
                                    n('learnMore')
                                  ),
                                ])
                              )
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
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/edit-gas-fee-popover.js',
      },
    ],
    [
      7223,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../components/app/user-preferenced-currency-display': 6317,
        '../../../../../components/ui/info-tooltip': 6759,
        '../../../../../components/ui/loading-heartbeat': 6764,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../contexts/transaction-modal': 6840,
        '../../../../../helpers/constants/common': 6870,
        '../../../../../helpers/constants/gas': 6874,
        '../../../../../helpers/utils/util': 6921,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../hooks/useTransactionEventFragment': 7350,
        '../edit-gas-tooltip/edit-gas-tooltip': 7227,
        './useGasItemFeeDetails': 7226,
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
                var o = x(e('classnames')),
                  a = x(e('prop-types')),
                  r = x(e('react')),
                  s = e('../../../../../../shared/constants/gas'),
                  i = e('../../../../../helpers/constants/gas'),
                  l = e('../../../../../helpers/constants/common'),
                  c = e('../../../../../helpers/utils/util'),
                  u = e('../../../../../contexts/gasFee'),
                  d = e('../../../../../hooks/useI18nContext'),
                  m = e('../../../hooks/useTransactionEventFragment'),
                  f = e('../../../../../contexts/transaction-modal'),
                  p = x(e('../../../../../components/ui/info-tooltip')),
                  g = x(e('../../../../../components/ui/loading-heartbeat')),
                  h = x(e('../../../../../components/app/user-preferenced-currency-display')),
                  y = x(e('../edit-gas-tooltip/edit-gas-tooltip')),
                  v = e('./useGasItemFeeDetails');
                function x(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const T = ({ priorityLevel: e }) => {
                  const {
                      editGasMode: t,
                      estimateUsed: n,
                      gasLimit: a,
                      updateTransactionToTenPercentIncreasedGasFee: x,
                      updateTransactionUsingDAPPSuggestedValues: T,
                      updateTransactionUsingEstimate: k,
                      transaction: b,
                    } = (0, u.useGasFeeContext)(),
                    { updateTransactionEventFragment: E } = (0, m.useTransactionEventFragment)(),
                    C = (0, d.useI18nContext)(),
                    { closeModal: w, openModal: _ } = (0, f.useTransactionModalContext)(),
                    { dappSuggestedGasFees: I } = b,
                    {
                      estimateGreaterThanGasUse: S,
                      hexMaximumTransactionFee: M,
                      maxFeePerGas: P,
                      maxPriorityFeePerGas: D,
                      minWaitTime: A,
                    } = (0, v.useGasItemFeeDetails)(e);
                  if (
                    !(
                      e !== s.PriorityLevels.dAppSuggested ||
                      (null != I && I.maxFeePerGas) ||
                      (null != I && I.gasPrice)
                    )
                  )
                    return null;
                  const { title: F, icon: O } = ((e, t) => {
                    let n = e,
                      o = e;
                    return (
                      e === s.PriorityLevels.dAppSuggested
                        ? (o = 'dappSuggestedShortLabel')
                        : e === s.PriorityLevels.dappSuggestedHigh
                          ? (o = 'dappSuggestedHighShortLabel')
                          : e === s.PriorityLevels.tenPercentIncreased
                            ? ((n = null), (o = 'tenPercentIncreased'))
                            : e === s.PriorityLevels.high &&
                              t === s.EditGasModes.swaps &&
                              ((n = 'swapSuggested'), (o = 'swapSuggested')),
                      { title: o, icon: n }
                    );
                  })(e, t);
                  return r.default.createElement(
                    'button',
                    {
                      className: (0, o.default)('edit-gas-item', {
                        'edit-gas-item--selected': e === n,
                        'edit-gas-item--disabled': S,
                      }),
                      onClick: () => {
                        e === s.PriorityLevels.custom
                          ? (E({ properties: { gas_edit_attempted: 'advanced' } }),
                            _('advancedGasFee'))
                          : (E({ properties: { gas_edit_type: 'basic' } }),
                            w(['editGasFee']),
                            e === s.PriorityLevels.tenPercentIncreased
                              ? x()
                              : e === s.PriorityLevels.dAppSuggested
                                ? T()
                                : k(e));
                      },
                      'aria-label': e,
                      autoFocus: e === n,
                      disabled: S,
                      'data-testid': `edit-gas-fee-item-${e}`,
                    },
                    r.default.createElement(
                      'span',
                      { className: 'edit-gas-item__name' },
                      O &&
                        r.default.createElement(
                          'span',
                          { className: `edit-gas-item__icon edit-gas-item__icon-${e}` },
                          i.PRIORITY_LEVEL_ICON_MAP[O]
                        ),
                      C(F)
                    ),
                    r.default.createElement(
                      'span',
                      {
                        className: `edit-gas-item__time-estimate edit-gas-item__time-estimate-${e}`,
                      },
                      t !== s.EditGasModes.swaps && (A ? (0, c.toHumanReadableTime)(C, A) : '--')
                    ),
                    r.default.createElement(
                      'span',
                      { className: `edit-gas-item__fee-estimate edit-gas-item__fee-estimate-${e}` },
                      M
                        ? r.default.createElement(
                            'div',
                            { className: 'edit-gas-item__maxfee' },
                            r.default.createElement(g.default, {
                              backgroundColor:
                                e === n
                                  ? 'var(--color-background-alternative)'
                                  : 'var(--color-background-default)',
                              estimateUsed: e,
                            }),
                            r.default.createElement(h.default, {
                              key: 'editGasSubTextFeeAmount',
                              type: l.PRIMARY,
                              value: M,
                            })
                          )
                        : '--'
                    ),
                    r.default.createElement(
                      'span',
                      { className: 'edit-gas-item__tooltip', 'data-testid': 'gas-tooltip' },
                      r.default.createElement(p.default, {
                        contentText: r.default.createElement(y.default, {
                          t: C,
                          priorityLevel: e,
                          maxFeePerGas: P,
                          maxPriorityFeePerGas: D,
                          editGasMode: t,
                          gasLimit: a,
                          transaction: b,
                          estimateGreaterThanGasUse: S,
                        }),
                        position: 'top',
                      })
                    )
                  );
                };
                T.propTypes = { priorityLevel: a.default.string };
                n.default = T;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/edit-gas-item/edit-gas-item.js',
      },
    ],
    [
      7224,
      { './edit-gas-item': 7223 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./edit-gas-item')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/edit-gas-item/index.js',
      },
    ],
    [
      7225,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../ducks/metamask/metamask': 6860,
        '../../../../../store/actions': 7619,
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
                  (n.useCustomTimeEstimate = void 0);
                var o,
                  a = e('react'),
                  r = e('react-redux'),
                  s = (o = e('bignumber.js')) && o.__esModule ? o : { default: o },
                  i = e('../../../../../../shared/constants/gas'),
                  l = e('../../../../../ducks/metamask/metamask'),
                  c = e('../../../../../store/actions');
                n.useCustomTimeEstimate = ({
                  gasFeeEstimates: e,
                  maxFeePerGas: t,
                  maxPriorityFeePerGas: n,
                }) => {
                  var o;
                  const u = (0, r.useSelector)(l.getGasEstimateType),
                    d = (0, r.useSelector)(l.getIsGasEstimatesLoading),
                    [m, f] = (0, a.useState)(null),
                    p = d || u !== i.GasEstimateTypes.feeMarket || !n,
                    g =
                      (null == e ? void 0 : e.low) &&
                      Number(n) < Number(e.low.suggestedMaxPriorityFeePerGas);
                  if (
                    ((0, a.useEffect)(() => {
                      !d &&
                        u === i.GasEstimateTypes.feeMarket &&
                        n &&
                        g &&
                        (0, c.getGasFeeTimeEstimate)(
                          new s.default(n, 10).toString(10),
                          new s.default(t, 10).toString(10)
                        ).then(e => {
                          f(e);
                        });
                    }, [u, g, d, t, n, p]),
                    p)
                  )
                    return {};
                  let h = '';
                  if (
                    g &&
                    m &&
                    'unknown' !== m &&
                    'unknown' !== (null == m ? void 0 : m.upperTimeBound)
                  )
                    h = Number(null == m ? void 0 : m.upperTimeBound);
                  else if (
                    Number(n) >=
                    Number(
                      null == e || null === (o = e.medium) || void 0 === o
                        ? void 0
                        : o.suggestedMaxPriorityFeePerGas
                    )
                  ) {
                    var y;
                    h =
                      null == e || null === (y = e.high) || void 0 === y
                        ? void 0
                        : y.minWaitTimeEstimate;
                  } else {
                    var v;
                    h =
                      null == e || null === (v = e.low) || void 0 === v
                        ? void 0
                        : v.maxWaitTimeEstimate;
                  }
                  return { waitTimeEstimate: h };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/edit-gas-item/useCustomTimeEstimate.js',
      },
    ],
    [
      7226,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../../shared/modules/gas.utils': 5863,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../helpers/utils/gas': 6902,
        '../../../../../selectors': 7601,
        './useCustomTimeEstimate': 7225,
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
                  (n.useGasItemFeeDetails = void 0);
                var o = e('react'),
                  a = e('react-redux'),
                  r = e('../../../../../../shared/constants/gas'),
                  s = e('../../../../../../shared/modules/gas.utils'),
                  i = e('../../../../../helpers/utils/gas'),
                  l = e('../../../../../selectors'),
                  c = e('../../../../../contexts/gasFee'),
                  u = e('../../../../../../shared/modules/conversion.utils'),
                  d = e('./useCustomTimeEstimate');
                n.useGasItemFeeDetails = e => {
                  const {
                      editGasMode: t,
                      estimateUsed: n,
                      gasFeeEstimates: m,
                      gasLimit: f,
                      maxFeePerGas: p,
                      maxPriorityFeePerGas: g,
                      transaction: h,
                    } = (0, c.useGasFeeContext)(),
                    [y, v] = (0, o.useState)(!1),
                    x = (0, a.useSelector)(l.getAdvancedGasFeeValues);
                  let T, k, b;
                  const { dappSuggestedGasFees: E } = h;
                  if (null != m && m[e])
                    (T = m[e].suggestedMaxFeePerGas), (k = m[e].suggestedMaxPriorityFeePerGas);
                  else if (e === r.PriorityLevels.dAppSuggested && E)
                    (T = (0, u.hexWEIToDecGWEI)(E.maxFeePerGas || E.gasPrice)),
                      (k = (0, u.hexWEIToDecGWEI)(E.maxPriorityFeePerGas || T));
                  else if (e === r.PriorityLevels.custom)
                    n === r.PriorityLevels.custom
                      ? ((T = p), (k = g))
                      : x &&
                        t !== r.EditGasModes.swaps &&
                        ((T = x.maxBaseFee), (k = x.priorityFee));
                  else if (e === r.PriorityLevels.tenPercentIncreased && h.previousGas) {
                    var C, w;
                    (T = (0, u.hexWEIToDecGWEI)(
                      (0, i.addTenPercentAndRound)(
                        null === (C = h.previousGas) || void 0 === C ? void 0 : C.maxFeePerGas
                      )
                    )),
                      (k = (0, u.hexWEIToDecGWEI)(
                        (0, i.addTenPercentAndRound)(
                          null === (w = h.previousGas) || void 0 === w
                            ? void 0
                            : w.maxPriorityFeePerGas
                        )
                      ));
                  }
                  const { waitTimeEstimate: _ } = (0, d.useCustomTimeEstimate)({
                    gasFeeEstimates: m,
                    maxFeePerGas: T,
                    maxPriorityFeePerGas: k,
                  });
                  b =
                    null != m && m[e]
                      ? e === r.PriorityLevels.high
                        ? null == m
                          ? void 0
                          : m.high.minWaitTimeEstimate
                        : null == m
                          ? void 0
                          : m.low.maxWaitTimeEstimate
                      : _;
                  const I = T
                    ? (0, s.getMaximumGasTotalInHexWei)({
                        gasLimit: (0, u.decimalToHex)(f),
                        maxFeePerGas: (0, u.decGWEIToHexWEI)(T),
                      })
                    : null;
                  return (
                    (0, o.useEffect)(() => {
                      if (
                        !(
                          (t !== r.EditGasModes.cancel && t !== r.EditGasModes.speedUp) ||
                          (e !== r.PriorityLevels.medium && e !== r.PriorityLevels.high)
                        )
                      ) {
                        const t = !(0, i.gasEstimateGreaterThanGasUsedPlusTenPercent)(
                          h.previousGas || h.txParams,
                          m,
                          e
                        );
                        v(t);
                      }
                    }, [t, m, e, h]),
                    {
                      estimateGreaterThanGasUse: y,
                      maxFeePerGas: T,
                      maxPriorityFeePerGas: k,
                      minWaitTime: b,
                      hexMaximumTransactionFee: I,
                    }
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/edit-gas-item/useGasItemFeeDetails.js',
      },
    ],
    [
      7227,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/gas': 6902,
        '../../../../../helpers/utils/util': 6921,
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
                        var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(o, r, s) : (o[r] = e[r]);
                      }
                    return (o.default = e), n && n.set(e, o), o;
                  })(e('react')),
                  r = (o = e('prop-types')) && o.__esModule ? o : { default: o },
                  s = e('../../../../../../shared/constants/gas'),
                  i = e('../../../../../helpers/constants/design-system'),
                  l = e('../../../../../helpers/utils/gas'),
                  c = e('../../../../../helpers/utils/util'),
                  u = e('../../../../../components/component-library');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const m = ({
                  editGasMode: e,
                  estimateGreaterThanGasUse: t,
                  gasLimit: n,
                  priorityLevel: o,
                  maxFeePerGas: r,
                  maxPriorityFeePerGas: d,
                  transaction: m,
                  t: f,
                }) => {
                  const p = (0, a.useMemo)(() => {
                    switch (o) {
                      case s.PriorityLevels.low:
                        return f('lowGasSettingToolTipMessage', [
                          a.default.createElement(
                            'span',
                            { key: o },
                            a.default.createElement('b', null, f('low'))
                          ),
                        ]);
                      case s.PriorityLevels.medium:
                        return t
                          ? f('disabledGasOptionToolTipMessage', [
                              a.default.createElement(
                                'span',
                                { key: `disabled-priority-level-${o}` },
                                f(o)
                              ),
                            ])
                          : f('mediumGasSettingToolTipMessage', [
                              a.default.createElement(
                                'span',
                                { key: o },
                                a.default.createElement('b', null, f('medium'))
                              ),
                            ]);
                      case s.PriorityLevels.high:
                        return t
                          ? f('disabledGasOptionToolTipMessage', [
                              a.default.createElement(
                                'span',
                                { key: `disabled-priority-level-${o}` },
                                f(o)
                              ),
                            ])
                          : e === s.EditGasModes.swaps
                            ? f('swapSuggestedGasSettingToolTipMessage')
                            : f('highGasSettingToolTipMessage', [
                                a.default.createElement(
                                  'span',
                                  { key: o },
                                  a.default.createElement('b', null, f('high'))
                                ),
                              ]);
                      case s.PriorityLevels.custom:
                        return f('customGasSettingToolTipMessage', [
                          a.default.createElement(
                            'span',
                            { key: o },
                            a.default.createElement('b', null, f('custom'))
                          ),
                        ]);
                      case s.PriorityLevels.dAppSuggested:
                        return null != m && m.origin
                          ? f('dappSuggestedGasSettingToolTipMessage', [
                              a.default.createElement(
                                'span',
                                { key: null == m ? void 0 : m.origin },
                                null == m ? void 0 : m.origin
                              ),
                            ])
                          : null;
                      default:
                        return '';
                    }
                  }, [e, t, o, m, f]);
                  let g;
                  o === s.PriorityLevels.low
                    ? (g = f('curveLowGasEstimate'))
                    : o === s.PriorityLevels.medium
                      ? (g = f('curveMediumGasEstimate'))
                      : o === s.PriorityLevels.high && (g = f('curveHighGasEstimate'));
                  const h =
                    (0, l.isMetamaskSuggestedGasEstimate)(o) &&
                    !(o === s.PriorityLevels.high && e === s.EditGasModes.swaps) &&
                    !t;
                  return a.default.createElement(
                    'div',
                    { className: 'edit-gas-tooltip__container' },
                    h
                      ? a.default.createElement('img', { alt: g, src: `./images/curve-${o}.svg` })
                      : null,
                    p &&
                      a.default.createElement(
                        'div',
                        { className: 'edit-gas-tooltip__container__message' },
                        a.default.createElement(
                          u.Text,
                          { variant: i.TextVariant.bodySm, as: 'h6' },
                          p
                        )
                      ),
                    o === s.PriorityLevels.custom || t
                      ? null
                      : a.default.createElement(
                          'div',
                          { className: 'edit-gas-tooltip__container__values' },
                          a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(
                              u.Text,
                              {
                                variant: i.TextVariant.bodySm,
                                as: 'h6',
                                fontWeight: i.FontWeight.Bold,
                                className: 'edit-gas-tooltip__container__label',
                              },
                              f('maxBaseFee')
                            ),
                            r &&
                              a.default.createElement(
                                u.Text,
                                {
                                  variant: i.TextVariant.bodySm,
                                  as: 'h6',
                                  color: i.TextColor.textAlternative,
                                  className: 'edit-gas-tooltip__container__value',
                                },
                                (0, c.roundToDecimalPlacesRemovingExtraZeroes)(r, 4)
                              )
                          ),
                          a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(
                              u.Text,
                              {
                                variant: i.TextVariant.bodySm,
                                as: 'h6',
                                fontWeight: i.FontWeight.Bold,
                                className: 'edit-gas-tooltip__container__label',
                              },
                              f('priorityFeeProperCase')
                            ),
                            d &&
                              a.default.createElement(
                                u.Text,
                                {
                                  variant: i.TextVariant.bodySm,
                                  as: 'h6',
                                  color: i.TextColor.textAlternative,
                                  className: 'edit-gas-tooltip__container__value',
                                },
                                (0, c.roundToDecimalPlacesRemovingExtraZeroes)(d, 4)
                              )
                          ),
                          a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(
                              u.Text,
                              {
                                variant: i.TextVariant.bodySm,
                                as: 'h6',
                                fontWeight: i.FontWeight.Bold,
                                className: 'edit-gas-tooltip__container__label',
                              },
                              f('gasLimit')
                            ),
                            n &&
                              a.default.createElement(
                                u.Text,
                                {
                                  variant: i.TextVariant.bodySm,
                                  as: 'h6',
                                  color: i.TextColor.textAlternative,
                                  className: 'edit-gas-tooltip__container__value',
                                },
                                (0, c.roundToDecimalPlacesRemovingExtraZeroes)(n, 4)
                              )
                          )
                        )
                  );
                };
                m.propTypes = {
                  estimateGreaterThanGasUse: r.default.bool,
                  priorityLevel: r.default.string,
                  maxFeePerGas: r.default.oneOfType([r.default.number, r.default.string]),
                  maxPriorityFeePerGas: r.default.oneOfType([r.default.number, r.default.string]),
                  t: r.default.func,
                  editGasMode: r.default.string,
                  gasLimit: r.default.number,
                  transaction: r.default.object,
                };
                n.default = m;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/edit-gas-tooltip/edit-gas-tooltip.js',
      },
    ],
    [
      7228,
      { './edit-gas-fee-popover': 7222 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./edit-gas-fee-popover')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/index.js',
      },
    ],
    [
      7229,
      { './network-statistics': 7230 },
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
                      return a.default;
                    },
                  });
                var o,
                  a = (o = e('./network-statistics')) && o.__esModule ? o : { default: o };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/network-statistics/index.js',
      },
    ],
  ],
  [],
  {}
);
