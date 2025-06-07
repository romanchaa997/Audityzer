LavaPack.loadBundle(
  [
    [
      93,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/smartTransactions': 5813,
        '../../../../shared/constants/swaps': 5815,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/lib/fetch-with-cache': 5834,
        '../../../../shared/lib/swaps-utils': 5846,
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../shared/modules/Numeric': 5853,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/string-utils': 5878,
        '../../../../shared/modules/swaps.utils': 5879,
        './swaps.constants': 94,
        './swaps.utils': 95,
        '@ethersproject/contracts': 527,
        '@ethersproject/providers': 565,
        '@metamask/base-controller': 1407,
        '@sentry/browser': 3136,
        'bignumber.js': 4030,
        'human-standard-token-abi': 4706,
        lodash: 4921,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }), (s.default = void 0);
                var a = e('@ethersproject/contracts'),
                  n = e('@ethersproject/providers'),
                  r = e('@metamask/base-controller'),
                  i = e('@sentry/browser'),
                  o = e('bignumber.js'),
                  l = C(e('human-standard-token-abi')),
                  c = e('lodash'),
                  u = e('../../../../shared/constants/common'),
                  d = e('../../../../shared/constants/gas'),
                  p = e('../../../../shared/constants/metametrics'),
                  h = e('../../../../shared/constants/network'),
                  m = e('../../../../shared/constants/smartTransactions'),
                  f = e('../../../../shared/constants/swaps'),
                  g = e('../../../../shared/constants/time'),
                  w = C(e('../../../../shared/lib/fetch-with-cache')),
                  S = e('../../../../shared/lib/swaps-utils'),
                  T = e('../../../../shared/lib/transactions-controller-utils'),
                  E = e('../../../../shared/modules/conversion.utils'),
                  v = e('../../../../shared/modules/Numeric'),
                  A = e('../../../../shared/modules/string-utils'),
                  _ = e('../../../../shared/modules/swaps.utils'),
                  b = e('./swaps.constants'),
                  I = e('./swaps.utils');
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function M(e, t, s) {
                  N(e, t), t.set(e, s);
                }
                function N(e, t) {
                  if (t.has(e))
                    throw new TypeError(
                      'Cannot initialize the same private elements twice on an object'
                    );
                }
                function k(e, t, s) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var s = e[Symbol.toPrimitive];
                        if (void 0 !== s) {
                          var a = s.call(e, t || 'default');
                          if ('object' != typeof a) return a;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: s,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = s),
                    e
                  );
                }
                function y(e, t) {
                  return e.get(P(e, t));
                }
                function R(e, t, s) {
                  return e.set(P(e, t), s), s;
                }
                function P(e, t, s) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : s;
                  throw new TypeError('Private element is not present on this object');
                }
                const F = { swapsState: { persist: !1, anonymous: !1 } };
                var O = new WeakMap(),
                  L = new WeakMap(),
                  x = new WeakMap(),
                  G = new WeakMap(),
                  D = new WeakMap(),
                  B = new WeakMap(),
                  U = new WeakSet();
                class Q extends r.BaseController {
                  constructor(e, t) {
                    var s, a, n;
                    super({
                      name: b.controllerName,
                      metadata: F,
                      messenger: e.messenger,
                      state: {
                        swapsState: {
                          ...(0, b.getDefaultSwapsControllerState)().swapsState,
                          swapsFeatureFlags:
                            (null == t || null === (s = t.swapsState) || void 0 === s
                              ? void 0
                              : s.swapsFeatureFlags) || {},
                        },
                      },
                    }),
                      N((a = this), (n = U)),
                      n.add(a),
                      k(this, 'getBufferedGasLimit', void 0),
                      k(this, 'resetState', void 0),
                      k(this, 'trackMetaMetricsEvent', void 0),
                      M(this, O, void 0),
                      M(this, L, void 0),
                      M(this, x, null),
                      M(this, G, void 0),
                      M(this, D, void 0),
                      M(this, B, void 0),
                      k(this, '_fetchTradesInfo', S.fetchTradesInfo),
                      k(this, '__test__updateState', e => {
                        this.update(t => ({ swapsState: { ...t.swapsState, ...e.swapsState } }));
                      }),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:fetchAndSetQuotes',
                        this.fetchAndSetQuotes.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSelectedQuoteAggId',
                        this.setSelectedQuoteAggId.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:resetSwapsState',
                        this.resetSwapsState.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsTokens',
                        this.setSwapsTokens.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:clearSwapsQuotes',
                        this.clearSwapsQuotes.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setApproveTxId',
                        this.setApproveTxId.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setTradeTxId',
                        this.setTradeTxId.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsTxGasPrice',
                        this.setSwapsTxGasPrice.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsTxGasLimit',
                        this.setSwapsTxGasLimit.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsTxMaxFeePerGas',
                        this.setSwapsTxMaxFeePerGas.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsTxMaxFeePriorityPerGas',
                        this.setSwapsTxMaxFeePriorityPerGas.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:safeRefetchQuotes',
                        this.safeRefetchQuotes.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:stopPollingForQuotes',
                        this.stopPollingForQuotes.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setBackgroundSwapRouteState',
                        this.setBackgroundSwapRouteState.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:resetPostFetchState',
                        this.resetPostFetchState.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsErrorKey',
                        this.setSwapsErrorKey.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setInitialGasEstimate',
                        this.setInitialGasEstimate.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setCustomApproveTxData',
                        this.setCustomApproveTxData.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsLiveness',
                        this.setSwapsLiveness.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsFeatureFlags',
                        this.setSwapsFeatureFlags.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsUserFeeLevel',
                        this.setSwapsUserFeeLevel.bind(this)
                      ),
                      this.messagingSystem.registerActionHandler(
                        'SwapsController:setSwapsQuotesPollingLimitEnabled',
                        this.setSwapsQuotesPollingLimitEnabled.bind(this)
                      ),
                      (this.getBufferedGasLimit = e.getBufferedGasLimit),
                      (this.trackMetaMetricsEvent = e.trackMetaMetricsEvent),
                      (this.resetState = () => {
                        this.update(e => {
                          e.swapsState = {
                            ...(0, b.getDefaultSwapsControllerState)().swapsState,
                            swapsFeatureFlags: null == e ? void 0 : e.swapsState.swapsFeatureFlags,
                          };
                        });
                      }),
                      R(G, this, e.getEIP1559GasFeeEstimates),
                      R(D, this, e.getLayer1GasFee),
                      R(O, this, 0),
                      R(L, this, 0),
                      (this._fetchTradesInfo = e.fetchTradesInfo || S.fetchTradesInfo);
                  }
                  clearSwapsQuotes() {
                    this.update(e => {
                      (e.swapsState.quotes = {}),
                        (e.swapsState.selectedAggId = null),
                        (e.swapsState.topAggId = null);
                    });
                  }
                  async fetchAndSetQuotes(e, t, s = !1) {
                    var a;
                    if (!e) return null;
                    let n;
                    n =
                      (null === (a = y(B, this)) || void 0 === a ? void 0 : a.clientId) ===
                      t.networkClientId
                        ? y(B, this)
                        : P(U, this, j).call(this, t.networkClientId);
                    const { quotesPollingLimitEnabled: r, saveFetchedQuotes: i } =
                      this.state.swapsState;
                    s || R(L, this, 0),
                      y(x, this) && clearTimeout(y(x, this)),
                      s || this.setSwapsErrorKey('');
                    const o = y(O, this) + 1;
                    R(O, this, o), i || this._setSaveFetchedQuotes(!0);
                    let [l] = await Promise.all([
                      this._fetchTradesInfo(e, { chainId: n.chainId }),
                      this._setSwapsNetworkConfig(n),
                    ]);
                    const { saveFetchedQuotes: u } = this.state.swapsState;
                    if (!u) return [{}, null];
                    l = (0, c.mapValues)(l, e => ({
                      ...e,
                      sourceTokenInfo: null == t ? void 0 : t.sourceTokenInfo,
                      destinationTokenInfo: null == t ? void 0 : t.destinationTokenInfo,
                    }));
                    const d = n.chainId === h.CHAIN_IDS.OPTIMISM.toString(),
                      p = n.chainId === h.CHAIN_IDS.BASE.toString();
                    (d || p) &&
                      Object.values(l).length > 0 &&
                      (await Promise.all(
                        Object.values(l).map(async e => {
                          if (e.trade) {
                            const t = await y(D, this).call(this, {
                              transactionParams: e.trade,
                              networkClientId: n.clientId,
                            });
                            e.multiLayerL1TradeFeeTotal = t;
                          }
                          return e;
                        })
                      ));
                    const m = Date.now();
                    let g = !1;
                    if (
                      !(0, _.isSwapsDefaultTokenAddress)(e.sourceToken, n.chainId) &&
                      Object.values(l).length
                    ) {
                      const t = await this._getERC20Allowance(e.sourceToken, e.fromAddress, n),
                        [a] = Object.values(l);
                      if (
                        ((g =
                          a.approvalNeeded &&
                          (t.eq(0) || t.lt(a.sourceAmount)) &&
                          'wrappedNative' !== a.aggregator),
                        g)
                      ) {
                        if (!s && a.approvalNeeded) {
                          const { gasLimit: e } = await this._timedoutGasReturn(
                            a.approvalNeeded,
                            a.aggregator
                          );
                          l = (0, c.mapValues)(l, t =>
                            t.approvalNeeded
                              ? {
                                  ...t,
                                  approvalNeeded: {
                                    ...t.approvalNeeded,
                                    gas: e || f.DEFAULT_ERC20_APPROVE_GAS,
                                  },
                                }
                              : t
                          );
                        }
                      } else l = (0, c.mapValues)(l, e => ({ ...e, approvalNeeded: null }));
                    }
                    let w = null;
                    if (
                      (g ||
                        (null != e && e.balanceError) ||
                        (l = await this._getAllQuotesWithGasEstimates(l)),
                      0 === Object.values(l).length)
                    )
                      this.setSwapsErrorKey(f.QUOTES_NOT_AVAILABLE_ERROR);
                    else {
                      const e = await this.getTopQuoteWithCalculatedSavings({ quotes: l });
                      Array.isArray(e) && ((w = e[0]), (l = e[1]));
                    }
                    if (y(O, this) !== o) throw new Error(f.SWAPS_FETCH_ORDER_CONFLICT);
                    let { selectedAggId: S } = this.state.swapsState;
                    return (
                      (S && l[S]) || (S = null),
                      this.update(s => {
                        (s.swapsState.quotes = l),
                          (s.swapsState.fetchParams = { ...e, metaData: t }),
                          (s.swapsState.quotesLastFetched = m),
                          (s.swapsState.selectedAggId = S),
                          (s.swapsState.topAggId = w);
                      }),
                      r && R(L, this, y(L, this) + 1),
                      !r || y(L, this) < b.POLL_COUNT_LIMIT + 1
                        ? (this._pollForNewQuotes(), [l, w])
                        : (this.resetPostFetchState(),
                          this.setSwapsErrorKey(f.QUOTES_EXPIRED_ERROR),
                          null)
                    );
                  }
                  async getTopQuoteWithCalculatedSavings({ quotes: e, networkClientId: t }) {
                    var s;
                    let a;
                    if (t) {
                      const e = this.messagingSystem.call(
                        'NetworkController:getNetworkClientById',
                        t
                      );
                      a = e.configuration.chainId;
                    } else {
                      if (y(B, this) === undefined) throw new Error('There is no network set');
                      a = y(B, this).chainId;
                    }
                    const { marketData: n } = this._getTokenRatesState(),
                      r = (null == n ? void 0 : n[a]) ?? {},
                      { customGasPrice: i, customMaxPriorityFeePerGas: l } = this.state.swapsState;
                    if (0 === Object.keys(e).length) return {};
                    const p = (0, c.cloneDeep)(e),
                      { gasFeeEstimates: h, gasEstimateType: m } = await y(G, this).call(this, {
                        networkClientId: t,
                      });
                    let f = '0x0';
                    if (m === d.GasEstimateTypes.feeMarket) {
                      const {
                          high: { suggestedMaxPriorityFeePerGas: e },
                          estimatedBaseFee: t,
                        } = h,
                        s = (0, E.decGWEIToHexWEI)(Number(e)),
                        a = new v.Numeric(t, 10, u.EtherDenomination.GWEI).toDenomination(
                          u.EtherDenomination.WEI
                        );
                      f = new v.Numeric(l || s, 16).add(a).round(6).toString();
                    } else
                      m === d.GasEstimateTypes.legacy
                        ? (f = i || (0, E.decGWEIToHexWEI)(Number(h.high)))
                        : m === d.GasEstimateTypes.ethGasPrice &&
                          (f = i || (0, E.decGWEIToHexWEI)(Number(h.gasPrice)));
                    let g,
                      w = '';
                    Object.values(p).forEach(e => {
                      const {
                        aggregator: t,
                        approvalNeeded: s,
                        averageGas: n,
                        destinationAmount: i,
                        destinationToken: l,
                        destinationTokenInfo: c,
                        gasEstimateWithRefund: d,
                        sourceAmount: p,
                        sourceToken: h,
                        trade: m,
                        fee: S,
                        multiLayerL1TradeFeeTotal: I,
                      } = e;
                      if (!m || !l) return;
                      const C = (
                        d ? new o.BigNumber(d, 16) : new o.BigNumber(n || b.MAX_GAS_LIMIT, 10)
                      )
                        .plus((null == s ? void 0 : s.gas) || '0x0', 16)
                        .toString(16);
                      let M = (0, T.calcGasTotal)(C, f);
                      null !== I && (M = (0, E.sumHexes)(M || '0x0', I || '0x0'));
                      const N = new v.Numeric(M, 16, u.EtherDenomination.WEI).add(
                          new v.Numeric(m.value, 16, u.EtherDenomination.WEI)
                        ),
                        k = N.toDenomination(u.EtherDenomination.ETH).round(6).value,
                        y = (0, _.isSwapsDefaultTokenAddress)(h, a)
                          ? N.minus(new v.Numeric(p, 10))
                              .toDenomination(u.EtherDenomination.ETH)
                              .round(6).value
                          : k,
                        R = (0, T.calcTokenAmount)(i ?? '0', c.decimals),
                        P = new o.BigNumber(100, 10).minus(S, 10).div(100),
                        F = R.div(P).minus(R),
                        O = Object.keys(r).find(e => (0, A.isEqualCaseInsensitive)(e, l)),
                        L = O ? r[O] : null,
                        x = (null == L ? void 0 : L.price) || 1,
                        G = R.times(x.toString(10), 10),
                        D = (0, _.isSwapsDefaultTokenAddress)(l, a)
                          ? 1
                          : null == L
                            ? void 0
                            : L.price,
                        B = D ? G.minus(y, 10) : G;
                      (e.ethFee = y.toString(10)),
                        D &&
                          ((e.ethValueOfTokens = G.toString(10)),
                          (e.overallValueOfQuote = B.toString(10)),
                          (e.metaMaskFeeInEth = F.times(D.toString(10)).toString(10))),
                        (g && !B.gt(g || 0)) || ((w = t), (g = B));
                    });
                    const S = Object.keys(r).find(e => {
                        var t;
                        return (0, A.isEqualCaseInsensitive)(
                          e,
                          null === (t = p[w]) || void 0 === t ? void 0 : t.destinationToken
                        );
                      }),
                      C = S ? r[S] : null;
                    if (
                      (0, _.isSwapsDefaultTokenAddress)(
                        null === (s = p[w]) || void 0 === s ? void 0 : s.destinationToken,
                        a
                      ) ||
                      Boolean(null == C ? void 0 : C.price)
                    ) {
                      const e = p[w],
                        {
                          ethFee: t,
                          metaMaskFeeInEth: s,
                          ethValueOfTokens: a,
                        } = (0, I.getMedianEthValueQuote)(Object.values(p)),
                        n = new o.BigNumber(e.ethValueOfTokens, 10).minus(a, 10).toString(10),
                        r = new o.BigNumber(t).minus(e.ethFee, 10).toString(10),
                        i = e.metaMaskFeeInEth,
                        l = {
                          performance: n,
                          fee: r,
                          total: new o.BigNumber(n).plus(r).minus(i).toString(10),
                          metaMaskFee: i,
                          medianMetaMaskFee: s,
                        };
                      (p[w].isBestQuote = !0), (p[w].savings = l);
                    }
                    return [w, p];
                  }
                  resetPostFetchState() {
                    this.update(e => {
                      e.swapsState = {
                        ...(0, b.getDefaultSwapsControllerState)().swapsState,
                        tokens: e.swapsState.tokens,
                        fetchParams: e.swapsState.fetchParams,
                        swapsFeatureIsLive: e.swapsState.swapsFeatureIsLive,
                        swapsQuoteRefreshTime: e.swapsState.swapsQuoteRefreshTime,
                        swapsQuotePrefetchingRefreshTime:
                          e.swapsState.swapsQuotePrefetchingRefreshTime,
                        swapsFeatureFlags: e.swapsState.swapsFeatureFlags,
                      };
                    }),
                      y(x, this) && clearTimeout(y(x, this));
                  }
                  resetSwapsState() {
                    this.update(e => {
                      e.swapsState = {
                        ...(0, b.getDefaultSwapsControllerState)().swapsState,
                        swapsQuoteRefreshTime: e.swapsState.swapsQuoteRefreshTime,
                        swapsQuotePrefetchingRefreshTime:
                          e.swapsState.swapsQuotePrefetchingRefreshTime,
                        swapsFeatureFlags: e.swapsState.swapsFeatureFlags,
                      };
                    }),
                      y(x, this) && clearTimeout(y(x, this));
                  }
                  safeRefetchQuotes() {
                    !y(x, this) &&
                      this.state.swapsState.fetchParams &&
                      this.fetchAndSetQuotes(this.state.swapsState.fetchParams, {
                        ...this.state.swapsState.fetchParams.metaData,
                      });
                  }
                  setApproveTxId(e) {
                    this.update(t => {
                      t.swapsState.approveTxId = e;
                    });
                  }
                  setBackgroundSwapRouteState(e) {
                    this.update(t => {
                      t.swapsState.routeState = e;
                    });
                  }
                  setCustomApproveTxData(e) {
                    this.update(t => {
                      t.swapsState.customApproveTxData = e;
                    });
                  }
                  async setInitialGasEstimate(e) {
                    const t = { ...this.state.swapsState.quotes[e] },
                      { gasLimit: s, simulationFails: a } = t.trade
                        ? await this._timedoutGasReturn(t.trade, t.aggregator)
                        : { gasLimit: null, simulationFails: !0 };
                    if (s && !a) {
                      const e = (0, I.calculateGasEstimateWithRefund)(
                        t.maxGas,
                        t.estimatedRefund,
                        s
                      );
                      (t.gasEstimate = s), (t.gasEstimateWithRefund = e);
                    }
                    this.update(s => {
                      s.swapsState.quotes = { ...s.swapsState.quotes, [e]: t };
                    });
                  }
                  setSelectedQuoteAggId(e) {
                    this.update(t => {
                      t.swapsState.selectedAggId = e;
                    });
                  }
                  setSwapsFeatureFlags(e) {
                    this.update(t => {
                      t.swapsState.swapsFeatureFlags = e;
                    });
                  }
                  setSwapsErrorKey(e) {
                    this.update(t => {
                      t.swapsState.errorKey = e;
                    });
                  }
                  setSwapsLiveness(e) {
                    const { swapsFeatureIsLive: t } = e;
                    this.update(e => {
                      e.swapsState.swapsFeatureIsLive = t;
                    });
                  }
                  setSwapsQuotesPollingLimitEnabled(e) {
                    this.update(t => {
                      t.swapsState.quotesPollingLimitEnabled = e;
                    });
                  }
                  setSwapsTokens(e) {
                    this.update(t => {
                      t.swapsState.tokens = e;
                    });
                  }
                  setSwapsTxGasLimit(e) {
                    this.update(t => {
                      t.swapsState.customMaxGas = e;
                    });
                  }
                  setSwapsTxGasPrice(e) {
                    this.update(t => {
                      t.swapsState.customGasPrice = e;
                    });
                  }
                  setSwapsTxMaxFeePerGas(e) {
                    this.update(t => {
                      t.swapsState.customMaxFeePerGas = e;
                    });
                  }
                  setSwapsTxMaxFeePriorityPerGas(e) {
                    this.update(t => {
                      t.swapsState.customMaxPriorityFeePerGas = e;
                    });
                  }
                  setSwapsUserFeeLevel(e) {
                    this.update(t => {
                      t.swapsState.swapsUserFeeLevel = e;
                    });
                  }
                  setTradeTxId(e) {
                    this.update(t => {
                      t.swapsState.tradeTxId = e;
                    });
                  }
                  stopPollingForQuotes() {
                    y(x, this) && clearTimeout(y(x, this));
                  }
                  async _fetchSwapsNetworkConfig(e) {
                    const t = await (0, w.default)({
                        url: (0, S.getBaseApi)('network', e.chainId),
                        fetchOptions: { method: 'GET' },
                        cacheOptions: { cacheRefreshTime: 6e5 },
                        functionName: '_fetchSwapsNetworkConfig',
                      }),
                      { refreshRates: s, parameters: a = {} } = t || {};
                    if (!s || 'number' != typeof s.quotes || 'number' != typeof s.quotesPrefetching)
                      throw new Error(`MetaMask - invalid response for refreshRates: ${t}`);
                    return {
                      quotes: 1e3 * s.quotes,
                      quotesPrefetching: 1e3 * s.quotesPrefetching,
                      stxGetTransactions: 1e3 * s.stxGetTransactions,
                      stxBatchStatus: 1e3 * s.stxBatchStatus,
                      stxStatusDeadline: s.stxStatusDeadline,
                      stxMaxFeeMultiplier: a.stxMaxFeeMultiplier,
                    };
                  }
                  async _getAllQuotesWithGasEstimates(e) {
                    const t = await Promise.all(
                        Object.values(e).map(async e => {
                          if (!e.trade)
                            return { gasLimit: null, simulationFails: !0, aggId: e.aggregator };
                          const { gasLimit: t, simulationFails: s } = await this._timedoutGasReturn(
                            e.trade,
                            e.aggregator
                          );
                          return { gasLimit: t, simulationFails: s, aggId: e.aggregator };
                        })
                      ),
                      s = {};
                    return (
                      t.forEach(({ gasLimit: t, simulationFails: a, aggId: n }) => {
                        if (t && !a) {
                          const a = (0, I.calculateGasEstimateWithRefund)(
                            e[n].maxGas,
                            e[n].estimatedRefund,
                            t
                          );
                          s[n] = { ...e[n], gasEstimate: t, gasEstimateWithRefund: a };
                        } else e[n].approvalNeeded && (s[n] = e[n]);
                      }),
                      s
                    );
                  }
                  async _getERC20Allowance(e, t, s) {
                    const n = new a.Contract(e, l.default, s.ethersProvider);
                    return await n.allowance(t, f.SWAPS_CHAINID_CONTRACT_ADDRESS_MAP[s.chainId]);
                  }
                  _getTokenRatesState() {
                    const { marketData: e } = this.messagingSystem.call(
                      'TokenRatesController:getState'
                    );
                    return { marketData: e };
                  }
                  _pollForNewQuotes() {
                    const {
                      swapsQuoteRefreshTime: e,
                      swapsQuotePrefetchingRefreshTime: t,
                      quotesPollingLimitEnabled: s,
                    } = this.state.swapsState;
                    R(
                      x,
                      this,
                      setTimeout(
                        () => {
                          var e;
                          this.fetchAndSetQuotes(
                            this.state.swapsState.fetchParams,
                            null === (e = this.state.swapsState.fetchParams) || void 0 === e
                              ? void 0
                              : e.metaData,
                            !0
                          );
                        },
                        s ? e : t
                      )
                    );
                  }
                  _setSaveFetchedQuotes(e) {
                    this.update(t => {
                      t.swapsState.saveFetchedQuotes = e;
                    });
                  }
                  async _setSwapsNetworkConfig(e) {
                    let t = null;
                    try {
                      t = await this._fetchSwapsNetworkConfig(e);
                    } catch (e) {
                      console.error('Request for Swaps network config failed: ', e);
                    }
                    this.update(e => {
                      var s, a, n, r, i, o;
                      (e.swapsState.swapsQuoteRefreshTime =
                        (null === (s = t) || void 0 === s ? void 0 : s.quotes) ||
                        b.FALLBACK_QUOTE_REFRESH_TIME),
                        (e.swapsState.swapsQuotePrefetchingRefreshTime =
                          (null === (a = t) || void 0 === a ? void 0 : a.quotesPrefetching) ||
                          b.FALLBACK_QUOTE_REFRESH_TIME),
                        (e.swapsState.swapsStxGetTransactionsRefreshTime =
                          (null === (n = t) || void 0 === n ? void 0 : n.stxGetTransactions) ||
                          m.FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME),
                        (e.swapsState.swapsStxBatchStatusRefreshTime =
                          (null === (r = t) || void 0 === r ? void 0 : r.stxBatchStatus) ||
                          m.FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME),
                        (e.swapsState.swapsStxMaxFeeMultiplier =
                          (null === (i = t) || void 0 === i ? void 0 : i.stxMaxFeeMultiplier) ||
                          m.FALLBACK_SMART_TRANSACTIONS_MAX_FEE_MULTIPLIER),
                        (e.swapsState.swapsStxStatusDeadline =
                          (null === (o = t) || void 0 === o ? void 0 : o.stxStatusDeadline) ||
                          m.FALLBACK_SMART_TRANSACTIONS_DEADLINE);
                    });
                  }
                  _timedoutGasReturn(e, t = '') {
                    return new Promise(s => {
                      let a = !1;
                      const n = setTimeout(() => {
                          (a = !0),
                            this.trackMetaMetricsEvent({
                              event: p.MetaMetricsEventName.QuoteError,
                              category: p.MetaMetricsEventCategory.Swaps,
                              properties: {
                                error_type: p.MetaMetricsEventErrorType.GasTimeout,
                                aggregator: t,
                              },
                            }),
                            s({ gasLimit: null, simulationFails: !0 });
                        }, 5 * g.SECOND),
                        r = { data: e.data, from: e.from, to: e.to, value: e.value };
                      this.getBufferedGasLimit({ txParams: r }, 1)
                        .then(({ gasLimit: e, simulationFails: t }) => {
                          a || (clearTimeout(n), s({ gasLimit: e, simulationFails: t }));
                        })
                        .catch(e => {
                          (0, i.captureException)(e, { extra: { aggregator: t } }),
                            a || (clearTimeout(n), s({ gasLimit: null, simulationFails: !0 }));
                        });
                    });
                  }
                }
                function j(e) {
                  const t = this.messagingSystem.call('NetworkController:getNetworkClientById', e),
                    { chainId: s } = t.configuration,
                    a = {
                      client: t,
                      clientId: e,
                      chainId: s,
                      ethersProvider: new n.Web3Provider(t.provider),
                    };
                  return R(B, this, a), a;
                }
                s.default = Q;
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/swaps/index.ts' },
    ],
    [
      94,
      {
        '../../../../shared/constants/smartTransactions': 5813,
        '../../../../shared/constants/time': 5817,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }),
                  (s.controllerName =
                    s.POLL_COUNT_LIMIT =
                    s.MAX_GAS_LIMIT =
                    s.FALLBACK_QUOTE_REFRESH_TIME =
                      void 0),
                  (s.getDefaultSwapsControllerState = function () {
                    return {
                      swapsState: {
                        quotes: {},
                        quotesPollingLimitEnabled: !1,
                        fetchParams: null,
                        tokens: null,
                        tradeTxId: null,
                        approveTxId: null,
                        quotesLastFetched: null,
                        customMaxGas: '',
                        customGasPrice: null,
                        customMaxFeePerGas: null,
                        customMaxPriorityFeePerGas: null,
                        swapsUserFeeLevel: '',
                        selectedAggId: null,
                        customApproveTxData: '',
                        errorKey: '',
                        topAggId: null,
                        routeState: '',
                        swapsFeatureIsLive: !0,
                        saveFetchedQuotes: !1,
                        swapsQuoteRefreshTime: r,
                        swapsQuotePrefetchingRefreshTime: r,
                        swapsStxBatchStatusRefreshTime: a.FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME,
                        swapsStxStatusDeadline: a.FALLBACK_SMART_TRANSACTIONS_DEADLINE,
                        swapsStxGetTransactionsRefreshTime:
                          a.FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME,
                        swapsStxMaxFeeMultiplier: a.FALLBACK_SMART_TRANSACTIONS_MAX_FEE_MULTIPLIER,
                        swapsFeatureFlags: {},
                      },
                    };
                  });
                var a = e('../../../../shared/constants/smartTransactions'),
                  n = e('../../../../shared/constants/time');
                (s.controllerName = 'SwapsController'),
                  (s.MAX_GAS_LIMIT = 25e5),
                  (s.POLL_COUNT_LIMIT = 3);
                const r = (s.FALLBACK_QUOTE_REFRESH_TIME = n.MINUTE);
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/swaps/swaps.constants.ts' },
    ],
    [
      95,
      { './swaps.constants': 94, 'bignumber.js': 4030 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }),
                  (s.calculateGasEstimateWithRefund = function (
                    e = n.MAX_GAS_LIMIT,
                    t = '0',
                    s = '0'
                  ) {
                    const r = new a.BigNumber(e, 10).minus(t, 10),
                      i = r.lt(0);
                    return !i && r.lt(s, 16) ? `0x${r.toString(16)}` : s;
                  }),
                  (s.getMedianEthValueQuote = function (e) {
                    if (!Array.isArray(e) || 0 === e.length)
                      throw new Error('Expected non-empty array param.');
                    const t = [...e];
                    if (
                      (t.sort((e, t) => {
                        const s = new a.BigNumber(e.overallValueOfQuote, 10),
                          n = new a.BigNumber(t.overallValueOfQuote, 10);
                        return s.equals(n) ? 0 : s.lessThan(n) ? -1 : 1;
                      }),
                      t.length % 2 == 1)
                    ) {
                      const e = t[(t.length - 1) / 2].overallValueOfQuote;
                      return r(t.filter(t => e === t.overallValueOfQuote));
                    }
                    const s = t.length / 2,
                      n = s - 1,
                      i = t[s].overallValueOfQuote,
                      o = t[n].overallValueOfQuote,
                      l = t.filter(e => i === e.overallValueOfQuote),
                      c = t.filter(e => o === e.overallValueOfQuote),
                      u = r(l),
                      d = r(c);
                    return {
                      ethFee: new a.BigNumber(u.ethFee, 10)
                        .plus(d.ethFee, 10)
                        .dividedBy(2)
                        .toString(10),
                      metaMaskFeeInEth: new a.BigNumber(u.metaMaskFeeInEth, 10)
                        .plus(d.metaMaskFeeInEth, 10)
                        .dividedBy(2)
                        .toString(10),
                      ethValueOfTokens: new a.BigNumber(u.ethValueOfTokens, 10)
                        .plus(d.ethValueOfTokens, 10)
                        .dividedBy(2)
                        .toString(10),
                    };
                  }),
                  (s.meansOfQuotesFeesAndValue = r);
                var a = e('bignumber.js'),
                  n = e('./swaps.constants');
                function r(e) {
                  const t = e.reduce(
                    (e, t) => ({
                      ethFee: e.ethFee.plus(t.ethFee, 10),
                      metaMaskFeeInEth: e.metaMaskFeeInEth.plus(t.metaMaskFeeInEth, 10),
                      ethValueOfTokens: e.ethValueOfTokens.plus(t.ethValueOfTokens, 10),
                    }),
                    {
                      ethFee: new a.BigNumber(0, 10),
                      metaMaskFeeInEth: new a.BigNumber(0, 10),
                      ethValueOfTokens: new a.BigNumber(0, 10),
                    }
                  );
                  return {
                    ethFee: t.ethFee.div(e.length, 10).toString(10),
                    metaMaskFeeInEth: t.metaMaskFeeInEth.div(e.length, 10).toString(10),
                    ethValueOfTokens: t.ethValueOfTokens.div(e.length, 10).toString(10),
                  };
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/controllers/swaps/swaps.utils.ts' },
    ],
    [
      96,
      { '../../shared/constants/app': 5789, './lib/util': 204, 'webextension-polyfill': 5766 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }),
                  (s.onMessageReceived = s.checkForMultipleVersionsRunning = void 0);
                var a,
                  n = (a = e('webextension-polyfill')) && a.__esModule ? a : { default: a },
                  r = e('../../shared/constants/app'),
                  i = e('./lib/util');
                const o = 'isRunning';
                s.onMessageReceived = e => {
                  e === o &&
                    console.warn('Warning! You have multiple instances of MetaMask running!');
                };
                s.checkForMultipleVersionsRunning = async () => {
                  if (
                    (0, i.getPlatform)() !== r.PLATFORM_CHROME &&
                    (0, i.getPlatform)() !== r.PLATFORM_FIREFOX
                  )
                    return;
                  const e =
                      (0, i.getPlatform)() === r.PLATFORM_CHROME
                        ? r.CHROME_BUILD_IDS
                        : r.FIREFOX_BUILD_IDS,
                    t = n.default.runtime.id;
                  for (const s of e)
                    if (s !== t)
                      try {
                        await n.default.runtime.sendMessage(s, o);
                      } catch (e) {}
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/detect-multiple-instances.js' },
    ],
    [
      97,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }), (s.default = void 0);
                s.default = { config: {} };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/first-time-state.js' },
    ],
    [
      98,
      {
        '../../../shared/notifications': 5882,
        '../../../test/e2e/default-fixture': 5888,
        '../../../test/e2e/fixture-builder': 5889,
        '../lib/encryptor-factory': 130,
        './with-address-book': 99,
        './with-app-state': 100,
        './with-confirmed-transactions': 101,
        './with-erc20-tokens': 102,
        './with-networks': 103,
        './with-preferences': 104,
        './with-unread-notifications': 105,
        '@metamask/base-controller': 1407,
        '@metamask/keyring-controller': 2021,
        '@metamask/scure-bip39/dist/wordlists/english': 2589,
        buffer: 4139,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                (function (t) {
                  (function () {
                    Object.defineProperty(s, '__esModule', { value: !0 }),
                      (s.generateWalletState = async function () {
                        const e = new c.default({ inputChainId: '0xaa36a7' }),
                          { vault: s, accounts: a } = await (async function (e, s) {
                            const a = new n.Messenger().getRestricted({
                                name: 'KeyringController',
                              }),
                              o = new r.KeyringController({
                                encryptor: (0, u.encryptorFactory)(6e5),
                                messenger: a,
                              }),
                              l = t.from(e),
                              c = e => {
                                const t = e
                                  .toString()
                                  .split(' ')
                                  .map(e => i.wordlist.indexOf(e));
                                return new Uint8Array(new Uint16Array(t).buffer);
                              };
                            await o.createNewVaultAndRestore(s, c(l));
                            const d = [],
                              p = o.state.keyrings[0].accounts[0];
                            d.push(p);
                            for (let e = 1; e < S.withAccounts; e++) {
                              const t = await o.addNewAccount(e);
                              d.push(t);
                            }
                            const { vault: h } = o.state;
                            return { vault: h, accounts: d };
                          })(l.E2E_SRP, null);
                        return (
                          e
                            .withAccountsController(
                              (function (e) {
                                console.log('Generating AccountsController state');
                                const t = { selectedAccount: 'account-id', accounts: {} };
                                return (
                                  e.forEach((e, s) => {
                                    t.accounts[`acount-id-${s}`] = {
                                      selectedAccount: 'account-id',
                                      id: 'account-id',
                                      address: e,
                                      metadata: {
                                        name: `Account ${s + 1}`,
                                        lastSelected: 16655076e5,
                                        keyring: { type: 'HD Key Tree' },
                                      },
                                      options: {},
                                      methods: [
                                        'personal_sign',
                                        'eth_signTransaction',
                                        'eth_signTypedData_v1',
                                        'eth_signTypedData_v3',
                                        'eth_signTypedData_v4',
                                      ],
                                      type: 'eip155:eoa',
                                    };
                                  }),
                                  { internalAccounts: t }
                                );
                              })(a)
                            )
                            .withAddressBookController(
                              (function () {
                                console.log('Generating AddressBookController state');
                                const e = S.withContacts;
                                if (e > 0) return (0, f.withAddressBook)(e);
                                return {};
                              })()
                            )
                            .withAnnouncementController(
                              (function () {
                                console.log('Generating AnnouncementController state');
                                return Object.keys(o.UI_NOTIFICATIONS).reduce(
                                  (e, t) => ((e[t] = { ...o.UI_NOTIFICATIONS[t], isShown: !0 }), e),
                                  {}
                                );
                              })()
                            )
                            .withAppStateController(d.FIXTURES_APP_STATE)
                            .withKeyringController(
                              (function (e) {
                                return (
                                  console.log('Generating KeyringController state'),
                                  { ...(0, l.defaultFixture)().data.KeyringController, vault: e }
                                );
                              })(s)
                            )
                            .withNetworkController(
                              (function () {
                                console.log('Generating NetworkController state');
                                const e = {
                                  ...(0, l.defaultFixture)().data.NetworkController,
                                  networkConfigurations: {},
                                  networksMetadata: {
                                    sepolia: { EIPS: { 1559: !0 }, status: 'available' },
                                  },
                                  selectedNetworkClientId: 'sepolia',
                                };
                                if (S.withNetworks) return { ...e, ...p.FIXTURES_NETWORKS };
                                return e;
                              })()
                            )
                            .withNotificationServicesController(
                              (function (e) {
                                console.log('Generating NotificationController state');
                                let t = {};
                                S.withUnreadNotifications > 0 &&
                                  (t = (0, w.withUnreadNotifications)(
                                    e,
                                    S.withUnreadNotifications
                                  ));
                                return t;
                              })(a[0])
                            )
                            .withPreferencesController(
                              (function (e) {
                                console.log('Generating PreferencesController state');
                                let t = {};
                                S.withPreferences && (t = h.FIXTURES_PREFERENCES);
                                return (
                                  (t.identities = Object.assign(
                                    ...e.map((e, t) => ({
                                      [e]: {
                                        address: e,
                                        lastSelected: 1725363500048,
                                        name: `Account ${t + 1}`,
                                      },
                                    }))
                                  )),
                                  (t.lostIdentities = Object.assign(
                                    ...e.map((e, t) => ({
                                      [e]: {
                                        address: e,
                                        lastSelected: 1725363500048,
                                        name: `Account ${t + 1}`,
                                      },
                                    }))
                                  )),
                                  t
                                );
                              })(a)
                            )
                            .withTokensController(
                              (function (e) {
                                console.log('Generating TokensController state');
                                const t = m.FIXTURES_ERC20_TOKENS;
                                if (S.withErc20Tokens) {
                                  for (const s of Object.values(t.allTokens))
                                    (s[e] = s.myAccount), delete s.myAccount;
                                  return t;
                                }
                                return {};
                              })(a[0])
                            )
                            .withTransactionController(
                              (function (e) {
                                console.log('Generating TransactionController state');
                                let t = {};
                                S.withConfirmedTransactions > 0 &&
                                  (t = (0, g.withConfirmedTransactions)(
                                    e,
                                    S.withConfirmedTransactions
                                  ));
                                return t;
                              })(a[0])
                            ),
                          e.fixture.data
                        );
                      });
                    var a,
                      n = e('@metamask/base-controller'),
                      r = e('@metamask/keyring-controller'),
                      i = e('@metamask/scure-bip39/dist/wordlists/english'),
                      o = e('../../../shared/notifications'),
                      l = e('../../../test/e2e/default-fixture'),
                      c =
                        (a = e('../../../test/e2e/fixture-builder')) && a.__esModule
                          ? a
                          : { default: a },
                      u = e('../lib/encryptor-factory'),
                      d = e('./with-app-state'),
                      p = e('./with-networks'),
                      h = e('./with-preferences'),
                      m = e('./with-erc20-tokens'),
                      f = e('./with-address-book'),
                      g = e('./with-confirmed-transactions'),
                      w = e('./with-unread-notifications');
                    const S = {};
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      { package: '$root$', file: 'app/scripts/fixtures/generate-wallet-state.js' },
    ],
    [
      99,
      { '../../../shared/constants/network': 5804 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }), (s.withAddressBook = void 0);
                var a = e('../../../shared/constants/network');
                const n = () => {
                  let e = '0x';
                  for (let t = 0; t < 40; t++)
                    e += '0123456789abcdef'[Math.floor(16 * Math.random())];
                  return e;
                };
                s.withAddressBook = e => {
                  const t = [a.CHAIN_IDS.MAINNET, a.CHAIN_IDS.SEPOLIA],
                    s = {};
                  return (
                    t.forEach(t => {
                      s[t] = {};
                      for (let a = 1; a <= e; a++) {
                        const e = n();
                        s[t][e] = {
                          address: e,
                          chainId: t,
                          isEns: !1,
                          memo: '',
                          name: `Contact ${a}`,
                        };
                      }
                    }),
                    { addressBook: s }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/fixtures/with-address-book.js' },
    ],
    [
      5,
      {
        '../../shared/constants/app': 5789,
        '../../shared/constants/metametrics': 5800,
        '../../shared/constants/offscreen-communication': 5806,
        '../../shared/modules/browser-runtime.utils': 5855,
        '../../shared/modules/mv3.utils': 5867,
        '../../shared/modules/object.utils': 5869,
        '../../shared/modules/selectors/networks': 5875,
        '../../test/e2e/background-socket/socket-background-to-mocha': 5886,
        '../../test/e2e/default-fixture': 5888,
        '../../test/stub/keyring-bridge': 5894,
        './constants/marketing-site-whitelist': 7,
        './constants/sentry-state': 8,
        './first-time-state': 97,
        './fixtures/generate-wallet-state': 98,
        './lib/createStreamSink': 127,
        './lib/ens-ipfs/setup': 134,
        './lib/get-first-preferred-lang-code': 136,
        './lib/getObjStructure': 137,
        './lib/migrator': 141,
        './lib/notification-manager': 143,
        './lib/setup-initial-state-hooks': 173,
        './lib/stores/extension-store': 186,
        './lib/stores/persistence-manager': 187,
        './lib/stores/read-only-network-store': 188,
        './lib/util': 204,
        './metamask-controller': 205,
        './migrations': 381,
        './offscreen': 382,
        './platforms/extension': 383,
        '@metamask/notification-services-controller': 2401,
        '@metamask/obs-store': 2414,
        '@metamask/utils': 2995,
        'debounce-stream': 4290,
        events: 4465,
        'extension-port-stream': 4468,
        loglevel: 4929,
        'readable-stream': 5343,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, s) {
                Object.defineProperty(s, '__esModule', { value: !0 }),
                  (s.loadStateFromPersistence = Ee),
                  (s.setupController = be),
                  (s.statePersistenceEvents = void 0),
                  e('./lib/setup-initial-state-hooks');
                var a = D(e('events')),
                  n = e('readable-stream'),
                  r = D(e('debounce-stream')),
                  i = D(e('loglevel')),
                  o = D(e('webextension-polyfill')),
                  l = e('@metamask/obs-store'),
                  c = e('@metamask/utils'),
                  u = D(e('extension-port-stream')),
                  d = e('@metamask/notification-services-controller'),
                  p = e('../../shared/constants/app'),
                  h = e('../../shared/constants/metametrics'),
                  m = e('../../shared/modules/browser-runtime.utils'),
                  f = e('../../shared/modules/mv3.utils'),
                  g = e('../../shared/modules/object.utils'),
                  w =
                    (e('../../test/e2e/default-fixture'),
                    e('../../test/e2e/background-socket/socket-background-to-mocha'),
                    e('../../shared/constants/offscreen-communication'),
                    e('../../test/stub/keyring-bridge')),
                  S = e('../../shared/modules/selectors/networks'),
                  T = e('./lib/stores/persistence-manager'),
                  E = D(e('./lib/stores/extension-store')),
                  v = D(e('./lib/stores/read-only-network-store')),
                  A = D(e('./migrations')),
                  _ = D(e('./lib/migrator')),
                  b = D(e('./platforms/extension')),
                  I = e('./constants/sentry-state'),
                  C = D(e('./lib/createStreamSink')),
                  M = G(e('./lib/notification-manager')),
                  N = G(e('./metamask-controller')),
                  k = D(e('./lib/get-first-preferred-lang-code')),
                  y = D(e('./lib/getObjStructure')),
                  R = D(e('./lib/ens-ipfs/setup')),
                  P = e('./lib/util'),
                  F = e('./offscreen'),
                  O = (e('./fixtures/generate-wallet-state'), D(e('./first-time-state'))),
                  L = e('./constants/marketing-site-whitelist');
                function x(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    s = new WeakMap();
                  return (x = function (e) {
                    return e ? s : t;
                  })(e);
                }
                function G(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var s = x(t);
                  if (s && s.has(e)) return s.get(e);
                  var a = { __proto__: null },
                    n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var i = n ? Object.getOwnPropertyDescriptor(e, r) : null;
                      i && (i.get || i.set) ? Object.defineProperty(a, r, i) : (a[r] = e[r]);
                    }
                  return (a.default = e), s && s.set(e, a), a;
                }
                function D(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const B = '#0376C9',
                  U = '#D73847',
                  Q = 9,
                  j = !1,
                  V = new _.default({ migrations: A.default, defaultVersion: null }),
                  H = j ? new v.default() : new E.default(),
                  K = new T.PersistenceManager({ localStore: H });
                global.stateHooks.getMostRecentPersistedState = () => K.mostRecentRetrievedState;
                const { sentry: W } = global;
                let q = { ...O.default };
                const $ = {
                    [p.ENVIRONMENT_TYPE_POPUP]: !0,
                    [p.ENVIRONMENT_TYPE_NOTIFICATION]: !0,
                    [p.ENVIRONMENT_TYPE_FULLSCREEN]: !0,
                  },
                  Y = ['trezor-connect'];
                i.default.setLevel('info', !1);
                const X = new b.default(),
                  z = new M.default(),
                  J = (0, P.getPlatform)() === p.PLATFORM_FIREFOX;
                let Z = 0,
                  ee = !1,
                  te = !1;
                const se = {},
                  ae = {};
                let ne;
                const re = {};
                j && (global.stateHooks.metamaskGetState = K.get.bind(K));
                const ie = new URL('https://metamask.github.io/phishing-warning/v4.1.0/'),
                  oe = ie.toString(),
                  le = 1e3,
                  ce = (s.statePersistenceEvents = new a.default());
                if (f.isManifestV3)
                  globalThis.stateHooks.metamaskWasJustInstalled
                    ? (Me(), delete globalThis.stateHooks.metamaskWasJustInstalled)
                    : (globalThis.stateHooks.metamaskTriggerOnInstall = () => Me());
                else {
                  const e = t => {
                    'install' === t.reason &&
                      (Me(), o.default.runtime.onInstalled.removeListener(e));
                  };
                  o.default.runtime.onInstalled.addListener(e);
                }
                const { promise: ue, resolve: de, reject: pe } = (0, P.deferredPromise)(),
                  he = async () => {
                    const e = await o.default.tabs
                      .query({ url: '<all_urls>', windowType: 'normal' })
                      .then(e => ((0, m.checkForLastErrorAndLog)(), e))
                      .catch(() => {
                        (0, m.checkForLastErrorAndLog)();
                      });
                    for (const t of e)
                      o.default.tabs
                        .sendMessage(t.id, { name: p.EXTENSION_MESSAGES.READY })
                        .then(() => {
                          (0, m.checkForLastErrorAndLog)();
                        })
                        .catch(() => {
                          (0, m.checkForLastErrorAndLog)();
                        });
                  };
                let me, fe, ge;
                function we() {
                  const e = new Date().toISOString();
                  o.default.storage.session.set({ timestamp: e });
                }
                async function Se() {
                  try {
                    const t = f.isManifestV3 ? (0, F.createOffscreen)() : null,
                      s = await Ee(),
                      a = s.data,
                      n = await (0, k.default)();
                    let r;
                    if (f.isManifestV3) {
                      var e;
                      if (
                        !1 !==
                        (null === (e = a.PreferencesController) || void 0 === e
                          ? void 0
                          : e.enableMV3TimestampSave)
                      ) {
                        const e = 2e3;
                        we(), setInterval(we, e);
                      }
                      const t = await o.default.storage.session.get([
                        'isFirstMetaMaskControllerSetup',
                      ]);
                      (r = (null == t ? void 0 : t.isFirstMetaMaskControllerSetup) === undefined),
                        await o.default.storage.session.set({ isFirstMetaMaskControllerSetup: r });
                    }
                    be(
                      a,
                      n,
                      j
                        ? {
                            keyrings: {
                              trezorBridge: w.FakeTrezorBridge,
                              ledgerBridge: w.FakeLedgerBridge,
                            },
                          }
                        : {},
                      r,
                      s.meta,
                      t
                    ),
                      (function (e) {
                        async function t(e, t) {
                          try {
                            return await o.default.tabs.update(e, { url: t });
                          } catch (e) {
                            return null == W ? void 0 : W.captureException(e);
                          }
                        }
                        const s = !f.isManifestV3;
                        o.default.webRequest.onBeforeRequest.addListener(
                          a => {
                            var n, r, i;
                            if (a.tabId === o.default.tabs.TAB_ID_NONE) return {};
                            const { completedOnboarding: l } = e.onboardingController.state;
                            if (!l) return {};
                            if (!e.preferencesController.state.usePhishDetect) return {};
                            if (
                              a.initiator &&
                              'null' !== a.initiator &&
                              new URL(a.initiator).host === ie.host
                            )
                              return {};
                            const { hostname: c, href: u, searchParams: d } = new URL(a.url);
                            if (j && d.has('IN_TEST_BYPASS_EARLY_PHISHING_DETECTION')) return {};
                            e.phishingController.maybeUpdateState();
                            const p = e.phishingController.isBlockedRequest(a.url);
                            let m, f;
                            if (
                              (('main_frame' !== a.type && 'sub_frame' !== a.type) ||
                                (m = e.phishingController.test(a.url)),
                              !((null !== (n = m) && void 0 !== n && n.result) || p.result))
                            )
                              return {};
                            let g = c;
                            null !== (r = m) && void 0 !== r && r.result && p.result
                              ? (f = `${m.type} and ${p.type}`)
                              : null !== (i = m) && void 0 !== i && i.result
                                ? (f = m.type)
                                : ((f = p.type), (g = a.initiator)),
                              e.metaMetricsController.trackEvent({
                                event: h.MetaMetricsEventName.PhishingPageDisplayed,
                                category: h.MetaMetricsEventCategory.Phishing,
                                properties: {
                                  url: g,
                                  referrer: { url: g },
                                  reason: f,
                                  requestDomain: p.result ? c : undefined,
                                },
                              });
                            const w = new URLSearchParams({ hostname: c, href: u }),
                              S = new URL(oe);
                            S.hash = w.toString();
                            const T = S.toString();
                            return s
                              ? 'main_frame' === a.type
                                ? { redirectUrl: T }
                                : (t(a.tabId, T), { cancel: !0 })
                              : (t(a.tabId, T), {});
                          },
                          { urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] },
                          s ? ['blocking'] : []
                        );
                      })(ne),
                      f.isManifestV3 ||
                        (await (async function () {
                          let e;
                          try {
                            const t = new URL(oe);
                            let s, a;
                            (t.hash = '#extensionStartup'),
                              (e = window.document.createElement('iframe')),
                              e.setAttribute('src', t.href),
                              e.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                            const n = new Promise((e, t) => {
                              (s = e), (a = t);
                            });
                            e.addEventListener('load', s),
                              window.document.body.appendChild(e),
                              setTimeout(() => a(new Te()), le),
                              await n;
                          } catch (e) {
                            e instanceof Te
                              ? console.warn(
                                  'Phishing warning page timeout; page not guaranteed to work offline.'
                                )
                              : console.error('Failed to initialize phishing warning page', e);
                          } finally {
                            e && e.remove();
                          }
                        })()),
                      await he(),
                      i.default.info('MetaMask initialization complete.'),
                      de();
                  } catch (e) {
                    pe(e);
                  }
                }
                o.default.runtime.onConnect.addListener(async (...e) => {
                  await ue, me(...e);
                }),
                  o.default.runtime.onConnectExternal.addListener(async (...e) => {
                    var t;
                    await ue;
                    (null === (t = e[0].sender.tab) || void 0 === t ? void 0 : t.id)
                      ? ge(...e)
                      : fe(...e);
                  });
                class Te extends Error {
                  constructor() {
                    super('Timeout failed');
                  }
                }
                async function Ee() {
                  V.on('error', console.warn);
                  const e = (await K.get()) || V.generateInitialState(q);
                  V.on('error', t => {
                    const s = (0, y.default)(e);
                    W.captureException(t, { extra: { vaultStructure: s } });
                  });
                  const t = await V.migrateData(e);
                  if (!t) throw new Error('MetaMask - migrator returned undefined');
                  if (!(0, c.isObject)(t.meta))
                    throw new Error(
                      `MetaMask - migrator metadata has invalid type '${typeof t.meta}'`
                    );
                  if ('number' != typeof t.meta.version)
                    throw new Error(
                      `MetaMask - migrator metadata version has invalid type '${typeof t.meta.version}'`
                    );
                  if (!(0, c.isObject)(t.data))
                    throw new Error(`MetaMask - migrator data has invalid type '${typeof t.data}'`);
                  return K.setMetadata(t.meta), K.set(t.data), t;
                }
                function ve(e) {
                  const { metaMetricsId: t } = ne.metaMetricsController.state;
                  if (!(0, P.shouldEmitDappViewedEvent)(t)) return;
                  const s = ne.getPermittedAccounts(e).length;
                  if (0 === s) return;
                  const a = ne.controllerMessenger.call('PreferencesController:getState'),
                    n = Object.keys(a.identities).length;
                  ne.metaMetricsController.trackEvent(
                    {
                      event: h.MetaMetricsEventName.DappViewed,
                      category: h.MetaMetricsEventCategory.InpageProvider,
                      referrer: { url: e },
                      properties: {
                        is_first_visit: !1,
                        number_of_accounts: n,
                        number_of_accounts_connected: s,
                      },
                    },
                    { excludeMetaMetricsId: !0 }
                  );
                }
                function Ae(e) {
                  if (!e.sender || !e.sender.tab || !e.sender.url) return;
                  const t = e.sender.tab.id,
                    s = new URL(e.sender.url),
                    { origin: a } = s;
                  Object.keys(re).includes(t) || (re[t] = a);
                  const n = ne.controllerMessenger.call('PermissionController:hasPermissions', a),
                    r = 'New Tab' !== e.sender.tab.title;
                  n && r && ve(a);
                }
                function _e(e) {
                  const t = [
                    p.ENVIRONMENT_TYPE_POPUP,
                    p.ENVIRONMENT_TYPE_NOTIFICATION,
                    p.ENVIRONMENT_TYPE_FULLSCREEN,
                  ];
                  !(Object.values(se).some(Boolean) || ee || Z > 0) &&
                    t.includes(e) &&
                    (function () {
                      const { metaMetricsId: e, participateInMetaMetrics: t } =
                        ne.metaMetricsController.state;
                      (null !== e || t) &&
                        ne.metaMetricsController.trackEvent({
                          event: h.MetaMetricsEventName.AppOpened,
                          category: h.MetaMetricsEventCategory.App,
                        });
                    })();
                }
                function be(e, t, s, a, c, m) {
                  var w;
                  (ne = new N.default({
                    infuraProjectId: '0d73cc5bbe184146957a9d00764db99f',
                    showUserConfirmation: Ie,
                    initState: e,
                    initLangCode: t,
                    platform: X,
                    notificationManager: z,
                    browser: o.default,
                    getRequestAccountTabIds: () => ae,
                    getOpenMetamaskTabsIds: () => se,
                    persistenceManager: K,
                    overrides: s,
                    isFirstMetaMaskControllerSetup: a,
                    currentMigrationVersion: c.version,
                    featureFlags: {},
                    offscreenPromise: m,
                  })),
                    (0, R.default)({
                      getCurrentChainId: () =>
                        (0, S.getCurrentChainId)({ metamask: ne.networkController.state }),
                      getIpfsGateway: ne.preferencesController.getIpfsGateway.bind(
                        ne.preferencesController
                      ),
                      getUseAddressBarEnsResolution: () =>
                        ne.preferencesController.state.useAddressBarEnsResolution,
                      provider: ne.provider,
                    }),
                    (0, n.pipeline)(
                      (0, l.storeAsStream)(ne.store),
                      (0, r.default)(1e3),
                      (0, C.default)(async e => {
                        await K.set(e), ce.emit('state-persisted', e);
                      }),
                      e => {
                        i.default.error('MetaMask - Persistence pipeline failed', e);
                      }
                    ),
                    (w = ne),
                    (global.stateHooks.getSentryAppState = function () {
                      const e = w.memStore.getState();
                      return (0, g.maskObject)(e, I.SENTRY_BACKGROUND_STATE);
                    });
                  const T = () => Z > 0 || Boolean(Object.keys(se).length) || ee,
                    E = (e, t) => {
                      if (!1 === e) ne.onClientClosed();
                      else {
                        if (t === p.ENVIRONMENT_TYPE_FULLSCREEN && Boolean(Object.keys(se).length))
                          return;
                        ne.onEnvironmentTypeClosed(t);
                      }
                    };
                  function v(e, t) {
                    return e > t ? `${t}+` : String(e);
                  }
                  function A() {
                    const e = _(),
                      t = (function () {
                        try {
                          const {
                              isNotificationServicesEnabled: e,
                              isFeatureAnnouncementsEnabled: t,
                            } = ne.notificationServicesController.state,
                            s = Object.values(
                              ne.notificationServicesController.state.metamaskNotificationsList
                            ).filter(
                              e =>
                                e.type ===
                                  d.NotificationServicesController.Constants.TRIGGER_TYPES.SNAP &&
                                null === e.readDate
                            ).length,
                            a = t
                              ? ne.notificationServicesController.state.metamaskNotificationsList.filter(
                                  e =>
                                    !e.isRead &&
                                    e.type ===
                                      d.NotificationServicesController.Constants.TRIGGER_TYPES
                                        .FEATURES_ANNOUNCEMENT
                                ).length
                              : 0,
                            n = e
                              ? ne.notificationServicesController.state.metamaskNotificationsList.filter(
                                  e =>
                                    !e.isRead &&
                                    e.type !==
                                      d.NotificationServicesController.Constants.TRIGGER_TYPES
                                        .FEATURES_ANNOUNCEMENT &&
                                    e.type !==
                                      d.NotificationServicesController.Constants.TRIGGER_TYPES.SNAP
                                ).length
                              : 0;
                          return s + a + n;
                        } catch (e) {
                          return console.error('Failed to get unread notifications count:', e), 0;
                        }
                      })();
                    let s = '',
                      a = B;
                    e ? (s = v(e, Q)) : t > 0 && ((s = v(t, Q)), (a = U));
                    try {
                      const e = { text: s },
                        t = { color: a };
                      f.isManifestV3
                        ? (o.default.action.setBadgeText(e),
                          o.default.action.setBadgeBackgroundColor(t))
                        : (o.default.browserAction.setBadgeText(e),
                          o.default.browserAction.setBadgeBackgroundColor(t));
                    } catch (e) {
                      console.error('Error updating browser badge:', e);
                    }
                  }
                  function _() {
                    try {
                      let e =
                        ne.appStateController.waitingForUnlock.length +
                        ne.approvalController.getTotalApprovalCount();
                      return (e += ne.queuedRequestController.state.queuedRequestCount), e;
                    } catch (e) {
                      return console.error('Failed to get pending approval count:', e), 0;
                    }
                  }
                  (me = async e => {
                    var t;
                    const a = e.name;
                    if (Y.includes(e.name)) return;
                    let r = !1;
                    const l =
                      null !== (t = e.sender) && void 0 !== t && t.url
                        ? new URL(e.sender.url)
                        : null;
                    if (
                      ((r = J
                        ? $[a]
                        : (null == l ? void 0 : l.origin) ===
                          `chrome-extension://${o.default.runtime.id}`),
                      r)
                    ) {
                      var c;
                      const t =
                        (null == s || null === (c = s.getPortStream) || void 0 === c
                          ? void 0
                          : c.call(s, e)) || new u.default(e);
                      if (
                        ((ne.isClientOpen = !0),
                        ne.setupTrustedCommunication(t, e.sender),
                        _e(a),
                        (async function () {
                          try {
                            await ne.remoteFeatureFlagController.updateRemoteFeatureFlags();
                          } catch (e) {
                            i.default.error('Error initializing remote feature flags:', e);
                          }
                        })(),
                        a === p.ENVIRONMENT_TYPE_POPUP &&
                          ((Z += 1),
                          (0, n.finished)(t, () => {
                            Z -= 1;
                            const e = T();
                            (ne.isClientOpen = e), E(e, p.ENVIRONMENT_TYPE_POPUP);
                          })),
                        a === p.ENVIRONMENT_TYPE_NOTIFICATION &&
                          ((ee = !0),
                          (0, n.finished)(t, () => {
                            ee = !1;
                            const e = T();
                            (ne.isClientOpen = e), E(e, p.ENVIRONMENT_TYPE_NOTIFICATION);
                          })),
                        a === p.ENVIRONMENT_TYPE_FULLSCREEN)
                      ) {
                        const s = e.sender.tab.id;
                        (se[s] = !0),
                          (0, n.finished)(t, () => {
                            delete se[s];
                            const e = T();
                            (ne.isClientOpen = e), E(e, p.ENVIRONMENT_TYPE_FULLSCREEN);
                          });
                      }
                    } else if (l && l.origin === ie.origin && l.pathname === ie.pathname) {
                      var d;
                      const t =
                        (null == s || null === (d = s.getPortStream) || void 0 === d
                          ? void 0
                          : d.call(s, e)) || new u.default(e);
                      ne.setupPhishingCommunication({ connectionStream: t });
                    } else {
                      if (e.sender && e.sender.tab && e.sender.url) {
                        const t = e.sender.tab.id,
                          s = new URL(e.sender.url),
                          { origin: a } = s;
                        Ae(e),
                          e.onMessage.addListener(e => {
                            e.data &&
                              e.data.method === p.MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS &&
                              (ae[a] = t);
                          });
                      }
                      if (l && L.COOKIE_ID_MARKETING_WHITELIST_ORIGINS.some(e => e === l.origin)) {
                        var h;
                        const t =
                          (null == s || null === (h = s.getPortStream) || void 0 === h
                            ? void 0
                            : h.call(s, e)) || new u.default(e);
                        ne.setUpCookieHandlerCommunication({ connectionStream: t });
                      }
                      fe(e);
                    }
                  }),
                    (fe = e => {
                      var t;
                      const a =
                        (null == s || null === (t = s.getPortStream) || void 0 === t
                          ? void 0
                          : t.call(s, e)) || new u.default(e);
                      ne.setupUntrustedCommunicationEip1193({
                        connectionStream: a,
                        sender: e.sender,
                      });
                    }),
                    (ge = async e => {
                      var t;
                      if (Y.includes(e.name)) return;
                      e.sender && e.sender.tab && e.sender.url && Ae(e);
                      const a =
                        (null == s || null === (t = s.getPortStream) || void 0 === t
                          ? void 0
                          : t.call(s, e)) || new u.default(e);
                      ne.setupUntrustedCommunicationCaip({ connectionStream: a, sender: e.sender });
                    }),
                    null != s && s.registerConnectListeners && s.registerConnectListeners(me, fe),
                    A(),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.DECRYPT_MESSAGE_MANAGER_UPDATE_BADGE,
                      A
                    ),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.ENCRYPTION_PUBLIC_KEY_MANAGER_UPDATE_BADGE,
                      A
                    ),
                    ne.signatureController.hub.on(N.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, A),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.APP_STATE_UNLOCK_CHANGE,
                      A
                    ),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.APPROVAL_STATE_CHANGE,
                      A
                    ),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.QUEUED_REQUEST_STATE_CHANGE,
                      A
                    ),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.METAMASK_NOTIFICATIONS_LIST_UPDATED,
                      A
                    ),
                    ne.controllerMessenger.subscribe(
                      N.METAMASK_CONTROLLER_EVENTS.METAMASK_NOTIFICATIONS_MARK_AS_READ,
                      A
                    ),
                    z.on(
                      M.NOTIFICATION_MANAGER_EVENTS.POPUP_CLOSED,
                      ({ automaticallyClosed: e }) => {
                        e
                          ? _() > 0 && Ie()
                          : (ne.signatureController.rejectUnapproved(
                              h.REJECT_NOTIFICATION_CLOSE_SIG
                            ),
                            ne.decryptMessageController.rejectUnapproved(
                              h.REJECT_NOTIFICATION_CLOSE
                            ),
                            ne.encryptionPublicKeyController.rejectUnapproved(
                              h.REJECT_NOTIFICATION_CLOSE
                            ),
                            ne.rejectAllPendingApprovals()),
                          A();
                      }
                    ),
                    Object.values(ne.snapController.state.snaps).some(e => !e.preinstalled) &&
                      ne.snapController.updateBlockedSnaps();
                }
                async function Ie() {
                  const e = await X.getActiveTabs(),
                    t = Boolean(e.find(e => se[e.id])),
                    s = e.length > 0 && e[0].extData && e[0].extData.indexOf('vivaldi_tab') > -1;
                  if (!te && (s || 0 === Z) && !t) {
                    te = !0;
                    try {
                      const e = ne.appStateController.getCurrentPopupId();
                      await z.showPopup(e => ne.appStateController.setCurrentPopupId(e), e);
                    } finally {
                      te = !1;
                    }
                  }
                }
                const Ce = () => {
                  if (ne)
                    return (
                      ne.metaMetricsController.updateTraits({
                        [h.MetaMetricsUserTrait.InstallDateExt]: new Date()
                          .toISOString()
                          .split('T')[0],
                      }),
                      void ne.metaMetricsController.addEventBeforeMetricsOptIn({
                        category: h.MetaMetricsEventCategory.App,
                        event: h.MetaMetricsEventName.AppInstalled,
                        properties: {},
                      })
                    );
                  setTimeout(() => {
                    Ce();
                  }, 500);
                };
                function Me() {
                  i.default.debug('First install detected'), Ce(), X.openExtensionInBrowser();
                }
                (async function () {
                  o.default.tabs.onActivated.addListener(e => {
                    if (ne) {
                      const { tabId: t } = e,
                        s = re[t];
                      s && ne.permissionController.state.subjects[s] !== undefined && ve(s);
                    }
                  });
                  try {
                    await Se(), K.cleanUpMostRecentRetrievedState();
                  } catch (e) {
                    i.default.error(e);
                  }
                })();
              };
            };
      },
      { package: '$root$', file: 'app/scripts/background.js' },
    ],
  ],
  [5],
  {}
);
